## runcode

在线运行代码编辑器

语言支持度

- C++ 11

- Java

- Rust lts

- Nodejs lts

- Go lts

- Python3

- php

代码格式化支持

- C++

- C

- Java

- Nodejs

## 开发

前置条件

nodejs > 14.17.0

包管理工具 pnpm 安装

```sh
npm install pnpm -g
```

### server

koa + typescript + dockerode

1. 构建镜像

前置条件, 安装了 docker

未构建的镜像, 在编辑器里 run 代码时会报镜像 404, 所以开发过程中无需全部构建, 构建需要的语言环境即可

- 构建 C++ 镜像

  ```bash
    cd server/src/docker/cpp
    docker build -t cpp:11 .
  ```

- 构建 rust 镜像

  ```bash
    cd server/src/docker/rust
    docker build -t rust:lts .
  ```

- 构建 python3 镜像

  ```bash
    cd server/src/docker/python3
    docker build -t python:3 .
  ```

- 构建 go 镜像

  ```bash
    cd server/src/docker/go
    docker build -t go:lts .
  ```

- 构建 nodejs 镜像

  ```bash
    cd server/src/docker/nodejs
    docker build -t nodejs:lts .
  ```

- 构建 java 镜像

  ```bash
    cd server/src/docker/java
    docker build -t java:lts .
  ```

- 构建 php 镜像

  ```bash
    cd server/src/docker/php
    docker build -t php:8 .
  ```

2. 安装依赖

   ```sh
   cd server
   pnpm i
   ```

3. 启动

   ```sh
   pnpm dev
   ```

### client

vite + react + typescript + tailwindcss + daisyui + mobx + monaco-editor

1. 安装依赖

   ```sh
   cd client
   pnpm i
   ```

2. 编译 tailwindcss

   ```sh
   # 启动后另开终端启动服务
   pnpm build:tailwind:watch
   ```

3. 启动服务

   ```sh
   # 起开发环境,需要起 server
   pnpm dev
   # 起生产环境
   pnpm prod
   ```

## commit 规范

- feat：新功能（feature）
- fix：修补 bug
- docs：文档（documentation），只改动了文档部分
- style： 格式（不影响代码运行的变动），例如去掉空格、改变缩进
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
- test：添加测试或者修改现有测试
- chore：构建过程或辅助工具的变动
- perf：提高性能的改动
- ci：自动化流程配置修改、与 CI（持续集成服务）有关的改动
- revert：回滚到上一个版本，执行 git revert 打印的 message
