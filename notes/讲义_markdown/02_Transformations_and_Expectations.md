---
layout: note
kind: note
title: "第 2 章　变换与期望（Transformations and Expectations）"
course: statistics
order: 2
date: 2026-10-01
permalink: /statistics/chap02.html
---

# 第 2 章　变换与期望（Transformations and Expectations）

> *“We want something more than mere theory and preaching now, though.”*
>
> 现在，我们想要的已不仅仅是纯粹的理论与说教了。
>
> ——歇洛克·福尔摩斯（《血字的研究》）

若我们能够用具有 cdf $$F_X(x)$$ 的随机变量 $$X$$ 为某现象建模，往往还会关心 $$X$$ 的函数的行为。本章研究一些技术，使我们能获得关于 $$X$$ 的函数（它们可能正是我们感兴趣的量）的信息；这些信息既可以非常完整（这些函数的分布），也可以较为粗略（平均行为）。

## 2.1 随机变量函数的分布（Distributions of Functions of a Random Variable）

设 $$X$$ 是具有 cdf $$F_X(x)$$ 的随机变量，则 $$X$$ 的任何函数（例如 $$g(X)$$）也是随机变量。$$g(X)$$ 本身常常就是我们关心的对象，记 $$Y = g(X)$$ 表示这个新的随机变量。由于 $$Y$$ 是 $$X$$ 的函数，我们可以用 $$X$$ 的概率行为来描述 $$Y$$ 的概率行为：对任意集合 $$A$$，

$$
P(Y \in A) = P\bigl( g(X) \in A \bigr),
$$

这表明 $$Y$$ 的分布由 $$F_X$$ 与 $$g$$ 决定。依 $$g$$ 的选取不同，有时可以得到该概率的易于处理的表达式。

形式地，若写 $$y = g(x)$$，则函数 $$g(x)$$ 定义了一个从 $$X$$ 的原样本空间 $$\mathcal{X}$$ 到新样本空间 $$\mathcal{Y}$$（随机变量 $$Y$$ 的样本空间）的映射，即

$$
g(x) : \mathcal{X} \to \mathcal{Y}.
$$

与 $$g$$ 相联系的是一个逆映射，记作 $$g^{-1}$$，它是从 $$\mathcal{Y}$$ 的子集到 $$\mathcal{X}$$ 的子集的映射，定义为

$$
g^{-1}(A) = \lbrace  x \in \mathcal{X} : g(x) \in A  \rbrace. \tag{2.1.1}
$$

注意映射 $$g^{-1}$$ 把集合映为集合，即 $$g^{-1}(A)$$ 是 $$\mathcal{X}$$ 中被 $$g(x)$$ 送入集合 $$A$$ 的那些点的全体。$$A$$ 可以是单点集，例如 $$A = \lbrace y \rbrace$$，此时

$$
g^{-1}(\lbrace y \rbrace) = \lbrace  x \in \mathcal{X} : g(x) = y  \rbrace.
$$

这种情况下我们常写 $$g^{-1}(y)$$ 代替 $$g^{-1}(\lbrace y \rbrace)$$。但 $$g^{-1}(y)$$ 仍可能是一个集合：若有多于一个 $$x$$ 使 $$g(x) = y$$。若只有一个 $$x$$ 使 $$g(x) = y$$，则 $$g^{-1}(y)$$ 是单点集 $$\lbrace x \rbrace$$，我们就写 $$g^{-1}(y) = x$$。现在若定义随机变量 $$Y = g(X)$$，则对任意集合 $$A \subset \mathcal{Y}$$，

$$
\begin{aligned}
P(Y \in A) &= P\bigl( g(X) \in A \bigr)\\
&= P\bigl( \lbrace  x \in \mathcal{X} : g(x) \in A  \rbrace \bigr)\\
&= P\bigl( X \in g^{-1}(A) \bigr).
\end{aligned} \tag{2.1.2}
$$

这就定义了 $$Y$$ 的概率分布。容易证明该概率分布满足柯尔莫哥洛夫公理。

若 $$X$$ 是离散随机变量，则 $$\mathcal{X}$$ 可数。$$Y = g(X)$$ 的样本空间 $$\mathcal{Y} = \lbrace y : y = g(x),\, x \in \mathcal{X} \rbrace$$ 也可数，故 $$Y$$ 也是离散随机变量。利用 (2.1.2)，$$Y$$ 的 pmf 为

$$
f_Y(y) = P(Y = y) = \sum_{x \in g^{-1}(y)} P(X = x) = \sum_{x \in g^{-1}(y)} f_X(x), \qquad y \in \mathcal{Y},
$$

而对 $$y \notin \mathcal{Y}$$ 有 $$f_Y(y) = 0$$。此时求 $$Y$$ 的 pmf 无非是对每个 $$y \in \mathcal{Y}$$ 找出 $$g^{-1}(y)$$，并把相应的概率求和。

> **例 2.1.1（二项变换）**
>
> 若离散随机变量 $$X$$ 的 pmf 形如
>
> $$
f_X(x) = P(X = x) = \binom{n}{x} p^x (1-p)^{n-x}, \qquad x = 0, 1, \ldots, n, \tag{2.1.3}
$$
>
> 其中 $$n$$ 为正整数，$$0 \leq p \leq 1$$，则称 $$X$$ 服从***二项分布***（binomial distribution）。像 $$n$$ 与 $$p$$ 这样可以取不同值、从而产生不同概率分布的量称为***参数***（parameters）。考虑随机变量 $$Y = g(X)$$，其中 $$g(x) = n - x$$，即 $$Y = n - X$$。这里 $$\mathcal{X} = \lbrace 0, 1, \ldots, n \rbrace$$，且 $$\mathcal{Y} = \lbrace y : y = g(x),\, x \in \mathcal{X} \rbrace = \lbrace 0, 1, \ldots, n \rbrace$$。对任意 $$y \in \mathcal{Y}$$，$$n - x = g(x) = y$$ 当且仅当 $$x = n - y$$。故 $$g^{-1}(y)$$ 是单点 $$x = n - y$$，于是
>
> $$
\begin{aligned}
f_Y(y) &= \sum_{x \in g^{-1}(y)} f_X(x) = f_X(n-y)\\
&= \binom{n}{n-y}\, p^{\,n-y} (1-p)^{\,n-(n-y)} \qquad （\text{由定义 1.2.17，} \tbinom{n}{y} = \tbinom{n}{n-y}）\\
&= \binom{n}{y}\, (1-p)^{y} p^{\,n-y}.
\end{aligned}
$$
>
> 因此 $$Y$$ 也服从二项分布，只是参数变为 $$n$$ 与 $$1 - p$$。

若 $$X$$ 与 $$Y$$ 都是连续随机变量，则在某些情形下可以用 $$X$$ 的 cdf、pdf 以及函数 $$g$$ 表出 $$Y$$ 的 cdf 与 pdf 的简单公式。本节余下部分讨论这些情形。

$$Y = g(X)$$ 的 cdf 为

$$
\begin{aligned}
F_Y(y) &= P(Y \leq y) = P\bigl( g(X) \leq y \bigr)\\
&= P\bigl( \lbrace  x \in \mathcal{X} : g(x) \leq y  \rbrace \bigr)\\
&= \int_{\lbrace x \in \mathcal{X} : g(x) \leq y \rbrace} f_X(x)\, dx.
\end{aligned} \tag{2.1.4}
$$

有时识别集合 $$\lbrace x \in \mathcal{X} : g(x) \leq y \rbrace$$ 并在其上积分 $$f_X(x)$$ 可能有困难，如下例所示。

> **例 2.1.2（均匀变换）**
>
> 设 $$X$$ 服从区间 $$(0, 2\pi)$$ 上的均匀分布，即
>
> $$
f_X(x) = \begin{cases} 1/(2\pi) & 0 < x < 2\pi,\\ 0 & \text{其他}. \end{cases}
$$
>
> 考虑 $$Y = \sin^2(X)$$。则（见图 2.1.1）
>
> $$
P(Y \leq y) = P(X \leq x_1) + P(x_2 \leq X \leq x_3) + P(X \geq x_4). \tag{2.1.5}
$$
>
> 由 $$\sin^2(x)$$ 的对称性以及 $$X$$ 服从均匀分布的事实，
>
> $$
P(X \leq x_1) = P(X \geq x_4) \quad\text{且}\quad P(x_2 \leq X \leq x_3) = 2 P(x_2 \leq X \leq \pi),
$$
>
> 于是
>
> $$
P(Y \leq y) = 2 P(X \leq x_1) + 2 P(x_2 \leq X \leq \pi), \tag{2.1.6}
$$
>
> 其中 $$x_1$$ 与 $$x_2$$ 是方程
>
> $$
\sin^2(x) = y, \qquad 0 < x < \pi
$$
>
> 的两个解。可见尽管这个例子情形看似简单，所得 $$Y$$ 的 cdf 表达式却并不简单。

![ch02_fig_2_1_1](fig/ch02_fig_2_1_1.png)

图 2.1.1　 例 2.1.2 的变换 $$y = \sin^2(x)$$ 的图像（原书 Figure 2.1.1）

做变换时，随时记牢随机变量的样本空间非常重要，否则极易产生混淆。从 $$X$$ 变换到 $$Y = g(X)$$ 时，最方便的取法是

$$
\mathcal{X} = \lbrace x : f_X(x) > 0 \rbrace \qquad\text{与}\qquad \mathcal{Y} = \lbrace y : y = g(x)\ \text{对某个}\ x \in \mathcal{X} \rbrace. \tag{2.1.7}
$$

随机变量 $$X$$ 的 pdf 仅在集合 $$\mathcal{X}$$ 上为正，在其余处为零。这样的集合称为分布的***支撑集***（support set），或通俗地称为分布的***支撑***（support）。这一术语同样适用于 pmf，或更一般地适用于任何非负函数。

处理单调函数 $$g(x)$$ 最容易。所谓单调，是指它满足下列两者之一：

$$
u > v \Rightarrow g(u) > g(v) \ \text{（递增）} \qquad\text{或}\qquad u < v \Rightarrow g(u) > g(v) \ \text{（递减）}.
$$

若变换 $$x \to g(x)$$ 单调，则它是从 $$\mathcal{X}$$ 到 $$\mathcal{Y}$$ 的一一（one-to-one）且映上（onto）的映射：每个 $$x$$ 只对应一个 $$y$$，每个 $$y$$ 至多来自一个 $$x$$（一一）；并且对按 (2.1.7) 定义的 $$\mathcal{Y}$$，每个 $$y \in \mathcal{Y}$$ 都存在 $$x \in \mathcal{X}$$ 使 $$g(x) = y$$（映上）。于是变换 $$g$$ 把 $$x$$ 与 $$y$$ 唯一配对。若 $$g$$ 单调，则 $$g^{-1}$$ 是单值的，即 $$g^{-1}(y) = x$$ 当且仅当 $$y = g(x)$$。

若 $$g$$ 递增，则

$$
\lbrace  x \in \mathcal{X} : g(x) \leq y  \rbrace = \bigl\lbrace  x \in \mathcal{X} : g^{-1}(g(x)) \leq g^{-1}(y) \bigr \rbrace = \bigl\lbrace  x \in \mathcal{X} : x \leq g^{-1}(y) \bigr \rbrace. \tag{2.1.8}
$$

若 $$g$$ 递减，则

$$
\lbrace  x \in \mathcal{X} : g(x) \leq y  \rbrace = \bigl\lbrace  x \in \mathcal{X} : g^{-1}(g(x)) \geq g^{-1}(y) \bigr \rbrace = \bigl\lbrace  x \in \mathcal{X} : x \geq g^{-1}(y) \bigr \rbrace. \tag{2.1.9}
$$

（画一张图即可说明递减情形不等号为何反向。）

若 $$g(x)$$ 是递增函数，则由 (2.1.4) 可写

$$
F_Y(y) = \int_{\lbrace x \in \mathcal{X} : x \leq g^{-1}(y) \rbrace} f_X(x)\, dx = \int_{-\infty}^{g^{-1}(y)} f_X(x)\, dx = F_X\bigl( g^{-1}(y) \bigr).
$$

若 $$g(x)$$ 是递减函数，则

$$
F_Y(y) = \int_{g^{-1}(y)}^{\infty} f_X(x)\, dx = 1 - F_X\bigl( g^{-1}(y) \bigr).
$$

第二个等式的推导用到 $$X$$ 的连续性。把这些结果总结为如下定理。

> **定理 2.1.3（单调变换的 cdf）**
>
> 设 $$X$$ 具有cdf $$F_X(x)$$，$$Y = g(X)$$，$$\mathcal{X}$$ 与 $$\mathcal{Y}$$ 按 (2.1.7) 定义。
>
> - a. 若 $$g$$ 是 $$\mathcal{X}$$ 上的递增函数，则对 $$y \in \mathcal{Y}$$ 有 $$F_Y(y) = F_X\bigl( g^{-1}(y) \bigr)$$；
>
> - b. 若 $$g$$ 是 $$\mathcal{X}$$ 上的递减函数且 $$X$$ 是连续随机变量，则对 $$y \in \mathcal{Y}$$ 有 $$F_Y(y) = 1 - F_X\bigl( g^{-1}(y) \bigr)$$。

> **例 2.1.4（均匀—指数关系——I）**
>
> 设 $$X \sim f_X(x) = 1$$（$$0 < x < 1$$），其余为 0，即 uniform$(0,1)$$ 分布。容易验证 $$F_X(x) = x$（$$0 < x < 1$$）。现做变换 $$Y = g(X) = -\log X$$。由于
>
> $$
\frac{d}{dx} g(x) = \frac{d}{dx}(-\log x) = -\frac{1}{x} < 0, \qquad 0 < x < 1,
$$
>
> $$g(x)$$ 是递减函数。当 $$x$$ 取遍 $$(0,1)$$ 时，$$-\log x$$ 取遍 $$(0, \infty)$$，即 $$\mathcal{Y} = (0, \infty)$$。对 $$y > 0$$，由 $$y = -\log x$$ 得 $$x = e^{-y}$$，故 $$g^{-1}(y) = e^{-y}$$。于是对 $$y > 0$$，
>
> $$
F_Y(y) = 1 - F_X\bigl( g^{-1}(y) \bigr) = 1 - F_X(e^{-y}) = 1 - e^{-y} \qquad （\text{因为}\ F_X(x) = x）.
$$
>
> 当然，对 $$y \leq 0$$ 有 $$F_Y(y) = 0$$。注意这里只需验证 $$g(x) = -\log x$$ 在 $$X$$ 的支撑 $$(0,1)$$ 上单调。

若 $$Y$$ 的 pdf 连续，可通过对 cdf 求导得到。结果由下面定理给出。

