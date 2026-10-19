/* 主页助手 · 前端主程序 */
'use strict';

const NS = 'homepage-editor';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

/* ------------------------------------------------------------------ */
/* 图标                                                                */
/* ------------------------------------------------------------------ */
const ICONS = {
  home: '<path d="M4 10.8 12 4l8 6.8"/><path d="M6.5 9.5V20h11V9.5"/><path d="M10 20v-5.5h4V20"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 18.2A2.5 2.5 0 0 1 6.5 16H20"/>',
  note: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 15.5h6M9 8.5h2"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.2 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
  novel: '<path d="M12 6.5C10.2 5 7.6 4.3 4 4.5v13c3.6-.2 6.2.5 8 2 1.8-1.5 4.4-2.2 8-2v-13c-3.6-.2-6.2.5-8 2z"/><path d="M12 6.5v13"/>',
  film: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14M17 5v14M3 10h4M17 10h4M3 14h4M17 14h4"/>',
  map: '<path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3z"/><path d="M9 3v15M15 6v15"/>',
  spark: '<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z"/><path d="m18.5 15 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
  file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>',
  sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
  undo: '<path d="M9 7 4 12l5 5"/><path d="M4 12h9a6 6 0 0 1 6 6"/>',
  redo: '<path d="m15 7 5 5-5 5"/><path d="M20 12h-9a6 6 0 0 0-6 6"/>',
  code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5"/>',
  external: '<path d="M14 4h6v6"/><path d="m20 4-9 9"/><path d="M18 14v5H5V6h5"/>',
  'chevron-right': '<path d="m9 5 7 7-7 7"/>',
  desktop: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
  tablet: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M11 18h2"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.4"/><path d="M11 18.5h2"/>',
  pencil: '<path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17z"/><path d="m14 7 3 3"/>',
  eye: '<path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  panel: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M15 4v16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 15-5-5L5 20"/>',
  camera: '<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.4"/>',
  trash: '<path d="M4 7h16M10 3h4l1 4H9zM6 7l1 14h10l1-14"/><path d="M10 11v6M14 11v6"/>',
  'arrow-up': '<path d="M12 19V5M6 11l6-6 6 6"/>',
  'arrow-down': '<path d="M12 5v14M6 13l6 6 6-6"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.1 0l2.4-2.4a5 5 0 0 0-7.1-7.1L11 4.9"/><path d="M14 11a5 5 0 0 0-7.1 0l-2.4 2.4a5 5 0 0 0 7.1 7.1l1.4-1.4"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M5 16v4h14v-4"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/>',
  type: '<path d="M5 6V4h14v2M12 4v16M8.5 20h7"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  alert: '<path d="M12 3 2.8 20h18.4z"/><path d="M12 9v5M12 17.2v.1"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.1"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.5 6.7"/><path d="M20 5v6h-6"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/>',
  cursor: '<path d="m5 3 6.5 17 2.3-6.2L20 11.5z"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  arrowUpCircle: '<circle cx="12" cy="12" r="9"/><path d="M12 16V8M8.5 11.5 12 8l3.5 3.5"/>',
  text: '<path d="M4 6h16M4 12h11M4 18h14"/>',
  imageStack: '<rect x="7" y="7" width="14" height="14" rx="2"/><path d="M3 17V5a2 2 0 0 1 2-2h12"/>',
  shield: '<path d="M12 3 5 6v6c0 4.4 3 7.7 7 9 4-1.3 7-4.6 7-9V6z"/><path d="m9 12 2 2 4-4"/>',
  'cloud-upload': '<path d="M7 18a4 4 0 0 1-.4-7.98A5.5 5.5 0 0 1 17.2 9.6 3.7 3.7 0 0 1 17 17H7z"/><path d="M12 12v8M9 15l3-3 3 3"/>',
};

function icon(name, extraClass = '') {
  const body = ICONS[name] || ICONS.file;
  return `<svg class="ico ${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

function hydrateIcons(root = document) {
  $$('[data-icon]', root).forEach((el) => {
    el.innerHTML = icon(el.getAttribute('data-icon'));
  });
}

/* ------------------------------------------------------------------ */
/* 基础工具                                                            */
/* ------------------------------------------------------------------ */
function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function escAttr(value) {
  return esc(value).replaceAll("'", '&#39;');
}

function truncate(value, max = 42) {
  const text = String(value ?? '').replace(/\s+/g, ' ').trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function assetUrl(src) {
  const value = String(src || '');
  if (!value) return '';
  if (/^(?:data:|blob:|https?:|\/)/i.test(value)) return value;
  return `/${value.replace(/^\.\//, '')}`;
}

function parseDateFromFooter(text) {
  const m = /(\d{4}-\d{2}-\d{2})/.exec(String(text || ''));
  return m ? m[1] : '';
}

function debounce(fn, wait = 300) {
  let timer = 0;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isNarrow() {
  return window.matchMedia('(max-width: 1040px)').matches;
}

function todayIso() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function hexToRgba(hex, alpha) {
  const raw = String(hex || '').replace('#', '');
  let r; let g; let b;
  if (/^[0-9a-f]{3}$/i.test(raw)) {
    r = parseInt(raw[0] + raw[0], 16);
    g = parseInt(raw[1] + raw[1], 16);
    b = parseInt(raw[2] + raw[2], 16);
  } else if (/^[0-9a-f]{6}$/i.test(raw)) {
    r = parseInt(raw.slice(0, 2), 16);
    g = parseInt(raw.slice(2, 4), 16);
    b = parseInt(raw.slice(4, 6), 16);
  } else {
    return null;
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ------------------------------------------------------------------ */
/* API                                                                 */
/* ------------------------------------------------------------------ */
async function api(path, { method = 'GET', body } = {}) {
  const options = { method, headers: {} };
  if (body !== undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.headers['X-Editor-Request'] = '1';
    options.body = JSON.stringify(body);
  }
  let response;
  try {
    response = await fetch(path, options);
  } catch (error) {
    const err = new Error('连不上本地服务，请确认启动窗口还开着');
    err.cause = error;
    throw err;
  }
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }
  if (!response.ok) {
    const error = new Error(data?.error || `请求失败（${response.status}）`);
    error.status = response.status;
    error.conflict = Boolean(data?.conflict);
    throw error;
  }
  return data;
}

function fetchState() {
  return api('/__api/state');
}

function fetchPage(id) {
  return api(`/__api/page?id=${encodeURIComponent(id)}`);
}

/* ------------------------------------------------------------------ */
/* 全局状态                                                            */
/* ------------------------------------------------------------------ */
const DIMENSIONS = {
  desktop: { width: 1100, height: 850, label: '桌面' },
  tablet: { width: 834, height: 940, label: '平板' },
  phone: { width: 390, height: 810, label: '手机' },
};

function readStored(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

function store(key, value) {
  try { localStorage.setItem(key, String(value)); } catch { /* ignore */ }
}

const state = {
  booted: false,
  pages: [],
  site: {},
  app: {},
  notes: {},
  theme: null,
  styleHash: '',
  avatarUrl: '',
  currentId: null,
  page: null,
  selection: null,
  appearance: false,
  mode: 'edit',
  device: readStored('hped.device', 'desktop'),
  dark: readStored('hped.dark', matchMedia('(prefers-color-scheme: dark)').matches ? '1' : '0') === '1',
  mode: readStored('hped.mode', 'edit') === 'preview' ? 'preview' : 'edit',
  zoom: null,
  scale: 1,
  iframeReady: false,
  loadSeq: 0,
  inlineActive: false,
  inlineWaiters: [],
  saveCount: 0,
  pendingSchedules: new Map(),
  saveErrorAt: 0,
  history: new Map(),
  lastSavedAt: '',
  tempPhoto: null,
  avatarCrop: null,
  sourceDirty: false,
};

if (!DIMENSIONS[state.device]) state.device = 'desktop';

let saveChain = Promise.resolve();
let loadingTimer = 0;
let savedFlashTimer = 0;

const els = {};
function cacheEls() {
  els.app = $('#app');
  els.rail = $('#page-nav');
  els.railSettingsBtn = $('#appearance-btn');
  els.onlineLink = $('#online-link');
  els.rootLabel = $('#root-label');
  els.appVersion = $('#app-version');
  els.crumbPage = $('#crumb-page');
  els.saveState = $('#save-state');
  els.saveLabel = $('#save-label');
  els.undo = $('#undo-btn');
  els.redo = $('#redo-btn');
  els.source = $('#source-btn');
  els.stageTitle = $('#stage-title');
  els.stageSub = $('#stage-sub');
  els.stageIcon = $('#stage-icon');
  els.deviceSwitch = $('#device-switch');
  els.modeSwitch = $('#mode-switch');
  els.themeToggle = $('#theme-toggle');
  els.zoomLabel = $('#zoom-label');
  els.deviceStage = $('#device-stage');
  els.deviceFrame = $('#device-frame');
  els.deviceAddress = $('#device-address');
  els.deviceBadge = $('#device-badge');
  els.preview = $('#preview');
  els.stageViewport = $('#stage-viewport');
  els.loading = $('#stage-loading');
  els.error = $('#stage-error');
  els.errorMessage = $('#stage-error-message');
  els.errorRetry = $('#error-retry');
  els.inlineHint = $('#inline-hint');
  els.inspector = $('#inspector');
  els.inspectorBody = $('#inspector-body');
  els.inspectorClose = $('#inspector-close');
  els.inspectorToggle = $('#inspector-toggle');
  els.toastHost = $('#toast-host');
}

/* ------------------------------------------------------------------ */
/* 保存状态 / Toast                                                     */
/* ------------------------------------------------------------------ */
function updateSaveUI(forced = '') {
  let mode = forced;
  if (!mode) {
    if (state.saveCount > 0) mode = 'saving';
    else if (state.pendingSchedules.size > 0) mode = 'dirty';
    else if (state.saveErrorAt && Date.now() - state.saveErrorAt < 4000) mode = 'error';
    else mode = 'saved';
  }
  const labels = {
    saved: state.lastSavedAt ? `已保存 ${state.lastSavedAt}` : '已保存',
    saving: '正在写入…',
    dirty: '未保存',
    error: '保存失败',
    editing: '编辑中',
  };
  els.saveState.dataset.state = mode === 'editing' ? 'dirty' : mode;
  els.saveLabel.textContent = labels[mode] || '已保存';
  els.saveState.title = mode === 'saved'
    ? '直接写入源文件，并自动留备份'
    : labels[mode];
}

function setSavedFlash() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  state.lastSavedAt = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  clearTimeout(savedFlashTimer);
  savedFlashTimer = setTimeout(() => {
    state.lastSavedAt = '';
    updateSaveUI();
  }, 60000);
}

function toast(message, type = 'info', timeout = 3400) {
  if (!message) return;
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const iconName = type === 'error' ? 'alert' : type === 'success' ? 'check' : 'info';
  el.innerHTML = `${icon(iconName)}<span>${esc(message)}</span>`;
  els.toastHost.appendChild(el);
  while (els.toastHost.children.length > 4) els.toastHost.firstElementChild.remove();
  setTimeout(() => {
    el.classList.add('is-leaving');
    setTimeout(() => el.remove(), 200);
  }, timeout);
}

/* ------------------------------------------------------------------ */
/* 保存引擎                                                            */
/* ------------------------------------------------------------------ */
function enqueueTask(task) {
  state.saveCount++;
  updateSaveUI();
  const promise = saveChain.then(task, task);
  saveChain = promise.catch(() => {});
  promise.then(
    () => {
      state.saveCount = Math.max(0, state.saveCount - 1);
      updateSaveUI();
    },
    () => {
      state.saveCount = Math.max(0, state.saveCount - 1);
      updateSaveUI('error');
    },
  );
  return promise;
}

function scheduleSave(key, task, delay = 620) {
  const existing = state.pendingSchedules.get(key);
  if (existing) clearTimeout(existing.timer);
  const timer = setTimeout(() => {
    state.pendingSchedules.delete(key);
    enqueueTask(task).catch(() => {});
    updateSaveUI();
  }, delay);
  state.pendingSchedules.set(key, { timer, task });
  updateSaveUI('dirty');
}

async function flushSchedules() {
  const entries = Array.from(state.pendingSchedules.entries());
  state.pendingSchedules.clear();
  const promises = [];
  for (const [, entry] of entries) {
    clearTimeout(entry.timer);
    promises.push(enqueueTask(entry.task));
  }
  if (!promises.length) {
    await saveChain.catch(() => {});
    return state.saveErrorAt === 0 || Date.now() - state.saveErrorAt > 4000;
  }
  const results = await Promise.allSettled(promises);
  return results.every((r) => r.status === 'fulfilled');
}

function pushHistory(pageId, source) {
  if (!pageId || !source) return;
  let stack = state.history.get(pageId);
  if (!stack) {
    stack = { undo: [], redo: [] };
    state.history.set(pageId, stack);
  }
  if (stack.undo[stack.undo.length - 1] === source) return;
  stack.undo.push(source);
  if (stack.undo.length > 40) stack.undo.shift();
  stack.redo.length = 0;
  updateUndoButtons();
}

function updateUndoButtons() {
  if (!els.undo) return;
  const stack = state.page ? state.history.get(state.page.id) : null;
  els.undo.disabled = !stack || stack.undo.length === 0;
  els.redo.disabled = !stack || stack.redo.length === 0;
  els.undo.title = stack?.undo.length
    ? `撤销（Ctrl + Z）· ${stack.undo.length} 步`
    : '撤销（Ctrl + Z）';
  els.redo.title = stack?.redo.length
    ? `重做（Ctrl + Shift + Z）· ${stack.redo.length} 步`
    : '重做（Ctrl + Shift + Z）';
}

function handleApiError(error) {
  state.saveErrorAt = Date.now();
  const message = error?.message || '保存失败';
  if (error?.conflict) {
    toast('文件已被其它程序修改，请刷新页面后再编辑', 'error', 5200);
    showConflictDialog();
  } else {
    toast(message, 'error', 4600);
  }
  updateSaveUI('error');
  setTimeout(() => updateSaveUI(), 4200);
}

async function executeOperation(op, options = {}) {
  try {
    const pageId = state.currentId;
    if (!pageId || !state.page) throw new Error('尚未打开页面');
    if (options.pageId && options.pageId !== pageId) {
      throw new Error('页面已切换，本次修改未保存');
    }
    const before = state.page.source;
    const res = await api('/__api/operation', {
      method: 'POST',
      body: {
        id: pageId,
        baseHash: state.page.hash,
        op,
      },
    });
    if (state.currentId !== pageId) return res;
    const unchanged = res.unchanged || res.page.source === before;
    state.page = res.page;
    if (!unchanged) {
      pushHistory(pageId, before);
      setSavedFlash();
    }
    state.saveErrorAt = 0;
    updateAfterPageChange();
    if (!unchanged && !options.reload && op?.type !== 'setFooterDate') {
      syncPreviewDates();
    }
    if (options.refreshInspector) renderInspector({ keepScroll: true });
    if (options.reload) {
      await reloadPreview({ keepScroll: true, soft: true });
    }
    if (options.message) toast(options.message, 'success');
    return res;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

function requestOperation(op, options = {}) {
  return enqueueTask(() => executeOperation(op, options));
}

function updateAfterPageChange() {
  if (!state.page) return;
  const info = state.pages.find((p) => p.id === state.page.id);
  if (info && state.page.type === 'cover' && state.page.meta.coverTitle &&
      info.label !== state.page.meta.coverTitle) {
    info.label = state.page.meta.coverTitle;
    renderRail();
  }
  updateStageHeader();
  updateUndoButtons();
}

/* ------------------------------------------------------------------ */
/* 页面加载                                                            */
/* ------------------------------------------------------------------ */
function pageInfo(id) {
  return state.pages.find((p) => p.id === id) || null;
}

function publicPath(id) {
  if (!id) return '/';
  if (id === 'index.html') return '/';
  if (id.endsWith('/index.html')) return `/${id.slice(0, -'index.html'.length)}`;
  return `/${id}`;
}

function previewUrl() {
  const id = state.currentId;
  if (!id) return 'about:blank';
  const encoded = id.split('/').map(encodeURIComponent).join('/');
  return `/__preview/${encoded}?dark=${state.dark ? '1' : '0'}&v=${state.page?.hash?.slice(0, 8) || Date.now()}`;
}

function showLoading(label = '正在装订页面…') {
  clearTimeout(loadingTimer);
  els.loading.hidden = false;
  els.loading.classList.remove('done');
  const p = els.loading.querySelector('p');
  if (p) p.textContent = label;
}

function hideLoading() {
  clearTimeout(loadingTimer);
  els.loading.classList.add('done');
  loadingTimer = setTimeout(() => {
    if (els.loading.classList.contains('done')) els.loading.hidden = true;
  }, 260);
}

function showStageError(message) {
  hideLoading();
  els.errorMessage.textContent = message || '未知错误';
  els.error.hidden = false;
}

function hideStageError() {
  els.error.hidden = true;
}

async function settleInline() {
  if (!state.inlineActive) return;
  await new Promise((resolve) => {
    const timer = setTimeout(resolve, 1400);
    state.inlineWaiters.push(() => {
      clearTimeout(timer);
      resolve();
    });
    sendBridge({ type: 'commitInline' });
  });
}

async function loadPage(id, { replaceHash = true } = {}) {
  if (!id) return;
  if (!pageInfo(id)) {
    toast('这个页面不在编辑器里登记，可能还是笔记页', 'error');
    return;
  }
  if (state.currentId === id && state.page) {
    if (state.appearance) {
      state.appearance = false;
      renderRail();
      renderInspector();
    }
    return;
  }
  const seq = ++state.loadSeq;
  await settleInline();
  if (seq !== state.loadSeq) return;
  const ok = await flushSchedules();
  if (seq !== state.loadSeq) return;
  if (!ok && state.currentId && state.page) {
    toast('还有修改没有保存成功，先停留在当前页', 'error');
    return;
  }

  state.currentId = id;
  state.page = null;
  state.selection = null;
  state.iframeReady = false;
  state.appearance = false;
  store('hped.lastPage', id);
  if (replaceHash) {
    try { history.replaceState(null, '', `#${encodeURIComponent(id)}`); } catch { /* ignore */ }
  }
  renderRail();
  closeInspector();
  renderInspector();
  hideStageError();
  showLoading();
  updateStageHeader();

  try {
    const res = await fetchPage(id);
    if (seq !== state.loadSeq || state.currentId !== id) return;
    state.page = res.page;
    updateStageHeader();
    updateUndoButtons();
    updateAfterPageChange();
    renderInspector();
    els.preview.src = previewUrl();
    // 若预览页没有加载桥接脚本（比如服务报错），不要让加载层永远停着。
    clearTimeout(loadingTimer);
    loadingTimer = setTimeout(() => {
      if (!state.iframeReady && state.currentId === id) hideLoading();
    }, 5000);
  } catch (error) {
    if (seq !== state.loadSeq) return;
    state.saveErrorAt = 0;
    showStageError(error.message);
    toast(error.message, 'error');
  }
}

async function reloadPreview({ keepScroll = false, soft = false } = {}) {
  if (!state.page) return;
  let scrollY = 0;
  try {
    scrollY = els.preview.contentWindow?.scrollY || 0;
  } catch {
    scrollY = 0;
  }
  state.iframeReady = false;
  state.selection = null;
  if (!soft) showLoading('正在刷新预览…');
  else showLoading('正在更新页面…');
  try {
    els.preview.contentWindow?.scrollTo(0, scrollY);
  } catch { /* ignore */ }
  els.preview.src = previewUrl();
  state._restoreScroll = keepScroll ? scrollY : 0;
  renderInspector();
  updateStageHeader();
}

async function reloadCurrentPageData() {
  if (!state.currentId) return;
  try {
    const res = await fetchPage(state.currentId);
    state.page = res.page;
    updateStageHeader();
    updateUndoButtons();
  } catch (error) {
    toast(error.message, 'error');
  }
}

function updateStageHeader() {
  const info = pageInfo(state.currentId);
  if (!info) return;
  els.stageTitle.textContent = info.label;
  els.stageIcon.innerHTML = icon(info.icon);
  els.crumbPage.textContent = state.appearance
    ? `${info.label} · 外观与设置`
    : `${info.label}${state.page ? ' · 可视化编辑' : ''}`;
  els.stageSub.textContent = state.appearance
    ? '调整头像、壁纸与全站配色'
    : state.mode === 'preview'
      ? '预览模式 · 链接、照片墙可以正常交互'
      : '单击选中 · 双击文字直接编辑';
  els.deviceAddress.textContent = `${siteHost()}${publicPath(state.currentId)}`;
  els.deviceBadge.textContent = DIMENSIONS[state.device].label;
  els.onlineLink.hidden = !state.site.url;
  els.onlineLink.href = state.site.url || '#';
}

function siteHost() {
  try {
    return new URL(state.site.url).host;
  } catch {
    return '本地预览';
  }
}

/* ------------------------------------------------------------------ */
/* iframe 通信                                                          */
/* ------------------------------------------------------------------ */
function sendBridge(message) {
  try {
    els.preview.contentWindow?.postMessage({ source: NS, ...message }, '*');
  } catch { /* ignore */ }
}

function syncPreviewDates() {
  if (!state.page) return;
  const date = todayIso();
  if (state.page.type === 'cover') {
    sendBridge({ type: 'setCoverDate', date });
  }
  sendBridge({ type: 'setFooterText', text: `最后更新：${date}` });
}

function liveThemePayload() {
  if (!state.theme) return null;
  const light = {
    '--card-alpha': String(state.theme.cardAlpha.light),
    '--accent': state.theme.accent.light,
  };
  const dark = {
    '--card-alpha': String(state.theme.cardAlpha.dark),
    '--accent': state.theme.accent.dark,
  };
  const lw = hexToRgba(state.theme.accent.light, 0.08);
  const dw = hexToRgba(state.theme.accent.dark, 0.14);
  if (lw) light['--accent-weak'] = lw;
  if (dw) dark['--accent-weak'] = dw;
  if (state.theme.wallpaper?.url) {
    light['--wallpaper'] = `url("/${state.theme.wallpaper.url.replace(/^\.?\//, '')}")`;
  } else {
    light['--wallpaper'] = 'none';
  }
  return { light, dark };
}

function onBridgeMessage(event) {
  if (event.source !== els.preview.contentWindow) return;
  const data = event.data || {};
  if (data.source !== 'homepage-editor-bridge') return;

  switch (data.type) {
    case 'ready': {
      state.iframeReady = true;
      hideLoading();
      sendBridge({
        type: 'init',
        mode: state.mode,
        dark: state.dark,
        theme: liveThemePayload(),
        avatar: state.avatarUrl,
      });
      requestAnimationFrame(() => {
        fitStage();
        if (state._restoreScroll) {
          sendBridge({ type: 'scrollTo', y: state._restoreScroll });
          state._restoreScroll = 0;
        }
      });
      break;
    }
    case 'selected': {
      state.appearance = false;
      state.selection = data.detail || null;
      renderRail();
      updateStageHeader();
      renderInspector();
      openInspectorOnNarrow();
      break;
    }
    case 'deselected': {
      if (state.selection) {
        state.selection = null;
        if (!state.appearance) renderInspector();
      }
      break;
    }
    case 'readonly': {
      toast(data.message || '这块内容由脚本自动生成，不能直接编辑', 'info', 4200);
      break;
    }
    case 'inline-start': {
      state.inlineActive = true;
      state.inlineEid = data.eid;
      cancelPendingForEid(data.eid);
      els.inlineHint.hidden = false;
      updateSaveUI('editing');
      break;
    }
    case 'inline-input': {
      state.inlineDraft = { eid: data.eid, html: data.html };
      updateSaveUI('editing');
      break;
    }
    case 'inline-commit': {
      state.inlineActive = false;
      els.inlineHint.hidden = true;
      const draft = { eid: data.eid, html: data.html };
      state.inlineDraft = null;
      if (state.page) {
        requestOperation({ type: 'setContent', eid: draft.eid, html: draft.html }, {})
          .catch(() => {})
          .finally(() => resolveInlineWaiters());
      } else {
        resolveInlineWaiters();
      }
      break;
    }
    case 'inline-cancel': {
      state.inlineActive = false;
      state.inlineDraft = null;
      els.inlineHint.hidden = true;
      updateSaveUI();
      resolveInlineWaiters();
      break;
    }
    case 'shortcut': {
      if (data.action === 'undo') undo();
      else if (data.action === 'redo') redo();
      else if (data.action === 'save') {
        flushSchedules().then(() => toast('已保存到源文件', 'success', 1600));
      }
      break;
    }
    case 'navigate': {
      if (data.external) {
        window.open(data.href, '_blank', 'noopener');
        break;
      }
      const path = String(data.path || '');
      let id = path.replace(/^\/+/, '');
      if (!id || id.endsWith('/')) id += 'index.html';
      if (pageInfo(id)) {
        loadPage(id);
      } else {
        toast('这个链接指向的页面不在编辑器里（可能是笔记页），可在「源码」里继续编辑', 'info', 4000);
      }
      break;
    }
    default:
      break;
  }
}

function resolveInlineWaiters() {
  const waiters = state.inlineWaiters.splice(0);
  waiters.forEach((resolve) => resolve());
}

/* ------------------------------------------------------------------ */
/* 舞台布局                                                            */
/* ------------------------------------------------------------------ */
function activeDimension() {
  return DIMENSIONS[state.device];
}

function fitStage() {
  if (!els.deviceStage) return;
  const dim = activeDimension();
  const availableW = Math.max(200, els.stageViewport.clientWidth - 54);
  const availableH = Math.max(160, els.stageViewport.clientHeight - 46);
  const fitScale = Math.min(availableW / dim.width, availableH / dim.height, 1);
  const scale = state.zoom || Math.max(0.22, fitScale);
  state.scale = scale;
  els.deviceStage.style.width = `${Math.round(dim.width * scale)}px`;
  els.deviceStage.style.height = `${Math.round(dim.height * scale)}px`;
  els.deviceFrame.style.width = `${dim.width}px`;
  els.deviceFrame.style.height = `${dim.height}px`;
  els.deviceFrame.style.transform = `scale(${scale})`;
  els.zoomLabel.textContent = `${Math.round(scale * 100)}%`;
  els.zoomLabel.title = state.zoom ? '点击恢复适应窗口' : '当前为适应窗口';
}

function setDevice(device) {
  if (!DIMENSIONS[device]) return;
  state.device = device;
  store('hped.device', device);
  $$('#device-switch button').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.device === device);
  });
  els.deviceBadge.textContent = DIMENSIONS[device].label;
  requestAnimationFrame(fitStage);
}

function adjustZoom(delta) {
  const next = Math.min(1.6, Math.max(0.2, state.scale + delta));
  state.zoom = Math.round(next * 100) / 100;
  fitStage();
}

function resetZoom() {
  state.zoom = null;
  fitStage();
}

function setMode(mode) {
  state.mode = mode === 'preview' ? 'preview' : 'edit';
  store('hped.mode', state.mode);
  $$('#mode-switch button').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.mode === state.mode);
  });
  els.stageSub.textContent = state.appearance
    ? '调整头像、壁纸与全站配色'
    : state.mode === 'preview'
      ? '预览模式 · 链接、照片墙可以正常交互'
      : '单击选中 · 双击文字直接编辑';
  sendBridge({ type: 'setMode', mode: state.mode });
  if (state.mode === 'preview') {
    state.selection = null;
    els.inlineHint.hidden = true;
    if (!state.appearance) renderInspector();
  }
}

