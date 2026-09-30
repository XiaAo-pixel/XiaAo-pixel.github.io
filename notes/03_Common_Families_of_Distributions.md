---
layout: note
kind: note
title: "第 3 章　常用分布族（Common Families of Distributions）"
course: Mathematical Statitics
date: 2026-09-30
---

# 第 3 章　常用分布族（Common Families of Distributions）

> *“How do all these unusuals strike you, Watson?”*
>
> *“Their cumulative effect is certainly considerable, and yet each of them is quite possible in itself.”*
>
> “这些稀奇古怪的事，你感觉如何，华生？”“它们累积起来的效果当然相当可观，然而每一件单独来看都完全可能。”
>
> ——歇洛克·福尔摩斯与华生医生（《修道院公学》）

## 3.1 引言（Introduction）

统计分布用于为总体建模；因此我们通常打交道的是一族（family）分布而非单个分布。这一族分布由一个或多个参数（parameters）索引，使我们能在保持同一函数形式的同时改变分布的某些特征。例如，我们可以指定正态分布是刻画某特定总体的合理选择，但无法精确指明其均值；此时我们面对的是一个参数族——均值为 $\mu$ 的正态分布族，其中 $\mu$ 是未指定参数，$-\infty < \mu < \infty$。

本章编目了许多较常用的统计分布，其中一些我们此前已经遇到过。对每个分布，我们将给出其均值与方差，以及许多有助于理解的其他有用或描述性的量。我们还将指出这些分布的一些典型应用及一些有趣而有用的相互关系。其中部分事实总结于书末的表格中。本章对统计分布的覆盖绝谈不上全面；完成这一任务的是 Johnson and Kotz (1969–1972) 的多卷本著作 *Distributions in Statistics*，以及更新版的 Johnson, Kotz, and Balakrishnan (1994, 1995) 与 Johnson, Kotz, and Kemp (1992)。

## 3.2 离散分布（Discrete Distributions）

若随机变量 $X$ 的值域（样本空间）可数，则称 $X$ 具有离散分布。多数情形下，随机变量的取值为整数。

### 离散均匀分布（Discrete Uniform Distribution）

若

$$
P(X = x \mid N) = \frac{1}{N}, \qquad x = 1, 2, \ldots, N, \tag{3.2.1}
$$

其中 $N$ 是给定的整数，则称随机变量 $X$ 服从***离散均匀分布***（discrete uniform distribution）$\mathrm{discrete\ uniform}(1, N)$。该分布在结果 $1, 2, \ldots, N$ 中的每一个上都放置相等的质量。

> **记号约定**：处理参数分布时（几乎总是如此），分布依赖于参数的取值。为强调这一点并便于追踪参数，我们在 pmf 中以“$\mid$”（给定）引出参数写在后面。这一约定同样用于 cdf、pdf、期望以及其他需要追踪参数的场合。在不致混淆时，参数可以省略，以免记号过于累赘。

为计算 $X$ 的均值与方差，回顾恒等式（可用归纳法证明）

$$
\sum_{i=1}^{k} i = \frac{k(k+1)}{2} \qquad\text{与}\qquad \sum_{i=1}^{k} i^2 = \frac{k(k+1)(2k+1)}{6}.
$$

于是

$$
\mathrm{E} X = \sum_{x=1}^{N} x\, P(X = x \mid N) = \sum_{x=1}^{N} x\, \frac{1}{N} = \frac{N+1}{2},
$$

且

$$
\mathrm{E} X^2 = \sum_{x=1}^{N} x^2\, \frac{1}{N} = \frac{(N+1)(2N+1)}{6},
$$

从而

$$
\mathrm{Var} X = \mathrm{E} X^2 - (\mathrm{E} X)^2 = \frac{(N+1)(2N+1)}{6} - \Bigl( \frac{N+1}{2} \Bigr)^{2} = \frac{(N+1)(N-1)}{12}.
$$

这一分布可以推广，使样本空间为任意整数区间 $N_0, N_0 + 1, \ldots, N_1$，pmf 为 $P(X = x \mid N_0, N_1) = 1/(N_1 - N_0 + 1)$。

### 超几何分布（Hypergeometric Distribution）

超几何分布在有限总体抽样中有许多应用，通过经典的瓮模型例子最易理解。

设有一个大瓮，装有 $N$ 个球，除颜色外完全相同：$M$ 个为红色，$N - M$ 个为绿色。我们蒙上眼伸手随机选取 $K$ 个球（$K$ 个球一次全部取出，即无放回抽样）。恰有 $x$ 个球是红色的概率是多少？

从 $N$ 个球中抽出容量为 $K$ 的样本共有 $\binom{N}{K}$ 种（见 1.2.3 节）。要求 $x$ 个球为红色，可用 $\binom{M}{x}$ 种方式实现，剩下的样本用 $K - x$ 个绿球补足，有 $\binom{N-M}{K-x}$ 种方式。于是若设 $X$ 表示容量为 $K$ 的样本中红球的个数，则 $X$ 服从超几何分布

$$
P(X = x \mid N, M, K) = \frac{\dbinom{M}{x} \dbinom{N-M}{K-x}}{\dbinom{N}{K}}, \qquad x = 0, 1, \ldots, K. \tag{3.2.2}
$$

注意 (3.2.2) 中隐含着对 $X$ 值域的附加假设。形如 $\binom{n}{r}$ 的二项式系数仅在 $n \geq r$ 时有定义，故 $X$ 的值域还受不等式组

$$
M \geq x \qquad\text{与}\qquad N - M \geq K - x
$$

的额外限制，两者可以合并为

$$
M - (N - K) \leq x \leq M.
$$

许多情况下 $K$ 相对 $M$ 与 $N$ 较小，故范围 $0 \leq x \leq K$ 包含于上述范围之内，从而是恰当的。超几何分布的概率函数公式通常相当难处理。事实上，连验证

$$
\sum_{x=0}^{K} P(X = x) = \sum_{x=0}^{K} \frac{\dbinom{M}{x} \dbinom{N-M}{K-x}}{\dbinom{N}{K}} = 1
$$

都并非易事。超几何分布说明了这样的事实：统计上，处理有限总体（有限的 $N$）是一件困难的事。

超几何分布的均值由下式给出：

$$
\mathrm{E} X = \sum_{x=0}^{K} x\, \frac{\dbinom{M}{x} \dbinom{N-M}{K-x}}{\dbinom{N}{K}} = \sum_{x=1}^{K} x\, \frac{\dbinom{M}{x} \dbinom{N-M}{K-x}}{\dbinom{N}{K}}
\qquad （\text{当}\ x = 0\ \text{时被加项为零}）.
$$

为求值该表达式，使用恒等式（2.3 节已遇到）

$$
\binom{M}{x} = M \binom{M-1}{x-1}, \qquad \binom{N}{K} = \frac{N}{K} \binom{N-1}{K-1},
$$

得到

$$
\mathrm{E} X = \sum_{x=1}^{K} \frac{KM\, \dbinom{M-1}{x-1} \dbinom{N-M}{K-x}}{N\, \dbinom{N-1}{K-1}} = \frac{KM}{N} \sum_{x=1}^{K} \frac{\dbinom{M-1}{x-1} \dbinom{N-M}{K-x}}{\dbinom{N-1}{K-1}}.
$$

现在可以把上式第二个和识别为基于参数 $N-1$、$M-1$、$K-1$ 的另一个超几何分布的概率和。定义 $y = x - 1$ 即可看清：

$$
\sum_{x=1}^{K} \frac{\dbinom{M-1}{x-1} \dbinom{N-M}{K-x}}{\dbinom{N-1}{K-1}} = \sum_{y=0}^{K-1} \frac{\dbinom{M-1}{y} \dbinom{(N-1)-(M-1)}{K-1-y}}{\dbinom{N-1}{K-1}} = \sum_{y=0}^{K-1} P(Y = y \mid N-1, M-1, K-1) = 1,
$$

其中 $Y$ 是参数为 $N-1$、$M-1$、$K-1$ 的超几何随机变量。因此对超几何分布

$$
\mathrm{E} X = \frac{KM}{N}.
$$

一个类似但更冗长的计算可以建立

$$
\mathrm{Var} X = \frac{KM\,(N-M)(N-K)}{N^2 (N-1)}.
$$

注意这里计算 $\mathrm{E} X$ 所用的手法：把和式变换成另一个取不同参数值的超几何分布，识别出这一事实后即可求出级数的和。

> **例 3.2.1（验收抽样）**
>
> 超几何分布在验收抽样（acceptance sampling）中有应用。设零售商按批购买货物，每件商品要么合格要么有缺陷。令
>
> $$
> N = \text{一批中的件数}， \qquad M = \text{一批中的缺陷品数}.
> $$
>
> 则可以计算容量为 $K$ 的样本含 $x$ 件缺陷品的概率。具体地，设送达一批 25 个机器零件，零件只有通过公差检验才算合格。我们抽取十个零件，发现无缺陷（全部在公差内）。若这批 25 件中有 6 件缺陷品，这一事件的概率是多少？应用 $N = 25$、$M = 6$、$K = 10$ 的超几何分布：
>
> $$
> P(X = 0) = \frac{\dbinom{6}{0} \dbinom{19}{10}}{\dbinom{25}{10}} = 0.028,
> $$
>
> 可见若一批中有 6 件（甚至更多！）缺陷品，我们观察到的事件相当不可能。

### 二项分布（Binomial Distribution）

二项分布是最有用的离散分布之一，其基础是伯努利试验（Bernoulli trial）的想法。***伯努利试验***（以概率论奠基人之一 James Bernoulli 命名）是只有两个可能结果的试验。若

$$
X = \begin{cases}
1 & \text{以概率}\ p,\\
0 & \text{以概率}\ 1 - p,
\end{cases} \qquad 0 \leq p \leq 1, \tag{3.2.3}
$$

则称随机变量 $X$ 服从 $\mathrm{Bernoulli}(p)$ 分布。

$X = 1$ 常称为一次“成功”，$p$ 称为成功概率；$X = 0$ 称为一次“失败”。$\mathrm{Bernoulli}(p)$ 随机变量的均值与方差显然为

$$
\mathrm{E} X = 1 \cdot p + 0 \cdot (1 - p) = p,
$$

$$
\mathrm{Var} X = (1 - p)^2 p + (0 - p)^2 (1 - p) = p(1 - p).
$$

许多试验可以建模为伯努利试验序列：最简单的就是反复抛硬币，$p =$  出现正面的概率，硬币出现正面时 $X = 1$。其他例子包括赌博游戏（例如轮盘赌中红色出现时 $X = 1$，$p =$  红色的概率）、选举民调（候选人 A 得到一票时 $X = 1$）、疾病发生率（$p =$  随机一人被感染的概率）。

若进行 $n$ 次相同的伯努利试验，定义事件

$$
A_i = \{ \text{第}\ i\ \text{次试验中}\ X = 1 \}, \qquad i = 1, 2, \ldots, n.
$$

假设事件 $A_1, \ldots, A_n$ 相互独立（抛硬币即如此），则 $n$ 次试验中成功总次数的分布容易导出。定义随机变量

$$
Y = n\ \text{次试验中成功的总次数}.
$$

事件 $\{Y = y\}$ 发生当且仅当事件 $A_1, \ldots, A_n$ 中恰有 $y$ 个发生，从而必有 $n - y$ 个不发生。$n$ 次伯努利试验的一个特定结果（发生与不发生的一种特定排序）例如 $A_1 \cap A_2 \cap A_3^c \cap \cdots \cap A_{n-1} \cap A_n^c$，其发生概率为

$$
P(A_1 \cap A_2 \cap A_3^c \cap \cdots \cap A_{n-1} \cap A_n^c) = p\, p\, (1 - p) \cdots p\, (1 - p) = p^{y} (1 - p)^{n-y},
$$

计算中用到了诸 $A_i$ 的独立性。注意该计算不依赖于哪 $y$ 个 $A_i$ 发生，只要有某 $y$ 个发生即可；而且无论哪 $y$ 个 $A_i$ 发生，事件 $\{Y = y\}$ 都会发生。综合起来：恰好含 $y$ 次成功的 $n$ 次试验的特定序列，其发生概率为 $p^y (1-p)^{n-y}$。由于这样的序列共有 $\binom{n}{y}$ 个（$y$ 个 1 与 $n - y$ 个 0 的排列数），故

$$
P(Y = y \mid n, p) = \binom{n}{y} p^{y} (1 - p)^{n-y}, \qquad y = 0, 1, 2, \ldots, n,
$$

并称 $Y$ 为 $\mathrm{binomial}(n, p)$ 随机变量。

随机变量 $Y$ 也可以用如下等价方式定义：在 $n$ 次相同的独立伯努利试验（每次成功概率为 $p$）中，定义随机变量

$$
X_i = \begin{cases} 1 & \text{以概率}\ p,\\ 0 & \text{以概率}\ 1 - p, \end{cases} \qquad i = 1, \ldots, n.
$$

则随机变量

$$
Y = \sum_{i=1}^{n} X_i
$$

服从 $\mathrm{binomial}(n, p)$ 分布。

$\sum_{y=0}^{n} P(Y = y) = 1$ 这一事实由下面的一般定理得出。

> **定理 3.2.2（二项式定理，Binomial Theorem）**
>
> 对任意实数 $x$ 与 $y$ 及整数 $n \geq 0$，
>
> $$
> (x + y)^n = \sum_{i=0}^{n} \binom{n}{i} x^{i} y^{n-i}. \tag{3.2.4}
> $$
>
> **证明**　写
>
> $$
> (x + y)^n = (x + y)(x + y) \cdots (x + y),
> $$
>
> 考虑右端如何计算：从每个因子 $(x + y)$ 中选出 $x$ 或 $y$，把 $n$ 次选择相乘。对每个 $i = 0, 1, \ldots, n$，$x$ 恰出现 $i$ 次的项有 $\binom{n}{i}$ 个。因此该类项形如 $\binom{n}{i} x^i y^{n-i}$，结论即得。 ∎

在 (3.2.4) 中取 $x = p$、$y = 1 - p$，得

$$
1 = \bigl( p + (1 - p) \bigr)^{n} = \sum_{i=0}^{n} \binom{n}{i} p^{i} (1 - p)^{n-i},
$$

可见和式中每一项都是二项概率。另一个特例：在定理 3.2.2 中取 $x = y = 1$，得恒等式

$$
2^n = \sum_{i=0}^{n} \binom{n}{i}.
$$

二项分布的均值与方差已在例 2.2.3 与例 2.3.5 中导出，此处不再重复推导。为完整起见陈述如下：若 $X \sim \mathrm{binomial}(n, p)$，则

$$
\mathrm{E} X = np, \qquad \mathrm{Var} X = np(1 - p).
$$

二项分布的 mgf 已在例 2.3.9 中算得：

$$
M_X(t) = \bigl[ p e^t + (1 - p) \bigr]^{n}.
$$

> **例 3.2.3（骰子概率）**
>
> 设我们想求掷一枚均匀骰子四次至少出现一次 6 的概率。该试验可以建模为成功概率 $p = \tfrac{1}{6} = P(\text{骰子掷出 6})$ 的四次伯努利试验序列。定义
>
> $$
> X = \text{四次投掷中 6 的总次数}.
> $$
>
> 则 $X \sim \mathrm{binomial}\bigl( 4, \tfrac{1}{6} \bigr)$，且
>
> $$
> \begin{aligned}
> P(\text{至少一个 6}) = P(X > 0) = 1 - P(X = 0) &= 1 - \binom{4}{0} \Bigl( \frac{1}{6} \Bigr)^{0} \Bigl( \frac{5}{6} \Bigr)^{4}\\
> &= 1 - \Bigl( \frac{5}{6} \Bigr)^{4} = 0.518.
> \end{aligned}
> $$
>
> 现在考虑另一种游戏：掷一对骰子 24 次，求至少出现一次双 6 的概率。这同样可以用二项分布建模，成功概率为
>
> $$
> p = P(\text{掷出双 6}) = \frac{1}{36}.
> $$
>
> 设 $Y = 24$ 次投掷中双 6 的次数，则 $Y \sim \mathrm{binomial}\bigl( 24, \tfrac{1}{36} \bigr)$，且
>
> $$
> \begin{aligned}
> P(\text{至少一次双 6}) = P(Y > 0) = 1 - P(Y = 0) &= 1 - \binom{24}{0} \Bigl( \frac{1}{36} \Bigr)^{0} \Bigl( \frac{35}{36} \Bigr)^{24}\\
> &= 1 - \Bigl( \frac{35}{36} \Bigr)^{24} = 0.491.
> \end{aligned}
> $$
>
> 这正是十八世纪帕斯卡应赌徒德·梅雷之请所做的计算；德·梅雷以为两个事件概率相同。（当他开始在第二种赌注上输钱时，才开始相信自己错了。）

### 泊松分布（Poisson Distribution）

泊松分布是应用极广的离散分布，可以作为多种不同类型试验的模型。例如，若我们在为“等待某事发生”的现象建模（等公共汽车、等顾客到达银行），给定时间区间内事件发生的次数有时可用泊松分布建模。泊松分布的基本假设之一是：对小区间而言，事件到达的概率与等待时间长度成正比。这使得它对上述情形是合理的模型。例如，等得越久，顾客越可能走进银行，这一假设是合理的。杂记一节将给出更正式的处理。

另一个应用领域是空间分布，例如泊松分布可用于为某区域内炸弹落点的分布或湖中鱼的分布建模。

泊松分布有单一参数 $\lambda$，有时称为强度参数（intensity parameter）。取值为非负整数的随机变量 $X$，若

$$
P(X = x \mid \lambda) = \frac{e^{-\lambda} \lambda^{x}}{x!}, \qquad x = 0, 1, \ldots, \tag{3.2.5}
$$

则称 $X$ 服从 $\mathrm{Poisson}(\lambda)$ 分布。

为证 $\sum_{x=0}^{\infty} P(X = x \mid \lambda) = 1$，回顾 $e^y$ 的泰勒级数展开：

$$
e^{y} = \sum_{i=0}^{\infty} \frac{y^i}{i!}.
$$

