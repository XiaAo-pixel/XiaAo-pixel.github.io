---
layout: note
kind: note
title: "Chapter 2　Existence & Uniqueness"
course: ode
order: 2
date: 2026-10-26
---

本章建立一阶 ODE 解的存在唯一性理论：Gronwall 不等式与 Arzelà–Ascoli 引理两个准备工具，Picard–Lindelöf 定理、Peano 定理与 Osgood 唯一性，解的延拓，比较引理，以及解对数据与参数的连续依赖、$C^1$ 依赖。

## 2.1 Preparation

### 2.1.1 Gronwall Inequality

> **Version 1.** $f\in C^1[a,b]$, $g\in C[a,b]$, and $\ f' \le gf$, $\forall x\in[a,b]$.
>
> Then $\ f(x) \le f(x_0)\cdot\exp\Bigl(\int_{x_0}^{x} g(s)\,ds\Bigr)$, $\forall\ x\ge x_0$, $x_0\in[a,b]$.
>
> **Pf.** $\ \Bigl(e^{-\int_{x_0}^{x} g(s)\,ds}\cdot f\Bigr)' = e^{-\int_{x_0}^{x} g(s)\,ds}\,\bigl(f' - gf\bigr) \le 0$,
> then $e^{-\int_{x_0}^{x} g(s)\,ds}\,f(x) \le f(x_0)$. $\square$

> **Version 2.** $f\in C^1[a,b]$, $g, h\in C[a,b]$. $\ f' \le h + gf$.
>
> Then $\ f(x) \le e^{\int_{x_0}^{x} g(s)\,ds}\,\Bigl(f(x_0) + \int_{x_0}^{x} e^{-\int_{x_0}^{t} g(s)\,ds}\,h(t)\,dt\Bigr)$, $\forall\, x\ge x_0$.
>
> **Pf.** $\ \Bigl(e^{-\int_{x_0}^{x} g(s)\,ds}\,f(x)\Bigr)' = e^{-\int_{x_0}^{x} g(s)\,ds}\,\bigl(f' - fg\bigr) \le e^{-\int_{x_0}^{x} g(s)\,ds}\cdot h(x)$;
> then by Version 1 we can prove that. $\square$

> **Version 3.** $f, g\in C[a,b]$, $g\ge 0$, $f(x) \le C + \int_a^x g(s)\,f(s)\,ds$.
>
> Then $f(x) \le C\cdot\exp\Bigl(\int_a^x g(s)\,ds\Bigr)$.
>
> **Pf.** $\ \Phi(x) := C + \int_a^x g(s)\,f(s)\,ds$, $\ \Phi'(x) = g(x)\,f(x) \le g(x)\,\Phi(x)$,
> $$
> \Rightarrow\ f(x) \le \Phi(x)\ \overset{\text{Ver 1.}}{\le}\ C\cdot\exp\Bigl(\int_a^x g(s)\,ds\Bigr). \qquad\square
> $$

> **Version 4.** $f, g, h\in C[a,b]$, $g\ge 0$. $f(x) \le h(x) + \int_a^x g(s)\,f(s)\,ds$.
>
> Then $f(x) \le h(x) + e^{\int_a^x g(s)\,ds}\ \Bigl[\int_{x_0}^{x} e^{-\int_{x_0}^{t} g(s)\,ds}\,g(t)\,h(t)\,dt\Bigr]$.
>
> **Pf.** $\ \Phi(x) := \int_a^x g(s)\,f(s)\,ds$, $\quad \Phi' = gf \le g\,(h+\Phi) = gh + g\Phi$.
> $$
> \Rightarrow\ f(x) \le h(x) + \Phi(x)\ \overset{\text{Ver 2.}}{\le}\ h(x) + e^{\int_a^x g(s)\,ds}\,\Bigl[\int_{x_0}^{x} e^{-\int_{x_0}^{t} g(s)\,ds}\,g(t)\,h(t)\,dt\Bigr]. \qquad\square
> $$

### 2.1.2 Ascoli–Arzelà Lemma

> **Def.** $f_n\in C[a,b]$ are called **uniformly bounded** if $|f_n(x)| < K$, $\forall x, n$.

> **Def.** $f_n\in C[a,b]$ are called **equicontinuous**, if $\forall\varepsilon > 0$, $\exists\,\delta$, s.t. $|x-y| < \delta\ \Rightarrow\ |f_n(x) - f_n(y)| < \varepsilon$, $\forall n$.

> **Lemma (Arzelà–Ascoli).**
> $f_n\in C[0,1]$ uniformly bounded \& equicontinuous, then $\exists$ subsequence $f_{n_j} \Rightarrow f\in C[a,b]$.
>
> **Pf.** $\ \{x_n\} := \mathbb{Q}\cap[a,b]$. For $x_1$, $\{f_n(x_1)\}_{n=1}^{\infty}$ are bounded, $\exists\ f_{1,1}(x_1),\ f_{1,2}(x_1),\ \dots,\ f_{1,n}(x_1)$ converge.
>
> For $x_2$: $\{f_{1,n}(x_2)\}$ are bounded, $\exists\ \{f_{2,n}(x_2)\} \subseteq \{f_{1,n}(x_2)\}$ converges.
>
> Repeat the process, we get $\{f_{k,n}\} \subseteq \{f_{l,n}\}$ for $l \le k-1$.
>
> Take $\{f_{n,n}\}$ as a subsequence of $\{f_n\}$; $f_{n,n}(x_j)$ converges for every $x_j$.
>
> Since $\{f_n\}$ is equicontinuous, $\forall\varepsilon>0$, $\exists\delta>0$, $\forall\ |x-y|<\delta$: $|f_n(x)-f_n(y)| < \dfrac{\varepsilon}{3}$.
>
> Consider $[a,b] \subseteq \bigcup_{k=1}^{K} B(x_{j_k}, \delta)$, $\forall\varepsilon>0$, $\exists\ N = N(\varepsilon, j_k)$, s.t.
> $|f_{n,n}(x_{j_k}) - f_{m,m}(x_{j_k})| < \varepsilon$. Taking $N_0 = \max_k N(\varepsilon, j_k)$, then for $\forall\, n, m > N_0(\varepsilon)$:
> $$
> |f_{n,n}(x) - f_{m,m}(x)|
> = |f_{n,n}(x) - f_{n,n}(x_j)| + |f_{n,n}(x_j) - f_{m,m}(x_j)| + |f_{m,m}(x_j) - f_{m,m}(x)| < \varepsilon.
> $$
>
> Then $f_{n,n}$ converges uniformly. $\square$

