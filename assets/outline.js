/* 侧栏大纲（笔记页专用）
 *
 * 页面结构约定（_layouts/note.html + split-notes.ps1 生成的小节页）：
 *   .sidebar .book-toc      整本书的目录（章节 + 当前章各小节，都是链接）
 *   .sidebar .book-section.active   当前小节那条链接
 *   .content                正文，标题从 h3 开始（h1 = 小节名，h2 不用）
 *
 * 本脚本做两件事：
 *   1. 把当前小节内的 h3 / h4 / h5 标题，作为子级挂在侧栏当前小节那条链接下面
 *      （形成「书 → 章 → 节 → 小节」四级，和 bookdown 侧栏一样）
 *   2. 随滚动高亮侧栏里对应的小节 / 小节内标题
 */
(function () {
  'use strict';

  var MIN_LEVEL = 3;   /* 正文标题从 h3 起（h1 是小节名，已由页面标题显示） */
  var MAX_LEVEL = 5;

  var content = document.querySelector('.content');
  var bookToc = document.querySelector('.book-toc');
  if (!content || !bookToc) return;

  var pageLink = bookToc.querySelector('.book-section.active');

  /* 小节页正文里常带一条指向同章其它小节的内容（如「本章前置知识」），
     它们已经作为同级小节列在侧栏目录里了，这里的大纲不再重复收录；
     同时把与页面标题同名的那条首标题也排除（页面大标题已经写了小节名） */
  var knownTitles = {};
  Array.prototype.forEach.call(bookToc.querySelectorAll('.book-section'), function (a) {
    var t = visibleText(a);
    if (t) knownTitles[t] = true;
  });

  /* 链接里可能藏着给读屏软件用的章名前缀（.sr），比对文字时要排除 */
  function visibleText(el) {
    var clone = el.cloneNode(true);
    Array.prototype.forEach.call(clone.querySelectorAll('.sr'), function (s) { s.parentNode.removeChild(s); });
    return normalize(clone.textContent);
  }

  function normalize(s) { return (s || '').replace(/[\s\u00a0]+/g, ' ').trim(); }

  /* ---- 1. 收集正文标题 ---- */
  var heads = [];
  Array.prototype.forEach.call(content.querySelectorAll('h3, h4, h5, h6'), function (h) {
    var level = parseInt(h.tagName.charAt(1), 10);
    if (level < MIN_LEVEL || level > MAX_LEVEL) return;
    var text = normalize(h.textContent);
    if (!text) return;
    if (knownTitles[text]) return;   /* 侧栏已有同名小节 / 就是本页标题，不重复 */
    if (!h.id) h.id = slug(text);
    heads.push({ el: h, level: level, text: text });
  });

  /* 标题 id 兜底生成（kramdown 的 auto_ids 一般已经给了 id，这里只兜底） */
  function slug(text) {
    var s = text.toLowerCase()
      .replace(/[^\w\u4e00-\u9fff\u3400-\u4dbf\- ]+/g, ' ')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return s || 'section';
  }

  /* id 去重，保证锚点唯一 */
  var used = {};
  heads.forEach(function (h) {
    var base = h.el.id, id = base, n = 2;
    while (used[id]) { id = base + '-' + n++; }
    used[id] = true;
    h.el.id = id;
  });

  /* ---- 2. 挂到侧栏当前小节下面 ---- */
  var treeBox = null;
  var entries = [];

  if (heads.length) {
    treeBox = document.createElement('div');
    treeBox.className = 'subnav-book-outline';

    /* 按层级组织成树：h3 一级，h4 二级，h5 三级 */
    var stack = [];          /* 每层当前节点，直接当父容器用 */
    heads.forEach(function (h) {
      var item = { id: h.el.id, text: h.text, kids: [] };
      var box = makeBranch(item);
      while (stack.length && stack[stack.length - 1].level >= h.level) stack.pop();
      var parent = stack.length ? stack[stack.length - 1].node.querySelector(':scope > .ol-kids') : treeBox;
      (parent || treeBox).appendChild(box);
      stack.push({ level: h.level, node: box, item: item });
    });

    function makeBranch(item) {
      var box = document.createElement('div');
      box.className = 'ol-node';
      var a = document.createElement('a');
      a.href = '#' + item.id;
      a.textContent = item.text;
      box.appendChild(a);
      var kids = document.createElement('div');
      kids.className = 'ol-kids';
      box.appendChild(kids);
      return box;
    }

    /* 插到当前小节那条链接后面 */
    if (pageLink) {
      var details = document.createElement('details');
      details.className = 'book-outline';
      details.open = location.hash === '' || window.innerWidth > 900;
      var summary = document.createElement('summary');
      summary.textContent = '本节大纲';
      details.appendChild(summary);
      details.appendChild(treeBox);
      pageLink.parentNode.insertBefore(details, pageLink.nextSibling);
    }
  }

  /* ---- 3. 高亮：小节页链接 + 正文标题 ---- */
  function cssEscape(s) { return String(s).replace(/["\\]/g, '\\$&'); }

  if (pageLink) {
    entries.push({ el: null, link: pageLink, panelLink: false });
  }
  heads.forEach(function (h) {
    var link = treeBox ? treeBox.querySelector('a[href="#' + cssEscape(h.el.id) + '"]') : null;
    entries.push({ el: h.el, link: link });
  });

  /* 自愈：kramdown 的 auto_ids 与本地兜底 slug 可能算出不同 id，
     导致侧栏大纲链接点不动。这里把对不上的链接重指到真实标题 id 上。 */
  if (treeBox) {
    Array.prototype.forEach.call(treeBox.querySelectorAll('a[href^="#"]'), function (a) {
      var id = decodeURIComponent(a.getAttribute('href').slice(1));
      if (document.getElementById(id)) return;
      var want = id.replace(/[\s\-_.]+/g, '').toLowerCase();
      for (var i = 0; i < heads.length; i++) {
        if (heads[i].text.replace(/[\s\-_.]+/g, '').toLowerCase() === want) {
          heads[i].el.id = id;          /* 统一成目录里那份 id，锚点可分享 */
          a.setAttribute('href', '#' + id);
          return;
        }
      }
    });
  }

  var current = -1;
  var pivot = false;   /* 只有带 #锚点 打开时才让侧栏跟着滚 */

  function scrollLinkIntoView(link) {
    if (!link || !bookToc) return;
    var top = link.offsetTop, h = bookToc.clientHeight;
    if (top >= bookToc.scrollTop + 12 && top + link.offsetHeight <= bookToc.scrollTop + h - 12) return;
    bookToc.scrollTop = Math.max(0, top - h / 2 + link.offsetHeight / 2);
  }

  function setCurrent(i) {
    if (i === current) return;
    if (current >= 0 && entries[current].link) entries[current].link.classList.remove('current');
    current = i;
    if (i < 0 || !entries[i].link) return;
    entries[i].link.classList.add('current');
    if (pivot) scrollLinkIntoView(entries[i].link);
  }

  var ticking = false;
  function update() {
    ticking = false;
    var idx = 0;
    for (var i = 0; i < heads.length; i++) {
      if (heads[i].el.getBoundingClientRect().top > 96) break;
      idx = i + 1;   /* entries[0] 是小节页本身 */
    }
    if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 4) {
      idx = entries.length - 1;
    }
    setCurrent(idx);
    pivot = false;
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('load', update);

  /* 点侧栏小节内标题：平滑滚动 + 同步地址栏锚点 */
  if (treeBox) {
    treeBox.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var target = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', a.getAttribute('href'));
      pivot = true;
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].el === target) { setCurrent(i); break; }
      }
    });
  }

  /* ---- 4. 带 #锚点 打开时定位到对应标题 ---- */
  function followHash() {
    var raw = decodeURIComponent((location.hash || '').slice(1));
    if (!raw) return;
    var el = document.getElementById(raw);
    if (!el) {
      /* id 可能与 slug 生成的不同，按文字再找一次 */
      var flat = raw.replace(/[\s\-_.]+/g, '').toLowerCase();
      for (var i = 0; i < heads.length; i++) {
        if (heads[i].text.replace(/[\s\-_.]+/g, '').toLowerCase() === flat) { el = heads[i].el; el.id = raw; break; }
      }
    }
    if (!el) return;
    for (var j = 0; j < entries.length; j++) {
      if (entries[j].el === el) {
        pivot = true;
        setCurrent(j);
        el.scrollIntoView({ block: 'start' });
        update();
        return;
      }
    }
  }
  window.addEventListener('hashchange', function () {
    if (treeBox && treeBox.parentNode) treeBox.parentNode.open = true;
    followHash();
  });

  update();
  followHash();
})();
