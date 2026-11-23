---
layout: note
kind: note
title: "第四章　Lebesgue 积分"
course: realanalysis
order: 4
date: 2026-11-23
---

## 4.1 非负可测函数的积分

<div class="definition">

**定义 4.1（非负可测函数空间与简单函数的积分）**

记非负可测函数空间

$$
L^+:=\{\text{可测}\ f:\ E\to[0,+\infty]\}.
$$

对简单函数 $$\varphi\in L^+$$，

$$
\varphi(x):=\sum_{j=1}^{n}a_j\cdot 1_{A_j},\qquad
A_j\ \text{两两不交可测},
$$

定义其积分

$$
\int_E\varphi\,dm:=\sum_{j=1}^{n}a_j\,m(A_j).
$$

</div>

<div class="proposition">

**命题 4.1（简单函数积分的基本性质）**

1. $$\forall c\ge0$$，$$\displaystyle\int_E c\varphi\,dm=c\cdot\int_E\varphi\,dm$$；
2. $$\displaystyle\int_E(\varphi+\psi)\,dm=\int_E\varphi\,dm+\int_E\psi\,dm$$；
3. $$\varphi\le\psi\ \Longrightarrow\ \displaystyle\int_E\varphi\,dm\le\int_E\psi\,dm$$.

</div>

**证明** （1）显然.（2）设 $$\varphi=\sum_i a_i1_{A_i}$$，$$\psi=\sum_j b_j1_{B_j}$$ 为标准表示（同一函数的不同表示给出同一积分：合并分划即可）. 令 $$C_{ij}=A_i\cap B_j$$，则 $$\varphi+\psi=\sum_{i,j}(a_i+b_j)1_{C_{ij}}$$（在 $$\varphi$$、$$\psi$$ 的公共分划下），于是

$$
\int_E(\varphi+\psi)dm=\sum_{i,j}(a_i+b_j)m(C_{ij})
=\sum_i a_i\,m(A_i)+\sum_j b_j\,m(B_j).
$$

（3）由 $$\psi=\varphi+(\psi-\varphi)$$ 与（2）及非负性. $$\square$$

<div class="definition">

**定义 4.2（非负可测函数的积分）**

对 $$\forall f\in L^+$$，定义 $$f$$ 的 Lebesgue 积分

$$
\int_E f\,dm=\sup\Big\{\int_E\varphi\,dm:\ 0\le\varphi\le f,\ \varphi\ \text{simple}\Big\}.
$$

称 $$f$$ 是 $$L$$ **可积的**，若 $$\int_E f\,dm<+\infty$$.

</div>

<div class="proposition">

**命题 4.2（可积函数的控制）**

设 $$f$$ 非负可测. 若 $$F$$ 是 $$L$$ 可积的且 $$f\le F$$，则 $$f$$ 也是 $$L$$ 可积的.

</div>

**证明** 任何满足 $$0\le\varphi\le f$$ 的简单函数亦满足 $$\varphi\le F$$，故

$$
\int_E f\,dm=\sup_{\varphi\le f}\int_E\varphi\,dm\le\sup_{\varphi\le F}\int_E\varphi\,dm
=\int_E F\,dm<\infty.
$$

$$\square$$

<div class="proposition">

**命题 4.3（可积函数几乎处处有限）**

设 $$f$$ 非负可测且 $$L$$ 可积，则 $$f(x)<\infty$$，a.e. $$x\in E$$.

</div>

**证明** 取 $$E_k=\{x\in E:\ f(x)>k\}$$，则

$$
\{x\in E:\ f(x)=+\infty\}=\bigcap_{k=1}^{\infty}E_k=\lim_k E_k .
$$

$$\forall k$$，简单函数 $$k\cdot1_{E_k}\le f\big|_{E_k}$$，故

$$
k\cdot mE_k\le\int_{E_k}f(x)\,dm\le\int_E f(x)\,dm<+\infty
\quad\Longrightarrow\quad
mE_k\le\frac1k\int_E f\,dm .
$$

令 $$k\to\infty$$ 得 $$\lim_k mE_k=0$$，又 $$E_k\downarrow$$，由测度的上连续性（$$mE_1\le\int_E f\,dm<\infty$$，命题 2.9(2)）：

$$
m\big(\lim_k E_k\big)=0.
$$

$$\square$$

<div class="theorem">

**定理 4.1（Levi 单调收敛定理（MCT））**

设 $$\{f_j\}\subseteq L^+$$，$$f\in L^+$$，$$f_j\le f_{j+1}$$，$$f_j\to f$$ pointwise，则

$$
\int_E f\,dm=\lim_{j\to\infty}\int_E f_j\,dm .
$$

</div>

**证明** $$f_j\le f_{j+1}\Rightarrow\int_E f_j\,dm\le\int_E f_{j+1}\,dm$$，且 $$\int_E f_j\,dm\le\int_E f\,dm$$，故

$$
\lim_{j\to\infty}\int_E f_j\,dm=\sup_{j\ge1}\int_E f_j\,dm\le\int_E f\,dm .
$$

固定简单函数 $$0\le\varphi\le f$$ 与 $$\alpha\in(0,1)$$，记

$$
E_j:=\{x\in E:\ f_j\ge\alpha\varphi\}.
$$

则 $$\bigcup_j E_j=E$$（$$f_j(x)\uparrow f(x)\ge\varphi(x)$$；若 $$\varphi(x)>0$$ 则最终 $$f_j(x)\ge\alpha\varphi(x)$$；若 $$\varphi(x)=0$$ 则 $$x\in E_j$$ 恒成立）且 $$E_j\subseteq E_{j+1}$$. 于是

$$
\lim_{j\to\infty}\int_E f_j\,dm
\ge\lim_{j\to\infty}\int_{E_j}f_j\,dm
\ge\lim_{j\to\infty}\int_{E_j}\alpha\varphi\,dm .
$$

设 $$\varphi=\sum_{i=1}^{k}a_i1_{A_i}$$，则

$$
\alpha\int_{E_j}\varphi\,dm=\alpha\sum_{i=1}^{k}a_i\,m(A_i\cap E_j)
\xrightarrow[j\to\infty]{}\alpha\sum_{i=1}^{k}a_i\,mA_i
=\alpha\int_E\varphi\,dm,
$$

（$$A_i\cap E_j\uparrow A_i$$，用测度的下连续性）. 令 $$j\to\infty$$：

$$
\lim_{j\to\infty}\int_E f_j\,dm\ge\int_E\alpha\varphi\,dm
\quad\Longrightarrow\quad
\lim_{j\to\infty}\int_E f_j\,dm\ge\int_E\varphi\,dm .
$$

对一切 $$0\le\varphi\le f$$ 取上确界：

$$
\lim_{j\to\infty}\int_E f_j\,dm\ge\sup_{0\le\varphi\le f}\int_E\varphi\,dm
=\int_E f\,dm .
$$

综上等号成立. $$\square$$

**注**（下方图像的直观） 定义 $$f$$ 的**下方图像**

$$
G_f:=\{(x,t)\in E\times[0,\infty]:\ 0\le t\le f(x)\}.
$$

$$f_j\le f_{j+1}\Rightarrow G_{f_j}\subseteq G_{f_{j+1}}$$ 是单增可测集列；$$G_f=\bigcup_{j\ge1}G_{f_j}$$，由测度的下连续性 $$\lim_{j\to\infty}m(G_{f_j})=m(G_f)$$，故直观上

$$
\lim_{j\to\infty}\int_E f_j\,dm=\int_E f\,dm
$$

（“曲边梯形面积取极限”）. 严格地说，“$$\int_E f\,dm=m(G_f)$$”本身需要 MCT（或 §4.6 的 Fubini 定理）来证，故此段仅作直观，**并不严谨**.

<div class="center">

![MCT 的下方图像直观](fig/subgraph-mct.png)

**图 4.1**　MCT 的下方图像直观：阶梯函数 $$f_j\uparrow f$$，其下方图像随之递增并穷尽 $$G_f$$

</div>

<div class="theorem">

**定理 4.2（积分的线性性）**

设 $$f,g$$ 非负可测，$$\alpha,\beta>0$$，则

$$
\int_E(\alpha f+\beta g)\,dm=\alpha\int_E f\,dm+\beta\int_E g\,dm .
$$

</div>

**证明** 先证 $$\alpha=1,\beta=1$$ 的情形（$$\alpha,\beta\ne1$$ 时由（1）的数乘性质与 $$c\varphi$$ 的简单性立得）.

取简单可测 $$0\le\varphi_j\le f$$，$$\varphi_j\uparrow f$$；$$0\le\psi_j\le g$$，$$\psi_j\uparrow g$$（定理 3.1）. 则 $$\varphi_j+\psi_j\uparrow f+g$$，由 MCT 与简单函数积分的可加性：

$$
\int_E(f+g)\,dm=\lim_{j\to\infty}\int_E(\varphi_j+\psi_j)\,dm
=\lim_{j\to\infty}\Big(\int_E\varphi_j\,dm+\int_E\psi_j\,dm\Big)
=\int_E f\,dm+\int_E g\,dm .
$$

$$\square$$

<div class="theorem">

**定理 4.3（逐项积分定理（非负））**

设 $$h_j\ge0$$ 可测、几乎处处有限，则

$$
\int_E\sum_{j=1}^{\infty}h_j\,dm=\sum_{j=1}^{\infty}\int_E h_j\,dm .
$$

</div>

