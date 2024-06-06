/*
 * @Date: 2023-03-27 11:36:17
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-14 17:08:10
 */

import{ contentApi as API} from './src/api/contentApi/index'

//  eval 函数的是否允许执行  取决于  站点的 限制

window.addEventListener('xzz', (params)=> {
    // console.log("🚀 ~ file: inject.js:26 ~ window.addEventListener ~ params:", params)
    try {
         //  此处也可以直接传函数的执行体,以及形参,通过构造函数进行执行
        //  let fn = new Function('dd', "return dd")
        //  console.log("🚀 ~ file: inject.js:14 ~ window.addEventListener ~ fn:", fn)
        //  let res = fn('kjhibuu') 
         let res =  eval(params.detail.fn)
        //  console.log("🚀 ~ file: inject.js:34 ~ window.addEventListener ~ res:", res)
        //  window.postMessage(res, "*")  //尽可能不使用通配符,明确指定来源窗口
         let targetOrigin = params.detail.currentHref
        window.postMessage(res, targetOrigin)

    } catch (error) {
    console.error("🚀 ~ file: inject.js:22 ~ window.addEventListener ~ error:", error)
    }
},false)



const injectForBilibili = async () => {
//  b站覆写setTimeout
const originSetTimeout = window.setTimeout;
  window.setTimeout = function(func, delay) {
    if (delay === 4e3) delay = 4e8;
    if (delay === 3e4) delay = 10e10;
    return originSetTimeout.call(this, func, delay);
    }

  const originSetItem = window.localStorage.setItem;
  window.localStorage.setItem = function(key, value) {
    if (key === "bpx_player_profile") {
      const profile = JSON.parse(value)
      // 默认关闭弹幕
      // const dmStatus = profile.dmSetting.dmSwitch
      // dmStatus && (profile.dmSetting.dmSwitch = false)
      // profile.lastView = 0
      profile.lastView = Date.now() + 864e10
      // 新增属性变更  解除b站试看一次限制
      profile.lastUnlogintrialView = Date.now() + 864e10;
      profile.media.quality = '80';
      // profile.media.autoplay = false;
      value = JSON.stringify(profile);
    }
    originSetItem.call(this,key,value)
  }
}

const wait = async (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

const autoFullscreen = async () => {
  await wait(3)
  const checkFull = setInterval(() => {
      //  此按钮只能手动触发
      let fullBtn = $('.bpx-player-ctrl-btn.bpx-player-ctrl-full')
      if(fullBtn.length == 1){
          // fullBtn.click() //
          clearInterval(checkFull)
          $('.bpx-player-ctrl-btn.bpx-player-ctrl-full').click()
      }else{

      }
  }, 1000)

}

const biliStatus = async () => {
  //  检查当前平台开关是否开启
  const openPlatformArr = await API.Storage.get('platformArr') || []
  const checkSwitch = openPlatformArr.find(item => item.name == "bilibili")?.status
  console.log("🚀 ~ checkSwitch:", checkSwitch)
  return checkSwitch
}
if(location.href.includes('bilibili.com/video') || location.href.includes('bilibili.com/list')) {
      
  injectForBilibili()
  // autoFullscreen()
}


