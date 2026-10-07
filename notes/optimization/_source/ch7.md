---
layout: note
kind: note
title: "第 7 章　约束优化算法"
course: optimization
order: 7
date: 2026-10-07
---

# 约束优化算法

本章考虑约束优化问题 $$\begin{equation}
  \min_{x}\ f(x)
  \ \text{s.t.}\ x\in X,
\end{equation}$$ 其中 $$X\subset\mathbb{R}^n$$ 为问题的可行域．与无约束问题不同，约束优化问题中自变量 $$x$$ 不能任意取值，这使得许多无约束优化算法不能直接使用：例如梯度法中沿着 负梯度方向下降所得的点未必是可行点；要寻找的最优解处目标函数的梯度也一般 *不是*零向量（而是第五--六章建立的 KKT 条件所刻画的形式）．这使得约束 优化问题比无约束优化问题复杂许多．

本章的解决思路有三条主线：

1.  **罚函数法**（§7.1）：把约束作为惩罚项加到目标函数中， 将约束问题转化为一系列*无约束*优化问题求解；

2.  **增广拉格朗日函数法**（§7.2）：在拉格朗日函数的基础上添加 二次罚函数，通过更新乘子避免二次罚函数法\"罚因子必须趋于无穷\"的 数值困难，是求解大规模约束问题（尤其是凸问题）的主流方法之一；

3.  **利用问题特殊结构**：对线性规划介绍**内点法**（§7.3）， 它从可行域内部沿\"中心路径\"逼近最优解，是多项式时间算法； 对流形约束问题（§7.4）介绍**流形优化**算法， 把\"约束\"变成迭代所在的空间本身．

其中 §7.1--§7.2 是本章的核心（对应第 16 讲课件《增广拉格朗日函数法》）， §7.3 与 §7.4 为讲义内容、课堂未展开，但属于本章框架，本笔记一并完整整理， 以使复习无需再翻讲义．

## 本章前置知识

<div class="prereq">

本章反复使用第 2--5 章建立的凸分析、最优性理论工具与高等代数、数学分析的 标准结论．下面把真正会用到的结论集中列出，每条给出公式并注明用途．

1.  **KKT 条件（第五章）**：对约束问题 $$\min f(x)\ \ \text{s.t.}\ \ c_i(x)=0,\ i\in E$$，最优解 $$(x^*,\lambda^*)$$ 满足 梯度条件 $$\nabla f(x^*)+\sum_{i\in E}\lambda_i^*\nabla c_i(x^*)=0$$ 与可行性 $$c_i(x^*)=0$$；一般约束问题还需 $$\lambda_i^*\ge 0$$（不等式 约束）与互补松弛 $$\lambda_i^*c_i(x^*)=0$$． *用在哪里*：二次罚函数法的乘子估计（§7.1.2）、增广拉格朗日 函数法乘子更新的整个推导（§7.2）都以 KKT 梯度条件为出发点．

2.  **约束品性**：LICQ（线性无关约束品性）指积极约束的梯度向量组 $$\lbrace\nabla c_i(x^*)\rbrace_{i\in A(x^*)}$$ 线性无关；二阶充分条件指拉格朗日 函数在海瑟矩阵于临界锥（等式约束情形即 $$\lbraceu:\nabla c(x^*)^\top u=0\rbrace$$） 上正定：$$u^\top\nabla_{xx}^2L(x^*,\lambda^*)u>0$$． *用在哪里*：增广拉格朗日函数的\"精确罚函数\"性质（定理 7.4） 及其收敛性定理（定理 7.5）的假设条件．

3.  **对偶理论（§5.4）**：对偶函数 $$g(\lambda)=\inf_x L(x,\lambda)$$ 恒有弱对偶 $$g(\lambda)\le f(x^*)$$；Slater 条件下强对偶成立且对偶 最优解存在． *用在哪里*：§7.2.3 凸问题增广拉格朗日函数法收敛性定理中 $$\lbrace\lambda^k\rbrace$$ 的极限是对偶问题最优解；§7.2.4 基追踪问题的对偶 推导（$$g(y)=-b^\top y$$ 于 $$\Vert A^\top y\Vert_\infty\le1$$）．

4.  **次微分（§2.7 与 §6.3）**：凸函数 $$h$$ 在 $$x$$ 处的次微分 $$\partial h(x)=\lbraceg:h(z)\ge h(x)+\left\langle g,\,z-x\right\rangle,\ \forall z\rbrace$$； 最优性条件为 $$0\in\partial h(x)$$；次微分的计算规则（和规则、 复合规则）． *用在哪里*：§7.1.5 $$\ell_1$$ 精确罚函数不可微，其子问题依赖 次梯度工具；§7.2.4 基追踪问题子问题的最优性条件 $$0\in\partial\left\Vert x^{k+1}\right\Vert_1+\sigma A^\top(Ax^{k+1}-b+\lambda^k/\sigma)$$； §7.2.3 不精确条件用 $$\mathop{\mathrm{dist}}(0,\partial\varphi^k(x^{k+1}))$$ 度量．

5.  **强凸函数与强单调**：$$\varphi$$ 为 $$\alpha$$-强凸函数时， $$\varphi(y)\ge\varphi(x)+\left\langle g,\,y-x\right\rangle+\frac{\alpha}{2}\left\Vert y-x\right\Vert^2$$ 对任意 $$g\in\partial\varphi(x)$$ 成立；且 $$\varphi(x)-\inf\varphi\le\frac{1}{2\alpha}\mathop{\mathrm{dist}}^2(0,\partial\varphi(x))$$． *用在哪里*：§7.2.3 把\"函数值型\"不精确条件转化为数值可验证的 \"次梯度型\"条件（式 (7.2.18)）；§7.2.4 对偶问题子问题的强凸化技巧．

6.  **正定与条件数**：对称矩阵 $$A\succ0$$ 的条件数 $$\kappa(A)=\lambda_{\max}/\lambda_{\min}$$；$$\kappa$$ 越大，梯度类方法 收敛越慢（$$\rho\le\bigl(\frac{\kappa-1}{\kappa+1}\bigr)^2$$）， 牛顿方程求解越病态． *用在哪里*：§7.1.2 与 §7.2.1 分析二次罚函数子问题 \"条件数爆炸\"的数值困难，这正是增广拉格朗日函数法的动机．

7.  **广义逆与最小二乘解**：列满秩矩阵 $$M$$ 的最小二乘解为 $$z=(M^\top M)^{-1}M^\top b$$，即用 $$(M^\top M)^{-1}M^\top$$ 左乘． *用在哪里*：定理 7.2、定理 7.5 证明中由梯度条件 $$\nabla c(x^{k+1})\lambda^k\approx\nabla f-\nabla P$$ 反解出乘子 $$\lambda^k$$ 并取极限．

8.  **凸函数的投影刻画**：闭凸集 $$C$$ 上的投影 $$\mathop{\mathrm{Proj}}_C(z)=\operatorname*{arg\,min}_{x\in C}\left\Vert x-z\right\Vert$$ 由最优性条件刻画；区间上 $$\mathop{\mathrm{Proj}}_{[l,u]}(z)=\max\lbracel,\min\lbracez,u\rbrace\rbrace$$；投影后的点满足 $$\left\langle z-\mathop{\mathrm{Proj}}_C(z),\,x-\mathop{\mathrm{Proj}}_C(z)\right\rangle\le 0,\ \forall x\in C$$． *用在哪里*：§7.2.2 一般约束问题消元时 $$s^i=\max\lbrace-\mu^i/\sigma-c^i(x),0\rbrace$$ 的推导、§7.2.4 对偶问题 消去 $$s$$ 的投影 $$P_{\Vert s\Vert_\infty\le1}$$（§7.3 亦用到）．

9.  **矩阵求导（§2.2）**：$$\nabla\bigl(\tfrac12\left\Vert Ax-b\right\Vert^2\bigr)
            =A^\top(Ax-b)$$；$$\nabla_x\bigl(\lambda^\top c(x)\bigr)
            =\nabla c(x)\,\lambda$$，其中 $$\nabla c(x)=[\nabla c_i(x)]_{i\in E}$$ 按列堆叠；海瑟矩阵 $$\nabla^2_{xx}\bigl(\tfrac{\sigma}{2}\left\Vert c(x)\right\Vert^2\bigr)
            =\sigma\Bigl(\sum_i c_i(x)\nabla^2c_i(x)+\nabla c(x)\nabla c(x)^\top\Bigr)$$． *用在哪里*：本章所有罚函数与增广拉格朗日函数的梯度、海瑟 矩阵计算．

10. **微分流形初步（仅 §7.4 需要）**：曲线 $$\gamma(t)$$ 的导数 $$\dot\gamma(0)$$ 给出切向量；对称矩阵空间维数 $$p(p+1)/2$$； QR 分解、极分解与矩阵指数的定义；Sherman--Morrison--Woodbury 求逆公式 $$(A+UV^\top)^{-1}=A^{-1}-A^{-1}U(I+V^\top A^{-1}U)^{-1}V^\top A^{-1}$$． *用在哪里*：切空间与投影算子的推导（例 7.5--7.7）、 斯蒂夫尔流形上的凯莱变换收缩．

</div>

## 本章知识框架

<div class="framework">

`\ifdim\wd\kffitbox>\linewidth
    \resizebox{\linewidth}{!}{\usebox{\kffitbox}}%
  \else
    \ifdim\dimexpr\ht\kffitbox+\dp\kffitbox\relax>0.84\textheight
      \resizebox{!}{0.84\textheight}{\usebox{\kffitbox}}%
    \else
      \usebox{\kffitbox}%
    \fi`{=latex}

</div>

本章的逻辑脉络：**罚函数法**把约束问题化成无约束问题，但为使解可行， 罚因子必须趋于无穷，导致子问题病态（条件数爆炸）；**增广拉格朗日 函数法**在拉格朗日函数中引入乘子并随迭代更新，用\"乘子信息\"替代\"无穷大 罚因子\"，从而在有限罚因子下即可精确逼近最优解------它把 §7.1 的 $$\sigma c_i(x^{k+1})\approx-\lambda_i^*$$ 升级为 $$\lambda^{k+1}_i
=\lambda^k_i+\sigma^kc_i(x^{k+1})$$，约束违反度从 $$O(1/\sigma^k)$$ 降为 $$o(1/\sigma^k)$$；**内点法**是罚函数思想（对数罚函数）在线性规划上的 精致化，中心路径把\"罚因子 $$\to 0$$\"几何化为\"沿路径追踪\"；**流形优化** 则反过来把约束视为迭代空间，用切空间上的梯度、海瑟与收缩算子重建整套 无约束优化算法．本章与第八章的联系：增广拉格朗日函数法的子问题更新、 半光滑牛顿法、交替方向乘子法（ADMM）都将在第八章继续展开．

## 罚函数法

罚函数法（外点罚函数法）的思想：将约束优化问题 (7.0.1) 转化为 *无约束*优化问题求解，无约束问题的目标函数为原目标函数加上与约束 函数有关的**惩罚项**------对可行域外的点惩罚项为正（进行惩罚），对 可行域内的点惩罚项为 $$0$$（不惩罚），从而惩罚项会促使无约束问题的解 落在可行域内．

### 等式约束的二次罚函数法

首先考虑只含等式约束的简单情形： $$\begin{equation}
  \min_{x}\ f(x)
  \ \text{s.t.}\ c_i(x)=0,\ i\in E,
\end{equation}$$ 其中 $$x\in\mathbb{R}^n$$，$$E$$ 为等式约束的指标集，$$c_i(x)$$ 为连续函数．在某些特殊 场合可以直接求解（非线性）方程组 $$c_i(x)=0$$ 消去部分变量，将其转化为 无约束问题；但对一般的函数 $$c_i(x)$$，变量消去不可行，必须采用其他方法．

<div class="definition">

**定义 7.1** 对等式约束最优化问题 (7.2)，定义**二次罚函数** $$\begin{equation}
  P_E(x,\sigma)=f(x)+\frac{1}{2}\sigma\sum_{i\in E}c_i^2(x),
\end{equation}$$ 其中等式右端第二项称为**惩罚项**，$$\sigma>0$$ 称为**罚因子**．

</div>

由于这种罚函数对不满足约束的点进行惩罚，迭代过程中的点列一般处于 可行域之外，因此也被称为**外点罚函数**．二次罚函数的特点：

- 对非可行点，当 $$\sigma$$ 变大时惩罚项权重加大，对罚函数求极小 相当于迫使其极小点向可行域靠近；

- 对可行域内的点，$$P_E(x,\sigma)$$ 的全局极小点与约束问题 (7.2) 的最优解相同．

<div class="example">

**例题 7.1** 为了直观理解罚函数的作用，考虑优化问题 $$\begin{equation}
  \min_{x,y}\ x+\sqrt{3}\,y
  \ \text{s.t.}\ x^2+y^2=1.
\end{equation}$$ 容易求得最优解为 $$x^*=\bigl(-\tfrac12,-\tfrac{\sqrt3}{2}\bigr)^\top$$ （目标函数 $$x+\sqrt3y=\left\langle (1,\sqrt 3),\,(x,y)\right\rangle$$ 在单位圆上的最小值点， 即与向量 $$(1,\sqrt3)$$ 反方向的单位向量）．考虑二次罚函数 $$\begin{equation}
  P_E(x,y,\sigma)=x+\sqrt3\,y+\frac{\sigma}{2}\bigl(x^2+y^2-1\bigr)^2,
\end{equation}$$ 分别取 $$\sigma=1$$ 与 $$\sigma=10$$ 绘制其等高线，可以观察到：

1.  随着 $$\sigma$$ 增大，$$P_E(x,y,\sigma)$$ 的最小值点与原问题最小值点 越来越接近；

2.  但最优点附近的等高线越来越**趋于扁平**（病态加剧）， 这导致求解无约束子问题的难度变大；

3.  当 $$\sigma=10$$ 时函数出现了一个极大值，罚函数图形在 $$x^*$$ 附近 出现了一个**鞍点**------罚函数不再是凸函数， 子问题可能出现多个局部极小点．

</div>

给定罚因子 $$\sigma$$，可用 $$P_E(x,\sigma)$$ 的最小值点作为原问题的近似解． 但实际情况并不总是如此：

<div class="example">

**例题 7.2** 考虑优化问题 $$\begin{equation}
  \min_{x,y}\ -x^2+2y^2
  \ \text{s.t.}\ x=1.
\end{equation}$$ 通过消去变量容易得知最优解就是 $$(1,0)^\top$$．但考虑罚函数 $$\begin{equation}
  P_E(x,y,\sigma)=-x^2+2y^2+\frac{\sigma}{2}(x-1)^2,
\end{equation}$$ 对任意的 $$\sigma\le 2$$，该罚函数**无下界**：事实上令 $$y=0$$， $$P_E(x,0,\sigma)=\bigl(\tfrac{\sigma}{2}-1\bigr)x^2-\sigma x+\tfrac\sigma2$$， 当 $$\sigma\le 2$$ 时二次项系数非正，$$x\to\infty$$ 时函数值 $$\to-\infty$$．

</div>

出现以上现象的原因是：当罚因子过小时，*不可行点处的目标函数下降* 抵消了*罚函数对约束违反的惩罚*．实际上所有外点罚函数法均存在这个 问题，因此 $$\sigma$$ 的初值选取不应太小．

### 二次罚函数法算法与注意事项

<div class="algorithm">

**算法 12**

**输入**：$$\sigma_1>0$$，初始点 $$x^0$$，罚因子增长系数 $$\rho>1$$，$$k\leftarrow 1$$．

<div class="algorithmic">

以 $$x^k$$ 为初始点，求解 $$x^{k+1}=\operatorname*{arg\,min}_x P_E(x,\sigma^k)$$； 选取 $$\sigma^{k+1}=\rho\sigma^k$$； $$k\leftarrow k+1$$；

</div>

</div>

算法 12 先选取一系列指数增长的罚因子 $$\sigma^k$$， 再针对每个罚因子求解 $$P_E(x,\sigma^k)$$ 的（局部）最小值点．这种逐步增加 罚因子的策略在实际中被广泛使用，例如在 LASSO 问题求解中被称为 **连续化**（continuation）．其中 $$\operatorname*{arg\,min}$$ 的含义是如下情形之一：

1.  $$x^{k+1}$$ 是 $$P_E(x,\sigma^k)$$ 的*全局*极小解；

2.  $$x^{k+1}$$ 是 $$P_E(x,\sigma^k)$$ 的*局部*极小解；

3.  $$x^{k+1}$$ 不是严格的极小解，但近似满足一阶最优性条件 $$\nabla_xP_E(x^{k+1},\sigma^k)\approx 0$$．

**三点注意事项**：

1.  **参数 $$\sigma^k$$ 的选取需小心**：$$\sigma^k$$ 增长太快则子问题 不易求解（见后面数值困难的分析）；增长太慢则外迭代次数增多． 比较合理的取法是根据当前 $$P_E(x,\sigma^k)$$ 的求解难度确定增幅： 若当前子问题收敛很快，下一步可选取较大的 $$\sigma^{k+1}$$， 否则不宜过分增大 $$\sigma^k$$；

2.  **发散检测**：$$\sigma$$ 较小时 $$P_E(x,\sigma)$$ 可能无界 （例 7.2），迭代会发散；一旦检测到迭代点 发散，应立即终止子问题求解并增大罚因子；

3.  **子问题求解精度**：子问题的求解精度必须足够高， 为保证收敛，子问题求解误差需要趋于零．

### 收敛性分析

本小节讨论等式约束二次罚函数法的收敛性．为讨论方便，假设对每个 $$\sigma^k$$，$$P_E(x,\sigma^k)$$ 的最小值点都存在（该假设对某些问题不成立， 本质原因是二次罚函数的惩罚力度不够，此时不应使用二次罚函数法）．

<div class="theorem">

**定理 7.1** 设 $$x^{k+1}$$ 是 $$P_E(x,\sigma^k)$$ 的**全局**极小解，$$\sigma^k$$ 单调上升 趋于无穷，则 $$\lbracex^k\rbrace$$ 的每个极限点 $$x^*$$ 都是原问题 (7.2) 的全局极小解．

</div>

**Proof** **（）** 设 $$\bar x$$ 是原问题 (7.2) 的全局极小解，即 $$f(\bar x)\le f(x)$$ 对所有满足 $$c_i(x)=0\ (i\in E)$$ 的 $$x$$ 成立． 由 $$x^{k+1}$$ 是 $$P_E(x,\sigma^k)$$ 的全局极小解，有 $$P_E(x^{k+1},\sigma^k)\le P_E(\bar x,\sigma^k)$$，即 $$\begin{equation}
  f(x^{k+1})+\frac{\sigma^k}{2}\sum_{i\in E}c_i^2(x^{k+1})
  \le f(\bar x)+\frac{\sigma^k}{2}\sum_{i\in E}c_i^2(\bar x)=f(\bar x).
\end{equation}$$ 整理可得 $$\begin{equation}
  \sum_{i\in E}c_i^2(x^{k+1})\le\frac{2}{\sigma^k}
  \bigl(f(\bar x)-f(x^{k+1})\bigr).
\end{equation}$$ 设 $$x^*$$ 是 $$\lbracex^k\rbrace$$ 的一个极限点，不妨设 $$x^k\to x^*$$．在 (7.9) 中令 $$k\to\infty$$，根据 $$c_i(x)$$ 与 $$f(x)$$ 的 连续性以及 $$\sigma^k\to+\infty$$ 可知 $$\sum_{i\in E}c_i^2(x^*)=0$$， 即 $$x^*$$ 是原问题的可行解．又由 (7.8) 得 $$f(x^{k+1})\le f(\bar x)$$，两边取极限得 $$f(x^*)\le f(\bar x)$$； 由 $$\bar x$$ 的最优性可知 $$f(x^*)=f(\bar x)$$，即 $$x^*$$ 也是全局极小解．

定理 7.1 要求子问题的*全局*极小解，实际 应用中难以做到，只能将子问题求解到一定精度，因此其应用场合十分有限． 下面从*最优性条件*的角度给出更实用的收敛结果．

<div class="theorem">

**定理 7.2** 设 $$f(x)$$ 与 $$c_i(x)\ (i\in E)$$ 连续可微，正数序列 $$\varepsilon^k\to0$$， $$\sigma^k\to+\infty$$，算法 12 中子问题的解 $$x^{k+1}$$ 满足 $$\begin{equation}
  \left\Vert\nabla_xP_E(x^{k+1},\sigma^k)\right\Vert\le\varepsilon^k,
\end{equation}$$ 而对 $$\lbracex^k\rbrace$$ 的任何极限点 $$x^*$$，梯度组 $$\lbrace\nabla c_i(x^*)\rbrace_{i\in E}$$ 线性无关，则 $$x^*$$ 是等式约束问题 (7.2) 的 KKT 点，且 $$\begin{equation}
  \lim_{k\to\infty}\bigl(-\sigma^kc_i(x^{k+1})\bigr)=\lambda_i^*,
  \qquad \forall i\in E,
\end{equation}$$ 其中 $$\lambda_i^*$$ 是约束 $$c_i(x^*)=0$$ 对应的拉格朗日乘子．

</div>

**Proof** **（）** 容易求出 $$P_E(x,\sigma^k)$$ 的梯度为 $$\begin{equation}
  \nabla P_E(x,\sigma^k)=\nabla f(x)+\sum_{i\in E}\sigma^kc_i(x)\nabla c_i(x).
\end{equation}$$ 由子问题求解的终止准则，对 $$x^{k+1}$$ 有 $$\begin{equation}
  \left\Vert\nabla f(x^{k+1})+\sum_{i\in E}\sigma^kc_i(x^{k+1})\nabla c_i(x^{k+1})\right\Vert
  \le\varepsilon^k.
\end{equation}$$ 利用三角不等式 $$\left\Vert a\right\Vert-\left\Vert b\right\Vert\le\left\Vert a+b\right\Vert$$，将 (7.13) 变形为 $$\begin{equation}
  \left\Vert\sum_{i\in E}c_i(x^{k+1})\nabla c_i(x^{k+1})\right\Vert
  \le\frac{1}{\sigma^k}\bigl(\varepsilon^k+\left\Vert\nabla f(x^{k+1})\right\Vert\bigr).
\end{equation}$$ 不妨设 $$x^k\to x^*$$，在 (7.14) 中令 $$k\to\infty$$， 根据连续性与 $$\sigma^k\to+\infty$$ 得 $$\sum_{i\in E}c_i(x^*)\nabla c_i(x^*)=0$$．又 $$\lbrace\nabla c_i(x^*)\rbrace_{i\in E}$$ 线性无关，故必有 $$c_i(x^*)=0\ \forall i\in E$$，即 $$x^*$$ 是可行点．

下面构造乘子说明梯度条件成立．记 $$\begin{equation}
  \nabla c(x)=\bigl[\nabla c_i(x)\bigr]_{i\in E},
\end{equation}$$ 并定义 $$\lambda_i^k=-\sigma^kc_i(x^{k+1})$$，$$\lambda^k
=(\lambda_1^k,\dots,\lambda_{\vert E\vert}^k)^\top$$，则梯度式 (7.12) 可改写为 $$\begin{equation}
  \nabla c(x^{k+1})\lambda^k=\nabla f(x^{k+1})-\nabla P_E(x^{k+1},\sigma^k).
\end{equation}$$ 由条件知 $$\nabla c(x^*)$$ 列满秩，而 $$x^k\to x^*$$，故 $$k$$ 充分大时 $$\nabla c(x^{k+1})$$ 列满秩，可用其广义逆表示 $$\lambda^k$$： $$\begin{equation}
  \lambda^k=\bigl(\nabla c(x^{k+1})^\top\nabla c(x^{k+1})\bigr)^{-1}
  \nabla c(x^{k+1})^\top\bigl(\nabla f(x^{k+1})-\nabla_xP_E(x^{k+1},\sigma^k)\bigr).
\end{equation}$$ 两边关于 $$k$$ 取极限，并注意到 $$\nabla_xP_E(x^{k+1},\sigma^k)\to0$$，有 $$\begin{equation}
  \lambda^*\coloneqq\lim_{k\to\infty}\lambda^k
  =\bigl(\nabla c(x^*)^\top\nabla c(x^*)\bigr)^{-1}
  \nabla c(x^*)^\top\nabla f(x^*).
\end{equation}$$ 最后在 (7.12) 中令 $$k\to\infty$$ 得 $$\nabla f(x^*)-\nabla c(x^*)\lambda^*=0$$，即 KKT 梯度条件成立， 且 (7.11) 自动成立．

聚点与约束违反度**（聚点与约束违反度）**  定理 7.2 的证明过程中还可得到一个推论：不管 $$\lbrace\nabla c_i(x^*)\rbrace$$ 是否线性无关，算法 12 给出 的解 $$x^k$$ 的聚点总是 $$\varphi(x)=\left\Vert c(x)\right\Vert_2$$ 的一个稳定点．这说明 即便没有找到可行解，也找到了使约束违反度相对较小的解．此外，定理 7.2 不要求每个子问题精确求解，但要获得原问题的解， 子问题解的精度需要*越来越高*；它没有给出非渐进的误差估计，即没有 说明给定原问题目标精度时 $$\varepsilon^k$$ 应如何选取．

##### 从 KKT 条件角度分析：为什么 $$\sigma$$ 必须趋于无穷

定理 7.2 的乘子估计还可以从*对比两个问题的 KKT 条件*直接看出．原问题 (7.2) 的 KKT 条件为 $$\begin{equation}
  \nabla f(x^*)-\sum_{i\in E}\lambda_i^*\nabla c_i(x^*)=0,
  \qquad
  c_i(x^*)=0,\ \forall i\in E,
\end{equation}$$ （记号约定：拉格朗日函数取 $$L=f-\sum\lambda_ic_i$$，与 §7.2 相差一个 乘子符号）．而添加罚函数项之后的无约束问题 $$\min_x P_E(x,\sigma)$$ 的 （一阶）KKT 条件（梯度式）为 $$\begin{equation}
  \nabla f(x)+\sum_{i\in E}\sigma c_i(x)\nabla c_i(x)=0.
\end{equation}$$ 假设两个问题收敛到同一点，对比两个梯度条件，应有 $$\begin{equation}
  \sigma c_i(x)\approx-\lambda_i^*,
  \qquad \forall i\in E.
\end{equation}$$ 最优点处的乘子 $$\lambda_i^*$$ 是*固定*的：为使等式右端不漂移、同时 让约束 $$c_i(x)=0$$ 成立（左端 $$\sigma c_i(x)$$ 中的 $$c_i(x)\to0$$）， 必须 $$\sigma\to\infty$$．这就是\"二次罚函数法需要罚因子趋于无穷\"的 KKT 解释，也与定理 7.2 的 (7.11)（$$-\sigma^kc_i(x^{k+1})\to\lambda_i^*$$） 完全一致．

##### 数值困难：条件数爆炸

要想得到原问题的解，罚因子 $$\sigma^k$$ 必须趋于正无穷．以下从矩阵 *条件数*的角度说明，此时子问题求解难度显著变大．罚函数的海瑟矩阵为 $$\begin{equation}
  \nabla^2_{xx}P_E(x,\sigma)
  =\nabla^2f(x)+\sum_{i\in E}\sigma c_i(x)\nabla^2c_i(x)
  +\sigma\nabla c(x)\nabla c(x)^\top.
\end{equation}$$ 当 $$x$$ 接近最优点时，由定理 7.2 应有 $$-\sigma c_i(x)\approx\lambda_i^*$$，因此可用拉格朗日函数 $$L(x,\lambda^*)$$ 的海瑟矩阵近似 (7.22) 右端前两项： $$\begin{equation}
  \nabla^2_{xx}P_E(x,\sigma)\approx\nabla^2_{xx}L(x,\lambda^*)
  +\sigma\nabla c(x)\nabla c(x)^\top.
\end{equation}$$ 其中 $$\nabla c(x)\nabla c(x)^\top$$ 半正定且奇异（有 $$n-\vert E\vert$$ 个特征值为 $$0$$），故 (7.23) 右端是一个*定值矩阵*加上一个 *最大特征值趋于正无穷*的奇异矩阵．直观上，海瑟矩阵的条件数会越来 越大（等高线越来越密集），使用梯度类算法求解将非常困难；若使用牛顿法， 则求解牛顿方程本身就是病态线性方程组问题．因此实际应用中不可能令 罚因子趋于正无穷------这正是引入**增广拉格朗日函数法**（§7.2） 的动机．

### 一般约束问题的二次罚函数法

上一小节只考虑了等式约束，现在考虑不等式约束问题 $$\begin{equation}
  \min_{x}\ f(x)
  \ \text{s.t.}\ c_i(x)\le 0,\ i\in I.
