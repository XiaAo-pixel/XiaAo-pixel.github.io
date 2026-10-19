---
layout: note
kind: note
title: "罚函数法与增广 Lagrange 函数法"
course: optimization
order: "15"
date: 2026-10-19
---

前面几讲的算法主要处理无约束问题，或者约束集合足够简单，投影（邻近算子）容易计算的问题。对一般的约束优化问题

$$
\begin{aligned}
\min_x\ & f(x)\\
\text{s.t.}\ & c_i(x)=0,\ i\in\mathcal{E},\quad c_i(x)\le0,\ i\in\mathcal{I},
\end{aligned}
\tag{15.1}
$$

一种基本的思路是把约束移到目标函数中，转化为一系列无约束子问题。最直接的做法是罚函数法：对违反约束的点施加惩罚。但二次罚函数法需要罚因子趋于无穷，由此带来严重的数值困难。增广 Lagrange 函数法在罚函数中加入乘子项，通过更新乘子逼近最优解，只需要有限的罚因子。本讲沿用第 7 讲的记号：Lagrange 函数为 $$L(x,\lambda)=f(x)+\sum_i\lambda_ic_i(x)$$，KKT 条件中的稳定性条件为 $$\nabla f(x^*)+\sum_i\lambda_i^*\nabla c_i(x^*)=0$$。

## 15.1 二次罚函数法

### 15.1.1 等式约束的二次罚函数

先考虑只有等式约束的问题

$$
\min_x f(x)\quad\text{s.t.}\quad c_i(x)=0,\ i\in\mathcal{E}.
\tag{15.2}
$$

定义**二次罚函数**

$$
P_{\mathcal{E}}(x,\sigma)=f(x)+\frac{\sigma}{2}\sum_{i\in\mathcal{E}}c_i(x)^2,
$$

其中第二项称为罚项，$$\sigma>0$$ 称为罚因子。罚项惩罚不满足约束的点，$$\sigma$$ 越大惩罚越重。由于子问题的极小点一般不满足约束，迭代点列通常位于可行域之外，所以二次罚函数法也称为**外点罚函数法**。

例如对问题 $$\min x+\sqrt{3}y$$ s.t. $$x^2+y^2=1$$，最优解为 $$x^*=(-\frac{1}{2},-\frac{\sqrt{3}}{2})$$，二次罚函数为 $$P_{\mathcal{E}}(x,y,\sigma)=x+\sqrt{3}y+\frac{\sigma}{2}(x^2+y^2-1)^2$$。数值计算表明，$$\sigma=1,2,10$$ 时罚函数的极小点到 $$x^*$$ 的距离分别约为 0.32，0.19，0.047，约束违反度 $$|x^2+y^2-1|$$ 分别约为 0.75，0.42，0.096：要得到精确的解，必须使用很大的罚因子（图 15.1 左）。

罚因子太小时，罚函数甚至可能无下界。例如 $$\min -x^2+2y^2$$ s.t. $$x=1$$ 的最优解为 $$(1,0)$$，但 $$P_{\mathcal{E}}(x,y,\sigma)=-x^2+2y^2+\frac{\sigma}{2}(x-1)^2$$ 在 $$\sigma\le2$$ 时关于 $$x$$ 无下界。因此求解罚函数法的子问题时需要监测发散：一旦发现迭代点发散，就应终止子问题并增大罚因子。

**算法 15.1（二次罚函数法）**

**输入：** 初始点 $$x^0$$，罚因子 $$\sigma_1>0$$，增长系数 $$\rho>1$$

1. 令 $$k\leftarrow1$$
2. **while** 未达到收敛准则 **do**
    - 以 $$x^{k-1}$$ 为初始点，求解 $$x^k=\arg\min_xP_{\mathcal{E}}(x,\sigma_k)$$
    - $$\sigma_{k+1}\leftarrow\rho\sigma_k$$，$$k\leftarrow k+1$$
3. **end while**

$$\rho$$ 的选取需要权衡：$$\sigma_k$$ 增长太快会使子问题难以求解，增长太慢则外层迭代次数多。为保证收敛，子问题的求解误差应趋于零。

### 15.1.2 收敛性与数值困难

> **定理 15.1（二次罚函数法的收敛性）**
>
> 设 $$x^k$$ 是 $$P_{\mathcal{E}}(x,\sigma_k)$$ 的全局极小点，$$\sigma_k$$ 单调递增趋于无穷，则 $$\{x^k\}$$ 的每个聚点都是问题 (15.2) 的全局极小点。

**证明．** 设 $$\bar x$$ 是 (15.2) 的全局极小点。由 $$P_{\mathcal{E}}(x^k,\sigma_k)\le P_{\mathcal{E}}(\bar x,\sigma_k)$$ 和 $$c(\bar x)=0$$，

