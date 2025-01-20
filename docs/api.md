# API

```js
$cms({

    // 域名
    domain : 'https://xxx.uc.2kog.com', //指定临时请求到特殊域名
    region : 'sg',  //某些接口需要指定特定地域，大陆不支持访问

    // 其它
    progress : true, //开启进度观察

    // 拦截器
    interceptor : false, //关闭拦截器，可能存在需要自行处理错误
    popType : 'message', //默认拦截器的错误样式，alert弹窗,notify通知

},{
    ... // 其它的axios config设置
})
```

