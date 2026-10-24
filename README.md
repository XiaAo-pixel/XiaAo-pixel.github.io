# 我的个人主页

大学生个人主页：全屏背景 + 磨砂玻璃卡片 + 左侧栏目栏（支持子栏目），自动跟随系统切换深色模式。站点本身是纯静态 HTML/CSS，无需构建工具，改完 push 即上线；仓库另带一个本地可视化编辑器「主页助手」（Node，可选，不参与线上构建）。

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
├── editor/              本地可视化编辑器「主页助手」（已被 Jekyll 排除）
│   ├── server.mjs       本地服务：预览 / 写回 / 上传 / 主题
│   ├── lib/             页面/笔记结构操作、源码定位、预览拼装
│   ├── public/          编辑器界面与 iframe 桥接脚本
│   └── vendor/parse5/   HTML 解析器（已内置，不用 npm install）
├── 打开主页助手.cmd      双击启动可视化编辑器
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
- 头像：在「主页助手 → 外观与设置 → 头像」上传本地图片、拖动裁剪成圆形后保存，会替换 `assets/avatar.jpg`，全站（含笔记页）生效。
- 每页页脚的“最后更新”日期由“主页助手”在保存时自动写入当天；直接改文件后仍可跑 `update-dates.ps1`。

## 可视化编辑器「主页助手」

`editor/` 是随仓库附带的本地编辑器：可以可视化改卡片版页面、两本书的封面介绍，也提供笔记章节/小节的 Markdown 源文件管理与一条龙切分。笔记正文仍然是 Markdown，不是所见即所得的富文本。

启动浏览器版（需要 Node.js 18+，不需要 `npm install`）：

```bat
:: 双击根目录的「打开主页助手.cmd」，或者：
node editor\server.mjs
```

默认会启动在 <http://127.0.0.1:4173/>（端口被占用时自动顺延），并自动打开浏览器；关掉终端窗口即停止。编辑器只监听本机回环地址，不会公开到局域网。

### Windows 桌面版（EXE）

`desktop/` 把同一个编辑器封装成独立的 Windows 程序。EXE 里只有编辑器，不含主页内容；它始终直接读写你选择的项目文件夹。

