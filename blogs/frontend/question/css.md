---
title: CSS
date: 2021-08-22
sidebar: auto
tags:
    - css
categories:
    - frontend
---


## CSS

### 盒模型

每个盒子由四个区域组成：

**内容区域 `content` 内边距区域 `padding` 边框区域 `border` 外边距区域 `margin`** 

### 外边距重叠

块的上外边距(`margin`-`top`)和下外边距(`margin`-`bottom`)有时合并(折叠)为单个边距，其大小为单个边距的`最大值`(或如果它们相等，则仅为其中一个)，这种行为称为`边距重叠`。

注意有设定float和position=absolute的元素不会产生外边距重叠行为。形成BFC

盒模型分为两类: IE盒模型和标准盒模型。 两者的区别在于

- IE(`怪异`)盒模型的width/height = `content` + `border` + `padding`
- `标准`盒模型的width/height = `content`

CSS3支持改变盒子模型。

**box-sizing:**

box-sizing用来改变计算盒子高度/宽度的默认盒子模型。可以使用此属性来模拟不正确支持CSS盒子模型规范的浏览器的行为。

`content-box`(**默认值**): 标准盒模型

`border-box`告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，**不包含margin**，内容区的实际宽度是width减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。

### 居中布局

### 水平垂直局中

https://zhuanlan.zhihu.com/p/97269238

