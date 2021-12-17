---
title: Vue3学习
date: 2021-11-16
sidebar: auto
tags:
    - vue
categories:
    - frontend
---

# Vue3源码解析


# 基础入门

## 项目启动

- 使用 VS Code 的官方扩展插件 `Volar`，这个插件给 Vue 3 提供了全面的开发支持
- Chrome安装Vue.js插件

```jsx
npm init @vitejs/app
```

1. 在 Project name 这一行，我们输入项目的名字，例如 vue-admin；
2. 在 Select a framework 这一行输入框架的名字，这里我们选择 vue；
3. 再之后，在 select a variant 这一行，因为在项目里，我们没有选择 TS，所以这里我们依然选择 vue 即可

### 文件目录

```jsx
.
├── README.md
├── index.html           入口文件
├── package.json
├── public               资源文件
│   └── favicon.ico
├── src                  源码
│   ├── App.vue          单文件组件
│   ├── assets
│   │   └── logo.png
│   ├── components   
│   │   └── HelloWorld.vue
│   └── main.js          入口
└── vite.config.js vite工程化配置文件
```

在文件夹内执行 `npm install` 命令，来进行依赖的安装，然后执行 npm run dev 命令来启动项目

### 安装vuex 和vue-router

我们开发的项目是多页面的，所以 vue-router 和 Vuex 也成为了必选项，就像一个团队需要人员配比，Vue 负责核心，Vuex 负责管理数据，vue-router 负责管理路由。我们在 geek-admin 目录中使用下面这段代码安装 Vuex 和 vue-router。

```jsx
npm install vue-router@next vuex@next
```

### 开发规范

```jsx
├── src
│   ├── api            数据请求
│   ├── assets         静态资源
│   ├── components     组件
│   ├── pages          页面
│   ├── router         路由配置
│   ├── store          vuex数据
│   └── utils          工具函数
```

### Router

首先引入了 `createRouter` 和 `createWebHashHistory` 两个函数。

- createRouter 用来新建路由实例
- createWebHashHistory 用来配置我们内部使用 hash 模式的路由，也就是 url 上会通过 # 来区分

```jsx
import {
    createRouter,
    createWebHashHistory,
  } from 'vue-router'
  import Home from '../pages/home.vue'
  import About from '../pages/about.vue'
  
  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router
```

然后我们在 main.js 中，加载 router 的配置：

```jsx
import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
createApp(App)
    .use(router)
    .mount('#app')
```

在App.vue中替换如下内容

```jsx
<template>
  <div>
    <router-link to="/">首页</router-link> | 
    <router-link to="/about">关于</router-link>
  </div>
  <router-view></router-view>
</template>
```

代码中的 `router-link` 和 `router-view` 就是由 vue-router 注册的`全局组件`，

- router-link 负责跳转不同的页面，相当于 Vue 世界中的超链接 a 标签；
- router-view 负责渲染路由匹配的组件，我们可以通过把 router-view 放在不同的地方，实现复杂项目的页面布局。

### 项目规划:

我们在实际项目开发中还会有各种工具的集成，比如写 CSS 代码时，我们需要预处理工具 stylus 或者 sass；组件库开发中，我们需要 Element3 作为组件库；网络请求后端数据的时候，我们需要 Axios。对于团队维护的项目，工具集成完毕后，还要有严格的代码规范。我们需要 Eslint 和 Prettier 来规范代码的格式，Eslint 和 Prettier 可以规范项目中 JavaScript 代码的可读性和一致性。代码的管理还需要使用 Git，我们默认使用 GitHub 来托管我们的代码。此外，我们还会使用 commitizen 来规范 Git 的日志信息。对于我们项目的基础组件，我们还会提供单元测试来确保代码质量和可维护性，最后我们还会配置 GitHub Action 来实现自动化的部署。

## Composition API+ `<script setup>` 上手

`Composition API` (组合式API)可以让我们更好地组织代码结构，而让你感到好奇的 `<script setup>` 本质上是以一种更精简的方式来书写 `Composition API`

- 构建todolist

```jsx
<template>
  <div>
    <h1 @click="add">{{count}}</h1>
  </div>
</template>

<script setup>
import { ref } from "vue";
let count = ref(1)
function add(){
    count.value++
}
</script>

<style>
h1 {
  color: red;
}
</style>
```

