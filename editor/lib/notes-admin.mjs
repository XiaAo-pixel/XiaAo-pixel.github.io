/**
 * 笔记源文件管理：章节 / 小节的增删改。
 *
 * 站点约定：
 *   notes/<课程>/_source/xxx.md  — 唯一需要维护的 Markdown
 *   notes/<课程>/chNN-MM.md      — split-notes.ps1 生成的小节页
 * 本模块只改 _source，然后调用仓库里的 split-notes.ps1 重新生成小节页。
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { splitFrontmatter } from './html.mjs';
import { invalidateNotesCache } from './notes.mjs';
import { backupFile, writeTextFile } from './store.mjs';
import { setCoverPrefixDate, setPageFooterDate, setSourceFileDate, todayIso } from './dates.mjs';

let sourceCache = null;
let sourceCacheAt = 0;

function sha1(text) {
  return crypto.createHash('sha1').update(text, 'utf8').digest('hex');
}

function validCourse(course) {
  return /^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(String(course || ''));
}

function validateDate(value) {
  const text = String(value || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text) || Number.isNaN(Date.parse(text))) {
    throw new Error('日期格式应为 YYYY-MM-DD');
  }
  return text;
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

function sourceDir(root, course) {
  if (!validCourse(course)) throw new Error('课程代号不合法');
  return path.join(root, 'notes', course, '_source');
}

function chapterPath(root, course, file) {
  const dir = sourceDir(root, course);
  const name = String(file || '');
  if (!name || path.basename(name) !== name || name.startsWith('.') || !/\.md$/i.test(name)) {
    throw new Error('笔记文件名不合法');
  }
  const abs = path.resolve(dir, name);
  if (!abs.startsWith(path.resolve(dir) + path.sep)) throw new Error('笔记路径越界');
  return abs;
}

function trimText(value, max = 1000) {
  return String(value ?? '').replace(/\r\n?/g, '\n').trim().slice(0, max);
}

function inlineTitle(value, max = 200) {
  return trimText(value, max).replace(/\s*\n+\s*/g, ' ');
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function courseTitle(root, course) {
  try {
    const raw = await fs.readFile(path.join(root, course, 'index.html'), 'utf8');
    const { data } = splitFrontmatter(raw);
    return String(data.title || '').trim() || course;
  } catch {
    return course;
  }
}

/**
 * 解析源文件中的 h2 小节。和 split-notes.ps1 一样用行首 `## ` 判断，
 * 不做代码围栏识别，保证管理器和真实切分结果一致。
 */
export function parseSections(raw) {
  const text = String(raw ?? '');
  const { prefix, body } = splitFrontmatter(text);
  const base = prefix.length;
  const lineStarts = [0];
  for (let i = 0; i < body.length; i++) {
    if (body[i] === '\n') lineStarts.push(i + 1);
  }
  const lineAt = (offset) => {
    let lo = 0;
    let hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      if (lineStarts[mid] <= offset) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };
  const matches = [];
  const re = /^##[ \t]+(.+?)[ \t]*$/gm;
  let m;
  while ((m = re.exec(body))) {
    const start = base + m.index;
    matches.push({
      index: matches.length,
      title: m[1].trim(),
      line: lineAt(m.index),
      start,
      end: null,
    });
  }
  for (let i = 0; i < matches.length; i++) {
    matches[i].end = i + 1 < matches.length ? matches[i + 1].start : base + body.length;
  }
  return matches;
}

async function readChapterFile(root, course, file) {
  const abs = chapterPath(root, course, file);
  const raw = await fs.readFile(abs, 'utf8');
  const { prefix, body, data } = splitFrontmatter(raw);
  const sections = parseSections(raw);
  return {
    course,
    file,
    filePath: abs,
    raw,
    prefix,
    body,
    data: {
      title: String(data.title || '').trim(),
      order: String(data.order || '').trim(),
      date: String(data.date || '').trim(),
      course: String(data.course || '').trim(),
    },
    hash: sha1(raw),
    sections: sections.map((s) => ({
      index: s.index,
      title: s.title,
      line: s.line,
      start: s.start,
      end: s.end,
    })),
    sectionCount: sections.length,
    hasFrontmatter: Boolean(prefix),
  };
}