[https://blog.csdn.net/weixin_37580235/article/details/82317240](https://blog.csdn.net/weixin_37580235/article/details/82317240)

- flex布局

在需要垂直居中的父元素上，设置`display：flex`和`align-items：center` 

- 注意：父元素必须要设置height值

```html
<!-- html部分 -->   
 <div class="center">     
   <div>垂直居中</div>   
 </div> 
/* css部分 */ 
      
.center{           
	width: 300px;           
	height: 200px;           
	display: flex;           
	align-items: center;           
	border: 2px solid blue;        
}
```

`absolute` 此时的子元素为绝对定位,父元素为相对定位(`子绝父相`)

```css
.parent {  
width: 200px;  
height: 100px;  
background-color: 
#374858;
}
.parent .child {  
width: 100px;  
height: 50px;  
background-color: #9dc3e6;
}

.parent {    
		position: relative;
}
.parent .child {    
		position: absolute;    
		left: 50%;    
		top: 50%;    
		transform: translate(-50%, -50%);

}
```

### rem em px 区别

- px是固定的像素，一旦设置了就无法因为适应页面大小而改变。
- em和rem相对于px更具有灵活性，他们是相对长度单位，意思是长度不是定死了的，更适用于响应式布局。
- em是相对于其父元素来设置字体大小的，一般都是以<`body`>的“[font-size](https://www.baidu.com/s?wd=font-size&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)”为基准。这样就会存在一个问题，进行任何元素设置，都有可能需要知道他父元素的大小。
- 而rem是相对于根元素<`html`>，这样就意味着，我们只需要在根元素确定一个参考值。

对于em和rem的区别一句话概括：

**em相对于父元素，rem相对于根元素。**

### 实现一个三角形

```jsx
.div{
    width: 0px;
    height: 0px;
    border-bottom: 50px solid  #66FFCC;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
 }

```

### 什么是BFC，如何触发

块格式化上下文（`Block Formatting Context`，BFC）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

- BFC 是一个独立的布局环境,可以理解为一个容器,在这个容器中按照一定规则进行物品摆放,并且**不会影响其它环境中的物品**。
- **如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响。**
- 浮动元素`float`会创建 `BFC`，则浮动元素内部子元素主要受该浮动元素影响，所以**两个浮动元素之间是互不影响的**。

**创建BFC**

1. 根元素或包含根元素的元素
2. 浮动元素 float ＝ left | right 或 inherit**（≠ none）**
3. 绝对定位元素 position ＝ `absolute` 或 `fixed`
4. display ＝ inline-block | flex | inline-flex | table-cell 或 table-caption
5. overflow ＝ hidden | auto 或 scroll **(≠ visible)**

**BFC特性**

1. BFC 是一个独立的容器，容器内子元素不会影响容器外的元素。反之亦如此。
2. 盒子从顶端开始垂直`↧`地一个接一个地排列，盒子之间垂直的间距是由 `margin` 决定的。
3. 在同一个 BFC 中，两个相邻的块级盒子的**垂直外边距**会发生`重叠`。
4. **BFC 区域不会和 float box 发生重叠。**
5. **BFC 能够识别并包含浮动元素，当计算其区域的高度时，浮动元素也可以参与计算了**

关键使用:`避免外边距重叠`

BFC 导致外边距折叠的问题。但我们必须记住的是**外边距折叠（Margin collapsing）只会发生在属于同一BFC的块级元素之间**。如果它们**属于不同的 BFC**，它们之间的外边距则不会折叠。所以通过**创建不同的 BFC** ，就可以避免外边距折叠

### 实现 骰子的 第五个面，要起使用flex布局

### display各个属性

容器的几个属性 以下这几个属性都是用在容器上面

`flex-direction` `flex-wrap` `flex-flow` `justify-content` `align-items` `align-content`

项目的属性 

- order 定义项目的排列顺序。数值越小，排列越靠前，默认为0
- flex-grow 定义项目的`放大`比例，默认为0，即如果存在剩余空间，也不放大
    
    如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
    
- flex-shrink 定义项目的缩小比例，默认为1，即如果空间不足，该项目将缩小 如果所有项目的flex-shrink属性都为1，**当空间不足时，都将等比例缩小**。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。 负值对该属性无效。

- flex-basis 定义了在分配多余空间之前，项目占据的主轴空间（main size） 浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。 它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
- flex 是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`后两个属性可选 该属性有两个快捷值：`auto (1 1 auto)` 和 `none (0 0 auto)`。
    
    建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值 + align-self 允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为auto，表示继承父元素的`align-items`属性，如果没有父元素，则等同于stretch
    

### display 的block,inline,inline-block的区别

- 块级元素

会占领页面的一行，其后多个block元素自动换行、 可以设置width，height，设置了width后同样也占领一行、同样也可以设置 margin与padding属性。

1. 每个块级元素都是独自占一行，其后的元素也只能另起一行，并不能两个元素共用一行。
2. 元素的height高度、width宽度、行高padding和margin顶底边距都是可以设置的。
3. 元素的宽度如果不设置的话，默认为父元素的宽度。

常见的块级元素:`div,img,ul,form,p`等

- 行级元素—>对宽高属性值不生效，完全靠内容撑开宽高
1. 可以和其他元素处于一行，不用必须另起一行。
2. 元素的高度、宽度及顶部和底部边距**不可**设置。
3. 元素的宽度就是它包含的文字、图片的宽度，不可改变。

ps：`em，strong，br,input,span`等

**行级元素与块级元素的转换**

可以在css样式中用**`display:inline`**将块级元素设为行级元素

同样，也可以用**`display:block`**将行级元素设为块级元素

f**loat:** 当把行内元素设置完float:left/right后，该行内元素的display属性会被赋予block值，且拥有浮动特性。行内元素去除了之间的莫名空白

**position:** 当为行内元素进行定位时，position:absolute与position:fixed.都会使得原先的行内元素变为块级元素。

**行级-块级元素 display:inline-block**

如果又想设`置高度、宽度、行高以及顶和底边距`，`又想元素处于一行`，该怎么办呢？

此时就可以用`display:inline-block`将元素设置为行级-块级元素。

### **1.text-align属性对块级元素起作用，对行内元素不起作用：**

原因是块级标签如果不给宽度，块级元素就默认为浏览器的宽度，即就是100%宽，那么在100%的宽度中居中生效；但是行内元素的宽完全是靠内容撑开，所以宽度就是内容撑开的宽：

块级元素可以设置weith和height，行内元素设置width和height无效，而且**块级元素即使设置宽度也还是独占一行**。

注意但`块级元素`当没有明确指定 width 和 height 值时，块级元素尺寸由`内容确定`，当指定了 width 和 height 的值时，内容超出块级元素的尺寸就会溢出，这时块级元素要呈现什么行为要看其 `overflow` 的值（visible,hidden,overflow,scroll)

块级元素可以设置margin和padding属性，行内元素水平方向的margin和padding如margin-left、padding-right可以产生边距效果，但是竖直方向的margin-top、margin-bottom不起作用。

**行内元素的padding-top和padding-bottom会起作用，不过就像脱离了标准流一样（即padding-left和padding-right的层级比其他元素高），并不会占据位置，并且还把其他元素给盖住了。但是，假如inline的元素没有内容，“padding-top、padding-bottom"将不起作用。如果想要起作用，只需要给padding-left或者padding-right设置一个值，或者当inline的元素有内容时就会起作用。**

**当inline-block碰到同类（inline，inline-block)时，谁的上下margin、paddin或line-height大，就听谁的。除非它是inline，因为inline的margin是不起作用的。且inline的padding是不占空间的。**

**inline和inline-block会引起间距的空格**

**给父元素加letter-spacing负值，然后通过子元素清除letter-spacing值**

### CSS有几种选择器

- 通配符选择器

```jsx
*{
    margin:0;
    padding:0;
}
```

- 元素(标签)选择器

```jsx
p{
    color:red;
}
```

- 类class选择器

```jsx
.warning{
    color:red;
}
```

- ID选择器

```jsx
#warning{
    color:red;
}
```

优先级:

!important>行内样式style>ID选择器>类class、伪类、属性>元素、伪元素>继承>通配符

### link 和@import的区别

1. link是`XHTML`标签，除了加载CSS外，还可以定义`RSS`等其他事务；`@import`属于`CSS`范畴，只能加载CSS。
2. link引用CSS时，在页面载入时同时加载；
    1. @import需要页面网页完全载入以后加载。所以会出现一开始没有[css](http://www.javanx.cn/tag/css/)样式，闪烁一下出现样式后的页面(网速慢的情况下)
3. link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
4. link支持使用Javascript控制DOM去改变样式；而@import不支持。在html设计制作中，css有四种引入方式

链接方式（下面用 `link` 代替）和导入方式（下面用 `@import` 代替）都是引入外部的 `CSS` 文件的方式，下面我们来比较这两种方式，并且说明为什么不推荐使用 `@import`。

1、`link` 属于 `HTML`，通过 `<link>` 标签中的 `href` 属性来引入外部文件，而 `@import` 属于 CSS，所以导入语句应写在 CSS 中，要注意的是导入语句应写在样式表的开头，否则无法正确导入外部文件；

2、`@import` 是 `CSS2.1` 才出现的概念，所以如果浏览器版本较低，无法正确导入外部样式文件；

3、当 HTML 文件被加载时，`link` 引用的文件会同时被加载，而 `@import` 引用的文件则会等页面全部下载loadover完毕再被加载；

### 常用的meta标签有哪些

Meta标签有两个标签

```

1. <meta name=”`description`” content=””>
2. <meta name=”`keywords`” content=””>）
```

`<meta>` 标签永远位于 head 元素内部；`<meta>`标签有两个属性name和http-equiv

name=”description”

说明：这里是网页的描述，是给搜索引擎看的，搜索引擎根据这个描述进行收录排名，一般是网页内的关键字

name=”keywords”
说明：keywords用来告诉搜索引擎你网页的关键字是什么，换句话说就是你的网站主题，从一定意义上来说keywords与description其实它们的作用是一样的（突出网站主题），但他们又有所不同（在搜索结果页的展示）。

name=”author”

说明：标注网站作者是谁

## 浏览器

### DOM 和BOM的区别

[https://zhuanlan.zhihu.com/p/372357616](https://zhuanlan.zhihu.com/p/372357616)

DOM(`Document Object Model`) 文档对象模型→是为了操作文档出现的 API，document 是其的一个对象；

BOM(`Browser Object Model`)浏览器对象模型→是为了操作浏览器出现的 API，window 是其的一个对象。

- DOM 是为了操作文档出现的接口
- BOM 顾名思义其实就是为了控制浏览器的行为而出现的接口。

浏览器可以做什么呢？比如跳转到另一个页面、前进、后退等等，程序还可能需要获取屏幕的大小之类的参数。**所以 BOM 就是为了解决这些事情出现的接口**。比如我们要让浏览器跳转到另一个页面，只需要

```jsx
location.href = "http://www.xxxx.com";
```

这个 `location` 就是 `BOM` 里的一个对象。

由于BOM的window包含了document，因此可以直接使用window对象的document属性，通过document属性就可以访问、检索、修改XHTML文档内容与结构。因为document对象又是DOM（Document Object Model）模型的根节点。

```jsx
console.log(window.document === document); //true

console.log(window.location === location); //true

console.log(window.navigator === navigator); //true

console.log(window.screen === screen); //true

console.log(window.history === history); //true

console.log(window.window === window); //true

location navigator screen history和window一样，
都是BOM提供的对象，只不过它们和document对象一样，都同时以属性的形式存在于window中。
```

可以说，BOM包含了DOM(对象)，浏览器提供出来给予访问的是BOM对象，从BOM对象再访问到DOM对象，从而js可以操作浏览器以及浏览器读取到的文档。

### CSS**加载会阻塞DOM树的解析和渲染吗**

1. css加载`不会`阻塞DOM树的`解析`
2. css加载`会阻塞`DOM树的`渲染`
3. css加载`会`阻塞后面`js`语句的`执行`

**优化:**

- 使用CDN(因为CDN会根据你的网络状况，替你挑选最近的一个具有缓存内容的节点为你提供资源，因此可以减少加载时间)
- 对css进行`压缩`(可以用很多打包工具，比如webpack,gulp等，也可以通过开启gzip压缩)
- 合理的使用`缓存`(设置cache-control,expires,以及E-tag都是不错的，不过要注意一个问题，就是文件更新后，你要避免缓存而带来的影响。其中一个`解决防范`是在文件名字后面`加一个版本号`)
- 减少http请求数，将多个css文件`合并`，或者是干脆直接写成内联样式(内联样式的一个缺点就是不能缓存)

### CSS放在底部加载

- 放在body底部
    - 在DOM Tree构建完成之后开始构建render Tree，计算布局然后绘制网页，
        - 等css文件加载后，开始构建CSSOM Tree，
            - 并和DOM Tree一起构建render Tree，
                - 再次计算布局重新绘制；
- 放在head中，
    - 先加载css，构建CSSOM，同时构建DOM Tree，
        - CSSOM和DOM Tree构建完成后，构建render Tree，
            - 进行计算布局绘制网页。
- 总体来看，**放在body底部要比放在head中多一次构建render Tree**，`多一次`计算布局，多一次绘制，从性能方面来看，不如放在head中。
- 再次，放在**body底部网页会闪现默认样式的DOM结构**，用户体验不好。

### 浏览器渲染机制

浏览器的渲染机制一般分为以下几个步骤

1. 处理 HTML 并构建 `DOM 树`。
2. 处理 CSS 构建 `CSSOM 树`。
3. 将 DOM 与 CSSOM `合并`成一个`渲染树`。
4. 根据渲染树来`布局`，计算`每个节点`的位置。
5. 调用 `GPU` 绘制，合成图层，`显示`在屏幕上。

![https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-043710.png](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-043710.png)

在构建 CSSOM 树时，会**阻塞渲染**，直至 CSSOM 树构建完成。并且构建 CSSOM 树是一个十分消耗性能的过程，所以应该尽量保证层级扁平，减少过度层叠，**越是具体的 CSS 选择器，执行速度越慢**。

当 HTML 解析到 script 标签时，会暂停构建 DOM，完成后才会从暂停的地方重新开始。也就是说，`如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件`。并且 `CSS 也会影响 JS 的执行`，只有当解析完样式表才会执行 JS，所以也可以认为这种情况下，**CSS 也会暂停构建 DOM**。

### **Load 和 DOMContentLoaded 区别**

Load 事件触发代表页面中的 DOM，CSS，JS，图片已经全部加载完毕。

`DOMContentLoaded` 事件触发代表初始的 `HTML 被完全加载和解析` (DOM已经渲染结束)，不需要等待 CSS，JS，图片加载

### 重绘(Repaint)和回流(Reflow)

重绘和回流是渲染步骤中的一小节，但是这两个步骤对于性能影响很大。

- 重绘`Repaint`是当节点需要**更改外观**而**不会影响布局**的，比如改变 `color` 就叫称为重绘
    - 重绘只是`样式`的变化，结构不会变化
- 回流`Reflow`是**布局**或者**几何属性**需要改变就称为回流。

**回流必定会发生重绘**，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变深层次的节点很可能导致父节点的一系列**回流问题:**

**1.DOM的增删行为**

比如你要删除某个节点，给某个父元素增加子元素，这类操作都会引起回流。如果要加多个子元素，最好使用documentfragment。

**2.几何属性的变化**

比如元素宽高变了，border变了，字体大小变了，这种直接会引起页面布局变化的操作也会引起回流。如果你要改变多个属性，最好将这些属性定义在一个class中，直接修改class名，这样只用引起一次回流。

**3.元素位置的变化**

修改一个元素的左右margin，padding之类的操作，所以在做元素位移的动画，不要更改margin之类的属性，使用定位脱离文档流后改变位置会更好。

**4.获取元素的偏移量属性**

例如获取一个元素的scrollTop、scrollLeft、scrollWidth、offsetTop、offsetLeft、offsetWidth、offsetHeight之类的属性，浏览器为了保证值的正确也会回流取得最新的值，所以如果你要多次操作，最取完做个缓存。

**5.页面初次渲染**

这样的回流无法避免

**6.浏览器窗口尺寸改变**

resize事件发生也会引起回流。

这里就不列举引起重绘的行为了，记住，回流一定伴随着重绘，所以上面的行为都会重绘，除此之外，例如修改背景颜色，字体颜色之类不影响布局的行为都只引发重绘

- 改变 window 大小

所以以下几个动作可能会导致性能问题：

- 改变字体
- 添加或删除样式
- 文字改变
- 定位或者浮动
- 盒模型
1. 当 Event loop 执行完 Microtasks 后，会判断 document 是否需要更新。因为浏览器是 60Hz 的刷新率，每 16ms 才会更新一次。

很多人不知道的是，重绘和回流其实和 Event loop 有关。

1. 然后判断是否有 `resize` 或者 `scroll` ，有的话会去触发事件，所以 `resize` 和 `scroll` 事件也是至少 16ms 才会触发一次，并且自带节流功能。
2. 判断是否触发了 media query
3. 更新动画并且发送事件
4. 判断是否有全屏操作事件
5. 执行 `requestAnimationFrame` 回调
6. 执行 `IntersectionObserver` 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
7. 更新界面
8. 以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 `requestIdleCallback` 回调。

**减少重绘和回流**

- 使用 `translate` 替代 `top`
- 使用 `visibility` 替换 `display: none` ，因为前者只会引起重绘，后者会引发回流（改变了布局）
- 把 DOM 离线后修改，比如：先把 DOM 给 `display:none` (有一次 Reflow)，然后你修改 100 次，然后再把它显示出来
- 不要把 `DOM 结点`的属性值放在`一个循环`里当成循环里的变量
- 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
- 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 `requestAnimationFrame`
- CSS 选择符从右往左匹配查找，避免 DOM 深度过深