于是

$$
\sum_{x=0}^{\infty} P(X = x \mid \lambda) = e^{-\lambda} \sum_{x=0}^{\infty} \frac{\lambda^x}{x!} = e^{-\lambda}\, e^{\lambda} = 1.
$$

$X$ 的均值容易看出：

$$
\begin{aligned}
\mathrm{E} X &= \sum_{x=0}^{\infty} x\, \frac{e^{-\lambda} \lambda^x}{x!} = \sum_{x=1}^{\infty} x\, \frac{e^{-\lambda} \lambda^x}{x!}\\
&= \lambda e^{-\lambda} \sum_{x=1}^{\infty} \frac{\lambda^{x-1}}{(x-1)!}\\
&= \lambda e^{-\lambda} \sum_{y=0}^{\infty} \frac{\lambda^{y}}{y!} \qquad （\text{代入}\ y = x - 1）\\
&= \lambda.
\end{aligned}
$$

类似计算可得

$$
\mathrm{Var} X = \lambda,
$$

故参数 $\lambda$ 既是泊松分布的均值也是其方差。mgf 也可直接算得，同样借助 $e^y$ 的泰勒级数：

$$
M_X(t) = e^{\lambda (e^t - 1)}.
$$

（见习题 2.33 与例 2.3.13。）

> **例 3.2.4（等待时间）**
>
> 作为“等待事件发生”应用的例子，考虑一位电话接线员，平均每三分钟接五个电话。下一分钟没有电话的概率是多少？至少两个电话呢？
>
> 设 $X =$  一分钟内的电话数，则 $X$ 服从泊松分布，$\mathrm{E} X = \lambda = \tfrac{5}{3}$。于是
>
> $$
> P(\text{下一分钟没有电话}) = P(X = 0) = \frac{e^{-5/3} \bigl( \tfrac{5}{3} \bigr)^{0}}{0!} = e^{-5/3} = 0.189;
> $$
>
> $$
> \begin{aligned}
> P(\text{下一分钟至少两个电话}) = P(X \geq 2) &= 1 - P(X = 0) - P(X = 1)\\
> &= 1 - 0.189 - \frac{e^{-5/3} \bigl( \tfrac{5}{3} \bigr)^{1}}{1!}\\
> &= 0.496.
> \end{aligned}
> $$

注意到下面的递推关系，泊松概率可以快速计算：

$$
P(X = x) = \frac{\lambda}{x}\, P(X = x - 1), \qquad x = 1, 2, \ldots \tag{3.2.6}
$$

该关系写出泊松的 pmf 即可轻易证明。其他离散分布也有类似关系。例如若 $Y \sim \mathrm{binomial}(n, p)$，则

$$
P(Y = y) = \frac{(n - y + 1)\, p}{y\, (1 - p)}\, P(Y = y - 1). \tag{3.2.7}
$$

递推关系 (3.2.6) 与 (3.2.7) 可用来建立泊松对二项的近似——2.3 节已用 mgf 论证过该近似。令 $\lambda = np$，当 $p$ 小时可写

$$
\frac{(n - y + 1)\, p}{y\, (1 - p)} = \frac{np - p(y - 1)}{y - py} \approx \frac{\lambda}{y},
$$

因为 $p$ 小时 $p(y-1)$ 与 $py$ 可以忽略。因此在这一近似水平上，(3.2.7) 化为

$$
P(Y = y) = \frac{\lambda}{y}\, P(Y = y - 1), \tag{3.2.8}
$$

这正是泊松的递推关系。所以要完成该近似，只需再证 $P(X = 0) \approx P(Y = 0)$，其余概率都将由 (3.2.8) 跟出。现在

$$
P(Y = 0) = (1 - p)^{n} = \Bigl( 1 - \frac{np}{n} \Bigr)^{n} = \Bigl( 1 - \frac{\lambda}{n} \Bigr)^{n},
$$

其中用了 $np = \lambda$。回忆 2.3 节：对固定的 $\lambda$，$\lim_{n \to \infty} \bigl( 1 - (\lambda/n) \bigr)^{n} = e^{-\lambda}$，故对大的 $n$ 有近似

$$
P(Y = 0) = \Bigl( 1 - \frac{\lambda}{n} \Bigr)^{n} \approx e^{-\lambda} = P(X = 0),
$$

泊松对二项的近似就此完成。

该近似在 $n$ 大而 $p$ 小时有效，而这恰是它最有用之处：使我们免于对大 $n$ 计算二项式系数与幂。

> **例 3.2.5（泊松近似）**
>
> 某排版员平均每排 500 个词错一个。一页典型的书含 300 个词。五页中错误不超过两个的概率是多少？
>
> 若设排一个词是成功概率 $p = \tfrac{1}{500}$ 的伯努利试验（注意我们把“错误”标记为“成功”），且各次试验相互独立，则 $X =$  五页（1500 词）中的错误数服从 $\mathrm{binomial}\bigl( 1500, \tfrac{1}{500} \bigr)$。于是
>
> $$
> P(\text{错误不超过两个}) = P(X \leq 2) = \sum_{x=0}^{2} \binom{1500}{x} \Bigl( \frac{1}{500} \Bigr)^{x} \Bigl( \frac{499}{500} \Bigr)^{1500-x} = 0.4230,
> $$
>
> 这是相当繁琐的计算。若用 $\lambda = 1500 \times \tfrac{1}{500} = 3$ 的泊松近似，则有
>
> $$
> P(X \leq 2) \approx e^{-3} \Bigl( 1 + 3 + \frac{3^2}{2} \Bigr) = 0.4232.
> $$

### 负二项分布（Negative Binomial Distribution）

二项分布计数的是固定次数的伯努利试验中成功的次数。若改为计数获得固定成功次数所需的伯努利试验次数，就得到负二项分布。

在独立 $\mathrm{Bernoulli}(p)$ 试验序列中，设随机变量 $X$ 表示第 $r$ 次成功发生的那次试验，其中 $r$ 是固定整数。则

$$
P(X = x \mid r, p) = \binom{x - 1}{r - 1} p^{r} (1 - p)^{x - r}, \qquad x = r, r + 1, \ldots \tag{3.2.9}
$$

并称 $X$ 服从 $\mathrm{negative\ binomial}(r, p)$ 分布。

(3.2.9) 的推导从二项分布即可快速完成：事件 $\{X = x\}$ 发生当且仅当前 $x - 1$ 次试验中恰有 $r - 1$ 次成功且第 $x$ 次试验成功。前 $x - 1$ 次试验中 $r - 1$ 次成功的概率是二项概率 $\binom{x-1}{r-1} p^{r-1} (1-p)^{x-r}$，第 $x$ 次试验成功的概率为 $p$。两概率相乘即得 (3.2.9)。

负二项分布有时用随机变量 $Y =$  第 $r$ 次成功之前的失败次数来定义。由于 $Y = X - r$，这一表述与上述以 $X =$  第 $r$ 次成功发生的试验来定义在统计上等价。利用 $Y$ 与 $X$ 的关系，负二项分布的另一种形式为

$$
P(Y = y) = \binom{r + y - 1}{y} p^{r} (1 - p)^{y}, \qquad y = 0, 1, \ldots \tag{3.2.10}
$$

除非另有说明，提到 $\mathrm{negative\ binomial}(r, p)$ 分布时我们都用这个 pmf。

负二项分布得名于关系式

$$
\binom{r + y - 1}{y} = (-1)^{y} \binom{-r}{y} = (-1)^{y}\, \frac{(-r)(-r-1)(-r-2) \cdots (-r - y + 1)}{(y)(y-1)(y-2) \cdots (2)(1)},
$$

这实际上是关于负整数的二项式系数的定义式（完整论述见 Feller (1968)）。代入 (3.2.10) 得

$$
P(Y = y) = (-1)^{y} \binom{-r}{y} p^{r} (1 - p)^{y},
$$

与二项分布惊人地相似。

$\sum_{y=0}^{\infty} P(Y = y) = 1$ 不易直接验证，但可由二项式定理向负指数的推广得到，此处不深入。关于二项式系数的精彩论述见 Feller (1968)。

$Y$ 的均值与方差可用类似于二项分布的技巧计算：

$$
\begin{aligned}
\mathrm{E} Y &= \sum_{y=0}^{\infty} y \binom{r + y - 1}{y} p^{r} (1 - p)^{y}\\
&= \sum_{y=1}^{\infty} \frac{y\, (r + y - 1)!}{(y-1)!\, (r-1)!}\, p^{r} (1 - p)^{y}\\
&= \sum_{y=1}^{\infty} r \binom{r + y - 1}{y - 1}\, p^{r} (1 - p)^{y}.
\end{aligned}
$$

写 $z = y - 1$，和式变为

$$
\begin{aligned}
\mathrm{E} Y &= \sum_{z=0}^{\infty} r \binom{r + z}{z}\, p^{r} (1 - p)^{z + 1}\\
&= r\, \frac{1 - p}{p} \sum_{z=0}^{\infty} \binom{(r + 1) + z - 1}{z}\, p^{r+1} (1 - p)^{z} \qquad （\text{被加项是负二项 pmf}）\\
&= r\, \frac{1 - p}{p}.
\end{aligned}
$$

因为该和式是对 $\mathrm{negative\ binomial}(r+1, p)$ 分布所有取值的求和，故等于 1。类似计算可得

$$
\mathrm{Var} Y = \frac{r(1 - p)}{p^2}.
$$

负二项分布有一个有趣的、有时很有用的以均值表述的再参数化。若定义参数 $\mu = r(1 - p)/p$，则 $\mathrm{E} Y = \mu$，且稍作代数运算可得

$$
\mathrm{Var} Y = \mu + \frac{\mu^2}{r}.
$$

方差是均值的二次函数。这一关系在数据分析与理论考虑中都很有用（Morris 1982）。

负二项分布族把泊松分布作为极限情形包含在内。若 $r \to \infty$ 且 $p \to 1$ 使得 $r(1 - p) \to \lambda$（$0 < \lambda < \infty$），则

$$
\mathrm{E} Y = \frac{r(1 - p)}{p} \to \lambda, \qquad \mathrm{Var} Y = \frac{r(1 - p)}{p^2} \to \lambda,
$$

与泊松的均值和方差一致。要证明 $\mathrm{negative\ binomial}(r, p) \to \mathrm{Poisson}(\lambda)$，可以证明所有概率都收敛；mgf 收敛的事实使我们预期这一点（见习题 3.15）。

> **例 3.2.6（逆二项抽样）**
>
> 一种称为逆二项抽样（inverse binomial sampling）的技术在生物总体抽样中很有用。若具有某特征的个体比例为 $p$，我们抽样直到见到 $r$ 个这样的个体为止，则所抽取的个体数是负二项随机变量。
>
> 例如，设在果蝇总体中我们关心残翅个体的比例，并决定抽样直到找到 100 只这样的果蝇。我们至少要检查 $N$ 只果蝇的概率为（用 (3.2.9)）
>
> $$
> \begin{aligned}
> P(X \geq N) &= \sum_{x=N}^{\infty} \binom{x - 1}{99} p^{100} (1 - p)^{x - 100}\\
> &= 1 - \sum_{x=100}^{N-1} \binom{x - 1}{99} p^{100} (1 - p)^{x - 100}.
> \end{aligned}
> $$
>
> 对给定的 $p$ 与 $N$，求值该表达式即可确定我们大概要检查多少只果蝇。（虽然求值繁琐，使用递推关系可以加快速度。）

例 3.2.6 表明，负二项分布与泊松分布一样，可用于为“等待事件发生”的现象建模；在负二项情形中，我们等待的是指定数目的成功。

### 几何分布（Geometric Distribution）

几何分布是最简单的等待时间分布，是负二项分布的特例。在 (3.2.9) 中令 $r = 1$，得

$$
P(X = x \mid p) = p (1 - p)^{x - 1}, \qquad x = 1, 2, \ldots
$$

这定义了成功概率为 $p$ 的几何随机变量 $X$ 的 pmf。$X$ 可解释为首次成功发生的试验序号，即我们在“等待一次成功”。$\sum_{x=1}^{\infty} P(X = x) = 1$ 由几何级数的性质得出：对任何满足 $|a| < 1$ 的数 $a$，

$$
\sum_{x=1}^{\infty} a^{x-1} = \frac{1}{1 - a},
$$

这在例 1.5.4 中已经遇到过。

$X$ 的均值与方差可用负二项公式并写 $X = Y + 1$ 得到：

$$
\mathrm{E} X = \mathrm{E} Y + 1 = \frac{1}{p}, \qquad \mathrm{Var} X = \frac{1 - p}{p^2}.
$$

几何分布有一个有趣的性质，称为“无记忆性”（memoryless property）。对整数 $s > t$，

$$
P(X > s \mid X > t) = P(X > s - t); \tag{3.2.11}
$$

即几何分布“忘记”已经发生了什么。已经观察到 $t$ 次失败后再得 $s - t$ 次失败的概率，与序列一开始就观察到 $s - t$ 次失败的概率相同。换言之，得到一串失败的概率只依赖于游程的长度，而不依赖于其位置。

为建立 (3.2.11)，先注意对任意整数 $n$，

$$
P(X > n) = P(n\ \text{次试验中无成功}) = (1 - p)^{n}, \tag{3.2.12}
$$

从而

$$
\begin{aligned}
P(X > s \mid X > t) &= \frac{P(X > s\ \text{且}\ X > t)}{P(X > t)}\\
&= \frac{P(X > s)}{P(X > t)} \qquad （\text{因为}\ s > t）\\
&= (1 - p)^{s - t}\\
&= P(X > s - t).
\end{aligned}
$$

> **例 3.2.7（失效时间）**
>
> 几何分布有时用于为部件的“寿命”或“直到失效的时间”建模。例如，若灯泡在任意给定日失效的概率为 $0.001$，则它至少能用 30 天的概率为
>
> $$
> P(X > 30) = \sum_{x=31}^{\infty} 0.001\, (1 - 0.001)^{x-1} = (0.999)^{30} = 0.970.
> $$

几何分布的无记忆性描述了一种非常特殊的“不老化”性质：它表明几何分布不适用于为失效概率随时间增加的寿命建模。还有其他分布用于为各种类型的老化建模，例如参见 Barlow and Proschan (1975)。

## 3.3 连续分布（Continuous Distributions）

本节讨论一些较常用的连续分布族，即那些名字广为人知的分布。这里提到的分布绝不构成统计学中所用分布的全部；事实上，正如 1.6 节所见，任何非负的可积函数都可以变成一个 pdf。

### 均匀分布（Uniform Distribution）

连续均匀分布由把质量均匀铺展在区间 $[a, b]$ 上来定义，其 pdf 为

$$
f(x \mid a, b) = \begin{cases} \dfrac{1}{b - a} & \text{若}\ x \in [a, b],\\[4pt] 0 & \text{其他}. \end{cases} \tag{3.3.1}
$$

容易验证 $\int_a^b f(x)\, dx = 1$。还有

$$
\mathrm{E} X = \int_a^{b} \frac{x}{b - a}\, dx = \frac{b + a}{2},
$$

$$
\mathrm{Var} X = \int_a^{b} \frac{\bigl( x - \frac{b+a}{2} \bigr)^2}{b - a}\, dx = \frac{(b - a)^2}{12}.
$$

### 伽马分布（Gamma Distribution）

伽马分布族是 $[0, \infty)$ 上的一族灵活的分布，可以由 1.6 节讨论的构造导出。若 $\alpha$ 是正常数，则积分

$$
\int_0^{\infty} t^{\alpha - 1} e^{-t}\, dt
$$

有限。当 $\alpha$ 是正整数时该积分可以写成闭式，否则不能。无论哪种情形，其值都定义了***伽马函数***（gamma function）：

$$
\Gamma(\alpha) = \int_0^{\infty} t^{\alpha - 1} e^{-t}\, dt. \tag{3.3.2}
$$

伽马函数满足许多有用关系，特别地

$$
\Gamma(\alpha + 1) = \alpha\, \Gamma(\alpha), \qquad \alpha > 0, \tag{3.3.3}
$$

可用分部积分验证。把 (3.3.3) 与容易验证的 $\Gamma(1) = 1$ 结合，得：对任意正整数 $n$，

$$
\Gamma(n) = (n - 1)!. \tag{3.3.4}
$$

（另一个有用的特例将在 (3.3.15) 中见到：$\Gamma\bigl( \tfrac{1}{2} \bigr) = \sqrt{\pi}$。）

表达式 (3.3.3) 与 (3.3.4) 给出便于计算伽马函数值的递推关系：借助于递推，只需知道 $\Gamma(c)$（$0 < c \leq 1$）的值就能计算伽马函数在任何点的值。

由于 (3.3.2) 中的被积函数为正，立即可知

$$
f(t) = \frac{t^{\alpha - 1} e^{-t}}{\Gamma(\alpha)}, \qquad 0 < t < \infty \tag{3.3.5}
$$

是 pdf。不过完整的伽马族有两个参数：对 (3.3.5) 中的随机变量 $T$ 做变量变换以求 $X = \beta T$ 的 pdf（$\beta$ 为正常数），即得 $\mathrm{gamma}(\alpha, \beta)$ 族：

$$
f(x \mid \alpha, \beta) = \frac{1}{\Gamma(\alpha) \beta^{\alpha}}\, x^{\alpha - 1} e^{-x/\beta}, \qquad 0 < x < \infty, \quad \alpha > 0, \quad \beta > 0. \tag{3.3.6}
$$

参数 $\alpha$ 称为***形状参数***（shape parameter），因为它对分布尖峰程度的影响最大；参数 $\beta$ 称为***尺度参数***（scale parameter），因为它主要影响分布的散布。

$\mathrm{gamma}(\alpha, \beta)$ 分布的均值为

$$
\mathrm{E} X = \frac{1}{\Gamma(\alpha) \beta^{\alpha}} \int_0^{\infty} x\, x^{\alpha - 1} e^{-x/\beta}\, dx. \tag{3.3.7}
$$