$$
f(x^k)+\frac{\sigma_k}{2}\sum_{i\in\mathcal{E}}c_i(x^k)^2\le f(\bar x),\quad\text{从而}\quad\sum_{i\in\mathcal{E}}c_i(x^k)^2\le\frac{2}{\sigma_k}\left(f(\bar x)-f(x^k)\right).
\tag{15.3}
$$

设 $$x^*$$ 是聚点，不妨设 $$x^k\to x^*$$。令 $$k\to\infty$$，右端趋于零（因为 $$f(x^k)\to f(x^*)$$ 有界），所以 $$c(x^*)=0$$，$$x^*$$ 可行。又由 (15.3)，$$f(x^k)\le f(\bar x)$$，取极限得 $$f(x^*)\le f(\bar x)$$，故 $$x^*$$ 是全局极小点。 □

罚因子为什么必须趋于无穷？比较原问题的 KKT 条件与罚函数极小点的稳定性条件：

$$
\nabla f(x^*)+\sum_i\lambda_i^*\nabla c_i(x^*)=0\quad\text{与}\quad\nabla f(x)+\sum_i\sigma c_i(x)\nabla c_i(x)=0.
$$

若两者收敛到同一点，应有

$$
\sigma c_i(x)\approx\lambda_i^*,\quad\text{即}\quad c_i(x)\approx\frac{\lambda_i^*}{\sigma}.
$$

乘子 $$\lambda^*$$ 是固定的，所以约束违反度与 $$\sigma^{-1}$$ 同阶，只有 $$\sigma\to\infty$$ 才能得到可行解。而罚函数的 Hessian

$$
\nabla_{xx}^2P_{\mathcal{E}}(x,\sigma)=\nabla^2f(x)+\sum_i\sigma c_i(x)\nabla^2c_i(x)+\sigma\nabla c(x)\nabla c(x)^\top\approx\nabla_{xx}^2L(x,\lambda^*)+\sigma\nabla c(x)\nabla c(x)^\top,
$$

其中 $$\nabla c(x)=[\nabla c_i(x)]_{i\in\mathcal{E}}\in\mathbb{R}^{n\times|\mathcal{E}|}$$。右端是一个固定矩阵加上一个最大特征值趋于无穷的矩阵，所以条件数趋于无穷。用梯度类算法求解子问题会越来越慢，用牛顿法时牛顿方程本身也越来越病态。因此实际中不可能让罚因子趋于无穷，这是二次罚函数法的根本缺陷。

### 15.1.3 不等式约束与一般约束

对不等式约束 $$c_i(x)\le0$$，$$i\in\mathcal{I}$$，只惩罚违反约束的部分：

$$
P_{\mathcal{I}}(x,\sigma)=f(x)+\frac{\sigma}{2}\sum_{i\in\mathcal{I}}\tilde{c}_i(x)^2,\quad\tilde{c}_i(x)=\max\{c_i(x),0\}.
$$

由于 $$t\mapsto(\max\{t,0\})^2$$ 连续可微，当 $$f$$，$$c_i$$ 可微时 $$P_{\mathcal{I}}$$ 也可微（但一般不二阶可微），可以用梯度类算法或半光滑牛顿法求解。对一般约束问题 (15.1)，二次罚函数为

$$
P(x,\sigma)=f(x)+\frac{\sigma}{2}\left[\sum_{i\in\mathcal{E}}c_i(x)^2+\sum_{i\in\mathcal{I}}\tilde{c}_i(x)^2\right].
$$

## 15.2 等式约束的增广 Lagrange 函数法

### 15.2.1 算法的构造

> **定义 15.2（增广 Lagrange 函数）**
>
> 对等式约束问题 (15.2)，定义增广 Lagrange 函数
>
> $$
> L_\sigma(x,\lambda)=f(x)+\sum_{i\in\mathcal{E}}\lambda_ic_i(x)+\frac{\sigma}{2}\sum_{i\in\mathcal{E}}c_i(x)^2,
> $$
>
> 即在 Lagrange 函数上加二次罚项，或者说在二次罚函数上加乘子项。

在第 $$k$$ 步，给定 $$\sigma_k$$ 和 $$\lambda^k$$，极小化 $$L_{\sigma_k}(x,\lambda^k)$$ 得到 $$x^{k+1}$$，它满足

$$
\nabla_xL_{\sigma_k}(x^{k+1},\lambda^k)=\nabla f(x^{k+1})+\sum_{i\in\mathcal{E}}\left(\lambda_i^k+\sigma_kc_i(x^{k+1})\right)\nabla c_i(x^{k+1})=0.
$$

