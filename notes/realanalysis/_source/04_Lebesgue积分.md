---
layout: note
kind: note
title: "第四章　Lebesgue 积分"
course: realanalysis
order: 4
date: 2026-10-25
---

# Chapter 4. Lebesgue 积分

## 1. 非负可测函数的积分

**def** 非负可测函数空间 $$L^+ = \{$$可测 $$f: E \to [0, +\infty]\}$$.

对于 simple function $$\varphi \in L^+$$，$$\varphi(x) := \sum\limits_{j=1}^{k} a_j \cdot 1_{A_j}$$，$$A_j$$ 两两不交可测.

定义 $$\int_E \varphi \, dm := \sum\limits_{j=1}^{k} a_j\, m(A_j)$$.

**Prop**（1）$$\forall c \geq 0$$，$$\int_E c\varphi \, dm = c \cdot \int_E \varphi \, dm$$.

（2）$$\int_E (\varphi + \psi) \, dm = \int_E \varphi \, dm + \int_E \psi \, dm$$.

（3）$$\varphi \leq \psi \Rightarrow \int_E \varphi \, dm \leq \int_E \psi \, dm$$.

**def.** 对 $$\forall f \in L^+$$，定义 $$f$$ 的 Lebesgue 积分

$$
\int_E f \, dm = \sup \Big\{ \int_E \varphi \, dm : 0 \leq \varphi \leq f,\ \varphi\ \text{simple} \Big\}
$$

称 $$f$$ 是 L 可积的，若 $$\int_E f \, dm < +\infty$$.

**Prop** 设 $$f$$ 非负可测，若 $$F$$ 是 L 可积的，且 $$f \leq F$$，则 $$f$$ 也是 L 可积的.

**Prop.** 设 $$f$$ 非负可积，则 $$f(x) < \infty$$  a.e. $$x \in E$$.

pf. 取 $$E_k = \{x \in E : f(x) > k\}$$，则

$$
\{x \in E : f(x) = +\infty\} = \bigcap_{k=1}^{\infty} E_k = \lim E_k.
$$

$$\forall k$$，$$k \cdot mE_k \leq \int_{E_k} f(x)\, dm \leq \int_E f(x)\, dm < +\infty$$

$$\Rightarrow \lim mE_k = 0 \quad \Rightarrow \quad m(\lim E_k) = 0.$$ $$\square$$

**Thm.**（Levi Monotone Convergence，MCT）

suppose $$\{f_j\} \subset L^+$$，$$f \in L^+$$，$$f_j \leq f_{j+1}$$，$$f_j \to f$$  pointwise.

then $$\displaystyle\int_E f \, dm = \lim_{j \to \infty} \int_E f_j \, dm$$.

pf. $$f_j \leq f_{j+1} \Rightarrow \int_E f_j \, dm \leq \int_E f_{j+1} \, dm$$. $$\int_E f_j \, dm \leq \int_E f \, dm$$.

$$\displaystyle\lim_{j \to \infty} \int_E f_j \, dm = \sup_{j \geq 1} \int_E f_j \, dm \leq \int_E f \, dm$$.

Fixed simple $$0 \leq \varphi \leq f$$. $$\alpha \in (0, 1)$$. Note $$E_j := \{x \in E : f_j \geq \alpha \varphi\}$$.

Then $$\bigcup E_j = E$$ and $$E_j \subset E_{j+1}$$.

$$
\lim_{j \to \infty} \int_E f_j \, dm \ \geq\ \lim_{j \to \infty} \int_{E_j} f_j \, dm \ \geq\ \lim_{j \to \infty} \int_{E_j} \alpha \varphi \, dm
$$

Assume $$\varphi = \sum\limits_{i=1}^{k} a_i 1_{A_i}$$，$$\alpha \int_{E_j} \varphi \, dm = \alpha \sum\limits_{i=1}^{k} a_i\, m(A_i \cap E_j) \to \alpha \sum\limits_{i=1}^{k} a_i mA_i$$.

Taking $$j \to \infty$$，$$\displaystyle\lim_{j \to \infty} \int_E f_j \, dm \geq \int_E \alpha \varphi \, dm$$

$$
\Rightarrow \lim_{j \to \infty} \int_E f_j \, dm \geq \int_E \varphi \, dm \quad \Rightarrow \quad \lim_{j \to \infty} \int_E f_j \, dm \geq \sup_{0 \leq \varphi \leq f} \int_E \varphi \, dm
$$

Thus $$\displaystyle\lim_{j \to \infty} \int_E f_j \, dm = \int_E f \, dm$$. $$\square$$

**Rem.** 定义下方图像 $$Gf := \{(x, t) \in E \times [0, \infty] : 0 \leq t \leq f(x)\}$$

$$f_j \leq f_{j+1} \Rightarrow Gf_j \subset Gf_{j+1}$$ 单增可测集列.

$$Gf := \bigcup\limits_{j=1}^{\infty} Gf_j$$，$$\lim\limits_{j \to \infty} m(Gf_j) = m(Gf)$$

$$\Rightarrow \lim\limits_{j \to \infty} \int_E f_j \, dm = \int_E f \, dm$$（并不严谨）

**Th.**（线性性）

设 $$f, g$$ 非负可积，$$\alpha, \beta > 0$$，则

$$
\int_E (\alpha f + \beta g)\, dm = \alpha \int_E f\, dm + \beta \int_E g\, dm.
$$

pf. 取简单可测 $$0 \leq \varphi_j \leq f$$，$$\varphi_j \nearrow f$$

$$0 \leq \psi_j \leq g$$，$$\psi_j \nearrow g$$

由 MCT，$$\displaystyle\int_E (f+g)\, dm = \lim_{j \to \infty} \int_E (\varphi_j + \psi_j)\, dm$$

$$
= \lim_{j \to \infty} \Big( \int_E \varphi_j \, dm + \int_E \psi_j \, dm \Big) = \int_E f\, dm + \int_E g\, dm. \qquad \square
$$

**Th.**（逐项积分定理）

设 $$h_j \geq 0$$ 可测几乎处处有限. 则

