<!--
 * @Date: 2023-04-11 14:22:06
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 16:57:46
-->
<template>
  <!-- <div class="test">
        <el-button type="primary" >testtest</el-button>
    </div> -->
</template>

<script setup>
const beautifyPage = () => {
  //内容扩大居中
  $('#__next ._3VRLsv ._gp-ck').css('width', '100%')
  $('#__next ._3VRLsv ._2OwGUo').css('display', 'none')
}

const closeAd = () => {
  // 全局 游戏窗口广告
  $('#__next')
    .siblings('div')
    .not('#platformjianshu')
    .not('#__REC__-container')
    .each(function () {
      $(this).attr('style', 'display: none;')
    })

  // 侧边广告
  $('.container .row .aside')
    .children('div')
    .each(function () {
      let ad = $(this).attr('aria-label')
      if (ad == '3rd-ad') {
        $(this).attr('style', 'display: none;')
      }
    })
}

const removeRedirect = () => {
  $('a').each(function (index, item) {
    let rawUrl = $(this).attr('href')
    if (rawUrl?.includes('link.jianshu') ||rawUrl?.includes('links.jianshu')) {
      let newUrl = ''
      const splitUrlArr = rawUrl.split('=')
      console.log("🚀 ~ splitUrlArr:", splitUrlArr)
      if(splitUrlArr.length > 2) {
       newUrl = rawUrl.replace(rawUrl.split('=')[0], '')
        
      }else if(splitUrlArr.length == 2) {
        newUrl = rawUrl.split('=')[1]
      }
      newUrl = decodeURIComponent(newUrl)
      console.log("🚀 ~ newUrl:", newUrl)
      $(this).attr('href', newUrl)
    }
  })
}

const addStyle = () => {
  //  动态注入style标签
  const removeDiv = ["._3Pnjry", "._23ISFX", "._23ISFX-mask"]
  let style = `body{
    overflow: auto !important;
  }`
  style += removeDiv.map(item => `${item}{display: none !important;}`).join('')
  API.appendStyle(style)
}

onMounted(async () => {
  addStyle()  // 动态添加样式
  console.log("🚀 ~ file: 71====启动检查===========")

  beautifyPage()

  removeRedirect() //  屏蔽简书重定向,直连第三方站点

  await API.wait(0.05)
  closeAd() //关闭广告
})
</script>
<style lang="scss" scoped>
// .test {
//   position: fixed;
//   top: 200px;
//   left: 300px;
//   z-index: 6666;
// }

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
