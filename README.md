# 我的个人主页

大学生个人主页：全屏背景 + 磨砂玻璃卡片 + 左侧栏目栏（支持子栏目），自动跟随系统切换深色模式。纯静态 HTML/CSS，无需任何构建工具，改完 push 即上线。

线上地址：https://xiaao-pixel.github.io

## 文件结构

```
my-homepage/
├── index.html          主页（自我介绍、快速入口、最近更新）
├── courses.html        课程笔记总览（每门课一张卡片入口）
├── course-template.html 课程页面模板（新增课程复制它）
├── course-ds.html      示例课程页：数据结构
├── course-prob.html    示例课程页：概率论与数理统计
├── misc.html           杂记（按年份分组）
├── note-template.html  单篇笔记模板（复制它来写新笔记）
├── style.css           全站样式（壁纸、透明度、侧边栏都在这里调）
├── assets/
│   ├── bg-light.svg    内置浅色插画背景（无壁纸时的兜底）
│   ├── bg-dark.svg     内置深色插画背景（无壁纸时的兜底）
│   └── wallpaper.jpg   （可选）你自己的壁纸，放进来就自动生效
└── README.md
```

## 三个常用自定义（都在 style.css 顶部）

打开 `style.css` 最上面的“可调参数”区块：

1. **接入本地壁纸**：把你的图片放进 `assets/` 并命名为 `wallpaper.jpg`，**保存刷新即自动生效**，不用改任何代码（没放这张图就显示内置插画）。用其他文件名或子目录，就改 `--wallpaper: url("assets/你的图.jpg");`；不想要壁纸改成 `none`。深浅色模式共用这张壁纸。
2. **卡片透明度**：改 `--card-alpha`（0 ~ 1，越小越透）。壁纸花哨、文字读不清就调大，比如 `.9`；浅色和深色模式各有独立的 `--card-alpha`，可分别调。
3. 想恢复纯插画背景：`--wallpaper: none`。

## 如何修改内容

- 所有**待替换的占位内容都带黄色高亮**（class="ph"），在编辑器里搜索 `【` 逐个替换；替换后删掉 `class="ph"` 高亮即消失。
- 头像目前是渐变圆形显示你的姓，想换成照片：把照片放进目录（如 `me.jpg`），把每个页面侧边栏里的 `<span class="avatar">【姓】</span>` 换成 `<img class="avatar" src="me.jpg" alt="头像">`。
- 每页页脚的“最后更新”日期记得手动更新。

## 栏目与子栏目

侧边栏在每个页面的 `<aside class="sidebar">` 里，两级结构，**每一级都是独立页面**：

- 一级栏目（主页 / 课程笔记 / 杂记）= 一个页面；
- 子栏目 = 也是独立页面：每门课一个 `course-xxx.html`，侧边栏直接点过去，不用翻长页面。课程页侧边栏里当前课会高亮（`class="active"`）。

**新增一门课（以“操作系统”为例）**，三步：

1. 复制 `course-template.html` → 重命名为 `course-os.html`（用英文文件名），填课程名和笔记列表；
2. **所有页面**侧边栏 `subnav` 里加一条：`<a href="course-os.html">操作系统</a>`；
3. 在 `courses.html` 总览页的 `entries` 里照抄一张卡片，改好链接和课程名。

**新增一篇笔记**：

1. 复制 `note-template.html` → 重命名（如 `ds-ch3.html`）→ 填内容（支持 LaTeX：行内 `$...$`，行间 `$$...$$`）；
2. 打开对应课程页，在“笔记列表”里加一条：

   ```html
   <li><a href="ds-ch3.html">第 3 章：栈和队列</a><span class="date">2026-10-08</span></li>
   ```

3. 顺手更新 `index.html` 的“最近更新”和页脚日期，然后 push。

**新增一个一级栏目**（比如“转载收藏”）：复制 `misc.html` 改名，再在所有页面的 `<nav>` 里照抄一个 `nav-group`。

想直接分享 PDF（课件等）：把 PDF 放进网站目录，链接写成 `<a href="课件.pdf">标题</a>`，不用建网页。

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
