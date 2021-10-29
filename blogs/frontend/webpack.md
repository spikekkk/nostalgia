---
title: webpack从入门到放弃
date: 2021-09-09
tags:
 - webpack
categories: 
 - frontend
---


![webpack](/blogs/frontend/webpackImg/webpack.png)

## webpack是什么

前端构建工具,`静态模块打包器`

## webpack 5 核心概念

## entry

入口指示webpack从哪个文件入口起点开始打包,分析构建内部依赖图

## output

输出  指webapck打包后得资源bundles输出到哪里去,以及如何命名

## loader

Loader让webpack能够去处理哪些非JavaScript文件(webpack自身只理解JavaScript)

## plugins

plugins可以用于执行范围更广的任务.插件范围包括,从打包优化和压缩.一直到重新定义环境中的变量等等

## Mode

模式mode—>指示webpack使用相应模式的配置

`development` —>将process.env.NODE_ENV的值设定development

- 启动NamedChunksPlugin和NamedModulesPlugin
- 能够让代码在本地调试中运行的环境

`production`

将process.env.NODE_ENV的值设定production

- 优化代码线上环境

# 环境搭建

1. `npm init`
2. `npm i webpack webpack-cli -g` 
**不建议使用全局安装方式—不利于多个项目版本共存管理**
3. 安装到开发环境
`npm i webpack webpack-cli -D`

```jsx
1. 运行指令:
  开发环境: webpack ./src/index.js -o ./build/build.js --mode=development
  webpack 会以./src/index.js 为入口文件开始打包,打包后输出到 ./build/build.js
  真题打包环境是-->开发环境
  生产环境: webpack ./src/index.js -o ./build/build.js --mode=production
  webpack 会以./src/index.js 为入口文件开始打包,打包后输出到 ./build/build.js
  真题打包环境是-->生产环境
1.1 webpack 5执行：webpack --entry ./src/index.js -o ./build/built.js --mode=development

2. 结论
  1. webpack能处理js/json资源,不能处理css/img等其他资源
  2. 生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化
  3. 生产环境比开发环境多了一个压缩JS代码

```

## 安装指定版本webpack

`npm install webpack@4 webpack-cli@3 -d`

# webpack的问题

1. 不能编译打包 css、img 等文件。
2. 不能将js 的 es6 基本语法转化为 es5 以下语法

### 如何解决?

使用plugins

# webpack打包样式(CSS/IMG)资源

> 所有的前端打包工具都是基于`Nodejs`进行的,全部采用`commonjs`模块化引入配置
> 

## 创建配置文件webpack.config.js

1. 安装css-loader style-loader less-loader less 

`npm i css-loader style-loader less-loader less -D`

1. webpack 4版本安装指定版本

`npm install webpack@4 webpack-cli@3 -d`

1. 安装webpack4 版本下的less &loader

`npm install less@3 less-loader@5 -D`

1. 在rules中使用配置

## 修改webpack基本配置

```jsx
/*
webpack.config.js webpack的配置文件
作用:指示webpack干哪些活(当运行webpack,会调用config进行打包编译)

所有构建工具都是基于node.js平台运行的   模块化默认使用common.js
*/
const { resolve } = require("path") // node 内置核心模块，用来处理路径问题。

module.exports = {
    // webpack配置
    // 入口起点
    entry: "./src/index.js",
    //输出
    output: {
        // 输出文件名
        filename: "built.js",
        // 输出路径
        // __dirname --> nodejs的变量,代表当前文件的目录据对路径-->去寻找build文件夹进行打包输出
        path: resolve(__dirname, "build"),
    },
    // loader的配置---
    module: {
        rules: [
            // 详细的loader配置
            // 不同的文件要配置不同的loader处理
            {
                // 匹配哪些文件(根据文件名进行匹配)
                test: /\.css$/,
                use: [
                    // use中方法执行顺序-->从下到上-->从右到左--->先出发css-loader
                    // 创建style标签,将js中的样式资源插入进行,添加到head中生效
                    "style-loader",
                    // 将CSS文件变成commonjs模块加载js中,里面内容是样式字符串
                    "css-loader",
                ],
            },
            // 处理less
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 优先执行less-loader-->将less文件编译成css文件给css-loader打包使用
                    "less-loader",
                ],
            },
        ],
    },
    plugins: [
        //详细的plugins的配置
    ],
    // 模式
    //生产模式 production  ---为啥不用生产模式?因为代码会被压缩就看不懂了
    mode: "development", // 开发模式
}
```

# 打包HTML资源

## 标准老五样

1. entry
2. output
3. module
4. plugins
5. mode

### loader的使用

1. npm 下载需要使用的包文件
2. module-rules-use使用—>配置loader

### plugins的使用方法

1. npm 下载相应的包(webpack4使用方式)
`npm i html-webpack-plugin@3 -D`
2. plugins中`引入`相关配置
3. 使用
`new HtmlWebpackPlugin({XXX:XXX})`

## webpack.config.js

```jsx
/* 
loader: 1. npm 下载  2. 使用配置loader rules
plugins: 1. npm 下载 2. 引入  3. 使用

*/

const { resolve } = require("path")

// 引入plugins
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname, "build"),
    },

    module: {
        rules: [
            //loader配置
        ],
    },
    plugins: [
        // plugin配置
        // 使用html-webpack-plugin
        // 功能: 默认会创建一个html文件--引入打包输出的所有资源(JS/CSS)
        // 需求:需要有结构的html文件
        new HtmlWebpackPlugin({
            //赋值'.src/index.html' 文件,并自动引入打包输出所有资源(JS/CSS)
            template: "./src/index.html",
        }),
    ],
    mode: "development",
}
```

### 执行步骤

执行的步骤：html(安装plugin:html-webpack-plugin)
1. 根据entry找到入口文件'./src/index.js'
2. 发现入口文件中引入了html文件，而html文件不是js或者json文件，去plugins数组中找到HtmlWebpackPlugin插件
3. 复制template选项中的文件，
4. 通过less-loader将less文件编译成css文件，自动引入打包输出的所有资源（JS/CSS）（`JS文件通过script标签引入，CSS文件通过link标签引入`）（`不需要自己再文件中引用js或者css文件了，否则重复引入会出问题的`）

# 打包图片资源

## 创建配置文件

1. 安装`url-loader` &`file-loader`(url-loader依赖于file-loader)
    1. 仅能处理`css`中引入的图片
    `background-image:url()`

`npm i file-loader@5 url-loader@3 -D`

1. 处理html中`img`标签引入的图片—同时需要借助urlloader的能力
    1. 安装`html-loader`(webpack4环境下教学)
    `npm i html-loader@0.5.5 -D`
2. 问题
    1. `url-loade`r使用`ES6模块化`解析,而`html-loader`引入图片是`commonjs`
    2. 解决
        1. 关闭url-loader的es6模块解析,使用commonjs解析
            
            `esModule: false`
            
