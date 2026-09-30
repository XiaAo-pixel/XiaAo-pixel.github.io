/*
  照片墙的两条逻辑：
  1) 排版：同一行（.photo-row）里的照片，按各自原图比例分配宽度 —— flex-grow 设为宽高比后，
     每张的宽度 = 行宽 × 自己的比例 / 比例之和，于是"宽度 ÷ 比例"（也就是高度）对整行都相同。
     结果就是行内自动等高铺满、照片一个不裁，而每行放几张可以随便改：放 2 张就大、放 3 张就小。
  2) 放大：点任意一张打开放大视图，带标题；支持 ← → 切换、Esc 或点空白关闭。
*/
(function () {
  var wall = document.querySelector('.photo-wall');
  if (!wall) return;

  /* 1. 行内按原比例分配宽度 */
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

  /* 2. 放大视图 */
  var box = document.getElementById('lightbox');
  var figures = Array.prototype.slice.call(wall.querySelectorAll('figure'));
  if (!box || !figures.length) return;

  var bigImg = box.querySelector('.lb-img');
  var bigCap = box.querySelector('.lb-cap');
  var index = 0;
  var lastFocus = null;

  function render() {
    var fig = figures[index];
    var img = fig.querySelector('img');
    var cap = fig.querySelector('figcaption');
    bigImg.src = img.getAttribute('src');
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
    if (next) new Image().src = next.getAttribute('src');
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
