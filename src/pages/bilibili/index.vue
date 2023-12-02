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
    }, 20);
}

const addStyle = () => {   //  动态注入style标签
    const style = `.login-tip,{ display: none; }
    body .bili-mini-mask, .login-tip, .vip-login-tip, .ad-report.video-card-ad-small, #bannerAd,
     .channel-layout .eva-banner{
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

const addFullFn = () => {
    document.addEventListener("DOMContentLoaded", function() {
  const videoElement = document.getElementsByTagName("video");

  videoElement.addEventListener("dblclick", function() {
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) { // Firefox
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) { // IE/Edge
      videoElement.msRequestFullscreen();
    }
  });
});

}

const autoFullscreen = async () => {
    const checkFull = setInterval(() => {
        //  此按钮只能手动触发
        let fullBtn = $('.bpx-player-ctrl-btn.bpx-player-ctrl-full')
        if(fullBtn.length == 1){
            $('.bpx-player-ctrl-btn.bpx-player-ctrl-full').click()
            clearInterval(checkFull)
        }else{
        }
    }, 1000)

}

const autoFullscreen000 = async () => {
    await API.wait(3)
    const checkFull = setInterval(() => {
        //  此按钮只能手动触发
        let fullBtn = $('#bilibili-player .bpx-player-video-wrap video')
        console.log("🚀 ~ file: index.vue:69 ~ checkFull ~ fullBtn:", fullBtn)
        if(fullBtn.length == 1){
            // fullBtn.click() //
            clearInterval(checkFull)
            $('#bilibili-player .bpx-player-container').attr('data-screen', 'full')

            console.log("🚀 ~ file: index.vue:72 ~ checkFull ~ click:")
        }else{

        }
    }, 1000)

}


const clickToPlay = async() => {
    let isVideoPage =  location.href.includes('video')
    if(!isVideoPage) return
    // 自动全屏
   
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


//  区分播放量
const tagPlayNum = () => {
    $('.bili-video-card__mask ').each(function(){
        const curSpan = $(this).find('.bili-video-card__stats--item > span')[0]
        const num = $(curSpan).text()
        console.log("🚀 ~ file: index.vue:111 ~ $ ~ mm:", mm)
        // if(num.includes('亿')) return $(this).
        // num = num.includes('万') ? num.replace('万', '')

    })
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
    // console.log("🚀 ~ file: index.vue:68 ~ onMounted ~ removeAutoLogin:")
    // tagPlayNum()
    // autoFullscreen()
    
})


</script>
<style  lang='scss' scoped>

</style>


