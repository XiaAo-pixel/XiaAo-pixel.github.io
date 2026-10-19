/**
 * 主页助手 —— 本地可视化编辑器
 *
 * 启动：node editor/server.mjs  （或双击根目录「打开主页助手.cmd」）
 * 只监听 127.0.0.1，不会把写文件能力暴露到局域网。
 */
import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

import { listPages, readPage, readConfig, isValidPageId } from './lib/site.mjs';
import { buildPreviewHtml } from './lib/preview.mjs';
import { applyOperation } from './lib/operations.mjs';
import { getNotesIndex } from './lib/notes.mjs';
import {
  addSection,
  createChapter,
  deleteChapter,
  deleteSection,
  getCourse,
  listSourceCourses,
  readChapter,
  saveChapter,
} from './lib/notes-admin.mjs';
import {
  readTheme,
  updateTheme,
  transformDarkMedia,
  liveVars,
} from './lib/theme.mjs';
import {
  saveUpload,
  serializeWrite,
  styleFile,
  writeTextFile,
} from './lib/store.mjs';
import {
  applyEdits,
  buildAttrEdits,
  buildRegistry,
  findClass,
  splitFrontmatter,
} from './lib/html.mjs';
import { setCoverPrefixDate, setPageFooterDate, todayIso } from './lib/dates.mjs';
import { getGitStatus, publishRepo } from './lib/git.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const args = process.argv.slice(2);
function argValue(name, fallback) {
  const i = args.indexOf(name);
  if (i === -1) return fallback;
  return args[i + 1] || fallback;
}
const root = path.resolve(argValue('--root', DEFAULT_ROOT));
const startPort = Number.parseInt(argValue('--port', '4173'), 10) || 4173;
const shouldOpen = !args.includes('--no-open');

function json(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function fail(res, status, message, extra = {}) {
  json(res, status, { error: message, ...extra });
}

function text(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

async function readJsonBody(req) {
  if (!/^application\/json\b/i.test(req.headers['content-type'] || '')) {
    const error = new Error('请求需要 application/json');
    error.status = 415;
    throw error;
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 30 * 1024 * 1024) {
      const error = new Error('请求内容超过 30MB');
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    const error = new Error('JSON 格式不正确');
    error.status = 400;
    throw error;
  }
}

function sanitizeHost(host) {
  return String(host || '').replace(/:\d+$/, '');
}

function allowedHost(host) {
  const name = sanitizeHost(host);
  return name === '127.0.0.1' || name === 'localhost' || name === '[::1]' || name === '::1';
}

function checkWriteRequest(req) {
  if (req.headers['x-editor-request'] !== '1') {
    const error = new Error('缺少编辑器请求标记');
    error.status = 403;
    throw error;
  }
  const origin = req.headers.origin;
  if (origin) {
    try {
      const url = new URL(origin);
      if (!allowedHost(url.host)) {
        const error = new Error('拒绝来自其它站点的写入请求');
        error.status = 403;
        throw error;
      }
    } catch {
      const error = new Error('Origin 不合法');
      error.status = 403;
      throw error;
    }
  }
}

function contentDispositionInline() {
  return 'inline';
}

async function statSafe(file) {
  try {
    return await fsp.stat(file);
  } catch {
    return null;
  }
}

async function serveFile(res, file, { head = false } = {}) {
  const stat = await statSafe(file);
  if (!stat || !stat.isFile()) {
    fail(res, 404, '文件不存在');
    return;
  }
  const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': type,
    'Content-Length': stat.size,
    'Cache-Control': 'no-cache',
    'Content-Disposition': contentDispositionInline(),
  });
  if (head) {
    res.end();
    return;
  }
  fs.createReadStream(file).pipe(res);
}

function pageResponse(page) {
  const base = {
    id: page.id,
    type: page.type,
    source: page.raw,
    hash: page.hash,
    mtime: page.mtime,
    size: page.size,
    meta: page.meta,
    data: {
      title: page.data.title || '',
      date: page.data.date || '',
      course: page.data.course || '',
    },
  };
  return base;
}

function publicChapter(chapter) {
  if (!chapter) return null;
  return {
    course: chapter.course,
    file: chapter.file,
    data: chapter.data,
    source: chapter.raw,
    hash: chapter.hash,
    sections: chapter.sections,
    sectionCount: chapter.sectionCount,
    hasFrontmatter: chapter.hasFrontmatter,
  };
}