\end{equation}$$ 它与等式约束问题最大的不同是允许 $$c_i(x)<0$$ 发生：若仍以 $$\left\Vert c(x)\right\Vert^2$$ 定义罚函数，会把 $$c_i(x)<0$$ 的*可行点*也惩罚，这显然不是我们需要的． 因此新的二次罚函数应当**只惩罚 $$c_i(x)>0$$ 的点，而对可行点不作 惩罚**．

<div class="definition">

**定义 7.2** 对不等式约束最优化问题 (7.24)，定义二次罚函数 $$\begin{equation}
  P_I(x,\sigma)=f(x)+\frac{1}{2}\sigma\sum_{i\in I}\tilde c_i^2(x),
\end{equation}$$ 其中右端第二项称为惩罚项，$$\tilde c_i(x)$$ 的定义为 $$\begin{equation}
  \tilde c_i(x)=\max\lbracec_i(x),\,0\rbrace,
\end{equation}$$ 常数 $$\sigma>0$$ 称为罚因子．

</div>

注意到 $$h(t)=(\max\lbracet,0\rbrace)^2$$ 关于 $$t$$ 是可导的（$$h'(t)=2\max\lbracet,0\rbrace$$， 在 $$t=0$$ 处左右导数均为 $$0$$），因此 $$P_I(x,\sigma)$$ 的**梯度存在**， 可以使用梯度类算法求解子问题；然而一般来讲 $$P_I(x,\sigma)$$ *不是 二阶可导的*（$$h$$ 在 $$t=0$$ 处二阶导数不存在），因此不能直接使用二阶 算法（如牛顿法），可以考虑能处理不可微情形的二阶算法（如第八章的 半光滑牛顿法）------这是不等式约束二次罚函数的不足之处．求解不等式约束 问题的罚函数法结构与算法 12 完全相同．

一般的约束优化问题既含等式又含不等式约束： $$\begin{equation}
  \min_{x}\ f(x)
  \ \text{s.t.}\ c_i(x)=0,\ i\in E;\qquad c_i(x)\le 0,\ i\in I.
\end{equation}$$

<div class="definition">

**定义 7.3** 对一般约束最优化问题 (7.27)，定义二次罚函数 $$\begin{equation}
  P(x,\sigma)=f(x)+\frac{1}{2}\sigma
  \Bigl[\sum_{i\in E}c_i^2(x)+\sum_{i\in I}\tilde c_i^2(x)\Bigr],
\end{equation}$$ 其中右端第二项称为惩罚项，$$\tilde c_i(x)$$ 的定义如 (7.26)， 常数 $$\sigma>0$$ 称为罚因子．

</div>

### 应用举例

许多优化问题的建模本身就应用了罚函数思想，罚函数法可自然地用于这类 问题的求解．

##### 1. LASSO 问题求解

考虑 LASSO 问题 $$\begin{equation}
  \min_{x}\ \frac12\left\Vert Ax-b\right\Vert^2+\mu\left\Vert x\right\Vert_1,
\end{equation}$$ 其中 $$\mu>0$$ 是正则化参数．求解 LASSO 问题的最终目标往往是解决 **基追踪**（basis pursuit, BP）问题 $$\begin{equation}
  \min_{x}\ \left\Vert x\right\Vert_1
  \ \text{s.t.}\ Ax=b,
\end{equation}$$ 其中 $$Ax=b$$ 是欠定方程组．BP 问题是等式约束的非光滑优化问题，对其中的 等式约束 $$Ax=b$$ 引入二次罚函数，可得 $$\begin{equation}
  \min_{x}\ \left\Vert x\right\Vert_1+\frac{\sigma}{2}\left\Vert Ax-b\right\Vert^2.
\end{equation}$$ 令 $$\mu=\dfrac{1}{\sigma}$$，则容易看出：以 $$\dfrac{1}{\mu}$$ 作为二次罚因子 时，BP 问题的罚函数子问题**恰好等价于 LASSO 问题** (7.29)．这一观察说明两点：

1.  LASSO 问题的解与 BP 问题的解本身*不等价*，当 $$\mu\to0^+$$ 时 LASSO 的解才收敛到 BP 的解；

2.  当 $$\mu$$ 较小时（等价于罚因子 $$\sigma=1/\mu$$ 很大），BP 问题的 罚函数比较病态，直接求解收敛速度很慢．根据罚函数思想，罚因子 应*逐渐*增加到无穷，这等价于在 LASSO 问题中先取较大的 $$\mu$$， 之后不断缩小 $$\mu$$ 直至目标值------这就是连续化策略 （算法 13）．

<div class="algorithm">

**算法 13**

**输入**：初值 $$x^0$$，最终参数 $$\mu$$，初始参数 $$\mu_0$$，因子 $$\gamma\in(0,1)$$，$$k\leftarrow 0$$．

<div class="algorithmic">

以 $$x^k$$ 为初值求解 $$x^{k+1}=\operatorname*{arg\,min}_x\bigl\lbrace\tfrac12\left\Vert Ax-b\right\Vert^2+\mu^k\left\Vert x\right\Vert_1\bigr\rbrace$$； 停止迭代，输出 $$x^{k+1}$$；  更新 $$\mu^{k+1}=\max\lbrace\mu,\ \gamma\mu^k\rbrace$$；$$k\leftarrow k+1$$；

</div>

</div>

LASSO 子问题可用第六章的次梯度法求解，也可用第八章的多种非光滑优化 方法求解．讲义图 7.2 展示了罚函数法与直接次梯度法求解 LASSO 的对比 （取 $$\mu=10^{-3}$$，连续化中 $$\mu$$ 从 $$10$$ 开始、$$\gamma=0.1$$，次梯度法 固定步长 $$\alpha=0.0002$$）：**罚函数法的效果明显更好**．迭代初期 $$\mu$$ 较大，意味着约束 $$Ax=b$$ 可以暂不满足，算法把优化重点放在 $$\left\Vert x\right\Vert_1$$ 上；随着迭代进行 $$\mu$$ 单调减小，算法逐渐更注重可行性 （$$\left\Vert Ax-b\right\Vert$$ 的大小）．若一开始就取 $$\mu=10^{-3}$$，惩罚项 $$\left\Vert Ax-b\right\Vert^2$$ 的权重太大，次梯度法会尽量满足 $$Ax=b$$ 而忽视 $$\left\Vert x\right\Vert_1$$ 的作用，效果不佳．若子问题用第八章的（不精确）近似点梯度法求解， 算法 13 等价于求解 $$\ell_1$$ 极小化问题的 FPC（fixed-point continuation）算法．

##### 2. 矩阵补全问题

第一章介绍的低秩矩阵恢复（矩阵补全）问题 $$\begin{equation}
  \min_{X}\ \left\Vert X\right\Vert_*
  \ \text{s.t.}\ X_{ij}=M_{ij},\ (i,j)\in\Omega
\end{equation}$$ （$$\Omega$$ 为已知元素下标集），对其中的等式约束引入二次罚函数得到 $$\begin{equation}
  \min_{X}\ \left\Vert X\right\Vert_*+\frac{\sigma}{2}\sum_{(i,j)\in\Omega}(X_{ij}-M_{ij})^2.
\end{equation}$$ 当罚因子 $$\sigma=\dfrac1\mu$$ 时，罚函数恰好对应 $$\begin{equation}
  \min_{X}\ \mu\left\Vert X\right\Vert_*+\frac12\sum_{(i,j)\in\Omega}(X_{ij}-M_{ij})^2,
\end{equation}$$ 即第一章的松弛形式．于是可以使用罚函数法的策略求解矩阵补全问题： 给定 $$\mu$$ 递减的序列 $$\lbrace\mu^k\rbrace$$，逐个求解 (7.34) （算法结构与算法 13 完全相同，把 $$x$$ 换成 $$X$$ 即可）． 带核范数子问题 (7.34) 的求解需用第八章的近似点梯度法与 加速近似点梯度法（如 FISTA）；若罚函数法使用（不精确）近似点梯度法 求解子问题，该算法等价于 FPC / FPCA（fixed-point continuation with approximate SVD）算法．

### 其他类型的罚函数法

##### 1. 内点罚函数法（对数罚函数）

前面介绍的二次罚函数均属于**外点**罚函数：求解过程中允许 $$x$$ 位于 可行域之外，罚因子趋于无穷时子问题最优解从可行域*外部*逼近最优解． 若希望子问题最优解序列从可行域*内部*逼近最优解，则需构造 **内点罚函数**：迭代时始终要求 $$x$$ 不违反约束，因此主要用于 *不等式*约束问题 (7.24)．为使迭代点趋于可行域 边界时罚函数趋于正无穷，常用**对数罚函数**：

<div class="definition">

**定义 7.4** 对不等式约束最优化问题 (7.24)，定义对数罚函数 $$\begin{equation}
  P_I(x,\sigma)=f(x)-\sigma\sum_{i\in I}\ln\bigl(-c_i(x)\bigr),
\end{equation}$$ 其中右端第二项称为惩罚项，$$\sigma>0$$ 称为罚因子．

</div>

容易看到 $$P_I(x,\sigma)$$ 的定义域为 $$\lbracex: c_i(x)<0,\ \forall i\in I\rbrace$$， 因此迭代过程中 $$x$$ *严格*位于可行域内部；当 $$x$$ 趋于可行域边界时 $$-\ln(-c_i)\to+\infty$$，故 $$P_I\to+\infty$$，说明对数罚函数的极小值严格 位于可行域内部．然而原问题 (7.24) 的最优解通常位于 可行域*边界*（至少一个 $$c_i(x^*)=0$$），此时需要调整罚因子 $$\sigma$$ 使其趋于 $$0$$，这会减弱对数罚函数在边界附近的惩罚效果．

<div class="example">

**例题 7.3** 考虑优化问题 $$\begin{equation}
  \min_{x,y}\ x^2+2xy+y^2+2x-2y
  \ \text{s.t.}\ x\ge 0,\ y\ge 0.
\end{equation}$$ 容易求出该问题最优解为 $$x^*=0,\ y^*=1$$（目标可写为 $$(x+y)^2+2(x-y)$$）．考虑对数罚函数 $$\begin{equation}
  P_I(x,y,\sigma)=x^2+2xy+y^2+2x-2y-\sigma(\ln x+\ln y).
\end{equation}$$ 分别取 $$\sigma=1$$ 与 $$\sigma=0.4$$ 绘制等高线：随着 $$\sigma$$ *减小*， $$P_I$$ 的最小值点与原问题最小值点越来越接近；但当 $$x$$ 或 $$y$$ 趋于可行域 边界（$$0$$）时，$$P_I$$ 趋于正无穷，最优解始终被挡在可行域内部．

</div>

<div class="algorithm">

**算法 14**

**输入**：$$\sigma^0>0$$，**可行**初始点 $$x^0$$（$$c_i(x^0)<0,\ \forall i\in I$$）， 罚因子缩小系数 $$\rho\in(0,1)$$，$$k\leftarrow 0$$．

<div class="algorithmic">

以 $$x^k$$ 为初始点，求解 $$x^{k+1}=\operatorname*{arg\,min}_x P_I(x,\sigma^k)$$； 选取 $$\sigma^{k+1}=\rho\sigma^k$$； $$k\leftarrow k+1$$；

</div>

</div>

与二次罚函数法不同，算法 14 要求初始点 $$x^0$$ 是可行解（由对数罚函数定义域决定）．常用收敛准则为 $$\begin{equation}
  \Bigl\vert\sigma^k\sum_{i\in I}\ln\bigl(-c_i(x^{k+1})\bigr)\Bigr\vert\le\varepsilon,
\end{equation}$$ 其中 $$\varepsilon>0$$ 为给定精度．实际上可以证明（见讲义习题 7.4） 算法 14 产生的迭代点列满足 $$\begin{equation}
  \lim_{k\to\infty}\sigma^k\sum_{i\in I}\ln\bigl(-c_i(x^{k+1})\bigr)=0.
\end{equation}$$ 同样地，内点罚函数法也有类似外点罚函数法的数值困难：当 $$\sigma\to0^+$$ 时，子问题 $$P_I(x,\sigma)$$ 的海瑟矩阵条件数趋于无穷，子问题求解越来越 困难（现象同样可从例 7.3 的等高线扁平化中观察到， 读者可仿照二次罚函数的情形做类似分析）．

##### 2. 精确罚函数法

二次罚函数与对数罚函数的共同特点是：求解时必须令罚因子趋于正无穷 （或零），这带来数值困难．而有些罚函数在*罚因子有限*时，极小化 得到的解恰好就是原问题的精确解------这类罚函数称为**精确罚函数**． 这个性质设计算法时非常有用，使用精确罚函数的算法通常有比较好的性质． 常用的精确罚函数是 $$\ell_1$$ 罚函数：

<div class="definition">

**定义 7.5** 对一般约束最优化问题 (7.27)，定义 $$\ell_1$$ 罚函数 $$\begin{equation}
  P(x,\sigma)=f(x)+\sigma\Bigl[\sum_{i\in E}\left\vert c_i(x)\right\vert
  +\sum_{i\in I}\tilde c_i(x)\Bigr],
\end{equation}$$ 其中右端第二项称为惩罚项，$$\tilde c_i(x)$$ 的定义如 (7.26)， 常数 $$\sigma>0$$ 称为罚因子．

</div>

与二次罚函数不同，$$\ell_1$$ 罚函数用*绝对值*代替平方来构造惩罚项， 实际上是对约束违反度的 $$\ell_1$$ 范数进行惩罚．注意 $$\ell_1$$ 罚函数 **不是可微函数**，求解此罚函数导出的子问题依赖第八章的内容． 下面的定理揭示了 $$\ell_1$$ 罚函数的精确性（证明可参考讲义所引文献 Nocedal & Wright）：

<div class="theorem">

**定理 7.3** 设 $$x^*$$ 是一般约束优化问题 (7.27) 的一个严格局部 极小解，且满足 KKT 条件，对应的拉格朗日乘子为 $$\lambda_i^*,\ i\in E\cup I$$，则当罚因子 $$\begin{equation}
  \sigma>\sigma^*\coloneqq\left\Vert\lambda^*\right\Vert_\infty=\max_i\left\vert\lambda_i^*\right\vert
\end{equation}$$ 时，$$x^*$$ 也是 $$P(x,\sigma)$$ (7.40) 的一个局部极小解．

</div>

定理 7.3 说明：对于精确罚函数，当罚因子*充分大* （但不需要是正无穷）时，原问题的极小值点就是 $$\ell_1$$ 罚函数的极小值点， 这与定理 7.1（要求 $$\sigma\to+\infty$$）有本质 区别．直观理解：最优乘子的范数 $$\left\Vert\lambda^*\right\Vert_\infty$$ 恰好度量了 \"违反单位约束所能换取的目标函数下降量\"，罚因子超过它之后，任何约束 违反带来的目标下降都不足以补偿惩罚，最优解便\"钉\"在了 $$x^*$$ 处． （增广拉格朗日函数在一定条件下也是精确罚函数，见定理 7.4．）

## 增广拉格朗日函数法

在二次罚函数法中，由定理 7.2 的乘子估计式有 $$\begin{equation}
  c_i(x^{k+1})\approx-\frac{\lambda_i^*}{\sigma^k},
  \qquad \forall i\in E.
\end{equation}$$ 因此为了保证可行性，罚因子必须趋于正无穷，子问题因条件数爆炸而难以 求解．那么，能否对二次罚函数做某种修正，使得对*有限*的罚因子， 得到的逼近最优解也是（近似）可行的？**增广拉格朗日函数法**正是 这样的方法：它利用有限的罚因子逼近最优解，避免了罚因子迅速膨胀的 数值困难．

### 等式约束优化问题的增广拉格朗日函数法

##### 1. 增广拉格朗日函数法的构造

增广拉格朗日函数法每一步构造一个增广拉格朗日函数，其构造依赖于 拉格朗日函数与约束的二次罚函数：*在拉格朗日函数的基础上， 添加等式约束的二次罚函数*．对等式约束问题 (7.2)， 定义

<div class="definition">

**定义 7.6** 对等式约束问题 (7.2)，定义**增广拉格朗日函数** $$\begin{equation}
  L_\sigma(x,\lambda)=f(x)+\sum_{i\in E}\lambda_ic_i(x)
  +\frac{1}{2\sigma}\sum_{i\in E}c_i^2(x).
\end{equation}$$

</div>

罚因子的记号**（罚因子的记号）**  注意本节记号 $$L_\sigma$$ 中 $$\sigma$$ 出现在*分母*：$$L_\sigma=L+
\frac{1}{2\sigma}\left\Vert c\right\Vert^2$$．有的文献（及 §7.2.2 的一般约束情形）把 罚项写作 $$\frac{\sigma}{2}\left\Vert c\right\Vert^2$$，两种写法通过 $$\sigma\leftrightarrow
1/\sigma$$ 互换，读者阅读不同教材时需留意．本节遵循讲义：等式约束情形 罚项系数为 $$\frac{1}{2\sigma}$$，乘子更新相应为 $$\lambda^{k+1}=\lambda^k+\sigma^kc(x^{k+1})$$（$$\sigma^k$$ 出现在分子）， 两者并不矛盾------梯度的表达式相同（见 (7.44)）．

在第 $$k$$ 步迭代，给定罚因子 $$\sigma^k$$ 和乘子 $$\lambda^k$$，$$L_{\sigma^k}(x,\lambda^k)$$ 的最小值点 $$x^{k+1}$$ 应满足梯度条件 $$\begin{equation}
  \nabla_xL_{\sigma^k}(x^{k+1},\lambda^k)
  =\nabla f(x^{k+1})+\sum_{i\in E}
  \bigl(\lambda_i^k+\sigma^kc_i(x^{k+1})\bigr)\nabla c_i(x^{k+1})=0.
\end{equation}$$ 而问题 (7.2) 的最优解 $$x^*$$ 及相应乘子 $$\lambda^*$$ 满足 KKT 梯度条件 $$\begin{equation}
  \nabla f(x^*)+\sum_{i\in E}\lambda_i^*\nabla c_i(x^*)=0.
\end{equation}$$ 为保证 (7.44) 与 (7.45) 在最优解处的 一致性，对充分大的 $$k$$ 应满足 $$\begin{equation}
  \lambda_i^*\approx\lambda_i^k+\sigma^kc_i(x^{k+1}),\qquad \forall i\in E,
\end{equation}$$ 即等价于 $$\begin{equation}
  c_i(x^{k+1})\approx\frac{1}{\sigma^k}\bigl(\lambda_i^*-\lambda_i^k\bigr).
\end{equation}$$

由此得出我们希望设计的增广拉格朗日算法具有的特性：

乘子更新降低约束违反度**（乘子更新降低约束违反度）**  **命题 7.4.1** 增广拉格朗日函数法通过合理更新乘子，即通过控制 $$\lambda_i^*-\lambda_i^k$$ 来降低约束违反度：根据 (7.47)，当 $$\lambda_i^k$$ 足够接近 $$\lambda_i^*$$ 时，$$c_i(x^{k+1})$$ 将远小于 $$1/\sigma^k$$ （对比二次罚函数法的 (7.42)：违反度正比于 $$1/\sigma^k$$）．

(7.47) 的一个截断近似给出乘子更新格式： $$\begin{equation}
  \lambda_i^{k+1}=\lambda_i^k+\sigma^kc_i(x^{k+1}),\qquad \forall i\in E.
\end{equation}$$

<div class="algorithm">

**算法 15**

**输入**：初始点 $$x^0\in\mathbb{R}^n$$，乘子 $$\lambda^0$$，罚因子 $$\sigma^0>0$$，约束违反度常数 $$\varepsilon>0$$，精度 $$\eta^k>0$$，$$k=0$$．

<div class="algorithmic">

以 $$x^k$$ 为初始点求解 $$\min_x L_{\sigma^k}(x,\lambda^k)$$， 得到满足精度条件 $$\left\Vert\nabla_xL_{\sigma^k}(x,\lambda^k)\right\Vert\le\eta^k$$ 的解 $$x^{k+1}$$； 返回近似解 $$(x^{k+1},\lambda^k)$$，终止迭代； 更新乘子：$$\lambda^{k+1}=\lambda^k+\sigma^kc(x^{k+1})$$； 更新罚因子：$$\sigma^{k+1}=\rho\sigma^k$$；

</div>

</div>

##### 2. 实例：增广拉格朗日 vs 二次罚函数

<div class="example">

**例题 7.4** 仍考虑例 7.1 的问题 $$\begin{equation}
  \min_{x,y}\ x+\sqrt3\,y
  \ \text{s.t.}\ x^2+y^2=1.
\end{equation}$$ 其最优解为 $$x^*=\bigl(-\tfrac12,-\tfrac{\sqrt3}{2}\bigr)^\top$$，相应的 拉格朗日乘子 $$\lambda^*=1$$（在 $$x^*$$ 处目标梯度 $$(1,\sqrt3)^\top$$ 恰为 约束梯度 $$2x^*$$ 的 $$-1/2$$ 倍的两倍，即 $$\nabla f(x^*)=-\lambda^*\nabla c(x^*)$$， $$\nabla c(x^*)=(2x^*,2y^*)=(-1,-\sqrt3)$$， 故 $$\lambda^*=1$$）．根据增广拉格朗日函数的形式写出本问题的 $$\begin{equation}
  L_\sigma(x,y,\lambda)=x+\sqrt3\,y+\lambda\bigl(x^2+y^2-1\bigr)
  +\frac{\sigma}{2}\bigl(x^2+y^2-1\bigr)^2,
\end{equation}$$ 并绘制 $$L_2(x,y,0.9)$$ 的等高线（$$\sigma=2$$、$$\lambda=0.9$$，图中标 \"$$*$$\"$$"$$ 的点为原问题最优解 $$x^*$$，标 \"$$\circ$$\" 的点为罚函数或增广 拉格朗日函数的最优解）：

- **二次罚函数**（$$\sigma=2$$）求出的最优解约为 $$(-0.5957,\ -1.0319)$$，与最优解的欧氏距离约 $$0.1915$$， 约束违反度约 $$0.4197$$；

- **增广拉格朗日函数**求出的最优解约为 $$(-0.5100,\ -0.8833)$$，与最优解的欧氏距离约 $$0.02$$， 约束违反度约 $$0.0403$$．

由此可见如下经验性结论：*增广拉格朗日函数法可具有比二次罚函数法 更精确的寻优能力，且约束违反度一般更低*（本例中距离与违反度都约为 二次罚函数法的 $$1/10$$）；需要注意的是，这依赖于乘子的选取 （本例取 $$\lambda=0.9$$，已接近真值 $$\lambda^*=1$$）．

</div>

##### 3. 参数 $$\rho$$ 与 $$\sigma^k$$ 的取值指导

在每次迭代确定 $$\sigma^k$$ 时，应考虑如下问题． $$\sigma^k$$ **不应增长过快**： (1) 随着罚因子 $$\sigma^k$$ 的增大，$$L_{\sigma^k}(x,\lambda^k)$$ 关于 $$x$$ 的海瑟矩阵的条件数也将增大（原因与 §7.1.2 末尾的分析相同），这将导致 数值困难； (2) $$\sigma^k$$ 与 $$\sigma^{k+1}$$ 接近时，$$x^k$$ 可以作为求解 $$x^{k+1}$$ 的初始点，以加快收敛------罚因子骤变会使这个暖启动失效． $$\sigma^k$$ **不应增长过慢**：否则算法整体的收敛速度将变慢 （惩罚不足）．因此在实际中，应把 $$\sigma^k$$ 的增长维持在合理的速度 区间内；一个简单的方法是维持 $$\rho\in[2,10]$$，近年也有学者设计了更 合理的自适应方法．

##### 4. 收敛性分析之一：增广拉格朗日函数是精确罚函数

增广拉格朗日函数作为罚函数的一种，自然的问题是：它的极小值点与原问题 (7.2) 的极小值点有什么关系？

<div class="theorem">

**定理 7.4** 设 $$x^*,\lambda^*$$ 分别为问题 (7.2) 的局部极小解和相应 的乘子，且在点 $$x^*$$ 处 LICQ 与二阶充分条件成立．则： 存在有限的常数 $$\bar\sigma$$，对任意的 $$\sigma\ge\bar\sigma$$， $$x^*$$ 都是 $$L_\sigma(x,\lambda^*)$$ 的严格局部极小解． 反之，若 $$x^*$$ 为 $$L_\sigma(x,\lambda^*)$$ 的局部极小解且满足 $$c_i(x^*)=0,\ i\in E$$，则 $$x^*$$ 为问题 (7.2) 的局部 极小解．

</div>

**Proof** **（）** 因为 $$x^*$$ 为问题 (7.2) 的局部极小解且二阶充分条件 成立，所以 $$\begin{equation}
  \nabla_xL(x^*,\lambda^*)=\nabla f(x^*)+\sum_{i\in E}\lambda_i^*\nabla c_i(x^*)=0,
  \qquad
  u^\top\nabla_{xx}^2L(x^*,\lambda^*)u>0,\ \ \forall u:\ \nabla c(x^*)^\top u=0.
\end{equation}$$ 对比 $$L_\sigma(x^*,\lambda^*)$$ 与 $$L(x^*,\lambda^*)$$ 的表达式，由 $$c_i(x^*)=0\ (i\in E)$$ 得 $$\begin{equation}
  \nabla_xL_\sigma(x^*,\lambda^*)=\nabla_xL(x^*,\lambda^*)=0,
  \qquad
  \nabla^2_{xx}L_\sigma(x^*,\lambda^*)
  =\nabla^2_{xx}L(x^*,\lambda^*)+\sigma\nabla c(x^*)\nabla c(x^*)^\top.
\end{equation}$$ 为证 $$x^*$$ 是 $$L_\sigma(x,\lambda^*)$$ 的严格局部极小解，只需证对充分大的 $$\sigma$$ 成立 $$\nabla^2_{xx}L_\sigma(x^*,\lambda^*)\succ0$$．

反证：假设结论不成立，则对任意大的 $$\sigma$$（不妨取 $$\sigma=k$$， $$k=1,2,\dots$$），存在 $$u^k$$ 满足 $$\left\Vert u^k\right\Vert=1$$ 且 $$\begin{equation}
  (u^k)^\top\nabla^2_{xx}L_\sigma(x^*,\lambda^*)u^k
  =(u^k)^\top\nabla^2_{xx}L(x^*,\lambda^*)u^k
  +k\left\Vert\nabla c(x^*)^\top u^k\right\Vert^2\le 0,
\end{equation}$$ 则 $$\begin{equation}
  \left\Vert\nabla c(x^*)^\top u^k\right\Vert^2
  \le-\frac{1}{k}(u^k)^\top\nabla^2_{xx}L(x^*,\lambda^*)u^k\to0
  \qquad (k\to\infty).
\end{equation}$$ 因为 $$\lbraceu^k\rbrace$$ 为有界序列，必存在聚点，设为 $$u$$，那么 $$\begin{equation}
  \nabla c(x^*)^\top u=0,
  \qquad
  u^\top\nabla^2_{xx}L(x^*,\lambda^*)u\le 0,
\end{equation}$$ 这与 (7.51) 中的二阶充分条件矛盾，故存在有限大 的 $$\bar\sigma$$ 使 $$\sigma\ge\bar\sigma$$ 时 $$\nabla^2_{xx}L_\sigma(x^*,\lambda^*)\succ0$$，从而 $$x^*$$ 是 $$L_\sigma(x,\lambda^*)$$ 的严格局部极小解．

反之，若 $$x^*$$ 满足 $$c_i(x^*)=0$$ 且为 $$L_\sigma(x,\lambda^*)$$ 的局部极小 解，那么对任意与 $$x^*$$ 充分接近的可行点 $$x$$（此时 $$c_i(x)=0$$），有 $$\begin{equation}
  f(x^*)=L_\sigma(x^*,\lambda^*)\le L_\sigma(x,\lambda^*)=f(x),
\end{equation}$$ 因此 $$x^*$$ 为原问题 (7.2) 的一个局部极小解．

与 $$\ell_1$$ 精确罚函数的关系**（与 $$\ell_1$$ 精确罚函数的关系）** 定理 7.4 说明增广拉格朗日函数在*已知最优乘子* $$\lambda^*$$ 的条件下是精确罚函数：有限的 $$\sigma\ge\bar\sigma$$ 即可让 $$x^*$$ 成为无约束子问题的严格极小解．与 $$\ell_1$$ 罚函数（定理 7.3，阈值 $$\left\Vert\lambda^*\right\Vert_\infty$$）相比，增广 拉格朗日函数的好处是子问题*光滑*；而实际中 $$\lambda^*$$ 未知， 算法 15 通过逐步更新 $$\lambda^k$$ 逼近 $$\lambda^*$$， 下面两条定理说明这样做确实收敛．

##### 5. 收敛性分析之二：迭代点列的收敛

<div class="theorem">

