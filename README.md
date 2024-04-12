
**这是一个谷歌chrome浏览器插件，用于屏蔽pc常用网站的登录限制,广告,各种弹窗,代码一键复制，让自己聚焦于信息主体**

使用油猴或第三方插件不放心,所以写一个自己用,同时作为开源项目,基于[我的插件脚手架](https://github.com/xzz2021/crx-cli)开发


目前适配的平台:

> * 知乎: `去登录.关注.右下角弹窗` `外链直接跳转`
> * csdn: `去广告` `代码直接复制` `一键复制代码` `直接展开博主文章` `外链直接跳转`
> * 掘金: `去广告` `一键复制(貌似官方现在取消了限制)` `外链直接跳转`
> * 简书: `去广告`  `外链直接跳转`
> * B站: `去广告`  `移除未登录视频自动暂停及登录弹窗` `未登录无限试看1080P` `视频列表高亮播放量高的视频`
> * 廖雪峰博客: `去广告`

B站无限试看1080P功能代码有借鉴这位大佬[DD1969的代码](https://greasyfork.org/zh-CN/scripts/467511-bilibili-%E5%9C%A8%E6%9C%AA%E7%99%BB%E5%BD%95%E7%9A%84%E6%83%85%E5%86%B5%E4%B8%8B%E8%87%AA%E5%8A%A8%E5%B9%B6%E6%97%A0%E9%99%90%E8%AF%95%E7%94%A8%E6%9C%80%E9%AB%98%E7%94%BB%E8%B4%A8)

部分功能预览:

`代码一键复制`
![使用前](https://github.com/xzz2021/public/blob/main/image/beautifypage/1.png?raw=true)

![使用后2](https://github.com/xzz2021/public/blob/main/image/beautifypage/2.png?raw=true)![使用后2](https://github.com/xzz2021/public/blob/main/image/beautifypage/3.png?raw=true)

> node开发运行环境版本: 18.13.0

> 使用方式: 下载文件解压后将目录直接拖拽到浏览器!

建议反馈：QQ群：1078510132


> 1.如果想自定义修改
````js
    npm run watch
````
> 2. 或者自行打包
````js
   npm run build
````