为求值 (3.3.7)，注意被积函数是 $\mathrm{gamma}(\alpha + 1, \beta)$ pdf 的核。由 (3.3.6) 知对任意 $\alpha, \beta > 0$，

$$
\int_0^{\infty} x^{\alpha - 1} e^{-x/\beta}\, dx = \Gamma(\alpha) \beta^{\alpha}, \tag{3.3.8}
$$

故

$$
\begin{aligned}
\mathrm{E} X &= \frac{1}{\Gamma(\alpha) \beta^{\alpha}} \int_0^{\infty} x^{\alpha} e^{-x/\beta}\, dx\\
&= \frac{1}{\Gamma(\alpha) \beta^{\alpha}}\, \Gamma(\alpha + 1)\, \beta^{\alpha + 1}\\
&= \frac{\alpha\, \Gamma(\alpha)\, \beta}{\Gamma(\alpha)} \qquad （\text{由}\ (3.3.3)）\\
&= \alpha \beta.
\end{aligned}
$$

注意求 $\mathrm{E} X$ 时我们再次使用了“把积分识别为另一个 pdf 的核”的技巧（例 2.3.8 计算伽马 mgf 时、例 2.2.3 与例 2.3.5 的离散二项计算中都已用过这一技巧）。

$\mathrm{gamma}(\alpha, \beta)$ 分布的方差以类似于均值的方式计算；特别地，计算 $\mathrm{E} X^2$ 时处理的是 $\mathrm{gamma}(\alpha + 2, \beta)$ 分布的核。结果是

$$
\mathrm{Var} X = \alpha \beta^2.
$$

例 2.3.8 已算得 $\mathrm{gamma}(\alpha, \beta)$ 分布的 mgf：

$$
M_X(t) = \Bigl( \frac{1}{1 - \beta t} \Bigr)^{\alpha}, \qquad t < \frac{1}{\beta}.
$$

> **例 3.3.1（伽马—泊松关系）**
>
> 伽马分布与泊松分布之间有一个有趣的关系。设 $X$ 是 $\mathrm{gamma}(\alpha, \beta)$ 随机变量，$\alpha$ 为整数，则对任意 $x$，
>
> $$
> P(X \leq x) = P(Y \geq \alpha), \tag{3.3.9}
> $$
>
> 其中 $Y \sim \mathrm{Poisson}(x/\beta)$。等式 (3.3.9) 可通过连续的分部积分建立。因 $\alpha$ 是整数，写 $\Gamma(\alpha) = (\alpha - 1)!$，得
>
> $$
> P(X \leq x) = \frac{1}{(\alpha - 1)!\, \beta^{\alpha}} \int_0^{x} t^{\alpha - 1} e^{-t/\beta}\, dt
> $$
>
> $$
> = \frac{1}{(\alpha - 1)!\, \beta^{\alpha}} \Bigl[ \Bigl. -t^{\alpha - 1} \beta e^{-t/\beta} \Bigr|_0^{x} + \int_0^{x} (\alpha - 1)\, t^{\alpha - 2}\, \beta e^{-t/\beta}\, dt \Bigr],
> $$
>
> 这里分部积分取 $u = t^{\alpha - 1}$，$dv = e^{-t/\beta}\, dt$。继续求值：
>
> $$
> P(X \leq x) = \frac{-1}{(\alpha - 1)!\, \beta^{\alpha - 1}}\, x^{\alpha - 1} e^{-x/\beta} + \frac{1}{(\alpha - 2)!\, \beta^{\alpha - 1}} \int_0^{x} t^{\alpha - 2} e^{-t/\beta}\, dt
> $$
>
> $$
> = \frac{1}{(\alpha - 2)!\, \beta^{\alpha - 1}} \int_0^{x} t^{\alpha - 2} e^{-t/\beta}\, dt - P(Y = \alpha - 1),
> $$
>
> 其中 $Y \sim \mathrm{Poisson}(x/\beta)$。如此继续即可建立 (3.3.9)。（见习题 3.19。）

伽马分布有几个重要的特例。若取 $\alpha = p/2$（$p$ 为整数）且 $\beta = 2$，则伽马 pdf 变为

$$
f(x \mid p) = \frac{1}{\Gamma(p/2)\, 2^{p/2}}\, x^{(p/2) - 1} e^{-x/2}, \qquad 0 < x < \infty, \tag{3.3.10}
$$

这是自由度为 $p$ 的卡方（chi-squared）pdf。卡方分布的均值、方差与 mgf 都可以用前面导出的伽马公式计算。卡方分布在统计推断中扮演重要角色，尤其是从正态分布抽样时；这一主题将在第 5 章详细讨论。

伽马分布另一个重要的特例是取 $\alpha = 1$：

$$
f(x \mid \beta) = \frac{1}{\beta}\, e^{-x/\beta}, \qquad 0 < x < \infty, \tag{3.3.11}
$$

即尺度参数为 $\beta$ 的指数 pdf。其均值与方差已在例 2.2.2 与例 2.3.3 中算得。

指数分布可用于为寿命建模，类似于离散情形中几何分布的用法。事实上，指数分布与几何分布共享“无记忆性”。若 $X \sim \mathrm{exponential}(\beta)$，即 pdf 由 (3.3.11) 给出，则对 $s > t \geq 0$，

$$
P(X > s \mid X > t) = P(X > s - t),
$$

因为

$$
\begin{aligned}
P(X > s \mid X > t) &= \frac{P(X > s,\ X > t)}{P(X > t)}\\
&= \frac{P(X > s)}{P(X > t)} \qquad （\text{因为}\ s > t）\\
&= \frac{\displaystyle\int_s^{\infty} \frac{1}{\beta}\, e^{-x/\beta}\, dx}{\displaystyle\int_t^{\infty} \frac{1}{\beta}\, e^{-x/\beta}\, dx}\\
&= \frac{e^{-s/\beta}}{e^{-t/\beta}}\\
&= e^{-(s - t)/\beta}\\
&= P(X > s - t).
\end{aligned}
$$

另一个既与指数族又与伽马族相关的分布是威布尔分布（Weibull distribution）。若 $X \sim \mathrm{exponential}(\beta)$，则 $Y = X^{1/\gamma}$ 服从 $\mathrm{Weibull}(\gamma, \beta)$ 分布：

$$
f_Y(y \mid \gamma, \beta) = \frac{\gamma}{\beta}\, y^{\gamma - 1} e^{-y^{\gamma}/\beta}, \qquad 0 < y < \infty, \quad \gamma > 0, \quad \beta > 0. \tag{3.3.12}
$$

显然我们也可以从威布尔出发，把指数作为特例（$\gamma = 1$）导出——这只是口味问题。威布尔分布在失效时间数据分析中扮演极重要的角色（该主题的全面论述见 Kalbfleisch and Prentice (1980)）。威布尔分布对为风险函数（hazard function）建模尤其有用（见习题 3.25 与 3.26）。

### 正态分布（Normal Distribution）

正态分布（有时称为高斯分布，Gaussian distribution）在大量统计问题中扮演核心角色，主要有三个原因。第一，正态分布及其相关分布在解析上非常易于处理（尽管初看未必如此）。第二，正态分布具有人们熟悉的钟形，其对称性使其成为许多总体模型的诱人选择；虽然也有许多其他钟形分布，但大多不具备正态分布的解析可处理性。第三，有中心极限定理（详见第 5 章）：在温和条件下，正态分布可用于在大样本中近似多种多样的分布。

正态分布有两个参数，通常记作 $\mu$ 与 $\sigma^2$，即其均值与方差。均值为 $\mu$、方差为 $\sigma^2$ 的正态分布（通常记作 $n(\mu, \sigma^2)$）的 pdf 为

$$
f(x \mid \mu, \sigma^2) = \frac{1}{\sqrt{2\pi}\, \sigma}\, e^{-(x - \mu)^2 / (2\sigma^2)}, \qquad -\infty < x < \infty. \tag{3.3.13}
$$

若 $X \sim n(\mu, \sigma^2)$，则随机变量 $Z = (X - \mu)/\sigma$ 服从 $n(0, 1)$ 分布，也称标准正态（standard normal）。这容易建立：

$$
\begin{aligned}
P(Z \leq z) &= P\Bigl( \frac{X - \mu}{\sigma} \leq z \Bigr)\\
&= P(X \leq z \sigma + \mu)\\
&= \frac{1}{\sqrt{2\pi}\, \sigma} \int_{-\infty}^{z\sigma + \mu} e^{-(x - \mu)^2 / (2\sigma^2)}\, dx\\
&= \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{z} e^{-t^2/2}\, dt, \qquad （\text{代入}\ t = \frac{x - \mu}{\sigma}）
\end{aligned}
$$

可见 $P(Z \leq z)$ 就是标准正态 cdf。

因此一切正态概率都可以用标准正态表出。进而，期望的计算可先在 $n(0,1)$ 情形完成细节，再变换回 $n(\mu, \sigma^2)$ 情形。例如若 $Z \sim n(0, 1)$，

$$
\mathrm{E} Z = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} z\, e^{-z^2/2}\, dz = \left. -\frac{1}{\sqrt{2\pi}}\, e^{-z^2/2} \right|_{-\infty}^{\infty} = 0,
$$

于是若 $X \sim n(\mu, \sigma^2)$，由定理 2.2.5 得

$$
\mathrm{E} X = \mathrm{E}(\mu + \sigma Z) = \mu + \sigma\, \mathrm{E} Z = \mu.
$$

类似地 $\mathrm{Var} Z = 1$，用定理 2.3.4 得 $\mathrm{Var} X = \sigma^2$。

我们尚未证明 (3.3.13) 在整条实数轴上积分为 1。利用标准化变换，只需证明

$$
\frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} e^{-z^2/2}\, dz = 1.
$$

注意上面积分的被积函数关于 0 对称，故 $(-\infty, 0)$ 上的积分等于 $(0, \infty)$ 上的积分。于是问题约化为证明

$$
\int_0^{\infty} e^{-z^2/2}\, dz = \frac{\sqrt{2\pi}}{2} = \sqrt{\frac{\pi}{2}}. \tag{3.3.14}
$$

函数 $e^{-z^2/2}$ 没有能用初等函数显式写出的原函数（即没有闭式原函数），故无法直接积分。事实上，这种积分要么“你会做”，要么你会在原地打转很久。既然 (3.3.14) 两侧均为正，只需证明两侧的平方相等即可。把 (3.3.14) 中的积分平方：

$$
\Bigl( \int_0^{\infty} e^{-z^2/2}\, dz \Bigr)^{2} = \Bigl( \int_0^{\infty} e^{-t^2/2}\, dt \Bigr) \Bigl( \int_0^{\infty} e^{-u^2/2}\, du \Bigr) = \int_0^{\infty} \int_0^{\infty} e^{-(t^2 + u^2)/2}\, dt\, du.
$$

积分变量只是哑变量，改名无妨。现转换为极坐标，定义

$$
t = r \cos\theta, \qquad u = r \sin\theta.
$$

则 $t^2 + u^2 = r^2$，$dt\, du = r\, d\theta\, dr$，积分限变为 $0 < r < \infty$、$0 < \theta < \pi/2$（$\theta$ 的上限是 $\pi/2$，因为 $t$ 与 $u$ 限制为正）。于是

$$
\int_0^{\infty} \int_0^{\infty} e^{-(t^2 + u^2)/2}\, dt\, du = \int_0^{\infty} \int_0^{\pi/2} r\, e^{-r^2/2}\, d\theta\, dr
$$

$$
= \frac{\pi}{2} \int_0^{\infty} r\, e^{-r^2/2}\, dr
= \frac{\pi}{2} \left. \Bigl( -e^{-r^2/2} \Bigr) \right|_0^{\infty}
= \frac{\pi}{2},
$$

(3.3.14) 得证。

该积分与伽马函数密切相关：事实上在 (3.3.14) 中作代换 $w = \tfrac{1}{2} z^2$，可见该积分本质上是 $\Gamma\bigl( \tfrac{1}{2} \bigr)$。只要小心配好常数，就能看到 (3.3.14) 蕴含

$$
\Gamma\Bigl( \frac{1}{2} \Bigr) = \int_0^{\infty} w^{-1/2} e^{-w}\, dw = \sqrt{\pi}. \tag{3.3.15}
$$

正态分布在如下意义上颇为特殊：其两个参数 $\mu$（均值）与 $\sigma^2$（方差）为我们提供了关于分布形状与位置的完全信息。“分布由 $\mu$ 与 $\sigma^2$ 决定”这一性质并非正态 pdf 独有，而是被称为位置—尺度族（location–scale families）的一族 pdf 所共享，见 3.5 节。

直接的微积分计算表明正态 pdf (3.3.13) 在 $x = \mu$ 处取最大值，拐点（曲线由凹变凸之处）在 $\mu \pm \sigma$。此外，均值左右 1、2、3 个标准差范围内的概率含量为

$$
\begin{aligned}
P(|X - \mu| \leq \sigma) &= P(|Z| \leq 1) = 0.6826\\
P(|X - \mu| \leq 2\sigma) &= P(|Z| \leq 2) = 0.9544\\
P(|X - \mu| \leq 3\sigma) &= P(|Z| \leq 3) = 0.9974,
\end{aligned}
$$

其中 $X \sim n(\mu, \sigma^2)$，$Z \sim n(0, 1)$，数值可由许多软件包或数表获得。常报出的两位数近似值为 $0.68$、$0.95$、$0.99$；虽非精确的四舍五入值，却是惯用值。图 3.3.1 展示了正态 pdf 及这些关键特征。

![ch03_fig_3_3_1](fig/ch03_fig_3_3_1.png)

*图 3.3.1　 标准正态密度（原书 Figure 3.3.1）*

在正态分布的众多用途中，重要的一种是作为其他分布的近似（中心极限定理部分地为其提供了依据）。例如若 $X \sim \mathrm{binomial}(n, p)$，则 $\mathrm{E} X = np$，$\mathrm{Var} X = np(1 - p)$；在适当条件下，$X$ 的分布可用均值 $\mu = np$、方差 $\sigma^2 = np(1-p)$ 的正态随机变量近似。所谓“适当条件”是：$n$ 应当大，且 $p$ 不应极端（接近 0 或 1）。$n$ 要大，才能使 $X$ 的（离散）取值足够多、用连续分布近似显得合理；$p$ 要“居中”，才能使二项分布接近对称（如正态那样）。与大多数近似一样，没有绝对规则，每次应用都应检查近似对其预期用途是否足够好。一个保守的规则是：若 $\min\bigl( np,\ n(1 - p) \bigr) \geq 5$，则近似良好。

> **例 3.3.2（正态近似）**
>
> 设 $X \sim \mathrm{binomial}(25, 0.6)$。可用均值 $\mu = 25 \times 0.6 = 15$、标准差 $\sigma = \bigl( 25 \times 0.6 \times 0.4 \bigr)^{1/2} = 2.45$ 的正态随机变量 $Y$ 近似 $X$。于是
>
> $$
> P(X \leq 13) \approx P(Y \leq 13) = P\Bigl( Z \leq \frac{13 - 15}{2.45} \Bigr) = P(Z \leq -0.82) = 0.206,
> $$
>
> 而精确的二项计算给出
>
> $$
> P(X \leq 13) = \sum_{x=0}^{13} \binom{25}{x} (0.6)^{x} (0.4)^{25 - x} = 0.267,
> $$
>
> 可见正态近似良好但并不出色。不过，“连续性校正”可以大大改进近似。看图 3.3.2：其中画出了 $\mathrm{binomial}(25, 0.6)$ 的 pmf 与 $n\bigl( 15,\ (2.45)^2 \bigr)$ 的 pdf。二项 pmf 用宽度为 1、高度为概率的条形绘制，故条形的面积给出二项概率。在上述近似中，近似正态的面积小于二项面积（正态面积是直线 $x = 13$ 左侧的全部，而二项面积还包括 $x = 13$ 处整个到 $13.5$ 的条形）。连续性校正把 cutoff 点加上 $\tfrac{1}{2}$ 把这块面积补回来：不再近似 $P(X \leq 13)$，而是近似等价的表达式（由于离散性）$P(X \leq 13.5)$，得
>
> $$
> P(X \leq 13) = P(X \leq 13.5) \approx P(Y \leq 13.5) = P(Z \leq -0.61) = 0.271,
> $$
>
> 近似大为改善。一般地，带连续性校正的正态近似远优于不带校正的近似。
>
> 低端也要做校正。若 $X \sim \mathrm{binomial}(n, p)$，$Y \sim n\bigl( np,\ np(1 - p) \bigr)$，则近似
>
> $$
> P(X \leq x) \approx P(Y \leq x + 1/2), \qquad P(X \geq x) \approx P(Y \geq x - 1/2).
> $$

![ch03_fig_3_3_2](fig/ch03_fig_3_3_2.png)

图 3.3.2　 $n\bigl(15,\ (2.45)^2\bigr)$ 对 $\mathrm{binomial}(25, 0.6)$ 的近似（原书 Figure 3.3.2）

### 贝塔分布（Beta Distribution）

贝塔分布族是由两个参数索引的 $(0, 1)$ 上的连续分布族。$\mathrm{beta}(\alpha, \beta)$ pdf 为

$$
f(x \mid \alpha, \beta) = \frac{1}{B(\alpha, \beta)}\, x^{\alpha - 1} (1 - x)^{\beta - 1}, \qquad 0 < x < 1, \quad \alpha > 0, \quad \beta > 0, \tag{3.3.16}
$$

其中 $B(\alpha, \beta)$ 表示贝塔函数：

$$
B(\alpha, \beta) = \int_0^{1} x^{\alpha - 1} (1 - x)^{\beta - 1}\, dx.
$$

贝塔函数通过如下恒等式与伽马函数相联系：

$$
B(\alpha, \beta) = \frac{\Gamma(\alpha)\, \Gamma(\beta)}{\Gamma(\alpha + \beta)}. \tag{3.3.17}
$$

(3.3.17) 在处理贝塔函数时非常有用，使我们能利用伽马函数的性质。事实上我们从不直接处理贝塔函数，一切求值都通过 (3.3.17)。