我们使用 template 标签放置模板、script 标签放置逻辑代码，并且用 setup 标记我们使用 `<script setup>` 的语法，style 标签放置 CSS 样式。

对于 `ref 返回的响应式数据`，我们需要修改 `.value` 才能生效，而在 `<script setup>` 标签内定义的`变量`和`函数`，都可以在模板中`直接使用`。

我们需要使用 Composition API 的逻辑来拆分代码，把一个功能相关的数据和方法都维护在一起

```jsx
function useTodos() {
  let title = ref("");
  let todos = ref([{ title: "学习Vue", done: false }]);
  function addTodo() {
    todos.value.push({
      title: title.value,
      done: false,
    });
    title.value = "";
  }
  function clear() {
    todos.value = todos.value.filter((v) => !v.done);
  }
  let active = computed(() => {
    return todos.value.filter((v) => !v.done).length;
  });
  let all = computed(() => todos.value.length);
  let allDone = computed({
    get: function () {
      return active.value === 0;
    },
    set: function (value) {
      todos.value.forEach((todo) => {
        todo.done = value;
      });
    },
  });
  return { title, todos, addTodo, clear, active, all, allDone };
}
```

函数就是把那些和清单相关的所有数据和方法，都放在函数内部定义并且返回，这样这个函数就可以放在任意的地方来维护。

因为 ref 和 computed 等功能都可以从 Vue 中全局引入，所以我们就可以把组件进行任意颗粒度的拆分和组合，这样就大大提高了代码的可维护性和复用性。

### `<script setup>` 好用的功能

- 如果没有
要在 `<script>` 中导出一个对象。我们在 setup 配置函数中写代码时，和 Options 的写法比，也多了两层嵌套

```jsx
<script >
import { ref } from "vue";
export default {
  setup() {
    let count = ref(1)
    function add() {
      count.value++
    }
    return {
      count,
      add
    }
  }
}
</script>
```

**使用 `<script setup>` 可以让代码变得更加精简，这也是现在开发 Vue 3 项目必备的写法**

### style 样式的特性

在 style 标签上，当我们加上 scoped 这个属性的时候，我们定义的 CSS 就只会应用到当前组件的元素上，这样就很好地避免了一些样式冲突的问题。

```jsx
<style scoped>
h1 {
  color: red;
}
</style>>
```

这样，组件就会解析成下面代码的样子。标签和样式的属性上，新增了 `data-` 的前缀，确保只在当前组件生效。

```jsx
<h1 data-v-3de47834="">1</h1>
<style scoped>
h1[data-v-3de47834] {
    color: red;
}
</style>
```

果在 scoped 内部，你还想写`全局的样式`，那么你可以用:`global` 来标记，这样能确保你可以很灵活地组合你的样式代码（后面项目中用到的话，我还会结合实战进行讲解）。而且我们甚至可以通过 v-bind 函数，直接在 CSS 中使用 JavaScript 中的变量。

## Vue3响应式

### 什么是响应式

响应式一直都是 Vue 的特色功能之一

我们使用 JavaScript 的某种机制，把 count 包裹一层，每当对 count 进行修改时，就去同步更新 double 的值，那么就有一种 double 自动跟着 count 的变化而变化的感觉，这就算是响应式的雏形了。



### 响应式原理

响应式原理是什么呢？Vue 中用过三种响应式解决方案，分别是 [defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)、Proxy 和 value setter

```jsx
let getDouble = n=>n*2
let obj = {}
let count = 1
let double = getDouble(count)

Object.defineProperty(obj,'count',{
    get(){
        return count
    },
    set(val){
        count = val
        double = getDouble(val)
    }
})
console.log(double)  // 打印2
obj.count = 2
console.log(double) // 打印4  有种自动变化的感觉
```

defineProperty API 作为 Vue 2 实现响应式的原理，它的语法中也有一些缺陷。比如在下面代码中，我们`删除 obj.count` 属性，set 函数就不会执行，double 还是之前的数值。这也是为什么在 Vue 2 中，我们需要 `$delete` 一个专门的函数去删除数据

```jsx
delete obj.count
console.log(double) // doube还是4
```

Vue 3 的响应式机制是基于 Proxy 实现的

