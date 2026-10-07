---
layout: note
kind: note
title: "第 6 章　数据约简原理（Principles of Data Reduction）"
course: statistics
order: 6
date: 2026-10-01
permalink: /statistics/chap06.html
---

# 第 6 章　数据约简原理（Principles of Data Reduction）

> *“...we are suffering from a plethora of surmise, conjecture and hypothesis. The difficulty is to detach the framework of fact – of absolute undeniable fact – from the embellishments of theorists and reporters.”*
>
> ……我们正苦于臆测、猜想与假设泛滥成灾。困难在于把事实的框架——确凿无疑的事实——从理论家与记者的修饰中剥离出来。
>
> ——歇洛克·福尔摩斯（《银色马》）

## 6.1 引言（Introduction）

实验者利用样本 $$X_1, \ldots, X_n$$ 中的信息对未知参数 $$\theta$$ 作推断。若样本量 $$n$$ 很大，观测样本 $$x_1, \ldots, x_n$$ 就是一长串难以解读的数字。实验者可能希望通过确定样本值的若干关键特征来汇总样本中的信息；这通常通过计算统计量（样本的函数）完成。例如样本均值、样本方差、最大观测与最小观测就是可用于概括样本关键特征的四个统计量。回顾我们用黑体字母表示多个变量：**X** 表示随机变量 $$X_1, \ldots, X_n$$，**x** 表示样本 $$x_1, \ldots, x_n$$。

任何统计量 $$T(\textbf{X})$$ 都定义了一种数据约简（data reduction）或数据汇总。只使用统计量的观测值 $$T(\textbf{x})$$ 而非整个观测样本 **x** 的实验者，将把满足 $$T(\textbf{x}) = T(\textbf{y})$$ 的两个样本 **x** 与 **y** 视为等同，尽管实际样本值可能有某些差别。

以特定统计量为依据的数据约简可以视为对样本空间 $$\mathcal{X}$$ 的一个分割。令 $$\mathcal{T} = \{t : t = T(\textbf{x})\ \text{对某个}\ \textbf{x} \in \mathcal{X}\}$$ 为 $$\mathcal{X}$$ 在 $$T(\textbf{x})$$ 下的像，则 $$T(\textbf{x})$$ 把样本空间分割成集合 $$A_t$$（$$t \in \mathcal{T}$$），其中 $$A_t = \{\textbf{x} : T(\textbf{x}) = t\}$$。统计量之所以汇总数据，在于它不报告整个样本 **x**，而只报告 $$T(\textbf{x}) = t$$（等价地 $$\textbf{x} \in A_t$$）。例如若 $$T(\textbf{x}) = x_1 + \cdots + x_n$$，则 $$T(\textbf{x})$$ 不报告实际样本值而只报告和；可能有许多不同的样本点具有相同的和。这种数据约简的优点与后果正是本章的主题。

我们研究数据约简的三条原理。我们关心的是这样的数据约简方法：既不丢弃关于未知参数 $$\theta$$ 的重要信息，又能成功地丢弃就获得关于 $$\theta$$ 的知识而言无关紧要的信息。***充分性原理***（Sufficiency Principle）提倡一种不丢弃 $$\theta$$ 的信息、同时实现数据一定汇总的约简方法。***似然原理***（Likelihood Principle）描述了一个由观测样本确定的、包含样本中关于 $$\theta$$ 的全部信息的参数函数。***等变原理***（Equivariance Principle）规定了另一种数据约简方法，它仍保留模型的某些重要特征。

## 6.2 充分性原理（The Sufficiency Principle）

参数 $$\theta$$ 的充分统计量是（在某种意义上）抓住了样本中关于 $$\theta$$ 的全部信息的统计量。样本中除充分统计量取值之外的任何额外信息，都不再含有关于 $$\theta$$ 的更多信息。这些考虑引出称为充分性原理的数据约简技术。

> **充分性原理（Sufficiency Principle）**
>
> 若 $$T(\textbf{X})$$ 是 $$\theta$$ 的充分统计量，则关于 $$\theta$$ 的任何推断都应只通过 $$T(\textbf{X})$$ 的取值依赖于样本 $$\textbf{X}$$。也就是说，若 **x** 与 **y** 是满足 $$T(\textbf{x}) = T(\textbf{y})$$ 的两个样本点，则无论观测到 $$\textbf{X} = \textbf{x}$$ 还是 $$\textbf{X} = \textbf{y}$$，关于 $$\theta$$ 的推断都应当相同。

本节考察充分统计量与充分性原理的若干方面。

### 6.2.1 充分统计量（Sufficient Statistics）

充分统计量的正式定义如下。

> **定义 6.2.1（充分统计量）**
>
> 若给定 $$T(\textbf{X})$$ 的取值后样本 $$\textbf{X}$$ 的条件分布不依赖于 $$\theta$$，则称统计量 $$T(\textbf{X})$$ 是 $$\theta$$ 的***充分统计量***（sufficient statistic）。

若 $$T(\textbf{X})$$ 有连续分布，则对一切 $$t$$ 有 $$P_{\theta}\bigl( T(\textbf{X}) = t \bigr) = 0$$；要完全理解这种情形下的定义 6.2.1，需要比第 1 章更精致的条件概率概念，讨论可在 Lehmann (1986) 等更高级的教科书中找到。我们将在离散情形做计算，并指出连续情形中成立的类似结果。

为理解定义 6.2.1，设 $$t$$ 是 $$T(\textbf{X})$$ 的可能取值，即满足 $$P_{\theta}\bigl( T(\textbf{X}) = t \bigr) > 0$$ 的值。我们要考虑条件概率 $$P_{\theta}\bigl( \textbf{X} = \textbf{x} \mid T(\textbf{X}) = t \bigr)$$。若 **x** 是满足 $$T(\textbf{x}) \neq t$$ 的样本点，则显然该条件概率为 0。因此我们感兴趣的是 $$P\bigl( \textbf{X} = \textbf{x} \mid T(\textbf{X}) = T(\textbf{x}) \bigr)$$。按定义，若 $$T(\textbf{X})$$ 是充分统计量，这一条件概率对一切 $$\theta$$ 值相同，故我们省去了下标。

充分统计量正是在这一意义上抓住了关于 $$\theta$$ 的全部信息。考虑实验者 1：他观测到 $$\textbf{X} = \textbf{x}$$，当然也能计算 $$T(\textbf{X}) = T(\textbf{x})$$；对 $$\theta$$ 作推断时他可以使用“$$\textbf{X} = \textbf{x}$$”与“$$T(\textbf{X}) = T(\textbf{x})$$”两种信息。再看实验者 2：没人告诉他 $$\textbf{X}$$ 的值，只告诉他 $$T(\textbf{X}) = T(\textbf{x})$$。实验者 2 知道 $$P\bigl( \textbf{X} = \textbf{y} \mid T(\textbf{X}) = T(\textbf{x}) \bigr)$$——集合 $$A_{T(\textbf{x})} = \{\textbf{y} : T(\textbf{y}) = T(\textbf{x})\}$$ 上的一个概率分布——因为它可以由模型算出而无需知道 $$\theta$$ 的真值。于是实验者 2 可以利用该分布与某种随机化装置（如随机数表）生成满足 $$P\bigl( Y = \textbf{y} \mid T(\textbf{X}) = T(\textbf{x}) \bigr) = P\bigl( \textbf{X} = \textbf{y} \mid T(\textbf{X}) = T(\textbf{x}) \bigr)$$ 的观测 $$Y$$。事实证明（下文即见），对每个 $$\theta$$ 值，$$X$$ 与 $$Y$$ 具有相同的无条件概率分布。所以知道 $$X$$ 的实验者 1 与知道 $$Y$$ 的实验者 2 关于 $$\theta$$ 的信息等价；但用随机数表生成 $$Y$$ 显然没有增加实验者 2 对 $$\theta$$ 的知识——他关于 $$\theta$$ 的全部知识都包含在“$$T(\textbf{X}) = T(\textbf{x})$$”之中。因此只知道 $$T(\textbf{X}) = T(\textbf{x})$$ 的实验者 2，其关于 $$\theta$$ 的信息与知道整个样本 $$\textbf{X} = \textbf{x}$$ 的实验者 1 恰恰一样多。

为完成上述论证，须证 $$X$$ 与 $$Y$$ 有相同的无条件分布，即对一切 **x** 与 $$\theta$$ 有 $$P_{\theta}(\textbf{X} = \textbf{x}) = P_{\theta}(Y = \textbf{x})$$。注意事件 $$\{\textbf{X} = \textbf{x}\}$$ 与 $$\{Y = \textbf{x}\}$$ 都是事件 $$\{T(\textbf{X}) = T(\textbf{x})\}$$ 的子集；且回忆

$$
P\bigl( \textbf{X} = \textbf{x} \mid T(\textbf{X}) = T(\textbf{x}) \bigr) = P\bigl( Y = \textbf{x} \mid T(\textbf{X}) = T(\textbf{x}) \bigr)
$$

且这些条件概率不依赖 $$\theta$$。于是

$$
\begin{aligned}
P_{\theta}(\textbf{X} = \textbf{x}) &= P_{\theta}\bigl( \textbf{X} = \textbf{x}\ \text{且}\ T(\textbf{X}) = T(\textbf{x}) \bigr)\\
&= P\bigl( \textbf{X} = \textbf{x} \mid T(\textbf{X}) = T(\textbf{x}) \bigr)\, P_{\theta}\bigl( T(\textbf{X}) = T(\textbf{x}) \bigr) \qquad （\text{条件概率的定义}）\\
&= P\bigl( Y = \textbf{x} \mid T(\textbf{X}) = T(\textbf{x}) \bigr)\, P_{\theta}\bigl( T(\textbf{X}) = T(\textbf{x}) \bigr)\\
&= P_{\theta}\bigl( Y = \textbf{x}\ \text{且}\ T(\textbf{X}) = T(\textbf{x}) \bigr)\\
&= P_{\theta}(Y = \textbf{x}).
\end{aligned}
$$

要用定义 6.2.1 验证统计量 $$T(\textbf{X})$$ 是 $$\theta$$ 的充分统计量，必须验证：对任意固定的 **x** 与 $$t$$，条件概率 $$P_{\theta}\bigl( \textbf{X} = \textbf{x} \mid T(\textbf{X}) = t \bigr)$$ 对一切 $$\theta$$ 值相同。当 $$T(\textbf{x}) \neq t$$ 时该概率对所有 $$\theta$$ 都为 0，故只须验证 $$P_{\theta}\bigl( \textbf{X} = \textbf{x} \mid T(\textbf{X}) = T(\textbf{x}) \bigr)$$ 不依赖 $$\theta$$。由于 $$\{\textbf{X} = \textbf{x}\}$$ 是 $$\{T(\textbf{X}) = T(\textbf{x})\}$$ 的子集，

$$
P_{\theta}\bigl( \textbf{X} = \textbf{x} \mid T(\textbf{X}) = T(\textbf{x}) \bigr) = \frac{P_{\theta}\bigl( \textbf{X} = \textbf{x}\ \text{且}\ T(\textbf{X}) = T(\textbf{x}) \bigr)}{P_{\theta}\bigl( T(\textbf{X}) = T(\textbf{x}) \bigr)} = \frac{P_{\theta}(\textbf{X} = \textbf{x})}{P_{\theta}\bigl( T(\textbf{X}) = T(\textbf{x}) \bigr)} = \frac{p(\textbf{x} \mid \theta)}{q\bigl( T(\textbf{x}) \mid \theta \bigr)},
$$

其中 $$p(\textbf{x} \mid \theta)$$ 是样本 $$\textbf{X}$$ 的联合 pmf，$$q(t \mid \theta)$$ 是 $$T(\textbf{X})$$ 的 pmf。于是：$$T(\textbf{X})$$ 是 $$\theta$$ 的充分统计量，当且仅当对每个 **x**，上述 pmf 之比作为 $$\theta$$ 的函数为常数。若 $$\textbf{X}$$ 与 $$T(\textbf{X})$$ 有连续分布，上述条件概率无法按第 1 章的意义解读；但仍可用上述判据判断 $$T(\textbf{X})$$ 是否为 $$\theta$$ 的充分统计量。

> **定理 6.2.2（充分性的比值判据）**
>
> 设 $$p(\textbf{x} \mid \theta)$$ 是 $$\textbf{X}$$ 的联合 pdf 或 pmf，$$q(t \mid \theta)$$ 是 $$T(\textbf{X})$$ 的 pdf 或 pmf。若对样本空间中的每个 **x**，比值 $$p(\textbf{x} \mid \theta) / q\bigl( T(\textbf{x}) \mid \theta \bigr)$$ 作为 $$\theta$$ 的函数为常数，则 $$T(\textbf{X})$$ 是 $$\theta$$ 的充分统计量。

现在用定理 6.2.2 验证某些常见统计量是充分统计量。

> **例 6.2.3（二项充分统计量）**
>
> 设 $$X_1, \ldots, X_n$$ 是参数 $$\theta$$（$$0 < \theta < 1$$）的 iid 伯努利随机变量。我们将证明 $$T(\textbf{X}) = X_1 + \cdots + X_n$$ 是 $$\theta$$ 的充分统计量。注意 $$T(\textbf{X})$$ 计数等于 1 的 $$X_i$$ 个数，故 $$T(\textbf{X})$$ 服从 $$\mathrm{binomial}(n, \theta)$$ 分布。于是 pmf 之比为
>
> $$
> \frac{p(\textbf{x} \mid \theta)}{q\bigl( T(\textbf{x}) \mid \theta \bigr)} = \frac{\prod \theta^{x_i} (1 - \theta)^{1 - x_i}}{\dbinom{n}{t}\, \theta^{t} (1 - \theta)^{n - t}} = \frac{\theta^{\sum x_i}\, (1 - \theta)^{\sum (1 - x_i)}}{\dbinom{n}{t}\, \theta^{t} (1 - \theta)^{n - t}} = \frac{\theta^{t} (1 - \theta)^{n - t}}{\dbinom{n}{t}\, \theta^{t} (1 - \theta)^{n - t}} = \frac{1}{\dbinom{n}{\sum x_i}}
> $$
>
> （记 $$t = \sum x_i$$；并用了 $$\prod \theta^{x_i} = \theta^{\sum x_i}$$）。由于该比值不依赖 $$\theta$$，由定理 6.2.2，$$T(\textbf{X})$$ 是 $$\theta$$ 的充分统计量。其解释是：这个伯努利样本中 1 的总数包含数据中关于 $$\theta$$ 的全部信息；数据的其他特征（如 $$X_3$$ 的确切取值）不含额外信息。

> **例 6.2.4（正态充分统计量）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\mu, \sigma^2)$$，$$\sigma^2$$ 已知。要证明样本均值 $$T(\textbf{X}) = \bar{X} = (X_1 + \cdots + X_n)/n$$ 是 $$\mu$$ 的充分统计量。样本 $$\textbf{X}$$ 的联合 pdf 为
>
> $$
> \begin{aligned}
> f(\textbf{x} \mid \mu) &= \prod_{i=1}^{n} (2 \pi \sigma^2)^{-1/2}\, \exp\Bigl( -(x_i - \mu)^2 / (2\sigma^2) \Bigr)\\
> &= (2 \pi \sigma^2)^{-n/2}\, \exp\Bigl( -\sum_{i=1}^{n} (x_i - \mu)^2 / (2\sigma^2) \Bigr)\\
> &= (2 \pi \sigma^2)^{-n/2}\, \exp\Bigl( -\sum_{i=1}^{n} (x_i - \bar{x} + \bar{x} - \mu)^2 / (2\sigma^2) \Bigr) \qquad （\text{加减}\ \bar{x}）\\
> &= (2 \pi \sigma^2)^{-n/2}\, \exp\Biggl( -\Biggl[ \sum_{i=1}^{n} (x_i - \bar{x})^2 + n\, (\bar{x} - \mu)^2 \Biggr] / (2\sigma^2) \Biggr).
> \end{aligned} \tag{6.2.1}
> $$
>
> 最后的等式成立是因为交叉项 $$\sum_{i=1}^{n} (x_i - \bar{x})(\bar{x} - \mu)$$ 可改写为 $$(\bar{x} - \mu) \sum_{i=1}^{n} (x_i - \bar{x})$$，而 $$\sum_{i=1}^{n} (x_i - \bar{x}) = 0$$。回忆样本均值 $$\bar{X}$$ 服从 $$n(\mu, \sigma^2/n)$$ 分布。于是 pdf 之比为
>
> $$
> \frac{f(\textbf{x} \mid \theta)}{q\bigl( T(\textbf{x}) \mid \theta \bigr)} = \frac{(2 \pi \sigma^2)^{-n/2}\, \exp\Bigl( -\Bigl[ \sum_{i=1}^{n} (x_i - \bar{x})^2 + n (\bar{x} - \mu)^2 \Bigr] / (2\sigma^2) \Bigr)}{(2 \pi \sigma^2 / n)^{-1/2}\, \exp\bigl( -n (\bar{x} - \mu)^2 / (2\sigma^2) \bigr)}
> = n^{-1/2}\, (2 \pi \sigma^2)^{-(n - 1)/2}\, \exp\Bigl( -\sum_{i=1}^{n} (x_i - \bar{x})^2 / (2\sigma^2) \Bigr),
> $$
>
> 它不依赖 $$\mu$$。由定理 6.2.2，样本均值是 $$\mu$$ 的充分统计量。

下一例考察无法实现实质性样本约简的情形。

> **例 6.2.5（充分次序统计量）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid，来自某个我们无法提供更多信息的 pdf $$f$$（非参数估计中即如此）。此时样本密度为
>
> $$
> f(\textbf{x}) = \prod_{i=1}^{n} f(x_i) = \prod_{i=1}^{n} f\bigl( x_{(i)} \bigr), \tag{6.2.2}
> $$
>
> 其中 $$x_{(1)} \leq x_{(2)} \leq \cdots \leq x_{(n)}$$ 是次序统计量。由定理 6.2.2 可以证明次序统计量是充分统计量。当然这算不上什么约简，但对密度 $$f$$ 知之甚少时也不应期待更多。
>
> 然而，即使对密度规定了更多信息，充分性约简仍可能所获无几。例如设 $$f$$ 是柯西 pdf $$f(x \mid \theta) = \frac{1}{\pi}\, \frac{1}{(x - \theta)^2}$$ 或逻辑斯蒂 pdf $$f(x \mid \theta) = \frac{e^{-(x - \theta)}}{(1 + e^{-(x - \theta)})^2}$$：我们仍只有 (6.2.2) 的约简，再无更多。所以约简到次序统计量已是这些族所能得到的极限（更多例子见习题 6.8 与 6.9）。
>
> 事实证明，在指数族分布之外，维数小于样本量的充分统计量相当罕见；许多情形下次序统计量就是能做到的最好结果（更多细节见 Lehmann and Casella 1998, Section 1.6）。

