---
layout: note
kind: note
title: "第二章　Lebesgue 测度"
course: realanalysis
order: 2
date: 2026-10-25
---

本章给 $$\mathbb{R}^n$$ 中的集合赋予"长度/体积"：从外测度出发，用 Carathéodory 条件选出可测集类，证明它是 σ-代数且测度在其上可数可加；随后讨论可测集的结构定理、Vitali 不可测集、一般测度的扩张（Carathéodory 定理与 Lebesgue–Stieltjes 测度）、完备化与乘积测度预备。

## 2.1 外测度

**定义（方体）.** $$I = \prod_{k=1}^n (a_k, b_k)$$，体积 $$\mathrm{vol}(I) = \prod_{k=1}^n (b_k - a_k)$$。

**定义（Lebesgue 外测度）.** 对 $$E \subseteq \mathbb{R}^n$$，

$$
m^*(E) = \inf\left\{ \sum_{j=1}^{\infty} \mathrm{vol}(I_j) : E \subseteq \bigcup_{j=1}^{\infty} I_j,\ I_j \text{ 为开方体} \right\}
$$

约定 $$m^*(\emptyset) = 0$$，取值于 $$[0, +\infty]$$。

**命题 2.1（外测度的基本性质）.**

（i）非负性：$$m^*(E) \ge 0$$，$$m^*(\emptyset) = 0$$；

（ii）单调性：$$E \subseteq F \Rightarrow m^*(E) \le m^*(F)$$；

（iii）次可数可加性：$$m^*\left(\bigcup_j E_j\right) \le \sum_j m^*(E_j)$$；

（iv）平移不变性：$$m^*(E + x) = m^*(E)$$。

**证明.** （iii）：任给 $$\varepsilon > 0$$，对每个 $$E_j$$ 取开方体覆盖使 $$\sum_k \mathrm{vol}(I_j^{(k)}) \le m^*(E_j) + \varepsilon/2^j$$；合并所有方体即得 $$E$$ 的覆盖，令 $$\varepsilon \to 0$$。∎

**例.** 可数集的外测度为 $$0$$：$$m^*(\mathbb{Q} \cap [0,1]) = 0$$（单点覆盖长度 $$\varepsilon/2^j$$）。

**例（区间的外测度 = 长度）.** $$m^*((a,b)) = b - a$$。

**证明.** "≤"：用自身覆盖。"≥"：对 $$[a+\delta,\, b-\delta]$$ 的任意开覆盖取有限子覆盖（紧性），令 $$\delta \to 0$$。∎

**命题 2.2（距离外测度性质）.** 若 $$d(E, F) > 0$$，则 $$m^*(E \cup F) = m^*(E) + m^*(F)$$。

**证明.** 把 $$E \cup F$$ 的覆盖分解为直径小于 $$d(E,F)$$ 的方体，则每个方体至多与 $$E$$、$$F$$ 之一相交，分成两族分别覆盖。∎

> 外测度在全体集合上**不是**可数可加的（见 2.3 的 Vitali 集），因此需要把"可测"的集合从一般集合中甄别出来。

## 2.2 可测集与可数可加性

**定义（Carathéodory 条件）.** $$E \subseteq \mathbb{R}^n$$ 称为 Lebesgue 可测，若对任意 $$T \subseteq \mathbb{R}^n$$，

$$
m^*(T) = m^*(T \cap E) + m^*(T \setminus E).
$$

直观：$$E$$ 可测 $$\iff$$ $$E$$ 能把任一集合的外测度"精确分割"成两部分。可测集全体记为 $$\mathcal{M}$$。

**例.** $$\emptyset$$、$$\mathbb{R}^n$$、外测度为零的集合均可测。

**定理 2.1.** $$\mathcal{M}$$ 是 σ-代数（从而包含所有 Borel 集），且限制 $$m := m^*\vert_{\mathcal{M}}$$ 在 $$\mathcal{M}$$ 上可数可加，构成完备测度。

