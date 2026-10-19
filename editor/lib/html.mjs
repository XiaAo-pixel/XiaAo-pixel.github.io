/**
 * 源码级 HTML 工具。
 *
 * 编辑器不重新序列化整页 HTML：用 parse5 取得每个元素的源码区间，
 * 只在用户真正修改的文本 / 属性 / 元素上做最小替换。
 * 这样 Liquid、注释、缩进、空行以及没有编辑到的内容都能原样保留。
 */
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const parse5 = require('../vendor/parse5');

const VOID_TAGS = new Set([
  'AREA', 'BASE', 'BR', 'COL', 'EMBED', 'HR', 'IMG', 'INPUT',
  'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR',
]);

const SKIP_MARKERS = new Set([
  'SCRIPT', 'STYLE', 'TEMPLATE', 'NOSCRIPT', 'LINK', 'META', 'TITLE',
]);

const STRUCTURAL_CLASSES = new Set([
  'page', 'page-note', 'sidebar', 'brand', 'nav', 'nav-group', 'subnav',
  'content', 'entries', 'entry', 'photo-wall', 'photo-row', 'figure',
  'postlist', 'note-bar', 'pager', 'lightbox', 'lb-body', 'lb-btn', 'book-toc',
]);

const TEXT_TAGS = new Set([
  'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'LI', 'FIGCAPTION',
  'BLOCKQUOTE', 'FOOTER', 'CITE', 'STRONG', 'EM', 'TD', 'TH', 'ADDRESS',
]);

const BLOCKISH = new Set([
  'P', 'DIV', 'SECTION', 'ARTICLE', 'HEADER', 'FOOTER', 'LI', 'UL', 'OL',
  'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE', 'PRE', 'TABLE', 'TR',
]);

