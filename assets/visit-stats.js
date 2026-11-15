/* 全站访问计数 + 首页统计展示
 *
 * - 每次页面加载向 Abacus 公共计数器 +1（无 Cookie）；
 * - 首页读取 /assets/data/visits.json 的每日累计快照，计算近 7 / 30 天；
 * - 快照由 .github/workflows/update-visits.yml 每天生成。
 *
 * 计数器命名空间与 key 同时定义在 scripts/update-visits.mjs，修改时需同步。
 */
(function () {
  'use strict';

  if (window.__xiaaoVisitStatsLoaded) return;
  window.__xiaaoVisitStatsLoaded = true;

  var API = 'https://abacus.jasoncameron.dev';
  var NAMESPACE = 'xiaao-pixel-gh';
  var KEY = 'site-pageviews';
  var DATA_URL = '/assets/data/visits.json';
  var DAY = 86400000;

  var stats = document.getElementById('visit-stats');

  if (document.prerendering) return;

  function fetchJson(url, extra) {
    var options = {
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer'
    };
    // Abacus 挂掉时连接可能长时间悬着，不设超时会卡住整个渲染（实测全显「—」）
    if (window.AbortSignal && typeof AbortSignal.timeout === 'function') {
      options.signal = AbortSignal.timeout(5000);
    }
    if (extra) {
      Object.keys(extra).forEach(function (key) { options[key] = extra[key]; });
    }
    return fetch(url, options).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    });
  }

  function hitCounter(attempt) {
    attempt = attempt || 0;
    return fetchJson(API + '/hit/' + NAMESPACE + '/' + KEY, { keepalive: true })
      .then(function (data) {
        return typeof data.value === 'number' ? data.value : null;
      })
      .catch(function () {
        // 计数服务偶尔抽风（超时/握手失败），隔 1.5s 重试一次再放弃
        if (attempt < 1) {
          return new Promise(function (resolve) { setTimeout(resolve, 1500); })
            .then(function () { return hitCounter(attempt + 1); });
        }
        return null;
      });
  }

  function readCounter() {
    return fetchJson(API + '/get/' + NAMESPACE + '/' + KEY)
      .then(function (data) {
        return typeof data.value === 'number' ? data.value : null;
      })
      .catch(function () { return null; });
  }

  function readHistory() {
    return fetchJson(DATA_URL).catch(function () { return null; });
  }

  function snapshotTime(day) {
    if (day && day.ts) {
      var ts = Date.parse(day.ts);
      if (isFinite(ts)) return ts;
    }
    if (day && day.date) {
      var fallback = Date.parse(day.date + 'T23:59:59Z');
      if (isFinite(fallback)) return fallback;
    }
    return NaN;
  }

  function baseline(days, windowDays) {
    var cutoff = Date.now() - windowDays * DAY;
    var best = null;
    days.forEach(function (day) {
      var ts = snapshotTime(day);
      if (!isFinite(ts) || ts > cutoff) return;
      if (!best || ts > best.ts) best = { ts: ts, total: Number(day.total) };
    });
    return best && isFinite(best.total) ? best : null;
  }

  function format(n) {
    if (n == null || !isFinite(n)) return '—';
    try { return new Intl.NumberFormat('zh-CN').format(n); }
    catch (e) { return String(n); }
  }

  function setNum(name, value, pendingText) {
    var el = stats.querySelector('[data-stat="' + name + '"]');
    if (!el) return;
    var available = value != null && isFinite(value);
    el.textContent = available ? format(Math.max(0, value)) : '—';
    el.classList.toggle('is-empty', !available);
    if (available) el.removeAttribute('title');
    else if (pendingText) el.setAttribute('title', pendingText);
  }

  function render(total, history, live) {
    if (!stats) return;

    var days = history && Array.isArray(history.days)
      ? history.days.slice().sort(function (a, b) { return snapshotTime(a) - snapshotTime(b); })
      : [];
    var latestSnapshot = days.length ? days[days.length - 1] : null;
    var current = total;
    if (current == null && latestSnapshot) {
      var last = Number(latestSnapshot.total);
      current = isFinite(last) ? last : null;
    }

    var b7 = baseline(days, 7);
    var b30 = baseline(days, 30);
    var v7 = current != null && b7 ? current - b7.total : null;
    var v30 = current != null && b30 ? current - b30.total : null;

    setNum('total', current, '统计服务暂时不可用');
    setNum('7d', v7, '统计满 7 天后显示');
    setNum('30d', v30, '统计满 30 天后显示');
    stats.setAttribute('aria-busy', 'false');

    var note = document.getElementById('visit-stats-note');
    if (note) {
      if (current == null) {
        note.textContent = '统计服务暂时不可用，请稍后再试。';
      } else if (v7 == null || v30 == null) {
        var start = days.length ? days[0].date : '';
        note.textContent = (start ? '自 ' + start + ' 起逐日累积；' : '') +
          '近 7 / 30 天数据统计满对应天数后显示 · 无 Cookie，按页面加载计数';
      } else if (!live) {
        note.textContent = '按页面加载计数 · 未连接实时计数器，显示最近一次快照数字';
      } else {
        note.textContent = '数据每日更新 · 无 Cookie，按页面加载计数';
      }
    }
  }

  if (!stats) {
    hitCounter();
    return;
  }

  /* 渐进渲染：快照先上屏（本地请求毫秒级），实时计数器到了再覆盖。
   * 之前是 Promise.all 串行等计数器——服务抽风时要连吃 3 个超时（十几秒），
   * 页面长时间全显「—」，看起来就像统计坏了。 */
  var current = { total: null, history: null, live: false };

  function rerender() {
    render(current.total, current.history, current.live);
  }

  readHistory().then(function (history) {
    current.history = history;
    if (current.total == null) {
      var days = history && Array.isArray(history.days) ? history.days : [];
      var latest = days.length ? days[days.length - 1] : null;
      var last = latest ? Number(latest.total) : NaN;
      if (isFinite(last)) current.total = last; // 快照兜底，先显示再说
    }
    rerender();
  }).catch(rerender);

  hitCounter().then(function (value) {
    if (value == null) {
      // hit 没成，再用只读接口试一次（能读通也算服务可用）
      return readCounter().then(function (fallback) {
        if (fallback != null) {
          current.total = fallback;
          current.live = true;
          rerender();
        }
      });
    }
    current.total = value;
    current.live = true;
    rerender();
  }).catch(function () { /* 快照渲染已经在上面完成了 */ });
})();