用充分统计量的定义来求特定模型的充分统计量可能很不方便：使用定义必须先猜测统计量 $$T(\textbf{X})$$ 是充分的，再求出 $$T(\textbf{X})$$ 的 pmf 或 pdf，然后检查 pdf 或 pmf 之比不依赖 $$\theta$$。第一步需要大量直觉，第二步有时需要繁琐的分析。幸运的是，归功于 Halmos and Savage (1949) 的下述定理使我们通过简单检查样本的 pdf 或 pmf 就能找到充分统计量。

> **定理 6.2.6（因子分解定理，Factorization Theorem）**
>
> 设 $$f(\textbf{x} \mid \theta)$$ 表示样本 $$\textbf{X}$$ 的联合 pdf 或 pmf。统计量 $$T(\textbf{X})$$ 是 $$\theta$$ 的充分统计量，当且仅当存在函数 $$g(t \mid \theta)$$ 与 $$h(\textbf{x})$$，使得对一切样本点 **x** 与一切参数点 $$\theta$$ 都有
>
> $$
> f(\textbf{x} \mid \theta) = g\bigl( T(\textbf{x}) \mid \theta \bigr)\, h(\textbf{x}). \tag{6.2.3}
> $$
>
> **证明**　只给出离散分布的证明。
>
> 设 $$T(\textbf{X})$$ 是充分统计量。取 $$g(t \mid \theta) = P_{\theta}\bigl( T(\textbf{X}) = t \bigr)$$，$$h(\textbf{x}) = P\bigl( \textbf{X} = \textbf{x} \mid T(\textbf{X}) = T(\textbf{x}) \bigr)$$。由于 $$T(\textbf{X})$$ 充分，定义 $$h(\textbf{x})$$ 的条件概率不依赖 $$\theta$$，故 $$h(\textbf{x})$$ 与 $$g(t \mid \theta)$$ 的这一取法合法；且对此取法有
>
> $$
> \begin{aligned}
> f(\textbf{x} \mid \theta) &= P_{\theta}(\textbf{X} = \textbf{x}) = P_{\theta}\bigl( \textbf{X} = \textbf{x}\ \text{且}\ T(\textbf{X}) = T(\textbf{x}) \bigr)\\
> &= P_{\theta}\bigl( T(\textbf{X}) = T(\textbf{x}) \bigr)\, P\bigl( \textbf{X} = \textbf{x} \mid T(\textbf{X}) = T(\textbf{x}) \bigr) \qquad （\text{充分性}）\\
> &= g\bigl( T(\textbf{x}) \mid \theta \bigr)\, h(\textbf{x}).
> \end{aligned}
> $$
>
> 因子分解 (6.2.3) 即已展示。从上面最后两行还可见 $$P_{\theta}\bigl( T(\textbf{X}) = T(\textbf{x}) \bigr) = g\bigl( T(\textbf{x}) \mid \theta \bigr)$$，故 $$g\bigl( T(\textbf{x}) \mid \theta \bigr)$$ 就是 $$T(\textbf{X})$$ 的 pmf。
>
> 现设因子分解 (6.2.3) 存在。设 $$q(t \mid \theta)$$ 为 $$T(\textbf{X})$$ 的 pmf。为证 $$T(\textbf{X})$$ 充分，考察比值 $$f(\textbf{x} \mid \theta) / q\bigl( T(\textbf{x}) \mid \theta \bigr)$$。定义 $$A_{T(\textbf{x})} = \{\textbf{y} : T(\textbf{y}) = T(\textbf{x})\}$$，则
>
> $$
> \frac{f(\textbf{x} \mid \theta)}{q\bigl( T(\textbf{x}) \mid \theta \bigr)} = \frac{g\bigl( T(\textbf{x}) \mid \theta \bigr)\, h(\textbf{x})}{q\bigl( T(\textbf{x}) \mid \theta \bigr)} \qquad （\text{因}\ (6.2.3)\ \text{成立}）
> $$
>
> $$
> = \frac{g\bigl( T(\textbf{x}) \mid \theta \bigr)\, h(\textbf{x})}{\sum_{A_{T(\textbf{x})}} g\bigl( T(\textbf{y}) \mid \theta \bigr)\, h(\textbf{y})} \qquad （T\ \text{的 pmf 的定义}）
> = \frac{g\bigl( T(\textbf{x}) \mid \theta \bigr)\, h(\textbf{x})}{g\bigl( T(\textbf{x}) \mid \theta \bigr) \sum_{A_{T(\textbf{x})}} h(\textbf{y})} \qquad （T\ \text{在}\ A_{T(\textbf{x})}\ \text{上为常数}）
> $$
>
> $$
> = \frac{h(\textbf{x})}{\sum_{A_{T(\textbf{x})}} h(\textbf{y})}.
> $$
>
> 该比值不依赖 $$\theta$$，由定理 6.2.2，$$T(\textbf{X})$$ 是 $$\theta$$ 的充分统计量。 ∎

使用因子分解定理找充分统计量时，把样本的联合 pdf 分解为两部分，其中一部分不依赖 $$\theta$$——这构成 $$h(\textbf{x})$$；另一部分依赖 $$\theta$$，通常只通过某个函数 $$T(\textbf{x})$$ 依赖样本 **x**，而这个函数就是 $$\theta$$ 的充分统计量。下例说明这一点。

> **例 6.2.7（例 6.2.4 的继续）**
>
> 对前面所述的正态模型，我们看到 pdf 可以分解为
>
> $$
> f(\textbf{x} \mid \mu) = (2 \pi \sigma^2)^{-n/2}\, \exp\Bigl( -\sum_{i=1}^{n} (x_i - \bar{x})^2 / (2\sigma^2) \Bigr)\, \exp\bigl( -n (\bar{x} - \mu)^2 / (2\sigma^2) \bigr). \tag{6.2.4}
> $$
>
> 可以定义
>
> $$
> h(\textbf{x}) = (2 \pi \sigma^2)^{-n/2}\, \exp\Bigl( -\sum_{i=1}^{n} (x_i - \bar{x})^2 / (2\sigma^2) \Bigr),
> $$
>
> 它不依赖未知参数 $$\mu$$。(6.2.4) 中含 $$\mu$$ 的因子只通过函数 $$T(\textbf{x}) = \bar{x}$$（样本均值）依赖样本 **x**。于是
>
> $$
> g(t \mid \mu) = \exp\bigl( -n (t - \mu)^2 / (2\sigma^2) \bigr),
> $$
>
> 并注意 $$f(\textbf{x} \mid \mu) = h(\textbf{x})\, g\bigl( T(\textbf{x}) \mid \mu \bigr)$$。故由因子分解定理，$$T(\textbf{X}) = \bar{X}$$ 是 $$\mu$$ 的充分统计量。

因子分解定理要求等式 $$f(\textbf{x} \mid \theta) = g\bigl( T(\textbf{x}) \mid \theta \bigr)\, h(\textbf{x})$$ 对一切 **x** 与 $$\theta$$ 成立。若使 $$f(\textbf{x} \mid \theta)$$ 为正的 **x** 集合依赖 $$\theta$$，则在定义 $$h$$ 与 $$g$$ 时必须小心，确保乘积在 $$f$$ 为零处也为零。当然，$$h$$ 与 $$g$$ 的正确定义使充分统计量一目了然，如下例所示。

> **例 6.2.8（均匀充分统计量）**
>
> 设 $$X_1, \ldots, X_n$$ 是 $$1, \ldots, \theta$$ 上离散均匀分布的 iid 观测：未知参数 $$\theta$$ 是正整数，$$X_i$$ 的 pmf 为
>
> $$
> f(x \mid \theta) = \begin{cases} \dfrac{1}{\theta} & x = 1, 2, \ldots, \theta,\\ 0 & \text{其他}. \end{cases}
> $$
>
> 于是 $$X_1, \ldots, X_n$$ 的联合 pmf 为
>
> $$
> f(\textbf{x} \mid \theta) = \begin{cases} \theta^{-n} & x_i \in \{1, \ldots, \theta\}\ \text{对}\ i = 1, \ldots, n,\\ 0 & \text{其他}. \end{cases}
> $$
>
> 限制“$$x_i \in \{1, \ldots, \theta\}$$（$$i = 1, \ldots, n$$）”可改述为“$$x_i \in \{1, 2, \ldots\}$$（$$i = 1, \ldots, n$$，注意此限制不含 $$\theta$$）且 $$\max_i x_i \leq \theta$$”。定义 $$T(\textbf{x}) = \max_i x_i$$，
>
> $$
> h(\textbf{x}) = \begin{cases} 1 & x_i \in \{1, 2, \ldots\}\ \text{对}\ i = 1, \ldots, n,\\ 0 & \text{其他}, \end{cases} \qquad
> g(t \mid \theta) = \begin{cases} \theta^{-n} & t \leq \theta,\\ 0 & \text{其他}, \end{cases}
> $$
>
> 则容易验证对一切 **x** 与 $$\theta$$ 都有 $$f(\textbf{x} \mid \theta) = g\bigl( T(\textbf{x}) \mid \theta \bigr)\, h(\textbf{x})$$。故最大次序统计量 $$T(\textbf{X}) = \max_i X_i$$ 是本问题的充分统计量。
>
> 这类分析有时用示性函数能更清晰、更简洁地进行。回顾 $$I_A(x)$$ 是集合 $$A$$ 的示性函数（$$x \in A$$ 时为 1，否则为 0）。令 $$\mathcal{N} = \{1, 2, \ldots\}$$ 为正整数集，$$\mathcal{N}_{\theta} = \{1, 2, \ldots, \theta\}$$。则 $$X_1, \ldots, X_n$$ 的联合 pmf 为
>
> $$
> f(\textbf{x} \mid \theta) = \prod_{i=1}^{n} \theta^{-1}\, I_{\mathcal{N}_{\theta}}(x_i) = \theta^{-n} \prod_{i=1}^{n} I_{\mathcal{N}_{\theta}}(x_i).
> $$
>
> 定义 $$T(\textbf{x}) = \max_i x_i$$，显然
>
> $$
> \prod_{i=1}^{n} I_{\mathcal{N}_{\theta}}(x_i) = \prod_{i=1}^{n} I_{\mathcal{N}}(x_i)\ I_{\mathcal{N}_{\theta}}\bigl( T(\textbf{x}) \bigr).
> $$
>
> 于是得因子分解
>
> $$
> f(\textbf{x} \mid \theta) = \theta^{-n}\, I_{\mathcal{N}_{\theta}}\bigl( T(\textbf{x}) \bigr)\, \Bigl( \prod_{i=1}^{n} I_{\mathcal{N}}(x_i) \Bigr).
> $$
>
> 第一个因子只通过 $$T(\textbf{x}) = \max_i x_i$$ 依赖 $$x_1, \ldots, x_n$$，第二个因子不依赖 $$\theta$$。由因子分解定理，$$T(\textbf{X}) = \max_i X_i$$ 是 $$\theta$$ 的充分统计量。

前面各例中的充分统计量都是样本的实值函数：样本 **x** 中关于 $$\theta$$ 的全部信息汇总在单个数 $$T(\textbf{x})$$ 中。有时信息无法汇总成一个数，而需要几个数；此时充分统计量是一个向量，如 $$T(\textbf{X}) = (T_1(\textbf{X}), \ldots, T_r(\textbf{X}))$$。这种情形常在参数也是向量（如 $$\boldsymbol{\theta} = (\theta_1, \ldots, \theta_s)$$）时发生，且通常充分统计量与参数向量等长（$$r = s$$）。不过各种长度的组合都可能出现，习题与例 6.2.15、6.2.18、6.2.20 展示了这一点。因子分解定理也可用于求向量值充分统计量，如例 6.2.9。

> **例 6.2.9（正态充分统计量，两参数均未知）**
>
> 仍设 $$X_1, \ldots, X_n$$ 是 iid $$n(\mu, \sigma^2)$$，但与例 6.2.4 不同，现在设 $$\mu$$ 与 $$\sigma^2$$ 都未知，参数向量为 $$\boldsymbol{\theta} = (\mu, \sigma^2)$$。使用因子分解定理时，联合 pdf 中任何依赖 $$\mu$$ 或 $$\sigma^2$$ 的部分都必须纳入 $$g$$ 函数。由 (6.2.1) 清楚可见，pdf 只通过两个值 $$T_1(\textbf{x}) = \bar{x}$$ 与 $$T_2(\textbf{x}) = s^2 = \sum_{i=1}^{n} (x_i - \bar{x})^2 / (n - 1)$$ 依赖样本 **x**。于是可定义 $$h(\textbf{x}) = 1$$ 以及
>
> $$
> g(t \mid \boldsymbol{\theta}) = g(t_1, t_2 \mid \mu, \sigma^2) = (2 \pi \sigma^2)^{-n/2}\, \exp\Bigl( -\Bigl[ n (t_1 - \mu)^2 + (n - 1)\, t_2 \Bigr] / (2\sigma^2) \Bigr).
> $$
>
> 则可见
>
> $$
> f(\textbf{x} \mid \mu, \sigma^2) = g\bigl( T_1(\textbf{x}),\, T_2(\textbf{x}) \mid \mu, \sigma^2 \bigr)\, h(\textbf{x}). \tag{6.2.5}
> $$
>
> 故由因子分解定理，在此正态模型中 $$T(\textbf{X}) = (T_1(\textbf{X}), T_2(\textbf{X})) = (\bar{X}, S^2)$$ 是 $$(\mu, \sigma^2)$$ 的充分统计量。

例 6.2.9 表明：对正态模型，“只报告样本均值与方差来汇总数据”的通行做法是正当的。充分统计量 $$(\bar{X}, S^2)$$ 包含样本中关于 $$(\mu, \sigma^2)$$ 的全部可得信息。但实验者应当记住，充分统计量的定义是***依赖于模型的***：对另一个模型（另一族密度），样本均值与方差未必是总体均值与方差的充分统计量。只计算 $$\bar{X}$$ 与 $$S^2$$ 而全然无视其余数据的实验者，是把强烈的信任押在正态模型假设上。

用因子分解定理容易求出指数族分布的充分统计量。下面重要结果的证明留作习题 6.4。

> **定理 6.2.10（指数族的充分统计量）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自 pdf 或 pmf $$f(x \mid \theta)$$ 的 iid 观测，$$f$$ 属于指数族
>
> $$
> f(x \mid \theta) = h(x)\, c(\theta)\, \exp\Bigl( \sum_{i=1}^{k} w_i(\theta)\, t_i(x) \Bigr),
> $$
>
> 其中 $$\boldsymbol{\theta} = (\theta_1, \theta_2, \ldots, \theta_d)$$，$$d \leq k$$。则
>
> $$
> T(\textbf{X}) = \Biggl( \sum_{j=1}^{n} t_1(X_j),\ \ldots,\ \sum_{j=1}^{n} t_k(X_j) \Biggr)
> $$
>
> 是 $$\boldsymbol{\theta}$$ 的充分统计量。

### 6.2.2 最小充分统计量（Minimal Sufficient Statistics）

上一节为所考虑的每个模型找到一个充分统计量。事实上任何问题都存在许多充分统计量。

首先，完整样本 **X** 总是充分统计量：可以把 $$\textbf{X}$$ 的 pdf 或 pmf 写成 $$f(\textbf{x} \mid \theta) = f\bigl( T(\textbf{x}) \mid \theta \bigr)\, h(\textbf{x})$$，其中 $$T(\textbf{x}) = \textbf{x}$$，$$h(\textbf{x}) = 1$$（对一切 **x**）；由因子分解定理 $$T(\textbf{X}) = \textbf{X}$$ 是充分统计量。

其次，充分统计量的一一函数也是充分统计量。设 $$T(\textbf{X})$$ 是充分统计量，并对一切 **x** 定义 $$T^{*}(\textbf{x}) = r\bigl( T(\textbf{x}) \bigr)$$，其中 $$r$$ 是具有逆 $$r^{-1}$$ 的一一函数。由因子分解定理存在 $$g$$ 与 $$h$$ 使

$$
f(\textbf{x} \mid \theta) = g\bigl( T(\textbf{x}) \mid \theta \bigr)\, h(\textbf{x}) = g\bigl( r^{-1}\bigl( T^{*}(\textbf{x}) \bigr) \mid \theta \bigr)\, h(\textbf{x}).
$$

定义 $$g^{*}(t \mid \theta) = g\bigl( r^{-1}(t) \mid \theta \bigr)$$，则

$$
f(\textbf{x} \mid \theta) = g^{*}\bigl( T^{*}(\textbf{x}) \mid \theta \bigr)\, h(\textbf{x}).
$$

故由因子分解定理，$$T^{*}(\textbf{X})$$ 是充分统计量。

由于一个问题中有众多充分统计量，自然会问：某个充分统计量是否比另一个更好？回忆充分统计量的目的是在不丢失关于 $$\theta$$ 的信息的前提下实现数据约简；因此，实现最大数据约简、同时仍保留关于 $$\theta$$ 的全部信息的统计量，可以认为更可取。下面形式化这类统计量的定义。

> **定义 6.2.11（最小充分统计量）**
>
> 若对任何其他充分统计量 $$T'(\textbf{X})$$，$$T(\textbf{x})$$ 都是 $$T'(\textbf{x})$$ 的函数，则称充分统计量 $$T(\textbf{X})$$ 为***最小充分统计量***（minimal sufficient statistic）。