async function apiState({ fresh = false } = {}) {
  const [{ pages, config }, notes, style, sources] = await Promise.all([
    listPages(root),
    getNotesIndex(root, { fresh }),
    styleFile(root),
    listSourceCourses(root, { fresh }),
  ]);
  const theme = readTheme(style.raw);
  let avatarMtime = 0;
  try {
    avatarMtime = (await fsp.stat(path.join(root, 'assets', 'avatar.jpg'))).mtimeMs;
  } catch {
    avatarMtime = 0;
  }

  let assetFiles = [];
  try {
    assetFiles = await fsp.readdir(path.join(root, 'assets'));
  } catch {
    assetFiles = [];
  }
  const backgrounds = [{
    id: 'none',
    label: '内置插画',
    value: null,
    preview: '/assets/bg-light.svg',
  }];
  for (const file of assetFiles) {
    if (!/^wallpaper[^/]*\.(?:jpe?g|png|webp|avif)$/i.test(file)) continue;
    const ext = (/\.([a-z0-9]+)$/i.exec(file)?.[1] || '').toUpperCase();
    const stem = file.replace(/\.(?:jpe?g|png|webp|avif)$/i, '');
    let label = stem.replace(/^wallpaper[-_]?/i, '').trim();
    if (!label || /^wallpaper$/i.test(stem)) label = `壁纸 · ${ext}`;
    backgrounds.push({
      id: file,
      label: label === '我的壁纸' ? `我的壁纸 · ${ext}` : label,
      value: `assets/${file}`,
      preview: `/assets/${encodeURIComponent(file)}`,
    });
  }

  const enrichedPages = pages.map((page) => {
    let badge = '';
    if (page.type === 'cover') {
      const course = path.posix.dirname(page.id);
      const info = notes.byCourse.get(course);
      badge = info ? `${info.count} 节` : '未生成';
    }
    return { ...page, badge };
  });

  return {
    app: {
      name: '主页助手',
      version: '1.0.0',
      root,
      rootLabel: config.projectLabel || path.basename(root),
    },
    site: {
      name: config.siteName || '',
      url: config.siteUrl || '',
    },
    pages: enrichedPages,
    notes: {
      total: notes.totalSections,
      courses: notes.courses.map((c) => ({
        course: c.course,
        title: c.title,
        date: c.date || '',
        count: c.count,
        chapters: c.chapters.length,
      })),
      sources: sources.courses,
    },
    theme: {
      ...theme,
      backgrounds,
      live: liveVars(theme),
    },
    style: { hash: style.hash },
    avatar: {
      url: `/assets/avatar.jpg${avatarMtime ? `?v=${Math.round(avatarMtime)}` : ''}`,
    },
  };
}

function anchorIsUnderNav(registry, record) {
  let current = record;
  while (current?.parentEid) {
    current = registry.byEid.get(current.parentEid);
    if (current?.tag === 'NAV') return true;
  }
  return false;
}

function parseNavAnchors(registry) {
  return registry.elements.filter((r) => r.tag === 'A' && anchorIsUnderNav(registry, r));
}

function normalizedHref(href) {
  const raw = String(href || '').trim();
  if (!raw) return '';
  try {
    const url = new URL(raw, 'http://editor.local/');
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return raw;
  }
}

function stripActiveFromAside(aside) {
  const reg = buildRegistry(aside, 'cover');
  const activeRecords = reg.elements.filter((r) => r.classesLower.includes('active'));
  const edits = [];
  for (const record of activeRecords) {
    const next = record.classes.filter((c) => c.toLowerCase() !== 'active');
    edits.push(...buildAttrEdits(aside, record, { class: next.length ? next.join(' ') : null }));
  }
  return applyEdits(aside, edits);
}

function activeAnchors(aside) {
  const reg = buildRegistry(aside, 'cover');
  const anchors = parseNavAnchors(reg);
  return anchors.map((record, index) => ({
    index,
    href: record.attrs.href || '',
    active: record.classesLower.includes('active'),
  })).filter((item) => item.active);
}

