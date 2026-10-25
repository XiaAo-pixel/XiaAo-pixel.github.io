---
layout: note
kind: note
title: "第四章　Lebesgue 积分"
course: realanalysis
order: 4
date: 2026-10-25
---

本章按"简单函数 → 非负可测函数 → 一般可积函数"三步建立 Lebesgue 积分，证明三大收敛定理（Levi 单调收敛、Fatou 引理、控制收敛定理），讨论积分与极限交换的大量典型例子、Riemann 可积性与 Lebesgue 可积性的关系，最后建立 Tonelli 与 Fubini 定理。

## 4.1 非负可测函数的积分

**定义（非负可测函数空间）.** $$L^+ = \{f : f \text{ 在 } E \text{ 上非负可测}\}$$（取值于 $$[0, +\infty]$$）。

**定义（简单函数的积分）.** 对简单函数 $$\varphi = \sum_{j=1}^{n} a_j \chi_{A_j}$$（$$A_j$$ 两两不交可测），定义

$$
\int_E \varphi \, dm := \sum_{j=1}^n a_j \, m(A_j).
$$

**定义（非负可测函数的积分）.** 对 $$f \in L^+$$，定义

$$
\int_E f \, dm := \sup\left\{ \int_E \varphi \, dm : 0 \le \varphi \le f,\ \varphi \text{ 简单可测} \right\}.
$$

**命题（基本性质）.**

（1）设 $$0 \le \varphi \le f$$，$$\varphi$$ 简单可测，则 $$\int_E \varphi \, dm \le \int_E f \, dm$$；

（2）（单调性）$$0 \le f \le g$$ $$\Rightarrow$$ $$\int_E f \, dm \le \int_E g \, dm$$；

（3）$$m(E) = 0$$ $$\Rightarrow$$ $$\int_E f \, dm = 0$$。

**命题.** 设 $$m(E) < \infty$$，则 $$\int_E f \, dm = 0 \iff f = 0$$ a.e. 于 $$E$$。

**证明.** "⇐"：设 $$f = 0$$ a.e.，对 $$0 \le \varphi = \sum_j a_j \chi_{A_j} \le f$$ 有 $$m(A_j) = 0$$，故 $$\int_E \varphi = 0$$，取上确界得 $$\int_E f\,dm = 0$$。

"⇒"：设 $$m\{x \in E : f(x) > 0\} > 0$$。由 $$\{f > 0\} = \bigcup_k \{f > \tfrac{1}{k}\}$$ 与测度下连续性，存在 $$k$$ 使 $$m\{f > \tfrac{1}{k}\} > 0$$。令 $$\varphi = \tfrac{1}{k} \chi_{\{f > 1/k\}} \le f$$，则

$$
\int_E f \, dm \ge \int_E \varphi \, dm = \tfrac{1}{k}\, m\{f > \tfrac{1}{k}\} > 0,
$$

矛盾。∎

**注.** （1）（对集合的可加性）$$E_1 \cap E_2 = \emptyset$$ 时 $$\int_{E_1 \cup E_2} f \, dm = \int_{E_1} f \, dm + \int_{E_2} f \, dm$$（先对简单函数验证，再取 sup）。

（2）（限制与示性函数）$$A \subseteq E$$ 可测时 $$\int_A f \, dm = \int_E f \cdot \chi_A \, dm$$：先对简单函数 $$\varphi$$ 验证 $$\int_E \varphi \chi_A \, dm = \sum_j a_j\, m(A_j \cap A) = \int_A \varphi \, dm$$，一般情形用递增简单列 $$\varphi_j \nearrow f$$（第三章逼近定理）+ 下节 MCT 取极限。

**定理（线性性）.** 设 $$f, g \in L^+$$，$$\alpha, \beta \ge 0$$，则

$$
\int_E (\alpha f + \beta g)\, dm = \alpha \int_E f\, dm + \beta \int_E g\, dm.
$$

**证明.** 取简单可测 $$\varphi_j \nearrow f$$、$$\psi_j \nearrow g$$，则 $$0 \le \alpha\varphi_j + \beta\psi_j \nearrow \alpha f + \beta g$$；对简单函数线性性已证（直接按定义展开），再用下面的 MCT 取极限。∎