与 KKT 条件 $$\nabla f(x^*)+\sum_i\lambda_i^*\nabla c_i(x^*)=0$$ 对比，应有 $$\lambda_i^*\approx\lambda_i^k+\sigma_kc_i(x^{k+1})$$，即

$$
c_i(x^{k+1})\approx\frac{\lambda_i^*-\lambda_i^k}{\sigma_k}.
$$

这个关系揭示了增广 Lagrange 函数法的机制：约束违反度不再与 $$\sigma_k^{-1}$$ 同阶，而是与 $$\sigma_k^{-1}(\lambda^*-\lambda^k)$$ 同阶。只要乘子 $$\lambda^k$$ 足够接近 $$\lambda^*$$，即使 $$\sigma_k$$ 有限，约束违反度也可以很小。上面的近似关系本身也给出了乘子的更新方式

$$
\lambda^{k+1}=\lambda^k+\sigma_kc(x^{k+1}).
\tag{15.4}
$$

**增广 Lagrange 函数法**（Augmented Lagrangian Method, ALM）也称为乘子法，其算法如下。

**算法 15.2（增广 Lagrange 函数法（等式约束））**

**输入：** 初始点 $$x^0$$，乘子 $$\lambda^0$$，罚因子 $$\sigma_0>0$$，增长系数 $$\rho>1$$，约束违反度容限 $$\varepsilon>0$$，子问题精度 $$\eta_k>0$$

1. **for** $$k=0,1,2,\dots$$ **do**
    - 以 $$x^k$$ 为初始点近似求解 $$\min_xL_{\sigma_k}(x,\lambda^k)$$，得到满足 $$\|\nabla_xL_{\sigma_k}(x^{k+1},\lambda^k)\|\le\eta_k$$ 的 $$x^{k+1}$$
    - **if** $$\|c(x^{k+1})\|\le\varepsilon$$ **then**
        - **return** $$(x^{k+1},\lambda^k)$$
    - **end if**
    - $$\lambda^{k+1}\leftarrow\lambda^k+\sigma_kc(x^{k+1})$$，$$\sigma_{k+1}\leftarrow\rho\sigma_k$$
2. **end for**

罚因子同样不宜增长太快，否则子问题病态，而且相邻两步的子问题差别太大，上一步的解不再是好的初始点；也不宜增长太慢，否则整体收敛变慢。一个简单的做法是取 $$\rho\in[2,10]$$，也可以根据约束违反度自适应地调整（见第 15.3 节）。

继续上面的例子 $$\min x+\sqrt{3}y$$ s.t. $$x^2+y^2=1$$，其 KKT 乘子为 $$\lambda^*=1$$。取 $$\sigma=2$$，$$\lambda=0.9$$，增广 Lagrange 函数 $$L_2(x,y,0.9)$$ 的极小点为 $$(-0.5100,-0.8833)$$，到 $$x^*$$ 的距离约为 0.020，约束违反度约为 0.040；而同样 $$\sigma=2$$ 的二次罚函数的极小点到 $$x^*$$ 的距离约为 0.19，约束违反度约为 0.42（图 15.1）。若固定 $$\sigma=2$$ 运行算法 15.2，约束违反度每步大约缩小为原来的 $$\frac{1}{5}$$，罚因子无需增大。

### 15.2.2 收敛性

在一定条件下，增广 Lagrange 函数（取 $$\lambda=\lambda^*$$ 时）是精确罚函数，即罚因子有限时，原问题的极小点就是它的极小点。

![图 15.1](fig/fig15-1.png)

*图 15.1 二次罚函数与增广 Lagrange 函数的等高线：虚线为约束 $$x^2+y^2=1$$，$$\ast$$ 为原问题的最优解，$$\circ$$ 为罚函数（或增广 Lagrange 函数）的极小点*

> **定理 15.3（增广 Lagrange 函数的精确性）**
>
> 设 $$x^*$$ 是问题 (15.2) 的局部极小点，$$\lambda^*$$ 为相应的乘子，并且 $$x^*$$ 处 LICQ 和二阶充分条件成立。则存在有限的 $$\bar\sigma$$，使得对任意 $$\sigma\ge\bar\sigma$$，$$x^*$$ 是 $$L_\sigma(x,\lambda^*)$$ 的严格局部极小点。反之，若 $$x^*$$ 是 $$L_\sigma(x,\lambda^*)$$ 的局部极小点且 $$c(x^*)=0$$，则 $$x^*$$ 是问题 (15.2) 的局部极小点。

**证明．** 由 KKT 条件和二阶充分条件（第 7 讲定理 7.17，等式约束时临界锥为 $$\{u:\nabla c(x^*)^\top u=0\}$$），

$$
\nabla_xL(x^*,\lambda^*)=0,\quad u^\top\nabla_{xx}^2L(x^*,\lambda^*)u>0,\ \forall u\ne0,\ \nabla c(x^*)^\top u=0.
\tag{15.5}
$$

