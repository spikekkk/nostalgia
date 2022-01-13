---
title: JavaScript
date: 2021-08-22
sidebar: auto
tags:
    - js
categories:
    - frontend
---

## JavaScript & ES专题

### 什么是执行上下文

https://yuchengkai.cn/docs/frontend/#%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87

当执行 JS 代码时，会产生三种执行上下文

- 全局执行上下文
- 函数执行上下文
- eval 执行上下文

每个执行上下文中都有三个重要的属性

- 变量对象（VO），包含变量、函数声明和函数的形参，该属性只能在全局上下文中访问
- 作用域链（JS 采用词法作用域，也就是说变量的作用域是在定义时就决定了）
- this

在生成执行上下文时，会有两个阶段。

1. 第一个阶段是创建的阶段（具体步骤是创建 VO），JS 解释器会找出`需要提升`的`变量`和`函数`，并且给他们`提前`在内存中`开辟`好空间，`函数`的话会将整个函数`存入内存中`，变量`只声明`并且`赋值`为 `undefined`，
2. 所以在第二个阶段，也就是代码执行阶段，我们可以直接`提前使用`。

在提升的过程中，相同的函数会覆盖上一个函数，并且函数优先于变量提升

```jsx
b() // call b second

function b() {
	console.log('call b fist')var foo = 1
(function foo() {
    foo = 10
    console.log(foo)
}()) // -> ƒ foo() { foo = 10 ; console.log(foo) }
}
function b() {
	console.log('call b second')
}
var b = 'Hello world'
```

对于非匿名的立即执行函数需要注意以下一点

```jsx
var foo = 1
(function foo() {
    foo = 10
    console.log(foo)
}()) // -> ƒ foo() { foo = 10 ; console.log(foo) }
```

因为当 JS 解释器在遇到`非匿名`的`立`即`执行`函数时，会创建一个辅助的特定对象，然后`将函数名称`作为这个`对象的属性`，因此函数内部才可以访问到 foo，但是这个值又是只读的，所以对它的赋值并不生效，所以打印的结果还是这个函数，并且外部的值也没有发生更改

### script异步加载 JS 脚本时，async 与 defer 有何区别

在正常情况下，即 `<script>` 没有任何额外属性标记的情况下，有几点共识

JS 的脚本分为`加载`、`解析`、`执行`几个步骤，简单对应到就是 fetch (加载) 和 execution (解析并执行) JS 的脚本加载(fetch)且执行(execution)会阻塞 DOM 的渲染，因此 JS 一般放到最后头 而 defer 与 async 的区别如下:

相同点: **异步加载 (fetch)** 

不同点: 

- async 加载(fetch)完成后`立即执行 (execution)`，因此可能`会阻塞 DOM 解析`；
- defer 加载(fetch)完成后`延迟`到 `DOM 解析完成`后才会执行(execution)**，但会在事件 `DomContentLoaded`之前

### 什么是闭包，闭包的使用场景 & 如何清理垃圾回收

闭包是一个函数, 其可以记住并访问外部变量. 

- 函数当参数
- 函数当返回值
1. 在函数被创建时, 函数的隐藏属性 `[[Environment]]` 会记住`函数被创建时`的位置, 即`当时的词法环境` Lexical Environment
2. 这样, 无论在哪里调用函数, 都会去到 [[Environment]] 所引用的词法环境

当查找变量时, 先在词法环境`{ }`内部查找, 当没有找到局部变量时, 前往当前词法环境所记录的外部词法环境查找

> 闭包的应用: 封装`私有变量`和处理`回调函数`
> 

### this 是什么 & 绑定方式（call apply bind）

- new 绑定

这是最后一种this绑定规则，要求我们重新思考JavaScript中关于函数和对象的常见误解。

JavaScript拥有着new操作符，而且使用它的代码模式和我们在面向类语言中看到的基本一样；大多数开发者猜测JavaScript机制在做某种相似的事情。但是，实际上JavaScript的机制和 new 在 JS中的用法所暗示的面相类的功能 没有任何联系。

首先，让我们重新定义JavaScript的构造器是什么？在JS中，**构造器仅仅是一个函数**，他们偶尔地与前置的 **new**操作符一起调用。它们本质上只是一般的函数，在被使用 **new**来调用时改变了行为。

