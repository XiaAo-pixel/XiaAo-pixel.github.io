---
layout: note
kind: note
title: "第 10 章　附录：次梯度"
course: optimization
order: 10
date: 2026-10-07
---

# 次梯度

## 附录前置知识

<div class="prereq">

本附录是第三章「凸函数」的延伸，把讲义第二章 §2.7 的内容按定义、性质、方向导数、 计算规则四条线索重新整理。下面列出本附录反复使用的第三章结论（编号沿用讲义）。

1.  **凸集与凸函数**：$$C$$ 为凸集指对任意 $$x,y\in C$$ 与 $$\theta\in[0,1]$$ 有 $$\theta x+(1-\theta)y\in C$$；$$f$$ 为凸函数指 $$\operatorname{dom}f$$ 为凸集且 $$f(\theta x+(1-\theta)y)\le\theta f(x)+(1-\theta)f(y)$$。等价的集合刻画： $$f$$ 凸 $$\iff$$ 上方图 $$\operatorname{epi}f$$ 为凸集。

2.  **广义实值函数、适当函数**（定义2.6、2.7）：$$f:\mathbb{R}^n\to\mathbb{R}\cup\lbrace\pm\infty\rbrace$$； $$\operatorname{dom}f=\lbracex\mid f(x)<+\infty\rbrace$$；适当（proper）指 $$\operatorname{dom}f\ne\varnothing$$ 且 $$f(x)>-\infty$$ 处处成立。本附录默认所讨论的函数均为适当函数。

3.  **下水平集与上方图**（定义2.8、2.9）： $$C_\alpha=\lbracex\mid f(x)\le\alpha\rbrace$$，$$\operatorname{epi}f=\lbrace(x,t)\in\mathbb{R}^{n+1}\mid f(x)\le t\rbrace$$。

4.  **闭函数与下半连续函数**（定义2.10、2.11，定理2.2）：$$\operatorname{epi}f$$ 为闭集 $$\iff$$ $$f$$ 下半连续 $$\iff$$ $$\liminf_{y\to x}f(y)\ge f(x)$$ 对一切 $$x$$ 成立； 凸函数 $$+$$ 下半连续 $$=$$ 闭凸函数。

5.  **分离超平面定理**（定理2.5）：不相交的两个凸集可被一张超平面（非严格地） 分离，即存在非零向量 $$a$$ 与实数 $$b$$ 使 $$a^\top x\le b\ (\forall x\in C)$$、 $$a^\top x\ge b\ (\forall x\in D)$$；当 $$C$$ 闭凸、$$D=\lbracex_0\rbrace$$ 且 $$x_0\notin C$$ 时 可以严格分离（定理2.6）。

6.  **支撑超平面定理**（定义2.15、定理2.7）：凸集 $$C$$ 的任一边界点 $$x_0$$ 处存在 非零向量 $$a$$ 使 $$a^\top x\le a^\top x_0\ (\forall x\in C)$$，称超平面 $$\lbracex\mid a^\top x=a^\top x_0\rbrace$$ 为 $$C$$ 在 $$x_0$$ 处的支撑超平面。这是本附录 「次梯度存在性」证明的唯一几何工具。

7.  **可微凸函数的一阶条件**（定理2.9）：$$f$$ 可微且凸 $$\iff$$ $$f(y)\ge f(x)+\nabla f(x)^\top(y-x)$$，$$\forall x,y\in\operatorname{dom}f$$。 次梯度的定义正是把该不等式中的 $$\nabla f(x)$$ 抽象为任意向量 $$g$$。

8.  **梯度单调性**（定理2.10）：$$f$$ 可微凸 $$\iff$$ $$\nabla f$$ 为单调映射，即 $$(\nabla f(x)-\nabla f(y))^\top(x-y)\ge0$$。次梯度的单调性（§A.2）是它的推广。

9.  **保凸运算**（定理2.13）：非负加权和；与仿射映射复合 $$x\mapsto f(Ax+b)$$； 逐点取最大值 $$\max_i f_i$$ 与逐点上确界 $$\sup_{y\in A}f(x,y)$$； 对部分变量取下确界 $$\inf_{y\in C}f(x,y)$$（$$C$$ 为凸集）； 透视函数 $$(x,t)\mapsto tf(x/t)$$（$$t>0$$）；若 $$g$$ 凸、$$h$$ 凸且单调不减，则 $$h\circ g$$ 凸。 这些结论保证了本附录中出现的函数（如上确界函数、方向导数、距离函数）的凸性。

10. **共轭函数与二次共轭**（定义2.19、2.20，定理2.15）： $$f^*(y)=\sup_{x\in\operatorname{dom}f}\lbracey^\top x-f(x)\rbrace$$ 恒为闭凸函数； $$f^{**}(x)=\sup_{y\in\operatorname{dom}f^*}\lbracex^\top y-f^*(y)\rbrace\le f(x)$$，且 $$f$$ 闭凸时 $$f^{**}=f$$。

11. **Fenchel 不等式**（命题2.5）：$$f(x)+f^*(y)\ge x^\top y$$ 对一切 $$x,y$$ 成立。 本附录 §A.4 将指出：$$g\in\partial f(x)$$ 恰好是它取等号的情形。

12. **范数的共轭**（例2.14）：$$\left\Vert\cdot\right\Vert$$ 的共轭函数是对偶范数单位球的指示函数 $$\left\Vert y\right\Vert_*\le1$$。

13. **相对内部**：$$\operatorname{ri}C$$ 为 $$C$$ 在仿射包 $$\operatorname{aff}C$$ 中的内点全体；$$\operatorname{int}C\subseteq\operatorname{ri}C$$， 且非空凸集的相对内部非空。次梯度存在性对 $$\operatorname{ri}\operatorname{dom}f$$ 成立（比内点条件更弱）。

14. **投影与变分不等式**：$$C$$ 非空闭凸时 $$P_C(x)=\operatorname*{arg\,min}_{y\in C}\left\Vert x-y\right\Vert_2$$ 唯一， 且 $$(x-P_C(x))^\top(y-P_C(x))\le0$$，$$\forall y\in C$$；等价地 $$x-P_C(x)\in N_C(P_C(x))$$（法锥，见 §A.4）。

</div>

## 附录知识框架

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

本附录的逻辑主线是「一个定义、两类性质、一条公式、一套规则」。§A.1 用可微凸函数的一阶 条件抽象出次梯度与次微分的定义，并说明其几何含义是上方图的支撑超平面；§A.2 说明次微分 $$\partial f(x)$$ 作为集合的性质（闭凸、内点处非空有界）以及它给出的最优性条件 $$0\in\partial f(x)$$；§A.3 讨论凸函数的方向导数，得到本附录的核心公式 $$f'(x;d)=\max_{g\in\partial f(x)}g^\top d$$，它把「集合 $$\partial f(x)$$」与「函数 $$f'(x;\cdot)$$」对应起来；§A.4 给出系统的计算规则与大量例子，使读者能够对常见的 不可微凸函数直接写出次微分，并指出 $$g\in\partial f(x)$$ 与共轭函数 $$f^*$$ 的 Fenchel--Young 等号条件、$$\partial f$$ 与 $$\partial f^*$$ 互逆的对应关系。与第三章的联系可以概括成一句话： *$$\partial f(x)$$ 是上方图 $$\operatorname{epi}f$$ 在 $$(x,f(x))$$ 处的支撑超平面法向量（去掉规范化 因子）的集合，同时又是 $$x^\top g-f^*(g)$$ 的极大值点集合。*

## 次梯度的定义

第三章中，我们建立了可微凸函数的一阶最优性条件：若 $$f$$ 可微且凸，则 $$x^\star$$ 为 $$f$$ 的 全局极小点当且仅当 $$\nabla f(x^\star)=0$$（定理2.9 的直接推论）；更一般地，一阶条件 $$f(y)\ge f(x)+\nabla f(x)^\top(y-x)$$ 说明可微凸函数在任一点处的切平面都是它的全局下界。 然而最优化中大量重要的目标函数并不可微：$$\left\Vert x\right\Vert_1$$、$$\left\Vert x\right\Vert_2$$、$$\max_i x_i$$ 在原点 或「折点」处没有梯度，约束的指示函数 $$I_C$$ 更是处处不连续，此时「$$\nabla f(x)=0$$」这句话 本身没有意义，一阶最优性条件与依赖梯度的算法都需要重新表述。

次梯度（subgradient）的概念正是为弥补这一缺陷而引入的：我们不再要求「切平面」的斜率由 导数唯一确定，而只要求存在某个向量 $$g$$ 使得仿射函数 $$f(x)+g^\top(y-x)$$ 仍是 $$f$$ 的全局 下界。这样得到的向量 $$g$$ 就称为 $$f$$ 在 $$x$$ 处的一个次梯度，全体次梯度组成的集合 $$\partial f(x)$$ 称为次微分。凸函数的次微分在定义域的内点处总是非空的（定理A.2）， 于是「$$0$$ 是否属于次微分」就自然地接替了「梯度是否为零」，成为不可微凸函数的一阶最优性 条件。几何上，$$g\in\partial f(x)$$ 等价于说向量 $$(g,-1)$$ 是上方图 $$\operatorname{epi}f$$ 在点 $$(x,f(x))$$ 处某张支撑超平面的法向量------这正是第三章支撑超平面定理的直接应用，也是本附录 中一切存在性结论的来源。

<div class="definition">

设 $$f$$ 为适当凸函数，$$x\in\operatorname{dom}f$$。若向量 $$g\in\mathbb{R}^n$$ 满足 $$\begin{equation}
f(y)\ge f(x)+g^\top(y-x),\qquad \forall y\in\operatorname{dom}f,
\end{equation}$$ 则称 $$g$$ 为 $$f$$ 在点 $$x$$ 处的一个**次梯度**。称集合 $$\begin{equation}
\partial f(x)=\bigl\lbraceg\in\mathbb{R}^n\ \big\vert\ f(y)\ge f(x)+g^\top(y-x),\ \forall y\in\operatorname{dom}f\bigr\rbrace
\end{equation}$$ 为 $$f$$ 在点 $$x$$ 处的**次微分**。若 $$x\notin\operatorname{dom}f$$，规定 $$\partial f(x)=\varnothing$$。

</div>

**（）** 由定义立即可得两点约定。

1.  次梯度是对*适当*凸函数定义的。若 $$f$$ 不适当（例如某点取值为 $$-\infty$$）， 则对任意 $$g$$ 与任意 $$y$$，不等式都可能失效，$$\partial f(x)$$ 会退化为空集甚至整体 $$\mathbb{R}^n$$ 之外的对象，因此本附录始终假设 $$f$$ 适当。

2.  定义只要求不等式对 $$y\in\operatorname{dom}f$$ 成立。对 $$y\notin\operatorname{dom}f$$，$$f(y)=+\infty$$， 不等式自动成立，故 $$\operatorname{dom}f$$ 与全空间两种写法等价。

3.  若 $$g\in\partial f(x)$$，则仿射函数 $$l(y)=f(x)+g^\top(y-x)$$ 是凸函数且 $$l(y)\le f(y)$$ 处处成立，即 $$l$$ 是 $$f$$ 的一个*全局下界*。这正是可微情形的 「切平面在图像下方」在不可微情形的推广。特别地，$$f$$ 在 $$x$$ 处可以有多个次梯度， 此时过 $$(x,f(x))$$ 的支撑直线不再唯一（一维情形见图A.2）。

次梯度的定义方式（与凸函数一阶条件的形式完全一致）暗示它有很强的几何含义：它是上方图的 支撑超平面的法向量。下面的定理把这一点说清楚，它也解释了为什么「$$f$$ 在 $$x$$ 处的全体次 梯度」组成一个集合而不是单个向量。

<div class="theorem">

**定理 A.1** 设 $$f$$ 为适当凸函数，$$x\in\operatorname{dom}f$$，$$g\in\mathbb{R}^n$$。则 $$g\in\partial f(x)$$ 当且仅当对任意 $$(y,t)\in\operatorname{epi}f$$ 有 $$\begin{equation}
\left\langle (g,-1),\,(y,t)-(x,f(x))\right\rangle=g^\top(y-x)-\bigl(t-f(x)\bigr)\le0 .
\end{equation}$$ 换言之，超平面 $$\Bigl\lbrace(y,t)\in\mathbb{R}^{n+1}\ \Big\vert\ g^\top y-t=g^\top x-f(x)\Bigr\rbrace$$ 是 $$\operatorname{epi}f$$ 在点 $$(x,f(x))$$ 处的支撑超平面，其法向量为 $$(g,-1)$$（见图A.1）。

</div>

**Proof** **（）** **必要性.** 设 $$g\in\partial f(x)$$。任取 $$(y,t)\in\operatorname{epi}f$$，即 $$f(y)\le t$$。由次梯度 不等式 $$f(y)\ge f(x)+g^\top(y-x)$$，得 $$g^\top(y-x)-(t-f(x))\le g^\top(y-x)-\bigl(f(y)-f(x)\bigr)
=f(x)+g^\top(y-x)-f(y)\le0,$$ 即式(A.3)成立。

**充分性.** 设式(A.3)对一切 $$(y,t)\in\operatorname{epi}f$$ 成立。任取 $$y\in\operatorname{dom}f$$，则 $$(y,f(y))\in\operatorname{epi}f$$，代入式(A.3)得 $$g^\top(y-x)-(f(y)-f(x))\le0$$，即 $$f(y)\ge f(x)+g^\top(y-x)$$，故 $$g\in\partial f(x)$$。证毕。

**图 A.1**：次梯度的几何意义。$$g\in\partial f(x_0)$$ 时，直线 $$t=f(x_0)+g^\top(y-x_0)$$ 位于凸函数 图像下方（支撑直线），向量 $$(g,-1)$$ 是上方图 $$\operatorname{epi}f$$ 在 $$(x_0,f(x_0))$$ 处支撑超平面的法向量。 上方图整体位于该超平面的下半空间内，即式(A.3)。

**图 A.2**：折点处有无穷多个次梯度。$$f(x)=\max\lbrace0.5x+0.5,\,-0.5x+1.5\rbrace$$ 是两支直线的 上包络（$$x\le1$$ 取斜率 $$-0.5$$ 的左支，$$x\ge1$$ 取斜率 $$0.5$$ 的右支），在折点 $$x_2=1$$ 处不可微：一切斜率介于两条支撑直线（虚线）斜率之间的直线都支撑 $$\operatorname{epi}f$$， 故 $$\partial f(x_2)=[-0.5,0.5]$$；在光滑点 $$x_1=2.5$$ 处只有一个次梯度 $$\partial f(x_1)=\lbrace0.5\rbrace$$。

**（）** **次梯度存在吗？** 对一般凸函数，$$f$$ 未必在定义域的*每个*点处都有次梯度：若 $$x$$ 位于 $$\operatorname{dom}f$$ 的边界上， 则 $$\partial f(x)$$ 可能为空集。例如 $$f(x)=-\sqrt{x}$$（$$\operatorname{dom}f=[0,+\infty)$$）是闭凸函数， 在 $$x=0$$ 处若 $$g\in\partial f(0)$$，则须有 $$-\sqrt{y}\ge gy$$ 对一切 $$y\ge0$$ 成立，即 $$g\le-1/\sqrt{y}$$ 对一切 $$y>0$$ 成立，令 $$y\downarrow0$$ 得 $$g\le-\infty$$，矛盾。故 $$\partial f(0)=\varnothing$$。但若 $$x$$ 是定义域的*内点*（更一般地，相对内点）， 次梯度总是存在的，这就是下面的定理。

<div class="theorem">

**定理 A.2** 设 $$f$$ 为凸函数。若 $$x\in\operatorname{int}\operatorname{dom}f$$，则 $$\partial f(x)\ne\varnothing$$。

</div>

**Proof** **（）** 考虑上方图 $$\operatorname{epi}f$$。由于 $$f$$ 凸，$$\operatorname{epi}f$$ 为凸集；又 $$(x,f(x))\in\operatorname{epi}f$$，且对任意 $$\varepsilon>0$$ 有 $$(x,f(x)-\varepsilon)\notin\operatorname{epi}f$$，故 $$(x,f(x))$$ 是 $$\operatorname{epi}f$$ 的 边界点。根据支撑超平面定理（定理2.7），存在*非零*向量 $$(a,b)\in\mathbb{R}^{n+1}$$，使得 $$\begin{equation}
a^\top(y-x)+b\bigl(t-f(x)\bigr)\le0,\qquad \forall (y,t)\in\operatorname{epi}f .
\end{equation}$$

**第一步：证明 $$b\le0$$。** 取 $$y=x$$。对任意 $$t\ge f(x)$$ 有 $$(x,t)\in\operatorname{epi}f$$， 代入(A.4)得 $$b\,(t-f(x))\le0$$。由 $$t-f(x)$$ 可以任意大，必有 $$b\le0$$。

**第二步：证明 $$b\ne0$$。** 反设 $$b=0$$，则(A.4)化为 $$\begin{equation}
a^\top(y-x)\le0,\qquad \forall y\in\operatorname{dom}f .
\end{equation}$$ 若 $$a\ne0$$：由于 $$x$$ 是 $$\operatorname{dom}f$$ 的内点，存在 $$\varepsilon>0$$ 使得 $$y=x+\varepsilon a\in\operatorname{dom}f$$，代入(A.5)得 $$\varepsilon\left\Vert a\right\Vert_2^2\le0$$， 故 $$a=0$$，矛盾。若 $$a=0$$，则 $$(a,b)=(0,0)$$，与支撑超平面定理给出的法向量非零矛盾。 于是 $$b\ne0$$；结合第一步得 $$b<0$$。