由 $$c(x^*)=0$$，$$\nabla_xL_\sigma(x^*,\lambda^*)=\nabla_xL(x^*,\lambda^*)=0$$，并且

$$
\nabla_{xx}^2L_\sigma(x^*,\lambda^*)=\nabla_{xx}^2L(x^*,\lambda^*)+\sigma\nabla c(x^*)\nabla c(x^*)^\top.
$$

只需证明 $$\sigma$$ 充分大时它正定。反设不然，则存在 $$\sigma_k\to\infty$$ 和单位向量 $$u_k$$ 使

$$
u_k^\top\nabla_{xx}^2L(x^*,\lambda^*)u_k+\sigma_k\|\nabla c(x^*)^\top u_k\|^2\le0,\quad\text{从而}\quad\|\nabla c(x^*)^\top u_k\|^2\le-\frac{1}{\sigma_k}u_k^\top\nabla_{xx}^2L(x^*,\lambda^*)u_k\to0.
$$

取 $$\{u_k\}$$ 的聚点 $$u$$，则 $$\|u\|=1$$，$$\nabla c(x^*)^\top u=0$$，$$u^\top\nabla_{xx}^2L(x^*,\lambda^*)u\le0$$，与 (15.5) 矛盾。反之，若 $$c(x^*)=0$$ 且 $$x^*$$ 是 $$L_\sigma(x,\lambda^*)$$ 的局部极小点，则对 $$x^*$$ 附近的任意可行点 $$x$$，$$f(x^*)=L_\sigma(x^*,\lambda^*)\le L_\sigma(x,\lambda^*)=f(x)$$。 □

这个定理说明，二次罚函数法中必须让 $$\sigma\to\infty$$ 的困难，在增广 Lagrange 函数法中可以通过 $$\lambda\to\lambda^*$$ 来克服。下面的定理给出算法的收敛性。

> **定理 15.4（增广 Lagrange 函数法的收敛性）**
>
> 设算法 15.2 中乘子列 $$\{\lambda^k\}$$ 有界，$$\sigma_k\to+\infty$$，子问题精度 $$\eta_k\to0$$，迭代点列的子列 $$\{x^{k_j+1}\}$$ 收敛到 $$x^*$$，并且 $$x^*$$ 处 LICQ 成立。则存在 $$\lambda^*$$，使得
>
> $$
> \lambda^{k_j+1}\to\lambda^*,\quad\nabla f(x^*)+\nabla c(x^*)\lambda^*=0,\quad c(x^*)=0.
> $$

**证明．** 由乘子更新公式，

$$
\nabla_xL_{\sigma_k}(x^{k+1},\lambda^k)=\nabla f(x^{k+1})+\nabla c(x^{k+1})\left(\lambda^k+\sigma_kc(x^{k+1})\right)=\nabla f(x^{k+1})+\nabla c(x^{k+1})\lambda^{k+1}.
$$

由于 $$x^*$$ 处 LICQ 成立，当 $$x^{k_j+1}$$ 充分接近 $$x^*$$ 时 $$\nabla c(x^{k_j+1})$$ 列满秩，于是

$$
\lambda^{k_j+1}=\left(\nabla c(x^{k_j+1})^\top\nabla c(x^{k_j+1})\right)^{-1}\nabla c(x^{k_j+1})^\top\left(\nabla_xL_{\sigma_{k_j}}(x^{k_j+1},\lambda^{k_j})-\nabla f(x^{k_j+1})\right).
$$

由 $$\|\nabla_xL_{\sigma_{k_j}}(x^{k_j+1},\lambda^{k_j})\|\le\eta_{k_j}\to0$$ 得

$$
\lambda^{k_j+1}\to\lambda^*=-\left(\nabla c(x^*)^\top\nabla c(x^*)\right)^{-1}\nabla c(x^*)^\top\nabla f(x^*),
$$

并且对上式取极限得 $$\nabla f(x^*)+\nabla c(x^*)\lambda^*=0$$。最后，$$\sigma_{k_j}c(x^{k_j+1})=\lambda^{k_j+1}-\lambda^{k_j}$$ 有界（两个乘子序列都有界），而 $$\sigma_{k_j}\to\infty$$，所以 $$c(x^*)=0$$。 □

收敛性的条件还可以放宽。设 $$(x^*,\lambda^*)$$ 是严格局部极小点与相应的乘子（满足 LICQ 和二阶充分条件），则存在充分大的 $$\bar\sigma$$ 和充分小的 $$\delta>0$$，使得只要某一步满足 $$\sigma_k\ge\bar\sigma$$ 且 $$\sigma_{k-1}\|\lambda^k-\lambda^*\|<\delta$$（子问题在 $$x^*$$ 附近求极小），就有 $$\lambda^k\to\lambda^*$$，$$x^k\to x^*$$。并且当 $$\limsup\sigma_k<+\infty$$ 时 $$\lambda^k$$ Q-线性收敛，当 $$\sigma_k\to+\infty$$ 时 Q-超线性收敛。

