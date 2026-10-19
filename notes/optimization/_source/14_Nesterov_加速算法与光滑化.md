---
layout: note
kind: note
title: "Nesterov 加速算法与光滑化"
course: optimization
order: "14"
date: 2026-10-19
---

上一讲的近似点梯度法求解复合问题 $$\min\psi(x)=f(x)+h(x)$$，在步长 $$t=L^{-1}$$ 时收敛速度为 $$\mathcal{O}(k^{-1})$$。一个自然的问题是：只用梯度（和邻近算子）信息，能否收敛得更快？Nesterov 在 1983 年，1988 年和 2005 年先后提出了三种加速算法，收敛速度都达到 $$\mathcal{O}(k^{-2})$$，并且这个速度对一阶方法已经不能再改进。本讲先介绍 Beck 和 Teboulle 在 2008 年给出的复合问题版本 FISTA 及其变形，然后介绍另外两类加速算法和应用，再证明收敛速度。最后讨论光滑化技术：对于无法使用邻近算子的不光滑函数，用光滑函数近似后再用加速算法求解，复杂度可以从次梯度方法的 $$\mathcal{O}(\varepsilon^{-2})$$ 改进为 $$\mathcal{O}(\varepsilon^{-1})$$。

本讲沿用上一讲的基本假设：$$f$$ 是凸函数，$$\nabla f$$ 是 $$L$$-Lipschitz 连续的；$$h$$ 是适当闭凸函数，邻近算子容易计算；$$\psi$$ 的最小值 $$\psi^*$$ 有限且在 $$x^*$$ 处取到。

## 14.1 FISTA 算法

### 14.1.1 迭代格式

**FISTA**（Fast Iterative Shrinkage-Thresholding Algorithm）的每步迭代分为两步：先沿前两个迭代点确定的方向外推得到一个新点 $$y^k$$，再在 $$y^k$$ 处做一步近似点梯度迭代（图 14.1）：

$$
y^k=x^{k-1}+\frac{k-2}{k+1}(x^{k-1}-x^{k-2}),\quad x^k=\operatorname{prox}_{t_k h}\left(y^k-t_k\nabla f(y^k)\right),
\tag{14.1}
$$

其中 $$x^{-1}=x^0$$。外推系数 $$\frac{k-2}{k+1}$$ 随 $$k$$ 增大而趋于 1，因此迭代点越来越多地保留上一步的运动趋势。这与上一讲的惯性方法类似，但系数经过了精心选取。每步的计算量与近似点梯度法几乎相同。

![图 14.1](fig/fig14-1.png)

*图 14.1 FISTA 的一步迭代：先沿 $$x^{k-1}-x^{k-2}$$ 外推到 $$y^k$$，再在 $$y^k$$ 处做近似点梯度步*

为了分析和推广，常把 FISTA 写成如下等价形式：

$$
y^k=(1-\gamma_k)x^{k-1}+\gamma_k v^{k-1},\quad x^k=\operatorname{prox}_{t_k h}\left(y^k-t_k\nabla f(y^k)\right),\quad v^k=x^{k-1}+\frac{1}{\gamma_k}(x^k-x^{k-1}),
\tag{14.2}
$$

其中 $$v^0=x^0$$。由 $$v^{k-1}$$ 的定义，$$y^k=x^{k-1}+\gamma_k(v^{k-1}-x^{k-1})=x^{k-1}+\frac{\gamma_k(1-\gamma_{k-1})}{\gamma_{k-1}}(x^{k-1}-x^{k-2})$$；当 $$\gamma_k=\frac{2}{k+1}$$ 时，$$\frac{\gamma_k(1-\gamma_{k-1})}{\gamma_{k-1}}=\frac{k-2}{k+1}$$，两种形式等价。而 $$\gamma_k$$ 取其他值时，(14.2) 给出 FISTA 的其他变形。

**算法 14.1（FISTA）**

**输入：** 初始点 $$x^0$$，令 $$v^0=x^0$$

1. **for** $$k=1,2,\dots$$ **do**
    - 选取 $$\gamma_k\in(0,1]$$ 和步长 $$t_k$$
    - $$y^k\leftarrow(1-\gamma_k)x^{k-1}+\gamma_k v^{k-1}$$
    - $$x^k\leftarrow\operatorname{prox}_{t_k h}\left(y^k-t_k\nabla f(y^k)\right)$$
    - $$v^k\leftarrow x^{k-1}+\gamma_k^{-1}(x^k-x^{k-1})$$
2. **end for**

### 14.1.2 收敛条件与参数选取

第 14.4 节将证明，只要以下三个条件成立，算法 14.1 就具有 $$\mathcal{O}(k^{-2})$$ 的收敛速度：

$$
f(x^k)\le f(y^k)+\langle\nabla f(y^k),x^k-y^k\rangle+\frac{1}{2t_k}\|x^k-y^k\|^2,
\tag{14.3}
$$

$$
\gamma_1=1,\quad\frac{(1-\gamma_k)t_k}{\gamma_k^2}\le\frac{t_{k-1}}{\gamma_{k-1}^2},\ k\ge2,
\tag{14.4}
$$

