<#
  把全站的「最后更新」日期统一刷成今天（或指定日期）。

  改哪些地方：
    1. 两本书封面页 frontmatter 的 date
    2. 笔记源文件 frontmatter 的 date（notes/<课程>/_source/*.md）
       —— split-notes.ps1 会把源文件的 date 抄进生成的小节页，所以改这里就够
    3. 生成的小节页 frontmatter 的 date（防止漏跑 split-notes.ps1）
    4. 卡片版页面页脚的「最后更新：YYYY-MM-DD」

  用法（仓库根目录）：
    powershell -NoProfile -ExecutionPolicy Bypass -File update-dates.ps1
    powershell -NoProfile -ExecutionPolicy Bypass -File update-dates.ps1 -Date 2026-11-01
    powershell -NoProfile -ExecutionPolicy Bypass -File update-dates.ps1 -Check   # 只看会改什么

  注意：脚本自身必须带 UTF-8 BOM，否则 Windows PowerShell 5.1 会按本地代码页读中文注释而出错。
#>
param(
  [string]$Date = '',
  [switch]$Check
)

$ErrorActionPreference = 'Stop'
$root = Split-Path $MyInvocation.MyCommand.Path -Parent
if (-not $Date) { $Date = Get-Date -Format 'yyyy-MM-dd' }
if ($Date -notmatch '^\d{4}-\d{2}-\d{2}$') { throw "日期格式应为 YYYY-MM-DD，收到：$Date" }

Write-Host "目标日期：$Date" -ForegroundColor Cyan
$changed = 0

function Set-FrontDate([string]$path, [string]$date, [switch]$Check) {
  $raw = [System.IO.File]::ReadAllText($path, [System.Text.UTF8Encoding]::new($false))
  if ($raw -notmatch '(?m)^---') { return $false }
  $new = [regex]::Replace($raw, '(?m)^date:\s*[\d-]+\s*$', "date: $date", 1)
  if ($new -eq $raw) { return $false }
  if (-not $Check) { [System.IO.File]::WriteAllText($path, $new, [System.Text.UTF8Encoding]::new($false)) }
  return $true
}

function Set-FooterDate([string]$path, [string]$date, [switch]$Check) {
  $raw = [System.IO.File]::ReadAllText($path, [System.Text.UTF8Encoding]::new($false))
  $new = [regex]::Replace($raw, '最后更新：\d{4}-\d{2}-\d{2}', "最后更新：$date")
  if ($new -eq $raw) { return $false }
  if (-not $Check) { [System.IO.File]::WriteAllText($path, $new, [System.Text.UTF8Encoding]::new($false)) }
  return $true
}

# ---------- 1/2. frontmatter 里的 date：源文件 + 生成文件 + 书封面页 ----------
$frontFiles = @()
$frontFiles += Get-ChildItem (Join-Path $root 'notes') -Recurse -Filter *.md -ErrorAction SilentlyContinue
$frontFiles += Get-ChildItem $root -Directory |
  Where-Object { Test-Path (Join-Path $_.FullName 'index.html') } |
  ForEach-Object { Get-Item (Join-Path $_.FullName 'index.html') }

foreach ($f in $frontFiles) {
  if (Set-FrontDate $f.FullName $Date -Check:$Check) {
    $rel = $f.FullName.Replace("$root\", '')
    Write-Host "  date → $Date   $rel"
    $changed++
  }
}

# ---------- 3. 卡片版页面页脚的「最后更新」 ----------
foreach ($f in (Get-ChildItem $root -Filter *.html -File)) {
  if (Set-FooterDate $f.FullName $Date -Check:$Check) {
    Write-Host "  页脚 → $Date   $($f.Name)"
    $changed++
  }
}

if ($Check) { Write-Host "`n（-Check 模式，未写入）会更新 $changed 处。" -ForegroundColor Yellow }
else { Write-Host "`n已更新 $changed 处日期。" -ForegroundColor Green }
