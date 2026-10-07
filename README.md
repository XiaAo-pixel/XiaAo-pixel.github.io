# 我的个人主页

大学生个人主页：全屏背景 + 磨砂玻璃卡片 + 左侧栏目栏（支持子栏目），自动跟随系统切换深色模式。纯静态 HTML/CSS，无需任何构建工具，改完 push 即上线。

线上地址：https://xiaao-pixel.github.io

## 两种版式

| 版式 | 用在哪些页 | 长相 |
| --- | --- | --- |
| **卡片版** | 主页、课程笔记总览、杂记、兴趣爱好 | 壁纸背景 + 居中磨砂玻璃卡片 + 左侧全站栏目栏 |
| **整页阅读版**（仿 Harvard bookdown） | 所有章节/小节笔记页 | 无壁纸纯底色；左侧一整条固定侧栏（书名 + 全书章节 + 当前章各小节 + 本节大纲），右侧正文居中一栏；页底「上一节 / 下一节」 |

笔记页是独立页面，从总览点进去用 `target="_blank"` 开在新标签页，主页不受打扰。笔记页的访问方式模仿 <https://hankyang.seas.harvard.edu/Semidefinite/>：**一节一页**（如 `/statistics/ch07-02.html` 就是 7.2 节），侧栏始终显示整本书的章节结构。

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
├── split-notes.ps1      ★ 把"一章一个 .md"按 h2 切成"一节一页"（见下文）
├── update-dates.ps1     ★ 一键把全站「最后更新」日期刷成今天（见下文）
├── note-template.md     章节源文件模板（复制它来写新的一章）
├── notes/              笔记源文件 + 脚本生成的小节页
│   ├── <课程代号>/_source/第N章_xxx.md   你写的源文件（一章一个；下划线开头，Jekyll 不渲染）
│   ├── <课程代号>/chNN-MM.md             split-notes.ps1 生成的小节页（别手改）
│   └── <课程代号>/.sections.json         生成清单（本地文件，不进仓库）
├── _layouts/note.html  笔记页模板（卡片版 / 整页阅读版都在这一个文件里）
├── assets/
│   ├── outline.js       笔记页侧栏：本节大纲 + 随滚动高亮
│   ├── bg-light.svg     内置浅色插画背景（无壁纸时的兜底）
│   ├── bg-dark.svg      内置深色插画背景（无壁纸时的兜底）
│   ├── wallpaper.jpg    （可选）你自己的壁纸，放进来就自动生效
│   ├── photo-wall.js    旅行照片墙：按原比例排版 + 点击放大
│   └── photos/          旅行照片目录（如 nanjing-1.jpg）
├── _config.yml         Jekyll 配置（排除 README 等不发布的文件）
├── style.css           全站样式（壁纸、透明度、侧边栏都在这里调）
└── README.md
```

## 三个常用自定义（都在 style.css 顶部）

打开 `style.css` 最上面的“可调参数”区块：

1. **接入本地壁纸**：把你的图片放进 `assets/` 并命名为 `wallpaper.jpg`，**保存刷新即自动生效**，不用改任何代码（没放这张图就显示内置插画）。用其他文件名或子目录，就改 `--wallpaper: url("assets/你的图.jpg");`；不想要壁纸改成 `none`。深浅色模式共用这张壁纸（笔记页不铺壁纸，用 `--read-bg` / `--side-bg` 两个纯色变量）。
2. **卡片透明度**：改 `--card-alpha`（0 ~ 1，越小越透）。壁纸花哨、文字读不清就调大，比如 `.9`；浅色和深色模式各有独立的 `--card-alpha`，可分别调。
3. 想恢复纯插画背景：`--wallpaper: none`。

## 如何修改内容

- 占位内容带黄色高亮（class="ph"）：在编辑器里搜索 `【` 逐个替换，替换后删掉 `class="ph"` 高亮即消失。正式页面上的高亮已全部清理；**只有模板文件**（`course-template.html`、`misc-template.html`、`note-template.md`）仍保留高亮，方便将来照抄时一眼看到要改哪里（这三个文件已在 `_config.yml` 里 exclude，不会发布成网页）。
- 头像：在「主页助手 → 👤 头像」上传本地图片、拖动裁剪成圆形后一键替换全站侧边栏；也可在助手里“恢复默认”改回姓氏圆标。
- 每页页脚的“最后更新”日期记得手动更新。

## 栏目与子栏目

侧边栏在每个页面的 `<aside class="sidebar">` 里，两级结构，**每一级都是独立页面**：

- 一级栏目（主页 / 课程笔记 / 杂记 / 兴趣爱好）= 一个页面；
- 子栏目 = 也是独立页面。每门课是一个"在线书"：`<课程代号>/index.html` 是书封面页（如 `/statistics/`），**每个小节是独立一页**（如 `/statistics/ch07-02.html`），打开任何一页左侧都常驻全书章节 + 当前章各小节，页底有「上一节 / 下一节」；杂记按年份一个 `misc-xxxx.html`，兴趣爱好下每项一个 `hobby-xxx.html`。

### 笔记页的左侧栏（三级）

```
📖 最优化方法            ← 点回书封面页（列出全书章节）
第 7 章　约束优化算法    ← 其它章只列章名，点进该章第一页
  本章前置知识           ← 当前章的各小节（当前小节高亮）
  罚函数法               ← 你在这一页
    ▾ 本节大纲
      二次罚函数法          ← 正文里的 ### / #### 标题，随滚动高亮