$$
\frac{\gamma_k^2}{t_k}=\mathcal{O}(k^{-2}).
\tag{14.5}
$$

条件 (14.3) 与上一讲的线搜索准则相同，在 $$t_k\le L^{-1}$$ 时一定成立。取 $$t_k=L^{-1}$$，$$\gamma_k=\frac{2}{k+1}$$，则 $$\frac{1-\gamma_k}{\gamma_k^2}=\frac{(k-1)(k+1)}{4}\le\frac{k^2}{4}=\frac{1}{\gamma_{k-1}^2}$$，三个条件都满足。$$\gamma_k$$ 的取法不唯一，另一个常用的选择是 $$\gamma_1=1$$，

$$
\frac{1}{\gamma_k}=\frac{1}{2}\left(1+\sqrt{1+\frac{4}{\gamma_{k-1}^2}}\right),
$$

它是方程 $$\frac{1-\gamma_k}{\gamma_k^2}=\frac{1}{\gamma_{k-1}^2}$$ 的解，使 (14.4) 在固定步长时取等号，并且可以验证 $$\gamma_k\le\frac{2}{k+1}$$。Beck 和 Teboulle 的原始 FISTA 用的就是这个序列。

### 14.1.3 线搜索

当 $$L$$ 未知时，需要用线搜索保证条件 (14.3)。有两种做法。

**方法一**只调整步长。取 $$\gamma_k=\frac{2}{k+1}$$，在 (14.2) 的第二步中回退：令 $$t_k\leftarrow\rho t_k$$（$$\rho\in(0,1)$$）并重新计算 $$x^k$$，直到 (14.3) 成立。由于 $$t_k\le L^{-1}$$ 时 (14.3) 一定成立，回退必在有限步内终止。为使条件 (14.4) 成立，每次回退从 $$t_{k-1}$$ 开始，于是 $$t_k$$ 单调不增，$$\frac{(1-\gamma_k)t_k}{\gamma_k^2}\le\frac{t_{k-1}}{\gamma_{k-1}^2}$$；又 $$t_k\ge t_{\min}=\min\{\hat t,\rho/L\}$$，条件 (14.5) 也成立。

**方法二**同时调整步长和 $$\gamma_k$$，允许步长增大。对试探步长 $$t_k$$，取 $$\gamma_k$$ 为方程

$$
t_{k-1}\gamma^2=t_k\gamma_{k-1}^2(1-\gamma)
$$

的正根，计算 $$y^k=(1-\gamma_k)x^{k-1}+\gamma_k v^{k-1}$$ 和 $$x^k=\operatorname{prox}_{t_k h}(y^k-t_k\nabla f(y^k))$$；若 (14.3) 不成立则令 $$t_k\leftarrow\rho t_k$$ 并重复。这样 (14.4) 取等号，$$0<\gamma_k\le1$$，并且 $$t_k\ge t_{\min}$$。为了验证 (14.5)，由 $$\sqrt{1-\gamma}\le1-\frac{\gamma}{2}$$，

$$
\frac{\sqrt{t_{k-1}}}{\gamma_{k-1}}=\frac{\sqrt{(1-\gamma_k)t_k}}{\gamma_k}\le\frac{\sqrt{t_k}}{\gamma_k}-\frac{\sqrt{t_k}}{2},
$$

反复使用得 $$\frac{\sqrt{t_k}}{\gamma_k}\ge\sqrt{t_1}+\frac{1}{2}\sum_{i=2}^{k}\sqrt{t_i}\ge\frac{k+1}{2}\sqrt{t_{\min}}$$，所以

$$
\frac{\gamma_k^2}{t_k}\le\frac{4}{t_{\min}(k+1)^2}=\mathcal{O}(k^{-2}).
$$

方法二的代价是 $$y^k$$ 随试探步长变化，每次回退都要重新计算 $$\nabla f(y^k)$$；好处是步长不再单调下降，迭代后期可以取较大的步长，往往收敛更快。

固定步长 $$L^{-1}$$ 依据的是全局的 Lipschitz 常数，因此比较保守；线搜索往往能选取更大的步长，但每步代价更高。实际中需要针对具体问题权衡。

### 14.1.4 下降 FISTA

FISTA 不是下降算法，函数值可能上升（见下面的数值例子）。若希望函数值单调，可以修改 (14.2) 的第二步：记近似点梯度步得到的点为 $$u$$，令

$$
x^k=\begin{cases}u,&\psi(u)\le\psi(x^{k-1}),\\x^{k-1},&\psi(u)>\psi(x^{k-1}),\end{cases}
$$

$$v^k$$ 仍用 $$u$$ 按原公式更新，即 $$v^k=x^{k-1}+\gamma_k^{-1}(u-x^{k-1})$$。由于 $$\gamma_k$$ 和 $$y^k$$ 随 $$k$$ 变化，算法不会一直停留在同一点。步长和 $$\gamma_k$$ 可以用固定值或上面任一种线搜索，收敛速度仍为 $$\mathcal{O}(k^{-2})$$。

## 14.2 其他加速算法

### 14.2.1 第二类 Nesterov 加速算法

