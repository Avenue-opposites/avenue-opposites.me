---
title: SVG-渐变
description: 学习SVG的渐变
duration: 10分钟
publishDate: 2024-04-16
updatedDate: 2024-04-22
tags: [SVG, gradient]
toc: true
lang: zh-CN
---

## 线性渐变

使用`linearGradient`标签来创建线性渐变，这个标签有两个属性：`x1`和`y1`，用来指定渐变的起始点的坐标，`x2`和`y2`用来指定渐变的结束点的坐标。

`stop`标签用来定义渐变的颜色和位置，`offset`属性用来指定位置，`stop-color`属性用来指定颜色，`stop-opacity`属性用来指定颜色的透明度。

> 坐标使用百分比表示。

### 横向

<svg class="w-full h-48 bg-base-300 rounded sm:rounded-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g1" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#c6ffdd" />
      <stop offset="50%" stop-color="#fbd786" />
      <stop offset="100%" stop-color="#f7797d" />
    </linearGradient>
  </defs>
  <rect rx="5" x="-50" y="10" width="200" height="80" fill="url(#g1)" />
  <line class="stroke-primary" x1="-50" y1="50" x2="150" y2="50" />
  <circle class="fill-base-content" cx="-50" cy="50" r="3" />
  <circle class="fill-base-content" cx="150" cy="50" r="3" />
  <text x="0" y="40" font-size="8" class="fill-primary">渐变 →</text>
</svg>

```html ml [++{3-9}] /fill="url(#g1)"/
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <!-- 定义渐变 -->
    <linearGradient id="g1" x1="0%" y1="50%" x2="100%" y2="50%">
      <!-- 定义渐变的颜色和位置 -->
      <stop offset="0%" stop-color="#c6ffdd" />
      <stop offset="50%" stop-color="#fbd786" />
      <stop offset="100%" stop-color="#f7797d" />
    </linearGradient>
  </defs>
  <rect x="-50" y="10" width="200" height="80" fill="url(#g1)" />
</svg>
```

### 纵向

<svg class="w-full h-48 bg-base-300 rounded sm:rounded-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g2" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#0f0c29" />
      <stop offset="50%" stop-color="#302b63" />
      <stop offset="100%" stop-color="#24243e" />
    </linearGradient>
  </defs>
  <rect rx="5" x="-50" y="10" width="200" height="80" fill="url(#g2)" />
  <line class="stroke-primary" x1="50" y1="10" x2="50" y2="90" />
  <circle class="fill-base-content" cx="50" cy="10" r="3" />
  <circle class="fill-base-content" cx="50" cy="90" r="3" />
  <text x="10" y="20" font-size="8" class="fill-primary">渐变 →</text>
</svg>

<details>
<summary>代码</summary>

```html ml [++{3-7}] /fill="url(#g2)"/
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g2" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#0f0c29" />
      <stop offset="50%" stop-color="#302b63" />
      <stop offset="100%" stop-color="#24243e" />
    </linearGradient>
  </defs>
  <rect x="-50" y="10" width="200" height="80" fill="url(#g2)" />
</svg>
```

</details>

### 斜向

<svg class="w-full h-48 bg-base-300 rounded sm:rounded-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#03001e" />
      <stop offset="33%" stop-color="#7303c0" />
      <stop offset="66%" stop-color="#ec38bc" />
      <stop offset="100%" stop-color="#fdeff9" />
    </linearGradient>
  </defs>
  <rect rx="5" x="-50" y="10" width="200" height="80" fill="url(#g3)" />
  <line class="stroke-primary" x1="-50" y1="10" x2="150" y2="90" />
  <circle class="fill-base-content" cx="-50" cy="10" r="3" />
  <circle class="fill-base-content" cx="150" cy="90" r="3" />
  <text x="10" y="20" font-size="8" class="fill-primary rotate-[25deg]">渐变 →</text>
</svg>

<details>
<summary>代码</summary>

```html ml [++{3-8}] /fill="url(#g3)"/
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#03001e" />
      <stop offset="33%" stop-color="#7303c0" />
      <stop offset="66%" stop-color="#ec38bc" />
      <stop offset="100%" stop-color="#fdeff9" />
    </linearGradient>
  </defs>
  <rect x="-50" y="10" width="200" height="80" fill="url(#g3)" />
</svg>
```

