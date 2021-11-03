---
title: ES6的一些特性
date: 2020-09-12
sidebar: auto
tags:
    - tips
categories:
    - frontend
---

## Map & Set

对象是一种无需结构

-   有序 :操作慢
-   无序:操作快,但`无序`

结合二者优点的数据结构-->二叉树

### Map 和 Object 的区别

-   API 不同,Map 可以以任意类型为 key
-   Map 是`有序结构`
-   Map 的操作同样很快

```js
const m = new Map([["key1", "hello"][("key2", 2)][("key3", { x: 99 })]])

m.set("name", "xxxss")
m.delete("key2")
m.has("key3")
// 有序结构
m.forEach((value, key) => console.log(key, value))
m.size //3
// 以对象类型为key
const o = { name: "xxx" }
m.set(0, "object key")
// 以fn类型为key
function fn() {}
m.set(fn, "fn key")
```

关联两个对象

```js
obj1, obj2

m.set(obj1, obj2)
m.get(obj1) //即可获取obj2
```

有序的 Map 也很快

```js
const m = new Map()
for (let i = 0; i < 800 * 10000; i++) {
    m.set(i, i)
}
console.time("map find")
m.get(200000)
console.timeEnd("map find")
```

### Set 和数组 Array 的区别

-   Set 元素不可重复
    -   数组去重用过此属性
-   Set 是无需结构,操作快

```js

const set=new  Set([10,20,30,40])

set.add(50)
set.delete(20)
set.has(30)
set.size
// 无序,循环没有index
set.forEach(val=>console.log(val))

```

无序 Set 操作很快相比 arr(有序结构)

```js
cosnt set=new Set()
for(let i=0;i<10000*100;i++){
set.add(i)
}
console.time('set add')
set.add('a')
console.timeEnd('set add')
console.time('set delete')
set.delete(500000)
console.timeEnd('set delete')


```

### WeakMap & WeakSet

+ Weak为弱引用,防止内存泄漏
+ WeakMap只能用`object`作为`key`
+ WeakSet只能用`object`做`value`
+ 没有forEach和size,只能用add delete has
  + 因为是弱引用,里面没有index这一属性,引入内部add的数据可能随时被销毁

  
```js
const wMap=new WeakMap()
function fn(){
    const obj={name:'cc'}
    wMap.set(obj,'name info')
}
fn()
// fn调用完成,按照标记清除的垃圾回收机制,obj已经销毁,但是不影响弱引用关系
// 防止内存泄漏
console.log(wMap)
↧
WeakMap {{…} => 'name info'}
[[Entries]]
0: {Object => "name info"}
[[Prototype]]: WeakMap

```

#### WeakMap使用场景

```js
const userInfo={name:'kk'}
const cityInfo={city:'北京'}

//让俩对象产生关联--常规以属性方式关联
userInfo.city=cityInfo;
// 让二者保持独立关系
//建立关联关系,而且二者保持独立-->不影响彼此的**销毁逻辑**
wMpa.set(userInfo,cityInfo)
wMap.get(useInfo) 
```
#### WeakSet 
+ 弱引用,防止内存泄漏,只能用对象作为value
+ 没有forEach和size,只能用add delete has


```js
cosnt wSet=new WeakSet()
function fn(){
    const obj={name:'kk'}
    wSet.add(obj)
}
fn()
// 引用关系不耽误gc清理机制正常运行

```