**第三步：构造次梯度。** 令 $$g=-\dfrac{a}{b}$$。对任意 $$y\in\operatorname{dom}f$$，取 $$t=f(y)\ge f(x)$$，则 $$(y,f(y))\in\operatorname{epi}f$$，代入(A.4)得 $$a^\top(y-x)\le b\bigl(f(x)-f(y)\bigr)=-b\bigl(f(y)-f(x)\bigr).$$ 两边同除以 $$-b>0$$： $$g^\top(y-x)=\frac{a^\top(y-x)}{-b}\ge f(y)-f(x),$$ 即 $$f(y)\ge f(x)+g^\top(y-x)$$，故 $$g\in\partial f(x)$$，$$\partial f(x)\ne\varnothing$$。 证毕。

<div class="supp">

定理A.2的条件 $$x\in\operatorname{int}\operatorname{dom}f$$ 可以减弱为 $$x\in\operatorname{ri}\operatorname{dom}f$$： 只要 $$x$$ 是 $$\operatorname{dom}f$$ 的相对内点，$$\partial f(x)$$ 就非空。证明思路与上面完全平行， 只需把「支撑超平面定理」换成它在相对内部形式的版本，并在第一步中注意 $$b\le0$$ （当 $$\operatorname{dom}f$$ 的仿射包维数小于 $$n$$ 时，$$b=0$$ 的排除要用 $$\operatorname{ri}\operatorname{dom}f$$ 的邻域结构 代替内点邻域）。这一加强在推导 §A.4 的仿射复合规则时会用到。

</div>

<div class="proposition">

**命题 A.1** 设 $$h$$ 为适当凹函数（即 $$-h$$ 为适当凸函数），$$x\in\operatorname{dom}h$$。定义 $$\partial h(x):=-\partial(-h)(x)=\bigl\lbraceg\mid -g\in\partial(-h)(x)\bigr\rbrace.$$ 则 $$g\in\partial h(x)$$ 当且仅当 $$\begin{equation}
h(y)\le h(x)+g^\top(y-x),\qquad \forall y\in\operatorname{dom}h ,
\end{equation}$$ 即 $$g$$ 给出的是 $$h$$ 的*全局上界*（有时称 $$g$$ 为 $$h$$ 在 $$x$$ 处的超梯度）。

</div>

**Proof** **（）** 由定义，$$g\in\partial h(x)$$ $$\iff$$ $$-g\in\partial(-h)(x)$$ $$\iff$$ $$(-h)(y)\ge(-h)(x)+(-g)^\top(y-x)$$ 对一切 $$y\in\operatorname{dom}h$$ 成立；两边同乘 $$-1$$ 即得 (A.6)。证毕。

**（）** 式(A.6)与凸函数的次梯度不等式只差一个不等号方向。因此在读文献时 必须注意：说「$$g$$ 是 $$f$$ 的次梯度」时默认 $$f$$ 是凸函数；对凹函数，同样的集合描述的是 「上方支撑」而不是「下方支撑」。本附录从 §A.2 起只讨论凸函数。

<div class="example">

**例题 A.1** 设 $$f(x)=\left\Vert x\right\Vert_2$$，则 $$f$$ 在 $$x=0$$ 处不可微，且 $$\partial f(0)=\bigl\lbraceg\ \big\vert\ \left\Vert g\right\Vert_2\le1\bigr\rbrace,$$ 即 $$\ell_2$$ 范数在原点处的次微分是单位球（闭单位球）。

</div>

**Proof** **（）** **（1）$$\lbraceg:\left\Vert g\right\Vert_2\le1\rbrace\subseteq\partial f(0)$$。** 设 $$\left\Vert g\right\Vert_2\le1$$，由 Cauchy--Schwarz 不等式，对任意 $$x$$ 有 $$g^\top(x-0)\le\left\Vert g\right\Vert_2\left\Vert x\right\Vert_2\le\left\Vert x\right\Vert_2-0=f(x)-f(0),$$ 即 $$f(x)\ge f(0)+g^\top(x-0)$$，故 $$g\in\partial f(0)$$。

**（2）$$\left\Vert g\right\Vert_2>1$$ 时 $$g\notin\partial f(0)$$。** 取 $$x=g$$。若 $$g\in\partial f(0)$$，则须有 $$\left\Vert g\right\Vert_2=f(g)-f(0)\ge g^\top(g-0)=\left\Vert g\right\Vert_2^2>\left\Vert g\right\Vert_2,$$ 矛盾（这里用到 $$\left\Vert g\right\Vert_2>1>0$$）。综上 $$\partial f(0)=\lbraceg:\left\Vert g\right\Vert_2\le1\rbrace$$。证毕。

**（）** 例A.1是一般范数公式的特例：对任意范数 $$\left\Vert\cdot\right\Vert$$ 及其对偶范数 $$\left\Vert\cdot\right\Vert_*$$， $$\partial\left\Vert x\right\Vert=\bigl\lbraceg\ \big\vert\ \left\Vert g\right\Vert_*\le1,\ g^\top x=\left\Vert x\right\Vert\bigr\rbrace,$$ 当 $$x=0$$ 时右端退化为对偶范数单位球，正是例A.1的结果。该公式的证明依赖 次梯度与共轭函数的关系，见 §A.4 定理A.16。

## 次梯度的性质

§A.1 说明了 $$\partial f(x)$$ 的几何来源。本节讨论 $$\partial f(x)$$ 作为*集合*的性质 （闭性、凸性、有界性、单调性、图像闭性），以及由它给出的最优性条件 $$0\in\partial f(x)$$。这些性质正是次梯度算法（如 $$x^{k+1}=x^k-\alpha_k g^k$$， $$g^k\in\partial f(x^k)$$）收敛性分析的基础：算法中每一步只能任选一个次梯度， 因此必须知道次微分集合的结构，才能保证选出的方向可靠。

<div class="theorem">

**定理 A.3** 设 $$f$$ 为凸函数，则 $$\partial f(x)$$ 具有如下性质：

1.  对任何 $$x\in\operatorname{dom}f$$，$$\partial f(x)$$ 是闭凸集（可能为空集）；

2.  若 $$x\in\operatorname{int}\operatorname{dom}f$$，则 $$\partial f(x)$$ 是非空有界集。

</div>

**Proof** **（）** **（1）凸性.** 设 $$g_1,g_2\in\partial f(x)$$，$$\lambda\in(0,1)$$。由次梯度定义， $$\begin{align*}
f(y)&\ge f(x)+g_1^\top(y-x),\qquad \forall y\in\operatorname{dom}f,\\
f(y)&\ge f(x)+g_2^\top(y-x),\qquad \forall y\in\operatorname{dom}f .
\end{align*}$$ 将第一式的 $$\lambda$$ 倍与第二式的 $$(1-\lambda)$$ 倍相加，得 $$f(y)\ge f(x)+\bigl[\lambda g_1+(1-\lambda)g_2\bigr]^\top(y-x),\qquad \forall y\in\operatorname{dom}f,$$ 故 $$\lambda g_1+(1-\lambda)g_2\in\partial f(x)$$，即 $$\partial f(x)$$ 为凸集。

**（1）闭性.** 设 $$g^k\in\partial f(x)$$ 且 $$g^k\to g$$。对任意 $$y\in\operatorname{dom}f$$， $$f(y)\ge f(x)+(g^k)^\top(y-x).$$ 在上式中令 $$k\to\infty$$，由极限的保号性（左端与 $$k$$ 无关）得 $$f(y)\ge f(x)+g^\top(y-x)$$，故 $$g\in\partial f(x)$$，即 $$\partial f(x)$$ 为闭集。

**（2）非空性**是定理A.2的直接推论（$$x\in\operatorname{int}\operatorname{dom}f$$）。

**（2）有界性.** 对 $$i=1,2,\dots,n$$，记 $$e_i=(0,\dots,1,\dots,0)$$（第 $$i$$ 个分量为 $$1$$， 其余为 $$0$$），则 $$\lbracee_i\rbrace_{i=1}^n$$ 是 $$\mathbb{R}^n$$ 的一组标准正交基。由于 $$x$$ 为 $$\operatorname{dom}f$$ 的内点， 存在充分小的 $$r>0$$ 使得有限点集 $$B=\lbracex\pm re_i,\ i=1,2,\dots,n\rbrace\subseteq\operatorname{dom}f .$$ 任取 $$g\in\partial f(x)$$，不妨设 $$g\ne0$$。取指标 $$j$$ 使 $$\vert g_j\vert=\left\Vert g\right\Vert_\infty>0$$，并令 $$y=x+r\,\operatorname{sgn}(g_j)\,e_j\in B$$，则 $$f(y)\ge f(x)+g^\top(y-x)=f(x)+r\,\operatorname{sgn}(g_j)\,g_j=f(x)+r\left\Vert g\right\Vert_\infty .$$ 于是 $$\left\Vert g\right\Vert_\infty\le\frac{f(y)-f(x)}{r}\le\frac{\max_{y\in B}f(y)-f(x)}{r}<+\infty,$$ 即 $$\partial f(x)$$ 有界（这里用到 $$B$$ 为有限集，故 $$\max_{y\in B}f(y)$$ 有限）。证毕。

**（）** **有界性不能去掉内点条件** 设 $$f(x)=x^2$$（$$x\ge0$$），$$f(x)=+\infty$$（$$x<0$$），它是闭凸适当函数。在边界点 $$x=0$$ 处， $$g\in\partial f(0)\iff y^2\ge gy,\ \forall y\ge0\iff g\le\inf_{y>0}y=0,$$ 即 $$\partial f(0)=(-\infty,0]$$ 是一个无界闭凸集（其中 $$0$$ 仍是全局极小点对应的最优性 乘子）。可见定理A.3(2) 中的有界性确实依赖 $$x\in\operatorname{int}\operatorname{dom}f$$。

当凸函数在某点可微时，该点处次微分退化为单点集，即梯度是唯一的次梯度。

<div class="proposition">

**命题 A.2** 设 $$f$$ 为凸函数且在 $$x_0\in\operatorname{int}\operatorname{dom}f$$ 处可微，则 $$\partial f(x_0)=\lbrace\nabla f(x_0)\rbrace.$$

</div>

**Proof** **（）** **第一步：$$\nabla f(x_0)\in\partial f(x_0)$$。** 由可微凸函数的一阶条件（定理2.9）， $$f(y)\ge f(x_0)+\nabla f(x_0)^\top(y-x_0)$$ 对一切 $$y\in\operatorname{dom}f$$ 成立，故 $$\nabla f(x_0)$$ 是次梯度。

**第二步：唯一性。** 设 $$g\in\partial f(x_0)$$。对任意非零 $$v\in\mathbb{R}^n$$ 与充分小的 $$t>0$$（使 $$x_0+tv\in\operatorname{dom}f$$），由次梯度定义 $$f(x_0+tv)\ge f(x_0)+t\,g^\top v .$$ 若 $$g\ne\nabla f(x_0)$$，取 $$v=g-\nabla f(x_0)\ne0$$，将上式移项并整理得 $$\frac{f(x_0+tv)-f(x_0)-t\,\nabla f(x_0)^\top v}{t\left\Vert v\right\Vert}
\ge\frac{(g-\nabla f(x_0))^\top v}{\left\Vert v\right\Vert}=\left\Vert v\right\Vert>0 .$$ 另一方面，由 $$f$$ 在 $$x_0$$ 处（Fréchet）可微， $$f(x_0+tv)-f(x_0)-t\nabla f(x_0)^\top v=o(t\left\Vert v\right\Vert)$$，故当 $$t\to0^+$$ 时左端趋于 $$0$$，与右端恒为正常数 $$\left\Vert v\right\Vert$$ 矛盾。因此 $$g=\nabla f(x_0)$$，即 $$\partial f(x_0)=\lbrace\nabla f(x_0)\rbrace$$。证毕。

下面是最重要的性质：不可微凸函数的一阶最优性条件。它把「$$0$$ 属于次微分」与「全局极小」 完全等同起来，从而在不可微情形下完美地替代了可微情形的 $$\nabla f(x)=0$$。

<div class="theorem">

**定理 A.4** 设 $$f$$ 为适当凸函数，$$x^\star\in\operatorname{dom}f$$。则 $$0\in\partial f(x^\star)\iff x^\star\ \text{是}\ f\ \text{的全局极小点，即}\
f(y)\ge f(x^\star),\ \forall y\in\operatorname{dom}f .$$

</div>

**Proof** **（）** **（$$\Longleftarrow$$）** 设 $$x^\star$$ 为全局极小点。对任意 $$y\in\operatorname{dom}f$$， $$f(y)\ge f(x^\star)=f(x^\star)+0^\top(y-x^\star)$$，这正是 $$g=0$$ 满足次梯度不等式， 故 $$0\in\partial f(x^\star)$$。

**（$$\Longrightarrow$$）** 设 $$0\in\partial f(x^\star)$$。由次梯度定义，对任意 $$y\in\operatorname{dom}f$$， $$f(y)\ge f(x^\star)+0^\top(y-x^\star)=f(x^\star);$$ 而对 $$y\notin\operatorname{dom}f$$ 有 $$f(y)=+\infty\ge f(x^\star)$$。故 $$x^\star$$ 是全局极小点。证毕。

**图 A.3**：一阶最优性条件的几何含义：$$0\in\partial f(x^\star)$$ 意味着水平直线 $$t=f(x^\star)$$ 是 $$\operatorname{epi}f$$ 在 $$(x^\star,f(x^\star))$$ 处的支撑直线，即函数图像处处不低于 过极小点的水平线（图中该直线恰好与函数在折点相切）。

**（）**

1.  定理A.4对*不可微*函数同样成立，这正是次梯度的主要用途。 例如 $$f(x)=\left\vert x\right\vert$$ 在 $$x^\star=0$$ 处 $$\partial f(0)=[-1,1]\ni0$$，故 $$0$$ 是全局极小点 （几何含义见图A.3）。

2.  与可微情形对照：若 $$f$$ 可微，由命题A.2， $$0\in\partial f(x^\star)\iff\nabla f(x^\star)=0$$，定理A.4退化为 经典的一阶必要条件；反之，对*非凸*可微函数，$$\nabla f(x)=0$$ 只是驻点条件， 不再是全局最优的充分条件。可见定理A.4的「双向成立」完全依赖凸性。

3.  对凸的*非适当*函数（例如 $$f\equiv-\infty$$），定理不成立，故**适当性** 假设不可省略。

<div class="theorem">

**定理 A.5** 设 $$f:\mathbb{R}^n\to\mathbb{R}\cup\lbrace+\infty\rbrace$$ 为凸函数，$$x,y\in\operatorname{dom}f$$，$$u\in\partial f(x)$$， $$v\in\partial f(y)$$，则 $$(u-v)^\top(x-y)\ge0 .$$ 即次微分映射 $$\partial f$$ 是单调算子。

</div>

**Proof** **（）** 由次梯度定义， $$f(y)\ge f(x)+u^\top(y-x),\qquad f(x)\ge f(y)+v^\top(x-y).$$ 两式相加得 $$0\ge u^\top(y-x)+v^\top(x-y)=(u-v)^\top(y-x)$$，即 $$(u-v)^\top(x-y)\ge0$$。证毕。

**（）** 对可微凸函数，定理A.5即梯度单调性（定理2.10）。次梯度的单调性在 次梯度法、近似点梯度法的收敛性分析中起关键作用：它保证 $$\left\Vert x^{k+1}-x^\star\right\Vert^2$$ 这类「距离函数」在迭代中不增（在合适步长下单调下降）。

对于闭凸函数，次微分映射还具有某种连续性（图像闭性）。

<div class="theorem">

**定理 A.6** 设 $$f$$ 为闭凸函数，且 $$\partial f$$ 在点 $$\bar x$$ 的某邻域内存在且非空。若序列 $$x^k\to\bar x$$，$$g^k\in\partial f(x^k)$$，且 $$g^k\to\bar g$$，则 $$\bar g\in\partial f(\bar x)$$。

</div>

**Proof** **（）** 对任意 $$y\in\operatorname{dom}f$$，由次梯度定义 $$f(y)\ge f(x^k)+\left\langle g^k,\,y-x^k\right\rangle$$。两边取下极限， 并利用 $$f$$ 的下半连续性（闭凸函数 $$=$$ 凸 $$+$$ 下半连续，定理2.2）与 $$g^k\to\bar g,\ x^k\to\bar x$$： $$f(y)\ge\liminf_{k\to\infty}\bigl[f(x^k)+\left\langle g^k,\,y-x^k\right\rangle\bigr]
\ge\liminf_{k\to\infty}f(x^k)+\lim_{k\to\infty}\left\langle g^k,\,y-x^k\right\rangle
\ge f(\bar x)+\left\langle \bar g,\,y-\bar x\right\rangle .$$ 故 $$\bar g\in\partial f(\bar x)$$。证毕。

**（）** 定理A.6并*不*是 $$\partial f$$ 的连续性，它额外要求次梯度序列 $$\lbraceg^k\rbrace$$ 自身收敛。该结论等价于说次微分映射的图像 $$\lbrace(x,g)\mid g\in\partial f(x),\ x\in\operatorname{dom}f\rbrace\subseteq\mathbb{R}^n\times\mathbb{R}^n$$ 是闭集。

下面汇总本节与 §A.1、§A.3 中的基本运算性质。

**（）**  **次微分的基本运算** 设 $$f,f_1,f_2$$ 为适当凸函数，$$x\in\operatorname{dom}f$$。则

1.  **非负数乘**：对 $$\alpha>0$$，$$\partial(\alpha f)(x)=\alpha\,\partial f(x)$$； 对 $$\alpha=0$$ 有 $$\partial(0\cdot f)(x)=\lbrace0\rbrace$$。