async function readCourseSources(root, course) {
  const dir = sourceDir(root, course);
  let files = [];
  try {
    files = (await fs.readdir(dir)).filter((f) => /\.md$/i.test(f) && !f.startsWith('.')).sort();
  } catch {
    files = [];
  }
  const chapters = [];
  for (const file of files) {
    try {
      const abs = path.join(dir, file);
      const raw = await fs.readFile(abs, 'utf8');
      const { data } = splitFrontmatter(raw);
      const sections = parseSections(raw);
      const orderText = String(data.order || '').trim();
      const orderNum = Number.parseInt(orderText, 10);
      const nameNum = Number.parseInt((/^(\d+)/.exec(file) || [])[1], 10);
      chapters.push({
        file,
        title: String(data.title || '').trim() || file.replace(/\.md$/i, ''),
        order: Number.isFinite(orderNum) ? orderNum : (Number.isFinite(nameNum) ? nameNum : 999),
        orderText,
        date: String(data.date || '').trim(),
        sectionCount: sections.length,
        sectionTitles: sections.map((s) => s.title),
      });
    } catch {
      // 单个文件坏掉不影响其它章节
    }
  }
  chapters.sort((a, b) => a.order - b.order || a.file.localeCompare(b.file, 'en'));
  return chapters;
}

/** 供状态栏和笔记弹窗使用 */
export async function listSourceCourses(root, { fresh = false } = {}) {
  const now = Date.now();
  if (!fresh && sourceCache && now - sourceCacheAt < 1600) return sourceCache;
  let dirs = [];
  try {
    const entries = await fs.readdir(path.join(root, 'notes'), { withFileTypes: true });
    dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name)
      .filter((name) => validCourse(name) && !name.startsWith('_'))
      .sort();
  } catch {
    dirs = [];
  }
  const courses = [];
  for (const course of dirs) {
    const chapters = await readCourseSources(root, course);
    if (!chapters.length) continue;
    const title = await courseTitle(root, course);
    const nextOrder = chapters.reduce((max, c) => Math.max(max, Number.isFinite(c.order) ? c.order : 0), 0) + 1;
    courses.push({ course, title, chapters, nextOrder });
  }
  const result = { courses };
  sourceCache = result;
  sourceCacheAt = now;
  return result;
}

export async function getCourse(root, course, { fresh = false } = {}) {
  const { courses } = await listSourceCourses(root, { fresh });
  const found = courses.find((c) => c.course === course);
  if (!found) throw new Error('课程不存在或还没有笔记源文件');
  return found;
}

export async function readChapter(root, course, file) {
  return readChapterFile(root, course, file);
}

function escapePs(value) {
  return String(value).replaceAll("'", "''");
}

function normalizeManifest(parsed) {
  if (Array.isArray(parsed)) return parsed.filter((item) => item && item.file);
  if (parsed && Array.isArray(parsed.value)) return parsed.value.filter((item) => item && item.file);
  if (parsed && parsed.file) return [parsed];
  if (parsed && parsed.value && parsed.value.file) return [parsed.value];
  return [];
}

async function readManifest(root, course) {
  const file = path.join(root, 'notes', course, '.sections.json');
  try {
    const raw = await fs.readFile(file, 'utf8');
    return normalizeManifest(JSON.parse(raw.replace(/^\ufeff/, '')));
  } catch {
    return [];
  }
}

/**
 * 运行切分脚本，并额外做一次清理兜底：
 * PowerShell 脚本偶尔会因为旧清单缺失而留下过期的 chNN-MM.md；
 * 这里对比前后清单，并按本章序号扫描，确保删掉的小节页不会残留。
 */