3. 给图片重命名
    1. 取图片hash前十位
    2. name:'[hash:10].[ext]'
    3. [ext]—>取到文件原来的拓展名

## 配置项

```jsx
module: {
        rules: [
            // loader配置
            {
                // 处理css资源
                test: /\.less$/,
                // 要使用多个loader,使用数组形式--从右往左调用
                use: ["style-loader", "css-loader", "less-loader"],
            },
            {
                // 打包图片资源
                test: /\.(jpg|png|gif)$/,
                // 仅使用一个资源时候 -->使用一个loader
                // 下载使用两个包--url-loader file-loader
                loader: "url-loader",
                options: {
                    //当图片大小小于8Kb,就会被转为base64处理--根据你图片最小格式处理  8 9 10 *1024都可以
                    // 优点:减少请求数量,减轻服务器压力
                    // 缺点: 图片体积变大(base64的体积更大,文件请求速度慢一点)
                    limit: 8 * 1024,
                },
            },
        ],
    },
```

1. 仅仅使用一个资源的时候,可以`不用use`--使用`loader`既可以

```jsx
仅使用一个资源时候 -->使用一个loader
下载使用两个包--url-loader file-loader
loader: "url-loader",
```

1. 设置图片最小体积—打包为base64加载
    1. 减轻服务器压力
    2. 文件转译为base64图片体积变大,加载速度变慢
    3. `limit限制可以自由定义`—根据当前项目图片最小体积定义即可

```jsx
  {
                // 打包图片资源
                test: /\.(jpg|png|gif)$/,
                // 仅使用一个资源时候 -->使用一个loader
                // 下载使用两个包--url-loader file-loader
                loader: "url-loader",
                options: {
                    //当图片大小小于8Kb,就会被转为base64处理--根据你图片最小格式处理  8 9 10 *1024都可以
                    // 优点:减少请求数量,减轻服务器压力
                    // 缺点: 图片体积变大(base64的体积更大,文件请求速度慢一点)
                    limit: 8 * 1024,
                },
            },
```

## webpack.config.js

```jsx
const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname, "build"),
    },
    module: {
        rules: [
            // loader配置
            {
                // 处理css资源
                test: /\.less$/,
                // 要使用多个loader,使用数组形式--从右往左调用
                use: ["style-loader", "css-loader", "less-loader"],
            },
            {
                //问题:处理不了html中的img图片
                // 打包图片资源
                test: /\.(jpg|png|gif)$/,
                // 仅使用一个资源时候 -->使用一个loader
                // 下载使用两个包--url-loader file-loader
                loader: "url-loader",
                options: {
                    //当图片大小小于8Kb,就会被转为base64处理--根据你图片最小格式处理  8 9 10 *1024都可以
                    // 优点:减少请求数量,减轻服务器压力
                    // 缺点: 图片体积变大(base64的体积更大,文件请求速度慢一点)
                    limit: 8 * 1024,
                    // 问题:url-loader使用ES6模块化解析,而html-loder引入图片是commonjs
                    // 解析时候出现问题: [object Module]
                    // 解决:关闭url-loader的es6模块解析,使用commonjs解析
                    esModule: false,
                    name: "[hash:10].[ext]",
                },
            },
            {
                test: /\.html$/,
                // 处理html文件中的img图片(负责引入img,从而能被url-loder进行处理)
                loader: "html-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    mode: "development",
}
```

# 打包其他资源

不需要优化压缩的资源,只需要原样输出即可

## webpack.config

```jsx
const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname, "build"),
    },
    module: {
        rules: [
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            // 打包其他资源(除了html/js/css以外的资源)
            {
                // exclude 排除主要资源
                exclude: /\.(css|js|html)$/,
                loader: "file-loader",
// 对打包的名字进行简写
options:{  name: "[hash:10].[ext]"}

            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    mode: "development",
}
```

1. 使用exclude排除其他主要资源
2. loader使用file-loader进行加载即可

# devServer

热部署—自动部署

## 安装webpack-dev-server

1. webpack4的特殊版本
    
    `npm i webpack-dev-server@3 -D`
    
2. 启动(本地启动)
`npx webpack-dev-server`

## webpack.config

1. 监听打包后的目标路径
2. 设置port端口号
3. 启动gzip压缩

```jsx
 //开发服务器devServer:用来自动化(自动化编译,自动打开浏览器,自动刷新浏览器等)
    // 特点:只会在内存中编译打包,不会有任何输出
    // 启动 devServer 指令: npx webpack-dev-server
    devServer: {
        //监听项目构建后的路径
        contentBase: resolve(__dirname, "build"),
        //启动gzip压缩(使得打包后的代码体积更小)
        compress: true,
        //端口号
        port: 3000,
        //自动打开浏览器
        open: true,
    },
```

1. 直接执行 `npx webpack-dev-server`
    1. build文件不会有打包的内容
    2. 仅仅在内存中打包文件输出
    3. 运行 npx commandname 会自动地在项目的 `node_modules` 文件夹中`找`到命令的`正确引用`，而无需知道确切的路径，也不需要在全局和用户路径中安装软件包

# 生产环境基本配置

## 提取CSS成单独文件

### 下载安装包

`npm i mini-css-extract-plugin@0.9.0 -D`

### 修改配置文件

1. 引入 
    
    ```jsx
    const MiniCssExtractPlugin = require("mini-css-extract-plugin")
    
    ```
    
2. 配置plugins

    
    ```jsx
    plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
            new MiniCssExtractPlugin({
                // 对应输出的css文件进行重命名--新增一个文件夹目录存放
                filename: "css/built.css",
            }),
        ],
    ```
    

### webpack.config.js

```jsx
const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/built.js",
        path: resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 创建style标签,将样式放入

                    //"style-loader",
                    // 使用minicssextractplugin取代style-loader
                    // 作用:提取js中的css成为耽误文件
                    MiniCssExtractPlugin.loader,

                    "css-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin({
            // 对应输出的css文件进行重命名--新增一个文件夹目录存放
            filename: "css/built.css",
        }),
    ],
    mode: "development",
    devServer: {
        contentBase: "./src/js/index.js",
        port: 3000,
        open: true,
        compress: true,
    },
}
```

## CSS兼容处理

1. 下载loader
`npm install --save-dev postcss-loader postcss-preset-env`
2. 配置rules—>loader

```jsx
										{
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: () => [
                                // 加载postcss的插件
                                require("postcss-preset-env")(),
                            ],
                        },
                    },
```

### webpack.config.js

