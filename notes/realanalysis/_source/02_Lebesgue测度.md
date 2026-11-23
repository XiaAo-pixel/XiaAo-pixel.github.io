---
layout: note
kind: note
title: "第二章　Lebesgue 测度"
course: realanalysis
order: 2
date: 2026-11-23
---

## 2.1 Lebesgue 测度的动机

我们希望找到“体积”的推广：一个定义在**全体**子集上的函数

$$
m:\ \mathcal{P}(\mathbb{R}^d)\to[0,\infty],
$$

使之满足：

- **(0)** 长方体（盒）的体积：

    $$
    m\Big(\prod_{i=1}^{d}(a_i,b_i)\Big)=(b_1-a_1)(b_2-a_2)\cdots(b_d-a_d);
    $$

- **(1)** 刚体运动不变：$$m(A)=m(\varphi(A))$$，$$\varphi$$ 是任一刚体运动；
- **(2)** 可数可加性：对任意两两不交的集合列 $$\{A_n\}$$，

    $$
    m\Big(\bigcup_n A_n\Big)=\sum_n m(A_n).
    $$

<div class="proposition">

**命题 2.1（$$(0)(1)(2)$$ 在 $$\mathcal{P}(\mathbb{R})$$ 上不自洽）**

不存在同时满足 $$(0)(1)(2)$$ 的 $$m:\mathcal{P}(\mathbb{R})\to[0,\infty]$$. 以 $$d=1$$ 为例：

</div>

**证明** 在 $$\mathbb{R}$$ 上定义等价关系

$$
x\sim y\iff x-y\in\mathbb{Q},
$$

得到商集 $$\mathbb{R}/{\sim}=\{[x]:\ x\in\mathbb{R}\}$$（每个等价类是可数稠密集）.

由选择公理，对每个等价类 $$[x]$$ 取定 $$\bar{x}\in[x]\cap[0,1)$$，令

$$
A:=\{\bar{x}:\ x\in\mathbb{R}\}\subseteq[0,1).
$$

对 $$r\in\mathbb{Q}$$ 定义（以 $$1$$ 为周期折叠）

$$
A+r:=\{\bar{x}+r \bmod 1:\ \bar{x}\in A\}\subseteq[0,1).
$$

**两两不交**：对 $$r_1\neq r_2\in\mathbb{Q}\cap[0,1)$$，若 $$(A+r_1)\cap(A+r_2)\neq\varnothing$$，则存在 $$a_1,a_2\in A$$ 使 $$a_1+r_1\equiv a_2+r_2\pmod{1}$$，于是 $$a_1-a_2=r_2-r_1+m\in\mathbb{Q}$$（$$m\in\mathbb{Z}$$），故 $$a_1\sim a_2$$，从而 $$a_1=a_2$$（$$A$$ 每个等价类只取一点），进而 $$r_1=r_2$$，矛盾.

**覆盖 $$[0,1]$$**：任取 $$x\in\mathbb{R}$$，则 $$x\in[\bar{y}]$$，其中 $$\bar{y}\in A$$，故 $$x-\bar{y}\in\mathbb{Q}$$；记 $$r=x-\bar{y}\bmod 1\in\mathbb{Q}\cap[0,1)$$，则 $$x\in A+r$$. 特别地，每个 $$x\in[0,1)$$ 属于某个 $$A+r$$，于是

$$
\bigcup_{r\in\mathbb{Q}\cap[0,1)}(A+r)=[0,1).
$$

若 $$m$$ 满足 $$(0)(1)(2)$$，则（平移与模 $$1$$ 折叠均保持测度）

$$
m\Big(\bigcup_{r\in\mathbb{Q}\cap[0,1)}(A+r)\Big)
=\sum_{r\in\mathbb{Q}\cap[0,1)}m(A+r)
=\sum_{r\in\mathbb{Q}\cap[0,1)}m(A)
=\begin{cases}0,& m(A)=0,\\ +\infty,& m(A)>0,\end{cases}
$$

而由 $$(0)$$，$$m([0,1))=1$$，矛盾. $$\square$$

**笔记** 上述 $$A$$ 正是后文构造的 **Vitali 集**（见 §2.6）. 矛盾的出路是**放弃全集 $$\mathcal{P}(\mathbb{R}^d)$$**：在保持 $$(0)$$ 与 $$(2)$$ 的前提下，把 $$m$$ 的定义域缩小到一个合适的 $$\sigma$$ 代数——Lebesgue 可测集类. 这就是本章的纲领.

## 2.2 外测度与 Lebesgue 测度

### 2.2.1 外测度

<div class="definition">

**定义 2.1（Lebesgue 外测度）**

对 $$A\subseteq\mathbb{R}^d$$，定义

$$
m^*(A):=\inf\Big\{\ \sum_{j\ge1}|I_j|\ :\ \text{开盒}\ I_j,\ \bigcup_j I_j\supset A\ \Big\},
$$

其中开盒 $$I=\prod_{i=1}^d(a_i,b_i)$$，$$|I|=\prod_i(b_i-a_i)$$（允许 $$|I|=+\infty$$；空覆盖之和为 $$0$$）. 则 $$m^*:\mathcal{P}(\mathbb{R}^d)\to[0,\infty]$$ 称为 **Lebesgue 外测度**.

</div>

<div class="example">

**例题 2.1（可数集的外测度为零）**

设 $$A$$ 可数，则 $$m^*A=0$$.

</div>

**证明** 不妨 $$A=\{x_1,x_2,\cdots,x_n,\cdots\}$$. $$\forall\varepsilon>0$$，对每个 $$x_j$$ 取开盒 $$I_j\ni x_j$$，棱长充分小使 $$|I_j|<\dfrac{\varepsilon}{2^j}$$. 则 $$\{I_j\}$$ 覆盖 $$A$$，且

$$
m^*A\le\sum_{j\ge1}|I_j|\le\sum_{j\ge1}\frac{\varepsilon}{2^j}=\varepsilon.
$$

由 $$\varepsilon$$ 任意性，$$m^*A=0$$. $$\square$$

<div class="proposition">

**命题 2.2（外测度的基本性质）**

1. 小盒覆盖极限：$$\forall\delta>0$$，记

    $$
    m^*_\delta(A)=\inf\Big\{\sum_j|I_j|\ :\ \bigcup_j I_j\supset A,\ \text{各}\ I_j\ \text{棱长}<\delta\Big\},
    $$

    则 $$\displaystyle\lim_{\delta\to0^+}m^*_\delta(A)=m^*A$$；

2. 单调性：$$A\subseteq B\ \Rightarrow\ m^*A\le m^*B$$；
3. 可数次可加性：$$\forall\{A_j\}\subset\mathcal{P}(\mathbb{R}^d)$$，

    $$
    m^*\Big(\bigcup_j A_j\Big)\le\sum_j m^*A_j ;
    $$

4. 距离可加性：若 $$d(A,B)>0$$，即 $$\inf_{a\in A,\,b\in B}|a-b|>0$$，则

    $$
    m^*(A\cup B)=m^*A+m^*B ;
    $$

5. 开集逼近：

    $$
    m^*A=\inf_{\text{开集}\,O\supset A}m^*O .
    $$

</div>

**证明** （1）先注意：对 $$\delta<\delta'$$，棱长 $$<\delta$$ 的覆盖必是棱长 $$<\delta'$$ 的覆盖，故

