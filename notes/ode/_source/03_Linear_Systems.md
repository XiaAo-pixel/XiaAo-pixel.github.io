---
layout: note
kind: note
title: "Chapter 3　Linear Systems"
course: ode
order: 3
date: 2026-10-26
---

本章讨论线性系统 $\frac{dy}{dx} = A(x)y + f(x)$ 的一般理论（基本解组、Wronskian、Liouville 恒等式、基本矩阵），常系数系统的矩阵指数解法，高阶方程与常系数高阶方程，以及周期系数系统（Floquet 理论）。

## 3.1 General theory

$y(x) : I \subseteq \mathbb{R} \to \mathbb{R}^n$, $\dfrac{dy}{dx} = A(x)y + f(x)$, $A, f \in C(a,b)$.

> **Lemma.** The solution to the IVP is **unique \& extends** to $(a,b)$.
>
> **Pf.** We only need to prove the solution $y(x)$ bounded on $(c,d) \subseteq (a,b)$:
> $$
> \frac{d}{dx}\, \| y(x) \|^2 = \frac{d}{dx}\, y(x)^T y(x) = y(x)^T \bigl( A(x)y + f(x) \bigr) + \bigl( y^T A^T + f^T \bigr) y(x)
> \le 2\, \| y(x) \| \cdot \bigl( \| A(x) \| \cdot \| y(x) \| + \| f(x) \| \bigr),
> $$
> $$
> \Rightarrow \frac{d}{dx}\, \| y(x) \| \le \| A(x) \| \cdot \| y(x) \| + \| f(x) \| \le M \cdot \| y(x) \| + N.
> $$
> By Gronwall, $\| y(x) \|$ is bounded. $\square$

### 3.1.1 Homogeneous equation

> **Lemma.** $S = \Bigl\{ y(x) \text{ solves } \dfrac{dy}{dx} = A(x)y \Bigr\}$ is an $n$-dim vector space.
>
> **Pf.** Obviously, $S$ is a vector space. Let's check the dimension.
>
> Consider $T : \mathbb{R}^n \to S$, $y_0 \mapsto$ the solution $y(x)$ s.t. $y(0) = y_0$.
>
> Then $T$ is a linear and bijective map, making $S \cong \mathbb{R}^n$. So $\dim S = n$. $\square$

> **Lemma.** We can find $n$ linearly independent solutions $\{ y_i(x) \}$ s.t. $\forall f \in S$, $y = \sum_{i=1}^n a_i y_i$. We call $\{ y_i(x) \}$ a fundamental system of solutions.
>
> **Pf.** Using $T$, choose $y_0^{(1)}, \dots, y_0^{(n)}$ to get $y_i(x)$. $\square$

> **Def.** $\forall n$ solutions of the homogeneous equation $\dfrac{dy}{dx} = A(x)y$:
> $$
> W(y_1, \dots, y_n) := \det \bigl( y_1(x)\ \cdots\ y_n(x) \bigr) \quad \text{is the Wronskian det.}
> $$

> **Lemma (Liouville Identity).**
> $$
> W(x) = W(x_0)\ e^{\int_{x_0}^x \operatorname{tr} A(s)\, ds}, \quad \forall\ x_0, x \in (a,b).
> $$
>
> **Pf.** We prove that $W'(x) = \operatorname{tr} A(x) \cdot W(x)$.
> $$
> W'(x) = \sum_{i=1}^n \begin{vmatrix} y_{11}(x) & y_{21}(x) & \cdots & y_{n1}(x) \\ \vdots & \vdots & & \vdots \\ y'_{1i}(x) & y'_{2i}(x) & \cdots & y'_{ni}(x) \\ \vdots & \vdots & & \vdots \\ y_{1n}(x) & y_{2n}(x) & \cdots & y_{nn}(x) \end{vmatrix}
> $$
>
> $y_k'(x) = A(x)\, y_k(x) \ \Rightarrow\ y'_{kl} = \sum_{m=1}^n a_{lm}\, y_{km}$

![row index $l$ vs column index $i$ in the determinant expansion](fig/ch03_fig_3_1_1.png)

> $$
> \begin{vmatrix} y_{11}(x) & y_{21}(x) & \cdots & y_{n1}(x) \\ \sum_m a_{im} y_{1m} & \sum_m a_{im} y_{2m} & \cdots & \sum_m a_{im} y_{nm} \\ \vdots & \vdots & & \vdots \\ y_{1n}(x) & y_{2n}(x) & \cdots & y_{nn}(x) \end{vmatrix} = a_{\bar{i}\bar{i}} \cdot W(x)
> $$
> *(red arrow note: only if $m = i$ is the result of the det not 0.)*
>
> Hence $W'(x) = \operatorname{tr}(A(x)) \cdot W(x)$; by simple calculation we have
> $$
> W(x) = W(x_0) \cdot e^{\int_{x_0}^x \operatorname{tr} A(s)\, ds}. \qquad \square
> $$

> **Lemma.** $y_1(x), \dots, y_n(x) \in S$ are linearly dependent
> $$
> \Leftrightarrow \quad W(x) \equiv 0,\ x \in (a,b) \quad \Leftrightarrow \quad W(x_0) = 0 \text{ for some } x_0 \in (a,b).
> $$
>
> **Pf.** The first "$\Leftrightarrow$" holds by def, while the second is proved by the Liouville Identity. $\square$