所以，可以说任何函数在前面加上 new 来被调用，这使函数调用成为一个 ***构造器调用***。这是一个重要而微妙的区别：实际上不存在 构造器函数 这样的东西，而只有函数的**构造器调用**。

**当在函数前面被加入 new 调用时，也就是构造器调用时，下面这些事情会自动完成**：

1. 一个全新的对象会被凭空创建（就是被构建）
2. 这个新构建的对象会被接入原型链 （ [[`Prototype`]] ）
3. 这个新构建的对象被设置为函数调用的 **`this**` 绑定
4. 除非函数返回一个它自己的其他**对象**，否则这个被 new 调用的函数将自动返回这个新构建的对象。

```jsx
function create() {
    // 创建一个空的对象
    let obj = new Object()
    // 获得构造函数
    let Con = [].shift.call(arguments)
    // 链接到原型
    obj.__proto__ = Con.prototype
    // 绑定 this，执行构造函数
    let result = Con.apply(obj, arguments)
    // 确保 new 出来的是个对象
    return typeof result === 'object' ? result : obj
}
```

说下它的执行顺序 & 解读下

```jsx
var obj1 = {
  val: 45,
  fnn: function() {
    var val = 2;
    console.log(this);
    val *= 2;
    console.log(val);
    console.log(this.val);
  }
}

obj1.fnn();
var ff = obj1.fnn;
ff()
// 说下它的执行顺序 & 解读下
```

### 什么是原型 & 原型链

每个函数都有 `prototype`属性，除了 `Function.prototype.bind()`，该属性指向原型。

每个对象都有 **proto** 属性，指向了创建该对象的构造函数的原型。

其实这个属性指向了 `[[prototype]]`，但是 [[prototype]] 是内部属性，我们并不能访问到，所以使用 *proto* 来访问。

对象可以通过 **proto** 来寻找不属于该对象的属性，**proto** 将对象连接起来组成了`原型链`。

```jsx
const a={b:1}

a.__proto__===Object.prototype
```

### 事件循环机制 （Event Loop）

众所周知 JS 是门`非阻塞单线程语言`，因为在最初 JS 就是为了和浏览器交互而诞生的。

如果 JS 是门多线程的语言话，我们在多个线程中处理 DOM 就可能会发生问题（一个线程中新加节点，另一个线程中删除节点），当然可以引入读写锁解决这个问题。

如果遇到异步的代码，会被挂起并加入到 `Task`（有多种 task） 队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为。

> event loop 事件循环 + 同步事件先执行 + 异步事件放置 callback queue + 一旦执行栈为空,调用Task队列异步任务
> 

异步任务划分: 不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 微任务（`microtask`） 和 宏任务（`macrotask`）。

在 ES6 规范中，microtask 称为 `jobs`，macrotask 称为 `task`。

- 微任务包括:
    - `process.nextTick`，`promise`，`Object.observe` ，`MutationObserver`
- 宏任务包括:
    - `script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`

很多人有个误区，认为`微任务`快于`宏任务`，其实是错误的。因为宏任务中包括了 `script`，

浏览器会`先执行`一个宏任务，接下来有`异步代码`的话就先`执行`微任务

**所以正确的一次 Event loop 顺序是这样的:**

- 执行同步代码，这属于宏任务`<script>`
- 执行栈为空，查询是否有微任务需要执行
- 执行所有微任务
- 必要的话渲染 DOM UI
- 然后开始下一轮 Event loop，执行宏任务中的异步代码

通过上述的 Event loop 顺序可知，如果宏任务中的异步代码有大量的计算并且需要操作 DOM 的话，为了更快的 界面响应，我们可以把`操作 DOM`放入`微任务中`

### 箭头函数和普通函数的区别

箭头函数无 `this`，无 `prototype`,无`arguments`,无`yield` 

**this默认指向父级 + 箭头函数没有自己的this对象**

- `不可以`当作`构造`函数，也就是说，不可以对箭头函数`使用new命令`，否则会抛出一个错误。
- `不可以`使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
- `不可以`使用`yield`命令，因此箭头函数不能用作 Generator 函数

### 你知道ES6新增了哪些特性

- let、const、block作用域
- 箭头函数
- Spread / Rest 操作符指的是运算符`...`
- 对象和数组的解构
    
    ```jsx
    let obj = { a: 1, b: 2, c: 3 }
    let { a: a1, b: b1, c: c1 } = objlet 
    arr = [1, 2, 3]
    let [d, e, f] = arr
    console.log(d, e, f)
    ```
    