export async function runSplitNotes(root, course, { cleanupOrder = null } = {}) {
  const script = path.join(root, 'split-notes.ps1');
  if (!(await exists(script))) {
    return { ok: false, code: -1, output: '找不到 split-notes.ps1' };
  }
  const exe = process.platform === 'win32' ? 'powershell.exe' : 'pwsh';
  const command = [
    '$OutputEncoding = [Console]::OutputEncoding = [Text.Encoding]::UTF8;',
    'chcp 65001 > $null;',
    `& '${escapePs(script)}' -Course '${escapePs(course)}'`,
  ].join(' ');
  const oldManifest = await readManifest(root, course);
  return new Promise((resolve) => {
    const startedAt = Date.now();
    let stdout = '';
    let stderr = '';
    let finished = false;
    let child;
    try {
      child = spawn(exe, ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', command], {
        cwd: root,
        windowsHide: true,
        env: process.env,
      });
    } catch (error) {
      resolve({ ok: false, code: -1, output: `无法启动 PowerShell：${error.message}`, duration: 0 });
      return;
    }
    const finish = async (result) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      const duration = Date.now() - startedAt;
      invalidateNotesCache();
      sourceCache = null;
      sourceCacheAt = 0;
      let output = [stdout, stderr].filter(Boolean).join('\n').trim().slice(-30000);
      if (result.ok) {
        try {
          const newManifest = await readManifest(root, course);
          const keep = new Set(newManifest.map((item) => String(item.file)));
          const removed = new Set();
          for (const item of oldManifest) {
            const name = String(item.file);
            if (keep.has(name)) continue;
            try {
              await fs.rm(path.join(root, 'notes', course, name), { force: true });
              removed.add(name);
            } catch { /* ignore */ }
          }
          const orderNo = Number.parseInt(cleanupOrder, 10);
          if (Number.isFinite(orderNo) && orderNo > 0 && orderNo <= 99) {
            const dir = path.join(root, 'notes', course);
            let files = [];
            try { files = await fs.readdir(dir); } catch { files = []; }
            const prefix = `ch${pad2(orderNo)}-`;
            for (const name of files) {
              if (!name.startsWith(prefix) || !/^ch\d{2}-\d{2}\.md$/i.test(name) || keep.has(name)) continue;
              try {
                await fs.rm(path.join(dir, name), { force: true });
                removed.add(name);
              } catch { /* ignore */ }
            }
          }
          if (removed.size) {
            output += `\n编辑器兜底清理了 ${removed.size} 个过期小节页：${[...removed].join(', ')}`;
          }
        } catch (error) {
          output += `\n清理过期小节页时出错：${error.message}`;
        }
      }
      resolve({
        duration,
        ok: Boolean(result.ok),
        code: result.code ?? 0,
        output: output.slice(-30000),
      });
    };
    const timer = setTimeout(() => {
      try { child.kill(); } catch { /* ignore */ }
      finish({ ok: false, code: -2, output: '切分小节超时（120 秒），请检查脚本或手动运行 split-notes.ps1。' }).catch(() => {});
    }, 120000);
    child.stdout?.on('data', (chunk) => { stdout += chunk.toString('utf8'); });
    child.stderr?.on('data', (chunk) => { stderr += chunk.toString('utf8'); });
    child.on('error', (error) => { finish({ ok: false, code: -1, output: error.message }).catch(() => {}); });
    child.on('close', (code) => { finish({ ok: code === 0, code: code ?? -1 }).catch(() => {}); });
  });
}

