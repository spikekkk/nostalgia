import{_ as t,r as l,o as r,c as o,a as n,b as s,d as a,e as i}from"./app-c5939a72.js";const c={},p=n("p",null,"之前一直使用hexo来进行博客搭建,但是繁杂的部署方式以及书写让我转投vuepress的怀抱,做一个流程;方便记录下整个体验过程",-1),d=n("h3",{id:"vuepress",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#vuepress","aria-hidden":"true"},"#"),s(" vuepress")],-1),u={href:"https://vuepress.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"},v=n("p",null,"因为官方主题太过简陋,采用了reco主题进行搭建",-1),m={id:"reco主题",tabindex:"-1"},h=n("a",{class:"header-anchor",href:"#reco主题","aria-hidden":"true"},"#",-1),b={href:"https://vuepress-theme-reco.recoluan.com/",target:"_blank",rel:"noopener noreferrer"},k=i(`<p>reco主题提供了脚手架可以实现一键创建vuepress项目</p><h2 id="快速开始2-0" tabindex="-1"><a class="header-anchor" href="#快速开始2-0" aria-hidden="true">#</a> 快速开始2.0</h2><p><strong>npx</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 初始化，并选择 2.x</span>
npx @vuepress-reco/theme-cli init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>npm</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 初始化，并选择 2.x</span>
<span class="token function">npm</span> <span class="token function">install</span> @vuepress-reco/theme-cli@1.0.7 <span class="token parameter variable">-g</span>
theme-cli init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>yarn</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 初始化，并选择 2.x</span>
<span class="token function">yarn</span> global <span class="token function">add</span> @vuepress-reco/theme-cli@1.0.7
theme-cli init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="快速开始1-0" tabindex="-1"><a class="header-anchor" href="#快速开始1-0" aria-hidden="true">#</a> 快速开始1.0</h2><p><strong>npx</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>npx @vuepress-reco/theme-cli init my-blog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>npm</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 初始化</span>
<span class="token function">npm</span> <span class="token function">install</span> @vuepress-reco/theme-cli <span class="token parameter variable">-g</span>
theme-cli init my-blog
<span class="token comment"># 安装</span>
<span class="token builtin class-name">cd</span> my-blog
<span class="token function">npm</span> <span class="token function">install</span>
<span class="token comment"># 运行</span>
<span class="token function">npm</span> run dev
<span class="token comment"># 编译</span>
<span class="token function">npm</span> run build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>yarn</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 初始化</span>
<span class="token function">yarn</span> global <span class="token function">add</span> @vuepress-reco/theme-cli
theme-cli init my-blog
<span class="token comment"># 安装</span>
<span class="token builtin class-name">cd</span> my-blog
<span class="token function">yarn</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动项目" tabindex="-1"><a class="header-anchor" href="#启动项目" aria-hidden="true">#</a> 启动项目</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>npx @vuepress-reco/theme-cli init recodemo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后进入<code>recodemo</code>文件夹使用 <code>npm i</code>命令下载一下依赖</p>`,18),g=n("code",null,"recodemo\\docs\\.vuepress\\config.js",-1),f={href:"https://vuepress-theme-reco.recoluan.com/views/1.x/configJs.html",target:"_blank",rel:"noopener noreferrer"},_=n("code",null,"views",-1),x=n("code",null,"first.md",-1),y={href:"https://vuepress-theme-reco.recoluan.com/views/1.x/frontMatter.html",target:"_blank",rel:"noopener noreferrer"},w=i(`<div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml"><span class="token key atrule">title</span><span class="token punctuation">:</span> 这是我的first文章
<span class="token key atrule">date</span><span class="token punctuation">:</span> <span class="token datetime number">2018-09-30</span>
<span class="token key atrule">sidebar</span><span class="token punctuation">:</span> <span class="token string">&#39;auto&#39;</span>
<span class="token key atrule">categories</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> blog
<span class="token key atrule">tags</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> first</span>
<span class="token punctuation">---</span></span>

<span class="token title important"><span class="token punctuation">##</span> 这是我的第一篇文章</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后使用 <code>npm run dev</code>将项目运行起来</p><h3 id="添加摘要" tabindex="-1"><a class="header-anchor" href="#添加摘要" aria-hidden="true">#</a> 添加摘要</h3>`,3),j={href:"https://vuepress-theme-reco.recoluan.com/views/0.x/abstract.html",target:"_blank",rel:"noopener noreferrer"},q=n("h3",{id:"使用插件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#使用插件","aria-hidden":"true"},"#"),s(" 使用插件")],-1),E={href:"https://vuepress-theme-reco.recoluan.com/views/plugins/",target:"_blank",rel:"noopener noreferrer"},B={href:"https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html",target:"_blank",rel:"noopener noreferrer"},I=i(`<h3 id="加密功能" tabindex="-1"><a class="header-anchor" href="#加密功能" aria-hidden="true">#</a> 加密功能</h3><p><strong>全局加密</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// .vuepress/config.js</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token string">&#39;reco&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 密钥</span>
    <span class="token literal-property property">keyPage</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">keys</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;32位的 md5 加密密文&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 1.3.0 版本后需要设置为密文</span>
      <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#42b983&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 登录页动画球的颜色</span>
      <span class="token literal-property property">lineColor</span><span class="token operator">:</span> <span class="token string">&#39;#42b983&#39;</span> <span class="token comment">// 登录页动画线的颜色</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>文章加密</strong></p><div class="language-m line-numbers-mode" data-ext="m"><pre class="language-m"><code>---
title: vuepress-theme-reco
date: 2019-04-09
author: reco_luan
keys:
 - &#39;32位的 md5 加密密文&#39;
---
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加侧栏" tabindex="-1"><a class="header-anchor" href="#添加侧栏" aria-hidden="true">#</a> 添加侧栏</h3><p>页面中,reco主题会默认根据你的标题生成侧边栏目录-右边展示， 但如果要汇总的文档页面你想让左侧边栏显示你的所有页面的标题,需要手动配置</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token string-property property">&quot;sidebar&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&#39;/blogs/tips&#39;</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;侧边栏&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">collapsable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 不可折叠</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;blogs/tips/es6&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;blogs/tips/es5&#39;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用插件</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i vuepress-plugin-auto-sidebar <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是不知道为啥,我没生效,可能是插件时间太久了吧</p><h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h2><p>###Github 白嫖部署 如果你的仓库名为 username.github.io</p><p>你就不用再vuepress中做任何修改，如果不为这个名称，你就需要在config.js中配置 base属性为你的仓库名</p><p>如果你想部署博客的同时 也将博客代码同步到git的话，可以通过新建一个分支或者专门存放代码的仓库</p><p>这里选用的是新建一个分支来解决</p><p><strong>gitignore</strong> 文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>node_modules/
yarn.lock
yarn.error
docs/.vuepress/theme
package-lock.json
public/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="新建脚步用来提交" tabindex="-1"><a class="header-anchor" href="#新建脚步用来提交" aria-hidden="true">#</a> 新建脚步用来提交</h4><p>deploy.sh 用来打包</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> run build

<span class="token builtin class-name">cd</span> public

<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;deploy&#39;</span>

<span class="token function">git</span> push <span class="token parameter variable">-f</span> git@github.com:spikekkk/nostalgia.git master:main

<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> public

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>push.sh 用来push源文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;push&#39;</span>
<span class="token function">git</span> push <span class="token parameter variable">-f</span> origin master:blogcode

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本地开始为master分支,分别推送到仓库的 main<code>博客打包分支</code> blogcode<code>源代码分支</code></p><h2 id="package-json配置启动命令" tabindex="-1"><a class="header-anchor" href="#package-json配置启动命令" aria-hidden="true">#</a> package.json配置启动命令</h2><p>要在base环境启动</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev . --open --host \\&quot;localhost\\&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build .&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;deploy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bash deploy.sh&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;push&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bash push.sh&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="markdown-语法" tabindex="-1"><a class="header-anchor" href="#markdown-语法" aria-hidden="true">#</a> markdown 语法</h2>`,28),N={href:"https://vuepress.vuejs.org/zh/guide/markdown.html#%E9%93%BE%E6%8E%A5",target:"_blank",rel:"noopener noreferrer"},C=i(`<p>常用的copy几个做记录</p><h3 id="自定义容器" tabindex="-1"><a class="header-anchor" href="#自定义容器" aria-hidden="true">#</a> 自定义容器</h3><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>::: tip
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),M=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("p",null,"这是一个提示")],-1),A=n("div",{class:"custom-container warning"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8v4"}),n("path",{d:"M12 16h.01"})])]),n("p",{class:"custom-container-title"},"WARNING"),n("p",null,"这是一个警告")],-1),V=n("div",{class:"custom-container danger"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M10 10l4 4m0-4l-4 4"})])]),n("p",{class:"custom-container-title"},"DANGER"),n("p",null,"这是一个危险警告")],-1),z=n("details",{class:"custom-container details"},[n("summary",{class:"custom-container-title"},"DETAILS"),n("p",null,"这是一个详情块，在 IE / Edge 中不生效")],-1),D=n("h3",{id:"代码块中的语法高亮",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#代码块中的语法高亮","aria-hidden":"true"},"#"),s(" 代码块中的语法高亮")],-1),G={href:"https://prismjs.com/",target:"_blank",rel:"noopener noreferrer"},L=n("p",null,"https://prismjs.com/themes/prism-tomorrow.css",-1),T=n("p",null,"cdn存在引入不稳定问题,貌似主题作者已经发现,但还是有待解决,不然代码高亮会直接失效",-1);function P(R,S){const e=l("ExternalLinkIcon");return r(),o("div",null,[p,d,n("blockquote",null,[n("p",null,[n("a",u,[s("Vue 驱动的静态网站生成器。官方文档立即前往"),a(e)])])]),v,n("h2",m,[h,s(),n("a",b,[s("reco主题"),a(e)])]),k,n("p",null,[s("然后打开 "),g,s(",配置一些自定义信息，具体的可配置信息"),n("a",f,[s("立即前往"),a(e)])]),n("p",null,[s("在"),_,s("目录下新建一个 "),x,s(" 文件，这个前面的内容相当于是文章的信息描述，具体的可描述信息"),n("a",y,[s("立即前往"),a(e)])]),w,n("p",null,[s("!--more-- "),n("a",j,[s("摘要语法"),a(e)])]),q,n("p",null,[n("a",E,[s("主题自带插件"),a(e)])]),n("p",null,[n("a",B,[s("插件使用细节"),a(e)])]),I,n("p",null,[n("a",N,[s("官方推荐的语法操作"),a(e)])]),C,M,A,V,z,D,n("p",null,[s("支持js,bash,html,css等等"),n("a",G,[s("prismjs"),a(e)])]),L,T])}const W=t(c,[["render",P],["__file","vuepress.html.vue"]]);export{W as default};