function toggleTheme() {
  state.dark = !state.dark;
  store('hped.dark', state.dark ? '1' : '0');
  els.themeToggle.innerHTML = icon(state.dark ? 'sun' : 'moon');
  els.themeToggle.title = state.dark ? '切换到浅色预览' : '切换到深色预览';
  sendBridge({ type: 'setDark', dark: state.dark });
  updateStageHeader();
}

/* ------------------------------------------------------------------ */
/* 侧栏与检查器开关                                                     */
/* ------------------------------------------------------------------ */
function renderRail() {
  if (!state.pages.length) return;
  const groups = new Map();
  for (const page of state.pages) {
    if (!groups.has(page.group)) groups.set(page.group, []);
    groups.get(page.group).push(page);
  }
  const html = [];
  for (const [group, pages] of groups) {
    html.push('<div class="rail-group">');
    html.push(`<div class="rail-heading">${esc(group)}</div>`);
    html.push('<div class="rail-links">');
    for (const page of pages) {
      const active = !state.appearance && page.id === state.currentId;
      const badge = page.badge ? `<span class="page-badge">${esc(page.badge)}</span>` : '';
      html.push(`<button type="button" class="page-link${active ? ' active' : ''}" data-page-id="${escAttr(page.id)}" title="${escAttr(page.label)}">
        ${icon(page.icon)}<span class="page-label">${esc(page.label)}</span>${badge}
      </button>`);
    }
    html.push('</div></div>');
  }
  const sources = state.notes?.sources || [];
  if (sources.length) {
    html.push('<div class="rail-group rail-notes-group">');
    html.push('<div class="rail-heading">笔记源</div>');
    html.push('<div class="rail-links">');
    for (const course of sources) {
      html.push(`<button type="button" class="page-link notes-link" data-notes-course="${escAttr(course.course)}" title="${escAttr(course.title)} · Markdown 章节">
        ${icon('note')}<span class="page-label">${esc(course.title)}</span><span class="page-badge">${course.chapters.length} 章</span>
      </button>`);
    }
    html.push('</div></div>');
  }
  els.rail.innerHTML = html.join('');
  els.railSettingsBtn.classList.toggle('active', state.appearance);
  updateUndoButtons();
}

function openInspectorOnNarrow() {
  if (isNarrow()) {
    els.app.classList.add('inspector-open');
  }
}

function closeInspector() {
  els.app.classList.remove('inspector-open');
}

function toggleInspector() {
  if (els.app.classList.contains('inspector-open')) closeInspector();
  else els.app.classList.add('inspector-open');
}

/* ------------------------------------------------------------------ */
/* 启动                                                                */
/* ------------------------------------------------------------------ */
async function boot() {
  cacheEls();
  hydrateIcons();
  els.themeToggle.innerHTML = icon(state.dark ? 'sun' : 'moon');
  els.themeToggle.title = state.dark ? '切换到浅色预览' : '切换到深色预览';
  bindGlobalEvents();

  try {
    const data = await fetchState();
    state.pages = data.pages || [];
    state.site = data.site || {};
    state.app = data.app || {};
    state.notes = data.notes || {};
    state.theme = data.theme || null;
    state.styleHash = data.style?.hash || '';
    state.avatarUrl = data.avatar?.url || '/assets/avatar.jpg';
    state.booted = true;

    els.rootLabel.textContent = state.app.rootLabel || '个人主页';
    els.appVersion.textContent = `v${state.app.version || '1.0'}`;
    els.onlineLink.hidden = !state.site.url;
    els.onlineLink.href = state.site.url || '#';

    setDevice(state.device);
    renderRail();
    setMode(state.mode);

    const hashId = decodeURIComponent(location.hash.replace(/^#/, ''));
    const last = readStored('hped.lastPage', '');
    const preferred = pageInfo(hashId) ? hashId : pageInfo(last) ? last : (pageInfo('index.html') ? 'index.html' : state.pages[0]?.id);
    if (preferred) await loadPage(preferred);
    else showStageError('站点里还没有可编辑的页面');
  } catch (error) {
    showStageError(error.message);
    els.rail.innerHTML = `<div class="tip warn">${esc(error.message)}</div>`;
    toast(error.message, 'error', 6000);
  }
}

function bindGlobalEvents() {
  document.addEventListener('click', (event) => {
    const notesBtn = event.target.closest('[data-notes-course]');
    if (notesBtn) {
      event.preventDefault();
      openNotesManager(notesBtn.dataset.notesCourse);
      return;
    }
    const pageBtn = event.target.closest('[data-page-id]');
    if (pageBtn) {
      event.preventDefault();
      loadPage(pageBtn.dataset.pageId);
      return;
    }
    const actionEl = event.target.closest('[data-action]');
    if (!actionEl) return;
    const action = actionEl.dataset.action;
    switch (action) {
      case 'appearance':
        event.preventDefault();
        toggleAppearance();
        break;
      case 'undo':
        event.preventDefault();
        undo();
        break;
      case 'redo':
        event.preventDefault();
        redo();
        break;
      case 'source':
        event.preventDefault();
        openSourceModal();
        break;
      case 'publish':
        event.preventDefault();
        openPublishDialog();
        break;
      case 'theme':
        event.preventDefault();
        toggleTheme();
        break;
      case 'deselect':
        event.preventDefault();
        if (state.appearance) {
          state.appearance = false;
          renderRail();
          updateStageHeader();
        }
        state.selection = null;
        sendBridge({ type: 'deselect' });
        renderInspector();
        if (isNarrow()) closeInspector();
        break;
      case 'add-entry':
        event.preventDefault();
        openEntryDialog();
        break;
      case 'add-book':
        event.preventDefault();
        openBookDialog();
        break;
      case 'add-photo':
        event.preventDefault();
        openPhotoDialog(actionEl.dataset.wallEid || '');
        break;
      case 'add-location':
        event.preventDefault();
        openLocationDialog();
        break;
      case 'add-block':
        event.preventDefault();
        openBlockDialog();
        break;
      case 'manage-entries':
        event.preventDefault();
        openContentManager('entries');
        break;
      case 'manage-photos':
        event.preventDefault();
        openContentManager('photos');
        break;
      case 'sync-sidebar':
        event.preventDefault();
        syncSidebar();
        break;
      case 'move-up':
        event.preventDefault();
        moveSelection('up');
        break;
      case 'move-down':
        event.preventDefault();
        moveSelection('down');
        break;
      case 'delete-selection':
        event.preventDefault();
        deleteSelection();
        break;
      case 'delete-photo-group':
        event.preventDefault();
        deletePhotoGroup(actionEl.dataset.wallEid || state.selection?.eid);
        break;
      case 'replace-photo':
        event.preventDefault();
        replacePhotoFlow();
        break;
      case 'avatar-upload':
        event.preventDefault();
        avatarUploadFlow();
        break;
      case 'wallpaper-upload':
        event.preventDefault();
        wallpaperUploadFlow();
        break;
      case 'set-wallpaper':
        event.preventDefault();
        setWallpaper(actionEl.dataset.value || '', actionEl.dataset.id || '');
        break;
      default:
        break;
    }
  });

  els.deviceSwitch.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-device]');
    if (btn) setDevice(btn.dataset.device);
  });

  els.modeSwitch.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-mode]');
    if (btn) setMode(btn.dataset.mode);
  });

  $('.zoom-group').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-zoom]');
    if (!btn) return;
    const action = btn.dataset.zoom;
    if (action === 'in') adjustZoom(0.1);
    else if (action === 'out') adjustZoom(-0.1);
    else resetZoom();
  });

  els.inspectorClose.addEventListener('click', closeInspector);
  els.inspectorToggle.addEventListener('click', toggleInspector);
  els.errorRetry.addEventListener('click', () => {
    if (state.currentId) loadPage(state.currentId, { replaceHash: false });
  });

  els.preview.addEventListener('load', () => {
    setTimeout(() => {
      if (!state.iframeReady && !els.stageError.hidden) return;
      if (!state.iframeReady) hideLoading();
    }, 700);
  });

  window.addEventListener('message', onBridgeMessage);

  let resizeFrame = 0;
  window.addEventListener('resize', () => {
    if (resizeFrame) return;
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0;
      fitStage();
    });
  });

  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const mod = event.metaKey || event.ctrlKey;
    if (mod && key === 's') {
      event.preventDefault();
      flushSchedules().then(() => toast('已保存到源文件', 'success', 1600));
      return;
    }
    if (event.key === 'Escape') {
      if ($('#modal-host').hidden === false) return;
      if ($('#crop-host').hidden === false) {
        closeCrop();
        return;
      }
      if (state.inlineActive) {
        sendBridge({ type: 'commitInline' });
      } else if (state.selection) {
        state.selection = null;
        sendBridge({ type: 'deselect' });
        renderInspector();
      }
      return;
    }
    const target = event.target;
    const editing = target && (target.matches?.('input, textarea, [contenteditable="true"]'));
    if (editing) return;
    if (mod && key === 'z') {
      event.preventDefault();
      if (event.shiftKey) redo();
      else undo();
    } else if (mod && key === 'y') {
      event.preventDefault();
      redo();
    }
  });

  window.addEventListener('beforeunload', (event) => {
    if (state.inlineActive || state.pendingSchedules.size || state.saveCount) {
      event.preventDefault();
      event.returnValue = '';
    }
  });
}