</details>

> 以上都是线性渐变，但是有几个不同的渐变类型，它们有不同的颜色和位置。
> 使用`gradientTransform`可以对渐变进行变换。

## 径向渐变

使用`radialGradient`标签来创建径向渐变，
这个标签有两个属性：`cx`和`cy`，用来指定终点圆的圆心坐标，`r`用来指定终点圆的半径，`fx`和`fy`用来指定起点圆的圆心坐标，`fr`用来指定起点圆的半径。如果不指定起始圆，则默认为`cx`和`cy`的值，`fr`默认为0%，`r`默认为50%。

还有`gradientUnits`指定渐变的坐标单位，`spreadMethod`指定渐变的扩散方式，`gradientTransform`指定渐变的变换，`href`指定渐变的引用。

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g4" r="50%">
      <stop offset="0%" stop-color="#cbb4d4" />
      <stop offset="100%" stop-color="#20002c" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#g4)" />
  <line class="stroke-primary" x1="50" y1="50" x2="100" y2="50" />
  <circle cx="50" cy="50" r="2" class="fill-base-content" />
  <circle cx="100" cy="50" r="2" class="fill-base-content" />
  <text x="65" y="45" font-size="6" class="fill-primary">渐变 →</text>
</svg>

```html ml [++{3-6}] /fill="url(#g4)"/
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g4" r="50%">
      <stop offset="0%" stop-color="#cbb4d4" />
      <stop offset="100%" stop-color="#20002c" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#g4)" />
</svg>
```

### 环形

只要两个圆心相同，半径不同，就是环形，可以控制渐变范围。

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g5" fr="10%" r="40%">
      <stop offset="0%" 
      stop-color="#FF0000" />
      <stop offset="100%" stop-color="#FF8800" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#g5)" />
  <!-- 起始圆 -->
  <circle class="stroke-primary" fill="none" cx="50" cy="50" r="10" />
  <!-- 终点圆 -->
  <circle class="stroke-primary" fill="none" cx="50" cy="50" r="40" />
  <line class="stroke-primary" x1="60" y1="50" x2="90" y2="50" /> 
  <circle cx="60" cy="50" r="2" class="fill-base-content" />
  <circle cx="90" cy="50" r="2" class="fill-base-content" />
  <text x="65" y="45" font-size="6" class="fill-primary">渐变 →</text>
</svg>

<details>
  <summary>代码</summary>

```html ml [++{3-7}] /fill="url(#g5)"/
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g5" fr="10%" r="40%">
      <stop offset="0%" 
      stop-color="#FF0000" />
      <stop offset="100%" stop-color="#FF8800" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#g5)" />
</svg>
```

</details>

### 偏移渐变焦点

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g6" fr="10%" fx="50%" fy="50%"
    cx="30%" cy="30%" r="40%">
      <stop offset="0%" 
      stop-color="#4ecdc4" />
      <stop offset="100%" stop-color="#556270" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#g6)" />
  <!-- 起始圆 -->
  <circle class="stroke-primary" fill="none" cx="50" cy="50" r="10" />
  <!-- 终点圆 -->
  <circle class="stroke-primary" fill="none" cx="30" cy="30" r="40" />
  <line class="stroke-primary" x1="2" y1="2" x2="43" y2="43" /> 
  <circle cx="2" cy="2" r="2" class="fill-base-content" />
  <circle cx="43" cy="43" r="2" class="fill-base-content" />
  <text x="5" y="45" font-size="6" class="origin-center fill-primary rotate-45">
    ← 渐变
  </text>
</svg>

<details>
  <summary>代码</summary>

```html ml [++{3-8}] /fill="url(#g6)"/
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g6" fr="10%" fx="50%" fy="50%"
    cx="30%" cy="30%" r="40%">
      <stop offset="0%" 
      stop-color="#4ecdc4" />
      <stop offset="100%" stop-color="#556270" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#g6)" />
</svg>
``` 

</details>

### 引用渐变

使用`href`来引用渐变颜色。

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient href="#g3" id="g7" fr="10%" fx="50%" fy="50%"
    cx="30%" cy="30%" r="40%" />
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#g7)" />
</svg>

