/** PDF 笔记库：上传、改名/分类、删除，以及 pdf/manifest.json 的维护。 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { writeTextFile, writeBinaryFile, backupFile } from './store.mjs';
import { todayIso } from './dates.mjs';

// PDF 文件统一平铺在 pdf/files/ 下；分类只是 manifest 里的元数据，不建子目录，
// 这样改名/改分类都不会动文件路径，阅读进度和已分享的链接不会失效。
// 缩略图放在 pdf/thumbs/<同名无扩展名>.png，路径由 PDF 文件名唯一决定。
const PDF_DIRNAME = 'pdf';
const PDF_FILES_SUBDIR = 'files';
const PDF_THUMBS_SUBDIR = 'thumbs';
const MANIFEST_REL = 'pdf/manifest.json';
const MAX_PDF_BYTES = 100 * 1024 * 1024; // GitHub Pages 单文件硬上限
const MAX_THUMB_BYTES = 2 * 1024 * 1024;

const WINDOWS_RESERVED = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\.|$)/i;

function sanitizePdfName(raw) {
  const base = String(raw || '')
    .split(/[\\/]/).pop()
    // Windows 文件名非法字符 + 控制字符
    .replace(/[\u0000-\u001f\u007f<>:"|?*]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!base) return null;
  if (WINDOWS_RESERVED.test(base)) return null;
  const withExt = /\.pdf$/i.test(base) ? base : `${base}.pdf`;
  if (withExt.length > 150) return null;
  return withExt;
}

/** 客户端传来的「files/xxx.pdf」→ 绝对路径；只接受平铺的一层，防路径穿越。 */
function resolvePdfFile(root, fileRel) {
  const normalized = String(fileRel || '').replaceAll('\\', '/');
  const m = /^files\/(.+)$/i.exec(normalized);
  const name = m ? sanitizePdfName(m[1]) : null;
  if (!name) {
    const error = new Error('PDF 路径不合法');
    error.status = 400;
    throw error;
  }
  return {
    name,
    rel: `files/${name}`,
    abs: path.join(root, PDF_DIRNAME, PDF_FILES_SUBDIR, name),
  };
}

async function readManifest(root) {
  try {
    const raw = await fs.readFile(path.join(root, ...MANIFEST_REL.split('/')), 'utf8');
    const data = JSON.parse(raw);
    if (data && Array.isArray(data.pdfs)) {
      return { version: 1, pdfs: data.pdfs.filter((item) => item && item.file) };
    }
  } catch { /* 不存在或损坏都当空清单，扫描结果会补齐 */ }
  return { version: 1, pdfs: [] };
}

async function writeManifest(root, manifest) {
  manifest.pdfs.sort((a, b) => {
    const ta = String(a.added || ''), tb = String(b.added || '');
    if (ta !== tb) return ta < tb ? 1 : -1;
    return String(a.title || a.file).localeCompare(String(b.title || b.file), 'zh-Hans-CN');
  });
  await writeTextFile(root, path.join(root, ...MANIFEST_REL.split('/')),
    `${JSON.stringify(manifest, null, 2)}\n`);
}

/** 同名文件自动加序号：笔记.pdf → 笔记 (2).pdf → … */
async function dedupeName(root, name) {
  let candidate = name;
  const stem = name.replace(/\.pdf$/i, '');
  for (let i = 2; i < 1000; i += 1) {
    try {
      await fs.access(path.join(root, PDF_DIRNAME, PDF_FILES_SUBDIR, candidate));
    } catch {
      return candidate;
    }
    candidate = `${stem} (${i}).pdf`;
  }
  const error = new Error('文件名重复太多，请换一个名字');
  throw error;
}

async function listPdfFiles(root) {
  const dir = path.join(root, PDF_DIRNAME, PDF_FILES_SUBDIR);
  let entries;
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  const files = [];
  for (const name of entries) {
    if (!/\.pdf$/i.test(name)) continue;
    try {
      const stat = await fs.stat(path.join(dir, name));
      if (!stat.isFile()) continue;
      files.push({ name, size: stat.size, mtimeMs: stat.mtimeMs });
    } catch { /* 读取瞬间被删掉就跳过 */ }
  }
  return files;
}

function thumbAbsFor(root, pdfName) {
  const stem = pdfName.replace(/\.pdf$/i, '');
  return path.join(root, PDF_DIRNAME, PDF_THUMBS_SUBDIR, `${stem}.png`);
}

export async function savePdfThumb(root, { file, dataUrl }) {
  const resolved = resolvePdfFile(root, file);
  const m = /^data:image\/(png|jpeg);base64,([A-Za-z0-9+/=\s]+)$/.exec(String(dataUrl || ''));
  if (!m) throw new Error('缩略图数据格式不正确');
  const buffer = Buffer.from(m[2].replace(/\s+/g, ''), 'base64');
  if (buffer.length < 64) throw new Error('缩略图内容为空');
  if (buffer.length > MAX_THUMB_BYTES) throw new Error('缩略图超过 2MB');

  const abs = thumbAbsFor(root, resolved.name);
  await writeBinaryFile(root, abs, buffer);
  return { file: resolved.rel, thumb: `thumbs/${resolved.name.replace(/\.pdf$/i, '')}.png` };
}