贝塔分布是少数给有限区间（此处取 $(0,1)$）赋予全部概率的常见“有名字”分布之一。因此贝塔常用于为比例建模——比例天然介于 0 与 1 之间；第 4 章将见到这样的例子。

由于 pdf 形式的特殊性，贝塔分布矩的计算相当容易。对 $n > -\alpha$，

$$
\mathrm{E} X^n = \frac{1}{B(\alpha, \beta)} \int_0^{1} x^{n}\, x^{\alpha - 1} (1 - x)^{\beta - 1}\, dx = \frac{1}{B(\alpha, \beta)} \int_0^{1} x^{(\alpha + n) - 1} (1 - x)^{\beta - 1}\, dx.
$$

现在把被积函数识别为 $\mathrm{beta}(\alpha + n, \beta)$ pdf 的核，故

$$
\mathrm{E} X^n = \frac{B(\alpha + n, \beta)}{B(\alpha, \beta)} = \frac{\Gamma(\alpha + n)\, \Gamma(\alpha + \beta)}{\Gamma(\alpha + \beta + n)\, \Gamma(\alpha)}. \tag{3.3.18}
$$

用 (3.3.3) 与 (3.3.18)（取 $n = 1$ 与 $n = 2$）算得 $\mathrm{beta}(\alpha, \beta)$ 分布的均值与方差为

$$
\mathrm{E} X = \frac{\alpha}{\alpha + \beta}, \qquad \mathrm{Var} X = \frac{\alpha \beta}{(\alpha + \beta)^2 (\alpha + \beta + 1)}.
$$

随着参数 $\alpha$ 与 $\beta$ 的变化，贝塔分布呈现多种形状，如图 3.3.3 所示：pdf 可以严格递增（$\alpha > 1$，$\beta = 1$）、严格递减（$\alpha = 1$，$\beta > 1$）、U 形（$\alpha < 1$，$\beta < 1$）或单峰（$\alpha > 1$，$\beta > 1$）。$\alpha = \beta$ 时 pdf 关于 $\tfrac{1}{2}$ 对称，均值为 $\tfrac{1}{2}$（必然如此），方差为 $\bigl( 4(2\alpha + 1) \bigr)^{-1}$。$\alpha$ 增大时 pdf 变得更集中但仍保持对称，如图 3.3.4 所示。最后，若 $\alpha = \beta = 1$，贝塔分布约化为 uniform$(0,1)$，可见均匀分布可视为贝塔族的成员。通过一个变换，贝塔分布还与 $F$ 分布相关——后者在统计分析中极为重要（见 5.3 节）。

![ch03_fig_3_3_3](fig/ch03_fig_3_3_3.png)

*图 3.3.3　 贝塔密度（原书 Figure 3.3.3）*

![ch03_fig_3_3_4](fig/ch03_fig_3_3_4.png)

*图 3.3.4　 对称的贝塔密度（原书 Figure 3.3.4）*

### 柯西分布（Cauchy Distribution）

柯西分布是 $(-\infty, \infty)$ 上对称的钟形分布，pdf 为

$$
f(x \mid \theta) = \frac{1}{\pi}\, \frac{1}{1 + (x - \theta)^2}, \qquad -\infty < x < \infty, \quad -\infty < \theta < \infty. \tag{3.3.19}
$$

（更一般的柯西 pdf 见习题 3.39。）肉眼观之，柯西分布与正态分布差别不大；然而实际上差别极大。正如第 2 章所见，柯西分布的均值不存在，即

$$
\mathrm{E}|X| = \int_{-\infty}^{\infty} \frac{1}{\pi}\, \frac{|x|}{1 + (x - \theta)^2}\, dx = \infty. \tag{3.3.20}
$$

容易验证 (3.3.19) 对一切 $\theta$ 都定义了一个正常的 pdf。回顾 $\frac{d}{dt} \arctan(t) = (1 + t^2)^{-1}$，故

$$
\int_{-\infty}^{\infty} \frac{1}{\pi}\, \frac{1}{1 + (x - \theta)^2}\, dx = \left. \frac{1}{\pi} \arctan(x - \theta) \right|_{-\infty}^{\infty} = 1,
$$

因为 $\arctan(\pm\infty) = \pm \pi/2$。

由于 $\mathrm{E}|X| = \infty$，柯西分布的任何矩都不存在，换言之其一切绝对矩均为 $\infty$；特别地，mgf 不存在。

(3.3.19) 中的参数 $\theta$ 确实度量分布的中心：它是中位数。若 $X$ 服从参数为 $\theta$ 的柯西分布，则由习题 3.37 可知 $P(X \geq \theta) = \tfrac{1}{2}$，说明 $\theta$ 是分布的中位数。图 3.3.5 同时画出了 $\mathrm{Cauchy}(0)$ 分布与 $n(0,1)$：形状相似，但柯西的尾部厚得多。

柯西分布在统计理论中扮演特殊角色：它是检验各种猜想的极端案例。但不要误以为柯西分布只是病态情形——它总在你最意想不到的时候出现。例如，实验者计算观测值的比值（即随机变量之比）是常见做法（在生长测量中，常把体重与身高合并为“身高体重比”即 体重/身高）。一个惊人的事实是：两个标准正态变量之比服从柯西分布（见例 4.3.6）。取比值可能导致行为不良的分布。

![ch03_fig_3_3_5](fig/ch03_fig_3_3_5.png)

*图 3.3.5　 标准正态密度与柯西密度（原书 Figure 3.3.5）*

### 对数正态分布（Lognormal Distribution）

若随机变量 $X$ 的对数服从正态分布（即 $\log X \sim n(\mu, \sigma^2)$），则称 $X$ 服从对数正态分布（lognormal distribution）。用定理 2.1.5 对正态 pdf 做直接变换即得 $X$ 的 pdf：

$$
f(x \mid \mu, \sigma^2) = \frac{1}{\sqrt{2\pi}\, \sigma\, x}\, e^{-(\log x - \mu)^2 / (2\sigma^2)}, \qquad 0 < x < \infty, \quad -\infty < \mu < \infty, \quad \sigma > 0. \tag{3.3.21}
$$

$X$ 的矩可以直接用 (3.3.21) 计算，也可以利用与正态的关系，写

$$
\begin{aligned}
\mathrm{E} X &= \mathrm{E} e^{\log X} = \mathrm{E} e^{Y} \qquad （Y = \log X \sim n(\mu, \sigma^2)）\\
&= e^{\mu + (\sigma^2/2)}.
\end{aligned}
$$

最后一步等式通过识别正态分布的 mgf 得到（取 $t = 1$；见习题 2.33）。用类似技巧计算 $\mathrm{E} X^2$，得

$$
\mathrm{Var} X = e^{2(\mu + \sigma^2)} - e^{2\mu + \sigma^2}.
$$

如图 3.3.6 所示，对数正态分布在外观上与伽马分布相似。该分布在建模应用中非常流行，适用于向右偏斜的变量。例如收入必然右偏，用对数正态建模就可以对 $\log(\text{收入})$ 使用正态理论的统计方法——非常便利。

![ch03_fig_3_3_6](fig/ch03_fig_3_3_6.png)

*图 3.3.6　 (a) 若干对数正态密度；(b) 若干伽马密度（原书 Figure 3.3.6）*

### 双指数分布（Double Exponential Distribution）

双指数分布由把指数分布绕其均值反射而形成，pdf 为

$$
f(x \mid \mu, \sigma) = \frac{1}{2\sigma}\, e^{-|x - \mu|/\sigma}, \qquad -\infty < x < \infty, \quad -\infty < \mu < \infty, \quad \sigma > 0. \tag{3.3.22}
$$

双指数分布是对称的“厚尾”分布（尾部远厚于正态），但仍拥有全部各阶矩。容易算得

$$
\mathrm{E} X = \mu, \qquad \mathrm{Var} X = 2\sigma^2.
$$

双指数分布不是钟形的：它在 $x = \mu$ 处有一个尖峰（更正式地说，一个不可微点）。解析处理该分布时务必记住这一点。绝对值符号在积分时也很麻烦，最好把积分区域按 $x = \mu$ 分割：

$$
\mathrm{E} X = \int_{-\infty}^{\infty} \frac{x}{2\sigma}\, e^{-|x - \mu|/\sigma}\, dx = \int_{-\infty}^{\mu} \frac{x}{2\sigma}\, e^{(x - \mu)/\sigma}\, dx + \int_{\mu}^{\infty} \frac{x}{2\sigma}\, e^{-(x - \mu)/\sigma}\, dx. \tag{3.3.23}
$$

注意在两个积分区域上可以去掉绝对值符号（这一策略对处理含绝对值的积分普遍有用：分割积分区域以去掉绝对值）。(3.3.23) 的求值可对每个积分分别分部积分完成。

还有许多其他连续分布在不同统计应用中各有用处，其中许多将出现在本书其余章节。Johnson and Kotz (1969, 1970a, 1970b) 的全面著作是大多数有用统计分布的宝贵参考。

## 3.4 指数族（Exponential Families）

若一族 pdf 或 pmf 可以表示为

$$
f(x \mid \theta) = h(x)\, c(\theta)\, \exp\Bigl( \sum_{i=1}^{k} w_i(\theta)\, t_i(x) \Bigr), \tag{3.4.1}
$$

则称之为***指数族***（exponential family）。

其中 $h(x) \geq 0$ 与 $t_1(x), \ldots, t_k(x)$ 是观测 $x$ 的实值函数（它们不能依赖于 $\theta$）；$c(\theta) \geq 0$ 与 $w_1(\theta), \ldots, w_k(\theta)$ 是可能取向量值的参数 $\theta$ 的实值函数（它们不能依赖于 $x$）。上一节引入的许多常见族都是指数族：连续族包括正态族、伽马族与贝塔族；离散族包括二项族、泊松族与负二项族。

要验证一族 pdf 或 pmf 是指数族，必须识别函数 $h(x)$、$c(\theta)$、$w_i(\theta)$ 与 $t_i(x)$，并证明该族具有 (3.4.1) 的形式。下例说明这一过程。

> **例 3.4.1（二项指数族）**
>
> 设 $n$ 为正整数，考虑 $0 < p < 1$ 的 $\mathrm{binomial}(n, p)$ 族。对 $x = 0, \ldots, n$ 与 $0 < p < 1$，该族的 pmf 为
>
> $$
> \begin{aligned}
> f(x \mid p) &= \binom{n}{x} p^{x} (1 - p)^{n - x}\\
> &= \binom{n}{x} (1 - p)^{n} \Bigl( \frac{p}{1 - p} \Bigr)^{x}\\
> &= \binom{n}{x} (1 - p)^{n} \exp\Bigl[ \log\Bigl( \frac{p}{1 - p} \Bigr)\, x \Bigr].
> \end{aligned} \tag{3.4.2}
> $$
>
> 定义
>
> $$
> h(x) = \begin{cases} \dbinom{n}{x} & x = 0, \ldots, n,\\[4pt] 0 & \text{其他}, \end{cases} \qquad
> c(p) = (1 - p)^{n},\ 0 < p < 1,
> $$
>
> $$
> w_1(p) = \log\Bigl( \frac{p}{1 - p} \Bigr),\ 0 < p < 1, \qquad t_1(x) = x.
> $$
>
> 则
>
> $$
> f(x \mid p) = h(x)\, c(p) \exp\bigl[ w_1(p)\, t_1(x) \bigr], \tag{3.4.3}
> $$
>
> 这是 $k = 1$ 时的形式 (3.4.1)。特别要注意 $h(x) > 0$ 仅当 $x = 0, \ldots, n$，而 $c(p)$ 仅在 $0 < p < 1$ 时有定义。这一点很重要：(3.4.3) 必须对一切 $x$ 的取值都与 (3.4.2) 匹配，且仅当 $0 < p < 1$ 时才是指数族（参数函数只在此范围内有定义）。此外，参数值 $p = 0$ 与 $p = 1$ 有时也包含在二项模型中，但此处未包含，因为 $p = 0$ 或 1 时使 $f(x \mid p) > 0$ 的 $x$ 取值集合不同于其他 $p$ 值时的集合。

(3.4.1) 的特殊形式使指数族具有许多优美的数学性质；但更重要的是，作为一个统计模型，这种形式还带来许多优美的统计性质。下面给出指数族矩计算的一条捷径。

> **定理 3.4.2（指数族的矩恒等式）**
>
> 设 $X$ 的 pdf 或 pmf 形如 (3.4.1)，则
>
> $$
> \mathrm{E}\Bigl[ \sum_{i=1}^{k} \frac{\partial w_i(\theta)}{\partial \theta_j}\, t_i(X) \Bigr] = -\, \frac{\partial}{\partial \theta_j} \log c(\theta), \tag{3.4.4}
> $$
>
> $$
> \mathrm{Var}\Bigl[ \sum_{i=1}^{k} \frac{\partial w_i(\theta)}{\partial \theta_j}\, t_i(X) \Bigr] = -\, \frac{\partial^2}{\partial \theta_j^2} \log c(\theta) - \mathrm{E}\Bigl[ \sum_{i=1}^{k} \frac{\partial^2 w_i(\theta)}{\partial \theta_j^2}\, t_i(X) \Bigr]. \tag{3.4.5}
> $$

这些等式虽然看似吓人，但用于具体情形时往往相当漂亮。其优点是可以用求导代替积分或求和，后者通常更直接。

> **例 3.4.3（二项分布的均值与方差）**
>
> 由例 3.4.1，
>
> $$
> \frac{d}{dp}\, w_1(p) = \frac{d}{dp} \log \frac{p}{1 - p} = \frac{1}{p(1 - p)},
> \qquad
> \frac{d}{dp} \log c(p) = \frac{d}{dp}\, n \log(1 - p) = \frac{-n}{1 - p}.
> $$
>
> 于是由定理 3.4.2，
>
> $$
> \mathrm{E}\Bigl[ \frac{1}{p(1 - p)}\, X \Bigr] = \frac{n}{1 - p},
> $$
>
> 稍加整理即得 $\mathrm{E}(X) = np$。方差恒等式的用法类似。

定理 3.4.2 的证明是一次微积分练习，移至习题 3.31 完成；特例另见习题 3.32。

下面再看一个例子以及指数族的另一些特征。

> **例 3.4.4（正态指数族）**
>
> 设 $f(x \mid \mu, \sigma^2)$ 是 $n(\mu, \sigma^2)$ pdf 族，$\theta = (\mu, \sigma)$，$-\infty < \mu < \infty$，$\sigma > 0$。则
>
> $$
> \begin{aligned}
> f(x \mid \mu, \sigma^2) &= \frac{1}{\sqrt{2\pi}\, \sigma} \exp\Bigl( -\frac{(x - \mu)^2}{2\sigma^2} \Bigr)\\
> &= \frac{1}{\sqrt{2\pi}\, \sigma} \exp\Bigl( -\frac{\mu^2}{2\sigma^2} \Bigr)\, \exp\Bigl( -\frac{x^2}{2\sigma^2} + \frac{\mu x}{\sigma^2} \Bigr).
> \end{aligned} \tag{3.4.6}
> $$
>
> 定义
>
> $$
> h(x) = 1 \ \text{（对一切}\ x\text{）},
> $$
>
> $$
> c(\theta) = c(\mu, \sigma) = \frac{1}{\sqrt{2\pi}\, \sigma} \exp\Bigl( \frac{-\mu^2}{2\sigma^2} \Bigr), \quad -\infty < \mu < \infty,\ \sigma > 0,
> $$
>
> $$
> w_1(\mu, \sigma) = \frac{1}{\sigma^2}\ \ (\sigma > 0), \qquad w_2(\mu, \sigma) = \frac{\mu}{\sigma^2}\ \ (\sigma > 0),
> $$
>
> $$
> t_1(x) = -x^2/2, \qquad t_2(x) = x.
> $$
>
> 则
>
> $$
> f(x \mid \mu, \sigma^2) = h(x)\, c(\mu, \sigma) \exp\bigl[ w_1(\mu, \sigma)\, t_1(x) + w_2(\mu, \sigma)\, t_2(x) \bigr],
> $$
>
> 即 $k = 2$ 的形式 (3.4.1)。再次注意参数函数只在参数范围内有定义。

一般地，在指数族中，使 $f(x \mid \theta) > 0$ 的 $x$ 取值集合不能依赖于 $\theta$。pdf 或 pmf 的完整定义必须纳入形式 (3.4.1)；最方便的做法是用示性函数把 $x$ 的范围纳入 $f(x \mid \theta)$ 的表达式。

> **定义 3.4.5（示性函数）**
>
> 集合 $A$ 的***示性函数***（indicator function）通常记作 $I_A(x)$，定义为
>
> $$
> I_A(x) = \begin{cases} 1 & x \in A,\\ 0 & x \notin A. \end{cases}
> $$
>
> 另一种记法是 $I(x \in A)$。

于是例 3.4.4 的正态 pdf 可以写成

$$
f(x \mid \mu, \sigma^2) = h(x)\, c(\mu, \sigma) \exp\bigl[ w_1(\mu, \sigma)\, t_1(x) + w_2(\mu, \sigma)\, t_2(x) \bigr]\, I_{(-\infty, \infty)}(x).
$$

由于示性函数只是 $x$ 的函数，它可以并入 $h(x)$，说明该 pdf 具有 (3.4.1) 的形式。

由 (3.4.1)，因子 $\exp(\cdot)$ 恒正，故对任意 $\theta \in \Theta$（即任意使 $c(\theta) > 0$ 的 $\theta$），$\{x : f(x \mid \theta) > 0\} = \{x : h(x) > 0\}$，且该集合不依赖于 $\theta$。例如，pdf 族 $f(x \mid \theta) = \theta^{-1} \exp\bigl( 1 - (x/\theta) \bigr)$（$0 < \theta < x < \infty$）就不是指数族——尽管我们能写 $\theta^{-1} \exp\bigl( 1 - (x/\theta) \bigr) = h(x) c(\theta) \exp\bigl( w(\theta) t(x) \bigr)$，其中 $h(x) = e$，$c(\theta) = \theta^{-1}$，$w(\theta) = \theta^{-1}$，$t(x) = -x$。用示性函数写这个 pdf 就能看清原因：