- **使用**：把 `desktop\release\HomepageStudio-1.0.0-portable.exe` 复制到主页工程根目录后双击，会自动识别当前工程；放在其它位置时，首次启动会让你选择包含 `index.html`、`style.css`、`courses.html` 的文件夹，之后会记住上次的项目。也可以用「文件 → 切换项目文件夹…」（`Ctrl+O`）随时切换。
- **无需安装**：便携版不写注册表、不安装依赖，运行时临时解压，首次启动会慢几秒；不需要 Node.js，也不需要浏览器或终端。笔记切分仍会调用系统自带的 Windows PowerShell。
- **未签名提示**：EXE 没有购买代码签名证书，Windows SmartScreen 可能提示「Windows 已保护你的电脑」。点「更多信息 → 仍要运行」即可；界面、编辑和「一键发布」行为与浏览器版完全一致。
- **重新构建**：需要 Node.js 18+，首次执行 `npm install`，然后：

  ```bat
  npm run desktop:dist
  ```

  生成的便携版在 `desktop\release\HomepageStudio-1.0.0-portable.exe`；`win-unpacked\` 是打包中间产物。`node_modules/` 和 `desktop/release/` 已在 `.gitignore` 中排除，不会提交进仓库。开发调试可用 `npm run desktop:dev`，无界面自检可用 `npm run desktop:smoke`。

能做什么：

- **页面内容**：点选预览里的元素，右侧直接改文字、链接、标题；**双击文字**可原地编辑，页内浮动工具条支持加粗、斜体、链接；支持撤销 / 重做和 `Ctrl+S`。
- **卡片与照片**：增删改入口卡片，调整顺序；照片墙可加地点分组、上传照片、改说明或替换单张照片。上传的图片会压缩后写入 `assets/photos/`，并按原比例记录宽高。
- **页面内容清单**：页面设置里的「页面内容」提供入口卡片和照片墙集中管理；可以增删卡片、调整卡片顺序、删除照片/整组照片，点「编辑」回到页面里的元素检查器细调文字。删除照片只从页面移除，原图仍保留在 `assets/photos/`。
- **小说书单**：小说页使用独立的书籍字段，添加/编辑时分别填写**书名、作者、链接、评价**，标题自动带 📖 图标；「管理小说书单」按作者展示，并支持排序、编辑和删除。其他卡片页仍使用通用卡片字段。
- **书封面**：改书名、简介；封面日期在保存封面或本书笔记时自动写成当天。章节列表仍根据 `notes/` 自动生成，不能在这里直接改。
- **笔记源管理**：左侧「笔记源」按课程打开 Markdown 编辑器。可以新建/删除章节、增删小节、直接改整份源文件；每次保存会自动运行 `split-notes.ps1`，重建 `chNN-MM.md` 小节页并清理过期页面。新建章节需要英文文件名和未使用的章号。
- **外观**：头像裁剪（512×512）、壁纸、卡片透明度（浅色/深色分别调）、强调色；右侧预览可以独立切换深浅色，不影响系统主题。
- **侧边栏同步**：卡片版每个页面各有一份侧边栏。改好当前页后，可一键同步到其它卡片页，并尽量保留各页自己的高亮状态。
- **自动日期**：保存卡片页任意内容会把页脚「最后更新」写成当天；保存/增删笔记会把章节、生成小节页、课程封面和首页页脚一起更新为当天。首页「最近更新」列表现在显示每门课的封面更新日期。编辑器里的日期字段是只读的自动值。
- **一键发布**：右上角「发布」按钮会先保存待写内容，再用 `git add -A`、`git commit`、`git push` 一次完成提交和推送；提交信息可改，推送失败时输出会显示在对话框里，可重试。
- **页面属性与源码**：改浏览器标题；也可以打开完整 HTML 源文件直接编辑，适合处理可视化编辑器没有覆盖的细节。

安全与回滚：

- 每次保存只改目标元素对应的源码区间，Liquid 模板、注释、缩进不会被整页重排。
- 每个被编辑的文件在 5 分钟内第一次被修改前，会自动备份到 `editor/.backups/`；页面内还有一份内存撤销栈。笔记文件的增删改也会先备份（新建文件除外）。
- `editor/` 与启动脚本已在 `_config.yml` 中排除，不会发布到 GitHub Pages。parse5 已放在 `editor/vendor/`，没有 npm 依赖。

范围：编辑器负责站点页面、卡片/照片墙、外观，以及笔记源文件的增删改和自动切分；小节页的正文仍然是 Markdown 生成的，不在网页编辑器里做所见即所得渲染。保存笔记时会自动调用仓库根目录的 `split-notes.ps1`，因此需要 Windows PowerShell（或已安装的 `pwsh`）。改完后照旧 `git add / commit / push`；如果是在编辑器外改了笔记源文件，仍要手动跑一次 `split-notes.ps1`。

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

`course` 取值与书对应：`statistics`=数理统计（`/statistics/`）、`optimization`=最优化方法（`/optimization/`）、`stochastic`=应用随机过程（`/stochastic/`）、`misc-2026`/`misc-2025`=杂记年份；新课程按"新增一门课"登记新代号。切分脚本支持 `order: 0` 的"第〇章"（生成 `ch00-xx.md`），章名前缀"第〇章/第零章"也会被正确剥掉。

**已有笔记**：

| 课程 | 代号 | 章 / 节 |
| --- | --- | --- |
| 数理统计 | `statistics` | 13 章 / 79 节 |
| 最优化方法 | `optimization` | 19 讲 + 附录 A–D / 135 节 |
| 应用随机过程 | `stochastic` | 2 章（第〇章引言 + 第一章马氏链；第二章跳过程、第三章布朗运动待补）/ 13 节，另附 LaTeX 排版的 PDF 打印版（`stochastic/latex/`） |

要新增一门课时，源文件放进 `notes/<新代号>/_source/`，再跑脚本。

### 讲义里的语义容器（定理 / 定义 / 例子 …）

最优化旧版讲义里用过一批 LaTeX 风格的裸 HTML 容器（新版讲义主要用引用块），切分脚本仍会自动
处理它们，**你不用管**，但值得知道它们是怎么渲染的：

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

### 更新「最后更新」日期

在「主页助手」里正常编辑时，日期会自动维护：

- 保存卡片版页面 → 页面页脚的「最后更新」变成当天；
- 保存/增删笔记章节或小节 → 章节源文件、生成小节页、课程封面、首页页脚一起变成当天；
- 首页「最近更新」列表显示每门课封面的更新日期（例如 `2026-10-19 · 79 节`），所以某一门课改过笔记后会自然刷新。

如果是在编辑器外手改文件，或想全站统一刷日期，仍可跑一次 [update-dates.ps1](update-dates.ps1)，它会把封面、章节源文件、生成小节页和卡片页页脚一次性刷成今天；想指定日期加 `-Date 2026-11-01`，只想看会改什么加 `-Check`。

通过编辑器发布时不必手动跑切分/日期脚本，编辑器的保存流程会处理。需要命令行发布时：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File split-notes.ps1   # 编辑器外改了笔记源文件时
powershell -NoProfile -ExecutionPolicy Bypass -File update-dates.ps1  # 需要全站刷日期时
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
- **行内公式的 `$` 必须成对，且不要和 `$$` 混用。** 本站约定行内公式写成 `$$...$$`（kramdown 会把它当作 math span 原样交给 MathJax），行间公式用单独一行的 `$$` 包住。不要写成 `uniform$(0,\theta)$$` 这种一半 `$`、一半 `$$` 的形式：单个 `$` 会从那里一直吞到下一个 `$$`，整段文本被当成公式，页面上出现大段原始 LaTeX（数理统计 7.3 的例 7.3.22 曾出现此问题，已修复）。正确写法是 `uniform$$(0,\theta)$$`；公式中的中文放进 `\text{...}`。
- **行内公式里的竖线也要注意。** 裸写 `|`（绝对值、范数）可能被 kramdown 先当成表格分隔符，建议统一写 `\vert`，双竖线写 `\Vert` 或 `\|`。两本书里已有的这类写法已统一处理；切分脚本本身不会检查公式语法，新增或替换讲义后要按上面的规则检查。
- **例 / 定理 / 定义 / 证明等加粗标题独占一行时，前后都要留空行。** 紧贴上一段会被并进同一段，失去标题层级；引用块结束后如果直接接正文，也要留一个空行，否则后续内容会被吞进引用块。统计笔记里这类粘连已统一整理。
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

推荐在「主页助手」顶部点 **发布**：它会先保存待写内容、检查 Git 状态，再执行 `git add -A` → `git commit` → `git push`。提交信息可以在对话框里修改（默认带日期和时间）；失败时会显示 Git 输出，修好网络/代理后可以重试，已经生成的本地提交不会重复创建。它不会 force push，也不会跳过仓库 hooks。

发布需要本机 Git 已配置 `origin` 和推送凭据；本仓库已配置代理（127.0.0.1:7897），**push 时需要开着 Clash**，想取消代理：`git config --unset http.proxy`。推送后约 1 分钟线上生效。

也可以继续用命令行发布：

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File split-notes.ps1   # 编辑器外改了笔记源文件时
git add .
git commit -m "更新内容"
git push
```

## 可选：绑定自定义域名

1. 购买域名，添加 CNAME 记录指向 `xiaao-pixel.github.io`；
2. 仓库根目录添加 `CNAME` 文件，内容为你的域名；
3. 仓库 Settings → Pages → Custom domain 填入并勾选 Enforce HTTPS。