/* ------------------------------------------------------------------ */
/* 检查器：总览 / 选中 / 外观                                          */
/* ------------------------------------------------------------------ */
function sanitizeUiHtml(html) {
  const template = document.createElement('template');
  template.innerHTML = String(html || '');
  template.content.querySelectorAll('script,style,iframe,object,embed,img,svg,link,meta').forEach((n) => n.remove());
  const allowed = new Set(['A', 'STRONG', 'B', 'EM', 'I', 'U', 'S', 'DEL', 'CODE', 'BR', 'SPAN', 'CITE', 'SUP', 'SUB', 'MARK']);
  const walk = (node) => {
    const children = Array.from(node.children || []);
    for (const child of children) {
      if (!allowed.has(child.tagName)) {
        if (['DIV', 'P', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(child.tagName)) {
          child.replaceWith(document.createElement('br'), ...Array.from(child.childNodes));
        } else {
          child.replaceWith(...Array.from(child.childNodes));
        }
        continue;
      }
      Array.from(child.attributes).forEach((attr) => {
        const name = attr.name.toLowerCase();
        const keep = child.tagName === 'A' && (name === 'href' || name === 'title' || name === 'target');
        if (!keep) child.removeAttribute(attr.name);
      });
      walk(child);
    }
  };
  walk(template.content);
  return template.innerHTML;
}

const PHOTO_TYPE_LABEL = new Map();

function isBookPage() {
  const info = pageInfo(state.currentId);
  return info?.form === 'books' || state.currentId === 'hobby-novel.html';
}

function stripBookIcon(title) {
  return String(title || '').replace(/^\s*📖️?\s*/u, '').trim();
}

function bookEntryData(entry) {
  const rawTitle = String(entry?.title || '').trim();
  const title = stripBookIcon(rawTitle) || rawTitle;
  const desc = String(entry?.desc || '').trim();
  const parts = desc.split('·');
  let author = '';
  let review = desc;
  if (parts.length > 1) {
    author = parts.shift().trim();
    review = parts.join('·').trim();
  }
  return {
    title,
    author,
    review,
    href: entry?.href || '',
    newTab: Boolean(entry?.newTab || entry?.target === '_blank'),
  };
}

function selectionTitle(d) {
  if (!d) return '未选择';
  if (d.entry) {
    if (isBookPage()) return bookEntryData(d.entry).title || '小说卡片';
    return d.entry.title || '入口卡片';
  }
  if (d.figure) return d.figure.caption || '照片';
  if (d.link) return truncate(d.text || '链接', 38);
  if (d.isPhotoWall) return photoWallTitle(d.eid) || '照片分组';
  if (d.textEditable) return truncate(d.text || '文字块', 38);
  return displayTag(d);
}

function displayTag(d) {
  if (!d) return '';
  const mainClass = (d.classes || []).find((c) => c !== 'active') || '';
  return mainClass ? `${d.tag}.${mainClass}` : d.tag;
}

function selectionDescriptor(d) {
  if (d.entry) return isBookPage() ? '小说书单中的一本书' : '快捷入口卡片';
  if (d.figure) return '照片墙中的照片';
  if (d.link) return '链接元素';
  if (d.isPhotoWall) return '照片分组';
  if (d.inSidebar) return '侧边栏元素 · 只在当前页面';
  if (d.textEditable) return '可编辑文字内容';
  if (d.isContainer) return '结构容器';
  return '页面元素';
}

function photoWallTitle(eid) {
  const loc = state.page?.meta?.photoLocations?.find((item) => item.wallEid === eid);
  return loc?.title || '照片分组';
}

function syncCardHtml() {
  return `<div class="sync-card">
    <div class="sync-card-head">
      <span class="sync-card-icon">${icon('layers')}</span>
      <strong>全站导航同步</strong>
    </div>
    <p>卡片版每个页面都有一份侧边栏。改好当前页的导航后，可以一键覆盖其它页面的侧边栏，并保留各页自己的高亮状态。</p>
    <button class="btn soft small" data-action="sync-sidebar">${icon('refresh')}用当前页同步全站</button>
  </div>`;
}

function pageTagsHtml(d) {
  const tags = [];
  tags.push(`<span class="tag-pill accent">${esc(displayTag(d))}</span>`);
  (d.classes || []).slice(0, 5).forEach((cls) => {
    if (`${d.tag}.${cls}` === displayTag(d)) return;
    tags.push(`<span class="tag-pill">.${esc(cls)}</span>`);
  });
  if (d.readOnly) tags.push('<span class="tag-pill warn">自动生成</span>');
  if (d.inSidebar) tags.push('<span class="tag-pill warn">仅本页侧栏</span>');
  return tags.join('');
}

function renderInspector(options = {}) {
  if (!els.inspectorBody) return;
  const scroll = options.keepScroll ? els.inspector.scrollTop : 0;
  if (!state.page) {
    els.inspectorBody.innerHTML = `<div class="ins-wrap">
      <div class="ins-head">
        <div class="ins-eyebrow">${icon('cursor')} 准备就绪</div>
        <h2 class="ins-title">正在读取页面</h2>
        <p class="ins-sub">页面载入后，点击预览里的元素就可以开始修改。</p>
      </div>
    </div>`;
    return;
  }
  if (state.appearance) {
    els.inspectorBody.innerHTML = appearanceHtml();
    bindAppearance();
  } else if (state.selection) {
    els.inspectorBody.innerHTML = selectionHtml(state.selection);
    bindSelection(state.selection);
  } else {
    els.inspectorBody.innerHTML = overviewHtml();
    bindOverview();
  }
  hydrateIcons(els.inspectorBody);
  els.inspector.scrollTop = options.keepScroll ? scroll : 0;
}

/* ---------------------------- 页面总览 ---------------------------- */
function overviewHtml() {
  const info = pageInfo(state.page.id);
  const meta = state.page.meta;
  const cover = state.page.type === 'cover';
  const bookPage = isBookPage();
  const titleValue = cover ? meta.coverTitle : meta.docTitle;
  const dateValue = cover ? meta.coverDate : parseDateFromFooter(meta.footerText);
  const can = meta.can || {};
  const courseName = cover ? (state.page.id.split('/')[0] || '') : '';
  const course = cover ? state.notes.courses?.find((c) => c.course === courseName) : null;
  const stats = cover
    ? [
      [`${course?.count ?? 0}`, '生成小节'],
      [`${course?.chapters ?? 0}`, '章'],
    ]
    : [
      [meta.entries || 0, bookPage ? '本小说' : '入口卡片'],
      [meta.photos || 0, '照片'],
    ];

  const tiles = [];
  if (can.addEntry) {
    tiles.push(bookPage
      ? { action: 'add-book', icon: 'novel', title: '添加小说', hint: '书名 / 作者 / 链接' }
      : { action: 'add-entry', icon: 'plus', title: '添加入口卡片', hint: '网格里的快捷入口' });
  }
  if (can.addPhoto) {
    tiles.push({ action: 'add-photo', icon: 'image', title: '添加照片', hint: '自动写入照片墙' });
  }
  if (can.addLocation) {
    tiles.push({ action: 'add-location', icon: 'folder', title: '新建照片分组', hint: '新地点 / 新主题' });
  }
  if (can.addBlock) {
    tiles.push({ action: 'add-block', icon: 'type', title: '添加标题 / 段落', hint: '在页脚前插入内容' });
  }

  return `<div class="ins-wrap">
    <div class="ins-head">
      <div class="ins-head-top">
        <div class="ins-eyebrow">${icon(info?.icon || 'file')} ${cover ? '书封面' : '页面设置'}</div>
        <button class="deselect-btn" data-action="deselect" title="收起选择（Esc）">${icon('close')}</button>
      </div>
      <h2 class="ins-title">${esc(info?.label || state.page.id)}</h2>
      <p class="ins-sub">${cover ? '章节目录由笔记自动生成，这里可以改书名与简介。' : '点击预览里的文字、卡片或照片，就能在右侧修改。'}</p>
      <div class="ins-breadcrumb">${esc(state.page.id)}</div>
    </div>

    <div class="ins-section">
      <div class="overview-card">
        <span class="overview-icon">${icon(info?.icon || 'file')}</span>
        <div class="overview-copy">
          <h2>${esc(info?.label || '')}</h2>
          <p>${cover ? '整页阅读版式 · 点击任意段落可编辑' : '磨砂玻璃卡片版式'}</p>
        </div>
      </div>
      <div class="stat-row">
        ${stats.map(([value, label]) => `<div class="stat"><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join('')}
      </div>
    </div>

    <div class="ins-section">
      <div class="section-title">页面属性 <span>修改即保存</span></div>
      <div class="field">
        <label class="field-label" for="page-title-field">${cover ? '书名' : '浏览器标题'}</label>
        <input class="field-input" id="page-title-field" value="${escAttr(titleValue)}" spellcheck="false">
        <div class="field-inline-hint">${cover ? '书名同时也是这个页面的 H1 与标签页标题。' : '这是浏览器标签上显示的文字。'}</div>
      </div>
      <div class="field">
        <label class="field-label" for="page-date-field">${cover ? '封面日期' : '最后更新日期'} <small>自动</small></label>
        <input class="field-input" id="page-date-field" value="${escAttr(dateValue)}" readonly>
        <div class="field-inline-hint">${cover ? '保存封面或修改本书笔记时自动记为当天；小节页日期也会同步更新。' : '保存页面的任意内容时自动记为当天。'}</div>
      </div>
    </div>

    <div class="ins-section">
      <div class="section-title">添加内容</div>
      <div class="action-grid">
        ${tiles.map((tile) => `<button type="button" class="action-tile" data-action="${tile.action}">
          <span class="tile-icon">${icon(tile.icon)}</span>
          <span class="tile-copy"><strong>${esc(tile.title)}</strong><small>${esc(tile.hint)}</small></span>
        </button>`).join('')}
      </div>
    </div>

    ${(meta.entryCards?.length || meta.photoLocations?.length) ? `<div class="ins-section">
      <div class="section-title">页面内容 <span>增删 / 排序</span></div>
      <div class="action-grid">
        ${meta.entryCards?.length ? `<button type="button" class="action-tile" data-action="manage-entries">
          <span class="tile-icon">${icon(bookPage ? 'novel' : 'grid')}</span>
          <span class="tile-copy"><strong>${bookPage ? '管理小说书单' : '管理入口卡片'}</strong><small>${meta.entryCards.length} ${bookPage ? '本 · 编辑 / 删除' : '张 · 排序 / 删除'}</small></span>
        </button>` : ''}
        ${meta.photoLocations?.length ? `<button type="button" class="action-tile" data-action="manage-photos">
          <span class="tile-icon">${icon('image')}</span>
          <span class="tile-copy"><strong>管理照片墙</strong><small>${meta.photoLocations.length} 组 · ${meta.photoLocations.reduce((n, g) => n + (g.photos?.length || 0), 0)} 张</small></span>
        </button>` : ''}
      </div>
    </div>` : ''}

    ${can.syncSidebar ? `<div class="ins-section"><div class="section-title">全站导航</div>${syncCardHtml()}</div>` : ''}

    <div class="ins-section">
      <div class="tip">${icon('cursor')} 在预览中单击选中元素，<strong>双击</strong>文字可以直接编辑；拖动选择文字后会出现格式工具条。</div>
      ${cover ? `<div class="tip" style="margin-top:7px">${icon('info')} 章节页面由 Markdown 生成，编辑器只处理封面上的介绍文字；讲义内容请继续用原来的 Markdown 流程维护。</div>` : ''}
    </div>
  </div>`;
}

function bindOverview() {
  const titleField = $('#page-title-field');
  if (titleField) {
    const commit = () => {
      const value = titleField.value.trim();
      commitPageTitle(value).catch(() => {
        const info = pageInfo(state.page?.id);
        const meta = state.page?.meta;
        titleField.value = state.page?.type === 'cover' ? (meta?.coverTitle || '') : (meta?.docTitle || info?.label || '');
      });
    };
    titleField.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        titleField.blur();
      }
    });
    titleField.addEventListener('change', commit);
  }
}

async function commitPageTitle(value) {
  if (!state.page) return;
  if (!value) {
    toast('标题不能为空', 'error');
    throw new Error('标题不能为空');
  }
  const meta = state.page.meta;
  if (state.page.type === 'cover') {
    if (value === meta.coverTitle) return;
    sendBridge({ type: 'setCoverTitle', title: value });
    await requestOperation({ type: 'setCoverTitle', title: value }, {});
    const info = pageInfo(state.currentId);
    if (info) {
      info.label = value;
      renderRail();
    }
    updateStageHeader();
  } else {
    if (value === meta.docTitle) return;
    sendBridge({ type: 'setDocTitle', title: value });
    await requestOperation({ type: 'setDocTitle', title: value }, {});
  }
}

async function commitPageDate(value) {
  if (!state.page) return;
  if (!value) {
    toast('请选择日期', 'error');
    throw new Error('请选择日期');
  }
  sendBridge({ type: 'setFooterText', text: `最后更新：${value}` });
  if (state.page.type === 'cover') sendBridge({ type: 'setCoverDate', date: value });
  await requestOperation({ type: 'setFooterDate', date: value }, {});
}

/* ---------------------------- 选中元素 ---------------------------- */
function selectionHtml(d) {
  const title = selectionTitle(d);
  const can = state.page?.meta?.can || {};
  const isEntry = Boolean(d.entry);
  const isBook = isEntry && isBookPage();
  const isFigure = Boolean(d.figure);
  const isLink = Boolean(d.link) && !isEntry;
  const isText = Boolean(d.textEditable) && !isEntry && !isFigure;
  const isPhotoWall = Boolean(d.isPhotoWall);
  const inSidebar = Boolean(d.inSidebar);

  let content = '';

  if (isBook) {
    const book = bookEntryData(d.entry);
    content = `<div class="ins-section">
      <div class="section-title">小说信息 <span>自动保存</span></div>
      <div class="field-row">
        <div class="field">
          <label class="field-label" for="book-title">书名</label>
          <input class="field-input" id="book-title" value="${escAttr(book.title)}" placeholder="书名">
        </div>
        <div class="field">
          <label class="field-label" for="book-author">作者</label>
          <input class="field-input" id="book-author" value="${escAttr(book.author)}" placeholder="作者">
        </div>
      </div>
      <div class="field">
        <label class="field-label" for="book-href">链接</label>
        <input class="field-input" id="book-href" value="${escAttr(book.href)}" spellcheck="false" placeholder="https://www.qidian.com/book/…">
      </div>
      <div class="switch-row">
        <div class="switch-copy"><strong>在新标签页打开</strong><small>起点等站外链接建议开启</small></div>
        <label class="switch"><input type="checkbox" id="book-newtab" ${book.newTab ? 'checked' : ''}><span></span></label>
      </div>
      <div class="field">
        <label class="field-label" for="book-review">评价 / 简介</label>
        <textarea class="field-textarea" id="book-review" placeholder="可选">${esc(book.review)}</textarea>
      </div>
      <div class="field-inline-hint">标题会自动带上 📖 图标；作者与评价会合成卡片副标题。</div>
    </div>`;
  } else if (isEntry) {
    content = `<div class="ins-section">
      <div class="section-title">卡片内容 <span>自动保存</span></div>
      <div class="field">
        <label class="field-label" for="entry-href">链接地址</label>
        <input class="field-input" id="entry-href" value="${escAttr(d.entry.href)}" spellcheck="false" placeholder="https://…">
      </div>
      <div class="switch-row">
        <div class="switch-copy"><strong>在新标签页打开</strong><small>站外链接建议开启</small></div>
        <label class="switch"><input type="checkbox" id="entry-newtab" ${d.entry.newTab ? 'checked' : ''}><span></span></label>
      </div>
      <div class="field">
        <label class="field-label" for="entry-title">标题</label>
        <input class="field-input" id="entry-title" value="${escAttr(d.entry.title)}" placeholder="卡片标题">
      </div>
      <div class="field">
        <label class="field-label" for="entry-desc">描述</label>
        <textarea class="field-textarea" id="entry-desc" placeholder="一两句话说明">${esc(d.entry.desc)}</textarea>
      </div>
    </div>`;
  } else if (isFigure) {
    content = `<div class="ins-section">
      <div class="section-title">照片内容 <span>自动保存</span></div>
      <div class="image-field">
        <div class="image-thumb" id="figure-thumb" style="background-image:url('${escAttr(assetUrl(d.figure.src))}')"></div>
        <div class="image-side">
          <button type="button" class="btn ghost small" data-action="replace-photo">${icon('upload')}更换照片</button>
          <span class="image-note">上传后自动压缩，并按原比例记录宽高。</span>
        </div>
      </div>
      <div class="field" style="margin-top:13px">
        <label class="field-label" for="figure-caption">图片说明</label>
        <input class="field-input" id="figure-caption" value="${escAttr(d.figure.caption)}" placeholder="悬停时显示在照片下沿">
      </div>
      <div class="field">
        <label class="field-label" for="figure-alt">替代文字 <small>读屏 / 加载失败时显示</small></label>
        <input class="field-input" id="figure-alt" value="${escAttr(d.figure.alt)}" placeholder="照片里有什么">
      </div>
      <details class="advanced">
        <summary>高级：显示尺寸</summary>
        <div class="field-row" style="margin-top:9px">
          <div class="field">
            <label class="field-label" for="figure-width">宽度</label>
            <input class="field-input" id="figure-width" type="number" min="1" max="20000" value="${escAttr(d.figure.width)}">
          </div>
          <div class="field">
            <label class="field-label" for="figure-height">高度</label>
            <input class="field-input" id="figure-height" type="number" min="1" max="20000" value="${escAttr(d.figure.height)}">
          </div>
        </div>
        <div class="field-inline-hint">这两个数字决定照片墙里的排版比例，通常保持原图尺寸即可。</div>
      </details>
    </div>`;
  } else if (isLink && !isText) {
    content = `<div class="ins-section">
      <div class="section-title">链接设置</div>
      <div class="field">
        <label class="field-label" for="link-href">链接地址</label>
        <input class="field-input" id="link-href" value="${escAttr(d.link.href)}" spellcheck="false">
      </div>
      <div class="switch-row">
        <div class="switch-copy"><strong>在新标签页打开</strong><small>给站外链接使用</small></div>
        <label class="switch"><input type="checkbox" id="link-newtab" ${d.link.newTab ? 'checked' : ''}><span></span></label>
      </div>
    </div>`;
  } else if (isText) {
    content = `<div class="ins-section">
      <div class="section-title">文字内容 <span>自动保存</span></div>
      ${isLink ? `<div class="field">
        <label class="field-label" for="link-href">链接地址</label>
        <input class="field-input" id="link-href" value="${escAttr(d.link.href)}" spellcheck="false">
        <div class="switch-row" style="margin-top:8px">
          <div class="switch-copy"><strong>在新标签页打开</strong></div>
          <label class="switch"><input type="checkbox" id="link-newtab" ${d.link.newTab ? 'checked' : ''}><span></span></label>
        </div>
      </div>` : ''}
      ${richEditorHtml(sanitizeUiHtml(d.html), '输入文字…')}
      <div class="field-inline-hint">也可以双击预览中的这段文字直接修改。换行请用 Shift + Enter。</div>
    </div>`;
  } else if (isPhotoWall) {
    const count = d.photoCount || 0;
    content = `<div class="ins-section">
      <div class="section-title">照片分组</div>
      <div class="tip">${icon('image')} 这个分组里有 <strong style="margin:0 3px">${count}</strong> 张照片。添加入口会自动放到本组最后一行的末尾。</div>
      <div class="btn-row" style="margin-top:10px">
        <button type="button" class="btn soft small" data-action="add-photo" data-wall-eid="${escAttr(d.eid)}">${icon('plus')}添加照片</button>
        <button type="button" class="btn danger small" data-action="delete-photo-group" data-wall-eid="${escAttr(d.eid)}">${icon('trash')}删除整组</button>
      </div>
    </div>`;
  } else {
    content = `<div class="ins-section">
      <div class="section-title">容器</div>
      <div class="tip">${icon('info')} 这是页面的结构容器。点击它内部的具体文字、卡片或照片来编辑；要删除或重排结构，请使用源码模式。</div>
      ${can.addEntry || can.addPhoto || can.addBlock ? `<div class="action-grid" style="margin-top:10px">
        ${can.addEntry ? `<button class="action-tile" data-action="add-entry"><span class="tile-icon">${icon('plus')}</span><span class="tile-copy"><strong>添加卡片</strong></span></button>` : ''}
        ${can.addPhoto ? `<button class="action-tile" data-action="add-photo"><span class="tile-icon">${icon('image')}</span><span class="tile-copy"><strong>添加照片</strong></span></button>` : ''}
        ${can.addBlock ? `<button class="action-tile" data-action="add-block"><span class="tile-icon">${icon('type')}</span><span class="tile-copy"><strong>添加文字块</strong></span></button>` : ''}
      </div>` : ''}
    </div>`;
  }

  const hasActions = d.canMoveUp || d.canMoveDown || d.canDelete;
  const actionSection = hasActions ? `<div class="ins-section">
    <div class="section-title">元素操作</div>
    <div class="selection-actions">
      <button type="button" class="btn ghost" data-action="move-up" ${d.canMoveUp ? '' : 'disabled'}>${icon('arrow-up')}上移</button>
      <button type="button" class="btn ghost" data-action="move-down" ${d.canMoveDown ? '' : 'disabled'}>${icon('arrow-down')}下移</button>
      ${d.canDelete ? `<button type="button" class="btn danger" data-action="delete-selection">${icon('trash')}删除</button>` : '<span></span>'}
    </div>
  </div>` : '';

  const sidebarSection = inSidebar && can.syncSidebar
    ? `<div class="ins-section"><div class="section-title">侧边栏</div>
        <div class="tip warn" style="margin-bottom:9px">${icon('info')} 这一项只改了当前页面的侧边栏。让所有卡片页保持一致，请同步。</div>
        ${syncCardHtml()}
      </div>`
    : '';

  return `<div class="ins-wrap">
    <div class="ins-head">
      <div class="ins-head-top">
        <div class="ins-eyebrow">${icon('cursor')} 当前选中</div>
        <button class="deselect-btn" data-action="deselect" title="取消选择（Esc）">${icon('close')}</button>
      </div>
      <h2 class="ins-title">${esc(title)}</h2>
      <p class="ins-sub">${esc(selectionDescriptor(d))}</p>
      <div class="tag-row">${pageTagsHtml(d)}</div>
      <div class="ins-breadcrumb">${esc(d.breadcrumb || d.tag)}</div>
    </div>
    ${content}
    ${sidebarSection}
    ${actionSection}
    <div class="ins-section">
      <button class="btn ghost small block" data-action="source">${icon('code')}打开页面源码</button>
      <div class="field-inline-hint" style="text-align:center;margin-top:8px">改动直接写入源文件 · 首次修改前自动备份</div>
    </div>
  </div>`;
}

function richEditorHtml(html, placeholder) {
  return `<div class="rich-wrap">
    <div class="rich-toolbar">
      <button type="button" class="rich-btn" data-rich-cmd="bold" title="加粗"><b>B</b></button>
      <button type="button" class="rich-btn" data-rich-cmd="italic" title="斜体"><i>I</i></button>
      <button type="button" class="rich-btn" data-rich-cmd="link" title="插入链接">${icon('link')}</button>
      <button type="button" class="rich-btn" data-rich-cmd="unlink" title="移除链接">${icon('close')}</button>
    </div>
    <div class="rich-editor" contenteditable="true" spellcheck="false" data-placeholder="${escAttr(placeholder)}">${html}</div>
  </div>`;
}

function bindRichEditor(onInput) {
  const wrap = $('.rich-wrap');
  if (!wrap) return;
  const editor = $('.rich-editor', wrap);
  if (!editor) return;
  wrap.addEventListener('mousedown', (event) => {
    if (event.target.closest('.rich-btn')) event.preventDefault();
  });
  wrap.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-rich-cmd]');
    if (!btn) return;
    event.preventDefault();
    const cmd = btn.dataset.richCmd;
    editor.focus();
    if (cmd === 'link') {
      const url = window.prompt('输入链接地址（留空则取消）', 'https://');
      if (url && url.trim() && url.trim() !== 'https://') {
        document.execCommand('createLink', false, url.trim());
      }
    } else {
      document.execCommand(cmd, false, null);
    }
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  });
  editor.addEventListener('click', (event) => {
    const anchor = event.target.closest('a');
    if (anchor) event.preventDefault();
  });
  editor.addEventListener('input', () => onInput(editor));
  return editor;
}

function bindSelection(d) {
  const isEntry = Boolean(d.entry);
  const isBook = isEntry && isBookPage();
  const isFigure = Boolean(d.figure);
  const isLink = Boolean(d.link) && !isEntry;
  const isText = Boolean(d.textEditable) && !isEntry && !isFigure;
  const pageId = state.currentId;

  if (isBook) {
    const book = bookEntryData(d.entry);
    const draft = { ...book };
    const href = $('#book-href');
    const title = $('#book-title');
    const author = $('#book-author');
    const review = $('#book-review');
    const newTab = $('#book-newtab');
    const canSave = () => draft.title.trim() && draft.author.trim() && draft.href.trim();
    const sync = () => {
      const desc = draft.author.trim() + (draft.review.trim() ? ` · ${draft.review.trim()}` : '');
      sendBridge({
        type: 'updateEntry',
        payload: {
          eid: d.eid,
          href: draft.href || '#',
          title: `📖 ${draft.title.trim()}`,
          desc,
          target: draft.newTab ? '_blank' : null,
          newTab: draft.newTab,
        },
      });
    };
    const schedule = () => {
      if (!canSave()) return;
      scheduleSave(`book:${pageId}:${d.eid}`, () => executeOperation({
        type: 'setBook',
        eid: d.eid,
        title: draft.title,
        author: draft.author,
        review: draft.review,
        href: draft.href,
        newTab: draft.newTab,
      }, {}), 680);
    };
    href?.addEventListener('input', () => { draft.href = href.value; sync(); schedule(); });
    title?.addEventListener('input', () => { draft.title = title.value; sync(); schedule(); });
    author?.addEventListener('input', () => { draft.author = author.value; sync(); schedule(); });
    review?.addEventListener('input', () => { draft.review = review.value; sync(); schedule(); });
    newTab?.addEventListener('change', () => { draft.newTab = newTab.checked; sync(); schedule(); });
  } else if (isEntry) {
    const href = $('#entry-href');
    const title = $('#entry-title');
    const desc = $('#entry-desc');
    const newTab = $('#entry-newtab');
    const draft = { ...d.entry };
    const sync = () => {
      sendBridge({
        type: 'updateEntry',
        payload: {
          eid: d.eid,
          href: draft.href || '#',
          title: draft.title,
          desc: draft.desc,
          target: draft.newTab ? '_blank' : null,
          newTab: draft.newTab,
        },
      });
    };
    const schedule = () => {
      scheduleSave(`entry:${pageId}:${d.eid}`, () => executeOperation({
        type: 'setEntry',
        eid: d.eid,
        href: draft.href || '#',
        title: draft.title,
        desc: draft.desc,
        newTab: draft.newTab,
      }, {}), 680);
    };
    href?.addEventListener('input', () => { draft.href = href.value; sync(); schedule(); });
    title?.addEventListener('input', () => { draft.title = title.value; sync(); schedule(); });
    desc?.addEventListener('input', () => { draft.desc = desc.value; sync(); schedule(); });
    newTab?.addEventListener('change', () => { draft.newTab = newTab.checked; sync(); schedule(); });
  }

  if (isFigure) {
    const caption = $('#figure-caption');
    const alt = $('#figure-alt');
    const width = $('#figure-width');
    const height = $('#figure-height');
    const draft = { ...d.figure };
    const sync = () => sendBridge({
      type: 'updateFigure',
      payload: {
        eid: d.eid,
        src: draft.src,
        width: draft.width,
        height: draft.height,
        alt: draft.alt,
        caption: draft.caption,
      },
    });
    const schedule = () => {
      scheduleSave(`figure:${pageId}:${d.eid}`, () => executeOperation({
        type: 'setFigure',
        eid: d.eid,
        src: draft.src,
        width: draft.width,
        height: draft.height,
        alt: draft.alt,
        caption: draft.caption,
      }, {}), 680);
    };
    caption?.addEventListener('input', () => { draft.caption = caption.value; sync(); schedule(); });
    alt?.addEventListener('input', () => { draft.alt = alt.value; sync(); schedule(); });
    width?.addEventListener('input', () => { draft.width = width.value; sync(); schedule(); });
    height?.addEventListener('input', () => { draft.height = height.value; sync(); schedule(); });
    window.__hpFigureDraft = draft;
  } else {
    window.__hpFigureDraft = null;
  }

  if (isLink) {
    const href = $('#link-href');
    const newTab = $('#link-newtab');
    const draft = { href: d.link.href, newTab: d.link.newTab };
    const sync = () => sendBridge({
      type: 'updateAttrs',
      eid: d.eid,
      attrs: {
        href: draft.href || '#',
        target: draft.newTab ? '_blank' : null,
        ...(d.tag === 'a' ? {} : {}),
      },
    });
    const schedule = () => {
      scheduleSave(`link:${pageId}:${d.eid}`, () => executeOperation({
        type: 'setAttrs',
        eid: d.eid,
        attrs: {
          href: draft.href || '#',
          target: draft.newTab ? '_blank' : null,
        },
      }, {}), 620);
    };
    href?.addEventListener('input', () => { draft.href = href.value; sync(); schedule(); });
    newTab?.addEventListener('change', () => { draft.newTab = newTab.checked; sync(); schedule(); });
  }

  if (isText) {
    const draft = { html: sanitizeUiHtml(d.html) };
    bindRichEditor((editor) => {
      draft.html = editor.innerHTML;
      sendBridge({ type: 'updateHtml', eid: d.eid, html: draft.html });
      scheduleSave(`text:${pageId}:${d.eid}`, () => executeOperation({
        type: 'setContent',
        eid: d.eid,
        html: draft.html,
      }, {}), 680);
    });
  }
}

/* ---------------------------- 外观设置 ---------------------------- */
function currentWallpaperValue() {
  if (!state.theme?.wallpaper || state.theme.wallpaper.none) return null;
  return state.theme.wallpaper.url || null;
}

function appearanceHtml() {
  if (!state.theme) {
    return `<div class="ins-wrap"><div class="ins-head"><h2 class="ins-title">外观设置载入中…</h2></div></div>`;
  }
  const t = state.theme;
  const current = currentWallpaperValue();
  const backgrounds = Array.isArray(t.backgrounds) ? [...t.backgrounds] : [];
  if (current && !backgrounds.some((b) => b.value === current)) {
    backgrounds.push({
      id: 'current',
      label: '当前壁纸',
      value: current,
      preview: `/${current.replace(/^\.?\//, '')}`,
    });
  }
  const alphaLight = Math.round(t.cardAlpha.light * 100);
  const alphaDark = Math.round(t.cardAlpha.dark * 100);
  const canSync = Boolean(state.page?.meta?.can?.syncSidebar);
  const siteUrl = state.site.url || '';
  const pageCount = state.pages.length;
  const noteCount = state.notes?.total || 0;

  return `<div class="ins-wrap appearance-wrap">
    <div class="ins-head">
      <div class="ins-head-top">
        <div class="ins-eyebrow">${icon('sliders')} 全站外观</div>
        <button class="deselect-btn" data-action="deselect" title="收起面板">${icon('close')}</button>
      </div>
      <h2 class="ins-title">外观与设置</h2>
      <p class="ins-sub">改动直接写入 style.css 或头像文件，所有卡片页共用一个外观。</p>
    </div>

    <div class="appearance-section">
      <div class="appearance-title">头像 <span>全站通用</span></div>
      <div class="avatar-edit-row">
        <div class="avatar-preview"><img id="appearance-avatar" src="${escAttr(assetUrl(state.avatarUrl))}" alt="头像预览"></div>
        <div class="avatar-copy">
          <strong>圆形头像</strong>
          <p>上传图片后拖动、缩放取景，会保存为 512 × 512 的 JPG。</p>
          <button class="btn ghost small" data-action="avatar-upload">${icon('upload')}更换头像</button>
        </div>
      </div>
    </div>

    <div class="appearance-section">
      <div class="appearance-title">壁纸 <span>深浅色共用</span></div>
      <div class="wallpaper-grid">
        ${backgrounds.map((bg) => {
          const isNone = !bg.value;
          const active = isNone ? !current : current === bg.value;
          if (isNone) {
            return `<button type="button" class="wallpaper-card ${active ? 'active' : ''} wallpaper-none" data-action="set-wallpaper" data-value="" data-id="none">
              ${icon('image')}<span>${esc(bg.label || '内置插画')}</span>
            </button>`;
          }
          return `<button type="button" class="wallpaper-card ${active ? 'active' : ''}" data-action="set-wallpaper" data-value="${escAttr(bg.value)}" data-id="${escAttr(bg.id || '')}">
            <span class="wallpaper-thumb" style="background-image:url('${escAttr(assetUrl(bg.preview || bg.value))}')"></span>
            <span class="wallpaper-label">${esc(bg.label || '壁纸')}</span>
          </button>`;
        }).join('')}
        <button type="button" class="wallpaper-card wallpaper-upload" data-action="wallpaper-upload">
          ${icon('upload')}<span>上传壁纸</span>
        </button>
      </div>
      <div class="field-inline-hint" style="margin-top:8px">「内置插画」会显示 style.css 自带的插画背景；上传壁纸会保存到 assets/wallpaper.jpg。</div>
    </div>

    <div class="appearance-section">
      <div class="appearance-title">卡片透明度 <span>0.2 – 1.0</span></div>
      <div class="theme-block">
        <div class="theme-label-row"><span>浅色模式</span><span id="alpha-light-label">${alphaLight}%</span></div>
        <div class="slider-row">
          <input type="range" min="20" max="100" step="1" value="${alphaLight}" data-alpha="light" style="--pct:${alphaLight}%">
        </div>
      </div>
      <div class="theme-block">
        <div class="theme-label-row"><span>深色模式</span><span id="alpha-dark-label">${alphaDark}%</span></div>
        <div class="slider-row">
          <input type="range" min="20" max="100" step="1" value="${alphaDark}" data-alpha="dark" style="--pct:${alphaDark}%">
        </div>
      </div>
      <div class="field-inline-hint">数值越小卡片越透。壁纸很花时调大一些，文字更清楚。</div>
    </div>

    <div class="appearance-section">
      <div class="appearance-title">强调色 <span>浅色 / 深色各一处</span></div>
      <div class="accent-swatches">
        ${(t.presets || []).map((preset) => {
          const active = preset.light.toLowerCase() === String(t.accent.light).toLowerCase() &&
            preset.dark.toLowerCase() === String(t.accent.dark).toLowerCase();
          return `<button type="button" class="swatch ${active ? 'active' : ''}" title="${escAttr(preset.name)}"
            data-accent-preset="${escAttr(preset.light)}|${escAttr(preset.dark)}"
            style="background:linear-gradient(135deg, ${escAttr(preset.light)}, ${escAttr(preset.dark)})"></button>`;
        }).join('')}
      </div>
      <div class="color-fields">
        <div class="color-field">
          <input type="color" id="accent-light" value="${escAttr(t.accent.light)}">
          <label for="accent-light">浅色模式</label>
        </div>
        <div class="color-field">
          <input type="color" id="accent-dark" value="${escAttr(t.accent.dark)}">
          <label for="accent-dark">深色模式</label>
        </div>
      </div>
      <div class="field-inline-hint">强调色用于导航高亮、按钮和链接；未选中的项目保持原样。</div>
    </div>

    <div class="appearance-section">
      <div class="appearance-title">全站导航</div>
      ${canSync ? syncCardHtml() : `<div class="tip">${icon('info')} 书封面页没有卡片版侧边栏。切换到一个普通页面后，才能以那一页为模板同步全站导航。</div>`}
    </div>

    <div class="appearance-section">
      <div class="appearance-title">关于站点</div>
      <div class="backup-note">
        <div>站点目录：<code>${esc(state.app.root || '')}</code></div>
        <div>页面 ${pageCount} 个 · 已生成笔记小节 ${noteCount} 节</div>
        <div>备份位置：<code>editor/.backups</code>（每个文件 5 分钟内最多留一份）</div>
        ${siteUrl ? `<div style="margin-top:8px"><a href="${escAttr(siteUrl)}" target="_blank" rel="noopener">${icon('external')} 打开线上主页</a></div>` : ''}
      </div>
      <div class="field-inline-hint" style="margin-top:9px">笔记正文仍以 Markdown 源文件为准；本编辑器负责站点页面、卡片、照片墙和外观。</div>
      <div class="tip" style="margin-top:9px">${icon('info')} 外观修改会立即保存到 style.css，不在页面内容的撤销历史里；改坏了可以从 editor/.backups 恢复。</div>
    </div>
  </div>`;
}

