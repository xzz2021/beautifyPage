<!--
 * @Date: 2023-04-11 14:22:06
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-12 11:18:58
-->
<template>

</template>

<script setup>




const removeLogins = () => {
    setTimeout(() => { $('.Modal-closeButton').click() }, 100) // 登录弹窗 带蒙层  所以借由点击关闭

                        //关注弹窗          //  顶部登录按钮               // 侧栏广告       专栏文章页登录 'ColumnPageHeader-profile'
    let removeArr = ['.css-1ynzxqw33', '.AppHeader-profile', '.Question-sideColumn', '.ColumnPageHeader-profile' ]
    removeArr.map(item => { $(item).length != 0 && $(item).remove() })

    $('.Question-mainColumn').css('width', '100%')    // 主题内容宽度重置为100%

    setTimeout(() => { $('.css-1hwwfws').remove() }, 800)  //顶部登录浮窗  出现比较晚,所以需要延迟移除
}

const scrollRemove = async () => {
            // let height = $(window).scrollTop()
            // console.log("🚀 ~ file: index.vueght:", height)
          if($('.css-1ynzxqw').length == 1 ){
                $('.css-1ynzxqw').remove()
                $(window).off('scroll', scrollRemove)  //  执行完移除事件本身
          }
}

onMounted(() => {
    
    removeLogins()  // 点击以及移除初始弹窗

    $(window).scroll(scrollRemove)  //监听滚动后右下角出现的登录弹窗
})


</script>
<style  lang='scss' scoped>


</style>