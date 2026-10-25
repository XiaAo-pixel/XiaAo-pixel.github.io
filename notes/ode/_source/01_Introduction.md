---
layout: note
kind: note
title: "Chapter 1　Introduction"
course: ode
order: 1
date: 2026-10-26
---

本章给出 ODE 与古典解的定义，介绍一阶方程的常用初等解法：恰当方程、分离变量、积分因子、隐方程与参数法，以及若干可初等求解的典型方程（Bernoulli、Riccati、Euler 型等）。

## 1.1 What is an ODE

> **Def (ODE).**
> $F$ is a given function, $x\in\mathbb{R}$, $y(x)\colon I\subseteq\mathbb{R}\to V\subseteq\mathbb{R}^m$ $(m<\infty)$.
> An ODE is
> $$
> F(x, y(x), y'(x), \dots, y^{(n)}(x)) = 0,
> $$
> which has order $n$.

> **Def (Classical solution).**
> $$\varphi(x)\colon J\subseteq\mathbb{R}\to V,\quad \varphi\in D^n(J),$$ s.t.
> $$
> F(x, \varphi(x), \varphi'(x), \dots, \varphi^{(n)}(x)) = 0, \quad \forall x\in J.
> $$

> **Rem.**
> If $F$ is good enough, by implicit function theorem,
> $$
> y^{(n)} = f(x, y, y', \dots, y^{(n-1)}).
> $$

**Notes for example 1.5:** long time behavior.

![long time behavior of $y'=ry$: $r>0$, $r<0$, $r=0$](fig/ch01_fig_1_1_1.png)

$r = 0$ is a **bifurcation point**.

> **Def (General solution).**
> For $F(x, y, y', \dots, y^{(n)}) = 0$, if $\varphi(x, C_1, \dots, C_n)$ solves it, and $C_i$ are **independent parameters**, we say $\varphi$ is a general solution.
>
> Here, "independent parameters" means
> $$
> \det\frac{\partial(\varphi, \varphi', \dots, \varphi^{(n-1)})}{\partial(C_1, C_2, \dots, C_n)} \neq 0.
> $$

> **Rem.**
> If $\varphi$ is a general solution, then given any initial data
> $$
> (y(0), y'(0), \dots, y^{(n-1)}(0)) = (a_0, a_1, \dots, a_{n-1}),
> $$
> we can always find some $C_i$ s.t. $\varphi(x, C_1, \dots, C_n)$ solves IVP.
> This is true by inverse function theorem.

## 1.2 Find explicit solutions for ODE

### 1.2.1 Exact equation

Consider $P(x,y)\,dx + Q(x,y)\,dy = 0$.

> **Def (general integral).**
> If $\exists\ \Phi(x,y)\in C^1$, s.t.
> $$
> d\Phi = P(x,y)\,dx + Q(x,y)\,dy,
> $$
> then the equation is called an **exact equation**, and $\Phi$ is called a general integral of the equation. Its solution is given by
> $$
> \Phi(x,y) = C.
> $$

> **Lemma (Exact-equation lemma).** *(proof see pdf)*
> Assume $P$, $Q$ and $\dfrac{\partial P}{\partial y}$, $\dfrac{\partial Q}{\partial x}$ are continuous in a simply connected domain. Then the equation is exact iff
> $$
> \frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}.
> $$
>
> In this case,
> $$
> \Phi(x,y) = \int_{x_0}^{x} P(s,y)\,ds + \int_{y_0}^{y} Q(x,\theta)\,d\theta + C.
> $$

> **Rem.**
> Compare with that:
>
> "$\int_\gamma P\,dx + Q\,dy$ is independent of path
> iff $\dfrac{\partial P}{\partial y} = \dfrac{\partial Q}{\partial x}$ (for simply connected domain)."

### 1.2.2 Separating Variables

If $P(x,y) = X(x)\,Y(y)$, $Q(x,y) = X_1(x)\,Y_1(y)$, then we rewrite

$$
\frac{X(x)}{X_1(x)}\,dx + \frac{Y_1(y)}{Y(y)}\,dy = 0,
$$

which is obviously exact. Notice $X_1(x) = 0$ $(x = a_1)$ or $Y_1(y) = 0$ $(y = b_1)$, which are also solutions.

> **Eg (Logistic Population Model).**
> $$
> \frac{dy}{dt} = ry\,(N-y)
> \ \Rightarrow\ \frac{dy}{y(N-y)} = r\,dt \qquad (\text{or } y\equiv 0,\ y\equiv N)
> $$
> $$
> \Rightarrow\ \frac{y}{N-y} = k\,e^{Nrt}\quad (k\in\mathbb{R})
> \ \Rightarrow\ y(t) = \frac{Nke^{Nrt}}{1+ke^{Nrt}} = N - \frac{N\,(N-y(0))}{(N-y(0)) + y(0)\,e^{Nrt}}.
> $$

![logistic model: $y(0)>N$, $y(0)\in(0,N)$, $y(0)<0$](fig/ch01_fig_1_2_1.png)

Equilibrium: $y = 0$ \& $y = N$ (stable).

> **Eg.** $(x^2+1)(y^2-1)\,dx + xy\,dy = 0$
> $$
> \Rightarrow\ y^2 - 1 = k\,\frac{1}{x^2 e^x}\quad (k\in\mathbb{R}),
> \qquad\&\quad x \equiv 0.
> $$

![solution family of $(x^2+1)(y^2-1)dx+xy\,dy=0$](fig/ch01_fig_1_2_2.png)

Except for $(0,\pm 1)$, through any other point there exists a unique solution graph.

> **Eg.** $y' = \dfrac{3}{2}\,y^{1/3}$
> $$
> \Rightarrow\ y^2 = (x+C)^3 \quad \& \quad y \equiv 0.
> $$

![family $y^2=(x+C)^3$ (semicubical parabolas)](fig/ch01_fig_1_2_3.png)

Through any $(x_0, y_0)$ $(y_0 \neq 0)$ there exists a unique solution; if $y_0 = 0$ there are infinite.

> **Eg (Homogeneous Equation of order n).**
>
> We call $f(x,y)$ a homogeneous function of order $n$ if
> $$
> f(tx, ty) = t^n f(x,y), \quad \forall t.
> $$
>
> Consider $M(x,y)\,dx + N(x,y)\,dy = 0$, in which $M$, $N$ are homogeneous of order $n$.
>
> Set $y = ux$. Then $M(x,y) = x^n M(1,u)$, $dy = x\,du + u\,dx$,
> $$
> \Rightarrow\ x^n\bigl(M(1,u) + uN(1,u)\bigr)\,dx + x^{n+1}\,N(1,u)\,du = 0.
> $$

> **Eg.** $\dfrac{dy}{dx} = \dfrac{x+y}{x-y}$
>
> **Sol.** Set $y = ux$, $dy = u\,dx + x\,du$,
> $$
> \frac{u\,dx + x\,du}{dx} = \frac{x+ux}{x-ux} = \frac{1+u}{1-u}
> $$
> $$
> \Rightarrow\ \frac{(1-u)\,du}{1+u^2} = \frac{dx}{x} \qquad (\text{here, check } x\equiv 0 \text{ is not a solution.})
> $$
> $$
> \Rightarrow\ \arctan u - \frac{1}{2}\ln(1+u^2) = \ln|x| + C.
> $$

### 1.2.3 Integrating Factor

Find a function $a(x,y)$, s.t. $aP(x,y)\,dx + aQ(x,y)\,dy = 0$ is exact.

Then $\exists\ \Phi$ s.t. $d\Phi = aP\,dx + aQ\,dy$,

$$
\Rightarrow\ \frac{\partial(aP)}{\partial y} = \frac{\partial^2\Phi}{\partial x\,\partial y} = \frac{\partial(aQ)}{\partial x}.
$$

> **Lemma.**
> $P\,dx + Q\,dy = 0$ admits an integrating factor of the form $a(x)$ iff
> $$
> G = \frac{\dfrac{\partial P}{\partial y} - \dfrac{\partial Q}{\partial x}}{Q}
> $$
> is independent of $y$.
>
> In this case, $a(x) = e^{\int_{x_0}^{x} G(t)\,dt}$.
>
> Similarly, it admits an integrating factor of the form $a(y)$ iff
> $$
> H = \frac{\dfrac{\partial Q}{\partial x} - \dfrac{\partial P}{\partial y}}{P}
> $$
> is independent of $x$. In this case, $a(y) = e^{\int_{y_0}^{y} H(t)\,dt}$ is an integrating factor.

> **Eg.** $(3x^2y + 2xy + y^3)\,dx + (x^2 + y^2)\,dy = 0.$
>
> $$\frac{\partial P}{\partial y} = 3x^2 + 2x + 3y^2, \qquad \frac{\partial Q}{\partial x} = 2x, \qquad \frac{\dfrac{\partial P}{\partial y} - \dfrac{\partial Q}{\partial x}}{Q} = 3.$$
>
> Take $e^{3x}$ as integrating factor.

> **Eg.** Back to the homogeneous equation.
>
> $$x^n\bigl(M(1,u) + uN(1,u)\bigr)\,dx + x^{n+1}\,N(1,u)\,du = 0.$$
>
> Notice $\dfrac{1}{x^{n+1}\bigl(M(1,u) + uN(1,u)\bigr)} = \dfrac{1}{xM(x,y) + yN(x,y)}$; we guess this is an integrating factor, i.e. $\dfrac{M}{xM+yN}\,dx + \dfrac{N}{xM+yN}\,dy$ is exact.
>
> **Pf.** $\ \partial_y\Bigl(\dfrac{M}{xM+yN}\Bigr) - \partial_x\Bigl(\dfrac{N}{xM+yN}\Bigr)$
> $$
> = \frac{1}{(xM+yN)^2}\,\Bigl[\,N\,(xM_x + yM_y) - M\,(xN_x + yN_y)\Bigr] = 0. \qquad \square
> $$

### 1.2.4 First order equation

Consider $\dfrac{dy}{dx} + p(x)y - q(x) = 0$.

$$
\Rightarrow\ \bigl(p(x)y - q(x)\bigr)\,dx + dy = 0. \tag{*}
$$

Taking integrating factor $a(x) = e^{\int_{x_0}^{x} p(s)\,ds}$,

$$
e^{\int_{x_0}^{x} p(s)\,ds}\,\bigl(p(x)y - q(x)\bigr)\,dx + e^{\int_{x_0}^{x} p(s)\,ds}\,dy = 0,
$$

$$
\Rightarrow\ e^{\int_{x_0}^{x} p(s)\,ds}\cdot y - \int_{x_0}^{x} e^{\int_{x_0}^{t} p(s)\,ds}\,q(t)\,dt = C.
$$

$$
\Rightarrow\ y = e^{-\int_{x_0}^{x} p(s)\,ds}\ \Bigl(\,C + \int_{x_0}^{x} q(t)\,e^{\int_{x_0}^{t} p(s)\,ds}\,dt\,\Bigr).
$$

> **Prop.**
> $\forall\ y(x)$ solving $(*)$, $y(x)$ takes the form above.
>
> **Pf.** $\ \Bigl(y(x)\,e^{\int_{x_0}^{x} p(s)\,ds}\Bigr)' = e^{\int_{x_0}^{x} p(s)\,ds}\,\bigl(y'(x) + p(x)\,y(x)\bigr) = e^{\int_{x_0}^{x} p(s)\,ds}\cdot q(x). \qquad \square$

> **Lemma.**
> (1) For homogeneous $y' + p(x)y = 0$, solutions form a 1-dim vector space.
>
> (2) For the inhomogeneous equation, the general solution consists of two parts: one is the general solution to the homogeneous equation, the other is a special solution.
>
> (3) For the first order equation, the IVP has a unique solution.

> **Eg.** $\dfrac{dy}{dx} + ay = f(x)$, where $f(x+2\pi) = f(x)$, $x\in\mathbb{R}$.
> Find a $2\pi$-periodic solution of the equation.
>
> **Sol.** Claim: if we have a solution s.t. $y(0) = y(2\pi)$, then $y(x)$ is $2\pi$-periodic.
>
> Because $y(x)$ is a solution $\ \Rightarrow\ y(x+2\pi)$ is also a solution; then $z(x) = y(x+2\pi) - y(x)$ solves $z' + az = 0$ (from lemma), so $z(x) = e^{-ax}\,z(0)$.
>
> If $y(0) = y(2\pi)\ \Rightarrow\ z(0) = 0\ \Rightarrow\ z(x)\equiv 0\ \Rightarrow\ y(x+2\pi) = y(x),\ \forall x$.
>
> So we just solve the equation and make $y(0) = y(2\pi)$:
> $$
> y' = -ay + f(x) \quad\Rightarrow\quad y = e^{-ax}\,\Bigl(C + \int_0^{x} f(s)\,e^{as}\,ds\Bigr),
> $$
> $$
> y(0) = y(2\pi) \quad\Rightarrow\quad C = \frac{e^{-2\pi a}\int_0^{2\pi} f(x)\,e^{ax}\,dx}{1 - e^{-2\pi a}}.
> $$

### 1.2.5 First order ODE in implicit form

Consider $F(x, y', y) = 0$, labeled $(*)$.

> **Special Case.**
> If $y$ can be solved: $y = f(x, y')$. Let $p := \dfrac{dy}{dx}$.
>
> Then
> $$
> p = \frac{dy}{dx} = \frac{\partial f}{\partial x} + \frac{\partial f}{\partial p}\cdot\frac{dp}{dx}
> \ \Rightarrow\ \frac{\partial f}{\partial p}\,(x,p)\,\frac{dp}{dx} = p - \frac{\partial f}{\partial x}\,(x,p).
> $$
>
> If $p = p(x)$ is a solution, then $f(x, p(x))$ solves $(*)$.

> **Eg (Clairaut equation).** $\ y = xp + f(p)$, $\ p := \dfrac{dy}{dx}$
>
> **Sol.**
> $$
> \frac{dy}{dx} = p + x\,\frac{dp}{dx} + f'(p)\,\frac{dp}{dx}
> \ \Rightarrow\ \bigl(x + f'(p)\bigr)\,\frac{dp}{dx} = 0,
> $$
> $$
> \Rightarrow\ y = cx + f(c) \quad \text{or} \quad \begin{cases} x = -f'(p) \\ y = -f'(p)\,p + f(p) \end{cases} \quad (p \text{ as a parameter}).
> $$

**Method of parameter.** $F(x, y, p) = 0$. Take $x = x(u,v)$, $y = y(u,v)$, $p = p(u,v)$.

> **Eg.** $x = (y')^3 + y'$. See $p = y'$ as a parameter.
>
> $$
> x = p^3 + p, \qquad dy = p\,dx = p\,(3p^2+1)\,dp
> \ \Rightarrow\ \begin{cases} x = p^3 + p \\ y = \dfrac{3}{4}\,p^4 + \dfrac{1}{2}\,p^2 + C. \end{cases}
> $$

### 1.2.6 Other examples

> **Eg 1.** $\dfrac{dy}{dx} = f(x+y)$.
>
> $z = x + y(x)$, $\quad \dfrac{dz}{dx} = 1 + \dfrac{dy}{dx} = f(z)$.

> **Eg 2.** $\dfrac{dy}{dx} = f\Bigl(\dfrac{ax+by+c}{mx+ky+l}\Bigr)$
>
> Case 1. $c = 0$, $l = 0$. The equation is homogeneous of order 0.
>
> Case 2. $c\cdot l \neq 0$, $\ \Delta = \begin{vmatrix} a & b \\ m & k \end{vmatrix} \neq 0$.
>
> Then $\exists\ \widetilde{x} = x + x_0$, $\ \widetilde{y} = y + y_0$, s.t. $\ \dfrac{d\widetilde{y}}{d\widetilde{x}} = f\Bigl(\dfrac{a\widetilde{x} + b\widetilde{y}}{m\widetilde{x} + k\widetilde{y}}\Bigr)$.
>
> Case 3. $c\cdot l \neq 0$, $\ \Delta = 0$.
>
> Then $f\Bigl(\dfrac{ax+by+c}{mx+ky+l}\Bigr) = f\Bigl(\dfrac{ax+by+c}{\lambda(ax+by)+l}\Bigr)$.
>
> Taking $z = ax + by$, so we can separate variables.

> **Eg 3 (Bernoulli eq.).** $\ \dfrac{dy}{dx} + p(x)y = q(x)\,y^n$.
>
> $$
> \Rightarrow\ \frac{1}{y^n}\,\frac{dy}{dx} + p(x)\,y^{1-n} = q(x).
> $$
>
> $z = y^{1-n}(x)$, then $\ \dfrac{dz}{dx} = (1-n)\,\bigl(q(x) - p(x)\,z\bigr)$ — a 1st-order equation for $z(x)$.

> **Eg 4 (Riccati eq.).** $\ \dfrac{dy}{dx} = a(x)\,y^2 + b(x)\,y + c(x)$.
>
> **Lemma.** (1) If $\Phi(x)$ is a solution, then we can find all solutions.
>
> **Pf.** Assume $y(x) = \Phi(x) + u(x)$.
> $$
> y' = \Phi'(x) + u'(x) = a\,(\Phi+u)^2 + b\,(\Phi+u) + c
> = \Phi' + 2a\,\Phi\,u + au^2 + bu,
> $$
> $$
> \Rightarrow\ \frac{du}{dx} = (2a\,\Phi + b)\,u + au^2 \qquad \text{(Bernoulli eq.)}
> $$
>
> (2) If $\varphi_1, \varphi_2$ are two given solutions, then any solution $y(x)$ satisfies
> $$
> \frac{y-\varphi_1}{y-\varphi_2} = C\cdot\exp\Bigl(\int_{x_0}^{x} a(s)\,(\varphi_1-\varphi_2)(s)\,ds\Bigr).
> $$
>
> (3) If $\varphi_1, \varphi_2, \varphi_3$ are solutions, then
> $$
> \frac{y-\varphi_1}{y-\varphi_2}\ \Big/\ \frac{\varphi_3-\varphi_1}{\varphi_3-\varphi_2} = C.
> $$

> **Thm (Bernoulli \& Liouville).** $\ \dfrac{dy}{dx} = ay^2 + bx^m \quad (a, b, m\in\mathbb{R},\ a\neq 0)$
>
> This equation can be solved iff $\ m = 0,\ -2,\ \dfrac{-4k}{2k+1},\ \dfrac{-4k}{2k-1} \quad (k\in\mathbb{Z})$.
