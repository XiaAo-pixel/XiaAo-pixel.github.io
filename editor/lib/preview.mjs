/**
 * 生成 iframe 里使用的预览页面：
 * - 给源文件元素打上 data-eid，供点选与精确写回；
 * - 把 Jekyll/Liquid 的动态目录换成根据 notes/ 数据生成的真实内容；
 * - 换成编辑器转换过的 style.css，使深色预览可独立切换。
 */
import path from 'node:path';
import {
  applyEdits,
  buildMarkerEdits,
  escapeAttr,
  escapeHtml,
  indentationAt,
} from './html.mjs';
import { getNotesIndex } from './notes.mjs';
import { readConfig } from './site.mjs';

function stripTags(html) {
  return String(html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function stripLiquid(html) {
  return String(html)
    .replace(/\{%-?\s*comment\s*-?%}[\s\S]*?\{%-?\s*endcomment\s*-?%}/g, '')
    .replace(/\{%[\s\S]*?%\}/g, '')
    .replace(/\{\{[\s\S]*?\}\}/g, '');
}

function recentListRows(notes) {
  return notes.courses.map((course) => {
    const href = escapeAttr(`/${course.course}/`);
    const date = course.date ? `${escapeHtml(course.date)} · ` : '';
    return `<li data-eo="1"><a href="${href}" target="_blank" rel="noopener">${escapeHtml(course.title)}</a><span class="date">${date}${course.count} 节</span></li>`;
  });
}

function coverTocHtml(courseNotes) {
  if (!courseNotes || !courseNotes.chapters.length) {
    return '<p class="muted" data-eo="1">还没有生成章节。先在项目根目录运行 split-notes.ps1，再打开这本书。</p>';
  }
  return courseNotes.chapters.map((chapter) => {
    const first = chapter.sections[0];
    const href = first.permalink || `/${courseNotes.course}/${first.file.replace(/\.md$/i, '.html')}`;
    const items = chapter.sections.map((section) => {
      const sectionHref = section.permalink ||
        `/${courseNotes.course}/${section.file.replace(/\.md$/i, '.html')}`;
      const label = String(section.title || '').split('·').pop().trim() || section.title;
      return `  <li data-eo="1"><a href="${escapeAttr(sectionHref)}">${escapeHtml(label)}</a></li>`;
    }).join('\n');
    return `<h3 data-eo="1">第 ${escapeHtml(chapter.order)} 章　${escapeHtml(chapter.title)}</h3>\n` +
      `<ul class="postlist" data-eo="1">\n${items}\n</ul>`;
  }).join('\n\n');
}

function findCoverTocRange(body, registry) {
  const heading = registry.elements.find((r) => r.tag === 'H2' && stripTags(r.innerSource).includes('章节目录'));
  if (!heading) return null;
  const rest = body.slice(heading.endOffset);
  const tag = rest.indexOf('{%');
  if (tag === -1) return null;
  const endforRe = /\{%\s*endfor\s*%\}/g;
  let last = null;
  let match;
  while ((match = endforRe.exec(rest))) last = match;
  if (!last) return null;
  return {
    start: heading.endOffset + tag,
    end: heading.endOffset + last.index + last[0].length,
  };
}

function decorateFullPage(html, dark) {
  let out = html;
  out = out.replace(
    /href\s*=\s*(["'])(?:\/)?style\.css\1/gi,
    'href="/__editor/site.css"',
  );

  if (/<head\b[^>]*>/i.test(out)) {
    out = out.replace(/<head\b[^>]*>/i, (tag) => `${tag}\n  <base href="/">`);
  }

  if (/<\/head>/i.test(out)) {
    out = out.replace(/<\/head>/i, [
      '  <link rel="stylesheet" href="/__editor/overlay.css">',
      '  <script src="/__editor/bridge.js" defer></script>',
      '</head>',
    ].join('\n'));
  }

  const classes = ['editor-preview'];
  if (dark) classes.push('editor-dark');
  out = out.replace(/<html\b([^>]*)>/i, (tag, attrs) => {
    if (/\bclass\s*=/i.test(attrs)) {
      return `<html${attrs.replace(/\bclass\s*=\s*(["'])(.*?)\1/i,
        (_m, q, value) => `class=${q}${value} ${classes.join(' ')}${q}`)}>`;
    }
    return `<html${attrs} class="${classes.join(' ')}">`;
  });

  return out;
}

function noteSidebar(course, siteName) {
  const chapters = course ? course.chapters : [];
  const chapterLinks = chapters.map((chapter) => {
    const first = chapter.sections[0];
    const href = first.permalink || `/${course.course}/${first.file.replace(/\.md$/i, '.html')}`;
    return `        <a class="book-chapter" href="${escapeAttr(href)}"><span class="sr">第 ${escapeHtml(chapter.order)} 章 </span>${escapeHtml(chapter.title)}</a>`;
  }).join('\n');
  return `  <aside class="sidebar">
    <a class="brand" href="/index.html">
      <img class="avatar" src="/assets/avatar.jpg" alt="头像">
      <span class="name">${escapeHtml(siteName)}</span>
    </a>
    <nav>
      <a class="nav-item" href="/index.html">← 主页</a>
      <a class="note-book" href="/${escapeAttr(course ? course.course : '')}/">${escapeHtml(course ? course.title : '')}</a>
      <div class="subnav book-toc" aria-label="本书目录">
${chapterLinks}
      </div>
    </nav>
  </aside>`;
}

async function composeCoverPage(content, page, notes, dark) {
  const config = await readConfig();
  const courseName = String(page.data.course || path.posix.dirname(page.id)).trim();
  const course = notes.byCourse.get(courseName);
  const title = String(page.data.title || course?.title || courseName).trim();
  const date = String(page.data.date || '').trim();
  const navbarTitle = title;
  const classes = ['editor-preview'];
  if (dark) classes.push('editor-dark');
  const safeTitle = escapeHtml(title);

  return `<!DOCTYPE html>
<html lang="zh-CN" class="${classes.join(' ')}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <base href="/">
  <title>${safeTitle} | XiaAo</title>
  <link rel="stylesheet" href="/__editor/site.css">
  <link rel="stylesheet" href="/__editor/overlay.css">
  <script src="/__editor/bridge.js" defer></script>
</head>
<body class="note-page">
<div class="page page-note">
${noteSidebar(course, config.siteName || 'XiaAo')}

  <main class="content">
    <div class="note-bar">
      <a class="back" href="/${escapeAttr(courseName)}/">← 返回《${safeTitle}》</a>
      <a href="/index.html">主页</a>
    </div>
    <h1>${safeTitle}</h1>
    <p class="muted">${escapeHtml(date)}</p>

${content}

    <footer>最后更新：${escapeHtml(date)}</footer>
  </main>
</div>
</body>
</html>`;
}

/**
 * @param {string} root
 * @param {object} page 由 readPage 返回
 * @param {{dark?:boolean}} options
 */
export async function buildPreviewHtml(root, page, { dark = false } = {}) {
  const notes = await getNotesIndex(root);
  const body = page.body;
  const registry = page.registry;
  const replacements = [];
  const dynamicRanges = [];

  if (page.type === 'page' && page.id === 'index.html') {
    const list = registry.elements.find((r) => r.tag === 'UL' &&
      r.classesLower.includes('postlist') && /{%/.test(r.innerSource));
    if (list) {
      const rows = recentListRows(notes);
      const parentIndent = indentationAt(body, list.startOffset);
      const childIndent = `${parentIndent}  `;
      const inner = rows.length
        ? `\n${rows.map((row) => `${childIndent}${row}`).join('\n')}\n${parentIndent}`
        : `\n${parentIndent}`;
      replacements.push({ start: list.innerStart, end: list.innerEnd, text: inner });
      dynamicRanges.push({ start: list.innerStart, end: list.innerEnd });
    }
  }

  let courseNotes = null;
  if (page.type === 'cover') {
    const course = String(page.data.course || path.posix.dirname(page.id)).trim();
    courseNotes = notes.byCourse.get(course) || null;
    const range = findCoverTocRange(body, registry);
    if (range) {
      replacements.push({ start: range.start, end: range.end, text: coverTocHtml(courseNotes) });
      dynamicRanges.push(range);
    }
  }

  // Liquid 模板里的 <li>/<a>/<h3> 也会被解析成元素；它们即将被整块替换，
  // 不能再往这些起始标签里插 data-eid，否则区间会重叠。
  const markers = buildMarkerEdits(body, registry).filter((edit) =>
    !dynamicRanges.some((range) => edit.start > range.start && edit.start < range.end));
  const edits = [...markers, ...replacements];
  let content = applyEdits(body, edits);
  content = stripLiquid(content);

  if (page.type === 'cover') {
    return composeCoverPage(content, page, notes, dark);
  }
  return decorateFullPage(content, dark);
}