$$
m^*A\ \le\ m^*_{\delta'}(A)\ \le\ m^*_\delta(A),
$$

即 $$m^*_\delta(A)$$ 随 $$\delta\downarrow0$$ 单调不减，极限存在且 $$\lim_{\delta\to0^+}m^*_\delta(A)\ge m^*A$$. 反之，$$\forall\varepsilon>0$$，取覆盖 $$\{I_j\}$$ 使 $$\sum|I_j|\le m^*A+\varepsilon$$；把每个闭包 $$\overline{I_j}$$ 剖分为有限个棱长 $$<\delta$$ 的闭子盒（体积之和不变），再用略微放大的开盒覆盖各闭子盒（总体积 $$<\sum|I_j|+\varepsilon$$），得 $$\sum|I_j|$$ 棱长 $$<\delta$$ 的开盒覆盖，故

$$
m^*_\delta(A)\le m^*A+2\varepsilon .
$$

令 $$\varepsilon\to0$$、$$\delta\to0$$ 即得.

（2）覆盖 $$B$$ 的开盒列也覆盖 $$A$$，取下确界即得.

（3）$$\forall\varepsilon>0$$，对每个 $$A_j$$ 取开盒列 $$\{I_{j,k}\}_{k\ge1}$$ 覆盖 $$A_j$$，使

$$
\sum_k|I_{j,k}|\le m^*A_j+\frac{\varepsilon}{2^j}.
$$

因 $$\bigcup_j A_j\subseteq\bigcup_k\bigcup_j I_{j,k}$$，从而

$$
m^*\Big(\bigcup_j A_j\Big)
\le\sum_j\sum_k|I_{j,k}|
\le\sum_j m^*A_j+\sum_j\frac{\varepsilon}{2^j}
=\sum_j m^*A_j+\varepsilon .
$$

令 $$\varepsilon\to0$$ 即得.

（4）由（3）只需证 $$m^*(A\cup B)\ge m^*A+m^*B$$. 记 $$\rho:=d(A,B)>0$$. $$\forall\varepsilon>0$$，取开盒列 $$\{Q_j\}$$ 覆盖 $$A\cup B$$，使 $$\sum_j|Q_j|\le m^*(A\cup B)+\varepsilon$$. 把每个 $$Q_j$$ 剖分为有限个棱长 $$<\rho/\sqrt{d}$$ 的小盒（对角线直径 $$<\rho$$），得小盒族 $$\{K\}$$，仍覆盖 $$A\cup B$$，且

$$
\sum_{K}|K|=\sum_j|Q_j|.
$$

每个小盒 $$K$$ 至多与 $$A,B$$ 之一相交（否则 $$K$$ 中有两点距离 $$\ge\rho$$，与 $$\operatorname{diam}K<\rho$$ 矛盾）. 与 $$A$$ 相交的小盒覆盖 $$A$$，其总体积 $$\ge m^*A$$；与 $$B$$ 相交者同理 $$\ge m^*B$$. 于是

$$
m^*(A\cup B)+\varepsilon\ge\sum_j|Q_j|=\sum_K|K|
\ge m^*A+m^*B .
$$

令 $$\varepsilon\to0$$ 即得.

（5）一方面，对任意开集 $$O\supset A$$，由单调性 $$m^*A\le m^*O$$，故 $$m^*A\le\inf_{O\supset A}m^*O$$. 另一方面，$$\forall\varepsilon>0$$，取开盒列 $$\{I_j\}$$ 覆盖 $$A$$ 使 $$\sum|I_j|\le m^*A+\varepsilon$$；令 $$O=\bigcup_j I_j$$，则 $$O$$ 为开集、$$O\supset A$$，且

$$
m^*O\le\sum_j|I_j|\le m^*A+\varepsilon
\quad\Longrightarrow\quad
\inf_{O\supset A}m^*O\le m^*A+\varepsilon .
$$

令 $$\varepsilon\to0$$ 即得. $$\square$$

### 2.2.2 Carathéodory 条件与 Lebesgue 可测集

<div class="definition">

**定义 2.2（Carathéodory 条件（$$L$$-可测集））**

设 $$A\subseteq\mathbb{R}^d$$. 若 $$A$$ 满足：对任意测试集 $$T\subseteq\mathbb{R}^d$$，

$$
m^*T=m^*(T\cap A)+m^*(T\cap A^c),
$$

则称 $$A$$ 为 **Lebesgue 可测集**. 可测集全体记作 $$\mathscr{A}$$（不等式“$$\le$$”恒由次可加性成立，故条件等价于“$$\ge$$”）.

</div>

<div class="theorem">

**定理 2.1（Lebesgue 可测集构成 $$\sigma$$ 代数）**

Lebesgue 可测集全体 $$\mathscr{A}$$ 构成 $$\sigma$$ 代数.

</div>

**证明** 记 $$\mathscr{A}=\{A:\ A\ \text{是}\ L\text{-可测集}\}$$.

（i）$$\varnothing\in\mathscr{A}$$：对任意 $$T$$，$$m^*(T\cap\varnothing)+m^*(T\cap\mathbb{R}^d)$$ $$=0+m^*T=m^*T$$.

（ii）$$A\in\mathscr{A}\Rightarrow A^c\in\mathscr{A}$$：Carathéodory 条件关于 $$A\leftrightarrow A^c$$ 对称.

（iii）$$A,B\in\mathscr{A}\Rightarrow A\cup B\in\mathscr{A}$$：对任意 $$T$$，逐次用 $$A$$、$$B$$ 的可测性剖分 $$T$$：

$$
\begin{aligned}
m^*T&=m^*(T\cap A)+m^*(T\cap A^c)\\
&=m^*(T\cap A\cap B)+m^*(T\cap A\cap B^c)\\
&\quad+m^*(T\cap A^c\cap B)+m^*(T\cap A^c\cap B^c)\\
&\ge m^*\big(T\cap(A\cup B)\big)+m^*\big(T\cap(A\cup B)^c\big),
\end{aligned}
$$

末步用次可加性（$$T\cap(A\cup B)=T\cap\big((A\cap B)$$ $$\cup(A\cap B^c)\cup(A^c\cap B)\big)$$）. 另一方面 $$m^*T\le m^*(T\cap(A\cup B))$$ $$+m^*(T\cap(A\cup B)^c)$$ 恒成立，故 $$A\cup B\in\mathscr{A}$$；归纳知有限并亦可测.

（iv）两两不交列 $$\{A_j\}_{j\ge1}\subset\mathscr{A}$$，则 $$S=\bigsqcup_{j\ge1}A_j\in\mathscr{A}$$：记 $$S_n=\bigsqcup_{j=1}^n A_j\in\mathscr{A}$$. 先证**递归公式**

$$
m^*(T\cap S_n)=\sum_{j=1}^{n}m^*(T\cap A_j).
$$

$$n=1$$ 平凡；若对 $$n-1$$ 成立，对测试集 $$T\cap S_n$$ 用 $$A_n$$ 的可测性：

$$
m^*(T\cap S_n)=m^*(T\cap S_n\cap A_n)+m^*(T\cap S_n\cap A_n^c)
=m^*(T\cap A_n)+m^*(T\cap S_{n-1}),
$$

（$$S_n\cap A_n=A_n$$，$$S_n\cap A_n^c=S_{n-1}$$）归纳完成.

于是对任意 $$T$$ 与任意 $$n$$：

$$
m^*T=m^*(T\cap S_n)+m^*(T\cap S_n^c)
\ge\sum_{j=1}^{n}m^*(T\cap A_j)+m^*(T\cap S^c),
$$

（$$S_n^c\supseteq S^c$$，用单调性）. 令 $$n\to\infty$$：

$$
m^*T\ \ge\ \sum_{j\ge1}m^*(T\cap A_j)+m^*(T\cap S^c)
\ \ge\ m^*(T\cap S)+m^*(T\cap S^c),
$$

末步用次可加性. 结合恒成立的反向不等式，得 $$S\in\mathscr{A}$$，且取 $$T=S$$ 还给出可数可加性

$$
m^*\Big(\bigsqcup_{j\ge1}A_j\Big)=\sum_{j\ge1}m^*A_j .
$$

（v）一般可数并：$$\bigcup_j A_j=\bigsqcup_j B_j$$，其中 $$B_j=A_j\setminus\bigcup_{i<j}A_i$$ 是有限个可测集之差，故可测，由（iv）知并集可测.

综上 $$\mathscr{A}$$ 是 $$\sigma$$ 代数. $$\square$$

<div class="proposition">

**命题 2.3（零测集可测）**

外测度为零的集合 $$L$$ 可测：

$$
\mathscr{A}\supset\{A\subseteq\mathbb{R}^d:\ m^*A=0\}.
$$

</div>

**证明** 设 $$m^*A=0$$. 对任意 $$T$$：

$$
m^*T\le m^*(T\cap A)+m^*(T\cap A^c)
\le m^*A+m^*T=m^*T,
$$

故等号成立，$$A\in\mathscr{A}$$. $$\square$$

**注** 设 $$A\subseteq B$$，$$A\in\mathscr{A}$$，$$m^*(B\setminus A)=0$$，则

$$
m^*B\le m^*(B\setminus A)+m^*A=m^*A\le m^*B,
$$

故 $$m^*A=m^*B$$：可测集添加或去掉一个零测集不改变外测度. 特别地 $$B\setminus A$$（零测）可测，从而 $$B=A\cup(B\setminus A)$$ 可测.

<div class="definition">

**定义 2.3（Lebesgue 测度）**

定义

$$
m:=m^*\big|_{\mathscr{A}}:\ \mathscr{A}\to[0,\infty],
$$

称为（Lebesgue）**测度**. 由定理 2.1 的证明，$$m$$ 在 $$m^*$$ 各性质的基础上还满足**可数可加性**：

$$
\forall\ \text{两两不交的}\ \{A_j\}_{j\ge1}\subset\mathscr{A},\qquad
m\Big(\bigsqcup_{j\ge1}A_j\Big)=\sum_{j\ge1}m(A_j).
$$

此外 $$m$$ 是**平移不变的**：$$m^*(A+a)=m^*(A)$$（开盒平移后仍是开盒、体积不变），且 $$A\in\mathscr{A}\Rightarrow A+a\in\mathscr{A}$$（对测试集 $$T$$ 有 $$T\cap(A+a)=\big((T-a)\cap A\big)+a$$ 及相应的补集等式，故 Carathéodory 条件在平移下保持）.

</div>

## 2.3 测度的基本性质

<div class="lemma">

**引理 2.1（有限可加 $$\Rightarrow$$ 可数可加）**

设外测度 $$m^*$$ 在两两不交的集簇 $$\{A_j\}_{j\ge1}$$ 上有限可加（任意有限不交并的外测度等于外测度之和），则

$$
m^*\Big(\bigsqcup_{j\ge1}A_j\Big)=\sum_{j\ge1}m^*(A_j).
$$

</div>

**证明** “$$\le$$”由可数次可加性. 反之，由单调性与有限可加性，对任意 $$n$$：

$$
m^*\Big(\bigsqcup_{j\ge1}A_j\Big)\ge m^*\Big(\bigsqcup_{j=1}^{n}A_j\Big)=\sum_{j=1}^{n}m^*(A_j).
$$

令 $$n\to\infty$$（级数 = 部分和的极限，允许 $$+\infty$$）即得. $$\square$$

<div class="lemma">

**引理 2.2（递增集列的下连续性）**

设 $$E_k\subseteq E_{k+1}$$，$$E=\bigcup_k E_k$$，$$A_k:=E_{k+1}\setminus E_k$$. 若集簇 $$\{A_k\}_{k\ge1}$$ 可以写成有限个子簇之并 $$P_1\cup\cdots\cup P_n$$，使得 $$m^*$$ 在每个子簇 $$P_i$$ 上有限可加，则

$$
m^*E=\lim_{k\to\infty}m^*E_k .
$$

</div>

**证明** $$E_k$$ 递增保证 $$m^*E_k$$ 递增，极限（可能为 $$+\infty$$）存在.

若 $$\sum_{A_j\in P_i}m^*A_j=+\infty$$ 对某个 $$i$$ 成立，则由引理 2.1 与 $$P_i$$ 内有限可加性，

$$
m^*E\ \ge\ m^*\Big(\bigsqcup_{A_j\in P_i}A_j\Big)=\sum_{A_j\in P_i}m^*A_j=+\infty,
$$

同时 $$m^*E_k\ge m^*\Big(\bigsqcup_{j<k}A_j\Big)$$ $$\to\sum_j m^*A_j=+\infty$$（对足够大的子簇用引理 2.1），故两边同为 $$+\infty$$.

以下设每个 $$\sum_{A_j\in P_i}m^*A_j<\infty$$. 注意 $$E\setminus E_k=\bigsqcup_{j\ge k}A_j$$，由次可加性及引理 2.1：

$$
\begin{aligned}
0\le m^*E-m^*E_k&\le m^*(E\setminus E_k)\\
&\le\sum_{j\ge k}m^*A_j\\
&=\sum_{i=1}^{n}\ \sum_{\substack{j\ge k\\ A_j\in P_i}}m^*A_j,\qquad\text{(2.1)}
\end{aligned}
$$

其中诸 $$\sum_{A_j\in P_i}m^*A_j$$ 是收敛级数的部分和之补，当 $$k\to\infty$$ 时趋于 $$0$$. 令 $$k\to\infty$$ 于 (2.1)，并注意 $$m^*E\ge\lim_k m^*E_k$$ 恒成立，即得 $$m^*E=\lim_k m^*E_k$$. $$\square$$

<div class="lemma">

**引理 2.3（Carathéodory 引理（卡氏引理））**

设 $$G\subseteq\mathbb{R}^n$$ 是开集，$$E\subseteq G$$，定义

$$
E_k=\Big\{x\in E:\ d(x,G^c)\ge\frac1k\Big\},\qquad k=1,2,\cdots .
$$

则 $$\displaystyle\lim_{k\to\infty}m^*E_k=m^*E$$.

</div>

**证明** $$E_k\subseteq E_{k+1}$$，$$\bigcup_k E_k=E$$（$$x\in E\subseteq G$$ 开 $$\Rightarrow d(x,G^c)>0$$），令 $$A_k:=E_{k+1}\setminus E_k$$，则 $$A_k\subseteq\{x:\ \frac{1}{k+1}\le d(x,G^c)<\frac1k\}$$.

若 $$|i-j|\ge2$$（不妨 $$i<j$$），则对 $$x\in A_i$$、$$y\in A_j$$：

$$
|x-y|\ \ge\ d(y,G^c)-d(x,G^c)\ \ge\ \frac{1}{j+1}-\frac{1}{i}\ >\ 0,
$$

故 $$d(A_i,A_j)>0$$. 于是由命题 2.2(4)，$$m^*$$ 在

$$
P_1=\{A_{2j-1}\}_{j\ge1},\qquad P_2=\{A_{2j}\}_{j\ge1}
$$

上都有限可加（同子簇内任意两个成员下标相差 $$\ge2$$）. 根据引理 2.2，

$$
\lim_{k\to\infty}m^*E_k=m^*E.
$$

$$\square$$

<div class="proposition">

**命题 2.4（闭集可测）**

任意闭集 $$F\subseteq\mathbb{R}^n$$ 都是 Lebesgue 可测集：$$F\in\mathscr{A}$$.

</div>

**证明** 对任意测试集 $$T\subseteq\mathbb{R}^n$$，令

$$
E_k:=\Big\{x\in F^c:\ d(x,F)\ge\frac1k\Big\}.
$$

则 $$d(F,E_k)\ge\frac1k$$，从而 $$d(F\cap T,\,E_k\cap T)\ge\frac1k>0$$，由命题 2.2(4) 得有限可加性：

$$
m^*\big(T\cap(F\cup E_k)\big)=m^*(T\cap F)+m^*(T\cap E_k).
$$

式中 $$E_k\uparrow F^c$$（$$F^c$$ 开），且由卡氏引理（引理 2.3 应用于 $$E=T\cap F^c\subseteq G=F^c$$，其 $$E_k$$ 恰为 $$T\cap E_k$$）

$$
m^*(T\cap E_k)\ \longrightarrow\ m^*(T\cap F^c).
$$

又 $$T\cap(F\cup E_k)\subseteq T$$，故

$$
m^*T\ \ge\ m^*(T\cap F)+m^*(T\cap E_k)\ \xrightarrow[k\to\infty]{}\ m^*(T\cap F)+m^*(T\cap F^c).
$$

结合次可加性给出的反向不等式，得

$$
m^*T=m^*(T\cap F)+m^*(T\cap F^c),
$$

即 $$F\in\mathscr{A}$$. $$\square$$

<div class="proposition">

**命题 2.5（Borel 集可测）**

任意 Borel 集 $$G$$ 都属于 $$\mathscr{A}$$，即 $$\mathscr{B}\subseteq\mathscr{A}$$.

</div>

**证明** 闭集 $$F\in\mathscr{A}$$，且 $$\mathscr{A}$$ 是 $$\sigma$$ 代数（定理 2.1）$$\Rightarrow$$ 开集 $$G=F^c\in\mathscr{A}$$；包含所有开集的最小 $$\sigma$$ 代数是 Borel $$\sigma$$ 代数，故 Borel 集 $$G\in\mathscr{A}$$. $$\square$$

## 2.4 测度的正则性

<div class="proposition">

**命题 2.6（外正则性与内正则性）**

$$\forall E\in\mathscr{A}$$，$$\forall\varepsilon>0$$：

1. 存在开集 $$G\supset E$$，使得 $$m(G\setminus E)<\varepsilon$$（**外正则性**）；
2. 存在闭集 $$F\subseteq E$$，使得 $$m(E\setminus F)<\varepsilon$$（**内正则性**）.

</div>

**证明** （1）先设 $$E$$ 有界（从而 $$mE<\infty$$）. 由命题 2.2(5)，存在开集 $$G\supset E$$ 使

$$
mE\le mG\le mE+\varepsilon,
$$

由可加性（$$E\subseteq G$$ 均可测，$$G=E\sqcup(G\setminus E)$$）得 $$m(G\setminus E)=mG-mE<\varepsilon$$.

若 $$E$$ 无界：对每个 $$k$$，$$E\cap B_k(0)$$ 有界可测，取开集 $$G_k\supset E\cap B_k(0)$$ 使

$$
m\big(G_k\setminus(E\cap B_k(0))\big)<\frac{\varepsilon}{2^k}.
$$

令 $$G=\bigcup_{k\ge1}G_k$$，则 $$G$$ 为开集，$$G\supset E$$，且

$$
m(G\setminus E)\le\sum_{k\ge1}m\big(G_k\setminus(E\cap B_k(0))\big)
<\sum_{k\ge1}\frac{\varepsilon}{2^k}=\varepsilon .
$$

（2）对 $$E^c$$ 用（1）：存在开集 $$G\supset E^c$$ 使 $$m(G\setminus E^c)<\varepsilon$$. 令 $$F=G^c$$，则 $$F$$ 闭且 $$F\subseteq E$$，而

$$
m(E\setminus F)=m(E\cap G)=m(G\setminus E^c)<\varepsilon .
$$

$$\square$$

<div class="proposition">

**命题 2.7（$$G_\delta$$ 与 $$F_\sigma$$ 逼近）**

1. $$\forall E\subseteq\mathbb{R}^n$$，存在 $$G_\delta$$ 集 $$G\supset E$$，使得 $$m^*G=m^*E$$（外测度的外正则性）；
2. $$\forall E\in\mathscr{A}$$，存在 $$G_\delta$$ 集 $$G\supset E$$ 与 $$F_\sigma$$ 集 $$F\subseteq E$$，使得 $$m(G\setminus F)=0$$（$$L$$-测度的正则性）.

</div>

**证明** （1）不妨 $$m^*E<\infty$$. 对每个 $$k$$，由命题 2.2(5) 取开集 $$G_k\supset E$$，使

$$
m^*E\le m^*G_k\le m^*E+\frac1k .
$$

令 $$G=\bigcap_{k\ge1}G_k$$，则 $$G$$ 是 $$G_\delta$$ 集，$$G\supset E$$，且

$$
m^*E\le mG=m^*G\le m^*G_k\le m^*E+\frac1k\qquad\forall k .
$$

令 $$k\to\infty$$ 得 $$m^*E=m^*G$$.

（2）由命题 2.6，对每个 $$k$$ 取

$$
G_k\supset E\supset F_k,\qquad
m(G_k\setminus E)<\frac1k,\quad m(E\setminus F_k)<\frac1k .
$$

令 $$G:=\bigcap_k G_k$$（$$G_\delta$$ 集），$$F:=\bigcup_k F_k$$（$$F_\sigma$$ 集），则 $$G\supset E\supset F$$，且对每个 $$k$$：

$$
0\le m(G\setminus F)\le m(G_k\setminus F_k)
=m(G_k\setminus E)+m(E\setminus F_k)<\frac{2}{k}\xrightarrow[k\to\infty]{}0 .
$$

$$\square$$

<div class="theorem">

**定理 2.2（可测集的结构）**

$$\forall A\in\mathscr{A}$$，存在 Borel 集 $$F\in\mathscr{B}$$ 与零测集 $$O\in\mathscr{A}$$（$$mO=0$$），使得

$$
A=F\cup O,\qquad\text{即}\qquad \mathscr{A}=\sigma(\mathscr{B}\cup\mathscr{N}),
$$

其中 $$\mathscr{N}$$ 为零测集全体. 换言之：Lebesgue 可测集 = Borel 集 $$\cup$$ 零测集.

</div>

**证明** 由命题 2.7(2)，取 $$G_\delta$$ 集 $$G\supset A$$ 与 $$F_\sigma$$ 集 $$F\subseteq A$$ 使 $$m(G\setminus F)=0$$. 令 $$O:=A\setminus F$$，则 $$O\subseteq G\setminus F$$ 可测且 $$mO=0$$，而 $$A=F\cup O$$. 反向包含 $$\sigma(\mathscr{B}\cup\mathscr{N})\supseteq\mathscr{A}$$ 显然（$$A=F\cup O$$ 且 $$F$$ Borel、$$O$$ 零测）；正向：$$\mathscr{A}$$ 是包含 $$\mathscr{B}$$ 与 $$\mathscr{N}$$ 的 $$\sigma$$ 代数（命题 2.5、命题 2.3），故 $$\mathscr{A}\supseteq\sigma(\mathscr{B}\cup\mathscr{N})$$. $$\square$$

<div class="proposition">

**命题 2.8（测度的两侧正则表示）**

若 $$A\in\mathscr{A}$$，则

$$
mA=\sup_{\text{闭}\,F\subseteq A}mF=\inf_{\text{开}\,G\supset A}mG .
$$

</div>

**证明** inf 部分：由命题 2.2(5) 与 $$m=m^*\big|_{\mathscr{A}}$$，

$$
mA=m^*A=\inf_{\text{开}\,G\supset A}m^*G=\inf_{\text{开}\,G\supset A}mG .
$$

sup 部分：由内正则性（命题 2.6(2)），$$\forall\varepsilon>0$$ 存在闭集 $$F\subseteq A$$ 使 $$m(A\setminus F)<\varepsilon$$，于是

$$
mA=mF+m(A\setminus F)\le mF+\varepsilon
\quad\Longrightarrow\quad
\sup_{\text{闭}\,F\subseteq A}mF\ge mA-\varepsilon,
$$

令 $$\varepsilon\to0$$；而 $$mF\le mA$$ 显然，故等号成立. $$\square$$

<div class="proposition">

**命题 2.9（测度的连续性）**

1. 设可测集列 $$E_k\subseteq E_{k+1}$$，则 $$\displaystyle\lim_k mE_k=m\Big(\lim_k E_k\Big)=m\Big(\bigcup_k E_k\Big)$$；
2. 设可测集列 $$E_k\supseteq E_{k+1}$$ 且 $$mE_1<\infty$$，则 $$\displaystyle\lim_k mE_k=m\Big(\bigcap_k E_k\Big)$$；
3. 设 $$\{E_k\}$$ 是可测集列，则

    $$
    m\,\underline{\lim} E_k\ \le\ \underline{\lim} mE_k\ \le\ \overline{\lim} mE_k\ \le\ m\,\overline{\lim} E_k,
    $$

    其中最后一个不等号需在条件 $$m\big(\bigcup_k E_k\big)<\infty$$ 下成立.

</div>

**证明** （1）记 $$A_1=E_1$$，$$A_k=E_k\setminus E_{k-1}$$（$$k\ge2$$），则 $$\{A_k\}$$ 两两不交且 $$\bigcup_k E_k=\bigsqcup_k A_k$$. 由可数可加性

$$
m\Big(\bigcup_k E_k\Big)=\sum_{k\ge1}m(A_k)
=\lim_{n\to\infty}\sum_{k=1}^{n}m(A_k)
=\lim_{n\to\infty}mE_n .
$$

（2）令 $$F_k=E_1\setminus E_k$$，则 $$F_k\subseteq F_{k+1}$$ 递增，且 $$\bigcup_k F_k=E_1\setminus\bigcap_k E_k$$. 由（1）：

$$
mE_1-m\Big(\bigcap_k E_k\Big)=m\Big(\bigcup_k F_k\Big)=\lim_k mF_k
=mE_1-\lim_k mE_k,
$$

（$$mE_1<\infty$$ 保证减法合法）故 $$\lim_k mE_k=m\big(\bigcap_k E_k\big)$$.

（3）记 $$G_n:=\bigcap_{k\ge n}E_k\uparrow\underline{\lim} E_k$$，$$H_n:=\bigcup_{k\ge n}E_k\downarrow\overline{\lim} E_k$$. 由（1）与 $$G_n\subseteq E_k$$（$$k\ge n$$）：

$$
m\,\underline{\lim} E_k=\lim_n mG_n\le\lim_n\ \inf_{k\ge n}mE_k=\underline{\lim} mE_k ;
$$

$$\underline{\lim} mE_k\le\overline{\lim} mE_k$$ 显然. 最后，在 $$m\big(\bigcup_kE_k\big)<\infty$$ 下对 $$H_n$$ 用（2）（$$H_1\subseteq\bigcup_kE_k$$ 测度有限）：

$$
\overline{\lim} mE_k\le\lim_n m\Big(\bigcup_{k\ge n}E_k\Big)
=m\Big(\bigcap_{n\ge1}\bigcup_{k\ge n}E_k\Big)=m\,\overline{\lim} E_k .
$$

$$\square$$

**注** $$\overline{\lim} E_k=\{x:\ x\in E_k\ \text{对无穷多个}\ k\}$$（“$$E_k$$ 发生无穷多次”，i.o.），$$\underline{\lim} E_k=\{x:\ x\in E_k$$ $$\text{对至多有限个}\ k\ \text{不成立}\}$$（“$$E_k$$ 最终恒发生”，a.a.）.

<div class="proposition">

**命题 2.10（紧集的 $$\delta$$-邻域）**

设 $$K\subseteq\mathbb{R}^n$$ 是紧集（有界闭），记 $$K_\delta=\{x\in\mathbb{R}^n:\ d(x,K)<\delta\}$$，则

$$
mK=\lim_{\delta\to0^+}mK_\delta .
$$

</div>

**证明** $$\delta\mapsto mK_\delta$$ 单调递减且 $$K\subseteq K_\delta$$，故 $$mK\le\lim_{\delta\to0^+}mK_\delta$$. 只需证反向. 取 $$E_j:=K_{1/j}$$，则 $$mE_1<\infty$$（$$K$$ 有界），$$E_j\supseteq E_{j+1}$$，由命题 2.9(2)：

$$
\lim_{j\to\infty}mE_j=m\Big(\bigcap_j E_j\Big).
$$

下证 $$\bigcap_j E_j=K$$：显然 $$K\subseteq\bigcap_j E_j$$；反之若 $$x\in\bigcap_j K_{1/j}\setminus K$$，取 $$\bar{\delta}=d(x,K)>0$$（$$K$$ 闭），则当 $$1/j<\bar{\delta}$$ 时 $$x\notin K_{1/j}$$，矛盾. 故

$$
mK=\lim_{j\to\infty}mK_{1/j}=\lim_{\delta\to0^+}mK_\delta .
$$

$$\square$$

<div class="proposition">

**命题 2.11（内正则性（紧集版本））**

（内正则性）$$\forall A\in\mathscr{A}$$，

$$
mA=\sup_{\text{紧}\,K\subseteq A}mK .
$$

</div>

**证明** 一方面，紧集是闭集，故 $$\sup_{\text{紧}K\subseteq A}mK\le\sup_{\text{闭}F\subseteq A}mF=mA$$. 另一方面，由命题 2.8 与闭集的连续性（命题 2.9(1)），

$$
mA=\sup_{\text{闭}\,F\subseteq A}mF
=\sup_{\text{闭}\,F\subseteq A}\ \sup_{r>0}m\big(F\cap\overline{B_r(0)}\big)
\le\sup_{\text{紧}\,K\subseteq A}mK,
$$

其中 $$F\cap\overline{B_r(0)}$$ 是有界闭集即紧集，且 $$m\big(F\cap\overline{B_r(0)}\big)\uparrow mF$$（$$r\to\infty$$）. 故等号成立. $$\square$$

## 2.5 正测度集的性质

<div class="lemma">

**引理 2.4（重叠引理）**

设 $$A_1,\cdots,A_k$$ 可测，$$A_i\subseteq B$$（$$B$$ 可测）. 若

$$
\sum_{i=1}^{k}mA_i>(k-1)\,mB,
$$

则 $$\bigcap_{i=1}^{k}A_i\neq\varnothing$$.

</div>

**证明** 反设 $$\bigcap_{i=1}^{k}A_i=\varnothing$$，则 $$B$$ 中每点 $$x$$ 至多属于 $$k-1$$ 个 $$A_i$$. 令

$$
r(x):=\#\{i:\ x\in A_i\}\le k-1 ,
$$

则

$$
\sum_{i=1}^{k}mA_i=\sum_{i=1}^{k}\int_B 1_{A_i}\,dm
=\int_B r(x)\,dm\le(k-1)\,mB,
$$

与假设矛盾. 故 $$\bigcap_i A_i\neq\varnothing$$. $$\square$$

<div class="theorem">

**定理 2.3（Steinhaus 定理 1）**

设 $$A\subseteq\mathbb{R}^n$$ 是正测集（$$mA>0$$），$$k\in\mathbb{Z}_+$$，则存在 $$\delta>0$$，使得只要 $$|\vec{a}|<\delta$$，就有

$$
\bigcap_{j=1}^{k}(A+j\vec{a})\neq\varnothing .
$$

等价形式：存在 $$\tilde{x}\in A$$，使得 $$\{\tilde{x},\ \tilde{x}-\vec{a},\ \cdots,\ \tilde{x}-k\vec{a}\}\subseteq A$$.

</div>

<div class="center">

![Steinhaus 定理 1 示意](fig/steinhaus.png)

**图 2.1**　Steinhaus 定理 1：正测度紧集 $$K$$ 连同其小步平移 $$K+j\vec{a}$$ 必有公共点

</div>

**证明** 由内正则性（命题 2.11），存在紧集 $$K\subseteq A$$ 使 $$mK>0$$（取闭集 $$F\subseteq A$$，$$mF>0$$，再与充分大的闭球相交）.

下证 $$\bigcap_{j=1}^{k}(K+j\vec{a})\neq\varnothing$$ 对 $$|\vec{a}|$$ 足够小成立.

由命题 2.10，取 $$\delta>0$$ 使

$$
mK_\delta<\frac{k}{k-1}\,mK .
$$

（$$K_\delta$$ 有界，测度有限，可用性由紧集 $$\delta$$-邻域命题保证.）只要 $$|\vec{a}|<\delta/k$$，则对每个 $$1\le j\le k$$：

$$
K+j\vec{a}\subseteq K_\delta
\qquad\big(d(x+j\vec{a},K)\le j|\vec{a}|<\delta\big),
$$

且有

$$
\sum_{j=1}^{k}m(K+j\vec{a})=k\,mK>(k-1)\,mK_\delta
\qquad(\text{平移不变性}).
$$

对 $$B=K_\delta$$ 与 $$A_j=K+j\vec{a}$$ 应用引理 2.4，得

$$
\bigcap_{j=1}^{k}(K+j\vec{a})\neq\varnothing
\Longrightarrow
\bigcap_{j=1}^{k}(A+j\vec{a})\neq\varnothing .
$$

等价形式：设 $$y\in\bigcap_j(K+j\vec{a})$$，则 $$y-j\vec{a}\in K\subseteq A$$ 对一切 $$j$$，取 $$\tilde{x}=y$$ 即可. $$\square$$

<div class="theorem">

**定理 2.4（Steinhaus 定理 2）**

设 $$mA>0$$，则 $$A-A:=\{\tilde{x}-\tilde{y}:\ \tilde{x},\tilde{y}\in A\}$$ 包含 $$0$$ 的一个邻域.

</div>

**证明** 首先注意恒等式

$$
A-A=\{a\in\mathbb{R}^n:\ A\cap(A+a)\neq\varnothing\}:
$$

$$a\in A-A$$ 即 $$a=\tilde{x}-\tilde{y}$$，此时 $$\tilde{x}=\tilde{y}+a\in A\cap(A+a)$$；反之若 $$z\in A\cap(A+a)$$，则 $$z=(z+a)-a\in A-A$$.

由 Steinhaus 定理 1（取 $$k=2$$），存在 $$\delta>0$$，只要 $$|a|<\delta$$ 就有 $$A\cap(A+a)\neq\varnothing$$，即 $$a\in A-A$$. 故 $$B_\delta(0)\subseteq A-A$$. $$\square$$

<div class="lemma">

**引理 2.5（密度引理）**

若 $$mA>0$$，则 $$\forall\varepsilon\in(0,1)$$，存在方体 $$I$$，使得

$$
\frac{m(I\cap A)}{mI}>1-\varepsilon .
$$

</div>

<div class="center">

![密度引理示意](fig/density-lemma.png)

**图 2.2**　密度引理：存在方体 $$I$$ 使 $$A$$ 在 $$I$$ 中的占比任意接近 $$1$$

</div>

**证明** 由定义，$$mA=\inf\{\sum_j mI_j:\ A\subseteq\bigcup_j I_j\}>0$$，故可取方体列 $$\{I_j\}$$，$$A\subseteq\bigcup_j I_j$$，使

$$
1-\varepsilon<\frac{mA}{\sum_j mI_j}
=\frac{\sum_j m(A\cap I_j)}{\sum_j mI_j}
\le\sup_j\frac{m(A\cap I_j)}{mI_j},
$$

（第一个等式因 $$mA=m\big(\bigcup_j(A\cap I_j)\big)$$ $$\le\sum_j m(A\cap I_j)\le\sum_j mI_j$$ 且 $$mA/\sum_j mI_j\le1$$）. 取 $$I=I_{j_0}$$ 达到该上确界即已得证. $$\square$$

**注** 方体 $$I$$ 的顶点坐标可都取为有理数：因为 $$(I$$ 的各顶点坐标$$)\mapsto\dfrac{m(A\cap I)}{mI}$$ 是顶点坐标的连续函数（$$m(A\cap I)$$ 与 $$mI$$ 都随顶点连续变化：$$|m(A\cap I)-m(A\cap I')|$$ $$\le m(I\triangle I')\to0$$），故可在保持不等号的前提下把顶点有理化. 这一事实将在 Steinhaus 定理 3 中用到.

<div class="theorem">

**定理 2.5（Steinhaus 定理 3）**

设 $$mA,\ mB>0$$，则 $$A-B$$ 有内点.

</div>

**证明** **Step 1.** 存在方体 $$Q$$、$$Q'$$ 与平移向量 $$\vec{a}'\in\mathbb{R}^n$$，使 $$Q=Q'+\vec{a}'$$（即 $$Q'$$ 平移 $$\vec{a}'$$ 后与 $$Q$$ 重合），且

$$
\frac{m(B\cap Q')}{mQ'}>\frac23
\qquad\text{且}\qquad
\frac{m(A\cap Q)}{mQ}>\frac23 .
$$

由密度引理（引理 2.5）及有理化注记，存在**有理方体**（顶点坐标均为有理数）$$I$$、$$J$$，使

$$
\frac{m(A\cap I)}{mI}>\frac23,\qquad
\frac{m(B\cap J)}{mJ}>\frac23 .
$$

把有理方体 $$I$$、$$J$$ 用同一张有理格网作有限分划：

$$
I=\bigsqcup_{i}Q_i,\qquad J=\bigsqcup_{j}Q'_j,
$$

且诸 $$Q_i$$ 与诸 $$Q'_j$$ 彼此平移重合（同一尺寸、有理端点）. 于是

$$
\frac23<\frac{m(A\cap I)}{mI}
=\frac{\sum_i m(A\cap Q_i)}{\sum_i mQ_i}
\le\max_i\frac{m(A\cap Q_i)}{mQ_i},
$$

同理 $$\dfrac23<\dfrac{m(B\cap J)}{mJ}\le\max_j\dfrac{m(B\cap Q'_j)}{mQ'_j}$$. 取 $$Q=Q_{i_0}$$、$$Q'=Q'_{j_0}$$ 达到各自的 max，并令 $$\vec{a}'$$ 为由 $$Q'_{j_0}$$ 指向 $$Q_{i_0}$$ 的平移向量，即得所需.

**Step 2.** 构建联系：$$m\big((B+\vec{a}')\cap A\big)>0$$. 因 $$B\cap Q'+\vec{a}'\subseteq Q'+\vec{a}'=Q$$，故

$$
\begin{aligned}
m\big((B+\vec{a}')\cap A\big)
&\ge m\big((B\cap Q'+\vec{a}')\cap(A\cap Q)\big)\\
&=m(B\cap Q'+\vec{a}')+m(A\cap Q)
-m\big((B\cap Q'+\vec{a}')\cup(A\cap Q)\big)\\
&\ge m(B\cap Q')+m(A\cap Q)-mQ\\
&>\frac23mQ'+\frac23mQ-mQ=\frac13mQ>0 .
\end{aligned}
$$

**Step 3.** $$A-B$$ 有内点. 记 $$D:=(B+\vec{a}')\cap A$$，则 $$mD>0$$. 由 Steinhaus 定理 2，$$D-D$$ 以 $$0$$ 为内点；而

$$
D-D=\big(A\cap(B+\vec{a}')\big)-\big(A\cap(B+\vec{a}')\big)
\subseteq A-(B+\vec{a}')=(A-B)-\vec{a}' ,
$$

故 $$(A-B)-\vec{a}'$$ 包含 $$0$$ 的邻域，即 $$A-B$$ 以 $$\vec{a}'$$ 为内点. $$\square$$

<div class="theorem">

**定理 2.6（Brunn–Minkowski 不等式）**

设 $$A,B\subseteq\mathbb{R}^n$$ 是正测集，则

$$
\big(m^*(A+B)\big)^{\frac1n}\ge(mA)^{\frac1n}+(mB)^{\frac1n}.
$$

</div>

为证明该定理，先建立一个分拆引理.

<div class="lemma">

**引理 2.6（方体族的超平面分拆）**

设 $$A=\bigsqcup_{i=1}^{N}Q_i$$ 是 $$N\ge2$$ 个（非退化）闭方体之并，诸 $$Q_i$$ 内部两两不交. 则存在坐标轴方向 $$k$$ 与实数 $$t$$，使得

$$
A_+:=A\cap\{x_k>t\},\qquad A_-:=A\cap\{x_k<t\}
$$

都能表示为至多 $$N-1$$ 个内部不交的非退化方体之并，且均非空（从而测度为正）.

</div>

**证明** 对 $$(n,N)$$ 作字典序强归纳（$$n\ge1$$，$$N\ge1$$）.

$$n=1$$：方体即区间，内部不交即无公共点. 将 $$N$$ 个区间从左到右排序，取 $$t$$ 为相邻两区间之间的任一值：两侧各含至少一个区间（个数 $$\le N-1$$），结论成立.

$$n\ge2$$，$$N=1$$：无需分拆（本引理仅在 $$N\ge2$$ 时使用）. $$n\ge2$$，$$N=2$$：两方体内部不交，则存在坐标 $$k$$ 使二者在 $$x_k$$ 方向的投影区间内部不交（否则各坐标投影内部均相交，两个方体的内部便相交，矛盾）. 取 $$t$$ 于两投影之间（可取公共端点），两侧各含一个方体.

$$n\ge2$$，$$N\ge3$$：考虑 $$x_1$$ 方向，取右端点最小的方体 $$Q_*=Q_{i_*}$$，记 $$r_*=r_{i_*}:=\min_i r_i$$（$$r_i$$ 为 $$Q_i$$ 在 $$x_1$$ 方向的右端点）. 称 $$Q_j$$ “跨越“ $$x_1=r_*$$，若 $$l_j<r_*<r_j$$（$$l_j$$ 为左端点）.

**情形 1：无方体跨越.** 则超平面 $$\{x_1=r_*\}$$ 不穿过任何方体内部：$$Q_*$$ 及所有 $$r_j=r_*$$ 的方体位于 $$\{x_1<r_*\}$$ 一侧（内部严格在左），其余方体（$$l_j\ge r_*$$）位于右侧（内部严格在右）. 若右侧含某方体则 $$t=r_*,\ k=1$$ 即为所求（两侧各含 $$\ge1$$ 个方体，总数 $$\le N-1$$）. 若右侧无方体，则一切 $$r_j=r_*$$：所有 $$x_1$$-投影 $$[l_j,r_*]$$ 的内部 $$(l_j,r_*)$$ 两两相交，故任何一对方体都不能被 $$x_1$$ 方向分离；于是它们在其余坐标上两两分离，即投影 $$\widetilde{Q}_j=\operatorname{proj}_{x_2,\cdots,x_n}(Q_j)\subseteq\mathbb{R}^{n-1}$$ 内部两两不交（否则某对 $$\widetilde{Q}_i,\widetilde{Q}_j$$ 内部相交，结合 $$x_1$$-投影内部相交便得 $$Q_i,Q_j$$ 内部相交，矛盾）. 对 $$\{\widetilde{Q}_j\}_{j=1}^{N}$$ 在维数 $$n-1$$ 中用归纳假设（$$(n-1,N)\prec(n,N)$$），得轴 $$k\in\{2,\cdots,n\}$$ 与 $$s$$ 使 $$\{x_k=s\}$$ 不穿过任何 $$\widetilde{Q}_j$$ 的内部且两侧非空. 该超平面在 $$\mathbb{R}^n$$ 中不穿过任何 $$Q_j$$ 的内部（$$x_k$$-投影即 $$\widetilde{Q}_j$$ 的 $$x_k$$-投影），且两侧各含方体，即为所求.

**情形 2：有方体跨越.** 考虑去掉 $$Q_*$$ 的方体族 $$\{Q_j\}_{j\neq i_*}$$（共 $$N-1$$ 个，内部不交）. 由归纳假设（$$(n,N-1)\prec(n,N)$$），存在轴 $$k$$ 与 $$s$$，使得 $$\{x_k=s\}$$ 不穿过这 $$N-1$$ 个方体的任何一个的内部，且 $$\{Q_j\}_{j\ne i_*}$$ 在两侧各有至少一个方体.

- 若 $$\{x_k=s\}$$ 也不穿过 $$Q_*$$ 的内部，则它是 $$A$$ 的“干净”分拆超平面，两侧各含 $$\ge1$$ 个完整方体，个数 $$\le N-1$$，得证.
- 若它穿过 $$Q_*$$ 的内部（$$s\in(l_{i_*},r_{i_*})$$），则 $$Q_*\cap\{x_k>s\}$$ 与 $$Q_*\cap\{x_k<s\}$$ 都是**非退化方体**，分属两侧；连同 $$\{Q_j\}_{j\ne i_*}$$ 在两侧的方体，两侧方体个数分别为

    $$
    \le(N-2)+1=N-1 ,
    $$

    且两侧均非空，同样得证. $$\square$$

**证明**（定理 2.6 的证明） **Step 1.** $$A,B$$ 都是（闭）方体，则 $$A+B$$ 也是方体，亦可测. 设 $$A=\prod_i[a_i,b_i]$$，$$B=\prod_i[c_i,d_i]$$，记 $$L_i=(b_i-a_i)+(d_i-c_i)>0$$，$$\alpha_i=\dfrac{b_i-a_i}{L_i}\in(0,1)$$. 由算术–几何平均不等式，

$$
\Big(\prod_i\alpha_i\Big)^{\frac1n}+\Big(\prod_i(1-\alpha_i)\Big)^{\frac1n}
\le\frac{\sum_i\alpha_i}{n}+\frac{\sum_i(1-\alpha_i)}{n}=1,
$$

从而

$$
\big(\textstyle\prod_i L_i\big)^{\frac1n}
\ge\big(\prod_i(b_i-a_i)\big)^{\frac1n}+\big(\prod_i(d_i-c_i)\big)^{\frac1n},
$$

此即 $$m(A+B)^{\frac1n}\ge(mA)^{\frac1n}+(mB)^{\frac1n}$$（$$A+B=\prod_i[a_i+c_i,\ b_i+d_i]$$）.

**Step 2.** $$A,B$$ 都是有限个内部不交方体之并，对 $$M:=N_A+N_B$$ 作归纳（$$M\ge2$$）. 由 Step 1 知 $$M=2$$ 时成立.

设 $$M\ge3$$. 不妨 $$N_A\ge2$$（否则 $$N_B\ge2$$，而不等式关于 $$A,B$$ 对称，交换角色即可）. 由引理 2.6，取轴 $$k$$ 与 $$t$$，使

$$
A_+=A\cap\{x_k>t\},\quad A_-=A\cap\{x_k<t\}
$$

均为至多 $$N_A-1$$ 个内部不交非退化方体之并且均非空.

沿 $$x_k$$ 轴平移 $$B$$：$$B_s=B+s\vec{e}_k$$. 函数

$$
\rho(s):=\frac{m\big(B_s\cap\{x_k>t\}\big)}{mB}
$$

连续（有限个方体各贡献一个连续的“分布函数”：方体被超平面 $$\{x_k=t-s\}$$ 截出的截口测度为零），且 $$\rho(-\infty)=0$$、$$\rho(+\infty)=1$$. 取 $$s^*$$ 使

$$
\rho(s^*)=\alpha:=\frac{mA_+}{mA}\in(0,1).
$$

记 $$B_+:=B_{s^*}\cap\{x_k>t\}$$，$$B_-:=B_{s^*}\cap\{x_k<t\}$$，则 $$B_\pm$$ 均非空、可测，各为至多 $$N_B$$ 个内部不交方体之并，且

$$
mB_+=\alpha\,mB,\qquad mB_-=(1-\alpha)\,mB .
$$

注意

$$
A_++B_+\subseteq\{x_k>2t\},\qquad
A_-+B_-\subseteq\{x_k<2t\},
$$

二者不相交，且都是有限个方体之并（方体之和仍是方体），故可测. 于是

$$
\begin{aligned}
m\big(A+B_{s^*}\big)
&\ge m\Big((A_++B_+)\sqcup(A_-+B_-)\Big)\\
&=m(A_++B_+)+m(A_-+B_-)\\
&\ge\Big((mA_+)^{\frac1n}+(mB_+)^{\frac1n}\Big)^{n}
+\Big((mA_-)^{\frac1n}+(mB_-)^{\frac1n}\Big)^{n}
\qquad(\text{归纳假设，子问题复杂度}<M)\\
&=\Big(\alpha^{\frac1n}\big((mA)^{\frac1n}+(mB)^{\frac1n}\big)\Big)^{n}
+\Big((1-\alpha)^{\frac1n}\big((mA)^{\frac1n}+(mB)^{\frac1n}\big)\Big)^{n}\\
&=\Big((mA)^{\frac1n}+(mB)^{\frac1n}\Big)^{n}.
\end{aligned}
$$

由平移不变性 $$m(A+B_{s^*})=m(A+B)$$，两边开 $$n$$ 次方即得.

**Step 3.** $$A,B$$ 是紧集. $$\forall\varepsilon>0$$，由内正则性与紧集 $$\delta$$-邻域命题，存在有限方体并 $$A_\varepsilon,B_\varepsilon$$ 使

$$
A\subseteq A_\varepsilon\subseteq A+B_\varepsilon(0),\qquad
B\subseteq B_\varepsilon\subseteq B+B_\varepsilon(0),
$$

且 $$mA_\varepsilon\downarrow mA$$、$$mB_\varepsilon\downarrow mB$$（取逐次加细的格网，与 $$A$$ 相交的格胞之并递减到 $$A$$）. 则

$$
\begin{aligned}
m\big((A+B)+B_{2\varepsilon}(0)\big)^{\frac1n}
&\ge m\big((A+B_\varepsilon(0))+(B+B_\varepsilon(0))\big)^{\frac1n}\\
&\ge m(A_\varepsilon+B_\varepsilon)^{\frac1n}\\
&\ge(mA_\varepsilon)^{\frac1n}+(mB_\varepsilon)^{\frac1n}
\qquad(\text{Step 2})\\
&\ge(mA-\varepsilon)^{\frac1n}+(mB-\varepsilon)^{\frac1n}.
\end{aligned}
$$

令 $$\varepsilon\to0^+$$，左端由紧集 $$\delta$$-邻域命题（对紧集 $$A+B$$）趋于 $$m(A+B)^{\frac1n}$$，即得.

**Step 4.** $$A,B$$ 是一般正测集. 由内正则性（紧集版本）：

$$
\begin{aligned}
(mA)^{\frac1n}+(mB)^{\frac1n}
&=\Big(\sup_{\text{紧}K_A\subseteq A}mK_A\Big)^{\frac1n}
+\Big(\sup_{\text{紧}K_B\subseteq B}mK_B\Big)^{\frac1n}\\
&=\sup_{K_A,K_B}\Big((mK_A)^{\frac1n}+(mK_B)^{\frac1n}\Big)\\
&\overset{\text{Step 3}}{\le}\ \sup_{K_A,K_B}\big(m(K_A+K_B)\big)^{\frac1n}\\
&\le\ \sup_{\text{紧}K\subseteq A+B}(mK)^{\frac1n}
\ \le\ \big(m^*(A+B)\big)^{\frac1n},
\end{aligned}
$$

其中末步用 $$K_A+K_B\subseteq A+B$$ 与外测度的单调性. 综上定理得证. $$\square$$

## 2.6 不可测集（以 Vitali 集为例）

<div class="definition">

**定义 2.4（Vitali 集）**

称 $$A\subseteq\mathbb{R}$$ 是 **Vitali 集**（$$V$$ 集），若

1. $$\forall r\neq s\in\mathbb{Q}$$，$$(A+r)\cap(A+s)=\varnothing$$；
2. $$\mathbb{R}=A+\mathbb{Q}$$.

$$\mathbb{R}^n$$ 中的 Vitali 集 $$V$$ 定义为：

1. $$\forall\vec{r}\neq\vec{s}\in\mathbb{Q}^n$$，$$(V+\vec{r})\cap(V+\vec{s})=\varnothing$$；
2. $$\mathbb{R}^n=V+\mathbb{Q}^n$$.

</div>

由选择公理（从 $$\mathbb{R}/\mathbb{Q}$$ 的每个等价类中取一点），Vitali 集存在.

<div class="proposition">

**命题 2.12（Vitali 集的等价刻画）**

设 Vitali 集 $$A\subseteq\mathbb{R}$$. 把 $$\mathbb{R}$$ 视为 $$\mathbb{Q}$$-线性空间，商空间 $$\mathbb{R}/\mathbb{Q}=\{[x]:\ x\in\mathbb{R}\}$$，则 $$A\cap[x]$$ 是单点集，$$\forall x\in\mathbb{R}$$.

</div>

**证明** 定义 (2)（$$\mathbb{R}=A+\mathbb{Q}$$）保证 $$A\cap[x]\neq\varnothing$$：$$x=a+q$$，$$a\in A$$，则 $$[x]=[a]\ni a$$. 定义 (1) 保证 $$A\cap[x]$$ 至多一点：若 $$a,a'\in A\cap[x]$$，则 $$a-a'\in\mathbb{Q}$$，即 $$a=a'+r$$，$$r\in\mathbb{Q}$$；若 $$r\neq0$$ 则 $$a\in(A+r)\cap A$$，与 (1) 矛盾（取 $$s=0$$）. 故 $$a=a'$$. $$\square$$

<div class="proposition">

**命题 2.13（Vitali 集 $$L$$-不可测）**

Vitali 集是 $$L$$-不可测集.

</div>

**证明** 反设 Vitali 集 $$A$$ 可测.

**Case 1.** $$mA>0$$. 由 Steinhaus 定理 2（定理 2.4），$$A-A$$ 以 $$0$$ 为内点，故存在 $$r\in\mathbb{Q}\setminus\{0\}$$ 充分小使 $$A\cap(A+r)\neq\varnothing$$，与定义 (1) 矛盾.

**Case 2.** $$mA=0$$. 由 $$\mathbb{R}=A+\mathbb{Q}=\bigsqcup_{r\in\mathbb{Q}}(A+r)$$（不交性由 (1) 给出）与可数可加性、平移不变性：

$$
m\mathbb{R}=\sum_{r\in\mathbb{Q}}m(A+r)=\sum_{r\in\mathbb{Q}}mA=0,
$$

与 $$m\mathbb{R}=+\infty$$ 矛盾.

故 $$A$$ 不可测. $$\square$$

**注**（由 Hamel 基到 Vitali 集） 称 $$H\subseteq\mathbb{R}$$ 是 $$\mathbb{R}$$ 的 **Hamel 基**，若 $$\mathbb{R}=\operatorname{span}_{\mathbb{Q}}(H)$$，且

1. $$\forall\{x_i\}_{i=1}^{k}\subseteq H$$，$$\sum_{i=1}^{k}q_ix_i=0\Rightarrow q_i=0$$（$$q_i\in\mathbb{Q}$$，线性无关）；
2. $$\forall x\in\mathbb{R}$$，$$\exists\{x_i\}_{i=1}^{k}\subseteq H$$、$$\{q_i\}_{i=1}^{k}\subseteq\mathbb{Q}$$，使 $$x=\sum_{i=1}^{k}q_ix_i$$（张成）.

其存在性由 Zorn 引理保证（所有线性无关组按包含关系构成偏序集，链之并为线性无关的上界）.

现设 $$1\in H$$，则

$$
A:=\operatorname{span}_{\mathbb{Q}}\big(H\setminus\{1\}\big)\subseteq\mathbb{R}
$$

是 Vitali 集（即 $$A$$ 是余维数为 $$1$$ 的子集）：

- 若 $$r\neq s\in\mathbb{Q}$$ 且 $$(A+r)\cap(A+s)\neq\varnothing$$，则 $$a+r=a'+s$$，$$a,a'\in A$$，故 $$r-s=a'-a\in\operatorname{span}_\mathbb{Q}(H\setminus\{1\})$$；又 $$r-s=(r-s)\cdot 1$$，由基的唯一表示性得 $$r-s=0$$，矛盾.
- 任取 $$x=\sum q_ix_i\in\mathbb{R}$$（Hamel 表示），把含 $$1$$ 的项单独写出 $$x=a+q_0\cdot1$$，其中 $$a\in A$$，$$q_0\in\mathbb{Q}$$，故 $$\mathbb{R}=A+\mathbb{Q}$$.

<div class="proposition">

**命题 2.14（正测集必含不可测集）**

$$\forall$$ 正测集 $$E\subseteq\mathbb{R}^n$$，存在不可测集 $$A\subseteq E$$.

</div>

**证明** 取 $$\mathbb{R}^n$$ 中的 Vitali 集 $$V$$. 由 $$\mathbb{R}^n=V+\mathbb{Q}^n$$，

$$
E=E\cap\mathbb{R}^n=E\cap\Big(\bigcup_{\vec{r}\in\mathbb{Q}^n}(V+\vec{r})\Big)
=\bigcup_{\vec{r}\in\mathbb{Q}^n}\big((V+\vec{r})\cap E\big),
$$

故由次可加性

$$
0<m^*E\le\sum_{\vec{r}\in\mathbb{Q}^n}m^*\big((V+\vec{r})\cap E\big),
$$

从而存在 $$\vec{r}\in\mathbb{Q}^n$$ 使 $$m^*\big((V+\vec{r})\cap E\big)>0$$. 记 $$A:=(V+\vec{r})\cap E$$.

若 $$A$$ 可测，则由内正则性存在紧集 $$K\subseteq A$$，$$mK>0$$. 此时 $$\{K+\vec{s}\}_{\vec{s}\in\mathbb{Q}^n}$$ 两两不交：$$K+\vec{s}\subseteq V+\vec{r}+\vec{s}$$，而 $$\vec{r}+\vec{s}$$ 互不相同地取遍 $$\mathbb{Q}^n$$，由 Vitali 性质 (1) 即得不交. 令

$$
H:=\bigsqcup_{\vec{s}\in\mathbb{Q}^n\cap[-1,1]^n}(K+\vec{s})
\subseteq K+[-1,1]^n ,
$$

则 $$H$$ 有界，$$mH<\infty$$；另一方面由不交性与平移不变性、可数可加性

$$
mH=\sum_{\vec{s}\in\mathbb{Q}^n\cap[-1,1]^n}mK=+\infty,
$$

矛盾. 故 $$A$$ 不可测，即为所求. $$\square$$