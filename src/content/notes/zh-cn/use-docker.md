---
title: Docker的基础使用
description: 了解如何使用Docker
publishDate: 2024-04-30
duration: 10分钟
tags: [Docker, Dockerfile]
toc: true
lang: zh-CN
---

## 什么是Docker？

Docker是一种容器化平台，它允许开发者打包应用程序及其所有依赖项（如库、工具、配置文件等）到一个独立的、可移植的容器中。这个容器可以在任何支持Docker的环境中运行，而不需要担心环境差异或依赖项冲突的问题。

### 基本概念

#### 容器

Docker 容器是由镜像创建的运行实例，它可以被启动、停止、删除和重启。可以将容器视为正在运行的应用程序的具体实例，类似虚拟机。

#### 镜像

Docker 镜像是一个只读的模板，其中包含了运行容器所需的所有文件、配置、库和依赖项。
镜像通常是通过**Dockerfile**文件定义的，该文件包含了创建镜像所需的步骤和指令。使用`docker build`命令可以根据**Dockerfile**构建镜像。
镜像是静态的，一旦构建完成，就不会改变，除非显式地对其进行更新或修改。

一句话来说，镜像是创建容器的模板，容器则是实际运行的实例。

## 下载Docker

> macOS可以使用[Homebrew](https://brew.sh/)进行下载，运行`brew install --cask docker`即可。

Docker官方提供了[下载页面](https://www.docker.com/get-started/)。

## 使用Docker

### 常用命令

- `docker --version`：查看Docker版本
- `docker ps`：查看正在运行的容器，如`docker ps -a`可以查看所有容器（包括停止的）
- `docker stop  <container_id>`：停止一个正在运行的容器
- `docker start  <container_id>`：启动一个停止的容器
- `docker rmi  <image_name|image_id>`：删除一个指定的镜像
- `docker rm  <container_id>`：删除一个指定的容器
- `docker images`：查看本地所有的镜像
- `docker build <Dockerfile-path>`：构建一个镜像
- `docker run <image_name>`：根据镜像创建并启动一个容器，如果镜像不存在，则会自动构建。
- `docker push <image_name>`：将一个镜像推送到Docker Hub
- `docker pull <image_name>`：从Docker Hub拉取一个镜像
- `docker login`：登录Docker Hub
- `docker logout`：退出Docker Hub
- `docker tag <image_name|image_id> <tag>`：将一个镜像推送到Docker Hub

更多命令请参考[docker-cli](https://docs.docker.com/engine/reference/commandline/)

### Dockerfile文件

Dockerfile文件定义了创建镜像所需的步骤和指令。

Dockerfile文件中的常用指令：
  - `FROM`：指定基础镜像
  - `COPY`：复制文件到容器
  - `RUN`：执行命令
  - `CMD`：设置容器启动时执行的命令
  - `ENTRYPOINT`：指定默认可执行文件。
  - `WORKDIR`：设置工作目录
  - `EXPOSE`：暴露端口
  - `ENV`：设置环境变量

示例：

```dockerfile
# 从node:<version>-alpine镜像构建，alpine是一个轻量级的Linux发行版
FROM node:20-alpine
# 复制当前目录下的所有文件到app目录
COPY . /app
# 设置工作目录为app目录
WORKDIR /app
# 安装依赖
RUN npm install
# 在中命令行中运行`node index.js`
CMD node index.js
```

> [官方Docerfile文档](https://docs.docker.com/reference/dockerfile/)