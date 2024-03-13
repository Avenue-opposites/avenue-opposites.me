---
title: SVG-基本图形
description: 学习SVG的基本图形
duration: 10分钟
publishDate: 2023-02-05
toc: true
tags: [SVG]
lang: zh-CN
---

## 什么是SVG？

Scalable Vector Graphics简称[**SVG**](https://developer.mozilla.org/zh-CN/docs/Web/SVG)，中文翻译为可缩放的矢量图形。它是**使用XML描述的矢量图形的一种格式**，它的特点是不会失真，交互性强，而且适用于任何尺寸的屏幕。

## 使用SVG

在使用SVG时，首先需要了解一些基本的知识，然后再去学习如何使用SVG。必须加上`xmlns="http://www.w3.org/2000/svg"`属性才能使用，因为它是SVG的标准规则。

```html
<svg xmlns="http://www.w3.org/2000/svg">
  // 你的SVG
</svg>
```

### SVG的坐标系

SVG的坐标系是基于`x`和`y`，`x`是水平方向，`y`是垂直方向的。`x`的正轴是向右的，`y`的正轴是向下的。这里的坐标系是以`(0, 0)`为原点的，它的坐标系是从**左上角**开始的。

### viewBox属性

`viewBox`属性可以用来指定SVG的可见视口。它是以`x`和`y`为左上角的坐标，以`width`和`height`为宽和高。它的默认值是`0 0 100 100`，表示整个SVG图形都可见。

<svg class="bg-base-300 s-1/2 sm:s-96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" class="fill-primary" fill="currentColor" />
</svg>

```html /viewBox="0 0 100 100"/
<svg 
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
>
  <!-- 圆的x,y是圆心的坐标，r是半径,它们都相对于`viewBox`的坐标 -->
  <circle cx="50" cy="50" r="40" fill="#4ade80" />
</svg>
```

如果将`viewBox`属性设置为`0 0 50 50`，那么圆心将在右下角，由于视口只有50，圆的半径有40，所以只能看到4分之一的圆。

<svg class="bg-base-300 s-1/2 sm:s-96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
  <circle cx="50" cy="50" r="40" class="fill-primary" fill="currentColor" />
</svg>

```html /viewBox="0 0 50 50"/
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 50 50"
>
  <circle cx="50" cy="50" r="40" fill="#4ade80" />
</svg>
```

## 基本形状

SVG中有一些比较常用的图形，比如**圆**、**矩形**、**三角形**、**椭圆**等。

### 矩形

`rect`标签可以用来绘制矩形。它有一个`x`和`y`属性，用来指定矩形的左上角的坐标。它还有一个`width`和`height`属性，用来指定矩形的宽和高。

<svg class="bg-base-300 s-1/2 sm:s-96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="10" y="10" width="50" class="fill-primary" height="50" fill="currentColor" />
</svg>

```html /fill="currentColor"/
<svg 
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
>
  <rect x="10" y="10" width="50" height="50" fill="currentColor" /> <!-- [!code focus] -->
</svg>
```

> `fill`表示填充颜色，`currentColor`表示使用当前的颜色，可以使用css中的`fill`属性指定。

### 圆形

`circle`标签可以用来绘制圆形。它有一个`cx`和`cy`属性，用来指定圆形的圆心的坐标。它还有一个`r`属性，用来指定圆形的半径。

<svg class="bg-base-300 s-1/2 sm:s-96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="35" cy="45" r="25"
  class="fill-primary" fill="currentColor" stroke="white" stroke-width="2" />
</svg>

```html /stroke="white"/, /stroke-width="5"/ ml [@@{4-7}]
<svg 
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100">
  <circle 
    cx="35" cy="45" r="25" 
    fill="currentColor" stroke="white" stroke-width="2"
  />
</svg>
```

> `stroke`表示边框颜色，`stroke-width`表示边框宽度。

### 椭圆形

`ellipse`标签可以用来绘制椭圆形。它有一个`cx`和`cy`属性，用来指定椭圆形的圆心的坐标。它还有一个`rx`和`ry`属性，用来指定椭圆形的长宽比，或者可以称为x轴和y轴的半径。

<svg class="bg-base-300 s-1/2 sm:s-96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="50" rx="20" ry="40"
  class="fill-primary" fill="currentColor" />
</svg>

```html ml [@@ {4-7}]
<svg 
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100">
  <ellipse 
    cx="50" cy="50" rx="20" ry="40" 
    fill="currentColor"
  />
</svg>
```

### 线段

`line`标签可以用来绘制线段。它有一个`x1`和`y1`属性，用来指定线段的起点的坐标。它还有一个`x2`和`y2`属性，用来指定线段的终点的坐标。

<svg class="bg-base-300 s-1/2 sm:s-96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <line x1="10" y1="10" x2="90" y2="90"
  class="stroke-primary" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>

```html /stroke-linecap="round"/ ml [@@{4-7}]
<svg 
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100">
  <line 
    x1="10" y1="10" x2="90" y2="90"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" 
  />
</svg>
```

> `stoke-linecap`表示线段的端点，`round`表示圆角，`square`表示方形，`butt`表示直角。
> 线段没有`fill`属性，因为它只是一条线，无法填充。

### 折线

`polyline`标签可以用来绘制折线。它有一个`points`属性，用来指定折线的每个点的`x`和`y`坐标，可以用逗号分隔。

<svg class="bg-base-300 s-1/2 sm:s-96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <polyline 
    points="50 10, 30 45, 70 45, 50 90"
    class="stroke-primary fill-sky-900" stroke="currentColor" stroke-linejoin="bevel"
    stroke-width="2" stroke-linecap="round"
  />
</svg>

```html /stroke-linejoin="bevel"/ ml [@@ {5-10}]
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
>
  <polyline 
    points="50 10, 30 45, 70 45, 50 90"
    class="stroke-primary fill-sky-900"
    stroke="currentColor" stroke-linejoin="bevel"
    stroke-width="2" stroke-linecap="round"
  />
</svg>
```

> `stroke-linejoin`表示折线的连接方式，`round`表示圆角，`miter`表示尖角，`bevel`表示斜角。
> 折线可以使用`fill`属性来填充。

### 多边形

`polygon`标签可以用来绘制多边形。它有一个`points`属性，用来指定多边形的每个点的`x`和`y`坐标，可以用逗号分隔。

> 它和折线的区别是，它会自动闭合。

<div class="flex gap-x-2 justify-between">
  <div class="flex-auto">
    <h4>闭合的多边形</h4>
    <svg class="bg-base-300 s-1/2 sm:s-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <polygon 
        points="50 20, 80 40, 60 70, 40 70, 20 40" fill="currentColor" class="fill-primary" 
      />
    </svg>
  </div>
  <div class="flex-auto">
    <h4>不闭合的折线</h4>
    <svg class="bg-base-300 flex-auto s-1/2 sm:s-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <polyline 
        points="50 20, 80 40, 60 70, 40 70, 20 40" stroke="currentColor" class="stroke-primary" 
      />
    </svg>
  </div>
</div>

```html ml [@@{6-9}]
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
> 
  <!-- 多边形 -->
  <polygon 
    points="50 20, 80 40, 60 70, 40 70, 20 40"
    fill="currentColor" class="fill-primary" 
  />
  <!-- 折线 -->
  <polyline 
    points="50 20, 80 40, 60 70, 40 70, 20 40"
    stroke="currentColor" class="stroke-primary" 
  />
</svg>
```

以上就是SVG基础图形的一些基本形状。