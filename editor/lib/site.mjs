/** 页面发现、读取与结构元数据。 */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {
  allDescendantEids,
  buildRegistry,
  findClass,
  findDescendantClass,
  findNextElementSibling,
  findTitleSpan,
  getRecord,
  splitFrontmatter,
} from './html.mjs';


const SKIP_DIRS = new Set([
  'assets', 'notes', 'editor', 'node_modules', 'vendor', '_layouts', '_preview',
  '_site', '_includes', '_data', '_sass', '_source', 'fig',
]);
const DEFAULT_GROUPS = ['页面', '兴趣爱好', '书籍封面', '其它页面'];

function sha1(text) {
  return crypto.createHash('sha1').update(text, 'utf8').digest('hex');
}

function decodeHtml(text) {
  return String(text ?? '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(Number.parseInt(n, 16)));
}

function pureText(html) {
  return decodeHtml(String(html || '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

async function readConfig() {
  try {
    const file = new URL('../config.json', import.meta.url);
    return JSON.parse(await fs.readFile(file, 'utf8'));
  } catch {
    return { siteUrl: '', pageMeta: {}, groups: DEFAULT_GROUPS };
  }
}

async function fileExists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

function firstHeading(body) {
  const m = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(body);
  return m ? pureText(m[1]) : '';
}

function titleFromBody(body) {
  const span = findTitleSpan(body);
  if (!span) return '';
  return pureText(span.text);
}

function stripTitleSuffix(title) {
  return String(title || '').replace(/\s*\|\s*XiaAo\s*$/i, '').trim();
}

function normalizeDate(value) {
  const m = /^(\d{4}-\d{2}-\d{2})/.exec(String(value || '').trim());
  return m ? m[1] : '';
}

async function discoverCandidates(root) {
  const entries = await fs.readdir(root, { withFileTypes: true });
  const ids = [];
  for (const entry of entries) {
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      if (entry.name.startsWith('_') || /-template\.html$/i.test(entry.name)) continue;
      ids.push(entry.name);
    }
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name.startsWith('.') || name.startsWith('_') || SKIP_DIRS.has(name)) continue;
    const index = path.join(root, name, 'index.html');
    if (!(await fileExists(index))) continue;
    try {
      const raw = await fs.readFile(index, 'utf8');
      const { data } = splitFrontmatter(raw);
      if (String(data.kind || '').toLowerCase() === 'book') {
        ids.push(`${name}/index.html`);
      }
    } catch {
      // 无法读取就跳过
    }
  }
  return ids;
}

function fallbackMeta(id, isCover) {
  if (isCover) {
    return {
      label: path.posix.basename(path.posix.dirname(id)) || id,
      icon: 'book',
      group: '书籍封面',
      order: 100,
    };
  }
  if (id === 'index.html') return { label: '主页', icon: 'home', group: '页面', order: 10 };
  if (id === 'courses.html') return { label: '课程笔记', icon: 'book', group: '页面', order: 20 };
  if (id === 'misc.html') return { label: '杂记', icon: 'note', group: '页面', order: 30 };
  if (id === 'hobbies.html') return { label: '兴趣爱好', icon: 'heart', group: '兴趣爱好', order: 10 };
  if (id.startsWith('hobby-')) {
    return { label: id.replace(/^hobby-|\.html$/g, ''), icon: 'spark', group: '兴趣爱好', order: 50 };
  }
  return { label: id.replace(/\.html$/i, ''), icon: 'file', group: '其它页面', order: 100 };
}

/**
 * @returns {Promise<Array>} 按侧栏分组排好序的页面列表
 */
export async function listPages(root) {
  const config = await readConfig();
  const groups = Array.isArray(config.groups) && config.groups.length ? config.groups : DEFAULT_GROUPS;
  const ids = await discoverCandidates(root);
  const pages = [];

  for (const id of ids) {
    let raw = '';
    try {
      raw = await fs.readFile(path.join(root, ...id.split('/')), 'utf8');
    } catch {
      continue;
    }
    const { data, body } = splitFrontmatter(raw);
    const isCover = String(data.kind || '').toLowerCase() === 'book';
    const type = isCover ? 'cover' : 'page';
    const fallback = fallbackMeta(id, isCover);
    const configured = config.pageMeta?.[id] || {};
    let label = String(configured.label || '').trim();
    if (!label) {
      label = isCover ? String(data.title || '').trim() : (firstHeading(body) || stripTitleSuffix(titleFromBody(body)));
    }
    if (!label) label = fallback.label;

    const group = String(configured.group || fallback.group);
    const icon = String(configured.icon || fallback.icon);
    const order = Number(configured.order ?? fallback.order) || 100;
    const hasEntries = /class\s*=\s*"[^"]*\bentries\b/i.test(body);
    const hasPhotoWall = /class\s*=\s*"[^"]*\bphoto-wall\b/i.test(body);
    const hasSidebar = /class\s*=\s*"[^"]*\bsidebar\b/i.test(body);

    pages.push({
      id,
      type,
      label,
      icon,
      group,
      order,
      form: String(configured.form || ''),
      path: id,
      can: {
        addEntry: hasEntries,
        addPhoto: hasPhotoWall,
        addLocation: hasPhotoWall,
        addBlock: true,
        syncSidebar: !isCover && hasSidebar,
        coverTitle: isCover,
      },
    });
  }

  pages.sort((a, b) => {
    const ga = groups.indexOf(a.group);
    const gb = groups.indexOf(b.group);
    const igA = ga === -1 ? groups.length + (a.group === '其它页面' ? 1 : 0) : ga;
    const igB = gb === -1 ? groups.length + (b.group === '其它页面' ? 1 : 0) : gb;
    if (igA !== igB) return igA - igB;
    if (a.order !== b.order) return a.order - b.order;
    return a.label.localeCompare(b.label, 'zh-Hans-CN');
  });

  return { pages, config: { siteUrl: config.siteUrl || '', siteName: config.siteName || '', projectLabel: config.projectLabel || '' } };
}

