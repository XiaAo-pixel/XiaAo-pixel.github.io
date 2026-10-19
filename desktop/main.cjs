'use strict';

/**
 * 主页助手 · Windows 桌面版
 *
 * 这个进程只做三件事：
 * 1. 找到（或让用户选择）个人主页项目目录；
 * 2. 用 Electron 自带的 Node 启动内嵌的 editor/server.mjs；
 * 3. 用原生窗口打开本地编辑器地址。
 *
 * 主页文件不打包进 exe；exe 只是一个编辑器，项目目录可随时切换。
 */
const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const net = require('node:net');
const http = require('node:http');
const { spawn } = require('node:child_process');

const APP_TITLE = '主页助手';
const SMOKE = process.argv.includes('--smoke-test');

// 烟雾测试使用独立的 userData，避免影响正常应用设置，也方便并行测试。
if (SMOKE) {
  try {
    app.setPath('userData', path.join(os.tmpdir(), `homepage-studio-smoke-${process.pid}`));
  } catch {
    // 忽略，后面仍可运行
  }
}

let mainWindow = null;
let serverState = null;
let currentProject = '';
let currentOrigin = '';
let quitting = false;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ------------------------------------------------------------------ */
/* 参数与项目定位                                                      */
/* ------------------------------------------------------------------ */
function argValue(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return '';
  const value = process.argv[index + 1];
  return value && !value.startsWith('--') ? value : '';
}

function isProjectDirectory(dir) {
  if (!dir) return false;
  try {
    return ['index.html', 'style.css', 'courses.html']
      .every((name) => fs.statSync(path.join(dir, name)).isFile());
  } catch {
    return false;
  }
}

