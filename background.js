/*
 * @Date: 2023-03-27 11:36:17
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 16:32:28
 */


//---------------引入分文件的所有自定义api---------缺点---没有ts类型推导--
import { bgcApi as API } from './src/api/bgcApi/index'


const platformArr = [
   { platform: '知乎', name: 'zhihu', status: true },
   { platform: 'csdn', name: 'csdn', status: true },
   { platform: '掘金', name: 'juejin', status: true },
   { platform: '简书', name: 'jianshu', status: true },
   { platform: 'B站', name: 'bilibili', status: true },
 ]
 // API.Storage.set({platformArr})
 
 //  设定 所有 平台 的 初始  开启状态
 async function getPlatformStatus() {
   let openPlatformArr = await API.Storage.get('platformArr')
   //  等于空 说明是第一次使用   则初始化所有平台开启
   if(openPlatformArr == '') API.Storage.set({platformArr})
   // 当平台有更新，需比较平台数量与历史版本是否一致
   if(openPlatformArr.length !== platformArr.length) API.Storage.set({platformArr})
 }

 getPlatformStatus()
 
   if(DEBUG){   // 开发模式时为真   //   生产模式为假
      const { bgdListenMsg } = require('ws-reload-plugin')
       bgdListenMsg()
   }

   chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {
      if(message.type === 'myfetch') {
      (async () => {
        let res =  await API.myfetch(message.config.url, message.config)
        sendResponse(res)})()
         return true
    }
    if(message.type === 'clearCookies') {
      (async () => {
        // 先获取所有cookie
        chrome.cookies.getAll({domain: message.config.domain}, function(cookies) {
          for(var i=0; i<cookies.length;i++) {
            const protocol = cookies[i].secure ? 'https:' : 'http:';
              chrome.cookies.remove({url: `${protocol}//${cookies[i].domain}${cookies[i].path}`, name: cookies[i].name, storeId: cookies[i].storeId});
          }
      })
        sendResponse('测试清除cookies')})()
         return true
    }
  }

    )