$$
\int_E \sum_{j=1}^{\infty} h_j \, dm = \sum_{j=1}^{\infty} \int_E h_j \, dm
$$

pf. By induction，$$\displaystyle\int_E \sum_{j=1}^{N} h_j \, dm = \sum_{j=1}^{N} \int_E h_j \, dm$$.

$$f_N := \sum\limits_{j=1}^{N} h_j \nearrow$$，by MCT，letting $$N \to +\infty$$. $$\square$$

**Prop** 设 $$f$$ 非负可测，则 $$\displaystyle\int_E f \, dm = 0 \iff f = 0$$，a.e. $$x \in E$$.

pf. $$\Leftarrow$$. $$\displaystyle\int_E f \, dm = \sup_{0 \leq \varphi \leq f} \int_E \varphi \, dm$$，设 $$\varphi = \sum\limits_{j=1}^{N} a_j 1_{A_j} \leq f$$.

设 $$E' \subset E$$，$$m(E \setminus E') = 0$$，$$f(x) = 0$$，$$\forall x \in E'$$.

$$0 \leq \sum\limits_{j=1}^{N} a_j 1_{A_j} \leq 0 \quad \Rightarrow \quad a_j = 0$$ 或 $$mA_j = 0$$，$$\forall j$$.

则 $$\displaystyle\int_E \varphi \, dm = 0$$，$$\forall 0 \leq \varphi \leq f$$. 故 $$\displaystyle\int_E f \, dm = 0$$.

$$\Rightarrow$$. 设 $$m\{x \in E : f(x) > 0\} > 0$$，则 $$\exists k > 0$$，$$m\{x \in E : f(x) > \tfrac{1}{k}\} > 0$$.

令 $$A_k = \{x \in E : f(x) > \tfrac{1}{k}\}$$，$$\varphi = \tfrac{1}{k} \cdot 1_{A_k}$$ 非负可测，$$\varphi \leq f$$.

则 $$\displaystyle\int_E f \, dm \geq \int_E \varphi \, dm = \tfrac{1}{k}\, mA_k > 0$$. 矛盾. $$\square$$

**Th.**（Fatou's Lemma）

设 $$f_j \geq 0$$ 可测，则 $$\displaystyle\int_E \underline{\lim} f_j \, dm \leq \underline{\lim} \int_E f_j \, dm$$.

pf. $$\displaystyle\underline{\lim} f_j(x) = \lim_{k \to \infty} \inf_{j \geq k} f_j(x)$$

$$
LHS = \int_E \lim_{k \to \infty} \inf_{j \geq k} f_j \, dm \ \overset{\text{MCT}}{=}\ \lim_{k \to \infty} \int_E \inf_{j \geq k} f_j \, dm
$$

$$
= \underline{\lim} \int_E \inf_{j \geq k} f_j \, dm \ \leq\ \underline{\lim} \int_E f_k \, dm \ =\ RHS. \qquad \square
$$

**Rem.** $$G_{\underline{\lim} f_j} = \underline{\lim}\ Gf_j$$

$$LHS = m\big(\underline{\lim}\ Gf_j\big) \leq \underline{\lim}\ m(Gf_j) = RHS$$

## 2. 广义实值可测函数积分

**def.** 设 $$f: E \to \overline{\mathbb{R}}$$ 可测，$$f = f_+ - f_-$$.

$$f_+ := \max\{f, 0\}$$，$$f_- := \max\{-f, 0\}$$.

若 $$f_+ , f_-$$ 至少有一个可积，则定义 $$\displaystyle\int_E f \, dm = \int_E f_+ \, dm - \int_E f_- \, dm$$.

若 $$f_+$$ 与 $$f_-$$ 均可积，则称 $$f$$ 可积.

**Prop** 注意到 $$\vert f\vert = f_+ + f_-$$，则 $$\displaystyle\int_E f \, dm < \infty \iff \int_E \vert f\vert \, dm < \infty$$.

**Th.**（控制收敛定理，DCT）

设 $$f_j$$ 可测，$$g \geq 0$$ 可积，$$f_j \to f$$  pointwise，$$\vert f_j\vert \leq g$$.

则 $$\displaystyle\lim_{j \to \infty} \int_E f_j \, dm = \int_E f \, dm$$.

pf. $$f = \lim\limits_{j \to \infty} f_j$$ 可测. $$\vert f_j\vert \leq g \Rightarrow \vert f\vert \leq g \Rightarrow f$$ 可积.

考虑 $$g - f_j \geq 0$$，由 Fatou's Lemma，

$$
\int_E \underline{\lim} (g - f_j) \, dm \ \leq\ \underline{\lim} \int_E (g - f_j) \, dm
$$

$$
\Rightarrow \int_E (g - f) \, dm \ \leq\ \int_E g \, dm - \overline{\lim} \int_E f_j \, dm
$$

$$
\Rightarrow \int_E f \, dm \ \geq\ \overline{\lim} \int_E f_j \, dm
$$

考虑 $$g + f_j \geq 0$$，由 Fatou's Lemma，

$$
\int_E f \, dm \ \leq\ \underline{\lim} \int_E f_j \, dm
$$

故 $$\displaystyle\int_E f \, dm = \lim \int_E f_j \, dm$$. $$\square$$

MCT，Fatou's Lemma 及 Lebesgue 控制收敛定理中的 pointwise 均可改为 a.e.

**e.g.**（Fatou's Lemma）

设 $$f_j \geq 0$$，a.e. 则 $$\displaystyle\underline{\lim} \int_E f_j \, dm \geq \int_E \underline{\lim} f_j \, dm$$.

pf. 令 $$Z_j = \{x \in E : f_j(x) < 0\}$$，$$m(Z_j) = 0$$.

令 $$\widehat{E} = E \setminus \bigcup Z_j$$. 则 $$m(E \setminus \widehat{E}) = 0$$.

则 $$\displaystyle\underline{\lim}_{j \to \infty} \int_E f_j \, dm = \lim_{j \to \infty} \int_{\widehat{E}} f_j \, dm \ \geq\ \int_{\widehat{E}} \lim_{j \to \infty} f_j \, dm = \int_E \lim_{j \to \infty} f_j \, dm$$. $$\square$$