$$
z^k=(1-\gamma_k)x^{k-1}+\gamma_k y^{k-1},\quad y^k=\operatorname{prox}_{(t_k/\gamma_k)h}\left(y^{k-1}-\frac{t_k}{\gamma_k}\nabla f(z^k)\right),\quad x^k=(1-\gamma_k)x^{k-1}+\gamma_k y^k.
\tag{14.6}
$$

这里梯度在 $$z^k$$ 处计算，而邻近步从 $$y^{k-1}$$ 出发，步长放大为 $$t_k/\gamma_k$$；新的 $$x^k$$ 是 $$x^{k-1}$$ 与 $$y^k$$ 的凸组合。它与 FISTA 的一个重要区别是：$$x^k$$，$$y^k$$，$$z^k$$ 都是 $$\operatorname{dom}h$$ 中点的凸组合，因而都在 $$\operatorname{dom}h$$ 中；而 FISTA 的外推点 $$y^k$$ 可能落在 $$\operatorname{dom}h$$ 之外（当 $$h$$ 是约束的示性函数时，这意味着在不可行点处计算梯度）。取 $$\gamma_k=\frac{2}{k+1}$$，$$t_k=L^{-1}$$ 时，它同样有 $$\mathcal{O}(k^{-2})$$ 的收敛速度（定理 14.3）。

### 14.2.2 第三类 Nesterov 加速算法

$$
z^k=(1-\gamma_k)x^{k-1}+\gamma_k y^{k-1},\quad y^k=\operatorname{prox}_{\left(t_k\sum_{i=1}^{k}\gamma_i^{-1}\right)h}\left(-t_k\sum_{i=1}^{k}\frac{1}{\gamma_i}\nabla f(z^i)\right),\quad x^k=(1-\gamma_k)x^{k-1}+\gamma_k y^k.
$$

它与第二类算法的区别仅在于 $$y^k$$ 的更新：计算 $$y^k$$ 时用到了全部历史梯度 $$\{\nabla f(z^i)\}_{i=1}^{k}$$ 的加权和，这与对偶平均方法的思想相同。取 $$\gamma_k=\frac{2}{k+1}$$，$$t_k=L^{-1}$$ 时也有 $$\mathcal{O}(k^{-2})$$ 的收敛速度。

### 14.2.3 非凸问题的加速算法

若 $$f$$ 可微且 $$\nabla f$$ 是 $$L$$-Lipschitz 连续的，但不要求凸，$$h$$ 仍是适当闭凸函数，可以使用如下框架：

$$
z^k=\gamma_k y^{k-1}+(1-\gamma_k)x^{k-1},\quad y^k=\operatorname{prox}_{\lambda_k h}\left(y^{k-1}-\lambda_k\nabla f(z^k)\right),\quad x^k=\operatorname{prox}_{t_k h}\left(z^k-t_k\nabla f(z^k)\right).
$$

当 $$\lambda_k$$ 和 $$t_k$$ 取特定值时它等价于第二类 Nesterov 加速算法。非凸情形下一阶算法一般只能保证收敛到稳定点，不能用函数值误差衡量精度，而改用梯度映射 $$G_t(x)$$ 的范数（第 13 讲定义 13.1）。可以证明：若 $$f$$ 是凸函数，它的收敛速度与 FISTA 相同，为 $$\mathcal{O}(k^{-2})$$；若 $$f$$ 非凸，它仍然收敛，并且 $$\min_{i\le k}\left\|G_{t_i}(x^i)\right\|^2=\mathcal{O}(k^{-1})$$。

## 14.3 应用

### 14.3.1 LASSO 问题

对 LASSO 问题 $$\min_x\frac{1}{2}\|Ax-b\|^2+\mu\|x\|_1$$，FISTA (14.1) 的迭代格式为

$$
y^k=x^{k-1}+\frac{k-2}{k+1}(x^{k-1}-x^{k-2}),\quad w^k=y^k-t_kA^\top(Ay^k-b),\quad x^k=\operatorname{sign}(w^k)\max\{|w^k|-t_k\mu,0\}.
$$

与近似点梯度法一样，最后一步把 $$w^k$$ 中绝对值小于 $$t_k\mu$$ 的分量置零，迭代点保持稀疏。第二类 Nesterov 加速算法的迭代格式为

$$
\begin{aligned}
z^k&=(1-\gamma_k)x^{k-1}+\gamma_k y^{k-1}, &\quad w^k&=y^{k-1}-\frac{t_k}{\gamma_k}A^\top(Az^k-b),\\
y^k&=\operatorname{sign}(w^k)\max\left\{|w^k|-\frac{t_k}{\gamma_k}\mu,0\right\}, &\quad x^k&=(1-\gamma_k)x^{k-1}+\gamma_k y^k.
\end{aligned}
$$

第三类算法只需把 $$w^k$$ 换成 $$-t_k\sum_{i=1}^{k}\gamma_i^{-1}A^\top(Az^i-b)$$，阈值换成 $$t_k\mu\sum_{i=1}^{k}\gamma_i^{-1}$$。