$$
f(x \mid \theta) = \theta^{-1} \exp\Bigl( 1 - \frac{x}{\theta} \Bigr)\, I_{[\theta, \infty)}(x).
$$

示性函数无法并入 (3.4.1) 的任何一个函数：它既不是单独 $x$ 的函数，也不是单独 $\theta$ 的函数，也不能写成指数。因此这不是指数族。

指数族有时再参数化为

$$
f(x \mid \eta) = h(x)\, c^{*}(\eta) \exp\Bigl( \sum_{i=1}^{k} \eta_i\, t_i(x) \Bigr). \tag{3.4.7}
$$

这里 $h(x)$ 与 $t_i(x)$ 与原参数化 (3.4.1) 中相同。集合

$$
H = \Bigl\{ \eta = (\eta_1, \ldots, \eta_k) : \int_{-\infty}^{\infty} h(x) \exp\Bigl( \sum_{i=1}^{k} \eta_i\, t_i(x) \Bigr) dx < \infty \Bigr\}
$$

称为该族的***自然参数空间***（natural parameter space）。（若 $X$ 离散，积分换成对使 $h(x) > 0$ 的 $x$ 值求和。）对 $\eta \in H$，为保证 pdf 积分为 1，必须有

$$
c^{*}(\eta) = \Bigl( \int_{-\infty}^{\infty} h(x) \exp\Bigl( \sum_{i=1}^{k} \eta_i\, t_i(x) \Bigr) dx \Bigr)^{-1}.
$$

由于 (3.4.1) 中的原 $f(x \mid \theta)$ 是 pdf 或 pmf，集合 $\{\eta = (w_1(\theta), \ldots, w_k(\theta)) : \theta \in \Theta\}$ 必是自然参数空间的子集；但也可能存在其他 $\eta \in H$。自然参数化与自然参数空间有许多有用的数学性质，例如 $H$ 是凸的。

> **例 3.4.6（例 3.4.4 的继续）**
>
> 为确定正态分布族的自然参数空间，把 (3.4.6) 中的 $w_i(\mu, \sigma)$ 换成 $\eta_i$，得
>
> $$
> f(x \mid \eta_1, \eta_2) = \sqrt{\frac{\eta_1}{2\pi}}\, \exp\Bigl( -\frac{\eta_1 \eta_2^2}{2} \Bigr) \exp\Bigl( -\frac{\eta_1 x^2}{2} + \eta_2 x \Bigr). \tag{3.4.8}
> $$
>
> 当且仅当 $x^2$ 的系数为负时积分有限，即 $\eta_1$ 必须为正。若 $\eta_1 > 0$，无论 $\eta_2$ 取何值积分都有限。故自然参数空间是 $\{(\eta_1, \eta_2) : \eta_1 > 0,\ -\infty < \eta_2 < \infty\}$。把 (3.4.8) 与 (3.4.6) 对照，可见 $\eta_2 = \mu/\sigma^2$，$\eta_1 = 1/\sigma^2$。自然参数提供了方便的数学表述，但有时缺乏均值、方差那样的直观解释。

在表示 (3.4.1) 中，向量 $\theta$ 的维数常常等于 $k$（指数中和的项数），但不必如此：$\theta$ 的维数可以等于 $d < k$。这样的指数族称为***曲线指数族***（curved exponential family）。

> **定义 3.4.7（曲线指数族）**
>
> 若形如 (3.4.1) 的密度族的参数向量维数等于 $d < k$，则称之为***曲线指数族***。若 $d = k$，则称该族为***满秩指数族***（full exponential family）。（另见杂记 3.8.3。）

> **例 3.4.8（一个曲线指数族）**
>
> 例 3.4.4 的正态族是满秩指数族。但若假定 $\sigma^2 = \mu^2$，该族就变成曲线族（这样的模型可能用于方差分析；见习题 11.1 与 11.2）。此时
>
> $$
> \begin{aligned}
> f(x \mid \mu) &= \frac{1}{\sqrt{2\pi\, \mu^2}} \exp\Bigl( -\frac{(x - \mu)^2}{2\mu^2} \Bigr)\\
> &= \frac{1}{\sqrt{2\pi\, \mu^2}} \exp\Bigl( -\frac{1}{2} \Bigr) \exp\Bigl( -\frac{x^2}{2\mu^2} + \frac{x}{\mu} \Bigr).
> \end{aligned} \tag{3.4.9}
> $$
>
> 对正态族，满秩指数族的参数空间是 $(\mu, \sigma^2) = \Re \times (0, \infty)$，而曲线族 $(\mu, \sigma^2) = (\mu, \mu^2)$ 的参数空间是一条抛物线。

曲线指数族的用途很多。下一例展示一个简单的用法。

> **例 3.4.9（正态近似）**
>
> 第 5 章将看到：若 $X_1, \ldots, X_n$ 是来自 $\mathrm{Poisson}(\lambda)$ 总体的样本，则 $\bar{X} = \sum_i X_i / n$ 的分布近似为
>
> $$
> \bar{X} \sim n(\lambda, \lambda/n),
> $$
>
> 这是一个曲线指数族。
>
> $n(\lambda, \lambda/n)$ 近似由中心极限定理（定理 5.5.14）所支撑。事实上可以意识到，大多数此类 CLT 近似都会产生曲线正态族。我们已经见过正态—二项近似（例 3.3.2）：若 $X_1, X_2, \ldots, X_n$ 是 iid $\mathrm{Bernoulli}(p)$，则近似地
>
> $$
> \bar{X} \sim n\bigl( p,\ p(1 - p)/n \bigr).
> $$
>
> 另一例见例 5.5.16。

虽然参数空间维数降低对族的性质有影响，但曲线族仍享有满秩族的许多性质；特别地，定理 3.4.2 对曲线指数族仍然适用。此外，满秩与曲线指数族还有其他统计性质，将在全书余下部分讨论。例如，设我们有一总体的大量数据，其 pdf 或 pmf 形如 (3.4.1)；则只有 $k$ 个数（$k$ 为 (3.4.1) 中和的项数）——它们可以从数据算出——概括了数据中关于 $\theta$ 的全部信息。这一“数据约简”性质将在第 6 章充分统计量的讨论中（定理 6.2.10）详细展开。

关于指数族的更多入门材料见 Lehmann (1986, Section 2.7) 或 Lehmann and Casella (1998, Section 1.5 and Note 1.10.6)；更彻底的（稍高水平的）介绍见 Brown (1986) 的经典专著。

## 3.5 位置族与尺度族（Location and Scale Families）

3.3 与 3.4 节讨论了几种常见的连续分布族。本节讨论构造分布族的三种技术。所得的族具有直观的物理解释，使其对建模非常有用，同时具有便利的数学性质。

这三种类型的族称为位置族（location families）、尺度族（scale families）与位置—尺度族（location–scale families）。每一族都通过指定单个 pdf（记作 $f(x)$，称为该族的***标准 pdf***，standard pdf）来构造；族中所有其他 pdf 都按预先规定的方式变换标准 pdf 而生成。我们先给出关于 pdf 的一个简单定理。

> **定理 3.5.1（位置—尺度变换产生合法 pdf）**
>
> 设 $f(x)$ 是任意 pdf，$\mu$ 与 $\sigma > 0$ 是任意给定常数。则函数
>
> $$
> g(x \mid \mu, \sigma) = \frac{1}{\sigma}\, f\Bigl( \frac{x - \mu}{\sigma} \Bigr)
> $$
>
> 是 pdf。
>
> **证明**　为验证该变换产生了合法 pdf，需检查 $(1/\sigma) f\bigl( (x - \mu)/\sigma \bigr)$ 作为 $x$ 的函数，对代入公式的每一组 $\mu$ 与 $\sigma$ 取值都是 pdf，即非负且积分为 1。因为 $f(x)$ 是 pdf，对一切 $x$ 有 $f(x) \geq 0$，故对一切 $x$、$\mu$、$\sigma$ 有 $(1/\sigma) f\bigl( (x - \mu)/\sigma \bigr) \geq 0$。其次，
>
> $$
> \int_{-\infty}^{\infty} \frac{1}{\sigma}\, f\Bigl( \frac{x - \mu}{\sigma} \Bigr)\, dx = \int_{-\infty}^{\infty} f(y)\, dy = 1,
> \qquad （\text{代入}\ y = \frac{x - \mu}{\sigma}；\text{因}\ f(y)\ \text{是 pdf}）
> $$
>
> 验证完毕。 ∎

现在讨论第一种构造——位置族。

> **定义 3.5.2（位置族）**
>
> 设 $f(x)$ 是任意 pdf。则由参数 $\mu$（$-\infty < \mu < \infty$）索引的 pdf 族 $f(x - \mu)$ 称为以 $f(x)$ 为标准 pdf 的***位置族***（location family），$\mu$ 称为该族的***位置参数***（location parameter）。

为看出引入位置参数 $\mu$ 的效果，考虑图 3.5.1：在 $x = \mu$ 处 $f(x - \mu) = f(0)$；在 $x = \mu + 1$ 处 $f(x - \mu) = f(1)$；一般地在 $x = \mu + a$ 处 $f(x - \mu) = f(a)$。当然 $\mu = 0$ 时的 $f(x - \mu)$ 就是 $f(x)$。因此位置参数 $\mu$ 只是平移 pdf $f(x)$：图像的形状不变，但原在 $f(x)$ 中位于 $x = 0$ 上方的那一点，现在位于 $f(x - \mu)$ 中 $x = \mu$ 的上方。从图 3.5.1 清楚可见，$f(x)$ 在 $x = -1$ 与 $x = 2$ 之间的图形下面积，等于 $f(x - \mu)$ 在 $x = \mu - 1$ 与 $x = \mu + 2$ 之间的面积。于是若 $X$ 是以 $f(x - \mu)$ 为 pdf 的随机变量，可写

$$
P(-1 \leq X \leq 2 \mid 0) = P(\mu - 1 \leq X \leq \mu + 2 \mid \mu),
$$

等式左侧随机变量 $X$ 的 pdf 为 $f(x - 0) = f(x)$，右侧 pdf 为 $f(x - \mu)$。

![ch03_fig_3_5_1](fig/ch03_fig_3_5_1.png)

*图 3.5.1　 同一位置族的两个成员：均值分别为 0 与 2（原书 Figure 3.5.1）*

3.2 节引入的几族分布是位置族或以位置族为子族。例如，若 $\sigma > 0$ 是指定的已知数，定义

$$
f(x) = \frac{1}{\sqrt{2\pi}\, \sigma}\, e^{-x^2/(2\sigma^2)}, \qquad -\infty < x < \infty,
$$

则以 $f(x)$ 为标准 pdf 的位置族就是未知均值 $\mu$、已知方差 $\sigma^2$ 的正态分布集合：在公式中把 $x$ 换成 $x - \mu$ 即得 (3.3.13) 定义的 pdf。类似地，柯西族与双指数族（$\sigma$ 取指定值，$\mu$ 为参数）都是位置族的例子。但定义 3.5.2 的要点在于：我们可以从***任何*** pdf $f(x)$ 出发，通过引入位置参数生成一族 pdf。

若 $X$ 是以 $f(x - \mu)$ 为 pdf 的随机变量，则 $X$ 可以表示为 $X = Z + \mu$，其中 $Z$ 是以 $f(z)$ 为 pdf 的随机变量。该表示是定理 3.5.6（取 $\sigma = 1$）的结论，稍后证明。考虑这一表示，可以指明位置族何时适合作为观测变量 $X$ 的模型。下面描述两种情形。

第一，假设实验的目的是测量某个物理常数 $\mu$，例如某溶液的温度，但观测涉及测量误差。于是实际观测值 $X$ 为 $Z + \mu$，其中 $Z$ 是测量误差：本次观测中 $Z > 0$ 则 $X$ 大于 $\mu$，$Z < 0$ 则小于 $\mu$。随机测量误差的分布可能由以往使用该测量仪器的经验所熟知；若该分布的 pdf 为 $f(z)$，则观测值 $X$ 的 pdf 为 $f(x - \mu)$。

另一个例子：假设司机在协调性测试中的反应时间分布由以往实验获知。用随机变量 $Z$ 表示随机抽取司机的反应时间，其已知分布的 pdf 为 $f(z)$。现在考虑对总体“施加处理”：例如设想每个人都喝下三杯啤酒会发生什么。我们或许可以假定每个人的反应时间都改变某个未知量 $\mu$（这一非常简单的模型——每个人的反应时间改变同一量 $\mu$——可能不是最好的模型；例如已知酒精的作用与体重有关，体重较大者受啤酒影响可能较小）。思想开放的科学家甚至可以允许 $\mu < 0$，即反应时间变短。于是“处理”后随机抽取司机的反应时间为 $X = Z + \mu$，$X$ 的可能分布族就是 $f(x - \mu)$。

若使 $f(x) > 0$ 的 $x$ 集合不是整条实数轴，则使 $f(x - \mu) > 0$ 的 $x$ 集合将依赖于 $\mu$。例 3.5.3 说明了这一点。

> **例 3.5.3（指数位置族）**
>
> 设 $f(x) = e^{-x}$（$x \geq 0$），$f(x) = 0$（$x < 0$）。为构成位置族，把 $x$ 换成 $x - \mu$：
>
> $$
> f(x \mid \mu) = \begin{cases} e^{-(x - \mu)} & x - \mu \geq 0,\\ 0 & x - \mu < 0, \end{cases} = \begin{cases} e^{-(x - \mu)} & x \geq \mu,\\ 0 & x < \mu. \end{cases}
> $$
>
> 各 $\mu$ 值下 $f(x \mid \mu)$ 的图形见图 3.5.2。与图 3.5.1 一样，图形被平移了：现在图像的正部从 $\mu$ 而非 0 开始。若 $X$ 度量时间，则 $\mu$ 可限制为非负，使 $X$ 对每个 $\mu$ 值都以概率 1 为正。在这种 $\mu$ 表示 $X$ 取值界的模型中，$\mu$ 有时称为***门限参数***（threshold parameter）。

![ch03_fig_3_5_2](fig/ch03_fig_3_5_2.png)

*图 3.5.2　 指数位置密度（原书 Figure 3.5.2）*

本节要讨论的另外两类是尺度族与位置—尺度族。

> **定义 3.5.4（尺度族）**
>
> 设 $f(x)$ 是任意 pdf。则对任意 $\sigma > 0$，由参数 $\sigma$ 索引的 pdf 族 $(1/\sigma) f(x/\sigma)$ 称为以 $f(x)$ 为标准 pdf 的***尺度族***（scale family），$\sigma$ 称为该族的***尺度参数***（scale parameter）。

引入尺度参数 $\sigma$ 的效果是把 $f(x)$ 的图形拉伸（$\sigma > 1$）或收缩（$\sigma < 1$），同时保持图形的基本形状不变，如图 3.5.3 所示。使用尺度参数时，$f(x)$ 通常或者关于 0 对称，或者仅在 $x > 0$ 时为正；此时拉伸或者关于 0 对称，或者只沿正方向。但在定义中，任何 pdf 都可用作标准 pdf。

![ch03_fig_3_5_3](fig/ch03_fig_3_5_3.png)

*图 3.5.3　 同一尺度族的成员（原书 Figure 3.5.3）*

3.3 节引入的几族分布是尺度族或以尺度族为子族：若 $\alpha$ 固定而 $\beta$ 为尺度参数，则伽马族；若 $\mu = 0$ 而 $\sigma$ 为尺度参数，则正态族；指数族；以及若 $\mu = 0$ 而 $\sigma$ 为尺度参数时的双指数族。每种情形下，标准 pdf 都是令尺度参数等于 1 所得的 pdf，族中其他成员都可证明具有定义 3.5.4 的形式。

> **定义 3.5.5（位置—尺度族）**
>
> 设 $f(x)$ 是任意 pdf。则对任意 $\mu$（$-\infty < \mu < \infty$）与任意 $\sigma > 0$，由参数 $(\mu, \sigma)$ 索引的 pdf 族 $(1/\sigma) f\bigl( (x - \mu)/\sigma \bigr)$ 称为以 $f(x)$ 为标准 pdf 的***位置—尺度族***（location–scale family）；$\mu$ 称为位置参数，$\sigma$ 称为尺度参数。

同时引入位置与尺度参数的效果是：先用尺度参数把图形拉伸（$\sigma > 1$）或收缩（$\sigma < 1$），再平移图形，使原来位于 0 上方的点位于 $\mu$ 上方。图 3.5.4 展示了对 $f(x)$ 的这一变换。正态族与双指数族都是位置—尺度族的例子；习题 3.39 把柯西族表为位置—尺度族。

![ch03_fig_3_5_4](fig/ch03_fig_3_5_4.png)

*图 3.5.4　 同一位置—尺度族的成员（原书 Figure 3.5.4）*

下面的定理把定义位置—尺度族的 pdf $f(x)$ 的变换，与以 $f(z)$ 为 pdf 的随机变量 $Z$ 的变换联系起来。如前所述，用 $Z$ 表示是很有用的数学工具，能帮助我们在建模情景中理解位置—尺度族何时合适。在定理 3.5.6 中令 $\sigma = 1$ 得到（纯）位置族的结果，令 $\mu = 0$ 得到（纯）尺度族的结果。

