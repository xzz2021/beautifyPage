<!--
 * @Date: 2023-04-11 14:22:06
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 11:59:48
-->
<template>

<div class="bilibili_container">

<el-popover
v-if="isHomepage"
      :width="300"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" />
      </template>
      <template #default>
        <div>高亮播放量高于</div>
        <el-input-number v-model="limitNum" :precision="2" :step="0.1" :max="1000" />
        <div>万的视频</div>
        <el-button type="primary">确定</el-button>

        <el-switch
    v-model="switchValue"
    class="ml-2"
    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
  />
      </template>
    </el-popover>

</div>

</template>

<script setup>
import { computed, onBeforeMount } from 'vue';

 const isHomepage = ref(false)
onBeforeMount(() => {
    isHomepage.value = !(location.href.includes('video') || location.href.includes('list'))
})


const switchValue = ref(false)
const limitNum = ref(50)
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
    const re2 = /https:\/\/www\.bilibili\.com\/list\/.*/;
  const oldHref = window.location.href;
  const timer4Url = setInterval(() => {
    const newHref = window.location.href;
    if (newHref === oldHref) return;
    if (re.test(newHref) || re.test(oldHref) || re2.test(newHref) || re2.test(oldHref)) {
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

const throttleFlag = ref(false)
//  区分播放量
const tagPlayNum = async() => {
  if(throttleFlag.value) return
  // console.log("🚀 ~ tagPlayNum ~ throttleFlag.value:", throttleFlag.value)
  await API.wait(2)
  throttleFlag.value = true
    $('.bili-video-card.is-rcmd').each(function(){
      let hasChecked = $(this).attr("hasChecked")
      if(hasChecked) return
        const curSpan = $(this).find('.bili-video-card__stats--item > span')[0]
        let num = $(curSpan).text()
        // if(num.includes('亿')) return  $(this)[0].style.border = '3px solid yellow'
        // if(Number(num) > limitNum.value) $(this)[0].style.border = '5px solid #f800ff'
        // console.log("🚀 ~ $ ~ limitNum.value:", limitNum.value)
        // if(Number(num) > limitNum.value) $(this)[0].classList.add('addStyle')
        if(num.includes('亿')) $(this).addClass('addStyle')
        num = num.includes('万') ? num.replace('万', '') : '0'
        if(Number(num) > limitNum.value) $(this).addClass('addStyle')


        // 移除广告项目
        const adItem = $(this).find('.bili-video-card__image--link').attr('data-target-url')
        // console.log("🚀 ~ $ ~ adItem:", adItem) 正常长度为43
        adItem && adItem.length > 50 && $(this).attr('style', 'display: none')

      $(this).attr("hasChecked",true)

    })
    throttleFlag.value = false
    
}

const computeScroll = () =>{
  document.addEventListener("scroll", (e) => {
    // console.log("🚀 ~ document.addEventListener ~ e:", e)
    const clientHeight = e.target.body.clientHeight
      const scrollHeight = e.target.body.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      let bottomHeight = scrollHeight - clientHeight - scrollTop
      if(bottomHeight < 800) {
          tagPlayNum()
        }
  })
}
const chooseAddStyle =() => {
  tagPlayNum()

  computeScroll()
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
    // 首页列表  高亮 播放数多的  项目
    isHomepage.value && chooseAddStyle()
    // console.log("🚀 ~ onMounted ~ chrome:", chrome)

    
})


</script>
<style  lang='scss' scoped>
.bilibili_container{
  position: fixed;
    bottom: 30px;
    left: 20px;
    z-index: 66;
}

</style>


