---
title: 数组循环
date: 2021-09-09
sidebar: auto
tags:
 - tips
categories: 
 - frontend

---

## for of

- for...in和forEach/for是常规的`同步遍历`
- for...of用于异步的遍历



> for...in 语句用于遍历数组或者对象的属性（对数组或者对象的属性进行循环操作）。
> for in得到对对象的key或数组,字符串的下标;
> for of 和forEach一样,是直接得到值—同步遍历 

> **for of 不能给对象用**;允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构

```js
function muti(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * num)
        }, 1000)
    })
}

const arr = [1, 2, 3]
//for...in和forEach/for是常规的同步遍历
arr.forEach(async (i) => {
    const res = await muti(i)
    console.log(res)
})

// for...of用于异步的遍历
!(async function () {
    for (let e of arr) {
        const res = await muti(e)
        console.log("异步调用", res)
    }
})()
```

主要是项目中,返回fetch请求url,按照index进行调用,数据渲染dom更新不及时,才使用了for of

## map



1. 可以使用return，return出来的是一个新数组，新数组不影响原数组；
2. 不可以使用break