> **Def.** Suppose $y_1(x)\ \cdots\ y_n(x)$ are fundamental solutions to $y' = Ay$; denote $Y := (y_1\ \ y_2\ \ \cdots\ \ y_n)$ a **fundamental matrix**.
>
> If $Y(x_0) = I_n$, we call $Y$ a principal fundamental matrix.

> **Lemma.**
> (1) If $\Phi(x)$ is a fundamental matrix, then for any constant matrix $C \in M_n(\mathbb{R})$ with $\det C \neq 0$, $\Phi \cdot C$ is also a fundamental matrix.
>
> (2) Any 2 fundamental matrices differ by a constant nonsingular matrix, i.e. $\forall\ \Phi, \Psi$, $\exists\ C$ s.t. $\det C \neq 0$ \& $\Psi = \Phi \cdot C$.
>
> (3) Given any initial data $y(x_0)$, we have a solution $y(x) = \Phi(x)\alpha$ with $y(x_0) = \Phi(x_0)\alpha$, $\alpha \in \mathbb{R}^n$ a constant vector.
>
> **Pf.** (1) $\bigl( \Phi \cdot C \bigr)' = \Phi' \cdot C = A \cdot \Phi \cdot C$, $\det(\Phi \cdot C) \neq 0$.
>
> (2) Consider $\Phi^{-1}(x) \cdot \Psi(x)$:
> $$
> \frac{d}{dx}\, \Phi^{-1}(x) \cdot \Psi(x) = \Bigl( -\Phi^{-1} \cdot \frac{d}{dx}\Phi \cdot \Phi^{-1} \Bigr) \cdot \Psi(x) + \Phi^{-1} \cdot \frac{d}{dx}\Psi
> = \bigl( -\Phi^{-1} \cdot A\Phi \cdot \Phi^{-1} \bigr) \cdot \Psi(x) + \Phi^{-1} \cdot A\Psi \equiv 0,
> $$
> hence $\Phi^{-1}(x)\Psi(x) = C$, $\det C \neq 0$.
>
> (3) Take $\alpha \in \mathbb{R}^n$ s.t. $y(x_0) = \Phi(x_0) \cdot \alpha$. We can check $\Phi(x) \cdot \alpha$ is a solution to the IVP. $\square$

### 3.1.2 Inhomogeneous equation $y' = A(x)\cdot y + f(x)$

> **Lemma.** The general solution of this equation has the form
> $$
> \varphi(x) = \Phi(x) \cdot C + \varphi^*(x),
> $$
> where $\Phi(x)$ is a fundamental matrix of $y' = A(x)\cdot y$, and $\varphi^*(x)$ is any solution of $y' = A(x)y + f(x)$.

> **Lemma.** The general solution of this equation has the form
> $$
> \varphi(x) = \Phi(x) \cdot \Bigl( C + \int_{x_0}^x \Phi^{-1}(s) f(s)\, ds \Bigr).
> $$

So we only need to solve the **homogeneous** equation.

#### d'Alembert reduction of order

$y' = A(x)\cdot y$: if we have one nonzero solution $\varphi_1(x)$,
$$
H(x) := \begin{pmatrix} \varphi_{11}(x) & 0 & \cdots & 0 \\ \varphi_{12}(x) & 1 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ \varphi_{1n}(x) & 0 & \cdots & 1 \end{pmatrix}, \qquad \text{W.L.O.G. } \varphi_{11}(x) \neq 0.
$$

Consider $y(x) = H(x)\, z(x)$, in which $z(x)$ satisfies a new equation:
$$
y'(x) = H'(x)\, z(x) + H(x)\, z'(x), \qquad \text{also } y'(x) = A(x)\cdot y = A(x)\, H(x)\, z(x),
$$
$$
\Rightarrow\ z'(x) = H^{-1}(x)\bigl( A(x)H(x) - H'(x) \bigr) z(x) = H^{-1}(x)\, A(x) \begin{pmatrix} 0 \\ I \end{pmatrix} z(x),
$$
so we reduce the original problem to an $(n-1)$-order problem.

> **Ex.** $\dfrac{dy}{dx} = A(x)y$, $A(x)=\begin{pmatrix} x^2 & -1 \\ 2x & 0 \end{pmatrix}$.
>
> **Sol.** Observe $\varphi(x)=\begin{pmatrix} 1 \\ x^2 \end{pmatrix}$ is a solution. Take
> $$H(x):=\begin{pmatrix} 1 & 0 \\ x^2 & 1 \end{pmatrix},\qquad y(x)=H(x)z(x),$$
> $$
> z'(x)=H^{-1}(x)A(x)\begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}z(x)
> \quad\xRightarrow{\text{reduction}}\quad
> \begin{cases} z_1'(x)=-z_2(x),\\ z_2'(x)=x^2 z_2(x). \end{cases}
> $$

## 3.2 Linear Systems with constant coefficients

$$
y'=A\cdot y+f(x), \quad\text{where } A \text{ is a constant matrix}.
$$

Find a fundamental matrix of $y'=Ay$.

> **Def.** Take $(M_n(\mathbb{R}), \|\cdot\|)$ as a complete metric space, in which
> $$
> \|A\|:=\sum_{1\le i,\ j\le n}|a_{ij}|.
> $$
> Then $e^A:=\sum\dfrac{A^k}{k!}$, $\ e^{Ax}:=\sum\dfrac{(Ax)^k}{k!}$.