const SAFE_URL_RE = /^(?:https?:|mailto:|tel:|#|\/|\.{1,2}\/|[a-zA-Z0-9_@][^:\s]*$)/i;

/* ------------------------------------------------------------------ */
/* 转义与清洗                                                          */
/* ------------------------------------------------------------------ */

export function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function escapeAttr(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

/** 防止正文里的 {{ / {% 被 Jekyll 当成 Liquid。 */
export function neutralizeLiquid(html) {
  return String(html)
    .replaceAll('{{', '&#123;&#123;')
    .replaceAll('{%', '&#123;%');
}

function safeUrl(value) {
  const v = String(value ?? '').trim();
  if (!v) return '';
  if (/^javascript:/i.test(v) || /^data:/i.test(v) || /^vbscript:/i.test(v)) return '';
  return SAFE_URL_RE.test(v) ? v : '';
}

/**
 * 富文本字段只允许常见行内标签。解析、过滤、重新拼出 HTML，
 * 避免把 contenteditable 产生的临时属性写进源文件。
 */
export function sanitizeInlineHtml(input) {
  const html = String(input ?? '');
  if (!html.trim()) return '';
  const fragment = parse5.parseFragment(html);
  let out = '';

  const render = (node, state) => {
    if (node.nodeName === '#text') {
      out += escapeHtml(node.value);
      return;
    }
    if (node.nodeName === '#comment' || node.nodeName === '#documentType') return;
    if (!node.tagName) {
      for (const child of node.childNodes || []) render(child, state);
      return;
    }
    const tag = node.tagName.toUpperCase();
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'IFRAME' || tag === 'OBJECT' ||
        tag === 'EMBED' || tag === 'SVG' || tag === 'MATH' || tag === 'IMG' || tag === 'VIDEO' ||
        tag === 'AUDIO' || tag === 'FORM' || tag === 'INPUT' || tag === 'BUTTON') {
      return;
    }

    const allowed = ['A', 'STRONG', 'B', 'EM', 'I', 'U', 'S', 'DEL', 'CODE', 'BR',
      'SPAN', 'CITE', 'SUP', 'SUB', 'MARK'];
    if (!allowed.includes(tag)) {
      if (BLOCKISH.has(tag) && out && !out.endsWith('<br>')) out += '<br>';
      for (const child of node.childNodes || []) render(child, state);
      return;
    }

    if (tag === 'BR') {
      out += '<br>';
      return;
    }

    let attrs = '';
    if (tag === 'A') {
      const attrsMap = Object.fromEntries((node.attrs || []).map((a) => [a.name.toLowerCase(), a.value]));
      const href = safeUrl(attrsMap.href);
      if (href) attrs += ` href="${escapeAttr(href)}"`;
      if (attrsMap.title) attrs += ` title="${escapeAttr(attrsMap.title)}"`;
      if (attrsMap.target === '_blank') {
        attrs += ' target="_blank" rel="noopener"';
      }
    }
    const tagName = tag.toLowerCase();
    out += `<${tagName}${attrs}>`;
    for (const child of node.childNodes || []) render(child, state);
    out += `</${tagName}>`;
  };

  for (const node of fragment.childNodes || []) render(node, {});
  return neutralizeLiquid(out.trim());
}

/* ------------------------------------------------------------------ */
/* Frontmatter                                                         */
/* ------------------------------------------------------------------ */

export function parseYamlSimple(text) {
  const data = {};
  for (const line of String(text || '').split(/\r?\n/)) {
    const m = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (!m) continue;
    let value = m[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      try {
        value = value.startsWith('"') ? JSON.parse(value) : value.slice(1, -1).replaceAll("''", "'");
      } catch {
        value = value.slice(1, -1);
      }
    }
    data[m[1]] = value;
  }
  return data;
}

export function splitFrontmatter(raw) {
  let text = String(raw ?? '');
  let bom = '';
  if (text.charCodeAt(0) === 0xfeff) {
    bom = '\ufeff';
    text = text.slice(1);
  }
  const m = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
  if (!m) {
    return { bom, prefix: bom, frontmatter: '', data: {}, body: text };
  }
  const prefix = bom + m[0];
  return {
    bom,
    prefix,
    frontmatter: m[0],
    data: parseYamlSimple(m[1]),
    body: text.slice(m[0].length),
  };
}

export function setFrontmatterValue(prefix, key, value) {
  const hasBom = prefix.startsWith('\ufeff');
  const text = hasBom ? prefix.slice(1) : prefix;
  const m = /^(---\r?\n)([\s\S]*?)(\r?\n---(?:\r?\n|$))/.exec(text);
  if (!m) throw new Error('这个文件没有 frontmatter，无法写入页面属性');
  const nl = text.includes('\r\n') ? '\r\n' : '\n';
  const yaml = m[2];
  const lineRe = new RegExp(`^(${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:[ \\t]*)(.*)$`, 'm');
  const formatted = JSON.stringify(String(value ?? ''));
  let nextYaml;
  if (lineRe.test(yaml)) {
    nextYaml = yaml.replace(lineRe, (_line, head) => `${head}${formatted}`);
  } else {
    nextYaml = yaml ? `${yaml}${nl}${key}: ${formatted}` : `${key}: ${formatted}`;
  }
  return (hasBom ? '\ufeff' : '') + m[1] + nextYaml + m[3];
}

/* ------------------------------------------------------------------ */
/* 源码解析                                                            */
/* ------------------------------------------------------------------ */

function attrMap(node) {
  return Object.fromEntries((node.attrs || []).map((a) => [a.name.toLowerCase(), a.value]));
}

export function buildRegistry(body, mode = 'page') {
  let root;
  if (mode === 'page') {
    const doc = parse5.parse(body, { sourceCodeLocationInfo: true });
    root = findElement(doc, 'body');
    if (!root) root = doc;
  } else {
    root = parse5.parseFragment(body, { sourceCodeLocationInfo: true });
  }

  const elements = [];
  const byEid = new Map();

  const walk = (parentNode, parentEid) => {
    let index = 0;
    for (const child of parentNode.childNodes || []) {
      if (!child.tagName) continue;
      const eid = parentEid ? `${parentEid}.${index}` : String(index);
      const loc = child.sourceCodeLocation || {};
      const attrs = attrMap(child);
      const classes = (attrs.class || '').split(/\s+/).filter(Boolean);
      const classesLower = classes.map((c) => c.toLowerCase());
      const tag = child.tagName.toUpperCase();
      const innerStart = loc.startTag ? loc.startTag.endOffset : loc.startOffset;
      const innerEnd = loc.endTag ? loc.endTag.startOffset : loc.endOffset;
      const innerSource = Number.isFinite(innerStart) && Number.isFinite(innerEnd)
        ? body.slice(innerStart, innerEnd) : '';
      const attrsSource = (child.attrs || []).map((a) => a.value).join(' ');
      const hasLiquid = /{%|{{/.test(innerSource) || /{%|{{/.test(attrsSource);
      const structural = classesLower.some((c) => STRUCTURAL_CLASSES.has(c));
      const isEntryAnchor = tag === 'A' && classesLower.includes('entry');
      const isBrand = tag === 'A' && classesLower.includes('brand');
      const isScreenReader = classesLower.includes('sr');
      const isEditableDiv = tag === 'DIV' && (classesLower.includes('t') || classesLower.includes('d') ||
        classesLower.includes('muted') || classesLower.includes('date'));
      const isEditableSpan = tag === 'SPAN' && (classesLower.includes('name') ||
        classesLower.includes('date') || classesLower.includes('ph'));
      let textEditable = !hasLiquid && !isEntryAnchor && !isBrand && !isScreenReader &&
        (TEXT_TAGS.has(tag) || isEditableDiv || isEditableSpan ||
          (tag === 'A' && !classesLower.includes('entry')));

      if (structural && !['entry'].includes(classesLower[0])) {
        if (!(tag === 'A' && classesLower.includes('entry'))) textEditable = false;
      }
      if (tag === 'A' && classesLower.includes('entry')) textEditable = false;

      const record = {
        eid,
        tag,
        nodeName: child.nodeName,
        attrs,
        classes,
        classesLower,
        startOffset: loc.startOffset,
        endOffset: loc.endOffset,
        startTag: loc.startTag || null,
        endTag: loc.endTag || null,
        innerStart,
        innerEnd,
        innerSource,
        attrsSource,
        hasLiquid,
        readOnly: hasLiquid,
        structural,
        textEditable,
        parentEid: parentEid || null,
        indexInParent: index,
        childEids: [],
      };

      elements.push(record);
      byEid.set(eid, record);

      const before = elements.length;
      walk(child, eid);
      record.childEids = elements.slice(before).filter((r) => r.parentEid === eid).map((r) => r.eid);
      index++;
    }
  };

  walk(root, '');

  // 只把「Liquid 控制结构直接所在的元素」标成自动生成区域；外层容器不连带锁定，
  // 否则首页的 main.content 会因为内部有动态列表而整体不可编辑。
  // 注意区分 {% 控制标签 %} 与 {{ 插值 }}：动态列表容器本身含 {% for %}，
  // 它的 <li> 子元素只含 {{ 插值 }}，所以容器应保持只读，而 main 被解锁。
  for (const record of elements) {
    if (!record.readOnly) continue;
    const childHasControl = record.childEids.some((eid) => {
      const child = byEid.get(eid);
      return child && /{%/.test(child.innerSource);
    });
    if (childHasControl) record.readOnly = false;
  }

  return { mode, root, elements, byEid, body };
}

function findElement(node, tagName) {
  if (!node) return null;
  if (node.tagName && node.tagName.toUpperCase() === tagName.toUpperCase()) return node;
  for (const child of node.childNodes || []) {
    const found = findElement(child, tagName);
    if (found) return found;
  }
  return null;
}

export function getRecord(registry, eid) {
  if (!eid) return null;
  return registry.byEid.get(String(eid)) || null;
}

export function childRecords(registry, record) {
  if (!record) return [];
  return record.childEids.map((eid) => getRecord(registry, eid)).filter(Boolean);
}

export function findClass(registry, className, root = null) {
  const target = className.toLowerCase();
  const scope = root ? new Set(allDescendantEids(registry, root, true)) : null;
  return registry.elements.find((r) => r.classesLower.includes(target) &&
    (!scope || scope.has(r.eid))) || null;
}

export function findClasses(registry, className, root = null) {
  const target = className.toLowerCase();
  const scope = root ? new Set(allDescendantEids(registry, root, true)) : null;
  return registry.elements.filter((r) => r.classesLower.includes(target) &&
    (!scope || scope.has(r.eid)));
}

export function findDescendantClass(registry, record, className) {
  const target = className.toLowerCase();
  const queue = [...(record?.childEids || [])];
  while (queue.length) {
    const current = getRecord(registry, queue.shift());
    if (!current) continue;
    if (current.classesLower.includes(target)) return current;
    queue.push(...current.childEids);
  }
  return null;
}

export function allDescendantEids(registry, record, includeSelf = false) {
  const out = [];
  if (includeSelf && record) out.push(record.eid);
  if (!record) return out;
  const queue = [...record.childEids];
  while (queue.length) {
    const eid = queue.shift();
    out.push(eid);
    const rec = getRecord(registry, eid);
    if (rec) queue.push(...rec.childEids);
  }
  return out;
}

export function siblingRecord(registry, record, direction) {
  if (!record || record.parentEid === null) return null;
  const siblings = registry.elements.filter((r) => r.parentEid === record.parentEid);
  const pos = siblings.findIndex((r) => r.eid === record.eid);
  if (pos < 0) return null;
  return siblings[pos + direction] || null;
}

export function findNextElementSibling(registry, record) {
  return siblingRecord(registry, record, 1);
}

export function findPrevElementSibling(registry, record) {
  return siblingRecord(registry, record, -1);
}

/* ------------------------------------------------------------------ */
/* 源码区间操作                                                        */
/* ------------------------------------------------------------------ */

/** 在开始标签末尾插入一个属性，兼容 ` />` 写法。 */
export function tagInsertOffset(body, endTagOffset) {
  const bracket = endTagOffset - 1;
  let at = bracket - 1;
  while (at >= 0 && /\s/.test(body[at])) at--;
  if (body[at] === '/') return at;
  return bracket;
}

export function applyEdits(source, edits) {
  const prepared = (edits || [])
    .map((edit, index) => ({ ...edit, _index: index }))
    .filter((edit) => edit.start !== edit.end || edit.text)
    .sort((a, b) => b.start - a.start || b.end - a.end || b._index - a._index);
  let out = source;
  let limit = source.length + 1;
  for (const edit of prepared) {
    if (!Number.isInteger(edit.start) || !Number.isInteger(edit.end) ||
        edit.start < 0 || edit.end > source.length || edit.end < edit.start) {
      throw new Error('编辑位置越界，已取消本次保存');
    }
    if (edit.end > limit) throw new Error('编辑区间重叠，已取消本次保存');
    out = out.slice(0, edit.start) + String(edit.text) + out.slice(edit.end);
    limit = edit.start;
  }
  return out;
}

export function buildMarkerEdits(body, registry) {
  const edits = [];
  for (const record of registry.elements) {
    if (!record.startTag || !record.nodeName) continue;
    if (SKIP_MARKERS.has(record.tag)) continue;
    if (Object.hasOwn(record.attrs, 'data-eid')) continue;
    const at = tagInsertOffset(body, record.startTag.endOffset);
    let marker = ` data-eid="${record.eid}"`;
    if (record.readOnly) marker += ' data-eo="1"';
    if (record.textEditable) marker += ' data-editor-text="1"';
    edits.push({ start: at, end: at, text: marker });
  }
  return edits;
}

export function injectMarkers(body, registry) {
  return applyEdits(body, buildMarkerEdits(body, registry));
}

export function lineStartAt(source, pos) {
  const idx = source.lastIndexOf('\n', Math.max(0, pos - 1));
  return idx === -1 ? 0 : idx + 1;
}

export function indentationAt(source, pos) {
  const start = lineStartAt(source, pos);
  const before = source.slice(start, pos);
  return /^[ \t]*$/.test(before) ? before : '';
}

export function indentSnippet(snippet, baseIndent) {
  const lines = String(snippet).split('\n');
  return lines.map((line, i) => (i === 0 || line === '' ? line : baseIndent + line)).join('\n');
}

function ownLinePrefix(source, pos) {
  const start = lineStartAt(source, pos);
  const prefix = source.slice(start, pos);
  return { start, prefix, ownLine: /^[ \t]*$/.test(prefix) };
}

export function insertAfterElement(source, record, snippet) {
  if (!record) throw new Error('找不到要插入的位置');
  const { prefix, ownLine } = ownLinePrefix(source, record.startOffset);
  if (!ownLine) throw new Error('目标元素不在独立行上，无法安全插入');
  const at = record.endOffset;
  return source.slice(0, at) + '\n' + prefix + indentSnippet(snippet, prefix) + source.slice(at);
}

export function insertBeforeElement(source, record, snippet) {
  if (!record) throw new Error('找不到要插入的位置');
  const { start, prefix, ownLine } = ownLinePrefix(source, record.startOffset);
  if (!ownLine) throw new Error('目标元素不在独立行上，无法安全插入');
  return source.slice(0, start) + prefix + indentSnippet(snippet, prefix) + '\n' + source.slice(start);
}

export function insertInsideEnd(source, registry, container, snippet) {
  if (!container) throw new Error('找不到目标容器');
  const children = childRecords(registry, container);
  if (children.length) {
    return insertAfterElement(source, children[children.length - 1], snippet);
  }
  if (!container.endTag) throw new Error('目标容器没有结束标签');
  const closeLineStart = lineStartAt(source, container.endTag.startOffset);
  const closeIndent = source.slice(closeLineStart, container.endTag.startOffset);
  const parentIndent = ownLinePrefix(source, container.startOffset).prefix;
  const indent = /^[ \t]*$/.test(closeIndent) ? closeIndent + '  ' : parentIndent + '  ';
  return source.slice(0, closeLineStart) + indent + indentSnippet(snippet, indent) +
    '\n' + source.slice(closeLineStart);
}

/** 连同整行缩进和行尾换行一起删除；行内元素则只删自身。 */
export function removeElement(source, record) {
  if (!record) throw new Error('找不到要删除的元素');
  const lineStart = lineStartAt(source, record.startOffset);
  const prefix = source.slice(lineStart, record.startOffset);
  const ownLine = /^[ \t]*$/.test(prefix);
  if (!ownLine) {
    return source.slice(0, record.startOffset) + source.slice(record.endOffset);
  }
  let end = record.endOffset;
  const nl = source.indexOf('\n', end);
  if (nl !== -1 && /^[ \t\r]*$/.test(source.slice(end, nl))) end = nl + 1;
  return source.slice(0, lineStart) + source.slice(end);
}

function fullLineChunk(source, record) {
  const start = lineStartAt(source, record.startOffset);
  const prefix = source.slice(start, record.startOffset);
  if (!/^[ \t]*$/.test(prefix)) return null;
  let end = record.endOffset;
  const nl = source.indexOf('\n', end);
  if (nl === -1) end = source.length;
  else if (/^[ \t\r]*$/.test(source.slice(end, nl))) end = nl + 1;
  else return null;
  return { start, end, text: source.slice(start, end) };
}

export function swapWithSibling(source, registry, record, direction) {
  const sibling = siblingRecord(registry, record, direction);
  if (!sibling) throw new Error(direction < 0 ? '已经是第一个了' : '已经是最后一个了');
  const first = record.startOffset < sibling.startOffset ? record : sibling;
  const second = first === record ? sibling : record;
  const a = fullLineChunk(source, first);
  const b = fullLineChunk(source, second);
  if (!a || !b) throw new Error('目标元素不在独立行上，无法移动');
  const middle = source.slice(a.end, b.start);
  if (!/^[ \t\r\n]*$/.test(middle)) throw new Error('两个元素之间存在其它内容，无法安全移动');
  return source.slice(0, a.start) + b.text + middle + a.text + source.slice(b.end);
}

/* ------------------------------------------------------------------ */
/* 属性与页面标题                                                      */
/* ------------------------------------------------------------------ */

export function buildAttrEdits(source, record, attrs) {
  if (!record || !record.startTag) throw new Error('该元素没有可编辑的开始标签');
  const edits = [];
  const attrLocations = record.startTag.attrs || {};
  for (const [rawName, rawValue] of Object.entries(attrs)) {
    const name = String(rawName).toLowerCase();
    if (!/^[a-z0-9_:.-]+$/.test(name)) continue;
    if (name.startsWith('on') || name === 'data-eid' || name.startsWith('data-editor')) continue;
    const value = rawValue === null || rawValue === undefined ? null : String(rawValue);
    const loc = attrLocations[name];
    if (loc) {
      const start = lineStartAt(source, loc.startOffset);
      // 只吞掉同一行、紧邻的前导空格，不跨行。
      let removeStart = loc.startOffset;
      if (removeStart > start && /[ \t]/.test(source[removeStart - 1])) removeStart--;
      edits.push({
        start: removeStart,
        end: loc.endOffset,
        text: value === null ? '' : ` ${name}="${escapeAttr(value)}"`,
      });
    } else if (value !== null) {
      const at = tagInsertOffset(source, record.startTag.endOffset);
      edits.push({ start: at, end: at, text: ` ${name}="${escapeAttr(value)}"` });
    }
  }
  return edits;
}

export function patchAttrs(source, record, attrs) {
  return applyEdits(source, buildAttrEdits(source, record, attrs));
}

export function findTitleSpan(body) {
  const re = /(<title\b[^>]*>)([\s\S]*?)(<\/title>)/i;
  const m = re.exec(body);
  if (!m) return null;
  return {
    start: m.index + m[1].length,
    end: m.index + m[1].length + m[2].length,
    text: m[2],
  };
}

export function setDocumentTitle(body, title) {
  const span = findTitleSpan(body);
  if (!span) throw new Error('找不到页面标题');
  return body.slice(0, span.start) + escapeHtml(title) + body.slice(span.end);
}

export { VOID_TAGS, STRUCTURAL_CLASSES, BLOCKISH };