function findProjectUp(start, levels = 4) {
  if (!start) return '';
  let dir = path.resolve(start);
  for (let i = 0; i <= levels; i++) {
    if (isProjectDirectory(dir)) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return '';
}

function settingsFile() {
  return path.join(app.getPath('userData'), 'settings.json');
}

function readSettings() {
  try {
    return JSON.parse(fs.readFileSync(settingsFile(), 'utf8'));
  } catch {
    return {};
  }
}

function saveSettings(patch) {
  try {
    const dir = app.getPath('userData');
    fs.mkdirSync(dir, { recursive: true });
    const next = { ...readSettings(), ...patch };
    fs.writeFileSync(settingsFile(), JSON.stringify(next, null, 2), 'utf8');
  } catch {
    // 设置保存失败不影响编辑
  }
}

function candidateProject() {
  const explicit = argValue('--project') || process.env.HOMEPAGE_STUDIO_ROOT || '';
  if (explicit) {
    const dir = path.resolve(explicit);
    if (!isProjectDirectory(dir)) {
      throw new Error(`指定的目录不是有效的个人主页工程：\n${dir}\n\n需要包含 index.html、style.css、courses.html。`);
    }
    return dir;
  }

  // 便携版 exe 直接放在工程根目录时，优先用 exe 所在目录。
  const portableDir = process.env.PORTABLE_EXECUTABLE_DIR || '';
  if (portableDir && isProjectDirectory(portableDir)) return path.resolve(portableDir);

  const settings = readSettings();
  if (settings.lastProject && isProjectDirectory(settings.lastProject)) {
    return path.resolve(settings.lastProject);
  }

  const starts = [
    portableDir,
    path.dirname(process.execPath),
    process.cwd(),
    app.getAppPath(),
  ].filter(Boolean);
  for (const start of starts) {
    const found = findProjectUp(start, 4);
    if (found) return found;
  }
  return '';
}

async function promptForProject() {
  let defaultPath = readSettings().lastProject || app.getPath('documents');
  for (;;) {
    const result = await dialog.showOpenDialog({
      title: '选择个人主页项目文件夹',
      buttonLabel: '打开这个项目',
      defaultPath,
      properties: ['openDirectory'],
      message: '请选择包含 index.html、style.css、courses.html 的主页工程根目录。',
    });
    if (result.canceled || !result.filePaths.length) return '';
    const dir = path.resolve(result.filePaths[0]);
    if (isProjectDirectory(dir)) return dir;
    await dialog.showMessageBox({
      type: 'error',
      title: '不是有效的主页工程',
      message: '这个文件夹里没有 index.html / style.css / courses.html。',
      detail: '请选择个人主页仓库的根目录（例如 D:\\homepage）。',
      buttons: ['重新选择'],
    });
    defaultPath = dir;
  }
}

/* ------------------------------------------------------------------ */
/* 本地服务                                                            */
/* ------------------------------------------------------------------ */
function serverEntry() {
  return path.join(app.getAppPath(), 'editor', 'server.mjs');
}

function canListen(port) {
  return new Promise((resolve) => {
    const tester = net.createServer();
    tester.once('error', () => resolve(false));
    tester.once('listening', () => tester.close(() => resolve(true)));
    tester.listen(port, '127.0.0.1');
  });
}

async function findFreePort(start = 4173) {
  for (let port = start; port < start + 50; port++) {
    if (await canListen(port)) return port;
  }
  return new Promise((resolve, reject) => {
    const tester = net.createServer();
    tester.once('error', reject);
    tester.listen(0, '127.0.0.1', () => {
      const port = tester.address().port;
      tester.close(() => resolve(port));
    });
  });
}

function pingServer(port) {
  return new Promise((resolve) => {
    const request = http.get({
      host: '127.0.0.1',
      port,
      path: '/__api/state',
      timeout: 1200,
    }, (response) => {
      response.resume();
      resolve(response.statusCode === 200);
    });
    request.on('error', () => resolve(false));
    request.on('timeout', () => {
      request.destroy();
      resolve(false);
    });
  });
}

async function startServer(project) {
  const entry = serverEntry();
  if (!fs.existsSync(entry)) {
    throw new Error(`安装文件不完整，找不到本地服务：\n${entry}`);
  }
  const preferredPort = await findFreePort(4173);
  const child = spawn(process.execPath, [
    entry,
    '--root', project,
    '--port', String(preferredPort),
    '--no-open',
  ], {
    cwd: project,
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: '1',
    },
  });

  let log = '';
  let exited = false;
  let exitDescription = '';
  child.stdout.on('data', (chunk) => {
    const text = chunk.toString('utf8');
    log += text;
    if (!app.isPackaged) process.stdout.write(`[editor] ${text}`);
  });
  child.stderr.on('data', (chunk) => {
    const text = chunk.toString('utf8');
    log += text;
    if (!app.isPackaged) process.stderr.write(`[editor] ${text}`);
  });
  child.once('exit', (code, signal) => {
    exited = true;
    exitDescription = `本地服务退出（code ${code}${signal ? `, ${signal}` : ''}）`;
  });

  const deadline = Date.now() + 25000;
  let port = preferredPort;
  let url = `http://127.0.0.1:${port}/__editor/`;

  while (Date.now() < deadline) {
    if (exited) {
      throw new Error(`${exitDescription}\n\n${log.slice(-5000)}`);
    }
    const match = /http:\/\/127\.0\.0\.1:(\d+)\/__editor\//.exec(log);
    if (match) {
      const detected = Number.parseInt(match[1], 10);
      if (Number.isFinite(detected) && detected !== port) {
        port = detected;
        url = `http://127.0.0.1:${port}/__editor/`;
      }
    }
    if (await pingServer(port)) {
      return {
        child,
        port,
        url,
        project,
        getLog: () => log,
        stop: () => {
          try { child.kill(); } catch { /* ignore */ }
        },
      };
    }
    await sleep(160);
  }

  try { child.kill(); } catch { /* ignore */ }
  throw new Error(`本地编辑器服务在 25 秒内没有启动。\n\n${log.slice(-5000)}`);
}

function stopServer(state = serverState) {
  if (!state) return;
  try { state.child.kill(); } catch { /* ignore */ }
  if (state === serverState) serverState = null;
}