**Th.**（逐项积分定理）

设 $$f_j: E \to \overline{\mathbb{R}}$$ 可测，$$g = \sum\limits_{j=1}^{\infty} \vert f_j\vert$$ 可积. 则

$$
\int_E \sum_{j=1}^{\infty} f_j \, dm = \sum_{j=1}^{\infty} \int_E f_j \, dm.
$$

pf. 部分和 $$S_N = \sum\limits_{j=1}^{N} f_j$$，$$\displaystyle\int_E S_N \, dm = \sum\limits_{j=1}^{N} \int_E f_j \, dm$$.

$$\vert S_N\vert \leq \sum\limits_{j=1}^{N} \vert f_j\vert \leq g$$

由 $$g$$ 可积知 $$g(x) < \infty$$  a.e. $$x \in E$$，

则 $$\sum\limits_{j=1}^{N} \vert f_j(x)\vert$$ 收敛 $$\Rightarrow \sum\limits_{j=1}^{N} f_j(x)$$ 收敛，即 $$S_N$$ 收敛 a.e.

由控制收敛定理，$$\displaystyle\int_E \sum_{j=1}^{\infty} f_j \, dm = \sum_{j=1}^{\infty} \int_E f_j \, dm$$. $$\square$$

## 3. DCT 的若干讨论

**Th.**（Lebesgue's Dominated Convergence Thm. DCT）

设 $$f_j$$ 可测，$$g \geq 0$$ 可积，$$f_j \to f$$  a.e.，$$\vert f_j\vert \leq g$$.

则 $$\displaystyle\lim_{j \to \infty} \int_E f_j \, dm = \int_E f \, dm$$.

**e.g.** $$f_k(x) = 1_{(k,\ k + \frac{1}{k})}$$，$$f_k \to 0$$  pointwise，$$\int f_k \, dm \to 0$$.

但并不存在控制函数可积. 据此可知原版定理条件过强.

**Prop.**（DCT，渐进控制版）

设 $$f_k$$ 可测，$$f_k \to f$$ a.e.，且 $$\exists$$ 可积 $$g_k$$，$$g$$，s.t.

$$
\vert f_k\vert \leq g_k \ \text{a.e.} \quad \text{且} \quad \int_E \vert g_k - g\vert \, dm \to 0 \quad (k \to \infty)
$$

则 $$f$$ 可积，且 $$\displaystyle\lim \int_E f_k \, dm = \int_E f \, dm$$.

pf. Step 1. 设 $$f_k \geq 0$$，则 $$f$$ 非负可测

$$
0 \leq \int_E f \, dm \ \leq\ \underline{\lim} \int_E f_k \, dm \ \leq\ \underline{\lim} \int_E g_k \, dm \ \leq\ \int_E g \, dm
$$

故 $$f$$ 可积.

$$(g - f_k)_+ \leq g_+ = g$$. 又 $$(g - f_k)_+ \to (g - f)_+$$  a.e.

故 $$\displaystyle\int_E (g - f_k)_+ \, dm \to \int_E (g - f)_+ \, dm$$.

另一方面，$$0 \leq f_k \leq g_k \Rightarrow g - f_k \geq g - g_k$$

$$(g - f_k)_- \leq (g - g_k)_- \leq \vert g - g_k\vert \quad \Rightarrow \quad \int_E (g - f_k)_- \, dm \to 0$$

于是 $$\displaystyle\int_E (g - f_k) \, dm = \int_E (g - f_k)_+ \, dm + \int_E (g - f_k)_- \, dm \to \int_E (g - f) \, dm$$  $$(\ast)$$

即 $$\displaystyle\int_E f_k \, dm \to \int_E f \, dm$$.

Step 2. 分别对 $$f_+$$ 及 $$f_-$$ 用 Step 1 即证. $$\square$$

**def.** 定义 $$L(E) := \{$$ integrable $$f: E \to \overline{\mathbb{R}}\}$$

$$\Vert f\Vert_1 := \int_E \vert f\vert \, dm$$ 为 $$f$$ 的 L¹-norm.

称 $$f_k$$ 依 L¹-norm 收敛于 $$f$$，若 $$\Vert f_k - f\Vert \to 0$$.

**Lemma.** 设 $$\Vert f_k\Vert < C$$，且 $$f_k \to f$$ a.e.，则

$$
\lim_{k \to \infty} \big(\Vert f_k - f\Vert + \Vert f\Vert - \Vert f_k\Vert\big) = 0
$$

pf. 由 Fatou's Lemma.

$$\displaystyle\int_E \vert f\vert \, dm \leq \underline{\lim} \int_E \vert f_k\vert \, dm \leq C \quad \Rightarrow \quad f$$ 可积.

被积函数 $$\leq 2\vert f\vert$$ 作为控制函数.

由 DCT 即已证. $$\square$$

**Prop.** 设 $$f_k, f \in L^1(E)$$，$$f_k \to f$$ a.e.，则

$$
\Vert f_k - f\Vert \to 0 \quad \iff \quad \Vert f_k\Vert \to \Vert f\Vert
$$

pf. $$\Rightarrow$$. $$\Big\vert \int_E \vert f_k\vert dm - \int_E \vert f\vert \, dm\Big\vert \leq \int_E \big\vert \vert f_k\vert - \vert f\vert\big\vert \, dm \ \to\ 0$$.

$$\Leftarrow$$. $$\lim \int_E \vert f_k\vert \, dm = \int_E \vert f\vert \, dm < +\infty \Rightarrow \exists C$$，s.t. $$\int_E \vert f_k\vert \, dm < C$$.

由 Lemma，

$$
\int_E \vert f_k - f\vert \, dm = \int_E \big(\vert f - f_k\vert + \vert f\vert - \vert f_k\vert\big) dm + \int_E \big(\vert f_k\vert - \vert f\vert\big) dm
$$

（两项均 $$\downarrow 0$$）

即已证毕. $$\square$$

**Lemma** 依 L¹ 收敛 $$\Rightarrow$$ 依测度收敛.

pf. $$\Vert g_k - g\Vert \to 0$$ 即 $$\displaystyle\int_E \vert g_k - g\vert \, dm \to 0$$.

