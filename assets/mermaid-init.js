/* 笔记页 mermaid 图渲染（仅在 front matter 标记 mermaid: true 的页面加载）。
 *
 * kramdown 把 ```mermaid 围栏渲染成 <pre><code class="language-mermaid">…</code></pre>，
 * mermaid 默认不认这种结构。这里把它换成 <div class="mermaid">源码</div> 再交给 mermaid。
 * 本脚本作为 defer 排在 mermaid.min.js 之后执行，故 window.mermaid 已就绪。
 * 明暗主题（prefs.js 写 html[data-theme]）切换时重渲染，保证两种主题下都清晰。
 */
(function () {
  'use strict';
  if (!window.mermaid) return;

  function theme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default';
  }

  /* 1. pre > code.language-mermaid → div.mermaid（data-src 存源码，供重渲染） */
  var codes = document.querySelectorAll('pre > code.language-mermaid, pre > code.mermaid');
  Array.prototype.forEach.call(codes, function (code) {
    var pre = code.parentNode;
    if (!pre || pre.tagName !== 'PRE') return;
    var div = document.createElement('div');
    div.className = 'mermaid';
    div.setAttribute('data-src', code.textContent);
    div.textContent = code.textContent;
    pre.parentNode.replaceChild(div, pre);
  });

  /* 2. 渲染（startOnLoad:false，避免与 mermaid 自动启动重复渲染） */
  function render() {
    var nodes = document.querySelectorAll('.mermaid');
    if (!nodes.length) return;
    Array.prototype.forEach.call(nodes, function (el) {
      el.removeAttribute('data-processed');
      el.textContent = el.getAttribute('data-src') || el.textContent;
    });
    window.mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme: theme() });
    window.mermaid.run({ querySelector: '.mermaid' });
  }

  render();

  /* 3. 主题切换时重渲染 */
  if (window.MutationObserver) {
    var mo = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].attributeName === 'data-theme') { render(); break; }
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }
})();