<details>
  <summary>代码</summary>

```html ml [++{3-4}] /href="#g3"/ /fill="url(#g7)"/
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient href="#g3" id="g7" fr="10%" fx="50%" fy="50%"
    cx="30%" cy="30%" r="40%" />
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#g7)" />
</svg>
```

</details>

## gradientUnits属性

这个属性指定渐变的坐标系统。

属性值：
  - `objectBoundingBox`（默认值）：对象边界，使用百分比，实际上是在图形的边界，可以想象图像被一个矩形框中，百分比是代表这个矩形的百分比
  - `userSpaceOnUse`：用户空间，使用绝对坐标，参考SVG的坐标系统

### 对象边界

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="go" x1="0%" y1="0%" x2="100%" y2="100%" href="#g2" />
  </defs>
  <rect x="0" y="0" width="100" height="100" fill="url(#go)" />
</svg>

```plaintext
gradientUnits="objectBoundingBox"
```

### 用户空间

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="gu" x1="0" y1="0" x2="100" y2="100" href="#g2" gradientUnits="userSpaceOnUse" />
  </defs>
  <rect x="0" y="0" width="100" height="100" fill="url(#gu)" />
</svg>

```plaintext
gradientUnits="userSpaceOnUse"
```

## spreadMethod属性

这个属性指定渐变传播的方式。

属性值：
  - `pad`（默认）：填充，具体表现为渐变起始之前和结束之后的空白区域使用对应的纯色填充，可以参考[偏移渐变焦点](#偏移渐变焦点)
  - `reflect`：反射，具体表现为渐变颜色顺序反转，每渐变一次就反转一次
  - `repeat`：重复，就是字面意思。
  
### 填充

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g8" r="20%" spreadMethod="pad">
      <stop offset="0%" stop-color="#000046" />
      <stop offset="100%" stop-color="#1cb5e0" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#g8)" />
</svg>

<details>
<summary>代码</summary>

```html ml [++{3-6}] /spreadMethod="pad"/
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g8" r="20%" spreadMethod="pad">
      <stop offset="0%" stop-color="#000046" />
      <stop offset="100%" stop-color="#1cb5e0" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#g8)" />
</svg>
```

</details>
  
### 反射

反射就是在渐变的两个圆之间，通过对应的颜色进行反转。

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g9" r="20%" spreadMethod="reflect">
      <stop offset="0%" stop-color="#000046" />
      <stop offset="100%" stop-color="#1cb5e0" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#g9)" />
  <circle class="stroke-accent" cx="50" cy="50" r="20" fill="none" /><circle class="stroke-accent" cx="50" cy="50" r="40" fill="none" />
</svg>

<details>
<summary>代码</summary>

```html ml [++{3-6}] /spreadMethod="reflect"/
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g8" r="20%" spreadMethod="reflect">
      <stop offset="0%" stop-color="#000046" />
      <stop offset="100%" stop-color="#1cb5e0" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#g8)" />
</svg>
```

</details>

### 重复

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g10" r="20%" spreadMethod="repeat">
      <stop offset="0%" stop-color="#000046" />
      <stop offset="100%" stop-color="#1cb5e0" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#g10)" />
</svg>

<details>
<summary>代码</summary>

```html ml [++{3-6}] /spreadMethod="repeat"/
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g10" r="20%" spreadMethod="repeat">
      <stop offset="0%" stop-color="#000046" />
      <stop offset="100%" stop-color="#1cb5e0" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#g10)" />
</svg>
```

</details>

## 变换

使用`transform`属性来控制svg图形的变换，使用`transform-origin`属性来控制变换的中心点。

> 上面讲过使用`gradientTransform`来控制渐变变换，这里我们使用`transform`来控制变换，它们和css中的变换是一样的，可以使用`translate`、`scale`、`rotate`、`skew`。

### 缩放

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="url(#g10)" transform="scale(0.5)
  " transform-origin="center" />
</svg>

### 扭曲

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="url(#g10)" transform="skewX(20)" transform-origin="center" />
</svg>

### 旋转

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="url(#g7)" transform="rotate(90)" transform-origin="center" />
</svg>

### 平移

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="30" fill="url(#g1)" transform="translate(10, -10)" transform-origin="center" />
</svg>