2.  **和**：$$\partial f_1(x)+\partial f_2(x)\subseteq\partial(f_1+f_2)(x)$$； 当*约束规范* $$\operatorname{int}\operatorname{dom}f_1\cap\operatorname{dom}f_2\ne\varnothing$$ 成立（且 $$x\in\operatorname{dom}f_1\cap\operatorname{dom}f_2$$）时取等号 $$\partial(f_1+f_2)(x)=\partial f_1(x)+\partial f_2(x)$$ （Moreau--Rockafellar 定理，见 §A.4 定理A.10）。

3.  **与方向导数**：对任意方向 $$d\in\mathbb{R}^n$$， $$\sup_{g\in\partial f(x)}g^\top d=f'(x;d);$$ 特别地，当 $$x\in\operatorname{int}\operatorname{dom}f$$ 时上确界可以取到（成为最大值），见 §A.3 定理A.8。

<div class="proposition">

**命题 A.3** 设 $$f$$ 为适当凸函数，$$x\in\operatorname{dom}f$$，$$\alpha>0$$。则 $$\partial(\alpha f)(x)=\alpha\,\partial f(x)$$。

</div>

**Proof** **（）** $$g\in\partial(\alpha f)(x)$$ $$\iff$$ $$(\alpha f)(y)\ge(\alpha f)(x)+g^\top(y-x)$$ 对一切 $$y\in\operatorname{dom}f$$ 成立 $$\iff$$ $$f(y)\ge f(x)+\bigl(\tfrac1\alpha g\bigr)^\top(y-x)$$ 对一切 $$y$$ 成立 $$\iff$$ $$\tfrac1\alpha g\in\partial f(x)$$ $$\iff$$ $$g\in\alpha\,\partial f(x)$$ （这里 $$\alpha>0$$ 保证除以 $$\alpha$$ 不变号，且 $$\operatorname{dom}(\alpha f)=\operatorname{dom}f$$）。证毕。

<div class="proposition">

**命题 A.4** 设 $$f_1,f_2$$ 为适当凸函数，$$x\in\operatorname{dom}f_1\cap\operatorname{dom}f_2$$，则 $$\partial f_1(x)+\partial f_2(x)\subseteq\partial(f_1+f_2)(x).$$

</div>

**Proof** **（）** 设 $$g_1\in\partial f_1(x)$$，$$g_2\in\partial f_2(x)$$。对任意 $$y$$， $$f_1(y)\ge f_1(x)+g_1^\top(y-x),\qquad f_2(y)\ge f_2(x)+g_2^\top(y-x).$$ 两式相加（当 $$y\notin\operatorname{dom}f_1\cup\operatorname{dom}f_2$$ 时右端为 $$+\infty$$，不等式自动成立）得 $$(f_1+f_2)(y)\ge(f_1+f_2)(x)+(g_1+g_2)^\top(y-x),$$ 故 $$g_1+g_2\in\partial(f_1+f_2)(x)$$。证毕。

<div class="proposition">

**命题 A.5** 设 $$f$$ 为凸函数，$$x\in\operatorname{dom}f$$，$$g\in\partial f(x)$$，$$d\in\mathbb{R}^n$$，则 $$g^\top d\le f'(x;d):=\lim_{t\downarrow0}\frac{f(x+td)-f(x)}{t}.$$

</div>

**Proof** **（）** 由次梯度定义，对任意 $$t>0$$（若 $$x+td\notin\operatorname{dom}f$$，差商为 $$+\infty$$，结论显然）， $$f(x+td)\ge f(x)+t\,g^\top d
\quad\Longrightarrow\quad
\frac{f(x+td)-f(x)}{t}\ge g^\top d .$$ 令 $$t\downarrow0$$ 并由极限保号性即得 $$f'(x;d)\ge g^\top d$$。证毕。

## 凸函数的方向导数

为了把「次微分是一个集合」这一事实转化成可计算的公式，我们需要一个工具：方向导数。 直观地说，方向导数 $$f'(x;d)$$ 是函数沿射线 $$x+td$$（$$t\downarrow0$$）的「单侧变化率」， 它总能定义（允许取 $$\pm\infty$$），并且恰好是全体次梯度与 $$d$$ 的内积的最大值。这条公式 （定理A.8）是本附录的核心，它同时说明了：次微分的凸性、有界性、闭性如何 转化为方向导数的分析性质，以及为什么「不可微点处次梯度不唯一」正好对应「方向导数关于 方向 $$d$$ 是分段线性的凸函数」。

<div class="definition">

设 $$f$$ 为适当函数，$$x_0\in\operatorname{dom}f$$，$$d\in\mathbb{R}^n$$。若极限 $$\lim_{t\downarrow0}\frac{f(x_0+td)-f(x_0)}{t}$$ 存在（$$t\downarrow0$$ 表示 $$t$$ 单调下降趋于 $$0$$），则称其为 $$f$$ 在 $$x_0$$ 处沿方向 $$d$$ 的 **方向导数**，记作 $$f'(x_0;d)$$。对于凸函数，$$f'(x_0;d)$$ 也等价地定义为 $$\begin{equation}
f'(x_0;d)=\inf_{t>0}\frac{f(x_0+td)-f(x_0)}{t}.
\end{equation}$$

</div>

**（）** **记号** 讲义用 $$\partial f(x_0;d)$$ 表示方向导数，本笔记改用 $$f'(x_0;d)$$，以免与次微分 $$\partial f(x_0)$$ 混淆。注意 $$f'(x_0;d)$$ 允许取 $$\pm\infty$$；但在内点处它总是有限的 （命题A.6）。

式(A.7)之所以成立，关键在于差商关于 $$t$$ 是单调的。下面这个引理是本节的 技术核心，它的证明只有三行，却支撑了后面所有结论。

<div class="lemma">

**引理 A.1** 设 $$f$$ 为凸函数，$$x\in\operatorname{dom}f$$，$$d\in\mathbb{R}^n$$，定义 $$\phi(t)=\frac{f(x+td)-f(x)}{t},\qquad t>0$$ （当 $$x+td\notin\operatorname{dom}f$$ 时约定 $$\phi(t)=+\infty$$）。则 $$\phi$$ 在 $$(0,+\infty)$$ 上单调不减： $$0<s<t\Longrightarrow\phi(s)\le\phi(t).$$

</div>

**Proof** **（）** 设 $$0<s<t$$。注意到 $$x+sd$$ 可以写成 $$x$$ 与 $$x+td$$ 的凸组合： $$x+sd=\frac{s}{t}\,(x+td)+\Bigl(1-\frac{s}{t}\Bigr)x,
\qquad \frac{s}{t}\in(0,1).$$ 由 $$f$$ 的凸性， $$f(x+sd)\le\frac{s}{t}f(x+td)+\Bigl(1-\frac{s}{t}\Bigr)f(x)
\ \Longrightarrow\
f(x+sd)-f(x)\le\frac{s}{t}\bigl[f(x+td)-f(x)\bigr].$$ 两边除以 $$s>0$$ 得 $$\phi(s)\le\phi(t)$$。若 $$f(x+td)=+\infty$$，则右端为 $$+\infty$$， 不等式自动成立（约定 $$+\infty$$ 与有限数、$$+\infty$$ 的运算按广义实数规则进行）。 证毕。

<div class="theorem">

**定理 A.7** 设 $$f$$ 为凸函数，$$x\in\operatorname{dom}f$$，$$d\in\mathbb{R}^n$$。则极限 $$\lim_{t\downarrow0}\phi(t)$$ 存在 （在广义实数系中，即允许为 $$\pm\infty$$），且 $$f'(x;d)=\lim_{t\downarrow0}\phi(t)=\inf_{t>0}\phi(t).$$ 因此凸函数在定义域内每一点沿任意方向的方向导数都存在（差商单调性与极限的关系见 图A.4）。

</div>

**Proof** **（）** 记 $$L=\inf_{t>0}\phi(t)$$。由引理A.1，$$\phi$$ 在 $$(0,+\infty)$$ 上单调不减。 分三种情形。

1.  $$L=-\infty$$：对任意 $$M\in\mathbb{R}$$，存在 $$t_0>0$$ 使 $$\phi(t_0)<M$$。由单调性， 对一切 $$0<t<t_0$$ 有 $$\phi(t)\le\phi(t_0)<M$$，故 $$\lim_{t\downarrow0}\phi(t)=-\infty=L$$。

2.  $$L\in\mathbb{R}$$：任取 $$\varepsilon>0$$，存在 $$t_0>0$$ 使 $$\phi(t_0)<L+\varepsilon$$。 对一切 $$0<t<t_0$$，由 $$L$$ 是下确界及单调性， $$L\le\phi(t)\le\phi(t_0)<L+\varepsilon,$$ 故 $$\lim_{t\downarrow0}\phi(t)=L$$。

3.  $$L=+\infty$$：此时 $$\phi(t)=+\infty$$ 对一切 $$t>0$$ 成立，极限为 $$+\infty=L$$。

三种情形都给出 $$\lim_{t\downarrow0}\phi(t)=L=\inf_{t>0}\phi(t)$$，即式(A.7)。 证毕。

<div class="proposition">

**命题 A.6** 设 $$f$$ 为凸函数，$$x_0\in\operatorname{int}\operatorname{dom}f$$，则对任意 $$d\in\mathbb{R}^n$$，$$f'(x_0;d)$$ 有限。

</div>

**Proof** **（）** **（1）$$f'(x_0;d)<+\infty$$。** 由于 $$x_0$$ 为 $$\operatorname{dom}f$$ 的内点，存在 $$t>0$$ 使 $$x_0+td\in\operatorname{dom}f$$，于是 $$\phi(t)<+\infty$$，而 $$f'(x_0;d)=\inf_{t>0}\phi(t)\le\phi(t)<+\infty$$。

**（2）$$f'(x_0;d)>-\infty$$。** 由定理A.2，$$\partial f(x_0)\ne\varnothing$$， 取 $$g\in\partial f(x_0)$$。对任意 $$t>0$$：若 $$x_0+td\in\operatorname{dom}f$$，由次梯度不等式 $$f(x_0+td)\ge f(x_0)+t\,g^\top d$$，故 $$\phi(t)\ge g^\top d$$；若 $$x_0+td\notin\operatorname{dom}f$$，则 $$\phi(t)=+\infty\ge g^\top d$$。于是 $$f'(x_0;d)=\inf_{t>0}\phi(t)\ge g^\top d>-\infty .$$ 综合(1)(2) 得 $$f'(x_0;d)$$ 有限。证毕。

<div class="proposition">

**命题 A.7** 设 $$f$$ 为凸函数，$$x_0\in\operatorname{int}\operatorname{dom}f$$，记 $$q(d)=f'(x_0;d)$$。则 $$q:\mathbb{R}^n\to\mathbb{R}$$ 满足

1.  **正齐次性**：$$q(\lambda d)=\lambda q(d)$$，$$\forall\lambda\ge0$$；

2.  **次可加性**：$$q(u+v)\le q(u)+q(v)$$；

3.  **凸性**：$$q$$ 是 $$\mathbb{R}^n$$ 上的（有限）凸函数；

4.  **可微情形**：若 $$f$$ 在 $$x_0$$ 处可微，则 $$q(d)=\nabla f(x_0)^\top d$$ 为线性函数。

</div>

**Proof** **（）** **（1）** 对 $$\lambda>0$$，作代换 $$s=\lambda t$$： $$q(\lambda d)=\inf_{t>0}\frac{f(x_0+\lambda t d)-f(x_0)}{t}
=\inf_{s>0}\lambda\,\frac{f(x_0+sd)-f(x_0)}{s}=\lambda q(d).$$ 当 $$\lambda=0$$ 时 $$q(0)=\inf_{t>0}\frac{f(x_0)-f(x_0)}{t}=0=0\cdot q(d)$$。

**（3）** 任取 $$u,v\in\mathbb{R}^n$$ 与 $$\theta\in[0,1]$$，记 $$w=\theta u+(1-\theta)v$$。任取 $$\varepsilon>0$$。由 $$q(u)=\inf_{t>0}\phi_u(t)$$ 与引理A.1（$$\phi_u$$ 单调不减）， 存在 $$t_0>0$$，使得对一切 $$0<t<t_0$$ 同时成立 $$\frac{f(x_0+tu)-f(x_0)}{t}<q(u)+\varepsilon,\qquad
\frac{f(x_0+tv)-f(x_0)}{t}<q(v)+\varepsilon$$ （若 $$q(u)=+\infty$$ 则左式自动成立；否则取 $$t_0$$ 使 $$\phi_u(t_0)<q(u)+\varepsilon$$， 再由单调性对所有 $$t<t_0$$ 成立）。固定这样的 $$t$$，由 $$f$$ 的凸性， $$\begin{align*}
f(x_0+tw)&=f\bigl(\theta(x_0+tu)+(1-\theta)(x_0+tv)\bigr)\\
&\le\theta f(x_0+tu)+(1-\theta)f(x_0+tv)\\
&\le f(x_0)+t\bigl[\theta(q(u)+\varepsilon)+(1-\theta)(q(v)+\varepsilon)\bigr].
\end{align*}$$ 于是 $$\phi_w(t)\le\theta q(u)+(1-\theta)q(v)+\varepsilon$$，令 $$t\downarrow0$$ 并用 定理A.7 得 $$q(w)\le\theta q(u)+(1-\theta)q(v)+\varepsilon$$；再令 $$\varepsilon\downarrow0$$ 即得 $$q$$ 的凸性。

**（2）** 由 (1)(3)： $$q(u+v)=2q\Bigl(\frac{u+v}{2}\Bigr)\le2\Bigl[\frac{q(u)}2+\frac{q(v)}2\Bigr]=q(u)+q(v).$$

**（4）** 若 $$f$$ 在 $$x_0$$ 处可微，则 $$f(x_0+td)=f(x_0)+t\nabla f(x_0)^\top d+o(t)$$，故 $$\phi(t)\to\nabla f(x_0)^\top d$$。证毕。

**图 A.4**：差商的单调性与方向导数。由引理A.1，$$t\mapsto\phi(t)$$ 单调不减， 故 $$t\downarrow0$$ 时必有极限，且该极限就是下确界 $$\inf_{t>0}\phi(t)$$，即方向导数 $$f'(x_0;d)$$。内点处该极限有限（命题A.6）。

<div class="theorem">

**定理 A.8** 设 $$f:\mathbb{R}^n\to(-\infty,+\infty]$$ 为凸函数，$$x_0\in\operatorname{int}\operatorname{dom}f$$，$$d\in\mathbb{R}^n$$ 为任一方向， 则 $$\begin{equation}
f'(x_0;d)=\max_{g\in\partial f(x_0)}g^\top d .
\end{equation}$$

</div>

**Proof** **（）** 记 $$q(v)=f'(x_0;v)$$。

**第一步：$$q(d)$$ 是 $$\lbraceg^\top d\rbrace$$ 的上界。** 对任意 $$g\in\partial f(x_0)$$，由 命题A.5，$$q(d)=f'(x_0;d)\ge g^\top d$$。故 $$q(d)\ge\sup_{g\in\partial f(x_0)}g^\top d .$$

**第二步：构造达到上界的次梯度。** 由命题A.7，$$q$$ 是 $$\mathbb{R}^n$$ 上 的有限凸函数，故由命题A.6 有 $$\operatorname{dom}q=\mathbb{R}^n$$，从而 $$d$$ 是 $$\operatorname{dom}q$$ 的内点。 由次梯度存在性（定理A.2），存在 $$\hat g\in\partial q(d)$$，即 $$q(v)\ge q(d)+\hat g^\top(v-d),\qquad \forall v\in\mathbb{R}^n .$$ 对任意 $$v\in\mathbb{R}^n$$ 与 $$\lambda\ge0$$，由 $$q$$ 的正齐次性（命题A.7(1)） $$\lambda q(v)=q(\lambda v)$$，代入上式取 $$v\leftarrow\lambda v$$： $$\begin{equation}
\lambda q(v)\ge q(d)+\hat g^\top(\lambda v-d).
\end{equation}$$ 在(A.9)中令 $$\lambda=0$$，得 $$q(d)\le\hat g^\top d$$；在 (A.9)中两边除以 $$\lambda>0$$ 并令 $$\lambda\to+\infty$$，得 $$q(v)\ge\hat g^\top v+\frac{q(d)-\hat g^\top d}{\lambda}
\ \xrightarrow[\lambda\to+\infty]{}\ \hat g^\top v .$$ 由于上式对一切 $$v\in\mathbb{R}^n$$ 成立，取 $$v=y-x_0$$（$$y\in\operatorname{dom}f$$）得 $$f(y)-f(x_0)\ge q(y-x_0)\ge\hat g^\top(y-x_0),$$ 其中第一个不等号来自(A.7)（在 $$\inf$$ 中取 $$t=1$$）。故 $$\hat g\in\partial f(x_0)$$，且 $$\hat g^\top d\ge q(d)$$。

**第三步：结论。** 结合第一步，$$\hat g\in\partial f(x_0)$$ 且 $$\hat g^\top d=q(d)$$，故式(A.8)成立，且最大值在 $$\hat g$$ 处达到。证毕。

**（）** **为什么是 $$\max$$ 而不是 $$\sup$$（讲义的另一条途径）** 定理A.8的两个条件都用到了：$$x_0\in\operatorname{int}\operatorname{dom}f$$ 保证 $$\operatorname{dom}q=\mathbb{R}^n$$， 从而 $$q$$ 在 $$d$$ 处有次梯度（第二步）；同时保证 $$\partial f(x_0)$$ 非空有界 （定理A.3），故 $$\lbraceg^\top d\rbrace$$ 的上确界有限。若 $$x_0$$ 只在相对内部 或边界上，则上确界未必能取到，只能写成 $$\sup$$，这就是下面的定理。

