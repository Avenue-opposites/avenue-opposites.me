---
title: HTTP状态码
description: 一篇学习HTTP状态码的博客
duration: 3分钟
publishDate: 2023-11-17
heroImage: /images/blog-placeholder-1.jpg
tags: [HTTP, Status]
lang: zh-CN
---

## 介绍

这篇笔记是一个HTTP状态码的解释。HTTP状态码是HTTP协议的一部分，它是用来描述HTTP请求的状态。HTTP状态码的分为5个类型，对应1xx~5xx之间的状态码。

### 1xx信息性状态码

表示请求被接收,继续处理。

常见的有:
- 100 Continue、
- 101 Switching Protocols

### 2xx成功状态码

表示请求被成功接收、理解、接受

常见的有:
- 200 OK 请求成功
- 201 Created 资源被创建
- 204 No Content 请求成功但无内容返回
- 206 Partial Content 表示获取部分资源

### 3xx重定向状态码

表示请求的资源被转移到了别的URI

- 301 Moved Permanently 永久重定向
- 302 Found 临时重定向
- 303 See Other 参见其他地址
- 304 Not Modified 资源未修改

### 4xx客户端错误状态码

表示请求包含错误语法或无法实现

- 400 Bad Request 请求报文语法错误
- 401 Unauthorized 请求需要身份认证
- 403 Forbidden 服务器拒绝访问
- 404 Not Found 请求资源不存在
- 405 Method Not Allowed 方法不被允许

### 5xx服务器错误状态码

表示服务器处理请求出错

- 500 Internal Server Error 内部服务器错误
- 501 Not Implemented 服务器不支持所请求的功能
- 503 Service Unavailable 服务暂时不可用
- 504 Gateway Timeout 网关超时

记住这些状态码的含义,可以快速分析和定位HTTP请求和响应中的问题。