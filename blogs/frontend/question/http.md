---
title: Http
date: 2021-08-22
sidebar: auto
tags:
    - http
categories:
    - frontend
---


## 网络

### 常用状态码，301,304,302区别

301：被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一。如果可能，拥有链接编辑功能的客户端应当自动把请求的地址修改为从服务器反馈回来的地址。除非额外指定，否则这个响应也是可缓存的。

- 旧地址A的资源不可访问了(永久移除), 重定向到网址B，搜索引擎会抓取网址B的内容，同时将网址保存为B网址。

302：

这种情况下涉及到的重定向一般为302(临时重定向)

http服务发现响应状态码是302时，便会根据响应头的`Location`自动发送另一个请求(包括post请求);

JS不会接收到上一个请求的任何消息，也就是说，**JS无法获取302请求的信息;页面地址与服务器地址一致时，才会发送自动跳转**

### 301 Moved Permanently

永久重定向。说明请求的资源已经被移动到了由 Location 头部指定的 url 上，是固定的不会再改变。搜索引擎会根据该响应修正。

### 302 Found

临时重定向。重定向状态码表明请求的资源被暂时的移动到了由 Location 头部指定的 URL 上。浏览器会重定向到这个URL，但是搜索引擎不会对该资源的链接进行更新。

### 304 Not Modified 缓存重定向

说明无需再次传输请求的内容，也就是说可以使用缓存的内容。这通常是在一些安全的方法（safe），例如GET 或HEAD, 或在请求中附带了头部信息： If-None-Match 或If-Modified-Since。

如果返回 200，响应会带有头部 Cache-Control, Content-Location, Date, ETag, Expires，和 Vary.

### ETag 和 If-None-Match

1. 客户端请求一个文件（A）。 服务器返回文件A，并在给A加上一个 ETag。
2. 客户端收到响应后，并将文件连同 ETag 一起缓存。
3. 客户再次请求文件A，会发送 If-None-Match，内容是缓存该文件A的 Etag 值
4. 服务器检查该 ETag，和计算出来的 Etag 匹配，来判断文件是否未被修改。如果未修改就直接返回 304 和一个空的响应体。否则返回 200 和 文件。

当与 If-Modified-Since 一同使用的时候，If-None-Match 优先级更高（假如服务器支持的话）

### 协商缓存 和 强缓存

- 什么是缓存

浏览器缓存(Brower Caching)是浏览器对之前请求过的文件进行缓存，以便下一次访问时重复使用，节省带宽，提高访问速度，降低服务器压力

http缓存机制主要在http响应头中设定，响应头中相关字段为Expires、Cache-Control、Last-Modified、Etag

**强缓存：**

Expires：过期时间，如果设置了时间，则浏览器会在设置的时间内直接读取缓存，不再请求

Cache-Control：当值设为max-age=300时，则代表在这个请求正确返回时间（浏览器也会记录下来）的5分钟内再次加载资源，就会命中强缓存。

```jsx
（1） max-age：用来设置资源（representations）可以被缓存多长时间，单位为秒；
（2） s-maxage：和max-age是一样的，不过它只针对代理服务器缓存而言；
（3）public：指示响应可被任何缓存区缓存；
（4）private：只能针对个人用户，而不能被代理服务器缓存；
（5）no-cache：强制客户端直接向服务器发送请求,也就是说每次请求都必须向服务器发送。服务器接收到     请求，然后判断资源是否变更，是则返回新内容，否则返回304，未变更。这个很容易让人产生误解，使人误     以为是响应不被缓存。实际上Cache-Control:     no-cache是会被缓存的，只不过每次在向客户端（浏览器）提供响应数据时，缓存都要向服务器评估缓存响应的有效性。
（6）no-store：禁止一切缓存（这个才是响应不被缓存的意思）。
```

**协商缓存:**

`Last-Modifed/If-Modified-Since`和`Etag/If-None-Match`是分别`成对`出现的，呈一一对应关系

### Etag/If-None-Match：

Etag：

> Etag是属于HTTP 1.1属性，它是由服务器（Apache或者其他工具）生成返回给前端，用来帮助服务器控制Web端的缓存验证。
Apache中，ETag的值，默认是对文件的`索引节`（INode），`大小`（Size）和最后`修改时间`（MTime）进行`Hash`后得到的。
> 

If-None-Match:

> 当资源过期时，浏览器发现响应头里有Etag,则再次像服务器请求时带上请求头if-none-match(值是Etag的值)。`服务器`收到`请求进行比对`，决定返回200或304
> 

### Last-Modifed/If-Modified-Since：

Last-Modified：

> 浏览器向服务器发送资源最后的修改时间
> 

If-Modified-Since：

> 当资源过期时（浏览器判断Cache-Control标识的max-age过期），发现响应头具有Last-Modified声明，则再次向服务器请求时带上头if-modified-since，表示请求时间。服务器收到请求后发现有if-modified-since则与被请求资源的最后修改时间进行对比（Last-Modified）,若最后修改时间较新（大），说明资源又被改过，则返回最新资源，HTTP 200 OK;若最后修改时间较旧（小），说明资源无新修改，响应HTTP 304 走缓存。
> 

> Last-Modifed/If-Modified-Since的时间精度是秒，而Etag可以更精确。Etag优先级是高于Last-Modifed的，所以服务器会优先验证EtagLast-Modifed/If-Modified-Since是http1.0的头字段
> 

### http 和 https 区别

HTTP协议传输的数据都是未加密的，也就是明文的，因此使用HTTP协议传输隐私信息非常不安全，为了保证这些隐私数据能加密传输，于是网景公司设计了SSL（`Secure Sockets Layer`）协议用于对HTTP协议传输的数据进行加密，从而就诞生了HTTPS。

HTTP：是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和应答的标准（TCP），用于从WWW服务器传输超文本到本地浏览器的传输协议，它可以使浏览器更加高效，使网络传输减少。

HTTPS：是以安全为目标的HTTP通道，简单讲是HTTP的安全版，即`HTTP下加入SSL层`，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。

HTTPS协议的主要作用可以分为两种：一种是建立一个信息安全通道，来保证数据传输的安全；另一种就是确认网站的真实性。

**HTTPS和HTTP的区别主要如下：**

1. https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。
2. http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。
3. http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
4. http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全

### Http2.0特点

[https://juejin.cn/post/6844903734670000142](https://juejin.cn/post/6844903734670000142)

现在我们先不聊HTTP2, 看一下HTTP发展到1.1存在有哪些问题：

1. 线头阻塞：TCP连接上只能发送一个请求，前面的请求未完成前，后续的请求都在排队等待。
2. 多个TCP连接
虽然HTTP/1.1管线化可以支持请求并发，但是浏览器很难实现，chrome、firefox等都禁用了管线化。所以1.1版本请求并发依赖于多个TCP连接，建立TCP连接成本很高，还会存在慢启动的问题。
3. 头部冗余，采用文本格式
HTTP/1.X版本是采用文本格式，首部未压缩，而且每一个请求都会带上cookie、user-agent等完全相同的首部。
4. 客户端需要主动请求

### session 和 cookie

[https://juejin.cn/post/6844903842773991431](https://juejin.cn/post/6844903842773991431)

**当 cookie 没有设置 maxage 时，cookie 会存在多久
不设置max-age和expires，此cookie就是会话级别的，浏览器关闭就没了**

### 说下TCP/IP协议，主要有4层（应用层、传输层、网络层、链路层）