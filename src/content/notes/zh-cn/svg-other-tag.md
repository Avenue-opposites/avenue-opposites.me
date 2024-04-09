---
title: SVG中的其他标签
description: g，use，symbol，defs标签
publishDate: 2024-04-09
duration: 3分钟
tags: [SVG, g, use, symbol, defs]
toc: true
lang: zh-CN
---

## g标签

<g>标签是用来组合其他标签的，它本身没有样式，类似于div，它可以包含其他标签。

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <g>
    <path d="M20 20, H60, V60, H20, M30 30, V50, H50,   V30"/>
    <path d="M35 35, H45, V45, H35"/>
    <line x1="35" y1="35" x2="45" y2="45" />
    <circle cx="50" cy="50" r="10" />
  </g>
</svg>  
```

## use标签

use标签用来复用其他标签，只要元素定义了id属性，就可以通过`xlink:href`属性来引用。
可以指定`x`和`y`，也可以指定`width`和`height`属性。

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <line id=l1 x1="10" y1="10" x2="90" y2="10" stroke="#F44336" />
  <use x="0" y="30" xlink:href="#l1" />
  <use x="0" y="50" xlink:href="#l1" />
  <use x="0" y="80" xlink:href="#l1" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <line id=l1 x1="10" y1="10" x2="90" y2="10" stroke="#F44336" />
  <use x="0" y="30" xlink:href="#l1" />
  <use x="0" y="50" xlink:href="#l1" />
  <use x="0" y="80" xlink:href="#l1" />
</svg>
```

> `x`和`y`是相对于引用标签的位置，`xlink:href`是引用标签的id。

## symbol标签

symbol标签用来创建外部定义的图形，可以在外部定义，也可以在内部定义，它不会被渲染，但是可以被`use`引用。

> 通常使用它来创建图标集合和符号库。

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <symbol viewBox="0 0 24 24" id="material-symbols-4k-outline">
    <path fill="currentColor" d="M13 15h1.5v-2.25L16.25 15h1.825l-2.325-3l2.325-3H16.25l-1.75 2.25V9H13zm-3.5 0H11v-1.5h1V12h-1V9H9.5v3H8V9H6.5v4.5h3zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z" />
  </symbol>
  <use x="25" y="25" width="50" height="50" xlink:href="#material-symbols-4k-outline" />
</svg>

```html ml [++{2-5}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <symbol viewBox="0 0 24 24" id="material-symbols-4k-outline">
    <path fill="currentColor" d="M13 15h1.5v-2.25L16.25 15h1.825l-2.325-3l2.325-3H16.25l-1.75 2.25V9H13zm-3.5 0H11v-1.5h1V12h-1V9H9.5v3H8V9H6.5v4.5h3zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z" />
  </symbol>
  <use x="25" y="25" width="50" height="50" xlink:href="#material-symbols-4k-outline" />
</svg>
```

## defs标签

defs标签用来定义一些可以重复使用的图形和滤镜，以及渐变，可以在外部定义，也可以在内部定义，它不会被渲染，但是可以被`use`引用。

> 它和symbol标签类似，都是用来创建外部定义的图形，但是不同的是，defs标签可以用来定义滤镜，以及渐变。

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <!-- 定义渐变 -->
    <linearGradient id="redToBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F44336" />
      <stop offset="100%" stop-color="#2196F3" />
    </linearGradient>
    <!-- 定义滤镜 -->
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
    </filter>
  </defs>
  <rect x="35" y="15" width="30" height="30" rx="5"  fill="url(#redToBlue)" />
  <rect x="35" y="55" width="30" height="30" fill="url(#redToBlue)" filter="url(#blur)" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <!-- 定义渐变 -->
    <linearGradient id="redToBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F44336" />
      <stop offset="100%" stop-color="#2196F3" />
    </linearGradient>
    <!-- 定义滤镜 -->
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
    </filter>
  </defs>
  <rect x="35" y="15" width="30" height="30" rx="5"  fill="url(#redToBlue)" />
  <rect x="35" y="55" width="30" height="30"  fill="url(#redToBlue)" filter="url(#blur)" />
</svg>
```