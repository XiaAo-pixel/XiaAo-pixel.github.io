/**
 * 编辑操作：在源码级完成内容修改。
 * 每个操作只应作用于用户当前选中的元素，其余字节原样保留。
 */
import {
  applyEdits,
  buildAttrEdits,
  childRecords,
  escapeAttr,
  escapeHtml,
  findClass,
  findDescendantClass,
  findNextElementSibling,
  getRecord,
  indentSnippet,
  insertAfterElement,
  insertInsideEnd,
  lineStartAt,
  removeElement,
  sanitizeInlineHtml,
  setDocumentTitle,
  setFrontmatterValue,
  siblingRecord,
  swapWithSibling,
  allDescendantEids,
} from './html.mjs';

function plainText(value, max = 5000) {
  return String(value ?? '').replace(/\r\n?/g, '\n').replace(/[\t ]+/g, ' ').trim().slice(0, max);
}

function compactText(value, max = 5000) {
  return plainText(value, max).replace(/\n+/g, ' ');
}

function entityDecode(text) {
  return String(text ?? '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&ensp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(Number.parseInt(n, 16)));
}

function innerPlainText(record) {
  return entityDecode(String(record.innerSource || '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function normalizeHref(value) {
  let href = String(value ?? '').trim();
  if (!href) href = '#';
  if (/^(?:javascript|data|vbscript):/i.test(href)) {
    throw new Error('不支持 javascript: / data: 链接');
  }
  if (/[\s"<>]/.test(href)) throw new Error('链接里不能包含空格或引号');
  if (!/^(?:https?:|mailto:|tel:|#|\/|\.{1,2}\/|[A-Za-z0-9_@~%+-])/i.test(href)) {
    throw new Error('链接格式无法识别');
  }
  return href;
}

function dateValue(value) {
  const text = String(value ?? '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text) || Number.isNaN(Date.parse(text))) {
    throw new Error('日期格式应为 YYYY-MM-DD');
  }
  return text;
}

function clampInt(value, min, max, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function sized(caption, alt) {
  return { caption: compactText(caption, 300), alt: compactText(alt, 300) };
}

function findPhotoRows(registry, wall) {
  const set = new Set(allDescendantEids(registry, wall, false));
  return registry.elements.filter((r) => set.has(r.eid) && r.classesLower.includes('photo-row'));
}

function figureData(data) {
  const src = String(data.src || '').trim().replace(/^\/+/, '');
  if (!/^assets\/photos\/[A-Za-z0-9._-]+$/.test(src)) {
    throw new Error('照片路径无效');
  }
  const width = clampInt(data.width, 1, 20000, 1280);
  const height = clampInt(data.height, 1, 20000, 960);
  const { caption, alt } = sized(data.caption, data.alt);
  return { src, width, height, caption, alt: alt || caption };
}

function figureSnippet(photo) {
  return [
    '<figure>',
    `  <img src="${escapeAttr(photo.src)}" width="${photo.width}" height="${photo.height}" alt="${escapeAttr(photo.alt)}" loading="lazy" decoding="async">`,
    `  <figcaption>${escapeHtml(photo.caption)}</figcaption>`,
    '</figure>',
  ].join('\n');
}

function entrySnippet(data) {
  const title = compactText(data.title, 200) || '新卡片';
  const desc = compactText(data.desc, 1200);
  const href = normalizeHref(data.href);
  const newTab = Boolean(data.newTab);
  const target = newTab ? ' target="_blank" rel="noopener"' : '';
  return [
    `<a class="entry" href="${escapeAttr(href)}"${target}>`,
    `  <div class="t">${escapeHtml(title)}</div>`,
    `  <div class="d">${escapeHtml(desc)}</div>`,
    '</a>',
  ].join('\n');
}

function stripBookIcon(title) {
  return String(title || '').replace(/^\s*📖\uFE0F?\s*/u, '').trim();
}

function bookFields(data) {
  const title = compactText(stripBookIcon(data.title), 120);
  const author = compactText(data.author, 80);
  const review = compactText(data.review, 1200);
  const href = normalizeHref(data.href);
  const newTab = data.newTab === undefined ? true : Boolean(data.newTab);
  if (!title) throw new Error('书名不能为空');
  if (!author) throw new Error('作者不能为空');
  return { title, author, review, href, newTab };
}

function bookTitleText(book) {
  return `📖 ${book.title}`;
}

function bookDescription(book) {
  return book.review ? `${book.author} · ${book.review}` : book.author;
}

function bookSnippet(book) {
  const target = book.newTab ? ' target="_blank" rel="noopener"' : '';
  return [
    `<a class="entry" href="${escapeAttr(book.href)}"${target}>`,
    `  <div class="t">${escapeHtml(bookTitleText(book))}</div>`,
    `  <div class="d">${escapeHtml(bookDescription(book))}</div>`,
    '</a>',
  ].join('\n');
}

function insertBlockInFullPage(body, registry, snippet) {
  const footer = registry.elements.find((r) => r.tag === 'FOOTER');
  if (footer) {
    const start = lineStartAt(body, footer.startOffset);
    const prefix = body.slice(start, footer.startOffset);
    if (/^[ \t]*$/.test(prefix)) {
      return body.slice(0, start) + prefix + indentSnippet(snippet, prefix) +
        '\n\n' + body.slice(start);
    }
  }
  const content = findClass(registry, 'content');
  if (content) return insertInsideEnd(body, registry, content, snippet);
  return body.trimEnd() + '\n' + snippet + '\n';
}

function insertBlockInCover(body, registry, snippet) {
  const tocHeading = registry.elements.find((r) =>
    r.tag === 'H2' && innerPlainText(r).includes('章节目录'));
  if (tocHeading) {
    const start = lineStartAt(body, tocHeading.startOffset);
    const prefix = body.slice(start, tocHeading.startOffset);
    if (/^[ \t]*$/.test(prefix)) {
      return body.slice(0, start) + prefix + indentSnippet(snippet, prefix) +
        '\n\n' + body.slice(start);
    }
  }
  return body.trimEnd() + '\n\n' + snippet + '\n';
}

function resolveEntry(registry, record) {
  let current = record;
  while (current) {
    if (current.tag === 'A' && current.classesLower.includes('entry')) return current;
    current = current.parentEid ? getRecord(registry, current.parentEid) : null;
  }
  throw new Error('请选择一张入口卡片');
}

function resolveFigure(registry, record) {
  let current = record;
  while (current) {
    if (current.tag === 'FIGURE') return current;
    current = current.parentEid ? getRecord(registry, current.parentEid) : null;
  }
  throw new Error('请选择一张照片');
}

function requireRecord(registry, eid) {
  const record = getRecord(registry, eid);
  if (!record) throw new Error('页面结构已经变化，请刷新预览后再试');
  return record;
}

function rejectGenerated(record) {
  if (record.readOnly) throw new Error('这是脚本自动生成的内容，不能在这里直接编辑');
}

/**
 * @param {{type:string, body:string, prefix:string, registry:object}} page
 * @param {object} op
 * @returns {{body:string, prefix:string}}
 */
export function applyOperation(page, op) {
  const body = page.body;
  const registry = page.registry;
  const type = page.type;
  if (!op || typeof op !== 'object') throw new Error('缺少编辑操作');
  const action = String(op.type || '');
  let next = body;
  let prefix = page.prefix;

  switch (action) {
    case 'setContent': {
      const record = requireRecord(registry, op.eid);
      rejectGenerated(record);
      if (!record.textEditable) throw new Error('这个区域不能作为文字直接编辑');
      if (!record.endTag) throw new Error('该元素没有结束标签');
      const html = sanitizeInlineHtml(op.html);
      next = body.slice(0, record.innerStart) + html + body.slice(record.innerEnd);
      break;
    }

    case 'setText': {
      const record = requireRecord(registry, op.eid);
      rejectGenerated(record);
      if (!record.endTag) throw new Error('该元素没有结束标签');
      const text = escapeHtml(compactText(op.text, 5000));
      next = body.slice(0, record.innerStart) + text + body.slice(record.innerEnd);
      break;
    }

    case 'addBook': {
      const container = findClass(registry, 'entries');
      if (!container) throw new Error('这个页面没有可添加小说的书单区域');
      rejectGenerated(container);
      next = insertInsideEnd(body, registry, container, bookSnippet(bookFields(op.data || {})));
      break;
    }

    case 'setBook': {
      const record = resolveEntry(registry, requireRecord(registry, op.eid));
      rejectGenerated(record);
      const book = bookFields(op);
      const titleEl = findDescendantClass(registry, record, 't');
      const descEl = findDescendantClass(registry, record, 'd');
      if (!titleEl || !descEl) throw new Error('这张小说卡片的内部结构不完整');
      const attrs = { href: book.href };
      if (book.newTab) {
        attrs.target = '_blank';
        attrs.rel = 'noopener';
      } else {
        attrs.target = null;
        if (String(record.attrs.rel || '').trim() === 'noopener') attrs.rel = null;
      }
      const edits = buildAttrEdits(body, record, attrs);
      edits.push({
        start: titleEl.innerStart,
        end: titleEl.innerEnd,
        text: escapeHtml(bookTitleText(book)),
      });
      edits.push({
        start: descEl.innerStart,
        end: descEl.innerEnd,
        text: escapeHtml(bookDescription(book)),
      });
      next = applyEdits(body, edits);
      break;
    }

    case 'setEntry': {
      const record = resolveEntry(registry, requireRecord(registry, op.eid));
      rejectGenerated(record);
      const titleEl = findDescendantClass(registry, record, 't');
      const descEl = findDescendantClass(registry, record, 'd');
      if (!titleEl || !descEl) throw new Error('这张卡片的内部结构不完整');
      const href = normalizeHref(op.href);
      const attrs = { href };
      if (op.newTab) {
        attrs.target = '_blank';
        attrs.rel = 'noopener';
      } else {
        attrs.target = null;
      }
      const edits = buildAttrEdits(body, record, attrs);
      edits.push({
        start: titleEl.innerStart,
        end: titleEl.innerEnd,
        text: escapeHtml(compactText(op.title, 200) || '新卡片'),
      });
      edits.push({
        start: descEl.innerStart,
        end: descEl.innerEnd,
        text: escapeHtml(compactText(op.desc, 1200)),
      });
      next = applyEdits(body, edits);
      break;
    }

    case 'setFigure': {
      const record = resolveFigure(registry, requireRecord(registry, op.eid));
      rejectGenerated(record);
      const img = findDescendantClass(registry, record, 'photo') ||
        registry.elements.find((r) => r.tag === 'IMG' &&
          allDescendantEids(registry, record, false).includes(r.eid));
      const cap = findDescendantClass(registry, record, 'photo-caption') ||
        registry.elements.find((r) => r.tag === 'FIGCAPTION' &&
          allDescendantEids(registry, record, false).includes(r.eid));
      if (!img || !cap) throw new Error('这张照片的结构不完整');
      const edits = [];
      const attrs = {};
      if (Object.hasOwn(op, 'src')) {
        const src = String(op.src || '').trim().replace(/^\/+/, '');
        if (!/^(?:assets|statistics|optimization)\/[A-Za-z0-9._/-]+$/.test(src) ||
            src.includes('..')) {
          throw new Error('图片路径无效');
        }
        attrs.src = src;
      }
      if (Object.hasOwn(op, 'alt')) attrs.alt = compactText(op.alt, 300);
      if (Object.hasOwn(op, 'width')) attrs.width = String(clampInt(op.width, 1, 20000, 1280));
      if (Object.hasOwn(op, 'height')) attrs.height = String(clampInt(op.height, 1, 20000, 960));
      if (Object.hasOwn(op, 'loading')) attrs.loading = op.loading ? 'lazy' : null;
      if (Object.hasOwn(op, 'decoding')) attrs.decoding = op.decoding ? 'async' : null;
      edits.push(...buildAttrEdits(body, img, attrs));
      if (Object.hasOwn(op, 'caption')) {
        edits.push({
          start: cap.innerStart,
          end: cap.innerEnd,
          text: escapeHtml(compactText(op.caption, 300)),
        });
      }
      next = applyEdits(body, edits);
      break;
    }

    case 'setAttrs': {
      const record = requireRecord(registry, op.eid);
      rejectGenerated(record);
      const attrs = op.attrs && typeof op.attrs === 'object' ? op.attrs : {};
      next = applyEdits(body, buildAttrEdits(body, record, attrs));
      break;
    }

    case 'setDocTitle': {
      if (type === 'cover') throw new Error('书封面标题请使用「书名」字段');
      const title = compactText(op.title, 200);
      if (!title) throw new Error('页面标题不能为空');
      next = setDocumentTitle(body, title);
      break;
    }

    case 'setCoverTitle': {
      if (type !== 'cover') throw new Error('只有书封面支持书名编辑');
      const title = compactText(op.title, 120);
      if (!title) throw new Error('书名不能为空');
      prefix = setFrontmatterValue(prefix, 'title', title);
      break;
    }

    case 'setFooterDate': {
      const date = dateValue(op.date);
      if (type === 'cover') {
        prefix = setFrontmatterValue(prefix, 'date', date);
      } else {
        const footer = registry.elements.find((r) => r.tag === 'FOOTER');
        if (!footer || !footer.endTag) throw new Error('这个页面没有页脚');
        next = body.slice(0, footer.innerStart) + `最后更新：${escapeHtml(date)}` +
          body.slice(footer.innerEnd);
      }
      break;
    }

    case 'addEntry': {
      const container = findClass(registry, 'entries');
      if (!container) throw new Error('这个页面没有可添加卡片的入口区域');
      rejectGenerated(container);
      const snippet = entrySnippet(op.data || {});
      next = insertInsideEnd(body, registry, container, snippet);
      break;
    }

    case 'addPhoto': {
      const wall = requireRecord(registry, op.wallEid);
      if (!wall.classesLower.includes('photo-wall')) throw new Error('请选择一个照片分组');
      rejectGenerated(wall);
      const photo = figureData(op.data || {});
      const rows = findPhotoRows(registry, wall);
      if (rows.length) {
        next = insertInsideEnd(body, registry, rows[rows.length - 1], figureSnippet(photo));
      } else {
        const rowSnippet = [
          '<div class="photo-row">',
          `  ${indentSnippet(figureSnippet(photo), '  ')}`,
          '</div>',
        ].join('\n');
        next = insertInsideEnd(body, registry, wall, rowSnippet);
      }
      break;
    }

    case 'addLocation': {
      if (type !== 'page') throw new Error('只有卡片页支持照片分组');
      const title = compactText(op.data?.title, 120);
      if (!title) throw new Error('分组标题不能为空');
      const walls = registry.elements.filter((r) => r.classesLower.includes('photo-wall'));
      const snippet = [
        `<h2>${escapeHtml(title)}</h2>`,
        '<div class="photo-wall">',
        '  <div class="photo-row">',
        '  </div>',
        '</div>',
      ].join('\n');
      if (walls.length) {
        next = insertAfterElement(body, walls[walls.length - 1], snippet);
      } else {
        const footer = registry.elements.find((r) => r.tag === 'FOOTER');
        if (footer) {
          const start = lineStartAt(body, footer.startOffset);
          const indent = body.slice(start, footer.startOffset);
          if (/^[ \t]*$/.test(indent)) {
            next = body.slice(0, start) + indent + indentSnippet(snippet, indent) +
              '\n\n' + body.slice(start);
          } else {
            throw new Error('找不到可插入照片分组的位置');
          }
        } else {
          next = body.trimEnd() + '\n\n' + snippet + '\n';
        }
      }
      break;
    }

    case 'addBlock': {
      const kind = op.kind === 'h2' ? 'h2' : 'p';
      const text = plainText(op.text, 3000);
      if (!text) throw new Error('内容不能为空');
      const snippet = `<${kind}>${escapeHtml(text).replaceAll('\n', '<br>')}</${kind}>`;
      next = type === 'cover'
        ? insertBlockInCover(body, registry, snippet)
        : insertBlockInFullPage(body, registry, snippet);
      break;
    }

    case 'deleteElement': {
      const record = requireRecord(registry, op.eid);
      rejectGenerated(record);
      const isEntry = record.tag === 'A' && record.classesLower.includes('entry');
      const isFigure = record.tag === 'FIGURE';
      const isBlock = ['H2', 'H3', 'H4', 'P'].includes(record.tag);
      if (!isEntry && !isFigure && !isBlock) {
        throw new Error('为了站点结构安全，这个元素只能去「源码」里删除');
      }
      if (record.tag === 'H2') {
        const sibling = findNextElementSibling(registry, record);
        if (sibling && sibling.classesLower.includes('photo-wall')) {
          throw new Error('这是一个照片分组标题，请选中下方的照片墙来删除整组');
        }
      }
      next = removeElement(body, record);
      break;
    }

    case 'moveElement': {
      const record = requireRecord(registry, op.eid);
      rejectGenerated(record);
      const direction = op.direction === 'up' ? -1 : op.direction === 'down' ? 1 : 0;
      if (!direction) throw new Error('移动方向无效');
      const isEntry = record.tag === 'A' && record.classesLower.includes('entry');
      const isFigure = record.tag === 'FIGURE';
      const isBlock = ['H2', 'H3', 'H4', 'P'].includes(record.tag);
      if (!isEntry && !isFigure && !isBlock) throw new Error('这个元素不能移动');
      const sibling = siblingRecord(registry, record, direction);
      if (!sibling) throw new Error(direction < 0 ? '已经是第一个了' : '已经是最后一个了');
      if (isEntry && !(sibling.tag === 'A' && sibling.classesLower.includes('entry'))) {
        throw new Error('相邻的元素不是同类型卡片，不能移动');
      }
      if (isFigure && sibling.tag !== 'FIGURE') {
        throw new Error('相邻的元素不是同类型照片，不能移动');
      }
      if (isBlock && sibling.tag !== record.tag) {
        throw new Error('相邻的元素类型不同，不能移动');
      }
      next = swapWithSibling(body, registry, record, direction);
      break;
    }

    case 'deletePhotoGroup': {
      if (type !== 'page') throw new Error('只有卡片页支持照片分组');
      const wall = requireRecord(registry, op.eid);
      if (!wall.classesLower.includes('photo-wall')) throw new Error('请选择一个照片分组');
      rejectGenerated(wall);
      const prev = siblingRecord(registry, wall, -1);
      const startRecord = prev && prev.tag === 'H2' ? prev : wall;
      const start = lineStartAt(body, startRecord.startOffset);
      if (!/^[ \t]*$/.test(body.slice(start, startRecord.startOffset))) {
        throw new Error('照片分组不在独立行上，无法删除');
      }
      let end = wall.endOffset;
      const nl = body.indexOf('\n', end);
      if (nl !== -1 && /^[ \t\r]*$/.test(body.slice(end, nl))) end = nl + 1;
      // 顺带吞掉分组之间的空行
      while (body[end] === '\n') end++;
      next = body.slice(0, start) + body.slice(end);
      break;
    }

    default:
      throw new Error(`未知的编辑操作：${action}`);
  }

  return { body: next, prefix };
}