```

行为细节：

- 从主页/总览进笔记页是**新标签页**，方便对照着看；
- 侧栏只列这本书 + 回主页 / 回书封面的链接，站内其它栏目不塞进笔记页（避免臃肿）；
- 侧栏目录独立滚动，页面顶部能一直看到「当前小节」高亮；
- 窄屏（≤900px）侧栏折到正文上方，大纲默认收起，点「本节大纲」展开。

## 写笔记：一章一个源文件，脚本切成"一节一页"

**为什么**：长笔记一页放一整章太笨重，而一章一个文件写起来最省事——所以源文件仍然一章一个，用脚本按 `##` 切成小节页。

**写新一章（以"数理统计第 7 章"为例）**：

1. 复制 `note-template.md` → 放进 `notes/<课程代号>/_source/`，命名成你能认出的英文名（如 `07_Point_Estimation.md`）；
2. 改开头 6 行：`title`（章标题，如 `第七章　点估计`）、`course: statistics`、`order: 7`、`date`；`permalink` **不要写**（由脚本生成）；
3. 用 `##` 分小节写正文（`## 7.1 引言`、`## 7.2 寻找估计量的方法`…），小节内部用 `###` / `####`；支持 LaTeX：行内 `$...$`，行间 `$$...$$`；
4. 在仓库根目录跑一次脚本，把这一章切成小节页：

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File split-notes.ps1 -Course statistics
   ```

   只想先看看会切成什么，加 `-Check`；不加 `-Course` 就处理 `notes/` 下所有课程。脚本会打印每章切出哪些页，并在 `notes/<课程代号>/.sections.json` 记下生成清单，下次重跑会**自动删掉不再需要的小节页**（所以生成文件别手改）；
5. push 上线——侧栏目录、页底「上一节 / 下一节」、书封面页的分章列表和主页"最近更新"**自动**更新，不用手动登记。

**切分规则**：每个 `##` 标题 = 一小节 = 一页；正文自带编号（`## 7.1 xxx`）就沿用编号，没有编号就按出现顺序编号；一节里的 `###` / `####` 会下移一级显示（页面上是 h3 / h4），并自动收进侧栏「本节大纲」。文件名与线上地址：

```
notes/statistics/_source/07_Point_Estimation.md   ← 源文件（你写，Jekyll 不渲染）
        ↓ split-notes.ps1
notes/statistics/ch07-01.md  →  /statistics/ch07-01.html
notes/statistics/ch07-02.md  →  /statistics/ch07-02.html
notes/statistics/ch07-03.md  →  /statistics/ch07-03.html   ...
```

`course` 取值与书对应：`statistics`=数理统计（`/statistics/`）、`optimization`=最优化方法（`/optimization/`）、`misc-2026`/`misc-2025`=杂记年份；新课程按"新增一门课"登记新代号。

**已有笔记**：

| 课程 | 代号 | 章 / 节 |
| --- | --- | --- |
| 数理统计 | `statistics` | 13 章 / 79 节 |
| 最优化方法 | `optimization` | 10 章 / 83 节（8 章正文 + 常用符号表 + 次梯度附录） |

要新增一门课时，源文件放进 `notes/<新代号>/_source/`，再跑脚本。

### 讲义里的语义容器（定理 / 定义 / 例子 …）

最优化那份讲义里用了一批 LaTeX 风格的裸 HTML 容器，切分脚本会自动处理它们，**你不用管**，
但值得知道它们是怎么渲染的：

| 容器 class | 含义 | 外观 |
| --- | --- | --- |
| `theorem` `proposition` `lemma` `corollary` | 定理 / 命题 / 引理 / 推论 | 蓝色系 / 青色系淡底纹 + 左侧色条 |
| `definition` | 定义 | 绿色系 |
| `example` `exercise` | 例子 / 习题 | 琥珀色系 |
| `supp` `prereq` | 补充说明 / 本章前置知识 | 紫色系 |
| `framework` `custom` `minipage` | 知识框架 / 注记 / 对比小页 | 玫红色系 |
| `algorithm` `algorithmic` | 算法伪代码 | 淡底纹 + 等宽字，虚线左条 |
| `center` `tabular` | 居中块 / 表格容器 | 无底纹，表格居中或横向滚动 |

**两个关键处理（都在 split-notes.ps1 里）**，改讲义或新增容器时别绕过：