/* ------------------------------------------------------------------ */
/* 窗口与菜单                                                          */
/* ------------------------------------------------------------------ */
function updateWindowTitle() {
  if (!mainWindow) return;
  const folder = currentProject ? path.basename(currentProject) : '';
  mainWindow.setTitle(folder ? `${APP_TITLE} — ${folder}` : APP_TITLE);
}

function isLocalUrl(value) {
  try {
    return new URL(value).origin === currentOrigin;
  } catch {
    return false;
  }
}

function openExternal(value) {
  if (/^https?:/i.test(value)) {
    shell.openExternal(value).catch(() => {});
  }
}

function showAbout() {
  dialog.showMessageBox(mainWindow || undefined, {
    type: 'info',
    title: `关于${APP_TITLE}`,
    message: `${APP_TITLE} ${app.getVersion()}`,
    detail: [
      '个人主页可视化编辑器的 Windows 桌面版。',
      '',
      `Electron ${process.versions.electron}`,
      `项目目录：${currentProject || '未选择'}`,
    ].join('\n'),
    buttons: ['知道了'],
  });
}

async function switchProject() {
  if (!mainWindow) return;
  const result = await dialog.showOpenDialog(mainWindow, {
    title: '切换个人主页项目文件夹',
    buttonLabel: '切换',
    defaultPath: currentProject || readSettings().lastProject || app.getPath('documents'),
    properties: ['openDirectory'],
  });
  if (result.canceled || !result.filePaths.length) return;
  const dir = path.resolve(result.filePaths[0]);
  if (!isProjectDirectory(dir)) {
    dialog.showErrorBox('不是有效的主页工程', '这个文件夹里没有 index.html / style.css / courses.html。');
    return;
  }
  if (dir === currentProject) return;
  const confirm = await dialog.showMessageBox(mainWindow, {
    type: 'question',
    title: '切换项目文件夹',
    message: `切换到「${path.basename(dir)}」？`,
    detail: '会重启本地编辑服务并重新载入页面。当前未保存的编辑可能丢失。',
    buttons: ['切换', '取消'],
    defaultId: 0,
    cancelId: 1,
    noLink: true,
  });
  if (confirm.response !== 0) return;
  await loadProject(dir);
}

async function loadProject(dir) {
  const oldState = serverState;
  const oldProject = currentProject;
  const oldOrigin = currentOrigin;
  let nextState = null;
  try {
    nextState = await startServer(dir);
    currentProject = dir;
    currentOrigin = new URL(nextState.url).origin;
    serverState = nextState;
    saveSettings({ lastProject: dir });
    updateWindowTitle();
    if (mainWindow) {
      await mainWindow.loadURL(nextState.url);
      updateWindowTitle();
    }
    if (oldState) stopServer(oldState);
  } catch (error) {
    if (nextState) stopServer(nextState);
    serverState = oldState;
    currentProject = oldProject;
    currentOrigin = oldOrigin;
    dialog.showErrorBox('无法打开项目', error.message);
  }
}