讲义定理2.20 的证明走的是另一条路：先把 $$q$$ 写成透视函数的下确界。令 $$\tilde f(v)=f(x_0+v)-f(x_0)$$，$$h(v,t)=t\,\tilde f(v/t)=t\bigl[f(x_0+v/t)-f(x_0)\bigr]$$， 则 $$h$$ 是 $$\tilde f$$ 的透视函数（定理2.13(9)），故 $$h$$ 凸；由「对部分变量取下确界保凸」 （定理2.13(8)）得 $$q(v)=\inf_{t'>0}\frac{f(x_0+t'v)-f(x_0)}{t'}\ \xrightarrow{\ t=1/t'\ }\
\inf_{t>0}h(v,t)$$ 关于 $$v$$ 凸。本附录命题A.7 用差商直接验证了 $$q$$ 的凸性， 两条途径殊途同归。

<div class="theorem">

**定理 A.9** 设 $$f$$ 为适当凸函数，且 $$\partial f(x_0)\ne\varnothing$$，则对任意 $$d\in\mathbb{R}^n$$， $$\begin{equation}
f'(x_0;d)=\sup_{g\in\partial f(x_0)}g^\top d .
\end{equation}$$ 进一步，当 $$f'(x_0;d)$$ 不为无穷时，上确界可以取到（即 $$\sup$$ 可以换成 $$\max$$）。

</div>

**Proof** **（）** **（思路）** 记 $$q(v)=f'(x_0;v)$$。

1.  不等号「$$\ge$$」与定理A.8第一步完全相同：对每个 $$g\in\partial f(x_0)$$ 有 $$g^\top d\le q(d)$$。

2.  关键是把 $$\partial f(x_0)$$ 写成 $$q$$ 的「极集」： $$g\in\partial f(x_0)\iff g^\top v\le q(v),\ \forall v\in\mathbb{R}^n .$$ 事实上，若 $$g\in\partial f(x_0)$$，则由次梯度不等式与 (A.7) 得 $$g^\top v\le\inf_{t>0}\phi_v(t)=q(v)$$；反之若 $$g^\top v\le q(v)$$ 对一切 $$v$$ 成立， 取 $$v=y-x_0$$（$$y\in\operatorname{dom}f$$）并用 $$q(y-x_0)\le f(y)-f(x_0)$$（在 (A.7) 中取 $$t=1$$）即得 $$g\in\partial f(x_0)$$。

3.  由命题A.7 的证明（只用到 $$f$$ 的凸性）$$q$$ 是凸的、正齐次的， 且由 (2) 知 $$q=\sup_{g\in S}g^\top(\cdot)$$，其中 $$S=\partial f(x_0)$$ 为非空闭凸集， 故 $$q$$ 是下半连续的（一簇连续函数的逐点上确界），从而是闭凸正齐次函数。凸分析中的 双极定理（bipolar theorem）断言：闭凸正齐次函数恰是其极集的支撑函数，即 $$q(v)=\sup_{g\in S}g^\top v$$，这正是(A.10)。

4.  **取到性.** 设 $$M=q(d)<+\infty$$，记 $$H=\lbraceg\mid g^\top d=M\rbrace$$。若 $$S\cap H=\varnothing$$，则因 $$S$$ 为非空闭凸集、$$S\subseteq\lbraceg^\top d\le M\rbrace$$ 且 $$H$$ 为超平面，由分离超平面定理存在非零 $$a$$ 与实数 $$b$$ 使 $$a^\top g\le b\le a^\top h$$（$$\forall g\in S,h\in H$$）。由 $$H$$ 是超平面， $$\lbracea^\top h\mid h\in H\rbrace$$ 有下界迫使 $$a=\lambda d$$（$$\lambda\ne0$$）。若 $$\lambda>0$$， 则 $$b\le\lambda M=\sup_{g\in S}\lambda g^\top d\le b$$，矛盾；若 $$\lambda<0$$，则 $$a^\top g\le b$$ 等价于 $$g^\top d\ge b/\lambda\ge M$$，与 $$g^\top d<M$$（$$\forall g\in S$$） 矛盾。故 $$S\cap H\ne\varnothing$$，即上确界在某 $$\hat g\in\partial f(x_0)$$ 处取到。

讲义中该结论引自文献 \[187\] 引理2.75（Nesterov），以上给出的是自足的证明框架。

**（）** **与共轭函数、支撑函数的联系** 定理A.8把三件对象联系了起来：对固定的 $$x\in\operatorname{int}\operatorname{dom}f$$， $$d\longmapsto f'(x;d)=\max_{g\in\partial f(x)}g^\top d=\sigma_{\partial f(x)}(d)
=\bigl(I_{\partial f(x)}\bigr)^*(d),$$ 即*方向导数是次微分集合 $$\partial f(x)$$ 的支撑函数*，也等于指示函数 $$I_{\partial f(x)}$$ 的共轭函数。于是第三章的共轭函数语言可以完全翻译成次梯度语言： $$\partial f(x)$$ 是闭凸集，$$f'(x;\cdot)$$ 是它的支撑函数，而 $$f$$ 在 $$x$$ 处可微 $$\iff$$ $$\partial f(x)$$ 为单点集 $$\iff$$ $$f'(x;\cdot)$$ 是线性函数。下一节将进一步给出 $$g\in\partial f(x)$$ 与共轭函数 $$f^*$$ 的 Fenchel--Young 等号刻画（定理A.16）。

## 次梯度的计算规则

如何计算一个不可微凸函数的次梯度，在优化算法设计中是很重要的问题：直接按定义验证 $$f(y)\ge f(x)+g^\top(y-x)$$ 通常很繁琐。本节给出一套系统的计算规则：先给出基本规则 （可微、数乘、仿射变量替换），再给出「和」「最大值」「上确界」「固定分量的极小值」 「复合」这几类保凸运算下的次微分公式，最后给出常见函数（$$\left\vert x\right\vert$$、$$\left\Vert x\right\Vert_1$$、 $$\left\Vert x\right\Vert_2$$、$$\max_i x_i$$、指示函数、距离函数等）的次微分。本节的讨论默认 $$x\in\operatorname{int}\operatorname{dom}f$$，以保证出现的次微分非空（定理A.2）。

### 基本规则

我们首先列出三条最基本（也是最常用）的规则，其中第二、三条的「困难方向」分别在 §A.6.2 与 §A.6.5 中给出完整证明。

**（）**  **基本计算规则（讲义 §2.7.4 之 1）** 

1.  **可微凸函数**：若凸函数 $$f$$ 在 $$x$$ 处可微，则 $$\partial f(x)=\lbrace\nabla f(x)\rbrace$$（命题A.2）。

2.  **凸函数的非负线性组合**：设 $$f_1,f_2$$ 为凸函数且满足 $$\operatorname{int}\operatorname{dom}f_1\cap\operatorname{dom}f_2\ne\varnothing$$，$$x\in\operatorname{dom}f_1\cap\operatorname{dom}f_2$$。若 $$f(x)=\alpha_1f_1(x)+\alpha_2f_2(x),\qquad \alpha_1,\alpha_2\ge0,$$ 则 $$\partial f(x)=\alpha_1\partial f_1(x)+\alpha_2\partial f_2(x)
        :=\bigl\lbrace\alpha_1g_1+\alpha_2g_2\mid g_1\in\partial f_1(x),\ g_2\in\partial f_2(x)\bigr\rbrace.$$

3.  **线性变量替换**：设 $$h$$ 为适当凸函数，$$f(x)=h(Ax+b)$$，其中 $$A\in\mathbb{R}^{n\times m}$$，$$b\in\mathbb{R}^n$$。若存在 $$x^\sharp\in\mathbb{R}^m$$ 使得 $$Ax^\sharp+b\in\operatorname{int}\operatorname{dom}h$$，则 $$\partial f(x)=A^\top\partial h(Ax+b)
        :=\bigl\lbraceA^\top z\mid z\in\partial h(Ax+b)\bigr\rbrace,\qquad \forall x\in\operatorname{int}\operatorname{dom}f .$$

**（）**  **（讲义注2.3）** 上述第一条就是命题A.2；第二条是 Moreau--Rockafellar 定理 （定理A.10）的简单推论；第三条是 Rockafellar 凸分析定理23.9 的结论， 其约束规范「存在 $$x^\sharp$$ 使 $$Ax^\sharp+b\in\operatorname{int}\operatorname{dom}h$$」不可省略。

<div class="proposition">

**命题 A.8** 在基本规则 (2)(3) 的条件下，成立 $$\alpha_1\partial f_1(x)+\alpha_2\partial f_2(x)\subseteq\partial(\alpha_1f_1+\alpha_2f_2)(x),
\qquad
A^\top\partial h(Ax+b)\subseteq\partial f(x).$$

</div>

**Proof** **（）** 第一部分由命题A.3（数乘）与命题A.4（和的第一包含关系） 直接得到：若 $$g_1\in\partial f_1(x),g_2\in\partial f_2(x)$$，则 $$\alpha_1g_1\in\partial(\alpha_1f_1)(x)$$，$$\alpha_2g_2\in\partial(\alpha_2f_2)(x)$$，故 $$\alpha_1g_1+\alpha_2g_2\in\partial(\alpha_1f_1+\alpha_2f_2)(x)$$。

第二部分：设 $$z\in\partial h(Ax+b)$$，即 $$h(w)\ge h(Ax+b)+z^\top\bigl(w-(Ax+b)\bigr)$$ 对一切 $$w\in\operatorname{dom}h$$ 成立。取 $$w=Ay+b$$（$$y\in\operatorname{dom}f$$），得 $$h(Ay+b)\ge h(Ax+b)+z^\top A(y-x)
\quad\Longrightarrow\quad
f(y)\ge f(x)+(A^\top z)^\top(y-x),$$ 故 $$A^\top z\in\partial f(x)$$。证毕。

### 两个函数之和：Moreau--Rockafellar 定理

<div class="theorem">

**定理 A.10** 设 $$f_1,f_2:\mathbb{R}^n\to(-\infty,+\infty]$$ 为两个凸函数，则对任意 $$x_0\in\mathbb{R}^n$$， $$\begin{equation}
\partial f_1(x_0)+\partial f_2(x_0)\subseteq\partial(f_1+f_2)(x_0).
\end{equation}$$ 进一步，若*约束规范* $$\begin{equation}
\operatorname{int}\operatorname{dom}f_1\cap\operatorname{dom}f_2\ne\varnothing
\end{equation}$$ 成立，则对任意 $$x_0\in\mathbb{R}^n$$， $$\begin{equation}
\partial(f_1+f_2)(x_0)=\partial f_1(x_0)+\partial f_2(x_0).
\end{equation}$$

</div>

**Proof** **（）** **（1）包含关系 (A.11)。** 设 $$g_i\in\partial f_i(x_0)$$，$$i=1,2$$。由 次梯度不等式相加得（对 $$y\notin\operatorname{dom}f_1\cup\operatorname{dom}f_2$$ 自动成立） $$(f_1+f_2)(y)\ge(f_1+f_2)(x_0)+(g_1+g_2)^\top(y-x_0),$$ 故 $$g_1+g_2\in\partial(f_1+f_2)(x_0)$$。

**（2）等号 (A.13)。** 只需证「$$\subseteq$$」。设 $$g\in\partial(f_1+f_2)(x_0)$$。 若 $$x_0\notin\operatorname{dom}(f_1+f_2)$$，则右端 $$\partial(f_1+f_2)(x_0)=\varnothing$$，结论平凡； 故可设 $$f_1(x_0),f_2(x_0)<+\infty$$。定义 $$\mathbb{R}^n\times\mathbb{R}$$ 中的两个集合 $$\begin{align*}
S_1&=\bigl\lbrace(x-x_0,\,y)\ \big\vert\ y>f_1(x)-f_1(x_0)-g^\top(x-x_0)\bigr\rbrace,\\
S_2&=\bigl\lbrace(x-x_0,\,y)\ \big\vert\ y\le f_2(x_0)-f_2(x)\bigr\rbrace.
\end{align*}$$ $$S_1$$ 是凸函数 $$x\mapsto f_1(x)-f_1(x_0)-g^\top(x-x_0)$$ 的严格上方图，$$S_2$$ 是凹函数 $$x\mapsto f_2(x_0)-f_2(x)$$ 的下方图，故 $$S_1,S_2$$ 均为凸集；又 $$(0,\varepsilon)\in S_1$$ （$$\forall\varepsilon>0$$），$$(0,0)\in S_2$$，故二者非空。

**断言：$$S_1\cap S_2=\varnothing$$。** 若不然，取 $$(x-x_0,y)\in S_1\cap S_2$$，则 $$y>f_1(x)-f_1(x_0)-g^\top(x-x_0),\qquad y\le f_2(x_0)-f_2(x).$$ 两式相减并整理得 $$(f_1+f_2)(x)<(f_1+f_2)(x_0)+g^\top(x-x_0),$$ 与 $$g\in\partial(f_1+f_2)(x_0)$$ 矛盾。

由分离超平面定理（定理2.5），存在非零的 $$(a,b)\in\mathbb{R}^n\times\mathbb{R}$$ 与实数 $$c$$，使得 $$\begin{align}
a^\top(x-x_0)+by&\le c,\qquad \forall(x-x_0,y)\in S_1,\\
a^\top(x-x_0)+by&\ge c,\qquad \forall(x-x_0,y)\in S_2.
\end{align}$$ 由 $$(0,0)\in S_2$$ 及(A.15)得 $$c\le0$$。由 $$(0,\varepsilon)\in S_1$$（$$\forall\varepsilon>0$$） 及(A.14)得 $$b\varepsilon\le c\le0$$，令 $$\varepsilon\downarrow0$$ 得 $$b\le0$$。

**断言：$$b\ne0$$。** 反设 $$b=0$$。此时由 $$b\varepsilon\le c\le0$$ 得 $$c=0$$，于是 (A.14)(A.15)化为 $$a^\top(x-x_0)\le0\ (\forall x\in\operatorname{dom}f_1),\qquad
a^\top(x-x_0)\ge0\ (\forall x\in\operatorname{dom}f_2),$$ 从而 $$a^\top(x-x_0)=0$$ 对一切 $$x\in\operatorname{dom}f_1\cap\operatorname{dom}f_2$$ 成立。取 $$\hat x\in\operatorname{int}\operatorname{dom}f_1\cap\operatorname{dom}f_2$$，并取 $$\delta>0$$ 使 $$N_\delta(\hat x)\subseteq\operatorname{int}\operatorname{dom}f_1\cap\operatorname{dom}f_2$$（$$\operatorname{int}\operatorname{dom}f_1$$ 是开集， $$\hat x\in\operatorname{dom}f_2$$，故这样的 $$\delta$$ 存在）。对任意 $$\left\Vert u\right\Vert_2\le\delta$$ 有 $$\hat x+u\in\operatorname{dom}f_1\cap\operatorname{dom}f_2$$，故 $$a^\top u=a^\top(\hat x+u-x_0)-a^\top(\hat x-x_0)=0 .$$ 若 $$a\ne0$$，取 $$u=\dfrac{\delta a}{2\left\Vert a\right\Vert_2}$$ 得 $$a^\top u=\dfrac{\delta\left\Vert a\right\Vert_2}{2}\ne0$$， 矛盾，故 $$a=0$$；这与 $$(a,b)=(0,0)$$ 和分离超平面定理给出的 $$(a,b)\ne0$$ 矛盾。因此 $$b<0$$。

**构造分解。** 将(A.14)两端除以 $$-b>0$$，并令 $$\hat a=-\dfrac{a}{b}$$，得 $$\hat a^\top(x-x_0)\le y\ \ \bigl(\forall(x-x_0,y)\in S_1\bigr),\qquad
\hat a^\top(x-x_0)\ge y\ \ \bigl(\forall(x-x_0,y)\in S_2\bigr).$$ 利用 $$S_2$$ 的定义（对每个 $$x$$ 可令 $$y=f_2(x_0)-f_2(x)$$）得 $$\hat a^\top(x-x_0)\ge f_2(x_0)-f_2(x)
\quad\Longrightarrow\quad
f_2(x)\ge f_2(x_0)+(-\hat a)^\top(x-x_0),$$ 即 $$-\hat a\in\partial f_2(x_0)$$。类似地，利用 $$S_1$$ 的定义（对 $$x\in\operatorname{dom}f_1$$ 令 $$y\downarrow f_1(x)-f_1(x_0)-g^\top(x-x_0)$$）得 $$\hat a^\top(x-x_0)\le f_1(x)-f_1(x_0)-g^\top(x-x_0)
\quad\Longrightarrow\quad
f_1(x)\ge f_1(x_0)+(g+\hat a)^\top(x-x_0),$$ 即 $$g+\hat a\in\partial f_1(x_0)$$。于是 $$g=(g+\hat a)+(-\hat a)\in\partial f_1(x_0)+\partial f_2(x_0),$$ 即 $$\partial(f_1+f_2)(x_0)\subseteq\partial f_1(x_0)+\partial f_2(x_0)$$，结合 (A.11) 得(A.13)。证毕。

**（）** **约束规范的确切形式与一个反例** 

1.  定理A.10 中使用的约束规范 (A.12) 是讲义中的表述。更精细的 版本（Rockafellar 定理23.8）把 $$\operatorname{int}$$ 减弱为相对内部： $$\operatorname{ri}\operatorname{dom}f_1\cap\operatorname{ri}\operatorname{dom}f_2\ne\varnothing\Longrightarrow
        \partial(f_1+f_2)(x_0)=\partial f_1(x_0)+\partial f_2(x_0).$$ 由于 $$\operatorname{int}C\subseteq\operatorname{ri}C$$，讲义的条件是充分条件。$$\operatorname{ri}$$ 形式在 §A.6.5 证明线性变量替换规则时会用到（那里 $$\operatorname{dom}$$ 之一没有内点）。

