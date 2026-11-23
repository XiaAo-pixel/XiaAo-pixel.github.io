/**
 * 把《应用随机过程》的「每讲一个 markdown」源文件转换成主页的 Jekyll 小节页。
 *
 * 与其它课程不同：应应笔记源文件本身就是「一讲一页」，所以这里**不**按 h2 再切分
 * （split-notes.ps1 会把一讲切成多页，破坏讲的完整性），而是一讲生成一页，
 * 按课程章节分组供侧栏目录使用。
 *
 * 源文件（外部，唯一事实来源）：
 *   G:/2.数学/概率/2.应用随机过程/markdown笔记/*.md
 * 生成文件（本脚本管理，可删可重建）：
 *   notes/stochastic/ch<章>-<序>.md  +  notes/stochastic/.sections.json
 *
 * 适配（不改正文内容）：
 *   - 加 Jekyll front matter（layout/kind/course/order/chapter/title/date/permalink，含 mermaid 标记）
 *   - 去掉源 h1（页面标题由布局渲染），标题层级整体下移一级（##→### …）
 *   - 行内 $...$ → $$...$$（本站 kramdown 把 $$ 当数学verbatim，单 $ 会被转义/强调破坏）
 *   - 移除「📷 本讲板书」折叠块（指向不存在的 ../板书 图片，死链）；其它折叠块（参考答案）保留并加 markdown="1"
 *   - 讲间 .md 链接重写为线上 permalink
 *
 * 用法：node scripts/build-stochastic-notes.mjs [--src <dir>] [--board remove|text] [--check]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const args = process.argv.slice(2);
function argVal(name, def) {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
}
const SRC = argVal('--src', 'G:/2.数学/概率/2.应用随机过程/markdown笔记');
const BOARD = argVal('--board', 'remove'); // remove | text
const CHECK = args.includes('--check');
const OUT = path.join(ROOT, 'notes', 'stochastic');
const UPLOAD_DATE = '2026-11-23';

// 阅读顺序 + 章节分组映射。key = 源文件名前缀编号（或 'review'）。
// order/seq 决定文件名 ch<order>-<seq> 与线上地址；同一 order 的页在 url 排序下连续。
const PLAN = [
  { key: '00', order: '00', seq: '01', chapter: '总览与导论', label: '记号与结论总览' },
  { key: '01', order: '00', seq: '02', chapter: '总览与导论' },
  { key: '02', order: '00', seq: '03', chapter: '总览与导论' },
  { key: '03', order: '01', seq: '01', chapter: '马氏链' },
  { key: '04', order: '01', seq: '02', chapter: '马氏链' },
  { key: '05', order: '01', seq: '03', chapter: '马氏链' },
  { key: '06', order: '01', seq: '04', chapter: '马氏链' },
  { key: '07', order: '01', seq: '05', chapter: '马氏链' },
  { key: '08', order: '01', seq: '06', chapter: '马氏链' },
  { key: '09', order: '01', seq: '07', chapter: '马氏链' },
  { key: '10', order: '01', seq: '08', chapter: '马氏链' },
  { key: '11', order: '01', seq: '09', chapter: '马氏链' },
  { key: 'review', order: '01', seq: '10', chapter: '马氏链', label: '期中复习 题型与方法速查' },
  { key: '12', order: '02', seq: '01', chapter: '跳过程' },
  { key: '13', order: '02', seq: '02', chapter: '跳过程' },
];

function listSources() {
  return fs.readdirSync(SRC).filter((f) => f.toLowerCase().endsWith('.md'));
}
function keyOf(file) {
  if (/^期中复习/.test(file)) return 'review';
  const m = file.match(/^(\d{2})_/);
  return m ? m[1] : null;
}

// ---- 文本处理工具 ----

// 保护围栏代码块（```mermaid 等），返回占位文本与还原表
function protectFences(text) {
  const fences = [];
  const out = text.replace(/```[\s\S]*?```/g, (block) => {
    fences.push(block);
    return `\u0000FENCE${fences.length - 1}\u0000`;
  });
  return { out, fences };
}
function restoreFences(text, fences) {
  return text.replace(/\u0000FENCE(\d+)\u0000/g, (_m, i) => fences[Number(i)]);
}

// 行内 $...$ → $$...$$；已有 $$...$$（行间/行内）原样保留。
// 做法：按 $$ 切分，偶数段是数学之外文本，只在这些段里配对单 $。
function convertInlineMath(text) {
  const parts = text.split('$$');
  for (let i = 0; i < parts.length; i += 2) {
    parts[i] = parts[i].replace(/\$([^$\n]+?)\$/g, (_m, inner) => `$$${inner}$$`);
  }
  return parts.join('$$');
}

// 标题整体下移一级（## → ### …），h1 已先行移除。围栏已被占位，不会误伤。
function demoteHeaders(text) {
  return text.replace(/^(#{2,5})(\s)/gm, (_m, hashes, sp) => `#${hashes}${sp}`);
}

// 移除源 h1（第一行 # ...）
function stripH1(text) {
  return text.replace(/^#\s+.*\r?\n/, '');
}

// 折叠块处理：板书块按 BOARD 移除或转纯文本；其它块保留并加 markdown="1"
function handleDetails(text) {
  return text.replace(/<details>([\s\S]*?)<\/details>/g, (block, inner) => {
    const isBoard = /本讲板书/.test(inner);
    if (isBoard) {
      if (BOARD === 'text') {
        const plain = inner.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
        return `<details markdown="1">${plain}</details>`;
      }
      return '\u0000REMOVE\u0000'; // 标记删除，稍后连同前置 --- 一起清掉
    }
    return `<details markdown="1">${inner}</details>`;
  });
}
function cleanRemoved(text) {
  // 删除被标记的板书块，以及紧挨其前的分隔线 --- 与多余空行
  let out = text.replace(/(?:\n-{3,}[ \t]*)?\n*\u0000REMOVE\u0000\n*/g, '\n');
  return out;
}