function buildMenu() {
  const template = [
    {
      label: '文件',
      submenu: [
        { label: '切换项目文件夹…', accelerator: 'CmdOrCtrl+O', click: () => switchProject() },
        {
          label: '在资源管理器中打开项目',
          click: () => { if (currentProject) shell.openPath(currentProject); },
        },
        { type: 'separator' },
        { label: '退出', click: () => app.quit() },
      ],
    },
    {
      label: '视图',
      submenu: [
        { role: 'reload', label: '重新载入' },
        { role: 'forceReload', label: '强制重新载入' },
        { role: 'toggleDevTools', label: '开发者工具' },
        { type: 'separator' },
        { role: 'resetZoom', label: '实际大小' },
        { role: 'zoomIn', label: '放大' },
        { role: 'zoomOut', label: '缩小' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: '全屏' },
      ],
    },
    {
      label: '帮助',
      submenu: [
        { label: `关于${APP_TITLE}`, click: showAbout },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function createWindow() {
  const iconFile = path.join(app.getAppPath(), 'desktop', 'build', 'icon.ico');
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 960,
    minWidth: 1080,
    minHeight: 680,
    title: APP_TITLE,
    icon: fs.existsSync(iconFile) ? iconFile : undefined,
    backgroundColor: '#eef1f7',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  mainWindow.once('ready-to-show', () => {
    if (!SMOKE) mainWindow.show();
  });
  mainWindow.on('page-title-updated', (event) => {
    event.preventDefault();
    updateWindowTitle();
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    openExternal(url);
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (isLocalUrl(url)) return;
    event.preventDefault();
    openExternal(url);
  });
  mainWindow.webContents.on('did-fail-load', (event, code, description, url, isMainFrame) => {
    if (!isMainFrame || SMOKE) return;
    dialog.showErrorBox('页面载入失败', `${description} (${code})\n${url}`);
  });

  buildMenu();
  return mainWindow;
}

/* ------------------------------------------------------------------ */
/* 烟雾测试                                                            */
/* ------------------------------------------------------------------ */
function smokeFile() {
  return process.env.HOMEPAGE_STUDIO_SMOKE_FILE ||
    path.join(app.getPath('temp'), 'homepage-studio-smoke.json');
}

function writeSmoke(payload) {
  try {
    const file = smokeFile();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(payload, null, 2), 'utf8');
  } catch {
    // 测试文件写不出来时至少保留退出码
  }
}

async function runSmokeTest() {
  try {
    const deadline = Date.now() + 15000;
    let info = null;
    while (Date.now() < deadline) {
      info = await mainWindow.webContents.executeJavaScript(`(() => ({
        title: document.title,
        pages: document.querySelectorAll('#page-nav [data-page-id]').length,
        rail: (document.querySelector('#page-nav')?.innerText || '').replace(/\\s+/g, ' ').slice(0, 240),
        version: document.querySelector('#app-version')?.textContent || '',
        hasTopbar: !!document.querySelector('.topbar'),
        hasIframe: !!document.querySelector('#preview')
      }))()`, true);
      if (info && info.pages > 0 && info.hasTopbar) break;
      await sleep(250);
    }
    if (!info || !info.pages) throw new Error('编辑器未在 15 秒内渲染页面列表');
    writeSmoke({
      ok: true,
      project: currentProject,
      url: serverState?.url || '',
      ...info,
    });
    stopServer();
    app.exit(0);
  } catch (error) {
    writeSmoke({
      ok: false,
      error: error.message,
      project: currentProject,
      url: serverState?.url || '',
      log: serverState?.getLog?.()?.slice(-8000) || '',
    });
    stopServer();
    app.exit(1);
  }
}

/* ------------------------------------------------------------------ */
/* 启动                                                                */
/* ------------------------------------------------------------------ */
async function boot() {
  try {
    let project = candidateProject();
    if (!project) {
      if (SMOKE) throw new Error('烟雾测试需要 --project 指向一个主页工程');
      project = await promptForProject();
      if (!project) {
        app.quit();
        return;
      }
    }
    saveSettings({ lastProject: project });
    const handle = await startServer(project);
    serverState = handle;
    currentProject = project;
    currentOrigin = new URL(handle.url).origin;

    createWindow();
    await mainWindow.loadURL(handle.url);
    updateWindowTitle();

    if (SMOKE) {
      await runSmokeTest();
    }
  } catch (error) {
    if (SMOKE) {
      writeSmoke({
        ok: false,
        error: error.message,
        project: currentProject,
        log: serverState?.getLog?.()?.slice(-8000) || '',
      });
      stopServer();
      app.exit(1);
      return;
    }
    dialog.showErrorBox(`${APP_TITLE}启动失败`, error.message || String(error));
    stopServer();
    app.quit();
  }
}

const gotLock = SMOKE || app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });

  app.on('before-quit', () => {
    quitting = true;
    stopServer();
  });

  app.on('window-all-closed', () => {
    if (quitting) return;
    app.quit();
  });

  app.whenReady().then(boot).catch((error) => {
    if (SMOKE) {
      writeSmoke({ ok: false, error: error.message });
      app.exit(1);
      return;
    }
    dialog.showErrorBox(`${APP_TITLE}启动失败`, error.message || String(error));
    app.quit();
  });
}
