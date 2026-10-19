/**
 * 本地 Git 状态与一键发布。
 * 只执行普通 add / commit / push，不 force、不跳过 hooks。
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

function clean(value) {
  return String(value ?? '').trim();
}

function sanitizeMessage(value) {
  const text = String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200);
  if (text) return text;
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `更新主页内容 · ${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

async function runGit(root, args, { timeout = 20000 } = {}) {
  const startedAt = Date.now();
  try {
    const result = await execFileAsync('git', args, {
      cwd: root,
      encoding: 'utf8',
      timeout,
      maxBuffer: 20 * 1024 * 1024,
      windowsHide: true,
      env: {
        ...process.env,
        GIT_TERMINAL_PROMPT: '0',
        GIT_OPTIONAL_LOCKS: '0',
      },
    });
    return {
      ok: true,
      code: 0,
      stdout: String(result.stdout || ''),
      stderr: String(result.stderr || ''),
      duration: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      ok: false,
      code: Number.isInteger(error.code) ? error.code : -1,
      stdout: String(error.stdout || ''),
      stderr: String(error.stderr || ''),
      message: error.killed ? 'Git 命令超时' : (error.message || 'Git 命令执行失败'),
      duration: Date.now() - startedAt,
    };
  }
}

function parseStatusLines(output) {
  return String(output || '')
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);
}

async function getRemote(root, preferred = 'origin') {
  const list = await runGit(root, ['remote'], { timeout: 5000 });
  const names = parseStatusLines(list.stdout);
  const name = names.includes(preferred) ? preferred : (names[0] || '');
  if (!name) return { name: '', url: '' };
  const url = await runGit(root, ['remote', 'get-url', name], { timeout: 5000 });
  return { name, url: clean(url.stdout) };
}

export async function getGitStatus(root) {
  const repo = await runGit(root, ['rev-parse', '--is-inside-work-tree'], { timeout: 5000 });
  if (!repo.ok || clean(repo.stdout) !== 'true') {
    return {
      available: false,
      error: '当前站点目录不是 Git 仓库，无法用一键发布。',
      detail: [repo.message, repo.stderr].filter(Boolean).join('\n').slice(-4000),
    };
  }
  const branchResult = await runGit(root, ['rev-parse', '--abbrev-ref', 'HEAD'], { timeout: 5000 });
  const branch = clean(branchResult.stdout) || 'HEAD';
  const statusResult = await runGit(root, ['status', '--porcelain=v1'], { timeout: 8000 });
  if (!statusResult.ok) {
    return {
      available: false,
      error: '读取 Git 状态失败。',
      detail: [statusResult.message, statusResult.stderr].filter(Boolean).join('\n').slice(-4000),
    };
  }
  const lines = parseStatusLines(statusResult.stdout);
  const files = lines.slice(0, 200);
  const { name: remote, url: remoteUrl } = await getRemote(root);
  let upstream = '';
  let ahead = 0;
  const upstreamResult = await runGit(root, ['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}'], { timeout: 5000 });
  if (upstreamResult.ok) {
    upstream = clean(upstreamResult.stdout);
    if (upstream) {
      const aheadResult = await runGit(root, ['rev-list', '--count', `${upstream}..HEAD`], { timeout: 8000 });
      const count = Number.parseInt(clean(aheadResult.stdout), 10);
      ahead = Number.isFinite(count) ? count : 0;
    }
  }
  const lastResult = await runGit(root, ['log', '-1', '--format=%h%x09%s'], { timeout: 5000 });
  const lastCommit = lastResult.ok ? clean(lastResult.stdout) : '';
  return {
    available: true,
    branch,
    detached: branch === 'HEAD',
    remote,
    remoteUrl,
    upstream,
    ahead,
    dirty: lines.length > 0,
    fileCount: lines.length,
    files,
    statusText: lines.slice(0, 80).join('\n'),
    lastCommit,
    commandsOk: true,
  };
}

export async function publishRepo(root, messageInput) {
  const status = await getGitStatus(root);
  if (!status.available) {
    return { ok: false, committed: false, pushed: false, error: status.error, output: status.detail || '', status };
  }
  if (status.detached) {
    return { ok: false, committed: false, pushed: false, error: '当前处于 detached HEAD 状态，请先切回一个分支再发布。', status };
  }
  if (!status.remote) {
    return { ok: false, committed: false, pushed: false, error: '当前仓库没有配置 Git 远端（remote）。', status };
  }

  const message = sanitizeMessage(messageInput);
  const addResult = await runGit(root, ['add', '-A'], { timeout: 30000 });
  if (!addResult.ok) {
    return {
      ok: false, committed: false, pushed: false,
      error: 'git add 失败。', output: [addResult.message, addResult.stdout, addResult.stderr].filter(Boolean).join('\n'), status,
    };
  }

  const stagedResult = await runGit(root, ['diff', '--cached', '--name-only'], { timeout: 15000 });
  const stagedFiles = parseStatusLines(stagedResult.stdout);
  let committed = false;
  let commit = '';
  let outputParts = [];

  if (stagedFiles.length > 0) {
    const commitResult = await runGit(root, ['commit', '-m', message], { timeout: 60000 });
    outputParts.push(commitResult.stdout, commitResult.stderr);
    if (!commitResult.ok) {
      return {
        ok: false, committed: false, pushed: false,
        error: 'git commit 失败（可能是用户身份、hooks 或文件冲突）。',
        output: outputParts.filter(Boolean).join('\n').slice(-20000),
        stagedFiles,
        status,
      };
    }
    committed = true;
    const hashResult = await runGit(root, ['rev-parse', '--short', 'HEAD'], { timeout: 5000 });
    commit = clean(hashResult.stdout);
  }

  const after = await getGitStatus(root);
  const shouldPush = committed || (after.available && after.ahead > 0);
  if (!shouldPush) {
    return {
      ok: true,
      committed: false,
      pushed: false,
      message: '没有需要发布的新修改。',
      output: outputParts.filter(Boolean).join('\n').slice(-20000),
      status: after,
    };
  }

  const pushArgs = after.upstream
    ? ['push']
    : ['push', '-u', after.remote, after.branch];
  const pushResult = await runGit(root, pushArgs, { timeout: 180000 });
  outputParts.push(pushResult.stdout, pushResult.stderr);
  const output = outputParts.filter(Boolean).join('\n').slice(-20000);

  if (!pushResult.ok) {
    return {
      ok: false,
      committed,
      pushed: false,
      commit,
      branch: status.branch,
      stagedFiles,
      error: committed
        ? '本地提交成功，但推送到远端失败。可以检查网络/代理后再次点发布重试。'
        : '推送失败。',
      output,
      status: after,
    };
  }

  const finalStatus = await getGitStatus(root);
  return {
    ok: true,
    committed,
    pushed: true,
    commit,
    branch: status.branch,
    remote: status.remote,
    message,
    stagedFiles,
    output,
    status: finalStatus,
  };
}

export { sanitizeMessage };