> **Prop.** If $[A,B]:=AB-BA=0$, then
> $$
> e^{A+B}=e^A\cdot e^B.
> $$
>
> **Pf.** $e^{A+B}=\sum\limits_{n=0}^{+\infty}\dfrac{(A+B)^n}{n!}
> =\sum\limits_{n=0}^{+\infty}\dfrac{\sum\limits_{k=0}^{n}C_n^k\, A^k B^{n-k}}{n!}
> =\sum\limits_{n=0}^{+\infty}\sum\limits_{k=0}^{n}\dfrac{A^k}{k!}\cdot\dfrac{B^{n-k}}{(n-k)!}
> =\Bigl(\sum\limits_{k\ge0}\dfrac{A^k}{k!}\Bigr)\Bigl(\sum\limits_{l\ge0}\dfrac{B^l}{l!}\Bigr)$.
> (rigorous proof using the sum of the first $n$ terms) $\square$

> **Prop.**
> (1) $\forall A\in M_n(\mathbb{R})$, $e^A$ is invertible \& $(e^A)^{-1}=e^{-A}$.
>
> (2) If $[A,B]=0$, then $[e^A,B]=0$.
>
> (3) $A,P\in M_n(\mathbb{R})$ \& $P$ invertible $\Rightarrow e^{PAP^{-1}}=Pe^AP^{-1}$.

> **Thm.** $e^{Ax}$ is the fundamental matrix of $y'=Ay$.
>
> **Pf.** $e^{Ax}$ converges uniformly on any compact set, so we can take the derivative term by term. $\square$

**Case 1.** $A=\mathrm{diag}\{\lambda_1,\dots,\lambda_n\}$. Then $e^{Ax}=\mathrm{diag}\{e^{\lambda_1 x},\dots,e^{\lambda_n x}\}$.

**Case 2.** $A$ is a Jordan form, i.e.
$$
A=\begin{pmatrix} \lambda & 1 & & \\ & \ddots & \ddots & \\ & & \ddots & 1 \\ & & & \lambda \end{pmatrix}=:A_1+N.
$$
Notice $[A_1,N]=0$, so we calculate $e^{Nx}$ as
$$
e^{Nx}=\sum_{k\ge0}\frac{(Nx)^k}{k!}
=I+\begin{pmatrix} 0 & x & & \\ & \ddots & \ddots & \\ & & \ddots & x \\ & & & 0 \end{pmatrix}
+\begin{pmatrix} 0 & 0 & \frac{x^2}{2} & \\ & \ddots & \ddots & \frac{x^2}{2} \\ & & \ddots & \\ & & & 0 \end{pmatrix}
+\cdots+
\begin{pmatrix} & & & \frac{x^{n-1}}{(n-1)!} \\ & & & \\ & 0 & & \\ & & & \end{pmatrix}.
$$
Thus
$$
e^{Ax}=\begin{pmatrix} e^{\lambda x} & xe^{\lambda x} & \cdots & \frac{x^{n-1}}{(n-1)!}e^{\lambda x} \\ & e^{\lambda x} & \cdots & \frac{x^{n-2}}{(n-2)!}e^{\lambda x} \\ & & \ddots & \vdots \\ & & & e^{\lambda x} \end{pmatrix}.
$$

**Case 3.** $A=\mathrm{diag}\{J_1,\dots,J_k\}$, $J_i$ Jordan blocks: $e^{Ax}=\mathrm{diag}\{e^{J_1x},\dots,e^{J_kx}\}$.

**Case 4.** Any given $A$ with $A = PBP^{-1}$: $e^{Ax} = Pe^{Bx}P^{-1}$.

**Further Simplification**

**Case 1.** $A$ has $n$ single eigenvalues $\lambda_1,\dots,\lambda_n$ with eigenvectors $\vec{\xi}_i$. Then
$$
e^{Ax}P=(e^{\lambda_1x}\vec{\xi}_1,\ \dots,\ e^{\lambda_nx}\vec{\xi}_n)
\quad\text{is already a fundamental matrix.}
$$
Here the matrix can be complex; taking $e^{\lambda_ix}\vec{\xi}_i+e^{\bar{\lambda}_ix}\bar{\vec{\xi}}_i$ gives a real solution.

**Case 2.** $A$ has repeated eigenvalues $\lambda_1,\dots,\lambda_s$, where $\lambda_j$ has multiplicity $n_j$; then
$$
\varphi(x)=e^{\lambda_jx}\Bigl(\vec{\xi}_0+x\vec{\xi}_1+\cdots+\frac{x^{n_j-1}}{(n_j-1)!}\vec{\xi}_{n_j-1}\Bigr)
$$
is a solution to $y'=Ay$ iff
$$
(A-\lambda_j I)^{n_j}\vec{\xi}_0=0,
$$
$$
\vec{\xi}_1=(A-\lambda_jI)\vec{\xi}_0,\quad \vec{\xi}_2=(A-\lambda_jI)^2\vec{\xi}_0,\ \dots,\quad \vec{\xi}_{n_j-1}=(A-\lambda_jI)^{n_j-1}\vec{\xi}_0.
$$
So we have the fundamental matrix
$$
\Phi(x)=\bigl(e^{\lambda_1x}P_1^{(1)}(x),\ e^{\lambda_1x}P_2^{(1)}(x)\ \cdots\ e^{\lambda_1x}P_{n_1}^{(1)}(x)\ \cdots\ e^{\lambda_jx}P_1^{(j)}(x)\ \cdots\ e^{\lambda_sx}P_{n_s}^{(s)}(x)\bigr),
$$
where
$$
P_j^{(i)}(x)=\vec{\xi}_{j0}^{(i)}+x\vec{\xi}_{j1}^{(i)}+\cdots+\frac{x^{n_j-1}}{(n_j-1)!}\vec{\xi}^{(i)}_{j,n_j-1},
$$
with $\vec{\xi}^{(i)}_{1,0},\ \dots,\ \vec{\xi}^{(i)}_{n_j,0}$ independent solutions of $(A-\lambda_jI)^{n_j}\vec{\xi}=0$.

