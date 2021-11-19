---
title: 下载的一些tips
date: 2019-12-13
sidebar: auto
tags:
 - tips
categories: 
 - frontend

---

## 浏览器下载的一些方法总结

根据后端提供下载服务的不同可采用不同的标签元素进行下载

1. 服务器有静态资源且是固定文件名的url,直接a标签下载(get方式),或者window.open(url)

   ```js
   <a href="xxx.xlsx">完整路径下载</a>
   ```

2. 返回文件流,使用blob转为url后使用a标签下载

    ```js

    fetch('http://somehost/somefile.zip').then(res => res.blob().then(blob => {
        const a = document.createElement('a');
        // 获取文件名fileName
        const fileName = res.headers["content-disposition"].split("=");
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        // 移除a标签
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }))

    ```

## 下载注意事项

1. 获取到二进制文件流,需要转换相应的格式来进行下载操作

    ```js
    let data; //存储使用ajax请求到的二进制数据
    let blob=new Blob (data, {type:'application/zip'})
    let objectURL= window.URL.createObjectUrl(blob)
    window.open (objectURL);
    ```

2. 其次是获取responseHeader中的filename

   ```js
        // 获取文件名fileName
    const fileName = res.headers["content-disposition"].split("=");
   ```
   需要注意的是请求头一般是后端自定义的,在本地开发情况下,可以自由获取,
   但在部署服务器后,默认的请求上， 浏览器只能访问以下默认的 响应头
    ```
    Cache-Control

    Content-Language

    Content-Type

    Expires

    Last-Modified

    Pragma
    ```
    如果想让浏览器能访问到其他的 响应头的话 需要在服务器上设置 `Access-Control-Expose-Headers`

    ```js
    Access-Control-Expose-Headers : 'content-disposition'
    ```
    这样才能通过`response.header.get('content-disposition')`拿到返回的文件名



3. 若文件过大,需要等待当前接口返回文件结束才进行下载,需要对下载操作添加防抖设计

    ```js
    const blob = res.data;
    // FileReader主要用于将文件内容读入内存
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    // onload当读取操作成功完成时调用
        reader.onload = function(e) {
        const a = document.createElement('a');

        }
    ```

+ 生成JSON文件下载

    ```js

    // 通过json.stringify进行格式化操作
    const data = JSON.stringify(data, undefined, 4)
            
    const blob = new Blob([data], {type: 'text/json'}),
        
    ```

+ 生成CSV文件下载

    ```js
    
    const blob = new Blob([data], {type: 'text/csv,charset=UTF-8'}),
        
    ```

+ 生成Text文件下载

    ```js
    
    const blob = new Blob([data], {type: 'text/txt,charset=UTF-8'}),
        
    ```