$$\forall \delta > 0$$，$$\displaystyle\int_E \vert g_k - g\vert \, dm \geq \int_{\{\vert g_k - g\vert > \delta\}} \vert g_k - g\vert \, dm$$

$$
\geq \delta \cdot m\{\vert g_k - g\vert > \delta\}
$$

$$\Rightarrow m\{\vert g_k - g\vert > \delta\} \to 0$$. $$\square$$

**Th**（DCT，完整版）

设 $$f_k \in L(E)$$，$$f_k \to f$$ a.e.，则以下叙述等价：

（1）$$\Vert f_k - f\Vert \to 0$$，$$k \to \infty$$

（2）$$f \in L(E)$$，且 $$\Vert f_k\Vert \to \Vert f\Vert$$

（3）$$\exists g_k, g \in L(E)$$，s.t. $$\vert f_k\vert \leq g_k$$ 且 $$\Vert g_k - g\Vert \to 0$$

且 (1)(2)(3) 蕴含 (4)：$$f \in L(E)$$，$$\displaystyle\int_E f_k \, dm \to \int_E f \, dm$$.

pf.（1）$$\iff$$（2）由 Prop 即得.

（3）$$\Rightarrow$$（2）在 $$(\ast)$$ 处补证 $$\int_E (g - f)_- \, dm = 0$$ 即可.

By Riesz Thm，$$\exists \{g_{k_i}\} \subset \{g_k\}$$，s.t. $$g_{k_i} \to g$$，a.e.

因 $$g_{k_i} \geq f_{k_i} \geq 0$$，令 $$k_i \to \infty$$ 有 $$g \geq f \geq 0$$，a.e.

则 $$g - f \geq 0$$，a.e. 故 $$(g - f)_- = 0$$ a.e. 由 Prop (3) $$\Rightarrow$$ (4)

于是 $$\displaystyle\int_E \vert f_k\vert \, dm = \int_E (f_k)_+ \, dm + \int_E (f_k)_- \, dm \to \int_E \vert f\vert \, dm$$.

（1)(2) $$\Rightarrow$$（3）令 $$g_k = \vert f_k\vert$$，$$g = \vert f\vert$$. 则

$$
\Vert g_k - g\Vert \leq \Vert f_k - f\Vert \to 0. \quad k \to \infty. \qquad \square
$$

**Th.**（绝对连续）

设 $$f \in L^1(E)$$，则 $$\forall \varepsilon > 0$$，$$\exists \delta > 0$$，s.t. $$\forall A \subset E$$，当 $$mA < \delta$$ 时，

$$
\Big\vert \int_A f \, dm \Big\vert < \varepsilon.
$$

pf. 可证 $$\int_A \vert f\vert \, dm < \varepsilon$$，则不妨设 $$f \geq 0$$.

$$\exists$$ 简单可测 $$\varphi_k \nearrow f$$，$$\displaystyle\int_A \varphi_k \, dm \to \int_A f \, dm$$.

取简单可测 $$\varphi$$，s.t. $$\displaystyle\int_A (f - \varphi) \, dm < \dfrac{\varepsilon}{2}$$.

设 $$M = \max\limits_{x \in A} \varphi(x) < \infty$$，则 $$\forall A \subset E$$，$$mA < \delta$$，

$$
\int_A \varphi \, dm \ \leq\ M \cdot \delta \ =\ \frac{\varepsilon}{2} \quad ，\ \text{于}\ \delta = \frac{\varepsilon}{2M}.
$$

则 $$\displaystyle\int_A f \, dm < \int_A \varphi \, dm + \dfrac{\varepsilon}{2} = \varepsilon$$. $$\square$$

**Thm.**（DCT，依测度版）

设 $$f_k \in L(E)$$，$$f_k \to f$$ in measure，$$\exists g \in L(E)$$，s.t. $$\vert f_k\vert \leq g$$.

则 $$\displaystyle\int_E f_k \, dm \to \int_E f \, dm$$.

pf. $$\exists f_{k_i} \to f$$ a.e.，由 Fatou's Lemma，

$$
\int_E \vert f\vert \, dm \leq \underline{\lim}_{k_i} \int_E \vert f_{k_i}\vert \, dm \leq \int_E \vert g\vert \, dm < \infty \quad \text{故}\ f \in L(E).
$$

不妨设 $$f_k \geq 0$$，$$\forall \delta > 0$$，$$m\{\vert f_k - f\vert > \delta\} \to 0$$. 对 $$\forall \varepsilon > 0$$，

$$
\int_{E \cap B_N^c} g \, dm < \varepsilon
$$

$$
\int_{E \cap B_N \cap \{\vert f_k - f\vert > \delta\}} \vert f_k - f\vert \, dm < \varepsilon \quad \text{（对}\ k\ \text{充分大，绝对连续）}
$$

$$
\int_{E \cap B_N \cap \{\vert f_k - f\vert \leq \delta\}} \vert f_k - f\vert \, dm \leq \delta \cdot m(B_N) < \varepsilon. \qquad \square
$$

另证. By Riesz Thm，$$\exists$$ 子列 $$f_{k_i} \to f$$ a.e.，则 $$f \in L(E)$$ 且 $$\Vert f_{k_i} - f\Vert \to 0$$.

下证 $$\overline{\lim} \int_E \vert f_k\vert \, dm \leq \int_E \vert f\vert \, dm \leq \underline{\lim} \int_E \vert f_k\vert \, dm$$.

反设 $$\overline{\lim} \int_E \vert f_k\vert \, dm > \int_E \vert f\vert \, dm + 2\delta$$.

则 $$\exists f_{k_j}$$，s.t. $$\displaystyle\int_E \vert f_{k_j}\vert \, dm > \int_E \vert f\vert \, dm + \delta$$.

由 Riesz Thm，$$\exists f_{k_{j_i}} \to f$$ a.e. 从而与上式矛盾.

另一边同理. 从而立即有 $$\displaystyle\int_E \vert f\vert \, dm = \lim \int_E \vert f_k\vert \, dm$$. $$\square$$

