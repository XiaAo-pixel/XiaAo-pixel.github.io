/**
 * PDF 笔记总览页（pdfs.html）渲染脚本 —— 书架版式。
 *
 * 数据来源：pdf/manifest.json（由「主页助手」上传 PDF 时自动维护）。
 * 封面缩略图：pdf/thumbs/<文件名>.png（上传时由主页助手用 PDF.js 生成）；
 * 没有缩略图的 PDF 会退化成带色相渐变的占位封面。
 * 阅读进度：localStorage「xiaao-pdf-progress:<file>」，由 pdf/reader.html 写入，
 * 只在本机本浏览器有效；总览页负责把它画成进度条。
 */
(function () {
  'use strict';

  var PROGRESS_PREFIX = 'xiaao-pdf-progress:';

  function fmtSize(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '';
    if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
    return Math.max(1, Math.round(bytes / 1024)) + ' KB';
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

  function titleHue(title) {
    var hash = 0;
    var text = String(title || '');
    for (var i = 0; i < text.length; i += 1) {
      hash = (hash * 31 + text.charCodeAt(i)) % 100000;
    }
    return hash % 360;
  }

  function coverHtml(item) {
    // 缩略图路径由 PDF 文件名唯一决定：files/笔记.pdf → thumbs/笔记.png；
    // 文件是否存在交给 <img> 的 onerror 兜底（渲染后统一挂监听）。
    var stem = String(item.file || '').replace(/^files\//, '').replace(/\.pdf$/i, '');
    var src = 'pdf/thumbs/' + encodeURIComponent(stem) + '.png';
    return '<span class="pdf-cover" style="--hue:' + titleHue(item.title) + '">' +
      '<img loading="lazy" src="' + esc(src) + '" alt="">' +
      '</span>';
  }

  function bookHtml(item) {
    var href = 'pdf/reader.html?file=' + encodeURIComponent(item.file) +
      '&title=' + encodeURIComponent(item.title || '');

    var metaParts = [];
    var size = fmtSize(item.size);
    if (size) metaParts.push(size);

    var progress = readProgress(item.file);
    var bar = '';
    var barTitle = '';
    if (progress) {
      var total = Number.isFinite(progress.total) && progress.total > 0 ? progress.total : 0;
      var page = Math.min(progress.page, total || progress.page);
      if (total) {
        var pct = Math.max(2, Math.min(100, Math.round(page / total * 100)));
        bar = '<span class="pdf-progress"><span style="width:' + pct + '%"></span></span>';
        barTitle = ' title="读到 ' + page + '/' + total + ' 页"';
        metaParts.push('读到 ' + page + '/' + total + ' 页');
      } else {
        metaParts.push('读到 ' + page + ' 页');
      }
    }

    return '<a class="pdf-book" href="' + esc(href) + '" target="_blank" rel="noopener"' + barTitle + '>' +
      coverHtml(item) +
      '<span class="pdf-book-title">' + esc(item.title || item.file) + '</span>' +
      '<span class="pdf-book-meta">' + esc(metaParts.join(' · ')) + '</span>' +
      bar +
      '</a>';
  }

  function render(data) {
    var host = document.getElementById('pdf-library');
    if (!host) return;
    var pdfs = Array.isArray(data && data.pdfs) ? data.pdfs.filter(function (p) { return p && p.file; }) : [];

    if (!pdfs.length) {
      host.innerHTML = '<p class="muted">书架还是空的。在本地打开「主页助手」，点左下角的「PDF 笔记」即可上传；' +
        '上传后点「发布」，PDF 就会摆上书架。</p>';
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
      html.push('<section class="pdf-shelf">');
      html.push('<h2>' + esc(category) + ' <small class="pdf-count">' + items.length + ' 篇</small></h2>');
      html.push('<div class="pdf-shelf-row">');
      items.forEach(function (item) { html.push(bookHtml(item)); });
      html.push('</div>');
      html.push('<div class="pdf-shelf-board" aria-hidden="true"></div>');
      html.push('</section>');
    });
    host.innerHTML = html.join('');

    // 缩略图加载失败 → 换成渐变占位封面
    Array.prototype.forEach.call(host.querySelectorAll('.pdf-cover img'), function (img) {
      img.addEventListener('error', function () {
        img.closest('.pdf-cover').classList.add('no-thumb');
      });
    });
    // 个别环境 lazy 加载不触发时的兜底：3 秒后还没开始加载的强制立即加载
    setTimeout(function () {
      Array.prototype.forEach.call(host.querySelectorAll('.pdf-cover img[loading="lazy"]'), function (img) {
        if (!img.complete) img.loading = 'eager';
      });
    }, 3000);
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
