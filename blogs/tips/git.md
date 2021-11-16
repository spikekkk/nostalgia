---
title: 关于Git的一些点
date: 2020-2-13
sidebar: auto
tags:
 - tips git
categories: 
 - frontend

---

大多数情况下，看提交历史的人跟提交代码的人都不是同一个人，当别人阅读你的提交历史时，他很可能是不知道具体代码细节的，你如何在最短的时间内让他一眼知道每次提交的意义：

每次提交影响的具体范围？
这个bug在哪次提交中被修复了？
这个新功能是在哪次提交中增加的？
修改是否向下兼容？
是否回滚了代码？
是否只是修改了文档、调整了代码格式？
是否修改了测试、是否进行了重构？
是否对代码进行了性能优化？

这些都是提交规范的作用。

## git 提交commit

每个类型值都表示了不同的含义，类型值必须是以下的其中一个：

```
feat：提交新功能
fix：修复了bug
docs：只修改了文档
style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
refactor：代码重构，既没修复bug也没有添加新功能
perf：性能优化，提高性能的代码更改
test：添加或修改代码测试
chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改
```

## git clean 删除依赖更新包

git clean 从你的工作目录中删除所有没有 tracked，没有被管理过的文件,删除工作中所有node_modules依赖项

未添加到版本控制，且不在.gitignore中的，都是Untracked的状态

```
n ：查看将要被删除的文件，并不实际删除文件

d ：删除未跟踪目录以及目录下的文件，如果目录下包含其他git仓库文件，并不会删除（-dff可以删除）。（将 .gitignore 文件标记的文件全部删除）

f ：如果 git cofig 下的 clean.requireForce 为true，那么clean操作需要-f(--force)来强制执行

x ：删除没有被 track 的文件
```
强制删除依赖

```
git clean -dfx
```

## git stash 

场景:在当前分支进行迭代开发，突然有线上bugfix,但是还不想把现在的修改提交，也不希望在Git上看到当前修改的版本

git stash会把所有未提交的修改（包括暂存的和非暂存的）都保存起来，用于后续恢复当前工作目录。
比如下面的中间状态，通过git stash命令推送一个新的储藏，当前的工作目录就干净了。

>stash是本地的，不会通过git push命令上传到git server上

### 缓存本地 & list查看
推荐stash加一个message，用于记录版本，使用git stash save取代git stash命令
git stash list

```
git stash save "test-stash"

git stash list

stash@{0}: On autoswitch: test-stash
```



### 重新应用缓存
```
git stash pop
```
这个指令将缓存堆栈中的第一个stash删除，并将对应修改应用到当前的工作目录

可以使用`git stash apply`命令，将缓存堆栈中的stash多次应用到工作目录中，但并不删除stash拷贝

### 移除stash
```
git stash drop  stash@{0}   
```
后面可以跟着stash名字
或者使用`git stash clear`命令，删除所有缓存的stash

### 查看指定stash的diff
使用`git stash show`命令，后面可以跟着stash名字
在该命令后面添加-p或--patch可以查看特定stash的全部diff