2.  约束规范不能去掉。取 $$f_1(x)=-\sqrt{-x}$$（$$\operatorname{dom}f_1=(-\infty,0]$$）， $$f_2(x)=I_{[0,+\infty)}(x)$$。此时 $$\operatorname{int}\operatorname{dom}f_1\cap\operatorname{dom}f_2=(-\infty,0)\cap[0,+\infty)=\varnothing$$，且 $$\partial f_1(0)=\varnothing$$（见 §A.1 注记），$$\partial f_2(0)=N_{[0,+\infty)}(0)
        =(-\infty,0]$$，故右端为空集；而 $$(f_1+f_2)(x)=I_{\lbrace0\rbrace}(x)$$，由指示函数的次微分公式 $$\partial(f_1+f_2)(0)=N_{\lbrace0\rbrace}(0)=\mathbb{R}$$。左右两端不相等，等号失效。

由定理A.10 立即得到基本规则 (2) 的等号（有限个凸函数的非负线性组合可反复 使用定理A.10，每次只需验证相应的约束规范）。

<div class="corollary">

设 $$f_1,\dots,f_m$$ 为凸函数，$$\alpha_i\ge0$$，$$f=\sum_{i=1}^m\alpha_if_i$$。若对每个 $$i$$ 有 $$\operatorname{int}\bigl(\bigcap_{j<i}\operatorname{dom}f_j\bigr)\cap\operatorname{dom}f_i\ne\varnothing$$ （特别地，当所有 $$\operatorname{dom}f_i=\mathbb{R}^n$$，或 $$\bigcap_i\operatorname{int}\operatorname{dom}f_i\ne\varnothing$$ 时自动 成立），则 $$\partial f(x)=\sum_{i=1}^m\alpha_i\,\partial f_i(x),\qquad \forall x\in\mathbb{R}^n .$$

</div>

**Proof** **（）** 对 $$m$$ 作归纳。$$m=1$$ 由命题A.3；$$m=2$$ 即定理A.10。设结论对 $$m-1$$ 成立，令 $$F=\sum_{i=1}^{m-1}\alpha_if_i$$。由归纳假设 $$\partial F(x)=\sum_{i=1}^{m-1}\alpha_i\partial f_i(x)$$ 且 $$\operatorname{dom}F=\bigcap_{i=1}^{m-1}\operatorname{dom}f_i$$。再由定理A.10 作用于 $$F$$ 与 $$\alpha_mf_m$$（约束规范正是假设中的条件）得 $$\partial f(x)=\partial F(x)+\alpha_m\partial f_m(x)$$。证毕。

### 取最大值与逐点上确界

<div class="lemma">

**引理 A.2** 设 $$f_1,\dots,f_m$$ 为凸函数，$$x_0\in\bigcap_{i=1}^m\operatorname{int}\operatorname{dom}f_i$$，令 $$f=\max_i f_i$$，$$I(x_0)=\lbracei\mid f_i(x_0)=f(x_0)\rbrace$$。则对任意方向 $$a\in\mathbb{R}^n$$， $$f'(x_0;a)=\max_{i\in I(x_0)}f_i'(x_0;a).$$

</div>

**Proof** **（）** 记 $$\delta=f(x_0)-\max_{i\notin I(x_0)}f_i(x_0)>0$$（若 $$I(x_0)$$ 为全部指标，约定 $$\delta=+\infty$$）。由于 $$x_0\in\operatorname{int}\operatorname{dom}f_i$$ 且 $$f_i$$ 凸，$$f_i$$ 在 $$x_0$$ 的某邻域内 连续；故存在 $$t_0>0$$，使得对一切 $$0<t<t_0$$ 与一切 $$i\notin I(x_0)$$ 有 $$f_i(x_0+ta)<f(x_0)-\delta/2$$，而对 $$i\in I(x_0)$$ 有 $$f_i(x_0+ta)>f(x_0)-\delta/4$$。于是当 $$0<t<t_0$$ 时 $$f(x_0+ta)=\max_{i\in I(x_0)}f_i(x_0+ta),$$ 且 $$f_i(x_0)=f(x_0)$$（$$i\in I(x_0)$$），从而 $$\frac{f(x_0+ta)-f(x_0)}{t}
=\max_{i\in I(x_0)}\frac{f_i(x_0+ta)-f_i(x_0)}{t}
\ \xrightarrow[t\downarrow0]{}\ \max_{i\in I(x_0)}f_i'(x_0;a),$$ 其中极限号与有限个取最大值可交换（有限个收敛数列的最大值收敛到极限的最大值）。证毕。

<div class="theorem">

**定理 A.11** 设 $$f_1,f_2,\dots,f_m:\mathbb{R}^n\to(-\infty,+\infty]$$ 均为凸函数，令 $$f(x)=\max\lbracef_1(x),f_2(x),\dots,f_m(x)\rbrace,\qquad \forall x\in\mathbb{R}^n .$$ 对 $$x_0\in\bigcap_{i=1}^m\operatorname{int}\operatorname{dom}f_i$$，定义活跃指标集 $$I(x_0)=\lbracei\mid f_i(x_0)=f(x_0)\rbrace$$，则 $$\begin{equation}
\partial f(x_0)=\operatorname{conv}\Bigl[\bigcup_{i\in I(x_0)}\partial f_i(x_0)\Bigr]
\end{equation}$$ （$$\operatorname{conv}$$ 表示凸包）。

</div>

**Proof** **（）** 若 $$f(x_0)=+\infty$$，则 $$f_i(x_0)=+\infty$$（$$i\in I(x_0)$$），而 $$x_0\in\operatorname{int}\operatorname{dom}f_i$$ 蕴含 $$f_i(x_0)<+\infty$$，故此时 $$I(x_0)=\varnothing$$， (A.16)两端均为空集。以下设 $$f(x_0)<+\infty$$，于是 $$I(x_0)\ne\varnothing$$。

**（1）$$\operatorname{conv}\bigl[\bigcup_{i\in I(x_0)}\partial f_i(x_0)\bigr]\subseteq\partial f(x_0)$$。** 设 $$i\in I(x_0)$$，$$g\in\partial f_i(x_0)$$。对任意 $$y$$， $$f(y)\ge f_i(y)\ge f_i(x_0)+g^\top(y-x_0)=f(x_0)+g^\top(y-x_0),$$ 故 $$g\in\partial f(x_0)$$，即 $$\partial f_i(x_0)\subseteq\partial f(x_0)$$。由 定理A.3，$$\partial f(x_0)$$ 为凸集，故它包含上述并集的凸包。

**（2）反向包含。** 设 $$g\in\partial f(x_0)$$。反设 $$g\notin C:=\operatorname{conv}\bigl[\bigcup_{i\in I(x_0)}\partial f_i(x_0)\bigr]$$。由于 $$x_0\in\operatorname{int}\operatorname{dom}f_i$$，由定理A.3(2)，每个 $$\partial f_i(x_0)$$ 都是非空紧凸集，故 $$C$$ 为非空紧凸集。由严格分离定理（定理2.6）， 存在 $$a\in\mathbb{R}^n$$ 与 $$b\in\mathbb{R}$$，使得 $$\begin{equation}
a^\top g>b\ge\max_{i\in I(x_0)}\ \sup_{\xi\in\partial f_i(x_0)}a^\top\xi
=\max_{i\in I(x_0)}f_i'(x_0;a),
\end{equation}$$ 其中最后一个等号用了定理A.8（$$x_0\in\operatorname{int}\operatorname{dom}f_i$$）。另一方面，由引理 A.2， $$f'(x_0;a)=\max_{i\in I(x_0)}f_i'(x_0;a),$$ 代入(A.17)得 $$a^\top g>f'(x_0;a)$$。但 $$g\in\partial f(x_0)$$ 蕴含 $$f(x_0+ta)\ge f(x_0)+t\,a^\top g$$（$$t>0$$），故由方向导数的定义 $$f'(x_0;a)\ge a^\top g$$，矛盾。因此 $$g\in\operatorname{conv}\bigl[\bigcup_{i\in I(x_0)}\partial f_i(x_0)\bigr]$$。证毕。

<div class="example">

设 $$f_1,f_2$$ 为凸的可微函数（一维情形见图A.5），$$f(x)=\max\lbracef_1(x),f_2(x)\rbrace$$。 则

1.  若 $$f_1(x)=f_2(x)$$，则 $$\partial f(x)=\bigl\lbracev\mid v=t\nabla f_1(x)+(1-t)\nabla f_2(x),\ 0\le t\le1\bigr\rbrace$$ （即两梯度连线上的全体点）；

2.  若 $$f_1(x)>f_2(x)$$，则 $$\partial f(x)=\lbrace\nabla f_1(x)\rbrace$$；

3.  若 $$f_2(x)>f_1(x)$$，则 $$\partial f(x)=\lbrace\nabla f_2(x)\rbrace$$。

</div>

**Proof** **（）** 由命题A.2，$$\partial f_i(x)=\lbrace\nabla f_i(x)\rbrace$$，$$i=1,2$$。由 定理A.11：在情形 (2) 中 $$I(x)=\lbrace1\rbrace$$，在情形 (3) 中 $$I(x)=\lbrace2\rbrace$$， 在情形 (1) 中 $$I(x)=\lbrace1,2\rbrace$$，而两点集的凸包即连线上的全体凸组合点。证毕。

<div class="example">

**例题 A.3** 令 $$f(x)=\max_{i=1,2,\dots,m}\bigl\lbracea_i^\top x+b_i\bigr\rbrace,
\qquad x,a_i\in\mathbb{R}^n,\ b_i\in\mathbb{R},$$ （一维情形见图A.5），则 $$\partial f(x)=\operatorname{conv}\lbracea_i\mid i\in I(x)\rbrace,\qquad
I(x)=\lbracei\mid a_i^\top x+b_i=f(x)\rbrace.$$ 即次梯度是所有「在 $$x$$ 处取到最大值的仿射函数的斜率」的凸组合。

</div>

**Proof** **（）** 取 $$f_i(x)=a_i^\top x+b_i$$，它们在 $$\mathbb{R}^n$$ 上可微且 $$\operatorname{dom}f_i=\mathbb{R}^n$$， $$\nabla f_i(x)=a_i$$。由命题A.2，$$\partial f_i(x)=\lbracea_i\rbrace$$，代入 定理A.11 即得。证毕。

**图 A.5**：取最大值函数的次微分（一维情形）。在两条曲线的交点 $$x$$ 处 $$f_1(x)=f_2(x)$$，$$f$$ 出现折角，此时 $$\partial f(x)=\operatorname{conv}\lbrace\nabla f_1(x),\nabla f_2(x)\rbrace$$ （一维时即为 $$g$$ 轴上的一段区间，右图）；在 $$f_1>f_2$$ 或 $$f_2>f_1$$ 处 $$f$$ 与其中一个 函数局部重合，次微分为单点集。

<div class="theorem">

**定理 A.12** 设 $$\lbracef_\alpha:\mathbb{R}^n\to(-\infty,+\infty]\rbrace_{\alpha\in A}$$ 是一族凸函数，令 $$f(x)=\sup_{\alpha\in A}f_\alpha(x).$$ 对 $$x_0\in\bigcap_{\alpha\in A}\operatorname{int}\operatorname{dom}f_\alpha$$，定义 $$I(x_0)=\lbrace\alpha\in A\mid f_\alpha(x_0)=f(x_0)\rbrace$$，则 $$\operatorname{conv}\Bigl[\bigcup_{\alpha\in I(x_0)}\partial f_\alpha(x_0)\Bigr]\subseteq\partial f(x_0).$$ 如果还有 $$A$$ 是紧集且 $$f_\alpha$$ 关于 $$\alpha$$ 连续，则 $$\operatorname{conv}\Bigl[\bigcup_{\alpha\in I(x_0)}\partial f_\alpha(x_0)\Bigr]=\partial f(x_0).$$

</div>

**Proof** **（）** **（思路）** **包含关系**与定理A.11 的 (1) 完全相同：对每个 $$\alpha\in I(x_0)$$ 有 $$\partial f_\alpha(x_0)\subseteq\partial f(x_0)$$（因为 $$f\ge f_\alpha$$ 且二者在 $$x_0$$ 处取值相同），再用 $$\partial f(x_0)$$ 为凸集 （定理A.3）即可。

**反向包含**的关键是把无限族的 $$\sup$$ 用有限族的 $$\max$$ 逼近。对任意 $$a\in\mathbb{R}^n$$，由 $$A$$ 紧与 $$\alpha\mapsto f_\alpha$$ 连续，$$I(x_0)$$ 为紧集；再结合 $$x_0\in\bigcap_\alpha\operatorname{int}\operatorname{dom}f_\alpha$$ 与 $$f_\alpha$$ 的连续性可知，存在有限个活跃 指标 $$\alpha_1,\dots,\alpha_k\in I(x_0)$$ 使得 $$f'(x_0;a)=\max_{1\le j\le k}f_{\alpha_j}'(x_0;a)$$ （否则可取一列活跃指标使方向导数严格增大，与 $$f'(x_0;a)$$ 为其上确界矛盾）。 于是对任意 $$g\in\partial f(x_0)$$，若 $$g$$ 不在 $$\operatorname{conv}\bigl[\bigcup_{j=1}^k\partial f_{\alpha_j}(x_0)\bigr]$$ 中，仿照 定理A.11 第 (2) 步的严格分离与方向导数论证即得矛盾。证毕。

<div class="example">

**例题 A.4** 定义 $$f:\mathbb{R}^n\to\mathbb{R}$$ 为 $$\ell_1$$ 范数，则对 $$x=(x_1,x_2,\dots,x_n)\in\mathbb{R}^n$$ 有 $$f(x)=\left\Vert x\right\Vert_1=\max_{s\in\lbrace-1,1\rbrace^n}s^\top x,$$ 于是 $$\partial f(x)=J_1\times J_2\times\cdots\times J_n,\qquad
J_k=\begin{cases}
[-1,1], & x_k=0,\\
\lbrace1\rbrace, & x_k>0,\\
\lbrace-1\rbrace, & x_k<0.
\end{cases}$$ 即：非零分量处次梯度分量由符号唯一确定（同 $$\operatorname{sgn}(x_k)$$），零分量处可在 $$[-1,1]$$ 中 任意取值。

</div>

**Proof** **（）** **（证明一：用最大值规则）** 把 $$\left\Vert x\right\Vert_1$$ 写成有限个仿射函数的取最大值：指标集为符号向量 $$s\in\lbrace-1,1\rbrace^n$$，$$f_s(x)=s^\top x$$。$$f_s$$ 可微且 $$\nabla f_s(x)=s$$，由 定理A.11， $$\partial\left\Vert x\right\Vert_1=\operatorname{conv}\lbraces\mid s\in\lbrace-1,1\rbrace^n,\ s^\top x=\left\Vert x\right\Vert_1\rbrace.$$ 而 $$s^\top x=\sum_k s_kx_k=\left\Vert x\right\Vert_1=\sum_k\left\vert x_k\right\vert$$ 当且仅当对每个 $$k$$ 都有 $$s_kx_k=\left\vert x_k\right\vert$$，即 $$x_k>0$$ 时 $$s_k=1$$、$$x_k<0$$ 时 $$s_k=-1$$、$$x_k=0$$ 时 $$s_k$$ 任意。 这样的 $$s$$ 组成集合 $$\prod_k S_k$$，其中 $$S_k=\lbrace1\rbrace$$（$$x_k>0$$）、$$S_k=\lbrace-1\rbrace$$ （$$x_k<0$$）、$$S_k=\lbrace-1,1\rbrace$$（$$x_k=0$$）。注意到凸包与笛卡尔积可交换 （$$\operatorname{conv}(\prod_k S_k)=\prod_k\operatorname{conv}S_k$$），即得 $$\partial\left\Vert x\right\Vert_1
=\prod_k\operatorname{conv}S_k=J_1\times\cdots\times J_n$$。证毕。

**Proof** **（）** **（证明二：用可分结构与 $$\left\vert\cdot\right\vert$$）** $$\left\Vert x\right\Vert_1=\sum_{k=1}^nf_k(x_k)$$，其中 $$f_k(t)=\left\vert t\right\vert$$ 是一维凸函数且 $$\partial f_k(0)=[-1,1]$$、$$\partial f_k(t)=\lbrace\operatorname{sgn}(t)\rbrace$$（$$t\ne0$$，见 §A.6.8）。 由可分函数的次微分公式（命题A.9）即得结论。

**图 A.6**：$$\ell_1$$ 范数的次微分（$$n=2$$）。左图按 $$x$$ 所处区域给出 $$\partial\left\Vert x\right\Vert_1$$： 四个开象限对应右图的四个顶点，两条坐标轴上的点对应右图的四条边，原点对应整个正方形 $$[-1,1]^2$$。

### 固定分量的极小值与距离函数

<div class="theorem">

**定理 A.13** 考虑函数 $$f(x)=\inf_{y}\ h(x,y),$$ 其中 $$h:\mathbb{R}^n\times\mathbb{R}^m\to(-\infty,+\infty]$$ 是关于 $$(x,y)$$ 的凸函数。对 $$\hat x\in\mathbb{R}^n$$，设 $$\hat y\in\mathbb{R}^m$$ 满足 $$h(\hat x,\hat y)=f(\hat x)$$，且存在 $$g\in\mathbb{R}^n$$ 使得 $$(g,0)\in\partial h(\hat x,\hat y)$$，则 $$g\in\partial f(\hat x)$$。

</div>

**Proof** **（）** 由次梯度的定义，对任意 $$x\in\mathbb{R}^n$$、$$y\in\mathbb{R}^m$$， $$h(x,y)\ge h(\hat x,\hat y)+g^\top(x-\hat x)+0^\top(y-\hat y)=f(\hat x)+g^\top(x-\hat x).$$ 对 $$y$$ 取下确界得 $$f(x)=\inf_y h(x,y)\ge f(\hat x)+g^\top(x-\hat x),$$ 即 $$g\in\partial f(\hat x)$$。证毕。

<div class="example">