function applyLiveTheme() {
  sendBridge({ type: 'applyTheme', theme: liveThemePayload() });
}

function bindAppearance() {
  $$('input[data-alpha]').forEach((input) => {
    input.addEventListener('input', () => {
      const mode = input.dataset.alpha;
      const pct = Number(input.value);
      state.theme.cardAlpha[mode] = Math.round(pct) / 100;
      const label = $(`#alpha-${mode}-label`);
      if (label) label.textContent = `${Math.round(pct)}%`;
      input.style.setProperty('--pct', `${pct}%`);
      applyLiveTheme();
      scheduleThemeSave();
    });
  });

  const lightColor = $('#accent-light');
  const darkColor = $('#accent-dark');
  const updateSwatches = () => {
    $$('[data-accent-preset]').forEach((btn) => {
      const [light, dark] = btn.dataset.accentPreset.split('|');
      const active = light.toLowerCase() === String(state.theme.accent.light).toLowerCase() &&
        dark.toLowerCase() === String(state.theme.accent.dark).toLowerCase();
      btn.classList.toggle('active', active);
    });
  };
  lightColor?.addEventListener('input', () => {
    state.theme.accent.light = lightColor.value;
    updateSwatches();
    applyLiveTheme();
    scheduleThemeSave();
  });
  darkColor?.addEventListener('input', () => {
    state.theme.accent.dark = darkColor.value;
    updateSwatches();
    applyLiveTheme();
    scheduleThemeSave();
  });
  $$('[data-accent-preset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [light, dark] = btn.dataset.accentPreset.split('|');
      state.theme.accent.light = light;
      state.theme.accent.dark = dark;
      if (lightColor) lightColor.value = light;
      if (darkColor) darkColor.value = dark;
      updateSwatches();
      applyLiveTheme();
      scheduleThemeSave();
    });
  });
}

function scheduleThemeSave() {
  scheduleSave('theme', performThemeSave, 560);
}

async function performThemeSave() {
  try {
    await executeThemeSave();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

async function executeThemeSave() {
  if (!state.theme) return;
  const res = await api('/__api/theme', {
    method: 'POST',
    body: {
      baseHash: state.styleHash,
      cardAlpha: {
        light: state.theme.cardAlpha.light,
        dark: state.theme.cardAlpha.dark,
      },
      accent: {
        light: state.theme.accent.light,
        dark: state.theme.accent.dark,
      },
      wallpaper: currentWallpaperValue(),
    },
  });
  state.styleHash = res.style.hash;
  state.theme = {
    ...state.theme,
    ...res.theme,
    backgrounds: state.theme.backgrounds,
    presets: res.theme.presets || state.theme.presets,
  };
  setSavedFlash();
  updateSaveUI();
}

function setWallpaper(value) {
  if (!state.theme) return;
  value = String(value || '');
  if (value) {
    state.theme.wallpaper = {
      raw: `url("${value}")`,
      url: value,
      none: false,
    };
  } else {
    state.theme.wallpaper = { raw: 'none', url: null, none: true };
  }
  applyLiveTheme();
  renderInspector({ keepScroll: true });
  scheduleThemeSave();
}

/* ---------------------------- 头像 / 图片 ---------------------------- */
function pickFile(accept = 'image/*') {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.style.position = 'fixed';
    input.style.left = '-9999px';
    input.addEventListener('change', () => {
      const file = input.files?.[0] || null;
      input.remove();
      resolve(file);
    });
    document.body.appendChild(input);
    input.click();
  });
}

async function loadImageSource(file) {
  if (!file || !/^image\//.test(file.type)) {
    throw new Error('请选择图片文件');
  }
  try {
    if ('createImageBitmap' in window) {
      const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
      return {
        image: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        close: () => bitmap.close?.(),
      };
    }
  } catch {
    // 回退到 <img>
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    if (img.decode) await img.decode();
    else await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    return {
      image: img,
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height,
      close: () => URL.revokeObjectURL(url),
    };
  } catch (error) {
    URL.revokeObjectURL(url);
    throw new Error('图片无法读取');
  }
}

function drawImageInCanvas(image, width, height, maxDim, quality) {
  const ratio = Math.min(1, maxDim / Math.max(width, height));
  const w = Math.max(1, Math.round(width * ratio));
  const h = Math.max(1, Math.round(height * ratio));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(image, 0, 0, w, h);
  return {
    dataUrl: canvas.toDataURL('image/jpeg', quality),
    width: w,
    height: h,
  };
}

async function compressImageFile(file, maxDim = 2200, quality = 0.88) {
  const source = await loadImageSource(file);
  try {
    return drawImageInCanvas(source.image, source.width, source.height, maxDim, quality);
  } finally {
    source.close?.();
  }
}

async function uploadImage(kind, dataUrl, width, height) {
  return api('/__api/upload', {
    method: 'POST',
    body: { kind, dataUrl, width, height },
  });
}

async function avatarUploadFlow() {
  const file = await pickFile('image/*');
  if (!file) return;
  try {
    const source = await loadImageSource(file);
    openAvatarCropper(source);
  } catch (error) {
    toast(error.message, 'error');
  }
}

function closeCrop() {
  const host = $('#crop-host');
  if (!host) return;
  host.hidden = true;
  host.innerHTML = '';
  const crop = state.avatarCrop;
  if (crop?.source?.close) crop.source.close();
  state.avatarCrop = null;
}

function openAvatarCropper(source) {
  const host = $('#crop-host');
  if (!host) {
    source.close?.();
    return;
  }
  const minSide = Math.min(source.width, source.height);
  state.avatarCrop = {
    source,
    minSide,
    side: minSide,
    sx: Math.round((source.width - minSide) / 2),
    sy: Math.round((source.height - minSide) / 2),
    zoom: 1,
    dragging: false,
    lastX: 0,
    lastY: 0,
  };
  host.innerHTML = `<div class="modal-card crop-card" role="dialog" aria-modal="true" aria-label="裁剪头像">
    <div class="modal-head">
      <div class="modal-head-copy">
        <h2>裁剪头像</h2>
        <p>拖动图片调整取景，缩放后保存为 512 × 512。</p>
      </div>
      <button class="modal-close" data-close-crop title="关闭">${icon('close')}</button>
    </div>
    <div class="modal-body">
      <div class="crop-view" id="crop-view">
        <canvas width="360" height="360"></canvas>
        <div class="crop-mask"></div>
      </div>
      <div class="crop-controls">
        <span class="field-inline-hint" style="margin:0">缩放</span>
        <input type="range" id="crop-zoom" min="1" max="3" step="0.01" value="1">
        <span class="slider-value" id="crop-zoom-label">100%</span>
      </div>
      <p class="crop-hint">提示：头像会以圆形显示在侧栏左上角，构图时把主体放在中间更稳妥。</p>
    </div>
    <div class="modal-foot">
      <button class="btn ghost" data-close-crop>取消</button>
      <button class="btn primary" id="crop-apply">使用这张</button>
    </div>
  </div>`;
  hydrateIcons(host);
  host.hidden = false;
  drawAvatarCrop();
  bindCropControls();
}