**证明** 由归纳法（线性性），$$\displaystyle\int_E\sum_{j=1}^{N}h_j\,dm
=\sum_{j=1}^{N}\int_E h_j\,dm$$. 令 $$f_N:=\sum_{j=1}^{N}h_j\uparrow\sum_{j\ge1}h_j$$，由 MCT 令 $$N\to+\infty$$：

$$
\int_E\sum_{j=1}^{\infty}h_j\,dm
=\lim_{N\to\infty}\int_E f_N\,dm
=\lim_{N\to\infty}\sum_{j=1}^{N}\int_E h_j\,dm
=\sum_{j=1}^{\infty}\int_E h_j\,dm.
$$

$$\square$$

<div class="proposition">

**命题 4.4（积分零 $$\iff$$ 几乎处处为零）**

设 $$f$$ 非负可测，则 $$\displaystyle\int_E f\,dm=0\iff f=0$$，a.e. $$x\in E$$.

</div>

**证明** “$$\Leftarrow$$”：设 $$m\{f>0\}=0$$，即存在 $$E'\subseteq E$$，$$m(E\setminus E')=0$$，$$f(x)=0\ \forall x\in E'$$. 对任意简单 $$0\le\varphi=\sum_{j=1}^{n}a_j1_{A_j}\le f$$：在 $$E'$$ 上 $$\varphi\le f=0$$，故 $$E'\cap A_j=\varnothing$$（$$a_j>0$$ 时），即 $$A_j\subseteq E\setminus E'$$，$$mA_j=0$$；于是

$$
\int_E\varphi\,dm=\sum_j a_j\,mA_j=0,\qquad\forall\ 0\le\varphi\le f,
\quad\Longrightarrow\quad\int_E f\,dm=0 .
$$

“$$\Rightarrow$$”：反设 $$m\{x\in E:\ f(x)>0\}>0$$. 由 $$\{f>0\}=\bigcup_{k\ge1}\{f>\frac1k\}$$，存在 $$k$$ 使

$$
m\Big\{x\in E:\ f(x)>\frac1k\Big\}>0 .
$$

令 $$A_k=\{x\in E:\ f(x)>\frac1k\}$$，$$\varphi=\frac1k\cdot1_{A_k}$$ 为非负可测简单函数，$$\varphi\le f$$，则

$$
\int_E f\,dm\ge\int_E\varphi\,dm=\frac1k\,mA_k>0,
$$

矛盾. $$\square$$

<div class="theorem">

**定理 4.4（Fatou 引理）**

设 $$f_j\ge0$$ 可测，则

$$
\int_E\ \underline{\lim} f_j\,dm\ \le\ \underline{\lim}\int_E f_j\,dm .
$$

</div>

**证明** 记 $$g_k:=\inf_{j\ge k}f_j$$，则 $$g_k\ge0$$ 可测且 $$g_k\uparrow\underline{\lim} f_j$$（$$\underline{\lim} f_j(x)=\lim_{k\to\infty}\inf_{j\ge k}f_j(x)$$）. 由 MCT 与 $$g_k\le f_j$$（$$j\ge k$$）：

$$
\int_E\ \underline{\lim} f_j\,dm
=\int_E\lim_{k\to\infty}\inf_{j\ge k}f_j\,dm
\overset{\text{MCT}}{=}\lim_{k\to\infty}\int_E\inf_{j\ge k}f_j\,dm
=\underline{\lim}_k\int_E\inf_{j\ge k}f_j\,dm
\le\underline{\lim}_k\int_E f_k\,dm .
$$

$$\square$$

**注** 与 MCT 的下方图像直观平行：$$G_{\underline{\lim} f_j}=\underline{\lim} G_{f_j}$$（下极限下方图像），故直观上

$$
\text{LHS}=m\big(\underline{\lim} G_{f_j}\big)\le\underline{\lim} m(G_{f_j})=\text{RHS},
$$

但严格论证仍需 Fatou 引理本身的证明，此处仅作直观.

## 4.2 广义实值可测函数积分

<div class="definition">

**定义 4.3（一般可测函数的积分）**

设 $$f:E\to\overline{\mathbb{R}}$$ 可测，$$f=f_+-f_-$$，其中

$$
f_+:=\max\{f,0\},\qquad f_-:=\max\{-f,0\}.
$$

若 $$f_+,f_-$$ 至少有一个可积，则定义

$$
\int_E f\,dm=\int_E f_+\,dm-\int_E f_-\,dm ;
$$

若 $$f_+$$ 与 $$f_-$$ 均可积，则称 $$f$$ **可积**.

</div>

<div class="proposition">

**命题 4.5（可积 $$\iff$$ 绝对可积）**

注意到 $$|f|=f_+ + f_-$$，则

$$
\int_E f\,dm<\infty\ \text{（即}\ f\ \text{可积）}
\iff \int_E|f|\,dm<\infty .
$$

</div>

**证明** $$\int_E f\,dm$$ 有限要求 $$\int_E f_+\,dm$$ 与 $$\int_E f_-\,dm$$ 均有限，即 $$\int_E(f_+ + f_-)\,dm=\int_E|f|\,dm<\infty$$（线性性）；反之显然. $$\square$$

<div class="theorem">

**定理 4.5（控制收敛定理（pointwise 版））**

设 $$f_j$$ 可测，$$g\ge0$$ 可积，$$f_j\to f$$ pointwise，$$|f_j|\le g$$，则

$$
\lim_{j\to\infty}\int_E f_j\,dm=\int_E f\,dm .
$$

</div>

**证明** $$f=\lim_{j\to\infty}f_j$$ 可测；$$|f_j|\le g\Rightarrow|f|\le g$$（取极限），故 $$f$$ 可积（命题 4.5 与 $$f\le|f|\le g$$，$$\int_E f\,dm\ge-\int_E|f|\,dm>-\infty$$）.

考虑 $$g-f_j\ge0$$，由 Fatou 引理：

$$
\int_E\ \underline{\lim}(g-f_j)\,dm\ \le\ \underline{\lim}\int_E(g-f_j)\,dm .
$$

逐点 $$\underline{\lim}(g-f_j)=g-f$$（$$f_j\to f$$），而 $$\underline{\lim}\int_E(g-f_j)\,dm$$ $$=\int_E g\,dm-\overline{\lim}\int_E f_j\,dm$$（常数列与 liminf 的关系），故

$$
\int_E(g-f)\,dm\le\int_E g\,dm-\overline{\lim}\int_E f_j\,dm
\quad\Longrightarrow\quad
\int_E f\,dm\ \ge\ \overline{\lim}\int_E f_j\,dm .
$$

考虑 $$g+f_j\ge0$$，由 Fatou 引理：

$$
\int_E(g+f)\,dm\le\underline{\lim}\int_E(g+f_j)\,dm
=\int_E g\,dm+\underline{\lim}\int_E f_j\,dm
\quad\Longrightarrow\quad
\int_E f\,dm\ \le\ \underline{\lim}\int_E f_j\,dm .
$$

两式夹逼：$$\overline{\lim}\int_E f_j\,dm\le\int_E f\,dm\le\underline{\lim}\int_E f_j\,dm$$，故 $$\lim_j\int_E f_j\,dm$$ 存在且等于 $$\int_E f\,dm$$. $$\square$$

**笔记** MCT、Fatou 引理及 Lebesgue 控制收敛定理中的 pointwise 均可改为 a.e.（把例外零测集从积分区域中挖去即可，因零测集上积分为零）.

<div class="example">

**例题 4.1（Fatou 引理的 a.e. 版本）**

设 $$f_j\ge0$$ a.e.，则 $$\displaystyle\int_E\ \underline{\lim} f_j\,dm\le\underline{\lim}\int_E f_j\,dm$$.

</div>

**证明** 令 $$Z_j=\{x\in E:\ f_j(x)<0\}$$，$$m(Z_j)=0$$；令 $$\widehat{E}=E\setminus\bigcup_j Z_j$$，则 $$m(E\setminus\widehat{E})=0$$. 在 $$\widehat{E}$$ 上诸 $$f_j\ge0$$ 处处成立，用 Fatou 引理（pointwise 版）：

$$
\underline{\lim}_{j\to\infty}\int_E f_j\,dm
=\underline{\lim}_{j\to\infty}\int_{\widehat{E}}f_j\,dm
\ge\int_{\widehat{E}}\ \underline{\lim}_{j\to\infty}f_j\,dm
=\int_E\ \underline{\lim}_{j\to\infty}f_j\,dm.
$$

$$\square$$

<div class="theorem">

**定理 4.6（逐项积分定理（一般））**

设 $$f_j:E\to\overline{\mathbb{R}}$$ 可测，$$g=\sum_{j=1}^{\infty}|f_j|$$ 可积，则

$$
\int_E\sum_{j=1}^{\infty}f_j\,dm=\sum_{j=1}^{\infty}\int_E f_j\,dm .
$$

</div>

**证明** 部分和 $$S_N=\sum_{j=1}^{N}f_j$$，由线性性 $$\int_E S_N\,dm=\sum_{j=1}^{N}\int_E f_j\,dm$$；且

$$
|S_N|=\Big|\sum_{j=1}^{N}f_j\Big|\le\sum_{j=1}^{N}|f_j|\le g .
$$

由 $$g$$ 可积知 $$g(x)<\infty$$ a.e. $$x\in E$$，则 $$\sum_{j=1}^{N}|f_j(x)|$$ 收敛（当 $$N\to\infty$$）$$\Rightarrow$$ $$\sum_{j=1}^{N}f_j(x)$$ 收敛，即 $$S_N$$ 收敛 a.e.，且 $$S_N\to\sum_{j\ge1}f_j$$ a.e. 由控制收敛定理（控制函数 $$g$$）：