function sourceFileTemplate({ course, order, title, date, sectionTitle, sectionContent }) {
  const escapedTitle = String(title).replace(/"/g, '\\"');
  const section = inlineTitle(sectionTitle, 200) || `${order}.1 新小节`;
  const content = String(sectionContent ?? '').trim() || '待补充。';
  return `---
layout: note
kind: note
title: "${escapedTitle}"
course: ${course}
order: ${order}
date: ${date}
---

# ${title}

## ${section}

${content}
`;
}

async function touchRelatedDates(root, course) {
  const date = todayIso();
  const warnings = [];
  const coverPath = path.join(root, course, 'index.html');
  try {
    const raw = await fs.readFile(coverPath, 'utf8');
    const { prefix, body, data } = splitFrontmatter(raw);
    const current = String(data.date || '').slice(0, 10);
    if (prefix && current !== date) {
      await writeTextFile(root, coverPath, setCoverPrefixDate(prefix, date) + body);
    }
  } catch (error) {
    warnings.push(`封面日期未更新：${error.message}`);
  }
  const indexPath = path.join(root, 'index.html');
  try {
    const raw = await fs.readFile(indexPath, 'utf8');
    const { prefix, body } = splitFrontmatter(raw);
    const next = prefix + setPageFooterDate(body, date);
    if (next !== raw) await writeTextFile(root, indexPath, next);
  } catch (error) {
    warnings.push(`首页日期未更新：${error.message}`);
  }
  invalidateNotesCache();
  return warnings;
}

function mergeDateWarnings(split, warnings) {
  if (!warnings?.length) return split;
  const text = `\n自动更新相关日期时出现提示：\n${warnings.join('\n')}`;
  return { ...split, output: `${split.output || ''}${text}`.slice(-30000) };
}

export async function createChapter(root, input) {
  const course = String(input.course || '').trim();
  if (!validCourse(course)) throw new Error('课程代号不合法');
  const notesDir = path.join(root, 'notes', course);
  if (!(await exists(notesDir))) throw new Error('课程目录不存在');
  const title = inlineTitle(input.title, 200);
  if (!title) throw new Error('章标题不能为空');
  const order = Number.parseInt(input.order, 10);
  if (!Number.isFinite(order) || order < 1 || order > 99) throw new Error('章号应为 1–99');
  const date = validateDate(input.date || todayIso());
  const chapters = await readCourseSources(root, course);
  if (chapters.some((c) => Number.isFinite(c.order) && c.order === order)) {
    throw new Error(`第 ${order} 章已存在，请使用其它章号`);
  }
  let file = String(input.fileName || '').trim() || `${pad2(order)}_New_Chapter.md`;
  if (!/\.md$/i.test(file)) file += '.md';
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*\.md$/.test(file)) {
    throw new Error('文件名只能用英文字母、数字、点、下划线和短横线，并以 .md 结尾');
  }
  const abs = chapterPath(root, course, file);
  if (await exists(abs)) throw new Error('同名笔记文件已经存在');

  const raw = sourceFileTemplate({
    course,
    order,
    title,
    date,
    sectionTitle: input.firstSectionTitle,
    sectionContent: input.firstSectionContent,
  });
  await writeTextFile(root, abs, raw);
  let split = await runSplitNotes(root, course, { cleanupOrder: order });
  split = mergeDateWarnings(split, await touchRelatedDates(root, course));
  sourceCache = null;
  sourceCacheAt = 0;
  return {
    split,
    chapter: await readChapterFile(root, course, file),
    course: await getCourse(root, course, { fresh: true }),
  };
}

export async function saveChapter(root, input) {
  const course = String(input.course || '').trim();
  const file = String(input.file || '');
  let source = String(input.source ?? '');
  if (!source.trim()) throw new Error('笔记内容不能为空');
  if (Buffer.byteLength(source, 'utf8') > 2 * 1024 * 1024) throw new Error('笔记超过 2MB');
  const chapter = await readChapterFile(root, course, file);
  if (input.baseHash && chapter.hash !== input.baseHash) {
    const error = new Error('笔记文件已被其它程序修改，请重新载入后再保存');
    error.status = 409;
    error.conflict = true;
    throw error;
  }
  const parsed = splitFrontmatter(source);
  if (!parsed.prefix) throw new Error('源文件需要保留开头的 frontmatter');
  if (parsed.data.course && String(parsed.data.course).trim() !== course) {
    throw new Error('frontmatter 里的 course 与当前课程不一致');
  }
  source = setSourceFileDate(source, todayIso());
  await writeTextFile(root, chapter.filePath, source);
  let split = await runSplitNotes(root, course, { cleanupOrder: chapter.data.order });
  split = mergeDateWarnings(split, await touchRelatedDates(root, course));
  sourceCache = null;
  sourceCacheAt = 0;
  return {
    split,
    chapter: await readChapterFile(root, course, file),
    course: await getCourse(root, course, { fresh: true }),
  };
}

async function removeGeneratedCourseIfEmpty(root, course) {
  const dir = path.join(root, 'notes', course);
  const manifestPath = path.join(dir, '.sections.json');
  let generated = [];
  try {
    const raw = await fs.readFile(manifestPath, 'utf8');
    generated = normalizeManifest(JSON.parse(raw.replace(/^\ufeff/, '')));
  } catch {
    generated = [];
  }
  for (const item of generated) {
    if (!item?.file) continue;
    try { await fs.rm(path.join(dir, String(item.file)), { force: true }); } catch { /* ignore */ }
  }
  try { await fs.rm(manifestPath, { force: true }); } catch { /* ignore */ }
  return generated.length;
}