## 15.3 一般约束的增广 Lagrange 函数法

### 15.3.1 松弛变量与消元

对一般约束问题 (15.1)，引入松弛变量 $$s_i\ge0$$，把不等式约束化为等式约束：

$$
\begin{aligned}
\min_{x,s}\ & f(x)\\
\text{s.t.}\ & c_i(x)=0,\ i\in\mathcal{E},\quad c_i(x)+s_i=0,\ s_i\ge0,\ i\in\mathcal{I}.
\end{aligned}
$$

保留非负约束 $$s\ge0$$，只对等式约束构造增广 Lagrange 函数

$$
L_\sigma(x,s,\lambda,\mu)=f(x)+\sum_{i\in\mathcal{E}}\lambda_ic_i(x)+\sum_{i\in\mathcal{I}}\mu_i(c_i(x)+s_i)+\frac{\sigma}{2}\left[\sum_{i\in\mathcal{E}}c_i(x)^2+\sum_{i\in\mathcal{I}}(c_i(x)+s_i)^2\right],\quad s\ge0.
$$

第 $$k$$ 步需要求解 $$\min_{x,\ s\ge0}L_{\sigma_k}(x,s,\lambda^k,\mu^k)$$。固定 $$x$$ 时，关于 $$s$$ 的问题是可分的一元二次规划，$$\min_{s_i\ge0}\mu_i(c_i+s_i)+\frac{\sigma}{2}(c_i+s_i)^2$$，其解为

$$
s_i=\max\left\{-\frac{\mu_i}{\sigma}-c_i(x),0\right\},\quad i\in\mathcal{I}.
\tag{15.6}
$$

代回并配方，利用 $$\mu_i(c_i+s_i)+\frac{\sigma}{2}(c_i+s_i)^2=\frac{\sigma}{2}\left[(c_i+s_i+\frac{\mu_i}{\sigma})^2-\frac{\mu_i^2}{\sigma^2}\right]$$ 和 $$c_i+s_i+\frac{\mu_i}{\sigma}=\max\{c_i+\frac{\mu_i}{\sigma},0\}$$，得到只关于 $$x$$ 的函数

$$
L_\sigma(x,\lambda,\mu)=f(x)+\sum_{i\in\mathcal{E}}\lambda_ic_i(x)+\frac{\sigma}{2}\sum_{i\in\mathcal{E}}c_i(x)^2+\frac{\sigma}{2}\sum_{i\in\mathcal{I}}\left[\max\left\{\frac{\mu_i}{\sigma}+c_i(x),0\right\}^2-\frac{\mu_i^2}{\sigma^2}\right].
$$

它关于 $$x$$ 连续可微（当 $$f$$，$$c_i$$ 连续可微时），子问题化为无约束的 $$\min_xL_{\sigma_k}(x,\lambda^k,\mu^k)$$，可以用梯度类方法求解。

### 15.3.2 乘子更新与算法

比较原问题的 KKT 条件与子问题的最优性条件

$$
0=\nabla f(x^{k+1})+\sum_{i\in\mathcal{E}}\left(\lambda_i^k+\sigma_kc_i(x^{k+1})\right)\nabla c_i(x^{k+1})+\sum_{i\in\mathcal{I}}\left(\mu_i^k+\sigma_k(c_i(x^{k+1})+s_i^{k+1})\right)\nabla c_i(x^{k+1}),
$$

并由 (15.6) 得 $$\mu_i^k+\sigma_k(c_i+s_i^{k+1})=\max\{\mu_i^k+\sigma_kc_i(x^{k+1}),0\}$$，所以乘子的更新格式为

$$
\lambda_i^{k+1}=\lambda_i^k+\sigma_kc_i(x^{k+1}),\ i\in\mathcal{E},\qquad \mu_i^{k+1}=\max\{\mu_i^k+\sigma_kc_i(x^{k+1}),0\},\ i\in\mathcal{I}.
\tag{15.7}
$$

不等式约束的乘子自动保持非负。约束违反度定义为

$$
v_k(x^{k+1})=\sqrt{\sum_{i\in\mathcal{E}}c_i(x^{k+1})^2+\sum_{i\in\mathcal{I}}\left(\max\left\{c_i(x^{k+1}),-\frac{\mu_i^k}{\sigma_k}\right\}\right)^2},
$$

其中第二项就是 $$c_i+s_i^{k+1}$$。若约束违反度满足当前的精度要求，说明乘子估计较好，就更新乘子并提高子问题精度，罚因子不变；否则不更新乘子，而是增大罚因子以降低约束违反度。