**定理 4.1（Levi 单调收敛定理，MCT）.** 设 $$\{f_j\} \subset L^+$$，$$f_j \le f_{j+1}$$，$$f_j \to f$$ 逐点（从而 $$f \in L^+$$），则

$$
\int_E f \, dm = \lim_{j \to \infty} \int_E f_j \, dm.
$$

**证明.** 由单调性 $$\int f_j$$ 递增且 $$\le \int f$$，故 $$\lim_j \int f_j \le \int f$$。反之，任取简单 $$0 \le \varphi \le f$$ 与 $$0 < t < 1$$，令 $$E_j = \{x : f_j(x) \ge t\,\varphi(x)\}$$，则 $$E_j$$ 可测、$$E_j \nearrow E$$，且 $$f_j \ge t\,\varphi\,\chi_{E_j}$$。由 $$\{f > t\varphi\}$$ 的逼近与测度下连续性（$$m(E)$$ 可以取 $$+\infty$$，下连续性不需要有限）

$$
\lim_j \int_E f_j \, dm \ge \lim_j \int_E t\,\varphi\,\chi_{E_j}\,dm = t \int_E \varphi \, dm \xrightarrow{\,t \to 1\,} \int_E \varphi \, dm,
$$

对 $$\varphi$$ 取上确界得 $$\lim_j \int f_j \ge \int f$$。∎

**注 1.** 单调性条件不可去掉：$$f_j = j\,\chi_{(0, \frac{1}{j})} \to 0$$ a.e.，但 $$\int f_j = 1 \not\to 0$$。

**注 2.** 若把条件减弱为"$$f_j \nearrow f$$ a.e. 且某个 $$\int_E f_{j_0} \, dm < +\infty$$"，结论仍真。

**定理 4.2（逐项积分）.** 设 $$f_j \in L^+$$，则

$$
\int_E \sum_{j=1}^{\infty} f_j \, dm = \sum_{j=1}^{\infty} \int_E f_j \, dm.
$$

**证明.** 令 $$g_n = \sum_{j=1}^n f_j \nearrow \sum_{j=1}^\infty f_j$$，由 MCT 与有限可加性

$$
\int_E \sum_{j=1}^{\infty} f_j \, dm = \lim_n \int_E g_n \, dm = \lim_n \sum_{j=1}^{n} \int_E f_j \, dm = \sum_{j=1}^{\infty} \int_E f_j \, dm. \; \blacksquare
$$

（另一方向的说明：若 $$\sum_j f_j$$ 处处发散于 $$+\infty$$ 而 $$m(E) > 0$$，则积分也为 $$+\infty$$——取 $$E_{j,k} = \{f_j \ge \tfrac1k\}$$ 型集合控制即可。）

## 4.2 积分与极限的交换

先看一个反例（"sliding hump"，滑动的驼峰）：$$f_j = \chi_{(j,\, j+1)}$$，则 $$f_j \to 0$$ 逐点，$$\int f_j = 1$$，但 $$\int \lim f_j = 0 < 1 = \lim \int f_j$$——极限与积分交换需要条件。

**定理 4.3（Fatou 引理）.** 设 $$\{f_j\} \subset L^+$$，则

$$
\int_E \varliminf_{j \to \infty} f_j \, dm \le \varliminf_{j \to \infty} \int_E f_j \, dm.
$$

**证明.** 令 $$g_k = \inf_{j \ge k} f_j \in L^+$$，则 $$g_k \nearrow \varliminf f_j$$；对 $$g_k$$ 用 MCT：

$$
\int_E \varliminf_j f_j \, dm = \lim_k \int_E g_k \, dm = \sup_k \int_E g_k \, dm \le \varliminf_j \int_E f_j \, dm. \; \blacksquare
$$

**注 1.** 不等式可以严格（sliding hump 例）。

**注 2.** 若 $$f_j \to f$$ a.e. 且 $$f_j \le g$$（$$g$$ 可积），对 $$g - f_j \ge 0$$ 用 Fatou：

$$
\int g - f \le \liminf_j \int (g - f_j) = \int g - \limsup_j \int f_j.
$$

