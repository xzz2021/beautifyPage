/*
 * @Date: 2022-12-06 17:13:35
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 16:48:49
 */
// 'use strict'默认启用
import { createApp } from 'vue'
import { createPinia } from 'pinia'


import './src/css/style'    //引入自定义的所有css入口文件

// //---------------引入所有API挂载到全局----------
import{ contentApi as API} from './src/api/contentApi/index'
window.API = API


//   ------批量-----引入----各个平台-----实例---------
import platformObj from './src/pages/importPages'


import { copy } from './src/api/directive'

  // 开发模式时  的  自动刷新
if(DEBUG){   // 开发模式时为真   //   生产模式为假
  const { createWsConnect } = require('ws-reload-plugin')
  createWsConnect({})
}

//   不可使用，chrome有安全限制，估计不允许运行时注入js
// if(DEBUG){ 
//   console.log("🚀 ~ file: content.js:34 ~ import===========================")
//   import('ws-reload-plugin').then(({createWsConnect}) => {
//     console.log("🚀 ~ file: content.js:34 ~ import ~ aa:", createWsConnect)
//   }
// )
// }


//----------------------

//全局自定义组件install插件方式批量引入
// import appXzz from './src/xzzComponents/index'



// let elementGlobalConfig = {  }
//------------vue实例-----挂载入口---------------------
function createEntry(myapp,id){
  const el = document.querySelector('body');
  if (el) {
      el.insertAdjacentHTML('afterbegin',`<div id="${id}"></div>`)
      const xzzapp = createApp(myapp)
      //element-plus 全局属性设置
      // xzzapp.config.globalProperties.$ELEMENT = {size: 'small'}
      const pinia = createPinia()
      // xzzapp.use(appXzz) // register your global components 
      // xzzapp.directive('copy', API.vCopy) // v-directives
      xzzapp.directive('copy', copy)
      xzzapp.provide('xzzmessage', 'hello')  // 直接写入全局可使用的变量  组件内使用inject('xzzmessage')接收
      xzzapp.use(pinia).mount(`#${id}`)
    }
}




async function startGenerate() {   //  决定是否生成页面进行挂载

    // 检查当前网页 区分平台
    let checkPlatform = location.host.match(/zhihu|csdn|juejin|jianshu|google|bilibili/)
    
    checkPlatform = checkPlatform ? checkPlatform[0] : ''
    //  检查当前平台开关是否开启
    const openPlatformArr = await API.Storage.get('platformArr') || []

    const checkSwitch = openPlatformArr.find(item => item.name == checkPlatform)?.status
    
    checkSwitch ? createEntry(platformObj[checkPlatform], `platform${checkPlatform}`) : console.log(`${checkPlatform}平台未加载,请排查!`)

  }


//-----------通过inject渠道------注入js到任意页面----且共享浏览器window--------------
API.injectFile()
//  上面注入需要先于vue实例生成,  这样注入就可以在mounted里执行

  startGenerate()



