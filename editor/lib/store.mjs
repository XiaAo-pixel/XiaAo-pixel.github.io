/** 文件读写、备份与图片上传。 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { sha1 } from './site.mjs';

const lastBackupAt = new Map();
let writeChain = Promise.resolve();

export function serializeWrite(fn) {
  const next = writeChain.then(fn, fn);
  writeChain = next.catch(() => {});
  return next;
}

function inside(root, file) {
  const rel = path.relative(root, file);
  return rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function backupName(rel) {
  const flat = rel.replaceAll('\\', '/').replaceAll('/', '__').replace(/[^\w.\-\u4e00-\u9fff]/g, '_');
  return flat;
}

async function backupIfNeeded(root, file, force = false) {
  const now = Date.now();
  const previous = lastBackupAt.get(file) || 0;
  if (!force && now - previous < 5 * 60 * 1000) return null;
  lastBackupAt.set(file, now);
  let content;
  try {
    content = await fs.readFile(file);
  } catch {
    return null;
  }
  const rel = path.relative(root, file);
  const dir = path.join(root, 'editor', '.backups');
  await ensureDir(dir);
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const target = path.join(dir, `${stamp}__${backupName(rel)}.bak`);
  await fs.writeFile(target, content);
  return target;
}

export async function backupFile(root, file) {
  return backupIfNeeded(root, file, true);
}

async function atomicWrite(file, data) {
  await ensureDir(path.dirname(file));
  const temp = `${file}.editor-tmp-${process.pid}-${Date.now()}`;
  await fs.writeFile(temp, data);
  try {
    await fs.rename(temp, file);
  } catch {
    await fs.copyFile(temp, file);
    await fs.rm(temp, { force: true });
  }
}

export async function writeTextFile(root, file, content) {
  if (!inside(root, file)) throw new Error('拒绝写入站点目录之外的文件');
  const backup = await backupIfNeeded(root, file);
  await atomicWrite(file, content);
  const stat = await fs.stat(file);
  return { backup, hash: sha1(content), mtime: stat.mtimeMs, size: Buffer.byteLength(content, 'utf8') };
}

export async function writeBinaryFile(root, file, buffer) {
  if (!inside(root, file)) throw new Error('拒绝写入站点目录之外的文件');
  await atomicWrite(file, buffer);
  const stat = await fs.stat(file);
  return { size: stat.size, mtime: stat.mtimeMs };
}

export async function readTextFile(root, relPath) {
  const file = path.resolve(root, relPath);
  if (!inside(root, file)) throw new Error('路径越界');
  return fs.readFile(file, 'utf8');
}

export async function saveUpload(root, { kind, dataUrl, width, height }) {
  if (!['avatar', 'photo', 'wallpaper'].includes(kind)) throw new Error('未知的上传类型');
  const m = /^data:(image\/(?:jpeg|jpg|png|webp));base64,([A-Za-z0-9+/=\s]+)$/.exec(String(dataUrl || ''));
  if (!m) throw new Error('图片数据格式不正确');
  const mime = m[1].toLowerCase();
  const buffer = Buffer.from(m[2].replace(/\s+/g, ''), 'base64');
  if (buffer.length < 32) throw new Error('图片内容为空');
  if (buffer.length > 20 * 1024 * 1024) throw new Error('图片超过 20MB，请压缩后再试');

  const w = Math.min(20000, Math.max(1, Number.parseInt(width, 10) || 1));
  const h = Math.min(20000, Math.max(1, Number.parseInt(height, 10) || 1));
  let ext = 'jpg';
  if (mime === 'image/png') ext = 'png';
  if (mime === 'image/webp') ext = 'webp';

  if (kind === 'avatar') {
    // 站内所有页面引用的是 assets/avatar.jpg；上传端已经把头像裁成正方形 JPEG。
    const file = path.join(root, 'assets', 'avatar.jpg');
    await backupIfNeeded(root, file);
    await writeBinaryFile(root, file, buffer);
    return { src: 'assets/avatar.jpg', url: '/assets/avatar.jpg', width: w, height: h, size: buffer.length };
  }

  if (kind === 'wallpaper') {
    const file = path.join(root, 'assets', 'wallpaper.jpg');
    await backupIfNeeded(root, file);
    await writeBinaryFile(root, file, buffer);
    return {
      src: 'assets/wallpaper.jpg',
      url: '/assets/wallpaper.jpg',
      width: w,
      height: h,
      size: buffer.length,
    };
  }

  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-` +
    `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const rand = Math.random().toString(36).slice(2, 6);
  const name = `photo-${stamp}-${rand}.${ext}`;
  const file = path.join(root, 'assets', 'photos', name);
  await writeBinaryFile(root, file, buffer);
  return {
    src: `assets/photos/${name}`,
    url: `/assets/photos/${name}`,
    width: w,
    height: h,
    size: buffer.length,
  };
}

export async function styleFile(root) {
  const file = path.join(root, 'style.css');
  const raw = await fs.readFile(file, 'utf8');
  return { file, raw, hash: sha1(raw) };
}
