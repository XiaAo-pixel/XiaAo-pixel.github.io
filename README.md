# 我的个人主页

一个极简单栏的学术个人主页静态站点（风格参考 jemdoc+MathJax 学术主页），无需任何构建工具，改完直接上传 GitHub 即可。

## 文件结构

```
my-homepage/
├── index.html      主页（关于我、研究方向、招收学生）
├── section1.html   栏目一（示例：论文列表格式）
├── section2.html   栏目二（示例：按年份的报告/教学列表格式）
├── section3.html   栏目三（通用正文 + LaTeX 公式示例）
├── style.css       全站样式
├── cv.pdf          简历占位文件（替换成你自己的 PDF，保持文件名 cv.pdf）
└── README.md       本说明
```

## 如何修改内容

- 所有**待替换的占位内容都带黄色高亮**（class="ph"），在编辑器里搜索 `【` 即可逐个找到；替换成真实内容后删掉 `class="ph"`，黄色高亮就会消失。
- 三个栏目页想改名（如“论文”"Talks"“教学”）：改对应 HTML 里的 `<h1>` 和**所有页面**导航栏 `<nav>` 里的链接文字。
- 不需要的板块（如“招收学生”）直接删除对应 `<h2>` 和下面的内容即可。
- 每页页脚的“最后更新”日期记得手动更新。
- `index.html` 头部引入了 MathJax，正文中写 `$...$` 或 `$$...$$` 就能渲染 LaTeX 公式；完全不需要公式的话，可删除头部两段 `<script>`。

## 本地预览

直接双击 `index.html` 用浏览器打开即可；或者起一个本地服务器：

```bash
cd my-homepage
python -m http.server 8765
# 浏览器访问 http://127.0.0.1:8765
```

## 发布到 GitHub Pages（免费）

**方式一：个人主站地址（推荐，网址就是 `https://用户名.github.io`）**

1. 在 GitHub 上新建仓库，名字必须为 `你的用户名.github.io`（把“你的用户名”换成 GitHub 用户名）；
2. 在本目录执行：

   ```bash
   git init
   git add .
   git commit -m "init homepage"
   git branch -M main
   git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
   git push -u origin main
   ```

3. 等一两分钟，访问 `https://你的用户名.github.io` 即可（HTTPS 自动开启）。

**方式二：任意仓库名 + 开启 Pages**

1. 新建任意名字的仓库（如 `homepage`），按上面方式推送；
2. 仓库 Settings → Pages → Branch 选 `main`，目录选 `/ (root)`，保存；
3. 网址为 `https://你的用户名.github.io/仓库名/`。

## 以后如何更新

改完文件后：

```bash
git add .
git commit -m "update content"
git push
```

推送后一分钟内线上即生效。

## 可选：绑定自己的域名

1. 在域名服务商购买域名，添加一条 CNAME 记录指向 `你的用户名.github.io`；
2. 在仓库根目录添加一个名为 `CNAME` 的文件，内容就是你的域名（如 `www.example.com`）；
3. 仓库 Settings → Pages → Custom domain 填入并保存，勾选 Enforce HTTPS。

## 常见问题

- **推送后网页 404？** 等几分钟；确认仓库名拼写正确（个人主站必须严格等于 `用户名.github.io`）。
- **样式没生效？** 确认 `style.css` 和 HTML 在同一目录、文件名大小写一致（GitHub Pages 区分大小写）。
- **想加头像/照片？** 把图片放进目录，在 `index.html` 的 `<h1>` 旁加 `<img src="photo.jpg" alt="照片" style="width:120px;border-radius:50%">`。