**Prop** 设 $$f \in L(E)$$，则 $$\forall \varepsilon > 0$$，$$\exists$$ 有界可测 $$B$$，s.t. $$\displaystyle\int_{E \setminus B} \vert f\vert \, dm < \varepsilon$$.

pf. 取 $$f \cdot 1_{E \cap B_k} \nearrow f$$（$$k \to \infty$$），由 MCT 即有

$$
\lim_{k \to \infty} \int_E f \cdot 1_{E \cap B_k} \, dm = \int_E f \, dm < \infty
$$

从而 $$\displaystyle\lim_{k \to \infty} \int_{E \setminus B_k} f \, dm = 0$$ 即可得证. $$\square$$

**Prop** 设 $$f: E \times (a, b) \to \mathbb{R}$$ 关于 $$x \mapsto f(x, y)$$ 可积，$$y \mapsto f(x, y)$$ 可导.

若 $$\exists F \in L(E)$$，s.t. $$\Big\vert \dfrac{d}{dy} f(x, y)\Big\vert < F(x)$$，则

$$
\dfrac{d}{dy} \int_E f(x, y) \, dx = \int_E \dfrac{d}{dy} f(x, y) \, dx
$$

pf. $$\forall y \in (a, b)$$，$$h_k > 0$$，$$\displaystyle\lim_{k \to \infty} \frac{f(x, y + h_k) - f(x, y)}{h_k} = \dfrac{d}{dy} f(x, y)$$.

注意 $$\Big\vert \dfrac{f(x, y + h_k) - f(x, y)}{h_k}\Big\vert = \Big\vert \dfrac{d}{dy} f(x, y + \theta_k h_k)\Big\vert \leq F(x)$$.

由 DCT 即有 $$\displaystyle\int_E \lim_{k \to \infty} \frac{f(x, y + h_k) - f(x, y)}{h_k} = \lim_{k \to \infty} \int_E \frac{f(x, y + h_k) - f(x, y)}{h_k}$$.

即 $$\displaystyle\int_E \dfrac{d}{dy} f(x, y) \, dx = \dfrac{d}{dy} \int_E f(x, y) \, dx$$（RHS by Heine）. $$\square$$

## 4. L¹ 空间的若干讨论

**Prop.**（L¹ 中的稠密性）

设 $$f \in L(E)$$，则 $$\forall \varepsilon > 0$$，存在简单函数 $$\varphi \in L(E)$$，阶梯函数 $$\psi \in L(E)$$，紧支连续函数 $$g \in L(E)$$，s.t.

$$
\Vert f - \varphi\Vert < \varepsilon \ ,\ \Vert f - \psi\Vert < \varepsilon \ ,\ \Vert f - g\Vert < \varepsilon.
$$

pf.（1）$$\exists$$ 简单函数列 $$\varphi_k \to f$$ a.e. 且 $$\vert \varphi_k\vert \leq \vert f\vert$$.

从而 $$\vert \varphi_k - f\vert \leq 2\vert f\vert \in L(E)$$，由 DCT 即有 $$\Vert \varphi_k - f\Vert \to 0$$.

（2）不妨设 $$\Vert \varphi_k - f\Vert < \dfrac{\varepsilon}{2}$$，$$\varphi_k = \sum\limits_{j=1}^{N} a_j 1_{A_j}$$（$$a_j \neq 0$$）.

其中 $$mA_j \leq \dfrac{1}{\vert a_j\vert} \int_E \vert \varphi_k\vert \, dm < \infty$$，由 Littlewood's Prin.，

$$\exists$$ 有限个方体的并 $$B_j$$，s.t. $$m(A_j \triangle B_j) < \varepsilon'$$，$$\forall j$$.

令 $$\psi_k = \sum\limits_{j=1}^{N} a_j 1_{B_j}$$，则 $$\psi_k$$ 是阶梯函数.

$$
\Vert \psi_k - \varphi_k\Vert \leq \sum_{j=1}^{N} \vert a_j\vert \cdot \Vert 1_{A_j} - 1_{B_j}\Vert = \sum_{j=1}^{N} \vert a_j\vert \cdot m(A_j \triangle B_j) < \varepsilon' \cdot \sum_{j=1}^{N} \vert a_j\vert
$$

取适当 $$\varepsilon'$$ 即有 $$\Vert \psi_k - f\Vert \leq \Vert \psi_k - \varphi_k\Vert + \Vert \varphi_k - f\Vert < \varepsilon$$.

（3）由 Lusin Thm，$$\forall \varepsilon'' > 0$$，$$\exists$$ 连续 $$g$$，s.t.

$$
m\{g \neq \psi\} < \varepsilon'' \quad \& \quad \vert g\vert \leq \vert \psi\vert \leq M
$$

则 $$\displaystyle\int_E \vert g - \psi\vert \, dm = \int_{\{g \neq \psi\}} \vert g - \psi\vert \, dm \ \leq\ 2M\varepsilon''$$.

适当取 $$\varepsilon''$$ 即可. $$\square$$

**Prop**（平均连续性）设 $$f \in L(\mathbb{R}^n)$$，则 $$\displaystyle\lim_{h \to 0} \int_{\mathbb{R}^n} \vert f(x+h) - f(x)\vert \, dx = 0$$.

pf. $$\forall \varepsilon > 0$$，$$\exists$$ 紧支连续 $$g$$，s.t. $$\Vert f - g\Vert < \varepsilon$$.

$$g$$ 紧支连续 $$\Rightarrow g$$ 一致连续，则 $$\exists \delta$$，s.t. $$\forall \vert h\vert < \delta$$，

$$
\vert g(x + h) - g(x)\vert < \varepsilon'
$$

则 $$\displaystyle\int_{\mathbb{R}^n} \vert g(x+h) - g(x)\vert \, dx = \int_{\mathrm{Supp}(g)\ \text{之}\ \delta\ \text{邻域}} \vert g(x+h) - g(x)\vert \, dx < \varepsilon' \cdot mS$$.

注意 $$\displaystyle\int_{\mathbb{R}^n} \vert f(x+h) - f(x)\vert \, dx \leq \int_{\mathbb{R}^n} \vert f(x+h) - g(x+h)\vert \, dx$$