**例题 A.5** 设 $$C$$ 是 $$\mathbb{R}^n$$ 中的非空闭凸集， $$f(x)=\operatorname{dist}(x,C)=\inf_{y\in C}\left\Vert x-y\right\Vert_2 .$$ 则 $$f$$ 为凸函数，且其次微分可完全刻画如下（$$P_C$$ 为投影；两种情形的几何见图A.7）：

1.  若 $$x\notin C$$，则 $$f$$ 在 $$x$$ 处可微，且 $$\partial f(x)=\left\lbrace\frac{x-P_C(x)}{\left\Vert x-P_C(x)\right\Vert_2}\right\rbrace
        \quad\text{（单点集）};$$

2.  若 $$x\in C$$，则 $$f(x)=0$$，且 $$\partial f(x)=N_C(x)\cap\bigl\lbraceg\mid\left\Vert g\right\Vert_2\le1\bigr\rbrace,$$ 其中 $$N_C(x)=\lbraceg\mid g^\top(y-x)\le0,\ \forall y\in C\rbrace$$ 是 $$C$$ 在 $$x$$ 处的法锥。

</div>

**Proof** **（）** $$f$$ 的凸性来自定理2.13(8)（$$h(x,y)=\left\Vert x-y\right\Vert_2$$ 关于 $$(x,y)$$ 凸，$$C$$ 为凸集， 对 $$y\in C$$ 取下确界保凸）。

**（1）$$x\notin C$$。** 记 $$p=P_C(x)$$，$$d=\left\Vert x-p\right\Vert_2>0$$，$$u=\dfrac{x-p}{d}$$。由投影的 变分不等式 $$(x-p)^\top(w-p)\le0$$（$$\forall w\in C$$）可得 $$\begin{equation}
\left\Vert x-w\right\Vert_2^2\ge d^2+\left\Vert w-p\right\Vert_2^2,\qquad \forall w\in C .
\end{equation}$$ 设 $$y=x+\delta$$（$$\delta\in\mathbb{R}^n$$），记 $$r=\left\Vert y-p\right\Vert_2$$。

*上界*：因 $$p\in C$$，$$f(y)-f(x)\le r-d$$。由 $$\left\Vert y-p\right\Vert_2^2=d^2+2d\,u^\top\delta
+\left\Vert\delta\right\Vert_2^2$$ 得 $$r-d=\frac{r^2-d^2}{r+d}=\frac{2d\,u^\top\delta+\left\Vert\delta\right\Vert_2^2}{r+d},$$ 故（用反向三角不等式 $$\vert r-d\vert\le\left\Vert\delta\right\Vert_2$$ 与 $$r+d\ge d$$） $$\Bigl\vert\bigl(r-d\bigr)-u^\top\delta\Bigr\vert
\le\frac{\vert u^\top\delta\vert\,\vert d-r\vert}{r+d}+\frac{\left\Vert\delta\right\Vert_2^2}{r+d}
\le\frac{\left\Vert\delta\right\Vert_2^2}{d}+\frac{\left\Vert\delta\right\Vert_2^2}{d}
=\frac{2\left\Vert\delta\right\Vert_2^2}{d},$$ 即 $$f(y)\le f(x)+u^\top\delta+\dfrac{2\left\Vert\delta\right\Vert_2^2}{d}$$。

*下界*：对任意 $$w\in C$$，展开 $$\left\Vert y-w\right\Vert_2^2=\left\Vert\delta+(x-p)+(p-w)\right\Vert_2^2$$ 并利用 (A.18)（即 $$(x-p)^\top(p-w)\ge0$$）得 $$\left\Vert y-w\right\Vert_2^2\ge d^2+2d\,u^\top\delta+\left\Vert\delta+(p-w)\right\Vert_2^2\ge d^2+2d\,u^\top\delta .$$ 若 $$d^2+2d\,u^\top\delta\le0$$，则下界 $$f(y)\ge0\ge d+u^\top\delta$$ 自动成立；否则 $$f(y)\ge\sqrt{d^2+2d\,u^\top\delta}
=d\sqrt{1+\frac{2u^\top\delta}{d}}
\ge d+u^\top\delta-\frac{(u^\top\delta)^2}{d}
\ge d+u^\top\delta-\frac{\left\Vert\delta\right\Vert_2^2}{d},$$ 其中用到 $$\sqrt{1+s}\ge1+\dfrac{s}{2}-\dfrac{s^2}{2}$$（$$\vert s\vert$$ 充分小）。

合并上下界得 $$\bigl\vert f(y)-f(x)-u^\top\delta\bigr\vert\le\dfrac{2\left\Vert\delta\right\Vert_2^2}{d}
=O(\left\Vert y-x\right\Vert_2^2)$$，故 $$f$$ 在 $$x$$ 处可微且 $$\nabla f(x)=u$$。由命题A.2， $$\partial f(x)=\lbraceu\rbrace$$。

（另一条更直接的途径：取 $$y\in C$$ 并记 $$w=P_C(y)$$，由变分不等式 $$(x-p)^\top(w-p)\le0$$ 与 $$(x-p)^\top(p-x)=-d^2$$ 得 $$u^\top(y-x)=\frac1d\Bigl[\underbrace{(x-p)^\top(y-w)}_{\le\left\Vert x-p\right\Vert_2\left\Vert y-w\right\Vert_2}
+\underbrace{(x-p)^\top(w-p)}_{\le0}\underbrace{+(x-p)^\top(p-x)}_{=-d^2}\Bigr]
\le\operatorname{dist}(y,C)-d=f(y)-f(x),$$ 即 $$u\in\partial f(x)$$；再结合已证的可微性得唯一性。这正是讲义例2.19 用 定理A.13 得到「一个次梯度」的论证。）

**（2）$$x\in C$$。** 此时 $$f(x)=0$$。 *（$$\subseteq$$）*设 $$g\in\partial f(x)$$。对 $$y\in C$$ 有 $$0=f(y)\ge f(x)+g^\top(y-x)=g^\top(y-x)$$，故 $$g\in N_C(x)$$。再取 $$y=x+g$$：由 $$x\in C$$ 得 $$f(y)=\operatorname{dist}(y,C)\le\left\Vert y-x\right\Vert_2=\left\Vert g\right\Vert_2$$，故 $$\left\Vert g\right\Vert_2^2=g^\top(y-x)\le f(y)-f(x)\le\left\Vert g\right\Vert_2
\ \Longrightarrow\ \left\Vert g\right\Vert_2\le1 .$$ *（$$\supseteq$$）*设 $$g\in N_C(x)$$ 且 $$\left\Vert g\right\Vert_2\le1$$。对任意 $$y$$，记 $$\bar y=P_C(y)\in C$$，则 $$g^\top(y-x)=g^\top(y-\bar y)+g^\top(\bar y-x)
\le\left\Vert g\right\Vert_2\left\Vert y-\bar y\right\Vert_2+0\le\operatorname{dist}(y,C)=f(y)-f(x),$$ 故 $$g\in\partial f(x)$$。证毕。

**图 A.7**：距离函数的次微分。左：$$x\notin C$$ 时次梯度唯一，方向由投影点指向 $$x$$， 长度为 $$1$$；右：$$x\in C$$ 时 $$\partial f(x)$$ 是法锥 $$N_C(x)$$ 被单位球截出的部分 （图中阴影为 $$N_C(x)$$ 在 $$\left\Vert g\right\Vert_2\le1$$ 内的部分）。

**（）**

1.  例A.5(1) 说明：距离函数在 $$C$$ 外处处可微，且梯度是「由投影指向 $$x$$」 的单位向量；在 $$C$$ 的边界上一般不可微。

2.  取 $$C=\lbracea\rbrace$$（单点集），则 $$\operatorname{dist}(x,\lbracea\rbrace)=\left\Vert x-a\right\Vert_2$$。当 $$x\ne a$$ 时 $$\partial f(x)=\lbrace(x-a)/\left\Vert x-a\right\Vert_2\rbrace$$；当 $$x=a$$ 时 $$\partial f(a)=N_{\lbracea\rbrace}(a)\cap\bar B(0,1)=\mathbb{R}^n\cap\bar B(0,1)=\bar B(0,1)$$， 与例A.1（$$\ell_2$$ 范数在原点处的次微分）完全一致。

3.  定理A.13只给出「一个」次梯度，不能给出全部次微分：一般地，若 $$(\hat x,\hat y)$$ 满足 $$h(\hat x,\hat y)=f(\hat x)$$，则 $$\bigl\lbraceg\mid(g,0)\in\partial h(\hat x,\hat y)\bigr\rbrace\subseteq\partial f(\hat x),$$ 等号需要额外的约束规范。

### 仿射变换与复合函数

本节完成基本规则 (3) 的证明，并给出复合函数的链式法则。

<div class="theorem">

**定理 A.14** 设 $$h$$ 为适当凸函数，$$f(x)=h(Ax+b)$$，其中 $$A\in\mathbb{R}^{n\times m}$$，$$b\in\mathbb{R}^n$$。若存在 $$x^\sharp\in\mathbb{R}^m$$ 使得 $$Ax^\sharp+b\in\operatorname{int}\operatorname{dom}h$$，则 $$\partial f(x)=A^\top\partial h(Ax+b),\qquad \forall x\in\operatorname{int}\operatorname{dom}f .$$

</div>

**Proof** **（）** 「$$\supseteq$$」已由命题A.8 证明。下证「$$\subseteq$$」。

设 $$x\in\operatorname{int}\operatorname{dom}f$$，$$g\in\partial f(x)$$，记 $$\hat y=Ax+b$$。在 $$\mathbb{R}^m\times\mathbb{R}^n$$ 上定义 $$H(s,y)=h(y)+I_M(s,y),\qquad M=\bigl\lbrace(s,y)\mid y=As+b\bigr\rbrace,$$ 其中 $$I_M$$ 是 $$M$$ 的指示函数。$$M$$ 是仿射子空间（特别地是凸集），且 $$\inf_y H(s,y)=h(As+b)=f(s),$$ 其中下确界在 $$y=As+b$$ 处达到。由于 $$g\in\partial f(x)$$，对任意 $$(s,y)\in\operatorname{dom}H$$ （即 $$y=As+b\in\operatorname{dom}h$$）有 $$H(s,y)=h(y)=f(s)\ge f(x)+g^\top(s-x)
=H(x,\hat y)+g^\top(s-x)+0^\top(y-\hat y)$$，故 $$\begin{equation}
(g,0)\in\partial H(x,\hat y).
\end{equation}$$

下面计算 $$\partial H(x,\hat y)$$。记 $$\pi_2(s,y)=y$$，则 $$H=h\circ\pi_2+I_M$$。

1.  **$$\partial(h\circ\pi_2)(x,\hat y)=\lbrace0\rbrace\times\partial h(\hat y)$$.** 若 $$(u,v)\in\partial(h\circ\pi_2)(x,\hat y)$$，即对一切 $$(s,y)$$， $$h(y)\ge h(\hat y)+u^\top(s-x)+v^\top(y-\hat y)$$。固定 $$y=\hat y$$ 得 $$u^\top(s-x)\le0$$ 对一切 $$s$$ 成立，故 $$u=0$$；再对一般的 $$y$$ 得 $$v\in\partial h(\hat y)$$。反之显然。

2.  **$$\partial I_M(x,\hat y)=N_M(x,\hat y)=L^\perp$$**，其中 $$L=\lbrace(s,t)\mid t=As\rbrace$$ 是 $$M$$ 的平行子空间（命题A.10）。 对 $$(u,w)\in\mathbb{R}^m\times\mathbb{R}^n$$， $$(u,w)\in L^\perp\iff u^\top s+w^\top\!As=0,\ \forall s\in\mathbb{R}^m
        \iff u+A^\top w=0 .$$

3.  **约束规范.** $$\operatorname{dom}(h\circ\pi_2)=\mathbb{R}^m\times\operatorname{dom}h$$，故 $$\operatorname{ri}\operatorname{dom}(h\circ\pi_2)=\mathbb{R}^m\times\operatorname{ri}\operatorname{dom}h$$；又 $$\operatorname{dom}I_M=M$$，$$\operatorname{ri}M=M$$。 于是 $$\operatorname{ri}\operatorname{dom}(h\circ\pi_2)\cap\operatorname{ri}\operatorname{dom}I_M\ne\varnothing
        \iff\exists s\in\mathbb{R}^m:\ As+b\in\operatorname{ri}\operatorname{dom}h,$$ 而这由假设 $$Ax^\sharp+b\in\operatorname{int}\operatorname{dom}h\subseteq\operatorname{ri}\operatorname{dom}h$$ 保证。

由 Moreau--Rockafellar 定理的相对内部形式（见定理A.10 后的注记）， $$\partial H(x,\hat y)=\bigl(\lbrace0\rbrace\times\partial h(\hat y)\bigr)+L^\perp .$$ 结合(A.19)，存在 $$v\in\partial h(\hat y)$$ 与 $$(u,w)\in L^\perp$$ 使得 $$(g,0)=(0,v)+(u,w)$$，即 $$g=u$$，$$w=-v$$。再由 $$u+A^\top w=0$$ 得 $$g=A^\top v,\qquad v\in\partial h(Ax+b),$$ 即 $$g\in A^\top\partial h(Ax+b)$$。证毕。

**（）** 定理A.14中的约束规范「存在 $$x^\sharp$$ 使 $$Ax^\sharp+b\in\operatorname{int}\operatorname{dom}h$$」 是不可省的。它保证 $$f$$ 有非空内点（否则 $$\operatorname{int}\operatorname{dom}f$$ 可能为空，公式无从谈起）， 同时保证上面用到的 Moreau--Rockafellar 拆分合法。

<div class="theorem">

**定理 A.15** 设 $$f_1,f_2,\dots,f_m:\mathbb{R}^n\to(-\infty,+\infty]$$ 为 $$m$$ 个凸函数， $$h:\mathbb{R}^m\to(-\infty,+\infty]$$ 为关于各分量单调递增的凸函数。令 $$f(x)=h\bigl(f_1(x),f_2(x),\dots,f_m(x)\bigr).$$ 设 $$z=(z_1,z_2,\dots,z_m)\in\partial h\bigl(f_1(\hat x),\dots,f_m(\hat x)\bigr)$$， $$g_i\in\partial f_i(\hat x)$$，$$i=1,\dots,m$$，则 $$g\overset{\text{def}}{=\!=}z_1g_1+z_2g_2+\cdots+z_mg_m\in\partial f(\hat x).$$

</div>

**Proof** **（）** 首先说明 $$f$$ 为凸函数：$$x\mapsto(f_1(x),\dots,f_m(x))$$ 的每个分量凸，$$h$$ 凸且关于每个 分量单调不减，由定理2.13(7) 知 $$f$$ 凸。

先指出 $$z\in\partial h(\hat f_1,\dots,\hat f_m)$$ 的每个分量非负。记 $$\hat f=(\hat f_1,\dots,\hat f_m)$$，任取 $$t>0$$ 与指标 $$i$$。一方面，由 $$h$$ 关于第 $$i$$ 个 分量单调不减，$$\hat f-te_i\le\hat f$$（按分量）蕴含 $$h(\hat f-te_i)\le h(\hat f)$$；另一方面，在点 $$\hat f-te_i$$ 处使用次梯度不等式得 $$h(\hat f-te_i)\ge h(\hat f)+z^\top\bigl(-te_i\bigr)=h(\hat f)-t\,z_i .$$ 两式合并得 $$h(\hat f)\ge h(\hat f)-t\,z_i$$，即 $$z_i\ge0$$。因此 $$z$$ 的每个分量非负 （它保证 $$z$$ 可以看作一组非负权重，但下面的推导并不需要这一点）。

记 $$\hat f_i=f_i(\hat x)$$。对任意 $$x\in\operatorname{dom}f$$，由 $$g_i\in\partial f_i(\hat x)$$ 得 $$f_i(x)\ge\hat f_i+g_i^\top(x-\hat x)$$。把这些不等式代入 $$h$$，并利用 $$h$$ 关于每个 分量单调不减与 $$z_i\ge0$$， $$\begin{align*}
f(x)&=h\bigl(f_1(x),\dots,f_m(x)\bigr)\\
&\ge h\Bigl(\hat f_1+g_1^\top(x-\hat x),\ \dots,\ \hat f_m+g_m^\top(x-\hat x)\Bigr)
\qquad\text{（$h$ 关于各分量单调不减）}\\
&\ge h(\hat f_1,\dots,\hat f_m)+\sum_{i=1}^m z_i\,g_i^\top(x-\hat x)
\qquad\text{（$z\in\partial h(\hat f_1,\dots,\hat f_m)$）}\\
&=f(\hat x)+g^\top(x-\hat x),
\end{align*}$$ 故 $$g\in\partial f(\hat x)$$。证毕。

**（）** **与可微链式法则的比较** 若 $$h$$ 与所有 $$f_i$$ 都可微，则定理A.15中 $$z=\nabla h(f(\hat x))$$ 唯一确定， 链式法则给出*等式* $$\nabla f(\hat x)=\sum_{i=1}^m\dfrac{\partial h}{\partial z_i}\nabla f_i(\hat x)$$。在不可微 情形，$$z$$ 可以在集合 $$\partial h(f(\hat x))$$ 中任取，结论只保证 $$\bigcup_{z,g_i}\lbracez_1g_1+\cdots+z_mg_m\rbrace\subseteq\partial f(\hat x)$$（一般不是等号）， 这与定理A.10、定理A.11 给出的「和」「取最大」公式形成对比： *复合运算的次微分一般不能精确计算，只能给出一个次梯度*。 $$m=1$$ 的标量情形即常用的结论：若 $$g$$ 凸、$$h$$ 凸且单调不减，$$f=h\circ g$$，则 $$\partial f(x)\supseteq\bigl\lbracez\,\xi\mid z\in\partial h(g(x)),\ \xi\in\partial g(x)\bigr\rbrace
=\partial h(g(x))\cdot\partial g(x).$$