Proxy 的重要意义在于它解决了 Vue 2 响应式的缺陷。我们看下面的代码，在其中我们通过 new Proxy 代理了 obj 这个对象，然后通过 get、set 和 deleteProperty 函数代理了对象的读取、修改和删除操作，从而实现了响应式的功能。

```jsx
let proxy = new Proxy(obj,{
    get : function (target,prop) {
        return target[prop]
    },
    set : function (target,prop,value) {
        target[prop] = value;
        if(prop==='count'){
            double = getDouble(value)
        }
    },
    deleteProperty(target,prop){
        delete target[prop]
        if(prop==='count'){
            double = NaN
        }
    }
})
console.log(obj.count,double)
proxy.count = 2
console.log(obj.count,double) 
delete proxy.count
// 删除属性后，我们打印log时，输出的结果就会是 undefined NaN
console.log(obj.count,double)
```

以看出 Proxy 实现的功能和 Vue 2 的 definePropery 类似，它们都能够**在用户修改数据的时候**触发 `set` 函数，从而实现`自动更新 double` 的功能。而且 Proxy 还完善了几个 definePropery 的缺陷，比如说可以**监听到属性的删除**。

Proxy 是`针对对象来监听`，而**不是针对某个具体属性**，所以不仅可以代理那些定义时不存在的属性，还可以代理更丰富的数据结构，比如 Map、Set 等，并且我们也能通过 deleteProperty 实现对删除操作的代理。

- vue3除了proxy外的响应式方法

在 Vue 3 中还有另一个响应式实现的逻辑，就是利用**对象的 get 和 set 函数来进行监听**，这种响应式的实现方式，只能拦截某一个属性的修改，这也是 Vue 3 中 ref 这个 API 的实现

在下面的代码中，我们拦截了 count 的 value 属性，并且拦截了 set 操作，也能实现类似的功能。

```jsx
let getDouble = n => n * 2
let _value = 1
double = getDouble(_value)

let count = {
  get value() {
    return _value
  },
  set value(val) {
    _value = val
    double = getDouble(_value)

  }
}
console.log(count.value,double)
count.value = 2
console.log(count.value,double)
```


### 定制响应式数据

简单入门响应式的原理后，接下来我们学习一下响应式数据在使用的时候的进阶方式。

做清单应用的时候，

解决所有的操作状态在刷新后就都没了这个问题。解决这个问题所需要的，就是让 todolist 和本地存储能够同步。

我们首先可以选择的就是在代码中，显式地声明同步的逻辑，而 watchEffect 这个函数让我们在数据变化之后可以执行指定的函数。

- `watchEffect`
    
    立即执行传入的一个函数，同时`响应式追踪其依赖`，并在其依赖变更时重新运行该函数。
    

我们看下使用 `<script setup>` 重构之后的 todolist 的代码。这段代码使用 watchEffect，数据变化之后会把数据同步到 localStorage 之上，这样我们就实现了 todolist 和本地存储的同步。

```jsx
function useStorage(name, value=[]){
    let data = ref(JSON.parse(localStorage.getItem(name)|| value))
    watchEffect(()=>{
        localStorage.setItem(name,JSON.stringify(data.value))
    })
    return data
}
```

我们可以把日常开发中用到的数据，无论是浏览器的本地存储，还是网络数据，都封装成响应式数据，**统一使用响应式数据开发的模式**。这样，我们开发项目的时候，只需要修改对应的数据就可以



### 第三方工具包—>Vueuse 工具包

VueUse 趁着这一波 Vue 3 的更新，跟上了响应式 API 的潮流。VueUse 的官方的介绍说这是一个 Composition API 的工具集合，适用于 Vue 2.x 或者 Vue 3.x，用起来和 React Hooks 还挺像的。

```jsx
npm install @vueuse/core
```

在下面这段代码中，我们使用 useFullscreen 来返回全屏的状态和切换全屏的函数。

这样，我们就不需要考虑浏览器全屏的 API，而是直接使用 VueUse 响应式数据和函数就可以很轻松地在项目中实现全屏功能。

之前项目可能每个页面都要监听到,现在使用的可以独立封住起来爽很多

```jsx
<template>
  <h1 @click="toggle">click</h1>
</template>
<script setup>
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, enter, exit, toggle } = useFullscreen()
</script>
```

