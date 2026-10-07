---
layout: note
kind: note
title: "第 2 章　凸集"
course: optimization
order: 2
date: 2026-10-07
---

# 凸集

## 本章前置知识

<div class="prereq">

本章的结论几乎全部由线性代数与数学分析的基本工具推出．下面把真正会用到的结论集中列出， 每一条都给出公式并注明在本章中的用途．

1.  **向量空间与子空间**：$$\mathbb{R}^n$$ 对加法与数乘封闭；$$V\subseteq\mathbb{R}^n$$ 是子空间，当且仅当 $$0\in V$$ 且对任意 $$x,y\in V,\ \alpha,\beta\in\mathbb{R}$$ 有 $$\alpha x+\beta y\in V$$． *用在哪里*：仿射集的结构定理（$$C=x_0+V$$）。

2.  **内积与 Cauchy--Schwarz 不等式**：$$\mathbb{R}^n$$ 上 $$\left\langle x,\,y\right\rangle=x^\top y$$，且 $$\begin{equation}
        \left\vert x^\top y\right\vert\le\left\Vert x\right\Vert_2\left\Vert y\right\Vert_2,
    \end{equation}$$ 等号成立当且仅当 $$x,y$$ 线性相关．矩阵形式：$$\left\vert\left\langle A,\,B\right\rangle\right\vert\le\left\Vert A\right\Vert_F\left\Vert B\right\Vert_F$$． *用在哪里*：柯西不等式（§2.1）、Hölder 不等式与范数锥的对偶锥（§2.5）、 分离超平面定理的证明（§2.6）．

3.  **谱分解（正交对角化）**：实对称矩阵 $$A\in\mathcal{S}^{n}$$ 可分解为 $$\begin{equation}
        A=Q\Lambda Q^\top,\qquad Q^\top Q=I,\qquad \Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n),\ \lambda_i\in\mathbb{R},
    \end{equation}$$ 且 $$Q$$ 的列向量是 $$A$$ 的一组标准正交特征向量． *用在哪里*：$$\mathcal{S}^{n}_{+}$$ 自对偶性的证明、$$\ell_2$$ 算子范数、$$2\times2$$ 半正定锥的刻画．

4.  **特征值与奇异值**：$$A\in\mathbb{R}^{m\times n}$$ 的奇异值分解为 $$A=U\Sigma V^\top$$， 奇异值 $$\sigma_i=\sqrt{\lambda_i(A^\top A)}$$（$$i=1,\dots,r$$），$$r=\operatorname{rank}(A)$$； 特别地 $$\sigma_1=\lambda_{\max}(A^\top A)^{1/2}$$． *用在哪里*：谱范数 $$\left\Vert A\right\Vert_2=\sigma_1$$、核范数 $$\left\Vert A\right\Vert_*=\sum_i\sigma_i$$、 核范数与谱范数互为对偶．

5.  **矩阵的迹**：$$\operatorname{tr}(AB)=\operatorname{tr}(BA)$$，$$\operatorname{tr}(A)=\sum_i\lambda_i(A)$$，$$\operatorname{tr}(A)=\operatorname{tr}(A^\top)$$， 且 $$\operatorname{tr}(AB^\top)=\sum_{i,j}a_{ij}b_{ij}$$． *用在哪里*：Frobenius 范数与正交不变性、矩阵内积（§2.1.3）、$$\mathcal{S}^{n}_{+}$$ 自对偶（§2.5）．

6.  **半正定矩阵的等价刻画**：对 $$A\in\mathcal{S}^{n}$$， $$\begin{equation}
        A\succeq0\iff \lambda_i(A)\ge0\ \forall i\iff x^\top Ax\ge0,\ \forall x\in\mathbb{R}^n
        \iff \exists B:\ A=B^\top B .
    \end{equation}$$ *用在哪里*：$$\mathcal{S}^{n}_{+}$$ 是凸锥、双曲锥化为二阶锥、$$\mathcal{S}^{n}_{+}$$ 的对偶锥（§2.3、§2.4、§2.5）．

7.  **Schur 补**：设分块对称矩阵 $$M=\begin{pmatrix}A&B\\ B^\top&C\end{pmatrix}$$，若 $$A\succ0$$，则 $$\begin{equation}
        M\succeq0\iff C-B^\top A^{-1}B\succeq0 .
    \end{equation}$$ *用在哪里*：$$2\times2$$ 半正定矩阵的显式判别（§2.3.5）、线性矩阵不等式．

8.  **$$\mathbb{R}^n$$ 中的拓扑概念**：开球 $$B(x,\epsilon)=\lbracey:\left\Vert y-x\right\Vert_2<\epsilon\rbrace$$； $$x\in\operatorname{int}S$$ 指存在 $$\epsilon>0$$ 使 $$B(x,\epsilon)\subseteq S$$；$$\overline S$$ 为 $$S$$ 的闭包； $$S$$ 闭 $$\iff$$ $$\mathbb{R}^n\setminus S$$ 开 $$\iff$$ $$S$$ 中任何收敛点列的极限仍在 $$S$$ 中； 紧集 $$\iff$$ 有界闭集（$$\mathbb{R}^n$$ 中）． *用在哪里*：内部/闭包保凸（§2.2.2）、适当锥的定义、严格分离定理、支撑超平面定理．

9.  **连续函数与紧集上的最值**：若 $$f$$ 连续、$$S$$ 紧，则 $$f$$ 在 $$S$$ 上取到最大值与最小值； 若 $$S$$ 闭、$$f$$ 连续且水平集有界，则 $$\min_{x\in S}f(x)$$ 存在． *用在哪里*：算子范数定义中 $$\max$$ 的可达性、$$\mathop{\mathrm{dist}}(C,D)$$ 的存在性．

10. **上确界与下确界**：非空有界数集必有上确界 $$\sup$$ 与下确界 $$\inf$$； 但 $$\inf$$ 未必被取到．在一般（非有限维）空间中 $$\left\Vert\cdot\right\Vert_\infty$$ 需用 $$\sup$$ 代替 $$\max$$． *用在哪里*：$$\ell_\infty$$ 范数的说明、$$\mathop{\mathrm{dist}}(C,D)=\inf\lbrace\left\Vert u-v\right\Vert_2\rbrace$$．

11. **线性映射与仿射映射**：$$f(x)=Ax+b$$ 满足 $$\begin{equation}
        f(\theta x+(1-\theta)y)=\theta f(x)+(1-\theta)f(y),\qquad \forall\theta\in\mathbb{R};
    \end{equation}$$ $$\mathcal N(A)=\lbracex:Ax=0\rbrace$$ 是子空间，$$\operatorname{rank}(A)+\dim\mathcal N(A)=n$$． *用在哪里*：仿射变换的保凸性（§2.4）、线性矩阵不等式、分式线性变换．

12. **正定矩阵的方根**：$$P\succ0$$ 时存在唯一的 $$P^{1/2}\succ0$$ 使 $$P=P^{1/2}P^{1/2}$$， 且 $$P^{-1}=P^{-1/2}P^{-1/2}$$；又 $$A$$ 可逆时 $$AA^\top\succ0$$，$$(AA^\top)^{-1}=(A^\top)^{-1}A^{-1}$$． *用在哪里*：椭球两种表示的等价性（§2.3.3）、双曲锥（§2.4.1）．

13. **Hölder 不等式与对偶范数**：设 $$p,q\in[1,\infty]$$ 共轭（$$\frac1p+\frac1q=1$$），则 $$\begin{equation}
        \left\vert x^\top y\right\vert\le\sum_{i=1}^n\left\vert x_iy_i\right\vert\le\left\Vert x\right\Vert_p\left\Vert y\right\Vert_q ;
    \end{equation}$$ 对偶范数定义为 $$\left\Vert y\right\Vert_*=\max_{\left\Vert x\right\Vert\le1}\left\langle x,\,y\right\rangle$$，且 $$(\ell_p)^*=\ell_q$$． *用在哪里*：范数锥之对偶锥的证明（§2.5.2）．

14. **凸组合的封闭性**：若 $$f$$ 是仿射映射，则 $$f(S\cap T)\subseteq f(S)\cap f(T)$$， $$f^{-1}(S\cap T)=f^{-1}(S)\cap f^{-1}(T)$$；集合的像/原像运算与交、并的关系． *用在哪里*：任意多凸集之交为凸集、仿射原像的保凸性（§2.4）．

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

本章围绕**凸集**这一个核心概念展开．第 1 节先建立\"长度\"的语言------向量范数、矩阵范数 与矩阵内积，它是后面描述球、锥、投影等几何对象的度量基础．第 2 节给出凸集、仿射集、凸锥的 定义，并说明凸组合、凸包与仿射包这三个由\"组合系数\"约束方式不同而区分的概念之间的关系； 其中\"任意多凸集的交仍是凸集\"是后面判定复杂集合凸性的主要工具．第 3 节列举六类最常用的凸集： 超平面与半空间、多面体、球与椭球、范数锥、对称矩阵集合与半正定锥．第 4 节给出**保凸运算**： 仿射变换、透视变换与分式线性变换，它们与\"取交\"一起构成证明一个集合凸性的第二条路线 （第一条路线是直接用定义验证）．第 5 节引入适当锥、广义不等式与对偶锥，这是把实数上的序关系 推广到向量与矩阵上的关键一步，也是后面建立锥规划对偶理论的起点．第 6 节的分离超平面定理与 支撑超平面定理是凸集的\"整体性质\"：凸集不仅可以被有限个半空间从内部描述（多面体），还可以 用超平面从外部逼近，这正是凸优化最优性条件、对偶理论与分类算法的几何来源．本章的内容与 第 3 章（凸函数，凸性由 $$\operatorname{epi}f$$ 与水平集 $$S_\alpha$$ 的凸性刻画）以及第 6 章（典型优化问题， 线性规划、二次锥规划、半定规划分别对应多面体、二次锥、半正定锥）直接衔接．

## 范数

### 向量范数的定义

和标量不同，我们不能简单地按照元素的大小来比较不同的向量和矩阵．**范数**给出了一种长度 计量方式：它把一个向量映为非负实数，用于度量该向量到零点的\"距离\"．

<div class="definition">

令记号 $$\left\Vert\cdot\right\Vert:\mathbb{R}^n\to\mathbb{R}_+$$ 是一种非负函数，如果它满足：

1.  **正定性**：对于 $$\forall v\in\mathbb{R}^n$$，有 $$\left\Vert v\right\Vert\ge0$$，且 $$\left\Vert v\right\Vert=0\iff v=0_{n\times1}$$；

2.  **齐次性**：对于 $$\forall v\in\mathbb{R}^n$$ 和 $$\alpha\in\mathbb{R}$$，有 $$\left\Vert\alpha v\right\Vert=\left\vert\alpha\right\vert\left\Vert v\right\Vert$$；

3.  **三角不等式**：对于 $$\forall v,w\in\mathbb{R}^n$$，均成立 $$\left\Vert v+w\right\Vert\le\left\Vert v\right\Vert+\left\Vert w\right\Vert$$．

则称 $$\left\Vert\cdot\right\Vert$$ 是定义在向量空间 $$\mathbb{R}^n$$ 上的向量范数．

</div>

最常用的向量范数即我们熟知的 $$\ell_p$$ 范数（其中 $$p\ge1$$）： $$\begin{equation}
  \left\Vert v\right\Vert_p=\left(\sum_{i=1}^n\left\vert v_i\right\vert^p\right)^{\frac1p},
  \qquad
  \left\Vert v\right\Vert_\infty=\max_{1\le j\le n}\left\vert v_j\right\vert.
\end{equation}$$ 其中 $$p=1,2,\infty$$ 的情形最重要，分别记为 $$\left\Vert\cdot\right\Vert_1,\left\Vert\cdot\right\Vert_2,\left\Vert\cdot\right\Vert_\infty$$； 在不引起歧义时省略角标，用 $$\left\Vert\cdot\right\Vert$$ 表示 $$\ell_2$$ 范数．$$\ell_p$$ 范数满足三角不等式，本质上 是 **Minkowski 不等式**；其证明依赖 Hölder 不等式（见本小节末的补充）．需要提醒的是， $$0<p<1$$ 时由 (2.7) 定义的 $$\left\Vert\cdot\right\Vert_p$$ 满足正定性与齐次性，但**不**满足 三角不等式（例如 $$n=2$$、$$p=1/2$$、$$v=(1,0)^\top$$、$$w=(0,1)^\top$$ 时 $$\left\Vert v+w\right\Vert_{1/2}=4>2=\left\Vert v\right\Vert_{1/2}+\left\Vert w\right\Vert_{1/2}$$），因此不是范数，其单位球也不是凸集．

<div class="example">

设 $$A\in\mathcal{S}^{n}_{+}$$（对称正定），令 $$\begin{equation}
  \left\Vert x\right\Vert_A\overset{\text{def}}{=\joinrel=}\sqrt{x^\top Ax}.
\end{equation}$$ 根据正定矩阵的定义容易验证 $$\left\Vert\cdot\right\Vert_A$$ 是一个范数．正定性： $$x^\top Ax\ge0$$ 且等号成立当且仅当 $$x=0$$；齐次性： $$\left\Vert\alpha x\right\Vert_A=\sqrt{\alpha^2x^\top Ax}=\left\vert\alpha\right\vert\left\Vert x\right\Vert_A$$；三角不等式：把 $$A$$ 写成 $$A=A^{1/2}A^{1/2}$$（$$A^{1/2}$$ 对称正定），则 $$\left\Vert x+y\right\Vert_A=\left\Vert A^{1/2}x+A^{1/2}y\right\Vert_2\le\left\Vert A^{1/2}x\right\Vert_2+\left\Vert A^{1/2}y\right\Vert_2=\left\Vert x\right\Vert_A+\left\Vert y\right\Vert_A$$， 其中不等号即 $$\ell_2$$ 范数的三角不等式（也可对 $$A$$ 作 Cholesky 分解 $$A=L^\top L$$ 后对 $$Lx,Ly$$ 用 Cauchy 不等式验证 $$x^\top Ay\le\left\Vert x\right\Vert_A\left\Vert y\right\Vert_A$$）．这类范数在信赖域方法与内点法中作为 \"椭球范数\"出现．

</div>

对向量的 $$\ell_2$$ 范数，我们有常用的 Cauchy 不等式．

<div class="proposition">

设 $$a,b\in\mathbb{R}^n$$，则 $$\begin{equation}
  \left\vert a^\top b\right\vert\le\left\Vert a\right\Vert_2\left\Vert b\right\Vert_2,
\end{equation}$$ 等号成立当且仅当 $$a$$ 与 $$b$$ 线性相关．

</div>

**Proof** **（）** 若 $$b=0$$，则不等式两端均为 $$0$$，且 $$a,b$$ 线性相关，结论成立．以下设 $$b\ne0$$．对任意 $$t\in\mathbb{R}$$，由 $$\left\Vert a-tb\right\Vert_2^2\ge0$$ 得 $$\begin{equation}
  0\le\left\Vert a\right\Vert_2^2-2t\,a^\top b+t^2\left\Vert b\right\Vert_2^2 .
\end{equation}$$ 取 $$t=\dfrac{a^\top b}{\left\Vert b\right\Vert_2^2}$$，代入得 $$\begin{equation}
  0\le\left\Vert a\right\Vert_2^2-\frac{(a^\top b)^2}{\left\Vert b\right\Vert_2^2}
  \quad\Longrightarrow\quad
  (a^\top b)^2\le\left\Vert a\right\Vert_2^2\left\Vert b\right\Vert_2^2,
\end{equation}$$ 两边开方即得 $$\left\vert a^\top b\right\vert\le\left\Vert a\right\Vert_2\left\Vert b\right\Vert_2$$．

等号成立当且仅当上述二次函数在 $$t=t_0=\frac{a^\top b}{\left\Vert b\right\Vert_2^2}$$ 处取零值，即 $$\left\Vert a-t_0b\right\Vert_2=0$$，也就是 $$a=t_0b$$，即 $$a$$ 与 $$b$$ 线性相关．反之若 $$a=\lambda b$$，则 $$\left\vert a^\top b\right\vert=\left\vert\lambda\right\vert\left\Vert b\right\Vert_2^2=\left\Vert a\right\Vert_2\left\Vert b\right\Vert_2$$，等号成立．

$$p=\infty$$ 时的\"最大值\"与\"上确界\"**（$$p=\infty$$ 时的\"最大值\"与\"上确界\"）** 容易看出，$$p=\infty$$ 时有关\"最大值\"的定义要求向量的分量是有限的．在一般化的空间（无穷维空间、 函数空间）中，这一要求很可能不成立，此时我们只需将\"最大值\"更换成\"上确界\"即可： $$\begin{equation}
  \left\Vert v\right\Vert_\infty=\sup_{j}\left\vert v_j\right\vert\quad\text{或}\quad
  \left\Vert f\right\Vert_\infty=\sup_{t\in\operatorname{dom}f}\left\vert f(t)\right\vert .
\end{equation}$$ 在 $$\mathbb{R}^n$$ 中分量个数有限，$$\sup$$ 一定可以取到，\"最大值\"与\"上确界\"是一致的；这一区分在 §2.3.5 讨论 $$[0,1]$$ 上的非负多项式锥时并不出现，但在泛函分析中至关重要．

向量范数度量的是 $$v$$ 与零点之间的距离．在实际应用时，我们通常使用 $$p=1,2,\infty$$ 的情形，即分别 使用 $$\left\Vert v\right\Vert_1,\left\Vert v\right\Vert_2,\left\Vert v\right\Vert_\infty$$ 度量 $$v$$ 在不同意义下的距离，这是因为它们具有鲜明的 度量特征．图 2.1 画出了它们各自的范数球（即单位球 $$B_p=\lbracev:\left\Vert v\right\Vert_p\le1\rbrace$$）．

**图 2.1**：$$\mathbb{R}^2$$ 中 $$\ell_1,\ell_2,\ell_\infty$$ 范数的单位球．三者都是凸集、中心对称， 区别在于"角点"与"平坦面"的多少．

<div class="supp">

PPT 上提出的\"请想一想\"可以这样回答．设 $$v=(v_1,\dots,v_n)^\top$$ 表示误差、残差或扰动向量．

- $$\left\Vert v\right\Vert_1=\sum_i\left\vert v_i\right\vert$$ 度量的是**所有坐标偏差的总量**．它的单位球是菱形， 只在坐标轴上出现\"尖角\"，因此在以 $$\left\Vert\cdot\right\Vert_1$$ 为正则项或约束的优化问题中，最优解倾向于 落在坐标轴上（即很多分量为零）．这解释了 $$\ell_1$$ 范数**保稀疏性**，适用于 Lasso、压缩感知、稀疏信号恢复等\"希望解稀疏\"的情形．它的缺点是对异常值不敏感（异常值的 影响被平均掉），且 $$\left\Vert\cdot\right\Vert_1$$ 在坐标轴外不可微，需要次梯度或邻近算子处理．

- $$\left\Vert v\right\Vert_2=\sqrt{\sum_i v_i^2}$$ 度量的是**欧氏直线距离**．它的单位球是圆（球面）， 处处光滑、具有旋转不变性（对任意正交矩阵 $$Q$$ 有 $$\left\Vert Qv\right\Vert_2=\left\Vert v\right\Vert_2$$），与角度、内积 相容．它适用于度量几何距离、最小二乘残差、信赖域半径等\"各方向同等重要\"的情形；缺点是 对异常值敏感（误差被平方放大），并且 $$\ell_2$$ 正则化不会产生稀疏解．

- $$\left\Vert v\right\Vert_\infty=\max_i\left\vert v_i\right\vert$$ 度量的是**最大（最坏）坐标偏差**．它的单位球是 正方形（超立方体），具有\"平坦面\"，只在坐标置换下不变（旋转会破坏其形状）．它适用于衡量 最坏情况误差、一致逼近（Chebyshev 逼近）、无穷范数约束的鲁棒优化；缺点是完全忽略其余 分量的信息，且解容易落在正方形的顶点（多个分量同时取到边界值）．

从凸性的角度看，这三个范数的单位球都凸------这是三角不等式与齐次性的几何等价形式 （§2.3.3 中将说明范数球必为凸集）．

</div>

<div class="supp">

讲义 §2.1 未展开这三条内容，但它们在 §2.5 证明\"范数锥的对偶锥\"时是必需的，故在此补齐．

1.  **Hölder 不等式**：设 $$p,q\in[1,\infty]$$ 满足 $$\frac1p+\frac1q=1$$（称 $$(p,q)$$ 共轭）， 则对任意 $$x,y\in\mathbb{R}^n$$， $$\begin{equation}
        \sum_{i=1}^n\left\vert x_iy_i\right\vert\le\left\Vert x\right\Vert_p\left\Vert y\right\Vert_q .
    \end{equation}$$ 等号成立当且仅当 $$\left\vert x\right\vert^p$$ 与 $$\left\vert y\right\vert^q$$ 成比例，且所有非零乘积 $$x_iy_i$$ 同号．特别地 $$p=q=2$$ 时即为 Cauchy 不等式；$$p=1,q=\infty$$ 时由 $$\sum_i\left\vert x_iy_i\right\vert\le\left\Vert y\right\Vert_\infty\sum_i\left\vert x_i\right\vert$$ 直接得到．

2.  **对偶范数**：给定范数 $$\left\Vert\cdot\right\Vert$$，其在 $$\left\langle \cdot,\,\cdot\right\rangle$$ 下的对偶范数定义为 $$\begin{equation}
        \left\Vert y\right\Vert_*=\max_{\left\Vert x\right\Vert\le1}\ \left\langle x,\,y\right\rangle=\max_{x\ne0}\frac{\left\langle x,\,y\right\rangle}{\left\Vert x\right\Vert} .
    \end{equation}$$ 由定义立即有 $$\left\langle x,\,y\right\rangle\le\left\Vert x\right\Vert\left\Vert y\right\Vert_*$$．可以证明 $$(\ell_p)^*=\ell_q$$，$$p,q$$ 共轭； 特别地 $$\ell_1$$ 与 $$\ell_\infty$$ 互为对偶，$$\ell_2$$ 自对偶．这正是\"$$\ell_p$$ 范数锥的对偶锥由 $$\ell_q$$ 范数刻画\"的根源（§2.5.2 例 (c)）． 关于对偶范数的等号条件：当 $$1<p<\infty$$ 时，对任意 $$y\ne0$$ 都存在唯一的 $$\begin{equation}
        x=\frac{1}{\left\Vert y\right\Vert_q^{\,q-1}}\Big(\operatorname{sgn}(y_1)\left\vert y_1\right\vert^{q-1},\dots,\operatorname{sgn}(y_n)\left\vert y_n\right\vert^{q-1}\Big)^\top
    \end{equation}$$ 满足 $$\left\Vert x\right\Vert_p=1$$ 且 $$x^\top y=\left\Vert y\right\Vert_q$$；把 $$x$$ 换成 $$-x$$ 便有 $$x^\top y=-\left\Vert y\right\Vert_q$$． 后一事实在 §2.5.2 中反复使用．

3.  **范数的等价性**：在 $$\mathbb{R}^n$$ 上任意两个范数都是等价的，即存在常数 $$c_1,c_2>0$$ 使 $$c_1\left\Vert x\right\Vert_a\le\left\Vert x\right\Vert_b\le c_2\left\Vert x\right\Vert_a$$．对 $$\ell_p$$ 范数有显式的不等式链 $$\begin{equation}
        \left\Vert x\right\Vert_\infty\le\left\Vert x\right\Vert_2\le\left\Vert x\right\Vert_1\le\sqrt{n}\,\left\Vert x\right\Vert_2\le n\,\left\Vert x\right\Vert_\infty .
    \end{equation}$$ *证明*：$$\left\Vert x\right\Vert_2^2=\sum_i x_i^2\le\big(\sum_i\left\vert x_i\right\vert\big)^2$$ 给出 $$\left\Vert x\right\Vert_2\le\left\Vert x\right\Vert_1$$； 由 Cauchy 不等式 $$\left\Vert x\right\Vert_1=\sum_i\left\vert x_i\right\vert\cdot1\le\sqrt n\left\Vert x\right\Vert_2$$；其余两个不等式由 $$\max_i\left\vert x_i\right\vert^2\le\sum_i x_i^2\le n\max_i\left\vert x_i\right\vert^2$$ 得到．范数等价性的意义是： $$\mathbb{R}^n$$ 中由不同范数诱导的收敛、开集、闭集、紧集等概念完全一致，因此讨论集合的凸性、 闭性时可以自由选取最方便的范数．

</div>

### 矩阵范数

矩阵范数可以由向量范数的定义推广得到：矩阵范数是定义在矩阵空间 $$\mathbb{R}^{m\times n}$$ 上的非负函数， 并且满足正定性、齐次性和三角不等式．常见的矩阵范数有以下几类．

<div class="definition">