> **定理 3.5.6（位置—尺度表示）**
>
> 设 $f(\cdot)$ 是任意 pdf，$\mu$ 为任意实数，$\sigma$ 为任意正实数。则 $X$ 是以 $(1/\sigma) f\bigl( (x - \mu)/\sigma \bigr)$ 为 pdf 的随机变量，当且仅当存在以 $f(z)$ 为 pdf 的随机变量 $Z$ 使 $X = \sigma Z + \mu$。
>
> **证明**　证“若”部分：定义 $g(z) = \sigma z + \mu$，则 $X = g(Z)$，$g$ 是单调函数，$g^{-1}(x) = (x - \mu)/\sigma$，且 $\Bigl| \frac{d}{dx} g^{-1}(x) \Bigr| = 1/\sigma$。于是由定理 2.1.5，$X$ 的 pdf 为
>
> $$
> f_X(x) = f_Z\bigl( g^{-1}(x) \bigr)\, \Bigl| \frac{d}{dx}\, g^{-1}(x) \Bigr| = f\Bigl( \frac{x - \mu}{\sigma} \Bigr)\, \frac{1}{\sigma}.
> $$
>
> 证“仅当”部分：定义 $g(x) = (x - \mu)/\sigma$，令 $Z = g(X)$。定理 2.1.5 再次适用，$g^{-1}(z) = \sigma z + \mu$，$\Bigl| \frac{d}{dz} g^{-1}(z) \Bigr| = \sigma$，$Z$ 的 pdf 为
>
> $$
> f_Z(z) = f_X\bigl( g^{-1}(z) \bigr)\, \Bigl| \frac{d}{dz}\, g^{-1}(z) \Bigr| = f\Bigl( \frac{(\sigma z + \mu) - \mu}{\sigma} \Bigr)\, \sigma = f(z).
> $$
>
> 且有
>
> $$
> \sigma Z + \mu = \sigma\, g(X) + \mu = \sigma\, \Bigl( \frac{X - \mu}{\sigma} \Bigr) + \mu = X.
> $$
>
> ∎

从定理 3.5.6 可以提取一个重要事实：随机变量 $Z = (X - \mu)/\sigma$ 的 pdf 为

$$
f_Z(z) = \frac{1}{1}\, f\Bigl( \frac{z - 0}{1} \Bigr) = f(z).
$$

即 $Z$ 的分布是位置—尺度族中对应于 $\mu = 0$、$\sigma = 1$ 的那个成员。3.3 节已对正态族的特例证明过这一点。

对“标准”随机变量 $Z$（pdf 为 $f(z)$）常可以完成计算，然后容易导出 pdf 为 $(1/\sigma) f\bigl( (x - \mu)/\sigma \bigr)$ 的随机变量 $X$ 的相应结果。下面的定理便是一例，它是 3.3 节对正态族所做计算的一般化。

> **定理 3.5.7（位置—尺度族的均值与方差）**
>
> 设 $Z$ 是以 $f(z)$ 为 pdf 的随机变量，$\mathrm{E} Z$ 与 $\mathrm{Var} Z$ 存在。若 $X$ 是以 $(1/\sigma) f\bigl( (x - \mu)/\sigma \bigr)$ 为 pdf 的随机变量，则
>
> $$
> \mathrm{E} X = \sigma\, \mathrm{E} Z + \mu \qquad\text{与}\qquad \mathrm{Var} X = \sigma^2\, \mathrm{Var} Z.
> $$
>
> 特别地，若 $\mathrm{E} Z = 0$ 且 $\mathrm{Var} Z = 1$，则 $\mathrm{E} X = \mu$ 且 $\mathrm{Var} X = \sigma^2$。
>
> **证明**　由定理 3.5.6，存在 pdf 为 $f(z)$ 的随机变量 $Z^{*}$ 使 $X = \sigma Z^{*} + \mu$。故 $\mathrm{E} X = \sigma \mathrm{E} Z^{*} + \mu = \sigma \mathrm{E} Z + \mu$，且 $\mathrm{Var} X = \sigma^2 \mathrm{Var} Z^{*} = \sigma^2 \mathrm{Var} Z$。 ∎

对任何均值与方差都有限的位置—尺度族，可以选标准 pdf $f(z)$ 使 $\mathrm{E} Z = 0$ 且 $\mathrm{Var} Z = 1$（可以这样选取的证明留作习题 3.40）。这带来便利的解释：$\mu$ 与 $\sigma^2$ 分别是 $X$ 的均值与方差。3.3 节正态族的通常定义正是如此。但 3.3 节双指数族的通常定义并非如此——那里 $\mathrm{Var} Z = 2$。

位置—尺度族任何成员的概率都可用标准变量 $Z$ 计算，因为

$$
P(X \leq x) = P\Bigl( \frac{X - \mu}{\sigma} \leq \frac{x - \mu}{\sigma} \Bigr) = P\Bigl( Z \leq \frac{x - \mu}{\sigma} \Bigr).
$$

于是只要标准变量 $Z$ 的 $P(Z \leq z)$ 已制表或易于计算，就能得到 $X$ 的概率。用标准正态表计算正态概率就是这样的例子。

## 3.6 不等式与恒等式（Inequalities and Identities）

统计理论中充满了不等式与恒等式——多到整个学科以此为专题著书。Marshall and Olkin (1979) 的专著包含许多基于控制（majorization）概念的不等式；更早的 Hardy, Littlewood, and Polya (1952) 是经典不等式的汇编。本节与 4.7 节将新旧结果穿插介绍，展示这类结果的面貌。本节专门讨论源于概率考虑的恒等式与不等式，4.7 节的则更多依赖数与函数的基本性质。

### 3.6.1 概率不等式（Probability Inequalities）

最著名、也许最有用的概率不等式是切比雪夫不等式（Chebychev's Inequality）。它的有用源于其广泛的适用性。与许多重要结果一样，其证明几乎是平凡的。

> **定理 3.6.1（切比雪夫不等式，Chebychev's Inequality）**
>
> 设 $X$ 是随机变量，$g(x)$ 是非负函数。则对任意 $r > 0$，
>
> $$
> P\bigl( g(X) \geq r \bigr) \leq \frac{\mathrm{E} g(X)}{r}.
> $$
>
> **证明**
>
> $$
> \begin{aligned}
> \mathrm{E} g(X) &= \int_{-\infty}^{\infty} g(x)\, f_X(x)\, dx\\
> &\geq \int_{\{x : g(x) \geq r\}} g(x)\, f_X(x)\, dx \qquad （g\ \text{非负}）\\
> &\geq r \int_{\{x : g(x) \geq r\}} f_X(x)\, dx\\
> &= r\, P\bigl( g(X) \geq r \bigr). \qquad （\text{定义}）
> \end{aligned}
> $$
>
> 整理即得所需不等式。 ∎

> **例 3.6.2（切比雪夫不等式的说明）**
>
> 切比雪夫不等式最广泛的使用涉及均值与方差。取 $g(x) = (x - \mu)^2/\sigma^2$，其中 $\mu = \mathrm{E} X$，$\sigma^2 = \mathrm{Var} X$。为方便写 $r = t^2$，则
>
> $$
> P\Bigl( \frac{(X - \mu)^2}{\sigma^2} \geq t^2 \Bigr) \leq \frac{1}{t^2}\, \mathrm{E}\Bigl[ \frac{(X - \mu)^2}{\sigma^2} \Bigr] = \frac{1}{t^2}.
> $$
>
> 做显然的代数变形，得不等式
>
> $$
> P\bigl( |X - \mu| \geq t \sigma \bigr) \leq \frac{1}{t^2},
> $$
>
> 及其伴随形式
>
> $$
> P\bigl( |X - \mu| < t \sigma \bigr) \geq 1 - \frac{1}{t^2},
> $$
>
> 它用 $\sigma$ 给出了偏差 $|X - \mu|$ 的普适界。例如取 $t = 2$：
>
> $$
> P\bigl( |X - \mu| \geq 2\sigma \bigr) \leq \frac{1}{2^2} = 0.25,
> $$
>
> 即随机变量落在其均值 $2\sigma$ 范围之内的机会至少为 75%（无论 $X$ 的分布如何）。

切比雪夫不等式虽然适用广泛，却必然是保守的（例如见习题 3.46 与杂记 3.8.2）。特别地，对某些特定分布常能得到更紧的界。

> **例 3.6.3（正态概率不等式）**
>
> 若 $Z$ 是标准正态变量，则
>
> $$
> P(|Z| \geq t) \leq \sqrt{\frac{2}{\pi}}\, \frac{e^{-t^2/2}}{t}, \qquad \text{对一切}\ t > 0. \tag{3.6.1}
> $$
>
> 与切比雪夫不等式比较：$t = 2$ 时切比雪夫给出 $P(|Z| \geq t) \leq 0.25$，而 $\sqrt{2/\pi}\, e^{-2/2} / 2 = 0.054$，改进巨大。
>
> 为证 (3.6.1)，写
>
> $$
> P(Z \geq t) = \frac{1}{\sqrt{2\pi}} \int_t^{\infty} e^{-x^2/2}\, dx \leq \frac{1}{\sqrt{2\pi}} \int_t^{\infty} \frac{x}{t}\, e^{-x^2/2}\, dx \qquad （\text{因对}\ x > t\ \text{有}\ x/t > 1）
> $$
>
> $$
> = \frac{1}{\sqrt{2\pi}}\, \frac{e^{-t^2/2}}{t},
> $$
>
> 再用事实 $P(|Z| \geq t) = 2 P(Z \geq t)$。$P(|Z| \geq t)$ 的下界可用类似方法建立（见习题 3.47）。

还有许多其他概率不等式，几乎都与切比雪夫精神相似。例如我们将见到（习题 3.45）

$$
P(X \geq a) \leq e^{-at} M_X(t),
$$

当然这一不等式要求 mgf 存在。还有比切比雪夫更紧但需要更多假设的不等式（详见杂记 3.8.2）。

### 3.6.2 恒等式（Identities）

本节给出各种恒等式的抽样，它们不仅可用于建立定理，还可减轻数值计算负担。整类恒等式可视为“递推关系”，前面已见过几个。回顾若 $X \sim \mathrm{Poisson}(\lambda)$，则

$$
P(X = x + 1) = \frac{\lambda}{x + 1}\, P(X = x), \tag{3.6.2}
$$

使我们能从 $P(X = 0) = e^{-\lambda}$ 出发递推地计算泊松概率。几乎所有离散分布都有类似 (3.6.2) 的关系（见习题 3.48）；有时连续分布也有稍不同形式的这类关系。

> **定理 3.6.4（伽马概率的递推）**
>
> 设 $X_{\alpha,\beta}$ 表示 $\mathrm{gamma}(\alpha, \beta)$ 随机变量，pdf 为 $f(x \mid \alpha, \beta)$，$\alpha > 1$。则对任意常数 $a$ 与 $b$，
>
> $$
> P(a < X_{\alpha,\beta} < b) = \beta\, \bigl( f(a \mid \alpha, \beta) - f(b \mid \alpha, \beta) \bigr) + P(a < X_{\alpha - 1, \beta} < b). \tag{3.6.3}
> $$
>
> **证明**　由定义，
>
> $$
> P(a < X_{\alpha,\beta} < b) = \frac{1}{\Gamma(\alpha) \beta^{\alpha}} \int_a^{b} x^{\alpha - 1} e^{-x/\beta}\, dx
> $$
>
> $$
> = \frac{1}{\Gamma(\alpha) \beta^{\alpha}} \left[ \Bigl. -x^{\alpha - 1} \beta\, e^{-x/\beta} \Bigr|_a^{b} + \int_a^{b} (\alpha - 1)\, x^{\alpha - 2}\, \beta\, e^{-x/\beta}\, dx \right],
> $$
>
> 这里用分部积分，取 $u = x^{\alpha-1}$，$dv = e^{-x/\beta}\, dx$。继续：
>
> $$
> P(a < X_{\alpha,\beta} < b) = \beta\, \bigl( f(a \mid \alpha, \beta) - f(b \mid \alpha, \beta) \bigr) + \frac{(\alpha - 1)}{\Gamma(\alpha) \beta^{\alpha - 1}} \int_a^{b} x^{\alpha - 2} e^{-x/\beta}\, dx.
> $$
>
> 用 $\Gamma(\alpha) = (\alpha - 1) \Gamma(\alpha - 1)$，可见最后一项是 $P(a < X_{\alpha-1,\beta} < b)$。 ∎

若 $\alpha$ 是整数，反复使用 (3.6.3) 最终会得到可以解析求值的积分（$\alpha = 1$ 时即指数分布）。因此我们可以轻松计算这些伽马概率。

有一整类恒等式依赖分部积分。第一个归于 Charles Stein，他在估计多元正态均值的工作中使用了它（Stein 1973, 1981）。

