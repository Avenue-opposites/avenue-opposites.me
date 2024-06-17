---
title: 一个没有怎么使用过的边框属性🧐 → border-image
description: 使用border-image属性创建图片边框
publishDate: 2024-06-17
duration: 5分钟
authors: Avenue-opposites
tags: [border-image]
lang: zh-CN
---

今天我发现了一个平常没有见过的属性：`border-image`，它可以让你创建图片边框。

它是一个复合属性，由以下的基础属性组成。
- `border-image-source`：定义边框图片的来源。
- `border-image-slice`：定义边框图片的如何切割。
- `border-image-width`：定义边框图片的宽度。
- `border-image-repeat`：定义边框图片如何重复。
- `border-image-outset`：边框图片的偏移起点。

## 使用示例

语法格式：
```plaintext
border-image: source slice width outset repeat;
```

效果：

<style>
  .border-image {
    border: 20px solid transparent;
    border-image: url("/images/grid.svg") 30%;
  }
</style>
<p class="slide-enter italic border-image w-full p-4">
  岂不闻天无绝人之路？只要我想走，路就在脚下！
  这世间没有绝境，只有对处境绝望的人。解决问题的答案就在我们自己的手中，当审视内心时，便会发现奇迹伟力就在我身！发现自己，认识自己，靠自己！
  <span class="block text-right text-neutral">——《蛊真人》</span>
</p>

代码：

```css
.border-image {
  border: 20px solid transparent;
  border-image: url("/images/grid.svg") 30%;
}
```

### border-image-source

定义边框图片的来源。

语法格式：
```plaintext
border-image-source: url | gradient | none;
```

效果：
<style>
  .border-image-source {
    border: 20px solid transparent;
    border-image-source: url("/images/wallpaper.png");
    border-image-slice: 30%;
  }
</style>
<p class="slide-enter italic border-image-source w-full p-4">
  但凡上当受骗的人，难道真的是因为他们蠢笨吗？ 不是，只是他们内心愿意去相信罢了。
  <span class="block text-right text-neutral">——《蛊真人》</span>
</p>

代码：

```css
.border-image-source {
  border: 20px solid transparent;
  border-image-source: url("/images/wallpaper.png");
  border-image-slice: 30%;
}
```

## border-image-slice

定义边框图片的如何切割，分别为上、右，下，左，就是有四条分割线，控制这条线距离边框的距离。

语法格式：
```plaintext
border-image-slice: top | right | bottom | left | fill;
```

效果：
<style>
  .border-image-slice {
    border: 20px solid transparent;
    border-image-source: url("/images/阮梅.png");
    border-image-slice: 10% 20% 30% 40%;
  }
</style>
<p class="slide-enter border-image-slice italic w-full p-4">
  千古地仙随风逝，昔曰三王归青冢。
  阳莽憾陨谁无败？卷土重来再称王。
  天河一挂淘龙鱼，逆天独行顾八荒。
  今曰暂且展翼去，明朝登仙笞凤凰。
  <span class="block text-right text-neutral">——《蛊真人》</span>
</p>

代码：

```css
.border-image-slice {
  border: 20px solid transparent;
  border-image-source: url("/images/阮梅.png");
  border-image-slice: 10% 20% 30% 40%;
}
```

## border-image-width

定义边框图片的宽度，如果超过边框宽度，就会向padding方向收缩。

语法格式：
```plaintext
border-image-width: width | auto;
```

效果：
<style>
  .border-image-width {
    border: 10px solid transparent;
    border-image-source: url("/images/流萤.png");
    border-image-slice: 30%;
    border-image-width: 20px;
  }
</style>
<p class="slide-enter border-image-width italic w-full p-4">
  雄山漫道真如铁，如今迈步从头越。
  险就一身乾坤精，我心依旧望苍天。
  <span class="block text-right text-neutral">——《蛊真人》</span>
</p>

代码：

```css
.border-image-width {
  border: 10px solid transparent;
  border-image-source: url("/images/流萤.png");
  border-image-slice: 30%;
  border-image-width: 20px;
}
```

## border-image-outset

定义边框图片的起始位置，并且是向外扩张。

语法格式：
```plaintext
border-image-outset: sides | vertical horizontal | top | bottom | left | right;
```

效果：
<style>
  .border-image-outset {
    border: 20px solid transparent;
    border-image-source: url("/images/缠流子.jpeg");
    border-image-slice: 40%;
    border-image-outset: 10px 20px;
  }
</style>
<p class="slide-enter border-image-outset italic w-full p-4">
  人的一生之精彩，在于自己追逐梦想的过程。不必苛求旁人的不失望或者喜欢。走自己的路，让旁人失望和不喜欢去吧！
  <span class="block text-right text-neutral">——《蛊真人》</span>
</p>

是不是感觉元素变大了，实际就是从边框为起点加上对应的偏移开始设置图片边框。

代码：
```css
.border-image-outset {
  border: 20px solid transparent;
  border-image-source: url("/images/缠流子.jpeg");
  border-image-slice: 40%;
  border-image-outset: 10px 20px;
}
```

## border-image-repeat

定义边框图片的重复方式。

语法格式：
```plaintext
border-image-repeat: stretch | repeat | round | space;
```

|值|说明|
|---|---|
|stretch|拉伸图片以填充边框，默认值。|
|repeat|平铺图片以填充边框。|
|round|平铺图像。当不能整数次平铺时，根据情况放大或缩小图像。|
|space|平铺图像。当不能整数次平铺时，会用空白间隙填充在图像周围（不会放大或缩小图像）|

效果：
<style>
  .border-image-repeat {
    border: 20px solid transparent;
    border-image-source: url("/images/grid.svg");
    border-image-slice: 30%;
    border-image-repeat: round;
  }
</style>
<p class="slide-enter border-image-repeat italic w-full p-4">
  早岁已知世事艰，仍许飞鸿荡云间。 
  一路寒风身如絮，命海沉浮客独行。 
  千磨万击心铸铁，殚精竭虑铸一剑。
  今朝剑指叠云处，炼蛊炼人还炼天！
  <span class="block text-right text-neutral">——《蛊真人》</span>
</p>

代码：
```css
.border-image-repeat {
  border: 20px solid transparent;
  border-image-source: url("/images/grid.svg");
  border-image-slice: 30%;
  border-image-repeat: round;
}
```

有的时候需要制作一些有趣的边框，可以考虑使用`border-image`属性。