1. **必须给容器加 `markdown="1"`**：kramdown 把裸 `<div class="…">` 当作**原始 HTML**，
   里面的 `**加粗**`、编号列表、`$$公式$$`、Markdown 表格全都不会被解析，会原样显示成文本。
   脚本会自动给所有 `<div class="…">` 加上这个属性。
2. **LaTeX 版式表格要转成 Markdown 表格**：`<div class="tabular">` 里原本是
   `\@p0.12p0.30@ 类别 & 形式 & 描述 \\` 这种 LaTeX 语法，kramdown 不但不认，
   还会把行尾的 `\\` 转义成 `\`、把连续行并成一段。脚本会把这类表格自动转成
   Markdown 表格（表头 + `|:---|` 分隔行 + 数据行）。

**更新「最后更新」日期**：跑一次 [update-dates.ps1](update-dates.ps1)，它会把

1. 两本书封面页 frontmatter 的 `date`（笔记页页脚取的就是这个值）、
2. 各章源文件 frontmatter 的 `date`（生成小节页时会抄过去）、
3. 生成的小节页 frontmatter 的 `date`（防止漏跑 `split-notes.ps1`）、
4. 卡片版页面页脚的「最后更新：YYYY-MM-DD」

一次性刷成今天；想指定日期加 `-Date 2026-11-01`，只想看会改什么加 `-Check`。建议的发布顺序：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File split-notes.ps1   # 源文件有改动时
powershell -NoProfile -ExecutionPolicy Bypass -File update-dates.ps1  # 刷日期
git add . ; git commit -m "更新内容" ; git push
```

**踩过的坑（改 `_layouts/note.html` 时注意）**：Jekyll 在 GitHub Pages 上的 Liquid 里，
`where: "course", page.course` 和 `sort: "order"` 会抛
`comparison of Array with Array failed`（页面属性在某些情况下是数组），导致整个站点构建失败。
所以侧栏的「本书章节 / 当前章小节 / 上一节下一节」都是用**循环遍历 + order 分组**算出来的，
不要再改回过滤器写法。改完 `_layouts` 或模板后，务必确认线上构建成功
（仓库 Actions → "pages build and deployment"）。

### 新增一门课（以"操作系统"为例）

1. 复制 `course-template.html` → 新建目录 `os/`，存成 `os/index.html`，改 frontmatter（`course: os`、`title: 操作系统`）并填简介；
2. **所有页面**侧边栏 `subnav` 里加一条：`<a href="/os/">操作系统</a>`（`index.html`、`courses.html`、`misc.html`、`hobbies.html`、`hobby-*.html`）；
3. 在 `courses.html` 总览页的 `entries` 里照抄一张卡片（记得带 `target="_blank"`），改好链接和课程名；
4. 把你的章节源文件放进 `notes/os/`，跑 `split-notes.ps1 -Course os`。

**Markdown 写作注意**：

- 章节配图放仓库根目录 `<课程代号>/fig/` 下，正文用 `fig/图片名.png` 引用（相对路径以 permalink 所在目录为基准，即 `/<课程代号>/`，所以小节页之间移动也不会断链）；
- 不属于某本书的图片（杂记等）放 `assets/`，引用写 `/assets/图片名.png`（以 `/` 开头）；
- 正文里避免出现连续两个 `{`（`{{` 会被 Jekyll 当模板语法），需要时写 `&#123;&#123;`；
- 公式中的 `*` 建议写成 `\ast`，避免被当成加粗符号；
- 不要在正文里手写"上一节/下一节/目录"导航行——布局会按 `order` 和文件名自动生成，手写的链接指向 `.md` 源文件，线上会 404。

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

**本地预览的说明**：页面里的 `{% %}` 列表由 GitHub 云端的 Jekyll 渲染，本地 `python -m http.server` 看到的是"改造前"的原始文件（列表位置会显示花括号代码），属正常现象；想本地完整预览需安装 Ruby + Jekyll（进阶，可选），或直接 push 看线上效果。

想单独看笔记页的版式（不装 Ruby），可以用仓库里的模拟脚本：先 `split-notes.ps1` 生成小节页，再

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File _preview\make-handmade.ps1
# 然后浏览器打开 http://127.0.0.1:8765/_preview/handmade/ch01-03.html
```

它会用真实的小节内容和真实的 `style.css` / `outline.js` 拼出笔记页，用来调版式、验证侧栏大纲。`_preview/` 已在 `.gitignore` 与 `_config.yml` 里排除。

## 更新上线

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File split-notes.ps1   # 笔记有改动时先跑这个
git add .
git commit -m "更新内容"
git push
```

约 1 分钟后线上生效。注意：本仓库已配置 git 代理（127.0.0.1:7897），**push 时需要开着 Clash**；想取消代理：`git config --unset http.proxy`。

## 可选：绑定自定义域名

1. 购买域名，添加 CNAME 记录指向 `xiaao-pixel.github.io`；
2. 仓库根目录添加 `CNAME` 文件，内容为你的域名；
3. 仓库 Settings → Pages → Custom domain 填入并勾选 Enforce HTTPS。
