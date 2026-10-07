---
layout: note
kind: note
title: "第 7 章　点估计（Point Estimation）"
course: statistics
order: 7
date: 2026-10-07
permalink: /statistics/chap07.html
---

# 第 7 章　点估计（Point Estimation）

> *“What! you have solved it already?”*
>
> *“Well, that would be too much to say. I have discovered a suggestive fact, that is all.”*
>
> “怎么！你已经破案了？”“这个嘛，不能说得太满。我只是发现了一个有启发的事实，仅此而已。”
>
> ——华生医生与歇洛克·福尔摩斯（《四签名》）

## 7.1 引言（Introduction）

本章分为两部分：第一部分讨论寻找估计量的方法，第二部分讨论评价这些（及其他）估计量。一般而言，这两项活动交织在一起；评价估计量的方法常常会提示新的估计量。不过目前我们暂且区分“寻找估计量”与“评价估计量”。

点估计的基本原理相当简单：当抽样来自由 pdf 或 pmf $$f(x \mid \theta)$$ 描述的总体时，知道 $$\theta$$ 便知道整个总体。因此，寻求求出点 $$\theta$$ 的好估计量的方法——即好的***点估计量***（point estimator）——是自然的。参数 $$\theta$$ 往往也有有意义的物理诠释（如总体均值），因此直接关心获得 $$\theta$$ 的好的点估计。也可能关心 $$\theta$$ 的某个函数，如 $$\tau(\theta)$$；本章的方法同样可用于获得 $$\tau(\theta)$$ 的估计量。

下面的点估计量定义看似过于含糊，但此刻我们希望小心行事，不把任何候选者排除在考虑之外。

> **定义 7.1.1（点估计量）**
>
> ***点估计量***是样本的任意函数 $$W(X_1, \ldots, X_n)$$。也就是说，任何统计量都是点估计量。

注意该定义完全没有提及估计量与其欲估参数之间的对应关系。虽然可以争论应把这种陈述写进定义，但那样会限制可用估计量的集合。定义也未提及统计量 $$W(X_1, \ldots, X_n)$$ 的取值范围；原则上统计量的范围应与参数的范围一致，但我们将看到情况并非总是如此。

必须弄清一个区分：估计量（estimator）与估计值（estimate）之别。估计量是样本的函数，而估计值是估计量在样本实际取得时的实现值（即一个数）。记号上，取得样本后，估计量是随机变量 $$X_1, \ldots, X_n$$ 的函数，而估计值是实现值 $$x_1, \ldots, x_n$$ 的函数。

许多情形下某个特定参数会有显而易见或自然的点估计量候选：例如样本均值是总体均值的自然候选。然而一旦离开这类简单情形，直觉不但会抛弃我们，还可能把我们引入歧途。因此拥有一些至少能给出合理候选的技术是有用的。要注意这些技术不带任何保证：它们给出的点估计量在价值确立之前仍须加以评价。

## 7.2 寻找估计量的方法（Methods of Finding Estimators）

有些情形下决定如何估计参数很容易，单凭直觉常能引导我们得到很好的估计量；例如用参数的样本对应物去估计它通常合理，样本均值就是总体均值的好估计。但在实践中常见的更复杂模型里，我们需要更有章法的参数估计方式。本节详述四种寻找估计量的方法。

### 7.2.1 矩方法（Method of Moments）

矩方法也许是最古老的寻找点估计量的方法，至少可追溯到十九世纪末的 Karl Pearson。它简单易用，几乎总能给出某种估计；遗憾的是许多情形下它给出的估计量可以被改进。但当其他方法难以实施时，它是一个好的起点。

设 $$X_1, \ldots, X_n$$ 是来自具有 pdf 或 pmf $$f(x \mid \theta_1, \ldots, \theta_k)$$ 的总体的样本。***矩估计量***（method of moments estimators）通过令前 $$k$$ 个样本矩等于相应的 $$k$$ 个总体矩、并求解所得联立方程组而得。更精确地，定义

$$
\begin{aligned}
m_1 &= \frac{1}{n} \sum_{i=1}^{n} X_i, &\quad \mu_1' &= \mathrm{E} X_1,\\
m_2 &= \frac{1}{n} \sum_{i=1}^{n} X_i^2, &\quad \mu_2' &= \mathrm{E} X_2^2,\\
&\;\;\vdots\\
m_k &= \frac{1}{n} \sum_{i=1}^{n} X_i^k, &\quad \mu_k' &= \mathrm{E} X_k^k.
\end{aligned} \tag{7.2.1}
$$

总体矩 $$\mu_j'$$ 通常是 $$\theta_1, \ldots, \theta_k$$ 的函数，记 $$\mu_j'(\theta_1, \ldots, \theta_k)$$。$$(\theta_1, \ldots, \theta_k)$$ 的矩估计量 $$(\tilde{\theta}_1, \ldots, \tilde{\theta}_k)$$ 通过把下列方程组解出 $$(\theta_1, \ldots, \theta_k)$$（用 $$(m_1, \ldots, m_k)$$ 表示）而得：

$$
\begin{aligned}
m_1 &= \mu_1'(\theta_1, \ldots, \theta_k),\\
m_2 &= \mu_2'(\theta_1, \ldots, \theta_k),\\
&\;\;\vdots\\
m_k &= \mu_k'(\theta_1, \ldots, \theta_k).
\end{aligned} \tag{7.2.2}
$$

> **例 7.2.1（正态的矩方法）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\theta, \sigma^2)$$。按上述记号，$$\theta_1 = \theta$$、$$\theta_2 = \sigma^2$$。我们有 $$m_1 = \bar{X}$$，$$m_2 = \frac{1}{n} \sum X_i^2$$，$$\mu_1' = \theta$$，$$\mu_2' = \theta^2 + \sigma^2$$，故须解
>
> $$
\bar{X} = \theta, \qquad \frac{1}{n} \sum_{i} X_i^2 = \theta^2 + \sigma^2.
$$
>
> 解出 $$\theta$$ 与 $$\sigma^2$$ 得矩估计量
>
> $$
\tilde{\theta} = \bar{X} \qquad\text{与}\qquad \tilde{\sigma}^2 = \frac{1}{n} \sum_{i} X_i^2 - \bar{X}^2 = \frac{1}{n} \sum \bigl( X_i - \bar{X} \bigr)^2.
$$

在这个简单例子中，矩方法与直觉一致，多少也印证了两者。但当没有明显的估计量浮现时，该方法更有助益。

> **例 7.2.2（二项的矩方法）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{binomial}(k, p)$$，即
>
> $$
P(X_i = x \mid k, p) = \binom{k}{x}\, p^{x} (1 - p)^{k - x}, \qquad x = 0, 1, \ldots, k.
$$
>
> 这里设 $$k$$ 与 $$p$$ 都未知，并希望得到两个参数的点估计量。（二项模型的这一略为特别的用法曾被用于估计存在大量未报案情形的犯罪率：对这样的犯罪，真实报案率 $$p$$ 与总发生数 $$k$$ 都未知。）
>
> 令前两个样本矩等于总体矩，得方程组
>
> $$
\bar{X} = k p, \qquad \frac{1}{n} \sum_{i} X_i^2 = k p (1 - p) + k^2 p^2,
$$
>
> 解出 $$k$$ 与 $$p$$。稍作代数运算，得矩估计量
>
> $$
\tilde{k} = \frac{\bar{X}^2}{\bar{X} - (1/n) \sum (X_i - \bar{X})^2} \qquad\text{与}\qquad \tilde{p} = \frac{\bar{X}}{\tilde{k}}.
$$
>
> 诚然这不是总体参数的最好估计：$$k$$ 与 $$p$$ 可能得到负的估计，而它们必须是正数。（这正是估计量取值范围与其所估参数范围不一致的情形。）不过平心而论，注意负估计只会在样本均值小于样本方差（即数据变异很大）时出现。矩方法在此至少给出了 $$k$$ 与 $$p$$ 的一组点估计量候选：直觉或许能给出 $$p$$ 的估计量候选，但要拿出 $$k$$ 的估计量却困难得多。

矩方法在获得统计量分布的近似方面也很有用。这一技术有时称为“矩匹配”，通过匹配分布的矩给出近似。理论上可以把任何统计量的分布的矩与任何分布的矩相匹配，但实践中最好使用相似的分布。下面的例子演示该技术最著名的用途之一——Satterthwaite (1946) 的近似，它至今仍在使用（见习题 8.42）。

> **例 7.2.3（Satterthwaite 近似）**
>
> 若 $$Y_i$$（$$i = 1, \ldots, k$$）是独立的 $$\chi_{r_i}^2$$ 随机变量，我们已经看到（引理 5.3.2）$$\sum Y_i$$ 的分布也是卡方，自由度为 $$\sum r_i$$。遗憾的是，$$\sum a_i Y_i$$（$$a_i$$ 为已知常数）的分布一般很难求得。但假定某个 $$\chi_\nu^2$$ 能提供好的近似是合理的。
>
> 这几乎就是 Satterthwaite 的问题：他想近似一个 $$t$$ 统计量的分母，而 $$\sum a_i Y_i$$ 正是其统计量分母的平方。于是对给定的 $$a_1, \ldots, a_k$$，他想找到 $$\nu$$ 值使
>
> $$
\sum_{i=1}^{k} a_i\, Y_i \sim \frac{\chi_{\nu}^2}{\nu} \qquad \text{（近似）}.
$$
>
> 由于 $$\mathrm{E}\bigl( \chi_\nu^2 / \nu \bigr) = 1$$，匹配一阶矩需要
>
> $$
\mathrm{E}\Biggl[ \sum_{i=1}^{k} a_i Y_i \Biggr] = \sum_{i=1}^{k} a_i\, \mathrm{E} Y_i = \sum_{i=1}^{k} a_i\, r_i = 1,
$$
>
> 这给出对诸 $$a_i$$ 的约束，但没有告诉我们如何估计 $$\nu$$。为此须匹配二阶矩：
>
> $$
\mathrm{E}\Biggl[ \sum_{i=1}^{k} a_i Y_i \Biggr]^2 = \mathrm{E}\Biggl[ \frac{\chi_{\nu}^2}{\nu} \Biggr]^2 = \frac{2}{\nu} + 1.
$$
>
> 应用矩方法，舍去第一个期望并解出 $$\nu$$，得
>
> $$
\hat{\nu} = \frac{2}{\Bigl( \sum_{i=1}^{k} a_i Y_i \Bigr)^2 - 1}.
$$
>
> 这样，矩方法的直截应用给出了 $$\nu$$ 的一个估计量，但它可能为负。我们可以想见 Satterthwaite 对这种可能性大为惊愕——因为这并非他提出的估计量。他加倍努力，按如下方式改造矩方法。写
>
> $$
\mathrm{E}\Biggl[ \sum_{i=1}^{k} a_i Y_i \Biggr]^2 = \mathrm{Var}\Biggl[ \sum_{i=1}^{k} a_i Y_i \Biggr] + \Bigl( \mathrm{E}\Bigl[ \sum_{i=1}^{k} a_i Y_i \Bigr] \Bigr)^{2}
= \Bigl( \mathrm{E}\Bigl[ \sum_{i=1}^{k} a_i Y_i \Bigr] \Bigr)^{2}\, \Biggl[ \frac{\mathrm{Var}\bigl( \sum_{i=1}^{k} a_i Y_i \bigr)}{\bigl( \mathrm{E}\sum_{i=1}^{k} a_i Y_i \bigr)^2} + 1 \Biggr]
$$
>
> $$
= \frac{\mathrm{Var}\bigl( \sum_{i=1}^{k} a_i Y_i \bigr)}{\bigl( \mathrm{E} \sum_{i=1}^{k} a_i Y_i \bigr)^2} + 1 \qquad （\mathrm{E} \sum a_i Y_i = 1）.
$$
>
> 现在匹配二阶矩得
>
> $$
\nu = \frac{2\, \bigl( \mathrm{E} \sum_{i=1}^{k} a_i Y_i \bigr)^2}{\mathrm{Var}\bigl( \sum_{i=1}^{k} a_i Y_i \bigr)}.
$$
>
> 最后利用 $$Y_1, \ldots, Y_k$$ 是独立卡方随机变量的事实写出
>
> $$
\mathrm{Var}\Biggl[ \sum_{i=1}^{k} a_i Y_i \Biggr] = \sum_{i} a_i^2\, \mathrm{Var} Y_i = 2 \sum_i \frac{a_i^2\, (\mathrm{E} Y_i)^2}{r_i} \qquad （\mathrm{Var} Y_i = 2 (\mathrm{E} Y_i)^2 / r_i）.
$$
>
> 代入该方差表达式并去掉期望，得 Satterthwaite 估计量
>
> $$
\hat{\nu} = \frac{\bigl( \sum_{i} a_i Y_i \bigr)^2}{\sum_{i} \dfrac{a_i^2}{r_i}\, Y_i^2}.
$$
>
> 这一近似相当好，至今仍被广泛使用。注意 Satterthwaite 成功地得到了恒正的估计量，从而避免了直截矩方法估计量的明显问题。

### 7.2.2 最大似然估计量（Maximum Likelihood Estimators）

最大似然法是迄今为止导出估计量最流行的技术。回顾若 $$X_1, \ldots, X_n$$ 是来自具有 pdf 或 pmf $$f(x \mid \theta_1, \ldots, \theta_k)$$ 的总体的 iid 样本，似然函数定义为

$$
L(\theta \mid \textbf{x}) = L(\theta_1, \ldots, \theta_k \mid x_1, \ldots, x_n) = \prod_{i=1}^{n} f(x_i \mid \theta_1, \ldots, \theta_k). \tag{7.2.3}
$$

> **定义 7.2.4（最大似然估计量）**
>
> 对每个样本点 **x**，设 $$\hat{\theta}(\textbf{x})$$ 是使 $$L(\theta \mid \textbf{x})$$ 作为 $$\theta$$ 的函数（固定 **x**）取得最大值的参数值。基于样本 **X** 的参数 $$\theta$$ 的***最大似然估计量***（maximum likelihood estimator，MLE）是 $$\hat{\theta}(\textbf{X})$$。

注意按其构造，MLE 的取值范围与参数的取值范围一致。谈论估计量的实现值时，我们也用缩写 MLE 表示最大似然估计值。

直观上 MLE 是合理的估计量选择：MLE 是使观测样本最可能出现的参数点。一般而言，MLE 是好的点估计量，拥有后文讨论的一些最优性质。

求函数最大值的一般问题（从而最大似然估计）有两个固有的困难。第一个是真正找到全局最大并验证确实找到全局最大。多数情形这归结为简单的微分计算练习，但即使对常见密度，困难也会出现。第二个问题是数值敏感性：估计值对数据的微小变化有多敏感？（严格说这是与任何最大化程序相伴的数学问题而非统计问题；但既然 MLE 通过最大化程序求得，这就是我们必须面对的问题。）遗憾的是，略为不同的样本有时会给出天差地别的 MLE，使其使用可疑。我们先考虑求 MLE 的问题。

若似然函数（对 $$\theta_i$$）可微，MLE 的可能候选是解

$$
\frac{\partial}{\partial \theta_i}\, L(\theta \mid \textbf{x}) = 0, \qquad i = 1, \ldots, k \tag{7.2.4}
$$

的 $$(\theta_1, \ldots, \theta_k)$$ 值。

注意 (7.2.4) 的解只是 MLE 的可能候选：一阶导数为零只是极大值的必要条件而非充分条件。此外一阶导数的零点只定位函数定义域内部的极值点；若极值出现在边界上，一阶导数可能不为零，故边界必须单独检查极值。

一阶导数为零的点可能是局部或全局极小、局部或全局极大，或拐点；我们的任务是找到全局最大。

> **例 7.2.5（正态似然）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\theta, 1)$$，$$L(\theta \mid \textbf{x})$$ 为似然函数。则
>
> $$
L(\theta \mid \textbf{x}) = \prod_{i=1}^{n} \frac{1}{(2\pi)^{1/2}}\, e^{-(1/2)(x_i - \theta)^2} = \frac{1}{(2\pi)^{n/2}}\, e^{(-1/2) \sum_{i=1}^{n} (x_i - \theta)^2}.
$$
>
> 方程 $$(d/d\theta)\, L(\theta \mid \textbf{x}) = 0$$ 化为
>
> $$
\sum_{i=1}^{n} (x_i - \theta) = 0,
$$
>
> 其解为 $$\hat{\theta} = \bar{x}$$，故 $$\bar{x}$$ 是 MLE 的候选。为验证 $$\bar{x}$$ 确实是似然函数的全局最大，可用如下论证：首先 $$\hat{\theta} = \bar{x}$$ 是 $$\sum (x_i - \theta) = 0$$ 的唯一解，故 $$\bar{x}$$ 是一阶导数的唯一零点；其次验证
>
> $$
\left. \frac{d^2}{d\theta^2}\, L(\theta \mid \textbf{x}) \right\vert _{\theta = \bar{x}} < 0.
$$
>
> 于是 $$\bar{x}$$ 是内部唯一的极值点且是极大值。最后验证 $$\bar{x}$$ 是全局最大还须检查边界 $$\pm \infty$$：取极限容易确立似然在 $$\pm \infty$$ 处为零。故 $$\hat{\theta} = \bar{x}$$ 是全局最大，$$\bar{X}$$ 是 MLE。（其实可以更聪明些而免去检查 $$\pm \infty$$：既然已确立 $$\bar{x}$$ 是内部唯一极值点且是极大值，$$\pm \infty$$ 处就不可能再有最大——否则内部必有极小，与唯一性矛盾。）

求 MLE 的另一办法是放弃求导、直接最大化。这一方法代数上通常更简单（尤其当导数变得凌乱时），但有时更难实施，因为没有成规可循。一个一般技巧是找到似然函数的全局上界，然后确立上界在某唯一点被达到。

> **例 7.2.6（例 7.2.5 的继续）**
>
> 回顾（定理 5.2.4）对任意数 $$a$$，
>
> $$
\sum_{i=1}^{n} (x_i - a)^2 \geq \sum_{i=1}^{n} (x_i - \bar{x})^2,
$$
>
> 等号成立当且仅当 $$a = \bar{x}$$。这意味着对任意 $$\theta$$，
>
> $$
e^{-(1/2) \sum (x_i - \theta)^2} \leq e^{-(1/2) \sum (x_i - \bar{x})^2},
$$
>
> 等号成立当且仅当 $$\theta = \bar{x}$$。故 $$\bar{X}$$ 是 MLE。

多数情形（尤其要使用求导时），处理 $$L(\theta \mid \textbf{x})$$ 的自然对数 $$\log L(\theta \mid \textbf{x})$$（称为对数似然）比直接处理 $$L(\theta \mid \textbf{x})$$ 更容易。这是可行的，因为 $$\log$$ 函数在 $$(0, \infty)$$ 上严格递增，意味着 $$L(\theta \mid \textbf{x})$$ 与 $$\log L(\theta \mid \textbf{x})$$ 的极值点重合（见习题 7.3）。

> **例 7.2.7（伯努利 MLE）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{Bernoulli}(p)$$。似然函数为
>
> $$
L(p \mid \textbf{x}) = \prod_{i=1}^{n} p^{x_i} (1 - p)^{1 - x_i} = p^{y} (1 - p)^{n - y},
$$
>
> 其中 $$y = \sum x_i$$。该函数求导并不太难，但对数似然
>
> $$
\log L(p \mid \textbf{x}) = y \log p + (n - y) \log(1 - p)
$$
>
> 求导容易得多。若 $$0 < y < n$$，对 $$\log L(p \mid \textbf{x})$$ 求导并令其为零，解得 $$\hat{p} = y/n$$；验证 $$y/n$$ 是全局最大也很直截。若 $$y = 0$$ 或 $$y = n$$，则
>
> $$
\log L(p \mid \textbf{x}) = \begin{cases} n \log(1 - p) & \text{若}\ y = 0,\\ n \log p & \text{若}\ y = n. \end{cases}
$$
>
> 两种情形下 $$\log L(p \mid \textbf{x})$$ 都是 $$p$$ 的单调函数，同样直截地验证每种情形都有 $$\hat{p} = y/n$$。故我们证明了 $$\sum X_i / n$$ 是 $$p$$ 的 MLE。

在上述推导中我们假设参数空间为 $$0 \leq p \leq 1$$：$$p = 0$$ 与 1 必须在参数空间内，$$\hat{p} = y/n$$ 才是 $$y = 0$$ 与 $$n$$ 时的 MLE。对比例 3.4.1——那里取 $$0 < p < 1$$ 以满足指数族的要求。

求最大似然估计量时还要注意一点：最大化只在参数值的范围上进行。某些情形这一点很重要。

> **例 7.2.8（受限范围的 MLE）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\theta, 1)$$，已知 $$\theta$$ 必非负。若对 $$\theta$$ 无限制，我们看到 $$\theta$$ 的 MLE 是 $$\bar{X}$$；但若 $$\bar{X}$$ 为负，它就在参数范围之外。
>
> 若 $$\bar{x}$$ 为负，容易检查（见习题 7.4）$$L(\theta \mid \textbf{x})$$ 在 $$\theta \geq 0$$ 上关于 $$\theta$$ 递减，在 $$\hat{\theta} = 0$$ 处取最大。故此时 $$\theta$$ 的 MLE 为
>
> $$
\hat{\theta} = \bar{X}\ \text{（若}\ \bar{X} \geq 0\text{）} \qquad\text{且}\qquad \hat{\theta} = 0\ \text{（若}\ \bar{X} < 0\text{）}.
$$

若 $$L(\theta \mid \textbf{x})$$ 无法解析最大化，也许可以用计算机数值地最大化 $$L(\theta \mid \textbf{x})$$。事实上这正是 MLE 最重要的特征之一：只要模型（似然）能够写出，就有希望数值地最大化它、从而找到参数的 MLE。此时仍然总存在“找到的是局部还是全局最大”的问题。因此在使用数值最大化之前，尽可能多地分析似然函数、找出其局部极大的个数与性质，总是重要的。

> **例 7.2.9（二项 MLE，试验数未知）**
>
> 设 $$X_1, \ldots, Xn$$ 是来自 $$\mathrm{binomial}(k, p)$$ 总体的随机样本，$$p$$ 已知而 $$k$$ 未知。例如，抛一枚已知均匀的硬币并观测到 $$x_i$$ 次正面，但不知道硬币被抛了多少次。似然函数为
>
> $$
L(k \mid \textbf{x}, p) = \prod_{i=1}^{n} \binom{k}{x_i}\, p^{x_i} (1 - p)^{k - x_i}.
$$
>
> 由于阶乘的存在以及 $$k$$ 必须是整数，用求导最大化 $$L(k \mid \textbf{x}, p)$$ 很困难，我们换一种思路。
>
> 当然 $$k < \max_i x_i$$ 时 $$L(k \mid \textbf{x}, p) = 0$$。故 MLE 是满足 $$L(k \mid \textbf{x}, p)/L(k - 1 \mid \textbf{x}, p) \geq 1$$ 且 $$L(k + 1 \mid \textbf{x}, p)/L(k \mid \textbf{x}, p) < 1$$ 的整数 $$k \geq \max_i x_i$$。我们将证明这样的 $$k$$ 唯一。似然比为
>
> $$
\frac{L(k \mid \textbf{x}, p)}{L(k - 1 \mid \textbf{x}, p)} = \frac{(k (1 - p))^{n}}{\prod_{i=1}^{n} (k - x_i)}.
$$
>
> 故最大值条件为
>
> $$
\bigl( k (1 - p) \bigr)^{n} \geq \prod_{i=1}^{n} (k - x_i) \qquad\text{且}\qquad \bigl( (k + 1)(1 - p) \bigr)^{n} < \prod_{i=1}^{n} (k + 1 - x_i).
$$
>
> 除以 $$k^n$$ 并令 $$z = 1/k$$，要在 $$0 \leq z \leq 1/\max_i x_i$$ 上解
>
> $$
(1 - p)^{n} = \prod_{i=1}^{n} (1 - x_i\, z).
$$
>
> 右端在此范围内显然是 $$z$$ 的严格递减函数，在 $$z = 0$$ 处值为 1、在 $$z = 1/\max_i x_i$$ 处值为 0。故存在唯一解 $$z$$（记作 $$\hat{z}$$）。量 $$1/\hat{z}$$ 可能不是整数；满足不等式、且为 MLE 的整数 $$\hat{k}$$ 是不超过 $$1/\hat{z}$$ 的最大整数（见习题 7.5）。于是这一分析表明似然函数有唯一最大，且可以通过数值求解一个 $$n$$ 次多项式方程找到它。$$k$$ 的这一 MLE 描述由 Feldman and Fox (1968) 发现；关于估计 $$k$$ 的更多内容见例 7.2.13。

最大似然估计量的一条有用性质是所谓的最大似然估计量的不变性（invariance property，不要与第 6 章讨论的不变性混淆）。设某分布以参数 $$\theta$$ 索引，但关心的是找 $$\theta$$ 的某个函数 $$\tau(\theta)$$ 的估计量。非正式地说，MLE 的不变性说的是：若 $$\hat{\theta}$$ 是 $$\theta$$ 的 MLE，则 $$\tau(\hat{\theta})$$ 是 $$\tau(\theta)$$ 的 MLE。例如若 $$\theta$$ 是正态分布的均值，$$\sin(\theta)$$ 的 MLE 就是 $$\sin(\bar{X})$$。我们呈现 Zehna (1966) 的处理；MLE 不变性的其他途径见 Pal and Berry (1992)。

要形式化 MLE 的不变性当然存在一些技术问题，它们大多集中于我们要估计的函数 $$\tau(\theta)$$。若映射 $$\theta \to \tau(\theta)$$ 是一一的（每个 $$\theta$$ 有唯一的 $$\tau(\theta)$$ 值，反之亦然），则没有问题：此时容易看出以 $$\theta$$ 为变量还是以 $$\tau(\theta)$$ 为变量最大化似然没有区别——两种情形得到相同答案。令 $$\eta = \tau(\theta)$$，则逆函数 $$\tau^{-1}(\eta) = \theta$$ 良定义，$$\tau(\theta)$$ 的似然函数（写成 $$\eta$$ 的函数）为

$$
L^{*}(\eta \mid \textbf{x}) = \prod_{i=1}^{n} f\bigl( x_i \mid \tau^{-1}(\eta) \bigr) = L\bigl( \tau^{-1}(\eta) \mid \textbf{x} \bigr),
$$

且

$$
\sup_{\eta} L^{*}(\eta \mid \textbf{x}) = \sup_{\eta} L\bigl( \tau^{-1}(\eta) \mid \textbf{x} \bigr) = \sup_{\theta} L(\theta \mid \textbf{x}).
$$

故 $$L^{*}(\eta \mid \textbf{x})$$ 的最大在 $$\eta = \tau(\theta) = \tau(\hat{\theta})$$ 处取得，表明 $$\tau(\theta)$$ 的 MLE 是 $$\tau(\hat{\theta})$$。

许多情形下这一简单版本的不变性不适用，因为我们关心的许多函数不是一一的。例如要估计正态均值的平方 $$\theta^2$$，映射 $$\theta \to \theta^2$$ 不是一一的。于是需要更一般的定理，事实上需要 $$\tau(\theta)$$ 的似然函数的更一般定义。