> **定理 2.1.5（单调变换的 pdf）**
>
> 设 $$X$$ 具有pdf $$f_X(x)$$，$$Y = g(X)$$，$$g$$ 为单调函数，$$\mathcal{X}$$ 与 $$\mathcal{Y}$$ 由 (2.1.7) 定义。设 $$f_X(x)$$ 在 $$\mathcal{X}$$ 上连续，且 $$g^{-1}(y)$$ 在 $$\mathcal{Y}$$ 上有连续导数。则 $$Y$$ 的 pdf 为
>
> $$
f_Y(y) = \begin{cases}
f_X\bigl( g^{-1}(y) \bigr)\, \Bigl\vert  \dfrac{d}{dy}\, g^{-1}(y) \Bigr\vert  & y \in \mathcal{Y},\\[8pt]
0 & \text{其他}.
\end{cases} \tag{2.1.10}
$$
>
> **证明**　由定理 2.1.3 及链式法则，
>
> $$
f_Y(y) = \frac{d}{dy} F_Y(y) = \begin{cases}
f_X\bigl( g^{-1}(y) \bigr)\, \dfrac{d}{dy}\, g^{-1}(y) & \text{若}\ g\ \text{递增},\\[8pt]
-\, f_X\bigl( g^{-1}(y) \bigr)\, \dfrac{d}{dy}\, g^{-1}(y) & \text{若}\ g\ \text{递减},
\end{cases}
$$
>
> 这正是 (2.1.10) 的紧凑写法。 ∎

> **例 2.1.6（逆伽马 pdf）**
>
> 设 $$f_X(x)$$ 是伽马 pdf
>
> $$
f(x) = \frac{1}{(n-1)!\, \beta^n}\, x^{n-1} e^{-x/\beta}, \qquad 0 < x < \infty,
$$
>
> 其中 $$\beta$$ 是正常数，$$n$$ 是正整数。设要求 $$g(X) = 1/X$$ 的 pdf。注意这里支撑集 $$\mathcal{X}$$ 与 $$\mathcal{Y}$$ 都是区间 $$(0, \infty)$$。令 $$y = g(x)$$，则 $$g^{-1}(y) = 1/y$$，且 $$\frac{d}{dy} g^{-1}(y) = -1/y^2$$。应用上述定理，对 $$y \in (0, \infty)$$，
>
> $$
\begin{aligned}
f_Y(y) &= f_X\bigl( g^{-1}(y) \bigr)\, \Bigl\vert  \frac{d}{dy}\, g^{-1}(y) \Bigr\vert \\
&= \frac{1}{(n-1)!\, \beta^n} \Bigl( \frac{1}{y} \Bigr)^{n-1} e^{-1/(\beta y)}\, \frac{1}{y^2}\\
&= \frac{1}{(n-1)!\, \beta^n}\, \Bigl( \frac{1}{y} \Bigr)^{n+1} e^{-1/(\beta y)},
\end{aligned}
$$
>
> 这是著名的***逆伽马 pdf***（inverted gamma pdf）的特例。

许多应用中，函数 $$g$$ 既非递增也非递减，上述结果不适用。但常见的情况是 $$g$$ 在某些区间上单调，这使我们仍能得到 $$Y = g(X)$$ 的表达式。（若 $$g$$ 在任何区间上都不单调，那就麻烦了。）

> **例 2.1.7（平方变换）**
>
> 设 $$X$$ 是连续随机变量。对 $$y > 0$$，$$Y = X^2$$ 的 cdf 为
>
> $$
F_Y(y) = P(Y \leq y) = P(X^2 \leq y) = P\bigl( -\sqrt{y} \leq X \leq \sqrt{y} \bigr).
$$
>
> 由于 $$X$$ 连续，可把左端点的等号去掉，得
>
> $$
\begin{aligned}
F_Y(y) &= P\bigl( -\sqrt{y} < X \leq \sqrt{y} \bigr)\\
&= P\bigl( X \leq \sqrt{y} \bigr) - P\bigl( X \leq -\sqrt{y} \bigr) = F_X\bigl( \sqrt{y} \bigr) - F_X\bigl( -\sqrt{y} \bigr).
\end{aligned}
$$
>
> 现在对 cdf 求导可得 $$Y$$ 的 pdf：
>
> $$
\begin{aligned}
f_Y(y) &= \frac{d}{dy} F_Y(y) = \frac{d}{dy} \Bigl[ F_X\bigl( \sqrt{y} \bigr) - F_X\bigl( -\sqrt{y} \bigr) \Bigr]\\
&= \frac{1}{2\sqrt{y}}\, f_X\bigl( \sqrt{y} \bigr) + \frac{1}{2\sqrt{y}}\, f_X\bigl( -\sqrt{y} \bigr),
\end{aligned}
$$
>
> 其中对 $$F_X(\sqrt{y})$$ 与 $$F_X(-\sqrt{y})$$ 求导用了链式法则。故
>
> $$
f_Y(y) = \frac{1}{2\sqrt{y}} \Bigl( f_X\bigl( \sqrt{y} \bigr) + f_X\bigl( -\sqrt{y} \bigr) \Bigr). \tag{2.1.11}
$$
>
> 注意 (2.1.11) 中 $$Y$$ 的 pdf 表示为两项之和，分别对应 $$g(x) = x^2$$ 单调的两个区间。一般情形也是如此。

> **定理 2.1.8（分段单调变换的 pdf）**
>
> 设 $$X$$ 具有pdf $$f_X(x)$$，$$Y = g(X)$$，样本空间 $$\mathcal{X}$$ 按 (2.1.7) 定义。设存在 $$\mathcal{X}$$ 的分割 $$A_0, A_1, \ldots, A_k$$，使得 $$P(X \in A_0) = 0$$ 且 $$f_X(x)$$ 在每个 $$A_i$$ 上连续。再设存在分别定义在 $$A_1, \ldots, A_k$$ 上的函数 $$g_1(x), \ldots, g_k(x)$$，满足
>
> - i. 对 $$x \in A_i$$，$$g(x) = g_i(x)$$；
>
> - ii. $$g_i(x)$$ 在 $$A_i$$ 上单调；
>
> - iii. 集合 $$\mathcal{Y}_i = \lbrace y : y = g_i(x)\ \text{对某个}\ x \in A_i \rbrace$$ 对每个 $$i = 1, \ldots, k$$ 相同；
>
> - iv. 对每个 $$i = 1, \ldots, k$$，$$g_i^{-1}(y)$$ 在 $$\mathcal{Y}$$ 上有连续导数。
>
>
> 则
>
> $$
f_Y(y) = \begin{cases}
\displaystyle\sum_{i=1}^{k} f_X\bigl( g_i^{-1}(y) \bigr)\, \Bigl\vert  \dfrac{d}{dy}\, g_i^{-1}(y) \Bigr\vert  & y \in \mathcal{Y},\\[10pt]
0 & \text{其他}.
\end{cases}
$$

定理 2.1.8 的要点在于：可以把 $$\mathcal{X}$$ 分成若干集合 $$A_1, \ldots, A_k$$，使 $$g(x)$$ 在每个 $$A_i$$ 上单调。“例外集”$$A_0$$ 可以忽略，因为 $$P(X \in A_0) = 0$$；它是一个技术性装置，例如用于处理区间的端点。需要强调的是，每个 $$g_i(x)$$ 都是从 $$A_i$$ 到 $$\mathcal{Y}$$ 上的一一变换；而且 $$g_i^{-1}(y)$$ 是从 $$\mathcal{Y}$$ 到 $$A_i$$ 上的一一函数：对 $$y \in \mathcal{Y}$$，$$g_i^{-1}(y)$$ 给出 $$A_i$$ 中唯一满足 $$g_i(x) = y$$ 的 $$x$$。（推广见习题 2.7。）

> **例 2.1.9（正态—卡方关系）**
>
> 设 $$X$$ 服从标准正态分布
>
> $$
f_X(x) = \frac{1}{\sqrt{2\pi}}\, e^{-x^2/2}, \qquad -\infty < x < \infty.
$$
>
> 考虑 $$Y = X^2$$。函数 $$g(x) = x^2$$ 在 $$(-\infty, 0)$$ 与 $$(0, \infty)$$ 上分别单调，集合 $$\mathcal{Y} = (0, \infty)$$。应用定理 2.1.8，取
>
> $$
\begin{aligned}
A_0 &= \lbrace 0 \rbrace;\\
A_1 &= (-\infty, 0), \qquad g_1(x) = x^2, \qquad g_1^{-1}(y) = -\sqrt{y};\\
A_2 &= (0, \infty), \qquad\ \ g_2(x) = x^2, \qquad g_2^{-1}(y) = \sqrt{y}.
\end{aligned}
$$
>
> $$Y$$ 的 pdf 为
>
> $$
\begin{aligned}
f_Y(y) &= \frac{1}{\sqrt{2\pi}}\, e^{-(-\sqrt{y})^2/2}\, \Bigl\vert  -\frac{1}{2\sqrt{y}} \Bigr\vert  + \frac{1}{\sqrt{2\pi}}\, e^{-(\sqrt{y})^2/2}\, \Bigl\vert  \frac{1}{2\sqrt{y}} \Bigr\vert \\
&= \frac{1}{\sqrt{2\pi}}\, \frac{1}{\sqrt{y}}\, e^{-y/2}, \qquad 0 < y < \infty.
\end{aligned}
$$
>
> 这个 pdf 今后会经常遇到：它是自由度为 1 的***卡方***（chi-squared）随机变量的 pdf。

本节最后介绍一个非常特殊却极为有用的变换。

> **定理 2.1.10（概率积分变换，Probability Integral Transformation）**
>
> 设 $$X$$ 具有连续 cdf $$F_X(x)$$，定义随机变量 $$Y = F_X(X)$$。则 $$Y$$ 在 $$(0,1)$$ 上均匀分布，即 $$P(Y \leq y) = y$$，$$0 < y < 1$$。

在证明该定理之前，先稍微离题，仔细考察 cdf $$F_X$$ 的逆 $$F_X^{-1}$$。若 $$F_X$$ 严格递增，则 $$F_X^{-1}$$ 由

$$
F_X^{-1}(y) = x \iff F_X(x) = y \tag{2.1.12}
$$

良定义。然而若 $$F_X$$ 在某区间上恒为常数，则 (2.1.12) 不能良定义 $$F_X^{-1}$$，如图 2.1.2 所示：任何满足 $$x_1 \leq x \leq x_2$$ 的 $$x$$ 都使 $$F_X(x) = y$$。

![ch02_fig_2_1_2](fig/ch02_fig_2_1_2.png)

图 2.1.2　 (a) $$F(x)$$ 严格递增；(b) $$F(x)$$ 非降（原书 Figure 2.1.2）

如下定义可以避免这一问题：对 $$0 < y < 1$$，

$$
F_X^{-1}(y) = \inf \lbrace  x : F_X(x) \geq y  \rbrace, \tag{2.1.13}
$$

该定义在 $$F_X$$ 非常数的情形与 (2.1.12) 一致，并且即使 $$F_X$$ 不是严格递增的也给出单值的 $$F_X^{-1}$$。按此定义，在图 2.1.2(b) 中 $$F_X^{-1}(y) = x_1$$。在 $$y$$ 值域的端点处 $$F_X^{-1}(y)$$ 也可定义：若对所有 $$x$$ 有 $$F_X(x) < 1$$，则 $$F_X^{-1}(1) = \infty$$；且对任何 $$F_X$$，$$F_X^{-1}(0) = -\infty$$。

> **定理 定理 2.1.10 的证明**
>
> 对 $$Y = F_X(X)$$，当 $$0 < y < 1$$ 时，
>
> $$
\begin{aligned}
P(Y \leq y) &= P\bigl( F_X(X) \leq y \bigr)\\
&= P\bigl( F_X^{-1}[F_X(X)] \leq F_X^{-1}(y) \bigr) \qquad （F_X^{-1}\ \text{递增}）\\
&= P\bigl( X \leq F_X^{-1}(y) \bigr) \qquad （\text{见下文讨论}）\\
&= F_X\bigl( F_X^{-1}(y) \bigr) \qquad （F_X\ \text{的定义}）\\
&= y. \qquad （F_X\ \text{的连续性}）
\end{aligned}
$$
>
> 在端点处：$$y \geq 1$$ 时 $$P(Y \leq y) = 1$$，$$y \leq 0$$ 时 $$P(Y \leq y) = 0$$。故 $$Y$$ 服从均匀分布。

等式

$$
P\bigl( F_X^{-1}(F_X(X)) \leq F_X^{-1}(y) \bigr) = P\bigl( X \leq F_X^{-1}(y) \bigr)
$$

背后的理由颇为微妙，值得再讨论。若 $$F_X$$ 严格递增，则确实有 $$F_X^{-1}(F_X(x)) = x$$（参见图 2.1.2(a)）。但若 $$F_X$$ 有平台段，则可能 $$F_X^{-1}(F_X(x)) \neq x$$。设 $$F_X$$ 如图 2.1.2(b)，$$x \in [x_1, x_2]$$，则对该区间内任何 $$x$$ 都有 $$F_X^{-1}(F_X(x)) = x_1$$。即便如此，概率等式仍成立，因为对任意 $$x \in [x_1, x_2]$$ 都有 $$P(X \leq x) = P(X \leq x_1)$$：cdf 的平台段表示概率为 0 的区域（$$P(x_1 < X \leq x) = F_X(x) - F_X(x_1) = 0$$）。

定理 2.1.10 的一个应用是从特定分布生成随机样本。若需要从具有 cdf $$F_X$$ 的总体生成观测 $$X$$，只需生成 $$0$$ 与 $$1$$ 之间的均匀随机数 $$U$$，再解方程 $$F_X(x) = u$$ 求 $$x$$ 即可。（对许多分布存在其他生成方法，计算时间更少，但此法因普适性而依然有用。）

## 2.2 期望（Expected Values）

随机变量的期望（expectation）就是它的平均值，这里的“平均”是按概率分布加权的平均。分布的期望可以视为一种中心度量，正如我们通常把平均视为中间值。按概率分布对随机变量的取值加权，我们希望得到一个能概括随机变量一次观测的典型值或期望值的数。

> **定义 2.2.1（期望）**
>
> 随机变量 $$g(X)$$ 的***期望值***（expected value）或***均值***（mean），记作 $$\mathrm{E} g(X)$$，定义为
>
> $$
\mathrm{E} g(X) = \begin{cases}
\displaystyle\int_{-\infty}^{\infty} g(x) f_X(x)\, dx & \text{若}\ X\ \text{连续},\\[10pt]
\displaystyle\sum_{x \in \mathcal{X}} g(x) f_X(x) = \sum_{x \in \mathcal{X}} g(x) P(X = x) & \text{若}\ X\ \text{离散},
\end{cases}
$$
>
> 前提是积分或级数存在。若 $$\mathrm{E}\vert g(X)\vert  = \infty$$，则称 $$\mathrm{E} g(X)$$ ***不存在***。（Ross (1988) 称之为“无意识统计学家定律”；我们并不觉得这好笑。）