## 组件化开发

在日常项目中,组件化无处不再,通过对组件功能的封装,可以像搭积木一样开发

- 通用型组件

通用型组件就是各大组件库的组件风格，包括按钮、表单、弹窗等通用功能。

- 业务型组件

业务型组件包含业务的交互逻辑，包括购物车、登录注册等，会和我们不同的业务强绑定。

组件的开发由于**要考虑代码的复用性**，会比通常的业务开发要求更高，需要有更好的可维护性和稳定性的要求

在React开发中逐渐开悟组件化的重要划分

### 构建组件Rate尝试

就是根据 rate 的值，来渲染出不同数量的星星。

使用组件的方式就是使用:value 的方式，通过属性把 score 传递给 Rate 组件，就能够在页面上根据 score 的值

```jsx
<template>
    <div>
        {{rate}}
    </div>
</template>

<script setup>
import { defineProps,computed } from 'vue';
let props = defineProps({
    value: Number
})
// 返回的*是string
let rate = computed(()=>"★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value))
</script>
```

### 组件事件

在 Vue 中，我们使用 emit 来对外传递事件，这样父元素就可以监听 Rate 组件内部的变化。

添加下面的代码，我们把★和☆用 span 包裹，并绑定鼠标的 mouseover 事件。然后通过:style，我们可以设置实心五角星★的宽度，实现一样的评级效果

通过左右平移实现覆盖

```jsx
<template>
<div :style="fontstyle">
    <div class='rate' @mouseout="mouseOut">
      <span @mouseover="mouseOver(num)"  v-for='num in 5' :key="num">☆</span>
      <span class='hollow' :style="fontwidth">
        <span @mouseover="mouseOver(num)" v-for='num in 5' :key="num">★</span>
      </span>
    </div> 
</div>
</template>
<script setup>
// ...其他代码
// 评分宽度
let width = ref(props.value)
function mouseOver(i){
    width.value = i 
}
function mouseOut(){
    width.value = props.value
}
const fontwidth = computed(()=>`width:${width.value}em;`)

</script>

<style scoped>
.rate{
  position:relative;
  display: inline-block;
}
.rate > span.hollow {
  position:absolute;
  display: inline-block;
  top:0;
  left:0;
  width:0;
  overflow:hidden;
}
</style>
```

```jsx
<template>
  省略代码
   <span @click="onRate(num)" @mouseover="mouseOver(num)" v-for='num in 5' :key="num">★</span>

</template>
<script setup>
import { defineProps, defineEmits,computed, ref} from 'vue';

let emits = defineEmits('[update-rate]') // 定义emits
function onRate(num){
    emits('update-rate',num)
}
</script>
```

在下面的代码中，我们使用 @update-rate 接收 Rate 组件 emit 的数据，并且修改 score 的值，这样就完成了数据修改后的更新。

```jsx
<template>

<h1>你的评分是 {{score}}</h1>
<Rate :value="score" @update-rate="update"></Rate>

</template>

<script setup>
import {ref} from 'vue'
import Rate from './components/Rate1.vue'
let score = ref(3.5)
function update(num){
    score.value = num
}

</script>
```

### 组件的 v-model

nput 标签上使用 v-model 这个属性就实现了这个需求。在自定义组件上我们也可以用 v-model，对于自定义组件来说，v-model 是两个语法，也就是：传入属性和接收组件传递数据和的简写。

默认情况下，组件上的 `v-model` 使用 `modelValue` 作为 prop 和 `update:modelValue` 作为事件。我们可以通过向 `v-model` 传递参数来修改这些名称

首先我们把属性名修改成 `modelValue`，然后如果我们想在前端页面进行点击评级的操作，我们只需要通过 update:modelValue 这个 emit 事件发出通知即可

```jsx
let props = defineProps({
    modelValue: Number,
    theme:{type:String,default:'orange'}
})
let emits = defineEmits(['update:modelValue'])
```

然后我们就可以按如下代码中的方式，使用 Rate 这个组件，也就是直接使用 v-model 绑定 score 变量。这样，就可以实现 value 和 onRate 两个属性的效果。

```jsx
<template>

<h1>你的评分是 {{score}}</h1>
<Rate v-model="score"></Rate>
</template>
可以不再使用ref的形式
```