若 $$\tau(\theta)$$ 不是一一的，则对给定值 $$\eta$$ 可能有多于一个 $$\theta$$ 满足 $$\tau(\theta) = \eta$$；此时对 $$\eta$$ 的最大化与对 $$\theta$$ 的最大化之间的对应可能失效。例如若 $$\hat{\theta}$$ 是 $$\theta$$ 的 MLE，可能存在另一个 $$\theta$$ 值 $$\theta_0$$ 使 $$\tau(\hat{\theta}) = \tau(\theta_0)$$；我们需要避免这类困难。

为此对 $$\tau(\theta)$$ 定义诱导似然函数（induced likelihood function）$$L^{*}$$：

$$
L^{*}(\eta \mid \textbf{x}) = \sup_{\lbrace  \theta : \tau(\theta) = \eta  \rbrace} L(\theta \mid \textbf{x}). \tag{7.2.5}
$$

最大化 $$L^{*}(\eta \mid \textbf{x})$$ 的值 $$\hat{\eta}$$ 将称为 $$\eta = \tau(\theta)$$ 的 MLE；由 (7.2.5) 可见 $$L^{*}$$ 与 $$L$$ 的最大值重合。

> **定理 7.2.10（MLE 的不变性）**
>
> 若 $$\hat{\theta}$$ 是 $$\theta$$ 的 MLE，则对任意函数 $$\tau(\theta)$$，$$\tau(\theta)$$ 的 MLE 是 $$\tau(\hat{\theta})$$。
>
> **证明**　设 $$\hat{\eta}$$ 表示最大化 $$L^{*}(\eta \mid \textbf{x})$$ 的值。须证 $$L^{*}(\hat{\eta} \mid \textbf{x}) = L^{*}\bigl[ \tau(\hat{\theta}) \mid \textbf{x} \bigr]$$。如上所述，$$L$$ 与 $$L^{*}$$ 的最大值重合，故
>
> $$
L^{*}(\hat{\eta} \mid \textbf{x}) = \sup_{\eta}\, \sup_{\lbrace \theta : \tau(\theta) = \eta \rbrace}\, L(\theta \mid \textbf{x}) = \sup_{\theta} L(\theta \mid \textbf{x}) = L(\hat{\theta} \mid \textbf{x}),
$$
>
> （$$L^{*}$$ 的定义；第二个等式由“迭代最大化等于对 $$\theta$$ 的无条件最大化、且在 $$\hat{\theta}$$ 处取得”。）进一步，
>
> $$
L(\hat{\theta} \mid \textbf{x}) = \sup_{\lbrace \theta : \tau(\theta) = \tau(\hat{\theta}) \rbrace}\, L(\theta \mid \textbf{x}) = L^{*}\bigl[ \tau(\hat{\theta}) \mid \textbf{x} \bigr]
\qquad （\hat{\theta}\ \text{是 MLE}；\ L^{*}\ \text{的定义}）.
$$
>
> 故这串等式表明 $$L^{*}(\hat{\eta} \mid \textbf{x}) = L^{*}\bigl( \tau(\hat{\theta}) \mid \textbf{x} \bigr)$$，且 $$\tau(\hat{\theta})$$ 是 $$\tau(\theta)$$ 的 MLE。 ∎

用该定理，现在可见正态均值平方 $$\theta^2$$ 的 MLE 是 $$\bar{X}^2$$；还可把定理 7.2.10 应用于更复杂的函数，例如二项概率 $$p$$ 的 $$\sqrt{p (1 - p)}$$ 的 MLE 为 $$\sqrt{\hat{p} (1 - \hat{p})}$$。

结束寻找最大似然估计量的话题之前，还有几点要说明。

MLE 的不变性在多元情形成立：定理 7.2.10 的证明中没有任何内容排除 $$\theta$$ 是向量。若 $$(\theta_1, \ldots, \theta_k)$$ 的 MLE 是 $$(\hat{\theta}_1, \ldots, \hat{\theta}_k)$$，且 $$\tau(\theta_1, \ldots, \theta_k)$$ 是参数的任意函数，则 $$\tau(\theta_1, \ldots, \theta_k)$$ 的 MLE 是 $$\tau(\hat{\theta}_1, \ldots, \hat{\theta}_k)$$。

若 $$\boldsymbol{\theta} = (\theta_1, \ldots, \theta_k)$$ 是多维的，求 MLE 就是最大化多元函数。若似然函数可微，令一阶偏导为零提供内部极值的必要条件。但多维情形用二阶导数条件检查极大是件乏味的工作，可以先用其他方法。我们先演示通常更简单的技巧——逐次最大化（successive maximizations）。

> **例 7.2.11（正态 MLE，$$\mu$$ 与 $$\sigma$$ 未知）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\theta, \sigma^2)$$，$$\theta$$ 与 $$\sigma^2$$ 都未知。则
>
> $$
L(\theta, \sigma^2 \mid \textbf{x}) = \frac{1}{(2 \pi \sigma^2)^{n/2}}\, e^{-(1/2) \sum_{i=1}^{n} (x_i - \theta)^2 / \sigma^2},
$$
>
> 且
>
> $$
\log L(\theta, \sigma^2 \mid \textbf{x}) = -\frac{n}{2} \log 2\pi - \frac{n}{2} \log \sigma^2 - \frac{1}{2\sigma^2} \sum_{i=1}^{n} (x_i - \theta)^2.
$$
>
> 对 $$\theta$$ 与 $$\sigma^2$$ 的偏导数为
>
> $$
\frac{\partial}{\partial \theta}\, \log L(\theta, \sigma^2 \mid \textbf{x}) = \frac{1}{\sigma^2} \sum_{i=1}^{n} (x_i - \theta),
$$
>
> $$
\frac{\partial}{\partial \sigma^2}\, \log L(\theta, \sigma^2 \mid \textbf{x}) = -\frac{n}{2 \sigma^2} + \frac{1}{2 \sigma^4} \sum_{i=1}^{n} (x_i - \theta)^2.
$$
>
> 令这些偏导为零并求解，得 $$\hat{\theta} = \bar{x}$$，$$\hat{\sigma}^2 = \frac{1}{n} \sum_{i=1}^{n} (x_i - \bar{x})^2$$。为验证这一解确实是全局最大，先回忆：若 $$\theta \neq \bar{x}$$，则 $$\sum (x_i - \theta)^2 > \sum (x_i - \bar{x})^2$$。故对任何 $$\sigma^2$$ 值，
>
> $$
\frac{1}{(2 \pi \sigma^2)^{n/2}}\, e^{-(1/2) \sum_{i=1}^{n} (x_i - \bar{x})^2 / \sigma^2} \geq \frac{1}{(2 \pi \sigma^2)^{n/2}}\, e^{-(1/2) \sum_{i=1}^{n} (x_i - \theta)^2 / \sigma^2}. \tag{7.2.6}
$$
>
> 因此验证已找到最大似然估计量约化为一维问题：验证 $$(\sigma^2)^{-n/2} \exp\bigl( -\tfrac{1}{2} \sum (x_i - \bar{x})^2 / \sigma^2 \bigr)$$ 在 $$\sigma^2 = \frac{1}{n} \sum (x_i - \bar{x})^2$$ 处取得全局最大。用一元微积分直截可做；事实上估计量 $$\bigl( \bar{X},\ \frac{1}{n} \sum (X_i - \bar{X})^2 \bigr)$$ 就是 MLE。
>
> 注意 (7.2.6) 左端是 $$\sigma^2$$ 的轮廓似然（profile likelihood）；见杂记 7.5.5。

现在用二元微积分解决同一问题。

> **例 7.2.12（例 7.2.11 的继续）**
>
> 要用二元微积分验证函数 $$H(\theta_1, \theta_2)$$ 在 $$(\hat{\theta}_1, \hat{\theta}_2)$$ 有局部最大，必须证明下列三个条件成立。
>
> - a. 一阶偏导为零：
>
>   $$
  \left. \frac{\partial}{\partial \theta_1} H(\theta_1, \theta_2) \right\vert _{\theta_1 = \hat{\theta}_1, \theta_2 = \hat{\theta}_2} = 0 \qquad\text{与}\qquad \left. \frac{\partial}{\partial \theta_2} H(\theta_1, \theta_2) \right\vert _{\theta_1 = \hat{\theta}_1, \theta_2 = \hat{\theta}_2} = 0.
  $$
>
> - b. 至少一个二阶偏导为负：
>
>   $$
  \left. \frac{\partial^2}{\partial \theta_1^2} H(\theta_1, \theta_2) \right\vert _{\theta_1 = \hat{\theta}_1, \theta_2 = \hat{\theta}_2} < 0 \qquad\text{或}\qquad \left. \frac{\partial^2}{\partial \theta_2^2} H(\theta_1, \theta_2) \right\vert _{\theta_1 = \hat{\theta}_1, \theta_2 = \hat{\theta}_2} < 0.
  $$
>
> - c. 二阶偏导的雅可比（行列式）为正：
>
>   $$
  \left\vert  \begin{array}{cc}
  \dfrac{\partial^2 H(\theta_1, \theta_2)}{\partial \theta_1^2} & \dfrac{\partial^2 H(\theta_1, \theta_2)}{\partial \theta_1\, \partial \theta_2} \\[10pt]
  \dfrac{\partial^2 H(\theta_1, \theta_2)}{\partial \theta_1\, \partial \theta_2} & \dfrac{\partial^2 H(\theta_1, \theta_2)}{\partial \theta_2^2}
  \end{array} \right\vert _{\theta_1 = \hat{\theta}_1, \theta_2 = \hat{\theta}_2}
  = \Biggl[ \frac{\partial^2 H(\theta_1, \theta_2)}{\partial \theta_1^2}\, \frac{\partial^2 H(\theta_1, \theta_2)}{\partial \theta_2^2} - \Biggl( \frac{\partial^2 H(\theta_1, \theta_2)}{\partial \theta_1 \partial \theta_2} \Biggr)^2 \Biggr]\Biggr\vert _{\theta_1 = \hat{\theta}_1, \theta_2 = \hat{\theta}_2} > 0.
  $$
>
>
> 对正态对数似然，二阶偏导数为
>
> $$
\frac{\partial^2}{\partial \theta^2}\, \log L(\theta, \sigma^2 \mid \textbf{x}) = \frac{-n}{\sigma^2},
$$
>
> $$
\frac{\partial^2}{\partial (\sigma^2)^2}\, \log L(\theta, \sigma^2 \mid \textbf{x}) = \frac{n}{2 \sigma^4} - \frac{1}{\sigma^6} \sum_{i=1}^{n} (x_i - \theta)^2,
$$
>
> $$
\frac{\partial^2}{\partial \theta\, \partial \sigma^2}\, \log L(\theta, \sigma^2 \mid \textbf{x}) = -\frac{1}{\sigma^4} \sum_{i=1}^{n} (x_i - \theta).
$$
>
> 性质 (a) 与 (b) 容易验证成立，雅可比为
>
> $$
\left\vert  \begin{array}{cc}
-\dfrac{n}{\sigma^2} & -\dfrac{1}{\sigma^4} \sum_{i=1}^{n} (x_i - \theta) \\[10pt]
-\dfrac{1}{\sigma^4} \sum_{i=1}^{n} (x_i - \theta) & \dfrac{n}{2 \sigma^4} - \dfrac{1}{\sigma^6} \sum_{i=1}^{n} (x_i - \theta)^2
\end{array} \right\vert _{\theta = \bar{x},\, \sigma^2 = \hat{\sigma}^2}
$$
>
> $$
= \frac{1}{\hat{\sigma}^6} \Biggl[ \frac{-n^2}{2} + \frac{n^2}{\hat{\sigma}^2}\, \hat{\sigma}^2 - \frac{1}{\hat{\sigma}^2} \Biggl( \sum_{i=1}^{n} (x_i - \bar{x}) \Biggr)^2 \Biggr] = \frac{1}{\hat{\sigma}^6}\, \frac{n^2}{2} > 0.
$$
>
> 故微积分条件满足，我们确实找到了最大。（当然，要真正形式化，我们验证的是 $$(\bar{x}, \hat{\sigma}^2)$$ 是内部最大；还须检查它唯一且无穷远处没有最大。）即便在这个简单问题中，计算量已相当可观，且只会更糟（想想三个参数要做什么）。因此教训是：虽然总须验证确实找到了最大，但应寻找除二阶导数条件之外的办法。

最后，前面提到过：既然 MLE 由最大化过程求得，它们容易受到该过程相关问题（其中有数值不稳定性）的影响。现在更详细地看这个问题。

回忆似然函数是以数据 **x** 固定为常数的参数 $$\theta$$ 的函数。但既然数据带有测量误差，我们会问数据的微小变化会如何影响 MLE：我们基于 $$L(\theta \mid \textbf{x})$$ 计算 $$\hat{\theta}$$，但可能想问若基于 $$L(\theta \mid \textbf{x} + \varepsilon)$$（小 $$\varepsilon$$）计算会得到什么 MLE。直观上若 $$\varepsilon$$ 小，新 MLE（记 $$\hat{\theta}_1$$）应接近 $$\hat{\theta}$$；但并不总是如此。

> **例 7.2.13（例 7.2.2 的继续）**
>
> Olkin 等 (1981) 演示了二项抽样中 $$k$$ 与 $$p$$ 的 MLE 可以极不稳定。他们用下例说明：观测到 $$\mathrm{binomial}(k, p)$$ 实验的五个实现（$$k$$ 与 $$p$$ 都未知）。第一个数据集是 $$(16, 18, 22, 25, 27)$$（这些是未知次数二项试验中的观测成功数），该数据集 $$k$$ 的 MLE 为 $$\hat{k} = 99$$。若第二个数据集为 $$(16, 18, 22, 25, 28)$$——唯一差别是把 27 换成 28——则 $$k$$ 的 MLE 为 $$\hat{k} = 190$$，展示了巨大的变异性。

这类现象发生在似然函数在最大值附近非常平坦、或没有有限最大值时。当 MLE 可以显式求出（如我们例子中常见的那样）时通常不成问题；但许多情形（如上例）MLE 无法显式求解、必须用数值方法寻找。面对这类问题时，多花一点时间考察解的稳定性往往是明智的。

### 7.2.3 贝叶斯估计量（Bayes Estimators）

统计学的贝叶斯途径与我们迄今采取的经典途径根本不同。尽管如此，贝叶斯途径的某些方面对其他统计途径颇有帮助。在讨论求贝叶斯估计量的方法之前，先讨论统计学的贝叶斯途径。

经典途径把参数 $$\theta$$ 视为未知但固定的量：从以 $$\theta$$ 索引的总体抽取随机样本 $$X_1, \ldots, X_n$$，基于样本的观测值获得关于 $$\theta$$ 值的知识。贝叶斯途径把 $$\theta$$ 视为可以用概率分布（称为先验分布，prior distribution）描述其变异的量。这是一个主观分布，基于实验者的信念，在看到数据之前构造（故名先验）。然后从以 $$\theta$$ 索引的总体抽取样本，用样本信息更新先验分布；更新后的先验称为后验分布（posterior distribution）。这一更新用贝叶斯法则（第 1 章所见）完成，故名贝叶斯统计学。

若以 $$\pi(\theta)$$ 记先验分布、$$f(\textbf{x} \mid \theta)$$ 记抽样分布，则后验分布——给定样本 **x** 时 $$\theta$$ 的条件分布——为

$$
\pi(\theta \mid \textbf{x}) = \frac{f(\textbf{x} \mid \theta)\, \pi(\theta)}{m(\textbf{x})}, \qquad \bigl( f(\textbf{x} \mid \theta)\, \pi(\theta) = f(\textbf{x}, \theta) \bigr) \tag{7.2.7}
$$

其中 $$m(\textbf{x})$$ 是 $$\textbf{X}$$ 的边缘分布，即

$$
m(\textbf{x}) = \int f(\textbf{x} \mid \theta)\, \pi(\theta)\, d\theta. \tag{7.2.8}
$$

注意后验分布是条件分布——以观测到样本为条件。后验分布随后被用来对（仍视为随机量的）$$\theta$$ 作陈述：例如后验分布的均值可以用作 $$\theta$$ 的点估计。

> **记号**：处理参数 $$\theta$$ 上的分布时，我们将打破“随机变量用大写、变元用小写”的记号约定：可能谈论具有分布 $$\pi(\theta)$$ 的随机量 $$\theta$$。这更符合通行用法，应不会引起混淆。

> **例 7.2.14（二项贝叶斯估计）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{Bernoulli}(p)$$，则 $$Y = \sum X_i$$ 服从 $$\mathrm{binomial}(n, p)$$。设 $$p$$ 的先验分布是 $$\mathrm{beta}(\alpha, \beta)$$。$$Y$$ 与 $$p$$ 的联合分布为
>
> $$
\begin{aligned}
f(y, p) &= \binom{n}{y}\, p^{y} (1 - p)^{n - y}\, \frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha)\, \Gamma(\beta)}\, p^{\alpha - 1} (1 - p)^{\beta - 1} \qquad （\text{条件}\times\text{边缘}，\ f(y \mid p) \times \pi(p)）\\
&= \binom{n}{y}\, \frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha)\, \Gamma(\beta)}\, p^{y + \alpha - 1} (1 - p)^{n - y + \beta - 1}.
\end{aligned}
$$
>
> $$Y$$ 的边缘 pdf 为
>
> $$
f(y) = \int_0^1 f(y, p)\, dp = \binom{n}{y}\, \frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha)\, \Gamma(\beta)}\, \frac{\Gamma(y + \alpha)\, \Gamma(n - y + \beta)}{\Gamma(n + \alpha + \beta)}, \tag{7.2.9}
$$
>
> 该分布称为贝塔—二项分布（见习题 4.34 与例 4.4.6）。后验分布（给定 $$y$$ 时 $$p$$ 的分布）为
>
> $$
f(p \mid y) = \frac{f(y, p)}{f(y)} = \frac{\Gamma(n + \alpha + \beta)}{\Gamma(y + \alpha)\, \Gamma(n - y + \beta)}\, p^{y + \alpha - 1} (1 - p)^{n - y + \beta - 1},
$$
>
> 即 $$\mathrm{beta}(y + \alpha,\ n - y + \beta)$$。（记住变量是 $$p$$，$$y$$ 视为固定。）$$p$$ 的自然估计是后验分布的均值，于是 $$p$$ 的贝叶斯估计量为
>
> $$
\hat{p}_B = \frac{y + \alpha}{\alpha + \beta + n}.
$$

考虑 $$p$$ 的贝叶斯估计如何形成：先验分布的均值是 $$\alpha/(\alpha + \beta)$$，那是未看数据时我们对 $$p$$ 的最好估计。忽略先验信息时，我们多半会用 $$p = y/n$$ 作为估计。$$p$$ 的贝叶斯估计综合了所有这些信息。写成

$$
\hat{p}_B = \Bigl( \frac{n}{\alpha + \beta + n} \Bigr) \Bigl( \frac{y}{n} \Bigr) + \Bigl( \frac{\alpha + \beta}{\alpha + \beta + n} \Bigr) \Bigl( \frac{\alpha}{\alpha + \beta} \Bigr)
$$

即可看清信息组合的方式：$$\hat{p}_B$$ 是先验均值与样本均值的线性组合，权重由 $$\alpha$$、$$\beta$$ 与 $$n$$ 决定。

估计二项参数时并非必须从贝塔族选先验；但选贝塔族有某种好处，首当其冲的是我们得到了估计量的闭式表达式。一般地，对任何抽样分布，存在一族自然的先验分布，称为共轭族（conjugate family）。

> **定义 7.2.15（共轭族）**
>
> 设 $$\mathcal{F}$$ 表示 pdf 或 pmf $$f(x \mid \theta)$$ 的类（由 $$\theta$$ 索引）。若对一切 $$f \in \mathcal{F}$$、$$\Pi$$ 中的一切先验以及一切 $$x \in \mathcal{X}$$，后验分布都在类 $$\Pi$$ 中，则先验分布的类 $$\Pi$$ 称为 $$\mathcal{F}$$ 的***共轭族***（conjugate family）。

贝塔族是二项族的共轭族：从贝塔先验出发，最终得到贝塔后验。先验的更新表现为更新其参数；数学上这非常便利，通常使计算相当容易。至于共轭族对特定问题是否是合理选择，则留给实验者判断。

本节以又一例结束。

> **例 7.2.16（正态贝叶斯估计量）**
>
> 设 $$X \sim n(\theta, \sigma^2)$$，并设 $$\theta$$ 的先验分布是 $$n(\mu, \tau^2)$$（此处设 $$\sigma^2$$、$$\mu$$、$$\tau^2$$ 都已知）。$$\theta$$ 的后验分布也是正态的，均值与方差为
>
> $$
\mathrm{E}(\theta \mid x) = \frac{\tau^2}{\tau^2 + \sigma^2}\, x + \frac{\sigma^2}{\sigma^2 + \tau^2}\, \mu, \tag{7.2.10}
$$
>
> $$
\mathrm{Var}(\theta \mid x) = \frac{\sigma^2\, \tau^2}{\sigma^2 + \tau^2}.
$$
>
> （细节见习题 7.22。）注意正态族是自身的共轭族。再次使用后验均值，$$\theta$$ 的贝叶斯估计量为 $$\mathrm{E}(\theta \mid X)$$。
>
> 贝叶斯估计量又是先验均值与样本均值的线性组合。还注意：当先验方差 $$\tau^2$$ 趋于无穷时，贝叶斯估计量趋于样本均值。可以解释为：先验信息越含糊，贝叶斯估计量给样本信息的权重越大。反之，若先验信息良好（$$\sigma^2 > \tau^2$$），则先验均值获得更大权重。

### 7.2.4 EM 算法（The EM Algorithm）

我们要看的最后一种寻找估计量的方法，其思路本质不同，专门用于找 MLE。它不详细给出解出 MLE 的程序，而是指定一个保证收敛到 MLE 的算法——EM（期望最大化，Expectation-Maximization）算法。其思想是用一列较容易的最大化代替一次困难的似然最大化，其极限是原问题的答案。它特别适合“缺失数据”问题——缺失数据的存在有时会使计算不胜其烦；我们将看到，“填补缺失数据”往往使计算更顺畅。（“缺失数据”也有不同解读——例如见习题 7.30。）

使用 EM 算法时我们考虑两个不同的似然问题：想解决的是“不完全数据”问题，实际解决的是“完全数据”问题。视情形可从任一问题出发。

> **例 7.2.17（多重泊松率）**
>
> 我们观测 $$X_1, X_2, \ldots, X_n$$ 与 $$Y_1, Y_2, \ldots, Y_n$$（全部相互独立），其中 $$Y_i \sim \mathrm{Poisson}(\beta \tau_i)$$，$$X_i \sim \mathrm{Poisson}(\tau_i)$$。这可以建模例如某疾病的发病数 $$Y_i$$，其基础率是总体效应 $$\beta$$ 与附加因子 $$\tau_i$$ 的函数；$$\tau_i$$ 可以是区域 $$i$$ 的人口密度度量，或区域 $$i$$ 人口的健康状况度量。我们看不到 $$\tau_i$$，但通过 $$X_i$$ 获得其信息。
>
> 联合 pmf 因此为
>
> $$
f\bigl( (x_1, y_1), (x_2, y_2), \ldots, (x_n, y_n) \mid \beta, \tau_1, \tau_2, \ldots, \tau_n \bigr) = \prod_{i=1}^{n} \frac{e^{-\beta \tau_i}\, (\beta \tau_i)^{y_i}}{y_i!}\, \frac{e^{-\tau_i}\, (\tau_i)^{x_i}}{x_i!}. \tag{7.2.11}
$$
>
> 似然估计量可通过直截求导找到（见习题 7.27）：
>
> $$
\hat{\beta} = \frac{\sum_{i=1}^{n} y_i}{\sum_{i=1}^{n} x_i} \qquad\text{与}\qquad \hat{\tau}_j = \frac{x_j + y_j}{\hat{\beta} + 1}, \qquad j = 1, 2, \ldots, n. \tag{7.2.12}
$$
>
> 基于 pmf (7.2.11) 的似然是完全数据似然，$$\bigl( (x_1, y_1), \ldots, (x_n, y_n) \bigr)$$ 称为完全数据。缺失数据（常见情形）会使估计更困难：例如设 $$x_1$$ 的值缺失。我们可以把 $$y_1$$ 也丢弃、以样本量 $$n - 1$$ 继续，但这忽略了 $$y_1$$ 中的信息；利用该信息会改进估计。
>
> 从 pmf (7.2.11) 出发，$$x_1$$ 缺失时样本的 pmf 自然定义为
>
> $$
\sum_{x_1=0}^{\infty} f\bigl( (x_1, y_1), (x_2, y_2), \ldots, (x_n, y_n) \mid \beta, \tau_1, \tau_2, \ldots, \tau_n \bigr). \tag{7.2.13}
$$
>
> 基于 (7.2.13) 的似然是不完全数据似然：这正是我们需要最大化的似然。

一般既可从完全数据问题走向不完全数据问题，也可反向。设 $$\textbf{Y} = (Y_1, Y_2, \ldots, Y_n)$$ 是不完全数据，$$\textbf{X} = (X_1, X_2, \ldots, X_m)$$ 是增补数据，使 $$(\textbf{Y}, \textbf{X})$$ 为完全数据；$$\textbf{Y}$$ 的密度 $$g(\cdot \mid \theta)$$ 与 $$(\textbf{Y}, \textbf{X})$$ 的密度 $$f(\cdot \mid \theta)$$ 的关系为

$$
g(\textbf{y} \mid \theta) = \int f(\textbf{y}, \textbf{x} \mid \theta)\, d\textbf{x}. \tag{7.2.14}
$$

把它们变成似然：$$L(\theta \mid \textbf{y}) = g(\textbf{y} \mid \theta)$$ 是不完全数据似然，$$L(\theta \mid \textbf{y}, \textbf{x}) = f(\textbf{y}, \textbf{x} \mid \theta)$$ 是完全数据似然。若 $$L(\theta \mid \textbf{y})$$ 难以处理，完全数据似然有时会更容易处理。

> **例 7.2.18（例 7.2.17 的继续）**
>
> 不完全数据似然由 (7.2.11) 对 $$x_1$$ 求和得到：
>
> $$
L\bigl( \beta, \tau_1, \tau_2, \ldots, \tau_n \mid y_1, (x_2, y_2), \ldots, (x_n, y_n) \bigr) = \Biggl[ \prod_{i=1}^{n} \frac{e^{-\beta \tau_i}\, (\beta \tau_i)^{y_i}}{y_i!} \Biggr]\, \Biggl[ \prod_{i=2}^{n} \frac{e^{-\tau_i}\, (\tau_i)^{x_i}}{x_i!} \Biggr], \tag{7.2.15}
$$
>
> $$\bigl( y_1, (x_2, y_2), \ldots, (x_n, y_n) \bigr)$$ 是不完全数据。这就是需要最大化的似然。求导导出 MLE 方程
>
> $$
\hat{\beta} = \frac{\sum_{i=1}^{n} y_i}{\sum_{i=1}^{n} \hat{\tau}_i}, \qquad y_1 = \hat{\tau}_1\, \hat{\beta}, \qquad x_j + y_j = \hat{\tau}_j\, (\hat{\beta} + 1), \quad j = 2, 3, \ldots, n, \tag{7.2.16}
$$
>
> 现在用 EM 算法求解。

EM 算法使我们只须处理 $$L(\theta \mid \textbf{y}, \textbf{x})$$ 与给定 **y** 与 $$\theta$$ 时 $$\textbf{X}$$ 的条件 pdf 或 pmf

