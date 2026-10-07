---
layout: note
kind: note
title: "第 5 章　随机样本的性质（Properties of a Random Sample）"
course: statistics
order: 5
date: 2026-10-07
permalink: /statistics/chap05.html
---

# 第 5 章　随机样本的性质（Properties of a Random Sample）

> *“I'm afraid that I rather give myself away when I explain,” said he. “Results without causes are much more impressive.”*
>
> “一解释我就怕露馅了，”他说，“没有缘由的结果才更令人印象深刻。”
>
> ——歇洛克·福尔摩斯（《证券经纪人的书记员》）

## 5.1 随机样本的基本概念（Basic Concepts of Random Samples）

实验中收集的数据往往是对某个关心变量的多次观测。第 4 章开头讨论过这样的例子。本章给出一个常用于描述这种情形的数据收集模型，即***随机抽样***（random sampling）模型。下面的定义从数学上解释了随机抽样数据收集方法的含义。

> **定义 5.1.1（随机样本）**
>
> 若随机变量 $$X_1, \ldots, X_n$$ 相互独立且每个 $$X_i$$ 的边缘 pdf 或 pmf 都是同一函数 $$f(x)$$，则称 $$X_1, \ldots, X_n$$ 为来自总体 $$f(x)$$ 的***容量为 $$n$$ 的随机样本***（random sample of size $$n$$）。等价地说，$$X_1, \ldots, X_n$$ 称为具有 pdf 或 pmf $$f(x)$$ 的独立同分布随机变量，通常缩写为 ***iid*** 随机变量。

随机抽样模型描述了这样一类实验情形：所关心的变量具有由 $$f(x)$$ 描述的概率分布。若只对该变量做一次观测 $$X$$，则关于 $$X$$ 的概率可用 $$f(x)$$ 计算。多数实验中会对该变量做 $$n > 1$$ 次（$$n$$ 为固定正整数）重复观测：第一次观测是 $$X_1$$，第二次是 $$X_2$$，依此类推。在随机抽样模型下，每个 $$X_i$$ 都是对同一变量的观测，每个 $$X_i$$ 的边缘分布都由 $$f(x)$$ 给出。而且，观测的进行方式使一个观测的取值对其他任何观测没有影响或关系，即 $$X_1, \ldots, X_n$$ 相互独立。（独立性的推广见习题 5.4。）

由定义 4.6.5，$$X_1, \ldots, X_n$$ 的联合 pdf 或 pmf 为

$$
f(x_1, \ldots, x_n) = f(x_1)\, f(x_2) \cdots f(x_n) = \prod_{i=1}^{n} f(x_i). \tag{5.1.1}
$$

这一联合 pdf 或 pmf 可用于计算涉及样本的概率。由于 $$X_1, \ldots, X_n$$ 同分布，所有边缘密度 $$f(x)$$ 是同一函数。特别地，若总体 pdf 或 pmf 是某个参数族的成员（例如第 3 章引入的族之一），pdf 或 pmf 为 $$f(x \mid \theta)$$，则联合 pdf 或 pmf 为

$$
f(x_1, \ldots, x_n \mid \theta) = \prod_{i=1}^{n} f(x_i \mid \theta), \tag{5.1.2}
$$

其中乘积的每一项使用同一个参数值 $$\theta$$。在统计背景下，若我们假设所观测的总体属于某个指定的参数族而真实参数值未知，则来自该总体的随机样本的联合 pdf 或 pmf 就具有上式形式而 $$\theta$$ 未知。考虑不同的 $$\theta$$ 可能值，就能研究随机样本在不同总体下会如何表现。

> **例 5.1.2（样本 pdf——指数）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自 $$\mathrm{exponential}(\beta)$$ 总体的随机样本。具体地，$$X_1, \ldots, X_n$$ 可以对应投入测试并使用到失效为止的 $$n$$ 块相同电路板的失效时间（以年计）。样本的联合 pdf 为
>
> $$
f(x_1, \ldots, x_n \mid \beta) = \prod_{i=1}^{n} f(x_i \mid \beta) = \prod_{i=1}^{n} \frac{1}{\beta}\, e^{-x_i/\beta} = \frac{1}{\beta^n}\, e^{-(x_1 + \cdots + x_n)/\beta}.
$$
>
> 该 pdf 可用于回答关于样本的问题。例如，所有电路板寿命都超过两年的概率是多少？可以计算
>
> $$
\begin{aligned}
P(X_1 > 2, \ldots, X_n > 2) &= \int_2^{\infty} \cdots \int_2^{\infty}\, \prod_{i=1}^{n} \frac{1}{\beta}\, e^{-x_i/\beta}\, dx_1 \cdots dx_n\\
&= e^{-2/\beta} \int_2^{\infty} \cdots \int_2^{\infty} \prod_{i=2}^{n} \frac{1}{\beta}\, e^{-x_i/\beta}\, dx_2 \cdots dx_n \qquad （\text{积分掉}\ x_1）\\
&\;\;\vdots \qquad （\text{依次积分掉其余}\ x_i）\\
&= \bigl( e^{-2/\beta} \bigr)^{n} = e^{-2n/\beta}.
\end{aligned}
$$
>
> 若 $$\beta$$（电路板的平均寿命）相对 $$n$$ 较大，则该概率接近 1。

上述计算演示了如何用 (5.1.1)（更具体地 (5.1.2)）定义的随机样本 pdf 计算关于样本的概率。要认识到，随机样本的独立同分布性质也可以直接用于此类计算。例如上面的计算可以这样进行：

$$
\begin{aligned}
P(X_1 > 2, \ldots, X_n > 2) &= P(X_1 > 2) \cdots P(X_n > 2) \qquad （\text{独立性}）\\
&= \bigl[ P(X_1 > 2) \bigr]^{n} \qquad （\text{同分布}）\\
&= \bigl( e^{-2/\beta} \bigr)^{n} \qquad （\text{指数计算}）\\
&= e^{-2n/\beta}.
\end{aligned}
$$

定义 5.1.1 的随机抽样模型有时称为来自无限总体的抽样。可以按顺序想像获得 $$X_1, \ldots, X_n$$ 的值：先做实验并观测到 $$X_1 = x_1$$；然后重复实验并观测到 $$X_2 = x_2$$。随机抽样中的独立性假设意味着 $$X_2$$ 的概率分布不受“先观测到 $$X_1 = x_1$$”这一事实的影响：从无限总体“拿走”$$x_1$$ 不改变总体，故 $$X_2 = x_2$$ 仍是来自同一总体的随机观测。

当抽样来自有限总体时，定义 5.1.1 是否适用取决于数据收集的方式。有限总体是有限个数的集合 $$\lbrace x_1, \ldots, x_N \rbrace$$，要从中抽取样本 $$X_1, \ldots, X_n$$。1.2.3 节描述了抽样的四种方式；这里讨论前两种。

假设以使 $$N$$ 个值中每个等可能（概率 $$= 1/N$$）被抽中的方式从总体中取一个值（想成从帽子中抽数字），记为 $$X_1 = x_1$$。然后重复该过程：$$N$$ 个值仍各以 $$1/N$$ 的概率等可能被抽中，第二个被抽中的值记为 $$X_2 = x_2$$（若抽到同一数字则 $$x_1 = x_2$$）。如此从这 $$N$$ 个值中抽取 $$n$$ 次，得到样本 $$X_1, \ldots, X_n$$。这种抽样称为***有放回抽样***（sampling with replacement），因为任一阶段抽出的值被“放回”总体，下一阶段仍可再被抽到。这类抽样满足定义 5.1.1 的条件：每个 $$X_i$$ 是以相等概率取值 $$x_1, \ldots, x_N$$ 的离散随机变量；$$X_1, \ldots, X_n$$ 独立，因为抽取任一 $$X_i$$ 的过程与其他变量取什么值无关。（这类抽样用于自助法，见 10.1.4 节。）

从有限总体抽取随机样本的第二种方法称为***无放回抽样***（sampling without replacement）。做法如下：以使每个值以 $$1/N$$ 概率被抽中的方式从 $$\lbrace x_1, \ldots, x_N \rbrace$$ 中取一个值，记为 $$X_1 = x_1$$；再从其余 $$N - 1$$ 个值中取第二个值，每个值被抽中的概率为 $$1/(N - 1)$$，记为 $$X_2 = x_2$$；依此类推得到样本 $$X_1, \ldots, X_n$$。但一个值一旦被抽中，其后任何阶段都不可再被抽到。

从有限总体无放回抽取的样本不满足定义 5.1.1 的全部条件：$$X_1, \ldots, X_n$$ 不是相互独立的。设 $$x$$ 与 $$y$$ 是 $$\lbrace x_1, \ldots, x_N \rbrace$$ 的不同元素，则 $$P(X_2 = y \mid X_1 = y) = 0$$（$$y$$ 已在第一阶段被抽走，第二阶段不可能再抽到它），而 $$P(X_2 = y \mid X_1 = x) = 1/(N - 1)$$。$$X_2$$ 的概率分布依赖于观测到的 $$X_1$$ 值，故 $$X_1$$ 与 $$X_2$$ 不独立。然而有趣的是，$$X_1, \ldots, X_n$$ 是同分布的：$$X_i$$ 的边缘分布对每个 $$i = 1, \ldots, n$$ 都相同。对 $$X_1$$ 显然有 $$P(X_1 = x) = 1/N$$（对每个 $$x \in \lbrace x_1, \ldots, x_N \rbrace$$）。计算 $$X_2$$ 的边缘分布可用定理 1.2.11(a) 与条件概率的定义：

$$
P(X_2 = x) = \sum_{i=1}^{N} P(X_2 = x \mid X_1 = x_i)\, P(X_1 = x_i).
$$

对某个下标 $$k$$ 有 $$x = x_k$$ 且 $$P(X_2 = x \mid X_1 = x_k) = 0$$；对其余一切 $$j \neq k$$，$$P(X_2 = x \mid X_1 = x_j) = 1/(N - 1)$$。于是

$$
P(X_2 = x) = (N - 1)\, \Bigl( \frac{1}{N - 1} \cdot \frac{1}{N} \Bigr) = \frac{1}{N}. \tag{5.1.3}
$$

类似论证可证每个 $$X_i$$ 都有相同的边缘分布。

从有限总体无放回抽样有时称为***简单随机抽样***（simple random sampling）。要认识到这与定义 5.1.1 描述的抽样情形不同。不过，若总体规模 $$N$$ 相对样本量 $$n$$ 很大，则 $$X_1, \ldots, X_n$$ 近似独立，可以按独立假设做近似概率计算。所谓“近似独立”只是指：给定 $$X_1, \ldots, X_{i-1}$$ 时 $$X_i$$ 的条件分布与 $$X_i$$ 的边缘分布相差不大。例如给定 $$X_1$$ 时 $$X_2$$ 的条件分布为

$$
P(X_2 = x_1 \mid X_1 = x_1) = 0 \qquad\text{与}\qquad P(X_2 = x \mid X_1 = x_1) = \frac{1}{N - 1}\ \ （x \neq x_1），
$$

当 $$N$$ 大时这与 (5.1.3) 给出的 $$X_2$$ 边缘分布相差不大。给定 $$X_1, \ldots, X_{i-1}$$ 时 $$X_i$$ 条件分布中的非零概率为 $$1/(N - i + 1)$$，当 $$i \leq n$$ 相对 $$N$$ 较小时接近 $$1/N$$。

> **例 5.1.3（有限总体模型）**
>
> 作为利用独立性做近似计算的例子，设有限总体为 $$\lbrace 1, \ldots, 1000 \rbrace$$，$$N = 1000$$，无放回抽取容量 $$n = 10$$ 的样本。全部十个样本值都大于 200 的概率是多少？若 $$X_1, \ldots, X_{10}$$ 相互独立，则有
>
> $$
P(X_1 > 200, \ldots, X_{10} > 200) = P(X_1 > 200) \cdots P(X_{10} > 200) = \Bigl( \frac{800}{1000} \Bigr)^{10} = 0.107374. \tag{5.1.4}
$$
>
> 要精确计算该概率，设 $$Y$$ 为样本中大于 200 的项数计数，则 $$Y$$ 服从超几何分布（$$N = 1000$$，$$M = 800$$，$$K = 10$$），故
>
> $$
P(X_1 > 200, \ldots, X_{10} > 200) = P(Y = 10) = \frac{\dbinom{800}{10} \dbinom{200}{0}}{\dbinom{1000}{10}} = 0.106164.
$$
>
> 可见 (5.1.4) 是对真值的合理近似。

在本书的其余部分，我们以定义 5.1.1 作为来自总体的随机样本的定义。

## 5.2 来自随机样本的随机变量之和（Sums of Random Variables from a Random Sample）

抽取样本 $$X_1, \ldots, X_n$$ 后，通常要计算取值的某种汇总。任何良定义的汇总在数学上都可以表示为函数 $$T(x_1, \ldots, x_n)$$，其定义域包含随机向量 $$(X_1, \ldots, X_n)$$ 的样本空间；$$T$$ 可以是实值或向量值的，故汇总是一个随机变量（或向量）$$Y = T(X_1, \ldots, X_n)$$。把随机变量定义为其他变量的函数，这一做法已在第 4 章详述；第 4 章的技术可用于用总体分布描述 $$Y$$ 的分布。由于随机样本 $$X_1, \ldots, X_n$$ 具有简单的概率结构（诸 $$X_i$$ iid），$$Y$$ 的分布特别易于处理。因为该分布通常由随机样本中变量的分布导出，故称为 $$Y$$ 的抽样分布（sampling distribution）；这把 $$Y$$ 的概率分布与总体分布（即每个 $$X_i$$ 的边缘分布）区别开来。本节讨论抽样分布的一些性质，特别是由随机变量之和定义的函数 $$T(x_1, \ldots, x_n)$$。

> **定义 5.2.1（统计量）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自某总体的容量为 $$n$$ 的随机样本，$$T(x_1, \ldots, x_n)$$ 是定义域包含 $$(X_1, \ldots, X_n)$$ 样本空间的实值或向量值函数。则随机变量或随机向量 $$Y = T(X_1, \ldots, X_n)$$ 称为***统计量***（statistic）。统计量 $$Y$$ 的概率分布称为 $$Y$$ 的***抽样分布***（sampling distribution）。

统计量的定义非常宽泛，唯一限制是统计量不能是参数的函数。统计量给出的样本汇总可以包含多种信息：例如样本中的最小值或最大值、样本平均值，或样本观测变异性的度量。下面定义三个常用且能很好地概括样本的统计量。

> **定义 5.2.2（样本均值）**
>
> ***样本均值***（sample mean）是随机样本取值的算术平均，通常记作
>
> $$
\bar{X} = \frac{X_1 + \cdots + X_n}{n} = \frac{1}{n} \sum_{i=1}^{n} X_i.
$$

> **定义 5.2.3（样本方差）**
>
> ***样本方差***（sample variance）是如下定义的统计量：
>
> $$
S^2 = \frac{1}{n - 1} \sum_{i=1}^{n} \bigl( X_i - \bar{X} \bigr)^2.
$$
>
> ***样本标准差***（sample standard deviation）是统计量 $$S = \sqrt{S^2}$$。

与通常做法一致，上述统计量的定义中我们省略了函数记号：写 $$S$$ 而非 $$S(X_1, \ldots, X_n)$$；统计量对样本的依赖是不言自明的。与从前一样，统计量的观测值用小写字母表示：$$\bar{x}$$、$$s^2$$、$$s$$ 表示 $$\bar{X}$$、$$S^2$$、$$S$$ 的观测值。

样本均值人人熟悉；样本方差与标准差是样本变异性的度量，它们与总体方差、标准差的联系将在下文看到。我们先推导样本均值与方差的一些性质。特别地，定理 5.2.4 中关于样本方差的关系式与 (2.3.1)（总体方差的一个类似关系）相关。

> **定理 5.2.4（平方和的分解）**
>
> 设 $$x_1, \ldots, x_n$$ 是任意数，$$\bar{x} = (x_1 + \cdots + x_n)/n$$。则
>
> - a. $$\min_a \sum_{i=1}^{n} (x_i - a)^2 = \sum_{i=1}^{n} (x_i - \bar{x})^2$$；
>
> - b. $$(n - 1) s^2 = \sum_{i=1}^{n} (x_i - \bar{x})^2 = \sum_{i=1}^{n} x_i^2 - n \bar{x}^2$$。
>
>
> **证明**　证 (a)：加减 $$\bar{x}$$ 得
>
> $$
\sum_{i=1}^{n} (x_i - a)^2 = \sum_{i=1}^{n} \bigl( x_i - \bar{x} + \bar{x} - a \bigr)^2 = \sum_{i=1}^{n} (x_i - \bar{x})^2 + 2 \sum_{i=1}^{n} (x_i - \bar{x})(\bar{x} - a) + \sum_{i=1}^{n} (\bar{x} - a)^2
$$
>
> $$
= \sum_{i=1}^{n} (x_i - \bar{x})^2 + \sum_{i=1}^{n} (\bar{x} - a)^2 \qquad （\text{交叉项为零}）.
$$
>
> 显然右端在 $$a = \bar{x}$$ 处最小。（注意与例 2.2.6 及习题 4.13 的相似性。）证 (b)：在上式中取 $$a = 0$$。 ∎

定理 5.2.4(b) 的表达式在计算与理论两方面都有用，因为它使我们能用易于处理的和来表示 $$s^2$$。

我们从一些统计量的期望开始研究抽样分布。下面的结果颇为有用。

> **引理 5.2.5（iid 和的期望与方差）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自某总体的随机样本，$$g(x)$$ 是使 $$\mathrm{E} g(X_1)$$ 与 $$\mathrm{Var} g(X_1)$$ 存在的函数。则
>
> $$
\mathrm{E}\Bigl[ \sum_{i=1}^{n} g(X_i) \Bigr] = n\, \bigl( \mathrm{E} g(X_1) \bigr) \tag{5.2.1}
$$
>
> 且
>
> $$
\mathrm{Var}\Bigl[ \sum_{i=1}^{n} g(X_i) \Bigr] = n\, \bigl( \mathrm{Var} g(X_1) \bigr). \tag{5.2.2}
$$
>
> **证明**　证 (5.2.1)：注意
>
> $$
\mathrm{E}\Bigl[ \sum_{i=1}^{n} g(X_i) \Bigr] = \sum_{i=1}^{n} \mathrm{E} g(X_i) = n\, \bigl( \mathrm{E} g(X_1) \bigr).
$$
>
> 由于诸 $$X_i$$ 同分布，$$\mathrm{E} g(X_i)$$ 对一切 $$i$$ 相同，第二个等式成立。注意 (5.2.1) 并不需要 $$X_1, \ldots, X_n$$ 的独立性：它对任意 $$n$$ 个同分布随机变量都成立。
>
> 证 (5.2.2)：注意
>
> $$
\mathrm{Var}\Bigl[ \sum_{i=1}^{n} g(X_i) \Bigr] = \mathrm{E}\Bigl[ \sum_{i=1}^{n} g(X_i) \Bigr]^2 - \Bigl( \mathrm{E}\Bigl[ \sum_{i=1}^{n} g(X_i) \Bigr] \Bigr)^2 \qquad （\text{方差的定义}）
$$
>
> $$
= \mathrm{E}\Bigl[ \sum_{i=1}^{n} \bigl( g(X_i) - \mathrm{E} g(X_i) \bigr) \Bigr]^2 \qquad （\text{期望性质与项的重组}）.
$$
>
> 最后这个表达式含 $$n^2$$ 项。先有 $$n$$ 项 $$\bigl( g(X_i) - \mathrm{E} g(X_i) \bigr)^2$$（$$i = 1, \ldots, n$$），对每一项
>
> $$
\mathrm{E}\bigl( g(X_i) - \mathrm{E} g(X_i) \bigr)^2 = \mathrm{Var} g(X_i) \qquad （\text{方差的定义}） = \mathrm{Var} g(X_1) \qquad （\text{同分布}）.
$$
>
> 其余 $$n(n - 1)$$ 项都形如 $$\bigl( g(X_i) - \mathrm{E} g(X_i) \bigr) \bigl( g(X_j) - \mathrm{E} g(X_j) \bigr)$$（$$i \neq j$$），对每一项
>
> $$
\mathrm{E}\bigl[ \bigl( g(X_i) - \mathrm{E} g(X_i) \bigr) \bigl( g(X_j) - \mathrm{E} g(X_j) \bigr) \bigr] = \mathrm{Cov}\bigl( g(X_i),\, g(X_j) \bigr) \qquad （\text{协方差的定义}） = 0 \qquad （\text{独立性，定理 4.5.5}）.
$$
>
> 于是得到 (5.2.2)。 ∎

> **定理 5.2.6（$$\bar{X}$$ 与 $$S^2$$ 的均值）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自均值 $$\mu$$、方差 $$\sigma^2 < \infty$$ 的总体的随机样本。则
>
> - a. $$\mathrm{E} \bar{X} = \mu$$；
>
> - b. $$\mathrm{Var} \bar{X} = \dfrac{\sigma^2}{n}$$；
>
> - c. $$\mathrm{E} S^2 = \sigma^2$$。
>
>
> **证明**　证 (a)：取 $$g(X_i) = X_i / n$$，则 $$\mathrm{E} g(X_i) = \mu / n$$。由引理 5.2.5，
>
> $$
\mathrm{E} \bar{X} = \mathrm{E}\Bigl[ \sum_{i=1}^{n} \frac{1}{n}\, X_i \Bigr] = n\, \mathrm{E}\Bigl[ \frac{1}{n}\, X_1 \Bigr] = \frac{1}{n}\, n\, \mathrm{E} X_1 = \mu.
$$
>
> (b) 类似：
>
> $$
\mathrm{Var} \bar{X} = \mathrm{Var}\Bigl[ \frac{1}{n} \sum_{i=1}^{n} X_i \Bigr] = \frac{1}{n^2}\, \mathrm{Var}\Bigl[ \sum_{i=1}^{n} X_i \Bigr] = \frac{1}{n^2}\, n\, \mathrm{Var} X_1 = \frac{\sigma^2}{n}.
$$
>
> 对样本方差，用定理 5.2.4：
>
> $$
\begin{aligned}
\mathrm{E} S^2 &= \mathrm{E}\Bigl[ \frac{1}{n - 1} \Bigl( \sum_{i=1}^{n} X_i^2 - n \bar{X}^2 \Bigr) \Bigr] = \frac{1}{n - 1}\, \Bigl( n\, \mathrm{E} X_1^2 - n\, \mathrm{E} \bar{X}^2 \Bigr)\\
&= \frac{1}{n - 1}\, \Bigl[ n (\sigma^2 + \mu^2) - n\, \Bigl( \frac{\sigma^2}{n} + \mu^2 \Bigr) \Bigr] = \sigma^2,
\end{aligned}
$$
>
> (c) 得证，定理证毕。 ∎

定理 5.2.6 中的关系 (a) 与 (c)——统计量与总体参数之间的关系——是无偏统计量的例子，第 7 章将讨论。统计量 $$\bar{X}$$ 是 $$\mu$$ 的无偏估计，$$S^2$$ 是 $$\sigma^2$$ 的无偏估计。$$S^2$$ 定义中分母使用 $$n - 1$$ 似乎不直观；现在看到，正是这一定义使 $$\mathrm{E} S^2 = \sigma^2$$。若把 $$S^2$$ 定义为分母为 $$n$$ 的通常的偏差平方平均，则 $$\mathrm{E} S^2 = \frac{n-1}{n}\, \sigma^2$$，$$S^2$$ 就不是 $$\sigma^2$$ 的无偏估计。

下面更详细地讨论 $$\bar{X}$$ 的抽样分布。4.3 与 4.6 节的方法可用于从总体分布导出该抽样分布；但由于随机样本的特殊概率结构（iid），$$\bar{X}$$ 的抽样分布有简洁的表达式。

先注意几个简单关系。由于 $$\bar{X} = \frac{1}{n}(X_1 + \cdots + X_n)$$，若 $$f(y)$$ 是 $$Y = (X_1 + \cdots + X_n)$$ 的 pdf，则 $$f_{\bar{X}}(x) = n\, f(nx)$$ 是 $$\bar{X}$$ 的 pdf（见习题 5.5）。于是关于 $$Y$$ 的 pdf 的结果容易转化为关于 $$\bar{X}$$ 的 pdf 的结果。对 mgf 也有类似关系：

$$
M_{\bar{X}}(t) = \mathrm{E} e^{t \bar{X}} = \mathrm{E} e^{t (X_1 + \cdots + X_n)/n} = \mathrm{E} e^{(t/n) Y} = M_Y(t/n).
$$

由于 $$X_1, \ldots, X_n$$ 同分布，$$M_{X_i}(t)$$ 对每个 $$i$$ 是同一函数。故由定理 4.6.7 得：

> **定理 5.2.7（样本均值的 mgf）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自具有 mgf $$M_X(t)$$ 的总体的随机样本，则样本均值的 mgf 为
>
> $$
M_{\bar{X}}(t) = \bigl[ M_X(t/n) \bigr]^{n}.
$$

当然，定理 5.2.7 只有在 $$M_{\bar{X}}(t)$$ 的表达式是熟悉 mgf 时才有用；适用情形有限，但下面的例子说明：一旦适用，该方法能极为简捷地导出 $$\bar{X}$$ 的抽样分布。

> **例 5.2.8（均值的分布）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自 $$n(\mu, \sigma^2)$$ 总体的随机样本。样本均值的 mgf 为
>
> $$
M_{\bar{X}}(t) = \Bigl[ \exp\Bigl( \mu\, \frac{t}{n} + \frac{\sigma^2 (t/n)^2}{2} \Bigr) \Bigr]^{n} = \exp\Bigl[ n\, \Bigl( \mu\, \frac{t}{n} + \frac{\sigma^2 (t/n)^2}{2} \Bigr) \Bigr] = \exp\Bigl( \mu t + \frac{(\sigma^2/n)\, t^2}{2} \Bigr).
$$
>
> 故 $$\bar{X}$$ 服从 $$n(\mu, \sigma^2/n)$$ 分布。
>
> 另一个简单例子是 $$\mathrm{gamma}(\alpha, \beta)$$ 随机样本（见例 4.6.8）。样本均值的 mgf 为
>
> $$
M_{\bar{X}}(t) = \Biggl[ \Biggl( \frac{1}{1 - \beta\, (t/n)} \Biggr)^{\alpha} \Biggr]^{n} = \Biggl( \frac{1}{1 - (\beta/n)\, t} \Biggr)^{n\alpha},
$$
>
> 我们认出这是 $$\mathrm{gamma}(n\alpha, \beta/n)$$ 的 mgf，即 $$\bar{X}$$ 的分布。