**推论 4.4（控制收敛定理，DCT）.** 设 $$f_j \to f$$ a.e. 于 $$E$$，$$\vert f_j \vert \le g$$（$$g$$ 可积），则 $$f_j$$、$$f$$ 均可积，且

$$
\lim_{j \to \infty} \int_E f_j \, dm = \int_E f \, dm.
$$

**证明.** 由 $$\vert f_j\vert \le g$$ 知 $$f_j, f$$ 可积。对 $$g - f_j$$ 与 $$g + f_j$$ 分别用注 2 的 Fatou 论证，得

$$
\int f \le \liminf \int f_j \le \limsup \int f_j \le \int f,
$$

故极限存在且相等。∎

**定理 4.5（一般的控制收敛定理）.** 设 $$f_j \to f$$ a.e.，$$\vert f_j\vert \le g_j$$，$$g_j \to g$$ a.e.，$$g$$ 可积，且 $$\lim_j \int_E g_j \, dm = \int_E g \, dm$$，则 $$f$$ 可积且 $$\lim_j \int f_j = \int f$$。

**证明.** $$\vert f_j - f\vert \le g_j + g$$，对非负函数 $$g_j + g - \vert f_j - f\vert$$ 用 Fatou：

$$
\int 2g - \limsup_j \int \vert f_j - f\vert \le \liminf_j \int (g_j + g - \vert f_j - f\vert) = \int 2g,
$$

即 $$\limsup_j \int \vert f_j - f\vert \le 0$$，故 $$\int \vert f_j - f\vert \to 0$$，而 $$\left\vert \int f_j - \int f \right\vert \le \int \vert f_j - f\vert \to 0$$。∎

**定理（积分的绝对连续性）.** 设 $$f$$ 在 $$E$$ 上可积，则 $$\forall \varepsilon > 0$$，$$\exists \delta > 0$$：只要 $$A \subseteq E$$ 可测且 $$m(A) < \delta$$，就有

$$
\int_A \vert f \vert \, dm < \varepsilon.
$$

**证明.** 先对 $$f = \chi_E$$（取 $$\delta = \varepsilon$$）与简单函数验证，一般情形用简单函数逼近 + MCT 控制 $$\int \vert f - \varphi\vert < \varepsilon/2$$ 后取 $$\delta = \varepsilon/2$$。∎

**例 1（Beta 函数）.** $$\displaystyle\int_0^1 x^{a-1}(1-x)^{b-1}\,dx = B(a,b)$$（$$a, b > 0$$；非负可测，允许 $$+\infty$$ 值的逐项讨论）。

**例 2.** 求 $$\lim_n \int_0^n \left(1 - \frac{x}{n}\right)^n e^{x/2}\,dx$$。

**解.** 令 $$f_n = \left(1 - \frac{x}{n}\right)^n e^{x/2} \chi_{[0,n]}$$。当 $$x \ge 0$$ 固定、$$n > x$$ 时，$$\left(1 - \frac{x}{n}\right)^n \to e^{-x}$$（且关于 $$n$$ 最终递增），故 $$f_n \to e^{-x/2}$$；又 $$\left(1 - \frac{t}{n}\right)^n \le e^{-t}$$（$$0 \le t \le n$$）给出控制 $$\vert f_n\vert \le e^{-x/2}$$ 可积。由 DCT：

$$
\lim_n \int_0^n \left(1-\frac{x}{n}\right)^n e^{x/2}\,dx = \int_0^\infty e^{-x/2}\,dx = 2.
$$

**例 3.** $$\displaystyle\int_0^1 \frac{\ln x}{1 - x}\,dx = -\frac{\pi^2}{6}$$。

**解.** $$\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n$$（$$0 \le x < 1$$），$$\ln x < 0$$，由逐项积分定理（非负情形对 $$-\frac{\ln x}{1-x} = \sum_n (-\ln x)\, x^n$$ 应用）

$$
-\int_0^1 \frac{\ln x}{1 - x}\,dx = \sum_{n=0}^{\infty} \int_0^1 (-\ln x)\, x^n \,dx = \sum_{n=0}^{\infty} \frac{1}{(n+1)^2} = \frac{\pi^2}{6}. \; \blacksquare
$$