$$
\int_E\sum_{j=1}^{\infty}f_j\,dm=\lim_{N\to\infty}\int_E S_N\,dm
=\lim_{N\to\infty}\sum_{j=1}^{N}\int_E f_j\,dm
=\sum_{j=1}^{\infty}\int_E f_j\,dm.
$$

$$\square$$

## 4.3 DCT 的若干讨论

<div class="theorem">

**定理 4.7（Lebesgue 控制收敛定理（DCT, a.e. 版））**

设 $$f_j$$ 可测，$$g\ge0$$ 可积，$$f_j\to f$$ a.e.，$$|f_j|\le g$$，则

$$
\lim_{j\to\infty}\int_E f_j\,dm=\int_E f\,dm .
$$

</div>

**证明** 把 $$f_j\to f$$ a.e. 的例外零测集并入定义域修改诸函数的取值（或如例 4.1 直接挖去），化归为 pointwise 版本（定理 4.5）. $$\square$$

<div class="example">

**例题 4.2（无控制函数的可积收敛列）**

$$f_k(x)=1_{(k,\,k+1/k)}$$，则 $$f_k\to0$$ pointwise，$$\int f_k\,dm\to0$$. 但并不存在可积的控制函数：区间族 $$\{(k,k+1/k)\}$$ 两两不交，任何 $$g\ge|f_k|$$（a.e.）满足 $$g\ge1$$ 于每个 $$(k,k+1/k)$$（a.e.），故

$$
\int_{\mathbb{R}}g\,dm\ge\sum_{k\ge1}m\big((k,k+1/k)\big)=\sum_{k\ge1}\frac1k=+\infty .
$$

据此可知原版定理条件（存在可积控制函数）过强，只是充分条件.

</div>

<div class="proposition">

**命题 4.6（DCT，渐近控制版）**

设 $$f_k$$ 可测，$$f_k\to f$$ a.e.，且存在可积 $$g_k,g$$，s.t.

$$
|f_k|\le g_k\ \text{a.e.}\quad\text{且}\quad
\int_E|g_k-g|\,dm\to0\ \ (k\to\infty),
$$

则 $$f$$ 可积，且 $$\displaystyle\lim_{k\to\infty}\int_E f_k\,dm=\int_E f\,dm$$.

</div>

**证明** **Step 1.** 设 $$f_k\ge0$$（恒成立，不只是 a.e.），则 $$f$$ 非负可积：

$$
0\le\int_E f\,dm\le\underline{\lim}_k\int_E f_k\,dm\le\underline{\lim}_k\int_E g_k\,dm\le\int_E g\,dm<\infty
$$

（第一、三个不等号用 Fatou 引理；最后一步：$$\big|\int g_k-\int g\big|
\le\int|g_k-g|\to0$$，故 $$\int g_k\to\int g$$）. 故 $$f$$ 可积.

$$(g-f_k)_+\le g_+=g$$，又 $$(g-f_k)_+\to(g-f)_+$$ a.e.，被积函数受 $$g$$ 控制，由 DCT（定理 4.7）：

$$
\int_E(g-f_k)_+\,dm\to\int_E(g-f)_+\,dm .
$$

另一方面，$$0\le f_k\le g_k\Rightarrow g-f_k\ge g-g_k$$，故

$$
(g-f_k)_-\le(g-g_k)_-\le|g-g_k|
\quad\Longrightarrow\quad
\int_E(g-f_k)_-\,dm\to0
\quad(\le\textstyle\int_E|g-g_k|dm\to0).
$$

于是

$$
\begin{aligned}
\int_E(g-f_k)\,dm&=\int_E(g-f_k)_+\,dm\\
&\quad+\int_E(g-f_k)_-\,dm\\
&\xrightarrow[k\to\infty]{}\int_E(g-f)\,dm,\qquad\text{(4.1)}
\end{aligned}
$$

其中左端 $$=\int_E g\,dm-\int_E f_k\,dm$$、右端 $$=\int_E g\,dm-\int_E f\,dm$$（线性性，各积分有限），消去 $$\int_E g\,dm$$ 即得 $$\int_E f_k\,dm\to\int_E f\,dm$$.

**Step 2.** 一般情形：分别对 $$f_{k,+}$$ 及 $$f_{k,-}$$ 用 Step 1（$$0\le f_{k,\pm}\le g_k$$ a.e.，$$f_{k,\pm}\to f_\pm$$ a.e.），得

$$
\int_E f_k\,dm=\int_E f_{k,+}\,dm-\int_E f_{k,-}\,dm
\to\int_E f_+\,dm-\int_E f_-\,dm=\int_E f\,dm.
$$

$$\square$$

<div class="definition">

**定义 4.4（$$L^1$$ 空间与范数）**

定义

$$
L(E):=\{\text{integrable}\ f:\ E\to\overline{\mathbb{R}}\}
\qquad(\text{即}\ \int_E|f|\,dm<\infty\ \text{的可测函数类，取实值代表}),
$$

$$
\|f\|_1:=\int_E|f|\,dm
\qquad\text{为}\ f\ \text{的}\ L^1\text{-norm}.
$$

称 $$f_k$$ 依 $$L^1$$-norm 收敛于 $$f$$，若 $$\|f_k-f\|_1\to0$$.

</div>

<div class="lemma">

**引理 4.1（范数有界 a.e. 收敛的衍推）**

设 $$\|f_k\|_1<C$$，且 $$f_k\to f$$ a.e.，则

$$
\lim_{k\to\infty}\big(\|f_k-f\|_1+\|f\|_1-\|f_k\|_1\big)=0 .
$$

</div>

**证明** 由 Fatou 引理，

$$
\int_E|f|\,dm\le\underline{\lim}_k\int_E|f_k|\,dm\le C
\quad\Longrightarrow\quad
f\ \text{可积}.
$$

考虑非负可测函数

$$
w_k:=|f_k|+|f|-|f_k-f|\ \ge0
\qquad(\text{反三角不等式}\ |f_k-f|\le|f_k|+|f|).
$$

逐点地，$$f_k(x)\to f(x)$$ a.e. 使 $$|f_k(x)|\to|f(x)|$$、$$|f_k(x)-f(x)|\to0$$，故

$$
\underline{\lim}_k w_k(x)=|f(x)|+|f(x)|-0=2|f(x)|\qquad\text{a.e.}
$$

由 Fatou 引理：

$$
2\|f\|_1=\int_E 2|f|\,dm\le\underline{\lim}_k\int_E w_k\,dm
=\underline{\lim}_k\big(\|f_k\|_1+\|f\|_1-\|f_k-f\|_1\big).
$$

由 $$\underline{\lim}(a_k+b-c_k)\ge\underline{\lim} a_k+b-\overline{\lim} c_k$$：

$$
2\|f\|_1\le\underline{\lim}_k\|f_k\|_1+\|f\|_1-\overline{\lim}_k\|f_k-f\|_1
\quad\Longrightarrow\quad
\overline{\lim}_k\|f_k-f\|_1\le\underline{\lim}_k\|f_k\|_1-\|f\|_1 .
$$

记 $$H_k:=\|f_k-f\|_1+\|f\|_1-\|f_k\|_1\ge0$$（三角不等式 $$\|f\|_1\le\|f_k\|_1+\|f_k-f\|_1$$）. 则

$$
\begin{aligned}
\overline{\lim}_k H_k&\ge 0,\\
\overline{\lim}_k H_k&\le \overline{\lim}_k\|f_k-f\|_1+\|f\|_1\\
&\quad-\underline{\lim}_k\|f_k\|_1\\
&\le 0,
\end{aligned}
$$

（$$\overline{\lim}_k\|f_k-f\|_1\le\overline{\lim}_k\|f_k-f\|_1$$ $$\le\underline{\lim}_k\|f_k\|_1-\|f\|_1$$）. 故 $$\overline{\lim}_k H_k=0$$，从而 $$\lim_k H_k=0$$. $$\square$$

<div class="proposition">

**命题 4.7（$$L^1$$ 收敛与范数收敛的等价）**

设 $$f_k,f\in L^1(E)$$，$$f_k\to f$$ a.e.，则

$$
\|f_k-f\|_1\to0\iff\|f_k\|_1\to\|f\|_1 .
$$

</div>

**证明** “$$\Rightarrow$$”：

$$
\Big|\int_E|f_k|\,dm-\int_E|f|\,dm\Big|
\le\int_E\big||f_k|-|f|\big|\,dm\le\int_E|f_k-f|\,dm
=\|f_k-f\|_1\to0 .
$$

“$$\Leftarrow$$”：$$\lim_k\int_E|f_k|\,dm=\int_E|f|\,dm<+\infty$$ $$\Rightarrow$$ $$\exists C$$，s.t. $$\int_E|f_k|\,dm<C$$ 对一切 $$k$$（收敛列必有界）. 由引理 4.1：

$$
\int_E|f_k-f|\,dm
=\underbrace{\int_E\big(|f-f_k|+\|f\|_1-\|f_k\|_1\big)\,dm}_{\to\ 0}
+\underbrace{\int_E\big(\|f_k\|_1-\|f\|_1\big)\,dm}_{=\ \|f_k\|_1-\|f\|_1\to\ 0}
\to0,
$$

即 $$\|f_k-f\|_1\to0$$. $$\square$$

<div class="lemma">

