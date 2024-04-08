---
title: 从零开始了解 GitHub Actions 🚀
description: GitHub Actions 是一种持续集成和持续交付 (CI/CD) 平台，可用于自动执行生成、测试和部署管道。 您可以创建工作流程来构建和测试存储库的每个拉取请求，或将合并的拉取请求部署到生产环境。
publishDate: 2024-02-12
duration: 5min
authors: Avenue-opposites
tags: [Github Actions]
lang: zh-CN
---

## 基本概念

### 工作流

工作流程是一个可配置的自动化过程，它将运行一个或多个作业，工作流程在存储库的`.github/workflows`目录中定义，存储库可以有多个工作流程，每个工作流程都可以执行不同的任务集。例如，提交代码的时候可以运行测试、构建和部署。

```bash
mkdir .github .github/workflows
```

> 详细信息请看这里[GitHub Actions 工作流程](https://docs.github.com/zh/actions/using-workflows).

### 事件

事件是一种触发器，可用于触发工作流程。例如，当提交代码时，工作流程会运行测试和构建。

```yaml
# 在 `pull_request` 事件时触发
on: [pull_request]
```

> 详细信息请看这里[GitHub Actions 事件](https://docs.github.com/zh/actions/using-workflows/events-that-trigger-workflows).

### 作业

作业是一个或多个任务集。例如，当提交代码时，工作流程会运行测试和构建。一个作业分别有多个步骤，每个步骤都可以执行不同的命令。

```yaml
# 创建一个名为 `build` 的作业
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
```

> 详细信息请看这里[GitHub Actions 作业](https://docs.github.com/zh/actions/using-workflows/defining-workflows).

## 使用方式

在工作目录下创建一个 `.github/workflows` 目录，将工作流程定义放在其中。然后，在该目录中创建一个`.yaml`文件，文件名为工作流程名称。

```yaml
name: CI
# 定义工作流程的描述
run-name: ${{ github.actor }} is testing out GitHub Actions 🚀
# 定义工作流程的触发器
on: [push]
jobs:
  # 定义构建作业 `build`
  build:
    # 定义作业的虚拟机运行环境，这里使用 Ubuntu最新版本
    runs-on: ubuntu-latest
    steps:
      # 定义步骤 `checkout`
      - name: Checkout
        # 检出仓库
        uses: actions/checkout@v3
      # 定义步骤安装 `node`
      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
      # 定义步骤安装依赖
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
```

然后在 GitHub 上点击按钮 `Create workflow dispatch`，选择 `push` 触发器，选择 `build` 作业。