- 模板语法和分隔符
    
    ```jsx
    let user = 'Barret';  
    作为分隔符，${ ... }用来渲染一个变量  
    
    console.log(`Hi ${user}!`); // Hi Barret!
    ```
    
- for…of VS for…in
    - for…of 用于遍历一个迭代器，如数组Array,也可用于异步调用
    - for…in 用来遍历对象中的属性（只能访问可枚举的）：
- Map VS WeakMap
    - Map 事实上每个对象都可以看作是一个 Map。
    一个对象由多个 `[key-val]` 对构成，在 Map 中，任何类型都可以作为对象的 key
        - Map 是有序结构
    
    ```jsx
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
    
    - **WeakMap**
        - 没有**`forEach`**和`size`
        - 因为是弱引用,里面没有`index`这一属性,引入内部add的数据可能随时被销毁
    
    WeakMap 就是一个 Map，只不过它的所有 key 都是`弱引用`，意思就是 WeakMap 中的东西`不影响垃圾回收`,使用它`不用担心`内存泄漏问题。
    
    另一个需要注意的点是，WeakMap 的所有 `key` 必须是`对象Object`。
    
    - 只有四个方法
    
    `delete(key)`,`has(key)`,`get(key)` ,`set(key, val)` ,`无序的`,`没有size`,`没有forEach`
    
    ```jsx
    let w = new WeakMap();
      w.set('a', 'b'); 
      // Uncaught TypeError: Invalid value used as weak map key
    
      var o1 = {},
      o2 = function(){},
      o3 = window;
    
      w.set(o1, 37);
      w.set(o2, "azerty");
      w.set(o3, undefined);
    
      w.get(o3); // undefined, because that is the set value
    
      w.has(o1); // true
      w.delete(o1);
      w.has(o1); // false
    ```
    
- **Set** VS **WeakSet**
    - Set 对象是一组`不重复`的值，重复的值将被忽略，`值类型`可以是`原始类型`和`引用类型`
    
    ```jsx
    let mySet = new Set([1, 1, 2, 2, 3, 3]);
      mySet.size; // 3
      mySet.has(1); // true
      mySet.add('strings');
      mySet.add({ a: 1, b:2 });
    ```
    
    基于Set对象的值不重复，即有一种非常方便的数组去重方法：
    
    ```jsx
    let mySet = new Set([1, 1, 2, 2, 3, 3]);
      // mySet => Set(3) {1, 2, 3}
      // Object.prototype.toString.call(mySet) // [object Set]
    
      let toArray = Array.from(mySet) // [1, 2, 3]
      Object.prototype.toString.call(toArray) // [object Array]
    ```
    
    - `WeakSet` 类似于 WeakMap，`WeakSet` 对象可以让你在一个集合中保存对象的弱引用，在 WeakSet 中的对象只允许出现一次
        - 只能用`object`做`value`
- Class 类 ES6 中有 class 语法
    
    值得注意是，这里的 class 不是新的对象继承模型，它只是`原型链`的`语法糖`表现形式
    
    ```jsx
    class Car {
          constructor() {
            console.log("Creating a new car");
          }
          call(val) {
            console.log('parent --->', val)
          }
        }
    
          class Porsche extends Car {
            constructor() {
              super();
              console.log("Creating Porsche");
              super.call('inner')
            }
            call2(val) {
              super.call(val)
            }
          }
    
          let c = new Porsche();
          c.call2('outer')
    
          // Creating a new car
          // Creating Porsche
          // parent ---> inner
          // parent ---> outer
    ```
    
    `extends` 允许一个子类继承父类，需要注意的是，`子类的constructor` 函数中需要执行 `super()` 函数。
    
    当然，你也可以在子类方法中调用父类的方法，如`super.parentMethodName()`。
    
    有几点值得注意的是：
    
    类的`声明不会提升`（hoisting)，如果你要使用某个 Class，那你必须在**使用之前定义它**，否则会抛出一个 ReferenceError 的错误 在类中定义函数`不需要`使用 `function` 关键词
    
- Symbol 
Symbol 是一种新的数据类型，它的值是唯一的，不可变的。
ES6 中提出 symbol 的目的是为了生成一个唯一的标识符，不过你访问不到这个标识符
- 迭代器（`Iterators`） 
迭代器允许`每次`访问数据集合的`一个元素`，当指针指向数据集合最后一个元素是，迭代器便会退出。
它提供了 `next()` 函数来遍历一个序列，这个方法返回一个包含 `done` 和 `value` 属性的对象。
    
    ES6 中可以通过 `Symbol.iterator` 给对象设置默认的遍历器，无论什么时候对象需要被遍历，执行它的 @@iterator 方法便可以返回一个用于获取值的迭代器。
    
    Array 数组默认就是一个迭代器：
    
    ```jsx
    var arr = [11,12,13];
    var itr = arr[Symbol.iterator]();
      
    itr.next(); // { value: 11, done: false }
    itr.next(); // { value: 12, done: false }
    itr.next(); // { value: 13, done: false }
    
    itr.next(); // { value: undefined, done: true }
    ```
    
- Generators
    
    `Generator` 函数是 ES6 的新特性，它允许一个函数返回的**可遍历对象生成多个值**（返回的值为一个迭代器对象）。
    
    在使用中你会看到 `*` 语法和一个新的关键词:
    
    ```jsx
    function *infiniteNumbers() {
      var n = 1;
      while (true){
        yield n++;
      }
      }
    
      var numbers = infiniteNumbers(); // returns an iterable object
    
      numbers.next(); // { value: 1, done: false }
      numbers.next(); // { value: 2, done: false }
      numbers.next(); // { value: 3, done: false }
    ```
    
    每次执行 `yield` 时，返回的值变为迭代器的下一个值
    
- Promise
pending :在过程中
resolved : 解决了
rejected : 失败了

1.pending状态：不会触发then或catch
2.resolved状态：会触发后续的then回调函数
3.rejected状态：会触发后续的catch回调函数

`resolved`状态会继续触发后面的`then`函数（如果紧跟其后的是`catch`函数则`跳过`该`catch`函数，继续向后寻找then函数），`rejected`状态会继续触发紧跟其后的`catch`函数（如果紧跟其后的是then函数则跳过该then函数，继续向后寻找catch函数），由此形成链式调用。

**then和catch只要正常返回，都会返回resolved状态；**
- Proxy 与 Reflect
    
    `Proxy` 可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。它不直接操作对象，而是像代理模式，通过对象的代理对象进行操作，在进行这些操作时，可以添加一些需要的额外操作。
    
    `Reflect` 可以用于获取目标对象的行为，它与`Object 类似`，但是更易读，为操作对象提供了一种更优雅的方式。
    
    它的方法与 Proxy 是对应的。未来object的方法转移到Reflect上
    
- 字符串 ES6 
对字符串操作方法的扩展。
    - includes()：返回布尔值，判断是否找到参数字符串。
    - startsWith()：返回布尔值，判断参数字符串是否在原字符串的头部。
    - endsWith()：返回布尔值，判断参数字符串是否在原字符串的尾部。
    - repeat()：返回新的字符串，表示将字符串重复指定次数返回。
    - padStart：返回新的字符串，表示用参数字符串从头部（左侧）补全原字符串。
    - padEnd：返回新的字符串，表示用参数字符串从尾部（右侧）补全原字符串。
- async / await
    - async 是 `ES7` 才有的与异步操作有关的关键字，和 Promise ， Generator 有很大关联的。
    - async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。
    - async 函数中可能会有 await 表达式，async 函数执行时，如果遇到 await 就会先暂停执行 ，等到触发的异步操作完成后，恢复 async 函数的执行并返回解析值。
    
    await 关键字只在 async 函数内有效，否则会报错。
    
    await 返回 Promise 对象的处理结果，如果等待的不是 Promise 对象，则返回该值本身。
    
    如果一个 `Promise` 被传递给一个 `await` 操作符，await 将等待 `Promise` 正常处理(`resolve`)完成并返回其处理结果。
    
    - await针对所跟不同表达式的处理方式：
        
        `Promise` 对象：`await` 会`暂停`执行，`等待` Promise 对象 `resolve`，然后恢复 `async` 函数的`执行`并返回解析值。 
        
        非 `Promise` 对象：`直接返回`对应的值。
        

### let 和 const 区别

- let是变量,可修改
- const 是常量,不可修改
- 都是块级作用域,var没有
- var有变量提升

### 继承的几种方式 & 实现思路，要求会写

ES5 实现继承总的来说就两种办法: 

### 组合继承

```jsx
function Parent(value) {
	this.val = value
}
Parent.prototype.getValue = function() {
	console.log(this.val)
}
function Child(value) {
	Parent.call(this, value)
}
Child.prototype = new Parent()

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // true
```

以上继承的方式核心是在`子类`的构造函数中通过 `Parent.call(this)` 继承父类的属性，然后改变子类的原型为 `new Parent()` 来`继承父类`的函数。

这种继承方式优点在于`构造函数可以传参`，不会与父类`引用属性共享`，可以`复用`父类的函数，但是也存在一个缺点就是在`继承父类函数`的时候`调用`了父类`构造函数`，导致`子类的原型上多了不需要的父类属性`，存在`内存`上的`浪费`。

### 寄生组合继承

这种继承方式对组合继承进行了优化，`组合继承缺点`在于`继承父类函数时调用了构造函数`，我们只需要优化掉这点就行了

```jsx
function Parent(value) {
	this.val = value
}
Parent.prototype.getValue = function() {
	console.log(this.val)
}