> **Remark.**
> Consider $M$ a compact set on $\mathbb{R}^n$; then the A–A thm. applies to $\{f_n\} \subseteq C(M,\ \mathbb{R})$. Also, the A–A thm applies to $C(X,Y)$ where $X, Y$ are complete metric spaces, $X$ compact and $\{f_n\}$ totally bounded.

## 2.2 Picard–Lindelöf Thm.

$$
\begin{cases} \dfrac{dy}{dx} = f(x,y) \\ y(x_0) = y_0 \end{cases} \quad \text{(IVP)}, \qquad D = \bigl\{(x,y)\in\mathbb{R}^2 :\ |x-x_0|<a,\ |y-y_0|<b\bigr\}.
$$

> **Def (Lipschitz).**
> $f$ is called $y$-Lipschitz on $D$, if $\forall\ (x,y_1),\,(x,y_2)\in D$,
> $$
> |f(x,y_1) - f(x,y_2)| < L\,|y_1 - y_2|.
> $$
>
> $f$ is called locally Lipschitz on $\Omega$, if for any $(x_0,y_0)\in\Omega$ there exists a neighborhood $D$ s.t. $f$ is Lipschitz on $D$.

> **Thm (Picard–Lindelöf).**
> Where $f \in C(D)$ and $f$ is $y$-Lipschitz on $D$, the Cauchy problem has unique solution $y(x)$, $x \in [x_0 - h,\ x_0 + h]$, $h := \min\bigl\{a,\ \frac{b}{M}\bigr\}$.
>
> **Pf.**
>
> **Step 1.** Transform to integral equation:
> $$
> y(x) = y_0 + \int_{x_0}^{x} f(s, y(s))\, ds. \tag{*}
> $$
> We claim ODE $\iff$ $(*)$, i.e.
>
> $y \in C^1$ solves ODE $\implies$ $y$ satisfies $(*)$;
>
> $y \in C$ satisfies $(*)$ $\implies$ $y \in C^1$ \& solves ODE.
>
> Denote $\Phi(y) := y_0 + \int_{x_0}^{x} f(s, y(s))\, ds$; we search for $y = \Phi(y)$.
> (Formally we can use Banach Thm to find a fixed point.)
>
> **Step 2.** Construct Picard sequence:
> $$
> y_0(x) \equiv y_0, \quad y_1(x) := \Phi(y_0) = y_0 + \int_{x_0}^{x} f(s, y_0(s))\, ds, \quad \ldots, \quad y_n := \Phi(y_{n-1}).
> $$
> Check: $|y_1 - y_0| = \Bigl|\int_{x_0}^{x} f(s, y_0(s))\, ds\Bigr| \le M \cdot h \le b$;
> $|y_n - y_0| \le b \implies |y_{n+1} - y_0| \le b$.
>
> **Step 3.** Prove $y_n$ converges uniformly on $[x_0 - h,\ x_0 + h]$
> (so that we can take the limit of $y_n(x) = \Phi(y_{n-1})$):
> $$
> |y_1(x) - y_0(x)| \le M \cdot |x - x_0|,
> $$
> $$
> |y_2(x) - y_1(x)| = \Bigl|\int_{x_0}^{x} \bigl(f(s, y_1(s)) - f(s, y_0(s))\bigr)\Bigr| \le \int_{x_0}^{x} L \cdot |y_1(s) - y_0(s)|\, ds \le L \cdot M \cdot \frac{(x - x_0)^2}{2}.
> $$
>
> Similarly,
> $$
> |y_n(x) - y_{n-1}(x)| \ \le\ M \cdot \frac{L^{n-1}}{n!}\ |x - x_0|^n.
> $$
>
> Notice $|y_k(x) - y_{k-1}(x)| \le \dfrac{M \cdot L^{k-1}}{k!}\ h^k$, the RHS converges;
> so $y_n(x) := \sum_{k=1}^{n} (y_k - y_{k-1}) + y_0$ converges uniformly.
>
> Take the limit, then we have $y := \lim y_n$, $y = \Phi(y)$.
> Hence $y(x)$ solves the Cauchy problem.
>
> **Step 4.** Uniqueness.
>
> Suppose $\varphi_1, \varphi_2$ solve the IVP,
> $$
> |\varphi_1(x) - \varphi_2(x)| \le \Bigl|\int_{x_0}^{x} L \cdot |\varphi_1(s) - \varphi_2(s)|\, ds\Bigr|.
> $$
> Using Gronwall, then we have
> $$
> |\varphi_1(x) - \varphi_2(x)| \le C \cdot e^{L(x - x_0)}, \quad \text{where } C = 0
> \ \implies\ \varphi_1(x) - \varphi_2(x) = 0, \quad \text{for } x \ge x_0.
> $$
>
> Consider when $x \le x_0$: $\tilde{\varphi}_i(x) = \varphi_i(-x)$, hence we can transform the uniqueness to the right. $\square$

![reflection argument for uniqueness on $x\le x_0$](fig/ch02_fig_2_2_1.png)

> **Cor (Convergence Rate).**
> Under the same conditions, we have the convergence rate
> $$
> |y_n(x) - y(x)| \le \frac{ML^n}{(n+1)!}\ |x - x_0|^{n+1}, \quad \forall\, x \in [x_0 - h,\ x_0 + h].
> $$

