# 我的个人主页

大学生个人主页：全屏背景 + 磨砂玻璃卡片 + 左侧栏目栏（支持子栏目），自动跟随系统切换深色模式。纯静态 HTML/CSS，无需任何构建工具，改完 push 即上线。

线上地址：https://xiaao-pixel.github.io

## 文件结构

```
homepage/
├── index.html           主页（自我介绍、快速入口、最近更新）
├── courses.html         课程笔记总览（每门课一张卡片入口）
├── course-template.html 书封面页模板（新增课程复制它）
├── misc.html            杂记总览
├── misc-template.html   杂记子页模板（新增年份/主题复制它）
├── hobbies.html         兴趣爱好总览
├── hobby-novel.html     小说推荐（起点读书链接）
├── hobby-anime.html     动漫推荐
├── hobby-travel.html    旅行照片墙（分地点）
├── statistics/          数理统计"在线书"：index.html 封面（/statistics/）+ fig/ 章节插图
├── optimization/        最优化方法"在线书"：index.html 封面（/optimization/）
├── note-template.md    单章笔记模板（复制它来写新章节）
├── notes/              章节 .md 源文件放这里，线上地址由 frontmatter 的 permalink 决定
├── _layouts/note.html  章节页/书封面页模板（侧边栏书目录 + 上一章/下一章 + 公式渲染）
├── _config.yml         Jekyll 配置（排除 README 等不发布的文件）
├── style.css           全站样式（壁纸、透明度、侧边栏都在这里调）
├── assets/
│   ├── bg-light.svg     内置浅色插画背景（无壁纸时的兜底）
│   ├── bg-dark.svg      内置深色插画背景（无壁纸时的兜底）
│   ├── wallpaper.jpg    （可选）你自己的壁纸，放进来就自动生效
│   ├── photo-wall.js    旅行照片墙：按原比例排版 + 点击放大
│   └── photos/          旅行照片目录（如 nanjing-1.jpg）
└── README.md
```

## 三个常用自定义（都在 style.css 顶部）

打开 `style.css` 最上面的“可调参数”区块：

1. **接入本地壁纸**：把你的图片放进 `assets/` 并命名为 `wallpaper.jpg`，**保存刷新即自动生效**，不用改任何代码（没放这张图就显示内置插画）。用其他文件名或子目录，就改 `--wallpaper: url("assets/你的图.jpg");`；不想要壁纸改成 `none`。深浅色模式共用这张壁纸。
2. **卡片透明度**：改 `--card-alpha`（0 ~ 1，越小越透）。壁纸花哨、文字读不清就调大，比如 `.9`；浅色和深色模式各有独立的 `--card-alpha`，可分别调。
3. 想恢复纯插画背景：`--wallpaper: none`。

## 如何修改内容

- 占位内容带黄色高亮（class="ph"）：在编辑器里搜索 `【` 逐个替换，替换后删掉 `class="ph"` 高亮即消失。正式页面上的高亮已全部清理；**只有模板文件**（`course-template.html`、`misc-template.html`、`note-template.md`）仍保留高亮，方便将来照抄时一眼看到要改哪里（这三个文件已在 `_config.yml` 里 exclude，不会发布成网页）。
- 头像：在「主页助手 → 👤 头像」上传本地图片、拖动裁剪成圆形后一键替换全站侧边栏；也可在助手里“恢复默认”改回姓氏圆标。
- 每页页脚的“最后更新”日期记得手动更新。

## 栏目与子栏目

侧边栏在每个页面的 `<aside class="sidebar">` 里，两级结构，**每一级都是独立页面**：

- 一级栏目（主页 / 课程笔记 / 杂记 / 兴趣爱好）= 一个页面；
- 子栏目 = 也是独立页面。每门课是一个"在线书"（仿 GitBook 访问方式）：`<课程代号>/index.html` 是书封面页（如 `/statistics/`），每个章节是独立一页（如 `/statistics/chap01.html`），打开任何一章，左侧都常驻全书章节目录，页底有「上一章 / 下一章」；杂记按年份一个 `misc-xxxx.html`，兴趣爱好下每项一个 `hobby-xxx.html`。侧边栏直接点过去，当前页会高亮（`class="active"`）。

**新增一门课（以"操作系统"为例）**，三步：

1. 复制 `course-template.html` → 新建目录 `os/`，存成 `os/index.html`，改 frontmatter（`course: os`、`title: 操作系统`）并填简介；章节笔记的 `permalink` 以后都写在 `/os/chapNN.html` 下；
2. **所有页面**侧边栏 `subnav` 里加一条：`<a href="/os/">操作系统</a>`；
3. 在 `courses.html` 总览页的 `entries` 里照抄一张卡片，改好链接和课程名。