**证明要点.** 补集封闭：在 Carathéodory 条件中交换 $$E$$ 与 $$E^c$$ 的角色。有限并封闭：对 $$T$$ 用条件拆分两次。可数并封闭：对 $$T \cap \bigcup_j E_j$$ 归纳 + $$\varepsilon/2^j$$ 技巧，再由次可加性取极限；"≥"方向先对有限并取等号，再用递增集列的逼近。∎

**推论.** 开集、闭集、$$G_\delta$$ 集、$$F_\sigma$$ 集均可测。

**定理 2.2（可数可加性）.** 若 $$\{E_j\}$$ 是两两不交的可测集，则

$$
m\left(\bigcup_{j=1}^{\infty} E_j\right) = \sum_{j=1}^{\infty} m(E_j).
$$

**证明.** "≤"为次可加性；"≥"先对有限并证明（对 $$\bigcup_{j\le N} E_j$$ 用 Carathéodory 条件，$$T = \bigcup_j E_j$$），再令 $$N \to \infty$$。∎

**推论（测度的连续性）.** 若 $$E_j \nearrow E$$，则 $$m(E) = \lim_j m(E_j)$$；若 $$E_j \searrow E$$ 且 $$m(E_1) < \infty$$，则 $$m(E) = \lim_j m(E_j)$$。

## 2.3 不可测集的存在性

**定理 2.3（Vitali）.** 存在 $$\mathbb{R}$$ 的子集不是 Lebesgue 可测的。

**证明.** 在 $$[0,1)$$ 上定义等价关系 $$x \sim y \iff x - y \in \mathbb{Q}$$，由选择公理从每个等价类中取一点组成代表集 $$V$$。

设 $$\{r_j\} = \mathbb{Q} \cap [-1, 1)$$，则平移族 $$\{V + r_j\}$$ 两两不交，且

$$
[0,1) \subseteq \bigcup_j (V + r_j) \subseteq [-1, 2).
$$

若 $$V$$ 可测，由平移不变性与可数可加性：

$$
1 \le m\left(\textstyle\bigcup_j (V + r_j)\right) = \sum_j m(V) \le 3,
$$

但 $$\sum_j m(V)$$ 当 $$m(V) = 0$$ 时为 $$0$$、当 $$m(V) > 0$$ 时为 $$+\infty$$，两种情形均矛盾。∎

**注.** 证明用到选择公理；"所有集合都可测"与选择公理不相容（Solovay 模型）。

## 2.4 可测集的结构

**定理 2.4（结构定理）.** 对 $$E \subseteq \mathbb{R}^n$$，以下等价：

（1）$$E$$ 可测；

（2）$$\forall \varepsilon > 0$$，存在开集 $$G \supseteq E$$ 使 $$m^*(G \setminus E) < \varepsilon$$；

（3）存在 $$G_\delta$$ 集 $$G \supseteq E$$ 使 $$m(G \setminus E) = 0$$；

（4）存在 $$F_\sigma$$ 集 $$F \subseteq E$$ 使 $$m(E \setminus F) = 0$$。

**证明要点.** （1）⇒（2）：先把 $$E$$ 截成有界块（$$E_k = E \cap B_k$$），对每块用外测度定义取方体覆盖作开集，误差 $$\varepsilon/2^k$$ 求和。（2）⇒（3）：取 $$G_k$$ 使 $$m^*(G_k \setminus E) < 1/k$$，令 $$G = \bigcap_k G_k$$。（3）⇒（1）：$$E = G \setminus (G \setminus E)$$，零测集可测。（4）：对 $$E^c$$ 用（3）。∎

**推论（可测集的分解）.** $$E$$ 可测 $$\iff$$ $$E = B \cup N$$，其中 $$B$$ 为 Borel 集、$$m(N) = 0$$（或 $$E = B \setminus N$$）。

> 直观：**可测集 = Borel 集整体 + 零测集的修饰**。

## 2.5 平移不变性与正则性

**命题.** 若 $$E$$ 可测，则 $$m(E + x) = m(E)$$（$$x \in \mathbb{R}^n$$）。