function Child(value) {
	Parent.call(this, value)
}
Child.prototype = Object.create(Parent.prototype, {
	constructor: {
		value: Child,
		enumerable: false,
		writable: true,
		configurable: true
	}
})

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // true
```

以上继承实现的核心就是将`父类`的`原型赋值`给`子类`，并且将`构造函数`设置为子类，这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数

继承还存在强耦合的情况，不管怎么样子类都会和它的父类耦合在一起。

### 什么是Promise，要求会写

promise的内容分为`构造`函数、`实例`方法和`静态`方法

- 1个构造函数： new Promise
- 2个实例方法：.then 和 .catch
- 4个静态方法：Promise.all、Promise.race、Promise.resolve和Promise.reject

Promise必然处在三种状态:

- 待定（`pending`）: 初始状态，既没有被兑现，也没有被拒绝。
- 已兑现（`fulfilled`/resolve）: 意味着操作成功完成。
- 已拒绝（`rejected`）: 意味着操作失败

- catch之后还可以继续链式调用吗，为什么
`resolved`状态会继续触发后面的`then`函数（如果紧跟其后的是`catch`函数则`跳过`该`catch`函数，继续向后寻找then函数），`rejected`状态会继续触发紧跟其后的`catch`函数（如果紧跟其后的是then函数则跳过该then函数，继续向后寻找catch函数），由此形成链式调用。
**then和catch只要正常返回，都会返回resolved状态；**
- finally之后还可以继续链式调用吗，为什么

**什么是 promise.all**

这个方法返回一个新的promise对象，该promise对象在iterable参数对象里`所有的promise对象`都`resolve`成功的时候才会触发成功，一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败

**Promise.all可以将`多个Promise实例`包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，`成功`的时候返回的是一个`结果数组`，而`失败`的时候则返回`最先被reject`失败状态的值。**

- 有失败就等待所有运行结束抛错

```jsx
let wake = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time / 1000}秒后醒来`)
    }, time)
  })
}
let wakeFail = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(`${time / 1000}秒后失败醒来`)
    }, time)
  })
}

let p1 = wake(3000)
let p2 = wakeFail(5000)

Promise.all([p1, p2]).then((result) => {
  console.log(result)       // 5秒后失败醒来
}).catch((error) => {
  console.log(error)
})
Promise {<pending>}
最终结果:--> 5秒后失败醒来

```

