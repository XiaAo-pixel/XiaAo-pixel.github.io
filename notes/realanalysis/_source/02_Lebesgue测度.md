---
layout: note
kind: note
title: "第二章　Lebesgue 测度"
course: realanalysis
order: 2
date: 2026-10-25
---

## 1. Lebesgue 测度动机

希望找到"体积"的推广

$$(0)\quad m: \mathcal{P}(\mathbb{R}^d) \to [0, \infty]$$，s.t.

（1）$$m\Big(\prod_{i=1}^{d} (a_i, b_i)\Big) = (b_1 - a_1)(b_2 - a_2)\cdots(b_d - a_d)$$

（2）$$m(A) = m(\varphi(A))$$，$$A$$ 是任一刚体运动

（3）任意两两不交的集合列，$$m\Big(\bigcup_n A_n\Big) = \sum_n m(A_n)$$

事实上 (0)(1)(2)(3) 是不自洽的. 以 $$d = 1$$ 为例，

定义 $$x \sim y$$ iff $$x - y \in \mathbb{Q}$$. 商集 $$\mathbb{R}/\sim = \{[x] : x \in \mathbb{R}\}$$.

由选择公理，对 $$\forall [x]$$，取 $$\overline{x} \in [x] \cap [0, 1)$$，构成集合 $$A$$.

定义 $$A + r := \{\overline{x} + r \bmod \mathbb{Z} : \overline{x} \in A\}$$.

对 $$\forall r_1 \neq r_2 \in \mathbb{Q} \cap [0,1]$$，$$A + r_1 \cap A + r_2 = \emptyset$$.

（否则 $$\exists a_i \in A$$，$$a_1 + r_1 = a_2 + r_2 \Rightarrow a_1 - a_2 = r_2 - r_1 \in \mathbb{Q}$$）

同时，$$\forall x \in \mathbb{R}$$，$$\exists [\overline{y}]$$，s.t. $$x \in [\overline{y}]$$，$$\overline{y} \in A$$

$$\Rightarrow x - \overline{y} \in \mathbb{Q}$$. 记 $$r = x - \overline{y} \bmod \mathbb{Z}$$，则 $$x \in A + r$$.

从而 $$\bigcup_{r \in \mathbb{Q} \cap [0,1]} A + r = [0, 1]$$

$$
m\bigcup_{r \in \mathbb{Q} \cap [0,1]} A + r \ =\ \sum m(A + r) \ =\ \sum m(A) \ =\ \begin{cases} 0, & \text{if } m(A) = 0 \\ \infty, & \text{if } m(A) > 0 \end{cases}
$$

这与 $$m[0,1] = 1$$ 矛盾.

希望在 (0)、(3) 条件下作修改.

## 2. 外测度与 Lebesgue 测度

**def.**（outer measure）

$$
m^*(A) := \inf_{\substack{\text{开盒 } I_j \\ \text{s.t. } \bigcup I_j \supset A}} \sum \vert I_j\vert \qquad \text{则 } m^*: \mathcal{P}(\mathbb{R}^d) \to [0, \infty].
$$

**e.g.** 设 $$A$$ 可数，则 $$m^*A = 0$$.

pf. $$A = \{x_1, x_2, \cdots, x_n\}$$. $$\forall \varepsilon > 0$$，$$\exists$$ 方体 $$I_j \supset x_j$$，$$\vert I_j\vert < \dfrac{\varepsilon}{2^j}$$.

$$m^*A \leq \sum_{j \geq 1} \vert I_j\vert \leq \sum_{j \geq 1} \frac{\varepsilon}{2^j} \leq \varepsilon$$. 故 $$m^*A = 0$$.

**prop**

（1）$$\forall \delta > 0$$，记 $$m_\delta^*(A) = \sum \vert I_j\vert$$，$$\bigcup I_j \supset A$$ 且 $$I_j$$ 棱长小于 $$\delta$$，

则 $$\lim_{\delta \to 0^+} m_\delta^*(A) = m^*A$$.

（2）$$A \subset B \Rightarrow m^*A \leq m^*B$$.

（3）$$\forall \{A_j\} \subset \mathcal{P}(\mathbb{R}^d)$$，$$m^*\big(\bigcup A_j\big) \leq \sum m^*A_j$$.

pf. $$\forall \varepsilon > 0$$，$$\exists$$ 开盒 $$\{I_{j,k}\}_{k=1}^{\infty}$$ 覆盖 $$A_j$$，s.t.

$$m^*A_j \leq \sum \vert I_{j,k}\vert \leq m^*A_j + \dfrac{\varepsilon}{2^j}$$.