$$
+\ \int_{\mathbb{R}^n} \vert g(x+h) - g(x)\vert \, dx + \int_{\mathbb{R}^n} \vert g(x) - f(x)\vert \, dx
$$

即已证毕. $$\square$$

**Thm.** 设 $$f, g, g_k \in L(E)$$，则附加以下任一条件，有 $$\displaystyle\int_E f g_k \to \int_E f g$$.

（1）$$f$$ 有界 且 $$g_k \xrightarrow{L^1} g$$.

（2）$$g_k \Rightarrow g$$.

（3）$$g$$ 有界，$$g_k$$ 一致有界，$$g_k \Rrightarrow g$$.

pf.（1）设 $$\vert f\vert < M$$，则 $$\displaystyle\int_E \vert fg - f g_k\vert \, dm < M \cdot \int_E \vert g - g_k\vert \, dm \ \to\ 0$$.

（2）$$\displaystyle\int_E \vert fg - f g_k\vert \, dm < \sup_{x \in E} \vert g_k(x) - g(x)\vert \cdot \int_E \vert f\vert \, dm \ \to\ 0$$.

（3）$$\forall \varepsilon$$，取紧支连续 $$f_\varepsilon$$ s.t. $$\Vert f - f_\varepsilon\Vert < \varepsilon$$.

$$
\Vert fg - f g_k\Vert \leq \Vert fg - f_\varepsilon g\Vert + \Vert f_\varepsilon g - f_\varepsilon g_k\Vert + \Vert f_\varepsilon g_k - f g_k\Vert
$$

并且 $$\exists \widehat{M}(\varepsilon)$$ s.t. $$\vert f_\varepsilon\vert \leq \widehat{M}(\varepsilon)$$. 从而即已证毕. $$\square$$

**Prop** 设 $$f \in L(E)$$，若对 $$\forall$$ 紧支连续 $$g$$，$$\displaystyle\int_E f g = 0$$，则 $$f = 0$$，a.e.

pf. 设 $$f'(x) = \begin{cases} f(x), & \text{if } \vert f(x)\vert \leq 1 \\ \mathrm{sgn} f(x), & \text{otherwise} \end{cases}$$，$$f' \in L(E)$$.

$$\exists$$ 紧支连续 $$g_k$$，$$\Vert g_k - f'\Vert \to 0$$ 且 $$\vert g_k\vert \leq 1$$.

又 $$\displaystyle\int_E f g_k = 0$$，$$\forall k$$，故

$$
0 = \lim_{k \to \infty} \int_E f g_k = \int_E f \cdot f' = \int_{\{\vert f\vert \leq 1\}} f^2 + \int_{\{\vert f\vert > 1\}} \vert f\vert
$$

从而 $$f = 0$$  a.e. $$x \in E$$. $$\square$$

**Thm.**（Riemann–Lebesgue）

设 $$f, g_k \in L([a,b])$$，$$g_k$$ 一致有界. 若 $$\exists M$$，$$\forall c \in [a,b]$$，

$$
\int_{[a,c]} g_k \, dm \ \to\ M(c - a)
$$

则 $$\displaystyle\int_{[a,b]} f g_k \to M \int_{[a,b]} f$$.

pf. $$\forall [\alpha, \beta] \subset [a,b]$$，$$\displaystyle\int_{[\alpha, \beta]} g_k \, dm \to M(\beta - \alpha)$$.

设有阶梯函数 $$\gamma = \sum c_j 1_{[\alpha_j, \beta_j]}$$，则

$$
\int_{[a,b]} \gamma g_k = \sum c_j \int_{[\alpha_j, \beta_j]} g_k \, dm \ \to\ M \sum c_j (\beta_j - \alpha_j) = \int_{[a,b]} \gamma.
$$

则对于 $$f \in L(E)$$，$$\forall \varepsilon > 0$$，$$\exists$$ 阶梯函数 $$\gamma_\varepsilon$$，s.t. $$\Vert \gamma_\varepsilon - f\Vert < \varepsilon$$.

$$
\Big\vert \int_{[a,b]} f g_k - M \int_{[a,b]} f \Big\vert \ \leq\ \int_{[a,b]} \vert f - \gamma\vert \cdot \vert g_k\vert
$$

$$
+\ \Big\vert \int_{[a,b]} \gamma g_k - M \int_{[a,b]} \gamma\Big\vert + M \cdot \Vert f - \gamma_\varepsilon\Vert
$$

从而即已证毕. $$\square$$

## 5. Riemann 积分与 Lebesgue 积分的关系

设 $$f: [a,b] \to \mathbb{R}$$ 有界，任给分割 $$P$$，记其直径为 $$\vert P\vert$$，有相应的 Darboux 和 $$\overline{S}_P f$$，$$\underline{S}_P f$$. 取一列 $$P_i$$，s.t. $$\vert P_i\vert \to 0$$，记

$$
\overline{\int}_a^b f(x)\,dx = \lim_{\vert P_i\vert \to 0} \overline{S}_{P_i} f \ ,\quad \underline{\int}_a^b f(x)\,dx = \lim_{\vert P_i\vert \to 0} \underline{S}_{P_i} f.
$$

则 $$f \in R[a,b] \iff \overline{\int}_a^b f = \underline{\int}_a^b f$$.

构造简单函数 $$\overline{f}_P = \sum M_i \cdot 1_{[t_{i-1},\, t_i]}$$，$$\underline{f}_P = \sum m_i \cdot 1_{[t_{i-1},\, t_i]}$$.

在加细分割列 $$\{P_k\}$$ 中，$$\overline{f}_{P_k} \downarrow$$，$$\underline{f}_{P_k} \nearrow$$，$$\underline{f}_{P_k} \leq f \leq \overline{f}_{P_k}$$.

定义 $$\overline{f} = \lim\limits_{k \to \infty} \overline{f}_{P_k}$$，$$\underline{f} = \lim\limits_{k \to \infty} \underline{f}_{P_k}$$，$$\underline{f} \leq f \leq \overline{f}$$.

**Th.** 设 $$f: [a,b] \to \mathbb{R}$$ 有界，则

