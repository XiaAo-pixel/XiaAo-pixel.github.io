/** 自动修改日期：页面页脚、书封面 frontmatter、笔记源 frontmatter。 */
import { buildRegistry, setFrontmatterValue, splitFrontmatter } from './html.mjs';

export function todayIso(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** 只更新页面里第一个 footer 的文案，其余源码原样保留。 */
export function setPageFooterDate(body, date) {
  try {
    const registry = buildRegistry(body, 'page');
    const footer = registry.elements.find((record) => record.tag === 'FOOTER');
    if (!footer || !footer.endTag) return body;
    const text = `最后更新：${date}`;
    if (String(footer.innerSource || '').replace(/<[^>]*>/g, '').trim() === text) return body;
    return body.slice(0, footer.innerStart) + text + body.slice(footer.innerEnd);
  } catch {
    return body;
  }
}

export function setCoverPrefixDate(prefix, date) {
  if (!prefix) return prefix;
  try {
    return setFrontmatterValue(prefix, 'date', date);
  } catch {
    return prefix;
  }
}

/** 笔记源文件：frontmatter date（split-notes 会抄到生成的小节页）。 */
export function setSourceFileDate(raw, date) {
  const { prefix, body } = splitFrontmatter(raw);
  if (!prefix) return raw;
  try {
    return setFrontmatterValue(prefix, 'date', date) + body;
  } catch {
    return raw;
  }
}