若定理 5.2.7 不适用（所得 $$\bar{X}$$ 的 mgf 无法识别，或总体 mgf 不存在），则可用 4.3 与 4.6 节的变换方法求 $$Y = (X_1 + \cdots + X_n)$$ 与 $$\bar{X}$$ 的 pdf。此时下面的卷积公式很有用。

> **定理 5.2.9（卷积公式）**
>
> 若 $$X$$ 与 $$Y$$ 是具有 pdf $$f_X(x)$$ 与 $$f_Y(y)$$ 的独立连续随机变量，则 $$Z = X + Y$$ 的 pdf 为
>
> $$
f_Z(z) = \int_{-\infty}^{\infty} f_X(w)\, f_Y(z - w)\, dw. \tag{5.2.3}
$$
>
> **证明**　令 $$W = X$$，从 $$(X, Y)$$ 到 $$(Z, W)$$ 的变换的雅可比为 1。用 (4.3.2) 得 $$(Z, W)$$ 的联合 pdf：
>
> $$
f_{Z,W}(z, w) = f_{X,Y}(w,\, z - w) = f_X(w)\, f_Y(z - w).
$$
>
> 对 $$w$$ 积分即得 (5.2.3) 所示的 $$Z$$ 的边缘 pdf。 ∎

(5.2.3) 的积分限可能需要修改，若 $$f_X$$、$$f_Y$$ 或两者仅在某些值上为正。例如若 $$f_X$$ 与 $$f_Y$$ 仅在正值上为正，则积分限为 0 与 $$z$$（被积函数在此范围外为零）。与卷积公式 (5.2.3) 类似的公式对求和以外的运算也可导出，例如差、积、商的公式（见习题 5.6）。

> **例 5.2.10（柯西随机变量之和）**
>
> 作为 mgf 技巧失效情形的例子，考虑从柯西分布抽样。我们最终要导出 $$Z_1, \ldots, Z_n$$（iid $$\mathrm{Cauchy}(0, 1)$$ 观测）的均值 $$Z$$ 的分布；但先从两个独立柯西随机变量之和的分布入手，应用公式 (5.2.3)。
>
> 设 $$U$$ 与 $$V$$ 独立，$$U \sim \mathrm{Cauchy}(0, \sigma)$$，$$V \sim \mathrm{Cauchy}(0, \tau)$$，即
>
> $$
f_U(u) = \frac{1}{\pi \sigma}\, \frac{1}{1 + (u/\sigma)^2} \quad (-\infty < u < \infty), \qquad
f_V(v) = \frac{1}{\pi \tau}\, \frac{1}{1 + (v/\tau)^2} \quad (-\infty < v < \infty).
$$
>
> 基于公式 (5.2.3)，$$Z = U + V$$ 的 pdf 为
>
> $$
f_Z(z) = \int_{-\infty}^{\infty} \frac{1}{\pi \sigma}\, \frac{1}{1 + (w/\sigma)^2}\, \frac{1}{\pi \tau}\, \frac{1}{1 + ((z - w)/\tau)^2}\, dw, \qquad -\infty < z < \infty. \tag{5.2.4}
$$
>
> 这个积分颇为复杂，但可以用部分分式分解与细心求原函数解决（见习题 5.7）。结果是
>
> $$
f_Z(z) = \frac{1}{\pi (\sigma + \tau)}\, \frac{1}{1 + \bigl( z/(\sigma + \tau) \bigr)^2}, \qquad -\infty < z < \infty. \tag{5.2.5}
$$
>
> 故两个独立柯西随机变量之和仍是柯西变量，尺度参数相加。于是若 $$Z_1, \ldots, Z_n$$ 是 iid $$\mathrm{Cauchy}(0, 1)$$，则 $$\sum Z_i \sim \mathrm{Cauchy}(0, n)$$，且 $$\bar{Z} \sim \mathrm{Cauchy}(0, 1)$$！样本均值与单个观测同分布。（该计算的计算机代数版本见计算机代数附录的例 12.6.5。）

若从位置—尺度族抽样，或从某几类指数族抽样，则随机变量之和（特别是 $$\bar{X}$$）的抽样分布容易导出。本节最后讨论这两种情形。

先处理 3.5 节讨论的位置—尺度情形。设 $$X_1, \ldots, X_n$$ 是来自位置—尺度族成员 $$(1/\sigma) f\bigl( (x - \mu)/\sigma \bigr)$$ 的随机样本，则 $$\bar{X}$$ 的分布与来自标准 pdf $$f(z)$$ 的随机样本的均值 $$Z$$ 的分布有简单关系。由定理 3.5.6，存在随机变量 $$Z_1, \ldots, Z_n$$ 使 $$X_i = \sigma Z_i + \mu$$ 且每个 $$Z_i$$ 的 pdf 为 $$f(z)$$；进一步可见 $$Z_1, \ldots, Z_n$$ 相互独立，故 $$Z_1, \ldots, Z_n$$ 是来自 $$f(z)$$ 的随机样本。两个样本均值的关系为

$$
\bar{X} = \frac{1}{n} \sum_{i=1}^{n} X_i = \frac{1}{n} \sum_{i=1}^{n} (\sigma Z_i + \mu) = \frac{1}{n}\, \Bigl( \sigma \sum_{i=1}^{n} Z_i + n \mu \Bigr) = \sigma \bar{Z} + \mu.
$$

于是再用定理 3.5.6：若 $$g(z)$$ 是 $$\bar{Z}$$ 的 pdf，则 $$(1/\sigma)\, g\bigl( (x - \mu)/\sigma \bigr)$$ 是 $$\bar{X}$$ 的 pdf。先在 $$Z_1, \ldots, Z_n$$ 与 $$f(z)$$ 上工作求出 $$\bar{Z}$$ 的 pdf $$g(z)$$ 可能更容易——此时不必处理参数 $$\mu$$ 与 $$\sigma$$，计算会简洁一些；随后立即可知 $$\bar{X}$$ 的 pdf 是 $$(1/\sigma)\, g\bigl( (x - \mu)/\sigma \bigr)$$。

在例 5.2.10 中我们发现：若 $$Z_1, \ldots, Z_n$$ 是来自 $$\mathrm{Cauchy}(0, 1)$$ 分布的随机样本，则 $$\bar{Z}$$ 也服从 $$\mathrm{Cauchy}(0, 1)$$。现在可以断言：若 $$X_1, \ldots, X_n$$ 是来自 $$\mathrm{Cauchy}(\mu, \sigma)$$ 分布的随机样本，则 $$\bar{X}$$ 也服从 $$\mathrm{Cauchy}(\mu, \sigma)$$。重要之处在于：$$\bar{X}$$ 分布中以 $$\sigma$$ 度量的离散度与样本量 $$n$$ 无关。这与定理 5.2.6 的常见情形（总体方差有限，$$\mathrm{Var} \bar{X} = \sigma^2/n$$ 随样本量增大而减小）形成鲜明对照。

从指数族抽样时，随机样本的某些和有易于导出的抽样分布。下一定理中的统计量 $$T_1, \ldots, T_k$$ 是重要的汇总统计量（6.2 节将见）。

> **定理 5.2.11（指数族的和统计量）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自 pdf 或 pmf $$f(x \mid \theta)$$ 的随机样本，其中
>
> $$
f(x \mid \theta) = h(x)\, c(\theta)\, \exp\Bigl( \sum_{i=1}^{k} w_i(\theta)\, t_i(x) \Bigr)
$$
>
> 是指数族的成员。定义统计量
>
> $$
T_i(X_1, \ldots, X_n) = \sum_{j=1}^{n} t_i(X_j), \qquad i = 1, \ldots, k.
$$
>
> 若集合 $$\lbrace (w_1(\theta), w_2(\theta), \ldots, w_k(\theta)),\ \theta \in \Theta \rbrace$$ 包含 $$\Re^k$$ 的一个开子集，则 $$(T_1, \ldots, T_k)$$ 的分布是形如
>
> $$
f_T(u_1, \ldots, u_k \mid \theta) = H(u_1, \ldots, u_k)\, \bigl[ c(\theta) \bigr]^{n}\, \exp\Bigl( \sum_{i=1}^{k} w_i(\theta)\, u_i \Bigr) \tag{5.2.6}
$$
>
> 的指数族。

开集条件排除了像 $$n(\theta, \theta^2)$$ 这样的密度，一般地把曲线指数族排除在定理 5.2.11 之外。注意在 $$(T_1, \ldots, T_k)$$ 的 pdf 或 pmf 中，函数 $$c(\theta)$$ 与 $$w_i(\theta)$$ 与原族相同（当然 $$H(u_1, \ldots, u_k)$$ 不同于 $$h(x)$$）。我们不证明这一定理，只在简单情形演示该结果。

> **例 5.2.12（伯努利随机变量之和）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自 $$\mathrm{Bernoulli}(p)$$ 分布的随机样本。由例 3.4.1（取 $$n = 1$$），$$\mathrm{Bernoulli}(p)$$ 分布是 $$k = 1$$、$$c(p) = (1 - p)$$、$$w_1(p) = \log\bigl( \frac{p}{1 - p} \bigr)$$、$$t_1(x) = x$$ 的指数族。于是定理中 $$T_1 = T_1(X_1, \ldots, X_n) = X_1 + \cdots + X_n$$。由 3.2 节二项分布的定义知 $$T_1$$ 服从 $$\mathrm{binomial}(n, p)$$；由例 3.4.1 还知 $$\mathrm{binomial}(n, p)$$ 是具有相同 $$w_1(p)$$、$$c(p) = (1 - p)^n$$ 的指数族。故表达式 (5.2.6) 在本例得到验证。

## 5.3 来自正态分布的抽样（Sampling from the Normal Distribution）

本节处理来自正态总体的样本量的性质——正态总体至今仍是最广泛使用的统计模型之一。来自正态总体的抽样给出样本统计量的许多有用性质，也产生许多著名的抽样分布。

### 5.3.1 样本均值与样本方差的性质（Properties of the Sample Mean and Variance）

我们已经见过一般情形下 $$\bar{X}$$ 与 $$S^2$$ 的均值与方差的计算。现在在附加的正态性假设下，可以导出它们的完整分布，以及更多。$$\bar{X}$$ 与 $$S^2$$ 的性质总结于下述定理。

> **定理 5.3.1（正态样本的 $$\bar{X}$$ 与 $$S^2$$）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自 $$n(\mu, \sigma^2)$$ 分布的随机样本，$$\bar{X} = (1/n) \sum_{i=1}^{n} X_i$$，$$S^2 = \bigl[ 1/(n - 1) \bigr] \sum_{i=1}^{n} (X_i - \bar{X})^2$$。则
>
> - a. $$\bar{X}$$ 与 $$S^2$$ 是独立的随机变量；
>
> - b. $$\bar{X}$$ 服从 $$n(\mu, \sigma^2/n)$$ 分布；
>
> - c. $$(n - 1) S^2 / \sigma^2$$ 服从自由度为 $$n - 1$$ 的卡方分布。
>
>
> **证明**　首先注意，由 3.5 节关于位置—尺度族的讨论，可以不失一般性假设 $$\mu = 0$$、$$\sigma = 1$$（另见定理 5.2.11 之前的讨论）。此外 (b) 已在例 5.2.8 中建立，剩下证明 (a) 与 (c)。
>
> 证 (a)：应用定理 4.6.12，证明 $$\bar{X}$$ 与 $$S^2$$ 是独立随机向量的函数。注意 $$S^2$$ 可以写成 $$n - 1$$ 个偏差的函数：
>
> $$
S^2 = \frac{1}{n - 1} \sum_{i=1}^{n} \bigl( X_i - \bar{X} \bigr)^2 = \frac{1}{n - 1} \Bigl[ \bigl( X_1 - \bar{X} \bigr)^2 + \sum_{i=2}^{n} \bigl( X_i - \bar{X} \bigr)^2 \Bigr]
$$
>
> $$
= \frac{1}{n - 1} \Biggl[ -\sum_{i=2}^{n} \bigl( X_i - \bar{X} \bigr) + \sum_{i=2}^{n} \bigl( X_i - \bar{X} \bigr)^2 \Biggr] \qquad \text{（因为}\ \sum_{i=1}^{n} (X_i - \bar{X}) = 0 \text{）}.
$$
>
> 故 $$S^2$$ 可以写成只依赖 $$(X_2 - \bar{X}, \ldots, X_n - \bar{X})$$ 的函数。现在证明这些随机变量与 $$\bar{X}$$ 独立。样本 $$X_1, \ldots, X_n$$ 的联合 pdf 为
>
> $$
f(x_1, \ldots, x_n) = \frac{1}{(2\pi)^{n/2}}\, e^{-(1/2) \sum_{i=1}^{n} x_i^2}, \qquad -\infty < x_i < \infty.
$$
>
> 做变换
>
> $$
y_1 = \bar{x}, \qquad y_2 = x_2 - \bar{x}, \qquad \ldots, \qquad y_n = x_n - \bar{x}.
$$
>
> 这是雅可比等于 $$1/n$$ 的线性变换。于是
>
> $$
f(y_1, \ldots, y_n) = \frac{1}{(2\pi)^{n/2}}\, e^{-(1/2) (y_1 - \sum_{i=2}^{n} y_i)^2}\, e^{-(1/2) \sum_{i=2}^{n} (y_i + y_1)^2}, \qquad -\infty < y_i < \infty.
$$
>
> 展开指数中的平方和，含 $$y_1$$ 与诸 $$y_i$$ 的交叉项恰好相消（$$-y_1 \sum y_i + y_1 \sum y_i = 0$$），得
>
> $$
f(y_1, \ldots, y_n) = \frac{n^{1/2}}{(2\pi)^{1/2}}\, e^{-n y_1^2/2}\; \cdot\; \frac{1}{(2\pi)^{(n-1)/2}}\, e^{-(1/2)\left[ \sum_{i=2}^{n} y_i^2 + \bigl( \sum_{i=2}^{n} y_i \bigr)^2 \right]},
\qquad -\infty < y_i < \infty.
$$
>
> 即联合 pdf 分解为 $$y_1$$ 的函数与 $$(y_2, \ldots, y_n)$$ 的函数之积。由于 $$Y_1, \ldots, Y_n$$ 的联合 pdf 可因子化，由定理 4.6.11 知 $$Y_1$$ 与 $$Y_2, \ldots, Y_n$$ 独立，从而由定理 4.6.12 知 $$\bar{X}$$ 与 $$S^2$$ 独立。 ∎

为完成定理的证明还须导出 $$S^2$$ 的分布。在此之前先稍微离题，讨论卡方分布——其性质在 $$S^2$$ pdf 的推导中扮演重要角色。回顾 3.3 节：卡方 pdf 是伽马 pdf 的特例：

$$
f(x) = \frac{1}{\Gamma(p/2)\, 2^{p/2}}\, x^{(p/2) - 1}\, e^{-x/2}, \qquad 0 < x < \infty,
$$

其中 $$p$$ 称为自由度。现在总结关于卡方分布的一些相关事实。

> **引理 5.3.2（关于卡方随机变量的事实）**
>
> 用 $$\chi_p^2$$ 记自由度为 $$p$$ 的卡方随机变量。
>
> - a. 若 $$Z$$ 是 $$n(0,1)$$ 随机变量，则 $$Z^2 \sim \chi_1^2$$，即标准正态随机变量的平方是卡方随机变量。
>
> - b. 若 $$X_1, \ldots, X_n$$ 独立且 $$X_i \sim \chi_{p_i}^2$$，则 $$X_1 + \cdots + X_n \sim \chi_{p_1 + \cdots + p_n}^2$$，即独立的卡方变量相加仍为卡方变量，且自由度也相加。
>
>
> **证明**　这两个事实我们都已遇到过。(a) 已在例 2.1.7 中建立。(b) 是例 4.6.8（关于独立伽马随机变量之和）的特例：$$\chi_p^2$$ 随机变量是 $$\mathrm{gamma}(p/2, 2)$$，应用该例即得 (b)。 ∎

> **定理 定理 5.3.1(c) 的证明**
>
> 我们用归纳法建立 $$S^2$$ 的分布，记号 $$\bar{X}_k$$ 与 $$S_k^2$$ 表示基于前 $$k$$ 个观测的样本均值与方差。（观测的实际排序并不重要——将其排序只是为了便于证明。）容易建立（见习题 5.15）
>
> $$
(n - 1)\, S_n^2 = (n - 2)\, S_{n-1}^2 + \Bigl( \frac{n - 1}{n} \Bigr)\, \bigl( X_n - \bar{X}_{n-1} \bigr)^2. \tag{5.3.1}
$$
>
> 考虑 $$n = 2$$：定义 $$0 \times S_1^2 = 0$$，由 (5.3.1) 有
>
> $$
S_2^2 = \frac{1}{2}\, \bigl( X_2 - X_1 \bigr)^2.
$$
>
> 由于 $$(X_2 - X_1)/\sqrt{2}$$ 的分布是 $$n(0, 1)$$，引理 5.3.2(a) 表明 $$S_2^2 \sim \chi_1^2$$。继续归纳：设对 $$n = k$$ 有 $$(k - 1) S_k^2 \sim \chi_{k-1}^2$$。对 $$n = k + 1$$，由 (5.3.1)
>
> $$
k\, S_{k+1}^2 = (k - 1)\, S_k^2 + \frac{k}{k + 1}\, \bigl( X_{k+1} - \bar{X}_k \bigr)^2. \tag{5.3.2}
$$
>
> 按归纳假设，$$(k - 1) S_k^2 \sim \chi_{k-1}^2$$。若能证明 $$\bigl( \frac{k}{k + 1} \bigr) (X_{k+1} - \bar{X}_k)^2 \sim \chi_1^2$$ 且与 $$S_k^2$$ 独立，则由引理 5.3.2(b) 得 $$k S_{k+1}^2 \sim \chi_k^2$$，定理即证。
>
> $$(X_{k+1} - \bar{X}_k)^2$$ 与 $$S_k^2$$ 的独立性再次由定理 4.6.12 得到：向量 $$(X_{k+1}, \bar{X}_k)$$ 与 $$S_k^2$$ 独立，故该向量的任何函数与 $$S_k^2$$ 独立。进一步，$$X_{k+1} - \bar{X}_k$$ 是均值 0、方差
>
> $$
\mathrm{Var}\bigl( X_{k+1} - \bar{X}_k \bigr) = \frac{k + 1}{k}
$$
>
> 的正态随机变量，故 $$\bigl( \frac{k}{k+1} \bigr) (X_{k+1} - \bar{X}_k)^2 \sim \chi_1^2$$，定理证毕。

$$\bar{X}$$ 与 $$S^2$$ 的独立性可以用不同于定理 5.3.1 证明的方式建立：与其证明联合 pdf 可因子化，不如用下面这条把正态样本的独立性与相关性联系起来的引理。

> **引理 5.3.3（正态线性函数的独立性与协方差）**
>
> 设 $$X_j \sim n(\mu_j, \sigma_j^2)$$（$$j = 1, \ldots, n$$）独立。对常数 $$a_{ij}$$、$$b_{rj}$$（$$j = 1, \ldots, n$$；$$i = 1, \ldots, k$$；$$r = 1, \ldots, m$$），其中 $$k + m \leq n$$，定义
>
> $$
U_i = \sum_{j=1}^{n} a_{ij}\, X_j, \quad i = 1, \ldots, k; \qquad
V_r = \sum_{j=1}^{n} b_{rj}\, X_j, \quad r = 1, \ldots, m.
$$
>
> - a. $$U_i$$ 与 $$V_r$$ 独立当且仅当 $$\mathrm{Cov}(U_i, V_r) = 0$$；而且 $$\mathrm{Cov}(U_i, V_r) = \sum_{j=1}^{n} a_{ij}\, b_{rj}\, \sigma_j^2$$。
>
> - b. 随机向量 $$(U_1, \ldots, U_k)$$ 与 $$(V_1, \ldots, V_m)$$ 独立当且仅当 $$U_i$$ 与 $$V_r$$ 对所有对 $$i, r$$（$$i = 1, \ldots, k$$；$$r = 1, \ldots, m$$）独立。
>
>
> **证明**　只需对 $$\mu_i = 0$$、$$\sigma_i^2 = 1$$ 证明引理，一般情形即可随之迅速得到。此外，“独立 $$\Rightarrow$$ 零协方差”由定理 4.5.5 立即得到，协方差表达式也易验证（习题 5.14）。注意推论 4.6.10 表明 $$U_i$$ 与 $$V_r$$ 都服从正态分布。
>
> 于是剩下要证明：若常数满足上述限制（等价地协方差为零），则正态性下有独立性。只对 $$n = 2$$ 证明——一般 $$n$$ 的证明类似，但需要一个详细的 $$n$$ 元变换。
>
> 证 (a)：从 $$X_1$$ 与 $$X_2$$ 的联合 pdf 出发：
>
> $$
f_{X_1, X_2}(x_1, x_2) = \frac{1}{2\pi}\, e^{-(1/2)(x_1^2 + x_2^2)}, \qquad -\infty < x_1, x_2 < \infty.
$$
>
> 做变换（$$n = 2$$ 时可省去双下标）
>
> $$
u = a_1 x_1 + a_2 x_2, \qquad v = b_1 x_1 + b_2 x_2,
$$
>
> 故
>
> $$
x_1 = \frac{b_2 u - a_2 v}{a_1 b_2 - b_1 a_2}, \qquad x_2 = \frac{a_1 v - b_1 u}{a_1 b_2 - b_1 a_2},
$$
>
> 雅可比为
>
> $$
J = \begin{vmatrix} \dfrac{\partial x_1}{\partial u} & \dfrac{\partial x_1}{\partial v} \\[6pt] \dfrac{\partial x_2}{\partial u} & \dfrac{\partial x_2}{\partial v} \end{vmatrix} = \frac{1}{a_1 b_2 - b_1 a_2}.
$$
>
> 于是 $$U$$ 与 $$V$$ 的 pdf 为
>
> $$
\begin{aligned}
f_{U,V}(u, v) &= f_{X_1, X_2}\Bigl( \frac{b_2 u - a_2 v}{a_1 b_2 - b_1 a_2},\ \frac{a_1 v - b_1 u}{a_1 b_2 - b_1 a_2} \Bigr)\, \vert J\vert \\
&= \frac{1}{2\pi}\, \exp\Biggl[ \frac{-1}{2 (a_1 b_2 - b_1 a_2)^2}\, \Bigl( (b_2 u - a_2 v)^2 + (a_1 v - b_1 u)^2 \Bigr) \Biggr]\, \vert J\vert ,
\end{aligned}
$$
>
> $$-\infty < u, v < \infty$$。展开指数中的平方，可写
>
> $$
(b_2 u - a_2 v)^2 + (a_1 v - b_1 u)^2 = (b_1^2 + b_2^2)\, u^2 + (a_1^2 + a_2^2)\, v^2 - 2 (a_1 b_1 + a_2 b_2)\, uv.
$$
>
> 对常数的假设（$$\mathrm{Cov}(U, V) = a_1 b_1 + a_2 b_2 = 0$$）使交叉项恒为零。故 pdf 可因子化，由引理 4.2.7，$$U$$ 与 $$V$$ 独立，(a) 得证。
>
> (b) 可用类似论证：做出合适的变换后可得向量 $$(U_1, \ldots, U_k)$$ 与 $$(V_1, \ldots, V_m)$$ 的联合 pdf；由定理 4.6.11，若联合 pdf 可因子化则两向量独立。由正态 pdf 的形式，这当且仅当 $$U_i$$ 与 $$V_r$$ 对所有对 $$i, r$$ 独立时发生。 ∎

该引理表明：若从独立正态随机变量出发，则这些变量的线性函数的协方差与独立性等价。因此对正态变量，只需检查协方差项即可检查独立性——一个简单得多的计算。这并无神奇之处，只是正态 pdf 形式的推论。此外 (b) 使我们只需检查两两独立即可推断正态向量的整体独立性——这一性质对一般随机变量不成立。

可以用引理 5.3.3 给出正态抽样中 $$\bar{X}$$ 与 $$S^2$$ 独立性的另一种证明。由于可把 $$S^2$$ 写成 $$n - 1$$ 个偏差 $$(X_2 - \bar{X}, \ldots, X_n - \bar{X})$$ 的函数，只须证明这些随机变量与 $$\bar{X}$$ 不相关；正态性假设加上引理 5.3.3 即可推出独立性。

作为引理 5.3.3 应用的说明，写

$$
\bar{X} = \sum_{i=1}^{n} \Bigl( \frac{1}{n} \Bigr)\, X_i, \qquad
X_j - \bar{X} = \sum_{i=1}^{n} \Bigl( \delta_{ij} - \frac{1}{n} \Bigr)\, X_i,
$$

其中当 $$i = j$$ 时 $$\delta_{ij} = 1$$，否则 $$\delta_{ij} = 0$$。于是容易证明

$$
\mathrm{Cov}\Bigl( \bar{X},\, X_j - \bar{X} \Bigr) = \sum_{i=1}^{n} \Bigl( \frac{1}{n} \Bigr) \Bigl( \delta_{ij} - \frac{1}{n} \Bigr) = 0,
$$

故 $$\bar{X}$$ 与 $$X_j - \bar{X}$$ 独立（只要诸 $$X_i$$ 有相同方差）。

### 5.3.2 导出分布：Student 氏 $$t$$ 与 Snedecor 氏 $$F$$（The Derived Distributions: Student's t and Snedecor's F）