新的v-modal

```jsx
<script setup>
import {ref} from 'vue'
import Rate from './components/Rate1.vue'
let score = ref(3.5)
function update(num){
    score.value = num
}

</script>
```

旧的组件传值形式

### solt插槽

**给组件中传递内容**

就像在下面的代码中 `click` 并不是 `button` 标签的属性，而是`子元素`，button 标签会把`子元素渲染在居中`的位置。

```jsx
<button> click </button>
```

我们的 Rate 组件也是类似的，**在 Vue 中直接使用 `slot` 组件来显示组件的子元素**，也就是所谓的插槽。

**我们使用 slot 组件渲染 Rate 组件的子元素**

```jsx
<template>
<div :style="fontstyle">
    <slot></slot> // 展示要传入的子元素
    <div class='rate' @mouseout="mouseOut">
      <span @mouseover="mouseOver(num)"  v-for='num in 5' :key="num">☆</span>
      <span class='hollow' :style="fontwidth">
        <span @click="onRate(num)" @mouseover="mouseOver(num)" v-for='num in 5' :key="num">★</span>
      </span>
    </div> 
</div>
</template>
```

在使用Rate组件时,`向其中solt插槽`传递需要展示的信息—文本,img,组件都可以

```jsx
<Rate v-model="score">课程评分</Rate>
<Rate v-model="score">
    <img width="14" src="/favicon.ico">
</Rate>
```

### 动画

**前端过渡和动效**

CSS 的属性 transition 来实现过渡，实现方式非常简单，直接在 div 的样式里加上一个 transition 配置就可以了。

```jsx
<style>
.box{
  background:#d88986;
  height:100px;
  transition: width 1s linear;
}
</style>
```

给 transition 配置了三个参数，

1. 就是 div 的 `width` 属性需要过渡，
2. 过渡时间是 `1` 秒
3. 并且过渡方式是`线性过渡`linear。

我们可以通过 `transition` 来控制一个元素的属性的值，缓慢地变成另外一个值，这种操作就称之为过渡。除了 transition，我们还可以通过 `animation` 和 `keyframe` 的组合实现动画。

通常我们实现的动画，会给 Web 应用带来额外的价值。动画和过渡可以增加用户体验的舒适度，让变化更加自然，并且可以吸引用户的注意力，突出重点。transition 和 animation 让我们可以用非常简单的方式实现动画

**Vue3动画实现**

Vue 3 中提供了一些动画的封装，使用内置的 transition 组件来控制组件的动画

如果我们想要在显示和隐藏标题文字的时候，加入动效进行过渡，那么我们直接使用 `transition` 组件包裹住需要动画的元素就可以了。

```jsx
<transition name="fade">
    <h1 v-if="showTitle">你好 Vue 3</h1>
  </transition>
```

具体 class 的名字，Vue 的官网有一个图给出了很好的解释，图里的 `v-enter-from` 中的 v，就是我们设置的 `name` 属性。所以在我们现在这个案例中，标签在进入和离开的时候，会有 fade-enter-active 和 fade-leave-active 的 class，进入的开始和结束会有 fade-enter-from 和 face-enter-to 两个 class。



根据上图所示的原理，我们在 style 标签中新增如下代码，通过 fade-enter-active 和 fade-leave-active 两个 class，去控制动画全程的过渡属性。设置 opacity 有 0.5 秒的过渡时间，并且在元素进入前和离开后设置 opacity 为 0。

```jsx
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

首先，我们给 transition 动画设置 `name` 为 `modal`，在 style 中通过对 model 对应的 CSS 设置过渡效果后，就给弹窗增加了弹窗的效果。

```jsx
<transition name="modal">
  <div class="info-wrapper" v-if="showModal">
    <div class="info">
      哥，你啥也没输入！
    </div>
   </div>
</transition>

<style>
  .modal-enter-from {
    opacity: 0;
    transform: translateY(-60px);
  }
  .modal-enter-active {
    transition: all 0.3s ease;
  }
  .modal-leave-to {
    opacity: 0;
    transform: translateY(-60px);
  }
  .modal-leave-active {
    transition: all 0.3s ease;
  }