**新增一篇章节笔记（纯 Markdown，不碰 HTML）**：

> 💡 **整文件夹上传**：在"主页助手 → 笔记 → 栏目管理"里 📂 打开某个栏目，用"上传整个文件夹"选一个本地文件夹（里面是分章节的 .md 和它们引用的图片），目录结构会原样保留、图片引用不断链，全部自动归入该栏目。

1. 复制 `note-template.md` → 放进 `notes/` 文件夹（子文件夹随意，线上地址由 permalink 决定）→ 重命名为英文文件名（如 `ds-ch3.md`）；
2. 改文件开头的信息：`title`（显示的标题）、`course`（所属课程代号，与书封面页一致）、`order`（章节序号，决定书目录和翻页顺序）、`date`，以及 **`permalink`**（线上地址，写 `/<课程代号>/chap<两位序号>.html`，如 `/ds/chap03.html`，序号与 `order` 保持一致）；
3. 用 Markdown 写正文（支持 LaTeX：行内 `$...$`，行间 `$$...$$`；平板上的 Markdown 编辑器写完直接丢进来即可）；
4. push 上线——侧边栏书目录、页底「上一章 / 下一章」、书封面页列表和主页"最近更新"**自动**更新，不用手动登记。

`course` 取值与书对应：`statistics`=数理统计（`/statistics/`）、`optimization`=最优化方法（`/optimization/`）、`misc-2026`/`misc-2025`=杂记年份；新课程按"新增一门课"登记新代号。

**Markdown 写作注意**：

- 章节配图放仓库根目录 `<课程代号>/fig/` 下，正文用 `fig/图片名.png` 引用（相对路径以 permalink 所在目录为基准，改 permalink 文件名时不会断链）；
- 不属于某本书的图片（杂记等）放 `assets/`，引用写 `/assets/图片名.png`（以 `/` 开头）；
- 正文里避免出现连续两个 `{`（`{{` 会被 Jekyll 当模板语法），需要时写 `&#123;&#123;`；
- 公式中的 `*` 建议写成 `\ast`，避免被当成加粗符号；
- 不要在正文里手写"上一章/下一章/目录"导航行——布局会按 `order` 自动生成，手写的链接指向 `.md` 源文件，线上会 404。

**新增一个一级栏目**（比如“转载收藏”）：复制 `misc.html` 改名，再在所有页面的 `<nav>` 里照抄一个 `nav-group`。

**新增一个杂记子栏目**（新的一年或新主题）：复制 `misc-template.html` 改名 → 填内容 → 侧边栏和 `misc.html` 总览各登记一条，做法与加新课相同。

## 旅行照片墙：怎么加新地点

`hobby-travel.html` 里每个地点是 `<h2>地点 · 时间</h2>` + 一个 `.photo-wall`，墙里每一行是一个 `.photo-row`。加新地点照抄一组：

```html
<h2>地点 · 年份.月</h2>
<div class="photo-wall">
  <div class="photo-row">          <!-- 一行放几张由你定 -->
    <figure>
      <img src="assets/photos/地点-1.jpg" width="1280" height="1706"
           alt="照片说明" loading="lazy" decoding="async">
      <figcaption>照片说明</figcaption>
    </figure>
  </div>
</div>
```

三点要注意：

1. **`width` / `height` 必须填真实的像素尺寸**——`assets/photo-wall.js` 靠这个比值算排版，填错比例整行就歪了。照片不用预先裁剪或压缩，原图直接放（南京这 5 张加起来才 1MB）。
2. **一行放几张决定这行多大**：同一行的照片按各自原比例分配宽度、自动等高铺满，行内一个不裁；所以一行放 2 张就大、放 3 张就小。行与行之间大小不同，就是"有大有小"的效果。想调版式就改分行，不用动 CSS。
3. `alt` 和 `<figcaption>` 写真描述——悬停时以字幕形式浮在照片下沿，点开放大后显示的就是它。载入后 `photo-wall.js` 会给每张加上点击放大、← → 切换、Esc 关闭。

窄屏（≤720px）一行放不下就自动折成两列，不用单独处理。

## 本地预览

双击 `index.html` 即可；或：

```bash
cd D:\homepage
python -m http.server 8765
# 浏览器访问 http://127.0.0.1:8765
```

**本地预览的说明**：笔记列表页由 GitHub 云端的 Jekyll 渲染，本地 `python -m http.server` 看到的是“改造前”的原始文件（列表位置会显示花括号代码），属正常现象；想本地完整预览需安装 Ruby + Jekyll（进阶，可选），或直接 push 看线上效果。

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