5.3.1 节导出的分布，在某种意义上是假设正态性的统计分析的第一步。特别地，多数实际情形下方差 $$\sigma^2$$ 未知；要对 $$\bar{X}$$（作为 $$\mu$$ 的估计）的变异性有任何了解，必须估计这个方差。这一课题最早由 W. S. Gosset（以笔名 Student 发表）在二十世纪初研究。Student 的里程碑式工作产生了 Student 氏 $$t$$ 分布，或简称 $$t$$ 分布。

若 $$X_1, \ldots, X_n$$ 是来自 $$n(\mu, \sigma^2)$$ 的随机样本，我们知道量

$$
\frac{\bar{X} - \mu}{\sigma / \sqrt{n}} \tag{5.3.3}
$$

的分布是 $$n(0,1)$$ 随机变量。若我们知道 $$\sigma$$ 的值并测量了 $$\bar{X}$$，就能以 (5.3.3) 为基础对 $$\mu$$ 作推断，因为此时 $$\mu$$ 是唯一的未知量。但多数时候 $$\sigma$$ 未知。Student 做了显而易见的事——考察

$$
\frac{\bar{X} - \mu}{S / \sqrt{n}} \tag{5.3.4}
$$

的分布：当 $$\sigma$$ 未知时，它可以作为对 $$\mu$$ 推断的基础。

(5.3.4) 的分布不难导出，前提是先注意到几个简化步骤。把 (5.3.4) 乘以 $$\sigma/\sigma$$ 并稍加整理：

$$
\frac{\bar{X} - \mu}{S / \sqrt{n}} = \frac{(\bar{X} - \mu) / (\sigma / \sqrt{n})}{\sqrt{S^2 / \sigma^2}}. \tag{5.3.5}
$$

(5.3.5) 的分子是 $$n(0,1)$$ 随机变量，分母是 $$\sqrt{\chi_{n-1}^2 / (n-1)}$$，且两者独立。于是 (5.3.4) 的分布可以通过解决简化问题得到：求 $$U / \sqrt{V/p}$$ 的分布，其中 $$U \sim n(0,1)$$，$$V \sim \chi_p^2$$，$$U$$ 与 $$V$$ 独立。这就给出了 Student 氏 $$t$$ 分布。

> **定义 5.3.4（Student 氏 $$t$$ 分布）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自 $$n(\mu, \sigma^2)$$ 分布的随机样本。量 $$(\bar{X} - \mu) / (S/\sqrt{n})$$ 服从自由度为 $$n - 1$$ 的 Student 氏 $$t$$ 分布。等价地，若随机变量 $$T$$ 具有 pdf
>
> $$
f_T(t) = \frac{\Gamma\bigl( \frac{p+1}{2} \bigr)}{\Gamma\bigl( \frac{p}{2} \bigr)}\, \frac{1}{(p \pi)^{1/2}}\, \frac{1}{(1 + t^2/p)^{(p+1)/2}}, \qquad -\infty < t < \infty, \tag{5.3.6}
$$
>
> 则称 $$T$$ 服从自由度为 $$p$$ 的 Student 氏 $$t$$ 分布，记作 $$T \sim t_p$$。

注意若 $$p = 1$$，(5.3.6) 就是柯西分布的 pdf，对应样本量为 2 的情形。柯西分布又一次在普通情形中出现。

$$t$$ pdf 的推导直截了当。从上面定义的 $$U$$ 与 $$V$$ 出发，由 (5.3.5) 知 $$U$$ 与 $$V$$ 的联合 pdf 为

$$
f_{U,V}(u, v) = \frac{1}{(2\pi)^{1/2}}\, e^{-u^2/2}\, \frac{1}{\Gamma\bigl( \frac{p}{2} \bigr)\, 2^{p/2}}\, v^{(p/2) - 1}\, e^{-v/2}, \qquad -\infty < u < \infty,\ 0 < v < \infty.
$$

（回忆 $$U$$ 与 $$V$$ 独立。）现做变换

$$
t = \frac{u}{\sqrt{v/p}}, \qquad w = v.
$$

变换的雅可比为 $$(w/p)^{1/2}$$，$$T$$ 的边缘 pdf 为

$$
f_T(t) = \int_0^{\infty} f_{U,V}\Bigl( t\, \Bigl( \frac{w}{p} \Bigr)^{1/2},\ w \Bigr)\, \Bigl( \frac{w}{p} \Bigr)^{1/2}\, dw = \frac{1}{(2\pi)^{1/2}\, \Gamma\bigl( \frac{p}{2} \bigr)\, 2^{p/2}} \int_0^{\infty} e^{-(1/2) t^2 w/p}\, w^{(p/2) - 1}\, e^{-w/2}\, \Bigl( \frac{w}{p} \Bigr)^{1/2}\, dw
$$

$$
= \frac{1}{(2\pi)^{1/2}\, \Gamma\bigl( \frac{p}{2} \bigr)\, 2^{p/2}\, p^{1/2}} \int_0^{\infty} e^{-(1/2)(1 + t^2/p)\, w}\, w^{((p+1)/2) - 1}\, dw.
$$

把被积函数识别为 $$\mathrm{gamma}\bigl( \frac{p+1}{2},\ \frac{2}{1 + t^2/p} \bigr)$$ pdf 的核，故有

$$
f_T(t) = \frac{1}{(2\pi)^{1/2}\, \Gamma\bigl( \frac{p}{2} \bigr)\, 2^{p/2}\, p^{1/2}}\, \Gamma\Bigl( \frac{p + 1}{2} \Bigr)\, \Bigl( \frac{2}{1 + t^2/p} \Bigr)^{(p+1)/2},
$$

它等于 (5.3.6)。

Student 氏 $$t$$ 没有 mgf，因为它并非拥有全部各阶矩。事实上，若自由度为 $$p$$，则只有 $$p - 1$$ 阶矩：$$t_1$$ 没有均值，$$t_2$$ 没有方差，等等。容易验证（见习题 5.18）：若 $$T_p$$ 是服从 $$t_p$$ 分布的随机变量，则

$$
\mathrm{E} T_p = 0 \quad (p > 1), \qquad \mathrm{Var} T_p = \frac{p}{p - 2} \quad (p > 2). \tag{5.3.7}
$$

另一个重要的导出分布是 Snedecor 氏 $$F$$，其推导与 Student 氏 $$t$$ 相当类似，但动机有所不同。$$F$$ 分布以 Sir Ronald Fisher 命名，自然地作为方差的比的分布出现。

> **例 5.3.5（方差比分布）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自 $$n(\mu_X, \sigma_X^2)$$ 总体的随机样本，$$Y_1, \ldots, Y_m$$ 是来自独立总体 $$n(\mu_Y, \sigma_Y^2)$$ 的随机样本。若要比较两个总体的变异性，一个关心的量是比 $$\sigma_X^2 / \sigma_Y^2$$。关于该比的信息包含在样本方差比 $$S_X^2 / S_Y^2$$ 中。$$F$$ 分布通过给出
>
> $$
\frac{S_X^2 / S_Y^2}{\sigma_X^2 / \sigma_Y^2} = \frac{S_X^2 / \sigma_X^2}{S_Y^2 / \sigma_Y^2} \tag{5.3.8}
$$
>
> 的分布，使我们能够比较这些量。
>
> 考察 (5.3.8) 可见 $$F$$ 分布是如何导出的：$$S_X^2/\sigma_X^2$$ 与 $$S_Y^2/\sigma_Y^2$$ 各是尺度化的卡方变量，且相互独立。

> **定义 5.3.6（Snedecor 氏 $$F$$ 分布）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自 $$n(\mu_X, \sigma_X^2)$$ 总体的随机样本，$$Y_1, \ldots, Y_m$$ 是来自独立总体 $$n(\mu_Y, \sigma_Y^2)$$ 的随机样本。随机变量 $$F = (S_X^2 / \sigma_X^2) / (S_Y^2 / \sigma_Y^2)$$ 服从自由度为 $$n - 1$$ 与 $$m - 1$$ 的 Snedecor 氏 $$F$$ 分布。等价地，若随机变量 $$F$$ 具有 pdf
>
> $$
f_F(x) = \frac{\Gamma\bigl( \frac{p + q}{2} \bigr)}{\Gamma\bigl( \frac{p}{2} \bigr)\, \Gamma\bigl( \frac{q}{2} \bigr)}\, \Bigl( \frac{p}{q} \Bigr)^{p/2}\, \frac{x^{(p/2) - 1}}{\bigl[ 1 + (p/q)\, x \bigr]^{(p+q)/2}}, \qquad 0 < x < \infty, \tag{5.3.9}
$$
>
> 则称 $$F$$ 服从自由度为 $$p$$ 与 $$q$$ 的 $$F$$ 分布。

$$F$$ 分布可以在比此处更一般的情形导出：即使父总体不是正态的，方差比也可能有 $$F$$ 分布。Kelker (1970) 证明：只要父总体具有某种类型的对称性（球对称），方差比就有 $$F$$ 分布。

从正态分布出发的 $$F$$ pdf 的推导与 Student 氏 $$t$$ 类似。事实上在一个特殊情形，$$F$$ 是 $$t$$ 的变换（见定理 5.3.8）。与 $$t$$ 的做法类似，可以把导出 $$F$$ pdf 的任务约化为求 $$(U/p)/(V/q)$$ 的 pdf，其中 $$U$$ 与 $$V$$ 独立，$$U \sim \chi_p^2$$，$$V \sim \chi_q^2$$（见习题 5.17）。

> **例 5.3.7（例 5.3.5 的继续）**
>
> 看看如何用 $$F$$ 分布对总体方差的真实比作推断：量 $$(S_X^2/\sigma_X^2) / (S_Y^2/\sigma_Y^2)$$ 服从 $$F_{n-1, m-1}$$ 分布。（一般用记号 $$F_{p,q}$$ 表示自由度为 $$p$$ 与 $$q$$ 的 $$F$$ 随机变量。）可以计算
>
> $$
\mathrm{E} F_{n-1, m-1} = \mathrm{E}\Biggl[ \frac{\chi_{n-1}^2 / (n - 1)}{\chi_{m-1}^2 / (m - 1)} \Biggr] = \mathrm{E}\Biggl[ \frac{\chi_{n-1}^2}{n - 1} \Biggr]\, \mathrm{E}\Biggl[ \frac{m - 1}{\chi_{m-1}^2} \Biggr] = \frac{\frac{n-1}{n-1}}{\frac{m-1-2}{m-1}} = \frac{m - 1}{m - 3},
$$
>
> （用独立性；最后的分母由卡方计算：若 $$W \sim \chi_\nu^2$$ 则 $$\mathrm{E} \frac{1}{W} = \frac{1}{\nu - 2}$$，故 $$\mathrm{E} \frac{m-1}{\chi_{m-1}^2} = \frac{m-1}{m-3}$$。）注意该表达式仅在 $$m > 3$$ 时有限为正。我们有
>
> $$
\mathrm{E}\Bigl( \frac{S_X^2 / \sigma_X^2}{S_Y^2 / \sigma_Y^2} \Bigr) = \mathrm{E} F_{n-1, m-1} = \frac{m - 1}{m - 3},
$$
>
> 去掉期望后，对适当大的 $$m$$，
>
> $$
\frac{S_X^2 / S_Y^2}{\sigma_X^2 / \sigma_Y^2} \approx \frac{m - 1}{m - 3} \approx 1,
$$
>
> 正如我们所期望的。

$$F$$ 分布有许多有趣的性质，并与许多其他分布相关。我们把其中一些总结在下述定理中，证明留作习题（习题 5.17 与 5.18）。

> **定理 5.3.8（$$F$$ 分布的性质）**
>
> - a. 若 $$X \sim F_{p,q}$$，则 $$1/X \sim F_{q,p}$$，即 $$F$$ 随机变量的倒数仍是 $$F$$ 随机变量；
>
> - b. 若 $$X \sim t_q$$，则 $$X^2 \sim F_{1,q}$$；
>
> - c. 若 $$X \sim F_{p,q}$$，则 $$\dfrac{(p/q)\, X}{1 + (p/q)\, X} \sim \mathrm{beta}(p/2, q/2)$$。

## 5.4 次序统计量（Order Statistics）

来自随机样本的诸如最小、最大或中间观测这样的样本值，可以提供额外的汇总信息。例如，过去 50 年的最高洪水位或最低冬季气温，可能是规划未来应急措施的有用数据；上个月售出房屋的价格中位数，可能对估计生活成本有用。这些都是次序统计量的例子。

> **定义 5.4.1（次序统计量）**
>
> 随机样本 $$X_1, \ldots, X_n$$ 的***次序统计量***（order statistics）是按升序排列的样本值，记作 $$X_{(1)}, \ldots, X_{(n)}$$。

次序统计量是满足 $$X_{(1)} \leq \cdots \leq X_{(n)}$$ 的随机变量。特别地，

$$
\begin{aligned}
X_{(1)} &= \min_{1 \leq i \leq n} X_i,\\
X_{(2)} &= \text{第二小的}\ X_i,\\
&\;\,\vdots\\
X_{(n)} &= \max_{1 \leq i \leq n} X_i.
\end{aligned}
$$

既然它们是随机变量，就可以讨论它们取各种值的概率；为此需要次序统计量的 pdf 或 pmf。来自连续总体的随机样本的次序统计量 pdf 的公式是本节稍后的主要话题；先提几个用次序统计量容易定义的统计量。

***样本极差***（sample range）$$R = X_{(n)} - X_{(1)}$$ 是最小与最大观测之间的距离；它是样本散布程度的度量，应能反映总体中的散布。

***样本中位数***（sample median，记作 $$M$$）是这样的数：约一半观测小于它，约一半大于它。用次序统计量表示：

$$
M = \begin{cases}
X_{((n+1)/2)} & \text{若}\ n\ \text{为奇数},\\[2pt]
\bigl( X_{(n/2)} + X_{(n/2 + 1)} \bigr) / 2 & \text{若}\ n\ \text{为偶数}.
\end{cases} \tag{5.4.1}
$$

中位数是可以替代样本均值的位置度量。样本中位数优于样本均值的一点是它受极端观测的影响较小（细节见 10.2 节）。

尽管相关，均值与中位数通常度量的是不同的东西。例如在近年的棒球薪资谈判中，争论的一个主要焦点是资方对球员养老金基金的缴费。资方的观点可以转述为：“棒球运动员的平均年薪是 433,659 美元，有那样的收入，现行养老金是足够的。”而球员方的观点是：“超过一半的球员年收入低于 250,000 美元，并且由于多数球员职业生涯短暂，需要更大养老金的保障。”（这些数字是 1988 赛季的，并非争议当年的。）两个数字都正确，但资方谈的是均值而球员谈的是中位数：十几位年薪超过 200 万美元的球员可以把平均年薪抬到 433,659 美元，而多数球员收入低于 250,000 美元——包括年薪 62,500 美元的新秀。讨论薪资、价格或任何带少数极端值的变量时，中位数比均值更好地指示“典型”值。其他可以用次序统计量定义、对极端值不那么敏感的统计量（如习题 10.20 讨论的 $$\alpha$$-截尾均值）在 Tukey (1977) 等教科书中有讨论。

对介于 0 与 1 之间的任意 $$p$$，***第 $$(100p)$$ 样本百分位数***（sample percentile）是使约 $$np$$ 个观测小于它、$$n(1 - p)$$ 个观测大于它的观测。第 50 样本百分位数（$$p = 0.5$$）即样本中位数。对其他 $$p$$ 值，可以用次序统计量更精确地定义样本百分位数。

> **定义 5.4.2（最近整数记号与样本百分位数）**
>
> 当下标中出现记号 $$\lbrace b \rbrace$$ 时，它定义为把数 $$b$$ 按通常方式四舍五入到最近整数：更精确地，若 $$i$$ 是整数且 $$i - 0.5 \leq b < i + 0.5$$，则 $$\lbrace b \rbrace = i$$。
>
> 第 $$(100p)$$ 样本百分位数：当 $$\dfrac{1}{2n} < p < 0.5$$ 时为 $$X_{(\lbrace np \rbrace)}$$；当 $$0.5 < p < 1 - \dfrac{1}{2n}$$ 时为 $$X_{(n + 1 - \lbrace n(1 - p) \rbrace)}$$。

例如 $$n = 12$$ 时要第 65 百分位数：$$12 \times (1 - 0.65) = 4.2$$，$$12 + 1 - 4 = 9$$，故第 65 百分位数是 $$X_{(9)}$$。对 $$p$$ 的范围有限制，因为样本的容量限制了样本百分位数的范围。

$$p < 0.5$$ 与 $$p > 0.5$$ 分开定义，是为了使样本百分位数具有如下对称性：若第 $$(100p)$$ 百分位数是第 $$i$$ 小的观测，则第 $$(100(1-p))$$ 百分位数应是第 $$i$$ 大的观测；上述定义做到了这一点。例如 $$n = 11$$ 时第 30 百分位数是 $$X_{(3)}$$，第 70 百分位数是 $$X_{(9)}$$。

除中位数外，另有两个常用的样本百分位数：下四分位数（第 25 百分位数）与上四分位数（第 75 百分位数）。有时使用的散布度量是四分位距（interquartile range），即下、上四分位数之间的距离。

由于次序统计量是样本的函数，关于次序统计量的概率可以用样本的概率计算。若 $$X_1, \ldots, X_n$$ 是 iid 离散随机变量，则次序统计量的概率计算主要是计数任务；这些公式在定理 5.4.3 中导出。若 $$X_1, \ldots, X_n$$ 是来自连续总体的随机样本，则一个或多个次序统计量的 pdf 的便利表达式在定理 5.4.4 与 5.4.6 中导出，进而可用于导出次序统计量函数的分布。

> **定理 5.4.3（离散总体的次序统计量）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自离散分布的随机样本，pmf 为 $$f_X(x_i) = p_i$$，其中 $$x_1 < x_2 < \cdots$$ 是 $$X$$ 的可能值（升序）。定义
>
> $$
\begin{aligned}
P_0 &= 0,\\
P_1 &= p_1,\\
P_2 &= p_1 + p_2,\\
&\;\,\vdots\\
P_i &= p_1 + p_2 + \cdots + p_i,\\
&\;\,\vdots
\end{aligned}
$$
>
> 令 $$X_{(1)}, \ldots, X_{(n)}$$ 表示样本的次序统计量。则
>
> $$
P\Bigl( X_{(j)} \leq x_i \Bigr) = \sum_{k=j}^{n} \binom{n}{k}\, P_i^{\,k}\, (1 - P_i)^{n - k} \tag{5.4.2}
$$
>
> 且
>
> $$
P\Bigl( X_{(j)} = x_i \Bigr) = \sum_{k=j}^{n} \binom{n}{k}\, \Bigl[ P_i^{\,k}\, (1 - P_i)^{n - k} - P_{i-1}^{\,k}\, (1 - P_{i-1})^{n - k} \Bigr]. \tag{5.4.3}
$$
>
> **证明**　固定 $$i$$，设 $$Y$$ 为计 $$X_1, \ldots, X_n$$ 中小于等于 $$x_i$$ 的个数的随机变量。对每个 $$X_1, \ldots, X_n$$，称事件 $$\lbrace X_j \leq x_i \rbrace$$ 为“成功”、$$\lbrace X_j > x_i \rbrace$$ 为“失败”，则 $$Y$$ 是 $$n$$ 次试验中成功的次数。由于 $$X_1, \ldots, X_n$$ 同分布，每次试验成功的概率都是同一值 $$P_i = P(X_j \leq x_i)$$；又因 $$X_j$$ 与其他 $$X_i$$ 独立，第 $$j$$ 次试验的成功与否独立于其他试验的结果。故 $$Y \sim \mathrm{binomial}(n, P_i)$$。
>
> 事件 $$\lbrace X_{(j)} \leq x_i \rbrace$$ 等价于事件 $$\lbrace Y \geq j \rbrace$$，即至少 $$j$$ 个样本值小于等于 $$x_i$$。等式 (5.4.2) 表示这一二项概率 $$P\bigl( X_{(j)} \leq x_i \bigr) = P(Y \geq j)$$。等式 (5.4.3) 只是表示差
>
> $$
P\Bigl( X_{(j)} = x_i \Bigr) = P\Bigl( X_{(j)} \leq x_i \Bigr) - P\Bigl( X_{(j)} \leq x_{i-1} \Bigr).
$$
>
> 情形 $$i = 1$$ 是例外：$$P\bigl( X_{(j)} = x_1 \bigr) = P\bigl( X_{(j)} \leq x_1 \bigr)$$；$$P_0 = 0$$ 的定义在 (5.4.3) 中照顾到了这一例外。 ∎

若 $$X_1, \ldots, X_n$$ 是来自连续总体的随机样本，则情形稍微简化：任何两个 $$X_j$$ 相等的概率为 0，使我们免于考虑并列。于是 $$P\bigl( X_{(1)} < X_{(2)} < \cdots < X_{(n)} \bigr) = 1$$，且 $$X_{(1)}, \ldots, X_{(n)}$$ 的样本空间是 $$\lbrace (x_1, \ldots, x_n) : x_1 < x_2 < \cdots < x_n \rbrace$$。定理 5.4.4 与 5.4.6 中，我们仍用二项论证导出一个与两个次序统计量的 pdf 与联合 pdf。

> **定理 5.4.4（单个次序统计量的 pdf）**
>
> 设 $$X_{(1)}, \ldots, X_{(n)}$$ 是来自具有 cdf $$F_X(x)$$ 与 pdf $$f_X(x)$$ 的连续总体的随机样本 $$X_1, \ldots, X_n$$ 的次序统计量。则 $$X_{(j)}$$ 的 pdf 为
>
> $$
f_{X_{(j)}}(x) = \frac{n!}{(j - 1)!\, (n - j)!}\, f_X(x)\, \bigl[ F_X(x) \bigr]^{j - 1}\, \bigl[ 1 - F_X(x) \bigr]^{n - j}. \tag{5.4.4}
$$
>
> **证明**　先求 $$X_{(j)}$$ 的 cdf 再求导得 pdf。如定理 5.4.3，设 $$Y$$ 为计 $$X_1, \ldots, X_n$$ 中小于等于 $$x$$ 的个数的随机变量；定义“成功”为事件 $$\lbrace X_j \leq x \rbrace$$，则 $$Y \sim \mathrm{binomial}\bigl( n,\ F_X(x) \bigr)$$（注意定理 5.4.3 中可写 $$P_i = F_X(x_i)$$；又虽然 $$X_1, \ldots, X_n$$ 是连续随机变量，计数变量 $$Y$$ 是离散的）。于是
>
> $$
F_{X_{(j)}}(x) = P(Y \geq j) = \sum_{k=j}^{n} \binom{n}{k}\, \bigl[ F_X(x) \bigr]^{k}\, \bigl[ 1 - F_X(x) \bigr]^{n - k},
$$
>
> $$X_{(j)}$$ 的 pdf 为
>
> $$
\begin{aligned}
f_{X_{(j)}}(x) &= \frac{d}{dx}\, F_{X_{(j)}}(x)\\
&= \sum_{k=j}^{n} \binom{n}{k}\, \Bigl( k\, [F_X(x)]^{k - 1}\, [1 - F_X(x)]^{n - k}\, f_X(x) - (n - k)\, [F_X(x)]^{k}\, [1 - F_X(x)]^{n - k - 1}\, f_X(x) \Bigr) \qquad （\text{链式法则}）\\
&= \binom{n}{j}\, j\, f_X(x)\, [F_X(x)]^{j - 1}\, [1 - F_X(x)]^{n - j}\\
&\quad + \sum_{k=j+1}^{n} \binom{n}{k}\, k\, [F_X(x)]^{k - 1}\, [1 - F_X(x)]^{n - k}\, f_X(x)\\
&\quad - \sum_{k=j}^{n-1} \binom{n}{k}\, (n - k)\, [F_X(x)]^{k}\, [1 - F_X(x)]^{n - k - 1}\, f_X(x) \qquad （k = n\ \text{项为零}）\\
&= \frac{n!}{(j - 1)!\, (n - j)!}\, f_X(x)\, [F_X(x)]^{j - 1}\, [1 - F_X(x)]^{n - j}\\
&\quad + \sum_{k=j}^{n-1} \binom{n}{k + 1}\, (k + 1)\, [F_X(x)]^{k}\, [1 - F_X(x)]^{n - k - 1}\, f_X(x) \qquad （\text{改变哑变量}）\\
&\quad - \sum_{k=j}^{n-1} \binom{n}{k}\, (n - k)\, [F_X(x)]^{k}\, [1 - F_X(x)]^{n - k - 1}\, f_X(x).
\end{aligned}
$$
>
> 注意
>
> $$
\binom{n}{k + 1}\, (k + 1) = \frac{n!}{k!\, (n - k - 1)!} = \binom{n}{k}\, (n - k), \tag{5.4.5}
$$
>
> 可见 (5.4.5) 之前的最后两个和相互抵消。故 $$f_{X_{(j)}}(x)$$ 由 (5.4.4) 中的表达式给出。 ∎