```jsx
const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// 设置nodejs的环境变量
process.env.NODE_ENV = "development"
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/built.js",
        path: resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 创建style标签,将样式放入

                    //"style-loader",
                    // 使用minicssextractplugin取代style-loader
                    // 作用:提取js中的css成为耽误文件
                    MiniCssExtractPlugin.loader,
                    "css-loader",

                    /*
                   css兼容处理:postcss-->postcss-loader postcss-preset-env

                   帮postcss找到package.json中的browseLise的配置
                   通过配置帮助postcss加载指定的css兼容性配置
                    "browserslist":{
                        "development":[
                        "last 1 chrome version",
                        "last 1 firefox version"
                        ],

                        默认是看生产环境的配置
                        "production":[
                        ">0.2%", // 大于0.2%的浏览器
                        "not dead",  // 所有的鸥鹏
                      
                        "not op_mini all" 
                        ]
                    }

                   */
                    // 使用loader的默认配置
                    // 'postcss-loader'
                    // 修改loader的配置
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: () => [
                                // 加载postcss的插件
                                require("postcss-preset-env")(),
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin({
            // 对应输出的css文件进行重命名--新增一个文件夹目录存放
            filename: "css/built.css",
        }),
    ],
    mode: "development",
}
```

### package.js

默认加载生产环境的配置

```jsx
"browserslist": {
"development": [
"last 1 chrome version",
"last 1 firefox version",
"last 1 safari version"
],
"production": [
">0.2%",
"not dead",
"not op_mini all"
]
}
```

## CSS压缩处理

### 下载

`npm install --save-dev optimize-css-assets-webpack-plugin`

### 作用

提取js中的css成为`单独文件`

### 使用

既是将打包的css压缩成`一行`展示

1.引入
`const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")`

2.plugins中引入
`new OptimizeCssAssetsWebpackPlugin()`

1. 压缩前

    
    ![Untitled%201](./webpackImg/Untitled%201.png)
    

2. 压缩后

    
    ![Untitled%202](./webpackImg/Untitled%202.png)
    

### webpack.config.js

```jsx
const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")

// 设置nodejs的环境变量
process.env.NODE_ENV = "development"
//npm install --save-dev optimize-css-assets-webpack-plugin 压缩插件
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/built.js",
        path: resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 创建style标签,将样式放入

                    //"style-loader",
                    // 使用minicssextractplugin取代style-loader
                    // 作用:提取js中的css成为单独文件
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: () => [
                                // 加载postcss的插件
                                require("postcss-preset-env")(),
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin({
            // 对应输出的css文件进行重命名--新增一个文件夹目录存放
            filename: "css/built.css",
        }),
        // 压缩css配置
        new OptimizeCssAssetsWebpackPlugin(),
    ],
    mode: "development",
}
```

## js语法检查

### 下载安装包

`npm install --save-dev eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import`

### 配置module中的rules

```jsx
{
    test: /\.js$/,
    exclude: /node_modules/, // 排除node_modules
    loader: "eslint-loader",
    options: {
        // 自动修复eslint中的错误
        fix: true,
    },
},
```

### 配置pagejson.js

```jsx
"eslintConfig": {
    "extends": "airbnb-base"
  }
```

### webpack.config.js

```jsx
const { resolve } = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/built.js",
        path: resolve(__dirname, "build"),
    },
    module: {
        rules: [
            /**
             * 语法检查: eslint-loader eslint
             * 只检查用户写的源代码,不检查第三方的代码
             * 设置检查规则：
              package.json 中 eslintConfig 中设置~
              "eslintConfig": {
              "extends": "airbnb-base"
              }
              airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint
             */
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules
                loader: "eslint-loader",
                options: {
                    // 自动修复
                    fix: true,
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    mode: "development",
}
```

## JS兼容处理

使用babel-loader进行兼容性处理

### 下载安装包

`npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/polyfill core-js`

### 兼容性处理的局限性

*Js兼容处理: babel-loader @babel/core @babe/preset-env*

1. 基本JS兼容处理-->@babel/preset-env

`问题`:只能转换基本的语法,promise等无法转换

2.全部兼容性处理-->@babel/polyfill
`问题`:一次性将所有的兼容性代码引入--过于庞大

3.需要做兼容性处理就做,按需加载--core.js

### webpack.config.js

```jsx
const { resolve } = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/built.js",
        path: resolve(__dirname, "build"),
    },
    module: {
        rules: [
            // babel-loader--js的兼容 处理
            /*
            Js兼容处理: babel-loader @babel/core @babe/preset-env
            1. 基本JS兼容处理-->@babel/preset-env
            问题:只能转换基本的语法,promise等无法转换
            2.全部兼容性处理-->@babel/polyfill-->一次性将所有的兼容性代码引入--过于庞大
            3.需要做兼容性处理就做,按需加载--core.js
            */
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    //预设:指示babel做怎样的兼容性处理
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                useBuilIns: "usage",
                                corejs: {
                                    version: 3,
                                },
                                // 指定兼容性那个版本的浏览器
                                targets: {
                                    chormo: "60",
                                    firfox: "60",
                                    ie: "9",
                                },
                            },
                        ],
                    ],
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    mode: "development",
}
```

## js压缩

### webpack.config.js

mode:"`production`"

 生产环境下自动压缩js代码

## HTML压缩

webpack.config.js配置

1. 配置`htmlWebpackPlugin`
    1. minify

```jsx
plugins: [
new HtmlWebpackPlugin({
template: './src/index.html',
// 压缩 html 代码
minify: {
// 移除空格
collapseWhitespace: true,
// 移除注释
removeComments: true
}
})
]
```

## 生产环境基本配置

1. 创建生产配置文件
`mode:production`
2. 生产环境打包规则
    1. css less sass

### webpack.config.js

```jsx
const { resolve } = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 提取css为单一文件
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// 定义nodejs环境变量
process.env.NODE_ENV = "pruduction"
const commonCSS = [
    MiniCssExtractPlugin.loader, // 这样会把css单独成唯一文件,而不是统一放入html的style中
    "css-loader",
    {
        // 对css做兼容性处理,需要在pagejson中定义browserslist需要兼容哪些浏览器
        loader: "postcss-loader",
        options: {
            ident: "postcss",
            plugins: () => [require("postcss-preset-env")()],
        },
    },
]
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/biult.js",
        path: resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...commonCSS],
            },
            {
                test: /\.less$/,
                use: [...commonCSS, "less-loader"],
            },
            // 在package.json中配置eslintConfig--->aribnb的规范
            /**
             * 正常来说:一个文件只能被一个loader处理,
             * 当一个文件被多个loader处理
             * 一定要指定loader的执行顺序
             * 下面就是 --先执行eslint--在执行babel
             * 使用enforce 指定执行的优先级顺序---最优先-->其他loader要等待他执行完毕
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                enforce: "pre",
                options: {
                    fix: true, //添加自动修复规范
                },
            },
            // js兼容性处理
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                useBuiltIns: "usage",
                                corejs: { version: 3 }, // 指定兼容性那个版本的浏览器
                                targets: {
                                    chormo: "60",
                                    firfox: "60",
                                    ie: "9",
                                },
                            },
                        ],
                    ],
                },
            },
            // 处理图片
            {
                test: /\.(jpg|png|git)/,
                loader: "url-loader", //使用的esmodule引入规则;需要关闭此规则使用
                options: {
                    limit: 8 * 1024,
                    name: "[hase:10].[ext]",
                    outputPath: "imgs",
                    esMoudle: false,
                },
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            // 处理其他文件
            {
                exclude: /\.(js|css|less|html|jpg|png|git)/,
                loader: "file-loader",
                outputPath: "media",
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/built.css",
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html", //指定html为模板创建新的html文件
            minify: {
                collapseWhitespace: true, // 压缩空格
                removeComments: true, //去除注释
            },
        }),
    ],
    mode: "production",
}
```