</style>
```

**列表动画**

现在清单列表并不是一个单独的标签，而是 v-for 渲染的列表元素;***怎么实现列表项依次动画出现的效果***

在 Vue 中，我们把这种需求称之为**列表过渡**。

因为 transition 组件会把子元素作为一个整体同时去过渡，所以我们需要一个新的内置组件 `transition-group`。在 v-for 渲染列表的场景之下，我们使用 transition-group 组件去包裹元素，通过 tag 属性去指定渲染一个元素。

`transition-group` 组件还有一个特殊之处，就是不仅可以进入和离开动画，还可以`改变定位`。

```jsx
<ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="todo in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }"> {{ todo.title }}</span>
        </li>
      </transition-group>

    </ul>
<style>
.flip-list-move {
  transition: transform 0.8s ease;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
```

通过上面的代码，我们就可以得到如下的实现效果。你可以看到，在新增列表和显示错误信息的弹窗上，都设置了过渡和动画。

**页面切换动画**

对于一般的前端页面应用来说，还有一个常见的动画切换的场景，就是在页面切换这个场景时的动画。**这个动画切换场景的核心原理和弹窗动画是一样的，都是通过 transition 标签控制页面进入和离开的 class。**

现在默认是在 `vue-router` 的模式下，我们使用 `router-view` 组件进行动态的组件渲染。在路由发生变化的时候，我们计算出对应匹配的组件去填充 `router-view`。

如果**要在路由组件上使用转场**，并且**对导航进行动画处理**，你就需要使用 `v-slot API`。我们来到 src/App.vue 组件中，因为之前 router-view 没有子元素，所以我们要对代码进行修改。

**Router-view效果实现**

在下面的代码中，router-view 通过 `v-slot` 获取渲染的组件并且赋值给 Component，然后使用 transition 包裹需要渲染的组件，并且通过内置组件 component 的 is 属性动态渲染组件

```jsx
<router-view v-slot="{ Component }">
  <transition  name="route" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>
```

**JavaScript 动画**

在前端的大部分交互场景中，**动画的主要目的是提高交互体验，CSS 动画足以应对大部分场景**。但如果碰见比较复杂的动画场景，**就需要用 JavaScript 来实现，比如购物车、地图等场景**。

如果我们想在删除的时候，实现一个图标飞到废纸篓的动画，那么在这个场景下，使用单纯的 CSS 动画就不好实现了，我们需要引入 JavaScript 来实现动画。

在 Vue 的 transition 组件里，我们可以分别设置 `before-enter，enter 和 after-enter` 三个函数来更精确地控制动画

# 全家桶实战篇

前面的基础入门篇中的几讲，都是针对 Vue 本身的进阶内容。通过这几讲，我们巩固和进阶了 Composition API、组件化和动画等关键知识，Vue 本身的知识点已经掌握得差不多了;

包括 Vuex、vue-router、Vue Devtools 等生态库，以及实战开发中需要用到的库。这⼀模块学完，你就能全副武装，应对复杂的项目开发也会慢慢得心应手。

## VUEX

vuex存在的必然:

如果把开发的项目比作公司的话，我们项目中的各种数据就非常像办公用品。很多小公司在初创时期不需要管理太多，大家随便拿办公用品就行。但是公司大了之后，就需要一个专门的办公用品申报的流程，对数据做统一地申请和发放，这样才能方便做资产管理。**Vuex 就相当于我们项目中的大管家，集中式存储管理应用的所有组件的状态。**

### 安装

我们项目结构中的 src/store 目录，就是专门留给 Vuex 的，在项目的目录下，我们执行下面这个命令，进行 Vuex 的安装工作

```jsx
npm install vuex@next
```

安装完成后，我们在 `src/store` 中先新建 index.js，在下面的代码中，我们使用 createStore 来创建一个数据存储，我们称之为 `store`。

store 内部除了数据，还需要一个 mutation 配置去修改数据，你可以把这个 `mutation` 理解为数据更新的申请单，mutation 内部的函数会把 state 作为参数，我们直接操作 **state.count** 就可以完成数据的修改。

```jsx
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      count: 665
    }
  },
  mutations: {
    add (state) {
      state.count++
    }
  }
})
```

### 链接Store

在 Vue 的组件系统之外，多了一个数据源，里面只有一个变量 count，并且有一个方法可以累加这个 count。然后，我们在 **Vue 中注册这个数据源**，在项目入口文件 `src/main.js` 中，使用 `app.use(store)` 进行注册，这样 **Vue 和 Vuex 就连接上了**。

```jsx
const app = createApp(App)
app.use(store)
    .use(router)
    .mount('#app')
