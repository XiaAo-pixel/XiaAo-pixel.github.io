# 把「一章一个 .md」源文件按 h2 切成「一节一页」的生成文件。
#
# 为什么这么做：一节一页（哈佛 bookdown 那种 7.1 / 7.2 / 7.3 各占一页）读长笔记更舒服，
# 但一章一个源文件写起来最省事；于是用本脚本把源文件切开，生成文件全由脚本管理、可删可重建。
#
# 约定：
#   源文件   notes/<课程>/_source/任意名.md  —— 你唯一需要维护的文件
#   生成文件 notes/<课程>/ch<章号>-<节号>.md —— 本脚本生成，别手改（每次运行会被覆盖/清理）
#   清单     notes/<课程>/.sections.json     —— 记录哪些文件是生成的，用于清理重建
#
# 用法（在仓库根目录）：
#   powershell -NoProfile -ExecutionPolicy Bypass -File split-notes.ps1
#   powershell -NoProfile -ExecutionPolicy Bypass -File split-notes.ps1 -Course statistics
#   powershell -NoProfile -ExecutionPolicy Bypass -File split-notes.ps1 -Check   # 只看怎么切，不写文件

param(
  [string]$Course = '',      # 留空 = 处理 notes/ 下所有课程目录
  [switch]$Check             # 只打印切分方案
)

$ErrorActionPreference = 'Stop'
$root = Split-Path $MyInvocation.MyCommand.Path -Parent
$notesRoot = Join-Path $root 'notes'

# ---------- 工具函数 ----------
function Read-Front([string]$path) {
  $text = Get-Content -LiteralPath $path -Encoding UTF8 -Raw
  $m = [regex]::Match($text, '(?s)^---\s*\r?\n(.*?)\r?\n---\s*\r?\n')
  $front = @{}
  if ($m.Success) {
    foreach ($line in ($m.Groups[1].Value -split "\r?\n")) {
      if ($line -match '^([A-Za-z_][\w-]*):\s*(.*)$') { $front[$Matches[1]] = $Matches[2].Trim().Trim('"') }
    }
    return [pscustomobject]@{ Front = $front; Body = $text.Substring($m.Length) }
  }
  return [pscustomobject]@{ Front = $front; Body = $text }
}

function Pad2([int]$n) { return $n.ToString('00') }

# 小节页的 frontmatter（chapter 字段放"章名"，供侧栏分组显示）
# 小节页的 frontmatter：order 写成两位数字串（Jekyll 里按字符串排序即阅读顺序），
# chapter 放"章名"，供侧栏分组显示
function New-FrontMatter([string]$title, [string]$course, [string]$order, [string]$chapterName, [string]$date, [string]$permalink) {
  $t = $title.Replace('"', '\"')
  $c = $chapterName.Replace('"', '\"')
  return @"
---
layout: note
kind: note
title: "$t"
course: $course
order: "$order"
chapter: "$c"
date: $date
permalink: $permalink
---

"@
}

