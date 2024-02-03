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
        <div>是否开启:  <el-switch
    v-model="switchValue"
    class="ml-2"
    label="开启高亮"
    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
/></div>
        <div>指定播放量: 
        <el-input-number  v-model="limitNum" :precision="0" :step="1" :max="1000" size="small"/></div>

      </template>
    </el-popover>

</div>

</template>

<script setup>
import { computed, onBeforeMount, onBeforeUnmount, onUpdated } from 'vue';

 const isHomepage = ref(false)
 const limitNum = ref(30)
onBeforeMount(async () => {
    isHomepage.value = !(location.href.includes('video') || location.href.includes('list'))
    limitNum.value = await API.Storage.get('playNum') || 50
    console.log("🚀 ~ onBeforeMount ~ limitNum.value:", limitNum.value)
})

onUpdated(async ()=> {
  // await API.Storage.set({playNum: limitNum.value})
  console.log("🚀 ~ onBeforeUnmount ~ limitNum.value:", limitNum.value)
  debugger
})

// setInterval(async ()=> {
//   console.log("🚀 ~ onBeforeUnmount ~ limitNum.value:", limitNum.value)
//   // await API.Storage.set({playNum: limitNum.value})

// }, 2000)


const switchValue = ref(true)
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

// const addFullFn = () => {
//     document.addEventListener("DOMContentLoaded", function() {
//   const videoElement = document.getElementsByTagName("video");

//   videoElement.addEventListener("dblclick", function() {
//     if (videoElement.requestFullscreen) {
//       videoElement.requestFullscreen();
//     } else if (videoElement.mozRequestFullScreen) { // Firefox
//       videoElement.mozRequestFullScreen();
//     } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
//       videoElement.webkitRequestFullscreen();
//     } else if (videoElement.msRequestFullscreen) { // IE/Edge
//       videoElement.msRequestFullscreen();
//     }
//   });
// });
// }

// const autoFullscreen = async () => {
//     const checkFull = setInterval(() => {
//         //  此按钮只能手动触发
//         let fullBtn = $('.bpx-player-ctrl-btn.bpx-player-ctrl-full')
//         if(fullBtn.length == 1){
//             $('.bpx-player-ctrl-btn.bpx-player-ctrl-full').click()
//             clearInterval(checkFull)
//         }else{
//         }
//     }, 1000)

// }

// const autoFullscreen000 = async () => {
//     await API.wait(3)
//     const checkFull = setInterval(() => {
//         //  此按钮只能手动触发
//         let fullBtn = $('#bilibili-player .bpx-player-video-wrap video')
//         console.log("🚀 ~ file: index.vue:69 ~ checkFull ~ fullBtn:", fullBtn)
//         if(fullBtn.length == 1){
//             // fullBtn.click() //
//             clearInterval(checkFull)
//             $('#bilibili-player .bpx-player-container').attr('data-screen', 'full')

//             console.log("🚀 ~ file: index.vue:72 ~ checkFull ~ click:")
//         }else{

//         }
//     }, 1000)

// }


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
        }, 1000)
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
  }, 1000);

  const timer4Btn = setInterval(async () => {
    const trialBtn = document.querySelector('.bpx-player-toast-confirm-login');
    if (trialBtn) {
      clearInterval(timer4Btn);
      trialBtn.click()
    }
  }, 1000);
}

const throttleFlag = ref(false)
//  区分播放量
const tagPlayNum = async() => {
  // 先判断 是否开启了此功能
  if(!switchValue.value) return
  //  再判断是否 处于 节流状态
  if(throttleFlag.value) return
  throttleFlag.value = true
    $('.bili-video-card.is-rcmd').each(function(){
      let hasChecked = $(this).attr("hasChecked")
      if(hasChecked) return
      console.log("🚀 ~ $ ========================")
      $(this).attr("hasChecked",true)
        const curSpan = $(this).find('.bili-video-card__stats--item > span')[0]
        let num = $(curSpan).text()
        // 移除视频列表里的广告项目
        if(num.length == 0) return  $(this).attr('style', 'display: none')
        if(num.includes('亿')) return $(this).addClass('addStyle')
        num = num.includes('万') ? num.replace('万', '') : '0'
        if(Number(num) > limitNum.value) $(this).addClass('addStyle')
    })
    throttleFlag.value = false
    
}

// const computeScroll = () =>{
//   // 鼠标监听 滚动事件 会 导致 内存 极大 增加
//   //  所以其实只要判定滚动 视窗高度 的变化 执行逻辑就行
//   document.addEventListener("scroll", (e) => {
//     const clientHeight = e.target.body.clientHeight
//       const scrollHeight = e.target.body.scrollHeight  //  滚动视窗的总高度
//       console.log("🚀 ~ document.addEventListener ~ scrollHeight:", scrollHeight)
//       const scrollTop = document.documentElement.scrollTop
//       const bottomHeight = scrollHeight - clientHeight - scrollTop
//       console.log("🚀 ~ document.addEventListener ~ bottomHeight:", bottomHeight)
//       if(bottomHeight >  800 && bottomHeight < 1000)  {
//           tagPlayNum()
//         }
//   })
// }

const checkLimit = async() => {
  const limitLoginBtn = $('.footer-unlogin-guide')
  if(limitLoginBtn.length == 0) return
  // 如果 此div存在 则 需要清除cookies  并刷新页面
   await API.sendMessage({type: 'clearCookies', config:{ domain: 'bilibili.com'}})
  window.location.reload()
}

const rawScrollHeight = ref(0)
const addOnScrollEvent = () => {
  // 鼠标监听 滚动事件 会 导致 内存 极大 增加
  //  =========所以最好改成定时事件
  setInterval(() => {
    const scrollHeight = document.body.scrollHeight //  滚动视窗的总高度
      if(scrollHeight != rawScrollHeight.value ){
        tagPlayNum()
        rawScrollHeight.value = scrollHeight
      }
      //  此处还需要监听频繁 请求 限流 , 如果限流需要清除cookies 否则不会加载 新的 列表
      checkLimit()
  }, 1500)
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
    isHomepage.value && addOnScrollEvent()
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