设 $$A=(a_{ij})\in\mathbb{R}^{m\times n}$$．按本书（讲义）的约定， $$\begin{equation}
  \left\Vert A\right\Vert_1=\sum_{i=1}^m\sum_{j=1}^n\left\vert a_{ij}\right\vert
\end{equation}$$ 即 $$A$$ 中所有元素绝对值的和；当 $$p=2$$ 时得到矩阵的 **Frobenius 范数**（简称 F 范数） $$\begin{equation}
  \left\Vert A\right\Vert_F=\sqrt{\operatorname{tr}(AA^\top)}=\sqrt{\sum_{i=1}^m\sum_{j=1}^n a_{ij}^2}.
\end{equation}$$

</div>

<div class="supp">

和矩阵 $$2$$ 范数类似，向量的 $$\ell_1$$ 范数以及 $$\ell_\infty$$ 范数均可诱导出相应的矩阵范数 （分别为矩阵的 $$1$$ 范数和无穷范数，即下面的最大列和与最大行和），在多数数值代数教材中将它们 记为 $$\left\Vert\cdot\right\Vert_1$$ 和 $$\left\Vert\cdot\right\Vert_\infty$$．然而本书较少涉及这两个范数，因此本书把 $$\left\Vert A\right\Vert_1$$ 定义为**矩阵 $$A$$ 中所有元素绝对值的和**．读者应当注意它和其他数值代数教材中 定义的不同．具体地说，本书中同时出现的两个\"$$\ell_1$$ 相关\"的矩阵范数是**两件不同的事**：

<div class="center">

| 名称 | 定义 | 是否由 $$\left\Vert\cdot\right\Vert_1$$ 诱导 |
|:---|:---|:---|
| 逐元素 $$\ell_1$$ 范数（本书的 $$\left\Vert A\right\Vert_1$$） | $$\sum_{i=1}^m\sum_{j=1}^n\left\vert a_{ij}\right\vert$$ | 否 |
| 矩阵 $$1$$ 范数（算子范数 $$\left\Vert A\right\Vert_{p=1}$$） | $$\max_{1\le j\le n}\sum_{i=1}^m\left\vert a_{ij}\right\vert$$（最大列和） | 是 |

</div>

为避免混淆，本笔记在提到算子范数时统一写成 $$\left\Vert A\right\Vert_{p=1},\left\Vert A\right\Vert_{p=2},\left\Vert A\right\Vert_{p=\infty}$$ （也常记作 $$\left\Vert A\right\Vert_{(1)},\left\Vert A\right\Vert_{(2)},\left\Vert A\right\Vert_{(\infty)}$$），在提到元素型范数时写成 $$\left\Vert A\right\Vert_1$$．读者在阅读其他教材、编写程序时务必注意这一差别．

</div>

<div class="proposition">

对任意的正交矩阵 $$U\in\mathbb{R}^{m\times m}$$ 与 $$V\in\mathbb{R}^{n\times n}$$，有 $$\begin{equation}
  \left\Vert UAV\right\Vert_F^2=\left\Vert A\right\Vert_F^2 .
\end{equation}$$

</div>

**Proof** **（）** 由 (2.18) 与 $$\operatorname{tr}(AB)=\operatorname{tr}(BA)$$、$$U^\top U=I$$、$$V^\top V=I$$， $$\begin{equation}
  \left\Vert UAV\right\Vert_F^2=\operatorname{tr}\big(UAV(AV)^\top\big)=\operatorname{tr}\big(UAVV^\top A^\top U^\top\big)
  =\operatorname{tr}\big(UAA^\top U^\top\big)=\operatorname{tr}\big(AA^\top U^\top U\big)=\operatorname{tr}(AA^\top)=\left\Vert A\right\Vert_F^2 .
\end{equation}$$

除了从向量范数直接推广以外，矩阵范数还可以由向量范数诱导出来，一般称这种范数为 **算子范数**（诱导范数）．给定矩阵 $$A\in\mathbb{R}^{m\times n}$$，以及 $$m$$ 维和 $$n$$ 维空间上的 向量范数 $$\left\Vert\cdot\right\Vert_{(m)}$$ 和 $$\left\Vert\cdot\right\Vert_{(n)}$$，其诱导的矩阵范数定义为 $$\begin{equation}
  \left\Vert A\right\Vert_{(m,n)}=\max_{x\in\mathbb{R}^n,\ \left\Vert x\right\Vert_{(n)}=1}\ \left\Vert Ax\right\Vert_{(m)} .
\end{equation}$$ 如果把 $$\left\Vert\cdot\right\Vert_{(m)}$$ 和 $$\left\Vert\cdot\right\Vert_{(n)}$$ 都取为相应向量空间的 $$\ell_p$$ 范数，便得到 矩阵的 $$p$$ 范数 $$\left\Vert A\right\Vert_{p}$$．本书经常用到矩阵的 $$2$$ 范数 $$\begin{equation}
  \left\Vert A\right\Vert_2=\max_{x\in\mathbb{R}^n,\ \left\Vert x\right\Vert_2=1}\left\Vert Ax\right\Vert_2 .
\end{equation}$$

<div class="proposition">

(2.21) 中的 $$\max$$ 一定可以取到，且 $$\left\Vert\cdot\right\Vert_{(m,n)}$$ 满足范数的三条公理．

</div>

**Proof** **（）** *（$$\max$$ 可达）*集合 $$\lbracex:\left\Vert x\right\Vert_{(n)}=1\rbrace$$ 是 $$\mathbb{R}^n$$ 中的有界闭集，因而是紧集； $$x\mapsto\left\Vert Ax\right\Vert_{(m)}$$ 是连续函数，由前置知识第 9 条，它在紧集上取到最大值，故 (2.21) 中的 $$\max$$ 可以改写成\"取到最大值的上确界\"．

*（正定性）*$$\left\Vert A\right\Vert_{(m,n)}\ge0$$ 显然．若 $$\left\Vert A\right\Vert_{(m,n)}=0$$，则对任意 $$\left\Vert x\right\Vert_{(n)}=1$$ 有 $$Ax=0$$；对任意 $$x\ne0$$，取 $$u=x/\left\Vert x\right\Vert_{(n)}$$（单位向量），则 $$Ax=\left\Vert x\right\Vert_{(n)}Au=0$$；又 $$A0=0$$，故 $$A=0$$．反之 $$A=0$$ 时 $$\left\Vert A\right\Vert_{(m,n)}=0$$．

*（齐次性）*对 $$\alpha\in\mathbb{R}$$， $$\left\Vert\alpha A\right\Vert_{(m,n)}=\max_{\left\Vert x\right\Vert=1}\left\Vert\alpha Ax\right\Vert_{(m)}
=\max_{\left\Vert x\right\Vert=1}\left\vert\alpha\right\vert\left\Vert Ax\right\Vert_{(m)}=\left\vert\alpha\right\vert\left\Vert A\right\Vert_{(m,n)}$$．

*（三角不等式）*对 $$\left\Vert x\right\Vert_{(n)}=1$$， $$\begin{equation}
  \left\Vert(A+B)x\right\Vert_{(m)}\le\left\Vert Ax\right\Vert_{(m)}+\left\Vert Bx\right\Vert_{(m)}\le\left\Vert A\right\Vert_{(m,n)}+\left\Vert B\right\Vert_{(m,n)},
\end{equation}$$ 对 $$\left\Vert x\right\Vert_{(n)}=1$$ 取最大值即得．

<div class="proposition">

**命题 2.4** 根据算子范数的定义，所有算子范数都满足 $$\begin{equation}
  \left\Vert Ax\right\Vert_{(m)}\le\left\Vert A\right\Vert_{(m,n)}\left\Vert x\right\Vert_{(n)},\qquad \forall x\in\mathbb{R}^n .
\end{equation}$$ 性质 (2.24) 又被称为矩阵范数的**相容性**，即 $$\left\Vert\cdot\right\Vert_{(m,n)}$$ 与 $$\left\Vert\cdot\right\Vert_{(m)}$$ 和 $$\left\Vert\cdot\right\Vert_{(n)}$$ 是相容的．

</div>

**Proof** **（）** $$x=0$$ 时两端为 $$0$$．设 $$x\ne0$$，令 $$u=x/\left\Vert x\right\Vert_{(n)}$$，则 $$\left\Vert u\right\Vert_{(n)}=1$$，于是 $$\begin{equation}
  \left\Vert Ax\right\Vert_{(m)}=\left\Vert x\right\Vert_{(n)}\left\Vert Au\right\Vert_{(m)}
  \le\left\Vert x\right\Vert_{(n)}\max_{\left\Vert v\right\Vert_{(n)}=1}\left\Vert Av\right\Vert_{(m)}
  =\left\Vert A\right\Vert_{(m,n)}\left\Vert x\right\Vert_{(n)} .
\end{equation}$$

并非所有矩阵范数都与给定的向量范数相容**（并非所有矩阵范数都与给定的向量范数相容）** 由 (2.21) 诱导出的算子范数一定与相应的向量范数相容（命题 2.4），但一般的矩阵范数未必与给定的向量范数相容．例如 Frobenius 范数与 $$\left\Vert\cdot\right\Vert_1$$ 就不相容：取 $$\begin{equation}
  A=\tfrac12\begin{pmatrix}1\\1\\1\\1\end{pmatrix}\in\mathbb{R}^{4\times1},\qquad x=1\in\mathbb{R},
\end{equation}$$ 则 $$\left\Vert A\right\Vert_F=1$$，$$\left\Vert x\right\Vert_1=1$$，而 $$\left\Vert Ax\right\Vert_1=\left\Vert(\tfrac 12,\tfrac 12,\tfrac 12,\tfrac 12)^\top\right\Vert_1=2>1=\left\Vert A\right\Vert_F\left\Vert x\right\Vert_1$$． 在今后的应用中读者需要注意这一问题．

反过来也应当注意：本书按讲义约定定义的**逐元素**矩阵范数 $$\left\Vert A\right\Vert_1=\sum_{i,j}\left\vert a_{ij}\right\vert$$ 与 $$\left\Vert\cdot\right\Vert_1,\left\Vert\cdot\right\Vert_2$$ 却都是相容的．事实上 $$\begin{equation}
  \left\Vert Ax\right\Vert_1=\sum_{i=1}^m\left\vert\sum_{j=1}^n a_{ij}x_j\right\vert
  \le\sum_{i,j}\left\vert a_{ij}\right\vert\left\vert x_j\right\vert
  \le\left\Vert A\right\Vert_1\left\Vert x\right\Vert_\infty\le\left\Vert A\right\Vert_1\left\Vert x\right\Vert_1,
  \qquad
  \left\Vert Ax\right\Vert_2\le\left\Vert A\right\Vert_F\left\Vert x\right\Vert_2\le\left\Vert A\right\Vert_1\left\Vert x\right\Vert_2,
\end{equation}$$ 其中第二个不等式用了 Cauchy 不等式，最后一式用了 $$\left\Vert A\right\Vert_F\le\left\Vert A\right\Vert_1$$．逐元素 $$\left\Vert A\right\Vert_1$$ 与\"最大列和\"的真正区别在于：它**不是**由向量 $$\left\Vert\cdot\right\Vert_1$$ 诱导出来的 算子范数（后者是最大列和，见定理 2.1），二者是两个不同的矩阵范数．

下面给出 $$p=1,2,\infty$$ 三种算子范数的显式表达式及其推导．

<div class="theorem">

**定理 2.1** 设 $$A=(a_{ij})\in\mathbb{R}^{m\times n}$$，则 $$\begin{align}
  \left\Vert A\right\Vert_{p=1}&=\max_{\left\Vert x\right\Vert_1=1}\left\Vert Ax\right\Vert_1=\max_{1\le j\le n}\sum_{i=1}^m\left\vert a_{ij}\right\vert
  \quad\text{（最大列和）},\\[2pt]
  \left\Vert A\right\Vert_{p=2}&=\max_{\left\Vert x\right\Vert_2=1}\left\Vert Ax\right\Vert_2=\sqrt{\lambda_{\max}(A^\top A)}=\sigma_{\max}(A)
  \quad\text{（谱范数）},\\[2pt]
  \left\Vert A\right\Vert_{p=\infty}&=\max_{\left\Vert x\right\Vert_\infty=1}\left\Vert Ax\right\Vert_\infty=\max_{1\le i\le m}\sum_{j=1}^n\left\vert a_{ij}\right\vert
  \quad\text{（最大行和）}.
\end{align}$$

</div>

**Proof** **（）** *（1）$$p=1$$ 的情形．*先证上界：对任意 $$\left\Vert x\right\Vert_1=1$$， $$\begin{equation}
  \left\Vert Ax\right\Vert_1=\sum_{i=1}^m\left\vert\sum_{j=1}^n a_{ij}x_j\right\vert
  \le\sum_{i=1}^m\sum_{j=1}^n\left\vert a_{ij}\right\vert\left\vert x_j\right\vert
  =\sum_{j=1}^n\Big(\sum_{i=1}^m\left\vert a_{ij}\right\vert\Big)\left\vert x_j\right\vert
  \le\Big(\max_{1\le j\le n}\sum_{i=1}^m\left\vert a_{ij}\right\vert\Big)\sum_{j=1}^n\left\vert x_j\right\vert
  =\max_{1\le j\le n}\sum_{i=1}^m\left\vert a_{ij}\right\vert .
\end{equation}$$ 再证可达：设 $$j_0$$ 使 $$\sum_{i=1}^m\left\vert a_{ij_0}\right\vert=\max_j\sum_i\left\vert a_{ij}\right\vert$$，取 $$x=e_{j_0}$$ （第 $$j_0$$ 个标准基向量），则 $$\left\Vert x\right\Vert_1=1$$ 且 $$Ax$$ 等于 $$A$$ 的第 $$j_0$$ 列，于是 $$\left\Vert Ax\right\Vert_1=\sum_{i=1}^m\left\vert a_{ij_0}\right\vert$$，上界可达．故 (2.28) 成立．

*（2）$$p=\infty$$ 的情形．*对任意 $$\left\Vert x\right\Vert_\infty=1$$， $$\begin{equation}
  \left\Vert Ax\right\Vert_\infty=\max_{1\le i\le m}\left\vert\sum_{j=1}^n a_{ij}x_j\right\vert
  \le\max_{1\le i\le m}\sum_{j=1}^n\left\vert a_{ij}\right\vert\left\vert x_j\right\vert
  \le\max_{1\le i\le m}\sum_{j=1}^n\left\vert a_{ij}\right\vert .
\end{equation}$$ 可达性：设 $$i_0$$ 使 $$\sum_{j}\left\vert a_{i_0j}\right\vert=\max_i\sum_j\left\vert a_{ij}\right\vert$$，取 $$x_j=\operatorname{sgn}(a_{i_0j})$$（约定 $$\operatorname{sgn}(0)=1$$），则 $$\left\Vert x\right\Vert_\infty=1$$ 且 $$(Ax)_{i_0}=\sum_j a_{i_0j}\operatorname{sgn}(a_{i_0j})=\sum_j\left\vert a_{i_0j}\right\vert$$，故 $$\left\Vert Ax\right\Vert_\infty\ge\sum_j\left\vert a_{i_0j}\right\vert$$，上界可达．

*（3）$$p=2$$ 的情形．*由于 $$A^\top A$$ 对称半正定，由谱分解（前置知识第 3 条）存在正交矩阵 $$Q=(q_1,\dots,q_n)$$ 使 $$A^\top A=Q\Lambda Q^\top$$，$$\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$$， $$\lambda_1\ge\cdots\ge\lambda_n\ge0$$．对任意 $$x$$，令 $$y=Q^\top x$$，则 $$\left\Vert y\right\Vert_2=\left\Vert x\right\Vert_2$$ 且 $$\begin{equation}
  \left\Vert Ax\right\Vert_2^2=x^\top A^\top Ax=y^\top\Lambda y=\sum_{i=1}^n\lambda_i y_i^2
  \le\lambda_{\max}\sum_{i=1}^n y_i^2=\lambda_{\max}\left\Vert x\right\Vert_2^2 ,
\end{equation}$$ 其中 $$\lambda_{\max}=\lambda_1=\lambda_{\max}(A^\top A)$$．故 $$\left\Vert A\right\Vert_2\le\sqrt{\lambda_{\max}}$$． 取 $$x=q_1$$（对应 $$\lambda_{\max}$$ 的单位特征向量），则 $$\left\Vert x\right\Vert_2=1$$ 且 $$\left\Vert Ax\right\Vert_2^2=q_1^\top A^\top Aq_1=\lambda_1$$，上界可达，即 $$\left\Vert A\right\Vert_2=\sqrt{\lambda_{\max}(A^\top A)}$$．

再由奇异值分解 $$A=U\Sigma V^\top$$，其中 $$\Sigma=\operatorname{diag}(\sigma_1,\dots,\sigma_r,0,\dots)$$， $$r=\operatorname{rank}(A)$$，则 $$A^\top A=V\Sigma^\top\Sigma V^\top$$，故 $$\lambda_{\max}(A^\top A)=\sigma_1^2$$，即 $$\left\Vert A\right\Vert_2=\sigma_{\max}(A)=\sigma_1$$，这也解释了 $$\left\Vert A\right\Vert_2$$ 被称为 $$A$$ 的**谱范数**的原因．

<div class="definition">

给定矩阵 $$A\in\mathbb{R}^{m\times n}$$，其**核范数**定义为 $$\begin{equation}
  \left\Vert A\right\Vert_*=\sum_{i=1}^r\sigma_i,
\end{equation}$$ 其中 $$\sigma_i,\ i=1,2,\dots,r$$ 为 $$A$$ 的所有非零奇异值，$$r=\operatorname{rank}(A)$$．

</div>

类似于向量的 $$\ell_1$$ 范数的保稀疏性（$$\left\Vert x\right\Vert_1$$ 是 $$x$$ 中非零元\"个数\"的凸替代），我们也经常 通过限制矩阵的核范数来保证矩阵的**低秩性**（$$\left\Vert A\right\Vert_*$$ 是 $$\operatorname{rank}(A)$$ 的凸替代）； 同时，根据范数的三角不等式（下文中的凸性），相应的优化问题可以有效地求解．这是矩阵填充、 鲁棒主成分分析、低秩矩阵恢复等问题的基本出发点．

<div class="supp">

在矩阵内积空间 $$(\mathbb{R}^{m\times n},\left\langle \cdot,\,\cdot\right\rangle)$$（见 §2.1.3）中，核范数与谱范数互为对偶范数： $$\begin{equation}
  \left\Vert A\right\Vert_*=\max_{\left\Vert B\right\Vert_2\le1}\left\langle A,\,B\right\rangle,
  \qquad
  \left\Vert A\right\Vert_2=\max_{\left\Vert B\right\Vert_*\le1}\left\langle A,\,B\right\rangle.
\end{equation}$$ *证明*（第一式）．设 $$A$$ 的奇异值分解为 $$A=\sum_{i=1}^r\sigma_iu_iv_i^\top$$， $$u_i\in\mathbb{R}^m,\ v_i\in\mathbb{R}^n$$ 为标准正交列．对任意 $$\left\Vert B\right\Vert_2\le1$$， $$\begin{equation}
  \left\langle A,\,B\right\rangle=\operatorname{tr}(AB^\top)=\sum_{i=1}^r\sigma_i\,\operatorname{tr}(u_iv_i^\top B^\top)=\sum_{i=1}^r\sigma_i\,v_i^\top B^\top u_i,
\end{equation}$$ 而 $$v_i^\top B^\top u_i\le\left\Vert B^\top u_i\right\Vert_2\left\Vert v_i\right\Vert_2\le\left\Vert B\right\Vert_2\le1$$，于是 $$\left\langle A,\,B\right\rangle\le\sum_i\sigma_i=\left\Vert A\right\Vert_*$$．取 $$B=\sum_{i=1}^ru_iv_i^\top$$（部分等距矩阵），则 $$\left\Vert B\right\Vert_2=1$$，且由 $$\lbraceu_i\rbrace,\lbracev_i\rbrace$$ 的标准正交性， $$\begin{equation}
  \left\langle A,\,B\right\rangle=\sum_{i=1}^r\sigma_i\,v_i^\top\Big(\sum_{j=1}^r u_jv_j^\top\Big)^\top u_i
  =\sum_{i,j}\sigma_i\,(v_i^\top v_j)(u_j^\top u_i)=\sum_{i=1}^r\sigma_i=\left\Vert A\right\Vert_* ,
\end{equation}$$ 故上界可达，第一式成立．第二式由第一式与对偶范数的对称性（对偶范数的对偶范数是原范数）得到．

</div>

### 矩阵内积

对于矩阵空间 $$\mathbb{R}^{m\times n}$$ 的两个矩阵 $$A$$ 和 $$B$$，除了定义它们各自的范数以外，我们还可以定义 它们之间的内积．范数一般用来衡量矩阵的模的大小，而内积一般用来表征两个矩阵（或其张成的空间） 之间的夹角．这里介绍一种常用的内积------Frobenius 内积．

<div class="definition">

$$m\times n$$ 矩阵 $$A$$ 和 $$B$$ 的 **Frobenius 内积**定义为 $$\begin{equation}
  \left\langle A,\,B\right\rangle\overset{\text{def}}{=\joinrel=}\operatorname{tr}(AB^\top)=\sum_{i=1}^m\sum_{j=1}^n a_{ij}b_{ij}.
\end{equation}$$

</div>

它与向量内积的相容关系是：若把 $$A,B$$ 按列拉直为 $$mn$$ 维向量 $$\tilde a=\mathrm{vec}\,A,\ \tilde b=\mathrm{vec}\,B$$，则 $$\begin{equation}
  \left\langle A,\,B\right\rangle=\tilde a^\top\tilde b=\left\langle \tilde a,\,\tilde b\right\rangle,
\end{equation}$$ 即 Frobenius 内积就是拉直后向量空间的欧氏内积；换句话说， $$(\mathbb{R}^{m\times n},\left\langle \cdot,\,\cdot\right\rangle)$$ 与 $$(\mathbb{R}^{mn},\left\langle \cdot,\,\cdot\right\rangle)$$ 是等距同构的内积空间．

易知它是两个矩阵逐分量相乘的和，因而满足内积的定义：对称性 $$\left\langle A,\,B\right\rangle=\operatorname{tr}(AB^\top)=\operatorname{tr}(BA^\top)=\left\langle B,\,A\right\rangle$$；对第一变元的线性性由迹的线性性得到； 正定性 $$\left\langle A,\,A\right\rangle=\sum_{i,j}a_{ij}^2\ge0$$ 且等号成立当且仅当 $$A=0$$．当 $$A=B$$ 时， $$\begin{equation}
  \left\langle A,\,A\right\rangle=\sum_{i,j}a_{ij}^2=\left\Vert A\right\Vert_F^2,
\end{equation}$$ 即 $$\left\langle A,\,A\right\rangle$$ 等于矩阵 $$A$$ 的 F 范数的平方，这正是说 Frobenius 范数是由该内积**诱导** 出来的范数．由此还可以定义两个非零矩阵的\"夹角\" $$\cos\theta=\dfrac{\left\langle A,\,B\right\rangle}{\left\Vert A\right\Vert_F\left\Vert B\right\Vert_F}$$．

<div class="proposition">

设 $$A,B\in\mathbb{R}^{m\times n}$$，则 $$\begin{equation}
  \left\vert\left\langle A,\,B\right\rangle\right\vert\le\left\Vert A\right\Vert_F\left\Vert B\right\Vert_F,
\end{equation}$$ 等号成立当且仅当 $$A$$ 和 $$B$$ 线性相关．

</div>

**Proof** **（）** 把矩阵按列（或按行）拉直为向量：令 $$\tilde a=(\mathrm{vec}\,A)\in\mathbb{R}^{mn}$$， $$\tilde b=(\mathrm{vec}\,B)\in\mathbb{R}^{mn}$$，则 $$\begin{equation}
  \left\langle A,\,B\right\rangle=\sum_{i,j}a_{ij}b_{ij}=\tilde a^\top\tilde b,\qquad
  \left\Vert A\right\Vert_F=\left\Vert\tilde a\right\Vert_2,\qquad \left\Vert B\right\Vert_F=\left\Vert\tilde b\right\Vert_2 .
\end{equation}$$ 对 $$\tilde a,\tilde b$$ 应用向量的 Cauchy 不等式（§2.1.1）得 $$\left\vert\left\langle A,\,B\right\rangle\right\vert\le\left\Vert A\right\Vert_F\left\Vert B\right\Vert_F$$；等号成立当且仅当 $$\tilde a,\tilde b$$ 线性相关， 而这等价于 $$A,B$$ 线性相关（拉直是线性同构）．

<div class="supp">

矩阵内积与本章后续内容的联系可以概括为三点，供复习时对照：

- **对偶锥的定义**（§2.5.2）$$K^*=\lbracey:\left\langle x,\,y\right\rangle\ge0,\ \forall x\in K\rbrace$$ 中的 $$\left\langle \cdot,\,\cdot\right\rangle$$ 是内积；在 $$\mathbb{R}^n$$ 中它是 $$x^\top y$$，在 $$\mathcal{S}^{n}$$ 中它是 $$\operatorname{tr}(XY)$$， 在 $$\mathbb{R}^{m\times n}$$ 中它是 $$\operatorname{tr}(AB^\top)$$．