*(margin, red: Step: (1) $A\to f_A(x)$, $\lambda_i$ with $n_i$. (2) $\mathrm{Ker}(A-\lambda_iI)^{n_i}\to\vec{\xi}_{i,1},\dots,\vec{\xi}_{i,n_i}$ — get generating space $(A-\lambda_iI)^m\vec{\xi}_{i,1}$ $(m\le n_i-1)$. (3) Form solution.)*

> **Rem.**
> (1) $\Phi(x)$ could be a complex matrix. We want to construct a real valued fundamental matrix $e^{Ax}=\Phi(x)\cdot C$ ($C$ constant). Letting $x=0$, we have $e^{Ax}=\Phi(x)\cdot\Phi^{-1}(0)$.
>
> (2) $\mathrm{Re}(\lambda_i)<0$ for any eigenvalue $\lambda_i$ of $A$
> $\iff$ any solution of $y'=Ay$ converges to $0$ when $x\to+\infty$.

## 3.3 Higher order ODE

### 3.3.1 General Theory

$$
y^{(n)}+a_1(x)y^{(n-1)}+\cdots+a_n(x)y=f(x). \tag{*}
$$

Denote
$$
Y(x)=\begin{pmatrix} y(x)\\ \vdots\\ y^{(n-1)}(x) \end{pmatrix},\quad
A(x)=\begin{pmatrix} 0 & 1 & & & 0 \\ 0 & 0 & 1 & & \\ \vdots & & \ddots & \ddots & \\ 0 & \cdots & & 0 & 1 \\ -a_n(x) & -a_{n-1}(x) & \cdots & & -a_1(x) \end{pmatrix},\quad
F(x):=\begin{pmatrix} 0\\ \vdots\\ 0\\ f \end{pmatrix},
$$
then the equation $\iff Y'=AY+F$.

So the **existence, extension, linear independence** is the same.

> **Thm.**
> (1) The IVP for $(*)$ has a unique solution which extends to $(a,b)$ if $a_j(x)$ are defined on $(a,b)$.
>
> (2) For the homogeneous equation (i.e. $f(x)\equiv0$), the solutions form an $n$-dim linear space.

> **def.** Wronskian det.

> **Lemma.** Liouville Identity.

> **Thm.**
> Given arbitrary $\varphi_1,\dots,\varphi_n$ linearly independent on $(a,b)$ \& $\varphi_j\in C^\infty(a,b)$, then we can find a unique $n$-th order homogeneous ODE s.t. $\{\varphi_j\}$ forms a fundamental system of solutions for it.
>
> **Pf.** Suppose $\{\varphi_j\}$ satisfies $y^{(n)}+a_1(x)y^{(n-1)}+\cdots+a_n(x)y=0$, i.e.
> $$
> \begin{pmatrix} \varphi_1^{(n-1)} & \cdots & \varphi_n^{(n-1)}\\ \vdots & & \vdots\\ \varphi_1 & \cdots & \varphi_n \end{pmatrix}
> \begin{pmatrix} a_1(x)\\ \vdots\\ a_n(x) \end{pmatrix}
> =-\begin{pmatrix} \varphi_1^{(n)}\\ \vdots\\ \varphi_n^{(n)} \end{pmatrix},
> $$
> so we solve $a_i(x)$. $\square$

> **Prop.★** Consider $n=2$: $y''+p(x)y'+q(x)y=0$, $p,q\in C(a,b)$. Given $\varphi(x)\neq0$ as a solution, then the general solution is
> $$
> y=c_1\varphi(x)+c_2\varphi(x)\int_{x_0}^{x}\frac{1}{\varphi^2(s)}\ e^{-\int_{x_0}^{s}p(t)dt}\ ds.
> $$
>
> **Pf.** Suppose $\psi(x)$ is another independent solution:
> $$
> W(x)=\begin{vmatrix} \varphi & \psi\\ \varphi' & \psi' \end{vmatrix}=W(x_0)\cdot\exp\Bigl(\int_{x_0}^{x}-p(s)\,ds\Bigr),
> $$
> so
> $$
> \Bigl(\frac{\psi}{\varphi}\Bigr)'=\frac{1}{\varphi^2}\cdot W(x_0)\cdot\exp\Bigl(\int_{x_0}^{x}-p(s)\,ds\Bigr)
> \Rightarrow \frac{\psi}{\varphi}=C\cdot\int_{x_0}^{x}\frac{W(x_0)}{\varphi(s)^2}\exp\Bigl(\int_{x_0}^{s}-p(t)dt\Bigr)\,ds. \qquad\square
> $$
> *(margin, red: Wronski Method. Useful in power series.)*