export async function isValidPageId(root, id) {
  if (typeof id !== 'string' || !id || id.includes('\\') || id.startsWith('/') ||
      id.split('/').some((part) => part === '..' || part === '.' || part === '')) {
    return false;
  }
  const { pages } = await listPages(root);
  return pages.some((p) => p.id === id);
}

function descendantRecords(registry, record, tagName = '') {
  const set = new Set(allDescendantEids(registry, record, false));
  return registry.elements.filter((item) =>
    set.has(item.eid) && (!tagName || item.tag === tagName.toUpperCase()));
}

function photoGroups(registry) {
  const groups = [];
  const claimed = new Set();
  for (const record of registry.elements) {
    if (record.tag !== 'H2') continue;
    const next = findNextElementSibling(registry, record);
    if (!next || !next.classesLower.includes('photo-wall')) continue;
    claimed.add(next.eid);
    groups.push({
      title: pureText(record.innerSource),
      h2Eid: record.eid,
      wallEid: next.eid,
      photos: photosInWall(registry, next),
    });
  }
  for (const wall of registry.elements) {
    if (!wall.classesLower.includes('photo-wall') || claimed.has(wall.eid)) continue;
    groups.push({
      title: '未命名照片墙',
      h2Eid: null,
      wallEid: wall.eid,
      photos: photosInWall(registry, wall),
    });
  }
  return groups;
}

function photosInWall(registry, wall) {
  return descendantRecords(registry, wall, 'FIGURE').map((figure) => {
    const inner = descendantRecords(registry, figure);
    const img = inner.find((r) => r.tag === 'IMG');
    const caption = inner.find((r) => r.tag === 'FIGCAPTION');
    return {
      eid: figure.eid,
      src: img?.attrs?.src || '',
      alt: img?.attrs?.alt || '',
      width: img?.attrs?.width || '',
      height: img?.attrs?.height || '',
      caption: caption ? pureText(caption.innerSource) : '',
    };
  });
}

function entryCards(registry) {
  return registry.elements
    .filter((record) => record.classesLower.includes('entry'))
    .map((record) => {
      const title = findDescendantClass(registry, record, 't');
      const desc = findDescendantClass(registry, record, 'd');
      return {
        eid: record.eid,
        href: record.attrs.href || '',
        newTab: record.attrs.target === '_blank',
        title: title ? pureText(title.innerSource) : '',
        desc: desc ? pureText(desc.innerSource) : '',
      };
    });
}

function buildMeta(type, body, data, registry) {
  const footer = registry.elements.find((r) => r.tag === 'FOOTER');
  const aside = findClass(registry, 'sidebar');
  const entries = registry.elements.filter((r) => r.classesLower.includes('entry')).length;
  const locations = photoGroups(registry);
  const photos = locations.reduce((sum, group) => sum + (group.photos?.length || 0), 0);
  const cards = entryCards(registry);
  const docTitle = type === 'cover'
    ? (String(data.title || '').trim() ? `${String(data.title).trim()} | XiaAo` : '')
    : stripTitleSuffix(titleFromBody(body));
  return {
    docTitle,
    footerEid: footer?.eid || null,
    footerText: footer ? pureText(footer.innerSource) : '',
    coverTitle: type === 'cover' ? String(data.title || '').trim() : '',
    coverDate: type === 'cover' ? normalizeDate(data.date) : '',
    entries,
    photos,
    entryCards: cards,
    photoLocations: locations,
    sidebarEid: aside?.eid || null,
    can: {
      addEntry: Boolean(findClass(registry, 'entries')),
      addPhoto: Boolean(findClass(registry, 'photo-wall')),
      addLocation: Boolean(findClass(registry, 'photo-wall')) && type === 'page',
      addBlock: true,
      syncSidebar: type === 'page' && Boolean(aside),
      coverTitle: type === 'cover',
      footerDate: true,
    },
  };
}

export async function readPage(root, id) {
  if (!(await isValidPageId(root, id))) throw new Error('页面不存在或未在编辑器登记');
  const file = path.join(root, ...id.split('/'));
  const raw = await fs.readFile(file, 'utf8');
  const stat = await fs.stat(file);
  const { prefix, body, data } = splitFrontmatter(raw);
  const type = String(data.kind || '').toLowerCase() === 'book' ? 'cover' : 'page';
  const registry = buildRegistry(body, type === 'cover' ? 'cover' : 'page');
  const meta = buildMeta(type, body, data, registry);
  return {
    id,
    type,
    file,
    raw,
    prefix,
    body,
    data,
    registry,
    hash: sha1(raw),
    mtime: stat.mtimeMs,
    size: Buffer.byteLength(raw, 'utf8'),
    meta,
  };
}

export { sha1, pureText, decodeHtml, readConfig };