# webpack优化配置

- 开发环境性能优化
- 生产环境性能优化

## **开发环境性能优化方向**

- 优化打包构建速度

## HMR(基于dev-server)

只要修改了一个`内容/ 模块`.其他的都会被重新构建渲染

1. 什么是hmr功能?
HMR: `hot module replacement 热模块替换` / 模块热替换
2. 作用
`一个`模块`发生变化`,只会重新打包编译这一个模块

> 极大提高打包构建速度
> 
1. 如何开启
    
    ```jsx
    devServer: {
            contentBase: resolve(__dirname, "build"),
            compress: true,
            port: 3000,
            open: true,
            // 开启hmr功能--每次修改webpack配置要重启webpack服务
            hot: true,
        },
    ```
    
2. 重启后控制台显示已经开启

    
    ![Untitled03](./webpackImg/Untitled%203.png)
    
    ![Untitled04](./webpackImg/Untitled%204.png)
    
3. 注意事项
    1. `js文件`：**默认不能使用HMR功能** --> `需要修改js代码，添加支持HMR功能的代码`
    
    > 注意：HMR功能对js的处理，`只能处理非入口js文件的其他文件。`
    > 
    
    ```jsx
    if (module.hot) {
    	// 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
    	module.hot.accept('./print.js', function() {
    		// 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
    		// 会执行后面的回调函数
    		//此处相当于是监听到print.js发生了变化，执行print()函数
    		print();
    	});
    }
    
    ```
    
    1. `样式css文件`：**可以使用HMR功能**：因为style-loader内部实现了~
    2. `html文件`: **默认不能使用HMR功能**.
    同时会导致问题：html文件不能热更新了~ （不用做HMR功能，因为只有一个html文件，只要里面的内容发生变化，文件是一定要更新的）
     解决：修改entry入口，将html文件引入,这样才可以生效

```jsx
entry: ["./src/js/index.js", "./src/index.html"],
```

html文件其实不怎么需要热更新,总的入口文件就这一个.肯定是要变得每次

js文件有多个,所以需要热更来进行变化

## source-map

优化代码调试

> 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）
> 

```jsx
webpack.config.js
// 配置devtool即可
devtool: "source-map",
```