> **Prop.**
> Given $\varphi_1,\dots,\varphi_n$ as fundamental solutions of $y^{(n)}+a_1(x)y^{(n-1)}+\cdots+a_n(x)y=0$, the general solution of the inhomogeneous equation $y^{(n)}+a_1(x)y^{(n-1)}+\cdots+a_ny=f(x)$ has the form
> $$
> y(x)=\sum_{i=1}^{n}c_i\varphi_i(x)+\varphi^*(x),\qquad\text{$\varphi^*(x)$: a special solution.}
> $$
>
> **Pf.** Consider $Y'=AY+F$; we have proved
> $$
> Y(x)=\Phi(x)\ \Bigl(C+\int_{x_0}^{x}\Phi^{-1}(s)F(s)\,ds\Bigr),
> $$
> where $Y(x)=\begin{pmatrix} y(x)\\ \vdots\\ y^{(n-1)}(x) \end{pmatrix}$, $A(x)$ as above, $F(x):=\begin{pmatrix} 0\\ \vdots\\ 0\\ f \end{pmatrix}$.
> So the 1st component is
> $$
> y(x)=\sum_{i=1}^{n}c_i\varphi_i(x)+\varphi^*(x). \qquad\square
> $$

**Alternate Method (Variation of Parameters)**

Guess $y=\sum c_j(x)\varphi_j(x)$, which is a special solution:
$$
y'(x)=\sum c_j'(x)\varphi_j(x)+\sum c_j(x)\varphi_j'(x)\qquad\text{suppose }\ \sum c_j'(x)\varphi_j(x)=0,
$$
$$
y''(x)=\sum c_j'(x)\varphi_j'(x)+\sum c_j(x)\varphi_j''(x)\qquad\text{suppose }\ \sum c_j'(x)\varphi_j'(x)=0,
$$
$$
\vdots
$$
$$
y^{(n-1)}(x)=\sum c_j'(x)\varphi_j^{(n-2)}(x)+\sum c_j(x)\varphi_j^{(n-1)}(x)\qquad\text{suppose }\ \sum c_j'(x)\varphi_j^{(n-2)}(x)=0,
$$
$$
y^{(n)}(x)=\sum c_j'(x)\varphi_j^{(n-1)}(x)+\sum c_j(x)\varphi_j^{(n)}(x).
$$

And by $y^{(n)}+a_1(x)y^{(n-1)}+\cdots+a_n(x)y=f(x)$, we get $\sum c_j'(x)\varphi_j^{(n-1)}(x)=f(x)$.

So we get
$$
\begin{pmatrix} \varphi_1 & \cdots & \varphi_n\\ \vdots & & \vdots\\ \varphi_1^{(n-1)} & \cdots & \varphi_n^{(n-1)} \end{pmatrix}
\begin{pmatrix} c_1'\\ \vdots\\ c_n' \end{pmatrix}
=\begin{pmatrix} 0\\ \vdots\\ 0\\ f(x) \end{pmatrix},
$$

*(margin hint: $\hat{\Phi}_j(x)=\begin{vmatrix} \varphi_1 & \cdots & \varphi_{j-1} & 0 & \varphi_{j+1} & \cdots & \varphi_n\\ \vdots & & \vdots & \vdots & \vdots & & \vdots\\ \varphi_1^{(n-1)} & \cdots & \varphi_{j-1}^{(n-1)} & f(x) & \varphi_{j+1}^{(n-1)} & \cdots \end{vmatrix}=f(x)A_{nj}(x)=f(x)W_j(x)$)*

$$
\Rightarrow \vec{C}'=\Phi^{-1}(x)\begin{pmatrix} 0\\ \vdots\\ 0\\ f(x) \end{pmatrix}
=\frac{1}{W(x)}\begin{pmatrix} \hat{\Phi}_1\\ \vdots\\ \hat{\Phi}_n \end{pmatrix}
\qquad\text{($\hat{\Phi}_j$: number)}
$$

$$
\Rightarrow c_j=\int_{x_0}^{x}\frac{\hat{\Phi}_j(s)}{W(s)}\,ds=\int_{x_0}^{x}\frac{W_j(s)f(s)}{W(s)}\,ds,
\qquad\text{we get a special solution.}
$$

### 3.3.2 $n$-th order ODE with constant coefficients

$$
y^{(n)}+a_1y^{(n-1)}+\cdots+a_ny=0,\qquad a_i\in\mathbb{R}.
$$

Denote $p(\lambda)=\lambda^n+a_1\lambda^{n-1}+\cdots+a_n$, $\ L=\dfrac{d^n}{dx^n}+a_1\dfrac{d^{n-1}}{dx^{n-1}}+\cdots+a_n$.

> **Lemma.** $L(e^{\lambda x})=p(\lambda)e^{\lambda x}$, $\forall\lambda$.

> **Lemma.** If $\lambda_j$ is a root of $p(\lambda)$ with multiplicity $n_j$, then $L(x^{k_j}e^{\lambda_jx})=0$, $k_j=0,\dots,n_j-1$.
> *(margin: proved by simple computation)*

Reveals that we only need to solve $p(\lambda)=0$ to get all solutions.