function drawAvatarCrop() {
  const crop = state.avatarCrop;
  const canvas = $('#crop-view canvas');
  if (!crop || !canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#1b2030';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(
    crop.source.image,
    crop.sx, crop.sy, crop.side, crop.side,
    0, 0, canvas.width, canvas.height,
  );
}

function clampCrop() {
  const crop = state.avatarCrop;
  if (!crop) return;
  const { width, height } = crop.source;
  crop.side = Math.min(crop.minSide, Math.max(1, crop.side));
  crop.sx = Math.min(width - crop.side, Math.max(0, crop.sx));
  crop.sy = Math.min(height - crop.side, Math.max(0, crop.sy));
}

function bindCropControls() {
  const host = $('#crop-host');
  const view = $('#crop-view');
  const zoom = $('#crop-zoom');
  const apply = $('#crop-apply');
  host.onclick = (event) => {
    if (event.target === host || event.target.closest('[data-close-crop]')) closeCrop();
  };
  zoom?.addEventListener('input', () => {
    const crop = state.avatarCrop;
    if (!crop) return;
    const centerX = crop.sx + crop.side / 2;
    const centerY = crop.sy + crop.side / 2;
    crop.zoom = Number(zoom.value);
    crop.side = crop.minSide / crop.zoom;
    crop.sx = centerX - crop.side / 2;
    crop.sy = centerY - crop.side / 2;
    clampCrop();
    const label = $('#crop-zoom-label');
    if (label) label.textContent = `${Math.round(crop.zoom * 100)}%`;
    drawAvatarCrop();
  });
  view?.addEventListener('pointerdown', (event) => {
    const crop = state.avatarCrop;
    if (!crop) return;
    crop.dragging = true;
    crop.lastX = event.clientX;
    crop.lastY = event.clientY;
    view.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });
  view?.addEventListener('pointermove', (event) => {
    const crop = state.avatarCrop;
    if (!crop?.dragging || !view) return;
    const rect = view.getBoundingClientRect();
    const scale = crop.side / Math.max(1, rect.width);
    const dx = event.clientX - crop.lastX;
    const dy = event.clientY - crop.lastY;
    crop.lastX = event.clientX;
    crop.lastY = event.clientY;
    crop.sx -= dx * scale;
    crop.sy -= dy * scale;
    clampCrop();
    drawAvatarCrop();
  });
  const endDrag = (event) => {
    const crop = state.avatarCrop;
    if (!crop) return;
    crop.dragging = false;
    view?.releasePointerCapture?.(event.pointerId);
  };
  view?.addEventListener('pointerup', endDrag);
  view?.addEventListener('pointercancel', endDrag);

  apply?.addEventListener('click', async () => {
    const crop = state.avatarCrop;
    if (!crop) return;
    apply.disabled = true;
    apply.textContent = '保存中…';
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 512, 512);
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(crop.source.image, crop.sx, crop.sy, crop.side, crop.side, 0, 0, 512, 512);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      await enqueueTask(async () => {
        const res = await uploadImage('avatar', dataUrl, 512, 512);
        state.avatarUrl = `${res.url}?v=${Date.now()}`;
        setSavedFlash();
        updateSaveUI();
        return res;
      });
      sendBridge({ type: 'setAvatars', url: state.avatarUrl });
      const preview = $('#appearance-avatar');
      if (preview) preview.src = assetUrl(state.avatarUrl);
      closeCrop();
      toast('头像已更新，所有页面都会使用它', 'success');
    } catch (error) {
      handleApiError(error);
      apply.disabled = false;
      apply.textContent = '使用这张';
    }
  });
}

async function wallpaperUploadFlow() {
  const file = await pickFile('image/*');
  if (!file) return;
  try {
    const compressed = await compressImageFile(file, 2400, 0.9);
    updateSaveUI('saving');
    const res = await enqueueTask(async () => {
      const uploaded = await uploadImage('wallpaper', compressed.dataUrl, compressed.width, compressed.height);
      setSavedFlash();
      return uploaded;
    });
    state.theme.wallpaper = {
      raw: `url("${res.src}")`,
      url: res.src,
      none: false,
    };
    const existing = state.theme.backgrounds.find((b) => b.value === res.src);
    if (existing) {
      existing.preview = `${res.url}?v=${Date.now()}`;
    } else {
      state.theme.backgrounds.push({
        id: 'uploaded',
        label: '我的壁纸',
        value: res.src,
        preview: `${res.url}?v=${Date.now()}`,
      });
    }
    applyLiveTheme();
    await enqueueTask(performThemeSave);
    renderInspector({ keepScroll: true });
    toast('壁纸已更换并保存', 'success');
  } catch (error) {
    handleApiError(error);
  }
}

/* ---------------------------- 弹窗基础 ---------------------------- */
let activeModal = null;

function openModal({ title, subtitle = '', body = '', footer = '', wide = false, cardClass = '', onMount, onClose }) {
  const host = $('#modal-host');
  if (!host) return null;
  if (activeModal) activeModal.close(true);
  host.innerHTML = `<div class="modal-card ${wide ? 'wide' : ''} ${cardClass}" role="dialog" aria-modal="true" aria-label="${escAttr(title || '对话框')}">
    <div class="modal-head">
      <div class="modal-head-copy">
        <h2>${esc(title || '')}</h2>
        ${subtitle ? `<p>${esc(subtitle)}</p>` : ''}
      </div>
      <button type="button" class="modal-close" data-close title="关闭">${icon('close')}</button>
    </div>
    <div class="modal-body">${body}</div>
    <div class="modal-foot">${footer}</div>
  </div>`;
  host.hidden = false;
  hydrateIcons(host);

  const controller = {
    root: host.firstElementChild,
    close(force = false) {
      if (!force && controller.beforeClose && controller.beforeClose() === false) return;
      if (activeModal === controller) activeModal = null;
      host.hidden = true;
      host.innerHTML = '';
      host.onclick = null;
      document.removeEventListener('keydown', onKey, true);
      controller.onClose?.();
    },
    onClose: null,
    beforeClose: null,
  };
  activeModal = controller;

  const onKey = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      controller.close();
    }
  };

  host.onclick = (event) => {
    if (event.target === host || event.target.closest('[data-close]')) {
      if (event.target.closest('[data-close]') || event.target === host) {
        event.preventDefault();
        controller.close();
      }
    }
  };
  document.addEventListener('keydown', onKey, true);

  if (onMount) onMount(controller.root, controller);
  controller.onClose = onClose || null;
  setTimeout(() => {
    const focusable = controller.root.querySelector('[autofocus], input:not([type="hidden"]), textarea, select');
    focusable?.focus();
  }, 30);
  return controller;
}

function closeModal() {
  activeModal?.close();
}

async function confirmDialog({
  title = '确认操作',
  message = '',
  confirmText = '确定',
  cancelText = '取消',
  danger = false,
  hint = '',
}) {
  return new Promise((resolve) => {
    let settled = false;
    const settle = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };
    const modal = openModal({
      title,
      cardClass: 'confirm-box',
      body: `<p>${message}</p>`,
      footer: `<span class="modal-foot-hint">${esc(hint)}</span>
        <button type="button" class="btn ghost" data-confirm-cancel>${esc(cancelText)}</button>
        <button type="button" class="btn ${danger ? 'danger' : 'primary'}" data-confirm-ok>${esc(confirmText)}</button>`,
      onMount(root) {
        root.querySelector('[data-confirm-ok]')?.addEventListener('click', () => {
          settle(true);
          modal?.close();
        });
        root.querySelector('[data-confirm-cancel]')?.addEventListener('click', () => {
          settle(false);
          modal?.close();
        });
      },
      onClose() {
        settle(false);
      },
    });
  });
}

async function ensureStructuralReady() {
  await settleInline();
  const ok = await flushSchedules();
  if (!ok) throw new Error('还有修改没有保存成功，请稍后再试');
  await saveChain.catch(() => {});
}

/* ---------------------------- 添加卡片 ---------------------------- */
function openEntryDialog() {
  if (!state.page) return;
  if (!state.page.meta.can?.addEntry) {
    toast('这个页面没有可添加入口的区域', 'error');
    return;
  }
  const modal = openModal({
    title: '添加入口卡片',
    subtitle: '会插到页面中「快速入口 / 卡片网格」的末尾。',
    body: `<form id="entry-dialog-form">
      <div class="field">
        <label class="field-label" for="new-entry-title">标题</label>
        <input class="field-input" id="new-entry-title" autofocus placeholder="例如：📘 数理统计">
      </div>
      <div class="field">
        <label class="field-label" for="new-entry-desc">描述</label>
        <textarea class="field-textarea" id="new-entry-desc" placeholder="一两句话介绍它"></textarea>
      </div>
      <div class="field">
        <label class="field-label" for="new-entry-href">链接</label>
        <input class="field-input" id="new-entry-href" placeholder="https://… 或 hobby-page.html">
      </div>
      <div class="switch-row">
        <div class="switch-copy"><strong>在新标签页打开</strong><small>站外链接建议开启</small></div>
        <label class="switch"><input type="checkbox" id="new-entry-newtab" checked><span></span></label>
      </div>
      <button type="submit" class="file-hidden" tabindex="-1"></button>
    </form>`,
    footer: `<span class="modal-foot-hint">保存后立即写入 HTML</span>
      <button type="button" class="btn ghost" data-close>取消</button>
      <button type="button" class="btn primary" id="entry-dialog-submit">添加卡片</button>`,
    onMount(root) {
      const form = $('#entry-dialog-form', root);
      const button = $('#entry-dialog-submit', root);
      const submit = async () => {
        const title = $('#new-entry-title', root).value.trim();
        const desc = $('#new-entry-desc', root).value.trim();
        const href = $('#new-entry-href', root).value.trim();
        if (!title) { toast('先给卡片起个标题', 'error'); return; }
        if (!href) { toast('请填写卡片链接', 'error'); return; }
        button.disabled = true;
        button.textContent = '添加中…';
        try {
          await ensureStructuralReady();
          await requestOperation({
            type: 'addEntry',
            data: {
              title,
              desc,
              href,
              newTab: $('#new-entry-newtab', root).checked,
            },
          }, { reload: true });
          modal?.close();
          toast('卡片已添加', 'success');
        } catch {
          button.disabled = false;
          button.textContent = '添加卡片';
        }
      };
      button.addEventListener('click', submit);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        submit();
      });
    },
  });
}

/* ---------------------------- 添加小说 ---------------------------- */
function openBookDialog() {
  if (!state.page) return;
  if (!state.page.meta.can?.addEntry) {
    toast('这个页面没有可添加小说的书单区域', 'error');
    return;
  }
  if (!isBookPage()) {
    toast('只有小说页支持添加小说', 'info');
    return;
  }
  const modal = openModal({
    title: '添加小说',
    subtitle: '按书名、作者和链接生成书单卡片；评价会跟在作者后面，标题自动带 📖 图标。',
    body: `<div class="book-form">
      <div class="field-row">
        <div class="field">
          <label class="field-label" for="new-book-title">书名</label>
          <input class="field-input" id="new-book-title" autofocus placeholder="例如：诡秘之主">
        </div>
        <div class="field">
          <label class="field-label" for="new-book-author">作者</label>
          <input class="field-input" id="new-book-author" placeholder="例如：爱潜水的乌贼">
        </div>
      </div>
      <div class="field">
        <label class="field-label" for="new-book-href">链接 <small>起点书籍页或其它介绍页</small></label>
        <input class="field-input" id="new-book-href" spellcheck="false" placeholder="https://www.qidian.com/book/…">
      </div>
      <div class="switch-row">
        <div class="switch-copy"><strong>在新标签页打开</strong><small>站外书籍链接建议开启</small></div>
        <label class="switch"><input type="checkbox" id="new-book-newtab" checked><span></span></label>
      </div>
      <div class="field">
        <label class="field-label" for="new-book-review">评价 / 简介 <small>可选</small></label>
        <textarea class="field-textarea" id="new-book-review" placeholder="为什么推荐 / 阅读状态 / 一句话吐槽"></textarea>
      </div>
      <div class="book-preview">
        <div class="book-preview-label">书单卡片预览</div>
        <div class="book-preview-card">
          <div class="book-preview-title">📖 <span id="book-preview-title">书名</span></div>
          <div class="book-preview-desc"><span id="book-preview-author">作者</span><span id="book-preview-review"></span></div>
        </div>
      </div>
    </div>`,
    footer: `<span class="modal-foot-hint">保存后追加到小说页书单末尾</span>
      <button type="button" class="btn ghost" data-close>取消</button>
      <button type="button" class="btn primary" id="book-dialog-submit">添加到书单</button>`,
    onMount(root) {
      const title = $('#new-book-title', root);
      const author = $('#new-book-author', root);
      const href = $('#new-book-href', root);
      const review = $('#new-book-review', root);
      const newTab = $('#new-book-newtab', root);
      const previewTitle = $('#book-preview-title', root);
      const previewAuthor = $('#book-preview-author', root);
      const previewReview = $('#book-preview-review', root);
      const updatePreview = () => {
        previewTitle.textContent = title.value.trim() || '书名';
        previewAuthor.textContent = author.value.trim() || '作者';
        const text = review.value.trim();
        previewReview.textContent = text ? ` · ${text}` : '';
      };
      for (const input of [title, author, review]) input.addEventListener('input', updatePreview);
      const button = $('#book-dialog-submit', root);
      button.addEventListener('click', async () => {
        const data = {
          title: title.value.trim(),
          author: author.value.trim(),
          href: href.value.trim(),
          review: review.value.trim(),
          newTab: newTab.checked,
        };
        if (!data.title) { toast('请填写书名', 'error'); title.focus(); return; }
        if (!data.author) { toast('请填写作者', 'error'); author.focus(); return; }
        if (!data.href) { toast('请填写书籍链接', 'error'); href.focus(); return; }
        button.disabled = true;
        button.textContent = '添加中…';
        try {
          await ensureStructuralReady();
          await requestOperation({ type: 'addBook', data }, { reload: true });
          modal?.close();
          toast('小说已添加到书单', 'success');
        } catch {
          button.disabled = false;
          button.textContent = '添加到书单';
        }
      });
    },
  });
}

/* ---------------------------- 添加照片 ---------------------------- */
function openPhotoDialog(presetWallEid = '') {
  if (!state.page) return;
  const locations = state.page.meta.photoLocations || [];
  if (!locations.length) {
    toast('这个页面还没有可放照片的分组', 'error');
    return;
  }
  const selection = state.selection;
  let defaultWall = presetWallEid;
  if (!defaultWall && selection?.isPhotoWall) defaultWall = selection.eid;
  if (!defaultWall || !locations.some((l) => l.wallEid === defaultWall)) {
    defaultWall = locations[locations.length - 1].wallEid;
  }
  let compressed = null;
  let fileName = '';
  const options = locations.map((loc) =>
    `<option value="${escAttr(loc.wallEid)}" ${loc.wallEid === defaultWall ? 'selected' : ''}>${esc(loc.title || '未命名分组')}</option>`).join('');

  const modal = openModal({
    title: '添加照片',
    subtitle: '照片会自动压缩并保留原比例；插入到所选分组最后一行的末尾。',
    body: `<div class="field">
        <label class="field-label" for="photo-location">放到哪个分组</label>
        <select class="field-select" id="photo-location">${options}</select>
      </div>
      <div class="field">
        <label class="field-label">照片文件</label>
        <label class="upload-drop" for="photo-file">
          <strong>${icon('upload')}选择一张照片</strong>
          <span id="photo-file-name">JPG / PNG / WebP，建议不超过 15MB</span>
        </label>
        <input class="file-hidden" type="file" id="photo-file" accept="image/*">
        <img class="upload-preview" id="photo-preview" alt="" hidden>
      </div>
      <div class="field">
        <label class="field-label" for="photo-caption">图片说明</label>
        <input class="field-input" id="photo-caption" placeholder="例如：夜幕下的古秦淮牌坊">
      </div>
      <div class="field">
        <label class="field-label" for="photo-alt">替代文字 <small>可选</small></label>
        <input class="field-input" id="photo-alt" placeholder="不填则使用图片说明">
      </div>`,
    footer: `<span class="modal-foot-hint">会写入 assets/photos/</span>
      <button type="button" class="btn ghost" data-close>取消</button>
      <button type="button" class="btn primary" id="photo-dialog-submit" disabled>添加照片</button>`,
    onMount(root) {
      const fileInput = $('#photo-file', root);
      const preview = $('#photo-preview', root);
      const fileNameEl = $('#photo-file-name', root);
      const submit = $('#photo-dialog-submit', root);
      fileInput.addEventListener('change', async () => {
        const file = fileInput.files?.[0];
        if (!file) return;
        submit.disabled = true;
        fileNameEl.textContent = '正在压缩…';
        try {
          compressed = await compressImageFile(file, 2200, 0.88);
          fileName = file.name;
          preview.src = compressed.dataUrl;
          preview.hidden = false;
          fileNameEl.textContent = `${file.name} · ${compressed.width} × ${compressed.height}`;
          submit.disabled = false;
        } catch (error) {
          compressed = null;
          fileNameEl.textContent = '读取失败，请换一张试试';
          toast(error.message, 'error');
        }
      });
      submit.addEventListener('click', async () => {
        if (!compressed) return;
        submit.disabled = true;
        submit.textContent = '上传中…';
        try {
          await ensureStructuralReady();
          const uploaded = await uploadImage('photo', compressed.dataUrl, compressed.width, compressed.height);
          await requestOperation({
            type: 'addPhoto',
            wallEid: $('#photo-location', root).value,
            data: {
              src: uploaded.src,
              width: uploaded.width,
              height: uploaded.height,
              alt: $('#photo-alt', root).value.trim() || $('#photo-caption', root).value.trim(),
              caption: $('#photo-caption', root).value.trim(),
            },
          }, { reload: true });
          modal?.close();
          toast(`照片已加入${fileName ? `：${fileName}` : ''}`, 'success');
        } catch (error) {
          if (!/保存|写入|文件/.test(error.message || '')) toast(error.message, 'error');
          submit.disabled = false;
          submit.textContent = '添加照片';
        }
      });
    },
  });
}

/* ---------------------------- 照片分组 ---------------------------- */
function openLocationDialog() {
  if (!state.page) return;
  if (!state.page.meta.can?.addLocation) {
    toast('这个页面不能新建照片分组', 'error');
    return;
  }
  const modal = openModal({
    title: '新建照片分组',
    subtitle: '通常是一个地点加时间，例如「南京 · 2026.8」。创建后再往里添加照片。',
    body: `<div class="field">
      <label class="field-label" for="new-location-title">分组标题</label>
      <input class="field-input" id="new-location-title" autofocus placeholder="例如：苏州 · 2026.10">
      <div class="field-inline-hint">会生成一个二级标题和一个空照片墙。</div>
    </div>`,
    footer: `<button type="button" class="btn ghost" data-close>取消</button>
      <button type="button" class="btn primary" id="location-dialog-submit">建立分组</button>`,
    onMount(root) {
      const input = $('#new-location-title', root);
      const button = $('#location-dialog-submit', root);
      const submit = async () => {
        const title = input.value.trim();
        if (!title) { toast('分组标题不能为空', 'error'); return; }
        button.disabled = true;
        button.textContent = '创建中…';
        try {
          await ensureStructuralReady();
          await requestOperation({ type: 'addLocation', data: { title } }, { reload: true });
          modal?.close();
          toast('照片分组已建立，接着点「添加照片」', 'success');
        } catch {
          button.disabled = false;
          button.textContent = '建立分组';
        }
      };
      button.addEventListener('click', submit);
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') { event.preventDefault(); submit(); }
      });
    },
  });
}

