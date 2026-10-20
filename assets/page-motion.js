/* 卡片页的跨页高度过渡
 *
 * 做法：prefs.js 在 <head> 里同步读取上一页离开时记录的高度，并写到
 * --page-start-height；本文件在页面底部把卡片从旧高度平滑过渡到新高度。
 * 这样切页时卡片不会“瞬间长高/缩短”，正文也不会被拉伸变形。
 *
 * 只在卡片版页面加载（笔记页不引用本文件）。不支持或开启了
 * prefers-reduced-motion 时，prefs.js 不会设置起点，页面直接按自然高度显示。
 */
(function () {
  'use strict';

  var KEY = 'xiaao-card-height';

  function card() {
    return document.querySelector('.page:not(.page-note)');
  }

  function finish(page) {
    page.style.height = '';
    page.classList.remove('is-resizing');
    document.documentElement.style.removeProperty('--page-start-height');
  }

  function animate() {
    var page = card();
    if (!page) return;

    var startValue = getComputedStyle(document.documentElement)
      .getPropertyValue('--page-start-height').trim();
    if (!startValue) return;

    var start = parseFloat(startValue);
    if (!isFinite(start)) {
      finish(page);
      return;
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish(page);
      return;
    }

    /* 先量出这一页的自然高度，再回到旧高度作为动画起点 */
    page.style.height = 'auto';
    var end = page.getBoundingClientRect().height;
    page.style.height = start + 'px';

    if (!isFinite(end) || Math.abs(end - start) < 2) {
      finish(page);
      return;
    }

    void page.offsetHeight;                         // 先让浏览器认定 start 这个高度
    page.classList.add('is-resizing');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        page.style.height = end + 'px';
      });
    });

    var done = false;
    function doneOnce() {
      if (done) return;
      done = true;
      page.removeEventListener('transitionend', onEnd);
      finish(page);
    }
    function onEnd(event) {
      if (event.propertyName === 'height') doneOnce();
    }
    page.addEventListener('transitionend', onEnd);
    window.setTimeout(doneOnce, 700);               // transitionend 没触发时的兜底
  }

  /* 离开当前卡片页时记下高度，供下一页在首帧使用 */
  window.addEventListener('pagehide', function () {
    var page = card();
    if (!page) return;
    var height = page.getBoundingClientRect().height;
    if (!isFinite(height) || height < 120 || height > 20000) return;
    try {
      window.sessionStorage.setItem(KEY, JSON.stringify({
        h: Math.round(height),
        t: Date.now()
      }));
    } catch (e) { /* 隐私模式下不参与过渡 */ }
  });

  /* bfcache 恢复时清掉可能残留的动画中间态 */
  window.addEventListener('pageshow', function (event) {
    if (!event.persisted) return;
    var page = card();
    if (page) finish(page);
  });

  /* 等 DOMContentLoaded 后再量高度：prefs.js 的显示设置按钮也在这时注入，
     否则会先量到“没有按钮”的旧高度，动画结束再跳一下。 */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animate);
  } else {
    animate();
  }
})();