**引理 4.2（$$L^1$$ 收敛 $$\Rightarrow$$ 依测度收敛）**

依 $$L^1$$ 收敛 $$\Rightarrow$$ 依测度收敛.

</div>

**证明** $$\|g_k-g\|_1\to0$$ 即 $$\int_E|g_k-g|\,dm\to0$$. $$\forall\delta>0$$，

$$
\int_E|g_k-g|\,dm
\ge\int_{\{|g_k-g|>\delta\}}|g_k-g|\,dm
\ge\delta\cdot m\{|g_k-g|>\delta\}
\quad\Longrightarrow\quad
m\{|g_k-g|>\delta\}\to0.
$$

$$\square$$

<div class="theorem">

**定理 4.8（DCT，完整版）**

设 $$f_k\in L(E)$$，$$f_k\to f$$ a.e.，则以下叙述等价：

- **(1)** $$\|f_k-f\|_1\to0$$，$$k\to\infty$$；
- **(2)** $$f\in L(E)$$，且 $$\|f_k\|_1\to\|f\|_1$$；
- **(3)** 存在 $$g_k,g\in L(E)$$，s.t. $$|f_k|\le g_k$$ a.e. 且 $$\|g_k-g\|_1\to0$$.

且 (1)(2)(3) 蕴含 (4)：$$f\in L(E)$$，$$\displaystyle\int_E f_k\,dm\to\int_E f\,dm$$.

</div>

**证明** (1)$$\iff$$(2)：由命题 4.7 即得.

(3)$$\Rightarrow$$(2)：对序列 $$|f_k|$$（$$|f_k|\to|f|$$ a.e.，$$|f_k|\le g_k$$，$$\int_E|g_k-g|\,dm\to0$$）用渐近控制版 DCT（命题 4.6）得 $$|f|\in L(E)$$ 且

$$
\|f_k\|_1=\int_E|f_k|\,dm\to\int_E|f|\,dm=\|f\|_1 ;
$$

同时对该命题直接用于 $$f_k$$ 得 $$f\in L(E)$$ 且 $$\int_E f_k\,dm\to\int_E f\,dm$$，即 (4) 亦成立.

(1)(2)$$\Rightarrow$$(3)：令 $$g_k=|f_k|$$，$$g=|f|$$，则 $$|f_k|\le g_k$$ 且

$$
\|g_k-g\|_1=\int_E\big||f_k|-|f|\big|\,dm
\le\|f_k-f\|_1\to0\qquad(k\to\infty).
$$

$$\square$$

<div class="theorem">

**定理 4.9（积分的绝对连续性）**

设 $$f\in L^1(E)$$，则 $$\forall\varepsilon>0$$，$$\exists\delta>0$$，s.t. $$\forall A\subseteq E$$ 可测，当 $$mA<\delta$$ 时，

$$
\Big|\int_A f\,dm\Big|<\varepsilon
\qquad(\text{实际上}\ \int_A|f|\,dm<\varepsilon).
$$

</div>

**证明** 对 $$|f|$$ 证明后，由 $$|\int_A f\,dm|\le\int_A|f|\,dm$$ 即得，故不妨设 $$f\ge0$$.

取简单可测 $$\varphi_k\uparrow f$$，$$\int_A\varphi_k\,dm\to\int_A f\,dm$$（MCT，对任意 $$A$$）. 取简单可测 $$0\le\varphi\le f$$，s.t.

$$
\int_E(f-\varphi)\,dm<\frac\varepsilon2
\quad\Longrightarrow\quad
\int_A(f-\varphi)\,dm\le\int_E(f-\varphi)\,dm<\frac\varepsilon2 .
$$

设 $$M=\max_{x\in E}\varphi(x)<\infty$$（$$\varphi$$ 简单；若 $$M=0$$ 则 $$\varphi\equiv0$$，$$\int_A f\,dm=\int_A(f-\varphi)\,dm<\frac\varepsilon2<\varepsilon$$ 已成立）. 取 $$\delta=\dfrac{\varepsilon}{2M}$$，则 $$\forall A\subseteq E$$，$$mA<\delta$$：

$$
\int_A\varphi\,dm\le M\cdot mA< M\delta=\frac\varepsilon2,
$$

于是

$$
\int_A f\,dm=\int_A\varphi\,dm+\int_A(f-\varphi)\,dm
<\frac\varepsilon2+\frac\varepsilon2=\varepsilon.
$$

$$\square$$

<div class="theorem">

**定理 4.10（DCT，依测度版）**

设 $$f_k\in L(E)$$，$$f_k\to f$$ in measure，存在 $$g\in L(E)$$，s.t. $$|f_k|\le g$$ a.e. 则

$$
\int_E f_k\,dm\to\int_E f\,dm .
$$

</div>

**证明** 先证 $$f\in L(E)$$：由 Riesz 定理（第 3 章定理 3.6），存在子列 $$f_{k_i}\to f$$ a.e.，由 Fatou 引理，

$$
\int_E|f|\,dm\le\underline{\lim}_{k_i}\int_E|f_{k_i}|\,dm\le\int_E|g|\,dm<\infty,
$$

故 $$f\in L(E)$$.

不妨设 $$f_k\ge0$$（对 $$\pm f_k$$ 分别论证再合并，或对 $$|f_k-f|$$ 论证）. $$\forall\delta>0$$，$$m\{|f_k-f|>\delta\}\to0$$. 断言：$$\|f_k-f\|_1\to0$$，从而 $$|\int_E f_k\,dm-\int_E f\,dm|
\le\|f_k-f\|_1\to0$$.

$$\forall\varepsilon>0$$，将积分按集合分三块估计：

$$
\int_E|f_k-f|\,dm
=\int_{E\cap B_N^c}|f_k-f|\,dm
+\int_{E\cap B_N\cap\{|f_k-f|\le\delta\}}|f_k-f|\,dm
+\int_{E\cap B_N\cap\{|f_k-f|>\delta\}}|f_k-f|\,dm .
$$

- 第一块：$$|f_k-f|\le|f_k|+|f|\le2g$$，由 $$g\in L(E)$$ 的绝对连续性（定理 4.9），存在 $$N$$ 使

    $$
    \int_{E\cap B_N^c}|f_k-f|\,dm\le 2\int_{E\cap B_N^c}g\,dm<\varepsilon ;
    $$

- 第二块：$$|f_k-f|\le\delta$$，故 $$\displaystyle\int_{E\cap B_N\cap\{|f_k-f|\le\delta\}}|f_k-f|\,dm
    \le\delta\,m(B_N)$$，取 $$\delta<\dfrac{\varepsilon}{2m(B_N)+1}$$ 得 $$<\varepsilon$$；
- 第三块：$$|f_k-f|\le2g$$，由绝对连续性，存在 $$\eta>0$$ 使 $$mA<\eta\Rightarrow\int_A2g\,dm<\varepsilon$$；而 $$m\{|f_k-f|>\delta\}\to0$$，故对充分大的 $$k$$，$$m\big(E\cap\{|f_k-f|>\delta\}\big)<\eta$$，从而该块积分 $$<\varepsilon$$.

综上 $$\|f_k-f\|_1\le3\varepsilon$$ 对充分大的 $$k$$ 成立，即 $$\|f_k-f\|_1\to0$$. $$\square$$

**证明**（定理 4.10 的另证） 由 Riesz 定理，存在子列 $$f_{k_i}\to f$$ a.e.，则 $$f\in L(E)$$ 且（对该子列用 a.e. 版 DCT，控制函数 $$g$$）

$$
\int_E|f_{k_i}|\,dm\to\int_E|f|\,dm .
$$

下证 $$\displaystyle\overline{\lim}_k\int_E|f_k|\,dm\le\int_E|f|\,dm$$ $$\le\underline{\lim}_k\int_E|f_k|\,dm$$，从而 $$\int_E|f_k|\,dm\to\int_E|f|\,dm$$.

反设 $$\displaystyle\overline{\lim}_k\int_E|f_k|\,dm>\int_E|f|\,dm+2\delta$$，则存在子列 $$\{f_{k_j}\}$$，s.t. $$\int_E|f_{k_j}|\,dm>\int_E|f|\,dm+\delta$$ 对一切 $$j$$. 由 Riesz 定理，存在子子列 $$f_{k_{j_i}}\to f$$ a.e.，于是（对该子子列用 a.e. 版 DCT）

$$
\int_E|f_{k_{j_i}}|\,dm\to\int_E|f|\,dm
\quad\Longrightarrow\quad
\int_E|f|\,dm\ge\int_E|f|\,dm+\delta ,
$$

矛盾. 另一边（$$\underline{\lim}$$）同理. 从而立即有

$$
\int_E|f|\,dm=\lim_k\int_E|f_k|\,dm .
$$

最后，对 $$f_{k,+},f_{k,-}$$（均受 $$g$$ 控制、均依测度收敛于 $$f_\pm$$）重复上述论证，得

$$
\int_E f_k\,dm=\int_E f_{k,+}\,dm-\int_E f_{k,-}\,dm
\to\int_E f_+\,dm-\int_E f_-\,dm=\int_E f\,dm.
$$

$$\square$$

<div class="proposition">

**命题 4.8（积分的尾部可控性）**

设 $$f\in L(E)$$，则 $$\forall\varepsilon>0$$，存在有界可测集 $$B$$，s.t.

$$
\int_{E\setminus B}|f|\,dm<\varepsilon .
$$

</div>

**证明** 取 $$f\cdot1_{E\cap B_k}\uparrow f$$（$$k\to\infty$$），由 MCT 即有

