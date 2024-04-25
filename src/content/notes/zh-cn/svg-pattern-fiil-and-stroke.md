---
title: SVG-图案填充和描边
description: 了解SVG的图案填充和描边
publishDate: 2024-04-22
duration: 5分钟
tags: [SVG, pattern fill, pattern stroke]
lang: zh-CN
---

## 图案填充

使用`pattern`标签创建预定义图案，然后引用它。它有`x`和`y`属性，用来指定图案的起始点的坐标。它还有一个`width`和`height`属性，用来指定图案的宽度和高度。
SVG中有两种图案填充方式：`fill`和`stroke`。`fill`属性用于填充图形，`stroke`属性用于描边图形。

> 它还有以下属性：
> - `viewBox`，用于指定图案的可视区域，可以看这一期[「viewbox属性」](/notes/zh-cn/svg-base-graphics#viewbox属性)。
> - `patternUnits`，用于指定图案的坐标单位，默认值为`objectBoundingBox`，可以看这一期[「maskUnits属性」](/notes/zh-cn/svg-mask#maskunits)
> - `patternContentUnits`，默认值为`userSpaceOnUse`，用于指定图案内容的坐标单位，
[「maskContentUnits属性」](/notes/zh-cn/svg-mask#maskcontentunits)
> - `patternTransform`，用于指定图案的变换，可以看这一期[「transform属性」](/notes/zh-cn/svg-gradient#变换)

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g1">
      <stop offset="0%" stop-color="#03001e" />
      <stop offset="33%" stop-color="#7303c0" />
      <stop offset="66%" stop-color="#ec38bc" />
      <stop offset="100%" stop-color="#fdeff9" />
    </radialGradient>
    <pattern id="p1" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="10" fill="url(#g1)" />
    </pattern>
  </defs>
  <rect x="0" y="0" width="100" height="100" fill="url(#p1)" />
  <rect 
    x="20" y="20" width="20" height="20" class="stroke-primary" stroke-width="0.5" fill="none" 
  />
</svg>

```html ml [++{9-11}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g1">
      <stop offset="0%" stop-color="#03001e" />
      <stop offset="33%" stop-color="#7303c0" />
      <stop offset="66%" stop-color="#ec38bc" />
      <stop offset="100%" stop-color="#fdeff9" />
    </radialGradient>
    <pattern id="p1" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="10" fill="url(#g1)" />
    </pattern>
  </defs>
  <rect x="0" y="0" width="100" height="100" fill="url(#p1)" />
</svg>
```

## 图案描边

一样和上面定义图案，然后使用`stroke`属性来描边图形。

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <pattern id="p2" width="10" height="10" patternUnits="userSpaceOnUse">
      <circle cx="5" cy="5" r="5" fill="url(#g1)" />
    </pattern>
  </defs>
  <circle cx="50" cy="50" r="30" stroke="url(#p2)" 
  stroke-width="10" fill="none" />
  <rect 
    x="20" y="20" width="10" height="10" class="stroke-primary" stroke-width="0.5" fill="none" 
  />
</svg>

```html ml [++{3-5}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <pattern id="p2" width="10" height="10" patternUnits="userSpaceOnUse">
      <circle cx="5" cy="5" r="5" fill="url(#g1)" />
    </pattern>
  </defs>
  <circle cx="50" cy="50" r="30" stroke="url(#p2)" 
  stroke-width="10" fill="none" />
</svg>
```

## 图案嵌套

在同一个图案定义中，可以嵌套定义图案。

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <pattern id="p-child" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect x="2" y="2" width="2" height="2" fill="url(#g1)" />
    </pattern>
    <pattern id="p-parent" width=".25" height=".25">
      <circle cx="12.5" cy="12.5" r="5" fill="url(#p-child)" />
    </pattern>
  </defs>
  <circle cx="50" cy="50" r="40" fill="url(#p-parent)
  " stroke="url(#g1)" />
  <rect 
    x="56.25" y="56.25" width="12.5" height="12.5" class="stroke-primary" stroke-width="0.1" fill="none" 
  />
   <rect 
    x="56.25" y="56.25" width="4" height="4" class="stroke-primary" stroke-width="0.1" fill="none" 
  />
</svg>

```html ml [++{3-8}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <pattern id="p-child" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect x="2" y="2" width="2" height="2" fill="url(#g1)" />
    </pattern>
    <pattern id="p-parent" width=".25" height=".25">
      <circle cx="12.5" cy="12.5" r="5" fill="url(#p-child)" />
    </pattern>
  </defs>
  <circle cx="50" cy="50" r="40" fill="url(#p-parent)
  " stroke="url(#g1)" />
</svg>
```