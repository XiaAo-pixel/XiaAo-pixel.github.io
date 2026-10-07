---
layout: note
kind: note
title: "第 9 章　常用符号表"
course: optimization
order: 9
date: 2026-10-07
---

# 常用符号表

本附录汇总全书统一使用的记号。阅读时若遇不确定的符号，可回到此处查阅。

## 集合、空间与基本运算

| **记号** | **含义** |
|:---|:---|
| **记号** | **含义** |
| $$\mathbb{R},\ \mathbb{R}^n,\ \mathbb{R}^{m\times n}$$ | 实数集、$$n$$ 维实向量空间、$$m\times n$$ 实矩阵空间 |
| $$\overline{\mathbb{R}}=\mathbb{R}\cup\lbrace\pm\infty\rbrace$$ | 广义实数空间 |
| $$\mathcal{S}^{n},\ \mathcal{S}^{n}_{+},\ \mathcal{S}^{n}_{++}$$ | $$n$$ 阶对称矩阵、半正定矩阵、正定矩阵的集合 |
| $$\operatorname{int}C,\ \operatorname{cl}C$$ | 集合 $$C$$ 的内部、闭包 |
| $$\operatorname{conv}S,\ \operatorname{aff}S,\ \operatorname{cone}S$$ | 集合 $$S$$ 的凸包、仿射包、锥包 |
| $$C+D,\ kS$$ | 集合的 Minkowski 和、数乘 |
| $$\left\langle x,\,y\right\rangle=x^\top y$$ | 向量内积 |
| $$\left\langle A,\,B\right\rangle=\operatorname{tr}(AB^\top)$$ | 矩阵内积（Frobenius 内积） |
| $$\bm{1}$$ | 全一分量向量（维数由上下文确定） |
| $$\operatorname{diag}(x)$$ | 以向量 $$x$$ 为对角元的对角矩阵 |
| $$I$$ | 单位矩阵 |

## 范数与矩阵分析

| **记号** | **含义** |
|:---|:---|
| **记号** | **含义** |
| $$\left\Vert x\right\Vert_p$$ | 向量 $$\ell_p$$ 范数 $$\big(\sum_i\vert x_i\vert^p\big)^{1/p}$$，$$p\ge1$$ |
| $$\left\Vert x\right\Vert_\infty$$ | $$\max_i\vert x_i\vert$$ |
| $$\left\Vert x\right\Vert_0$$ | $$x$$ 中非零元素的个数（**不是**范数） |
| $$\left\Vert x\right\Vert_*$$ | 向量 $$x$$ 的对偶范数 $$\sup_{\left\Vert y\right\Vert\le1}y^\top x$$ |
| $$\left\Vert A\right\Vert_F$$ | Frobenius 范数 $$\sqrt{\operatorname{tr}(AA^\top)}$$ |
| $$\left\Vert A\right\Vert_2$$ | 谱范数 $$\sqrt{\lambda_{\max}(A^\top A)}=\sigma_{\max}(A)$$ |
| $$\left\Vert A\right\Vert_*$$ | 核范数 $$\sum_{i}\sigma_i(A)$$ |
| $$\sigma_i(A),\ \lambda_i(A)$$ | 奇异值、特征值（$$\lambda_{[i]}$$ 表示第 $$i$$ 大的特征值） |
| $$\operatorname{rank}(A),\ \operatorname{tr}(A),\ \det(A)$$ | 秩、迹、行列式 |
| $$A^\dagger$$ | Moore--Penrose 广义逆 |
| $$A\succeq0,\ A\succ0$$ | $$A$$ 半正定、正定 |
| $$x\preceq_K y$$ | 由适当锥 $$K$$ 诱导的广义不等式，$$y-x\in K$$ |
| $$x\prec_K y$$ | 严格广义不等式，$$y-x\in\operatorname{int}K$$ |
| $$K^*$$ | 锥 $$K$$ 的对偶锥 |

## 微积分与凸分析

