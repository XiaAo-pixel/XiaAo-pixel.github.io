/* 每日写入访问量累计快照，供首页计算近 7 / 30 天。
 * 计数器命名空间与 key 需与 assets/visit-stats.js 保持一致。
 * 由 .github/workflows/update-visits.yml 定时运行。
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const API = 'https://abacus.jasoncameron.dev';
const NAMESPACE = 'xiaao-pixel-gh';
const KEY = 'site-pageviews';
const DATA_FILE = path.resolve('assets/data/visits.json');
const MAX_DAYS = 400;

async function fetchTotal() {
  const res = await fetch(`${API}/get/${NAMESPACE}/${KEY}`, {
    headers: { 'user-agent': 'xiaao-site-visits/1.0' }
  });
  if (res.status === 404) return 0;
  if (!res.ok) throw new Error(`Abacus API ${res.status}`);
  const data = await res.json();
  if (typeof data.value !== 'number') throw new Error('Unexpected Abacus payload');
  return data.value;
}

let previous = { updated: null, days: [] };
try {
  previous = JSON.parse(await readFile(DATA_FILE, 'utf8'));
} catch (err) {
  if (err.code !== 'ENOENT') throw err;
}

const days = Array.isArray(previous.days) ? previous.days.slice() : [];
const total = await fetchTotal();
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