> **Thm.**
> Suppose $p(\lambda)=0$ has distinct roots $\lambda_1,\dots,\lambda_s$ with multiplicities $n_1,\dots,n_s$ $(n_1+\cdots+n_s=n)$. Then $Ly=0$ has $n$ linearly independent solutions $x^{k_j}e^{\lambda_jx}$, $k_j=0,\dots,n_j-1$; $1\le\bar{j}\le s$.
>
> **Pf.** We only need to prove linear independence. Suppose $\exists\ c_{j,k_j}$ not all zero s.t.
> $$
> \sum_{j=1}^{s}\sum_{k_j=0}^{n_j-1}c_{j,k_j}\,x^{k_j}e^{\lambda_jx}\equiv0\qquad\text{for } x\in(a,b),
> $$
> i.e. $\sum\limits_{j=1}^{s}P_j(x)e^{\lambda_jx}\equiv0$, $P_j$ polynomials of degree $\le n_j-1$.
>
> W.L.O.G. $P_1(x)\not\equiv0$, thus
> $$
> P_1(x)+\sum_{j=2}^{s}P_j(x)e^{(\lambda_j-\lambda_1)x}\equiv0.
> $$
> $\xrightarrow{\frac{d^{n_1}}{dx^{n_1}}}\ \sum_{j\ge2}Q_j(x)e^{(\lambda_j-\lambda_1)x}\equiv0$, where $Q_s(x)=c(\lambda_s-\lambda_1)^{n_s}x^k+\cdots$.
>
> i.e. $Q_2(x)+\sum_{j\ge3}Q_j(x)e^{(\lambda_j-\lambda_2)x}\equiv0$, $\xrightarrow{\frac{d^{n_2}}{dx^{n_2}}}\ \sum_{j\ge3}\widetilde{Q}_j(x)e^{(\lambda_j-\lambda_2)x}\equiv0$.
>
> Repeat the process: we get $R(x)e^{(\lambda_s-\lambda_{s-1})x}\equiv0$, which is contradictory. $\square$

> **Rem.**
> If $p(\lambda)=0$ has a complex root $\lambda_0$, take $\mathrm{Re}(x^ke^{\lambda_0x})$ and $\mathrm{Im}(x^ke^{\lambda_0x})$ to obtain the real solution.

> **Ex.** $\begin{cases} y''(x)+\alpha^2y(x)=f(x)\\ y(0)=y_0,\ y'(0)=y_1 \end{cases}$
>
> $p(\lambda)=\lambda^2+\alpha^2=0\ \Rightarrow\ \lambda=\pm\alpha i$. $e^{i\alpha x}=\cos\alpha x+i\sin\alpha x$, so $[\cos\alpha x\ \ \sin\alpha x]$ is a fundamental solution of the homogeneous equation.
>
> $$W=\begin{vmatrix} \cos\alpha x & \sin\alpha x\\ -\alpha\sin\alpha x & \alpha\cos\alpha x \end{vmatrix}=\alpha, \qquad W_1=-\sin\alpha x, \quad W_2=\cos\alpha x.$$
>
> So we have the general solution
> $$
> y=C_1\cos\alpha x+C_2\sin\alpha x+\cos\alpha x\int_0^{x}\frac{W_1(s)}{W(s)}f(s)\,ds+\sin\alpha x\int_0^{x}\frac{W_2(s)}{W(s)}f(s)\,ds.
> $$

> **Ex.** $u(t,x):\mathbb{R}\times\mathbb{R}^n\to\mathbb{R}$,
> $$\begin{cases} (\partial_t^2-\Delta_x)u=f(t,x)\\ u(0,x)=u_0(x),\ \partial_tu(0,x)=u_1(x). \end{cases}$$
>
> **Sol.** $\hat{h}(\xi):=(\mathcal{F}h)(\xi):=\int h(x)e^{-ix\cdot\xi}dx$, $\ \breve{g}(x):=(\mathcal{F}^{-1}g)(x):=\frac{1}{(2\pi)^n}\int g(\xi)e^{ix\cdot\xi}d\xi$.
>
> Apply the Fourier transform to $u_{tt}-\Delta_xu=f$:
> $$
> \begin{cases} \hat{u}_{tt}(t,\xi)+|\xi|^2\hat{u}(t,\xi)=\hat{f}(t,\xi)\\ \hat{u}(0,\xi)=\hat{u}_0(\xi),\ \partial_t\hat{u}(0,\xi)=\hat{u}_1(\xi) \end{cases}
> $$
> $$
> \Rightarrow\ \hat{u}(t,\xi)=\hat{u}_0(\xi)\cos t|\xi|+\frac{\hat{u}_1(\xi)}{|\xi|}\sin t|\xi|+\int_0^{t}\frac{\sin(t-s)|\xi|}{|\xi|}\hat{f}(s,\xi)ds.
> $$
> Taking $\mathcal{F}^{-1}$:
> $$
> u(t,x)=\cos t|\nabla|\cdot u_0+\frac{\sin t|\nabla|}{|\nabla|}u_1+\int_0^{t}\frac{\sin((t-s)|\nabla|)}{|\nabla|}f(s,x)\,ds.
> $$

### 3.3.3 Special Cases of the inhomogeneous equation

**Case 1.** $Ly=P_m(x)e^{\mu x}$.

**(a).** If $p(\mu)\neq0$: guess a solution of the form $Q_m(x)e^{\mu x}$, and figure out $Q_m$.

**(b).** If $\mu$ is a root of $p(\lambda)$ with multiplicity $k$: guess a solution $g(x)e^{\mu x}$.