**例 4（Riemann 可积 ⟹ Lebesgue 可积）.** 设 $$f$$ 在 $$[a,b]$$ 上 Riemann 可积，则 $$f$$ Lebesgue 可积，且两个积分值相等。

**证明.** 取分划列 $$P_n: a = x_0^n < \cdots < x_{N_n}^n = b$$，$$\Vert P_n\Vert \to 0$$（例如等分）。令

$$
u_n = \sum_k m_k^n \,\chi_{(x_{k-1}^n,\, x_k^n]} \le f \le v_n = \sum_k M_k^n \,\chi_{(x_{k-1}^n,\, x_k^n]},
$$

其中 $$m_k^n, M_k^n$$ 为 $$f$$ 在子区间上的下、上确界（Riemann 可积函数有界、a.e. 连续，故可测）。$$u_n$$ 的积分是 Darboux 下和 $$\underline{S}_n$$、$$v_n$$ 是上和 $$\overline{S}_n$$，由 Riemann 可积性 $$\underline{S}_n, \overline{S}_n \to \int_a^b f\,dx$$。取一列加细分划使 $$\underline{S}_n \nearrow$$，由 MCT 与夹逼：

$$
(L)\int_a^b f \, dm = \lim_n \int u_n = \lim_n \underline{S}_n = \int_a^b f \, dx. \; \blacksquare
$$

**例 5.** $$\lim_n \int_0^1 \frac{n^3 x^2\, e^{-n^2 x}}{1 + x}\,dx = 0$$。

**解.** $$f_n(x) = \frac{n^3 x^2}{1+x} e^{-n^2 x} \to 0$$（$$x > 0$$；$$f_n(0)=0$$）。求导分析最大值可得 $$\vert f_n(x)\vert \le \frac{C}{\sqrt{x}}$$（$$C$$ 与 $$n$$ 无关），而 $$x^{-1/2}$$ 在 $$(0,1)$$ 可积，由 DCT 极限为 $$0$$。∎

**例 6.** （a）$$\lim_n \int_0^1 \frac{n\sqrt{x}}{1 + n^2 x^2}\,dx = 0$$；（b）$$\displaystyle\int_0^1 \frac{x^{\alpha} - 1}{\ln x}\,dx = \ln(\alpha + 1)$$（$$\alpha > -1$$）。

**解.** （a）$$f_n \to 0$$（$$x > 0$$）。用 $$n x \le \frac{1}{2}(n^2 x^2 + 1)$$（即 $$2nx \le n^2x^2 + 1$$）：

$$
\frac{n\sqrt{x}}{1 + n^2 x^2} \le \frac{n\sqrt{x}}{2 n x} = \frac{1}{2}\,x^{-1/2} \in L^1(0,1),
$$

由 DCT 极限为 $$0$$。

（b）$$\frac{x^{\alpha} - 1}{\ln x} = \int_0^{\alpha} x^t \,dt$$，由 Fubini/Tonelli 交换积分次序：

$$
\int_0^1 \frac{x^{\alpha} - 1}{\ln x}\,dx = \int_0^\alpha \left(\int_0^1 x^t\,dx\right) dt = \int_0^\alpha \frac{dt}{t+1} = \ln(\alpha + 1). \; \blacksquare
$$

**例 7.** $$\displaystyle\int_0^1 \!\!\int_0^1 \frac{dx\,dy}{1 - xy} = \frac{\pi^2}{6}$$。

**解.** $$f(x,y) = \frac{1}{1-xy} \ge 0$$ 可测，由 $$\frac{1}{1-t} = \sum_n t^n$$（$$0 \le t < 1$$）与 Tonelli 逐项积分：

$$
\int_0^1\!\!\int_0^1 \frac{dx\,dy}{1-xy} = \sum_{n=0}^\infty \int_0^1\!\!\int_0^1 x^n y^n \,dx\,dy = \sum_{n=0}^\infty \frac{1}{(n+1)^2} = \frac{\pi^2}{6}. \; \blacksquare
$$

**例（交换积分次序不成立的例子）.** 令

