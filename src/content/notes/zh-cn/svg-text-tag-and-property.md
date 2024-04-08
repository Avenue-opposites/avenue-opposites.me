---
title: SVG-Text标签和属性
description: 在SVG中绘制文本和设置文本属性
duration: 4分钟
publishDate: 2024-04-08
toc: true
lang: zh-cn
---

## text标签

`text`标签是用于在SVG中绘制文本的标签。它有`x`和`y`属性，用于指定文本的起始位置，起点在文本左下角。

使用以下属性可以修改文本样式：
  - `font-size`：文本字体大小。
  - `font-family`：文本字体。
  - `fill`：文本颜色。
  - `font-weight`：文本字体粗细。
  - `font-style`：文本字体样式。
  - `font-variant`：文本字体变体。
  - `text-decoration`：文本文本装饰。
  - `text-anchor`：文本锚点表示对齐坐标的方式，值为`start`，`middle`或`end`，默认为`start`。
  - `letter-spacing`：文本字间距。
  - `word-spacing`：文本词间距。
  - `line-height`：文本行高。
  - `text-align`：文本对齐方式。
  - `textLength`：文本长度。

<svg class="w-full bg-base-300 rounded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 24">
  <text x="5" y="12" font-size="10" 
    text-anchor="start" text-decoration="underline"
    font-weight="bold"
    font-style="italic"
    font-variant="small-caps"
    fill="#F44336">Hello, World!</text>
</svg>

```html
<svg class="w-full bg-base-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 24">
  <text 
    x="5" y="12" font-size="10" 
    text-anchor="start" text-decoration="underline"
    font-weight="bold"
    font-style="italic"
    font-variant="small-caps"
    fill="#F44336"
  >
    Hello, World!
  </text>
</svg>
```

## tspan标签

这个标签用于给子文本应用其他的样式。

<svg class="w-full bg-base-300 rounded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 24">
  <text 
    x="5" y="12" font-size="8"
    fill="#F44336" 
  >
    Hello, 
    <tspan
    fill="#B3E5FC"
    font-size="10"
    font-weight="bold"
    font-style="italic"
    font-variant="small-caps"
    text-decoration="underline">World</tspan>
    !
  </text>
</svg>

```html
<svg class="w-full bg-base-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 24">
  <text 
    x="5" y="12" font-size="8"
    fill="#F44336" 
  >
    Hello, 
    <tspan
    fill="#B3E5FC"
    font-size="10"
    font-weight="bold"
    font-style="italic"
    font-variant="small-caps"
    text-decoration="underline">World</tspan>
    !
  </text>
</svg>
```

## textPath标签

它可以让文本绘制在一条路径上。

<svg class="w-full bg-base-300 rounded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 24">
  <path id="heart" d="M20 20 A 20 20, 0, 0, 1,50 20" fill="none" />
  <text x="5" y="12" fill="#F44336" font-size="3">
    <textPath xlink:href="#heart" startOffset="0">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </textPath>
  </text>
</svg>

```html ml [++{2,4,6}]
<svg class="w-full bg-base-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 24">
  <path id="heart" d="M20 20 A 20 20, 0, 0, 1,50 20" fill="none" />
  <text x="5" y="12" fill="#F44336" font-size="3">
    <textPath xlink:href="#heart" startOffset="0">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </textPath>
  </text>
</svg>
```

> 注：textPath标签仅在`<text>`标签中生效。<br/>
> 使用`startOffset`属性来控制文本开始绘制的位置。