说“$$T(\textbf{x})$$ 是 $$T'(\textbf{x})$$ 的函数”，意思是：若 $$T'(\textbf{x}) = T'(\textbf{y})$$ 则 $$T(\textbf{x}) = T(\textbf{y})$$。用本章开头描述的分割集合的语言：若 $$\{B_{t'} : t' \in \mathcal{T}'\}$$ 是 $$T'(\textbf{x})$$ 的分割集合，$$\{A_t : t \in \mathcal{T}\}$$ 是 $$T(\textbf{x})$$ 的分割集合，则定义 6.2.11 断言每个 $$B_{t'}$$ 都是某个 $$A_t$$ 的子集。于是与最小充分统计量相联系的分割是充分统计量可能的***最粗***分割，最小充分统计量实现了充分统计量可能的最大数据约简。

> **例 6.2.12（两个正态充分统计量）**
>
> 例 6.2.4 考虑的模型是 $$X_1, \ldots, X_n$$ iid $$n(\mu, \sigma^2)$$、$$\sigma^2$$ 已知。用因子分解 (6.2.4) 我们断定 $$T(\textbf{X}) = \bar{X}$$ 是 $$\mu$$ 的充分统计量。本问题中也可以写出因子分解 (6.2.5)（$$\sigma^2$$ 现在是已知值），并正确地断定 $$T'(\textbf{X}) = (\bar{X}, S^2)$$ 是 $$\mu$$ 的充分统计量。显然 $$T(\textbf{X})$$ 实现的数据约简大于 $$T'(\textbf{X})$$：若只知道 $$T(\textbf{X})$$，我们并不知道样本方差。定义函数 $$r(a, b) = a$$ 即可把 $$T(\textbf{x})$$ 写成 $$T'(\textbf{x})$$ 的函数：$$T(\textbf{x}) = \bar{x} = r(\bar{x}, s^2) = r\bigl( T'(\textbf{x}) \bigr)$$。$$T(\textbf{X})$$ 与 $$T'(\textbf{X})$$ 都是充分统计量，故两者包含关于 $$\mu$$ 的相同信息：关于 $$S^2$$ 值的额外信息不增加我们对 $$\mu$$ 的了解，因为总体方差 $$\sigma^2$$ 已知。当然若 $$\sigma^2$$ 未知（如例 6.2.9），则 $$T(\textbf{X}) = \bar{X}$$ 不是充分统计量，$$T'(\textbf{X})$$ 比起 $$T(\textbf{X})$$ 含有关于参数 $$(\mu, \sigma^2)$$ 的更多信息。

用定义 6.2.11 找最小充分统计量并不实用（正如用定义 6.2.1 找充分统计量那样）：我们须先猜测 $$T(\textbf{X})$$ 是最小充分统计量，再验证定义中的条件。（注意例 6.2.12 中我们并未证明 $$\bar{X}$$ 是最小充分统计量。）幸运的是，Lehmann and Scheffé (1950, Theorem 6.3) 的下述结果给出找最小充分统计量的更容易的方法。

> **定理 6.2.13（最小充分性的比值判据）**
>
> 设 $$f(\textbf{x} \mid \theta)$$ 是样本 $$\textbf{X}$$ 的 pmf 或 pdf。设存在函数 $$T(\textbf{x})$$ 使得：对任意两个样本点 **x** 与 **y**，比值 $$f(\textbf{x} \mid \theta) / f(\textbf{y} \mid \theta)$$ 作为 $$\theta$$ 的函数为常数当且仅当 $$T(\textbf{x}) = T(\textbf{y})$$。则 $$T(\textbf{X})$$ 是 $$\theta$$ 的最小充分统计量。
>
> **证明**　为简化证明，设对一切 $$\textbf{x} \in \mathcal{X}$$ 与 $$\theta$$ 有 $$f(\textbf{x} \mid \theta) > 0$$。
>
> 先证 $$T(\textbf{X})$$ 是充分统计量。令 $$\mathcal{T} = \{t : t = T(\textbf{x})\ \text{对某个}\ \textbf{x} \in \mathcal{X}\}$$ 为 $$\mathcal{X}$$ 在 $$T(\textbf{x})$$ 下的像，定义 $$T(\textbf{x})$$ 诱导的分割集合 $$A_t = \{\textbf{x} : T(\textbf{x}) = t\}$$。对每个 $$A_t$$，选定并固定一个元素 $$\textbf{x}_t \in A_t$$。对任意 $$\textbf{x} \in \mathcal{X}$$，$$\textbf{x}_{T(\textbf{x})}$$ 是与 **x** 在同一集合 $$A_{T(\textbf{x})}$$ 中的固定元素。由于 **x** 与 $$\textbf{x}_{T(\textbf{x})}$$ 在同一集合 $$A_t$$ 中，$$T(\textbf{x}) = T\bigl( \textbf{x}_{T(\textbf{x})} \bigr)$$，故 $$f(\textbf{x} \mid \theta) / f\bigl( \textbf{x}_{T(\textbf{x})} \mid \theta \bigr)$$ 作为 $$\theta$$ 的函数为常数。于是可以在 $$\mathcal{X}$$ 上定义函数 $$h(\textbf{x}) = f(\textbf{x} \mid \theta) / f\bigl( \textbf{x}_{T(\textbf{x})} \mid \theta \bigr)$$，且 $$h$$ 不依赖 $$\theta$$；在 $$\mathcal{T}$$ 上定义 $$g(t \mid \theta) = f(\textbf{x}_t \mid \theta)$$。则可见
>
> $$
> f(\textbf{x} \mid \theta) = \frac{f\bigl( \textbf{x}_{T(\textbf{x})} \mid \theta \bigr)\, f(\textbf{x} \mid \theta)}{f\bigl( \textbf{x}_{T(\textbf{x})} \mid \theta \bigr)} = g\bigl( T(\textbf{x}) \mid \theta \bigr)\, h(\textbf{x}),
> $$
>
> 由因子分解定理，$$T(\textbf{X})$$ 是 $$\theta$$ 的充分统计量。
>
> 再证 $$T(\textbf{X})$$ 最小。设 $$T'(\textbf{X})$$ 是任何其他充分统计量。由因子分解定理存在函数 $$g'$$ 与 $$h'$$ 使 $$f(\textbf{x} \mid \theta) = g'\bigl( T'(\textbf{x}) \mid \theta \bigr)\, h'(\textbf{x})$$。设 **x** 与 **y** 是满足 $$T'(\textbf{x}) = T'(\textbf{y})$$ 的任意两个样本点，则
>
> $$
> \frac{f(\textbf{x} \mid \theta)}{f(\textbf{y} \mid \theta)} = \frac{g'\bigl( T'(\textbf{x}) \mid \theta \bigr)\, h'(\textbf{x})}{g'\bigl( T'(\textbf{y}) \mid \theta \bigr)\, h'(\textbf{y})} = \frac{h'(\textbf{x})}{h'(\textbf{y})}.
> $$
>
> 由于该比值不依赖 $$\theta$$，定理的假设蕴含 $$T(\textbf{x}) = T(\textbf{y})$$。故 $$T(\textbf{x})$$ 是 $$T'(\textbf{x})$$ 的函数，$$T(\textbf{x})$$ 最小。 ∎

> **例 6.2.14（正态最小充分统计量）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\mu, \sigma^2)$$，$$\mu$$ 与 $$\sigma^2$$ 都未知。设 **x** 与 **y** 表示两个样本点，$$(\bar{x}, s_x^2)$$ 与 $$(\bar{y}, s_y^2)$$ 分别是对应于 **x** 与 **y** 样本的样本均值与方差。用 (6.2.5)，密度之比为
>
> $$
> \frac{f(\textbf{x} \mid \mu, \sigma^2)}{f(\textbf{y} \mid \mu, \sigma^2)} = \frac{(2 \pi \sigma^2)^{-n/2}\, \exp\bigl( -\bigl[ n (\bar{x} - \mu)^2 + (n - 1)\, s_x^2 \bigr] / (2\sigma^2) \bigr)}{(2 \pi \sigma^2)^{-n/2}\, \exp\bigl( -\bigl[ n (\bar{y} - \mu)^2 + (n - 1)\, s_y^2 \bigr] / (2\sigma^2) \bigr)}
> $$
>
> $$
> = \exp\Biggl( \frac{-n (\bar{x}^2 - \bar{y}^2) + 2 n \mu (\bar{x} - \bar{y}) - (n - 1) (s_x^2 - s_y^2)}{2 \sigma^2} \Biggr).
> $$
>
> 该比值作为 $$\mu$$ 与 $$\sigma^2$$ 的函数为常数，当且仅当 $$\bar{x} = \bar{y}$$ 且 $$s_x^2 = s_y^2$$。故由定理 6.2.13，$$(\bar{X}, S^2)$$ 是 $$(\mu, \sigma^2)$$ 的最小充分统计量。

若使 pdf 或 pmf 为正的 **x** 集合依赖参数 $$\theta$$，则要使定理 6.2.13 中的比值作为 $$\theta$$ 的函数为常数，分子与分母必须对完全相同的 $$\theta$$ 值为正。这一限制通常反映在最小充分统计量中，如下例所示。

> **例 6.2.15（均匀最小充分统计量）**
>
> 设 $$X_1, \ldots, X_n$$ 是区间 $$(\theta, \theta + 1)$$（$$-\infty < \theta < \infty$$）上均匀分布的 iid 观测。则 $$\textbf{X}$$ 的联合 pdf 为
>
> $$
> f(\textbf{x} \mid \theta) = \begin{cases} 1 & \theta < x_i < \theta + 1,\ i = 1, \ldots, n,\\ 0 & \text{其他}, \end{cases}
> $$
>
> 它可写为
>
> $$
> f(\textbf{x} \mid \theta) = \begin{cases} 1 & \max_i x_i - 1 < \theta < \min_i x_i,\\ 0 & \text{其他}. \end{cases}
> $$
>
> 于是对两个样本点 **x** 与 **y**，比值 $$f(\textbf{x} \mid \theta)/f(\textbf{y} \mid \theta)$$ 的分子与分母对相同的 $$\theta$$ 值为正当且仅当 $$\min_i x_i = \min_i y_i$$ 且 $$\max_i x_i = \max_i y_i$$。而且若最小值与最大值都相等，则比值为常数（实际上等于 1）。故令 $$X_{(1)} = \min_i X_i$$，$$X_{(n)} = \max_i X_i$$，则 $$T(\textbf{X}) = (X_{(1)}, X_{(n)})$$ 是最小充分统计量。这是一个最小充分统计量的维数与参数维数不匹配的例子。

最小充分统计量不唯一：最小充分统计量的任何一一函数也是最小充分统计量。例如在例 6.2.15 中，$$T'(\textbf{X}) = \bigl( X_{(n)} - X_{(1)},\ (X_{(n)} + X_{(1)})/2 \bigr)$$ 也是最小充分统计量；在例 6.2.14 中，$$T'(\textbf{X}) = \bigl( \sum_{i=1}^{n} X_i,\ \sum_{i=1}^{n} X_i^2 \bigr)$$ 也是最小充分统计量。

### 6.2.3 辅助统计量（Ancillary Statistics）

前面各节考虑的是充分统计量：它们在某种意义上包含样本中关于 $$\theta$$ 的全部可得信息。本节引入另一类目的互补的统计量。

> **定义 6.2.16（辅助统计量）**
>
> 分布不依赖于参数 $$\theta$$ 的统计量 $$S(\textbf{X})$$ 称为***辅助统计量***（ancillary statistic）。

单独来看，辅助统计量不含关于 $$\theta$$ 的任何信息：它是对一个分布固定且已知、与 $$\theta$$ 无关的随机变量的观测。吊诡的是，辅助统计量与其他统计量联用时，有时确实含有对 $$\theta$$ 推断有价值的信息；这一行为将在下一节考察。现在先给出辅助统计量的一些例子。

> **例 6.2.17（均匀辅助统计量）**
>
> 如例 6.2.15，设 $$X_1, \ldots, X_n$$ 是 $$(\theta, \theta + 1)$$（$$-\infty < \theta < \infty$$）上均匀分布的 iid 观测，$$X_{(1)} < \cdots < X_{(n)}$$ 为样本的次序统计量。下面通过证明极差统计量 $$R = X_{(n)} - X_{(1)}$$ 的 pdf 不依赖 $$\theta$$ 来说明 $$R$$ 是辅助统计量。回忆每个 $$X_i$$ 的 cdf 为
>
> $$
> F(x \mid \theta) = \begin{cases} 0 & x \leq \theta,\\ x - \theta & \theta < x < \theta + 1,\\ 1 & \theta + 1 \leq x. \end{cases}
> $$
>
> 于是由 (5.4.6)（原书编号 (5.5.7)），$$X_{(1)}$$ 与 $$X_{(n)}$$ 的联合 pdf 为
>
> $$
> g\bigl( x_{(1)}, x_{(n)} \mid \theta \bigr) = \begin{cases} n\, (n - 1)\, \bigl( x_{(n)} - x_{(1)} \bigr)^{n - 2} & \theta < x_{(1)} < x_{(n)} < \theta + 1,\\ 0 & \text{其他}. \end{cases}
> $$
>
> 做变换 $$R = X_{(n)} - X_{(1)}$$ 与 $$M = (X_{(1)} + X_{(n)})/2$$（逆变换 $$X_{(1)} = (2M - R)/2$$，$$X_{(n)} = (2M + R)/2$$，雅可比为 1），可见 $$R$$ 与 $$M$$ 的联合 pdf 为
>
> $$
> h(r, m \mid \theta) = \begin{cases} n\, (n - 1)\, r^{n - 2} & 0 < r < 1,\ \theta + (r/2) < m < \theta + 1 - (r/2),\\ 0 & \text{其他}. \end{cases}
> $$
>
> （注意 $$h(r, m \mid \theta)$$ 相当复杂的正性区域。）于是 $$R$$ 的 pdf 为
>
> $$
> h(r \mid \theta) = \int_{\theta + (r/2)}^{\theta + 1 - (r/2)} n\, (n - 1)\, r^{n - 2}\, dm = n\, (n - 1)\, r^{n - 2}\, (1 - r), \qquad 0 < r < 1.
> $$
>
> 这是 $$\alpha = n - 1$$、$$\beta = 2$$ 的贝塔 pdf。更重要的是：该 pdf 对一切 $$\theta$$ 相同。故 $$R$$ 的分布不依赖 $$\theta$$，$$R$$ 是辅助的。

例 6.2.17 中极差统计量是辅助的，因为所考虑的模型是位置参数模型。$$R$$ 的辅助性并不依赖诸 $$X_i$$ 的均匀性，而依赖分布的参数是位置参数这一事实。现在考虑一般的位置参数模型。

> **例 6.2.18（位置族的辅助统计量）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自位置参数族（cdf $$F(x - \theta)$$，$$-\infty < \theta < \infty$$）的 iid 观测。我们将证明极差 $$R = X_{(n)} - X_{(1)}$$ 是辅助统计量。用定理 3.5.6，在 $$Z_1, \ldots, Z_n$$（来自 $$F(x)$$ 即 $$\theta = 0$$ 的 iid 观测）上工作，$$X_1 = Z_1 + \theta, \ldots, X_n = Z_n + \theta$$。于是极差统计量 $$R$$ 的 cdf 为
>
> $$
> \begin{aligned}
> F_R(r \mid \theta) &= P_{\theta}(R \leq r) = P_{\theta}\Bigl( \max_i X_i - \min_i X_i \leq r \Bigr)\\
> &= P_{\theta}\Bigl( \max_i (Z_i + \theta) - \min_i (Z_i + \theta) \leq r \Bigr)\\
> &= P_{\theta}\Bigl( \max_i Z_i - \min_i Z_i + \theta - \theta \leq r \Bigr)\\
> &= P_{\theta}\Bigl( \max_i Z_i - \min_i Z_i \leq r \Bigr).
> \end{aligned}
> $$
>
> 最后的概率不依赖 $$\theta$$，因为 $$Z_1, \ldots, Z_n$$ 的分布不依赖 $$\theta$$。故 $$R$$ 的 cdf 不依赖 $$\theta$$，从而 $$R$$ 是辅助统计量。

> **例 6.2.19（尺度族的辅助统计量）**
>
> 尺度参数族也有某些类型的辅助统计量。设 $$X_1, \ldots, X_n$$ 是来自尺度参数族（cdf $$F(x/\sigma)$$，$$\sigma > 0$$）的 iid 观测。则只通过 $$n - 1$$ 个值 $$X_1 / X_n, \ldots, X_{n-1} / X_n$$ 依赖样本的任何统计量都是辅助统计量。例如
>
> $$
> \frac{X_1 + \cdots + X_n}{X_n} = \frac{X_1}{X_n} + \cdots + \frac{X_{n-1}}{X_n} + 1
> $$
>
> 是辅助统计量。为看清这一事实，设 $$Z_1, \ldots, Z_n$$ 是来自 $$F(x)$$（即 $$\sigma = 1$$）的 iid 观测，$$X_i = \sigma\, Z_i$$。则 $$X_1 / X_n, \ldots, X_{n-1} / X_n$$ 的联合 cdf 为
>
> $$
> \begin{aligned}
> F(y_1, \ldots, y_{n-1} \mid \sigma) &= P_{\sigma}\Bigl( X_1 / X_n \leq y_1,\ \ldots,\ X_{n-1} / X_n \leq y_{n-1} \Bigr)\\
> &= P_{\sigma}\Bigl( \sigma Z_1 / (\sigma Z_n) \leq y_1,\ \ldots,\ \sigma Z_{n-1} / (\sigma Z_n) \leq y_{n-1} \Bigr)\\
> &= P_{\sigma}\Bigl( Z_1 / Z_n \leq y_1,\ \ldots,\ Z_{n-1} / Z_n \leq y_{n-1} \Bigr).
> \end{aligned}
> $$
>
> 最后的概率不依赖 $$\sigma$$，因为 $$Z_1, \ldots, Z_n$$ 的分布不依赖 $$\sigma$$。所以 $$X_1/X_n, \ldots, X_{n-1}/X_n$$ 的分布独立于 $$\sigma$$，这些量的任何函数的分布也是如此。
>
> 特别地，设 $$X_1$$ 与 $$X_2$$ 是 iid $$n(0, \sigma^2)$$ 观测。由上述结果，$$X_1 / X_2$$ 的分布对每个 $$\sigma$$ 值都相同；而例 4.3.6 中已见：当 $$\sigma = 1$$ 时 $$X_1/X_2$$ 服从 $$\mathrm{Cauchy}(0, 1)$$ 分布。故对任意 $$\sigma > 0$$，$$X_1/X_2$$ 的分布都是这同一个柯西分布。