因 $$\bigcup_j A_j \subset \bigcup_k \bigcup_j I_{j,k}$$，从而

$$
m^* \bigcup_j A_j \ \leq\ m^* \bigcup_k \bigcup_j I_{j,k} \ =\ \sum_k \sum_j \vert I_{j,k}\vert
$$

$$
\leq\ \sum_j m^*A_j + \sum_j \frac{\varepsilon}{2^j} \ =\ \sum_j m^*A_j + \varepsilon.
$$

由 $$\varepsilon$$ 任意性即有 $$m^*\bigcup A_j \leq \sum m^*A_j$$. $$\square$$

（4）若 $$d(A, B) > 0$$，即 $$\inf_{a \in A,\, b \in B} \vert a - b\vert > 0$$，则 $$m^*(A \cup B) = m^*A + m^*B$$.

pf. 只需 $$m^*(A \cup B) \geq m^*A + m^*B$$.

对 $$\forall \varepsilon > 0$$，存在一致小的方体 $$\{I_j\}, \{I_{j'}\}$$ 覆盖 $$A, B$$，

且 $$I_j, I_{j'}$$ 不交，棱长小于 $$d(A, B)/2$$. 于是 $$\{I_j\} \cup \{I_{j'}\}$$ 覆盖 $$A \cup B$$

$$\varepsilon + m^*(A \cup B) \geq \sum \vert I_j\vert + \sum \vert I_{j'}\vert \geq m^*(A) + m^*(B)$$.

$$\square$$

（5）$$m^*A = \inf\limits_{\text{开集 } O \supset A} m^*O$$

pf. 开方体簇是开集的拓扑集.

$$\forall$$ 开集 $$O$$，$$O = \bigcup_{j=1}^{\infty} I_j$$

由单调性：$$m^*A \leq m^*O$$，从而 $$m^*A \leq \inf m^*O$$.

另一方面，$$\forall \varepsilon > 0$$，$$\exists \{I_j\}$$ 覆盖 $$A$$，且

$$\varepsilon + m^*A \geq \sum \vert I_j\vert \geq m^*O \geq \inf m^*O$$

从而 $$m^*A \geq \inf m^*O$$.

故 $$m^*A = \inf m^*O$$. $$\square$$

**def**（Caratheodory 条件）$$L$$-可测定义1.

若 $$A$$ 满足：$$\forall$$ 测试集 $$T \subset \mathbb{R}^d$$，

$$
m^*T = m^*(T \cap A) + m^*(T \cap A^c)
$$

则称 $$A$$ 为 Lebesgue 可测集.

**Thm.** Lebesgue 可测集构成 $$\sigma$$ 代数.

pf. 记 $$\mathscr{A} := \{A : A$$ 是 L 可测集$$\}$$.

（1）$$\emptyset \in \mathscr{A}$$

（2）$$A \in \mathscr{A} \Rightarrow A^c \in \mathscr{A}$$.（卡氏条件）

（3）$$\forall A, B \in \mathscr{A}$$，$$\forall T$$，有

$$
\begin{aligned}
m^*(T) &= m^*(T \cap A) + m^*(T \cap A^c) \\
&= m^*(T \cap A \cap B) + m^*(T \cap A \cap B^c) \\
&\quad + m^*(T \cap A^c \cap B) + m^*(T \cap A^c \cap B^c) \\
&\geq m^*(T \cap (A \cup B)) + m^*(T \cap (A \cup B)^c)
\end{aligned}
$$

另一方面，$$m^*(T) \leq m^*(T \cap (A \cup B)) + m^*(T \cap (A \cup B)^c)$$

从而 $$\forall T$$，$$m^*T = m^*(T \cap (A \cup B)) + m^*(T \cap (A \cup B)^c)$$.

即 $$A, B \in \mathscr{A} \Rightarrow A \cup B \in \mathscr{A}$$.

下只需证 $$\forall$$ 两两不交 $$\{A_j\}_{j=1}^{\infty} \subset \mathscr{A}$$，$$\bigcup A_j \in \mathscr{A}$$.

记 $$S_n := \bigsqcup_{j=1}^{n} A_j$$，$$S = \bigcup_{j=1}^{\infty} A_j$$，$$\forall T$$ 有界.

$$
m^*T = m^*(T \cap S_n) + m^*(T \cap S_n^c)
$$

$$
m^*(T \cap S_n) = \sum_{j=1}^{n} m^*(T \cap A_j) \quad \text{（递归）}
$$

由 $$m^*(T \cap S_n) \leq m^*(T \cap S) < \infty$$，有 $$\sum_{j=1}^{\infty} m^*(T \cap A_j)$$ 收敛.

一方面，$$m^*(T) \leq m^*(T \cap S) + m^*(T \cap S^c)$$.

另一方面，$$m^*(T) = m^*(T \cap S_n) + m^*(T \cap S_n^c)$$

$$
\geq m^*(T \cap S_n) + m^*(T \cap S^c)
$$

$$
m^*\big((T \cap S) \setminus (T \cap S_n)\big) = m^*\Big(\bigsqcup_{j=n+1}^{\infty} S_j\Big) \quad \text{（} m^*(T \cap S_n) = m^*(T \cap S) \text{）}
$$

$$
\leq \sum_{j=n+1}^{\infty} m^*S_j \ \to\ 0.
$$

从而 $$m^*(T) = m^*(T \cap S) + m^*(T \cap S^c)$$.

（旁注：$$A \subset B$$，$$m^*(B \setminus A) = 0$$ 时，$$m^*A \leq m^*B$$，且 $$m^*B = m^*(B \setminus A \cup A) \leq m^*A$$.）

**Prop.** 外测度为 0 的集合 L 可测.

$$\mathscr{A} \supset \{A \subset \mathbb{R}^d : m^*A = 0\}$$.

pf. $$\forall T$$，$$m^*T \leq m^*\, T \cap A + m^*\, T \cap A^c$$.

$$\leq m^*A + m^*T$$.

$$= m^*T$$.

故等号成立. $$\square$$

**def** 定义 $$m = m^*\vert_{\mathscr{A}} : \mathscr{A} \to [0, \infty]$$，称为（Lebesgue）测度.

$$m$$ 在满足 $$m^*$$ 性质的基础上，满足可数可加性：

$$\forall$$ 两两不交的集合 $$\{A_j\}_{j=1}^{\infty}$$，$$m(\bigsqcup A_j) = \sum m(A_j)$$.

## 3. 测度的基本性质

**Fact 1.** 设 $$m^*$$ 在不交集簇 $$\{A_j\}_{j=1}^{\infty}$$ 上有限可加，则可数可加.

pf.

$$
0 \leq \sum_{j=1}^{\infty} m^*(A_j) - m^*\Big(\bigsqcup_{j=1}^{\infty} A_j\Big) \leq \sum_{j=1}^{\infty} m^*(A_j) - m^*\Big(\bigsqcup_{j=1}^{n} A_j\Big)
$$

$$
= \sum_{j=1}^{\infty} m^*(A_j) - \sum_{j=1}^{n} m^*(A_j)
$$

不妨设 $$m^*(A_j) < \infty$$，则 RHS $$\to 0$$ ($$n \to \infty$$).

于是 $$m^*\Big(\bigsqcup_{j=1}^{\infty} A_j\Big) = \sum_{j=1}^{\infty} m^*(A_j)$$.$$ \qquad \square$$

**Fact 2.** 设 $$E_k \subset E_{k+1}$$，$$E = \bigcup E_k$$，$$A_k := E_{k+1} \setminus E_k$$.

且 $$\{A_k\}_{k=1}^{\infty} = P_1 \sqcup \cdots \sqcup P_n$$ 可分解为有限部分. 若 $$m^*$$ 在每个子集簇 $$P_j$$ 上有限可加，则 $$m^*E = \lim m^*E_k$$.

pf. 不妨设 $$\lim m^*E_k < \infty$$.

$$
0 \leq m^*E - m^*E_k \ \leq\ m^*\ E \backslash E_k \ \leq\ \sum_{j \geq k} m^*A_j
$$

$$
= \sum_{i=1}^{n} \sum_{\substack{j \geq k \\ A_j \in P_i}} m^*A_j
$$

$$
\sum_{\substack{j \geq k \\ A_j \in P_i}} m^*A_j < \infty \quad \Longleftarrow \quad \sum_{\substack{j \leq k \\ A_j \in P_i}} m^*A_j = m^*(\bigcup A_j) \leq m^*E_{k+1}
$$

RHS $$\to 0$$（$$k \to \infty$$）.（from Fact 1.）则 $$m^*E = \lim m^*E_k$$. $$\square$$

**Lemma.**（卡氏引理）

设 $$G \subset \mathbb{R}^n$$ 是开集，$$E \subset G$$，定义 $$E_k = \{x \in E \mid d(x, G^c) \geq \tfrac{1}{k}\}$$.

则 $$\lim m^*E_k = m^*E$$.

pf. $$E_k \subset E_{k+1}$$，$$A_k := E_{k+1} \setminus E_k$$，$$E = \bigcup E_k$$.

若 $$\vert i - j\vert \geq 2$$，则 $$d(A_i, A_j) > 0$$，

于是 $$m^*(A_i \cup A_j) = m^*(A_i) + m^*(A_j) \qquad (\ast)$$

令 $$P_1 = \{A_{2j-1}\}$$，$$P_2 = \{A_{2j}\}$$，则 $$m^*$$ 在 $$P_1$$、$$P_2$$ 上有限可加.

根据 Fact 2：$$\lim m^*E_k = m^*E$$. $$\square$$

**Prop.** $$\forall$$ 闭集 $$F$$，$$F \in \mathscr{A}$$.

pf. $$\forall T \subset \mathbb{R}^n$$，令 $$E_k := \{x \in F^c \mid d(x, F) \geq \tfrac{1}{k}\}$$.

$$d(F, E_k) \geq \tfrac{1}{k}$$，$$d(F \cap T,\ E_k \cap T) \geq \tfrac{1}{k}$$.

从而有有限可加性

$$
m^*\big(T \cap (F \cup E_k)\big) = m^*(T \cap F) + m^*(T \cap E_k).
$$

式中 $$m^*(T \cap E_k) \to m^*(T \cap F^c)$$（卡氏引理）

LHS $$\leq m^*T$$. 于是 $$m^*T \geq m^*(T \cap F) + m^*(T \cap F^c)$$.

从而 $$m^*T = m^*(T \cap F) + m^*(T \cap F^c)$$. $$\square$$

**Prop.** $$\forall$$ Borel set $$G$$，$$G \in \mathscr{A}$$. 即 $$B \subset \mathscr{A}$$.

pf. 闭集 $$F \in \mathscr{A}$$，且 $$\mathscr{A}$$ 是 $$\sigma$$ 代数 $$\Rightarrow$$ 开集 $$G \in \mathscr{A}$$.

$$\Rightarrow$$ Borel 集 $$G \in \mathscr{A}$$. $$\square$$

## 4. 测度的正则性

**Prop.** $$\forall E \in \mathscr{A}$$，$$\forall \varepsilon > 0$$，

（1）$$\exists$$ 开集 $$G \supset E$$，s.t. $$m(G \setminus E) < \varepsilon$$.（外正则性）

（2）$$\exists$$ 闭集 $$F \subset E$$，s.t. $$m(E \setminus F) < \varepsilon$$.（内正则性）

pf.（1）若 $$E \in \mathscr{A}$$ 有界，且 $$mE < \infty$$，则 $$\exists$$ 开集 $$G \supset E$$，s.t.

$$mE \leq mG \leq mE + \varepsilon$$.

若 $$E \in \mathscr{A}$$ 无界，则 $$\exists$$ 开集 $$G_k \supset E \cap B_k(0)$$，s.t.

$$m\big(G_k \setminus (E \cap B_k(0))\big) < \dfrac{\varepsilon}{2^k}$$.

令 $$G = \bigcup_{k=1}^{\infty} G_k$$ 为开集，$$G \supset E$$ 且

$$m(G \setminus E) \leq \sum m\big(G_k \setminus (E \cap B_k(0))\big) < \varepsilon$$.

（2）对 $$E^c$$ 用（1），令 $$F = G^c$$ 即可. $$\square$$

**Prop**

（1）$$\forall E \subset \mathbb{R}^n$$，$$\exists\ G_\delta$$ 集 $$G \supset E$$，s.t. $$m^*G = m^*E$$.

（outer regularity for outer measure）

（2）$$\forall E \in \mathscr{A}$$，$$\exists\ G_\delta$$ 集 $$G \supset E$$，$$\exists\ F_\sigma$$ 集 $$F \subset E$$，s.t. $$m(G \setminus F) = 0$$.

（regularity of L-measure）

pf.（1）不妨 $$m^*E < \infty$$，$$\exists$$ 开集 $$G_k \supset E$$，s.t. $$m^*E < m^*G_k + \tfrac{1}{k}$$.

令 $$G = \bigcap_{k=1}^{\infty} G_k$$ 是 $$G_\delta$$ 集，$$G \supset E$$ 且 $$m^*E \leq mG \leq mG_k \leq m^*E + \tfrac{1}{k}$$

令 $$k \to \infty$$，则 $$m^*E = m^*G$$.

（2）$$\exists G_k \supset E \supset F_k$$，s.t. $$m(G_k \setminus E) < \tfrac{1}{k}$$，$$m(E \setminus F_k) < \tfrac{1}{k}$$.

$$G := \bigcap G_k$$，$$F := \bigcup F_k$$，则

$$0 \leq m(G \setminus F) \leq m(G_k \setminus F_k) < \dfrac{2}{k} \to 0$$. $$\square$$

**Thm.** $$\forall A \in \mathscr{A}$$，$$\exists$$ Borel 集 $$F \in B$$，零测集 $$O \in \mathcal{O}$$，s.t. $$A = F \cup O$$.

即 $$\mathscr{A} = \sigma(B \cup \mathcal{O})$$.

**Prop.** 若 $$A \in \mathscr{A}$$，则 $$mA = \sup\limits_{\text{闭} F \subset A} mF = \inf\limits_{\text{开} G \supset A} mG$$.

**Prop**

（1）设可测集列 $$E_k \subset E_{k+1}$$，则

$$\lim mE_k = m \lim E_k$$.

（2）设可测集列 $$E_k \supset E_{k+1}$$，且 $$E_1 < \infty$$，则

$$\lim mE_k = m \lim E_k$$.

（3）设 $$\{E_k\}$$ 是可测集列，则

$$
m\ \underline{\lim}\ E_k \ \leq\ \underline{\lim}\ mE_k \ \leq\ \overline{\lim}\ mE_k \ \leq\ m\ \overline{\lim}\ E_k.
$$

最后一个不等号需在条件 $$m \bigcup E_k < \infty$$ 下成立.（①）

**Rem.** $$\overline{\lim} E_k = \{x \in E_k$$ for infinitely many $$k\}$$

$$\underline{\lim} E_k = \{x \in E_k$$ for all but finitely many $$k\}$$

proof of（①）. 考虑 $$E_k \subset \bigcup_{j \geq k} E_j$$.

$$
\overline{\lim}\ m E_k \ \leq\ \lim m \bigcup_{j \geq k} E_j \ =\ m \lim \bigcup_{j \geq k} E_j \ =\ m \bigcap_{k=1}^{\infty} \bigcup_{j \geq k} E_j = m\ \overline{\lim}\ E_k.
$$

**Prop** 设 $$K \subset \mathbb{R}^n$$ 是紧集（有界闭），记 $$K_\delta = \{x \in \mathbb{R}^n \mid d(x, K) < \delta\}$$，

则 $$mK = \lim\limits_{\delta \to 0} mK_\delta$$.

pf. $$K \subset K_{\delta_1} \subset K_{\delta_2}$$. 于是 $$mK \leq \lim\limits_{\delta \to 0} mK_\delta$$.

只需证 $$mK \geq \lim\limits_{j \to \infty} mE_j$$，$$E_j := K_{\frac{1}{j}}$$.

$$mE_1 < \infty$$，$$E_j \supset E_{j+1}$$，从而 $$\lim mE_j = m \lim E_j$$.

下证 $$K = \lim E_j$$，即 $$K = \lim K_\delta$$.

设 $$K \neq \lim K\delta$$，则 $$\exists x \in \bigcap K\delta \setminus K$$，

取 $$\overline{\delta} = d(x, K) > 0$$，则 $$x \notin K\delta$$，当 $$\delta < \overline{\delta}$$ 时. 矛盾. $$\square$$

**Prop.**（内正则性）$$\forall A \in \mathscr{A}$$，$$mA = \sup\limits_{\text{紧} K \subset A} mK$$.

pf. $$mA = \sup\limits_{\text{闭} F \subset A} mF$$

$$= \sup_F \sup_{r > 0} m\big(F \cap \overline{B_r(0)}\big)$$

$$\leq \sup mK \ \leq\ mA$$.

故等号成立. 则 $$mA = \sup mK$$. $$\square$$

## 5. 正测度集的性质

**Fact.** 设 $$A_1, \cdots, A_k$$ 可测，$$A_i \subset B$$. 若 $$\sum mA_i > (k-1) m^*B$$，则

$$\bigcap A_k \neq \emptyset$$.

pf. 反设 $$\bigcap A_k = \emptyset$$，则 $$B$$ 中每个点至多在 $$k-1$$ 个 $$A_i$$ 中.

$$
\sum_{i=1}^{k} mA_i = \sum_{I \subset \{1, \cdots, k\}} \vert I\vert \cdot mA_I \ \leq\ (k-1) \sum mA_I \ =\ (k-1)\ m \bigcup A_I \ \leq\ (k-1) m^*B.
$$

矛盾. 故 $$\bigcap A_k \neq \emptyset$$.

**Thm**（Steinhaus' Thm 1）

设 $$A \subset \mathbb{R}^n$$ 是正测集，$$k \in \mathbb{Z}_+$$，则 $$\exists \delta > 0$$，s.t. 只要 $$\vert\vec{a}\vert < \delta$$，则

$$
\bigcap_{j=1}^{k} (A + j\vec{a}) \neq \emptyset.
$$

（等价形式是 $$\exists \vec{x} \in A$$，s.t. $$\{\vec{x},\ \vec{x}-\vec{a},\ \cdots,\ \vec{x}-k\vec{a}\} \subset A$$）

pf. 取紧子集 $$K \subset A$$ 且 $$mK > 0$$，$$K$$ 存在是因 $$0 < mA = \sup\limits_{\text{闭} F \subset A} mF$$.（from Fact）

下证 $$\bigcap_{j=1}^{p} (K + j\vec{a}) \neq \emptyset$$ 对 $$\vert\vec{a}\vert$$ 足够小成立.

取 $$\delta > 0$$，s.t. $$mK_\delta < \dfrac{p}{p-1} mK$$，则只要 $$\vert\vec{a}\vert < \dfrac{\delta}{p}$$，则

$$
K + j\vec{a} \ \subset\ K_\delta
$$

且有 $$\sum_{j=1}^{p} m(K + j\vec{a}) = p \cdot mK > (p-1)\ mK_\delta$$.

由 Fact 知 $$\bigcap_{j=1}^{p} (K + j\vec{a}) \neq \emptyset$$. $$\square$$

**Thm**（Steinhaus' Thm 2）

设 $$mA > 0$$，则 0 的邻域 $$\subset A - A := \{\overline{x} - \overline{y}\}$$. $$(\ast)$$

pf. $$(\ast)$$ iff $$A - A = \{a \in \mathbb{R}^n \mid A \cap (A + a) \neq \emptyset\}$$.

由 Steinhaus' Thm 1，

$$\exists \delta > 0$$，只要 $$\vert\vec{a}\vert < \delta$$ 则上式成立. $$\square$$

**Lemma.** 若 $$mA > 0$$，则 $$\forall \varepsilon \in (0, 1)$$，$$\exists$$ 方体 $$I$$，s.t.

$$
\frac{m(I \cap A)}{mI} > 1 - \varepsilon.
$$

pf. by def，$$mA = \inf\limits_{A \subset \bigcup I_j} \sum mI_j > 0$$.

$$\exists$$ 方体列 $$\{I_j\}$$，$$A \subset \bigcup I_j$$，且

$$
1 - \varepsilon < \frac{mA}{\sum mI_j} \ \leq\ \frac{\sum m(A \cap I_j)}{\sum mI_j} \ \leq\ \sup_j \frac{m(A \cap I_j)}{mI_j}
$$

令 $$I = I_j$$ 即已得证. $$\square$$

**Rem.** 方体 $$I$$ 之顶点坐标可都是有理数，因 $$\dfrac{m\, A \cap I}{mI}$$ 关于 $$I$$ 的顶点坐标连续.

**Thm**（Steinhaus' Thm 3）

设 $$mA,\ mB > 0$$，则 $$A - B$$ 有内点.

pf. Step 1. $$\exists$$ box $$Q$$，$$a' \in \mathbb{R}^n$$，$$Q' := Q + a'$$，s.t.

$$
\frac{m\, B \cap Q'}{mQ'} > \frac{2}{3} \quad \text{且} \quad \frac{m\, A \cap Q}{mQ} > \frac{2}{3}
$$

由 Lemma 及后注可知，$$\exists$$ 有理方体 $$I, J$$，s.t.

$$
\frac{m\, A \cap I}{mI} > \frac{2}{3} \quad,\quad \frac{m\, B \cap J}{mJ} > \frac{2}{3}
$$

有理方体分划 $$I = \bigcup\limits_{\text{有限}} Q_i$$，$$J = \bigcup\limits_{\text{有限}} Q_j'$$，且 $$Q_i$$ 与 $$Q_j'$$ 平移重合.

$$
\frac{2}{3} < \frac{m\, A \cap I}{mI} = \frac{\sum m\, A \cap Q_i}{\sum m Q_i} \ \leq\ \max \frac{m\, A \cap Q_i}{mQ_i}
$$

同理 $$\dfrac{2}{3} < \dfrac{m\, B \cap J}{mJ} \leq \max \dfrac{m\, B \cap Q_j'}{m Q_j'}$$.

则取 $$Q = Q_i$$，$$Q' = Q_j'$$ 即可.

Step 2. $$m\big((B + a') \cap A\big)$$（构建 $$A$$ 与 $$B$$ 之间联系）

$$
\geq m\big((B \cap Q' + a') \cap (A \cap Q)\big)
$$

$$
= m(B \cap Q' + a') + m(A \cap Q) - m\big((B \cap Q' + a') \cup (A \cap Q)\big)
$$

$$
\geq m(B \cap Q') + m(A \cap Q) - mQ \geq \frac{1}{3} mQ > 0.
$$

Step 3. $$A - B$$ 有内点.

从 $$D = (B + a') \cap A$$，$$mD > 0$$ 出发，由 Steinhaus' Thm2，

$$D - D$$ 以 0 为内点，则

$$
A \cap (B + a') - A \cap (B + a')
$$

$$
\subset A - (B + a') = A - B - a'
$$

故 $$A - B$$ 以 $$a'$$ 为内点. $$\square$$

**Thm.**（Brunn–Minkowski Inequality）

设 $$A, B$$ 是正测集，则

$$
\big(m^*(A+B)\big)^{\frac{1}{d}} \ \geq\ (mA)^{\frac{1}{d}} + (mB)^{\frac{1}{d}}
$$

pf. Step 1. $$A, B$$ 是方体，则 $$A + B$$ 也是方体，亦可测.

此时 B-M 不等式即

$$
\big(\Pi (a_i + b_i)\big)^{\frac{1}{d}} \ \geq\ (\Pi a_i)^{\frac{1}{d}} + (\Pi b_i)^{\frac{1}{d}}
$$

Step 2. 设 $$A, B$$ 是有限个内部不交方体，对 $$N_A + N_B$$ 作归纳.

由 Step 1 知 $$N_A + N_B \leq 2$$ 时成立.

不妨设 $$N_A \geq 2$$，则存在超平面 $$\{x \in \mathbb{R}^n \mid x_i = t\}$$ 把 $$A$$ 中某两个方体隔开（不被切开）. 设该超平面为 $$x_1 = 0$$，

$$A_+ := \{x \in \mathbb{R}^n \mid x_1 \geq 0\}$$，$$A_- := \{x \in \mathbb{R}^n \mid x_1 \leq 0\}$$.

平移 $$B$$ 使得 $$\dfrac{m(A_+)}{m(A)} = \dfrac{m(B_+)}{m(B)}$$. $$A_\pm + B_\pm \subset (A + B)_\pm$$.

则 $$\big(m(A+B)\big)^{\frac{1}{n}} = \big(m(A+B)_+ + m(A+B)_-\big)^{\frac{1}{n}}$$

$$
\geq \big(m(A_+ + B_+) + m(A_- + B_-)\big)^{\frac{1}{n}}
$$

$$
\geq \Big(\big((mA_+)^{\frac{1}{n}} + (mB_+)^{\frac{1}{n}}\big)^{n} + \big((mA_-)^{\frac{1}{n}} + (mB_-)^{\frac{1}{n}}\big)^{n}\Big)^{\frac{1}{n}}
$$

$$
= \Big(\big((t\, mA)^{\frac{1}{n}} + (t\, mB)^{\frac{1}{n}}\big)^{n} + \big(((1-t)\, mA)^{\frac{1}{n}} + ((1-t)\, mB)^{\frac{1}{n}}\big)^{n}\Big)^{\frac{1}{n}}
$$

$$
= (mA)^{\frac{1}{n}} + (mB)^{\frac{1}{n}}. \quad \text{成立.}
$$

Step 3. 设 $$A, B$$ 是紧集，$$\forall \varepsilon > 0$$，存在有限方体并 $$A_\varepsilon, B_\varepsilon$$.

s.t. $$A \subset A_\varepsilon \subset A + B_\varepsilon(0)$$，$$B \subset B_\varepsilon \subset B + B_\varepsilon(0)$$.

则 $$m\big((A+B) + B_{2\varepsilon}(0)\big)^{\frac{1}{n}} \geq m\big((A + B_\varepsilon(0)) + (B + B_\varepsilon(0))\big)^{\frac{1}{n}}$$

$$
\geq m\big(A_\varepsilon + B_\varepsilon\big)^{\frac{1}{n}}
$$

$$
\overset{\text{Step 2}}{\geq} (mA_\varepsilon)^{\frac{1}{n}} + (mB_\varepsilon)^{\frac{1}{n}}
$$

$$
\geq (mA - \varepsilon)^{\frac{1}{n}} + (mB - \varepsilon)^{\frac{1}{n}}
$$

令 $$\varepsilon \to 0+$$ 即得证.

Step 4. $$A$$、$$B$$ 是一般正测集.

$$
(mA)^{\frac{1}{n}} + (mB)^{\frac{1}{n}} = \Big(\sup_{\text{紧} K_A \subset A} mK_A\Big)^{\frac{1}{n}} + \Big(\sup_{\text{紧} K_B \subset B} mK_B\Big)^{\frac{1}{n}}
$$

$$
= \sup \ \big((mK_A)^{\frac{1}{n}} + (mK_B)^{\frac{1}{n}}\big)
$$

$$
\overset{\text{Step 3}}{\leq} \sup\ \big(m(K_A + K_B)\big)^{\frac{1}{n}}
$$

$$
\leq \sup_{\text{紧} K \subset A + B} (mK)^{\frac{1}{n}} \ \leq\ m^*(A+B)^{\frac{1}{n}}
$$

综上定理得证. $$\square$$

## 6. 不可测集（以 Vitali 集为例）

**def.**（Vitali set）

称 $$A \subset \mathbb{R}$$ 是 V 集，若

（1）$$\forall r \neq s \in \mathbb{Q}$$，$$(A+r) \cap (A+s) = \emptyset$$.

（2）$$\mathbb{R} = A + \mathbb{Q}$$

$$\mathbb{R}^n$$ 中的 Vitali set $$V$$：

（1）$$\forall \vec{r} \neq \vec{s} \in \mathbb{Q}^n$$，$$(V + \vec{r}) \cap (V + \vec{s}) = \emptyset$$

（2）$$\mathbb{R}^n = V + \mathbb{Q}^n$$

**Prop.** 设 Vitali set $$A \subset \mathbb{R}$$.

$$\mathbb{R}$$ 视为 $$\mathbb{Q}$$-线性空间，$$\mathbb{R}/\mathbb{Q} = \{[x] \mid x \in \mathbb{R}\}$$.

$$A \cap [x]$$ 是单点集，$$\forall x \in \mathbb{R}$$.

**Prop.** Vitali set 是 L-不可测集.

pf. 反设 Vitali Set $$A$$ 可测.

Case 1. $$mA > 0$$. 由 Steinhaus' Thm 2，$$A - A$$ 以 0 为内点，

$$A \cap (A+r) \neq \emptyset$$ 对充分小的 $$r \in \mathbb{Q}$$ 成立.

与定义中（1）矛盾.

Case 2. $$mA = 0$$. 由 $$\mathbb{R} = A + \mathbb{Q}$$，

$$
m\ \mathbb{R} = \sum_{r \in \mathbb{Q}} m(A+r) = \sum_{r \in \mathbb{Q}} mA = 0 \quad \text{矛盾}.
$$

故 $$A$$ 不可测. $$\square$$

**Rem.** 由 Hamel basis 到 Vitali set

Hamel basis $$H$$，$$\mathbb{R} = \mathrm{span}_{\mathbb{Q}}(H)$$，s.t.

（1）$$\forall \{x_i\}_{i=1}^{k} \subset H$$，$$\sum_{i=1}^{k} q_i x_i = 0 \Rightarrow q_i = 0$$（$$q_i \in \mathbb{Q}$$）

（2）$$\forall x \in \mathbb{R}$$，$$\exists \{x_i\}_{i=1}^{k} \subset H$$，$$\{q_i\}_{i=1}^{k} \subset \mathbb{Q}$$，s.t. $$x = \sum_{i=1}^{k} q_i x_i$$

其存在性由 Zorn 引理保证.

现设 $$1 \in H$$，则 $$A := \mathrm{span}_{\mathbb{Q}}(H \setminus \{1\}) \subset \mathbb{R}$$ 是 Vitali set，即 $$A$$ 是余维数为 1 的子集.

**Prop.** $$\forall$$ 正测集 $$E \subset \mathbb{R}^n$$，$$\exists$$ 不可测集 $$A \subset E$$.

pf. 取 Vitali 集 $$V \subset \mathbb{R}^n$$，$$\sum\limits_{r \in \mathbb{Q}^n} m^*\big((V+r) \cap E\big) \geq m^*E > 0$$

$$\exists r \in \mathbb{Q}^n$$，s.t. $$m^*\big((V+r) \cap E\big) > 0$$. 记 $$A = (V+r) \cap E$$，

若 $$A$$ 可测，则 $$\exists$$ 正测紧集 $$K \subset A$$，$$mK > 0$$，$$\{K + r\}_{r \in \mathbb{Q}^n}$$ 两两不交.

则 $$H := \bigsqcup\limits_{r \in \mathbb{Q}^n} (K+r)$$ 有界，$$mH < \infty$$. 另一方面，$$mH = \sum\limits_{r \in \mathbb{Q}^n} mK = \infty$$. 矛盾.

故 $$A$$ 不可测，即为所求. $$\square$$