$$
L(\theta \mid \textbf{y}, \textbf{x}) = f(\textbf{y}, \textbf{x} \mid \theta), \qquad L(\theta \mid \textbf{y}) = g(\textbf{y} \mid \theta), \qquad k(\textbf{x} \mid \theta, \textbf{y}) = \frac{f(\textbf{y}, \textbf{x} \mid \theta)}{g(\textbf{y} \mid \theta)} \tag{7.2.17}
$$

就能最大化 $$L(\theta \mid \textbf{y})$$。(7.2.17) 最后一个等式重排给出恒等式

$$
\log L(\theta \mid \textbf{y}) = \log L(\theta \mid \textbf{y}, \textbf{x}) - \log k(\textbf{x} \mid \theta, \textbf{y}). \tag{7.2.18}
$$

既然 **x** 是缺失数据（因而未观测），我们把 (7.2.18) 的右端换成它在 $$k(\textbf{x} \mid \theta', \textbf{y})$$ 下的期望，得到新恒等式

$$
\log L(\theta \mid \textbf{y}) = \mathrm{E}\Bigl[ \log L(\theta \mid \textbf{y}, \textbf{X}) \mid \theta', \textbf{y} \Bigr] - \mathrm{E}\Bigl[ \log k(\textbf{X} \mid \theta, \textbf{y}) \mid \theta', \textbf{y} \Bigr]. \tag{7.2.19}
$$

现在启动算法：从初值 $$\theta^{(0)}$$ 出发，按

$$
\theta^{(r + 1)} = \text{使}\ \mathrm{E}\Bigl[ \log L(\theta \mid \textbf{y}, \textbf{X}) \mid \theta^{(r)}, \textbf{y} \Bigr]\ \text{最大的值} \tag{7.2.20}
$$

生成序列 $$\theta^{(r)}$$。算法的“E 步”计算期望对数似然，“M 步”求其最大。在考察该算法为何确实收敛到 MLE 之前，先回到例子。

> **例 7.2.19（例 7.2.17 的结论）**
>
> 记 $$(\textbf{x}, \textbf{y}) = \bigl( (x_1, y_1), \ldots, (x_n, y_n) \bigr)$$ 为完全数据，$$\bigl( \textbf{x}^{(-1)}, \textbf{y} \bigr) = \bigl( y_1, (x_2, y_2), \ldots, (x_n, y_n) \bigr)$$ 为不完全数据。期望的完全数据对数似然为
>
> $$
\begin{aligned}
&\mathrm{E}\Bigl[ \log L\bigl( \beta, \tau_1, \tau_2, \ldots, \tau_n \mid (\textbf{x}, \textbf{y}) \bigr) \,\Big\vert \, \tau^{(r)}, (\textbf{x}^{(-1)}, \textbf{y}) \Bigr]\\
&= \sum_{x_1=0}^{\infty} \log\Biggl[ \prod_{i=1}^{n} \frac{e^{-\beta \tau_i}\, (\beta \tau_i)^{y_i}}{y_i!}\, \frac{e^{-\tau_i}\, (\tau_i)^{x_i}}{x_i!} \cdot \frac{e^{-\tau_1}\, (\tau_1^{(r)})^{x_1}}{x_1!} \Biggr]\\
&= \sum_{i=1}^{n} \bigl[ -\beta \tau_i + y_i\, (\log \beta + \log \tau_i) - \log y_i! \bigr] + \sum_{i=2}^{n} \bigl[ -\tau_i + x_i \log \tau_i - \log x_i! \bigr]\\
&\quad + \sum_{x_1=0}^{\infty} \bigl[ -\tau_1 + x_1 \log \tau_1 - \log x_1! \bigr]\, \frac{e^{-\tau_1^{(r)}}\, (\tau_1^{(r)})^{x_1}}{x_1!}\\
&= \Biggl( \sum_{i=1}^{n} \bigl[ -\beta \tau_i + y_i\, (\log \beta + \log \tau_i) \bigr] + \sum_{i=2}^{n} \bigl[ \tau_i\, x_i \log \tau_i \bigr] + \sum_{x_1=0}^{\infty} \bigl[ \tau_1\, x_1 \log \tau_1 \bigr]\, \frac{e^{-\tau_1^{(r)}}\, (\tau_1^{(r)})^{x_1}}{x_1!} \Biggr)\\
&\quad - \Biggl( \sum_{i=1}^{n} \log y_i! + \sum_{i=2}^{n} \log x_i! + \sum_{x_1=0}^{\infty} \log x_1!\, \frac{e^{-\tau_1^{(r)}}\, (\tau_1^{(r)})^{x_1}}{x_1!} \Biggr),
\end{aligned} \tag{7.2.21}
$$
>
> 最后一步把含 $$\beta$$ 与 $$\tau_i$$ 的项与不含这些参数的项归组。既然计算这一期望对数似然是为了对 $$\beta$$ 与 $$\tau_i$$ 最大化它，可以忽略第二组括号中的项；只须最大化第一组括号中的项，其中最后的和可写为
>
> $$
-\tau_1 + \log \tau_1 \sum_{x_1=0}^{\infty} x_1\, \frac{e^{-\tau_1^{(r)}}\, (\tau_1^{(r)})^{x_1}}{x_1!} = -\tau_1 + \tau_1^{(r)} \log \tau_1. \tag{7.2.22}
$$
>
> 把它代回 (7.2.21) 可见：期望的完全数据似然与原完全数据似然相同，只是 $$x_1$$ 被替换为 $$\tau_1^{(r)}$$。于是在第 $$r$$ 步，MLE 只是 (7.2.12) 的小小变体：
>
> $$
\hat{\beta}^{(r + 1)} = \frac{\sum_{i=1}^{n} y_i}{\tau_1^{(r)} + \sum_{i=2}^{n} x_i}, \qquad \hat{\tau}_1^{(r + 1)} = \frac{\tau_1^{(r)} + y_1}{\hat{\beta}^{(r + 1)} + 1}, \qquad \hat{\tau}_j^{(r + 1)} = \frac{x_j + y_j}{\hat{\beta}^{(r + 1)} + 1} \quad (j = 2, 3, \ldots, n). \tag{7.2.23}
$$
>
> 这同时定义了 E 步（导致以 $$\tau_1^{(r)}$$ 替换 $$x_1$$）与 M 步（导致 (7.2.23) 中第 $$r$$ 次迭代的 MLE 计算）。EM 算法的性质使我们确信序列 $$\bigl( \hat{\beta}^{(r)}, \hat{\tau}_1^{(r)}, \ldots, \hat{\tau}_n^{(r)} \bigr)$$ 当 $$r \to \infty$$ 时收敛到不完全数据 MLE。更多内容见习题 7.27。

我们不给出 EM 序列 $$\lbrace  \hat{\theta}^{(r)}  \rbrace$$ 收敛到不完全数据 MLE 的完整证明，但下面的关键性质提示这是真的。证明留作习题 7.31。

> **定理 7.2.20（EM 序列的单调性）**
>
> 由 (7.2.20) 定义的序列 $$\lbrace  \hat{\theta}^{(r)}  \rbrace$$ 满足
>
> $$
L\bigl( \hat{\theta}^{(r + 1)} \mid \textbf{y} \bigr) \geq L\bigl( \hat{\theta}^{(r)} \mid \textbf{y} \bigr), \tag{7.2.24}
$$
>
> 等号成立当且仅当相继迭代给出相同的最大化期望完全数据对数似然值，即
>
> $$
\mathrm{E}\Bigl[ \log L\bigl( \hat{\theta}^{(r + 1)} \mid \textbf{y}, \textbf{X} \bigr) \mid \hat{\theta}^{(r)}, \textbf{y} \Bigr] = \mathrm{E}\Bigl[ \log L\bigl( \hat{\theta}^{(r)} \mid \textbf{y}, \textbf{X} \bigr) \mid \hat{\theta}^{(r)}, \textbf{y} \Bigr].
$$

## 7.3 评价估计量的方法（Methods of Evaluating Estimators）

上一节讨论的方法勾勒了寻找参数点估计量的合理技术。但难点在于：特定情形下我们通常能同时应用不止一种方法，因此常面临在估计量之间抉择的任务。当然不同方法可能给出相同答案，评价会容易些；但许多情形不同方法导致不同估计量。

评价统计程序的一般话题属于统计学的决策论（decision theory）分支，7.3.4 节将相当详细地处理它。但在收集到关于程序表现的某些线索之前，不应考虑任何程序。本节引入评价估计量的一些基本准则，并按这些准则考察若干估计量。

### 7.3.1 均方误差（Mean Squared Error）

我们首先考察估计量质量的有限样本度量，从其均方误差开始。

> **定义 7.3.1（均方误差）**
>
> 参数 $$\theta$$ 的估计量 $$W$$ 的***均方误差***（mean squared error，MSE）是由 $$\mathrm{E}_{\theta}\, (W - \theta)^2$$ 定义的 $$\theta$$ 的函数。

注意 MSE 度量估计量 $$W$$ 与参数 $$\theta$$ 之间平均平方差——点估计量表现的某种合理度量。一般地，绝对距离 $$\vert W - \theta\vert $$ 的任何递增函数都可以度量估计量的好坏（平均绝对误差 $$\mathrm{E}_{\theta}\bigl( \vert W - \theta\vert  \bigr)$$ 是合理的替代），但 MSE 相比其他距离度量至少有两个优点：其一，它在解析上相当易于处理；其二，它有解读

$$
\mathrm{E}_{\theta}\, (W - \theta)^2 = \mathrm{Var}_{\theta}\, W + \bigl( \mathrm{E}_{\theta}\, W - \theta \bigr)^2 = \mathrm{Var}_{\theta}\, W + \bigl( \mathrm{Bias}_{\theta}\, W \bigr)^2, \tag{7.3.1}
$$

其中估计量的偏差定义如下。

> **定义 7.3.2（偏差与无偏）**
>
> 参数 $$\theta$$ 的点估计量 $$W$$ 的***偏差***（bias）是 $$W$$ 的期望值与 $$\theta$$ 之差：$$\mathrm{Bias}_{\theta}\, W = \mathrm{E}_{\theta}\, W - \theta$$。偏差恒等（对 $$\theta$$）为零的估计量称为无偏的（unbiased），满足对一切 $$\theta$$ 有 $$\mathrm{E}_{\theta}\, W = \theta$$。

于是 MSE 包含两个成分：一个度量估计量的变异性（精度），另一个度量其偏差（准确度）。MSE 性质良好的估计量方差与偏差之和小。要找 MSE 性质好的估计量，需要找到同时控制方差与偏差的估计量。显然无偏估计量在控制偏差上做得很好。

对无偏估计量有

$$
\mathrm{E}_{\theta}\, (W - \theta)^2 = \mathrm{Var}_{\theta}\, W,
$$

故估计量无偏时其 MSE 等于其方差。

> **例 7.3.3（正态的 MSE）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\mu, \sigma^2)$$。统计量 $$\bar{X}$$ 与 $$S^2$$ 都是无偏估计量，因为
>
> $$
\mathrm{E} \bar{X} = \mu, \qquad \mathrm{E} S^2 = \sigma^2 \qquad \text{（对一切}\ \mu\ \text{与}\ \sigma^2\text{）}
$$
>
> （没有正态性假设时这也成立；见定理 5.2.6）。这些估计量的 MSE 为
>
> $$
\mathrm{E} (\bar{X} - \mu)^2 = \mathrm{Var} \bar{X} = \frac{\sigma^2}{n}, \qquad
\mathrm{E} \bigl( S^2 - \sigma^2 \bigr)^2 = \mathrm{Var} S^2 = \frac{2 \sigma^4}{n - 1}.
$$
>
> 即使放弃正态性假设，$$\bar{X}$$ 的 MSE 仍是 $$\sigma^2/n$$；但若放宽正态性假设，上述 $$S^2$$ 的 MSE 表达式不再相同（见习题 5.8）。

虽然许多无偏估计量从 MSE 的角度看也合理，但要注意控制偏差并不保证控制 MSE。特别地，方差与偏差之间有时会发生权衡：偏差的少许增加可以换取方差更大幅度的下降，从而改进 MSE。

> **例 7.3.4（例 7.3.3 的继续）**
>
> $$\sigma^2$$ 的一个替代估计量是最大似然估计量 $$\hat{\sigma}^2 = \frac{1}{n} \sum_{i=1}^{n} (X_i - \bar{X})^2 = \frac{n - 1}{n}\, S^2$$。容易计算
>
> $$
\mathrm{E} \hat{\sigma}^2 = \mathrm{E}\Bigl[ \frac{n - 1}{n}\, S^2 \Bigr] = \frac{n - 1}{n}\, \sigma^2,
$$
>
> 故 $$\hat{\sigma}^2$$ 是 $$\sigma^2$$ 的有偏估计量。$$\hat{\sigma}^2$$ 的方差也可计算为
>
> $$
\mathrm{Var} \hat{\sigma}^2 = \mathrm{Var}\Bigl[ \frac{n - 1}{n}\, S^2 \Bigr] = \Bigl( \frac{n - 1}{n} \Bigr)^2\, \mathrm{Var} S^2 = \frac{2 (n - 1)\, \sigma^4}{n^2},
$$
>
> 故其 MSE 为
>
> $$
\mathrm{E} \bigl( \hat{\sigma}^2 - \sigma^2 \bigr)^2 = \frac{2 (n - 1)\, \sigma^4}{n^2} + \Biggl( \frac{n - 1}{n}\, \sigma^2 - \sigma^2 \Biggr)^2 = \frac{2n - 1}{n^2}\, \sigma^4.
$$
>
> 于是有
>
> $$
\mathrm{E} \bigl( \hat{\sigma}^2 - \sigma^2 \bigr)^2 = \frac{2n - 1}{n^2}\, \sigma^4 < \frac{2}{n - 1}\, \sigma^4 = \mathrm{E} \bigl( S^2 - \sigma^2 \bigr)^2,
$$
>
> 表明 $$\hat{\sigma}^2$$ 的 MSE 小于 $$S^2$$。因此，用方差换偏差，MSE 得到了改进。

我们要赶紧指出：上例并不意味着应抛弃 $$S^2$$ 作为 $$\sigma^2$$ 的估计量。上述论证表明：若以 MSE 为度量，平均而言 $$\hat{\sigma}^2$$ 会比 $$S^2$$ 更接近 $$\sigma^2$$。但 $$\hat{\sigma}^2$$ 有偏，平均而言会低估 $$\sigma^2$$；仅此一点就可能使我们对使用 $$\hat{\sigma}^2$$ 估计 $$\sigma^2$$ 感到不安。此外还可以论证：MSE 虽是位置参数的合理准则，对尺度参数却并不合理，因此甚至不应作上述比较。（一个问题是 MSE 对高估与低估同等惩罚，这在位置情形没问题；但尺度情形下零是自然下界，估计问题不对称，使用 MSE 往往宽容低估。）最终结果是我们得不到绝对的答案，而是收集到关于估计量的更多信息，希望针对特定情形选出好估计量。

一般地，由于 MSE 是参数的函数，不存在一个“最好”估计量。两个估计量的 MSE 常会交叉，表明各自只在参数空间的一部分上更好。不过即使是这种部分信息，有时也能提供在估计量之间抉择的指南。

> **例 7.3.5（二项贝叶斯估计量的 MSE）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{Bernoulli}(p)$$。$$\bar{X}$$ 作为 $$p$$ 的估计量的 MSE 为
>
> $$
\mathrm{E}_p\, (\bar{X} - p)^2 = \mathrm{Var}_p\, \bar{X} = \frac{p\, (1 - p)}{n}.
$$
>
> 令 $$Y = \sum X_i$$，回忆例 7.2.14 中导出的贝叶斯估计量 $$\hat{p}_B = \dfrac{Y + \alpha}{\alpha + \beta + n}$$。这个 $$p$$ 的贝叶斯估计量的 MSE 为
>
> $$
\begin{aligned}
\mathrm{E}_p\, \bigl( \hat{p}_B - p \bigr)^2 &= \mathrm{Var}_p\, \hat{p}_B + \bigl( \mathrm{Bias}_p\, \hat{p}_B \bigr)^2
= \mathrm{Var}_p\Biggl( \frac{Y + \alpha}{\alpha + \beta + n} \Biggr) + \mathrm{E}_p\Biggl( \frac{Y + \alpha}{\alpha + \beta + n} - p \Biggr)^2\\
&= \frac{n p (1 - p)}{(\alpha + \beta + n)^2} + \Biggl( \frac{n p + \alpha}{\alpha + \beta + n} - p \Biggr)^2.
\end{aligned}
$$
>
> 在缺乏关于 $$p$$ 的良好先验信息时，我们可以试着选 $$\alpha$$ 与 $$\beta$$ 使 $$\hat{p}_B$$ 的 MSE 为常数。细节不难（见习题 7.33），取 $$\alpha = \beta = \sqrt{n}/4$$ 得
>
> $$
\hat{p}_B = \frac{Y + \sqrt{n}/4}{n + \sqrt{n}} \qquad\text{与}\qquad \mathrm{E}\bigl( \hat{p}_B - p \bigr)^2 = \frac{n}{4 (n + \sqrt{n})^2}.
$$
>
> 若要基于 MSE 在 $$\hat{p}_B$$ 与 $$\bar{X}$$ 之间抉择，图 7.3.1 颇有帮助：小 $$n$$ 时 $$\hat{p}_B$$ 更好（除非坚信 $$p$$ 接近 0 或 1）；大 $$n$$ 时 $$\bar{X}$$ 更好（除非坚信 $$p$$ 接近 $$\tfrac{1}{2}$$）。即使 MSE 准则没有显示某个估计量一致更优，它也提供了有用信息；这些信息结合对具体问题的了解，可以导致为该情形选出更好的估计量。

![ch07_fig_7_3_1](fig/ch07_fig_7_3_1.png)

图 7.3.1　 例 7.3.5 中样本量 $$n = 4$$ 与 $$n = 400$$ 时 $$\bar{X}$$ 与 $$\hat{p}_B$$ 的 MSE 比较（原书 Figure 7.3.1）

某些情形（尤其位置参数估计）MSE 可以成为在一族等变估计量（6.4 节）中找最佳估计量的有用准则。对群 $$\mathcal{G}$$ 中固定的 $$g$$，把 $$\theta \to \theta'$$ 的函数记作 $$\bar{g}(\theta)$$（即 $$\bar{g}(\theta) = \theta'$$）。若 $$W(\textbf{X})$$ 估计 $$\theta$$，则有

$$
\text{测量等变：}\ W(\textbf{x})\ \text{估计}\ \theta \Rightarrow \bar{g}\bigl( W(\textbf{x}) \bigr)\ \text{估计}\ \bar{g}(\theta) = \theta',
$$

$$
\text{形式不变性：}\ W(\textbf{x})\ \text{估计}\ \theta \Rightarrow W\bigl( g(\textbf{x}) \bigr)\ \text{估计}\ \bar{g}(\theta) = \theta'.
$$

合并两条要求得 $$W\bigl( g(\textbf{x}) \bigr) = \bar{g}\bigl( W(\textbf{x}) \bigr)$$。

> **例 7.3.6（等变估计量的 MSE）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$f(x - \theta)$$。估计量 $$W(X_1, \ldots, X_n)$$ 要满足 $$W\bigl( g_a(\textbf{x}) \bigr) = \bar{g}_a\bigl( W(\textbf{x}) \bigr)$$，必须有
>
> $$
W(x_1, \ldots, x_n) + a = W(x_1 + a, \ldots, x_n + a), \tag{7.3.2}
$$
>
> 这规定了关于变换群 $$\mathcal{G} = \lbrace  g_a(\textbf{x}) : -\infty < a < \infty  \rbrace$$（$$g_a(x_1, \ldots, x_n) = (x_1 + a, \ldots, x_n + a)$$）的等变估计量。对这些估计量：
>
> $$
\begin{aligned}
\mathrm{E}_{\theta}\, \bigl( W(X_1, \ldots, X_n) - \theta \bigr)^2 &= \mathrm{E}_{\theta}\, \bigl( W(X_1 + a, \ldots, X_n + a) - a - \theta \bigr)^2\\
&= \mathrm{E}_{\theta}\, \bigl( W(X_1 - \theta, \ldots, X_n - \theta) \bigr)^2 \qquad （a = -\theta）\\
&= \int_{-\infty}^{\infty} \cdots \int_{-\infty}^{\infty} \bigl( W(x_1 - \theta, \ldots, x_n - \theta) \bigr)^2 \prod_{i=1}^{n} f(x_i - \theta)\, dx_i\\
&= \int_{-\infty}^{\infty} \cdots \int_{-\infty}^{\infty} \bigl( W(u_1, \ldots, u_n) \bigr)^2 \prod_{i=1}^{n} f(u_i)\, du_i \qquad （u_i = x_i - \theta）.
\end{aligned} \tag{7.3.3}
$$
>
> 最后的表达式不依赖 $$\theta$$，故这些等变估计量的 MSE 不是 $$\theta$$ 的函数。因此可以用 MSE 给等变估计量排序，找到 MSE 最小的等变估计量。事实上该估计量就是如下数学问题的解：在约束 (7.3.2) 下最小化 (7.3.3) 求函数 $$W$$。（见习题 7.35 与 7.36。）

### 7.3.2 最佳无偏估计量（Best Unbiased Estimators）

如上一节所注，基于 MSE 的估计量比较未必给出明确的赢家：没有唯一的“最好 MSE”估计量。许多人觉得这麻烦或令人不快，与其做候选估计量的 MSE 比较，不如得到一个“被推荐的”估计量。

没有唯一“最好 MSE”估计量的原因是全体估计量这个类太大。（例如估计量 $$\hat{\theta} = 17$$ 在 $$\theta = 17$$ 处 MSE 无可匹敌，但除此之外是糟糕的估计量。）使求“最好”估计量的问题可以处理的一种办法是限制估计量类。一种流行的限制方式——本节考虑的方式——是只考虑无偏估计量。

若 $$W_1$$ 与 $$W_2$$ 都是参数 $$\theta$$ 的无偏估计量（$$\mathrm{E}_{\theta} W_1 = \mathrm{E}_{\theta} W_2 = \theta$$），则其均方误差等于其方差，故应选方差更小者。若能找到方差一致最小的无偏估计量——最佳无偏估计量——任务便告完成。

继续之前注意：虽然我们在处理无偏估计量，本节与下节的结果实际上更具一般性。设有 $$\theta$$ 的估计量 $$W^{*}$$ 满足 $$\mathrm{E}_{\theta} W^{*} = \tau(\theta) \neq \theta$$，我们想考察 $$W^{*}$$ 的价值。考虑估计量类

$$
\mathcal{C}_{\tau} = \bigl\lbrace  W : \mathrm{E}_{\theta}\, W = \tau(\theta) \bigr \rbrace.
$$

对任意 $$W_1, W_2 \in \mathcal{C}_{\tau}$$，$$\mathrm{Bias}_{\theta} W_1 = \mathrm{Bias}_{\theta} W_2$$，故

$$
\mathrm{E}_{\theta}\, (W_1 - \theta)^2 - \mathrm{E}_{\theta}\, (W_2 - \theta)^2 = \mathrm{Var}_{\theta}\, W_1 - \mathrm{Var}_{\theta}\, W_2,
$$

在类 $$\mathcal{C}_{\tau}$$ 内的 MSE 比较可以只基于方差。因此虽然我们以无偏估计量的语言表述，实际比较的是具有相同期望值 $$\tau(\theta)$$ 的估计量。

本节的目标是考察求“最佳”无偏估计量的方法，定义如下。

> **定义 7.3.7（最佳无偏估计量）**
>
> 若估计量 $$W^{*}$$ 满足：对一切 $$\theta$$ 有 $$\mathrm{E}_{\theta} W^{*} = \tau(\theta)$$，且对任何满足 $$\mathrm{E}_{\theta} W = \tau(\theta)$$ 的其他估计量 $$W$$ 都有 $$\mathrm{Var}_{\theta}\, W^{*} \leq \mathrm{Var}_{\theta}\, W$$（对一切 $$\theta$$），则称 $$W^{*}$$ 是 $$\tau(\theta)$$ 的***最佳无偏估计量***（best unbiased estimator）。$$W^{*}$$ 也称为一致最小方差无偏估计量（uniform minimum variance unbiased estimator，UMVUE）。

求最佳无偏估计量（若存在！）绝非易事，原因有多种，下例展示了其中两个。

> **例 7.3.8（泊松无偏估计）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{Poisson}(\lambda)$$，$$\bar{X}$$ 与 $$S^2$$ 分别为样本均值与方差。回忆泊松 pmf 的均值与方差都等于 $$\lambda$$。应用定理 5.2.6：
>
> $$
\mathrm{E}_{\lambda}\, \bar{X} = \lambda \quad \text{（对一切}\ \lambda\text{）}, \qquad \mathrm{E}_{\lambda}\, S^2 = \lambda \quad \text{（对一切}\ \lambda\text{）},
$$
>
> 故 $$\bar{X}$$ 与 $$S^2$$ 都是 $$\lambda$$ 的无偏估计量。
>
> 要确定 $$\bar{X}$$ 与 $$S^2$$ 哪个更好，应比较方差。仍由定理 5.2.6，$$\mathrm{Var}_{\lambda}\, \bar{X} = \lambda/n$$，但 $$\mathrm{Var}_{\lambda}\, S^2$$ 的计算相当冗长（类似习题 5.10b 的计算）。这是找最佳无偏估计量的最初问题之一：计算不仅可能又长又繁，而且可能是徒劳的（本例即是），因为我们将看到对一切 $$\lambda$$ 有 $$\mathrm{Var}_{\lambda}\, \bar{X} \leq \mathrm{Var}_{\lambda}\, S^2$$。
>
> 即使能确立 $$\bar{X}$$ 优于 $$S^2$$，考虑估计量类
>
> $$
W_a(\bar{X}, S^2) = a \bar{X} + (1 - a)\, S^2.
$$
>
> 对每个常数 $$a$$，$$\mathrm{E}_{\lambda}\, W_a(\bar{X}, S^2) = \lambda$$，于是现在有无穷多个 $$\lambda$$ 的无偏估计量。即使 $$\bar{X}$$ 优于 $$S^2$$，它优于每个 $$W_a(\bar{X}, S^2)$$ 吗？此外如何确信没有潜伏在别处的更好的无偏估计量？

本例展示了找最佳无偏估计量可能遇到的一些问题，也许说明更全面的途径是可取的。设在估计分布 $$f(x \mid \theta)$$ 的参数 $$\tau(\theta)$$ 时，我们能指定任何无偏估计量方差的某个下界 $$B(\theta)$$；若随后能找到满足 $$\mathrm{Var}_{\theta}\, W^{*} = B(\theta)$$ 的无偏估计量 $$W^{*}$$，我们就找到了最佳无偏估计量。这正是使用 Cramér–Rao 下界的思路。