**定理 7.5** 假设乘子列 $$\lbrace\lambda^k\rbrace$$ 有界，罚因子 $$\sigma^k\to+\infty\ (k\to\infty)$$， 算法 15 中精度 $$\eta^k\to0$$，迭代点列 $$\lbracex^k\rbrace$$ 的一个 子序列 $$x^{k_j+1}$$ 收敛到 $$x^*$$，且在点 $$x^*$$ 处 LICQ 成立．那么存在 $$\lambda^*$$，满足 $$\begin{equation}
  \lambda^{k_j+1}\to\lambda^*\quad (j\to\infty),
  \qquad
  \nabla f(x^*)+\nabla c(x^*)\lambda^*=0,
  \qquad
  c(x^*)=0.
\end{equation}$$

</div>

**Proof** **（）** 对于增广拉格朗日函数 $$L_{\sigma^k}(x,\lambda^k)$$，由迭代格式 $$\begin{align}
  \nabla_xL_{\sigma^k}(x^{k+1},\lambda^k)
  &=\nabla f(x^{k+1})+\nabla c(x^{k+1})
  \bigl(\lambda^k+\sigma^kc(x^{k+1})\bigr)\\
  &=\nabla f(x^{k+1})+\nabla c(x^{k+1})\lambda^{k+1}
  =\nabla_xL(x^{k+1},\lambda^{k+1}).
\end{align}$$ 对于任意使得 $$\operatorname{rank}\bigl(\nabla c(x^{k_j+1})\bigr)=\vert E\vert$$ 的 $$k_j$$ （由 LICQ 假设，当 $$x^{k_j+1}$$ 充分接近 $$x^*$$ 时此式成立），有 $$\begin{equation}
  \lambda^{k_j+1}
  =\bigl(\nabla c(x^{k_j+1})^\top\nabla c(x^{k_j+1})\bigr)^{-1}
  \nabla c(x^{k_j+1})^\top
  \bigl(\nabla_xL_{\sigma^k}(x^{k_j+1},\lambda^{k_j})-\nabla f(x^{k_j+1})\bigr).
\end{equation}$$ 因为 $$\left\Vert\nabla_xL_{\sigma^k}(x^{k_j+1},\lambda^{k_j})\right\Vert\le\eta^{k_j}\to0$$，有 $$\begin{equation}
  \lambda^{k_j+1}\to\lambda^*\coloneqq
  -\bigl(\nabla c(x^*)^\top\nabla c(x^*)\bigr)^{-1}
  \nabla c(x^*)^\top\nabla f(x^*),
\end{equation}$$ 且 $$\nabla_xL(x^*,\lambda^*)=0$$（梯度条件成立）．而乘子列 $$\lbrace\lambda^k\rbrace$$ 有界且 $$\lambda^{k_j}+\sigma^{k_j}c(x^{k_j+1})\to\lambda^*$$，故 $$\lbrace\sigma^{k_j}c(x^{k_j+1})\rbrace$$ 有界；又 $$\sigma^k\to+\infty$$，则 $$c(x^*)=0$$（可行性成立）．

##### 6. 收敛性分析之三：更弱假设下的收敛速度

定理 7.5 依赖乘子列的有界性、$$\lbracex^k\rbrace$$ 的子序列收敛性 以及收敛点处的 LICQ．下面不加证明地给出更一般性的收敛结果 （证明可参考 Bertsekas 命题 2.7）：

<div class="theorem">

**定理 7.6** 设 $$x^*,\lambda^*$$ 分别是问题 (7.2) 的严格局部极小解和 相应的拉格朗日乘子，则存在足够大的常数 $$\bar\sigma>0$$ 和足够小的常数 $$\delta>0$$：如果对某个 $$k$$ 有 $$\begin{equation}
  \frac{1}{\sigma^k}\left\Vert\lambda^k-\lambda^*\right\Vert<\delta,
  \qquad
  \sigma^k\ge\bar\sigma,
\end{equation}$$ 则 $$\lambda^k\to\lambda^*$$，$$x^k\to x^*$$．同时：

1.  若 $$\limsup_k\sigma^k<+\infty$$ 且 $$\lambda^k\ne\lambda^*\ \forall k$$， 则 $$\lbrace\lambda^k\rbrace$$ 的收敛速度是 **Q-线性**的；

2.  若 $$\limsup_k\sigma^k=+\infty$$ 且 $$\lambda^k\ne\lambda^*\ \forall k$$， 则 $$\lbrace\lambda^k\rbrace$$ 的收敛速度是 **Q-超线性**的．

</div>

定理 7.6 不需要假设 $$\lbrace\sigma^k\rbrace$$ 趋于正无穷 （尽管 $$\limsup_k\sigma^k=+\infty$$ 可推出 Q-超线性收敛）以及 $$\lbracex^k\rbrace$$ 的子序列收敛性；相应地，需要找到合适的 $$\lambda^k$$ 与 $$\sigma^k$$． 直观解释：固定 $$\sigma^k$$（有限）时乘子线性收敛；增大 $$\sigma^k$$ 则 超线性收敛------罚因子越大乘子更新越\"激进\"，但过大又造成子问题病态， 这就是 $$\rho\in[2,10]$$ 经验取法的理论注脚．

### 一般约束优化问题的增广拉格朗日函数法

对于一般约束优化问题 $$\begin{equation}
  \min_{x}\ f(x)
  \ \text{s.t.}\ c_i(x)=0,\ i\in E;\qquad c_i(x)\le 0,\ i\in I,
\end{equation}$$ 也可以定义其增广拉格朗日函数并设计相应算法．构造思路：在拉格朗日函数 的定义中，倾向于把**简单的约束**（如非负约束、盒子约束）保留， 只对**复杂约束**引入乘子；对不等式约束，先引入**松弛变量** 转化为等式约束与简单的非负约束，再对保留非负约束形式的拉格朗日函数 添加等式约束的二次罚函数来构造增广拉格朗日函数．

##### 1. 增广拉格朗日函数的构造

对问题 (7.62)，引入松弛变量得到等价形式： $$\begin{equation}
  \min_{x,s}\ f(x)
  \ \text{s.t.}\ c_i(x)=0,\ i\in E;\qquad
     c_i(x)+s_i=0,\ i\in I;\qquad
     s_i\ge 0,\ i\in I.
\end{equation}$$ 保留非负约束，构造拉格朗日函数 $$\begin{equation}
  L(x,s,\lambda,\mu)=f(x)+\sum_{i\in E}\lambda_ic_i(x)
  +\sum_{i\in I}\mu_i\bigl(c_i(x)+s_i\bigr),\qquad s_i\ge 0,\ i\in I.
\end{equation}$$ 记问题 (7.63) 中等式约束的二次罚函数为 $$\begin{equation}
  p(x,s)=\sum_{i\in E}c_i^2(x)+\sum_{i\in I}\bigl(c_i(x)+s_i\bigr)^2,
\end{equation}$$ 则增广拉格朗日函数为 $$\begin{equation}
  L_\sigma(x,s,\lambda,\mu)=f(x)+\sum_{i\in E}\lambda_ic_i(x)
  +\sum_{i\in I}\mu_i\bigl(c_i(x)+s_i\bigr)
  +\frac{\sigma}{2}\,p(x,s),\qquad s_i\ge 0,\ i\in I,
\end{equation}$$ 其中 $$\sigma$$ 为罚因子（注意此处罚项系数为 $$\sigma/2$$，与 (7.43) 的 $$1/(2\sigma)$$ 是两种等价的记号约定）．

##### 2. 消元法求解子问题

在第 $$k$$ 步迭代中，给定乘子 $$\lambda^k,\mu^k$$ 和罚因子 $$\sigma^k$$， 需要求解 $$\begin{equation}
  \min_{x,s}\ L_{\sigma^k}(x,s,\lambda^k,\mu^k)
  \ \text{s.t.}\ s\ge 0
\end{equation}$$ 以得到 $$x^{k+1},s^{k+1}$$（可用第八章的投影梯度法求解）．这里介绍一种 **消元**方法：考虑消去 $$s$$，求解只关于 $$x$$ 的优化问题．

固定 $$x$$，关于 $$s$$ 的子问题化为 $$\begin{equation}
  \min_{s\ge 0}\ \sum_{i\in I}\mu^k_i\bigl(c_i(x)+s_i\bigr)
  +\frac{\sigma^k}{2}\sum_{i\in I}\bigl(c_i(x)+s_i\bigr)^2.
\end{equation}$$ 该问题是逐分量可分的凸二次极小化问题，容易直接解得使子问题最优且 满足非负约束的 $$\begin{equation}
  s_i=\max\Bigl\lbrace-\frac{\mu_i^k}{\sigma^k}-c_i(x),\ 0\Bigr\rbrace,\qquad i\in I.
\end{equation}$$ （推导：无约束极小点满足 $$\mu_i^k+\sigma^k(c_i(x)+s_i)=0$$ 即 $$s_i=-\mu_i^k/\sigma^k-c_i(x)$$；由于目标在 $$s_i$$ 方向上是开口向上的 抛物线且约束为 $$s_i\ge0$$，当无约束极小点为负时取边界 $$s_i=0$$． 这与\"投影到 $$\lbraces_i\ge0\rbrace$$\"的刻画一致．）

将 (7.69) 代入 $$L_{\sigma^k}$$，得到**只关于 $$x$$ 的** 增广拉格朗日函数 $$\begin{equation}
  L_{\sigma^k}(x,\lambda^k,\mu^k)
  =f(x)+\sum_{i\in E}\lambda_i^kc_i(x)
  +\frac{\sigma^k}{2}\sum_{i\in E}c_i^2(x)
  +\frac{\sigma^k}{2}\sum_{i\in I}
  \Bigl[\Bigl(\max\Bigl\lbrace\frac{\mu_i^k}{\sigma^k}+c_i(x),\,0\Bigr\rbrace\Bigr)^2
  -\frac{(\mu_i^k)^2}{(\sigma^k)^2}\Bigr],
\end{equation}$$ 其为关于 $$x$$ 的*连续可微*函数（当 $$f,c_i\ (i\in I\cup E)$$ 连续可微 时）．因此问题 (7.67) 等价于无约束问题 $$\begin{equation*}
  \min_{x\in\mathbb{R}^n}\ L_{\sigma^k}(x,\lambda^k,\mu^k),
\end{equation*}$$ 可以利用梯度法求解． 这样做的好处是消去了变量 $$s$$，从而在低维空间 $$\mathbb{R}^n$$ 中 （原问题 (7.67) 的决策空间为 $$\mathbb{R}^{n+\vert I\vert}$$）求解极 小点．

##### 3. 乘子更新格式的推导

对问题 (7.63)，其最优解 $$x^*,s^*$$ 和乘子 $$\lambda^*,\mu^*$$ 需满足 KKT 条件： $$\begin{equation}
  0=\nabla f(x^*)+\sum_{i\in E}\lambda_i^*\nabla c_i(x^*)
  +\sum_{i\in I}\mu_i^*\nabla c_i(x^*),
  \qquad
  \mu_i^*\ge 0,\ s_i^*\ge 0,\ i\in I,
\end{equation}$$ （互补松弛蕴含在 $$\mu_i^*\bigl(c_i(x^*)+s_i^*\bigr)=0$$ 与等式约束 $$c_i(x^*)+s_i^*=0$$ 中）．

问题 (7.67) 的最优解 $$x^{k+1},s^{k+1}$$ 满足 $$\begin{equation}
  0=\nabla f(x^{k+1})
  +\sum_{i\in E}\bigl(\lambda_i^k+\sigma^kc_i(x^{k+1})\bigr)\nabla c_i(x^{k+1})
  +\sum_{i\in I}\bigl(\mu_i^k+\sigma^k(c_i(x^{k+1})+s_i^{k+1})\bigr)\nabla c_i(x^{k+1}),
\end{equation}$$ $$\begin{equation}
  s_i^{k+1}=\max\Bigl\lbrace-\frac{\mu_i^k}{\sigma^k}-c_i(x^{k+1}),\ 0\Bigr\rbrace,
  \qquad i\in I.
\end{equation}$$ 对比问题 (7.63) 与 (7.67) 的 KKT 条件，易知乘子的更新格式为 $$\begin{equation}
  \lambda_i^{k+1}=\lambda_i^k+\sigma^kc_i(x^{k+1}),\qquad i\in E,
\end{equation}$$ $$\begin{equation}
  \mu_i^{k+1}=\max\bigl\lbrace\mu_i^k+\sigma^kc_i(x^{k+1}),\ 0\bigr\rbrace,\qquad i\in I.
\end{equation}$$ （不等式约束乘子的更新多了一个与 $$0$$ 取 max 的投影，与 §7.2.3 凸问题的 $$\lambda^{k+1}=\max\lbrace0,\lambda^k+\sigma^kc\rbrace$$ 一脉相承， 保证 $$\mu^{k+1}\ge0$$．）

##### 4. 约束违反度与参数更新

定义约束违反度为 $$\begin{equation}
  v_k(x^{k+1})=\sqrt{\sum_{i\in E}c_i^2(x^{k+1})
  +\sum_{i\in I}\bigl(c_i(x^{k+1})+s_i^{k+1}\bigr)^2}.
\end{equation}$$ 根据 (7.69) 消去 $$s$$，约束违反度可写为 $$\begin{equation}
  v_k(x^{k+1})=\sqrt{\sum_{i\in E}c_i^2(x^{k+1})
  +\sum_{i\in I}\max\Bigl\lbracec_i(x^{k+1}),\ -\frac{\mu_i^k}{\sigma^k}\Bigr\rbrace^2}.
\end{equation}$$ 在算法中，需根据约束违反度的大小判断参数的更新方式：

- 若 $$v_k(x^{k+1})$$ 满足精度条件，则进行**乘子的更新**， 并**提高子问题求解精度**，罚因子**不变**；

- 若不满足，则**不更新乘子**，并**适当增大罚因子** 以便得到约束违反度更小的解．

<div class="algorithm">

**算法 16**

**输入**：初始点 $$x^0$$，乘子 $$\lambda^0,\mu^0$$，罚因子 $$\sigma^0>0$$， 约束违反度常数 $$\varepsilon>0$$，精度常数 $$\eta>0$$，常数 $$0<\alpha\le\beta\le 1$$ 与 $$\rho>1$$；令 $$\eta^0=\dfrac{1}{\sigma^0}$$，$$\varepsilon^0=\dfrac{1}{\sigma_0^{\alpha}}$$， $$k=0$$．

<div class="algorithmic">

以 $$x^k$$ 为初始点求解 $$\min_x L_{\sigma^k}(x,\lambda^k,\mu^k)$$， 得到满足精度条件 $$\left\Vert\nabla_xL_{\sigma^k}(x^{k+1},\lambda^k,\mu^k)\right\Vert_2\le\eta^k$$ 的解 $$x^{k+1}$$； 得到逼近解 $$(x^{k+1},\lambda^k,\mu^k)$$，终止迭代； 更新乘子： $$\lambda_i^{k+1}=\lambda_i^k+\sigma^kc_i(x^{k+1})\ (i\in E)$$， $$\mu_i^{k+1}=\max\lbrace\mu_i^k+\sigma^kc_i(x^{k+1}),0\rbrace\ (i\in I)$$； 罚因子不变：$$\sigma^{k+1}=\sigma^k$$； 减小子问题求解误差和约束违反度： $$\eta^{k+1}=\dfrac{\eta^k}{\sigma^{k+1}}$$， $$\varepsilon^{k+1}=\dfrac{\varepsilon^k}{(\sigma^{k+1})^\beta}$$； 乘子不变：$$\lambda^{k+1}=\lambda^k$$； 更新罚因子：$$\sigma^{k+1}=\rho\sigma^k$$； 调整子问题求解误差和约束违反度： $$\eta^{k+1}=\dfrac{1}{\sigma^{k+1}}$$， $$\varepsilon^{k+1}=\dfrac{1}{(\sigma^{k+1})^{\alpha}}$$；

</div>

</div>

算法 16 的结构**（算法 16 的结构）** 算法 16 与算法 15 结构相似， 但它给出了算法参数的一种具体更新方式：

- **成功步**（违反度达标）：乘子更新、罚因子不变、 精度按 $$\eta^k/\sigma^{k+1}$$ 与 $$\varepsilon^k/(\sigma^{k+1})^\beta$$ 收紧------体现\"乘子收敛后靠精度驱动\"；

- **失败步**（违反度不达标）：乘子不动、罚因子放大 $$\rho$$ 倍、 精度重置为 $$1/\sigma^{k+1}$$ 与 $$1/(\sigma^{k+1})^{\alpha}$$------ 体现\"惩罚不足时加强惩罚\"．

常数 $$0<\alpha\le\beta\le1$$ 控制违反度精度 $$\varepsilon^k$$ 相对 $$\sigma^k$$ 的下降速度，是收敛性分析（凸问题情形见定理 7.7） 所需的条件．

### 凸优化问题的增广拉格朗日函数法

考虑凸优化问题（不等式形式）： $$\begin{equation}
  \min_{x\in\mathbb{R}^n}\ f(x)
  \ \text{s.t.}\ c_i(x)\le 0,\qquad i=1,2,\dots,m,
\end{equation}$$ 其中 $$f:\mathbb{R}^n\to\mathbb{R}$$，$$c_i:\mathbb{R}^n\to\mathbb{R}$$ 为闭凸函数，可行域 $$X=\lbracex: c_i(x)\le 0,\ i=1,\dots,m\rbrace$$．

##### 1. 增广拉格朗日函数与迭代格式

根据 §7.2.2 介绍的一般形式 (7.70)（此处 $$E=\varnothing$$，$$I=\lbrace1,\dots,m\rbrace$$），问题 (7.78) 的 增广拉格朗日函数为 $$\begin{equation}
  L_\sigma(x,\lambda)=f(x)+\frac{\sigma}{2}\sum_{i=1}^m
  \Bigl[\Bigl(\max\Bigl\lbrace\frac{\lambda_i}{\sigma}+c_i(x),\,0\Bigr\rbrace\Bigr)^2
  -\frac{\lambda_i^2}{\sigma^2}\Bigr],
\end{equation}$$ 其中 $$\lambda$$ 与 $$\sigma$$ 分别为乘子与罚因子．给定一列单调递增的罚因子 $$\sigma^k\uparrow\sigma^\infty$$ 以及初始乘子 $$\lambda^0$$，结合 §7.2.2 的乘子更新格式 (7.75)，问题 (7.78) 的增广拉格朗日函数法为 $$\begin{equation}
  \left\lbrace
  \begin{aligned}
    &x^{k+1}\approx\operatorname*{arg\,min}_{x\in\mathbb{R}^n}\ L_{\sigma^k}(x,\lambda^k),\\
    &\lambda^{k+1}=\max\bigl\lbrace0,\ \lambda^k+\sigma^kc(x^{k+1})\bigr\rbrace.
  \end{aligned}\right.
\end{equation}$$

##### 2. 不精确条件