**算法 15.3（一般约束的增广 Lagrange 函数法）**

**输入：** $$x^0$$，$$\lambda^0$$，$$\mu^0\ge0$$，$$\sigma_0>0$$，容限 $$\varepsilon,\eta>0$$，常数 $$0<\alpha\le\beta\le1$$，$$\rho>1$$；令 $$\eta_0=\sigma_0^{-1}$$，$$\varepsilon_0=\sigma_0^{-\alpha}$$

1. **for** $$k=0,1,2,\dots$$ **do**
    - 以 $$x^k$$ 为初始点求解 $$\min_x L_{\sigma_k}(x,\lambda^k,\mu^k)$$，得到满足 $$\|\nabla_xL_{\sigma_k}(x^{k+1},\lambda^k,\mu^k)\|\le\eta_k$$ 的 $$x^{k+1}$$
    - **if** $$v_k(x^{k+1})\le\varepsilon_k$$ **then**
        - **if** $$v_k(x^{k+1})\le\varepsilon$$ 且 $$\|\nabla_xL_{\sigma_k}(x^{k+1},\lambda^k,\mu^k)\|\le\eta$$ **then**
            - **return** $$(x^{k+1},\lambda^k,\mu^k)$$
        - **end if**
        - 按 (15.7) 更新乘子，$$\sigma_{k+1}\leftarrow\sigma_k$$
        - $$\eta_{k+1}\leftarrow\eta_k/\sigma_{k+1}$$，$$\varepsilon_{k+1}\leftarrow\varepsilon_k/\sigma_{k+1}^{\beta}$$
    - **else**
        - 乘子不变，$$\sigma_{k+1}\leftarrow\rho\sigma_k$$
        - $$\eta_{k+1}\leftarrow\sigma_{k+1}^{-1}$$，$$\varepsilon_{k+1}\leftarrow\sigma_{k+1}^{-\alpha}$$
    - **end if**
2. **end for**

## 15.4 凸问题的增广 Lagrange 函数法

考虑凸优化问题

$$
\min_{x\in\mathbb{R}^n}\ f(x)\quad\text{s.t.}\quad c_i(x)\le0,\ i=1,\dots,m,
\tag{15.8}
$$

其中 $$f$$，$$c_i$$ 是凸函数。由上一节，其增广 Lagrange 函数为

$$
L_\sigma(x,\lambda)=f(x)+\frac{\sigma}{2}\sum_{i=1}^m\left[\max\left\{\frac{\lambda_i}{\sigma}+c_i(x),0\right\}^2-\frac{\lambda_i^2}{\sigma^2}\right].
$$

给定单调递增的 $$\sigma_k\uparrow\sigma_\infty\le+\infty$$ 和初始乘子 $$\lambda^0\ge0$$，增广 Lagrange 函数法为

$$
x^{k+1}\approx\arg\min_{x\in\mathbb{R}^n}L_{\sigma_k}(x,\lambda^k),\qquad \lambda^{k+1}=\max\{0,\lambda^k+\sigma_kc(x^{k+1})\}.
\tag{15.9}
$$

子问题 $$\phi_k(x)=L_{\sigma_k}(x,\lambda^k)$$ 是凸函数 (单调递增凸函数 $$t\mapsto\max\{t,0\}^2$$ 与凸函数的复合)，但其极小点一般没有显式表达式，需要迭代求解。为保证收敛，近似解应满足不精确条件，例如

$$
\phi_k(x^{k+1})-\inf\phi_k\le\frac{\varepsilon_k^2}{2\sigma_k},\quad \varepsilon_k\ge0,\quad \sum_{k=1}^{\infty}\varepsilon_k<+\infty.
\tag{15.10}
$$

由于 $$\inf\phi_k$$ 未知，这一条件无法直接验证。但若 $$\phi_k$$ 是 $$\alpha$$-强凸的，则 $$\phi_k(x)-\inf\phi_k\le\frac{1}{2\alpha}\operatorname{dist}^2(0,\partial\phi_k(x))$$ (由强凸性 $$\phi_k(y)\ge\phi_k(x)+g^\top(y-x)+\frac{\alpha}{2}\|y-x\|^2$$ 对 $$y$$ 取下确界即得)，于是可以改用可验证的条件

$$
\operatorname{dist}(0,\partial\phi_k(x^{k+1}))\le\sqrt{\frac{\alpha}{\sigma_k}}\varepsilon_k,\quad \sum_k\varepsilon_k<+\infty.
$$