- **分离超平面**（§2.6）的方程 $$a^\top x=b$$ 中，$$a$$ 关于内积与集合\"垂直\"， 因此内积决定了\"超平面\"这一概念的含义．

- **由内积诱导的 Frobenius 范数**是最常用的\"矩阵模\"，因为它把矩阵当作 $$mn$$ 维向量处理，从而把矩阵空间上的几何问题（凸性、投影、分离）全部化为欧氏空间中的问题．

</div>

## 凸集的定义

### 仿射集与凸集

在 $$\mathbb{R}^n$$ 空间中，经过不同的两点 $$x_1,x_2$$ 可以确定一条直线，其方程为 $$\begin{equation}
  y=\theta x_1+(1-\theta)x_2,\qquad \theta\in\mathbb{R}.
\end{equation}$$ 特别地，当 $$0\le\theta\le1$$ 时，直线退化为以 $$x_1,x_2$$ 为端点的**线段**．当 $$\theta$$ 取遍 $$\mathbb{R}$$ 时，(2.43) 描述的是过 $$x_1,x_2$$ 的整条直线；当 $$\theta=0,1,\frac12$$ 时分别得到 $$x_2,x_1$$ 与中点 $$\frac{x_1+x_2}{2}$$．把 (2.43) 中的 $$\theta$$ 限制在 $$[0,1]$$， 就得到\"连接两点的线段\"这一几何对象，这正是下面两个定义唯一的差别．

<div class="definition">

如果过集合 $$C$$ 中任意两点的直线都在 $$C$$ 内，则称 $$C$$ 为**仿射集**，即 $$\begin{equation}
  x_1,x_2\in C\ \Longrightarrow\ \theta x_1+(1-\theta)x_2\in C,\qquad \forall\theta\in\mathbb{R}.
\end{equation}$$

</div>

<div class="example">

线性方程组 $$Ax=b$$ 的解集 $$X=\lbracex:Ax=b\rbrace$$ 是仿射集．因为 $$\forall x_1,x_2\in X$$ 与 $$\forall\theta\in\mathbb{R}$$，由 $$Ax_1=Ax_2=b$$ 得 $$\begin{equation}
  A\big(\theta x_1+(1-\theta)x_2\big)=\theta Ax_1+(1-\theta)Ax_2=\theta b+(1-\theta)b=b,
\end{equation}$$ 故 $$\theta x_1+(1-\theta)x_2\in X$$．反之，**任何仿射集均可表示为某一线性方程组的解集**．

</div>

**Proof** 反之的证明：仿射集的结构**（反之的证明：仿射集的结构）** 设 $$C\subseteq\mathbb{R}^n$$ 是非空仿射集，任取 $$x_0\in C$$，令 $$\begin{equation}
  V=C-x_0=\lbracex-x_0:\ x\in C\rbrace .
\end{equation}$$ 我们断言 $$V$$ 是 $$\mathbb{R}^n$$ 的**子空间**．

- $$0=x_0-x_0\in V$$；

- *对数乘封闭*：设 $$v\in V$$，即 $$v=x-x_0$$（$$x\in C$$）．对任意 $$\alpha\in\mathbb{R}$$，由 $$C$$ 的 仿射性（取 $$\theta=\alpha$$）有 $$\alpha x+(1-\alpha)x_0\in C$$，于是 $$\alpha v=\alpha(x-x_0)=\big(\alpha x+(1-\alpha)x_0\big)-x_0\in V$$；

- *对加法封闭*：设 $$v_1=x_1-x_0,\ v_2=x_2-x_0\in V$$．由上一段，$$\frac12v_1,\frac12v_2\in V$$， 再由仿射性（取 $$\theta=\frac12$$）有 $$\frac12x_1+\frac12x_2\in C$$，于是 $$\begin{equation}
      \tfrac12v_1+\tfrac12v_2=\big(\tfrac12x_1+\tfrac12x_2\big)-x_0\in V,
  \end{equation}$$ 再用一次数乘封闭性（乘以 $$2$$）得 $$v_1+v_2\in V$$．

因此 $$V$$ 是子空间．取 $$V^\perp$$ 的一组基作为行向量构成矩阵 $$B$$（当 $$V=\mathbb{R}^n$$ 时取 $$B=0$$）， 则 $$V=\mathcal N(B)=\lbracez:Bz=0\rbrace$$．于是 $$\begin{equation}
  C=x_0+V=\lbracex:\ B(x-x_0)=0\rbrace=\lbracex:\ Bx=Bx_0\rbrace,
\end{equation}$$ 即 $$C$$ 是线性方程组 $$Bx=Bx_0$$ 的解集．证毕．

<div class="definition">

如果连接集合 $$C$$ 中任意两点的线段都在 $$C$$ 内，则称 $$C$$ 为**凸集**，即 $$\begin{equation}
  x_1,x_2\in C\ \Longrightarrow\ \theta x_1+(1-\theta)x_2\in C,\qquad \forall\,0\le\theta\le1 .
\end{equation}$$

</div>

从仿射集与凸集的定义容易看出：**仿射集当然都是凸集**（因为 $$\mathbb{R}\supseteq[0,1]$$， 仿射集对一切 $$\theta\in\mathbb{R}$$ 封闭，自然对 $$0\le\theta\le1$$ 封闭）；反之不然，半空间是凸集但不是 仿射集（§2.3.1）．

<div class="example">

图 2.2 中，(a) 为凸集，(b)、(c) 均为非凸集，其中 (c) 不含部分边界点．

- (a)：一个边界完整的凸区域（如椭圆盘）．任取其中两点，连线上的点全部落在集合内．

- (b)：一个\"月牙形\"（两个圆盘之差），在凹陷处取两点，其连线段穿出集合，故非凸．

- (c)：一个\"去掉了一段边界的圆盘\"（或圆周上的弧段）．由于缺少部分边界点，取缺失边界 附近分居两侧的两点，其连线段上的点可能落在集合之外，故非凸．这说明**凸性对集合的 边界非常敏感**：一个集合\"差一点\"也未必是凸集．

</div>

**图 2.2**：一个凸集与两个非凸集．虚线表示落在集合之外（或缺失）的连线段．

如何证明一个集合是凸集**（如何证明一个集合是凸集）** 本章后续将反复使用两条思路：

1.  **用定义验证**：任取 $$x_1,x_2\in C$$ 与 $$\theta\in[0,1]$$，直接证明 $$\theta x_1+(1-\theta)x_2\in C$$；

2.  **用保凸运算**：说明 $$C$$ 可由简单的凸集（超平面、半空间、范数球、半正定锥等） 经过保凸的运算（取交、仿射变换、透视变换等）得到．

本节先给出若干基本的保凸运算（定理 2.2），§2.4 再系统讨论.

### 凸集的性质

<div class="theorem">

**定理 2.2**

1.  若 $$S$$ 是凸集，则 $$kS=\lbraceks\mid k\in\mathbb{R},\ s\in S\rbrace$$ 是凸集；

2.  若 $$S$$ 和 $$T$$ 均是凸集，则 $$S+T=\lbraces+t\mid s\in S,\ t\in T\rbrace$$ 是凸集；

3.  若 $$S$$ 和 $$T$$ 均是凸集，则 $$S\cap T$$ 是凸集；

4.  凸集的内部 $$\operatorname{int}S$$ 和闭包 $$\overline S$$ 都是凸集．

</div>

上述定理前 2 点在凸集定义的前提下是显然的．下面把 4 条一并补全证明．第 3 条是定理中最 常用的一条，先按 PPT 的思路给出简证，再给出其余各条的完整验证．

**Proof** **（）** *（1）数乘*．$$k=0$$ 时 $$kS=\lbrace0\rbrace$$，单点集显然是凸集．设 $$k\ne0$$，任取 $$x,y\in kS$$，即 $$x=ks_1,\ y=ks_2$$（$$s_1,s_2\in S$$）．对 $$\theta\in[0,1]$$， $$\begin{equation}
  \theta x+(1-\theta)y=k\big(\theta s_1+(1-\theta)s_2\big)\in kS,
\end{equation}$$ 其中用到 $$S$$ 的凸性（$$k\ne0$$ 保证括号内的点确实由 $$s_1,s_2$$ 经凸组合得到）．故 $$kS$$ 是凸集．

*（2）和集*．任取 $$x,y\in S+T$$，即 $$x=s_1+t_1,\ y=s_2+t_2$$（$$s_i\in S,\ t_i\in T$$）．对 $$\theta\in[0,1]$$， $$\begin{equation}
  \theta x+(1-\theta)y=\big[\theta s_1+(1-\theta)s_2\big]+\big[\theta t_1+(1-\theta)t_2\big]\in S+T,
\end{equation}$$ 其中第一项属于 $$S$$、第二项属于 $$T$$ 分别由 $$S,T$$ 的凸性得到．故 $$S+T$$ 是凸集．

*（3）交（PPT 的证明）*．设 $$x,y\in S\cap T$$ 且 $$\theta\in[0,1]$$．由于 $$S$$ 和 $$T$$ 均为凸集， $$\begin{equation}
  \theta x+(1-\theta)y\in S,\qquad \theta x+(1-\theta)y\in T,
\end{equation}$$ 因此 $$\theta x+(1-\theta)y\in S\cap T$$，这证明 $$S\cap T$$ 是凸集．

*（4a）内部*．设 $$x,y\in\operatorname{int}S$$，则存在 $$\epsilon_x,\epsilon_y>0$$ 使 $$B(x,\epsilon_x)\subseteq S$$，$$B(y,\epsilon_y)\subseteq S$$．令 $$\epsilon=\min\lbrace\epsilon_x,\epsilon_y\rbrace$$． 任取 $$z$$ 满足 $$\left\Vert z-\big(\theta x+(1-\theta)y\big)\right\Vert_2<\epsilon$$，记 $$w=z-\big(\theta x+(1-\theta)y\big)$$，则 $$\left\Vert w\right\Vert_2<\epsilon$$，且 $$\begin{equation}
  z=\theta(x+w)+(1-\theta)(y+w),\qquad
  x+w\in B(x,\epsilon)\subseteq S,\quad y+w\in B(y,\epsilon)\subseteq S .
\end{equation}$$ 由 $$S$$ 的凸性，$$z\in S$$．于是 $$B\big(\theta x+(1-\theta)y,\ \epsilon\big)\subseteq S$$，即 $$\theta x+(1-\theta)y\in\operatorname{int}S$$， 故 $$\operatorname{int}S$$ 是凸集．

*（4b）闭包*．设 $$x,y\in\overline S$$，则存在点列 $$\lbracex_k\rbrace,\lbracey_k\rbrace\subseteq S$$ 使 $$x_k\to x,\ y_k\to y$$．由 $$S$$ 的凸性，$$\theta x_k+(1-\theta)y_k\in S$$；再由线性运算的连续性， $$\begin{equation}
  \theta x_k+(1-\theta)y_k\ \longrightarrow\ \theta x+(1-\theta)y\qquad(k\to\infty),
\end{equation}$$ 故 $$\theta x+(1-\theta)y$$ 是 $$S$$ 中某点列的极限，从而属于 $$\overline S$$．即 $$\overline S$$ 是凸集．

<div class="theorem">

**定理 2.3** 任意多个凸集的交为凸集，即若 $$C_i,\ i\in I$$（$$I$$ 为任意指标集，不要求可列）是凸集，则 $$\begin{equation}
  \bigcap_{i\in I}C_i
\end{equation}$$ 为凸集．

</div>

**Proof** **（）** 设 $$x,y\in\bigcap_{i\in I}C_i$$ 且 $$\theta\in[0,1]$$．对每个 $$i\in I$$，由 $$x,y\in C_i$$ 与 $$C_i$$ 的 凸性得 $$\theta x+(1-\theta)y\in C_i$$．由于这对一切 $$i\in I$$ 成立， $$\theta x+(1-\theta)y\in\bigcap_{i\in I}C_i$$．

为什么\"取交\"如此重要**（为什么\"取交\"如此重要）** 实际上，任意多凸集的交都是凸集，而并集一般不是．该结论在证明复杂集合是凸集时非常有用， 因为我们可以考虑将其视为任意个凸集的交．例如：多面体是有限个半空间与超平面的交（§2.3.2）， 线性矩阵不等式的解集是 $$\mathcal{S}^{n}_{+}$$ 的原像（§2.4.1）， 对偶锥 $$K^*=\bigcap_{x\in K}\lbracey:\left\langle x,\,y\right\rangle\ge0\rbrace$$ 是无穷多个闭半空间的交（§2.5.3）． 反过来，两个凸集的并一般不是凸集：例如 $$\mathbb{R}$$ 中 $$[0,1]\cup[2,3]$$ 不是凸集．

### 凸组合与凸包

从凸集中可以引出凸组合和凸包的概念．

<div class="definition">

形如 $$\begin{equation}
  x=\theta_1x_1+\theta_2x_2+\cdots+\theta_kx_k,\qquad
  \theta_1+\theta_2+\cdots+\theta_k=1,\qquad \theta_i\ge0,\ i=1,\dots,k
\end{equation}$$ 的点称为 $$x_1,\dots,x_k$$ 的**凸组合**．

</div>

<div class="definition">

集合 $$S$$ 的所有点的凸组合构成的点集为 $$S$$ 的**凸包**，记为 $$\operatorname{conv}S$$．

</div>

上述定义可以等价地写成集合形式： $$\begin{equation}
  \operatorname{conv}S=\Big\lbrace\sum_{i=1}^k\theta_ix_i\ \Big\vert\ x_i\in S,\ \theta_i\ge0,\ \sum_{i=1}^k\theta_i=1,\ k\in\mathbb{N}\Big\rbrace .
\end{equation}$$

<div class="example">

图 2.3 列出了离散点集和连续点集的凸包．左子图为离散点集的凸包：有限个点 $$\lbracep_1,\dots,p_6\rbrace$$ 的凸包是包含这些点的最小凸多边形（即它们的\"外接\"凸多边形，其顶点是 这些点中的\"极点\"）；右子图为扇形（一段圆弧与两条半径围成的连续点集）的凸包：由于扇形本身 已经是凸集，其凸包即它自身；若只取一段圆弧（不含内部），则其凸包是圆弧与弦围成的弓形．

</div>

**图 2.3**：凸包的例子：离散点集（左）、扇形（中）与圆弧（右）．

<div class="theorem">

**定理 2.4** 若 $$\operatorname{conv}S\subseteq S$$，则 $$S$$ 是凸集；反之亦然．

</div>

上述定理并不显然，请尝试用数学归纳法证明（PPT 上的提示）．下面是完整证明．

**Proof** **（）** *（$$\Longleftarrow$$，即凸 $$\Rightarrow\operatorname{conv}S\subseteq S$$）*设 $$S$$ 是凸集．对凸组合中点的 **个数** $$k$$ 作数学归纳法，证明 $$S$$ 中任意 $$k$$ 个点的任意凸组合仍属于 $$S$$．

- $$k=1$$：凸组合就是该点本身，显然属于 $$S$$．

- $$k=2$$：由凸集的定义 (2.49) 直接得到．

- 归纳步：设结论对 $$k-1$$（$$k\ge3$$）成立．任取 $$x_1,\dots,x_k\in S$$ 与 $$\theta_1,\dots,\theta_k\ge0$$，$$\sum_{i=1}^k\theta_i=1$$，令 $$x=\sum_{i=1}^k\theta_ix_i$$． 若 $$\theta_k=1$$，则 $$x=x_k\in S$$．否则 $$\beta=\sum_{i=1}^{k-1}\theta_i=1-\theta_k>0$$，令 $$\begin{equation}
      y=\sum_{i=1}^{k-1}\frac{\theta_i}{\beta}x_i .
  \end{equation}$$ 注意 $$\frac{\theta_i}{\beta}\ge0$$ 且 $$\sum_{i=1}^{k-1}\frac{\theta_i}{\beta}=1$$，即 $$y$$ 是 $$x_1,\dots,x_{k-1}$$ 的凸组合，由归纳假设 $$y\in S$$．于是 $$\begin{equation}
      x=\sum_{i=1}^{k-1}\theta_ix_i+\theta_kx_k=\beta\,y+\theta_kx_k,\qquad \beta+\theta_k=1,\ \beta,\theta_k\ge0,
  \end{equation}$$ 由 $$S$$ 的凸性（$$k=2$$ 的情形）得 $$x\in S$$．归纳完成．

因此 $$\operatorname{conv}S\subseteq S$$．

*（$$\Longrightarrow$$，即 $$\operatorname{conv}S\subseteq S\Rightarrow$$ 凸）*设 $$\operatorname{conv}S\subseteq S$$．任取 $$x_1,x_2\in S$$ 与 $$\theta\in[0,1]$$．点 $$\theta x_1+(1-\theta)x_2$$ 是 $$S$$ 中两点的凸组合， 故属于 $$\operatorname{conv}S\subseteq S$$．按定义 (2.49)，$$S$$ 是凸集．

### $$\operatorname{conv}S$$ 是包含 $$S$$ 的最小凸集

<div class="theorem">

**定理 2.5** $$\operatorname{conv}S$$ 是包含 $$S$$ 的最小凸集．

</div>

**Proof** **（）** 由凸包的定义可知，$$S\subseteq\operatorname{conv}S$$，并且 $$\operatorname{conv}S$$ 是凸集（任取 $$x=\sum_i\theta_ix_i,\ y=\sum_j\mu_jy_j\in\operatorname{conv}S$$，对 $$\lambda\in[0,1]$$， $$\begin{equation}
  \lambda x+(1-\lambda)y=\sum_i(\lambda\theta_i)x_i+\sum_j\big((1-\lambda)\mu_j\big)y_j
\end{equation}$$ 的系数非负且和为 $$1$$，故仍属于 $$\operatorname{conv}S$$）．若再设 $$X$$ 是另一凸集且满足 $$S\subseteq X\subseteq\operatorname{conv}S$$，下面我们需要证明只可能是 $$X=\operatorname{conv}S$$．为证明此结论，我们先证明 一个重要的命题，从而直接导出本定理的成立．

<div class="theorem">

**定理 2.6** 对于任意向量集 $$S$$，$$\operatorname{conv}S$$ 是包含 $$S$$ 的一切凸集的交集．

</div>

**Proof** **（）** 令 $$X$$ 表示包含 $$S$$ 的所有凸集的交集．我们之前证明，凸集的交是凸集（定理 2.3），因此 $$X$$ 是凸集．因为 $$\operatorname{conv}S$$ 是一个凸集且包含 $$S$$， 所以 $$\operatorname{conv}S$$ 是求交的诸集合之一，于是 $$X\subseteq\operatorname{conv}S$$．

另一方面，$$S\subseteq X$$（每个包含 $$S$$ 的凸集都包含 $$S$$，故它们的交也包含 $$S$$），因此 $$\operatorname{conv}S\subseteq\operatorname{conv}X$$（若 $$A\subseteq B$$，则 $$A$$ 中点的凸组合也是 $$B$$ 中点的凸组合，故 $$\operatorname{conv}A\subseteq\operatorname{conv}B$$）．再由凸集和凸包的关系（定理 2.4）得到 $$\operatorname{conv}X=X$$，从而 $$\operatorname{conv}S\subseteq X$$．综上有 $$X=\operatorname{conv}S$$．

**Proof** 定理 2.5 的证明（续）**（定理 2.5 的证明（续））** 由定理 2.6，$$\operatorname{conv}S$$ 等于包含 $$S$$ 的一切凸集之交，而交集必定包含于其中 任何一个集合．因此对任何包含 $$S$$ 的凸集 $$C$$，都有 $$\operatorname{conv}S\subseteq C$$．又 $$\operatorname{conv}S$$ 本身是 凸集并且包含 $$S$$，故 $$\operatorname{conv}S$$ 是包含 $$S$$ 的凸集中\"最小\"的一个（按包含关系而言），即 $$\operatorname{conv}S$$ 是包含 $$S$$ 的最小凸集．证毕．

**（）** 定理 2.5 与定理 2.6 的关系是\"两级\"的：先证明 $$\operatorname{conv}S$$ 是一切包含 $$S$$ 的凸集之交（这保证了 $$\operatorname{conv}S$$ 被每个包含 $$S$$ 的凸集所包含）， 再由此断言最小性．注意这一结论与仿射包的情形完全平行（见下），也是后面用\"凸包\" 描述集合（例如 $$\operatorname{conv}\lbracee_1,\dots,e_n\rbrace$$ 是单纯形、$$\operatorname{conv}$$ 与线性映射可交换）的理论依据．

### 仿射包与凸锥

仿射集和凸集的定义很像，除了 $$\theta$$ 的范围有所不同．受此启发，从凸组合和凸包的定义中可以 自然引出仿射组合和仿射包的概念．

<div class="definition">

形如 $$\begin{equation}
  x=\theta_1x_1+\theta_2x_2+\cdots+\theta_kx_k,\qquad
  \theta_1+\theta_2+\cdots+\theta_k=1,\qquad \theta_i\in\mathbb{R},\ i=1,\dots,k
\end{equation}$$ 的点称为 $$x_1,\dots,x_k$$ 的**仿射组合**．

</div>

<div class="definition">

集合 $$S$$ 的所有点的仿射组合构成的点集为 $$S$$ 的**仿射包**，记为 $$\operatorname{aff}S$$，即 $$\begin{equation}
  \operatorname{aff}S=\Big\lbrace\sum_{i=1}^k\theta_ix_i\ \Big\vert\ x_1,\dots,x_k\in S,\ \theta_1+\cdots+\theta_k=1\Big\rbrace .
\end{equation}$$ $$\operatorname{aff}S$$ 是包含 $$S$$ 的最小仿射集．

</div>

**Proof** $$\operatorname{aff}S$$ 是最小仿射集的证明**（$$\operatorname{aff}S$$ 是最小仿射集的证明）** *（$$\operatorname{aff}S$$ 是仿射集）*任取 $$x=\sum_i\theta_ix_i,\ y=\sum_j\mu_jy_j\in\operatorname{aff}S$$（其中 $$\sum_i\theta_i=\sum_j\mu_j=1$$）与 $$\lambda\in\mathbb{R}$$，则 $$\begin{equation}
  \lambda x+(1-\lambda)y=\sum_i(\lambda\theta_i)x_i+\sum_j\big((1-\lambda)\mu_j\big)y_j,
\end{equation}$$ 其系数之和为 $$\lambda\cdot1+(1-\lambda)\cdot1=1$$，故该点仍是 $$S$$ 中点的仿射组合，属于 $$\operatorname{aff}S$$． 又取 $$k=1,\theta_1=1$$ 知 $$S\subseteq\operatorname{aff}S$$．

*（最小性）*设 $$A$$ 是任一包含 $$S$$ 的仿射集．对点数 $$k$$ 作归纳可证：$$A$$ 中任意有限个点的 仿射组合仍属于 $$A$$．$$k=1,2$$ 由 $$A$$ 的仿射性直接得到；设对 $$k-1$$ 成立，对 $$x=\sum_{i=1}^k\theta_ix_i$$（$$\sum_i\theta_i=1$$）：若 $$\theta_k=1$$ 则 $$x=x_k\in A$$；否则 $$\beta=\sum_{i=1}^{k-1}\theta_i=1-\theta_k\ne0$$，令 $$y=\sum_{i=1}^{k-1}\frac{\theta_i}{\beta}x_i$$， 由归纳假设 $$y\in A$$，于是 $$x=\beta y+\theta_kx_k\in A$$（因 $$\beta+\theta_k=1$$ 且 $$y,x_k\in A$$， 再用仿射性）．因此 $$S$$ 中任何点的仿射组合都在 $$A$$ 中，即 $$\operatorname{aff}S\subseteq A$$．故 $$\operatorname{aff}S$$ 是 包含 $$S$$ 的最小仿射集．

<div class="example">

图 2.4 为 $$\mathbb{R}^3$$ 中圆盘 $$S=\lbrace(x_1,x_2,x_3):x_1^2+x_2^2\le1,\ x_3=1\rbrace$$ 的仿射包 示意图．圆盘本身是二维凸集，但它的仿射包是把所有仿射组合都允许之后的集合：仿射组合允许 系数取负值，等价于允许沿\"弦\"的两端无限延伸，可见仿射包直接将原集合拓展为了其所在的 **全平面** $$\lbracex:x_3=1\rbrace$$．一般地，$$d$$ 维集合的仿射包维数不超过 $$d$$，且 $$\dim\operatorname{aff}S$$ 正是 $$S$$ 所在\"最小平面\"的维数．

</div>

**图 2.4**：$$\mathbb{R}^3$$ 中圆盘 $$S$$ 的仿射包 $$\operatorname{aff}S$$ 是它所在的整张平面．

<div class="definition">

