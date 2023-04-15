/*
 * @Date: 2023-03-27 11:36:17
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 16:32:28
 */


//---------------引入分文件的所有自定义api-----------
import { bgcApi as API } from './src/api/bgcApi/index'


// async function aa() {
//    await API.rest(5)
//    console.log("🚀 ~ file: background.js:13 ~ aa ~ aa:")
   
// }
// aa()
// autoreload   自动刷新
// import { bgdListenMsg } from 'ws-reload-plugin'
//    bgdListenMsg()

const platformArr = [
   { platform: '知乎', name: 'zhihu', status: true },
   { platform: 'csdn', name: 'csdn', status: true },
   { platform: '掘金', name: 'juejin', status: true },
   { platform: '简书', name: 'jianshu', status: true },
 ]
 // API.Storage.set({platformArr})
 
 //  设定 所有 平台 的 初始  开启状态
 async function getPlatformStatus() {
   let openPlatformArr = await API.Storage.get('platformArr')
   //  等于空 说明是第一次使用   则初始化所有平台开启
   if(openPlatformArr == '') API.Storage.set({platformArr})
 }

 getPlatformStatus()
 
   if(DEBUG){   // 开发模式时为真   //   生产模式为假
      const { bgdListenMsg } = require('ws-reload-plugin')
       bgdListenMsg()
   }