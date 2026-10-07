---
layout: note
kind: note
title: "第 8 章　复合优化算法"
course: optimization
order: 8
date: 2026-10-07
---

# 复合优化算法

本章主要考虑如下**复合优化问题**： $$\begin{equation}
  \min_{x\in\mathbb{R}^n}\ \psi(x)\coloneqq f(x)+h(x),
\end{equation}$$ 其中 $$f(x)$$ 为可微函数（可能非凸），$$h(x)$$ 可能为不可微函数．问题 (8.1) 出现在很多应用领域中，例如压缩感知、图像处理、机器 学习等，如何高效求解该问题是近年来的热门课题．第六章曾利用*光滑化* 的思想处理不可微项 $$h(x)$$，但这种做法没有充分利用 $$h(x)$$ 的性质，在实际 应用中有一定的局限性．本章将介绍若干适用于求解问题 (8.1) 的方法并给出理论性质：首先引入针对 (8.1) 直接求解的 **近似点梯度法**和 **Nesterov 加速算法**（§8.1--8.2）；之后 介绍求解特殊结构复合优化问题的**近似点算法**（§8.3）、**分块 坐标下降法**（§8.4）、**对偶算法**（§8.5）以及**交替方向乘子 法**（§8.6）；最后介绍处理 $$\nabla f(x)$$ 难以精确计算情形的**随机 优化算法**（§8.7）与达到超线性收敛的**半光滑牛顿算法**（§8.8）．

需要注意：许多实际问题并不直接具有本章算法所能处理的形式，需要利用 *拆分、引入辅助变量*等技巧将其等价变形（具体见 §8.4 与 §8.6）． 此外，本章定理证明需要较多第二章的内容，我们默认所有次梯度计算规则的前提 成立（加法、线性变量替换等，见讲义 §2.7.4）------这些前提在绝大多数应用中 都满足．

## 本章前置知识

<div class="prereq">

本章反复使用第 2、5、6 章建立的凸分析工具与数学分析、高等代数的标准结论． 下面把真正会用到的结论集中列出，每条给出公式并注明用途．

1.  **次梯度与最优性条件（§2.7）**：凸函数 $$h$$ 的次微分 $$\partial h(x)=\lbraceg:h(z)\ge h(x)+\left\langle g,\,z-x\right\rangle,\ \forall z\rbrace$$； $$u$$ 极小化 $$\varphi$$ 当且仅当 $$0\in\partial\varphi(u)$$；次微分的 计算规则（加法、仿射复合、示性函数 $$\partial I_C(x)=N_C(x)$$ 法锥）． *用在哪里*：邻近算子与次梯度的关系（定理 8.1）、LASSO/低秩/ 小波模型的近端计算、所有收敛性证明的最优性条件展开．

2.  **强凸函数（命题 2.3）**：$$\varphi$$ 为 $$\mu$$-强凸函数时其最小 值点存在唯一，且 $$\varphi(y)\ge\varphi(x)+\left\langle g,\,y-x\right\rangle+\frac{\mu}{2}\left\Vert y-x\right\Vert^2$$； $$\frac{1}{2}\left\Vert u-x\right\Vert^2$$ 项使近端子问题强凸． *用在哪里*：邻近算子的良定义性（定理 8.1）、PPA 子问题、 近端项强凸化技巧（§7.2.4 已用）．

3.  **梯度利普希茨连续的二次上界（§6.2）**：$$\nabla f$$ 为 $$L$$-利普希茨连续时 $$f(y)\le f(x)+\nabla f(x)^\top(y-x)+\frac{L}{2}\left\Vert y-x\right\Vert^2$$． *用在哪里*：PGA 的收敛性分析（定理 8.3）、FISTA 的收敛性 分析、步长 $$t\le 1/L$$ 的来历．

4.  **凸函数的共轭与 Fenchel 不等式（§2.6）**： $$f^*(y)=\sup_x(x^\top y-f(x))$$，$$f(x)+f^*(y)\ge x^\top y$$； 闭凸函数二次共轭 $$f^{**}=f$$；$$y\in\partial f(x)\iff
            x\in\partial f^*(y)\iff x^\top y=f(x)+f^*(y)$$；范数的共轭是对偶 范数球的示性函数；示性函数的共轭是支撑函数． *用在哪里*：Moreau 分解及其推广（§8.1.1）、支撑函数与范数 的邻近算子计算、对偶算法（§8.5）的对偶函数计算．

5.  **Fenchel--Young 不等式**：对任意 $$\alpha>0$$， $$\begin{equation*}
              x^\top y\le\frac{\alpha}{2}\left\Vert x\right\Vert^2
              +\frac{1}{2\alpha}\left\Vert y\right\Vert_*^2.
    \end{equation*}$$ *用在哪里*：镜像下降与条件梯度法的收敛性分析（§8.1 拓展）， 以及 PDHG 的收敛性分析（§8.5）．

6.  **Weierstrass 定理与强制函数（§5.1）**：适当闭函数在有界 下水平集（或强制性）下取得最小值；最小值点集为非空紧集． *用在哪里*：近端子问题最小值点的存在性（定理 8.1、命题 8.1）， PPA 子问题、ADMM 的子问题求解．

7.  **投影算子（§2.4）**：闭凸集 $$C$$ 上的投影 $$P_C(x)=\operatorname*{arg\,min}_{u\in C}\left\Vert u-x\right\Vert$$ 由 $$\left\langle x-P_C(x),\,z-P_C(x)\right\rangle\le 0\ \forall z\in C$$ 刻画；投影是 示性函数的邻近算子． *用在哪里*：投影梯度法作为 PGA 特例、各类投影的显式公式 （§8.1.1）、ADMM 与 PDHG 的子问题求解．

8.  **矩阵分解与范数**：奇异值分解 $$X=U\operatorname{Diag}(d)V^\top$$，核范数 $$\left\Vert X\right\Vert_*=\sum_i\sigma_i$$，谱范数 $$\left\Vert X\right\Vert_2=\max_i\sigma_i$$； 特征值分解 $$X=\sum_i\lambda_iq_iq_i^\top$$；迹与 Frobenius 内积 $$\left\langle X,\,Y\right\rangle=\operatorname{tr}(X^\top Y)$$． *用在哪里*：核范数球投影（软阈值奇异值）、低秩矩阵恢复的 近端计算、半定规划投影、条件梯度法的矩阵子问题（§8.1 拓展）．

9.  **经典算法的收敛速度**：次梯度法 $$O(1/\sqrt{k})$$（§6.3）、 梯度法凸 $$O(1/k)$$、强凸 Q-线性（§6.2）、增广拉格朗日函数法的 乘子更新与对偶观点（§7.2）． *用在哪里*：本章各算法与它们的对比（PGA 达到 $$O(1/k)$$、 FISTA 达到 $$O(1/k^2)$$、对偶 PGA 是\"对 ALM 的对偶做 PGA\"等）．

10. **数学分析工具**：级数与 telescoping 求和；介值定理； $$O(\cdot)$$、$$o(\cdot)$$ 记号；凸函数上方图与下水平集的闭性 （§2.3）． *用在哪里*：各收敛定理的势函数累加论证、非凸邻近算子的 存在性、半光滑性的定义．

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

本章的逻辑脉络：**邻近算子**是全章的基石------把\"对非光滑项做隐式 梯度步\"变成一个良定义且常可显式计算的子问题（§8.1.1）；**近似点 梯度法**把光滑部分的显式梯度步与非光滑部分的隐式近端步拼接，凸情形达到 $$O(1/k)$$ 且显式保持解的结构（稀疏性等）；**FISTA** 加惯性步把速度 提到 $$O(1/k^2)$$；当 $$h$$ 也无法近端显式计算时，**近似点算法**对整体 $$\psi$$ 做近端迭代；**分块坐标下降**利用变量块结构轮流极小化； **对偶算法**与 **ADMM** 则把\"难算的近端\"转移到对偶空间或分裂 成两个易算的子问题，是大规模问题的主力工具；**随机化**与**半 光滑牛顿**分别处理\"梯度算不动\"与\"要超线性收敛\"两个极端需求．

## 近似点梯度法

在机器学习、图像处理领域中，许多模型包含两部分：一部分是**误差项**， 一般为光滑函数；另外一部分是**正则项**，可能为非光滑函数，用来保证 解的特殊结构．例如最常见的 LASSO 问题就是用 $$\ell_1$$ 范数构造正则项保证 参数稀疏，从而起到筛选变量的作用．由于有非光滑部分，此类问题属于非光滑 优化问题，可以用次梯度算法求解；然而次梯度算法不能充分利用光滑部分的 信息，也很难在迭代中保证非光滑项对应的解的结构信息，收敛往往较慢 （$$O(1/\sqrt{k})$$）．本节介绍求解这类问题非常有效的**近似点梯度 算法**：它充分利用光滑部分的信息，并在迭代过程中显式保证解的结构，达到 与光滑问题梯度算法相近的收敛速度（$$O(1/k)$$）．为讨论简便，主体介绍凸 函数情形，最后一小节简介非凸情形．

### 邻近算子

邻近算子是处理非光滑问题非常有效的工具，与本章几乎所有算法的设计密切 相关（近似点梯度法、近似点算法、ADMM 等）．它并不局限于非光滑函数， 也可以处理光滑函数．

<div class="definition">

**定义 8.1** 对于一个凸函数 $$h$$，定义它的**邻近算子**为 $$\begin{equation}
  \operatorname{prox}_h(x)=\operatorname*{arg\,min}_{u\in\operatorname{dom}h}
  \Bigl\lbraceh(u)+\frac{1}{2}\left\Vert u-x\right\Vert^2\Bigr\rbrace.
\end{equation}$$

</div>

直观理解：邻近算子求解一个*距 $$x$$ 不算太远的点*，并使函数值 $$h(u)$$ 也*相对较小*．一个自然的问题是：(8.2) 中 的优化问题是否有意义，即解是否存在唯一？下面的定理给出肯定的答案．

<div class="theorem">

**定理 8.1** 如果 $$h$$ 是适当的闭凸函数，则对任意的 $$x\in\mathbb{R}^n$$， $$\operatorname{prox}_h(x)$$ 的值存在且唯一．

</div>

**Proof** **（）** 为了简化证明，假设 $$h$$ 至少在定义域内的一点处存在次梯度（一个充分条件 是 $$\operatorname{dom}h$$ 的内点集非空；更复杂的情形可参考 Rockafellar 命题 12.15）． 定义辅助函数 $$\begin{equation}
  m(u)=h(u)+\frac12\left\Vert u-x\right\Vert^2.
\end{equation}$$ 先说明最小值点的*存在性*．因为 $$h$$ 是凸函数且至少在一点 $$v\in\operatorname{dom}h$$ 处存在次梯度 $$\theta\in\partial h(v)$$，所以 $$h$$ 有全局下界： $$\begin{equation}
  h(u)\ge h(v)+\theta^\top(u-v),\qquad \forall u.
\end{equation}$$ 进而 $$\begin{equation}
  m(u)=h(u)+\frac12\left\Vert u-x\right\Vert^2
  \ge h(v)+\theta^\top(u-v)+\frac12\left\Vert u-x\right\Vert^2,
\end{equation}$$ 这表明 $$m(u)$$ 具有*二次下界*，即 $$m$$ 是适当闭函数且具有**强制性** （当 $$\left\Vert u\right\Vert\to+\infty$$ 时 $$m(u)\to+\infty$$）．由推广的 Weierstrass 定理 （第五章定理 5.1）可知 $$m(u)$$ 存在最小值．

再证*唯一性*：$$m(u)$$ 是强凸函数（二次项贡献 $$1$$-强凸），根据强凸 函数最小值唯一的结论（第二章命题 2.3）直接得出最小值唯一．综上 $$\operatorname{prox}_h(x)$$ 是良定义的．

<div class="theorem">

**定理 8.2** 如果 $$h$$ 是适当的闭凸函数，则 $$\begin{equation}
  u=\operatorname{prox}_h(x)\iff x-u\in\partial h(u).
\end{equation}$$

</div>

**Proof** **（）** 若 $$u=\operatorname{prox}_h(x)$$，则由最优性条件得 $$0\in\partial h(u)+(u-x)$$，即 $$x-u\in\partial h(u)$$．

反之，若 $$x-u\in\partial h(u)$$，则由次梯度定义 $$\begin{equation}
  h(v)\ge h(u)+(x-u)^\top(v-u),\qquad \forall v\in\operatorname{dom}h.
\end{equation}$$ 两边同时加 $$\frac12\left\Vert v-x\right\Vert^2$$，利用 $$\left\Vert v-x\right\Vert^2=\left\Vert(v-u)+(u-x)\right\Vert^2
=\left\Vert v-u\right\Vert^2+2(v-u)^\top(u-x)+\left\Vert u-x\right\Vert^2$$，有 $$\begin{align}
  h(v)+\frac12\left\Vert v-x\right\Vert^2
  &\ge h(u)+(x-u)^\top(v-u)+\frac12\left\Vert v-x\right\Vert^2\\
  &=h(u)+\frac12\left\Vert v-u\right\Vert^2+\frac12\left\Vert u-x\right\Vert^2
  \ge h(u)+\frac12\left\Vert u-x\right\Vert^2,
  \qquad \forall v\in\operatorname{dom}h,
\end{align}$$ 因此由定义得 $$u=\operatorname{prox}_h(x)$$．

用 $$th$$ 代替 $$h$$，上面的等价结论形式上可以写成 $$\begin{equation}
  u=\operatorname{prox}_{th}(x)\iff u\in x-t\,\partial h(u).
\end{equation}$$ 邻近算子的计算可以看成是**次梯度算法的隐式格式（后向迭代）**，这实际 是近似点算法的迭代格式（§8.3）．对于非光滑情形，由于次梯度不唯一， 显式格式的迭代并不唯一，而*隐式格式却能得到唯一解*；此外在步长选择 上，隐式格式也优于显式格式（隐式格式对任意 $$t>0$$ 都良定义， 相当于\"自动\"满足了显式格式对步长的限制）．

### 邻近算子的例子

计算邻近算子的过程实际上是在求解一个优化问题．下面给出常见函数的 邻近算子的显式公式（常数 $$t>0$$）：

<div class="example">

**例题 8.1**  

1.  $$\ell_1$$ 范数：$$h(x)=\left\Vert x\right\Vert_1$$，则 $$\begin{equation}
              \operatorname{prox}_{th}(x)=\operatorname{sign}(x)\odot
              \max\lbrace\left\vert x\right\vert-t,\ 0\rbrace,
    \end{equation}$$ 即**软阈值**（soft-thresholding）算子（逐分量）．

2.  $$\ell_2$$ 范数：$$h(x)=\left\Vert x\right\Vert_2$$，则 $$\begin{equation}
              \operatorname{prox}_{th}(x)=
              \begin{cases}
                \Bigl(1-\dfrac{t}{\left\Vert x\right\Vert_2}\Bigr)x, & \left\Vert x\right\Vert_2\ge t,\\[6pt]
                0, & \text{其他}.
              \end{cases}
    \end{equation}$$

3.  二次函数（$$A$$ 对称正定）：$$h(x)=\frac12x^\top Ax+b^\top x+c$$， 则 $$\begin{equation}
              \operatorname{prox}_{th}(x)=(I+tA)^{-1}(x-tb).
    \end{equation}$$

4.  负自然对数的和：$$h(x)=-\sum_{i=1}^n\ln x_i$$，则 $$\begin{equation}
              \bigl(\operatorname{prox}_{th}(x)\bigr)_i
              =\frac{x_i+\sqrt{x_i^2+4t}}{2},\qquad i=1,2,\dots,n.
    \end{equation}$$

</div>

**Proof** 例 (8.1)(1)(2) 的证明**（例 (8.1)(1)(2) 的证明）** (1) 邻近算子 $$u=\operatorname{prox}_{th}(x)$$ 的最优性条件为 $$x-u\in t\partial\left\Vert u\right\Vert_1$$，即 $$\begin{equation}
  x-u\in t\,\partial\left\Vert u\right\Vert_1=
  \begin{cases}
    \lbracet\rbrace,      & u>0,\\
    [-t,t],     & u=0,\\
    \lbrace-t\rbrace,     & u<0.
  \end{cases}
\end{equation}$$ 因此：当 $$x>t$$ 时，$$u=x-t>0$$ 满足 $$x-u=t$$（自洽）；当 $$x<-t$$ 时， $$u=x+t<0$$ 满足 $$x-u=-t$$（自洽）；当 $$x\in[-t,t]$$ 时，$$u=0$$ 满足 $$x\in[-t,t]=t\,\partial\left\Vert0\right\Vert_1$$（自洽）．即 $$u=\operatorname{sign}(x)\max\lbrace\left\vert x\right\vert-t,0\rbrace$$．

\(2\) 最优性条件 $$x-u\in t\partial\left\Vert u\right\Vert_2$$： $$\begin{equation}
  t\,\partial\left\Vert u\right\Vert_2=
  \begin{cases}
    \bigl\lbracet\frac{u}{\left\Vert u\right\Vert_2}\bigr\rbrace, & u\ne 0,\\
    \lbracew:\left\Vert w\right\Vert_2\le t\rbrace,               & u=0.
  \end{cases}
\end{equation}$$ 当 $$\left\Vert x\right\Vert_2>t$$ 时，取 $$u=\bigl(1-\frac{t}{\left\Vert x\right\Vert_2}\bigr)x$$（与 $$x$$ 同方向），则 $$x-u=\frac{t}{\left\Vert x\right\Vert_2}x$$ 且 $$\left\Vert x-u\right\Vert_2=t$$，与 $$t\frac{u}{\left\Vert u\right\Vert_2}=t\frac{x}{\left\Vert x\right\Vert_2}$$ 相等， 条件成立；当 $$\left\Vert x\right\Vert_2\le t$$ 时，取 $$u=0$$，则 $$x\in\lbracew:\left\Vert w\right\Vert_2\le t\rbrace$$ 即条件成立．

（例 (3)：最优性条件 $$u-x+t(Au+b)=0$$，整理即得 $$(I+tA)u=x-tb$$．例 (4)：逐分量求解 $$u_i-x_i-t\cdot\frac{1}{u_i}=0$$，即 $$u_i^2-x_iu_i-t=0$$， 取正根 $$u_i=\frac{x_i+\sqrt{x_i^2+4t}}{2}$$（保证 $$u_i>0$$ 落在 $$\operatorname{dom}h$$ 内）．）

### 邻近算子的运算规则

除了直接利用定义计算，很多时候可以利用已知邻近算子的结果计算其他邻近 算子．

<div class="example">

**例题 8.2** 由邻近算子的定义和基本的计算推导，可得如下运算规则：

1.  **变量的常数倍放缩以及平移**（$$\lambda\ne0$$）： $$h(x)=g(\lambda x+a)$$，则 $$\begin{equation}
              \operatorname{prox}_h(x)=\frac{1}{\lambda}
              \Bigl(\operatorname{prox}_{\lambda^2 g}(\lambda x+a)-a\Bigr);
    \end{equation}$$

2.  **函数（及变量）的常数倍放缩**（$$\lambda>0$$）： $$h(x)=\lambda g\bigl(\frac{x}{\lambda}\bigr)$$，则 $$\begin{equation}
              \operatorname{prox}_h(x)=\lambda\,
              \operatorname{prox}_{\lambda^{-1}g}\Bigl(\frac{x}{\lambda}\Bigr);
    \end{equation}$$

3.  **加上线性函数**：$$h(x)=g(x)+a^\top x$$，则 $$\begin{equation}
              \operatorname{prox}_h(x)=\operatorname{prox}_g(x-a);
    \end{equation}$$

4.  **加上二次项**（$$\upsilon>0$$）：$$h(x)=g(x)+\frac{\upsilon}{2}
            \left\Vert x-a\right\Vert_2^2$$，则 $$\begin{equation}
              \operatorname{prox}_h(x)=\operatorname{prox}_{\theta g}
              \bigl(\theta x+(1-\theta)a\bigr),
              \qquad \theta=\frac{1}{1+\upsilon};
    \end{equation}$$

5.  **向量函数（可分和）**： $$h\bigl(\begin{smallmatrix}x\\ y\end{smallmatrix}\bigr)
            =\varphi_1(x)+\varphi_2(y)$$，则 $$\begin{equation}
              \operatorname{prox}_h\Bigl(\begin{matrix}x\\ y\end{matrix}\Bigr)=
              \begin{pmatrix}\operatorname{prox}_{\varphi_1}(x)\\
              \operatorname{prox}_{\varphi_2}(y)\end{pmatrix}.
    \end{equation}$$

</div>

（推导要点：(1) 做变量替换 $$w=\lambda u+a$$；(2) 目标除以 $$\lambda$$； (3) 最优性条件 $$0\in\partial g(u)+a+u-x$$ 平移；(4) 完全平方配方后按 $$\theta=\frac{1}{1+\upsilon}$$ 改写近端步长；(5) 目标可分故极小点可分． 规则 (1)(2) 结合还可导出 $$\operatorname{prox}_{\lambda g}(x)
=\operatorname{prox}_g$$ 的相应变形，用于 LASSO 中把正则化参数 $$\mu$$ 并入步长 $$t^k\mu$$．）

对于一般的复合函数，很难给出邻近算子的显式解；但当外层函数的邻近算子 有显式解且内层函数是特殊的仿射函数时，求解会容易得多．

<div class="example">

**例题 8.3** 已知函数 $$g(x)$$ 和矩阵 $$A$$，设 $$h(x)=g(Ax+b)$$．一般情形下不能用 $$g$$ 的邻近算子直接计算 $$h$$ 的邻近算子．然而，如果有 $$AA^\top=\frac{1}{\alpha}I$$（$$\alpha>0$$），则 $$\begin{equation}
  \operatorname{prox}_h(x)=(I-\alpha A^\top A)x
  +\alpha A^\top\Bigl(\operatorname{prox}_{\alpha^{-1}g}(Ax+b)-b\Bigr).
\end{equation}$$ 例如，$$h(x_1,x_2,\dots,x_m)=g(x_1+x_2+\dots+x_m)$$ 的邻近算子为 $$\begin{equation}
  \bigl(\operatorname{prox}_h(x)\bigr)_i
  =x_i-\frac{1}{m}\Bigl(\sum_{j=1}^mx_j
  -\operatorname{prox}_{mg}\Bigl(\sum_{j=1}^mx_j\Bigr)\Bigr).
\end{equation}$$

</div>

**Proof** **（）** 考虑如下优化问题： $$\begin{equation}
  \min_{u,y}\ g(y)+\frac12\left\Vert u-x\right\Vert^2
  \ \text{s.t.}\ Au+b=y,
\end{equation}$$ 其解中的 $$u=\operatorname{prox}_h(x)$$（消去约束 $$y=Au+b$$ 即为原问题）． 固定 $$y$$ 对 $$u$$ 求极小值，这是一个到仿射集的投影问题，其解为 $$\begin{equation}
  u=x+A^\top(AA^\top)^{-1}(y-b-Ax)
  =(I-\alpha A^\top A)x+\alpha A^\top(y-b).
\end{equation}$$ （到仿射集 $$\lbraceu:Au=b-y\rbrace$$ 的投影公式，$$\alpha$$ 由 $$AA^\top=\frac1\alpha I$$ 换算：$$A^\top(AA^\top)^{-1}=\alpha A^\top$$．） 将其代入优化问题，目标函数化为 $$\begin{equation}
  g(y)+\frac{\alpha^2}{2}\left\Vert A^\top(y-b-Ax)\right\Vert^2
  =g(y)+\frac{\alpha}{2}\left\Vert y-b-Ax\right\Vert^2,
\end{equation}$$ （最后一步用 $$AA^\top=\frac1\alpha I$$： $$\left\Vert A^\top w\right\Vert^2=w^\top AA^\top w=\frac1\alpha\left\Vert w\right\Vert^2$$．） 由此得到 $$y=\operatorname{prox}_{\alpha^{-1}g}(Ax+b)$$，再代入 $$u$$ 的 表达式即得 (8.21)．

### 投影算子：示性函数的邻近算子

另一种常用的邻近算子是关于**示性函数**的邻近算子．集合 $$C$$ 的示性 函数定义为 $$\begin{equation}
  I_C(x)=
  \begin{cases}
    0,   & x\in C,\\
    +\infty, & \text{其他},
  \end{cases}
\end{equation}$$ 它可以把约束变成目标函数的一部分．

<div class="example">

**例题 8.4** 设 $$C$$ 为 $$\mathbb{R}^n$$ 上的闭凸集，则示性函数 $$I_C$$ 的邻近算子为点 $$x$$ 到 集合 $$C$$ 的投影： $$\begin{equation}
  \operatorname{prox}_{I_C}(x)=\operatorname*{arg\,min}_u\Bigl\lbraceI_C(u)+\frac12\left\Vert u-x\right\Vert^2\Bigr\rbrace
  =\operatorname*{arg\,min}_{u\in C}\left\Vert u-x\right\Vert_2=P_C(x).
\end{equation}$$ 应用定理 8.2 可进一步得到 $$\begin{equation}
  u=P_C(x)\iff x-u\in\partial I_C(u)
  \iff (x-u)^\top(z-u)\le I_C(z)-I_C(u)=0,\quad \forall z\in C.
\end{equation}$$ 此结论有较强的几何意义：若点 $$x$$ 位于 $$C$$ 外部，则从投影点 $$u$$ 指向 $$x$$ 的向量与任意起点为 $$u$$ 且指向 $$C$$ 内部的向量的夹角为直角或钝角（即投影 的\"垂直刻画\"）．

</div>

下面给出 PPT 中列出的常见集合上的投影显式公式，它们在投影梯度法、 ADMM 与 PDHG 的子问题中反复出现．

##### 投影到仿射集

- 超平面 $$C=\lbracex:\ a^\top x=b\rbrace$$（$$a\ne0$$）： $$\begin{equation}
            P_C(x)=x+\frac{b-a^\top x}{\left\Vert a\right\Vert_2^2}\,a;
  \end{equation}$$

- 仿射集 $$C=\lbracex:\ Ax=b\rbrace$$（$$A\in\mathbb{R}^{p\times n}$$， $$\operatorname{rank}(A)=p$$）： $$\begin{equation}
            P_C(x)=x+A^\top(AA^\top)^{-1}(b-Ax),
  \end{equation}$$ 当 $$p\ll n$$ 或 $$AA^\top=I$$ 等情形时计算成本较低．

##### 投影到多面体集

- 半平面 $$C=\lbracex:\ a^\top x\le b\rbrace$$： $$\begin{equation}
            P_C(x)=
            \begin{cases}
              x+\dfrac{b-a^\top x}{\left\Vert a\right\Vert_2^2}\,a, & a^\top x>b,\\[4pt]
              x, & a^\top x\le b;
            \end{cases}
  \end{equation}$$

- 矩形 $$C=[l,u]=\lbracex:\ l\le x\le u\rbrace$$（逐分量）： $$\bigl(P_C(x)\bigr)_i=\max\lbracel_i,\min\lbracex_i,u_i\rbrace\rbrace$$；

- 非负象限 $$C=\mathbb{R}^n_+$$：$$P_C(x)=x^+$$（各分量取 $$\max\lbrace0,x_i\rbrace$$）．

##### 投影到（一般）概率单纯形

$$C=\lbracex:\ \mathbf{1}^\top x=1,\ x\ge0\rbrace$$： $$\begin{equation}
  P_C(x)=(x-\lambda\mathbf{1})^+,
\end{equation}$$ 其中 $$\lambda$$ 是下面方程的解： $$\begin{equation}
  \mathbf{1}^\top(x-\lambda\mathbf{1})^+=\sum_{k=1}^n\max\lbrace0,\ x_k-\lambda\rbrace=1.
\end{equation}$$ 一般的概率单纯形 $$C=\lbracex:\ a^\top x=b,\ l\le x\le u\rbrace$$： $$P_C(x)=P_{[l,u]}(x-\lambda a)$$，其中 $$\lambda$$ 由方程 $$a^\top P_{[l,u]}(x-\lambda a)=b$$ 解出（一维单调求根，可用二分法）．

##### 投影到范数球

- Euclid 球 $$C=\lbracex:\ \left\Vert x\right\Vert_2\le1\rbrace$$： $$\begin{equation}
            P_C(x)=
            \begin{cases}
              \dfrac{1}{\left\Vert x\right\Vert_2}x, & \left\Vert x\right\Vert_2>1,\\[4pt]
              x, & \left\Vert x\right\Vert_2\le1;
            \end{cases}
  \end{equation}$$

- $$\ell_1$$ 范数球 $$C=\lbracex:\ \left\Vert x\right\Vert_1\le1\rbrace$$： $$\bigl(P_C(x)\bigr)_k=\operatorname{sign}(x_k)
          \max\lbrace\left\vert x_k\right\vert-\lambda,0\rbrace$$（软阈值），其中若 $$\left\Vert x\right\Vert_1\le1$$ 则 $$\lambda=0$$；否则 $$\lambda$$ 是方程 $$\sum_{k=1}^n\max\lbrace\left\vert x_k\right\vert-\lambda,0\rbrace=1$$ 的解．

##### 投影到简单锥

- **二阶锥** $$C=\lbrace(x,t)\in\mathbb{R}^n\times\mathbb{R}:\ \left\Vert x\right\Vert_2\le t\rbrace$$： $$\begin{equation}
            P_C(x,t)=
            \begin{cases}
              (x,t), & \left\Vert x\right\Vert_2\le t,\\
              (0,0), & \left\Vert x\right\Vert_2\le -t,\\
              \dfrac{t+\left\Vert x\right\Vert_2}{2}
              \Bigl(\dfrac{x}{\left\Vert x\right\Vert_2},\ 1\Bigr),
              & \left\vert t\right\vert<\left\Vert x\right\Vert_2,\ x\ne0;
            \end{cases}
  \end{equation}$$ 最后一个分支即\"投影到锥面上的 Genero 圆弧点\"： $$P_C(x,t)=\frac{t+\left\Vert x\right\Vert_2}{2}\bigl(\frac{x}{\left\Vert x\right\Vert_2},\,1\bigr)$$ （$$\left\Vert x\right\Vert_2\ge\left\vert t\right\vert$$ 且 $$x\ne0$$）；

- **半正定锥** $$C=\mathcal{S}^{n}_+$$：设 $$X=\sum_{i=1}^n\lambda_iq_iq_i^\top$$ 为特征值分解，则 $$\begin{equation}
            P_{\mathcal{S}^{n}_{+}}(X)=\sum_{i=1}^n\max\lbrace0,\lambda_i\rbrace\,q_iq_i^\top
  \end{equation}$$ （特征值截断，即 §7.2.5 半定规划 ADMM 中用到的投影）．

### Moreau 分解与邻近算子的性质和推广

<div class="proposition">

**命题 8.1** Moreau 分解描述了邻近算子与共轭函数之间的关系： $$\begin{equation}
  x=\operatorname{prox}_h(x)+\operatorname{prox}_{h^*}(x).
\end{equation}$$

</div>

**Proof** **（）** 这来自于邻近算子与次梯度的性质（定理 8.2）与 共轭的次微分关系（$$y\in\partial h(u)\iff u\in\partial h^*(y)$$）： $$\begin{equation}
  u=\operatorname{prox}_h(x)\iff x-u\in\partial h(u)
  \iff u\in\partial h^*(x-u)
  \iff x-u=\operatorname{prox}_{h^*}(x),
\end{equation}$$ 最后一 步用了 $$x-u\in\partial h^*(x-u)\iff x-u=\operatorname{prox}_{h^*}(x)$$ （把 $$h\to h^*$$、$$x\to x-u$$ 的自反关系）．两者相加即得 $$x=\operatorname{prox}_h(x)+\operatorname{prox}_{h^*}(x)$$．

由此可以推出**子空间正交投影的广义分解**：取 $$h=I_L$$（子空间 $$L$$ 的示性函数），则 $$h^*=I_{L^\perp}$$（$$L^\perp$$ 为正交补的示性函数， 因为 $$I_L^*(y)=\sup_{x\in L}y^\top x$$ 在 $$y\in L^\perp$$ 时为 $$0$$、其他 为 $$+\infty$$），于是 $$\begin{equation}
  x=P_L(x)+P_{L^\perp}(x).
\end{equation}$$

<div class="proposition">

**命题 8.2** 对任意的 $$\lambda>0$$，有广义的 Moreau 分解式： $$\begin{equation}
  x=\operatorname{prox}_{\lambda f}(x)
  +\lambda\operatorname{prox}_{\lambda^{-1}f^*}\Bigl(\frac{x}{\lambda}\Bigr).
\end{equation}$$

</div>

**Proof** **（）** 对 $$\lambda f$$ 应用 Moreau 分解： $$\begin{equation}
  x=\operatorname{prox}_{\lambda f}(x)+\operatorname{prox}_{(\lambda f)^*}(x)
  =\operatorname{prox}_{\lambda f}(x)
  +\lambda\operatorname{prox}_{\lambda^{-1}f^*}\Bigl(\frac{x}{\lambda}\Bigr),
\end{equation}$$ 第二步运用了共轭函数的性质 $$(\lambda f)^*(y)=\lambda f^*(y/\lambda)$$．

Moreau 分解使得一大批函数的邻近算子可以*借投影算子*计算：

<div class="example">

**例题 8.5** 支撑函数的共轭（在闭凸集上）是示性函数： $$\begin{equation}
  f(x)=S_C(x)=\sup_{y\in C}x^\top y,
  \qquad
  f^*(y)=I_C(y).
\end{equation}$$ 由广义 Moreau 分解，支撑函数的邻近算子可以通过投影计算： $$\begin{equation}
  \operatorname{prox}_{tf}(x)=x-t\,\operatorname{prox}_{t^{-1}f^*}(x/t)
  =x-t\,P_C(x/t).
\end{equation}$$ *例子*：$$f(x)$$ 为 $$x$$ 最大的 $$r$$ 个分量之和，即 $$f(x)=x_{[1]}+\dots+x_{[r]}=S_C(x)$$，其中 $$C=\lbracey:\ 0\le y\le1,\ \mathbf{1}^\top y=r\rbrace$$（超矩形与单纯形的交）， 其邻近算子由到 $$C$$ 的投影给出．

</div>

<div class="example">

**例题 8.6** 范数的共轭是对偶范数球的示性函数：$$f(x)=\left\Vert c\right\Vert$$ （$$f^*(x)=I_B(x)$$，$$B=\lbracey:\left\Vert y\right\Vert_*\le1\rbrace$$），故 $$\begin{equation}
  \operatorname{prox}_{tf}(x)=x-t\,P_B(x/t)=x-P_{tB}(x).
\end{equation}$$ 当 $$tB=\lbracex:\left\Vert x\right\Vert\le t\rbrace$$ 容易计算时（如 $$\ell_2$$ 范数球），可用该 公式高效计算 $$\operatorname{prox}_{t\left\Vert\cdot\right\Vert}$$． *单点距离*：$$f(x)=\left\Vert x-a\right\Vert$$ 的邻近算子由平移规则得 $$\begin{equation}
  \operatorname{prox}_{tf}(x)=a+\operatorname{prox}_{t\left\Vert\cdot\right\Vert}(x-a)
  =x-P_{tB}(x-a).
\end{equation}$$

</div>

<div class="example">

**例题 8.7** Euclid 距离（对闭凸集 $$C$$）$$d(x)=\inf_{y\in C}\left\Vert x-y\right\Vert_2$$ 的邻近算子： $$\begin{equation}
  \operatorname{prox}_{td}(x)=\theta P_C(x)+(1-\theta)x,
  \qquad
  \theta=
  \begin{cases}
    t/d(x), & d(x)\ge t,\\
    1,      & \text{其他};
  \end{cases}
\end{equation}$$ 平方距离的邻近算子：$$f(x)=d(x)^2/2$$， $$\begin{equation}
  \operatorname{prox}_{tf}(x)=\frac{1}{1+t}\,x
  +\frac{t}{1+t}\,P_C(x).
\end{equation}$$

</div>

**Proof** 例 8.7 中 $$\operatorname{prox}_{td}$$ 表达式的证明**（例 8.7 中 $$\operatorname{prox}_{td}$$ 表达式的证明）** 若 $$u=\operatorname{prox}_{td}(x)\notin C$$，则 $$u$$ 是 $$\min_u\ d(u)+\frac{1}{2t}\left\Vert u-x\right\Vert^2$$ 的极小点且约束不起作用，由最优性 条件（$$d(u)$$ 在 $$u\notin C$$ 处可微且 $$\nabla d(u)=\frac{u-P_C(u)}{d(u)}$$）： $$\begin{equation}
  x-u=\frac{t}{d(u)}\bigl(u-P_C(u)\bigr).
\end{equation}$$ 由此可推出 $$P_C(u)=P_C(x)$$（对上式两边到 $$C$$ 投影：投影算子的非膨胀性 给出 $$u-P_C(u)$$ 方向指向投影点）、$$d(x)\ge t$$，且 $$u$$ 是 $$x$$ 和 $$P_C(x)$$ 的加权平均（权重 $$\theta=t/d(x)$$）． 若 $$u\in C$$ 最小化 $$d(u)+\frac{1}{2t}\left\Vert u-x\right\Vert^2$$，等价于最小化 $$\frac{1}{2t}\left\Vert u-x\right\Vert^2$$，即得 $$u=P_C(x)$$．

**Proof** 例 8.7 中 $$\operatorname{prox}_{tf}$$ （$$f(x)=d(x)^2/2$$）表达式的证明**（例 8.7 中 $$\operatorname{prox}_{tf}$$ （$$f(x)=d(x)^2/2$$）表达式的证明）** $$\begin{equation}
  \operatorname{prox}_{tf}(x)=\operatorname*{arg\,min}_u
  \Bigl\lbrace\frac12d(u)^2+\frac{1}{2t}\left\Vert u-x\right\Vert_2^2\Bigr\rbrace
  =\operatorname*{arg\,min}_u\ \inf_{v\in C}
  \Bigl\lbrace\frac12\left\Vert u-v\right\Vert_2^2+\frac{1}{2t}\left\Vert u-x\right\Vert_2^2\Bigr\rbrace.
\end{equation}$$ 最优的 $$u$$ 可以看成 $$v$$ 的函数（对 $$u$$ 求梯度置零）： $$\begin{equation}
  u=\frac{t}{t+1}v+\frac{1}{t+1}x.
\end{equation}$$ 最优的 $$v$$ 在集合 $$C$$ 上极小化 $$\begin{equation}
  \frac12\left\Vert\frac{t}{t+1}v+\frac{1}{t+1}x-v\right\Vert_2^2
  +\frac{1}{2t}\left\Vert\frac{t}{t+1}v+\frac{1}{t+1}x-x\right\Vert_2^2
  =\frac{1}{2(1+t)}\left\Vert v-x\right\Vert_2^2,
\end{equation}$$ 由此即得 $$v=P_C(x)$$，代回 $$u$$ 的表达式即得结论．

### 近似点梯度法

下面引入本节的重点------近似点梯度算法．考虑复合优化问题 $$\begin{equation}
  \min_{x}\ \psi(x)=f(x)+h(x),
\end{equation}$$ 其中 $$f$$ 为可微函数且 $$\operatorname{dom}f=\mathbb{R}^n$$，$$h$$ 为凸函数（可以非光滑），并且 一般计算此项的邻近算子并不复杂．比如 LASSO 问题，两项分别为 $$f(x)=\frac12\left\Vert Ax-b\right\Vert^2$$，$$h(x)=\mu\left\Vert x\right\Vert_1$$．一般的带凸集约束的 优化问题也可以用 (8.52) 表示：对 $$\min_{x\in C}\varphi(x)$$，取 $$f=\varphi$$，$$h=I_C$$（示性函数）．

近似点梯度法的思想非常简单：对光滑部分 $$f$$ 做*梯度下降*，对非光滑 部分 $$h$$ 使用*邻近算子*，迭代公式为 $$\begin{equation}
  x^{k+1}=\operatorname{prox}_{t^kh}\bigl(x^k-t^k\nabla f(x^k)\bigr),
\end{equation}$$ 其中 $$t^k>0$$ 为步长，可取常数或由线搜索得出．近似点梯度法与众多算法 联系紧密：当 $$h=0$$ 时退化为**梯度下降法** $$x^{k+1}=x^k-t^k\nabla f(x^k)$$；当 $$h=I_C$$ 时退化为**投影梯度法** $$x^{k+1}=P_C(x^k-t^k\nabla f(x^k))$$．

<div class="algorithm">

**算法 21**

**输入**：函数 $$f(x),h(x)$$，初始点 $$x^0$$，$$k=0$$．

<div class="algorithmic">

$$x^{k+1}=\operatorname{prox}_{t^kh}\bigl(x^k-t^k\nabla f(x^k)\bigr)$$； $$k\leftarrow k+1$$；

</div>

</div>

##### 如何理解近似点梯度法？

根据邻近算子的定义，把迭代公式展开： $$\begin{align}
  x^{k+1}&=\operatorname*{arg\,min}_u
  \Bigl\lbraceh(u)+\frac{1}{2t^k}\left\Vert u-x^k+t^k\nabla f(x^k)\right\Vert^2\Bigr\rbrace\\
  &=\operatorname*{arg\,min}_u
  \Bigl\lbraceh(u)+f(x^k)+\nabla f(x^k)^\top(u-x^k)
  +\frac{1}{2t^k}\left\Vert u-x^k\right\Vert^2\Bigr\rbrace,
\end{align}$$ 即近似点梯度法实质上是*将光滑部分线性展开、加上二次项、保留非光滑 部分*，求极小作为每一步的估计．此外，根据定理 8.2 的 (8.9)，近似点梯度算法可以形式上写成 $$\begin{equation}
  x^{k+1}=x^k-t^k\nabla f(x^k)-t^kg^k,
  \qquad g^k\in\partial h(x^{k+1}),
\end{equation}$$ 本质上是对光滑部分做*显式*的梯度下降，关于非光滑部分做*隐式*的 梯度下降．

##### 步长选取

当 $$f$$ 为梯度 $$L$$-利普希茨连续函数时，可取固定步长 $$t^k=t\le\frac1L$$． 当 $$L$$ 未知时可使用线搜索准则 $$\begin{equation}
  f(x^{k+1})\le f(x^k)+\nabla f(x^k)^\top(x^{k+1}-x^k)
  +\frac{1}{2t^k}\left\Vert x^{k+1}-x^k\right\Vert^2.
\end{equation}$$ （其合理性将在收敛性分析中解释．）此外，还可利用 BB 步长作为 $$t^k$$ 的 初始估计并用**非单调线搜索**准则进行校正：由于 $$\psi$$ 不可微，BB 步长中的 $$y^{k-1}$$ 应使用光滑部分的梯度 $$\nabla f(x^k)$$ 与 $$\nabla f(x^{k-1})$$ 计算；仿照第六章的非单调准则可构造 $$\begin{equation}
  \psi(x^{k+1})\le C^k-\frac{c_1}{2t^k}\left\Vert x^{k+1}-x^k\right\Vert^2,
\end{equation}$$ 其中 $$c_1\in(0,1)$$，$$C^k$$ 的定义同第六章（注意定义 $$C^k$$ 时需使用整体 函数值 $$\psi(x^k)$$）．

### 应用举例

##### 1. LASSO 问题求解

考虑 LASSO 问题 $$\min_x\ \mu\left\Vert x\right\Vert_1+\frac12\left\Vert Ax-b\right\Vert^2$$．令 $$f(x)=\frac12\left\Vert Ax-b\right\Vert^2$$，$$h(x)=\mu\left\Vert x\right\Vert_1$$，则 $$\begin{equation}
  \nabla f(x)=A^\top(Ax-b),
  \qquad
  \operatorname{prox}_{t^kh}(x)=\operatorname{sign}(x)\odot
  \max\lbrace\left\vert x\right\vert-t^k\mu,\ 0\rbrace.
\end{equation}$$ 迭代格式为 $$\begin{equation}
  \begin{aligned}
    y^k&=x^k-t^kA^\top(Ax^k-b),\\
    x^{k+1}&=\operatorname{sign}(y^k)\odot\max\lbrace\left\vert y^k\right\vert-t^k\mu,\ 0\rbrace,
  \end{aligned}
\end{equation}$$ 即第一步做*梯度下降*，第二步做*收缩*．特别地，收缩算子保证了 迭代过程中解的*稀疏结构*------这解释了近似点梯度法效果好的原因． 数值实验（与 §6.2 相同的 $$A,b$$，$$\mu=10^{-3}$$，连续化策略，固定步长 $$t=1/L$$（$$L=\lambda_{\max}(A^\top A)$$）与结合线搜索的 BB 步长对比）表明： 结合线搜索的 BB 步长能显著提高收敛速度，且比 §6.2 的光滑化梯度法 收敛得更快（讲义图 8.1）．

##### 2. 低秩矩阵恢复

考虑低秩矩阵恢复模型（§1.3 的 (1.3.3)）： $$\begin{equation}
  \min_{X\in\mathbb{R}^{m\times n}}\ \mu\left\Vert X\right\Vert_*
  +\frac12\sum_{(i,j)\in\Omega}(X_{ij}-M_{ij})^2,
\end{equation}$$ 其中 $$M$$ 是待恢复的低秩矩阵，只知道其在下标集 $$\Omega$$ 上的值．令 $$\begin{equation}
  f(X)=\frac12\sum_{(i,j)\in\Omega}(X_{ij}-M_{ij})^2,
  \qquad h(X)=\mu\left\Vert X\right\Vert_*,
\end{equation}$$ 定义矩阵 $$P\in\mathbb{R}^{m\times n}$$：$$P_{ij}=1$$ 若 $$(i,j)\in\Omega$$，否则 $$P_{ij}=0$$，则 $$\begin{equation}
  f(X)=\frac12\left\Vert P\odot(X-M)\right\Vert_F^2,
  \qquad
  \nabla f(X)=P\odot(X-M),
\end{equation}$$ 且核范数的邻近算子为**奇异值软阈值**：设 $$X=U\operatorname{Diag}(d)V^\top$$ 为 （约化）奇异值分解，则 $$\begin{equation}
  \operatorname{prox}_{t^kh}(X)
  =U\operatorname{Diag}\bigl(\max\lbrace\left\vert d\right\vert-t^k\mu,\ 0\rbrace\bigr)V^\top.
\end{equation}$$ 近似点梯度法的迭代格式为 $$\begin{equation}
  Y^k=X^k-t^kP\odot(X^k-M),
  \qquad
  X^{k+1}=\operatorname{prox}_{t^kh}(Y^k).
\end{equation}$$

##### 3. 小波模型求解

考虑小波分解模型 $$\begin{equation}
  \min_u\ \left\Vert\lambda\odot(Wu)\right\Vert_1+\frac12\left\Vert Au-b\right\Vert^2,
\end{equation}$$ 其中 $$W\in\mathbb{R}^{m\times n}$$ 是**紧小波框架算子**（$$W^\top W=I$$）． 利用紧框架性质引入 $$d=Wu$$（则 $$u=W^\top d$$），得到**合成模型**： $$\begin{equation}
  \min_d\ \left\Vert\lambda\odot d\right\Vert_1+\frac12\left\Vert AW^\top d-b\right\Vert^2.
\end{equation}$$ 令 $$f(d)=\frac12\left\Vert AW^\top d-b\right\Vert^2$$，$$h(d)=\left\Vert\lambda\odot d\right\Vert_1$$，则 $$\begin{equation}
  \nabla f(d)=WA^\top(AW^\top d-b),
  \qquad
  \operatorname{prox}_{t^kh}(d)=\operatorname{sign}(d)\odot
  \max\lbrace\left\vert d\right\vert-t^k\lambda,\ 0\rbrace,
\end{equation}$$ 迭代格式为 $$\begin{equation}
  y^k=d^k-t^kWA^\top(AW^\top d^k-b),
  \qquad
  d^{k+1}=\operatorname{sign}(y^k)\odot\max\lbrace\left\vert y^k\right\vert-t^k\lambda,0\rbrace.
\end{equation}$$

##### 4. 平衡小波模型求解

平衡小波模型是图像处理领域的重要模型： $$\begin{equation}
  \min_\alpha\ \left\Vert\lambda\odot\alpha\right\Vert_1
  +\frac{\kappa}{2}\left\Vert(I-WW^\top)\alpha\right\Vert^2
  +\frac12\left\Vert AW^\top\alpha-b\right\Vert^2,
\end{equation}$$ 它*不要求* $$W$$ 是紧框架（$$W^\top W=I$$ 不必成立）．令 $$\begin{equation}
  f(\alpha)=\frac{\kappa}{2}\left\Vert(I-WW^\top)\alpha\right\Vert^2
  +\frac12\left\Vert AW^\top\alpha-b\right\Vert^2,
  \qquad h(\alpha)=\left\Vert\lambda\odot\alpha\right\Vert_1,
\end{equation}$$ 则 $$\begin{equation}
  \nabla f(\alpha)=\kappa(I-WW^\top)\alpha
  +WA^\top(AW^\top\alpha-b),
\end{equation}$$ 迭代格式为 $$\begin{equation}
  y^k=\alpha^k-t^k\bigl(\kappa(I-WW^\top)\alpha^k
  +WA^\top(AW^\top\alpha^k-b)\bigr),
  \qquad
  \alpha^{k+1}=\operatorname{sign}(y^k)\odot
  \max\lbrace\left\vert y^k\right\vert-t^k\lambda,0\rbrace.
\end{equation}$$

### 收敛性分析

在提出近似点梯度算法时只要求 $$f$$ 可微，但收敛性分析要求 $$f$$ 也是凸函数．

PGA 的收敛性假设**（PGA 的收敛性假设）**  

1.  $$f$$ 在其定义域 $$\operatorname{dom}f=\mathbb{R}^n$$ 内为凸的；$$\nabla f$$ 在常数 $$L$$ 意义下利普希茨连续：$$\left\Vert\nabla f(x)-\nabla f(y)\right\Vert\le
            L\left\Vert x-y\right\Vert\ \forall x,y$$；

2.  $$h$$ 是适当的闭凸函数（因此 $$\operatorname{prox}_{th}$$ 良定义）；

3.  $$\psi(x)=f(x)+h(x)$$ 的最小值 $$\psi^*$$ 有限且在某点 $$x^*$$ 处 取到（不要求唯一）．

在定步长 $$t^k\in(0,\frac1L]$$ 下，迭代点处的函数值 $$\psi(x^k)$$ 以 $$O(\frac1k)$$ 的速率收敛到 $$\psi^*$$．正式分析前先引入一个新函数：

<div class="definition">

**定义 8.2** 设 $$f,h$$ 满足假设 8.3.8，$$t>0$$，定义**梯度映射**为 $$\begin{equation}
  G_t(x)=\frac1t\Bigl(x-\operatorname{prox}_{th}\bigl(x-t\nabla f(x)\bigr)\Bigr).
\end{equation}$$

</div>

$$G_t(x)$$ 是近似点梯度法每次迭代中*负的\"搜索方向\"*： $$\begin{equation}
  x^{k+1}=\operatorname{prox}_{th}\bigl(x^k-t\nabla f(x^k)\bigr)
  =x^k-tG_t(x^k).
\end{equation}$$ 注意 $$G_t(x)$$ 并不是 $$\psi=f+h$$ 的梯度或次梯度；但由邻近算子与次梯度的 关系可得 $$\begin{equation}
  G_t(x)-\nabla f(x)\in\partial h\bigl(x-tG_t(x)\bigr).
\end{equation}$$ 此外 $$G_t(x)=0$$ 当且仅当 $$x$$ 为 $$\psi$$ 的最小值点------因此 $$\mathop{\mathrm{dist}}(0,G_t(x))$$ 可以作为非光滑问题的**稳定性度量**．

<div class="theorem">

**定理 8.3** 在假设 8.3.8 下，取定步长 $$t^k=t\in(0,\frac1L]$$，设 $$\lbracex^k\rbrace$$ 由迭代格式 (8.53) 产生，则 $$\begin{equation}
  \psi(x^k)-\psi^*\le\frac{1}{2kt}\left\Vert x^0-x^*\right\Vert^2.
\end{equation}$$

</div>

**Proof** **（）** 利用利普希茨连续的二次上界（§6.2）： $$\begin{equation}
  f(y)\le f(x)+\nabla f(x)^\top(y-x)+\frac{L}{2}\left\Vert y-x\right\Vert^2,
  \qquad \forall x,y.
\end{equation}$$ 令 $$y=x-tG_t(x)$$，有 $$\begin{equation}
  f\bigl(x-tG_t(x)\bigr)\le f(x)-t\nabla f(x)^\top G_t(x)
  +\frac{t^2L}{2}\left\Vert G_t(x)\right\Vert^2.
\end{equation}$$ 若 $$0<t\le\frac1L$$，则 $$\begin{equation}
  f\bigl(x-tG_t(x)\bigr)\le f(x)-t\nabla f(x)^\top G_t(x)
  +\frac{t}{2}\left\Vert G_t(x)\right\Vert^2.
\end{equation}$$ 此外，由 $$f,h$$ 为凸函数，对任意 $$z\in\operatorname{dom}\psi$$： $$\begin{align}
  h(z)&\ge h\bigl(x-tG_t(x)\bigr)
  +\bigl(G_t(x)-\nabla f(x)\bigr)^\top\bigl(z-x+tG_t(x)\bigr),
  \\
  f(z)&\ge f(x)+\nabla f(x)^\top(z-x),
\end{align}$$ 其中 (8.80) 利用了次梯度关系 (8.75)（$$G_t(x)-\nabla f(x)$$ 是 $$h$$ 在点 $$x-tG_t(x)$$ 处的次梯度）．整理 (8.80) 得 $$\begin{equation}
  h\bigl(x-tG_t(x)\bigr)\le h(z)
  -\bigl(G_t(x)-\nabla f(x)\bigr)^\top\bigl(z-x+tG_t(x)\bigr).
\end{equation}$$ 将 (8.79)、上式与 (8.81) 相加 （$$\nabla f^\top G_t$$ 与 $$\pm\nabla f^\top(z-x)$$、$$\pm G_t^\top$$ 相关项 相消），可得对任意 $$z\in\operatorname{dom}\psi$$： $$\begin{equation}
  \psi\bigl(x-tG_t(x)\bigr)\le\psi(z)
  +G_t(x)^\top(x-z)-\frac{t}{2}\left\Vert G_t(x)\right\Vert^2.
\end{equation}$$ 记 $$\tilde x=x-tG_t(x)$$．在全局不等式 (8.83) 中取 $$z=x^*$$： $$\begin{align}
  \psi(\tilde x)-\psi^*
  &\le G_t(x)^\top(x-x^*)-\frac{t}{2}\left\Vert G_t(x)\right\Vert^2\\
  &=\frac{1}{2t}\Bigl(\left\Vert x-x^*\right\Vert^2-\left\Vert x-x^*-tG_t(x)\right\Vert^2\Bigr)
  =\frac{1}{2t}\Bigl(\left\Vert x-x^*\right\Vert^2-\left\Vert\tilde x-x^*\right\Vert^2\Bigr).
\end{align}$$ （最后一步用了恒等式 $$2tG^\top(x-x^*)-t^2\left\Vert G\right\Vert^2
=\left\Vert x-x^*\right\Vert^2-\left\Vert x-tG-x^*\right\Vert^2$$ 的展开．） 分别取 $$x=x^{i-1}$$，$$\tilde x=x^i$$，$$t=t^i=\frac1L$$，$$i=1,2,\dots,k$$， 代入 (8.84) 并累加： $$\begin{equation}
  \sum_{i=1}^{k}\bigl(\psi(x^i)-\psi^*\bigr)
  \le\frac{1}{2t}\sum_{i=1}^{k}
  \bigl(\left\Vert x^{i-1}-x^*\right\Vert^2-\left\Vert x^i-x^*\right\Vert^2\bigr)
  \le\frac{1}{2t}\left\Vert x^0-x^*\right\Vert^2.
\end{equation}$$ 注意到在 (8.83) 中取 $$z=x$$ 即得算法是*下降法*： $$\begin{equation}
  \psi(\tilde x)\le\psi(x)-\frac{t}{2}\left\Vert G_t(x)\right\Vert^2,
\end{equation}$$ 即 $$\psi(x^i)$$ 非增，因此 $$\begin{equation}
  \psi(x^k)-\psi^*\le\frac1k\sum_{i=1}^{k}\bigl(\psi(x^i)-\psi^*\bigr)
  \le\frac{1}{2kt}\left\Vert x^0-x^*\right\Vert^2.
\end{equation}$$

<div class="theorem">

**定理 8.4** 在假设 8.3.8 下，从某个 $$t=\hat t>0$$ 开始回溯 （$$t\leftarrow\beta t$$，$$\beta\in(0,1)$$）直到满足 $$\begin{equation}
  f\bigl(x-tG_t(x)\bigr)\le f(x)-t\nabla f(x)^\top G_t(x)
  +\frac{t}{2}\left\Vert G_t(x)\right\Vert^2,
\end{equation}$$ 设 $$\lbracex^k\rbrace$$ 由迭代格式 (8.53) 产生，则 $$\begin{equation}
  \psi(x^k)-\psi^*\le
  \frac{1}{2k\min\lbrace\hat t,\ \beta/L\rbrace}\left\Vert x^0-x^*\right\Vert^2.
\end{equation}$$

</div>

**Proof** **（）** 由定理 8.3 的证明，当 $$0<t\le\frac1L$$ 时不等式 (8.88) 成立，因此由线搜索所得的步长应满足 $$t\ge t_{\min}=\min\lbrace\hat t,\frac\beta L\rbrace$$．利用同样的证明方法： $$\psi(x^i)<\psi(x^{i-1})$$，且 $$\begin{equation}
  \psi(x^i)-\psi^*\le\frac{1}{2t_{\min}}
  \bigl(\left\Vert x^{i-1}-x^*\right\Vert^2-\left\Vert x^i-x^*\right\Vert^2\bigr).
\end{equation}$$ 从 $$i=1$$ 到 $$k$$ 累加，并利用 $$\psi(x^i)$$ 非增，可得 $$\psi(x^k)-\psi^*\le\frac{1}{2kt_{\min}}\left\Vert x^0-x^*\right\Vert^2$$．

线搜索准则 (8.56) 的合理性**（线搜索准则 (8.56) 的合理性）** 回溯条件 (8.88) 与前文给出的线搜索准则 (8.56) 等价（两者相差一个 $$t$$ 的因子且 $$x^{k+1}-x^k=-tG_t(x)$$），这说明准则 (8.56) 恰好保证了 二次上界所需的 $$t\le 1/L$$ 的作用------这就是 (8.56) 选取 的依据．

### 非凸函数的邻近算子与近似点梯度法

<div class="supp">

作为拓展，简介对一般非凸函数如何定义邻近算子及其简单性质，并给出非凸 情形近似点梯度法的结构．

</div>

当 $$h$$ 为非凸函数时，近端子问题的最小值点唯一性一般不能保证，但至少 可以保证存在性，因此对非凸函数定义邻近算子是可行的．对有下界的适当闭 函数：

<div class="definition">

**定义 8.3** 设 $$h$$ 是适当闭函数且具有有限下界，即 $$\inf_{x\in\operatorname{dom}h}h(x)>-\infty$$，定义 $$h$$ 的邻近算子为 $$\begin{equation}
  \operatorname{prox}_h(x)=\operatorname*{arg\,min}_{u\in\operatorname{dom}h}
  \Bigl\lbraceh(u)+\frac12\left\Vert u-x\right\Vert^2\Bigr\rbrace.
\end{equation}$$

</div>

与凸函数情形不同的是：非凸函数的邻近算子是一个**集合函数**，即 $$\operatorname{prox}_h(x)$$ 是一个集合（凸情形由存在唯一性它只含一个 点）．非凸的 $$\operatorname{prox}_h$$ 也是良定义的：

<div class="proposition">

**命题 8.3** 设 $$h$$ 是适当闭函数且 $$\inf_{x\in\operatorname{dom}h}h(x)>-\infty$$，则对任意的 $$x\in\operatorname{dom}h$$，$$\operatorname{prox}_h(x)$$ 是 $$\mathbb{R}^n$$ 上的非空紧集．

</div>

**Proof** **（）** 定义 $$g(u)=h(u)+\frac12\left\Vert u-x\right\Vert^2$$，设 $$\inf_{x\in\operatorname{dom}h}h(x)=l$$．取 $$u^0\in\operatorname{dom}h$$，由于二次函数 $$\frac12\left\Vert u-x\right\Vert^2$$ 无上界，因此存在 $$R>0$$，使得当 $$\left\Vert u-x\right\Vert>R$$ 时 $$\begin{equation}
  \frac12\left\Vert u-x\right\Vert^2>g(u^0)-l
  \quad\Longrightarrow\quad
  g(u)>g(u^0).
\end{equation}$$ 这说明下水平集 $$\lbraceu:\ g(u)\le g(u^0)\rbrace$$ 含于球 $$\left\Vert u-x\right\Vert\le R$$ 内， 即 $$g$$ 有一个非空有界下水平集；显然 $$g$$ 是闭函数，由推广的 Weierstrass 定理可知 $$g$$ 的最小值点集合 $$\operatorname{prox}_h(x)$$ 是非空紧集．

对凸函数 $$h$$ 有最优性条件 $$u=\operatorname{prox}_h(x)\iff
x-u\in\partial h(u)$$．非凸情形下，由于 $$0\in\partial h(x^*)$$ 不能保证 $$x^*$$ 是局部极小点，通常把满足 $$0\in\partial h(x)$$ 的点称为 $$h$$ 的 **临界点（稳定点）**．由一阶必要条件容易得出：

<div class="corollary">

**推论 8.1** 设 $$h$$ 是适当闭函数且有下界，$$u\in\operatorname{prox}_h(x)$$，则 $$\begin{equation}
  x-u\in\partial h(u).
\end{equation}$$

</div>

**Proof** **（）** 容易计算 $$g(v)=h(v)+\frac12\left\Vert v-x\right\Vert^2$$ 的次微分（第五章定义 5.3 的 Fréchet 次微分）为 $$\begin{equation}
  \partial g(v)=\partial h(v)+\lbracev-x\rbrace,
\end{equation}$$ 其中 \"$$+$$\" 表示集合间的加法．根据 $$u$$ 的定义及第五章定理 5.7（无约束 问题一阶必要条件）： $$\begin{equation}
  0\in\partial g(u)=\partial h(u)+\lbraceu-x\rbrace,
\end{equation}$$ 即 $$x-u\in\partial h(u)$$．

推论 8.1 说明非凸情形下也有类似定理 8.2 的性质，这在分析非凸算法收敛性时有很大帮助 （§8.4 分块坐标下降法的收敛性分析将用到）．

对复合问题 $$\min_x\psi(x)=f(x)+h(x)$$（$$f$$ 可微，$$h$$ 为适当闭函数， 可非凸），非凸近似点梯度法为 $$\begin{equation}
  x^{k+1}\in\operatorname{prox}_{t^kh}\bigl(x^k-t^k\nabla f(x^k)\bigr),
\end{equation}$$ 迭代时往往选取 $$\operatorname{prox}_{t^kh}$$ 中的一个元素；此时算法也 具有收敛性，其收敛性是**分块坐标下降法收敛性的特殊情形** （§8.4）．

### 拓展：更多一阶算法

<div class="supp">

以下三个算法是 PPT 的拓展内容，讲义正文未展开；它们与近似点梯度法 关系密切，整理如下供复习．

</div>

##### 1. 镜像下降算法（mirror descent）

考虑凸优化问题 $$\min_x f(x)\ \ \text{s.t.}\ \ x\in C$$（$$f$$ 凸，$$C$$ 是 $$\operatorname{dom}f$$ 的 凸子集且 $$f$$ 在 $$C$$ 上存在次梯度）．令 $$r$$ 为可微凸函数，由 $$r$$ 产生的 **Bregman 距离**为 $$\begin{equation}
  D_r(y,x)=r(y)-r(x)-\nabla r(x)^\top(y-x).
\end{equation}$$ **镜像（非线性）次梯度方法**：取次梯度 $$g^k\in\partial f(x^k)$$，更新 $$\begin{equation}
  x^{k+1}=\operatorname*{arg\,min}_{x\in C}
  \Bigl\lbraceg^{k\top}(x-x^k)+\frac{1}{\alpha^k}D_r(x,x^k)\Bigr\rbrace.
\end{equation}$$ 取 $$r(x)=\frac12\left\Vert x\right\Vert_2^2$$ 时，$$D_r(y,x)=\frac12\left\Vert y-x\right\Vert^2$$，该算法 就是（投影）次梯度法．

收敛性分析要求 $$r$$ 在范数 $$\left\Vert\cdot\right\Vert$$ 意义下**强凸**： $$\begin{equation}
  r(y)\ge r(x)+\nabla r(x)^\top(y-x)+\frac12\left\Vert x-y\right\Vert^2.
\end{equation}$$ 对任意 $$x^*\in C$$，由 $$x^{k+1}$$ 处的最优性条件 $$\begin{equation}
  \bigl(\alpha^kg^k+\nabla r(x^{k+1})-\nabla r(x^k)\bigr)^\top
  \bigl(y-x^{k+1}\bigr)\ge0,\qquad \forall y\in C,
\end{equation}$$ 取 $$y=x^*$$ 得 $$\bigl(g^k\bigr)^\top(x^{k+1}-x^*)\le\frac{1}{\alpha^k}
\bigl(\nabla r(x^{k+1})-\nabla r(x^k)\bigr)^\top(x^*-x^{k+1})$$，再利用 三点恒等式 $$\begin{equation}
  \bigl(\nabla r(x^{k+1})-\nabla r(x^k)\bigr)^\top(x^*-x^{k+1})
  =D_r(x^*,x^k)-D_r(x^*,x^{k+1})-D_r(x^k,x^{k+1}),
\end{equation}$$ 综合整理并对交叉项应用 Fenchel--Young 不等式 $$x^\top y\le\frac{\alpha}{2}\left\Vert x\right\Vert^2+\frac{1}{2\alpha}\left\Vert y\right\Vert_*^2$$： $$\begin{align}
  f(x^k)-f(x^*)&\le\bigl(g^k\bigr)^\top(x^{k+1}-x^*)
  +\bigl(g^k\bigr)^\top(x^k-x^{k+1})\\
  &\le\frac{1}{\alpha^k}
  \bigl[D_r(x^*,x^k)-D_r(x^*,x^{k+1})\bigr]
  +\frac{\alpha^k}{2}\left\Vert g^k\right\Vert_*^2,
\end{align}$$ （中间的 $$-\frac{1}{\alpha^k}D_r(x^k,x^{k+1})$$ 与交叉项 $$\frac{1}{2\alpha^k}\left\Vert x^k-x^{k+1}\right\Vert^2$$ 通过 $$r$$ 的强凸性 $$D_r(x^k,x^{k+1})\ge\frac12\left\Vert x^k-x^{k+1}\right\Vert^2$$ 相消．） 取固定步长 $$\alpha^k=\alpha$$ 并对 $$i=1,\dots,k$$ 求和（telescoping）： $$\begin{equation}
  \frac1k\sum_{i=1}^{k}f(x^i)-f(x^*)\le
  \frac{1}{\alpha k}D_h(x^*,x^1)+\frac{\alpha}{2}\max_i\left\Vert g^i\right\Vert_*^2.
\end{equation}$$ 一般地， $$\begin{equation}
  f^{\mathrm{best},k}-f^*\le
  \frac{D_h(x^*,x^1)+\frac12\sum_{i=1}^{k}(\alpha^i)^2
  \max_i\left\Vert g^i\right\Vert_*^2}{\sum_{i=1}^{k}\alpha^i}.
\end{equation}$$ 当下列条件满足时算法收敛：$$D_h(x^*,x^1)<\infty$$； $$\sum_k\alpha^k=\infty$$ 且 $$\alpha^k\to0$$（消失步长）；次梯度一致有界 （$$\left\Vert g\right\Vert_*\le G<\infty$$ 对任意 $$g\in\partial f(x)$$，$$x\in C$$）．

*例子*：对单纯形约束 $$C=\lbracex\in\mathbb{R}^n_+:\ \mathbf{1}^\top x=1\rbrace$$，取 $$r(x)=\sum_ix_i\ln x_i$$（负熵），它在 $$\ell_1$$ 范数意义下强凸；对初始点 $$x^1=\mathbf{1}/n$$ 有 $$D_r(x^*,x^1)\le\ln n$$ 对任意 $$x^*\in C$$ 成立；若 $$G_\infty\ge\left\Vert g\right\Vert_\infty$$ 一致成立，则 $$\begin{equation}
  f^{\mathrm{best},k}-f^*\le\frac{\ln n}{\alpha k}
  +\frac{\alpha k G_\infty^2}{2},
\end{equation}$$ 比通常的次梯度算法（$$D_h\sim\frac12\left\Vert x^*-x^1\right\Vert^2$$ 可能随维数增长） 表现好很多．

##### 2. 惯性近似点梯度算法

考虑复合问题 (8.52)（$$f$$ 可微、$$\nabla f$$ 为 $$L$$-利普希茨连续，$$h$$ 凸）．选取初始点 $$x^0$$，令 $$x^{-1}=x^0$$，取 $$\beta\in[0,1]$$，$$\alpha<\frac{2(1-\beta)}{L}$$，则**惯性近似点 梯度法**的迭代格式为 $$\begin{equation}
  x^{k+1}=\operatorname{prox}_{\alpha h}
  \Bigl(x^k-\alpha\nabla f(x^k)+\beta\bigl(x^k-x^{k-1}\bigr)\Bigr),
\end{equation}$$ 其中 $$\beta(x^k-x^{k-1})$$ 称为**惯性项**（沿用上一步的方向）．对 $$h=0$$ 的情形，该算法也被称为**重球法**（heavy-ball）．惯性项是 FISTA（§8.2）中\"沿前两步计算方向\"的一般化来源．

##### 3. 条件梯度法（Frank--Wolfe 方法）

设 $$C$$ 为紧集，考虑 $$\min_{x\in C}f(x)$$．若使用近似点梯度法 （$$h=I_C$$），则 $$x^{k+1}=P_C(x^k-\alpha^k\nabla f(x^k))$$；困难在于 $$P_C(\cdot)$$ 的计算代价可能很昂贵．**条件梯度法**（CndG 或 Frank--Wolfe）把投影换成*线性极小化*：给定 $$y^0=x^0$$， $$\alpha^k\in(0,1]$$， $$\begin{equation}
  x^k=\operatorname*{arg\,min}_{x\in C}\ \left\langle \nabla f(y^{k-1}),\,x\right\rangle,
  \qquad
  y^k=(1-\alpha^k)y^{k-1}+\alpha^kx^k,
\end{equation}$$ 步长 $$\alpha^k$$ 可取消失步长 $$\alpha^k=\frac{2}{k+1}$$，或精确线搜索 $$\alpha^k=\operatorname*{arg\,min}_{\alpha\in[0,1]}f\bigl((1-\alpha)y^{k-1}+\alpha x^k\bigr)$$．

*子问题的例子*：对范数约束问题 $$\min_x f(x)\ \ \text{s.t.}\ \ \left\Vert x\right\Vert\le t$$， 子问题为 $$\begin{equation}
  x^k\in\operatorname*{arg\,min}_{\left\Vert x\right\Vert\le t}\left\langle \nabla f(y^{k-1}),\,x\right\rangle
  =-t\cdot\partial\left\Vert\nabla f(y^{k-1})\right\Vert_*,
\end{equation}$$ 即计算对偶范数的*次梯度*（$$\left\Vert z\right\Vert_*=\sup_{\left\Vert x\right\Vert\le1}z^\top x$$）． 如果计算该次梯度比计算到 $$C$$ 的投影简单，条件梯度法就比投影梯度法 高效：

- $$\ell_1$$ 范数约束（对偶范数 $$\ell_\infty$$）： $$x^k=-t\cdot\operatorname{sign}\bigl(\nabla_{i^k}f(y^{k-1})\bigr)
          e_{i^k}$$，其中 $$i^k\in\operatorname*{arg\,max}_i\left\vert\nabla_if(y^{k-1})\right\vert$$------ 只需挑出最大分量的坐标，计算量 $$O(n)$$，与 $$\ell_1$$ 球投影同阶 但更直接；

- $$\ell_p$$ 范数约束（对偶范数 $$\ell_q$$，$$\frac1p+\frac1q=1$$）： $$x^k_i=-\beta\cdot\operatorname{sign}\bigl(\nabla_if(y^{k-1})\bigr)
          \left\vert\nabla_if(y^{k-1})\right\vert^{p/q}$$（$$\beta$$ 为使 $$\left\Vert x^k\right\Vert_q=t$$ 的归一化常数）；除 $$p=1,2,\infty$$ 外，其子问题比 $$\ell_p$$ 球 投影（需单独解优化问题）简单；

- 矩阵核范数约束：$$\left\Vert X\right\Vert_*$$ 的对偶范数是谱范数 $$\left\Vert X\right\Vert_2$$； 设 $$u,v$$ 分别为 $$\nabla f(Y^{k-1})$$ 最大奇异值对应的左、右奇异 向量，则 $$uv^\top\in\partial\left\Vert\nabla f(Y^{k-1})\right\Vert_2$$，子问题 为 $$X^k\in-t\cdot\partial\left\Vert\nabla f(Y^{k-1})\right\Vert_2$$------只需算 最大奇异值对应的奇异向量；而核范数球投影需要*全*奇异值 分解，计算量远大于条件梯度法．

*收敛性*：令 $$\gamma^t\in(0,1]$$，构造 $$\Gamma^t=\begin{cases}1,&t=1\\ (1-\gamma^t)\Gamma^{t-1},&t\ge2\end{cases}$$． 若序列 $$\lbrace\Delta^t\rbrace$$ 满足 $$\Delta^t\le(1-\gamma^t)\Delta^{t-1}
+\frac{B^t}{\Gamma^t}\cdot\Gamma^t$$ 型递推（即 $$\Delta^t\le(1-\gamma^t)\Delta^{t-1}+B^t$$），则 $$\begin{equation}
  \Delta^k\le\Gamma^k(1-\gamma^1)\Delta^0+\Gamma^k\sum_{t=1}^{k}
  \frac{B^t}{\Gamma^t}.
\end{equation}$$ 令 $$f$$ 凸、$$\nabla f$$ 为 $$L$$-利普希茨、$$D_C=\sup_{x,y\in C}\left\Vert x-y\right\Vert$$， 取 $$\gamma^k=\frac{2}{k+1}$$（$$\Gamma^k=\frac{2}{k(k+1)}$$）：由 $$x^k$$ 的线性极小最优性条件 $$\left\langle x-x^k,\,\nabla f(y^{k-1})\right\rangle\ge0\ \forall
x\in C$$ 与二次上界可得（记 $$\bar y^k=(1-\gamma^k)y^{k-1}+\gamma^kx^k$$， 无论消失步长还是精确线搜索都有 $$f(y^k)\le f(\bar y^k)$$） $$\begin{equation}
  f(y^k)-f(x)\le(1-\gamma^k)\bigl[f(y^{k-1})-f(x)\bigr]
  +\frac{L(\gamma^k)^2}{2}\left\Vert x^k-y^{k-1}\right\Vert^2,
\end{equation}$$ 由上述引理累加得 $$\begin{equation}
  f(y^k)-f(x^*)\le\frac{2L}{k(k+1)}\sum_{i=1}^{k}
  \left\Vert x^i-y^{i-1}\right\Vert^2\le\frac{2LD_C^2}{k+1}.
\end{equation}$$ 令 $$\frac{2LD_C^2}{k+1}\le\epsilon$$ 得迭代复杂度 $$O(LD_C^2/\epsilon)$$．

## Nesterov 加速算法

近似点梯度法的收敛速度为 $$O(\frac1k)$$（当 $$\nabla f$$ 利普希茨连续时）． 一个自然的问题是：仅用梯度信息，能否取得更快的收敛速度？Nesterov 分别 在 1983、1988 和 2005 年提出了三种改进的一阶算法，收敛速度都能达到 $$O(\frac{1}{k^2})$$，且都可以应用到近似点梯度算法上．Nesterov 加速算法 刚提出时由于牛顿算法有更快的收敛速度而未受关注；近年来随着数据量增大， 牛顿型方法因计算复杂度过大不便应用于实际，Nesterov 加速算法作为一种 快速一阶算法重新流行起来．Beck 和 Teboulle 在 2008 年给出了 Nesterov 1983 年算法的近似点梯度版本------**FISTA**．本节讨论凸函数的加速 算法并给出例子和收敛性证明，作为补充也简单介绍非凸问题上的加速算法．

### FISTA 算法

考虑复合优化问题 $$\begin{equation}
  \min_{x\in\mathbb{R}^n}\ \psi(x)=f(x)+h(x),
\end{equation}$$ 其中 $$f$$ 连续可微、凸且梯度利普希茨连续（常数 $$L$$），$$h$$ 是适当的闭凸 函数．用近似点梯度法求解收敛速度只有 $$O(\frac1k)$$；FISTA 对其加速．

FISTA 由两步组成：第一步沿着前两步的计算方向计算一个新点，第二步在该 新点处做一步近似点梯度迭代： $$\begin{equation}
  \begin{aligned}
    y^k&=x^{k-1}+\frac{k-2}{k+1}\bigl(x^{k-1}-x^{k-2}\bigr),\\
    x^k&=\operatorname{prox}_{t^kh}\bigl(y^k-t^k\nabla f(y^k)\bigr).
  \end{aligned}
\end{equation}$$ 这一做法对每步迭代的计算量几乎没有影响，而效果显著：取固定步长 $$t^k\le\frac1L$$ 时，收敛速度达到 $$O(\frac{1}{k^2})$$．

<div class="algorithm">

**算法 22**

**输入**：$$x^0=x^{-1}\in\mathbb{R}^n$$，$$k\leftarrow1$$．

<div class="algorithmic">

计算 $$y^k=x^{k-1}+\frac{k-2}{k+1}(x^{k-1}-x^{k-2})$$； 选取 $$t^k=t\in(0,\frac1L]$$，计算 $$x^k=\operatorname{prox}_{t^kh}(y^k-t^k\nabla f(y^k))$$； $$k\leftarrow k+1$$；

</div>

</div>

##### FISTA 的等价变形

为了便于推广，把原算法的第一步拆成两步迭代： $$\begin{equation}
  y^k=(1-\gamma^k)x^{k-1}+\gamma^kv^{k-1},
  \qquad
  v^k=x^{k-1}+\frac{1}{\gamma^k}\bigl(x^k-x^{k-1}\bigr).
\end{equation}$$

<div class="algorithm">

**算法 23**

**输入**：$$v^0=x^0\in\mathbb{R}^n$$，$$k\leftarrow1$$．

<div class="algorithmic">

计算 $$y^k=(1-\gamma^k)x^{k-1}+\gamma^kv^{k-1}$$； 选取 $$t^k$$，计算 $$x^k=\operatorname{prox}_{t^kh}(y^k-t^k\nabla f(y^k))$$； 计算 $$v^k=x^{k-1}+\frac{1}{\gamma^k}(x^k-x^{k-1})$$； $$k\leftarrow k+1$$；

</div>

</div>

当 $$\gamma^k=\frac{2}{k+1}$$ 且取固定步长时，两个算法等价；当 $$\gamma^k$$ 取别的取法时，算法 23 给出另一版本的加速算法．

##### 收敛条件

算法 23 以 $$O(\frac{1}{k^2})$$ 速度收敛的条件 （证明见收敛性分析小节）： $$\begin{align}
  &f(x^k)\le f(y^k)+\left\langle \nabla f(y^k),\,x^k-y^k\right\rangle
  +\frac{1}{2t^k}\left\Vert x^k-y^k\right\Vert_2^2,
  \\
  &\gamma^1=1,\qquad
  \frac{(1-\gamma^i)t^i}{(\gamma^i)^2}\le
  \frac{t^{i-1}}{(\gamma^{i-1})^2},\qquad i>1,
  \\
  &\frac{(\gamma^k)^2}{t^k}=O\Bigl(\frac{1}{k^2}\Bigr).
\end{align}$$ 取 $$t^k=\frac1L$$，$$\gamma^k=\frac{2}{k+1}$$ 时以上条件满足．$$\gamma^k$$ 的选取并不唯一，例如可递推地取 $$\begin{equation}
  \gamma^1=1,\qquad
  \frac{1}{\gamma^k}=\frac12\Bigl(1+\sqrt{1+\frac{4}{(\gamma^{k-1})^2}}\Bigr),
\end{equation}$$ 导出的算法收敛速度依然是 $$O(\frac{1}{k^2})$$．

##### 两种线搜索

固定步长要求 $$t^k\le\frac1L$$，但绝大多数问题不知道利普希茨常数 $$L$$． 为了在 $$L$$ 未知时仍满足条件 (8.115)，需用线搜索确定 $$t^k$$，同时选取 $$\gamma^k$$ 使 (8.116)、 (8.117) 也满足．下面给出两种线搜索算法：

<div class="algorithm">

**算法 24**

**输入**：$$t^k=t^{k-1}>0$$，$$\rho<1$$，参照点 $$y^k$$ 及其梯度 $$\nabla f(y^k)$$．

<div class="algorithmic">

计算 $$x^k=\operatorname{prox}_{t^kh}(y^k-t^k\nabla f(y^k))$$； $$t^k\leftarrow\rho t^k$$，重新计算 $$x^k=\operatorname{prox}_{t^kh}(y^k-t^k\nabla f(y^k))$$； **输出**：迭代点 $$x^k$$，步长 $$t^k$$．

</div>

</div>

第一种方法直观：取 $$\gamma^k=\frac{2}{k+1}$$，以回溯的方式找到满足条件 (8.115) 的 $$t^k$$；初始步长取上一步的 $$t^{k-1}$$， 指数式减小直到 (8.115) 满足（$$t^k$$ 足够小时条件 一定满足，故线搜索必终止），易验证其余两个条件也满足．

<div class="algorithm">

**算法 25**

**输入**：$$t^k=\hat t>0$$，$$t^{k-1}>0$$，$$\rho<1$$．

<div class="algorithmic">

取 $$\gamma^k$$ 为关于 $$\gamma$$ 的方程 $$t^{k-1}\gamma^2=t^k(\gamma^{k-1})^2(1-\gamma)$$ 的正根； 计算 $$y^k=(1-\gamma^k)x^{k-1}+\gamma^kv^{k-1}$$ 和梯度 $$\nabla f(y^k)$$； 计算 $$x^k=\operatorname{prox}_{t^kh}(y^k-t^k\nabla f(y^k))$$； $$t^k\leftarrow\rho t^k$$；  结束循环； **输出**：迭代点 $$x^k$$，步长 $$t^k$$．

</div>

</div>

第二种方法同时改变 $$t^k$$ 与 $$\gamma^k$$（$$y^k$$ 随之改变，梯度需重算）： 由 $$\gamma^k$$ 的取法可知它必满足条件 (8.116) 且 $$0<\gamma^k\le1$$，且 $$t^k$$ 必有下界 $$t_{\min}$$．关于 $$\frac{(\gamma^k)^2}{t^k}$$ 的估计：利用 $$\sqrt{1-x}$$ 在 $$x=0$$ 处的凹性， $$\begin{equation}
  \frac{\sqrt{t^{k-1}}}{\gamma^{k-1}}
  =\sqrt{\frac{(1-\gamma^k)t^k}{\gamma^k}}
  \le\frac{\sqrt{t^k}}{\gamma^k}-\frac{\sqrt{t^k}}{2},
\end{equation}$$ 反复利用可得 $$\frac{\sqrt{t^k}}{\gamma^k}\ge\sqrt{t^1}
+\frac12\sum_{i=2}^{k}\sqrt{t^i}$$，因此 $$\begin{equation}
  \frac{(\gamma^k)^2}{t^k}
  \le\frac{1}{\bigl(\sqrt{t^1}+\frac12\sum_{i=2}^{k}\sqrt{t^i}\bigr)^2}
  \le\frac{4}{t_{\min}(k+1)^2}=O\Bigl(\frac{1}{k^2}\Bigr).
\end{equation}$$ 即条件 (8.116)(8.117) 在算法 25 的执行中也得到满足．算法 25 执行更复杂（$$y^k$$ 与梯度都要重算），但好处是步长 $$t^k$$ 不再单调下降、 迭代后期可取较大值，进一步加快收敛．总的来说：固定步长的 FISTA 保守 （有时不得不选很小的步长），线搜索常能选到较大的步长从而加速，代价是 单步复杂度变高；实际中需针对具体问题权衡．

##### 下降的 FISTA

原始的 FISTA 不是下降算法．一个下降变形只需修改算法 23 的近端步：设经近似点映射之后的点为 $$u$$， 对当前点 $$x^k$$ 更新为 $$\begin{equation}
  x^k=
  \begin{cases}
    u,      & \psi(u)\le\psi(x^{k-1}),\\
    x^{k-1}, & \psi(u)>\psi(x^{k-1}),
  \end{cases}
\end{equation}$$ 则 $$\psi(x^k)\le\psi(x^{k-1})$$ 恒成立．实际计算中由于步长与 $$\gamma^k$$ 随 $$k$$ 变化，$$\psi(u)>\psi(x^{k-1})$$ 不会一直成立，算法不会卡在某个点 不更新．步长与 $$\gamma^k$$ 的选取用固定步长或前述任一种线搜索均可．

### 其他加速算法

##### 第二类 Nesterov 加速算法

<div class="algorithm">

**算法 26**

**输入**：$$x^0=y^0$$，$$k\leftarrow1$$．

<div class="algorithmic">

计算 $$z^k=(1-\gamma^k)x^{k-1}+\gamma^ky^{k-1}$$； 计算 $$y^k=\operatorname{prox}_{(t^k/\gamma^k)h}
         \Bigl(y^{k-1}-\frac{t^k}{\gamma^k}\nabla f(z^k)\Bigr)$$； 计算 $$x^k=(1-\gamma^k)x^{k-1}+\gamma^ky^k$$； $$k\leftarrow k+1$$； **输出**：$$x^k$$．

</div>

</div>

与经典 FISTA 的重要区别：第二类算法中的三个序列 $$\lbracex^k\rbrace$$、$$\lbracey^k\rbrace$$、$$\lbracez^k\rbrace$$ 都*可以保证在定义域内*，而 FISTA 的序列 $$\lbracey^k\rbrace$$ 不一定在定义域内．同样取 $$\gamma^k=\frac{2}{k+1}$$，$$t^k=\frac1L$$ 可得 $$O(\frac{1}{k^2})$$ 收敛速度．

##### 第三类 Nesterov 加速算法

<div class="algorithm">

**算法 27**

**输入**：$$x^0\in\operatorname{dom}h$$，$$y^0=\operatorname*{arg\,min}_{x\in\operatorname{dom}h}\left\Vert x\right\Vert_2$$， $$k\leftarrow1$$．

<div class="algorithmic">

计算 $$z^k=(1-\gamma^k)x^{k-1}+\gamma^ky^{k-1}$$； 计算 $$y^k=\operatorname{prox}_{(t^k\sum_{i=1}^{k}1/\gamma^i)h}
         \Bigl(-t^k\sum_{i=1}^{k}\frac{1}{\gamma^i}\nabla f(z^i)\Bigr)$$； 计算 $$x^k=(1-\gamma^k)x^{k-1}+\gamma^ky^k$$； $$k\leftarrow k+1$$； **输出**：$$x^k$$．

</div>

</div>

第三类算法与第二类的区别仅在 $$y^k$$ 的更新：它需要利用*全部已有的* $$\lbrace\nabla f(z^i)\rbrace_{i=1}^{k}$$（步长也随之累加为 $$t^k\sum_{i=1}^k1/\gamma^i$$）．同样取 $$\gamma^k=\frac{2}{k+1}$$， $$t^k=\frac1L$$ 有 $$O(\frac{1}{k^2})$$ 收敛速度．

##### 非凸复合优化问题的加速算法框架

仍考虑 (8.112)（$$f$$ 不要求凸，但可微且梯度利普希茨 连续；$$h$$ 要求同前）．对凸函数的加速算法做修改，可得非凸复合优化问题 的加速梯度法框架：

<div class="algorithm">

**算法 28**

**输入**：$$x^0=y^0\in\mathbb{R}^n$$；取 $$\lbrace\gamma^k\rbrace$$：$$\gamma^1=1$$， $$k\ge2$$ 时 $$\gamma^k\in(0,1)$$；$$k\leftarrow1$$．

<div class="algorithmic">

$$z^k=\gamma^ky^{k-1}+(1-\gamma^k)x^{k-1}$$； $$y^k=\operatorname{prox}_{\lambda^kh}
         \bigl(y^{k-1}-\lambda^k\nabla f(z^k)\bigr)$$； $$x^k=\operatorname{prox}_{t^kh}
         \bigl(z^k-t^k\nabla f(z^k)\bigr)$$； $$k\leftarrow k+1$$； **输出**：$$x^k$$．

</div>

</div>

该框架形式独特：同时维护 $$\lbracex^k\rbrace,\lbracey^k\rbrace,\lbracez^k\rbrace$$ 三列并做两次近端 更新；可以证明当 $$\lambda^k,t^k$$ 取特定值时它等价于第二类 Nesterov 加速算法（本章习题）．非凸情形下一阶算法一般只能保证收敛到稳定点，故 不能用函数值与最优值之差衡量精度；与光滑情形用梯度作停机准则类似，这里 利用**梯度映射**（定义 8.2）刻画收敛速度：可以 证明当 $$f$$ 凸时算法 28 的收敛速度与 FISTA 相同（$$O(\frac{1}{k^2})$$）；当 $$f$$ 非凸时算法也收敛且速度为 $$O(\frac1k)$$（以 $$\left\Vert G_{t^k}(x^k)\right\Vert$$ 度量）．

### 应用举例

之前用近似点梯度法求解的模型都可以用 Nesterov 加速算法求解．

##### 1. LASSO 问题

FISTA 的迭代格式为 $$\begin{equation}
  \begin{aligned}
    y^k&=x^{k-1}+\frac{k-2}{k+1}(x^{k-1}-x^{k-2}),\\
    w^k&=y^k-t^kA^\top(Ay^k-b),\\
    x^k&=\operatorname{sign}(w^k)\odot\max\lbrace\left\vert w^k\right\vert-t^k\mu,\ 0\rbrace,
  \end{aligned}
\end{equation}$$ 最后一步收缩保证了迭代过程中解的稀疏结构．第二类 Nesterov 加速算法： $$\begin{equation}
  \begin{aligned}
    z^k&=(1-\gamma^k)x^{k-1}+\gamma^ky^{k-1},\\
    w^k&=y^{k-1}-\frac{t^k}{\gamma^k}A^\top(Az^k-b),\\
    y^k&=\operatorname{sign}(w^k)\odot
    \max\Bigl\lbrace\left\vert w^k\right\vert-\frac{t^k}{\gamma^k}\mu,\ 0\Bigr\rbrace,\\
    x^k&=(1-\gamma^k)x^{k-1}+\gamma^ky^k;
  \end{aligned}
\end{equation}$$ 第三类 Nesterov 加速算法： $$\begin{equation}
  \begin{aligned}
    z^k&=(1-\gamma^k)x^{k-1}+\gamma^ky^{k-1},\\
    w^k&=-t^k\sum_{i=1}^{k}\frac{1}{\gamma^i}A^\top(Az^i-b),\\
    y^k&=\operatorname{sign}(w^k)\odot
    \max\Bigl\lbrace\left\vert w^k\right\vert-t^k\sum_{i=1}^{k}\frac{\mu}{\gamma^i},\
    0\Bigr\rbrace,\\
    x^k&=(1-\gamma^k)x^{k-1}+\gamma^ky^k.
  \end{aligned}
\end{equation}$$ 数值实验（同 §6.2 的 $$A,b$$，$$\mu=10^{-3}$$，连续化策略，固定步长与 BB+线搜索对比）：固定步长下 FISTA 比第二类 Nesterov 略快，且 FISTA 是*非单调*算法；BB 步长与线搜索可进一步加速；带线搜索的近似点 梯度法可比带线搜索的 FISTA 更快收敛（讲义图 8.4）．

##### 2. 小波模型

合成小波模型 (8.66) 的 FISTA 与第二类 Nesterov 加速算法： $$\begin{equation}
  \begin{aligned}
    y^k&=d^{k-1}+\frac{k-2}{k+1}(d^{k-1}-d^{k-2}),\\
    w^k&=y^k-t^kWA^\top(AW^\top y^k-b),\\
    d^k&=\operatorname{sign}(w^k)\odot\max\lbrace\left\vert w^k\right\vert-t^k\lambda,0\rbrace,
  \end{aligned}
\end{equation}$$ $$\begin{equation}
  \begin{aligned}
    z^k&=(1-\gamma^k)d^{k-1}+\gamma^ky^{k-1},\\
    w^k&=y^{k-1}-\frac{t^k}{\gamma^k}WA^\top(AW^\top z^k-b),\\
    y^k&=\operatorname{sign}(w^k)\odot
    \max\Bigl\lbrace\left\vert w^k\right\vert-\frac{t^k}{\gamma^k}\lambda,0\Bigr\rbrace,\\
    d^k&=(1-\gamma^k)d^{k-1}+\gamma^ky^k.
  \end{aligned}
\end{equation}$$

##### 3. 平衡小波模型

平衡小波模型 (8.69) 的 FISTA： $$\begin{equation}
  \begin{aligned}
    y^k&=\alpha^{k-1}+\frac{k-2}{k+1}(\alpha^{k-1}-\alpha^{k-2}),\\
    w^k&=y^k-t^k\bigl(\kappa(I-WW^\top)y^k\\
    &\qquad\qquad+WA^\top(AW^\top y^k-b)\bigr),\\
    \alpha^k&=\operatorname{sign}(w^k)\odot
    \max\lbrace\left\vert w^k\right\vert-t^k\lambda,0\rbrace,
  \end{aligned}
\end{equation}$$ 相应的第二类 Nesterov 加速算法只需把上述第二步换成 $$\begin{equation*}
  w^k=y^{k-1}-\frac{t^k}{\gamma^k}\bigl(\kappa(I-WW^\top)z^k
  +WA^\top(AW^\top z^k-b)\bigr),
\end{equation*}$$ 阈值 $$t^k\lambda$$ 换成 $$\frac{t^k}{\gamma^k}\lambda$$，并按 $$z^k=(1-\gamma^k)\alpha^{k-1}+\gamma^ky^{k-1}$$ 与 $$\alpha^k=(1-\gamma^k)\alpha^{k-1}+\gamma^ky^k$$ 更新.

### 收敛性分析

<div class="theorem">

**定理 8.5** 在假设 8.3.8 的条件下，用算法 23 （取 $$t^k=\frac1L$$，$$\gamma^k=\frac{2}{k+1}$$）求解凸复合优化问题 (8.112)，则 $$\begin{equation}
  \psi(x^k)-\psi(x^*)\le\frac{2L\left\Vert x^0-x^*\right\Vert_2^2}{(k+1)^2}.
\end{equation}$$

</div>

**Proof** **（）** 由 $$x^k=\operatorname{prox}_{t^kh}(y^k-t^k\nabla f(y^k))$$ 与 (8.9) 得 $$\begin{equation}
  \frac{1}{t^k}\bigl(y^k-x^k\bigr)-\nabla f(y^k)\in\partial h(x^k),
\end{equation}$$ 故对任意的 $$x$$： $$\begin{equation}
  h(x)\ge h(x^k)+\Bigl\langle\frac{1}{t^k}(y^k-x^k)-\nabla f(y^k),\
  x-x^k\Bigr\rangle,
\end{equation}$$ 另一方面由 $$f$$ 梯度利普希茨连续和 $$t^k=\frac1L$$： $$\begin{equation}
  f(x^k)\le f(y^k)+\left\langle \nabla f(y^k),\,x^k-y^k\right\rangle
  +\frac{1}{2t^k}\left\Vert x^k-y^k\right\Vert_2^2.
\end{equation}$$ 结合 (8.129)(8.130)，对任意 的 $$x$$ 有 $$\begin{align}
  \psi(x^k)&\le h(x)+f(y^k)+\left\langle \nabla f(y^k),\,x-y^k\right\rangle
  +\frac{1}{t^k}\left\langle x^k-y^k,\,x-x^k\right\rangle
  +\frac{1}{2t^k}\left\Vert x^k-y^k\right\Vert_2^2\\
  &\le\psi(x)+\frac{1}{t^k}\left\langle x^k-y^k,\,x-x^k\right\rangle
  +\frac{1}{2t^k}\left\Vert x^k-y^k\right\Vert_2^2,
\end{align}$$ （第二个不等式由 $$f$$ 的凸性： $$f(x)\ge f(y^k)+\left\langle \nabla f(y^k),\,x-y^k\right\rangle$$．） 在 (8.131) 中分别取 $$x=x^{k-1}$$ 和 $$x=x^*$$ （记 $$\psi(x^*)=\psi^*$$），分别乘 $$1-\gamma^k$$ 和 $$\gamma^k$$ 并相加： $$\begin{equation}
  \psi(x^k)-\psi^*-(1-\gamma^k)\bigl(\psi(x^{k-1})-\psi^*\bigr)
  \le\frac{1}{t^k}\left\langle x^k-y^k,\,(1-\gamma^k)x^{k-1}+\gamma^kx^*-x^k\right\rangle
  +\frac{1}{2t^k}\left\Vert x^k-y^k\right\Vert_2^2.
\end{equation}$$ 结合迭代式 $$v^k=x^{k-1}+\frac{1}{\gamma^k}(x^k-x^{k-1})$$ 与 $$y^k=(1-\gamma^k)x^{k-1}+\gamma^kv^{k-1}$$，利用恒等式 $$\begin{equation}
  \left\langle a,\,b\right\rangle+\frac12\left\Vert a\right\Vert^2
  =\frac12\bigl(\left\Vert b\right\Vert^2-\left\Vert b-a\right\Vert^2\bigr),
  \qquad a=x^k-y^k,\ b=x^k-(1-\gamma^k)x^{k-1}-\gamma^kx^*,
\end{equation}$$ 以及 $$\gamma^k v^k-y^k=\gamma^k(v^k-x^{k-1})\cdot\frac{1}{1}$$ （由 $$y^k=(1-\gamma^k)x^{k-1}+\gamma^kv^{k-1}$$ 与 $$v^k=x^{k-1}+\frac{1}{\gamma^k}(x^k-x^{k-1})$$ 可得 $$y^k-(1-\gamma^k)x^{k-1}=\gamma^kv^{k-1}$$），不等式 (8.132) 可以化为 $$\begin{align}
  \psi(x^k)-\psi^*-(1-\gamma^k)&\bigl(\psi(x^{k-1})-\psi^*\bigr)
  \\
  &\le\frac{1}{2t^k}\Bigl(\left\Vert y^k-(1-\gamma^k)x^{k-1}-\gamma^kx^*\right\Vert^2
  -\left\Vert x^k-(1-\gamma^k)x^{k-1}-\gamma^kx^*\right\Vert^2\Bigr)\\
  &=\frac{(\gamma^k)^2}{2t^k}
  \bigl(\left\Vert v^{k-1}-x^*\right\Vert^2-\left\Vert v^k-x^*\right\Vert^2\bigr).
\end{align}$$ 注意到 $$t^k,\gamma^k$$ 的取法满足不等式 $$\begin{equation}
  \frac{1-\gamma^k}{(\gamma^k)^2t^k}\le\frac{1}{(\gamma^{k-1})^2t^{k-1}},
\end{equation}$$ （验证：$$\gamma^k=\frac{2}{k+1}$$，$$t^k=\frac1L$$ 时 $$\frac{1-\gamma^k}{(\gamma^k)^2t^k}
=L\frac{k-1}{k+1}\cdot\frac{(k+1)^2}{4}
=\frac{L(k^2-1)}{4}\le\frac{Lk^2}{4}
=\frac{1}{(\gamma^{k-1})^2t^{k-1}}$$．） 在 (8.134) 两边同乘 $$\frac{t^k}{(\gamma^k)^2}$$ 并 利用 (8.135)，得到相邻两步的递归不等式 $$\begin{equation}
  \frac{t^k}{(\gamma^k)^2}\bigl(\psi(x^k)-\psi^*\bigr)
  +\frac12\left\Vert v^k-x^*\right\Vert^2
  \le\frac{t^{k-1}}{(\gamma^{k-1})^2}\bigl(\psi(x^{k-1})-\psi^*\bigr)
  +\frac12\left\Vert v^{k-1}-x^*\right\Vert^2.
\end{equation}$$ 反复利用 (8.136)： $$\begin{equation}
  \frac{t^k}{(\gamma^k)^2}\bigl(\psi(x^k)-\psi^*\bigr)
  +\frac12\left\Vert v^k-x^*\right\Vert^2
  \le\frac{t^1}{(\gamma^1)^2}\bigl(\psi(x^1)-\psi^*\bigr)
  +\frac12\left\Vert v^1-x^*\right\Vert^2.
\end{equation}$$ 对 $$k=1$$：$$\gamma^1=1$$，$$v^0=x^0$$，再次利用 (8.134) 可得 $$\begin{equation}
  \frac{t^1}{(\gamma^1)^2}\bigl(\psi(x^1)-\psi^*\bigr)
  +\frac12\left\Vert v^1-x^*\right\Vert^2
  \le\frac{(1-\gamma^1)t^1}{(\gamma^1)^2}
  \bigl(\psi(x^0)-\psi^*\bigr)+\frac12\left\Vert v^0-x^*\right\Vert^2
  =\frac12\left\Vert x^0-x^*\right\Vert^2.
\end{equation}$$ 结合两式，并用 $$\frac{(\gamma^k)^2}{t^k}=\frac{4L}{(k+1)^2}$$ 即得 $$\psi(x^k)-\psi^*\le\frac{2L\left\Vert x^0-x^*\right\Vert^2}{(k+1)^2}$$．

一般条件下的收敛**（一般条件下的收敛）** 定理 8.5 证明的关键一步是建立递归 (8.136)，而这并不需要 $$t=\frac1L$$、 $$\gamma^k=\frac{2}{k+1}$$ 的具体取值------只需保证条件 (8.115)（依赖 $$\nabla f$$ 的利普希茨连续性）、 (8.116)（依赖 $$\gamma^k,t^k$$ 的选取）、 (8.117)（保证 $$O(\frac1{k^2})$$ 速度）成立即可． 因此：

<div class="corollary">

**推论 8.2** 在假设 8.3.8 条件下，用算法 23 求解 凸复合优化问题 (8.112) 时，若迭代点 $$x^k,y^k$$、步长 $$t^k$$ 及组合系数 $$\gamma^k$$ 满足条件 (8.115)--(8.117)，则 $$\begin{equation}
  \psi(x^k)-\psi(x^*)\le\frac{C}{k^2},
\end{equation}$$ 其中 $$C$$ 仅与函数 $$f$$ 和初始点 $$x^0$$ 的选取有关．特别地，采用线搜索 算法 24 和 25 的 FISTA 算法 具有 $$O(\frac{1}{k^2})$$ 的收敛速度．

</div>

此外可以指出：虽然已经抽象出 $$t^k,\gamma^k$$ 满足的条件，但无法再找到 其他的 $$t^k,\gamma^k$$ 进一步改善 FISTA 的收敛速度------$$O(\frac{1}{k^2})$$ 是 FISTA 类算法所能达到的最高的收敛速度（对一阶方法）．

<div class="theorem">

**定理 8.6** 取 $$\gamma^k=\frac{2}{k+1}$$ 和 $$t^k=\frac1L$$，用算法 26 求解问题 (8.112) 有 $$\begin{equation}
  \psi(x^k)-\psi(x^*)\le\frac{2L}{(k+1)^2}\left\Vert x^0-x^*\right\Vert_2^2.
\end{equation}$$

</div>

**Proof** **（）** 首先根据 $$y^k=\operatorname{prox}_{(t^k/\gamma^k)h}
\bigl(y^{k-1}-\frac{t^k}{\gamma^k}\nabla f(z^k)\bigr)$$ 可知 $$\begin{equation}
  \gamma^k(y^{k-1}-y^k)-t^k\nabla f(z^k)\in t^k\partial h(y^k),
\end{equation}$$ 故对任意的 $$x$$： $$\begin{equation}
  t^kh(x)\ge t^kh(y^k)
  +\left\langle \gamma^k(y^{k-1}-y^k)-t^k\nabla f(z^k),\,x-y^k\right\rangle.
\end{equation}$$ 再由 $$h$$ 的凸性：$$h(x^k)\le(1-\gamma^k)h(x^{k-1})+\gamma^kh(y^k)$$， 消去 $$h(y^k)$$ 得 $$\begin{equation}
  h(x^k)\le(1-\gamma^k)h(x^{k-1})
  +\gamma^k\Bigl[h(x)-\Bigl\langle\frac{\gamma^k}{t^k}(y^{k-1}-y^k)
  -\nabla f(z^k),\ x-y^k\Bigr\rangle\Bigr].
\end{equation}$$ 利用 $$f$$ 的凸性和梯度利普希茨连续： $$\begin{equation}
  f(x^k)\le f(z^k)+\left\langle \nabla f(z^k),\,x^k-z^k\right\rangle
  +\frac{L}{2}\left\Vert x^k-z^k\right\Vert^2
  =f(z^k)+\left\langle \nabla f(z^k),\,x^k-z^k\right\rangle
  +\frac{1}{2t^k}\left\Vert x^k-z^k\right\Vert^2,
\end{equation}$$ （$$L=\frac1{t^k}$$．）用迭代步 3 减去迭代步 1 有 $$x^k-z^k=\gamma^k(y^k-y^{k-1})$$，将此等式与 $$x^k=(1-\gamma^k)x^{k-1}+\gamma^ky^k$$ 代入 (8.144) 右端得 $$\begin{equation}
  f(x^k)\le f(z^k)+\left\langle \nabla f(z^k),\,(1-\gamma^k)x^{k-1}+\gamma^ky^k-z^k\right\rangle
  +\frac{(\gamma^k)^2}{2t^k}\left\Vert y^k-y^{k-1}\right\Vert_2^2.
\end{equation}$$ 注意到 $$\begin{align}
  &f(z^k)+\left\langle \nabla f(z^k),\,(1-\gamma^k)x^{k-1}+\gamma^ky^k-z^k\right\rangle\\
  &\quad=(1-\gamma^k)\bigl[f(z^k)+\left\langle \nabla f(z^k),\,x^{k-1}-z^k\right\rangle\bigr]
  +\gamma^k\bigl[f(z^k)+\left\langle \nabla f(z^k),\,y^k-z^k\right\rangle\bigr]\\
  &\le(1-\gamma^k)f(x^{k-1})
  +\gamma^k\bigl[f(z^k)+\left\langle \nabla f(z^k),\,y^k-z^k\right\rangle\bigr],
\end{align}$$ （最后一步用 $$f$$ 的凸性 $$f(x^{k-1})\ge f(z^k)
+\left\langle \nabla f(z^k),\,x^{k-1}-z^k\right\rangle$$．）结合 (8.145)(8.146)： $$\begin{equation}
  f(x^k)\le(1-\gamma^k)f(x^{k-1})
  +\gamma^k\bigl[f(z^k)+\left\langle \nabla f(z^k),\,y^k-z^k\right\rangle\bigr]
  +\frac{(\gamma^k)^2}{2t^k}\left\Vert y^k-y^{k-1}\right\Vert_2^2.
\end{equation}$$ 将 (8.143) 与 (8.147) 相加，并结合 $$f$$ 的凸性 $$f(x)\ge f(z^k)+\left\langle \nabla f(z^k),\,x-z^k\right\rangle$$，取 $$x=x^*$$： $$\begin{align}
  \psi(x^k)-(1-\gamma^k)\psi(x^{k-1})
  &\le\gamma^k\Bigl[h(x^*)+f(x^*)
  -\frac{\gamma^k}{t^k}\left\langle y^{k-1}-y^k,\,x^*-y^k\right\rangle\Bigr]
  +\frac{(\gamma^k)^2}{2t^k}\left\Vert y^k-y^{k-1}\right\Vert_2^2\\
  &\le\gamma^k\psi(x^*)+\frac{(\gamma^k)^2}{2t^k}
  \bigl(\left\Vert y^{k-1}-x^*\right\Vert_2^2-\left\Vert y^k-x^*\right\Vert_2^2\bigr),
\end{align}$$ （第二步用交叉项整理 $$-\frac{\gamma^k}{t^k}\left\langle y^{k-1}-y^k,\,x^*-y^k\right\rangle
+\frac{1}{2t^k}\left\Vert y^k-y^{k-1}\right\Vert_2^2
=\frac{1}{2t^k}\bigl(\left\Vert y^{k-1}-x^*\right\Vert^2-\left\Vert y^k-x^*\right\Vert^2\bigr)$$ 中关于 $$x^*$$ 的配平形式．）不等式 (8.148) 与 FISTA 证明中的 (8.134) 形式完全相同，因此后续过程可按 定理 8.5 进行推导，最终得到 $$\psi(x^k)-\psi^*\le\frac{2L}{(k+1)^2}\left\Vert x^0-x^*\right\Vert^2$$．

<div class="corollary">

**推论 8.3** 当用算法 26 求解凸复合优化问题 (8.112) 时，若迭代点 $$x^k,y^k$$、步长 $$t^k$$ 及组合系数 $$\gamma^k$$ 满足条件 (8.115)--(8.117)，则 $$\psi(x^k)-\psi(x^*)\le\frac{C}{k^2}$$，其中 $$C$$ 仅与 $$f$$ 和初始点 $$x^0$$ 有关（采用线搜索步长的第二类 Nesterov 加速算法仍有相同结论）．

</div>

## 近似点算法

前两节的近似点梯度法与 Nesterov 加速能处理\"部分\"不可微的目标函数 （光滑部分 $$+$$ 近端易算部分）．对于*一般形式*的目标函数，可以用 **近似点算法**（proximal point algorithm, PPA）------它是近似点梯度 法在 $$f=0$$ 时的特殊情况，之所以单独讨论，是因为它具有一些特殊的理论 性质，例如与增广拉格朗日函数法有某种*等价关系*．本节给出 PPA 的 格式与加速版本、与增广拉格朗日函数法的关系、收敛性分析以及 Moreau--Yosida 正则化．

### 近似点算法

考虑一般形式的优化问题 $$\begin{equation}
  \min_{x}\ \psi(x),
\end{equation}$$ 其中 $$\psi$$ 是一个适当的闭凸函数------不要求 $$\psi$$ 可微或连续（例如 $$\psi$$ 的一部分可以是凸集的示性函数）．对不可微的 $$\psi$$ 可以用次梯度法，但 收敛较慢（$$O(1/\sqrt k)$$）且条件苛刻．考虑如下*隐式格式*的次梯度 算法： $$\begin{equation}
  x^{k+1}=x^k-t^k\partial\psi(x^{k+1}),
\end{equation}$$ （形式上的写法．）用邻近算子表示，近似点算法格式为 $$\begin{equation}
  x^{k+1}=\operatorname{prox}_{t^k\psi}(x^k)
  =\operatorname*{arg\,min}_u\Bigl\lbrace\psi(u)+\frac{1}{2t^k}\left\Vert u-x^k\right\Vert_2^2\Bigr\rbrace,
\end{equation}$$ 其中 $$t^k$$ 为步长，可取固定值或由线搜索得到．该算法可看做近似点梯度法 在 $$f=0$$ 时的情形；不同之处在于：PGA 中非光滑项 $$h$$ 的邻近算子通常 *容易*计算，而 PPA 中 $$\psi$$ 的邻近算子通常*难以求解*，绝大 多数情况下需借助其他迭代法进行（不精确）求解．

子问题为何更易求解**（子问题为何更易求解）** PPA 迭代格式 (8.151) 构造了一个看似比原问题 (8.149) 更复杂的子问题，但子问题的目标函数是 **强凸**的（$$\frac{1}{2t^k}\left\Vert u-x^k\right\Vert^2$$ 提供 $$1/t^k$$-强凸性）， 相比原问题更利于用迭代法求解；此外，强凸子问题的解对扰动稳定， 这是 PPA 收敛性好的根源．

与 PGA 类似，PPA 也可以加速．对应 FISTA 的加速 PPA 迭代格式为 $$\begin{equation}
  x^k=\operatorname{prox}_{t^k\psi}
  \Bigl(x^{k-1}+\frac{\gamma^k}{1-\gamma^{k-1}}\cdot
  \frac{\gamma^{k-1}}{\gamma^k}\bigl(x^{k-1}-x^{k-2}\bigr)\Bigr),
\end{equation}$$ （即 $$y^k=x^{k-1}+\frac{\gamma^{k-1}}{\gamma^k}
\frac{\gamma^k}{1-\gamma^{k-1}}(x^{k-1}-x^{k-2})$$ 的近端步；与 §8.2 的动量系数形式等价．）第二类 Nesterov 加速算法的迭代格式为 $$\begin{equation}
  v^k=\operatorname{prox}_{(t^k/\gamma^k)\psi}(v^{k-1}),
  \qquad
  x^k=(1-\gamma^k)x^{k-1}+\gamma^kv^k.
\end{equation}$$ 关于算法参数的选择有两种策略：

- **策略 1**：取固定步长 $$t^k=t$$ 以及 $$\gamma^k=\frac{2}{k+1}$$；

- **策略 2**：对可变步长 $$t^k$$：$$k=1$$ 时取 $$\gamma^1=1$$； $$k>1$$ 时 $$\gamma^k$$ 由方程 $$\begin{equation}
            \frac{(1-\gamma^k)t^k}{(\gamma^k)^2}
            =\frac{t^{k-1}}{(\gamma^{k-1})^2}
  \end{equation}$$ 确定．

### 与增广拉格朗日函数法的关系

本小节讨论 PPA 与增广拉格朗日函数法（§7.2）的关系------这是 PPA 非常 重要的性质，能增进对增广拉格朗日函数法的理解．考虑 $$\begin{equation}
  \min_{x\in\mathbb{R}^n}\ f(x)+h(Ax),
\end{equation}$$ 其中 $$f,h$$ 为适当的闭凸函数．其对偶问题为 $$\begin{equation}
  \max_{z}\ \psi(z)\coloneqq-f^*(-A^\top z)-h^*(z),
\end{equation}$$ （对偶函数：$$g(z)=\inf_x\lbracef(x)+(Ax)^\top z-h^*(z)\cdot\rbrace$$------由共轭定义 $$\inf_x\lbracef(x)+z^\top Ax\rbrace=-f^*(-A^\top z)$$，$$\inf_y\lbraceh(y)-z^\top y\rbrace
=-h^*(z)$$．）

问题 (8.155) 描述了很广泛的一类凸优化问题：

<div class="example">

**例题 8.8**  

1.  当 $$h$$ 是单点集 $$\lbraceb\rbrace$$ 的示性函数时，问题 (8.155) 等价于线性等式约束优化问题 $$\min_x f(x)\ \ \text{s.t.}\ \ Ax=b$$；

2.  当 $$h$$ 是凸集 $$C$$ 上的示性函数时，等价于约束问题 $$\min_x f(x)\ \ \text{s.t.}\ \ Ax\in C$$；

3.  当 $$h(y)=\left\Vert y-b\right\Vert$$ 时，等价于正则优化问题 $$\min_x f(x)+\left\Vert Ax-b\right\Vert$$．

</div>

对对偶问题 (8.156) 用近似点算法更新： $$\begin{equation}
  z^{k+1}=\operatorname{prox}_{t\psi}(z^k)
  =\operatorname*{arg\,min}_z\Bigl\lbracef^*(-A^\top z)+h^*(z)+\frac{1}{2t}\left\Vert z-z^k\right\Vert_2^2\Bigr\rbrace.
\end{equation}$$ 对原始问题 (8.155) 引入中间变量 $$y$$ 得等价形式 $$\begin{equation}
  \min_{x,y}\ f(x)+h(y)\ \ \text{s.t.}\ \ Ax=y,
\end{equation}$$ 用增广拉格朗日函数法求解 (8.158)（§7.2.1，注意约束 为 $$Ax-y=0$$），迭代格式分为最小化增广拉格朗日函数和对偶更新两步： $$\begin{equation}
  (x^{k+1},y^{k+1})=\operatorname*{arg\,min}_{x,y}
  \Bigl\lbracef(x)+h(y)+\frac{t^k}{2}
  \Bigl\Vert Ax-y+\frac{z^k}{t^k}\Bigr\Vert_2^2\Bigr\rbrace,
  \qquad
  z^{k+1}=z^k+t^k(Ax^{k+1}-y^{k+1}).
\end{equation}$$ 下面证明本节最重要的结论：

<div class="theorem">

**定理 8.7** 对对偶问题 (8.156) 用（步长 $$t$$ 的）近似点算法，等价于 对原始问题 (8.158) 用（罚因子 $$t$$ 的）增广拉格朗日 函数法：ALM 一步迭代得到的乘子 $$u$$ 恰为 $$u=\operatorname{prox}_{t\psi}(z)$$．

</div>

证明的基础是关于共轭函数的如下命题（§2.6 共轭与次梯度关系的重述）：

<div class="proposition">

**命题 8.4** 设 $$f$$ 是适当的闭凸函数，$$f^*$$ 是其共轭函数，则对任意的 $$y\in\operatorname{dom}f^*$$ 和 $$x\in\operatorname{dom}f$$： $$\begin{equation}
  y\in\partial f(x)\iff x\in\partial f^*(y).
\end{equation}$$

</div>

**Proof** **（）** 由于 $$f$$ 是适当闭函数，$$f^{**}=f$$（§2.6 定理 2.15）．若 $$y\in\partial f(x)$$，即 $$x$$ 达到了 $$\sup_u\lbracey^\top u-f(u)\rbrace$$，由最优性 条件 $$\begin{equation}
  x^\top y-f(x)=f^*(y).
\end{equation}$$ 由自共轭性 $$\begin{equation}
  f^{**}(x)=f(x)=x^\top y-f^*(y),
\end{equation}$$ 这说明 $$y$$ 是 $$\sup_u\lbracex^\top u-f^*(u)\rbrace$$ 的最优值点，即 $$x\in\partial f^*(y)$$．反方向可类似得到．

**Proof** 定理 8.7 的证明**（定理 8.7 的证明）** 把 ALM 的一步迭代写成 $$\begin{equation}
  (\hat x,\hat y)=\operatorname*{arg\,min}_{x,y}
  \Bigl\lbracef(x)+h(y)+z^\top(Ax-y)+\frac{t}{2}\left\Vert Ax-y\right\Vert_2^2\Bigr\rbrace,
  \qquad
  u=z+t(A\hat x-\hat y),
\end{equation}$$ 下面证明乘子更新 $$u$$ 等价于 $$\operatorname{prox}_{t\psi}(z)$$．

问题 $$\min_{x,y}\lbracef(x)+h(y)+z^\top(Ax-y)+\frac{t}{2}\left\Vert Ax-y\right\Vert_2^2\rbrace$$ 可以写为 $$\begin{equation}
  \min_{x,y,w}\ f(x)+h(y)+\frac{t}{2}\left\Vert w\right\Vert_2^2
  \ \text{s.t.}\ Ax-y+\frac{z}{t}=w.
\end{equation}$$ 对约束 $$Ax-y+\frac{z}{t}=w$$ 引入乘子 $$u$$，由最优性条件有 $$\begin{equation}
  A\hat x-\hat y+\frac{z}{t}=w,\qquad
  -A^\top u\in\partial f(\hat x),\qquad
  u\in\partial h(\hat y),\qquad
  tw=u,
\end{equation}$$ 消去 $$w$$ 得 $$u=z+t(A\hat x-\hat y)$$．根据命题 8.4： $$\begin{equation}
  \hat x\in\partial f^*(-A^\top u),
  \qquad
  \hat y\in\partial h^*(u),
\end{equation}$$ 代入 $$u=z+t(A\hat x-\hat y)$$ 最终可得 $$\begin{equation}
  0\in-A\,\partial f^*(-A^\top u)+\partial h^*(u)+\frac{1}{t}(u-z).
\end{equation}$$ 注意到 $$-A\,\partial f^*(-A^\top u)=\partial_z f^*(-A^\top z)\big\vert_{z=u}$$ （链式法则），上式正是 $$u=\operatorname{prox}_{t\psi}(z)$$ 的最优性条件： $$\begin{equation}
  0\in\partial_z\bigl[f^*(-A^\top z)+h^*(z)\bigr]_{z=u}
  +\frac{1}{t}(u-z)
  \iff u=\operatorname{prox}_{t\psi}(z).
\end{equation}$$ 反之，若有 $$u=\operatorname{prox}_{t\psi}(z)$$，则选取 $$\hat x\in\partial f^*(-A^\top u)$$ 及 $$\hat y\in\partial h^*(u)$$，即可 恢复出增广拉格朗日函数法中的原始变量，等价性成立．

由于增广拉格朗日函数法是一类有效的处理约束优化问题的算法，根据等价 性，如果近端子问题能够高效求解，PPA 也应有不错的表现------这一点在应用 举例中具体体现（子问题借对偶形式用梯度法/半光滑牛顿法求解）．

### 应用举例

##### 1. LASSO 问题求解

考虑 LASSO 问题 $$\begin{equation}
  \min_{x\in\mathbb{R}^n}\ \mu\left\Vert x\right\Vert_1+\frac12\left\Vert Ax-b\right\Vert_2^2.
\end{equation}$$ 引入变量 $$y=Ax-b$$，问题等价转化为 $$\begin{equation}
  \min_{x,y}\ \psi(x,y)\coloneqq\mu\left\Vert x\right\Vert_1+\frac12\left\Vert y\right\Vert_2^2
  +I_D(x,y),
\end{equation}$$ 其中 $$D=\lbrace(x,y):\ Ax-y=b\rbrace$$．对 (8.149) 形式的 $$\psi$$ 用 PPA，第 $$k$$ 步迭代为 $$\begin{equation}
  (x^{k+1},y^{k+1})\approx\operatorname*{arg\,min}_{x,y}
  \Bigl\lbrace\psi(x,y)+\frac{1}{2t^k}
  \bigl(\left\Vert x-x^k\right\Vert_2^2+\left\Vert y-y^k\right\Vert_2^2\bigr)\Bigr\rbrace,
\end{equation}$$ 该子问题没有显式解，需用罚函数法、增广拉格朗日函数法等迭代求解． 另一种实用方式是*通过对偶问题的解来构造* $$(x^{k+1},y^{k+1})$$： 引入拉格朗日乘子 $$z$$，子问题的对偶函数为 $$\begin{align}
  \Phi^k(z)&=\inf_x\Bigl\lbrace\mu\left\Vert x\right\Vert_1+z^\top Ax
  +\frac{1}{2t^k}\left\Vert x-x^k\right\Vert_2^2\Bigr\rbrace
  +\inf_y\Bigl\lbrace\frac12\left\Vert y\right\Vert_2^2-z^\top y
  +\frac{1}{2t^k}\left\Vert y-y^k\right\Vert_2^2\Bigr\rbrace
  -b^\top z\\
  &=\mu\,\Gamma_{\mu t^k}(x^k-t^kA^\top z)
  -\frac{1}{2t^k}\Bigl(\left\Vert x^k-t^kA^\top z\right\Vert_2^2-\left\Vert x^k\right\Vert_2^2\Bigr)
  -\frac{t^k}{2(t^k+1)}\left\Vert z\right\Vert_2^2
  -\frac{1}{t^k+1}z^\top y^k\\
  &\qquad+\frac{1}{2(t^k+1)}\left\Vert y^k\right\Vert_2^2-b^\top z,
\end{align}$$ 其中 $$\begin{equation}
  \Gamma_{\mu t^k}(u)=\inf_x
  \Bigl\lbrace\left\Vert x\right\Vert_1+\frac{1}{2\mu t^k}\left\Vert x-u\right\Vert_2^2\Bigr\rbrace
\end{equation}$$ 为 $$\ell_1$$ 范数相关的 Moreau 包络：记 $$\begin{equation}
  q_{\mu t^k}(v)=
  \begin{cases}
    \dfrac{v^2}{2\mu t^k}, & \left\vert v\right\vert\le\mu t^k,\\[6pt]
    \left\vert v\right\vert-\dfrac{\mu t^k}{2}, & \left\vert v\right\vert>\mu t^k,
  \end{cases}
\end{equation}$$ 则 $$\Gamma_{\mu t^k}(u)=\sum_{i=1}^nq_{\mu t^k}(u_i)$$（极小点 $$x=\operatorname{prox}_{\mu t^k\left\Vert\cdot\right\Vert_1}(u)$$ 处的目标值），是 连续可微函数且梯度 $$\begin{equation}
  \nabla_u\Gamma_{\mu t^k}(u)=\frac{u-\operatorname{prox}_{\mu t^k
  \left\Vert\cdot\right\Vert_1}(u)}{\mu t^k}.
\end{equation}$$ 子问题 (8.149) 的对偶问题为 $$\max_z\Phi^k(z)$$．设其 逼近最优解为 $$z^{k+1}$$，由最优性条件 $$\begin{equation}
  \begin{cases}
    x^{k+1}=\operatorname{prox}_{\mu t^k\left\Vert\cdot\right\Vert_1}
    \bigl(x^k-t^kA^\top z^{k+1}\bigr),\\[4pt]
    y^{k+1}=\dfrac{1}{t^k+1}\bigl(y^k+t^kz^{k+1}\bigr).
  \end{cases}
\end{equation}$$ 综上，LASSO 问题 PPA 的迭代格式为 $$\begin{equation}
  \left\lbrace
  \begin{aligned}
    &z^{k+1}\approx\operatorname*{arg\,max}_z\ \Phi^k(z),\\
    &x^{k+1}=\operatorname{prox}_{\mu t^k\left\Vert\cdot\right\Vert_1}
    \bigl(x^k-t^kA^\top z^{k+1}\bigr),\\
    &y^{k+1}=\frac{1}{t^k+1}\bigl(y^k+t^kz^{k+1}\bigr).
  \end{aligned}\right.
\end{equation}$$ $$\Phi^k(z)$$ 的最大值点没有显式表达式，需要迭代求解；根据 $$\Phi^k$$ 的 连续可微性可调用*梯度法*，还可证明 $$\Phi^k$$ 是*半光滑*的， 从而调用半光滑牛顿法更有效地求解（§8.8）．为保证收敛，采用如下 （§7.2.3 同款）不精确收敛准则： $$\begin{align}
  &\left\Vert\nabla\Phi^k(z^{k+1})\right\Vert_2\le\sqrt{\frac{\alpha^k}{t^k}}\,
  \varepsilon^k,\qquad
  \varepsilon^k\ge0,\ \sum_{k=1}^{\infty}\varepsilon^k<\infty;\\
  &\left\Vert\nabla\Phi^k(z^{k+1})\right\Vert_2\le\sqrt{\frac{\alpha^k}{t^k}}\,
  \delta^k\left\Vert(x^{k+1},y^{k+1})-(x^k,y^k)\right\Vert_2,\qquad
  \sum_{k=1}^{\infty}\delta^k<\infty,
\end{align}$$ 其中 $$\alpha^k$$ 为 $$\Phi^k$$ 的强凹参数（即 $$-\Phi^k$$ 的强凸参数）的 估计．数值实验（同 §6.2 的 $$A,b$$，$$\mu=10^{-2},10^{-3}$$，固定步长 $$t^k\coloneqq t=10^3$$，子问题用梯度下降法不精确求解，$$\alpha^k=\frac{t}{t+1}$$， $$\varepsilon^k=\delta^k=\frac{8}{k^2}$$）表明：PPA 收敛所需的*外部 迭代数很少*，主要计算都在内迭代求解 $$z$$ 的子问题上；对 $$z$$ 子问题用 半光滑牛顿法加速效果显著（讲义图 8.5）．

##### 2. 逆协方差矩阵估计

第三章介绍的逆协方差矩阵估计问题： $$\begin{equation}
  \min_X\ \left\langle S,\,\ X\right\rangle-\ln\det X+\lambda\left\Vert X\right\Vert_1,
\end{equation}$$ 其中 $$S$$ 是已知的对称矩阵（通常由样本协方差矩阵得到）．引入变量 $$Y$$，问题等价转化为 $$\begin{equation}
  \min_{X,Y}\ \psi(X,Y)\coloneqq-\ln\det X+\left\langle S,\,\ X\right\rangle
  +\lambda\left\Vert Y\right\Vert_1+I_D(X,Y),
  \qquad
  D=\lbrace(X,Y):\ X-Y=0\rbrace.
\end{equation}$$ 第 $$k$$ 步 PPA 子问题为 $$\begin{equation}
  \min_{X,Y}\ \psi(X,Y)+\frac{1}{2t^k}
  \bigl(\left\Vert X-X^k\right\Vert_F^2+\left\Vert Y-Y^k\right\Vert_F^2\bigr).
\end{equation}$$ 类似于 LASSO，通过求解其对偶问题来构造逼近解 $$(X^{k+1},Y^{k+1})$$： 引入乘子 $$Z$$，对偶函数为 $$\begin{align}
  \Phi^k(Z)&=\inf_X\Bigl\lbrace-\ln\det X+\frac{1}{2t^k}
  \left\Vert X-X^k+t^kZ\right\Vert_F^2\Bigr\rbrace
  -\frac{1}{2t^k}\bigl(\left\Vert X^k-t^kZ\right\Vert_F^2-\left\Vert X^k\right\Vert_F^2\bigr)\\
  &\qquad+\inf_Y\Bigl\lbrace\lambda\left\Vert Y\right\Vert_1+\frac{1}{2t^k}
  \left\Vert Y-Y^k+t^k(S-Z)\right\Vert_F^2\Bigr\rbrace
  -\frac{1}{2t^k}\bigl(\left\Vert Y^k-t^k(S-Z)\right\Vert_F^2-\left\Vert Y^k\right\Vert_F^2\bigr)\\
  &=\Gamma^1_{t^k}(X^k-t^kZ)
  -\frac{1}{2t^k}\bigl(\left\Vert X^k-t^kZ\right\Vert_F^2-\left\Vert X^k\right\Vert_F^2\bigr)\\
  &\qquad+\lambda\,\Gamma^2_{\lambda t^k}\bigl(Y^k-t^k(S-Z)\bigr)
  -\frac{1}{2t^k}\bigl(\left\Vert Y^k-t^k(S-Z)\right\Vert_F^2-\left\Vert Y^k\right\Vert_F^2\bigr),
\end{align}$$ 其中 $$\begin{equation}
  \Gamma^1_{t^k}(A)=\inf_X
  \Bigl\lbrace-\ln\det X+\frac{1}{2t^k}\left\Vert X-A\right\Vert_F^2\Bigr\rbrace.
\end{equation}$$ 对对称矩阵 $$A=Q\operatorname{Diag}(d_1,\dots,d_n)Q^\top$$，定义 $$\begin{equation}
  q^+_{t^k}(v)=\frac12\bigl(\sqrt{v^2+4t^k}+v\bigr),
  \qquad
  q^-_{t^k}(v)=\frac12\bigl(\sqrt{v^2+4t^k}-v\bigr),
\end{equation}$$ 并记 $$A^+=Q\operatorname{Diag}(q^+_{t^k}(d_1),\dots,q^+_{t^k}(d_n))Q^\top$$， $$A^-=Q\operatorname{Diag}(q^-_{t^k}(d_1),\dots,q^-_{t^k}(d_n))Q^\top$$，则 $$\Gamma^1_{t^k}(A)$$ 的最小值在 $$X=A^+$$ 处取得，最小值为 $$\begin{equation}
  \Gamma^1_{t^k}(A)=-t^k\ln\det(A^+)+\frac12\left\Vert A^-\right\Vert_F^2,
\end{equation}$$ 它是连续可微的，梯度 $$\nabla_A\Gamma^1_{t^k}(A)=A-A^+$$． $$\Gamma^2_{\lambda t^k}(U)=\inf_Y\lbrace\left\Vert Y\right\Vert_1+\frac{1}{2\lambda t^k}
\left\Vert Y-U\right\Vert_2^2\rbrace$$ 的极小点为 $$Y=\operatorname{prox}_{\lambda t^k
\left\Vert\cdot\right\Vert_1}(U)$$，梯度 $$\nabla_U\Gamma^2_{\lambda t^k}(U)=\frac{U-\operatorname{prox}_{\lambda
t^k\left\Vert\cdot\right\Vert_1}(U)}{\lambda t^k}$$．

第 $$k$$ 步 PPA 的格式为 $$\begin{equation}
  \left\lbrace
  \begin{aligned}
    &Z^{k+1}\approx\operatorname*{arg\,max}_Z\ \Phi^k(Z),\\
    &X^{k+1}=\operatorname{prox}_{-t^k\ln\det(\cdot)}
    \bigl(X^k-t^kZ^{k+1}\bigr),\\
    &Y^{k+1}=\operatorname{prox}_{\lambda t^k\left\Vert\cdot\right\Vert_1}
    \bigl(Y^k-t^k(S-Z^{k+1})\bigr).
  \end{aligned}\right.
\end{equation}$$ 注意到 $$\Phi^k$$ 不是强凹函数，往往减去近端项以保证强凹性，即第一步 改为求解 $$\begin{equation}
  Z^{k+1}\approx\operatorname*{arg\,max}_Z\ \hat\Phi^k(Z)\coloneqq
  \Phi^k(Z)-\frac{1}{2t^k}\left\Vert Z-Z^k\right\Vert_F^2,
\end{equation}$$ $$\hat\Phi^k$$ 连续可微（可用梯度法），且是*半光滑*的（可用 §8.8 的半光滑牛顿法更有效地求解）；不精确收敛准则与 LASSO 情形相同 （强凹参数可取 $$\alpha=\frac{1}{t^k}$$）．

### 收敛性分析

<div class="theorem">

**定理 8.8** 设 $$\psi$$ 是适当的闭凸函数（从而 $$\operatorname{prox}_{t\psi}$$ 对任意 $$x$$ 存在且唯一），最优值 $$\psi^*$$ 有限且在点 $$x^*$$ 处可达，则对 PPA 有 $$\begin{equation}
  \psi(x^k)-\psi^*\le\frac{\left\Vert x^0-x^*\right\Vert_2^2}{2\sum_{i=1}^{k}t^i},
  \qquad \forall k\ge1.
\end{equation}$$

</div>

**Proof** **（）** PPA 可看做近似点梯度法在 $$f=0$$ 时的特殊情况，沿用 PGA 的分析过程， 仅指出关键的不同之处：由于 $$f=0$$，对任意的 $$t>0$$， $$\begin{equation}
  f\bigl(x-tG_t(x)\bigr)\le -t\nabla f(x)^\top G_t(x)
  +\frac{t}{2}\left\Vert G_t(x)\right\Vert_2^2
\end{equation}$$ 中的 $$\nabla f$$ 项全部消失（$$G_t(x)$$ 退化为 $$\frac1t(x-\operatorname{prox}_{t\psi}(x))$$）．运用 PGA 定理 8.3 的证明过程可得 $$\begin{equation}
  t^i\bigl(\psi(x^i)-\psi^*\bigr)
  \le\frac12\bigl(\left\Vert x^{i-1}-x^*\right\Vert_2^2-\left\Vert x^i-x^*\right\Vert_2^2\bigr),
\end{equation}$$ 且 $$\lbrace\psi(x^i)\rbrace$$ 单调下降．累加： $$\begin{equation}
  \Bigl(\sum_{i=1}^{k}t^i\Bigr)\bigl(\psi(x^k)-\psi^*\bigr)
  \le\sum_{i=1}^{k}t^i\bigl(\psi(x^i)-\psi^*\bigr)
  \le\frac12\left\Vert x^0-x^*\right\Vert_2^2.
\end{equation}$$

步长的任意性**（步长的任意性）** 定理 8.8 使得可以通过每次迭代的步长控制收敛：若 $$\sum_{i=1}^{k}t^i\to+\infty$$ 则算法收敛；特别地，步长固定或有正下界时 收敛速度为 $$O(\frac1k)$$．与定理 8.3 不同，由于 $$f=0$$，*每一步的 $$t^i$$ 可以为任意值*，无需额外的上界限制．理论上 可取充分大的 $$t^i$$ 使 PPA 少量迭代即收敛，但实际意义不大：过大的 $$t^i$$ 导致子问题难以求解（$$t^i=+\infty$$ 时子问题与原问题等价）．

<div class="theorem">

**定理 8.9** 设 $$\psi$$ 是适当的闭凸函数，最优值 $$\psi^*$$ 有限且在点 $$x^*$$ 处达到． 假设参数 $$t^k,\gamma^k$$ 按 §8.3.1 的策略 1 或策略 2 选取，则 $$\begin{equation}
  \psi(x^k)-\psi^*\le
  \frac{2\left\Vert x^0-x^*\right\Vert_2^2}{\bigl(2\sqrt{t^1}
  +\sum_{i=2}^{k}\sqrt{t^i}\bigr)^2},
  \qquad k\ge1.
\end{equation}$$

</div>

**Proof** **（）** 在 $$f=0$$ 的情况下使用 Nesterov 加速算法（§8.2）的证明：由于 $$f=0$$， 对任意的 $$t>0$$，二次上界 $$f(x)\le f(y)+\nabla f(y)^\top(x-y)+\frac{1}{2t}\left\Vert x-y\right\Vert_2^2$$ 中 $$\nabla f$$ 项消失，于是结论 $$\begin{equation}
  \psi(x^k)-\psi^*\le\frac{(\gamma^k)^2}{2t^k}\left\Vert x^0-x^*\right\Vert_2^2
\end{equation}$$ 依然成立．对于固定步长 $$t^k=t$$ 和 $$\gamma^k=\frac{2}{k+1}$$： $$\frac{(\gamma^k)^2}{2t^k}=\frac{2}{(k+1)^2t}$$；而对于变步长，根据 §8.2 的估计 (8.120)： $$\begin{equation}
  \frac{(\gamma^k)^2}{2t^k}
  \le\frac{2}{\bigl(2\sqrt{t^1}+\sum_{i=2}^{k}\sqrt{t^i}\bigr)^2}.
\end{equation}$$ 对以上两种参数选择策略，分别将对应不等式代入 (8.194) 即得定理结论．

该定理意味着当 $$\sum_{i=1}^{k}\sqrt{t^i}\to+\infty$$ 时算法收敛，且 $$t^i$$ 固定或有正下界时收敛速度可达 $$O(\frac1{k^2})$$．同样地，实际中 仍需控制 $$t^i$$ 的上界以便子问题快速求解．

### Moreau--Yosida 正则化

本小节介绍 Moreau--Yosida 正则化，从另一个角度理解 PPA．

<div class="definition">

**定义 8.4** 设 $$f$$ 是适当的闭凸函数，$$t>0$$，则 $$f$$ 的以 $$t$$ 为参数的 Moreau--Yosida 正则化 $$f^{(t)}$$（又称 Moreau envelope）定义为 $$\begin{equation}
  f^{(t)}(x)=\inf_u\Bigl\lbracef(u)+\frac{1}{2t}\left\Vert u-x\right\Vert_2^2\Bigr\rbrace
  =f\bigl(\operatorname{prox}_{tf}(x)\bigr)
  +\frac{1}{2t}\left\Vert\operatorname{prox}_{tf}(x)-x\right\Vert_2^2.
\end{equation}$$

</div>

即把近端子问题的最优解 $$u=\operatorname{prox}_{tf}(x)$$ 代回目标函数 得到的关于 $$x$$ 的函数．容易验证 $$f^{(t)}$$ 的定义域为 $$\mathbb{R}^n$$（由定理 8.1）且是凸函数（§2.5 保凸运算）．

<div class="example">

**例题 8.9** 示性函数与 $$\ell_1$$ 范数的 Moreau--Yosida 正则化．

1.  $$f=I_C$$（闭凸集 $$C$$ 的示性函数）： $$\begin{equation}
              f^{(t)}(x)=\inf_{u\in C}\frac{1}{2t}\left\Vert u-x\right\Vert_2^2
              =\frac{1}{2t}\mathop{\mathrm{dist}}^2(x,C);
    \end{equation}$$

2.  $$f(x)=\left\Vert x\right\Vert_1$$：$$f^{(t)}$$ 是 **Huber 损失函数**： $$\begin{equation}
              f^{(t)}(x)=\sum_{k=1}^{n}\varphi_t(x_k),
              \qquad
              \varphi_t(z)=
              \begin{cases}
                \dfrac{z^2}{2t}, & \left\vert z\right\vert\le t,\\[6pt]
                \left\vert z\right\vert-\dfrac{t}{2}, & \left\vert z\right\vert>t.
              \end{cases}
    \end{equation}$$ （右端目标函数分量可分，逐分量极小即得；与 §6.2 光滑化梯度法 使用的 Huber 函数一致．）

</div>

例 8.9 显示：虽然 $$f$$ 可能不光滑甚至不连续，其 Moreau--Yosida 正则化 $$f^{(t)}$$ 却是*光滑*的．这对一般的适当闭凸 函数也成立：

<div class="theorem">

**定理 8.10** 设 $$f$$ 为适当的闭凸函数，则 $$f^{(t)}$$ 在全空间可微，且其梯度为 $$\begin{equation}
  \nabla f^{(t)}(x)=\frac{x-\operatorname{prox}_{tf}(x)}{t}.
\end{equation}$$

</div>

**Proof** **（）** 考虑 $$f^{(t)}$$ 的共轭函数： $$\begin{align}
  f^*_{(t)}(y)&=\sup_x\Bigl\lbracey^\top x-f^{(t)}(x)\Bigr\rbrace
  =\sup_x\Bigl\lbracey^\top x-\inf_u\Bigl[f(u)+\frac{1}{2t}\left\Vert u-x\right\Vert_2^2\Bigr]\Bigr\rbrace\\
  &=\sup_x\sup_u\Bigl\lbracey^\top x-f(u)-\frac{1}{2t}\left\Vert u-x\right\Vert_2^2\Bigr\rbrace
  =\sup_u\bigl\lbracey^\top u-f(u)\bigr\rbrace+\frac{t}{2}\left\Vert y\right\Vert_2^2
  =f^*(y)+\frac{t}{2}\left\Vert y\right\Vert_2^2,
\end{align}$$ （对固定的 $$u$$，关于 $$x$$ 的最大化由一阶条件 $$y-\frac{1}{t}(x-u)=0$$ 给出 $$x=u+ty$$，回代得 $$y^\top u-f(u)+\frac{t}{2}\left\Vert y\right\Vert_2^2$$．）由共轭理论知 $$f^{(t)}$$ 满足自共轭性 $$f^{(t)}=f^{*(t)}_{**}$$（它是适当闭凸函数），利用 该性质改写： $$\begin{equation}
  f^{(t)}(x)=\sup_y\Bigl\lbracex^\top y-f^*(y)-\frac{t}{2}\left\Vert y\right\Vert_2^2\Bigr\rbrace.
\end{equation}$$ 上式右端的目标 $$x^\top y-g(y)$$（$$g(y)\coloneqq f^*(y)+\frac{t}{2}
\left\Vert y\right\Vert_2^2$$ 强凸）的最大值点 $$y$$ 存在唯一，且满足 $$x\in\partial g(y)=\partial f^*(y)+t\cdot y$$；逐点唯一的最大化子保证 $$f^{(t)}$$ 可微且 $$\nabla f^{(t)}(x)=y(x)$$（一族仿射函数逐点取唯一的 最大化子时其上确界可微，梯度即最大化子）．另一方面，由 $$x\in\partial f^*(y)$$ 与命题 8.4 得 $$y\in\partial f(x-t\,y)$$，即 $$x-t\,y=\operatorname{prox}_{tf}(x)$$， 于是 $$\nabla f^{(t)}(x)=y=\frac{x-\operatorname{prox}_{tf}(x)}{t}$$． 下面用共轭的显式表达再推导一遍该公式：改写 $$\begin{equation}
  f^{(t)}(x)=\inf_u\Bigl\lbracef(u)+\frac{1}{2t}\left\Vert u-x\right\Vert_2^2\Bigr\rbrace
  =\frac{\left\Vert x\right\Vert_2^2}{2t}
  -\frac1t\sup_u\Bigl\lbracex^\top u-tf(u)-\frac12\left\Vert u\right\Vert_2^2\Bigr\rbrace
  =\frac{\left\Vert x\right\Vert_2^2}{2t}-\frac1t
  \Bigl(tf+\frac12\left\Vert\cdot\right\Vert_2^2\Bigr)^*(x).
\end{equation}$$ 再次利用命题 8.4（复合共轭的次微分刻画）： $$\begin{align}
  \nabla f^{(t)}(x)
  &=\frac{x}{t}-\frac1t\nabla\Bigl(tf+\frac12\left\Vert\cdot\right\Vert_2^2\Bigr)^*(x)
  =\frac{x}{t}-\frac1t\operatorname*{arg\,max}_u
  \Bigl\lbracex^\top u-tf(u)-\frac12\left\Vert u\right\Vert_2^2\Bigr\rbrace\\
  &=\frac{x}{t}-\frac1t\operatorname*{arg\,min}_u
  \Bigl\lbracetf(u)+\frac12\left\Vert u-x\right\Vert_2^2\Bigr\rbrace
  =\frac{x-\operatorname{prox}_{tf}(x)}{t}.
\end{align}$$

定理 8.10 说明 Moreau--Yosida 正则化是 $$f$$ 的一个 *光滑化*函数，光滑化参数为 $$t$$．利用 §8.4 的结果（引理 8.5， 近端算子的非膨胀性）可进一步说明 $$\nabla f^{(t)}$$ 是利普希茨连续的 （参数 $$\frac1t$$）．考虑问题 $$\begin{equation}
  \min_x\ f^{(t)}(x)=\inf_u\Bigl\lbracef(u)+\frac{1}{2t}\left\Vert u-x\right\Vert_2^2\Bigr\rbrace,
\end{equation}$$ 它和最小化 $$f$$ *同解*（$$f^{(t)}$$ 的极小值等于 $$f$$ 的极小值、 极小点集相同），但 $$f^{(t)}$$ 可微且梯度利普希茨连续，可用固定步长 （$$t^k=t$$）的梯度下降法求解： $$\begin{equation}
  x^{k+1}=x^k-t\nabla f^{(t)}(x^k)
  =x^k-\bigl(x^k-\operatorname{prox}_{tf}(x^k)\bigr)
  =\operatorname{prox}_{tf}(x^k).
\end{equation}$$ 这正是 PPA 的迭代格式 (8.151)．综上：**近似点 算法 = 先用 Moreau--Yosida 正则化对目标函数光滑化，再对光滑化的目标 函数应用梯度下降**所导出的算法．

## 分块坐标下降法

许多实际优化问题的目标函数有成千上万的自变量，对这些变量联合求解 极小值通常很困难；但自变量往往具有某种*可分离*的形式：固定其中若干 变量时，函数的结构会极大简化．**分块坐标下降法**（block coordinate descent, BCD）正是利用这一思想把原问题拆分成数个只有少数自变量的子 问题，在多数实际问题中数值表现良好．本节介绍其基本迭代格式、收敛性 结果与应用．

### 问题描述

考虑 $$\begin{equation}
  \min_{x\in X}\ F(x_1,x_2,\dots,x_s)=f(x_1,x_2,\dots,x_s)
  +\sum_{i=1}^{s}r_i(x_i),
\end{equation}$$ 其中 $$X$$ 是可行域，自变量 $$x$$ 拆分成 $$s$$ 个变量块 $$x_1,\dots,x_s$$， $$x_i\in\mathbb{R}^{n_i}$$；$$f$$ 关于 $$x$$ 可微，每个 $$r_i(x_i)$$ 关于 $$x_i$$ 是适当的 闭凸函数但不一定可微．目标函数 $$F$$ 的性质体现在 $$f$$、各 $$r_i$$ 以及 分块上：通常 $$f$$ 对所有变量块*不可分*，但单独考虑每一块时有简单 结构；$$r_i$$ 只与第 $$i$$ 块有关，是可分项．求解的难点在于如何利用分块 结构处理不可分的 $$f$$．

**（）** 问题 (8.206) 中唯一引入凸性的部分是 $$r_i$$：可行域 $$X$$ 不一定是凸集，$$f$$ 也不一定是凸函数．

并非所有问题都适合按 (8.206) 处理．下面给出六个可以 化成该形式的实际例子（§8.4.3 将介绍如何用 BCD 求解）：

<div class="example">

**例题 8.10** 考虑线性模型 $$b=a^\top x+\epsilon$$，参数 $$x=(x_1,x_2,\dots,x_G)\in\mathbb{R}^p$$ 分成 $$G$$ 组且 $$\lbracex_i\rbrace_{i=1}^G$$ 中只有少数非零向量，分组 LASSO 为 $$\begin{equation}
  \min_x\ \frac{1}{2n}\left\Vert b-Ax\right\Vert_2^2
  +\lambda\sum_{i=1}^{G}\sqrt{p_i}\,\left\Vert x_i\right\Vert_2,
\end{equation}$$ （$$A\in\mathbb{R}^{n\times p}$$，$$b\in\mathbb{R}^n$$ 由 $$n$$ 组观测组成；$$\sqrt{p_i}$$ 因子 对组大小做归一化．）待优化变量共 $$G$$ 块．

</div>

<div class="example">

**例题 8.11** 第三章 K-均值聚类问题的等价形式： $$\begin{equation}
  \min_{\Phi,H}\ \left\Vert A-\Phi H\right\Vert_F^2
  \ \text{s.t.}\ \Phi\in\mathbb{R}^{n\times k}\ \text{每一行只有一个元素为 1，其余为 0};\
  H\in\mathbb{R}^{k\times p},
\end{equation}$$ 矩阵分解问题，自变量两块；$$\Phi$$ 取值在离散空间上，故不是凸问题．

</div>

<div class="example">

**例题 8.12** 设 $$b\in\mathbb{R}^m$$ 为观测向量，$$A$$ 为线性映射： $$\begin{equation}
  \min_{X,Y}\ \frac12\left\Vert A(XY)-b\right\Vert_2^2+\alpha\left\Vert X\right\Vert_F^2
  +\beta\left\Vert Y\right\Vert_F^2,
\end{equation}$$ 正则化消除解 $$(X,Y)$$ 在放缩意义下的不唯一性；自变量两块．类似的还有 非负矩阵分解与非负张量分解： $$\begin{equation}
  \min_{X,Y\ge0}\ \frac12\left\Vert XY-M\right\Vert_F^2+\alpha r_1(X)+\beta r_2(Y),
  \qquad
  \min_{A_1,\dots,A_N\ge0}\ \frac12\left\Vert M-A_1\circ A_2\circ\dots\circ
  A_N\right\Vert_F^2+\sum_{i=1}^{N}\lambda_ir_i(A_i),
\end{equation}$$ （后者自变量 $$N$$ 块，\"$$\circ$$\" 为张量外积．）

</div>

<div class="example">

**例题 8.13** 第四章的字典学习问题（§3.9）也具有形式 (8.206)（见 §8.4.3 例 4）．

</div>

<div class="example">

**例题 8.14** 第四章最大割问题的半定松弛（§4.5）之外，实际算法设计中也常用基于 半定松弛的**非凸松弛**： $$\begin{equation}
  \underbrace{\min_X\ \left\langle C,\,\ X\right\rangle\ \ \text{s.t.}\ \ X_{ii}=1,\ X\succeq0}_{\text{半定松弛}},
  \qquad
  \underbrace{\min_V\ \left\langle C,\,\ V^\top V\right\rangle\ \ \text{s.t.}\ \ v_i\in\mathbb{R}^p,\
  \left\Vert v_i\right\Vert=1}_{\text{非凸松弛}\ \eqref{eq:ch8-maxcut-nc}},
\end{equation}$$ （$$V=[v_1,\dots,v_n]$$．）非凸松弛通过引入分解 $$X=V^\top V$$ 并限制 $$V$$ 每列的 $$\ell_2$$ 范数为 1，消去了半定松弛中 $$X$$ 对角线为 1 与 $$X\succeq0$$ 的约束；但两问题一般*不等价*（$$p$$ 充分大时等价），实际中通常取较小 的 $$p$$．$$V$$ 按列分成 $$n$$ 块，天然具有 BCD 结构．

</div>

### 算法结构

BCD 按照次序 $$x_1,\dots,x_s$$ 依次固定其他 $$s-1$$ 块变量极小化 $$F$$： 一块变量极小化完成后其值*立即*被更新到变量空间中（Gauss--Seidel 式），更新下一块时使用每个变量最新的值．定义辅助函数 $$\begin{equation}
  f_i^k(x_i)=f\bigl(x_1^k,\dots,x_{i-1}^k,\ x_i,\
  x_{i+1}^{k-1},\dots,x_s^{k-1}\bigr),
\end{equation}$$ （更新第 $$i$$ 块时光滑部分的目标：前 $$i-1$$ 块已更新到第 $$k$$ 次迭代的 值，后面仍是第 $$k-1$$ 次的旧值．）每步更新使用以下三种格式之一： $$\begin{align}
  x_i^k&=\operatorname*{arg\,min}_{x_i\in X_i^k}
  \Bigl\lbracef_i^k(x_i)+r_i(x_i)\Bigr\rbrace,
  \\
  x_i^k&=\operatorname*{arg\,min}_{x_i\in X_i^k}
  \Bigl\lbracef_i^k(x_i)+\frac{L_i^{k-1}}{2}\left\Vert x_i-x_i^{k-1}\right\Vert_2^2
  +r_i(x_i)\Bigr\rbrace,
  \\
  x_i^k&=\operatorname*{arg\,min}_{x_i\in X_i^k}
  \Bigl\lbrace\left\langle \hat g_i^k,\,x_i-\hat x_i^{k-1}\right\rangle
  +\frac{L_i^{k-1}}{2}\left\Vert x_i-\hat x_i^{k-1}\right\Vert_2^2+r_i(x_i)\Bigr\rbrace,
\end{align}$$ 其中 $$L_i^k>0$$ 为常数， $$X_i^k=\lbracex\in\mathbb{R}^{n_i}:\ (x_1^k,\dots,x_{i-1}^k,\ x,\
x_{i+1}^{k-1},\dots,x_s^{k-1})\in X\rbrace$$；格式 (8.215) 中 $$\hat x_i^{k-1}$$ 采用**外推**定义： $$\begin{equation}
  \hat x_i^{k-1}=x_i^{k-1}+\omega_i^{k-1}\bigl(x_i^{k-1}-x_i^{k-2}\bigr),
  \qquad
  \hat g_i^k\coloneqq\nabla f_i^k(\hat x_i^{k-1}),
\end{equation}$$ $$\omega_i^k\ge0$$ 为外推权重；取 $$\omega_i^k=0$$ 即得无外推的格式，此时 (8.215) 等价于一次近似点梯度法更新．三种格式的理解： (8.213) 最直接（固定其他分量求极小）；(8.214) 增加近端项限制下一步迭代不过远离当前位置（使算法收敛）；(8.215) 先对 $$f_i^k$$ 线性化简化子问题，再引入 Nesterov 加速的外推技巧加快收敛．

<div class="algorithm">

**算法 29**

**初始化**：选择两组初始点 $$(x_1^{-1},\dots,x_s^{-1})=(x_1^0,\dots,x_s^0)$$．

<div class="algorithmic">

使用格式 (8.213)、(8.214) 或 (8.215) 更新 $$x_i^k$$； 返回 $$(x_1^k,\dots,x_s^k)$$，算法终止；

</div>

</div>

三种格式产生不同的迭代序列，可能收敛到不同的解，数值表现也不相同： (8.213) 严格保证目标函数值下降，但 $$f$$ 复杂时子问题 难解；收敛性方面它在强凸问题上可保证收敛到极小值，非凸问题上不一定 收敛；(8.214)(8.215) 是其修正，不保证 单调性但改善收敛性（(8.214) 在 $$F$$ 非严格凸时改善 收敛；(8.215) 为一阶泰勒近似，在测试问题上有更好 表现------可能因一阶近似可避开一些局部极小点------且计算量小、易实现）． 实际应用中三种格式对不同变量块可以*混用*（同一变量块在整个迭代 中应使用相同格式）：例如字典学习中若对 $$D$$ 用 (8.213)、 对 $$X$$ 用 (8.215)，则两个子问题都有显式解．

<div class="example">

**例题 8.15** 考虑 $$\min f(x,y)=x^2-2xy+10y^2-4x-20y$$．固定 $$y$$ 时 $$x=2+y$$ 处取极小； 固定 $$x$$ 时 $$y=1+\frac{x}{10}$$ 处取极小．采用格式 (8.213) 的 BCD： $$\begin{equation}
  x^{k+1}=2+y^k,
  \qquad
  y^{k+1}=1+\frac{x^{k+1}}{10}.
\end{equation}$$ 初始点 $$(0.5,0.2)$$ 出发约 7 次迭代即充分接近最优解（讲义图 8.6）． 回忆 §6.2 例 6.2 中对类似问题用梯度法收敛相当缓慢------直观解释：对 病态问题，BCD 逐个分量处理能较好捕捉目标函数的*各向异性*，而 梯度法受病态影响很大．

</div>

<div class="example">

**例题 8.16** 对非凸 $$f$$，算法 29（格式 (8.213)） 可能失效：Powell 1973 年的例子------令 $$\begin{equation}
  F(x_1,x_2,x_3)=-x_1x_2-x_2x_3-x_3x_1
  +\sum_{i=1}^{3}\bigl[(x_i-1)_+^2+(-x_i-1)_+^2\bigr],
\end{equation}$$ （$$(x_i-1)_+^2$$ 表示先对 $$x_i-1$$ 取正部再平方．）取 $$\epsilon>0$$， 初始点 $$x^0=(-1-\epsilon,\ \frac{1+\epsilon}{2},\ -1-\frac{\epsilon}{4})$$， 可验证迭代序列满足 $$\begin{equation}
  x^k=(-1)^k\cdot(-1,1,-1)+\Bigl(-\frac18\Bigr)^k\cdot
  \Bigl(-\epsilon,\ \frac{\epsilon}{2},\ -\frac{\epsilon}{4}\Bigr),
\end{equation}$$ 该序列有两个聚点 $$(-1,1,-1)$$ 与 $$(1,-1,1)$$，但这两个点*都不是* $$F$$ 的稳定点．这表明 BCD 的收敛性需要更多假设，对非凸函数可能失败．

</div>

### 应用举例

##### 1. LASSO 问题

LASSO 问题 $$\min_x\ \mu\left\Vert x\right\Vert_1+\frac12\left\Vert Ax-b\right\Vert^2$$ 中 $$\left\Vert x\right\Vert_1$$ 可分，故第 $$i$$ 块即 $$x$$ 的第 $$i$$ 个分量．把 $$x$$ 记为 $$x=\bigl(\begin{smallmatrix}x_i\\ \bar x_i\end{smallmatrix}\bigr)$$ （$$\bar x_i$$ 为去掉第 $$i$$ 个分量的向量），$$A=[a_i\ \ \bar A_i]$$（$$\bar A_i$$ 为去掉第 $$i$$ 列的矩阵）．第 $$i$$ 块更新用格式 (8.213)： $$\begin{equation}
  \min_{x_i}\ \mu\left\vert x_i\right\vert+\mu\left\Vert\bar x_i\right\Vert_1
  +\frac12\left\Vert a_ix_i-\bigl(b-\bar A_i\bar x_i\bigr)\right\Vert^2,
\end{equation}$$ 做替换 $$c^i=b-\bar A_i\bar x_i$$，与 $$\bar x_i$$ 有关的项为常数，等价于 $$\begin{equation}
  \min_{x_i}\ f_i(x_i)\coloneqq\mu\left\vert x_i\right\vert
  +\frac12\left\Vert a_i\right\Vert_2^2x_i^2-a_i^\top c^ix_i,
\end{equation}$$ 直接写出最小值点 $$\begin{equation}
  x_i^k=\operatorname*{arg\,min}_{x_i}f_i(x_i)=
  \begin{cases}
    \dfrac{a_i^\top c^i-\mu}{\left\Vert a_i\right\Vert_2^2}, & a_i^\top c^i>\mu,\\[8pt]
    \dfrac{a_i^\top c^i+\mu}{\left\Vert a_i\right\Vert_2^2}, & a_i^\top c^i<-\mu,\\[8pt]
    0, & \text{其他}.
  \end{cases}
\end{equation}$$

<div class="algorithm">

**算法 30**

**输入**：$$A,b$$，参数 $$\mu$$；初始化 $$x^0=0$$，$$k\leftarrow1$$．

<div class="algorithmic">

根据定义计算 $$\bar x_i$$，$$c^i$$； 使用上式计算 $$x_i^k$$； $$k\leftarrow k+1$$；

</div>

</div>

数值实验（同 §6.2 的 $$A,b$$，$$\mu=10^{-2},10^{-3}$$，连续化策略）：结合 连续化策略后坐标下降法很快收敛（讲义图 8.7）；相比其他算法，坐标下降法 *不需要调节步长参数*．

##### 2. K-均值聚类

对聚类问题（例 8.11）的 BCD：固定 $$H$$ 时，设 $$\Phi$$ 的第 $$i$$ 行为 $$\phi_i^\top$$，$$\phi_i$$ 只有一个分量为 1（设第 $$j$$ 个）， $$\phi_i^\top H$$ 即取出 $$H$$ 的第 $$j$$ 行，故 $$\left\Vert a_i^\top-\phi_i^\top H\right\Vert$$ 是 $$a_i^\top$$ 与 $$H$$ 第 $$j$$ 个行向量的距离；极小化 $$\left\Vert A-\Phi H\right\Vert_F^2$$ 时 $$j$$ 应取 $$H$$ 中距 $$a_i$$ 最近的行： $$\begin{equation}
  \Phi_{ij}=
  \begin{cases}
    1, & j=\operatorname*{arg\,min}_l\left\Vert a_i-h_l\right\Vert,\\
    0, & \text{其他};
  \end{cases}
\end{equation}$$ 固定 $$\Phi$$ 时，目标按类分解为 $$\left\Vert A-\Phi H\right\Vert_F^2=\sum_{j=1}^{k}\sum_{a\in S_j}\left\Vert a-h_j\right\Vert^2$$，设 $$\bar a_j$$ 为第 $$j$$ 类所有点的均值，由 $$\begin{equation}
  \sum_{a\in S_j}\left\Vert a-h_j\right\Vert^2
  =\sum_{a\in S_j}\bigl(\left\Vert a-\bar a_j\right\Vert^2+\left\Vert\bar a_j-h_j\right\Vert^2\bigr)
\end{equation}$$ （交叉项 $$\sum_{a\in S_j}\left\langle a-\bar a_j,\,\bar a_j-h_j\right\rangle=0$$），故 $$h_j$$ 直接取 $$\bar a_j$$ 即达到最小．综上，聚类的 BCD 每次迭代两步： (1) 固定参考点 $$H$$，把每个样本分到最近参考点代表的类中； (2) 固定聚类方式 $$\Phi$$，重算每类均值作为新参考点------ **这正是经典的 K-均值聚类算法**，即 K-均值本质上是分块坐标下降法．

##### 3. 非负矩阵分解

最基本的非负矩阵分解问题 $$\min_{X,Y\ge0}\frac12\left\Vert XY-M\right\Vert_F^2$$ 的等价形式为 $$\begin{equation}
  \min_{X,Y}\ \frac12\left\Vert XY-M\right\Vert_F^2+I_{\ge0}(X)+I_{\ge0}(Y),
\end{equation}$$ 具有形式 (8.206)．$$X,Y$$ 耦合，固定 $$Y$$ 时格式 (8.213)(8.206) 无显式解（额外设计算法 计算量大），用格式 (8.215) 线性化：令 $$f(X,Y)=\frac12\left\Vert XY-M\right\Vert_F^2$$，则 $$\begin{equation}
  \frac{\partial f}{\partial X}=(XY-M)Y^\top,
  \qquad
  \frac{\partial f}{\partial Y}=X^\top(XY-M),
\end{equation}$$ （$$r_i$$ 为凸集示性函数时格式 (8.215) 即求到该集合的 投影．）得 BCD： $$\begin{equation}
  X^{k+1}=\max\bigl\lbraceX^k-t_X^k(X^kY^k-M)(Y^k)^\top,\ 0\bigr\rbrace,
  \qquad
  Y^{k+1}=\max\bigl\lbraceY^k-t_Y^k(X^k)^\top(X^kY^k-M),\ 0\bigr\rbrace,
\end{equation}$$ 其中 $$t_X^k,t_Y^k$$ 是步长（对应 (8.215) 中的 $$1/L_i^k$$）．

##### 4. 字典学习

带罚函数形式的字典学习： $$\begin{equation}
  \min\ \frac{1}{2n}\left\Vert DX-A\right\Vert_F^2+\lambda\left\Vert X\right\Vert_1
  +\frac{\mu}{2}\left\Vert D\right\Vert_F^2,
\end{equation}$$ （用罚函数 $$\frac{\mu}{2}\left\Vert D\right\Vert_F^2$$ 代替 $$\left\Vert D\right\Vert_F\le1$$ 约束， 一定条件下二者等价．）变量两块：固定 $$D$$ 时 $$f_D(X)=\frac{1}{2n}
\left\Vert DX-A\right\Vert_F^2+\lambda\left\Vert X\right\Vert_1$$ 的直接极小化是 $$n$$ 个 LASSO 问题， 无显式解，用格式 (8.215)（光滑部分梯度 $$G=\frac1nD^\top(DX-A)$$）： $$\begin{equation}
  X^{k+1}=\operatorname{prox}_{t^k\lambda\left\Vert\cdot\right\Vert_1}
  \Bigl(X^k-\frac{t^k}{n}(D^k)^\top(D^kX^k-A)\Bigr);
\end{equation}$$ 固定 $$X$$ 时 $$f_X(D)=\frac{1}{2n}\left\Vert DX-A\right\Vert_F^2+\frac{\mu}{2}
\left\Vert D\right\Vert_F^2$$ 的直接极小化是 $$m$$ 个岭回归问题，有显式解 （$$\nabla_{D^\top}f_X=\frac1nX(X^\top D^\top-A^\top)+\mu D^\top$$ 置零）： $$\begin{equation}
  D=AX^\top(XX^\top+n\mu I)^{-1},
\end{equation}$$ （$$X\in\mathbb{R}^{k\times n}$$，$$k\ll n$$，$$XX^\top$$ 小矩阵易求逆．）故格式 (8.213) 等价于 $$\begin{equation}
  D^{k+1}=A(X^{k+1})^\top\bigl(X^{k+1}(X^{k+1})^\top+n\mu I\bigr)^{-1}.
\end{equation}$$ 先更新 $$X$$ 再更新 $$D$$ 得字典学习的 BCD： $$\begin{equation}
  X^{k+1}=\operatorname{prox}_{t^k\lambda\left\Vert\cdot\right\Vert_1}
  \Bigl(X^k-\frac{t^k}{n}(D^k)^\top(D^kX^k-A)\Bigr),
  \qquad
  D^{k+1}=A(X^{k+1})^\top\bigl(X^{k+1}(X^{k+1})^\top+n\mu I\bigr)^{-1}.
\end{equation}$$

##### 5. 最大割问题的非凸松弛

非凸松弛（例 8.14） $$\begin{equation}
  \min_V\ \left\langle C,\,\ V^\top V\right\rangle
  \ \text{s.t.}\ v_i\in\mathbb{R}^p,\ \left\Vert v_i\right\Vert=1,\ i=1,\dots,n
\end{equation}$$ 有自然的分块结构（$$V$$ 按列 $$n$$ 块）．以格式 (8.213) 为例：取定 $$i$$ 固定其余 $$v_j\ (j\ne i)$$，由分块乘法，目标函数中与 $$v_i$$ 有关的部分为 $$C_{ii}v_i^\top v_i+\sum_{j\ne i}(C_{ij}+C_{ji})
v_i^\top v_j$$；约束 $$\left\Vert v_i\right\Vert=1$$ 使第一项为常数，$$C$$ 对称使 $$C_{ij}=C_{ji}$$，故第 $$i$$ 步子问题为 $$\begin{equation}
  \min\ f_i(v_i)=\Bigl(\sum_{j\ne i}C_{ji}v_j^\top\Bigr)v_i
  \ \text{s.t.}\ \left\Vert v_i\right\Vert=1.
\end{equation}$$ 由柯西不等式， $$\begin{equation}
  \Bigl(\sum_{j\ne i}C_{ji}v_j^\top\Bigr)v_i
  \ge-\left\Vert\sum_{j\ne i}C_{ji}v_j\right\Vert\cdot\left\Vert v_i\right\Vert
  =-\left\Vert\sum_{j\ne i}C_{ji}v_j\right\Vert,
\end{equation}$$ 等号成立当且仅当 $$\begin{equation}
  v_i=\frac{-\sum_{j\ne i}C_{ji}v_j}
  {\left\Vert\sum_{j\ne i}C_{ji}v_j\right\Vert}.
\end{equation}$$

<div class="algorithm">

**算法 31**

**初始化**：$$v_i$$ 且 $$\left\Vert v_i\right\Vert=1$$．

<div class="algorithmic">

计算 $$b_i=\sum_{j\ne i}C_{ji}v_j$$； 更新 $$v_i=-b_i/\left\Vert b_i\right\Vert$$；

</div>

</div>

同理为增加稳定性也可使用格式 (8.214) 求解（习题）．

### 收敛性分析

<div class="supp">

对格式 (8.215) 在 $$s=2$$ 且*非凸*情形进行收敛性 分析，主要工具是 Kurdyka--Łojasiewicz（KL）性质．

</div>

为叙述简便，重新记号．考虑 $$\begin{equation}
  \min_{(x,y)\in\mathbb{R}^n\times\mathbb{R}^m}\ \Psi(x,y)\coloneqq f(x)+g(y)+H(x,y),
\end{equation}$$ 其中 $$f,g$$ 为适当闭函数（*不再是凸函数*），$$H$$ 为定义域上的连续 可微函数．对 (8.237)，格式 (8.215) 化为（取 $$\hat g_i^k$$ 为 $$\nabla_xH(x^k,y^k)$$ 或 $$\nabla_yH(x^k,y^k)$$， $$\hat x_i^k$$ 为 $$x^k$$ 或 $$y^k$$）： $$\begin{align}
  x^{k+1}&\in\operatorname{prox}_{c^kf}\bigl(x^k-c^k\nabla_xH(x^k,y^k)\bigr),
  \\
  y^{k+1}&\in\operatorname{prox}_{d^kg}\bigl(y^k-d^k\nabla_yH(x^{k+1},y^k)\bigr).
\end{align}$$ 其中 $$c^k,d^k$$ 为步长参数（对应 (8.215) 中的 $$L_i^k$$）． 由于 $$f,g$$ 非凸，$$\operatorname{prox}_f,\operatorname{prox}_g$$ 是集合 函数，迭代只要求 $$x^{k+1},y^{k+1}$$ 是相应集合中的元素（下界有限的假设 保证良定义）．

近似点交替线性化方法**（近似点交替线性化方法）** 由于自变量只有两块、对光滑部分 $$H$$ 采用线性化处理，格式 (8.238)(8.239) 又称为**近似点交替 线性化方法**（proximal alternating linearized minimization, PALM）； 当变量只有一块时退化为非凸情形的近似点梯度法，收敛性可类似建立．

**（）**   (1) $$f:\mathbb{R}^n\to(-\infty,+\infty]$$，$$g:\mathbb{R}^m\to(-\infty,+\infty]$$ 均为 适当下半连续函数，且 $$\inf_{\mathbb{R}^n\times\mathbb{R}^m}\Psi>-\infty$$， $$\inf_{\mathbb{R}^n}f>-\infty$$，$$\inf_{\mathbb{R}^m}g>-\infty$$； (2) $$H:\mathbb{R}^n\times\mathbb{R}^m\to\mathbb{R}$$ 连续可微，且 $$\nabla H$$ 在有界集上是 *联合*利普希茨连续的：对任意 $$B_1\times B_2\subset\mathbb{R}^n\times\mathbb{R}^m$$， 存在 $$L>0$$ 使得 $$\begin{equation}
  \left\Vert\bigl(\nabla_xH(x^1,y^1)-\nabla_xH(x^2,y^2),\
  \nabla_yH(x^1,y^1)-\nabla_yH(x^2,y^2)\bigr)\right\Vert
  \le L\left\Vert(x^1-x^2,\ y^1-y^2)\right\Vert.
\end{equation}$$

由假设 8.6.4(2)，$$H$$ 关于每个分量都是梯度 $$L$$-利普希茨 连续的且参数与另一分量无关；$$\Psi$$ 的次微分（非凸定义，第五章定义 5.3）可直接写出： $$\begin{equation}
  \partial\Psi(x,y)=\bigl(\nabla_xH(x,y)+\partial f(x),\
  \nabla_yH(x,y)+\partial g(y)\bigr).
\end{equation}$$

收敛性分析分三步：推导每步迭代的函数值充分下降量；证明子列收敛； 证明全序列收敛．

##### 第一步：充分下降

<div class="lemma">

**引理 8.1** 设 $$h:\mathbb{R}^d\to\mathbb{R}$$ 连续可微且 $$\nabla h$$ 利普希茨连续（常数 $$L_h$$）， $$\sigma:\mathbb{R}^d\to(-\infty,+\infty]$$ 适当下半连续且 $$\inf_{\mathbb{R}^d}\sigma>-\infty$$．固定 $$t<\frac{1}{L_h}$$，则对任意的 $$u\in\operatorname{dom}\sigma$$ 和 $$\tilde u\in\operatorname{prox}_{t\sigma}
(u-t\nabla h(u))$$： $$\begin{equation}
  h(\tilde u)+\sigma(\tilde u)\le h(u)+\sigma(u)
  -\frac12\Bigl(\frac1t-L_h\Bigr)\left\Vert\tilde u-u\right\Vert^2.
\end{equation}$$

</div>

**Proof** **（）** 由 $$\sigma$$ 的假设，$$\tilde u$$ 良定义．由 $$\tilde u$$ 的最优性： $$\begin{equation}
  \left\langle \tilde u-u,\,\nabla h(u)\right\rangle+\frac{1}{2t}\left\Vert\tilde u-u\right\Vert^2
  +\sigma(\tilde u)\le\sigma(u).
\end{equation}$$ 结合二次上界 §6.2： $$\begin{align}
  h(\tilde u)+\sigma(\tilde u)
  &\le h(u)+\left\langle \tilde u-u,\,\nabla h(u)\right\rangle
  +\frac{L_h}{2}\left\Vert\tilde u-u\right\Vert^2+\sigma(\tilde u)\\
  &\le h(u)+\frac{L_h}{2}\left\Vert\tilde u-u\right\Vert^2+\sigma(u)
  -\frac{1}{2t}\left\Vert\tilde u-u\right\Vert^2\\
  &=h(u)+\sigma(u)-\frac12\Bigl(\frac1t-L_h\Bigr)\left\Vert\tilde u-u\right\Vert^2.
\end{align}$$

（证明中没有用到 $$t<\frac{1}{L_h}$$------引理中的不等式对任意 $$t>0$$ 成立；要求 $$t<\frac1{L_h}$$ 是为了让每步有充分的下降量，使迭代 成为下降算法．）

<div class="theorem">

**定理 8.11** 在假设 8.6.4 下，$$\lbracez^k\rbrace$$（$$z^k=(x^k,y^k)$$）为迭代格式 (8.238)(8.239) 产生的序列且 $$z^k$$ 有界， 取步长 $$c^k=d^k=\frac{1}{\gamma L}$$（$$\gamma>1$$，$$L$$ 为 $$\nabla H$$ 的 利普希茨系数），则：

1.  函数值序列 $$\lbrace\Psi(z^k)\rbrace$$ 单调下降，且 $$\begin{equation}
              \frac{\rho_1}{2}\left\Vert z^{k+1}-z^k\right\Vert^2\le
              \Psi(z^k)-\Psi(z^{k+1}),\qquad \forall k\ge0,
    \end{equation}$$ 其中 $$\rho_1=(\gamma-1)L$$；

2.  序列 $$\lbrace\left\Vert z^{k+1}-z^k\right\Vert\rbrace$$ 平方可和： $$\begin{equation}
              \sum_{k=1}^{\infty}\bigl(\left\Vert x^{k+1}-x^k\right\Vert^2
              +\left\Vert y^{k+1}-y^k\right\Vert^2\bigr)
              =\sum_{k=1}^{\infty}\left\Vert z^{k+1}-z^k\right\Vert^2<+\infty,
    \end{equation}$$ 从而 $$\lim_{k\to\infty}\left\Vert z^{k+1}-z^k\right\Vert=0$$．

</div>

**Proof** **（）** (1) 由假设 8.6.4(2) 与引理 8.1 得每一步的下降量估计： $$\begin{align}
  H(x^{k+1},y^k)+f(x^{k+1})
  &\le H(x^k,y^k)+f(x^k)
  -\frac12\Bigl(\frac{1}{c^k}-L\Bigr)\left\Vert x^{k+1}-x^k\right\Vert^2\\
  &=H(x^k,y^k)+f(x^k)-\frac12(\gamma-1)L\left\Vert x^{k+1}-x^k\right\Vert^2,\\
  H(x^{k+1},y^{k+1})+g(y^{k+1})
  &\le H(x^{k+1},y^k)+g(y^k)
  -\frac12(\gamma-1)L\left\Vert y^{k+1}-y^k\right\Vert^2.
\end{align}$$ 两式相加消去 $$H(x^{k+1},y^k)$$： $$\begin{equation}
  \Psi(z^k)-\Psi(z^{k+1})
  \ge\frac12(\gamma-1)L
  \bigl(\left\Vert x^{k+1}-x^k\right\Vert^2+\left\Vert y^{k+1}-y^k\right\Vert^2\bigr),
\end{equation}$$ 即 (8.245)；由此 $$\lbrace\Psi(z^k)\rbrace$$ 单调下降，由 $$\inf\Psi>-\infty$$ 知其收敛到有限值 $$\Psi^*$$．

\(2\) 对任意整数 $$N$$，在 (8.245) 中对 $$k$$ 求和： $$\begin{equation}
  \sum_{k=0}^{N-1}\left\Vert z^{k+1}-z^k\right\Vert^2
  \le\frac{2}{\rho_1}\bigl(\Psi(z^0)-\Psi(z^N)\bigr)
  \le\frac{2}{\rho_1}\bigl(\Psi(z^0)-\Psi^*\bigr),
\end{equation}$$ 令 $$N\to\infty$$ 即得平方可和与 $$\lim_k\left\Vert z^{k+1}-z^k\right\Vert=0$$．

定理 8.11 表明：一轮迭代后函数值下降量的下界可被 相邻迭代点的距离控制------几乎所有下降类算法在一定条件下都满足该性质 （收敛性分析第一步完成）．

##### 第二步：次梯度上界与极限点

<div class="lemma">

**引理 8.2** 在假设 8.6.4 下，设 $$\lbracez^k\rbrace$$ 为迭代产生的有界序列，定义 $$\begin{align}
  a_x^k&=\frac{1}{c^{k-1}}\bigl(x^{k-1}-x^k\bigr)
  +\nabla_xH(x^k,y^k)-\nabla_xH(x^{k-1},y^{k-1}),\\
  a_y^k&=\frac{1}{d^{k-1}}\bigl(y^{k-1}-y^k\bigr)
  +\nabla_yH(x^k,y^k)-\nabla_yH(x^k,y^{k-1}),
\end{align}$$ 则 $$(a_x^k,a_y^k)\in\partial\Psi(x^k,y^k)$$ 且 $$\begin{equation}
  \left\Vert(a_x^k,a_y^k)\right\Vert\le\left\Vert a_x^k\right\Vert+\left\Vert a_y^k\right\Vert
  \le\rho_2\left\Vert z^k-z^{k-1}\right\Vert,
  \qquad \rho_2=(2\gamma+3)L.
\end{equation}$$

</div>

**Proof** **（）** 由迭代格式 (8.238) 的次微分最优性（推论 8.1）：存在 $$u^k\in\partial f(x^k)$$ 使 $$\begin{equation}
  \nabla_xH(x^{k-1},y^{k-1})+u^k=\frac{1}{c^{k-1}}\bigl(x^{k-1}-x^k\bigr),
\end{equation}$$ 同理存在 $$v^k\in\partial g(y^k)$$ 使 $$\nabla_yH(x^k,y^{k-1})+v^k=\frac{1}{d^{k-1}}(y^{k-1}-y^k)$$． 由 $$a_x^k,a_y^k$$ 的定义与 $$\partial\Psi$$ 的表达式： $$\begin{equation}
  a_x^k=\nabla_xH(x^k,y^k)+u^k\in\partial_x\Psi(x^k,y^k),
  \qquad
  a_y^k=\nabla_yH(x^k,y^k)+v^k\in\partial_y\Psi(x^k,y^k),
\end{equation}$$ （$$a_y^k$$ 中 $$\nabla_yH$$ 的自变量差异 $$\nabla_yH(x^k,y^k)-\nabla_yH(x^k,y^{k-1})$$ 恰好把 $$\nabla_yH(x^k,y^{k-1})$$ 换成 $$\nabla_yH(x^k,y^k)$$．）故 $$(a_x^k,a_y^k)\in\partial\Psi(x^k,y^k)$$．模长估计：由 $$\nabla H$$ 的联合 利普希茨连续性， $$\begin{align}
  \left\Vert a_x^k\right\Vert
  &\le\frac{1}{c^{k-1}}\left\Vert x^{k-1}-x^k\right\Vert
  +\left\Vert\nabla_xH(x^k,y^k)-\nabla_xH(x^{k-1},y^{k-1})\right\Vert\\
  &\le\Bigl(L+\frac{1}{c^{k-1}}\Bigr)\left\Vert x^{k-1}-x^k\right\Vert
  +L\left\Vert y^{k-1}-y^k\right\Vert\\
  &=(\gamma+1)L\left\Vert x^{k-1}-x^k\right\Vert+L\left\Vert y^{k-1}-y^k\right\Vert
  \le(\gamma+2)L\left\Vert z^{k-1}-z^k\right\Vert;
\end{align}$$ 对 $$\left\Vert a_y^k\right\Vert$$ 只需 $$\nabla_yH$$ 关于 $$y$$ 的利普希茨连续性： $$\begin{equation}
  \left\Vert a_y^k\right\Vert\le\Bigl(\frac{1}{d^{k-1}}+L\Bigr)\left\Vert y^k-y^{k-1}\right\Vert
  \le(\gamma+1)L\left\Vert z^k-z^{k-1}\right\Vert.
\end{equation}$$ 结合两个估计并统一放大即得 $$\left\Vert(a_x^k,a_y^k)\right\Vert\le(2\gamma+3)L\left\Vert z^k-z^{k-1}\right\Vert$$．

引理 8.2 说明：随着迭代进行，$$\partial\Psi(z^k)$$ 将包含一个模长趋于 $$0$$ 的向量．设 $$\omega(z^0)$$ 为迭代序列的所有极限 点集，则（证明较烦琐，可参考 Attouch--Bolte--Svaiter）：

<div class="lemma">

**引理 8.3** 设 $$\lbracez^k\rbrace$$ 有界，则： (1) $$\varnothing\ne\omega(z^0)\subset\operatorname{crit}\Psi$$ （$$\operatorname{crit}\Psi$$ 为 $$\Psi$$ 的所有临界点集）； (2) $$\lim_{k\to\infty}\mathop{\mathrm{dist}}(z^k,\omega(z^0))=0$$； (3) $$\omega(z^0)$$ 是非空的连通紧集； (4) $$\Psi$$ 在 $$\omega(z^0)$$ 上是一个有限的常数．

</div>

至此得到子列收敛性（迭代点与临界点越来越接近）．全序列收敛需要第三 步------KL 性质．

##### 第三步：利用 KL 性质证明全序列收敛

给定实数 $$\alpha\le\beta$$，记 $$[\alpha\le\sigma\le\beta]=\lbracex:\ \alpha\le\sigma(x)\le\beta\rbrace$$．

<div class="definition">

**定义 8.5** $$\Phi_\eta$$ 是凹连续函数 $$\phi:[0,\eta)\to\mathbb{R}^+$$ 的集合且满足： $$\phi(0)=0$$；$$\phi$$ 在 $$(0,\eta)$$ 内连续可微、在点 0 处连续；对任意 $$s\in(0,\eta)$$ 有 $$\phi'(s)>0$$．

</div>

<div class="definition">

**定义 8.6** 设 $$\sigma:\mathbb{R}^d\to(-\infty,+\infty]$$ 适当下半连续． (1) 称 $$\sigma$$ 在给定点 $$\bar u\in\operatorname{dom}\partial\sigma$$ 处具有 KL 性质， 若存在 $$\eta\in(0,+\infty]$$、$$\bar u$$ 的邻域 $$U$$ 以及 $$\phi\in\Phi_\eta$$，使得对任意 $$u\in U\cap[\sigma(\bar u)<\sigma<\sigma(\bar u)+\eta]$$： $$\begin{equation}
  \phi'\bigl(\sigma(u)-\sigma(\bar u)\bigr)\cdot
  \mathop{\mathrm{dist}}\bigl(0,\partial\sigma(u)\bigr)\ge1.
\end{equation}$$ (2) 若 $$\sigma$$ 在 $$\operatorname{dom}\partial\sigma$$ 上处处满足 KL 性质，则称 $$\sigma$$ 是一个 KL 函数．

</div>

一大类函数都具有 KL 性质．若 $$\bar u$$ 不是临界点，KL 性质平凡成立； 不平凡的情形是 $$0\in\partial\sigma(\bar u)$$，此时 KL 性质保证\"函数 $$\sigma$$ 可被*锐化*\"：直观上令 $$\tilde\phi(u)=\phi(\sigma(u)
-\sigma(\bar u))$$，KL 性质可改写为 $$\mathop{\mathrm{dist}}(0,\partial\tilde\phi(u))\ge1$$ ------无论 $$u$$ 多接近临界点 $$\bar u$$，$$\tilde\phi$$ 的次梯度模长均大于 $$1$$；这种几何性质在分析一阶算法收敛性时起关键作用．由于非凸问题有 多个临界点，单个点的 KL 性质不够，需要一致版本：

<div class="lemma">

**引理 8.4** 设 $$\Omega$$ 是紧集，$$\sigma$$ 适当下半连续、在 $$\Omega$$ 上为常数且在 $$\Omega$$ 的每点都满足 KL 性质，则存在 $$\varepsilon>0,\eta>0,
\phi\in\Phi_\eta$$ 使得对任意 $$\bar u\in\Omega$$ 和所有满足 $$\lbraceu:\mathop{\mathrm{dist}}(u,\Omega)<\varepsilon\rbrace\cap[\sigma(\bar u)<\sigma<
\sigma(\bar u)+\eta]$$ 的 $$u$$： $$\begin{equation}
  \phi'\bigl(\sigma(u)-\sigma(\bar u)\bigr)
  \mathop{\mathrm{dist}}\bigl(0,\partial\sigma(u)\bigr)\ge1.
\end{equation}$$

</div>

**Proof** **（）** $$\mathbb{R}^d$$ 上的紧集可由有限个开集覆盖，问题可在有限个点上讨论．设 $$\mu$$ 为 $$\sigma$$ 在 $$\Omega$$ 上的取值；由有限覆盖定理，存在有限多个开球 $$B(u^i,\varepsilon_i)$$（$$u^i\in\Omega$$，$$i=1,\dots,p$$）使 $$\Omega\subset\bigcup_{i=1}^{p}B(u^i,\varepsilon_i)$$．在每个 $$u^i$$ 处 KL 性质成立，设对应的重参数化子为 $$\phi^i:[0,\eta^i)\to\mathbb{R}^+$$，则对 $$u\in B(u^i,\varepsilon_i)\cap[\mu<\sigma<\mu+\eta^i]$$ 有逐点 KL 性质 $$\phi'_i(\sigma(u)-\mu)\mathop{\mathrm{dist}}(0,\partial\sigma(u))\ge1$$．取充分小 的 $$\varepsilon$$ 使 $$U_\varepsilon\coloneqq\lbraceu:\mathop{\mathrm{dist}}(u,\Omega)\le\varepsilon\rbrace
\subset\bigcup_iB(u^i,\varepsilon_i)$$；取 $$\eta=\min_i\eta^i$$ 以及 $$\begin{equation}
  \phi(s)=\int_0^{s}\max_i\phi'_i(\tau)\,\mathrm{d}\tau,
  \qquad s\in[0,\eta),
\end{equation}$$ 容易验证 $$\phi\in\Phi_\eta$$．对任意 $$u\in U_\varepsilon\cap
[\mu<\sigma<\mu+\eta]$$，$$u$$ 落在某个 $$B(u^{i_0},\varepsilon_{i_0})$$ 中，故 $$\begin{equation}
  \phi'(\sigma(u)-\mu)\mathop{\mathrm{dist}}(0,\partial\sigma(u))
  =\max_i\phi'_i(\sigma(u)-\mu)\mathop{\mathrm{dist}}(0,\partial\sigma(u))
  \ge\phi'_{i_0}(\sigma(u)-\mu)\mathop{\mathrm{dist}}(0,\partial\sigma(u))\ge1,
\end{equation}$$ 即一致 KL 性质成立．（与普通 KL 性质的区别：$$\phi,\eta$$ 的取法对 $$\bar u$$ 一致，$$u$$ 的范围也相应扩大．）

<div class="theorem">

**定理 8.12** 设 $$\Psi$$ 是 KL 函数且假设 8.6.4 满足、$$\lbracez^k\rbrace$$ 有界，则： (1) 迭代序列的*轨迹长度有限*： $$\sum_{k=1}^{\infty}\left\Vert z^{k+1}-z^k\right\Vert<+\infty$$； (2) $$\lbracez^k\rbrace$$ 收敛到 $$\Psi$$ 的一个临界点 $$z^*=(x^*,y^*)$$．

</div>

**Proof** **（）** $$\lbracez^k\rbrace$$ 有界，故存在收敛子列 $$\lbracez^{k_q}\rbrace\to\bar z$$；不管全序列是否 收敛，函数值列 $$\lbrace\Psi(z^k)\rbrace$$ 总是收敛的且 $$\lim_k\Psi(z^k)=\Psi(\bar z)$$．不妨设 $$\Psi(\bar z)<\Psi(z^k)\ \forall k$$： 若存在 $$\bar k$$ 使 $$\Psi(z^{\bar k})=\Psi(\bar z)$$，由充分下降性 (8.245) 知 $$z^{\bar k+1}=z^{\bar k}$$，进而 $$z^k=z^{\bar k}\ \forall k>\bar k$$，结论自然成立．

由极限关系可知对任意 $$\varepsilon,\eta>0$$，存在充分大的 $$l$$，使对 任意 $$k>l$$： $$\begin{equation}
  \Psi(z^k)<\Psi(\bar z)+\eta,
  \qquad
  \mathop{\mathrm{dist}}\bigl(z^k,\omega(z^0)\bigr)<\varepsilon,
\end{equation}$$ 即 $$k$$ 充分大时迭代点满足一致 KL 性质的前提．

\(1\) $$\omega(z^0)$$ 非空紧且 $$\Psi$$ 在其上为常数；在引理 8.4 中令 $$\Omega=\omega(z^0)$$，对任意 $$k>l$$： $$\begin{equation}
  \phi'\bigl(\Psi(z^k)-\Psi(\bar z)\bigr)
  \mathop{\mathrm{dist}}\bigl(0,\partial\Psi(z^k)\bigr)\ge1.
\end{equation}$$ 由引理 8.2： $$\mathop{\mathrm{dist}}(0,\partial\Psi(z^k))\le\left\Vert(a_x^k,a_y^k)\right\Vert
\le\rho_2\left\Vert z^k-z^{k-1}\right\Vert$$，代入 KL 性质： $$\begin{equation}
  \phi'\bigl(\Psi(z^k)-\Psi(\bar z)\bigr)
  \ge\frac{1}{\rho_2}\left\Vert z^k-z^{k-1}\right\Vert^{-1}.
\end{equation}$$ 由 $$\phi$$ 的凹性： $$\begin{equation}
  \phi\bigl(\Psi(z^k)-\Psi(\bar z)\bigr)
  -\phi\bigl(\Psi(z^{k+1})-\Psi(\bar z)\bigr)
  \ge\phi'\bigl(\Psi(z^k)-\Psi(\bar z)\bigr)
  \bigl(\Psi(z^k)-\Psi(z^{k+1})\bigr).
\end{equation}$$ 记 $$\Delta_{p,q}=\phi(\Psi(z^p)-\Psi(\bar z))
-\phi(\Psi(z^q)-\Psi(\bar z))$$，$$C=\frac{2\rho_2}{\rho_1}>0$$．用 (8.245)（$$\Psi(z^k)-\Psi(z^{k+1})
\ge\frac{\rho_1}{2}\left\Vert z^{k+1}-z^k\right\Vert^2$$）估计上式右端： $$\begin{equation}
  \Delta_{k,k+1}
  \ge\phi'\bigl(\Psi(z^k)-\Psi(\bar z)\bigr)
  \bigl(\Psi(z^k)-\Psi(z^{k+1})\bigr)
  \ge\frac{1}{\rho_2}\left\Vert z^k-z^{k-1}\right\Vert^{-1}\cdot
  \frac{\rho_1}{2}\left\Vert z^{k+1}-z^k\right\Vert^2
  =\frac{\left\Vert z^{k+1}-z^k\right\Vert^2}{C\left\Vert z^k-z^{k-1}\right\Vert},
\end{equation}$$ 等价于 $$\left\Vert z^{k+1}-z^k\right\Vert\le\sqrt{C\Delta_{k,k+1}\left\Vert z^k-z^{k-1}\right\Vert}$$． 由基本不等式 $$2\sqrt{ab}\le a+b$$（取 $$a=\left\Vert z^k-z^{k-1}\right\Vert$$， $$b=C\Delta_{k,k+1}$$）： $$\begin{equation}
  2\left\Vert z^{k+1}-z^k\right\Vert\le\left\Vert z^k-z^{k-1}\right\Vert+C\Delta_{k,k+1}.
\end{equation}$$ 对 $$i=l+1,\dots,k$$ 求和： $$\begin{equation}
  2\sum_{i=l+1}^{k}\left\Vert z^{i+1}-z^i\right\Vert
  \le\sum_{i=l+1}^{k}\left\Vert z^i-z^{i-1}\right\Vert
  +\sum_{i=l+1}^{k}\left\Vert z^{i+1}-z^i\right\Vert
  +\left\Vert z^{l+1}-z^l\right\Vert+C\Delta_{l+1,k+1},
\end{equation}$$ （用了 $$\Delta_{p,q}+\Delta_{q,r}=\Delta_{p,r}$$．）两边相同的和式相消： $$\begin{align}
  \sum_{i=l+1}^{k}\left\Vert z^{i+1}-z^i\right\Vert
  &\le\left\Vert z^{l+1}-z^l\right\Vert
  +C\Bigl(\phi\bigl(\Psi(z^{l+1})-\Psi(\bar z)\bigr)
  -\phi\bigl(\Psi(z^{k+1})-\Psi(\bar z)\bigr)\Bigr)\\
  &\le\left\Vert z^{l+1}-z^l\right\Vert
  +C\phi\bigl(\Psi(z^{l+1})-\Psi(\bar z)\bigr),
\end{align}$$ 右端是有界数且与 $$k$$ 无关，由级数收敛定义立即可得 $$\sum_{k=1}^{\infty}\left\Vert z^{k+1}-z^k\right\Vert<+\infty$$．

\(2\) 在有限长度的前提下 $$\lbracez^k\rbrace$$ 全序列收敛等价于 $$\lbracez^k\rbrace$$ 是柯西 列：对任意 $$q>p>l$$， $$\begin{equation}
  \left\Vert z^q-z^p\right\Vert=\left\Vert\sum_{k=p}^{q-1}(z^{k+1}-z^k)\right\Vert
  \le\sum_{k=p}^{q-1}\left\Vert z^{k+1}-z^k\right\Vert\to0
  \qquad (p,q\to\infty),
\end{equation}$$ 即算法产生的迭代序列有全序列收敛性．

定理 8.12(1) 强于定理 8.11(2)：后者只有 $$\left\Vert z^{k+1}-z^k\right\Vert$$ 平方可和， 前者说明迭代轨迹*长度*有限------这也是推导全序列收敛的关键．

##### 一般问题的收敛性分析框架

以上三步（充分下降 $$\to$$ 次梯度上界与极限点刻画 $$\to$$ KL 性质下的 有限长度与全序列收敛）建立了一大类*非凸*问题一阶算法收敛性分析 的通用框架：只要算法满足（i）每步有 (8.245) 型的充分 下降，（ii）次梯度有 $$\rho_2\left\Vert z^k-z^{k-1}\right\Vert$$ 型上界，（iii）目标 函数是 KL 函数且迭代点有界，即可得全序列收敛到临界点；若进一步 $$\phi(s)=cs^\theta$$ 型（如 $$\theta=\frac12$$，对应半代数函数），还可 得到收敛速度估计．非凸 PGA（§8.1.5）的收敛性正是该框架在单块情形 的特例；近似点交替线性化方法（PALM）求解非负矩阵分解、字典学习等 非凸问题的收敛性都由该框架保证．

## 对偶算法

很多问题直接在原始空间求解困难（如投影昂贵、子问题无显式解），但在 对偶空间中目标函数会分裂成\"光滑 $$+$$ 近端\"两项------§8.1 与 §8.6 的 算法思想将极大地丰富求解手段．本节考虑 $$\begin{equation}
  \text{(P)}\qquad
  \min_{x\in\mathbb{R}^n}\ \psi(x)=f(x)+h(Ax),
\end{equation}$$ 其中 $$f,h$$ 都是闭凸函数，$$A\in\mathbb{R}^{m\times n}$$．引入约束 $$y=Ax$$ 得等价 约束优化问题 $$\begin{equation}
  \min_{x,y}\ f(x)+h(y)\ \ \text{s.t.}\ \ y=Ax,
\end{equation}$$ 对约束 $$y=Ax$$ 引入乘子 $$z$$，拉格朗日函数为 $$\begin{equation}
  L(x,y,z)=f(x)+h(y)-z^\top(y-Ax)
  =\bigl(f(x)+(A^\top z)^\top x\bigr)+\bigl(h(y)-z^\top y\bigr),
\end{equation}$$ 利用共轭函数的定义，对偶问题为 $$\begin{equation}
  \text{(D)}\qquad
  \max_{z}\ \phi(z)=-f^*(-A^\top z)-h^*(z).
\end{equation}$$ （注意本章算法不局限于上述形式，学习中应灵活推广到其他形式的问题．）

### 对偶近似点梯度法

许多时候对偶问题的求解比原始问题容易，可把梯度法、近似点梯度法、 增广拉格朗日函数法等应用到对偶问题上．对偶问题 (8.274) 是无约束的复合优化形式，可考虑 §8.1 的近似 点梯度算法；前提是把 $$\phi(z)$$ 写成\"可微函数 $$+$$ 凸函数\"的复合．如果 假设 $$f$$ 是闭的**强凸**函数（参数 $$\mu$$），下面的引理说明其共轭 是全空间上梯度利普希茨连续的函数：

<div class="lemma">

**引理 8.5** 设 $$f$$ 是适当且闭的强凸函数（参数 $$\mu>0$$），则 $$f^*$$ 在全空间 $$\mathbb{R}^n$$ 上有定义，且 $$f^*$$ 是梯度 $$\frac{1}{\mu}$$-利普希茨连续的可微 函数．

</div>

**Proof** **（）** 对任意的 $$y\in\mathbb{R}^n$$，函数 $$f(x)-x^\top y$$ 是强凸函数，由定理 8.1 的证明知存在唯一的 $$x\in\operatorname{dom}f$$ 使 $$f^*(y)=x^\top y-f(x)$$；由一阶最优性条件 $$\begin{equation}
  y\in\partial f(x)\iff f^*(y)=x^\top y-f(x).
\end{equation}$$ 由 $$f^{**}=f$$，对同一组 $$x,y$$： $$\begin{equation}
  x^\top y-f^*(y)=f(x)=f^{**}(x)=\sup_{\tilde y}
  \bigl\lbracex^\top\tilde y-f^*(\tilde y)\bigr\rbrace,
\end{equation}$$ 说明 $$y$$ 也使 $$x^\top y-f^*(y)$$ 取到最大值，由一阶最优性条件 $$x\in\partial f^*(y)$$；再由 $$x$$ 的唯一性知 $$\partial f^*(y)$$ 只含一个 元素，故 $$f^*$$ 可微．

下证梯度 $$\frac1\mu$$-利普希茨连续．对任意 $$y^1,y^2$$，存在唯一的 $$x^1,x^2\in\operatorname{dom}f$$ 使 $$y^1\in\partial f(x^1)$$，$$y^2\in\partial f(x^2)$$． 由次梯度性质以及 $$f(x)-\frac\mu2\left\Vert x\right\Vert^2$$ 是凸函数： $$\begin{align}
  f(x^2)-\frac\mu2\left\Vert x^2\right\Vert^2
  &\ge f(x^1)-\frac\mu2\left\Vert x^1\right\Vert^2+(y^1-\mu x^1)^\top(x^2-x^1),\\
  f(x^1)-\frac\mu2\left\Vert x^1\right\Vert^2
  &\ge f(x^2)-\frac\mu2\left\Vert x^2\right\Vert^2+(y^2-\mu x^2)^\top(x^1-x^2),
\end{align}$$ 相加得 $$(y^1-y^2)^\top(x^1-x^2)\ge\mu\left\Vert x^1-x^2\right\Vert^2$$．由 $$x$$ 与 $$y$$ 的关系 $$x^1=\nabla f^*(y^1)$$，$$x^2=\nabla f^*(y^2)$$，代入得 $$\begin{equation}
  (y^1-y^2)^\top\bigl(\nabla f^*(y^1)-\nabla f^*(y^2)\bigr)
  \ge\mu\left\Vert\nabla f^*(y^1)-\nabla f^*(y^2)\right\Vert^2,
\end{equation}$$ 这正是 $$\nabla f^*$$ 的**余强制性**；由 §6.2 的引理（余强制性 $$\Rightarrow$$ 逆利普希茨）可知 $$\nabla f^*$$ 是 $$\frac1\mu$$-利普希茨 连续的．

于是对偶问题中 $$f^*(-A^\top z)$$ 是梯度 $$\frac{1}{\mu}\left\Vert A\right\Vert_2^2$$-利 普希茨连续的函数： $$\begin{equation}
  \left\Vert A\nabla f^*(-A^\top z^1)-A\nabla f^*(-A^\top z^2)\right\Vert
  \le\frac1\mu\left\Vert A\right\Vert_2\left\Vert A^\top(z^1-z^2)\right\Vert
  \le\frac{\left\Vert A\right\Vert_2^2}{\mu}\left\Vert z^1-z^2\right\Vert.
\end{equation}$$ 对偶问题取最大值，对偶近似点梯度法每次迭代更新为（近端算子内部取 *上升*方向）： $$\begin{equation}
  z^{k+1}=\operatorname{prox}_{th^*}\bigl(z^k+tA\nabla f^*(-A^\top z^k)\bigr).
\end{equation}$$ 引入变量 $$x^{k+1}=\nabla f^*(-A^\top z^k)$$（等价于 $$-A^\top z^k\in\partial f(x^{k+1})$$），迭代格式 (8.280) 等价于 $$\begin{equation}
  x^{k+1}=\operatorname*{arg\,min}_x\bigl\lbracef(x)+(A^\top z^k)^\top x\bigr\rbrace,
  \qquad
  z^{k+1}=\operatorname{prox}_{th^*}\bigl(z^k+tAx^{k+1}\bigr).
\end{equation}$$

##### 等价的原始问题格式

利用 Moreau 分解（引理 8.1，此处作为引理 8.6：$$x=
\operatorname{prox}_f(x)+\operatorname{prox}_{f^*}(x)$$ 及其一般形式 $$x=\operatorname{prox}_{\lambda f}(x)+\lambda\operatorname{prox}_{
\lambda^{-1}f^*}(x/\lambda)$$）对 $$h^{**}=h$$ 取 $$\lambda=t$$、$$f=h^*$$： $$\begin{equation}
  z^k+tAx^{k+1}
  =\operatorname{prox}_{th^*}(z^k+tAx^{k+1})
  +t\operatorname{prox}_{t^{-1}h}\Bigl(\frac{z^k}{t}+Ax^{k+1}\Bigr)
  =z^{k+1}+t\operatorname{prox}_{t^{-1}h}\Bigl(\frac{z^k}{t}
  +Ax^{k+1}\Bigr),
\end{equation}$$ 由此得到对偶近似点梯度法*等价的针对原始问题*的更新格式： $$\begin{equation}
  \begin{aligned}
    x^{k+1}&=\operatorname*{arg\,min}_x\bigl\lbracef(x)+(z^k)^\top Ax\bigr\rbrace,\\
    y^{k+1}&=\operatorname{prox}_{t^{-1}h}\Bigl(\frac{z^k}{t}+Ax^{k+1}\Bigr)
    =\operatorname*{arg\,min}_y\Bigl\lbraceh(y)-(z^k)^\top(y-Ax^{k+1})
    +\frac{t}{2}\left\Vert Ax^{k+1}-y\right\Vert_2^2\Bigr\rbrace,\\
    z^{k+1}&=z^k+t\bigl(Ax^{k+1}-y^{k+1}\bigr).
  \end{aligned}
\end{equation}$$ 写出约束问题的拉格朗日函数与增广拉格朗日函数 $$\begin{equation}
  L(x,y,z)=f(x)+h(y)-z^\top(y-Ax),
  \qquad
  L_t(x,y,z)=f(x)+h(y)-z^\top(y-Ax)+\frac{t}{2}\left\Vert y-Ax\right\Vert^2,
\end{equation}$$ 则迭代格式 (8.283) 可等价地写为 $$\begin{equation}
  x^{k+1}=\operatorname*{arg\,min}_x L(x,y^k,z^k),
  \qquad
  y^{k+1}=\operatorname*{arg\,min}_y L_t(x^{k+1},y,z^k),
  \qquad
  z^{k+1}=z^k+t(Ax^{k+1}-y^{k+1}).
\end{equation}$$ 迭代格式 (8.285) 又称为**交替极小化方法**： 第一步在拉格朗日函数中关于 $$x$$ 求极小，第二步在增广拉格朗日函数中关于 $$y$$ 求极小，第三步更新乘子------它与 §8.6 的交替方向乘子法结构非常 相似．上面的分析表明：**对偶近似点梯度法等价于对原始问题使用 交替极小化方法**．若 $$f$$ 可分，$$x$$ 的更新可拆成独立子问题；$$z$$ 的更新 步长 $$t$$ 可取常数或由线搜索决定；也可引入加速版本的近似点梯度算法．

##### 四个例子

<div class="example">

**例题 8.17** $$f$$ 强凸，考虑 $$\min_x f(x)+\left\Vert Ax-b\right\Vert$$．对应 (8.271) 取 $$h(y)=\left\Vert y-b\right\Vert$$，其共轭为 $$\begin{equation}
  h^*(z)=
  \begin{cases}
    b^\top z, & \left\Vert z\right\Vert_*\le1,\\
    +\infty, & \text{其他},
  \end{cases}
\end{equation}$$ （$$\left\Vert\cdot\right\Vert_*$$ 为对偶范数．）对偶问题： $$\max_{\left\Vert z\right\Vert_*\le1}-f^*(-A^\top z)-b^\top z$$．对偶近似点梯度法： $$\begin{equation}
  x^{k+1}=\operatorname*{arg\,min}_x\bigl\lbracef(x)+(A^\top z^k)^\top x\bigr\rbrace,
  \qquad
  z^{k+1}=P_{\left\Vert z\right\Vert_*\le1}\bigl(z^k+t(Ax^{k+1}-b)\bigr).
\end{equation}$$

</div>

<div class="example">

**例题 8.18** $$f$$ 强凸，考虑 $$\min_x f(x)+\sum_{i=1}^{p}\left\Vert B_ix\right\Vert_2$$，即 $$h(y_1,\dots,y_p)=\sum_{i=1}^{p}\left\Vert y_i\right\Vert_2$$ 且 $$A=\bigl[B_1^\top,\ B_2^\top,\ \dots,\ B_p^\top\bigr]^\top$$．记 $$C_i$$ 为 $$\mathbb{R}^{m_i}$$ 中的单位 Euclid 球，对偶问题为 $$\max_{\left\Vert z^i\right\Vert_2\le1}-f^*(-\sum_{i=1}^{p}B_i^\top z^i)$$，对偶近似 点梯度法更新： $$\begin{equation}
  x^{k+1}=\operatorname*{arg\,min}_x\Bigl\lbracef(x)+\Bigl(\sum_{i=1}^{p}B_i^\top z_i^k
  \Bigr)^\top x\Bigr\rbrace,
  \qquad
  z_i^{k+1}=P_{C_i}\bigl(z_i^k+tB_ix^{k+1}\bigr),\quad i=1,\dots,p.
\end{equation}$$

</div>

<div class="example">

**例题 8.19** $$f$$ 强凸，考虑 $$\min_x f(x)\ \ \text{s.t.}\ \ x\in C_1\cap C_2\cap\dots\cap C_m$$ （$$C_i$$ 闭凸、投影易算）．记 $$h(y_1,\dots,y_m)=\sum_{i=1}^{m}I_{C_i}(y_i)$$， $$A=[I;\ I;\ \dots;\ I]$$，对偶问题为 $$\max_{z^i\in C_i}-f^*(-\sum_{i=1}^{m}z^i)-\sum_iI^*_{C_i}(z^i)$$； $$I^*_{C_i}$$ 是支撑函数，显式表达式不易求出，故利用 Moreau 分解把迭代 格式写成交替极小化形式： $$\begin{equation}
  x^{k+1}=\operatorname*{arg\,min}_x\Bigl\lbracef(x)+\Bigl(\sum_{i=1}^{m}z^i\Bigr)^\top x\Bigr\rbrace,
  \qquad
  y_i^{k+1}=P_{C_i}\Bigl(\frac{z_i^k}{t}+x^{k+1}\Bigr),
  \qquad
  z_i^{k+1}=z_i^k+t\bigl(x^{k+1}-y_i^{k+1}\bigr).
\end{equation}$$

</div>

<div class="example">

**例题 8.20** $$f^j$$ 强凸、$$h_i^*$$ 的邻近算子易算，考虑 $$\begin{equation}
  \min\ \sum_{j=1}^{n}f_j(x^j)
  +\sum_{i=1}^{m}h_i(A_{i1}x^1+A_{i2}x^2+\dots+A_{in}x^n),
\end{equation}$$ 对偶问题为 $$\max\ -\sum_{i=1}^{m}h_i^*(z^i)-\sum_{j=1}^{n}f_j^*(-A_{1j}^{\top}z^1
-\dots-A_{mj}^{\top}z^m)$$，对偶近似点梯度法更新： $$\begin{align}
  &x_j^{k+1}=\operatorname*{arg\,min}_{x_j}\Bigl\lbracef_j(x_j)+\Bigl(\sum_{i=1}^{m}
  A_{ij}z_i^k\Bigr)^\top x_j\Bigr\rbrace,\qquad j=1,\dots,n;\\
  &z_i^{k+1}=\operatorname{prox}_{th_i^*}\Bigl(z_i^k
  +t\sum_{j=1}^{n}A_{ij}x_j^{k+1}\Bigr),\qquad i=1,\dots,m.
\end{align}$$

</div>

### 原始--对偶混合梯度算法

能否把原始与对偶两方面*结合*起来？**原始--对偶混合梯度** （primal-dual hybrid gradient, PDHG）算法每次迭代同时更新原始变量与 对偶变量，可有效避免单独在原始或对偶问题求解时的问题（原始问题梯度为 零向量或不可微、对偶问题形式复杂等）．本节介绍 PDHG 及其变形 Chambolle--Pock 算法．（注意与 §7.3 线性规划的\"原始--对偶算法\"名称 区分，本节用 PDHG 特指原始--对偶混合梯度法．）

##### 鞍点问题

PDHG 的构造从鞍点问题谈起．由于 $$h$$ 有自共轭性 $$h=h^{**}$$，问题 (8.271) 可变形为极小--极大问题： $$\begin{equation}
  \text{(LPD)}\qquad
  \min_x\max_z\ \psi^{PD}(x,z)\coloneqq f(x)-h^*(z)+z^\top Ax.
\end{equation}$$ 另一种常用方式是直接利用约束问题构造拉格朗日函数的鞍点形式： $$\begin{equation}
  \text{(LP)}\qquad
  \min_{x,y}\max_z\ f(x)+h(y)+z^\top(Ax-y),
\end{equation}$$ 在对偶问题中引入 $$w=-A^\top z$$ 还可得第三种形式： $$\begin{equation}
  \text{(LD)}\qquad
  \min_{p}\max_{w,z}\ -f^*(w)-h^*(z)+p^\top(w+A^\top z).
\end{equation}$$ 鞍点问题对部分变量求极小、另一些变量求极大，直接求解困难；PDHG 的 思想是*分别对两类变量应用近似点梯度算法*．以求解 (8.293) 为例，交替更新原始与对偶变量： $$\begin{equation}
  \begin{aligned}
    z^{k+1}&=\operatorname*{arg\,max}_z\Bigl\lbrace-h^*(z)+\left\langle Ax^k,\,z-z^k\right\rangle
    -\frac{1}{2\delta^k}\left\Vert z-z^k\right\Vert_2^2\Bigr\rbrace
    =\operatorname{prox}_{\delta^kh^*}(z^k+\delta^kAx^k),\\
    x^{k+1}&=\operatorname*{arg\,min}_x\Bigl\lbracef(x)+(z^{k+1})^\top A(x-x^k)
    +\frac{1}{2\alpha^k}\left\Vert x-x^k\right\Vert_2^2\Bigr\rbrace
    =\operatorname{prox}_{\alpha^kf}\bigl(x^k-\alpha^kA^\top z^{k+1}\bigr),
  \end{aligned}
\end{equation}$$ 其中 $$\alpha^k,\delta^k$$ 分别为原始与对偶变量的更新步长：第一步固定 $$x^k$$ 对 $$z$$ 做（近端）梯度上升，第二步固定 $$z^{k+1}$$ 对 $$x$$ 做（近端） 梯度下降．两个变量的更新顺序无关紧要（先更新原始变量等价于另一初值下 先更新对偶变量）．事实上，PDHG 在 $$\alpha^k=+\infty$$ 或 $$\delta^k=+\infty$$ 的特殊情形下等价于把近似点梯度算法分别应用于对偶 问题或原始问题．

##### Chambolle--Pock 算法

PDHG 的一个重要变形是 **Chambolle--Pock** 算法：与 (8.296) 的区别是多了一个**外推步**： $$\begin{equation}
  \begin{aligned}
    z^{k+1}&=\operatorname{prox}_{\delta^kh^*}(z^k+\delta^kAy^k),\\
    x^{k+1}&=\operatorname{prox}_{\alpha^kf}\bigl(x^k-\alpha^kA^\top
    z^{k+1}\bigr),\\
    y^{k+1}&=2x^{k+1}-x^k.
  \end{aligned}
\end{equation}$$ 后面将证明：取常数步长 $$\alpha^k=t$$，$$\delta^k=s$$ 时，该算法的收敛性 在 $$\sqrt{st}<\frac{1}{\left\Vert A\right\Vert_2}$$ 条件下成立．

### 应用举例

##### 1. LASSO 问题

LASSO 问题 $$\min_x\mu\left\Vert x\right\Vert_1+\frac12\left\Vert Ax-b\right\Vert_2^2$$：取 $$f(x)=\mu\left\Vert x\right\Vert_1$$，$$h(x)=\frac12\left\Vert x-b\right\Vert_2^2$$，则 $$h^*(z)=\frac12\left\Vert z\right\Vert_2^2+b^\top z$$，鞍点问题为 $$\min_x\max_z\ f(x)-h^*(z)+z^\top Ax$$．PDHG 更新： $$\begin{equation}
  z^{k+1}=\operatorname{prox}_{\delta^kh^*}(z^k+\delta^kAx^k)
  =\frac{1}{\delta^k+1}\bigl(z^k+\delta^kAx^k-\delta^kb\bigr),
  \qquad
  x^{k+1}=\operatorname{prox}_{\alpha^k\mu\left\Vert\cdot\right\Vert_1}
  \bigl(x^k-\alpha^kA^\top z^{k+1}\bigr);
\end{equation}$$ Chambolle--Pock 格式： $$\begin{equation}
  z^{k+1}=\frac{1}{\delta^k+1}\bigl(z^k+\delta^kAy^k-\delta^kb\bigr),
  \qquad
  x^{k+1}=\operatorname{prox}_{\alpha^k\mu\left\Vert\cdot\right\Vert_1}
  \bigl(x^k-\alpha^kA^\top z^{k+1}\bigr),
  \qquad
  y^{k+1}=2x^{k+1}-x^k.
\end{equation}$$ 数值实验（同 §6.2 的 $$A,b$$，$$\mu=10^{-3}$$，连续化策略，$$\delta^k=1$$， $$\alpha^k=\frac{1}{\left\Vert A\right\Vert_2^2}$$）：尽管 PDHG 在某些情形下没有收敛性 保证，但在该例中比 Chambolle--Pock 稍快（讲义图 8.8）．

##### 2. TV-L1 模型

去噪情形下的 TV-L1 模型（$$A$$ 为恒等算子）： $$\begin{equation}
  \min_{U\in\mathbb{R}^{n\times n}}\ \left\Vert U\right\Vert_{TV}+\lambda\left\Vert U-B\right\Vert_1,
\end{equation}$$ 全变差可用离散梯度（线性）算子 $$D:\mathbb{R}^{n\times n}\to\mathbb{R}^{n\times n\times2}$$ 表示：$$\left\Vert U\right\Vert_{TV}=\sum_{1\le i,j\le n}\left\Vert(DU)_{ij}\right\Vert_2$$；对 $$W,V\in\mathbb{R}^{n\times n\times2}$$ 记 $$\left\Vert W\right\Vert=\sum_{i,j}\left\Vert w_{ij}\right\Vert_2$$， $$\left\langle W,\,V\right\rangle=\sum_{i,j,k}w_{i,j,k}v_{i,j,k}$$，则 $$\left\Vert U\right\Vert_{TV}=\left\Vert DU\right\Vert$$． 对应 (8.271) 取 $$f(U)=\lambda\left\Vert U-B\right\Vert_1$$， $$h(W)=\left\Vert W\right\Vert$$，其共轭 $$\begin{equation}
  h^*(V)=\sup_U\lbrace\left\langle U,\,V\right\rangle-\left\Vert U\right\Vert\rbrace=
  \begin{cases}
    0, & \max_{i,j}\left\Vert v_{ij}\right\Vert_2\le1,\\
    +\infty, & \text{其他},
  \end{cases}
\end{equation}$$ 记 $$\mathcal{V}=\lbraceV:\max_{ij}\left\Vert v_{ij}\right\Vert_2\le1\rbrace$$，则 （LPD）$$=\min_U\max_V\ f(U)+\left\langle V,\,DU\right\rangle-I_{\mathcal V}(V)$$．PDHG 的 对偶更新即投影： $$\begin{equation}
  V^{k+1}=\operatorname{prox}_{sI_{\mathcal V}}(V^k+sDU^k)
  =P_{\mathcal V}(V^k+sDU^k),
\end{equation}$$ 原始更新： $$\begin{equation}
  U^{k+1}=\operatorname{prox}_{tf}\bigl(U^k+tGV^{k+1}\bigr)
  =\operatorname*{arg\,min}_U\Bigl\lbrace\lambda\left\Vert U-B\right\Vert_1+\left\langle V^{k+1},\,DU\right\rangle
  +\frac{1}{2t}\left\Vert U-U^k\right\Vert_F^2\Bigr\rbrace,
\end{equation}$$ 等价于逐分量软阈值： $$\begin{equation}
  (U^{k+1})_{ij}=
  \begin{cases}
    (U^k+tGV^{k+1})_{ij}-t\lambda, &
    (U^k+tGV^{k+1})_{ij}>B_{ij}+t\lambda,\\
    (U^k+tGV^{k+1})_{ij}+t\lambda, &
    (U^k+tGV^{k+1})_{ij}<B_{ij}-t\lambda,\\
    B_{ij}, & \left\vert(U^k+tGV^{k+1})_{ij}-B_{ij}\right\vert\le t\lambda,
  \end{cases}
\end{equation}$$ 其中 $$G:\mathbb{R}^{n\times n\times2}\to\mathbb{R}^{n\times n}$$ 为离散**散度 算子**，满足 $$\left\langle V,\,DU\right\rangle=-\left\langle GV,\,U\right\rangle$$（$$D$$ 的负伴随）．Chambolle--Pock 算法的 $$U^{k+1}$$ 更新不变，仅 $$V^{k+1}$$ 的更新改为 $$V^k+sD(2U^{k+1}-U^k)$$ 在 $$\mathcal V$$ 上的投影．

##### 3. 图像填充模型

$$\min_{U}\ \left\Vert U\right\Vert_{TV}+\frac{\lambda}{2}\left\Vert U-B\right\Vert_F^2$$：同样取 $$f(U)=\frac{\lambda}{2}\left\Vert U-B\right\Vert_F^2$$，$$h(W)=\left\Vert W\right\Vert$$，对偶更新为 (8.293) 的投影式，原始更新： $$\begin{equation}
  U^{k+1}=\operatorname{prox}_{tf}\bigl(U^k+tGV^{k+1}\bigr)
  \iff\quad
  (U^{k+1})_{ij}=\frac{(U^k+tGV^{k+1})_{ij}+t\lambda b_{ij}}{1+t\lambda}.
\end{equation}$$

##### 4. 图像反卷积模型

$$\min_U\ \left\Vert U\right\Vert_{TV}+\frac{\lambda}{2}\left\Vert AU-B\right\Vert_F^2$$（$$AU=K_A*U$$ 为卷积算子，$$K_A$$ 为卷积核对应的矩阵）：取 $$f(U)=\frac{\lambda}{2}\left\Vert AU-B\right\Vert_F^2$$，$$h(W)=\left\Vert W\right\Vert$$，对偶更新仍为 投影式，原始更新满足 $$\begin{equation}
  U^{k+1}=\operatorname*{arg\,min}_U\Bigl\lbrace\frac{\lambda}{2}\left\Vert AU-B\right\Vert_F^2
  +\frac{1}{2t}\left\Vert U-(U^k+tGV^{k+1})\right\Vert_F^2\Bigr\rbrace,
\end{equation}$$ 由凸二次函数的最优性条件： $$\begin{equation}
  \lambda A^*(AU^{k+1}-B)+\frac1t\bigl(U^{k+1}-(U^k+tGV^{k+1})\bigr)=0,
\end{equation}$$ 其中 $$A^*$$ 为共轭算子（卷积核 $$K_{A^*}$$）．由于卷积在 Fourier 域是 逐分量乘积 $$\mathcal F(AU)=\mathcal F(K_A)\odot\mathcal F(U)$$，利用 快速傅里叶变换 $$\mathcal F$$ 及其逆变换 $$\mathcal F^{-1}$$ 快速求解： $$\begin{equation}
  \mathcal F(K_{A^*})\odot\bigl[\mathcal F(K_A)\odot\mathcal F(U^{k+1})
  -\mathcal F(B)\bigr]
  +\frac{1}{t\lambda}\mathcal F\bigl(U^{k+1}-(U^k+tGV^{k+1})\bigr)=0,
\end{equation}$$ 利用 $$\mathcal F(K_{A^*})=\mathcal F(K_A)$$ 得显式解 $$\begin{equation}
  U^{k+1}=\mathcal F^{-1}\left(
  \frac{\mathcal F(U^k+tGV^{k+1})+t\lambda\,\mathcal F(B)
  \odot\mathcal F(K_A)}{1+t\lambda\left\vert\mathcal F(K_A)\right\vert^2}\right),
\end{equation}$$ 除 $$\mathcal F,\mathcal F^{-1},G$$ 外均为逐分量运算------这是反卷积问题 采用对偶/鞍点框架的最大好处之一．

### 收敛性分析

##### 1. 对偶近似点梯度法的收敛性

对偶问题函数值的收敛性可直接从 PGA 的收敛性（定理 8.3）得到；更强的结果是迭代点收敛到原始与对偶问题 的解（证明可参考 Chambolle--Pock 等）：

<div class="theorem">

**定理 8.13** 给定初值 $$z^0,x^0$$，序列 $$\lbrace(x^k,z^k)\rbrace$$ 由 (8.281) 生成．假设 $$f$$ 是强凸的闭函数（参数 $$\mu$$）且步长 $$t\in\bigl(0,\frac{\mu}{\left\Vert A\right\Vert_2^2}\bigr]$$，则 $$\lbracez^k\rbrace$$ 收敛到对偶 问题 (D) 的解，$$\lbracex^k\rbrace$$ 收敛到原始问题 (P) 的唯一解．

</div>

原始与对偶变量同时收敛到相应问题的最优解；对偶变量 $$\lbracez^k\rbrace$$ 在函数值 意义下具有 $$O(\frac1k)$$ 收敛速度（由 PGA 收敛性结果）．

##### 2. Chambolle--Pock 算法的收敛性

PDHG 类算法针对鞍点问题设计，收敛性也应在*鞍点*意义下讨论．对 问题 (8.293)，若点 $$(\hat x,\hat z)$$ 满足 $$\begin{equation}
  \psi^{PD}(x,\hat z)\ge\psi^{PD}(\hat x,\hat z)\ge\psi^{PD}(\hat x,z),
  \qquad \forall x\in X,\ z\in Z,
\end{equation}$$ 则称 $$(\hat x,\hat z)$$ 是问题 (8.293) 的一个 **鞍点**．为刻画 $$(x,z)$$ 的最优性，引入：

<div class="definition">

**定义 8.7** 对任意子集 $$B_1\times B_2\subset X\times Z$$，定义**部分原始--对偶 间隙**为 $$\begin{equation}
  G_{B_1\times B_2}(x,z)=\max_{z'\in B_2}\psi^{PD}(x,z')
  -\min_{x'\in B_1}\psi^{PD}(x',z).
\end{equation}$$

</div>

只要鞍点 $$(\hat x,\hat z)\in B_1\times B_2$$，就有 $$\begin{equation}
  G_{B_1\times B_2}(x,z)\ge\psi^{PD}(x,\hat z)-\psi^{PD}(\hat x,z)
  =\bigl[\psi^{PD}(x,\hat z)-\psi^{PD}(\hat x,\hat z)\bigr]
  +\bigl[\psi^{PD}(\hat x,\hat z)-\psi^{PD}(\hat x,z)\bigr]\ge0,
\end{equation}$$ 且在鞍点处 $$G_{B_1\times B_2}(\hat x,\hat z)=0$$；反之当 $$(\hat x,\hat z)\in\operatorname{int}(B_1\times B_2)$$ 且 $$G_{B_1\times B_2}(\hat x,\hat z)=0$$ 时 $$(\hat x,\hat z)$$ 是鞍点．

<div class="theorem">

**定理 8.14** 设 $$f,h$$ 为闭凸函数，问题 (8.293) 存在鞍点 $$(\hat x,\hat z)$$．在迭代格式 (8.297) 中取步长 $$\alpha^k=t$$，$$\delta^k=s$$ 满足 $$st<\frac1L$$ （$$L=\left\Vert A\right\Vert_2^2$$），则 $$\lbrace(x^k,z^k)\rbrace$$ 具有以下性质：

1.  对任意 $$k$$，$$(x^k,z^k)$$ 有界，且 $$\begin{equation}
              \frac{\left\Vert x^k-\hat x\right\Vert_2^2}{2t}+\frac{\left\Vert z^k-\hat z\right\Vert_2^2}{2s}
              \le C\Bigl(\frac{\left\Vert x^0-\hat x\right\Vert_2^2}{2t}
              +\frac{\left\Vert z^0-\hat z\right\Vert_2^2}{2s}\Bigr),
    \end{equation}$$ 其中常数 $$C\le(1-Lst)^{-1}$$；

2.  记 $$x^N=\frac1N\sum_{k=1}^{N}x^k$$，$$z^N=\frac1N\sum_{k=1}^{N}z^k$$， 则对任意有界区域 $$B_1\times B_2\subset X\times Z$$： $$\begin{equation}
              G_{B_1\times B_2}(x^N,z^N)\le\frac{D(B_1,B_2)}{N},
              \qquad
              D(B_1,B_2)=\sup_{(x,z)\in B_1\times B_2}
              \Bigl\lbrace\frac{\left\Vert x-x^0\right\Vert_2^2}{2t}
              +\frac{\left\Vert z-z^0\right\Vert_2^2}{2s}\Bigr\rbrace;
    \end{equation}$$ 且 $$\lbrace(x^N,z^N)\rbrace$$ 的聚点为 (8.293) 的鞍点；

3.  存在鞍点 $$(x^*,z^*)$$ 使 $$x^k\to x^*$$，$$z^k\to z^*$$．

</div>

**Proof** 证明要点**（证明要点）** 为方便推导，考虑算法的一般格式： $$\begin{equation}
  z^{k+1}=\operatorname{prox}_{sh^*}(z^k+sA\bar x),
  \qquad
  x^{k+1}=\operatorname{prox}_{tf}\bigl(x^k-tA^\top\bar z\bigr),
\end{equation}$$ 用 $$\bar x,\bar z$$ 表示更新时的参考点（取特定值时分别为 PDHG 或 Chambolle--Pock：CP 取 $$\bar x=2x^k-x^{k-1}$$，$$\bar z=z^{k+1}$$）．由 邻近算子的性质： $$\begin{equation}
  -A^\top\bar z+\frac{x^k-x^{k+1}}{t}\in\partial f(x^{k+1}),
  \qquad
  A\bar x+\frac{z^k-z^{k+1}}{s}\in\partial h^*(z^{k+1}),
\end{equation}$$ 由次梯度定义，对任意 $$(x,z)\in X\times Z$$： $$\begin{align}
  f(x)&\ge f(x^{k+1})+\frac1t(x-x^{k+1})^\top(x^k-x^{k+1})
  -(x-x^{k+1})^\top A^\top\bar z,\\
  h^*(z)&\ge h^*(z^{k+1})+\frac1s(z-z^{k+1})^\top(z^k-z^{k+1})
  +(z-z^{k+1})^\top A\bar x.
\end{align}$$ 两式相加并引入二次项整理可得 $$\begin{align}
  &\frac{\left\Vert x-x^k\right\Vert_2^2}{2t}+\frac{\left\Vert z-z^k\right\Vert_2^2}{2s}
  -\frac{\left\Vert x-x^{k+1}\right\Vert_2^2}{2t}-\frac{\left\Vert z-z^{k+1}\right\Vert_2^2}{2s}
  \ge\bigl[f(x^{k+1})-h^*(z)+(x^{k+1})^\top A^\top z\bigr]\\
  &\qquad-\bigl[f(x)-h^*(z^{k+1})+x^\top A^\top z^{k+1}\bigr]
  +\frac{\left\Vert x^k-x^{k+1}\right\Vert_2^2}{2t}
  +\frac{\left\Vert z^k-z^{k+1}\right\Vert_2^2}{2s}\\
  &\qquad+(x^{k+1}-\bar x)^\top A^\top(z^{k+1}-z)
  -(x^{k+1}-x)^\top A^\top(z^{k+1}-\bar z).
\end{align}$$ 右端最后两项在收敛性证明中有重要作用．将 CP 迭代代入（$$\bar x=
2x^k-x^{k-1}$$，$$\bar z=z^{k+1}$$），用柯西不等式与 $$2ab\le\alpha a^2
+\frac{b^2}{\alpha}$$ 估计交叉项，可把 (8.318) 化为 $$\begin{align}
  &\frac{\left\Vert x-x^k\right\Vert_2^2}{2t}+\frac{\left\Vert z-z^k\right\Vert_2^2}{2s}
  -\frac{\left\Vert x-x^{k+1}\right\Vert_2^2}{2t}
  -\frac{\left\Vert z-z^{k+1}\right\Vert_2^2}{2s}\\
  &\ge\bigl[f(x^{k+1})-h^*(z)+(x^{k+1})^\top A^\top z\bigr]\\
  &\quad-\bigl[f(x)-h^*(z^{k+1})+x^\top A^\top z^{k+1}\bigr]\\
  &\quad+(1-\sqrt{Lst})\frac{\left\Vert z^k-z^{k+1}\right\Vert_2^2}{2s}
  +\frac{\left\Vert x^k-x^{k+1}\right\Vert_2^2}{2t}\\
  &\quad-\sqrt{Lst}\frac{\left\Vert x^{k-1}-x^k\right\Vert_2^2}{2t}\\
  &\quad+(x^{k+1}-x^k)^\top A^\top(z^{k+1}-z)
  -(x^k-x^{k-1})^\top A^\top(z^k-z).
\end{align}$$ 将 $$k$$ 从 $$0$$ 到 $$N-1$$ 求和、消去共同项，再用柯西不等式控制末端交叉项 $$(x^N-x^{N-1})^\top A^\top(z^N-z)$$，整理得核心估计： $$\begin{align}
  &\sum_{k=1}^{N}\Bigl(\bigl[f(x^k)-h^*(z)+(x^k)^\top A^\top z\bigr]
  -\bigl[f(x)-h^*(z^k)+x^\top A^\top z^k\bigr]\Bigr)
  +\frac{\left\Vert x-x^N\right\Vert_2^2}{2t}
  +(1-Lst)\frac{\left\Vert z-z^N\right\Vert_2^2}{2s}\\
  &\qquad+(1-\sqrt{Lst})\sum_{k=1}^{N}\frac{\left\Vert z^k-z^{k-1}\right\Vert_2^2}{2s}
  +(1-\sqrt{Lst})\sum_{k=1}^{N-1}\frac{\left\Vert x^k-x^{k-1}\right\Vert_2^2}{2t}
  \le\frac{\left\Vert x-x^0\right\Vert_2^2}{2t}+\frac{\left\Vert z-z^0\right\Vert_2^2}{2s}.
\end{align}$$ (1) 取 $$(x,z)=(\hat x,\hat z)$$：由鞍点性质左端第一项求和的每一项非负， 且 $$st<\frac1L$$ 保证其余各项非负，立得 $$(x^k,z^k)$$ 有界与 $$\frac{\left\Vert x^k-\hat x\right\Vert^2}{2t}+\frac{\left\Vert z^k-\hat z\right\Vert^2}{2s}\le
\frac{1}{1-Lst}\bigl(\frac{\left\Vert x^0-\hat x\right\Vert^2}{2t}
+\frac{\left\Vert z^0-\hat z\right\Vert^2}{2s}\bigr)$$． (2) 由 $$f,h^*$$ 的凸性与 $$x^N,z^N$$ 的定义： $$\begin{equation}
  \bigl[f(x^N)-h^*(z)+(x^N)^\top A^\top z\bigr]
  -\bigl[f(x)-h^*(z^N)+x^\top A^\top z^N\bigr]
  \le\frac1N\Bigl(\frac{\left\Vert x-x^0\right\Vert_2^2}{2t}
  +\frac{\left\Vert z-z^0\right\Vert_2^2}{2s}\Bigr),
\end{equation}$$ 结合 $$G_{B_1\times B_2}$$ 的定义得 $$G_{B_1\times B_2}(x^N,z^N)\le\frac{D(B_1,B_2)}{N}$$；$$\lbrace(x^k,z^k)\rbrace$$ 有界故均值列有界，取聚点 $$(x^\sharp,z^\sharp)$$ 并对上式取下极限（用 $$f,h^*$$ 的闭性）得 $$\psi^{PD}(x^\sharp,z)\le\psi^{PD}(x,z^\sharp)\ \forall x,z$$，即 $$(x^\sharp,z^\sharp)$$ 是鞍点． (3) 全序列收敛的思路：先由 (1) 取收敛子列 $$(x^{k_l},z^{k_l})\to(x^*,z^*)$$，在 (8.319)（求和 形式）中取 $$(x,z)=(x^*,z^*)$$ 并对 $$k$$ 从 $$k_l$$ 到 $$N-1$$ 求和，估计 其他点到子列极限点的误差：利用 $$x^{k_l}\to x^*$$、 $$x^N-x^{N-1}\to0$$（由 (8.320) 的平方可和项）与 $$\lbracez^k\rbrace$$ 有界，令 $$N\to\infty$$ 得 $$x^N\to x^*,z^N\to z^*$$------全序列 收敛；最后由均值列也收敛到 $$(x^*,z^*)$$ 与极限唯一性得 $$(x^\sharp,z^\sharp)=(x^*,z^*)$$ 是鞍点．

## 交替方向乘子法

统计学、机器学习和科学计算中出现了很多结构复杂且可能非凸、非光滑的 优化问题，**交替方向乘子法**（alternating direction method of multipliers, ADMM）提供了一个适用范围广泛、容易理解和实现、可靠性不错 的方案．该方法于 20 世纪 70 年代发展起来，与许多其他算法等价或密切 相关：对偶分解、乘子方法、Douglas--Rachford splitting、Dykstra 交替 投影、Bregman 对 $$\ell_1$$ 问题的迭代算法（§7.2.4）、近似点算法等． 本节先介绍基本算法，再介绍 Douglas--Rachford splitting（DRS）并说明 \"对对偶问题用 DRS\"与\"对原始问题用 ADMM\"的等价性，然后给出变形技巧 与大量应用，最后给出收敛性证明．

### 交替方向乘子法

考虑如下凸问题： $$\begin{equation}
  \min_{x_1,x_2}\ f_1(x_1)+f_2(x_2)
  \ \text{s.t.}\ A_1x_1+A_2x_2=b,
\end{equation}$$ 其中 $$f_1,f_2$$ 是适当的闭凸函数（不要求光滑），$$x_1\in\mathbb{R}^n$$， $$x_2\in\mathbb{R}^m$$，$$A_1\in\mathbb{R}^{p\times n}$$，$$A_2\in\mathbb{R}^{p\times m}$$， $$b\in\mathbb{R}^p$$．问题特点：目标函数可分成彼此*分离*的两块，但变量被 线性约束结合在一起．常见问题都可以化成这一形式：

<div class="example">

**例题 8.21** $$\min_x f_1(x)+f_2(x)$$：引入 $$z$$ 并令 $$x=z$$，转化为 $$\min_{x,z}f_1(x)+f_2(z)\ \ \text{s.t.}\ \ x-z=0$$．

</div>

<div class="example">

**例题 8.22** $$\min_x f_1(x)+f_2(Ax)$$：引入 $$z=Ax$$，转化为 $$\min_{x,z}f_1(x)+f_2(z)\ \ \text{s.t.}\ \ Ax-z=0$$（$$A_1=A$$，$$A_2=-I$$）．

</div>

<div class="example">

**例题 8.23** $$\min_x f(x)\ \ \text{s.t.}\ \ Ax\in C$$（$$C$$ 凸集）：用示性函数 $$I_C(z)$$ 加入目标，再引入 $$z=Ax$$，转化为 $$\min_{x,z}f(x)+I_C(z)\ \ \text{s.t.}\ \ Ax-z=0$$．

</div>

<div class="example">

**例题 8.24** $$\min_x\sum_{i=1}^{N}\phi_i(x)$$：令 $$x=z$$ 并把 $$x$$ 复制 $$N$$ 份为 $$x_i$$，转化为 $$\begin{equation}
  \min_{x_i,z}\ \sum_{i=1}^{N}\phi_i(x_i)
  \ \text{s.t.}\ x_i-z=0,\ i=1,\dots,N;
\end{equation}$$ 从形式上可令 $$x=\bigl((x^1)^\top,\dots,(x^N)^\top\bigr)^\top$$、 $$f_1(x)=\sum_i\phi_i(x^i)$$、$$f_2(z)=0$$、$$A_1=A_2=\mathbf{1}$$ 结构 （竖排 $$N$$ 个单位阵），化为两块标准形 $$\min_{x,z}f_1(x)+f_2(z)\ \ \text{s.t.}\ \ A_1x-A_2z=0$$．把问题重写为*两个* 变量块（而不是简单推广到多块）是有原因的------见应用举例（多块 ADMM 可能不收敛，而两块 ADMM 有收敛性保证）．

</div>

<div class="example">

**例题 8.25** $$\min_{x_i}\sum_{i=1}^{N}f_i(x_i)+g\bigl(\sum_{i=1}^{N}x_i\bigr)$$：把 $$g$$ 的变量复制为 $$z_i$$，转化为 $$\min_{x_i,z_i}\sum_i f_i(x_i)+g\bigl(\sum_i z_i\bigr)
\ \text{s.t.}\ x_i-z_i=0\ \forall i$$，同样具有 (8.322) 的形式．

</div>

写出问题 (8.322) 的增广拉格朗日函数： $$\begin{equation}
  L_\rho(x_1,x_2,y)=f_1(x_1)+f_2(x_2)+y^\top(A_1x_1+A_2x_2-b)
  +\frac{\rho}{2}\left\Vert A_1x_1+A_2x_2-b\right\Vert_2^2,
\end{equation}$$ 其中 $$\rho>0$$ 是二次罚项系数．常规增广拉格朗日函数法为 $$\begin{equation}
  (x_1^{k+1},x_2^{k+1})=\operatorname*{arg\,min}_{x_1,x_2}L_\rho(x_1,x_2,y^k),
  \qquad
  y^{k+1}=y^k+\tau\rho(A_1x_1^{k+1}+A_2x_2^{k+1}-b);
\end{equation}$$ 第一步同时对 $$x_1,x_2$$ 优化有时困难，而固定一个变量对另一个求极小可能 简单------这就是**交替方向乘子法**的基本思路： $$\begin{equation}
  \begin{aligned}
    x_1^{k+1}&=\operatorname*{arg\,min}_{x_1}\ L_\rho(x_1,\ x_2^k,\ y^k),\\
    x_2^{k+1}&=\operatorname*{arg\,min}_{x_2}\ L_\rho(x_1^{k+1},\ x_2,\ y^k),\\
    y^{k+1}&=y^k+\tau\rho\bigl(A_1x_1^{k+1}+A_2x_2^{k+1}-b\bigr),
  \end{aligned}
\end{equation}$$ 其中 $$\tau$$ 为步长，通常取值于 $$\bigl(0,\frac{1+\sqrt5}{2}\bigr]$$ （收敛性小节给出理由）．

与交替极小化方法的区别**（与交替极小化方法的区别）** ADMM 的迭代格式与 §8.5 的交替极小化方法 (8.285) 非常相似：区别仅在第一步------交替极小化针对*拉格朗日函数*求极小， ADMM 换成了*增广拉格朗日函数*．这一改变带来截然不同的表现： ADMM 去掉了 $$f_1$$ **强凸**的要求（本质是引入了二次罚项），而交替 极小化方法要求 $$f$$ 强凸．

良定义性**（良定义性）** 虽然引入了二次罚项，对一般的闭凸 $$f_1,f_2$$，迭代 (8.326) 在某些特殊情况下仍不是良定义的（子问题可能无最小值点或不唯一）．本节 假设每个子问题的解存在唯一------注意该假设对一般闭凸函数并不成立．

##### 收敛准则

ADMM 针对带约束问题 (8.322)，收敛准则应借助约束优化 的 KKT 条件（§5.5）．$$f_1,f_2$$ 闭凸、约束线性，Slater 条件成立时可用 KKT 条件：若 $$(x_1^*,x_2^*)$$ 为最优解、$$y^*$$ 为相应乘子，则 $$\begin{align}
  0&\in\partial_{x_1}L(x_1^*,x_2^*,y^*)=\partial f_1(x_1^*)+A_1^\top y^*,
  \\
  0&\in\partial_{x_2}L(x_1^*,x_2^*,y^*)=\partial f_2(x_2^*)+A_2^\top y^*,
  \\
  A_1x_1^*+A_2x_2^*&=b.
\end{align}$$ (8.329) 称为**原始可行性**条件，(8.327) (8.328) 称为**对偶可行性**条件（只含等式约束，互补 松弛可忽略）．迭代中得到的是 $$(x_1^k,x_2^k,y^k)$$，需针对其检测 (8.327)--(8.329)：

*原始可行性残差*： $$\begin{equation}
  r^k=A_1x_1^k+A_2x_2^k-b,
\end{equation}$$ 其模长容易计算．*对偶可行性*：考虑 $$x_2$$ 的更新 $$\begin{equation}
  x_2^k=\operatorname*{arg\,min}_x\Bigl\lbracef_2(x)+\frac{\rho}{2}
  \left\Vert A_1x_1^k+A_2x-b+\frac{y^{k-1}}{\rho}\right\Vert^2\Bigr\rbrace,
\end{equation}$$ 若子问题有显式解（可精确求解），由最优性条件 $$\begin{equation}
  0\in\partial f_2(x_2^k)+A_2^\top\bigl[y^{k-1}+\rho(A_1x_1^k
  +A_2x_2^k-b)\bigr].
\end{equation}$$ 当 ADMM 步长 $$\tau=1$$ 时，方括号内即 $$y^k$$，故 $$0\in\partial f_2(x_2^k)+A_2^\top y^k$$------对偶可行性 (8.328) *自然成立*，无需单独验证．然而 $$x_1$$ 的 最优性条件： $$\begin{equation}
  0\in\partial f_1(x_1^k)+A_1^\top\bigl[\rho(A_1x_1^k+A_2x_2^{k-1}-b)
  +y^{k-1}\bigr]
  =\partial f_1(x_1^k)+A_1^\top\bigl(y^k+\rho A_2(x_2^{k-1}-x_2^k)\bigr)
\end{equation}$$ （$$x_2$$ 的上标是 $$k-1$$，对比 (8.327) 多出的项为 $$\rho A_1^\top A_2(x_2^{k-1}-x_2^k)$$），故只需检测残差 $$\begin{equation}
  s^k=A_1^\top A_2\bigl(x_2^{k-1}-x_2^k\bigr)
\end{equation}$$ 是否充分小．综上，当 $$x_2$$ 更新取到精确解且 $$\tau=1$$ 时，判断 ADMM 是否收敛只需检测两个残差： $$\begin{equation}
  \left\Vert r^k\right\Vert=\left\Vert A_1x_1^k+A_2x_2^k-b\right\Vert\approx0\ \text{（原始可行性）},
  \qquad
  \left\Vert s^k\right\Vert=\left\Vert A_1^\top A_2(x_2^{k-1}-x_2^k)\right\Vert\approx0\
  \text{（对偶可行性）}.
\end{equation}$$

### Douglas--Rachford Splitting 算法

**Douglas--Rachford splitting**（DRS）是一类重要的*算子分裂* 算法，用于求解无约束复合问题 $$\begin{equation}
  \min_x\ \psi(x)=f(x)+h(x)
\end{equation}$$ （$$f,h$$ 闭凸）．迭代格式为 $$\begin{align}
  x^{k+1}&=\operatorname{prox}_{th}(z^k),
  \\
  y^{k+1}&=\operatorname{prox}_{tf}\bigl(2x^{k+1}-z^k\bigr),
  \\
  z^{k+1}&=z^k+y^{k+1}-x^{k+1},
\end{align}$$ 其中 $$t>0$$ 为常数．按 $$y,z,x$$ 的顺序重排更新并引入辅助变量 $$w^k=z^k-x^k$$（$$z^k,z^{k+1}$$ 可消去），得到 DRS 的等价迭代： $$\begin{align}
  y^{k+1}&=\operatorname{prox}_{tf}\bigl(x^k-w^k\bigr),
  \\
  x^{k+1}&=\operatorname{prox}_{th}\bigl(w^k+y^{k+1}\bigr),
  \\
  w^{k+1}&=w^k+y^{k+1}-x^{k+1}.
\end{align}$$ DRS 还可写成关于 $$z^k$$ 的**不动点迭代**： $$\begin{equation}
  z^{k+1}=T(z^k),
  \qquad
  T(z)=z+\operatorname{prox}_{tf}\bigl(2\operatorname{prox}_{th}(z)-z\bigr)
  -\operatorname{prox}_{th}(z).
\end{equation}$$ 写成不动点迭代的好处：去掉 $$x^k,y^k$$ 变量使算法形式简洁；不动点迭代的 收敛性研究有成熟工具（如泛函分析中的压缩映射原理）；可写出多种加速 算法．

<div class="theorem">

**定理 8.15**

1.  若 $$z$$ 是 $$T$$ 的不动点（$$z=T(z)$$），则 $$x=\operatorname{prox}_{th}(z)$$ 是问题 $$\min_x f(x)+h(x)$$ 的最小值点；

2.  若 $$x$$ 是该问题的最小值点，则存在 $$u\in t\partial f(x)\cap\bigl(-t\partial h(x)\bigr)$$ 且 $$x-u=T(x-u)$$，即 $$x-u$$ 是 $$T$$ 的不动点．

</div>

**Proof** **（）** (1) 若 $$z=T(z)$$，令 $$x=\operatorname{prox}_{th}(z)$$，则不动点方程给出 $$\operatorname{prox}_{tf}(2x-z)=x=\operatorname{prox}_{th}(z)$$．由邻近 算子的最优性条件（定理 8.2）： $$\begin{equation}
  x-z\in t\partial f(x),
  \qquad
  z-x\in t\partial h(x).
\end{equation}$$ 因此 $$0\in t\partial f(x)+t\partial h(x)$$，即 $$0\in\partial(f+h)(x)$$； 由 $$f,h$$ 凸及凸问题一阶充要条件知 $$x$$ 是最小值点．

\(2\) 若 $$x$$ 是最小值点，则 $$0\in\partial f(x)+\partial h(x)$$，故存在 $$u_1\in\partial f(x)$$、$$u_2\in\partial h(x)$$ 使 $$u_1+u_2=0$$；取 $$u=tu_1\in t\partial f(x)\cap\bigl(-t\partial h(x)\bigr)$$．令 $$z'=x-u$$：由 $$z'-x=-u\in t\partial h(x)$$ 得 $$\operatorname{prox}_{th}(z')=x$$；由 $$(2x-z')-x=u\in t\partial f(x)$$ 得 $$\operatorname{prox}_{tf}(2x-z')=x$$．因此 $$\begin{equation}
  T(z')=z'+\operatorname{prox}_{tf}\bigl(2\operatorname{prox}_{th}(z')-z'\bigr)
  -\operatorname{prox}_{th}(z')
  =z'+x-x=z',
\end{equation}$$ 即 $$x-u=z'$$ 是 $$T$$ 的不动点．

##### 松弛版本

对不动点迭代可加**松弛**项加快收敛：$$z^{k+1}=z^k+\rho(T(z^k)-z^k)$$， 当 $$1<\rho<2$$ 时为超松弛、$$0<\rho<1$$ 时为欠松弛．得到 DRS 的松弛版本： $$\begin{equation}
  x^{k+1}=\operatorname{prox}_{th}(z^k),
  \qquad
  y^{k+1}=\operatorname{prox}_{tf}(2x^{k+1}-z^k),
  \qquad
  z^{k+1}=z^k+\rho\bigl(y^{k+1}-x^{k+1}\bigr),
\end{equation}$$ 其等价形式为 $$\begin{align}
  &y^{k+1}=\operatorname{prox}_{tf}\bigl(x^k-w^k\bigr),\\
  &x^{k+1}=\operatorname{prox}_{th}\bigl((1-\rho)x^k
  +\rho y^{k+1}+w^k\bigr),\\
  &w^{k+1}=w^k+\rho y^{k+1}+(1-\rho)x^k-x^{k+1}.
\end{align}$$

##### DRS 与 ADMM 的等价性

考虑可分凸问题 (8.322)，其对偶问题为无约束复合优化 问题： $$\begin{equation}
  \min_z\ \underbrace{b^\top z+f_1^*(-A_1^\top z)}_{\text{记为 }f(z)}
  +\underbrace{f_2^*(-A_2^\top z)}_{\text{记为 }h(z)}.
\end{equation}$$ 对该问题使用 DRS 算法求解：

<div class="theorem">

**定理 8.16** 如果 $$w^1=-tA_2x_2^0$$，那么对对偶问题 (8.350) 应用 迭代格式 (8.340)--(8.342)，等价于 对原始问题 (8.322) 应用 ADMM（罚因子 $$\rho=t$$， 步长 $$\tau=1$$）．

</div>

**Proof** **（）** 对迭代格式 (8.340)（$$y^{k+1}=\operatorname{prox}_{tf}
(x^k-w^k)$$），其最优性条件为 $$\begin{equation}
  0\in tb-tA_1\partial f_1^*(-A_1^\top y^{k+1})-x^k+w^k+y^{k+1},
\end{equation}$$ 等价于存在 $$x_1^k\in\partial f_1^*(-A_1^\top y^{k+1})$$ 使 $$\begin{equation}
  y^{k+1}=x^k-w^k+t(A_1x_1^k-b).
\end{equation}$$ 由命题 8.4：$$-A_1^\top y^{k+1}\in\partial
f_1(x_1^k)$$，即 $$\begin{equation}
  -A_1^\top\bigl(x^k-w^k+t(A_1x_1^k-b)\bigr)\in\partial f_1(x_1^k),
\end{equation}$$ 这正是如下更新的最优性条件： $$\begin{equation}
  x_1^k=\operatorname*{arg\,min}_{x_1}\Bigl\lbracef_1(x_1)+(x^k)^\top(A_1x_1-b)
  +\frac{t}{2}\Bigl\Vert A_1x_1-b-\frac{w^k}{t}\Bigr\Vert_2^2\Bigr\rbrace.
\end{equation}$$ 类似地，迭代 (8.341) 的最优性条件为 $$\begin{equation}
  0\in tA_2\partial f_2^*(-A_2^\top x^{k+1})+w^k+y^{k+1}-x^{k+1},
\end{equation}$$ 等价于存在 $$x_2^k\in\partial f_2^*(-A_2^\top x^{k+1})$$ 使 $$\begin{equation}
  x^{k+1}=x^k+t\bigl(A_1x_1^k+A_2x_2^k-b\bigr).
\end{equation}$$ 由命题 8.4：$$-A_2^\top x^{k+1}\in\partial
f_2(x_2^k)$$，即 $$-A_2^\top\bigl(x^k+t(A_1x_1^k+A_2x_2^k-b)\bigr)\in\partial f_2(x_2^k)$$， 等价于 $$\begin{equation}
  x_2^k=\operatorname*{arg\,min}_{x_2}\Bigl\lbracef_2(x_2)+(x^k)^\top(A_2x_2)
  +\frac{t}{2}\left\Vert A_1x_1^k+A_2x_2-b\right\Vert_2^2\Bigr\rbrace.
\end{equation}$$ 由 (8.352)(8.356) 与 $$w$$-更新 (8.342) 可得 $$w^{k+1}=-tA_2x_2^k$$：事实上 $$\begin{equation}
  w^{k+1}=w^k+y^{k+1}-x^{k+1}
  =w^k+\bigl[x^k-w^k+t(A_1x_1^k-b)\bigr]
  -\bigl[x^k+t(A_1x_1^k+A_2x_2^k-b)\bigr]
  =-tA_2x_2^k,
\end{equation}$$ （归纳可证：初始 $$w^1=-tA_2x_2^0$$ 与假设一致，则每步 $$w^k=-tA_2x_2^{k-1}$$ 保持．）令 $$z^k=x^{k+1}$$，总结上面的更新： $$\begin{equation}
  \begin{aligned}
    x_1^k&=\operatorname*{arg\,min}_{x_1}\Bigl\lbracef_1(x_1)+(z^{k-1})^\top A_1x_1
    +\frac{t}{2}\left\Vert A_1x_1+A_2x_2^{k-1}-b\right\Vert^2\Bigr\rbrace,\\
    x_2^k&=\operatorname*{arg\,min}_{x_2}\Bigl\lbracef_2(x_2)+(z^{k-1})^\top A_2x_2
    +\frac{t}{2}\left\Vert A_1x_1^k+A_2x_2-b\right\Vert^2\Bigr\rbrace,\\
    z^k&=z^{k-1}+t\bigl(A_1x_1^k+A_2x_2^k-b\bigr),
  \end{aligned}
\end{equation}$$ 这正是对问题 (8.322) 应用交替方向乘子法，罚因子 $$\rho=t$$、步长 $$\tau=1$$．以上论证均可反推，等价性成立．

### 常见变形和技巧

ADMM 的初衷是拆分变量使子问题有显式解；实际中子问题可能不容易求解 或没必要精确求解，以下给出常用的变形与实现技巧．

##### 1. 线性化

考虑第一个子问题 $$\begin{equation}
  \min_{x_1}\ f_1(x_1)+\frac{\rho}{2}\left\Vert A_1x_1-v^k\right\Vert_2^2,
  \qquad
  v^k=b-A_2x_2^k-\frac{1}{\rho}y^k.
\end{equation}$$ 当子问题不能显式求解时，可**线性化**：用近端项对子问题目标函数做 二次近似．当目标可微时： $$\begin{equation}
  x_1^{k+1}=\operatorname*{arg\,min}_{x_1}\Bigl\lbrace\bigl(\nabla f_1(x_1^k)
  +\rho A_1^\top(A_1x_1^k-v^k)\bigr)^\top x_1
  +\frac{1}{2\eta^k}\left\Vert x_1-x^k\right\Vert_2^2\Bigr\rbrace,
\end{equation}$$ 等价于做一步*梯度下降*；当目标不可微时可只将二次项线性化： $$\begin{equation}
  x_1^{k+1}=\operatorname*{arg\,min}_{x_1}\Bigl\lbracef_1(x_1)+\rho\bigl(A_1^\top(A_1x_1^k-v^k)
  \bigr)^\top x_1+\frac{1}{2\eta^k}\left\Vert x_1-x^k\right\Vert_2^2\Bigr\rbrace,
\end{equation}$$ 等价于做一步*近似点梯度*步；$$f_1$$ 为可微与不可微之和时可只将可微 部分线性化．

##### 2. 缓存分解

若 $$f_1(x_1)=\frac12\left\Vert Cx_1-d\right\Vert_2^2$$，则 $$x_1$$ 的更新等价于求解 线性方程组 $$\begin{equation}
  (C^\top C+\rho A_1^\top A_1)x_1=C^\top d+\rho A_1^\top v^k.
\end{equation}$$ 每步求解的复杂度仍高，可用**缓存分解**：先对 $$C^\top C+\rho
A_1^\top A_1$$ 做 Cholesky 分解并缓存结果，每步只需解简单的三角方程组； 当 $$\rho$$ 更新时需重新分解．特别地，当 $$C^\top C+\rho A_1^\top A_1$$ 一部分容易求逆、另一部分低秩时，可用 SMW 公式求逆．

##### 3. 优化转移

用性质好的矩阵 $$D$$ 近似二次项 $$A_1^\top A_1$$，把子问题 (8.360) 替换为 $$\begin{equation}
  x_1^{k+1}=\operatorname*{arg\,min}_{x_1}\Bigl\lbracef_1(x_1)+\frac{\rho}{2}
  \left\Vert A_1x_1-v^k\right\Vert_2^2
  +\frac{\rho}{2}(x_1-x^k)^\top\bigl(D-A_1^\top A_1\bigr)(x_1-x^k)\Bigr\rbrace,
\end{equation}$$ 这种方法称为**优化转移**（proximal transfer）．选取合适的 $$D$$，当 $$\operatorname*{arg\,min}\lbracef_1+\frac{\rho}{2}x_1^\top Dx_1\rbrace$$ 明显比 $$\operatorname*{arg\,min}\lbracef_1+\frac{\rho}{2}x_1^\top A_1^\top A_1x_1\rbrace$$ 容易时，可极大 简化子问题；特别地 $$D=\frac{\eta^k}{\rho}I$$ 时优化转移等价于单步近似点 梯度步（与\"线性化\"一致）．

##### 4. 二次罚项系数的动态调节

罚项系数 $$\rho$$ 太大：原始可行性 $$\left\Vert r^k\right\Vert$$ 下降快但对偶可行性 $$\left\Vert s^k\right\Vert$$ 下降慢；$$\rho$$ 太小则相反------都会导致收敛慢或可行性差． 自然的想法是每次迭代**动态调节** $$\rho$$，使两个可行性以一致的速度 下降： $$\begin{equation}
  \rho^{k+1}=
  \begin{cases}
    \gamma_p\rho^k, & \left\Vert r^k\right\Vert>\mu\left\Vert s^k\right\Vert,\\
    \dfrac{\rho^k}{\gamma_d}, & \left\Vert s^k\right\Vert>\mu\left\Vert r^k\right\Vert,\\
    \rho^k, & \text{其他},
  \end{cases}
\end{equation}$$ 其中 $$\mu>1$$，$$\gamma_p>1$$，$$\gamma_d>1$$ 为参数，常见选择 $$\mu=10$$，$$\gamma_p=\gamma_d=2$$------想法是把 $$\left\Vert r^k\right\Vert$$ 与 $$\left\Vert s^k\right\Vert$$ 保持在彼此的 $$\mu$$ 倍内．注意改变 $$\rho^k$$ 时若用了缓存分解技巧需重新 分解．更一般地可对每个约束给不同的惩罚系数，甚至把二次项 $$\frac{\rho}{2}\left\Vert r\right\Vert^2$$ 替换为 $$\frac{\rho}{2}r^\top Pr$$（$$P$$ 对称 正定）：若 $$P$$ 在迭代中不变，可将其解释为对修改后的问题（约束 $$A_1x_1+A_2x_2-b=0$$ 替换为 $$F(A_1x_1+A_2x_2-b)=0$$，$$F$$ 为 $$P$$ 的 Cholesky 因子，$$P=F^\top F$$）应用标准 ADMM．

##### 5. 超松弛

在 (8.326) 的第二、三步中，$$A_1x_1^{k+1}$$ 可以被 替换为 $$\begin{equation}
  \alpha^k A_1x_1^{k+1}-(1-\alpha^k)(A_2x_2^k-b),
\end{equation}$$ 其中 $$\alpha^k\in(0,2)$$ 为松弛参数：$$\alpha^k>1$$ 称**超松弛**， $$\alpha^k<1$$ 称**欠松弛**；实验表明 $$\alpha^k\in[1.5,1.8]$$ 的 超松弛可以提高收敛速度．

##### 6. 多块与非凸问题的 ADMM

问题 (8.322) 可推广到多块变量： $$\begin{equation}
  \min_{x_1,\dots,x_N}\ f_1(x_1)+\dots+f_N(x_N)
  \ \text{s.t.}\ A_1x_1+\dots+A_Nx_N=b,
\end{equation}$$ （$$f_i$$ 闭凸，$$x_i\in\mathbb{R}^{n_i}$$，$$A_i\in\mathbb{R}^{m\times n_i}$$．）写出增广 拉格朗日函数 $$L_\rho(x_1,\dots,x_N,y)$$，相应的**多块 ADMM** 依次 更新各块变量再更新乘子，步长参数 $$\tau\in\bigl(0,\frac{\sqrt5+1}{2}\bigr)$$．针对*非凸*问题，ADMM 格式可能不是良定义的（子问题无最小值点或不唯一）；若只考虑子问题解 存在的情形，仍可形式上利用 ADMM 格式求解（$$\operatorname*{arg\,min}$$ 理解为选取子问题 最小值点中的一个）．与两块凸问题的 ADMM 相比，*多块（非凸）ADMM 可能不具有收敛性*；但在找到有效算法之前，这两种变形都值得一试，在某些 实际问题上有不错的效果．

### 应用举例

实际问题大多不直接具有 (8.322) 的形式，需要通过拆分 技巧化成 ADMM 标准形式，同时要求每个子问题尽量容易求解；对同一个问题 可能有多种拆分方式，不同方式导出的算法差异巨大------应选择最容易求解的 拆分方式．

##### 1. LASSO 问题

LASSO 问题 $$\min_x\ \mu\left\Vert x\right\Vert_1+\frac12\left\Vert Ax-b\right\Vert^2$$ 是典型的无约束 复合问题，引入 $$z=x$$ 拆分： $$\begin{equation}
  \min_{x,z}\ \underbrace{\frac12\left\Vert Ax-b\right\Vert^2}_{f(x)}
  +\underbrace{\mu\left\Vert z\right\Vert_1}_{h(z)}
  \ \text{s.t.}\ x=z,
\end{equation}$$ ADMM 迭代格式为 $$\begin{equation}
  \begin{aligned}
    x^{k+1}&=\operatorname*{arg\,min}_x\Bigl\lbrace\frac12\left\Vert Ax-b\right\Vert^2
    +\frac{\rho}{2}\left\Vert x-z^k+\frac{1}{\rho}y^k\right\Vert_2^2\Bigr\rbrace
    =(A^\top A+\rho I)^{-1}\bigl(A^\top b+\rho z^k-y^k\bigr),\\
    z^{k+1}&=\operatorname*{arg\,min}_z\Bigl\lbrace\mu\left\Vert z\right\Vert_1+\frac{\rho}{2}
    \left\Vert x^{k+1}-z+\frac{1}{\rho}y^k\right\Vert_2^2\Bigr\rbrace
    =\operatorname{prox}_{(\mu/\rho)\left\Vert\cdot\right\Vert_1}
    \Bigl(x^{k+1}+\frac{y^k}{\rho}\Bigr),\\
    y^{k+1}&=y^k+\tau\rho\bigl(x^{k+1}-z^{k+1}\bigr).
  \end{aligned}
\end{equation}$$ 注意 $$\rho>0$$ 保证 $$A^\top A+\rho I$$ 总可逆；$$x$$ 迭代本质是*岭 回归*问题，$$z$$ 更新为 $$\ell_1$$ 范数的邻近算子，都有显式解；固定 $$\rho$$ 时可缓存 $$A^\top A+\rho I$$ 的分解减小后续计算量．LASSO 中 $$A\in\mathbb{R}^{m
\times n}$$ 通常列多（$$m\ll n$$），$$A^\top A\in\mathbb{R}^{n\times n}$$ 低秩，二次 罚项相当于加了正定项；主要运算量来自更新 $$x$$ 的线性方程组（$$O(n^3)$$， 用缓存分解或 SMW 公式可进一步降低单步运算量）．数值实验（讲义图 8.9） 显示迭代步数较少，收敛平稳．

对偶 LASSO 问题： $$\begin{equation}
  \min_y\ b^\top y+\frac12\left\Vert y\right\Vert_2^2
  \ \text{s.t.}\ \left\Vert A^\top y\right\Vert_\infty\le\mu.
\end{equation}$$ 把 $$\left\Vert A^\top y\right\Vert_\infty\le\mu$$ 变成示性函数放入目标，引入约束 $$A^\top y+z=0$$： $$\begin{equation}
  \min_{y,z}\ \underbrace{b^\top y+\frac12\left\Vert y\right\Vert_2^2}_{f(y)}
  +\underbrace{I_{\left\Vert z\right\Vert_\infty\le\mu}(z)}_{h(z)}
  \ \text{s.t.}\ A^\top y+z=0.
\end{equation}$$ 引入乘子 $$x$$（可以证明------见习题 8.18------$$x$$ 恰对应原始问题的自变量， 体现了原始/对偶变量的对应关系），ADMM 迭代格式为 $$\begin{align}
  &z^{k+1}=P_{\left\Vert z\right\Vert_\infty\le\mu}\Bigl(\frac{x^k}{\rho}
  -A^\top y^k\Bigr),\\
  &y^{k+1}=(I+\rho AA^\top)^{-1}\bigl(A(x^k-\rho z^{k+1})-b\bigr),\\
  &x^{k+1}=x^k-\tau\rho\bigl(A^\top y^{k+1}+z^{k+1}\bigr).
\end{align}$$ $$z$$ 更新为到无穷范数球的投影（分量截断在 $$[-\mu,\mu]$$），$$y$$ 更新解 线性方程组（$$I+\rho AA^\top$$ 只在*行*空间维度上，当 $$m\ll n$$ 时 规模远小于原始问题对应的 $$n\times n$$ 方程组）．求解原始问题迭代步数少， 求解对偶问题单步时间更短，综合来看 ADMM 求解对偶问题更快------体现了 ADMM 的强大之处．

##### 2. 广义 LASSO 问题

$$\begin{equation}
  \min_x\ \mu\left\Vert Fx\right\Vert_1+\frac12\left\Vert Ax-b\right\Vert^2,
\end{equation}$$ （$$x$$ 本身不稀疏但在变换 $$F$$ 下稀疏．）当 $$F\in\mathbb{R}^{(n-1)\times n}$$ 为 一阶差分矩阵（$$F_{ij}=1$$ 若 $$j=i+1$$，$$F_{ij}=-1$$ 若 $$j=i$$）且 $$A=I$$ 时，问题为图像去噪的 **TV 模型** $$\min_x\frac12\left\Vert x-b\right\Vert^2+\mu\sum_{i=1}^{n-1}\left\vert x_{i+1}-x_i\right\vert$$；当 $$A=I$$ 且 $$F$$ 为二阶差分矩阵时称为**一范数趋势滤波**．引入约束 $$Fx=z$$： $$\begin{equation}
  \min_{x,z}\ \frac12\left\Vert Ax-b\right\Vert^2+\mu\left\Vert z\right\Vert_1\ \ \text{s.t.}\ \ Fx-z=0,
\end{equation}$$ 增广拉格朗日函数 $$L_\rho=\frac12\left\Vert Ax-b\right\Vert^2+\mu\left\Vert z\right\Vert_1
+y^\top(Fx-z)+\frac{\rho}{2}\left\Vert Fx-z\right\Vert^2$$，$$x$$ 迭代解方程组、$$z$$ 迭代 用 $$\ell_1$$ 邻近算子： $$\begin{equation}
  \begin{aligned}
    x^{k+1}&=(A^\top A+\rho F^\top F)^{-1}
    \Bigl(A^\top b+\rho F^\top\Bigl(z^k-\frac{y^k}{\rho}\Bigr)\Bigr),\\
    z^{k+1}&=\operatorname{prox}_{(\mu/\rho)\left\Vert\cdot\right\Vert_1}
    \Bigl(Fx^{k+1}+\frac{y^k}{\rho}\Bigr),\\
    y^{k+1}&=y^k+\tau\rho\bigl(Fx^{k+1}-z^{k+1}\bigr).
  \end{aligned}
\end{equation}$$ 主要计算量在 $$x$$ 更新：图像去噪变量达百万量级，不适合矩阵分解，应利用 系数矩阵的特殊结构------全变差去噪问题 $$A^\top A+\rho F^\top F$$ 是 *三对角*矩阵（$$x$$ 迭代 $$O(n)$$）；图像去模糊问题 $$A$$ 是卷积算子 （用 Fourier 变换 $$O(n\log n)$$）；一范数趋势滤波问题为*五对角* 矩阵（$$O(n)$$）．

##### 3. 逆协方差矩阵估计

逆协方差矩阵估计问题（§3） $$\begin{equation}
  \min_X\ \left\langle S,\,\ X\right\rangle-\ln\det X+\mu\left\Vert X\right\Vert_1
\end{equation}$$ （$$S$$ 为样本协方差矩阵，$$X\in\mathcal{S}^{n}_{++}$$，$$\left\Vert\cdot\right\Vert_1$$ 为矩阵所有元素 绝对值之和）上 ADMM 表现非常好．引入约束 $$X=Z$$ 拆分： $$\begin{equation}
  \min_{X,Z}\ \underbrace{\left\langle S,\,\ X\right\rangle-\ln\det X}_{f(X)}
  +\underbrace{\mu\left\Vert Z\right\Vert_1}_{h(Z)}
  \ \text{s.t.}\ X=Z,
\end{equation}$$ 乘子 $$U$$ 作用在 $$X-Z=0$$ 上，增广拉格朗日函数（矩阵情形用 $$F$$ 范数罚项）： $$\begin{equation}
  L_\rho(X,Z,U)=\left\langle S,\,\ X\right\rangle-\ln\det X+\mu\left\Vert Z\right\Vert_1
  +\left\langle U,\,\ X-Z\right\rangle+\frac{\rho}{2}\left\Vert X-Z\right\Vert_F^2.
\end{equation}$$ $$X$$ 子问题（固定 $$Z^k,U^k$$，凸光滑）：对 $$X$$ 求导置零 $$\begin{equation}
  S-X^{-1}+U^k+\rho(X-Z^k)=0,
\end{equation}$$ 唯一正定解为 $$\begin{equation}
  X^{k+1}=Q\operatorname{Diag}(x_1,\dots,x_n)Q^\top,
  \qquad
  x_i=\frac{-d_i+\sqrt{d_i^2+4\rho}}{2\rho},
\end{equation}$$ 其中 $$Q$$ 为 $$S-\rho Z^k+U^k$$ 的特征向量矩阵，$$d_i$$ 为其第 $$i$$ 个 特征值；$$Z$$ 更新为矩阵 $$\ell_1$$ 范数的邻近算子；$$U$$ 常规更新（习题 8.4 推导）．

##### 4. 矩阵分离问题

矩阵分离问题（§3.8）： $$\begin{equation}
  \min_{X,S}\ \left\Vert X\right\Vert_*+\mu\left\Vert S\right\Vert_1\ \ \text{s.t.}\ \ X+S=M,
\end{equation}$$ 乘子 $$Y$$ 作用在 $$X+S=M$$ 上，增广拉格朗日函数： $$\begin{equation}
  L_\rho(X,S,Y)=\left\Vert X\right\Vert_*+\mu\left\Vert S\right\Vert_1
  +\left\langle Y,\,\ X+S-M\right\rangle+\frac{\rho}{2}\left\Vert X+S-M\right\Vert_F^2.
\end{equation}$$ $$X$$ 子问题： $$\begin{equation}
  X^{k+1}=\operatorname*{arg\,min}_X\Bigl\lbrace\frac1\rho\left\Vert X\right\Vert_*
  +\frac12\Bigl\Vert X+S^k-M+\frac{Y^k}{\rho}\Bigr\Vert_F^2\Bigr\rbrace
  =U\operatorname{Diag}\bigl(\operatorname{prox}_{(1/\rho)\left\Vert\cdot\right\Vert_1}(\sigma(A))
  \bigr)V^\top,
\end{equation}$$ 其中 $$A=M-S^k-\frac{Y^k}{\rho}$$，$$U\operatorname{Diag}(\sigma(A))V^\top$$ 为其约化 奇异值分解------即**奇异值软阈值**；$$S$$ 子问题： $$\begin{equation}
  S^{k+1}=\operatorname{prox}_{(\mu/\rho)\left\Vert\cdot\right\Vert_1}
  \Bigl(M-X^{k+1}-\frac{Y^k}{\rho}\Bigr);
\end{equation}$$ 乘子更新 $$Y^{k+1}=Y^k+\tau\rho(X^{k+1}+S^{k+1}-M)$$．两个子问题都有 显式解------这是 §7.1.4 矩阵补全罚函数法子问题的\"可解版本\"．

##### 5. 全局一致性优化问题

对例 8.24 的拆分 $$\min_{x_i,z}\sum_{i=1}^{N}\phi_i(x_i)\ \ \text{s.t.}\ \ x_i-z=0$$，增广拉格朗日函数为 $$\begin{equation}
  L_\rho(x_1,\dots,x_N,z,y_1,\dots,y_N)=\sum_{i=1}^{N}\phi_i(x_i)
  +\sum_{i=1}^{N}y_i^\top(x_i-z)
  +\frac{\rho}{2}\sum_{i=1}^{N}\left\Vert x_i-z\right\Vert^2.
\end{equation}$$ 固定 $$z^k,y_i^k$$ 更新 $$x_i$$： $$\begin{equation}
  x_i^{k+1}=\operatorname*{arg\,min}_x\Bigl\lbrace\phi_i(x)+\frac{\rho}{2}
  \left\Vert x-z^k+\frac{y_i^k}{\rho}\right\Vert^2\Bigr\rbrace,
\end{equation}$$ （虽然表面上有 $$N+1$$ 个变量块，本质上仍是*两个*变量块：更新某个 $$x_i$$ 时不利用其他 $$x_i$$ 的信息，所有 $$x_i$$ 可看成整体；$$y_i$$ 同理．） 一般情形 $$x_i^{k+1}=\operatorname{prox}_{\phi_i/\rho}
\bigl(z^k-\frac{y_i^k}{\rho}\bigr)$$；固定 $$x_i^{k+1},y_i^k$$，$$z$$ 子问题 是二次函数，直接写出显式解： $$\begin{equation}
  z^{k+1}=\frac1N\sum_{i=1}^{N}\Bigl(x_i^{k+1}+\frac{y_i^k}{\rho}\Bigr)
\end{equation}$$ （即各块的平均）．迭代格式： $$\begin{align}
  &x_i^{k+1}=\operatorname{prox}_{\phi_i/\rho}
  \Bigl(z^k-\frac{y_i^k}{\rho}\Bigr),\qquad i=1,\dots,N;\\
  &z^{k+1}=\frac1N\sum_{i=1}^{N}\Bigl(x_i^{k+1}
  +\frac{y_i^k}{\rho}\Bigr);\\
  &y_i^{k+1}=y_i^k+\tau\rho\bigl(x_i^{k+1}-z^{k+1}\bigr).
\end{align}$$ 这就是*并行/分布式*优化的经典范式：各节点并行算近端步，中心节点 平均，再更新对偶变量------全局一致性问题因此是分布式 ADMM 的模型问题．

##### 6. 非凸集合上的优化问题

$$\begin{equation}
  \min_x\ f(x)\ \ \text{s.t.}\ \ x\in S
\end{equation}$$ （$$f$$ 闭凸但 $$S$$ *非凸*）：利用例 8.23 的 技巧，引入示性函数与拆分： $$\begin{equation}
  \min_{x,z}\ f(x)+I_S(z)\ \ \text{s.t.}\ \ x-z=0,
\end{equation}$$ 增广拉格朗日函数 $$L_\rho(x,z,y)=f(x)+I_S(z)+y^\top(x-z)+\frac{\rho}{2}\left\Vert x-z\right\Vert^2$$． 固定 $$z,y$$ 对 $$x$$ 求极小即计算邻近算子： $$\begin{equation}
  x^{k+1}=\operatorname{prox}_{f/\rho}\Bigl(z^k-\frac{y^k}{\rho}\Bigr);
\end{equation}$$ 固定 $$x,y$$ 对 $$z$$ 求极小是到*非凸集合*上的投影： $$\begin{equation}
  z^{k+1}=\operatorname*{arg\,min}_{z\in S}\frac12\Bigl\Vert z-\Bigl(x^{k+1}
  +\frac{y^k}{\rho}\Bigr)\Bigr\Vert^2
  =P_S\Bigl(x^{k+1}+\frac{y^k}{\rho}\Bigr).
\end{equation}$$ 一般 $$S$$ 非凸时 $$P_S$$ 较困难（存在性唯一性不保证），但很多具有特殊 结构的 $$S$$ 可精确投影：

1.  **基数约束**：$$S=\lbracex:\ \left\Vert x\right\Vert_0\le c\rbrace$$（$$\ell_0$$ 范数 即非零元数目）．到 $$S$$ 的投影保留 $$v$$ 分量绝对值最大的前 $$c$$ 个、其余置零：设 $$\left\vert v_{i_1}\right\vert\ge\dots\ge\left\vert v_{i_n}\right\vert$$，则 $$\begin{equation}
              \bigl(P_S(v)\bigr)_i=
              \begin{cases}
                v_i, & i\in\lbracei_1,\dots,i_c\rbrace,\\
                0,   & \text{其他};
              \end{cases}
    \end{equation}$$

2.  **低秩投影**：$$S=\lbracex:\ \operatorname{rank}(x)\le r\rbrace$$（矩阵情形）------ 等价于对 $$x$$ 做**截断奇异值分解**：设 $$x=\sum_{i=1}^{\min\lbracem,n\rbrace}\sigma_iu_iv_i^\top$$ （$$\sigma_1\ge\dots\ge\sigma_{\min\lbracem,n\rbrace}\ge0$$），则 $$\begin{equation}
              P_S(x)=\sum_{i=1}^{r}\sigma_iu_iv_i^\top;
    \end{equation}$$

3.  **布尔约束**：$$S=\lbrace0,1\rbrace^n$$------$$P_S(v)$$ 把每个分量变为 $$0,1$$ 中离它更近的数（四舍五入）．

这展示了 ADMM 处理组合/非凸约束的技巧：把非凸性\"隔离\"在一个投影 子问题里，其余部分保持凸可解．

##### 7. 非负矩阵分解和补全

非负矩阵分解与补全：已知非负、秩为 $$r$$ 的矩阵 $$M\in\mathbb{R}^{m\times n}$$ 的 部分元素 $$M_{ij}\ (i,j)\in\Omega$$，求非负矩阵 $$X\in\mathbb{R}^{m\times q}$$， $$Y\in\mathbb{R}^{q\times n}$$ 使 $$\left\Vert M-XY\right\Vert_F^2$$ 极小（$$q$$ 可等于、小于或 大于 $$r$$）．定义 $$P_{ij}=1$$ 若 $$(i,j)\in\Omega$$ 否则 $$0$$，问题为 $$\begin{equation}
  \min_{X,Y}\ \left\Vert P\odot(XY-M)\right\Vert_F^2\ \ \text{s.t.}\ \ X_{ij}\ge0,\ Y_{ij}\ge0
  \qquad\text{（非凸）}.
\end{equation}$$ 等价形式： $$\begin{equation}
  \min_{U,V,X,Y,Z}\ \frac12\left\Vert XY-Z\right\Vert_F^2
  \ \text{s.t.}\ X=U,\ Y=V,\ U\ge0,\ V\ge0,\ P\odot(Z-M)=0,
\end{equation}$$ 对 $$X=U$$、$$Y=V$$ 分别引入乘子 $$\Lambda,\Pi$$，非负约束与观测约束放入 约束集，增广拉格朗日函数： $$\begin{equation}
  L_{\alpha,\beta}(X,Y,Z,U,V,\Lambda,\Pi)
  =\frac12\left\Vert XY-Z\right\Vert_F^2+\left\langle \Lambda,\,\ X-U\right\rangle+\left\langle \Pi,\,\ Y-V\right\rangle
  +\frac{\alpha}{2}\left\Vert X-U\right\Vert_F^2+\frac{\beta}{2}\left\Vert Y-V\right\Vert_F^2.
\end{equation}$$ ADMM 迭代为（依次更新 $$X,Y,Z,U,V$$ 与乘子）： $$\begin{equation}
  \begin{aligned}
    X^{k+1}&=\operatorname*{arg\,min}_X\ L_{\alpha,\beta}(X,Y^k,Z^k,U^k,V^k,\Lambda^k,\Pi^k),\\
    Y^{k+1}&=\operatorname*{arg\,min}_Y\ L_{\alpha,\beta}(X^{k+1},Y,Z^k,U^k,V^k,\Lambda^k,\Pi^k),\\
    Z^{k+1}&=\operatorname*{arg\,min}_{P\odot(Z-M)=0}\ L_{\alpha,\beta}(X^{k+1},Y^{k+1},Z,U^k,V^k,\Lambda^k,\Pi^k),\\
    U^{k+1}&=\operatorname*{arg\,min}_{U\ge0}\ L_{\alpha,\beta}(X^{k+1},Y^{k+1},Z^{k+1},U,V^k,\Lambda^k,\Pi^k),\\
    V^{k+1}&=\operatorname*{arg\,min}_{V\ge0}\ L_{\alpha,\beta}(X^{k+1},Y^{k+1},Z^{k+1},U^{k+1},V,\Lambda^k,\Pi^k),\\
    \Lambda^{k+1}&=\Lambda^k+\tau\alpha(X^{k+1}-U^{k+1}),
    \qquad
    \Pi^{k+1}=\Pi^k+\tau\beta(Y^{k+1}-V^{k+1}).
  \end{aligned}
\end{equation}$$ 子问题的解： $$\begin{align}
  &X^{k+1}=\bigl(Z^k(Y^k)^\top+\alpha U^k-\Lambda^k\bigr)
  \bigl(Y^k(Y^k)^\top+\alpha I\bigr)^{-1},\\
  &Y^{k+1}=\bigl((X^{k+1})^\top X^{k+1}+\beta I\bigr)^{-1}
  \bigl((X^{k+1})^\top Z^k+\beta V^k-\Pi^k\bigr),
\end{align}$$ $$Z^{k+1}=X^{k+1}Y^{k+1}+P\odot\bigl(M-X^{k+1}Y^{k+1}\bigr)$$ （满足观测约束的修正），$$U^{k+1}=\max\lbrace0,\cdot\rbrace$$、 $$V^{k+1}=\max\lbrace0,\cdot\rbrace$$（非负投影）------该例展示了\"多块拆分 $$+$$ 投影 子问题\"处理非凸问题的完整流程；注意此多块非凸 ADMM 无一般收敛保证 （§8.6.5），实际中常用（与 §8.4 的 BCD 类方法互为替代）．

### 收敛性分析

<div class="supp">

讨论 ADMM（§8.6.1 迭代 (8.326)）在问题 (8.322) 上的收敛性．

</div>

**（）**   (1) $$f_1,f_2$$ 均为闭凸函数，且每个 ADMM 迭代子问题存在唯一解； (2) 原始问题 (8.322) 的解集非空，且 Slater 条件满足．

$$f_1,f_2$$ 的凸性保证问题是凸问题；子问题存在唯一解保证迭代良定义； Slater 条件下原始问题的 KKT 对与最优解对应，可方便地使用 KKT 条件 讨论收敛性．设 $$(x_1^*,x_2^*,y^*)$$ 为 KKT 对： $$\begin{equation}
  -A_1^\top y^*\in\partial f_1(x_1^*),
  \qquad
  -A_2^\top y^*\in\partial f_2(x_2^*),
  \qquad
  A_1x_1^*+A_2x_2^*=b,
\end{equation}$$ 引入当前迭代点与 KKT 对的误差记号 $$\begin{equation}
  (e_1^k,\ e_2^k,\ e_y^k)\coloneqq(x_1^k,\ x_2^k,\ y^k)
  -(x_1^*,\ x_2^*,\ y^*),
\end{equation}$$ 以及辅助变量 $$\begin{align}
  u^k&=-A_1^\top\Bigl[y^k+(1-\tau)\rho(A_1e_1^k+A_2e_2^k)
  +\rho A_2\bigl(x_2^{k-1}-x_2^k\bigr)\Bigr],
  \\
  v^k&=-A_2^\top\Bigl[y^k+(1-\tau)\rho(A_1e_1^k+A_2e_2^k)\Bigr],
  \\
  \Psi^k&=\frac{1}{\tau\rho}\left\Vert e_y^k\right\Vert^2+\rho\left\Vert A_2e_2^k\right\Vert^2,
  \\
  \Phi^k&=\Psi^k+\max\bigl(1-\tau,\ 1-\tau-\tfrac1\tau\bigr)
  \rho\left\Vert A_1e_1^k+A_2e_2^k\right\Vert^2.
\end{align}$$ $$u^k,v^k$$ 与每个子问题的最优性条件相关，$$\Psi^k,\Phi^k$$ 是误差向量 $$e_1^k,e_2^k,e_y^k$$ 的某种度量．

<div class="lemma">

**引理 8.6** 假设 $$\lbrace(x_1^k,x_2^k,y^k)\rbrace$$ 为 ADMM 产生的迭代序列，则对任意 $$k\ge1$$： $$\begin{align}
  &u^k\in\partial f_1(x_1^k),
  \qquad
  v^k\in\partial f_2(x_2^k),
  \\
  &\Phi^k-\Phi^{k+1}\ge
  \min(\tau,\ 1+\tau-\tau^2)\rho\left\Vert A_2(x_2^k-x_2^{k+1})\right\Vert^2\\
  &\qquad\qquad\qquad
  +\min(1,\ 1+\tau^{-1}-\tau)\rho\left\Vert A_1e_1^{k+1}+A_2e_2^{k+1}\right\Vert^2.
\end{align}$$

</div>

**Proof** **（）** 先证 (8.411)．由 $$x_1^{k+1}$$ 的最优性条件： $$\begin{equation}
  0\in\partial f_1(x_1^{k+1})+A_1^\top y^k
  +\rho A_1^\top(A_1x_1^{k+1}+A_2x_2^k-b).
\end{equation}$$ 将 $$y^k=y^{k+1}-\tau\rho(A_1x_1^{k+1}+A_2x_2^{k+1}-b)$$ 代入消去 $$y^k$$： $$\begin{equation}
  -A_1^\top\Bigl[y^{k+1}+(1-\tau)\rho(A_1x_1^{k+1}+A_2x_2^{k+1}-b)
  +\rho A_2(x_2^k-x_2^{k+1})\Bigr]\in\partial f_1(x_1^{k+1}),
\end{equation}$$ 根据 $$u^k$$ 的定义（代回 $$b=A_1x_1^*+A_2x_2^*$$）自然有 $$u^k\in\partial f_1(x_1^k)$$（指标平移）．类似地由 $$x_2^{k+1}$$ 的最优性 条件可得 $$\begin{equation}
  -A_2^\top\Bigl[y^{k+1}+(1-\tau)\rho(A_1x_1^{k+1}+A_2x_2^{k+1}-b)\Bigr]
  \in\partial f_2(x_2^{k+1}),
\end{equation}$$ 即 $$v^k\in\partial f_2(x_2^k)$$．

再证 (8.412)．由 KKT 对的最优性条件与 (8.411)： $$\begin{equation}
  u^{k+1}\in\partial f_1(x_1^{k+1}),\quad
  -A_1^\top y^*\in\partial f_1(x_1^*),\quad
  v^{k+1}\in\partial f_2(x_2^{k+1}),\quad
  -A_2^\top y^*\in\partial f_2(x_2^*),
\end{equation}$$ 由凸函数次梯度的单调性： $$\begin{equation}
  \left\langle u^{k+1}+A_1^\top y^*,\,x_1^{k+1}-x_1^*\right\rangle\ge0,
  \qquad
  \left\langle v^{k+1}+A_2^\top y^*,\,x_2^{k+1}-x_2^*\right\rangle\ge0.
\end{equation}$$ 两式相加，结合 $$u^{k+1},v^{k+1}$$ 的定义与恒等式 $$\begin{equation}
  A_1x_1^{k+1}+A_2x_2^{k+1}-b=\frac{1}{\tau\rho}(y^{k+1}-y^k)
  =\frac{1}{\tau\rho}(e_y^{k+1}-e_y^k),
\end{equation}$$ 得到 $$\begin{align}
  &\frac{1}{\tau\rho}\left\langle e_y^{k+1},\,e_y^k-e_y^{k+1}\right\rangle
  -(1-\tau)\rho\left\Vert A_1x_1^{k+1}+A_2x_2^{k+1}-b\right\Vert^2\\
  &\qquad+\rho\left\langle A_2(x_2^{k+1}-x_2^k),\,A_1x_1^{k+1}+A_2x_2^{k+1}-b\right\rangle
  -\rho\left\langle A_2(x_2^{k+1}-x_2^k),\,A_2e_2^{k+1}\right\rangle\ge0.
\end{align}$$ 还需估计 (8.419) 中交叉项 $$\rho\left\langle A_2(x_2^{k+1}-x_2^k),\,A_1x_1^{k+1}+A_2x_2^{k+1}-b\right\rangle$$ 的上界． 引入 $$\nu^{k+1}=y^{k+1}+(1-\tau)\rho(A_1x_1^{k+1}+A_2x_2^{k+1}-b)$$ 与 $$M^{k+1}=(1-\tau)\rho\left\langle A_2(x_2^{k+1}-x_2^k),\,A_1x_1^k+A_2x_2^k-b\right\rangle$$， 则 $$-A_2^\top\nu^{k+1}\in\partial f_2(x_2^{k+1})$$， $$-A_2^\top\nu^k\in\partial f_2(x_2^k)$$，由单调性 $$\left\langle -A_2^\top(\nu^{k+1}-\nu^k),\,x_2^{k+1}-x_2^k\right\rangle\ge0$$，从而 $$\begin{equation}
  \rho\left\langle A_2(x_2^{k+1}-x_2^k),\,A_1x_1^{k+1}+A_2x_2^{k+1}-b\right\rangle
  =M^{k+1}+\left\langle \nu^{k+1}-\nu^k,\,A_2(x_2^{k+1}-x_2^k)\right\rangle
  \le M^{k+1}
\end{equation}$$ （第一个等号用了恒等式 (8.418) 与 $$\nu$$ 的定义， 最后的不等式直接应用单调性关系．）代回 (8.419) 并 用内积恒等式 $$\left\langle a,\,b\right\rangle=\frac12(\left\Vert a+b\right\Vert^2-\left\Vert a\right\Vert^2-\left\Vert b\right\Vert^2)$$ 进一步整理： $$\begin{align}
  &\frac{1}{\tau\rho}\bigl(\left\Vert e_y^k\right\Vert^2-\left\Vert e_y^{k+1}\right\Vert^2\bigr)
  -(2-\tau)\rho\left\Vert A_1x_1^{k+1}+A_2x_2^{k+1}-b\right\Vert^2\\
  &\qquad+2M^{k+1}
  -\rho\left\Vert A_2(x_2^{k+1}-x_2^k)\right\Vert^2
  -\rho\left\Vert A_2e_2^{k+1}\right\Vert^2
  +\rho\left\Vert A_2e_2^k\right\Vert^2\ge0.
\end{align}$$ 除 $$M^{k+1}$$ 外其余项均出现在 (8.412) 中； $$M^{k+1}$$ 的符号与 $$\tau$$ 有关，分两种情况：

*情形一*：$$\tau\in(0,1]$$，此时 $$M^{k+1}\ge0$$，由基本不等式 $$\begin{equation}
  2\left\langle A_2(x_2^{k+1}-x_2^k),\,A_1x_1^k+A_2x_2^k-b\right\rangle
  \le\left\Vert A_2(x_2^{k+1}-x_2^k)\right\Vert^2+\left\Vert A_1x_1^k+A_2x_2^k-b\right\Vert^2,
\end{equation}$$ 代入 (8.421) 得 $$\begin{equation}
  \begin{aligned}
    &\frac{1}{\tau\rho}\left\Vert e_y^k\right\Vert^2+\rho\left\Vert A_2e_2^k\right\Vert^2
    +(1-\tau)\rho\left\Vert A_1e_1^k+A_2e_2^k\right\Vert^2\\
    &\qquad-\Bigl[\frac{1}{\tau\rho}\left\Vert e_y^{k+1}\right\Vert^2
    +\rho\left\Vert A_2e_2^{k+1}\right\Vert^2
    +(1-\tau)\rho\left\Vert A_1e_1^{k+1}+A_2e_2^{k+1}\right\Vert^2\Bigr]\\
    &\quad\ge\rho\left\Vert A_1x_1^{k+1}+A_2x_2^{k+1}-b\right\Vert^2
    +\tau\rho\left\Vert A_2(x_2^{k+1}-x_2^k)\right\Vert^2.
  \end{aligned}
\end{equation}$$

*情形二*：$$\tau>1$$，此时 $$M^{k+1}<0$$，由基本不等式 $$\begin{equation}
  -2\left\langle A_2(x_2^{k+1}-x_2^k),\,A_1x_1^k+A_2x_2^k-b\right\rangle
  \le\tau\left\Vert A_2(x_2^{k+1}-x_2^k)\right\Vert^2
  +\frac1\tau\left\Vert A_1x_1^k+A_2x_2^k-b\right\Vert^2,
\end{equation}$$ 代入 (8.421) 得 $$\begin{equation}
  \begin{aligned}
    &\frac{1}{\tau\rho}\left\Vert e_y^k\right\Vert^2+\rho\left\Vert A_2e_2^k\right\Vert^2
    +\Bigl(1-\frac1\tau\Bigr)\rho\left\Vert A_1e_1^k+A_2e_2^k\right\Vert^2\\
    &\qquad-\Bigl[\frac{1}{\tau\rho}\left\Vert e_y^{k+1}\right\Vert^2
    +\rho\left\Vert A_2e_2^{k+1}\right\Vert^2
    +\Bigl(1-\frac1\tau\Bigr)\rho\left\Vert A_1e_1^{k+1}+A_2e_2^{k+1}\right\Vert^2\Bigr]\\
    &\quad\ge\Bigl(1+\frac1\tau-\tau\Bigr)\rho
    \left\Vert A_1x_1^{k+1}+A_2x_2^{k+1}-b\right\Vert^2
    +(1+\tau-\tau^2)\rho\left\Vert A_2(x_2^{k+1}-x_2^k)\right\Vert^2.
  \end{aligned}
\end{equation}$$ 整合 (8.423)(8.425) 即得 (8.412)．注意只有当 $$\tau\in\bigl(0,\frac{1+\sqrt5}{2}\bigr]$$ 时， (8.412) 右端的系数才非负------这正是 ADMM 步长通常取值于 $$\bigl(0,\frac{1+\sqrt5}{2}\bigr]$$ 的原因（§8.6.1）．

直观解释**（直观解释）** (8.411) 直接利用了每个子问题的最优性条件与 KKT 条件；(8.412) 的证明较复杂（是相关文献 定理 B.1 的简化版本），其直观解释是：迭代点误差的某种度量 $$\Phi^k$$ 是*单调有界*的．

<div class="theorem">

**定理 8.17** 在假设 8.8.5 的条件下，进一步假定 $$A_1,A_2$$ 列满秩．如果 $$\tau\in\bigl(0,\frac{1+\sqrt5}{2}\bigr]$$，则序列 $$\lbrace(x_1^k,x_2^k,y^k)\rbrace$$ 收敛到原始问题的一个 KKT 对．

</div>

**Proof** **（）** 引理 8.6 表明 $$\lbrace\Phi^k\rbrace$$ 是有界下降列，由 $$\Phi^k$$ 的定义 (8.410) 可知 $$\begin{equation}
  \left\Vert e_y^k\right\Vert,\quad \left\Vert A_2e_2^k\right\Vert,\quad
  \left\Vert A_1e_1^k+A_2e_2^k\right\Vert
\end{equation}$$ 均有界；由 $$\left\Vert A_1e_1^k\right\Vert\le\left\Vert A_1e_1^k+A_2e_2^k\right\Vert
+\left\Vert A_2e_2^k\right\Vert$$ 进一步知 $$\lbrace\left\Vert A_1e_1^k\right\Vert\rbrace$$ 有界．注意到 $$A_1^\top A_1\succ0$$，$$A_2^\top A_2\succ0$$（列满秩），以上有界性等价于 $$\lbrace(x_1^k,x_2^k,y^k)\rbrace$$ 是有界序列．

由引理 8.6 的 (8.412) 累加知无穷级数 $$\begin{equation}
  \sum_{k=0}^{\infty}\left\Vert A_1e_1^k+A_2e_2^k\right\Vert^2,
  \qquad
  \sum_{k=0}^{\infty}\left\Vert A_2(x_2^{k+1}-x_2^k)\right\Vert^2
\end{equation}$$ 都收敛，这表明 $$\begin{equation}
  \left\Vert A_1e_1^k+A_2e_2^k\right\Vert=\left\Vert A_1x_1^k+A_2x_2^k-b\right\Vert\to0,
  \qquad
  \left\Vert A_2(x_2^{k+1}-x_2^k)\right\Vert\to0.
\end{equation}$$

*子列收敛*：$$\lbrace(x_1^k,x_2^k,y^k)\rbrace$$ 有界，故存在收敛子列 $$(x_1^{k_j},x_2^{k_j},y^{k_j})\to(x_1^\infty,x_2^\infty,y^\infty)$$．由 $$u^k,v^k$$ 的定义与 (8.428) 可知 $$\lbraceu^k\rbrace,\lbracev^k\rbrace$$ 的相应子列也收敛： $$\begin{equation}
  u^\infty\coloneqq\lim_{j\to\infty}u^{k_j}=-A_1^\top y^\infty,
  \qquad
  v^\infty=\lim_{j\to\infty}v^{k_j}=-A_2^\top y^\infty.
\end{equation}$$ 由 $$u^k\in\partial f_1(x_1^k)$$，$$v^k\in\partial f_2(x_2^k)$$ 与次梯度 映射图像的闭性（第二章定理 2.19）可知 $$\begin{equation}
  -A_1^\top y^\infty\in\partial f_1(x_1^\infty),
  \qquad
  -A_2^\top y^\infty\in\partial f_2(x_2^\infty);
\end{equation}$$ 又由 (8.428) 的第一式： $$\begin{equation}
  \lim_{j\to\infty}\left\Vert A_1x_1^{k_j}+A_2x_2^{k_j}-b\right\Vert
  =\left\Vert A_1x_1^\infty+A_2x_2^\infty-b\right\Vert=0.
\end{equation}$$ 这表明 $$(x_1^\infty,x_2^\infty,y^\infty)$$ 是原始问题的一个 KKT 对， 因此分析中的 $$(x_1^*,x_2^*,y^*)$$ 均可替换为 $$(x_1^\infty,x_2^\infty,y^\infty)$$．

*全序列收敛*：$$\Phi^k$$ 单调下降，且对子列 $$\lbrace\Phi^{k_j}\rbrace$$ 有 $$\begin{equation}
  \lim_{j\to\infty}\Phi^{k_j}
  =\lim_{j\to\infty}\Bigl[\frac{1}{\tau\rho}\left\Vert e_y^{k_j}\right\Vert^2
  +\rho\left\Vert A_2e_2^{k_j}\right\Vert^2
  +\max\Bigl\lbrace1-\tau,\ 1-\frac1\tau\Bigr\rbrace\rho
  \left\Vert A_1e_1^{k_j}+A_2e_2^{k_j}\right\Vert^2\Bigr]=0.
\end{equation}$$ 由于单调序列的子列收敛等价于全序列收敛，故 $$\lim_k\Phi^k=0$$，从而 $$\begin{equation}
  0\le\limsup_{k\to\infty}\frac{1}{\tau\rho}\left\Vert e_y^k\right\Vert^2
  \le\limsup_{k\to\infty}\Phi^k=0,
\end{equation}$$ 类似地 $$\rho\left\Vert A_2e_2^k\right\Vert^2\to0$$、 $$\max\lbrace1-\tau,1-\tau^{-1}\rbrace\rho\left\Vert A_1e_1^k+A_2e_2^k\right\Vert^2\to0$$，即 $$\begin{equation}
  \left\Vert e_y^k\right\Vert\to0,\qquad
  \left\Vert A_2e_2^k\right\Vert\to0,\qquad
  \left\Vert A_1e_1^k+A_2e_2^k\right\Vert\to0,
\end{equation}$$ 进一步 $$\begin{equation}
  0\le\limsup_{k\to\infty}\left\Vert A_1e_1^k\right\Vert
  \le\lim_{k\to\infty}\bigl(\left\Vert A_2e_2^k\right\Vert
  +\left\Vert A_1e_1^k+A_2e_2^k\right\Vert\bigr)=0.
\end{equation}$$ 注意到 $$A_1^\top A_1\succ0$$，$$A_2^\top A_2\succ0$$，最终得到全序列 收敛：$$(x_1^k,x_2^k,y^k)\to(x_1^\infty,x_2^\infty,y^\infty)$$------即 ADMM 收敛到原始问题的一个 KKT 对．

<div class="example">

**例题 8.26** 多块（三块）ADMM 可能发散．考虑 $$A=[A_1,A_2,A_3]$$（$$A_i$$ 均为 $$m\times m$$ 方阵）且 $$A_i$$ 可逆的退化情形（如 $$A_i=I$$）：由子问题 $$x_i$$-更新（目标为 $$\frac{\left\Vert A_i\right\Vert_2^2}{2}\left\Vert x_i\right\Vert^2$$ 型二次函数 $$+$$ 线性项）可得显式迭代： $$\begin{equation}
  \begin{aligned}
    x_1^{k+1}&=-\frac{1}{\left\Vert A_1\right\Vert_2^2}A_1^\top
    \Bigl(\frac{y^k}{\rho}+A_2x_2^k+A_3x_3^k\Bigr),\\
    x_2^{k+1}&=-\frac{1}{\left\Vert A_2\right\Vert_2^2}A_2^\top
    \Bigl(\frac{y^k}{\rho}+A_1x_1^{k+1}+A_3x_3^k\Bigr),\\
    x_3^{k+1}&=-\frac{1}{\left\Vert A_3\right\Vert_2^2}A_3^\top
    \Bigl(\frac{y^k}{\rho}+A_1x_1^{k+1}+A_2x_2^{k+1}\Bigr),\\
    y^{k+1}&=y^k+\rho\bigl(A_1x_1^{k+1}+A_2x_2^{k+1}
    +A_3x_3^{k+1}\bigr).
  \end{aligned}
\end{equation}$$ 对此问题罚因子取不同值仅是将乘子 $$y^k$$ 缩放常数倍，罚因子的任意取法 （包括动态调节）都等价（数值实验不妨取 $$\rho=1$$）．迭代格式 (8.436) 的收敛性与 $$A_i$$ 的选取有关：取 $$\begin{equation}
  \tilde A=
  \begin{pmatrix}1&1&1\\ 1&\frac12&\frac12\\ 1&\frac12&2\end{pmatrix}
  \qquad\text{或}\qquad
  \hat A=
  \begin{pmatrix}1&\frac12&0\\ 1&1&0\\ 0&0&1\end{pmatrix},
\end{equation}$$ 自变量初值 $$(1,1,1)$$、乘子初值 $$(0,0,0)$$：数值结果（讲义图 8.10）表明 $$A=\tilde A$$ 时迭代*发散*，$$A=\hat A$$ 时迭代*收敛*；且 $$\left\Vert x\right\Vert$$ 与 $$\left\Vert y\right\Vert$$ 并非单调下降而是有规律地振荡下降．文献中具体 解释了 $$A$$ 取 $$\tilde A$$ 导致发散的原因．------这说明多块 ADMM（及非凸 ADMM）没有一般收敛保证，两块凸 ADMM（定理 8.17） 才是有理论保证的版本．

</div>

## 随机优化算法

随着大数据时代的来临与机器学习、深度学习的发展，许多大规模优化问题 对传统优化理论和算法产生了巨大挑战；这些问题往往与概率和统计学科联系 紧密，由此促成了**随机优化算法**的广泛使用（思想可追溯到 Monro--Robbins 算法）．相比传统优化算法，随机算法极大地节省每步迭代的 运算量，使算法在大规模数据中可行．本节介绍随机梯度算法的基本形式、 收敛性理论，以及深度学习中广泛应用的随机梯度型算法．

### 问题形式与随机梯度下降算法

##### 监督学习模型

假定 $$(a,b)$$ 服从概率分布 $$P$$（$$a$$ 为输入、$$b$$ 为标签），任务是决定 预测函数 $$\varphi$$ 使期望风险 $$\mathbb{E}[L(\varphi(a),b)]$$ 最小．实际问题中 $$P$$ 未知，只有采样数据集 $$D=\lbrace(a^1,b^1),\dots,(a^N,b^N)\rbrace$$；用*经验风险*近似期望风险并把 $$\varphi$$ 参数化为 $$\varphi(\cdot;x)$$： $$\begin{equation}
  \min_x\ \frac1N\sum_{i=1}^{N}L\bigl(\varphi(a^i;x),\ b^i\bigr).
\end{equation}$$ 对应 §4.4 的随机优化问题：$$\xi^i=(a^i,b^i)$$， $$f^i(x)=L(\varphi(a^i;x),b^i)$$，$$h=0$$．本节主要考虑 **有限和形式**： $$\begin{equation}
  \min_{x\in\mathbb{R}^n}\ f(x)\coloneqq\frac1N\sum_{i=1}^{N}f^i(x),
\end{equation}$$ 其中 $$f^i$$ 对应第 $$i$$ 个样本的损失函数．

##### 随机梯度下降（SGD）

先假设每个 $$f^i$$ 凸且可微，可用梯度下降 $$x^{k+1}=x^k-\alpha^k\nabla f(x^k)$$；但 $$\nabla f(x^k)=\frac1N
\sum_{i=1}^{N}\nabla f^i(x^k)$$ 需要计算全部 $$N$$ 个样本的梯度，样本量 巨大时计算量非常大．**随机梯度下降算法**（SGD）的基本迭代格式为 $$\begin{equation}
  x^{k+1}=x^k-\alpha^k\nabla f_{s^k}(x^k),
\end{equation}$$ 其中 $$s^k$$ 是从 $$\lbrace1,2,\dots,N\rbrace$$ 中*随机等可能*抽取的样本，$$\alpha^k$$ 称为步长（机器学习中更多时候称*学习率* learning rate）．注意 (8.440) 中不含系数 $$\frac1N$$------这是为了保证随机梯度的条件 期望恰好是全梯度： $$\begin{equation}
  \mathbb{E}_{s^k}\bigl[\nabla f_{s^k}(x^k)\mid x^k\bigr]=\nabla f(x^k),
\end{equation}$$ （使用条件期望符号是因为迭代点 $$x^k$$ 本身也是随机变量．）实际计算中 每次只抽一个样本比较极端，常用**小批量**（mini-batch）形式：随机 选元素个数很少的集合 $$I^k\subset\lbrace1,\dots,N\rbrace$$，执行 $$x^{k+1}=x^k-\frac{\alpha^k}{\left\vert I^k\right\vert}\sum_{s\in I^k}\nabla f^s(x^k)$$； 后面只考虑最简单的 (8.440)，但很多变形和分析都可推广到 mini-batch．SGD 单步梯度计算的复杂度降为原来的 $$\frac1N$$，代价是引入 了随机性------收敛性（何种意义下收敛）将在 §8.7.3 回答．当 $$f^i$$ 凸但 不一定可微时，用次梯度代替梯度即**随机次梯度算法**： $$\begin{equation}
  x^{k+1}=x^k-\alpha^kg^k,
  \qquad
  g^k\in\partial f_{s^k}(x^k)\ \text{（期望为真实次梯度）}.
\end{equation}$$

### 深度学习中的变形

##### 1. 动量方法（momentum）

传统梯度法在问题病态时收敛很慢，SGD 也有类似问题；**动量方法** 在迭代时一定程度上*保留之前更新的方向*，同时利用当前梯度调整最终 更新方向，增加稳定性、加快学习并有一定摆脱局部最优的能力．引入速度 变量 $$v$$（代表参数移动的方向和大小）： $$\begin{align}
  v^{k+1}&=\mu^kv^k-\alpha^k\nabla f_{s^k}(x^k),
  \\
  x^{k+1}&=x^k+v^{k+1}.
\end{align}$$ $$\mu^k=0$$ 时退化为 SGD；$$\mu^k\in[0,1)$$，通常取 $$\mu^k\ge0.5$$（迭代点 带较大惯性，每次在原方向基础上做小的修正）．连续多步梯度指向相同方向 时步长会很大．数值实验（讲义图 8.11，§6.2 例 6.2 的问题）：普通梯度 法在椭圆短轴方向来回移动，动量方法更快收敛到最小值点．

##### 2. Nesterov 加速算法的随机版本

光滑问题 Nesterov 加速算法的随机版本： $$\begin{align}
  y^{k+1}&=x^k+\mu^k(x^k-x^{k-1}),
  \\
  x^{k+1}&=y^{k+1}-\alpha^k\nabla f_{s^k}(y^{k+1}),
\end{align}$$ 其中 $$\mu^k=\frac{k-1}{k+2}$$，$$\alpha^k$$ 为固定值或由线搜索确定．引入 速度变量 $$v^k=x^k-x^{k-1}$$，合并两步得 $$x^{k+1}=x^k+\mu^kv^k-\alpha^k\nabla f\bigl(x^k+\mu^kv^k\bigr)$$，等价 迭代为 $$\begin{align}
  v^{k+1}&=\mu^kv^k-\alpha^k\nabla f_{s^k}\bigl(x^k+\mu^kv^k\bigr),
  \\
  x^{k+1}&=x^k+v^{k+1}.
\end{align}$$ 与动量方法的主要差别在*梯度的计算位置*：Nesterov 加速先对点施加 速度的作用、再求梯度------可理解为对标准动量方法做了一个校正．

##### 3. AdaGrad

随机梯度法调参困难，希望算法能*自适应*地调整参数（AdaGrad = adaptive subgradient methods 的出发点）．$$x$$ 是解等价于梯度为零，但 梯度各分量收敛到零的速度不同：梯度某分量较大说明该方向函数变化剧烈、 应用小步长；某分量较小则该方向平缓、应用大步长．令 $$g^k=\nabla f_{s^k}(x^k)$$，为记录梯度各分量的累积情况引入 $$\begin{equation}
  G^k=\sum_{i=1}^{k}g^i\odot g^i
\end{equation}$$ （$$G^k$$ 的每个分量是梯度在该分量处的累积平方和），AdaGrad 的迭代 格式为 $$\begin{align}
  x^{k+1}&=x^k-\frac{\alpha}{\sqrt{G^k+\varepsilon\mathbf{1}}}\odot g^k,
  \\
  G^{k+1}&=G^k+g^{k+1}\odot g^{k+1},
\end{align}$$ （除法与开方逐分量进行；$$\varepsilon\mathbf{1}$$ 防止除零．）步长反比于历史 梯度累计值的平方根：梯度大的方向步长下降快、反之慢------参数空间平缓的 方向上前两次迭代的距离较大．AdaGrad 在凸优化问题上有较好的理论性质， 但训练深度神经网络时从训练开始就积累梯度平方会导致步长*过早或 过多减小*．

<div class="supp">

若在 AdaGrad 中使用真实梯度 $$\nabla f(x^k)$$，它可以看成一种*介于 一阶和二阶之间*的算法：$$f$$ 在 $$x^k$$ 处的二阶泰勒展开 $$f(x)\approx f(x^k)+\nabla f(x^k)^\top(x-x^k)+\frac12(x-x^k)^\top
B^k(x-x^k)$$ 中，取 $$B^k$$ 为常数倍单位阵得梯度法、取海瑟矩阵得牛顿法； AdaGrad 相当于取对角矩阵 $$\begin{equation}
  B^k=\frac1\alpha\operatorname{Diag}\bigl(\sqrt{G^k+\varepsilon\mathbf{1}}\bigr).
\end{equation}$$

</div>

##### 4. RMSProp

RMSProp（root mean square propagation）是 AdaGrad 的改进：AdaGrad 累加*所有*历史梯度分量平方导致步长单调递减、训练后期步长过小且 计算开销大；RMSProp 只使用离当前迭代点较近的项，引入**衰减参数** $$\rho$$： $$\begin{equation}
  M^{k+1}=\rho M^k+(1-\rho)\,g^{k+1}\odot g^{k+1},
  \qquad
  R^k=\sqrt{M^k+\varepsilon\mathbf{1}}
  \quad\text{（均方根 root mean square）},
\end{equation}$$ 迭代格式： $$\begin{equation}
  x^{k+1}=x^k-\frac{\alpha}{R^k}\odot g^k.
\end{equation}$$ RMSProp 与 AdaGrad 的唯一区别是把 $$G^k$$ 换成了指数加权平均的 $$M^k$$； 一般取 $$\rho=0.9$$，$$\alpha=0.001$$．

##### 5. AdaDelta

AdaDelta 在 RMSProp 的基础上对历史的 $$\Delta x^k$$ 也累积平方求均方根： $$\begin{equation}
  D^k=\rho D^{k-1}+(1-\rho)\,\Delta x^k\odot\Delta x^k,
  \qquad
  T^k=\sqrt{D^k+\varepsilon\mathbf{1}},
\end{equation}$$ 然后使用 $$\frac{T^{k-1}}{R^k}$$ 的商对梯度进行校正：

<div class="algorithm">

**算法 32**

**输入**：$$x^1$$，$$\rho$$，$$\varepsilon$$；置初值 $$M^0=0$$，$$D^0=0$$．

<div class="algorithmic">

随机选取 $$i\in\lbrace1,\dots,N\rbrace$$，计算梯度 $$g^k=\nabla f^i(x^k)$$； 计算 $$M^k=\rho M^{k-1}+(1-\rho)\,g^k\odot g^k$$； 计算 $$\Delta x^k=-\frac{T^{k-1}}{R^k}\odot g^k$$； 计算 $$D^k=\rho D^{k-1}+(1-\rho)\,\Delta x^k\odot\Delta x^k$$； $$x^{k+1}\leftarrow x^k+\Delta x^k$$；

</div>

</div>

注意步长计算中 $$T$$ 与 $$R$$ 的下标相差 $$1$$------因为尚未算出 $$\Delta x^k$$， 无法使用 $$T^k$$．AdaDelta 步长选择保守，改善了 AdaGrad 步长单调下降的 缺陷．

##### 6. Adam

Adam（adaptive moment estimation）本质上是*带动量项的 RMSProp*， 利用梯度的一阶矩估计和二阶矩估计动态调整每个参数的步长；RMSProp 虽有 二阶矩估计但缺少修正因子，训练初期可能有较大偏差；Adam 经过*偏差 修正*后每次迭代的步长有确定范围，参数较平稳： $$\begin{align}
  S^k&=\rho_1S^{k-1}+(1-\rho_1)g^k
  \qquad\text{（一阶矩，动量项）},\\
  M^k&=\rho_2M^{k-1}+(1-\rho_2)\,g^k\odot g^k
  \qquad\text{（二阶矩）},
\end{align}$$ 修正偏差（$$\rho_1^k,\rho_2^k$$ 分别表示 $$\rho_1,\rho_2$$ 的 $$k$$ 次方）： $$\begin{equation}
  \hat S^k=\frac{S^k}{1-\rho_1^k},
  \qquad
  \hat M^k=\frac{M^k}{1-\rho_2^k},
\end{equation}$$ 最终更新： $$\begin{equation}
  x^{k+1}=x^k-\frac{\alpha}{\sqrt{\hat M^k}+\varepsilon\mathbf{1}}\odot\hat S^k.
\end{equation}$$

<div class="algorithm">

**算法 33**

**输入**：步长 $$\alpha$$，衰减速率 $$\rho_1,\rho_2$$，$$x^1$$；置 $$S^0=0$$，$$M^0=0$$．

<div class="algorithmic">

随机选取 $$i$$，计算梯度 $$g^k=\nabla f^i(x^k)$$； 更新一阶矩估计：$$S^k=\rho_1S^{k-1}+(1-\rho_1)g^k$$； 更新二阶矩估计：$$M^k=\rho_2M^{k-1}+(1-\rho_2)\,g^k\odot g^k$$； 修正偏差：$$\hat S^k=\frac{S^k}{1-\rho_1^k}$$， $$\hat M^k=\frac{M^k}{1-\rho_2^k}$$； $$x^{k+1}=x^k-\frac{\alpha}{\sqrt{\hat M^k}
         +\varepsilon\mathbf{1}}\odot\hat S^k$$；

</div>

</div>

参数通常取 $$\rho_1=0.9$$，$$\rho_2=0.999$$，$$\alpha=0.001$$．上述算法大多 已实现在主流深度学习框架中（PyTorch：AdaDelta、AdaGrad、Adam、 Nesterov、RMSProp 等；TensorFlow：AdaDelta、AdaGradDA、AdaGrad、 ProximalAdagrad、Ftrl、Momentum、Adam、CenteredRMSProp 等）．

### 应用举例

##### 1. 逻辑回归

带 $$\ell_2$$ 范数平方正则项的逻辑回归（最基本的线性分类模型，常作为 分类模型的比较标准）对应的优化问题 (8.439)： $$\begin{equation}
  \min_{x\in\mathbb{R}^n}\ f(x)=\frac1N\sum_{i=1}^{N}
  \ln\bigl(1+\exp(-b_i\cdot a_i^\top x)\bigr)+\lambda\left\Vert x\right\Vert_2^2,
  \qquad
  f^i(x)=\ln\bigl(1+\exp(-b_i\cdot a_i^\top x)\bigr)+\lambda\left\Vert x\right\Vert_2^2.
\end{equation}$$ 每步随机取下标 $$i^k$$ 做 SGD： $$\begin{equation}
  x^{k+1}=x^k-\alpha^k\nabla f_{i^k}(x^k)
  =x^k-\alpha^k\Bigl(\frac{-\exp(-b_{i^k}\cdot a_{i^k}^\top x^k)b_{i^k}
  a_{i^k}}{1+\exp(-b_{i^k}\cdot a_{i^k}^\top x^k)}
  +2\lambda x^k\Bigr).
\end{equation}$$ 数值实验（与 §6.4 相同，LIBSVM 数据集 CINA 与 a9a，$$\lambda=\frac{10^{-2}}{N}$$， 网格搜索确定参数、每组参数重复 5 次取平均）：SGD 步长 $$\alpha^k=10^{-3}$$ 最好；动量方法 $$\mu^k=0.8,\alpha^k=10^{-3}$$；AdaGrad/RMSProp/Adam 的 $$\alpha$$ 分别取 $$0.4,10^{-3},5\times10^{-3}$$，$$\varepsilon=10^{-7}$$． 结论（讲义图 8.12；横轴每个*时期* epoch 表示计算了 $$N$$ 次分量函数 的梯度）：加入动量后 SGD 收敛加快，但没有自适应类方法快；批量大小 （batch size）从 1 变成 10 时，SGD 与动量方法达到相同精度需要的时期数 变多，但大批量的算法效率更高（矩阵乘法并行效率与内存利用率更高）； 自适应类中 AdaGrad 对该凸问题收敛最快，Adam 次之；a9a 数据集上 RMSProp 与 AdaDelta 在批量大小为 1 时尾部出现波动．

##### 2. 多层感知机神经网络

多层感知机（全连接神经网络）是基本的网络结构（§1.4 已简介）：考虑 有 $$L$$ 个隐藏层的多层感知机，给定输入 $$a\in\mathbb{R}^p$$，输出用如下迭代 过程表示： $$\begin{equation}
  y^{(l)}=t\bigl(x^{(l)}y^{(l-1)}+w^{(l)}\bigr),
  \qquad l=1,2,\dots,L+1,
\end{equation}$$ 其中 $$x^{(l)}\in\mathbb{R}^{m_{l-1}\times m_l}$$ 为系数矩阵，$$w^{(l)}\in\mathbb{R}^{m_l}$$ 为非齐次项，$$t(\cdot)$$ 为非线性激活函数，输出为 $$y^{(L+1)}$$．用 $$h(a;x)$$ 表示该多层感知机（$$x=(x^{(1)},\dots,x^{(L)},w^{(1)},\dots,
w^{(L)})$$ 为所有网络参数），学习问题为经验损失极小： $$\begin{equation}
  \min\ \frac1N\sum_{i=1}^{N}L\bigl(h(a^i;x),\ b^i\bigr),
\end{equation}$$ 同样可用随机梯度算法： $$\begin{equation}
  x^{k+1}=x^k-\tau^k\nabla_xL\bigl(h(a^{s^k};x^k),\ b^{s^k}\bigr),
\end{equation}$$ 核心是求梯度：由于函数具有*复合结构*，采用**后传算法** （backpropagation）．假定已得到关于第 $$l$$ 隐藏层的导数 $$\frac{\partial L}{\partial y^{(l)}}$$，则通过递推公式得到第 $$l$$ 层参数 的导数与前一层输出的导数： $$\begin{equation}
  \frac{\partial L}{\partial w^{(l)}}
  =\frac{\partial L}{\partial y^{(l)}}\odot\frac{\partial t}{\partial z},
  \qquad
  \frac{\partial L}{\partial x^{(l)}}
  =\Bigl(\frac{\partial L}{\partial y^{(l)}}
  \odot\frac{\partial t}{\partial z}\Bigr)\bigl(y^{(l-1)}\bigr)^\top,
  \qquad
  \frac{\partial L}{\partial y^{(l-1)}}
  =\bigl(x^{(l)}\bigr)^\top
  \Bigl(\frac{\partial L}{\partial y^{(l)}}
  \odot\frac{\partial t}{\partial z}\Bigr),
\end{equation}$$ 其中 $$\odot$$ 为逐元素相乘，$$z=x^{(l)}y^{(l-1)}+w^{(l)}$$．

<div class="algorithm">

**算法 34**

<div class="algorithmic">

$$g\leftarrow\nabla_{\hat y}L(\hat y,\ b^{s^k})$$； $$g\leftarrow g\odot\frac{\partial t}{\partial z}$$； $$\frac{\partial L}{\partial w^{(l)}}=g$$； $$\frac{\partial L}{\partial x^{(l)}}=g\,(y^{(l-1)})^\top$$； $$g\leftarrow(x^{(l)})^\top g$$；

</div>

</div>

### 收敛性分析

随机梯度算法具有不确定性，其收敛性依赖于步长选取与 $$f$$ 本身的性质， 在不同条件下有不同结果（与梯度法类似）．下面对 $$f$$ 分别为一般凸函数与 可微强凸函数进行讨论．

#### 一般凸函数：随机次梯度算法的收敛性

只假设每个 $$f^i$$ 凸且存在次梯度（此时 (8.440) 实为随机次 梯度算法）．

**（）**   对问题 (8.439) 使用迭代 (8.440) 时： (1) 每个 $$f^i$$ 是闭凸函数，存在次梯度； (2) 随机次梯度二阶矩一致有界：存在 $$M$$，对任意 $$x\in\mathbb{R}^n$$ 与随机下标 $$s^k$$，$$\mathbb{E}_{s^k}\bigl[\left\Vert g^k\right\Vert^2\bigr]\le M^2<+\infty$$； (3) 迭代随机点列 $$\lbracex^k\rbrace$$ 处处有界：$$\left\Vert x^k-x^*\right\Vert\le R$$，其中 $$x^*$$ 是问题 (8.439) 的最优解．

<div class="lemma">

**引理 8.7** 在假设 8.9.4 下，$$\lbrace\alpha^k\rbrace$$ 为任一正步长序列， $$\lbracex^k\rbrace$$ 为随机次梯度法产生的序列，则对所有 $$K\ge1$$： $$\begin{equation}
  \sum_{k=1}^{K}\alpha^k\mathbb{E}\bigl[f(x^k)-f(x^*)\bigr]
  \le\frac12\mathbb{E}\bigl[\left\Vert x^1-x^*\right\Vert_2^2\bigr]
  +\frac12\sum_{k=1}^{K}(\alpha^k)^2M^2.
\end{equation}$$

</div>

**Proof** **（）** 令 $$\bar g^k=\mathbb{E}[g^k\mid x^k]$$，$$\xi^k=g^k-\bar g^k$$．由随机次梯度法的 性质 $$\bar g^k=\mathbb{E}[g^k\mid x^k]\in\partial f(x^k)$$（$$\bar g^k$$ 就是次 梯度），由次梯度性质 $$\left\langle \bar g^k,\,x^*-x^k\right\rangle\le f(x^*)-f(x^k)$$．推导： $$\begin{align}
  \frac12\left\Vert x^{k+1}-x^*\right\Vert_2^2
  &=\frac12\left\Vert x^k-\alpha^kg^k-x^*\right\Vert_2^2\\
  &=\frac12\left\Vert x^k-x^*\right\Vert_2^2+\alpha^k\left\langle g^k,\,x^*-x^k\right\rangle
  +\frac{(\alpha^k)^2}{2}\left\Vert g^k\right\Vert^2\\
  &=\frac12\left\Vert x^k-x^*\right\Vert_2^2+\alpha^k\left\langle \bar g^k,\,x^*-x^k\right\rangle
  +\frac{(\alpha^k)^2}{2}\left\Vert g^k\right\Vert^2
  +\alpha^k\left\langle \xi^k,\,x^*-x^k\right\rangle\\
  &\le\frac12\left\Vert x^k-x^*\right\Vert_2^2+\alpha^k\bigl(f(x^*)-f(x^k)\bigr)
  +\frac{(\alpha^k)^2}{2}\left\Vert g^k\right\Vert^2
  +\alpha^k\left\langle \xi^k,\,x^*-x^k\right\rangle.
\end{align}$$ 注意到 $$\mathbb{E}[\xi^k\mid x^k]=\mathbb{E}[g^k\mid x^k]-\bar g^k=0$$，再利用条件期望 的性质 $$\mathbb{E}[\left\langle \xi^k,\,x^*-x^k\right\rangle]
=\mathbb{E}\bigl[\mathbb{E}[\left\langle \xi^k,\,x^*-x^k\right\rangle\mid x^k]\bigr]=0$$．对 (8.467) 两端求期望： $$\begin{equation}
  \alpha^k\mathbb{E}\bigl[f(x^k)-f(x^*)\bigr]
  \le\frac12\mathbb{E}\bigl[\left\Vert x^k-x^*\right\Vert_2^2\bigr]
  -\frac12\mathbb{E}\bigl[\left\Vert x^{k+1}-x^*\right\Vert_2^2\bigr]
  +\frac{(\alpha^k)^2}{2}M^2,
\end{equation}$$ 对 $$k$$ 求和即证．

引理 8.7 还没有直接给出收敛性（步长未定）．由它 容易得到收缩步长下的收敛性：

<div class="theorem">

**定理 8.18** 在假设 8.9.4 下，令 $$A_K=\sum_{i=1}^{K}\alpha^i$$， 定义步长加权平均 $$\bar x^K=\frac{1}{A_K}\sum_{k=1}^{K}\alpha^kx^k$$，则 $$\begin{equation}
  \mathbb{E}\bigl[f(\bar x^K)-f(x^*)\bigr]\le
  \frac{R^2+\sum_{k=1}^{K}(\alpha^k)^2M^2}{2A_K}.
\end{equation}$$

</div>

**Proof** **（）** 由 $$f$$ 的凸性以及引理 8.7： $$\begin{equation}
  A_K\mathbb{E}\bigl[f(\bar x^K)-f(x^*)\bigr]
  \le\sum_{k=1}^{K}\alpha^k\mathbb{E}\bigl[f(x^k)-f(x^*)\bigr]
  \le\frac12\mathbb{E}\bigl[\left\Vert x^1-x^*\right\Vert_2^2\bigr]
  +\frac12\sum_{k=1}^{K}(\alpha^k)^2M^2,
\end{equation}$$ 两边同除以 $$A_K$$ 即证．

定理 8.18 表明：当 $$\begin{equation}
  \sum_{k=1}^{\infty}\alpha^k=+\infty,
  \qquad
  \frac{\sum_{k=1}^{K}(\alpha^k)^2}{\sum_{k=1}^{K}\alpha^k}\to0
\end{equation}$$ 时，随机次梯度算法收敛．对固定步长 $$\alpha$$，(8.466) 右侧有不随 $$K$$ 递减的常数------*固定步长随机次梯度算法在函数值期望 意义下不收敛*，仅能找到次优解： $$\begin{equation}
  \mathbb{E}\bigl[f(\bar x^K)-f(x^*)\bigr]\le\frac{R^2}{2K\alpha}
  +\frac{\alpha M^2}{2};
\end{equation}$$ 特别地对给定迭代次数 $$K$$，取固定步长 $$\alpha=\frac{R}{M\sqrt K}$$ 可达 $$O(\frac{1}{\sqrt K})$$ 精度：$$\mathbb{E}[f(\bar x^K)-f(x^*)]\le\frac{RM}{\sqrt K}$$．

<div class="theorem">

**定理 8.19** 在假设 8.9.4 下，$$\lbrace\alpha^k\rbrace$$ 是不增的正步长序列， $$\bar x^K=\frac1K\sum_{k=1}^{K}x^k$$（直接平均），则 $$\begin{equation}
  \mathbb{E}\bigl[f(\bar x^K)-f(x^*)\bigr]\le
  \frac{R^2}{2K\alpha^K}+\frac{1}{2K}\sum_{k=1}^{K}\alpha^kM^2.
\end{equation}$$

</div>

**Proof** **（）** 对引理 8.7 证明中的 (8.467) 式（取期望后）两边同除 $$\alpha^k$$： $$\begin{equation}
  \mathbb{E}\bigl[f(x^k)-f(x^*)\bigr]\le
  \frac{1}{2\alpha^k}\mathbb{E}\bigl[\left\Vert x^k-x^*\right\Vert_2^2\bigr]
  -\frac{1}{2\alpha^k}\mathbb{E}\bigl[\left\Vert x^{k+1}-x^*\right\Vert_2^2\bigr]
  +\frac{\alpha^k}{2}M^2.
\end{equation}$$ 对 $$k$$ 求和，利用 $$f$$ 的凸性与 $$\alpha^k$$ 的单调性（配平 $$\frac{1}{\alpha^k}$$ 的差分）： $$\begin{align}
  \mathbb{E}\bigl[f(\bar x^K)-f(x^*)\bigr]
  &\le\frac1K\sum_{k=1}^{K}\mathbb{E}\bigl[f(x^k)-f(x^*)\bigr]\\
  &\le\frac{1}{2K}\Bigl[\frac{1}{\alpha^1}
  \mathbb{E}\bigl[\left\Vert x^1-x^*\right\Vert_2^2\bigr]
  +\sum_{k=1}^{K}\alpha^kM^2
  +\sum_{k=2}^{K}\Bigl(\frac{1}{\alpha^k}-\frac{1}{\alpha^{k-1}}\Bigr)
  \mathbb{E}\bigl[\left\Vert x^k-x^*\right\Vert_2^2\bigr]\Bigr]\\
  &\le\frac{R^2}{2K\alpha^K}+\frac{1}{2K}\sum_{k=1}^{K}\alpha^kM^2.
\end{align}$$

<div class="corollary">

**推论 8.4** 在假设 8.9.4 下，取 $$\alpha^k=\frac{R}{M\sqrt k}$$， 则 $$\begin{equation}
  \mathbb{E}\bigl[f(\bar x^K)-f(x^*)\bigr]\le\frac{3RM}{2\sqrt K}.
\end{equation}$$

</div>

**Proof** **（）** 注意到 $$\sum_{k=1}^{K}\frac{1}{\sqrt k}\le\int_0^{K}\frac{\mathrm{d}t}{\sqrt t}
=2\sqrt K$$，将 $$\alpha^k=\frac{R}{M\sqrt k}$$ 代入定理 8.19 即得 $$\mathbb{E}[f(\bar x^K)-f(x^*)]\le\frac{R^2}{2K\cdot\frac{R}{M\sqrt K}}
+\frac{RM}{2K}\cdot2\sqrt K=\frac{3RM}{2\sqrt K}$$．

随机次梯度算法与非随机次梯度算法具有相同的收敛速度 $$O(\frac1{\sqrt K})$$， 而每步计算代价远小------这解释了随机算法在大规模问题上的优势．进一步， *依概率*意义下的收敛性与高概率界：

<div class="theorem">

**定理 8.20** 选择推论 8.4 中的步长使 $$\mathbb{E}[f(\bar x^K)-f(x^*)]\to0$$，则依概率收敛 $$f(\bar x^K)-f(x^*)\xrightarrow{P}0\ (K\to\infty)$$，即对任意 $$\varepsilon>0$$： $$\begin{equation}
  \lim_{K\to\infty}\mathbf{P}\bigl(f(\bar x^K)-f(x^*)\ge\varepsilon\bigr)=0.
\end{equation}$$

</div>

**Proof** **（）** 由马尔可夫不等式立即得到 $$\mathbf{P}\bigl(f(\bar x^K)-f(x^*)\ge\varepsilon\bigr)
\le\frac{1}{\varepsilon}\mathbb{E}\bigl[f(\bar x^K)-f(x^*)\bigr]\to0$$．

<div class="theorem">

**定理 8.21** 在假设 8.9.4 下，进一步假设所有随机次梯度满足 $$\left\Vert g\right\Vert\le M$$，则对任意 $$\varepsilon>0$$： $$\begin{equation}
  f(\bar x^K)-f(x^*)\le
  \frac{R^2}{2K\alpha^K}+\frac{1}{2K}\sum_{k=1}^{K}\alpha^kM^2
  +\frac{RM}{\sqrt K}\,\varepsilon
\end{equation}$$ 以至少 $$1-e^{-\frac12\varepsilon^2}$$ 的概率成立，其中 $$\lbrace\alpha^k\rbrace$$ 单调不增，$$\bar x^K$$ 为直接平均．

</div>

**Proof** **（）** 令 $$\bar g^k=\mathbb{E}[g^k\mid x^k]$$，$$\xi^k=g^k-\bar g^k$$．由引理 8.7 证明中的 (8.467)：两边对 $$k$$ 求和并利用 $$f$$ 的凸性与 $$\alpha^k$$ 的单调性： $$\begin{align}
  f(\bar x^K)-f(x^*)&\le
  \frac{R^2}{2K\alpha^K}+\frac{1}{2K}\sum_{k=1}^{K}\alpha^k\left\Vert g^k\right\Vert^2
  +\frac1K\sum_{k=1}^{K}\left\langle \xi^k,\,x^*-x^k\right\rangle\\
  &\le\frac{R^2}{2K\alpha^K}
  +\frac{1}{2K}\sum_{k=1}^{K}\alpha^kM^2
  +\frac1K\sum_{k=1}^{K}\left\langle \xi^k,\,x^*-x^k\right\rangle.
\end{align}$$ 令 $$\omega=\frac{R^2}{2K\alpha^K}+\frac{1}{2K}\sum_{k=1}^{K}
(\alpha^k)^2M^2$$（注意第二项中 $$\left\Vert g^k\right\Vert\le M$$），得到 $$\begin{equation}
  \mathbf{P}\Bigl(f(\bar x^K)-f(x^*)-\omega\ge t\Bigr)
  \le\mathbf{P}\Bigl(\frac1K\sum_{k=1}^{K}\left\langle \xi^k,\,x^*-x^k\right\rangle\ge t\Bigr).
\end{equation}$$ 设 $$Z^k=(x^1,\dots,x^{k+1})$$；因为 $$\mathbb{E}[\xi^k\mid Z^{k-1}]=\mathbb{E}[\xi^k\mid x^k]=0$$、 $$\mathbb{E}[x^k\mid Z^{k-1}]=x^k$$，序列 $$\lbrace\left\langle \xi^k,\,x^*-x^k\right\rangle\rbrace$$ 是 **鞅差序列**（附录定义 B.10）．由 $$\left\Vert\xi^k\right\Vert_2=\left\Vert g^k-\bar g^k\right\Vert_2\le2M$$ 推出 $$\begin{equation}
  \left\vert\left\langle \xi^k,\,x^*-x^k\right\rangle\right\vert\le\left\Vert\xi^k\right\Vert\left\Vert x^*-x^k\right\Vert_2\le2MR,
\end{equation}$$ 即有界．由 Azuma--Hoeffding 不等式（附录定理 B.6）： $$\begin{equation}
  \mathbf{P}\Bigl(\frac1K\sum_{k=1}^{K}\left\langle \xi^k,\,x^*-x^k\right\rangle\ge t\Bigr)
  \le\exp\Bigl(-\frac{Kt^2}{2M^2R^2}\Bigr).
\end{equation}$$ 将 $$t=\frac{MR\varepsilon}{\sqrt K}$$ 代入得 $$\mathbf{P}\bigl(\frac1K\sum_k\left\langle \xi^k,\,x^*-x^k\right\rangle\ge\frac{MR\varepsilon}
{\sqrt K}\bigr)\le e^{-\varepsilon^2/2}$$，结合前式定理得证．

定理 8.21 给出更细致的刻画：取 $$\alpha^k=\frac{R}{\sqrt kM}$$，令 $$\delta=e^{-\frac12\varepsilon^2}$$， 则 $$\begin{equation}
  \mathbf{P}\Bigl(f(\bar x^K)-f(x^*)\le\frac{3RM}{2\sqrt K}
  +\frac{RM\sqrt{2\ln\frac1\delta}}{\sqrt K}\Bigr)\ge1-\delta,
\end{equation}$$ 即除一个很小的概率外，函数值以 $$O(\frac1{\sqrt K})$$ 速度收敛．

#### 可微强凸函数：SGD 的收敛性

若 $$f$$ 可微强凸，SGD 的收敛速度可以提升到 $$O(\frac1K)$$．

**（）**   对问题 (8.439) 使用迭代 (8.440) 时： (1) $$f$$ 可微，每个 $$f^i$$ 梯度存在； (2) $$f$$ 梯度 $$L$$-利普希茨连续； (3) $$f$$ 强凸（参数 $$\mu$$）； (4) 随机梯度二阶矩一致有界： $$\mathbb{E}_{s^k}[\left\Vert\nabla f_{s^k}(x)\right\Vert^2]\le M^2<+\infty$$．

<div class="theorem">

**定理 8.22** 在假设 8.9.4 下，定义 $$\Delta^k=\left\Vert x^k-x^*\right\Vert$$．对固定步长 $$\alpha^k=\alpha$$， $$0<\alpha<\frac{1}{2\mu}$$： $$\begin{equation}
  \mathbb{E}\bigl[f(x^{K+1})-f(x^*)\bigr]
  \le\frac L2\,\mathbb{E}\bigl[\Delta_{K+1}^2\bigr]
  \le\frac L2\Bigl[(1-2\alpha\mu)^K\Delta_1^2
  +\frac{\alpha M^2}{2\mu}\Bigr].
\end{equation}$$

</div>

**Proof** **（）** 由 SGD 更新公式： $$\begin{align}
  \Delta_{k+1}^2&=\left\Vert x^{k+1}-x^*\right\Vert_2^2
  =\left\Vert x^k-\alpha^k\nabla f_{s^k}(x^k)-x^*\right\Vert_2^2\\
  &=\Delta_k^2-2\alpha^k\left\langle \nabla f_{s^k}(x^k),\,x^k-x^*\right\rangle
  +(\alpha^k)^2\left\Vert\nabla f_{s^k}(x^k)\right\Vert^2.
\end{align}$$ 较难处理的是 $$\left\langle \nabla f_{s^k}(x^k),\,x^k-x^*\right\rangle$$ 项（$$s^k$$ 与 $$x^k$$ 都 有随机性）．由条件期望的性质 $$\mathbb{E}[X]=\mathbb{E}[\mathbb{E}[X\mid Y]]$$： $$\begin{align}
  \mathbb{E}_{s^1,\dots,s^k}\bigl[\left\langle \nabla f_{s^k}(x^k),\,x^k-x^*\right\rangle\bigr]
  &=\mathbb{E}_{s^1,\dots,s^{k-1}}\Bigl[\mathbb{E}_{s^k}\bigl[\left\langle \nabla f_{s^k}(x^k),\,x^k-x^*\right\rangle\mid s^1,\dots,s^{k-1}\bigr]\Bigr]\\
  &=\mathbb{E}_{s^1,\dots,s^k}\bigl[\left\langle \nabla f(x^k),\,x^k-x^*\right\rangle\bigr],
\end{align}$$ 推导利用了 $$x^k$$ 仅与 $$s^1,\dots,s^{k-1}$$ 有关（固定历史样本后 $$x^k$$ 是常数，可把随机梯度换成全梯度）．由强凸函数的单调性： $$\begin{equation}
  \left\langle \nabla f(x^k),\,x^k-x^*\right\rangle
  =\left\langle \nabla f(x^k)-\nabla f(x^*),\,x^k-x^*\right\rangle
  \ge\mu\left\Vert x^k-x^*\right\Vert_2^2=\mu\Delta_k^2.
\end{equation}$$ 于是利用随机梯度二阶矩的一致有界性： $$\begin{equation}
  \mathbb{E}_{s^1,\dots,s^k}\bigl[\Delta_{k+1}^2\bigr]
  \le(1-2\alpha\mu)\,\mathbb{E}\bigl[\Delta_k^2\bigr]+\alpha^2M^2.
\end{equation}$$ 对 $$k$$ 归纳： $$\begin{equation}
  \mathbb{E}\bigl[\Delta_{K+1}^2\bigr]\le(1-2\alpha\mu)^K\Delta_1^2
  +\sum_{i=0}^{K-1}(1-2\alpha\mu)^i\alpha^2M^2;
\end{equation}$$ 由 $$0<2\alpha\mu<1$$： $$\sum_{i=0}^{K-1}(1-2\alpha\mu)^i<\sum_{i=0}^{\infty}(1-2\alpha\mu)^i
=\frac{1}{2\alpha\mu}$$，故 $$\mathbb{E}[\Delta_{K+1}^2]\le(1-2\alpha\mu)^K\Delta_1^2+\frac{\alpha M^2}
{2\mu}$$（到此尚未用 $$L$$-利普希茨条件）．再利用梯度 $$L$$-利普希茨函数 的二次上界与 $$\nabla f(x^*)=0$$： $$\begin{equation}
  f(x^{K+1})-f(x^*)\le\left\langle \nabla f(x^*),\,x^{K+1}-x^*\right\rangle
  +\frac L2\left\Vert x^{K+1}-x^*\right\Vert^2
  =\frac L2\Delta_{K+1}^2,
\end{equation}$$ 取期望并代入 $$\mathbb{E}[\Delta_{K+1}^2]$$ 的估计即证．

对固定步长，(8.484) 右端有不随 $$K$$ 变化的常数 $$\frac{\alpha M^2}{2\mu}$$------*算法不能保证收敛到精确解*（与 §7.2 固定罚因子增广拉格朗日函数法的现象类似）；取递减步长可恢复收敛：

<div class="theorem">

**定理 8.23** 在定理 8.22 的结果中取递减步长 $$\begin{equation}
  \alpha^k=\frac{\beta}{k+\gamma},
\end{equation}$$ 其中 $$\beta>\frac{1}{2\mu}$$，$$\gamma>0$$ 使 $$\alpha^1\le\frac{1}{2\mu}$$， 则对任意 $$k\ge1$$： $$\begin{equation}
  \mathbb{E}\bigl[f(x^k)-f(x^*)\bigr]\le\frac L2\,\mathbb{E}\bigl[\Delta_k^2\bigr]
  \le\frac L2\cdot\frac{v}{\gamma+k},
  \qquad
  v=\max\Bigl\lbrace\frac{\beta^2M^2}{2\beta\mu-1},\
  (\gamma+1)\Delta_1^2\Bigr\rbrace.
\end{equation}$$

</div>

**Proof** **（）** 定理 8.22 已证明 $$\mathbb{E}[\Delta_{k+1}^2]\le(1-2\alpha^k\mu)\mathbb{E}[\Delta_k^2]
+(\alpha^k)^2M^2$$．数学归纳：$$k=1$$ 时由 $$v$$ 的定义知结论成立；设对 $$k$$ 成立，记 $$\hat k=\gamma+k$$（$$\alpha^k=\frac{\beta}{\hat k}$$），由 归纳假设： $$\begin{equation}
  \mathbb{E}\bigl[\Delta_{k+1}^2\bigr]\le
  \Bigl(1-\frac{2\beta\mu}{\hat k}\Bigr)\frac{v}{\hat k}
  +\frac{\beta^2M^2}{\hat k^2}
  =\frac{\hat k-1}{\hat k^2}\,v
  +\frac{(2\beta\mu-1)v+\beta^2M^2}{\hat k^2}
  \le\frac{v}{\hat k+1},
\end{equation}$$ 最后一步用 $$v\ge\frac{\beta^2M^2}{2\beta\mu-1}$$（即 $$(2\beta\mu-1)v\ge\beta^2M^2$$）与 $$\hat k-1\le\hat k-1<\hat k+1$$．故 结论对 $$k+1$$ 也成立．

|  | $$f$$ 凸（次梯度算法） | $$f$$ 可微强凸 | $$f$$ 可微强凸且 $$L$$-光滑 |
|:---|:--:|:--:|:--:|
| 随机算法 | $$O\bigl(\frac{1}{\epsilon^2}\bigr)$$ | $$O\bigl(\frac1\epsilon\bigr)$$ | $$O\bigl(\frac1\epsilon\bigr)$$ |
| 普通算法 | $$O\bigl(\frac{N}{\epsilon^2}\bigr)$$ | $$O\bigl(\frac{N}{\epsilon}\bigr)$$ | $$O\bigl(N\ln\frac1\epsilon\bigr)$$ |

: 梯度下降法的算法复杂度（计算梯度次数；$$\epsilon$$ 为目标精度， $$N$$ 为样本数） {#tab:ch8-sgd-complexity}

（表 8.1：普通梯度法每次迭代需 $$N$$ 次梯度， 随机算法只需一次．次梯度情形随机版本与普通版本收敛速度无差别而每步 计算量大幅降低；可微强凸情形随机版本的*收敛速度*慢于梯度法------ 原因与改进见方差减小技术．）

### 方差减小技术

在次梯度情形与 $$f$$ 可微强凸情形下，随机梯度方法的复杂度小于普通梯度 法；但随机方法受梯度估计*噪声*影响：固定步长不能收敛，递减步长 下也只有 $$O(\frac1k)$$ 的 R-次线性收敛，而普通梯度法在强凸 $$+$$ $$L$$-光滑 下可达 Q-线性收敛．分析差别：在假设 8.9.4 下， 对梯度下降法： $$\begin{equation}
  \Delta_{k+1}^2\le(1-2\alpha\mu)\Delta_k^2+\alpha^2\left\Vert\nabla
  f(x^k)\right\Vert_2^2\le(1-2\alpha\mu+\alpha^2L^2)\,\Delta_k^2
\end{equation}$$ （依次用 $$\mu$$-强凸与 $$L$$-光滑：$$\left\Vert\nabla f(x^k)\right\Vert\le L\Delta_k$$）； 对 SGD，利用条件期望（细节可自行验证）： $$\begin{equation}
  \mathbb{E}\bigl[\Delta_{k+1}^2\bigr]\le
  \underbrace{(1-2\alpha\mu+\alpha^2L^2)\,\mathbb{E}\bigl[\Delta_k^2\bigr]}_{A}
  +\underbrace{\alpha^2\,\mathbb{E}\Bigl[\left\Vert\nabla f_{s^k}(x^k)
  -\nabla f(x^k)\right\Vert_2^2\Bigr]}_{B}.
\end{equation}$$ 两种算法的主要差别在 $$B$$ 项------*梯度估计的方差*，它导致 SGD 只有 $$O(\frac1k)$$ 的收敛速度．许多应用中 SGD 实际收敛更快：初期方差小 （$$B\ll A$$）时观察到近似 Q-线性收敛，随迭代进行方差增大，最终收敛速度 为 $$O(\frac1k)$$；为获得较快的渐进收敛速度，核心目标是*减小方差 项 $$B$$*．三种减小方差的算法：

##### 1. SAG 算法与 SAGA 算法

SGD 每步只用当前随机梯度，历史随机梯度直接丢弃；迭代接近收敛时， 上一步的随机梯度也是当前点梯度的很好估计．**随机平均梯度法** （stochastic average gradient, SAG）记录所有之前计算过的随机梯度，与 新梯度求平均作为下一步的梯度估计：内存中开辟 $$N$$ 个随机梯度空间 $$[g_1^k,\dots,g_N^k]$$ 分别记录与第 $$i$$ 个样本相关的最新随机梯度；第 $$k$$ 步若抽取样本 $$s^k$$，更新 $$g^k_{s^k}$$ 为当前随机梯度、其余不变， 迭代格式为 $$\begin{equation}
  x^{k+1}=x^k-\frac{\alpha^k}{N}\sum_{i=1}^{N}g_i^k,
  \qquad
  g_i^k=
  \begin{cases}
    \nabla f_{s^k}(x^k), & i=s^k,\\
    g_i^{k-1}, & \text{其他};
  \end{cases}
\end{equation}$$ 每次只有一个 $$g_i^k$$ 改变，故 SAG 也可写成 $$\begin{equation}
  x^{k+1}=x^k-\alpha^k\Bigl[\frac1N\bigl(\nabla f_{s^k}(x^k)
  -g_{s^k}^{k-1}\bigr)+\frac1N\sum_{i=1}^{N}g_i^{k-1}\Bigr].
\end{equation}$$ $$\lbraceg_i^k\rbrace$$ 初值可取零向量或中心化的随机梯度．SAG 每步随机梯度的条件 期望*并不是*真实梯度（偏差随迭代减小）------这是它的缺陷．

<div class="theorem">

**定理 8.24** 在假设 8.9.4 下，取固定步长 $$\alpha^k=\frac{1}{16L}$$，$$g_i^0=0$$，则对任意 $$k$$： $$\begin{equation}
  \mathbb{E}\bigl[f(x^k)\bigr]-f(x^*)\le
  \Bigl(1-\min\Bigl\lbrace\frac{\mu}{16L},\ \frac{1}{8N}\Bigr\rbrace\Bigr)^{k}C^0,
\end{equation}$$ 其中 $$C^0$$ 为与 $$k$$ 无关的常数------SAG 有 **Q-线性收敛**速度．

</div>

SAG 的缺点是需要存储 $$N$$ 个梯度向量，$$N$$ 很大时开销很大，实际很少 使用（主要价值在思想，其他实用算法由它变形而来）．**SAGA** 是 SAG 的修正：使用*无偏*的梯度向量作为更新方向，去掉 $$\nabla f_{s^k}(x^k)-g_{s^k}^{k-1}$$ 前面的系数 $$\frac1N$$： $$\begin{equation}
  x^{k+1}=x^k-\alpha^k\Bigl[\nabla f_{s^k}(x^k)-g_{s^k}^{k-1}
  +\frac1N\sum_{i=1}^{N}g_i^{k-1}\Bigr],
\end{equation}$$ 每次迭代的梯度方向都是无偏的： $$\begin{equation}
  \mathbb{E}\Bigl[\nabla f_{s^k}(x^k)-g_{s^k}^{k-1}
  +\frac1N\sum_{i=1}^{N}g_i^{k-1}\ \Big\vert\ x^k\Bigr]=\nabla f(x^k).
\end{equation}$$

<div class="theorem">

**定理 8.25** 在假设 8.9.4 下，取固定步长 $$\alpha^k=\frac{1}{2(\mu N+L)}$$，定义 $$\Delta^k=\left\Vert x^k-x^*\right\Vert$$，则对 任意 $$k\ge1$$： $$\begin{equation}
  \mathbb{E}\bigl[\Delta_k^2\bigr]\le
  \Bigl(1-\frac{\mu}{2(\mu N+L)}\Bigr)^{k}
  \Bigl(\Delta_1^2+\frac{N\bigl(f(x^1)-f(x^*)\bigr)}{\mu N+L}\Bigr).
\end{equation}$$ 若强凸参数 $$\mu$$ 未知，也可取 $$\alpha=\frac{1}{3L}$$，有类似的收敛结果．

</div>

##### 2. SVRG 算法

与 SAG/SAGA 不同，**SVRG**（stochastic variance reduced gradient）通过*周期性缓存全梯度*来减小方差：每经过 $$m$$ 次迭代 设置一个检查点 $$\tilde x^j$$，计算一次全梯度 $$\nabla f(\tilde x^j)$$，之后 $$m$$ 次迭代中用该全梯度作为参考校正方差； 更新方向： $$\begin{equation}
  v^k=\nabla f_{s^k}(x^k)-\bigl(\nabla f_{s^k}(\tilde x^j)
  -\nabla f(\tilde x^j)\bigr),
\end{equation}$$ 给定 $$s^1,\dots,s^{k-1}$$ 时 $$x^k,\tilde x^j$$ 均为定值，故 $$\begin{equation}
  \mathbb{E}\bigl[v^k\mid s^1,\dots,s^{k-1}\bigr]=\nabla f(x^k)
  -\bigl(\nabla f(\tilde x^j)-\nabla f(\tilde x^j)\bigr)
  =\nabla f(x^k),
\end{equation}$$ 即 $$v^k$$ 在条件期望意义下是 $$\nabla f(x^k)$$ 的*无偏估计*．直观 理解：$$\nabla f_{s^k}(\tilde x^j)-\nabla f(\tilde x^j)$$ 是\"用单样本 估计全梯度\"的误差，用它对当前随机梯度做校正．

<div class="algorithm">

**算法 35**

**输入**：$$\tilde x^0$$，步长 $$\alpha$$，更新次数 $$m$$．

<div class="algorithmic">

计算全梯度 $$\nabla f(\tilde x^0)$$； 赋值 $$y=\tilde x^{j-1}$$，$$x^1=\tilde x^{j-1}$$，计算全梯度 $$\nabla f(y)$$； 随机选取 $$s^k\in\lbrace1,\dots,N\rbrace$$； 计算 $$v^k=\nabla f_{s^k}(x^k)-\bigl(\nabla f_{s^k}(y)
           -\nabla f(y)\bigr)$$； 更新 $$x^{k+1}=x^k-\alpha v^k$$； 计算参考点 $$\tilde x^j=\frac1m\sum_{i=1}^{m}x^i$$；

</div>

</div>

##### 方差分析

额外假设每个分量函数梯度 $$L$$-利普希茨连续： $$\left\Vert\nabla f^i(x)-\nabla f^i(y)\right\Vert\le L\left\Vert x-y\right\Vert$$，$$i=1,\dots,N$$．令 $$y=\tilde x^j$$，$$\Delta^k=\left\Vert x^k-x^*\right\Vert$$，则 $$\begin{align}
  \mathbb{E}\bigl[\left\Vert v^k\right\Vert_2^2\bigr]
  &=\mathbb{E}\Bigl[\left\Vert\nabla f_{s^k}(x^k)-\nabla f_{s^k}(y)
  +\nabla f(y)+\nabla f_{s^k}(x^*)-\nabla f_{s^k}(x^*)\right\Vert_2^2\Bigr]\\
  &\le2\,\mathbb{E}\Bigl[\left\Vert\nabla f_{s^k}(x^k)-\nabla f_{s^k}(x^*)\right\Vert_2^2\Bigr]
  +2\,\mathbb{E}\Bigl[\left\Vert\nabla f_{s^k}(y)-\nabla f(y)
  -\nabla f_{s^k}(x^*)\right\Vert_2^2\Bigr]\\
  &\le2L^2\,\mathbb{E}\bigl[\Delta_k^2\bigr]
  +2\,\mathbb{E}\Bigl[\left\Vert\nabla f_{s^k}(y)-\nabla f_{s^k}(x^*)\right\Vert_2^2\Bigr]
  \le2L^2\,\mathbb{E}\bigl[\Delta_k^2\bigr]
  +2L^2\,\mathbb{E}\bigl[\left\Vert y-x^*\right\Vert_2^2\bigr],
\end{align}$$ （第一个不等式用 $$\left\Vert a+b\right\Vert^2\le2\left\Vert a\right\Vert^2+2\left\Vert b\right\Vert^2$$ 与 $$\mathbb{E}[v^k]=\nabla f(x^k)$$ 的交叉项消去；第二个不等式用各分量函数的 $$L$$-利普希茨连续性；最后一步因为 $$s^k$$ 均匀分布、期望化为 $$\frac1N$$ 求和再放大．）对比 SGD 的方差项 $$\mathbb{E}[\left\Vert\nabla f_{s^k}(x^k)-\nabla f(x^k)\right\Vert^2]$$（其下界在整个迭代 过程中保持常数级别），SVRG 的方差项 $$\mathbb{E}[\left\Vert v^k\right\Vert^2]$$ 由 $$\mathbb{E}[\Delta_k^2]$$ 与*检查点*误差控制------当检查点接近最优解时方差 随之减小，这是 SVRG 能达到线性收敛的关键．

<div class="theorem">

**定理 8.26** 设每个 $$f^i$$ 可微凸且梯度 $$L$$-利普希茨连续，$$f$$ 强凸（参数 $$\mu$$）． 算法 35 取步长 $$\alpha\in\bigl(0,\frac{1}{2L}\bigr]$$， $$m$$ 充分大使得 $$\begin{equation}
  \rho=\frac{1}{\mu\alpha(1-2L\alpha)}+\frac{2L\alpha}{1-2L\alpha}<1,
\end{equation}$$ 则 SVRG 对参考点 $$\tilde x^j$$ 在函数值期望意义下有 Q-线性收敛速度： $$\begin{equation}
  \mathbb{E}\bigl[f(\tilde x^j)\bigr]-f(x^*)\le
  \rho\,\mathbb{E}\bigl[f(\tilde x^{j-1})\bigr]-f(x^*).
\end{equation}$$

</div>

**Proof** **（）** 定义 $$\Delta^k=\left\Vert x^k-x^*\right\Vert$$，对内层循环（固定 $$j$$）： $$\begin{align}
  \mathbb{E}\bigl[\Delta_{k+1}^2\bigr]
  &=\mathbb{E}\bigl[\left\Vert x^k-\alpha v^k-x^*\right\Vert_2^2\bigr]
  =\mathbb{E}\bigl[\Delta_k^2\bigr]-2\alpha\,\mathbb{E}\bigl[\left\langle v^k,\,x^k-x^*\right\rangle\bigr]
  +\alpha^2\,\mathbb{E}\bigl[\left\Vert v^k\right\Vert_2^2\bigr]\\
  &=\mathbb{E}\bigl[\Delta_k^2\bigr]-2\alpha\,\mathbb{E}\bigl[\left\langle \nabla f(x^k),\,x^k-x^*\right\rangle\bigr]+\alpha^2\,\mathbb{E}\bigl[\left\Vert v^k\right\Vert_2^2\bigr]\\
  &\le\mathbb{E}\bigl[\Delta_k^2\bigr]-2\alpha\,\mathbb{E}\bigl[f(x^k)-f(x^*)\bigr]
  +\alpha^2\,\mathbb{E}\bigl[\left\Vert v^k\right\Vert_2^2\bigr],
\end{align}$$ （利用 $$\mathbb{E}[v^k]=\nabla f(x^k)$$ 与强凸函数的下界 $$f(x^k)-f(x^*)\le\left\langle \nabla f(x^k),\,x^k-x^*\right\rangle$$．）构造辅助函数 $$\begin{equation}
  \phi^i(x)=f^i(x)-f^i(x^*)-\nabla f^i(x^*)^\top(x-x^*),
\end{equation}$$ 它也是凸函数且梯度 $$L$$-利普希茨连续，由第二章推论（$$L$$-光滑函数的 余强制性）有 $$\frac{1}{2L}\left\Vert\nabla\phi^i(x)\right\Vert^2\le\phi^i(x)-\phi^i(x^*)$$；展开 （$$\nabla f^i(x^*)$$ 项在求和后消去，$$\nabla f(x^*)=0$$）得 $$\begin{equation}
  \frac1N\sum_{i=1}^{N}\left\Vert\nabla f^i(x)-\nabla f^i(x^*)\right\Vert_2^2
  \le2L\bigl[f(x)-f(x^*)\bigr],\qquad \forall x.
\end{equation}$$ 利用 (8.509) 估计 $$v^k$$ 的二阶矩（与上文方差分析 相同的推导）： $$\begin{equation}
  \mathbb{E}\bigl[\left\Vert v^k\right\Vert_2^2\bigr]
  \le4L\bigl(\mathbb{E}\bigl[f(x^k)-f(x^*)\bigr]
  +\mathbb{E}\bigl[f(\tilde x^{j-1})-f(x^*)\bigr]\bigr).
\end{equation}$$ 代回并整理： $$\begin{equation}
  \mathbb{E}\bigl[\Delta_{k+1}^2\bigr]\le\mathbb{E}\bigl[\Delta_k^2\bigr]
  -2\alpha(1-2\alpha L)\,\mathbb{E}\bigl[f(x^k)-f(x^*)\bigr]
  +4L\alpha^2\,\mathbb{E}\bigl[f(\tilde x^{j-1})-f(x^*)\bigr].
\end{equation}$$ 对 $$k=1,\dots,m$$ 求和并注意 $$x^1=\tilde x^{j-1}$$： $$\begin{align}
  \mathbb{E}\bigl[\Delta_{m+1}^2\bigr]
  &+2\alpha(1-2\alpha L)\sum_{k=1}^{m}\mathbb{E}\bigl[f(x^k)-f(x^*)\bigr]\\
  &\le\mathbb{E}\bigl[\left\Vert\tilde x^{j-1}-x^*\right\Vert_2^2\bigr]
  +4L\alpha^2m\,\mathbb{E}\bigl[f(\tilde x^{j-1})-f(x^*)\bigr]\\
  &\le\Bigl(\frac2\mu+4mL\alpha^2\Bigr)
  \mathbb{E}\bigl[f(\tilde x^{j-1})-f(x^*)\bigr],
\end{align}$$ （最后一步用强凸性 $$\mathbb{E}[\left\Vert\tilde x^{j-1}-x^*\right\Vert^2]
\le\frac{2}{\mu}\mathbb{E}[f(\tilde x^{j-1})-f(x^*)]$$．）注意到 $$\tilde x^j=\frac1m\sum_{k=1}^{m}x^k$$，由凸性： $$\begin{align}
  \mathbb{E}\bigl[f(\tilde x^j)-f(x^*)\bigr]
  &\le\frac1m\sum_{k=1}^{m}\mathbb{E}\bigl[f(x^k)-f(x^*)\bigr]\\
  &\le\frac{\frac2\mu+4mL\alpha^2}{2\alpha(1-2L\alpha)m}
  \,\mathbb{E}\bigl[f(\tilde x^{j-1})-f(x^*)\bigr]
  =\rho\,\mathbb{E}\bigl[f(\tilde x^{j-1})-f(x^*)\bigr].
\end{align}$$

三种方差减小技术的对比**（三种方差减小技术的对比）** SAG 存储全部 $$N$$ 个历史梯度（内存 $$O(nN)$$，实现最重）；SAGA 同样存储 $$N$$ 个梯度但梯度估计无偏（分析更干净、可推广到近端形式 $$\min f+h$$）；SVRG 只需存一个检查点与当前梯度（内存 $$O(n)$$），代价是 每轮开始要重算一次全梯度（$$\frac{N}{m}$$ 倍额外开销）．三者都以 Q-线性收敛取代了 SGD 的 $$O(1/k)$$，是现代大规模机器学习优化的重要 基石．

## 半光滑牛顿算法

尽管一阶算法易于实现、容易并行、可快速计算低精度解，但收敛到高精度 解往往很慢；解决一阶算法*尾部收敛慢*的问题可考虑牛顿方法．应用 牛顿方法的困难有三：很多应用中问题*不可微*，经典牛顿法难以应用； 牛顿法只有很快的*局部*收敛性而不保证全局收敛；计算牛顿方向的代价 需要合理控制．本节针对这些问题设计能实际使用的、具有全局收敛性的 **半光滑牛顿算法**（§8.7.3 中 PPA 子问题的半光滑牛顿加速即为其 应用）．

### 半光滑性介绍

#### 广义雅可比

对局部利普希茨的映射定义广义雅可比．设 $$\Omega\subseteq\mathbb{R}^n$$ 是开集， $$F:\Omega\to\mathbb{R}^m$$ 局部利普希茨连续------由 Rademacher 定理，$$F$$ 几乎 处处可微．为处理非光滑性，引入广义微分：

<div class="definition">

**定义 8.8** 设 $$F:\Omega\to\mathbb{R}^m$$ 局部利普希茨连续，$$DF$$ 为 $$F$$ 的可微点集合， $$F$$ 在 $$x$$ 的**B-次微分**定义为 $$\begin{equation}
  \partial_BF(x)\coloneqq
  \Bigl\lbrace\lim_{k\to\infty}\nabla F(x^k)\ \Big\vert\ x^k\in DF,\ x^k\to x\Bigr\rbrace;
\end{equation}$$ Clarke 广义雅可比定义为 B-次微分的凸包： $$\begin{equation}
  \partial F(x)=\operatorname{conv}\bigl(\partial_BF(x)\bigr).
\end{equation}$$

</div>

容易看出：若 $$F$$ 局部利普希茨连续，则对任意 $$x\in\Omega$$，广义雅可比 $$\partial F(x)$$ 是非空紧凸集．下面给出广义雅可比的基本运算性质：

<div class="theorem">

**定理 8.27** 设 $$F$$ 局部利普希茨连续，$$S$$ 是一个零测集，定义 $$\begin{equation}
  \partial_SF(x)=\operatorname{conv}\Bigl\lbrace\lim_{k\to\infty}\nabla F(x^k)
  \ \Big\vert\ x^k\in DF,\ x^k\notin S,\ x^k\to x\Bigr\rbrace.
\end{equation}$$ 则对任意的 $$v\in\mathbb{R}^n$$ 和 $$w\in\mathbb{R}^m$$： $$\begin{equation}
  \partial F(x)v=\partial_SF(x)v,
  \qquad
  \partial F(x)^*w=\partial_SF(x)^*w,
\end{equation}$$ 其中 $$*$$ 表示集合中每一个元素都转置------即在相差一个零测集的意义下， 广义雅可比的*矩阵--向量乘*是一样的（这为算法中\"选取一个好用的 广义雅可比\"提供了理论空间）．

</div>

<div class="theorem">

**定理 8.28** 设 $$f=g\circ F$$，其中 $$F:\mathbb{R}^n\to\mathbb{R}^m$$ 与 $$g:\mathbb{R}^m\to\mathbb{R}$$ 分别在 $$x$$ 和 $$F(x)$$ 附近利普希茨连续，则 $$f$$ 在 $$x$$ 附近利普希茨且 $$\begin{equation}
  \partial f(x)\subset\operatorname{conv}\bigl\lbrace\partial g(F(x))\,\partial F(x)\bigr\rbrace;
\end{equation}$$ 如果 $$g$$ 在 $$F(x)$$ 点可微，则等式成立： $$\partial f(x)=\nabla g(F(x))\,\partial F(x)$$． 对复合映射 $$G\circ F$$（$$G:\mathbb{R}^m\to\mathbb{R}^k$$ 在 $$F(x)$$ 附近利普希茨）： $$\begin{equation}
  \partial(G\circ F)(x)v\subset\operatorname{conv}
  \bigl\lbrace\partial G(F(x))\,\partial F(x)\,v\bigr\rbrace;
\end{equation}$$ 若 $$G$$ 在 $$F(x)$$ 附近连续可微，则 $$\partial(G\circ F)(x)v=\nabla G(F(x))\,\partial F(x)v$$．

</div>

（注意：广义雅可比*不满足*普通的链式法则------只有外层函数可微时 链式法则才成立；且复合映射的广义雅可比是在*矩阵--向量乘*意义下 的，但这不影响实际使用．）

<div class="theorem">

**定理 8.29** 对利普希茨连续映射 $$F:\mathbb{R}^n\to\mathbb{R}^n$$，如果 $$F$$ 是单调的，那么对任何的 $$x\in\mathbb{R}^n$$，$$\partial_BF(x)$$ 中的每个元素都是半正定的．

</div>

**Proof** **（）** 先用反证法证明：对任何可微点 $$\bar x$$，$$\nabla F(\bar x)$$ 半正定．假设 存在常数 $$a>0$$ 和单位向量 $$d$$（$$\left\Vert d\right\Vert=1$$）使 $$\left\langle d,\,\nabla F(\bar x)d\right\rangle=-a$$．对任意 $$t>0$$ 定义 $$\Phi(t)\coloneqq F(\bar x+td)-F(\bar x)-t\nabla F(\bar x)d$$；由 $$F$$ 在 $$\bar x$$ 可微，$$\left\Vert\Phi(t)\right\Vert=o(t)$$．映射 $$F$$ 的单调性推出 $$\begin{equation}
  0\le\left\langle td,\,F(\bar x+td)-F(\bar x)\right\rangle
  =\left\langle td,\,t\nabla F(\bar x)d+\Phi(t)\right\rangle
  \le-at^2+t\left\Vert d\right\Vert\left\Vert\Phi(t)\right\Vert
  =-at^2+o(t^2).
\end{equation}$$ 当 $$t$$ 充分小时 $$-at^2+o(t^2)<0$$，矛盾------故所有可微点的雅可比都半 正定．对任意 $$x$$ 和任意 $$J\in\partial_BF(x)$$，存在可微点序列 $$x^k\to x$$ 使 $$\nabla F(x^k)\to J$$；每个 $$\nabla F(x^k)$$ 半正定，极限 $$J$$ 也半正定．

<div class="theorem">

**定理 8.30** 设 $$g$$ 是 $$\mathbb{R}^n$$ 上的适当闭凸函数，$$x\in\mathbb{R}^n$$，则对任意的 $$J\in\partial\bigl(\operatorname{prox}_{\gamma g}(x)\bigr)$$，$$J$$ 是对称 半正定矩阵且 $$\left\Vert J\right\Vert_2\le1$$．

</div>

（邻近算子是单调的（其广义雅可比半正定，定理 8.29），且是非扩张的（由此得特征值模长 $$\le1$$）------这为设计半光滑牛顿算法提供了\"牛顿方向可解、正则化有效\" 的结构保证．）

<div class="proposition">

**命题 8.5** 设 $$g$$ 是（块）可分的：$$g(x)=\sum_{i=1}^{n}g^i(x_i)$$（或 $$g(x)=\sum_{i=1}^{k}g^i(x^i)$$，$$x^i\in\mathbb{R}^{n_i}$$， $$\sum_in_i=n$$），则 $$\partial_B\bigl(\operatorname{prox}_{\gamma g}(x)\bigr)$$ 与 $$\partial\bigl(\operatorname{prox}_{\gamma g}(x)\bigr)$$ 中的所有元素 均为（块）对角矩阵．

</div>

**Proof** **（）** 只证 $$g$$ 可分的情形（块可分完全类似）．可分函数的邻近算子具有可分 结构： $$\begin{equation}
  \operatorname{prox}_{\gamma g}(x)=\bigl(\operatorname{prox}_{\gamma g^1}(x_1),
  \ \dots,\ \operatorname{prox}_{\gamma g^n}(x_n)\bigr),
\end{equation}$$ 于是显然 $$\partial_B(\operatorname{prox}_{\gamma g})(x)$$ 由对角矩阵组成； 再由 $$\partial(\operatorname{prox}_{\gamma g})(x)
=\operatorname{conv}\bigl(\partial_B(\operatorname{prox}_{\gamma g})(x)\bigr)$$ 即得命题．

<div class="proposition">

**命题 8.6** 设 $$g$$ 为适当闭凸函数，$$g^*$$ 为其共轭，则 $$\begin{equation}
  \partial_B\bigl(\operatorname{prox}_{\gamma g^*}(x)\bigr)
  =\bigl\lbraceJ=I-Q\ \big\vert\ Q\in\partial_B\bigl(\operatorname{prox}_{g/\gamma}
  (x/\gamma)\bigr)\bigr\rbrace,
\end{equation}$$ $$\begin{equation}
  \partial\bigl(\operatorname{prox}_{\gamma g^*}(x)\bigr)
  =\bigl\lbraceJ=I-Q\ \big\vert\ Q\in\partial\bigl(\operatorname{prox}_{g/\gamma}
  (x/\gamma)\bigr)\bigr\rbrace.
\end{equation}$$

</div>

**Proof** **（）** 利用 Moreau 分解 $$\operatorname{prox}_{\gamma g^*}(x)
=x-\gamma\operatorname{prox}_{g/\gamma}(x/\gamma)$$ 与定义 (8.9) 立即得到第一个等式（$$\operatorname{prox}_{
\gamma g^*}$$ 表示成两个连续可导函数的差）；再由 $$\operatorname{conv}\lbraceI-Q\ \vert\ Q\in\partial_B(\operatorname{prox}_{g/\gamma}
(x/\gamma))\rbrace=I-\operatorname{conv}\bigl(\partial_B(\operatorname{prox}_{
g/\gamma}(x/\gamma))\bigr)$$ 得第二个等式．

#### 常见非光滑函数的广义雅可比库

##### 范数

<div class="example">

**例题 8.27** $$g=\left\Vert x\right\Vert_2$$，$$\operatorname{prox}_{\gamma g}(x)$$ 分片光滑： $$\begin{equation}
  \operatorname{prox}_{\gamma g}(x)=
  \begin{cases}
    \bigl(1-\gamma/\left\Vert x\right\Vert_2\bigr)x, & \left\Vert x\right\Vert_2\ge\gamma,\\
    0, & \left\Vert x\right\Vert_2<\gamma.
  \end{cases}
\end{equation}$$ 令 $$w=x/\left\Vert x\right\Vert_2$$，分片求雅可比： $$\begin{equation}
  \partial_B\bigl(\operatorname{prox}_{\gamma g}(x)\bigr)=
  \begin{cases}
    \bigl\lbraceI-\frac{\gamma}{\left\Vert x\right\Vert_2}(I-ww^\top)\bigr\rbrace, & \left\Vert x\right\Vert_2>\gamma,\\
    \lbrace0\rbrace, & \left\Vert x\right\Vert_2<\gamma,\\
    \bigl\lbraceI-\frac{\gamma}{\left\Vert x\right\Vert_2}(I-ww^\top),\ 0\bigr\rbrace, &
    \left\Vert x\right\Vert_2=\gamma.
  \end{cases}
\end{equation}$$

</div>

<div class="example">

**例题 8.28** $$g=\left\Vert x\right\Vert_1$$，$$\operatorname{prox}_{\gamma g}(x)=\operatorname{sign}(x)
\odot\max(\left\vert x\right\vert-\gamma,0)$$（可分，故 $$\partial_B$$ 中每个元素均为对角 矩阵）．设 $$\alpha=\lbracei:\left\vert x_i\right\vert>\gamma\rbrace$$， $$\beta=\lbracei:\left\vert x_i\right\vert=\gamma\rbrace$$，$$\delta=\lbracei:\left\vert x_i\right\vert<\gamma\rbrace$$，若 $$J\in\partial_B(\operatorname{prox}_{\gamma g}(x))$$，则 $$\begin{equation}
  J_{ii}=
  \begin{cases}
    1, & i\in\alpha,\\
    \in\lbrace0,1\rbrace, & i\in\beta,\\
    0, & i\in\delta.
  \end{cases}
\end{equation}$$

</div>

##### 凸集（投影算子）

<div class="example">

**例题 8.29** $$D=\lbracex:\ Ax=b\rbrace$$，投影 $$P_D(x)=x-A^\dagger(Ax-b)$$（$$A^\dagger$$ 为 Moore--Penrose 广义逆）是线性映射，处处可导： $$\begin{equation}
  \partial(P_D(x))=\partial_B(P_D(x))=\nabla P_D(x)=\lbraceI-A^\dagger A\rbrace.
\end{equation}$$

</div>

<div class="example">

**例题 8.30** 记 $$x^+=\max\lbrace0,x\rbrace$$．对半空间 $$D=\lbracex:\ a^\top x\le b\rbrace$$： $$\begin{equation}
  P_D(x)=x-\frac{(a^\top x-b)^+}{\left\Vert a\right\Vert_2^2}\,a,
\end{equation}$$ $$\begin{equation}
  \partial(P_D(x))=
  \begin{cases}
    \Bigl\lbraceI-\dfrac{aa^\top}{\left\Vert a\right\Vert_2^2}\Bigr\rbrace, & a^\top x>b,\\
    \lbraceI\rbrace, & a^\top x<b,\\
    \operatorname{conv}\Bigl\lbraceI,\ I-\dfrac{aa^\top}{\left\Vert a\right\Vert_2^2}\Bigr\rbrace,
    & a^\top x=b.
  \end{cases}
\end{equation}$$

</div>

<div class="example">

**例题 8.31** 单位 Euclid 球 $$B=\lbracex:\left\Vert x\right\Vert_2\le1\rbrace$$：$$P_B(x)=x/\left\Vert x\right\Vert_2$$（若 $$\left\Vert x\right\Vert_2>1$$）或 $$x$$（若 $$\left\Vert x\right\Vert_2\le1$$）；令 $$w=x/\left\Vert x\right\Vert_2$$： $$\begin{equation}
  \partial(P_B)(x)=
  \begin{cases}
    \Bigl\lbrace\dfrac{I-ww^\top}{\left\Vert x\right\Vert_2}\Bigr\rbrace, & \left\Vert x\right\Vert_2>1,\\
    \lbraceI\rbrace, & \left\Vert x\right\Vert_2<1,\\
    \operatorname{conv}\Bigl\lbrace\dfrac{I-ww^\top}{\left\Vert x\right\Vert_2},\ I\Bigr\rbrace,
    & \left\Vert x\right\Vert_2=1.
  \end{cases}
\end{equation}$$ 二次锥 $$K=\lbrace(t,x):\left\Vert x\right\Vert_2\le t\rbrace$$：对任意 $$V\in\partial_BP_K((t,x))$$， 或者 $$V=0$$，或者 $$V=I_{n+1}$$，或者 $$\begin{equation}
  V=
  \begin{bmatrix}1 & w^\top\\ w & H\end{bmatrix},
  \qquad
  H=(1+\alpha)I_n-\alpha ww^\top,
  \qquad
  \left\vert\alpha\right\vert\le1
\end{equation}$$ （$$w\in\mathbb{R}^n$$ 为单位向量）．

</div>

##### 矩阵谱函数

考虑谱函数 $$F:\mathcal{S}^{n}\to\mathbb{R}\cup\lbrace+\infty\rbrace$$，$$F(X)=f(\lambda(X))$$（$$\lambda$$ 为特征值向量，$$f$$ 绝对对称的适当闭凸函数）．令 $$X=Q\operatorname{Diag}(\lambda(X))Q^\top$$：若 $$f$$ 可微则 $$F$$ 可微且 $$\nabla F(X)=Q\nabla f(\lambda(X))Q^\top$$；邻近算子也从 $$f$$ 继承： $$\begin{equation}
  \operatorname{prox}_{\gamma F}(X)=Q\operatorname{Diag}\bigl(\operatorname{prox}_{\gamma f}
  (\lambda(X))\bigr)Q^\top;
\end{equation}$$ 特别地 $$f(x)=\sum_{i=1}^{n}g(x_i)$$ 时 $$\operatorname{prox}_{\gamma F}(X)=Q\operatorname{Diag}(\operatorname{prox}_{\gamma g}
(\lambda_1),\dots,\operatorname{prox}_{\gamma g}(\lambda_n))Q^\top$$．

<div class="theorem">

**定理 8.31** 设 $$h:\mathbb{R}\to\mathbb{R}$$ 局部利普希茨连续，$$X=Q\operatorname{Diag}(\lambda_1,\dots,\lambda_n)
Q^\top$$，算子 $$T:\mathcal{S}^{n}\to\mathcal{S}^{n}$$ 定义为 $$H(X)=Q\operatorname{Diag}(h(\lambda_1),\dots,
h(\lambda_n))Q^\top$$．则 $$\partial_BH$$ 存在且非空，且对任意 $$J\in\partial_BH$$： $$\begin{equation}
  J(S)=Q\bigl(\Omega\odot(Q^\top S Q)\bigr)Q^\top,
  \qquad \forall S\in\mathcal{S}^{n},
\end{equation}$$ 其中 $$\odot$$ 为 Hadamard 积，$$\Omega\in\mathbb{R}^{n\times n}$$ 的元素为 $$\begin{equation}
  \Omega_{ij}=
  \begin{cases}
    \dfrac{h(\lambda_i)-h(\lambda_j)}{\lambda_i-\lambda_j}, & \lambda_i\ne\lambda_j,\\[8pt]
    \in\partial h(\lambda_i), & \lambda_i=\lambda_j.
  \end{cases}
\end{equation}$$ 于是对 $$P\in\partial_B\bigl(\operatorname{prox}_{\gamma F}\bigr)(X)$$： $$\begin{equation}
  P(S)=Q\bigl(\Omega\odot(Q^\top SQ)\bigr)Q^\top,
  \qquad
  \Omega_{ij}=
  \begin{cases}
    \dfrac{\operatorname{prox}_{\gamma g}(\lambda_i)
    -\operatorname{prox}_{\gamma g}(\lambda_j)}{\lambda_i-\lambda_j},
    & \lambda_i\ne\lambda_j,\\[8pt]
    \in\partial\bigl(\operatorname{prox}_{\gamma g}(\lambda_i)\bigr),
    & \lambda_i=\lambda_j.
  \end{cases}
\end{equation}$$

</div>

<div class="example">

**例题 8.32** 取 $$g=\delta_{\mathbb{R}_+}$$，$$f=\sum_{i=1}^{n}g(x_i)$$，则 $$F$$ 是 $$\mathcal{S}^{n}_+$$ 的 示性函数，$$\operatorname{prox}_{\gamma g}(x)=P_{\mathbb{R}_+}(x)=\max\lbracex,0\rbrace$$， $$\begin{equation}
  P_{\mathcal{S}^{n}_{+}}(X)=Q\operatorname{Diag}\bigl((\lambda_1)^+,\dots,(\lambda_n)^+\bigr)Q^\top.
\end{equation}$$ 定义 $$\alpha=\lbracei:\lambda_i>0\rbrace$$，$$\bar\alpha=\lbracei:\lambda_i\le0\rbrace$$，则 其中一个雅可比矩阵 $$P\in\partial_BP_{\mathcal{S}^{n}_{+}}(X)$$ 具有形式 $$\begin{equation}
  P(S)=Q\bigl(\Omega\odot(Q^\top SQ)\bigr)Q^\top,
  \qquad
  \Omega=
  \begin{bmatrix}
    \Omega_{\alpha\alpha} & k_{\alpha\bar\alpha}\\
    k_{\alpha\bar\alpha}^\top & 0
  \end{bmatrix},
\end{equation}$$ $$\Omega_{\alpha\alpha}$$ 元素全为 $$1$$， $$(k_{\alpha\bar\alpha})_{ij}=\frac{\lambda_i}{\lambda_i-\lambda_j}$$ （$$i\in\alpha$$，$$j\in\bar\alpha$$）------§7.2.5 与 §8.5 中半定规划算法 用到的投影 $$\mathop{\mathrm{Proj}}_{\mathcal{S}^{n}_{+}}$$ 的半光滑结构即来源于此．

</div>

#### 半光滑性

<div class="definition">

**定义 8.9**  设 $$F:\Omega\to\mathbb{R}^m$$ 局部利普希茨连续，称 $$F$$ 在 $$x$$ 处是 **半光滑**的，如果： (1) $$F$$ 在 $$x$$ 点方向可微； (2) 对任意的 $$d$$ 和 $$J\in\partial F(x+d)$$： $$\begin{equation}
  \left\Vert F(x+d)-F(x)-Jd\right\Vert=o(\left\Vert d\right\Vert)
  \qquad (d\to0).
\end{equation}$$ 若 (2) 被替换成 $$\left\Vert F(x+d)-F(x)-Jd\right\Vert=O(\left\Vert d\right\Vert^2)$$，则称 $$F$$ 在 $$x$$ 处是 **强半光滑**的．

</div>

（一些文献中半光滑的定义不含 (1)，对算法设计无本质影响．）半光滑性 与强半光滑性具有很好的运算性质：在数乘、求和与复合运算下封闭； 向量值函数半光滑（强半光滑）当且仅当每个分量函数半光滑（强半光滑）； 由 Moreau 分解，函数与其共轭函数具有相同的半光滑性．常见例子：

<div class="example">

**例题 8.33** 光滑函数、所有的凸函数、分段连续可微的函数都是半光滑的．

</div>

<div class="example">

**例题 8.34** 具有利普希茨连续梯度的可微函数、$$p$$ 范数 $$\left\Vert\cdot\right\Vert_p$$、分段线性 函数是强半光滑的．

</div>

很多函数的邻近算子具有半光滑性/强半光滑性，这为设计超线性收敛的 牛顿算法提供了可能：

<div class="example">

**例题 8.35** $$\ell_1$$ 范数的邻近算子 $$\phi(x)=\operatorname{sign}(x)\odot
\max(\left\vert x\right\vert-\mu t,0)$$ 是强半光滑的．

</div>

**Proof** **（）** 只证一维情形（多维类似）．广义雅可比为 $$\begin{equation}
  \partial\phi(x)=
  \begin{cases}
    \lbrace1\rbrace,      & \left\vert x\right\vert>\mu t,\\
    [0,1],      & \left\vert x\right\vert=\mu t,\\
    \lbrace0\rbrace,      & \left\vert x\right\vert<\mu t.
  \end{cases}
\end{equation}$$ 当 $$\left\vert x\right\vert\ne\mu t$$ 时 $$\phi$$ 可微，强半光滑；只需验证不可微点．对 $$x=\mu t$$：若 $$d>0$$，则 $$x+d>\mu t$$，$$\partial\phi(x+d)=\lbrace1\rbrace$$， $$\left\vert\phi(x+d)-\phi(x)-Jd\right\vert=0$$；若 $$-2\mu t<d<0$$，则 $$-\mu t<x+d<\mu t$$，$$\partial\phi(x+d)=\lbrace0\rbrace$$， $$\left\vert\phi(x+d)-\phi(x)-Jd\right\vert=\left\vert(x+d-\mu t)-0-d\right\vert
=\mu t-x=0$$．因此在 $$x=\mu t$$ 处强半光滑（$$x=-\mu t$$ 类似）．综上 $$\phi$$ 强半光滑．

<div class="example">

**例题 8.36** 函数 $$f:\mathcal O\to\mathbb{R}^m$$ 称为**分段 $$C^k$$** 的（$$k\in[1,\infty]$$）， 如果 $$f$$ 在每点 $$\bar x$$ 连续，且在 $$\bar x$$ 的邻域 $$V\subset\mathcal O$$ 内 $$f(x)\in\lbracef^1(x),\dots,f^N(x)\rbrace$$（$$f^i$$ 为一串 $$C^k$$ 函数）．分段 $$C^1$$ 的函数是半光滑的；分段 $$C^2$$ 的函数还是强半光滑的．

</div>

<div class="example">

**例题 8.37** 示性函数的邻近算子（即集合上的投影算子）：多边形集合上的投影是分段 线性的，故强半光滑；对称锥上的投影是强半光滑的------半定锥和二阶锥上的 投影都强半光滑．对一般的凸函数，其邻近算子不一定半光滑；但可以证明 $$f$$ 的邻近算子是（强）半光滑的当且仅当其上方图 $$\operatorname{epi}f$$ 上的投影算子 是（强）半光滑的------研究一般凸函数近端的半光滑性只需考虑上图投影．

</div>

### 半光滑牛顿算法

#### 求解非光滑线性方程组的半光滑牛顿算法

一个基本观察：许多算子分裂算法（近似点梯度法、DRS 算法等）等价于一个 不动点迭代，其可诱导一个*非线性方程组* $$\begin{equation}
  F(z)=0,
  \qquad
  F(z)=z-T(z),
\end{equation}$$ $$T$$ 为算子分裂算法对应的不动点映射；求解 (8.540) 即能 求解原始复合优化问题．设 $$F$$ 局部利普希茨连续，则广义雅可比存在．取 $$F$$ 在 $$z^k$$ 处任意的广义雅可比 $$J^k\in\partial F(z^k)$$，若 $$J^k$$ 可逆， 基本的迭代格式为 $$\begin{equation}
  z^{k+1}=z^k-J_k^{-1}F(z^k).
\end{equation}$$ 经典牛顿法具有局部超线性收敛性；为实现超线性收敛并不需要光滑性这么强 的条件------半光滑性即可保证牛顿型算法超线性或二次收敛（文献 Potra--Engelke 分析了其局部收敛性）．为保证局部收敛，文献中假定了 $$F$$ 在最优解 $$z^*$$ 处广义雅可比的所有元素非奇异，这在实际中往往较强（例如 一维问题 $$F(z)=\left\Vert z\right\Vert_1$$ 的半光滑牛顿法收敛，但在 $$z^*=0$$ 处 $$0\in\partial F(0)$$，雅可比并不都非奇异）．因此取*B-次微分*中的 特殊雅可比 $$J^k\in\partial_BF(z^k)$$ 并用更弱的假设．

实际使用中还有三个问题：广义雅可比矩阵不一定非奇异；求解牛顿系统代价 高；如何保证全局收敛．幸运的是，应用中的 $$F$$ 都具有较好的性质------ *半光滑*与*单调*（很多算子分裂算法作用在常见复合问题上时都 满足）．假定 $$F$$ 半光滑且单调，设计实际的半光滑牛顿算法：由定理 8.29，$$\partial_BF(z^k)$$ 中每个元素半正定，可 运用**正则化**的牛顿算法确定方向------对当前点 $$z^k$$，选任意 $$J^k\in\partial_BF(z^k)$$，求解线性方程组 $$\begin{equation}
  (J^k+\mu^kI)d=-F^k,
  \qquad
  F^k=F(z^k),\quad \mu^k=\lambda\left\Vert F^k\right\Vert,
\end{equation}$$ 其中 $$\lambda>0$$ 为正则化参数．为提高效率，牛顿系统不需精确求解：定义 $$r^k\coloneqq(J^k+\mu^kI)d^k+F^k$$，每步用共轭梯度法等迭代算法近似求解， 使 $$d^k$$ 满足 $$\begin{equation}
  \left\Vert r^k\right\Vert\le\tau\min\bigl\lbrace1,\ \lambda\left\Vert F^k\right\Vert\left\Vert d^k\right\Vert\bigr\rbrace.
\end{equation}$$ 然后得到牛顿试探点 $$u^k=z^k+d^k$$．半光滑牛顿法局部收敛快，但迭代点 远离收敛域时可能表现不好------设计**保护策略**保证全局收敛：选择 $$0<\nu<1$$ 与固定整数 $$\zeta>0$$；若残差在最近几步中有充分下降 $$\begin{equation}
  \left\Vert F(u^k)\right\Vert\le\nu\max_{\max(1,k-\zeta+1)\le j\le k}
  \left\Vert F(z^j)\right\Vert,
\end{equation}$$ 则取牛顿方向 $$z^{k+1}=u^k$$；否则进行一次不动点迭代 $$z^{k+1}=z^k-\beta F(z^k)$$（$$\beta\in(0,1/L)$$，$$L$$ 为 $$F$$ 的利普希茨 常数）： $$\begin{equation}
  z^{k+1}=
  \begin{cases}
    u^k, & \text{若 } u^k \text{ 满足 \eqref{eq:ch8-ssn-watchdog}}
    \quad\text{[牛顿步]},\\
    z^k-\beta F(z^k), & \text{否则}\quad\text{[不动点迭代步]}.
  \end{cases}
\end{equation}$$

<div class="algorithm">

**算法 36**

**输入**：参数 $$0<\tau,\nu<1$$，$$\lambda>0$$，$$\zeta>0$$；$$z^0$$； $$k=0$$．

<div class="algorithmic">

选择 $$J^k\in\partial_BF(z^k)$$； 近似求解线性系统 (8.542) 使 $$d^k$$ 满足 (8.543)； 计算 $$u^k=z^k+d^k$$； 根据 (8.545) 更新 $$z^{k+1}$$； $$k\leftarrow k+1$$；

</div>

</div>

#### 求解优化问题的半光滑牛顿算法

考虑凸可微（但非二阶可微）优化问题 $$\begin{equation}
  \min_x\ f(x)
\end{equation}$$ （$$f$$ 凸可微、梯度利普希茨连续），最优性条件 $$\nabla f(x)=0$$------求解 优化问题即求解一个非光滑方程组．若 $$\nabla f$$ 半光滑且 $$J^k\in\partial_B(\nabla f(x^k))$$ 非奇异，可做迭代 $$x^{k+1}=x^k-J_k^{-1}\nabla f(x^k)$$------这是方程版半光滑牛顿法的直接 推广；但 $$\nabla f$$ 有特殊性质：广义雅可比矩阵都*对称*（解牛顿 方向更容易），且全局策略可用 $$f$$ 的函数值判断是否接受迭代（比只用 $$\left\Vert\nabla f\right\Vert$$ 更灵活）；$$f$$ 凸时 $$\nabla f$$ 单调，所有广义雅可比 半正定（定理 8.29）；$$f$$ 强凸时 $$\nabla f$$ 强 单调，广义雅可比都正定------这保证半光滑牛顿法（或正则化版本）在全空间 良定义且牛顿方向是 $$f$$ 的下降方向．

针对凸优化问题（可微但非二阶可微），广义海瑟矩阵对称半正定，选任意 $$J^k\in\partial_B(\nabla f(x^k))$$ 解线性方程组 $$\begin{equation}
  (J^k+\mu^kI)d^k=-\nabla f(x^k)
\end{equation}$$ 得半光滑牛顿方向（下降方向），可用 **Armijo 线搜索**选步长------取 最小的非负整数 $$m^k$$ 满足 $$\begin{equation}
  f\bigl(x^k+\rho^{m^k}d^k\bigr)
  \le f(x^k)-\sigma\rho^{m^k}\nabla f(x^k)^\top\nabla f(x^k),
\end{equation}$$ （$$\rho,\sigma\in(0,1)$$ 给定），迭代点 $$x^{k+1}=x^k+\rho^{m^k}d^k$$．

<div class="algorithm">

**算法 37**

**输入**：参数 $$0<\sigma,\rho<1$$；$$x^0$$；$$k=0$$．

<div class="algorithmic">

选择 $$J^k\in\partial_B\bigl(\nabla f(x^k)\bigr)$$； 选取 $$\mu^k>0$$ 求解牛顿方向 $$d^k$$ 满足 (8.547)； 选取最小的非负整数 $$m^k$$ 满足 (8.548)； 更新 $$x^{k+1}=x^k+\rho^{m^k}d^k$$； $$k\leftarrow k+1$$；

</div>

</div>

### 应用举例

##### 1. LASSO 问题：基于近似点梯度法的半光滑牛顿算法

LASSO 问题 $$\min_x\ \mu\left\Vert x\right\Vert_1+\frac12\left\Vert Ax-b\right\Vert^2$$：令 $$f(x)=\mu\left\Vert x\right\Vert_1$$，$$h(x)=\frac12\left\Vert Ax-b\right\Vert^2$$．近似点梯度法等价于 求解非线性方程组 $$\begin{equation}
  F(x)=x-\operatorname{prox}_{tf}\bigl(x-t\nabla h(x)\bigr)=0.
\end{equation}$$ $$F$$ 的一个广义雅可比矩阵为 $$\begin{equation}
  J(x)=I-M(x)\bigl(I-t\nabla^2h(x)\bigr),
\end{equation}$$ 其中 $$M(x)\in\partial\operatorname{prox}_{tf}\bigl(x-t\nabla h(x)\bigr)$$、 $$\nabla^2h(x)$$ 为 $$h$$ 的广义海瑟矩阵．$$f$$ 的邻近算子为收缩算子 $$\bigl(\operatorname{prox}_{tf}(x)\bigr)_i=\operatorname{sign}(x_i)
\max(\left\vert x_i\right\vert-\mu t,0)$$，故 $$M(x)$$ 可取对角矩阵： $$\begin{equation}
  \bigl(M(x)\bigr)_{ii}=
  \begin{cases}
    1, & \left\vert(x-t\nabla h(x))_i\right\vert>\mu t,\\
    0, & \text{否则}.
  \end{cases}
\end{equation}$$ 定义指标集合 $$\begin{align}
  I(x)&\coloneqq\bigl\lbracei:\ \left\vert(x-t\nabla h(x))_i\right\vert>t\mu\bigr\rbrace
  =\lbracei:\ (M(x))_{ii}=1\rbrace,\\
  O(x)&\coloneqq\bigl\lbracei:\ \left\vert(x-t\nabla h(x))_i\right\vert\le t\mu\bigr\rbrace
  =\lbracei:\ (M(x))_{ii}=0\rbrace,
\end{align}$$ 雅可比矩阵具有分块结构： $$\begin{equation}
  J(x)=
  \begin{pmatrix}
    t\bigl(\partial^2h(x)\bigr)_{II} & t\bigl(\partial^2h(x)\bigr)_{IO}\\
    0 & I
  \end{pmatrix}
\end{equation}$$ （指标按 $$I,O$$ 重排）．利用分块结构降低牛顿系统求解复杂度：记 $$I=I(x^k)$$，$$O=O(x^k)$$，牛顿系统 (8.547) （作用在 $$s^k=d^k$$ 上）为 $$\begin{equation}
  (1+\mu^k)s^k_O=-F^k_O,
  \qquad
  \bigl(t(\partial^2h(x))_{II}+\mu I\bigr)s^k_I
  +t(\partial^2h(x))_{IO}s^k_O=-F^k_I,
\end{equation}$$ 等价形式： $$\begin{equation}
  s^k_O=-\frac{1}{1+\mu^k}F^k_O,
  \qquad
  \bigl(t(\partial^2h(x))_{II}+\mu I\bigr)s^k_I
  =-F^k_I-t(\partial^2h(x))_{IO}s^k_O.
\end{equation}$$ 即*不需要求解原始大线性方程组，只需解规模为 $$\left\vert I\right\vert$$ 的方程组*； $$\ell_1$$ 项保证解稀疏而 $$I$$ 恰是解非零元的位置，实际问题中 $$\left\vert I\right\vert$$ 非常小------算法很好地利用了问题的稀疏结构，求解牛顿方向代价很小．数值 实验（§8.2 的测试问题）：基于近似点梯度法的半光滑牛顿算法呈现 *超线性收敛*，快于 PGA 与 FISTA 等一阶算法（讲义图 8.13）．

##### 2. 基追踪问题

基追踪（BP）问题 $$\min_x\left\Vert x\right\Vert_1\ \ \text{s.t.}\ \ Ax=b$$（$$A$$ 行满秩）：令 $$f(x)=I_\Omega(Ax-b)$$（$$\Omega=\lbrace0\rbrace$$）与 $$h(x)=\left\Vert x\right\Vert_1$$------两项均 不光滑的复合优化问题．两种半光滑牛顿算法：

*基于 DRS 的半光滑牛顿算法*：DRS 不动点映射对应的方程组为 $$\begin{equation}
  F(z)=\operatorname{prox}_{th}(z)
  -\operatorname{prox}_{tf}\bigl(2\operatorname{prox}_{th}(z)-z\bigr)=0.
\end{equation}$$ 为简化近端计算，假定 $$AA^\top=I$$：则 $$\begin{equation}
  \operatorname{prox}_{tf}(z)
  =(I-A^\top A)z+A^\top\bigl(\operatorname{prox}_{I_\Omega}(Az-b)+b\bigr)
  =z-A^\top(Az-b),
\end{equation}$$ 其一个广义雅可比 $$D\in\partial\operatorname{prox}_{tf}(\cdot)$$ 为 $$D=I-A^\top A$$；$$\operatorname{prox}_{th}$$ 的广义雅可比 $$M(z)$$ 为对角 矩阵（对角元 $$1$$ 若 $$\left\vert z_i\right\vert>t$$ 否则 $$0$$）．于是 $$\begin{equation}
  J(z)=M(z)+D\bigl(I-2M(z)\bigr).
\end{equation}$$ 令 $$W=I-2M(z)$$，$$H=W+M(z)+\mu I$$，用 SMW 公式： $$\begin{equation}
  (J(z)+\mu I)^{-1}=(H-A^\top AW)^{-1}
  =H^{-1}+H^{-1}A^\top\bigl(I-AWH^{-1}A^\top\bigr)^{-1}AWH^{-1}.
\end{equation}$$ $$W,H$$ 的对角元：$$W_{ii}=-1$$（$$\left\vert z_i\right\vert>t$$）否则 $$1$$； $$H_{ii}=\mu$$（$$\left\vert z_i\right\vert>t$$）否则 $$1+\mu$$；$$WH^{-1}
=\frac{1}{1+\mu}I-S$$（$$S$$ 对角，$$S_{ii}=\frac1\mu+\frac{1}{1+\mu}$$ 若 $$\left\vert z_i\right\vert>t$$ 否则 $$0$$），故 $$I-AWH^{-1}A^\top=\bigl(1-\frac{1}{1+\mu}\bigr)I+ASA^\top$$．定义指标集 $$I(z)=\lbracei:\left\vert z_i\right\vert>t\rbrace$$，$$O(z)=\lbracei:\left\vert z_i\right\vert\le t\rbrace$$，则 $$\begin{equation}
  ASA^\top=\Bigl(\frac1\mu+\frac{1}{1+\mu}\Bigr)A_{I(z)}A_{I(z)}^\top
\end{equation}$$ （$$A_{I(z)}$$ 为 $$A$$ 的 $$I(z)$$ 列子矩阵），可推出 $$I-AWH^{-1}A^\top$$ 半正定；使用子矩阵 $$A_{I(z)}$$ 可避免使用大矩阵 $$A$$，降低求解牛顿方向的计算复杂度．数值实验（随机稀疏解 $$n=512^2
=262144$$，$$k=5553$$ 个非零元，$$m=n/8=32768$$ 个随机余弦测量 $$Ax=(\mathrm{dct}(x))_J$$，噪声 $$\sigma=0.1$$）：迭代初期 DRS-SSN 与 ADMM 收敛率相似，但 DRS-SSN 对*高精度解*收敛更快，呈二次或超 线性收敛（讲义图 8.14）．

*基于增广拉格朗日函数法的半光滑牛顿算法*：对 (8.540) 用对偶问题的增广拉格朗日函数法（§7.2.4 的迭代 (7.117) 式 (7.2.30)）------其第一步 $$y^{k+1}$$ 无显式解，但 $$L_{\sigma^k}(y,\lambda^k)$$ 关于 $$y$$ 连续可微： $$\begin{equation}
  \nabla_yL_{\sigma^k}(y,\lambda^k)=-b+\sigma^kA\,
  \psi\Bigl(A^\top y+\frac{\lambda^k}{\sigma^k}\Bigr)
\end{equation}$$ （$$\psi(x)=\operatorname{sign}(x)\max\lbrace\left\vert x\right\vert-1,0\rbrace$$），且*半 光滑*，其一个广义海瑟矩阵为 $$\begin{equation}
  J^k=AD^kA^\top,
\end{equation}$$ 其中 $$D^k$$ 为对角矩阵： $$\begin{equation}
  (D^k)_{ii}=
  \begin{cases}
    1, & \left\vert(A^\top y^{k+1}+\lambda^k/\sigma^k)_i\right\vert>1,\\
    0, & \left\vert(A^\top y^{k+1}+\lambda^k/\sigma^k)_i\right\vert\le1.
  \end{cases}
\end{equation}$$ 半光滑牛顿法可以很容易地求解 §7.2.4 中的子问题，广义雅可比有很好的 稀疏性（对角 $$+$$ 低秩），能用较小的代价求解牛顿步．

##### 3. 半定规划

半定规划问题（§7.2.5 记号）： $$\begin{equation}
  \max_{X\in\mathcal{S}^{n}}\ \left\langle C,\,\ X\right\rangle\ \ \text{s.t.}\ \ \mathcal{A}X=b,\ X\succeq0,
\end{equation}$$ （$$\mathcal A:\mathcal{S}^{n}\to\mathbb{R}^m$$，$$(\mathcal AX)_i=\left\langle A_i,\,\ X\right\rangle$$；共轭算子 $$\mathcal A^*y=\sum_{p=1}^{m}A_py_p$$．）基于 DRS 的半光滑牛顿算法：令 $$\begin{equation}
  f(X)=-\left\langle C,\,\ X\right\rangle+I_{\lbrace\mathcal AX=b\rbrace}(X),
  \qquad
  h(X)=I_K(X),
  \qquad K=\lbraceX:\ X\succeq0\rbrace,
\end{equation}$$ DRS 的不动点形式给出方程组 $$\begin{equation}
  F(Z)=\operatorname{prox}_{th}(Z)
  -\operatorname{prox}_{tf}\bigl(2\operatorname{prox}_{th}(Z)-Z\bigr)=0,
\end{equation}$$ 容易得到 $$F$$ 是强半光滑和单调的，$$\partial F$$ 的每个元素都半正定，可用 半光滑牛顿法求解．两个近端算子的显式形式： $$\begin{equation}
  \operatorname{prox}_{tf}(Y)=(Y+tC)-\mathcal A^*(\mathcal AY+t
  \mathcal AC-b),
  \qquad
  \operatorname{prox}_{th}(Z)=Q_\alpha\Sigma_\alpha Q_\alpha^\top,
\end{equation}$$ 其中 $$Q\Sigma Q^\top=\bigl[Q_\alpha\ \ Q_{\bar\alpha}\bigr]
\bigl[\begin{smallmatrix}\Sigma_\alpha&0\\0&\Sigma_{\bar\alpha}
\end{smallmatrix}\bigr]\bigl[\begin{smallmatrix}Q_\alpha^\top\\
Q_{\bar\alpha}^\top\end{smallmatrix}\bigr]$$ 为特征值分解（$$\alpha$$ 为 正特征值指标集）．算子 $$\mathcal D=I-\mathcal A^*\mathcal A$$ 是 $$\operatorname{prox}_{tf}$$ 的广义雅可比；$$\operatorname{prox}_{th}$$ 的 广义雅可比用定理 8.31 的 Loewner 形式： $$\begin{equation}
  M(Z)[S]=Q\bigl(\Omega\odot(Q^\top SQ)\bigr)Q^\top,
  \qquad
  \Omega=
  \begin{bmatrix}
    E_{\alpha\alpha} & k_{\alpha\bar\alpha}\\
    k_{\alpha\bar\alpha}^\top & 0
  \end{bmatrix},
  \quad
  k_{ij}=\frac{\lambda_i}{\lambda_i-\lambda_j}.
\end{equation}$$ 定义替代形式 $$\begin{equation}
  \hat\partial F(Z)=\partial\operatorname{prox}_{th}(Z)
  +\mathcal D\bigl(I-2\partial\operatorname{prox}_{th}(Z)\bigr),
  \qquad
  \mathcal J(Z)=M(Z)+\mathcal D\bigl(I-2M(Z)\bigr)\in\hat\partial F(Z),
\end{equation}$$ 由广义雅可比理论（Clarke 书推论）有 $$\hat\partial F(Z)[S]=\partial F(Z)[S]\ \forall S\succeq0$$------在 矩阵--向量乘意义下 $$\mathcal J$$ 可当作 $$F$$ 的广义雅可比使用．

$$\mathcal J$$ 非对称且维数很大，用 SMW 公式把牛顿方向的线性方程组 转化为一个*更小的对称*方程组：向量化 $$S$$ 后 $$M(Z)=\tilde Q\Lambda\tilde Q^\top$$ （$$\tilde Q=Q\otimes Q$$，$$\Lambda=\operatorname{Diag}(\operatorname{vec}(\Omega))$$）， $$\mathcal D=I-\mathcal A^\top\mathcal A$$（矩阵形式），令 $$W=I-2M(Z)$$，$$H=Q\tilde{}\,((\mu^k+1)I-\Lambda)\tilde Q^\top$$，则 $$\begin{equation}
  (\mathcal J^k+\mu^kI)^{-1}=(H-\mathcal A^\top\mathcal AW)^{-1}
  =H^{-1}+H^{-1}\mathcal A^\top
  \bigl(I-\mathcal AWH^{-1}\mathcal A^\top\bigr)^{-1}
  \mathcal AWH^{-1}.
\end{equation}$$ 定义 $$T=\tilde QL\tilde Q^\top$$（$$L$$ 对角， $$L_{ii}=\frac{\Lambda_{ii}\mu^k}{\mu^k+1-\Lambda_{ii}}$$），利用 $$H^{-1}=\frac{1}{\mu^k+1}I+\frac{1}{\mu^k(\mu^k+1)}T$$ 与 $$WH^{-1}=\frac{1}{1+\mu^k}I-\bigl(\frac1{\mu^k}+\frac{1}{\mu^k+1}\bigr)T$$ 得 $$\begin{equation}
  (\mathcal J^k+\mu^kI)^{-1}
  =\frac{\mu^kI+T}{\mu^k(\mu^k+1)}
  \Bigl[I+\mathcal A^\top\Bigl(\frac{(\mu^k)^2}{2\mu^k+1}I
  +\mathcal A\mathcal A^\top\Bigr)^{-1}\mathcal A
  \Bigl(\frac{\mu^k}{2\mu^k+1}I-T\Bigr)\Bigr],
\end{equation}$$ 因此牛顿方向的求解可化为对称线性方程组 $$\begin{equation}
  \Bigl(\frac{(\mu^k)^2}{2\mu^k+1}I+\mathcal A\mathcal A^\top\Bigr)d_s
  =a,
  \qquad
  a=-\mathcal A\Bigl(\frac{\mu^k}{2\mu^k+1}I-T\Bigr)\operatorname{vec}
  (F^k),
\end{equation}$$ 其系数矩阵是 $$m\times m$$ 的，而原方程组的系数矩阵是 $$n^2\times n^2$$ 的（通常 $$m\ll n^2$$）；可用共轭梯度（CG）或对称 QMR 算法迭代求解， 其中算子 $$T$$ 作用在 $$S$$ 上： $$\begin{equation}
  T(Z)[S]=Q\bigl(\Omega_0\odot(Q^\top SQ)\bigr)Q^\top,
  \qquad
  \Omega_0=
  \begin{bmatrix}
    E_{\alpha\alpha} & l_{\alpha\bar\alpha}\\
    l_{\alpha\bar\alpha}^\top & 0
  \end{bmatrix},
  \quad
  l_{ij}=\frac{\mu^kk_{ij}}{\mu^k+1-k_{ij}},
\end{equation}$$ 可进一步写成 $$\Upsilon=T(Z)[S]=G+G^\top$$（$$G=Q_\alpha\bigl[\frac12
(UQ_\alpha^\top)+l_{\alpha\bar\alpha}\odot(UQ_{\bar\alpha})\bigr]$$， $$U=Q_\alpha^\top S$$）以高效计算（浮点运算 $$8\left\vert\alpha\right\vert n^2$$；若 $$\left\vert\alpha\right\vert$$ 大则用等价形式 $$\Upsilon=S-Q\bigl((E-\Omega_0)\odot
(Q^\top SQ)\bigr)Q^\top$$，需 $$8\left\vert\bar\alpha\right\vert n^2$$------$$\left\vert\alpha\right\vert$$ 或 $$\left\vert\bar\alpha\right\vert$$ 较小时都高效）．整个近似求解牛顿方程的过程：

<div class="algorithm">

**算法 38**

<div class="algorithmic">

计算 $$a=-\mathcal A\bigl(\frac{\mu^k}{2\mu^k+1}I-T\bigr)F^k$$； 用 CG 或对称 QMR 近似求解 $$\bigl(\frac{(\mu^k)^2}{2\mu^k+1}I+\mathcal A\mathcal A^\top\bigr)
       d_s=a$$（矩阵--向量乘通过 $$T(Z)[S]$$ 的高效形式计算）； 计算牛顿方向 $$S^k=\frac{1}{\mu^k(\mu^k+1)}(\mu^kI+T)\bigl(-F^k
       +\mathcal A^*d_s\bigr)$$；

</div>

</div>

*基于增广拉格朗日乘子法的半光滑牛顿算法*（最早用于半定规划）： 从 $$X^0$$ 开始，增广拉格朗日算法求解 SDP 对偶问题： $$\begin{equation}
  y^{k+1}=\operatorname*{arg\,min}\ \tilde L_{\sigma^k}(y,\ X^k),
  \qquad
  X^{k+1}=\Pi_{\mathcal{S}^{n}_{+}}\bigl(X^k-\sigma(\mathcal A^*y^{k+1}-C)\bigr),
\end{equation}$$ 其中 $$\begin{equation}
  \tilde L_\sigma(y,X)=b^\top y+\frac{1}{2\sigma}
  \Bigl(\left\Vert\Pi_{\mathcal{S}^{n}_{+}}\bigl(X-\sigma(\mathcal A^*y-C)\bigr)\right\Vert_F^2
  -\left\Vert X\right\Vert_F^2\Bigr).
\end{equation}$$ 子问题用半光滑牛顿法求解：$$\tilde L_\sigma$$ 关于 $$y$$ 的梯度与广义 海瑟矩阵为 $$\begin{equation}
  \nabla_y\tilde L_\sigma(y,X)=b-\mathcal A\,\Pi_{\mathcal{S}^{n}_{+}}
  \bigl(X-\sigma(\mathcal A^*y-C)\bigr),
  \qquad
  V\in\sigma\,\mathcal A\,\partial\Pi_{\mathcal{S}^{n}_{+}}
  \bigl(X-\sigma(\mathcal A^*y-C)\bigr)\,\mathcal A^*;
\end{equation}$$ 半光滑牛顿步为 $$(V+\varepsilon I)d=\nabla_yL_\sigma(y,X)$$（$$\varepsilon$$ 为小常数）------线性方程组与上面 DRS 版本的结构相似但数值不同．

### 收敛性分析

<div class="supp">

分析算法 36 与算法 37 的收敛性： 全局策略如何保证全局收敛，半光滑性质如何给出快速局部收敛．

</div>

<div class="definition">

**定义 8.10** 如果 $$F$$ 在 $$z$$ 点的所有 B-次微分元素 $$J\in\partial_BF(z)$$ 都是非奇异 的，那么称 $$F$$ 在 $$z$$ 点是 **BD-正则**的．

</div>

BD-正则性是非光滑方法局部收敛性分析的普遍假设（不同文献术语稍有 不同：有的称之为强 BD-正则性，BD-正则性是更弱的条件）．在 BD-正则点 附近：$$\partial_BF(z)$$ 中所有 $$J$$ 非奇异且 $$\left\Vert J^{-1}\right\Vert$$ 一致有界、 $$F^{-1}$$ 局部单值（局部误差界）等性质成立（引理 8.9）．

##### 1. 局部收敛性：半光滑性的作用

设 $$z^*$$ 满足 $$F(z^*)=0$$ 且 $$F$$ 在 $$z^*$$ 半光滑、BD-正则，迭代 $$z^{k+1}=z^k-J_k^{-1}F(z^k)$$（$$J^k\in\partial_BF(z^k)$$）良定义且 $$\begin{equation}
  \left\Vert z^{k+1}-z^*\right\Vert
  =\left\Vert z^k-J_k^{-1}F(z^k)-z^*\right\Vert
  \le\left\Vert J_k^{-1}\right\Vert\cdot\left\Vert F(z^k)-F(z^*)-J^k(z^k-z^*)\right\Vert
  =o\bigl(\left\Vert z^k-z^*\right\Vert\bigr),
\end{equation}$$ 最后一个等式来源于半光滑性；若 $$F$$ 强半光滑则上式为 $$O\bigl(\left\Vert z^k-z^*\right\Vert^2\bigr)$$------即*超线性/二次局部收敛*．

<div class="theorem">

**定理 8.32** 设 $$F$$ 在集合 $$S=\lbracez:\left\Vert z-z^0\right\Vert\le r\rbrace$$ 上半光滑，且对任意雅可比 $$J\in\partial F(z)$$ 非奇异、$$\left\Vert J^{-1}\right\Vert\le C$$；若对任意 $$x,y\in S$$ 和 $$J\in\partial F(x)$$ 有 $$\left\Vert F(y)-F(x)-J(y-x)\right\Vert\le\beta\left\Vert y-x\right\Vert$$，其中 $$\alpha=\beta C$$ 且 $$C\left\Vert F(x^0)\right\Vert\le r(1-\alpha)$$，则迭代 $$z^{k+1}=z^k-J_k^{-1}F(z^k)$$ 始终落在 $$S$$ 中并收敛到 $$F$$ 在 $$S$$ 中的 唯一解，且 $$\left\Vert z^k-z^*\right\Vert\le\frac{\alpha}{1-\alpha}
\left\Vert z^k-z^{k-1}\right\Vert$$．

</div>

值得注意的是，定理 8.32 更多是理论上的意义------ 其条件在实际应用中往往不易验证，因此实际算法需要针对问题的全局性策略 （算法 36 的 watchdog 策略与算法 37 的 Armijo 策略）．

##### 2. 算法 36 的收敛性

**（）**   最优解集合 $$Z^*$$ 非空；$$F:\mathbb{R}^n\to\mathbb{R}^n$$ 单调，相应的不动点算子是 $$\alpha$$-平均的（$$\alpha\in(0,1]$$）．

若 $$T$$ 是 $$\alpha$$-平均的，可推出 $$F$$ 全局利普希茨连续且利普希茨常数 $$L\le2\alpha$$，因此对任意 $$k$$ 和 $$J^k\in\partial_BF(z^k)$$ 有 $$\left\Vert J^k\right\Vert\le L$$．这些性质对常见算子分裂算法都成立（近似点梯度法、 DRS 算法等）；注意该假设对全局收敛是充分的，$$F$$ 的半光滑性在本小节的 全局收敛证明中并未被使用．

<div class="theorem">

**定理 8.33** 设假设 8.10.4 成立，$$\lbracez^k\rbrace$$ 为算法 36 产生的迭代序列，则残差收敛到 0：$$\lim_{k\to\infty}\left\Vert F(z^k)\right\Vert=0$$．

</div>

**Proof** **（）** 若牛顿步的数目有限，则从某一步起整个迭代过程均为不动点迭代，由相关 文献结论（不动点迭代残差不增）有 $$\lim_k\left\Vert F(z^k)\right\Vert=0$$；只需考虑 牛顿步数目无限的情形．

不动点迭代步后残差不增：$$\left\Vert F(z^{k+1})\right\Vert\le\left\Vert F(z^k)\right\Vert$$．定义 $$\begin{equation}
  \bar F^k=\max_{k-\zeta+1\le j\le k}\left\Vert F(z^j)\right\Vert,
  \qquad k\ge\zeta.
\end{equation}$$ 不动点迭代步：$$\left\Vert F(z^{k+1})\right\Vert\le\left\Vert F(z^k)\right\Vert\le\bar F^k$$；牛顿步： $$\left\Vert F(z^{k+1})\right\Vert\le\nu\bar F^k$$（由 watchdog 条件 (8.544)）．因此 $$\bar F^k$$ 不增： $$\begin{equation}
  \bar F^{k+1}\le\max\bigl\lbrace\left\Vert F(z^{k+1})\right\Vert,\ \bar F^k\bigr\rbrace
  \le\max\lbrace\nu,1\rbrace\,\bar F^k=\bar F^k.
\end{equation}$$ 最后证明：若第 $$k$$ 步是成功的牛顿步，则 $$\bar F^{k+\zeta}\le\nu\bar F^k$$ ------只需证 $$\left\Vert F(z^{k+j})\right\Vert\le\nu\bar F^k$$ 对所有 $$1\le j\le\zeta$$： $$j=1$$ 时即牛顿步条件；$$j=2$$ 时分两种情形------第 $$(k+1)$$ 步是不动点迭代 步则 $$\left\Vert F(z^{k+2})\right\Vert\le\left\Vert F(z^{k+1})\right\Vert\le\nu\bar F^k$$，是牛顿步则 $$\left\Vert F(z^{k+2})\right\Vert\le\nu\bar F^{k+1}\le\nu\bar F^k$$（$$\bar F^k$$ 不 增）；继续同样的论证可得 $$2<j\le\zeta$$ 时也成立．结合成功牛顿步无限 与 $$\bar F^k$$ 不增，有 $$\lim_k\bar F^k=0$$，推出 $$\lim_{k\to\infty}\left\Vert F(z^k)\right\Vert=0$$．

**（）**   映射 $$F$$ 半光滑且 BD-正则（广义雅可比的所有元素非奇异）．

由于邻近算子在许多有趣的应用中都是（强）半光滑的，算子分裂算法诱导的 映射 $$F$$ 的半光滑性通常满足；BD-正则性是非光滑方法局部收敛性分析的 普遍假设（其性质见引理 8.9）．

<div class="theorem">

**定理 8.34** 设假设 8.10.4 与 8.10.4 成立，正则 参数 $$\lambda^k$$ 有上界 $$\bar\lambda$$，则对 $$z^k$$ 充分接近聚点 $$z^*$$ （$$F(z^*)=0$$）时 $$\left\Vert F(u^k)\right\Vert\le\nu\left\Vert F(z^k)\right\Vert$$ 且 $$z^{k+1}=u^k$$ （全部采用牛顿步），$$\lbracez^k\rbrace$$ **超线性**收敛到 $$z^*$$；若 $$F$$ 在 $$z^*$$ 是强半光滑的，则 $$\lbracez^k\rbrace$$ **二次**收敛到 $$z^*$$．

</div>

**Proof** 证明要点**（证明要点）** 由 $$F$$ 的 $$L$$-利普希茨连续性，$$z^k$$ 充分接近 $$z^*$$ 时 $$\left\Vert F^k\right\Vert\le L\left\Vert z^k-z^*\right\Vert$$，从而（取 $$\varepsilon^1$$ 使） $$c_\tau\bar\lambda\left\Vert F^k\right\Vert\le\frac12$$．由 (8.542)(8.543) 与 $$\left\Vert J_k^{-1}\right\Vert\le c$$（BD-正则的一致界）估计牛顿步： $$\begin{equation}
  \left\Vert d^k\right\Vert\le\left\Vert(J^k+\mu^kI)^{-1}F^k\right\Vert
  +\left\Vert(J^k+\mu^kI)^{-1}r^k\right\Vert
  \le cL\left\Vert z^k-z^*\right\Vert+c\tau\bar\lambda\left\Vert F^k\right\Vert\left\Vert d^k\right\Vert
  \le2cL\left\Vert z^k-z^*\right\Vert.
\end{equation}$$ 直接计算： $$\begin{align}
  \left\Vert u^k-z^*\right\Vert
  &=\left\Vert z^k+(J^k+\mu^kI)^{-1}\bigl(F^k+(J^k+\mu^kI)d^k-F^k\bigr)-z^*\right\Vert\\
  &\le\left\Vert z^k-z^*-(J^k+\mu^kI)^{-1}F^k\right\Vert
  +\left\Vert(J^k+\mu^kI)^{-1}\right\Vert\cdot\left\Vert F^k+(J^k+\mu^kI)d^k\right\Vert\\
  &\le c\Bigl(\left\Vert F^k-F(z^*)-J^k(z^k-z^*)\right\Vert
  +\bar\lambda\left\Vert F^k\right\Vert\left\Vert z^k-z^*\right\Vert
  +\tau\bar\lambda\left\Vert F^k\right\Vert\left\Vert d^k\right\Vert\Bigr).
\end{align}$$ （用了 $$\left\Vert(J^k+\mu^kI)^{-1}\right\Vert\le c$$，$$\mu^k=\lambda^k\left\Vert F^k\right\Vert$$， $$\left\Vert r^k\right\Vert\le\tau\lambda^k\left\Vert F^k\right\Vert\left\Vert d^k\right\Vert$$．）由 $$F$$ 的 $$L$$-利普希茨连续性与 $$\left\Vert d^k\right\Vert$$ 的估计： $$\begin{equation}
  \bar\lambda\left\Vert F^k\right\Vert\left\Vert z^k-z^*\right\Vert
  +\tau\bar\lambda\left\Vert F^k\right\Vert\left\Vert d^k\right\Vert
  \le L\bar\lambda(1+2cL\tau)\left\Vert z^k-z^*\right\Vert^2;
\end{equation}$$ $$F$$ 在 $$z^*$$ 处的半光滑性推出 $$\begin{equation*}
  \left\Vert F^k-F(z^*)-J^k(z^k-z^*)\right\Vert=o\bigl(\left\Vert z^k-z^*\right\Vert\bigr),
\end{equation*}$$ 结合两式得 $$\left\Vert u^k-z^*\right\Vert=o(\left\Vert z^k-z^*\right\Vert)$$．于是对充分大的 $$k$$： $$L\left\Vert u^k-z^*\right\Vert\le\frac{\nu}{\kappa}\left\Vert z^k-z^*\right\Vert$$；由 BD-正则性导出的局部误差界 $$\left\Vert z^k-z^*\right\Vert\le\kappa\left\Vert F(z^k)\right\Vert$$ 成立．结合 $$L$$-利普希茨连续性即得 $$\begin{equation}
  \left\Vert F(u^k)\right\Vert\le L\left\Vert u^k-z^*\right\Vert
  \le\frac{\nu}{\kappa}\left\Vert z^k-z^*\right\Vert\le\nu\left\Vert F(z^k)\right\Vert,
\end{equation}$$ 于是更新准则 (8.545) 给出 $$\left\Vert F(u^k)\right\Vert\le\nu\left\Vert F(z^k)\right\Vert$$， 即 $$z^{k+1}=u^k$$．当 $$F$$ 强半光滑时，由 $$\begin{equation*}
  \left\Vert F^k-F(z^*)-J^k(z^k-z^*)\right\Vert
  =O\bigl(\left\Vert z^k-z^*\right\Vert_2^2\bigr)
\end{equation*}$$ 建立了 $$\left\Vert u^k-z^*\right\Vert=O(\left\Vert z^k-z^*\right\Vert^2)$$ 的二次收敛．

BD-正则性在上述证明中扮演关键角色；尽管它是较强的条件且可能不满足， 仍有解决办法：若 $$\partial_BF(z^*)$$ 中存在一个非奇异元素（其它元素可能 奇异），通过探索 $$\partial_BF(z)$$ 的结构，当 $$z$$ 非常接近 $$z^*$$ 时可以 很容易地选取非奇异的广义雅可比------若 $$z^*$$ 孤立可类似建立快速局部收敛； 另一方法是 Levenberg--Marquardt（LM）方法（正则化高斯--牛顿法），它在 更弱的*局部误差界*条件下保持超线性或二次收敛------算法在局部误差界 条件下的收敛性是值得探索的方向．

##### 3. 算法 37 的收敛性

**（）**   $$f$$ 凸且梯度利普希茨连续；$$\nabla f$$ 在最优点 $$x^*$$ 处半光滑且 BD-正则．

<div class="lemma">

**引理 8.8** 设假设 8.10.4 成立，若 $$\nabla f$$ 半光滑，则对任意 $$x$$： $$\begin{equation}
  \lim_{\left\Vert d\right\Vert\to0,\ J\in\partial(\nabla f(x+d))}
  \frac{f(x+d)-f(x)-\nabla f(x)^\top d-\frac12d^\top Jd}
  {\left\Vert d\right\Vert^2}=0.
\end{equation}$$

</div>

应用定理 8.32 可得线性收敛结果：

<div class="lemma">

**引理 8.9** 设假设 8.10.4 成立，$$x^*$$ 为 (8.546) 的 最优解，则对任意 $$\delta\in(0,1)$$，存在 $$x^*$$ 的邻域 $$\mathcal N(x^*,\varepsilon)$$ 和常数 $$\bar\mu$$，使得对任意 $$x\in\mathcal N(x^*,\varepsilon)$$、雅可比 $$J\in\partial(\nabla f(x))$$ 以及 $$\mu\in[0,\bar\mu]$$，方程 (8.547) 的解 $$d$$ 满足 $$\begin{equation}
  \left\Vert x+d-x^*\right\Vert\le\delta\left\Vert x-x^*\right\Vert.
\end{equation}$$

</div>

<div class="theorem">

**定理 8.35** 设假设 8.10.4 成立，$$x^*$$ 为最优解．如果 $$\sigma<\frac12$$， 则算法 37 产生的序列 $$\lbracex^k\rbrace$$： (1) 存在整数 $$k^0$$ 使对所有 $$k\ge k^0$$ 有 $$m^k=0$$（Armijo 步长恒为 全步长）； (2) 整个序列 $$\lbracex^k\rbrace$$ 收敛到 $$x^*$$ 且具有超线性收敛性．

</div>

（证明思路：由引理 8.8，在 $$x^*$$ 附近 $$f(x^k+\rho^md^k)-f(x^k)$$ 的展开中二次项 $$-\frac{\rho^m}{2}d^\top J^kd$$ 主导，$$\sigma<\frac12$$ 保证全步长 $$m^k=0$$ 满足 Armijo 条件；结合引理 8.9 与半光滑 性得超线性收敛，感兴趣的读者可自行证明．）

## 本章总结

### 内容提要

本章介绍了众多求解复合优化问题的算法，可以应用到大部分凸优化问题上； 针对非凸问题，适用的算法有近似点梯度法、分块坐标下降法、交替方向乘子 法以及随机优化算法；Nesterov 加速算法和近似点算法经适当变形后也可推广 到一些非凸问题；由于非凸情形下原始与对偶问题之间可能缺乏明显的关系， 对偶算法应用在非凸问题上比较困难------应用算法之前应先判断优化问题的 种类，再选择合适的算法．

- **邻近算子与近似点梯度法**（§8.1）：近端子问题 $$h(u)+\frac12\left\Vert u-x\right\Vert^2$$ 强凸良定义；$$\operatorname{prox}$$ 与 次梯度互化、运算规则、仿射复合公式；投影库与 Moreau 分解 （$$x=\operatorname{prox}_h(x)+\operatorname{prox}_{h^*}(x)$$）； PGA $$=$$ 光滑部分显式梯度步 $$+$$ 非光滑部分隐式近端步，凸情形 $$O(1/k)$$（定理 8.3），线搜索准则的来历； 应用：LASSO（软阈值保稀疏）、低秩（奇异值软阈值）、小波； 拓展：镜像下降（Bregman 距离，负熵 $$O(\ln n)$$）、惯性 PGA （重球）、条件梯度法（Frank--Wolfe，线性极小化替代投影， $$O(LD_C^2/k)$$）．

- **Nesterov 加速**（§8.2）：FISTA 的动量系数 $$\frac{k-2}{k+1}$$ 把速度提到 $$O(1/k^2)$$；等价变形 （$$y^k,v^k$$ 双序列）与收敛条件 (8.115)--(8.117)； 两种线搜索（只调 $$t$$ 与同时调 $$t,\gamma$$）；下降 FISTA； 第二类（三序列均在定义域内）与第三类（累积梯度）Nesterov 加速；非凸加速框架以 $$\left\Vert G_t(x)\right\Vert$$ 度量 $$O(1/k)$$．

- **近似点算法**（§8.3）：$$x^{k+1}=\operatorname{prox}_{
          t^k\psi}(x^k)$$；与增广拉格朗日函数法*等价*（对对偶问题 PPA $$\iff$$ 对原始问题 ALM，定理 8.7）； 收敛 $$\frac{\left\Vert x^0-x^*\right\Vert^2}{2\sum t^i}$$（步长任意性！）、 加速版 $$O(1/k^2)$$；Moreau--Yosida 正则化 $$f^{(t)}$$ 光滑化 （$$\nabla f^{(t)}=\frac{x-\operatorname{prox}_{tf}(x)}{t}$$）， PPA $$=$$ 对 $$f^{(t)}$$ 的梯度下降；应用：LASSO 与逆协方差估计 （对偶子问题用半光滑牛顿加速）．

- **分块坐标下降**（§8.4）：三种更新格式（精确极小/近端/ 线性化 $$+$$ 外推）；Gauss--Seidel 式更新捕捉各向异性（二元二次 例子）；非凸反例（Powell）说明收敛需要假设；应用：LASSO（逐 分量软阈值）、K-均值（本质是 BCD）、非负矩阵分解、字典学习 （混用格式）、最大割非凸松弛（归一化）；非凸收敛性框架（PALM）： 充分下降 $$\to$$ 次梯度上界 $$\to$$ KL 性质全序列收敛（轨迹长度 有限）．

- **对偶算法**（§8.5）：强凸共轭的性质（$$\nabla f^*$$ $$\frac1\mu$$-利普希茨）；对偶 PGA 等价于原始问题交替极小化； 四个建模例子（范数近似、多正则项、凸集交、可分拆分）；PDHG 与 Chambolle--Pock（外推步），鞍点问题与部分原始--对偶间隙； 应用：LASSO、TV-L1、图像填充、反卷积（Fourier 域显式解）； CP 收敛条件 $$\sqrt{st}\left\Vert A\right\Vert_2<1$$，$$O(1/N)$$ 间隙收敛与全 序列收敛．

- **交替方向乘子法**（§8.6）：ADMM $$=$$ ALM 的交替化， 去掉强凸要求；收敛准则=原始残差 $$r^k$$ 与对偶残差 $$s^k$$； DRS 分裂及其不动点形式，DRS-ADMM 等价性（对对偶问题 DRS）； 变形技巧：线性化、缓存分解、优化转移、罚系数动态调节、超松弛、 多块与非凸 ADMM（无一般收敛保证，有发散反例）；应用：LASSO （原始与对偶）、广义 LASSO（TV 去噪、三对角快速求解）、逆 协方差、矩阵分离（软阈值奇异值）、全局一致性（分布式并行）、 非凸集合（基数/低秩/布尔投影）、非负矩阵分解补全；收敛性： 两块凸 ADMM 收敛到 KKT 对（引理 8.6 的 $$\Phi^k$$ 单调下降与步长 $$\tau\le\frac{1+\sqrt5}{2}$$ 的来历）．

- **随机优化**（§8.7）：SGD（无偏性 $$\mathbb{E}[\nabla f_{s^k}]=\nabla f$$）；深度学习变形：动量、Nesterov （先加速度再算梯度）、AdaGrad/RMSProp/AdaDelta/Adam（自适应 步长与偏差修正）；凸情形随机次梯度 $$O(1/\sqrt K)$$（期望、依 概率、高概率三重刻画），强凸光滑情形固定步长不收敛、递减步长 $$O(1/K)$$；方差分解 (8.495) 揭示随机 与确定性方法的差别；方差减小：SAG（Q-线性但存 $$N$$ 个梯度）、 SAGA（无偏修正）、SVRG（周期全梯度校正，内存 $$O(n)$$）------ 恢复 Q-线性收敛．

- **半光滑牛顿**（§8.8）：广义雅可比（B-次微分、Clarke 包、零测集无关性、链式法则的局限、单调 $$\Rightarrow$$ 半正定、 近端算子 $$\left\Vert J\right\Vert\le1$$）；广义雅可比库（$$\ell_1/\ell_2$$、 投影、谱函数 Loewner 公式）；半光滑/强半光滑定义与运算封闭性 （收缩算子强半光滑）；ASSN（正则化牛顿 $$+$$ 不精确 CG $$+$$ watchdog 全局策略）与优化版（Armijo）；应用：LASSO（指标集 $$I/O$$ 降维，只解 $$\left\vert I\right\vert$$ 维方程组）、基追踪（DRS 版与 ALM 版）、半定规划（SMW 降维到 $$m\times m$$ 对称系统）；收敛： BD-正则 $$+$$ 半光滑 $$\Rightarrow$$ 超线性，强半光滑 $$\Rightarrow$$ 二次；watchdog 保证全局收敛到残差为零．

### 延伸阅读

近似点梯度法是解决非光滑、无约束、规模较大问题的常用算法，通常能利用 问题结构、比次梯度法表现更好；其变形还有镜像下降、条件梯度、惯性近似 点梯度等．近似点算法可理解成特殊的近似点梯度法，也可理解成次梯度算法 的隐式格式；它与增广拉格朗日函数法的等价性说明 ALM 可视作（次）梯度 算法隐式格式的一种实现方式．Nesterov 加速能把凸复合优化的收敛速度从 $$O(1/k)$$ 提高到 $$O(1/k^2)$$；Nesterov 算法最初如何构造并没有很直观的 解释------用*微分方程*的观点解释加速算法的本质是很有意思的课题 （理解原理后或许能构造其他非平凡的加速算法）；除 Nesterov 加速外还有 深度学习中的动量算法与在众多领域广泛应用的*安德森加速*算法． 分块坐标下降的历史可追溯到 1960 年之前，因算法结构简单、易实现而受到 关注......（讲义 §8.9 还对 ADMM 的历史、随机优化的现代进展、半光滑 牛顿在半定规划中的应用等给出了文献导读，感兴趣的读者可按讲义所引 文献延伸阅读．）