若对于非空集合 $$S$$ 的任意元素 $$x$$ 和任意 $$\lambda>0$$ 都有 $$\lambda x\in S$$，则称集合 $$S$$ 为一个 **锥**．如果锥 $$S$$ 同时是凸集，则称其为**凸锥**．

</div>

<div class="definition">

对于 $$k\ge1$$，形如 $$\begin{equation}
  x=\sum_{i=1}^k\theta_ix_i,\qquad x_1,x_2,\dots,x_k\in S,\qquad \theta_i>0,\ i=1,\dots,k
\end{equation}$$ 的点称为点 $$\lbracex_i\rbrace_{i=1}^k$$ 的**锥组合**．

</div>

相比于凸组合和仿射组合，锥组合不要求系数的和为 $$1$$，因此一般而言锥组合都是开放的： 它允许沿方向任意伸缩，也允许把不同方向上的点\"叠加\"起来，但不允许\"内插\"（内插由凸性提供， 而凸锥的定义同时包含了锥性与凸性）．

<div class="theorem">

集合 $$S$$ 为凸锥，当且仅当 $$S$$ 中任意点的锥组合都在 $$S$$ 中．

</div>

**Proof** **（）** *（$$\Longrightarrow$$）*设 $$S$$ 是凸锥．对锥组合中点的个数 $$k$$ 作归纳．$$k=1$$ 时 $$\theta_1x_1\in S$$ 由 $$S$$ 是锥（$$\theta_1>0$$）得到．设结论对 $$k-1$$ 成立， $$x=\sum_{i=1}^{k}\theta_ix_i$$，令 $$y=\sum_{i=1}^{k-1}\theta_ix_i\in S$$（归纳假设）．由于 $$S$$ 是锥， $$2y\in S$$；又由 $$S$$ 的凸性（取 $$\theta=\frac12$$）， $$\begin{equation}
  y+\theta_kx_k=\tfrac12(2y)+\tfrac12(2\theta_kx_k)\in S,
\end{equation}$$ 其中 $$2\theta_kx_k\in S$$ 同样由锥性得到．故 $$x=y+\theta_kx_k\in S$$．

*（$$\Longleftarrow$$）*设 $$S$$ 中任意点的锥组合都在 $$S$$ 中．

- $$S$$ 是锥：任取 $$x\in S$$ 与 $$\lambda>0$$，则 $$\lambda x$$ 是单点 $$x$$ 的锥组合，故 $$\lambda x\in S$$；

- $$S$$ 是凸集：任取 $$x,y\in S$$ 与 $$\theta\in[0,1]$$．若 $$\theta\in(0,1)$$，则 $$\theta x+(1-\theta)y$$ 是 $$x,y$$ 的锥组合（两个系数都严格为正），故属于 $$S$$；若 $$\theta=0$$ 或 $$1$$，则该点就是 $$y$$ 或 $$x$$，也属于 $$S$$．故 $$S$$ 是凸集．

综上 $$S$$ 是凸锥．

<div class="example">

图 2.5 显示了 $$\mathbb{R}^2$$ 中两点 $$x_1,x_2$$ 的凸锥，即 $$\lbrace\theta_1x_1+\theta_2x_2:\theta_1,\theta_2>0\rbrace\cup\lbrace0\rbrace$$．可见若 $$\mathbb{R}^2$$ 中两点不与原点 $$O$$ 共线，则其形成的凸锥为一个半径无穷的圆的扇形部分（两条射线之间的角形区域）；若两点与原点 共线且同向，则凸锥退化为一条射线；若两点与原点共线但反向（例如 $$x_2=-x_1$$），则锥组合可以 产生过原点的整条直线，此时该凸锥含有直线，不是\"尖\"的------这说明**凸锥并不一定是尖锥** （尖锥的概念见 §2.5.1）．

</div>

**图 2.5**：$$\mathbb{R}^2$$ 中两点 $$x_1,x_2$$ 的凸锥（阴影部分）．

## 重要的凸集举例

下面将介绍一些重要的凸集．这些凸集在实际问题中常常会遇到，也是后续各章建立优化模型 （线性规划、二次锥规划、半定规划）的基本构件．

### 超平面与半空间

<div class="definition">

任取非零向量 $$a\in\mathbb{R}^n$$，形如 $$\begin{equation}
  \lbracex\mid a^\top x=b\rbrace
\end{equation}$$ 的集合称为**超平面**．

</div>

<div class="definition">

任取非零向量 $$a\in\mathbb{R}^n$$，形如 $$\begin{equation}
  \lbracex\mid a^\top x\le b\rbrace
\end{equation}$$ 的集合称为**半空间**．

</div>

$$a$$ 是对应的超平面和半空间的**法向量**，它与超平面内任意两点之差正交： 若 $$a^\top x_1=a^\top x_2=b$$，则 $$a^\top(x_1-x_2)=0$$．一个超平面将 $$\mathbb{R}^n$$ 分为两个半空间 $$\lbracex:a^\top x\le b\rbrace$$ 与 $$\lbracex:a^\top x\ge b\rbrace$$，二者以该超平面为公共边界．

<div class="proposition">

超平面是仿射集和凸集，半空间是凸集但不是仿射集．

</div>

**Proof** **（）** *（超平面是仿射集）*任取 $$x_1,x_2\in\lbracex:a^\top x=b\rbrace$$ 与 $$\theta\in\mathbb{R}$$，则 $$\begin{equation}
  a^\top\big(\theta x_1+(1-\theta)x_2\big)=\theta a^\top x_1+(1-\theta)a^\top x_2=\theta b+(1-\theta)b=b,
\end{equation}$$ 故 $$\theta x_1+(1-\theta)x_2$$ 也在该集合中．由仿射集的定义，超平面是仿射集．由于仿射集都是 凸集，超平面也是凸集．（也可以直接看出：超平面正是线性方程组 $$a^\top x=b$$ 的解集，与 §2.2.1 的例子一致．）

*（半空间是凸集）*任取 $$x_1,x_2\in\lbracex:a^\top x\le b\rbrace$$ 与 $$\theta\in[0,1]$$，由 $$a^\top x_i\le b$$ 得 $$\begin{equation}
  a^\top\big(\theta x_1+(1-\theta)x_2\big)=\theta\,a^\top x_1+(1-\theta)\,a^\top x_2
  \le\theta b+(1-\theta)b=b,
\end{equation}$$ 故半空间是凸集．

*（半空间不是仿射集）*只要存在 $$x_0$$ 使 $$a^\top x_0<b$$（例如 $$a\ne0$$ 时取 $$x_0=-\lambda a$$，$$\lambda$$ 充分大），对 $$\theta$$ 取足够大的负值便有 $$b<\theta a^\top x_0+(1-\theta)b$$，即 $$\theta x_0+(1-\theta)x$$（其中 $$x$$ 满足 $$a^\top x=b$$） 可能越出半空间．例如在 $$\mathbb{R}^2$$ 中，$$x=(1,0)$$ 与 $$x_0=(0,0)$$ 都属于 $$\lbracex:x_1+x_2\le1\rbrace$$，但 $$\theta x+(1-\theta)x_0=(\theta,0)$$ 在 $$\theta=3$$ 时不属于该集合．故半空间不是仿射集．

**图 2.6**：$$\mathbb{R}^2$$ 中的超平面（左）与半空间（右）．法向量 $$a$$ 指向 $$a^\top x$$ 增大的方向．

### 多面体

我们把满足线性等式和不等式组的点的集合称为**多面体**，即 $$\begin{equation}
  \lbracex\mid Ax\le b,\ Cx=d\rbrace,
\end{equation}$$ 其中 $$A\in\mathbb{R}^{m\times n}$$，$$C\in\mathbb{R}^{p\times n}$$，$$x\le y$$ 表示向量 $$x$$ 的每个分量都小于等于 $$y$$ 的 对应分量．把 $$Ax\le b$$ 按行展开，可见多面体是有限个半空间和超平面的交： $$\begin{equation}
  \lbracex\mid Ax\le b,\ Cx=d\rbrace=\Big(\bigcap_{i=1}^m\lbracex\mid a_i^\top x\le b_i\rbrace\Big)
  \cap\Big(\bigcap_{j=1}^p\lbracex\mid c_j^\top x=d_j\rbrace\Big),
\end{equation}$$ 其中 $$a_i^\top$$ 与 $$c_j^\top$$ 分别是 $$A$$ 与 $$C$$ 的第 $$i$$ 行与第 $$j$$ 行．因此由凸集的性质 （定理 2.3）可知，多面体为凸集．特别地，非负卦限 $$\mathbb{R}^n_+=\lbracex:x\ge0\rbrace$$、单纯形、超立方体都是多面体；线性规划 $$\min\lbracec^\top x:Ax\le b,\ Cx=d\rbrace$$ 的可行域正是多面体．

**图 2.7**：多面体是有限个半空间的交．虚线表示各个半空间的边界超平面，多面体的每个顶点都是 若干边界超平面的交点．

### 球与椭球

如下定义的球和椭球也是常见的凸集．

<div class="definition">

设空间中到某一定点 $$x_c$$（称为**中心**）的距离小于等于定值 $$r$$（称为**半径**） 的点的集合为（范数）**球**，即 $$\begin{equation}
  B(x_c,r)=\lbracex\mid\left\Vert x-x_c\right\Vert\le r\rbrace=\lbracex_c+ru\mid\left\Vert u\right\Vert\le1\rbrace.
\end{equation}$$ 一般而言，我们使用 $$\left\Vert\cdot\right\Vert_2$$ 度量距离，即使用 $$2$$-范数球；若把 $$\left\Vert\cdot\right\Vert$$ 换成 任意范数，则 (2.72) 称为**范数球**．

</div>

**Proof** (2.72) 中两种表示等价**（(2.72) 中两种表示等价）** 若 $$x=x_c+ru$$ 且 $$\left\Vert u\right\Vert\le1$$，则 $$\left\Vert x-x_c\right\Vert=r\left\Vert u\right\Vert\le r$$．反之若 $$\left\Vert x-x_c\right\Vert\le r$$ 且 $$r>0$$，令 $$u=(x-x_c)/r$$，则 $$\left\Vert u\right\Vert=\left\Vert x-x_c\right\Vert/r\le1$$，且 $$x=x_c+ru$$．

<div class="definition">

设形如 $$\begin{equation}
  \Big\lbracex\mid (x-x_c)^\top P^{-1}(x-x_c)\le1\Big\rbrace=\lbracex_c+Au\mid\left\Vert u\right\Vert_2\le1\rbrace
\end{equation}$$ 的集合为**椭球**，其中 $$x_c$$ 为椭球中心，$$P$$ 对称正定，且 $$A$$ 非奇异．

</div>

<div class="proposition">

设 $$P\in\mathcal{S}^{n}_{++}$$，$$A$$ 非奇异．则对任意 $$x_c$$， $$\begin{equation}
  \big\lbracex:(x-x_c)^\top P^{-1}(x-x_c)\le1\big\rbrace=\big\lbracex_c+Au:\left\Vert u\right\Vert_2\le1\big\rbrace,
\end{equation}$$ 其中右端取 $$A=P^{1/2}$$；反过来，对任意非奇异的 $$A$$，右端集合等于左端集合，此时取 $$P=AA^\top$$．

</div>

**Proof** **（）** *（$$\supseteq$$）*设 $$x=x_c+Au$$ 且 $$\left\Vert u\right\Vert_2\le1$$，令 $$P=AA^\top$$．由 $$A$$ 非奇异知 $$P$$ 对称正定，且 $$\begin{equation}
  P^{-1}=(AA^\top)^{-1}=(A^\top)^{-1}A^{-1}
\end{equation}$$ （用到前置知识第 12 条），于是 $$\begin{equation}
  (x-x_c)^\top P^{-1}(x-x_c)=u^\top A^\top (A^\top)^{-1}A^{-1}Au=u^\top u=\left\Vert u\right\Vert_2^2\le1,
\end{equation}$$ 故 $$x$$ 属于左端集合．

*（$$\subseteq$$）*设 $$(x-x_c)^\top P^{-1}(x-x_c)\le1$$，取 $$A=P^{1/2}$$（对称正定、非奇异）与 $$u=P^{-1/2}(x-x_c)$$，则 $$x=x_c+P^{1/2}u$$，且 $$\begin{equation}
  \left\Vert u\right\Vert_2^2=(x-x_c)^\top P^{-1/2}P^{-1/2}(x-x_c)=(x-x_c)^\top P^{-1}(x-x_c)\le1,
\end{equation}$$ 故 $$x$$ 属于右端集合．两个包含关系合起来即得结论．

表示不唯一**（表示不唯一）** $$P$$ 与 $$A$$ 之间的对应 $$P=AA^\top$$ 不是一一的：若 $$A$$ 给出某个椭球，则对任意正交矩阵 $$Q$$， $$AQ$$ 给出同一个椭球，因为 $$(AQ)(AQ)^\top=AA^\top$$．这正对应\"椭球由 $$P$$ 唯一决定、而 $$A$$ 只定到 一个正交变换\"这一事实．例如单位球既可写成 $$P=I$$，也可写成 $$A=Q$$（任意正交阵）．

球与椭球都是凸集．一方面可以直接用定义验证：若 $$\left\Vert x_i-x_c\right\Vert\le r$$，则 $$\begin{equation}
  \left\Vert\theta x_1+(1-\theta)x_2-x_c\right\Vert=\left\Vert\theta(x_1-x_c)+(1-\theta)(x_2-x_c)\right\Vert
  \le\theta r+(1-\theta)r=r;
\end{equation}$$ 另一方面，$$B(x_c,r)=x_c+rB(0,1)$$ 是单位球的平移与缩放，而椭球 $$\lbracex_c+Au:\left\Vert u\right\Vert_2\le1\rbrace$$ 是单位球的仿射像，由 §2.4 的仿射变换保凸性（定理 2.8）也可立即得到凸性．注意椭球也可以写成 $$\lbracex:\left\Vert A^{-1}(x-x_c)\right\Vert_2\le1\rbrace$$，即用\"椭球范数\" $$\left\Vert\cdot\right\Vert_{A^{-1}}$$ 定义的范数球， 这与 §2.1.1 中正定矩阵诱导的范数一致．

**图 2.8**：球（左）与椭球（右）．椭球是单位球在非奇异仿射变换 $$u\mapsto x_c+Au$$ 下的像．

### 范数锥

球和椭球的范围取决于 $$x$$ 的范围，而锥的范围则同时取决于 $$x$$ 和控制径 $$t$$ 的范围．

<div class="definition">

形如 $$\begin{equation}
  \lbrace(x,t)\mid\left\Vert x\right\Vert\le t\rbrace
\end{equation}$$ 的集合为**范数锥**．锥是凸集．同时，使用 $$\left\Vert\cdot\right\Vert_2$$ 度量距离的锥为**二次锥**， 也称**冰淇淋锥**（ice-cream cone），即 $$\begin{equation}
  \mathcal K_2=\lbrace(x,t)\in\mathbb{R}^{n+1}\mid\left\Vert x\right\Vert_2\le t\rbrace.
\end{equation}$$

</div>

**Proof** 范数锥是凸锥**（范数锥是凸锥）** *（是锥）*设 $$(x,t)$$ 满足 $$\left\Vert x\right\Vert\le t$$，$$\lambda\ge0$$，则 $$\left\Vert\lambda x\right\Vert=\lambda\left\Vert x\right\Vert\le\lambda t$$，故 $$\lambda(x,t)=(\lambda x,\lambda t)$$ 仍满足 定义，即范数锥对非负数乘封闭．

*（是凸集）*设 $$\left\Vert x_1\right\Vert\le t_1,\ \left\Vert x_2\right\Vert\le t_2$$，$$\theta\in[0,1]$$．由三角不等式与 齐次性， $$\begin{equation}
  \left\Vert\theta x_1+(1-\theta)x_2\right\Vert\le\theta\left\Vert x_1\right\Vert+(1-\theta)\left\Vert x_2\right\Vert
  \le\theta t_1+(1-\theta)t_2,
\end{equation}$$ 故 $$\theta(x_1,t_1)+(1-\theta)(x_2,t_2)\in\lbrace(x,t):\left\Vert x\right\Vert\le t\rbrace$$．范数锥既是锥又是凸集， 从而是凸锥．

关于 $$t\ge 0$$ 的约定**（关于 $$t\ge 0$$ 的约定）** 由 $$\left\Vert x\right\Vert\ge0$$ 可知，$$\left\Vert x\right\Vert\le t$$ 自动蕴含 $$t\ge0$$，因此 (2.79) 中不必额外 要求 $$t\ge0$$．当 $$t=0$$ 时只有 $$x=0$$，即锥的顶点（原点）总是属于范数锥．PPT 在讨论对偶锥时写 $$t>0$$，那是因为在写 $$K=\lbrace(x,t):\left\Vert x\right\Vert_p\le t,\ t>0\rbrace$$ 时把顶点排除在外；由于该集合的非零 点集在 $$K=\lbrace(x,t):\left\Vert x\right\Vert_p\le t\rbrace$$ 中稠密，这对对偶锥的计算没有影响（详见 §2.5.2 例 (c)）．

图 2.9 画出了二次锥在 $$\mathbb{R}^2\times\mathbb{R}$$ 中的形状：它由顶点出发，沿着 $$t$$ 轴方向 \"张开\"，与 $$t$$ 轴成 $$45^\circ$$ 的半顶角；若沿垂直于 $$t$$ 轴的方向看去，它像一只倒置的 冰淇淋筒．锥内任意两点的连线仍在锥内（凸性），锥内任意点沿非负方向伸缩仍在锥内（锥性）．

**图 2.9**：$$\mathbb{R}^2\times\mathbb{R}$$ 中的二次锥（冰淇淋锥）$$\lbrace(x_1,x_2,t):\sqrt{x_1^2+x_2^2}\le t\rbrace$$． 粗线为截面 $$t=1$$ 上的单位圆，细线为由顶点出发的母线．

### 对称矩阵集合与半正定锥

我们介绍 3 类矩阵的集合．

<div class="definition">

记 $$\mathcal{S}^{n}$$ 为 $$n\times n$$ 对称矩阵的集合，即 $$\begin{equation}
  \mathcal{S}^{n}=\lbraceX\in\mathbb{R}^{n\times n}\mid X^\top=X\rbrace.
\end{equation}$$

</div>

<div class="definition">

记 $$\mathcal{S}^{n}_{+}$$ 为 $$n\times n$$ 半正定矩阵的集合，即 $$\begin{equation}
  \mathcal{S}^{n}_{+}=\lbraceX\in\mathcal{S}^{n}\mid X\succeq0\rbrace.
\end{equation}$$

</div>

<div class="definition">

记 $$\mathcal{S}^{n}_{++}$$ 为 $$n\times n$$ 正定矩阵的集合，即 $$\begin{equation}
  \mathcal{S}^{n}_{++}=\lbraceX\in\mathcal{S}^{n}\mid X\succ0\rbrace.
\end{equation}$$

</div>

我们一般称 $$\mathcal{S}^{n}_{+}$$ 为**半正定锥**，称 $$\mathcal{S}^{n}_{++}$$ 为**正定锥**．注意 $$\mathcal{S}^{n}$$ 是 $$\frac{n(n+1)}2$$ 维的线性子空间（它是子空间，因而当然是仿射集和凸集），$$\mathcal{S}^{n}_{+}$$ 是它的凸子集， 而 $$\mathcal{S}^{n}_{++}=\operatorname{int}\mathcal{S}^{n}_{+}$$ 是开集（因此 $$\mathcal{S}^{n}_{++}$$ 不是闭集，它本身只是凸集而不是锥------因为 $$\mathcal{S}^{n}_{++}$$ 对 非负数乘不封闭：$$0\cdot X=0\notin\mathcal{S}^{n}_{++}$$）．

<div class="proposition">

$$\mathcal{S}^{n}_{+}$$ 是凸锥（因此也称为半正定锥）．

</div>

**Proof** **（）** *（锥性）*设 $$X\succeq0$$，$$\lambda\ge0$$．对任意 $$z\in\mathbb{R}^n$$， $$z^\top(\lambda X)z=\lambda\,z^\top Xz\ge0$$，故 $$\lambda X\succeq0$$．

*（凸性）*设 $$X,Y\succeq0$$，$$\theta\in[0,1]$$．对任意 $$z\in\mathbb{R}^n$$， $$\begin{equation}
  z^\top\big(\theta X+(1-\theta)Y\big)z=\theta\,z^\top Xz+(1-\theta)\,z^\top Yz\ge0,
\end{equation}$$ 故 $$\theta X+(1-\theta)Y\succeq0$$．综上 $$\mathcal{S}^{n}_{+}$$ 是凸锥．

<div class="example">

考察 $$2\times2$$ 对称矩阵 $$\begin{equation}
  A=\begin{pmatrix}x&y\\ y&z\end{pmatrix}\in\mathcal S^2 .
\end{equation}$$ 我们证明 $$\begin{equation}
  A\succeq0\iff x\ge0,\quad z\ge0,\quad xz\ge y^2 .
\end{equation}$$ 由此可知二维半正定锥的几何形状为 $$\begin{equation}
  \Big\lbrace(x,y,z)\in\mathbb{R}^3\ \Big\vert\ x\ge0,\ z\ge0,\ xz\ge y^2\Big\rbrace,
\end{equation}$$ 它的边界由曲面 $$xz=y^2$$ 与两个半平面 $$x=0$$（$$z\ge0$$）和 $$z=0$$（$$x\ge0$$）组成．

</div>

**Proof** (2.87) 的证明**（(2.87) 的证明）** **证法一（特征值）．**对称矩阵 $$A$$ 的两个特征值为 $$\begin{equation}
  \lambda_{1,2}=\frac{(x+z)\pm\sqrt{(x-z)^2+4y^2}}{2},
\end{equation}$$ 它们都是实数，且 $$\lambda_1+\lambda_2=x+z=\operatorname{tr}(A)$$，$$\lambda_1\lambda_2=xz-y^2=\det(A)$$． 于是 $$\begin{equation}
  \lambda_1,\lambda_2\ge0
  \iff \operatorname{tr}(A)\ge0\ \text{且}\ \det(A)\ge0
  \iff x+z\ge0\ \text{且}\ xz-y^2\ge0,
\end{equation}$$ 其中\"$$\Leftarrow$$\"由\"两个实数同号（或有一个为零）且和为非负，则两者都非负\"得到， \"$$\Rightarrow$$\"是显然的．另一方面， $$\begin{equation}
  x+z\ge0\ \text{且}\ xz\ge y^2\ \Longrightarrow\ x\ge0\ \text{且}\ z\ge0,
\end{equation}$$ 因为 $$xz\ge y^2\ge0$$ 说明 $$x,z$$ 同号（或至少有一个为 $$0$$）：若 $$x<0$$，则 $$z\le0$$，于是 $$x+z<0$$，与 $$x+z\ge0$$ 矛盾；对称地可排除 $$z<0$$．把 (2.90) 与 (2.91) 合起来，并注意 $$x\ge0,z\ge0,xz\ge y^2$$ 显然蕴含 $$x+z\ge0$$ 与 $$xz-y^2\ge0$$，即得 $$\begin{equation}
  A\succeq0\iff x+z\ge0,\ xz\ge y^2\iff x\ge0,\ z\ge0,\ xz\ge y^2 .
\end{equation}$$ （这也直接给出了 PPT 中的断言：\"对于矩阵 $$\begin{pmatrix}x&y\\y&z\end{pmatrix}$$，其特征值应 全部大于等于 $$0$$，由此可推出 $$x\ge0,z\ge0,xz\ge y^2$$\"．）

**证法二（Schur 补）．**若 $$x>0$$，由前置知识第 7 条（Schur 补）， $$\begin{equation}
  \begin{pmatrix}x&y\\ y&z\end{pmatrix}\succeq0
  \iff z-\frac{y^2}{x}\ge0\iff xz\ge y^2 ;
\end{equation}$$ 若 $$x=0$$，则对 $$u=(1,0)^\top$$ 有 $$u^\top Au=0$$，由 $$A\succeq0$$ 得 $$Au=(0,y)^\top=0$$，即 $$y=0$$，于是 $$A=\begin{pmatrix}0&0\\0&z\end{pmatrix}\succeq0\iff z\ge0$$，此时 $$x\ge0,z\ge0,xz\ge y^2$$ 恰好成立．两种证法结论一致．

<div class="supp">

作变量替换 $$\begin{equation}
  u=\frac{x+z}{2},\qquad v=\frac{x-z}{2},\qquad\text{即}\quad x=u+v,\quad z=u-v,
\end{equation}$$ 则 $$\begin{equation}
  x\ge0,\ z\ge0,\ xz\ge y^2
  \iff u\ge\left\vert v\right\vert\ \text{且}\ u^2-v^2\ge y^2
  \iff u\ge\sqrt{v^2+y^2}
