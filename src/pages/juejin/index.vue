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
            let allCode = $(this).parent('code')[0].innerText.replace('\n\n一键复制', '')  //  获取到当前块所有代码内容
            navigator.clipboard.writeText(allCode)   //   复制到剪切板
            ElMessage({ message: '复制成功!!!', type: 'success' })
            copyBtn.text("复制成功^_^")
            setTimeout(() => { copyBtn.text("一键复制") }, 2000)
        })
    })
}

onMounted(async() => {
    // removeLogins()  // 点击以及移除初始弹窗
    allowCopy()

})


</script>
<style  lang='scss' scoped>


//   复制代码按钮 替换类名
:global(.copy-code-btn-xzz) {
    position: absolute;
    top: 6px;
    right: 15px;
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
    color: hsla(0,0%,54.9%,.8);
    transition: color .1s;
}
:global(.recommend-box){
    display: none;
}
</style>


