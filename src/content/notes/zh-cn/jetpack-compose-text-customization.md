---
title: Jetpack Compose 文本自定义
description: Jetpack Compose 学习笔记
publishDate: 2024-01-18
duration: 3分钟
authors: Avenue-opposites
tags: [Jetpack Compose, Text Customization]
lang: zh-CN
---

## 介绍

这篇笔记主要是介绍 Jetpack Compose 文本自定义。

### 文本属性

- text：文本
- modifier：修饰符
  - background：背景颜色
  - padding：内边距
- color：文字颜色
- fontSize：字体大小
- fontWeight：字体粗细
- fontStyle：字体样式
- textAlign：文本对齐方式
- lineHeight：行高
- letterSpacing：字间距
- textDecoration：文本装饰
- fontFamily：字体
- maxLines：最大行数
- overflow：文本溢出
- softWrap：是否自动换行

```kotlin
Text(text = stringResource(
  id = R.string.app_name), // 获取string资源
  modifier = Modifier
    .background(MaterialTheme.colorScheme.primary)
    .padding(16.dp),
    textAlign = TextAlign.Center,
    color = MaterialTheme.typography.bodyMedium.color,
    fontSize = MaterialTheme.typography.bodyMedium.fontSize,
    fontWeight = MaterialTheme.typography.bodyMedium.fontWeight,
    fontStyle = MaterialTheme.typography.bodyMedium.fontStyle
)
```

### buildAnnotatedString

`buildAnnotatedString` 是 Jetpack Compose 中的一个功能，它允许你创建一个富文本字符串，也就是说，你可以在同一个字符串中应用多种样式。这对于需要在文本中使用多种字体、颜色、样式或点击事件的情况特别有用。

> 在 Android 开发中，AnnotatedString 类似于传统 Android API 中的 SpannableString，它使你能够构建包含样式和元数据的字符串。

#### 如何使用 buildAnnotatedString？

你可以使用 buildAnnotatedString 函数来构建一个 AnnotatedString 实例，然后将其传递给 Compose UI 中的 Text 组件。在这个构建过程中，你可以使用 withStyle 来应用不同的样式。

```kotlin
val text = buildAnnotatedString {
    withStyle(style = SpanStyle(color = Color.Red)) {
        append("红色")
    }
    append(" 和 ")
    withStyle(style = SpanStyle(fontWeight = FontWeight.Bold, color = Color.Blue)) {
        append("蓝色加粗")
    }
    append(" 文本")
}

Text(text = text)
```

#### 使用场景

- 混合样式的文本： 当你需要在单个文本组件中显示多种样式时。
- 添加点击事件： 可以为文本的特定部分添加点击事件。
- 局部字体样式： 为文本的特定部分应用不同的字体或字体样式

### 文本选中

文本默认是不可选中的，你可以添加一个`SelectionContainer`组件来使文本可选中。

```kotlin
SelectionContainer { // [!code ++]
    Text(text = "Hello, World!")
    Text(text = "Hello, World!")
    Text(text = "Hello, World!")
} // [!code ++]
```

如果你想这个容器中某个元素不会被选中，可以使用`DisableSelection`组件。

```kotlin ml [-- {3} | ++ {4-6}]
SelectionContainer {
    Text(text = "Hello, World!")
    Text(text = "Hello, World!")
    DisableSelection {
        Text(text = "Hello, World!")
    }
    Text(text = "Hello, World!")
}
```