$$
f(x, y) = \frac{x^2 - y^2}{(x^2 + y^2)^2}, \qquad (x, y) \in (0,1)\times(0,1).
$$

则 $$\int_0^1 f\,dy = \left[\frac{y}{x^2 + y^2}\right]_{y=0}^{y=1} = \frac{1}{1 + x^2}$$，故一个次序的累次积分为 $$\int_0^1 \frac{dx}{1+x^2} = \frac{\pi}{4}$$；而另一次序（对 $$x$$ 先积分）得 $$-\frac{\pi}{4}$$。两个累次积分不相等——$$f \notin L^1((0,1)^2)$$，Fubini 定理的条件不可省略。

## 4.3 Fubini 定理

**定理 4.6（Tonelli）.** 设 $$(X, \mathcal{X}, \mu)$$、$$(Y, \mathcal{Y}, \nu)$$ 为 σ-有限测度空间，$$f$$ 为 $$X \times Y$$ 上的非负可测函数，则

$$
\int_{X \times Y} f \,d(\mu \times \nu) = \int_X \left[ \int_Y f \,d\nu \right] d\mu = \int_Y \left[ \int_X f \,d\mu \right] d\nu.
$$

（三个量都允许为 $$+\infty$$。）

**证明.** 分三步：

（1）示性函数 $$f = \chi_{A \times B}$$（$$A \in \mathcal{X}$$，$$B \in \mathcal{Y}$$）：三边都等于 $$\mu(A)\,\nu(B)$$；由线性性推广到简单函数。

（2）单调类方法：令 $$\mathcal{A} = \{E \in \mathcal{X} \otimes \mathcal{Y} : \text{结论对 } \chi_E \text{ 成立}\}$$，由（1）$$\mathcal{A}$$ 包含矩形全体生成的代数，且对递增极限封闭，由单调类定理 $$\mathcal{A} = \mathcal{X} \otimes \mathcal{Y}$$。

（3）一般非负可测 $$f$$：取简单函数 $$f_j \nearrow f$$，对 $$f_j$$ 结论成立，由 MCT 两次取极限传给 $$f$$。∎

**定理 4.7（Fubini）.** 设 $$(X, \mathcal{X}, \mu)$$、$$(Y, \mathcal{Y}, \nu)$$ σ-有限，$$f \in L^1(\mu \times \nu)$$，则

$$
\int_{X\times Y} f \,d(\mu \times \nu) = \int_X\left[\int_Y f\,d\nu\right]d\mu = \int_Y\left[\int_X f\,d\mu\right]d\nu,
$$

且对 a.e. 的 $$x$$，内层积分 $$\int_Y f(x, \cdot)\,d\nu$$ 存在（有限）。

**证明.** 分解 $$f = f^+ - f^-$$，对 $$f^\pm$$（非负可测）用 Tonelli：

$$
\int_X \left[\int_Y f^+ \,d\nu\right] d\mu = \int_{X\times Y} f^+ \,d(\mu\times\nu) < \infty,
$$

故 $$\int_Y f^+\,d\nu < \infty$$ 对 a.e. $$x$$ 成立，同理 $$f^-$$；对这些 $$x$$ 可逐项相减：

$$
\int_X \left[\int_Y f \,d\nu\right] d\mu = \int_X \left[\int_Y f^+ \,d\nu\right]d\mu - \int_X\left[\int_Y f^- \,d\nu\right]d\mu = \int f^+ - \int f^- = \int f. \; \blacksquare
$$

**注（条件不可削弱）.** 若仅有两个累次积分存在且相等，未必有 $$f \in L^1$$、重积分存在（见 4.2 末的反例）；正确的使用方式是：**非负用 Tonelli，可积性未知时先用 Tonelli 验证 $$\int\int \vert f\vert < \infty$$，再用 Fubini**。

> **本章小结**：三步构造（简单 → 非负 → 一般）→ 三大收敛定理（MCT、Fatou、DCT 及一般形式）→ 积分绝对连续性 → 典型极限积分问题（$$(1-x/n)^n$$ 型、参数积分、$$\pi^2/6$$ 型级数）→ Riemann 与 Lebesgue 可积性的关系 → Tonelli/Fubini（非负随便换序、可积才能换序）。