# 把 <div class="tabular"> 里的 LaTeX 表格源码转成 Markdown 表格。
# 源文件里是 LaTeX 语法（\@p0.12p0.30@ 类别 & 形式 & 描述 \\），Markdown 不认；
# 而且 kramdown 会把行尾的 \\ 转义成 \、把连续行并成一段，表格就散架了。
function Convert-Tabular([string]$inner) {
  $lines = @($inner -split "\r?\n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' })
  if ($lines.Count -eq 0) { return $inner }
  $rows = New-Object System.Collections.ArrayList
  $head = ($lines[0] -replace '^\\@[^@]*@\s*', '') -replace '\\+$', ''
  $cells = @($head -split '&' | ForEach-Object { $_.Trim() })
  $colCount = $cells.Count
  if ($colCount -lt 1) { return $inner }
  [void]$rows.Add("| " + ($cells -join ' | ') + " |")
  [void]$rows.Add("|" + (($cells | ForEach-Object { ':---' }) -join '|') + "|")
  for ($i = 1; $i -lt $lines.Count; $i++) {
    $cs = @((($lines[$i] -replace '\\+$', '') -split '&') | ForEach-Object { $_.Trim() })
    if ($cs.Count -gt $colCount) { $cs = $cs[($cs.Count - $colCount)..($cs.Count - 1)] }
    while ($cs.Count -lt $colCount) { $cs = @('') + $cs }
    [void]$rows.Add("| " + ($cs -join ' | ') + " |")
  }
  return ($rows -join "`n")
}

function Convert-AllTabular([string]$body) {
  return [regex]::Replace($body, '(?s)<div class="tabular"[^>]*>(.*?)</div>', {
      param($m)
      '<div class="tabular" markdown="1">' + "`n`n" + (Convert-Tabular $m.Groups[1].Value) + "`n`n" + '</div>'
    })
}

# ---------- 要处理哪些课程 ----------
if ($Course) { $courses = @($Course) }
else { $courses = @(Get-ChildItem $notesRoot -Directory | ForEach-Object { $_.Name }) }

$totalFiles = 0
foreach ($course in $courses) {
  $dir = Join-Path $notesRoot $course
  if (-not (Test-Path $dir)) { Write-Warning "跳过 $course：目录不存在"; continue }

  $manifestPath = Join-Path $dir '.sections.json'
  $generated = @()
  if (Test-Path $manifestPath) {
    $generated = @(Get-Content -LiteralPath $manifestPath -Encoding UTF8 -Raw | ConvertFrom-Json)
  }
  $known = @{}
  foreach ($g in $generated) { $known[$g.file] = $true }

  # 源文件放在目录下（兼容旧结构）或 _source/ 子目录里；
  # 生成文件（ch<章号>-<节号>.md）与上次清单里的文件都排除掉
  $sourceDirs = @($dir) + @(Join-Path $dir '_source')
  $sources = @(
    foreach ($sd in $sourceDirs) {
      if (Test-Path $sd) {
        Get-ChildItem $sd -Filter *.md |
          Where-Object { -not $known.ContainsKey($_.Name) -and $_.Name -notmatch '^ch\d{2}-\d{2}\.md$' }
      }
    }
  ) | Sort-Object { if ($_.Name -match '^第(\d+)章') { [int]$Matches[1] } elseif ($_.Name -match '^(\d+)') { [int]$Matches[1] } else { 999 } }, Name

  if ($sources.Count -eq 0) { Write-Warning "跳过 $course：没有找到源文件"; continue }

  Write-Host ""
  Write-Host "== $course ==" -ForegroundColor Cyan

  $newGenerated = @()
  $usedOrders = @{}

  foreach ($src in $sources) {
    $doc = Read-Front $src.FullName
    $front = $doc.Front

    # 章序号：优先源文件名「第N章」，其次 frontmatter 的 order，最后按顺序递增；重复则顺延
    $chapterNo = 0
    if ($src.Name -match '^第(\d+)章') { $chapterNo = [int]$Matches[1] }
    elseif ($front.ContainsKey('order') -and $front['order'] -match '^\d+$') { $chapterNo = [int]$front['order'] }
    if ($chapterNo -le 0 -or $usedOrders.ContainsKey($chapterNo)) {
      $chapterNo = 1
      while ($usedOrders.ContainsKey($chapterNo)) { $chapterNo++ }
    }
    $usedOrders[$chapterNo] = $true

    $title = if ($front.ContainsKey('title')) { $front['title'] } else { $src.BaseName }
    $date = if ($front.ContainsKey('date')) { $front['date'] } else { (Get-Date -Format 'yyyy-MM-dd') }
    # 去掉标题里的「第 X 章」前缀（章号可能是一位或两位数字，后面可能跟全角/半角空格）
    $chapterName = $title -replace '^第\s*[0-9０-９一二三四五六七八九十]+\s*章[\s　]*', ''

    $body = $doc.Body
    $body = [regex]::Replace($body, '(?m)^#\s+.*\r?\n', '')   # 正文 h1（章标题）由页面 h1 渲染，去掉

    # LaTeX 版式表格先转成 Markdown 表格（必须在加 markdown="1" 之前做）
    $body = Convert-AllTabular $body

    # 给讲义里的语义容器加 markdown="1"：裸 <div class="..."> 在 kramdown 里是**原始 HTML**，
    # 里面的 Markdown（**加粗**、编号列表、$$公式$$、Markdown 表格）都不会被解析，
    # 会原样显示成文本。加上 markdown="1" 后 kramdown 才会处理容器内部的 Markdown。
    $body = [regex]::Replace($body, '<div class="([a-zA-Z][\w-]*)"([^>]*)>', '<div class="$1" markdown="1">')

    # 先用原始的 ## 找出小节边界，再整体降级标题（顺序反了之后就再也找不到 ## 了）
    $lines = $body -split "\r?\n"
    $marks = @()
    for ($i = 0; $i -lt $lines.Count; $i++) { if ($lines[$i] -match '^##\s+') { $marks = $marks + $i } }

    # 标题层级整体下移一级（## → ###，### → #### …）：小节名已经是页面标题（h1），
    # 正文从 h3 起，页面里不会出现重复标题，侧栏大纲层级也更清楚
    $demote = [System.Text.RegularExpressions.MatchEvaluator]{
      param($m) ('#' * ($m.Groups[1].Value.Length + 1)) + $m.Groups[2].Value
    }
    $body = [regex]::Replace($body, '(?m)^(#{2,5})(\s+)', $demote)
    $lines = $body -split "\r?\n"

    if ($marks.Count -eq 0) {
      # 整章没有二级标题：整章一页
      $perm = "/$course/ch$(Pad2 $chapterNo).html"
      Write-Host ("  {0,-30} -> ch{1}          整章一页  {2}" -f $src.Name, (Pad2 $chapterNo), $title)
      if (-not $Check) {
        $name = "ch$(Pad2 $chapterNo)-00.md"
        $out = (New-FrontMatter $title $course (Pad2 $chapterNo) $chapterName $date $perm) + $body.TrimEnd() + "`n"
        Set-Content -LiteralPath (Join-Path $dir $name) -Value $out -Encoding UTF8
        $newGenerated = $newGenerated + @([pscustomobject]@{ file = $name; src = $src.Name; order = $chapterNo; section = 0; title = $title; permalink = $perm })
      }
      continue
    }

    # 第一个 h2 之前的内容（章首导语等）并入第一节
    $intro = if ($marks[0] -gt 0) { ($lines[0..($marks[0] - 1)] -join "`n").Trim() } else { '' }

    for ($s = 0; $s -lt $marks.Count; $s++) {
      $from = $marks[$s]
      $to = if ($s -lt $marks.Count - 1) { $marks[$s + 1] - 1 } else { $lines.Count - 1 }
      $sectionBody = ($lines[$from..$to] -join "`n").TrimEnd()
      $rawTitle = ($lines[$from] -replace '^#+\s+', '').Trim()

      # 正文自带「7.1」这类编号就沿用尾号，否则按出现顺序编号
      $secNo = $s + 1
      if ($rawTitle -match '^(\d+(?:\.\d+)*)[.、\s]') {
        $last = ($Matches[1] -split '\.')[-1]
        if ($last -match '^\d+$' -and [int]$last -gt 0) { $secNo = [int]$last }
      }
      $name = "ch$(Pad2 $chapterNo)-$(Pad2 $secNo).md"
      $perm = "/$course/ch$(Pad2 $chapterNo)-$(Pad2 $secNo).html"
      $pageTitle = "$chapterName · $rawTitle"

      Write-Host ("  {0,-30} -> {1}  {2}" -f $src.Name, $name, $pageTitle)
      if (-not $Check) {
        $content = New-FrontMatter $pageTitle $course (Pad2 $chapterNo) $chapterName $date $perm
        if ($intro) { $content += ($intro + "`n`n"); $intro = '' }
        $content += ($sectionBody + "`n")
        Set-Content -LiteralPath (Join-Path $dir $name) -Value $content -Encoding UTF8
        $newGenerated = $newGenerated + @([pscustomobject]@{ file = $name; src = $src.Name; order = (Pad2 $chapterNo); section = $secNo; title = $pageTitle; permalink = $perm })
      }
    }
  }

  if (-not $Check) {
    # 先写清单：即使后面的清理出错，下次运行也能正确识别哪些文件是生成的
    # 必须用 [object[]] 强制成数组：$newGenerated 是 ArrayList，直接走管道会被
    # PowerShell 当成"单个对象"包一层 {"value":[...],"Count":n}
    ([object[]]$newGenerated) | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $manifestPath -Encoding UTF8

    # 清掉上次生成、这次不再需要的文件
    $keep = @{}
    foreach ($g in $newGenerated) { $keep[[string]$g.file] = $true }
    foreach ($old in $generated) {
      $name = [string]$old.file
      if ($name -and -not $keep.ContainsKey($name)) {
        $p = Join-Path $dir $name
        if (Test-Path $p) { Remove-Item -LiteralPath $p -Force; Write-Host "  删除过期生成文件 $name" -ForegroundColor DarkYellow }
      }
    }
    $totalFiles += $newGenerated.Count
  }
}

if (-not $Check) { Write-Host "`n共生成 $totalFiles 个小节页。" -ForegroundColor Green }