### 可分函数、指示函数与法锥

<div class="proposition">

**命题 A.9** 设 $$f_i:\mathbb{R}\to(-\infty,+\infty]$$（$$i=1,\dots,n$$）为凸函数， $$f(x)=\sum_{i=1}^n f_i(x_i),\qquad x=(x_1,\dots,x_n)\in\mathbb{R}^n,$$ 且 $$\operatorname{dom}f=\prod_{i=1}^n\operatorname{dom}f_i$$（即定义域是各分量的乘积）。则 $$\partial f(x)=\partial f_1(x_1)\times\partial f_2(x_2)\times\cdots\times\partial f_n(x_n),
\qquad \forall x\in\operatorname{dom}f .$$

</div>

**Proof** **（）** **（$$\supseteq$$）**设 $$g_i\in\partial f_i(x_i)$$，$$g=(g_1,\dots,g_n)$$。对任意 $$y\in\operatorname{dom}f$$，把 $$n$$ 个不等式 $$f_i(y_i)\ge f_i(x_i)+g_i^\top(y_i-x_i)$$ 相加得 $$f(y)\ge f(x)+g^\top(y-x)$$，故 $$g\in\partial f(x)$$。

**（$$\subseteq$$）**设 $$g\in\partial f(x)$$。固定指标 $$j$$，任取 $$y_j\in\operatorname{dom}f_j$$，构造 $$\tilde x=(x_1,\dots,x_{j-1},y_j,x_{j+1},\dots,x_n)\in\operatorname{dom}f$$ （用到定义域的乘积结构）。由 $$g\in\partial f(x)$$， $$f(\tilde x)\ge f(x)+g^\top(\tilde x-x)
\quad\Longrightarrow\quad
f_j(y_j)\ge f_j(x_j)+g_j(y_j-x_j),$$ 故 $$g_j\in\partial f_j(x_j)$$。由 $$j$$ 的任意性得 $$g\in\prod_i\partial f_i(x_i)$$。证毕。

<div class="proposition">

**命题 A.10** 设 $$C\subseteq\mathbb{R}^n$$ 为非空凸集，$$I_C$$ 为其指示函数 $$I_C(x)=\begin{cases}0,&x\in C,\\ +\infty,&x\notin C .\end{cases}$$ 则 $$I_C$$ 为适当闭凸函数，且 $$\partial I_C(x)=\begin{cases}
N_C(x):=\bigl\lbraceg\mid g^\top(y-x)\le0,\ \forall y\in C\bigr\rbrace, & x\in C,\\[2pt]
\varnothing, & x\notin C .\end{cases}$$ $$N_C(x)$$ 称为 $$C$$ 在 $$x$$ 处的**法锥**，它是闭凸锥，且 $$0\in N_C(x)$$。

</div>

**Proof** **（）** $$I_C$$ 的凸性与闭性分别来自 $$C$$ 的凸性与闭性（$$\operatorname{epi}I_C=C\times[0,+\infty)$$）。 设 $$x\in C$$。对 $$g\in\mathbb{R}^n$$， $$g\in\partial I_C(x)\iff I_C(y)\ge I_C(x)+g^\top(y-x)=g^\top(y-x),\ \forall y
\iff 0\ge g^\top(y-x),\ \forall y\in C$$ （$$y\in C$$ 时 $$I_C(y)=0$$，$$y\notin C$$ 时不等式自动成立），即 $$g\in N_C(x)$$。 若 $$x\notin C$$，按定义 $$\partial I_C(x)=\varnothing$$。$$N_C(x)$$ 为闭凸锥： 闭性与凸性由 $$g\mapsto g^\top(y-x)$$ 的连续性、线性立得；锥性来自 $$\lambda\ge0$$ 时 $$(\lambda g)^\top(y-x)=\lambda g^\top(y-x)\le0$$；$$0$$ 显然属于它。 证毕。

**（）** **法锥的两种看法** 

1.  **与一阶最优性条件的联系.** 考虑凸问题 $$\min_{x\in C}f(x)$$，其中 $$f$$ 可微凸、 $$\operatorname{dom}f=\mathbb{R}^n$$。由定理A.10（此时约束规范 $$\operatorname{int}\operatorname{dom}f\cap C=C\ne\varnothing$$ 成立）与命题A.10， $$\partial(f+I_C)(x^\star)=\nabla f(x^\star)+N_C(x^\star),$$ 再由一阶最优性条件（定理A.4）： $$\begin{align*}
        x^\star\ \text{最优}&\iff 0\in\nabla f(x^\star)+N_C(x^\star)
        \iff-\nabla f(x^\star)\in N_C(x^\star)\\
        &\iff\nabla f(x^\star)^\top(y-x^\star)\ge0,\qquad \forall y\in C .
    \end{align*}$$ 这就是带约束凸问题（投影梯度法、近似点算法）中的变分不等式刻画。

2.  **与共轭函数的联系.** 由 §A.6.7 的结论， $$I_C^*(g)=\sup_{x\in C}g^\top x=\sigma_C(g)$$ 是 $$C$$ 的支撑函数，而 $$N_C(x)=\lbraceg\mid\sigma_C(g)=g^\top x\rbrace$$，即法锥是「支撑函数在 $$x$$ 处取到最大值」的 那些方向。若 $$x\in\operatorname{int}C$$，则 $$N_C(x)=\lbrace0\rbrace$$，此时 $$I_C$$ 在 $$x$$ 附近为常数 $$0$$， 与可微情形 $$\nabla(\text{常数})=0$$ 一致。

### 次梯度与共轭函数

本小节把次梯度与第三章的共轭函数联系起来，得到本附录中最具对偶意味的一组结论。

<div class="theorem">

**定理 A.16** 设 $$f$$ 为适当函数，$$x\in\operatorname{dom}f$$，$$g\in\mathbb{R}^n$$。则 $$\begin{equation}
g\in\partial f(x)\iff f(x)+f^*(g)=x^\top g
\end{equation}$$ （即 Fenchel 不等式 $$f(x)+f^*(g)\ge x^\top g$$ 取等号）。进一步，若 $$f$$ 为闭凸函数，则 $$\begin{equation}
g\in\partial f(x)\iff x\in\partial f^*(g).
\end{equation}$$

</div>

**Proof** **（）** **（$$\Longrightarrow$$）**设 $$g\in\partial f(x)$$。由共轭函数的定义与次梯度不等式， 对任意 $$y\in\operatorname{dom}f$$， $$g^\top y-f(y)\le g^\top y-\bigl[f(x)+g^\top(y-x)\bigr]=x^\top g-f(x),$$ 对 $$y$$ 取上确界得 $$f^*(g)\le x^\top g-f(x)$$，即 $$f(x)+f^*(g)\le x^\top g$$；结合 Fenchel 不等式（命题2.5）得(A.20)。

**（$$\Longleftarrow$$）**设 $$f(x)+f^*(g)=x^\top g$$。对任意 $$y\in\operatorname{dom}f$$，由 $$f^*(g)\ge g^\top y-f(y)$$ 得 $$x^\top g-f(x)=f^*(g)\ge g^\top y-f(y)
\quad\Longrightarrow\quad
f(y)\ge f(x)+g^\top(y-x),$$ 故 $$g\in\partial f(x)$$。

**互逆性.** 设 $$f$$ 为闭凸函数。由定理2.15，$$f^{**}=f$$。 若 $$g\in\partial f(x)$$，则由已证的(A.20)， $$f^*(g)+f(x)=x^\top g$$，即 $$f^*(g)+f^{**}(x)=x^\top g$$；把(A.20) 的 「$$\Longleftarrow$$」方向应用于闭凸函数 $$f^*$$（注意 $$x\in\operatorname{dom}f^{**}=\operatorname{dom}f$$）得 $$x\in\partial f^*(g)$$。反之若 $$x\in\partial f^*(g)$$，对 $$f^*$$ 用「$$\Longrightarrow$$」得 $$f^*(g)+f^{**}(x)=x^\top g$$，即 $$f(x)+f^*(g)=x^\top g$$，再由(A.20) 得 $$g\in\partial f(x)$$。证毕。

<div class="corollary">

设 $$f$$ 为适当凸函数。则对任意 $$x\in\operatorname{dom}f$$， $$\partial f(x)=\Bigl\lbraceg\in\mathbb{R}^n\ \Big\vert\ g\in\operatorname*{arg\,max}_{g'}\bigl\lbracex^\top g'-f^*(g')\bigr\rbrace\Bigr\rbrace$$ 当 $$f$$ 还是闭凸函数时，右端恰为 $$\operatorname*{arg\,max}_{g'}\lbracex^\top g'-f^*(g')\rbrace$$；特别地， $$\partial f(x)=\operatorname*{arg\,max}_{g}\bigl\lbracex^\top g-f^*(g)\bigr\rbrace$$ 就是二次共轭 $$f^{**}(x)$$ 定义中达到上确界的那些 $$g$$。

</div>