> **引理 3.6.5（斯坦引理，Stein's Lemma）**
>
> 设 $X \sim n(\theta, \sigma^2)$，$g$ 是满足 $\mathrm{E}|g'(X)| < \infty$ 的可微函数。则
>
> $$
> \mathrm{E}\bigl[ g(X)(X - \theta) \bigr] = \sigma^2\, \mathrm{E} g'(X).
> $$
>
> **证明**　左端为
>
> $$
> \mathrm{E}\bigl[ g(X)(X - \theta) \bigr] = \frac{1}{\sqrt{2\pi}\, \sigma} \int_{-\infty}^{\infty} g(x)\, (x - \theta)\, e^{-(x - \theta)^2/(2\sigma^2)}\, dx.
> $$
>
> 用分部积分，取 $u = g(x)$，$dv = (x - \theta) e^{-(x-\theta)^2/(2\sigma^2)}\, dx$，得
>
> $$
> \mathrm{E}\bigl[ g(X)(X - \theta) \bigr] = \frac{1}{\sqrt{2\pi}\, \sigma} \left[ \Bigl. -\sigma^2\, g(x)\, e^{-(x - \theta)^2/(2\sigma^2)} \Bigr|_{-\infty}^{\infty} + \int_{-\infty}^{\infty} \sigma^2\, g'(x)\, e^{-(x - \theta)^2/(2\sigma^2)}\, dx \right].
> $$
>
> 关于 $g'$ 的条件足以保证第一项为 0，右端剩下的正是 $\sigma^2\, \mathrm{E} g'(X)$。 ∎

> **例 3.6.6（正态的高阶矩）**
>
> 斯坦引理使高阶矩的计算相当容易。例如若 $X \sim n(\theta, \sigma^2)$，则
>
> $$
> \begin{aligned}
> \mathrm{E} X^3 &= \mathrm{E} X^2 (X - \theta + \theta)\\
> &= \mathrm{E} X^2 (X - \theta) + \theta\, \mathrm{E} X^2\\
> &= 2\sigma^2\, \mathrm{E} X + \theta\, \mathrm{E} X^2 \qquad （g(x) = x^2,\ g'(x) = 2x）\\
> &= 2\sigma^2 \theta + \theta (\sigma^2 + \theta^2)\\
> &= 3\theta\sigma^2 + \theta^3.
> \end{aligned}
> $$

许多分布都有类似的分部积分恒等式（见习题 3.49 与 Hudson (1978)）。利用特定分布的性质也可以得到有用的恒等式，如下面定理所示。

> **定理 3.6.7（卡方分布的恒等式）**
>
> 设 $\chi_p^2$ 表示自由度为 $p$ 的卡方随机变量。对任意函数 $h(x)$，
>
> $$
> \mathrm{E} h\bigl( \chi_p^2 \bigr) = p\, \mathrm{E}\Bigl[ \frac{h\bigl( \chi_{p+2}^2 \bigr)}{\chi_{p+2}^2} \Bigr], \tag{3.6.4}
> $$
>
> 前提是各期望存在。
>
> **证明**　“前提是各期望存在”是回避对 $h$ 规定条件的一种省略说法；一般而言，合理的函数都满足 (3.6.4)。我们有
>
> $$
> \mathrm{E} h\bigl( \chi_p^2 \bigr) = \frac{1}{\Gamma(p/2)\, 2^{p/2}} \int_0^{\infty} h(x)\, x^{(p/2) - 1} e^{-x/2}\, dx = \frac{1}{\Gamma(p/2)\, 2^{p/2}} \int_0^{\infty} h(x)\, \frac{x^{((p+2)/2) - 1} e^{-x/2}}{x}\, dx,
> $$
>
> 最后一步是把被积函数乘以 $x/x$。现在写
>
> $$
> \Gamma\Bigl( \frac{p}{2} \Bigr) 2^{p/2} = \frac{\Gamma\bigl( (p+2)/2 \bigr)\, 2^{(p+2)/2}}{p},
> $$
>
> 故
>
> $$
> \mathrm{E} h\bigl( \chi_p^2 \bigr) = p\, \frac{1}{\Gamma\bigl( (p+2)/2 \bigr)\, 2^{(p+2)/2}} \int_0^{\infty} \frac{h(x)\, x^{((p+2)/2) - 1} e^{-x/2}}{x}\, dx = p\, \mathrm{E}\Bigl[ \frac{h\bigl( \chi_{p+2}^2 \bigr)}{\chi_{p+2}^2} \Bigr].
> $$
>
> ∎

用 (3.6.4) 做某些矩计算非常容易。例如 $\chi_p^2$ 的均值：

$$
\mathrm{E} \chi_p^2 = p\, \mathrm{E}\Bigl[ \frac{\chi_{p+2}^2}{\chi_{p+2}^2} \Bigr] = p\, \mathrm{E}(1) = p;
$$

二阶矩：

$$
\mathrm{E} \bigl( \chi_p^2 \bigr)^2 = p\, \mathrm{E}\Bigl[ \Bigl( \frac{\chi_{p+2}^2}{\chi_{p+2}^2} \Bigr)^{2} \cdot \chi_{p+2}^2 \Bigr] = p\, \mathrm{E} \chi_{p+2}^2 = p(p + 2).
$$

故 $\mathrm{Var} \chi_p^2 = p(p+2) - p^2 = 2p$。

本节以先前恒等式的离散类似物作结。定理 3.6.8 中两条恒等式的一般版本归功于 Hwang (1982)。

> **定理 3.6.8（Hwang 恒等式）**
>
> 设 $g(x)$ 是满足 $-\infty < \mathrm{E} g(X) < \infty$ 且 $-\infty < g(-1) < \infty$ 的函数。则
>
> - a. 若 $X \sim \mathrm{Poisson}(\lambda)$，
>
>   $$
>   \mathrm{E}\bigl( \lambda\, g(X) \bigr) = \mathrm{E}\bigl( X\, g(X - 1) \bigr). \tag{3.6.5}
>   $$
>
> - b. 若 $X \sim \mathrm{negative\ binomial}(r, p)$，
>
>   $$
>   \mathrm{E}\bigl( (1 - p)\, g(X) \bigr) = \mathrm{E}\Bigl[ \frac{X}{r + X - 1}\, g(X - 1) \Bigr]. \tag{3.6.6}
>   $$
>
>
> **证明**　证 (a)，(b) 留作习题 3.50。我们有
>
> $$
> \mathrm{E}\bigl( \lambda\, g(X) \bigr) = \sum_{x=0}^{\infty} \lambda\, g(x)\, \frac{e^{-\lambda} \lambda^{x}}{x!}
> = \sum_{x=0}^{\infty} g(x)\, \frac{e^{-\lambda} \lambda^{x+1} (x+1)}{x!\, (x+1)}
> = \sum_{x=0}^{\infty} (x + 1)\, g(x)\, \frac{e^{-\lambda} \lambda^{x+1}}{(x+1)!}.
> $$
>
> 变换求和指标，写 $y = x + 1$：当 $x$ 从 0 到 $\infty$ 时 $y$ 从 1 到 $\infty$。于是
>
> $$
> \mathrm{E}\bigl( \lambda\, g(X) \bigr) = \sum_{y=1}^{\infty} y\, g(y - 1)\, \frac{e^{-\lambda} \lambda^{y}}{y!} = \sum_{y=0}^{\infty} y\, g(y - 1)\, \frac{e^{-\lambda} \lambda^{y}}{y!} \qquad （\text{补加的项为}\ 0），
> $$
>
> 最后这个和正是 $\mathrm{Poisson}(\lambda)$ 的期望，故等于 $\mathrm{E}\bigl( X g(X-1) \bigr)$。 ∎

Hwang (1982) 以与 Stein 类似的方式使用其恒等式，证明关于多元估计量的结果。该恒等式还有其他应用，特别是矩的计算。

> **例 3.6.9（泊松的高阶矩）**
>
> 对 $X \sim \mathrm{Poisson}(\lambda)$，取 $g(x) = x^2$ 并用 (3.6.5)：
>
> $$
> \mathrm{E}\bigl( \lambda X^2 \bigr) = \mathrm{E}\bigl( X (X - 1)^2 \bigr) = \mathrm{E}\bigl( X^3 - 2X^2 + X \bigr).
> $$
>
> 因此 $\mathrm{Poisson}(\lambda)$ 的三阶矩为
>
> $$
> \mathrm{E} X^3 = \lambda\, \mathrm{E} X^2 + 2\, \mathrm{E} X^2 - \mathrm{E} X = \lambda (\lambda + \lambda^2) + 2 (\lambda + \lambda^2) - \lambda = \lambda^3 + 3\lambda^2 + \lambda.
> $$
>
> 对负二项分布，在 (3.6.6) 中取 $g(x) = r + x$ 可算出均值：
>
> $$
> \mathrm{E}\bigl( (1 - p)(r + X) \bigr) = \mathrm{E}\Bigl[ \frac{X}{r + X - 1}\, (r + X - 1) \Bigr] = \mathrm{E} X,
> $$
>
> 整理得
>
> $$
> (\mathrm{E} X)\bigl( (1 - p) - 1 \bigr) = -r(1 - p),
> $$
>
> 即
>
> $$
> \mathrm{E} X = \frac{r(1 - p)}{p}.
> $$
>
> 其他矩可类似计算。

## 3.7 习题（Exercises）

**3.1** 设 $X$ 服从一般离散均匀分布 $\mathrm{discrete\ uniform}(N_0, N_1)$，即对值 $N_0, N_0+1, \ldots, N_1$ 中的每一个赋予相等概率，其中 $N_0 \leq N_1$ 且均为整数。求 $\mathrm{E} X$ 与 $\mathrm{Var} X$ 的表达式。

**3.2** 某制造商从供应商处收到一批 100 个零件；若批中多于五个零件有缺陷，则该批不可接受。制造商将随机抽取 $K$ 个零件检验，若样本中未发现缺陷品则接收该批。(a) $K$ 要多大才能保证制造商接收不可接受批的概率小于 $0.10$？(b) 设制造商决定当样本中至多一个缺陷品时接收该批。$K$ 要多大才能保证接收不可接受批的概率小于 $0.10$？

**3.3** 某些街口的交通流有时可建模为伯努利试验序列：假定任意一秒内有一辆汽车经过的概率为常数 $p$，且不同秒内汽车经过相互独立。把秒当作不可分的时间单位（试验），伯努利模型适用。设行人只有在接下来的三秒内没有汽车经过时才能过街。求行人恰好等待四秒后才开始过街的概率。

**3.4** 某人有 $n$ 把钥匙想开门，随机试钥匙，恰有一把能开门。求试验次数的均值，若：(a) 试过的钥匙不放回（不淘汰错误钥匙继续选）；　　 (b) 淘汰试过的错误钥匙。

**3.5** 已知标准药物在 80% 的使用案例中有效。新药在 100 名患者上试验，85 例有效。新药更优吗？（提示：在新旧药同等有效的前提下，评估观察到 85 例或更多成功的概率。）

**3.6** 预计大量昆虫将被某品种玫瑰吸引。某商业杀虫剂宣传其有效性为 99%。设 2000 只昆虫侵入了施药的玫瑰园，令 $X =$  存活昆虫数。(a) 什么概率分布可为该实验提供合理模型？(b) 用 (a) 的模型写出（不求值）“少于 100 只昆虫存活”的概率表达式；(c) 求 (b) 中概率的近似值。

**3.7** 设某类曲奇中巧克力豆的数目服从泊松分布。我们希望随机选取的曲奇至少含两颗巧克力豆的概率大于 $0.99$。求保证这一概率的分布均值的最小值。

**3.8** 两家电影院为 1000 名观众竞争。设每位观众独立且“无偏好”地在两影院间选择。设 $N$ 为每个影院的座位数。(a) 用二项模型，求保证“因满座而拒绝顾客”的概率小于 1% 的 $N$ 的表达式；(b) 用正态近似求 $N$ 的数值。

**3.9** 被作为惊人的“百万分之一”巧合报道的新闻，仔细考察后往往并非罕见事件，甚至可以预期其发生。几年前纽约州某小学报告其 incoming 幼儿园班含五对双胞胎。此事当然传遍全州，校长称之为“统计上不可能”。果真如此吗？还是 Diaconis and Mosteller (1989) 所谓“真大数定律”的实例？来算一算。(a) 双胞胎出生概率约为 $1/90$，且可假设小学约有 60 名儿童入幼儿园（三个班每班 20 人）。解释为何“统计上不可能”的事件可以视为 $\mathrm{binomial}(60, 1/90)$ 中五次或以上成功的概率。它真的罕见到值得报道吗？(b) 即使 (a) 中的概率罕见得值得报道，还要考虑这本可能发生在该县的任何学校、该州的任何县，而报道方式完全相同。（“真大数定律”开始发挥作用。）纽约州有 62 个县，合理假设每县有五所小学。该事件还够得上“统计上不可能”吗，还是正在变成可以预期发生的事？(c) 若 (b) 中的概率仍显很小，再考虑此事本可能发生在 50 个州中任何一个、过去十年中任何一年，而仍会得到同样的报道。除 Diaconis and Mosteller (1989) 外，关于巧合的更多内容见 Hanley (1992)。

**3.10** Shuster (1991) 描述了他为一起涉及可卡因出售的法庭案件所做的一系列概率计算。佛罗里达州某警察局查获 496 包疑似可卡因，随机抽四包检验，确认确为可卡因。警方又随机另取两包，假扮毒贩把这两包卖给被告。这两包在被检验证实之前丢失。(a) 若原 496 包由 $N$ 包可卡因与 $M = 496 - N$ 包非可卡因组成，证明“选出四包可卡因后又选出两包非可卡因”的概率——即被告未买可卡因（无罪）的概率——为

$$
\frac{\dbinom{N}{4}\dbinom{M}{2}}{\dbinom{N+M}{4}\dbinom{N+M-4}{2}}.
$$

(b) 关于 $M$ 与 $N$ 最大化 (a) 中的概率，即最大化被告的“无罪概率”。证明该概率为 $0.022$，在 $M = 165$、$N = 331$ 处取得。

**3.11** 超几何分布既可用二项分布也可用泊松分布近似（当然还有其他近似，但本习题只关注这两个）。设 $X$ 服从超几何分布

$$
P(X = x \mid N, M, K) = \frac{\dbinom{M}{x} \dbinom{N-M}{K-x}}{\dbinom{N}{K}}, \qquad x = 0, 1, \ldots, K.
$$

(a) 证明当 $N \to \infty$、$M \to \infty$ 且 $M/N \to p$ 时，

$$
P(X = x \mid N, M, K) \to \binom{K}{x} p^{x} (1 - p)^{K - x}, \qquad x = 0, 1, \ldots, K.
$$

（斯特林公式（习题 1.28）或有帮助。）(b) 利用二项可用泊松近似的事实，证明若 $N \to \infty$、$M \to \infty$、$K \to \infty$、$M/N \to 0$ 且 $KM/N \to \lambda$，则

$$
P(X = x \mid N, M, K) \to \frac{e^{-\lambda} \lambda^{x}}{x!}, \qquad x = 0, 1, \ldots.
$$

(c) 不借助于泊松对二项的近似，直接验证 (b) 中的近似。（引理 2.3.14 有帮助。）

**3.12** 设 $X \sim \mathrm{binomial}(n, p)$，$Y \sim \mathrm{negative\ binomial}(r, p)$。证明 $F_X(r - 1) = 1 - F_Y(n - r)$。

**3.13** 截尾离散分布指某一类无法观测并从样本空间中剔除的分布。特别地，若 $X$ 的值域为 $0, 1, 2, \ldots$ 且 0 类无法观测（通常如此），则 0-截尾随机变量 $X_T$ 的 pmf 为

$$
P\bigl( X_T = x \bigr) = \frac{P(X = x)}{P(X > 0)}, \qquad x = 1, 2, \ldots
$$

从下列出发点求 0-截尾随机变量的 pmf、均值与方差：(a) $X \sim \mathrm{Poisson}(\lambda)$；(b) $X \sim \mathrm{negative\ binomial}(r, p)$（如 (3.2.10)）。

**3.14** 从 0-截尾负二项分布（见习题 3.13）出发，令 $r \to 0$ 得到一个有趣的分布：对数级数分布（logarithmic series distribution）。若

$$
P(X = x) = \frac{-(1 - p)^{x}}{x \log p}, \qquad x = 1, 2, \ldots, \quad 0 < p < 1,
$$

则称随机变量 $X$ 服从参数为 $p$ 的对数级数分布。(a) 验证这确实定义了一个合法的概率函数；(b) 求 $X$ 的均值与方差。（对数级数分布在为物种丰度建模时很有用；更详细的讨论见 Stuart and Ord (1987)。）

**3.15** 3.2 节曾断言 $\mathrm{Poisson}(\lambda)$ 分布是 $\mathrm{negative\ binomial}(r, p)$ 分布在 $r \to \infty$、$p \to 1$、$r(1 - p) \to \lambda$ 时的极限。证明在这些条件下负二项的 mgf 收敛到泊松的 mgf。

**3.16** 验证正文中给出的关于伽马函数的两个恒等式：(a) $\Gamma(\alpha + 1) = \alpha\, \Gamma(\alpha)$；　　 (b) $\Gamma\bigl( \tfrac{1}{2} \bigr) = \sqrt{\pi}$。

**3.17** 为伽马分布建立与 (3.3.18) 类似的公式：若 $X \sim \mathrm{gamma}(\alpha, \beta)$，则对任意正常数 $\nu$，

$$
\mathrm{E} X^{\nu} = \frac{\beta^{\nu}\, \Gamma(\nu + \alpha)}{\Gamma(\alpha)}.
$$

**3.18** 负二项随机变量与伽马随机变量之间有一个有趣的关系，有时可提供有用的近似。设 $Y$ 是参数为 $r$ 与 $p$（$p$ 为成功概率）的负二项随机变量。证明当 $p \to 0$ 时随机变量 $pY$ 的 mgf 收敛到参数为 $r$ 与 1 的伽马分布的 mgf。

**3.19** 证明

$$
\int_x^{\infty} \frac{1}{\Gamma(\alpha)}\, z^{\alpha - 1} e^{-z}\, dz = \sum_{y=0}^{\alpha - 1} \frac{x^{y} e^{-x}}{y!}, \qquad \alpha = 1, 2, 3, \ldots
$$

（提示：用分部积分。）把该公式表为泊松随机变量与伽马随机变量之间的概率关系。

**3.20** 设随机变量 $X$ 的 pdf 为

$$
f(x) = \sqrt{\frac{2}{\pi}}\, e^{-x^2/2}, \qquad 0 < x < \infty.
$$

(a) 求 $X$ 的均值与方差。（该分布有时称为折叠正态分布，folded normal。）(b) 若 $X$ 服从折叠正态分布，求变换 $g(X) = Y$ 及 $\alpha$、$\beta$ 的取值，使 $Y \sim \mathrm{gamma}(\alpha, \beta)$。

**3.21** 写出定义 pdf

$$
f(x) = \frac{1}{\pi}\, \frac{1}{1 + x^2}
$$

的 mgf 的积分。该积分有限吗？（你预期它有限吗？）

**3.22** 对下列各分布，验证正文中给出的 $\mathrm{E} X$ 与 $\mathrm{Var} X$ 公式。(a) 若 $X \sim \mathrm{Poisson}(\lambda)$，验证 $\mathrm{Var} X$。（提示：计算 $\mathrm{E} X(X-1) = \mathrm{E} X^2 - \mathrm{E} X$。）(b) 若 $X \sim \mathrm{negative\ binomial}(r, p)$，验证 $\mathrm{Var} X$。(c) 若 $X \sim \mathrm{gamma}(\alpha, \beta)$，验证 $\mathrm{Var} X$。(d) 若 $X \sim \mathrm{beta}(\alpha, \beta)$，验证 $\mathrm{E} X$ 与 $\mathrm{Var} X$。(e) 若 $X \sim \mathrm{double\ exponential}(\mu, \sigma)$，验证 $\mathrm{E} X$ 与 $\mathrm{Var} X$。

**3.23** 帕累托分布（Pareto distribution）以参数 $\alpha$ 与 $\beta$ 为特征，pdf 为

$$
f(x) = \frac{\beta\, \alpha^{\beta}}{x^{\beta + 1}}, \qquad \alpha < x < \infty, \quad \alpha > 0, \quad \beta > 0.
$$

(a) 验证 $f(x)$ 是 pdf；(b) 导出该分布的均值与方差；(c) 证明若 $\beta \leq 2$ 则方差不存在。

**3.24** 许多“有名字”的分布是前文已讨论的常见分布的特例。对下列每个有名的分布，导出其 pdf 形式、验证其为 pdf，并计算均值与方差。(a) 若 $X \sim \mathrm{exponential}(\beta)$，则 $Y = X^{1/\gamma}$ 服从 $\mathrm{Weibull}(\gamma, \beta)$ 分布，$\gamma > 0$ 为常数；(b) 若 $X \sim \mathrm{exponential}(\beta)$，则 $Y = (2X/\beta)^{1/2}$ 服从瑞利分布（Rayleigh distribution）；(c) 若 $X \sim \mathrm{gamma}(a, b)$，则 $Y = 1/X$ 服从逆伽马分布 $\mathrm{IG}(a, b)$（该分布在方差的贝叶斯估计中有用；见习题 7.23）；(d) 若 $X \sim \mathrm{gamma}\bigl( \tfrac{3}{2}, \beta \bigr)$，则 $Y = (X/\beta)^{1/2}$ 服从麦克斯韦分布（Maxwell distribution）；(e) 若 $X \sim \mathrm{exponential}(1)$，则 $Y = \alpha - \gamma \log X$ 服从 $\mathrm{Gumbel}(\alpha, \gamma)$ 分布，$-\infty < \alpha < \infty$，$\gamma > 0$（Gumbel 分布亦称极值分布，extreme value distribution）。

**3.25** 设随机变量 $T$ 是某对象的寿命（可以是电子元件的寿命，也可以是接受某处理的受试者的寿命）。与随机变量 $T$ 相联系的***风险函数***（hazard function）$h_T(t)$ 定义为

$$
h_T(t) = \lim_{\delta \to 0} \frac{P\bigl( t \leq T < t + \delta \mid T \geq t \bigr)}{\delta}.
$$

于是可以把 $h_T(t)$ 解释为：已知对象存活到时刻 $t$ 的条件下，对象存活略过时刻 $t$ 的概率的瞬时变化率。证明若 $T$ 是连续随机变量，则

$$
h_T(t) = \frac{f_T(t)}{1 - F_T(t)} = -\, \frac{d}{dt} \log\bigl( 1 - F_T(t) \bigr).
$$

**3.26** 验证下列 pdf 具有指明的风险函数（见习题 3.25）。(a) 若 $T \sim \mathrm{exponential}(\beta)$，则 $h_T(t) = 1/\beta$；(b) 若 $T \sim \mathrm{Weibull}(\gamma, \beta)$，则 $h_T(t) = (\gamma/\beta)\, t^{\gamma - 1}$；(c) 若 $T \sim \mathrm{logistic}(\mu, \beta)$，即

$$
F_T(t) = \frac{1}{1 + e^{-(t - \mu)/\beta}},
$$

则 $h_T(t) = (1/\beta)\, F_T(t)$。

**3.27** 对下列每族分布，判断族中所有 pdf 是否都单峰（单峰见习题 2.27）。(a) $\mathrm{uniform}(a, b)$；　　 (b) $\mathrm{gamma}(\alpha, \beta)$；　　 (c) $n(\mu, \sigma^2)$；　　 (d) $\mathrm{beta}(\alpha, \beta)$。

**3.28** 证明下列每一族都是指数族。(a) $\mu$ 已知或 $\sigma$ 已知的正态族；(b) $\alpha$ 已知、$\beta$ 已知或两者都未知的伽马族；(c) $\alpha$ 已知、$\beta$ 已知或两者都未知的贝塔族；(d) 泊松族；(e) $r$ 已知、$0 < p < 1$ 的负二项族。

**3.29** 对习题 3.28 的每一族，描述其自然参数空间。

**3.30** 用定理 3.4.2 的恒等式：(a) 计算二项随机变量的方差；(b) 计算 $\mathrm{beta}(a, b)$ 随机变量的均值与方差。

**3.31** 本习题证明定理 3.4.2。(a) 从等式

$$
\int f(x \mid \theta)\, dx = \int h(x)\, c(\theta) \exp\Bigl( \sum_{i=1}^{k} w_i(\theta)\, t_i(x) \Bigr)\, dx = 1
$$

出发，两边对 $\theta_j$ 求导，再整理各项以建立 (3.4.4)。（事实 $\frac{d}{dx} \log g(x) = g'(x)/g(x)$ 有帮助。）(b) 对上述等式再求导一次，整理以建立 (3.4.5)。（事实 $\frac{d^2}{dx^2} \log g(x) = \bigl( g''(x)/g(x) \bigr) - \bigl( g'(x)/g(x) \bigr)^2$ 有帮助。）