**定理 2.5（正则性）.** $$E$$ 可测时，

$$
m(E) = \inf\{m(G) : G \text{开} \supseteq E\} = \sup\{m(K) : K \text{紧} \subseteq E\}.
$$

**证明要点.** 外测度定义直接给外正则（开覆盖）；内正则：$$E \cap \overline{B}_k \nearrow E$$，对有界情形用结构定理（4）中闭集逼近 + 紧性。∎

**例.** Cantor 集 $$C$$ 的测度：$$C$$ 是零测集（第一章已算删除总长为 1，或 $$C \subseteq G_k$$，$$m(G_k) = (2/3)^k \to 0$$）。

## 2.6 Steiner 对称化

（几何应用：等周不等式等的测度论预备。）

**定义（关于超平面的对称化）.** 设 $$E \subseteq \mathbb{R}^n$$，$$H$$ 为超平面。把每条与 $$H$$ 垂直的弦"中点移到 $$H$$ 上"所得的集合记为 $$E^S$$。

**命题.** $$m(E^S) = m(E)$$（可由 Fubini 定理逐方向验证，或作为 Brunn–Minkowski 不等式的推论）。

**定理 2.6（等周不等式的预备）.** 若 $$E$$ 有界可测，则存在对称化序列使 $$m(E_k^S) = m(E)$$ 恒成立，而边界"周长"不增；极限图形是球——圆解决等周问题。

## 2.7 一般测度与 Carathéodory 扩张定理

**定义（代数上的预测度）.** 设 $$\mathcal{A}$$ 是 $$X$$ 上的代数（对有限并、补封闭），$$\mu_0 : \mathcal{A} \to [0, \infty]$$ 满足 $$\mu_0(\emptyset) = 0$$ 且在 $$\mathcal{A}$$ 内可数可加，称为预测度。

**定理 2.7（Carathéodory 扩张定理）.** $$\mu_0$$ 可以扩张为 $$\sigma(\mathcal{A})$$ 上的测度 $$\mu$$；若 $$\mu_0$$ 在 $$\mathcal{A}$$ 上 σ-有限，则扩张唯一。

**证明要点.** 令 $$\mu^*(E) = \inf\{\sum_j \mu_0(A_j) : E \subseteq \bigcup_j A_j,\ A_j \in \mathcal{A}\}$$，验证 $$\mu^*$$ 是外测度且每个 $$A \in \mathcal{A}$$ 满足 Carathéodory 条件；唯一性用单调类/λ-π 系论证。∎

**例.**

- Lebesgue 测度 = "长度"函数在方体（半开矩形）代数上的扩张；
- 乘积测度（2.10）= 矩形上 $$\mu \times \nu$$ 的扩张。

## 2.8 Lebesgue–Stieltjes 测度

**定义.** 设 $$F: \mathbb{R} \to \mathbb{R}$$ 单调递增、右连续。在形如 $$(a, b]$$ 的区间上定义 $$\mu_F((a,b]) = F(b) - F(a)$$，再作 Carathéodory 扩张。

**命题.** $$\mu_F$$ 是 Borel 测度，且 $$\mu_F((-\infty, x]) = F(x)$$。

**例（跳跃函数）.** $$F$$ 为阶梯函数时 $$\mu_F$$ 是纯点测度：$$\mu_F(\{a\}) = F(a) - F(a^-)$$（原子质量 = 跳跃高度）。

**定理 2.8.** Borel 测度与单调递增右连续函数（相差常数意义下）一一对应。

> 概率论的联系：分布函数 $$F$$ ↔ 概率测度 $$\mu_F$$（$$\mu_F(\mathbb{R}) = 1$$）。

## 2.9 完备化

**定义（完备性）.** 测度空间 $$(X, \mathcal{F}, \mu)$$ 完备：$$\mu(N) = 0$$、$$N' \subseteq N$$ $$\Rightarrow$$ $$N' \in \mathcal{F}$$。