> **定理 7.3.9（Cramér–Rao 不等式）**
>
> 设 $$X_1, \ldots, X_n$$ 是以 $$f(\textbf{x} \mid \theta)$$ 为 pdf 的样本，$$W(\textbf{X}) = W(X_1, \ldots, X_n)$$ 是任何满足
>
> $$
\frac{d}{d\theta}\, \mathrm{E}_{\theta}\, W(\textbf{X}) = \int_{\mathcal{X}} \frac{\partial}{\partial \theta}\, \bigl[ W(\textbf{x})\, f(\textbf{x} \mid \theta) \bigr]\, d\textbf{x}
\qquad\text{与}\qquad \mathrm{Var}_{\theta}\, W(\textbf{X}) < \infty \tag{7.3.4}
$$
>
> 的估计量。则
>
> $$
\mathrm{Var}_{\theta}\bigl( W(\textbf{X}) \bigr) \geq \frac{\Bigl( \dfrac{d}{d\theta}\, \mathrm{E}_{\theta}\, W(\textbf{X}) \Bigr)^{2}}{\mathrm{E}_{\theta}\Biggl[ \Bigl( \dfrac{\partial}{\partial \theta} \log f(\textbf{X} \mid \theta) \Bigr)^2 \Biggr]}. \tag{7.3.5}
$$
>
> **证明**　该定理的证明极其简洁，是柯西—施瓦茨不等式的巧妙应用；用统计语言表述：对任意两个随机变量 $$X$$ 与 $$Y$$，
>
> $$
\bigl[ \mathrm{Cov}(X, Y) \bigr]^2 \leq (\mathrm{Var} X)\, (\mathrm{Var} Y). \tag{7.3.6}
$$
>
> 整理 (7.3.6) 可得 $$X$$ 方差的下界：
>
> $$
\mathrm{Var} X \geq \frac{\bigl[ \mathrm{Cov}(X, Y) \bigr]^2}{\mathrm{Var} Y}.
$$
>
> 定理的巧妙之处在于取 $$X$$ 为估计量 $$W(\textbf{X})$$、取 $$Y$$ 为量 $$\frac{\partial}{\partial \theta} \log f(\textbf{X} \mid \theta)$$，再应用柯西—施瓦茨不等式。
>
> 首先注意
>
> $$
\frac{d}{d\theta}\, \mathrm{E}_{\theta}\, W(\textbf{X}) = \int_{\mathcal{X}} W(\textbf{x})\, \frac{\partial}{\partial \theta}\, f(\textbf{x} \mid \theta)\, d\textbf{x}
= \mathrm{E}_{\theta}\, W(\textbf{X})\, \frac{\dfrac{\partial}{\partial \theta}\, f(\textbf{X} \mid \theta)}{f(\textbf{X} \mid \theta)} \qquad （\text{乘以}\ f(\textbf{X} \mid \theta)/f(\textbf{X} \mid \theta)） \tag{7.3.7}
$$
>
> $$
= \mathrm{E}_{\theta}\, W(\textbf{X})\, \frac{\partial}{\partial \theta}\, \log f(\textbf{X} \mid \theta) \qquad （\text{对数的性质}），
$$
>
> 这提示 $$W(\textbf{X})$$ 与 $$\frac{\partial}{\partial \theta} \log f(\textbf{X} \mid \theta)$$ 之间存在协方差。要成为协方差须减去期望的乘积，故计算 $$\mathrm{E}_{\theta}\Bigl[ \frac{\partial}{\partial \theta} \log f(\textbf{X} \mid \theta) \Bigr]$$。在 (7.3.7) 中取 $$W(\textbf{x}) = 1$$ 得
>
> $$
\mathrm{E}_{\theta}\Biggl[ \frac{\partial}{\partial \theta}\, \log f(\textbf{X} \mid \theta) \Biggr] = \frac{d}{d\theta}\, \mathrm{E}_{\theta}\bigl[ 1 \bigr] = 0. \tag{7.3.8}
$$
>
> 因此 $$\mathrm{Cov}_{\theta}\Bigl( W(\textbf{X}),\, \frac{\partial}{\partial \theta} \log f(\textbf{X} \mid \theta) \Bigr)$$ 等于乘积的期望，由 (7.3.7) 与 (7.3.8) 得
>
> $$
\mathrm{Cov}_{\theta}\Biggl( W(\textbf{X}),\, \frac{\partial}{\partial \theta}\, \log f(\textbf{X} \mid \theta) \Biggr) = \mathrm{E}_{\theta}\Biggl[ W(\textbf{X})\, \frac{\partial}{\partial \theta}\, \log f(\textbf{X} \mid \theta) \Biggr] = \frac{d}{d\theta}\, \mathrm{E}_{\theta}\, W(\textbf{X}). \tag{7.3.9}
$$
>
> 又由 $$\mathrm{E}_{\theta}\Bigl( \frac{\partial}{\partial \theta} \log f(\textbf{X} \mid \theta) \Bigr) = 0$$ 得
>
> $$
\mathrm{Var}_{\theta}\Biggl( \frac{\partial}{\partial \theta}\, \log f(\textbf{X} \mid \theta) \Biggr) = \mathrm{E}_{\theta}\Biggl[ \Bigl( \frac{\partial}{\partial \theta}\, \log f(\textbf{X} \mid \theta) \Bigr)^2 \Biggr]. \tag{7.3.10}
$$
>
> 用柯西—施瓦茨不等式并结合 (7.3.9) 与 (7.3.10)，得
>
> $$
\mathrm{Var}_{\theta}\bigl( W(\textbf{X}) \bigr) \geq \frac{\Bigl( \dfrac{d}{d\theta}\, \mathrm{E}_{\theta}\, W(\textbf{X}) \Bigr)^{2}}{\mathrm{E}_{\theta}\Biggl[ \Bigl( \dfrac{\partial}{\partial \theta} \log f(\textbf{X} \mid \theta) \Bigr)^2 \Biggr]},
$$
>
> 定理得证。 ∎

若添加独立样本的假设，下界的计算可以简化：分母中的期望变成一元计算，如下述推论所示。

> **推论 7.3.10（Cramér–Rao 不等式，iid 情形）**
>
> 若定理 7.3.9 的假设满足，且 $$X_1, \ldots, X_n$$ 是具有 pdf $$f(x \mid \theta)$$ 的 iid 样本，则
>
> $$
\mathrm{Var}_{\theta}\, W(\textbf{X}) \geq \frac{\Bigl( \dfrac{d}{d\theta}\, \mathrm{E}_{\theta}\, W(\textbf{X}) \Bigr)^{2}}{n\, \mathrm{E}_{\theta}\Biggl[ \Bigl( \dfrac{\partial}{\partial \theta}\, \log f(X \mid \theta) \Bigr)^2 \Biggr]}.
$$
>
> **证明**　只须证明
>
> $$
\mathrm{E}_{\theta}\Biggl[ \Biggl( \frac{\partial}{\partial \theta}\, \log f(\textbf{X} \mid \theta) \Biggr)^2 \Biggr] = n\, \mathrm{E}_{\theta}\Biggl[ \Biggl( \frac{\partial}{\partial \theta}\, \log f(X \mid \theta) \Biggr)^2 \Biggr].
$$
>
> 由于 $$X_1, \ldots, X_n$$ 独立：
>
> $$
\mathrm{E}_{\theta}\Biggl[ \Biggl( \frac{\partial}{\partial \theta}\, \log f(\textbf{X} \mid \theta) \Biggr)^2 \Biggr] = \mathrm{E}_{\theta}\Biggl[ \Biggl( \frac{\partial}{\partial \theta}\, \log \prod_{i=1}^{n} f(X_i \mid \theta) \Biggr)^2 \Biggr] = \mathrm{E}_{\theta}\Biggl[ \Biggl( \sum_{i=1}^{n} \frac{\partial}{\partial \theta}\, \log f(X_i \mid \theta) \Biggr)^2 \Biggr] \qquad （\text{对数的性质}）
$$
>
> $$
= \sum_{i=1}^{n} \mathrm{E}_{\theta}\Biggl[ \Biggl( \frac{\partial}{\partial \theta}\, \log f(X_i \mid \theta) \Biggr)^2 \Biggr] + \sum_{i \neq j} \mathrm{E}_{\theta}\Biggl[ \frac{\partial}{\partial \theta}\, \log f(X_i \mid \theta)\, \frac{\partial}{\partial \theta}\, \log f(X_j \mid \theta) \Biggr]. \tag{7.3.11}
$$
>
> 对 $$i \neq j$$：
>
> $$
\mathrm{E}_{\theta}\Biggl[ \frac{\partial}{\partial \theta}\, \log f(X_i \mid \theta)\, \frac{\partial}{\partial \theta}\, \log f(X_j \mid \theta) \Biggr]
= \mathrm{E}_{\theta}\Biggl[ \frac{\partial}{\partial \theta}\, \log f(X_i \mid \theta) \Biggr]\, \mathrm{E}_{\theta}\Biggl[ \frac{\partial}{\partial \theta}\, \log f(X_j \mid \theta) \Biggr] = 0
$$
>
> （独立性；(7.3.8)）。故 (7.3.11) 中第二个和为零，第一项为
>
> $$
\sum_{i=1}^{n} \mathrm{E}_{\theta}\Biggl[ \Biggl( \frac{\partial}{\partial \theta}\, \log f(X_i \mid \theta) \Biggr)^2 \Biggr] = n\, \mathrm{E}_{\theta}\Biggl[ \Biggl( \frac{\partial}{\partial \theta}\, \log f(X \mid \theta) \Biggr)^2 \Biggr] \qquad （\text{同分布}），
$$
>
> 推论得证。 ∎

继续之前注意：虽然 Cramér–Rao 下界是对连续随机变量陈述的，它也适用于离散随机变量。关键条件 (7.3.4)（允许积分与求导交换）作显然的修改即可：若 $$f(x \mid \theta)$$ 是 pmf，则必须能交换求导与求和。（当然这假设 $$f(x \mid \theta)$$ 虽是 pmf、对 $$x$$ 不可微，但对 $$\theta$$ 可微；多数常见 pmf 都是如此。）

量 $$\mathrm{E}_{\theta}\Bigl[ \bigl( \frac{\partial}{\partial \theta} \log f(\textbf{X} \mid \theta) \bigr)^2 \Bigr]$$ 称为信息数（information number）或样本的 Fisher 信息（Fisher information）。这一术语反映如下事实：信息数给出 $$\theta$$ 的最佳无偏估计量方差的界。信息数越大（关于 $$\theta$$ 的信息越多），最佳无偏估计量方差的界越小。

事实上“信息不等式”（Information Inequality）是 Cramér–Rao 不等式的别名，且信息不等式以比此处更一般的形式存在。更一般形式的关键差异是：关于候选估计量的所有假设都被去掉，代之以对底层密度的假设。在这种形式下，信息不等式在比较估计量表现时非常有用；细节见 Lehmann and Casella (1998, Section 2.6)。

对任意可微函数 $$\tau(\theta)$$，我们如今有了任何满足 (7.3.4) 与 $$\mathrm{E}_{\theta} W = \tau(\theta)$$ 的估计量 $$W$$ 的方差下界。该界只依赖 $$\tau(\theta)$$ 与 $$f(\textbf{x} \mid \theta)$$，是方差的一致下界。任何满足 $$\mathrm{E}_{\theta} W = \tau(\theta)$$ 且达到该下界的候选估计量都是 $$\tau(\theta)$$ 的最佳无偏估计量。

在看例子之前，先给出一个有助应用该定理的计算结果。其证明留作习题 7.39。

> **引理 7.3.11（信息数的另一算法）**
>
> 若 $$f(x \mid \theta)$$ 满足
>
> $$
\frac{d}{d\theta}\, \mathrm{E}_{\theta}\Biggl[ \frac{\partial}{\partial \theta}\, \log f(X \mid \theta) \Biggr] = \int \frac{\partial}{\partial \theta}\, \Biggl[ \frac{\partial}{\partial \theta}\, \log f(x \mid \theta) \Biggr]\, f(x \mid \theta)\, dx
$$
>
> （指数族满足），则
>
> $$
\mathrm{E}_{\theta}\Biggl[ \Biggl( \frac{\partial}{\partial \theta}\, \log f(X \mid \theta) \Biggr)^2 \Biggr] = -\,\mathrm{E}_{\theta}\Biggl[ \frac{\partial^2}{\partial \theta^2}\, \log f(X \mid \theta) \Biggr].
$$

用刚发展的工具，回到并解决泊松的例子。

> **例 7.3.12（例 7.3.8 的结论）**
>
> 此处 $$\tau(\lambda) = \lambda$$，故 $$\tau'(\lambda) = 1$$。又由于我们面对指数族，用引理 7.3.11 得
>
> $$
\mathrm{E}_{\lambda}\Biggl[ \Biggl( \frac{\partial}{\partial \lambda}\, \log \prod_{i=1}^{n} f(X_i \mid \lambda) \Biggr)^2 \Biggr] = -n\, \mathrm{E}_{\lambda}\Biggl[ \frac{\partial^2}{\partial \lambda^2}\, \log f(X \mid \lambda) \Biggr]
= -n\, \mathrm{E}_{\lambda}\Biggl[ \frac{\partial^2}{\partial \lambda^2}\, \log\Biggl( \frac{e^{-\lambda}\, \lambda^{X}}{X!} \Biggr) \Biggr]
$$
>
> $$
= -n\, \mathrm{E}_{\lambda}\Biggl[ \frac{\partial}{\partial \lambda}\, \Bigl( -\lambda + X \log \lambda - \log X! \Bigr) \Biggr] = -n\, \mathrm{E}_{\lambda}\Biggl[ -\frac{1}{\lambda} + \frac{X}{\lambda^2} \Biggr] = -n\, \frac{-\lambda + \lambda}{\lambda^2}\ \cdot\ (-1)\ \cdot\ \frac{1}{\lambda}
$$
>
> 整理：$$\frac{\partial}{\partial \lambda}(-\lambda + X \log \lambda - \log X!) = -1 + X/\lambda$$，再求导得 $$-X/\lambda^2$$，故
>
> $$
\mathrm{E}_{\lambda}\Biggl[ \Biggl( \frac{\partial}{\partial \lambda}\, \log \prod_{i=1}^{n} f(X_i \mid \lambda) \Biggr)^2 \Biggr] = -n\, \mathrm{E}_{\lambda}\Biggl[ -\frac{X}{\lambda^2} \Biggr] = \frac{n}{\lambda}.
$$
>
> 于是对 $$\lambda$$ 的任何无偏估计量 $$W$$，必有
>
> $$
\mathrm{Var}_{\lambda}\, W \geq \frac{\lambda}{n}.
$$
>
> 由于 $$\mathrm{Var}_{\lambda}\, \bar{X} = \lambda/n$$，$$\bar{X}$$ 是 $$\lambda$$ 的最佳无偏估计量。

务必记住：Cramér–Rao 定理的一个关键假设是能够在积分号下求导，这当然是一种限制。如我们所见，指数类的密度满足假设，但一般而言这类假设需要检查，否则会出现如下矛盾。

> **例 7.3.13（尺度均匀的无偏估计量）**
>
> 设 $$X_1, \ldots, X_n$$ 是 pdf $$f(x \mid \theta) = 1/\theta$$（$$0 < x < \theta$$）的 iid 样本。由于 $$\frac{\partial}{\partial \theta} \log f(x \mid \theta) = -1/\theta$$，有
>
> $$
\mathrm{E}_{\theta}\Biggl[ \Biggl( \frac{\partial}{\partial \theta}\, \log f(X \mid \theta) \Biggr)^2 \Biggr] = \frac{1}{\theta^2}.
$$
>
> Cramér–Rao 定理似乎表明：若 $$W$$ 是 $$\theta$$ 的任何无偏估计量，则
>
> $$
\mathrm{Var}_{\theta}\, W \geq \frac{\theta^2}{n}.
$$
>
> 我们现在想找方差小的无偏估计量。第一猜是考虑充分统计量 $$Y = \max(X_1, \ldots, X_n)$$——最大次序统计量。$$Y$$ 的 pdf 为 $$f_Y(y \mid \theta) = n\, y^{n-1} / \theta^{n}$$（$$0 < y < \theta$$），故
>
> $$
\mathrm{E}_{\theta}\, Y = \int_0^{\theta} \frac{n y^{n}}{\theta^{n}}\, dy = \frac{n}{n + 1}\, \theta,
$$
>
> 表明 $$\frac{n+1}{n}\, Y$$ 是 $$\theta$$ 的无偏估计量。接着计算
>
> $$
\mathrm{Var}_{\theta}\Biggl( \frac{n + 1}{n}\, Y \Biggr) = \Bigl( \frac{n + 1}{n} \Bigr)^2\, \mathrm{Var}_{\theta}\, Y
= \Bigl( \frac{n + 1}{n} \Bigr)^2 \Biggl[ \mathrm{E}_{\theta}\, Y^2 - \Bigl( \frac{n}{n + 1}\, \theta \Bigr)^2 \Biggr]
= \Bigl( \frac{n + 1}{n} \Bigr)^2 \Biggl[ \frac{n}{n + 2}\, \theta^2 - \frac{n^2}{(n + 1)^2}\, \theta^2 \Biggr] = \frac{1}{n (n + 2)}\, \theta^2,
$$
>
> 它一致地小于 $$\theta^2/n$$。这表明 Cramér–Rao 定理不适用于该 pdf。为看清这一点，可用莱布尼茨法则（2.4 节）计算：
>
> $$
\frac{d}{d\theta} \int_0^{\theta} h(x)\, f(x \mid \theta)\, dx = \frac{d}{d\theta} \int_0^{\theta} \frac{h(x)}{\theta}\, dx = \frac{h(\theta)}{\theta} + \int_0^{\theta} h(x)\, \frac{\partial}{\partial \theta}\, \frac{1}{\theta}\, dx \neq \int_0^{\theta} h(x)\, \frac{\partial}{\partial \theta}\, f(x \mid \theta)\, dx,
$$
>
> 除非对一切 $$\theta$$ 有 $$h(\theta)/\theta = 0$$。故 Cramér–Rao 定理不适用。一般地，若 pdf 的范围依赖参数，该定理将不适用。

这种找最佳无偏估计量途径的一个缺点是：即使 Cramér–Rao 定理适用，也不能保证界是锐的（即 Cramér–Rao 下界的值可能严格小于任何无偏估计量的方差）。事实上在 $$f(x \mid \theta)$$ 为单参数指数族这一通常有利的情形，我们至多能说：存在某个参数 $$\tau(\theta)$$，其无偏估计量达到 Cramér–Rao 下界；而对其他参数，界可能达不到。这些情形令人担忧：若找不到达到下界的估计量，我们必须判断是没有估计量能达到它，还是必须考察更多估计量。

> **例 7.3.14（正态方差界）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\mu, \sigma^2)$$，考虑 $$\sigma^2$$ 的估计（$$\mu$$ 未知）。正态 pdf 满足 Cramér–Rao 定理与引理 7.3.11 的假设，故
>
> $$
\frac{\partial^2}{\partial (\sigma^2)^2}\, \log\Biggl( \frac{1}{(2\pi\sigma^2)^{1/2}}\, e^{-(1/2)(x - \mu)^2/\sigma^2} \Biggr) = \frac{1}{2\sigma^4} - \frac{(x - \mu)^2}{\sigma^6},
$$
>
> 且
>
> $$
-\mathrm{E}_{\mu,\sigma^2}\Biggl[ \frac{\partial^2}{\partial (\sigma^2)^2}\, \log f(X \mid \mu, \sigma^2) \Biggr] = -\mathrm{E}_{\mu,\sigma^2}\Biggl[ \frac{1}{2\sigma^4} - \frac{(X - \mu)^2}{\sigma^6} \Biggr] = \frac{1}{2\sigma^4}.
$$
>
> 于是 $$\sigma^2$$ 的任何无偏估计量 $$W$$ 必满足
>
> $$
\mathrm{Var}\bigl( W \mid \mu, \sigma^2 \bigr) \geq \frac{2 \sigma^4}{n}.
$$
>
> 例 7.3.3 中我们见过
>
> $$
\mathrm{Var}\bigl( S^2 \mid \mu, \sigma^2 \bigr) = \frac{2 \sigma^4}{n - 1},
$$
>
> 故 $$S^2$$ 未达到 Cramér–Rao 下界。

在上例中我们留下了一个不完整的答案：是存在比 $$S^2$$ 更好的 $$\sigma^2$$ 无偏估计量，还是 Cramér–Rao 下界不可达？

达到 Cramér–Rao 下界的条件其实相当简单。回忆该界来自柯西—施瓦茨不等式的应用，故达到界的条件就是柯西—施瓦茨不等式取等的条件（见 4.7 节）。还要注意推论 7.3.15 是有用的工具，因为它隐含地给了我们找最佳无偏估计量的途径。

> **推论 7.3.15（达到 Cramér–Rao 界的条件）**
>
> 设 $$X_1, \ldots, X_n$$ 是 iid $$f(x \mid \theta)$$，$$f$$ 满足 Cramér–Rao 定理的条件。设 $$L(\theta \mid \textbf{x}) = \prod_{i=1}^{n} f(x_i \mid \theta)$$ 为似然函数。若 $$W(\textbf{X}) = W(X_1, \ldots, X_n)$$ 是 $$\tau(\theta)$$ 的任何无偏估计量，则 $$W(\textbf{X})$$ 达到 Cramér–Rao 下界当且仅当
>
> $$
a(\theta)\, \bigl[ W(\textbf{x}) - \tau(\theta) \bigr] = \frac{\partial}{\partial \theta}\, \log L(\theta \mid \textbf{x}), \tag{7.3.12}
$$
>
> 对某函数 $$a(\theta)$$ 成立。
>
> **证明**　如 (7.3.6) 所给的 Cramér–Rao 不等式可写为
>
> $$
\Biggl[ \mathrm{Cov}_{\theta}\Biggl( W(\textbf{X}),\, \frac{\partial}{\partial \theta}\, \log \prod_{i=1}^{n} f(X_i \mid \theta) \Biggr) \Biggr]^2 \leq \mathrm{Var}_{\theta}\, W(\textbf{X})\; \mathrm{Var}_{\theta}\Biggl( \frac{\partial}{\partial \theta}\, \log \prod_{i=1}^{n} f(X_i \mid \theta) \Biggr),
$$
>
> 且回忆 $$\mathrm{E}_{\theta} W = \tau(\theta)$$、$$\mathrm{E}_{\theta}\Bigl( \frac{\partial}{\partial \theta} \log \prod_{i=1}^{n} f(X_i \mid \theta) \Bigr) = 0$$，用定理 4.5.7 的结果，等号成立当且仅当 $$W(\textbf{x}) - \tau(\theta)$$ 与 $$\frac{\partial}{\partial \theta} \log \prod_{i=1}^{n} f(x_i \mid \theta)$$ 成比例，这正是 (7.3.12) 表达的。 ∎

> **例 7.3.16（例 7.3.14 的继续）**
>
> 此处
>
> $$
L(\mu, \sigma^2 \mid \textbf{x}) = \frac{1}{(2\pi\sigma^2)^{n/2}}\, e^{-(1/2) \sum_{i=1}^{n} (x_i - \mu)^2 / \sigma^2},
$$
>
> 故
>
> $$
\frac{\partial}{\partial \sigma^2}\, \log L(\mu, \sigma^2 \mid \textbf{x}) = \frac{n}{2 \sigma^4}\, \Biggl( \frac{1}{n} \sum_{i=1}^{n} (x_i - \mu)^2 - \sigma^2 \Biggr).
$$
>
> 于是取 $$a(\sigma^2) = \dfrac{n}{2 \sigma^4}$$ 表明 $$\sigma^2$$ 的最佳无偏估计量是 $$\frac{1}{n} \sum_{i=1}^{n} (x_i - \mu)^2$$，它只在 $$\mu$$ 已知时可以计算。若 $$\mu$$ 未知，该界不可达。

本节发展的理论仍留下一些问题未答。第一，若 $$f(\textbf{x} \mid \theta)$$ 不满足 Cramér–Rao 定理的假设怎么办？（例 7.3.13 中我们仍不知道 $$\frac{n+1}{n} Y$$ 是否最佳无偏。）第二，若界不可达（如例 7.3.14）怎么办？那里我们仍不知道 $$S^2$$ 是否最佳无偏。

回答这些问题的一条路是寻找适用面更广、界更锐（即更大）的方法。这方面已有大量研究，最著名的界也许属 Chapman and Robbins (1951)；Stuart, Ord, and Arnold (1999, Chapter 17) 对该主题有很好的处理。我们不取这条路，而是从另一角度——利用充分性的概念——继续研究最佳无偏估计量。

### 7.3.3 充分性与无偏性（Sufficiency and Unbiasedness）

上一节在寻找无偏估计的过程中没有用到充分性概念。现在我们将看到，考虑充分性确实是强有力的工具。

本节的主要定理——把充分统计量与无偏估计联系起来的定理——与 Cramér–Rao 定理一样，是对若干著名定理的又一次巧妙应用。回顾第 4 章：若 $$X$$ 与 $$Y$$ 是任意两个随机变量，则只要各期望存在，

$$
\mathrm{E} X = \mathrm{E}\bigl[ \mathrm{E}(X \mid Y) \bigr], \qquad \mathrm{Var} X = \mathrm{Var}\bigl[ \mathrm{E}(X \mid Y) \bigr] + \mathrm{E}\bigl[ \mathrm{Var}(X \mid Y) \bigr]. \tag{7.3.13}
$$

用这些工具可以证明下面的定理。

> **定理 7.3.17（Rao–Blackwell 定理）**
>
> 设 $$W$$ 是 $$\tau(\theta)$$ 的任何无偏估计量，$$T$$ 是 $$\theta$$ 的充分统计量。定义 $$\phi(T) = \mathrm{E}(W \mid T)$$。则 $$\mathrm{E}_{\theta}\, \phi(T) = \tau(\theta)$$ 且 $$\mathrm{Var}_{\theta}\, \phi(T) \leq \mathrm{Var}_{\theta}\, W$$ 对一切 $$\theta$$ 成立；即 $$\phi(T)$$ 是 $$\tau(\theta)$$ 的一致更好的无偏估计量。
>
> **证明**　由 (7.3.13)，
>
> $$
\tau(\theta) = \mathrm{E}_{\theta}\, W = \mathrm{E}_{\theta}\bigl[ \mathrm{E}(W \mid T) \bigr] = \mathrm{E}_{\theta}\, \phi(T),
$$
>
> 故 $$\phi(T)$$ 是 $$\tau(\theta)$$ 的无偏估计。又
>
> $$
\mathrm{Var}_{\theta}\, W = \mathrm{Var}_{\theta}\bigl[ \mathrm{E}(W \mid T) \bigr] + \mathrm{E}_{\theta}\bigl[ \mathrm{Var}(W \mid T) \bigr] = \mathrm{Var}_{\theta}\, \phi(T) + \mathrm{E}_{\theta}\bigl[ \mathrm{Var}(W \mid T) \bigr] \geq \mathrm{Var}_{\theta}\, \phi(T) \qquad （\mathrm{Var}(W \mid T) \geq 0）.
$$
>
> 故 $$\phi(T)$$ 一致优于 $$W$$；剩下的只须证明 $$\phi(T)$$ 确实是一个估计量，即 $$\phi(T) = \mathrm{E}(W \mid T)$$ 只是样本的函数、特别是不依赖 $$\theta$$。由充分性的定义及 $$W$$ 只是样本的函数这一事实，$$W \mid T$$ 的分布不依赖 $$\theta$$。故 $$\phi(T)$$ 是 $$\tau(\theta)$$ 的一致更好的无偏估计量。 ∎

因此，把任何无偏估计量对充分统计量取条件都将导致一致的改进；所以寻找最佳无偏估计量时只须考虑充分统计量的函数。