**Proof** **（）** 由(A.20)，$$g\in\partial f(x)$$ $$\iff$$ $$x^\top g-f^*(g)=f(x)
\ge\sup_{g'}\lbracex^\top g'-f^*(g')\rbrace=f^{**}(x)$$，即 $$g$$ 是上确界函数的一个极大值点 （当 $$f^{**}=f$$ 时，上确界值恰为 $$f(x)$$，故极大值点集恰为 $$\partial f(x)$$）。证毕。

<div class="corollary">

设 $$\left\Vert\cdot\right\Vert$$ 为 $$\mathbb{R}^n$$ 上任一范数，$$\left\Vert\cdot\right\Vert_*$$ 为其对偶范数。则 $$\partial\left\Vert x\right\Vert=\bigl\lbraceg\mid\left\Vert g\right\Vert_*\le1,\ g^\top x=\left\Vert x\right\Vert\bigr\rbrace,$$ 特别地 $$\partial\left\Vert0\right\Vert=\lbraceg\mid\left\Vert g\right\Vert_*\le1\rbrace$$ 是对偶范数单位球。

</div>

**Proof** **（）** 由例2.14，范数的共轭函数为 $$f^*(g)=I_{\lbraceg:\left\Vert g\right\Vert_*\le1\rbrace}(g)$$，即 $$\left\Vert g\right\Vert_*\le1$$ 时 $$f^*(g)=0$$，否则 $$+\infty$$。由定理A.16， $$g\in\partial\left\Vert x\right\Vert\iff\left\Vert x\right\Vert+f^*(g)=x^\top g
\iff\left\Vert g\right\Vert_*\le1\ \text{且}\ x^\top g=\left\Vert x\right\Vert.$$ 当 $$x=0$$ 时条件 $$x^\top g=0=\left\Vert x\right\Vert$$ 自动成立，故 $$\partial\left\Vert0\right\Vert$$ 即对偶范数单位球。 证毕。

**（）** 结合定理A.8，我们得到一幅完整的图景：对 $$x\in\operatorname{int}\operatorname{dom}f$$， $$\partial f(x)=\operatorname*{arg\,max}_g\lbracex^\top g-f^*(g)\rbrace,\qquad
f'(x;d)=\sigma_{\partial f(x)}(d)=\max_{g\in\partial f(x)}g^\top d ,$$ 即*次微分是共轭函数取极大值的解集，方向导数是次微分的支撑函数*。于是 「求次梯度」与「求共轭函数」是同一枚硬币的两面，而「不可微」则表现为这两个集合 不再是单点集。

### 常用函数的次微分

<div class="example">

设 $$f(x)=\left\vert x\right\vert$$（$$x\in\mathbb{R}$$），则 $$\partial f(x)=\begin{cases}\lbrace\operatorname{sgn}(x)\rbrace,&x\ne0,\\ [-1,1],&x=0.\end{cases}$$

</div>

**Proof** **（）** $$f(x)=\max\lbracex,-x\rbrace$$ 是两个可微凸函数的最大值，由例2.16（定理A.11） 即得结论（$$x>0$$ 时活跃指标为 $$x$$ 对应的函数，梯度为 $$1$$；$$x<0$$ 时梯度为 $$-1$$； $$x=0$$ 时两函数相等，次微分为 $$[1,-1]$$ 的凸包即 $$[-1,1]$$）。也可直接验证： $$g\in\partial f(0)$$ $$\iff$$ $$\left\vert y\right\vert\ge gy,\ \forall y$$ $$\iff$$ $$g\le1$$（取 $$y=1$$） 且 $$g\ge-1$$（取 $$y=-1$$）$$\iff$$ $$g\in[-1,1]$$。证毕。

<div class="example">

1.  $$\partial\left\Vert x\right\Vert_1=J_1\times\cdots\times J_n$$，其中 $$J_k=[-1,1]$$（$$x_k=0$$）、 $$\lbrace1\rbrace$$（$$x_k>0$$）、$$\lbrace-1\rbrace$$（$$x_k<0$$）（例A.4，图A.6）。

2.  $$\partial\left\Vert x\right\Vert_2=\lbracex/\left\Vert x\right\Vert_2\rbrace$$（$$x\ne0$$）， $$\partial\left\Vert0\right\Vert_2=\lbraceg\mid\left\Vert g\right\Vert_2\le1\rbrace$$（例A.1）。

更一般地，对 $$1<p<+\infty$$，$$\left\Vert x\right\Vert_p$$ 在 $$x\ne0$$ 处可微， $$\bigl(\nabla\left\Vert x\right\Vert_p\bigr)_i=\dfrac{\left\vert x_i\right\vert^{p-1}\operatorname{sgn}(x_i)}{\left\Vert x\right\Vert_p^{p-1}}$$， 而在 $$x=0$$ 处 $$\partial\left\Vert0\right\Vert_p=\lbraceg\mid\left\Vert g\right\Vert_q\le1\rbrace$$（$$\frac1p+\frac1q=1$$）。

</div>

<div class="example">

**例题 A.8** 设 $$f(x)=\max_{i=1,\dots,n}x_i$$，则 $$\partial f(x)=\operatorname{conv}\bigl\lbracee_i\mid i\in I(x)\bigr\rbrace,\qquad
I(x)=\Bigl\lbracei\ \Big\vert\ x_i=\max_j x_j\Bigr\rbrace,$$ 即所有「在最大分量位置取值为 $$1$$、其余位置非负且和为 $$1$$」的向量： $$\partial f(x)=\Bigl\lbraceg\ge0\ \Big\vert\ \textstyle\sum_ig_i=1,\ g_i=0\ \text{当}\ x_i<\max_jx_j\Bigr\rbrace.$$ 特别地，$$f$$ 在 $$x$$ 处可微 $$\iff$$ 最大分量唯一。

</div>

**Proof** **（）** $$f(x)=\max_i f_i(x)$$，其中 $$f_i(x)=x_i$$ 可微、$$\nabla f_i(x)=e_i$$、$$\operatorname{dom}f_i=\mathbb{R}^n$$。 由例2.17（定理A.11）即得 $$\partial f(x)=\operatorname{conv}\lbracee_i\mid i\in I(x)\rbrace$$， 而有限个 $$e_i$$ 的凸包正是上述单形。若最大值唯一，$$I(x)$$ 为单点集， $$\partial f(x)=\lbracee_i\rbrace$$ 为单点集，由命题A.2 的逆否形式知 $$f$$ 可微；若最大值 在至少两个指标处达到，则 $$\partial f(x)$$ 至少含两个不同点，非单点集，故不可微。证毕。

<div class="example">

设 $$f(x)=-\log x$$，$$\operatorname{dom}f=(0,+\infty)=\operatorname{int}\operatorname{dom}f$$。$$f$$ 在 $$\operatorname{dom}f$$ 上可微， $$f'(x)=-1/x$$，故 $$\partial f(x)=\Bigl\lbrace-\frac1x\Bigr\rbrace,\qquad x>0;\qquad \partial f(x)=\varnothing,\qquad x\le0 .$$ $$f$$ 是闭凸适当函数，且它在边界点 $$x=0$$（$$\notin\operatorname{dom}f$$）处没有次梯度，这说明 「$$f$$ 凸」并不蕴含「处处有次梯度」。

</div>

<div class="example">

设 $$f(x)=\left\Vert x\right\Vert_\infty=\max_i\left\vert x_i\right\vert$$。由 $$\left\vert x_i\right\vert=\max\lbracex_i,-x_i\rbrace$$ 与 定理A.11， $$\partial f(x)=\operatorname{conv}\bigl\lbrace\operatorname{sgn}(x_i)e_i\mid i\in I(x)\bigr\rbrace,\quad x\ne0;\qquad
\partial f(0)=\bigl\lbraceg\mid\left\Vert g\right\Vert_1\le1\bigr\rbrace,$$ 其中 $$I(x)=\lbracei\mid\left\vert x_i\right\vert=\left\Vert x\right\Vert_\infty\rbrace$$（当 $$x_i=0$$ 时不产生候选方向）。 $$x=0$$ 处的结论也可由 $$\ell_\infty$$ 与 $$\ell_1$$ 互为对偶范数、结合范数次微分公式得到。

</div>

<div class="example">

**例题 A.11** 考虑 $$\min_{x\in\mathbb{R}^n}\ \tfrac12\left\Vert x-a\right\Vert_2^2+\lambda\left\Vert x\right\Vert_1,\qquad \lambda>0 .$$ 由一阶最优性条件（定理A.4），$$x^\star$$ 最优当且仅当 $$0\in x^\star-a+\lambda\,\partial\left\Vert x^\star\right\Vert_1$$，即 $$a-x^\star\in\lambda\,\partial\left\Vert x^\star\right\Vert_1 .$$ 按分量写出（用例A.4）：对每个 $$i$$， $$\begin{cases}
a_i-x_i^\star=\lambda\,\operatorname{sgn}(x_i^\star), & x_i^\star\ne0,\\
\left\vert a_i-x_i^\star\right\vert\le\lambda, & x_i^\star=0 .
\end{cases}$$ 第一种情形给出 $$x_i^\star=a_i-\lambda\,\operatorname{sgn}(x_i^\star)$$，且要求 $$\left\vert a_i\right\vert>\lambda$$，得 $$x_i^\star=\operatorname{sgn}(a_i)(\left\vert a_i\right\vert-\lambda)$$；第二种情形给出 $$\left\vert a_i\right\vert\le\lambda$$。合并即得**软阈值算子** $$x_i^\star=S_\lambda(a)_i=\operatorname{sgn}(a_i)\max\bigl\lbrace\left\vert a_i\right\vert-\lambda,\,0\bigr\rbrace,\qquad i=1,\dots,n .$$ 这是 Lasso、稀疏信号恢复中近似点梯度法（ISTA）的核心一步，也说明「$$0\in\partial f(x^\star)$$」 是可以直接用来*求解*问题的。

</div>

### 补充：讲义习题 2.13--2.15

<div class="exercise">

求下列函数的一个次梯度。

1.  $$f(x)=\left\Vert Ax-b\right\Vert_2+\left\Vert x\right\Vert_2$$；

2.  $$f(x)=\inf_y\left\Vert Ay-x\right\Vert_\infty$$（假设存在 $$\hat y$$ 使 $$\left\Vert A\hat y-x\right\Vert_\infty=f(x)$$）。

</div>

**（）**   **(a)** 由定理A.10（两个函数的定义域都是 $$\mathbb{R}^n$$，约束规范自动成立）， $$\partial f(x)=A^\top\partial\left\Vert Ax-b\right\Vert_2+\partial\left\Vert x\right\Vert_2 .$$ 由范数次微分公式： $$g=\begin{cases}
A^\top\dfrac{Ax-b}{\left\Vert Ax-b\right\Vert_2}+\dfrac{x}{\left\Vert x\right\Vert_2}, & Ax\ne b,\ x\ne0,\\[6pt]
A^\top z+\dfrac{x}{\left\Vert x\right\Vert_2},\ \left\Vert z\right\Vert_2\le1, & Ax=b,\ x\ne0,\\[6pt]
A^\top\dfrac{Ax-b}{\left\Vert Ax-b\right\Vert_2}+w,\ \left\Vert w\right\Vert_2\le1, & Ax\ne b,\ x=0,\\[6pt]
A^\top z+w,\ \left\Vert z\right\Vert_2\le1,\ \left\Vert w\right\Vert_2\le1, & Ax=b,\ x=0
\end{cases}$$ 都是 $$f$$ 在 $$x$$ 处的次梯度。

**(b)** 记 $$h(x,y)=\left\Vert Ay-x\right\Vert_\infty$$（关于 $$(x,y)$$ 凸），则 $$f(x)=\inf_y h(x,y)$$。设 $$\hat y$$ 使 $$h(x,\hat y)=f(x)$$。由定理A.13， 只需找 $$g$$ 使 $$(g,0)\in\partial h(x,\hat y)$$。记 $$r=A\hat y-x$$，取 $$i\in\operatorname*{arg\,max}_j\left\vert r_j\right\vert$$，并令 $$s=\operatorname{sgn}(r_i)e_i$$，则 $$\left\Vert s\right\Vert_1=1$$ 且 $$s^\top r=\left\Vert r\right\Vert_\infty=f(x)$$。由 $$\left\Vert\cdot\right\Vert_\infty$$ 的次微分公式（例A.8 与 $$\ell_\infty$$ 例），$$s\in\partial\left\Vert r\right\Vert_\infty$$，而 $$h(x,y)=\left\Vert Ay-x\right\Vert_\infty$$ 关于 $$(x,y)$$ 可微性不成立，但可直接验证 $$(g,0)=\bigl(-s,\ A^\top s\bigr)\in\partial h(x,\hat y):$$ 对任意 $$(x',y')$$， $$\left\Vert Ay'-x'\right\Vert_\infty\ge s^\top(Ay'-x')=s^\top(A\hat y-x)+(-s)^\top(x'-x)+(A^\top s)^\top(y'-\hat y),$$ 其中 $$s^\top(A\hat y-x)=\left\Vert A\hat y-x\right\Vert_\infty=h(x,\hat y)$$，故上式正是次梯度不等式。 于是 $$g=-s=-\operatorname{sgn}(r_i)e_i$$（$$i$$ 为 $$\left\vert A\hat y-x\right\vert$$ 的最大分量指标）是 $$f$$ 在 $$x$$ 处的 一个次梯度。

<div class="exercise">

利用定理A.12求最大特征值函数 $$f(x)=\lambda_1(A(x))$$ 的次微分 $$\partial f(x)$$，其中 $$A(x)=A_0+\sum_{i=1}^nx_iA_i$$，$$A_i\in\mathcal S^m$$；并说明 $$f$$ 何时是可微函数。

</div>

**（）**   把 $$f$$ 写成函数族的上确界： $$f(x)=\lambda_1(A(x))=\sup_{\left\Vert u\right\Vert_2=1}u^\top A(x)u
=\sup_{u\in\mathcal S}\Bigl(u^\top A_0u+\sum_{i=1}^nx_i\,u^\top A_iu\Bigr),
\qquad \mathcal S=\lbraceu\in\mathbb{R}^m:\left\Vert u\right\Vert_2=1\rbrace.$$ $$\mathcal S$$ 是紧集，$$u\mapsto u^\top A(x)u$$ 关于 $$u$$ 连续，且每个 $$f_u(x)=u^\top A(x)u$$ 关于 $$x$$ 可微，其梯度为 $$\nabla f_u(x)=\bigl(u^\top A_1u,\ \dots,\ u^\top A_nu\bigr)^\top .$$ 活跃集为 $$I(x)=\bigl\lbraceu\in\mathcal S\mid u^\top A(x)u=\lambda_1(A(x))\bigr\rbrace
=\bigl\lbrace\text{$A(x)$ 对应于最大特征值的单位特征向量}\bigr\rbrace.$$ 由定理A.12， $$\partial f(x)=\operatorname{conv}\Bigl\lbrace\bigl(u^\top A_1u,\dots,u^\top A_nu\bigr)^\top\ \Big\vert\ u\in I(x)\Bigr\rbrace
=\Bigl\lbrace\bigl(\left\langle A_1,\,U\right\rangle,\dots,\left\langle A_n,\,U\right\rangle\bigr)^\top\ \Big\vert\ U\in\mathcal F(x)\Bigr\rbrace,$$ 其中 $$\mathcal F(x)$$ 是「单位球与最大特征值对应的特征向量集」的凸包，等价地 $$\mathcal F(x)$$ 是最大特征值对应的谱面（即该特征子空间上的正交投影矩阵）。 若 $$\lambda_1(A(x))$$ 是*单重*特征值，设 $$u$$ 为对应的单位特征向量，则 $$I(x)=\lbrace\pm u\rbrace$$，而 $$(-u)^\top A_i(-u)=u^\top A_iu$$，故两个候选梯度相同， $$\partial f(x)$$ 为单点集，$$f$$ 在 $$x$$ 处可微且 $$\nabla f(x)=\bigl(u^\top A_1u,\dots,u^\top A_nu\bigr)^\top .$$ 反之，若最大特征值重数大于 $$1$$，一般存在 $$i$$ 与两个最大特征向量 $$u,v$$ 使 $$u^\top A_iu\ne v^\top A_iv$$，此时 $$\partial f(x)$$ 不是单点集，$$f$$ 不可微（只有 「所有最大特征向量给出相同梯度」这种特殊情形例外）。

<div class="exercise">

设 $$f(x)$$ 为 $$m$$-强凸函数。求证：对任意的 $$x\in\operatorname{int}\operatorname{dom}f$$， $$f(x)-\inf_{y\in\operatorname{dom}f}f(y)\le\frac{1}{2m}\operatorname{dist}^2\bigl(0,\partial f(x)\bigr),$$ 其中 $$\operatorname{dist}(z,S)$$ 表示点 $$z$$ 到集合 $$S$$ 的欧氏距离。

</div>

**（）**   $$m$$-强凸性的次梯度形式为：对任意 $$x,y$$ 与任意 $$g\in\partial f(x)$$， $$f(y)\ge f(x)+g^\top(y-x)+\frac m2\left\Vert y-x\right\Vert_2^2 .$$ 取 $$g^\star\in\partial f(x)$$ 使 $$\left\Vert g^\star\right\Vert_2=\operatorname{dist}(0,\partial f(x))$$（由 定理A.3，$$\partial f(x)$$ 为非空闭集，故这样的 $$g^\star$$ 存在）， 并在上式右端对 $$y$$ 取下确界：右端是关于 $$y$$ 的强凸二次函数，其极小点为 $$y=x-\dfrac1mg^\star$$，极小值为 $$f(x)-\dfrac{1}{2m}\left\Vert g^\star\right\Vert_2^2$$。因此 $$\inf_y f(y)\ge f(x)-\frac{1}{2m}\left\Vert g^\star\right\Vert_2^2
=f(x)-\frac{1}{2m}\operatorname{dist}^2\bigl(0,\partial f(x)\bigr),$$ 整理即得所证。

## 本章小结

**（）**   本附录把讲义 §2.7 的内容组织成「定义--性质--方向导数--计算规则」四步。常用函数的 次微分汇总于表A.1，便于复习时查用。核心要点如下。

1.  **什么时候用次梯度.** 当目标函数凸但不可微时（$$\left\Vert x\right\Vert_1$$、$$\left\Vert x\right\Vert_2$$、 $$\max_i x_i$$、$$\max_i\lbracea_i^\top x+b_i\rbrace$$、距离函数、以及带约束问题经由指示函数 $$I_C$$ 转化的形式），梯度不存在，「$$\nabla f(x)=0$$」失效，此时用 $$0\in\partial f(x^\star)$$ 作为全局最优的*充要*条件（定理A.4）；算法上则用次梯度法 $$x^{k+1}=x^k-\alpha_kg^k$$（$$g^k\in\partial f(x^k)$$）或近似点算法，其收敛性分析依赖 次微分的单调性（定理A.5）与图像闭性（定理A.6）。

2.  **三条最常用的公式.** $$\begin{gather*}
        f'(x;d)=\max_{g\in\partial f(x)}g^\top d\qquad(x\in\operatorname{int}\operatorname{dom}f),\\
        g\in\partial f(x)\iff f(x)+f^*(g)=x^\top g,\qquad
        \partial f(x)=A^\top\partial h(Ax+b).
    \end{gather*}$$ （最后一条要求「存在 $$x^\sharp$$ 使 $$Ax^\sharp+b\in\operatorname{int}\operatorname{dom}h$$」）。

3.  **计算流程建议.** 遇到 $$f$$ 不可微时，依次尝试： (i) 看 $$f$$ 是否可写成有限个可微凸函数的取最大值 $$\Rightarrow$$ 用 $$\partial f(x)=\operatorname{conv}\bigcup_{i\in I(x)}\partial f_i(x)$$； (ii) 看 $$f$$ 是否可写成可分子函数之和 $$\Rightarrow$$ 用笛卡尔积公式； (iii) 看 $$f$$ 是否由仿射映射复合而成 $$\Rightarrow$$ 用 $$A^\top\partial h(Ax+b)$$； (iv) 看 $$f$$ 是否为距离函数/最优值函数 $$\Rightarrow$$ 用定理A.13； (v) 都不行时，用共轭函数或直接回到定义验证不等式。

4.  **四个易错点.** ① 次梯度只对*凸*函数定义（凹函数的对应物是上界， §A.1 命题A.1）；② $$\partial f(x)$$ 可能为空（$$x$$ 在 $$\operatorname{dom}f$$ 的 边界上，如 $$-\sqrt{x}$$ 在 $$0$$ 处）或无界（如 $$x^2$$ 在 $$\operatorname{dom}=[0,+\infty)$$ 的 $$0$$ 处）；③ 「和」「取最大」有精确公式但需要约束规范，而「复合」一般只有包含关系 （定理A.15）；④ 定理A.8 中 $$\max$$ 依赖 $$x\in\operatorname{int}\operatorname{dom}f$$，否则只能写成 $$\sup$$（定理A.9）。

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **函数 $$f(x)$$**                                                     **次微分 $$\partial f(x)$$**
  ------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  $$\left\vert x\right\vert$$，$$x\in\mathbb{R}$$                                  $$\lbrace\operatorname{sgn}(x)\rbrace$$（$$x\ne0$$）；$$[-1,1]$$（$$x=0$$）

  $$\left\Vert x\right\Vert_1$$                                                $$J_1\times\cdots\times J_n$$：$$J_k=\lbrace1\rbrace$$（$$x_k>0$$）、$$\lbrace-1\rbrace$$（$$x_k<0$$）、 $$[-1,1]$$（$$x_k=0$$）

  $$\left\Vert x\right\Vert_2$$                                                $$\lbracex/\left\Vert x\right\Vert_2\rbrace$$（$$x\ne0$$）；$$\lbraceg:\left\Vert g\right\Vert_2\le1\rbrace$$（$$x=0$$）

  $$\left\Vert x\right\Vert_p,\ 1<p<\infty$$                                   $$\bigl\lbrace\bigl(\left\vert x_i\right\vert^{p-1}\operatorname{sgn}(x_i)/\left\Vert x\right\Vert_p^{p-1}\bigr)_i\bigr\rbrace$$（$$x\ne0$$）； $$\lbraceg:\left\Vert g\right\Vert_q\le1\rbrace$$（$$x=0$$，$$\frac1p+\frac1q=1$$）

  $$\left\Vert x\right\Vert_\infty$$                                           $$\operatorname{conv}\lbrace\operatorname{sgn}(x_i)e_i:\left\vert x_i\right\vert=\left\Vert x\right\Vert_\infty\rbrace$$（$$x\ne0$$）； $$\lbraceg:\left\Vert g\right\Vert_1\le1\rbrace$$（$$x=0$$）

  一般范数 $$\left\Vert x\right\Vert$$                                         $$\lbraceg:\left\Vert g\right\Vert_*\le1,\ g^\top x=\left\Vert x\right\Vert\rbrace$$

  $$\max_i x_i$$                                                        $$\operatorname{conv}\lbracee_i:i\in I(x)\rbrace$$，$$I(x)=\operatorname*{arg\,max}_i x_i$$（非负、和为 $$1$$、非活跃分量为 $$0$$）

  $$\max\lbracex,0\rbrace$$（ReLU）                                               $$\lbrace0\rbrace$$（$$x<0$$）；$$[0,1]$$（$$x=0$$）；$$\lbrace1\rbrace$$（$$x>0$$）

  $$-\log x$$，$$\operatorname{dom}=(0,\infty)$$                          $$\lbrace-1/x\rbrace$$（$$x>0$$）；$$\varnothing$$（$$x\le0$$）

  $$\max\lbracef_1,f_2\rbrace$$，$$f_i$$ 可微凸                                     $$\operatorname{conv}\lbrace\nabla f_1(x),\nabla f_2(x)\rbrace$$（$$f_1(x)=f_2(x)$$）；$$\lbrace\nabla f_i(x)\rbrace$$ （$$f_i(x)>f_{3-i}(x)$$）

  $$\max_i\lbracea_i^\top x+b_i\rbrace$$                                          $$\operatorname{conv}\lbracea_i:i\in I(x)\rbrace$$，$$I(x)=\lbracei:a_i^\top x+b_i=f(x)\rbrace$$（分段线性函数）

  指示函数 $$I_C$$，$$C$$ 凸                                              $$N_C(x)=\lbraceg:g^\top(y-x)\le0,\ \forall y\in C\rbrace$$（$$x\in C$$）；$$\varnothing$$（$$x\notin C$$）

  $$\operatorname{dist}(x,C)$$，$$C$$ 闭凸                                $$\lbrace(x-P_C(x))/\left\Vert x-P_C(x)\right\Vert_2\rbrace$$（$$x\notin C$$）； $$N_C(x)\cap\lbraceg:\left\Vert g\right\Vert_2\le1\rbrace$$（$$x\in C$$）

  可分 $$f=\sum_if_i(x_i)$$                                             $$\partial f_1(x_1)\times\cdots\times\partial f_n(x_n)$$

  仿射复合 $$h(Ax+b)$$                                                  $$A^\top\partial h(Ax+b)$$，需 $$\exists x^\sharp:Ax^\sharp+b\in\operatorname{int}\operatorname{dom}h$$

  和 $$f_1+f_2$$                                                        $$\partial f_1(x)+\partial f_2(x)$$，需 $$\operatorname{int}\operatorname{dom}f_1\cap\operatorname{dom}f_2\ne\varnothing$$

  上确界 $$\sup_{\alpha\in A}f_\alpha$$                                 $$\supseteq\operatorname{conv}\bigcup_{\alpha\in I(x)}\partial f_\alpha(x)$$；$$A$$ 紧且 $$f_\alpha$$ 关于 $$\alpha$$ 连续时取等号

  复合 $$h(g(x))$$（$$h$$ 凸单调不减）                                    $$\supseteq\partial h(g(x))\cdot\partial g(x)=\lbracez\xi:z\in\partial h(g(x)),\
                                                                        \xi\in\partial g(x)\rbrace$$

  共轭函数关系                                                        $$g\in\partial f(x)\iff f(x)+f^*(g)=x^\top g$$；$$f$$ 闭凸时 $$g\in\partial f(x)\iff x\in\partial f^*(g)$$

  软阈值 $$\tfrac12\left\Vert x-a\right\Vert_2^2+\lambda\left\Vert x\right\Vert_1$$   $$0\in\partial f(x^\star)\iff x^\star_i=\operatorname{sgn}(a_i)\max\lbrace\left\vert a_i\right\vert-\lambda,0\rbrace$$
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : 常用函数的次微分速查表（本节各例的汇总） {#tab:subdiff}