由于 $$L_{\sigma^k}(x,\lambda^k)$$ 的最小值点通常没有显式表达式，实际中 调用迭代算法求其近似解．记 $$\varphi^k(x)=L_{\sigma^k}(x,\lambda^k)$$， 为保证收敛性，要求近似解至少满足如下不精确条件之一（以下 $$\varepsilon^k,\delta^k,\delta'^k$$ 为人为设定的参数）： $$\begin{align}
  &\varphi^k(x^{k+1})-\inf\varphi^k\le\frac{\varepsilon_k^2}{2\sigma^k},
  \qquad \varepsilon^k\ge 0,\quad \sum_{k=1}^\infty\varepsilon^k<+\infty,
  \\
  &\varphi^k(x^{k+1})-\inf\varphi^k\le
  \frac{\delta_k^2}{2\sigma^k}\left\Vert\lambda^{k+1}-\lambda^k\right\Vert_2^2,
  \qquad \delta^k\ge 0,\quad \sum_{k=1}^\infty\delta^k<+\infty,
  \\
  &\mathop{\mathrm{dist}}\bigl(0,\ \partial\varphi^k(x^{k+1})\bigr)\le
  \frac{\delta'^k}{\sigma^k}\left\Vert\lambda^{k+1}-\lambda^k\right\Vert_2,
  \qquad 0\le\delta'^k\to 0,
\end{align}$$ 其中 $$\mathop{\mathrm{dist}}(0,\partial\varphi^k(x^{k+1}))$$ 表示 $$0$$ 到集合 $$\partial\varphi^k(x^{k+1})$$ 的欧氏距离．根据 $$\lambda^{k+1}$$ 的更新格式 (7.80)，容易得知 $$\begin{equation}
  \left\Vert\lambda^{k+1}-\lambda^k\right\Vert_2
  =\left\Vert\max\lbrace0,\lambda^k+\sigma^kc(x^{k+1})\rbrace-\lambda^k\right\Vert_2
  =\left\Vert\max\lbrace-\lambda^k,\ \sigma^kc(x^{k+1})\rbrace\right\Vert_2.
\end{equation}$$

##### 3. 数值可验证的不精确条件

由于 $$\inf\varphi^k$$ 未知，直接验证 (7.81) 与 (7.82) 在数值上不可行．但如果 $$\varphi^k$$ 是 $$\alpha$$-强凸函数（某些应用中可以计算 $$\alpha$$ 或其估计值），则有 （见第二章习题 2.15） $$\begin{equation}
  \varphi^k(x)-\inf\varphi^k\le\frac{1}{2\alpha}
  \mathop{\mathrm{dist}}^2\bigl(0,\ \partial\varphi^k(x)\bigr).
\end{equation}$$ 根据 (7.85)，可以构造数值可验证的不精确条件： $$\begin{equation}
  \mathop{\mathrm{dist}}\bigl(0,\ \partial\varphi^k(x^{k+1})\bigr)\le
  \sqrt{\frac{\alpha}{\sigma^k}}\,\varepsilon^k,
  \qquad \varepsilon^k\ge 0,\ \sum_{k=1}^\infty\varepsilon^k<+\infty,
\end{equation}$$ 以及（对应 (7.82)、(7.83) 的两个 类似版本） $$\begin{align}
  &\mathop{\mathrm{dist}}\bigl(0,\ \partial\varphi^k(x^{k+1})\bigr)\le
  \sqrt{\frac{\alpha}{\sigma^k}}\,\delta^k\left\Vert\lambda^{k+1}-\lambda^k\right\Vert_2,
  \qquad \delta^k\ge 0,\ \sum_{k=1}^\infty\delta^k<+\infty,\\
  &\mathop{\mathrm{dist}}\bigl(0,\ \partial\varphi^k(x^{k+1})\bigr)\le
  \delta'^k\sqrt{\frac{\alpha}{\sigma^k}}\,\left\Vert\lambda^{k+1}-\lambda^k\right\Vert_2,
  \qquad 0\le\delta'^k\to 0.
\end{align}$$

##### 4. 收敛性定理

<div class="theorem">

**定理 7.7** 假设 $$\lbracex^k\rbrace,\lbrace\lambda^k\rbrace$$ 为问题 (7.78) 通过 (7.80) 生成的序列，$$x^{k+1}$$ 满足不精确条件 (7.81)．如果问题 (7.78) 的 **Slater 约束品性**成立（即存在可行点使所有不等式约束严格成立）， 那么序列 $$\lbrace\lambda^k\rbrace$$ 是有界序列且收敛到 $$\lambda^\infty$$，且 $$\lambda^\infty$$ 为对偶问题的一个最优解．

如果存在一个 $$\gamma$$，使得下水平集 $$\lbracex\in X: f(x)\le\gamma\rbrace$$ 非空有界，那么序列 $$\lbracex^k\rbrace$$ 也是有界的， 且其所有聚点都是问题 (7.78) 的最优解．

</div>

乘子符号的约定**（乘子符号的约定）**  这里的乘子 $$\lambda^k$$ 与所引文献（如 Rockafellar）中的乘子互为相反数， 原因是在构造拉格朗日函数时我们引入的乘子为 $$-\lambda\ (\ge0)$$，而文献 引入的乘子为 $$\lambda\ (\ge0)$$．类似地，基于不精确条件 (7.82) 与 (7.83) 也有相应的收敛性 结果（证明细节可参考讲义所引文献）．

### 基追踪问题的增广拉格朗日函数法

本小节以基追踪（BP）问题为例讨论增广拉格朗日函数法及其收敛性．我们将 看到：针对一些*凸问题*，增广拉格朗日函数法会有比较特殊的性质------ 比如**固定罚因子**也能保证算法的收敛性甚至**有限终止性**等．

##### 1. 基追踪问题及其对偶

设 $$A\in\mathbb{R}^{m\times n}\ (m\le n)$$，$$b\in\mathbb{R}^m$$，$$x\in\mathbb{R}^n$$，基追踪问题 为 $$\begin{equation}
  \min_{x\in\mathbb{R}^n}\ \left\Vert x\right\Vert_1
  \ \text{s.t.}\ Ax=b.
\end{equation}$$ 引入拉格朗日乘子 $$y\in\mathbb{R}^m$$，其拉格朗日函数为 $$L(x,y)=\left\Vert x\right\Vert_1+y^\top(Ax-b)$$，则对偶函数为 $$\begin{equation}
  g(y)=\inf_xL(x,y)=
  \begin{cases}
    -b^\top y, & \left\Vert A^\top y\right\Vert_\infty\le 1,\\
    -\infty,   & \text{其他},
  \end{cases}
\end{equation}$$ （当存在分量 $$\vert(A^\top y)_j\vert>1$$ 时，取 $$x_j\to-\infty\cdot
\operatorname{sign}\bigl((A^\top y)_j\bigr)$$ 可使 $$\left\Vert x\right\Vert_1+y^\top(Ax-b)\to-\infty$$．） 因此得到对偶问题 $$\begin{equation}
  \min_{y\in\mathbb{R}^m}\ b^\top y
  \ \text{s.t.}\ \left\Vert A^\top y\right\Vert_\infty\le 1.
\end{equation}$$ 通过引入变量 $$s$$，上述问题可以等价地写成 $$\begin{equation}
  \min_{y\in\mathbb{R}^m,\ s\in\mathbb{R}^n}\ b^\top y
  \ \text{s.t.}\ A^\top y-s=0,\quad \left\Vert s\right\Vert_\infty\le 1.
\end{equation}$$ 下面分别讨论对*原始问题*和*对偶问题*应用增广拉格朗日函数法．

##### 2. 原始问题的增广拉格朗日函数法

引入罚因子 $$\sigma$$ 和乘子 $$\lambda$$，问题 (7.88) 的 增广拉格朗日函数为 $$\begin{equation}
  L_\sigma(x,\lambda)=\left\Vert x\right\Vert_1+\lambda^\top(Ax-b)
  +\frac{\sigma}{2}\left\Vert Ax-b\right\Vert_2^2.
\end{equation}$$ 在增广拉格朗日函数法的一般理论中，需要罚因子 $$\sigma$$ 足够大来保证迭代 收敛（控制约束违反度）．但对 BP 问题 (7.88)，后面可以 证明：*固定的非负罚因子*也能保证收敛性（尽管实际中动态调整罚因子 可能使算法更快收敛）．固定罚因子 $$\sigma$$ 时，第 $$k$$ 步的迭代格式为 $$\begin{equation}
  \left\lbrace
  \begin{aligned}
    &x^{k+1}=\operatorname*{arg\,min}_{x\in\mathbb{R}^n}
    \Bigl\lbrace\left\Vert x\right\Vert_1+\frac{\sigma}{2}
    \Bigl\Vert Ax-b+\frac{\lambda^k}{\sigma}\Bigr\Vert_2^2\Bigr\rbrace,\\
    &\lambda^{k+1}=\lambda^k+\sigma\bigl(Ax^{k+1}-b\bigr).
  \end{aligned}\right.
\end{equation}$$

<div class="proposition">

**命题 7.1** 设迭代初始点 $$x^0=\lambda^0=0$$，$$x^{k+1}$$ 为 $$L_\sigma(x,\lambda^k)$$ 的 一个全局极小解，则由极小性条件得 $$\begin{equation}
  0\in\partial\left\Vert x^{k+1}\right\Vert_1
  +\sigma A^\top\Bigl(Ax^{k+1}-b+\frac{\lambda^k}{\sigma}\Bigr),
\end{equation}$$ 因此成立 $$\begin{equation}
  -A^\top\lambda^{k+1}\in\partial\left\Vert x^{k+1}\right\Vert_1.
\end{equation}$$

</div>

**Proof** **（）** 由次微分最优性条件（$$0\in\partial$$ 和规则），$$x^{k+1}$$ 极小化 $$L_\sigma(\cdot,\lambda^k)$$ 当且仅当 $$0\in\partial\left\Vert x^{k+1}\right\Vert_1+\sigma A^\top(Ax^{k+1}-b)
+A^\top\lambda^k$$，整理即 (7.94)． 另一方面，乘子更新给出 $$\lambda^{k+1}=\lambda^k+\sigma(Ax^{k+1}-b)$$， 故 $$\sigma(Ax^{k+1}-b)+A^\top\lambda^k=A^\top\lambda^{k+1}$$ （两边同除以 $$\sigma$$ 再左乘 $$A^\top$$ 即可验证），代入 (7.94) 得 (7.95)．

满足 (7.95) 的 $$x^{k+1}$$ 通常不能显式求得，需用迭代 算法（上一章的次梯度法、第八章的近似点梯度法等）不精确地求解子问题． 讲义图 7.5 给出数值实验（沿用 §6.2 中 $$A,b$$ 的生成方式，稀疏度 $$r=0.1$$ 与 $$r=0.2$$，固定罚因子 $$\sigma$$，用近似点梯度法求解子问题， 精度 $$\eta^k=10^{-k}$$，BB 步长作为线搜索初始步长）： **对 BP 问题，固定的 $$\sigma$$ 也可以保证增广拉格朗日函数法收敛**．

下面证明：对固定的二次罚项系数 $$\sigma=1$$，迭代格式 (7.93) 具有**有限终止性**．根据 (7.95)，先证明迭代格式的基本性质．

##### 3. 基追踪问题的收敛性：有限终止性

<div class="lemma">

**引理 7.1** 设迭代序列 $$\lbracex^k\rbrace,\lbrace\lambda^k\rbrace$$ 是算法 (7.93) 从初始点 $$x^0=\lambda^0=0$$ 产生的序列，则它们满足：

1.  $$\left\Vert Ax^k-b\right\Vert_2$$ 单调下降：$$\left\Vert Ax^{k+1}-b\right\Vert_2\le\left\Vert Ax^k-b\right\Vert_2$$；

2.  若存在 $$\tilde x$$ 满足 $$A\tilde x=b$$，则 $$\dfrac{\sigma}{2}\left\Vert Ax^k-b\right\Vert_2^2\le\dfrac{1}{k}\left\Vert\tilde x\right\Vert_1$$．

</div>

**Proof** **（）** (1) 由迭代格式 (7.93) 第一步的极小性， $$\begin{equation}
  \left\Vert x^{k+1}\right\Vert_1+(\lambda^k)^\top(Ax^{k+1}-b)
  +\frac{\sigma}{2}\left\Vert Ax^{k+1}-b\right\Vert_2^2
  \le
  \left\Vert x^k\right\Vert_1+(\lambda^k)^\top(Ax^k-b)
  +\frac{\sigma}{2}\left\Vert Ax^k-b\right\Vert_2^2.
\end{equation}$$ 由于 $$\left\Vert x\right\Vert_1$$ 的凸性与 (7.95) （$$-A^\top\lambda^k\in\partial\left\Vert x^k\right\Vert_1$$），有 $$\begin{equation}
  \left\Vert x^{k+1}\right\Vert_1\ge\left\Vert x^k\right\Vert_1+\left\langle -A^\top\lambda^k,\,x^{k+1}-x^k\right\rangle.
\end{equation}$$ 将 (7.97) 代入 (7.96)，含 $$\left\Vert x\right\Vert_1$$ 的项与含 $$\lambda^k$$ 的线性项恰好相消，即得 $$\left\Vert Ax^{k+1}-b\right\Vert_2\le\left\Vert Ax^k-b\right\Vert_2$$．

\(2\) 由迭代格式 (7.93) 第二步， $$A^\top(\lambda^{k+1}-\lambda^k)=\sigma A^\top(Ax^{k+1}-b)$$． 由 $$\dfrac{\sigma}{2}\left\Vert Ax-b\right\Vert_2^2$$ 与 $$\left\Vert x\right\Vert_1$$ 的凸性（分别应用于 点 $$x^{k+1}$$ 与 $$x$$ 处）以及 (7.95)，有 $$\begin{align}
  &\frac{\sigma}{2}\left\Vert Ax^{k+1}-b\right\Vert_2^2-\frac{\sigma}{2}\left\Vert Ax-b\right\Vert_2^2
  \\
  &\qquad\le
  \left\langle A^\top(\lambda^{k+1}-\lambda^k),\,x^{k+1}-x\right\rangle
  =\left\langle A^\top\lambda^{k+1},\,x^{k+1}-x\right\rangle
  -\left\langle A^\top\lambda^k,\,x^k-x\right\rangle
  -\left\langle A^\top\lambda^k,\,x^{k+1}-x^k\right\rangle
  \\
  &\qquad\le
  \left\langle A^\top\lambda^{k+1},\,x^{k+1}-x\right\rangle
  -\left\langle A^\top\lambda^k,\,x^k-x\right\rangle
  +\left\Vert x^{k+1}\right\Vert_1-\left\Vert x^k\right\Vert_1,
\end{align}$$ 其中最后一步用了 $$-\left\langle A^\top\lambda^k,\,x^{k+1}-x^k\right\rangle
\le\left\Vert x^{k+1}\right\Vert_1-\left\Vert x^k\right\Vert_1$$（次梯度不等式，方向相反时变号）． 由 (1) 中 $$\left\Vert Ax^k-b\right\Vert_2$$ 的单调性与 $$\left\Vert x\right\Vert_1$$ 的凸性，将 (7.98) 关于 $$j=1,\dots,k$$ 累加（ telescoping ）得 $$\begin{align}
  k\Bigl(\frac{\sigma}{2}\left\Vert Ax^k-b\right\Vert_2^2-\frac{\sigma}{2}\left\Vert Ax-b\right\Vert_2^2\Bigr)
  &\le\sum_{j=1}^{k}\Bigl(\frac{\sigma}{2}\left\Vert Ax^j-b\right\Vert_2^2
  -\frac{\sigma}{2}\left\Vert Ax-b\right\Vert_2^2\Bigr)\\
  &\le\left\langle A^\top\lambda^k,\,x^k-x\right\rangle
  -\underbrace{\left\langle A^\top\lambda^0,\,x^0-x\right\rangle-\left\Vert x^0\right\Vert_1}_{=0\ (x^0=\lambda^0=0)}
  +\left\Vert x^k\right\Vert_1-\left\Vert x^0\right\Vert_1\\
  &\le\left\Vert x\right\Vert_1,
\end{align}$$ 最后一步利用了 $$\left\langle A^\top\lambda^k,\,x^k-x\right\rangle=\left\langle \lambda^k,\,Ax^k-Ax\right\rangle
\le\left\Vert x\right\Vert_1-\left\Vert x^k\right\Vert_1$$：事实上对 $$k\ge1$$，由 (7.96) 逐步可得 $$\left\Vert x^k\right\Vert_1+(\lambda^k)^\top(Ax^k-b)\le
\left\Vert x\right\Vert_1+\lambda^\top(Ax-b)$$ 对任意满足 $$Ax=b$$ 的比较点成立． 取 $$x=\tilde x$$（$$A\tilde x=b$$，故 $$\frac{\sigma}{2}\left\Vert A\tilde x-b\right\Vert_2^2=0$$），由 (7.99) 得 $$\begin{equation}
  \frac{\sigma}{2}\left\Vert Ax^k-b\right\Vert_2^2\le\frac{1}{k}\left\Vert\tilde x\right\Vert_1.
\end{equation}$$

下面的引理表明：增广拉格朗日函数法 (7.93) 得到的点列中， *可行的点必为最优解*．

<div class="lemma">

**引理 7.2** 假设问题 (7.88) 的可行域非空，$$x^k$$ 是由迭代格式 (7.93) 得到的满足 $$Ax^k=b$$ 的迭代点，则 $$x^k$$ 是 BP 问题 (7.88) 的一个最优解．

</div>

**Proof** **（）** 对任意 $$x$$，由 $$\left\Vert x\right\Vert_1$$ 的凸性与 (7.95)，有 $$\begin{equation}
  \left\Vert x^k\right\Vert_1\le\left\Vert x\right\Vert_1-\left\langle x-x^k,\,-A^\top\lambda^k\right\rangle
  =\left\Vert x\right\Vert_1+\left\langle Ax-Ax^k,\,\lambda^k\right\rangle
  =\left\Vert x\right\Vert_1+\left\langle Ax-b,\,\lambda^k\right\rangle,
\end{equation}$$ 其中第二个等号用了 $$-A^\top\lambda^k$$ 与 $$x-x^k$$ 的内积等于 $$\left\langle Ax-Ax^k,\,\lambda^k\right\rangle$$（转置的负号）．因此对任意满足 $$Ax=b$$ 的 $$x$$， 都有 $$\left\Vert x^k\right\Vert_1\le\left\Vert x\right\Vert_1$$，于是 $$x^k$$ 是问题 (7.88) 的最优解．

<div class="theorem">

**定理 7.8** 假设问题 (7.88) 的可行域非空，迭代序列 $$\lbracex^k\rbrace,\lbrace\lambda^k\rbrace$$ 是由迭代格式 (7.93)（固定 $$\sigma=1$$）从初始点 $$x^0=\lambda^0=0$$ 产生的，则存在正整数 $$K$$ 使得任意 $$x^k\ (k\ge K)$$ 都是问题 (7.88) 的解．

</div>

**Proof** **（）** 对指标集 $$\lbrace1,2,\dots,n\rbrace$$ 的任一划分 $$(I_+^j,I_-^j,E^j)$$，令 $$\begin{equation}
  U^j\coloneqq U(I_+^j,I_-^j,E^j)
  =\lbracex:\ x_i\ge 0,\ i\in I_+^j;\ x_i\le 0,\ i\in I_-^j;\ x_i=0,\ i\in E^j\rbrace,
\end{equation}$$ $$\begin{equation}
  H^j\coloneqq\min_{x\in\mathbb{R}^n}
  \Bigl\lbrace\frac12\left\Vert Ax-b\right\Vert_2^2\ \Big\vert\ x\in U^j\Bigr\rbrace.
\end{equation}$$ $$U^j$$ 是\"符号模式固定的 $$2^n$$ 个正交锥\"之一，$$H^j$$ 是该锥上最小二乘的 最优值．对于迭代点 $$\lambda^k$$，定义指标集 $$\lbrace1,\dots,n\rbrace$$ 的划分为 $$\begin{equation}
  I_+^k=\lbracei:\ (A^\top\lambda^k)_i=-1\rbrace,\qquad
  I_-^k=\lbracei:\ (A^\top\lambda^k)_i=1\rbrace,\qquad
  E^k=\lbracei:\ (A^\top\lambda^k)_i\in(-1,1)\rbrace.
\end{equation}$$ 由 $$U^j$$ 的定义与 (7.95)（$$-A^\top\lambda^k\in
\partial\left\Vert x^k\right\Vert_1$$）知 $$x^k\in U^k$$：这是因为次梯度条件 (7.95) 恰好说明 $$x^k$$ 的每个分量 $$x_i^k$$ 的符号与 $$(A^\top\lambda^k)_i$$ 的取值相容（$$x_i^k>0\Rightarrow(A^\top\lambda^k)_i=-1$$， $$x_i^k<0\Rightarrow(A^\top\lambda^k)_i=1$$， $$x_i^k=0\Rightarrow\vert(A^\top\lambda^k)_i\vert\le1$$）．

因为问题 (7.88) 的可行域非空，故存在 $$\tilde x$$ 满足 $$\left\Vert A\tilde x-b\right\Vert=0$$．由引理 7.1(2) （即 (7.100)），对任意满足 $$H^j>0$$ 的 $$j$$，存在充分大的 $$K^j$$ 使得 $$x^k\notin U^j\ \forall k\ge K^j$$（否则 $$\frac12\left\Vert Ax^k-b\right\Vert_2^2\le\frac{1}{k}\left\Vert\tilde x\right\Vert_1\to0$$ 与 $$x\in U^j$$ 时 $$\left\Vert Ax-b\right\Vert_2^2\ge2H^j>0$$ 矛盾）．于是取 $$K=\max_j\lbraceK^j: H^j>0\rbrace$$，有 $$H^k=0\ \forall k\ge K$$．

结合 $$\left\Vert x\right\Vert_1$$ 的凸性与 (7.95)，对 $$k\ge K$$ 有 $$\begin{equation}
  \left\Vert x^k\right\Vert_1+(\lambda^k)^\top Ax^k\le\left\Vert x\right\Vert_1+(\lambda^k)^\top Ax,
  \qquad \forall x\in\mathbb{R}^n,
\end{equation}$$ 且容易验证等号成立当且仅当 $$x\in U^k$$（线性项的次梯度不等式取等号 要求 $$x$$ 与 $$x^k$$ 符号模式相容）．由于 $$H^k=0$$，取 $$\tilde x\in U^k$$ 且 $$\left\Vert A\tilde x-b\right\Vert=0$$，根据 $$x^{k+1}$$ 的最优性有 $$\begin{align}
  \frac{\sigma}{2}\left\Vert Ax^{k+1}-b\right\Vert_2^2
  &\le\left\Vert\tilde x\right\Vert_1-\left\Vert x^{k+1}\right\Vert_1
  +(\lambda^k)^\top A(\tilde x-x^{k+1})
  +\frac{\sigma}{2}\left\Vert A\tilde x-b\right\Vert_2^2
  \\
  &\le\left\Vert\tilde x\right\Vert_1-\left\Vert x^k\right\Vert_1
  +(\lambda^k)^\top A(\tilde x-x^k)
  +\frac{\sigma}{2}\left\Vert A\tilde x-b\right\Vert_2^2
  =0,
\end{align}$$ 其中最后一个不等式利用了 (7.105) 及其等号条件 （注意 $$x^k,\tilde x\in U^k$$，故 $$\tilde x$$ 也使 (7.105) 取等号）．于是 $$Ax^{k+1}=b$$，再由引理 7.2 可知， $$x^{k+1}\ \forall k\ge K$$ 都是问题 (7.88) 的最优解．

有限终止性的适用范围与实际求解**（有限终止性的适用范围与实际求解）** 定理 7.8 假设了子问题可以*精确*求解．对一般的 矩阵 $$A$$（非对角情形），子问题的精确解难以求得，实际中采用迭代算法 （第八章）不精确求解；即使如此，增广拉格朗日函数法仍有非常好的数值 表现，因此非常受欢迎．BP 问题是线性规划问题的特例，对线性规划问题 同样可以证明有限终止性；对一般凸优化问题的增广拉格朗日函数法， 可参考经典文献（Rockafellar 1976 等）．

##### 4. 与 Bregman 算法的等价性

求解 BP 问题的一个通用方法是 **Bregman 迭代算法**．对凸函数 $$h(x)=\left\Vert x\right\Vert_1$$，定义其 **Bregman 距离**： $$\begin{equation}
  D_h^g(x,y)=h(x)-h(y)-\left\langle g,\,x-y\right\rangle,
\end{equation}$$ 其中 $$g\in\partial h(y)$$ 为 $$h$$ 在点 $$y$$ 处的一个次梯度．对一般的凸函数 $$h$$，容易证明 $$D_h^g(x,y)\ne D_h^g(y,x)$$，所以 $$D_h^g(x,y)$$ 不一定是 距离函数；但是：对任意 $$x,y$$，都有 $$D_h^g(x,y)\ge0$$；对连接 $$x,y$$ 的 线段上的任一点 $$z$$，都有 $$D_h^g(x,y)\ge D_h^g(z,y)$$．

<div class="algorithm">

**算法 17**

根据 Bregman 距离的定义，为基追踪问题 (7.88) 设计的 Bregman 迭代算法为（其中 $$g^{k+1}\in\partial h(x^{k+1})$$）： $$\begin{equation}
  \left\lbrace
  \begin{aligned}
    &x^{k+1}=\operatorname*{arg\,min}_{x\in\mathbb{R}^n}
    \Bigl\lbraceD_h^{g^k}(x,x^k)+\frac12\left\Vert Ax-b\right\Vert_2^2\Bigr\rbrace,\\
    &g^{k+1}=g^k-A^\top\bigl(Ax^{k+1}-b\bigr).
  \end{aligned}\right.
\end{equation}$$

</div>

关于格式 (7.108) 中 $$g^{k+1}\in\partial h(x^{k+1})$$： 根据 $$x^{k+1}$$ 的最优性条件， $$\begin{equation}
  0\in\partial h(x^{k+1})-g^k+A^\top(Ax^{k+1}-b),
\end{equation}$$ 因此 $$g^{k+1}=g^k-A^\top(Ax^{k+1}-b)\in\partial h(x^{k+1})$$，算法自洽．

Bregman 算法与增广拉格朗日函数法等价**（Bregman 算法与增广拉格朗日函数法等价）**  **命题 7.4.4** 对比增广拉格朗日函数法 (7.93)（令罚因子 $$\sigma=1$$， 初始点记为 $$(x^0,\lambda^0)$$）：如果 Bregman 算法 (7.108) 的初始点设置为 $$(x^0,\ -A^\top\lambda^0)$$，则有 $$\begin{equation}
  g^k=-A^\top\lambda^k,\qquad \forall k,
\end{equation}$$ 即两个算法得到的迭代点列完全一致（此时增广拉格朗日函数法中 $$\sigma=1$$ 固定），因此**两算法等价**．两种算法的内在关系与其求解效率直接 相关：这说明在合理选取初始点的情况下，两种方法的效率一致．

##### 5. 对偶问题的增广拉格朗日函数法

考虑对偶问题 (7.91)： $$\begin{equation}
  \min_{y\in\mathbb{R}^m,\ s\in\mathbb{R}^n}\ b^\top y
  \ \text{s.t.}\ A^\top y-s=0,\qquad \left\Vert s\right\Vert_\infty\le 1.
\end{equation}$$ 引入拉格朗日乘子 $$\lambda$$ 和罚因子 $$\sigma$$，作增广拉格朗日函数 $$\begin{equation}
  L_\sigma(y,s,\lambda)=b^\top y+\lambda^\top(A^\top y-s)
  +\frac{\sigma}{2}\left\Vert A^\top y-s\right\Vert_2^2,
  \qquad \left\Vert s\right\Vert_\infty\le 1.
\end{equation}$$ 增广拉格朗日函数法的迭代格式为（$$\rho>1$$ 和 $$\bar\sigma<+\infty$$ 为 算法参数）： $$\begin{equation}
  \left\lbrace
  \begin{aligned}
    &(y^{k+1},s^{k+1})=\operatorname*{arg\,min}_{y,\ \left\Vert s\right\Vert_\infty\le1}
    \Bigl\lbraceb^\top y+\frac{\sigma^k}{2}
    \Bigl\Vert A^\top y-s+\frac{\lambda^k}{\sigma^k}\Bigr\Vert_2^2\Bigr\rbrace,\\
    &\lambda^{k+1}=\lambda^k+\sigma^k\bigl(A^\top y^{k+1}-s^{k+1}\bigr),\\
    &\sigma^{k+1}=\min\lbrace\rho\sigma^k,\ \bar\sigma\rbrace,
  \end{aligned}\right.
\end{equation}$$ 其中 $$(y^{k+1},s^{k+1})$$ 的显式表达式未知，需要迭代求解．

##### 6. 消元法求解子问题

除了用投影梯度法求解关于 $$(y,s)$$ 的联合最小化问题外，还可以利用 最优性条件将 $$s$$ 用 $$y$$ 表示，转而求解只关于 $$y$$ 的最小化问题．关于 $$s$$ 的极小化问题为 $$\begin{equation}
  \min_{s}\ \frac{\sigma}{2}\Bigl\Vert A^\top y-s+\frac{\lambda}{\sigma}\Bigr\Vert_2^2
  \ \text{s.t.}\ \left\Vert s\right\Vert_\infty\le 1.
\end{equation}$$ 这是一个关于 $$s$$ 的二次型函数加盒约束，因此问题的解为 $$\begin{equation}
  s=\mathop{\mathrm{Proj}}_{\left\Vert s\right\Vert_\infty\le1}\Bigl(A^\top y+\frac{\lambda}{\sigma}\Bigr),
  \qquad
  \mathop{\mathrm{Proj}}_{\left\Vert s\right\Vert_\infty\le1}(z)=\max\bigl\lbrace\min\lbracez,1\rbrace,\ -1\bigr\rbrace
  \text{（逐分量）},
\end{equation}$$ 其中 $$\mathop{\mathrm{Proj}}_{\left\Vert s\right\Vert_\infty\le1}$$ 为集合 $$\lbraces:\left\Vert s\right\Vert_\infty\le1\rbrace$$ 的 投影算子．将 $$s$$ 的表达式代入增广拉格朗日函数，定义 $$\psi(x)=\operatorname{sign}(x)\max\lbrace\left\vert x\right\vert-1,\,0\rbrace$$ （$$\operatorname{sign}(x)$$ 为符号函数），得到只关于 $$y$$ 的增广拉格朗日 函数 $$\begin{equation}
  L_\sigma(y,\lambda)=b^\top y+\frac{\sigma}{2}
  \left\Vert\psi\Bigl(A^\top y+\frac{\lambda}{\sigma}\Bigr)\right\Vert_2^2
  -\frac{\left\Vert\lambda\right\Vert_2^2}{2\sigma},
\end{equation}$$ （为记号简洁仍记作 $$L_\sigma$$，但变量个数有所变化．）消去 $$s$$ 的 增广拉格朗日函数法为 $$\begin{equation}
  \left\lbrace
  \begin{aligned}
    &y^{k+1}=\operatorname*{arg\,min}_{y}\ \Bigl\lbraceb^\top y+\frac{\sigma^k}{2}
    \Bigl\Vert\psi\Bigl(A^\top y+\frac{\lambda^k}{\sigma^k}\Bigr)\Bigr\Vert_2^2\Bigr\rbrace,\\
    &\lambda^{k+1}=\sigma^k\psi\Bigl(A^\top y^{k+1}+\frac{\lambda^k}{\sigma^k}\Bigr),\\
    &\sigma^{k+1}=\min\lbrace\rho\sigma^k,\ \bar\sigma\rbrace.
  \end{aligned}\right.
\end{equation}$$ 关于 $$y^{k+1}$$ 我们不能得到显式表达式，但 $$L_{\sigma^k}(y,\lambda^k)$$ 关于 $$y$$ 连续可微，其梯度为 $$\nabla_yL_{\sigma^k}(y,\lambda^k)=b+\sigma^kA\,
\psi\bigl(A^\top y+\lambda^k/\sigma^k\bigr)$$，故可利用梯度法求解； 此外还可以采用半光滑牛顿法（参考第八章相关内容）．

记 $$\varphi^k(y)=L_{\sigma^k}(y,\lambda^k)$$．为保证收敛性，根据一般凸 优化问题增广拉格朗日函数法的收敛条件 (7.81)，要求 $$y^{k+1}$$ 满足 $$\begin{equation}
  \varphi^k(y^{k+1})-\inf\varphi^k\le\frac{\varepsilon_k^2}{2\sigma^k},
  \qquad \varepsilon^k\ge0,\quad \sum_{k=1}^\infty\varepsilon^k<+\infty.
\end{equation}$$ 根据定理 7.7，有如下收敛性定理：

<div class="theorem">

**定理 7.9** 假设 $$\lbracey^k\rbrace,\lbrace\lambda^k\rbrace$$ 是由迭代格式 (7.117) 产生的序列，$$y^{k+1}$$ 的求解精度满足 (7.118)， 而矩阵 $$A$$ 是**行满秩**的．那么序列 $$\lbracey^k\rbrace$$ 有界，且其任一聚点 均为对偶问题 (7.91) 的最优解；同时序列 $$\lbrace\lambda^k\rbrace$$ 有界且收敛，其极限为*原始*问题 (7.88) 的某个 最优解．

</div>

行满秩假设的作用与强凸化技巧**（行满秩假设的作用与强凸化技巧）**  定理 7.9 假设 $$A$$ 行满秩，因此对偶可行域 $$X=\lbracey:\left\Vert A^\top y\right\Vert_\infty\le1\rbrace$$ 有界；由于 $$0\in X$$， $$\lbracey\in X: f(y)\le 0\rbrace$$ 非空有界；根据约束的线性性，问题 (7.90) 的 Slater 约束品性成立------这正是定理 7.7 所需的条件． 注意 $$\varphi^k$$ 只是凸的、并不强凸；可以通过添加近端项 $$\frac{1}{2\sigma^k}\left\Vert y-y^k\right\Vert_2^2$$，即求解 $$\begin{equation}
  y^{k+1}\approx\operatorname*{arg\,min}_y
  \Bigl\lbrace\varphi^k(y)+\frac{1}{2\sigma^k}\left\Vert y-y^k\right\Vert_2^2\Bigr\rbrace
\end{equation}$$ 使 $$y^{k+1}$$ 满足不精确条件：此时 $$\varphi^k(y)+\frac{1}{2\sigma^k}\left\Vert y-y^k\right\Vert_2^2$$ 是 $$\frac{1}{\sigma^k}$$ 强凸的，强凸性保证了 (7.118) 可以通过次梯度 范数验证（(7.85) 的应用）．修改后的迭代点列 收敛性与原始版本基本一致．

### 半定规划问题的增广拉格朗日函数法

<div class="supp">

本小节为讲义内容、课堂 PPT 未展开，作为 §7.2 的补充完整给出． 考虑半定规划问题（§5.4 的 (5.82)） $$\begin{equation}
  \min_{X\in\mathcal{S}^{n}}\ \left\langle C,\,\ X\right\rangle
  \ \text{s.t.}\ \left\langle A_i,\,\ X\right\rangle=b_i,\ i=1,2,\dots,m;\qquad X\succeq 0
\end{equation}$$ 和其对偶问题 $$\begin{equation}
  \min_{y\in\mathbb{R}^m}\ -b^\top y
  \ \text{s.t.}\ \sum_{i=1}^my_iA_i\preceq C.
\end{equation}$$

**原始问题的增广拉格朗日函数法**：引入乘子 $$\lambda\in\mathbb{R}^m$$、 罚因子 $$\sigma$$，记 $$A(X)=\bigl(\left\langle A_1,\,X\right\rangle,\dots,\left\langle A_m,\,X\right\rangle\bigr)^\top$$， 则增广拉格朗日函数为 $$\begin{equation}
  L_\sigma(X,\lambda)=\left\langle C,\,\ X\right\rangle-\lambda^\top\bigl(A(X)-b\bigr)
  +\frac{\sigma}{2}\left\Vert A(X)-b\right\Vert_2^2,
  \qquad X\succeq 0,
\end{equation}$$ 迭代格式为 $$\begin{equation}
  \left\lbrace
  \begin{aligned}
    &X^{k+1}\approx\operatorname*{arg\,min}_{X\in\mathcal{S}^{n}_{+}}\ L_{\sigma^k}(X,\lambda^k),\\
    &\lambda^{k+1}=\lambda^k-\sigma^k\bigl(A(X^{k+1})-b\bigr),\\
    &\sigma^{k+1}=\min\lbrace\rho\sigma^k,\ \bar\sigma\rbrace.
  \end{aligned}\right.
\end{equation}$$ 当迭代收敛时，$$X^k$$ 与 $$\lambda^k$$ 分别收敛到问题 (7.120) 与 (7.121) 的解．

**对偶问题的增广拉格朗日函数法**：引入松弛变量 $$S\succeq0$$、乘子 $$\Lambda\in\mathcal{S}^{n}$$ 与罚因子 $$\sigma$$，增广拉格朗日函数为 $$\begin{equation}
  L_\sigma(y,S,\Lambda)=-b^\top y
  +\Bigl\langle\Lambda,\ \sum_{i=1}^my_iA_i+S-C\Bigr\rangle
  +\frac{\sigma}{2}\left\Vert\sum_{i=1}^my_iA_i+S-C\right\Vert_F^2,
\end{equation}$$ 第 $$k$$ 步的更新公式为 $$\begin{equation}
  \left\lbrace
  \begin{aligned}
    &(y^{k+1},S^{k+1})\approx\operatorname*{arg\,min}_{y\in\mathbb{R}^m}\ L_{\sigma^k}(y,S,\Lambda^k),\\
    &\Lambda^{k+1}=\Lambda^k+\sigma^k
    \Bigl(\sum_{i=1}^my_i^{k+1}A_i+S^{k+1}-C\Bigr),\\
    &\sigma^{k+1}=\min\lbrace\rho\sigma^k,\ \bar\sigma\rbrace.
  \end{aligned}\right.
\end{equation}$$ 可以利用最优性条件消去 $$S$$：关于 $$S$$ 的极小化问题为 $$\min_{S\succeq0}\frac{\sigma}{2}\left\Vert\sum_iy_iA_i+S-C+\Lambda/\sigma\right\Vert_F^2$$， 其解为 $$\begin{equation}
  S=\mathop{\mathrm{Proj}}_{\mathcal{S}^{n}_{+}}\Bigl(C-\sum_{i=1}^my_iA_i-\frac{\Lambda}{\sigma}\Bigr),
\end{equation}$$ 其中 $$\mathop{\mathrm{Proj}}_{\mathcal{S}^{n}_{+}}$$ 为到半正定锥 $$\mathcal{S}^{n}_{+}$$ 的投影算子（特征值截断）． 代入后得到只关于 $$y$$ 的增广拉格朗日函数 $$\begin{equation}
  L_\sigma(y,\Lambda)=-b^\top y+\frac{\sigma}{2}\left[
  \left\Vert\mathop{\mathrm{Proj}}_{\mathcal{S}^{n}_{+}}\Bigl(\sum_{i=1}^my_iA_i-C+\frac{\Lambda}{\sigma}\Bigr)\right\Vert_F^2
  -\frac{\left\Vert\Lambda\right\Vert_F^2}{\sigma^2}\right],
\end{equation}$$ 相应的增广拉格朗日函数法为 $$\begin{equation}
  \left\lbrace
  \begin{aligned}
    &y^{k+1}\approx\operatorname*{arg\,min}_{y\in\mathbb{R}^m}\ L_{\sigma^k}(y,\Lambda^k),\\
    &\Lambda^{k+1}=\sigma^k\mathop{\mathrm{Proj}}_{\mathcal{S}^{n}_{+}}
    \Bigl(\sum_{i=1}^my_i^{k+1}A_i-C+\frac{\Lambda^k}{\sigma^k}\Bigr),\\
    &\sigma^{k+1}=\min\lbrace\rho\sigma^k,\ \bar\sigma\rbrace.
  \end{aligned}\right.
\end{equation}$$ 可以验证 $$L_{\sigma^k}(y,\Lambda^k)$$ 关于 $$y$$ 连续可微（可用梯度法求 $$y^{k+1}$$），且关于 $$y$$ *强半光滑*（可调用半光滑牛顿法更快求解， 见第八章）．当迭代收敛时，$$y^k$$ 与 $$\Lambda^k$$ 分别收敛到问题 (7.121) 与 (7.120) 的解．

**实际问题选哪个？**对比 (7.123) 与 (7.128) 的第一步：(7.123) 中的 $$X^{k+1}$$ 要在半正定锥 $$\mathcal{S}^{n}_{+}$$ 内求解（仍是约束优化问题），而 (7.128) 中的 $$y^{k+1}$$ 在向量空间 $$\mathbb{R}^m$$ 中求解， 对应一个*可微的无约束*优化问题．由于半定规划\"对偶的对偶为其 本身\"，实际中若问题 (7.120) 的约束个数 $$m$$ 较少， 一般先考虑其对偶问题 (7.121)，再用增广拉格朗日函数法 求解．

</div>

## 线性规划内点法

<div class="supp">

线性规划是非常经典的约束优化问题，其目标函数与约束都是线性函数，在 现实中有非常多的应用．求解线性规划的算法中，最经典的是 Dantzig 在 1947 年提出的**单纯形法**：由于线性规划问题的解必然在可行域的 顶点（或某一边界）处取到，单纯形法通过不断列出可行域的顶点逐步寻找 最优解．但可行域顶点数可能多达 $$O(2^n)$$ 个（$$n$$ 为自变量维数），甚至 可以构造出使单纯形法遍历每一个顶点的例子，因此单纯形法最坏情形复杂度 是*指数量级*，对某些大型问题与病态问题效果可能很差．

约 30 年后，**内点法**应运而生（实用的算法为 Karmarkar 1984 年 提出）：内点法在可行域*内部*寻找一条路径最终抵达其边界，与单纯形 法思想截然不同．内点法单步迭代的计算代价远高于只在可行域边界移动的 单纯形法，但一步迭代对解的改善是显著的------事实上可以证明内点法是 **多项式时间算法**．本节介绍线性规划内点法的基本思想与实现过程， 略去技术细节的讨论．

</div>

### 原始--对偶算法

首先写出线性规划的原始问题和对偶问题： $$\begin{equation}
  \text{(P)}\quad
  \min_{x}\ c^\top x
  \ \text{s.t.}\ Ax=b,\ x\ge 0,
  \qquad\qquad
  \text{(D)}\quad
  \max_{y}\ b^\top y
  \ \text{s.t.}\ A^\top y+s=c,\ s\ge 0.
\end{equation}$$ 写出问题 (7.129) 的 KKT 条件： $$\begin{align}
  &Ax=b,&&\text{(原始可行)}\\
  &A^\top y+s=c,&&\text{(对偶可行)}\\
  &x_is_i=0,\quad i=1,2,\dots,n,&&\text{(互补松弛)}\\
  &x\ge 0,\ s\ge 0.&&\text{(非负性)}
\end{align}$$

**原始--对偶内点法**利用条件 (7.130)--(7.133) 在可行域的相对内部不断产生迭代点：它构造的解*严格*满足 (7.130)、(7.131) 与 (7.133)， 而只*近似*满足互补条件 (7.132)．当 (7.133) 满足且互补条件对任意 $$i$$ 都不取等（即 $$x_is_i>0\ \forall i$$）时，点 $$(x,s)$$ 是可行域的**相对内点**------ 这就是\"内点法\"名称的由来．

与单纯形法的对比**（与单纯形法的对比）**  单纯形法的构造同样可理解为利用 KKT 条件 (7.130)-- (7.133)，但它*舍弃*了条件 $$x\ge0,\ s\ge0$$，并保证其他 三个条件在迭代过程中成立；由于 (7.130)--(7.132) 处理起来并不复杂，单纯形法迭代一步非常迅速，其终止准则恰好检查迭代点 是否满足条件 (7.133)．内点法与单纯形法正好*互补*： 内点法严格保持 (7.130)、(7.131)、 (7.133)，而让互补松弛 (7.132) 渐进成立．

##### 1. 对偶间隙

内点法希望互补松弛条件 $$x_is_i\to0\ \forall i$$ 最终成立，以此作为终止 条件．对内点 $$x>0,\ s>0$$ 定义互补条件 (7.132) 违反度的 度量 $$\begin{equation}
  \mu=\frac1n\sum_{i=1}^nx_is_i=\frac{x^\top s}{n},
\end{equation}$$ 也称为**对偶间隙**．当 $$\mu\to0$$ 时，$$(x,s)$$ 越来越接近可行域 边界．

##### 2. 扰动 KKT 条件

原始--对偶算法的目标是：给定当前可行点 $$(x,y,s)$$，寻找下一个点 $$\begin{equation}
  (\tilde x,\tilde y,\tilde s)=(x,y,s)+(\Delta x,\Delta y,\Delta s)
\end{equation}$$ 使得如下条件成立： $$\begin{equation}
  \left\lbrace
  \begin{aligned}
    &A\tilde x=b,\qquad \tilde x> 0,\\
    &A^\top\tilde y+\tilde s=c,\qquad \tilde s>0,\\
    &\tilde x_i\tilde s_i=\sigma\mu,\qquad i=1,2,\dots,n,
  \end{aligned}\right.
\end{equation}$$ 其中 $$0<\sigma<1$$ 是取定的常数．(7.136) 称为 **扰动 KKT 条件**：最后一个条件的直观理解是------假设 $$\mu$$ 是当前点 $$(x,y,s)$$ 处的对偶间隙，我们希望迭代一步后互补乘积 $$x_is_i$$ 整体缩小 一个比例 $$\sigma$$（由 $$\tilde x_i\tilde s_i=\sigma\mu$$ 逐分量相同， \"各个分量以一致的速度趋于零\"，这正是内点法思想的体现）．

##### 3. 牛顿方程与线性系统

通过如下方式近似求解 (7.136)：展开方程组 $$\begin{equation}
  A(x+\Delta x)=b,\qquad
  A^\top(y+\Delta y)+(s+\Delta s)=c,\qquad
  (s+\Delta s)\odot(x+\Delta x)=\sigma\mu\mathbf{1},
\end{equation}$$ 去除高阶非线性项 $$\Delta x\odot\Delta s$$ 后得到线性方程组： $$\begin{equation}
  \left\lbrace
  \begin{aligned}
    &A\Delta x=r^p\coloneqq b-Ax,\\
    &A^\top\Delta y+\Delta s=r^d\coloneqq c-s-A^\top y,\\
    &x\odot\Delta s+s\odot\Delta x=r^c\coloneqq\sigma\mu\mathbf{1}-x\odot s,
  \end{aligned}\right.
\end{equation}$$ 其中 $$r=(r^p,r^d,r^c)^\top$$ 刻画了 KKT 条件 (7.130)-- (7.132) 的残量（分别对应原始残量、对偶残量与互补残量）． 记 $$L_x=\operatorname{Diag}(x)$$，$$L_s=\operatorname{Diag}(s)$$，将方程组 化为矩阵形式 $$\begin{equation}
  \begin{bmatrix}
    A & 0 & 0\\
    0 & A^\top & I\\
    L_s & 0 & L_x
  \end{bmatrix}
  \begin{bmatrix}
    \Delta x\\ \Delta y\\ \Delta s
  \end{bmatrix}
  =
  \begin{bmatrix}
    r^p\\ r^d\\ r^c
  \end{bmatrix}.
\end{equation}$$

<div class="supp">

由第三个方程 $$L_s\Delta x+L_x\Delta s=r^c$$ 解出 $$\Delta s=L_s^{-1}(r^c-L_s\Delta x)\cdot$$------更直接地： $$\Delta s=L_s^{-1}(r^c-L_x\cdot\text{（由第二式表示的量）})$$． 标准推导如下：

1.  由第一、二式，$$\Delta s$$ 满足 $$\Delta s=r^d-A^\top\Delta y$$；

2.  代入第三式：$$L_s\Delta x+L_x(r^d-A^\top\Delta y)=r^c$$，即 $$L_s\Delta x-L_xA^\top\Delta y=r^c-L_xr^d$$，故 $$\Delta x=L_s^{-1}\bigl(L_xA^\top\Delta y+L_xr^d-r^c\bigr)$$；

3.  代入第一式 $$A\Delta x=r^p$$： $$A L_s^{-1}L_xA^\top\Delta y
            =r^p-A L_s^{-1}(L_xr^d-r^c)$$，解出 $$\Delta y=\bigl(AL_s^{-1}L_xA^\top\bigr)^{-1}
            \bigl(r^p+AL_s^{-1}(L_xr^d-r^c)\bigr)$$；

4.  回代得 $$\Delta s=r^d-A^\top\Delta y$$， $$\Delta x=-L_s^{-1}(L_x\Delta s-r^c)$$．

合并即 (7.140)．其中 $$AL_s^{-1}L_xA^\top$$ 是对称 矩阵；当 $$A$$ 满秩时，对任意 $$z\ne0$$， $$z^\top AL_s^{-1}L_xA^\top z
=\left\Vert L_s^{-1/2}L_xA^\top z\right\Vert^2>0$$（$$L_x,L_s\succ0$$ 对角、$$A$$ 行满秩 保证 $$L_xA^\top z\ne0$$），故 $$AL_s^{-1}L_xA^\top$$ **正定**------ 可用 Cholesky 分解高效求解（讲义习题 7.10：该矩阵非奇异当且仅当 $$A$$ 行满秩）．每次迭代的主要计算量即来自方程 (7.139) 的求解．

</div>

$$\begin{equation}
  \left\lbrace
  \begin{aligned}
    &\Delta y=\bigl(AL_s^{-1}L_xA^\top\bigr)^{-1}
    \bigl(r^p+AL_s^{-1}(L_xr^d-r^c)\bigr),\\
    &\Delta s=r^d-A^\top\Delta y,\\
    &\Delta x=-L_s^{-1}(L_x\Delta s-r^c).
  \end{aligned}\right.
\end{equation}$$

##### 4. 步长选取与算法框架

一般来说，即使初始点 $$(x,y,s)$$ 可行，求解线性方程组 (7.139) 产生的更新 $$(\tilde x,\tilde y,\tilde s)$$ 也不一定是可行解（线性化误差所致）．前两个方程 (7.130)(7.131) 是线性的，迭代过程中可以一直 满足；但 $$x>0,\ s>0$$ 不能自动保证，为此采用线搜索中的**回溯法** 确定合适的更新： $$\begin{equation}
  (x^{k+1},y^{k+1},s^{k+1})=(x^k,y^k,s^k)+\alpha^k(\Delta x^k,\Delta y^k,\Delta s^k),
\end{equation}$$ 其中 $$\alpha^k=\alpha_0\rho^{k_0}$$，选取*最小*的整数 $$k_0$$ 使得 $$x^{k+1}>0,\ s^{k+1}>0$$（$$0<\rho<1$$，$$\alpha_0$$ 为给定常数）．

适用于线性规划的**原始--对偶算法**总结如下：

1.  给定初始可行点 $$(x^0,y^0,s^0)$$，令 $$k\leftarrow0$$；

2.  构造方程 (7.139)，获得解 (7.140)；

3.  使用线搜索 (7.141) 求得下一步可行解；

4.  若满足停机条件，终止；否则 $$k\leftarrow k+1$$，转步 (2)．

从迭代过程看，原始--对偶算法类似于带约束的线搜索类算法：先确定下降 方向 $$(\Delta x,\Delta y,\Delta s)$$，再选取合适的步长使下一步迭代点仍是 可行域的严格内点．步长 $$\alpha^k$$ 的选取是内点法的关键因素之一， 下一小节的路径追踪算法给出更好的选取方法．

### 路径追踪算法

##### 1. 中心路径

用动态的观点再次考察扰动 KKT 条件 (7.136)：随着 迭代进行，其中的 $$\mu$$ 趋于 $$0$$．根据隐函数定理，给定 $$\mu$$ 时条件 (7.136) 决定的解存在唯一．原始--对偶算法的过程 就是不断寻找满足 (7.136) 的点的近似，对任意 $$\mu$$，满足该条件的点非常重要，为此引入下面的定义．

<div class="definition">

**定义 7.7** 给定参数 $$\tau>0$$，点 $$(x_\tau,y_\tau,s_\tau)$$ 满足如下方程： $$\begin{equation}
  Ax=b,\qquad
  A^\top y+s=c,\qquad
  x_is_i=\tau\ (i=1,2,\dots,n),\qquad
  x>0,\ s>0,
\end{equation}$$ 则称单参数曲线 $$\begin{equation}
  \mathcal{C}=\lbrace(x_\tau,y_\tau,s_\tau):\ \tau>0\rbrace
\end{equation}$$ 为**中心路径**，方程 (7.142) 称为中心路径方程．

</div>

<div class="supp">

从罚函数角度看，方程 (7.142) 实际是对数罚函数形式的 优化问题 $$\begin{equation}
  \min_{x}\ c^\top x-\tau\sum_{i=1}^n\ln x_i
  \ \text{s.t.}\ Ax=b
\end{equation}$$ 的最优性条件：该问题的 KKT 条件为 $$Ax=b$$ 与 $$c-A^\top y-\tau X^{-1}\mathbf{1}=0$$（$$y$$ 为等式约束乘子）；令 $$s=\tau X^{-1}\mathbf{1}$$（逐分量 $$s_i=\tau/x_i$$），则 $$x_is_i=\tau\ \forall i$$ 且 $$A^\top y+s=c$$，$$s>0$$------恰为中心路径方程 (7.142)．当 $$\tau\to0$$ 时，罚项减弱，解收敛于满足 KKT 方程 (7.130)--(7.133) 的点．因此内点法 正是 §7.1.5 对数罚函数法在原始--对偶框架下的精致化： \"$$\sigma\to0$$\"几何化为\"沿中心路径趋于边界\"．

</div>

迭代点一般不在中心路径上**（迭代点一般不在中心路径上）** 上一小节的原始--对偶算法产生的迭代点序列虽是可行解，但一般*不在* 中心路径上，原因有二： (1) 求解方程 (7.139) 时忽略了高阶项 $$\Delta x\odot\Delta s$$，引入了误差； (2) 线搜索只能保证下一步落在 $$x>0,\ s>0$$ 内，而中心路径方程要求 $$x\odot s$$ 的*每个分量*都等于同一个值 $$\tau$$，实际迭代一般不满足． 我们希望 $$x_is_i$$ 以*一致*的速度下降到 $$0$$（而不是各分量参差不齐）： 若 $$x_is_i=0$$ 说明点已接近可行域边缘，继续迭代将紧贴定义域边缘更新， 有违内点法思想------这就是考虑中心路径的原因．

##### 2. 中心路径邻域与路径追踪算法

我们希望迭代点列 $$(x^k,y^k,s^k)$$ 在中心路径 $$\mathcal{C}$$ 附近移动， 跟随 $$\mathcal{C}$$ 直至到达最优值点------这就是**路径追踪算法**． 将点列限制在中心路径附近的方式是选取合适的线搜索．考虑线性规划的 严格可行域 $$\begin{equation}
  \mathcal{F}^\circ=\lbrace(x,y,s):\ Ax=b,\ A^\top y+s=c,\ x>0,\ s>0\rbrace,
\end{equation}$$ 并定义**中心路径邻域** $$\begin{equation}
  \mathcal{N}_{-\infty}(\gamma)=\lbrace(x,y,s)\in\mathcal{F}^\circ:\
  x_is_i\ge\gamma\mu,\ \forall i\rbrace,
\end{equation}$$ 其中 $$\mu=x^\top s/n$$．当某点处于该邻域中时，$$x\odot s$$ 的每个分量至少 为 $$\gamma\mu$$；$$\gamma$$ 通常取较小的正数（如 $$10^{-3}$$），且一般不大于 扰动参数 $$\sigma$$（(7.136) 中）．当 $$\gamma\to0$$ 时，邻域 $$\mathcal{N}_{-\infty}(\gamma)$$ 与整个可行域越来越接近．

<div class="algorithm">

**算法 18**

**输入**：初值 $$(x^0,y^0,s^0)\in\mathcal{F}^\circ$$，参数 $$0<\gamma<\sigma<1$$，$$k\leftarrow0$$．

<div class="algorithmic">

求解方程 (7.139) 得到更新 $$(\Delta x,\Delta y,\Delta s)$$； 选取**最大**的 $$\alpha\in(0,1]$$ 使得下一步迭代点落在 $$\mathcal{N}_{-\infty}(\gamma)$$ 内，记为 $$\alpha^k$$； 更新 $$(x^{k+1},y^{k+1},s^{k+1})
         =(x^k,y^k,s^k)+\alpha^k(\Delta x,\Delta y,\Delta s)$$； $$k\leftarrow k+1$$；

</div>

</div>

算法 18 的关键在于如何选取最大的 $$\alpha^k$$： 由方程 (7.139) 的性质，只需保证下一步迭代满足 $$x_is_i\ge\gamma\mu$$ 即可------这是关于 $$\alpha$$ 的 $$n$$ 个*二次* 不等式（$$(x_i+\alpha\Delta x_i)(s_i+\alpha\Delta s_i)\ge\gamma\mu$$）， 求解比较容易；再结合条件 $$x>0,\ s>0$$ 就能确定 $$\alpha^k$$ （讲义习题 7.13）．

##### 3. 收敛性分析

<div class="lemma">

**引理 7.3** 设 $$(x,y,s)\in\mathcal{N}_{-\infty}(\gamma)$$，记 $$(x(\alpha),y(\alpha),s(\alpha))=(x,y,s)+\alpha(\Delta x,\Delta y,\Delta s)$$， 其中 $$(\Delta x,\Delta y,\Delta s)$$ 为扰动 KKT 参数 $$\sigma$$ 下方程 (7.139) 的解．则对任意的 $$\begin{equation}
  \alpha\in\Bigl[0,\ \frac{2^{3/2}\gamma}{1+\gamma}\cdot
  \frac{1-\gamma}{\sigma}\cdot\frac{1}{\sqrt{n}}\Bigr],
\end{equation}$$ 有 $$(x(\alpha),y(\alpha),s(\alpha))\in\mathcal{N}_{-\infty}(\gamma)$$．

</div>

引理 7.3 说明算法 18 中 至少可以选取 $$\begin{equation}
  \alpha^k=\frac{2^{3/2}\sigma}{n\gamma}\cdot\frac{1-\gamma}{1+\gamma}
  \cdot\frac{1}{\sqrt n}\quad\text{量级的步长}
\end{equation}$$ （即步长有 $$O(1/\sqrt n)$$ 的下界，虽然这样选取的 $$\alpha^k$$ 不一定是 最大的），基于此有如下收敛性结果：

<div class="theorem">

**定理 7.10** 给定参数 $$0<\gamma<\sigma<1$$，设 $$\mu^k=(x^k)^\top s^k/n$$ 为算法 18 产生的对偶 间隙，且初值 $$(x^0,y^0,s^0)\in\mathcal{N}_{-\infty}(\gamma)$$，则存在与维数 $$n$$ 无关的常数 $$c$$，使得对任意 $$k$$ 有 $$\begin{equation}
  \mu^{k+1}\le\Bigl(1-\frac{c}{n}\Bigr)\mu^k.
\end{equation}$$ 更进一步，对任意给定的精度 $$\varepsilon\in(0,1)$$，存在迭代步数 $$\begin{equation}
  K=O\Bigl(n\ln\frac{1}{\varepsilon}\Bigr)
\end{equation}$$ 使得 $$\mu^k\le\varepsilon\mu^0,\ \forall k\ge K$$．

</div>

定理 7.10 表明对偶间隙呈*指数式*趋于 $$0$$（每步按比例 $$1-\frac{c}{n}$$ 缩小），且维数 $$n$$ 越大收敛越慢------ 把两件事合起来就是迭代复杂度 $$O\bigl(n\ln(1/\varepsilon)\bigr)$$， 是关于 $$n$$ 与 $$\ln(1/\varepsilon)$$ 的**多项式**．这揭示了内点法 确实可以在多项式时间内产生给定精度的解，从这个方面看它比单纯形法 （最坏指数复杂度）更有保证；虽然最初设计中内点法的效率不如单纯形法， 但随着不断完善，内点法已成为线性规划的主流求解算法之一，在很多问题 上优于单纯形法，也是求解中小规模半定规划问题的主要算法（对大规模 半定规划，每次迭代形成与求解线性系统的代价昂贵，内点法受限，近年来 基于增广拉格朗日函数的算法部分弥补了这一点）．

## 流形约束优化算法

<div class="supp">

流形优化一般指一类带有流形约束的优化问题： $$\begin{equation}
  \min_{x}\ f(x)
  \ \text{s.t.}\ x\in\mathcal{M},
\end{equation}$$ 其中 $$\mathcal{M}$$ 是某种黎曼流形，$$f:\mathcal{M}\to\mathbb{R}$$ 是定义在 $$\mathcal{M}$$ 上的实值函数．它描述了计算与应用数学、统计学、机器学习、 数据科学和材料科学等众多领域的重要科学问题（相关成果曾获多项诺贝尔 物理奖与化学奖）．常见的流形约束包括*单位球、正交矩阵集合和固定 秩矩阵集合*等；流形约束的存在是这些*非凸*优化问题算法设计与理论 分析的主要困难之一．作为一种特殊形式的约束优化问题，流形约束优化问题 具有特殊的理论性质与求解方法：约束不再用乘子\"惩罚\"，而是把 $$\mathcal{M}$$ 本身作为迭代空间，在每点的*切空间*（一个线性空间） 中重建梯度、海瑟与线搜索的全部机制．

</div>

### 流形的基本概念

<div class="definition">

**定义 7.8** 设 $$\mathcal{M}$$ 是一个集合．$$\mathcal{M}$$ 上的**图卡**定义为 $$(U,\varphi)$$，其中 $$U$$ 为图卡的定义域且 $$U\subset\mathcal{M}$$；设 $$n$$ 是图卡的维数，则 $$\varphi$$ 是 $$U$$ 到 $$\mathbb{R}^n$$ 中一个开集的双射．给定 $$x\in U$$，$$\varphi(x)=(x_1,x_2,\dots,x_n)^\top$$ 称为 $$x$$ 在图卡 $$(U,\varphi)$$ 下的**坐标**．

</div>

<div class="definition">

**定义 7.9** 给定 $$\mathcal{M}$$ 中两个维数均为 $$n$$ 的图卡 $$(U,\varphi)$$ 和 $$(V,\psi)$$，若： $$\varphi(U\cap V)$$ 是 $$\mathbb{R}^n$$ 的开集；$$\psi(U\cap V)$$ 是 $$\mathbb{R}^n$$ 的开集； $$\psi\circ\varphi^{-1}:\varphi(U\cap V)\to\psi(U\cap V)$$ 是光滑微分同胚 （光滑且反函数光滑），则称 $$(U,\varphi)$$ 与 $$(V,\psi)$$ **相容**．

</div>

<div class="definition">

**定义 7.10** 设 $$H$$ 为定义在 $$\mathcal{M}$$ 上的图卡对应的下标， $$\mathfrak{A}=\lbrace(U_i,\varphi_i),\ i\in H\rbrace$$ 是两两相容的图卡构成的 集合．若 $$\bigcup_{i\in H}U_i=\mathcal{M}$$，则称 $$\mathfrak{A}$$ 是 $$\mathcal{M}$$ 的一个**光滑图册**．若 $$\mathfrak{A}_1\cup\mathfrak{A}_2$$ 是图册，则称两图册相容；称由 $$\mathfrak{A}$$ 生成的**最大图册** $$\mathfrak{A}^+$$ 为所有满足 $$\mathfrak{A}\cup(U,\varphi)$$ 为图册的图卡 $$(U,\varphi)$$ 的集合．设 $$\mathfrak{A}^+$$ 是 $$\mathcal{M}$$ 的最大图册， 如果 $$\mathcal{M}:=(\mathcal{M},\mathfrak{A}^+)$$ 由图册诱导的拓扑是 *第二可数*的，则称 $$\mathcal{M}$$ 为一个**流形**．

</div>

简要地说：一个 $$d$$ 维流形是通过图卡*局部同胚*于 $$d$$ 维欧氏空间的 Hausdorff、第二可数的拓扑空间；若相交图卡间的映射是光滑的，则称 $$\mathcal{M}$$ 为**光滑流形**．

<div class="definition">

**定义 7.11** 令 $$f$$ 为从 $$d_1$$ 维流形 $$\mathcal{M}_1$$ 映射到 $$d_2$$ 维流形 $$\mathcal{M}_2$$ 上的实值函数，$$x$$ 为 $$\mathcal{M}_1$$ 上的点．分别选择 $$\mathcal{M}_1$$ 与 $$\mathcal{M}_2$$ 上的图卡 $$(U_1,\varphi_1)$$ 与 $$(U_2,\varphi_2)$$（$$x\in U_1$$，$$f(x)\in U_2$$），定义函数 $$\begin{equation}
  \hat f=\varphi_2\circ f\circ\varphi_1^{-1}:\mathbb{R}^{d_1}\to\mathbb{R}^{d_2},
\end{equation}$$ 若 $$\hat f\in C^\infty$$ 对所有图卡选取成立，则称 $$f$$ 为一个 **光滑映射**，并称 $$\hat f$$ 为 $$f$$ 的**坐标表示**．

</div>

<div class="definition">

**定义 7.12** 给定两个流形 $$\mathcal{M}$$ 与 $$\bar{\mathcal{M}}$$，如果 $$\mathcal{M}\subset\bar{\mathcal{M}}$$，包含映射 $$\mathrm{i}:\mathcal{M}\to\bar{\mathcal{M}},\ \mathrm{i}(x)=x$$ 是光滑的， 且对 $$\forall x\in\mathcal{M}$$，$$D\hat{\mathrm{i}}(\varphi_1(x))$$ 的秩与 $$\dim\mathcal{M}$$ 相同，则称 $$\mathcal{M}$$ 为 $$\bar{\mathcal{M}}$$ 的 **子流形**（$$\hat{\mathrm{i}}$$ 的定义域与像空间都是欧氏空间，故 $$D$$ 为欧氏空间中的微分算子，且该秩与图卡选取无关）．若进一步 $$\mathcal{M}$$ 的子空间拓扑与 $$\bar{\mathcal{M}}$$ 的拓扑相容（$$\mathcal{M}$$ 中的每个开集均为 $$\bar{\mathcal{M}}$$ 中某开集与 $$\mathcal{M}$$ 的交集）， 则称 $$\mathcal{M}$$ 为 $$\bar{\mathcal{M}}$$ 的**嵌入子流形**．

</div>

##### 切向量、切空间与黎曼度量

<div class="definition">

**定义 7.13** 若存在一条定义在 $$\mathcal{M}$$ 上的曲线 $$\gamma$$，满足 $$\gamma(0)=x$$ 且 $$\begin{equation}
  D(f(x))[\xi_x]=D(f(x))[\dot\gamma(0)]
  \coloneqq\frac{\mathrm{d}f(\gamma(t))}{\mathrm{d}t}\Big\vert_{t=0},
  \qquad \forall f\in\mathfrak{I}_x(\mathcal{M}),
\end{equation}$$ 其中 $$\mathfrak{I}_x(\mathcal{M})$$ 表示定义在 $$\mathcal{M}$$ 上的所有实值 函数，则称 $$\xi_x$$ 为在点 $$x$$ 处的**切向量**．流形上一点 $$x$$ 的 **切空间**为该点所有切向量的集合，记为 $$T_x\mathcal{M}$$．

</div>

<div class="definition">

**定义 7.14** 令 $$\left\langle \cdot,\,\cdot\right\rangle_x$$ 表示在点 $$x\in\mathcal{M}$$ 处的切空间上定义的 内积．如果 $$\mathcal{M}$$ 配备了一个随 $$x$$ *光滑变化*的切空间内积 $$g_x(\cdot,\cdot)\coloneqq\left\langle \cdot,\,\cdot\right\rangle_x$$，则称 $$g_x$$ 为 **黎曼度量**，称 $$(\mathcal{M},g)$$ 是**黎曼流形**，通常简记为 $$\mathcal{M}$$．

</div>

<div class="example">

**例题 7.5** 一个常见的矩阵流形是**斯蒂夫尔流形** $$\begin{equation}
  \operatorname{St}(n,p)\coloneqq\lbraceX\in\mathbb{R}^{n\times p}:\ X^\top X=I_p\rbrace,
\end{equation}$$ 及黎曼度量 $$g_X(U,V)=\mathop{\mathrm{Tr}}(U^\top V)$$，$$U,V\in T_X\mathcal{M}$$（欧氏 内积）．对任意满足 $$\gamma(0)=X$$ 的曲线 $$\gamma(t)\in\operatorname{St}(n,p)$$，对 $$\gamma(t)^\top\gamma(t)=I_p$$ 求导得 $$\dot\gamma(0)^\top\gamma(0)+\gamma(0)^\top\dot\gamma(0)=0$$，因此在 $$X$$ 点处的切空间（与度量 $$g_X$$ 无关）为 $$\begin{equation}
  T_X\operatorname{St}(n,p)=\lbraceU:\ X^\top U+U^\top X=0\rbrace.
\end{equation}$$

</div>

##### 黎曼梯度与黎曼海瑟矩阵

<div class="definition">

**定义 7.15** 对于点 $$x\in\mathcal{M}$$ 与定义在 $$\mathcal{M}$$ 上的函数 $$f$$，其 **黎曼梯度** $$\mathop{\mathrm{grad}}f(x)$$ 为在 $$x$$ 处的唯一一个满足下面等式的切 向量： $$\begin{equation}
  \left\langle \mathop{\mathrm{grad}}f(x),\,\ \xi\right\rangle_x=Df(x)[\xi],
  \qquad \forall \xi\in T_x\mathcal{M},
\end{equation}$$ 其中 $$Df(x)[\xi]$$ 为 $$f(\gamma(t))$$ 在 $$t=0$$ 处的导数，$$\gamma(t)$$ 为 满足 $$\gamma(0)=x$$、$$\dot\gamma(0)=\xi$$ 的曲线．

</div>

由此可知：黎曼梯度可看做是*欧氏梯度在切空间上的（相对于黎曼度量 的）广义投影*．要定义黎曼海瑟矩阵，还需要黎曼联络等工具：

<div class="definition">

**定义 7.16** 设 $$\chi(\mathcal{M})$$ 表示 $$\mathcal{M}$$ 上光滑向量场的集合， $$\mathfrak{I}(\mathcal{M})$$ 表示定义在 $$\mathcal{M}$$ 上的所有实值函数． 流形 $$\mathcal{M}$$ 上的**仿射联络** $$\nabla$$ 是一个映射 $$\begin{equation}
  \nabla:\chi(\mathcal{M})\times\chi(\mathcal{M})\to\chi(\mathcal{M}):
  (X,Y)\mapsto\nabla_XY,
\end{equation}$$ 且满足：$$\mathfrak{I}(\mathcal{M})$$-线性 $$\nabla_{fX+gY}Z=f\nabla_XZ+g\nabla_YZ$$；$$\mathbb{R}$$-线性 $$\nabla_X(aY+bZ)=a\nabla_XY+b\nabla_XZ$$；莱布尼兹公式 $$\nabla_X(fY)=(Xf)Y+f\nabla_XY$$， 其中 $$X,Y,Z\in\chi(\mathcal{M})$$，$$f,g\in\mathfrak{I}(\mathcal{M})$$， $$a,b\in\mathbb{R}$$，$$Xf(x)\coloneqq Df(x)[X_x]$$（$$X_x$$ 为 $$X$$ 在 $$x$$ 点的切 向量）．称 $$\nabla_XY$$ 为 $$Y$$ 沿着 $$X$$ 的关于 $$\nabla$$ 的**协变 微分**．例如对任意向量场 $$Y$$，$$\nabla_{\mathop{\mathrm{grad}}f(x)}Y\coloneqq
D_Y(x)[\mathop{\mathrm{grad}}f(x)]$$ 即为一个仿射联络．

</div>

<div class="theorem">

**定理 7.11** 黎曼流形 $$\mathcal{M}$$ 存在**唯一**的仿射联络 $$\nabla$$，且对所有 $$X,Y,Z\in\chi(\mathcal{M})$$ 满足：

- **对称性**：$$\nabla_XY-\nabla_YX=[X,Y]$$，其中 $$[X,Y]$$ 定义为 $$[X,Y]f=X(Yf)-Y(Xf),\ \forall f\in\mathfrak{I}(\mathcal{M})$$；

- **与度量的相容性**：$$Z\left\langle X,\,Y\right\rangle
          =\left\langle \nabla_ZX,\,Y\right\rangle+\left\langle X,\,\nabla_ZY\right\rangle$$， 其中 $$\left\langle \cdot,\,\cdot\right\rangle$$ 为黎曼度量．

满足上述对称性与相容性的仿射联络称为**黎曼联络**．

</div>

<div class="definition">

**定义 7.17** 对于点 $$x\in\mathcal{M}$$，定义在 $$\mathcal{M}$$ 上的函数 $$f$$ 的 **黎曼海瑟矩阵**记为 $$\mathop{\mathrm{Hess}}f(x)$$，它是从 $$T_x\mathcal{M}$$ 到 $$T_x\mathcal{M}$$ 的映射： $$\begin{equation}
  \mathop{\mathrm{Hess}}f(x)[\xi]\coloneqq\tilde\nabla_\xi\mathop{\mathrm{grad}}f(x),
\end{equation}$$ 其中 $$\tilde\nabla$$ 为黎曼联络．

</div>

<div class="proposition">

**命题 7.2** 对 $$\bar f:\mathbb{R}^n\to\mathbb{R}$$，令 $$f$$ 为其在黎曼子流形 $$\mathcal{M}$$ 上的限制． 如果 $$\mathcal{M}$$ 的黎曼度量取为欧氏内积，那么有 $$\begin{equation}
  \mathop{\mathrm{grad}}f(x)=\mathcal{P}\bigl(\nabla\bar f(x)\bigr),
  \qquad
  \mathop{\mathrm{Hess}}f(x)[u]=\mathcal{P}\bigl(D\mathop{\mathrm{grad}}f(x)[u]\bigr),
  \qquad u\in T_x\mathcal{M},
\end{equation}$$ 其中 $$D$$ 为欧氏导数，$$\mathcal{P}(x)\coloneqq\operatorname*{arg\,min}_{z\in T_x\mathcal{M}}
\left\Vert x-z\right\Vert_2$$ 为到 $$T_x\mathcal{M}$$ 的投影算子．

</div>

记号约定**（记号约定）**  本节同时涉及欧氏梯度、欧氏海瑟矩阵、黎曼梯度与黎曼海瑟矩阵，记号统一 如下：

<div class="center">

| 记号 | 含义 |
|:---|:---|
| $$\nabla f(x)$$ | 函数 $$f$$ 在 $$x$$ 点处的**欧氏**梯度 |
| $$\mathop{\mathrm{grad}}f(x)$$ | 函数 $$f$$ 在 $$x$$ 点处的**黎曼**梯度 |
| $$Df(x)[u]$$ | 函数 $$f$$ 在 $$x$$ 点处的欧氏梯度作用在 $$u$$ 上 |
| $$\nabla^2f(x)[u]$$ | 函数 $$f$$ 在 $$x$$ 点处的欧氏海瑟矩阵作用在 $$u$$ 上 |
| $$\mathop{\mathrm{Hess}}f(x)[u]$$ | 函数 $$f$$ 在 $$x$$ 点处的黎曼海瑟矩阵作用在 $$u$$ 上 |

</div>

根据定义 (7.156) 与 (7.158)， 不同的黎曼度量会给出*不同*的黎曼梯度与黎曼海瑟矩阵．

### 典型流形介绍

<div class="definition">

**定义 7.18** 对于 $$x\in\mathcal{M}$$，$$\mathcal{M}$$ 为欧氏空间 $$\mathbb{R}^n$$ 的嵌入子流形， $$U$$ 为 $$x$$ 在 $$\mathbb{R}^n$$ 中的邻域．如果 $$h:U\to\mathbb{R}^k$$ 为光滑函数， $$\begin{equation}
  \mathcal{M}\cap U=\lbracex\in U:\ h(x)=0\rbrace,
\end{equation}$$ 且 $$Dh(x):\mathbb{R}^n\to\mathbb{R}^k$$ 的秩为 $$k$$，则称 $$h$$ 为流形 $$\mathcal{M}$$ 在 $$x$$ 处的**局部定义函数**；若 $$\mathcal{M}\subset U$$，则称 $$h$$ 为 流形 $$\mathcal{M}$$ 的**定义函数**．

</div>

<div class="theorem">

**定理 7.12** 若 $$\mathcal{M}$$ 为 $$\mathbb{R}^n$$ 的嵌入子流形，则 $$\mathcal{M}$$ 满足以下条件 之一：

1.  $$\mathcal{M}$$ 为 $$\mathbb{R}^n$$ 中的开集（此时称 $$\mathcal{M}$$ 为 **开子流形**，且有 $$T_x\mathcal{M}=\mathbb{R}^n$$）；

2.  对给定的整数 $$k\ge1$$，对任意 $$x\in\mathcal{M}$$，均存在 $$x$$ 的 邻域 $$U\subset\mathbb{R}^n$$ 与在 $$x$$ 处的局部定义函数 $$h:U\to\mathbb{R}^k$$ 使得：若 $$y\in U$$，则 $$h(y)=0$$ 当且仅当 $$y\in\mathcal{M}$$；且 $$\operatorname{rank}Dh(x)=k$$．此时 $$\begin{equation}
              T_x\mathcal{M}=\ker Dh(x)\coloneqq
              \lbraceu\in\mathbb{R}^n:\ Dh(x)[u]=0\rbrace,
    \end{equation}$$ $$n-k$$ 为流形维数．

</div>

下面针对一些典型的矩阵流形（黎曼度量均取欧氏内积），给出切空间、投影 算子、黎曼梯度与黎曼海瑟矩阵的表达式．

<div class="example">

**例题 7.6** $$\mathrm{Sp}(n-1)\coloneqq\lbracex\in\mathbb{R}^n:\ \left\Vert x\right\Vert=1\rbrace$$．

- 切空间与投影算子： $$\begin{equation}
            T_x\mathrm{Sp}(n-1)=\lbracez\in\mathbb{R}^n:\ z^\top x=0\rbrace,\qquad
            \mathcal{P}_{T_x}(z)=(I-xx^\top)z;
  \end{equation}$$

- 黎曼梯度与黎曼海瑟矩阵： $$\begin{equation}
            \mathop{\mathrm{grad}}f(x)=(I-xx^\top)\nabla f(x),
            \qquad
            \mathop{\mathrm{Hess}}f(x)[u]=\mathcal{P}_{T_x}\bigl(\nabla^2f(x)[u]-ux^\top\nabla f(x)\bigr),
  \end{equation}$$ 其中 $$u\in T_x\mathrm{Sp}(n-1)$$．

**Proof** **（）** 令 $$x(t)$$ 为球面上满足 $$x(0)=x$$、$$x(t)^\top x(t)=1$$ 的曲线，对 $$t$$ 求导 得 $$\dot x(t)^\top x(t)+x(t)^\top\dot x(t)=0$$；在 $$t=0$$ 处即 $$\dot x(0)^\top x+x^\top\dot x(0)=0$$，故 $$T_x\mathrm{Sp}(n-1)=\lbracez:z^\top x=0\rbrace$$．由于 $$x$$ 垂直于切空间，切空间 上的投影算子为 $$\mathcal{P}_{T_x}(z)=(I-xx^\top)z$$． 给 $$\mathrm{Sp}(n-1)$$ 配备欧氏度量 $$g_x(u,v)=u^\top v$$，黎曼梯度与 海瑟矩阵由投影公式 (7.159) 计算： $$\begin{equation}
  \mathop{\mathrm{grad}}f(x)=\mathcal{P}_{T_x}(\nabla f(x))=(I-xx^\top)\nabla f(x),
\end{equation}$$ $$\begin{align}
  \mathop{\mathrm{Hess}}f(x)[u]&=\nabla_u\mathop{\mathrm{grad}}f
  =\mathcal{P}_{T_x}\bigl(D\mathop{\mathrm{grad}}f(x)[u]\bigr)\\
  &=\mathcal{P}_{T_x}\Bigl(\nabla^2f(x)[u]
  -\left\langle u,\,\nabla f(x)\right\rangle x+\left\langle x,\,\nabla^2f(x)[u]\right\rangle x-\left\langle x,\,\nabla f(x)\right\rangle u\Bigr)
  \\
  &=\mathcal{P}_{T_x}\bigl(\nabla^2f(x)[u]-ux^\top\nabla f(x)\bigr),
  \qquad u\in T_x\mathrm{Sp}(n-1),
\end{align}$$ 其中第二个等号展开 $$D\mathop{\mathrm{grad}}f(x)[u]=D(I-xx^\top)\nabla f(x)[u]$$ （对 $$xx^\top\nabla f(x)$$ 求方向导数：$$\nabla^2f(x)[u]$$ 项、$$\left\langle u,\,\nabla f(x)\right\rangle x$$ 项与 $$\left\langle x,\,\nabla^2f(x)[u]\right\rangle x$$ 项、 $$\left\langle x,\,\nabla f(x)\right\rangle u$$ 项的组合），第三个等号利用 $$u\in T_x$$ （$$x^\top u=0$$）时含 $$x$$ 的项均被投影消去、以及 $$x^\top\nabla f(x)$$ 为标量使 $$-\left\langle x,\,\nabla f(x)\right\rangle u=-u\cdot
(x^\top\nabla f(x))$$，且投影后剩余项为 $$\nabla^2f(x)[u]-ux^\top\nabla f(x)$$（其与切空间的内积性质保证投影不 改变该表达式，因为 $$\mathcal{P}_{T_x}$$ 只去掉 $$x$$ 方向分量）．

</div>

<div class="example">

**例题 7.7** $$\operatorname{St}(n,p)\coloneqq\lbraceX\in\mathbb{R}^{n\times p}:\ X^\top X=I_p\rbrace$$．

- 切空间与投影算子： $$\begin{equation}
            T_X\operatorname{St}(n,p)=\lbraceZ\in\mathbb{R}^{n\times p}:\ Z^\top X+X^\top Z=0\rbrace,\qquad
            \mathcal{P}_{T_X}(Z)=Z-X\,\mathop{\mathrm{Sym}}(X^\top Z),
  \end{equation}$$ 其中 $$\mathop{\mathrm{Sym}}(Z)\coloneqq(Z+Z^\top)/2$$；

- 黎曼梯度与黎曼海瑟矩阵： $$\begin{equation}
            \mathop{\mathrm{grad}}f(X)=\mathcal{P}_{T_X}\bigl(\nabla f(X)\bigr),
            \qquad
            \mathop{\mathrm{Hess}}f(X)[U]=\mathcal{P}_{T_X}
            \bigl(\nabla^2f(X)[U]-U\,\mathop{\mathrm{Sym}}(X^\top\nabla f(X))\bigr),
  \end{equation}$$ 其中 $$U\in T_X\operatorname{St}(n,p)$$．

**Proof** **（）** 定义函数 $$h:\mathbb{R}^{n\times p}\to\mathcal{S}^p,\ X\mapsto h(X)=X^\top X-I_p$$ （$$\mathcal{S}^p$$ 为 $$p$$ 阶对称矩阵空间，$$\dim\mathcal{S}^p=p(p+1)/2$$）． $$h$$ 光滑且 $$h^{-1}(0)=\operatorname{St}(n,p)$$，只需证 $$\operatorname{rank}Dh(X)=p(p+1)/2$$： $$\begin{equation}
  Dh(X)[V]=\lim_{t\to0}\frac{h(X+tV)-h(X)}{t}
  =\lim_{t\to0}\frac{(X+tV)^\top(X+tV)-X^\top X}{t}
  =X^\top V+V^\top X.
\end{equation}$$ 对任意对称矩阵 $$A\in\mathcal{S}^p$$，令 $$V=\frac12XA$$，则 $$Dh(X)[V]=A$$，故 $$\dim Dh(X)=p(p+1)/2$$，即 $$h$$ 为斯蒂夫尔流形的定义 函数．由定理 7.12 得切空间 $$T_X\operatorname{St}(n,p)=\ker Dh(X)=\lbraceZ:Z^\top X+X^\top Z=0\rbrace$$．

再求法空间与投影算子．设 $$X_\perp$$ 为 $$X\in\operatorname{St}(n,p)$$ 的正交补，则 $$[X,X_\perp]\in\mathbb{R}^{n\times n}$$ 为正交矩阵且 $$X^\top X=I_p$$、 $$X_\perp^\top X_\perp=I_{n-p}$$、$$X^\top X_\perp=0$$．由 $$[X,X_\perp]$$ 可逆，$$\forall V\in\mathbb{R}^{n\times p}$$ 可写为 $$\begin{equation}
  V=[X\ \ X_\perp]\begin{bmatrix}\Omega\\ B\end{bmatrix}
  =X\Omega+X_\perp B.
\end{equation}$$ 利用该分解，$$V$$ 为切向量当且仅当 $$\begin{equation}
  0=Dh(X)[V]=X^\top(X\Omega+X_\perp B)+(X\Omega+X_\perp B)^\top X
  =\Omega+\Omega^\top,
\end{equation}$$ 即 $$\Omega$$ 为 $$p$$ 阶*反对称*矩阵．令 $$U=XA+X_\perp C$$，则 $$\operatorname{St}(n,p)$$ 在 $$X$$ 处的法空间为 $$\begin{equation}
  \mathcal{N}_{X}\operatorname{St}(n,p)=(T_X\operatorname{St}(n,p))^\perp
  =\lbraceXA:\ A\in\mathcal{S}^p\rbrace
\end{equation}$$ （由 $$\left\langle XA+X_\perp C,\,X\Omega+X_\perp B\right\rangle
=\left\langle A,\,\Omega\right\rangle+\left\langle C,\,B\right\rangle=0\ \forall\Omega\in\mathcal{S}^p_{\mathrm{asym}},
B$$ 的刻画得到）．由投影算子与切空间的定义， $$U-\mathcal{P}_{T_X}(U)=XA\in$$ 法空间，且 $$\mathcal{P}_{T_X}(U)^\top X+X^\top\mathcal{P}_{T_X}(U)=0$$，求解得 $$\begin{equation}
  \mathcal{P}_{T_X}(U)=U-X\,\mathop{\mathrm{Sym}}(X^\top U).
\end{equation}$$ 进一步， $$D\mathop{\mathrm{grad}}f(X)[V]=\nabla^2f(X)V-V\mathop{\mathrm{Sym}}(X^\top\nabla f(X))-XS$$，其中 $$S=\mathop{\mathrm{Sym}}\bigl(V^\top\nabla f(X)+X^\top\nabla^2f(X)[V]\bigr)$$；由于 $$XS$$ 在投影 $$\mathcal{P}_{T_X}$$ 作用下为 $$0$$，故得 (7.167)．

</div>

<div class="example">

**例题 7.8** $$\operatorname{Ob}(n,p)\coloneqq\lbraceX\in\mathbb{R}^{n\times p}:\ \operatorname{diag}(X^\top X)=\mathbf{1}\rbrace$$ （列单位范数矩阵集合）．

- 切空间与投影算子： $$\begin{equation}
            T_X\operatorname{Ob}(n,p)=\lbraceZ\in\mathbb{R}^{n\times p}:\ \operatorname{diag}(X^\top Z)=0\rbrace,\qquad
            \mathcal{P}_{T_X}(Z)=Z-X\operatorname{diag}(X^\top Z);
  \end{equation}$$

- 黎曼梯度与黎曼海瑟矩阵： $$\begin{align}
            \mathop{\mathrm{grad}}f(X)&=\nabla f(X)-X\operatorname{diag}(X^\top\nabla f(X)),\\
            \mathop{\mathrm{Hess}}f(X)[U]&=\mathcal{P}_{T_X}
            \bigl(\nabla^2f(X)[U]-U\operatorname{diag}(X^\top\nabla f(X))\bigr).
  \end{align}$$

**Proof** **（）** 取定义函数 $$h(X)=\operatorname{diag}(X^\top X)-\mathbf{1}$$：$$h$$ 光滑， $$\operatorname{Ob}(n,p)=h^{-1}(0)$$，且 $$\dim Dh(X)=p$$（逐行约束 $$\left\Vert X_{:i}\right\Vert=1$$，共 $$p$$ 个），故 $$h$$ 为定义函数，切空间为 $$T_X\operatorname{Ob}(n,p)=\ker Dh(X)=\lbraceZ:\operatorname{diag}(X^\top Z)=0\rbrace$$．法空间为 $$\begin{equation}
  \mathcal{N}_X\operatorname{Ob}(n,p)=(T_X\operatorname{Ob}(n,p))^\perp
  =\lbraceXD:\ D\in\mathbb{R}^{p\times p}\ \text{为对角矩阵}\rbrace.
\end{equation}$$ 于是 $$Z=\mathcal{P}_{T_X}(Z)+XD$$（$$D$$ 对角），且 $$\operatorname{diag}\bigl(X^\top\mathcal{P}_{T_X}(Z)\bigr)=0$$，解得 $$\mathcal{P}_{T_X}(Z)=Z-X\operatorname{Diag}\bigl(\operatorname{diag}(X^\top Z)\bigr)$$．黎曼梯度 $$\mathop{\mathrm{grad}}f(X)=\mathcal{P}_{T_X}(\nabla f(X))=\nabla f(X)
-X\operatorname{diag}(X^\top\nabla f(X))$$；黎曼海瑟 $$\mathop{\mathrm{Hess}}f(X)[U]=\mathcal{P}_{T_X}\bigl(\nabla^2f(X)[U]
-U\operatorname{diag}(X^\top\nabla f(X))-XS\bigr)$$（$$S$$ 为对称矩阵项），最后一个 等式由 $$\mathcal{P}_{T_X}(XS)=0$$（$$S$$ 对称时 $$XS\in$$ 法空间）化简．

</div>

<div class="example">

**例题 7.9** $$\operatorname{Fr}(n,p,r)\coloneqq\lbraceX\in\mathbb{R}^{n\times p}:\ \operatorname{rank}(X)=r\rbrace$$．其切空间为 $$\begin{align}
  T_X\operatorname{Fr}(n,p,r)&=\Bigl\lbrace[U\ \ U_\perp]
  \begin{bmatrix}
    R & 0\\ 0 & 0
  \end{bmatrix}
  [V\ \ V_\perp]^\top\Bigr\rbrace\\
  &=\bigl\lbraceUMV^\top+U_pV^\top+UV_p^\top:\ M\in\mathbb{R}^{r\times r},\
  U_p\in\mathbb{R}^{n\times r},\ U_p^\top U=0,\\
  &\hspace{9.5em}
  V_p\in\mathbb{R}^{p\times r},\ V_p^\top V=0\bigr\rbrace,
\end{align}$$ 其中 $$X=U\Sigma V^\top$$ 为瘦 SVD（$$U\in\mathbb{R}^{n\times r}$$， $$V\in\mathbb{R}^{p\times r}$$），$$U_p,V_p$$ 为相应正交补空间中的矩阵；投影算子 与黎曼梯度为 $$\begin{equation}
  \mathcal{P}_{T_X}(Z)=P_UZP_V+P_U^\perp ZP_V+P_UZP_V^\perp,
  \qquad
  \mathop{\mathrm{grad}}f(X)=P_U\nabla f(X)+\nabla f(X)P_V-P_U\nabla f(X)P_V,
\end{equation}$$ 黎曼海瑟矩阵 $$\mathop{\mathrm{Hess}}f(X)[H]=U\hat MV^\top+\hat U_pV^\top+U\hat V_p^\top$$， 其中 $$\begin{align}
  \hat M&=M\bigl(\nabla^2f(X)[H];\ X\bigr),\\
  \hat U_p&=U_p\bigl(\nabla^2f(X)[H];\ X\bigr)
  +\frac{P_U^\perp\nabla f(X)\,V_p(H;\ X)}{\Sigma},\\
  \hat V_p&=V_p\bigl(\nabla^2f(X)[H];\ X\bigr)
  +\frac{P_V^\perp\nabla f(X)\,U_p(H;\ X)}{\Sigma},
\end{align}$$ 这里 $$M(\cdot;\cdot),U_p(\cdot;\cdot),V_p(\cdot;\cdot)$$ 为与 SVD 分解 相关的扰动函数，$$\Sigma$$ 为奇异值矩阵（详细推导可参考 Absil 等 《Optimization Algorithms on Matrix Manifolds》第 7 章）．

</div>

<div class="example">

**例题 7.10** $$\mathbb{S}_{+}=\lbraceX\in\mathbb{R}^{n\times n}:\ X^\top=X,\ X\succ0\rbrace$$（对称正定矩阵集合， 为对称矩阵空间 $$\mathcal{S}^n$$ 的开子集，故为开子流形）．由定理 7.12(1)，其切空间为线性空间本身： $$\begin{equation}
  T_X\mathbb{S}_{+}=\lbraceZ\in\mathbb{R}^{n\times n}:\ Z^\top=Z\rbrace,\qquad
  \mathcal{P}_{T_X}(Z)=(Z^\top+Z)/2,
\end{equation}$$ 在欧氏度量 $$g_X(U,V)=\mathop{\mathrm{Tr}}(U^\top V)$$ 下法空间为全体 $$n$$ 阶*反对称* 矩阵，故黎曼梯度与黎曼海瑟矩阵为 $$\begin{equation}
  \mathop{\mathrm{grad}}f(X)=\mathcal{P}_{T_X}\bigl(\nabla f(X)\bigr),
  \qquad
  \mathop{\mathrm{Hess}}f(X)[U]=\mathcal{P}_{T_X}\bigl(\nabla^2f(X)[U]\bigr),
  \qquad U\in T_X\mathbb{S}_{+}.
\end{equation}$$

</div>

<div class="example">

**例题 7.11** $$\operatorname{Grass}(n,p)\coloneqq\lbrace\operatorname{span}(X):\
X\in\mathbb{R}^{n\times p},\ X^\top X=I_p\rbrace$$，表示 $$\mathbb{R}^n$$ 的所有 $$p$$ 维子空间． 该流形与上述流形不同：它是一个**商流形**（同一子空间对应无数等价 的正交代表元）．给定 $$X\in\mathbb{R}^{n\times p}$$（$$X^\top X=I_p$$），其 *水平空间*为 $$\begin{equation}
  \mathcal{H}_X\operatorname{Grass}(n,p)=\lbraceZ\in\mathbb{R}^{n\times p}:\ Z^\top X=0\rbrace,
\end{equation}$$ 在计算黎曼梯度与黎曼海瑟矩阵时，水平空间的作用类似于切空间，映射到 水平空间的投影为 $$\begin{equation}
  \mathcal{P}_{\mathcal{H}_X}(Z)=Z-XX^\top Z,
\end{equation}$$ 黎曼梯度与黎曼海瑟矩阵为 $$\begin{equation}
  \mathop{\mathrm{grad}}f(X)=\mathcal{P}_{\mathcal{H}_X}\bigl(\nabla f(X)\bigr),
  \qquad
  \mathop{\mathrm{Hess}}f(X)[U]=\mathcal{P}_{\mathcal{H}_X}
  \bigl(\nabla^2f(X)[U]-UX^\top\nabla f(X)\bigr).
\end{equation}$$ 由于此处涉及商流形中的概念，不做过多展开，详细推导可参考 Absil 等专著 第 7 章．

</div>

### 最优性条件

设 $$f\in\mathfrak{I}_x(\mathcal{M})$$，$$\mathcal{M}$$ 维数为 $$n$$．对 $$x\in\mathcal{M}$$，取该点附近的图卡 $$\varphi$$，令 $$\hat f=f\circ\varphi^{-1}:\mathbb{R}^n\to\mathbb{R}$$，则 $$\hat f$$ 局部定义在欧氏空间中． 考虑流形上带一般约束的优化问题 $$\begin{equation}
  \min_{x\in\mathcal{M}}\ f(x)
  \ \text{s.t.}\ c_i(x)=0,\ i\in E;\qquad c_i(x)\le 0,\ i\in I,
\end{equation}$$ 其中 $$c_i:\mathcal{M}\to\mathbb{R}$$ 为定义在 $$\mathcal{M}$$ 上的光滑函数． 在 $$x$$ 附近的局部图卡 $$(U,\varphi)$$ 下，问题 (7.184) 可以表示为欧氏空间中的形式： $$\begin{equation}
  \min_{\hat x\in\mathcal{M}}\ \hat f(\hat x)
  \ \text{s.t.}\ \hat c_i(\hat x)=0,\ i\in E;\qquad
     \hat c_i(\hat x)\le 0,\ i\in I;\qquad
     \hat x\in\varphi(U)\subset\mathbb{R}^n,
\end{equation}$$ 其中 $$\hat f=f\circ\varphi^{-1}$$，$$\hat c_i=c_i\circ\varphi^{-1}$$， $$\hat x=\varphi(x)$$．记 (7.185) 的可行域为 $$X=\lbrace\hat x\in\mathbb{R}^n:\ \hat c_i(\hat x)\le0,\ i\in I;\
\hat c_i(\hat x)=0,\ i\in E;\ \hat x\in\varphi(U)\rbrace$$．根据第五章的 结论，定义积极集与线性化可行方向锥（欧氏空间中，$$\hat x$$ 处）： $$\begin{equation}
  A(\hat x)=E\cup\lbracei\in I:\ c_i(\hat x)=0\rbrace,
\end{equation}$$ $$\begin{equation}
  F(\hat x)=\bigl\lbrace\hat d:\ \hat d^\top\nabla\hat c_i(\hat x)=0,\ \forall i\in E;\
  \hat d^\top\nabla\hat c_i(\hat x)\le 0,\ \forall i\in A(\hat x)\cap I\bigr\rbrace.
\end{equation}$$ 对应地，原问题 (7.184) 的积极集 $$A(x)=E\cup\lbracei\in I: c_i(x)=0\rbrace$$ 与线性化可行方向锥 $$F(x)=\lbraced:\ d^\top\mathop{\mathrm{grad}}c_i(x)=0,\ \forall i\in E;\
d^\top\mathop{\mathrm{grad}}c_i(x)\le 0,\ \forall i\in A(x)\cap I\rbrace$$（把欧氏梯度换成 黎曼梯度、方向限制在切空间 $$T_x\mathcal{M}$$ 中）．

<div class="definition">

**定义 7.19** 给定可行点 $$x\in\mathcal{M}$$ 及相应的积极集 $$A(x)$$，如果 $$\begin{equation}
  \mathop{\mathrm{grad}}c_i(x),\ i\in A(x)\quad\text{在}\ T_x\mathcal{M}\ \text{中线性无关},
\end{equation}$$ 则称**流形上的线性无关约束品性**在点 $$x$$ 处成立．

</div>

<div class="theorem">

**定理 7.13** 问题 (7.184) 的流形上的线性无关约束品性在 $$x$$ 成立，当且仅当问题 (7.185) 在 $$\hat x$$ 处满足 LICQ．

</div>

<div class="theorem">

**定理 7.14** 假设 $$x^*$$ 是问题 (7.184) 的局部极小值， 且在 $$x^*$$ 处流形上的线性无关约束品性成立，则存在拉格朗日乘子 $$\lambda_i^*,\ i\in E\cup I$$ 使得下列 KKT 条件满足： $$\begin{align}
  &\mathop{\mathrm{grad}}f(x^*)+\sum_{i\in E\cup I}\lambda_i^*\mathop{\mathrm{grad}}c_i(x^*)=0,\qquad
  c_i(x^*)=0\ \forall i\in E,\\
  &c_i(x^*)\le 0,\ \lambda_i^*\ge 0,\ \lambda_i^*c_i(x^*)=0\ \forall i\in I.
\end{align}$$

</div>

令 $$x^*$$ 与 $$\lambda_i^*$$ 为 (7.189) 的解，类比 线性化可行方向的推导，问题 (7.184) 的 **临界锥**为 $$\begin{equation}
  w\in C(x^*,\lambda^*)\iff
  \begin{cases}
    w\in T_{x^*}\mathcal{M},\\
    \left\langle \mathop{\mathrm{grad}}c_i(x^*),\,\ w\right\rangle=0,\ \forall i\in E,\\
    \left\langle \mathop{\mathrm{grad}}c_i(x^*),\,\ w\right\rangle=0,\ \forall i\in A(x^*)\cap I\ \text{其中}\ \lambda_i^*>0,\\
    \left\langle \mathop{\mathrm{grad}}c_i(x^*),\,\ w\right\rangle\le 0,\ \forall i\in A(x^*)\cap I\ \text{其中}\ \lambda_i^*=0.
  \end{cases}
\end{equation}$$

<div class="theorem">

**定理 7.15**

- **二阶必要条件**：假设 $$x^*$$ 为问题 (7.184) 的局部极小值，且流形上的 LICQ 在 $$x^*$$ 处成立，$$\lambda^*$$ 为使 (7.189) 成立的乘子，则 $$\begin{equation}
            \left\langle \mathop{\mathrm{Hess}}L(x^*,\,\lambda^*)[w],\ w\right\rangle\ge 0,
            \qquad \forall w\in C(x^*,\lambda^*),
  \end{equation}$$ 其中 $$\mathop{\mathrm{Hess}}L(x^*,\lambda^*)$$ 为在 $$(x^*,\lambda^*)$$ 处关于 $$x$$ 的 $$L$$ 的*黎曼*海瑟矩阵；

- **二阶充分条件**：假设 $$x^*$$ 与 $$\lambda^*$$ 满足 KKT 条件 (7.189)，若 $$\begin{equation}
            \left\langle \mathop{\mathrm{Hess}}L(x^*,\,\lambda^*)[w],\ w\right\rangle>0,
            \qquad \forall w\in C(x^*,\lambda^*),\ w\ne 0,
  \end{equation}$$ 则 $$x^*$$ 为问题 (7.184) 的严格局部 极小值．

</div>

<div class="corollary">

**推论 7.1** 假设问题只有流形约束（$$E\cup I=\varnothing$$），$$f$$ 为定义在 $$\mathcal{M}$$ 上的光滑函数，则： 若 $$x^*$$ 为一阶驻点，则 $$\mathop{\mathrm{grad}}f(x^*)=0$$；若 $$x^*$$ 为二阶驻点，则 $$\mathop{\mathrm{grad}}f(x^*)=0$$ 且 $$\mathop{\mathrm{Hess}}f(x^*)\succeq0$$（切空间上半正定）；若 $$\mathop{\mathrm{grad}}f(x^*)=0$$ 且 $$\mathop{\mathrm{Hess}}f(x^*)\succ0$$，则 $$x^*$$ 为严格极小值点． 这与欧氏空间情形完全平行------只需把欧氏梯度、海瑟换成黎曼梯度、海瑟．

</div>

### 收缩算子以及平行移动

有了最优性条件，需要考虑如何设计数值算法．以线搜索算法为例：若 $$\mathcal{M}=\mathbb{R}^n$$（欧氏空间），选取合适的下降方向 $$\eta^k$$ 和步长 $$t^k$$，迭代格式 $$x^{k+1}=x^k+t^k\eta^k$$ 可以保证收敛；但该格式 *不适用于*流形上的优化------因为 $$x^k+t^k\eta^k$$ 未必还在流形 $$\mathcal{M}$$ 上（约束 $$x\in\mathcal{M}$$ 不对线性组合封闭）．为此 介绍**收缩映射算子**的概念．

<div class="definition">

**定义 7.20** 收缩映射 $$R$$ 为定义在 $$T\mathcal{M}\coloneqq\bigcup_{x\in\mathcal{M}}
T_x\mathcal{M}$$ 上、映射到 $$\mathcal{M}$$ 的光滑算子，并且满足：

- $$R_x(0_x)=x$$，其中 $$0_x$$ 为 $$T_x\mathcal{M}$$ 中的零元；

- $$DR_x(0_x)[\xi]=\xi,\ \forall\xi\in T_x\mathcal{M}$$.

</div>

有了收缩映射算子，则可以定义 $$x^{k+1}=R_{x^k}(t^k\eta^k)$$，表示从 $$x^k$$ 出发沿方向 $$\eta^k$$ 做*曲线*线搜索．收缩算子对任意流形都 存在（且满足定义 7.20 的收缩映射可能不止一个）． 其中一种比较特别的是由测地线引出的**指数映射**：

<div class="definition">

**定义 7.21** 设 $$\mathcal{M}$$ 为黎曼流形，$$c:I\to\mathcal{M}$$ 为定义在流形上的曲线． 如果 $$c$$ 满足 $$c''(t)=0\ \forall t\in I$$（$$I$$ 为 $$\mathbb{R}$$ 的开区间），则称 $$c$$ 为一条**测地线**；若区间 $$I$$ 不能再延拓，则称 $$c$$ 为一条 **极大测地线**，简记为 $$\gamma_v:I\to\mathcal{M}$$．给定集合 $$\begin{equation}
  \mathcal{O}=\lbrace(x,v)\in\mathcal{M}\times T_x\mathcal{M}:\
  \gamma_v\ \text{为定义在包含}\ [0,1]\ \text{区间内的极大测地线}\rbrace,
\end{equation}$$ **指数映射** $$\mathop{\mathrm{Exp}}:\mathcal{O}\to\mathcal{M}$$ 定义为 $$\begin{equation}
  \mathop{\mathrm{Exp}}(x,v)=\mathop{\mathrm{Exp}}_x(v)=\gamma_v(1).
\end{equation}$$

</div>

收缩映射与指数映射的关系**（收缩映射与指数映射的关系）**  指数映射 $$\gamma_v(t)=R_x(tv)$$ 与一般收缩映射算子不同的地方在于其在 $$t=0$$ 处*二阶导为* $$0$$（$$c''(0)=0$$，测地线\"不弯曲\"）；收缩映射 往往被看做指数映射的一个推广（更便宜但逼近性略差）．

下面以斯蒂夫尔流形 $$\operatorname{St}(n,p)$$ 为例，给出在当前点 $$X$$、给定步长 $$\tau$$ 与下降方向 $$-D$$ 时的四种收缩算子：

1.  **指数映射**： $$\begin{equation}
              R_X^{\mathrm{geo}}(-\tau D)=[X\ \ Q_R]\,
              \exp\left(\tau
              \begin{bmatrix}
                -X^\top D & -R^\top\\
                R & 0
              \end{bmatrix}
              \begin{bmatrix} I_p\\ 0\end{bmatrix}\right),
    \end{equation}$$ 其中 $$[X\ Q_R]$$、$$QR=-(I_n-XX^\top)D$$ 为 $$-(I_n-XX^\top)D$$ 的 QR 分解．该格式需要计算一个 $$2p\times2p$$ 矩阵的指数并且需要 一个 $$n\times p$$ 矩阵的 QR 分解；

2.  **凯莱变换**： $$\begin{equation}
              R_X^{\mathrm{Cayley}}(-\tau D)=X-\tau U
              \Bigl(I_{2p}+\frac{\tau}{2}V^\top U\Bigr)^{-1}V^\top X,
    \end{equation}$$ 其中 $$U=[P_XD,\ X]$$，$$V=[X,\ -P_XD]\in\mathbb{R}^{n\times2p}$$， $$P_X\coloneqq I-\frac12XX^\top$$．当 $$p<n/2$$ 时，该格式的计算量 比指数映射小；由于 $$X$$ 和 $$D$$ 通常是低秩矩阵，$$U,V$$ 也是低秩 矩阵，可利用 SMW（Sherman--Morrison--Woodbury）求逆公式将 (7.196) 的求逆运算量进一步减小；

3.  **极分解**： $$\begin{equation}
              R_X^{\mathrm{pd}}(-\tau D)=\bigl(X-\tau D\bigr)
              \bigl(I_p+\tau^2D^\top D\bigr)^{-1/2}.
    \end{equation}$$ 该格式的计算量比凯莱变换低，但凯莱变换可能对指数映射有更好的 逼近；

4.  **QR 分解**： $$\begin{equation}
              R_X^{\mathrm{qr}}(-\tau D)=\operatorname{qr}(X-\tau D),
    \end{equation}$$ 其中 $$\operatorname{qr}(\cdot)$$ 取 Q 因子（保证极小极性时取 符号修正）．该格式可看做极分解的逼近，主要计算开销为 $$n\times p$$ 矩阵的 QR 分解．

不同收缩算子的计算复杂度与收敛性表现会有很大不同：指数映射最\"精确\" 但最贵；QR 分解最便宜；凯莱变换在价格与逼近质量之间取得平衡 （讲义习题 7.15：可证明极分解满足收缩算子的两条性质）．

### 一阶优化方法

有了收缩算子（与向量移动）的工具，一般化的**一阶流形优化框架** 可表示为 $$\begin{equation}
  x^{k+1}=R_{x^k}\bigl(t^k\xi^k\bigr),
\end{equation}$$ 其中 $$t^k$$ 为选择好的步长、$$\xi^k\in T_{x^k}\mathcal{M}$$ 为搜索方向． 与欧氏空间中的线搜索方法类似，步长 $$t^k$$ 可通过在流形上的*曲线 搜索*得到：以 Armijo 搜索为例，给定 $$\rho,\delta\in(0,1)$$， **单调**与**非单调**搜索的目的是分别找到最小的非负整数 （记步长 $$t^k=\gamma^k\delta^h$$，$$\gamma^k$$ 为初始步长）满足 $$\begin{align}
  &f\bigl(R_{x^k}(t^k\xi^k)\bigr)\le f(x^k)+\rho t^k
  \left\langle \mathop{\mathrm{grad}}f(x^k),\,\ \xi^k\right\rangle_{x^k},
  \\
  &f\bigl(R_{x^k}(t^k\xi^k)\bigr)\le C^k+\rho t^k
  \left\langle \mathop{\mathrm{grad}}f(x^k),\,\ \xi^k\right\rangle_{x^k},
\end{align}$$ 其中 (7.201) 的参考值 $$C^k$$ 为 $$C^k$$ 与 $$f(x^{k+1})$$ 的凸组合，通过 $$\begin{equation}
  C^{k+1}=\frac{\varrho Q^kC^k+f(x^{k+1})}{Q^{k+1}},
  \qquad Q^{k+1}=\varrho Q^k+1,\qquad
  \varrho\in[0,1],\ C^0=f(x^0),\ Q^0=1
\end{equation}$$ 计算（$$\varrho=1$$ 退化为单调搜索）．

##### 1. 黎曼 BB 步长

在一阶优化算法中，梯度类算法最常用，即 $$\xi^k=-\mathop{\mathrm{grad}}f(x^k)$$．从欧氏 空间的优化我们知道，选择 **BB 步长**通常可以加速收敛；BB 步长 同样可一般化到黎曼流形上：$$\gamma_k^{(1)}$$ 与 $$\gamma_k^{(2)}$$ 分别 定义为 $$\begin{equation}
  \gamma_k^{(1)}=\frac{\left\langle s^{k-1},\,\ s^{k-1}\right\rangle_{x^k}}
  {\left\vert\left\langle s^{k-1},\,\ v^{k-1}\right\rangle_{x^k}\right\vert},
  \qquad
  \gamma_k^{(2)}=\frac{\left\vert\left\langle s^{k-1},\,\ v^{k-1}\right\rangle_{x^k}\right\vert}
  {\left\langle v^{k-1},\,\ v^{k-1}\right\rangle_{x^k}},
\end{equation}$$ 其中 $$\begin{equation}
  s^{k-1}=-t^{k-1}\cdot T_{x^{k-1}\to x^k}\bigl(\mathop{\mathrm{grad}}f(x^{k-1})\bigr),
  \qquad
  v^{k-1}=\mathop{\mathrm{grad}}f(x^k)+t^{-1}_{k-1}\cdot s^{k-1},
\end{equation}$$ 且 $$T_{x^{k-1}\to x^k}:T_{x^{k-1}}\mathcal{M}\to T_{x^k}\mathcal{M}$$ 表示一种合适的**向量移动**映射，用来把 $$x^{k-1}$$ 处的切向量搬运到 $$x^k$$ 处（对应欧氏情形的\"梯度差\"操作）．当 $$\mathcal{M}$$ 为欧氏空间的 子流形且欧氏内积用于 (7.203) 时，取欧氏差分 $$\begin{equation}
  s^{k-1}=x^k-x^{k-1},
  \qquad
  v^{k-1}=\mathop{\mathrm{grad}}f(x^k)-\mathop{\mathrm{grad}}f(x^{k-1})
\end{equation}$$ 是一种加速方法------这种方法一般比较实用，因为该算法中*不需要*向量 移动算子．一阶优化算法与二阶优化算法的区别主要体现在如何构造 $$\xi^k$$．

<div class="algorithm">

**算法 19**

**输入**：$$x^0\in\mathcal{M}$$，$$k=0$$，$$\gamma_{\min}\in(0,1]$$， $$\gamma_{\max}\ge1$$，$$C^0=f(x^0)$$，$$Q^0=1$$，停机准则 $$\varepsilon$$．

<div class="algorithmic">

计算 $$\xi^k=-\mathop{\mathrm{grad}}f(x^k)$$； 通过式 (7.203) 计算 $$\gamma^k$$，再令 $$\gamma^k=\max\bigl(\gamma_{\min},\ \min(\gamma^k,\ \gamma_{\max})\bigr)$$； 计算 $$C^k,Q^k$$ 并找到合适步长 $$t^k$$ 满足 (7.201)； 令 $$x^{k+1}\leftarrow R_{x^k}(t^k\xi^k)$$； $$k\leftarrow k+1$$；

</div>

</div>

与欧氏空间的梯度下降法相比，黎曼梯度下降法只是多了**一步收缩 映射** $$R_{x^k}$$（把欧氏线性组合\"拉回\"流形）．

### 二阶优化算法

相较于梯度算法，二阶算法具有更高的局部收敛阶；当问题需要比较精确地 求解时，采用二阶算法．利用精确黎曼海瑟矩阵与不同的收缩算子，可以设计 黎曼牛顿法、信赖域方法与自适应的正则化方法；为得到更好的收敛性甚至 超线性收敛，还需对收缩算子加上额外的限制（如假设 C）．

##### 1. 黎曼信赖域方法（RTR）

通过利用切空间、黎曼梯度和海瑟矩阵，可以在黎曼流形上设计信赖域（RTR） 算法．在第 $$k$$ 步迭代点 $$x^k$$，通过流形上的泰勒展开，RTR 算法在 *切空间*中构建如下子问题： $$\begin{equation}
  \min_{\xi\in T_{x^k}\mathcal{M}}\ m^k(\xi)\coloneqq
  \left\langle \mathop{\mathrm{grad}}f(x^k),\,\ \xi\right\rangle_{x^k}
  +\frac12\left\langle \mathop{\mathrm{Hess}}f(x^k)[\xi],\,\ \xi\right\rangle_{x^k}
  \ \text{s.t.}\ \left\Vert\xi\right\Vert_{x^k}\le\Delta^k,
\end{equation}$$ 其中 $$\Delta^k$$ 为信赖域半径．由于该子问题是带约束的二次问题，且切 空间具有**线性结构**，可以用欧氏空间中的**截断共轭梯度法** 求解，即迭代求解牛顿方程 $$\begin{equation}
  \mathop{\mathrm{grad}}m^k(x^k)+\mathop{\mathrm{Hess}}m^k(x^k)[\xi^k]=0.
\end{equation}$$ 迭代过程中 $$\mathop{\mathrm{Hess}}f(x^k)$$ 为 $$T_{x^k}\mathcal{M}\to T_{x^k}\mathcal{M}$$ 的映射，保证最终求出的方向落在 $$T_{x^k}\mathcal{M}$$ 上．每一步只需要 计算*黎曼海瑟矩阵--向量乘法*（相对计算开销小），同时满足第六章 信赖域理论的柯西下降条件：若 $$\mathop{\mathrm{Hess}}f(x^k)$$ 正定且 $$\left\Vert\mathop{\mathrm{Hess}}f(x^k)^{-1}\mathop{\mathrm{grad}}f(x^k)\right\Vert\le\Delta^k$$，则截断信赖域解得的 方向就是牛顿方向．在截断共轭梯度法中选取初始方向 $$-\mathop{\mathrm{grad}}f(x^k)$$，可 保证得到的下降方向满足**柯西下降量** $$\begin{equation}
  m^k_{x^k}(0)-m^k_{x^k}(\xi^k)\ge
  c_1\left\Vert\mathop{\mathrm{grad}}f(x^k)\right\Vert\min\Bigl(\Delta^k,\
  \frac{\left\Vert\mathop{\mathrm{grad}}f(x^k)\right\Vert}{\left\Vert H^k\right\Vert}\Bigr),
\end{equation}$$ 其中 $$c_1$$ 为固定常数，$$H^k$$ 为海瑟算子的范数界．

试验点通过 $$z^k=R_{x^k}(\xi^k)$$ 计算（步长取 $$1$$）．为确定是否接受 试验点 $$z^k$$，计算实际下降量与目标下降量的比值 $$\begin{equation}
  \rho^k\coloneqq\frac{f(x^k)-f\bigl(R_{x^k}(\xi^k)\bigr)}
  {m^k(0)-m^k(\xi^k)},
\end{equation}$$ 迭代点与信赖域半径按与第六章信赖域算法完全相同的规则更新： $$\begin{equation}
  x^{k+1}=
  \begin{cases}
    z^k, & \rho^k\ge\eta_1,\\
    x^k, & \text{否则},
  \end{cases}
  \qquad
  \Delta^{k+1}=
  \begin{cases}
    \frac14\Delta^k, & \rho^k<\frac14,\\
    \min\lbrace2\Delta^k,\ \bar\Delta\rbrace, & \rho^k>\frac34,\\
    \Delta^k, & \text{否则},
  \end{cases}
\end{equation}$$ 其中 $$\eta_1>0$$ 为接受阈值，$$\bar\Delta$$ 为半径上界．

<div class="algorithm">

**算法 20**

**输入**：初始点 $$x^0\in\mathcal{M}$$，参数 $$\bar\Delta>0$$， $$\Delta^0\in(0,\bar\Delta)$$，$$\rho'\in[0,\frac14)$$．

<div class="algorithmic">

利用截断共轭梯度法求解 (7.206) 得到 $$\xi^k$$； 根据 (7.209) 计算比率 $$\rho^k$$； 根据上述规则更新 $$\Delta^{k+1}$$； 根据上述规则更新 $$x^{k+1}$$；

</div>

</div>

##### 2. 自适应的正则化牛顿法

借鉴欧氏空间的观点，解决一般黎曼子流形上的特定问题还可以考虑 **自适应正则化牛顿法**：目标函数为流形上的二阶泰勒展开加一个 正则项，且*流形约束被保留*（子问题直接在流形上求解，而不是在 切空间中）： $$\begin{equation}
  \min_{x\in\mathcal{M}}\ \hat m^k(x)\coloneqq
  \left\langle \mathop{\mathrm{grad}}f(x),\,\ x-x^k\right\rangle
  +\frac12\left\langle H^k[x-x^k],\,\ x-x^k\right\rangle
  +\frac{\sigma^k}{2}\left\Vert x-x^k\right\Vert^2,
\end{equation}$$ 其中 $$H^k$$ 为（黎曼）海瑟矩阵或它的逼近，$$\sigma^k>0$$ 为正则化参数． 子问题 (7.211) 的近似解可通过**修正的 共轭梯度法**求解黎曼牛顿方程 $$\begin{equation}
  \mathop{\mathrm{grad}}\hat m^k(x^k)+\mathop{\mathrm{Hess}}\hat m^k(x^k)[\xi^k]=0
\end{equation}$$ 得到；修正共轭梯度法与截断共轭梯度法的主要区别是**遇到负曲率时 策略不同**：这里可以采用负曲率方向作为新的搜索方向（从而更有效地逃离 鞍点）．得到 $$\xi^k$$ 之后再利用 Armijo 搜索得到试验点 $$z^k$$；计算 实际下降量与预测下降量的比值 $$\begin{equation}
  \hat\rho^k=\frac{f(z^k)-f(x^k)}{\hat m^k(z^k)},
\end{equation}$$ 迭代点更新为 $$x^{k+1}=z^k$$（若 $$\hat\rho^k\ge\eta_1>0$$）或 $$x^{k+1}=x^k$$ （否则），而**正则化参数** $$\sigma^k$$ 根据下式更新： $$\begin{equation}
  \sigma^{k+1}\in
  \begin{cases}
    (0,\ \gamma_0\sigma^k], & \hat\rho^k\ge\eta_2,\\
    [\gamma_0\sigma^k,\ \gamma_1\sigma^k], & \eta_1\le\hat\rho^k<\eta_2,\\
    [\gamma_1\sigma^k,\ \gamma_2\sigma^k], & \text{否则},
  \end{cases}
\end{equation}$$ 其中 $$0<\eta_1\le\eta_2<1$$，$$0<\gamma_0<1<\gamma_1\le\gamma_2$$------ 模型越准（$$\hat\rho^k$$ 越大）正则化越弱（更像纯牛顿法），模型越差 正则化越强（更保守）．

子空间形式**（子空间形式）**  同样可以给出该问题在*切空间*中的形式： $$\begin{equation}
  \min_{\xi\in T_{x^k}\mathcal{M}}\ \check m^k(\xi)\coloneqq
  \left\langle \mathop{\mathrm{grad}}f(x^k),\,\ \xi\right\rangle_{x^k}
  +\frac12\left\langle H^k[\xi],\,\ \xi\right\rangle_{x^k}
  +\frac{\sigma^k}{2}\left\Vert\xi\right\Vert^2.
\end{equation}$$ 由于两个问题的定义域不同（流形 vs 切空间），与 (7.211) 的不同点在于比率 $$\check\rho^k=\bigl(f(z^k)-f(x^k)\bigr)/\check m^k(\xi)$$ 的更新．

### 应用举例

##### 1. 最大割问题

利用流形优化方法可以求解半定规划问题．第四章介绍的最大割问题的半定 规划松弛为 $$\begin{equation}
  \min_{X}\ \left\langle C,\,\ X\right\rangle
  \ \text{s.t.}\ X_{ii}=1,\ i=1,2,\dots,n;\qquad X\succeq 0;\qquad \operatorname{rank}(X)=p,
\end{equation}$$ 其中 $$C\in\mathbb{R}^{n\times n}$$ 为对称矩阵，$$p$$ 为指定的分解维数．利用 $$X=V^\top V$$（$$\operatorname{rank}(X)\le p$$ 的等价参数化），问题 (7.216) 可改写为 $$\begin{equation}
  \min_{V}\ \left\langle C,\,\ V^\top V\right\rangle
  \ \text{s.t.}\ V\in\operatorname{Ob}(p,n),
\end{equation}$$ 该问题可看做在*斜流形*上的优化问题．根据例 7.8， 斜流形的切空间与投影算子为 $$T_X\operatorname{Ob}(p,n)=\lbraceZ\in\mathbb{R}^{p\times n}:\operatorname{diag}(X^\top Z)=0\rbrace$$， $$\mathcal{P}_{T_X}(Z)=Z-X\operatorname{diag}(X^\top Z)$$．目标函数 $$f(V)=\mathop{\mathrm{Tr}}(CV^\top V)$$ 的方向导数为 $$\begin{equation}
  Df(V)[U]=\lim_{t\to0}
  \frac{\mathop{\mathrm{Tr}}\bigl(C(V+tU)^\top(V+tU)\bigr)-\mathop{\mathrm{Tr}}(CV^\top V)}{t}
  =2\left\langle VC,\,\ U\right\rangle,
\end{equation}$$ 由此可知目标函数的欧氏梯度与欧氏海瑟矩阵为 $$\begin{equation}
  \nabla f(V)=2VC,
  \qquad
  \nabla^2f(V)=2C,
\end{equation}$$ 代入斜流形的公式即得黎曼梯度与黎曼海瑟矩阵（$$U\in T_X\operatorname{Ob}(p,n)$$）： $$\begin{align}
  \mathop{\mathrm{grad}}f(X)&=\nabla f(X)-X\operatorname{diag}(X^\top\nabla f(X)),\\
  \mathop{\mathrm{Hess}}f(X)[U]&=\mathcal{P}_{T_X}
  \bigl(\nabla^2f(X)[U]-U\operatorname{diag}(X^\top\nabla f(X))\bigr).
\end{align}$$ 取 $$p=10$$，采用 Gset 数据集中的 G5 数据（对应 800 个顶点、19176 条 权重为 $$1$$ 的边；设 $$W$$ 为邻接矩阵，则 $$C=\frac14\bigl(\operatorname{Diag}(W)\mathbf{1}
-W\bigr)$$），分别用 RGBB（算法 19）与 RTR （算法 20）求解：在精确解附近 RGBB 的梯度范数呈 *非单调*下降但总体收敛，而 RTR 的梯度范数具有*超线性* 收敛性（讲义图 7.9）．

##### 2. KS 全局能量极小化问题

由第四章介绍，离散 Kohn--Sham（KS）总能量函数为 $$\begin{equation}
  E_{\mathrm{KS}}(X)\coloneqq\frac12\mathop{\mathrm{Tr}}(X^\top LX)+\mathop{\mathrm{Tr}}(X^\top V_{\mathrm{ion}}X)
  +\frac12\rho^\top L^\dagger\rho+\mathbf{1}^\top\varepsilon_{xc}(\rho),
\end{equation}$$ 离散形式下的 KS 能量极小化问题可以表示成 $$\begin{equation}
  \min_{X\in\mathbb{C}^{n\times n_e}}\ E_{\mathrm{KS}}(X)
  \ \text{s.t.}\ X^\top X=I_{n_e},
\end{equation}$$ 这是一个*正交约束*优化问题（斯蒂夫尔流形，复数域版本）．其欧氏 梯度与海瑟矩阵为 $$\begin{equation}
  \nabla E_{\mathrm{KS}}(X)=H(X)X,
  \qquad
  H(X)\coloneqq\frac12L+V_{\mathrm{ion}}
  +\operatorname{diag}\bigl((\Re L^\dagger)\rho\bigr)+\operatorname{diag}(\mu_{xc}^\top\rho),
\end{equation}$$ $$\begin{equation}
  \nabla^2\bigl(E_{\mathrm{KS}}(X)\bigr)[Z]
  =H(X)Z+\operatorname{diag}\bigl(J\bigl((X\odot Z+X\odot Z)\rho\bigr)\bigr)X,
\end{equation}$$ 其中 $$\mu_{xc}=\partial\varepsilon_{xc}/\partial\rho\in\mathbb{R}^{n\times n}$$， $$J=\Re L^\dagger+\frac{\partial^2\varepsilon_{xc}}{\partial\rho^2}\rho$$， $$\odot$$ 表示逐元素乘积．该问题在欧氏空间的最优性条件为 $$\begin{equation}
  H(X)X=X\Lambda,
  \qquad
  X^\top X=I_{n_e},
\end{equation}$$ 其中 $$\Lambda$$ 为拉格朗日乘子（厄米特矩阵）------即特征值问题的形式． 根据例 7.7 斯蒂夫尔流形的公式，黎曼梯度与黎曼海瑟 矩阵为 $$\begin{align}
  \mathop{\mathrm{grad}}E_{\mathrm{KS}}(X)&=\mathcal{P}_{T_X}\bigl(\nabla f(X)\bigr),\\
  \mathop{\mathrm{Hess}}E_{\mathrm{KS}}(X)[U]&=\mathcal{P}_{T_X}
  \bigl(\nabla^2f(X)[U]-U\,\mathop{\mathrm{Sym}}(X^\top\nabla f(X))\bigr),
\end{align}$$ 其中 $$U\in T_X\operatorname{St}(n,p)$$．用 RGBB 与 RTR 在软件包 KSSOLV 中求解分子 体系 alanine（$$n=12671$$，$$n_e=18$$）：与最大割问题类似，RGBB 的梯度 范数呈非单调下降但总体收敛，RTR 具有超线性收敛性（讲义图 7.10）．

### 收敛性分析

##### 1. 一阶算法的收敛性

<div class="theorem">

**定理 7.16** 令 $$\lbracex^k\rbrace$$ 为算法 19 通过非单调搜索 (7.201) 得到的序列，假设 $$f$$ 在流形 $$\mathcal{M}$$ 上连续可微，则序列 $$\lbracex^k\rbrace$$ 的每个聚点 $$x^*$$ 都为问题 (7.151) 的驻点，即 $$\mathop{\mathrm{grad}}f(x^*)=0$$．

</div>

**Proof** **（）** 首先，由 $$\left\langle \mathop{\mathrm{grad}}f(x^k),\,\ \eta^k\right\rangle_{x^k}
=-\left\Vert\mathop{\mathrm{grad}}f(x^k)\right\Vert_{x^k}^2<0$$（$$\eta^k=-\mathop{\mathrm{grad}}f(x^k)$$）并利用 非单调线搜索的标准引理，对任意 $$k$$ 有 $$f(x^k)\le C^k$$ 以及 $$x^k\in\lbracex\in\mathcal{M}: f(x)\le f(x^0)\rbrace$$（水平集内）．

其次，由 $$\begin{align}
  &\lim_{t\downarrow0}
  \frac{(f\circ R_{x^k})(t\eta^k)-f(x^k)}{t}
  -\rho\left\langle \mathop{\mathrm{grad}}f(x^k),\,\ \eta^k\right\rangle_{x^k}\\
  &\qquad=\nabla f\bigl(R_{x^k}(0)\bigr)^\top DR_{x^k}(0)\eta^k
  +\rho\left\Vert\mathop{\mathrm{grad}}f(x^k)\right\Vert_{x^k}^2
  =-(1-\rho)\left\Vert\mathop{\mathrm{grad}}f(x^k)\right\Vert_{x^k}^2<0,
\end{align}$$ （其中用了收缩映射的性质 $$DR_{x^k}(0)\eta^k=\eta^k$$），所以存在正的 步长 $$t^k\in(0,\gamma^k]$$ 满足非单调 Armijo 条件 (7.201)（算法不会卡死）．

令 $$x^*\in\mathcal{M}$$ 为 $$\lbracex^k\rbrace$$ 的任意聚点，$$\lbracex^k\rbrace_K$$ 为对应的 收敛子列．根据 $$C^{k+1}$$ 的定义以及 (7.201)，有 $$\begin{equation}
  C^{k+1}=\frac{\varrho Q^kC^k+f(x^{k+1})}{Q^{k+1}}
  <\frac{(\varrho Q^k+1)C^k}{Q^{k+1}}=C^k,
\end{equation}$$ 因此 $$\lbraceC^k\rbrace$$ 单调下降且有极限 $$\bar C\in\mathbb{R}\cup\lbrace-\infty\rbrace$$；利用 $$f(x^k)\to f(x^*)$$（$$k\in K$$，$$k\to\infty$$）可推断 $$\bar C\in\mathbb{R}$$（有 下界）．于是 $$\begin{align}
  \infty>C^0-\bar C&=\sum_{k=0}^\infty\bigl(C^k-C^{k+1}\bigr)\\
  &\ge\sum_{k=0}^\infty
  \frac{\rho t^k\left\Vert\mathop{\mathrm{grad}}f(x^k)\right\Vert_{x^k}^2}{Q^{k+1}}.
\end{align}$$ 由于 $$Q^{k+1}=1+\varrho Q^k=1+\varrho+\varrho^2Q^{k-1}=\dots
=\sum_{i=0}^k\varrho^i<(1-\varrho)^{-1}$$，由此推出 $$\lbracet^k\left\Vert\mathop{\mathrm{grad}}f(x^k)\right\Vert_{x^k}^2\rbrace\to0$$．

反证：假设 $$\left\Vert\mathop{\mathrm{grad}}f(x^*)\right\Vert\ne0$$．这种情况下 $$\lbracet^k\rbrace_{k\in K}\to0$$．由算法 19 可知，步长 $$\delta^{-1}t^k$$ 不满足 (7.201)，即对 足够大的 $$k\in K$$ 成立 $$\begin{equation}
  -\rho\,\delta^{-1}t^k\left\Vert\mathop{\mathrm{grad}}f(x^k)\right\Vert_{x^k}^2
  <f\bigl(R_{x^k}(\delta^{-1}t^k\eta^k)\bigr)-C^k
  \le f\bigl(R_{x^k}(\delta^{-1}t^k\eta^k)\bigr)-f(x^k).
\end{equation}$$ 定义单位化量 $$\tilde\eta^k=\eta^k/\left\Vert\eta^k\right\Vert$$， $$\tilde t^k=t^k\left\Vert\eta^k\right\Vert/\delta$$，根据 (7.230) 有（记 $$\hat f_x=f\circ R_x$$） $$\begin{equation}
  \frac{\hat f_{x^k}(0)-\hat f_{x^k}(\tilde t^k\tilde\eta^k)}{\tilde t^k}
  <-\rho\left\langle \mathop{\mathrm{grad}}f(x^k),\,\ \tilde\eta^k\right\rangle_{x^k},
  \qquad \forall k\in K,\ k>\underline{k},
\end{equation}$$ 其中 $$\underline{k}$$ 为足够大的常数．由中值定理得 $$\begin{equation}
  -D\hat f_{x^k}(t\tilde\eta^k)[\tilde\eta^k]
  <-\rho\left\langle \mathop{\mathrm{grad}}f(x^k),\,\ \tilde\eta^k\right\rangle_{x^k},
  \qquad \forall k\in K,\ k>\underline{k}.
\end{equation}$$ 由于序列 $$\lbrace\eta^k\rbrace_{k\in K}$$ 有界，$$\lbrace\tilde t^k\rbrace_{k\in K}\to0$$；又 $$\tilde\eta^k$$ 模长为 $$1$$，属于紧集，故存在子列指标 $$\tilde K\subset K$$ 使 $$\lbrace\tilde\eta^k\rbrace_{k\in\tilde K}\to\tilde\eta^*$$ 且 $$\left\Vert\tilde\eta^*\right\Vert=1$$．对 (7.232) 在指标集 $$\tilde K$$ 上取极限： $$\begin{equation}
  -\left\langle \mathop{\mathrm{grad}}f(x^*),\,\ \tilde\eta^*\right\rangle_{x^*}
  \le-\rho\left\langle \mathop{\mathrm{grad}}f(x^*),\,\ \tilde\eta^*\right\rangle_{x^*}.
\end{equation}$$ 由于 $$\rho<1$$，得 $$\left\langle \mathop{\mathrm{grad}}f(x^*),\,\ \tilde\eta^*\right\rangle_{x^*}\ge0$$；另一方面 根据 $$\lbrace\eta^k\rbrace$$ 的定义（负梯度方向），可以得到 $$\left\langle \mathop{\mathrm{grad}}f(x^*),\,\ \tilde\eta^*\right\rangle_{x^*}<0$$，二者矛盾，证毕．

##### 2. 二阶算法的收敛性

为得到全局收敛性，流形上二阶算法需要如下假设：

假设 A：水平集与海瑟矩阵有界**（假设 A：水平集与海瑟矩阵有界）**  

1.  函数 $$f$$ 连续可微，且在水平集 $$\lbracex\in\mathcal{M}: f(x)\le f(x^0)\rbrace$$ 上有界；

2.  存在常数 $$\beta_{\mathop{\mathrm{Hess}}}>0$$ 使得 $$\left\Vert\mathop{\mathrm{Hess}}f(x^k)\right\Vert\le\beta_{\mathop{\mathrm{Hess}}},\ \forall k=0,1,2,\dots$$ （海瑟算子一致有界）．

假设 B：利普希茨型连续性**（假设 B：利普希茨型连续性）**   存在常数 $$\beta_{RL}>0$$ 与 $$\delta_{RL}>0$$，使得对所有 $$x\in\mathcal{M}$$ 与 $$\xi\in T_x\mathcal{M}$$（$$\left\Vert\xi\right\Vert=1$$）， $$\begin{equation}
  \Bigl\vert\frac{\mathrm{d}}{\mathrm{d}t}f\circ R_x(t\xi)\big\vert_{t=\tau}
  -\frac{\mathrm{d}}{\mathrm{d}t}f\circ R_x(t\xi)\big\vert_{t=0}\Bigr\vert
  \le\tau\beta_{RL},\qquad \forall\tau\le\delta_{RL}.
\end{equation}$$

<div class="theorem">

**定理 7.17** 令 $$\lbracex^k\rbrace$$ 为算法 20 得到的序列．如果假设 假设 A 与假设 B 成立，且 $$\xi^k$$ 满足柯西下降量条件 (7.208)，则 $$\begin{equation}
  \liminf_{k\to\infty}\left\Vert\mathop{\mathrm{grad}}f(x^k)\right\Vert=0.
\end{equation}$$

</div>

**Proof** 证明思路**（证明思路）** 根据 $$\rho^k$$ 的定义 $$\begin{equation}
  \left\vert\rho^k-1\right\vert=\Bigl\vert
  \frac{m^k(\xi^k)-f\bigl(R_{x^k}(\xi^k)\bigr)}{m^k(0)-m^k(\xi^k)}\Bigr\vert.
\end{equation}$$ 再根据流形上的泰勒展式，可得不等式 $$\begin{equation}
  f\bigl(R_{x^k}(\xi^k)\bigr)\le f(x^k)
  +\left\langle \mathop{\mathrm{grad}}f(x^k),\,\ \xi^k\right\rangle_{x^k}+\epsilon',
  \qquad \left\vert\epsilon'\right\vert=\frac12\beta_{RL}\left\Vert\xi^k\right\Vert^2
  \ \ (\left\Vert\xi^k\right\Vert<\delta_{RL}),
\end{equation}$$ 因此由 $$m^k$$ 的定义有 $$\begin{equation}
  \left\vert m^k(\xi^k)-f\bigl(R_{x^k}(\xi^k)\bigr)\right\vert
  =\Bigl\vert\frac12\left\langle H^k\xi^k,\,\ \xi^k\right\rangle-\epsilon'\Bigr\vert
  \le\frac12\beta\left\Vert\xi^k\right\Vert^2+\frac12\beta_{RL}\left\Vert\xi^k\right\Vert^2
  \le\beta'\left\Vert\xi^k\right\Vert^2,
\end{equation}$$ 其中 $$\beta'=\max(\beta,\beta_{RL})$$．反证：假设结论不成立，则存在 $$\epsilon>0$$ 与 $$K$$ 使 $$\left\Vert\mathop{\mathrm{grad}}f(x^k)\right\Vert\ge\epsilon\ \forall k\ge K$$． 利用柯西下降条件 (7.208)： $$\begin{equation}
  m^k_{x^k}(0)-m^k_{x^k}(\xi^k)\ge c_1\epsilon
  \min\Bigl(\Delta^k,\ \frac{\epsilon}{\beta'}\Bigr).
\end{equation}$$ 将 (7.239) 与 $$\rho^k$$ 的定义代入 (7.238) 得 $$\begin{equation}
  \left\vert\rho^k-1\right\vert\le\frac{\beta'\left\Vert\xi^k\right\Vert^2}
  {c_1\epsilon\min(\Delta^k,\epsilon/\beta')}
  \le\frac{\beta'(\Delta^k)^2}
  {c_1\epsilon\min(\Delta^k,\epsilon/\beta')},\qquad
  \left\Vert\xi^k\right\Vert<\delta_{RL}.
\end{equation}$$ 令 $$\hat\Delta\coloneqq\min\bigl(\frac{c_1\epsilon}{2\beta'},\
\frac{\epsilon}{\beta'},\ \delta_{RL}\bigr)$$：若 $$\Delta^k\le\hat\Delta$$， 则 $$\min(\Delta^k,\epsilon/\beta')=\Delta^k$$ 且 $$\left\vert\rho^k-1\right\vert\le\frac{\beta'\hat\Delta\Delta^k}
{c_1\epsilon\Delta^k}\cdot\frac{1}{1}\le\frac12$$，故 $$\rho^k\ge\frac12>\frac14$$．结合 $$\Delta^k$$ 的更新规则： $$\Delta^k$$ 减少当且仅当 $$\Delta^k>\hat\Delta$$，因此 $$\begin{equation}
  \Delta^k\ge\min\Bigl(\Delta^K,\ \frac{\hat\Delta}{4}\Bigr),
  \qquad \forall k\ge K.
\end{equation}$$ 另一方面，若有穷步后总有 $$\rho^k\ge\rho'>0$$，则对 $$k$$ 充分大 $$\begin{equation}
  f(x^k)-f(x^{k+1})\ge\rho'\bigl(m^k_{x^k}(0)-m^k_{x^k}(\xi^k)\bigr)
  \ge\rho'c_1\epsilon\min\Bigl(\Delta^k,\ \frac{\epsilon}{\beta'}\Bigr)>0,
\end{equation}$$ 由于 $$f$$ 在含迭代点的水平集上有下界，可得 $$\lim_{k\to\infty}\Delta^k=0$$， 这与 (7.241) 矛盾；故必有 $$\rho^k<\frac14$$ 最终出现， 同样导出 $$\lim_k\Delta^k=0$$，仍与 (7.241) 矛盾． 反设不正确，结论成立．

<div class="definition">

**定义 7.22** 流形 $$\mathcal{M}$$ 的**单射半径**定义为 $$\begin{equation}
  \mathrm{i}(\mathcal{M})\coloneqq\inf_{x\in\mathcal{M}}\ \mathrm{i}_x,
  \qquad
  \mathrm{i}_x\coloneqq\sup\bigl\lbrace\varepsilon>0:\
  \mathop{\mathrm{Exp}}_x\bigr\vert_{B_\varepsilon(0_x)}\ \text{为一个微分同胚}\bigr\rbrace,
\end{equation}$$ 其中 $$\mathop{\mathrm{Exp}}_x$$ 为定义在 $$x$$ 处的指数映射，$$B_\varepsilon(0_x)$$ 为 $$T_x\mathcal{M}$$ 中半径 $$\varepsilon$$ 的球．

</div>

假设 C：单射半径与收缩性质**（假设 C：单射半径与收缩性质）**  

1.  流形 $$(\mathcal{M},g)$$ 具有正的单射半径，且存在常数 $$\beta_1$$ 使得 $$\left\Vert\mathcal{P}_{1\leftarrow\alpha}^{\,0}\mathop{\mathrm{grad}}f(y)
            -\mathop{\mathrm{grad}}f(x)\right\Vert\le\beta_1\mathop{\mathrm{dist}}(y,x)$$， 其中 $$\alpha$$ 为满足 $$\alpha(0)=x,\ \alpha(1)=y$$ 的唯一测地线， $$\mathcal{P}_{1\leftarrow\alpha}^{0}$$ 为沿测地线的向量平行移动；

2.  存在常数 $$\mu>0$$ 与 $$\delta_\mu>0$$ 使得 $$\begin{equation}
              \left\Vert\xi\right\Vert\ge\mu\,\mathop{\mathrm{dist}}\bigl(x,\ R_x\xi\bigr),
              \qquad \forall x\in\mathcal{M},\
              \forall\xi\in T_x\mathcal{M},\ \left\Vert\xi\right\Vert\le\delta_\mu
    \end{equation}$$ （收缩映射不\"过度缩短\"位移）．

<div class="theorem">

**定理 7.18** 令 $$\lbracex^k\rbrace$$ 为算法 20 得到的序列，其中 $$\rho'\in(0,\frac14)$$．如果假设 A、假设 B 与假设 C 均满足，且 $$\xi^k$$ 满足柯西下降量 (7.208)，则 $$\begin{equation}
  \lim_{k\to\infty}\left\Vert\mathop{\mathrm{grad}}f(x^k)\right\Vert=0.
\end{equation}$$

</div>

**Proof** 证明思路**（证明思路）** 考虑任意满足 $$\mathop{\mathrm{grad}}f(x^K)\ne0$$ 的指标 $$K$$，定义 $$\begin{equation}
  \epsilon=\frac12\left\Vert\mathop{\mathrm{grad}}f(x^K)\right\Vert,\qquad
  r=\min\Bigl(\frac{\left\Vert\mathop{\mathrm{grad}}f(x^K)\right\Vert}{2\beta_1},\ \mathrm{i}(\mathcal{M})\Bigr).
\end{equation}$$ 由假设 C(a)，对任意 $$x$$ 与 $$x^K$$ 之间（测地 距离 $$\le r$$）的点有（利用平行移动的等距性与反三角不等式） $$\begin{equation}
  \left\Vert\mathop{\mathrm{grad}}f(x)\right\Vert\ge\left\Vert\mathop{\mathrm{grad}}f(x^K)\right\Vert
  -\beta_1\mathop{\mathrm{dist}}(x,x^K)\ge2\epsilon-\beta_1r\ge\epsilon,
\end{equation}$$ 即 $$B_r(x^K)$$ 内梯度范数一致下有界 $$\epsilon$$．若序列 $$\lbracex^k\rbrace_{k\ge K}$$ 始终位于 $$B_r(x^K)$$ 内，则与定理 7.17 矛盾，故序列最终离开该球．设 $$l\ge K$$ 且 $$x^{l+1}$$ 为 $$x^K$$ 后第一个离开 $$B_r(x^K)$$ 的点，则对 $$k=K,\dots,l$$ 有 $$\left\Vert\mathop{\mathrm{grad}}f(x^k)\right\Vert>\epsilon$$，累加目标下降量： $$\begin{equation}
  f(x^K)-f(x^{l+1})=\sum_{k=K}^{l}\bigl(f(x^k)-f(x^{k+1})\bigr)
  \ge\sum_{k\in\lbraceK,\dots,l\rbrace,\ x^k\ne x^{k+1}}
  \rho'c_1\epsilon\min\Bigl(\Delta^k,\ \frac{\epsilon}{\beta'}\Bigr).
\end{equation}$$ 分情况讨论（$$\Delta^k>\epsilon/\beta'$$ 至少一项成立，或对全部项 $$\Delta^k\le\epsilon/\beta'$$ 并结合 $$\left\Vert\xi^k\right\Vert\ge\mu\mathop{\mathrm{dist}}(x^k,x^{k+1})$$ 与假设 (b)），综合可得 $$\begin{equation}
  f(x^K)-f(x^{l+1})\ge\rho'c_1\epsilon
  \min\Bigl(\frac{\epsilon}{\beta'},\ \delta_\mu,\
  \frac{\epsilon\mu}{\beta_1},\ \mathrm{i}(\mathcal{M})\mu\Bigr).
\end{equation}$$ 又 $$\lbracef(x^k)\rbrace$$ 递减且有下界（$$f(x^k)\downarrow f^*>-\infty$$），故 $$\begin{equation}
  f(x^K)-f^*\ge\frac12\rho'c_1\left\Vert\mathop{\mathrm{grad}}f(x^K)\right\Vert
  \min\Bigl(\frac{\left\Vert\mathop{\mathrm{grad}}f(x^K)\right\Vert}{2\beta'},\ \delta_\mu,\
  \frac{\mu\left\Vert\mathop{\mathrm{grad}}f(x^K)\right\Vert}{2\beta_1},\ \mathrm{i}(\mathcal{M})\mu\Bigr).
\end{equation}$$ 令 $$K\to\infty$$，由 $$\mathrm{i}(\mathcal{M})>0$$、$$\delta_\mu>0$$、 $$\mu>0$$ 与右端含 $$\left\Vert\mathop{\mathrm{grad}}f(x^K)\right\Vert$$ 的二次项结构，得 $$\left\Vert\mathop{\mathrm{grad}}f(x^K)\right\Vert\to0$$，即结论成立．

## 本章总结

### 内容提要

本章围绕**约束优化问题**介绍了四类算法，核心思想各不相同、 层层递进：

- **二次罚函数法**（§7.1）：把约束违反度 $$\frac{\sigma}{2}
          \left\Vert c(x)\right\Vert^2$$ 加进目标，将约束问题化为*无约束*问题序列； 全局收敛（定理 7.1）与 KKT 收敛 （定理 7.2，乘子估计 $$-\sigma^kc_i(x^{k+1})\to\lambda_i^*$$）都要求 $$\sigma^k\to\infty$$；由海瑟矩阵条件数 $$\nabla^2P\approx\nabla^2L+\sigma\nabla c\nabla c^\top$$ 的爆炸 引出数值困难------罚因子不能真正趋于无穷．一般约束用 $$\max\lbracec_i,0\rbrace^2$$ 惩罚；应用：LASSO 与矩阵补全的*连续化* （$$\mu=1/\sigma$$ 单调递减）；扩展：内点*对数*罚函数 （$$\sigma\to0$$，迭代点保持在可行域内部，是 §7.3 内点法的 雏形）与 $$\ell_1$$*精确*罚函数（阈值 $$\sigma^*=\left\Vert\lambda^*\right\Vert_\infty$$，有限罚因子即精确）．

- **增广拉格朗日函数法**（§7.2）：$$L_\sigma=L+$$二次罚项， 关键更新 $$\lambda^{k+1}=\lambda^k+\sigma^kc(x^{k+1})$$ 把 \"无穷罚因子\"换成\"乘子信息\"：约束违反度从 $$O(1/\sigma^k)$$ 降为 $$o(1/\sigma^k)$$，且增广拉格朗日函数在 LICQ $$+$$ 二阶充分条件 下是*精确罚函数*（定理 7.4）；一般 约束用松弛变量 $$+$$ 消元（$$s^i=\max\lbrace-\mu_i/\sigma-c_i,0\rbrace$$， 消元后自动光滑，式 (7.70)）；凸问题有 完整的不精确收敛理论（Slater 下 $$\lambda^k$$ 收敛到对偶最优 解，定理 7.7）；*基追踪*展示了 固定罚因子的收敛性与**有限终止性** （定理 7.8），且与 Bregman 迭代 **等价**（$$g^k=-A^\top\lambda^k$$）；半定规划在 $$m$$ 较小时宜解对偶（消去 $$S$$ 后是 $$\mathbb{R}^m$$ 上光滑无约束问题）．

- **线性规划内点法**（§7.3）：原始--对偶框架，严格保持 原始/对偶可行与 $$x,s>0$$，让互补 $$x_is_i=\sigma\mu$$ 扰动式 一致下降；每步解 $$3\times3$$ 分块线性系统 (7.139)（系数矩阵 $$AL_s^{-1}L_xA^\top$$ 对称正定，$$A$$ 行满秩时），回退线搜索 保持内点；*中心路径*把对数罚函数（$$\tau$$ 罚因子的 $$c^\top x-\tau\sum\ln x_i$$）几何化，路径追踪算法在邻域 $$\mathcal{N}_{-\infty}(\gamma)$$ 内取最大步长，对偶间隙 $$\mu^k\le(1-c/n)\mu^k$$ 指数下降，迭代复杂度 $$O(n\ln\frac1\varepsilon)$$------多项式时间．

- **流形约束优化**（§7.4）：把约束视为迭代空间，在 *切空间*中重建微积分：黎曼梯度 $$\mathop{\mathrm{grad}}f$$ 是欧氏梯度到 切空间的投影、黎曼海瑟 $$\mathop{\mathrm{Hess}}f=\tilde\nabla\,\mathop{\mathrm{grad}}f$$ （Levi-Civita 联络唯一）；典型流形（球面、Stiefel、斜流形、 秩固定、正定矩阵、Grassmann）的切空间/投影/梯度/海瑟均有 显式公式（核心工具：定义函数 $$h$$，$$T_x\mathcal{M}=\ker Dh$$）； 最优性条件与欧氏情形完全平行（流形上 KKT、临界锥、二阶 条件）；用*收缩算子*（指数映射、凯莱变换、极分解、 QR）替代线性更新 $$x+t\eta$$；一阶 RGBB（BB 步长 $$+$$ 非单调 Armijo，聚点为驻点）、二阶 RTR（切空间信赖域 $$+$$ 截断 CG， $$\liminf$$ 收敛；加单射半径等假设后全序列收敛）与自适应 正则化牛顿法；应用：最大割 SDP 的斜流形再形式化、KS 能量 极小化（特征值问题的流形观点）．

### 延伸阅读

相较于罚函数法，增广拉格朗日函数法具有更好的理论性质（尤其是对凸优化 问题），可进一步参考 Rockafellar 的经典系列工作（讲义所引 \[184\]）； 增广拉格朗日函数法的困难之一是决策变量（子问题）的更新，除了利用半 光滑性质，还可以利用**交替方向乘子法**（ADMM，第八章详细介绍） 给出一种有效更新方式．除本节介绍的流形优化算法外，黎曼拟牛顿法、黎曼 共轭梯度法、随机黎曼梯度类方法、自然梯度法和求解非光滑问题的黎曼邻近 点梯度类方法等也有大量研究．单纯形法、内点法及其变形可有效解决很多 线性规划问题；内点法也是中小规模半定规划的主要算法，大规模半定规划 则更多依赖基于增广拉格朗日函数的算法；一般约束优化问题的内点法可参考 Nocedal & Wright 第 19 章．本章罚函数法、一般问题的增广拉格朗日函数 法与线性规划内点法的编写参考了 Nocedal & Wright，凸优化与基追踪问题 的增广拉格朗日函数法参考了 Rockafellar、Boyd 等人的文献，流形优化 部分参考了 Absil--Mahony--Sepulchre《Optimization Algorithms on Matrix Manifolds》与 Boumal《An Introduction to Optimization on Smooth Manifolds》．