**命题.** Lebesgue 测度空间 $$(\mathbb{R}^n, \mathcal{M}, m)$$ 是完备的；但 Borel σ-代数上的 $$m$$ 不完备（存在含于零测 Borel 集的非 Borel 子集，见 2.11）。

**定理 2.9.** 任何 σ-有限测度空间可以唯一完备化：$$\overline{\mathcal{F}} = \{B \cup N : B \in \mathcal{F},\ N \subseteq \text{零测集}\}$$。

**注.** 完备化不改变可积函数的积分值（零测集上的修改无影响）；$$\mathcal{M} = \overline{\mathcal{B}(\mathbb{R}^n)}$$。

## 2.10 乘积测度预备

（为第四章 Fubini 定理做准备。）

**定义（可测矩形）.** $$A \times B$$（$$A \in \mathcal{X}$$，$$B \in \mathcal{Y}$$），定义 $$(\mu \times \nu)(A \times B) = \mu(A)\,\nu(B)$$，再由 Carathéodory 扩张得到乘积测度。

**命题（截口的可测性）.** 设 $$E \in \mathcal{X} \otimes \mathcal{Y}$$，则每个截口 $$E_y = \{x : (x, y) \in E\} \in \mathcal{X}$$；且 $$\mu \times \nu$$ σ-有限时，$$y \mapsto \mu(E_y)$$ 可测。

**例.** $$\mathbb{R}^2$$ 上的 Lebesgue 测度 = $$m \times m$$；σ-有限性对截口函数性质不可省。

## 2.11 可测集类的大小与 Cantor 函数

**命题.** $$\mathcal{M}$$（Lebesgue 可测集全体）的基数为 $$2^{2^{\aleph_0}}$$，而 Borel 集全体的基数只有 $$2^{\aleph_0}$$：**存在 Lebesgue 可测的非 Borel 集**（且"大多数"可测集不是 Borel 集）。

**定义（Cantor 函数 / 魔鬼楼梯）.** 在三进制删除区间上依次取常数 $$1/2, 1/4, \ldots$$，在 Cantor 集 $$C$$ 上连续延拓，所得 $$G: [0,1] \to [0,1]$$ 连续、递增、满射。

**性质.** $$G' = 0$$ a.e. 但 $$G$$ 非常数（与 Newton–Leibniz 公式的关系见第五章）。

**应用（非 Borel 可测集的构造）.** 令 $$H(x) = G(x) + x$$，则 $$H$$ 严格递增、连续，把零测的 Cantor 集映为正测度集 $$H(C)$$（$$m(H(C)) = 1$$）。取 $$H(C)$$ 的不可测子集 $$W$$，则 $$H^{-1}(W) \subseteq C$$ 可测（零测）但不是 Borel 集——否则 $$W = H(H^{-1}(W))$$ 将是 Borel 集。∎

## 2.12 习题选编

1. 证明：可数集的外测度为零；外测度为零的集合必可测。
2. 证明：$$E$$ 可测 $$\iff$$ 存在开集列从外部逼近（正则性演练）。
3. （Smith–Volterra–Cantor 集）每次删除区间长 $$\frac{1}{4^n}$$ 量级的中间开区间，得到正测度的无处稠密完全集——"胖 Cantor 集"。
4. 证明：$$\mathbb{R}$$ 上平移不变、规范化的 Borel 测度必为 Lebesgue 测度（常数倍）。
5. （Lebesgue–Stieltjes）给定单调递增右连续 $$F$$，写出 $$\mu_F$$ 在生成代数上的取值并验证预测度性质。
6. 常见错误辨析：$$m^*$$ 只在**可测集**上可数可加；次可加性对一般集合成立。

> **本章小结**：外测度（覆盖定义、次可加、平移不变）→ Carathéodory 可测性（σ-代数 + 完备测度 + 可数可加）→ 结构定理（开集/F_σ 逼近，Borel + 零测分解）→ Vitali 不可测集 → 扩张定理（一般测度、L–S 测度）→ 完备化与乘积测度预备。