> **定理 15.5（凸问题增广 Lagrange 函数法的收敛性）**
>
> 设 $$\{(x^k,\lambda^k)\}$$ 由 (15.9) 产生，$$x^{k+1}$$ 满足不精确条件 (15.10)。若问题 (15.8) 满足 Slater 条件，则 $$\{\lambda^k\}$$ 有界并收敛到对偶问题的一个最优解 $$\lambda^\infty$$。若还存在 $$\gamma$$ 使下水平集 $$\{x:f(x)\le\gamma\}$$ 非空有界，则 $$\{x^k\}$$ 有界，并且其聚点都是问题 (15.8) 的最优解。

这个定理的证明依赖于下一讲的观点：凸问题的增广 Lagrange 函数法恰好是对偶问题上的近似点算法，乘子更新就是对偶问题的一步邻近步。下一讲将给出这一联系的推导。

## 15.5 应用：基追踪问题

### 15.5.1 原问题的增广 Lagrange 函数法

设 $$A\in\mathbb{R}^{m\times n}$$ ($$m\le n$$)，$$b\in\mathbb{R}^m$$，**基追踪问题** (Basis Pursuit, BP)为

$$
\min_{x\in\mathbb{R}^n}\ \|x\|_1\quad\text{s.t.}\quad Ax=b.
\tag{15.11}
$$

它的对偶问题为 $$\max_y\{-b^\top y:\|A^\top y\|_\infty\le1\}$$，等价地

$$
\min_{y\in\mathbb{R}^m}\ b^\top y\quad\text{s.t.}\quad\|A^\top y\|_\infty\le1,
\tag{15.12}
$$

引入变量 $$s$$ 后又可写成 $$\min_{y,s}\{b^\top y:A^\top y-s=0,\|s\|_\infty\le1\}$$。

问题 (15.11) 的增广 Lagrange 函数为 $$L_\sigma(x,\lambda)=\|x\|_1+\lambda^\top(Ax-b)+\frac{\sigma}{2}\|Ax-b\|^2$$。固定 $$\sigma$$，迭代格式为

$$
x^{k+1}=\arg\min_x\left\{\|x\|_1+\frac{\sigma}{2}\left\|Ax-b+\frac{\lambda^k}{\sigma}\right\|^2\right\},\qquad \lambda^{k+1}=\lambda^k+\sigma(Ax^{k+1}-b).
\tag{15.13}
$$

$$x$$ 子问题是一个 LASSO 问题，可以用第 13, 14 讲的方法求解。由 $$x^{k+1}$$ 的最优性条件 $$0\in\partial\|x^{k+1}\|_1+\sigma A^\top(Ax^{k+1}-b+\lambda^k/\sigma)$$ 和乘子更新得

$$
-A^\top\lambda^{k+1}\in\partial\|x^{k+1}\|_1,
$$

即 $$(x^{k+1},\lambda^{k+1})$$ 始终满足 KKT 条件中的稳定性条件，只有可行性 $$Ax=b$$ 需要通过迭代逐步达到。对基追踪问题，增广 Lagrange 函数法有一个很强的性质：若可行域非空，从 $$x^0=\lambda^0=0$$ 出发，存在 $$K$$ 使得 $$k\ge K$$ 时 $$x^k$$ 都是 (15.11) 的解，即算法在有限步内得到精确解。

### 15.5.2 与 Bregman 迭代的等价性

求解基追踪问题的另一个常用方法是 **Bregman 迭代**。对 $$h(x)=\|x\|_1$$，定义 Bregman 距离 $$D_h^g(x,y)=h(x)-h(y)-\langle g,x-y\rangle$$，其中 $$g\in\partial h(y)$$ (这是第 13 讲 Bregman 距离对不可微函数的推广)。Bregman 迭代为

$$
x^{k+1}=\arg\min_x\left\{D_h^{g^k}(x,x^k)+\frac{1}{2}\|Ax-b\|^2\right\},\quad g^{k+1}=g^k-A^\top(Ax^{k+1}-b),
$$

由 $$x^{k+1}$$ 的最优性条件可知 $$g^{k+1}\in\partial h(x^{k+1})$$。

> **命题 15.6（Bregman 迭代与增广 Lagrange 函数法的等价性）**
>
> 取 $$\sigma=1$$，若 Bregman 迭代的初始值满足 $$g^0=-A^\top\lambda^0$$，并与 (15.13) 从同一个 $$x^0$$ 出发，则两者产生相同的点列 $$\{x^k\}$$，并且 $$g^k=-A^\top\lambda^k$$ 对一切 $$k$$ 成立。

**证明．** 归纳。设 $$g^k=-A^\top\lambda^k$$。Bregman 迭代的目标函数为 $$\|x\|_1-\langle g^k,x\rangle+\frac{1}{2}\|Ax-b\|^2$$ 加上与 $$x$$ 无关的常数，而