> **例 5.4.5（均匀次序统计量的 pdf）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid uniform$(0, 1)$$，则 $$f_X(x) = 1$（$$x \in (0,1)$$），$$F_X(x) = x$$（$$x \in (0,1)$$）。用 (5.4.4)，第 $$j$$ 个次序统计量的 pdf 为
>
> $$
f_{X_{(j)}}(x) = \frac{n!}{(j - 1)!\, (n - j)!}\, x^{j - 1}\, (1 - x)^{n - j} \quad (x \in (0,1)) = \frac{\Gamma(n + 1)}{\Gamma(j)\, \Gamma(n - j + 1)}\, x^{j - 1}\, (1 - x)^{(n - j + 1) - 1}.
$$
>
> 故来自 uniform$(0,1)$$ 样本的第 $$j$$ 个次序统计量服从 $$\mathrm{beta}(j, n - j + 1)$$ 分布。由此可推出
$$
> \mathrm{E} X_{(j)} = \frac{j}{n + 1} \qquad\text{与}\qquad \mathrm{Var} X_{(j)} = \frac{j\, (n - j + 1)}{(n + 1)^2\, (n + 2)}.
> $$
两个或更多次序统计量的联合分布可用于导出本节开头提到的某些统计量的分布。任意两个次序统计量的联合 pdf 由下述定理给出，其证明留作习题 5.26。
**定理 5.4.6（两个次序统计量的联合 pdf）**
设 $$X_{(1)}, \ldots, X_{(n)}$$ 是来自具有 cdf $$F_X(x)$$ 与 pdf $$f_X(x)$$ 的连续总体的随机样本 $$X_1, \ldots, X_n$$ 的次序统计量。则 $$X_{(i)}$$ 与 $$X_{(j)}$$（$$1 \leq i < j \leq n$$）的联合 pdf 为
$$
> \begin{aligned}
> f_{X_{(i)}, X_{(j)}}(u, v) = \frac{n!}{(i - 1)!\, (j - 1 - i)!\, (n - j)!}\,&\, f_X(u)\, f_X(v)\, \bigl[ F_X(u) \bigr]^{i - 1}\\
> &\times \bigl[ F_X(v) - F_X(u) \bigr]^{j - 1 - i}\, \bigl[ 1 - F_X(v) \bigr]^{n - j}
> \end{aligned}
> $$
其中 $$-\infty < u < v < \infty$$。
三个或更多次序统计量的联合 pdf 可以用类似（但更复杂）的论证导出。另一个也许最有用的 pdf 是全体次序统计量的联合 pdf $$f_{X_{(1)}, \ldots, X_{(n)}}(x_1, \ldots, x_n)$$：
$$
f_{X_{(1)}, \ldots, X_{(n)}}(x_1, \ldots, x_n) = \begin{cases}
n!\, f_X(x_1) \cdots f_X(x_n) & -\infty < x_1 < \cdots < x_n < \infty,\\
0 & \text{其他}.
\end{cases}
$$
公式中的 $$n!$$ 自然出现：对任何一组值 $$x_1, \ldots, x_n$$，把这些值分配给 $$X_1, \ldots, X_n$$ 的 $$n!$$ 种等可能方式都给出相同的次序统计量值。这一联合 pdf 与第 4 章的技术可用于导出次序统计量的边缘分布、条件分布以及其他函数的分布（见习题 5.27 与 5.28）。
现在用联合 pdf (5.4.6) 导出本节开头提到的若干函数的分布。
**例 5.4.7（中距与极差的分布）**
设 $$X_1, \ldots, X_n$$ 是 iid uniform$(0, a)$$，$$X_{(1)}, \ldots, X_{(n)}$$ 为次序统计量。极差此前定义为 $$R = X_{(n)} - X_{(1)}$$。***中距***（midrange，像样本中位数或样本均值那样的位置度量）定义为 $$V = (X_{(1)} + X_{(n)}) / 2$$。我们将从 $$X_{(1)}$$ 与 $$X_{(n)}$$ 的联合 pdf 导出 $$R$$ 与 $$V$$ 的联合 pdf。
>
> 由 (5.4.6)：
>
> $$
f_{X_{(1)}, X_{(n)}}(x_1, x_n) = \frac{n (n - 1)}{a^2}\, \Bigl( \frac{x_n - x_1}{a} \Bigr)^{n - 2} = \frac{n (n - 1)\, (x_n - x_1)^{n - 2}}{a^n}, \qquad 0 < x_1 < x_n < a.
$$
>
> 解出 $$X_{(1)}$$ 与 $$X_{(n)}$$ 得 $$X_{(1)} = V - R/2$$，$$X_{(n)} = V + R/2$$；该变换的雅可比为 $$-1$$。从 $$(X_{(1)}, X_{(n)})$$ 到 $$(R, V)$$ 的变换把 $$\lbrace (x_1, x_n) : 0 < x_1 < x_n < a \rbrace$$ 映到集合 $$\lbrace (r, v) : 0 < r < a,\ r/2 < v < a - r/2 \rbrace$$ 上：显然 $$0 < r < a$$；对固定的 $$r$$，$$v$$ 从 $$r/2$$（对应 $$x_1 = 0$$，$$x_n = r$$）变到 $$a - r/2$$（对应 $$x_1 = a - r$$，$$x_n = a$$）。故 $$(R, V)$$ 的联合 pdf 为
>
> $$
f_{R,V}(r, v) = \frac{n (n - 1)\, r^{n - 2}}{a^n}, \qquad 0 < r < a, \quad r/2 < v < a - r/2.
$$
>
> $$R$$ 的边缘 pdf 为
>
> $$
f_R(r) = \int_{r/2}^{a - r/2} \frac{n (n - 1)\, r^{n - 2}}{a^n}\, dv = \frac{n (n - 1)\, r^{n - 2}\, (a - r)}{a^n}, \qquad 0 < r < a. \tag{5.4.7}
$$
>
> 若 $$a = 1$$，则 $$r$$ 服从 $$\mathrm{beta}(n - 1, 2)$$ 分布；对任意 $$a$$，由 (5.4.7) 容易推出 $$R/a$$ 服从贝塔分布。注意常数 $$a$$ 是尺度参数。
>
> $$f_{R,V}(r, v) > 0$$ 的集合见图 5.4.1：$$r$$ 的积分范围取决于 $$v > a/2$$ 还是 $$v \leq a/2$$。于是 $$V$$ 的边缘 pdf 为
>
> $$
f_V(v) = \int_0^{2v} \frac{n (n - 1)\, r^{n - 2}}{a^n}\, dr = \frac{n\, (2v)^{n - 1}}{a^n}, \qquad 0 < v \leq a/2,
$$
>
> 及
>
> $$
f_V(v) = \int_0^{2(a - v)} \frac{n (n - 1)\, r^{n - 2}}{a^n}\, dr = \frac{n\, \bigl[ 2(a - v) \bigr]^{n - 1}}{a^n}, \qquad a/2 < v \leq a.
$$
>
> 该 pdf 关于 $$a/2$$ 对称并在 $$a/2$$ 处有峰值。

![ch05_fig_5_4_1](fig/ch05_fig_5_4_1.png)

图 5.4.1　 例 5.4.7 中 $$f_{R,V}(r, v) > 0$$ 的区域（原书 Figure 5.4.1）

## 5.5 收敛概念（Convergence Concepts）

本节处理一个多少有些想象性的想法：允许样本量趋于无穷，并研究某些样本量在此过程中的行为。虽然无限样本量的概念是理论上的产物，但它常能为有限样本情形提供有用的近似，因为表达式在极限中通常会简化。

我们主要关心三种类型的收敛，并以不同的详细程度处理它们（完整的收敛理论例如见 Billingsley 1995 或 Resnick 1999）。特别地，我们要考察 $$n$$ 个观测的均值 $$\bar{X}_n$$ 当 $$n \to \infty$$ 时的行为。

### 5.5.1 依概率收敛（Convergence in Probability）

这类收敛是较弱的一种，因此通常容易验证。

> **定义 5.5.1（依概率收敛）**
>
> 若对每个 $$\varepsilon > 0$$ 都有
>
> $$
\lim_{n \to \infty} P\bigl( \vert X_n - X\vert  \geq \varepsilon \bigr) = 0, \qquad\text{或等价地}\qquad \lim_{n \to \infty} P\bigl( \vert X_n - X\vert  < \varepsilon \bigr) = 1,
$$
>
> 则称随机变量序列 $$X_1, X_2, \ldots$$ ***依概率收敛***（converge in probability）到随机变量 $$X$$。

定义 5.5.1 中的 $$X_1, X_2, \ldots$$（以及本节其他定义中的序列）通常不是像随机样本那样的 iid 随机变量：$$X_n$$ 的分布随下标变化；本节讨论的收敛概念描述 $$X_n$$ 的分布随下标增大而收敛到某个极限分布的不同方式。

统计学家经常关心极限随机变量是常数、而序列中的随机变量是（某种）样本均值的情形。这类结果中最著名的是下面的定理。

> **定理 5.5.2（弱大数定律，Weak Law of Large Numbers）**
>
> 设 $$X_1, X_2, \ldots$$ 是 iid 随机变量，$$\mathrm{E} X_i = \mu$$，$$\mathrm{Var} X_i = \sigma^2 < \infty$$。定义 $$\bar{X}_n = (1/n) \sum_{i=1}^{n} X_i$$。则对每个 $$\varepsilon > 0$$，
>
> $$
\lim_{n \to \infty} P\bigl( \vert \bar{X}_n - \mu\vert  < \varepsilon \bigr) = 1,
$$
>
> 即 $$\bar{X}_n$$ 依概率收敛到 $$\mu$$。
>
> **证明**　证明相当简单，是切比雪夫不等式的直接应用。对每个 $$\varepsilon > 0$$，
>
> $$
P\bigl( \vert \bar{X}_n - \mu\vert  \geq \varepsilon \bigr) = P\bigl( (\bar{X}_n - \mu)^2 \geq \varepsilon^2 \bigr) \leq \frac{\mathrm{E} (\bar{X}_n - \mu)^2}{\varepsilon^2} = \frac{\mathrm{Var} \bar{X}}{\varepsilon^2} = \frac{\sigma^2}{n \varepsilon^2}.
$$
>
> 故 $$P\bigl( \vert \bar{X}_n - \mu\vert  < \varepsilon \bigr) = 1 - P\bigl( \vert \bar{X}_n - \mu\vert  \geq \varepsilon \bigr) \geq 1 - \sigma^2 / (n \varepsilon^2) \to 1$$（当 $$n \to \infty$$）。 ∎

弱大数定律（WLLN）优雅地陈述：在一般条件下，当 $$n \to \infty$$ 时样本均值趋于总体均值。事实上 WLLN 有更一般的版本，只须假设均值有限；但定理 5.5.2 所述版本适用于多数实际情形。

WLLN 所总结的性质——同一“种类的”样本量构成的序列当 $$n \to \infty$$ 时趋于常数——称为一致性（consistency）；第 7 章将更仔细地考察这一性质。

> **例 5.5.3（$$S^2$$ 的一致性）**
>
> 设有 iid 随机变量序列 $$X_1, X_2, \ldots$$，$$\mathrm{E} X_i = \mu$$，$$\mathrm{Var} X_i = \sigma^2 < \infty$$。若定义
>
> $$
S_n^2 = \frac{1}{n - 1} \sum_{i=1}^{n} \bigl( X_i - \bar{X}_n \bigr)^2,
$$
>
> 能对 $$S_n^2$$ 证明一条弱大数定律吗？用切比雪夫不等式：
>
> $$
P\bigl( \vert S_n^2 - \sigma^2\vert  \geq \varepsilon \bigr) \leq \frac{\mathrm{E} (S_n^2 - \sigma^2)^2}{\varepsilon^2} = \frac{\mathrm{Var} S_n^2}{\varepsilon^2},
$$
>
> 故 $$S_n^2$$ 依概率收敛到 $$\sigma^2$$ 的充分条件是 $$\mathrm{Var} S_n^2 \to 0$$（当 $$n \to \infty$$）。

定义 5.5.1 的自然推广涉及随机变量的函数：若序列 $$X_1, X_2, \ldots$$ 依概率收敛到随机变量 $$X$$ 或常数 $$a$$，对某个行为合理的函数 $$h$$，关于序列 $$h(X_1), h(X_2), \ldots$$ 能得出什么结论吗？下面的定理表明可以。（证明见习题 5.39。）

> **定理 5.5.4（连续函数保持依概率收敛）**
>
> 设 $$X_1, X_2, \ldots$$ 依概率收敛到随机变量 $$X$$，$$h$$ 是连续函数。则 $$h(X_1), h(X_2), \ldots$$ 依概率收敛到 $$h(X)$$。

> **例 5.5.5（$$S$$ 的一致性）**
>
> 若 $$S_n^2$$ 是 $$\sigma^2$$ 的相合估计，则由定理 5.5.4，样本标准差 $$S_n = \sqrt{S_n^2} = h(S_n^2)$$ 是 $$\sigma$$ 的相合估计。注意 $$S_n$$ 实际上是 $$\sigma$$ 的有偏估计（习题 5.11），但偏差渐近消失。

### 5.5.2 几乎必然收敛（Almost Sure Convergence）

比依概率收敛更强的一种收敛是几乎必然收敛（almost sure convergence，有时被令人困惑地称为以概率 1 收敛）。这类收敛类似于函数列的点态收敛，只是收敛不必发生在概率为 0 的集合上（故名“几乎”必然）。

> **定义 5.5.6（几乎必然收敛）**
>
> 若对每个 $$\varepsilon > 0$$ 都有
>
> $$
P\Bigl( \lim_{n \to \infty} \vert X_n - X\vert  < \varepsilon \Bigr) = 1,
$$
>
> 则称随机变量序列 $$X_1, X_2, \ldots$$ ***几乎必然收敛***（converge almost surely）到随机变量 $$X$$。

注意定义 5.5.1 与 5.5.6 的表述很相似；虽然形似，却是非常不同的命题——定义 5.5.6 强得多。要理解几乎必然收敛，须回顾定义 1.4.1 中随机变量的基本定义：随机变量是定义在样本空间 $$S$$ 上的实值函数。若样本空间 $$S$$ 的元素记作 $$s$$，则 $$X_n(s)$$ 与 $$X(s)$$ 都是定义在 $$S$$ 上的函数。定义 5.5.6 说：若函数 $$X_n(s)$$ 对所有 $$s \in S$$（也许除了 $$s \in N$$，其中 $$N \subset S$$ 且 $$P(N) = 0$$）都收敛到 $$X(s)$$，则 $$X_n$$ 几乎必然收敛到 $$X$$。例 5.5.7 演示几乎必然收敛；例 5.5.8 演示依概率收敛与几乎必然收敛的区别。

> **例 5.5.7（几乎必然收敛）**
>
> 设样本空间 $$S$$ 为闭区间 $$[0, 1]$$，其上赋均匀概率分布。定义随机变量 $$X_n(s) = s + s^n$$，$$X(s) = s$$。对每个 $$s \in [0, 1)$$，$$s^n \to 0$$（当 $$n \to \infty$$），$$X_n(s) \to s = X(s)$$。但对每个 $$n$$ 都有 $$X_n(1) = 2$$，故 $$X_n(1)$$ 不收敛到 $$1 = X(1)$$。然而由于收敛发生在集合 $$[0, 1)$$ 上且 $$P([0, 1)) = 1$$，$$X_n$$ 几乎必然收敛到 $$X$$。

> **例 5.5.8（依概率收敛但不几乎必然收敛）**
>
> 本例描述一个依概率收敛但不几乎必然收敛的序列。同样设样本空间 $$S$$ 为闭区间 $$[0, 1]$$，赋均匀概率分布。定义序列 $$X_1, X_2, \ldots$$ 如下：
>
> $$
\begin{aligned}
X_1(s) &= s + I_{[0,1]}(s), & X_2(s) &= s + I_{[0,\, 1/2]}(s), & X_4(s) &= s + I_{[0,\, 1/3]}(s),\\
X_3(s) &= s + I_{[1/2,\, 1]}(s), & X_5(s) &= s + I_{[1/3,\, 2/3]}(s), & X_6(s) &= s + I_{[2/3,\, 1]}(s),
\end{aligned}
$$
>
> 等等。令 $$X(s) = s$$。容易看出 $$X_n$$ 依概率收敛到 $$X$$：当 $$n \to \infty$$ 时，$$P\bigl( \vert X_n - X\vert  \geq \varepsilon \bigr)$$ 等于一个长度趋于 0 的 $$s$$ 区间的概率。但 $$X_n$$ 不几乎必然收敛到 $$X$$：确实，不存在任何 $$s \in S$$ 使 $$X_n(s) \to s = X(s)$$——对每个 $$s$$，$$X_n(s)$$ 的值在 $$s$$ 与 $$s + 1$$ 之间无穷次交替。例如若 $$s = \tfrac{3}{8}$$：$$X_1(s) = 1\tfrac{3}{8}$$，$$X_2(s) = 1\tfrac{3}{8}$$，$$X_3(s) = \tfrac{3}{8}$$，$$X_4(s) = \tfrac{3}{8}$$，$$X_5(s) = 1\tfrac{3}{8}$$，$$X_6(s) = \tfrac{3}{8}$$……该序列没有点态收敛。

可以想见，几乎必然收敛作为更强的判据蕴含依概率收敛；逆命题当然不成立（例 5.5.8 已示）。但如果序列依概率收敛，可以找到几乎必然收敛的子序列（Resnick 1999, Section 6.3 对两类收敛的联系有透彻处理）。

统计学家同样常关心向常数的收敛。我们现在不加证明地陈述 WLLN 的更强类似物——强大数定律（Strong Law of Large Numbers，SLLN）；证明概要见杂记 5.8.4。

> **定理 5.5.9（强大数定律，Strong Law of Large Numbers）**
>
> 设 $$X_1, X_2, \ldots$$ 是 iid 随机变量，$$\mathrm{E} X_i = \mu$$，$$\mathrm{Var} X_i = \sigma^2 < \infty$$，定义 $$\bar{X}_n = (1/n) \sum_{i=1}^{n} X_i$$。则对每个 $$\varepsilon > 0$$，
>
> $$
P\Bigl( \lim_{n \to \infty} \vert \bar{X}_n - \mu\vert  < \varepsilon \Bigr) = 1,
$$
>
> 即 $$\bar{X}_n$$ 几乎必然收敛到 $$\mu$$。

对弱、强两个大数定律我们都假设了方差有限。虽然这一假设在多数应用中成立（且合意），它实际上比所需的更强：弱、强两个定律在去掉该假设后仍成立，唯一需要的矩条件是 $$\mathrm{E}\vert X_i\vert  < \infty$$（见 Resnick 1999, Chapter 7 或 Billingsley 1995, Section 22）。

### 5.5.3 依分布收敛（Convergence in Distribution）

我们在第 2 章已遇到过依分布收敛的想法。回忆矩母函数的性质及其收敛蕴含依分布收敛（定理 2.3.12）。

> **定义 5.5.10（依分布收敛）**
>
> 若
>
> $$
\lim_{n \to \infty} F_{X_n}(x) = F_X(x)
$$
>
> 在 $$F_X(x)$$ 的所有连续点 $$x$$ 处成立，则称随机变量序列 $$X_1, X_2, \ldots$$ ***依分布收敛***（converge in distribution）到随机变量 $$X$$。