```jsx
let wake = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time / 1000}秒后醒来`)
    }, time)
  })
}

let p1 = wake(3000)
let p2 = wake(2000)

Promise.all([p1, p2]).then((result) => {
  console.log(result)       // [ '3秒后醒来', '2秒后醒来' ]
}).catch((error) => {
  console.log(error)
})
```

Promise.all获得的`成功结果`的数组里面的`数据顺序`和Promise.all`接收`到的`数组顺序`是`一致的`，即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。

**什么是 promise.race**

- Promise.race()静态方法返回一个包装期约，是一组集合中最先解决或拒绝的期约的镜像
- Promise.race()不会对解决或拒绝的期约区别对待。无论是解决还是拒绝，只要是`第一个落定`的
期约，Promise.race()就会包装其`解决值`或`拒绝理由`并`返回`新期约

顾名思义，Promse.`race`就是`赛跑`的意思，意思就是说，Promise.race([p1, p2, p3])里面**哪个结果获得的快，就返回那个结果**，不管结果本身是成功状态还是失败状态。

```jsx
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  },1000)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failed')
  }, 500)
})

Promise.race([p1, p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)  // 打开的是 'failed'
})
```

### 深浅拷贝 要会写

- 深浅拷贝区别

浅拷贝:内存地址的引用;`Object.assign`

深拷贝:值得完全赋值,开辟新的内存空间

- 实现深拷贝有几种方法

```jsx
  function deepClone(obj={}){    

if(typeof obj!=='object' || obj==null){      
// obj是null，或者不是对象和数组，直接返回       
 return obj     
 }      
// 初始化返回结果    
let result      
if(obj instanceof Array){          
 result =[]      
}else {           
 result={}     
 }      
for(let key in obj){  
    // 保证key不是原型的属性     
 if(obj,hasOwnProperty(key)){  
        result[key]=deepClone(obj[key]) 
     }   
   }        
  return result  
    }