图 14.2 在与第 13 讲图 13.1 相同的数据上比较了固定步长 $$t=L^{-1}$$ 的近似点梯度法，FISTA 和第二类 Nesterov 加速算法。两种加速算法都明显快于近似点梯度法，其中 FISTA 收敛得更快一些，但它的函数值不是单调下降的。对比第 13 讲的结果可以看到，BB 步长加非单调线搜索的近似点梯度法在这个例子上甚至可以比固定步长的 FISTA 更快，实际中 FISTA 同样可以结合线搜索和 BB 步长。当 $$\mu$$ 很小时，通常还配合连续化策略：先用较大的 $$\mu$$ 求解，再逐步减小到目标值。

![图 14.2](fig/fig14-2.png)

*图 14.2 固定步长下近似点梯度法与两种加速算法求解 LASSO 问题（数据同图 13.1）*

对第 13 讲的小波模型，加速算法同样只需把梯度换成相应的表达式，邻近步仍是软阈值；加速算法的实现只比近似点梯度法多了一步向量的线性组合。

## 14.4 收敛性分析

### 14.4.1 FISTA 的收敛速度

> **定理 14.1（固定步长 FISTA 的收敛速度）**
>
> 在基本假设下，用 (14.2) 求解复合问题，取 $$t_k=L^{-1}$$，$$\gamma_k=\frac{2}{k+1}$$，则
>
> $$
> \psi(x^k)-\psi^*\le\frac{2L}{(k+1)^2}\|x^0-x^*\|^2.
> $$

**证明．** 第一步建立一个对任意 $$x$$ 成立的不等式。由 $$x^k=\operatorname{prox}_{t_k h}(y^k-t_k\nabla f(y^k))$$ 和定理 12.6，$$y^k-t_k\nabla f(y^k)-x^k\in t_k\partial h(x^k)$$，所以

$$
h(x)\ge h(x^k)+\frac{1}{t_k}\langle y^k-x^k,x-x^k\rangle-\langle\nabla f(y^k),x-x^k\rangle.
$$

由二次上界（即条件 (14.3)）和 $$f$$ 的凸性，

$$
f(x^k)\le f(y^k)+\langle\nabla f(y^k),x^k-y^k\rangle+\frac{1}{2t_k}\|x^k-y^k\|^2,\quad f(y^k)+\langle\nabla f(y^k),x-y^k\rangle\le f(x).
$$

三式结合，含 $$\nabla f(y^k)$$ 的项合并为 $$\langle\nabla f(y^k),x-y^k\rangle$$，得到

$$
\psi(x^k)\le\psi(x)+\frac{1}{t_k}\langle x^k-y^k,x-x^k\rangle+\frac{1}{2t_k}\|x^k-y^k\|^2,\quad\forall x.
\tag{14.7}
$$

第二步，在 (14.7) 中分别取 $$x=x^{k-1}$$ 和 $$x=x^*$$，乘以 $$1-\gamma_k$$ 和 $$\gamma_k$$ 后相加。记 $$u=(1-\gamma_k)x^{k-1}+\gamma_k x^*$$，并利用恒等式 $$2\langle a-b,c-a\rangle+\|a-b\|^2=\|b-c\|^2-\|a-c\|^2$$，得到

$$
\psi(x^k)-\psi^*-(1-\gamma_k)(\psi(x^{k-1})-\psi^*)\le\frac{1}{2t_k}\left(\|y^k-u\|^2-\|x^k-u\|^2\right).
$$

由 (14.2)，$$y^k-u=\gamma_k(v^{k-1}-x^*)$$，$$x^k-u=\gamma_k(v^k-x^*)$$（因为 $$x^k=(1-\gamma_k)x^{k-1}+\gamma_k v^k$$），于是

$$
\psi(x^k)-\psi^*-(1-\gamma_k)(\psi(x^{k-1})-\psi^*)\le\frac{\gamma_k^2}{2t_k}\left(\|v^{k-1}-x^*\|^2-\|v^k-x^*\|^2\right).
\tag{14.8}
$$

第三步，两边乘以 $$\frac{t_k}{\gamma_k^2}$$ 并利用条件 (14.4) 和 $$\psi(x^{k-1})-\psi^*\ge0$$，

$$
\frac{t_k}{\gamma_k^2}\left(\psi(x^k)-\psi^*\right)+\frac{1}{2}\|v^k-x^*\|^2\le\frac{t_{k-1}}{\gamma_{k-1}^2}\left(\psi(x^{k-1})-\psi^*\right)+\frac{1}{2}\|v^{k-1}-x^*\|^2.
$$

左端的量随 $$k$$ 单调不增。对 $$k=1$$，由 $$\gamma_1=1$$ 和 $$v^0=x^0$$，(14.8) 给出 $$t_1(\psi(x^1)-\psi^*)+\frac{1}{2}\|v^1-x^*\|^2\le\frac{1}{2}\|x^0-x^*\|^2$$。所以

$$
\psi(x^k)-\psi^*\le\frac{\gamma_k^2}{2t_k}\|x^0-x^*\|^2,
$$

代入 $$t_k=L^{-1}$$，$$\gamma_k=\frac{2}{k+1}$$ 即得结论。 □

