---
title: JavaScript Notification API
description: 一个发送消息通知的API
duration: 10分钟
publishDate: 2023-07-13
authors: Avenue-opposites
toc: true
tags: [Web-API, Notification]
lang: zh-CN
---

## 介绍

这个API可以向用户发送桌面通知，可在Web worker中使用。

## 基本使用

### requestPermission方法

首先需要请求用户允许通知,调用`Notification.requestPermission`方法
这个方法返回一个Promise对象,其结果为一个字符串，表示用户的选择。

> 当用户同意请求之后就可以一直发送通知，不必每次都请求了。

这个字符串有3种状态:
1. granted(*准予*)
2. denied(*拒绝*)
3. default(*默认*)

```js
Notification.requestPermission().then((status) => {
  if (status === "granted") {
    //...
  }else if(status === "denied") {
    //...
  }else {
    //...
  }
})
```

### maxActions属性

一个表示用户代理和设备可以向用户发出通知操作的最大数量的整数。

```js
Notification.maxActions
```

### permission属性

表示当前用户是否授予当前页面显示通知的权限。

```js
Notification.permission
```

___

## notification对象

在用户同意通知之后，就可以创建通知，
一个notification的实例就代表一条通知。
它有两个参数，分别是通知标题和配置（可选）。

### 参数介绍

*title*
- 通知的标题，显示在通知的顶部。

*options*
- dir：显示通知的方向。默认值为auto。可设置为ltr（从左到右）或者rtl（从右到左）。
- lang：通知的语言。
- badge：通知的图标URL，当没有足够的空间来显示通知本身时显示。
- body：通知的内容。
- tag：通知的识别标签。
- icon：要在通知中显示的图标的URL。
- data：和通知有关的事件，可以是任何数据类型。
- vibrate：一个振动模式，通知设备振动。
- renotify：新通知替换旧通知后是否通知用户，默认值为false。
- requireInteraction：表示通知是否保持一直存在，直到用户点击或关闭它，默认值为false。
- silent：表示通知是否是无声的，即不会发出声音和振动，默认值为false。
- sound：触发通知时播放的音频文件的URL。
- noscreen：触发通知时是否启用设备的屏幕，默认值为false。
- sticky：指明通知是否应该是“粘”, 即不易被用户清理。默认值为false。

**触发一个简单的通知。**

请求通知的权限，并显示通知。

<button id="request" class="daisy-btn daisy-btn-outline daisy-btn-accent">
  Request permission
</button>

<!-- 点击请求通知权限 -->
<script>
  const request = document.getElementById("request")

  request.addEventListener("click", () => {
    Notification.requestPermission().then(status => {
      if(status === "granted") {
        alert("权限已获得")
      }else if(status === "denied") {
        alert("权限已拒绝")
      }else {
        alert("默认未知权限")
      }
    })
  })
</script>

点击按钮，触发通知。

<button id="trigger" class="daisy-btn daisy-btn-outline daisy-btn-primary">
  Click me
</button>

<!-- 点击触发通知 -->
<script>
  const trigger = document.getElementById("trigger")
  const title = "Hello, World!"
  const options = {
    body: "这是一个简单的通知",
  }
  trigger.addEventListener("click", () => {
    const notification = new Notification (title, options)
    notification.addEventListener("click", () => {
      window.open("https://github.com/Avenue-opposites", "_blank")
      notification.close()
    })
    }
  )
</script>

```js
const notification = new Notification(title, options);
```

### actions属性

提供了可供用户选择的以与通知交互的操作。

```js
notification.actions
```

### timestamp属性

通知的时间戳可以表示创建通知的事件的时间（自 1970 年 1 月 1 日 00:00:00 UTC 时间以来的毫秒数），或者它可以是你希望与通知相关联的任意时间戳。
例如，一个即将召开的会议的时间戳可以设置在未来，而一条错过的消息的时间戳可以设置在过去。

```js
notification.timestamp
```

### close方法

用于关闭当前通知。

```js
notification.close()
```

## notification事件

notification对象有4种事件，
分别是click、close、error、show事件。
有两种设置事件的方式分别是addEventListener方法和设置onEvent属性

### click事件

这是点击通知事件。

```js
  notification.addEventListener("click", callback)
  //or
  notification.onClick = function(event) {
    //..
  }
```

### close事件

这是点击通知关闭事件。

```js
  notification.addEventListener("close", callback)
  //or
  notification.onClose = function(event) {
    //..
  }
```

### error事件

这是通知调用出错事件。

```js
  notification.addEventListener("error", callback)
  //or
  notification.onError = function(event) {
    //..
  }
```

### show事件

这是显示通知时触发的事件。

```js
  notification.addEventListener("show", callback)
  //or
  notification.onShow = function(event) {
    //..
  }
```