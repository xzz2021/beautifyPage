<!--
 * @Date: 2023-04-11 14:22:06
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 11:00:42
-->
<template></template>

<script setup>



let removeArr = ['.programmer1Box', '#recommendAdBox', '.box-shadow.mb8', '#footerRightAds', '#asideNewNps',
                    '#asideNewComments', '#recommendNps',  '.recommend-ask-box.has-bg',
                '.csdn-toolbar-creative-mp', '.write-guide-buttom-box', '#mys-wrapper', "#asideWriteGuide",'#remuneration']
const removeAD = () => {
    removeArr.map(item => API.checkExistHide(item))
}

const allowCopy = () => {
    $('pre').each(function () {   //  解除自由复制
        $(this).attr('style', "user-select: auto;")
        $(this).children('code').attr('style', "user-select: auto;")
        //  实现一键复制
        $(this).find('.hljs-button').replaceWith('<div class="hljs-button-xzz" >一键复制</div>')
        let copyBtn = $(this).find('.hljs-button-xzz')
        copyBtn.on('click', function () {
            // dom结构判断       //  向上寻找祖先元素                   // 查找同层兄弟元素
            let existDom = $(this).closest('code').length == 0 ?  $(this).siblings('code') : $(this).closest('code')
            let allCode = existDom[0].innerText.replace('\n\n一键复制', '')  //  获取到当前块所有代码内容
            // console.log("🚀 ~ file: index.vue:31 ~ allCode:", allCode)
            // return
            navigator.clipboard.writeText(allCode)   //   复制到剪切板
            ElMessage({ message: '复制成功!!!', type: 'success' })
            copyBtn.text("复制成功^_^")
            setTimeout(() => { copyBtn.text("一键复制") }, 2000)
        })
    })
    
    //   一键复制=======原始点击事件拦截方法=========
    // $('.hljs-button').each(function () {
    //     $(this).html('<div class="hljs-button-xzz signin" data-title="一键复制"></div>')
    //     newDom.on('click', function () {
            
    //         // setTimeout(() => {  $('.passport-login-container span').click() }, 200)   //  部分页面会触发登录弹窗 
    //         let allCode = $(this).closest('code')[0].innerText  //  获取到当前块所有代码内容
    //         navigator.clipboard.writeText(allCode)   //   复制到剪切板
    //         ElMessage({ message: '复制成功!!!', type: 'success' })
    //         $(this).attr("data-title", "复制成功^_^")
    //         setTimeout(() => { $(this).attr("data-title", "一键复制") }, 2000)
    //     })
    // })
}

const unfoldArticle = () => {   //   自动展开  关注博主阅读全文
    $('#article_content').attr('style', 'height:*px; overflow: auto;')
    $('.hide-article-box').remove()
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

const addStyle = () => {   //  动态注入style标签
    const removeDiv = [".tool-active-list", ".passport-container-mini-tip", ".passport-login-container", 
    ".sidetool-writeguide-box", ".passport-login-tip-container"]
    let style = `.hljs-button-xzz{
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    font-size: 12px;
                    color: #ffffff;
                    background-color: #9999AA;
                    padding: 2px 8px;
                    margin: 8px;
                    border-radius: 4px;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05);
                }`
    style += removeDiv.map(item => `${item}{display: none !important;}`).join('')
    
    API.appendStyle(style)  
}

const permitCopy = () => {  
 
    //优化登陆后复制
    // $('code').css({'user-select':'unset'})
    // $('#content_views pre').css({'user-select':'unset'})
 
 
    // //移除“登陆后复制”按钮
    //  $('.hljs-button').remove();
    // //移除readmore按钮，并显示全文
    // $('.hide-article-box').remove();
    // $('.article_content').css({'height':'initial'})
 
 
    //去除复制后的copyright小尾巴
 
    document.querySelectorAll('*').forEach(item=>{
    item.oncopy = function(e) {
        e.stopPropagation(); 
    }
})


}
onMounted(() => {
    addStyle() // 动态添加样式
    removeAD()   //移除广告
    allowCopy()   // 允许复制
    unfoldArticle()   //展开全文
    removeRedirect()   //移除重定向,直接打开外链
    permitCopy()  //允许内容文本复制
    //  特殊项点击关闭
    
    API.checkExistClick('.passport-auto-tip-login-container')
})


</script>
<style  lang='scss' scoped>


// :global(.hljs-button-xzz ){
//     // display: none;
//     position: absolute;
//     right: 4px;
//     top: 4px;
//     font-size: 12px;
//     color: #ffffff;
//     background-color: #9999AA;
//     padding: 2px 8px;
//     margin: 8px;
//     border-radius: 4px;
//     cursor: pointer;
//     box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05);
// }

</style>