$$
\lim_{k\to\infty}\int_E f\cdot1_{E\cap B_k}\,dm=\int_E f\,dm<\infty,
$$

从而

$$
\lim_{k\to\infty}\int_{E\setminus B_k}|f|\,dm
=\int_E|f|\,dm-\lim_k\int_{E\cap B_k}|f|\,dm=0,
$$

取 $$B=B_k$$（$$k$$ 充分大，$$B_k$$ 有界）即可得证. $$\square$$

<div class="proposition">

**命题 4.9（积分号下求导）**

设 $$f:E\times(a,b)\to\mathbb{R}$$ 关于 $$x\mapsto f(x,y)$$ 可积，$$y\mapsto f(x,y)$$ 可导. 若存在 $$F\in L(E)$$，s.t. $$\big|\frac{\partial}{\partial y}f(x,y)\big|\le F(x)$$（对所有 $$(x,y)\in E\times(a,b)$$），则

$$
\frac{\partial}{\partial y}\int_E f(x,y)\,dx
=\int_E\frac{\partial}{\partial y}f(x,y)\,dx .
$$

</div>

**证明** $$\forall y\in(a,b)$$，$$h_k\to0$$，由中值定理（对 $$y$$ 求导）：

$$
\lim_{k\to\infty}\frac{f(x,y+h_k)-f(x,y)}{h_k}
=\frac{\partial}{\partial y}f(x,y),
$$

且

$$
\Big|\frac{f(x,y+h_k)-f(x,y)}{h_k}\Big|
=\Big|\frac{\partial}{\partial y}f(x,\,y+\theta_k h_k)\Big|
\le F(x)
\qquad(\theta_k\in(0,1)).
$$

由 DCT 即有

$$
\int_E\lim_{k\to\infty}\frac{f(x,y+h_k)-f(x,y)}{h_k}\,dx
=\lim_{k\to\infty}\int_E\frac{f(x,y+h_k)-f(x,y)}{h_k}\,dx,
$$

即

$$
\int_E\frac{\partial}{\partial y}f(x,y)\,dx
=\frac{\partial}{\partial y}\int_E f(x,y)\,dx
\qquad(\text{右端由 Heine 定理：差商的极限即导数}).
$$

$$\square$$

## 4.4 $$L^1$$ 空间的若干讨论

<div class="proposition">

**命题 4.10（$$L^1$$ 中的稠密性）**

设 $$f\in L(E)$$，则 $$\forall\varepsilon>0$$，存在简单函数 $$\varphi\in L(E)$$、阶梯函数 $$\psi\in L(E)$$、紧支连续函数 $$g\in L(E)$$，s.t.

$$
\|f-\varphi\|_1<\varepsilon,\qquad
\|f-\psi\|_1<\varepsilon,\qquad
\|f-g\|_1<\varepsilon .
$$

</div>

**证明** （1）存在简单函数列 $$\varphi_k\to f$$ a.e. 且 $$|\varphi_k|\le|f|$$（对 $$f_\pm$$ 分别用简单逼近并截断），从而 $$|\varphi_k-f|\le2|f|\in L(E)$$，由 DCT 即有 $$\|\varphi_k-f\|_1\to0$$；取 $$\varphi=\varphi_k$$（$$k$$ 充分大）.

（2）不妨 $$\|\varphi_k-f\|_1<\frac\varepsilon2$$，$$\varphi_k=\sum_{j=1}^{N}a_j1_{A_j}$$（$$a_j\ne0$$）. 其中

$$
mA_j\le\frac{1}{|a_j|}\int_E|\varphi_k|\,dm<\infty ,
$$

由 Littlewood 原则 3（命题 3.21），存在有限个方体之并 $$B_j$$，s.t. $$m(A_j\triangle B_j)<\varepsilon'$$，$$\forall j$$. 令 $$\psi_k=\sum_{j=1}^{N}a_j1_{B_j}$$，则 $$\psi_k$$ 是阶梯函数，且

$$
\|\varphi_k-\psi_k\|_1\le\sum_{j=1}^{N}|a_j|\cdot\|1_{A_j}-1_{B_j}\|_1
=\sum_{j=1}^{N}|a_j|\cdot m(A_j\triangle B_j)
<\varepsilon'\sum_{j=1}^{N}|a_j| .
$$

取适当 $$\varepsilon'$$ 即有

$$
\|\psi_k-f\|_1\le\|\psi_k-\varphi_k\|_1+\|\varphi_k-f\|_1<\varepsilon .
$$

（3）由 Lusin 定理与 Tietze 延拓：$$\forall\varepsilon''>0$$，存在连续 $$g$$（可取紧支：再把 $$g$$ 乘以一个在充分大方体上恒为 $$1$$ 的紧支连续单位函数），s.t.

$$
m\{g\ne\psi\}<\varepsilon''
\qquad\text{且}\qquad
|g|\le|\psi|\le M\quad(\text{延拓保持值域}).
$$

则

$$
\int_E|g-\psi|\,dm=\int_{\{g\ne\psi\}}|g-\psi|\,dm\le2M\varepsilon'' .
$$

适当取 $$\varepsilon''$$ 即可. $$\square$$

<div class="proposition">

**命题 4.11（平均连续性）**

设 $$f\in L(\mathbb{R}^n)$$，则

$$
\lim_{h\to0}\int_{\mathbb{R}^n}|f(x+h)-f(x)|\,dx=0 .
$$

</div>

**证明** $$\forall\varepsilon>0$$，取紧支连续 $$g$$，s.t. $$\|f-g\|_1<\varepsilon$$. $$g$$ 紧支连续 $$\Rightarrow$$ 一致连续，则 $$\exists\delta$$，s.t. $$\forall|h|<\delta$$：

$$
|g(x+h)-g(x)|<\varepsilon' .
$$

则（$$g$$ 的支集 $$S$$ 为紧集，其 $$\delta$$-邻域 $$S_\delta$$ 测度有限）

$$
\int_{\mathbb{R}^n}|g(x+h)-g(x)|\,dx
=\int_{S_\delta}|g(x+h)-g(x)|\,dx
<\varepsilon'\cdot m(S_\delta) .
$$

注意平移不变性 $$\int_{\mathbb{R}^n}|f(x+h)-g(x+h)|\,dx$$ $$=\int_{\mathbb{R}^n}|f(y)-g(y)|\,dy=\|f-g\|_1$$，故由三角不等式：

$$
\int_{\mathbb{R}^n}|f(x+h)-f(x)|\,dx
\le\int_{\mathbb{R}^n}|f(x+h)-g(x+h)|\,dx
+\int_{\mathbb{R}^n}|g(x+h)-g(x)|\,dx
+\int_{\mathbb{R}^n}|g(x)-f(x)|\,dx
$$

$$
<\varepsilon+\varepsilon'm(S_\delta)+\varepsilon ,
$$

令 $$\varepsilon'\downarrow0$$（固定 $$\varepsilon$$ 与 $$\delta$$）再令 $$\varepsilon\downarrow0$$ 即已证毕. $$\square$$

<div class="theorem">

**定理 4.11（乘积积分的收敛）**

设 $$f,g,g_k\in L(E)$$，则附加以下任一条件，有 $$\int_E fg_k\to\int_E fg$$：

1. $$f$$ 有界且 $$g_k\xrightarrow{L^1}g$$；
2. $$g_k\rightrightarrows g$$（一致收敛）；
3. $$g$$ 有界，$$\{g_k\}$$ 一致有界（$$\exists M_g:\ |g_k|\le M_g$$），且 $$g_k\to g$$ 依测度.

</div>

**证明** （1）设 $$|f|\le M$$，则

$$
\Big|\int_E f(g_k-g)\,dm\Big|
\le M\int_E|g-g_k|\,dm=M\,\|g_k-g\|_1\to0 .
$$

（2）$$\displaystyle\Big|\int_E f(g_k-g)\,dm\Big|$$ $$\le\sup_{x\in E}|g_k(x)-g(x)|\cdot\int_E|f|\,dm\to0$$（$$\int_E|f|\,dm<\infty$$ 因 $$f\in L(E)$$）.

（3）$$\forall\varepsilon$$，取紧支连续 $$f_\varepsilon$$ s.t. $$\|f-f_\varepsilon\|_1<\varepsilon$$（稠密性命题）. 则

$$
\big\|fg-f_\varepsilon g\big\|_1
+\big\|f_\varepsilon g-f_\varepsilon g_k\big\|_1
+\big\|f_\varepsilon g_k-fg_k\big\|_1
$$

中：

- $$\|fg-f_\varepsilon g\|_1\le\|g\|_\infty\,\|f-f_\varepsilon\|_1
    \le M_g\varepsilon$$；
- $$\|f_\varepsilon g_k-fg_k\|_1\le M_g\|f_\varepsilon-f\|_1
    \le M_g\varepsilon$$；
- 中间项：$$f_\varepsilon$$ 紧支于 $$S$$（有限测度）且 $$|f_\varepsilon|\le\widetilde{M}(\varepsilon)$$，于 $$S$$ 上 $$|f_\varepsilon(g-g_k)|\le\widetilde{M}\cdot2M_g$$ 可积控制，且 $$g_k\to g$$ 依测度，由依测度版 DCT（定理 4.10）

    $$
    \int_E|f_\varepsilon g-f_\varepsilon g_k|\,dm
    \le\widetilde{M}\int_S|g-g_k|\,dm\to0 ;
    $$