/* ---------------------------- 添加文字块 ---------------------------- */
function openBlockDialog() {
  if (!state.page) return;
  const modal = openModal({
    title: '添加标题 / 段落',
    subtitle: state.page.type === 'cover'
      ? '会插入在封面简介的「章节目录」之前。'
      : '会插入在页面页脚之前。',
    body: `<div class="field">
        <label class="field-label" for="new-block-kind">类型</label>
        <select class="field-select" id="new-block-kind">
          <option value="p">普通段落</option>
          <option value="h2">二级标题</option>
        </select>
      </div>
      <div class="field">
        <label class="field-label" for="new-block-text">内容</label>
        <textarea class="field-textarea" id="new-block-text" autofocus placeholder="写点什么…" style="min-height:120px"></textarea>
        <div class="field-inline-hint">暂不支持富文本格式；复杂排版请到「源码」里写。</div>
      </div>`,
    footer: `<button type="button" class="btn ghost" data-close>取消</button>
      <button type="button" class="btn primary" id="block-dialog-submit">插入内容</button>`,
    onMount(root) {
      const text = $('#new-block-text', root);
      const kind = $('#new-block-kind', root);
      const button = $('#block-dialog-submit', root);
      const submit = async () => {
        const value = text.value.trim();
        if (!value) { toast('内容不能为空', 'error'); return; }
        button.disabled = true;
        button.textContent = '插入中…';
        try {
          await ensureStructuralReady();
          await requestOperation({
            type: 'addBlock',
            kind: kind.value,
            text: value,
          }, { reload: true });
          modal?.close();
          toast('内容已插入', 'success');
        } catch {
          button.disabled = false;
          button.textContent = '插入内容';
        }
      };
      button.addEventListener('click', submit);
    },
  });
}

/* ---------------------------- 更换照片 ---------------------------- */
async function replacePhotoFlow() {
  const d = state.selection;
  if (!d?.figure) return;
  const file = await pickFile('image/*');
  if (!file) return;
  try {
    const compressed = await compressImageFile(file, 2200, 0.88);
    await ensureStructuralReady();
    const uploaded = await uploadImage('photo', compressed.dataUrl, compressed.width, compressed.height);
    const draft = window.__hpFigureDraft || { ...d.figure };
    const payload = {
      eid: d.eid,
      src: uploaded.src,
      width: uploaded.width,
      height: uploaded.height,
      alt: draft.alt || draft.caption || '',
      caption: draft.caption || '',
    };
    sendBridge({ type: 'updateFigure', payload });
    await requestOperation({
      type: 'setFigure',
      ...payload,
    }, {});
    const thumb = $('#figure-thumb');
    if (thumb) thumb.style.backgroundImage = `url('${assetUrl(uploaded.src)}')`;
    const widthField = $('#figure-width');
    const heightField = $('#figure-height');
    if (widthField) widthField.value = uploaded.width;
    if (heightField) heightField.value = uploaded.height;
    if (window.__hpFigureDraft) {
      window.__hpFigureDraft.src = uploaded.src;
      window.__hpFigureDraft.width = uploaded.width;
      window.__hpFigureDraft.height = uploaded.height;
    }
    toast('照片已替换', 'success');
  } catch (error) {
    handleApiError(error);
  }
}

/* ---------------------------- 结构调整 ---------------------------- */
async function moveSelection(direction) {
  const d = state.selection;
  if (!d) return;
  try {
    await ensureStructuralReady();
    await requestOperation({ type: 'moveElement', eid: d.eid, direction }, { reload: true });
  } catch {
    /* 已提示 */
  }
}

async function deleteSelection() {
  const d = state.selection;
  if (!d) return;
  if (!d.canDelete) {
    toast('为了结构安全，这个元素请用源码模式删除', 'info');
    return;
  }
  const confirmed = await confirmDialog({
    title: '删除这个元素？',
    message: `将从源文件中删除选中的 <strong>${esc(displayTag(d))}</strong>。这个操作可以用顶部的撤销恢复。`,
    confirmText: '删除',
    danger: true,
  });
  if (!confirmed) return;
  try {
    await ensureStructuralReady();
    await requestOperation({ type: 'deleteElement', eid: d.eid }, { reload: true });
    toast('已删除，可以用撤销恢复', 'success');
  } catch {
    /* 已提示 */
  }
}

async function deletePhotoGroup(wallEid) {
  const target = wallEid || state.selection?.eid;
  if (!target) return;
  const title = photoWallTitle(target);
  const confirmed = await confirmDialog({
    title: '删除整组照片？',
    message: `会删除 <strong>${esc(title)}</strong> 的标题和整个照片墙，里面的照片文件仍保留在 assets/photos/。`,
    confirmText: '删除整组',
    danger: true,
  });
  if (!confirmed) return;
  try {
    await ensureStructuralReady();
    await requestOperation({ type: 'deletePhotoGroup', eid: target }, { reload: true });
    toast('照片分组已删除', 'success');
  } catch {
    /* 已提示 */
  }
}

/* ---------------------------- 侧边栏同步 ---------------------------- */
async function syncSidebar() {
  if (!state.page) return;
  if (!state.page.meta.can?.syncSidebar) {
    toast('只有卡片版页面可以同步侧边栏', 'error');
    return;
  }
  const confirmed = await confirmDialog({
    title: '同步侧边栏到全部卡片页？',
    message: '会用当前页面的侧边栏覆盖其它卡片页。各页面原有的高亮状态会尽量保留，但其它页面单独改过的侧边栏内容会被替换。',
    confirmText: '同步全站',
    hint: '可先提交一次 Git 或在 editor/.backups 恢复',
  });
  if (!confirmed) return;
  try {
    await ensureStructuralReady();
    const pageId = state.currentId;
    const baseHash = state.page.hash;
    const result = await enqueueTask(async () => {
      const res = await api('/__api/sync-sidebar', {
        method: 'POST',
        body: { id: pageId, baseHash },
      });
      setSavedFlash();
      return res;
    });
    if (result.count) {
      toast(`已同步到 ${result.count} 个页面`, 'success');
    } else {
      toast('其它页面已经是同样的侧边栏，无需改动', 'info');
    }
    if (result.failed?.length) {
      toast(`${result.failed.length} 个页面同步失败：${result.failed[0].message}`, 'error', 5200);
    }
    await reloadPreview({ keepScroll: true, soft: true });
  } catch (error) {
    handleApiError(error);
  }
}

/* ---------------------------- 源码模式 ---------------------------- */
async function openSourceModal() {
  if (!state.page) return;
  try {
    await ensureStructuralReady();
  } catch (error) {
    toast(error.message, 'error');
    return;
  }
  const pageId = state.currentId;
  const source = state.page.source;
  let textarea = null;
  let counter = null;
  const modal = openModal({
    title: '页面源码',
    subtitle: '这里是完整的源文件（含 frontmatter / Liquid）。适合做可视化编辑器不支持的精细调整。',
    cardClass: 'source-modal',
    body: `<textarea class="source-editor" id="source-text" spellcheck="false"></textarea>
      <div class="source-meta"><span id="source-count"></span><span>${esc(pageId)}</span></div>`,
    footer: `<span class="modal-foot-hint">直接改写会跳过结构保护</span>
      <button type="button" class="btn ghost" data-close>取消</button>
      <button type="button" class="btn primary" id="source-save">保存源码</button>`,
    onMount(root) {
      textarea = $('#source-text', root);
      counter = $('#source-count', root);
      textarea.value = source;
      const updateCount = () => {
        if (counter) counter.textContent = `${textarea.value.length.toLocaleString('zh-CN')} 字符 · ${textarea.value.split('\n').length} 行`;
      };
      updateCount();
      textarea.addEventListener('input', updateCount);
      textarea.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
          event.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          textarea.setRangeText('  ', start, end, 'end');
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
      $('#source-save', root).addEventListener('click', async () => {
        const next = textarea.value;
        if (!next.trim()) { toast('源文件不能为空', 'error'); return; }
        const button = $('#source-save', root);
        button.disabled = true;
        button.textContent = '保存中…';
        try {
          await enqueueTask(async () => {
            const before = state.page.source;
            const res = await api('/__api/source', {
              method: 'POST',
              body: { id: pageId, baseHash: state.page.hash, source: next },
            });
            pushHistory(pageId, before);
            state.page = res.page;
            setSavedFlash();
            updateAfterPageChange();
            updateUndoButtons();
          });
          modal?.close();
          await reloadPreview({ keepScroll: false, soft: true });
          renderInspector();
          toast('源码已保存', 'success');
        } catch (error) {
          handleApiError(error);
          button.disabled = false;
          button.textContent = '保存源码';
        }
      });
      setTimeout(() => textarea.focus(), 30);
    },
  });
}

/* ---------------------------- 撤销 / 重做 ---------------------------- */
async function undo() {
  return historyStep('undo');
}

async function redo() {
  return historyStep('redo');
}

async function historyStep(kind) {
  if (!state.page) return;
  await settleInline();
  const ok = await flushSchedules();
  if (!ok) {
    toast('还有修改没保存成功，暂时不能撤销', 'error');
    return;
  }
  const pageId = state.currentId;
  const stack = state.history.get(pageId);
  if (!stack) return;
  const from = kind === 'undo' ? stack.undo : stack.redo;
  const to = kind === 'undo' ? stack.redo : stack.undo;
  const target = from[from.length - 1];
  if (!target) return;
  try {
    await enqueueTask(async () => {
      const current = state.page.source;
      const res = await api('/__api/source', {
        method: 'POST',
        body: { id: pageId, baseHash: state.page.hash, source: target, skipAutoDate: true },
      });
      from.pop();
      to.push(current);
      state.page = res.page;
      setSavedFlash();
      updateAfterPageChange();
      updateUndoButtons();
    });
    await reloadPreview({ keepScroll: false, soft: true });
    toast(kind === 'undo' ? '已撤销' : '已重做', 'success', 1600);
  } catch (error) {
    handleApiError(error);
  }
}

/* ---------------------------- 冲突 / 外观切换 ---------------------------- */
function showConflictDialog() {
  const modal = openModal({
    title: '文件已被其它程序修改',
    subtitle: '编辑器暂停保存，避免覆盖你在其它地方的改动。',
    body: `<div class="tip warn">${icon('alert')} 可能是另一个编辑器、脚本或 Git 操作改了文件。可以重新载入最新内容；当前未保存的输入会丢失。</div>`,
    footer: `<button type="button" class="btn ghost" data-close>稍后处理</button>
      <button type="button" class="btn primary" id="conflict-reload">重新载入页面</button>`,
    onMount(root) {
      $('#conflict-reload', root).addEventListener('click', async () => {
        modal?.close();
        await reloadCurrentPageData();
        renderInspector();
        await reloadPreview({ keepScroll: false, soft: true });
      });
    },
  });
}

function toggleAppearance() {
  if (!state.page) return;
  if (state.inlineActive) sendBridge({ type: 'commitInline' });
  state.appearance = !state.appearance;
  if (state.appearance) {
    state.selection = null;
    sendBridge({ type: 'deselect' });
    openInspectorOnNarrow();
  }
  renderRail();
  updateStageHeader();
  renderInspector();
  els.inspector.scrollTop = 0;
}

function cancelPendingForEid(eid) {
  let changed = false;
  for (const [key, entry] of Array.from(state.pendingSchedules.entries())) {
    if (key.endsWith(`:${eid}`)) {
      clearTimeout(entry.timer);
      state.pendingSchedules.delete(key);
      changed = true;
    }
  }
  if (changed) updateSaveUI();
}


/* ------------------------------------------------------------------ */
/* 笔记源管理                                                          */
/* ------------------------------------------------------------------ */
const notesUI = {
  open: false,
  modal: null,
  root: null,
  course: '',
  courseData: null,
  chapter: null,
  file: '',
  view: 'chapter',
  busy: false,
  error: '',
  split: null,
  dirty: false,
  changed: false,
  draftSource: null,
  sectionForm: false,
  sectionTitle: '',
  sectionContent: '',
  loadToken: 0,
};

function resetNotesUI() {
  Object.assign(notesUI, {
    modal: null,
    root: null,
    course: '',
    courseData: null,
    chapter: null,
    file: '',
    view: 'chapter',
    busy: false,
    error: '',
    split: null,
    dirty: false,
    changed: false,
    draftSource: null,
    sectionForm: false,
    sectionTitle: '',
    sectionContent: '',
    loadToken: notesUI.loadToken + 1,
  });
}

function notesSourceCourses() {
  return state.notes?.sources || [];
}

async function openNotesManager(course) {
  if (notesUI.open) return;
  const match = notesSourceCourses().find((item) => item.course === course);
  if (!match) {
    toast('这个课程还没有可管理的 Markdown 源文件', 'error');
    return;
  }
  if (state.inlineActive) sendBridge({ type: 'commitInline' });
  resetNotesUI();
  notesUI.open = true;
  notesUI.course = course;
  const modal = openModal({
    title: '笔记源管理',
    subtitle: '直接编辑 Markdown 源文件；保存后自动运行 split-notes.ps1，生成「一节一页」的小节页。日期会自动记为今天。',
    cardClass: 'notes-modal',
    wide: true,
    body: `<div class="notes-root" id="notes-root">
      <div class="notes-loading"><div class="spinner"></div><p>正在读取章节…</p></div>
    </div>`,
    footer: `<span class="modal-foot-hint">源文件：notes/&lt;课程&gt;/_source/ · 生成页会自动重建</span>
      <button type="button" class="btn ghost" data-close>关闭</button>`,
    onMount(root, controller) {
      notesUI.root = root;
      notesUI.modal = controller;
      bindNotesManager(root);
    },
  });
  if (!modal) {
    notesUI.open = false;
    return;
  }
  modal.beforeClose = () => {
    if (notesUI.busy) {
      toast('正在生成小节页，请稍等一下再关闭', 'info', 2200);
      return false;
    }
    if (notesUI.dirty) {
      return window.confirm('当前章节还有未保存的修改，确定关闭吗？');
    }
    return true;
  };
  modal.onClose = () => {
    const changed = notesUI.changed;
    notesUI.open = false;
    resetNotesUI();
    if (changed) refreshAfterNotesChanges();
  };
  await loadNotesCourse(course);
}

async function loadNotesCourse(course, preferredFile = '') {
  if (!notesUI.open) return;
  const token = ++notesUI.loadToken;
  notesUI.course = course;
  notesUI.error = '';
  notesUI.split = null;
  notesUI.chapter = null;
  notesUI.file = '';
  notesUI.draftSource = null;
  notesUI.dirty = false;
  notesUI.sectionForm = false;
  notesUI.view = 'chapter';
  notesUI.busy = true;
  renderNotesManager();
  try {
    const res = await api(`/__api/notes/course?course=${encodeURIComponent(course)}&fresh=1`);
    if (!notesUI.open || token !== notesUI.loadToken) return;
    const data = res.course;
    notesUI.courseData = data;
    const chapters = data.chapters || [];
    const file = preferredFile && chapters.some((c) => c.file === preferredFile)
      ? preferredFile
      : (chapters[0]?.file || '');
    if (!file) {
      notesUI.view = 'new';
      notesUI.busy = false;
      renderNotesManager();
      return;
    }
    await fetchNotesChapter(file, token);
  } catch (error) {
    if (!notesUI.open || token !== notesUI.loadToken) return;
    notesUI.busy = false;
    notesUI.error = error.message;
    renderNotesManager();
  }
}

async function fetchNotesChapter(file, token = notesUI.loadToken) {
  if (!notesUI.open) return;
  const course = notesUI.course;
  notesUI.busy = true;
  if (notesUI.root && notesUI.chapter) {
    setNotesBusy(true, '正在读取章节…');
  } else {
    renderNotesManager();
  }
  try {
    const res = await api(`/__api/notes/chapter?course=${encodeURIComponent(course)}&file=${encodeURIComponent(file)}`);
    if (!notesUI.open || token !== notesUI.loadToken) return;
    notesUI.chapter = res.chapter;
    notesUI.file = file;
    notesUI.view = 'chapter';
    notesUI.dirty = false;
    notesUI.draftSource = null;
    notesUI.error = '';
    notesUI.sectionForm = false;
    notesUI.busy = false;
    renderNotesManager();
  } catch (error) {
    if (!notesUI.open || token !== notesUI.loadToken) return;
    notesUI.busy = false;
    notesUI.error = error.message;
    renderNotesManager();
  }
}

function noteCourseOptions() {
  const map = new Map();
  for (const item of notesSourceCourses()) map.set(item.course, item.title);
  if (notesUI.courseData) map.set(notesUI.courseData.course, notesUI.courseData.title);
  if (!map.has(notesUI.course)) map.set(notesUI.course, notesUI.course);
  return Array.from(map.entries()).map(([course, title]) =>
    `<option value="${escAttr(course)}" ${course === notesUI.course ? 'selected' : ''}>${esc(title)}（${esc(course)}）</option>`).join('');
}