恒等式 (7.3.13) 未提及充分性，因此乍看似乎对任何东西取条件都会带来改进。这实际上是对的，但问题在于所得量可能依赖 $$\theta$$，从而不是一个估计量。

> **例 7.3.18（对不充分统计量取条件）**
>
> 设 $$X_1, X_2$$ 是 iid $$n(\theta, 1)$$。统计量 $$\bar{X} = \tfrac{1}{2} (X_1 + X_2)$$ 满足 $$\mathrm{E}_{\theta}\, \bar{X} = \theta$$ 与 $$\mathrm{Var}_{\theta}\, \bar{X} = \tfrac{1}{2}$$。考虑对 $$X_1$$（不充分）取条件。令 $$\phi(X_1) = \mathrm{E}_{\theta}\bigl( \bar{X} \mid X_1 \bigr)$$。由 (7.3.13)，$$\mathrm{E}_{\theta}\, \phi(X_1) = \theta$$ 且 $$\mathrm{Var}_{\theta}\, \phi(X_1) \leq \mathrm{Var}_{\theta}\, \bar{X}$$，故 $$\phi(X_1)$$ 优于 $$\bar{X}$$。然而
>
> $$
\phi(X_1) = \mathrm{E}_{\theta}\bigl( \bar{X} \mid X_1 \bigr) = \frac{1}{2}\, \mathrm{E}_{\theta}\bigl( X_1 \mid X_1 \bigr) + \frac{1}{2}\, \mathrm{E}_{\theta}\bigl( X_2 \mid X_1 \bigr) = \frac{1}{2}\, X_1 + \frac{1}{2}\, \theta,
$$
>
> 最后一步因独立性有 $$\mathrm{E}_{\theta}\bigl( X_2 \mid X_1 \bigr) = \mathrm{E}_{\theta}\, X_2$$。故 $$\phi(X_1)$$ 不是估计量。

如今我们知道：找 $$\tau(\theta)$$ 的最佳无偏估计量时，只须考虑基于充分统计量的估计量。现在的问题变为：若 $$\mathrm{E}_{\theta}\, \phi = \tau(\theta)$$ 且 $$\phi$$ 基于充分统计量（即 $$\mathrm{E}(\phi \mid T) = \phi$$），如何知道 $$\phi$$ 是最佳无偏的？当然若 $$\phi$$ 达到 Cramér–Rao 下界则它是最佳无偏；但若达不到呢？例如若 $$\phi^{*}$$ 是 $$\tau(\theta)$$ 的另一个无偏估计量，$$\mathrm{E}(\phi^{*} \mid T)$$ 与 $$\phi$$ 相比如何？下面的定理部分回答了这一问题，表明最佳无偏估计量是唯一的。

> **定理 7.3.19（最佳无偏估计量的唯一性）**
>
> 若 $$W$$ 是 $$\tau(\theta)$$ 的最佳无偏估计量，则 $$W$$ 唯一。
>
> **证明**　设 $$W'$$ 是另一个最佳无偏估计量，考虑估计量 $$W^{*} = \tfrac{1}{2} (W + W')$$。注意 $$\mathrm{E}_{\theta}\, W^{*} = \tau(\theta)$$ 且
>
> $$
\begin{aligned}
\mathrm{Var}_{\theta}\, W^{*} &= \mathrm{Var}_{\theta}\Bigl( \frac{1}{2}\, W + \frac{1}{2}\, W' \Bigr)\\
&= \frac{1}{4}\, \mathrm{Var}_{\theta}\, W + \frac{1}{4}\, \mathrm{Var}_{\theta}\, W' + \frac{1}{2}\, \mathrm{Cov}_{\theta}(W, W') \qquad （\text{习题 4.44}）\\
&\leq \frac{1}{4}\, \mathrm{Var}_{\theta}\, W + \frac{1}{4}\, \mathrm{Var}_{\theta}\, W' + \frac{1}{2}\, \bigl[ (\mathrm{Var}_{\theta}\, W)\, (\mathrm{Var}_{\theta}\, W') \bigr]^{1/2} \qquad （\text{柯西—施瓦茨}）\\
&= \mathrm{Var}_{\theta}\, W \qquad （\mathrm{Var}_{\theta}\, W = \mathrm{Var}_{\theta}\, W'）.
\end{aligned} \tag{7.3.14}
$$
>
> 但若上述不等式严格，则与 $$W$$ 的最佳无偏性矛盾，故必须对所有 $$\theta$$ 取等。由于该不等式是柯西—施瓦茨的应用，取等仅当 $$W' = a(\theta)\, W + b(\theta)$$。用协方差的性质：
>
> $$
\mathrm{Cov}_{\theta}(W, W') = \mathrm{Cov}_{\theta}\bigl[ W,\ a(\theta)\, W + b(\theta) \bigr] = \mathrm{Cov}_{\theta}\bigl[ W,\ a(\theta)\, W \bigr] = a(\theta)\, \mathrm{Var}_{\theta}\, W,
$$
>
> 但 (7.3.14) 中取等意味着 $$\mathrm{Cov}_{\theta}(W, W') = \mathrm{Var}_{\theta}\, W$$。故 $$a(\theta) = 1$$；又 $$\mathrm{E}_{\theta}\, W' = \tau(\theta)$$，必有 $$b(\theta) = 0$$，从而 $$W = W'$$，$$W$$ 唯一。 ∎

为弄清无偏估计量何时是最佳无偏的，可以问：如何改进给定的无偏估计量？设 $$W$$ 满足 $$\mathrm{E}_{\theta}\, W = \tau(\theta)$$，另有满足 $$\mathrm{E}_{\theta}\, U = 0$$（对一切 $$\theta$$）的估计量 $$U$$，即 $$U$$ 是零的无偏估计量。估计量

$$
\phi_a = W + a U
$$

（$$a$$ 为常数）满足 $$\mathrm{E}_{\theta}\, \phi_a = \tau(\theta)$$，故也是 $$\tau(\theta)$$ 的无偏估计量。$$\phi_a$$ 能优于 $$W$$ 吗？$$\phi_a$$ 的方差为

$$
\mathrm{Var}_{\theta}\, \phi_a = \mathrm{Var}_{\theta}\, (W + a U) = \mathrm{Var}_{\theta}\, W + 2a\, \mathrm{Cov}_{\theta}(W, U) + a^2\, \mathrm{Var}_{\theta}\, U.
$$

若对某个 $$\theta = \theta_0$$ 有 $$\mathrm{Cov}_{\theta_0}(W, U) < 0$$，则取 $$a \in \Bigl( 0,\ -2\, \mathrm{Cov}_{\theta_0}(W, U) / \mathrm{Var}_{\theta_0}\, U \Bigr)$$ 可使 $$2a\, \mathrm{Cov}_{\theta_0}(W, U) + a^2\, \mathrm{Var}_{\theta_0}\, U < 0$$，故 $$\phi_a$$ 在 $$\theta = \theta_0$$ 处优于 $$W$$，$$W$$ 不可能是最佳无偏。类似论证表明若对任何 $$\theta_0$$ 有 $$\mathrm{Cov}_{\theta_0}(W, U) > 0$$，$$W$$ 也不可能是最佳无偏（见习题 7.53）。于是 $$W$$ 与零的无偏估计量的关系是评价 $$W$$ 是否最佳无偏的关键；这一关系实际上刻画了最佳无偏性。

> **定理 7.3.20（最佳无偏性的刻画）**
>
> 若 $$\mathrm{E}_{\theta}\, W = \tau(\theta)$$，则 $$W$$ 是 $$\tau(\theta)$$ 的最佳无偏估计量当且仅当 $$W$$ 与一切零的无偏估计量不相关。
>
> **证明**　若 $$W$$ 最佳无偏，上面的论证表明：对任何满足 $$\mathrm{E}_{\theta}\, U = 0$$ 的 $$U$$，$$W$$ 必须满足 $$\mathrm{Cov}_{\theta}(W, U) = 0$$（对一切 $$\theta$$）。必要性得证。
>
> 现设有无偏估计量 $$W$$ 与一切零的无偏估计量不相关。设 $$W'$$ 是满足 $$\mathrm{E}_{\theta}\, W' = \mathrm{E}_{\theta}\, W = \tau(\theta)$$ 的任何其他估计量，我们将证明 $$W$$ 优于 $$W'$$。写
>
> $$
W' = W + (W' - W),
$$
>
> 计算
>
> $$
\mathrm{Var}_{\theta}\, W' = \mathrm{Var}_{\theta}\, W + \mathrm{Var}_{\theta}\, (W' - W) + 2\, \mathrm{Cov}_{\theta}\bigl( W,\ W' - W \bigr) = \mathrm{Var}_{\theta}\, W + \mathrm{Var}_{\theta}\, (W' - W), \tag{7.3.15}
$$
>
> 最后的等式成立是因为 $$W' - W$$ 是零的无偏估计量，且由假设与 $$W$$ 不相关。由于 $$\mathrm{Var}_{\theta}(W' - W) \geq 0$$，(7.3.15) 蕴含 $$\mathrm{Var}_{\theta}\, W' \geq \mathrm{Var}_{\theta}\, W$$。$$W'$$ 任意，故 $$W$$ 是 $$\tau(\theta)$$ 的最佳无偏估计量。 ∎

注意零的无偏估计量不过是随机噪声——零的估计量中没有信息。（合理的说法是：估计零最合理的方式是用零，而不是用随机噪声。）因此若一个估计量可以通过向其添加随机噪声而得到改进，该估计量多半有缺陷。（或者我们可以质疑评价估计量所用的准则，但此处这一准则无可怀疑。）这正是定理 7.3.20 形式化的直觉。

虽然如今我们有了最佳无偏估计量的有趣刻画，其应用的用处有限：验证一个估计量与一切零的无偏估计量不相关往往困难，因为通常难以描述全部零的无偏估计量。不过它有时在判定某个估计量不是最佳无偏时有用。

> **例 7.3.21（零的无偏估计量）**
>
> 设 $$X$$ 是 uniform $$(\theta, \theta + 1)$$ 分布的一次观测。则
>
> $$
\mathrm{E}_{\theta}\, X = \int_{\theta}^{\theta + 1} x\, dx = \theta + \frac{1}{2},
$$
>
> 故 $$X - \tfrac{1}{2}$$ 是 $$\theta$$ 的无偏估计量，且容易验证 $$\mathrm{Var}_{\theta}\, X = \tfrac{1}{12}$$。
>
> 对该 pdf，零的无偏估计量是周期为 1 的周期函数。这来自如下事实：若 $$h(x)$$ 满足
>
> $$
\int_{\theta}^{\theta + 1} h(x)\, dx = 0 \qquad \text{（对一切}\ \theta\text{）},
$$
>
> 则
>
> $$
0 = \frac{d}{d\theta} \int_{\theta}^{\theta + 1} h(x)\, dx = h(\theta + 1) - h(\theta) \qquad \text{（对一切}\ \theta\text{）}.
$$
>
> 这样的函数是 $$h(x) = \sin(2\pi x)$$。现在
>
> $$
\begin{aligned}
\mathrm{Cov}_{\theta}\Bigl( X - \frac{1}{2},\ \sin(2\pi X) \Bigr) &= \mathrm{Cov}_{\theta}\bigl( X,\ \sin(2\pi X) \bigr) = \int_{\theta}^{\theta + 1} x\, \sin(2\pi x)\, dx\\
&= -\frac{\bigl[ x\, \cos(2\pi x) \bigr]_{\theta}^{\theta + 1}}{2\pi} + \int_{\theta}^{\theta + 1} \frac{\cos(2\pi x)}{2\pi}\, dx \qquad （\text{分部积分}）\\
&= -\frac{\cos(2\pi\theta)}{2\pi},
\end{aligned}
$$
>
> 其中用了 $$\cos\bigl( 2\pi(\theta + 1) \bigr) = \cos(2\pi\theta)$$ 与 $$\sin\bigl( 2\pi(\theta + 1) \bigr) = \sin(2\pi\theta)$$。
>
> 故 $$X - \tfrac{1}{2}$$ 与零的某无偏估计量相关，不可能是 $$\theta$$ 的最佳无偏估计量。事实上容易验证估计量 $$X - \tfrac{1}{2} + \frac{\sin(2\pi X)}{2\pi}$$ 是 $$\theta$$ 的无偏估计，方差 $$0.071 < \tfrac{1}{12}$$。

要回答“最佳无偏估计量是否存在”的问题，需要某种对零的全部无偏估计量的刻画。有了这样的刻画，我们就能检查最佳无偏估计量的候选者是否确实最优。

刻画零的无偏估计量并不容易，需要对所用的 pdf（或 pmf）施加条件。注意本节至此我们尚未对 pdf 规定条件（例如 Cramér–Rao 下界就需要条件）。为这种一般性付出的代价是难以验证最佳无偏估计量的存在性。

若 pdf 或 pmf 族 $$f(\textbf{x} \mid \theta)$$ 具有如下性质：没有零的无偏估计量（除零本身），则搜索即告结束，因为任何统计量 $$W$$ 都满足 $$\mathrm{Cov}_{\theta}(W, 0) = 0$$。回忆定义 6.2.21 定义的完备性保证这种情形。

