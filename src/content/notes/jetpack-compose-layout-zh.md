---
title: Jetpack Compose 布局
description: Jetpack Compose学习笔记
publishDate: 2023-01-17
duration: 5分钟
authors: Avenue-opposites
tags: [Jetpack Compose, Layout]
lang: zh
---

## Surface布局组件

[Surface](https://developer.android.com/reference/android/view/Surface)是 Jetpack Compose 中的一个组件，它提供了一个拥有物理特性的容器来放置其他UI元素。

### 作用

1. 提供背景： Surface可以为其包含的元素提供一个背景颜色。这对于区分应用的不同部分或提高可读性非常有用。
2. 创建卡片和面板： Surface常被用来创建卡片样式的布局，类似于Material Design中的卡片。它可以提供阴影和圆角边框，使得UI看起来更有层次感。
3. 物理特性： Surface模拟现实世界的物理特性，如阴影（通过elevation属性控制），这可以给UI增加立体感。
4. 主题和样式： 在Material Design中，Surface可以用来反映主题样式，如使用主题中的颜色和其他样式属性。

### 什么时候使用它？

- 创建卡片视图： 当你需要创建一个卡片视图，显示列表项、详细信息等。
- 分隔UI区域： 当你需要在UI中明确分隔不同的区域或组件时，比如在表单和按钮之间。
- 应用主题样式： 当你想要在UI组件中应用和展示当前主题的样式。
- 提供点击/触摸反馈： Surface也可用于提供可点击元素的视觉反馈，比如按钮或选择项。

`Surface`是一个非常通用的容器组件，在创建符合Material Design的界面时非常有用。它提供了一个简单的方法来给你的UI元素添加背景、阴影和圆角等物理属性。

## 布局属性

- Modifier: 用于修改布局属性，如尺寸、填充、间隔、对齐方式等。
- Flexibility: 在Row或Column中，你可以使用权重（如weight）来分配额外的空间。
- Alignment: 用于对齐子元素的属性。
- Arrangement: 用于对子元素进行排列的属性。

## Column 布局

用于垂直排列其子元素的布局

### 预览
![column-preview](/images/note/column-preview.png)

```kotlin ml [$$ {3-27}]
@Composable
fun ColumnBackground() {
    Column {
        Surface(
            modifier = Modifier
                .fillMaxWidth() // 宽度100%
                .weight(1f),
            color = Color.Cyan
        ) {
            Text(text = "1")
        }
        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            color = Color.Magenta
        ) {
            Text(text = "2")
        }
        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            color = Color.Yellow
        ) {
            Text(text = "3")
        }
    }
}
```

## Row 布局

用于水平排列其子元素的布局

### 预览

![row-preview](/images/note/row-preview.png)

```kotlin
Row {
  Surface(
      modifier = Modifier
          .height(30.dp)
          .weight(1f),
      color = Color.Cyan
  ) {
      Text(text = "1")
  }
  Surface(
      modifier = Modifier
          .height(40.dp)
          .weight(1f),
      color = Color.Magenta
  ) {
      Text(text = "2")
  }
  Surface(
      modifier = Modifier
          .height(50.dp)
          .weight(1f),
      color = Color.Yellow,
  ) {
      Text(text = "3")
  }
}
```

## Box布局 

用于层叠布局，可以使一个元素覆盖在另一个元素上。

### 预览

![box-preview](/images/note/box-preview.png)

```kotlin
@Composable
fun BoxBackground() {
    Box(modifier = Modifier.size(40.dp).background(Color.Blue))
}
```

使用`Alignment`来改变子元素的对齐方式。

### 预览

![box-alignment-preview](/images/note/box-alignment-preview.png)

```kotlin
@Composable
@Composable
fun BoxBackground() {
    Box(
        modifier = Modifier.fillMaxSize().background(Color.White),
        contentAlignment = Alignment.Center // 设置居中 // [!code ++]
    ) {
        Box(modifier = Modifier.size(100.dp).background(Color.Red)) // [!code ++]
    }
}
```

> 在Box中的Modifier可以使用`verticalScroll`和`horizontalScroll`来实现滚动效果。

还有，`ConstraintLayout`，提供更复杂和灵活的布局配置，类似于传统Android开发中的ConstraintLayout。

`LazyColumn` 和 `LazyRow`，用于大量数据的滚动列表，类似于传统的RecyclerView。