function addActiveToAside(aside, activeItems) {
  const reg = buildRegistry(aside, 'cover');
  const anchors = parseNavAnchors(reg);
  const wanted = new Set();
  for (const item of activeItems) {
    const normalized = normalizedHref(item.href);
    let found = anchors.findIndex((anchor) => normalizedHref(anchor.attrs.href) === normalized);
    if (found === -1 && item.index < anchors.length) found = item.index;
    if (found !== -1) wanted.add(found);
  }
  const edits = [];
  for (const index of wanted) {
    const anchor = anchors[index];
    if (!anchor) continue;
    const classes = anchor.classes.filter((c) => c.toLowerCase() !== 'active');
    classes.push('active');
    edits.push(...buildAttrEdits(aside, anchor, { class: classes.join(' ') }));
  }
  return applyEdits(aside, edits);
}

async function syncSidebar(sourceId, baseHash) {
  if (!(await isValidPageId(root, sourceId))) throw new Error('页面不存在');
  const sourcePage = await readPage(root, sourceId);
  if (sourcePage.type !== 'page') throw new Error('只有卡片版页面可以同步侧边栏');
  if (baseHash && sourcePage.hash !== baseHash) {
    const error = new Error('当前页面的文件已被其它程序修改，请刷新后再同步');
    error.status = 409;
    throw error;
  }
  const aside = findClass(sourcePage.registry, 'sidebar');
  if (!aside) throw new Error('当前页面没有侧边栏');
  const sourceAside = sourcePage.body.slice(aside.startOffset, aside.endOffset);
  const cleanAside = stripActiveFromAside(sourceAside);

  const { pages } = await listPages(root);
  const updated = [];
  const failed = [];
  for (const info of pages) {
    if (info.type !== 'page' || info.id === sourceId) continue;
    try {
      const page = await readPage(root, info.id);
      const targetAside = findClass(page.registry, 'sidebar');
      if (!targetAside) continue;
      const oldAside = page.body.slice(targetAside.startOffset, targetAside.endOffset);
      const active = activeAnchors(oldAside);
      const nextAside = addActiveToAside(cleanAside, active);
      if (nextAside === oldAside) continue;
      const nextBody = applyEdits(page.body, [{
        start: targetAside.startOffset,
        end: targetAside.endOffset,
        text: nextAside,
      }]);
      await writeTextFile(root, page.file, page.prefix + setPageFooterDate(nextBody, todayIso()));
      updated.push(info.id);
    } catch (error) {
      failed.push({ id: info.id, message: error.message });
    }
  }
  return { updated, failed, count: updated.length };
}

async function buildStyleCss() {
  const style = await styleFile(root);
  return transformDarkMedia(style.raw);
}