证明的关键是递推式 (14.8) 以及由它得到的单调量 $$\frac{t_k}{\gamma_k^2}(\psi(x^k)-\psi^*)+\frac{1}{2}\|v^k-x^*\|^2$$（称为 Lyapunov 函数或势函数）。这一过程并不需要 $$t_k=L^{-1}$$ 和 $$\gamma_k=\frac{2}{k+1}$$ 这一具体选择，只用到了条件 (14.3) 和 (14.4)；而最后的估计 $$\psi(x^k)-\psi^*\le\frac{\gamma_k^2}{2t_k}\|x^0-x^*\|^2$$ 再结合条件 (14.5) 就给出了 $$\mathcal{O}(k^{-2})$$ 的速度。因此我们得到下面的一般结论。

> **命题 14.2（一般 FISTA 的收敛速度）**
>
> 在基本假设下，若算法 14.1 中的 $$x^k$$，$$y^k$$，$$t_k$$，$$\gamma_k$$ 满足条件 (14.3)–(14.5)，则 $$\psi(x^k)-\psi^*\le Ck^{-2}$$，其中常数 $$C$$ 只与 $$f$$ 和 $$x^0$$ 有关。特别地，采用上述两种线搜索的 FISTA 都具有 $$\mathcal{O}(k^{-2})$$ 的收敛速度。

Nesterov 还证明了一阶方法的复杂度下界，所以 $$\mathcal{O}(k^{-2})$$ 已经是一阶方法所能达到的最好速度。达到精度 $$\varepsilon$$ 所需的迭代次数，梯度法为 $$\mathcal{O}(L/\varepsilon)$$，加速算法为 $$\mathcal{O}(\sqrt{L/\varepsilon})$$。

### 14.4.2 第二类 Nesterov 加速算法的收敛速度

> **定理 14.3（第二类 Nesterov 加速算法的收敛速度）**
>
> 在基本假设下，用 (14.6) 求解复合问题，取 $$\gamma_k=\frac{2}{k+1}$$，$$t_k=L^{-1}$$，则
>
> $$
> \psi(x^k)-\psi^*\le\frac{2L}{(k+1)^2}\|x^0-x^*\|^2,
> $$
>
> 其中 $$y^0=x^0$$。

**证明．** 由 $$y^k$$ 的定义和定理 12.6，$$\gamma_k(y^{k-1}-y^k)-t_k\nabla f(z^k)\in t_k\partial h(y^k)$$，所以对任意 $$x$$，

$$
h(x)\ge h(y^k)+\left\langle\frac{\gamma_k}{t_k}(y^{k-1}-y^k)-\nabla f(z^k),\ x-y^k\right\rangle.
$$

由于 $$x^k=(1-\gamma_k)x^{k-1}+\gamma_k y^k$$，$$h$$ 的凸性给出 $$h(x^k)\le(1-\gamma_k)h(x^{k-1})+\gamma_k h(y^k)$$，结合上式消去 $$h(y^k)$$：

$$
h(x^k)\le(1-\gamma_k)h(x^{k-1})+\gamma_k\left[h(x)-\left\langle\frac{\gamma_k}{t_k}(y^{k-1}-y^k)-\nabla f(z^k),\ x-y^k\right\rangle\right].
\tag{14.9}
$$

另一方面，由二次上界和 $$t_k=L^{-1}$$，并注意 $$x^k-z^k=\gamma_k(y^k-y^{k-1})$$，

$$
f(x^k)\le f(z^k)+\langle\nabla f(z^k),x^k-z^k\rangle+\frac{\gamma_k^2}{2t_k}\|y^k-y^{k-1}\|^2.
$$

把 $$x^k-z^k$$ 写成 $$(1-\gamma_k)(x^{k-1}-z^k)+\gamma_k(y^k-z^k)$$，并用凸性 $$f(z^k)+\langle\nabla f(z^k),x^{k-1}-z^k\rangle\le f(x^{k-1})$$，得

$$
f(x^k)\le(1-\gamma_k)f(x^{k-1})+\gamma_k\left[f(z^k)+\langle\nabla f(z^k),y^k-z^k\rangle\right]+\frac{\gamma_k^2}{2t_k}\|y^k-y^{k-1}\|^2.
\tag{14.10}
$$

将 (14.9) 与 (14.10) 相加，方括号中含 $$\nabla f(z^k)$$ 的项合并为 $$f(z^k)+\langle\nabla f(z^k),x-z^k\rangle\le f(x)$$。取 $$x=x^*$$，并用与定理 14.1 相同的恒等式，得

$$
\psi(x^k)-\psi^*-(1-\gamma_k)(\psi(x^{k-1})-\psi^*)\le\frac{\gamma_k^2}{2t_k}\left(\|y^{k-1}-x^*\|^2-\|y^k-x^*\|^2\right).
$$

这与 (14.8) 形式完全相同（以 $$y^k$$ 代替 $$v^k$$），后面的推导与定理 14.1 相同。 □

与 FISTA 一样，证明只用到了条件 (14.3)–(14.5)（其中 (14.3) 中的 $$y^k$$ 换成 $$z^k$$），因此采用线搜索的第二类 Nesterov 加速算法也有 $$\mathcal{O}(k^{-2})$$ 的收敛速度。

## 14.5 光滑化

### 14.5.1 动机

