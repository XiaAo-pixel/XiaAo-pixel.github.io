/** 读取 notes/ 下的生成清单，供首页「最近更新」和书封面目录预览使用。 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { splitFrontmatter } from './html.mjs';

let cache = null;
let cacheAt = 0;

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function readCoverMeta(root, course) {
  const file = path.join(root, course, 'index.html');
  try {
    const raw = await fs.readFile(file, 'utf8');
    const { data } = splitFrontmatter(raw);
    return {
      title: String(data.title || '').trim() || course,
      date: String(data.date || '').trim().slice(0, 10),
    };
  } catch {
    return { title: course, date: '' };
  }
}

async function readSections(root, course) {
  const dir = path.join(root, 'notes', course);
  const sectionsFile = path.join(dir, '.sections.json');
  let sections = [];
  try {
    const raw = await fs.readFile(sectionsFile, 'utf8');
    const data = JSON.parse(raw.replace(/^\ufeff/, ''));
    if (Array.isArray(data)) {
      sections = data
        .filter((item) => item && item.file && item.title)
        .map((item) => ({
          file: String(item.file),
          src: String(item.src || ''),
          order: String(item.order || '').trim(),
          title: String(item.title),
          permalink: String(item.permalink || ''),
        }));
    }
  } catch {
    // 没有 .sections.json 时回退到扫描生成的 ch*.md，方便新克隆的仓库直接用编辑器。
    let files = [];
    try {
      files = (await fs.readdir(dir)).filter((f) => /^ch\d+-\d+\.md$/i.test(f)).sort();
    } catch {
      files = [];
    }
    for (const file of files) {
      try {
        const raw = await fs.readFile(path.join(dir, file), 'utf8');
        const { data } = splitFrontmatter(raw);
        if (!data.title) continue;
        sections.push({
          file,
          src: '',
          order: String(data.order || '').trim(),
          title: String(data.title),
          permalink: String(data.permalink || ''),
        });
      } catch {
        // 忽略单个坏文件
      }
    }
  }

  sections = sections.sort((a, b) => {
    const oa = Number.parseInt(a.order, 10);
    const ob = Number.parseInt(b.order, 10);
    if (Number.isFinite(oa) && Number.isFinite(ob) && oa !== ob) return oa - ob;
    return a.file.localeCompare(b.file, 'en');
  });

  return sections;
}

function chapterTitle(section) {
  const title = String(section.title || '').trim();
  const head = title.split('·')[0].trim();
  return head || title;
}

function sectionLabel(section) {
  const title = String(section.title || '').trim();
  const parts = title.split('·');
  return (parts.length > 1 ? parts[parts.length - 1] : title).trim();
}

function groupChapters(sections) {
  const map = new Map();
  for (const section of sections) {
    if (!map.has(section.order)) {
      map.set(section.order, {
        order: section.order,
        title: chapterTitle(section),
        sections: [],
      });
    }
    map.get(section.order).sections.push(section);
  }
  return [...map.values()];
}

/**
 * @returns {{courses: Array, byCourse: Map, totalSections: number}}
 */
export function invalidateNotesCache() {
  cache = null;
  cacheAt = 0;
}

export async function getNotesIndex(root, { fresh = false } = {}) {
  const now = Date.now();
  if (!fresh && cache && now - cacheAt < 2000) return cache;

  let dirs = [];
  try {
    const entries = await fs.readdir(path.join(root, 'notes'), { withFileTypes: true });
    dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name)
      .filter((name) => !name.startsWith('.') && name !== '_source');
  } catch {
    dirs = [];
  }

  const courses = [];
  for (const course of dirs) {
    const [cover, sections] = await Promise.all([
      readCoverMeta(root, course),
      readSections(root, course),
    ]);
    if (!sections.length) {
      // 还没有拆分小节时，不用它生成任何目录项，首页与线上保持一致。
      continue;
    }
    courses.push({
      course,
      title: cover.title,
      date: cover.date,
      sections,
      chapters: groupChapters(sections),
      count: sections.length,
    });
  }

  courses.sort((a, b) => a.course.localeCompare(b.course, 'en'));
  const byCourse = new Map(courses.map((c) => [c.course, c]));
  const totalSections = courses.reduce((sum, c) => sum + c.count, 0);
  cache = { courses, byCourse, totalSections, loadedAt: Date.now() };
  cacheAt = now;
  return cache;
}

export function sectionDisplayTitle(section) {
  return sectionLabel(section);
}

export function chapterDisplayTitle(chapter) {
  return chapter.title;
}

export async function noteSources(root) {
  const { courses } = await getNotesIndex(root);
  const result = [];
  for (const c of courses) {
    const dir = path.join(root, 'notes', c.course, '_source');
    let files = [];
    try {
      files = (await fs.readdir(dir)).filter((f) => f.toLowerCase().endsWith('.md')).sort();
    } catch {
      files = [];
    }
    for (const file of files) {
      result.push({
        course: c.course,
        courseTitle: c.title,
        file,
        path: `notes/${c.course}/_source/${file}`,
      });
    }
  }
  return result;
}

export async function hasNotes(root) {
  const { courses } = await getNotesIndex(root);
  return courses.length > 0;
}

export async function coverExists(root, course) {
  return exists(path.join(root, course, 'index.html'));
}