本节对各种模型给出了一些（有些相当一般的）辅助统计量的例子。下一节将考虑充分统计量与辅助统计量之间的关系。

### 6.2.4 充分、辅助与完备统计量（Sufficient, Ancillary, and Complete Statistics）

最小充分统计量实现了在仍保留关于参数 $$\theta$$ 的全部信息的前提下可能的最大数据约简。直观上，最小充分统计量剔除了样本中所有无关的信息，只保留含有 $$\theta$$ 信息的那部分。由于辅助统计量的分布不依赖 $$\theta$$，人们可能猜想最小充分统计量与辅助统计量无关（用数学语言说，函数独立）。然而这未必成立。本节详细考察这一关系。

我们已经讨论过辅助统计量与最小充分统计量不独立的情形。回顾例 6.2.15：$$X_1, \ldots, X_n$$ 是 uniform$(\theta, \theta + 1)$$ 分布的 iid 观测。6.2.2 节末尾我们注意到统计量 $$\bigl( X_{(n)} - X_{(1)},\ (X_{(n)} + X_{(1)})/2 \bigr)$$ 是最小充分统计量，而例 6.2.17 中我们证明了 $$X_{(n)} - X_{(1)}$$ 是辅助统计量。于是此处辅助统计量是最小充分统计量的重要组成部分；辅助统计量与最小充分统计量当然不独立。

为强调辅助统计量有时能为关于 $$\theta$$ 的推断提供重要信息这一点，再举一例。

> **例 6.2.20（辅助统计量与精度）**
>
> 设 $$X_1$$ 与 $$X_2$$ 是满足
>
> $$
> P_{\theta}(X = \theta) = P_{\theta}(X = \theta + 1) = P_{\theta}(X = \theta + 2) = \frac{1}{3}
> $$
>
> 的离散分布的 iid 观测，其中未知参数 $$\theta$$ 是任意整数。设 $$X_{(1)} \leq X_{(2)}$$ 为样本的次序统计量。用类似例 6.2.15 的论证可以证明 $$(R, M)$$ 是最小充分统计量，其中 $$R = X_{(2)} - X_{(1)}$$，$$M = (X_{(1)} + X_{(2)})/2$$。由于这是位置参数族，由例 6.2.17 的道理，$$R$$ 是辅助统计量。为看 $$R$$ 如何可能在辅助的同时仍提供关于 $$\theta$$ 的信息，考虑样本点 $$(r, m)$$，其中 $$m$$ 是整数。只考虑 $$m$$：要使该样本点有正概率，$$\theta$$ 必须是三个值之一——$$\theta = m$$、$$\theta = m - 1$$ 或 $$\theta = m - 2$$。仅有“$$M = m$$”的信息时，三个 $$\theta$$ 值都有可能。但现在假设获得额外信息 $$R = 2$$，则必有 $$X_{(1)} = m - 1$$ 且 $$X_{(2)} = m + 1$$；有了这一额外信息，$$\theta$$ 唯一可能的取值是 $$\theta = m - 1$$。于是辅助统计量 $$R$$ 的取值知识增进了我们对 $$\theta$$ 的了解。当然，单独知道 $$R$$ 不会提供关于 $$\theta$$ 的任何信息。（辅助统计量提供关于 $$\theta$$ 估计精度的想法并不新鲜；更多想法见 Cox (1971) 或 Efron and Hinkley (1978)。）

然而对许多重要情形，“最小充分统计量与任何辅助统计量独立”这一直觉是正确的。描述这类情形依赖下面的定义。

> **定义 6.2.21（完备性）**
>
> 设 $$f(t \mid \theta)$$ 是统计量 $$T(\textbf{X})$$ 的一族 pdf 或 pmf。若“对所有 $$\theta$$ 有 $$\mathrm{E}_{\theta}\, g(T) = 0$$”蕴含“对所有 $$\theta$$ 有 $$P_{\theta}\bigl( g(T) = 0 \bigr) = 1$$”，则称这族概率分布是***完备的***（complete）；等价地，称 $$T(\textbf{X})$$ 是完备统计量（complete statistic）。

注意完备性是概率分布***族***的性质，而非单个分布的性质。例如若 $$X$$ 服从 $$n(0, 1)$$ 分布，定义 $$g(x) = x$$，则 $$\mathrm{E} g(X) = \mathrm{E} X = 0$$，但函数 $$g(x) = x$$ 满足 $$P\bigl( g(X) = 0 \bigr) = P(X = 0) = 0$$ 而非 1。不过这只是单个分布，不是分布族。若 $$X$$ 服从 $$n(\theta, 1)$$ 分布（$$-\infty < \theta < \infty$$），我们将看到：除对所有 $$\theta$$ 都以概率 1 为零的函数外，没有 $$X$$ 的函数满足 $$\mathrm{E}_{\theta} g(X) = 0$$ 对一切 $$\theta$$ 成立。故 $$n(\theta, 1)$$ 分布族（$$-\infty < \theta < \infty$$）是完备的。

> **例 6.2.22（二项完备充分统计量）**
>
> 设 $$T$$ 服从 $$\mathrm{binomial}(n, p)$$ 分布（$$0 < p < 1$$）。设 $$g$$ 是使 $$\mathrm{E}_p\, g(T) = 0$$ 的函数。则
>
> $$
> 0 = \mathrm{E}_p\, g(T) = \sum_{t=0}^{n} g(t)\, \binom{n}{t}\, p^{t} (1 - p)^{n - t} = (1 - p)^{n} \sum_{t=0}^{n} g(t)\, \binom{n}{t}\, \Bigl( \frac{p}{1 - p} \Bigr)^{t}
> $$
>
> 对一切 $$p \in (0, 1)$$ 成立。因子 $$(1 - p)^{n}$$ 在此范围内不为零。故必有
>
> $$
> 0 = \sum_{t=0}^{n} g(t)\, \binom{n}{t}\, \Bigl( \frac{p}{1 - p} \Bigr)^{t} = \sum_{t=0}^{n} g(t)\, \binom{n}{t}\, r^{t}
> $$
>
> 对一切 $$r \in (0, \infty)$$ 成立。但最后的表达式是 $$r$$ 的 $$n$$ 次多项式，$$r^t$$ 的系数是 $$g(t) \binom{n}{t}$$。多项式对一切 $$r$$ 为零，则每个系数必须为零。诸 $$\binom{n}{t}$$ 都不为零，故 $$g(t) = 0$$（$$t = 0, 1, \ldots, n$$）。由于 $$T$$ 以概率 1 取值 $$0, 1, \ldots, n$$，这就给出 $$P_p\bigl( g(T) = 0 \bigr) = 1$$（对一切 $$p$$），即所需的结论。故 $$T$$ 是完备统计量。

> **例 6.2.23（均匀完备统计量）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid uniform$(0, \theta)$$ 观测（$$0 < \theta < \infty$$）。用类似例 6.2.8 的论证可证 $$T(\textbf{X}) = \max_i X_i$$ 是充分统计量；由定理 5.4.4，$$T(\textbf{X})$$ 的 pdf 为
>
> $$
> f(t \mid \theta) = \begin{cases} n\, t^{n - 1}\, \theta^{-n} & 0 < t < \theta,\\ 0 & \text{其他}. \end{cases}
> $$
>
> 设 $$g(t)$$ 是满足 $$\mathrm{E}_{\theta}\, g(T) = 0$$（对一切 $$\theta$$）的函数。由于 $$\mathrm{E}_{\theta}\, g(T)$$ 作为 $$\theta$$ 的函数是常数，其对 $$\theta$$ 的导数为 0。于是
>
> $$
> \begin{aligned}
> 0 &= \frac{d}{d\theta}\, \mathrm{E}_{\theta}\, g(T) = \frac{d}{d\theta} \int_0^{\theta} g(t)\, n\, t^{n - 1}\, \theta^{-n}\, dt\\
> &= \frac{d}{d\theta}\, \bigl( \theta^{-n} \bigr) \int_0^{\theta} n\, g(t)\, t^{n - 1}\, dt + \frac{d}{d\theta}\, \theta^{-n}\, n\, g(\theta)\, \theta^{n - 1} \qquad （\text{乘积求导法则}）\\
> &= \theta^{-n}\, n\, g(\theta)\, \theta^{n - 1} + 0 = \theta^{-1}\, n\, g(\theta).
> \end{aligned}
> $$
>
> 倒数第二行的第一项来自微积分基本定理的应用；第二项为 0，因为该积分除一个常数外正是 $$\mathrm{E}_{\theta}\, g(T)$$，其为 0。由 $$\theta^{-1}\, n\, g(\theta) = 0$$ 且 $$\theta^{-1}\, n \neq 0$$，必有 $$g(\theta) = 0$$。这对每个 $$\theta > 0$$ 都成立，故 $$T$$ 是完备统计量。（稍带学究气地指出：微积分基本定理并不适用于所有函数，只适用于黎曼可积函数；等式 $$\frac{d}{d\theta} \int_0^{\theta} g(t)\, dt = g(\theta)$$ 只在黎曼可积 $$g$$ 的连续点成立。因此严格地说，上述论证并未证明 $$T$$ 是完备统计量，因为完备性条件适用于一切函数而不仅是黎曼可积的。不过从更实际的角度看，这一区分无关紧要，因为黎曼可积性条件如此宽泛，几乎涵盖我们能想到的任何函数。）

现在用完备性陈述“最小充分统计量与每个辅助统计量独立”的条件。

> **定理 6.2.24（Basu 定理，Basu's Theorem）**
>
> 若 $$T(\textbf{X})$$ 是完备的最小充分统计量，则 $$T(\textbf{X})$$ 与每个辅助统计量独立。
>
> **证明**　只给出离散分布的证明。
>
> 设 $$S(\textbf{X})$$ 是任何辅助统计量。则 $$P\bigl( S(\textbf{X}) = s \bigr)$$ 不依赖 $$\theta$$（因为 $$S(\textbf{X})$$ 辅助）。又条件概率
>
> $$
> P\bigl( S(\textbf{X}) = s \mid T(\textbf{X}) = t \bigr) = P\Bigl( \textbf{X} \in \{ \textbf{x} : S(\textbf{x}) = s \} \,\Big\vert \, T(\textbf{X}) = t \Bigr)
> $$
>
> 不依赖 $$\theta$$，因为 $$T(\textbf{X})$$ 是充分统计量（回忆定义！）。于是要证 $$S(\textbf{X})$$ 与 $$T(\textbf{X})$$ 独立，只需证明对一切可能的 $$t \in \mathcal{T}$$ 有
>
> $$
> P\bigl( S(\textbf{X}) = s \mid T(\textbf{X}) = t \bigr) = P\bigl( S(\textbf{X}) = s \bigr). \tag{6.2.6}
> $$
>
> 现在
>
> $$
> P\bigl( S(\textbf{X}) = s \bigr) = \sum_{t \in \mathcal{T}} P\bigl( S(\textbf{X}) = s \mid T(\textbf{X}) = t \bigr)\, P_{\theta}\bigl( T(\textbf{X}) = t \bigr).
> $$
>
> 又因 $$\sum_{t \in \mathcal{T}} P_{\theta}\bigl( T(\textbf{X}) = t \bigr) = 1$$，可写
>
> $$
> P\bigl( S(\textbf{X}) = s \bigr) = \sum_{t \in \mathcal{T}} P\bigl( S(\textbf{X}) = s \bigr)\, P_{\theta}\bigl( T(\textbf{X}) = t \bigr).
> $$
>
> 于是若定义统计量
>
> $$
> g(t) = P\bigl( S(\textbf{X}) = s \mid T(\textbf{X}) = t \bigr) - P\bigl( S(\textbf{X}) = s \bigr),
> $$
>
> 上述两个等式表明
>
> $$
> \mathrm{E}_{\theta}\, g(T) = \sum_{t \in \mathcal{T}} g(t)\, P_{\theta}\bigl( T(\textbf{X}) = t \bigr) = 0 \qquad \text{（对一切}\ \theta\text{）}.
> $$
>
> 由于 $$T(\textbf{X})$$ 是完备统计量，这意味着 $$g(t) = 0$$ 对一切可能的 $$t \in \mathcal{T}$$ 成立，(6.2.6) 得证。 ∎

Basu 定理的用处在于：它使我们无需求两个统计量的联合分布就能推断它们的独立性。使用 Basu 定理需要证明统计量完备，这有时是相当困难的解析问题。幸运的是，我们关心的大多数问题都由下述定理覆盖。我们不证明该定理，但指出其证明依赖拉普拉斯变换的唯一性——2.3 节提到过的性质。

> **定理 6.2.25（指数族中的完备统计量）**
>
> 设 $$X_1, \ldots, X_n$$ 是来自指数族的 iid 观测，pdf 或 pmf 形如
>
> $$
> f(x \mid \boldsymbol{\theta}) = h(x)\, c(\boldsymbol{\theta})\, \exp\Bigl( \sum_{j=1}^{k} w(\theta_j)\, t_j(x) \Bigr), \tag{6.2.7}
> $$
>
> 其中 $$\boldsymbol{\theta} = (\theta_1, \theta_2, \ldots, \theta_k)$$。则统计量
>
> $$
> T(\textbf{X}) = \Biggl( \sum_{i=1}^{n} t_1(X_i),\ \ldots,\ \sum_{i=1}^{n} t_k(X_i) \Biggr)
> $$
>
> 是完备的，只要参数空间 $$\Theta$$ 包含 $$\Re^k$$ 中的一个开集。

参数空间包含开集的条件用于避免如下情形：$$n(\theta, \theta^2)$$ 分布可以写成 (6.2.7) 的形式，但参数空间 $$(\theta, \theta^2)$$ 不含二维开集——它只是抛物线上的点集。结果是可以找到 $$T(\textbf{X})$$ 的一个变换，它是零的无偏估计（见习题 6.15）。（回忆像 $$n(\theta, \theta^2)$$ 这样参数空间为低维曲线的指数族称为曲线指数族；见 3.4 节。）指数族中充分性、完备性与最小性之间的关系颇为有趣；简介见杂记 6.6.3。

现在给出使用 Basu 定理、定理 6.2.25 以及本章许多先前结果的例子。

> **例 6.2.26（使用 Basu 定理——I）**
>
> 设 $$X_1, \ldots, X_n$$ 是参数 $$\theta$$ 的 iid 指数观测。考虑计算
>
> $$
> g(\textbf{X}) = \frac{X_n}{X_1 + \cdots + X_n}
> $$
>
> 的期望。首先注意指数分布构成尺度参数族，故由例 6.2.19，$$g(\textbf{X})$$ 是辅助统计量。指数分布也构成具有 $$t(x) = x$$ 的指数族，故由定理 6.2.25，
>
> $$
> T(\textbf{X}) = \sum_{i=1}^{n} X_i
> $$
>
> 是完备统计量；由定理 6.2.10，$$T(\textbf{X})$$ 是充分统计量。（如下文所注，我们无需验证 $$T(\textbf{X})$$ 最小，尽管用定理 6.2.13 可以轻易验证。）于是由 Basu 定理，$$T(\textbf{X})$$ 与 $$g(\textbf{X})$$ 独立。因此
>
> $$
> \theta = \mathrm{E}_{\theta}\, X_n = \mathrm{E}_{\theta}\, \bigl[ T(\textbf{X})\, g(\textbf{X}) \bigr] = \bigl( \mathrm{E}_{\theta}\, T(\textbf{X}) \bigr) \bigl( \mathrm{E}_{\theta}\, g(\textbf{X}) \bigr) = n \theta\, \mathrm{E}_{\theta}\, g(\textbf{X}).
> $$
>
> 故对任意 $$\theta$$，$$\mathrm{E}_{\theta}\, g(\textbf{X}) = \dfrac{1}{n}$$。

> **例 6.2.27（使用 Basu 定理——II）**
>
> 作为 Basu 定理用法的另一例，我们考虑来自 $$n(\mu, \sigma^2)$$ 总体抽样时样本均值与方差 $$\bar{X}$$ 与 $$S^2$$ 的独立性。定理 5.3.1 中当然已经证明了这两个统计量独立，这里在如此重要的语境下演示 Basu 定理的使用。先设 $$\sigma^2$$ 固定、$$\mu$$ 变动（$$-\infty < \mu < \infty$$）。由例 6.2.4，$$\bar{X}$$ 是 $$\mu$$ 的充分统计量；定理 6.2.25 可用于推出 $$n(\mu, \sigma^2/n)$$ 分布族（$$-\infty < \mu < \infty$$，$$\sigma^2/n$$ 已知）是完备族。由于这就是 $$\bar{X}$$ 的分布，$$\bar{X}$$ 是完备统计量。再看 $$S^2$$：用类似例 6.2.18 与 6.2.19 的论证可以证明，在任何位置参数族中（记住 $$\sigma^2$$ 固定，$$\mu$$ 是位置参数），$$S^2$$ 是辅助统计量；或者对本正态模型可用定理 5.3.1 看到 $$S^2$$ 的分布依赖固定量 $$\sigma^2$$ 但不依赖参数 $$\mu$$。无论哪条路，$$S^2$$ 都是辅助的，故由 Basu 定理，$$S^2$$ 与完备充分统计量 $$\bar{X}$$ 独立：对任意 $$\mu$$ 与固定的 $$\sigma^2$$，$$\bar{X}$$ 与 $$S^2$$ 独立。而由于 $$\sigma^2$$ 是任意取的，样本均值与方差对任何 $$\mu$$ 与 $$\sigma^2$$ 的选择都独立。注意当 $$\mu$$ 与 $$\sigma^2$$ 都未知时，本模型中 $$\bar{X}$$ 与 $$S^2$$ 都不是辅助的；但通过上述论证仍能用 Basu 定理推出独立性。这类论证有时有用，但事实仍然是：证明统计量完备往往比证明两个统计量独立更难。

应当指出：Basu 定理的证明并未用到充分统计量的“最小性”。事实上去掉这个词定理仍然成立，因为完备统计量的基本性质之一就是它是最小的。

