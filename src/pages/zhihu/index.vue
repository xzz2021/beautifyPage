<!--
 * @Date: 2023-04-11 14:22:06
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-13 11:17:42
-->
<template>

</template>

<script setup>


    const isExist = (dom) => {
        return $(dom).length != 0
    }
    const checkExistClick = (dom) => {
         const hasDom = $(dom)
         hasDom.length && hasDom.trigger('click')

    }

    const checkExistRemove = (dom) => {
         const hasDom = $(dom)
         hasDom.length && hasDom.remove()
    }

    
    //关注弹窗          //  顶部登录按钮               // 侧栏广告       专栏文章页登录 'ColumnPageHeader-profile'
let removeArr = ['.css-1ynzxqw33', '.AppHeader-profile', '.Question-sideColumn', '.ColumnPageHeader-profile' ]

const removeLogins = () => {
    setTimeout(() => checkExistClick('.Modal-closeButton'), 100) // 登录弹窗 带蒙层  所以借由点击关闭

    removeArr.map(item => checkExistRemove(item) )

    isExist('.Question-mainColumn') && $('.Question-mainColumn').css('width', '100%')    // 主题内容宽度重置为100%
 
    setTimeout(() => checkExistRemove('.css-1hwwfws') , 800)  //顶部登录浮窗  出现比较晚,所以需要延迟移除
    // setTimeout(checkExistRemove('.css-1hwwfws') , 800)   // 此处是将函数执行后的结果传递给settimeout,,,所以会立即执行
    // setTimeout(() => $('.css-1hwwfws').remove() , 800)  //顶部登录浮窗  出现比较晚,所以需要延迟移除
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


