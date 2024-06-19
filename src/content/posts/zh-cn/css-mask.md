---
title: CSS中的遮罩
description: 使用mask属性创建遮罩
publishDate: 2024-06-18
duration: 5分钟
authors: Avenue-opposites
tags: [CSS, mask]
lang: zh-CN
toc: true
---

这个属性可以将图形变成遮罩，可以理解为PhotoShop中的蒙版，黑色的部分会被保留，白色的部分会被遮盖，简称黑遮白显。

平常确实用不到这个属性，但是我在[@antfu](https://github.com/antfu)的[聊聊纯 CSS 图标](https://antfu.me/posts/icons-in-pure-css-zh)这篇blog中看到了一种非常不错的方法。

## mask

可以通过这个属性来让图形一部分变成隐藏的区域。

### 示例

使用网格图片的遮罩

![grid](/images/grid.svg)

<style>
  .mask {
    mask: url(/images/grid.svg);
  }
</style>
<img class="mask cursor-pointer" src="/images/明末行.png" alt="明末行" />

```css
.mask {
  mask: url(/images/grid.svg);
}
```

## mask-mode

控制遮罩的模式。

| 值 | 说明 |
| --- | --- |
| alpha | 使用透明度控制，透明的部分会被遮盖，不透明的部分会被保留 |
| luminance | 使用亮度控制，暗的部分会被遮盖，亮的部分会被保留 |
| match-source | 使用与源图像相同的模式 |

### 示例

<style>
  .mask-mode-alpha {
    mask-mode: alpha;
  }
  .mask-mode-luminance {
    mask-mode: luminance;
  }
</style>

#### alpha模式

<img class="mask mask-mode-alpha cursor-pointer" src="/images/金饰.png" alt="金饰">

```css
.mask-mode-alpha {
  mask-mode: alpha;
}
```

#### luminance模式

<img class="mask mask-mode-luminance cursor-pointer" src="/images/金饰.png" alt="金饰">

```css
.mask-mode-luminance {
  mask-mode: luminance;
}
```

## mask-repeat

这个属性定义了遮罩的重复模式和`background-repeat`类似。

| 值 | 说明 |
| --- | --- |
| no-repeat | 不重复 |
| repeat（默认值） | 重复 |
| repeat-x | 水平重复 |
| repeat-y | 垂直重复 |
| space | 蒙版图像将在元素内平铺，留下间隙以适应容器大小 |
| round | 蒙版图像将在元素内平铺，并按需要缩放以适应容器大小 |

## mask-position

这个属性定义了遮罩的位置和`background-position`类似。

```css
.mask-position {
  /* mask-position: 50% 50%; */
  mask-position: left top;
}
```

> 可以参考[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-position)

## mask-clip

这个属性用于指定蒙版图像应用于元素的哪些部分。

| 值 | 说明 |
| --- | --- |
| border-box | 蒙版图像裁剪到元素的边框盒（包括边框 |
| padding-box | 蒙版图像裁剪到元素的内边距盒（不包括边框） |
| content-box | 蒙版图像裁剪到元素的内容盒（不包括内边距和边框） |
| border | 等同于border-box |
| padding | 等同于padding-box |
| content | 等同于content-box |
| fill-box | 用于 SVG，裁剪到元素的填充区域 |
| stroke-box | 用于 SVG，裁剪到元素的描边区域 |
| view-box | 用于 SVG，裁剪到元素的视图框，即元素的`viewBox`。 |
| text | 裁剪到元素的文本 |
| no-clip | 不裁剪 |

### 示例

<style>
  .mask-clip-text {
    mask-clip: text;
  }
</style>
<h1 class="text-4xl sm:text-6xl lg:text-9xl mask mask-clip-text">我是一个文本。</h1>

```css
.mask-clip-text {
  mask-clip: text;
}
```

## mask-origin

这个属性定义了遮罩的原点和`background-origin`类似。

| 值 | 说明 |
| --- | --- |
| border-box | 原点位于元素的边框盒 |
| padding-box | 原点位于元素的内边距盒 |
| content-box | 原点位于元素的内容盒 |
| border | 等同于border-box |
| padding | 等同于padding-box |
| content | 等同于content-box |
| fill-box | 用于 SVG，原点位于元素的填充区域 |
| stroke-box | 用于 SVG，原点位于元素的描边区域 |
| view-box | 用于 SVG，原点位于元素的视图框，即元素的`viewBox`。 |

## mask-size

这个属性定义了蒙版图像的大小，`background-size`类似。

```css
.mask-size {
  /* mask-size: 100% 100%; */
  mask-size: cover;
}
```

> 具体信息请参考[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-size)

## mask-composite

这个属性定义了**多个蒙版图像**的合成模式。

| 值 | 说明 |
| --- | --- |
| add | 将蒙版图像相加，这意味着重叠的部分会变得更加不透明 |
| subtract | 从前一个蒙版图像中减去当前蒙版图像，这意味着重叠的部分会变得更加透明 |
| intersect | 仅保留两个蒙版图像的交集部分，其他部分变得透明 |
| exclude | 仅保留两个蒙版图像不重叠的部分，重叠部分变得透明 |

### 示例

<style>
  .mask-composite {
    mask-image: url("/images/grid.svg"), url("/images/金饰.png");
    mask-composite: exclude;
  }
</style>
<img class="mask mask-composite cursor-pointer" src="/images/金饰-1.png" alt="金饰">

```css
.mask-composite {
  mask-image: url("/images/grid.svg"), url("/images/金饰.png");
  mask-composite: exclude;
}
```