| **记号** | **含义** |
|:---|:---|
| **记号** | **含义** |
| $$\nabla f(x)$$ | $$f$$ 在 $$x$$ 处的梯度（Fréchet 导数） |
| $$\nabla^2 f(x)$$ | $$f$$ 在 $$x$$ 处的海瑟矩阵 |
| $$f'(x;d)$$ | $$f$$ 在 $$x$$ 处沿方向 $$d$$ 的方向导数 |
| $$\partial f(x)$$ | $$f$$ 在 $$x$$ 处的次微分（次梯度集合） |
| $$\operatorname{dom}f$$ | 函数 $$f$$ 的有效定义域 $$\lbracex\mid f(x)<+\infty\rbrace$$ |
| $$\operatorname{epi}f$$ | $$f$$ 的上方图 $$\lbrace(x,t)\mid f(x)\le t\rbrace$$ |
| $$C_\alpha=\lbracex\mid f(x)\le\alpha\rbrace$$ | $$f$$ 的 $$\alpha$$-下水平集 |
| $$f^*(y)$$ | $$f$$ 的共轭函数 $$\sup_{x\in\operatorname{dom}f}\big(y^\top x-f(x)\big)$$ |
| $$f^{**}$$ | $$f$$ 的二次共轭函数 |
| $$I_C(x),\ \delta_C(x)$$ | 集合 $$C$$ 的指示函数（$$x\in C$$ 时为 $$0$$，否则为 $$+\infty$$） |
| $$S_C(x)=\sup_{y\in C}y^\top x$$ | 集合 $$C$$ 的支撑函数 |
| $$\operatorname{dist}(x,C)=\inf_{y\in C}\left\Vert x-y\right\Vert$$ | 点 $$x$$ 到集合 $$C$$ 的距离 |
| $$N_C(x)$$ | 集合 $$C$$ 在 $$x$$ 处的法锥 |
| $$\Pi_C(x)$$ | 点 $$x$$ 在集合 $$C$$ 上的投影 |
| $$\lambda_{\max}(A)$$ | 对称矩阵 $$A$$ 的最大特征值 |
| $$\Phi(\cdot)$$ | 标准正态分布的累积分布函数 |

## 优化问题与算法

| **记号** | **含义** |
|:---|:---|
| **记号** | **含义** |
| $$f_0,\ f_1,\dots,f_m$$ | 目标函数与不等式约束函数 |
| $$h_i$$ 或 $$a_i^\top x=b_i$$ | 等式约束函数 |
| $$X,\ \mathcal{F}$$ | 可行域（约束集合） |
| $$x^\star,\ f^\star$$ | 最优解与最优值 |
| $$x^k,\ \lbracex^k\rbrace$$ | 算法产生的第 $$k$$ 个迭代点、迭代点列（沿用讲义的上标记法） |
| $$\theta,\ \alpha$$ | 凸组合系数 / 步长（由上下文确定） |
| $$L,\ m$$ | Lipschitz 常数、强凸参数 |
| $$Q$$-线性 / $$Q$$-超线性 / $$Q$$-次线性 / $$Q$$-二次 | 点列的商收敛速度 |
| $$R$$-线性 | 由收敛到 $$0$$ 的序列控制的收敛速度 |
| $$O(\cdot),\ o(\cdot)$$ | 大 $$O$$、小 $$o$$ 记号 |
| LP / QP / QCQP | 线性规划 / 二次规划 / 二次约束二次规划 |
| SOCP / SDP | 二次锥规划 / 半定规划 |
| $$\mathcal{Q}$$ | 二次锥 $$\lbrace(x_1,\bar x)\mid\left\Vert\bar x\right\Vert_2\le x_1\rbrace$$ |
| $$A^\dagger$$ | 广义逆（最小二乘问题的解析解 $$x^\star=A^\dagger b$$） |

## 关于记号的两点说明

**（）** **上标与下标。**本笔记中 $$x^k$$ 一律表示算法的第 $$k$$ 个迭代点，而 $$x_i$$ 表示向量 $$x$$ 的第 $$i$$ 个分量；$$x_{[i]}$$ 表示把 $$x$$ 的分量从大到小排列后的第 $$i$$ 个。 三者含义不同，请勿混淆。

**（）** **$$\left\Vert\cdot\right\Vert_0$$ 不是范数。**$$\left\Vert x\right\Vert_0$$ 仅表示非零元素个数，它不满足范数的齐次性 （例如 $$\left\Vert\alpha x\right\Vert_0\ne\vert\alpha\vert\left\Vert x\right\Vert_0$$），此处沿用文献中的惯用记号。