1. `source-map`类型
[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
2. inline-source-map：内联
    
    错误代码准确信息 和 源代码的错误位置
    
    只生成一个内联source-map
    
3. hidden-source-map：外部
    
    *错误代码错误原因，但是没有错误位置*
    
    *不能追踪源代码错误，只能提示到构建后代码的错误位置*
    
4. eval-source-map：内联
    
    每一个文件都生成对应的source-map，都在eval
    
    错误代码准确信息 和 源代码的错误位置
    
5. nosources-source-map：外部
    
    *错误代码准确信息, 但是没有任何源代码信息*
    
6. cheap-source-map：外部
    
    *错误代码准确信息 和 源代码的错误位置*
    
    *只能精确的行*
    
7. cheap-module-source-map：外部
    
    错误代码准确信息 和 源代码的错误位置
    
    module会将loader的source map加入
    

### 如何使用sourcemap

1. 开发环境:速度快,调试更友好
    1. 速度快 —>eval>inline>cheap>...
        
        *`eval-cheap-souce-map`（速度最快）
        eval-source-map*
        
    2. 调试更友好
    source-map(调试最友好)
    cheap-module-source-map
    cheap-source-map
    3. 开发环境使用优先级:
    `eval-source-map` > ：eval-cheap-module-souce-map
2. 生产环境: 源码要不要隐藏?调试要不要更友好
    1. 内联会让代码`体积变大`，所以在`生产环境不用内联`
    2. 直接使用map||隐藏源代码只提事构建后的错误信息
        
        `nosources-source-map` *全部隐藏
        hidden-source-map 只隐藏源代码，会提示构建后代码错误信息*
        

## oneof—>提升构建速度

以下loader只会匹配一个（这样子便`不会`**只需要一个loader的时候将所有的loader遍历一遍**了，可以提高速度）

## babel缓存

发现文件没有变换,直接使用上一次缓存进行打包构建

1. 如何使用?
2. babel-loader中的`options`添加
`cacheDirectory: true`

```jsx
{
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        useBuiltIns: "usage",
                                        corejs: {
                                            version: 3,
                                        },
                                        targets: {
                                            chrome: "60",
                                            firefox: "50",
                                        },
                                    },
                                ],
                            ],
                            // 开启babel 缓存
                            // 第二次构建时, 读取之前的缓存
                            cacheDirectory: true,
                        },
                    },
```

### 启动server.js

```jsx
/**
 * 服务器代码
 * 启动服务器指令: npm i nodemon -g
 * nodemon server.js
 * 或者使用
 * node server.js
 */

const exprss = require("express")
const app = exprss()
// 读取静态文件夹 build
app.use(exprss.static("build", { maxAge: 1000 * 3600 }))
app.listen(3000)
```

### 文件资源缓存的问题

**强制缓存的问题**
当文件进行变化...页面读取的还是缓存中的数据,需要修改

css已经是red,可页面读取的仍然是缓存文件

![Untitled05](./webpackImg/Untitled%205.png)

页面颜色依然是黄色—此时读取的仍是缓存

![Untitled06](./webpackImg/Untitled%206.png)

### 解决一直读取缓存的方法—使打包文件带有hash值

`[hash:10]`

```jsx
//设置打包文件名为hash值类型
output: {
        filename: "js/built[hash:10].js",
        path: resolve(__dirname, "build"),
    },

plugins: [
        new MiniCssExtractPlugin({
            filename: "css/built[hash:10].css",
        }),

]
```

![Untitled07](./webpackImg/Untitled%207.png)

### 使用hash值的问题

1. 如果我只改动一个文件
    
    因为js和css使用同一个hash值,如果hash值修改,会导致`所有文件的缓存值失效`
    
2. 使用`chunkhash`
据chunk生成的hash值。如果`打包来源`于`同一个chunk`，那么`hash`值就一样
    1. 问题
    js和css的hash值还是一样的,因为css使在js中引入的,所以同属一个chunk
3. 使用`contenthash`
根据`文件的内容`生成`hash`值。`不同`文件hash`值`一`定`不一样
    1. 让代码上线运行缓存更好使用（上线代码的性能优化的）
    2. 二者hash值不一样—修改css—js不变则使用缓存
    
    ![Untitled08](./webpackImg/Untitled%208.png)
    
    ### 总结
    
    *综上所述：开启缓存需要经历两个步骤：
          1. 设置cacheDirectory: true
          2. 在输出的数组中加上contenthash*
    

## tree shaking

去除无用代码,使得体积更小

1. 前提使用条件
1.必须使用es6模块 
    
    2. 开启production环境
    
2. "sideEffects": false
所有代码都没有副作用（都可以进行tree shaking）
    1. 问题:可能会把css文件搞掉
    可能会把css / @babel/polyfill （副作用）文件干掉，所以采用下面的一行形式
    2. 修改配置
    "sideEffects": `["*.css", "*.less"]`（加上这句话表示不移除css和less文件）

## code split

### 单入口文件

单入口打包输出一个文件，多入口打包输出多个文件，有几个入口便打包输出多少个文件

`单入口`（单页面应用程序使用单入口）（开发时单入口应用使用的多）

```jsx
entry: './src/js/index.js',
output: {
        // 输出单文件名称
        filename: "js/built.[contenthash:10].js",
        path: resolve(__dirname, "build"),
    },
```

### 多文件入口

1. entry采用键值对的形式
2. output输出采用 `[name]`

```jsx
entry: {
        // 多入口:有一个入口,最终输出就有一个bundle---适用于多页面应用程序多入口
        index: "./src/js/index.js",
        test: "./src/js/test.js",
    },
    output: {
        // 取输出文件名方便区分--比如上面的entry中名称为index,那么输出的文件名首部会有index名称
        filename: "js/[name].[contenthash:10].js",
        path: resolve(__dirname, "build"),
    },
```

### 单入口文件分割多个文件—不常用

可以将`node_modules中代码单独打包一个chunk最终输出`

自动分析多入口chunk中,`有没有公共文件.`如果有就会打包成单独一个chunk

这种单入口的形式`不常使用`

```jsx
optimization: {
	
	spiltChunks: {
	
	chunks: "all",
	
	},

},
```

### 单入口文件输出多个出口文件—常用

通过js代码，让某个文件被单独打包成一个chunk
**import动态导入语法：能将某个文件单独打包**
`webpackChunkName: 'test'`的作用是`命名输出的打包名称`，否则打包名称会根据每次打包输出的id进行命名，每次打包输出的id不一样，名称也不一样

```jsx
function sum(...args) {
    return args.reduce((p, c) => p + c, 0)
}

import(/* webpackChunkName: 'test' */ "./test")
    .then(({ muil, count }) => {
        // 文件加载成功~
        // eslint-disable-next-line
        console.log(muil(2, 5))
    })
    .catch(() => {
        // eslint-disable-next-line
        console.log("文件加载失败~")
    })

// eslint-disable-next-line
console.log(sum(2, 3, 4, 5, 6))
console.log("muil", muil(3, 6))
```

webpack.config.js

```jsx
const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    // 单入口
    entry: "./src/js/index.js",
    output: {
        // [name]：取文件名
        filename: "js/[name].[contenthash:10].js",
        path: resolve(__dirname, "build"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
        }),
    ],
    /*
      1. 单入口的这种形式经常使用，实现功能：单入口打包输出多个出口文件，从而使得多个文件并行运行，增加运行速度
      2. 这种方式可以将node_modules中代码单独打包一个chunk最终输出，将入口文件打包输出一个出口文件，如果想要将某个单独的文件也打包输出为一个文件，则需要进行以下配置：
        1. optimization配置
        2.在打包的出口文件中对需要单独打包的文件输入相关代码
    */
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    mode: "production",
}
```

## lazy loading -懒加载

当文件需要使用时才加载~

预加载 `webpackPrefetch: true`：**会在使用之前，提前加载js文件**

正常加载可以认为是并行加载（同一时间加载多个文件）

`预加载 prefetch`：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源（兼容性比较差的）（检测是否是预加载了可以通过打开控制台，查看网络看出是否是提前加载了）
prefetch预加载—所有文件都会加载一次,第四次为点击效果

![Untitled09](./webpackImg/Untitled%209.png)

![Untitled10](./webpackImg/Untitled%2010.png)

1.  通常情况下`懒加载`的`第一次`加载如果加载的`文件比较大`的话会加载的时间比较长，给用户造成阻塞的现象
2. 一般`不使用预加载`，因为兼容性差了一些，一般使用懒加载
3. `懒加载`的实现是基于前面的`代码分割`的基础上的，要`进行`了前面的`代码分割的配置`才`可以使`用懒加载，这个案例实现的功能是点击按钮之后再加载test文件中的js代码
4. `懒加载第一次可能会慢一点`，第二次加载便不会慢了，第一次加载会`存入缓存中`，第二次加载会直接从`缓存中加载`,第三次为点击按钮调用时候加载

    
    ![Untitled11](./webpackImg/Untitled%2011.png)
    

### index.js

```jsx
console.log("index-js")

// eslint-disable-next-line
// 懒加载--点击按钮才调用此方法
document.getElementById("btn").onclick = function () {

    import(/* webpackChunkName: 'test'*/ "./test").then(({ muil }) => {
        console.log("lazyloader", muil(2, 4))
    })
}
```

### webpack.config.js

```jsx
const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    // 单入口
    entry: "./src/js/index.js",
    output: {
        // [name]：取文件名
        filename: "js/[name].[contenthash:10].js",
        path: resolve(__dirname, "build"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
        }),
    ],
    /*
      1. 单入口的这种形式经常使用，实现功能：单入口打包输出多个出口文件，从而使得多个文件并行运行，增加运行速度
      2. 这种方式可以将node_modules中代码单独打包一个chunk最终输出，将入口文件打包输出一个出口文件，如果想要将某个单独的文件也打包输出为一个文件，则需要进行以下配置：
        1. optimization配置
        2.在打包的出口文件中对需要单独打包的文件输入相关代码
    */
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    mode: "production",
}
```

## PWA—渐进式网络开发应用程序(离线可访问)

1. 安装插件

    
    `npm install --save-dev workbox-webpack-plugin`
    
2. plugin中使用

```jsx
plugins: [

    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1. 帮助serviceworker快速启动
        2. 删除旧的 serviceworker

        生成一个 serviceworker 配置文件~
      */
      clientsClaim: true,
      skipWaiting: true
    })
  ],

```

1. index.js中注册serviceworker—处理兼容性

```jsx
// 注册serviceworker
// 处理兼容性问题
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => {
                console.log("sw注册成功了~")
            })
            .catch(() => {
                console.log("sw注册失败了~")
            })
    })
}
```

1. 问题
    1. eslint 不认识window,navigator全局变量
        1. 需要修改package.json中eslintConfig的配置
            
            ```jsx
            "env": {
                    "browser": true // 支持浏览器端全局变量，如果要支持node的全局变量，则写"node":true
                  }
            ```
            
2. servicework代码必须运行在服务器上
3. 安装本地server
`npm i serve -g` 
4. `serve -s build` 启动服务器
将build目录下所有资源作为静态资源暴露出去

![Untitled12](./webpackImg/Untitled%2012.png)

1. application中查找service worker功能

![Untitled13](./webpackImg/Untitled%2013.png)

**catch中缓存的文件**

![Untitled14](./webpackImg/Untitled%2014.png)

### 将网络设置为offline,依然可以加载—从service中读取

![Untitled15](./webpackImg/Untitled%2015.png)

## 多进程打包

1. 安装plugin
`npm install --save-dev thread-loader`
2. 优缺点
`进程启动大概为600ms，进程通信也有开销。`
**只有`工作消耗时间比较长，`才需要`多进程打包`

### 配置使用

```jsx
{
    loader: "thread-loader",
    options: {
        workers: 2, // 进程俩
    },
},
```

## externals(CDN引入打包优化)

当前要忽略的库名 + npm 包名

拒绝某个包被打包进来

### 作用

假如说我们的jequery使用的是CDN链接，那么打包的时候jquery不会被打包进来，直接使用CDN链接

### webpack.config.js

```jsx
const {
  resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'production',
  externals: {
    // 拒绝jQuery被打包进来，作用： 假如说我们的jequery使用的是CDN链接，那么打包的时候jquery不会被打包进来，直接使用CDN链接
    jquery: 'jQuery'
  }
};

```

## dll(第三方库—打包)

将`引入的库单独打包`出来—分割成单独的文件—避免将来重复打包

1. 创建`webpack.dll.js`文件
2. 运行指令：`webpack --config webpack.dll.js`
3. 修改webpack.config.js
    1. 安装`add-asset-html-webpack-plugin` 
    将某个文件打包输出去，并在html中自动引入该资源
    

```jsx
/* 
loader: 1. npm 下载  2. 使用配置loader rules
plugins: 1. npm 下载 2. 引入  3. 使用

*/
/*
  首先要在webpack.dll.js与webpack.config.js中引入webpack插件
  1. 在webpack.dll.js文件中的写入我们需要打包的库以及打包的库输出的名字为什么（实现功能：第一次打包之后只要jquery库名称不变，下一次不需要在重新打包了，直接使用，提高构建速度）(不仅仅是jquery库，各种库都要引入)
  2. plugin中生成的manifest.json文件表示了jquery的映射关系
  3. webpack.config.js中使用DllReferencePlugin告诉webpack哪些文件不需要再重新打包
  4. webpack.config.js中使用AddAssetHtmlWebpackPlugin将ebpack.dll.js中打包的资源在html中自动引入
*/

const { resolve } = require("path")
const webpack = require("webpack")
// 引入plugins
const HtmlWebpackPlugin = require("html-webpack-plugin")
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname, "build"),
    },

    module: {
        rules: [
            //loader配置
        ],
    },
    plugins: [
        // plugin配置
        // 使用html-webpack-plugin
        // 功能: 默认会创建一个html文件--引入打包输出的所有资源(JS/CSS)
        // 需求:需要有结构的html文件
        new HtmlWebpackPlugin({
            //赋值'.src/index.html' 文件,并自动引入打包输出所有资源(JS/CSS)
            template: "./src/index.html",
        }),
        // 告诉webpack哪些库不需要打包,同时调用这些库路径使用时的名称也要修改
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, "dll/manifest.json"),
        }),
        //将不需要打包的文件---某个文件打包输出,并在html中自动引入该资源
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, "dll/jquery.js"),
        }),
    ],
    mode: "production",
}

```

### 解析步骤

 
首先要在`webpack.dll.js`与`webpack.config.js`中`引入webpack`插件
  1.  在webpack.dll.js文件中的写入我们需要打包的库以及打包的库输出的名字为什么（实现功能：第一次打包之后只要jquery库名称不变，下一次不需要在重新打包了，直接使用，提高构建速度）(不仅仅是jquery库，各种库都要引入)
  2.  plugin中生成的`manifest.json`文件表示了`jquery的映射`关系
  3.  webpack.config.js中使用`DllReferencePlugin`告诉`webpack`哪些文件`不需`要再`重新`打包
  4.  webpack.config.js中使用`AddAssetHtmlWebpackPlugin`将`webpack.dll.js`中`打包好的资源`在html中自动引入

### dll和externals的区别

1. 使用`cdn`链接引入—调用`externals`
2. 使用`第三方的库`,需要打包整合在一起,不是使用cdn🔗,而是使用自己的服务器向外暴漏出去,使用`dll`

## 性能优化总结

### webpack性能优化

- 开发环境性能优化
- 生产环境性能优化

### dev开发环境性能优化

- 优化打包构建速度
    - HMR
- 优化代码调试
    - source-map

### pro生产环境性能优化

- 优化打包构建速度
    - oneOf
    默认情况下,设置了七八个loader,那么每一个文件都会都通过这七八个loader一起处理,
    例如:js文件打包遇到less-loader,css-loader这些他是不会处理的,因为test的正则检验过不去不了,虽然这些loader处理不了,但是还是会过一遍,(如同数据库查找一个元素,当你找到了以后,但是还是把真个数据库遍历一次,浪费新能)
        - `oneOf的作用`就是让这些`loader找到了就直接用`,而后面的loader就不看了,提升性能
        - 如果一个文件需要使用`两个以上的loader`,**不能**将他们`放在同一个oneof中`,这样会导致只有一个`oneOf生效`.所以要将一个`loader放在外面`
- babel缓存
    - 优化打包构建速度
    - 代码中js代码是最多的,babel要对代码进行编译,编译前还要进行检查,比较耗时,
- 多进程打包
    - 默认打包时单线程的
    - 优势提升打包速度,如果使用一定要注意:使用状态是否会超过好几秒
- 让某些代码不打包,优化构建速度
    - 每次使用vue,react,每次构建都重新打包,影响构建速度
    - externals(`适用于公司所有的都是通过cdn`)
        - 通过cdn直接引入,先声明哪个库不用打包,然后再html中声明cdn🔗把这些库引入进来
        彻底不打包,从此都通过cdn
    - dll(`适用于所有的都部署到自己的线上服务器`)
        - 会将这些库单独打包,先打包好,后面直接用就好了,不用再重新打包
- 优化代码运行的性能
    - 缓存(hash-chunkhash-contenthash)
        - 使用如上三个hash值对文件进行缓存—一旦hash值变了,对文件的缓存就失效,再次重新请求
        - hash—>webpack每次`打包`时,都会生成的`唯一hash`值(相当于打包的编号++),`不管你文件变不变`,每次webpack打包hash值都会变
        - chunkhash—>chunk—>如果你打包属于`同一个入口`,那你打包就属于同一个`chunk`,**同一个chunk共享同一个hash值**
            - 弊端—`css文件一开始也是从js文件`(import css from '/index.css')引入进来的,属于同一个入口,当js改变,而css未改变.这俩hash值同时改变—所以使用`contenthash`
        - contenthash
            - 不管你来不来同一个chunk,最终都会根据一个文件来生成hash.
            - **文件内容不变,hash值不变**
    - tree shaking
        - 优化代码性能
        - 引入的代码相当于树上的叶子🍃,没使用的代码相当于灰色的🍃,一旦摇晃这颗树,那么没用的叶子就会落下
        - 必须开启es6 module
        - 只要使用webpack生产环境(`production`),tree shaking`默认`启动
        - 在pageage.json中配置"sideEffects": [".css",".less"],不想删除的文件,给保留
    - code split(代码分割)
        - 单入口场景—输出为同一个bundle
        - 多入口场景—有几个入口输出几个文件`optimization`--搭配后面`dll`将引入的`各个第三方库文件`再次输出为单一文件
    - 懒加载/预加载
        - js代码的加载优.而非图片等类型的加载
        - 预加载性能太差
    - pwa
        - 离线可访问技术—采用`servicework`进行打包输出,让网站在离线状态下也可以访问
        - 兼容性需要考虑
        - 理性使用

# webpack配置详情

## entry

**entry:入口起点**

1. string*-->*'.src/index.js'(用的多)

单入口

打包形成一个chunk.输出一个bundle文件.

此时chunk的名称默认时main

1. array*-->*['src/add.js','src/index.js'] (一般不使用此种形势)

多入口

所有文件最终形成一个chunk,输出出去只有一个bundle文件.

*-->*只有再HMR功能中仍html热更新生效

1. object入口(用的最多)

多入口

有几个入口文件就形成几个chunk,输出多个bundle文件.

此时chunk的名称是key

{

index: "./src/index.js",

add: "./src/add.js",

},

1.  特殊用法

{

*// 所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件。*

index: ['./src/index.js', './src/count.js'],

*// 形成一个chunk，输出一个bundle文件。*

add: './src/add.js'

}

```jsx
const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    //   entry:入口起点
    //   1.string-->'.src/index.js'(用的多)
    //  单入口
    //  打包形成一个chunk.输出一个bundle文件.
    //   此时chunk的名称默认时main
    //  2.array-->['src/add.js','src/index.js'] (一般不使用此种形势)
    //  多入口
    //  所有文件最终形成一个chunk,输出出去只有一个bundle文件.
    //  -->只有再HMR功能中仍html热更新生效
    //  3.object入口(用的最多)
    //  多入口
    //  有几个入口文件就形成几个chunk,输出多个bundle文件.
    //  此时chunk的名称是key
    //   {
    //     index: "./src/index.js",
    //     add: "./src/add.js",
    // },
    //  --> 特殊用法
    //     {
    // 所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件。
    //       index: ['./src/index.js', './src/count.js'],
    // 形成一个chunk，输出一个bundle文件。
    //       add: './src/add.js'
    //     }

    entry: {
        index: "./src/index.js",
        add: "./src/add.js",
    },
    output: {
        filename: "[name].js",
        path: resolve(__dirname, "build"),
    },
    plugins: [new HtmlWebpackPlugin()],
    mode: "development",
}
```

## output

1. publicPath: "/"
    1. 所有资源引入公共路径的前缀 —>  'img/a.jpg'-->'/img/a.jpg'
2. chunkFilename: "[name]_chunk.js"—>非入口chunk的名称
3. library: "[name]"—>整个库向外暴露的变量名

![Untitled16](./webpackImg/Untitled%2016.png)

```jsx
output: {
        // 文件名称(指定名称+目录)
        filename: "[name].js",
        // 输出文件目录(将来所有资源输出的公共目录)
        path: resolve(__dirname, "build"),
        // 所有资源引入公共路径的前缀-->  'img/a.jpg'-->'/img/a.jpg'
        publicPath: "/",
        chunkFilename: "[name]_chunk.js", // 非入口chunk的名称
        library: "[name]", // 整个库向外暴露的变量名--默认是main--就是打包的那个js文件
        // libraryTarget: 'window' // 变量名添加到哪个上 browser
        // libraryTarget: 'global' // 变量名添加到哪个上 node
        // libraryTarget: 'commonjs'
    },
```

## module

1. 单个loader,使用loader
2. 多个loader,使用use
3. exclude排除不需要检查的文件
4. include 只检查下面的文件
5. enforce:pre 优先执行当前文件
6. oneOf: 单个loader只会执行一次

```jsx
module: {
        rules: [
            //loader的配置
            {
                test: /\.css$/,
                // 多个loader用use
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                //排除node_modules下的js文件
                exclude: /node_modules/,
                // 只检查src下的js文件
                include: resolve(__dirname, "src"),
                //优先执行
                enforc: "pre",
                // 延后执行
                // enforce:'post'
                // 单个loader直接使用-->loader
                loader: "eslint-loader",
            },
            {
                // 一下配置只会生效一个
                oneOf: [],
            },
        ],
    },
```

## resolve

1. alias 配置模块解析路径别名
    1. 优点:简写路径
    2. 缺少路径提示

```jsx
// 解析模块的规则
    resolve: {
        // 配置解析模块路径别名: 优先简写路劲,缺点没有路径提示
        alias: {
            $css: resolve(__dirname, "src/css"),
        },
        // 配置路径的后缀名-可以省略文件后缀名书写
        // 以往引入-->import "$css/index.css"
        // 配置后引入-->import "$css/index"
        extensions: [".js", ".json", ".jsx", ".css"],
        // 告诉webpack解析模块是去哪里找到相关npm包构建--->找那个目录(不写这个的话,会一层层往上面找,现在就是/30resolve/5.webpack配置详解)
        modules: [resolve(__dirname, "../../node_modules"), "node_modules"],
    },
```

1. extensions `配置省略文件路径后缀名`
2. modules
告诉webpack解析模块是去哪里找到相关npm包构建

## devServer

```jsx
const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "[name].js",
        path: resolve(__dirname, "build"),
    },
    module: {
        rules: [
            //loader的配置
            {
                test: /\.css$/,
                // 多个loader用use
                use: ["style-loader", "css-loader"],
            },
        ],
    },

    plugins: [new HtmlWebpackPlugin()],

    mode: "development",
    // 解析模块的规则
    resolve: {
        // 配置解析模块路径别名: 优先简写路劲,缺点没有路径提示
        alias: {
            $css: resolve(__dirname, "src/css"),
        },
        // 配置路径的后缀名-可以省略文件后缀名书写
        // 以往引入-->import "$css/index.css"
        // 配置后引入-->import "$css/index"
        extensions: [".js", ".json", ".jsx", ".css"],
        // 告诉webpack解析模块是去哪里找到相关npm包构建--->找那个目录(不写这个的话,会一层层往上面找,现在就是/30resolve/5.webpack配置详解)
        modules: [resolve(__dirname, "../../node_modules"), "node_modules"],
    },
    devServer: {
        //运行代码目录
        contentBase: resolve(__dirname, "build"),
        // 监视 contentBase目录下的所有文件,一旦文件变化就会 reload
        watchContentBase: true,
        // 忽略文件
        watchOptions: {
            // 忽略文件
            ignored: /node_modules/,
        },
        // 启动gzip压缩，体积小
        compress: true,
        // 端口号 5000
        port: 5000,
        // 自动打开浏览器
        open: true,
        // 开启HMR功能
        hot: true,
        // 不要现实启动服务器日志信息
        clientLogLevel: "none",
        // 除了一些基本启动信息以外，其他内容都不要显示
        quiet: true,
        // 如果出错了不要全屏提事
        overlay: false,
        // 服务器代理--->解决开发环境跨域问题
        proxy: {
            // 一旦devServer(5000)服务器接受到/api/xxx的请求,就会把请求转发到另外一台服务器
            "/api": {
                target: "http://loacalhost:3000",
                // 发送请求时,请求路径重写: 将/api/xxx--->/xxx  (去掉/api)
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
}
```

## optimization

必须要在`mode: "production"`才能实现

### webpack.config.js

```jsx
const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/[name].[contenthash:10].js",
        path: resolve(__dirname, "build"),
        /*命名打包出去的文件名称*/
        chunkFilename: "js/[name].[contenthash:10]_chunk.js",
    },
    module: {
        rules: [
            //loader的配置
            {
                test: /\.css$/,
                // 多个loader用use
                use: ["style-loader", "css-loader"],
            },
        ],
    },

    plugins: [new HtmlWebpackPlugin()],

    mode: "production",
    // 解析模块的规则
    resolve: {
        // 配置解析模块路径别名: 优先简写路劲,缺点没有路径提示
        alias: {
            $css: resolve(__dirname, "src/css"),
        },
        // 配置路径的后缀名-可以省略文件后缀名书写
        // 以往引入-->import "$css/index.css"
        // 配置后引入-->import "$css/index"
        extensions: [".js", ".json", ".jsx", ".css"],
        // 告诉webpack解析模块是去哪里找到相关npm包构建--->找那个目录(不写这个的话,会一层层往上面找,现在就是/30resolve/5.webpack配置详解)
        modules: [resolve(__dirname, "../../node_modules"), "node_modules"],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            /* 
            以下皆为默认值--直接如上all既可以
            minSize: 30 * 1024, //分割的chunk最小为30KB
            maxSize: 0, // 最大没有限制
            minChunks: 1, // 要提取的chunks最少被引用1次
            maxAsyncRequests: 5, //按需加载时--并行加载的最大文件数
            maxInitialRequests: 3, //入口js文件最大并行请求数量
            automaticNameDelimiter: "~", // 名称连接符
            name: true, // 可以使用命名规则
            cacheGroups: {
                // 分割chunk的组
                // node_modules文件会被打包到 vendors 组的chunk中。--> vendors~xxx.js
                // 满足上面写的公共规则，如：大小超过30kb，至少被引用一次。
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    // 优先级
                    priority: -10,
                },
                default: {
                    // 要提取的chunk最少被引用2次
                    minChunks: 2,
                    // 优先级
                    priority: -20,
                    // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
                    reuseExistingChunk: true,
                },
            },
            */
        },
        // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
        // 解决：修改a文件导致b文件的contenthash变化
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`,
        },
        minimizer: [
            // 配置生产环境的压缩方案：js和css
            new TerserWebpackPlugin({
                // 开启缓存
                cache: true,
                // 开启多进程打包
                parallel: true,
                // 启动source-map
                sourceMap: true,
            }),
        ],
    },
}
```

# webpack5介绍

### 下载

- `npm i webpack@next webpack-cli -D`

此版本重点关注以下内容:

- 通过`持久缓存`提高构建`性能.`
- 使用更好的算法和默认值来`改善长期缓存`.
- 通过更好的`树摇`和代码生成来改善`捆绑包大小`.
- 清除处于怪异状态的内部结构，同时在 v4 中实现功能而不引入任何重大更改.
- 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用 v5.

### 自动删除 Node.js Polyfills

早期，webpack 的目标是允许在浏览器中运行大多数 node.js 模块，但是模块格局发生了变化，许多模块用途现在主要是为前端目的而编写的。webpack <= 4 附带了许多 node.js 核心模块的 polyfill，一旦模块使用任何核心模块（即 crypto 模块），这些模块就会自动应用。

尽管这使使用为 node.js 编写的模块变得容易，但它会将这些巨大的 polyfill 添加到包中。在许多情况下，这些 polyfill 是不必要的。

webpack 5 会自动停止填充这些核心模块，并专注于与前端兼容的模块。

迁移：

- 尽可能尝试使用与前端兼容的模块。
- 可以为 node.js 核心模块手动添加一个 polyfill。错误消息将提示如何实现该目标。

### Chunk 和模块 ID

添加了用于长期缓存的新算法。在生产模式下默认情况下启用这些功能。

`chunkIds: "deterministic", moduleIds: "deterministic"`

### Chunk ID

你可以不用使用 `import(/* webpackChunkName: "name" */ "module")` 在开发环境来为 chunk 命名，生产环境还是有必要的

webpack 内部有 chunk 命名规则，不再是以 id(0, 1, 2)命名了

### Tree Shaking

1. webpack 现在能够处理对嵌套模块的 tree shaking

```jsx
// inner.js
export const a = 1;
export const b = 2;

