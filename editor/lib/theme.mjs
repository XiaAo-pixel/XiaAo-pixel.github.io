/** style.css 的主题变量读写，以及预览用的深色媒体查询转换。 */
import { applyEdits } from './html.mjs';

const DARK_QUERY_RE = /@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)\s*\{/gi;

function matchingBrace(css, openIndex) {
  let depth = 0;
  let quote = '';
  let comment = false;
  for (let i = openIndex; i < css.length; i++) {
    const ch = css[i];
    const next = css[i + 1];
    if (comment) {
      if (ch === '*' && next === '/') { comment = false; i++; }
      continue;
    }
    if (quote) {
      if (ch === '\\') { i++; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '/' && next === '*') { comment = true; i++; continue; }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function splitSelectors(selector) {
  const out = [];
  let current = '';
  let depth = 0;
  let quote = '';
  for (let i = 0; i < selector.length; i++) {
    const ch = selector[i];
    if (quote) {
      current += ch;
      if (ch === '\\') { current += selector[++i] || ''; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'") { quote = ch; current += ch; continue; }
    if (ch === '(') depth++;
    if (ch === ')') depth = Math.max(0, depth - 1);
    if (ch === ',' && depth === 0) {
      out.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) out.push(current.trim());
  return out;
}

function parseSimpleRules(body) {
  const rules = [];
  let i = 0;
  while (i < body.length) {
    while (i < body.length && /\s/.test(body[i])) i++;
    if (body.startsWith('/*', i)) {
      const end = body.indexOf('*/', i + 2);
      i = end === -1 ? body.length : end + 2;
      continue;
    }
    if (i >= body.length) break;
    const open = body.indexOf('{', i);
    if (open === -1) break;
    const selector = body.slice(i, open).replace(/\/\*[\s\S]*?\*\//g, '').trim();
    const close = matchingBrace(body, open);
    if (close === -1) break;
    const decls = body.slice(open + 1, close);
    if (selector) rules.push({ selector, decls });
    i = close + 1;
  }
  return rules;
}

export function findDarkBlocks(css) {
  const blocks = [];
  const re = new RegExp(DARK_QUERY_RE.source, 'gi');
  let match;
  while ((match = re.exec(css))) {
    const open = css.indexOf('{', match.index);
    const close = matchingBrace(css, open);
    if (close === -1) break;
    blocks.push({ start: match.index, open, close, end: close + 1, body: css.slice(open + 1, close) });
    re.lastIndex = close + 1;
  }
  return blocks;
}

/**
 * 把 style.css 里的 prefers-color-scheme 深色块改写成
 * html.editor-dark 作用域。这样预览可以无视系统主题，稳定切换浅色/深色。
 */
export function transformDarkMedia(css) {
  const blocks = findDarkBlocks(css);
  if (!blocks.length) return absolutizeCssUrls(css);
  const edits = [];
  for (const block of blocks) {
    const rules = parseSimpleRules(block.body);
    const out = [];
    for (const rule of rules) {
      const selectors = splitSelectors(rule.selector).map((sel) => {
        if (sel === ':root' || sel === 'html') return 'html.editor-dark';
        return `.editor-dark ${sel}`;
      });
      if (!selectors.length) continue;
      out.push(`${selectors.join(', ')} {\n${rule.decls.trimEnd()}\n}`);
    }
    edits.push({ start: block.start, end: block.end, text: out.join('\n\n') });
  }
  let result = applyEdits(css, edits);
  result += '\n\nhtml.editor-dark { color-scheme: dark; }\n';
  return absolutizeCssUrls(result);
}

function absolutizeCssUrls(css) {
  return css.replace(/url\(\s*([\"']?)([^\"')]+)\1\s*\)/gi, (match, quote, rawUrl) => {
    const url = String(rawUrl).trim();
    if (!url || url.startsWith('/') || url.startsWith('#') ||
        /^(?:data:|https?:|blob:)/i.test(url)) {
      return match;
    }
    return `url(${quote || '"'}/${url.replace(/^\.\//, '')}${quote || '"'})`;
  });
}

function regionSections(css) {
  const blocks = findDarkBlocks(css);
  const first = blocks[0];
  if (!first) {
    return { lightStart: 0, lightEnd: css.length, darkStart: -1, darkEnd: -1 };
  }
  return {
    lightStart: 0,
    lightEnd: first.start,
    darkStart: first.open + 1,
    darkEnd: first.close,
  };
}

function cssVarIn(css, name, start = 0, end = css.length) {
  const section = css.slice(start, end);
  const re = new RegExp(`--${name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*:\\s*([^;]+);`);
  const m = re.exec(section);
  if (!m) return null;
  return { value: m[1].trim(), start: start + m.index, end: start + m.index + m[0].length };
}

function hexToRgba(hex, alpha) {
  const raw = String(hex || '').replace('#', '').trim();
  let r; let g; let b;
  if (/^[0-9a-f]{3}$/i.test(raw)) {
    r = parseInt(raw[0] + raw[0], 16);
    g = parseInt(raw[1] + raw[1], 16);
    b = parseInt(raw[2] + raw[2], 16);
  } else if (/^[0-9a-f]{6}$/i.test(raw)) {
    r = parseInt(raw.slice(0, 2), 16);
    g = parseInt(raw.slice(2, 4), 16);
    b = parseInt(raw.slice(4, 6), 16);
  } else {
    return null;
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function wallpaperUrlFromCss(value) {
  if (!value || /^none$/i.test(value.trim())) return null;
  const m = /url\(\s*(["']?)([^"')]+)\1\s*\)/i.exec(value);
  return m ? m[2].trim() : null;
}

export function readTheme(css) {
  const darkBlock = findDarkBlocks(css)[0];
  const light = css.slice(0, darkBlock ? darkBlock.start : css.length);
  const dark = darkBlock ? darkBlock.body : light;
  const lightAlpha = cssVarIn(light, 'card-alpha')?.value;
  const darkAlpha = cssVarIn(dark, 'card-alpha')?.value;
  const lightAccent = cssVarIn(light, 'accent')?.value || '#4f6df5';
  const darkAccent = cssVarIn(dark, 'accent')?.value || lightAccent;
  const lightWeak = cssVarIn(light, 'accent-weak')?.value;
  const darkWeak = cssVarIn(dark, 'accent-weak')?.value;
  const wallpaperValue = cssVarIn(light, 'wallpaper')?.value || 'none';
  const wallpaperUrl = wallpaperUrlFromCss(wallpaperValue);
  return {
    cardAlpha: {
      light: clampAlpha(parseFloat(lightAlpha), 0.78),
      dark: clampAlpha(parseFloat(darkAlpha), 0.74),
    },
    accent: {
      light: normalizeAccent(lightAccent, '#4f6df5'),
      dark: normalizeAccent(darkAccent, '#8ea2ff'),
    },
    accentWeak: {
      light: lightWeak || hexToRgba(lightAccent, 0.08) || 'rgba(79, 109, 245, .08)',
      dark: darkWeak || hexToRgba(darkAccent, 0.14) || 'rgba(142, 162, 255, .14)',
    },
    wallpaper: {
      raw: wallpaperValue,
      url: wallpaperUrl,
      none: !wallpaperUrl,
    },
    presets: [
      { name: '靛蓝', light: '#4f6df5', dark: '#8ea2ff' },
      { name: '湖蓝', light: '#0f8b9e', dark: '#57cfe0' },
      { name: '松绿', light: '#26845b', dark: '#69d4a3' },
      { name: '琥珀', light: '#b97712', dark: '#e4b15f' },
      { name: '绛紫', light: '#7a4bd0', dark: '#b79bff' },
      { name: '玫瑰', light: '#c04b7a', dark: '#ee96b9' },
    ],
  };
}

function clampAlpha(value, fallback) {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(1, Math.max(0.2, Math.round(value * 100) / 100));
}

function normalizeAccent(value, fallback) {
  const text = String(value || '').trim();
  return /^#[0-9a-f]{3,8}$/i.test(text) ? text : fallback;
}

function replaceVarIn(css, name, value, start = 0, end = css.length) {
  const found = cssVarIn(css, name, start, end);
  if (!found) return null;
  return { start: found.start, end: found.end, text: `--${name}: ${value};` };
}

/**
 * @param {string} css
 * @param {{cardAlpha?:{light:number,dark:number}, accent?:{light:string,dark:string}, wallpaper?:string|null}} updates
 */
export function updateTheme(css, updates) {
  const { lightStart, lightEnd, darkStart, darkEnd } = regionSections(css);
  const edits = [];

  if (updates.cardAlpha) {
    const light = clampAlpha(Number(updates.cardAlpha.light), 0.78);
    const dark = clampAlpha(Number(updates.cardAlpha.dark), 0.74);
    const e1 = replaceVarIn(css, 'card-alpha', String(light), lightStart, lightEnd);
    const e2 = replaceVarIn(css, 'card-alpha', String(dark), darkStart, darkEnd);
    if (e1) edits.push(e1);
    if (e2) edits.push(e2);
  }

  if (updates.accent) {
    const light = normalizeAccent(updates.accent.light, '#4f6df5');
    const dark = normalizeAccent(updates.accent.dark, '#8ea2ff');
    const weakLight = hexToRgba(light, 0.08);
    const weakDark = hexToRgba(dark, 0.14);
    const e1 = replaceVarIn(css, 'accent', light, lightStart, lightEnd);
    const e2 = replaceVarIn(css, 'accent', dark, darkStart, darkEnd);
    if (e1) edits.push(e1);
    if (e2) edits.push(e2);
    if (weakLight) {
      const w1 = replaceVarIn(css, 'accent-weak', weakLight, lightStart, lightEnd);
      if (w1) edits.push(w1);
    }
    if (weakDark) {
      const w2 = replaceVarIn(css, 'accent-weak', weakDark, darkStart, darkEnd);
      if (w2) edits.push(w2);
    }
  }

  if (Object.hasOwn(updates, 'wallpaper')) {
    let value = 'none';
    if (updates.wallpaper) {
      const clean = String(updates.wallpaper).replaceAll('"', '').replaceAll(';', '').trim();
      if (clean && !/^(?:javascript|data):/i.test(clean)) {
        value = `url("${clean.replace(/^\.\//, '')}")`;
      }
    }
    const e = replaceVarIn(css, 'wallpaper', value, lightStart, lightEnd);
    if (e) edits.push(e);
  }

  if (!edits.length) return css;
  return applyEdits(css, edits);
}

export function liveVars(theme) {
  const light = {};
  const dark = {};
  light['--card-alpha'] = String(theme.cardAlpha.light);
  dark['--card-alpha'] = String(theme.cardAlpha.dark);
  light['--accent'] = theme.accent.light;
  dark['--accent'] = theme.accent.dark;
  const lw = hexToRgba(theme.accent.light, 0.08);
  const dw = hexToRgba(theme.accent.dark, 0.14);
  if (lw) light['--accent-weak'] = lw;
  if (dw) dark['--accent-weak'] = dw;
  if (theme.wallpaper?.url) light['--wallpaper'] = `url("/${theme.wallpaper.url.replace(/^\.?\//, '')}")`;
  else if (theme.wallpaper?.none) light['--wallpaper'] = 'none';
  const css = `:root { ${Object.entries(light).map(([k, v]) => `${k}: ${v};`).join(' ')} }\n` +
    `html.editor-dark { ${Object.entries(dark).map(([k, v]) => `${k}: ${v};`).join(' ')} }`;
  return { vars: { light, dark }, css };
}

export { hexToRgba, wallpaperUrlFromCss };