```

之后，我们在 src/components 文件夹下新建一个 Count.vue 组件，在下面的代码中，template 中的代码我们很熟悉了，就是一个 div 渲染了 count 变量，并且点击的时候触发 add 方法。在 script 中，我们使用 useStore 去获取数据源，初始化值和修改的函数有两个变化：

- count 不是使用 ref 直接定义，而是使用计算属性返回了 store.state.count，也就是刚才在 src/store/index.js 中定义的 count。
- add 函数是用来修改数据，这里我们`不能直接去操作 store.state.count +=1`，因为这个数据属于 Vuex 统一管理，所以我们要使用 `store.commit(‘add’)` 去触发 Vuex 中的 mutation 去修改数据。

什么时候的数据用 Vuex 管理，什么时候数据要放在组件内部使用 ref 管理呢？

答案就是，对于一个数据，如果只是组件内部使用就是用 ref 管理；如果我们需要跨组件，跨页面共享的时候，我们就需要把数据从 Vue 的组件内部抽离出来，放在 Vuex 中去管理

比如项目中的登录用户名，页面的右上角需要显示，有些信息弹窗也需要显示。这样的数据就需要放在 Vuex 中统一管理，每当需要抽离这样的数据的时候，我们都需要思考这个数据的初始化和更新逻辑。



我们在决定一个数据是否用 Vuex 来管理的时候，核心就是要思考清楚，**这个数据是否有共享给其他页面或者是其他组件的需要。如果需要，就放置在 Vuex 中管理；如果不需要，就应该放在组件内部使用 ref 或者 reactive 去管理。**

### 手写miniVuex

首先，我们需要`创建一个变量 store 用来存储数据`。下一步就是把这个 store 的数据包`转成响应式的数据`，并且`提供给 Vue 组件使用`。

在 Vue 中有 [provide/inject](https://v3.cn.vuejs.org/guide/component-provide-inject.html#%E5%A4%84%E7%90%86%E5%93%8D%E5%BA%94%E6%80%A7) 这两个函数专门用来做数据共享，`provide` 注册了数据后，所有的子组件都可以通过 `inject` 获取数据，这两个函数官方文档介绍得比较详细

直接进入到 src/store 文件夹下，新建 gvuex.js。下面的代码中，我们使用一个 Store 类来管理数据，类的内部使用 _state 存储数据，使用 mutations 来存储数据修改的函数，**注意这里的 state 已经使用 reactive 包裹成响应式数据了**

```jsx
import { inject, reactive } from "@vue/runtime-core"

const STORE_KEY = "__store__"
function useStore() {
    return inject(STORE_KEY)
}
// 创建store实例
function createStore(options) {
    return new Stroe(options)
}

class Store {
    constructor(options) {
// 实现数据响应式
        this._state = reactive({
            data: options.state(),
        })

        this._mutations = options.mutations
    }
}

export { createStore, useStore }
```

上面的代码还暴露了 createStore 去创建 Store 的实例，并且可以在任意组件的 setup 函数内，使用 useStore 去获取 store 的实例。下一步我们回到 src/store/index.js 中，把 vuex 改成 ./gvuex。

```jsx
// import { createStore } from "vuex"
import { createStore } from "./gvuex"
```

最终我们使用 store 的方式，在项目入口文件 src/main.js 中使用 app.use(store) 注册。为了让 useStore 能正常工作，下面的代码中，我们需要**给 store 新增一个 install 方法**，这个方法会在 **app.use 函数内部执行**。我们通过 app.provide 函数注册 store 给全局的组件使用。

```jsx
class Store {
  // main.js入口处app.use(store)的时候，会执行这个函数
  install(app) {
    app.provide(STORE_KEY, this)
  }
}
```

下面的代码中，Store 类内部变量 _state 存储响应式数据，读取 state 的时候直接获取响应式数据 _state.data，并且提供了 commit 函数去执行用户配置好的 mutations。

```jsx
import { inject, reactive } from 'vue'
const STORE_KEY = '__store__'
function useStore() {
  return inject(STORE_KEY)
}
function createStore(options) {
  return new Store(options)
}
class Store {
  constructor(options) {
    this.$options = options
    this._state = reactive({
      data: options.state
    })
    this._mutations = options.mutations
  }
  get state() {
    return this._state.data
  }
  commit = (type, payload) => {
    const entry = this._mutations[type]
    entry && entry(this.state, payload)
  }
  install(app) {
    app.provide(STORE_KEY, this)
  }
}
export { createStore, useStore }
```

这样在组件内部，我们就可以使用这个迷你的 Vuex 去实现一个累加器了

### Vuex实战

Vuex 就是一个公用版本的 ref，提供响应式数据给整个项目使用;

**实现computed功能:**

在 Vuex 中，你可以使用 getters 配置，来实现 `computed` 的功能

```jsx
getters: {
        double(state) {
            return state, count * 2
        },
    },

