---
title: Jetpack Compose 文本输入框
description: Jetpack Compose 了解文本输入框
publishDate: 2023-01-19
duration: 10分钟
authors: Avenue-opposites
tags: [Jetpack Compose, Text Field]
lang: zh
---

## Jetpack Compose 文本输入框

在 Jetpack Compose 中，文本输入框是通过 TextField 组件实现的。TextField 是一个用于输入和编辑文本的可组合函数，提供了丰富的定制选项来适应不同的用途和样式需求。

### 基本使用

基本的 `TextField` 只需要几个参数：value 和 onValueChange。`value` 表示输入框的当前文本，`onValueChange` 是一个当文本改变时被调用的回调函数。`enabled` 表示输入框是否可用。`readOnly` 表示输入框是否只读。`placeholder` 表示输入框的占位文本。

```kotlin
@ExperimentalMaterial3Api
@Composable
fun TextFieldDemo() {
  var text by remember { mutableStateO("") }
  TextField(
      value = text,
      onValueChange = { text = it },
      enabled = true,
      readOnly = false,
      placeholder = { Text(text = "Placeholder", color = Color.Gray) },
  )
}
```

在这个例子中，text 变量存储了输入框的当前值。每当用户输入文本时，onValueChange 回调会更新这个变量。

### 定制 TextField

**TextField** 组件可以通过各种参数来定制，包括：
- `label`：显示在输入框上方或内部的标签。
- `colors`：用于定制输入框颜色的参数。
- `modifier`：用于修改输入框的大小、形状、边距等样式。
- `singleLine`：是否将输入框限制为单行。
- `maxLines`：限制输入框的最大行数。
- `interactionSource`：用于控制输入框的交互状态。
- `shape`：输入框的形状。
- `visualTransformation`：用于修改输入框的可视转换方式。
- `keyboardOptions`：用于修改输入框的键盘选项。
- `keyboardActions`：用于处理键盘操作的回调函数。
- `autofill`:：用于设置输入框的自动填充选项。
- `leadingIcon`：用于设置输入框前面的图标。
- `trailingIcon`：用于设置输入框后面的图标。

#### 预览

![自定义 TextField 预览](/images/note/custom-text-field-preview.png)

```kotlin
@Composable
@Composable
fun CustomSingleLineTextField(
    defaultValue: String = "",
    onValueChange: (String) -> Unit,
    leadingIcon: Int? = null,
    trailingIcon: Int? = null,
) {
    var shape = RoundedCornerShape(8.dp)

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(60.dp)
            .background(Color.White, shape)
            .border(2.dp, MaterialTheme.colorScheme.primary, shape)
    ) {
        Row (
              modifier = Modifier
                .fillMaxSize()
                .padding(8.dp),
              verticalAlignment = Alignment.CenterVertically
            ) {
                if (leadingIcon !== null)
                    Icon(
                        modifier = Modifier.weight(0.5f),
                        painter = painterResource(id = leadingIcon),
                        contentDescription = "leading icon"
                    )
                BasicTextField(
                    modifier = Modifier.weight(6f),
                    value = defaultValue,
                    onValueChange = onValueChange,
                    singleLine = true,
                    textStyle = MaterialTheme.typography.bodyMedium,
                )
                if (trailingIcon !== null)
                    Icon(
                        modifier = Modifier.weight(0.5f),
                        painter = painterResource(id = trailingIcon),
                        contentDescription = "trailing icon"
                 )
      }
    }
}
```

### 密码输入框

要创建一个密码输入框，你可以使用 `VisualTransformation` 参数。例如，使用 `PasswordVisualTransformation` 来隐藏输入的文本。

```kotlin
TextField(
    value = text,
    onValueChange = { text = it },
    visualTransformation = PasswordVisualTransformation() // [!code ++]
)
```