Recall $L(e^{\lambda x})=p(\lambda)e^{\lambda x}\ \Rightarrow\ L(x^le^{\lambda x})=\sum_j C_l^j\,p^{(j)}(\lambda)\,x^{l-j}e^{\lambda x}$.

Putting $p(\mu)=0,\ \dots,\ p^{(k-1)}(\mu)=0$, we have
$$
L(x^le^{\mu x})=\sum_{j\ge k}C_l^j\,p^{(j)}(\mu)\,x^{l-j}e^{\mu x}=e^{\mu x}\cdot Q_{l-k}(x).
$$

Hence we guess a solution $x^kQ_m(x)e^{\mu x}$.

**Case 2.** $Ly=e^{\alpha x}(A_m(x)\sin\beta x+B_l(x)\cos\beta x)$

Guess a solution $x^ke^{\alpha x}(C_N(x)\sin\beta x+D_N(x)\cos\beta x)$, where $k$ is the multiplicity of $\mu=\alpha+i\beta$ as a root of $p(\lambda)=0$, $N=\max\{m,l\}$.

> **Ex.** $y''+y=xe^x$.
>
> $p(\lambda)=0\ \Rightarrow\ \lambda=\pm i$, so $\{\cos x,\sin x\}$ is a fundamental system. Guess a special solution $y=(Ax+B)e^x$; we get $A=\frac12$, $B=-\frac12$. So the general solution is $y=\frac12(x-1)e^x+C_1\cos x+C_2\sin x$. $\square$

> **Ex (Euler Equation).★**
>
> $$x^ny^{(n)}+a_1x^{n-1}y^{(n-1)}+\cdots+a_{n-1}xy'+a_ny=0.$$
>
> **Method (1).** Set $x=e^t$, $\tilde{y}(t)=y(e^t)$:
> $$
> \frac{d\tilde{y}}{dt}=xy',\qquad \frac{d^2\tilde{y}}{dt^2}=\frac{d}{dt}(xy')=(xy''+y')x=x^2y''+xy'.
> $$
> So we can get an equation with constant coefficients.
>
> **Method (2).** Try $x^{\lambda}$. Denote $D_n:=x^n\dfrac{d^n}{dx^n}+a_1x^{n-1}\dfrac{d^{n-1}}{dx^{n-1}}+\cdots+a_n$:
> $$
> (x^{\lambda})^{(k)}=\lambda(\lambda-1)\cdots(\lambda-k+1)x^{\lambda-k},\qquad x^k\cdot(x^{\lambda})^{(k)}=\lambda(\lambda-1)\cdots(\lambda-k+1)x^{\lambda},
> $$
> $$
> D_n(x^{\lambda})=\bigl[\lambda(\lambda-1)\cdots(\lambda-n+1)+a_1\lambda(\lambda-1)\cdots(\lambda-n+2)+\cdots+a_n\bigr]x^{\lambda}=:q(\lambda)x^{\lambda}.
> $$
> Hence if $q(\lambda_0)=0$, then $x^{\lambda_0}$ is a solution.
>
> If we get $\lambda_0$ with multiplicity $k$:
> $$
> D_n(x^{\lambda})=q(\lambda)x^{\lambda}\ \xRightarrow{\ d^l/d\lambda^l\ }\ D_n\bigl(x^{\lambda}(\ln x)^l\bigr)=\sum_j C_l^j\,q^{(j)}(\lambda)(\ln x)^{l-j}x^{\lambda},
> $$
> hence $\forall\ l\le k-1$, $D_n(x^{\lambda_0}(\ln x)^l)\equiv0$.
>
> So we get solutions $x^{\lambda_j}(\ln x)^{k_j}$, $0\le k_j\le n_j-1$, $1\le\bar{j}\le s$, where $\lambda_1,\dots,\lambda_s$ are the distinct roots of $q(\lambda)$ with multiplicities $n_j$. $\square$

## 3.4 Linear Systems with periodic coefficients (Floquet Theory)

$$
y'=A(x)y,\quad y:\mathbb{R}\to\mathbb{R}^n,\quad A(x+w)=A(x),\ (w>0).
$$

> **Thm.**
> (1) If $\Phi(x)$ is a fundamental matrix with $\Phi(0)=I$, then $\Phi(x+w)$ is also a fundamental matrix, \& $\exists$ a constant nonsingular $C$ s.t.
> $$
> \Phi(x+w)=\Phi(x)C, \qquad (C=\Phi(w)).
> $$
>
> (2) $\forall\ w\in\mathbb{R}$ \& $w\neq0$, $C$ is a nonsingular matrix:
>
> (a) $\exists\ R$ (possibly complex) s.t. $e^{wR}=C$.
>
> (b) $\exists\ \widetilde{R}$ a real matrix s.t. $e^{w\widetilde{R}}=C^2$.
>
> (3) For $C$ in (1) \& $R$ in (2), denote $P(x)=\Phi(x)e^{-xR}$, then $P(x)$ is $w$-periodic. Taking $y(x)=P(x)z(x)$, then $z'(x)=Rz(x)$.
>
> (4) For $C$ in (1) \& $\widetilde{R}$ in (2), denote $\widetilde{P}(x)=\Phi(x)e^{-x\widetilde{R}}$ \& $y(x)=\widetilde{P}(x)\widetilde{z}(x)$; then $\widetilde{P}(x)$ is $2w$-periodic \& $\widetilde{z}'(x)=\widetilde{R}\widetilde{z}(x)$.
>
> **Pf.** We only prove (2); the other conclusions are checked by calculating.
>
> (a) Reduce to the Jordan form $J=\lambda I+N$:
> $$
> J=\lambda I\Bigl(I+\frac{N}{\lambda}\Bigr),\qquad \log J:=\log\lambda I+\log\Bigl(I+\frac{N}{\lambda}\Bigr)=\mathrm{diag}(\log\lambda,\dots,\log\lambda)+\sum_{n\ge1}\frac{(-1)^{n+1}}{n}\Bigl(\frac{N}{\lambda}\Bigr)^n
> $$
> *(margin: $N$ nilpotent, so the sum is finite)*
>
> Verify $e^{\log J}=J$ by checking coefficients.
>
> (b) Check $\log\lambda$: $\lambda>0\ \Rightarrow\ \log\lambda$ real $\Rightarrow\ \log J$ real.
>
> If $\lambda$ is an eigenvalue of $C$, then $\lambda^2$ is an eigenvalue of $C^2$. Suppose $C^2$ has the Jordan canonical form $\mathrm{diag}\{J_1,\dots,J_k\}$. $J$ could be $\begin{pmatrix}\lambda & 1 & \\ & \ddots & \ddots \\ & & \lambda\end{pmatrix}$ or $\begin{pmatrix} T^E & & \\ T & T^E & \\ & \ddots & \ddots \end{pmatrix}$, where $E=I_{2\times2}$, $T=r\begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}$, $r>0$:
> $$
> Q=\log T=\begin{pmatrix}\log r & \\ & \log r\end{pmatrix}+\begin{pmatrix}0 & -\theta\\ \theta & 0\end{pmatrix} \quad(\text{check}),
> $$
> $$
> \log J=\log\begin{pmatrix} T & & \\ & \ddots & \\ & & T \end{pmatrix}\Bigl(I+\begin{pmatrix} 0 & T^{-1} & \\ & \ddots & \ddots \\ & & T^{-1} \end{pmatrix}\Bigr)
> =\begin{pmatrix} Q & & \\ & \ddots & \\ & & Q \end{pmatrix}+\sum_{h\ge1}\frac{(-1)^{n+1}}{n}\begin{pmatrix} 0 & T^{-1} & \\ & \ddots & \ddots \\ & & T^{-1} \end{pmatrix}^{h}.
> $$
> Real! $\square$