$$
f \text{ 几乎处处连续} \iff f \in R[a,b].
$$

且此时 $$f \in L[a,b]$$，且 $$\displaystyle\int_{[a,b]} f \, dm = \int_a^b f$$.

pf. 令 $$\overline{f} = \lim\limits_{\delta \to 0} \sup\limits_{(x-\delta, x+\delta)} f$$，$$\underline{f} = \lim\limits_{\delta \to 0} \inf\limits_{(x-\delta, x+\delta)} f$$，则 $$\underline{f} \leq f \leq \overline{f}$$.

断言：$$\overline{f} = \overline{f}$$，$$\underline{f} = \underline{f}$$  a.e.

令 $$A = \{P_k$$ 的分割点$$\}$$，$$mA = 0$$. 下证 $$\overline{f} = \overline{f}$$，$$\forall x \in [a,b] \setminus A$$.

$$\forall x$$，$$\forall \delta > 0$$，$$\exists$$ 分割开区间 $$(t_{i-1}^{(k)}, t_i^{(k)}) \subset (x - \delta, x + \delta)$$.

则 $$\overline{f}_{P_k}(x) \leq \sup\limits_{(x-\delta, x+\delta)} f$$，令 $$k \to \infty$$ 即有 $$\overline{f} \leq \overline{f}$$.

另一方面，$$\forall$$ 分割开区间 $$(t_{i-1}^{(k)}, t_i^{(k)}) \supset (x - \delta, x + \delta)$$，$$\exists \delta$$.

则有 $$\overline{f} \geq \overline{f}$$. 于是 $$\overline{f} = \overline{f}$$，$$\forall x \in [a,b] \setminus A$$.

从而有 $$f$$ 几乎处处连续 $$\iff \overline{f} = \underline{f}$$ a.e. $$\iff \overline{f} = f = \underline{f}$$ a.e. $$(\ast)$$

由 $$\overline{f}, \underline{f}$$ 可测 $$\Rightarrow f$$ 可测，又 $$f$$ 有界，故 $$f \in L[a,b]$$.

注意 $$\displaystyle\int_{[a,b]} \overline{f} \, dm = \lim_{k \to \infty} \int_{[a,b]} \overline{f}_{P_k} \, dm = \lim_{k \to \infty} \sum M_i \Delta t_i$$

$$
= \lim_{k \to \infty} \overline{S}_{P_k} f = \overline{\int}_a^b f(x)\,dx
$$

故 $$(\ast) \iff f \in R[a,b]$$. $$\square$$

## 6. Fubini 定理

**Problem.** $$f: \mathbb{R}^{p+q} \to \mathbb{R}$$ 可积，何时有

$$
\int_{\mathbb{R}^{p+q}} f \, dm = \int_{\mathbb{R}^p} \Big( \int_{\mathbb{R}^q} f(x, y) \, dy \Big) dx
$$

Tonelli 条件. 设 $$f$$ 非负可测.

（1）$$\mathbb{R}^q \ni y \mapsto f(x, y)$$ 非负可测，a.e. $$x \in \mathbb{R}^p$$.

（2）$$\mathbb{R}^p \ni x \mapsto \displaystyle\int_{\mathbb{R}^q} f(x, y) \, dy$$ 非负可测.

（3）$$\displaystyle\int_{\mathbb{R}^{p+q}} f(x, y) \, dm = \int_{\mathbb{R}^p} \Big( \int_{\mathbb{R}^q} f(x, y) \, dy \Big) dx$$

记满足上述 (1)(2)(3) 的 $$f \in L^+(\mathbb{R}^{p+q})$$ 构成集合 $$\mathfrak{F}$$.

易知 $$\mathfrak{F} \neq \emptyset$$. 取方体 $$I_1 \subset \mathbb{R}^p$$，$$I_2 \subset \mathbb{R}^q$$，

$$
f(x, y) = 1_{x \in I_1} \cdot 1_{y \in I_2}
$$

则易验证 $$f \in \mathfrak{F}$$.

**Thm.**（Tonelli）$$\mathfrak{F} = L^+(\mathbb{R}^{p+q})$$.

**Claim.**（1）$$f \in \mathfrak{F}$$，$$c \in \mathbb{R}_+ \Rightarrow cf \in \mathfrak{F}$$.

（2）$$f, g \in \mathfrak{F} \Rightarrow f + g \in \mathfrak{F}$$.

**Claim.** $$f, g \in \mathfrak{F}$$，$$f - g \geq 0$$，$$g \in L^+(\mathbb{R}^{p+q})$$，则 $$f - g \in \mathfrak{F}$$.

pf. 验证 (1)(2).

$$
\int_{\mathbb{R}^{p+q}} g \, dm = \int_{\mathbb{R}^p} \Big( \int_{\mathbb{R}^q} g \, dy \Big) dx < \infty
$$

故 a.e. $$x \in \mathbb{R}^p$$，$$\displaystyle\int_{\mathbb{R}^q} g(x, y)\, dy < \infty$$，$$y \mapsto g(x, y)$$ 几乎处处有限.

则 $$\displaystyle\int_{\mathbb{R}^{p+q}} (f - g)\, dm$$ 几乎处处有定义.

对（3），用积分的线性性即得. $$\square$$

**Claim.** 设 $$f_k \in \mathfrak{F}$$，$$f_k \nearrow f$$，则 $$f \in \mathfrak{F}$$.

pf. By MCT，(1)(2) 成立：$$\displaystyle\int_{\mathbb{R}^q} f(x, y)\, dy = \lim_{k \to \infty} \int_{\mathbb{R}^q} f_k(x, y)\, dy$$.

对（3）. $$\displaystyle\int_{\mathbb{R}^{p+q}} f(x, y)\, dm = \lim_{k \to \infty} \int_{\mathbb{R}^{p+q}} f_k(x, y)\, dm$$

$$
= \lim_{k \to \infty} \int_{\mathbb{R}^p} \Big( \int_{\mathbb{R}^q} f_k(x, y)\, dy \Big) dx = \int_{\mathbb{R}^p} \Big( \int_{\mathbb{R}^q} \lim_{k \to \infty} f_k(x, y)\, dy \Big) dx
$$