求 $$\varepsilon$$-次优解时，三类一阶方法的复杂度如下：对 Lipschitz 常数为 $$G$$ 的不光滑函数，次梯度方法需要 $$\mathcal{O}(G^2\varepsilon^{-2})$$ 步；对 $$f+h$$ 型复合函数（$$h$$ 简单），近似点梯度法需要 $$\mathcal{O}(L\varepsilon^{-1})$$ 步，加速算法需要 $$\mathcal{O}(\sqrt{L/\varepsilon})$$步. 对于不能用邻近算子处理的不光滑函数（例如 $$\|Ax-b\|_1$$，其邻近算子没有简单形式），**光滑化**的思路是：用带参数 $$\mu$$ 的可微函数 $$f_\mu$$ 近似 $$f$$，再用（加速）梯度法极小化 $$f_\mu$$。这里存在权衡：$$\mu$$ 越小，近似越精确，但 $$\nabla f_\mu$$ 的 Lipschitz 常数 $$L_\mu$$ 越大，收敛越慢。

> **例 14.4（用 Huber 函数光滑化 $$\ell_1$$ 范数）**
>
> Huber 函数
>
> $$
> \phi_\mu(z)=
> \begin{cases}
> \frac{z^2}{2\mu}, & |z|\le\mu,\\
> |z|-\frac{\mu}{2}, & |z|\ge\mu
> \end{cases}
> $$
>
> 满足 $$\vert z\vert-\frac{\mu}{2}\le\phi_\mu(z)\le\vert z\vert$$ 和 $$0\le\phi''_\mu(z)\le\mu^{-1}$$。用它近似 $$f(x)=\|Ax-b\|_1$$，令 $$f_\mu(x)=\sum_{i=1}^m\phi_\mu(a_i^\top x-b_i)$$，则 $$f(x)-\frac{m\mu}{2}\le f_\mu(x)\le f(x)$$，$$L_\mu=\|A\|_2^2/\mu$$。于是 $$f(x)-f^*\le f_\mu(x)-f_\mu^*+\frac{m\mu}{2}$$。要使 $$f(x)-f^*\le\varepsilon$$，只需以精度 $$\varepsilon_\mu=\varepsilon-\frac{m\mu}{2}$$ 求解光滑问题。取 $$\mu=\frac{\varepsilon}{m}$$，则
>
> $$
> \frac{L_\mu}{\varepsilon_\mu}=\frac{\|A\|_2^2}{\mu(\varepsilon-m\mu/2)}=\frac{2m\|A\|_2^2}{\varepsilon^2},
> $$
>
> 加速梯度法所需的迭代次数为 $$\mathcal{O}(\sqrt{L_\mu/\varepsilon_\mu})=\mathcal{O}(\varepsilon^{-1})$$，优于次梯度方法的 $$\mathcal{O}(\varepsilon^{-2})$$。若用不加速的梯度法，迭代次数为 $$\mathcal{O}(L_\mu/\varepsilon_\mu)=\mathcal{O}(\varepsilon^{-2})$$，没有改进，所以光滑化必须与加速算法配合使用。

### 14.5.2 强凸函数的共轭

光滑化的一般方法基于下面的事实：强凸函数的共轭是光滑的。

> **定理 14.5（强凸函数的共轭）**
>
> 设 $$f$$ 是适当闭凸函数，并且是 $$\mu$$-强凸的。则 $$f^*$$ 在 $$\mathbb{R}^n$$ 上处处可微，
>
> $$
> \nabla f^*(y)=\arg\max_x\left(y^\top x-f(x)\right),
> $$
>
> 并且 $$\nabla f^*$$ 是 $$\mu^{-1}$$-Lipschitz 连续的。

**证明．** 首先说明：若 $$x$$ 是 $$\mu$$-强凸函数 $$g$$ 的极小点，则 $$g(y)\ge g(x)+\frac{\mu}{2}\|y-x\|^2$$ 对一切 $$y$$ 成立。否则存在 $$y$$ 使 $$g(y)-g(x)-\frac{\mu}{2}\|y-x\|^2<0$$，由强凸性，对 $$\theta\in(0,1)$$，

$$
\begin{aligned}
g((1-\theta)x+\theta y)&\le(1-\theta)g(x)+\theta g(y)-\frac{\mu}{2}\theta(1-\theta)\|y-x\|^2\\
&=g(x)+\theta\left(g(y)-g(x)-\frac{\mu}{2}\|y-x\|^2\right)+\frac{\mu}{2}\theta^2\|y-x\|^2,
\end{aligned}
$$

当 $$\theta$$ 充分小时右端小于 $$g(x)$$，与 $$x$$ 是极小点矛盾。

对任意 $$y$$，函数 $$f(x)-y^\top x$$ 是闭的强凸函数，有唯一的极小点 $$x_y$$。由定理 12.3，$$x\in\partial f^*(y)$$ 当且仅当 $$x$$ 达到 $$f^*(y)$$ 定义中的上确界，即 $$\partial f^*(y)=\{x_y\}$$，所以 $$f^*$$ 在 $$y$$ 处可微且 $$\nabla f^*(y)=x_y$$。对 $$u$$，$$v$$，记 $$x_u=\nabla f^*(u)$$，$$x_v=\nabla f^*(v)$$。由上面的事实（分别对 $$f-u^\top x$$ 和 $$f-v^\top x$$），