> **例 5.5.11（均匀变量的最大值）**
>
> 设 $$X_1, X_2, \ldots$$ 是 iid uniform$(0, 1)$$，$$X_{(n)} = \max_{1 \leq i \leq n} X_i$$。考察 $$X_{(n)}$$ 是否（向何处）依分布收敛。
当 $$n \to \infty$$ 时，我们预期 $$X_{(n)}$$ 接近 1；由于 $$X_{(n)}$$ 必小于 1，对任意 $$\varepsilon > 0$$：
$$
> P\bigl( \vert X_{(n)} - 1\vert  \geq \varepsilon \bigr) = P\bigl( X_{(n)} \geq 1 + \varepsilon \bigr) + P\bigl( X_{(n)} \leq 1 - \varepsilon \bigr) = 0 + P\bigl( X_{(n)} \leq 1 - \varepsilon \bigr).
> $$
再用 iid 样本的事实：
$$
> P\bigl( X_{(n)} \leq 1 - \varepsilon \bigr) = P\bigl( X_i \leq 1 - \varepsilon,\ i = 1, \ldots, n \bigr) = (1 - \varepsilon)^{n},
> $$
它趋于 0。所以我们证明了 $$X_{(n)}$$ 依概率收敛到 1。然而若取 $$\varepsilon = t/n$$，则
$$
> P\bigl( X_{(n)} \leq 1 - t/n \bigr) = (1 - t/n)^{n} \to e^{-t},
> $$
整理得
$$
> P\bigl( n (1 - X_{(n)}) \leq t \bigr) \to 1 - e^{-t},
> $$
即随机变量 $$n (1 - X_{(n)})$$ 依分布收敛到一个 $$\mathrm{exponential}(1)$$ 随机变量。
注意：虽然我们谈论随机变量序列依分布收敛，真正收敛的是 cdf 而非随机变量本身。在这一根本意义上，依分布收敛与依概率收敛或几乎必然收敛相当不同；但它由其他类型的收敛所蕴含。
**定理 5.5.12（依概率收敛蕴含依分布收敛）**
若随机变量序列 $$X_1, X_2, \ldots$$ 依概率收敛到随机变量 $$X$$，则该序列也依分布收敛到 $$X$$。
证明见习题 5.40。另注意由 5.5.2 节，依分布收敛也被几乎必然收敛蕴含。
在一个特殊情形，定理 5.5.12 有一个有用的逆。例证见例 10.1.13，证明见习题 5.41。
**定理 5.5.13（向常数依分布收敛等价于依概率收敛）**
随机变量序列 $$X_1, X_2, \ldots$$ 依概率收敛到常数 $$\mu$$ 当且仅当该序列也依分布收敛到 $$\mu$$。即命题
$$
> P\bigl( \vert X_n - \mu\vert  > \varepsilon \bigr) \to 0 \quad \text{（对每个}\ \varepsilon > 0\text{）}
> $$
等价于
$$
> P\bigl( X_n \leq x \bigr) \to \begin{cases} 0 & \text{若}\ x < \mu,\\ 1 & \text{若}\ x > \mu. \end{cases}
> $$
样本均值是大样本行为相当重要的统计量之一。特别地，我们要研究其极限分布；这总结在统计学中最令人惊叹的定理之一——中心极限定理（Central Limit Theorem，CLT）之中。
**定理 5.5.14（中心极限定理，Central Limit Theorem）**
设 $$X_1, X_2, \ldots$$ 是 iid 随机变量序列，其 mgf 在 0 的某邻域内存在（即对某个 $$h > 0$$，$$\mathrm{E} e^{t X_i}$$ 对 $$\vert t\vert  < h$$ 存在）。设 $$\mathrm{E} X_i = \mu$$，$$\mathrm{Var} X_i = \sigma^2 > 0$$（由于 mgf 存在，$$\mu$$ 与 $$\sigma^2$$ 都有限）。定义 $$\bar{X}_n = (1/n) \sum_{i=1}^{n} X_i$$，$$G_n(x)$$ 表示 $$\sqrt{n} (\bar{X}_n - \mu) / \sigma$$ 的 cdf。则对任意 $$x$$，$$-\infty < x < \infty$$，
$$
> \lim_{n \to \infty} G_n(x) = \int_{-\infty}^{x} \frac{1}{\sqrt{2\pi}}\, e^{-y^2/2}\, dy,
> $$
即 $$\sqrt{n} (\bar{X}_n - \mu)/\sigma$$ 有极限标准正态分布。
在证明该定理（证明多少有些虎头蛇尾）之前，先看其含义：从几乎不设前提（除独立性与有限方差外）出发，我们最终得到正态性！要点在于：正态性来自“小的”（方差有限的）、独立的扰动的求和。方差有限这一假设对收敛到正态本质上是必要的：虽可稍稍放宽，但不能取消（回忆例 5.2.10 处理的柯西分布——没有向正态的收敛）。
在惊叹 CLT 之奇妙的同时，反思其局限也有益：虽然它给出有用的通用近似，我们没有自动知晓近似好坏的一般途径。事实上近似的好坏是原分布的函数，必须逐例检查。此外，随着廉价而充足的计算能力的普及，中心极限定理这类近似的重要性有所下降。尽管有这些局限，它仍是一个绝妙的结果。
**定理 定理 5.5.14 的证明**
我们将证明：对 $$\vert t\vert  < h$$，$$\sqrt{n} (\bar{X}_n - \mu)/\sigma$$ 的 mgf 收敛到 $$e^{t^2/2}$$，即 $$n(0,1)$$ 随机变量的 mgf。
定义 $$Y_i = (X_i - \mu)/\sigma$$，设 $$M_Y(t)$$ 为诸 $$Y_i$$ 的公共 mgf（它在 $$\vert t\vert  < \sigma h$$ 存在，由定理 2.3.15 给出）。由于
$$
> \frac{\sqrt{n} (\bar{X}_n - \mu)}{\sigma} = \frac{1}{\sqrt{n}} \sum_{i=1}^{n} Y_i, \tag{5.5.1}
> $$
由 mgf 的性质（见定理 2.3.15 与 4.6.7）：
$$
> M_{\sqrt{n}(\bar{X}_n - \mu)/\sigma}(t) = M_{\sum_{i=1}^n Y_i / \sqrt{n}}(t) = M_{\sum_{i=1}^n Y_i}\Bigl( \frac{t}{\sqrt{n}} \Bigr) = \Bigl[ M_Y\Bigl( \frac{t}{\sqrt{n}} \Bigr) \Bigr]^{n}. \tag{5.5.2}
> $$
现在把 $$M_Y(t / \sqrt{n})$$ 在 0 附近做泰勒展开（幂级数展开；见定义 5.5.20）：
$$
> M_Y\Bigl( \frac{t}{\sqrt{n}} \Bigr) = \sum_{k=0}^{\infty} M_Y^{(k)}(0)\, \frac{(t / \sqrt{n})^{k}}{k!}, \tag{5.5.3}
> $$
其中 $$M_Y^{(k)}(0) = \frac{d^k}{dt^k} M_Y(t) \big\vert _{t=0}$$。由于 mgf 在 $$\vert t\vert  < h$$ 存在，幂级数展开在 $$\vert t\vert  < \sqrt{n}\, \sigma h$$ 时有效。
用事实 $$M_Y^{(0)}(0) = 1$$、$$M_Y^{(1)}(0) = 0$$、$$M_Y^{(2)}(0) = 1$$（按构造，$$Y$$ 的均值与方差为 0 与 1），得
$$
> M_Y\Bigl( \frac{t}{\sqrt{n}} \Bigr) = 1 + \frac{(t / \sqrt{n})^2}{2!} + R_Y\Bigl( \frac{t}{\sqrt{n}} \Bigr), \tag{5.5.4}
> $$
其中 $$R_Y$$ 是泰勒展开的余项：
$$
> R_Y\Bigl( \frac{t}{\sqrt{n}} \Bigr) = \sum_{k=3}^{\infty} M_Y^{(k)}(0)\, \frac{(t / \sqrt{n})^{k}}{k!}.
> $$
应用泰勒定理（定理 5.5.21）可知：对固定的 $$t \neq 0$$，
$$
> \lim_{n \to \infty} \frac{R_Y\bigl( t / \sqrt{n} \bigr)}{(t / \sqrt{n})^2} = 0.
> $$
由于 $$t$$ 固定，还有
$$
> \lim_{n \to \infty} \frac{R_Y\bigl( t / \sqrt{n} \bigr)}{(1/\sqrt{n})^2} = \lim_{n \to \infty} n\, R_Y\Bigl( \frac{t}{\sqrt{n}} \Bigr) = 0, \tag{5.5.5}
> $$
且 (5.5.5) 在 $$t = 0$$ 时也成立（$$R_Y(0/\sqrt{n}) = 0$$）。于是对任意固定的 $$t$$：
$$
> \lim_{n \to \infty} \Bigl[ M_Y\Bigl( \frac{t}{\sqrt{n}} \Bigr) \Bigr]^{n} = \lim_{n \to \infty} \Bigl[ 1 + \frac{(t/\sqrt{n})^2}{2!} + R_Y\Bigl( \frac{t}{\sqrt{n}} \Bigr) \Bigr]^{n} = \lim_{n \to \infty} \Bigl[ 1 + \frac{1}{n}\, \Bigl( \frac{t^2}{2} + n\, R_Y\Bigl( \frac{t}{\sqrt{n}} \Bigr) \Bigr) \Bigr]^{n} = e^{t^2/2}, \tag{5.5.6}
> $$
最后一步应用引理 2.3.14，取 $$a_n = \bigl( t^2/2 \bigr) + n\, R_Y\bigl( t/\sqrt{n} \bigr)$$（注意 (5.5.5) 蕴含 $$a_n \to t^2/2$$，当 $$n \to \infty$$）。由于 $$e^{t^2/2}$$ 是 $$n(0, 1)$$ 分布的 mgf，定理得证。
中心极限定理成立的普遍性远超定理 5.5.14 的陈述（杂记 5.8.1）。特别地，关于 mgf 的全部假设都不必要——特征函数（杂记 2.6.2）可以取而代之。下面不加证明地陈述该定理的一个版本，它已一般到几乎能满足一切统计用途。注意对父分布唯一的假设是方差有限。
**定理 5.5.15（中心极限定理的更强形式）**
设 $$X_1, X_2, \ldots$$ 是 iid 随机变量序列，$$\mathrm{E} X_i = \mu$$，$$0 < \mathrm{Var} X_i = \sigma^2 < \infty$$。定义 $$\bar{X}_n = (1/n) \sum_{i=1}^{n} X_i$$，$$G_n(x)$$ 表示 $$\sqrt{n} (\bar{X}_n - \mu) / \sigma$$ 的 cdf。则对任意 $$x$$，$$-\infty < x < \infty$$，
$$
> \lim_{n \to \infty} G_n(x) = \int_{-\infty}^{x} \frac{1}{\sqrt{2\pi}}\, e^{-y^2/2}\, dy,
> $$
即 $$\sqrt{n} (\bar{X}_n - \mu)/\sigma$$ 有极限标准正态分布。
该证明与定理 5.5.14 几乎相同，只是用特征函数代替 mgf。由于任何分布的特征函数总存在，定理假设中不必再提及它。但证明更精细，因为必须处理复变量函数；细节见 Billingsley (1995, Section 27)。
中心极限定理为我们提供了一个通用近似（但记住关于近似好坏的警告）。实践中它总可以用于初步的粗略计算。
**例 5.5.16（负二项分布的正态近似）**
设 $$X_1, \ldots, X_n$$ 是来自 $$\mathrm{negative\ binomial}(r, p)$$ 分布的随机样本。回忆
$$
> \mathrm{E} X = \frac{r(1 - p)}{p}, \qquad \mathrm{Var} X = \frac{r(1 - p)}{p^2},
> $$
中心极限定理告诉我们
$$
> \frac{\sqrt{n}\, \bigl( \bar{X} - r(1 - p)/p \bigr)}{\sqrt{r(1 - p)/p^2}}
> $$
近似为 $$n(0, 1)$$。近似概率计算比精确计算容易得多。例如 $$r = 10$$、$$p = \tfrac{1}{2}$$、$$n = 30$$ 时，精确计算是
$$
> \begin{aligned}
> P(\bar{X} \leq 11) &= P\Bigl( \sum_{i=1}^{30} X_i \leq 330 \Bigr) = \sum_{x=0}^{330} \binom{300 + x - 1}{x}\, \Bigl( \frac{1}{2} \Bigr)^{300}\, \Bigl( \frac{1}{2} \Bigr)^{x}\\
> &= 0.8916,
> \end{aligned}
> $$
（$$\sum X_i$$ 是 $$\mathrm{negative\ binomial}(nr, p)$$），这是非常困难的计算。（注意即使借助计算机这一计算也很困难——阶乘的量级造成巨大麻烦；不信就试试！）CLT 给出近似
$$
> P(\bar{X} \leq 11) = P\Biggl( \frac{\sqrt{30}\, (\bar{X} - 10)}{\sqrt{20}} \leq \frac{\sqrt{30}\, (11 - 10)}{\sqrt{20}} \Biggr) \approx P(Z \leq 1.2247) = 0.8888.
> $$
进一步的改进见习题 5.37。
一个可与中心极限定理配合使用的近似工具是斯卢茨基定理（Slutsky's Theorem）。
**定理 5.5.17（斯卢茨基定理，Slutsky's Theorem）**
若 $$X_n \xrightarrow{d} X$$（依分布），$$Y_n \xrightarrow{P} a$$（$$a$$ 为常数，依概率），则
- a. $$Y_n\, X_n \xrightarrow{d} a X$$；
- b. $$X_n + Y_n \xrightarrow{d} X + a$$。
斯卢茨基定理的证明从略，因为它依赖一种我们尚未讨论的依分布收敛刻画。典型应用见下例。
**例 5.5.18（方差被估计时的正态近似）**
设
$$
> \frac{\sqrt{n}\, (\bar{X}_n - \mu)}{\sigma} \xrightarrow{d} n(0, 1),
> $$
但 $$\sigma$$ 的值未知。例 5.5.3 中已见：若 $$\lim_{n \to \infty} \mathrm{Var} S_n^2 = 0$$，则 $$S_n^2 \xrightarrow{P} \sigma^2$$。由习题 5.32，$$\sigma / S_n \xrightarrow{P} 1$$。故由斯卢茨基定理
$$
> \frac{\sqrt{n}\, (\bar{X}_n - \mu)}{S_n} = \frac{\sigma}{S_n}\, \frac{\sqrt{n}\, (\bar{X}_n - \mu)}{\sigma} \xrightarrow{d} n(0, 1).
> $$
### 5.5.4 Delta 方法（The Delta Method）
上一节给出了标准化随机变量具有极限正态分布的条件。但很多时候我们并不特别关心随机变量本身的分布，而是关心随机变量的某个函数的分布。
**例 5.5.19（估计发生比）**
设我们观测到独立的 $$\mathrm{Bernoulli}(p)$$ 随机变量 $$X_1, X_2, \ldots, X_n$$。关心的典型参数是成功概率 $$p$$，但另一个常用参数是发生比（odds）$$\dfrac{p}{1 - p}$$。例如若数据代表某医学治疗的结果且 $$p = 2/3$$，则一个人痊愈的发生比是 $$2:1$$。而且若另有成功概率为 $$r$$ 的治疗，生物统计学家常估计发生比比（odds ratio）$$\dfrac{p}{1-p} \Big/ \dfrac{r}{1-r}$$，给出一种治疗对另一种的相对发生比。
通常用观测到的成功比例 $$\hat{p} = \sum_i X_i / n$$ 估计成功概率 $$p$$，我们可能考虑用 $$\dfrac{\hat{p}}{1 - \hat{p}}$$ 作为 $$\dfrac{p}{1 - p}$$ 的估计。但这个估计量的性质如何？如何估计 $$\dfrac{\hat{p}}{1 - \hat{p}}$$ 的方差？又如何近似其抽样分布？
直觉靠不住，精确计算希望渺茫，只好依赖近似。Delta 方法将使我们对这些问题得到合理的近似答案。
一条路子是使用泰勒级数近似，它使我们能近似随机变量函数的均值与方差；我们还将看到这些相当直截的近似足以获得一条 CLT。先简短复习泰勒级数。
**定义 5.5.20（泰勒多项式）**
若函数 $$g(x)$$ 具有 $$r$$ 阶导数，即 $$g^{(r)}(x) = \dfrac{d^r}{dx^r} g(x)$$ 存在，则对任意常数 $$a$$，关于 $$a$$ 的 $$r$$ 阶泰勒多项式为
$$
> T_r(x) = \sum_{i=0}^{r} \frac{g^{(i)}(a)}{i!}\, (x - a)^i.
> $$
泰勒的主要定理（此处不证）是：近似的余项 $$g(x) - T_r(x)$$ 总比最高阶显式项更快地趋于零。
**定理 5.5.21（泰勒定理）**
若 $$g^{(r)}(a) = \dfrac{d^r}{dx^r} g(x) \big\vert _{x = a}$$ 存在，则
$$
> \lim_{x \to a} \frac{g(x) - T_r(x)}{(x - a)^r} = 0.
> $$
一般我们不关心余项的显式形式：既然关心近似，干脆忽略余项。不过余项确有许多显式形式，一个有用的形式是
$$
g(x) - T_r(x) = \int_a^{x} \frac{g^{(r + 1)}(t)}{r!}\, (x - t)^{r}\, dt.
$$
对泰勒定理的统计应用，我们最关心一阶泰勒级数，即只用一阶导数的近似（上列公式取 $$r = 1$$）。此外我们还会用到多元泰勒级数；由于以上细节是一元的，下面部分内容只能凭信接受。
设 $$T_1, \ldots, T_k$$ 是均值为 $$\theta_1, \ldots, \theta_k$$ 的随机变量，定义 $$\textbf{T} = (T_1, \ldots, T_k)$$ 与 $$\boldsymbol{\theta} = (\theta_1, \ldots, \theta_k)$$。设有可微函数 $$g(\textbf{T})$$（某个参数的估计量）想要方差的近似估计。定义
$$
g_i'(\boldsymbol{\theta}) = \left. \frac{\partial}{\partial t_i}\, g(\textbf{t}) \right\vert _{t_1 = \theta_1, \ldots, t_k = \theta_k}.
$$
$$g$$ 在 $$\boldsymbol{\theta}$$ 处的一阶泰勒展开为
$$
g(\textbf{t}) = g(\boldsymbol{\theta}) + \sum_{i=1}^{k} g_i'(\boldsymbol{\theta})\, (t_i - \theta_i) + \text{余项}.
$$
对统计近似而言，忘掉余项，写
$$
g(\textbf{t}) \approx g(\boldsymbol{\theta}) + \sum_{i=1}^{k} g_i'(\boldsymbol{\theta})\, (t_i - \theta_i). \tag{5.5.7}
$$
对 (5.5.7) 两边取期望：
$$
\mathrm{E}_{\boldsymbol{\theta}}\, g(\textbf{T}) \approx g(\boldsymbol{\theta}) + \sum_{i=1}^{k} g_i'(\boldsymbol{\theta})\, \mathrm{E}_{\boldsymbol{\theta}} (T_i - \theta_i) = g(\boldsymbol{\theta})
\qquad （T_i\ \text{有均值}\ \theta_i）. \tag{5.5.8}
$$
现在可以近似 $$g(\textbf{T})$$ 的方差：
$$
\mathrm{Var}_{\boldsymbol{\theta}}\, g(\textbf{T}) \approx \mathrm{E}_{\boldsymbol{\theta}}\bigl[ g(\textbf{T}) - g(\boldsymbol{\theta}) \bigr]^2 \qquad （\text{用}\ (5.5.8)）
$$
$$
\approx \mathrm{E}_{\boldsymbol{\theta}}\Biggl[ \sum_{i=1}^{k} g_i'(\boldsymbol{\theta})\, (T_i - \theta_i) \Biggr]^2 \qquad （\text{用}\ (5.5.7)） \tag{5.5.9}
$$
$$
= \sum_{i=1}^{k} \bigl[ g_i'(\boldsymbol{\theta}) \bigr]^2\, \mathrm{Var}_{\boldsymbol{\theta}}\, T_i + 2 \sum_{i > j} g_i'(\boldsymbol{\theta})\, g_j'(\boldsymbol{\theta})\, \mathrm{Cov}_{\boldsymbol{\theta}}(T_i, T_j),
$$
最后的等式来自展开平方并使用方差与协方差的定义（类似习题 4.44）。近似式 (5.5.9) 非常有用：它只用简单的方差与协方差，就给出一般函数的方差公式。这里给出两个例子。
**例 5.5.22（例 5.5.19 的继续）**
回忆我们关心 $$\dfrac{\hat{p}}{1 - \hat{p}}$$ 作为 $$\dfrac{p}{1 - p}$$ 的估计的性质，其中 $$p$$ 是二项成功概率。按上述记号，取 $$g(p) = \dfrac{p}{1 - p}$$，则 $$g'(p) = \dfrac{1}{(1 - p)^2}$$，且
$$
> \mathrm{Var}\Biggl( \frac{\hat{p}}{1 - \hat{p}} \Biggr) \approx \bigl[ g'(p) \bigr]^2\, \mathrm{Var}(\hat{p}) = \frac{1}{(1 - p)^4}\, \frac{p\, (1 - p)}{n} = \frac{p}{n\, (1 - p)^3},
> $$
给出了估计量方差的近似。
**例 5.5.23（近似均值与方差）**
设 $$X$$ 是满足 $$\mathrm{E}_{\mu} X = \mu \neq 0$$ 的随机变量。若要估计函数 $$g(\mu)$$，一阶近似会给出
$$
> g(X) = g(\mu) + g'(\mu)\, (X - \mu).
> $$
若用 $$g(X)$$ 作为 $$g(\mu)$$ 的估计，可以（近似地）说
$$
> \mathrm{E}_{\mu}\, g(X) \approx g(\mu), \qquad \mathrm{Var}_{\mu}\, g(X) \approx \bigl[ g'(\mu) \bigr]^2\, \mathrm{Var}_{\mu}\, X.
> $$
一个具体的例子：取 $$g(\mu) = 1/\mu$$。我们用 $$1/\bar{X}$$ 估计 $$1/\mu$$，可以说
$$
> \mathrm{E}_{\mu}\Bigl( \frac{1}{\bar{X}} \Bigr) \approx \frac{1}{\mu}, \qquad \mathrm{Var}_{\mu}\Bigl( \frac{1}{\bar{X}} \Bigr) \approx \frac{1}{\mu^4}\, \mathrm{Var}_{\mu}\, \bar{X}.
> $$
用这些关于均值与方差的泰勒级数近似，我们得到中心极限定理的如下有用推广，即 Delta 方法。
**定理 5.5.24（Delta 方法）**
设 $$Y_n$$ 是满足 $$\sqrt{n}\, (Y_n - \theta) \xrightarrow{d} n(0, \sigma^2)$$ 的随机变量序列。对给定的函数 $$g$$ 与特定的 $$\theta$$ 值，设 $$g'(\theta)$$ 存在且不为零。则
$$
> \sqrt{n}\, \bigl[ g(Y_n) - g(\theta) \bigr] \xrightarrow{d} n\bigl( 0,\ \sigma^2\, [g'(\theta)]^2 \bigr). \tag{5.5.10}
> $$
**证明**　$$g(Y_n)$$ 在 $$Y_n = \theta$$ 处的泰勒展开为
$$
> g(Y_n) = g(\theta) + g'(\theta)\, (Y_n - \theta) + \text{余项}, \tag{5.5.11}
> $$
其中当 $$Y_n \to \theta$$ 时余项 $$\to 0$$。由于 $$Y_n \xrightarrow{P} \theta$$，余项依概率 $$\to 0$$。对
$$
> \sqrt{n}\, \bigl[ g(Y_n) - g(\theta) \bigr] = g'(\theta)\, \sqrt{n}\, (Y_n - \theta)
> $$
应用斯卢茨基定理（定理 5.5.17），结论即得。细节见习题 5.43。 ∎
**例 5.5.25（例 5.5.23 的继续）**
现在设我们手头是随机样本的均值 $$\bar{X}$$。对 $$\mu \neq 0$$，有
$$
> \sqrt{n}\, \Bigl( \frac{1}{\bar{X}} - \frac{1}{\mu} \Bigr) \xrightarrow{d} n\Bigl( 0,\ \frac{1}{\mu^4}\, \mathrm{Var}_{\mu} X_1 \Bigr).
> $$
若不知道 $$X_1$$ 的方差，使用上述近似就需要一个估计，比如 $$S^2$$。此外还有 $$1/\mu$$ 项如何处理的问题——我们同样不知道 $$\mu$$。可以对一切进行估计，得到近似方差
$$
> \widehat{\mathrm{Var}}\Bigl( \frac{1}{\bar{X}} \Bigr) \approx \frac{1}{\bar{X}^4}\, S^2.
> $$
进一步，由于 $$\bar{X}$$ 与 $$S^2$$ 都是相合估计，再次应用斯卢茨基定理可断言：对 $$\mu \neq 0$$，
$$
> \frac{\sqrt{n}\, \bigl( \tfrac{1}{\bar{X}} - \tfrac{1}{\mu} \bigr)}{\bigl( \tfrac{1}{\bar{X}^2} \bigr)\, S} \xrightarrow{d} n(0, 1).
> $$
注意后一量的写法：除以估计出的标准差，使极限分布为标准正态。当需要估计极限分布中的参数时，这是唯一说得通的写法。我们还注意到，当有待估参数时存在另一种途径，此时实际上可以避免在方差中使用 $$\mu$$ 的估计（见 10.3.2 节的得分检验）。
要完成对 Delta 方法的处理，需要讨论两个推广。第一个涉及 $$g'(\mu) = 0$$ 的可能性。例如若我们关心的是估计二项方差的方差，就可能发生这种情况（见习题 5.44）。
若 $$g'(\theta) = 0$$，在泰勒展开中再多取一项：
$$
g(Y_n) = g(\theta) + g'(\theta)\, (Y_n - \theta) + \frac{g''(\theta)}{2}\, (Y_n - \theta)^2 + \text{余项}.
$$
做一些整理（置 $$g' = 0$$）：
$$
g(Y_n) - g(\theta) = \frac{g''(\theta)}{2}\, (Y_n - \theta)^2 + \text{余项}. \tag{5.5.12}
$$
现在回忆 $$n(0, 1)$$ 的平方是 $$\chi_1^2$$（例 2.1.9），这意味着
$$
\frac{n\, (Y_n - \theta)^2}{\sigma^2} \xrightarrow{d} \chi_1^2.
$$
因此，与定理 5.5.24 类似的论证可以建立下面的定理。
**定理 5.5.26（二阶 Delta 方法）**
设 $$Y_n$$ 是满足 $$\sqrt{n}\, (Y_n - \theta) \xrightarrow{d} n(0, \sigma^2)$$ 的随机变量序列。对给定的函数 $$g$$ 与特定的 $$\theta$$ 值，设 $$g'(\theta) = 0$$ 且 $$g''(\theta)$$ 存在不为零。则
$$
> n\, \bigl[ g(Y_n) - g(\theta) \bigr] \xrightarrow{d} \frac{\sigma^2\, g''(\theta)}{2}\, \chi_1^2. \tag{5.5.13}
> $$
当被估函数由多个参数构成、估计量使用多个随机变量时，近似技术非常有用。一个常见的例子是生长研究：体重/身高之比是关心的变量。（回忆第 3 章：两个正态随机变量之比服从柯西分布。比的问题对实验者重要，在理论上却很棘手。）
这就引出 Delta 方法的第二个推广——多元情形。既然已有多元泰勒定理，这一推广毫无意外。
**例 5.5.27（比估计量的矩）**
设 $$X$$ 与 $$Y$$ 是均值分别为 $$\mu_X \neq 0$$、$$\mu_Y \neq 0$$ 的随机变量。要估计的参数函数是 $$g(\mu_X, \mu_Y) = \mu_X / \mu_Y$$。容易计算
$$
> \frac{\partial}{\partial \mu_X}\, g(\mu_X, \mu_Y) = \frac{1}{\mu_Y} \qquad\text{与}\qquad \frac{\partial}{\partial \mu_Y}\, g(\mu_X, \mu_Y) = \frac{-\mu_X}{\mu_Y^2}.
> $$
一阶泰勒近似 (5.5.8) 与 (5.5.9) 给出
$$
> \mathrm{E}\Bigl( \frac{\bar{X}}{\bar{Y}} \Bigr) \approx \frac{\mu_X}{\mu_Y},
> $$
及
$$
> \begin{aligned}
> \mathrm{Var}\Bigl( \frac{\bar{X}}{\bar{Y}} \Bigr) &\approx \frac{1}{\mu_Y^2}\, \mathrm{Var} \bar{X} + \frac{\mu_X^2}{\mu_Y^4}\, \mathrm{Var} \bar{Y} - \frac{2 \mu_X}{\mu_Y^3}\, \mathrm{Cov}(\bar{X}, \bar{Y})\\
> &= \Bigl( \frac{\mu_X}{\mu_Y} \Bigr)^2 \Biggl( \frac{\mathrm{Var} \bar{X}}{\mu_X^2} + \frac{\mathrm{Var} \bar{Y}}{\mu_Y^2} - 2\, \frac{\mathrm{Cov}(\bar{X}, \bar{Y})}{\mu_X \mu_Y} \Biggr).
> \end{aligned}
> $$
于是我们有了比估计量均值与方差的近似，且这些近似只用 $$\bar{X}$$ 与 $$\bar{Y}$$ 的均值、方差与协方差。精确计算几乎无望，闭式表达式无法得到。
接下来给出覆盖像比估计量这样的估计量的 CLT。注意尽管最终的 CLT 是一元的，我们必须处理多个随机变量。设向量值随机变量 $$\textbf{X} = (X_1, \ldots, X_p)$$ 有均值 $$\boldsymbol{\mu} = (\mu_1, \ldots, \mu_p)$$ 与协方差 $$\mathrm{Cov}(X_i, X_j) = \sigma_{ij}$$；观测独立随机样本 $$\textbf{X}_1, \ldots, \textbf{X}_n$$ 并计算均值 $$\bar{X}_i = \frac{1}{n} \sum_{k=1}^{n} X_{ik}$$（$$i = 1, \ldots, p$$）。对函数 $$g(\textbf{x}) = g(x_1, \ldots, x_p)$$，可用 (5.5.7) 之后的展开写
$$
g(\bar{x}_1, \ldots, \bar{x}_p) = g(\mu_1, \ldots, \mu_p) + \sum_{k=1}^{p} g_k'(\textbf{x})\, (\bar{x}_k - \mu_k),
$$
于是有下面的定理。
**定理 5.5.28（多元 Delta 方法）**
设 $$\textbf{X}_1, \ldots, \textbf{X}_n$$ 是满足 $$\mathrm{E}(X_{ij}) = \mu_i$$、$$\mathrm{Cov}(X_{ik}, X_{jk}) = \sigma_{ij}$$ 的随机样本。对具有连续一阶偏导数的给定函数 $$g$$ 与特定的 $$\boldsymbol{\mu} = (\mu_1, \mu_2, \ldots, \mu_p)$$ 值，若 $$\tau^2 = \sum\sum \sigma_{ij}\, \dfrac{\partial g(\boldsymbol{\mu})}{\partial \mu_i}\, \dfrac{\partial g(\boldsymbol{\mu})}{\partial \mu_j} > 0$$，则
$$
> \sqrt{n}\, \bigl[ g(\bar{X}_1, \ldots, \bar{X}_p) - g(\mu_1, \ldots, \mu_p) \bigr] \xrightarrow{d} n(0, \tau^2).
> $$
该证明需要处理多元随机变量的收敛，我们不在这些多元细节上展开，而将定理 5.5.28 凭信接受。有兴趣的读者可在 Lehmann and Casella (1998, Section 1.8) 找到更多细节。
## 5.6 生成随机样本（Generating a Random Sample）
到目前为止，我们关心的都是描述随机变量行为的方法——变换、分布、矩的计算、极限定理。实践中，这些随机变量被用来描述真实现象并为其建模，而这些随机变量的观测就是我们收集的数据。
于是典型情形是：我们观测来自分布 $$f(x \mid \theta)$$ 的随机变量 $$X_1, \ldots, X_n$$，主要关心用 $$f(x \mid \theta)$$ 的性质描述随机变量的行为。本节实际上要把这一策略反过来：这里关心的是从给定分布 $$f(x \mid \theta)$$ ***生成***随机样本 $$X_1, \ldots, X_n$$。
**例 5.6.1（指数寿命）**
设某电子元件用 $$\mathrm{exponential}(\lambda)$$ 寿命建模。制造商想知道：在 $$c$$ 个元件中，至少 $$t$$ 个能工作 $$h$$ 小时的概率是多少？一步步来：
$$
> p_1 = P(\text{元件工作至少}\ h\ \text{小时}) = P(X \geq h \mid \lambda) \tag{5.6.1}
> $$
并假设各元件独立，可以把 $$c$$ 个元件的结果建模为伯努利试验，故
$$
> p_2 = P(\text{至少}\ t\ \text{个元件工作}\ h\ \text{小时}) = \sum_{k=t}^{c} \binom{c}{k}\, p_1^{k}\, (1 - p_1)^{c - k}. \tag{5.6.2}
> $$
虽然 (5.6.2) 的计算直截了当，但可能计算负担很重，尤其当 $$t$$ 与 $$c$$ 都很大时。此外指数模型的好处是 $$p_1$$ 可以写成闭式：
$$
> p_1 = \int_h^{\infty} \frac{1}{\lambda}\, e^{-x/\lambda}\, dx = e^{-h/\lambda}. \tag{5.6.3}
> $$
然而若每个元件改用（比如）伽马分布建模，则 $$p_1$$ 可能无法写成闭式，$$p_2$$ 的计算会更加复杂。
对 (5.6.2) 这类表达式的模拟（simulation）方法是：生成具有所需分布的随机变量，然后用大数定律（定理 5.5.2）验证模拟的有效性。即若 $$Y_i$$（$$i = 1, \ldots, n$$）是 iid，则该定理的一个推论是（假设前提成立）
$$
\frac{1}{n} \sum_{i=1}^{n} h(Y_i) \longrightarrow \mathrm{E} h(Y) \tag{5.6.4}
$$
（依概率，当 $$n \to \infty$$）。（表达式 (5.5.4) 也几乎处处成立，这是定理 5.5.9 强大数定律的推论。）
**例 5.6.2（例 5.6.1 的继续）**
概率 $$p_2$$ 可以用如下步骤计算。对 $$j = 1, \ldots, n$$：
- a. 生成 $$X_1, \ldots, X_c$$，iid $$\sim \mathrm{exponential}(\lambda)$$；
- b. 若至少 $$t$$ 个 $$X_i$$ 满足 $$X_i \geq h$$，置 $$Y_j = 1$$；否则置 $$Y_j = 0$$。
则由于 $$Y_j \sim \mathrm{Bernoulli}(p_2)$$ 且 $$\mathrm{E} Y_j = p_2$$，
$$
> \frac{1}{n} \sum_{j=1}^{n} Y_j \to p_2 \qquad \text{（当}\ n \to \infty\text{）}.
> $$
例 5.6.1 与 5.6.2 突出了本节的两大关注点：第一，必须考察如何生成所需的随机变量；第二，随后用某种大数定律验证模拟近似。
既然总得从某处开始，我们从假设能够生成 iid 均匀随机变量 $$U_1, \ldots, U_m$$ 出发。（生成均匀随机数这一问题已被计算机科学家卓有成效地研究：存在许多生成伪随机数的算法，能通过几乎所有均匀性检验；而且多数优秀的统计软件包都有合理的均匀随机数发生器。生成伪随机数的更多内容见 Devroye 1985 或 Ripley 1987。）
既然从均匀随机变量出发，我们的问题其实不是生成所需随机变量的问题，而是把均匀随机变量***变换***到所需分布的问题。本质上存在两类一般方法，我们（不带信息量地）称之为直接方法与间接方法。
### 5.6.1 直接方法（Direct Methods）
生成随机变量的直接方法是指：存在闭式函数 $$g(u)$$，使得当 $$U \sim \mathrm{uniform}(0, 1)$$ 时，变换后的变量 $$Y = g(U)$$ 具有所需分布。可以回忆，对连续随机变量这在定理 2.1.10（概率积分变换）中已经实现——任何分布都被变换到均匀。因此逆变换解决了我们的问题。
**例 5.6.3（概率积分变换）**
若 $$Y$$ 是具有 cdf $$F_Y$$ 的连续随机变量，则定理 2.1.10 蕴含随机变量 $$F_Y^{-1}(U)$$（$$U \sim \mathrm{uniform}(0, 1)$$）具有分布 $$F_Y$$。若 $$Y \sim \mathrm{exponential}(\lambda)$$，则
$$
> F_Y^{-1}(U) = -\lambda \log(1 - U)
> $$
是 $$\mathrm{exponential}(\lambda)$$ 随机变量（见习题 5.49）。
于是若生成 $$U_1, \ldots, U_n$$ 为 iid 均匀随机变量，则 $$Y_i = -\lambda \log(1 - U_i)$$（$$i = 1, \ldots, n$$）是 iid $$\mathrm{exponential}(\lambda)$$ 随机变量。例如对 $$n = 10{,}000$$，生成 $$u_1, u_2, \ldots, u_{10{,}000}$$ 并计算
$$
> \frac{1}{n} \sum_{i=1}^{n} u_i = 0.5019 \qquad\text{与}\qquad \frac{1}{n - 1} \sum_{i=1}^{n} (u_i - \bar{u})^2 = 0.0842.
> $$
由来自 WLLN（定理 5.5.2）的 (5.6.4)，我们知道 $$\bar{U} \to \mathrm{E} U = \tfrac{1}{2}$$；由例 5.5.3，$$S^2 \to \mathrm{Var} U = \tfrac{1}{12} = 0.0833$$，故我们的估计相当接近真参数。变换后的变量 $$Y_i$$ 服从 $$\mathrm{exponential}(2)$$ 分布，我们发现
$$
> \frac{1}{n} \sum_{i=1}^{n} y_i = 2.0004 \qquad\text{与}\qquad \frac{1}{n - 1} \sum_{i=1}^{n} (y_i - \bar{y})^2 = 4.0908,
> $$
与 $$\mathrm{E} Y = 2$$、$$\mathrm{Var} Y = 4$$ 非常吻合。图 5.6.1 展示了样本直方图与总体 pdf 的吻合。
![ch05_fig_5_6_1](fig/ch05_fig_5_6_1.png)
图 5.6.1　 10,000 个来自 $$\lambda = 2$$ 指数 pdf 的观测的直方图，连同 pdf（原书 Figure 5.6.1）
指数分布与其他分布的关系允许快速生成许多随机变量。例如若诸 $$U_i$$ 是 iid uniform $$(0, 1)$$ 随机变量，则
$$
\begin{aligned}
Y &= -2 \sum_{j=1}^{\nu} \log(U_j) \sim \chi^2_{\nu},\\
Y &= -\beta \sum_{j=1}^{a} \log(U_j) \sim \mathrm{gamma}(a, \beta),\\
Y &= \frac{\sum_{j=1}^{a} \log(U_j)}{\sum_{j=1}^{a + b} \log(U_j)} \sim \mathrm{beta}(a, b).
\end{aligned} \tag{5.6.5}
$$
还有许多其他变体（见习题 5.47–5.49），但它们都由“指数—均匀”变换驱动。
遗憾的是这一变换有局限。例如我们不能用它生成奇数自由度的 $$\chi^2$$ 随机变量，因而得不到 $$\chi_1^2$$，进而得不到 normal $$(0, 1)$$——一个极其有用的变量。下一小节将回到这个问题。
回忆例 5.6.3（从而 (5.6.5) 中的变换）的基础是概率积分变换，一般可写为
$$
F_Y^{-1}(u) = y \iff u = \int_{-\infty}^{y} f_y(t)\, dt. \tag{5.6.6}
$$
把该公式用于指数分布特别方便，因为积分方程有简单解（另见习题 5.59）。但许多情形 (5.6.6) 没有闭式解。于是每次生成随机变量都要求解一个积分方程，实践中可能长得令人望而却步；若用 (5.6.6) 生成 $$\chi_1^2$$ 就会如此。
当 (5.6.6) 无闭式解时，应探索其他选项：其他类型的生成方法与间接方法。作为前者的例子，考虑下例。
**例 5.6.4（Box–Muller，1958）**
生成两个独立的 uniform$(0,1)$$ 随机变量 $$U_1$$ 与 $$U_2$$，并置
>
> $$
R = \sqrt{-2 \log U_1}, \qquad \theta = 2 \pi U_2.
$$
>
> 则
>
> $$
X = R \cos \theta \qquad\text{与}\qquad Y = R \sin \theta
$$
>
> 是独立的 normal$(0, 1)$$ 随机变量。因此，尽管我们没有生成单个 $$n(0,1)$$ 随机变量的快速变换，却有生成两个变量的这样的方法。（见习题 5.50。）
遗憾的是，像例 5.6.4 这样的解并不多见；而且它们利用了特定分布的具体结构，作为一般策略适用性较差。事实证明，生成其他连续分布（除已考虑者外）多半最好通过间接方法完成。在探索这些之前，本小节最后看看 (5.6.6) 相当有用的场合——离散随机变量的情形。
若 $$Y$$ 是取值 $$y_1 < y_2 < \cdots < y_k$$ 的离散随机变量，则与 (5.6.6) 类似可写
$$
P\bigl( F_Y(y_i) \leq U < F_Y(y_{i+1}) \bigr) = F_Y(y_{i+1}) - F_Y(y_i) = P(Y = y_{i+1}). \tag{5.6.7}
$$
实施 (5.6.7) 来生成离散随机变量相当直接，可总结如下。要生成 $$Y_i \sim F_Y(y)$$：
- a. 生成 $$U \sim \mathrm{uniform}(0, 1)$$；
- b. 若 $$F_y(y_i) \leq U < F_y(y_{i+1})$$，置 $$Y = y_{i+1}$$。
我们定义 $$y_0 = -\infty$$ 且 $$F_Y(y_0) = 0$$。
**例 5.6.5（二项随机变量的生成）**
例如要生成 $$Y \sim \mathrm{binomial}\bigl( 4, \tfrac{5}{8} \bigr)$$：生成 $$U \sim \mathrm{uniform}(0, 1)$$ 并置
$$
> Y = \begin{cases}
> 0 & \text{若}\ 0 \leq U < 0.020,\\
> 1 & \text{若}\ 0.020 \leq U < 0.152,\\
> 2 & \text{若}\ 0.152 \leq U < 0.481,\\
> 3 & \text{若}\ 0.481 \leq U < 0.847,\\
> 4 & \text{若}\ 0.847 \leq U \leq 1.
> \end{cases} \tag{5.6.8}
> $$
算法 (5.6.8) 在离散随机变量的值域无限（如泊松或负二项）时也有效。虽然理论上这可能要求大量求值，实践并非如此，因为有简单聪明的加速办法：例如与其按 $$1, 2, \ldots$$ 的顺序检查每个 $$y_i$$，不如从靠近均值的 $$y_i$$ 开始检查要快得多（见 Ripley 1987, Section 3.3 与习题 5.55）。
我们将看到模拟方法学的许多用途。作为开端，考虑下面对泊松分布的探索——它是 10.1.4 节将见的参数自助法（parametric bootstrap）的一个版本。
**例 5.6.6（泊松方差的分布）**
若 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{Poisson}(\lambda)$$，则由定理 5.2.7 或 5.2.11，$$\sum X_i$$ 服从 $$\mathrm{Poisson}(n\lambda)$$，因而描述样本均值 $$\bar{X}$$ 的分布相当容易。然而描述样本方差 $$S^2 = \frac{1}{n-1} \sum (X_i - \bar{X})^2$$ 的分布却非易事。
不过 $$S^2$$ 的分布很容易模拟。例如取 $$n = 5$$，从 $$\mathrm{Poisson}(\lambda)$$ 分布生成 1,000 个容量为 5 的样本；图 5.6.2 展示了这些样本的直方图。而且模拟样本还可用于计算关于 $$S^2$$ 的概率：若 $$S_i^2$$ 是从第 $$i$$ 个模拟样本算出的值，则当 $$M \to \infty$$ 时
$$
> \frac{1}{M} \sum_{i=1}^{M} I\bigl( S_i^2 \geq a \bigr) \to P_{\lambda}\bigl( S^2 \geq a \bigr).
> $$
为演示这类方法学的用途，考虑 1984 年 8 月下旬取自哈德逊河的鲥鱼幼体计数样本：
$$
> 19,\ 32,\ 29,\ 13,\ 8,\ 12,\ 16,\ 20,\ 14,\ 17,\ 22,\ 18,\ 23. \tag{5.6.9}
> $$
若假设幼体在河中随机均匀分布，则定尺寸渔网收集的数目应服从泊松分布。这一论证来自泊松公设的空间版本（见第 2 章杂记）。为检验这一假设是否站得住，可以检查观测数据的均值与方差是否与泊松假设一致。
对 (5.6.9) 的数据，$$\bar{x} = 18.69$$，$$s^2 = 44.90$$。泊松假设下我们预期这两个值相同；当然由于抽样变异性它们不会恰好相同，可以用模拟了解预期的情况。图 5.6.2 中我们从 $$\lambda = 18.69$$ 的泊松分布模拟了 5,000 个 $$n = 13$$ 的样本，并构造了 $$S^2$$ 的相对频率直方图。注意观测值 $$S^2 = 44.90$$ 落在分布的尾部：由于 5,000 个 $$S^2$$ 值中有 27 个大于 44.90，可以估计
$$
> P\bigl( S^2 > 44.90 \mid \lambda = 18.69 \bigr) = \frac{1}{5000} \sum_{i=1}^{5000} I\bigl( S_i^2 > 44.90 \bigr) = \frac{27}{5000} = 0.0054,
> $$
这使我们质疑泊松假设；见习题 5.54。（这一发现催生了极其拙劣的双语双关语：“哈德逊河有点不对劲——泊松失灵了。”）
![ch05_fig_5_6_2](fig/ch05_fig_5_6_2.png)
图 5.6.2　 来自 $$\lambda = 18.69$$ 泊松分布的 5,000 个容量 13 样本的样本方差 $$S^2$$ 的直方图；5,000 个值的均值与标准差分别为 18.86 与 7.68（原书 Figure 5.6.2）
### 5.6.2 间接方法（Indirect Methods）
当找不到容易的直接变换来生成所需随机变量时，一种极其有力的间接方法——接受/拒绝算法（Accept/Reject Algorithm）——常能提供解决方案。
接受/拒绝算法背后的想法，也许最好通过一个简单例子解释。
**例 5.6.7（贝塔随机变量的生成——I）**
假设目标是生成 $$Y \sim \mathrm{beta}(a, b)$$。若 $$a$$ 与 $$b$$ 都是整数，可用直接变换法 (5.6.5)；但若 $$a$$、$$b$$ 不是整数，该方法失效。为具体起见，设 $$a = 2.7$$、$$b = 6.3$$。图 5.6.3 中我们把贝塔密度 $$f_Y(y)$$ 放进一个边长为 1 与 $$c \geq \max_y f_Y(y)$$ 的方框。现考虑如下计算 $$P(Y \leq y)$$ 的方法：若 $$(U, V)$$ 是独立的 uniform $$(0,1)$$ 随机变量，则阴影区域的概率为
$$
> P\Biggl( V \leq y,\ U \leq \frac{1}{c}\, f_Y(V) \Biggr) = \int_0^y \int_0^{f_Y(v)/c} du\, dv = \frac{1}{c} \int_0^{y} f_Y(v)\, dv = \frac{1}{c}\, P(Y \leq y). \tag{5.6.10}
> $$
于是可以从均匀概率计算贝塔概率，这提示我们可以从均匀随机变量生成贝塔随机变量。
由 (5.6.10)，取 $$y = 1$$ 得 $$\tfrac{1}{c} = P\bigl( U < \tfrac{1}{c} f_Y(V) \bigr)$$，故
$$
> P(Y \leq y) = \frac{P\bigl( V \leq y,\ U \leq \frac{1}{c} f_Y(V) \bigr)}{P\bigl( U \leq \frac{1}{c} f_Y(V) \bigr)} = P\Biggl( V \leq y \,\Bigg\vert \, U \leq \frac{1}{c}\, f_Y(V) \Biggr), \tag{5.6.11}
> $$
这提示了下面的算法：
要生成 $$Y \sim \mathrm{beta}(a, b)$$：
- a. 生成独立的 $$(U, V) \sim \mathrm{uniform}(0, 1)$$；
- b. 若 $$U < \frac{1}{c}\, f_Y(V)$$，置 $$Y = V$$；否则回到步骤 a。
只要 $$c \geq \max_y f_Y(y)$$，该算法就生成 $$\mathrm{beta}(a, b)$$ 随机变量；事实上可以推广到任何支撑有界的密度（习题 5.59 与 5.60）。
![ch05_fig_5_6_3](fig/ch05_fig_5_6_3.png)
图 5.6.3　 $$a = 2.7$$、$$b = 6.3$$ 的贝塔分布，$$c = \max_y f_Y(y) = 2.669$$；均匀随机变量 $$V$$ 给出横坐标，用 $$U$$ 检验是否在密度之下（原书 Figure 5.6.3）
显然 $$c$$ 的最优选择是 $$c = \max_y f_Y(y)$$。原因在于：该算法是开放式的——我们不知道得到一个 $$Y$$ 变量需要多少对 $$(U, V)$$。定义
$$
N = \text{得到一个}\ Y\ \text{所需的}\ (U, V)\ \text{对数} \tag{5.6.12}
$$
并回忆 $$\tfrac{1}{c} = P\bigl( U \leq \tfrac{1}{c} f_Y(V) \bigr)$$，则
$$
P(N = 1) = \frac{1}{c}, \qquad P(N = 2) = \frac{1}{c}\, \Bigl( 1 - \frac{1}{c} \Bigr), \qquad \ldots
$$
故 $$N$$ 是几何随机变量。于是生成一个 $$Y$$ 平均需要 $$\mathrm{E}(N) = c$$ 对 $$(U, V)$$；在此意义上，最小化 $$c$$ 即优化算法。
考察图 5.6.3 可见，算法在 $$U > \tfrac{1}{c} f_Y(V)$$ 的区域是浪费的，因为我们用均匀随机变量（$$V$$）去获得贝塔随机变量（$$Y$$）。为改进，可以从更接近贝塔的东西出发。
算法的检验步骤（步骤 b）可视为检验随机变量 $$V$$ 是否“看起来像”可能来自密度 $$f_Y$$。设 $$V \sim f_V$$，并计算
$$
M = \sup_y \frac{f_Y(y)}{f_V(y)} < \infty.
$$
步骤 (b) 的推广是把 $$U \sim \mathrm{uniform}(0, 1)$$ 与 $$\frac{1}{M}\, \frac{f_Y(V)}{f_V(V)}$$ 比较：该比值越大，$$V$$ 就越“看起来像”来自密度 $$f_Y$$，$$U < \frac{1}{M}\, \frac{f_Y(V)}{f_V(V)}$$ 的可能性越大。这是一般接受/拒绝算法的基础。
### 5.6.3 接受/拒绝算法（The Accept/Reject Algorithm）
**定理 5.6.8（接受/拒绝算法）**
设 $$Y \sim f_Y(y)$$，$$V \sim f_V(v)$$，$$f_Y$$ 与 $$f_V$$ 有公共支撑，且
$$
> M = \sup_y \frac{f_Y(y)}{f_V(y)} < \infty.
> $$
要生成随机变量 $$Y \sim f_Y$$：
- a. 生成独立的 $$U \sim \mathrm{uniform}(0, 1)$$，$$V \sim f_V$$；
- b. 若 $$U < \frac{1}{M}\, \frac{f_Y(V)}{f_V(V)}$$，置 $$Y = V$$；否则回到步骤 1。
**证明**　生成的随机变量 $$Y$$ 的 cdf 为
$$
> P(Y \leq y) = P(V \leq y \mid \text{停止}) = P\Biggl( V \leq y \,\Bigg\vert \, U < \frac{1}{M}\, \frac{f_Y(V)}{f_V(V)} \Biggr) = \frac{P\bigl( V \leq y,\ U < \frac{1}{M}\, \frac{f_Y(V)}{f_V(V)} \bigr)}{P\bigl( U < \frac{1}{M}\, \frac{f_Y(V)}{f_V(V)} \bigr)}
> $$
$$
> = \frac{\displaystyle\int_{-\infty}^{y} \int_0^{\frac{1}{M}\, \frac{f_Y(v)}{f_V(v)}}\, du\, f_V(v)\, dv}{\displaystyle\int_{-\infty}^{\infty} \int_0^{\frac{1}{M}\, \frac{f_Y(v)}{f_V(v)}}\, du\, f_V(v)\, dv} = \int_{-\infty}^{y} f_Y(v)\, dv,
> $$
这正是所需的 cdf。 ∎
另注意
$$
M = \sup_y\, \frac{f_Y(y)}{f_V(y)} = \Bigl[ P\Bigl( U < \frac{1}{M}\, \frac{f_Y(V)}{f_V(V)} \Bigr) \Bigr]^{-1} = \frac{1}{P(\text{停止})},
$$
故生成一个 $$Y$$ 所需的试验次数是 geometric$(1/M)$$ 随机变量，$$M$$ 是期望试验次数。

> **例 5.6.9（贝塔随机变量的生成——II）**
>
> 要生成 $$Y \sim \mathrm{beta}(2.7, 6.3)$$，考虑算法：
>
> - a. 生成 $$U \sim \mathrm{uniform}(0,1)$$，$$V \sim \mathrm{beta}(2, 6)$$；
>
> - b. 若 $$U < \frac{1}{M}\, \frac{f_Y(V)}{f_V(V)}$$，置 $$Y = V$$；否则回到步骤 1。
>
>
> 只要 $$\sup_y f_Y(y)/f_V(y) \leq M < \infty$$，这个接受/拒绝算法就会生成所需的 $$Y$$。对给定的密度有 $$M = 1.67$$，条件满足（见习题 5.63）。
>
> 该算法的 $$\mathrm{E} N = 1.67$$，而例 5.6.7 中使用均匀 $$V$$ 的算法有 $$\mathrm{E} N = 2.67$$。虽然这看似表明后者更快，但要记住生成一个 $$\mathrm{beta}(2, 6)$$ 随机变量需要八个均匀随机数。因此算法的比较并不总是直截了当的，须同时考虑计算机速度与编程便利。

$$M < \infty$$ 这一要求的重要性必须强调。它可以解释为要求 $$V$$ 的密度（常称候选密度，candidate density）比 $$Y$$ 的密度（常称目标密度，target density）有更重的尾部。这一要求有助于保证我们获得对 $$Y$$ 取值——包括尾部取值——的良好表现。例如若 $$V \sim \mathrm{Cauchy}$$ 而 $$Y \sim n(0, 1)$$，则我们预期 $$V$$ 样本的范围比 $$Y$$ 样本的范围宽，基于这两个密度的接受/拒绝算法应有良好表现；然而把 $$n(0,1)$$ 随机变量改造成柯西随机变量就困难得多，因为极端值会被欠代表。

但也存在目标密度尾部很重、难以找到使 $$M$$ 有限的候选密度的情形。此时接受/拒绝算法不再适用，人们转向另一类方法，即马尔可夫链蒙特卡罗（Markov Chain Monte Carlo，MCMC）方法；其特例包括 Gibbs 抽样器与 Metropolis 算法。后者陈述如下：

> **Metropolis 算法**
>
> 设 $$Y \sim f_Y(y)$$，$$V \sim f_V(v)$$，$$f_Y$$ 与 $$f_V$$ 有公共支撑。要生成 $$Y \sim f_Y$$：
>
> 第 0 步：生成 $$V \sim f_V$$，置 $$Z_0 = V$$。
>
> 对 $$i = 1, 2, \ldots$$：
>
> - 1. 生成 $$U_i \sim \mathrm{uniform}(0, 1)$$，$$V_i \sim f_V$$，并计算
>
>   $$
  \rho_i = \min\Biggl\lbrace  \frac{f_Y(V_i)}{f_V(V_i)}\, \cdot\, \frac{f_V(Z_{i-1})}{f_Y(Z_{i-1})},\ 1 \Biggr \rbrace.
  $$
>
> - 2. 置
>
>   $$
  Z_i = \begin{cases} V_i & \text{若}\ U_i \leq \rho_i,\\ Z_{i-1} & \text{若}\ U_i > \rho_i. \end{cases}
  $$
>
>
> 则当 $$i \to \infty$$ 时，$$Z_i$$ 依分布收敛到 $$Y$$。

虽然该算法不要求有限的 $$M$$，它并不产生恰好具有密度 $$f_Y$$ 的随机变量，而是一个收敛序列。实践中算法运行一段时间后（$$i$$ 变大），产生的 $$Z$$ 的表现非常像来自 $$f_Y$$ 的变量。（Metropolis 算法的入门介绍见 Chib and Greenberg。）

MCMC 方法至少可追溯到 Metropolis 等 (1953)，随着 Gelfand and Smith (1990)（建立在 Geman and Geman (1984) 工作之上）的研究而声名鹊起。更多细节见杂记 5.8.5。

## 5.7 习题（Exercises）

**5.1** 色盲在某总体中出现率为 1%。要使样本含至少一名色盲者的概率达到 0.95 或以上，样本必须多大？（假设总体大到可视为无限，抽样可视为有放回。）

**5.2** 设 $$X_1, X_2, \ldots$$ 联合连续且独立，各有边缘 pdf $$f(x)$$，其中每个 $$X_i$$ 表示某地的年降雨量。(a) 求直到第一年的降雨量 $$X_1$$ 首次被超过为止的年数的分布；(b) 证明直到 $$X_1$$ 首次被超过的平均年数为无穷。

**5.3** 设 $$X_1, \ldots, X_n$$ 是具有连续 cdf $$F_X$$ 的 iid 随机变量，$$\mathrm{E} X_i = \mu$$。定义随机变量

$$
Y_i = \begin{cases} 1 & \text{若}\ X_i > \mu,\\ 0 & \text{若}\ X_i \leq \mu, \end{cases} \qquad i = 1, \ldots, n.
$$

求 $$\sum_{i=1}^{n} Y_i$$ 的分布。

**5.4** iid 随机变量的一个推广是可交换随机变量（exchangeable random variables），思想源于 De Finetti (1972)；可交换性的讨论另见 Feller (1971)。若 $$X_1, \ldots, X_n$$ 的任意 $$k$$ 个（$$k \leq n$$）的任何置换都有相同分布，则称它们是可交换的。本习题考察一组可交换但不 iid 的随机变量：设 $$X_i \mid P \sim$$ iid $$\mathrm{Bernoulli}(P)$$（$$i = 1, \ldots, n$$），$$P \sim \mathrm{uniform}(0, 1)$$。(a) 证明任意 $$k$$ 个 $$X$$ 的边缘分布都相同：

$$
P\bigl( X_1 = x_1, \ldots, X_k = x_k \bigr) = \int_0^1 p^{t} (1 - p)^{k - t}\, dp = \frac{t!\, (k - t)!}{(k + 1)!},
$$

其中 $$t = \sum_{i=1}^{k} x_i$$。故诸 $$X$$ 可交换。(b) 证明边缘上 $$P\bigl( X_1 = x_1, \ldots, X_n = x_n \bigr) \neq \prod_{i=1}^{n} P\bigl( X_i = x_i \bigr)$$，故诸 $$X$$ 的分布可交换但不 iid。（De Finetti 对无穷可交换随机变量序列证明了一个优美的刻画定理：任何这样的序列都是 iid 随机变量的混合。）

**5.5** 设 $$X_1, \ldots, X_n$$ 是 iid，pdf 为 $$f_X(x)$$，$$\bar{X}$$ 为样本均值。证明 $$f_{\bar{X}}(x) = n\, f_{X_1 + \cdots + X_n}(nx)$$，即使 $$X$$ 的 mgf 不存在。

**5.6** 若 $$X$$ 有 pdf $$f_X(x)$$，$$Y$$（与 $$X$$ 独立）有 pdf $$f_Y(y)$$，对下列各情形建立与 (5.2.3) 类似的 $$Z$$ 的公式：(a) $$Z = X - Y$$；　　 (b) $$Z = XY$$；　　 (c) $$Z = X/Y$$。

**5.7** 例 5.2.10 中需要部分分式分解来导出两个独立柯西随机变量之和的分布。本习题补足该例跳过的细节。(a) 求满足

$$
\frac{1}{1 + (w/\sigma)^2}\, \frac{1}{1 + ((z - w)/\tau)^2} = \frac{Aw}{1 + (w/\sigma)^2} + \frac{B}{1 + (w/\sigma)^2} - \frac{Cw}{1 + ((z - w)/\tau)^2} - \frac{D}{1 + ((z - w)/\tau)^2}
$$

的常数 $$A, B, C, D$$（它们可依赖 $$z$$ 但不依赖 $$w$$）；(b) 利用 $$\int \frac{t}{1 + t^2}\, dt = \frac{1}{2} \log(1 + t^2) + C$$ 与 $$\int \frac{1}{1 + t^2}\, dt = \arctan(t) + C$$，求值 (5.2.4) 从而验证 (5.2.5)。（(b) 的积分相当精细：柯西的均值不存在，积分 $$\int_{-\infty}^{\infty} \frac{Aw}{1 + (w/\sigma)^2}\, dw$$ 与 $$\int_{-\infty}^{\infty} \frac{Cw}{1 + ((z-w)/\tau)^2}\, dw$$ 都不存在；但差的积分存在，这正是所需的。）

**5.8** 设 $$X_1, \ldots, X_n$$ 是一个随机样本，$$\bar{X}$$ 与 $$S^2$$ 按通常方式计算。(a) 证明

$$
S^2 = \frac{1}{2n (n - 1)} \sum_{i=1}^{n} \sum_{j=1}^{n} \bigl( X_i - X_j \bigr)^2.
$$

现设诸 $$X_i$$ 有有限四阶矩，记 $$\theta_1 = \mathrm{E} X_i$$，$$\theta_j = \mathrm{E} (X_i - \theta_1)^j$$（$$j = 2, 3, 4$$）。(b) 证明 $$\mathrm{Var} S^2 = \frac{1}{n}\, \bigl( \theta_4 - \frac{n - 3}{n - 1}\, \theta_2^2 \bigr)$$；(c) 用 $$\theta_1, \ldots, \theta_4$$ 表示 $$\mathrm{Cov}(\bar{X}, S^2)$$。在什么条件下 $$\mathrm{Cov}(\bar{X}, S^2) = 0$$？

**5.9** 建立拉格朗日恒等式（Lagrange Identity）：对任意数 $$a_1, \ldots, a_n$$ 与 $$b_1, \ldots, b_n$$，

$$
\Bigl( \sum_{i=1}^{n} a_i^2 \Bigr) \Bigl( \sum_{i=1}^{n} b_i^2 \Bigr) - \Bigl( \sum_{i=1}^{n} a_i b_i \Bigr)^2 = \sum_{i=1}^{n} \sum_{j=i+1}^{n} \bigl( a_i b_j - a_j b_i \bigr)^2.
$$

用该恒等式证明：相关系数等于 1 当且仅当全部样本点位于一条直线上（Wright 1992）。提示：对 $$n = 2$$ 建立恒等式再归纳。

**5.10** 设 $$X_1, \ldots, X_n$$ 是来自 $$n(\mu, \sigma^2)$$ 总体的随机样本。(a) 用 $$\mu$$ 与 $$\sigma^2$$ 表示习题 5.8 定义的 $$\theta_1, \ldots, \theta_4$$；(b) 用习题 5.8 与 (a) 的结果计算 $$\mathrm{Var} S^2$$；(c) 用完全不同（且更容易）的方法计算 $$\mathrm{Var} S^2$$：利用 $$(n - 1) S^2 / \sigma^2 \sim \chi_{n-1}^2$$。

**5.11** 设 $$\bar{X}$$ 与 $$S^2$$ 由来自方差 $$\sigma^2$$ 有限的 总体的随机样本 $$X_1, \ldots, X_n$$ 算得。已知 $$\mathrm{E} S^2 = \sigma^2$$。证明 $$\mathrm{E} S \leq \sigma$$；且若 $$\sigma^2 > 0$$ 则 $$\mathrm{E} S < \sigma$$。

**5.12** 设 $$X_1, \ldots, X_n$$ 是来自 $$n(0, 1)$$ 总体的随机样本。定义

$$
Y_1 = \Bigl\vert  \frac{1}{n} \sum_{i=1}^{n} X_i \Bigr\vert , \qquad Y_2 = \frac{1}{n} \sum_{i=1}^{n} \vert X_i\vert .
$$

计算 $$\mathrm{E} Y_1$$ 与 $$\mathrm{E} Y_2$$，并建立两者之间的不等式。

**5.13** 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\mu, \sigma^2)$$。求样本方差 $$S^2$$ 的函数 $$g(S^2)$$ 使 $$\mathrm{E} g(S^2) = \sigma$$。（提示：试 $$g(S^2) = c\, \sqrt{S^2}$$，$$c$$ 为常数。）

**5.14** (a) 证明引理 5.3.3 的陈述可由 $$\mu_i = 0$$、$$\sigma_i^2 = 1$$ 的特例推出：即证明若

$$
\mathrm{Cov}\Bigl( \sum_{j=1}^{n} a_{ij}\, Z_j,\ \sum_{j=1}^{n} b_{rj}\, Z_j \Bigr) = 0 \Rightarrow \sum_{j=1}^{n} a_{ij}\, Z_j\ \text{与}\ \sum_{j=1}^{n} b_{rj}\, Z_j\ \text{独立}
$$

（$$X_j = \sigma_j Z_j + \mu_j$$，$$Z_j \sim n(0,1)$$，$$j = 1, \ldots, n$$ 独立，$$a_{ij}, b_{rj}$$ 为常数）成立，则

$$
\mathrm{Cov}\Bigl( \sum_{j=1}^{n} a_{ij}\, X_j,\ \sum_{j=1}^{n} b_{rj}\, X_j \Bigr) = 0 \Rightarrow \sum_{j=1}^{n} a_{ij}\, X_j\ \text{与}\ \sum_{j=1}^{n} b_{rj}\, X_j\ \text{独立}.
$$

(b) 验证引理 5.3.3 中 $$\mathrm{Cov}\bigl( \sum_{j=1}^{n} a_{ij} X_j,\ \sum_{j=1}^{n} b_{rj} X_j \bigr)$$ 的表达式。

**5.15** 建立均值与方差的下列递推关系。设 $$\bar{X}_n$$ 与 $$S_n^2$$ 分别是 $$X_1, \ldots, X_n$$ 的均值与方差。再获得一个观测 $$X_{n+1}$$，证明：(a) $$\bar{X}_{n+1} = \dfrac{X_{n+1} + n\, \bar{X}_n}{n + 1}$$；(b) $$n\, S_{n+1}^2 = (n - 1)\, S_n^2 + \Bigl( 1 + \dfrac{1}{n} \Bigr) (X_{n+1} - \bar{X}_n)^2$$。

**5.16** 设 $$X_i$$（$$i = 1, 2, 3$$）独立，服从 $$n(i, i^2)$$ 分布。对下列每种情形，用诸 $$X_i$$ 构造具有所示分布的统计量：(a) 自由度 3 的卡方；(b) 自由度 2 的 $$t$$ 分布；(c) 自由度 1 与 2 的 $$F$$ 分布。

**5.17** 设 $$X$$ 是服从 $$F_{p,q}$$ 分布的随机变量。(a) 导出 $$X$$ 的 pdf；(b) 导出 $$X$$ 的均值与方差；(c) 证明 $$1/X$$ 服从 $$F_{q,p}$$；(d) 证明 $$\frac{(p/q) X}{1 + (p/q) X}$$ 服从参数 $$p/2$$ 与 $$q/2$$ 的贝塔分布。

**5.18** 设 $$X$$ 是自由度为 $$p$$ 的 Student 氏 $$t$$ 随机变量。(a) 导出 $$X$$ 的均值与方差；(b) 证明 $$X^2$$ 服从自由度 1 与 $$p$$ 的 $$F$$ 分布；(c) 设 $$f(x \mid p)$$ 表示 $$X$$ 的 pdf，证明对每个 $$x \in (-\infty, \infty)$$，

$$
\lim_{p \to \infty} f(x \mid p) \to \frac{1}{\sqrt{2\pi}}\, e^{-x^2/2},
$$

这恰当地暗示：当 $$p \to \infty$$ 时 $$X$$ 依分布收敛到 $$n(0, 1)$$ 随机变量。（提示：用斯特林公式。）(d) 用 (a) 与 (b) 的结果论证：当 $$p \to \infty$$ 时 $$X^2$$ 依分布收敛到 $$\chi_1^2$$；(e) 关于当 $$p \to \infty$$ 时 $$q\, F_{q,p}$$ 的分布极限，你能猜想什么？

**5.19** (a) 证明 $$\chi^2$$ 分布关于其自由度随机递增：若 $$p > q$$，则对任意 $$a$$ 有 $$P(\chi_p^2 > a) \geq P(\chi_q^2 > a)$$，且对某些 $$a$$ 严格不等。(b) 用 (a) 证明：对任意 $$\nu$$，$$k\, F_{k,\nu}$$ 关于 $$k$$ 随机递增。(c) 证明对任意 $$k$$、$$\nu$$、$$\alpha$$ 有 $$k\, F_{\alpha, k, \nu} > (k - 1)\, F_{\alpha, k - 1, \nu}$$。（记号 $$F_{\alpha, k-1, \nu}$$ 表示水平 $$\alpha$$ 的临界点；见 8.3.1 节，另见杂记 8.5.1 与习题 11.15。）

**5.20** (a) 可以用如下论证看到 $$t$$ 分布是正态的混合：

$$
P\bigl( T_{\nu} \leq t \bigr) = P\Biggl( \frac{Z}{\sqrt{\chi_{\nu}^2 / \nu}} \leq t \Biggr) = \int_0^{\infty} P\Bigl( Z \leq t\, \sqrt{x / \nu} \Bigr)\, P\bigl( \chi_{\nu}^2 = x \bigr)\, dx,
$$

其中 $$T_\nu$$ 是自由度 $$\nu$$ 的 $$t$$ 随机变量。用微积分基本定理、并把 $$P(\chi_\nu^2 = \nu x)$$ 解释为 pdf，得

$$
f_{T_{\nu}}(t) = \int_0^{\infty} \frac{1}{\sqrt{2\pi}}\, e^{-t^2 x/2\nu}\, \sqrt{\frac{x}{\nu}}\, \frac{1}{\Gamma(\nu/2)\, 2^{\nu/2}}\, x^{(\nu/2) - 1}\, e^{-x/2}\, dx,
$$

这是正态的尺度混合。通过直接积分验证该公式。(b) 类似公式对 $$F$$ 分布也成立，即它可以写成卡方的混合。若 $$F_{1,\nu}$$ 是自由度 1 与 $$\nu$$ 的 $$F$$ 随机变量，则

$$
P\bigl( F_{1,\nu} \leq \nu t \bigr) = \int_0^{\infty} P\bigl( \chi_1^2 \leq t y \bigr)\, f_{\nu}(y)\, dy,
$$

其中 $$f_\nu(y)$$ 是 $$\chi_\nu^2$$ 的 pdf。用微积分基本定理得到 $$F_{1,\nu}$$ pdf 的积分表达式，并证明该积分等于 pdf。(c) 验证 (b) 的推广

$$
P\Bigl( F_{m,\nu} \leq \frac{\nu}{m}\, t \Bigr) = \int_0^{\infty} P\bigl( \chi_m^2 \leq t y \bigr)\, f_{\nu}(y)\, dy
$$

对一切整数 $$m > 1$$ 成立。

**5.21** 两个连续 iid 随机变量中较大者超过总体中位数的概率是多少？把结果推广到容量 $$n$$ 的样本。

**5.22** 设 $$X$$ 与 $$Y$$ 是 iid $$n(0, 1)$$ 随机变量，定义 $$Z = \min(X, Y)$$。证明 $$Z^2 \sim \chi_1^2$$。

**5.23** 设 $$U_i$$（$$i = 1, 2, \ldots$$）是独立的 uniform$(0, 1)$$ 随机变量，$$X$$ 的分布为
$$
P(X = x) = \frac{c}{x!}, \qquad x = 1, 2, 3, \ldots
$$
其中 $$c = 1/(e - 1)$$。求
$$
Z = \min\{U_1, \ldots, U_X\}
$$
的分布。（提示：注意 $$Z \mid X = x$$ 的分布是容量 $$x$$ 样本的第一（最小）次序统计量的分布。）
**5.24** 设 $$X_1, \ldots, X_n$$ 是来自 pdf 为
$$
f_X(x) = \begin{cases} 1/\theta & \text{若}\ 0 < x < \theta,\\ 0 & \text{其他} \end{cases}
$$
的总体的随机样本。设 $$X_{(1)} < \cdots < X_{(n)}$$ 为次序统计量。证明 $$X_{(1)}/X_{(n)}$$ 与 $$X_{(n)}$$ 独立。
**5.25** 作为上题的推广，设 $$X_1, \ldots, X_n$$ 是 iid，pdf 为
$$
f_X(x) = \begin{cases} \dfrac{a}{\theta^a}\, x^{a - 1} & \text{若}\ 0 < x < \theta,\\[4pt] 0 & \text{其他}. \end{cases}
$$
设 $$X_{(1)} < \cdots < X_{(n)}$$ 为次序统计量。证明 $$X_{(1)}/X_{(2)},\ X_{(2)}/X_{(3)},\ \ldots,\ X_{(n-1)}/X_{(n)}$$ 与 $$X_{(n)}$$ 相互独立，并求各自的分布。
**5.26** 完成定理 5.4.6 的证明。(a) 设 $$U$$ 为计 $$X_1, \ldots, X_n$$ 中小于等于 $$u$$ 的个数的随机变量，$$V$$ 为计大于 $$u$$ 且小于等于 $$v$$ 的个数的随机变量。证明 $$(U, V, n - U - V)$$ 是 $$n$$ 次试验、格子概率 $$\bigl( F_X(u),\ F_X(v) - F_X(u),\ 1 - F_X(v) \bigr)$$ 的多项随机向量。(b) 证明 $$X_{(i)}$$ 与 $$X_{(j)}$$ 的联合 cdf 可表示为
$$
\begin{aligned}
F_{X_{(i)}, X_{(j)}}(u, v) &= P\bigl( U \geq i,\ U + V \geq j \bigr)\\
&= \sum_{k=i}^{j-1} \sum_{m=j-k}^{n-k} P(U = k, V = m) + P(U \geq j)\\
&= \sum_{k=i}^{j-1} \sum_{m=j-k}^{n-k} \frac{n!}{k!\, m!\, (n - k - m)!}\, [F_X(u)]^{k}\, [F_X(v) - F_X(u)]^{m}\, [1 - F_X(v)]^{n - k - m} + P(U \geq j).
\end{aligned}
$$
(c) 按 (4.1.3) 计算混合偏导数求联合 pdf。（$$P(U \geq j)$$ 的混合偏导为 0，因为该项只依赖 $$u$$ 不依赖 $$v$$；对其余项，利用 (5.4.5) 一类的关系有大量相消。）
**5.27** 设 $$X_1, \ldots, X_n$$ 是 iid，pdf 为 $$f_X(x)$$、cdf 为 $$F_X(x)$$，$$X_{(1)} < \cdots < X_{(n)}$$ 为次序统计量。(a) 用 $$f_X$$ 与 $$F_X$$ 表示 $$X_{(i)}$$ 在给定 $$X_{(j)}$$ 时的条件 pdf 的表达式；(b) 求 $$V \mid R = r$$ 的 pdf，其中 $$V$$ 与 $$R$$ 在例 5.4.7 中定义。
**5.28** 设 $$X_1, \ldots, X_n$$ 是 iid，pdf 为 $$f_X(x)$$、cdf 为 $$F_X(x)$$，$$X_{(i_1)} < \cdots < X_{(i_l)}$$ 与 $$X_{(j_1)} < \cdots < X_{(j_m)}$$ 是任意两组不相交的次序统计量。用 $$f_X(x)$$ 与 $$F_X(x)$$ 给出下列各量的表达式：(a) $$X_{(i_1)}, \ldots, X_{(i_l)}$$ 的边缘 cdf 与 pdf；(b) $$X_{(i_1)}, \ldots, X_{(i_l)}$$ 在给定 $$X_{(j_1)}, \ldots, X_{(j_m)}$$ 时的条件 cdf 与 pdf。
**5.29** 某小册子制造商把它们按每箱 100 本包装。已知小册子平均重 1 盎司，标准差 0.05 盎司。制造商要计算
$$
P(\text{100 本小册子重超过 100.4 盎司})，
$$
该数值有助于发现装箱是否过满。解释如何计算该概率的（近似？）值，并说明所用的相关定理或假设。
**5.30** 若 $$\bar{X}_1$$ 与 $$\bar{X}_2$$ 是来自方差为 $$\sigma^2$$ 的总体的两个容量为 $$n$$ 的独立样本的均值，求 $$n$$ 使 $$P\bigl( \vert \bar{X}_1 - \bar{X}_2\vert  < \sigma/5 \bigr) \approx 0.99$$。论证你的计算。
**5.31** 设 $$\bar{X}$$ 是来自均值 $$\mu$$、方差 $$\sigma^2 = 9$$ 的总体的 100 个观测的均值。求使 $$\bar{X} - \mu$$ 以至少 0.90 的概率落入其中的界限。分别用切比雪夫不等式与中心极限定理，并评论各自的结果。
**5.32** 设 $$X_1, X_2, \ldots$$ 是依概率收敛到常数 $$a$$ 的随机变量序列，且 $$P(X_i > 0) = 1$$（对一切 $$i$$）。(a) 验证由 $$Y_i = \sqrt{X_i}$$ 与 $$Y_i' = a / X_i$$ 定义的序列依概率收敛；(b) 用 (a) 的结果证明例 5.5.18 所用的事实：$$\sigma / S_n$$ 依概率收敛到 1。
**5.33** 设 $$X_n$$ 是依分布收敛到随机变量 $$X$$ 的随机变量序列，$$Y_n$$ 是满足“对任意有限数 $$c$$，$$\lim_{n \to \infty} P(Y_n > c) = 1$$”的随机变量序列。证明对任意有限数 $$c$$，
$$
\lim_{n \to \infty} P(X_n + Y_n > c) = 1.
$$
（这是 10.3.2 节检验的功效性质讨论中所用的一类结果。）
**5.34** 设 $$X_1, \ldots, X_n$$ 是来自均值 $$\mu$$、方差 $$\sigma^2$$ 的总体的随机样本。证明
$$
\mathrm{E}\Biggl( \frac{\sqrt{n}\, (\bar{X}_n - \mu)}{\sigma} \Biggr) = 0 \qquad\text{与}\qquad \mathrm{Var}\Biggl( \frac{\sqrt{n}\, (\bar{X}_n - \mu)}{\sigma} \Biggr) = 1.
$$
即中心极限定理中 $$\bar{X}_n$$ 的标准化给出与极限 $$n(0,1)$$ 分布具有相同均值与方差的随机变量。
**5.35** 斯特林公式（习题 1.28 导出）给出了阶乘的近似，用 CLT 可以轻松导出它。(a) 论证：若 $$X_i \sim \mathrm{exponential}(1)$$（$$i = 1, 2, \ldots$$）独立，则对每个 $$x$$，
$$
P\Biggl( \frac{\bar{X}_n - 1}{1/\sqrt{n}} \leq x \Biggr) \to P(Z \leq x),
$$
其中 $$Z$$ 是标准正态随机变量。(b) 证明：对 (a) 中的近似两边求导，提示
$$
\frac{\sqrt{n}}{\Gamma(n)}\, \bigl( x \sqrt{n} + n \bigr)^{n - 1}\, e^{-(x \sqrt{n} + n)} \approx \frac{1}{\sqrt{2\pi}}\, e^{-x^2/2},
$$
且取 $$x = 0$$ 即得斯特林公式。
**5.36** 已知 $$N = n$$ 时 $$Y$$ 的条件分布为 $$\chi_n^2$$，$$N$$ 的无条件分布为 $$\mathrm{Poisson}(\theta)$$。(a) 计算 $$\mathrm{E} Y$$ 与 $$\mathrm{Var} Y$$（无条件矩）；(b) 证明当 $$\theta \to \infty$$ 时 $$(Y - \mathrm{E} Y)/\sqrt{\mathrm{Var} Y} \xrightarrow{d} n(0, 1)$$。
**5.37** 例 5.5.16 给出了负二项分布的正态近似。正如例 3.3.2 对二项分布的正态近似，该近似可以用“连续性校正”改进。设 $$X_i$$ 如例 5.5.16 所定义，令 $$V_n = \sum_{i=1}^{n} X_i$$。对 $$n = 10$$、$$p = 0.7$$、$$r = 2$$，用下列三种方法分别计算 $$P(V_n = v)$$（$$v = 0, 1, \ldots, 10$$）：(a) 精确计算；(b) 例 5.5.16 所给的正态近似；(c) 带连续性校正的正态近似。
**5.38** 习题 3.45 中所建立不等式的下列推广，可用于建立 SLLN（见杂记 5.8.4）。设 $$X_1, \ldots, X_n$$ 是 iid，mgf 为 $$M_X(t)$$（$$-h < t < h$$），$$S_n = \sum_{i=1}^{n} X_i$$，$$\bar{X}_n = S_n / n$$。(a) 证明：对 $$0 < t < h$$，$$P(S_n > a) \leq e^{-at}\, [M_X(t)]^{n}$$；对 $$-h < t < 0$$，$$P(S_n \leq a) \leq e^{-at}\, [M_X(t)]^{n}$$。(b) 用 $$M_X(0) = 1$$ 与 $$M_X'(0) = \mathrm{E} X$$ 证明：若 $$\mathrm{E} X < 0$$，则存在 $$0 < c < 1$$ 使 $$P(S_n > a) \leq c^{n}$$。对 $$P(S_n \leq a)$$ 建立类似界。(c) 定义 $$Y_i = X_i - \mu - \varepsilon$$ 并用上述论证（取 $$a = 0$$）建立 $$P(\bar{X}_n - \mu > \varepsilon) \leq c^{n}$$。(d) 再定义 $$Y_i = -X_i + \mu - \varepsilon$$，建立与 (c) 类似的不等式，把两者结合得
$$
P\bigl( \vert \bar{X}_n - \mu\vert  > \varepsilon \bigr) \leq 2 c^{n} \qquad \text{（某}\ 0 < c < 1\text{）}.
$$
**5.39** 本习题及接下来两题考察收敛的若干数学细节。(a) 证明定理 5.5.4。（提示：由于 $$h$$ 连续，给定 $$\varepsilon > 0$$ 可找到 $$\delta$$ 使 $$\vert x_n - x\vert  < \delta$$ 时 $$\vert h(x_n) - h(x)\vert  < \varepsilon$$。把这一事实翻译成概率陈述。）(b) 在例 5.5.8 中，找出几乎必然收敛（即点态收敛）的 $$Y_i$$ 子序列。
**5.40** 对 $$X_n$$ 与 $$X$$ 为连续随机变量的情形证明定理 5.5.12。(a) 给定 $$t$$ 与 $$\varepsilon$$，证明 $$P(X \leq t - \varepsilon) \leq P(X_n \leq t) + P(\vert X_n - X\vert  \geq \varepsilon)$$；这给出 $$P(X_n \leq t)$$ 的下界；(b) 用类似策略得 $$P(X_n \leq t)$$ 的上界；(c) 通过夹逼，推出 $$P(X_n \leq t) \to P(X \leq t)$$。
**5.41** 证明定理 5.5.13，即证明
$$
P\bigl( \vert X_n - \mu\vert  > \varepsilon \bigr) \to 0\ \text{（对每个}\ \varepsilon\text{）} \iff P(X_n \leq x) \to \begin{cases} 0 & \text{若}\ x < \mu,\\ 1 & \text{若}\ x \geq \mu. \end{cases}
$$
(a) 置 $$\varepsilon = \vert x - \mu\vert $$：若 $$x > \mu$$ 则 $$P(X_n \leq x) \geq P(\vert X_n - \mu\vert  \leq \varepsilon)$$；若 $$x < \mu$$ 则 $$P(X_n \leq x) \leq P(\vert X_n - \mu\vert  \geq \varepsilon)$$。推出 $$\Rightarrow$$ 方向。(b) 用 $$\{x : \vert x - \mu\vert  > \varepsilon\} = \{x : x - \mu < -\varepsilon\} \cup \{x : x - \mu > \varepsilon\}$$ 推出 $$\Leftarrow$$ 方向。（上述结果的详细处理见 Billingsley 1995, Section 25。）
**5.42** 类似例 5.5.11，设 $$X_1, X_2, \ldots$$ 是 iid $$f$$，$$X_{(n)} = \max_{1 \leq i \leq n} X_i$$。(a) 若 $$f$$ 是 $$\mathrm{beta}(1, \beta)$$，求使 $$n^{\nu}\, (1 - X_{(n)})$$ 依分布收敛的 $$\nu$$ 值；(b) 若 $$f$$ 是 $$\mathrm{exponential}(1)$$，求使 $$X_{(n)} - a_n$$ 依分布收敛的序列 $$a_n$$。
**5.43** 补足定理 5.5.24 证明的细节。(a) 证明若 $$\sqrt{n}\, (Y_n - \mu) \xrightarrow{d} n(0, \sigma^2)$$，则 $$Y_n \xrightarrow{P} \mu$$；(b) 给出斯卢茨基定理（定理 5.5.17）应用的细节。
**5.44** 设 $$X_i$$（$$i = 1, 2, \ldots$$）是独立的 $$\mathrm{Bernoulli}(p)$$ 随机变量，$$Y_n = \frac{1}{n} \sum_{i=1}^{n} X_i$$。(a) 证明 $$\sqrt{n}\, (Y_n - p) \xrightarrow{d} n\bigl[ 0,\ p(1 - p) \bigr]$$；(b) 证明对 $$p \neq \tfrac{1}{2}$$，方差估计 $$Y_n(1 - Y_n)$$ 满足 $$\sqrt{n}\, \bigl[ Y_n(1 - Y_n) - p(1 - p) \bigr] \xrightarrow{d} n\bigl[ 0,\ (1 - 2p)^2\, p(1 - p) \bigr]$$；(c) 证明对 $$p = \tfrac{1}{2}$$，$$n\, \Bigl[ Y_n(1 - Y_n) - \tfrac{1}{4} \Bigr] \xrightarrow{d} -\tfrac{1}{4}\, \chi_1^2$$。（若这看起来奇怪，注意 $$Y_n(1 - Y_n) \leq \tfrac{1}{4}$$，故左端恒为负。等价形式是 $$4n\, \bigl[ \tfrac{1}{4} - Y_n(1 - Y_n) \bigr] \xrightarrow{d} \chi_1^2$$。）
**5.45** 对例 5.6.1 的情形，计算至少 75% 的元件工作 150 小时的概率，当：(a) $$c = 300$$，$$X \sim \mathrm{gamma}(a, b)$$，$$a = 4$$，$$b = 5$$；(b) $$c = 100$$，$$X \sim \mathrm{gamma}(a, b)$$，$$a = 20$$，$$b = 5$$；(c) $$c = 100$$，$$X \sim \mathrm{gamma}(a, b)$$，$$a = 20.7$$，$$b = 5$$。提示：(a) 与 (b) 中伽马积分可以闭式求值，尽管 (b) 或许不值得费这个劲；(c) 的积分没有闭式表达式，须通过数值积分或模拟求值。
**5.46** 参照习题 5.45，把你的答案与二项分布正态近似所得结果比较（见例 3.3.2）。
**5.47** 验证 (5.6.5) 中各随机变量的分布。
**5.48** 用类似 (5.6.5) 的策略，说明如何生成 $$F_{m,n}$$ 随机变量（$$m$$ 与 $$n$$ 都是偶整数）。
**5.49** 设 $$U \sim \mathrm{uniform}(0, 1)$$。(a) 证明 $$-\log U$$ 与 $$-\log(1 - U)$$ 都是指数随机变量；(b) 证明 $$X = \log \dfrac{u}{1 - u}$$ 是 $$\mathrm{logistic}(0, 1)$$ 随机变量；(c) 说明如何生成 $$\mathrm{logistic}(\mu, \beta)$$ 随机变量。
**5.50** 生成正态伪随机变量的 Box–Muller 方法（例 5.6.4）基于变换
$$
X_1 = \cos(2\pi U_1)\, \sqrt{-2 \log U_2}, \qquad X_2 = \sin(2\pi U_1)\, \sqrt{-2 \log U_2},
$$
其中 $$U_1$$ 与 $$U_2$$ 是 iid uniform$(0,1)$$。证明 $$X_1$$ 与 $$X_2$$ 是独立的 $$n(0, 1)$$ 随机变量。

**5.51** 由均匀随机变量生成伪随机标准正态变量的早期方法之一（并非较好的方法）是取 $$X = \sum_{i=1}^{12} U_i - 6$$，其中诸 $$U_i$$ 是 iid uniform$(0, 1)$$。(a) 论证 $$X$$ 近似为 $$n(0, 1)$$；(b) 你能想到近似在哪些明显的地方失效吗？(c) 通过比较前四阶矩考察近似的好坏。（四阶矩是 $$29/10$$，计算冗长——mgf 与计算机代数会有帮助；见例 12.6.6。）
**5.52** 对下列每个分布写出生成所示随机变量的算法。(a) $$Y \sim \mathrm{binomial}\bigl( 8, \tfrac{2}{3} \bigr)$$；(b) $$Y \sim \mathrm{hypergeometric}(N = 10, M = 8, K = 4)$$；(c) $$Y \sim \mathrm{negative\ binomial}\bigl( 5, \tfrac{1}{3} \bigr)$$。
**5.53** 对上一题的每个分布：(a) 生成 1,000 个所示分布的随机变量；(b) 把生成随机变量的均值、方差与直方图同理论值比较。
**5.54** 参照例 5.6.6：另一批鲥鱼幼体计数样本的数据为
$$
158,\ 143,\ 106,\ 57,\ 97,\ 80,\ 109,\ 109,\ 350,\ 224,\ 109,\ 214,\ 84.
$$
(a) 用例 5.6.6 的技术构造 $$S^2$$ 的模拟分布，看泊松计数的假设是否站得住；(b) 泊松假设失效（方差增大）的一个可能解释是“幼体在河中均匀分布”这一假设失效。若幼体趋于聚块，负二项 $$\mathrm{negative\ binomial}(r, p)$$ 分布（均值 $$\mu = r\, \frac{1 - p}{p}$$，方差 $$\mu + \frac{\mu^2}{r}$$）是合理的替代模型。取 $$\mu = \bar{x}$$，什么 $$r$$ 值使模拟分布与数据一致？
**5.55** 设用 (5.6.7) 的方法生成随机变量 $$Y$$，其中 $$y_i = i$$（$$i = 0, 1, 2, \ldots$$）。证明期望比较次数为 $$\mathrm{E}(Y + 1)$$。（提示：习题 2.14。）
**5.56** 设 $$Y$$ 服从柯西分布 $$f_Y(y) = \dfrac{1}{\pi}\, \dfrac{1}{1 + y^2}$$，$$-\infty < y < \infty$$。(a) 证明 $$F_Y(y) = \dfrac{1}{\pi} \tan^{-1}(y) + \dfrac{1}{2}$$；(b) 说明如何从 uniform$(0, 1)$$ 随机变量出发模拟 $$\mathrm{Cauchy}(a, b)$$ 随机变量。（相关结果见习题 2.12。）

**5.57** Park 等 (1996) 描述了一种基于如下方案生成相关二元变量的方法。设 $$X_1, X_2, X_3$$ 是均值分别为 $$\lambda_1, \lambda_2, \lambda_3$$ 的独立泊松随机变量，构造随机变量

$$
Y_1 = X_1 + X_3, \qquad Y_2 = X_2 + X_3.
$$

(a) 证明 $$\mathrm{Cov}(Y_1, Y_2) = \lambda_3$$；(b) 定义 $$Z_i = I(Y_i = 0)$$ 与 $$p_i = e^{-(\lambda_i + \lambda_3)}$$。证明诸 $$Z_i$$ 是 $$\mathrm{Bernoulli}(p_i)$$，且

$$
\mathrm{Corr}(Z_1, Z_2) = \frac{p_1\, p_2\, \bigl( e^{\lambda_3} - 1 \bigr)}{\sqrt{p_1 (1 - p_1)\, p_2 (1 - p_2)}};
$$

(c) 证明 $$Z_1$$ 与 $$Z_2$$ 的相关并非在 $$[-1, 1]$$ 上不受限制，而是

$$
\mathrm{Corr}(Z_1, Z_2) \leq \min\Biggl\lbrace  \sqrt{\frac{p_2 (1 - p_1)}{p_1 (1 - p_2)}},\ \sqrt{\frac{p_1 (1 - p_2)}{p_2 (1 - p_1)}} \Biggr \rbrace.
$$

**5.58** 设 $$U_1, U_2, \ldots, U_n$$ 是 iid uniform$(0, 1)$$ 随机变量，$$S_n = \sum_{i=1}^{n} U_i$$。定义随机变量
$$
N = \min\{k : S_k > 1\}.
$$
(a) 证明 $$P(S_k \leq t) = t^k / k!$$；(b) 证明 $$P(N = n) = P(S_{n-1} < 1) - P(S_n < 1)$$，且出乎意料地 $$\mathrm{E}(N) = e$$（自然对数的底）；(c) 用 (b) 的结果通过模拟计算 $$e$$ 的值；(d) $$n$$ 要多大，才能使你有 95% 的把握得到 $$e$$ 的前四位数字？（Russell (1991) 把该问题归于 Gnedenko (1978)，描述了这样一个模拟实验。）
**5.59** 证明例 5.6.7 的算法生成 $$\mathrm{beta}(a, b)$$ 随机变量。
**5.60** 把例 5.6.7 的算法推广到 $$[0, 1]$$ 上任何连续 pdf，即对 $$[a, b]$$ 上任意有界 pdf $$f(x)$$，定义 $$c = \max_{a \leq x \leq b} f(x)$$。设 $$X$$ 与 $$Y$$ 独立，$$X \sim \mathrm{uniform}(a, b)$$，$$Y \sim \mathrm{uniform}(0, c)$$。设 $$d$$ 是大于 $$b$$ 的数，定义新随机变量
$$
W = \begin{cases} X & \text{若}\ Y < f(X),\\ d & \text{若}\ Y \geq f(X). \end{cases}
$$
(a) 证明 $$a \leq w \leq b$$ 时 $$P(W \leq w) = \int_a^{w} f(t)\, dt\, \big/ \bigl[ c\, (b - a) \bigr]$$；(b) 用 (a) 解释如何生成以 $$f(x)$$ 为 pdf 的随机变量。（提示：用几何论证；画图有帮助。）
**5.61** (a) 设要生成 $$Y \sim \mathrm{beta}(a, b)$$，$$a$$、$$b$$ 非整数。证明使用 $$V \sim \mathrm{beta}(\lfloor a \rfloor, \lfloor b \rfloor)$$ 会使 $$M = \sup_y f_Y(y)/f_V(y)$$ 有限。(b) 设要生成 $$Y \sim \mathrm{gamma}(a, b)$$，$$a$$ 非整数。证明使用 $$V \sim \mathrm{gamma}(\lfloor a \rfloor, b)$$ 会使 $$M = \sup_y f_Y(y)/f_V(y)$$ 有限。(c) 证明在 (a)、(b) 中，若 $$V$$ 的参数取 $$\lfloor a \rfloor + 1$$，则 $$M$$ 为无穷。(d) 在 (a)、(b) 中求 $$V$$ 参数的最优值（使 $$\mathrm{E}(N)$$ 最小，见 (5.6.12)）。（回忆 $$\lfloor a \rfloor$$ = 不超过 $$a$$ 的最大整数。）
**5.62** 求 $$M$$ 的值，使接受/拒绝算法能用 $$U \sim \mathrm{uniform}(0,1)$$ 生成 $$Y \sim n(0, 1)$$，取：(a) $$V \sim \mathrm{Cauchy}$$；(b) $$V \sim \mathrm{Double\ Exponential}$$；(c) 比较这两个算法。你推荐哪一个？
**5.63** 用接受/拒绝算法生成 $$Y \sim n(0, 1)$$，也可以生成 $$U \sim \mathrm{uniform}$$、$$V \sim \mathrm{exponential}(\lambda)$$ 并给 $$V$$ 附上随机符号（$$\pm$$ 各半）。$$\lambda$$ 取何值使该算法最优？
**5.64** 与接受-拒绝类似的技术是重要性抽样（importance sampling），对计算分布的特征相当有用。设 $$X \sim f$$，但 pdf $$f$$ 难以模拟。从 $$g$$ 生成 iid 的 $$Y_1, Y_2, \ldots, Y_m$$，对任意函数 $$h$$ 计算 $$\frac{1}{m} \sum_{i=1}^{m} \frac{f(Y_i)}{g(Y_i)}\, h(Y_i)$$。设 $$f$$ 与 $$g$$ 支撑相同，$$\mathrm{Var} h(X) < \infty$$。(a) 证明 $$\mathrm{E}\Bigl[ \frac{1}{m} \sum_{i=1}^{m} \frac{f(Y_i)}{g(Y_i)}\, h(Y_i) \Bigr] = \mathrm{E} h(X)$$；(b) 证明 $$\frac{1}{m} \sum_{i=1}^{m} \frac{f(Y_i)}{g(Y_i)}\, h(Y_i) \xrightarrow{P} \mathrm{E} h(X)$$；(c) 虽然 (a) 的估计量期望正确，实践中更受青睐的是估计量
$$
\frac{\displaystyle\sum_{i=1}^{m} \frac{f(Y_i)}{g(Y_i)}\, h(Y_i)}{\displaystyle\sum_{j=1}^{m} \frac{f(Y_j)}{g(Y_j)}}.
$$
证明该估计量依概率收敛到 $$\mathrm{E} h(X)$$；而且证明若 $$h$$ 为常数，该估计量优于 (a) 中的估计量。（Casella and Robert 1996 进一步探讨了该估计量的性质。）
**5.65** 习题 5.64 的重要性抽样算法的一个变体实际上可以从 $$f$$ 产生近似样本。同样设 $$X \sim f$$，从 $$g$$ 生成 iid 的 $$Y_1, Y_2, \ldots, Y_m$$。计算 $$q_i = \bigl[ f(Y_i)/g(Y_i) \bigr] \big/ \Bigl[ \sum_{j=1}^{m} f(Y_j)/g(Y_j) \Bigr]$$。然后从 $$Y_1, \ldots, Y_m$$ 上以 $$P(X^{*} = Y_k) = q_k$$ 的离散分布生成随机变量 $$X^{*}$$。证明 $$X_1^{*}, X_2^{*}, \ldots, X_r^{*}$$ 近似是来自 $$f$$ 的随机样本。提示：证明 $$P(X^{*} \leq x) = \sum_{i=1}^{m} q_i\, I(Y_i \leq x)$$；令 $$m \to \infty$$ 并在分子分母中使用 WLLN。该算法由 Rubin (1988) 称为抽样/重要性重抽样（Sampling/Importance Resampling，SIR）算法，Smith and Gelfand (1992) 称之为加权自助法。
**5.66** 若 $$X_1, \ldots, X_n$$ 是 iid $$n(\mu, \sigma^2)$$，样本均值 $$\bar{X}$$ 的分布是 $$n(\mu, \sigma^2/n)$$。若我们关心使用更稳健的位置估计量（如中位数 (5.4.1)），推导其分布就困难得多。(a) 证明：$$m$$ 是诸 $$X_i$$ 的中位数当且仅当 $$(m - \mu)/\sigma$$ 是 $$(X_i - \mu)/\sigma$$ 的中位数。因此只需考虑来自 $$n(0, 1)$$ 样本的中位数分布。(b) 对来自 $$n(0, 1)$$ 的容量 $$n = 15$$ 样本，模拟中位数 $$m$$ 的分布；(c) 把 (b) 中的分布与中位数的渐近分布 $$\sqrt{n}\, (m - \mu) \sim n\bigl[ 0,\ 1/4 f^2(0) \bigr]$$（$$f$$ 为 pdf）比较。$$n = 15$$ 足够大到渐近有效吗？
**5.67** 许多情形下 Metropolis 算法是首选，因为 (i) 没有满足接受/拒绝上确界条件的明显候选密度，或 (ii) 上确界条件难以验证，或 (iii) 惰性使我们以计算能力替代脑力。对下列每种情形，说明如何实施 Metropolis 算法从指定分布生成容量 100 的样本：(a) $$X \sim \frac{1}{\sigma} f\bigl( (x - \mu)/\sigma \bigr)$$，$$f$$ = 自由度 $$\nu$$ 的 Student 氏 $$t$$，$$\nu$$、$$\mu$$、$$\sigma$$ 已知；(b) $$X \sim \mathrm{lognormal}(\mu, \sigma^2)$$，$$\mu$$、$$\sigma^2$$ 已知；(c) $$X \sim \mathrm{Weibull}(\alpha, \beta)$$，$$\alpha$$、$$\beta$$ 已知。
**5.68** 若用 Metropolis 算法而非接受/拒绝算法，我们免于验证上确界条件；当然代价是放弃“得到恰好所要分布的随机变量”这一性质，只能接受近似。(a) 说明如何用 Metropolis 算法从 $$n(0,1)$$ 随机变量出发，生成近似服从自由度 $$\nu$$ 的 Student 氏 $$t$$ 分布的随机变量；(b) 说明如何用接受/拒绝算法从柯西随机变量出发，生成服从自由度 $$\nu$$ 的 Student 氏 $$t$$ 分布的随机变量；(c) 说明如何用变换直接生成服从自由度 $$\nu$$ 的 Student 氏 $$t$$ 分布的随机变量；(d) 对 $$\nu = 2, 10, 25$$，通过生成容量 100 的样本比较这些方法。你更喜欢哪种方法？为什么？［Mengersen and Tweedie (1995) 证明：若上确界条件满足，即 $$\sup f/g \leq M < \infty$$（$$f$$ 为目标密度，$$g$$ 为候选密度），Metropolis 算法的收敛快得多。］
**5.69** 证明 pdf $$f_Y(y)$$ 是 Metropolis 算法的稳定点：即若 $$Z_i \sim f_Y(y)$$，则 $$Z_{i+1} \sim f_Y(y)$$。
## 5.8 杂记（Miscellanea）
### 5.8.1 中心极限定理的更多内容（More on the Central Limit Theorem）
对 iid 随机变量序列，向正态性收敛的充分必要条件已知，最著名的结果归于 Lindeberg 与 Feller。下面这个特例归功于 Lévy。设 $$X_1, X_2, \ldots$$ 是 iid 序列，$$\mathrm{E} X_i = \mu < \infty$$，$$V_n = \sum_{i=1}^{n} X_i$$。序列 $$V_n$$（在适当标准化下）将收敛到 $$n(0, 1)$$ 随机变量，当且仅当
$$
\lim_{t \to \infty}\ \frac{t^2\, P\bigl( \vert X_1 - \mu\vert  > t \bigr)}{\mathrm{E}\Bigl[ (X_1 - \mu)^2\, I_{[-t, t]}(X_1 - \mu) \Bigr]} = 0.
$$
注意该条件是方差条件：它并不完全要求方差有限，但要求方差“几乎”有限。这是向正态收敛的要点——正态性来自小扰动的累加。
其他类型的中心极限定理比比皆是，特别是旨在放宽独立性假设的那些。独立性假设无法取消，但可以放宽（见 Billingsley 1995, Section 27 或 Resnick 1999, Chapter 8）。
### 5.8.2 $$S^2$$ 的偏差（The Bias of $$S^2$$）
本章的大多数计算都假设观测独立，一些期望的计算正依赖于此。H. A. David (1985) 指出：若观测相依，则 $$S^2$$ 可能是 $$\sigma^2$$ 的有偏估计，即未必有 $$\mathrm{E} S^2 = \sigma^2$$。但可能偏差的范围容易算出。若 $$X_1, \ldots, X_n$$ 是均值 $$\mu$$、方差 $$\sigma^2$$ 的随机变量（不必独立），则
$$
(n - 1)\, \mathrm{E} S^2 = \mathrm{E}\Biggl[ \sum_{i=1}^{n} \bigl( X_i - \mu \bigr)^2 - n\, \bigl( \bar{X} - \mu \bigr)^2 \Biggr] = n \sigma^2 - n\, \mathrm{Var} \bar{X}.
$$
$$\mathrm{Var} \bar{X}$$ 随依赖的多少与类型而变：从 0（若所有变量恒定）到 $$\sigma^2$$（若所有变量都是 $$X_1$$ 的拷贝）。代入上式得相依情形下 $$\mathrm{E} S^2$$ 的范围
$$
0 \leq \mathrm{E} S^2 \leq \frac{n}{n - 1}\, \sigma^2.
$$
### 5.8.3 切比雪夫不等式再访（Chebychev's Inequality Revisited）
3.6 节考察过切比雪夫不等式（另见杂记 3.8.2），例 3.6.2 给出了特别有用的形式。那一形式仍需知道随机变量的均值与方差；某些情形下我们也许关心用估计的均值与方差得到的界。
若 $$X_1, \ldots, X_n$$ 是来自均值 $$\mu$$、方差 $$\sigma^2$$ 的总体的随机样本，切比雪夫不等式说
$$
P\bigl( \vert \bar{X} - \mu\vert  \geq k\sigma \bigr) \leq \frac{1}{k^2}.
$$
Saw 等 (1984) 证明：若用 $$\bar{X}$$ 代替 $$\mu$$、$$S^2$$ 代替 $$\sigma^2$$，则得
$$
P\bigl( \vert \bar{X} - \mu\vert  \geq k S \bigr) \leq \frac{1}{n + 1}\, g\Biggl( \frac{n (n + 1)\, k^2}{n - 1 + (n + 1) k^2} \Biggr),
$$
其中
$$
g(t) = \begin{cases}
\nu & \text{若}\ \nu\ \text{为偶数},\\
\nu - 1 & \text{若}\ \nu\ \text{为奇数且}\ t < a,\\
\nu & \text{若}\ \nu\ \text{为奇数且}\ t > a,
\end{cases}
$$
且
$$
\nu = \text{小于}\ \frac{n + 1}{t}\ \text{的最大整数}, \qquad a = \frac{(n + 1)\, (n + 1 - \nu)}{1 + \nu\, (n + 1 - \nu)}.
$$
### 5.8.4 强大数定律的更多内容（More on the Strong Law）
如前所述，强大数定律（定理 5.5.9）可以在较弱的条件下证明：只要求随机变量有有限均值（例如见 Resnick 1999, Chapter 7 或 Billingsley 1995, Section 22）。然而在 mgf 存在的假设下，Koopmans (1993) 给出了只用微积分的证明。
SLLN 断言的收敛类型正是我们最熟悉的：随机变量序列 $$\bar{X}_n$$ 到其公共均值 $$\mu$$ 的点态收敛。如例 5.5.8 所见，这比弱定律的依概率收敛更强。
SLLN 的结论是
$$
P\Bigl( \lim_{n \to \infty} \vert \bar{X}_n - \mu\vert  < \varepsilon \Bigr) = 1,
$$
即以概率 1，序列 $$\{\bar{X}_n\}$$ 的极限是 $$\mu$$。等价地，序列发散的集合概率为 0。序列要发散，必须存在 $$\delta > 0$$ 使得对每个 $$n$$ 都有 $$k > n$$ 满足 $$\vert \bar{X}_k - \mu\vert  > \delta$$。满足这一条件的全体 $$\bar{X}_k$$ 构成发散序列，表示为集合
$$
A_{\delta} = \bigcap_{n=1}^{\infty} \bigcup_{k=n}^{\infty} \Bigl\{ \vert \bar{X}_k - \mu\vert  > \delta \Bigr\}.
$$
去掉交项可得 $$P(A_{\delta})$$ 的上界，于是序列 $$\{\bar{X}_n\}$$ 发散处的概率被上界控制为
$$
\begin{aligned}
P(A_{\delta}) &\leq P\Bigl( \bigcup_{k=n}^{\infty} \bigl\{ \vert \bar{X}_k - \mu\vert  > \delta \bigr\} \Bigr)\\
&\leq \sum_{k=n}^{\infty} P\bigl( \{\vert \bar{X}_k - \mu\vert  > \delta\} \bigr) \qquad （\text{布尔不等式，定理 1.2.11}）\\
&\leq \sum_{k=n}^{\infty} 2\, c^{k}, \qquad 0 < c < 1,
\end{aligned}
$$
其中最后的不等式可用习题 5.38(d) 建立。注意到这是几何级数求和，由 (1.5.4) 得
$$
P(A_{\delta}) \leq 2 \sum_{k=n}^{\infty} c^{k} = 2\, \frac{c^{n}}{1 - c} \to 0 \qquad \text{（当}\ n \to \infty\text{）},
$$
故序列 $$\{\bar{X}_n\}$$ 发散处的概率为零，SLLN 得证。
### 5.8.5 马尔可夫链蒙特卡罗（Markov Chain Monte Carlo）
统称为马尔可夫链蒙特卡罗（MCMC）的方法用于生成随机变量，并在完成复杂计算——最著名的是涉及积分与最大化的计算——方面极有用处。Metropolis 算法（见 5.6 节）就是 MCMC 方法的一个例子。
顾名思义，这些方法基于马尔可夫链——一种我们尚未探讨的概率结构（入门见 Chung 1974 或 Ross 1988）。随机变量序列 $$X_1, X_2, \ldots$$ 是马尔可夫链，如果
$$
P\bigl( X_{k+1} \in A \mid X_1, \ldots, X_k \bigr) = P\bigl( X_{k+1} \in A \mid X_k \bigr);
$$
即当前随机变量的分布至多依赖于紧邻的过去随机变量。注意这是独立性的推广。
遍历定理（Ergodic Theorem）是大数定律的推广：若马尔可夫链 $$X_1, X_2, \ldots$$ 满足某些正则性条件（统计问题中经常满足），则只要期望存在，
$$
\frac{1}{n} \sum_{i=1}^{n} h(X_i) \to \mathrm{E} h(X) \qquad \text{（当}\ n \to \infty\text{）}.
$$

于是 5.6 节的计算可以推广到马尔可夫链与 MCMC 方法。

要完全理解 MCMC 方法确实需要更多马尔可夫链知识，此处不做。MCMC 方法已有浩瀚文献，涵盖理论与应用。Tanner (1993) 是统计学计算方法的良好入门；Robert (1994, Chapter 9) 提供了更具贝叶斯色彩的理论处理；Casella and George (1992) 通过 Gibbs 抽样器（一种特定的 MCMC 方法）给出更平易的入门。Gibbs 抽样器也许仍是使用最广的 MCMC 方法，是这一方法流行的功臣［源于 Gelfand and Smith (1990) 在 Geman and Geman (1984) 基础上的开创性工作］。涉及 MCMC 方法的参考文献多不胜数：其他入门文献还有 Gelman and Rubin (1992)、Geyer and Thompson (1992) 与 Smith and Roberts (1993) 的论文，特别优雅的理论入门见 Tierney (1994)。Robert and Casella (1999) 是该领域的教科书级论述。

---
