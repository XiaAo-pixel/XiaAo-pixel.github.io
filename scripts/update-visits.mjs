/* 每日写入访问量累计快照，供首页计算近 7 / 30 天。
 * 计数器命名空间与 key 需与 assets/visit-stats.js 保持一致。
 * 由 .github/workflows/update-visits.yml 定时运行（每天 4 次，按日期覆盖写，幂等）。
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const API = 'https://abacus.jasoncameron.dev';
const NAMESPACE = 'xiaao-pixel-gh';
const KEY = 'site-pageviews';
const DATA_FILE = path.resolve('assets/data/visits.json');
const MAX_DAYS = 400;
// Abacus 是免费公益服务，偶尔超时/抽风；工作流一天跑 4 次，
// 这里再加重试，失败就静默退出（保住绿勾），等下一次运行补上。
const RETRIES = 5;
const RETRY_DELAY_MS = 20_000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchOnce() {
  const res = await fetch(`${API}/get/${NAMESPACE}/${KEY}`, {
    headers: { 'user-agent': 'xiaao-site-visits/1.0' },
    signal: AbortSignal.timeout(15_000),
  });
  if (res.status === 404) return 0;
  if (!res.ok) throw new Error(`Abacus API ${res.status}`);
  const data = await res.json();
  if (typeof data.value !== 'number') throw new Error('Unexpected Abacus payload');
  return data.value;
}

async function fetchTotal() {
  let lastError = null;
  for (let attempt = 1; attempt <= RETRIES; attempt += 1) {
    try {
      return await fetchOnce();
    } catch (err) {
      lastError = err;
      console.warn(`Abacus 第 ${attempt}/${RETRIES} 次读取失败：${err.message}`);
      if (attempt < RETRIES) await sleep(RETRY_DELAY_MS);
    }
  }
  throw lastError;
}

let previous = { updated: null, days: [] };
try {
  previous = JSON.parse(await readFile(DATA_FILE, 'utf8'));
} catch (err) {
  if (err.code !== 'ENOENT') throw err;
}

const days = Array.isArray(previous.days) ? previous.days.slice() : [];
let total;
try {
  total = await fetchTotal();
} catch (err) {
  // 全部重试失败：不改文件、不报错，今天先缺一天，下次成功运行会继续累积。
  console.error(`放弃本次快照（Abacus 连续 ${RETRIES} 次失败）：${err.message}`);
  process.exit(0);
}

const now = new Date();
const date = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}).format(now);
const entry = { date, ts: now.toISOString(), total };

const existing = days.findIndex((d) => d && d.date === date);
if (existing >= 0) days[existing] = entry;
else days.push(entry);

days.sort((a, b) => String(a.date).localeCompare(String(b.date)));
const output = {
  updated: now.toISOString(),
  days: days.slice(-MAX_DAYS)
};

await mkdir(path.dirname(DATA_FILE), { recursive: true });
await writeFile(DATA_FILE, JSON.stringify(output, null, 2) + '\n', 'utf8');
console.log(`visit snapshot ${date}: ${total}`);
