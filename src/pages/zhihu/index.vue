<!--
 * @Date: 2023-04-11 14:22:06
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 11:59:48
-->
<template>

</template>

<script setup>

    
    //关注弹窗          //  顶部登录按钮               // 侧栏广告       专栏文章页登录 'ColumnPageHeader-profile'
let removeArr = ['.css-1ynzxqw33', '.AppHeader-profile', '.Question-sideColumn', '.ColumnPageHeader-profile',
                 ]

const removeLogins = () => {
    setTimeout(() => API.checkExistClick('.Modal-closeButton'), 5) // 登录弹窗 带蒙层  所以借由点击关闭

    removeArr.map(item => API.checkExistHide(item) )
    // 宽度由问题页父元素Question-main 决定
    API.isExist('.Question-mainColumn') && $('.Question-mainColumn').css('width', '100%')    // 主题内容宽度重置为100%
    //  知乎热点页面判断
    API.isExist('.Question-main') && API.isExist('.ContentItem-actions') && $('.ContentItem-actions').css('width', '1000px')    // 底栏和主题内容同宽
    API.isExist('.AuthorInfo') && $('.AuthorInfo').css('max-width', '1000px') 
    // setTimeout(() => checkExistHide('.css-1hwwfws') , 800)  //顶部登录浮窗  出现比较晚,所以需要延迟移除
}

const removeRedirect = () => {
    $('a').each(function(index, item){
        let rawUrl = $(this).attr('href')
        if(rawUrl?.includes('link.zhihu')){
            let newUrl = rawUrl.replace('//link.zhihu.com/?target=http%3A', '').replace('//link.zhihu.com/?target=https%3A', '')
            // console.log("🚀 ~ file================ newUrl:",newUrl)
            $(this).attr('href', newUrl)
        }
    })
}


//注入函数到inject里,共享浏览器调试面板的顶层window
const test = async() => {
  function ff(){
    return  window.aa ?? 'null'
  }
  let res =  await API.injectFn(ff)
  console.log("🚀 ~ file: app.vue:206 ~ test1 ~ res:", res)
}

const addStyle = () => {   //  动态注入style标签
    const style = ".css-1hwwfws, .css-1ynzxqw, .css-woosw9, .css-i9srcr{ display: none; }"
    API.appendStyle(style)  
}

const computeScroll = async () =>{
    const scrollTop = document.documentElement.scrollTop
    if(scrollTop  > 700){
    await API.wait(0.8)
        rmAdDiv()  // 移除广告
    }else{
        document.addEventListener("scroll", async function addListen(e) {
    const scrollTop2 = document.documentElement.scrollTop
    if(scrollTop2  > 700){
        await API.wait(0.8)
          rmAdDiv()  // 移除广告
          document.removeEventListener("scroll", addListen)
            }
        })

    }

}
// 获取右下角悬浮登录弹窗
const rmAdDiv = () => {
    $('img').each(function(index, item){
        const src = $(this).attr('src')
        if(src == 'https://static.zhihu.com/heifetz/assets/liukanshan-peek.a71ecf3e.png'){
            // 随便重置类名， 以使模块失效
            $(this).parent().parent().parent().attr('class', 'jyiugjh')
        }
    })
}

onMounted(async() => {
    addStyle()  // 动态添加样式

    removeLogins()  // 点击以及移除初始弹窗

    //  此方案 已 废弃   直接类 隐藏  即可
    // $(window).scroll(scrollRemove)  //监听滚动后右下角出现的登录弹窗

    removeRedirect()  //  屏蔽知乎重定向,直连第三方站点
    computeScroll()  //  监听滚动事件

    
})


</script>
<style  lang='scss' scoped>
.test{
    position: fixed;
    top: 200px;
    left: 300px;
    z-index: 6666;
}
//  全局暴露有缺陷， 会直接写入生成的content.css文件中，，  从而影响潜在同名的其他平台dom
// :global(.css-1hwwfws){
//     display: none;
// }

// :global(.css-1ynzxqw){
//     display: none;
// }

</style>


<style>
/* 写在这里和 使用global 效果相同 , 也会在content.css文件中生成*/
/* .css-1hwwfws, .css-1ynzxqw{
    display: none;
} */

</style>