```

在组件中使用,相当于把计算的逻辑也同时交给了vuex

```jsx
let double = computed(()=>store.getters.double)
```

**异步请求:**

有很多数据我们都是从网络请求中获取到的。在 Vuex 中，mutation 的设计就是用来实现同步地修改数据。如果数据是异步修改的，我们需要一个新的配置 `action`。

1. createStore 的配置中，新增了 actions 配置，这个配置中所有的函数，可以通过解构获得 `commit` 函数。
2. 内部的异步任务完成后，就随时可以调用 `commit` 来**执行** `mutations` 去更新数据。

```jsx
actions: {
        asyncAdd({ commit }) {
            setTimeout(() => {
                commit("add") // 执行mutations中的 add方法
            }, 2000)
        },
    },

```

actions并非直接修改数据,也不过是通过异步的操作触发mutation进行数据更新.不过是采用了commit这个属性进行驱动

组件中使用:

```jsx
function asyncAdd(){
    store.dispatch('asyncAdd')
}
```

### Vuex的整体逻辑

vue中的组件负责渲染页面,组件中用到的跨页面的数据,就是用state来储存,但是vue组件无法直接修改共享的数据.

需要使用actions/mutation 去做数据的修改



官方流程图如下:



**Vue组件—>dispatch—>actions—>commit—>mutations—>state—>Render**

由于 Vuex 所有的数据修改都是通过 mutations 来完成的，因而我们可以很方便地监控到数据的动态变化，后面我们可以借助官方的调试工具，非常方便地去调试项目中的数据变化。

总的来说何时使用Vuex的关键点在于:`这个数据data是否需要共享给其他组件/页面使用`

### 下一代VUEX

为了解决Vuex对类型推导的支持,Vuex的作者搞了哥Pinia,

Pinia 的 API 的设计非常接近 Vuex5 的提案，首先，Pinia 不需要 Vuex 自定义复杂的类型去支持 TypeScript，天生对类型推断就非常友好，并且对 Vue Devtool 的支持也非常好，是一个很有潜力的状态管理框架。

[Pinia 🍍](https://pinia.esm.dev/)

## Vue-Router

### 前端路由实现原理

现在，通过 URL 区分路由的机制上，有两种实现方式，

- hash 模式，通过 URL 中 # 后面的内容做区分，我们称之为 `hash-router`；
- history 模式，在这种方式下，路由看起来和正常的 URL 完全一致(根据H5自带pushState,replaceState)。

这两个不同的原理，在 vue-router 中对应两个函数，分别是 `createWebHashHistory` 和 `createWebHistory`。



### hash 模式

单页应用在页面交互、页面跳转上都是无刷新的，这极大地提高了用户访问网页的体验。为了实现单页应用，前端路由的需求也变得重要了起来。

类似于服务端路由，前端路由实现起来其实也很简单，就是匹配不同的 URL 路径，进行解析，然后动态地渲染出区域 HTML 内容。

匹配不同的url进行get;

但是这样存在一个问题，就是 URL 每次变化的时候，都会造成页面的刷新。解决这一问题的思路便是在改变 URL 的情况下，保证页面的不刷新。

在 2014 年之前，大家是通过 hash 来实现前端路由，URL hash 中的 # 就是类似于下面代码中的这种 # ：

```jsx
http://www.xxx.com/#/login
```