function renderNotesManager() {
  if (!notesUI.open || !notesUI.root) return;
  const body = $('.modal-body', notesUI.root);
  if (!body) return;
  const course = notesUI.courseData;
  if (!course) {
    body.innerHTML = `<div class="notes-root">
      <div class="notes-loading">
        <div class="spinner"></div>
        <p>${notesUI.error ? esc(notesUI.error) : '正在读取章节…'}</p>
        ${notesUI.error ? '<button class="btn ghost small" data-note-action="retry-course">重新载入</button>' : ''}
      </div>
    </div>`;
    hydrateIcons(body);
    return;
  }
  const chapters = course.chapters || [];
  const totalSections = chapters.reduce((sum, ch) => sum + (ch.sectionCount || 0), 0);
  const chapter = notesUI.chapter;
  const left = `<aside class="notes-side">
    <div class="notes-course-box">
      <label class="notes-select-label" for="notes-course-select">课程</label>
      <select class="field-select notes-course-select" id="notes-course-select" ${notesUI.busy ? 'disabled' : ''}>${noteCourseOptions()}</select>
      <button type="button" class="btn soft small block" data-note-action="new-chapter" ${notesUI.busy ? 'disabled' : ''}>${icon('plus')}新建章节</button>
    </div>
    <div class="notes-chapter-list">
      ${chapters.map((ch) => `<button type="button" class="notes-chapter ${ch.file === notesUI.file ? 'active' : ''}" data-note-chapter="${escAttr(ch.file)}" ${notesUI.busy ? 'disabled' : ''}>
        <span class="notes-chapter-title">${esc(ch.title || ch.file)}</span>
        <span class="notes-chapter-meta">${ch.sectionCount || 0} 节${ch.date ? ` · ${esc(ch.date)}` : ''}</span>
      </button>`).join('') || '<div class="notes-empty-list">还没有源文件，点上面「新建章节」。</div>'}
    </div>
    <div class="notes-side-foot">${chapters.length} 章 · ${totalSections} 节</div>
  </aside>`;

  let right = '';
  if (notesUI.view === 'new') {
    const nextOrder = Math.max(1, Number(course.nextOrder) || (chapters.length + 1));
    const date = todayIso();
    right = `<section class="notes-main notes-new-main">
      <div class="notes-main-head">
        <div>
          <div class="notes-kicker">${esc(course.title)}</div>
          <h3>新建章节</h3>
          <div class="notes-meta">会在 <code>notes/${esc(course.course)}/_source/</code> 建立新的 Markdown 源文件</div>
        </div>
      </div>
      <form id="notes-new-form" class="notes-form">
        <div class="notes-form-grid">
          <div class="field" style="grid-column:span 2">
            <label class="field-label" for="notes-new-title">章标题</label>
            <input class="field-input" id="notes-new-title" name="title" autofocus value="${escAttr(`第 ${nextOrder} 章　`)}" placeholder="例如：第 14 章　回归分析">
          </div>
          <div class="field">
            <label class="field-label" for="notes-new-order">章号</label>
            <input class="field-input" id="notes-new-order" name="order" type="number" min="1" max="99" value="${nextOrder}">
          </div>
          <div class="field">
            <label class="field-label" for="notes-new-date">日期</label>
            <input class="field-input" id="notes-new-date" name="date" type="date" value="${date}">
          </div>
          <div class="field" style="grid-column:span 2">
            <label class="field-label" for="notes-new-file">源文件名 <small>英文/数字，避免和已有文件重名</small></label>
            <input class="field-input" id="notes-new-file" name="fileName" value="${escAttr(`${String(nextOrder).padStart(2, '0')}_New_Chapter.md`)}">
          </div>
          <div class="field" style="grid-column:span 2">
            <label class="field-label" for="notes-new-section-title">第一节标题</label>
            <input class="field-input" id="notes-new-section-title" name="firstSectionTitle" value="${escAttr(`${nextOrder}.1 新小节`)}">
          </div>
          <div class="field" style="grid-column:span 2">
            <label class="field-label" for="notes-new-section-content">第一节内容 <small>可选</small></label>
            <textarea class="field-textarea" id="notes-new-section-content" name="firstSectionContent" placeholder="可以先写一段引言，之后再补充。"></textarea>
          </div>
        </div>
        <div class="notes-form-actions">
          <button type="button" class="btn ghost" data-note-action="cancel-new">取消</button>
          <button type="submit" class="btn primary">创建章节并生成</button>
        </div>
      </form>
    </section>`;
  } else if (!chapter) {
    right = `<section class="notes-main">
      <div class="notes-empty-main">
        <span class="notes-empty-icon">${icon('note')}</span>
        <h3>${notesUI.error ? '读取失败' : '还没有笔记章节'}</h3>
        <p>${esc(notesUI.error || '新建一章后，会自动生成「一节一页」的小节页。')}</p>
        <div class="btn-row" style="justify-content:center">
          ${notesUI.error ? '<button class="btn ghost" data-note-action="retry-course">重新载入</button>' : ''}
          <button class="btn primary" data-note-action="new-chapter">${icon('plus')}新建章节</button>
        </div>
      </div>
    </section>`;
  } else {
    const dirtyBadge = `<span class="notes-dirty-badge" id="notes-dirty-badge" ${notesUI.dirty ? '' : 'hidden'}>未保存</span>`;
    const sections = chapter.sections || [];
    const sectionHtml = sections.map((section, index) => `<div class="notes-section-row">
      <span class="notes-section-index">${index + 1}</span>
      <button type="button" class="notes-section-name" data-note-section-scroll="${index}" title="在源码中定位">${esc(section.title)}</button>
      <button type="button" class="icon-btn notes-section-delete" data-note-section-delete="${index}" title="删除这一小节">${icon('trash')}</button>
    </div>`).join('');
    const sectionForm = notesUI.sectionForm ? `<form id="notes-section-form" class="notes-section-form">
      <div class="field">
        <label class="field-label" for="notes-section-title">小节标题</label>
        <input class="field-input" id="notes-section-title" name="title" autofocus value="${escAttr(notesUI.sectionTitle)}" placeholder="例如：14.2 假设检验">
      </div>
      <div class="field">
        <label class="field-label" for="notes-section-content">小节内容 <small>可直接粘贴 Markdown / LaTeX</small></label>
        <textarea class="field-textarea" id="notes-section-content" name="content" placeholder="待补充。">${esc(notesUI.sectionContent)}</textarea>
      </div>
      <div class="notes-form-actions">
        <button type="button" class="btn ghost small" data-note-action="cancel-section">取消</button>
        <button type="submit" class="btn soft small">插入小节并生成页面</button>
      </div>
    </form>` : '';
    const split = notesUI.split ? `<div class="notes-split ${notesUI.split.ok ? 'ok' : 'fail'}">
      <div class="notes-split-head">
        ${icon(notesUI.split.ok ? 'check' : 'alert')}
        <span>${notesUI.split.ok ? '已重新生成小节页' : '源文件已保存，但切分失败'}</span>
        <span class="notes-split-time">${notesUI.split.duration ? `${notesUI.split.duration} ms` : ''}</span>
        <details><summary>查看输出</summary><pre>${esc(notesUI.split.output || '')}</pre></details>
      </div>
    </div>` : '';
    const errorBanner = notesUI.error ? `<div class="notes-error">${icon('alert')}<span>${esc(notesUI.error)}</span><button class="btn ghost small" data-note-action="retry-chapter">重新载入源文件</button></div>` : '';
    right = `<section class="notes-main">
      <div class="notes-main-head">
        <div class="notes-main-title">
          <div class="notes-kicker">${esc(course.title)} · order ${esc(chapter.data.order || '')} ${dirtyBadge}</div>
          <h3>${esc(chapter.data.title || chapter.file)}</h3>
          <div class="notes-meta">${sections.length} 个小节 · 更新 ${esc(chapter.data.date || '—')} · <code>${esc(chapter.file)}</code></div>
        </div>
        <div class="notes-head-actions">
          <button type="button" class="btn ghost small" data-note-action="toggle-section-form" ${notesUI.busy ? 'disabled' : ''}>${icon('plus')}小节</button>
          <button type="button" class="btn danger small" data-note-action="delete-chapter" ${notesUI.busy ? 'disabled' : ''}>${icon('trash')}删除章节</button>
          <button type="button" class="btn primary small" data-note-action="save-chapter" ${notesUI.busy ? 'disabled' : ''}>${icon('check')}保存并生成</button>
        </div>
      </div>
      ${errorBanner}
      ${split}
      <div class="notes-sections-head">
        <span>小节列表</span>
        <span>${sections.length ? '点标题可在源码中定位' : '还没有 h2 小节，保存后会按整章一页生成'}</span>
      </div>
      <div class="notes-section-list">${sectionHtml || '<div class="notes-empty-sections">没有小节。添加一个 ## 小节，或者直接在下方源码里写。</div>'}</div>
      ${sectionForm}
      <div class="notes-editor-box">
        <div class="notes-editor-head">
          <span>章节源文件（Markdown + frontmatter）</span>
          <span id="notes-source-count"></span>
        </div>
        <textarea class="notes-source" id="notes-source" spellcheck="false"></textarea>
      </div>
      <div class="notes-busy" id="notes-busy" hidden><div class="spinner"></div><span>正在写入并重新生成小节页…</span></div>
    </section>`;
  }

  body.innerHTML = `<div class="notes-shell">${left}${right}</div>`;
  hydrateIcons(body);
  requestAnimationFrame(() => {
    const active = $('.notes-chapter.active', body);
    try { active?.scrollIntoView({ block: 'nearest' }); } catch { /* ignore */ }
  });
  const textarea = $('#notes-source', body);
  if (textarea) {
    textarea.value = notesUI.draftSource ?? chapter?.source ?? '';
    updateNotesSourceMeta(textarea);
    if (notesUI.busy) textarea.disabled = true;
  }
  if (notesUI.busy) {
    const busy = $('#notes-busy', body);
    if (busy) busy.hidden = false;
  }
}

function updateNotesSourceMeta(textarea) {
  const counter = $('#notes-source-count');
  if (!counter || !textarea) return;
  const lines = textarea.value.split('\n').length;
  counter.textContent = `${textarea.value.length.toLocaleString('zh-CN')} 字符 · ${lines} 行`;
}

function setNotesBusy(busy, label = '正在写入并重新生成小节页…') {
  notesUI.busy = busy;
  if (!notesUI.root) return;
  const busyEl = $('#notes-busy', notesUI.root);
  if (busyEl) {
    busyEl.hidden = !busy;
    const text = busyEl.querySelector('span');
    if (text && busy) text.textContent = label;
  }
  const textarea = $('#notes-source', notesUI.root);
  if (textarea) textarea.disabled = busy;
  $$('.notes-main button, .notes-main input, .notes-main select, .notes-main textarea', notesUI.root).forEach((el) => {
    if (busy) el.setAttribute('disabled', 'disabled');
    else el.removeAttribute('disabled');
  });
}

function captureNotesDraft() {
  if (!notesUI.root) return;
  const textarea = $('#notes-source', notesUI.root);
  if (textarea) {
    notesUI.draftSource = textarea.value;
    notesUI.dirty = textarea.value !== (notesUI.chapter?.source || '');
  }
}

function updateNotesDirtyBadge() {
  if (!notesUI.root) return;
  const badge = $('#notes-dirty-badge', notesUI.root);
  if (badge) badge.hidden = !notesUI.dirty;
}

function bindNotesManager(root) {
  root.addEventListener('click', (event) => {
    const chapterBtn = event.target.closest('[data-note-chapter]');
    if (chapterBtn) {
      event.preventDefault();
      if (notesUI.busy) return;
      const file = chapterBtn.dataset.noteChapter;
      if (file === notesUI.file) return;
      if (notesUI.dirty && !window.confirm('当前章节还有未保存的修改，切换后会丢失。继续吗？')) return;
      notesUI.draftSource = null;
      notesUI.dirty = false;
      fetchNotesChapter(file);
      return;
    }
    const scrollBtn = event.target.closest('[data-note-section-scroll]');
    if (scrollBtn) {
      event.preventDefault();
      const index = Number(scrollBtn.dataset.noteSectionScroll);
      const section = notesUI.chapter?.sections?.[index];
      const textarea = $('#notes-source', root);
      if (!section || !textarea) return;
      const value = textarea.value;
      let pos = value.indexOf(`## ${section.title}`);
      if (pos === -1) pos = value.indexOf(section.title);
      if (pos === -1) {
        toast('源码里已经找不到这个小节标题了', 'info');
        return;
      }
      textarea.focus();
      textarea.setSelectionRange(pos, pos + section.title.length + 3);
      const ratio = pos / Math.max(1, value.length);
      textarea.scrollTop = ratio * (textarea.scrollHeight - textarea.clientHeight);
      return;
    }
    const deleteSectionBtn = event.target.closest('[data-note-section-delete]');
    if (deleteSectionBtn) {
      event.preventDefault();
      if (notesUI.busy) return;
      const index = Number(deleteSectionBtn.dataset.noteSectionDelete);
      const section = notesUI.chapter?.sections?.[index];
      if (!section) return;
      const only = (notesUI.chapter.sections || []).length <= 1;
      if (!window.confirm(`确定删除小节「${section.title}」？${only ? '\n\n这是最后一节，删除后整章会生成一个整章页面。' : ''}`)) return;
      deleteNotesSection(index);
      return;
    }
    const actionEl = event.target.closest('[data-note-action]');
    if (!actionEl) return;
    event.preventDefault();
    if (notesUI.busy) return;
    const action = actionEl.dataset.noteAction;
    switch (action) {
      case 'new-chapter':
        if (notesUI.dirty && !window.confirm('当前章节还有未保存的修改，新建章节会离开当前编辑区。继续吗？')) return;
        captureNotesDraft();
        notesUI.view = 'new';
        notesUI.error = '';
        notesUI.sectionForm = false;
        renderNotesManager();
        break;
      case 'cancel-new':
        notesUI.view = 'chapter';
        notesUI.error = '';
        renderNotesManager();
        break;
      case 'retry-course':
        loadNotesCourse(notesUI.course);
        break;
      case 'retry-chapter':
        fetchNotesChapter(notesUI.file);
        break;
      case 'save-chapter':
        saveNotesChapter();
        break;
      case 'delete-chapter':
        deleteNotesChapter();
        break;
      case 'toggle-section-form':
        captureNotesDraft();
        if (!notesUI.sectionForm && notesUI.dirty) {
          toast('先保存当前源文件，再添加小节', 'info', 3000);
          return;
        }
        notesUI.sectionForm = !notesUI.sectionForm;
        if (notesUI.sectionForm) {
          const order = notesUI.chapter?.data?.order || '';
          notesUI.sectionTitle = `${order ? `${order}.` : ''}${(notesUI.chapter?.sections?.length || 0) + 1} 新小节`;
          notesUI.sectionContent = '';
        }
        renderNotesManager();
        break;
      case 'cancel-section':
        notesUI.sectionForm = false;
        notesUI.sectionTitle = '';
        notesUI.sectionContent = '';
        renderNotesManager();
        break;
      default:
        break;
    }
  });

  root.addEventListener('change', (event) => {
    if (event.target.id === 'notes-course-select') {
      if (notesUI.busy) return;
      if (notesUI.dirty && !window.confirm('当前章节还有未保存的修改，切换课程后会丢失。继续吗？')) {
        event.target.value = notesUI.course;
        return;
      }
      const next = event.target.value;
      if (next && next !== notesUI.course) loadNotesCourse(next);
    }
  });

  root.addEventListener('input', (event) => {
    if (event.target.id === 'notes-source') {
      notesUI.draftSource = event.target.value;
      notesUI.dirty = event.target.value !== (notesUI.chapter?.source || '');
      updateNotesDirtyBadge();
      updateNotesSourceMeta(event.target);
    }
  });

  root.addEventListener('submit', (event) => {
    if (event.target.id === 'notes-section-form') {
      event.preventDefault();
      addNotesSection(event.target);
    } else if (event.target.id === 'notes-new-form') {
      event.preventDefault();
      createNotesChapter(event.target);
    }
  });

  root.addEventListener('keydown', (event) => {
    if (event.target.id === 'notes-source' && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
      event.preventDefault();
      if (!notesUI.busy) saveNotesChapter();
    }
  });
}


async function notesCall(path, body) {
  return enqueueTask(async () => {
    const res = await api(path, { method: 'POST', body });
    setSavedFlash();
    return res;
  });
}

function applyNotesMutationResult(res) {
  notesUI.changed = true;
  notesUI.split = res.split || null;
  if (res.course) notesUI.courseData = res.course;
  if (res.chapter) {
    notesUI.chapter = res.chapter;
    notesUI.file = res.chapter.file;
    notesUI.view = 'chapter';
  }
  notesUI.dirty = false;
  notesUI.draftSource = null;
  notesUI.sectionForm = false;
  notesUI.error = '';
}

async function saveNotesChapter() {
  if (notesUI.busy || !notesUI.chapter || !notesUI.open) return;
  const textarea = $('#notes-source', notesUI.root);
  const source = textarea ? textarea.value : notesUI.draftSource;
  if (source === null || source === undefined) return;
  if (source === notesUI.chapter.source && !notesUI.dirty) {
    toast('没有新的改动', 'info', 1600);
    return;
  }
  notesUI.draftSource = source;
  setNotesBusy(true, '正在保存并重新生成小节页…');
  try {
    const res = await notesCall('/__api/notes/save', {
      course: notesUI.course,
      file: notesUI.file,
      source,
      baseHash: notesUI.chapter.hash,
    });
    applyNotesMutationResult(res);
    notesUI.busy = false;
    renderNotesManager();
    if (res.split?.ok) toast('已保存并重新生成小节页', 'success', 1900);
    else toast('源文件已保存，但切分小节失败，请查看输出', 'error', 5600);
  } catch (error) {
    notesUI.busy = false;
    notesUI.dirty = true;
    notesUI.error = error.message;
    notesUI.split = null;
    setNotesBusy(false);
    renderNotesManager();
    toast(error.message, 'error', 4600);
  }
}

async function createNotesChapter(form) {
  if (notesUI.busy) return;
  const data = new FormData(form);
  const body = {
    course: notesUI.course,
    title: String(data.get('title') || '').trim(),
    order: String(data.get('order') || '').trim(),
    date: String(data.get('date') || '').trim(),
    fileName: String(data.get('fileName') || '').trim(),
    firstSectionTitle: String(data.get('firstSectionTitle') || '').trim(),
    firstSectionContent: String(data.get('firstSectionContent') || ''),
  };
  if (!body.title) { toast('章标题不能为空', 'error'); return; }
  if (!body.order) { toast('章号不能为空', 'error'); return; }
  setNotesBusy(true, '正在创建章节并生成小节页…');
  try {
    const res = await notesCall('/__api/notes/create', body);
    applyNotesMutationResult(res);
    notesUI.busy = false;
    renderNotesManager();
    toast(res.split?.ok ? '章节已创建，小节页已生成' : '章节已创建，但切分失败，请查看输出',
      res.split?.ok ? 'success' : 'error', 3400);
  } catch (error) {
    notesUI.busy = false;
    setNotesBusy(false);
    toast(error.message, 'error', 4600);
  }
}

async function addNotesSection(form) {
  if (notesUI.busy || !notesUI.chapter) return;
  if (notesUI.dirty) {
    toast('先保存当前源文件，再添加小节', 'info', 3000);
    return;
  }
  const data = new FormData(form);
  const title = String(data.get('title') || '').trim();
  const content = String(data.get('content') || '');
  if (!title) { toast('小节标题不能为空', 'error'); return; }
  notesUI.sectionTitle = title;
  notesUI.sectionContent = content;
  setNotesBusy(true, '正在插入小节并生成页面…');
  try {
    const res = await notesCall('/__api/notes/section/add', {
      course: notesUI.course,
      file: notesUI.file,
      title,
      content,
      baseHash: notesUI.chapter.hash,
    });
    applyNotesMutationResult(res);
    notesUI.busy = false;
    renderNotesManager();
    toast(res.split?.ok ? '小节已添加，页面已生成' : '小节已插入，但切分失败，请查看输出',
      res.split?.ok ? 'success' : 'error', 3000);
  } catch (error) {
    notesUI.busy = false;
    notesUI.error = error.message;
    notesUI.sectionForm = true;
    setNotesBusy(false);
    renderNotesManager();
    toast(error.message, 'error', 4600);
  }
}

async function deleteNotesSection(index) {
  if (notesUI.busy || !notesUI.chapter) return;
  const section = notesUI.chapter.sections?.[index];
  if (!section) return;
  const confirmed = window.confirm(`确定删除小节「${section.title}」？\n\n会修改源文件并删除对应的小节页；源文件备份保存在 editor/.backups。`);
  if (!confirmed) return;
  if (notesUI.dirty) {
    toast('当前还有未保存修改，将按上次保存的源文件删除小节', 'info', 3600);
  }
  setNotesBusy(true, '正在删除小节并更新页面…');
  try {
    const res = await notesCall('/__api/notes/section/delete', {
      course: notesUI.course,
      file: notesUI.file,
      index,
      baseHash: notesUI.chapter.hash,
    });
    applyNotesMutationResult(res);
    notesUI.busy = false;
    renderNotesManager();
    toast(res.split?.ok ? '小节已删除，页面已更新' : '小节已删除，但切分失败，请查看输出',
      res.split?.ok ? 'success' : 'error', 3000);
  } catch (error) {
    notesUI.busy = false;
    notesUI.error = error.message;
    setNotesBusy(false);
    renderNotesManager();
    toast(error.message, 'error', 4600);
  }
}

async function deleteNotesChapter() {
  if (notesUI.busy || !notesUI.chapter) return;
  const title = notesUI.chapter.data.title || notesUI.chapter.file;
  const confirmed = window.confirm(`确定删除章节「${title}」？\n\n会删除源文件并清理生成的小节页。备份保存在 editor/.backups，且可以用 Git 恢复。`);
  if (!confirmed) return;
  setNotesBusy(true, '正在删除章节并清理页面…');
  try {
    const res = await notesCall('/__api/notes/delete', {
      course: notesUI.course,
      file: notesUI.file,
      baseHash: notesUI.chapter.hash,
    });
    notesUI.changed = true;
    notesUI.busy = false;
    notesUI.split = res.split || null;
    notesUI.dirty = false;
    notesUI.draftSource = null;
    if (res.course) notesUI.courseData = res.course;
    notesUI.chapter = null;
    notesUI.file = '';
    notesUI.sectionForm = false;
    notesUI.error = '';
    const remaining = notesUI.courseData?.chapters || [];
    if (remaining.length) {
      await fetchNotesChapter(remaining[0].file);
    } else {
      notesUI.view = 'new';
      renderNotesManager();
    }
    toast(res.split?.ok ? '章节已删除，小节页已清理' : '章节已删除，但清理小节页时出现问题', res.split?.ok ? 'success' : 'error', 3000);
  } catch (error) {
    notesUI.busy = false;
    notesUI.error = error.message;
    setNotesBusy(false);
    renderNotesManager();
    toast(error.message, 'error', 4600);
  }
}

