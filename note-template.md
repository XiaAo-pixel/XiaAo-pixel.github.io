---
layout: note
kind: note
title: "【章标题，如：第七章　假设检验】"
course: statistics
order: 7
date: 2026-10-08
---

<span class="ph">【这是"一章一个"的源文件：放进 notes/&lt;课程代号&gt;/_source/，整章写在一个 .md 里，标题用 ## 分小节。写完运行
split-notes.ps1，它会按 ## 自动切成「一节一页」并生成 notes/&lt;课程代号&gt;/ch07-01.md 等文件
（那些生成文件不用手改，改了也会被覆盖）。

frontmatter 只需上面 6 行：
  layout / kind 固定；title 写章标题（"第七章　假设检验"）；
  course 与书封面页一致（如 statistics）；order 写章号（7 或 "07" 都行）；
  date 写最后更新日期。

不要手写 permalink —— 生成的每个小节页由脚本按 /<课程代号>/ch<章号>-<节号>.html 命名。】</span>

## 【小节标题，如：7.1 引言（Introduction）】

<span class="ph">【一个小节 = 一个页面。小节里可以用 ### / #### 再分小标题，它们会出现在左侧栏
「本节大纲」里，可点击跳转。】</span>

- <span class="ph">【要点一】</span>
- <span class="ph">【要点二】</span>

行内公式如 $e^{i\pi} + 1 = 0$；行间公式：

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$

> <span class="ph">【引用块适合放重要结论、易错点。表格、代码块都用标准 Markdown 写法。】</span>

## 【下一个小节标题，如：7.2 寻找检验的方法】

<span class="ph">【图片放仓库根目录 &lt;课程代号&gt;/fig/ 下，正文用 fig/图片名.png 引用
（相对路径基准是 permalink 所在目录，即 /&lt;课程代号&gt;/）。】</span>
