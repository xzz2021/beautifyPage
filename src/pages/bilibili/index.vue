<!--
 * @Date: 2023-04-11 14:22:06
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 11:59:48
-->
<template>

<!-- <div class="test">
    <el-button type="primary" @click="test">testtest</el-button>
</div> -->
</template>

<script setup>
import { onBeforeMount } from 'vue';


// let removeArr = ['.right-entry .right-entry-item', ]
const removeDiv = async () => {
    // removeArr.map(item => API.checkExistHide(item))
    const checkRmDiv = setInterval(() => {
        let rmItems = $('.right-entry .right-entry-item')
        if(rmItems.length <  2) return
        $(rmItems[0]).attr('style', 'display: none;')
        $(rmItems[1]).attr('style', 'display: none;')
        clearInterval(checkRmDiv)        
    }, 1000);
}

const addStyle = () => {   //  动态注入style标签
    const style = `.login-tip,{ display: none; }
    body .bili-mini-mask, .login-tip, .vip-login-tip{
        display: none !important;
        z-index: -2 !important;
    }`
    API.appendStyle(style)  
}

const addMask = () => { 
    // $('body').
    const div=document.createElement('div');
    div.setAttribute('class', 'bili-mini-mask')
    document.body.appendChild(div);

}

const clickToPlay = async() => {
    let isVideoPage =  location.href.includes('video')
    if(!isVideoPage) return
    await API.wait(30)
    const check = setInterval(() => {
        let pl = $('.bili-paused').length
        console.log("🚀 ~ 每秒钟检查一次视频是否暂停")
        if(pl > 0){
            console.log("🚀 ~ 检查结束=============")
            clearInterval(check)
            $('.bpx-player-ctrl-btn.bpx-player-ctrl-play').click()
            const check2 = setInterval(() => {
            let pl2 = $('.bili-paused').length
            console.log("🚀 ~ 再次检查")
            if(pl2 > 0){
                console.log("🚀 ~ 再次检查结束===")
                clearInterval(check2)
                $('.bpx-player-ctrl-btn.bpx-player-ctrl-play').click()
            }
        }, 1000);
        }

    }, 1000);
}

const autoHD = async() => {


    const re = /https:\/\/www\.bilibili\.com\/video\/.*/;
  const oldHref = window.location.href;
  const timer4Url = setInterval(() => {
    const newHref = window.location.href;
    if (newHref === oldHref) return;
    if (re.test(newHref) || re.test(oldHref)) {
      clearInterval(timer4Url);
      window.location.reload();
    }
  }, 200);

  // const originSetTimeout = window.setTimeout;
  // window.setTimeout = function(func, delay) {
  //   // if (delay === 3e4) delay = 3e8;
  //   // return originSetTimeout.call(this, func, delay);
  //   if(delay < 50 || delay > 30){
  //   return originSetTimeout.call(this, func, delay*1000);
  //   }
  // }

  // click the trial button automatically
  const timer4Btn = setInterval(async () => {
    const trialBtn = document.querySelector('.bpx-player-toast-confirm-login');
    if (trialBtn) {
      trialBtn.click()
      clearInterval(timer4Btn);
    }
  }, 200);
}




onBeforeMount(() => {
    addStyle()  // 动态添加样式
})

onMounted(async () => {
    autoHD()
    removeDiv()
    addMask()
    clickToPlay()
    // removeAutoLogin()
    console.log("🚀 ~ file: index.vue:68 ~ onMounted ~ removeAutoLogin:")

    
})


</script>
<style  lang='scss' scoped>

</style>