async function listExistingThumbs(root) {
  const dir = path.join(root, PDF_DIRNAME, PDF_THUMBS_SUBDIR);
  try {
    const entries = await fs.readdir(dir);
    return new Set(entries.filter((name) => /\.png$/i.test(name)));
  } catch {
    return new Set();
  }
}

/** 站点页面用的列表：磁盘扫描为准，manifest 只补标题/分类/上传日期。 */
export async function listPdfs(root) {
  const [files, manifest, thumbs] = await Promise.all([
    listPdfFiles(root),
    readManifest(root),
    listExistingThumbs(root),
  ]);
  const metaByFile = new Map(manifest.pdfs.map((item) => [item.file, item]));
  const pdfs = files.map(({ name, size, mtimeMs }) => {
    const rel = `files/${name}`;
    const meta = metaByFile.get(rel) || {};
    return {
      file: rel,
      title: String(meta.title || '').trim() || name.replace(/\.pdf$/i, ''),
      category: String(meta.category || '').trim(),
      size,
      added: String(meta.added || '').trim() || todayIso(new Date(mtimeMs)),
      thumb: thumbs.has(`${name.replace(/\.pdf$/i, '')}.png`),
      mtimeMs,
    };
  });
  pdfs.sort((a, b) => {
    const ta = String(a.added || ''), tb = String(b.added || '');
    if (ta !== tb) return ta < tb ? 1 : -1;
    return a.title.localeCompare(b.title, 'zh-Hans-CN');
  });
  return { pdfs };
}

export async function savePdf(root, { name, category, data }) {
  const cleanName = sanitizePdfName(name);
  if (!cleanName) throw new Error('文件名不合法（不能包含 \\ / : * ? " < > | 等字符）');
  if (!Buffer.isBuffer(data) || data.length === 0) throw new Error('文件内容为空');
  if (data.length > MAX_PDF_BYTES) throw new Error('PDF 超过 100MB（GitHub Pages 上限），无法上传');
  if (!data.subarray(0, 1024).includes('%PDF-')) throw new Error('这不是有效的 PDF 文件');

  const finalName = await dedupeName(root, cleanName);
  const abs = path.join(root, PDF_DIRNAME, PDF_FILES_SUBDIR, finalName);
  const rel = `files/${finalName}`;

  const manifest = await readManifest(root);
  const existing = manifest.pdfs.find((item) => item.file === rel);
  if (existing) await backupFile(root, abs); // 覆盖同名文件前留一份备份
  await writeBinaryFile(root, abs, data);

  const entry = {
    file: rel,
    title: String(existing?.title || '').trim() || finalName.replace(/\.pdf$/i, ''),
    category: String(category ?? existing?.category ?? '').trim(),
    size: data.length,
    added: String(existing?.added || '').trim() || todayIso(),
  };
  if (existing) Object.assign(existing, entry);
  else manifest.pdfs.push(entry);
  await writeManifest(root, manifest);
  return entry;
}

export async function updatePdfMeta(root, { file, title, category }) {
  const resolved = resolvePdfFile(root, file);
  await fs.access(resolved.abs).catch(() => {
    throw new Error('PDF 文件不存在，请先刷新列表');
  });

  const manifest = await readManifest(root);
  const entry = manifest.pdfs.find((item) => item.file === resolved.rel);
  if (!entry) {
    // 文件在而清单没有（比如手动拷进来的），补一条
    const stat = await fs.stat(resolved.abs);
    manifest.pdfs.push({
      file: resolved.rel,
      title: resolved.name.replace(/\.pdf$/i, ''),
      category: '',
      size: stat.size,
      added: todayIso(new Date(stat.mtimeMs)),
    });
  }
  const target = entry || manifest.pdfs[manifest.pdfs.length - 1];
  if (title !== undefined) {
    target.title = String(title).trim() || resolved.name.replace(/\.pdf$/i, '');
  }
  if (category !== undefined) {
    target.category = String(category).trim();
  }
  await writeManifest(root, manifest);
  return target;
}

export async function deletePdf(root, { file }) {
  const resolved = resolvePdfFile(root, file);
  // 删除前挪一份到 editor/.backups（这里已被 Jekyll 排除，不会发布）；
  // 发布过的文件在 git 历史里也能找回，双保险。
  try {
    await fs.access(resolved.abs);
  } catch {
    throw new Error('PDF 文件不存在，请先刷新列表');
  }
  const backupDir = path.join(root, 'editor', '.backups', 'pdf-deleted');
  await fs.mkdir(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupTarget = path.join(backupDir, `${stamp}__${resolved.name}`);
  await fs.rename(resolved.abs, backupTarget).catch(async () => {
    await fs.copyFile(resolved.abs, backupTarget);
    await fs.rm(resolved.abs, { force: true });
  });
  // 缩略图跟着一起删（删不掉就算了，孤立 PNG 无害）
  await fs.rm(thumbAbsFor(root, resolved.name), { force: true }).catch(() => {});

  const manifest = await readManifest(root);
  const next = manifest.pdfs.filter((item) => item.file !== resolved.rel);
  if (next.length !== manifest.pdfs.length) {
    manifest.pdfs = next;
    await writeManifest(root, manifest);
  }
  return { file: resolved.rel, backup: path.basename(backupTarget) };
}
