/* 显示设置：明暗主题 + 字体（无衬线 / 衬线）
 *
 * 该脚本在 <head> 中同步加载：先设置 html[data-theme] / html[data-font]，
 * 避免样式加载后再切换造成闪烁；DOM 就绪后再把两个按钮注入侧栏。
 * 偏好保存在 localStorage，跨页面生效。
 */
(function () {
  'use strict';

  var THEME_KEY = 'xiaao-theme';
  var FONT_KEY = 'xiaao-font';
  var root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var themeBtn = null;
  var fontBtn = null;

  function read(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function save(key, value) {
    try {
      if (value === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, value);
    } catch (e) { /* 隐私模式下忽略 */ }
  }
  function systemTheme() {
    return mq && mq.matches ? 'dark' : 'light';
  }
  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function currentFont() {
    return root.getAttribute('data-font') === 'serif' ? 'serif' : 'sans';
  }

  function applyTheme(theme, persist) {
    theme = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', theme);
    if (persist) save(THEME_KEY, theme);
    updateControls();
  }
  function applyFont(font, persist) {
    font = font === 'serif' ? 'serif' : 'sans';
    if (font === 'serif') root.setAttribute('data-font', 'serif');
    else root.removeAttribute('data-font');
    if (persist) save(FONT_KEY, font);
    updateControls();
  }

  function updateControls() {
    if (!themeBtn || !fontBtn) return;

    var theme = currentTheme();
    var dark = theme === 'dark';
    themeBtn.querySelector('[data-role="icon"]').textContent = dark ? '🌙' : '☀️';
    themeBtn.querySelector('[data-role="text"]').textContent = dark ? '深色' : '浅色';
    themeBtn.setAttribute('aria-label', dark ? '当前深色主题，切换到浅色' : '当前浅色主题，切换到深色');
    themeBtn.setAttribute('title', dark ? '切换到浅色' : '切换到深色');

    var serif = currentFont() === 'serif';
    fontBtn.querySelector('[data-role="text"]').textContent = serif ? '衬线' : '无衬线';
    fontBtn.setAttribute('aria-label', serif ? '当前衬线字体，切换到无衬线' : '当前无衬线字体，切换到衬线');
    fontBtn.setAttribute('title', serif ? '切换到无衬线' : '切换到衬线');
  }

  function createControls() {
    var sidebar = document.querySelector('.sidebar');
    if (!sidebar || sidebar.querySelector('.sidebar-prefs')) return;

    var wrap = document.createElement('div');
    wrap.className = 'sidebar-prefs';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', '显示设置');

    themeBtn = document.createElement('button');
    themeBtn.type = 'button';
    themeBtn.className = 'pref-btn';
    themeBtn.innerHTML = '<span class="pref-ico" data-role="icon" aria-hidden="true">☀️</span>' +
                         '<span data-role="text">浅色</span>';
    themeBtn.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });

    fontBtn = document.createElement('button');
    fontBtn.type = 'button';
    fontBtn.className = 'pref-btn';
    fontBtn.innerHTML = '<span class="pref-aa" aria-hidden="true">Aa</span>' +
                        '<span data-role="text">无衬线</span>';
    fontBtn.addEventListener('click', function () {
      applyFont(currentFont() === 'serif' ? 'sans' : 'serif', true);
    });

    wrap.appendChild(themeBtn);
    wrap.appendChild(fontBtn);

    var brand = sidebar.querySelector('.brand');
    if (brand && brand.parentNode === sidebar) sidebar.insertBefore(wrap, brand.nextSibling);
    else sidebar.insertBefore(wrap, sidebar.firstChild);

    updateControls();
  }

  /* 尽早应用偏好（脚本在 <head> 中同步执行） */
  var storedTheme = read(THEME_KEY);
  if (storedTheme && storedTheme !== 'light' && storedTheme !== 'dark') {
    save(THEME_KEY, null);
    storedTheme = null;
  }
  applyTheme(storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : systemTheme(), false);

  var storedFont = read(FONT_KEY);
  if (storedFont && storedFont !== 'serif' && storedFont !== 'sans') {
    save(FONT_KEY, null);
    storedFont = null;
  }
  if (storedFont === 'serif') root.setAttribute('data-font', 'serif');

  /* 没有手动选择过时，跟随系统明暗变化 */
  if (mq) {
    var onSystemChange = function (e) {
      if (!read(THEME_KEY)) applyTheme(e.matches ? 'dark' : 'light', false);
    };
    if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createControls);
  } else {
    createControls();
  }
})();