```

- 利用JSON.parse 和 JSON.stringify 实现的深拷贝有什么弊端，为什么

你会发现在上述情况中，该方法会忽略掉函数和 undefined 。
    - 会忽略 `undefined`
    - 会忽略 `symbol`
    - 不能`序列化`函数
    - 不能`解决循环引用`的对象
    
    ```jsx
    let a = {    
    	age: undefined,    
    	sex: Symbol('male'),    
    	jobs: function() {},    
    	name: 'yck'
    }  
    
    let b = JSON.parse(JSON.stringify(a))  
    
    console.log(b) // {name: "yck"}
    ```
    

### 什么是防抖&节流，它们的区别是什么，要求会写

防抖和节流的作用都是防止函数多次调用。 区别在于，假设一个用户一直触发这个函数，且每次触发函数的间隔小于wait， `防抖`情况下只会`调用一次`，而节流的 情况会`每隔一定时间`（参数wait）调用函数。 

防抖: 类似公交车–>固定时间发车–>有人上–>时间重读–>没人上–>时间到了发动 

一般的防抖会有`immediate`选项，表示是否立即调用

节流:fun固定频率执行,固定时间内只能执行一次

防抖动是将多次执行变为最后一次执行，**节流是将多次执行变成每隔一段时间执行。**

```jsx
  function throttle(fn, timer = 1000) {       
			let prevTime = new Date()      
			return function (...args) {        
			let nowTime = new Date()        
			if (nowTime - prevTime > timer) {          
			fn.apply(this, args)          
			prevTime = nowTime        
			}      
}    
}    

function debounce(fn, times = 1000) {      
		let timerOut;      
		return function (...args) {        
		if (timerOut) clearTimeout(timerOut)        
		timerOut = setTimeout(() => {          
		fn.apply(this, args)       
		 }, times)      
}    
}
```

### 事件触发机制&注册事件

通常我们使用 `addEventListener` 注册事件，该函数的第三个参数可以是布尔值，也可以是对象。

对于布尔值 useCapture 参数来说，该参数默认值为 `false` (冒泡)。

useCapture 决定了注册的事件是捕获事件还是冒泡事件。对于对象参数来说，可以使用以下几个属性

- capture，布尔值，和 useCapture 作用一样
- once，布尔值，值为 true 表示该回调只会调用一次，调用后会移除监听
- passive，布尔值，表示永远不会调用 preventDefault

一般来说，我们只希望事件只触发在目标上，这时候可以使用 stopPropagation 来阻止事件的进一步传播。通常我们认为 stopPropagation 是用来阻止事件冒泡的，其实该函数也可以阻止捕获事件。stopImmediatePropagation 同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。

```jsx
// 以下会先打印冒泡然后是捕获
node.addEventListener(  'click',  event => {    
console.log('冒泡')  },  false)