> **例 7.3.22（例 7.3.13 的继续）**
>
> 对 $$X_1, \ldots, X_n$$ iid uniform$(0, \theta)$$，我们见到 $$\frac{n+1}{n}\, Y$$ 是 $$\theta$$ 的无偏估计量（$$Y = \max\{X_1, \ldots, X_n\}$$）。Cramér–Rao 定理的条件不满足，我们尚未确定该估计量是否最佳无偏。但例 6.2.23 中已证 $$Y$$ 是完备充分统计量：这意味着 $$Y$$ 的 pdf 族完备，基于 $$Y$$ 没有零的无偏估计量（由 Rao–Blackwell 定理形式的充分性，只须考虑基于 $$Y$$ 的零的无偏估计量）。因此 $$\frac{n+1}{n}\, Y$$ 与一切零的无偏估计量不相关（因为唯一的那个就是零本身），故 $$\frac{n+1}{n}\, Y$$ 是 $$\theta$$ 的最佳无偏估计量。
值得再次指出：重要的是充分统计量分布族的完备性，而原分布族的完备性无关紧要。这由 Rao–Blackwell 定理而来——我们可以把注意力限制在充分统计量的函数上，一切期望都对该统计量的分布取。
在下列定理中总结完备性与最佳无偏性的关系。
**定理 7.3.23（Lehmann–Scheffé 型定理）**
设 $$T$$ 是参数 $$\theta$$ 的完备充分统计量，$$\phi(T)$$ 是只基于 $$T$$ 的任何估计量。则 $$\phi(T)$$ 是其期望值的唯一最佳无偏估计量。
本节以这里发展的理论的一个有趣且有用的应用结束。许多情形下，$$\tau(\theta)$$ 的无偏估计量没有明显的候选者，更谈不上最佳无偏估计量的候选者。然而在完备性在场时，本节的理论告诉我们：只要能找到任何无偏估计量，就能找到最佳无偏估计量。若 $$T$$ 是参数 $$\theta$$ 的完备充分统计量，$$h(X_1, \ldots, X_n)$$ 是 $$\tau(\theta)$$ 的任何无偏估计量，则 $$\phi(T) = \mathrm{E}\bigl( h(X_1, \ldots, X_n) \mid T \bigr)$$ 就是 $$\tau(\theta)$$ 的最佳无偏估计量（见习题 7.56）。
**例 7.3.24（二项最佳无偏估计）**
设 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{binomial}(k, \theta)$$。问题是从 $$\mathrm{binomial}(k, \theta)$$ 估计“恰有一次成功”的概率，即估计
$$
> \tau(\theta) = P_{\theta}(X = 1) = k\, \theta\, (1 - \theta)^{k - 1}.
> $$
现在 $$\sum_{i=1}^{n} X_i \sim \mathrm{binomial}(kn, \theta)$$ 是完备充分统计量，但基于它的无偏估计量并不显而易见。身处这种境地时，试试最简单的解。朴素的估计量
$$
> h(X_1) = \begin{cases} 1 & \text{若}\ X_1 = 1,\\ 0 & \text{其他} \end{cases}
> $$
满足
$$
> \mathrm{E}_{\theta}\, h(X_1) = \sum_{x_1=0}^{k} h(x_1)\, \binom{k}{x_1}\, \theta^{x_1} (1 - \theta)^{k - x_1} = k\, \theta\, (1 - \theta)^{k - 1},
> $$
故它是 $$k\, \theta (1 - \theta)^{k - 1}$$ 的无偏估计量。我们的理论现在告诉我们：估计量
$$
> \phi\Biggl( \sum_{i=1}^{n} X_i \Biggr) = \mathrm{E}\Biggl[ h(X_1) \,\Bigg\vert \, \sum_{i=1}^{n} X_i \Biggr]
> $$
是 $$k\, \theta (1 - \theta)^{k - 1}$$ 的最佳无偏估计量。（注意我们无须实际计算 $$\phi\bigl( \sum_{i=1}^{n} X_i \bigr)$$ 的期望：由迭代期望的性质，我们知道它有正确的期望值。）但我们必须能求值 $$\phi$$。设观测到 $$\sum_{i=1}^{n} X_i = t$$，则
$$
> \phi(t) = \mathrm{E}\Biggl[ h(X_1) \,\Bigg\vert \, \sum_{i=1}^{n} X_i = t \Biggr] = P\Biggl( X_1 = 1 \,\Bigg\vert \, \sum_{i=1}^{n} X_i = t \Biggr) \qquad （\text{该期望不依赖}\ \theta；\ h\ \text{取 0 或 1}）
> $$
$$
> = \frac{P_{\theta}\Bigl( X_1 = 1,\ \sum_{i=1}^{n} X_i = t \Bigr)}{P_{\theta}\Bigl( \sum_{i=1}^{n} X_i = t \Bigr)} \qquad （\text{条件概率的定义}）
> = \frac{P_{\theta}\Bigl( X_1 = 1,\ \sum_{i=2}^{n} X_i = t - 1 \Bigr)}{P_{\theta}\Bigl( \sum_{i=1}^{n} X_i = t \Bigr)} \qquad （X_1 = 1\ \text{冗余}）
> $$
$$
> = \frac{P_{\theta}(X_1 = 1)\, P_{\theta}\Bigl( \sum_{i=2}^{n} X_i = t - 1 \Bigr)}{P_{\theta}\Bigl( \sum_{i=1}^{n} X_i = t \Bigr)} \qquad （X_1\ \text{与}\ X_2, \ldots, X_n\ \text{独立}）.
> $$
现在 $$X_1 \sim \mathrm{binomial}(k, \theta)$$，$$\sum_{i=2}^{n} X_i \sim \mathrm{binomial}(k (n - 1), \theta)$$，$$\sum_{i=1}^{n} X_i \sim \mathrm{binomial}(kn, \theta)$$。用这些事实：
$$
> \phi(t) = \frac{k\, \theta (1 - \theta)^{k - 1}\, \dbinom{k (n - 1)}{t - 1}\, \theta^{t - 1} (1 - \theta)^{k (n - 1) - (t - 1)}}{\dbinom{kn}{t}\, \theta^{t} (1 - \theta)^{kn - t}} = k\, \frac{\dbinom{k (n - 1)}{t - 1}}{\dbinom{kn}{t}}.
> $$
注意所有 $$\theta$$ 都消去了——既然 $$\sum_{i=1}^{n} X_i$$ 充分，理应如此。故 $$k\, \theta (1 - \theta)^{k - 1}$$ 的最佳无偏估计量是
$$
> \phi\Biggl( \sum_{i=1}^{n} X_i \Biggr) = k\, \frac{\dbinom{k (n - 1)}{\sum_i X_i - 1}}{\dbinom{kn}{\sum_i X_i}}.
> $$
我们无须完成 $$\mathrm{E}_{\theta}\bigl[ \phi\bigl( \sum_{i=1}^{n} X_i \bigr) \bigr]$$ 的困难求值即可断言无偏性。
### 7.3.4 损失函数最优性（Loss Function Optimality）
我们对点估计量的评价一直基于其均方误差表现。均方误差是一种称为损失函数的函数的特例。通过损失函数评价估计量之表现与最优性的研究，是决策论的一个分支。
在观测到数据 $$\textbf{X} = \textbf{x}$$（其中 $$\textbf{X} \sim f(\textbf{x} \mid \theta)$$，$$\theta \in \Theta$$）之后，就要对 $$\theta$$ 作出决策。允许决策的集合称为行动空间（action space），记作 $$\mathcal{A}$$。点估计问题中 $$\mathcal{A}$$ 常等于参数空间 $$\Theta$$，但在其他问题（如假设检验——见 8.3.5 节）中会改变。
点估计问题中的损失函数反映如下事实：若行动 $$a$$ 接近 $$\theta$$，则决策 $$a$$ 合理、损失很小；若 $$a$$ 远离 $$\theta$$，则损失很大。损失函数是非负函数，一般随 $$a$$ 与 $$\theta$$ 之间距离增大而增大。若 $$\theta$$ 是实值的，两种常用损失函数是
$$
\text{绝对误差损失：}\quad L(\theta, a) = \vert a - \theta\vert ,
$$
$$
\text{平方误差损失：}\quad L(\theta, a) = (a - \theta)^2.
$$
两者都随 $$\theta$$ 与 $$a$$ 之间距离增大而增大，最小值 $$L(\theta, \theta) = 0$$：行动正确时损失最小。平方误差损失对大偏差的惩罚相对更重，绝对误差损失对小偏差的惩罚相对更重。平方误差损失的一个变体——对高估的惩罚重于低估——是
$$
L(\theta, a) = \begin{cases} (a - \theta)^2 & \text{若}\ a < \theta,\\ 10 (a - \theta)^2 & \text{若}\ a \geq \theta. \end{cases}
$$
在 $$\theta$$ 接近零时比 $$\vert \theta\vert $$ 大时更重地惩罚估计误差的损失——相对平方误差损失——是
$$
L(\theta, a) = \frac{(a - \theta)^2}{\vert \theta\vert  + 1}.
$$
注意后面两种平方误差损失的变体本也可以基于绝对误差损失构造。一般地，实验者必须考虑各种 $$\theta$$ 值下估计误差的后果，并规定反映这些后果的损失函数。
在损失函数或决策论分析中，估计量的质量由其风险函数（risk function）量化：对 $$\theta$$ 的估计量 $$\delta(\textbf{x})$$，风险函数（$$\theta$$ 的函数）为
$$
R(\theta, \delta) = \mathrm{E}_{\theta}\, L\bigl( \theta, \delta(\textbf{X}) \bigr). \tag{7.3.16}
$$
在给定 $$\theta$$ 处，风险函数是使用估计量 $$\delta(\textbf{x})$$ 时将承受的平均损失。
由于 $$\theta$$ 的真值未知，我们希望使用对所有 $$\theta$$ 值都有小 $$R(\theta, \delta)$$ 的估计量：无论 $$\theta$$ 真值为何，估计量都有小的期望损失。要比较两个估计量 $$\delta_1$$ 与 $$\delta_2$$ 的优劣，就比较其风险函数 $$R(\theta, \delta_1)$$ 与 $$R(\theta, \delta_2)$$。若对所有 $$\theta \in \Theta$$ 有 $$R(\theta, \delta_1) < R(\theta, \delta_2)$$，则 $$\delta_1$$ 受偏爱，因为它对所有 $$\theta$$ 表现更好。更常见的情形是两条风险函数交叉，此时哪个估计更好的判断未必那么分明。
估计量 $$\delta$$ 的风险函数就是 (7.3.16) 定义的期望损失。对平方误差损失，风险函数是熟悉的量——7.3.1 节使用的均方误差：那里估计量的 MSE 定义为 $$\mathrm{MSE}(\theta) = \mathrm{E}_{\theta}\, \bigl( \delta(\textbf{X}) - \theta \bigr)^2$$，当 $$L(\theta, a) = (a - \theta)^2$$ 时它恰是 $$\mathrm{E}_{\theta}\, L\bigl( \theta, \delta(\textbf{X}) \bigr) = R(\theta, \delta)$$。如 (7.3.1)，对平方误差损失有
$$
R(\theta, \delta) = \mathrm{Var}_{\theta}\, \delta(\textbf{X}) + \bigl( \mathrm{E}_{\theta}\, \delta(\textbf{X}) - \theta \bigr)^2 = \mathrm{Var}_{\theta}\, \delta(\textbf{X}) + \bigl( \mathrm{Bias}_{\theta}\, \delta(\textbf{X}) \bigr)^2. \tag{7.3.17}
$$
平方误差损失的风险函数清楚表明：好的估计量应同时有小方差与小偏差。决策论分析会评判估计量在同时最小化这两个量上的成败。
像 7.3.2 节那样把允许估计量集合 $$\mathcal{D}$$ 限制为无偏估计量集合的决策论分析是非典型的：那时最小化风险就是最小化方差。决策论分析更全面——方差与偏差都在风险之中、被同时考虑。估计量若同时具有小（但可能非零的）偏差与小方差，会被判为好估计量。
**例 7.3.25（二项风险函数）**
例 7.3.5 中考虑了来自 $$\mathrm{Bernoulli}(p)$$ 总体的随机样本 $$X_1, \ldots, X_n$$，以及两个估计量
$$
> \hat{p}_B = \frac{\sum_{i=1}^{n} X_i + \sqrt{n}/4}{n + \sqrt{n}} \qquad\text{与}\qquad \bar{X} = \frac{1}{n} \sum_{i=1}^{n} X_i.
> $$
这两个估计量在 $$n = 4$$ 与 $$n = 400$$ 时的风险函数绘于图 7.3.1，其比较正如例 7.3.5 所述：基于风险比较，小 $$n$$ 时偏爱 $$\hat{p}_B$$，大 $$n$$ 时偏爱 $$\bar{X}$$。
**例 7.3.26（正态方差的风险）**
设 $$X_1, \ldots, X_n$$ 是来自 $$n(\mu, \sigma^2)$$ 总体的随机样本。考虑在平方误差损失下估计 $$\sigma^2$$。我们考虑形如 $$\delta_b(\textbf{X}) = b\, S^2$$ 的估计量（$$S^2$$ 为样本方差，$$b$$ 为任意非负常数）。回忆 $$\mathrm{E} S^2 = \sigma^2$$，且对正态样本 $$\mathrm{Var} S^2 = 2 \sigma^4 / (n - 1)$$。用 (7.3.17) 可计算 $$\delta_b$$ 的风险函数：
$$
> \begin{aligned}
> R\bigl( (\mu, \sigma^2),\, \delta_b \bigr) &= \mathrm{Var}\bigl( b\, S^2 \bigr) + \bigl( \mathrm{E}\, b\, S^2 - \sigma^2 \bigr)^2
> = b^2\, \mathrm{Var} S^2 + \bigl( b\, \mathrm{E} S^2 - \sigma^2 \bigr)^2\\
> &= \frac{b^2\, 2 \sigma^4}{n} + (b - 1)^2\, \sigma^4 \qquad （\text{用}\ \mathrm{Var} S^2）\\
> &= \Biggl( \frac{2b^2}{n - 1} + (b - 1)^2 \Biggr)\, \sigma^4.
> \end{aligned}
> $$
$$\delta_b$$ 的风险函数不依赖 $$\mu$$，是 $$\sigma^2$$ 的二次函数，形如 $$c_b\, (\sigma^2)^2$$（$$c_b$$ 为正常数）。要比较两条风险函数（从而两个估计量的优劣），注意若 $$c_b < c_{b'}$$，则对一切 $$(\mu, \sigma^2)$$ 值有
$$
> R\bigl( (\mu, \sigma^2),\, \delta_b \bigr) = c_b\, (\sigma^2)^2 < c_{b'}\, (\sigma^2)^2 = R\bigl( (\mu, \sigma^2),\, \delta_{b'} \bigr),
> $$
故 $$\delta_b$$ 优于 $$\delta_{b'}$$。给出
$$
> c_b = \frac{2b^2}{n - 1} + (b - 1)^2 \tag{7.3.18}
> $$
整体最小值的 $$b$$ 给出该类中最好的估计量 $$\delta_b$$。标准微积分方法表明最小化值为 $$b = \frac{n - 1}{n + 1}$$。于是在每个 $$(\mu, \sigma^2)$$ 值处，估计量
$$
> \tilde{S}^2 = \frac{n - 1}{n + 1}\, S^2 = \frac{1}{n + 1} \sum_{i=1}^{n} \bigl( X_i - \bar{X} \bigr)^2
> $$
在所有形如 $$b\, S^2$$ 的估计量中风险最小。图 7.3.2 展示了 $$n = 5$$ 时该估计量与该类中另两个估计量的风险函数：另两个是 $$S^2$$（无偏估计量）与 $$\hat{\sigma}^2 = \frac{n - 1}{n}\, S^2$$（$$\sigma^2$$ 的 MLE）。显然 $$\tilde{S}^2$$ 的风险函数处处最小。
![ch07_fig_7_3_2](fig/ch07_fig_7_3_2.png)
*图 7.3.2　 例 7.3.26 中三个方差估计量的风险函数（原书 Figure 7.3.2）*
**例 7.3.27（用 Stein 损失估计方差）**
再次考虑用形如 $$b\, S^2$$ 的估计量估计总体方差 $$\sigma^2$$。这一分析可以相当一般：只设 $$X_1, \ldots, X_n$$ 是来自某方差 $$\sigma^2$$（正且有限）的总体的随机样本。现在使用归功于 Stein 的损失函数（James and Stein 1961；另见 Brown 1990a）：
$$
> L(\sigma^2, a) = \frac{a}{\sigma^2} - 1 - \log\frac{a}{\sigma^2}.
> $$
该损失比平方误差损失复杂，但有些合理的性质。注意 $$a = \sigma^2$$ 时损失为零；且对固定的 $$\sigma^2$$，当 $$a \to 0$$ 或 $$a \to \infty$$ 时 $$L(\sigma^2, a) \to \infty$$，即严重的低估与严重的低估一样受重罚。（平方误差损失在方差估计问题中受到的批评是：低估只有有限惩罚而高估有无穷惩罚。）该损失函数也来自正态总体样本中 $$\sigma^2$$ 的似然函数，从而把好的决策论性质与好的似然性质联系在一起（见习题 7.61）。
对估计量 $$\delta_b = b\, S^2$$，风险函数为
$$
> R(\sigma^2, \delta_b) = \mathrm{E}\Biggl[ \frac{b\, S^2}{\sigma^2} - 1 - \log \frac{b\, S^2}{\sigma^2} \Biggr] = b\, \mathrm{E} \frac{S^2}{\sigma^2} - 1 - \mathrm{E} \log \frac{b\, S^2}{\sigma^2}
> = b - \log b - 1 - \mathrm{E}\Bigl[ \log \frac{S^2}{\sigma^2} \Bigr] \qquad （\mathrm{E}_{\sigma^2} \frac{S^2}{\sigma^2} = 1）.
> $$
量 $$\mathrm{E} \log(S^2 / \sigma^2)$$ 可以是 $$\sigma^2$$ 与其他总体参数的函数，但不是 $$b$$ 的函数。故对一切 $$\sigma^2$$，$$R(\sigma^2, \delta_b)$$ 在最小化 $$b - \log b$$ 的 $$b$$ 值——即 $$b = 1$$——处最小。因此形如 $$b\, S^2$$ 的估计量中对一切 $$\sigma^2$$ 值风险最小的是 $$\delta_1 = S^2$$。
对损失函数最优性问题也可以采用贝叶斯途径，此时我们有先验分布 $$\pi(\theta)$$。贝叶斯分析会用该先验分布计算平均风险
$$
\int_{\Theta} R(\theta, \delta)\, \pi(\theta)\, d\theta,
$$
称为贝叶斯风险（Bayes risk）。对风险函数取平均给了我们一个数，用于评估估计量相对于给定损失函数的表现；而且可以尝试求使贝叶斯风险最小的估计量，这样的估计量称为关于先验 $$\pi$$ 的贝叶斯法则（Bayes rule），常记作 $$\delta^{\pi}$$。
求给定先验 $$\pi$$ 的贝叶斯决策法则看似任务艰巨，实则相当机械，如下面定理所示。（按如下方法求贝叶斯法则的技术比这里呈现的更一般；见 Brown and Purves 1973。）
对 $$\textbf{X} \sim f(\textbf{x} \mid \theta)$$ 与 $$\theta \sim \pi$$，决策法则 $$\delta$$ 的贝叶斯风险可写为
$$
\int_{\Theta} R(\theta, \delta)\, \pi(\theta)\, d\theta = \int_{\Theta} \int_{\mathcal{X}} L\bigl( \theta, \delta(\textbf{x}) \bigr)\, f(\textbf{x} \mid \theta)\, dx\, \pi(\theta)\, d\theta.
$$
现在写 $$f(\textbf{x} \mid \theta)\, \pi(\theta) = \pi(\theta \mid \textbf{x})\, m(\textbf{x})$$（$$\pi(\theta \mid \textbf{x})$$ 为 $$\theta$$ 的后验分布，$$m(\textbf{x})$$ 为 $$\textbf{X}$$ 的边缘分布），贝叶斯风险可写为
$$
\int_{\Theta} R(\theta, \delta)\, \pi(\theta)\, d\theta = \int_{\mathcal{X}} \Biggl[ \int_{\Theta} L\bigl( \theta, \delta(\textbf{x}) \bigr)\, \pi(\theta \mid \textbf{x})\, d\theta \Biggr]\, m(\textbf{x})\, dx. \tag{7.3.19}
$$
方括号中的量是损失函数关于后验分布的期望值，称为后验期望损失（posterior expected loss）；它只是 **x** 的函数而非 $$\theta$$ 的函数。于是对每个 **x**，若选行动 $$\delta(\textbf{x})$$ 使后验期望损失最小，我们就最小化了贝叶斯风险。
注意我们由此得到构造贝叶斯法则的配方：对给定观测 **x**，贝叶斯法则应使后验期望损失最小。这与此前各节的任何处方都相当不同。例如考虑先前讨论的求最佳无偏估计量的方法：使用定理 7.3.23 首先要找完备充分统计量 $$T$$；然后要找作为参数无偏估计量的函数 $$\phi(T)$$；Rao–Blackwell 定理（定理 7.3.17）在已知参数某个无偏估计量时或有帮助；但若想不出任何无偏估计量，该方法并未告诉我们如何构造一个。
即使后验期望损失的最小化无法解析完成，积分可以求值、最小化可以数值进行。事实上观测到 $$\textbf{X} = \textbf{x}$$ 后，只须对这个特定的 **x** 做最小化。不过有些问题中我们可以显式描述贝叶斯法则。
**例 7.3.28（两个贝叶斯法则）**
考虑实值参数 $$\theta$$ 的点估计问题。
- a. 平方误差损失下，后验期望损失为
  $$
>   \int_{\Theta} (\theta - a)^2\, \pi(\theta \mid \textbf{x})\, d\theta = \mathrm{E}\Bigl[ (\theta - a)^2 \mid \textbf{X} = \textbf{x} \Bigr].
>   $$
  这里 $$\theta$$ 是具有分布 $$\pi(\theta \mid \textbf{x})$$ 的随机变量。由例 2.2.6，该期望在 $$\delta^{\pi}(\textbf{x}) = \mathrm{E}(\theta \mid \textbf{x})$$ 处最小。故贝叶斯法则是后验分布的均值。
- b. 绝对误差损失下，后验期望损失为 $$\mathrm{E}\bigl( \vert \theta - a\vert  \mid \textbf{X} = \textbf{x} \bigr)$$。应用习题 2.18 可见：取 $$\delta^{\pi}(\textbf{x}) = \pi(\theta \mid \textbf{x})$$ 的中位数即可使其最小。
表 7.3.1　 二项 $$p$$ 的三个估计量（$$n = 10$$，先验 $$\pi(p) \sim \mathrm{uniform}(0, 1)$$；原书 Table 7.3.1）
| $$y$$ | MLE | 贝叶斯（绝对误差） | 贝叶斯（平方误差） |
|:---:|:---:|:---:|:---:|
| 0 | 0.0000 | 0.0611 | 0.0833 |
| 1 | 0.1000 | 0.1480 | 0.1667 |
| 2 | 0.2000 | 0.2358 | 0.2500 |
| 3 | 0.3000 | 0.3238 | 0.3333 |
| 4 | 0.4000 | 0.4119 | 0.4167 |
| 5 | 0.5000 | 0.5000 | 0.5000 |
| 6 | 0.6000 | 0.5881 | 0.5833 |
| 7 | 0.7000 | 0.6762 | 0.6667 |
| 8 | 0.8000 | 0.7642 | 0.7500 |
| 9 | 0.9000 | 0.8520 | 0.8333 |
| 10 | 1.0000 | 0.9389 | 0.9137 |
7.2.3 节讨论的贝叶斯估计量是 $$\delta^{\pi}(\textbf{x}) = \mathrm{E}(\theta \mid \textbf{x})$$，即后验均值。现在我们看到：这是平方误差损失下的贝叶斯估计量。若认为其他损失函数比平方误差损失更合适，贝叶斯估计量可能是不同的统计量。
**例 7.3.29（正态贝叶斯估计）**
设 $$X_1, \ldots, X_n$$ 是来自 $$n(\theta, \sigma^2)$$ 总体的随机样本，$$\pi(\theta)$$ 为 $$n(\mu, \tau^2)$$；$$\sigma^2$$、$$\mu$$、$$\tau^2$$ 已知。例 7.2.16（经习题 7.22 推广）中我们求得给定 $$\textbf{X} = \textbf{x}$$ 时 $$\theta$$ 的后验分布是正态的，且
$$
> \mathrm{E}(\theta \mid \textbf{x}) = \frac{\tau^2}{\tau^2 + (\sigma^2/n)}\, \bar{x} + \frac{\sigma^2/n}{\tau^2 + (\sigma^2/n)}\, \mu, \qquad
> \mathrm{Var}(\theta \mid \textbf{x}) = \frac{\tau^2\, \sigma^2 / n}{\tau^2 + (\sigma^2/n)}.
> $$
平方误差损失下贝叶斯估计量是 $$\delta^{\pi}(\textbf{x}) = \mathrm{E}(\theta \mid \textbf{x})$$。由于后验分布是正态的、关于其均值对称，$$\pi(\theta \mid \textbf{x})$$ 的中位数等于 $$\mathrm{E}(\theta \mid \textbf{x})$$。故绝对误差损失下贝叶斯估计量也是 $$\delta^{\pi}(\textbf{x}) = \mathrm{E}(\theta \mid \textbf{x})$$。
**例 7.3.30（二项贝叶斯估计）**
设 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{Bernoulli}(p)$$，$$Y = \sum X_i$$；设 $$p$$ 的先验为 $$\mathrm{beta}(\alpha, \beta)$$。例 7.2.14 中发现后验分布只通过观测值 $$Y = y$$ 依赖样本，且为 $$\mathrm{beta}(y + \alpha,\ n - y + \beta)$$。故 $$\delta^{\pi}(y) = \mathrm{E}(p \mid y) = \dfrac{y + \alpha}{\alpha + \beta + n}$$ 是平方误差损失下 $$p$$ 的贝叶斯估计量。
绝对误差损失下需要求 $$\pi(p \mid y) = \mathrm{beta}(y + \alpha,\ n - y + \beta)$$ 的中位数。一般没有该中位数的简单表达式；中位数隐式定义为满足
$$
> \int_0^{m} \frac{\Gamma(\alpha + \beta + n)}{\Gamma(y + \alpha)\, \Gamma(n - y + \beta)}\, p^{y + \alpha - 1} (1 - p)^{n - y + \beta - 1}\, dp = \frac{1}{2}
> $$
的数 $$m$$。可以数值求值该积分以找出（近似）满足等式的 $$m$$。我们对 $$n = 10$$、$$\alpha = \beta = 1$$（uniform$(0,1)$$ 先验）做了这一计算；绝对误差损失下的贝叶斯估计量见表 7.3.1，表中还列出了上面导出的平方误差损失下的贝叶斯估计量以及 MLE $$\hat{p} = y/n$$。
>
> 注意表 7.3.1 中，与 MLE 不同，两个贝叶斯估计量即使 $$y$$ 为 0 或 $$n$$ 也不把 $$p$$ 估计为 0 或 1。贝叶斯估计量的典型特征是不会取到参数空间中的极端值：无论样本量多大，先验总对估计量有影响并倾向于把它拉离极端值。从 $$\mathrm{E}(p \mid y)$$ 的表达式可见，即使 $$y = 0$$ 且 $$n$$ 很大，贝叶斯估计量仍是正数。

## 7.4 习题（Exercises）

**7.1** 对离散随机变量 $$X$$（pmf 为 $$f(x \mid \theta)$$，$$\theta \in \lbrace 1, 2, 3 \rbrace$$）取一次观测。求 $$\theta$$ 的 MLE。

| $$x$$ | $$f(x \mid 1)$$ | $$f(x \mid 2)$$ | $$f(x \mid 3)$$ |
|:---:|:---:|:---:|:---:|
| 0 | $$1/3$$ | $$1/4$$ | 0 |
| 1 | $$1/3$$ | $$1/4$$ | 0 |
| 2 | 0 | $$1/4$$ | $$1/4$$ |
| 3 | $$1/6$$ | $$1/4$$ | $$1/2$$ |
| 4 | $$1/6$$ | 0 | $$1/4$$ |

**7.2** 设 $$X_1, \ldots, X_n$$ 是来自 $$\mathrm{gamma}(\alpha, \beta)$$ 总体的随机样本。(a) 设 $$\alpha$$ 已知，求 $$\beta$$ 的 MLE；(b) 若 $$\alpha$$ 与 $$\beta$$ 都未知，$$\alpha$$ 与 $$\beta$$ 的 MLE 没有显式公式，但可以用数值方法找到最大值。(a) 的结果可用于把问题约化为单变量函数的最大化。对习题 7.10(c) 的数据求 $$\alpha$$ 与 $$\beta$$ 的 MLE。

**7.3** 给定来自 pdf $$f(\textbf{x} \mid \theta)$$ 的总体的随机样本 $$X_1, \ldots, X_n$$，证明：把似然函数 $$L(\theta \mid \textbf{x})$$ 作为 $$\theta$$ 的函数最大化等价于最大化 $$\log L(\theta \mid \textbf{x})$$。

**7.4** 证明例 7.2.8 中的断言：即证明当 $$\theta$$ 的范围限制在正半轴时，那里给出的 $$\hat{\theta}$$ 是 MLE。

**7.5** 考虑如例 7.2.9 那样估计二项参数 $$k$$。(a) 证明满足不等式且为 MLE 的整数 $$\hat{k}$$ 是不超过 $$1/\hat{z}$$ 的最大整数这一断言；(b) 设 $$p = \tfrac{1}{2}$$，$$n = 4$$，$$X_1 = 0$$，$$X_2 = 20$$，$$X_3 = 1$$，$$X_4 = 19$$。$$\hat{k}$$ 是多少？

**7.6** 设 $$X_1, \ldots, X_n$$ 是来自 pdf

$$
f(x \mid \theta) = \theta\, x^{-2}, \qquad 0 < \theta \leq x < \infty
$$

的随机样本。(a) $$\theta$$ 的充分统计量是什么？(b) 求 $$\theta$$ 的 MLE；(c) 求 $$\theta$$ 的矩估计量。

**7.7** 设 $$X_1, \ldots, X_n$$ 是 iid，pdf 为二者之一。若 $$\theta = 0$$ 则

$$
f(x \mid \theta) = \begin{cases} 1 & \text{若}\ 0 < x < 1,\\ 0 & \text{其他}; \end{cases}
$$

若 $$\theta = 1$$ 则

$$
f(x \mid \theta) = \begin{cases} 1 / (2\sqrt{x}) & \text{若}\ 0 < x < 1,\\ 0 & \text{其他}. \end{cases}
$$

求 $$\theta$$ 的 MLE。

**7.8** 从 $$n(0, \sigma^2)$$ 总体取一次观测 $$X$$。(a) 求 $$\sigma^2$$ 的无偏估计量；(b) 求 $$\sigma$$ 的 MLE；(c) 讨论如何求 $$\sigma$$ 的矩估计量。

**7.9** 设 $$X_1, \ldots, X_n$$ 是 pdf

$$
f(x \mid \theta) = \frac{1}{\theta}, \qquad 0 \leq x \leq \theta, \quad \theta > 0
$$

的 iid 样本。分别用矩方法与最大似然法估计 $$\theta$$。计算两个估计量的均值与方差。应偏爱哪一个，为什么？

**7.10** 独立随机变量 $$X_1, \ldots, X_n$$ 具有共同分布

$$
P(X_i \leq x \mid \alpha, \beta) = \begin{cases} 0 & \text{若}\ x < 0,\\ (x/\beta)^{\alpha} & \text{若}\ 0 \leq x \leq \beta,\\ 1 & \text{若}\ x > \beta, \end{cases}
$$

参数 $$\alpha$$ 与 $$\beta$$ 为正。(a) 求 $$(\alpha, \beta)$$ 的二维充分统计量；(b) 求 $$\alpha$$ 与 $$\beta$$ 的 MLE；(c) 莺巢中发现的杜鹃蛋的长度（毫米）可以用该分布建模。对数据

$$
22.0,\ 23.9,\ 20.9,\ 23.8,\ 25.0,\ 24.0,\ 21.7,\ 23.8,\ 22.8,\ 23.1,\ 23.1,\ 23.5,\ 23.0,\ 23.0,
$$

求 $$\alpha$$ 与 $$\beta$$ 的最大似然估计。

**7.11** 设 $$X_1, \ldots, X_n$$ 是 pdf

$$
f(x \mid \theta) = \theta\, x^{\theta - 1}, \qquad 0 \leq x \leq 1, \quad 0 < \theta < \infty
$$

的 iid 样本。(a) 求 $$\theta$$ 的 MLE，并证明其方差随 $$n \to \infty$$ 趋于 0；(b) 求 $$\theta$$ 的矩估计量。

**7.12** 设 $$X_1, \ldots, X_n$$ 是来自 pmf

$$
P_{\theta}(X = x) = \theta^{x} (1 - \theta)^{1 - x}, \qquad x = 0\ \text{或}\ 1, \quad 0 \leq \theta \leq \frac{1}{2}
$$

的总体的随机样本。(a) 求 $$\theta$$ 的矩估计量与 MLE；(b) 求各估计量的均方误差；(c) 更偏爱哪个估计量？论证你的选择。

**7.13** 设 $$X_1, \ldots, X_n$$ 是来自双指数 pdf

$$
f(x \mid \theta) = \frac{1}{2}\, e^{-\vert x - \theta\vert }, \qquad -\infty < x < \infty, \quad -\infty < \theta < \infty
$$

的样本。求 $$\theta$$ 的 MLE。［提示：把偶数 $$n$$ 与奇数 $$n$$ 分开考虑，用次序统计量表示 MLE。该问题的完整处理见 Norton (1984)。］

**7.14** 设 $$X$$ 与 $$Y$$ 是独立的指数随机变量：

$$
f(x \mid \lambda) = \frac{1}{\lambda}\, e^{-x/\lambda}\ (x > 0), \qquad f(y \mid \mu) = \frac{1}{\mu}\, e^{-y/\mu}\ (y > 0).
$$

我们观测 $$Z$$ 与 $$W$$：

$$
Z = \min(X, Y), \qquad W = \begin{cases} 1 & \text{若}\ Z = X,\\ 0 & \text{若}\ Z = Y. \end{cases}
$$

习题 4.26 已求得 $$Z$$ 与 $$W$$ 的联合分布。现设 $$(Z_i, W_i)$$（$$i = 1, \ldots, n$$）是 $$n$$ 个 iid 观测。求 $$\lambda$$ 与 $$\mu$$ 的 MLE。

**7.15** 设 $$X_1, X_2, \ldots, X_n$$ 是逆高斯 pdf 的样本：

$$
f(x \mid \mu, \lambda) = \Biggl( \frac{\lambda}{2 \pi x^3} \Biggr)^{1/2}\, \exp\Bigl( -\lambda (x - \mu)^2 / (2 \mu^2 x) \Bigr), \qquad x > 0.
$$

(a) 证明 $$\mu$$ 与 $$\lambda$$ 的 ML 估计量为

$$
\hat{\mu}_n = \bar{X} \qquad\text{与}\qquad \hat{\lambda}_n = \frac{n}{\sum_i \bigl( \frac{1}{X_i} - \frac{1}{\bar{X}} \bigr)}.
$$

(b) Tweedie (1957) 证明 $$\hat{\mu}_n$$ 与 $$\hat{\lambda}_n$$ 独立，$$\hat{\mu}_n$$ 服从参数 $$\mu$$ 与 $$n\lambda$$ 的逆高斯分布，$$n \lambda / \hat{\lambda}_n$$ 服从 $$\chi_{n-1}^2$$ 分布；Schwarz and Samanta (1991) 用归纳法证明这些事实。(i) 证明 $$\hat{\mu}_2$$ 服从参数 $$\mu$$ 与 $$2\lambda$$ 的逆高斯分布，$$2\lambda/\hat{\lambda}_2$$ 服从 $$\chi_1^2$$，且两者独立；(ii) 设结论对 $$n = k$$ 成立，并得到新的独立观测 $$x$$。建立 Schwarz and Samanta (1991) 所用的归纳步骤，把 pdf $$f(x, \hat{\mu}_k, \hat{\lambda}_k)$$ 变换到 $$f(x, \hat{\mu}_{k+1}, \hat{\lambda}_{k+1})$$。证明该密度按恰当方式因子化，从而得到 Tweedie 的结果。

**7.16** Berger and Casella (1992) 还考察了幂均值（见习题 4.57）。回忆幂均值定义为 $$\Bigl( \frac{1}{n} \sum_{i=1}^{n} x_i^{r} \Bigr)^{1/r}$$。注意幂函数 $$x^r$$ 可以换成任何连续单调函数 $$h$$，得到广义均值 $$h^{-1}\Bigl( \frac{1}{n} \sum_{i=1}^{n} h(x_i) \Bigr)$$。(a) 最小二乘问题 $$\min_a \sum_i (x_i - a)^2$$ 有时用变换后的变量求解，即解 $$\min_a \sum_i \bigl[ h(x_i) - h(a) \bigr]^2$$。证明后一问题的解是 $$a = h^{-1}\bigl( \frac{1}{n} \sum_i h(x_i) \bigr)$$；(b) 证明算术均值是未变换最小二乘问题的解，几何均值是经 $$h(x) = \log x$$ 变换的问题的解，调和均值是经 $$h(x) = 1/x$$ 变换的问题的解；(c) 证明若最小二乘问题用 Box–Cox 变换（见习题 11.3）变换，则解是 $$h(x) = x^{\lambda}$$ 的广义均值；(d) 设 $$X_1, X_2, \ldots, X_n$$ 是来自 $$\mathrm{lognormal}(\mu, \sigma^2)$$ 总体的样本。证明 $$\mu$$ 的 MLE 是几何均值；(e) 设 $$X_1, X_2, \ldots, X_n$$ 是来自单参数指数族 $$f(x \mid \theta) = \exp\lbrace  \theta\, h(x) - H(\theta)  \rbrace\, g(x)$$ 的样本，其中 $$h = H'$$ 且 $$h$$ 递增。(i) 证明 $$\theta$$ 的 ML 估计量是 $$\hat{\theta} = h^{-1}\bigl( \frac{1}{n} \sum_i h(x_i) \bigr)$$；(ii) 证明满足 $$h = H'$$ 的两个密度是正态与逆伽马密度 $$f(x \mid \theta) = \theta\, x^{-2}\, \exp\lbrace -\theta/x \rbrace$$（$$x > 0$$）；对正态 MLE 是算术均值，对逆伽马是调和均值。

**7.17** 玻尔悖论（杂记 4.9.3）也会在推断问题中出现。设 $$X_1$$ 与 $$X_2$$ 是 iid $$\mathrm{exponential}(\theta)$$ 随机变量。(a) 若只观测 $$X_2$$，证明 $$\theta$$ 的 MLE 是 $$\hat{\theta} = X_2$$；(b) 设改为只观测 $$Z = (X_2 - 1)/X_1$$。求 $$(X_1, Z)$$ 的联合分布，并对 $$X_1$$ 积分得到似然函数；(c) 设 $$X_2 = 1$$。比较 (a) 与 (b) 中 $$\theta$$ 的 MLE；(d) 贝叶斯分析对玻尔悖论并不免疫。若 $$\pi(\theta)$$ 是 $$\theta$$ 的先验密度，证明在 $$X_2 = 1$$ 处，(a) 与 (b) 的后验分布不同。（由俄亥俄州立大学 L. Mark Berliner 传达。）

**7.18** 设 $$(X_1, Y_1), \ldots, (X_n, Y_n)$$ 是 iid 二元正态随机变量（成对），五个参数都未知。(a) 证明 $$\mu_X, \mu_Y, \sigma_X^2, \sigma_Y^2, \rho$$ 的矩估计量为 $$\tilde{\mu}_X = \bar{x}$$，$$\tilde{\mu}_Y = \bar{y}$$，$$\tilde{\sigma}_X^2 = \frac{1}{n} \sum (x_i - \bar{x})^2$$，$$\tilde{\sigma}_Y^2 = \frac{1}{n} \sum (y_i - \bar{y})^2$$，$$\tilde{\rho} = \frac{1}{n} \sum (x_i - \bar{x})(y_i - \bar{y}) / (\hat{\sigma}_X \hat{\sigma}_Y)$$；(b) 导出未知参数的 MLE 并证明它们与矩估计量相同。（一条路是把联合 pdf 写成条件与边缘之积，即 $$f(x, y \mid \mu_X, \mu_Y, \sigma_X^2, \sigma_Y^2, \rho) = f(y \mid x, \mu_X, \mu_Y, \sigma_X^2, \sigma_Y^2, \rho) \times f(x \mid \mu_X, \sigma_X^2)$$，论证 $$\mu_X$$ 与 $$\sigma_X^2$$ 的 MLE 是 $$\bar{x}$$ 与 $$\frac{1}{n} \sum (x_i - \bar{x})^2$$；然后反过来得到 $$\mu_Y$$ 与 $$\sigma_Y^2$$ 的 MLE；最后处理“部分最大化”的似然函数 $$L(\bar{x}, \bar{y}, \hat{\sigma}_X^2, \hat{\sigma}_Y^2, \rho \mid \textbf{x}, \textbf{y})$$ 求 $$\rho$$ 的 MLE。可以想见这是个难题。）

**7.19** 设随机变量 $$Y_1, \ldots, Y_n$$ 满足

$$
Y_i = \beta\, x_i + \varepsilon_i, \qquad i = 1, \ldots, n,
$$

其中 $$x_1, \ldots, x_n$$ 是固定常数，$$\varepsilon_1, \ldots, \varepsilon_n$$ 是 iid $$n(0, \sigma^2)$$（$$\sigma^2$$ 未知）。(a) 求 $$(\beta, \sigma^2)$$ 的二维充分统计量；(b) 求 $$\beta$$ 的 MLE，并证明它是 $$\beta$$ 的无偏估计量；(c) 求 $$\beta$$ 的 MLE 的分布。

**7.20** 设 $$Y_1, \ldots, Y_n$$ 如习题 7.19 所定义。(a) 证明 $$\sum Y_i / \sum x_i$$ 是 $$\beta$$ 的无偏估计量；(b) 计算 $$\sum Y_i / \sum x_i$$ 的精确方差，并与 MLE 的方差比较。

**7.21** 再设 $$Y_1, \ldots, Y_n$$ 如习题 7.19 所定义。(a) 证明 $$\bigl[ \sum (Y_i / x_i) \bigr] / n$$ 也是 $$\beta$$ 的无偏估计量；(b) 计算 $$\bigl[ \sum (Y_i / x_i) \bigr] / n$$ 的精确方差，并与前两题估计量的方差比较。

**7.22** 本习题证明例 7.2.16 中的断言乃至更多。设 $$X_1, \ldots, X_n$$ 是来自 $$n(\theta, \sigma^2)$$ 总体的随机样本，$$\theta$$ 的先验分布为 $$n(\mu, \tau^2)$$；设 $$\sigma^2$$、$$\mu$$、$$\tau^2$$ 都已知。(a) 求 $$\bar{X}$$ 与 $$\theta$$ 的联合 pdf；(b) 证明 $$\bar{X}$$ 的边缘分布 $$m(\bar{x} \mid \sigma^2, \mu, \tau^2)$$ 是 $$n\bigl( \mu,\ (\sigma^2/n) + \tau^2 \bigr)$$；(c) 证明 $$\theta$$ 的后验分布 $$\pi(\theta \mid \bar{x}, \sigma^2, \mu, \tau^2)$$ 是正态的，均值与方差由 (7.2.10) 给出。

**7.23** 若 $$S^2$$ 是来自正态总体的容量 $$n$$ 样本的样本方差，我们知道 $$(n - 1) S^2 / \sigma^2$$ 服从 $$\chi_{n-1}^2$$ 分布。$$\sigma^2$$ 的共轭先验是逆伽马 pdf $$\mathrm{IG}(\alpha, \beta)$$：

$$
\pi(\sigma^2) = \frac{1}{\Gamma(\alpha)\, \beta^{\alpha}}\, (\sigma^2)^{-(\alpha + 1)}\, e^{-1 / (\beta\, \sigma^2)}, \qquad 0 < \sigma^2 < \infty,
$$

其中 $$\alpha$$ 与 $$\beta$$ 是正常数。证明 $$\sigma^2$$ 的后验分布是 $$\mathrm{IG}\Bigl( \alpha + \frac{n-1}{2},\ \Bigl[ \frac{(n-1)\, S^2}{2} + \frac{1}{\beta} \Bigr]^{-1} \Bigr)$$。求该分布的均值，即 $$\sigma^2$$ 的贝叶斯估计量。

**7.24** 设 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{Poisson}(\lambda)$$，$$\lambda$$ 服从 $$\mathrm{gamma}(\alpha, \beta)$$ 分布（泊松的共轭族）。(a) 求 $$\lambda$$ 的后验分布；(b) 计算后验均值与方差。

**7.25** 我们考察例 7.2.16 与习题 7.22 所考虑的分层（贝叶斯）模型的推广。设观测 $$X_1, \ldots, X_n$$ 满足

$$
X_i \mid \theta_i \sim n(\theta_i, \sigma^2) \quad (i = 1, \ldots, n,\ \text{独立})， \qquad \theta_i \sim n(\mu, \tau^2) \quad (i = 1, \ldots, n,\ \text{独立}).
$$

(a) 证明 $$X_i$$ 的边缘分布是 $$n(\mu, \sigma^2 + \tau^2)$$，且边缘上 $$X_1, \ldots, X_n$$ 是 iid。（经验贝叶斯分析会利用诸 $$X_i$$ 的边缘分布估计先验参数 $$\mu$$ 与 $$\tau^2$$；见杂记 7.5.6。）(b) 一般地证明：若

$$
X_i \mid \theta_i \sim f(x \mid \theta_i) \ (i = 1, \ldots, n,\ \text{独立})， \qquad \theta_i \sim \pi(\theta \mid \tau) \ (i = 1, \ldots, n,\ \text{独立})，
$$

则边缘上 $$X_1, \ldots, X_n$$ 是 iid。

**7.26** 例 7.2.16 中我们看到正态分布是自身的共轭族。但有时共轭先验不能准确反映先验知识，需要寻求其他先验。设 $$X_1, \ldots, X_n$$ 是 iid $$n(\theta, \sigma^2)$$，$$\theta$$ 服从双指数分布，即 $$\pi(\theta) = e^{-\vert \theta\vert /a} / (2a)$$（$$a$$ 已知）。求 $$\theta$$ 的后验分布的均值。

**7.27** 参照例 7.2.17。(a) 证明来自完全数据似然 (7.2.11) 的似然估计量由 (7.2.12) 给出；(b) 证明 (7.2.23) 中 EM 序列的极限满足 (7.2.16)；(c) 原始（不完全数据）似然方程可以直接求解。证明 (7.2.16) 的解为

$$
\hat{\beta} = \frac{\sum_{i=2}^{n} y_i}{\sum_{i=2}^{n} x_i}, \qquad \hat{\tau}_1 = \frac{y_1}{\hat{\beta}}, \qquad \hat{\tau}_j = \frac{x_j + y_j}{\hat{\beta} + 1} \quad (j = 2, 3, \ldots, n),
$$

且它是 (7.2.23) 中 EM 序列的极限。

**7.28** 对表 7.4.2 的数据（改编自 Lange 等 1994）使用习题 7.2.17 的模型。这些是纽约州若干地区的白血病病例数及相应人口。(a) 对表 7.4.2 的数据拟合泊松模型：既对完整数据集，也对“不完全”数据集（假设第一个人口计数 $$x_1 = 3{,}540$$ 缺失）拟合。

*表 7.4.2　 白血病病例计数（原书 Table 7.4.2）*

| 人口 | 3,540 | 3,560 | 3,739 | 2,784 | 2,571 | 2,729 | 3,952 | 993 | 1,908 |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 病例数 | 3 | 4 | 1 | 1 | 3 | 1 | 2 | 0 | 2 |
| 人口 | 948 | 1,172 | 1,047 | 3,138 | 5,485 | 5,554 | 2,943 | 4,969 | 4,828 |
| 病例数 | 0 | 1 | 3 | 5 | 4 | 6 | 2 | 5 | 4 |

(b) 设并非缺一个 $$x$$ 值，而是丢失了一个白血病病例数（设 $$y_1 = 3$$ 缺失）。用 EM 算法求此情形的 MLE，并与 (a) 的答案比较。

**7.29** 例 7.2.17 模型的一个替代如下：观测 $$(Y_i, X_i)$$（$$i = 1, 2, \ldots, n$$），其中 $$Y_i \sim \mathrm{Poisson}(m\, \beta\, \tau_i)$$，$$(X_1, X_2, \ldots, X_n) \sim \mathrm{multinomial}(m;\ \boldsymbol{\tau})$$，$$\boldsymbol{\tau} = (\tau_1, \tau_2, \ldots, \tau_n)$$ 满足 $$\sum_{i=1}^{n} \tau_i = 1$$。也就是说这里假设人口计数是多项分配而非泊松计数。（把 $$m = \sum x_i$$ 视为已知。）(a) 证明 $$\textbf{Y} = (Y_1, Y_2, \ldots, Y_n)$$ 与 $$\textbf{X} = (X_1, X_2, \ldots, X_n)$$ 的联合密度为

$$
f(\textbf{y}, \textbf{x} \mid \beta, \boldsymbol{\tau}) = \prod_{i=1}^{n} \frac{e^{-m \beta \tau_i}\, (m \beta \tau_i)^{y_i}}{y_i!}\, \frac{\tau_i^{x_i}\, m!}{x_i!};
$$

(b) 若观测到完全数据，证明 MLE 由

$$
\hat{\beta} = \frac{\sum_{i=1}^{n} y_i}{\sum_{i=1}^{n} x_i} \qquad\text{与}\qquad \hat{\tau}_j = \frac{x_j + y_j}{\sum_{i=1}^{n} x_i + y_i} \quad (j = 1, 2, \ldots, n)
$$

给出；(c) 设 $$x_1$$ 缺失。利用 $$X_1 \sim \mathrm{binomial}(m, \tau_1)$$ 的事实计算期望的完全数据对数似然，证明 EM 序列为

$$
\hat{\beta}^{(r + 1)} = \frac{\sum_{i=1}^{n} y_i}{m\, \hat{\tau}_1^{(r)} + \sum_{i=2}^{n} x_i} \qquad\text{与}\qquad \hat{\tau}_j^{(r + 1)} = \frac{x_j + y_j}{m\, \hat{\tau}_1^{(r)} + \sum_{i=2}^{n} x_i + \sum_{i=1}^{n} y_i} \quad (j = 1, 2, \ldots, n);
$$

(d) 用该模型求表 7.4.2 数据的 MLE：先假设拥有全部数据，再假设 $$x_1 = 3{,}540$$ 缺失。

**7.30** EM 算法在各种情形都有用，“缺失数据”的定义可以拉伸以适应许多模型。设有混合密度 $$p\, f(x) + (1 - p)\, g(x)$$，$$p$$ 未知。若观测 $$\textbf{X} = (X_1, X_2, \ldots, X_n)$$，样本密度为

$$
\prod_{i=1}^{n} \bigl[ p\, f(x_i) + (1 - p)\, g(x_i) \bigr],
$$

它可能难以处理。（两个成分的混合并不可怕，但考虑混合 $$\sum_{i=1}^{k} p_i\, f_i(x)$$（$$k$$ 大）时似然会是什么样。）EM 的解法是用 $$\textbf{Z} = (Z_1, Z_2, \ldots, Z_n)$$ 增补观测的（不完全）数据，其中 $$Z_i$$ 指出 $$X_i$$ 来自混合的哪个成分：$$X_i \mid z_i = 1 \sim f(x_i)$$，$$X_i \mid z_i = 0 \sim g(x_i)$$，$$P(Z_i = 1) = p$$。(a) 证明 $$(\textbf{X}, \textbf{Z})$$ 的联合密度为 $$\prod_{i=1}^{n} \bigl[ p\, f(x_i) \bigr]^{z_i} \bigl[ (1 - p)\, g(x_i) \bigr]^{1 - z_i}$$；(b) 证明缺失数据分布（给定 $$x_i$$、$$p$$ 时 $$Z_i$$ 的分布）是成功概率为 $$\dfrac{p\, f(x_i)}{p\, f(x_i) + (1 - p)\, g(x_i)}$$ 的伯努利分布；(c) 计算期望的完全数据对数似然，证明 EM 序列为

$$
\hat{p}^{(r + 1)} = \frac{1}{n} \sum_{i=1}^{n} \frac{\hat{p}^{(r)}\, f(x_i)}{\hat{p}^{(r)}\, f(x_i) + \bigl( 1 - \hat{p}^{(r)} \bigr)\, g(x_i)}.
$$

**7.31** 证明定理 7.2.20。(a) 证明：用 (7.2.19) 可写

$$
\log L\bigl( \hat{\theta}^{(r)} \mid \textbf{y} \bigr) = \mathrm{E}\Bigl[ \log L\bigl( \hat{\theta}^{(r)} \mid \textbf{y}, \textbf{X} \bigr) \mid \hat{\theta}^{(r)}, \textbf{y} \Bigr] - \mathrm{E}\Bigl[ \log k\bigl( \textbf{X} \mid \hat{\theta}^{(r)}, \textbf{y} \bigr) \mid \hat{\theta}^{(r)}, \textbf{y} \Bigr],
$$

且由于 $$\hat{\theta}^{(r+1)}$$ 是最大值，$$\mathrm{E}\Bigl[ \log L\bigl( \hat{\theta}^{(r+1)} \mid \textbf{y}, \textbf{X} \bigr) \mid \hat{\theta}^{(r)}, \textbf{y} \Bigr] \geq \mathrm{E}\Bigl[ \log L\bigl( \hat{\theta}^{(r)} \mid \textbf{y}, \textbf{X} \bigr) \mid \hat{\theta}^{(r)}, \textbf{y} \Bigr]$$。不等式何时取等？(b) 现用詹森不等式证明 $$\mathrm{E}\Bigl[ \log k\bigl( \textbf{X} \mid \hat{\theta}^{(r+1)}, \textbf{y} \bigr) \mid \hat{\theta}^{(r)}, \textbf{y} \Bigr] \leq \mathrm{E}\Bigl[ \log k\bigl( \textbf{X} \mid \hat{\theta}^{(r)}, \textbf{y} \bigr) \mid \hat{\theta}^{(r)}, \textbf{y} \Bigr]$$，结合 (a) 便证明了定理。提示：若 $$f$$ 与 $$g$$ 是密度，由于 $$\log$$ 是凹函数，詹森不等式 (4.7.7) 蕴含

$$
\int \log\Bigl( \frac{f(x)}{g(x)} \Bigr)\, g(x)\, dx \leq \log\Bigl( \int \frac{f(x)}{g(x)}\, g(x)\, dx \Bigr) = \log\Bigl( \int f(x)\, dx \Bigr) = 0.
$$

由对数的性质，这进而蕴含 $$\int \bigl[ \log f(x) \bigr]\, g(x)\, dx \leq \int \bigl[ \log g(x) \bigr]\, g(x)\, dx$$。

**7.32** 习题 5.65 的算法可以改造为：只用先验分布的样本（近似地）模拟来自后验分布的样本。设 $$X_1, X_2, \ldots, X_n \sim f(x \mid \theta)$$，$$\theta$$ 有先验分布 $$\pi$$。从 $$\pi$$ 生成 $$\theta_1, \theta_2, \ldots, \theta_m$$，计算 $$q_i = L(\theta_i \mid \textbf{x}) / \sum_j L(\theta_j \mid \textbf{x})$$，其中 $$L(\theta \mid \textbf{x}) = \prod_i f(x_i \mid \theta)$$ 是似然函数。(a) 生成 $$\theta_1^{*}, \theta_2^{*}, \ldots, \theta_r^{*}$$，其中 $$P(\theta^{*} = \theta_i) = q_i$$。证明 $$P(\theta^{*} \leq t)$$ 收敛到 $$\int_{-\infty}^{t} \pi(\theta \mid \textbf{x})\, d\theta$$，即这是来自后验的（近似）样本；(b) 证明估计量 $$\sum_{j=1}^{r} h(\theta_j^{*}) / r$$ 收敛到 $$\mathrm{E}\bigl[ h(\theta) \mid \textbf{x} \bigr]$$（期望对后验分布取）；(c) Ross (1996) 建议 Rao–Blackwell 化可以改进 (b) 中的估计。证明对任意 $$j$$，

$$
\mathrm{E}\Bigl[ h(\theta_j^{*}) \mid \theta_1, \theta_2, \ldots, \theta_m \Bigr] = \frac{\frac{1}{m} \sum_{i=1}^{m} h(\theta_i)\, L(\theta_i \mid \textbf{x})}{\frac{1}{m} \sum_{i=1}^{m} L(\theta_i \mid \textbf{x})}
$$

与 (b) 中估计量有相同的均值和更小的方差。

**7.33** 例 7.3.5 中计算了成功概率的贝叶斯估计量 $$\hat{p}_B$$ 的 MSE（该估计量在例 7.2.14 中导出）。证明选择 $$\alpha = \beta = \sqrt{n}/4$$ 会使 $$\hat{p}_B$$ 的 MSE 为常数。

**7.34** 设 $$X_1, \ldots, X_n$$ 是来自 $$\mathrm{binomial}(n, p)$$ 的随机样本。我们想用例 6.4.1 描述的群求 $$p$$ 的等变点估计量。(a) 求关于该群等变的估计量类；(b) 在例 7.2.14 的贝叶斯估计量类内，找出关于该群等变的估计量；(c) 从 (b) 的等变贝叶斯估计量中找 MSE 最小者。

**7.35** 位置的 Pitman 估计量（见 Lehmann and Casella 1998, Section 3.1 或 Pitman 1939 的原始论文）为

$$
\delta_P(\textbf{X}) = \frac{\displaystyle\int_{-\infty}^{\infty} t\, \prod_{i=1}^{n} f(x_i - t)\, dt}{\displaystyle\int_{-\infty}^{\infty} \prod_{i=1}^{n} f(x_i - t)\, dt},
$$

其中我们观测到来自 $$f(x - \theta)$$ 的随机样本 $$X_1, \ldots, X_n$$。Pitman 证明了该估计量是具有最小均方误差的位置等变估计量（即它最小化 (7.3.3)）。本习题的目标较为有限。(a) 证明 $$\delta_P(\textbf{X})$$ 关于例 7.3.6 的位置群不变；(b) 证明若 $$f(x - \theta)$$ 是 $$n(\theta, 1)$$，则 $$\delta_P(\textbf{X}) = \bar{X}$$；(c) 证明若 $$f(x - \theta)$$ 是 uniform$\bigl( \theta - \tfrac{1}{2},\ \theta + \tfrac{1}{2} \bigr)$$，则 $$\delta_P(\textbf{X}) = \tfrac{1}{2}\bigl( X_{(1)} + X_{(n)} \bigr)$$。
**7.36** 尺度的 Pitman 估计量为
$$
\delta_{P_r}(\textbf{X}) = \frac{\displaystyle\int_0^{\infty} t^{n + r - 1}\, \prod_{i=1}^{n} f(t x_i)\, dt}{\displaystyle\int_0^{\infty} t^{n + 2 r - 1}\, \prod_{i=1}^{n} f(t x_i)\, dt},
$$
其中我们观测到来自 $$\frac{1}{\sigma} f(x/\sigma)$$ 的随机样本 $$X_1, \ldots, X_n$$。Pitman 证明该估计量是 $$\sigma^r$$ 的具有最小尺度化均方误差的尺度等变估计量（即它最小化 $$\mathrm{E} (d - \sigma^r)^2 / \sigma^{2r}$$）。(a) 证明 $$\delta_{P_r}(\textbf{X})$$ 关于尺度群等变，即对任意常数 $$c > 0$$ 满足 $$\delta_{P_r}(c x_1, \ldots, c x_n) = c^{r}\, \delta_{P_r}(x_1, \ldots, x_n)$$；(b) 若 $$X_1, \ldots, X_n$$ 是 iid $$n(0, \sigma^2)$$，求 $$\sigma^2$$ 的 Pitman 尺度等变估计量；(c) 若 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{exponential}(\beta)$$，求 $$\beta$$ 的 Pitman 尺度等变估计量；(d) 若 $$X_1, \ldots, X_n$$ 是 iid uniform$(0, \theta)$$，求 $$\theta$$ 的 Pitman 尺度等变估计量。

**7.37** 设 $$X_1, \ldots, X_n$$ 是来自 pdf

$$
f(x \mid \theta) = \frac{1}{2\theta}, \qquad -\theta < x < \theta, \quad \theta > 0
$$

的总体的随机样本。若存在，求 $$\theta$$ 的最佳无偏估计量。

**7.38** 对下列每个分布，设 $$X_1, \ldots, X_n$$ 是随机样本。是否存在 $$\theta$$ 的函数 $$g(\theta)$$，使得存在方差达到 Cramér–Rao 下界的无偏估计量？若存在，求之；若不存在，说明原因。(a) $$f(x \mid \theta) = \theta\, x^{\theta - 1}$$，$$0 < x < 1$$，$$\theta > 0$$；(b) $$f(x \mid \theta) = \dfrac{\log(\theta)}{\theta^{x - 1}}\, \theta^{x}$$（即 $$\theta\, \theta^{-(x-1)} \theta^{x}$$ 型的对数均匀密度），$$0 < x < 1$$，$$\theta > 1$$。

**7.39** 证明引理 7.3.11。

**7.40** 设 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{Bernoulli}(p)$$。证明 $$\bar{X}$$ 的方差达到 Cramér–Rao 下界，从而 $$\bar{X}$$ 是 $$p$$ 的最佳无偏估计量。

**7.41** 设 $$X_1, \ldots, X_n$$ 是来自均值 $$\mu$$、方差 $$\sigma^2$$ 的总体的随机样本。(a) 证明若 $$\sum_{i=1}^{n} a_i = 1$$，则估计量 $$\sum_{i=1}^{n} a_i\, X_i$$ 是 $$\mu$$ 的无偏估计量；(b) 在所有这种形式的无偏估计量（称为线性无偏估计量）中，求方差最小者并计算其方差。

**7.42** 设 $$W_1, \ldots, W_k$$ 是参数 $$\theta$$ 的无偏估计量，$$\mathrm{Var} W_i = \sigma_i^2$$，且 $$i \neq j$$ 时 $$\mathrm{Cov}(W_i, W_j) = 0$$。(a) 证明在形如 $$\sum a_i\, W_i$$（诸 $$a_i$$ 为常数且 $$\mathrm{E}_{\theta}\bigl( \sum a_i W_i \bigr) = \theta$$）的所有估计量中，估计量

$$
W^{*} = \frac{\sum_i W_i / \sigma_i^2}{\sum_i \bigl( 1 / \sigma_i^2 \bigr)}
$$

方差最小；(b) 证明 $$\mathrm{Var} W^{*} = \Bigl( \sum_i \dfrac{1}{\sigma_i^2} \Bigr)^{-1}$$。

**7.43** 习题 7.42 确立了最优权重为 $$q_i^{*} = \bigl( 1/\sigma_i^2 \bigr) / \bigl( \sum_j 1/\sigma_j^2 \bigr)$$。Tukey 的一个结果（见 Bloch and Moses 1988）指出：若 $$W = \sum_i q_i\, W_i$$ 是基于另一组权重 $$q_i \geq 0$$（$$\sum_i q_i = 1$$）的估计量，则

$$
\frac{\mathrm{Var} W}{\mathrm{Var} W^{*}} \leq \frac{1}{1 - \lambda^2},
$$

其中 $$\lambda$$ 满足 $$\dfrac{1 + \lambda}{1 - \lambda} = \dfrac{b_{\max}}{b_{\min}}$$，而 $$b_{\max}$$ 与 $$b_{\min}$$ 分别是 $$b_i = q_i / q_i^{*}$$ 的最大值与最小值。(a) 证明 Tukey 不等式；(b) 用该不等式评估通常的均值 $$\sum_i W_i / k$$ 作为 $$\sigma_{\max}^2 / \sigma_{\min}^2$$ 的函数的表现。

**7.44** 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\theta, 1)$$。证明 $$\theta^2$$ 的最佳无偏估计量是 $$\bar{X}^2 - \frac{1}{n}$$。计算其方差（用 3.6 节的 Stein 恒等式），并证明它大于 Cramér–Rao 下界。