> **例 2.2.2（指数分布的均值）**
>
> 设 $$X$$ 服从***指数分布***（exponential distribution）$$\mathrm{exponential}(\lambda)$$，即其 pdf 为
>
> $$
f_X(x) = \frac{1}{\lambda}\, e^{-x/\lambda}, \qquad 0 \leq x < \infty, \quad \lambda > 0.
$$
>
> 则 $$\mathrm{E} X$$ 为
>
> $$
\begin{aligned}
\mathrm{E} X &= \int_0^{\infty} x\, \frac{1}{\lambda}\, e^{-x/\lambda}\, dx\\
&= \Bigl[ -x e^{-x/\lambda} \Bigr]_0^{\infty} + \int_0^{\infty} e^{-x/\lambda}\, dx \qquad （\text{分部积分}）\\
&= \int_0^{\infty} e^{-x/\lambda}\, dx = \lambda.
\end{aligned}
$$

> **例 2.2.3（二项分布的均值）**
>
> 若 $$X$$ 服从二项分布，其 pmf 为
>
> $$
P(X = x) = \binom{n}{x} p^x (1-p)^{n-x}, \qquad x = 0, 1, \ldots, n,
$$
>
> 其中 $$n$$ 为正整数，$$0 \leq p \leq 1$$，且对每对固定的 $$n$$ 与 $$p$$，pmf 求和为 1。二项随机变量的期望为
>
> $$
\mathrm{E} X = \sum_{x=0}^{n} x \binom{n}{x} p^x (1-p)^{n-x} = \sum_{x=1}^{n} x \binom{n}{x} p^x (1-p)^{n-x}
$$
>
> （$$x = 0$$ 项为 0）。利用恒等式 $$x\binom{n}{x} = n\binom{n-1}{x-1}$$，得
>
> $$
\begin{aligned}
\mathrm{E} X &= \sum_{x=1}^{n} n \binom{n-1}{x-1} p^x (1-p)^{n-x}\\
&= \sum_{y=0}^{n-1} n \binom{n-1}{y} p^{y+1} (1-p)^{n-(y+1)} \qquad （\text{代入}\ y = x - 1）\\
&= np \sum_{y=0}^{n-1} \binom{n-1}{y} p^{y} (1-p)^{n-1-y}\\
&= np,
\end{aligned}
$$
>
> 最后一个和式必为 1，因为它是 $$\mathrm{binomial}(n-1, p)$$ 的 pmf 在其全部可能值上的和。

> **例 2.2.4（柯西分布的均值）**
>
> 期望值不存在的经典例子是***柯西随机变量***（Cauchy random variable），其 pdf 为
>
> $$
f_X(x) = \frac{1}{\pi}\, \frac{1}{1 + x^2}, \qquad -\infty < x < \infty.
$$
>
> 容易验证 $$\int_{-\infty}^{\infty} f_X(x)\, dx = 1$$，但 $$\mathrm{E}\vert X\vert  = \infty$$。写
>
> $$
\mathrm{E}\vert X\vert  = \int_{-\infty}^{\infty} \frac{\vert x\vert }{\pi}\, \frac{1}{1 + x^2}\, dx = \frac{2}{\pi} \int_0^{\infty} \frac{x}{1 + x^2}\, dx.
$$
>
> 对任意正数 $$M$$，
>
> $$
\int_0^{M} \frac{x}{1 + x^2}\, dx = \Bigl[ \frac{\log(1 + x^2)}{2} \Bigr]_0^{M} = \frac{\log(1 + M^2)}{2}.
$$
>
> 于是
>
> $$
\mathrm{E}\vert X\vert  = \lim_{M \to \infty} \frac{2}{\pi} \int_0^{M} \frac{x}{1 + x^2}\, dx = \lim_{M \to \infty} \frac{\log(1 + M^2)}{\pi} = \infty,
$$
>
> 故 $$\mathrm{E} X$$ 不存在。

取期望是一个线性运算：$$X$$ 的线性函数的期望可以方便地计算，因为对任意常数 $$a$$ 与 $$b$$，

$$
\mathrm{E}(aX + b) = a \mathrm{E} X + b. \tag{2.2.1}
$$

例如，若 $$X \sim \mathrm{binomial}(n, p)$$，$$\mathrm{E} X = np$$，则

$$
\mathrm{E}(X - np) = \mathrm{E} X - np = np - np = 0.
$$

事实上，期望算子具有许多可以减轻计算负担的性质，其中大多数来自积分或求和的性质，总结为下述定理。

> **定理 2.2.5（期望的运算性质）**
>
> 设 $$X$$ 为随机变量，$$a$$、$$b$$、$$c$$ 为常数。则对任何期望存在的函数 $$g_1(x)$$ 与 $$g_2(x)$$：
>
> - a. $$\mathrm{E}(a g_1(X) + b g_2(X) + c) = a \mathrm{E} g_1(X) + b \mathrm{E} g_2(X) + c$$；
>
> - b. 若对一切 $$x$$ 有 $$g_1(x) \geq 0$$，则 $$\mathrm{E} g_1(X) \geq 0$$；
>
> - c. 若对一切 $$x$$ 有 $$g_1(x) \geq g_2(x)$$，则 $$\mathrm{E} g_1(X) \geq \mathrm{E} g_2(X)$$；
>
> - d. 若对一切 $$x$$ 有 $$a \leq g_1(x) \leq b$$，则 $$a \leq \mathrm{E} g_1(X) \leq b$$。
>
>
> **证明**　只给出连续情形的细节，离散情形类似。由定义，
>
> $$
\begin{aligned}
\mathrm{E}\bigl( a g_1(X) + b g_2(X) + c \bigr) &= \int_{-\infty}^{\infty} \bigl( a g_1(x) + b g_2(x) + c \bigr) f_X(x)\, dx\\
&= \int_{-\infty}^{\infty} a g_1(x) f_X(x)\, dx + \int_{-\infty}^{\infty} b g_2(x) f_X(x)\, dx + \int_{-\infty}^{\infty} c f_X(x)\, dx,
\end{aligned}
$$
>
> 最后一步由积分的可加性。由于 $$a$$、$$b$$、$$c$$ 是常数，可以提到各自积分号之外，故
>
> $$
\mathrm{E}\bigl( a g_1(X) + b g_2(X) + c \bigr) = a \mathrm{E} g_1(X) + b \mathrm{E} g_2(X) + c,
$$
>
> (a) 得证。其余三条性质证法类似。 ∎

> **例 2.2.6（最小化距离）**
>
> 随机变量的期望还有一条性质，可以把它与“$$\mathrm{E} X$$ 是 $$X$$ 的一个好的猜测值”这一解释联系起来。
>
> 设我们用 $$(X - b)^2$$ 度量随机变量 $$X$$ 与常数 $$b$$ 之间的距离：$$b$$ 越接近 $$X$$，该量越小。现在可以确定使 $$\mathrm{E}(X - b)^2$$ 最小的 $$b$$，从而得到 $$X$$ 的好的预测值。（注意寻找使 $$(X - b)^2$$ 最小的 $$b$$ 没有意义，因为那将依赖于 $$X$$ 本身，作为 $$X$$ 的预测毫无用处。）
>
> 用微积分可以求 $$\mathrm{E}(X - b)^2$$ 的最小值，但有更简单的方法（基于微积分的证明见习题 2.19）。利用“$$\mathrm{E} X$$ 有其特殊之处”的信念，写
>
> $$
\begin{aligned}
\mathrm{E}(X - b)^2 &= \mathrm{E}\bigl( X - \mathrm{E} X + \mathrm{E} X - b \bigr)^2 \qquad （\text{加减}\ \mathrm{E} X，\text{不改变任何东西}）\\
&= \mathrm{E}\bigl( (X - \mathrm{E} X) + (\mathrm{E} X - b) \bigr)^2 \qquad （\text{合并项}）\\
&= \mathrm{E}(X - \mathrm{E} X)^2 + (\mathrm{E} X - b)^2 + 2 \mathrm{E}\bigl( (X - \mathrm{E} X)(\mathrm{E} X - b) \bigr),
\end{aligned}
$$
>
> 其中展开了平方。注意
>
> $$
\mathrm{E}\bigl( (X - \mathrm{E} X)(\mathrm{E} X - b) \bigr) = (\mathrm{E} X - b) \mathrm{E}(X - \mathrm{E} X) = 0,
$$
>
> 因为 $$(\mathrm{E} X - b)$$ 是常数可提到期望之外，而 $$\mathrm{E}(X - \mathrm{E} X) = \mathrm{E} X - \mathrm{E} X = 0$$。这意味着
>
> $$
\mathrm{E}(X - b)^2 = \mathrm{E}(X - \mathrm{E} X)^2 + (\mathrm{E} X - b)^2. \tag{2.2.2}
$$
>
> (2.2.2) 右端第一项不受我们控制，而第二项总是非负，且取 $$b = \mathrm{E} X$$ 时等于 0。因此
>
> $$
\min_b \mathrm{E}(X - b)^2 = \mathrm{E}(X - \mathrm{E} X)^2. \tag{2.2.3}
$$
>
> 关于中位数的类似结果见习题 2.18。

计算 $$X$$ 的非线性函数的期望时有两条路可走。由 $$\mathrm{E} g(X)$$ 的定义可以直接计算

$$
\mathrm{E} g(X) = \int_{-\infty}^{\infty} g(x) f_X(x)\, dx. \tag{2.2.4}
$$

但也可以先求 $$Y = g(X)$$ 的 pdf $$f_Y(y)$$，从而

$$
\mathrm{E} g(X) = \mathrm{E} Y = \int_{-\infty}^{\infty} y f_Y(y)\, dy. \tag{2.2.5}
$$

> **例 2.2.7（均匀—指数关系——II）**
>
> 设 $$X \sim \mathrm{uniform}(0,1)$$，即
>
> $$
f_X(x) = \begin{cases} 1 & 0 \leq x \leq 1,\\ 0 & \text{其他}, \end{cases}
$$
>
> 并定义新随机变量 $$g(X) = -\log X$$。则
>
> $$
\mathrm{E} g(X) = \mathrm{E}(-\log X) = \int_0^1 -\log x\, dx = \bigl[ x - x \log x \bigr]_0^1 = 1.
$$
>
> 另一方面，例 2.1.4 中已见 $$Y = -\log X$$ 的 cdf 为 $$1 - e^{-y}$$，从而 pdf 为 $$f_Y(y) = \frac{d}{dy}(1 - e^{-y}) = e^{-y}$$（$$0 < y < \infty$$），这是 $$\lambda = 1$$ 时指数 pdf 的特例。故由例 2.2.2，$$\mathrm{E} Y = 1$$。两条路殊途同归。

## 2.3 矩与矩母函数（Moments and Moment Generating Functions）

分布的各种矩（moments）是一类重要的期望。

> **定义 2.3.1（矩）**
>
> 对每个整数 $$n$$，$$X$$（或 $$F_X(x)$$）的***$$n$$ 阶矩***（nth moment）$$\mu_n'$$ 定义为
>
> $$
\mu_n' = \mathrm{E} X^n.
$$
>
> $$X$$ 的***$$n$$ 阶中心矩***（nth central moment）$$\mu_n$$ 定义为
>
> $$
\mu_n = \mathrm{E}(X - \mu)^n, \qquad \text{其中}\ \mu = \mu_1' = \mathrm{E} X.
$$

除随机变量的均值 $$\mathrm{E} X$$ 外，最重要的矩也许就是二阶中心矩，它更常用的名字是方差。

> **定义 2.3.2（方差与标准差）**
>
> 随机变量 $$X$$ 的***方差***（variance）是它的二阶中心矩：
>
> $$
\mathrm{Var} X = \mathrm{E}(X - \mathrm{E} X)^2.
$$
>
> $$\mathrm{Var} X$$ 的正平方根称为 $$X$$ 的***标准差***（standard deviation）。

方差给出分布围绕其均值的散布程度的度量。我们在例 2.2.6 中已看到，取 $$b = \mathrm{E} X$$ 时 $$\mathrm{E}(X-b)^2$$ 最小；现在考虑这个最小值的绝对大小。对方差的解释是：值越大，$$X$$ 越多变。在极端情形，若 $$\mathrm{Var} X = \mathrm{E}(X - \mathrm{E} X)^2 = 0$$，则 $$X$$ 以概率 1 等于 $$\mathrm{E} X$$，$$X$$ 没有变异。标准差有同样的定性解释：值小意味着 $$X$$ 很可能接近 $$\mathrm{E} X$$，值大意味着 $$X$$ 非常多变。标准差更易于解读，因为它的计量单位与原变量 $$X$$ 相同，而方差的单位是原单位的平方。

> **例 2.3.3（指数分布的方差）**
>
> 设 $$X$$ 服从例 2.2.2 定义的 $$\mathrm{exponential}(\lambda)$$ 分布。那里已算得 $$\mathrm{E} X = \lambda$$，现在计算方差：
>
> $$
\begin{aligned}
\mathrm{Var} X &= \mathrm{E}(X - \lambda)^2 = \int_0^{\infty} (x - \lambda)^2\, \frac{1}{\lambda}\, e^{-x/\lambda}\, dx\\
&= \int_0^{\infty} \bigl( x^2 - 2x\lambda + \lambda^2 \bigr)\, \frac{1}{\lambda}\, e^{-x/\lambda}\, dx.
\end{aligned}
$$
>
> 要完成积分，可以分别对每一项积分，对含 $$x$$ 与 $$x^2$$ 的项用分部积分。做完即得 $$\mathrm{Var} X = \lambda^2$$。

可见指数分布的方差与参数 $$\lambda$$ 直接相关。图 2.3.1 画出了几个不同 $$\lambda$$ 对应的指数分布。注意 $$\lambda$$ 越小，分布越集中于其均值附近。指数分布的方差随 $$\lambda$$ 变化的行为，是下述定理所总结的方差行为的一个特例。

![ch02_fig_2_3_1](fig/ch02_fig_2_3_1.png)

图 2.3.1　 $$\lambda = 1,\ \tfrac{1}{3},\ \tfrac{1}{5}$$ 的指数密度（原书 Figure 2.3.1）

