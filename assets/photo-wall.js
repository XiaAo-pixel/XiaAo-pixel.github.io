/*
  照片墙的两条逻辑：
  1) 排版：同一行（.photo-row）里的照片，按各自原图比例分配宽度 —— flex-grow 设为宽高比后，
     每张的宽度 = 行宽 × 自己的比例 / 比例之和，于是"宽度 ÷ 比例"（也就是高度）对整行都相同。
     结果就是行内自动等高铺满、照片一个不裁，而每行放几张可以随便改：放 2 张就大、放 3 张就小。
  2) 放大：点任意一张打开放大视图，带标题；支持 ← → 切换、Esc 或点空白关闭。
     页面上可以有多个地点分组（多个 .photo-wall），所有照片共用一个 lightbox，
     左右切换时按页面顺序浏览全部照片。
*/
(function () {
  /* 一个页面可以有多个地点的照片墙（南京、无锡、以后新加的分组……） */
  var walls = Array.prototype.slice.call(document.querySelectorAll('.photo-wall'));
  if (!walls.length) return;

  /* 1. 每个墙、每一行都按原比例分配宽度 */
  walls.forEach(function (wall) {
    Array.prototype.forEach.call(wall.querySelectorAll('.photo-row'), function (row) {
      var figs = Array.prototype.slice.call(row.querySelectorAll('figure'));
      if (figs.length < 2) return;            /* 单张独占一行时按 CSS 的固定宽度走，否则会撑得过高 */
      figs.forEach(function (fig) {
        var img = fig.querySelector('img');
        if (!img) return;
        var w = parseFloat(img.getAttribute('width'));
        var h = parseFloat(img.getAttribute('height'));
        if (w > 0 && h > 0) fig.style.setProperty('--gn', w / h);   /* 写自定义属性，窄屏媒体查询才能覆盖 */
      });
    });
  });

  /* 2. 收集所有墙里的照片，共用一个放大视图 */
  var box = document.getElementById('lightbox');
  var figures = [];
  walls.forEach(function (wall) {
    Array.prototype.forEach.call(wall.querySelectorAll('figure'), function (fig) {
      if (!fig.querySelector('img')) return;
      if (figures.indexOf(fig) === -1) figures.push(fig);
    });
  });
  if (!box || !figures.length) return;

  var bigImg = box.querySelector('.lb-img');
  var bigCap = box.querySelector('.lb-cap');
  var index = 0;
  var lastFocus = null;

  /* 网格里用 srcset 取小图；放大时优先用 data-full 指回原图 */
  function fullSrc(img) {
    return img.getAttribute('data-full') || img.currentSrc || img.getAttribute('src');
  }

  function render() {
    var fig = figures[index];
    var img = fig.querySelector('img');
    var cap = fig.querySelector('figcaption');
    bigImg.src = fullSrc(img);
    bigImg.alt = img.getAttribute('alt') || '';
    bigCap.textContent = cap ? cap.textContent : (img.getAttribute('alt') || '');
    box.setAttribute('aria-label', '照片预览：' + bigCap.textContent);
  }

  function open(i) {
    index = i;
    render();
    lastFocus = document.activeElement;
    box.hidden = false;
    document.body.classList.add('lb-open');
    box.querySelector('.lb-close').focus();
    /* 先显示当前的，再偷偷预载下一张，切换时不会白一下 */
    var next = figures[(index + 1) % figures.length].querySelector('img');
    if (next) new Image().src = fullSrc(next);
  }

  function close() {
    box.hidden = true;
    document.body.classList.remove('lb-open');
    bigImg.removeAttribute('src');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function step(d) {
    index = (index + d + figures.length) % figures.length;
    render();
  }

  figures.forEach(function (fig, i) {
    fig.setAttribute('role', 'button');
    fig.setAttribute('tabindex', '0');
    fig.addEventListener('click', function () { open(i); });
    fig.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        open(i);
      }
    });
  });

  box.addEventListener('click', function (e) {
    var t = e.target;
    if (t === box || t.classList.contains('lb-close')) return close();
    if (t.classList.contains('lb-prev')) return step(-1);
    if (t.classList.contains('lb-next')) return step(1);
  });

  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });
})();
