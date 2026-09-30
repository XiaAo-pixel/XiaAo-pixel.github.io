# 我的个人主页

大学生个人主页：全屏背景 + 磨砂玻璃卡片 + 左侧栏目栏（支持子栏目），自动跟随系统切换深色模式。纯静态 HTML/CSS，无需任何构建工具，改完 push 即上线。

线上地址：https://xiaao-pixel.github.io

## 文件结构

```
homepage/
├── index.html           主页（自我介绍、快速入口、最近更新）
├── courses.html         课程笔记总览（每门课一张卡片入口）
├── course-template.html 课程页面模板（新增课程复制它）
├── course-ds.html       示例课程页：数据结构
├── course-prob.html     示例课程页：概率论与数理统计
├── misc.html            杂记总览（每年一张卡片入口）
├── misc-template.html   杂记子页模板（新增年份/主题复制它）
├── misc-2026.html       示例杂记子页：2026
├── misc-2025.html       示例杂记子页：2025
├── hobbies.html         兴趣爱好总览
├── hobby-novel.html     小说推荐（起点读书链接）
├── hobby-anime.html     动漫推荐
├── hobby-travel.html    旅行照片墙（分地点）
├── note-template.md    单篇笔记模板（复制它来写新笔记）
├── notes/              笔记文件夹：新笔记 .md 放这里，push 后自动变成网页
├── _layouts/note.html  笔记页模板（自动套侧边栏与公式渲染）
├── _config.yml         Jekyll 配置（排除 README 等不发布的文件）
├── style.css           全站样式（壁纸、透明度、侧边栏都在这里调）
├── assets/
│   ├── bg-light.svg     内置浅色插画背景（无壁纸时的兜底）
│   ├── bg-dark.svg      内置深色插画背景（无壁纸时的兜底）
│   ├── wallpaper.jpg    （可选）你自己的壁纸，放进来就自动生效
│   └── photos/          旅行照片目录（loc1-*.svg 等是占位图）
└── README.md
```

## 三个常用自定义（都在 style.css 顶部）

打开 `style.css` 最上面的“可调参数”区块：

1. **接入本地壁纸**：把你的图片放进 `assets/` 并命名为 `wallpaper.jpg`，**保存刷新即自动生效**，不用改任何代码（没放这张图就显示内置插画）。用其他文件名或子目录，就改 `--wallpaper: url("assets/你的图.jpg");`；不想要壁纸改成 `none`。深浅色模式共用这张壁纸。
2. **卡片透明度**：改 `--card-alpha`（0 ~ 1，越小越透）。壁纸花哨、文字读不清就调大，比如 `.9`；浅色和深色模式各有独立的 `--card-alpha`，可分别调。
3. 想恢复纯插画背景：`--wallpaper: none`。

## 如何修改内容

- 所有**待替换的占位内容都带黄色高亮**（class="ph"），在编辑器里搜索 `【` 逐个替换；替换后删掉 `class="ph"` 高亮即消失。
- 头像：在「主页助手 → 👤 头像」上传本地图片、拖动裁剪成圆形后一键替换全站侧边栏；也可在助手里“恢复默认”改回姓氏圆标。
- 每页页脚的“最后更新”日期记得手动更新。

## 栏目与子栏目

侧边栏在每个页面的 `<aside class="sidebar">` 里，两级结构，**每一级都是独立页面**：

- 一级栏目（主页 / 课程笔记 / 杂记 / 兴趣爱好）= 一个页面；
- 子栏目 = 也是独立页面：每门课一个 `course-xxx.html`，杂记按年份一个 `misc-xxxx.html`，兴趣爱好下每项一个 `hobby-xxx.html`。侧边栏直接点过去，当前页会高亮（`class="active"`）。

**新增一门课（以“操作系统”为例）**，三步：

1. 复制 `course-template.html` → 重命名为 `course-os.html`（用英文文件名），填课程名和笔记列表；
2. **所有页面**侧边栏 `subnav` 里加一条：`<a href="course-os.html">操作系统</a>`；
3. 在 `courses.html` 总览页的 `entries` 里照抄一张卡片，改好链接和课程名。

**新增一篇笔记（纯 Markdown，不碰 HTML）**：

1. 复制 `note-template.md` → 放进 `notes/` 文件夹 → 重命名为英文文件名（如 `ds-ch3.md`）；
2. 改文件开头的三行信息：`title`（显示的标题）、`course`（所属栏目代号）、`date`；
3. 用 Markdown 写正文（支持 LaTeX：行内 `$...$`，行间 `$$...$$`；平板上的 Markdown 编辑器写完直接丢进来即可）；
4. push 上线——课程页/杂记页的列表和主页“最近更新”**自动**出现这篇笔记，不用手动登记。

`course` 取值与页面对应：`ds`=数据结构、`prob`=概率论与数理统计、`misc-2026`/`misc-2025`=杂记年份；新课程按“新增一门课”登记新代号。

**Markdown 写作注意**：

- 配图放进 `assets/`，引用写 `/assets/图片名.png`（以 `/` 开头）；
- 正文里避免出现连续两个 `{`（`{{` 会被 Jekyll 当模板语法），需要时写 `&#123;&#123;`；
- 公式中的 `*` 建议写成 `\ast`，避免被当成加粗符号。

**新增一个一级栏目**（比如“转载收藏”）：复制 `misc.html` 改名，再在所有页面的 `<nav>` 里照抄一个 `nav-group`。

**新增一个杂记子栏目**（新的一年或新主题）：复制 `misc-template.html` 改名 → 填内容 → 侧边栏和 `misc.html` 总览各登记一条，做法与加新课相同。

## 旅行照片墙：怎么换自己的照片

1. 把照片放进 `assets/photos/`，建议按地点命名（如 `loc1-1.jpg`、`loc1-2.jpg`）；
2. 打开 `hobby-travel.html`，把对应 `<img src="assets/photos/loc1-1.svg">` 的扩展名 `.svg` 改成 `.jpg`（文件名一致的话只改扩展名即可）；
3. `alt` 里的【照片说明】改成真描述，`<h2>` 里填地点和时间。

想加一个新地点：照抄一个 `<h2>` + 一组 `photo-grid`；想换占位图风格或数量，直接增删 `<img>` 行即可。照片多的话注意每张压缩到 500KB 以内，不然页面加载慢。

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