> **定理 6.2.28（完备统计量的最小性）**
>
> 若最小充分统计量存在，则任何完备统计量也是最小充分统计量。

所以尽管 Basu 定理陈述中“最小”一词是冗余的，仍这样表述，以提醒定理中的统计量 $$T(\textbf{X})$$ 是最小充分统计量。（完备统计量与最小充分统计量关系的更多内容见 Lehmann and Scheffé 1950 与 Schervish 1995, Section 2.1。）

Basu 定理借助完备统计量的概念给出了充分统计量与辅助统计量之间的一种关系。辅助性与完备性还有其他可能的定义；这些定义下充分性与辅助性的某些关系由 Lehmann (1981) 讨论。

## 6.3 似然原理（The Likelihood Principle）

本节研究一个具体的、重要的统计量——似然函数，它同样可用于汇总数据。似然函数有许多用法，本节提及其中一些，后续章节提到另一些。但本节的主要考虑是一个论证：若接受某些其他原理，则似然函数必须用作数据约简的工具。

### 6.3.1 似然函数（The Likelihood Function）

> **定义 6.3.1（似然函数）**
>
> 设 $$f(\textbf{x} \mid \theta)$$ 表示样本 $$\textbf{X} = (X_1, \ldots, X_n)$$ 的联合 pdf 或 pmf。则在观测到 $$\textbf{X} = \textbf{x}$$ 的条件下，由
>
> $$
> L(\theta \mid \textbf{x}) = f(\textbf{x} \mid \theta)
> $$
>
> 定义的 $$\theta$$ 的函数称为似然函数（likelihood function）。

若 $$\textbf{X}$$ 是离散随机向量，则 $$L(\theta \mid \textbf{x}) = P_{\theta}(\textbf{X} = \textbf{x})$$。若在两个参数点比较似然函数并发现

$$
P_{\theta_1}(\textbf{X} = \textbf{x}) = L(\theta_1 \mid \textbf{x}) > L(\theta_2 \mid \textbf{x}) = P_{\theta_2}(\textbf{X} = \textbf{x}),
$$

则实际观测到的样本在 $$\theta = \theta_1$$ 时发生比在 $$\theta = \theta_2$$ 时更可能；这可以解释为：对 $$\theta$$ 的真值而言，$$\theta_1$$ 是比 $$\theta_2$$ 更可信的取值。使用这一信息的方式有许多种，但考察我们实际观测到的样本在各种可能 $$\theta$$ 值下的概率，无疑是合理的。这正是似然函数提供的信息。

若 $$X$$ 是连续实值随机变量且 $$X$$ 的 pdf 关于 $$x$$ 连续，则对小 $$\varepsilon$$，$$P_{\theta}(x - \varepsilon < X < x + \varepsilon) \approx 2\varepsilon\, f(x \mid \theta) = 2\varepsilon\, L(\theta \mid x)$$（由导数的定义）。于是

$$
\frac{P_{\theta_1}(x - \varepsilon < X < x + \varepsilon)}{P_{\theta_2}(x - \varepsilon < X < x + \varepsilon)} \approx \frac{L(\theta_1 \mid x)}{L(\theta_2 \mid x)},
$$

在两个参数值处比较似然函数，同样给出观测样本值 $$x$$ 的概率的近似比较。

定义 6.3.1 似乎几乎把似然函数定义得与 pdf 或 pmf 一样。这两个函数的唯一区别在于哪个变量视为固定、哪个变量在变动：考虑 pdf 或 pmf $$f(\textbf{x} \mid \theta)$$ 时，我们把 $$\theta$$ 视为固定、$$\textbf{x}$$ 为变量；考虑似然函数 $$L(\theta \mid \textbf{x})$$ 时，我们把 $$\textbf{x}$$ 视为已观测的样本点、$$\theta$$ 在一切可能参数值上变动。

> **例 6.3.2（负二项似然）**
>
> 设 $$X$$ 服从 $$r = 3$$、成功概率 $$p$$ 的负二项分布。若观测到 $$x = 2$$，则似然函数是 $$0 \leq p \leq 1$$ 上的五次多项式：
>
> $$
> L(p \mid 2) = P_p(X = 2) = \binom{4}{2}\, p^{3} (1 - p)^{2}.
> $$
>
> 一般地，若观测到 $$X = x$$，则似然函数是 $$3 + x$$ 次多项式：
>
> $$
> L(p \mid x) = \binom{3 + x - 1}{x}\, p^{3} (1 - p)^{x}.
> $$

似然原理规定似然函数应如何用作数据约简工具。

> **似然原理（Likelihood Principle）**
>
> 若 **x** 与 **y** 是两个样本点，使得 $$L(\theta \mid \textbf{x})$$ 与 $$L(\theta \mid \textbf{y})$$ 成比例，即存在常数 $$C(\textbf{x}, \textbf{y})$$ 使
>
> $$
> L(\theta \mid \textbf{x}) = C(\textbf{x}, \textbf{y})\, L(\theta \mid \textbf{y}) \qquad \text{（对一切}\ \theta\text{）}, \tag{6.3.1}
> $$
>
> 则由 **x** 与由 **y** 得出的结论应当相同。

注意 (6.3.1) 中的常数 $$C(\textbf{x}, \textbf{y})$$ 对不同的 $$(\textbf{x}, \textbf{y})$$ 对可以不同，但 $$C(\textbf{x}, \textbf{y})$$ 不依赖 $$\theta$$。

在 $$C(\textbf{x}, \textbf{y}) = 1$$ 的特殊情形，似然原理说：若两个样本点导致相同的似然函数，则它们包含关于 $$\theta$$ 的相同信息。但似然原理走得更远：它断言即使两个样本点只有成比例的似然，它们包含的关于 $$\theta$$ 的信息也是等价的。理由是：似然函数用于比较各参数值的可信度；若 $$L(\theta_2 \mid \textbf{x}) = 2 L(\theta_1 \mid \textbf{x})$$，则在某种意义上 $$\theta_2$$ 的可信度是 $$\theta_1$$ 的两倍。若 (6.3.1) 也成立，则 $$L(\theta_2 \mid \textbf{y}) = 2 L(\theta_1 \mid \textbf{y})$$，故无论观测 **x** 还是 **y**，我们都得出“$$\theta_2$$ 的可信度是 $$\theta_1$$ 的两倍”的结论。

上一段我们小心地使用了“可信”（plausible）而非“可能”（probable），因为我们常把 $$\theta$$ 想成固定的（尽管未知）值；而且虽然 $$f(\textbf{x} \mid \theta)$$ 作为 $$\textbf{x}$$ 的函数是 pdf，但 $$L(\theta \mid \textbf{x})$$ 作为 $$\theta$$ 的函数并不保证是 pdf。

一种称为信仰推断（fiducial inference）的推断形式有时把似然解释为关于 $$\theta$$ 的概率：即把 $$L(\theta \mid \textbf{x})$$ 乘以 $$M(\textbf{x}) = \Bigl( \int_{-\infty}^{\infty} L(\theta \mid \textbf{x})\, d\theta \Bigr)^{-1}$$（参数空间可数时积分换成求和），然后把 $$M(\textbf{x}) L(\theta \mid \textbf{x})$$ 解释为 $$\theta$$ 的 pdf（前提当然是 $$M(\textbf{x})$$ 有限！）。显然满足 (6.3.1) 的 $$L(\theta \mid \textbf{x})$$ 与 $$L(\theta \mid \textbf{y})$$ 给出相同的 pdf，因为常数 $$C(\textbf{x}, \textbf{y})$$ 会被吸收进归一化常数。多数统计学家不赞同信仰推断理论，但它历史悠久，可追溯到 Fisher (1930) 关于逆概率（inverse probability，概率积分变换的一个应用）的工作。为存历史之真，这里计算一个信仰分布。

> **例 6.3.3（正态信仰分布）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\mu, \sigma^2)$$，$$\sigma^2$$ 已知。用 $$L(\mu \mid \textbf{x})$$ 的表达式 (6.2.4)，首先注意 (6.3.1) 成立当且仅当 $$\bar{x} = \bar{y}$$，此时
>
> $$
> C(\textbf{x}, \textbf{y}) = \exp\Biggl( \frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{2 \sigma^2} - \frac{\sum_{i=1}^{n} (y_i - \bar{y})^2}{2 \sigma^2} \Biggr).
> $$
>
> 故似然原理断言：对任何两个满足 $$\bar{x} = \bar{y}$$ 的样本点，关于 $$\mu$$ 应当得出相同的结论。为计算 $$\mu$$ 的信仰 pdf，注意若定义
>
> $$
> M(\textbf{x}) = n^{n/2}\, \exp\Biggl( \frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{2 \sigma^2} \Biggr),
> $$
>
> 则 $$M(\textbf{x})\, L(\mu \mid \textbf{x})$$（作为 $$\mu$$ 的函数）是 $$n(\bar{x}, \sigma^2/n)$$ pdf。这就是 $$\mu$$ 的信仰分布；信仰论者可以对 $$\mu$$ 做如下概率计算：参数 $$\mu$$ 具有 $$n(\bar{x}, \sigma^2/n)$$ 分布，故 $$(\mu - \bar{x})/(\sigma/\sqrt{n})$$ 服从 $$n(0,1)$$。于是
>
> $$
> \begin{aligned}
> 0.95 &= P\Biggl( -1.96 < \frac{\mu - \bar{x}}{\sigma / \sqrt{n}} < 1.96 \Biggr)\\
> &= P\Bigl( -1.96\, \sigma / \sqrt{n} < \mu - \bar{x} < 1.96\, \sigma / \sqrt{n} \Bigr)\\
> &= P\Bigl( \bar{x} - 1.96\, \sigma / \sqrt{n} < \mu < \bar{x} + 1.96\, \sigma / \sqrt{n} \Bigr).
> \end{aligned}
> $$
>
> 这一代数与先前的计算相似，但解释截然不同：此处 $$\bar{x}$$ 是固定的已知数（观测数据值），而 $$\mu$$ 是服从正态概率分布的变量。

似然函数的其他更常见用法将在后续章节讨论具体推断方法时介绍。现在考虑一个论证，它表明似然原理是另外两条基本原理的必然推论。

### 6.3.2 形式似然原理（The Formal Likelihood Principle）

对离散分布，似然原理可以从两条直觉上更简单的想法导出；对连续分布，在稍加限定的条件下亦然。本小节只处理离散分布。Berger and Wolpert (1984) 对离散与连续两种情形的似然原理提供了透彻的讨论。这些结果最早由 Birnbaum (1962) 在一篇里程碑式的论文中证明；我们的表述更接近 Berger and Wolpert。

形式地，定义实验（experiment）$$\mathcal{E}$$ 为三元组 $$\bigl( \textbf{X}, \theta, \{f(\textbf{x} \mid \theta)\} \bigr)$$，其中 $$\textbf{X}$$ 是对参数空间 $$\Theta$$ 中某个 $$\theta$$ 具有 pmf $$f(\textbf{x} \mid \theta)$$ 的随机向量。知道做了实验 $$\mathcal{E}$$ 并观测到特定样本 $$\textbf{X} = \textbf{x}$$ 的实验者，会对 $$\theta$$ 作出某种推断或得出某个结论；记该结论为 $$\mathrm{Ev}(\mathcal{E}, \textbf{x})$$，表示由 $$\mathcal{E}$$ 与 **x** 产生的关于 $$\theta$$ 的证据（evidence）。

> **例 6.3.4（证据函数）**
>
> 设 $$\mathcal{E}$$ 是观测 $$X_1, \ldots, X_n$$ iid $$n(\mu, \sigma^2)$$（$$\sigma^2$$ 已知）的实验。由于样本均值 $$\bar{X}$$ 是 $$\mu$$ 的充分统计量且 $$\mathrm{E} \bar{X} = \mu$$，我们可以用观测值 $$\bar{X} = \bar{x}$$ 作为 $$\mu$$ 的估计。为给出该估计精度的度量，通常报告 $$\bar{X}$$ 的标准差 $$\sigma/\sqrt{n}$$。于是可以定义 $$\mathrm{Ev}(\mathcal{E}, \textbf{x}) = \bigl( \bar{x},\ \sigma / \sqrt{n} \bigr)$$。这里 $$\bar{x}$$ 坐标依赖于观测样本 **x**，而 $$\sigma/\sqrt{n}$$ 坐标依赖于对 $$\mathcal{E}$$ 的了解。

为把证据函数的概念与熟悉的内容联系起来，现在用这些概念重述 6.2 节的充分性原理。

> **形式充分性原理（Formal Sufficiency Principle）**
>
> 考虑实验 $$\mathcal{E} = \bigl( \textbf{X}, \theta, \{f(\textbf{x} \mid \theta)\} \bigr)$$，设 $$T(\textbf{X})$$ 是 $$\theta$$ 的充分统计量。若样本点 **x** 与 **y** 满足 $$T(\textbf{x}) = T(\textbf{y})$$，则 $$\mathrm{Ev}(\mathcal{E}, \textbf{x}) = \mathrm{Ev}(\mathcal{E}, \textbf{y})$$。

形式充分性原理比 6.2 节的充分性原理稍稍更进一步：那里没有提到实验；这里我们同意在充分统计量相同时把证据等同。似然原理可以由形式充分性原理与下面这条极其合理的原理导出。

> **条件性原理（Conditionality Principle）**
>
> 设 $$\mathcal{E}_1 = \bigl( X_1, \theta, \{f_1(x_1 \mid \theta)\} \bigr)$$ 与 $$\mathcal{E}_2 = \bigl( X_2, \theta, \{f_2(x_2 \mid \theta)\} \bigr)$$ 是两个实验，两实验之间只须有共同未知参数 $$\theta$$。考虑混合实验：观测随机变量 $$J$$（$$P(J = 1) = P(J = 2) = \tfrac{1}{2}$$，与 $$\theta$$、$$X_1$$、$$X_2$$ 独立），然后实施实验 $$\mathcal{E}_J$$。形式地，所实施的实验为 $$\mathcal{E}^{*} = \bigl( \textbf{X}^{*}, \theta, \{f^{*}(x^{*} \mid \theta)\} \bigr)$$，其中 $$\textbf{X}^{*} = (j, X_j)$$，$$f^{*}(x^{*} \mid \theta) = f^{*}\bigl( (j, x_j) \mid \theta \bigr) = \tfrac{1}{2}\, f_j(x_j \mid \theta)$$。则
>
> $$
> \mathrm{Ev}\bigl( \mathcal{E}^{*},\, (j, x_j) \bigr) = \mathrm{Ev}\bigl( \mathcal{E}_j,\, x_j \bigr). \tag{6.3.2}
> $$

条件性原理只是说：若从两个实验中随机选定其一并实施，得到数据 $$x$$，则关于 $$\theta$$ 的信息只依赖于实际实施的实验。也就是说，它与“一开始就（非随机地）决定做该实验并观测到数据 $$x$$”所得的信息相同。“做的是这个实验而非别的实验”这一事实没有增加、减少或改变关于 $$\theta$$ 的知识。

> **例 6.3.5（二项/负二项实验）**
>
> 设关心的参数是概率 $$p$$（$$0 < p < 1$$），它表示某枚硬币被抛掷时落成“正面”的概率。设 $$\mathcal{E}_1$$ 是抛硬币 20 次并记录正面次数的实验：$$\mathcal{E}_1$$ 是二项实验，$$\{f_1(x_1 \mid p)\}$$ 是 $$\mathrm{binomial}(20, p)$$ pmf 族。设 $$\mathcal{E}_2$$ 是抛硬币直到出现第七次正面、并记录第七次正面之前反面次数的实验：$$\mathcal{E}_2$$ 是负二项实验。现在假设实验者用随机数表在这两个实验之间选择，恰好选中 $$\mathcal{E}_2$$，收集到的数据是“第七次正面发生在第 20 次投掷”。条件性原理说：实验者现在拥有的关于 $$\theta$$ 的信息 $$\mathrm{Ev}\bigl( \mathcal{E}^{*}, (2, 13) \bigr)$$，与他若一开始就选择做负二项实验（从未考虑二项实验）所拥有的信息 $$\mathrm{Ev}(\mathcal{E}_2, 13)$$ 相同。

下面的形式似然原理现在可以由形式充分性原理与条件性原理导出。

> **形式似然原理（Formal Likelihood Principle）**
>
> 设有两个实验 $$\mathcal{E}_1 = \bigl( X_1, \theta, \{f_1(x_1 \mid \theta)\} \bigr)$$ 与 $$\mathcal{E}_2 = \bigl( X_2, \theta, \{f_2(x_2 \mid \theta)\} \bigr)$$，未知参数 $$\theta$$ 在两实验中相同。设 $$x_1^{*}$$ 与 $$x_2^{*}$$ 分别是来自 $$\mathcal{E}_1$$ 与 $$\mathcal{E}_2$$ 的样本点，满足
>
> $$
> L(\theta \mid x_2^{*}) = C\, L(\theta \mid x_1^{*}) \tag{6.3.3}
> $$
>
> （对一切 $$\theta$$，常数 $$C$$ 可依赖 $$x_1^{*}$$ 与 $$x_2^{*}$$ 但不依赖 $$\theta$$）。则
>
> $$
> \mathrm{Ev}\bigl( \mathcal{E}_1,\, x_1^{*} \bigr) = \mathrm{Ev}\bigl( \mathcal{E}_2,\, x_2^{*} \bigr).
> $$

形式似然原理与 6.3.1 节的似然原理不同：形式似然原理涉及两个实验，而似然原理只涉及一个。不过让 $$\mathcal{E}_2$$ 是 $$\mathcal{E}_1$$ 的精确复制，即可从形式似然原理导出似然原理。因此形式似然原理的两实验设定多少是人为的，重要推论是下面的推论，其证明留作习题（习题 6.32）。

> **似然原理推论（Likelihood Principle Corollary）**
>
> 若 $$\mathcal{E} = \bigl( \textbf{X}, \theta, \{f(\textbf{x} \mid \theta)\} \bigr)$$ 是一个实验，则 $$\mathrm{Ev}(\mathcal{E}, \textbf{x})$$ 应当只通过 $$L(\theta \mid \textbf{x})$$ 依赖 $$\mathcal{E}$$ 与 **x**。

现在陈述 Birnbaum 定理，然后考察其多少令人意外的推论。