// module.js
import * as inner from './inner';
export { inner };

// user.js
import * as module from './module';
console.log(module.inner.a);

```

在生产环境中, inner 模块暴露的 `b` 会被删除

1. webpack 现在能够多个模块之前的关系

```jsx
import { something } from './something';

function usingSomething() {
  return something;
}

export function test() {
  return usingSomething();
}

```

当设置了`"sideEffects": false`时，一旦发现`test`方法没有使用，不但删除`test`，还会删除`"./something"`

1. webpack 现在能处理对 Commonjs 的 tree shaking

### Output

webpack 4 默认只能输出 ES5 代码

webpack 5 开始新增一个属性 output.ecmaVersion, 可以生成 ES5 和 ES6 / ES2015 代码.

如：`output.ecmaVersion: 2015`

### SplitChunk

```jsx
// webpack4
minSize: 30000;

```

```jsx
// webpack5
minSize: {
  javascript: 30000,
  style: 50000,
}

```

### Caching

```jsx
// 配置缓存
cache: {
  // 磁盘存储
  type: "filesystem",
  buildDependencies: {
    // 当配置修改时，缓存失效
    config: [__filename]
  }
}

```

缓存将存储到 `node_modules/.cache/webpack`

### 监视输出文件

之前 webpack 总是在第一次构建时输出全部文件，但是监视重新构建时会只更新修改的文件。

此次更新在第一次构建时会找到输出文件看是否有变化，从而决定要不要输出全部文件。

### 默认值

- `entry: "./src/index.js`
- `output.path: path.resolve(__dirname, "dist")`
- `output.filename: "[name].js"`


###总结
以上内容通过
[B站尚硅谷webpack视频学习](https://www.bilibili.com/video/BV1e7411j7T5?spm_id_from=333.999.0.0)
