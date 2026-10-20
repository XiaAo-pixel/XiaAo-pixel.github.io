/**
 * 注入预览页的桥接脚本。
 * 负责：悬停 / 点选 / 双击就地编辑 / 预览模式链接跳转 / 实时更新元素。
 */
(function () {
  'use strict';

  var NS = 'homepage-editor-bridge';
  var params = new URLSearchParams(location.search);
  var mode = 'edit';
  var dark = params.get('dark') === '1';
  var selectedEl = null;
  var hoverEl = null;
  var hoverFrame = 0;
  var inline = null;       // { el, original, toolbar, timer }
  var toolbar = null;
  var lastToastAt = 0;

  function post(type, payload) {
    try {
      parent.postMessage(Object.assign({ source: NS, type: type }, payload || {}), '*');
    } catch (err) {
      /* ignore */
    }
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function isEditableElement(el) {
    return !!(el && el.nodeType === 1 && el.hasAttribute('data-editor-text'));
  }

  function closestEntry(el) {
    return el && el.closest('a.entry[data-eid]');
  }

  function closestFigure(el) {
    return el && el.closest('figure[data-eid]');
  }

  /** 点击时优先选卡片 / 照片 / 链接，再退到文本块。 */
  function chooseSelectable(el) {
    if (!el) return null;
    var entry = closestEntry(el);
    if (entry) return entry;
    var figure = closestFigure(el);
    if (figure) return figure;
    var link = el.closest('a[data-eid]');
    if (link) return link;
    // 行内标签（cite / strong / span…）优先让位于所在的文字块，
    // 这样单击整段更好选；要精确改行内文字可以双击。
    var block = el.closest('p,h1,h2,h3,h4,h5,h6,li,figcaption,blockquote,footer,td,th,address');
    if (block && block.hasAttribute('data-editor-text') && block.hasAttribute('data-eid')) return block;
    var textBlock = el.closest('[data-editor-text][data-eid]');
    if (textBlock) return textBlock;
    return el.closest('[data-eid]');
  }

  function markerInfo(rawTarget) {
    var el = rawTarget && rawTarget.nodeType === 3 ? rawTarget.parentElement : rawTarget;
    if (!el || el.nodeType !== 1) return null;
    for (var node = el; node && node !== document.documentElement; node = node.parentElement) {
      if (node.hasAttribute && node.hasAttribute('data-eo')) {
        return { el: node, eid: node.getAttribute('data-eid'), readonly: true };
      }
      if (node.hasAttribute && node.hasAttribute('data-eid')) {
        return { el: node, eid: node.getAttribute('data-eid'), readonly: false };
      }
    }
    return null;
  }

  function cleanClone(el) {
    var clone = el.cloneNode(true);
    clone.removeAttribute('contenteditable');
    clone.removeAttribute('spellcheck');
    clone.removeAttribute('data-editor-selected');
    clone.removeAttribute('data-editor-hover');
    clone.removeAttribute('data-editor-inline');
    clone.removeAttribute('data-eid');
    clone.removeAttribute('data-eo');
    clone.querySelectorAll('[contenteditable]').forEach(function (node) {
      node.removeAttribute('contenteditable');
      node.removeAttribute('spellcheck');
    });
    clone.querySelectorAll('[data-eid],[data-eo]').forEach(function (node) {
      node.removeAttribute('data-eid');
      node.removeAttribute('data-eo');
      node.removeAttribute('data-editor-text');
    });
    var injectedToolbar = clone.querySelector('.editor-inline-toolbar');
    if (injectedToolbar) injectedToolbar.remove();
    return clone;
  }

  function innerHtmlOf(el) {
    return cleanClone(el).innerHTML;
  }

  function textOf(el) {
    return String(el.textContent || '').replace(/\u00a0/g, ' ').trim();
  }

  function classesOf(el) {
    return Array.prototype.slice.call(el.classList || []);
  }

  function eidOf(el) {
    return el && el.getAttribute ? el.getAttribute('data-eid') : null;
  }

  function sameKind(a, b) {
    if (!a || !b || !a.tagName || !b.tagName) return false;
    if (a.classList.contains('entry') && b.classList.contains('entry')) return true;
    if (a.tagName === 'FIGURE' && b.tagName === 'FIGURE') return true;
    return a.tagName === b.tagName && ['H2', 'H3', 'H4', 'P'].indexOf(a.tagName) !== -1;
  }

  function elementSibling(el, direction) {
    var node = el;
    do {
      node = direction < 0 ? node.previousElementSibling : node.nextElementSibling;
    } while (node && !eidOf(node));
    return node;
  }

  function breadcrumb(el) {
    var parts = [];
    var node = el;
    while (node && node.nodeType === 1 && node !== document.documentElement) {
      var part = node.tagName.toLowerCase();
      if (node.id) part += '#' + node.id;
      else if (node.classList.length) part += '.' + Array.prototype.slice.call(node.classList).slice(0, 2).join('.');
      parts.unshift(part);
      node = node.parentElement;
    }
    return parts.slice(-6).join('  ›  ');
  }

  function entryData(el) {
    if (!el.classList || !el.classList.contains('entry')) return null;
    var titleEl = el.querySelector('.t');
    var descEl = el.querySelector('.d');
    return {
      href: el.getAttribute('href') || '',
      target: el.getAttribute('target') || '',
      newTab: el.getAttribute('target') === '_blank',
      title: titleEl ? titleEl.textContent.trim() : '',
      desc: descEl ? descEl.textContent.trim() : '',
    };
  }

  function figureData(el) {
    if (!el || el.tagName !== 'FIGURE') return null;
    var img = el.querySelector('img');
    var cap = el.querySelector('figcaption');
    if (!img) return null;
    return {
      src: img.getAttribute('src') || '',
      width: img.getAttribute('width') || '',
      height: img.getAttribute('height') || '',
      alt: img.getAttribute('alt') || '',
      caption: cap ? cap.textContent.trim() : '',
    };
  }

  function detailsFor(el) {
    var eid = eidOf(el);
    var entry = entryData(el);
    var figure = figureData(el);
    var canMoveUp = false;
    var canMoveDown = false;
    var canDelete = false;
    var prev = elementSibling(el, -1);
    var next = elementSibling(el, 1);
    if (entry) {
      canMoveUp = sameKind(el, prev);
      canMoveDown = sameKind(el, next);
      canDelete = true;
    } else if (figure) {
      canMoveUp = sameKind(el, prev);
      canMoveDown = sameKind(el, next);
      canDelete = true;
    } else if (['H2', 'H3', 'H4', 'P'].indexOf(el.tagName) !== -1
      && !el.hasAttribute('data-eo')) {
      canMoveUp = sameKind(el, prev);
      canMoveDown = sameKind(el, next);
      canDelete = !(el.tagName === 'H2' && next && next.classList.contains('photo-wall'));
    }
    var inSidebar = !!el.closest('.sidebar');
    var textEditable = isEditableElement(el);
    var photoWall = el.classList.contains('photo-wall');
    return {
      eid: eid,
      tag: el.tagName.toLowerCase(),
      id: el.id || '',
      classes: classesOf(el),
      breadcrumb: breadcrumb(el),
      text: textOf(el),
      html: textEditable ? innerHtmlOf(el) : '',
      textEditable: textEditable,
      readOnly: el.hasAttribute('data-eo'),
      inSidebar: inSidebar,
      entry: entry,
      figure: figure,
      link: el.tagName === 'A' && !entry ? {
        href: el.getAttribute('href') || '',
        target: el.getAttribute('target') || '',
        newTab: el.getAttribute('target') === '_blank',
      } : null,
      image: el.tagName === 'IMG' ? {
        src: el.getAttribute('src') || '',
        alt: el.getAttribute('alt') || '',
        width: el.getAttribute('width') || '',
        height: el.getAttribute('height') || '',
      } : null,
      isContainer: ['MAIN', 'ASIDE', 'NAV', 'DIV', 'UL', 'SECTION'].indexOf(el.tagName) !== -1,
      isPhotoWall: photoWall,
      photoCount: photoWall ? el.querySelectorAll('figure').length : 0,
      childCount: el.children.length,
      canMoveUp: canMoveUp,
      canMoveDown: canMoveDown,
      canDelete: canDelete,
      canDeletePhotoGroup: photoWall,
      structural: el.querySelector('[data-editor-text]') !== null && !textEditable,
    };
  }

  function clearSelection() {
    if (selectedEl) selectedEl.removeAttribute('data-editor-selected');
    selectedEl = null;
    document.documentElement.classList.remove('editor-selected');
  }

  function selectElement(el, options) {
    if (!el) {
      clearSelection();
      if (!options || !options.silent) post('deselected');
      return;
    }
    clearHover();
    if (selectedEl && selectedEl !== el) selectedEl.removeAttribute('data-editor-selected');
    selectedEl = el;
    el.setAttribute('data-editor-selected', '1');
    document.documentElement.classList.add('editor-selected');
    var details = detailsFor(el);
    post('selected', { detail: details });
  }

  function showReadonly(el) {
    var now = Date.now();
    if (now - lastToastAt > 800) {
      lastToastAt = now;
      post('readonly', { message: '这块目录是脚本自动生成的，不能直接改文字。要改内容请编辑对应的笔记源文件。' });
    }
    document.querySelectorAll('[data-editor-eo-flash]').forEach(function (node) {
      node.removeAttribute('data-editor-eo-flash');
    });
    var target = el && el.closest('[data-eo]');
    if (target) {
      target.setAttribute('data-editor-eo-flash', '1');
      setTimeout(function () { target.removeAttribute('data-editor-eo-flash'); }, 900);
    }
  }

  function clearHover() {
    if (hoverEl) {
      hoverEl.removeAttribute('data-editor-hover');
      hoverEl = null;
    }
    document.documentElement.classList.remove('editor-hovering');
  }

  function onPointerMove(event) {
    if (mode !== 'edit' || inline || event.buttons) return;
    if (hoverFrame) return;
    var x = event.clientX;
    var y = event.clientY;
    hoverFrame = requestAnimationFrame(function () {
      hoverFrame = 0;
      var raw = document.elementFromPoint(x, y);
      var marker = markerInfo(raw);
      var candidate = null;
      if (marker) candidate = marker.readonly ? marker.el : chooseSelectable(marker.el);
      if (candidate === hoverEl) return;
      if (hoverEl) hoverEl.removeAttribute('data-editor-hover');
      hoverEl = candidate;
      if (hoverEl) {
        hoverEl.setAttribute('data-editor-hover', '1');
        document.documentElement.classList.add('editor-hovering');
      } else {
        document.documentElement.classList.remove('editor-hovering');
      }
    });
  }

  function onClickInPreview(event) {
    var anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!anchor) return;
    var href = anchor.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#') return;
    var targetUrl;
    try {
      // 用 anchor.href 而不是原始属性，才能正确遵循预览页里注入的 <base href="/">。
      targetUrl = new URL(anchor.href || href, location.href);
    } catch (err) {
      return;
    }
    if (targetUrl.origin === location.origin) {
      event.preventDefault();
      event.stopPropagation();
      post('navigate', { path: targetUrl.pathname, search: targetUrl.search });
    } else {
      // 站外链接交给浏览器默认行为（新标签打开），避免被弹窗拦截。
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('rel', 'noopener');
    }
  }

  function onClick(event) {
    if (toolbar && toolbar.contains(event.target)) return;
    if (mode === 'preview') {
      onClickInPreview(event);
      return;
    }
    if (inline) {
      if (inline.el === event.target || inline.el.contains(event.target)) {
        // 让光标正常工作，但阻止页面自身（比如照片墙）的点击逻辑。
        event.stopPropagation();
        return;
      }
      finishInline('commit');
    }
    var marker = markerInfo(event.target);
    if (!marker) {
      clearSelection();
      post('deselected');
      return;
    }
    if (marker.readonly) {
      event.preventDefault();
      event.stopPropagation();
      showReadonly(marker.el);
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    var el = chooseSelectable(marker.el);
    if (!el || !eidOf(el)) return;
    selectElement(el);
  }

  function onDblClick(event) {
    if (mode !== 'edit') return;
    var marker = markerInfo(event.target);
    if (!marker) return;
    if (marker.readonly) {
      event.preventDefault();
      event.stopPropagation();
      showReadonly(marker.el);
      return;
    }
    var raw = marker.el;
    var textEl = raw.closest ? raw.closest('[data-editor-text][data-eid]') : null;
    if (!textEl) {
      var chosen = chooseSelectable(raw);
      if (chosen) selectElement(chosen);
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (inline && inline.el === textEl) return;
    if (inline) finishInline('commit');
    selectElement(textEl);
    startInline(textEl);
  }

  function makeToolbar() {
    if (toolbar) return toolbar;
    toolbar = document.createElement('div');
    toolbar.className = 'editor-inline-toolbar';
    toolbar.setAttribute('contenteditable', 'false');
    toolbar.innerHTML = [
      '<span class="eit-hint">正在编辑</span>',
      '<button type="button" data-cmd="bold" title="加粗"><b>B</b></button>',
      '<button type="button" data-cmd="italic" title="斜体"><i>I</i></button>',
      '<button type="button" data-cmd="link" title="插入链接">链接</button>',
      '<span class="eit-sep"></span>',
      '<button type="button" class="eit-done" data-done="1">完成</button>',
      '<button type="button" class="eit-cancel" data-cancel="1">取消</button>',
    ].join('');
    toolbar.addEventListener('mousedown', function (event) {
      event.preventDefault();
    });
    toolbar.addEventListener('click', function (event) {
      var button = event.target.closest('button');
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      if (button.hasAttribute('data-done')) {
        finishInline('commit');
        return;
      }
      if (button.hasAttribute('data-cancel')) {
        finishInline('cancel');
        return;
      }
      var cmd = button.getAttribute('data-cmd');
      if (cmd === 'link') {
        var url = window.prompt('输入链接地址（可留空取消）', 'https://');
        if (url && url.trim() && url.trim() !== 'https://') {
          document.execCommand('createLink', false, url.trim());
        }
      } else {
        document.execCommand(cmd, false, null);
      }
      document.dispatchEvent(new Event('input'));
    });
    document.body.appendChild(toolbar);
    return toolbar;
  }

  function startInline(el) {
    if (inline) return;
    var original = el.innerHTML;
    el.setAttribute('contenteditable', 'true');
    el.setAttribute('spellcheck', 'false');
    el.setAttribute('data-editor-inline', '1');
    document.documentElement.classList.add('editor-inline-active');
    inline = { el: el, original: original, done: false };
    makeToolbar();
    el.focus({ preventScroll: true });
    try {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (err) { /* ignore */ }
    post('inline-start', { eid: eidOf(el) });
    el.addEventListener('input', onInlineInput, false);
    el.addEventListener('blur', onInlineBlur, false);
  }

  function onInlineInput() {
    if (!inline) return;
    clearTimeout(inline.timer);
    inline.timer = setTimeout(function () {
      if (!inline) return;
      post('inline-input', {
        eid: eidOf(inline.el),
        html: innerHtmlOf(inline.el),
      });
    }, 320);
  }

  function onInlineBlur() {
    if (!inline || inline.done) return;
    setTimeout(function () {
      if (!inline || inline.done) return;
      if (toolbar && toolbar.matches(':hover')) return;
      var active = document.activeElement;
      if (active === inline.el || (toolbar && toolbar.contains(active))) return;
      finishInline('commit');
    }, 140);
  }

  function finishInline(action) {
    if (!inline || inline.done) return;
    inline.done = true;
    clearTimeout(inline.timer);
    var el = inline.el;
    var original = inline.original;
    el.removeEventListener('input', onInlineInput, false);
    el.removeEventListener('blur', onInlineBlur, false);
    el.removeAttribute('contenteditable');
    el.removeAttribute('spellcheck');
    el.removeAttribute('data-editor-inline');
    document.documentElement.classList.remove('editor-inline-active');
    var html = innerHtmlOf(el);
    if (toolbar) {
      toolbar.remove();
      toolbar = null;
    }
    inline = null;
    if (action === 'cancel') {
      el.innerHTML = original;
      post('inline-cancel', { eid: eidOf(el) });
    } else if (html !== original) {
      post('inline-commit', { eid: eidOf(el), html: html });
    } else {
      post('inline-cancel', { eid: eidOf(el) });
    }
    selectElement(el);
  }

  function onKeyDown(event) {
    if (!inline) {
      var mod = event.ctrlKey || event.metaKey;
      if (mod && (event.key === 'z' || event.key === 'Z')) {
        if (mode === 'edit') {
          event.preventDefault();
          post('shortcut', { action: event.shiftKey ? 'redo' : 'undo' });
        }
        return;
      }
      if (mod && (event.key === 's' || event.key === 'S')) {
        if (mode === 'edit') {
          event.preventDefault();
          post('shortcut', { action: 'save' });
        }
        return;
      }
      if (event.key === 'Escape' && mode === 'edit') {
        clearSelection();
        post('deselected');
        event.stopPropagation();
      }
      return;
    }
    if ((event.ctrlKey || event.metaKey) && (event.key === 's' || event.key === 'S')) {
      event.preventDefault();
      finishInline('commit');
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      finishInline('cancel');
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      finishInline('commit');
      return;
    }
    if (event.key === 'Enter') {
      // 单元素编辑不做块级拆分，回车写成 <br>，避免结构跑出所选元素。
      event.preventDefault();
      document.execCommand('insertLineBreak', false, null);
      document.dispatchEvent(new Event('input'));
    }
  }

  function setMode(nextMode) {
    mode = nextMode === 'preview' ? 'preview' : 'edit';
    document.documentElement.classList.toggle('editor-mode', mode === 'edit');
    document.documentElement.classList.remove('editor-hovering');
    if (mode === 'preview') {
      if (inline) finishInline('commit');
      clearSelection();
      clearHover();
      post('deselected');
    }
  }

  function setDark(value) {
    dark = Boolean(value);
    document.documentElement.classList.toggle('editor-dark', dark);
  }

  function applyTheme(payload) {
    var id = 'editor-live-theme';
    var style = document.getElementById(id);
    if (!style) {
      style = document.createElement('style');
      style.id = id;
      document.head.appendChild(style);
    }
    var light = payload && payload.light ? payload.light : {};
    var darkVars = payload && payload.dark ? payload.dark : {};
    var css = ':root { ' + Object.keys(light).map(function (k) {
      return k + ': ' + light[k] + ';';
    }).join(' ') + ' }\nhtml.editor-dark { ' + Object.keys(darkVars).map(function (k) {
      return k + ': ' + darkVars[k] + ';';
    }).join(' ') + ' }';
    style.textContent = css;
  }

  function byEid(eid) {
    return document.querySelector('[data-eid="' + String(eid).replace(/"/g, '\\"') + '"]');
  }

  function updateEntry(payload) {
    var el = byEid(payload.eid);
    if (!el) return;
    el.setAttribute('href', payload.href || '#');
    if (payload.target) el.setAttribute('target', payload.target);
    else el.removeAttribute('target');
    if (payload.newTab) el.setAttribute('rel', 'noopener');
    var titleEl = el.querySelector('.t');
    var descEl = el.querySelector('.d');
    if (titleEl) titleEl.textContent = payload.title || '';
    if (descEl) descEl.textContent = payload.desc || '';
  }

  function updateFigure(payload) {
    var el = byEid(payload.eid);
    if (!el) return;
    var fig = el.tagName === 'FIGURE' ? el : el.closest('figure');
    if (!fig) return;
    var img = fig.querySelector('img');
    var cap = fig.querySelector('figcaption');
    if (img) {
      if (payload.src) {
        var sameSrc = String(payload.src).replace(/^\.?\//, '') ===
          String(img.getAttribute('src') || '').replace(/^\.?\//, '');
        img.setAttribute('src', payload.src);
        /* 只有真的换图才丢掉旧的 srcset/data-full；改标题时保留 */
        if (!sameSrc) {
          img.removeAttribute('srcset');
          img.removeAttribute('data-full');
        }
      }
      if (payload.width) img.setAttribute('width', payload.width);
      if (payload.height) img.setAttribute('height', payload.height);
      if (Object.prototype.hasOwnProperty.call(payload, 'alt')) img.setAttribute('alt', payload.alt || '');
      var w = parseFloat(img.getAttribute('width'));
      var h = parseFloat(img.getAttribute('height'));
      if (w > 0 && h > 0) fig.style.setProperty('--gn', String(w / h));
    }
    if (cap && Object.prototype.hasOwnProperty.call(payload, 'caption')) {
      cap.textContent = payload.caption || '';
    }
  }

  function onMessage(event) {
    if (event.source !== parent) return;
    var data = event.data || {};
    if (data.source !== 'homepage-editor') return;
    switch (data.type) {
      case 'init':
        setMode(data.mode);
        setDark(data.dark);
        if (data.theme) applyTheme(data.theme);
        if (data.avatar) updateAvatars(data.avatar);
        break;
      case 'setMode':
        setMode(data.mode);
        break;
      case 'setDark':
        setDark(data.dark);
        break;
      case 'applyTheme':
        applyTheme(data.theme || data);
        break;
      case 'updateEntry':
        updateEntry(data.payload || data);
        break;
      case 'updateFigure':
        updateFigure(data.payload || data);
        break;
      case 'updateHtml': {
        var el = byEid(data.eid);
        if (el && !inline) el.innerHTML = data.html || '';
        break;
      }
      case 'updateText': {
        var t = byEid(data.eid);
        if (t && !inline) t.textContent = data.text || '';
        break;
      }
      case 'updateAttrs': {
        var node = byEid(data.eid);
        if (!node) break;
        Object.keys(data.attrs || {}).forEach(function (name) {
          var value = data.attrs[name];
          if (value === null || value === undefined) node.removeAttribute(name);
          else node.setAttribute(name, value);
        });
        break;
      }
      case 'setAvatars':
        updateAvatars(data.url);
        break;
      case 'setDocTitle':
        document.title = data.title || document.title;
        break;
      case 'setFooterText': {
        var footer = document.querySelector('main.content > footer');
        if (footer) footer.textContent = data.text || '';
        break;
      }
      case 'setCoverDate': {
        var mutedDate = document.querySelector('main.content > p.muted');
        if (mutedDate) mutedDate.textContent = data.date || '';
        break;
      }
      case 'setCoverTitle': {
        var suffix = ' | XiaAo';
        var current = document.title || '';
        var pipe = current.lastIndexOf(' | ');
        if (pipe !== -1) suffix = current.slice(pipe);
        document.title = (data.title || '') + suffix;
        var h1 = document.querySelector('main.content > h1');
        if (h1) h1.textContent = data.title || '';
        var back = document.querySelector('.note-bar .back');
        if (back) back.textContent = '← 返回《' + (data.title || '') + '》';
        break;
      }
      case 'commitInline':
        if (inline) finishInline('commit');
        break;
      case 'scrollTo':
        window.scrollTo(0, Number(data.y) || 0);
        break;
      case 'deselect':
        clearSelection();
        break;
      case 'selectEid': {
        var pick = byEid(data.eid);
        if (pick) {
          selectElement(pick);
          try { pick.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { /* ignore */ }
        }
        break;
      }
      default:
        break;
    }
  }

  function updateAvatars(url) {
    if (!url) return;
    var bust = url + (url.indexOf('?') === -1 ? '?' : '&') + 'v=' + Date.now();
    document.querySelectorAll('img.avatar').forEach(function (img) {
      img.setAttribute('src', bust);
    });
  }

  function boot() {
    if (dark) document.documentElement.classList.add('editor-dark');
    document.documentElement.classList.add('editor-mode');
    document.addEventListener('click', onClick, true);
    document.addEventListener('dblclick', onDblClick, true);
    document.addEventListener('pointermove', onPointerMove, { passive: true, capture: true });
    document.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('message', onMessage);
    post('ready', { title: document.title });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