> **定理 6.3.6（Birnbaum 定理）**
>
> 形式似然原理由形式充分性原理与条件性原理推出；逆命题也成立。
>
> **证明**　只给出证明概要，细节留作习题 6.33。设 $$\mathcal{E}_1$$、$$\mathcal{E}_2$$、$$x_1^{*}$$、$$x_2^{*}$$ 如形式似然原理中所定义，$$\mathcal{E}^{*}$$ 为条件性原理中的混合实验。在 $$\mathcal{E}^{*}$$ 的样本空间上定义统计量
>
> $$
> T(j, x_j) = \begin{cases}
> (1, x_1^{*}) & \text{若}\ j = 1\ \text{且}\ x_1 = x_1^{*}，\ \text{或}\ j = 2\ \text{且}\ x_2 = x_2^{*}，\\
> (j, x_j) & \text{其他}.
> \end{cases}
> $$
>
> 因子分解定理可用于证明 $$T(J, X_J)$$ 在 $$\mathcal{E}^{*}$$ 实验中是充分统计量。于是形式充分性原理蕴含
>
> $$
> \mathrm{Ev}\bigl( \mathcal{E}^{*},\, (1, x_1^{*}) \bigr) = \mathrm{Ev}\bigl( \mathcal{E}^{*},\, (2, x_2^{*}) \bigr), \tag{6.3.4}
> $$
>
> 条件性原理蕴含
>
> $$
> \mathrm{Ev}\bigl( \mathcal{E}^{*},\, (1, x_1^{*}) \bigr) = \mathrm{Ev}\bigl( \mathcal{E}_1,\, x_1^{*} \bigr), \qquad
> \mathrm{Ev}\bigl( \mathcal{E}^{*},\, (2, x_2^{*}) \bigr) = \mathrm{Ev}\bigl( \mathcal{E}_2,\, x_2^{*} \bigr), \tag{6.3.5}
> $$
>
> 从而可以推出 $$\mathrm{Ev}\bigl( \mathcal{E}_1, x_1^{*} \bigr) = \mathrm{Ev}\bigl( \mathcal{E}_2, x_2^{*} \bigr)$$，即形式似然原理。
>
> 为证逆命题：先取一个实验为 $$\mathcal{E}^{*}$$ 实验、另一个为 $$\mathcal{E}_j$$，可以证明 $$\mathrm{Ev}\bigl( \mathcal{E}^{*}, (j, x_j) \bigr) = \mathrm{Ev}\bigl( \mathcal{E}_j, x_j \bigr)$$，即条件性原理。然后若 $$T(\textbf{X})$$ 充分且 $$T(\textbf{x}) = T(\textbf{y})$$，则似然成比例，形式似然原理蕴含 $$\mathrm{Ev}(\mathcal{E}, \textbf{x}) = \mathrm{Ev}(\mathcal{E}, \textbf{y})$$，即形式充分性原理。 ∎

> **例 6.3.7（例 6.3.5 的继续）**
>
> 再次考虑二项与负二项实验，取两个样本点 $$x_1 = 7$$（二项实验中 20 次投掷出 7 次正面）与 $$x_2 = 13$$（第七次正面发生在第 20 次投掷）。似然函数为
>
> $$
> L(p \mid x_1 = 7) = \binom{20}{7}\, p^{7} (1 - p)^{13} \qquad \text{（二项实验）}，
> $$
>
> 及
>
> $$
> L(p \mid x_2 = 13) = \binom{19}{6}\, p^{7} (1 - p)^{13} \qquad \text{（负二项实验）}.
> $$
>
> 这两个似然函数成比例，故形式似然原理断言两种情形下对 $$p$$ 应得出相同的结论。特别地，形式似然原理断言：就我们关于 $$p$$ 的结论而言，“第一种情形抽样结束是因为做完了 20 次试验、第二种情形抽样停止是因为观测到第七次正面”这一事实无关紧要。Lindley and Phillips (1976) 对二项—负二项推断问题有透彻的讨论。

通过考虑 Birnbaum 定理证明中定义的充分统计量 $$T$$ 与样本点 $$x_1^{*} = 7$$、$$x_2^{*} = 13$$，可以放大“不同实验的等价推断”这一点。对混合实验中除 $$(1, 7)$$ 或 $$(2, 13)$$ 之外的任何样本点，$$T$$ 告诉我们做的是哪个实验（二项或负二项）以及实验的结果；但对 $$(1, 7)$$ 与 $$(2, 13)$$ 有 $$T(1, 7) = T(2, 13) = (1, 7)$$。若只用充分统计量作推断且 $$T = (1, 7)$$，我们所知道的只是“20 次投掷中观测到 7 次正面”，而不知道 7 与 20 中哪一个是固定的量。

许多常用的统计程序违背形式似然原理：用这些程序，例 6.3.5 讨论的两个实验会得到不同的结论。鉴于 Birnbaum 定理，这种违背看似奇怪——因为我们因此违背了充分性原理或条件性原理之一。让我们更仔细地考察这两条原理。

形式充分性原理实质上与 6.1 节讨论的相同：那里我们看到关于 $$\theta$$ 的全部信息都包含在充分统计量中，知道整个样本不能添加任何信息。因此以充分统计量为证据的基础是极为合理的原理。该原理的一个招致违背的缺点是它非常依赖模型：如例 6.2.9 之后的讨论所述，相信这一原理就必须相信模型，而这未必容易。

多数数据分析者在分析数据时会做某种“模型检查”，而模型检查必然基于充分统计量之外的统计量。例如常见做法是考察模型的残差——度量数据中模型未予解释的变异的统计量（第 11 与 12 章将更详细地见到残差）。这种做法立即违背充分性原理，因为残差不基于充分统计量（当然也直接违背似然原理）。因此必须认识到：在考虑充分性原理（或似然原理）之前，必须先对模型感到安心。

条件性原理非正式地说就是“只有实际实施的实验才有关系”。也就是说，在例 6.3.5 中，若做的是二项实验而非负二项实验，则（没做的）负二项实验绝不应影响我们关于 $$\theta$$ 的结论。这一原理同样显得极为合理。

那么，统计实践怎么可能在违背充分性原理或条件性原理之一的意义上违背形式似然原理呢？若干作者讨论过这一问题，其中有 Durbin (1970) 与 Kalbfleisch (1975)。Kalbfleisch 提出的一个论点是：形式似然原理的证明并不令人信服，因为充分性原理是在无视条件性原理的情况下被应用的。定理 6.3.6 证明中使用的充分统计量 $$T(J, X_J)$$ 定义在混合实验上；若先调用条件性原理，则须为每个实验分别定义充分统计量，此时形式似然原理不再成立。（Birnbaum 定理证明中的一个关键论证是 $$T(J, X_J)$$ 能对来自每个实验的样本点取相同值；使用分别的充分统计量时这不可能发生。）

无论如何，由于许多直觉上有吸引力的推断程序确实违背似然原理，它并未被所有统计学家普遍接受；但它在数学上很有魅力，并确实提示了一种有用的数据约简技术。

## 6.4 等变原理（The Equivariance Principle）

前两节都以如下方式描述数据约简原理：指定样本的函数 $$T(\textbf{x})$$，原理断言若 **x** 与 **y** 是满足 $$T(\textbf{x}) = T(\textbf{y})$$ 的两个样本点，则无论观测 **x** 还是 **y**，都应对 $$\theta$$ 作出相同的推断。使用充分性原理时函数 $$T(\textbf{x})$$ 是充分统计量；使用似然原理时 $$T(\textbf{x})$$ 的“值”是与 $$L(\theta \mid \textbf{x})$$ 成比例的全体似然函数之集。等变原理以略为不同的方式描述一种数据约简技术：在等变原理的任何应用中都要指定函数 $$T(\textbf{x})$$，但若 $$T(\textbf{x}) = T(\textbf{y})$$，等变原理断言观测 **x** 时所作的推断与观测 **y** 时所作的推断之间应有一定的***关系***，尽管两种推断可以不同。对推断程序的这一限制有时带来更简单的分析，正如前面各节讨论的数据约简原理一样。

虽然通常合并起来称为等变原理，我们下面描述的数据约简技术实际上组合了两种不同的等变考虑。

第一种等变可以称为测量等变（measurement equivariance）：它规定所作的推断不应依赖于所用的测量尺度。例如设两位林务员要估计一片森林中树木的平均直径：第一位使用以英寸表示的树径数据，第二位使用以米表示的同一数据。现在要求两人都以英寸给出估计（第二位可以先以米估计平均直径再换算成英寸）。测量等变要求两位林务员给出相同的估计。毫无疑问，几乎所有人都会同意这种等变是合理的。

第二种等变实际上是不变性（invariance），可以称为形式不变性（formal invariance）：它规定若两个推断问题在所用数学模型方面具有相同的形式结构，则两个问题应使用相同的推断程序。模型中必须相同的元素是：$$\Theta$$（参数空间）、$$\{f(\textbf{x} \mid \theta) : \theta \in \Theta\}$$（样本的 pdf 或 pmf 集合）、以及允许的推断集合与错误推断的后果。最后这个元素此前讨论不多；本节我们假设可能推断的集合与 $$\Theta$$ 相同，即一个推断就是从 $$\Theta$$ 中选一个元素作为 $$\theta$$ 真值的估计或猜测。形式不变性只关心涉及的数学实体，而不关心实验的物理描述。例如两个问题中 $$\Theta$$ 都可以是 $$\Theta = \{\theta : \theta > 0\}$$；但一个问题中 $$\theta$$ 可能是美国一打鸡蛋的平均价格（以美分计），另一问题中 $$\theta$$ 可能指肯尼亚长颈鹿的平均身高（以米计）。然而形式不变性把这两个参数空间等同起来，因为它们指同一实数集合。

> **等变原理（Equivariance Principle）**
>
> 若 $$Y = g(\textbf{X})$$ 是使 $$Y$$ 的模型与 $$\textbf{X}$$ 的模型具有相同形式结构的测量尺度变换，则推断程序应当既是测量等变的，又是形式等变的。

现在说明这两种等变概念如何协同工作以提供有用的数据约简。

> **例 6.4.1（二项等变性）**
>
> 设 $$X$$ 服从二项分布，样本量 $$n$$ 已知、成功概率 $$p$$ 未知。设 $$T(x)$$ 是观测到 $$X = x$$ 时使用的 $$p$$ 的估计。与其用成功次数 $$X$$ 对 $$p$$ 作推断，也可以用失败次数 $$Y = n - X$$：$$Y$$ 也服从参数 $$(n,\ q = 1 - p)$$ 的二项分布。设 $$T^{*}(y)$$ 是观测到 $$Y = y$$ 时使用的 $$q$$ 的估计，从而 $$1 - T^{*}(y)$$ 是观测到 $$Y = y$$ 时对 $$p$$ 的估计。若观测到 $$x$$ 次成功，则 $$p$$ 的估计是 $$T(x)$$；但有 $$x$$ 次成功就有 $$n - x$$ 次失败，$$1 - T^{*}(n - x)$$ 也是 $$p$$ 的一个估计。测量等变要求这两个估计相等，即 $$T(x) = 1 - T^{*}(n - x)$$，因为从 $$X$$ 到 $$Y$$ 的变化只是测量尺度的变化。此外，基于 $$X$$ 与基于 $$Y$$ 的推断问题的形式结构相同：$$X$$ 与 $$Y$$ 都服从 $$\mathrm{binomial}(n, \theta)$$ 分布（$$0 \leq \theta \leq 1$$）。故形式不变性要求对所有 $$z = 0, \ldots, n$$ 有 $$T(z) = T^{*}(z)$$。于是测量等变与形式不变性共同要求
>
> $$
> T(x) = 1 - T^{*}(n - x) = 1 - T(n - x). \tag{6.4.1}
> $$
>
> 若只考虑满足 (6.4.1) 的估计量，我们就大大约简并简化了愿意考虑的估计量集合：规定任意估计量需要规定 $$T(0), T(1), \ldots, T(n)$$，而规定满足 (6.4.1) 的估计量只需规定 $$T(0), T(1), \ldots, T(\lfloor n/2 \rfloor)$$（$$\lfloor n/2 \rfloor$$ 为不超过 $$n/2$$ 的最大整数）；其余 $$T(x)$$ 值由已指定的值与 (6.4.1) 确定。例如 $$T(n) = 1 - T(0)$$，$$T(n - 1) = 1 - T(1)$$。这正是等变原理总能实现的数据约简：某些样本点的推断决定了其他样本点的推断。
>
> 本问题中两个等变的估计量是 $$T_1(x) = x/n$$ 与 $$T_2(x) = 0.9 (x/n) + 0.1 (0.5)$$。$$T_1(x)$$ 用样本成功比例估计 $$p$$；$$T_2(x)$$ 把样本比例向 $$0.5$$ “收缩”——若有理由认为 $$p$$ 接近 0.5，这可能是合理的估计量。条件 (6.4.1) 对这两个估计量都容易验证，故都是等变的。一个不等变的估计量是 $$T_3(x) = 0.8 (x/n) + 0.2 (1)$$：条件 (6.4.1) 不满足，因为 $$T_3(0) = 0.2 \neq 0 = 1 - T_3(n - 0)$$。测量等变与形式不变性之别的更多内容见习题 6.39。

例 6.4.1 中的等变论证（以及任何等变论证）的关键是变换的选择。例 6.4.1 使用的数据变换是 $$Y = n - X$$。等变原理任何应用中所用变换（测量尺度的变化）由样本空间上称为***变换群***（group of transformations）的一族函数描述。

> **定义 6.4.2（变换群）**
>
> 从样本空间 $$\mathcal{X}$$ 到 $$\mathcal{X}$$ 上的一族函数 $$\{g(\textbf{x}) : g \in \mathcal{G}\}$$ 称为 $$\mathcal{X}$$ 的***变换群***，如果
>
> - (i) （逆）对每个 $$g \in \mathcal{G}$$ 存在 $$g' \in \mathcal{G}$$ 使 $$g'\bigl( g(\textbf{x}) \bigr) = \textbf{x}$$ 对一切 $$\textbf{x} \in \mathcal{X}$$ 成立；
>
> - (ii) （复合）对每个 $$g \in \mathcal{G}$$ 与 $$g' \in \mathcal{G}$$ 存在 $$g'' \in \mathcal{G}$$ 使 $$g'\bigl( g(\textbf{x}) \bigr) = g''(\textbf{x})$$ 对一切 $$\textbf{x} \in \mathcal{X}$$ 成立；
>
> - (iii) （恒等）由 $$e(\textbf{x}) = \textbf{x}$$ 定义的恒等函数 $$e(\textbf{x})$$ 是 $$\mathcal{G}$$ 的元素。

有时第三条要求被并入群的定义；但 (iii) 是 (i) 与 (ii) 的推论，无须单独验证（见习题 6.38）。

> **例 6.4.3（例 6.4.1 的继续）**
>
> 本问题只涉及两个变换，故可取 $$\mathcal{G} = \{g_1, g_2\}$$，$$g_1(x) = n - x$$，$$g_2(x) = x$$。条件 (i) 与 (ii) 容易验证。取 $$g' = g$$ 验证 (i)：每个元素都是自己的逆，例如
>
> $$
> g_1\bigl( g_1(x) \bigr) = g_1(n - x) = n - (n - x) = x.
> $$
>
> 对 (ii)：若 $$g' = g$$ 则 $$g'' = g_2$$ 满足等式；若 $$g' \neq g$$ 则 $$g'' = g_1$$ 满足等式。例如取 $$g' \neq g = g_1$$：
>
> $$
> g_2\bigl( g_1(x) \bigr) = g_2(n - x) = n - x = g_1(x).
> $$

要使用等变原理，必须能对变换后的问题应用形式不变性，即在改变测量尺度之后仍须有相同的形式结构。由于结构不变，我们希望底层模型（分布族）是不变的。这一要求总结在下述定义中。

> **定义 6.4.4（不变分布族）**
>
> 设 $$\mathcal{F} = \{f(\textbf{x} \mid \theta) : \theta \in \Theta\}$$ 是 $$\textbf{X}$$ 的一族 pdf 或 pmf，$$\mathcal{G}$$ 是样本空间 $$\mathcal{X}$$ 的变换群。若对每个 $$\theta \in \Theta$$ 与 $$g \in \mathcal{G}$$，存在唯一的 $$\theta' \in \Theta$$ 使得：若 $$X$$ 有分布 $$f(\textbf{x} \mid \theta)$$，则 $$Y = g(\textbf{X})$$ 有分布 $$f(\textbf{y} \mid \theta')$$，则称 $$\mathcal{F}$$ 在群 $$\mathcal{G}$$ 下***不变***（invariant）。

> **例 6.4.5（例 6.4.1 的结论）**
>
> 在二项问题中，必须对 $$g_1$$ 与 $$g_2$$ 都检查。若 $$X \sim \mathrm{binomial}(n, p)$$，则 $$g_1(X) = n - X \sim \mathrm{binomial}(n, 1 - p)$$，故 $$p' = 1 - p$$（$$p$$ 扮演定义 6.4.4 中 $$\theta$$ 的角色）；又 $$g_2(X) = X \sim \mathrm{binomial}(n, p)$$，此时 $$p' = p$$。故二项 pmf 的集合在群 $$\mathcal{G} = \{g_1, g_2\}$$ 下不变。

例 6.4.1 中的变换群只有两个元素。许多情形下变换群是无限的，如下例所示（另见习题 6.41 与 6.42）。

