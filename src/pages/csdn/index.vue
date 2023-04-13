<!--
 * @Date: 2023-04-11 14:22:06
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-13 16:15:46
-->
<template></template>

<script setup>


const checkExistRemove = (dom) => {
    const hasDom = $(dom)
    hasDom.length && hasDom.remove()
}

let removeArr = ['.programmer1Box', '#recommendAdBox', '.box-shadow.mb8', '#footerRightAds']
const removeAD = () => {
    removeArr.map(item => checkExistRemove(item))
}

const allowCopy = () => {
    $('pre').each(function () {   //  解除复制
        $(this).attr('style', "user-select: auto;")
        $(this).children('code').attr('style', "user-select: auto;")
    })

    //   一键复制
    $('.hljs-button').each(function () {
        $(this).attr("data-title", "一键复制").attr('onclick', '')
        // $(this).onclick = (event) => {
        //     event.stopPropagation && event.stopPropagation()
        // }
        let newDom = $(this).clone()
        $(this).replaceWith(newDom)
        newDom.on('click', function () {
            
            // setTimeout(() => {  $('.passport-login-container span').click() }, 200)   //  部分页面会触发登录弹窗 
            let allCode = $(this).closest('code')[0].innerText  //  获取到当前块所有代码内容
            navigator.clipboard.writeText(allCode)   //   复制到剪切板
            // ElMessage({ message: '复制成功!!!', type: 'success' })
            $(this).attr("data-title", "复制成功^_^")
            setTimeout(() => { $(this).attr("data-title", "一键复制") }, 2000)
        })
    })

    // $('.passport-login-container').css('cssText', 'display: none !important;')
    // $('.passport-login-container').attr('style', 'display: none;')
}

const unfoldArticle = () => {
    //   Commonsetinterval([".hide-article-box.text-center"]);

    //     hidenode.parentNode.removeChild(hidenode);
    //     document.getElementById("article_content").style="height: *px; ";
}

const removeRedirect = () => {
    $('#article_content a').map((index, item) => {
        if (item.origin != window.location.origin) {
            item.onclick = (event) => {
                event.stopPropagation && event.stopPropagation()
                item.setAttribute("target", "_blank")
            }
        }
    })
}
//     // 复制时保留原文格式，参考 https://greasyfork.org/en/scripts/390502-csdnremovecopyright/code
//     Object.defineProperty(unsafeWindow, "articleType", {
//         value: 0,
//         writable: false,
//         configurable: false
//     })



onMounted(() => {
    removeAD()   //移除广告
    allowCopy()   // 允许复制
    unfoldArticle()   //展开全文
    removeRedirect()   //移除重定向,直接打开外链
})


</script>
<style  lang='scss' scoped>

//  csdn  登录功能面板 屏蔽  // :global会自动编译到顶层全局css文件里
:global(.passport-login-container){
    display: none !important;
}
</style>