> **Rem.** $R$ or $\widetilde{R}$ are not unique, because $C=e^{wR}=e^{w(R+\frac{2k\pi i}{w}I)}$.

> **Def.** An eigenvalue of $C$ is called a **characteristic multiplier** of $A$. An eigenvalue of $R$ is called a **characteristic exponent**. (NOT unique.)

> **Thm.**
> $y'=A(x)y$. For any characteristic multiplier $\lambda$, there exists a solution (possibly complex) s.t. $y(x+w)=\lambda y(x)$. Equivalently, take the characteristic exponent $\mu$ with $e^{\mu w}=\lambda$; then there exists a solution $y(x)=h(x)e^{\mu x}$ with $h(x)$ periodic.
>
> **Pf.** Consider an eigenvector $y_0$ of $R$ corresponding to $\mu$. Then $y(x)=\Phi(x)y_0$ is also a solution. Using $\Phi(x)=P(x)e^{xR}$:
> $$
> y(x)=P(x)e^{wR}y_0=P(x)e^{w\mu}y_0=e^{w\mu}P(x)y_0.
> $$
> *(margin, red: $\Phi(x+w)=\Phi(x)C$; $\Phi(x+w)y_0=\Phi(x)Cy_0=\lambda\Phi(x)y_0$.)*
>
> Denote $h(x)=P(x)y_0$, which is $w$-periodic. $\square$

> **Cor.** $y'=A(x)y$ has a periodic solution $\iff 1$ is a characteristic multiplier.
>
> **Pf.** $\Leftarrow$: by the periodic thm.
>
> $\Rightarrow$: suppose $y(x)$ is a $w$-periodic solution *(margin, red: $\varphi(x+w)=\varphi(x)$, $\varphi(x)=\Phi(x)y_0$; $\Phi(x+w)y_0=\Phi(x)Cy_0=\Phi(x)y_0$)*:
> $$
> \begin{cases} y(x)=\Phi(x)y_0,\\ y(x+w)=\Phi(x+w)y_0=\Phi(x)Cy_0, \end{cases}
> \Rightarrow Cy_0=y_0\ \Rightarrow\ 1 \text{ is a char-multiplier}. \qquad\square
> $$

> **Cor.**
> (1) If all characteristic multipliers satisfy $|\lambda|<1$ (equivalently $\mathrm{Re}\,\mu<0$), then all solutions converge to $0$ as $x\to+\infty$; i.e. the $0$ solution is **asymptotically stable**.
>
> **Pf.** $y(x)=P(x)z(x)$, $P(x)$ is $w$-periodic, thus bounded. $z'(x)=Rz(x)$, so $z(x)=\sum e^{\mu_ix}P_{i,n_i}(x)$. $\mathrm{Re}\,\mu_i<0\ \Rightarrow z(x)\to0$, so $y(x)\to0$. $\square$
>
> (2) If there exists $|\lambda|>1$, then $0$ is asymptotically unstable.
>
> (3) If all $|\lambda|\le1$ and the algebraic multiplicity equals the geometric multiplicity, then $0$ is orbitally stable.