$$
f(x_v)-u^\top x_v\ge f(x_u)-u^\top x_u+\frac{\mu}{2}\|x_u-x_v\|^2,\quad f(x_u)-v^\top x_u\ge f(x_v)-v^\top x_v+\frac{\mu}{2}\|x_u-x_v\|^2.
$$

两式相加得 $$\mu\|x_u-x_v\|^2\le(x_u-x_v)^\top(u-v)\le\|x_u-x_v\|\|u-v\|$$，即 $$\|x_u-x_v\|\le\mu^{-1}\|u-v\|$$。 □

### 14.5.3 基于共轭的光滑化

设 $$C$$ 是闭凸集。若函数 $$d$$ 在 $$C$$ 上连续，1-强凸，并且 $$\inf_{x\in C}d(x)=0$$，则称 $$d$$ 为 $$C$$ 上（规范化）的**邻近函数**。记 $$x_d=\arg\min_{x\in C}d(x)$$ 为 $$C$$ 的中心，则 $$d(x)\ge\frac{1}{2}\|x-x_d\|^2$$，即 $$d$$ 度量了到中心的距离。常用的邻近函数有 $$d(x)=\frac{1}{2}\|x-u\|^2$$（$$u\in C$$），加权形式 $$\frac{1}{2}\sum_iw_i(x_i-u_i)^2$$（$$w_i\ge1$$），以及单纯形 $$\{x\ge0:\mathbf{1}^\top x=1\}$$ 上的负熵 $$d(x)=\sum_ix_i\log x_i+\log n$$，其中心为 $$\frac{1}{n}\mathbf{1}$$（强凸性关于 $$\ell_1$$ 范数，由 Pinsker 不等式）。

设 $$f$$ 可以表示为

$$
f(x)=\sup_{y\in\operatorname{dom}h}\left((Ax+b)^\top y-h(y)\right)=h^*(Ax+b),
$$

其中 $$h$$ 是闭凸函数，$$\operatorname{dom}h$$ 有界。取 $$\overline{\operatorname{dom}h}$$ 上的邻近函数 $$d$$，定义

$$
f_\mu(x)=\sup_{y\in\operatorname{dom}h}\left((Ax+b)^\top y-h(y)-\mu d(y)\right)=(h+\mu d)^*(Ax+b).
\tag{14.11}
$$

由于 $$h+\mu d$$ 是 $$\mu$$-强凸的，由定理 14.5，$$f_\mu$$ 可微，

$$
\nabla f_\mu(x)=A^\top\arg\max_{y\in\operatorname{dom}h}\left((Ax+b)^\top y-h(y)-\mu d(y)\right),
$$

并且 $$\nabla f_\mu$$ 是 Lipschitz 连续的，常数为 $$L_\mu=\|A\|_2^2/\mu$$。近似精度为

$$
f(x)-\mu D\le f_\mu(x)\le f(x),\quad D=\sup_{y\in\operatorname{dom}h}d(y)<\infty.
$$

上界是因为 $$d\ge0$$；下界是因为 $$f_\mu(x)\ge\sup_{y\in\operatorname{dom}h}\left((Ax+b)^\top y-h(y)-\mu D\right)=f(x)-\mu D$$。

> **命题 14.6（光滑化的复杂度）**
>
> 要求 $$f(x)-f^*\le\varepsilon$$，取 $$\mu=\frac{\varepsilon}{2D}$$，以精度 $$\varepsilon_\mu=\varepsilon-\mu D=\frac{\varepsilon}{2}$$ 求解光滑问题 $$\min f_\mu$$ 即可，此时
>
> $$
> f(x)-f^*\le f_\mu(x)+\mu D-f_\mu^*\le\varepsilon_\mu+\mu D=\varepsilon,\quad \frac{L_\mu}{\varepsilon_\mu}=\frac{4D\|A\|_2^2}{\varepsilon^2},
> $$
>
> 加速梯度法的迭代次数为 $$\mathcal{O}(\sqrt{L_\mu/\varepsilon_\mu})=\mathcal{O}(\|A\|_2\sqrt{D}\,\varepsilon^{-1})$$。

上面的估计用到了 $$f_\mu^*\le f^*$$（由 $$f_\mu\le f$$ 得到）。实际中逐步减小 $$\mu$$（类似连续化策略）往往能进一步提高效率。

### 14.5.4 例子