**7.45** 设 $$X_1, X_2, \ldots, X_n$$ 是来自均值 $$\mu$$、方差 $$\sigma^2$$ 的分布的 iid 样本，$$S^2$$ 是通常的 $$\sigma^2$$ 无偏估计量。例 7.3.4 中我们见到正态性下 MLE 的 MSE 小于 $$S^2$$。本习题进一步探索方差估计。(a) 证明对任何形如 $$a\, S^2$$ 的估计量（$$a$$ 为常数）：

$$
\mathrm{MSE}\bigl( a\, S^2 \bigr) = \mathrm{E}\bigl[ a\, S^2 - \sigma^2 \bigr]^2 = a^2\, \mathrm{Var}(S^2) + (a - 1)^2\, \sigma^4.
$$

(b) 证明

$$
\mathrm{Var}(S^2) = \frac{1}{n}\, \Biggl( \kappa - \frac{n - 3}{n - 1}\, \sigma^4 \Biggr),
$$

其中 $$\kappa = \mathrm{E}\bigl[ X - \mu \bigr]^4$$ 是峰度。（习题 5.8(b) 中可能已经做过。）(c) 证明正态性下峰度为 $$3\sigma^4$$，并确立此时 MSE 最小的形如 $$a\, S^2$$ 的估计量是 $$\frac{n-1}{n+1}\, S^2$$。（引理 3.6.5 或有帮助。）(d) 若不假设正态性，证明 $$\mathrm{MSE}(a\, S^2)$$ 在

$$
a = \frac{n - 1}{(n + 1) + \dfrac{(\kappa - 1)(n - 1)}{n}}
$$

处最小，这无用因为它依赖参数。(e) 证明：(i) 对峰度 $$\kappa > 3$$ 的分布，最优 $$a$$ 满足 $$a < \frac{n-1}{n+1}$$；(ii) 对峰度 $$\kappa < 3$$ 的分布，最优 $$a$$ 满足 $$\frac{n-1}{n+1} < a < 1$$。更多细节见 Searls and Intarapanich (1990)。

