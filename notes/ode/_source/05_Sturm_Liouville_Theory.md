---
layout: note
kind: note
title: "Chapter 5　Sturm–Liouville Theory"
course: ode
order: 5
date: 2026-10-26
---

本章研究二阶 ODE 的边值问题：Sturm 分离定理与比较定理，Sturm–Liouville 问题及其特征值理论（Prüfer 变换），周期 Sturm–Liouville 问题，以及非线性方程的边值问题（打靶法、Poincaré 映射与隐函数定理）。

## 5.1 Sturm Separation & Comparison Thm

$$
y''+p(x)y'+q(x)y=0, \qquad\text{interval } J\subseteq\mathbb{R},\ p(x),q(x)\in C(J).
$$

*(margin: $y''+py'+qy=f(x)$ has general solution $\varphi_1(x)\int\frac{W_1(x)}{W(x)}f(x) + \varphi_2(x)\int\frac{W_2(x)}{W(x)}f(x)$, where $\begin{vmatrix} 0 & 1\\ -p & -q \end{vmatrix}$.)*

> **Thm (Separation Thm).**
>
> Consider $y''+p(x)y'+q(x)y=0$ on interval $J$.
>
> (1) For any nonzero solution $\varphi(x)$, any zero of $\varphi(x)$ is **isolated**.
>
> (2) For any 2 nonzero solutions $\varphi_1,\varphi_2$:
>
> ① $\varphi_1,\varphi_2$ dependent $\iff\varphi_1,\varphi_2$ have the same zeros.
>
> ② $\varphi_1,\varphi_2$ independent $\iff\varphi_1,\varphi_2$ have alternate zeros (i.e. interlace strictly).
>
> *(Hint: construct $\varphi_1'\varphi_2-\varphi_1\varphi_2'$.)*
>
> **Pf.** (1) Suppose the zero set $\{x_j\}\subseteq J$ with $x_j\to x_0\in J$, then
> $$
> \varphi'(x_0)=\lim_{j\to\infty}\frac{\varphi(x_j)-\varphi(x_0)}{x_j-x_0}=0.
> $$
> So we get $\begin{cases}\varphi'(x_0)=0\\ \varphi(x_0)=0\end{cases}$, then $\varphi(x)\equiv0$. $\square$
>
> (2) ① $\Rightarrow$: $\varphi_2=c\varphi_1$ $(c\neq0)$, so they have the same zeros.
>
> $\Leftarrow$: Consider $W(\varphi_1,\varphi_2)=\varphi_1\varphi_2'-\varphi_1'\varphi_2$. *(margin: $y''+py'+qy=0$, $\begin{pmatrix}y'\\y''\end{pmatrix}=\begin{pmatrix}0&1\\-p&-q\end{pmatrix}\begin{pmatrix}y\\y'\end{pmatrix}$, $W(x)=W(x_0)e^{\int_{x_0}^{x}\operatorname{tr}A(s)ds}$, $\operatorname{tr}A(s)=-q$.)*
>
> At any common zero $x_0$: $W(\varphi_1,\varphi_2)(x_0)=0$, so $W(\varphi_1,\varphi_2)\equiv0$. $\square$
>
> ② $\Leftarrow$: Using ①.
>
> $\Rightarrow$: We prove: for any 2 consecutive zeros $x_1<x_2$ of $\varphi(x)$, there exists $c\in(x_1,x_2)$ s.t. $\varphi_2(c)=0$. Suppose $\varphi_2(x)\neq0$ on $x\in(x_1,x_2)$.
>
> Since $\varphi_1,\varphi_2$ are linearly independent, $\varphi_2(x)\neq0$ on $[x_1,x_2]$. Consider $\psi(x)=\dfrac{\varphi_1(x)}{\varphi_2(x)}$ on $[x_1,x_2]$, $\psi\in C'[x_1,x_2]$:
> $$
> \psi(x_1)=\psi(x_2)=0\ \Rightarrow\ \exists c\in(x_1,x_2): \psi'(c)=0,
> $$
> $$
> \text{so}\quad \varphi_1'(c)\varphi_2(c)-\varphi_1(c)\varphi_2'(c)=0\ \Rightarrow\ W(c)=0.
> $$
> We get $\varphi_1,\varphi_2$ dependent. Contradiction! $\square$

> **Thm (Sturm's Comparison Thm).**
>
> $$
> y''+P(x)y'+Q_1(x)y=0\ (*) \qquad\text{and}\qquad y''+P(x)y'+Q_2(x)y=0\ (\ast\ast)
> $$
> on $J$ with $P,Q_1,Q_2\in C(J)$. ($Q_1\le Q_2\ \Rightarrow\ Q_2$ waves faster $\Rightarrow$ more zeros.)
>
> Suppose the nonzero $\varphi(x)$ solves $(*)$ and has consecutive zeros $x_1<x_2$. If $Q_1(x)\le Q_2(x)$, then any solution $\psi(x)$ of $(\ast\ast)$ satisfies
> $$
> \exists\ c\in[x_1,x_2] \ \text{s.t. } \psi(c)=0.
> $$
> (If $Q_1<Q_2$, then $c\in(x_1,x_2)$.)
>
> **Pf.** Suppose $\varphi(x)>0$ for $x\in(x_1,x_2)$; then $\varphi'(x_1)>0$, $\varphi'(x_2)<0$.
>
> $\forall\ \psi(x)$ solving $(\ast\ast)$, suppose $\psi(x)\neq0$ on $[x_1,x_2]$; WLOG $\psi>0$ on $(x_1,x_2)$:
> $$
> \begin{cases} \varphi''+P\varphi'+Q_1\varphi=0 & \text{(I)}\\ \psi''+P\psi'+Q_2\psi=0 & \text{(II)} \end{cases}, \qquad\text{taking }\psi(\text{I})-\varphi(\text{II}).
> $$
>
> Denote $v(x)=\psi'\varphi-\psi\varphi'$, $v'(x)=\psi''\varphi-\psi\varphi''$; we get
> $$
> v'(x)+P(x)v(x)=(Q_2-Q_1)\varphi\psi
> \ \Rightarrow\ \bigl(v(x)e^{\int_{x_1}^{x}P(s)ds}\bigr)'=(Q_2-Q_1)\varphi\psi\ e^{\int_{x_1}^{x}P(s)ds}\ \ge 0.
> $$
>
> So we get $v(x_2)e^{\int_{x_1}^{x_2}P(s)ds}\ge v(x_1)$.
>
> But $v(x_2)=\varphi'(x_2)\psi(x_2)<0$, $v(x_1)=\varphi'(x_1)\psi(x_1)>0$.
>
> Contradiction. So $\psi(x)$ must have a zero in $[x_1,x_2]$. $\square$

> **Def.**
> Consider $\mathcal{L}:=\dfrac{d^2}{dx^2}+p(x)\dfrac{d}{dx}+q(x)$ (or $A(x)\dfrac{d^2}{dx^2}+B(x)\dfrac{d}{dx}+C(x)$).
>
> If $\varphi$ is a nontrivial solution, i.e. $\mathcal{L}\varphi=0$ on $J$, and $\varphi$ has infinite zeros in $J$, we call $\varphi$ an **oscillating solution** on $J$.

> **Rem.**
> If $\exists\varphi$ oscillating, then any nontrivial solution is oscillating — because for any nontrivial $\psi$, either $\psi=c\varphi$ or $\psi,\varphi$ have alternate zeros. So we usually call $\mathcal{L}$ oscillating.

> **Ex.** Consider $y''(x)+p(x)y'(x)+q(x)y(x)=0$: if $q(x)\le0$ on $J$, then any solution has at most 1 zero on $J$.
>
> **Pf.** $y''+p(x)y'+q(x)y=0$ (I); $y''+p(x)y'=0$ (II).
>
> By Sturm's Thm, if (I) has 2 zeros $x_1<x_2$, then any solution of (II) has a zero in $[x_1,x_2]$.
>
> But $y\equiv1$ is a solution to (II). Contradiction! $\square$

> **Ex.** Consider $y''+Q(x)y=0$, $Q(x)\in C[a,+\infty)$ \& $Q(x)\ge m>0$. Then any solution $\varphi(x)$ is oscillating, and the gap between consecutive zeros $x_1-x_2<\frac{\pi}{\sqrt{m}}$.
>
> **Pf.** Consider $y''+my=0$, which has a solution $y=\cos\sqrt{m}x$ with infinite zeros \& gap $=\frac{\pi}{\sqrt{m}}$. $\square$

> **Ex.** $x^2y''+xy'+(x^2-\alpha^2)y=0$, $\alpha\ge0$. Consider the zeros:
> $$
> \Rightarrow\ y''+\frac1xy'+\Bigl(1-\frac{\alpha^2}{x^2}\Bigr)y=0.
> $$
>
> Consider the Euler eq. $y''+\frac1xy'+\frac{c}{x^2}y=0\ \Rightarrow\ x^2y''+xy'+cy=0$.
>
> Try $x^{\lambda}$ $\ \Rightarrow\ \lambda(\lambda-1)+\lambda+c=0\ \Rightarrow\ \lambda=\pm i\sqrt{c}$.
>
> So we get $\cos(\sqrt{c}\ln x)$, $\sin(\sqrt{c}\ln x)$ as fundamental solutions.
> $$
> \begin{cases} y''+\frac1xy'+(1-\frac{\alpha^2}{x^2})y=0\\ y''+\frac1xy'+\frac{c}{x^2}y=0 \end{cases}: \qquad\text{we want }\ 1-\frac{\alpha^2}{x^2}>\frac{c}{x^2}. \quad(*)
> $$
>
> Choose $N$ s.t. $[N,+\infty)$ makes $(*)$ right.
>
> So we know the original solution is oscillating. $\square$

> **Ex.** $y''+p(x)y=0$, $p(x)\in C(\mathbb{R})$, $n^2<p(x)<(n+1)^2$: any nontrivial solution cannot be $2\pi$-periodic.
>
> **Pf.** Suppose $\varphi(x)$ is a $2\pi$-periodic solution, then
> $$
> \begin{cases} \varphi''(x+2\pi)+p(x+2\pi)\varphi(x+2\pi)=0\\ \varphi''(x)+p(x)\varphi(x)=0 \end{cases}\ \Rightarrow\ \varphi(x)\bigl[p(x+2\pi)-p(x)\bigr]=0.
> $$
>
> Consider $I_{\varphi}=\{x:\varphi(x)=0\}$; $I_\varphi$ has only isolated points.
>
> So $p(x)=p(x+2\pi)$ holds for $x\notin I_\varphi$.
>
> Notice $I_\varphi^{\ C}$ is dense in $\mathbb{R}$ \& $p(x)\in C(\mathbb{R})$, we get $p(x)=p(x+2\pi)$.
>
> So $p(x)$ is $2\pi$-periodic; $p(x)$ must reach its max \& min. Hence $\exists\delta$ s.t. $(n+\delta)^2<p(x)<(n+1-\delta)^2$.
>
> Now we get
> $$
> \begin{cases} y''+(n+\delta)^2y=0\\ y''+p(x)y=0\\ y''+(n+1-\delta)^2y=0 \end{cases}\qquad\text{so the gap between consecutive zeros}\in\Bigl[\frac{\pi}{n+1-\delta},\ \frac{\pi}{n+\delta}\Bigr].
> $$
>
> If $x^*$ is a zero, then $x^*+2\pi$ is also a zero, and the number of gaps is even to verify $\varphi'(x^*)=\varphi'(x^*+2\pi)$.
>
> So we know $\exists\ k\ge1$ s.t.
> $$
> 2\pi=\sum_{i=1}^{2k}(x_{i}-x_{i-1})\in\Bigl[\frac{k\pi}{n+1-\delta},\ \frac{k\pi}{n+\delta}\Bigr]
> \ \Rightarrow\ n+\delta\le k\le n+1-\delta. \qquad\text{Contradiction!} \qquad\square
> $$

## 5.2 Sturm & Liouville Problem

$$
\mathcal{L}:=A(x)\frac{d^2}{dx^2}+B(x)\frac{d}{dx}+C(x), \quad\text{with } A(x)>0\text{ on }J=[a,b].
$$

We want to solve

$$
\text{eigenvalue problem:}\qquad \mathcal{L}y=\lambda y\quad(*)
$$

$$
\text{boundary value problem:}\qquad \begin{cases} Ry(a)+Ly'(a)=0\\ My(b)+Ny'(b)=0 \end{cases}
$$

> **Def.** A condition like $y(a)=0$ is called a **Dirichlet problem**; $y'(a)=0$ is called a **Neumann problem**; the general case $Ky(a)+Ly'(b)=0$ is called a **Robin problem**.

**Reduction 1.** We can find $p(x)\in C'$, $q(x),r(x)\in C$ with $p(x),r(x)>0$, s.t. $(*)$ can be written as
$$
\mathcal{L}y=\frac{1}{r(x)}\bigl((p(x)y')'+q(x)y\bigr)=\lambda y(x),
$$
$$
\Leftarrow\ \begin{cases} \frac{p(x)}{r(x)}=A(x)\\ \frac{p'(x)}{r(x)}=B(x)\\ \frac{q(x)}{r(x)}=C(x) \end{cases}\quad\Leftarrow\quad\begin{cases} p(x)=\exp\bigl(\int_{x_0}^{x}\frac{B(s)}{A(s)}ds\bigr)\\ r(x)=p(x)/A(x)\\ q(x)=r(x)C(x) \end{cases}.
$$

**Reduction 2.** Consider $\begin{cases} x=x(t)\\ y=y(x(t)) \end{cases}$ with $\begin{cases} x(0)=a\\ x(1)=b \end{cases}$.

We want to get $\dfrac{dx}{dt}=c_0p(x)$ to simplify. Solve $c_0$ by $\ 1=\displaystyle\int_a^b\frac{ds}{c_0p(s)}$.

Now put it into the problem:
$$
y''_t=\frac{d}{dx}\bigl(y_x'x_t'\bigr)\cdot\frac{dx}{dt}=\bigl(c_0p(x)y'(x)\bigr)'\cdot c_0p(x),
$$
$$
\Rightarrow\ \mathcal{L}y=\frac{1}{r(x)}\bigl((p(x)y')'+q(x)y\bigr)=\frac{1}{r(x)}\Bigl(\frac{d^2y}{dt^2}\cdot\frac{1}{c_0^2p(x)}+q(x)y\Bigr).
$$

Hence we consider $\widetilde{\mathcal{L}}:=\dfrac{1}{\widetilde{r}(t)}\Bigl(\dfrac{d^2}{dt^2}+\widetilde{q}(t)y\Bigr)$, with $\widetilde{r}(t)=c_0^2p(x(t))r(x(t))>0$, $\widetilde{q}(t)=c_0^2p(x(t))q(x(t))$.

The **eigenvalue problem**: $\widetilde{\mathcal{L}}y=-\lambda y\iff y''(t)+(\lambda\,r(t)+q(x(t)))y(t)=0$.

The **boundary value problem**:
$$
\begin{cases} Ky|_{x=a}+Ly'|_{x=a}=0\\ My|_{x=b}+Ny'|_{x=b}=0 \end{cases}\ \Rightarrow\ \begin{cases} \cos\alpha\cdot y(0)-\sin\alpha\cdot y'(0)=0\\ \cos\beta\cdot y(1)-\sin\beta\cdot y'(1)=0 \end{cases}
$$
(assume $0\le\alpha<\pi$, $0\le\beta<\pi$).

Finally we get the **Sturm–Liouville Problem**:
$$
\begin{cases} y''+(\lambda\,r(x)+q(x))y(x)=0 & \text{on } [0,1],\\ \cos\alpha\cdot y(0)-\sin\alpha\cdot y'(0)=0,\\ \cos\beta\cdot y(1)-\sin\beta\cdot y'(1)=0. \end{cases}
$$

Suppose $\mathcal{F}$ is a number field (here $\mathbb{R}$ or $\mathbb{C}$), $X$ is a vector space over $\mathcal{F}$. $\langle\cdot,\cdot\rangle: X\times X\to\mathcal{F}$ satisfies

① $\langle a,b\rangle=\langle b,a\rangle$ on $\mathbb{R}$, or $\langle a,b\rangle=\overline{\langle b,a\rangle}$ on $\mathbb{C}$.

② $\langle\lambda_1a_1+\lambda_2a_2,\ b\rangle=\lambda_1\langle a_1,b\rangle+\lambda_2\langle a_2,b\rangle$.

③ $\langle a,a\rangle\ge0$, with "$=$" holding only if $a=0$.

Then $(X,\langle\cdot,\cdot\rangle)$ is called an **inner product space**. Using $\langle\cdot,\cdot\rangle$ we get a distance $d(f,g):=\langle f-g,f-g\rangle$. $X$ is called a **complete** space if any Cauchy sequence has a limit in $X$. A complete inner product space is called a **Hilbert space**.

Consider $T:X\supseteq D(T)\to X$: $T$ is called **linear** if $\forall\lambda,\mu\in\mathcal{F}$, $T(\lambda a+\mu b)=\lambda T(a)+\mu T(b)$. Furthermore, $T$ is called **symmetric** if $\langle Ta,b\rangle=\langle a,Tb\rangle$.

> **Ex.** $X=\{f:f\in C[0,1]\}$, $\langle f,g\rangle:=\int_0^1fg\,dx$.
>
> $T:=\dfrac{d^2}{dx^2}$, $D(T):=\{f:f\in C^2[0,1],\ f'(0)=f(0)=1\}$:
> $$
> \langle Tf,g\rangle=\int_0^1f''g\,dx=(f'g-fg')\big|_0^1+\int_0^1fg''\,dx=\langle f,Tg\rangle.
> $$
> So $T$ is symmetric.
>
> Consider $D_1:=\Bigl\{f\in C^2[0,1]:\ \cos\alpha\cdot f(0)-\sin\alpha\cdot f'(0)=0,\ \cos\beta\cdot f(1)-\sin\beta\cdot f'(1)=0\Bigr\}$: we can check $T$ on $D_1$ is also symmetric.

Now consider the Sturm–Liouville Problem
$$
\begin{cases} \mathcal{L}=\dfrac{1}{r(x)}\Bigl(\dfrac{d^2}{dx^2}+q(x)\Bigr) & \text{on }[0,1],\ r(x)>0,\ r,q\in C,\\ \cos\alpha\cdot y(0)-\sin\alpha\cdot y'(0)=0,\\ \cos\beta\cdot y(1)-\sin\beta\cdot y'(1)=0 \end{cases}\ \Biggr\}\ \text{boundary cond.}
$$

> **Def.** $X:=\{f\in C[0,1]\}$, $\mathcal{F}=\mathbb{R}$, $\langle f,g\rangle:=\int_0^1r(x)f(x)g(x)dx$;
> $T:=\dfrac{1}{r(x)}\bigl(\dfrac{d^2}{dx^2}+q(x)\bigr)$, $D(T):=\Bigl\{f\in C^2[0,1]:\ f\text{ satisfies the boundary conditions}\Bigr\}$.
>
> Then $T$ is symmetric.

> **Thm.**
> For the Sturm–Liouville Problem $y''+(\lambda r+q)y=0$ with the boundary conditions:
>
> (1) There exist countably many eigenvalues $\lambda_1<\lambda_2<\cdots<\lambda_n\to+\infty$.
>
> (2) Each $\lambda_n$ has a 1-dim eigenspace; denoting the eigenfunction $\varphi(x,\lambda_n)$, then $\varphi(x,\lambda_n)$ has exactly $n$ zeros in $[0,1]$.
>
> (3) $\varphi(x,\lambda_n)$ are orthogonal, i.e.
> $$
> \int_0^1r(x)\varphi(x,\lambda_n)\varphi(x,\lambda_m)dx=\begin{cases} 0, & n\neq m\\ \delta_n^2, & n=m, \end{cases}
> $$
> \& $\{\varphi(x,\lambda_n)\}$ is complete, i.e.
> $$
> \int_0^1r(x)f(x)\varphi(x,\lambda_n)dx=0,\ \forall n\ \Rightarrow\ f\equiv0.
> $$
> Complete also means $\forall f\in X$: $f=\sum_{n=0}^{\infty}c_n\varphi(x,\lambda_n)$, and if $f\in D(\mathcal{L})$ then the series converges uniformly.
>
> (4) Between any consecutive zeros of $\varphi_n$ there exists a zero of $\varphi_m$ (for $\lambda_m>\lambda_n$).
>
> **Pf.** Consider a solution $\varphi$ satisfying $\begin{cases}\varphi(0)=\sin\alpha\\ \varphi'(0)=\cos\alpha\end{cases}$ $(\ast)$.
>
> By the Picard Thm, we get a unique $\varphi(x,\lambda)$ satisfying the ODE and the 1st boundary condition $(\ast)$.
>
> Our goal is finding $\lambda_0$ s.t. $\varphi(x,\lambda_0)$ satisfies the 2nd boundary condition. Using the **Prüfer transform**:
> $$
> \varphi(x,\lambda)=\rho(x,\lambda)\sin\theta(x,\lambda), \qquad \varphi'(x,\lambda)=\rho(x,\lambda)\cos\theta(x,\lambda), \qquad \theta(0,\lambda)=\alpha\in[0,\pi).
> $$
>
> $\theta(x,\lambda)$ is a well-defined continuous function:
> $$
> \theta(x,\lambda)=\arctan\frac{\varphi}{\varphi'}, \qquad \theta'(x,\lambda)=\cos^2\theta+(\lambda r+q)\sin^2\theta.
> $$
>
> So we get
> $$
> \begin{cases} \theta'=\cos^2\theta+(\lambda r+q)\sin^2\theta\\ \theta(0,\lambda)=\alpha \end{cases} \quad\&\quad \begin{cases} \rho'=\frac12\rho(1-\lambda r-q)\sin2\theta\\ \rho(0,\lambda)=1 \end{cases}
> $$
>
> $\varphi(x,\lambda)$ satisfies the 2nd boundary condition $\iff\theta(1,\lambda)=\beta+k\pi$.

> **Lemma 1.** $\forall x\in(0,1]$, $\theta(x,\lambda)$ is $C^1$ \& strictly increasing w.r.t. $\lambda$.
>
> **Pf.** $\theta(x,\lambda)\in C^1$ comes from $C^1$ dependence.
> $$
> \begin{cases} \frac{d}{dx}\frac{\partial\theta}{\partial\lambda}=(\lambda r+q-1)\sin\theta\cdot\frac{\partial\theta}{\partial\lambda}+r\sin^2\theta\\ \frac{\partial\theta}{\partial\lambda}(0,\lambda)=0 \end{cases}
> $$
> Solving, we get $\dfrac{\partial\theta}{\partial\lambda}>0$. \#

> **Lemma 2.** $\forall x_0\in(0,1]$, $\theta(x_0,\lambda)>0$, $\forall\lambda$.
>
> **Pf.** Consider $\theta(0,\lambda)=\alpha$, $\theta'(0,\lambda)=1$ if $\alpha=0$.
>
> So we can find $x_1$ s.t. $\theta(x,\lambda)>0$ on $x\in(0,x_1]$.
>
> If $x_1\neq1$, assume $x^*:=\inf\{x^*\in(x_1,1]:\theta(x^*,\lambda)=0\}$.
>
> So we have $\theta'(x^*,\lambda)\le0$. By the equation $\theta'(x^*,\lambda)=1$. Contradiction!
>
> So $x_1=1$, i.e. $\theta(x,\lambda)>0$, $x\in(0,1]$. \#

> **Lemma 3.** $\forall x_0\in(0,1]$: $\theta(x_0,\lambda)\to0$ as $\lambda\to-\infty$, and $\theta(x_0,\lambda)\to+\infty$ as $\lambda\to+\infty$.
>
> **Pf.** $\theta'=\cos^2\theta+(\lambda r+q)\sin^2\theta$. For $\lambda<0$: $\lambda r+q<\lambda m+M$.

![the behavior of $\theta(x,\lambda)$](fig/ch05_fig_5_2_1.png)

> $\alpha=\theta(0,\lambda)\in[0,\pi)$; $\forall\varepsilon$ s.t. $\alpha<\pi-\varepsilon$.
>
> Denote $A=(0,\pi-\varepsilon)$, $B=(x_0,\varepsilon)$.
>
> We prove: if $\lambda<-\lambda_0$ ($\lambda_0$ large enough), then the solution stays below the line $AB$.
>
> Suppose not: take $x^*$ as the first intersection, so at $x^*$, $\theta'(x^*,\lambda)\ge k_{AB}=\frac{2\varepsilon-\pi}{x_0}$. Notice $\theta(x^*,\lambda)\in(\varepsilon,\pi-\varepsilon)$; by the equation we get $\theta'\le1+(\lambda m+M)\sin^2\varepsilon$; letting $\lambda\to-\infty$ we get a contradiction.
>
> So $\theta(x_0,\lambda)<\varepsilon$ for $\forall\varepsilon>0$ as $\lambda\to-\infty$, i.e. $\theta(x_0,\lambda)\to0$.
>
> By calculating we can get $\theta(x_0,\lambda)\to+\infty$ as $\lambda\to+\infty$. \#

![eigenvalues from the level crossings of $\theta$](fig/ch05_fig_5_2_2.png)

Now for $\forall\ k\in\mathbb{N}$, we can get $\lambda_k$ s.t.
$$
\theta(1,\lambda_k)=\beta+k\pi,
$$
and $\lambda_k\nearrow+\infty$; each $\lambda_k$ is unique.

So we get all the eigenvalues $\lambda_k$ \& eigenfunctions $\varphi(x,\lambda_k)$, which are generated by $\theta(x,\lambda_k)$. Any eigenspace is 1-dim because the data is linearly dependent $\Rightarrow$ solutions must be dependent.

Next, we care about the **zeros**.

Notice $\varphi(x^*,\lambda_k)=0\iff\sin\theta(x^*,\lambda_k)=0$.

For $k\ge1$, we get $k$ zeros $x_{j}$ in $(0,1)$:
$$
\theta'(x_{j},\lambda_k)=\cos\theta(x_{j},\lambda_k)+(\lambda_kr+q)\sin\theta(x_{j},\lambda_k)\equiv1.
$$
Hence $\theta(x,\lambda_k)=j\pi$ has only 1 zero in each level.

For $k=0$, we prove $\theta(x,\lambda_0)=j\pi$ has no zeros.

Now consider oscillation of zeros:
$$
\varphi(x,\lambda_n),\ \varphi(x,\lambda_m),\ \lambda_m>\lambda_n\ \Rightarrow\ \lambda_mr+q>\lambda_nr+q.
$$

By Sturm Comparison, between 2 consecutive zeros of $\varphi(x,\lambda_n)$ there exists a zero of $\varphi(x,\lambda_m)$.

For $\varphi(x,\lambda_n)$ \& $\varphi(x,\lambda_{n+1})$, denote $0<x_1<\cdots<x_n<1$ as the zeros of $\varphi(x,\lambda_n)$.

![interlacing zeros on $[0,1]$](fig/ch05_fig_5_2_3.png)

In any $(x_k,x_{k+1})$, there exists a zero of $\varphi(x,\lambda_{n+1})$.

In $(0,x_1)$: consider $\theta(x_1,\lambda_{n+1})>\theta(x_1,\lambda_n)=\pi$, $\theta(0,\lambda_{n+1})=\alpha<\pi$, so there exists $x^*\in(0,x_1)$ s.t. $\theta(x^*,\lambda_{n+1})=\pi$.

In $(x_n,1)$: suppose $\varphi(x,\lambda_{n+1})\ge0$ on $[x_n,1]$; using the proof of Sturm Comparison we get a contradiction. So $\exists\ x^{**}\in(x_n,1)$ s.t. $\varphi(x^{**},\lambda_{n+1})=0$.

For orthogonality, notice the $\lambda_k$ are different. $\square$

## 5.3 Periodic Sturm–Liouville Problem

$$
y''+(\lambda r+q)y=0, \qquad r,q\in C[0,1],\ r>0.
$$

Suppose $r,q$ are 1-periodic; ask whether there exists a 1-periodic solution.

**General:** $y''=f(x,y,y')$, where $f$ is locally Lipschitz wrt $y,y'$, and $f$ is 1-periodic wrt $x$.

> **Lemma.** Any solution satisfying the boundary problem $\begin{cases} y(0)=y(1)\\ y'(0)=y'(1) \end{cases}$ is a 1-periodic solution.
>
> **Pf.** Consider $y(x+1)$: it satisfies the same IVP w.r.t. $y(x)$. $\square$

Consider $\mathcal{L}:=\dfrac{1}{r(x)}\Bigl(\dfrac{d^2}{dx^2}+q(x)\Bigr)$, $r(x)>0$, $r,q\in C[0,1]$, 1-periodic.

$X:=\{f:f\in C^2[0,1]\}$, $\langle f,g\rangle=\int_0^1r(x)f(x)g(x)dx$.

$$
D(\mathcal{L}):=\{f\in X:\ f(0)=f(1)\ \&\ f'(0)=f'(1)\}.
$$

Check $\mathcal{L}$ is symmetric in $D(\mathcal{L})$. So we research $\mathcal{L}y=-\lambda y$.

**Special Case.** $r\equiv1$, $q\equiv0$: we solve the equation.

> **Thm (Periodic Sturm–Liouville Problem).**
>
> (1) The eigenvalues are countable:
> $$
> \lambda_0<\lambda_1\le\lambda_2<\lambda_3\le\lambda_4<\cdots<\lambda_{2k-1}\le\lambda_{2k}<\cdots
> $$
>
> (2) $\lambda=\lambda_0$ has a 1-dim eigenspace.
>
> (3) If $\lambda_{2k-1}<\lambda_{2k}$, then each of them has a 1-dim eigenspace.
>
> (4) If $\lambda_{2k-1}=\lambda_{2k}=\lambda$, then $\lambda$ has a 2-dim eigenspace.
>
> (5) $\varphi(x,\lambda_0)$ has no zero in $[0,1)$; $\varphi(x,\lambda_{2k-1})$ \& $\varphi(x,\lambda_{2k})$ have $2k$ zeros in $[0,1)$.
>
> (6) Orthogonality \& Completeness.
>
> **Pf.**
>
> **Step 1 (Foundation).** Re-construct the boundary conditions.
>
> Consider $\begin{pmatrix}\varphi(0)\\ \varphi'(0)\end{pmatrix}=\begin{pmatrix}1\\0\end{pmatrix}$, $\begin{pmatrix}\psi(0)\\ \psi'(0)\end{pmatrix}=\begin{pmatrix}0\\1\end{pmatrix}$ as fundamental solutions; then any $y(x,\lambda)=c_1\varphi(x,\lambda)+c_2\psi(x,\lambda)$.
>
> Put it into the boundary conditions:
> $$
> \begin{cases} c_1\varphi(0,\lambda)+c_2\psi(0,\lambda)=c_1\varphi(1,\lambda)+c_2\psi(1,\lambda)\\ c_1\varphi'(0,\lambda)+c_2\psi'(0,\lambda)=c_1\varphi'(1,\lambda)+c_2\psi'(1,\lambda) \end{cases}
> $$
> $$
> \Rightarrow\ \begin{pmatrix} 1-\varphi(1,\lambda) & -\psi(1,\lambda)\\ -\varphi'(1,\lambda) & 1-\psi'(1,\lambda) \end{pmatrix}\begin{pmatrix} c_1\\ c_2 \end{pmatrix}=0, \qquad A(\lambda):=\begin{pmatrix} 1-\varphi(1,\lambda) & -\psi(1,\lambda)\\ -\varphi'(1,\lambda) & 1-\psi'(1,\lambda) \end{pmatrix}.
> $$
>
> We want a nonzero $(c_1\ c_2)\iff\det A(\lambda)=0$:
> $$
> \Delta=\varphi\psi'-\psi-\varphi'+1-\varphi'\psi=2-\varphi-\psi',
> $$
> *(using $W(\varphi,\psi)=1$)*
>
> So denote $f(\lambda)=\varphi(1,\lambda)+\psi'(1,\lambda)$; then $\lambda$ gives a nonzero solution $\iff f(\lambda)=2$.
>
> Moreover, $\lambda$ gives 2 linearly independent solutions
> $$
> \iff\text{matrix }A(\lambda)\equiv0\iff
> \varphi(1,\lambda)=1,\ \psi(1,\lambda)=0,\ \varphi'(1,\lambda)=0,\ \psi'(1,\lambda)=1.
> $$
>
> **Step 2 (Preparation).** Using $\varphi(x,\lambda)$, $\psi(x,\lambda)$ as above.
>
> Consider $\begin{cases} y''+(\lambda r+q)y=0\\ y(0)=y(1)=0 \end{cases}$ (I). By the S–L thm, we find $\mu_0<\mu_1<\cdots\to+\infty$ s.t. $\psi(x,\mu_{j})$ solves (I).
>
> Consider $\begin{cases} y''+(\lambda r+q)y=0\\ y'(0)=y'(1)=0 \end{cases}$ (II). By the S–L thm, we find $\nu_0<\nu_1<\cdots\to+\infty$ s.t. $\varphi(x,\nu_{j})$ solves (II).
>
> **Step 3 (Properties of $f(\lambda)$).**

> **Lemma.** $\nu_0\le\mu_0$, $f(\nu_0)\ge2$, $f(\mu_{2j+1})\ge2$, $f(\mu_{2j})\le-2$.
>
> **Pf.** $1=W(\varphi,\psi)(1)=\varphi(1,\lambda)\psi'-\varphi'\cdot\psi(1,\lambda)$.
>
> $\lambda=\nu_0\ \Rightarrow\ \varphi'(1,\nu_0)=0\ \Rightarrow\ \varphi(1,\nu_0)\psi'(1,\nu_0)=1$.
>
> $\lambda=\mu_{j}\ \Rightarrow\ \psi(1,\mu_{j})=0\ \Rightarrow\ \varphi(1,\mu_{j})\psi'(1,\mu_{j})=1$.
>
> So for $\lambda=\mu_{j}$:
> $$
> f(\mu_{j})=\varphi(1,\mu_{j})+\psi'(1,\mu_{j})=\psi'(1,\mu_{j})+\frac{1}{\psi'(1,\mu_{j})}.
> $$

![the sign of $\psi'$ at $\mu_{2j}$ and $\mu_{2j+1}$](fig/ch05_fig_5_3_1.png)

By counting the number of zeros of $\psi(1,\mu_{j})$, we get
$$
\psi'(1,\mu_{2j})<0\ \Rightarrow\ f(\mu_{2j})\le-2; \qquad
\psi'(1,\mu_{2j+1})>0\ \Rightarrow\ f(\mu_{2j+1})\ge2.
$$

For $\lambda=\nu_0$: $f(\nu_0)=\varphi(1,\nu_0)+\psi'(1,\nu_0)=\varphi(1,\nu_0)+\dfrac{1}{\varphi(1,\nu_0)}$.

Since $\varphi(\nu_0)$ has no zero \& $\varphi(1,\nu_0)\neq0$, we get $\varphi(1,\nu_0)>0$; hence $f(\nu_0)\ge2$.

Now suppose $\nu_0>\mu_0$. Notice $\psi(x,\mu_0)$ has 2 zeros in $[0,1]$; by Comparison we get $\varphi(x,\nu_0)$ has 1 zero. Contradiction. $\square$

**Step 4 (Properties of $f'(\lambda)$).**

$$
f(\lambda)=\varphi(1,\lambda)+\psi'(1,\lambda), \qquad f'(\lambda)=\frac{\partial}{\partial\lambda}\varphi(1,\lambda)+\frac{\partial}{\partial\lambda}\psi'(1,\lambda).
$$

$$
\begin{cases} \varphi''(x,\lambda)+(\lambda r+q)\varphi(x,\lambda)=0\\ \varphi(0,\lambda)=1\\ \varphi'(0,\lambda)=0 \end{cases}\ \xrightarrow{\frac{d}{d\lambda}}\ \begin{cases} \bigl(\frac{\partial\varphi}{\partial\lambda}\bigr)''+r\varphi+(\lambda r+q)\frac{\partial\varphi}{\partial\lambda}=0\\ \frac{\partial\varphi}{\partial\lambda}(0,\lambda)=0\\ \bigl(\frac{\partial\varphi}{\partial\lambda}\bigr)'(0,\lambda)=0 \end{cases}
$$

Denote $u(x,\lambda)=\dfrac{\partial\varphi}{\partial\lambda}$; we get $u''+(\lambda r+q)u=-r\varphi$:
$$
\Rightarrow\ u(x,\lambda)=c_1\varphi+c_2\psi+\varphi\int_0^{x}\frac{W_1(s)}{W_2(s)}(-r\varphi)\,ds+\psi\int_0^{x}\frac{W_2(s)}{W_1(s)}(-r\varphi)\,ds.
$$

Using $u(0)=0$, $u'(0)=0$, we get
$$
\frac{\partial}{\partial\lambda}\varphi(1,\lambda)=u(1,\lambda)=\int_0^1\bigl(\varphi(1)\psi(s)-\psi(1)\varphi(s)\bigr)r(s)\varphi(s)\,ds.
$$

Similarly we get
$$
\frac{\partial}{\partial\lambda}\psi'(1,\lambda)=\int_0^1\bigl(\varphi'(1)\psi(s)-\psi'(1)\varphi(s)\bigr)r(s)\psi(s)\,ds.
$$

So we have
$$
f'(\lambda)=\int_0^1\bigl[a\,\psi^2(s,\lambda)+b\,\psi(s,\lambda)\varphi(s,\lambda)+c\,\varphi^2(s,\lambda)\bigr]r(s)\,ds,
$$
$$
a:=\varphi'(1,\lambda), \quad b:=\varphi(1,\lambda)-\psi'(1,\lambda), \quad c:=-\psi(1,\lambda).
$$

Notice
$$
b^2-4ac=\varphi^2(1)+\psi'^2(1)-2\varphi(1)\psi'(1)+4\varphi'(1)\psi(1)=\varphi^2(1)+\psi'^2(1)+2\varphi(1)\psi'(1)-4=(f(\lambda))^2-4.
$$

So if $f(\lambda)=2$, then $b^2-4ac=0$:
$$
-\psi(1,\lambda)\ge0\ \Rightarrow\ f'(\lambda)\ge0; \qquad -\psi(1,\lambda)\le0\ \Rightarrow\ f'(\lambda)\le0;
$$
$$
f'(\lambda)=0\iff a,b,c=0\iff A(\lambda)=0.
$$

Which means: if $f(\lambda)=2$, i.e. $\lambda$ is an eigenvalue, then
$$
f'(\lambda)=0\iff\text{the eigenspace of }\lambda\text{ is 2-dim}.
$$

Also, consider any $f(\lambda)=2$ with $\lambda\neq\mu_{j}$:
$$
\lambda<\mu_0\ \Rightarrow\ \psi(1,\lambda)>0\ \Rightarrow\ f'(\lambda)<0;
$$
$$
\mu_0<\lambda<\mu_1\ \Rightarrow\ \psi(1,\lambda)>0\ \Rightarrow\ f'(\lambda)>0;
$$
$$
\lambda\in(\mu_{j},\mu_{j+1})\ \Rightarrow\ f'(\lambda)(-1)^{j}<0.
$$

Besides, we can prove by calculating: if $f(\mu_{2j+1})=2$, $f'(\mu_{2j+1})=0$, then $f''(\mu_{2j+1})<0$.

**Step 5 (Existence of eigenvalues).**

Now we get $\nu_0\le\lambda_0<\mu_0<\lambda_1\le\mu_1\le\lambda_2<\mu_2<\lambda_3\le\mu_3\le\lambda_4$.

![the graph of $f(\lambda)$](fig/ch05_fig_5_3_2.png)

**Case 1.** If $f(\mu_{2j+1})>2$, then $\lambda_{2j+1}<\mu_{2j+1}<\lambda_{2j+2}<\mu_{2j+2}$, and the $\lambda$ is unique in $(\mu_{2j+1},\mu_{2j+2})$, proved by $f'\neq0$.

**Case 2.** If $f(\mu_{2j+1})=2$:

**Case 2.1** $f'(\mu_{2j+1})\neq0$ (suppose $>0$): we take $\lambda_{2j+1}=\mu_{2j+1}$ and find $\lambda_{2j+2}\in(\mu_{2j+1},\mu_{2j+2})$. Such $\lambda_{2j+2}$ is unique \& $f'(\lambda_{2j+2})\neq0$, so the eigenspace is 1-dim.

![Case 2.1](fig/ch05_fig_5_3_3.png)

**Case 2.2** $f'(\mu_{2j+1})=0$: notice that $\lambda=\mu_{2j+1}$ has a 2-dim eigenspace. We take $\lambda_{2j+1}=\mu_{2j+1}=\lambda_{2j+2}$, and no other $\lambda\in(\mu_{2j},\mu_{2j+1})\cup(\mu_{2j+1},\mu_{2j+2})$ satisfies $f(\lambda)=2$.

**Conclusion:** if $\lambda_{2j+1}<\lambda_{2j+2}$, the eigenspace is 1-dim; if $\lambda_{2j+1}=\lambda_{2j+2}$, the eigenspace is 2-dim.

**Step 6 (Number of zeros).**

> **Lemma.** Suppose $\lambda$ is an eigenvalue; then $\varphi(x,\lambda)$ has an even number of zeros in $[0,1)$.
>
> **Pf.** The zeros are isolated in $[0,1]$, so finite.
>
> If $\varphi(0,\lambda)=0$, then $\varphi(1,\lambda)=0$, $\varphi'(0,\lambda)=\varphi'(1,\lambda)$; by counting we get an even number of zeros.
>
> If $\varphi(0,\lambda)\neq0$, same as above. $\square$

Now we check $\varphi(x,\lambda_0)$ has no zero in $[0,1)$: suppose not, then it has at least 2 zeros; $\lambda_0<\mu_0$, by Comparison we get a contradiction.

Now we check $\varphi(x,\lambda_{2j+1})$, $\varphi(x,\lambda_{2j+2})$ both have $2j+2$ zeros. This is true by Comparison:
$$
\mu_{2j}<\lambda_{2j+1}\le\mu_{2j+1}\le\lambda_{2j+2}<\mu_{2j+2},
$$
with $\psi(x,\mu_{2j})$ having $2j$ zeros, $\psi(x,\mu_{2j+1})$ having $2j+1$ zeros, and $\psi(x,\mu_{2j+2})$ having $2j+2$ zeros.

$$
\Rightarrow\ \varphi(x,\lambda_{2j+1}),\ \varphi(x,\lambda_{2j+2})\ \text{have}\ \ge2j+1\text{ zeros \&}\le2j+3\text{ zeros}.
$$

Because the number of zeros is even, they both have $2j+2$ zeros in $[0,1)$. $\square$

## 5.4 BVP for Nonlinear ODE

$$
\begin{cases} y''=f(x,y,y')\\ y(0)=a,\ y(1)=b \end{cases}, \qquad f\text{ is Lipschitz w.r.t. }y\,\&\,y'.
$$

### 5.4.1 Shooting Method

$$
\begin{cases} y''=f(x,y,y')\\ y(0)=a,\ y'(0)=s \end{cases}\ \Rightarrow\ \varphi(x,s). \quad\text{We want }\varphi(1,s)=b.
$$

Now consider $F(s)=\varphi(1,s)-b$ ($s$ is a choice).

> **Thm.**
> If the IVP can be solved on the interval $[0,1]$ and $\exists\ s_1>s_2$ s.t. $F(s_1)F(s_2)<0$, then $\exists\ s^*$ s.t. $\varphi(x,s^*)$ solves the BVP.

> **Ex.** $\begin{cases} x''(t)=\arctan x(t),\quad t\in[0,1]\\ x(0)=0,\ x(1)=1 \end{cases}$
>
> Consider the IVP $\begin{cases} x''(t)=\arctan x(t)\\ x(0)=0,\ x'(0)=\lambda \end{cases}\ \Rightarrow\ \varphi(x,\lambda)$.
>
> By the extension thm, $\varphi(x,\lambda)$ exists on $[0,1]$. Let $F(\lambda):=\varphi(1,\lambda)-1$.
>
> $\lambda=0$: the solution is $x(t)\equiv0$, hence $F(0)=-1<0$.
>
> Take $\lambda=1$: $T:=\sup\{t_0\in[0,1]:x(t)\ge0,\ t\in[0,t_0]\}$, hence $x(t)\ge0$ on $t\in[0,T]\ \Rightarrow\ x''(t)\ge0\ \Rightarrow\ x'(t)\ge x'(0)=1$:
> $$
> x(t)-x(0)=\int_0^{t}x'(t)\,dt\ge t \qquad\Rightarrow\ x(t)\ge t.
> $$
>
> In particular, $x(T)\ge T>0$, hence $T=1$. So $x(1)\ge1$, which means $F(1)=\varphi(1,1)-1\ge0$.
>
> $\exists\lambda^*$ s.t. $F(\lambda^*)=0$, making $\varphi(x,\lambda^*)$ a solution of the BVP. $\square$

### 5.4.2 Periodic BVP

$$
\begin{cases} y''=f(x,y,y')\\ y(0)=y(1),\ y'(0)=y'(1) \end{cases}, \qquad f(x+1,\cdot,\cdot)=f(x,\cdot,\cdot).
$$

Consider the IVP
$$
\begin{cases} y''=f(x,y,y')\\ y(0)=\alpha,\ y'(0)=\beta \end{cases}\ \Rightarrow\ \varphi(1,\alpha,\beta).
$$

We want $\begin{cases} \varphi(1,\alpha,\beta)=\alpha\\ \varphi'(1,\alpha,\beta)=\beta \end{cases}$.

Denote the **Poincaré map** $P(\alpha,\beta)=\begin{pmatrix} \varphi(1,\alpha,\beta)\\ \varphi'(1,\alpha,\beta) \end{pmatrix}$.

We want to find the fixed point of $P$: $P(\alpha,\beta)=\begin{pmatrix}\alpha\\ \beta\end{pmatrix}$.

**Methods of finding fixed points**

(1) Banach's Fixed Point Thm.

(2) Brouwer's Fixed Point Thm: if $P:D\to D$ is continuous with $D$ compact \& convex.

(3) Implicit Function Thm (locally).

> **Ex.** $x''+\omega_0^2x=p(t)+\varepsilon f(t,x,x')$, where $\omega_0>0$, $\frac{\omega_0}{2\pi}\notin\mathbb{Z}$, $p(t)$ is 1-periodic, $f(t+1,\cdot,\cdot)=f(t,\cdot,\cdot)$. Then if $\varepsilon$ is small enough, the equation has a 1-periodic solution.
>
> **Pf.** Consider the IVP $x(0)=x_0$, $x'(0)=v_0$; we get the unique solution $\varphi(x;x_0,v_0,\varepsilon)$.
>
> We want
> $$
> \begin{cases} \varphi(1,x_0,v_0,\varepsilon)=x_0\\ \varphi'(1,x_0,v_0,\varepsilon)=v_0 \end{cases}\ \Rightarrow\ \begin{cases} F:=\varphi(1,x_0,v_0,\varepsilon)-x_0=0\\ G:=\varphi'(1,x_0,v_0,\varepsilon)-v_0=0 \end{cases}\quad(*)
> $$
>
> Consider $\varepsilon=0$: we solve the equation
> $$
> x(t,x_0,v_0,0)=x_0\cos\omega_0t+\frac{v_0}{\omega_0}\sin\omega_0t+\frac{1}{\omega_0}\int_0^{t}p(s)\sin\omega_0(t-s)\,ds.
> $$
>
> Putting it into $(*)$, we know the determinant $\Delta\neq0$.
>
> So we find $(x_0^*,v_0^*)$ solving $(*)$.
>
> Notice $\dfrac{\partial(F,G)}{\partial(x_0,v_0)}\Big|_{(x_0^*,v_0^*)}=\Delta\neq0$, which means a vector function $(x_0(\varepsilon)\ \ v_0(\varepsilon))$ exists.
>
> By the Implicit Function Thm, $\exists$ a small neighborhood of $(x_0^*,v_0^*)$ \& of $\varepsilon=0$, with $x_0=x_0(\varepsilon)$, $v_0=v_0(\varepsilon)$ s.t. $F(1,x_0,v_0,\varepsilon)\equiv0$, $G(1,x_0,v_0,\varepsilon)\equiv0$.
>
> This gives a 1-periodic solution for any $\varepsilon$ small enough. $\square$

> **Ex.** $x''+x+C\arctan x=\sin t$, $|C|>\frac12$, has a $2\pi$-periodic solution.
>
> **Pf.**
>
> **Step 1 (Set up).** *(margin: $x''+x=0\ \Rightarrow\ x=\sin t,\ \cos t$; $W(t)=\begin{vmatrix}\sin t & \cos t\\ \cos t & -\sin t\end{vmatrix}=-1$.)*
>
> Consider a solution $\varphi_b(t)$ with $\varphi_b(0)=0$, $\varphi_b'(0)=b$.
>
> Notice that $-\varphi_b(t)$ satisfies the same IVP, so $\varphi_b(t)\equiv-\varphi_b(-t)$.
>
> So we turn to consider $f(b)=\varphi_b(\pi)-\varphi_b(-\pi)$.
>
> **Step 2 (Properties of $f(b)$).**
>
> We can solve $\varphi_b(t)$ *(margin: $b\sin t+\sin t\int_0^t\cos s[\sin s-C\arctan]ds+\cos t\int_0^t\sin s[\sin s-C\arctan]ds$)*:
> $$
> \varphi_b(t)=b\sin t+\int_0^{t}\sin(t-s)\bigl[\sin s-C\arctan x(s)\bigr]ds.
> $$
>
> So
> $$
> f(b)=\int_{-\pi}^{\pi}\sin^2s\,ds-C\int_{-\pi}^{\pi}\sin s\arctan x(s)\,ds=\pi-C\int_{-\pi}^{\pi}\sin s\arctan x(s)\,ds.
> $$
>
> Splitting the last integral:
> $$
> \int_{-\pi}^{\pi}*=\int_{-\pi}^{-\pi+\varepsilon}+\int_{-\pi+\varepsilon}^{-\varepsilon}+\int_{-\varepsilon}^{\varepsilon}+\int_{\varepsilon}^{\pi-\varepsilon}+\int_{\pi-\varepsilon}^{\pi}=\int_{-\pi+\varepsilon}^{-\varepsilon}+\int_{\varepsilon}^{\pi-\varepsilon}+O(\varepsilon),
> $$
> $$
> \int_{\varepsilon}^{\pi-\varepsilon}*=\int_{\varepsilon}^{\pi-\varepsilon}\sin s\arctan x(s)\,ds=O(s)+\pi\cos\varepsilon.
> $$
>
> $$\Rightarrow\ f(b)=\pi(1-2\cos C)+O(\varepsilon).$$
>
> By the shooting method. $\square$
