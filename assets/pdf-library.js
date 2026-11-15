/**
 * PDF 笔记总览页（pdfs.html）渲染脚本。
 *
 * 数据来源：pdf/manifest.json（由「主页助手」上传 PDF 时自动维护）。
 * 阅读进度：localStorage「xiaao-pdf-progress:<file>」，由 pdf/reader.html 写入，
 * 只在本机本浏览器有效；总览页负责把它画成「读到 X/Y 页」和进度条。
 */
(function () {
  'use strict';

  var PROGRESS_PREFIX = 'xiaao-pdf-progress:';

  function fmtSize(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '';
    if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
    return Math.max(1, Math.round(bytes / 1024)) + ' KB';
  }

  function fmtDate(iso) {
    return String(iso || '').slice(0, 10);
  }

  function esc(text) {
    return String(text == null ? '' : text).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function readProgress(file) {
    try {
      var raw = localStorage.getItem(PROGRESS_PREFIX + file);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || !Number.isFinite(data.page) || data.page < 1) return null;
      return data;
    } catch {
      return null;
    }
  }

  function cardHtml(item) {
    var href = 'pdf/reader.html?file=' + encodeURIComponent(item.file) +
      '&title=' + encodeURIComponent(item.title || '');
    var metaParts = [];
    var size = fmtSize(item.size);
    if (size) metaParts.push(size);
    var date = fmtDate(item.added);
    if (date) metaParts.push(date);

    var progress = readProgress(item.file);
    var progressText = '';
    var bar = '';
    if (progress) {
      var total = Number.isFinite(progress.total) && progress.total > 0 ? progress.total : 0;
      var page = Math.min(progress.page, total || progress.page);
      if (total) {
        progressText = ' · 读到 ' + page + '/' + total + ' 页';
        var pct = Math.max(2, Math.min(100, Math.round(page / total * 100)));
        bar = '<div class="pdf-progress" aria-hidden="true"><span style="width:' + pct + '%"></span></div>';
      } else {
        progressText = ' · 读到 ' + page + ' 页';
      }
    }

    return '<a class="entry pdf-entry" href="' + esc(href) + '" target="_blank" rel="noopener">' +
      '<div class="t">📕 ' + esc(item.title || item.file) + '</div>' +
      '<div class="d">' + esc(metaParts.join(' · ')) + esc(progressText) + '</div>' +
      bar +
      '</a>';
  }

  function render(data) {
    var host = document.getElementById('pdf-library');
    if (!host) return;
    var pdfs = Array.isArray(data && data.pdfs) ? data.pdfs.filter(function (p) { return p && p.file; }) : [];

    if (!pdfs.length) {
      host.innerHTML = '<p class="muted">还没有上传 PDF。在本地打开「主页助手」，点左下角的「PDF 笔记」即可上传；' +
        '上传后点右上角「发布」，PDF 就会出现在这里。</p>';
      return;
    }

    // 时间新的在前；分类按「该分类里最新一篇」的先后排序
    pdfs.sort(function (a, b) {
      var ta = String(a.added || ''), tb = String(b.added || '');
      if (ta !== tb) return ta < tb ? 1 : -1;
      return String(a.title || a.file).localeCompare(String(b.title || b.file), 'zh-Hans-CN');
    });
    var groups = new Map();
    pdfs.forEach(function (item) {
      var category = String(item.category || '').trim() || '未分类';
      if (!groups.has(category)) groups.set(category, []);
      groups.get(category).push(item);
    });

    var html = [];
    groups.forEach(function (items, category) {
      html.push('<section class="pdf-group">');
      html.push('<h2>' + esc(category) + ' <small class="pdf-count">' + items.length + ' 篇</small></h2>');
      html.push('<div class="entries">');
      items.forEach(function (item) { html.push(cardHtml(item)); });
      html.push('</div>');
      html.push('</section>');
    });
    host.innerHTML = html.join('');
  }

  function load() {
    var host = document.getElementById('pdf-library');
    if (!host) return;
    fetch('pdf/manifest.json', { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(render)
      .catch(function () {
        host.innerHTML = '<p class="muted">暂时读不到 PDF 列表（pdf/manifest.json 加载失败）。</p>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