$$
= \int_{\mathbb{R}^p} \Big( \int_{\mathbb{R}^q} f(x, y)\, dy \Big) dx \quad \text{即证.} \qquad \square
$$

**Claim.** 设 $$E \subset \mathbb{R}^{p+q}$$ 可测，则 $$1_E \in \mathfrak{F}$$.

pf. Step 1. 设 $$G$$ 为开集，取不交半开闭方体 $$\{I_j\}$$，

s.t. $$G = \bigcup\limits_{j=1}^{\infty} I_j$$，则 $$1_{\bigcup\limits_{j=1}^{\infty} I_j} \nearrow 1_G$$.

从而可知 $$1_G \in \mathfrak{F}$$.

Step 2. 有界闭集 $$F$$，$$1_F \in \mathfrak{F}$$.

设 $$F = G_1 \setminus G_2$$，$$G_i$$ 是有界开集，$$G_2 \subset G_1$$.

则 $$1_F = 1_{G_1} - 1_{G_2}$$. 从而 $$1_F \in \mathfrak{F}$$.

Step 4. $$F_\sigma$$ 集 $$F = \bigcup\limits_{k=1}^{\infty} F_k$$，则 $$1_{\bigcup\limits_{k=1}^{\infty} F_k} \nearrow 1_F$$. 故 $$1_F \in \mathfrak{F}$$.

Step 5. 有限测度 $$G_\delta$$ 集.

设 $$E_k \downarrow$$，$$mE_1 < +\infty$$，$$1_{E_k} \in \mathfrak{F} \Rightarrow 1_{\bigcap E_k} \in \mathfrak{F}$$.

Step 6. 零测集. 设 $$mE = 0$$，

$$\exists$$ 开集 $$G_k \downarrow$$，s.t. $$\lim mG_k = mE = 0$$.

令 $$H = \lim G_k$$，则 $$1_H \in \mathfrak{F}$$，$$E \subset H$$.

又 $$\displaystyle\int_{\mathbb{R}^p} \Big( \int_{\mathbb{R}^q} 1_H(x, y)\, dy \Big) dx = mH = 0$$，

故 $$\displaystyle\int_{\mathbb{R}^{p+q}} 1_E(x, y)\, dm = 0 = \int_{\mathbb{R}^p} \Big( \int_{\mathbb{R}^q} f(x, y)\, dy \Big) dx$$.

Step 7. $$\forall$$ 可测 $$E$$，$$E = G \cup Z$$，

其中 $$G$$ 是 $$G_\delta$$ 集，$$Z$$ 是零测集，$$G \cap Z = \emptyset$$. $$\square$$

根据上述 Claim，对 $$\forall f \in L^+(\mathbb{R}^{p+q})$$，取简单函数 $$\varphi_k$$，

$$\varphi_k \in \mathfrak{F}$$，$$\varphi_k \nearrow f$$. 即知 $$f \in \mathfrak{F}$$，故 Tonelli 定理得证.

**Thm.**（Fubini）设 $$f \in L(\mathbb{R}^{p+q})$$，则

（1）对于 a.e. $$x \in \mathbb{R}^p$$，$$y \mapsto f(x, y)$$ 可积.

（2）$$\mathbb{R}^p \ni x \mapsto \displaystyle\int_{\mathbb{R}^q} f(x, y)\, dy$$ 可积.

（3）$$\displaystyle\int_{\mathbb{R}^{p+q}} f(x, y)\, dm = \int_{\mathbb{R}^p} \Big( \int_{\mathbb{R}^q} f(x, y)\, dy \Big) dx$$.

**def.** 设 $$f, g \in L(\mathbb{R}^n)$$，记

$$
f * g(x) := \int_{\mathbb{R}^n} f(x-y)g(y)\, dy
$$

若 $$f * g(x)$$ 可积，a.e. $$x \in \mathbb{R}^n$$，则称为 $$f$$ 与 $$g$$ 之卷积.

**Thm.** $$\displaystyle\int_{\mathbb{R}^n} \vert f * g\vert \ \leq\ \int_{\mathbb{R}^n} \vert f\vert \cdot \int_{\mathbb{R}^n} \vert g\vert$$.

pf. 不妨设 $$f$$ 与 $$g$$ 可积，则 $$\mathbb{R}^{2n} \ni (x, y) \mapsto f(x-y)g(y)$$ 可测.

$$
\int_{\mathbb{R}^n} f * g = \int_{\mathbb{R}^n} \Big( \int_{\mathbb{R}^n} f(x-y)g(y)\, dy \Big) dx
$$

$$
= \int_{\mathbb{R}^{2n}} \big( f(x-y)\, g(y) \big)\, dx\, dy
$$

$$
= \int_{\mathbb{R}^n} \Big( \int_{\mathbb{R}^n} f(x-y)g(y)\, dx \Big) dy = \int_{\mathbb{R}^n} f \cdot \int_{\mathbb{R}^n} g.
$$

故对一般 $$f, g \in L(\mathbb{R}^n)$$，$$\displaystyle\int_{\mathbb{R}^n} \vert f * g\vert \leq \int_{\mathbb{R}^n} \vert f\vert \cdot \int_{\mathbb{R}^n} \vert g\vert$$. $$\square$$

**Prop.**（分布函数）设 $$f: E \to \overline{\mathbb{R}}$$ 可测，则

$$
\int_E \vert f\vert \, dm = \int_0^{+\infty} m\{\vert f\vert > \lambda\}\, d\lambda.
$$

pf. 令 $$F(x, \lambda) = 1_{\{\vert f(x)\vert > \lambda\}}$$，则

$$
\int_E \vert f\vert \, dm = \int_E \Big( \int_0^{+\infty} 1_{\{\vert f(x)\vert > \lambda\}}\, d\lambda \Big) dx = \int_E \Big( \int_0^{+\infty} F(x, \lambda)\, d\lambda \Big) dx
$$

$$
= \int_0^{+\infty} \Big( \int_E F(x, \lambda)\, dx \Big) d\lambda = \int_0^{+\infty} m\{\vert f\vert > \lambda\}\, d\lambda. \qquad \square
$$

