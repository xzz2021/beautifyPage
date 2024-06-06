<!--
 * @Date: 2023-04-11 14:22:06
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 10:01:55
-->
<template>

</template>

<script setup>


// // let removeArr = ['.recommend-box' ]
// const removeLogins = () => {
//     // removeArr.map(item => checkExistHide(item) )

// }

const allowCopy = () => {  //   一键复制
    $('pre').each(function () {
        let copyBtn = $(this).children('code').children(':last-child')
        copyBtn.text('一键复制')
        copyBtn.attr('class', 'copy-code-btn-xzz')  //   复制代码按钮 替换类名
        copyBtn.on('click', function () {
            $('html, body').css('overflowY', 'auto');
            let allCode = $(this).parent('code')[0].innerText.replace('\n\n一键复制', '')  //  获取到当前块所有代码内容
            navigator.clipboard.writeText(allCode)   //   复制到剪切板
            ElMessage({ message: '复制成功!!!', type: 'success' })
            copyBtn.text("复制成功^_^")
            setTimeout(() => { copyBtn.text("一键复制") }, 2000)
        })
    })
}

const allowCopy2 = async () => {  //   一键复制
    await API.wait(1.5)
    $('pre').each(function () {
        let copyBtn = $(this).find('.code-block-extension-copyCodeBtn')
        // copyBtn.attr('onclick','').unbind('click')  //  移除原本点击事件无效
        $('html, body').css('overflow', 'auto');  // 移除原生弹框出现后的body hidden
        copyBtn.text('一键复制')
        copyBtn.attr('class', 'code-block-extension-copyCodeBtn-xzz')  //   复制代码按钮 替换类名
        copyBtn.on('click', function () {
            // $(this).attr('onclick','').unbind('click')
            let allCode = $(this).closest('pre').children('code')[0].innerText.replace('\n\n一键复制', '')  //  获取到当前块所有代码内容
            navigator.clipboard.writeText(allCode)   //   复制到剪切板
            ElMessage({ message: '复制成功!!!', type: 'success' })
            copyBtn.text("复制成功^_^")
            setTimeout(() => { copyBtn.text("一键复制") }, 2000)
        })
    })
}

const addStyle = () => {
  const removeDiv = [".global-component-box", ".login-guide-wrap", ".nav-item.auth", ".bottom-login-guide"]
    let style = `.code-block-extension-copyCodeBtn-xzz{
                    font-size: 12px;
                    margin-left: 10px;
                    cursor: pointer;
                    color: hsla(0,0%,54.9%,.8);
                    transition: color .1s;
                 }`
    style += removeDiv.map(item => `${item}{display: none !important;}`).join('')
    API.appendStyle(style)         

}

const removeRedirect = () => {
  $('a').each(function (index, item) {
    let rawUrl = $(this).attr('href')
    if (rawUrl?.includes('link.juejin') || rawUrl?.includes('target')) {
      let newUrl = ''
      const splitUrlArr = rawUrl.split('=')
      if(splitUrlArr.length > 2) {
       newUrl = rawUrl.replace(rawUrl.split('=')[0], '')
      }else if(splitUrlArr.length == 2) {
        newUrl = rawUrl.split('=')[1]
      }
      newUrl = decodeURIComponent(newUrl)
      $(this).attr('href', newUrl)
    }
  })
}



onMounted(async() => {
    addStyle() // 动态添加样式

    removeRedirect()  // 移除重定向
    // removeLogins()  // 点击以及移除初始弹窗
    await allowCopy2()


})


</script>
<style  lang='scss' scoped>


//   复制代码按钮 替换类名
// :global(.copy-code-btn-xzz) {
//     position: absolute;
//     top: 6px;
//     right: 15px;
//     font-size: 12px;
//     line-height: 1;
//     cursor: pointer;
//     color: hsla(0,0%,54.9%,.8);
//     transition: color .1s;
// }
// :global(.recommend-box){
//     display: none;
// }
</style>