从而 $$\big|\int_E f(g_k-g)\,dm\big|$$ $$\le(2M_g+\widetilde{M}\cdot o(1))\varepsilon\to0$$. $$\square$$

<div class="proposition">

**命题 4.12（紧支连续函数的正交性判据）**

设 $$f\in L(E)$$. 若对 $$\forall$$ 紧支连续 $$g$$，$$\int_E fg\,dm=0$$，则 $$f=0$$ a.e.

</div>

**证明** 设

$$
f'(x)=\begin{cases}
f(x), & |f(x)|\le1,\\
\operatorname{sgn} f(x), & |f(x)|>1,
\end{cases}
\qquad f'\in L(E),\ |f'|\le1 .
$$

由 $$L^1$$ 稠密性（命题 4.10(3)），存在紧支连续 $$g_k$$ 使 $$\|g_k-f'\|_1\to0$$ 且（截断到 $$[-1,1]$$）$$|g_k|\le1$$. 取子列 $$g_{k_i}\xrightarrow{\text{a.e.}}f'$$（$$L^1\Rightarrow$$ 依测度 $$\Rightarrow$$ Riesz 子列）.

又 $$\int_E fg_k\,dm=0$$，$$\forall k$$，故由控制收敛定理（$$|f g_{k_i}|\le|f|\in L(E)$$）：

$$
0=\lim_{i\to\infty}\int_E fg_{k_i}\,dm
=\int_E f\cdot f'\,dm
=\int_{\{|f|\le1\}}f^2\,dm+\int_{\{|f|>1\}}|f|\,dm .
$$

两项均非负，故均为零，从而 $$f=0$$ a.e. $$x\in E$$. $$\square$$

<div class="theorem">

**定理 4.12（Riemann–Lebesgue 型定理）**

设 $$f,g_k\in L([a,b])$$，$$g_k$$ 一致有界（$$|g_k|\le M_g$$）. 若存在 $$M$$，$$\forall c\in[a,b]$$，

$$
\int_{[a,c]}g_k\,dm\to M(c-a),
$$

则

$$
\int_{[a,b]}fg_k\,dm\to M\int_{[a,b]}f\,dm .
$$

</div>

**证明** $$\forall[\alpha,\beta]\subseteq[a,b]$$（$$\alpha<a$$ 时用 $$[a,\beta]$$，一般 $$\alpha>a$$）：

$$
\int_{[\alpha,\beta]}g_k\,dm
=\int_{[a,\beta]}g_k\,dm-\int_{[a,\alpha]}g_k\,dm
\to M(\beta-a)-M(\alpha-a)=M(\beta-\alpha)
$$

（单点 $$\{\alpha\}$$ 是零测集，不影响 $$L^1$$ 积分）.

设有阶梯函数 $$\psi=\sum_j c_j1_{[\alpha_j,\beta_j]}$$，则

$$
\int_{[a,b]}\psi g_k\,dm
=\sum_j c_j\int_{[\alpha_j,\beta_j]}g_k\,dm
\to M\sum_j c_j(\beta_j-\alpha_j)=M\int_{[a,b]}\psi\,dm .
$$

则对于 $$f\in L(E)$$，$$\forall\varepsilon>0$$，由阶梯函数在 $$L^1$$ 中的稠密性，存在阶梯函数 $$\psi_\varepsilon$$，s.t. $$\|\psi_\varepsilon-f\|_1<\varepsilon$$. 于是（$$k\to\infty$$ 取上极限）

$$
\begin{aligned}
\Big|\int_{[a,b]}fg_k\,dm-M\int_{[a,b]}f\,dm\Big|
&\le\int_{[a,b]}|f-\psi_\varepsilon|\cdot|g_k|\,dm
+\Big|\int_{[a,b]}\psi_\varepsilon g_k\,dm-M\int_{[a,b]}\psi_\varepsilon\,dm\Big|\\
&\qquad+M\cdot\|f-\psi_\varepsilon\|_1\\
&\le M_g\varepsilon+o(1)+M\varepsilon ,
\end{aligned}
$$

令 $$k\to\infty$$、$$\varepsilon\to0$$ 即已证毕. $$\square$$

## 4.5 Riemann 积分与 Lebesgue 积分的关系

设 $$f:[a,b]\to\mathbb{R}$$ 有界，任给分割 $$P$$，记其直径（最大子区间长度）为 $$|P|$$. 有相应的 Darboux 和 $$\overline{S}_Pf$$、$$\underline{S}_Pf$$. 取一列分割 $$P_i$$，s.t. $$|P_i|\to0$$，记

$$
\overline{\int}_a^b f(x)\,dx=\lim_{|P_i|\to0}\overline{S}_{P_i}f,
\qquad
\underline{\int}_a^b f(x)\,dx=\lim_{|P_i|\to0}\underline{S}_{P_i}f ,
$$

（有界函数的 Darboux 上、下和关于分割加细单调，且当 $$|P_i|\to0$$ 时极限存在、与分割列的选取无关.）则

$$
f\in R[a,b]\iff\overline{\int}_a^b f=\underline{\int}_a^b f .
$$

构造简单函数

$$
\overline{f}_P=\sum_i M_i\cdot1_{[t_{i-1},\,t_i]},\qquad
\underline{f}_P=\sum_i m_i\cdot1_{[t_{i-1},\,t_i]},
$$

其中 $$M_i=\sup_{[t_{i-1},t_i]}f$$，$$m_i=\inf_{[t_{i-1},t_i]}f$$. 在加细分割列 $$\{P_k\}$$ 中，$$\overline{f}_{P_k}\downarrow$$、$$\underline{f}_{P_k}\uparrow$$，且 $$\underline{f}_{P_k}\le f\le\overline{f}_{P_k}$$. 定义

$$
\overline{f}=\lim_{k\to\infty}\overline{f}_{P_k},\qquad
\underline{f}=\lim_{k\to\infty}\underline{f}_{P_k},
\qquad
\underline{f}\le f\le\overline{f} .
$$

<div class="theorem">

**定理 4.13（Riemann 可积的 Lebesgue 刻划）**

设 $$f:[a,b]\to\mathbb{R}$$ 有界，则

$$
f\ \text{几乎处处连续}\iff f\in R[a,b],
$$

且此时 $$f\in L[a,b]$$，且

$$
\int_{[a,b]}f\,dm=\int_a^b f\,dx .
$$

</div>

**证明** 记 $$f$$ 的上、下包络为

$$
f^*(x)=\lim_{\delta\to0^+}\sup_{(x-\delta,\,x+\delta)}f,
\qquad
f_*(x)=\lim_{\delta\to0^+}\inf_{(x-\delta,\,x+\delta)}f,
$$

（极限存在：$$\sup$$ 关于 $$\delta$$ 单调不减，$$\inf$$ 单调不增），则 $$f_*\le f\le f^*$$，且 $$x$$ 是 $$f$$ 的连续点 $$\iff f^*(x)=f_*(x)$$（即振幅为零）.

**断言：** $$f^*=\overline{f}$$，$$f_*=\underline{f}$$ a.e. 令 $$A=\{P_k\ \text{的分割点}\}$$，$$mA=0$$（可数集）. 下证 $$f^*(x)=\overline{f}(x)$$，$$\forall x\in[a,b]\setminus A$$. 记 $$I_k(x)=[t_{i-1}^{(k)},t_i^{(k)}]$$ 为 $$P_k$$ 中包含 $$x$$ 的闭区间（$$x\notin A$$ 保证 $$x$$ 是 $$I_k(x)$$ 的内点），记 $$\ell_k=|I_k(x)|\le|P_k|\to0$$，$$\eta_k=\operatorname{dist}\big(x,\partial I_k(x)\big)>0$$.

一方面，

$$
\overline{f}_{P_k}(x)=M^{(k)}(x)=\sup_{I_k(x)}f
\le\sup_{(x-\delta,\,x+\delta)}f
\qquad(\text{当}\ \ell_k<\delta\ \text{时，因}\ I_k(x)\subseteq(x-\delta,x+\delta)),
$$

令 $$k\to\infty$$ 再对 $$\delta$$ 取下确界：$$\overline{f}(x)\le f^*(x)$$.

另一方面，

$$
\overline{f}_{P_k}(x)=\sup_{I_k(x)}f
\ge\sup_{(x-\eta_k,\,x+\eta_k)}f
\xrightarrow[k\to\infty]{}f^*(x)
\qquad(\eta_k\to0,\ \eta_k\le\ell_k),
$$

故 $$f^*(x)\le\liminf_k\overline{f}_{P_k}(x)=\overline{f}(x)$$. 于是 $$f^*(x)=\overline{f}(x)$$，$$\forall x\in[a,b]\setminus A$$；同理 $$f_*(x)=\underline{f}(x)$$ a.e.

从而有

$$
\begin{aligned}
f\ \text{几乎处处连续}&\iff f^*=f_*\ \text{a.e.}\\
&\iff\overline{f}=f=\underline{f}\ \text{a.e.}\qquad(\ast)
\end{aligned}
$$

由 $$f^*,f_*$$ 可测（可测函数的极限）$$\Rightarrow f=f^*$$ a.e. 可测，又 $$f$$ 有界，故 $$f\in L[a,b]$$.

注意（$$\overline{f}_{P_k}\downarrow\overline{f}$$ 有界，对 $$-\overline{f}_{P_k}\uparrow-\overline{f}$$ 用 MCT，或直接用有界收敛）