\end{equation}$$ （最后一个等价成立是因为 $$\sqrt{v^2+y^2}\ge\left\vert v\right\vert$$ 自动蕴含 $$u\ge\left\vert v\right\vert$$）．也就是说， **$$2\times2$$ 半正定锥在坐标变换 $$(x,y,z)\mapsto(u,v,y)$$ 下恰好变成标准的二次锥** $$\lbrace(v,y,u):\sqrt{v^2+y^2}\le u\rbrace$$：它以向量 $$(1,0,1)$$（即 $$x=z$$ 方向）为轴，半顶角为 $$45^\circ$$，并与半平面 $$x=0$$（沿 $$z$$ 轴正向）和 $$z=0$$（沿 $$x$$ 轴正向）相切．这解释了为什么 二维半正定锥的图像看起来像一个\"斜放着的冰淇淋筒\"．一般地，$$\mathcal S^n_+$$ 是 $$\mathbb{R}^{\frac{n(n+1)}2}$$ 中的**闭凸尖锥**（见 §2.5.1），但当 $$n\ge2$$ 时它不是多面体 （它的边界含有曲面 $$xz=y^2$$）．

</div>

**图 2.10**：二维半正定锥 $$\mathcal S^2_+=\lbrace(x,y,z):x\ge0,\ z\ge0,\ xz\ge y^2\rbrace$$．左图：在坐标变换 $$u=\frac{x+z}{2},\ v=\frac{x-z}{2}$$ 下它就是标准的二次锥 $$\lbrace\sqrt{v^2+y^2}\le u\rbrace$$（推导见补充框）， 图中竖直方向为 $$u$$，锥面与 $$x$$ 轴射线、$$z$$ 轴射线相切（这正是 $$x\ge0$$、$$z\ge0$$ 这两个约束的 几何表现），$$v$$ 轴指向右方、$$y$$ 轴指向左下方．右图：固定 $$y=y_0$$ 时的截面 $$\lbracex\ge0,\ z\ge0,\ xz\ge y_0^2\rbrace$$，其边界为双曲线 $$xz=y_0^2$$ 的一段．

## 保凸的运算

下面介绍证明一个集合（设为 $$C$$）为凸集的两种方式．第一种是利用定义 $$\begin{equation}
  x_1,x_2\in C,\ 0\le\theta\le1\ \Longrightarrow\ \theta x_1+(1-\theta)x_2\in C
\end{equation}$$ 来证明集合 $$C$$ 是凸集．第二种方法是说明集合 $$C$$ 可由简单的凸集（超平面、半空间、范数球等） 经过**保凸的运算**后得到．为此，我们需要掌握一些常见的保凸运算．前文已经证明的\"取交\" （定理 2.3）是第一种保凸运算，下面的两个定理分别说明了 **仿射变换**与**透视变换/分式线性变换**这两种运算也是保凸的．

### 仿射变换的保凸性

仿射变换（缩放、平移、投影等）也是保凸的．

<div class="theorem">

**定理 2.8** 设 $$f:\mathbb{R}^n\to\mathbb{R}^m$$ 是仿射变换，即 $$f(x)=Ax+b$$，$$A\in\mathbb{R}^{m\times n}$$，$$b\in\mathbb{R}^m$$，则

1.  凸集在 $$f$$ 下的**像**是凸集： $$\begin{equation}
        S\subseteq\mathbb{R}^n\ \text{是凸集}\ \Longrightarrow\ f(S)\overset{\text{def}}{=\joinrel=}\lbracef(x)\mid x\in S\rbrace\ \text{是凸集};
    \end{equation}$$

2.  凸集在 $$f$$ 下的**原像**是凸集： $$\begin{equation}
        C\subseteq\mathbb{R}^m\ \text{是凸集}\ \Longrightarrow\ f^{-1}(C)\overset{\text{def}}{=\joinrel=}\lbracex\mid f(x)\in C\rbrace\ \text{是凸集}.
    \end{equation}$$

</div>

**Proof** **（）** *（1）像的保凸性*．设 $$S\subseteq\mathbb{R}^n$$ 是凸集．任取 $$y_1,y_2\in f(S)$$，则存在 $$x_1,x_2\in S$$ 使 $$y_1=f(x_1)$$，$$y_2=f(x_2)$$．对任意 $$\theta\in[0,1]$$，利用 $$f$$ 的仿射性， $$\begin{equation}
  \theta y_1+(1-\theta)y_2
  =\theta(Ax_1+b)+(1-\theta)(Ax_2+b)
  =A\big(\theta x_1+(1-\theta)x_2\big)+b
  =f\big(\theta x_1+(1-\theta)x_2\big).
\end{equation}$$ 由于 $$S$$ 是凸集，$$\theta x_1+(1-\theta)x_2\in S$$，故 $$\theta y_1+(1-\theta)y_2\in f(S)$$， 即 $$f(S)$$ 是凸集．

*（2）原像的保凸性*．设 $$C\subseteq\mathbb{R}^m$$ 是凸集．任取 $$x_1,x_2\in f^{-1}(C)$$，即 $$f(x_1),f(x_2)\in C$$．对任意 $$\theta\in[0,1]$$， $$\begin{equation}
  f\big(\theta x_1+(1-\theta)x_2\big)=\theta f(x_1)+(1-\theta)f(x_2)\in C,
\end{equation}$$ 其中\"$$\in C$$\"用到 $$C$$ 的凸性．按定义，$$\theta x_1+(1-\theta)x_2\in f^{-1}(C)$$，即 $$f^{-1}(C)$$ 是凸集．

哪些变换是仿射变换**（哪些变换是仿射变换）** 注意到下列常见的变换都是仿射变换，因此凸集经过它们的像（以及原像）仍是凸集：

- **缩放**：$$f(x)=\alpha x$$（取 $$A=\alpha I$$，$$b=0$$），即定理 2.2 中的 $$kS$$；

- **平移**：$$f(x)=x+b$$（取 $$A=I$$），即 $$S+b$$；

- **投影**：设 $$V\subseteq\mathbb{R}^n$$ 是子空间，$$P$$ 是到 $$V$$ 上的（正交）投影矩阵， $$f(x)=Px$$ 是线性的；更一般地，任何把 $$\mathbb{R}^n$$ 线性地映到较低维空间的映射都称为投影， 例如 $$f(x)=(x_1,\dots,x_k)$$（保留前 $$k$$ 个坐标）．因此凸集在任意方向的投影仍是凸集；

- **和集**：由 (1) 与 (2) 还可以得到，两个凸集的和 $$S+T=f(S\times T)$$（其中 $$f(x,y)=x+y$$ 是仿射映射）是凸集，这正是定理 2.2 的第 2 条．

<div class="example">

设 $$A_i\in\mathcal S^p\ (i=1,\dots,m)$$，$$B\in\mathcal S^p$$，则**线性矩阵不等式** （LMI） $$\begin{equation}
  \lbracex\in\mathbb{R}^m\mid x_1A_1+x_2A_2+\cdots+x_mA_m\preceq B\rbrace
\end{equation}$$ 是凸集．

</div>

**Proof** **（）** 定义映射 $$\begin{equation}
  f(x)=B-\sum_{i=1}^m x_iA_i,\qquad f:\mathbb{R}^m\to\mathcal S^p,
\end{equation}$$ 它是仿射映射：$$f(x)=B-A(x)$$，其中 $$A(x)=\sum_ix_iA_i$$ 关于 $$x$$ 线性．注意 $$\begin{equation}
  x_1A_1+\cdots+x_mA_m\preceq B\iff B-\sum_{i=1}^mx_iA_i\succeq0\iff f(x)\in\mathcal{S}^{n}_{+},
\end{equation}$$ 故 (2.101) 中的解集恰为 $$f^{-1}(\mathcal{S}^{n}_{+})$$．由于 $$\mathcal{S}^{n}_{+}$$ 是凸集（§2.3.5），由仿射变换 原像的保凸性（定理 2.8(2)）即知该集合是凸集．

<div class="example">

设 $$P\in\mathcal{S}^{n}_{+}$$，$$c\in\mathbb{R}^n$$，则**双曲锥** $$\begin{equation}
  \mathcal H=\Big\lbracex\in\mathbb{R}^n\ \Big\vert\ x^\top Px\le\big(c^\top x\big)^2,\ c^\top x\ge0\Big\rbrace
\end{equation}$$ 是凸集．

</div>

**Proof** **（）** 取矩阵 $$A$$ 使 $$A^\top A=P$$（例如 $$A=P^{1/2}$$，见前置知识第 12 条），则 $$\begin{equation}
  x^\top Px=x^\top A^\top Ax=\left\Vert Ax\right\Vert_2^2 .
\end{equation}$$ 双曲锥可以转化为二阶锥（二次锥） $$\begin{equation}
  \big\lbracex\mid\left\Vert Ax\right\Vert_2\le c^\top x,\ c^\top x\ge0\big\rbrace,
\end{equation}$$ 事实上，由于 $$\left\Vert Ax\right\Vert_2\ge0$$，条件 $$\left\Vert Ax\right\Vert_2\le c^\top x$$ 本身就蕴含 $$c^\top x\ge0$$； 而 $$\left\Vert Ax\right\Vert_2\le c^\top x$$ 两边平方即得 $$x^\top Px\le(c^\top x)^2$$，反之在 $$c^\top x\ge0$$ 时由 $$x^\top Px\le(c^\top x)^2$$ 开方也得 $$\left\Vert Ax\right\Vert_2\le c^\top x$$．因此 $$\begin{equation}
  \mathcal H=\big\lbracex\mid (Ax,\,c^\top x)\in\mathcal K_2\big\rbrace,\qquad
  \mathcal K_2=\big\lbrace(y,t)\in\mathbb{R}^{n+1}:\left\Vert y\right\Vert_2\le t\big\rbrace.
\end{equation}$$ 令 $$g(x)=(Ax,c^\top x)$$，它是仿射映射（$$g(x)=\begin{pmatrix}A\\ c^\top\end{pmatrix}x$$）． 于是 $$\mathcal H=g^{-1}(\mathcal K_2)$$．而二次锥 $$\mathcal K_2$$ 可由自身经仿射变换得到， 它本身是凸集（§2.3.4），故由仿射变换原像的保凸性知 $$\mathcal H$$ 是凸集．形象地说， **双曲锥是二次锥在一个仿射变换下的原像**，而二次锥的凸性是我们已经证明过的．

<div class="supp">

由定理 2.8(1) 可以直接得到：多面体的投影仍是多面体（因而是凸集）． 例如设 $$\begin{equation}
  \mathcal P=\Big\lbrace(x,y)\in\mathbb{R}^n\times\mathbb{R}^m\ \Big\vert\ Ax+By\le b,\ Cx+Dy=d\Big\rbrace
\end{equation}$$ 是 $$\mathbb{R}^{n+m}$$ 中的多面体，则它在 $$(x,y)\mapsto x$$ 下的像 $$\begin{equation}
  \Pi_x(\mathcal P)=\Big\lbracex\ \Big\vert\ \exists y:\ Ax+By\le b,\ Cx+Dy=d\Big\rbrace
\end{equation}$$ 仍是凸集（事实上仍是多面体，这一结论称为 Fourier--Motzkin 消元，是线性规划与 投影型算法的理论基础）．这个例子说明：\"存在某个 $$y$$ 使得线性约束成立\"这样的集合 （即线性约束系统的投影）依然是凸集，这正是线性规划能高效求解的根本原因之一．

</div>

### 透视变换与分式线性变换的保凸性

仿射变换之外，还有两类重要的保凸变换：透视变换与分式线性变换．

<div class="definition">

定义**透视变换** $$P:\mathbb{R}^{n+1}\to\mathbb{R}^n$$ 为 $$\begin{equation}
  P(x,t)=x/t,\qquad \operatorname{dom}P=\lbrace(x,t)\mid t>0\rbrace.
\end{equation}$$ 透视变换下凸集的像和原像都是凸集．

</div>

<div class="theorem">

设 $$P(x,t)=x/t$$，$$\operatorname{dom}P=\lbrace(x,t):t>0\rbrace$$．

1.  若 $$C\subseteq\mathbb{R}^n$$ 是凸集，则 $$P^{-1}(C)=\lbrace(x,t):x/t\in C,\ t>0\rbrace$$ 是凸集；

2.  若 $$S\subseteq\mathbb{R}^{n+1}$$ 是凸集，则 $$P(S\cap\operatorname{dom}P)$$ 是凸集．

</div>

**Proof** **（）** *（1）原像的保凸性*．任取 $$(x_1,t_1),(x_2,t_2)\in P^{-1}(C)$$（故 $$t_1,t_2>0$$， $$x_1/t_1,x_2/t_2\in C$$）与 $$\theta\in[0,1]$$．令 $$\begin{equation}
  x=\theta x_1+(1-\theta)x_2,\qquad t=\theta t_1+(1-\theta)t_2>0 .
\end{equation}$$ 由 $$\theta,(1-\theta)\ge0$$ 与 $$t_1,t_2>0$$ 知 $$t>0$$，且 $$\begin{equation}
  \frac{x}{t}=\frac{\theta t_1}{t}\cdot\frac{x_1}{t_1}+\frac{(1-\theta)t_2}{t}\cdot\frac{x_2}{t_2},
  \qquad
  \frac{\theta t_1}{t}+\frac{(1-\theta)t_2}{t}=1,\quad \frac{\theta t_1}{t},\frac{(1-\theta)t_2}{t}\ge0 .
\end{equation}$$ 即 $$x/t$$ 是 $$C$$ 中两点 $$x_1/t_1$$ 与 $$x_2/t_2$$ 的凸组合，由 $$C$$ 的凸性 $$x/t\in C$$，故 $$(x,t)\in P^{-1}(C)$$．于是 $$P^{-1}(C)$$ 是凸集．

*（2）像的保凸性*．任取 $$(x_1,t_1),(x_2,t_2)\in S\cap\operatorname{dom}P$$（故 $$t_1,t_2>0$$）与 $$\lambda\in[0,1]$$．若 $$\lambda=0$$ 或 $$1$$，则 $$\lambda\frac{x_1}{t_1}+(1-\lambda)\frac{x_2}{t_2}$$ 本身就是 $$x_2/t_2$$ 或 $$x_1/t_1$$，显然属于 $$P(S\cap\operatorname{dom}P)$$．以下设 $$\lambda\in(0,1)$$，令 $$\begin{equation}
  \mu=\frac{\lambda t_2}{(1-\lambda)t_1+\lambda t_2}\in[0,1],
\end{equation}$$ （分母 $$>0$$；且 $$\mu\le1$$ 等价于 $$\lambda t_2\le(1-\lambda)t_1+\lambda t_2$$，即 $$(1-\lambda)t_1\ge0$$，成立）．于是 $$\begin{equation}
  (x,t)=\mu(x_1,t_1)+(1-\mu)(x_2,t_2)\in S,\qquad t=\mu t_1+(1-\mu)t_2>0,
\end{equation}$$ 并且按 $$\mu$$ 的取法有 $$\begin{equation}
  \frac{\mu t_1}{\mu t_1+(1-\mu)t_2}=\lambda,
\end{equation}$$ （这可以由 $$\mu t_1(1-\lambda)=\lambda t_2(1-\mu)$$ 直接验证）从而 $$\begin{equation}
  \frac{x}{t}=\frac{\mu t_1}{t}\cdot\frac{x_1}{t_1}+\frac{(1-\mu)t_2}{t}\cdot\frac{x_2}{t_2}
  =\lambda\frac{x_1}{t_1}+(1-\lambda)\frac{x_2}{t_2}.
\end{equation}$$ 这说明 $$\lambda\frac{x_1}{t_1}+(1-\lambda)\frac{x_2}{t_2}=P(x,t)\in P(S\cap\operatorname{dom}P)$$，即 $$P(S\cap\operatorname{dom}P)$$ 是凸集．

<div class="definition">

定义**分式线性变换** $$f:\mathbb{R}^n\to\mathbb{R}^m$$ 为 $$\begin{equation}
  f(x)=\frac{Ax+b}{c^\top x+d},\qquad \operatorname{dom}f=\lbracex\mid c^\top x+d>0\rbrace,
\end{equation}$$ 其中 $$A\in\mathbb{R}^{m\times n}$$，$$b\in\mathbb{R}^m$$，$$c\in\mathbb{R}^n$$，$$d\in\mathbb{R}$$．分式线性变换下凸集的像和原像都是 凸集．

</div>

<div class="theorem">

分式线性变换 $$f(x)=\dfrac{Ax+b}{c^\top x+d}$$ 是**透视变换与仿射变换的复合**，因此它保持 凸性：若 $$S\subseteq\operatorname{dom}f$$ 是凸集，则 $$f(S)$$ 是凸集；若 $$C\subseteq\mathbb{R}^m$$ 是凸集，则 $$f^{-1}(C)=\lbracex\in\operatorname{dom}f:f(x)\in C\rbrace$$ 是凸集．

</div>

**Proof** **（）** *（复合的推导）*定义映射 $$\begin{equation}
  g(x)=\begin{pmatrix}Ax+b\\ c^\top x+d\end{pmatrix}
  =\begin{pmatrix}A\\ c^\top\end{pmatrix}x+\begin{pmatrix}b\\ d\end{pmatrix}:\quad \mathbb{R}^n\to\mathbb{R}^{m+1},
\end{equation}$$ 它是仿射映射（线性部分为 $$\begin{pmatrix}A\\ c^\top\end{pmatrix}\in\mathbb{R}^{(m+1)\times n}$$， 常数部分为 $$\begin{pmatrix}b\\d\end{pmatrix}$$）．再把 $$g(x)$$ 记成 $$(y,s)$$，其中 $$y=Ax+b\in\mathbb{R}^m$$，$$s=c^\top x+d\in\mathbb{R}$$．由 $$\operatorname{dom}f$$ 的定义知 $$s>0$$，即 $$g(\operatorname{dom}f)\subseteq\operatorname{dom}P=\lbrace(y,s):s>0\rbrace$$，其中 $$P$$ 是透视变换 $$P(y,s)=y/s$$．于是对 $$x\in\operatorname{dom}f$$， $$\begin{equation}
  (P\circ g)(x)=P(g(x))=P(Ax+b,\ c^\top x+d)=\frac{Ax+b}{c^\top x+d}=f(x),
\end{equation}$$ 即 $$\begin{equation}
  \boxed{\ f=P\circ g\ }
\end{equation}$$ 也就是说，分式线性变换 = 仿射变换 $$g$$ 与透视变换 $$P$$ 的复合（先做仿射变换，再做透视变换）． 反过来，当 $$c=0,\ d=1$$ 时分式线性变换退化为仿射变换 $$f(x)=Ax+b$$；当 $$A=I,\ b=0,\ c=0,\ d=1$$ 时它进一步退化为恒等映射；而透视变换正是\"分母为自变量最后一个 分量 $$t$$\"的分式线性变换．因此分式线性变换是仿射变换与透视变换这两类变换的共同推广．

*（像的保凸性）*设 $$S\subseteq\operatorname{dom}f$$ 是凸集．由 $$g$$ 是仿射映射及定理 2.8(1)，$$g(S)$$ 是凸集，且 $$g(S)\subseteq g(\operatorname{dom}f)\subseteq\operatorname{dom}P$$．于是由透视变换像的保凸性， $$\begin{equation}
  f(S)=P\big(g(S)\big)=P\big(g(S)\cap\operatorname{dom}P\big)
\end{equation}$$ 是凸集．

*（原像的保凸性）*设 $$C\subseteq\mathbb{R}^m$$ 是凸集．由透视变换原像的保凸性， $$P^{-1}(C)=\lbrace(y,s):y/s\in C,\ s>0\rbrace$$ 是凸集；再由仿射变换原像的保凸性， $$\begin{equation}
  f^{-1}(C)=\lbracex\in\operatorname{dom}f:f(x)\in C\rbrace=\lbracex:g(x)\in P^{-1}(C)\rbrace=g^{-1}\big(P^{-1}(C)\big)
\end{equation}$$ 是凸集．

<div class="example">

设 $$A\in\mathbb{R}^{m\times n}$$，$$b\in\mathbb{R}^m$$，$$c\in\mathbb{R}^n$$，$$d\in\mathbb{R}$$，则集合 $$\begin{equation}
  \Big\lbracex\ \Big\vert\ \left\Vert Ax+b\right\Vert_2\le c^\top x+d,\quad c^\top x+d>0\Big\rbrace
\end{equation}$$ 是凸集．事实上，令 $$g(x)=(Ax+b,\ c^\top x+d)$$，该集合等于 $$g^{-1}\big(\lbrace(y,s):\left\Vert y\right\Vert_2\le s\rbrace\big)=g^{-1}(\mathcal K_2)$$，即二次锥在仿射映射下的原像， 故为凸集；也可以把它看作凸集（单位球）在分式线性变换 $$f(x)=\frac{Ax+b}{c^\top x+d}$$ 下的原像．这类集合在滤波器设计、鲁棒控制与\"线性分式表示\" 中经常出现．

</div>

## 广义不等式与对偶锥

本节的内容在讲义第二章中没有对应章节，完全依据 PPT 第 31--37 页展开．这里要解决的问题是： 实数上的\"$$\le$$\"依赖数的自然大小，而向量与矩阵没有天然的大小关系，如何为它们建立一种既能 反映几何结构、又能参与优化建模的\"序\"？答案是：用一个**适当锥**来定义**广义不等式**， 再用它的**对偶锥**给出这种序的\"标量化\"刻画．

### 适当锥与广义不等式

<div class="definition">

一个凸锥 $$K\subseteq\mathbb{R}^n$$ 是**适当锥**（proper cone），当它还满足：

1.  $$K$$ 是**闭集**；

2.  $$K$$ 是**实心的**，即 $$\operatorname{int}K\ne\varnothing$$；

3.  $$K$$ 是**尖的**，即内部不含有直线：若 $$x\in K$$，$$-x\in K$$，则一定有 $$x=0$$， 亦即 $$K\cap(-K)=\lbrace0\rbrace$$．

</div>

实心性排除了\"锥蜷缩在低维子空间里\"的退化情形；尖锐性排除了\"锥包含整条直线\"的情形．二者 合起来保证 $$K$$ 诱导的序既不太弱（有足够多的可比对）也不太强（不会出现 $$x\preceq y$$ 与 $$y\preceq x$$ 同时成立而 $$x\ne y$$）．下面给出三个重要例子，并逐一验证上述三个条件．

<div class="example">

$$K=\mathbb{R}^n_+=\lbracex\in\mathbb{R}^n\mid x_i\ge0,\ i=1,\dots,n\rbrace$$ 是适当锥．

</div>

**Proof** **（）** *（凸锥）*若 $$x,y\in\mathbb{R}^n_+$$，$$\alpha,\beta\ge0$$，则 $$\alpha x+\beta y\in\mathbb{R}^n_+$$（逐分量 比较即得），故 $$\mathbb{R}^n_+$$ 是凸锥．

*（闭）*$$\mathbb{R}^n_+$$ 的补集 $$\mathbb{R}^n\setminus\mathbb{R}^n_+=\bigcup_{i=1}^n\lbracex:x_i<0\rbrace$$ 是 $$n$$ 个开半空间的并，从而是开集，因此 $$\mathbb{R}^n_+$$ 是闭集．（也可以直接验证：若 $$x^k\in\mathbb{R}^n_+$$ 且 $$x^k\to x$$，则对每个 $$i$$ 有 $$x^k_i\to x_i\ge0$$，故 $$x\in\mathbb{R}^n_+$$．）

*（实心）*$$\operatorname{int}\mathbb{R}^n_+=\lbracex:x_i>0,\ i=1,\dots,n\rbrace\ne\varnothing$$，例如 $$\mathbf{1}\in\operatorname{int}\mathbb{R}^n_+$$．

*（尖）*若 $$x\ge0$$ 且 $$-x\ge0$$，则每个分量同时满足 $$x_i\ge0$$ 与 $$x_i\le0$$，故 $$x_i=0$$， 即 $$x=0$$．

<div class="example">

$$K=\mathcal{S}^{n}_{+}$$ 是适当锥．

</div>

**Proof** **（）** *（凸锥）*已在 §2.3.5 证明．

*（闭）*对称矩阵的最小特征值 $$\lambda_{\min}(X)$$ 是 $$X$$ 的元素的连续函数（特征值是特征 多项式系数的连续函数，而特征多项式的系数是元素的连续函数），而 $$\begin{equation}
  \mathcal{S}^{n}_{+}=\lbraceX\in\mathcal{S}^{n}\mid\lambda_{\min}(X)\ge0\rbrace
\end{equation}$$ 是闭集 $$[0,\infty)$$ 在连续映射 $$X\mapsto\lambda_{\min}(X)$$ 下的原像，故 $$\mathcal{S}^{n}_{+}$$ 是闭集．

*（实心）*$$I\in\operatorname{int}\mathcal{S}^{n}_{+}$$．事实上，若 $$\left\Vert X-I\right\Vert_F<1$$，则对任意单位向量 $$z$$， $$\begin{equation}
  z^\top Xz=z^\top Iz+z^\top(X-I)z\ge1-\left\Vert X-I\right\Vert_2\ge1-\left\Vert X-I\right\Vert_F>0,
