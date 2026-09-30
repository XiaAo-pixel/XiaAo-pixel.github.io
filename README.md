# 我的个人主页

大学生个人主页：全屏插画背景 + 磨砂玻璃卡片，自动跟随系统切换深色模式。纯静态 HTML/CSS，无需任何构建工具，改完 push 即上线。

线上地址：https://xiaao-pixel.github.io

## 文件结构

```
my-homepage/
├── index.html          主页（自我介绍、快速入口、最近更新）
├── courses.html        课程笔记（按课程分组）
├── misc.html           杂记（按年份分组的随笔/教程/踩坑记录）
├── note-template.html  单篇笔记模板（复制它来写新笔记）
├── style.css           全站样式（背景、卡片、深色模式都在这里）
├── assets/
│   ├── bg-light.svg    浅色背景插画
│   └── bg-dark.svg     深色背景插画
└── README.md
```

## 如何修改内容

- 所有**待替换的占位内容都带黄色高亮**（class="ph"），在编辑器里搜索 `【` 即可逐个找到；替换成真实内容后删掉 `class="ph"`，高亮即消失。
- 头像目前是圆形色块显示你的姓，想换成照片：把照片放进目录（如 `me.jpg`），把 index.html 里的 `<div class="avatar">【姓】</div>` 换成 `<img class="avatar" src="me.jpg" alt="头像">`。
- 每页页脚的“最后更新”日期记得手动更新。

## 如何新增一篇笔记（核心流程）

1. **复制** `note-template.html`，重命名成英文文件名（如 `ds-ch2.html`）；
2. 打开新文件，改标题、课程名、正文（支持 LaTeX 公式：行内 `$...$`，行间 `$$...$$`）；
3. 到 `courses.html`（或 `misc.html`）对应位置加一条：

   ```html
   <li><a href="ds-ch2.html">第 2 章：线性表</a><span class="date">2026-09-30</span></li>
   ```

4. 顺便更新 `index.html` 的“最近更新”列表和页脚日期；
5. push 上线（命令见下）。

想直接分享 PDF 笔记（如老师发的课件）：把 PDF 放进网站目录，链接写成 `<a href="课件.pdf">标题</a>` 即可，不用建网页。

## 如何换背景

背景是 `assets/` 下的两个 SVG（浅色/深色各一）。想换成自己的图片：

1. 把图片放进 `assets/`（建议 1920×1080，文件别太大，2MB 以内）；
2. 打开 `style.css`，把 `body::before` 里的 `url("assets/bg-light.svg")` 改成 `url("assets/你的图.jpg")`；
3. 深色模式的 `body::before`（文件中 `prefers-color-scheme: dark` 段落里）同样改掉，或者直接删掉那一行让深浅色共用一张图。

图片上文字读不清的话，把 `--card` 里的透明度 `.78` 调高到 `.9` 左右。

## 本地预览

双击 `index.html` 即可；或：

```bash
cd my-homepage
python -m http.server 8765
# 浏览器访问 http://127.0.0.1:8765
```

深色模式跟随系统：Windows 在 设置 → 个性化 → 颜色 里切换默认 Windows 模式即可看到两套效果。

## 更新上线

```bash
git add .
git commit -m "更新内容"
git push
```

约 1 分钟后线上生效。注意：本仓库已配置 git 代理（127.0.0.1:7897），**push 时需要开着 Clash**；想取消代理：`git config --unset http.proxy`。

## 可选：绑定自定义域名

1. 购买域名，添加 CNAME 记录指向 `xiaao-pixel.github.io`；
2. 仓库根目录添加 `CNAME` 文件，内容为你的域名；
3. 仓库 Settings → Pages → Custom domain 填入并勾选 Enforce HTTPS。
