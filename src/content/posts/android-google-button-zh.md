---
title: 制作一个谷歌按钮-安卓端
description: 谷歌按钮-安卓端
publishDate: 2023-01-23
duration: 7分钟
heroImage: /images/blog/google-button-blog.png
authors: Avenue-opposites
tags: [Android, Jetpack Compose]
lang: zh-CN
---

## 介绍

我将使用Jetpack Compose制作一个简单的谷歌按钮。

## 步骤

1. 创建一个`SocialButton`组件

```kotlin
@Composable
fun SocialButton(
  iconId: Int,
  socialName: String,
  loadingText: String,
) {
  var isClicked by remember { mutableStateOf(false) }
  // ...
}
```

2. 添加一个`Surface`组件作为容器

```kotlin
Surface(
  modifier = Modifier
            .background(
                Color.White,
                RoundedCornerShape(4.dp)
            ), // 添加背景颜色和圆角形状
  shape = RoundedCornerShape(4.dp), // 设置圆角，因为要让按钮变得更圆滑
  border = BorderStroke(
            width =  1.dp,
            color = Color.LightGray
        ), // 设置边框和颜色
  onClick = { isClicked = !isClicked } // 点击事件
) {
  // ...
}
```

3. 添加一个`Row`组件，用于横向排列

```kotlin
Row(
  modifier = Modifier
        .padding(
            start = 12.dp,
            end = 16.dp,
            top = 12.dp,
            bottom = 12.dp
        ) // 设置内边距
        .animateContentSize(
          animationSpec = tween(
            durationMillis = 300, // 动画时长
              easing = LinearOutSlowInEasing // 动画效果
            )
        ), // 设置尺寸变化时自动应用动画过渡
  verticalAlignment = Alignment.CenterVertically, // 垂直居中
  horizontalArrangement = Arrangement.Center // 水平居中
) {
    // ...
}
```

4. 添加一个`Icon`组件，用于显示Logo图标

```kotlin
Icon(
  painter = painterResource(id = iconId), // 设置图标资源
  contentDescription = "icon",
  tint = Color.Unspecified // 不指定颜色，使用图片本来的颜色
)
```

5. 添加一个`Spacer`组件和一个`Text`组件，用于分隔显示文本

```kotlin
Spacer(modifier = Modifier.width(8.dp))
Text(
  text = if (isClicked) loadingText else "Sign Up with $socialName",
  style = MaterialTheme.typography.bodyMedium,
  color = MaterialTheme.colorScheme.onSurface
)
```

> 需要在组件上加@ExperimentalMaterial3Api注解

6. 添加一个`CircularProgressIndicator`组件，用于显示加载图标

```kotlin
if(isClicked) {
  Spacer(modifier = Modifier.width(16.dp))
  CircularProgressIndicator(
    modifier = Modifier.size(16.dp),
    strokeWidth = 2.dp,
    color = MaterialTheme.colorScheme.primary
  )
}
```

### 预览组件

```kotlin
@ExperimentalMaterial3Api
@Preview
@Composable
fun SocialButtonPreview() {
  SocialButton(
    iconId = R.drawable.google_logo,
    socialName = "Google",
    loadingText = "Creating Account..."
  )
}
```

![google-button-preview](/images/blog/google-button-preview.png)

## 完整代码

```kotlin
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.LinearOutSlowInEasing
import androidx.compose.animation.core.tween
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.firstjetpack.R

@ExperimentalMaterial3Api
@Composable
fun SocialButton(
    iconId: Int,
    socialName: String,
    loadingText: String,
) {
    var isClicked by remember { mutableStateOf(false) }

    Surface(
        modifier = Modifier
            .background(
                Color.White,
                RoundedCornerShape(4.dp)
            ),
        shape = RoundedCornerShape(4.dp),
        border = BorderStroke(
            width =  1.dp,
            color = Color.LightGray
        ),
        onClick = { isClicked = !isClicked }
    ) {
        Row(
            modifier = Modifier
                .padding(
                    start = 12.dp,
                    end = 16.dp,
                    top = 12.dp,
                    bottom = 12.dp
                )
                .animateContentSize(
                    animationSpec = tween(
                        durationMillis = 300,
                        easing = LinearOutSlowInEasing
                    )
                ),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            Icon(
                painter = painterResource(id = iconId),
                contentDescription = "icon",
                tint = Color.Unspecified
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = if (isClicked) loadingText else "Sign Up with $socialName",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurface
            )
            if(isClicked) {
                Spacer(modifier = Modifier.width(16.dp))
                CircularProgressIndicator(
                    modifier = Modifier.size(16.dp),
                    strokeWidth = 2.dp,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }
    }
}

@ExperimentalMaterial3Api
@Preview
@Composable
fun SocialButtonPreview() {
    SocialButton(
        iconId = R.drawable.google_logo,
        socialName = "Google",
        loadingText = "Creating Account..."
    )
}
```