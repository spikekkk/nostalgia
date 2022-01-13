---
title: TypeScript
date: 2021-08-22
sidebar: auto
tags:
    - ts
categories:
    - frontend
---
## TypeScript

### 什么是typescript

### 什么是type 、 interface & 区别

interface 和 type 很像，很多场景，两者都能使用。但也有细微的差别：

`interface`类型：对象**obj**、函数**fun**两者都适用， 但是 `type` 可以用于`基础类型`、`联合类型`、`元祖`。 

- 同名合并：interface 支持，type `不支持`。
- 计算属性：`type` 支持, interface 不支持。

总的来说，`公共`的用 `interface` 实现，不能用 interface 实现的再用 type 实现。

主要是一个项目最好保持一致。 

### 什么是泛型

泛型就是把类型当成参数;编写模板代码来适应任意类型

泛型的好处是使用时不必对类型进行强制转换，它通过编译器对类型进行检查

### TS 如何编译的

- **vscode 自动编译ts文件的方式**
    - 先 在项目文件根目录中运行 `tsc --init`
    *此步骤会自动生成一个sconfig.json 文件*
    - *打开tsconfig.json文件修改和删除相应配置（如果想快速修改配置，请复制下列配置），不配置也可以直接使用默认配置*
    - 点击 VScode 上方菜单栏的 终端——运行任务——tsc:监视-tsconfig.json
- 源码编译
    - **Scanner 扫描器**（`scanner.ts`）
    - **Parser 解析器**（`parser.ts`）
    - **Binder 绑定器**（`binder.ts`）
    - **Checker 检查器**（`checker.ts`）
    - **Emitter 发射器**（`emitter.ts`）

### 介绍一下 d.ts 快速编写第三方包的类型声明

[https://juejin.cn/post/6987735091925483551](https://juejin.cn/post/6987735091925483551)

类型定义文件d.ts(`TypeScript Declaration File`)，轻松让你的JavaScript也能支持定义静态类型

基于 Typescript 开发的时候，很麻烦的一个问题就是类型定义。导致在编译的时候，经常会看到一连串的找不到类型的提示。“d.ts”文件用于为 TypeScript 提供有关用 JavaScript 编写的 API 的类型信息。简单讲，就是你可以在 ts 中调用的 js 的声明文件。TS的核心在于静态类型，我们在编写 TS 的时候会定义很多的类型，但是主流的库都是 JS编写的，并不支持类型系统。这个时候你不能用TS重写主流的库，这个时候我们只需要编写仅包含类型注释的 d.ts 文件，然后从您的 TS 代码中，可以在仍然使用纯 JS 库的同时，获得静态类型检查的 TS 优势。在此期间，解决的方式经过了许多的变化，从 [DefinitelyTyped](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2F~types) 到 [typings](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftypings%2Ftypings)。最后是 [@types](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2F~types)。在 Typescript 2.0 之后，推荐使用 [@types](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2F~types) 方式。