function errorPage(message) {
  return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
<title>预览失败 | 主页助手</title>
<style>
body{margin:0;padding:3rem;font:16px/1.7 -apple-system,"Segoe UI","Microsoft YaHei",sans-serif;
background:#f4f5fa;color:#293046}
.box{max-width:640px;margin:8vh auto;background:#fff;border:1px solid #e5e8f1;border-radius:18px;
padding:2rem 2.2rem;box-shadow:0 18px 60px rgba(50,60,110,.12)}
h1{font-size:1.2rem;margin:0 0 .8rem}code{background:#f2f4fa;padding:.15rem .35rem;border-radius:5px}
p{color:#5e667a;margin:.5rem 0}
</style></head><body><div class="box"><h1>这个页面暂时预览不了</h1>
<p>${message.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))}</p>
<p>可以回到编辑器换一页，或用「源码」模式检查文件。</p></div></body></html>`;
}

async function handle(req, res, url) {
  const { pathname, searchParams } = url;

  if (!allowedHost(req.headers.host)) {
    fail(res, 403, '不接受的 Host');
    return;
  }

  if (req.method === 'GET' && pathname === '/favicon.ico') {
    res.writeHead(204, { 'Cache-Control': 'public, max-age=86400' });
    res.end();
    return;
  }

  if (req.method === 'GET' && pathname === '/') {
    res.writeHead(302, { Location: '/__editor/' });
    res.end();
    return;
  }

  if (pathname === '/__editor' || pathname === '/__editor/') {
    await serveFile(res, path.join(PUBLIC_DIR, 'index.html'), { head: req.method === 'HEAD' });
    return;
  }

  if (pathname.startsWith('/__editor/') && !pathname.startsWith('/__editor/site.css')) {
    const rel = decodeURIComponent(pathname.slice('/__editor/'.length));
    if (!rel || rel.includes('..') || rel.includes('\\')) {
      fail(res, 404, '资源不存在');
      return;
    }
    await serveFile(res, path.join(PUBLIC_DIR, rel), { head: req.method === 'HEAD' });
    return;
  }

  if (req.method === 'GET' && pathname === '/__editor/site.css') {
    try {
      const css = await buildStyleCss();
      res.writeHead(200, {
        'Content-Type': 'text/css; charset=utf-8',
        'Cache-Control': 'no-store',
      });
      res.end(css);
    } catch (error) {
      text(res, 500, `/* ${error.message.replace(/\*\//g, '')} */`, 'text/css; charset=utf-8');
    }
    return;
  }

  if (req.method === 'GET' && pathname.startsWith('/__preview/')) {
    try {
      const id = decodeURIComponent(pathname.slice('/__preview/'.length));
      const page = await readPage(root, id);
      const dark = searchParams.get('dark') === '1';
      const html = await buildPreviewHtml(root, page, { dark });
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      });
      res.end(html);
    } catch (error) {
      const html = errorPage(error.message);
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      });
      res.end(html);
    }
    return;
  }

  if (req.method === 'GET' && pathname === '/style.css') {
    await serveFile(res, path.join(root, 'style.css'), { head: req.method === 'HEAD' });
    return;
  }

  if (req.method === 'GET' && pathname.startsWith('/assets/')) {
    const rel = decodeURIComponent(pathname.slice(1));
    const file = path.resolve(root, rel);
    if (!file.startsWith(path.resolve(root, 'assets') + path.sep)) {
      fail(res, 404, '资源不存在');
      return;
    }
    await serveFile(res, file, { head: req.method === 'HEAD' });
    return;
  }

  if (pathname === '/__api/state' && req.method === 'GET') {
    try {
      json(res, 200, await apiState({ fresh: searchParams.get('fresh') === '1' }));
    } catch (error) {
      fail(res, 500, error.message);
    }
    return;
  }

  if (pathname === '/__api/page' && req.method === 'GET') {
    try {
      const page = await readPage(root, searchParams.get('id') || '');
      json(res, 200, { page: pageResponse(page) });
    } catch (error) {
      fail(res, 404, error.message);
    }
    return;
  }

  if (pathname === '/__api/operation' && req.method === 'POST') {
    try {
      checkWriteRequest(req);
      const body = await readJsonBody(req);
      const result = await serializeWrite(async () => {
        const page = await readPage(root, String(body.id || ''));
        if (body.baseHash && page.hash !== body.baseHash) {
          const error = new Error('文件已被其它程序修改，请刷新后再保存');
          error.status = 409;
          error.conflict = true;
          throw error;
        }
        const applied = applyOperation(page, body.op || {});
        let nextBody = applied.body;
        let prefix = applied.prefix;
        const changed = nextBody !== page.body || prefix !== page.prefix;
        if (changed && body.op?.type !== 'setFooterDate') {
          if (page.type === 'cover') prefix = setCoverPrefixDate(prefix, todayIso());
          else nextBody = setPageFooterDate(nextBody, todayIso());
        }
        if (nextBody === page.body && prefix === page.prefix) {
          return { page: pageResponse(page), unchanged: true };
        }
        await writeTextFile(root, page.file, prefix + nextBody);
        const fresh = await readPage(root, page.id);
        return { page: pageResponse(fresh), unchanged: false };
      });
      json(res, 200, result);
    } catch (error) {
      fail(res, error.status || 400, error.message, error.conflict ? { conflict: true } : {});
    }
    return;
  }

  if (pathname === '/__api/source' && req.method === 'POST') {
    try {
      checkWriteRequest(req);
      const body = await readJsonBody(req);
      const result = await serializeWrite(async () => {
        const page = await readPage(root, String(body.id || ''));
        if (body.baseHash && page.hash !== body.baseHash) {
          const error = new Error('文件已被其它程序修改，请刷新后再保存');
          error.status = 409;
          error.conflict = true;
          throw error;
        }
        let source = String(body.source ?? '');
        if (!source.trim()) throw new Error('源文件不能为空');
        if (Buffer.byteLength(source, 'utf8') > 4 * 1024 * 1024) throw new Error('源文件过大');
        if (!body.skipAutoDate) {
          const parsed = splitFrontmatter(source);
          if (page.type === 'cover') {
            source = setCoverPrefixDate(parsed.prefix, todayIso()) + parsed.body;
          } else {
            source = parsed.prefix + setPageFooterDate(parsed.body, todayIso());
          }
        }
        await writeTextFile(root, page.file, source);
        const fresh = await readPage(root, page.id);
        return { page: pageResponse(fresh) };
      });
      json(res, 200, result);
    } catch (error) {
      fail(res, error.status || 400, error.message, error.conflict ? { conflict: true } : {});
    }
    return;
  }

  if (pathname === '/__api/theme' && req.method === 'POST') {
    try {
      checkWriteRequest(req);
      const body = await readJsonBody(req);
      const result = await serializeWrite(async () => {
        const style = await styleFile(root);
        if (body.baseHash && style.hash !== body.baseHash) {
          const error = new Error('样式文件已被其它程序修改，请刷新页面后重试');
          error.status = 409;
          error.conflict = true;
          throw error;
        }
        const updates = {};
        if (body.cardAlpha) {
          updates.cardAlpha = {
            light: Number(body.cardAlpha.light),
            dark: Number(body.cardAlpha.dark),
          };
        }
        if (body.accent) updates.accent = { light: body.accent.light, dark: body.accent.dark };
        if (Object.hasOwn(body, 'wallpaper')) {
          let wallpaper = body.wallpaper;
          if (wallpaper) {
            const clean = String(wallpaper).replace(/^\/+/, '');
            if (clean.includes('..') || clean.includes('\\')) throw new Error('壁纸路径无效');
            const file = path.resolve(root, clean);
            if (!file.startsWith(path.resolve(root, 'assets') + path.sep)) {
              throw new Error('壁纸必须放在 assets/ 目录');
            }
            if (!(await statSafe(file))) throw new Error('壁纸文件不存在');
            wallpaper = clean;
          }
          updates.wallpaper = wallpaper || null;
        }
        const nextCss = updateTheme(style.raw, updates);
        if (nextCss !== style.raw) {
          await writeTextFile(root, style.file, nextCss);
        }
        const fresh = await styleFile(root);
        const theme = readTheme(fresh.raw);
        return {
          theme: { ...theme, live: liveVars(theme) },
          style: { hash: fresh.hash },
        };
      });
      json(res, 200, result);
    } catch (error) {
      fail(res, error.status || 400, error.message, error.conflict ? { conflict: true } : {});
    }
    return;
  }

  if (pathname === '/__api/upload' && req.method === 'POST') {
    try {
      checkWriteRequest(req);
      const body = await readJsonBody(req);
      const result = await serializeWrite(() => saveUpload(root, {
        kind: String(body.kind || ''),
        dataUrl: body.dataUrl,
        width: body.width,
        height: body.height,
      }));
      json(res, 200, result);
    } catch (error) {
      fail(res, error.status || 400, error.message);
    }
    return;
  }

  if (pathname === '/__api/notes/course' && req.method === 'GET') {
    try {
      const data = await getCourse(root, searchParams.get('course') || '', { fresh: true });
      json(res, 200, { course: data });
    } catch (error) {
      fail(res, error.status || 404, error.message);
    }
    return;
  }

  if (pathname === '/__api/notes/chapter' && req.method === 'GET') {
    try {
      const chapter = await readChapter(
        root,
        searchParams.get('course') || '',
        searchParams.get('file') || '',
      );
      json(res, 200, { chapter: publicChapter(chapter) });
    } catch (error) {
      fail(res, error.status || 404, error.message);
    }
    return;
  }

  if (pathname === '/__api/notes/create' && req.method === 'POST') {
    try {
      checkWriteRequest(req);
      const body = await readJsonBody(req);
      const result = await serializeWrite(() => createChapter(root, body));
      json(res, 200, {
        split: result.split,
        course: result.course,
        chapter: publicChapter(result.chapter),
      });
    } catch (error) {
      fail(res, error.status || 400, error.message, error.conflict ? { conflict: true } : {});
    }
    return;
  }

  if (pathname === '/__api/notes/save' && req.method === 'POST') {
    try {
      checkWriteRequest(req);
      const body = await readJsonBody(req);
      const result = await serializeWrite(() => saveChapter(root, body));
      json(res, 200, {
        split: result.split,
        course: result.course,
        chapter: publicChapter(result.chapter),
      });
    } catch (error) {
      fail(res, error.status || 400, error.message, error.conflict ? { conflict: true } : {});
    }
    return;
  }

  if (pathname === '/__api/notes/delete' && req.method === 'POST') {
    try {
      checkWriteRequest(req);
      const body = await readJsonBody(req);
      const result = await serializeWrite(() => deleteChapter(root, body));
      json(res, 200, { split: result.split, course: result.course });
    } catch (error) {
      fail(res, error.status || 400, error.message, error.conflict ? { conflict: true } : {});
    }
    return;
  }

  if (pathname === '/__api/notes/section/add' && req.method === 'POST') {
    try {
      checkWriteRequest(req);
      const body = await readJsonBody(req);
      const result = await serializeWrite(() => addSection(root, body));
      json(res, 200, {
        split: result.split,
        course: result.course,
        chapter: publicChapter(result.chapter),
      });
    } catch (error) {
      fail(res, error.status || 400, error.message, error.conflict ? { conflict: true } : {});
    }
    return;
  }

  if (pathname === '/__api/notes/section/delete' && req.method === 'POST') {
    try {
      checkWriteRequest(req);
      const body = await readJsonBody(req);
      const result = await serializeWrite(() => deleteSection(root, body));
      json(res, 200, {
        split: result.split,
        course: result.course,
        chapter: publicChapter(result.chapter),
      });
    } catch (error) {
      fail(res, error.status || 400, error.message, error.conflict ? { conflict: true } : {});
    }
    return;
  }

  if (pathname === '/__api/publish/status' && req.method === 'GET') {
    try {
      const status = await getGitStatus(root);
      json(res, 200, { git: status });
    } catch (error) {
      fail(res, 500, error.message);
    }
    return;
  }

  if (pathname === '/__api/publish' && req.method === 'POST') {
    try {
      checkWriteRequest(req);
      const body = await readJsonBody(req);
      const result = await serializeWrite(() => publishRepo(root, body.message));
      json(res, 200, result);
    } catch (error) {
      fail(res, 500, error.message);
    }
    return;
  }

  if (pathname === '/__api/sync-sidebar' && req.method === 'POST') {
    try {
      checkWriteRequest(req);
      const body = await readJsonBody(req);
      const result = await serializeWrite(() =>
        syncSidebar(String(body.id || ''), body.baseHash));
      json(res, 200, result);
    } catch (error) {
      fail(res, error.status || 400, error.message, error.conflict ? { conflict: true } : {});
    }
    return;
  }

  fail(res, 404, '接口不存在');
}

const server = http.createServer((req, res) => {
  let url;
  try {
    url = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);
  } catch {
    fail(res, 400, '请求地址不合法');
    return;
  }
  handle(req, res, url).catch((error) => {
    if (res.headersSent) {
      res.destroy();
      return;
    }
    fail(res, 500, error.message || '服务器内部错误');
  });
});

function openBrowser(url) {
  if (!shouldOpen) return;
  try {
    if (process.platform === 'win32') {
      spawn('cmd', ['/c', 'start', '', url], { detached: true, stdio: 'ignore', windowsHide: true }).unref();
    } else if (process.platform === 'darwin') {
      spawn('open', [url], { detached: true, stdio: 'ignore' }).unref();
    } else {
      spawn('xdg-open', [url], { detached: true, stdio: 'ignore' }).unref();
    }
  } catch {
    // 打不开浏览器不影响服务本身，终端里会打印地址。
  }
}

async function listen(port, attempts = 12) {
  return new Promise((resolve, reject) => {
    const onError = (error) => {
      if (error.code === 'EADDRINUSE' && attempts > 0) {
        server.removeListener('error', onError);
        resolve(listen(port + 1, attempts - 1));
      } else {
        reject(error);
      }
    };
    server.once('error', onError);
    server.listen(port, '127.0.0.1', () => {
      server.removeListener('error', onError);
      resolve(port);
    });
  });
}

try {
  const port = await listen(startPort);
  const url = `http://127.0.0.1:${port}/__editor/`;
  console.log('');
  console.log('  主页助手已启动');
  console.log(`  本地地址：${url}`);
  console.log(`  站点目录：${root}`);
  console.log('  修改会直接写入源文件（首次修改前会自动留一份备份到 editor/.backups）');
  console.log('  按 Ctrl+C 停止');
  console.log('');
  openBrowser(url);
} catch (error) {
  console.error('启动失败：', error.message);
  process.exitCode = 1;
}