\end{equation}$$ （中间一步用了 $$\left\vert z^\top(X-I)z\right\vert\le\left\Vert X-I\right\Vert_2\left\Vert z\right\Vert_2^2=\left\Vert X-I\right\Vert_2\le\left\Vert X-I\right\Vert_F$$）． 故 $$X\succ0$$，即 $$B(I,1)\subseteq\mathcal{S}^{n}_{+}$$，从而 $$\operatorname{int}\mathcal{S}^{n}_{+}\ne\varnothing$$．

*（尖）*若 $$X\succeq0$$ 且 $$-X\succeq0$$，则对任意 $$z\in\mathbb{R}^n$$， $$z^\top Xz\ge0$$ 且 $$z^\top Xz\le0$$，故 $$z^\top Xz=0$$ 对一切 $$z$$ 成立．取 $$z=e_i$$ 得 $$x_{ii}=0$$；取 $$z=e_i+e_j$$ 得 $$2x_{ij}=0$$，故 $$X=0$$．

<div class="example">

$$\begin{equation}
  K=\Big\lbracex\in\mathbb{R}^n\ \Big\vert\ x_1+x_2t+\cdots+x_nt^{n-1}\ge0,\ \forall t\in[0,1]\Big\rbrace
\end{equation}$$ 是适当锥．也就是说，\"系数向量 $$x$$ 对应的多项式在 $$[0,1]$$ 上非负\"这一集合是适当锥．

</div>

**Proof** **（）** 记 $$p_x(t)=x_1+x_2t+\cdots+x_nt^{n-1}$$．

*（凸锥）*若 $$p_x,p_y\ge0$$ 于 $$[0,1]$$，$$\alpha,\beta\ge0$$，则 $$p_{\alpha x+\beta y}=\alpha p_x+\beta p_y\ge0$$ 于 $$[0,1]$$，故 $$\alpha x+\beta y\in K$$．

*（闭）*令 $$\phi(x)=\min_{t\in[0,1]}p_x(t)$$．由于 $$(x,t)\mapsto p_x(t)$$ 关于 $$(x,t)$$ 连续、 $$[0,1]$$ 紧，$$\phi$$ 是有定义的．下面说明 $$\phi$$ 连续：若 $$x^k\to x$$，则对一切 $$t\in[0,1]$$， $$\begin{equation}
  \left\vert p_{x^k}(t)-p_x(t)\right\vert=\left\vert\sum_{i=1}^n\big(x^k_i-x_i\big)t^{i-1}\right\vert
  \le\left\Vert x^k-x\right\Vert_\infty\sum_{i=1}^n1=n\left\Vert x^k-x\right\Vert_\infty\ \longrightarrow\ 0,
\end{equation}$$ 这一估计与 $$t$$ 无关（一致收敛），因此 $$\phi(x^k)\to\phi(x)$$．于是 $$\begin{equation}
  K=\phi^{-1}\big([0,+\infty)\big)
\end{equation}$$ 是闭集的原像，故 $$K$$ 闭．

*（实心）*取 $$x=\mathbf e_1=(1,0,\dots,0)^\top$$，即 $$p_x\equiv1$$．设 $$\left\Vert x-\mathbf e_1\right\Vert_\infty<\delta:=\frac{1}{2n}$$，则对一切 $$t\in[0,1]$$， $$\begin{equation}
  \left\vert p_x(t)-1\right\vert=\left\vert\sum_{i=2}^n x_it^{i-1}\right\vert\le\sum_{i=2}^n\delta\cdot1\le n\delta=\frac12,
\end{equation}$$ 故 $$p_x(t)\ge\frac12>0$$，即 $$B_\infty(\mathbf e_1,\delta)\subseteq K$$．因此 $$\operatorname{int}K\ne\varnothing$$．

*（尖）*若 $$p_x\ge0$$ 且 $$-p_x\ge0$$ 于 $$[0,1]$$，则 $$p_x(t)=0$$ 对一切 $$t\in[0,1]$$ 成立，即 区间 $$[0,1]$$ 中的每个点都是多项式 $$p_x$$ 的零点．由于 $$[0,1]$$ 含有无穷多个点，而次数不超过 $$n-1$$ 的非零多项式至多有 $$n-1$$ 个零点，故只能是零多项式，即所有系数为 $$0$$，$$x=0$$．

<div class="definition">

对于适当锥 $$K$$，定义偏序**广义不等式**为 $$\begin{equation}
  x\preceq_K y\ \Longleftrightarrow\ y-x\in K,
\end{equation}$$ 并定义**严格偏序**广义不等式为 $$\begin{equation}
  x\prec_K y\ \Longleftrightarrow\ y-x\in\operatorname{int}K .
\end{equation}$$

</div>

广义不等式是一种**偏序**（不必要保证所有对象都具有可比较性）关系，可以使用适当锥诱导． 也就是说，对一般的 $$x,y$$，可能既没有 $$x\preceq_K y$$ 也没有 $$y\preceq_K x$$．与实数情形一样， 我们记 $$x\succeq_K y$$ 表示 $$y\preceq_K x$$；$$x\succ_K y$$ 表示 $$y\prec_K x$$．

<div class="example">

$$\begin{equation}
  x\preceq_{\mathbb{R}^n_+}y\ \Longleftrightarrow\ y_i\ge x_i,\quad i=1,\dots,n,
\end{equation}$$ 即逐分量的\"小于等于\"．相应地 $$x\prec_{\mathbb{R}^n_+}y\iff y_i>x_i$$ 对一切 $$i$$ 成立． 例如 $$x=(1,0)^\top$$ 与 $$y=(0,1)^\top$$ 不可比较：既没有 $$x\preceq y$$（第一个分量 $$1\not\le0$$），也没有 $$y\preceq x$$（第二个分量 $$1\not\le0$$）．

</div>

<div class="example">

$$\begin{equation}
  X\preceq_{\mathcal{S}^{n}_{+}}Y\ \Longleftrightarrow\ Y-X\ \text{半正定},
\end{equation}$$ 相应地 $$X\prec_{\mathcal{S}^{n}_{+}}Y\iff Y-X$$ 正定．注意 $$\mathcal{S}^{n}_{+}$$ 是 $$\mathcal{S}^{n}$$ 的子集，因此矩阵不等式只在对称矩阵 之间讨论．同样地，矩阵之间也未必可比，例如 $$\begin{equation}
  X=\begin{pmatrix}1&0\\0&0\end{pmatrix},\qquad Y=\begin{pmatrix}0&0\\0&1\end{pmatrix}
\end{equation}$$ 不可比较（$$Y-X=\begin{pmatrix}-1&0\\0&1\end{pmatrix}$$ 与 $$X-Y$$ 都不是半正定的）．

</div>

<div class="theorem">

**定理 2.11** 记 $$\preceq_K$$ 是定义于适当锥 $$K$$ 上的广义不等式，则

1.  **自反性**：$$x\preceq_K x$$；

2.  **反对称性**：若 $$x\preceq_K y$$ 且 $$y\preceq_K x$$，则 $$x=y$$；

3.  **传递性**：若 $$x\preceq_K y$$ 且 $$y\preceq_K z$$，则 $$x\preceq_K z$$；

4.  **可加性**：若 $$x\preceq_K y$$ 且 $$u\preceq_K v$$，则 $$x+u\preceq_K y+v$$；

5.  **非负缩放**：若 $$x\preceq_K y$$ 且 $$\alpha\ge0$$，则 $$\alpha x\preceq_K \alpha y$$．

利用偏序关系和广义不等式的定义可以轻松证明上述性质．

</div>

**Proof** **（）** 下面的证明只用到三条基本事实：$$0\in K$$（$$K$$ 是锥）；$$K$$ 对加法封闭（$$K$$ 是凸锥）； $$K$$ 对非负数乘封闭（锥性）；以及 $$K\cap(-K)=\lbrace0\rbrace$$（$$K$$ 是尖的）．

1.  *自反性*：$$x-x=0\in K$$，故 $$x\preceq_K x$$．这也说明广义不等式与实数上的 $$\le$$ 一样是\"$$\le$$\"式的（而不像\"$$<$$\"那样排除自身）．

2.  *反对称性*：$$x\preceq_K y$$ 即 $$y-x\in K$$；$$y\preceq_K x$$ 即 $$x-y=-(y-x)\in K$$．于是 $$y-x\in K\cap(-K)=\lbrace0\rbrace$$，即 $$y-x=0$$，$$x=y$$．这里**尖锐性 是不可缺少的**：若 $$K$$ 含有直线，则会出现 $$x\ne y$$ 但 $$x\preceq_K y$$ 与 $$y\preceq_K x$$ 同时成立的情形．

3.  *传递性*：由 $$y-x\in K$$ 与 $$z-y\in K$$ 及 $$K$$ 对加法封闭得 $$z-x=(z-y)+(y-x)\in K$$，即 $$x\preceq_K z$$．

4.  *可加性*：$$(y+v)-(x+u)=(y-x)+(v-u)\in K$$（再用一次加法封闭性）．

5.  *非负缩放*：$$\alpha(y-x)\in K$$ 对 $$\alpha\ge0$$ 成立（$$\alpha>0$$ 用锥性， $$\alpha=0$$ 时 $$0\in K$$），即 $$\alpha x\preceq_K\alpha y$$．

### 对偶锥

设 $$K$$ 是一个锥．对偶锥是相对于锥 $$K$$ 定义的，因此我们知道锥的同时也可以求出对偶锥．

<div class="definition">

令锥 $$K$$ 为全空间 $$\Omega$$ 的子集，则 $$K$$ 的**对偶锥**为 $$\begin{equation}
  K^*=\lbracey\in\Omega\mid\left\langle x,\,y\right\rangle\ge0,\ \forall x\in K\rbrace.
\end{equation}$$

</div>

这里 $$\Omega$$ 是 $$K$$ 所在的环境空间（通常取 $$\Omega=\mathbb{R}^n$$；当讨论矩阵锥时取 $$\Omega=\mathcal{S}^{n}$$ 或 $$\mathbb{R}^{n\times n}$$），$$\left\langle \cdot,\,\cdot\right\rangle$$ 是 $$\Omega$$ 上的内积（在 $$\mathbb{R}^n$$ 上为 $$x^\top y$$，在 $$\mathcal{S}^{n}$$ 上为 $$\operatorname{tr}(XY)$$）．几何上，$$K^*$$ 由所有与 $$K$$ 中每个向量夹角不超过 $$90^\circ$$ 的向量组成．我们将对偶锥为自身的锥称为**自对偶锥**，即满足 $$K^*=K$$ 的锥．

<div class="example">

$$\begin{equation}
  (\mathbb{R}^n_+)^*=\lbracey\in\mathbb{R}^n\mid x^\top y\ge0,\ \forall x\ge0\rbrace=\mathbb{R}^n_+ .
\end{equation}$$

</div>

**Proof** **（）** *（$$\supseteq$$）*若 $$y\ge0$$、$$x\ge0$$，则 $$x^\top y=\sum_ix_iy_i\ge0$$，故 $$y\in(\mathbb{R}^n_+)^*$$．

*（$$\subseteq$$）*设 $$y\in(\mathbb{R}^n_+)^*$$．取 $$x=e_i\in\mathbb{R}^n_+$$（第 $$i$$ 个标准基向量），得 $$y_i=e_i^\top y\ge0$$，对每个 $$i$$ 成立，故 $$y\ge0$$．

因此 $$K=\mathbb{R}^n_+$$ 是自对偶锥．

<div class="example">

$$\begin{equation}
  (\mathcal{S}^{n}_{+})^*=\Big\lbraceY\in\mathcal{S}^{n}\ \Big\vert\ \left\langle X,\,Y\right\rangle=\operatorname{tr}(XY)\ge0,\ \forall X\succeq0\Big\rbrace=\mathcal{S}^{n}_{+}.
\end{equation}$$

</div>

**Proof** **（）** *（$$\supseteq$$）*设 $$Y\succeq0$$．对任意 $$X\succeq0$$，由谱分解（前置知识第 3 条）存在 标准正交特征向量组 $$q_1,\dots,q_n$$ 与非负特征值 $$\lambda_1,\dots,\lambda_n\ge0$$ 使 $$\begin{equation}
  X=Q\Lambda Q^\top=\sum_{i=1}^n\lambda_iq_iq_i^\top .
\end{equation}$$ 于是由 $$\operatorname{tr}$$ 的线性性与 $$\operatorname{tr}(q_iq_i^\top Y)=q_i^\top Yq_i$$， $$\begin{equation}
  \operatorname{tr}(XY)=\sum_{i=1}^n\lambda_i\,\operatorname{tr}\big(q_iq_i^\top Y\big)=\sum_{i=1}^n\lambda_i\,q_i^\top Yq_i\ge0,
\end{equation}$$ 其中最后一个不等号用到 $$\lambda_i\ge0$$（$$X\succeq0$$）与 $$q_i^\top Yq_i\ge0$$（$$Y\succeq0$$）． 故 $$Y\in(\mathcal{S}^{n}_{+})^*$$．

*（$$\subseteq$$）*设 $$Y\in\mathcal{S}^{n}$$ 且 $$Y\not\succeq0$$．由于 $$Y$$ 对称，存在单位向量 $$v\ne0$$ 使 $$v^\top Yv<0$$（取对应负特征值的特征向量）．令 $$X=vv^\top$$，则对任意 $$z$$， $$z^\top Xz=(v^\top z)^2\ge0$$，即 $$X\succeq0$$；而 $$\begin{equation}
  \operatorname{tr}(XY)=\operatorname{tr}(vv^\top Y)=v^\top Yv<0,
\end{equation}$$ （其中用了 $$\operatorname{tr}(vv^\top Y)=\operatorname{tr}(v^\top Yv)=v^\top Yv$$，因为 $$v^\top Yv$$ 是标量），故 $$Y\notin(\mathcal{S}^{n}_{+})^*$$．因此 $$(\mathcal{S}^{n}_{+})^*\subseteq\mathcal{S}^{n}_{+}$$．

因此 $$K=\mathcal{S}^{n}_{+}$$ 是自对偶锥．

关于环境空间**（关于环境空间）** 若把 $$\mathcal{S}^{n}_{+}$$ 的环境空间取为整个 $$\mathbb{R}^{n\times n}$$，则由于 $$\operatorname{tr}(XY)=\operatorname{tr}\big(X\cdot\frac{Y+Y^\top}{2}\big)$$，$$Y$$ 只有对称部分起作用，此时 $$\begin{equation}
  (\mathcal{S}^{n}_{+})^*=\Big\lbraceY\in\mathbb{R}^{n\times n}\ \Big\vert\ \tfrac{Y+Y^\top}{2}\succeq0\Big\rbrace,
\end{equation}$$ 即在 $$\mathcal{S}^{n}$$ 中来看仍为 $$\mathcal{S}^{n}_{+}$$．以下的讨论默认在 $$\mathcal{S}^{n}$$ 中取对偶锥．

<div class="example">

设 $$1\le p\le\infty$$，$$q$$ 为共轭指数（$$\frac1p+\frac1q=1$$），锥 $$\begin{equation}
  K=\Big\lbrace(x,t)\ \Big\vert\ \left\Vert x\right\Vert_p\le t,\ t>0\Big\rbrace
\end{equation}$$ 的对偶锥是 $$\begin{equation}
  K^*=\Big\lbrace(y,s)\ \Big\vert\ \left\Vert y\right\Vert_q\le s,\ s>0\Big\rbrace,
\end{equation}$$ 其中 $$(p,q)$$ 共轭．等价地（把顶点补上），若 $$K_p=\lbrace(x,t):\left\Vert x\right\Vert_p\le t\rbrace$$，则 $$(K_p)^*=K_q$$．

</div>

**Proof** **（）** 由于 $$K$$ 的非零点集在 $$K_p=\lbrace(x,t):\left\Vert x\right\Vert_p\le t\rbrace$$ 中稠密，且零点 $$(0,0)$$ 对 $$\left\langle \cdot,\,\cdot\right\rangle$$ 不产生任何限制，故 $$K^*=(K_p)^*$$；下面直接证明 $$(K_p)^*=K_q$$．

*（$$\supseteq$$，即 $$K_q\subseteq(K_p)^*$$）*设 $$\left\Vert y\right\Vert_q\le s$$，任取 $$(x,t)\in K_p$$，即 $$\left\Vert x\right\Vert_p\le t$$（此时自动有 $$t\ge0$$）．由 Hölder 不等式 (2.13)， $$\begin{equation}
  x^\top y\ge-\left\vert x^\top y\right\vert\ge-\left\Vert x\right\Vert_p\left\Vert y\right\Vert_q\ge-t\,\left\Vert y\right\Vert_q,
\end{equation}$$ 于是 $$\begin{equation}
  \left\langle (x,t),\,(y,s)\right\rangle=x^\top y+ts\ge-t\left\Vert y\right\Vert_q+ts=t\big(s-\left\Vert y\right\Vert_q\big)\ge0,
\end{equation}$$ 故 $$(y,s)\in(K_p)^*$$．

*（$$\subseteq$$，即 $$(K_p)^*\subseteq K_q$$）*设 $$(y,s)\in(K_p)^*$$．我们证明 $$\left\Vert y\right\Vert_q\le s$$．反设 $$\left\Vert y\right\Vert_q>s$$，下面构造 $$(x,t)\in K_p$$ 使 $$\left\langle (x,t),\,(y,s)\right\rangle<0$$，导出矛盾．分三种情形．

- **$$1<p<\infty$$**．由 Hölder 不等式等号条件（见 (2.15)），存在 $$x^0$$ 使 $$\begin{equation}
      \left\Vert x^0\right\Vert_p=1,\qquad (x^0)^\top y=\left\Vert y\right\Vert_q ,
  \end{equation}$$ 例如取 $$x^0_i=\operatorname{sgn}(y_i)\left\vert y_i\right\vert^{q-1}\big/\left\Vert y\right\Vert_q^{\,q-1}$$．令 $$x=-x^0$$，$$t=1$$，则 $$\left\Vert x\right\Vert_p=1=t$$，即 $$(x,t)\in K_p$$，且 $$\begin{equation}
      \left\langle (x,t),\,(y,s)\right\rangle=x^\top y+s=-\left\Vert y\right\Vert_q+s<0,
  \end{equation}$$ 与 $$(y,s)\in(K_p)^*$$ 矛盾．

- **$$p=1$$（此时 $$q=\infty$$）**．取下标 $$j_0$$ 使 $$\left\vert y_{j_0}\right\vert=\left\Vert y\right\Vert_\infty$$，令 $$x=-\operatorname{sgn}(y_{j_0})e_{j_0}$$，$$t=1$$．则 $$\left\Vert x\right\Vert_1=1=t$$，即 $$(x,t)\in K_p$$，且 $$\begin{equation}
      \left\langle (x,t),\,(y,s)\right\rangle=-\left\vert y_{j_0}\right\vert+s=-\left\Vert y\right\Vert_\infty+s<0,
  \end{equation}$$ 矛盾．

- **$$p=\infty$$（此时 $$q=1$$）**．令 $$x_i=-\operatorname{sgn}(y_i)$$（若 $$y=0$$ 则结论 $$\left\Vert y\right\Vert_1=0\le s$$ 已成立，故可设 $$y\ne0$$），$$t=1$$．则 $$\left\Vert x\right\Vert_\infty=1=t$$，且 $$\begin{equation}
      \left\langle (x,t),\,(y,s)\right\rangle=-\sum_{i=1}^n\left\vert y_i\right\vert+s=-\left\Vert y\right\Vert_1+s<0,
  \end{equation}$$ 矛盾．

三种情形都导出了矛盾，故 $$\left\Vert y\right\Vert_q\le s$$ 必成立，即 $$(y,s)\in K_q$$．

<div class="example">

在上例中取 $$p=q=2$$，即得：二次锥 $$\begin{equation}
  \mathcal K_2=\Big\lbrace(x,t)\ \Big\vert\ \left\Vert x\right\Vert_2\le t\Big\rbrace
\end{equation}$$ 的对偶锥是它本身，因此二次锥是自对偶锥．

</div>

**Proof** 直接验证**（直接验证）** *（$$\supseteq$$）*设 $$\left\Vert y\right\Vert_2\le s$$，$$(x,t)\in\mathcal K_2$$（即 $$\left\Vert x\right\Vert_2\le t$$），则由 Cauchy 不等式 $$\begin{equation}
  \left\langle (x,t),\,(y,s)\right\rangle=x^\top y+ts\ge-\left\Vert x\right\Vert_2\left\Vert y\right\Vert_2+ts\ge-ts+ts=0 .
\end{equation}$$ *（$$\subseteq$$）*设 $$(y,s)\in\mathcal K_2^*$$ 而 $$\left\Vert y\right\Vert_2>s$$．取 $$x=-\dfrac{y}{\left\Vert y\right\Vert_2}$$（$$y\ne0$$，否则 $$\left\Vert y\right\Vert_2=0\le s$$ 与假设矛盾），$$t=1$$，则 $$\left\Vert x\right\Vert_2=1=t$$，即 $$(x,t)\in\mathcal K_2$$，且 $$\begin{equation}
  \left\langle (x,t),\,(y,s)\right\rangle=-\frac{y^\top y}{\left\Vert y\right\Vert_2}+s=-\left\Vert y\right\Vert_2+s<0,
\end{equation}$$ 与 $$(y,s)\in\mathcal K_2^*$$ 矛盾．故 $$\left\Vert y\right\Vert_2\le s$$．

**图 2.11**：$$\mathbb{R}^2$$ 中锥 $$K$$（由 $$0^\circ$$ 与 $$45^\circ$$ 两条射线张成，深色）与其对偶锥 $$K^*$$（由 $$-45^\circ$$ 与 $$90^\circ$$ 两条射线张成，浅色）．$$K^*$$ 由所有与 $$K$$ 中向量夹角 不超过 $$90^\circ$$ 的向量组成；本例中 $$K\subseteq K^*$$（深色区域完全落在浅色区域之内）．

对偶锥的几何读法**（对偶锥的几何读法）** 根据对偶锥的定义，$$K^*$$ 中的向量和 $$K$$ 中所有向量夹角均为锐角或直角（即内积非负）．因此， 对偶锥 $$K^*$$ 为图 2.11 中的浅色区域．注意，在这个例子中，$$K$$ 也为 $$K^*$$ 的 一部分．一般地，若 $$K\subseteq K^*$$，则称 $$K$$ 是\"自对偶型\"的；$$\mathbb{R}^n_+$$ 与 $$\mathcal{S}^{n}_{+}$$ 都是 $$K=K^*$$ 的自对偶锥．另外，从图上看，$$K^*$$ 的两条边界射线恰好是 $$K$$ 的两条边界射线各旋转 $$90^\circ$$ 得到的，这不是巧合：对偶锥的边界由\"与 $$K$$ 的某个支撑超平面垂直\"的方向组成 （与 §2.6 的支撑超平面定理对照阅读）．

### 对偶锥的性质

下面我们简单列举对偶锥满足的性质，这是很重要的．以下总设 $$K$$ 是锥，$$K^*$$ 是其对偶锥．

<div class="theorem">

**定理 2.12** 设 $$K$$ 是一锥，$$K^*$$ 是其对偶锥，则满足

1.  $$K^*$$ 是锥（哪怕 $$K$$ 不是锥也成立）；

2.  $$K^*$$ 始终是闭集，且是凸集；

3.  若 $$\operatorname{int}K\ne\varnothing$$，则 $$K^*$$ 是尖的，即内部不含有直线；

4.  若 $$K$$ 是尖的，则 $$\operatorname{int}K^*\ne\varnothing$$；

5.  若 $$K$$ 是适当锥，则 $$K^*$$ 是适当锥；

6.  （**二次对偶**）$$K^{**}$$ 是 $$K$$ 的凸包（更确切地说， $$K^{**}=\overline{\operatorname{conv}K}$$）．特别地，若 $$K$$ 是凸且闭的，则 $$K^{**}=K$$．

</div>

**Proof** **（）** *（1）$$K^*$$ 是凸锥（不需要 $$K$$ 是锥）*．设 $$y\in K^*$$，$$\lambda\ge0$$．对任意 $$x\in K$$， $$\begin{equation}
  \left\langle x,\,\lambda y\right\rangle=\lambda\left\langle x,\,y\right\rangle\ge0,
\end{equation}$$ 故 $$\lambda y\in K^*$$，即 $$K^*$$ 是锥．再设 $$y_1,y_2\in K^*$$，$$\theta\in[0,1]$$，则对任意 $$x\in K$$， $$\begin{equation}
  \left\langle x,\,\theta y_1+(1-\theta)y_2\right\rangle=\theta\left\langle x,\,y_1\right\rangle+(1-\theta)\left\langle x,\,y_2\right\rangle\ge0,