> **定理 2.3.4（方差的线性变换性质）**
>
> 若 $$X$$ 是方差有限的随机变量，则对任意常数 $$a$$ 与 $$b$$，
>
> $$
\mathrm{Var}(aX + b) = a^2 \mathrm{Var} X.
$$
>
> **证明**　由定义，
>
> $$
\begin{aligned}
\mathrm{Var}(aX + b) &= \mathrm{E}\bigl( (aX + b) - \mathrm{E}(aX + b) \bigr)^2\\
&= \mathrm{E}\bigl( aX - a \mathrm{E} X \bigr)^2 \qquad （\mathrm{E}(aX+b) = a\mathrm{E} X + b）\\
&= a^2 \mathrm{E}(X - \mathrm{E} X)^2\\
&= a^2 \mathrm{Var} X.
\end{aligned}
$$
>
> ∎

有时使用方差的另一公式更为方便：

$$
\mathrm{Var} X = \mathrm{E} X^2 - (\mathrm{E} X)^2, \tag{2.3.1}
$$

它容易建立：注意 $$\mathrm{E} X$$ 是常数，故 $$\mathrm{E}(X\,\mathrm{E} X) = (\mathrm{E} X)(\mathrm{E} X) = (\mathrm{E} X)^2$$，于是

$$
\mathrm{Var} X = \mathrm{E}(X - \mathrm{E} X)^2 = \mathrm{E}\bigl[ X^2 - 2X\,\mathrm{E} X + (\mathrm{E} X)^2 \bigr] = \mathrm{E} X^2 - 2(\mathrm{E} X)^2 + (\mathrm{E} X)^2 = \mathrm{E} X^2 - (\mathrm{E} X)^2.
$$

下面用离散分布演示矩的计算。

> **例 2.3.5（二项分布的方差）**
>
> 设 $$X \sim \mathrm{binomial}(n, p)$$，即
>
> $$
P(X = x) = \binom{n}{x} p^x (1-p)^{n-x}, \qquad x = 0, 1, \ldots, n.
$$
>
> 前面已见 $$\mathrm{E} X = np$$。为计算 $$\mathrm{Var} X$$，先算 $$\mathrm{E} X^2$$：
>
> $$
\mathrm{E} X^2 = \sum_{x=0}^{n} x^2 \binom{n}{x} p^x (1-p)^{n-x}. \tag{2.3.2}
$$
>
> 为求这个级数的和，须先以类似例 2.2.3 的方式改造二项式系数。写
>
> $$
x^2 \binom{n}{x} = x\, \frac{n!}{(x-1)!\,(n-x)!} = x n \binom{n-1}{x-1}. \tag{2.3.3}
$$
>
> (2.3.2) 中对应 $$x = 0$$ 的项为零，用 (2.3.3) 得
>
> $$
\begin{aligned}
\mathrm{E} X^2 &= n \sum_{x=1}^{n} x \binom{n-1}{x-1} p^x (1-p)^{n-x}\\
&= n \sum_{y=0}^{n-1} (y+1) \binom{n-1}{y} p^{y+1} (1-p)^{n-1-y} \qquad （\text{令}\ y = x - 1）\\
&= np \sum_{y=0}^{n-1} y \binom{n-1}{y} p^{y} (1-p)^{n-1-y} + np \sum_{y=0}^{n-1} \binom{n-1}{y} p^{y} (1-p)^{n-1-y}.
\end{aligned}
$$
>
> 现在易见第一个和等于 $$(n-1)p$$（因为它是 $$\mathrm{binomial}(n-1, p)$$ 的均值），第二个和等于 1。故
>
> $$
\mathrm{E} X^2 = n(n-1) p^2 + np. \tag{2.3.4}
$$
>
> 用 (2.3.1) 得
>
> $$
\mathrm{Var} X = n(n-1) p^2 + np - (np)^2 = -np^2 + np = np(1-p).
$$

更高阶矩的计算方式类似，但数学处理往往相当繁琐。应用中有时关心 3 阶或 4 阶矩，但考察更高阶矩通常没有什么统计上的理由。

现在介绍与概率分布相联系的一个新函数：***矩母函数***（moment generating function，mgf）。顾名思义，mgf 可用于生成矩。实践中，很多情形直接计算矩比用 mgf 更容易。然而 mgf 的主要用途不在于生成矩，而在于帮助刻画（characterize）一个分布；运用得当，这一性质可以导出一些极其有力的结果。

> **定义 2.3.6（矩母函数）**
>
> 设 $$X$$ 是具有 cdf $$F_X$$ 的随机变量。$$X$$（或 $$F_X$$）的***矩母函数***（moment generating function，mgf），记作 $$M_X(t)$$，定义为
>
> $$
M_X(t) = \mathrm{E} e^{tX},
$$
>
> 前提是期望在 $$0$$ 的某个邻域内存在，即存在 $$h > 0$$，使得对 $$-h < t < h$$ 中的所有 $$t$$，$$\mathrm{E} e^{tX}$$ 存在。若期望在 0 的任何邻域内都不存在，则称矩母函数不存在。

更明确地，$$X$$ 的 mgf 可写为

$$
M_X(t) = \int_{-\infty}^{\infty} e^{tx} f_X(x)\, dx \qquad \text{（若}\ X\ \text{连续）}，
$$

或

$$
M_X(t) = \sum_{x} e^{tx} P(X = x) \qquad \text{（若}\ X\ \text{离散）}.
$$

mgf 如何生成矩极易看出，总结为下面的定理。

> **定理 2.3.7（用 mgf 生成矩）**
>
> 若 $$X$$ 有 mgf $$M_X(t)$$，则
>
> $$
\mathrm{E} X^n = M_X^{(n)}(0),
$$
>
> 其中定义
>
> $$
M_X^{(n)}(0) = \left. \frac{d^n}{dt^n} M_X(t) \right\vert _{t=0}.
$$
>
> 即 $$n$$ 阶矩等于 $$M_X(t)$$ 的 $$n$$ 阶导数在 $$t = 0$$ 处的值。
>
> **证明**　假设可以在积分号下求导（见 2.4 节），则
>
> $$
\frac{d}{dt} M_X(t) = \frac{d}{dt} \int_{-\infty}^{\infty} e^{tx} f_X(x)\, dx = \int_{-\infty}^{\infty} \Bigl( \frac{d}{dt} e^{tx} \Bigr) f_X(x)\, dx = \int_{-\infty}^{\infty} \bigl( x e^{tx} \bigr) f_X(x)\, dx = \mathrm{E} X e^{tX}.
$$
>
> 于是
>
> $$
\left. \frac{d}{dt} M_X(t) \right\vert _{t=0} = \left. \mathrm{E} X e^{tX} \right\vert _{t=0} = \mathrm{E} X.
$$
>
> 以完全类似的方式可以建立
>
> $$
\left. \frac{d^n}{dt^n} M_X(t) \right\vert _{t=0} = \left. \mathrm{E} X^n e^{tX} \right\vert _{t=0} = \mathrm{E} X^n.
$$
>
> ∎

> **例 2.3.8（伽马分布的 mgf）**
>
> 例 2.1.6 中我们遇到过伽马 pdf 的特例。一般地，伽马 pdf 为
>
> $$
f(x) = \frac{1}{\Gamma(\alpha) \beta^{\alpha}}\, x^{\alpha-1} e^{-x/\beta}, \qquad 0 < x < \infty, \quad \alpha > 0, \quad \beta > 0,
$$
>
> 其中 $$\Gamma(\alpha)$$ 是伽马函数，其部分性质见 3.3 节。mgf 为
>
> $$
\begin{aligned}
M_X(t) &= \frac{1}{\Gamma(\alpha) \beta^{\alpha}} \int_0^{\infty} e^{tx} x^{\alpha-1} e^{-x/\beta}\, dx\\
&= \frac{1}{\Gamma(\alpha) \beta^{\alpha}} \int_0^{\infty} x^{\alpha-1} e^{-(\frac{1}{\beta} - t)x}\, dx \qquad （2.3.5）\\
&= \frac{1}{\Gamma(\alpha) \beta^{\alpha}} \int_0^{\infty} x^{\alpha-1} e^{-x / \left( \frac{\beta}{1 - \beta t} \right)}\, dx.
\end{aligned}
$$
>
> 现在可以把 (2.3.5) 中的被积函数识别为另一个伽马 pdf 的***核***（kernel）。（函数的核指函数的主体部分，即忽略常数后剩下的部分。）利用如下事实：对任意正常数 $$a$$ 与 $$b$$，
>
> $$
f(x) = \frac{1}{\Gamma(a) b^a}\, x^{a-1} e^{-x/b}
$$
>
> 是 pdf，故
>
> $$
\int_0^{\infty} \frac{1}{\Gamma(a) b^a}\, x^{a-1} e^{-x/b}\, dx = 1,
$$
>
> 从而
>
> $$
\int_0^{\infty} x^{a-1} e^{-x/b}\, dx = \Gamma(a) b^a. \tag{2.3.6}
$$
>
> 将 (2.3.6) 应用于 (2.3.5)：
>
> $$
M_X(t) = \frac{1}{\Gamma(\alpha) \beta^{\alpha}}\, \Gamma(\alpha) \Bigl( \frac{\beta}{1 - \beta t} \Bigr)^{\alpha} = \Bigl( \frac{1}{1 - \beta t} \Bigr)^{\alpha}, \qquad t < \frac{1}{\beta}.
$$
>
> 若 $$t \geq 1/\beta$$，则 (2.3.5) 被积函数中的量 $$(1/\beta) - t$$ 非正，(2.3.6) 中的积分为无穷。因此伽马分布的 mgf 仅在 $$t < 1/\beta$$ 时存在。（3.3 节将进一步讨论伽马函数。）
>
> 伽马分布的均值为
>
> $$
\mathrm{E} X = \left. \frac{d}{dt} M_X(t) \right\vert _{t=0} = \left. \frac{\alpha \beta}{(1 - \beta t)^{\alpha + 1}} \right\vert _{t=0} = \alpha \beta.
$$
>
> 其他矩可类似计算。

> **例 2.3.9（二项分布的 mgf）**
>
> 作为计算矩母函数的第二个例子，考虑离散分布——二项分布。$$\mathrm{binomial}(n, p)$$ 的 pmf 见 (2.1.3)，故
>
> $$
M_X(t) = \sum_{x=0}^{n} e^{tx} \binom{n}{x} p^x (1-p)^{n-x} = \sum_{x=0}^{n} \binom{n}{x} \bigl( p e^t \bigr)^x (1-p)^{n-x}.
$$
>
> 由二项式公式（见定理 3.2.2）
>
> $$
\sum_{x=0}^{n} \binom{n}{x} u^x v^{n-x} = (u + v)^n, \tag{2.3.7}
$$
>
> 取 $$u = pe^t$$，$$v = 1 - p$$，即得
>
> $$
M_X(t) = \bigl[ p e^t + (1 - p) \bigr]^n.
$$

![ch02_fig_2_3_2](fig/ch02_fig_2_3_2.png)

图 2.3.2　 具有相同矩的两个 pdf：$$f_1(x) = \frac{1}{\sqrt{2\pi} x} e^{-(\log x)^2/2}$$ 与 $$f_2(x) = f_1(x)[1 + \sin(2\pi \log x)]$$（原书 Figure 2.3.2）

如前所述，矩母函数的主要用处不在于生成矩，而在于：很多情形下，矩母函数可以刻画一个分布。然而用矩来刻画分布存在一些技术困难，下面就来考察。

若 mgf 存在，它刻画了无穷多矩的集合。自然的问题是：刻画无穷矩集是否唯一地确定分布函数？遗憾的是，答案是否定的：仅有矩集不足以唯一确定分布，因为可能存在两个不同的随机变量具有相同的矩。

> **例 2.3.10（矩不唯一）**
>
> 考虑两个 pdf
>
> $$
\begin{aligned}
f_1(x) &= \frac{1}{\sqrt{2\pi}\, x}\, e^{-(\log x)^2/2}, \qquad 0 \leq x < \infty,\\
f_2(x) &= f_1(x) \bigl[ 1 + \sin(2\pi \log x) \bigr], \qquad 0 \leq x < \infty.
\end{aligned}
$$
>
> （pdf $$f_1$$ 是对数正态 pdf 的特例。）
>
> 可以证明，若 $$X_1 \sim f_1(x)$$，则
>
> $$
\mathrm{E} X_1^r = e^{r^2/2}, \qquad r = 0, 1, \ldots,
$$
>
> 故 $$X_1$$ 拥有全部各阶矩。现在设 $$X_2 \sim f_2(x)$$，则
>
> $$
\mathrm{E} X_2^r = \int_0^{\infty} x^r f_1(x) \bigl[ 1 + \sin(2\pi \log x) \bigr]\, dx = \mathrm{E} X_1^r + \int_0^{\infty} x^r f_1(x) \sin(2\pi \log x)\, dx.
$$
>
> 然而变换 $$y = \log x - r$$ 表明最后一个积分是一个奇函数在 $$(-\infty, \infty)$$ 上的积分，故对 $$r = 0, 1, \ldots$$ 都等于 0。于是尽管 $$X_1$$ 与 $$X_2$$ 的 pdf 不同，它们对所有 $$r$$ 的矩都相同。两个 pdf 绘于图 2.3.2。
>
> 细节见习题 2.35；关于 mgf 与分布的更多内容另见习题 2.34、2.36 与 2.37。

若随机变量的支撑有界，矩不唯一的问题就不会发生：此时无穷矩序列确实唯一确定分布（例如见 Billingsley 1995, Section 30）。而且，若 mgf 在 0 的某邻域内存在，则无论支撑如何，分布都被唯一确定。因此“所有矩都存在”并不等价于“矩母函数存在”。下面的定理说明分布可以如何被刻画。

> **定理 2.3.11（用矩或 mgf 刻画分布）**
>
> 设 $$F_X(x)$$ 与 $$F_Y(y)$$ 是所有矩都存在的两个 cdf。
>
> - a. 若 $$X$$ 与 $$Y$$ 的支撑有界，则对一切 $$u$$ 有 $$F_X(u) = F_Y(u)$$ 当且仅当对一切整数 $$r = 0, 1, 2, \ldots$$ 有 $$\mathrm{E} X^r = \mathrm{E} Y^r$$；
>
> - b. 若两者的矩母函数存在，且在 0 的某个邻域内 $$M_X(t) = M_Y(t)$$，则对一切 $$u$$ 有 $$F_X(u) = F_Y(u)$$。

下面处理收敛的 mgf 序列的定理不再单独讨论有界支撑情形。注意，若极限 mgf 在 0 的邻域内存在，唯一性假设自动满足（杂记 2.6.1）。