node.addEventListener(  'click',  event => {    
console.log('捕获 ')  },  true)
```

### Map /filter / reduce 手写

[https://juejin.cn/post/6946022649768181774](https://juejin.cn/post/6946022649768181774)

`Map` 作用是生成一个新数组，遍历原数组，将每个元素拿出来做一些变换然后 `append` 到新的数组中

```jsx
Array.prototype.map2 = function(callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    const O = Object(this)
    const len = O.length >>> 0

  let k = 0, res = []
    while (k < len) {
        if (k in O) {

         res[k] = callback.call(thisArg, O[k], k, O);
        }
        k++;
    }
  return res
}
```

`Reduce` 作用是数组中的值组合起来，最终得到一个值

### 数组扁平化 手写

**数组扁平化方法 `Array.prototype.flat()` 也叫数组拍平、数组拉平、数组降维**

Array.prototype.flat() 用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
不传参数时，默认“拉平”一层，可以传入一个整数，表示想要“拉平”的层数。
传入 <=0 的整数将返回原数组，不“拉平”。
Infinity 关键字作为参数时，无论多少层嵌套，都会转为一维数组。
如果原数组有空位，Array.prototype.flat() 会跳过空位。
思路:

实现一个有数组扁平化功能的 `flat` 函数，**我们要做的就是在数组中找到是数组类型的元素，然后将他们展开**。这就是实现数组拍平 `flat` 方法的关键思路。

- 第一要遍历数组的每一个元素；
    - `for 循环`
    - `for...of`
    - `for...in`
    - `forEach()`
    - `entries()`
    - `keys()`
    - `values()`
    - `reduce()`
    - `map()`
- 第二判断元素是否是数组；
    - `instanceof`
    - `constructor`
    - `Object.prototype.toString`
    - `isArray`
- 第三将数组的元素展开一层
    - 扩展运算符(…) + `concat`
    - `concat` +`apply`

```jsx
const arr2 = [0, 1, 2, [[[3, 4]]]];

//写法一
function flatDeep(arr, d = 1) {
	return d > 0
		? arr.reduce((acc, val) => {
				if (Array.isArray(val)) {
					return acc.concat(flatDeep(val,d - 1));
				} else {
					return acc.concat(val);
				}
		  }, [])
		: arr.slice();
}

//forEach+push+递归
function flatDeep2(arr = [], d = 1) {
	let result = [];
	(function flat(arr, d) {
		arr.forEach((item) => {
			if (Array.isArray(item) && d > 0) {
				flat(item, d - 1);
			} else {
				result.push(item);
			}
		});
	})(arr, d);
	return result;
}

console.log(flatDeep2(arr2, Infinity));//[ 0, 1, 2, 3, 4 ]
```

### 实现一个数组乱序

- Fisher–Yates shuffle
- sort—>排序顺序可以是按字母或数字，也可以是升序（向上）或降序（向下)
sort() 方法比较两个值时，将值发送给比较函数，根据返回的`（负、零、正）`值对值进行排序。

```jsx
var points = [40, 100, 1, 5, 25, 10];
// 按降序对数组中的数字进行排序
points.sort(function(a, b){return b-a});    
// 数组中的第一项 (points[0]) 现在是最高值
```

```jsx
function shuffle(arr) {

    arr.sort(function () {

        return Math.random() - 0.5;

    });

}
它并不能真正地随机打乱数组。
看了一下ECMAScript中关于Array.prototype.sort(comparefn)的标准，其中并没有规定具体的实现算法，但是提到一点：

Calling comparefn(a,b) always returns the same value v when given a specific pair of values a and b as its two arguments.

也就是说，对同一组a、b的值，comparefn(a, b)
需要总是返回相同的值。
而上面的() => Math.random() - 0.5（即(a, b) => Math.random() - 0.5）
显然不满足这个条件。

```

既然(a, b) => Math.random() - 0.5的问题是不能保证针对同一组a、b每次返回的值相同，那么我们不妨将数组元素改造一下，比如将每个元素i改造为：

```jsx
let new_i = {

    v: i,

    r: Math.random()

};
//原来的值存储在键v中，同时给它增加一个键r，值为一个随机数，然后排序时比较这个随机数：
```

```jsx
arr.sort((a, b) => a.r - b.r);
//完整代码

function shuffle(arr) {

    let new_arr = arr.map(i => ({v: i, r: Math.random()}));

    new_arr.sort((a, b) => a.r - b.r);

    arr.splice(0, arr.length, ...new_arr.map(i => i.v));

}

let a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

let n = 10000;

let count = (new Array(a.length)).fill(0);

for (let i = 0; i < n; i ++) {

    shuffle(a);

    count[a.indexOf('a')]++;

}

console.log(count);
```

### 给你一个字符串, 得到其中最长连续字符的长度 （ aaabbcd 得到3 aabbbbaaaccdd 得到4）