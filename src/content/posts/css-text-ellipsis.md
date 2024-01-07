---
title: CSS文本溢出显示省略号
description: 使用CSS属性完成单行文本和多行文本的溢出显示省略号
publishDate:
heroImage: /images/blog-placeholder-2.jpg
authors: Avenue-opposites
---

## 单行文本溢出显示省略号

```css
.single-ellipsis {
  width: 100px; /* 需要设置宽度才有效 */
  overflow: hidden; /* 设置溢出隐藏 */
  text-overflow: ellipsis; /* 设置文本溢出显示省略号 */
  white-space: nowrap; /* 设置不换行 */
}
```

## 多行文本溢出显示省略号

```css
.multi-ellipsis {
  overflow: hidden; /* 设置溢出隐藏 */
  text-overflow: ellipsis;  /* 设置文本溢出显示省略号   */
  display: -webkit-box; /* 设置为弹性盒子 */
  -webkit-line-clamp: 2; /* 行数 */
  -webkit-box-orient: vertical; /* 设置为垂直方向 */
}
```

这个不一定要设置宽度，但是要设置行数，否则不会显示省略号。