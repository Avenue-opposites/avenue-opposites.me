---
title: 在SVG导入图片
description: 使用image标签导入图片
publishDate: 2024-04-17
duration: 2分钟
tags: [SVG, image]
lang: zh-CN
---

## image标签的用法

使用`href`属性来导入图片，`x`和`y`属性来控制图片的位置，`width`和`height`属性来控制图片的大小。

其他属性：
  - `preserveAspectRatio`属性可以控制图片的长宽比，详见[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio)。
  - `crossorigin`属性可以控制图片的跨域访问，详见[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/crossorigin)。
  - `decoding`属性可以控制图片的解码方式，详见[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/decoding)。

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <image href="https://avatars.githubusercontent.com/u/84616782?v=4" x="25" y="25" width="50" height="50" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <image 
    href="https://avatars.githubusercontent.com/u/84616782?v=4" 
    x="25" y="25" width="50" height="50"
  />
</svg>
```

## 裁剪图片

使用`clip-path`属性来裁剪图片，不明白可以看这一期「[在SVG使用裁剪路径](/notes/zh-cn/svg-clip-path)」。

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="round">
      <circle cx="50" cy="50" r="25" />
    </clipPath>
  </defs>
  <image href="https://avatars.githubusercontent.com/u/84616782?v=4" x="25" y="25" width="50" height="50" clip-path="url(#round)" />
</svg>

```html ml [++{2-6, 10}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="round">
      <circle cx="50" cy="50" r="25" />
    </clipPath>
  </defs>
  <image 
    href="https://avatars.githubusercontent.com/u/84616782?v=4" 
    x="25" y="25" width="50" height="50" 
    clip-path="url(#round)"
  />
</svg>
```