$$
\int_{[a,b]}\overline{f}\,dm
=\lim_{k\to\infty}\int_{[a,b]}\overline{f}_{P_k}\,dm
=\lim_{k\to\infty}\sum_i M_i\Delta t_i
=\lim_{k\to\infty}\overline{S}_{P_k}f
=\overline{\int}_a^b f(x)\,dx,
$$

同理 $$\int_{[a,b]}\underline{f}\,dm=\underline{\int}_a^b f\,dx$$. 故

$$
(\ast)\iff\int_{[a,b]}\overline{f}\,dm=\int_{[a,b]}\underline{f}\,dm
\iff\overline{\int}_a^b f=\underline{\int}_a^b f
\iff f\in R[a,b].
$$

且此时 $$f=\overline{f}$$ a.e. 给出

$$
\int_{[a,b]}f\,dm=\int_{[a,b]}\overline{f}\,dm=\int_a^b f\,dx .
$$

$$\square$$

## 4.6 Fubini 定理

<div class="exercise">

**问题 4.1**

$$f:\mathbb{R}^{p+q}\to\mathbb{R}$$ 可积，何时有

$$
\int_{\mathbb{R}^{p+q}}f\,dm=\int_{\mathbb{R}^p}\Big(\int_{\mathbb{R}^q}f(x,y)\,dy\Big)dx\ ?
$$

</div>

<div class="definition">

**定义 4.5（Tonelli 条件与类 $$\mathscr{F}$$）**

设 $$f$$ 非负可测，称 $$f$$ 满足 **Tonelli 条件**，若

- **(1)** $$\mathbb{R}^q\ni y\mapsto f(x,y)$$ 非负可测，a.e. $$x\in\mathbb{R}^p$$；
- **(2)** $$\mathbb{R}^p\ni x\mapsto\int_{\mathbb{R}^q}f(x,y)\,dy$$ 非负可测；
- **(3)** $$\displaystyle\int_{\mathbb{R}^{p+q}}f(x,y)\,dm$$ $$=\int_{\mathbb{R}^p}\Big(\int_{\mathbb{R}^q}f(x,y)\,dy\Big)dx$$.

记满足上述 (1)(2)(3) 的 $$f\in L^+(\mathbb{R}^{p+q})$$ 构成集合 $$\mathscr{F}$$.

</div>

易知 $$\mathscr{F}\ne\varnothing$$：取方体 $$I_1\subseteq\mathbb{R}^p$$、$$I_2\subseteq\mathbb{R}^q$$，

$$
f(x,y)=1_{x\in I_1}\cdot1_{y\in I_2},
$$

则易验证 $$f\in\mathscr{F}$$（直接计算两侧积分均为 $$m(I_1)m(I_2)$$，且截面的可测性显然）.

<div class="theorem">

**定理 4.14（Tonelli 定理）**

$$\mathscr{F}=L^+(\mathbb{R}^{p+q})$$：每个非负可测函数都满足 Tonelli 条件.

</div>

<div class="theorem">

**断言 4.1（非负类的基本封闭性）**

- **(1)** $$f\in\mathscr{F}$$，$$c\in\mathbb{R}_+$$ $$\Rightarrow$$ $$cf\in\mathscr{F}$$；
- **(2)** $$f,g\in\mathscr{F}$$ $$\Rightarrow$$ $$f+g\in\mathscr{F}$$.

</div>

**证明** 逐条验证 (1)(2)(3)：截面可测性与可加性由可测函数与积分的运算律（a.e. 意义下）直接得到；(3) 用积分对 $$x$$、$$y$$ 的线性性（非负情形的逐项积分）拆开即可. $$\square$$

<div class="theorem">

**断言 4.2（可积被减项）**

$$f,g\in\mathscr{F}$$，$$f-g\ge0$$，$$g\in L^+(\mathbb{R}^{p+q})$$ 且 $$\int_{\mathbb{R}^{p+q}}g\,dm<\infty$$，则 $$f-g\in\mathscr{F}$$.

</div>

**证明** 记 $$h:=f-g\ge0$$. 由 $$\int g\,dm<\infty$$ 与 (3)（对 $$g$$）：

$$
\int_{\mathbb{R}^p}\Big(\int_{\mathbb{R}^q}g(x,y)\,dy\Big)dx=\int_{\mathbb{R}^{p+q}}g\,dm<\infty
\quad\Longrightarrow\quad
\int_{\mathbb{R}^q}g(x,y)\,dy<\infty\ \ \text{a.e.}\ x\in\mathbb{R}^p,
$$

故对 a.e. $$x$$，$$y\mapsto g(x,y)$$ 几乎处处有限，$$h(x,y)=f(x,y)-g(x,y)$$ 在 $$\{y:\ g(x,y)<\infty\}$$ 上良定义（其余例外集上任意赋值，不影响 a.e. 性质）.

验证 (1)：a.e. $$x$$，$$y\mapsto h(x,y)=f(x,y)-g(x,y)$$ 是可测函数之差，可测.

验证 (2)：对 a.e. $$x$$（$$\int g(x,\cdot)<\infty$$），

$$
\int_{\mathbb{R}^q}h(x,y)\,dy=\int_{\mathbb{R}^q}f(x,y)\,dy-\int_{\mathbb{R}^q}g(x,y)\,dy
$$

（非负可测函数积分的线性性，允许 $$+\infty$$），是可测函数之差，可测.

验证 (3)：由线性性（对非负可测函数普遍成立）：

$$
\int h\,dm+\int g\,dm=\int f\,dm
=\int_{\mathbb{R}^p}\Big(\int f\,dy\Big)dx
=\int_{\mathbb{R}^p}\Big(\int h\,dy+\int g\,dy\Big)dx
=\int_{\mathbb{R}^p}\Big(\int h\,dy\Big)dx+\int g\,dm ,
$$

由 $$\int g\,dm<\infty$$ 可从两侧消去，得 $$\int h\,dm=\int_{\mathbb{R}^p}\big(\int h\,dy\big)dx$$. $$\square$$

<div class="theorem">

**断言 4.3（递增极限）**

设 $$f_k\in\mathscr{F}$$，$$f_k\uparrow f$$，则 $$f\in\mathscr{F}$$.

</div>

**证明** By MCT. 验证 (1)(2)：a.e. $$x$$，

$$
\int_{\mathbb{R}^q}f(x,y)\,dy=\lim_{k\to\infty}\int_{\mathbb{R}^q}f_k(x,y)\,dy
$$

（$$y$$ 方向的 MCT：$$f_k(x,\cdot)\uparrow f(x,\cdot)$$ 可测），可测函数列的极限可测.

验证 (3)：

$$
\int_{\mathbb{R}^{p+q}}f\,dm
=\lim_{k\to\infty}\int_{\mathbb{R}^{p+q}}f_k\,dm
=\lim_{k\to\infty}\int_{\mathbb{R}^p}\Big(\int_{\mathbb{R}^q}f_k\,dy\Big)dx
=\int_{\mathbb{R}^p}\Big(\int_{\mathbb{R}^q}\lim_{k\to\infty}f_k\,dy\Big)dx
=\int_{\mathbb{R}^p}\Big(\int_{\mathbb{R}^q}f\,dy\Big)dx,
$$

（第二个等号：诸 $$f_k\in\mathscr{F}$$；第三个等号：对递增列 $$x\mapsto\int f_k\,dy$$ 用 $$x$$ 方向的 MCT.）即证. $$\square$$

<div class="theorem">

**断言 4.4（可测集的示性函数）**

设 $$E\subseteq\mathbb{R}^{p+q}$$ 可测，则 $$1_E\in\mathscr{F}$$.

</div>

**证明** **Step 1.** 设 $$G$$ 为开集，取两两不交的半开方体 $$\{I_j\}$$，s.t. $$G=\bigsqcup_{j\ge1}I_j$$，则 $$1_{\bigsqcup_{j=1}^{k}I_j}\uparrow1_G$$（单增），而每个 $$1_{\bigsqcup_{j=1}^{k}I_j}$$ 是有限个半开方体示性函数之和，且

$$
1_{I_1\times I_2}(x,y)=1_{I_1}(x)\cdot1_{I_2}(y)\in\mathscr{F}
\qquad(\text{直接验证}),
$$

由前面的封闭性 Claim 逐级上升，可知 $$1_G\in\mathscr{F}$$.

**Step 2.** 有界闭集 $$F$$：$$1_F\in\mathscr{F}$$. 设 $$F=G_1\setminus G_2$$，$$G_i$$ 是有界开集，$$G_2\subseteq G_1$$，则

$$
1_F=1_{G_1}-1_{G_2},
$$

其中 $$1_{G_2}$$ 可积（$$mG_2<\infty$$），由可积被减项 Claim 得 $$1_F\in\mathscr{F}$$.

**Step 4.** $$F_\sigma$$ 集 $$F=\bigcup_{k\ge1}F_k$$（$$F_k$$ 闭）：$$1_{\bigsqcup_{k=1}^{n}F_k}\uparrow1_F$$（把 $$\bigcup$$ 改写为不交并：$$F_1\sqcup(F_2\setminus F_1)\sqcup\cdots$$，每一块都是可测集与闭集之差、有界闭集之差亦可测），故 $$1_F\in\mathscr{F}$$.

**Step 5.** 有限测度 $$G_\delta$$ 集：设 $$E_k\downarrow$$，$$mE_1<+\infty$$，$$1_{E_k}\in\mathscr{F}$$，则 $$1_{\bigcap_kE_k}\in\mathscr{F}$$：由望远镜和

$$
1_{E_1}=1_{\bigcap_kE_k}+\sum_{k\ge1}\big(1_{E_k}-1_{E_{k+1}}\big),
$$

