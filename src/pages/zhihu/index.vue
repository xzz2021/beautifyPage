<!--
 * @Date: 2023-04-11 14:22:06
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 11:07:48
-->
<template>

</template>

<script setup>




    
    //关注弹窗          //  顶部登录按钮               // 侧栏广告       专栏文章页登录 'ColumnPageHeader-profile'
let removeArr = ['.css-1ynzxqw33', '.AppHeader-profile', '.Question-sideColumn', '.ColumnPageHeader-profile' ]

const removeLogins = () => {
    setTimeout(() => API.checkExistClick('.Modal-closeButton'), 100) // 登录弹窗 带蒙层  所以借由点击关闭

    removeArr.map(item => API.checkExistHide(item) )
    // 宽度由问题页父元素Question-main 决定
    API.isExist('.Question-mainColumn') && $('.Question-mainColumn').css('width', '100%')    // 主题内容宽度重置为100%
    //  知乎热点页面判断
    API.isExist('.Question-main') && API.isExist('.ContentItem-actions') && $('.ContentItem-actions').css('width', '1000px')    // 底栏和主题内容同宽
    
    // setTimeout(() => checkExistHide('.css-1hwwfws') , 800)  //顶部登录浮窗  出现比较晚,所以需要延迟移除
}

// const scrollRemove = async () => {
//             // let height = $(window).scrollTop()
//             // console.log("🚀 ~ file: index.vueght:", height)
//           if($('.css-1ynzxqw').length == 1 ){
//                 $('.css-1ynzxqw').remove()
//                 $(window).off('scroll', scrollRemove)  //  执行完移除事件本身
//           }
// }

const removeRedirect = () => {
    $('a').each(function(index, item){
        let rawUrl = $(this).attr('href')
        if(rawUrl?.includes('link.zhihu')){
            let newUrl = rawUrl.replace('//link.zhihu.com/?target=http%3A', '')
            $(this).attr('href', newUrl)
        }
        
    })
}

//注入函数到inject里,共享浏览器调试面板的顶层window
const test = async() => {
  function ff(){
    return  '98770'
  }
  let res =  await API.injectFn(ff)
  console.log("🚀 ~ file: app.vue:206 ~ test1 ~ res:", res)
}


onMounted(async() => {
    setTimeout(() => {  
        test()
    }, 200);
    removeLogins()  // 点击以及移除初始弹窗
    //  此方案 已 废弃   直接类 隐藏  即可
    // $(window).scroll(scrollRemove)  //监听滚动后右下角出现的登录弹窗

    removeRedirect()  //  屏蔽知乎重定向,直连第三方站点

    

})


</script>
<style  lang='scss' scoped>

//  全局暴露有缺陷， 会直接写入生成的content.css文件中，，  从而影响潜在同名的其他平台dom
:global(.css-1hwwfws){
    display: none;
}

:global(.css-1ynzxqw){
    display: none;
}

</style>