> **Eg.** $\dfrac{dy}{dx} = x^2 + y^2$: for any $(x_0, y_0)$ there is a unique solution line passing it.
> ('cause $f(x,y) = x^2 + y^2$ is Lipschitz on every bounded domain)

> **Eg.** $\dfrac{dy}{dx} = y^{1/3}$: for $(x_0, y_0)$ there is a unique solution line passing it if $y_0 \neq 0$.
> ('cause $f(x,y) = y^{1/3}$ is Lipschitz on domains where $y \neq 0$)

> **Remark.** Picard–Lindelöf holds for $y(x): I \subseteq \mathbb{R} \to X$ with $X$ a complete metric space.

> **Example of Miller (1923):**
> $$y' = f(x,y), \quad y(0) = 0, \qquad f(x,y) = \begin{cases} 0 & ,\ x = 0,\ y \in \mathbb{R} \\ 2x & ,\ 0 \le x \le 1,\ y \le 0 \\ 2x - \dfrac{4y}{x} & ,\ 0 < x \le 1,\ 0 < y < x^2 \\ -2x & ,\ 0 < x \le 1,\ y \ge x^2 \end{cases}$$

![the Miller example](fig/ch02_fig_2_3_1.png)

$f(x,y)$ is continuous but not Lipschitz (notice $\dfrac{4\,|y_1 - y_2|}{|x|}$ near $x = 0$).

Picard sequence: $y_0(x) \equiv 0$, $y_1(x) = x^2$, $y_2(x) = -x^2$, $y_3(x) = x^2$, $\ldots$

But $f(x,y)$ is decreasing for $y$.

## 2.3 Peano's thm & Osgood Uniqueness

> **Thm (Peano).**
> $$\begin{cases} y' = f(x,y) \\ y(x_0) = y_0 \end{cases}, \qquad D := \{(x,y) :\ |x - x_0| \le a,\ |y - y_0| \le b\}.$$
> If $f \in C(D)$, then the Cauchy problem **has at least a solution** on
> $x \in [x_0 - h,\ x_0 + h]$, $h := \min\bigl\{a,\ \frac{b}{M}\bigr\}$, $M := \max_D f(x,y)$.
>
> **Pf.** For simplicity, we only construct the solution on $[x_0,\ x_0 + h]$.
>
> $\forall\, n$: cut $[x_0,\ x_0 + h]$ into $n$ segments, $x_k := x_0 + \dfrac{k}{n} h$.
>
> Construct for $x \in [x_k,\ x_{k+1}]$:
> $$
> y_n(x) = y_0 + \sum_{j=0}^{k-1} f(x_j, y_j)(x_{j+1} - x_j) + f(x_k, y_k)(x - x_k),
> \qquad y_j := y_n(x_j).
> $$

![Euler polygonal approximation $y_n(x)$](fig/ch02_fig_2_3_2.png)

Properties of $y_n$:

(1) $y_n \in C\,[x_0,\ x_0 + h]$, $\forall\, n$.

(2) $|y_n(x) - y_0| \le Mh$, $\forall\, n$. (uniformly bounded)

(3) $|y_n(x) - y_n(\tilde{x})| \le M$, $\forall\, n$, $\forall\, x, \tilde{x} \in [x_0,\ x_0 + h]$
(taking $x$ as a starting point, then $y_n(\tilde{x})$ varies at most $M$.)

![the $M$-cone around $y_n(x)$](fig/ch02_fig_2_3_3.png)

(4) Check $y_n(x)$ approximates the solution:

$$
\Bigl|\, y_n(x) - \Bigl[\, y_0 + \int_{x_0}^{x} f(s, y_n(s))\, ds\, \Bigr]\,\Bigr|
\le \sum_{j=0}^{k-1} \int_{x_j}^{x_{j+1}} \bigl|f(x_j, y_j) - f(s, y_n(s))\bigr|\, ds \ + \int_{x_k}^{x} \bigl|f(x_k, y_k) - f(s, y_n(s))\bigr|\, ds
< \varepsilon h.
$$

(taking $n \to \infty$, using $f \in C(D) \implies$ uniformly continuous)

By the A–A Lemma, we can find $y_{n_k}(x) \Rightarrow y(x)$, $x \in [x_0,\ x_0 + h]$; easily
$$
\Bigl|\, y(x) - \Bigl[\, y_0 + \int_{x_0}^{x} f(s, y(s))\, ds\, \Bigr]\,\Bigr| < \varepsilon \cdot (1 + 2h).
$$

We can prove that $y(x)$ solves the equation. $\square$

> **Def.**
> $f(x,y) \in C(\Omega)$ \& $|f(x,y_1) - f(x,y_2)| < F(|y_1 - y_2|)$,
> where $F \in C(0, +\infty)$ \& $\displaystyle\int_0^{\varepsilon} \frac{dr}{F(r)} = +\infty$, $\forall\, \varepsilon > 0$.
>
> We say $f(x,y)$ satisfies the **Osgood condition** on $\Omega$ w.r.t. $y$.

> **Thm (Osgood).**
> For the equation in Peano thm., if $f(x,y)$ satisfies the Osgood condition, then the solution is unique.
>
> **Pf.** Suppose $\varphi_1(x)$, $\varphi_2(x)$ are two different solutions.
>
> $\varphi_1(x_0) = \varphi_2(x_0)$, $\exists\, x_1$: $\varphi_1(x_1) \neq \varphi_2(x_1)$. Assume $x_1 > x_0$ \& $\varphi_1(x_1) > \varphi_2(x_1)$.
> $$
> r(x) := \varphi_1(x) - \varphi_2(x), \quad x^* := \sup\{x \in [x_0, x_1]\ : r(x) = 0\},
> $$
> $$
> \implies r(x^*) = 0, \quad r(x) > 0 \ \text{ for } \ x \in (x^*, x_1].
> $$
> $$
> r'(x) = \varphi_1'(x) - \varphi_2'(x) = f(x, \varphi_1(x)) - f(x, \varphi_2(x))
> \le F(|\varphi_1(x) - \varphi_2(x)|) \ = \ F(r(x)), \quad x \in (x^*, x_1].
> $$
> $$
> \implies\ \frac{r'(x)}{F(r(x))} \le 1\ \implies\ \int_{x^*}^{x_1} \frac{r'(x)}{F(r(x))}\, dx \ \le\ x_1 - x^* \quad \implies\ +\infty \le x_1 - x^*.
> $$
> Thus the assumption is wrong. $\square$

> **Prop.** For the equation in Peano thm., if $f(x,y)$ is decreasing w.r.t. $y$, then the solution is unique.
>
> **Pf.** Using $\varphi_1$, $\varphi_2$, $r(x)$, $x^*$:
> $$
> r'(x) = \varphi_1' - \varphi_2' \ = \ f(x, \varphi_1) - f(x, \varphi_2) \ \le 0, \quad x \in [x^*, x_1].
> $$
> $r(x) \downarrow$, but $r(x^*) = 0$, $r(x_1) > 0$. $\square$

> **Ex.** $y' = \begin{cases} 0 & ,\ y = 0 \\ y \ln|y| & ,\ y \neq 0 \end{cases}$: solution exists \& unique.
>
> **Pf.** For $(x_0, y_0) \in \mathbb{R}^2$:
>
> $y_0 \neq 0$: by Picard–Lindelöf.
>
> $y_0 = 0$: solution exists by Peano thm.
>
> Notice $y \equiv 0$ is a solution; suppose $\varphi(x)$ is another solution,
> $$
> \varphi'(x) = \varphi(x) \ln|\varphi(x)| \quad \text{for } x \in (x^*, x_1],
> $$
> $$
> \int_{x^*}^{x_1} \frac{\varphi'(x)}{\varphi(x) \ln|\varphi(x)|}\, dx \ =\ \ln|\ln|\varphi(x)|\,|\ \Big|_{\varphi(x^*)}^{\varphi(x_1)} \ =\ +\infty.
> $$
> Hence the assumption is wrong. $\square$

## 2.4 Extension of Solutions

> **Thm (Extension of Solutions).**
> $$\begin{cases} y' = f(x,y) \\ y(x_0) = y_0 \end{cases}, \quad \text{where } f \in C(\Omega),\ \Omega \text{ is a domain in } \mathbb{R} \times \mathbb{R}^n.$$
> Then any solution curve $\Gamma$ must extend to the boundary of $\Omega$,
> i.e. $\forall$ compact $\Omega_1 \ni (x_0, y_0)$, $\Gamma$ extends to $\Omega \setminus \Omega_1$.

![domain $\Omega$, compact $\Omega_1$ and the curve $\Gamma$](fig/ch02_fig_2_4_1.png)

> **Def.** $y_1$ \& $y_2$ are 2 solutions to $\begin{cases} y' = f(x,y) \\ y_0 = y(x_0) \end{cases}$: if $\mathrm{domain}(y_2) \supseteq \mathrm{domain}(y_1)$, and $y_2 = y_1$ on the common domain, we say that $y_2$ is an **extension** of $y_1$.

> **Def.** $y(x)$ is called a **maximal solution** if it is defined on an open interval and cannot be extended. Denote $(T_-, T_+) := \mathrm{domain}(y)$.

> **Thm.**
> Suppose $\Omega$ is a domain, $f \in C(\Omega)$. $\forall\, (x_0, y_0)$, there **exists a maximal solution** to the Cauchy problem $\begin{cases} y' = f(x,y) \\ y_0 = y(x_0) \end{cases}$.
>
> **Pf.** We prove it for an easier case (under the assumption that the solution is unique locally).
>
> $S = \{$ all solutions that solve the problem on an open interval $\}$.
>
> $\forall\, \varphi \in S$, assume it exists on the open interval $I_\varphi$.
>
> Denote $I = \bigcup_{\varphi \in S} I_\varphi$; it's clearly an open set.
>
> We prove that $I$ is an interval. $a := \inf\{x \in I\}$, $b := \sup\{x \in I\}$.
>
> For $\forall\, x^* \in (a, b)$:
>
> $x^* < b = \sup\{x \in I\} \implies \exists\, x_1 \in I$: $x^* < x_1 < b$ \& $x_1$ is close to $x^*$.
>
> Suppose $\varphi \in S$ s.t. $x_1 \in I_\varphi$; since $I_\varphi$ is an open interval,
> $x^* \in I_\varphi \implies x^* \in I$.
>
> Thus $I = (a, b)$. Define $y_m = \varphi$ on each $I_\varphi$ (for $\varphi$ unique; otherwise use Zorn's L.).
>
> Easy to check $y_m$ is the maximal solution. $\square$

> **Cor.**
> If $I_{\max} = (T_-, T_+)$, $T_+ < +\infty$, then $\forall$ compact $C$ s.t. $[x_0, T_+] \times C \subseteq \Omega$, the solution must go out of $[x_0, T_+] \times C$. ($y$ bounded $\implies x$ extended.)

> **Ex.** $y' = (x^2 + y^2 + 1) \sin \pi y$: then any solution exists in $\mathbb{R}$ and is monotonic.
>
> **Pf.** $f(x,y) = (x^2 + y^2 + 1) \sin \pi y \in C^1(\mathbb{R}^2)$, hence locally Lipschitz.
>
> Notice that $y = n \in \mathbb{Z} \implies y' = 0$, hence $y \equiv n$ are solutions.

![solution strips between the lines $y=n$](fig/ch02_fig_2_4_2.png)

For $(x_0, y_0)$ with $y_0 = n$: the unique solution is $y \equiv n$ and it's global.

For $(x_0, y_0)$ with $n < y_0 < n+1$: the unique solution can not cross $y = n$ \& $y = n+1$, so the solution is global.

The sign of $y'$ is only dependent on $y$; easily we notice $y$ is monotonic. $\square$

> **Ex.** $y' = (y^2 - 2y - 3)\, e^{(x+y)^2}$: then any solution with $I_{\max} = (T_-, T_+)$ has $T_- = -\infty$ or $T_+ = +\infty$.
>
> **Pf.** $f(x,y) = (y^2 - 2y - 3)\, e^{(x+y)^2} \in C^1(\mathbb{R})$, hence locally Lipschitz.
>
> Also, $y \equiv 3$ \& $y \equiv -1$ are global solutions.

![solutions around $y=3$ and $y=-1$](fig/ch02_fig_2_4_3.png)

For $y_0 > 3$: the solution can not cross $y = 3$, while the solution is increasing, so $T_- = -\infty$.

For $y_0 < -1$: the solution can not cross $y = -1$, while the solution is increasing, so $T_+ = +\infty$. $\square$

> **Ex (Liouville).** $y' = x^2 + y^2$: any solution must have bounded lifespan.
>
> **Pf.** WLOG $x_0 \ge 0$; looking at solution $\varphi$ on $(T_-, T_+)$. We prove that $T_+ < +\infty$ (same for $T_- > -\infty$).
>
> $\forall\ x_1 \in (x_0, T_+)$ fixed: $\varphi'(x) = x^2 + \varphi^2(x) \ge x_1^2 + \varphi^2(x)$ for $x > x_1$,
> $$
> \implies \frac{\varphi'(x)}{x_1^2 + \varphi^2(x)} \ge 1 \quad \implies \int_{x_1}^{z} \frac{\varphi'(x)}{x_1^2 + \varphi^2(x)}\, dx \ \ge\ z - x_1, \quad \forall\, z \in (x_1, T_+),
> $$
> $$
> \implies \frac{\pi}{x_1} \ =\ \frac{1}{x_1} \arctan\frac{\varphi(z)}{x_1} - \frac{1}{x_1} \arctan\frac{\varphi(x_1)}{x_1} \ \ge\ z - x_1
> \ \implies\ z \le x_1 + \frac{\pi}{x_1}.
> $$
> (in fact we use the comparison lemma)
>
> Letting $z \to T_+$, then $T_+ < +\infty$. $\square$

> **Ex.** $\begin{cases} y' = f(x,y) \\ y_0 = y(x_0) \end{cases}$, $f \in C(\mathbb{R}^2)$, satisfying
> $$
> |f(x,y)| \le M(T) + L(T)\,|y|, \quad \forall\, T, \ \forall\, (x,y) \in [-T, T] \times \mathbb{R},
> $$
> here $M, L > 0$ are continuous functions. Then any solution is global.
>
> **Pf.** Consider $\forall\, [x_0, T]$ for $T$ large enough:
> $$
> y(x) = y_0 + \int_{x_0}^{x} f(s, y(s))\, ds
> \ \implies\ |y(x)| \le |y_0| + \int_{x_0}^{x} \bigl(M(T) + L(T)\,|y(s)|\bigr) ds,
> $$
> $$
> \implies |y(x)| \le \bigl(|y_0| + M(T)(T - x_0)\bigr)\, e^{L(T)(x - x_0)} \qquad \text{(Gronwall)}.
> $$
> Hence $|y(x)|$ is bounded on $[x_0, T]$, then the solution can be extended to $+\infty$. Similar proof for the negative direction. $\square$

## 2.5 Comparison Lemma

> **Lemma (1st Comparison Principle).**
> $\Omega$ is a domain, $f, F \in C(\Omega)$ \& $F > f$ on $\Omega$ (strictly).
> $$
> \begin{cases} y' = f(x,y) \\ y(x_0) = y_0 \end{cases} \text{ has solution } \varphi, \qquad \begin{cases} y' = F(x,y) \\ y(x_0) = y_0 \end{cases} \text{ has solution } \psi \quad \text{on } (a,b) \ni x_0.
> $$
> Then $\varphi(x) > \psi(x)$ if $x \in (a, x_0)$, $\varphi(x) < \psi(x)$ if $x \in (x_0, b)$.
>
> **Pf.** $h(x) := \psi(x) - \varphi(x)$, $h(x_0) = 0$, $h'(x) > 0$, $\forall\, x \in (a, b)$; then $\exists\, \delta$, s.t. $h(x) > 0$ on $(x_0, x_0 + \delta)$, $h(x) < 0$ on $(x_0 - \delta, x_0)$ (using here).
>
> Suppose $h(x) > 0$ does not hold on $(x_0, b)$, then $\exists\, x_1$ s.t. $h(x_1) \le 0$. Taking
> $$
> x^* = \inf\{x \in (x_0, b) : h(x) \le 0\},
> $$
> then $h(x^*) = 0$ \& $h'(x^*) < 0$, which leads to contradiction.
>
> Similarly we can check the other side. $\square$

> **Ex.** $y' = f(x,y)$, $f \in C(\Omega)$ \& $|f| \le A(x)|y| + B(x)$, here $\Omega = (a,b) \times \mathbb{R}$ and $A(x), B(x) > 0$ are continuous on $(a,b)$. Then any solution has lifespan $I_{\max} = (a,b)$.
> *(green margin note: we don't know whether the solution is unique, so we have to construct an object to compare.)*
>
> **Pf.** $F := A(x)|y| + B(x) + 1$, $G := -F$.
> $\begin{cases} y' = F(x,y) \\ y(x_0) = y_0 \end{cases}$ has a unique solution (for $F$ locally Lipschitz); the solution is strictly increasing, thus has at most 1 zero on $I_{\max}$.
>
> Case 1. $y(x)$ has no zero, WLOG $y(x) > 0$: $\begin{cases} y' = A(x)y + B(x) \\ y(x_0) = y_0 \end{cases}$ is a 1st order ODE, solution exists on $(a,b)$.
>
> Case 2. $y(x)$ has 1 zero $x_1$: we can derive 2 equations
> $$
> \begin{cases} y' = A(x)y + B(x) \\ y(x_1) = 0 \end{cases} \text{ on } x > x_1, \qquad \begin{cases} y' = -A(x)y + B(x) \\ y(x_1) = 0 \end{cases} \text{ on } x < x_1.
> $$
> Solution exists on $(a,b)$.
>
> Same for $G$. By the 1st comparison lemma, the solution of the original equation is bounded on any compact $C \subseteq (a,b)$, thus global. $\square$

> **Def.**
> Consider $y' = f(x,y)$, $f \in C(\Omega)$; then a solution exists by Peano thm.
> If $y_1, y_2$ are 2 solutions on interval $I$ satisfying
> $$
> \forall \text{ solution } y(x) \text{ on } I, \quad y_1(x) \le y(x) \le y_2(x),
> $$
> we call $y_2(x)$ a **sup-solution**, $y_1(x)$ a **sub-solution**.

![solutions squeezed between the sub-solution and sup-solution](fig/ch02_fig_2_5_1.png)

> **Thm.**
> $f(x,y) \in C(D)$, then $\exists\, \tau > 0$ s.t. the sup-solution and sub-solution exist on $\{x : |x - x_0| < \tau\}$.
> *(red margin note: create $f_n$ to use the Comparison Principle.)*
>
> **Pf.** Setting $f_n(x,y) = f(x,y) + \varepsilon_n$, $\ \varepsilon_n \downarrow 0+$.
>
> $\begin{cases} y' = f_n(x,y) \\ y(x_0) = y_0 \end{cases}$: by Peano thm, we find a solution $\varphi_n(x)$ on $[x_0 - h_n,\ x_0 + h_n]$,
> $$
> h_n := \min\Bigl\{a,\ \frac{b}{M_n}\Bigr\}, \quad M_n := \sup_D |f_n(x,y)|.
> $$
>
> $|\varphi_n(x) - y_0| \le b$, $\forall n$. (uniformly bounded)
> $$
> |\varphi_n(x) - \varphi_n(x')| = \Bigl| \int_x^{x'} f_n(s, y_n(s))\, ds \Bigr| \le M_n |x - x'| \le (M+1) \cdot |x - x'|
> $$
> (equicontinuous)
>
> Take $\tau < h$, then $\{ |x - x_0| < \tau \} \subseteq \{ |x - x_0| \le h_n \}$ for $n$ large enough.
>
> Apply A–A on $[x_0 - \tau,\ x_0 + \tau]$: $\exists\ \varphi_{n_k} \Rightarrow \varphi$, where $\varphi$ solves the original IVP.
> $$
> \begin{cases} y' = f_n \\ y(x_0) = y_0 \end{cases} \ (\varphi_n), \qquad \begin{cases} y' = f \\ y(x_0) = y_0 \end{cases} \ (\varphi), \qquad f_n = f + \varepsilon_n \to f.
> $$
>
> Then $\varphi_n(x) > \varphi(x)$ for $x > x_0$; $\varphi_n(x) < \varphi(x)$ for $x < x_0$.
>
> Take the $h_k$ limit: we have $\varphi$ is a sup on $(x_0, x_0 + \tau)$ and sub on $(x_0 - \tau, x_0)$.
>
> Redo the process by taking $\varepsilon_n \uparrow 0-$ to get the other side. $\square$

> **Thm (2nd comparison).**
> Consider
> $$
> \begin{cases} y' = f(x,y) \\ y(x_0) = y_0 \end{cases} \quad (\times) \qquad \begin{cases} y' = F(x,y) \\ y(x_0) = y_0 \end{cases} \quad (\times\times) \qquad f(x,y) \le F(x,y) \quad \text{(not strictly)}
> $$
>
> Denote $\varphi(x)$ a sub-solution on $[x_0, b)$, sup-solution on $(a, x_0]$ for $(\times)$;
> $\psi(x)$ a sup-solution on $[x_0, b)$, sub-solution on $(a, x_0]$ for $(\times\times)$.
>
> Then $\varphi(x) \le \psi(x)$ for $x \ge x_0$; $\varphi(x) \ge \psi(x)$ for $x \le x_0$.
>
> **Pf.** $\begin{cases} y' = F(x,y) + \varepsilon_n \\ y(x_0) = y_0 \end{cases} \ (\varepsilon_n \downarrow 0) \Rightarrow \psi_n(x)$, $\quad \begin{cases} y' = f(x,y) - \varepsilon_n \\ y(x_0) = y_0 \end{cases} \ (\varepsilon_n \downarrow 0) \Rightarrow \varphi_n(x)$
> *(red note: we have to construct a strict inequality.)*
>
> From the existence of sup \& sub solutions we have $\psi_{n,k} \Rightarrow \psi$, $\ \varphi_{n,k} \Rightarrow \varphi$.
>
> By the 1st comparison lemma we can prove this theorem. $\square$

> **Ex.★** $\begin{cases} y' = x^2 + (y+1)^2 \\ y(0) = 0 \end{cases}$: the **lifespan** $(T_-, T_+)$ satisfies $T_+ \in (\tfrac{\pi}{4}, 1)$.
>
> **Pf.** For this equation, the solution is unique and has bounded lifespan.
>
> **Step 1.** Prove $T_+ \in [\tfrac{\pi}{4}, 1]$. Consider $|x| \le 1$:
> $$
> \begin{cases} y' = (y+1)^2 \\ y(0) = 0 \end{cases} \qquad \begin{cases} y' = x^2 + (y+1)^2 \\ y(0) = 0 \end{cases} \qquad \begin{cases} y' = 1 + (y+1)^2 \\ y(0) = 0 \end{cases}
> $$
> Then by comparison on $[0,1]$:
> $$
> \frac{-1}{x-1} - 1 \ \le\ y(x) \ \le\ \tan\Bigl(x + \frac{\pi}{4}\Bigr) - 1.
> $$
> *(green side notes: $\frac{-1}{x-1} - 1$ exists on $[0,1)$; $\tan(x+\frac{\pi}{4}) - 1$ exists on $[0, \frac{\pi}{4})$.)*
>
> Calculate: $T_+ \in [\tfrac{\pi}{4}, 1]$.
>
> **Step 2.** Prove $T_+ \in (\tfrac{\pi}{4}, 1)$.
>
> Notice $y' > 0$, then $x = \varphi(y)$:
> $$
> \varphi'(y) = \frac{1}{x^2 + (y+1)^2}, \qquad \lim_{y \to +\infty} \varphi(y) = T_+,
> $$
> so $\varphi(y) - \varphi(0) = \int_0^y \frac{ds}{x^2 + (s+1)^2}$; ($y \to +\infty$) $\Rightarrow T_+ = \int_0^{+\infty} \frac{ds}{x^2 + (s+1)^2}$.
>
> By Step 1 we have $0 \le x < T_+ \le 1$, thus
> $$
> \int_0^{+\infty} \frac{ds}{1 + (s+1)^2} < T_+ < \int_0^{+\infty} \frac{ds}{(s+1)^2} \quad \Rightarrow \quad \frac{\pi}{4} < T_+ < 1. \qquad \square
> $$

## 2.6 Dependence on data & parameter

> **Q.** If a small perturbation of data / parameter yields a small / big difference of solution.

We can always combine the 2 problems together.

Original problem: $\begin{cases} y' = f(x,y,\lambda) \\ y(x_0) = y_0 \end{cases}$

**Reduction #1.** $u := y - y_0$, $t := x - x_0$, we have
$$
\begin{cases} u'(t) = g(u, t, \Lambda) \\ u(0) = 0 \end{cases}, \qquad \Lambda := (x_0, y_0, \lambda).
$$

**Reduction #2.** Consider $U(x) = (y(x)\ \ z(x))^T$.
$$
\begin{cases} y' = f(x,y,\lambda) \\ y(x_0) = y_0 \end{cases} \qquad \begin{cases} z' = 0 \\ z(x_0) = \lambda \end{cases}
$$
then we get $U'(x) = F(x, U) = \begin{pmatrix} f(x,y,z) \\ 0 \end{pmatrix}$, $U(x_0) = \begin{pmatrix} y_0 \\ \lambda \end{pmatrix}$.

So we should talk about equations with $y \in \mathbb{R}^n$:
$$
y : \mathbb{R} \to \mathbb{R}^n, \qquad f : \mathbb{R} \times \mathbb{R}^n \to \mathbb{R}^n, \qquad \begin{cases} y' = f(x,y) \\ y(x_0) = y_0 \end{cases}
$$
satisfying

(1) Picard–Lindelöf Thm \quad (2) Peano Thm \quad (3) Extension Thm

which have been proved.

(4) $y' = A(x)y + b(x)$, $A(x), b(x) \in C(a,b)$: then the solution is unique and extends to $(a,b)$.

**Pf.** We only need to prove the solution $y(x)$ bounded on $(c,d) \subseteq (a,b)$:
$$
\frac{d}{dx}\, \| y(x) \|^2 = \frac{d}{dx}\, y(x)^T y(x) = y(x)^T \bigl( A(x)y + b(x) \bigr) + \bigl( y^T A^T + b^T \bigr) y(x)
\le 2\, \| y(x) \| \cdot \bigl( \| A(x) \| \cdot \| y(x) \| + \| b(x) \| \bigr),
$$
$$
\Rightarrow \frac{d}{dx}\, \| y(x) \| \le \| A(x) \| \cdot \| y(x) \| + \| b(x) \| \le M \cdot \| y(x) \| + N.
$$
By Gronwall, $\| y(x) \|$ is bounded. $\square$

### 2.6.1 Continuous dependence

> **Thm (C dependence).**
> $\Omega$ is a bounded region of $\mathbb{R} \times \mathbb{R}^n$, $\begin{cases} y' = f(x,y) \\ y(x_0) = y_0 \end{cases}$.
>
> Suppose $f \in C(\Omega)$ \& $\forall (x_0, y_0)$ the solution is unique on $I_0$ (closed interval).
>
> Then the solution $\varphi(x\,;\, x_0, y_0)$ is continuous w.r.t. $(x_0, y_0)$:
> i.e. $\forall \varepsilon > 0$, $\exists \delta > 0$: $\| x_0 - \tilde{x}_0 \| + \| y_0 - \tilde{y}_0 \| < \delta$
> $$
> \Rightarrow \| \varphi(x\,;\, x_0, y_0) - \varphi(x\,;\, \tilde{x}_0, \tilde{y}_0) \| < \varepsilon, \quad \forall x \in I_0.
> $$
>
> **Pf.** Suppose the conclusion is false: $\exists \varepsilon_0 > 0$, $\forall n$,
> we find $\| (x_0^{(n)}, y_0^{(n)}) - (x_0, y_0) \| < \frac{1}{n}$ with
> $\| \varphi(x_n\,;\, x_0^{(n)}, y_0^{(n)}) - \varphi(x_n\,;\, x_0, y_0) \| \ge \varepsilon_0$.
>
> Since $I_0$ is compact, $\exists \{ x_{n_k} \} \subseteq \{ x_n \}$: $x_{n_k} \Rightarrow x^* \in I_0$.
>
> Check: $\varphi(x\,;\, x_0^{(n)}, y_0^{(n)})$ is uniformly bounded \& equicontinuous.
>
> (1) $\varphi(x\,;\, x_0^{(n)}, y_0^{(n)}) = y_0^{(n)} + \int_{x_0^{(n)}}^x f(s, \varphi(s))\, ds$: uniformly bounded.
>
> (2) $| \varphi(x\,;\, x_0^{(n)}, y_0^{(n)}) - \varphi(\tilde{x}\,;\, x_0^{(n)}, y_0^{(n)}) | = \bigl| \int_x^{\tilde{x}} f(s, \varphi(s))\, ds \bigr| \le M\, |x - \tilde{x}|$.
>
> By the A–A Lemma, $\exists n_k$ s.t. $\varphi(x\,;\, x_0^{(n_k)}, y_0^{(n_k)}) \Rightarrow \widetilde{\varphi}(x)$.
>
> Notice the IVP has a unique solution, so $\widetilde{\varphi}(x) = \varphi(x\,;\, x_0, y_0)$.
>
> Taking the limit in $x$, we have
> $$
> 0 = \| \varphi(x^*\,;\, x_0, y_0) - \varphi(x^*\,;\, x_0, y_0) \| \ge \varepsilon_0. \qquad \text{Contradiction.} \quad \square
> $$

> **Lemma (Quantitative bound).**
> $\begin{cases} y' = f(x,y) \\ y(x_0) = y_0 \end{cases}$, $\begin{cases} y' = f(x,y) \\ y(x_0) = \tilde{y}_0 \end{cases}$ have corresponding $\varphi, \psi$ on $I$.
>
> Then $| \varphi(x) - \psi(x) | \le | y_0 - \tilde{y}_0 | \cdot e^{L \cdot |x - x_0|}$, where $L$ denotes the Lipschitz constant of $f$.
>
> **Pf.** WLOG $x_0 = 0$:
> $$
> | \varphi - \psi | = \Bigl| y_0 - \tilde{y}_0 + \int_{x_0}^x f(s, \varphi(s)) - f(s, \psi(s))\, ds \ \Bigr|.
> $$
> By Gronwall we get the conclusion. $\square$

### 2.6.2 $C^1$ dependence on data \& parameters

> **Thm ($C^1$ dependence).**
> $\begin{cases} y' = f(x,y,\lambda) \\ y(0) = 0 \end{cases}$, $\quad \Omega = \{ \|x\| \le a,\ \|y\| \le b,\ \|\lambda\| \le c \}$, $f \in C(\Omega)$, $f_y, f_\lambda \in C(\Omega)$.
>
> Then the solution $y = \varphi(x, \lambda) \in C^1(D)$, where
> $$
> D := \{ |x| \le h,\ |\lambda| < c \}, \quad h := \min \Bigl\{ a, \frac{b}{M_f} \Bigr\}.
> $$
>
> **Pf.** $\varphi(x, \lambda)$ is $C^1$ w.r.t. $x$; we only need to prove it for $\lambda$.
>
> $\varphi(x, \lambda)$ satisfies $\varphi(x, \lambda) = \int_0^x f(s, \varphi(s, \lambda), \lambda)\, ds$.
>
> If $\varphi(x, \lambda)$ is differentiable, then
> $$
> \frac{\partial \varphi}{\partial \lambda} = \int_0^x \frac{\partial f}{\partial y}(s, \varphi, \lambda) \cdot \frac{\partial \varphi}{\partial \lambda} + \frac{\partial f}{\partial \lambda}(s, \varphi, \lambda)\, ds,
> $$
> i.e. $u := \dfrac{\partial \varphi}{\partial \lambda}$ satisfies the equation (a 1st-order ODE)
> $$
> \begin{cases} \dfrac{du}{dx} = \dfrac{\partial f}{\partial y}(x, \varphi(x,\lambda), \lambda) \cdot u + \dfrac{\partial f}{\partial \lambda}(x, \varphi(x,\lambda), \lambda) \\ u(0, \lambda) = 0 \end{cases} \quad (\times)
> $$
>
> So we only have to prove:
>
> ① $(\times)$ has a unique solution on $|x| \le h$, $|\lambda| \le C$.
>
> ② The solution to $(\times)$ is the derivative, i.e.
> $$
> | \varphi(x, \lambda) - \varphi(x, \lambda_0) - u(x, \lambda_0)(\lambda - \lambda_0) | = o(|\lambda - \lambda_0|).
> $$
>
> ① follows 1st-order ODE theory. We only need to prove ②. The proof of ② uses basic calculating:
> $$
> \varphi(x, \lambda) - \varphi(x, \lambda_0) - u(x, \lambda_0)(\lambda - \lambda_0)
> $$
> $$
> = \int_0^x f(s, \varphi(s, \lambda), \lambda)\, ds - \int_0^x f(s, \varphi(s, \lambda_0), \lambda_0)\, ds
> - \int_0^x \Bigl[ \frac{\partial f}{\partial y}(s, \varphi(s, \lambda_0), \lambda_0)\, u(s, \lambda_0) + \frac{\partial f}{\partial \lambda}(s, \varphi(s, \lambda_0), \lambda_0) \Bigr] (\lambda - \lambda_0)\, ds
> $$
> $$
> = \int_0^x \int_0^1 \frac{\partial f}{\partial \lambda}(s, \varphi(s, \lambda),\, \theta\lambda + (1-\theta)\lambda_0)\, d\theta\, (\lambda - \lambda_0)\, ds
> + \int_0^x \int_0^1 \frac{\partial f}{\partial y}(s,\, \theta\varphi(s, \lambda) + (1-\theta)\varphi(s, \lambda_0),\, \lambda_0)\, d\theta\, \bigl( \varphi(s, \lambda) - \varphi(s, \lambda_0) \bigr) ds
> $$
> $$
> - \int_0^x \frac{\partial f}{\partial y}(s, \varphi(s, \lambda_0), \lambda_0)\, u(s, \lambda_0)\, (\lambda - \lambda_0)\, ds
> - \int_0^x \frac{\partial f}{\partial \lambda}(s, \varphi(s, \lambda_0), \lambda_0)\, (\lambda - \lambda_0)\, ds
> $$
> $$
> = \int_0^x \int_0^1 \Bigl[ \frac{\partial f}{\partial \lambda}(s, \varphi(s, \lambda),\, \theta\lambda + (1-\theta)\lambda_0) - \frac{\partial f}{\partial \lambda}(s, \varphi(s, \lambda_0), \lambda_0) \Bigr] d\theta\, ds\, (\lambda - \lambda_0)
> $$
> $$
> + \int_0^x \int_0^1 \frac{\partial f}{\partial y}(s,\, \theta\varphi(s, \lambda) + (1-\theta)\varphi(s, \lambda_0),\, \lambda_0)\, d\theta\, \bigl[ \varphi(s, \lambda) - \varphi(s, \lambda_0) - u(s, \lambda_0)(\lambda - \lambda_0) \bigr] ds
> $$
> $$
> + \int_0^x \int_0^1 \Bigl[ \frac{\partial f}{\partial y}(s,\, \theta\varphi(s, \lambda) + (1-\theta)\varphi(s, \lambda_0),\, \lambda_0) - \frac{\partial f}{\partial y}(s, \varphi(s, \lambda_0), \lambda_0) \Bigr] d\theta\, u(s, \lambda_0)(\lambda - \lambda_0)\, ds
> $$
>
> Denote $\Delta(x) = | \varphi(x, \lambda) - \varphi(x, \lambda_0) - u(x, \lambda_0)(\lambda - \lambda_0) |$; then by the continuity of $\dfrac{\partial f}{\partial y}$, $\dfrac{\partial f}{\partial \lambda}$ and $\varphi(x, \lambda)$, we have
> $$
> \Delta(x) \le \Bigl| \int_0^x \int_0^1 \varepsilon_1\, d\theta\, ds\, (\lambda - \lambda_0) \Bigr| + \Bigl| \int_0^x \int_0^1 K\, d\theta\, \Delta(s)\, ds \Bigr| + \Bigl| \int_0^x \int_0^1 \varepsilon_1\, d\theta\, K(\lambda - \lambda_0)\, ds \Bigr|
> $$
> For $x \in [0, h]$: $\Delta(x) \le \varepsilon_1 h\, |\lambda - \lambda_0| + \varepsilon_1 K h\, |\lambda - \lambda_0| + K \int_0^x \Delta(s)\, ds$.
>
> By Gronwall, $\Delta(x) \le \varepsilon_1 (K+1) h\, |\lambda - \lambda_0|\, e^{Kx}$, hence
> $$
> \frac{\Delta(x)}{|\lambda - \lambda_0|} \le \varepsilon_1 (K+1)\, h\, e^{Kh} < \varepsilon \quad \Rightarrow \quad \lim_{\lambda \to \lambda_0} \frac{\Delta(x)}{|\lambda - \lambda_0|} = 0.
> $$
> Similar proof for $x \in [-h, 0]$. $\square$

> **Cor.**
> In this theorem, if $f \in C^k(\Omega)$, then the solution $\varphi(x, \lambda)$ is also $C^k$ on $D$. (By induction.)

> **Thm.**
> If $f$ is analytic in $\Omega$ (or analytic w.r.t. $\lambda$), then the solution is analytic in $D$ (or analytic w.r.t. $\lambda$).

> **Ex.** $\begin{cases} \dfrac{dy}{dx} = y + \lambda(x + y^2) \\ y(0) = 1 \end{cases}$, find $\left. \dfrac{\partial y}{\partial \lambda} \right|_{\lambda = 0}$.
>
> **Sol.** $y(x, \lambda) = 1 + \displaystyle\int_0^x y(s, \lambda) + \lambda(s + y^2(s, \lambda))\, ds$,
> $$
> \frac{\partial y}{\partial \lambda}(x, \lambda) = \int_0^x \frac{\partial y}{\partial \lambda}(s, \lambda) + s + y^2(s, \lambda) + \lambda \cdot 2y(s, \lambda) \cdot \frac{\partial y}{\partial \lambda}(s, \lambda)\, ds,
> $$
> hence $u(x, \lambda) := \dfrac{\partial y}{\partial \lambda}(x, \lambda)$ solves (a 1st-order ODE)
> $$
> \begin{cases} \dfrac{d}{dx}\, u(x, \lambda) = (1 + 2\lambda\, y(x, \lambda))\, u(x, \lambda) + (x + y^2(x, \lambda)) \\ u(0, \lambda) = 0 \end{cases}
> $$
>
> We can simply solve it:
> $$
> e^{-\int_0^x A(s)\, ds}\ u(x, \lambda) = \int_0^x e^{-\int_0^z A(s)\, ds}\ B(z)\, dz,
> \qquad A(x, \lambda) = 1 + 2\lambda\, y(x, \lambda), \quad B(x, \lambda) = x + y^2(x, \lambda).
> $$
>
> Plug in $\lambda = 0$, we have
> $$
> e^{-x}\ u(x, 0) = \int_0^x (z e^{-z} + e^z)\, dz = e^x - e^{-x}(x+1),
> $$
> hence $u(x, 0) = e^{2x} - (x+1)$. $\square$