> **例 14.7（绝对值的三种光滑化）**
>
> 绝对值可以写成 $$\vert x\vert=\sup_{-1\le y\le1}xy=h^*(x)$$，$$h=I_{[-1,1]}$$。取 $$d(y)=\frac{1}{2}y^2$$，得到 Huber 函数
>
> $$
> f_\mu(x)=\sup_{-1\le y\le1}\left(xy-\frac{\mu}{2}y^2\right)=\phi_\mu(x),\quad D=\frac{1}{2}.
> $$
>
> 取 $$d(y)=1-\sqrt{1-y^2}$$（在 $$[-1,1]$$ 上 $$d''\ge1$$），得
>
> $$
> f_\mu(x)=\sup_{-1\le y\le1}\left(xy+\mu\sqrt{1-y^2}-\mu\right)=\sqrt{x^2+\mu^2}-\mu,\quad D=1.
> $$
>
> 绝对值还可以写成 $$\vert x\vert=\sup\{x(y_1-y_2):y\ge0,\ y_1+y_2=1\}$$，即 $$\vert x\vert=h^*(Ax)$$，$$h=I_C$$，$$C$$ 为二维单纯形，$$A=(1,-1)^\top$$。取负熵 $$d(y)=y_1\log y_1+y_2\log y_2+\log2$$，得
>
> $$
> f_\mu(x)=\sup_{y\in C}\left(xy_1-xy_2-\mu d(y)\right)=\mu\log\frac{e^{x/\mu}+e^{-x/\mu}}{2},\quad D=\log2.
> $$
>
> 三种光滑函数都在原点附近把尖角磨圆，在远处与 $$\vert x\vert$$ 的差趋于一个常数（分别为 $$\frac{\mu}{2}$$，$$\mu$$ 和 $$\mu\log2$$）。

**分段线性函数.** $$f(x)=\max_{1\le i\le m}(a_i^\top x+b_i)=\sup\{(Ax+b)^\top y:y\ge0,\ \mathbf{1}^\top y=1\}$$。取单纯形上的负熵 $$d(y)=\sum_iy_i\log y_i+\log m$$，得到 log-sum-exp 函数

$$
f_\mu(x)=\mu\log\sum_{i=1}^me^{(a_i^\top x+b_i)/\mu}-\mu\log m,\quad D=\log m.
$$

**$$\ell_1$$ 范数逼近.** $$f(x)=\|Ax-b\|_1=\sup_{\|y\|_\infty\le1}(Ax-b)^\top y$$。取 $$d(y)=\frac{1}{2}\sum_iw_iy_i^2$$（$$w_i\ge1$$），得到加权的 Huber 近似 $$f_\mu(x)=\sum_i\phi_{\mu w_i}(a_i^\top x-b_i)$$。

**最大特征值.** 对 $$X\in S^n$$，$$\lambda_{\max}(X)=\sup\{\operatorname{tr}(XY):Y\succeq0,\ \operatorname{tr}Y=1\}$$。取矩阵负熵 $$d(Y)=\sum_i\lambda_i(Y)\log\lambda_i(Y)+\log n$$，得

$$
f_\mu(X)=\mu\log\sum_{i=1}^ne^{\lambda_i(X)/\mu}-\mu\log n.
$$

**核范数.** $$\|X\|_*=\sup_{\|Y\|_2\le1}\operatorname{tr}(X^\top Y)$$。取 $$d(Y)=\frac{1}{2}\|Y\|_F^2$$，得 $$f_\mu(X)=\sum_i\phi_\mu(\sigma_i(X))$$，即对奇异值逐个应用 Huber 函数。

**Lagrange 对偶函数.** 对问题 $$\min\{f_0(x):f_i(x)\le0,\ i=1,\dots,m,\ x\in C\}$$，其中 $$f_i$$ 是凸函数，$$C$$ 是有界闭集，对偶函数一般不可微。取 $$C$$ 上的邻近函数 $$d$$，令

$$
g_\mu(\lambda)=\inf_{x\in C}\left(f_0(x)+\sum_{i=1}^m\lambda_if_i(x)+\mu d(x)\right),
$$

它是扰动后的问题 $$\min\{f_0(x)+\mu d(x):f_i(x)\le0,\ x\in C\}$$ 的对偶函数，由于内层问题强凸而可微，于是可以用加速梯度法求解光滑化的对偶问题。

## 本讲小结

Nesterov 加速算法只用梯度和邻近算子信息，就把复合问题的收敛速度从 $$\mathcal{O}(k^{-1})$$ 提高到最优的 $$\mathcal{O}(k^{-2})$$。FISTA 先以系数 $$\frac{k-2}{k+1}$$ 外推，再做近似点梯度步；其等价形式把参数选取归结为三个条件：步长满足 (14.3)，$$\frac{(1-\gamma_k)t_k}{\gamma_k^2}\le\frac{t_{k-1}}{\gamma_{k-1}^2}$$，$$t_k=\mathcal{O}(k^{-2})$$，据此可以设计线搜索和下降 FISTA。第二类 Nesterov 算法的迭代点都在 $$\operatorname{dom}h$$ 中，第三类算法利用全部历史梯度，两者也有 $$\mathcal{O}(k^{-2})$$ 的速度。收敛性证明的核心是递推式 (14.8) 给出的单调势函数。

对无法使用邻近算子的不光滑函数 $$f=h^*(Ax+b)$$，可以用 $$f_\mu=(h+\mu d)^*(Ax+b)$$ 光滑化。由于强凸函数的共轭具有 $$\mu^{-1}$$-Lipschitz 连续的梯度，$$f_\mu$$ 的梯度 Lipschitz 常数为 $$\|A\|_2^2/\mu$$，近似误差不超过 $$\mu D$$；取 $$\mu=\frac{\varepsilon}{2D}$$ 并用加速梯度法求解，复杂度为 $$\mathcal{O}(\varepsilon^{-1})$$，优于次梯度方法的 $$\mathcal{O}(\varepsilon^{-2})$$。
