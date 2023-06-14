<!--
 * @Date: 2023-04-11 14:22:06
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 10:01:55
-->
<template>

<div class="translateBox" >testtest</div>
</template>

<script setup>


let selectedText = ref("")
let translatedText = ref("")

onMounted(async() => {
   console.log("🚀 ~ file: index.vue:15 ~ onMounted ~ onMounted===============:")
document.addEventListener('mouseup', async  function(event) {
  const currentText = document.getSelection().toString()
  if(API.hasChineseChar(currentText)) return
  if(currentText.length >= 200) return
  // if(currentText == '' || currentText == selectedText.value)  return $('.translateBox').css({'z-index': -1})
  if(currentText == '' || currentText == selectedText.value)  return $('.translateBox').fadeOut()
  selectedText.value = currentText

  let resText = await  API.sendMessage({type: 'myfetch',config: { url: `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=zh-cn&q=${currentText}`}})
  // console.log("🚀 ~ file: index.vue:27 ~ document.addEventListener ~ resText:", resText)
  // return
  translatedText.value = resText[0][0] ?? "翻译失败"
  const  scrollHeight = document.documentElement.scrollTop
  // console.log("🚀 ~ file: index.vue:30 ~ document.addEventListener ~ scrollHeight:", scrollHeight)
  const x = event.clientX
  const y = event.clientY - 20 + scrollHeight
  $('.translateBox').text(translatedText.value).css({'top': y + 'px', 'left': x + 'px'}).show()
});

})


</script>
<style  lang='scss' scoped>
.translateBox{
    position: absolute;
    // top: 50%;
    // left: 50%;
    transform: translate(-100%, -100%);
    background-color: white;
    // font-size: 20px;
    // color: #fff;
    text-align: center;
    padding: 10px;
    z-index: 99999;
}
</style>