> **例 6.4.6（正态位置不变性）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\mu, \sigma^2)$$，$$\mu$$ 与 $$\sigma^2$$ 都未知。考虑变换群 $$\mathcal{G} = \{g_a(\textbf{x}),\ -\infty < a < \infty\}$$，其中 $$g_a(x_1, \ldots, x_n) = (x_1 + a, \ldots, x_n + a)$$。为验证这族变换是群，必须验证定义 6.4.2 的条件 (i) 与 (ii)。对 (i) 注意
>
> $$
> g_{-a}\bigl( g_a(x_1, \ldots, x_n) \bigr) = g_{-a}(x_1 + a, \ldots, x_n + a) = (x_1 + a - a, \ldots, x_n + a - a) = (x_1, \ldots, x_n),
> $$
>
> 故若 $$g = g_a$$ 则 $$g' = g_{-a}$$ 满足 (i)。对 (ii) 注意
>
> $$
> g_{a_2}\bigl( g_{a_1}(x_1, \ldots, x_n) \bigr) = g_{a_2}(x_1 + a_1, \ldots, x_n + a_1) = (x_1 + a_1 + a_2, \ldots, x_n + a_1 + a_2) = g_{a_1 + a_2}(x_1, \ldots, x_n),
> $$
>
> 故若 $$g = g_{a_1}$$、$$g' = g_{a_2}$$ 则 $$g'' = g_{a_1 + a_2}$$ 满足 (ii)，定义 6.4.2 验证完毕：$$\mathcal{G}$$ 是变换群。
>
> 本问题中的集合 $$\mathcal{F}$$ 是由“$$X_1, \ldots, X_n$$ 对某 $$-\infty < \mu < \infty$$ 与 $$\sigma^2 > 0$$ 是 iid $$n(\mu, \sigma^2)$$”定义的、$$X_1, \ldots, X_n$$ 的全体联合密度 $$f(x_1, \ldots, x_n \mid \mu, \sigma^2)$$ 之集。对任意 $$a$$（$$-\infty < a < \infty$$），由
>
> $$
> (Y_1, \ldots, Y_n) = g_a(X_1, \ldots, X_n) = (X_1 + a, \ldots, X_n + a)
> $$
>
> 定义的随机变量 $$Y_1, \ldots, Y_n$$ 是 iid $$n(\mu + a, \sigma^2)$$ 随机变量。故 $$\textbf{Y} = g_a(\textbf{X})$$ 的联合分布在 $$\mathcal{F}$$ 中，从而 $$\mathcal{F}$$ 在 $$\mathcal{G}$$ 下不变。用定义 6.4.4 的记号：若 $$\boldsymbol{\theta} = (\mu, \sigma^2)$$ 则 $$\boldsymbol{\theta}' = (\mu + a, \sigma^2)$$。

再次记住：等变原理由两类不同的等变组成。测量等变在直觉上是合理的；许多人想到等变原理时以为它只指测量等变。若果真如此，等变原理大概会被普遍接受。但另一条原理——形式不变性——相当不同：它把任何两个具有相同数学结构的问题等同起来，不论它们试图解释的物理现实为何。它断言同一推断程序适用，即使物理现实截然不同——这一假设有时难以证成。

但正如充分性原理与似然原理一样，等变原理是一种数据约简技术：它通过规定在相关样本点处必须作出何种其他推断来限制推断。三条原理都规定了不同样本点处推断之间的关系，限制了允许推断的集合，以此简化问题的分析。

## 6.5 习题（Exercises）

**6.1** 设 $$X$$ 是 $$n(0, \sigma^2)$$ 总体的一次观测。$$\vert X\vert $$ 是充分统计量吗？

**6.2** 设 $$X_1, \ldots, X_n$$ 是具有密度

$$
f_{X_i}(x \mid \theta) = \begin{cases} e^{i\theta - x} & x \geq i\theta,\\ 0 & x < i\theta \end{cases}
$$

的独立随机变量。证明 $$T = \min_i (X_i / i)$$ 是 $$\theta$$ 的充分统计量。

**6.3** 设 $$X_1, \ldots, X_n$$ 是来自 pdf

$$
f(x \mid \mu, \sigma) = \frac{1}{\sigma}\, e^{-(x - \mu)/\sigma}, \qquad \mu < x < \infty, \quad 0 < \sigma < \infty
$$

的随机样本。求 $$(\mu, \sigma)$$ 的二维充分统计量。

**6.4** 证明定理 6.2.10。

**6.5** 设 $$X_1, \ldots, X_n$$ 是具有 pdf

$$
f(x_i \mid \theta) = \begin{cases} \dfrac{1}{2i} & i(\theta - 1) < x_i < i(\theta + 1),\\[4pt] 0 & \text{其他} \end{cases}
$$

的独立随机变量，$$\theta > 0$$。求 $$\theta$$ 的二维充分统计量。

**6.6** 设 $$X_1, \ldots, X_n$$ 是来自 $$\mathrm{gamma}(\alpha, \beta)$$ 总体的随机样本。求 $$(\alpha, \beta)$$ 的二维充分统计量。

**6.7** 设 $$f(x, y \mid \theta_1, \theta_2, \theta_3, \theta_4)$$ 是 $$\Re^2$$ 中矩形上均匀分布的二元 pdf，矩形左下角为 $$(\theta_1, \theta_2)$$、右上角为 $$(\theta_3, \theta_4)$$；参数满足 $$\theta_1 < \theta_3$$，$$\theta_2 < \theta_4$$。设 $$(X_1, Y_1), \ldots, (X_n, Y_n)$$ 是来自该 pdf 的随机样本。求 $$(\theta_1, \theta_2, \theta_3, \theta_4)$$ 的四维充分统计量。

**6.8** 设 $$X_1, \ldots, X_n$$ 是来自位置 pdf $$f(x - \theta)$$ 的总体的随机样本。证明次序统计量 $$T(X_1, \ldots, X_n) = (X_{(1)}, \ldots, X_{(n)})$$ 是 $$\theta$$ 的充分统计量，且不可能有进一步约简。

**6.9** 对下列每个分布，设 $$X_1, \ldots, X_n$$ 是随机样本，求 $$\theta$$ 的最小充分统计量：

- (a) $$f(x \mid \theta) = \dfrac{1}{\sqrt{2\pi}}\, e^{-(x - \theta)^2/2}$$，$$-\infty < x < \infty$$，$$-\infty < \theta < \infty$$（正态）；

- (b) $$f(x \mid \theta) = e^{-(x - \theta)}$$，$$\theta < x < \infty$$，$$-\infty < \theta < \infty$$（位置指数）；

- (c) $$f(x \mid \theta) = \dfrac{e^{-(x - \theta)}}{\bigl( 1 + e^{-(x - \theta)} \bigr)^2}$$，$$-\infty < x < \infty$$，$$-\infty < \theta < \infty$$（逻辑斯蒂）；

- (d) $$f(x \mid \theta) = \dfrac{1}{\pi\, \bigl[ 1 + (x - \theta)^2 \bigr]}$$，$$-\infty < x < \infty$$，$$-\infty < \theta < \infty$$（柯西）；

- (e) $$f(x \mid \theta) = \dfrac{1}{2}\, e^{-\vert x - \theta\vert }$$，$$-\infty < x < \infty$$，$$-\infty < \theta < \infty$$（双指数）。

**6.10** 证明例 6.2.15 中找到的 uniform $$(\theta, \theta + 1)$$ 的最小充分统计量不是完备的。

**6.11** 参照习题 6.9 给出的 pdf。对每一个，设 $$X_{(1)} < \cdots < X_{(n)}$$ 为有序样本，定义 $$Y_i = X_{(n)} - X_{(i)}$$（$$i = 1, \ldots, n - 1$$）。(a) 对习题 6.9 的每个 pdf，验证集合 $$(Y_1, \ldots, Y_{n-1})$$ 关于 $$\theta$$ 是辅助的；并尝试证明一个类似例 6.2.18 的一般定理，一次处理所有这些族。(b) 对每种情形判断集合 $$(Y_1, \ldots, Y_{n-1})$$ 是否与最小充分统计量独立。

**6.12** 多数问题中一个自然的辅助统计量是样本量。例如设 $$N$$ 是取值 $$1, 2, \ldots$$ 的随机变量，概率 $$p_1, p_2, \ldots$$ 已知（$$\sum p_i = 1$$）。观测到 $$N = n$$ 后，做 $$n$$ 次成功概率为 $$\theta$$ 的伯努利试验，得 $$X$$ 次成功。(a) 证明数对 $$(X, N)$$ 是最小充分的，且 $$N$$ 关于 $$\theta$$ 辅助。（注意与 4.4 节某些分层模型的相似性。）(b) 证明估计量 $$X/N$$ 是 $$\theta$$ 的无偏估计，方差为 $$\theta (1 - \theta)\, \mathrm{E}(1/N)$$。

**6.13** 设 $$X_1$$ 与 $$X_2$$ 是来自 pdf $$f(x \mid \alpha) = \alpha\, x^{\alpha - 1} e^{-x}$$（$$x > 0$$，$$\alpha > 0$$）的 iid 观测。证明 $$(\log X_1)/(\log X_2)$$ 是辅助统计量。

**6.14** 设 $$X_1, \ldots, X_n$$ 是来自位置族的随机样本。证明 $$M - \bar{X}$$ 是辅助统计量，其中 $$M$$ 是样本中位数。

**6.15** 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\theta, a\theta^2)$$，$$a$$ 为已知常数，$$\theta > 0$$。(a) 证明参数空间不含二维开集；(b) 证明统计量 $$T = (\bar{X}, S^2)$$ 是 $$\theta$$ 的充分统计量，但分布族不完备。

**6.16** 遗传建模中的一个著名例子（Tanner 1996 或 Dempster, Laird, and Rubin 1977）是遗传连锁多项模型：观测多项向量 $$(x_1, x_2, x_3, x_4)$$，格子概率为 $$\bigl( \tfrac{1}{2} + \tfrac{\theta}{4},\ \tfrac{1}{4}(1 - \theta),\ \tfrac{1}{4}(1 - \theta),\ \tfrac{\theta}{4} \bigr)$$。(a) 证明这是曲线指数族；(b) 求 $$\theta$$ 的充分统计量；(c) 求 $$\theta$$ 的最小充分统计量。

**6.17** 设 $$X_1, \ldots, X_n$$ 是 iid 几何分布

$$
P_{\theta}(X = x) = \theta (1 - \theta)^{x - 1}, \qquad x = 1, 2, \ldots, \quad 0 < \theta < 1.
$$

证明 $$\sum X_i$$ 关于 $$\theta$$ 充分，并求 $$\sum X_i$$ 的分布族。该族完备吗？

**6.18** 设 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{Poisson}(\lambda)$$。证明 $$\sum X_i$$ 的分布族是完备的。不使用定理 6.2.25 而直接证明完备性。

**6.19** 随机变量 $$X$$ 按下列分布之一取值 $$0, 1, 2$$：

|  | $$P(X = 0)$$ | $$P(X = 1)$$ | $$P(X = 2)$$ |
|:---|:---:|:---:|:---:|
| 分布 1 | $$p$$ | $$3p$$ | $$1 - 4p$$ 　　（$$0 < p < \tfrac{1}{4}$$） |
| 分布 2 | $$p$$ | $$p^2$$ | $$1 - p - p^2$$ 　　（$$0 < p < \tfrac{1}{2}$$） |

对每种情形判断 $$X$$ 的分布族是否完备。

**6.20** 对下列每个 pdf，设 $$X_1, \ldots, X_n$$ 是 iid 观测。求完备充分统计量，或证明其不存在：

- (a) $$f(x \mid \theta) = \dfrac{\theta}{2}\, x^2$$，$$0 < x < \theta$$，$$\theta > 0$$；

- (b) $$f(x \mid \theta) = \dfrac{\theta}{(1 + x)^{1 + \theta}}$$，$$0 < x < \infty$$，$$\theta > 0$$；

- (c) $$f(x \mid \theta) = \dfrac{x}{(\log \theta)\, \theta}$$，$$0 < x < 1$$，$$\theta > 1$$；

- (d) $$f(x \mid \theta) = e^{-(x - \theta)}\, \exp\bigl( -e^{-(x - \theta)} \bigr)$$，$$-\infty < x < \infty$$，$$-\infty < \theta < \infty$$；

- (e) $$f(x \mid \theta) = \dbinom{2}{x}\, \theta^{x} (1 - \theta)^{2 - x}$$，$$x = 0, 1, 2$$，$$0 \leq \theta \leq 1$$。

**6.21** 设 $$X$$ 是来自 pdf

$$
f(x \mid \theta) = \Bigl( \frac{\theta}{2} \Bigr)^{\vert x\vert } (1 - \theta)^{1 - \vert x\vert }, \qquad x = -1, 0, 1, \quad 0 \leq \theta \leq 1
$$

的一次观测。(a) $$X$$ 是完备充分统计量吗？(b) $$\vert X\vert $$ 是完备充分统计量吗？(c) $$f(x \mid \theta)$$ 属于指数族吗？

**6.22** 设 $$X_1, \ldots, X_n$$ 是来自 pdf

$$
f(x \mid \theta) = \theta\, x^{\theta - 1}, \qquad 0 < x < 1, \quad \theta > 0
$$

的总体的随机样本。(a) $$\sum X_i$$ 关于 $$\theta$$ 充分吗？(b) 求 $$\theta$$ 的完备充分统计量。

**6.23** 设 $$X_1, \ldots, X_n$$ 是区间 $$(\theta, 2\theta)$$（$$\theta > 0$$）上均匀分布的随机样本。求 $$\theta$$ 的最小充分统计量。该统计量完备吗？

**6.24** 考虑如下分布族：

$$
\mathcal{P} = \bigl\{ P_{\lambda}(X = x) : P_{\lambda}(X = x) = \lambda^{x} e^{-\lambda} / x!,\ x = 0, 1, 2, \ldots;\ \lambda = 0\ \text{或}\ 1 \bigr\}.
$$

这是 $$\lambda$$ 限制为 0 或 1 的泊松族。证明族 $$\mathcal{P}$$ 不完备，从而说明完备性可以依赖于参数的取值范围。（见习题 6.15 与 6.18。）

**6.25** 我们已经见到若干关于指数族充分性及相关概念的定理。定理 5.2.11 给出了某统计量的分布，其充分性由定理 6.2.10 刻画、完备性由定理 6.2.25 刻画。但若族是曲线的，定理 6.2.25 的开集条件不满足。此时定理 6.2.10 的充分统计量还最小吗？对定理 6.2.10 的 $$T(\textbf{x})$$ 应用定理 6.2.13，建立下列结论：(a) 统计量 $$\bigl( \sum X_i,\ \sum X_i^2 \bigr)$$ 在 $$n(\mu, \mu)$$ 族中充分但不最小充分；(b) 统计量 $$\sum X_i^2$$ 在 $$n(\mu, \mu)$$ 族中最小充分；(c) 统计量 $$\bigl( \sum X_i,\ \sum X_i^2 \bigr)$$ 在 $$n(\mu, \mu^2)$$ 族中最小充分；(d) 统计量 $$\bigl( \sum X_i,\ \sum X_i^2 \bigr)$$ 在 $$n(\mu, \sigma^2)$$ 族中最小充分。

**6.26** 用定理 6.6.5 建立如下结论：给定样本 $$X_1, X_2, \ldots, X_n$$，下列统计量是最小充分的。

| 统计量 | 分布 |
|:---:|:---:|
| $$\bar{X}$$ | $$n(\theta, 1)$$ |
| $$\sum X_i$$ | $$\mathrm{gamma}(\alpha, \beta)$$，$$\alpha$$ 已知 |
| $$\max X_i$$ | $$\mathrm{uniform}(0, \theta)$$ |
| $$X_{(1)}, X_{(2)}, \ldots, X_{(n)}$$ | $$\mathrm{Cauchy}(\theta, 1)$$ |
| $$X_{(1)}, X_{(2)}, \ldots, X_{(n)}$$ | $$\mathrm{logistic}(\mu, \beta)$$ |

**6.27** 设 $$X_1, X_2, \ldots, X_n$$ 是来自逆高斯分布（inverse Gaussian distribution）的随机样本，pdf 为

$$
f(x \mid \mu, \lambda) = \Biggl( \frac{\lambda}{2 \pi x^3} \Biggr)^{1/2}\, e^{-\lambda (x - \mu)^2 / (2 \mu^2 x)}, \qquad 0 < x < \infty.
$$

(a) 证明统计量

$$
\bar{X} = \frac{1}{n} \sum_{i=1}^{n} X_i \qquad\text{与}\qquad T = \sum_{i=1}^{n} \Bigl( \frac{1}{X_i} - \frac{1}{\bar{X}} \Bigr)
$$

充分且完备。(b) 对 $$n = 2$$，证明 $$\bar{X}$$ 服从逆高斯分布、$$n \lambda / T$$ 服从 $$\chi_{n-1}^2$$ 分布，且两者独立。（一般情形见 Schwarz and Samanta 1991。）逆高斯分布有许多应用，特别是在寿命建模中；参见 Chhikara and Folks (1989) 或 Seshadri (1993) 的著作。

**6.28** 证明定理 6.6.5。提示：先建立族 $$\{f_0(x), f_1(x), \ldots, f_k(x)\}$$ 中 $$T(\textbf{X})$$ 的最小充分性可由定理 6.2.13 得到；然后论证 $$\mathcal{F}$$ 中任何充分统计量必是 $$T(\textbf{x})$$ 的函数。

**6.29** 最小充分性的概念可以推广到参数分布族之外。证明：若 $$X_1, X_2, \ldots, X_n$$ 是来自未知密度 $$f$$ 的随机样本，则次序统计量是最小充分的。提示：用定理 6.6.5，取族 $$\{f_0(x), f_1(x), \ldots, f_k(x)\}$$ 为逻辑斯蒂密度。

**6.30** 设 $$X_1, \ldots, X_n$$ 是来自 pdf $$f(x \mid \mu) = e^{-(x - \mu)}$$（$$-\infty < \mu < x < \infty$$）的随机样本。(a) 证明 $$X_{(1)} = \min_i X_i$$ 是完备充分统计量；(b) 用 Basu 定理证明 $$X_{(1)}$$ 与 $$S^2$$ 独立。