async function refreshAfterNotesChanges() {
  try {
    const fresh = await fetchState(true);
    state.pages = fresh.pages || state.pages;
    state.notes = fresh.notes || state.notes;
    state.site = fresh.site || state.site;
    state.app = fresh.app || state.app;
    renderRail();
    updateStageHeader();
    updateUndoButtons();
    if (state.currentId && state.page &&
        (state.currentId === 'index.html' || state.page.type === 'cover')) {
      // 笔记改动会同时修改首页页脚和课程封面日期；必须刷新当前页的 hash，
      // 否则紧接着编辑首页/封面会因旧 baseHash 被误报为冲突。
      const res = await fetchPage(state.currentId);
      state.page = res.page;
      state.selection = null;
      updateAfterPageChange();
      await reloadPreview({ keepScroll: true, soft: true });
    }
  } catch (error) {
    toast(`笔记已修改，但刷新站点信息失败：${error.message}`, 'error', 4600);
  }
}


/* ------------------------------------------------------------------ */
/* 页面内容管理（入口卡片 / 照片墙）                                    */
/* ------------------------------------------------------------------ */
const contentUI = { tab: 'entries', root: null, modal: null, busy: false };

function openContentManager(tab = 'entries') {
  if (!state.page) return;
  const meta = state.page.meta || {};
  if (!(meta.entryCards?.length) && !(meta.photoLocations?.length)) {
    toast('这个页面还没有可管理的卡片或照片', 'info');
    return;
  }
  contentUI.tab = tab === 'photos' && meta.photoLocations?.length ? 'photos' : 'entries';
  contentUI.busy = false;
  const books = isBookPage();
  const modal = openModal({
    title: '页面内容',
    subtitle: books
      ? '按书名、作者和链接管理小说书单；点「编辑」回到页面细调字段。'
      : '管理这个页面上的入口卡片与照片墙；需要细调文字时，点「编辑」回到预览。',
    cardClass: 'content-modal',
    wide: true,
    body: '<div class="content-manager-shell" id="content-manager-root"></div>',
    footer: `<span class="modal-foot-hint">${books ? '删除小说后可以用编辑器顶部的撤销恢复' : '删除照片不会删除 assets/photos 里的原始文件'}</span>
      <button type="button" class="btn ghost" data-close>关闭</button>`,
    onMount(root, controller) {
      contentUI.root = root;
      contentUI.modal = controller;
      bindContentManager(root);
      renderContentManager();
    },
  });
  if (modal) {
    modal.onClose = () => {
      contentUI.root = null;
      contentUI.modal = null;
      contentUI.busy = false;
    };
  }
}

function contentTabCounts() {
  const meta = state.page?.meta || {};
  const entryCount = meta.entryCards?.length || 0;
  const groups = meta.photoLocations || [];
  const photoCount = groups.reduce((sum, g) => sum + (g.photos?.length || 0), 0);
  return { entryCount, groups, photoCount };
}

function renderContentManager() {
  if (!contentUI.root) return;
  const body = $('.modal-body', contentUI.root);
  if (!body) return;
  const meta = state.page?.meta || {};
  const { entryCount, groups, photoCount } = contentTabCounts();
  const isBooks = isBookPage();
  const hasEntries = entryCount > 0;
  const hasPhotos = groups.length > 0;
  if (contentUI.tab === 'entries' && !hasEntries && hasPhotos) contentUI.tab = 'photos';
  if (contentUI.tab === 'photos' && !hasPhotos && hasEntries) contentUI.tab = 'entries';
  const tabs = `<div class="content-tabs" role="tablist">
    <button type="button" class="content-tab ${contentUI.tab === 'entries' ? 'active' : ''}" data-content-tab="entries" ${hasEntries ? '' : 'disabled'}>
      ${icon(isBooks ? 'novel' : 'grid')}${isBooks ? '小说书单' : '入口卡片'} <span>${entryCount}${isBooks ? ' 本' : ''}</span>
    </button>
    <button type="button" class="content-tab ${contentUI.tab === 'photos' ? 'active' : ''}" data-content-tab="photos" ${hasPhotos ? '' : 'disabled'}>
      ${icon('image')}照片墙 <span>${groups.length} 组 · ${photoCount} 张</span>
    </button>
  </div>`;

  let panel = '';
  if (contentUI.tab === 'entries') {
    const entries = meta.entryCards || [];
    const list = entries.map((entry, index) => {
      const book = isBooks ? bookEntryData(entry) : null;
      return `<div class="content-row">
      <div class="content-row-main">
        <strong>${esc(book ? (book.title || '未命名小说') : (entry.title || '未命名卡片'))}</strong>
        ${book
          ? `<span class="content-book-author">作者：${esc(book.author || '未填写')}</span>
             <small>${esc(book.review || '没有评价')}</small>`
          : `<small>${esc(entry.desc || '没有描述')}</small>`}
        <span class="content-row-link">${esc(entry.href || '#')}${entry.newTab ? ' · 新标签页' : ''}</span>
      </div>
      <div class="content-row-actions">
        <button type="button" class="icon-btn" data-content-action="move-entry" data-eid="${escAttr(entry.eid)}" data-direction="up" title="上移" ${index === 0 ? 'disabled' : ''}>${icon('arrow-up')}</button>
        <button type="button" class="icon-btn" data-content-action="move-entry" data-eid="${escAttr(entry.eid)}" data-direction="down" title="下移" ${index === entries.length - 1 ? 'disabled' : ''}>${icon('arrow-down')}</button>
        <button type="button" class="btn ghost small" data-content-action="select" data-eid="${escAttr(entry.eid)}">${icon('cursor')}编辑</button>
        <button type="button" class="icon-btn danger" data-content-action="delete-entry" data-eid="${escAttr(entry.eid)}" title="${isBooks ? '删除小说' : '删除卡片'}">${icon('trash')}</button>
      </div>
    </div>`;
    }).join('');
    panel = `<div class="content-panel">
      <div class="content-panel-head">
        <div>
          <h3>${isBooks ? '小说书单' : '入口卡片'}</h3>
          <p>${isBooks ? '显示在小说页的书单里；书名和作者分开管理，评价会合成卡片副标题。' : '显示在页面的「快速入口 / 卡片网格」里。空的描述会显示为一行空白。'}</p>
        </div>
        <button type="button" class="btn primary small" data-action="${isBooks ? 'add-book' : 'add-entry'}">${icon('plus')}${isBooks ? '添加小说' : '添加卡片'}</button>
      </div>
      ${list || `<div class="content-empty">
        <span>${icon(isBooks ? 'novel' : 'grid')}</span>
        <p>${isBooks ? '这个页面还没有小说。' : '这个页面还没有入口卡片。'}</p>
        <button type="button" class="btn soft small" data-action="${isBooks ? 'add-book' : 'add-entry'}">${icon('plus')}${isBooks ? '添加第一本' : '添加第一张'}</button>
      </div>`}
    </div>`;
  } else {
    const groupHtml = groups.map((group) => {
      const photos = group.photos || [];
      const photoTiles = photos.map((photo) => `<figure class="content-photo" title="${escAttr(photo.caption || photo.alt || '照片')}">
        <span class="content-photo-img" style="background-image:url('${escAttr(assetUrl(photo.src))}')"></span>
        <figcaption>${esc(photo.caption || photo.alt || '未命名照片')}</figcaption>
        <span class="content-photo-actions">
          <button type="button" class="icon-btn" data-content-action="select" data-eid="${escAttr(photo.eid)}" title="在页面中编辑">${icon('pencil')}</button>
          <button type="button" class="icon-btn danger" data-content-action="delete-photo" data-eid="${escAttr(photo.eid)}" title="删除照片">${icon('trash')}</button>
        </span>
      </figure>`).join('');
      return `<section class="content-group">
        <div class="content-group-head">
          <div>
            <h3>${esc(group.title || '未命名照片墙')}</h3>
            <p>${photos.length} 张照片</p>
          </div>
          <div class="content-row-actions">
            <button type="button" class="btn ghost small" data-action="add-photo" data-wall-eid="${escAttr(group.wallEid)}">${icon('plus')}添加照片</button>
            <button type="button" class="btn danger small" data-content-action="delete-group" data-eid="${escAttr(group.wallEid)}">${icon('trash')}删除整组</button>
          </div>
        </div>
        <div class="content-photo-grid">
          ${photoTiles || `<button type="button" class="content-photo-empty" data-action="add-photo" data-wall-eid="${escAttr(group.wallEid)}">${icon('image')}还没有照片，添加一张</button>`}
        </div>
      </section>`;
    }).join('');
    panel = `<div class="content-panel">
      <div class="content-panel-head">
        <div>
          <h3>照片墙</h3>
          <p>每个分组对应页面里的一个「地点」标题加一排照片；悬停照片可单独编辑或删除，原图文件会保留。</p>
        </div>
        <div class="btn-row">
          <button type="button" class="btn ghost small" data-action="add-location">${icon('folder')}新建分组</button>
          <button type="button" class="btn primary small" data-action="add-photo">${icon('plus')}添加照片</button>
        </div>
      </div>
      ${groupHtml || `<div class="content-empty">
        <span>${icon('image')}</span>
        <p>这个页面还没有照片分组。</p>
        <button type="button" class="btn soft small" data-action="add-location">${icon('plus')}新建照片分组</button>
      </div>`}
    </div>`;
  }

  body.innerHTML = `<div class="content-manager">
    ${tabs}
    ${panel}
    ${contentUI.busy ? `<div class="content-busy"><div class="spinner"></div><span>正在更新页面…</span></div>` : ''}
  </div>`;
  hydrateIcons(body);
}

function bindContentManager(root) {
  root.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-content-tab]');
    if (tab) {
      event.preventDefault();
      contentUI.tab = tab.dataset.contentTab === 'photos' ? 'photos' : 'entries';
      renderContentManager();
      return;
    }
    const actionEl = event.target.closest('[data-content-action]');
    if (!actionEl) return;
    event.preventDefault();
    if (contentUI.busy) return;
    const action = actionEl.dataset.contentAction;
    const eid = actionEl.dataset.eid;
    if (action === 'select') {
      selectInPreview(eid);
      return;
    }
    if (action === 'move-entry') {
      const direction = actionEl.dataset.direction === 'up' ? 'up' : 'down';
      contentOperation({ type: 'moveElement', eid, direction });
      return;
    }
    if (action === 'delete-entry') {
      if (isBookPage()) {
        const entry = (state.page?.meta?.entryCards || []).find((item) => item.eid === eid);
        const book = bookEntryData(entry || {});
        if (!window.confirm(`从书单删除《${book.title || entry?.title || '这本小说'}》？可以用编辑器顶部的撤销恢复。`)) return;
      } else if (!window.confirm('删除这张入口卡片？可以用编辑器顶部的撤销恢复。')) return;
      contentOperation({ type: 'deleteElement', eid });
      return;
    }
    if (action === 'delete-photo') {
      if (!window.confirm('从页面删除这张照片？原图仍保留在 assets/photos/ 里。')) return;
      contentOperation({ type: 'deleteElement', eid });
      return;
    }
    if (action === 'delete-group') {
      if (!window.confirm('删除这个照片分组及其标题？照片原图仍保留在 assets/photos/ 里。')) return;
      contentOperation({ type: 'deletePhotoGroup', eid });
    }
  });
}

async function contentOperation(op) {
  if (contentUI.busy) return;
  contentUI.busy = true;
  renderContentManager();
  try {
    await ensureStructuralReady();
    await requestOperation(op, { reload: true });
    contentUI.busy = false;
    renderContentManager();
  } catch {
    contentUI.busy = false;
    renderContentManager();
  }
}

function selectInPreview(eid) {
  if (!eid) return;
  closeModal();
  if (state.mode !== 'edit') setMode('edit');
  setTimeout(() => sendBridge({ type: 'selectEid', eid }), 120);
}


/* ------------------------------------------------------------------ */
/* 一键发布到 GitHub                                                    */
/* ------------------------------------------------------------------ */
function publishDefaultMessage() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `更新主页内容 · ${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function publishSummaryHtml(git) {
  const aheadText = git.ahead ? `${git.ahead} 个提交待推送` : '无';
  const changeText = git.fileCount ? `${git.fileCount} 个文件有修改` : '工作区干净';
  return `<div class="publish-summary">
    <div class="publish-meta"><span>分支</span><strong class="mono">${esc(git.branch || '—')}</strong></div>
    <div class="publish-meta"><span>远端</span><strong>${esc(git.remote || '未配置')}</strong></div>
    <div class="publish-meta"><span>本地改动</span><strong>${esc(changeText)}</strong></div>
    <div class="publish-meta"><span>未推送</span><strong>${esc(aheadText)}</strong></div>
  </div>
  ${git.lastCommit ? `<div class="publish-hint" style="margin-top:-5px;margin-bottom:10px">上次提交：<span class="mono">${esc(git.lastCommit)}</span></div>` : ''}`;
}

function publishFilesHtml(git) {
  if (!git.statusText) return '';
  return `<details class="publish-files">
    <summary>查看变更文件（${git.fileCount} 项，Git 状态）</summary>
    <pre>${esc(git.statusText)}</pre>
  </details>`;
}

function publishResultHtml(result) {
  const branch = result.branch ? `分支 <span class="mono">${esc(result.branch)}</span>` : '';
  const summary = result.commit
    ? `提交 <span class="mono">${esc(result.commit)}</span>${branch ? ` · ${branch}` : ''}`
    : `已推送已有的本地提交${branch ? ` · ${branch}` : ''}`;
  const output = result.output
    ? `<details class="publish-files"><summary>查看 Git 输出</summary><pre>${esc(result.output)}</pre></details>`
    : '';
  return `<div class="publish-result">
    <span class="publish-result-icon ok">${icon('check')}</span>
    <h3>发布成功</h3>
    <p>${summary}。<br>GitHub Pages 通常会在 1 分钟左右完成构建，稍后刷新线上主页即可。</p>
    ${output}
  </div>`;
}

function publishFailureHtml(result, message) {
  const title = result?.committed && !result?.pushed ? '本地已提交，推送失败' : '发布没有完成';
  const text = result?.committed
    ? '代码已经在本地提交，检查网络或代理后可以只重试推送；不会重复创建提交。'
    : '没有产生新的提交。请检查下方的 Git 输出，确认身份配置、代理、权限或 hooks。';
  const error = result?.error ? `<p>${esc(result.error)}</p>` : '';
  const output = (result?.output || result?.detail || '') ? `<pre class="publish-output">${esc(result.output || result.detail)}</pre>` : '';
  return `<div class="publish-result">
    <span class="publish-result-icon fail">${icon('alert')}</span>
    <h3>${esc(title)}</h3>
    <p>${esc(text)}</p>
    ${error}
    ${output}
  </div>`;
}

async function openPublishDialog() {
  try {
    if (state.inlineActive) await settleInline();
    const ok = await flushSchedules();
    await saveChain.catch(() => {});
    if (!ok) {
      toast('还有修改没有保存成功，暂时不能发布', 'error');
      return;
    }
  } catch (error) {
    toast(error.message, 'error');
    return;
  }

  let git;
  try {
    const data = await api('/__api/publish/status');
    git = data.git;
  } catch (error) {
    toast(error.message, 'error', 4600);
    return;
  }

  if (!git || git.available === false) {
    openModal({
      title: '无法发布',
      subtitle: '当前目录不能执行 Git 发布。',
      body: `<div class="tip warn">${icon('alert')} ${esc(git?.error || '读取 Git 状态失败。')}</div>
        ${git?.detail ? `<pre class="publish-output">${esc(git.detail)}</pre>` : ''}
        <div class="publish-hint">请确认站点目录是一个 Git 仓库，并已配置 origin 远端。</div>`,
      footer: `<button type="button" class="btn ghost" data-close>关闭</button>`,
    });
    return;
  }

  const canPublish = (git.fileCount > 0 || git.ahead > 0) && !git.detached && Boolean(git.remote);
  const message = publishDefaultMessage();
  let lastMessage = message;
  let modal = null;

  const initialBody = `${publishSummaryHtml(git)}
    ${git.detached ? `<div class="tip warn">${icon('alert')} 当前处于 detached HEAD 状态，请切回分支后再发布。</div>` : ''}
    ${!git.remote ? `<div class="tip warn">${icon('alert')} 没有配置 Git 远端，无法推送。</div>` : ''}
    ${canPublish
      ? `<div class="field">
          <label class="field-label" for="publish-message">提交信息</label>
          <input class="field-input" id="publish-message" value="${escAttr(message)}" maxlength="200">
        </div>
        ${publishFilesHtml(git)}
        <div class="tip" style="margin-top:10px">${icon('info')} 将执行 <strong>git add -A → commit → push</strong>，不会 force push，也不会跳过仓库 hooks。推送前请确认代理/网络可用。</div>`
      : `<div class="tip" style="margin-top:10px">${
          !git.remote || git.detached
            ? `${icon('alert')} 修正 Git 配置后再发布。`
            : `${icon('check')} 工作区没有新的修改，也没有待推送的本地提交。`
        }</div>`}`;

  modal = openModal({
    title: '发布到 GitHub',
    subtitle: '提交当前所有本地修改并推送到远端；推送成功后 GitHub Pages 会自动重新构建。',
    cardClass: 'publish-modal',
    body: initialBody,
    footer: canPublish
      ? `<span class="modal-foot-hint">提交信息会写入 Git 历史</span>
         <button type="button" class="btn ghost" data-close>取消</button>
         <button type="button" class="btn primary" id="publish-confirm">${icon('cloud-upload')}提交并推送</button>`
      : `<button type="button" class="btn ghost" data-close>关闭</button>`,
    onMount(root, controller) {
      const startPublish = async () => {
        const input = $('#publish-message', root);
        lastMessage = input ? input.value.trim() : lastMessage;
        const body = $('.modal-body', root);
        const foot = $('.modal-foot', root);
        if (body) {
          body.innerHTML = `<div class="publish-progress">
            <div class="spinner"></div>
            <h3>正在提交并推送…</h3>
            <p>正在运行 git add / commit / push。<br>这一步可能需要几十秒，请不要关闭编辑器。</p>
          </div>`;
        }
        if (foot) {
          foot.innerHTML = '<span class="modal-foot-hint">正在与 GitHub 通信…</span>';
        }
        let result;
        try {
          result = await api('/__api/publish', {
            method: 'POST',
            body: { message: lastMessage },
          });
        } catch (error) {
          result = { ok: false, committed: false, pushed: false, error: error.message, output: '' };
        }
        const resultBody = $('.modal-body', root);
        const resultFoot = $('.modal-foot', root);
        if (result.ok) {
          if (resultBody) resultBody.innerHTML = publishResultHtml(result);
          toast(result.committed ? '已提交并推送到 GitHub' : '发布状态已更新', 'success', 4200);
          if (resultFoot) {
            resultFoot.innerHTML = `<span class="modal-foot-hint">${esc(result.message || '')}</span>
              ${state.site?.url ? `<a class="btn ghost" href="${escAttr(state.site.url)}" target="_blank" rel="noopener">${icon('external')}线上主页</a>` : ''}
              <button type="button" class="btn primary" data-close>完成</button>`;
          }
        } else {
          if (resultBody) resultBody.innerHTML = publishFailureHtml(result, lastMessage);
          toast(result.error || '发布失败', 'error', 5200);
          if (resultFoot) {
            resultFoot.innerHTML = `<span class="modal-foot-hint">可以检查输出后重试</span>
              <button type="button" class="btn ghost" data-close>关闭</button>
              <button type="button" class="btn primary" id="publish-retry">${icon('refresh')}重试</button>`;
            $('#publish-retry', root)?.addEventListener('click', startPublish);
          }
        }
      };
      $('#publish-confirm', root)?.addEventListener('click', startPublish);
    },
  });
  if (modal) {
    modal.beforeClose = () => {
      const body = $('.modal-body', modal.root);
      return !body?.querySelector('.publish-progress');
    };
  }
}

/* ==== 追加功能 ==== */

boot();