> **定理 2.3.12（mgf 的收敛，Convergence of MGFs）**
>
> 设 $$\lbrace X_i,\ i = 1, 2, \ldots \rbrace$$ 是一列随机变量，各有 mgf $$M_{X_i}(t)$$。进一步设在 0 的某邻域内的所有 $$t$$ 处
>
> $$
\lim_{i \to \infty} M_{X_i}(t) = M_X(t),
$$
>
> 且 $$M_X(t)$$ 是某个 mgf。则存在唯一的 cdf $$F_X$$，其矩由 $$M_X(t)$$ 确定，并且在 $$F_X(x)$$ 的每个连续点 $$x$$ 处，
>
> $$
\lim_{i \to \infty} F_{X_i}(x) = F_X(x).
$$
>
> 也就是说，在 $$\vert t\vert  < h$$ 上 mgf 收敛到 mgf 蕴含 cdf 收敛。

定理 2.3.11 与 2.3.12 的证明依赖拉普拉斯变换（Laplace transform）理论（经典文献为 Widder (1946)；Feller (1971) 也有全面论述）。$$M_X(t)$$ 的定义式

$$
M_X(t) = \int_{-\infty}^{\infty} e^{tx} f_X(x)\, dx \tag{2.3.8}
$$

定义了一个拉普拉斯变换（$$M_X(t)$$ 是 $$f_X(x)$$ 的拉普拉斯变换）。拉普拉斯变换的关键性质是唯一性：若 (2.3.8) 对所有 $$\vert t\vert  < h$$（$$h$$ 为某正数）成立，则给定 $$M_X(t)$$，满足 (2.3.8) 的函数 $$f_X(x)$$ 只有一个。有了这一事实，前述两个定理就相当合理了。虽然它们的严格证明并未超出本书范围，但证明偏技术性且无助于理解，故略去。

矩序列可能不唯一这件事很令人烦恼：若我们证明了矩序列收敛，并不能形式地推出随机变量收敛；要推出，须先验证矩序列的唯一性——这通常是件可怕的工作（杂记 2.6.1）。但如果 mgf 序列在 0 的邻域内收敛，则随机变量收敛。因此可以把 mgf 的收敛视为随机变量序列收敛的充分而非必要条件。

> **例 2.3.13（泊松近似）**
>
> 初等统计课程通常讲授这样一种近似：二项概率（见例 2.3.5）可以用更容易计算的泊松（Poisson）概率来近似。二项分布由两个量 $$n$$ 与 $$p$$ 刻画。教科书上说，泊松近似“当 $$n$$ 大而 $$np$$ 小”时有效，有时还给出经验法则。
>
> $$\mathrm{Poisson}(\lambda)$$ 的 pmf 为
>
> $$
P(X = x) = \frac{e^{-\lambda} \lambda^x}{x!}, \qquad x = 0, 1, 2, \ldots,
$$
>
> 其中 $$\lambda$$ 为正常数。近似断言：若 $$X \sim \mathrm{binomial}(n, p)$$ 且 $$Y \sim \mathrm{Poisson}(\lambda)$$，$$\lambda = np$$，则对大的 $$n$$ 与小的 $$np$$ 有
>
> $$
P(X = x) \approx P(Y = x). \tag{2.3.9}
$$
>
> 下面证明 mgf 收敛，从而为该近似提供依据。回顾
>
> $$
M_X(t) = \bigl[ p e^t + (1 - p) \bigr]^n. \tag{2.3.10}
$$
>
> 对 $$\mathrm{Poisson}(\lambda)$$ 分布可算得（见习题 2.33）
>
> $$
M_Y(t) = e^{\lambda (e^t - 1)}.
$$
>
> 若令 $$p = \lambda / n$$，则当 $$n \to \infty$$ 时 $$M_X(t) \to M_Y(t)$$；于是 (2.3.9) 近似的有效性可由定理 2.3.12 得到。
>
> 为此先离题提一个重要的极限结果，它在统计学中应用极广。其证明可在许多标准微积分教科书中找到。

> **引理 2.3.14（e 的极限形式）**
>
> 设数列 $$a_1, a_2, \ldots$$ 收敛到 $$a$$，即 $$\lim_{n \to \infty} a_n = a$$。则
>
> $$
\lim_{n \to \infty} \Bigl( 1 + \frac{a_n}{n} \Bigr)^{n} = e^{a}.
$$

回到例子。我们有

$$
M_X(t) = \bigl[ p e^t + (1-p) \bigr]^n = \Bigl[ 1 + (e^t - 1)\frac{np}{n} \Bigr]^{n} = \Bigl[ 1 + (e^t - 1)\frac{\lambda}{n} \Bigr]^{n},
$$

因为 $$\lambda = np$$。令 $$a_n = a = (e^t - 1)\lambda$$，应用引理 2.3.14 得

$$
\lim_{n \to \infty} M_X(t) = e^{\lambda (e^t - 1)} = M_Y(t),
$$

即泊松分布的矩母函数。

即使 $$p$$ 与 $$n$$ 只是中等大小，泊松近似也可能相当好。图 2.3.3 展示了一条二项质量函数及其泊松近似（$$\lambda = np$$），近似效果令人满意。

![ch02_fig_2_3_3](fig/ch02_fig_2_3_3.png)

图 2.3.3　 泊松（虚线）对二项（实线）的近似，$$n = 15$$，$$p = 0.3$$（原书 Figure 2.3.3）

本节最后给出关于 mgf 的一个有用结果。

> **定理 2.3.15（线性变换的 mgf）**
>
> 对任意常数 $$a$$ 与 $$b$$，随机变量 $$aX + b$$ 的 mgf 为
>
> $$
M_{aX+b}(t) = e^{bt} M_X(at).
$$
>
> **证明**　由定义，
>
> $$
\begin{aligned}
M_{aX+b}(t) &= \mathrm{E}\bigl( e^{(aX+b)t} \bigr)\\
&= \mathrm{E}\bigl( e^{(aX)t}\, e^{bt} \bigr) \qquad （\text{指数运算性质}）\\
&= e^{bt}\, \mathrm{E}\bigl( e^{(at)X} \bigr) \qquad （e^{bt}\ \text{为常数}）\\
&= e^{bt}\, M_X(at). \qquad （\text{mgf 的定义}）
\end{aligned}
$$
>
> 定理得证。 ∎

## 2.4 在积分号下求导（Differentiating under an Integral Sign）

上一节我们遇到过希望交换积分与求导次序的情形。这种情形在理论统计中经常出现。本节的目的在于刻画这一操作何时合法；同时也会讨论求导与求和次序的交换。

这些条件大多可以用标准微积分定理建立，详细证明在多数微积分教科书中都能找到，故此处不给出详细证明。

我们首先要建立的是如下量的计算方法：

$$
\frac{d}{d\theta} \int_{a(\theta)}^{b(\theta)} f(x, \theta)\, dx, \tag{2.4.1}
$$

其中 $$-\infty < a(\theta), b(\theta) < \infty$$ 对一切 $$\theta$$ 成立。微分 (2.4.1) 的法则称为***莱布尼茨法则***（Leibnitz's Rule），它是微积分基本定理与链式法则的应用。

> **定理 2.4.1（莱布尼茨法则）**
>
> 若 $$f(x, \theta)$$、$$a(\theta)$$ 与 $$b(\theta)$$ 都对 $$\theta$$ 可微，则
>
> $$
\frac{d}{d\theta} \int_{a(\theta)}^{b(\theta)} f(x, \theta)\, dx = f\bigl( b(\theta), \theta \bigr)\, \frac{d}{d\theta} b(\theta) - f\bigl( a(\theta), \theta \bigr)\, \frac{d}{d\theta} a(\theta) + \int_{a(\theta)}^{b(\theta)} \frac{\partial}{\partial \theta} f(x, \theta)\, dx.
$$

注意若 $$a(\theta)$$ 与 $$b(\theta)$$ 为常数，则得到莱布尼茨法则的特例：

$$
\frac{d}{d\theta} \int_{a}^{b} f(x, \theta)\, dx = \int_{a}^{b} \frac{\partial}{\partial \theta} f(x, \theta)\, dx.
$$

因此一般地，可微函数在有限区间上的积分求导不成问题；但若积分区间无穷，则可能出现问题。

注意上式中导数与积分的交换把偏导数与常导数等同起来。形式上理应如此：左端只是 $$\theta$$ 的函数，而右端被积函数同时依赖 $$\theta$$ 与 $$x$$。

交换求导与积分的次序是否合理，实质上是极限与积分能否交换的问题，因为导数是一种特殊的极限。回顾若 $$f(x, \theta)$$ 可微，则

$$
\frac{\partial}{\partial \theta} f(x, \theta) = \lim_{\delta \to 0} \frac{f(x, \theta + \delta) - f(x, \theta)}{\delta},
$$

于是

$$
\int_{-\infty}^{\infty} \frac{\partial}{\partial \theta} f(x, \theta)\, dx = \int_{-\infty}^{\infty} \Bigl[ \lim_{\delta \to 0} \frac{f(x, \theta + \delta) - f(x, \theta)}{\delta} \Bigr]\, dx,
$$

而

$$
\frac{d}{d\theta} \int_{-\infty}^{\infty} f(x, \theta)\, dx = \lim_{\delta \to 0} \int_{-\infty}^{\infty} \frac{f(x, \theta + \delta) - f(x, \theta)}{\delta}\, dx.
$$

因此，只要能论证极限与积分次序可以交换，在积分号下求导就合理。遗憾的是，一般性地处理这一问题需要用到测度论，本书不作介绍；但可以陈述一些重要结果的内容与结论。以下定理都是勒贝格控制收敛定理（Lebesgue's Dominated Convergence Theorem）的推论（例如见 Rudin (1976)）。

> **定理 2.4.2（极限与积分交换的控制条件）**
>
> 设函数 $$h(x, y)$$ 在 $$y_0$$ 处对每个 $$x$$ 连续，且存在函数 $$g(x)$$ 满足
>
> - i. 对一切 $$x$$ 与 $$y$$，$$\vert h(x, y)\vert  \leq g(x)$$；
>
> - ii. $$\int_{-\infty}^{\infty} g(x)\, dx < \infty$$。
>
>
> 则
>
> $$
\lim_{y \to y_0} \int_{-\infty}^{\infty} h(x, y)\, dx = \int_{-\infty}^{\infty} \lim_{y \to y_0} h(x, y)\, dx.
$$

该定理的关键条件是存在积分有限的控制函数 $$g(x)$$，它保证积分不会表现得太糟糕。现在把该定理应用于我们关心的情形：把 $$h(x,y)$$ 取为差商 $$\bigl( f(x, \theta + \delta) - f(x, \theta) \bigr) / \delta$$。

> **定理 2.4.3（积分号下求导的充分条件）**
>
> 设 $$f(x, \theta)$$ 在 $$\theta = \theta_0$$ 处可微，即对每个 $$x$$，
>
> $$
\lim_{\delta \to 0} \frac{f(x, \theta_0 + \delta) - f(x, \theta_0)}{\delta} = \left. \frac{\partial}{\partial \theta} f(x, \theta) \right\vert _{\theta = \theta_0}
$$
>
> 存在，且存在函数 $$g(x, \theta_0)$$ 与常数 $$\delta_0 > 0$$ 使得
>
> - i. 对一切 $$x$$ 与 $$\vert \delta\vert  \leq \delta_0$$，$$\Bigl\vert  \dfrac{f(x, \theta_0 + \delta) - f(x, \theta_0)}{\delta} \Bigr\vert  \leq g(x, \theta_0)$$；
>
> - ii. $$\displaystyle\int_{-\infty}^{\infty} g(x, \theta_0)\, dx < \infty$$。
>
>
> 则
>
> $$
\left. \frac{d}{d\theta} \int_{-\infty}^{\infty} f(x, \theta)\, dx \right\vert _{\theta = \theta_0} = \int_{-\infty}^{\infty} \left. \frac{\partial}{\partial \theta} f(x, \theta) \right\vert _{\theta = \theta_0} dx. \tag{2.4.2}
$$

条件 (i) 与所谓的利普希茨条件（Lipschitz condition）类似，后者是对函数光滑性的约束。这里的条件 (i) 实际上是对一阶导数变差的界；其他光滑性约束可以用常数（而非函数 $$g$$）来界住这种变差，或对 $$f$$ 的二阶导数的变差施加界。

定理 2.4.3 的结论略显繁琐，但重要的是要认识到：虽然我们似乎把 $$\theta$$ 当作变量，定理的陈述是针对***一个*** $$\theta$$ 值的。也就是说，对每个使 $$f(x, \theta)$$ 在 $$\theta_0$$ 处可微且满足条件 (i)(ii) 的 $$\theta_0$$，积分与求导的次序都可以交换。通常不刻意区分 $$\theta$$ 与 $$\theta_0$$，而把 (2.4.2) 写成

$$
\frac{d}{d\theta} \int_{-\infty}^{\infty} f(x, \theta)\, dx = \int_{-\infty}^{\infty} \frac{\partial}{\partial \theta} f(x, \theta)\, dx. \tag{2.4.3}
$$

典型情形是 $$f(x, \theta)$$ 在一切 $$\theta$$ 处可微，而不仅是某一个值。此时定理 2.4.3 的条件 (i) 可以换成另一个往往更易验证的条件。由微分中值定理，对固定的 $$x$$ 与 $$\theta_0$$，以及 $$\vert \delta\vert  \leq \delta_0$$，

$$
\frac{f(x, \theta_0 + \delta) - f(x, \theta_0)}{\delta} = \left. \frac{\partial}{\partial \theta} f(x, \theta) \right\vert _{\theta = \theta_0 + \delta^{*}(x)}
$$

对某个满足 $$\vert \delta^{*}(x)\vert  \leq \delta_0$$ 的数 $$\delta^{*}(x)$$ 成立。因此，若能找到同时满足条件 (ii) 与