**3.32** (a) 若指数族可写成 (3.4.7) 的形式，证明定理 3.4.2 的恒等式简化为

$$
\mathrm{E}\bigl( t_j(X) \bigr) = -\, \frac{\partial}{\partial \eta_j} \log c^{*}(\eta), \qquad
\mathrm{Var}\bigl( t_j(X) \bigr) = -\, \frac{\partial^2}{\partial \eta_j^2} \log c^{*}(\eta).
$$

(b) 用该恒等式计算 $\mathrm{gamma}(a, b)$ 随机变量的均值与方差。

**3.33** 对下列每一族：i. 验证其为指数族；ii. 描述 $\theta$ 参数向量所在的曲线；iii. 草绘曲线参数空间的图形。(a) $n(\theta, \theta)$；　　 (b) $n(\theta, a\theta^2)$，$a$ 已知；　　 (c) $\mathrm{gamma}(\alpha, 1/\alpha)$；　　 (d) $f(x \mid \theta) = C \exp\bigl( -(x - \theta)^4 \bigr)$，$C$ 为归一化常数。

**3.34** 例 3.4.9 表明正态近似可产生曲线指数族。对下列每个正态近似：i. 描述 $\theta$ 参数向量所在的曲线；ii. 草绘曲线参数空间的图形。(a) 泊松近似：$\bar{X} \sim n(\lambda, \lambda/n)$；(b) 二项近似：$\bar{X} \sim n\bigl( p,\ p(1 - p)/n \bigr)$；(c) 负二项近似：$\bar{X} \sim n\bigl( r(1 - p)/p,\ r(1 - p)/(np^2) \bigr)$。

**3.35** (a) 近似泊松的正态族也可参数化为 $n(e^{\theta}, e^{\theta})$，$-\infty < \theta < \infty$。草绘参数空间的图形，并与习题 3.34(a) 的近似比较。(b) 设 $X \sim \mathrm{gamma}(\alpha, \beta)$ 并假定 $\mathrm{E} X = \mu$。草绘参数空间的图形。(c) 设 $X_i \sim \mathrm{gamma}(\alpha_i, \beta_i)$，$i = 1, 2, \ldots, n$，并假定 $\mathrm{E} X_i = \mu$。描述参数空间 $(\alpha_1, \ldots, \alpha_n, \beta_1, \ldots, \beta_n)$。

**3.36** 考虑 pdf $f(x) = \tfrac{3}{4}\bigl( 1 - x^6 \bigr)$（$-1 < x < 1$）。在同一坐标系中对下列情形绘制 $(1/\sigma) f\bigl( (x - \mu)/\sigma \bigr)$ 的图形：(a) $\mu = 0$，$\sigma = 1$；　　 (b) $\mu = 3$，$\sigma = 1$；　　 (c) $\mu = 3$，$\sigma = 2$。

**3.37** 证明：若 $f(x)$ 是关于 0 对称的 pdf，则 $\mu$ 是位置—尺度 pdf $(1/\sigma) f\bigl( (x - \mu)/\sigma \bigr)$（$-\infty < x < \infty$）的中位数。

**3.38** 设 $Z$ 是以 $f(z)$ 为 pdf 的随机变量。定义 $z_\alpha$ 为满足

$$
\alpha = P(Z > z_\alpha) = \int_{z_\alpha}^{\infty} f(z)\, dz
$$

的数。证明若 $X$ 是以 $(1/\sigma) f\bigl( (x - \mu)/\sigma \bigr)$ 为 pdf 的随机变量，且 $x_\alpha = \sigma z_\alpha + \mu$，则 $P(X > x_\alpha) = \alpha$。（于是若有 $z_\alpha$ 值的表，就能为位置—尺度族的任何成员方便地算出 $x_\alpha$。）

**3.39** 考虑 3.3 节定义的柯西族。该族可扩展为位置—尺度族，pdf 形如

$$
f(x \mid \mu, \sigma) = \frac{1}{\sigma \pi \Bigl[ 1 + \bigl( \frac{x - \mu}{\sigma} \bigr)^2 \Bigr]}, \qquad -\infty < x < \infty.
$$

柯西分布的均值与方差不存在，故参数 $\mu$ 与 $\sigma^2$ 不是均值与方差；但它们确实有重要含义。证明若 $X$ 服从参数为 $\mu$ 与 $\sigma$ 的柯西分布，则(a) $\mu$ 是 $X$ 分布的中位数，即 $P(X \geq \mu) = P(X \leq \mu) = \tfrac{1}{2}$；(b) $\mu + \sigma$ 与 $\mu - \sigma$ 是 $X$ 分布的四分位数，即 $P(X \geq \mu + \sigma) = P(X \leq \mu - \sigma) = \tfrac{1}{4}$。（提示：先对 $\mu = 0$、$\sigma = 1$ 证明，再用习题 3.38。）

**3.40** 设 $f(x)$ 是均值为 $\mu$、方差为 $\sigma^2$ 的任意 pdf。说明如何基于 $f(x)$ 构造一个位置—尺度族，使族的标准 pdf（记作 $f^{*}(x)$）均值为 0、方差为 1。

**3.41** 称 cdf 族 $\{F(x \mid \theta), \theta \in \Theta\}$ 关于 $\theta$ ***随机递增***（stochastically increasing），若 $\theta_1 > \theta_2 \Rightarrow F(x \mid \theta_1)$ 随机地大于 $F(x \mid \theta_2)$（“随机地大于”见习题 1.49）。(a) 证明对固定 $\sigma^2$，$n(\mu, \sigma^2)$ 族关于 $\mu$ 随机递增；(b) 证明 (3.3.6) 的 $\mathrm{gamma}(\alpha, \beta)$ 族关于 $\beta$（尺度参数）随机递增（固定形状参数 $\alpha$）。

**3.42** 参照习题 3.41 中随机递增族的定义。(a) 证明位置族关于其位置参数随机递增；(b) 证明若样本空间为 $[0, \infty)$，则尺度族关于其尺度参数随机递增。

**3.43** 称 cdf 族 $\{F(x \mid \theta), \theta \in \Theta\}$ 关于 $\theta$ ***随机递减***（stochastically decreasing），若 $\theta_1 > \theta_2 \Rightarrow F(x \mid \theta_2)$ 随机地大于 $F(x \mid \theta_1)$（见习题 3.41 与 3.42）。(a) 证明若 $X \sim F_X(x \mid \theta)$，$X$ 的样本空间为 $(0, \infty)$，且 $F_X(x \mid \theta)$ 关于 $\theta$ 随机递增，则 $F_Y(y \mid \theta)$ 关于 $\theta$ 随机递减，其中 $Y = 1/X$；(b) 证明若 $X \sim F_X(x \mid \theta)$，$F_X(x \mid \theta)$ 关于 $\theta$ 随机递增且 $\theta > 0$，则 $F_X(x \mid \theta_1)$ 关于 $\theta$ 随机递减。

**3.44** 对 $\mathrm{E} X^2$ 与 $\mathrm{E}|X|$ 都存在的任意随机变量 $X$，证明 $P(|X| \geq b)$ 不超过 $\mathrm{E} X^2 / b^2$ 与 $\mathrm{E}|X|/b$ 中的任何一个，其中 $b$ 是正常数。若 $f(x) = e^{-x}$（$x > 0$），证明当 $b = 3$ 时一个界更好，而当 $b = 2$ 时另一个更好。（注意马尔可夫不等式，杂记 3.8.2。）

**3.45** 设 $X$ 是具有矩母函数 $M_X(t)$（$-h < t < h$）的随机变量。(a) 证明 $P(X \geq a) \leq e^{-at} M_X(t)$（$0 < t < h$）。（与切比雪夫不等式类似的证明可行。）(b) 类似地证明 $P(X \leq a) \leq e^{-at} M_X(t)$（$-h < t < 0$）。(c) (a) 的特例：对 mgf 有定义的一切 $t \geq 0$，$P(X \geq 0) \leq \mathrm{E} e^{tX}$。对函数 $h(t, x)$ 应施加什么一般条件，才能使“对 $\mathrm{E} h(t, X)$ 存在的一切 $t \geq 0$ 有 $P(X \geq 0) \leq \mathrm{E} h(t, X)$”成立？（(a) 中 $h(t, x) = e^{tx}$。）

**3.46** 对 $X \sim \mathrm{uniform}(0, 1)$ 与 $X \sim \mathrm{exponential}(\lambda)$ 计算 $P\bigl( |X - \mu_X| \geq k \sigma_X \bigr)$，并与切比雪夫不等式给出的界比较。

**3.47** 若 $Z$ 是标准正态随机变量，证明例 3.6.3 中不等式的伴随不等式：

$$
P(|Z| \geq t) \geq \sqrt{\frac{2}{\pi}}\, \frac{t}{1 + t^2}\, e^{-t^2/2}.
$$

**3.48** 为二项分布、负二项分布与超几何分布导出与 (3.6.2) 类似的递推关系。

**3.49** 在对函数 $g$ 的适当假设下，证明斯坦引理的下列类似结论。(a) 若 $X \sim \mathrm{gamma}(\alpha, \beta)$，则

$$
\mathrm{E}\bigl[ g(X)(X - \alpha\beta) \bigr] = \beta\, \mathrm{E}\bigl[ X\, g'(X) \bigr].
$$

(b) 若 $X \sim \mathrm{beta}(\alpha, \beta)$，则

$$
\mathrm{E}\Bigl[ g(X)\, \Bigl( \beta - (\alpha - 1)\, \frac{1 - X}{X} \Bigr) \Bigr] = \mathrm{E}\bigl[ (1 - X)\, g'(X) \bigr].
$$

**3.50** 证明定理 3.6.8 (b) 中关于负二项分布的恒等式。

## 3.8 杂记（Miscellanea）

### 3.8.1 泊松公设（The Poisson Postulates）

泊松分布可以从一组基本假设导出，这些假设有时称为***泊松公设***（Poisson postulates）。它们与所考察过程的物理性质相关。虽然一般而言这些假设不易验证，但它们为实验者提供了一组指导原则，用于考虑泊松分布是否会提供合理的模型。关于泊松公设更完整的处理见经典教材 Feller (1968) 或 Barr and Zehna (1983)。

> **定理 3.8.1（泊松公设）**
>
> 对每个 $t \geq 0$，设 $N_t$ 是具有下列性质的整值随机变量。（把 $N_t$ 想作 0 到 $t$ 时段内到达的次数。）
>
> - i. $N_0 = 0$（开始时无到达）；
>
> - ii. $s < t \Rightarrow N_s$ 与 $N_t - N_s$ 独立（不相交时段内的到达数独立）；
>
> - iii. $N_s$ 与 $N_{t+s} - N_t$ 同分布（到达数只依赖时段长度）；
>
> - iv. $\lim_{t \to 0} \dfrac{P(N_t = 1)}{t} = \lambda$（时段很小时，到达概率与时段长度成正比）；
>
> - v. $\lim_{t \to 0} \dfrac{P(N_t > 1)}{t} = 0$（无同时到达）。
>
>
> 若 i–v 成立，则对任意整数 $n$，
>
> $$
> P(N_t = n) = e^{-\lambda t}\, \frac{(\lambda t)^{n}}{n!},
> $$
>
> 即 $N_t \sim \mathrm{Poisson}(\lambda t)$。

这些公设也可以解释为描述对象在空间中的行为（例如昆虫的移动），从而给出泊松分布在空间分布中的应用。

### 3.8.2 切比雪夫及更精细的不等式（Chebychev and Beyond）

Ghosh and Meeden (1977) 讨论了切比雪夫不等式非常保守、几乎从不取等的事实。若以 $\bar{X}_n$ 记 $X_1, X_2, \ldots, X_n$ 的均值，则切比雪夫不等式断言

$$
P\Bigl( \bigl| \bar{X}_n - \mu \bigr| \geq \frac{k\sigma}{\sqrt{n}} \Bigr) \leq \frac{1}{k^2}.
$$

他们证明了如下定理。

> **定理 3.8.2（切比雪夫界何时可取到）**
>
> 若 $0 < \sigma < \infty$，则
>
> - a. 若 $n = 1$，该不等式对 $k \geq 1$ 可以取到等号，对 $0 < k < 1$ 不能；
>
> - b. 若 $n = 2$，当且仅当 $k = 1$ 时可以取到等号；
>
> - c. 若 $n \geq 3$，该不等式不能取到等号。

对能取等号的情形给出了例子。其大部分技术论证基于下面的不等式，即***马尔可夫不等式***（Markov's Inequality）。

> **引理 3.8.3（马尔可夫不等式）**
>
> 若 $P(Y \geq 0) = 1$ 且 $P(Y = 0) < 1$，则对任意 $r > 0$，
>
> $$
> P(Y \geq r) \leq \frac{\mathrm{E} Y}{r},
> $$
>
> 等号成立当且仅当 $P(Y = r) = p = 1 - P(Y = 0)$，$0 < p \leq 1$。

把马尔可夫不等式应用于量 $Y = (\bar{X}_n - \mu)^2 / \sigma^2$ 即得上面的结果。

切比雪夫不等式如此宽松的一个原因是它对底层分布没有任何限制。加上单峰性这一附加限制，可以得到更紧的界——高斯不等式（Gauss）与 Vysochanskiĭ–Petunin 不等式（细节与基于初等微积分的证明见 Pukelsheim (1994)）。

> **定理 3.8.4（高斯不等式，Gauss Inequality）**
>
> 设 $X \sim f$，$f$ 是众数为 $\nu$ 的单峰密度，定义 $\tau^2 = \mathrm{E}(X - \nu)^2$。则
>
> $$
> P\bigl( |X - \nu| > \varepsilon \bigr) \leq \begin{cases}
> \dfrac{4\tau^2}{9\varepsilon^2} & \text{对一切}\ \varepsilon \geq \sqrt{\dfrac{4}{3}}\, \tau,\\[10pt]
> 1 - \dfrac{\varepsilon}{\sqrt{3}\, \tau} & \text{对一切}\ \varepsilon \leq \sqrt{\dfrac{4}{3}}\, \tau.
> \end{cases}
> $$

虽然这比切比雪夫更紧，但对众数的依赖限制了其用处。Vysochanskiĭ–Petunin 的推广去除了这一限制。

> **定理 3.8.5（Vysochanskiĭ–Petunin 不等式）**
>
> 设 $X \sim f$，$f$ 单峰，对任意点 $\alpha$ 定义 $\xi^2 = \mathrm{E}(X - \alpha)^2$。则
>
> $$
> P\bigl( |X - \alpha| > \varepsilon \bigr) \leq \begin{cases}
> \dfrac{4\xi^2}{9\varepsilon^2} & \text{对一切}\ \varepsilon \geq \sqrt{\dfrac{8}{3}}\, \xi,\\[8pt]
> \dfrac{4\xi^2}{9\varepsilon^2} - \dfrac{1}{3} & \text{对一切}\ \varepsilon \leq \sqrt{\dfrac{8}{3}}\, \xi.
> \end{cases}
> $$

Pukelsheim 指出，取 $\alpha = \mu = \mathrm{E}(X)$、$\varepsilon = 3\sigma$（$\sigma^2 = \mathrm{Var}(X)$）得

$$
P\bigl( |X - \mu| > 3\sigma \bigr) \leq \frac{4}{81} < 0.05,
$$

即所谓***三西格玛法则***（three sigma rule）：$X$ 偏离总体均值超过三个标准差的概率小于 5%。

### 3.8.3 关于指数族的更多内容（More on Exponential Families）

对数正态分布属于指数族吗？(3.3.21) 给出的密度可以化成 (3.4.1) 规定的形式，因此对数正态可以纳入指数族。

按 Brown (1986, Section 1.1) 的方式定义指数族：从非负函数 $\nu(x)$ 出发，定义集合

$$
N = \Bigl\{ \theta : \int_{\mathcal{X}} e^{\theta x}\, \nu(x)\, dx < \infty \Bigr\}.
$$

令 $\lambda(\theta) = \int_{\mathcal{X}} e^{\theta x}\, \nu(x)\, dx$，由

$$
f(x \mid \theta) = \frac{e^{\theta x}\, \nu(x)}{\lambda(\theta)}, \qquad x \in \mathcal{X}, \quad \theta \in N
$$

定义的概率密度族是指数族。$f(x \mid \theta)$ 的矩母函数为

$$
M_X(t) = \int_{\mathcal{X}} e^{tx}\, f(x \mid \theta)\, dx = \frac{\lambda(t + \theta)}{\lambda(\theta)},
$$

由构造可知其存在。若参数空间 $\Theta$ 等于集合 $N$，则称该指数族是满秩的；$\Theta$ 是 $N$ 的低维子集的情形产生曲线指数族。

回到对数正态分布：我们知道它没有 mgf，因此不能满足 Brown 意义下的指数族定义。然而，对数正态满足定理 3.4.2 的期望恒等式，并享有 6.2.1 节（定理 6.2.10）详述的充分性性质。对我们的目的而言，这些正是所需的主要性质，也是把一个分布识别为指数族成员的主要理由。而我们在此不考察的更高级性质，可能需要 mgf 的存在性。

---

[← 上一章](02_Transformations_and_Expectations.md) ｜ [目录](README.md) ｜ [下一章 →](04_Multiple_Random_Variables.md)