\end{equation}$$ 故 $$\theta y_1+(1-\theta)y_2\in K^*$$，即 $$K^*$$ 是凸集．合起来 $$K^*$$ 是凸锥．（注意：由 $$\left\langle x,\,y\right\rangle\ge0$$ 对一切 $$x\in K$$ 成立，与由它对一切 $$x\in\operatorname{conv}K$$ 成立是等价的，因此\"$$K$$ 是不是 锥、是不是凸\"完全不影响 $$K^*$$ 的性质．）

*（2）$$K^*$$ 是闭集*．对每个 $$x\in K$$，集合 $$\begin{equation}
  H_x=\lbracey\in\Omega\mid\left\langle x,\,y\right\rangle\ge0\rbrace
\end{equation}$$ 是闭半空间（连续函数 $$y\mapsto\left\langle x,\,y\right\rangle$$ 的非负水平集）．于是 $$\begin{equation}
  K^*=\bigcap_{x\in K}H_x
\end{equation}$$ 是任意多个闭集的交，从而是闭集．闭性在应用中极为重要：它保证对偶锥定义的约束是\"闭约束\"， 在极限运算下不会跑出集合．凸性由 (1) 得到．

*（3）$$\operatorname{int}K\ne\varnothing\Rightarrow K^*$$ 是尖的*．设 $$y\in K^*\cap(-K^*)$$，则对一切 $$x\in K$$ 有 $$\left\langle x,\,y\right\rangle\ge0$$ 且 $$\left\langle x,\,-y\right\rangle\ge0$$，即 $$\begin{equation}
  \left\langle x,\,y\right\rangle=0,\qquad \forall x\in K .
\end{equation}$$ 任取 $$x_0\in\operatorname{int}K$$．对任意 $$x\in\Omega$$，存在 $$\epsilon>0$$ 使 $$x_0\pm\epsilon x\in K$$（这是\"$$x_0$$ 是内点\"的直接推论：$$x_0+\epsilon x$$ 在 $$x_0$$ 附近）．由 (2.157)， $$\begin{equation}
  0=\left\langle x_0\pm\epsilon x,\,y\right\rangle=\left\langle x_0,\,y\right\rangle\pm\epsilon\left\langle x,\,y\right\rangle,
\end{equation}$$ 两式相加得 $$\left\langle x_0,\,y\right\rangle=0$$，相减得 $$\epsilon\left\langle x,\,y\right\rangle=0$$，故 $$\left\langle x,\,y\right\rangle=0$$ 对一切 $$x\in\Omega$$ 成立， 从而 $$y=0$$．因此 $$K^*\cap(-K^*)=\lbrace0\rbrace$$，即 $$K^*$$ 是尖的（内部不含直线）．

*（4）$$K$$ 尖 $$\Rightarrow\operatorname{int}K^*\ne\varnothing$$*．设 $$K$$ 是**闭**凸尖锥 （闭性这一条不可省，见随后的注记）．不妨设 $$K\ne\lbrace0\rbrace$$，此时 $$\begin{equation}
  C=K\cap\lbracex:\left\Vert x\right\Vert_2=1\rbrace
\end{equation}$$ 是紧凸集且 $$0\notin C$$．由于 $$K$$ 是尖的，$$-x\in K$$ 与 $$x\in K$$ 不能同时成立（$$x\ne0$$），故 $$C\cap(-C)=\varnothing$$．于是 $$C$$ 与 $$-C$$ 是 $$\mathbb{R}^n$$ 中两个不交的紧凸集，由严格分离定理 （§2.6 定理 2.15，两个集合都紧，当然满足\"一个闭、一个紧\"的条件）存在 $$a\ne0$$ 与 $$b$$ 使 $$\begin{equation}
  a^\top z<b<a^\top x,\qquad \forall z\in -C,\ \forall x\in C .
\end{equation}$$ 特别地，令 $$\delta=\min_{x\in C}a^\top x$$（紧集上连续函数取到最小值），则 $$\delta>0$$：这是因为 对每个 $$x\in C$$ 同时有 $$a^\top x>b$$（取 $$v=x\in C$$）与 $$a^\top x>-b$$（取 $$u=-x\in -C$$，由 $$a^\top(-x)<b$$ 得到），故 $$a^\top x>\left\vert b\right\vert\ge0$$．下面说明 $$a\in\operatorname{int}K^*$$：任取 $$y$$ 满足 $$\left\Vert y-a\right\Vert_2<\delta/2$$ 与任一 $$x\in K\setminus\lbrace0\rbrace$$，令 $$\hat x=x/\left\Vert x\right\Vert_2\in C$$，则 $$\begin{equation}
  y^\top x=\left\Vert x\right\Vert_2\,y^\top\hat x
  =\left\Vert x\right\Vert_2\Big(a^\top\hat x+(y-a)^\top\hat x\Big)
  \ge\left\Vert x\right\Vert_2\Big(\delta-\left\Vert y-a\right\Vert_2\Big)>0,
\end{equation}$$ （用了 $$\left\vert(y-a)^\top\hat x\right\vert\le\left\Vert y-a\right\Vert_2$$）；而 $$y^\top0=0$$．故 $$B(a,\delta/2)\subseteq K^*$$， 即 $$a\in\operatorname{int}K^*\ne\varnothing$$．

*（5）$$K$$ 适当锥 $$\Rightarrow K^*$$ 适当锥*．把 (1)--(4) 逐条对上：$$K^*$$ 是凸锥（(1)）；$$K^*$$ 闭（(2)）；$$K$$ 实心 $$\Rightarrow K^*$$ 尖（(3)）；$$K$$ 尖 $$\Rightarrow K^*$$ 实心（(4)）．因此 $$K^*$$ 满足适当锥的全部四个条件．这一结论是 §2.5.4 中\"用对偶锥诱导广义不等式\"的合法性 依据．

*（6）二次对偶（$$K$$ 为锥）*．分三步．

- *$$K\subseteq K^{**}$$*：设 $$x\in K$$．对任意 $$y\in K^*$$，由 $$K^*$$ 的定义 $$\left\langle x,\,y\right\rangle\ge0$$，这正是 $$x\in K^{**}$$ 的定义．故 $$K\subseteq K^{**}$$．

- *$$\overline{\operatorname{conv}K}\subseteq K^{**}$$*：由 (1)(2)，$$K^{**}$$ 是闭凸锥；又由上一段 $$K^{**}\supseteq K$$，而闭凸锥包含 $$K$$ 必包含 $$\operatorname{conv}K$$ 与 $$\overline{\operatorname{conv}K}$$（凸集包含 $$K$$ 就包含 $$K$$ 中点的凸组合，闭集包含 $$\operatorname{conv}K$$ 就包含其闭包），故 $$\overline{\operatorname{conv}K}\subseteq K^{**}$$．

- *$$K^{**}\subseteq\overline{\operatorname{conv}K}$$*：令 $$C=\overline{\operatorname{conv}K}$$，它是闭凸锥 （$$K$$ 是锥 $$\Rightarrow$$ $$\operatorname{conv}K$$ 是锥 $$\Rightarrow$$ $$C$$ 是闭凸锥）．设 $$x_0\notin C$$．由严格分离定理 （§2.6 定理 2.15 的退化形式，$$C$$ 闭、$$\lbracex_0\rbrace$$ 紧、$$x_0\notin C$$）存在 $$a\ne0$$ 与 $$b$$ 使 $$\begin{equation}
      a^\top z<b<a^\top x_0,\qquad \forall z\in C .
  \end{equation}$$ 由于 $$0\in C$$，得 $$b>0$$．又 $$C$$ 是锥：对任意 $$z\in C$$ 与 $$\lambda>0$$ 有 $$\lambda z\in C$$， 于是 $$\lambda a^\top z<b$$ 对一切 $$\lambda>0$$ 成立，令 $$\lambda\to\infty$$ 得 $$a^\top z\le0$$．令 $$y=-a\ne0$$，则 $$\begin{equation}
      \left\langle z,\,y\right\rangle=-a^\top z\ge0,\quad\forall z\in C\ \Big(\text{特别对一切 }z\in K\Big),
  \end{equation}$$ 故 $$y\in K^*$$；而 $$\left\langle x_0,\,y\right\rangle=-a^\top x_0<-b<0$$，说明 $$x_0\notin K^{**}$$．因此 $$K^{**}\subseteq C$$．

三步合起来即得 $$K^{**}=\overline{\operatorname{conv}K}$$．特别地，若 $$K$$ 是凸且闭的锥，则 $$\overline{\operatorname{conv}K}=K$$，于是 $$K^{**}=K$$．

性质 (4) 中\"闭性\"不可省**（性质 (4) 中\"闭性\"不可省）** PPT 把性质 (4) 陈述为\"若 $$K$$ 是尖的，则 $$\operatorname{int}K^*\ne\varnothing$$\"．严格说来，这一陈述 需要在 $$K$$ 为闭凸锥的前提下理解（上面的证明用到了严格分离定理，它要求 $$C$$ 与 $$\lbracex_0\rbrace$$ 中 有一个是闭集）．如果去掉闭性，结论可以不成立：取 $$\begin{equation}
  K=\lbrace(x_1,x_2)\in\mathbb{R}^2\mid x_2>0\rbrace\cup\lbrace(0,0)\rbrace,
\end{equation}$$ 则 $$K$$ 是凸锥、是尖的（它不含任何过原点的直线），但 $$\begin{equation}
  K^*=\lbracey\in\mathbb{R}^2\mid x^\top y\ge0,\ \forall x\in K\rbrace=\lbrace(0,s)\mid s\ge0\rbrace,
\end{equation}$$ 这是一条射线，在 $$\mathbb{R}^2$$ 中内部为空．事实上，对 $$K$$ 中形如 $$(t,1)$$ 的点（$$t\in\mathbb{R}$$ 任意）要求 $$ty_1+y_2\ge0$$ 对一切 $$t$$ 成立，必须 $$y_1=0$$；再要求 $$y_2\ge0$$．这说明\"尖性 + 闭性\"才足以 保证对偶锥实心．

二次对偶的一般形式**（二次对偶的一般形式）** 对一般的（不必是锥的）集合 $$S$$，同样有 $$S^{**}=\overline{\operatorname{conv}(S\cup\lbrace0\rbrace)}$$，这是凸分析中的 双极定理（bipolar theorem）．对锥而言 $$0$$ 总在 $$\overline K$$ 中（因 $$x\in K$$ 蕴含 $$\frac1kx\to0$$），故上述结论化为 $$K^{**}=\overline{\operatorname{conv}K}$$．这一性质的意义在于：**闭凸锥 被它的对偶锥完全决定**，即 $$K=K^{**}$$，因此研究 $$K$$ 与研究会 $$K^*$$ 是等价的（这是锥规划对偶 理论的基石）．

### 对偶锥诱导的广义不等式

既然适当锥的对偶锥仍是适当锥，则可以用适当锥 $$K$$ 的对偶锥 $$K^*$$ 也可以诱导广义不等式． 我们在下文简称其为\"**对偶广义不等式**\"．

<div class="definition">

适当锥的对偶锥 $$K^*$$ 可定义广义不等式 $$\begin{equation}
  x\preceq_{K^*}y\ \Longleftrightarrow\ y-x\in K^*,
\end{equation}$$ 其满足如下两条性质： $$\begin{align}
  &x\preceq_K y\ \Longleftrightarrow\ \lambda^\top x\le\lambda^\top y,\quad
  \forall\lambda\succeq_{K^*}0; \\
  &y\succeq_{K^*}0\ \Longleftrightarrow\ y^\top x\ge0,\quad \forall x\succeq_K0 .
\end{align}$$

</div>

**Proof** (2.167) 与 (2.168) 的证明**（(2.167) 与 (2.168) 的证明）** *(2.168) 的证明*．这就是对偶锥定义 (2.135) 的重述： $$\begin{equation}
  y\succeq_{K^*}0\iff y\in K^*\iff\left\langle x,\,y\right\rangle\ge0,\ \forall x\in K\iff y^\top x\ge0,\ \forall x\succeq_K0,
\end{equation}$$ 最后一步用到 $$x\succeq_K0\iff x-0\in K\iff x\in K$$．

*(2.167) 的证明*．

- （$$\Longrightarrow$$）设 $$x\preceq_K y$$，即 $$y-x\in K$$．再设 $$\lambda\succeq_{K^*}0$$，即 $$\lambda\in K^*$$．由 $$K^*$$ 的定义， $$\begin{equation}
      \lambda^\top y-\lambda^\top x=\left\langle y-x,\,\lambda\right\rangle\ge0,
  \end{equation}$$ 即 $$\lambda^\top x\le\lambda^\top y$$．

- （$$\Longleftarrow$$）反设 $$x\not\preceq_K y$$，即 $$y-x\notin K$$．由于 $$K$$ 是适当锥， $$K$$ 是闭凸锥，由二次对偶（定理 2.12(6)）得 $$K^{**}=K$$，故 $$\begin{equation}
      y-x\notin K=K^{**}=\lbrace\xi:\left\langle \xi,\,\lambda\right\rangle\ge0,\ \forall\lambda\in K^*\rbrace,
  \end{equation}$$ 即存在 $$\lambda\in K^*$$（也就是 $$\lambda\succeq_{K^*}0$$）使得 $$\begin{equation}
      \left\langle y-x,\,\lambda\right\rangle=\lambda^\top(y-x)<0,\qquad\text{即}\quad \lambda^\top x>\lambda^\top y,
  \end{equation}$$ 这与\"对一切 $$\lambda\succeq_{K^*}0$$ 都有 $$\lambda^\top x\le\lambda^\top y$$\"矛盾．故 $$x\preceq_K y$$．

为什么使用对偶广义不等式**（为什么使用对偶广义不等式）** 使用对偶广义不等式的好处是：

1.  **对偶锥始终是闭且凸的**（定理 2.12(1)(2)），因此 $$K^*$$ 诱导的序总是由闭凸锥给出，不会遇到\"锥不闭\"造成的技术麻烦；

2.  它把**一个偏序问题转换为满足一个偏序条件的全序问题**： (2.167) 把\"$$y-x\in K$$\"这一个\"向量式\"的条件，等价地换成了一族关于**实数** 的不等式 $$\lambda^\top x\le\lambda^\top y$$（$$\lambda$$ 遍历 $$K^*$$），而实数上的 $$\le$$ 是全序， 于是可以用熟悉的标量工具来分析．例如 $$\mathbb{R}^n_+$$ 的情形：$$x\le y$$（分量）等价于 $$\lambda^\top x\le\lambda^\top y$$ 对一切 $$\lambda\ge0$$ 成立，取 $$\lambda=e_i$$ 就回到分量 不等式；$$\mathcal{S}^{n}_{+}$$ 的情形：$$X\preceq Y$$ 等价于 $$v^\top Xv\le v^\top Yv$$ 对一切 $$v$$ 成立 （取 $$\lambda=vv^\top$$ 即得，因为 $$(\mathcal{S}^{n}_{+})^*=\mathcal{S}^{n}_{+}$$），这正是半定规划中\"用无穷多个线性 不等式刻画矩阵不等式\"的标准手法，也是内点法中把半定约束标量化处理的基础．

<div class="supp">

把 (2.167) 与 (2.168) 对照看，可以得到一个重要的对称性： $$\begin{equation}
  x\preceq_K y\iff \left\langle x,\,\lambda\right\rangle\le\left\langle y,\,\lambda\right\rangle\ \ \forall\lambda\in K^*
  \qquad\text{与}\qquad
  \lambda\succeq_{K^*}0\iff \left\langle x,\,\lambda\right\rangle\ge0\ \ \forall x\in K,
\end{equation}$$ 二者互为\"变量与乘子\"的对称表述．在第 6 章与后续的锥规划对偶理论中，$$\lambda\in K^*$$ 正是 拉格朗日乘子所在的集合：对锥约束 $$g(x)\preceq_K0$$，乘子必须取自 $$K^*$$；而互补松弛条件 $$\lambda^\top g(x)=0$$ 中，$$\lambda\in K^*$$ 与 $$-g(x)\in K$$ 的非负内积恰好说明了这一点． 读者可把这部分内容与 §2.6 的分离超平面定理一起复习：分离超平面的法向量 $$a$$ 正是把 \"集合的内外\"标量化的一把尺子，而对偶锥则把\"序\"标量化．

</div>

## 分离超平面定理

超平面是空间中一类特殊的凸集（仿射集），可以证明 $$\mathbb{R}^n$$ 空间中的超平面恰好是 $$n-1$$ 维的， 即它是\"余维 $$1$$\"的仿射集．

<div class="proposition">

设 $$a\ne0$$，则超平面 $$\lbracex:a^\top x=b\rbrace$$ 是 $$n-1$$ 维仿射集．

</div>

**Proof** **（）** 由 $$a\ne0$$ 知存在 $$x_0$$ 使 $$a^\top x_0=b$$（例如 $$x_0=\frac{b}{\left\Vert a\right\Vert_2^2}a$$）．于是 $$\begin{equation}
  \lbracex:a^\top x=b\rbrace=\lbracex:a^\top(x-x_0)=0\rbrace=x_0+\mathcal N(a^\top),
\end{equation}$$ 即超平面是子空间 $$\mathcal N(a^\top)$$ 的一个平移．由前置知识第 11 条， $$\begin{equation}
  \dim\mathcal N(a^\top)=n-\operatorname{rank}(a^\top)=n-1,
\end{equation}$$ （$$a\ne0$$ 说明 $$\operatorname{rank}(a^\top)=1$$），故超平面是 $$n-1$$ 维仿射集．特别地，$$\mathbb{R}^2$$ 中的超平面是 直线，$$\mathbb{R}^3$$ 中的超平面是平面．

正因为超平面把空间\"一分为二\"且维数恰好比空间低一维，我们可以用它来分离不相交的凸集．

### 分离超平面定理

<div class="theorem">

**定理 2.13** 如果 $$C$$ 和 $$D$$ 是不相交的凸集，则存在非零向量 $$a$$ 和常数 $$b$$，使得 $$\begin{equation}
  a^\top x\le b,\quad \forall x\in C,
  \qquad\text{且}\qquad
  a^\top x\ge b,\quad \forall x\in D,
\end{equation}$$ 即超平面 $$\begin{equation}
  \lbracex\mid a^\top x=b\rbrace
\end{equation}$$ 分离了 $$C$$ 和 $$D$$．

</div>

**图 2.12**：左：两个不相交凸集可由超平面分离．右：$$C$$ 由两个不相交的圆盘组成（非凸）， $$D$$ 的圆心落在 $$\operatorname{conv}C$$ 内部，故 $$D\subseteq\operatorname{conv}C$$，任何分离 $$C,D$$ 的超平面都将分离 $$\operatorname{conv}C$$ 与 $$D$$，这与 $$D\cap\operatorname{conv}C\ne\varnothing$$ 矛盾，因此无法分离．

超平面分离定理表明，如果要**软划分** $$\mathbb{R}^n$$ 中的 2 个凸集，则只需要求得一个适当的 超平面即可．这在分类问题中属于很容易解决的问题（\"线性可分\"）：给定两个凸的点集，只需 求解一个线性不等式组或一个凸优化问题来确定 $$(a,b)$$．实际上，如果有任何一个集合不是凸集， 则定理一般不成立，此时我们若要划分不同的集合，则一般需要使用更加复杂的平面（非线性分类面）． 图 2.12 的右图给出了一个反例：$$C$$ 是两个不相交圆盘的并（非凸），$$D$$ 是位于 两者之间的圆盘，且 $$D\subseteq\operatorname{conv}C$$．若超平面 $$\lbracex:a^\top x=b\rbrace$$ 分离 $$C$$ 与 $$D$$，那么 由 $$C\subseteq\lbracex:a^\top x\le b\rbrace$$ 及该半空间的凸性得 $$\operatorname{conv}C\subseteq\lbracex:a^\top x\le b\rbrace$$，从而 $$D$$ 中落在 $$\operatorname{conv}C$$ 内的那些点也满足 $$a^\top x\le b$$，与 $$D\subseteq\lbracex:a^\top x\ge b\rbrace$$ 且 $$D$$ 含有 $$a^\top x>b$$ 的点（$$D$$ 是 二维的、不可能整体落在超平面上）矛盾．这就给划分问题带来了巨大的挑战．

下面证明分离超平面定理的一个**特殊情形**（PPT 第 42--43 页），它同时揭示了\"分离方向\" 的选取方式：取两个集合最近点对的连线方向．

<div class="theorem">

**定理 2.14** 设 $$C,D\subseteq\mathbb{R}^n$$ 是不相交的非空凸集，且存在 $$c\in C$$ 与 $$d\in D$$ 使得 $$\begin{equation}
  \left\Vert c-d\right\Vert_2=\mathop{\mathrm{dist}}(C,D)=\inf\big\lbrace\left\Vert u-v\right\Vert_2\mid u\in C,\ v\in D\big\rbrace>0 .
\end{equation}$$ 则 $$C$$ 与 $$D$$ 可被超平面分离．

</div>

**Proof** **（）** **（第一步：构造候选超平面）**定义 $$\begin{equation}
  a=d-c,\qquad b=\frac{\left\Vert d\right\Vert_2^2-\left\Vert c\right\Vert_2^2}{2},\qquad
  f(x)=a^\top x-b=(d-c)^\top\Big(x-\frac{d+c}{2}\Big).
\end{equation}$$ 由 (2.178)，$$\left\Vert a\right\Vert_2=\left\Vert d-c\right\Vert_2>0$$，故 $$a\ne0$$；而两个表达式相等是因为 $$\begin{equation}
  (d-c)^\top\Big(x-\frac{d+c}{2}\Big)=(d-c)^\top x-\frac{(d-c)^\top(d+c)}{2}
  =(d-c)^\top x-\frac{\left\Vert d\right\Vert_2^2-\left\Vert c\right\Vert_2^2}{2}=a^\top x-b,
\end{equation}$$ 其中用到 $$(d-c)^\top(d+c)=\left\Vert d\right\Vert_2^2-\left\Vert c\right\Vert_2^2$$．几何上，$$a=d-c$$ 是由 $$c$$ 指向 $$d$$ 的 向量，超平面 $$\lbracex:a^\top x=b\rbrace$$ 过 $$c,d$$ 的中点且与 $$a$$ 垂直，$$f$$ 是它的\"有向距离型\"判定 函数．以下证明：$$f(x)\le0,\ \forall x\in C$$ 且 $$f(x)\ge0,\ \forall x\in D$$，这就给出了分离 超平面．注意到 $$\begin{equation}
  f(d)=(d-c)^\top\Big(d-\frac{d+c}{2}\Big)=\frac{(d-c)^\top(d-c)}{2}=\frac{\left\Vert d-c\right\Vert_2^2}{2}>0 .
\end{equation}$$

**（第二步：证明 $$f(x)\ge0,\ \forall x\in D$$，用反证法）**假设存在 $$u\in D$$，使得 $$\begin{equation}
  f(u)=(d-c)^\top\Big(u-\frac{d+c}{2}\Big)<0 .
\end{equation}$$ 可以先将 $$f(u)$$ 写成 $$\begin{equation}
  f(u)=(d-c)^\top(u-d)+(d-c)^\top\Big(d-\frac{d+c}{2}\Big)
  =(d-c)^\top(u-d)+\frac{\left\Vert d-c\right\Vert_2^2}{2},
\end{equation}$$ 其中第二项就是 $$f(d)=\frac{\left\Vert d-c\right\Vert_2^2}{2}$$（见 (2.181)）．由 $$f(u)<0$$ 与 (2.183) 得 $$\begin{equation}
  (d-c)^\top(u-d)<-\frac{\left\Vert d-c\right\Vert_2^2}{2}<0 .
\end{equation}$$ 对于 $$t\in[0,1]$$，构造 $$d$$ 与 $$u$$ 的凸组合 $$\begin{equation}
  z(t)=d+t(u-d) .
\end{equation}$$ 由于 $$D$$ 是凸集且 $$d,u\in D$$，故 $$z(t)\in D$$ 对一切 $$t\in[0,1]$$ 成立．考虑函数 $$\begin{equation}
  g(t)=\left\Vert z(t)-c\right\Vert_2^2=\left\Vert(d-c)+t(u-d)\right\Vert_2^2
  =\left\Vert d-c\right\Vert_2^2+2t\,(d-c)^\top(u-d)+t^2\left\Vert u-d\right\Vert_2^2,
\end{equation}$$ 它在 $$t=0$$ 处的右导数为 $$\begin{equation}
  \frac{\mathrm{d}}{\mathrm{d}t}\left\Vert z(t)-c\right\Vert_2^2\Big\vert_{t=0}=2(d-c)^\top(u-d)<0,
\end{equation}$$ （最后一个不等号即 (2.184)）．由导数的定义，存在充分小的 $$t_1\in(0,1]$$，使得 $$\begin{equation}
  \frac{g(t_1)-g(0)}{t_1}<0,\qquad\text{即}\qquad
  \left\Vert z(t_1)-c\right\Vert_2^2<\left\Vert d-c\right\Vert_2^2 .
