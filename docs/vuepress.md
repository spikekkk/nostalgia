---
title: vuepress安装&部署&markdown使用技巧
date: 2021-10-12
sidebar: auto
tags:
    - vuepress
categories:
    - process
---


之前一直使用hexo来进行博客搭建,但是繁杂的部署方式以及书写让我转投vuepress的怀抱,做一个流程;方便记录下整个体验过程

### vuepress
> [Vue 驱动的静态网站生成器。官方文档立即前往](https://vuepress.vuejs.org/zh/)

因为官方主题太过简陋,采用了reco主题进行搭建
## [reco主题](https://vuepress-theme-reco.recoluan.com/)

reco主题提供了脚手架可以实现一键创建vuepress项目

### 快速开始

 **npx**
 ```bash
 npx @vuepress-reco/theme-cli init my-blog
 ```

**npm** 

```bash
# 初始化
npm install @vuepress-reco/theme-cli -g
theme-cli init my-blog
# 安装
cd my-blog
npm install
# 运行
npm run dev
# 编译
npm run build
```
**yarn**

```bash
# 初始化
yarn global add @vuepress-reco/theme-cli
theme-cli init my-blog
# 安装
cd my-blog
yarn install
```

### 启动项目

```sh
npx @vuepress-reco/theme-cli init recodemo
```

然后进入`recodemo`文件夹使用 `npm i`命令下载一下依赖

然后打开 `recodemo\docs\.vuepress\config.js`,配置一些自定义信息，具体的可配置信息[立即前往](https://vuepress-theme-reco.recoluan.com/views/1.x/configJs.html)

在`views`目录下新建一个 `first.md` 文件，这个前面的内容相当于是文章的信息描述，具体的可描述信息[立即前往](https://vuepress-theme-reco.recoluan.com/views/1.x/frontMatter.html)

```markdown
---
title: 这是我的first文章
date: 2018-09-30
sidebar: 'auto'
categories:
 - blog
tags:
- first
---

## 这是我的第一篇文章
```

然后使用 `npm run dev`将项目运行起来

### 添加摘要
!--more--
[摘要语法](https://vuepress-theme-reco.recoluan.com/views/0.x/abstract.html)

### 使用插件
[主题自带插件](https://vuepress-theme-reco.recoluan.com/views/plugins/)

[插件使用细节](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html)



### 加密功能

**全局加密**

```js
// .vuepress/config.js

module.exports = {
  theme: 'reco',
  themeConfig: {
    // 密钥
    keyPage: {
      keys: ['32位的 md5 加密密文'], // 1.3.0 版本后需要设置为密文
      color: '#42b983', // 登录页动画球的颜色
      lineColor: '#42b983' // 登录页动画线的颜色
    }
  }
}

```
**文章加密**

```m
---
title: vuepress-theme-reco
date: 2019-04-09
author: reco_luan
keys:
 - '32位的 md5 加密密文'
---
```


### 添加侧栏

页面中,reco主题会默认根据你的标题生成侧边栏目录-右边展示，
但如果要汇总的文档页面你想让左侧边栏显示你的所有页面的标题,需要手动配置

```js
"sidebar": {
  '/blogs/tips':[
    '',
    {
      title: '侧边栏',
      collapsable: true, // 不可折叠
      children: ['blogs/tips/es6','blogs/tips/es5']
    }
  ]
},
```

**使用插件**


```bash
npm i vuepress-plugin-auto-sidebar -D
```
但是不知道为啥,我没生效,可能是插件时间太久了吧


## 部署

###Github 白嫖部署
如果你的仓库名为 username.github.io

你就不用再vuepress中做任何修改，如果不为这个名称，你就需要在config.js中配置 base属性为你的仓库名

如果你想部署博客的同时
也将博客代码同步到git的话，可以通过新建一个分支或者专门存放代码的仓库

这里选用的是新建一个分支来解决

**gitignore** 文件
```
node_modules/
yarn.lock
yarn.error
docs/.vuepress/theme
package-lock.json
public/
```
#### 新建脚步用来提交
deploy.sh 用来打包
```bash
npm run build

cd public

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:spikekkk/nostalgia.git master:main

cd ../
rm -rf public

```

push.sh 用来push源文件


``` bash
git add .
git commit -m 'push'
git push -f origin master:blogcode

```

本地开始为master分支,分别推送到仓库的
main`博客打包分支` 
blogcode`源代码分支`


## package.json配置启动命令

要在base环境启动

```json
  "scripts": {
        "dev": "vuepress dev . --open --host \"localhost\"",
        "build": "vuepress build .",
        "deploy": "bash deploy.sh",
        "push": "bash push.sh"
    },

```


## markdown 语法

[官方推荐的语法操作](https://vuepress.vuejs.org/zh/guide/markdown.html#%E9%93%BE%E6%8E%A5)

常用的copy几个做记录

### 自定义容器

```md
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::

```

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::

### 代码块中的语法高亮

支持js,bash,html,css等等[prismjs](https://prismjs.com/)

https://prismjs.com/themes/prism-tomorrow.css 

cdn存在引入不稳定问题,貌似主题作者已经发现,但还是有待解决,不然代码高亮会直接失效