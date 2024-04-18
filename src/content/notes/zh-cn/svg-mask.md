---
title: SVG-遮罩
description: 使用mask属性进行遮罩
publishDate: 2024-04-18
duration: 5分钟
tags: [SVG, mask]
lang: zh-CN
---

## 定义遮罩

使用mask标签定义遮罩，该标签内部的图形会被保留，其他的图形会被遮盖掉，可以理解为PhotoShop中的蒙版，黑色的部分会被保留，白色的部分会被遮盖，简称黑遮白显。

这个标签有`x`和`y`属性，`width`和`height`属性，用来指定遮罩范围。

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="mask" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="black" />
      <stop offset="100%" stop-color="white" />
    </linearGradient>
    <mask id="my-mask">
      <rect x="25" y="25" width="50" height="50" fill="url(#mask)" />
    </mask>
  </defs>
  <image href="https://avatars.githubusercontent.com/u/84616782?v=4" x="25" y="25" width="50" height="50" mask="url(#my-mask)" />
</svg>

从黑到白的渐变应用到遮罩上。

```html ml [++{3-9}] /mask="url(#my-mask)"/
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="mask" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="black" />
      <stop offset="100%" stop-color="white" />
    </linearGradient>
    <mask id="my-mask">
      <rect x="25" y="25" width="50" height="50" fill="url(#mask)" />
    </mask>
  </defs>
  <image 
    href="https://avatars.githubusercontent.com/u/84616782?v=4" 
    x="25" y="25" width="50" height="50" 
    mask="url(#my-mask)"
  />
</svg>
```

## maskUnits

`maskUnits`属性定义了**mask**的坐标系，默认值为`objectBoundingBox`，可以参考[gradientUnits](/notes/zh-cn/svg-gradient#gradientunits%E5%B1%9E%E6%80%A7)。

> 通常，如果需要在不同大小的元素上重复使用相同的蒙版效果，则可以选择 objectBoundingBox。而如果需要保持蒙版效果的固定大小和位置，则可以选择 userSpaceOnUse。

<div class="flex gap-x-2 sm:gap-x-4 justify-between">
  <div class="flex-auto sm:w-80">
  <h3>objectBoundingBox</h3>
    <svg class="w-full bg-base-300 rounded sm:rounded-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <mask id="maskUnits-objectBoundingBox" x="25%" y="25%" width="50%" height="50%">
          <rect x="25" y="25" width="50" height="50" fill="url(#mask)" />
        </mask>
      </defs>
      <image href="https://avatars.githubusercontent.com/u/84616782?v=4" x="25" y="25" width="50" height="50" mask="url(#maskUnits-objectBoundingBox)" />
    </svg>
  </div>
    <div class="flex-auto sm:w-80">
  <h3>userSpaceOnUse</h3>
    <svg class="w-full bg-base-300 rounded sm:rounded-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <mask id="maskUnits-userSpaceOnUse" x="50" y="50" width="100" height="100" maskUnits="userSpaceOnUse">
          <rect x="25" y="25" width="50" height="50" fill="url(#mask)" />
        </mask>
      </defs>
      <image href="https://avatars.githubusercontent.com/u/84616782?v=4" x="25" y="25" width="50" height="50" mask="url(#maskUnits-userSpaceOnUse)" />
    </svg>
  </div>
</div>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <mask id="maskUnits-objectBoundingBox" x="25%" y="25%" width="50%" height="50%">
      <rect x="25" y="25" width="50" height="50" fill="url(#mask)" />
    </mask>
  </defs>
  <image href="https://avatars.githubusercontent.com/u/84616782?v=4" x="25" y="25" width="50" height="50" mask="url(#maskUnits-objectBoundingBox)" />
</svg>
```

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <mask id="maskUnits-userSpaceOnUse" x="50" y="50" width="100" height="100" maskUnits="userSpaceOnUse">
      <rect x="25" y="25" width="50" height="50" fill="url(#mask)" />
    </mask>
  </defs>
  <image href="https://avatars.githubusercontent.com/u/84616782?v=4" x="25" y="25" width="50" height="50" mask="url(#maskUnits-userSpaceOnUse)" />
</svg>
```

## maskContentUnits

`maskContentUnits`属性定义了**mask**的内容坐标系，默认值为`userSpaceOnUse`，可以参考[gradientUnits](/notes/zh-cn/svg-gradient#gradientunits%E5%B1%9E%E6%80%A7)。

<svg class="svg-markdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <mask id="maskContentUnits-userSpaceOnUse" maskContentUnits="objectBoundingBox">
      <rect x="0.25" y="0.25" width="0.5" height="0.5" fill="url(#mask)" />
    </mask>
  </defs>
  <image href="https://avatars.githubusercontent.com/u/84616782?v=4" x="25" y="25" width="50" height="50" mask="url(#maskContentUnits-userSpaceOnUse)" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <mask id="maskContentUnits-userSpaceOnUse" maskContentUnits="objectBoundingBox">
      <!-- 使用百分比表示 -->
      <rect x="0.25" y="0.25" width="0.5" height="0.5" fill="url(#mask)" />
    </mask>
  </defs>
  <image href="https://avatars.githubusercontent.com/u/84616782?v=4" x="25" y="25" width="50" height="50" mask="url(#maskContentUnits-userSpaceOnUse)" />
</svg>
```

我感觉这个属性和`maskUnits`属性很像，使用其中一个即可。