**6.31** Boos and Hughes-Oliver (1998) 详述了应用 Basu 定理可以简化计算的一些实例。这里给出几例。(a) 设 $$X_1, X_2, \ldots, X_n$$ 是 iid $$n(\mu, \sigma^2)$$，$$\sigma^2$$ 已知。(i) 证明 $$\bar{X}$$ 关于 $$\mu$$ 完备充分，$$S^2$$ 辅助；故由 Basu 定理 $$\bar{X}$$ 与 $$S^2$$ 独立。(ii) 证明即使 $$\sigma^2$$ 未知，这一独立性仍然成立，因为对 $$\sigma^2$$ 的了解与否不改变分布。（与更繁琐的定理 5.3.1(a) 的证明比较。）(b) 蒙特卡罗骗局（Monte Carlo swindle）是改进方差估计的技术。设 $$X_1, X_2, \ldots, X_n$$ 是 iid $$N(\mu, \sigma^2)$$，要计算中位数 $$M$$ 的方差。(i) 证明 $$\mathrm{Var}(M) = \mathrm{Var}(M - \bar{X}) + \mathrm{Var}(\bar{X})$$；因此只须模拟 $$\mathrm{Var}(M)$$ 中的 $$\mathrm{Var}(M - \bar{X})$$ 部分（因为已知 $$\mathrm{Var}(\bar{X}) = \sigma^2/n$$）。(ii) 通过证明 $$M$$ 的渐近方差约为 $$2 [\mathrm{Var}(M)]^2 / (N - 1)$$、而 $$M - \bar{X}$$ 的约为 $$2 [\mathrm{Var}(M - \bar{X})]^2 / (N - 1)$$（$$N$$ 为蒙特卡罗样本数），证明骗局估计更精确。(c) (i) 若 $$X/Y$$ 与 $$Y$$ 独立，证明

$$
\mathrm{E}\Biggl( \frac{X}{Y} \Biggr)^{k} = \frac{\mathrm{E} X^{k}}{\mathrm{E} Y^{k}}.
$$

(ii) 用该结果与 Basu 定理证明：若 $$X_1, X_2, \ldots, X_n$$ 是 iid $$\mathrm{gamma}(\alpha, \beta)$$（$$\alpha$$ 已知），则

$$
\mathrm{E}\Biggl[ X_{(i)} \,\Bigg\vert \, \sum_{i} X_i \Biggr] = \frac{\mathrm{E}\bigl( X_{(i)} \bigr)}{\mathrm{E}\bigl( \sum_i X_i \bigr)}\, \sum_{i} X_i.
$$

**6.32** 证明似然原理推论。即：假设形式充分性原理与条件性原理都成立，证明若 $$\mathcal{E} = \bigl( \textbf{X}, \theta, \{f(\textbf{x} \mid \theta)\} \bigr)$$ 是一个实验，则 $$\mathrm{Ev}(\mathcal{E}, \textbf{x})$$ 应当只通过 $$L(\theta \mid \textbf{x})$$ 依赖 $$\mathcal{E}$$ 与 **x**。

**6.33** 补足定理 6.3.6（Birnbaum 定理）证明中的空缺。(a) 定义 $$g(t \mid \theta) = g\bigl( (j, x_j) \mid \theta \bigr) = f^{*}\bigl( (j, x_j) \mid \theta \bigr)$$ 与

$$
h(j, x_j) = \begin{cases} C & \text{若}\ (j, x_j) = (2, x_2^{*}),\\ 1 & \text{其他}. \end{cases}
$$

通过验证对一切 $$(j, x_j)$$ 有

$$
g\bigl( T(j, x_j) \mid \theta \bigr)\, h(j, x_j) = g\bigl( (j, x_j) \mid \theta \bigr) \cdot 1 = f^{*}\bigl( (j, x_j) \mid \theta \bigr)
$$

证明 $$T(j, x_j)$$ 在 $$\mathcal{E}^{*}$$ 实验中是充分统计量。(b) 由于 $$T$$ 充分，证明形式充分性原理蕴含 (6.3.4)；条件性原理蕴含 (6.3.5)；从而推出形式似然原理。(c) 为证逆命题：先取一个实验为 $$\mathcal{E}^{*}$$、另一个为 $$\mathcal{E}_j$$，推出 $$\mathrm{Ev}\bigl( \mathcal{E}^{*}, (j, x_j) \bigr) = \mathrm{Ev}\bigl( \mathcal{E}_j, x_j \bigr)$$（条件性原理）。然后若 $$T(\textbf{X})$$ 充分且 $$T(\textbf{x}) = T(\textbf{y})$$，证明似然成比例，再用形式似然原理推出 $$\mathrm{Ev}(\mathcal{E}, \textbf{x}) = \mathrm{Ev}(\mathcal{E}, \textbf{y})$$（形式充分性原理）。

**6.34** 考虑习题 6.12 的模型。证明形式似然原理蕴含：关于 $$\theta$$ 的任何结论都不应依赖于样本量 $$n$$ 是随机选定的这一事实。即 $$(n, x)$$（习题 6.12 的样本点）的似然与固定样本量 $$\mathrm{binomial}(n, \theta)$$ 实验中样本点 $$x$$ 的似然成比例。

**6.35** 一种有风险的实验性治疗将施于至多三名患者。治疗先给一名患者；若成功，再给第二名；若再成功，给第三名。把各患者的结局建模为独立的 $$\mathrm{Bernoulli}(p)$$ 随机变量。指出该模型中的四个样本点，并证明按形式似然原理，关于 $$p$$ 的推断不应依赖于样本量由数据决定这一事实。

**6.36** 使用最小充分统计量的一个优点是无偏估计量方差更小，如下题所示。设 $$T_1$$ 充分，$$T_2$$ 最小充分，$$U$$ 是 $$\theta$$ 的无偏估计；定义 $$U_1 = \mathrm{E}(U \mid T_1)$$，$$U_2 = \mathrm{E}(U \mid T_2)$$。(a) 证明 $$U_2 = \mathrm{E}(U_1 \mid T_2)$$；(b) 用条件方差公式（定理 4.4.7）证明 $$\mathrm{Var} U_2 \leq \mathrm{Var} U_1$$。（充分性与无偏性关系的更多内容见 Pena and Rohatgi 1994。）

**6.37** Joshi and Nabar (1989) 考察了所谓“尼罗河问题”中参数线性估计量的性质，其中 $$(X, Y)$$ 具有联合密度

$$
f(x, y \mid \theta) = \exp\bigl\{ -(\theta x + y/\theta) \bigr\}, \qquad x > 0, \quad y > 0.
$$

(a) 对容量 $$n$$ 的 iid 样本，证明 Fisher 信息为 $$I(\theta) = 2n / \theta^2$$；(b) 对估计量 $$T = \sum Y_i / \sum X_i$$ 与 $$U = \sum X_i \sum Y_i$$，证明：(i) 仅 $$T$$ 中的信息为 $$\bigl[ 2n / (2n + 1) \bigr]\, I(\theta)$$；(ii) $$(T, U)$$ 中的信息为 $$I(\theta)$$；(iii) $$(T, U)$$ 联合充分但不完备。

**6.38** 在定义 6.4.2 中证明 (iii) 由 (i) 与 (ii) 蕴含。

**6.39** 测量等变要求两个等价数据点有相同推断：**x** 是一种尺度下的测量，**y** 是完全相同的测量在另一种尺度下的表达。形式不变性最终导致同一测量尺度下两个不同数据点处推断之间的关系。设实验者希望估计 $$\theta$$——水的平均沸点——基于一次观测 $$X$$（以摄氏度计的沸点）。由于海拔与水中杂质，他决定使用估计 $$T(x) = 0.5 x + 0.5 (100)$$。若测量尺度改为华氏度，实验者会用 $$T^{*}(y) = 0.5 y + 0.5 (212)$$ 估计以华氏度表示的平均沸点。(a) 熟知的摄氏—华氏关系使我们用变换 $$\tfrac{5}{9}\bigl( T^{*}(y) - 32 \bigr)$$ 把华氏换算回摄氏。证明这一程序是测量等变的：相同数据会得到相同答案，即 $$\tfrac{5}{9}\bigl( T^{*}(y) - 32 \bigr) = T(x)$$。(b) 形式不变性要求对一切 $$x$$ 有 $$T(x) = T^{*}(x)$$。证明上面定义的估计量不满足这一点，因此按等变原理的意义它们不是等变的。

**6.40** 设 $$X_1, \ldots, X_n$$ 是来自位置—尺度族的 iid 观测。设 $$T_1(X_1, \ldots, X_n)$$ 与 $$T_2(X_1, \ldots, X_n)$$ 是都满足

$$
T_i\bigl( a x_1 + b, \ldots, a x_n + b \bigr) = a\, T_i(x_1, \ldots, x_n)
$$

（对一切 $$x_1, \ldots, x_n$$ 与 $$b$$，以及任意 $$a > 0$$）的两个统计量。(a) 证明 $$T_1 / T_2$$ 是辅助统计量；(b) 设 $$R$$ 为样本极差、$$S$$ 为样本标准差。验证 $$R$$ 与 $$S$$ 满足上述条件，故 $$R/S$$ 是辅助统计量。

**6.41** 设对例 6.4.6 的模型，要作的推断是均值 $$\mu$$ 的估计。设 $$T(\textbf{x})$$ 是观测到 $$\textbf{X} = \textbf{x}$$ 时使用的估计。若观测到 $$g_a(\textbf{X}) = \textbf{Y} = \textbf{y}$$，则设 $$T^{*}(\textbf{y})$$ 是 $$\mu + a$$（每个 $$Y_i$$ 的均值）的估计；若 $$\mu + a$$ 由 $$T^{*}(\textbf{y})$$ 估计，则 $$\mu$$ 应由 $$T^{*}(\textbf{y}) - a$$ 估计。(a) 证明测量等变要求对一切 $$\textbf{x} = (x_1, \ldots, x_n)$$ 与一切 $$a$$ 有 $$T(\textbf{x}) = T^{*}(\textbf{y}) - a$$；(b) 证明形式不变性要求 $$T(\textbf{x}) = T^{*}(\textbf{x})$$，从而等变原理要求对一切 $$(x_1, \ldots, x_n)$$ 与一切 $$a$$ 有

$$
T(x_1, \ldots, x_n) + a = T(x_1 + a, \ldots, x_n + a).
$$

(c) 若 $$X_1, \ldots, X_n$$ 是 iid $$f(x - \theta)$$，证明只要 $$\mathrm{E}_0 X_1 = 0$$，估计量 $$W(X_1, \ldots, X_n) = \bar{X}$$ 对估计 $$\theta$$ 是等变的且满足 $$\mathrm{E}_{\theta} W = \theta$$。

**6.42** 设有来自 $$\frac{1}{\sigma} f\bigl( (x - \theta)/\sigma \bigr)$$（位置—尺度 pdf）的随机样本 $$X_1, \ldots, X_n$$。要估计 $$\theta$$，考虑两组变换：

$$
\mathcal{G}_1 = \{ g_{a, c}(\textbf{x}) : -\infty < a < \infty,\ c > 0 \}, \qquad g_{a, c}(x_1, \ldots, x_n) = (c x_1 + a, \ldots, c x_n + a);
$$

$$
\mathcal{G}_2 = \{ g_a(\textbf{x}) : -\infty < a < \infty \}, \qquad g_a(x_1, \ldots, x_n) = (x_1 + a, \ldots, x_n + a).
$$

(a) 证明形如 $$W(x_1, \ldots, x_n) = \bar{x} + k$$（$$k$$ 为非零常数）的估计量关于群 $$\mathcal{G}_2$$ 等变，但关于群 $$\mathcal{G}_1$$ 不等变。(b) 对每个群，在什么条件下等变估计量 $$W$$ 满足 $$\mathrm{E}_{\theta} W = \theta$$（即它是估计 $$\theta$$ 的无偏估计）？

**6.43** 再设我们有来自 $$\frac{1}{\sigma} f\bigl( (x - \theta)/\sigma \bigr)$$（位置—尺度 pdf）的随机样本 $$X_1, \ldots, X_n$$，但现要估计 $$\sigma^2$$。可以考虑三个变换群：

$$
\mathcal{G}_1 = \{ g_{a, c}(\textbf{x}) : -\infty < a < \infty,\ c > 0 \}, \quad g_{a, c}(x_1, \ldots, x_n) = (c x_1 + a, \ldots, c x_n + a);
$$

$$
\mathcal{G}_2 = \{ g_a(\textbf{x}) : -\infty < a < \infty \}, \quad g_a(x_1, \ldots, x_n) = (x_1 + a, \ldots, x_n + a);
$$

$$
\mathcal{G}_3 = \{ g_c(\textbf{x}) : c > 0 \}, \quad g_c(x_1, \ldots, x_n) = (c x_1, \ldots, c x_n).
$$

(a) 证明形如 $$k S^2$$（$$k$$ 为正常数，$$S^2$$ 为样本方差）的 $$\sigma^2$$ 估计量关于 $$\mathcal{G}_2$$ 不变，关于其余两群等变；(b) 证明更大一类的 $$\sigma^2$$ 估计量——形如（Brewster and Zidek, 1974）

$$
W(X_1, \ldots, X_n) = \phi\Bigl( \frac{\bar{X}^2}{S} \Bigr)\, S,
$$

其中 $$\phi(x)$$ 是函数——关于 $$\mathcal{G}_3$$ 等变，但除非 $$\phi(x)$$ 为常数，关于 $$\mathcal{G}_1$$ 与 $$\mathcal{G}_2$$ 都不等变。对这类估计量的考察使 Stein (1964) 与 Brewster and Zidek (1974) 找到了方差的改进估计（见 Lehmann and Casella 1998, Section 3.3）。

## 6.6 杂记（Miscellanea）

### 6.6.1 Basu 定理的逆（The Converse of Basu's Theorem）

一个有趣的统计事实是 Basu 定理的逆不成立：即若 $$T(\textbf{X})$$ 与每个辅助统计量独立，并不能推出 $$T(\textbf{X})$$ 是完备的最小充分统计量。Lehmann (1981) 对该主题给出了特别漂亮的处理。他指出逆命题失败的一个原因是：辅助性是统计量整个分布的性质，而完备性只涉及期望的性质。考虑辅助性定义的下述修改。

> **定义 6.6.1（一阶辅助统计量）**
>
> 若 $$\mathrm{E}_{\theta}\, V(\textbf{X})$$ 不依赖 $$\theta$$，则称统计量 $$V(\textbf{X})$$ 是***一阶辅助的***（first-order ancillary）。

Lehmann 随后证明了下面的定理，它算得上是 Basu 定理的某种逆。

> **定理 6.6.2（Basu 定理的逆）**
>
> 设 $$T$$ 是满足 $$\mathrm{Var} T < \infty$$ 的统计量。$$T$$ 完备的充分必要条件是：每个有界的一阶辅助量 $$V$$ 与 $$T$$ 的每个有界实值函数（对一切 $$\theta$$）不相关。

Lehmann 还指出：若不修改辅助性的定义而修改完备性的定义，也能得到某种类型的逆命题。

### 6.6.2 关于辅助性的困惑（Confusion About Ancillarity）

辅助性概念的一个问题是辅助性有许多不同的定义，各定义给出的性质也不同。如本章所见，只有一种定义时辅助性已经够令人困惑了——五六种定义并存的情形简直无望。

如 Buehler (1982) 所述，辅助性概念可追溯到 Sir Ronald Fisher (1925)，“他留下了一条迷人概念的独特轨迹却没有留下定义”。Buehler 接着讲述了至少三种辅助性定义，并把功劳（等等）归于 Basu (1959) 与 Cox and Hinkley (1974)。Buehler 给出了辅助统计量的八条性质并列出 25 个例子。

然而，理解辅助性这一困难课题仍值得努力，因为它可以在推断中扮演重要角色。Brown (1990) 展示了辅助性如何影响回归中的推断；Reid (1995) 综述了辅助性（及其他取条件方式）在推断中的作用。Lehmann and Scholz (1992) 的综述文章是进入该主题的良好入口。

### 6.6.3 关于充分性的更多内容（More on Sufficiency）

**充分性与似然**　 定理 6.2.13 的陈述与似然原理之间有惊人的相似：两者都涉及比值 $$L(\theta \mid \textbf{x}) / L(\theta \mid \textbf{y})$$，一个用于描述最小充分统计量，另一个用于描述似然原理。事实上，稍加小心即可把这两个定理合并为：$$T(\textbf{x})$$ 是最小充分统计量当且仅当它是 $$L(\theta \mid \textbf{x})$$ 的一一函数（满足 (6.3.1) 的两个样本点称为有相同的似然函数）。例 6.3.3 与习题 6.9 例示了这一点。

**充分性与必要性**　 我们可能会问：“既然有充分统计量，为什么没有必要统计量？”事实上有。按 Dynkin (1951)，有如下定义。

> **定义 6.6.3（必要统计量）**
>
> 若一个统计量可以写成每个充分统计量的函数，则称它为***必要的***（necessary）。

比较必要统计量与最小充分统计量的定义，下面的定理应不出所料。

> **定理 6.6.4（充分必要统计量）**
>
> 一个统计量是最小充分统计量，当且仅当它既是必要的又是充分的。

**最小充分性**　 最小充分性有一个有趣的发展，它实际来自定理 6.2.13（见习题 6.28），在建立指数族之外的最小充分性时极为有用。

> **定理 6.6.5（最小充分统计量）**
>
> 设密度族 $$\{f_0(x), f_1(x), \ldots, f_k(x)\}$$ 有公共支撑。则
>
> - a. 统计量
>
>   $$
>   T(\textbf{X}) = \Biggl( \frac{f_1(\textbf{X})}{f_0(\textbf{X})},\ \frac{f_2(\textbf{X})}{f_0(\textbf{X})},\ \ldots,\ \frac{f_k(\textbf{X})}{f_0(\textbf{X})} \Biggr)
>   $$
>
>   是族 $$\{f_0(x), f_1(x), \ldots, f_k(x)\}$$ 的最小充分统计量；
>
> - b. 若 $$\mathcal{F}$$ 是有公共支撑的密度族，且
>
>   - i. $$f_i(\textbf{x}) \in \mathcal{F}$$，$$i = 0, 1, \ldots, k$$；
>
>   - ii. $$T(\textbf{x})$$ 对 $$\mathcal{F}$$ 充分；
>
>
>   则 $$T(\textbf{x})$$ 对 $$\mathcal{F}$$ 最小充分。

虽然定理 6.6.5 可用于建立 $$n(\theta, 1)$$ 族中 $$\bar{X}$$ 的最小充分性，其真正的用处在于走出简单情形之后。例如定理 6.6.5 可用于证明：来自逻辑斯蒂或双指数等分布的样本，其次序统计量是最小充分的（习题 6.26）；更进一步可以推广到非参数分布族（习题 6.29）。

关于最小充分性与完备性的更多内容见 Lehmann and Casella (1998, Section 1.6)。

---
