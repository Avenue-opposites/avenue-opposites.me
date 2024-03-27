---
title: Jetpack Compose 状态和重组
description: Jetpack Compose学习笔记
publishDate: 2023-01-17
duration: 5分钟
authors: Avenue-opposites
tags: [Jetpack Compose, State, Recomposition]
lang: zh-CN
---

## 什么是Jetpack Compose?

Jetpack Compose是一个声明式UI框架，这意味着你描述UI应该是什么样子的，而不是如何变更它。在传统的命令式UI编程中，你需要明确指出当数据改变时应该如何更新UI。但在Jetpack Compose中，你只需声明UI应如何根据当前的状态来展现，然后Compose框架会处理状态变化时的UI更新。

## 必须了解的常用注解（Common Annotations）

在学习之前有必要了解Compose的两个常用注解。

### @Composable

添加@Composable注解可以将函数作为组件(可组合函数)，类似前端React中的函数组件。

```kotlin
@Composable
fun MessageCard(message: String) {
    Text("Send $message.")
}
```

### @Preview

添加@Preview注解可以预览可组合函数（可以不用启动Android虚拟机），
该注解必须用于不接受参数的可组合函数。

```kotlin
@Preview
@Composable
fun PreviewMessageCard() {
    MessageCard("Hello from Preview!")
}
```

## 重组（Recomposition）

### 概念

当状态（state）发生变化时，Compose会重新执行那些依赖于这些状态的组件。
这个过程被称为重组。重组的关键点在于，只有那些需要更新的部分会被重新绘制。
这与整个UI布局进行重新加载的传统方法不同，它更高效，因为只有实际需要变更的部分才会被处理。

> 假设你有一个显示文本的Text组件，这个文本依赖于某个状态变量。当这个状态变量改变时（比如，用户输入的文本），只有这个Text组件会被重组。其他不依赖于这个状态的UI部分不会被重新绘制。

## 状态（State）

在Jetpack Compose中，状态（State）是一个核心概念。
状态是用来保存应用的数据，并在数据变化时更新UI的机制。
理解和正确使用状态对于构建响应式和高效的Compose应用至关重要。

> 你可以理解为前端中React的useState和Vue中的ref创建的状态变量。

### 状态的类型
在Jetpack Compose中，状态通常可以分为两类：

- 不可变状态：这是一种简单的状态，通常用于读取值而不需要更改它。例如，一个字符串或一个数字，这些值在应用的生命周期内保持不变。
- 可变状态：这是更常见的状态类型，用于当状态的值需要随着用户交互或其他事件而变化。在Compose中，你通常会使用诸如[mutableStateOf](https://developer.android.com/reference/kotlin/androidx/compose/runtime/package-summary?hl=zh-cn#mutableStateOf(kotlin.Any,androidx.compose.runtime.SnapshotMutationPolicy))这样的函数来创建可变状态。

### 创建和使用状态

使用Compose时，创建状态的一个常见方法是使用`mutableStateOf`函数。
这个函数创建一个可观察的状态对象，当对象的值改变时，依赖于这个状态的Composable函数会重新执行（重组）。

#### mutableStateOf函数

用来创建一个可变的状态。

```kotlin
@Composable
fun MyComponent() {
    val count = remember { mutableStateOf(0) } // 创建一个可变状态, 并记住它 // [!code focus]
    Button(onClick = { count.value++ }) {
        Text("Count: ${count.value}")
    }
}
```

#### remember函数

[remember](https://developer.android.com/reference/kotlin/androidx/compose/runtime/package-summary?hl=zh-cn#remember(kotlin.Function0))用于在Composable函数重组时保持状态。
如果不使用`remember`，每次Composable函数重组时，都会创建一个新的状态实例，这会导致之前的状态丢失，并且状态变化不会反映在UI上。
通常和mutableStateOf函数配合使用。

```kotlin
    var count = remember { mutableStateOf(0) } // MutableState<Int>
    // or
    var count by remember { mutableStateOf(0) } // Int
```

> 使用委托属性（by）可以更简洁直接地访问和修改状态值，因为你可以直接使用变量名而不需要每次都指定.value