$$
\left. \Bigl\vert  \frac{\partial}{\partial \theta} f(x, \theta) \Bigr\vert  \right\vert _{\theta = \theta'} \leq g(x, \theta) \qquad \text{对一切满足 } \vert \theta' - \theta\vert  \leq \delta_0 \text{ 的 } \theta', \tag{2.4.4}
$$

的 $$g(x, \theta)$$，则条件 (i) 成立。注意 (2.4.4) 中的 $$\delta_0$$ 隐式地依赖于 $$\theta$$（定理 2.4.3 中也是如此）；这是允许的，因为定理逐个 $$\theta$$ 值地应用。由 (2.4.4) 得到下述推论。

> **推论 2.4.4（积分号下求导的常用判据）**
>
> 设 $$f(x, \theta)$$ 对 $$\theta$$ 可微，且存在函数 $$g(x, \theta)$$ 使 (2.4.4) 成立且 $$\int_{-\infty}^{\infty} g(x, \theta)\, dx < \infty$$。则 (2.4.3) 成立。

注意定理 2.4.3 的条件 (i) 与 (2.4.4) 都对被界函数施加了某种一致性（uniformity）要求；一般而言，导数与积分交换之前总需要某种一致性。

> **例 2.4.5（交换积分与求导——I）**
>
> 设 $$X$$ 服从 $$\mathrm{exponential}(\lambda)$$ 分布，$$f(x) = (1/\lambda) e^{-x/\lambda}$$（$$0 < x < \infty$$），要计算
>
> $$
\frac{d}{d\lambda} \mathrm{E} X^n = \frac{d}{d\lambda} \int_0^{\infty} x^n \Bigl( \frac{1}{\lambda} \Bigr) e^{-x/\lambda}\, dx, \tag{2.4.5}
$$
>
> 其中 $$n > 0$$ 为整数。若能把求导移入积分号内，则有
>
> $$
\begin{aligned}
\frac{d}{d\lambda} \mathrm{E} X^n &= \int_0^{\infty} \frac{\partial}{\partial \lambda} \Bigl[ x^n \Bigl( \frac{1}{\lambda} \Bigr) e^{-x/\lambda} \Bigr]\, dx\\
&= \int_0^{\infty} \frac{x^n}{\lambda} \Bigl( \frac{x}{\lambda^2} - \frac{1}{\lambda} \Bigr) e^{-x/\lambda}\, dx \qquad （2.4.6）\\
&= \frac{1}{\lambda^2} \mathrm{E} X^{n+1} - \frac{1}{\lambda} \mathrm{E} X^n.
\end{aligned}
$$
>
> 为论证交换积分与求导的合理性，对 $$x^n (1/\lambda) e^{-x/\lambda}$$ 的导数加以控制。现在
>
> $$
\left\vert  \frac{\partial}{\partial \lambda}\, \frac{x^n e^{-x/\lambda}}{\lambda} \right\vert _{\lambda = \lambda'} = \Bigl\vert  \frac{x^n e^{-x/\lambda'}}{\lambda'^2} \Bigr\vert  \cdot \Bigl\vert  \frac{x}{\lambda'} - 1 \Bigr\vert  \leq \frac{x^n e^{-x/\lambda'}}{\lambda'^2} \Bigl( \frac{x}{\lambda'} + 1 \Bigr) \qquad （\text{因为}\ \lambda' x > 0）.
$$
>
> 取满足 $$0 < \delta_0 < \lambda$$ 的常数 $$\delta_0$$，令
>
> $$
g(x, \lambda) = \frac{x^n e^{-x/(\lambda + \delta_0)}}{(\lambda - \delta_0)^2} \Bigl( \frac{x}{\lambda - \delta_0} + 1 \Bigr).
$$
>
> 于是对一切满足 $$\vert \lambda' - \lambda\vert  \leq \delta_0$$ 的 $$\lambda'$$，
>
> $$
\left\vert  \frac{\partial}{\partial \lambda}\, \frac{x^n e^{-x/\lambda}}{\lambda} \right\vert _{\lambda = \lambda'} \leq g(x, \lambda).
$$
>
> 由于指数分布拥有全部各阶矩，只要 $$\lambda - \delta_0 > 0$$ 就有 $$\int_0^{\infty} g(x, \lambda)\, dx < \infty$$（原文积分限 $$-\infty$$ 到 $$\infty$$，但 $$g$$ 在负半轴为零），故积分与求导的交换是合理的。

上面就指数分布说明的性质对一大类密度成立，见 3.4 节。

注意 (2.4.6) 给出了指数分布矩的一个递推关系：

$$
\mathrm{E} X^{n+1} = \lambda^2\, \frac{d}{d\lambda} \mathrm{E} X^n + \lambda\, \mathrm{E} X^n, \tag{2.4.7}
$$

使第 $$n+1$$ 阶矩的计算相对容易。这类关系对其他分布也存在。特别地，若 $$X$$ 服从均值 $$\mu$$、方差 1 的正态分布，pdf 为 $$f(x) = (1/\sqrt{2\pi}) e^{-(x-\mu)^2/2}$$，则

$$
\mathrm{E} X^{n+1} = \mu\, \mathrm{E} X^n - \frac{d}{d\mu} \mathrm{E} X^n.
$$

下面再演示一次求导与积分的交换，这次涉及矩母函数。

> **例 2.4.6（交换积分与求导——II）**
>
> 再设 $$X$$ 服从均值 $$\mu$$、方差 1 的正态分布，考虑 $$X$$ 的 mgf
>
> $$
M_X(t) = \mathrm{E} e^{tX} = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} e^{tx}\, e^{-(x-\mu)^2/2}\, dx.
$$
>
> 2.3 节曾说明可以通过对 $$M_X(t)$$ 求导来计算矩，且在积分号下求导是合理的：
>
> $$
\frac{d}{dt} M_X(t) = \frac{d}{dt} \mathrm{E} e^{tX} = \mathrm{E}\, \frac{\partial}{\partial t} e^{tX} = \mathrm{E} \bigl( X e^{tX} \bigr). \tag{2.4.8}
$$
>
> 可以用本节的结果论证 (2.4.8) 中的操作。注意此处应用定理 2.4.3 或推论 2.4.4 时，把 $$t$$ 视为定理中的变量 $$\theta$$，参数 $$\mu$$ 视为常数。
>
> 由推论 2.4.4，必须找一个积分有限的函数 $$g(x, t)$$ 满足
>
> $$
\left\vert  \frac{\partial}{\partial t}\, e^{tx}\, e^{-(x-\mu)^2/2} \right\vert _{t = t'} \leq g(x, t) \qquad \text{对一切满足 } \vert t' - t\vert  \leq \delta_0 \text{ 的 } t'. \tag{2.4.9}
$$
>
> 直接计算得
>
> $$
\Bigl\vert  \frac{\partial}{\partial t}\, e^{tx}\, e^{-(x-\mu)^2/2} \Bigr\vert  = \bigl\vert  x e^{tx}\, e^{-(x-\mu)^2/2} \bigr\vert  \leq \vert x\vert \, e^{tx}\, e^{-(x-\mu)^2/2}.
$$
>
> 最方便的做法是对 $$x \geq 0$$ 与 $$x < 0$$ 分别定义 $$g(x, t)$$。取
>
> $$
g(x, t) = \begin{cases}
\vert x\vert \, e^{(t - \delta_0)x}\, e^{-(x-\mu)^2/2} & \text{若}\ x < 0,\\
\vert x\vert \, e^{(t + \delta_0)x}\, e^{-(x-\mu)^2/2} & \text{若}\ x \geq 0.
\end{cases}
$$
>
> 显然该函数满足 (2.4.9)；剩下验证其积分有限。
>
> 对 $$x \geq 0$$ 有
>
> $$
g(x, t) = x\, e^{-(x^2 - 2x(\mu + t + \delta_0) + \mu^2)/2}.
$$
>
> 对指数中的表达式配方：
>
> $$
\begin{aligned}
x^2 - 2x(\mu + t + \delta_0) + \mu^2 &= x^2 - 2x(\mu + t + \delta_0) + (\mu + t + \delta_0)^2 - (\mu + t + \delta_0)^2 + \mu^2\\
&= \bigl( x - (\mu + t + \delta_0) \bigr)^2 + \mu^2 - (\mu + t + \delta_0)^2,
\end{aligned}
$$
>
> 故对 $$x \geq 0$$，
>
> $$
g(x, t) = x\, e^{-[x - (\mu + t + \delta_0)]^2/2}\, e^{-[\mu^2 - (\mu + t + \delta_0)^2]/2}.
$$
>
> 由于最后一个指数因子与 $$x$$ 无关，$$\int_0^{\infty} g(x, t)\, dx$$ 本质上是在计算均值为 $$\mu + t + \delta_0$$ 的正态分布的均值，只是积分区域仅限 $$[0, \infty)$$。因为正态分布的均值有限（第 3 章证明），该积分有限。对 $$x < 0$$ 作类似推导得
>
> $$
g(x, t) = \vert x\vert \, e^{-[x - (\mu + t - \delta_0)]^2/2}\, e^{-[\mu^2 - (\mu + t - \delta_0)^2]/2},
$$
>
> 故 $$\int_{-\infty}^{0} g(x, t)\, dx < \infty$$。于是我们找到了满足 (2.4.9) 的可积函数，(2.4.8) 中的操作是合理的。

下面转向何时可以交换求导与求和的问题——这一运算在离散分布中扮演重要角色。当然我们只关心无穷和，因为有限和总可以把导数移进去。

> **例 2.4.7（交换求和与求导）**
>
> 设 $$X$$ 是服从几何分布的离散随机变量
>
> $$
P(X = x) = \theta (1 - \theta)^x, \qquad x = 0, 1, \ldots, \quad 0 < \theta < 1.
$$
>
> 我们有 $$\sum_{x=0}^{\infty} \theta (1 - \theta)^x = 1$$；若运算合法，则
>
> $$
\begin{aligned}
\frac{d}{d\theta} \sum_{x=0}^{\infty} \theta (1 - \theta)^x &= \sum_{x=0}^{\infty} \frac{d}{d\theta}\, \theta (1 - \theta)^x\\
&= \sum_{x=0}^{\infty} \Bigl[ (1 - \theta)^x - \theta x (1 - \theta)^{x-1} \Bigr]\\
&= \frac{1}{\theta} \sum_{x=0}^{\infty} \theta (1 - \theta)^x - \frac{1}{1 - \theta} \sum_{x=0}^{\infty} x \theta (1 - \theta)^x.
\end{aligned}
$$
>
> 由于 $$\sum_{x=0}^{\infty} \theta (1 - \theta)^x = 1$$ 对一切 $$0 < \theta < 1$$ 成立，其导数为零，故
>
> $$
\frac{1}{\theta} \sum_{x=0}^{\infty} \theta (1 - \theta)^x - \frac{1}{1 - \theta} \sum_{x=0}^{\infty} x \theta (1 - \theta)^x = 0. \tag{2.4.10}
$$
>
> (2.4.10) 中第一个和等于 1，第二个和正是 $$\mathrm{E} X$$，于是 (2.4.10) 化为
>
> $$
\frac{1}{\theta} - \frac{1}{1 - \theta}\, \mathrm{E} X = 0,
$$
>
> 即
>
> $$
\mathrm{E} X = \frac{1 - \theta}{\theta}.
$$
>
> 我们实质上通过求导求出了级数 $$\sum_{x=0}^{\infty} x \theta (1-\theta)^x$$ 的和。

把导数移入求和号内的论证比积分情形直接。下面的定理给出细节。

> **定理 2.4.8（求和号下求导）**
>
> 设级数 $$\sum_{x=0}^{\infty} h(\theta, x)$$ 对实数区间 $$(a, b)$$ 内的一切 $$\theta$$ 收敛，且
>
> - i. 对每个 $$x$$，$$\dfrac{\partial}{\partial \theta} h(\theta, x)$$ 关于 $$\theta$$ 连续；
>
> - ii. $$\displaystyle\sum_{x=0}^{\infty} \dfrac{\partial}{\partial \theta} h(\theta, x)$$ 在 $$(a, b)$$ 的每个有界闭子区间上一致收敛。
>
>
> 则
>
> $$
\frac{d}{d\theta} \sum_{x=0}^{\infty} h(\theta, x) = \sum_{x=0}^{\infty} \frac{\partial}{\partial \theta} h(\theta, x). \tag{2.4.11}
$$

要确认求导可以移入求和号内，关键是要验证一致收敛条件。回顾：级数一致收敛是指其部分和序列一致收敛，下面的例子正是利用这一事实。

> **例 2.4.9（例 2.4.7 的继续）**
>
> 为应用定理 2.4.8，识别
>
> $$
h(\theta, x) = \theta (1 - \theta)^x,
$$
>
> 及
>
> $$
\frac{\partial}{\partial \theta} h(\theta, x) = (1 - \theta)^x - \theta x (1 - \theta)^{x-1},
$$
>
> 并验证 $$\sum_{x=0}^{\infty} \frac{\partial}{\partial \theta} h(\theta, x)$$ 一致收敛。定义
>
> $$
S_n(\theta) = \sum_{x=0}^{n} \Bigl[ (1 - \theta)^x - \theta x (1 - \theta)^{x-1} \Bigr].
$$
>
> 若对给定 $$\varepsilon > 0$$ 能找到 $$N$$ 使
>
> $$
n > N \Rightarrow \vert S_n(\theta) - S_{\infty}(\theta)\vert  < \varepsilon \quad \text{对一切}\ \theta \in [c, d],
$$
>
> 则收敛在 $$[c, d] \subset (0, 1)$$ 上一致。
>
> 回顾几何级数的部分和公式 (1.5.3)：若 $$y \neq 1$$，则
>
> $$
\sum_{k=0}^{n} y^k = \frac{1 - y^{n+1}}{1 - y}.
$$
>
> 应用之，有
>
> $$
\sum_{x=0}^{n} (1 - \theta)^x = \frac{1 - (1 - \theta)^{n+1}}{\theta},
$$
>
> 以及
>
> $$
\sum_{x=0}^{n} \theta x (1 - \theta)^{x-1} = -\theta \sum_{x=0}^{n} \frac{\partial}{\partial \theta} (1 - \theta)^x = -\theta\, \frac{d}{d\theta} \sum_{x=0}^{n} (1 - \theta)^x = -\theta\, \frac{d}{d\theta} \Bigl[ \frac{1 - (1 - \theta)^{n+1}}{\theta} \Bigr].
$$
>
> 这里我们（合法地）把导数移过有限和。计算该导数得
>
> $$
\sum_{x=0}^{n} \theta x (1 - \theta)^{x-1} = \frac{\bigl( 1 - (1 - \theta)^{n+1} \bigr) - (n+1)\, \theta (1 - \theta)^n}{\theta},
$$
>
> 从而
>
> $$
S_n(\theta) = \frac{1 - (1 - \theta)^{n+1}}{\theta} - \frac{\bigl( 1 - (1 - \theta)^{n+1} \bigr) - (n+1)\, \theta (1 - \theta)^n}{\theta} = (n+1)(1 - \theta)^n.
$$
>
> 显然对 $$0 < \theta < 1$$，$$S_{\infty} = \lim_{n \to \infty} S_n(\theta) = 0$$。由于 $$S_n(\theta)$$ 连续，收敛在任何有界闭区间上一致。故导数级数一致收敛，求导与求和的交换是合理的。

本节最后给出一个与定理 2.4.8 类似、但处理求和与积分次序交换的定理。

> **定理 2.4.10（求和与积分的交换）**
>
> 设级数 $$\sum_{x=0}^{\infty} h(\theta, x)$$ 在 $$[a, b]$$ 上一致收敛，且对每个 $$x$$，$$h(\theta, x)$$ 是 $$\theta$$ 的连续函数。则
>
> $$
\int_{a}^{b} \sum_{x=0}^{\infty} h(\theta, x)\, d\theta = \sum_{x=0}^{\infty} \int_{a}^{b} h(\theta, x)\, d\theta.
$$

## 2.5 习题（Exercises）

**2.1** 对下列各题求 $$Y$$ 的 pdf，并证明该 pdf 积分为 1。(a) $$Y = X^3$$，$$f_X(x) = 42 x^5 (1-x)$$，$$0 < x < 1$$；(b) $$Y = 4X + 3$$，$$f_X(x) = 7 e^{-7x}$$，$$0 < x < \infty$$；(c) $$Y = X^2$$，$$f_X(x) = 30 x^2 (1-x)^2$$，$$0 < x < 1$$。（另见计算机代数附录中的例 12.6.2。）

**2.2** 对下列各题求 $$Y$$ 的 pdf。(a) $$Y = X^2$$，$$f_X(x) = 1$$，$$0 < x < 1$$；(b) $$Y = -\log X$$，$$X$$ 的 pdf 为

$$
f_X(x) = \frac{(n + m + 1)!}{n!\, m!}\, x^n (1 - x)^m, \qquad 0 < x < 1, \quad m, n\ \text{为正整数}；
$$

(c) $$Y = e^X$$，$$X$$ 的 pdf 为

$$
f_X(x) = \frac{1}{\sigma^2}\, x\, e^{-(x/\sigma)^2/2}, \qquad 0 < x < \infty, \quad \sigma^2\ \text{为正常数}.
$$

**2.3** 设 $$X$$ 服从几何 pmf $$f_X(x) = \tfrac{1}{3} \bigl( \tfrac{2}{3} \bigr)^x$$，$$x = 0, 1, 2, \ldots$$。确定 $$Y = X / (X + 1)$$ 的概率分布。注意这里 $$X$$ 与 $$Y$$ 都是离散随机变量；要指明 $$Y$$ 的概率分布，请给出其 pmf。

**2.4** 设 $$\lambda$$ 为固定正常数，定义函数 $$f(x) = \tfrac{1}{2} \lambda e^{-\lambda x}$$（$$x \geq 0$$），$$f(x) = \tfrac{1}{2} \lambda e^{\lambda x}$$（$$x < 0$$）。(a) 验证 $$f(x)$$ 是 pdf；(b) 若 $$X$$ 是以此 $$f(x)$$ 为 pdf 的随机变量，对一切 $$t$$ 求 $$P(X < t)$$，计算所有积分；(c) 对一切 $$t$$ 求 $$P(\vert X\vert  < t)$$，计算所有积分。

**2.5** 用定理 2.1.8 求例 2.1.2 中 $$Y$$ 的 pdf，并证明对 (2.1.6) 给出的 cdf 求导可得相同答案。

**2.6** 对下列各题求 $$Y$$ 的 pdf 并证明其积分为 1。(a) $$f_X(x) = \tfrac{1}{2} e^{-\vert x\vert }$$，$$-\infty < x < \infty$$；$$Y = \vert X\vert ^3$$；(b) $$f_X(x) = \tfrac{3}{8} (x + 1)^2$$，$$-1 < x < 1$$；$$Y = 1 - X^2$$；(c) $$f_X(x) = \tfrac{3}{8} (x + 1)^2$$，$$-1 < x < 1$$；当 $$X \leq 0$$ 时 $$Y = 1 - X^2$$，当 $$X > 0$$ 时 $$Y = 1 - X$$。

**2.7** 设 $$X$$ 的 pdf 为 $$f_X(x) = \tfrac{2}{9} (x + 1)$$，$$-1 \leq x \leq 2$$。(a) 求 $$Y = X^2$$ 的 pdf。注意定理 2.1.8 在本题中不能直接应用。(b) 证明：若把定理 2.1.8 中的集合 $$A_0, A_1, \ldots, A_k$$ 改为包含 $$\mathcal{X}$$（而非恰好分割），定理仍然成立；并取 $$A_0 = \varnothing$$、$$A_1 = (-2, 0)$$、$$A_2 = (0, 2)$$ 用该推广求解 (a)。

**2.8** 对下列各函数证明其为 cdf，并求 $$F_X^{-1}(y)$$。(a) $$F_X(x) = \begin{cases} 0 & x < 0,\\ 1 - e^{-x} & x \geq 0; \end{cases}$$ (b) $$F_X(x) = \begin{cases} e^{x}/2 & x < 0,\\ 1/2 & 0 \leq x < 1,\\ 1 - (e^{1-x}/2) & 1 \leq x; \end{cases}$$ (c) $$F_X(x) = \begin{cases} e^{x}/4 & x < 0,\\ 1 - (e^{-x}/4) & x \geq 0. \end{cases}$$注意在 (c) 中 $$F_X(x)$$ 不连续，但 (2.1.13) 仍是 $$F_X^{-1}(y)$$ 的恰当定义。

**2.9** 若随机变量 $$X$$ 的 pdf 为

$$
f(x) = \begin{cases} \dfrac{x - 1}{2} & 1 < x < 3,\\[4pt] 0 & \text{其他}, \end{cases}
$$

求单调函数 $$u(x)$$，使随机变量 $$Y = u(X)$$ 服从 uniform $$(0,1)$$ 分布。

**2.10** 定理 2.1.10 证明了概率积分变换，把均匀 cdf 与任何连续 cdf 联系起来。本习题考察离散随机变量与均匀随机变量的关系。设 $$X$$ 为离散随机变量，cdf 为 $$F_X(x)$$，定义 $$Y = F_X(X)$$。(a) 证明 $$Y$$ 随机地大于 uniform$(0,1)$$：即若 $$U \sim \mathrm{uniform}(0,1)$$，则
$$
P(Y > y) \geq P(U > y) = 1 - y, \quad \text{对一切}\ 0 < y < 1,
$$
且
$$
P(Y > y) > P(U > y) = 1 - y, \quad \text{对某些}\ 0 < y < 1.
$$
（“随机地大于”见习题 1.49 的定义。）(b) 等价地，证明 $$Y$$ 的 cdf 满足：对一切 $$0 < y < 1$$ 有 $$F_Y(y) \leq y$$，且对某些 $$0 < y < 1$$ 有 $$F_Y(y) < y$$。（提示：设 $$x_0$$ 为 $$F_X$$ 的跳跃点并令 $$y_0 = F_X(x_0)$$，证明 $$P(Y \leq y_0) = y_0$$；再考虑 $$y = y_0 + \varepsilon$$ 建立不等式。画 cdf 草图有帮助。）
**2.11** 设 $$X$$ 具有标准正态 pdf $$f_X(x) = (1/\sqrt{2\pi}) e^{-x^2/2}$$。(a) 直接求 $$\mathrm{E} X^2$$；再用例 2.1.7 中 $$Y = X^2$$ 的 pdf 计算 $$\mathrm{E} Y$$，比较两条路的结果。(b) 求 $$Y = \vert X\vert $$ 的 pdf，并求其均值与方差。
**2.12** 随机直角三角形可以这样构造：设 $$X$$ 为随机角，服从 $$(0, \pi/2)$$ 上的均匀分布。对每个 $$X$$，如下构造三角形：斜边一端在原点处与 $$x$$ 轴成角 $$X$$，另一端落在竖直线 $$x = d$$ 上，记交点为 $$(d, y)$$，即 $$Y$$ 为随机三角形的高。对固定常数 $$d$$，求 $$Y$$ 的分布与 $$\mathrm{E} Y$$。
**2.13** 考虑一列独立的抛硬币，每次正面概率为 $$p$$。定义随机变量 $$X$$ 为由第一次试验开始的游程（全为正面或全为反面）的长度。（例如，若观察到 TTTH 或 HHHT 则 $$X = 3$$。）求 $$X$$ 的分布与 $$\mathrm{E} X$$。
**2.14** (a) 设 $$X$$ 是连续的非负随机变量（$$f(x) = 0$$ 对 $$x < 0$$）。证明
$$
\mathrm{E} X = \int_0^{\infty} \bigl[ 1 - F_X(x) \bigr]\, dx,
$$
其中 $$F_X(x)$$ 是 $$X$$ 的 cdf。(b) 设 $$X$$ 是取值为非负整数的离散随机变量。证明
$$
\mathrm{E} X = \sum_{k=0}^{\infty} \bigl( 1 - F_X(k) \bigr),
$$
其中 $$F_X(k) = P(X \leq k)$$。并与 (a) 比较。
**2.15** Betteley (1977) 给出一条有趣的期望加法律。设 $$X$$ 与 $$Y$$ 是任意两个随机变量，定义
$$
X \wedge Y = \min(X, Y), \qquad X \vee Y = \max(X, Y).
$$
与概率法则 $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$ 类似，证明
$$
\mathrm{E}(X \vee Y) = \mathrm{E} X + \mathrm{E} Y - \mathrm{E}(X \wedge Y).
$$
（提示：先证 $$X + Y = (X \vee Y) + (X \wedge Y)$$。）
**2.16** 用习题 2.14 的结果求某种电话通话时长的均值，设特定通话时长 $$T$$ 满足
$$
P(T > t) = a e^{-\lambda t} + (1 - a) e^{-\mu t},
$$
其中 $$a$$、$$\lambda$$、$$\mu$$ 为常数，$$0 < a < 1$$，$$\lambda > 0$$，$$\mu > 0$$。
**2.17** 分布的中位数（median）是满足 $$P(X \leq m) \geq \tfrac{1}{2}$$ 且 $$P(X \geq m) \geq \tfrac{1}{2}$$ 的值 $$m$$。（若 $$X$$ 连续，$$m$$ 满足 $$\int_{-\infty}^{m} f(x)\, dx = \int_{m}^{\infty} f(x)\, dx = \tfrac{1}{2}$$。）求下列分布的中位数：(a) $$f(x) = 3x^2$$，$$0 < x < 1$$；　　 (b) $$f(x) = \dfrac{1}{\pi (1 + x^2)}$$，$$-\infty < x < \infty$$。
**2.18** 证明：若 $$X$$ 是连续随机变量，则
$$
\min_a \mathrm{E} \vert X - a\vert  = \mathrm{E} \vert X - m\vert ,
$$
其中 $$m$$ 是 $$X$$ 的中位数（见习题 2.17）。
**2.19** 通过对积分求导证明
$$
\frac{d}{da} \mathrm{E}(X - a)^2 = 0 \iff \mathrm{E} X = a,
$$
并用微积分验证 $$a = \mathrm{E} X$$ 确为极小值点。列出所需的对 $$F_X$$ 与 $$f_X$$ 的假设。
**2.20** 一对夫妇决定继续生孩子直到生下女儿为止。这对夫妇期望要生多少个孩子？（提示：参见例 1.5.4。）
**2.21** 证明期望的“两条路”法则，即式 (2.2.5)：$$\mathrm{E} g(X) = \mathrm{E} Y$$，其中 $$Y = g(X)$$。设 $$g(x)$$ 是单调函数。
**2.22** 设 $$X$$ 的 pdf 为
$$
f(x) = \frac{4}{\beta^3 \sqrt{\pi}}\, x^2 e^{-x^2/\beta}, \qquad 0 < x < \infty, \quad \beta > 0.
$$
(a) 验证 $$f(x)$$ 是 pdf。　　 (b) 求 $$\mathrm{E} X$$ 与 $$\mathrm{Var} X$$。
**2.23** 设 $$X$$ 的 pdf 为
$$
f(x) = \frac{1}{2} (1 + x), \qquad -1 < x < 1.
$$
(a) 求 $$Y = X^2$$ 的 pdf。　　 (b) 求 $$\mathrm{E} Y$$ 与 $$\mathrm{Var} Y$$。
**2.24** 对下列每个概率分布计算 $$\mathrm{E} X$$ 与 $$\mathrm{Var} X$$。(a) $$f_X(x) = a x^{a-1}$$，$$0 < x < 1$$，$$a > 0$$；(b) $$f_X(x) = \tfrac{1}{n}$$，$$x = 1, 2, \ldots, n$$，$$n > 0$$ 为整数；(c) $$f_X(x) = \tfrac{3}{2} (x - 1)^2$$，$$0 < x < 2$$。
**2.25** 设随机变量 $$X$$ 的 pdf $$f_X(x)$$ 是偶函数（即对每个 $$x$$ 有 $$f_X(x) = f_X(-x)$$）。证明：(a) $$X$$ 与 $$-X$$ 同分布；(b) $$M_X(t)$$ 关于零点对称。
**2.26** 设 $$f(x)$$ 是 pdf，数 $$a$$ 满足：对一切 $$\varepsilon > 0$$ 有 $$f(a + \varepsilon) = f(a - \varepsilon)$$。这样的 pdf 称为关于点 $$a$$ 对称。(a) 举出三个对称 pdf 的例子；(b) 证明若 $$X \sim f(x)$$ 且 $$f$$ 对称，则 $$X$$ 的中位数（见习题 2.17）为数 $$a$$；(c) 证明若 $$X \sim f(x)$$ 且 $$f$$ 对称、$$\mathrm{E} X$$ 存在，则 $$\mathrm{E} X = a$$；(d) 证明 $$f(x) = e^{-x}$$（$$x \geq 0$$）不是对称 pdf；(e) 证明 (d) 中 pdf 的中位数小于均值。
**2.27** 设 $$f(x)$$ 是 pdf，数 $$a$$ 满足：若 $$a \geq x \geq y$$ 则 $$f(a) \geq f(x) \geq f(y)$$；若 $$a \leq x \leq y$$ 则 $$f(a) \geq f(x) \geq f(y)$$。这样的 pdf 称为***单峰***（unimodal）的，其***众数***（mode）为 $$a$$。(a) 举一个众数唯一的单峰 pdf 的例子；(b) 举一个众数不唯一的单峰 pdf 的例子；(c) 证明若 $$f(x)$$ 既对称（见习题 2.26）又单峰，则对称点是众数之一；(d) 考虑 pdf $$f(x) = e^{-x}$$（$$x \geq 0$$），证明它是单峰的，并求其众数。
**2.28** 设 $$\mu_n$$ 表示随机变量 $$X$$ 的 $$n$$ 阶中心矩。除均值与方差外，两个令人感兴趣的量是
$$
\alpha_3 = \frac{\mu_3}{(\mu_2)^{3/2}} \qquad\text{与}\qquad \alpha_4 = \frac{\mu_4}{\mu_2^2}.
$$
$$\alpha_3$$ 称为***偏度***（skewness），$$\alpha_4$$ 称为***峰度***（kurtosis）。偏度度量 pdf 缺乏对称的程度（见习题 2.26）；峰度较难解读，度量 pdf 的尖峰或平坦程度。(a) 证明若 pdf 关于点 $$a$$ 对称，则 $$\alpha_3 = 0$$；(b) 对右偏的 pdf $$f(x) = e^{-x}$$（$$x \geq 0$$）计算 $$\alpha_3$$；(c) 对下列各 pdf 计算 $$\alpha_4$$ 并评论各自的尖峰程度：
$$
\begin{aligned}
f(x) &= \frac{1}{\sqrt{2\pi}}\, e^{-x^2/2}, \quad -\infty < x < \infty;\\
f(x) &= \frac{1}{2}, \quad -1 < x < 1;\\
f(x) &= \frac{1}{2}\, e^{-\vert x\vert }, \quad -\infty < x < \infty.
\end{aligned}
$$
（Ruppert (1987) 用影响函数（10.6.4 节）进一步探讨峰度的含义，Groeneveld (1991) 用其探讨偏度；关于 $$\alpha_4$$ 解释的更多内容另见 Balanda and MacGillivray (1988)。）
**2.29** 计算离散分布的矩时，用阶乘矩（见杂记 2.6.2）往往更容易。(a) 计算二项分布与泊松分布的阶乘矩 $$\mathrm{E}[X(X-1)]$$；(b) 用 (a) 的结果计算二项分布与泊松分布的方差；(c) 一个相当棘手的离散分布是贝塔—二项（beta-binomial）分布，其 pmf 按原书排印为
$$
P(Y = y) = a (y + a)\, \frac{\dbinom{n}{y}\dbinom{a + b - 1}{a}}{\dbinom{n + a + b - 1}{y + a}}, \qquad y = 0, 1, 2, \ldots, n,
$$
其中 $$n$$、$$a$$、$$b$$ 为整数。**原书注**：按上式（前因子印作 $$a(y+a)$$）概率无法归一；使 pmf 归一的系数应为 $$\dfrac{a}{y + a}$$，即
$$
P(Y = y) = \frac{a}{y + a}\, \frac{\dbinom{n}{y}\dbinom{a + b - 1}{a}}{\dbinom{n + a + b - 1}{y + a}},
$$
（数值验证：取 $$n = 2$$，$$a = b = 1$$，三概率均为 $$1/3$$。）疑为原书排印遗漏分数线。用阶乘矩计算贝塔—二项分布的方差（习题 4.34 给出另一做法）。
**2.30** 求下列分布对应的矩母函数：(a) $$f(x) = \tfrac{1}{c}$$，$$0 < x < c$$；(b) $$f(x) = \tfrac{2x}{c^2}$$，$$0 < x < c$$；(c) $$f(x) = \tfrac{1}{2\beta}\, e^{-\vert x - \alpha\vert /\beta}$$，$$-\infty < x < \infty$$，$$-\infty < \alpha < \infty$$，$$\beta > 0$$；(d) $$P(X = x) = \binom{r + x - 1}{x}\, p^r (1 - p)^x$$，$$x = 0, 1, \ldots$$，$$0 < p < 1$$，$$r > 0$$ 为整数。
**2.31** 存在使得 $$M_X(t) = \dfrac{t}{1 - t}$$（$$\vert t\vert  < 1$$）的分布吗？若存在，求之；若不存在，证明之。
**2.32** 设 $$M_X(t)$$ 是 $$X$$ 的矩母函数，定义 $$S(t) = \log\bigl( M_X(t) \bigr)$$。证明
$$
\left. \frac{d}{dt} S(t) \right\vert _{t=0} = \mathrm{E} X \qquad\text{与}\qquad \left. \frac{d^2}{dt^2} S(t) \right\vert _{t=0} = \mathrm{Var} X.
$$
**2.33** 对下列各情形验证所给矩母函数的表达式，并用 mgf 计算 $$\mathrm{E} X$$ 与 $$\mathrm{Var} X$$。(a) $$P(X = x) = \dfrac{e^{-\lambda} \lambda^x}{x!}$$，$$M_X(t) = e^{\lambda (e^t - 1)}$$，$$x = 0, 1, \ldots$$；$$\lambda > 0$$；(b) $$P(X = x) = p (1 - p)^x$$，$$M_X(t) = \dfrac{p}{1 - (1 - p) e^t}$$，$$x = 0, 1, \ldots$$；$$0 < p < 1$$；(c) $$f_X(x) = \dfrac{e^{-(x - \mu)^2/(2 \sigma^2)}}{\sqrt{2\pi}\, \sigma}$$，$$M_X(t) = e^{\mu t + \sigma^2 t^2/2}$$，$$-\infty < x < \infty$$；$$-\infty < \mu < \infty$$，$$\sigma > 0$$。
**2.34** 分布不能由有限个矩唯一确定，Romano and Siegel (1986) 的例子说明了这一点。设 $$X$$ 服从标准正态分布，pdf 为 $$f_X(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}$$。定义离散随机变量 $$Y$$：
$$
P\Bigl( Y = \sqrt{3} \Bigr) = P\Bigl( Y = -\sqrt{3} \Bigr) = \frac{1}{6}, \qquad P\bigl( Y = 0 \bigr) = \frac{2}{3}.
$$
证明：对 $$r = 1, 2, 3, 4, 5$$，$$\mathrm{E} X^r = \mathrm{E} Y^r$$。（Romano and Siegel (1986) 指出：对任意有限 $$n$$，都存在一个离散的（因而非正态的）随机变量，其前 $$n$$ 阶矩与 $$X$$ 的相同。）
**2.35** 补足例 2.3.10 的空缺。(a) 证明若 $$X_1 \sim f_1(x)$$，则 $$\mathrm{E} X_1^r = e^{r^2/2}$$，$$r = 0, 1, \ldots$$；即 $$f_1(x)$$ 拥有全部各阶矩且都有限。(b) 再证明对一切正整数 $$r$$，
$$
\int_0^{\infty} x^r f_1(x) \sin(2\pi \log x)\, dx = 0,
$$
从而对一切 $$r$$ 有 $$\mathrm{E} X_1^r = \mathrm{E} X_2^r$$。（Romano and Siegel (1986) 讨论了该例的极端版本：整类不同的 pdf 拥有相同的矩。Berg (1988) 证明这种矩现象也可以经由正态分布的更简单变换（如 $$X^3$$）产生。）
**2.36** 例 2.3.10 所基于的对数正态分布有一个有趣的性质：对 pdf
$$
f(x) = \frac{1}{\sqrt{2\pi}\, x}\, e^{-(\log x)^2/2}, \qquad 0 \leq x < \infty,
$$
习题 2.35 证明了所有矩存在且有限。然而该分布没有矩母函数，即
$$
M_X(t) = \int_0^{\infty} \frac{e^{tx}}{\sqrt{2\pi}\, x}\, e^{-(\log x)^2/2}\, dx
$$
不存在。证明这一结论。
**2.37** 参照杂记 2.6.3 描述的情形：(a) 绘出 pdf $$f_1$$ 与 $$f_2$$ 的图像以显示其差异；(b) 绘出累积量生成函数 $$K_1$$ 与 $$K_2$$ 的图像以显示其相似；(c) 计算 pdf $$f_1$$ 与 $$f_2$$ 的矩母函数，它们相似还是不同？(d) pdf $$f_1$$、$$f_2$$ 与例 2.3.10 所述 pdf 有何关系？
**2.38** 设 $$X$$ 服从负二项分布，pmf 为
$$
f(x) = \binom{r + x - 1}{x}\, p^r (1 - p)^x, \qquad x = 0, 1, 2, \ldots,
$$
其中 $$0 < p < 1$$，$$r > 0$$ 为整数。(a) 计算 $$X$$ 的 mgf；(b) 定义新随机变量 $$Y = 2pX$$。证明当 $$p \downarrow 0$$ 时 $$Y$$ 的 mgf 收敛到自由度为 $$2r$$ 的卡方随机变量的 mgf，即证明
$$
\lim_{p \to 0} M_Y(t) = \Bigl( \frac{1}{1 - 2t} \Bigr)^{r}, \qquad \vert t\vert  < \frac{1}{2}.
$$
**2.39** 对下列各情形计算指定导数，并为所有运算提供理由。(a) $$\dfrac{d}{dx} \displaystyle\int_0^{x} e^{-\lambda t}\, dt$$；　　 (b) $$\dfrac{d}{d\lambda} \displaystyle\int_0^{\infty} e^{-\lambda t}\, dt$$；(c) $$\dfrac{d}{dt} \displaystyle\int_t^{1} \frac{1}{x^2}\, dx$$；　　 (d) $$\dfrac{d}{dt} \displaystyle\int_1^{\infty} \frac{1}{(x - t)^2}\, dx$$。
**2.40** 证明
$$
\sum_{k=0}^{x} k \binom{n}{k} p^k (1 - p)^{n-k} = (n - x) \binom{n}{x} \int_0^{1 - p} t^{\,n - x - 1} (1 - t)^x\, dt.
$$
（提示：分部积分，或对 $$p$$ 求导比较两边。）
## 2.6 杂记（Miscellanea）
### 2.6.1 矩序列的唯一性（Uniqueness of Moment Sequences）
分布不一定由其矩决定。但若级数 $$\sum_{r=1}^{\infty} \mu_r^{\,r} / k!$$（其中 $$X \sim F_X$$，$$\mathrm{E} X^r = \mu_r'$$）具有正的收敛半径，则矩序列唯一，从而分布唯一确定（Billingsley 1995, Section 30）。该级数收敛还蕴含矩母函数在某区间内存在，故 mgf 决定分布。
矩序列唯一的一个充分条件是***Carleman 条件***（Carleman's Condition；Chung 1974）：若 $$X \sim F_X$$，记 $$\mathrm{E} X^r = \mu_r'$$，则当
$$
\sum_{r=1}^{\infty} \bigl( \mu_{2r}' \bigr)^{-1/(2r)} = +\infty
$$
时矩序列唯一。该条件一般不易验证。
Feller (1971) 对拉普拉斯变换（mgf 是其特例）有非常完整的论述。特别地，Feller 证明（与 Billingsley 类似）：只要
$$
M_X(t) = \sum_{r=0}^{\infty} \frac{(-1)^r \mu_r' t^r}{r!}
$$
在区间 $$-t_0 \leq t < t_0$$（$$t_0 > 0$$）上收敛，分布 $$F_X$$ 就被唯一确定。因此当 mgf 存在时，矩序列唯一决定分布 $$F_X$$。
显然，用 mgf 来确定分布是件困难的事。更好的方法是使用特征函数（characteristic function），见下文。虽然特征函数简化了分布的刻画，却要求理解复分析——有所得必有所失。
### 2.6.2 其他生成函数（Other Generating Functions）
除矩母函数外还有若干其他生成函数。多数情形下，特征函数是其中最有用的；除罕见情形外其他生成函数用处较小，但在某些场合可以简化计算。
**累积量生成函数**（Cumulant generating function）　 对随机变量 $$X$$，累积量生成函数是函数 $$\log[M_X(t)]$$。它可用于生成 $$X$$ 的累积量（cumulants）；累积量的定义（相当迂回）是累积量生成函数泰勒展开式的系数（见习题 2.32）。
**阶乘矩生成函数**（Factorial moment generating function）　 $$X$$ 的阶乘矩生成函数定义为 $$\mathrm{E} t^X$$（若期望存在）。其名源于该函数满足
$$
\left. \frac{d^r}{dt^r}\, \mathrm{E} t^X \right\vert _{t=1} = \mathrm{E}\bigl\{ X(X-1) \cdots (X - r + 1) \bigr\},
$$
右端正是阶乘矩。若 $$X$$ 是离散随机变量，可写
$$
\mathrm{E} t^X = \sum_{x} t^x P(X = x),
$$
此时阶乘矩生成函数也称为***概率生成函数***（probability generating function），因为幂级数的系数给出概率：要求 $$X = k$$ 的概率，计算
$$
\frac{1}{k!} \left. \frac{d^k}{dt^k}\, \mathrm{E} t^X \right\vert _{t=1} = P(X = k).
$$
**特征函数**（Characteristic function）　 这些函数中也许最有用的是特征函数。$$X$$ 的特征函数定义为
$$
\phi_X(t) = \mathrm{E} e^{itX},
$$
其中 $$i$$ 是复数 $$\sqrt{-1}$$，故上述期望涉及复积分。特征函数比 mgf 能做更多的事：当 $$F_X$$ 的矩存在时，$$\phi_X$$ 可以像 mgf 一样生成矩；特征函数***总是存在***且***完全决定分布***——每个 cdf 都有唯一的特征函数。于是可以陈述类似定理 2.3.11 的定理，而且无需任何附加条件。
**定理 2.6.1（特征函数的收敛，Convergence of Characteristic Functions）**
设 $$X_k$$，$$k = 1, 2, \ldots$$，是一列随机变量，各有特征函数 $$\phi_{X_k}(t)$$。进一步设在 0 的某邻域内的所有 $$t$$ 处
$$
> \lim_{k \to \infty} \phi_{X_k}(t) = \phi_X(t),
> $$
且 $$\phi_X(t)$$ 是某特征函数。则在 $$F_X(x)$$ 的每个连续点 $$x$$ 处，
$$
> \lim_{k \to \infty} F_{X_k}(x) = F_X(x).
> $$
生成函数的完整论述见 Feller (1968)。特征函数几乎见于任何高等概率教材，如 Billingsley (1995) 或 Resnick (1999)。
### 2.6.3 矩母函数能刻画分布吗？（Does the MGF Characterize a Distribution?）
McCullagh (1994) 在以此标题命名的文章中考察了一对与例 2.3.10 相似的密度
$$
f_1 = n(0, 1) \qquad\text{与}\qquad f_2 = f_1(x) \Bigl( 1 + \frac{1}{2} \sin(2\pi x) \Bigr),
$$
其累积量生成函数为
$$
K_1(t) = t^2/2 \qquad\text{与}\qquad K_2(t) = K_1(t) + \log\Bigl( 1 + \frac{1}{2} e^{-2\pi^2} \sin(2\pi t) \Bigr).
$$
他指出：尽管两个密度看起来明显不同，其累积量生成函数却几乎完全相同——在整个定义域上的最大差异小于 $$1.34 \times 10^{-9}$$（不到一个像素的尺寸）。因此标题所问问题的答案是：“就数学目的而言是的，但就数值目的而言断然不是。”作为对比，Waller (1995) 说明：虽然 mgf 在数值上无法区分这两个分布，特征函数却表现出色（Waller 等 (1995) 与 Lucenõ (1997) 进一步研究了用特征函数数值地获得 cdf）。细节见习题 2.37。

---