\end{equation}$$ 这意味着点 $$z(t_1)\in D$$ 到 $$c\in C$$ 的距离比 $$d$$ 到 $$c$$ 的距离更近： $$\begin{equation}
  \left\Vert z(t_1)-c\right\Vert_2<\left\Vert d-c\right\Vert_2=\mathop{\mathrm{dist}}(C,D),
\end{equation}$$ 这与 $$\mathop{\mathrm{dist}}(C,D)$$ 是 $$C$$ 与 $$D$$ 之间距离的下确界（即任何 $$u'\in C,v'\in D$$ 的距离都 $$\ge\mathop{\mathrm{dist}}(C,D)$$）矛盾．故 $$f(u)\ge0$$ 对一切 $$u\in D$$ 成立．

**（第三步：证明 $$f(x)\le0,\ \forall x\in C$$）**其它情形类似．假设存在 $$v\in C$$ 使 $$f(v)>0$$．先把 $$f(v)$$ 改写成 $$\begin{equation}
  f(v)=(d-c)^\top(v-c)+(d-c)^\top\Big(c-\frac{d+c}{2}\Big)
  =(d-c)^\top(v-c)-\frac{\left\Vert d-c\right\Vert_2^2}{2}>0,
\end{equation}$$ 于是 $$(d-c)^\top(v-c)>\frac{\left\Vert d-c\right\Vert_2^2}{2}>0$$．对 $$t\in[0,1]$$ 构造凸组合 $$\begin{equation}
  w(t)=c+t(v-c)\in C
\end{equation}$$ （由 $$C$$ 的凸性），并考虑 $$\tilde g(t)=\left\Vert w(t)-d\right\Vert_2^2$$．与第二步完全相同的计算给出 $$\begin{equation}
  \frac{\mathrm{d}}{\mathrm{d}t}\left\Vert w(t)-d\right\Vert_2^2\Big\vert_{t=0}=2(c-d)^\top(v-c)=-2(d-c)^\top(v-c)<0,
\end{equation}$$ 于是存在 $$t_1\in(0,1]$$ 使 $$\left\Vert w(t_1)-d\right\Vert_2<\left\Vert c-d\right\Vert_2=\mathop{\mathrm{dist}}(C,D)$$，同样矛盾．故 $$f(v)\le0$$ 对一切 $$v\in C$$ 成立．

**（第四步：结论）**综合第二、三步，超平面 $$\lbracex:a^\top x=b\rbrace$$ 满足 $$a^\top x\le b\ (\forall x\in C)$$ 与 $$a^\top x\ge b\ (\forall x\in D)$$，即它分离了 $$C$$ 与 $$D$$． 定理得证．

定理 2.14 的假设与一般情形的差距**（定理 2.14 的假设与一般情形的差距）** (2.178) 要求两件事：第一，$$\mathop{\mathrm{dist}}(C,D)>0$$（即两个集合不\"贴合\"）；第二， **最近点对确实被取到**．若 $$C$$ 是闭凸集、$$D$$ 是紧凸集（例如 §2.6.2 的严格分离定理）， 则最近点对一定存在：取 $$u_k\in C,\ v_k\in D$$ 使 $$\left\Vert u_k-v_k\right\Vert\to\mathop{\mathrm{dist}}(C,D)$$，由 $$D$$ 紧可抽 子列 $$v_{k_j}\to v\in D$$，由 $$\lbraceu_{k_j}\rbrace$$ 有界可再抽子列 $$u_{k_j}\to u\in C$$（用到 $$C$$ 闭）， 于是 $$\left\Vert u-v\right\Vert=\mathop{\mathrm{dist}}(C,D)$$．一般情形下最近点对可能不存在（例如 $$C=\lbracex>0\rbrace\times\lbrace0\rbrace$$、 $$D=\lbrace0\rbrace\times\lbrace1\rbrace$$，$$\mathop{\mathrm{dist}}=1$$ 取不到），此时需改用\"逼近点列 + 分离方向取聚点\"的论证方式， 但结论仍然成立．PPT 只讨论上述特殊情形，正是为了突出\"最近点对连线的方向就是分离方向\"这一 几何直观．

### 严格分离定理与支撑超平面

我们在超平面分离时提到了软划分的概念，其表明若集合仅是凸集，则定理中等号可能成立，即某一 凸集与超平面相交（PPT 请读者举一个简单例子）．很多时候进一步要求超平面与任何凸集都不交， 为此我们需要加强定理的条件．先给出 PPT 要求的简单例子．

<div class="example">

取 $$\begin{equation}
  C=\lbrace(x_1,x_2)\in\mathbb{R}^2\mid x_2\ge0\rbrace,\qquad D=\lbrace(x_1,x_2)\in\mathbb{R}^2\mid x_2<0\rbrace,
\end{equation}$$ 则 $$C,D$$ 都是凸集且不相交．若 $$a=(a_1,a_2)^\top\ne0$$，$$b$$ 使 $$a^\top x\le b\ (\forall x\in C)$$ 且 $$a^\top x\ge b\ (\forall x\in D)$$：由 $$C$$ 在 $$x_1$$ 方向无界得 $$a_1=0$$；再由 $$C$$ 在 $$x_2$$ 方向无上界得 $$a_2\le0$$；于是 $$a=(0,a_2)$$，$$a_2<0$$．由 $$C$$ 中最小的 $$a^\top x$$（在 $$x_2=0$$ 处取到）得 $$b\ge0$$，由 $$D$$ 中 $$a^\top x=a_2x_2$$ 的取值（$$x_2<0$$ 时为正，且可任意接近 $$0$$） 得 $$b\le0$$．因此唯一的可能是 $$a=(0,-1)$$、$$b=0$$，即超平面 $$\lbracex_2=0\rbrace$$．而这个超平面与 $$C$$ 相交（整个负 $$x_1$$ 轴，即 $$C$$ 的边界都落在超平面上），等号在 $$x\in\partial C$$ 处成立，故 该分离不是严格的；事实上可以证明 $$C$$ 与 $$D$$ 根本无法严格分离（因为二者的闭包相交于 $$\lbracex_2=0\rbrace$$ 上的点）．

</div>

<div class="theorem">

**定理 2.15** 如果 $$C$$ 和 $$D$$ 是不相交的凸集，且 $$C$$ 是闭集，$$D$$ 是紧集，则存在非零向量 $$a$$ 和常数 $$b$$， 使得 $$\begin{equation}
  a^\top x<b,\quad\forall x\in C,
  \qquad\text{且}\qquad
  a^\top x>b,\quad\forall x\in D,
\end{equation}$$ 即超平面 $$\begin{equation}
  \lbracex\mid a^\top x=b\rbrace
\end{equation}$$ 严格分离了 $$C$$ 和 $$D$$．此定理的退化形式即 $$D$$ 退化为单点集 $$\lbracex_0\rbrace$$：此时只要 $$x_0\notin C$$，就有 $$a^\top x<b<a^\top x_0$$ 对一切 $$x\in C$$ 成立．

</div>

**Proof** **（）** **（第一步：距离为正且最近点对存在）**首先证明 $$\epsilon:=\mathop{\mathrm{dist}}(C,D)>0$$．若 $$\epsilon=0$$，则存在 $$u_k\in C,\ v_k\in D$$ 使 $$\left\Vert u_k-v_k\right\Vert\to0$$．由 $$D$$ 紧，$$\lbracev_k\rbrace$$ 有 收敛子列 $$v_{k_j}\to v\in D$$，于是 $$\begin{equation}
  \left\Vert u_{k_j}-v\right\Vert\le\left\Vert u_{k_j}-v_{k_j}\right\Vert+\left\Vert v_{k_j}-v\right\Vert\ \longrightarrow\ 0,
\end{equation}$$ 即 $$u_{k_j}\to v$$；由 $$C$$ 闭得 $$v\in C$$，与 $$C\cap D=\varnothing$$ 矛盾．故 $$\epsilon>0$$．

再由 $$\epsilon$$ 的定义，存在 $$c_k\in C,\ d_k\in D$$ 使 $$\left\Vert c_k-d_k\right\Vert\to\epsilon$$．由 $$D$$ 紧 抽子列 $$d_{k_j}\to d^*\in D$$；由 $$\lbrace\left\Vert c_{k_j}\right\Vert\rbrace$$ 有界（ $$\left\Vert c_{k_j}\right\Vert\le\left\Vert c_{k_j}-d_{k_j}\right\Vert+\left\Vert d_{k_j}\right\Vert$$）再抽子列 $$c_{k_j}\to c^*\in C$$ （$$C$$ 闭），于是 $$\left\Vert c^*-d^*\right\Vert=\epsilon=\mathop{\mathrm{dist}}(C,D)$$，即最近点对 $$(c^*,d^*)$$ 存在．

**（第二步：最近点对的一阶条件）**由于 $$c^*$$ 是 $$C$$ 中距离 $$d^*$$ 最近的点，对任意 $$v\in C$$ 与 $$\lambda\in[0,1]$$，点 $$(1-\lambda)c^*+\lambda v\in C$$（$$C$$ 凸），故 $$\begin{equation}
  \left\Vert(1-\lambda)c^*+\lambda v-d^*\right\Vert_2^2\ge\left\Vert c^*-d^*\right\Vert_2^2,\qquad \forall\lambda\in[0,1].
\end{equation}$$ 左端是关于 $$\lambda$$ 的二次函数，在 $$\lambda=0$$ 处取最小值，故其右导数非负： $$\begin{equation}
  2\big(c^*-d^*\big)^\top(v-c^*)\ge0,\qquad \forall v\in C .
\end{equation}$$ 对称地，由 $$d^*$$ 是 $$D$$ 中距离 $$c^*$$ 最近的点，对任意 $$u\in D$$， $$\begin{equation}
  2\big(d^*-c^*\big)^\top(u-d^*)\ge0,\qquad \forall u\in D .
\end{equation}$$

**（第三步：构造超平面并证明 $$C$$ 一侧严格）**令 $$\begin{equation}
  a=d^*-c^*\ne0,\qquad b=a^\top\frac{c^*+d^*}{2},\qquad
  h(x)=a^\top x-b=(d^*-c^*)^\top\Big(x-\frac{c^*+d^*}{2}\Big),
\end{equation}$$ 则对任意 $$v\in C$$，由 (2.198) 与 $$\left\Vert d^*-c^*\right\Vert_2^2=\epsilon^2$$， $$\begin{equation}
  h(v)=(d^*-c^*)^\top(v-c^*)+\frac{(d^*-c^*)^\top(c^*-d^*)}{2}
  =(d^*-c^*)^\top(v-c^*)-\frac{\epsilon^2}{2}\le-\frac{\epsilon^2}{2}<0,
\end{equation}$$ 即在 $$C$$ 上 $$h$$ 被一致地分离于 $$0$$ 之外：$$\sup_{x\in C}a^\top x\le b-\frac{\epsilon^2}{2}<b$$．

**（第四步：证明 $$D$$ 一侧严格）**$$D$$ 紧、$$h$$ 连续，故 $$h$$ 在 $$D$$ 上取到最小值，设最小值点 为 $$u^*\in D$$．若 $$h(u^*)=0$$，则由 (2.199)， $$\begin{equation}
  0=h(u^*)=(d^*-c^*)^\top(u^*-d^*)+\frac{\epsilon^2}{2}\ge\frac{\epsilon^2}{2}>0,
\end{equation}$$ 矛盾．故 $$h(u^*)>0$$，即 $$\inf_{x\in D}a^\top x=b+h(u^*)>b$$．综上，超平面 $$\lbracex:a^\top x=b\rbrace$$ 满足 $$a^\top x<b\ (\forall x\in C)$$ 与 $$a^\top x>b\ (\forall x\in D)$$， 即严格分离了 $$C$$ 与 $$D$$．

**（退化形式）**当 $$D=\lbracex_0\rbrace$$ 时 $$D$$ 紧、$$C$$ 闭且 $$x_0\in D$$ 与 $$C$$ 不相交，上述结论 给出 $$a^\top x<b<a^\top x_0\ (\forall x\in C)$$，这正是讲义定理 2.6 的形式．此时由第一步的 论证还知道 $$\mathop{\mathrm{dist}}(x_0,C)>0$$．

弱分离与严格分离的区别**（弱分离与严格分离的区别）** 弱分离定理（定理 2.13）只要求\"两个集合分别落在两个闭半空间中\"，超平面可以与集合 相交（如上面的例子）；严格分离定理（定理 2.15）要求两个集合分别落在两个 **开**半空间中，超平面与任何一方都不相交．保证严格性的关键条件是\"一个闭、一个紧\"， 它使得 $$\mathop{\mathrm{dist}}(C,D)>0$$ 且最近点对存在．若去掉紧性，只要 $$C,D$$ 是渐近贴近的闭凸集（如 $$C=\lbrace(x_1,x_2):x_1x_2\ge1,\ x_1>0\rbrace$$ 与 $$D=\lbracex_2\le0\rbrace$$），就只能弱分离而不能严格分离．

<div class="definition">

给定集合 $$C$$ 以及边界上的点 $$x_0$$，如果 $$a\ne0$$ 满足 $$a^\top x\le a^\top x_0,\ \forall x\in C$$，那么称集合 $$\begin{equation}
  \lbracex\mid a^\top x=a^\top x_0\rbrace
\end{equation}$$ 为 $$C$$ 在边界点 $$x_0$$ 处的**支撑超平面**．

</div>

根据定义，点 $$x_0$$ 和集合 $$C$$ 也被该超平面分开（严格地说，$$C$$ 整个落在闭半空间 $$\lbracex:a^\top x\le a^\top x_0\rbrace$$ 中，而 $$x_0$$ 落在超平面上）．从集合上而言，超平面 $$\lbracex:a^\top x=a^\top x_0\rbrace$$ 与集合 $$C$$ 在点 $$x_0$$ 处**相切**，并且半空间 $$\lbracex:a^\top x\le a^\top x_0\rbrace$$ 包含 $$C$$．

**图 2.13**：左：凸集 $$C$$ 在其边界点 $$x_0$$ 处的支撑超平面，它与 $$C$$ 在 $$x_0$$ 处相切，半空间 $$\lbracex:a^\top x\le a^\top x_0\rbrace$$ 包含 $$C$$．右：由两个相切圆盘组成的非凸集 $$C$$，在相切点 $$x_0$$ 处任何过 $$x_0$$ 的直线都会穿入其中一个圆盘，故不存在支撑超平面．

<div class="example">

取 $$C$$ 为两个外切圆盘的并： $$\begin{equation}
  C=\big\lbracex:(x_1-1)^2+x_2^2\le1\big\rbrace\cup\big\lbracex:(x_1+1)^2+x_2^2\le1\big\rbrace,
\end{equation}$$ 则 $$x_0=(0,0)$$ 是 $$C$$ 的边界点（两个圆盘的切点），但 $$C$$ 在 $$x_0$$ 处**没有**支撑超平面． 事实上，若存在 $$a=(a_1,a_2)^\top\ne0$$ 使 $$a^\top x\le a^\top x_0=0$$ 对一切 $$x\in C$$ 成立： 对右圆盘取 $$x=(1,0)$$ 得 $$a_1\le0$$，对左圆盘取 $$x=(-1,0)$$ 得 $$-a_1\le0$$，故 $$a_1=0$$； 再由右圆盘中的点 $$(1,\epsilon)$$ 得 $$a_2\epsilon\le0$$ 对充分小的 $$\epsilon>0$$ 成立，故 $$a_2\le0$$， 而由 $$(1,-\epsilon)$$ 得 $$a_2\ge0$$，于是 $$a_2=0$$，与 $$a\ne0$$ 矛盾．图 2.13 右图画出了 这个反例：过 $$x_0$$ 的任何直线都会进入其中一个圆盘．

</div>

<div class="theorem">

**定理 2.16** 若 $$C$$ 是凸集，则 $$C$$ 的任意边界点处都存在支撑超平面．

</div>

**Proof** **（）** 设 $$x_0\in\partial C$$．我们要构造 $$a\ne0$$ 使 $$a^\top x\le a^\top x_0$$ 对一切 $$x\in C$$ 成立． **（第一步：在 $$x_0$$ 附近取一列落在 $$\overline C$$ 之外的点）**先注意两个事实： (i) 对凸集有 $$\operatorname{int}C=\operatorname{int}\overline C$$（当 $$\operatorname{int}C\ne\varnothing$$ 时，任取 $$y\in\operatorname{int}C$$，$$x\in\operatorname{int}\overline C$$，取 $$t>1$$ 使 $$w=y+t(x-y)\in\overline C$$，则 $$x=(1-\frac1t)y+\frac1t w$$ 是内点与闭包点的凸组合，从而是内点）； (ii) 若 $$\operatorname{int}C=\varnothing$$，则 $$C$$ 包含在一个低于 $$n$$ 维的仿射集中，其闭包亦然．于是无论 哪种情形，从 $$x_0\in\partial C$$（即 $$x_0\in\overline C$$ 但 $$x_0\notin\operatorname{int}C$$）出发，总能取到 点列 $$\begin{equation}
  y_k\notin\overline C,\qquad y_k\ \longrightarrow\ x_0\qquad(k\to\infty).
\end{equation}$$ （当 $$\operatorname{int}C=\varnothing$$ 时，$$\overline C$$ 不含内点，故 $$x_0$$ 的任意小邻域内都有点不在 $$\overline C$$ 中；当 $$\operatorname{int}C\ne\varnothing$$ 时，$$x_0\notin\operatorname{int}C=\operatorname{int}\overline C$$ 说明 $$x_0$$ 是 $$\overline C$$ 的边界点，同样可取出这样的点列．）

**（第二步：对每个 $$k$$ 作严格分离）**$$\overline C$$ 是闭凸集（凸集的闭包是凸集，见定理 2.2(4)），且 $$y_k\notin\overline C$$．对闭凸集 $$\overline C$$ 与紧集 $$\lbracey_k\rbrace$$ 应用严格分离定理（定理 2.15 的退化形式），存在 $$a_k\ne0$$ 与 $$b_k$$ 使 $$\begin{equation}
  a_k^\top x<b_k<a_k^\top y_k,\qquad \forall x\in\overline C .
\end{equation}$$ 不妨设 $$\left\Vert a_k\right\Vert_2=1$$（把 (2.206) 中的 $$a_k,b_k$$ 同时除以 $$\left\Vert a_k\right\Vert_2>0$$，不等式仍然成立）．由于单位球面 $$\lbracea:\left\Vert a\right\Vert_2=1\rbrace$$ 是紧集，点列 $$\lbracea_k\rbrace$$ 有收敛子列，仍记为 $$a_k$$，满足 $$\begin{equation}
  a_k\ \longrightarrow\ a,\qquad \left\Vert a\right\Vert_2=1\quad(\text{故 }a\ne0).
\end{equation}$$

**（第三步：取极限）**在 (2.206) 中固定 $$x\in C\ (\subseteq\overline C)$$， 令 $$k\to\infty$$：左端 $$a_k^\top x\to a^\top x$$，右端 $$a_k^\top y_k\to a^\top x_0$$（因为 $$a_k\to a$$ 有界、$$y_k\to x_0$$），而严格不等式在取极限后至多变成非严格不等式，故 $$\begin{equation}
  a^\top x\le a^\top x_0,\qquad \forall x\in C .
\end{equation}$$ 按定义，$$\lbracex:a^\top x=a^\top x_0\rbrace$$ 就是 $$C$$ 在边界点 $$x_0$$ 处的支撑超平面．证毕．

支撑超平面定理有非常强的几何直观：给定一个平面后，可把凸集边界上的任意一点当成支撑点， 将凸集放在该平面上．这也是凸集的特殊性质，一般的集合甚至无法保证存在平面上的支撑点： 正如上面的例子所示，由两个相切圆盘组成的非凸集在切点处就没有支撑超平面；类似地， 讲义图 2.4(b) 的\"月牙形\"集合也不可能以其凹陷处为支撑点放置在水平面上．

支撑超平面与最优性条件的联系**（支撑超平面与最优性条件的联系）** 支撑超平面定理是凸分析中使用频率最高的工具之一，其典型用法是：设 $$x^*$$ 是凸优化问题 $$\begin{equation}
  \min_{x\in C}\ f(x)
\end{equation}$$ 的最优解，其中 $$f$$ 可微、$$C$$ 是凸集，则水平集 $$\lbracex:f(x)\le f(x^*)\rbrace$$ 与 $$C$$ 在 $$x^*$$ 处 \"相切\"，用支撑超平面（或分离超平面）一写就得到**一阶最优性条件** $$\begin{equation}
  -\nabla f(x^*)\in\mathcal N_C(x^*),
\end{equation}$$ 其中 $$\mathcal N_C(x^*)$$ 是 $$C$$ 在 $$x^*$$ 处的法锥（由所有支撑超平面的法向量组成）．这正是 第 3 章凸函数最优性条件与第 6 章 KKT 条件的几何来源．

## 本章小结

**（）**   本章围绕\"凸集\"建立了三件事：**怎样写集合**、**怎样判定凸性**、**凸集能带给我 们什么**．要点如下．

- **范数**：范数用来度量向量与矩阵的\"大小\"，是后面所有几何对象的度量基础． 向量范数 $$\left\Vert\cdot\right\Vert_p$$（$$p=1,2,\infty$$ 最重要）、矩阵的逐元素 $$\left\Vert A\right\Vert_1$$ 与 F 范数 $$\left\Vert A\right\Vert_F$$、算子范数（最大列和、谱范数、最大行和）、核范数 $$\left\Vert A\right\Vert_*$$；矩阵内积 $$\left\langle A,\,B\right\rangle=\operatorname{tr}(AB^\top)$$ 及其 Cauchy 不等式．

- **定义与基本性质**：仿射集（直线封闭）$$\Rightarrow$$ 凸集（线段封闭）；凸集的 数乘、和集、交、内部、闭包都保凸；凸组合、凸包、仿射包、锥组合、凸锥；$$\operatorname{conv}S$$ 是包含 $$S$$ 的最小凸集（等价地，它是一切包含 $$S$$ 的凸集之交）．

- **重要的凸集**：超平面与半空间、多面体、球与椭球、范数锥（含二次锥）、 $$\mathcal{S}^{n},\mathcal{S}^{n}_{+},\mathcal{S}^{n}_{++}$$，以及 $$2\times2$$ 半正定锥的显式刻画 $$x\ge0,\ z\ge0,\ xz\ge y^2$$．

- **保凸运算**：取交（任意多）、仿射变换（像与原像）、透视变换与分式线性变换 （像与原像）．掌握这些运算后，绝大多数集合的凸性都可以\"组装\"出来．

- **广义不等式与对偶锥**：适当锥（凸 + 闭 + 实心 + 尖）诱导广义不等式 $$x\preceq_K y\iff y-x\in K$$，它具有自反、反对称、传递、可加、非负缩放五条性质；对偶锥 $$K^*=\lbracey:\left\langle x,\,y\right\rangle\ge0,\forall x\in K\rbrace$$ 是闭凸锥，适当锥的对偶锥仍适当；对偶锥把偏序问题 转化为一族标量不等式 $$\lambda^\top x\le\lambda^\top y\ (\forall\lambda\succeq_{K^*}0)$$． 自对偶的锥有 $$\mathbb{R}^n_+$$、$$\mathcal{S}^{n}_{+}$$ 与二次锥．

- **分离与支撑**：不相交的凸集可被超平面分离；$$C$$ 闭、$$D$$ 紧时可严格分离；凸集 的任何边界点处都有支撑超平面．这三条结论是凸优化对偶理论与最优性条件的几何基础．

| 锥 $$K$$ | 定义 | 对偶锥 $$K^*$$ | 是否自对偶 |
|:---|:---|:---|:---|
| $$\mathbb{R}^n_+$$ | $$\lbracex:x_i\ge0\rbrace$$ | $$\mathbb{R}^n_+$$ | 是 |
| $$\mathcal{S}^{n}_{+}$$ | $$\lbraceX\in\mathcal{S}^{n}:X\succeq0\rbrace$$ | $$\mathcal{S}^{n}_{+}$$ | 是 |
| $$\mathcal{S}^{n}_{++}$$ | $$\lbraceX\in\mathcal{S}^{n}:X\succ0\rbrace$$ | （非闭锥，不讨论） | --- |
| 范数锥 $$K_p$$ | $$\lbrace(x,t):\left\Vert x\right\Vert_p\le t\rbrace$$ | $$K_q$$（$$p,q$$ 共轭） | 仅当 $$p=q=2$$ |
| 二次锥 $$\mathcal K_2$$ | $$\lbrace(x,t):\left\Vert x\right\Vert_2\le t\rbrace$$ | $$\mathcal K_2$$ | 是 |
| 多项式锥 | $$\lbracex:p_x\ge0$$ 于 $$[0,1]\rbrace$$ | 矩锥（本课程不展开） | 否 |

: 本章常用的锥、对偶锥与诱导的广义不等式
