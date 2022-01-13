---
title: Vue
date: 2021-08-22
sidebar: auto
tags:
    - vue
categories:
    - frontend
---
## Vue

### 组件通信

```jsx
import { useState } from "react";
import "./styles.css";

function One({ count, setCount }) {
  return (
    <div style={{ border: "1px solid red" }}>
      <h2>Conponent One</h2>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <div>{count}</div>
    </div>
  );
}

function Two({ count, setCount }) {
  return (
    <div style={{ border: "1px solid red" }}>
      <h2>Conponent Two</h2>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <div>{count}</div>
    </div>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <One count={count} setCount={(c) => setCount(c)} />
      <Two count={count} setCount={(c) => setCount(c)} />
    </div>
  );
}
```

### 数据响应式原理 vue2 & vue3

**VUE2**

- 核心API-Object.defineProperty
- 如何实现响应式
- Object.defineProperty的一些缺点(VUE3.0启用 Proxy)
    - Proxy存在兼容性问题
        - 且无法polyfill
        - IE11等无法使用

```jsx
// 触发更新视图
function updateView() {
    console.log('视图更新')
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype
// Object.create 方法  
// --->创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
    arrProto[methodName] = function () {
        updateView() // 触发视图更新
        oldArrayProperty[methodName].call(this, ...arguments)
        // Array.prototype.push.call(this, ...arguments)
    }
})

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    // 深度监听
    observer(value)

    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                // 深度监听
                observer(newValue)

                // 设置新值
                // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
                value = newValue

                // 触发更新视图
                updateView()
            }
        }
    })
}

// 监听对象属性
function observer(target) {
    if (typeof target !== 'object' || target === null) {
        // 不是对象或数组
        return target
    }

    // 1.0 不可以这样处理 array 的方法  --->污染全局的 Array 原型
    // Array.prototype.push = function () {
    //     updateView()
    //     ...
    // }
		// 2.0 只能通过copy代理一份
    if (Array.isArray(target)) {
        target.__proto__ = arrProto
    }

    // 重新定义各个属性（for in 也可以遍历数组）
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

// 准备数据
const data = {
    name: 'zhangsan',
    age: 20,
    info: {
        address: '北京' // 需要深度监听
    },
    nums: [10, 20, 30]
}

// 监听数据
observer(data)

// 测试
// data.name = 'lisi'
// data.age = 21
// // console.log('age', data.age)
// data.x = '100' // 新增属性，监听不到 —— 所以有 Vue.set
// delete data.name // 删除属性，监听不到 —— 所有已 Vue.delete
// data.info.address = '上海' // 深度监听
data.nums.push(4) // 监听数组
```

- 几个缺点
    - Object.defineProperty缺点
        - 深度监听,需要`递归到底`,一次性计算量大
        - 无法监听`新增/删除`属性(需使用 Vue.`set`Vue.`delete`)
        - 无法`监听`原生`数组`,需要特殊处理

VUE3—**Proxy响应式**

- vue3如何用proxy实现响应式
    - `深度监听`通过`get`来获取—只有触发get才会又,触发其他的方法set,deleteProperty不会
        - 你获取到那一层,才会触发那一层的响应式(递归)
            - obj.a  只到a,obj.a.b 不会触发 obj.a.b.c
        - 不像`definePropery`的深度监听,一开始就已经深度递归了.一次性递归所有层级
- proxy的缺点
    - 无法兼容IE,无法polyfill
    **Polyfill 是一块代码（通常是 Web 上的 JavaScript），用来为旧浏览器提供它没有原生支持的较新的功能**
    

### Vue2 & Vue3 区别

### options API生命周期 —>类似vue2的生命周期

- 销毁生命周期名称修改
    - beforeDestroy 改为 `beforeUnmout`
    - destroy 改为 `unmouted`
- 其余沿用vue2生命周期不变
    - 在vue2中仍然可以用使用原有的date,methods,props等方法不变

### setUp中的新生命周期定义

`setup`等同于`beforeCreate` & `Create`

与老的几乎一致,同时新老都可以使用

### 虚拟dom ， diff

- diff即对比的意思,是一个广泛的概念,如linux diff命令,git diff等
- 两个js对象 也可以做diff ,如 `https://github.com/cujojs/jiff`
- 两颗树做diff,如 这里的 vdom  diff

### Vue 和 react 的区别

从思想、生态、语法、数据、通信、diff等角度自己总结一下吧。

### 请阐述一下 `v-model` 的原理

v-model 本质上不过是语法糖，可以用 v-model 指令在表单 `input、textarea`及 `select` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。
v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text 和 textarea 元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

原理:

v-model只不过是一个语法糖而已,真正的实现靠的还是

- v-bind:绑定响应式数据
- 触发oninput 事件并传递数据

```jsx
<input v-bind:value="searchText"
v-on:input="searchText=$event.target.value"/>

```

### 在 react/vue 中数组是否可以以在数组中的次序为 key

不可，key应为唯一标示，在数组变更时插入或删除后，index无法确保`始终`指向对应的`序列`

### vue 生命周期&父子组件生命周期

执行顺序：父组件先创建，然后子组件创建；子组件先挂载，然后父组件挂载，

即

```jsx
父beforeCreate-> 父create -> 子beforeCreate-> 子created -> 子mounted -> 父mounted
```

子组件挂载完成后，父组件还未挂载。所以组件数据回显的时候，在父组件`mounted`中获取api的数据，子组件的`mounted`是拿不到的。

## **补充单一组件钩子执行顺序**

> activated deactivated=⇒ keep-alive的生命周期
> 
1. beforeCreate
2. created
3. beforeMount
4. mounted
5. beforeUpdate
6. updated
7. activated
8. deactivated
9. beforeDestroy
10. destroyed
11. errorCaptured

### computed和methods有什么区别

- computed有缓存—返回计算的值给到视图View
    - data`不变`则`不会`重新计算
- watch监听引用类型,拿不到oldVal
    - array,object,function引用类型，拿不到 oldVal 。
    - 因为指针相同，此时已经指向了新的 val

### 请阐述keep-alive组件的作用和原理

### VUEX

- state
- getters
- action
异步操作
- mutation
原子级别的多个操作(同步)

在组件中使用

- dispatch
- commit
- mapState
- mapGetters
- mapActions
- mapMutations