$$
-\langle g^k,x\rangle+\frac{1}{2}\|Ax-b\|^2=(\lambda^k)^\top Ax+\frac{1}{2}\|Ax-b\|^2=\frac{1}{2}\|Ax-b+\lambda^k\|^2+\text{常数},
$$

所以两者的 $$x^{k+1}$$ 相同。再由 $$g^{k+1}=-A^\top\lambda^k-A^\top(Ax^{k+1}-b)=-A^\top(\lambda^k+Ax^{k+1}-b)=-A^\top\lambda^{k+1}$$ 完成归纳。 □

因此 Bregman 迭代就是 $$\sigma=1$$ 的增广 Lagrange 函数法，两者效率相同。

### 15.5.3 对偶问题的增广 Lagrange 函数法

也可以对对偶问题 (15.12) 使用增广 Lagrange 函数法。对约束 $$A^\top y-s=0$$ 引入乘子 $$\lambda\in\mathbb{R}^n$$ 和罚因子 $$\sigma$$：

$$
L_\sigma(y,s,\lambda)=b^\top y+\lambda^\top(A^\top y-s)+\frac{\sigma}{2}\|A^\top y-s\|^2,\quad \|s\|_\infty\le1.
$$

迭代格式为

$$
\begin{aligned}
(y^{k+1},s^{k+1})&=\arg\min_{y,\,\|s\|_\infty\le1}\left\{b^\top y+\frac{\sigma_k}{2}\left\|A^\top y-s+\frac{\lambda^k}{\sigma_k}\right\|^2\right\},\\
\lambda^{k+1}&=\lambda^k+\sigma_k(A^\top y^{k+1}-s^{k+1}),\quad \sigma_{k+1}=\min\{\rho\sigma_k,\bar\sigma\}.
\end{aligned}
$$

子问题中 $$s$$ 可以消去：固定 $$y$$，关于 $$s$$ 的问题是到盒子 $$\{\|s\|_\infty\le1\}$$ 上的投影，$$s=P_{\|s\|_\infty\le1}(A^\top y+\lambda/\sigma)$$，其中 $$P_{\|s\|_\infty\le1}(z)=\max\{\min\{z,1\},-1\}$$ (逐分量)。记 $$\psi(z)=z-P_{\|s\|_\infty\le1}(z)=\operatorname{sign}(z)\max\{|z|-1,0\}$$ (它恰好是软阈值)，迭代化为

$$
y^{k+1}=\arg\min_y\left\{b^\top y+\frac{\sigma_k}{2}\left\|\psi\left(A^\top y+\frac{\lambda^k}{\sigma_k}\right)\right\|^2\right\},\quad \lambda^{k+1}=\sigma_k\psi\left(A^\top y^{k+1}+\frac{\lambda^k}{\sigma_k}\right).
$$

$$y$$ 子问题没有显式解，但目标函数连续可微 ($$\frac{1}{2}\|\psi(z)\|^2=\frac{1}{2}\operatorname{dist}^2(z,\{\|s\|_\infty\le1\})$$ 的梯度是 $$\psi(z)$$)，可以用梯度法或半光滑牛顿法 (第 19 讲) 求解。乘子 $$\lambda^k$$ 收敛到原问题 (15.11) 的解 (相差一个符号)。

## 本讲小结

二次罚函数法求解 $$\min f(x)+\frac{\sigma}{2}\sum c_i(x)^2$$，罚因子趋于无穷时子问题全局极小点的聚点是原问题的全局极小点；但约束违反度与 $$\lambda^*/\sigma$$ 同阶，必须让 $$\sigma\to\infty$$，而罚函数 Hessian 的条件数随之趋于无穷。增广 Lagrange 函数 $$L_\sigma(x,\lambda)=f(x)+\lambda^\top c(x)+\frac{\sigma}{2}\|c(x)\|^2$$ 加入乘子项，约束违反度与 $$\frac{\lambda^*-\lambda^k}{\sigma}$$ 同阶，乘子按 $$\lambda^{k+1}=\lambda^k+\sigma_kc(x^{k+1})$$ 更新。在 LICQ 和二阶充分条件下，$$\sigma$$ 超过某个有限值时 $$x^*$$ 就是 $$L_\sigma(\cdot,\lambda^*)$$ 的严格局部极小点。一般约束问题通过松弛变量和消元得到连续可微的子问题，不等式乘子按 $$\mu^{k+1}=\max\{\mu^k+\sigma_kc(x^{k+1}),0\}$$ 更新；凸问题的增广 Lagrange 函数法在 Slater 条件和不精确条件下收敛。对基追踪问题，原问题的增广 Lagrange 函数法每步求解一个 LASSO 子问题，与 Bregman 迭代等价；对偶问题的增广 Lagrange 函数法可以消去辅助变量得到光滑子问题。