export async function deleteChapter(root, input) {
  const course = String(input.course || '').trim();
  const file = String(input.file || '');
  const chapter = await readChapterFile(root, course, file);
  if (input.baseHash && chapter.hash !== input.baseHash) {
    const error = new Error('笔记文件已被其它程序修改，请重新载入后再删除');
    error.status = 409;
    error.conflict = true;
    throw error;
  }
  await backupFile(root, chapter.filePath);
  await fs.rm(chapter.filePath, { force: true });
  sourceCache = null;
  sourceCacheAt = 0;
  const remaining = await readCourseSources(root, course);
  let split;
  if (remaining.length === 0) {
    const cleaned = await removeGeneratedCourseIfEmpty(root, course);
    split = {
      ok: true,
      code: 0,
      duration: 0,
      output: `课程已没有源文件，清除了 ${cleaned} 个生成的小节页。`,
    };
    invalidateNotesCache();
  } else {
    split = await runSplitNotes(root, course, { cleanupOrder: chapter.data.order });
  }
  split = mergeDateWarnings(split, await touchRelatedDates(root, course));
  let courseData;
  try {
    courseData = await getCourse(root, course, { fresh: true });
  } catch {
    courseData = { course, title: course, chapters: [], nextOrder: 1 };
  }
  return { split, course: courseData };
}

export async function addSection(root, input) {
  const course = String(input.course || '').trim();
  const file = String(input.file || '');
  const title = inlineTitle(input.title, 200);
  if (!title) throw new Error('小节标题不能为空');
  const chapter = await readChapterFile(root, course, file);
  if (input.baseHash && chapter.hash !== input.baseHash) {
    const error = new Error('笔记文件已被其它程序修改，请重新载入后再添加');
    error.status = 409;
    error.conflict = true;
    throw error;
  }
  const nl = chapter.raw.includes('\r\n') ? '\r\n' : '\n';
  const content = String(input.content ?? '').trim();
  const body = chapter.raw.trimEnd();
  const nextSource = setSourceFileDate(`${body}${nl}${nl}## ${title}${nl}${nl}${content || '待补充。'}${nl}`, todayIso());
  await writeTextFile(root, chapter.filePath, nextSource);
  let split = await runSplitNotes(root, course, { cleanupOrder: chapter.data.order });
  split = mergeDateWarnings(split, await touchRelatedDates(root, course));
  sourceCache = null;
  sourceCacheAt = 0;
  return {
    split,
    chapter: await readChapterFile(root, course, file),
    course: await getCourse(root, course, { fresh: true }),
  };
}

export async function deleteSection(root, input) {
  const course = String(input.course || '').trim();
  const file = String(input.file || '');
  const index = Number.parseInt(input.index, 10);
  const chapter = await readChapterFile(root, course, file);
  if (input.baseHash && chapter.hash !== input.baseHash) {
    const error = new Error('笔记文件已被其它程序修改，请重新载入后再删除');
    error.status = 409;
    error.conflict = true;
    throw error;
  }
  const sections = parseSections(chapter.raw);
  if (!Number.isFinite(index) || index < 0 || index >= sections.length) {
    throw new Error('小节不存在，可能已被其它修改刷新，请重新载入');
  }
  const target = sections[index];
  let next = chapter.raw.slice(0, target.start) + chapter.raw.slice(target.end);
  if (!next.endsWith('\n')) next += '\n';
  next = setSourceFileDate(next, todayIso());
  await writeTextFile(root, chapter.filePath, next);
  let split = await runSplitNotes(root, course, { cleanupOrder: chapter.data.order });
  split = mergeDateWarnings(split, await touchRelatedDates(root, course));
  sourceCache = null;
  sourceCacheAt = 0;
  return {
    split,
    chapter: await readChapterFile(root, course, file),
    course: await getCourse(root, course, { fresh: true }),
  };
}

export { sha1 };