部分和 $$S_N=1_{E_1}-1_{E_{N+1}}\in\mathscr{F}$$（被减项 $$1_{E_{N+1}}$$ 可积）且 $$S_N\uparrow1_{E_1}-1_{\bigcap_kE_k}$$，由递增极限 Claim 该极限属于 $$\mathscr{F}$$，再用可积被减项 Claim 即得.

**Step 6.** 零测集：设 $$mE=0$$. 存在开集列 $$G_k\downarrow$$，s.t. $$\lim_k mG_k=mE=0$$；令 $$H=\bigcap_kG_k=\lim G_k$$（$$G_\delta$$ 集，$$mH=0$$），则 $$1_H\in\mathscr{F}$$（Step 1、5），$$E\subseteq H$$. 由 $$1_H\in\mathscr{F}$$ 的 (3)：

$$
\int_{\mathbb{R}^p}\Big(\int_{\mathbb{R}^q}1_H(x,y)\,dy\Big)dx=mH=0
\quad\Longrightarrow\quad
\int_{\mathbb{R}^q}1_H(x,y)\,dy=0\ \ \text{a.e.}\ x,
$$

即 $$m\big(H_x\big)=0$$ a.e. $$x$$（$$H_x$$ 为 $$H$$ 的 $$x$$-截面）. 于是对 a.e. $$x$$：$$E_x\subseteq H_x$$，故 $$m^*(E_x)=0$$，$$E_x$$ 是（零测从而可测的）集合，且

$$
\int_{\mathbb{R}^q}1_E(x,y)\,dy=m(E_x)=0\ \ \text{a.e.}\ x
\quad\Longrightarrow\quad
\int_{\mathbb{R}^p}\Big(\int_{\mathbb{R}^q}1_E\,dy\Big)dx=0=\int_{\mathbb{R}^{p+q}}1_E\,dm,
$$

即 (2)(3) 成立；(1) 亦成立（零测截面的示性函数可测）. 故 $$1_E\in\mathscr{F}$$.

**Step 7.** $$\forall$$ 可测 $$E$$：由第 2 章的正则性（命题 2.7），存在 $$G_\delta$$ 集 $$G\supseteq E$$ 与 $$F_\sigma$$ 集 $$F\subseteq E$$ 使 $$m(G\setminus F)=0$$；于是

$$
E=F\sqcup\big(E\setminus F\big),
\qquad
1_E=1_F+1_{E\setminus F},
$$

其中 $$F$$ 是 $$F_\sigma$$ 集（$$1_F\in\mathscr{F}$$：Step 4，$$F$$ 未必有限测度时先对 $$F\cap B_N$$ 用 Step 2、4 再由递增极限过渡）、$$E\setminus F\subseteq G\setminus F$$ 零测（$$1_{E\setminus F}\in\mathscr{F}$$：Step 6）. 由加法封闭性 $$1_E\in\mathscr{F}$$. $$\square$$

**证明**（Tonelli 定理（定理 4.14）的证明） 根据上述 Claim，对 $$\forall f\in L^+(\mathbb{R}^{p+q})$$，取简单函数列 $$\varphi_k$$（$$\varphi_k=\sum_i c_i1_{E_i}$$，$$E_i$$ 可测，故 $$\varphi_k\in\mathscr{F}$$）使 $$\varphi_k\uparrow f$$，即知 $$f\in\mathscr{F}$$，故 Tonelli 定理得证. $$\square$$

<div class="theorem">

**定理 4.15（Fubini 定理）**

设 $$f\in L(\mathbb{R}^{p+q})$$，则

- **(1)** 对于 a.e. $$x\in\mathbb{R}^p$$，$$y\mapsto f(x,y)$$ 可积；
- **(2)** $$\mathbb{R}^p\ni x\mapsto\int_{\mathbb{R}^q}f(x,y)\,dy$$ 可积；
- **(3)** $$\displaystyle\int_{\mathbb{R}^{p+q}}f(x,y)\,dm$$ $$=\int_{\mathbb{R}^p}\Big(\int_{\mathbb{R}^q}f(x,y)\,dy\Big)dx$$.

</div>

**证明** $$f=f_+-f_-$$，$$f_\pm\in L^+$$ 可积（$$\int f_\pm\,dm\le\int|f|\,dm<\infty$$）. 由 Tonelli 定理，$$f_\pm\in\mathscr{F}$$，特别地：

- a.e. $$x$$：$$\int_{\mathbb{R}^q}f_\pm(x,y)\,dy<\infty$$（因 $$\int_{\mathbb{R}^p}\big(\int f_\pm\,dy\big)dx=\int f_\pm\,dm<\infty$$），故 $$y\mapsto f(x,y)=f_+(x,y)-f_-(x,y)$$ 可积（两个非负可积之差）；
- $$x\mapsto\int_{\mathbb{R}^q}f(x,y)\,dy$$ $$=\int_{\mathbb{R}^q}f_+\,dy-\int_{\mathbb{R}^q}f_-\,dy$$ 可测，且

    $$
    \int_{\mathbb{R}^p}\Big|\int_{\mathbb{R}^q}f\,dy\Big|dx
    \le\int_{\mathbb{R}^p}\Big(\int_{\mathbb{R}^q}f_++f_-\,dy\Big)dx
    =\int_{\mathbb{R}^{p+q}}|f|\,dm<\infty ,
    $$

    故可积；
- 由可积被减项 Claim（或直接由两侧的可积性做减法）：

    $$
    \int_{\mathbb{R}^{p+q}}f\,dm
    =\int f_+\,dm-\int f_-\,dm
    =\int_{\mathbb{R}^p}\Big(\int f_+\,dy\Big)dx-\int_{\mathbb{R}^p}\Big(\int f_-\,dy\Big)dx
    =\int_{\mathbb{R}^p}\Big(\int_{\mathbb{R}^q}f\,dy\Big)dx .
    $$

$$\square$$

## 4.7 卷积

<div class="definition">

**定义 4.6（卷积）**

设 $$f,g\in L(\mathbb{R}^n)$$，记

$$
f*g(x):=\int_{\mathbb{R}^n}f(x-y)g(y)\,dy
$$

若 $$f*g(x)$$ 可积 a.e. $$x\in\mathbb{R}^n$$，则称为 $$f$$ 与 $$g$$ 之卷积.

</div>

<div class="theorem">

**定理 4.16（卷积的 $$L^1$$ 估计）**

$$
\int_{\mathbb{R}^n}|f*g|\ \le\ \int_{\mathbb{R}^n}|f|\cdot\int_{\mathbb{R}^n}|g| .
$$

</div>

**证明** 不妨设 $$f$$ 与 $$g$$ 可积（一般情形对 $$|f|,|g|$$ 应用再放缩：$$|f*g|(x)\le|f|*|g|(x)$$）. 则 $$\mathbb{R}^{2n}\ni(x,y)\mapsto f(x-y)g(y)$$ 可测（可测函数的复合与乘积），且

$$
\int_{\mathbb{R}^{2n}}|f(x-y)g(y)|\,dx\,dy
=\int_{\mathbb{R}^n}|g(y)|\Big(\int_{\mathbb{R}^n}|f(x-y)|\,dx\Big)dy
=\int_{\mathbb{R}^n}|f|\cdot\int_{\mathbb{R}^n}|g|<\infty ,
$$

故由 Fubini 定理：

$$
\int_{\mathbb{R}^n}f*g\,dm
=\int_{\mathbb{R}^n}\Big(\int_{\mathbb{R}^n}f(x-y)g(y)\,dy\Big)dx
=\int_{\mathbb{R}^{2n}}\big(f(x-y)g(y)\big)\,dx\,dy
$$

$$
=\int_{\mathbb{R}^n}\Big(\int_{\mathbb{R}^n}f(x-y)g(y)\,dx\Big)dy
=\int_{\mathbb{R}^n}f\cdot\int_{\mathbb{R}^n}g .
$$

（$$\int_{\mathbb{R}^n}|f(x-y)|\,dx=\int_{\mathbb{R}^n}|f|$$：平移不变性.）故对一般 $$f,g\in L(\mathbb{R}^n)$$，

$$
\int_{\mathbb{R}^n}|f*g|\le\int_{\mathbb{R}^n}|f|\cdot\int_{\mathbb{R}^n}|g|.
$$

$$\square$$

<div class="proposition">

**命题 4.13（分布函数公式）**

设 $$f:E\to\overline{\mathbb{R}}$$ 可测，则

$$
\int_E|f|\,dm=\int_0^{+\infty}m\{|f|>\lambda\}\,d\lambda .
$$

</div>

**证明** 令 $$F(x,\lambda)=1_{\{|f(x)|>\lambda\}}$$，则对每个 $$x$$：

$$
\int_0^{+\infty}1_{\{|f(x)|>\lambda\}}\,d\lambda=|f(x)|
\qquad(\text{区间}\ (0,|f(x)|)\ \text{的长度}).
$$

由 Tonelli 定理（非负可测）：

$$
\int_E|f|\,dm
=\int_E\Big(\int_0^{+\infty}1_{\{|f(x)|>\lambda\}}\,d\lambda\Big)dx
=\int_E\Big(\int_0^{+\infty}F(x,\lambda)\,d\lambda\Big)dx
$$

$$
=\int_0^{+\infty}\Big(\int_EF(x,\lambda)\,dx\Big)d\lambda
=\int_0^{+\infty}m\{|f|>\lambda\}\,d\lambda .
$$

$$\square$$