// 讲间 .md 链接 → 线上 permalink
function rewriteLinks(text, linkMap) {
  return text.replace(/\]\(([^)\s]+\.md)\)/g, (m, target) => {
    const base = path.posix.basename(target);
    const perm = linkMap.get(base);
    return perm ? `](${perm})` : m;
  });
}

// 从 h1 提取讲次标题（去掉 $...$ 数学定界，仅留内容），用于页面 title
function labelFromH1(h1, plan) {
  if (plan.label) return plan.label;
  // h1 形如「第 N 讲 · 主题」
  let topic = h1.replace(/^#\s*/, '').trim();
  const m = topic.match(/^第\s*\d+\s*讲\s*·\s*(.*)$/);
  let lecNo = '';
  const noMatch = topic.match(/^第\s*(\d+)\s*讲/);
  if (noMatch) lecNo = noMatch[1];
  if (m) topic = m[1].trim();
  topic = topic.replace(/\$([^$\n]+?)\$/g, '$1'); // $d$ → d
  return lecNo ? `第 ${lecNo} 讲 ${topic}` : topic;
}

function yamlQuote(s) {
  return `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function build() {
  const files = listSources();
  const byKey = new Map();
  for (const f of files) {
    const k = keyOf(f);
    if (k) byKey.set(k, f);
  }
  // 链接映射：源文件名 → permalink
  const linkMap = new Map();
  for (const plan of PLAN) {
    const f = byKey.get(plan.key);
    if (f) linkMap.set(f, `/stochastic/ch${plan.order}-${plan.seq}.html`);
  }

  const manifest = [];
  const report = [];
  for (const plan of PLAN) {
    const file = byKey.get(plan.key);
    if (!file) { report.push(`!! 缺少源文件 key=${plan.key}`); continue; }
    const raw = fs.readFileSync(path.join(SRC, file), 'utf8').replace(/^\uFEFF/, '');
    const h1 = (raw.match(/^#\s+.*$/m) || ['#'])[0];
    const label = labelFromH1(h1, plan);
    const title = `${plan.chapter} · ${label}`;
    const permalink = `/stochastic/ch${plan.order}-${plan.seq}.html`;
    const outName = `ch${plan.order}-${plan.seq}.md`;

    let body = stripH1(raw);
    const hasMermaid = /```mermaid/.test(body);
    const { out: fenced, fences } = protectFences(body);
    let t = convertInlineMath(fenced);
    t = demoteHeaders(t);
    t = handleDetails(t);
    t = cleanRemoved(t);
    t = rewriteLinks(t, linkMap);
    t = restoreFences(t, fences);
    body = t.replace(/\s+$/, '') + '\n';

    // 校验：数学之外（按 $$ 切分的偶数段）不应再有落单 $；
    // 行间数学内部的 $（如 \tag{$*$}）属正常，不计入。
    const outside = body.split('$$').filter((_s, i) => i % 2 === 0).join('');
    const straySingle = (outside.match(/\$/g) || []).length;

    const fm = [
      '---',
      'layout: note',
      'kind: note',
      `title: ${yamlQuote(title)}`,
      'course: stochastic',
      `order: "${plan.order}"`,
      `chapter: ${yamlQuote(plan.chapter)}`,
      `date: ${UPLOAD_DATE}`,
      `permalink: ${permalink}`,
      ...(hasMermaid ? ['mermaid: true'] : []),
      '---',
      '',
    ].join('\n');
    const content = fm + body;

    manifest.push({
      file: outName,
      src: file,
      order: plan.order,
      section: Number(plan.seq),
      title,
      permalink,
    });
    report.push(
      `${file}\n  -> ${outName}  ${permalink}\n  title: ${title}` +
      `${hasMermaid ? '  [mermaid]' : ''}${straySingle !== 0 ? `  !! 落单$=${straySingle}` : ''}`
    );

    if (!CHECK) {
      fs.mkdirSync(OUT, { recursive: true });
      fs.writeFileSync(path.join(OUT, outName), content, 'utf8');
    }
  }

  if (!CHECK) {
    fs.writeFileSync(path.join(OUT, '.sections.json'), JSON.stringify(manifest, null, 4) + '\n', 'utf8');
    // 清理：旧生成页中不在本次清单里的（按 ch 命名扫描）
    const keep = new Set(manifest.map((m) => m.file));
    for (const f of fs.readdirSync(OUT)) {
      if (/^ch\d{2}-\d{2}\.md$/.test(f) && !keep.has(f)) {
        fs.rmSync(path.join(OUT, f));
        report.push(`删除过期生成页 ${f}`);
      }
    }
  }
  console.log(report.join('\n'));
  console.log(`\n共 ${manifest.length} 页。BOARD=${BOARD}${CHECK ? ' (check)' : ''}`);
}

build();