**7.46** 设 $$X_1, X_2, X_3$$ 是 uniform$(\theta, 2\theta)$$ 分布（$$\theta > 0$$）的容量为 3 的随机样本。(a) 求 $$\theta$$ 的矩估计量；(b) 求 MLE $$\hat{\theta}$$，并求使 $$\mathrm{E}_{\theta}\bigl( k\, \hat{\theta} \bigr) = \theta$$ 的常数 $$k$$；(c) 两个估计量中哪个可以用充分性改进？如何改进？(d) 基于数据
$$
1.29,\ 0.86,\ 1.33
$$
（酿酒葡萄平均粒径（厘米）的三个观测）求 $$\theta$$ 的矩估计值与 MLE。
**7.47** 设测量圆的半径时产生的误差服从 $$n(0, \sigma^2)$$ 分布。若做了 $$n$$ 次独立测量，求圆面积的无偏估计量。它是最佳无偏的吗？
**7.48** 设 $$X_i$$（$$i = 1, \ldots, n$$）是 iid $$\mathrm{Bernoulli}(p)$$。(a) 证明 $$p$$ 的 MLE 的方差达到 Cramér–Rao 下界；(b) 对 $$n \geq 4$$，证明乘积 $$X_1 X_2 X_3 X_4$$ 是 $$p^4$$ 的无偏估计量，并用这一事实求 $$p^4$$ 的最佳无偏估计量。
**7.49** 设 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{exponential}(\lambda)$$。(a) 仅基于 $$Y = \min\{X_1, \ldots, X_n\}$$ 求 $$\lambda$$ 的无偏估计量；(b) 找一个优于 (a) 中估计量的估计量并证明它更好；(c) 下列数据是航天飞机持续压力环境中使用的 Kevlar/环氧球形压力容器的高应力失效时间（小时）：
$$
50.1,\ 70.1,\ 137.0,\ 166.9,\ 170.5,\ 152.8,\ 80.5,\ 123.5,\ 112.6,\ 148.5,\ 160.0,\ 125.4.
$$
失效时间常用指数分布建模。用 (a) 与 (b) 的估计量估计平均失效时间。
**7.50** 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\theta, \theta^2)$$，$$\theta > 0$$。对该模型，$$\bar{X}$$ 与 $$c\, S$$ 都是 $$\theta$$ 的无偏估计量，其中
$$
c = \frac{\sqrt{n - 1}\, \Gamma\bigl( (n - 1)/2 \bigr)}{\sqrt{2}\, \Gamma(n/2)}.
$$
(a) 证明对任意数 $$a$$，估计量 $$a\, \bar{X} + (1 - a)(c\, S)$$ 是 $$\theta$$ 的无偏估计量；(b) 求产生最小方差估计量的 $$a$$ 值；(c) 证明 $$(\bar{X}, S^2)$$ 是 $$\theta$$ 的充分统计量，但不是完备充分统计量。
**7.51** Gleser and Healy (1976) 详细处理了 $$n(\theta, a\theta^2)$$ 族（$$a$$ 为已知常数）中的估计问题（习题 7.50 是其特例）。这里探索其结果的一小部分。仍设 $$X_1, \ldots, X_n$$ 是 iid $$n(\theta, \theta^2)$$，$$\theta > 0$$；$$\bar{X}$$ 与 $$c\, S$$ 如习题 7.46（应为 7.50）所定义。定义估计量类
$$
\mathcal{T} = \bigl\{ T : T = a_1\, \bar{X} + a_2\, (c\, S) \bigr\},
$$
不假设 $$a_1 + a_2 = 1$$。(a) 求 $$\mathcal{T}$$ 中最小化 $$\mathrm{E}_{\theta}\, (\theta - T)^2$$ 的估计量 $$T^{*}$$；(b) 证明 $$T^{*}$$ 的 MSE 小于习题 7.50(b) 导出的估计量的 MSE；(c) 证明 $$T^{*}_{+} = \max\{0,\ T^{*}\}$$ 的 MSE 小于 $$T^{*}$$ 的 MSE；(d) $$\theta$$ 应归类为位置参数还是尺度参数？解释。
**7.52** 设 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{Poisson}(\lambda)$$，$$\bar{X}$$ 与 $$S^2$$ 分别为样本均值与方差。现在用另一种方式完成例 7.3.8：那里用了 Cramér–Rao 界；现在用完备性。(a) 不用 Cramér–Rao 定理证明 $$\bar{X}$$ 是 $$\lambda$$ 的最佳无偏估计量；(b) 证明相当 remarkable 的恒等式 $$\mathrm{E}\bigl( S^2 \mid \bar{X} \bigr) = \bar{X}$$，并用它显式演示 $$\mathrm{Var} S^2 > \mathrm{Var} \bar{X}$$；(c) 用完备性，能否表述一个一般定理，使 (b) 中的恒等式是其特例？
**7.53** 补足定理 7.3.20 证明中省略的细节。设 $$W$$ 是 $$\tau(\theta)$$ 的无偏估计量，$$U$$ 是零的无偏估计量。证明若对某 $$\theta = \theta_0$$ 有 $$\mathrm{Cov}_{\theta_0}(W, U) \neq 0$$，则 $$W$$ 不可能是 $$\tau(\theta)$$ 的最佳无偏估计量。
**7.54** 对“尼罗河问题”（见习题 6.37）：(a) 证明 $$T$$ 是 $$\theta$$ 的 MLE 且 $$U$$ 辅助，并
$$
\mathrm{E}(T) = \frac{\Gamma(n + \tfrac{1}{2})\, \Gamma(n - \tfrac{1}{2})}{[\Gamma(n)]^2}\, \theta \qquad\text{与}\qquad \mathrm{E}\bigl( T^2 \bigr) = \frac{\Gamma(n + 1)\, \Gamma(n - 1)}{[\Gamma(n)]^2}\, \theta^2;
$$
(b) 设 $$Z_1 = \frac{1}{n - 1} \sum X_i$$，$$Z_2 = \frac{1}{n} \sum Y_i$$。证明两者都无偏，方差分别为 $$\theta^2 / (n - 2)$$ 与 $$\theta^2 / n$$；(c) 求形如 $$a\, Z_1 + (1 - a)\, Z_2$$ 的最佳无偏估计量，计算其方差，并与偏差校正的 MLE 比较。
**7.55** 对下列每个 pdf，设 $$X_1, \ldots, X_n$$ 是来自该分布的样本。每种情形求 $$\theta^r$$ 的最佳无偏估计量。（该问题的完整讨论见 Guenther 1978。）(a) $$f(x \mid \theta) = \dfrac{1}{\theta}$$，$$0 < x < \theta$$，$$r < n$$；(b) $$f(x \mid \theta) = e^{-(x - \theta)}$$，$$x > \theta$$；(c) $$f(x \mid \theta) = \dfrac{e^{-\theta}\, e^{-e^{-(x - \theta)}}}{1 - e^{-e^{-b}}}$$ 型（即 $$e^{-\theta} e^{-e^{-(x-\theta)}} / \bigl( 1 - e^{-e^{-(b - \theta)}} \bigr)$$ 的截断极值密度），$$\theta < x < b$$，$$b$$ 已知。
**7.56** 证明例 7.3.24 之前正文所作的断言：若 $$T$$ 是参数 $$\theta$$ 的完备充分统计量，$$h(X_1, \ldots, X_n)$$ 是 $$\tau(\theta)$$ 的任何无偏估计量，则 $$\phi(T) = \mathrm{E}\bigl( h(X_1, \ldots, X_n) \mid T \bigr)$$ 是 $$\tau(\theta)$$ 的最佳无偏估计量。
**7.57** 设 $$X_1, \ldots, X_{n+1}$$ 是 iid $$\mathrm{Bernoulli}(p)$$，定义函数
$$
h(p) = P\Biggl( \sum_{i=1}^{n} X_i > X_{n+1} \,\Big\vert \, p \Biggr),
$$
即前 $$n$$ 个观测超过第 $$(n + 1)$$ 个的概率。(a) 证明
$$
T(X_1, \ldots, X_{n+1}) = \begin{cases} 1 & \text{若}\ \sum_{i=1}^{n} X_i > X_{n+1},\\ 0 & \text{其他} \end{cases}
$$
是 $$h(p)$$ 的无偏估计量；(b) 求 $$h(p)$$ 的最佳无偏估计量。
**7.58** 设 $$X$$ 是来自 pdf
$$
f(x \mid \theta) = \Bigl( \frac{\theta}{2} \Bigr)^{\vert x\vert } (1 - \theta)^{1 - \vert x\vert }, \qquad x = -1, 0, 1; \quad 0 \leq \theta \leq 1
$$
的一次观测。(a) 求 $$\theta$$ 的 MLE；(b) 定义估计量
$$
T(X) = \begin{cases} 2 & \text{若}\ x = 1,\\ 0 & \text{其他}. \end{cases}
$$
证明 $$T(X)$$ 是 $$\theta$$ 的无偏估计量；(c) 找一个优于 $$T(X)$$ 的估计量并证明它更好。
**7.59** 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\mu, \sigma^2)$$。求 $$\sigma^p$$ 的最佳无偏估计量，其中 $$p$$ 是已知正常数（不必为整数）。
**7.60** 设 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{gamma}(\alpha, \beta)$$（$$\alpha$$ 已知）。求 $$1/\beta$$ 的最佳无偏估计量。
**7.61** 证明：基于观测 $$S^2 \sim \sigma^2 \chi_{\nu}^2 / \nu$$ 估计 $$\sigma^2$$ 的似然函数的对数可以写成
$$
\log L(\sigma^2 \mid s^2) = K_1\, \frac{s^2}{\sigma^2} - K_2 \log \frac{s^2}{\sigma^2} + K_3,
$$
其中 $$K_1, K_2, K_3$$ 是不依赖 $$\sigma^2$$ 的常数。把上述对数似然与例 7.3.27 讨论的损失函数联系起来。这一关系的讨论见 Anderson (1984a)。
**7.62** 设 $$X_1, \ldots, X_n$$ 是来自 $$n(\theta, \sigma^2)$$ 总体（$$\sigma^2$$ 已知）的随机样本。考虑在平方误差损失下估计 $$\theta$$。设 $$\pi(\theta)$$ 是 $$\theta$$ 的 $$n(\mu, \tau^2)$$ 先验分布，$$\delta^{\pi}$$ 为 $$\theta$$ 的贝叶斯估计量。验证风险函数与贝叶斯风险的下列公式：(a) 对任意常数 $$a$$ 与 $$b$$，估计量 $$\delta(\textbf{x}) = a\, \bar{X} + b$$ 的风险函数为
$$
R(\theta, \delta) = a^2\, \frac{\sigma^2}{n} + \bigl( b - (1 - a)\, \theta \bigr)^2;
$$
(b) 令 $$\eta = \sigma^2 / (n \tau^2 + \sigma^2)$$。贝叶斯估计量的风险函数为
$$
R(\theta, \delta^{\pi}) = (1 - \eta)^2\, \frac{\sigma^2}{n} + \eta^2\, (\theta - \mu)^2;
$$
(c) 贝叶斯估计量的贝叶斯风险为
$$
B(\pi, \delta^{\pi}) = \tau^2\, \eta.
$$
**7.63** 设 $$X \sim n(\mu, 1)$$。设 $$\delta^{\pi}$$ 为平方误差损失下 $$\mu$$ 的贝叶斯估计量。计算并绘制 $$\pi(\mu) \sim n(0, 1)$$ 与 $$\pi(\mu) \sim n(0, 10)$$ 时的风险函数 $$R(\mu, \delta^{\pi})$$。评论先验如何影响贝叶斯估计量的风险函数。
**7.64** 设 $$X_1, \ldots, X_n$$ 是独立随机变量，$$X_i$$ 有 cdf $$F(x \mid \theta_i)$$。证明：对 $$i = 1, \ldots, n$$，若 $$\delta_i^{\pi_i}(X_i)$$ 是用损失 $$L(\theta_i, a_i)$$ 与先验 $$\pi_i(\theta_i)$$ 估计 $$\theta_i$$ 的贝叶斯法则，则 $$\boldsymbol{\delta}^{\boldsymbol{\pi}}(\textbf{X}) = \bigl( \delta_1^{\pi_1}(X_1), \ldots, \delta_n^{\pi_n}(X_n) \bigr)$$ 是用损失 $$\sum_{i=1}^{n} L(\theta_i, a_i)$$ 与先验 $$\pi(\boldsymbol{\theta}) = \prod_{i=1}^{n} \pi_i(\theta_i)$$ 估计 $$\boldsymbol{\theta} = (\theta_1, \ldots, \theta_n)$$ 的贝叶斯法则。
**7.65** Zellner (1986) 研究的一种损失函数是 LINEX（线性—指数）损失，一种能平滑处理不对称性的损失函数：
$$
L(\theta, a) = e^{c (a - \theta)} - c\, (a - \theta) - 1,
$$
其中 $$c$$ 是正常数。随常数 $$c$$ 变化，损失函数从非常不对称到几乎对称。(a) 对 $$c = 0.2, 0.5, 1$$，把 $$L(\theta, a)$$ 作为 $$a - \theta$$ 的函数作图；(b) 若 $$X \sim F(x \mid \theta)$$，证明使用先验 $$\pi$$ 的 $$\theta$$ 的贝叶斯估计量由 $$\delta^{\pi}(\textbf{X}) = -\dfrac{1}{c} \log \mathrm{E}\bigl( e^{-c\theta} \mid \textbf{X} \bigr)$$ 给出；(c) 设 $$X_1, \ldots, X_n$$ 是 iid $$n(\theta, \sigma^2)$$（$$\sigma^2$$ 已知），$$\theta$$ 有非正常先验 $$\pi(\theta) = 1$$。证明 LINEX 损失下的贝叶斯估计量为 $$\delta^{B}(\textbf{X}) = \bar{X} - \dfrac{c\, \sigma^2}{2n}$$；(d) 计算 $$\delta^{B}(\textbf{X})$$ 与 $$\bar{X}$$ 在 LINEX 损失下的后验期望损失；(e) 计算 $$\delta^{B}(\textbf{X})$$ 与 $$\bar{X}$$ 在平方误差损失下的后验期望损失。
**7.66** 刀切法（jackknife）是减少估计量偏差的一般技术（Quenouille 1956）。一步刀切估计量定义如下：设 $$X_1, \ldots, X_n$$ 是随机样本，$$T_n = T_n(X_1, \ldots, X_n)$$ 是参数 $$\theta$$ 的某个估计量。为对 $$T_n$$ “刀切”，计算 $$n$$ 个统计量 $$T_n^{(i)}$$（$$i = 1, \ldots, n$$），其中 $$T_n^{(i)}$$ 的计算方式与 $$T_n$$ 相同但使用剔除 $$X_i$$ 后的 $$n - 1$$ 个观测。$$\theta$$ 的刀切估计量记作 $$\mathrm{JK}(T_n)$$：
$$
\mathrm{JK}(T_n) = n\, T_n - \frac{n - 1}{n} \sum_{i=1}^{n} T_n^{(i)}.
$$
（一般 $$\mathrm{JK}(T_n)$$ 的偏差比 $$T_n$$ 小。刀切性质的良好综述见 Miller 1974。）现在具体地：设 $$X_1, \ldots, X_n$$ 是 iid $$\mathrm{Bernoulli}(\theta)$$，目标是估计 $$\theta^2$$。(a) 证明 $$\theta^2$$ 的 MLE $$\bigl( \frac{1}{n} \sum_{i=1}^{n} X_i \bigr)^2$$ 是 $$\theta^2$$ 的有偏估计量；(b) 基于 MLE 导出一步刀切估计量；(c) 证明一步刀切估计量是 $$\theta^2$$ 的无偏估计量。（一般刀切只减少偏差；但在这一特例中它完全消除了偏差。）(d) 该刀切估计量是 $$\theta^2$$ 的最佳无偏估计量吗？若是，证明之；若否，求最佳无偏估计量。
**7.67** 证明定理 10.1.5。
## 7.5 杂记（Miscellanea）
### 7.5.1 矩估计量与 MLE（Moment Estimators and MLEs）
一般地，矩估计量不是充分统计量的函数，因此通过对充分统计量取条件总可以改进它们。但在指数族情形，修改后的矩方法策略与最大似然估计之间可以存在对应。这一对应由 Davidson and Solomon (1974) 详细讨论，他们还讲述了有趣的历史。
设我们有来自指数族 pdf（见定理 5.2.11）的随机样本 $$\textbf{X} = (X_1, \ldots, X_n)$$：
$$
f(x \mid \theta) = h(x)\, c(\theta)\, \exp\Bigl( \sum_{i=1}^{k} w_i(\theta)\, t_i(x) \Bigr),
$$
其中 $$f(x \mid \theta)$$ 的范围独立于 $$\theta$$（注意 $$\theta$$ 可以是向量）。似然函数形如
$$
L(\theta \mid \textbf{x}) = H(\textbf{x})\, \bigl[ c(\theta) \bigr]^{n}\, \exp\Biggl( \sum_{i=1}^{k} w_i(\theta)\, \sum_{j=1}^{n} t_i(x_j) \Biggr),
$$
修改后的矩方法会用 $$\hat{w}_i(\theta)$$ 估计 $$w_i(\theta)$$（$$i = 1, \ldots, k$$），$$\hat{w}_i(\theta)$$ 是 $$k$$ 个方程
$$
\sum_{j=1}^{n} t_i(x_j) = \mathrm{E}_{\theta}\Biggl[ \sum_{j=1}^{n} t_i(X_j) \Biggr], \qquad i = 1, \ldots, k
$$
的解。Davidson and Solomon 推广 Huzurbazar (1949) 的工作，证明估计量 $$\hat{w}_i(\theta)$$ 事实上就是 $$w_i(\theta)$$ 的 MLE。若定义 $$\eta_i = w_i(\theta)$$（$$i = 1, \ldots, k$$），则 $$g(\eta_i)$$ 的 MLE 等于 $$g(\hat{\eta}_i) = g\bigl( \hat{w}_i(\theta) \bigr)$$（对任意一一函数 $$g$$）。上述期望的计算可以用如下事实（Lehmann 1986, Section 2.7）简化：
$$
\mathrm{E}_{\theta}\bigl( t_i(X_j) \bigr) = \frac{\partial}{\partial w_i(\theta)}\, \log\bigl( c(\theta) \bigr), \qquad i = 1, \ldots, k, \quad j = 1, \ldots, n;
$$
$$
\mathrm{Cov}_{\theta}\bigl( t_i(X_j),\, t_{i'}(X_j) \bigr) = \frac{\partial^2}{\partial w_i(\theta)\, \partial w_{i'}(\theta)}\, \log\bigl( c(\theta) \bigr), \qquad i, i' = 1, \ldots, k, \quad j = 1, \ldots, n.
$$
### 7.5.2 无偏的贝叶斯估计（Unbiased Bayes Estimates）
如 7.2.3 节所见，做贝叶斯计算时通常取后验分布的均值为点估计。具体地，若 $$X$$ 有 pdf $$f(x \mid \theta)$$、$$\mathrm{E}_{\theta}(X) = \theta$$，且有先验分布 $$\pi(\theta)$$，则后验均值——$$\theta$$ 的贝叶斯点估计量——为
$$
\mathrm{E}(\theta \mid x) = \int \theta\, \pi(\theta \mid x)\, d\theta.
$$
可以问：$$\mathrm{E}(\theta \mid X)$$ 能是 $$\theta$$ 的无偏估计量吗，即满足方程
$$
\mathrm{E}_{\theta}\bigl[ \mathrm{E}(\theta \mid X) \bigr] = \int \Bigl( \int \theta\, \pi(\theta \mid x)\, d\theta \Bigr) f(x \mid \theta)\, dx = \theta \quad ？
$$
答案是否定的：后验均值绝不是无偏估计量。若它们无偏，对 $$X$$ 与 $$\theta$$ 的联合分布取期望可以写
$$
\begin{aligned}
\mathrm{E}\bigl[ (X - \theta)^2 \bigr] &= \mathrm{E}\bigl[ X^2 - 2 X \theta + \theta^2 \bigr] \qquad （\text{展开平方}）\\
&= \mathrm{E}\Bigl[ \mathrm{E}\bigl( X^2 - 2 X \theta + \theta^2 \mid \theta \bigr) \Bigr] \qquad （\text{迭代期望}）\\
&= \mathrm{E}\Bigl[ \mathrm{E}\bigl( X^2 \mid \theta \bigr) - 2 \theta^2 + \theta^2 \Bigr] \qquad （\mathrm{E}(X \mid \theta) = \mathrm{E}_{\theta}\, X = \theta）\\
&= \mathrm{E}\Bigl[ \mathrm{E}\bigl( X^2 \mid \theta \bigr) - \theta^2 \Bigr] = \mathrm{E}(X^2) - \mathrm{E}(\theta^2) \qquad （\text{期望的性质}），
\end{aligned}
$$
（按这一方式取条件）；而对 $$X$$ 取条件可以类似计算
$$
\begin{aligned}
\mathrm{E}\bigl[ (X - \theta)^2 \bigr] &= \mathrm{E}\Bigl[ \mathrm{E}\bigl[ (X^2 - 2 X \theta + \theta^2) \mid X \bigr] \Bigr]\\
&= \mathrm{E}\Bigl[ X^2 - 2 X^2 + \mathrm{E}(\theta^2 \mid X) \Bigr] \qquad （\mathrm{E}(\theta \mid X) = X，\text{按假设}）\\
&= \mathrm{E}(\theta^2) - \mathrm{E}(X^2).
\end{aligned}
$$
比较两个计算可见：唯一不矛盾的方式是 $$\mathrm{E}(X^2) = \mathrm{E}(\theta^2)$$，而这蕴含 $$\mathrm{E} (X - \theta)^2 = 0$$，故 $$X = \theta$$。这只在 $$P(X = \theta) = 1$$ 时发生——无趣的情形，于是我们论证出了矛盾。故要么 $$\mathrm{E}(X \mid \theta) \neq \theta$$，要么 $$\mathrm{E}(\theta \mid X) \neq X$$，表明后验均值不能是无偏估计量。
注意我们隐含假设了 $$\mathrm{E}(X^2) < \infty$$，但该结果在更一般的条件下也成立。Bickel and Mallows (1988) 对该主题有更彻底的发展；更高层次上，这一联系由 Noorbaloochi and Meeden (1983) 刻画。
### 7.5.3 Lehmann–Scheffé 定理（The Lehmann–Scheffé Theorem）
Lehmann–Scheffé 定理是数理统计的一项重大成就，把充分性、完备性与唯一性联系在一起。正文的展开与 Lehmann–Scheffé 定理多少互补，因此我们从未以经典形式（类似定理 7.3.23）陈述它。事实上，Lehmann–Scheffé 定理包含在定理 7.3.19 与 7.3.23 之中。
**定理 7.5.1（Lehmann–Scheffé 定理）**
基于完备充分统计量的无偏估计量是唯一的。
**证明**　设 $$T$$ 是完备充分统计量，$$\phi(T)$$ 是满足 $$\mathrm{E}_{\theta}\, \phi(T) = \tau(\theta)$$ 的估计量。由定理 7.3.23 知 $$\phi(T)$$ 是 $$\tau(\theta)$$ 的最佳无偏估计量，由定理 7.3.19 知最佳无偏估计量唯一。 ∎
该定理也可以不用定理 7.3.19（原文如此，应为 7.3.3）而只用完备性的推论证明，为定理 7.3.23 提供略微不同的路线。
### 7.5.4 EM 算法的更多内容（More on the EM Algorithm）
EM 算法的根源在二十世纪五十年代的工作（Hartley 1958），但在 Dempster, Laird, and Rubin (1977) 的开创性工作之后才真正在统计学中声名鹊起；该工作详述了算法的底层结构并在广泛的应用中演示了其用法。
EM 算法的一个优点是收敛到不完全数据 MLE 的条件已知，尽管这一话题还附加了些民间传说。Dempster, Laird, and Rubin (1977) 原始的收敛证明有缺陷，但有效的收敛证明后来由 Boyles (1983) 与 Wu (1983) 给出；另见 Finch 等 (1989)。
在我们的展开中我们止步于定理 7.2.20，它保证似然在每次迭代中增加。但这可能不足以断言序列 $$\{ \hat{\theta}^{(r)} \}$$ 收敛到最大似然估计量；这样的保证需要进一步的条件。归功于 Wu (1983) 的下述定理保证收敛到驻点——它可能是局部最大或鞍点。
**定理 7.5.2（EM 序列的收敛）**
若期望的完全数据对数似然 $$\mathrm{E}\bigl[ \log L(\theta \mid \textbf{y}, \textbf{x}) \mid \theta', \textbf{y} \bigr]$$ 关于 $$\theta$$ 与 $$\theta'$$ 都连续，则 EM 序列 $$\{ \hat{\theta}^{(r)} \}$$ 的一切极限点都是 $$L(\theta \mid \textbf{y})$$ 的驻点，且 $$L\bigl( \hat{\theta}^{(r)} \mid \textbf{y} \bigr)$$ 单调收敛到 $$L(\hat{\theta} \mid \textbf{y})$$（某个驻点 $$\hat{\theta}$$）。
在指数族中，因为对数似然对缺失数据是线性的，计算得以简化：可以写
$$
\mathrm{E}\Bigl[ \log L(\theta \mid \textbf{y}, \textbf{x}) \mid \theta', \textbf{y} \Bigr] = \mathrm{E}_{\theta'}\Bigl[ \log\bigl( h(\textbf{y}, \textbf{X})\, e^{\sum \eta_i(\theta)\, T_i - B(\theta)} \bigr) \mid \textbf{y} \Bigr]
= \mathrm{E}_{\theta'}\bigl[ \log h(\textbf{y}, \textbf{X}) \bigr] + \sum \eta_i(\theta)\, \mathrm{E}_{\theta'}\bigl[ T_i \mid \textbf{y} \bigr] - B(\theta).
$$
于是计算完全数据 MLE 只涉及更简单的期望 $$\mathrm{E}_{\theta'}\bigl[ T_i \mid \textbf{y} \bigr]$$。
EM 算法的良好综述由 Little and Rubin (1987)、Tanner (1996) 与 Sheaffer (1997) 提供；另见 Lehmann and Casella (1998, Section 6.4)。McLachlan and Krishnan (1997) 对 EM 有整本专著级的处理。
### 7.5.5 其他似然（Other Likelihoods）
本章我们使用了最大似然法，并看到它不仅提供了寻找估计量的方法，还带来对推断相当有用的大样本理论。
似然有许多修改。一些用于处理多余参数（如轮廓似然）；一些在希望更稳健的设定时使用（如拟似然）；另一些在数据删失时有用（如部分似然）。
还有许多其他变体，它们都能对我们此处描述的朴素似然提供一些改进。进入这一丰富似然世界的入口有 Hinkley (1980) 的综述文章或 Hinkley, Reid, and Snell (1991) 编辑的综述文集。
### 7.5.6 其他贝叶斯分析（Other Bayes Analyses）
**1. 稳健贝叶斯分析**　 贝叶斯法则可能对（主观的）先验分布选择相当敏感，这让许多贝叶斯统计学家担忧。Berger (1984) 的文章引入了稳健贝叶斯分析的想法：这是一类贝叶斯分析，寻找对一族先验分布都有良好性质的估计量。也就是说，我们寻找这样的估计量 $$\delta^{*}$$：其表现稳健，不敏感于先验类中哪个先验 $$\pi$$ 才是正确先验。稳健贝叶斯估计量也可以有好的频率派表现，使其颇具吸引力。该主题的入口有 Berger (1990, 1994) 与 Wasserman (1994) 的综述论文。
**2. 经验贝叶斯分析**　 标准贝叶斯分析中，先验分布通常含有须由实验者指定的参数。例如考虑设定
$$
X \mid \theta \sim n(\theta, 1), \qquad \theta \mid \tau^2 \sim n(0, \tau^2).
$$
贝叶斯实验者会为 $$\tau^2$$ 指定一个先验值，然后做贝叶斯分析。然而 $$X$$ 的边缘分布是 $$n(0, \tau^2 + 1)$$，含有关于 $$\tau$$ 的信息，可用于估计 $$\tau$$。这种从边缘分布估计先验参数的想法正是经验贝叶斯分析的特征。经验贝叶斯方法在构造改进程序方面很有用，如 Morris (1983) 与 Casella and Hwang (1987) 所示；Gianola and Fernando (1986) 成功地把这类方法用于解决实际问题。经验贝叶斯的全面论述见 Carlin and Louis (1996)，较平易的入门见 Casella (1985, 1992)。
**3. 分层贝叶斯分析**　 处理上述设定的另一方式——不给 $$\tau^2$$ 指定先验值——是分层设定，即对 $$\tau^2$$ 指定第二阶段先验。例如可以用
$$
X \mid \theta \sim n(\theta, 1), \qquad \theta \mid \tau^2 \sim n(0, \tau^2), \qquad \tau^2 \sim \mathrm{uniform}(0, \infty) \quad \text{（非正常先验）}.
$$

分层建模（无论贝叶斯与否）是非常有效的工具，通常给出对底层模型相当稳健的答案。其有用性由 Lindley and Smith (1972) 演示，此后其使用与发展相当广泛。Gelfand and Smith (1990) 的开创性论文把分层模型与计算算法联系起来，贝叶斯方法的适用性随之爆发。Lehmann and Casella (1999, Section 4.5) 给出分层贝叶斯理论的入门；Robert and Casella (1999) 涵盖应用及与计算算法的联系。

---
