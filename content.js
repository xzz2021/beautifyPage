/*
 * @Date: 2022-12-06 17:13:35
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-13 08:46:30
 */
// 'use strict'默认启用
import { createApp } from 'vue'
import { createPinia } from 'pinia'
const pinia = createPinia()


// //---------------引入所有API挂载到全局----------
import{ contentApi as API} from './src/api/contentApi/index'
window.API = API

// {recconnectTime = 6, port = 7777, message={type: 'compiler'}}
const { createWsConnect } = require('ws-reload-plugin')
DEBUG ? createWsConnect({}) : ''
// //------------------------------------------------------

//引入自定义的所有css入口文件
import './src/css/style'
//----------------------

//---------import your app instances -------------可多个实例引入---------
import appjd from './src/pages/entery/app.vue'
import zhihu from './src/pages/zhihu/index.vue'
import csdn from './src/pages/csdn/index.vue'
// import app2 from './src/pages/jd/app.vue'

//全局自定义组件install插件方式批量引入
// import appXzz from './src/xzzComponents/index'

//------------vue实例-----挂载入口---------------------
function createEntry(myapp,id){
  const el = document.querySelector('body');
  if (el) {
    //  afterbegin 插入body内部最前面------afterend插入body外部后面
    // 必须嵌入body内部,不然面板无法固定
      el.insertAdjacentHTML('afterbegin',`<div id="${id}"></div>`)
      let xzzapp = createApp(myapp)
      // xzzapp.use(appXzz) // register your global components 
      // xzzapp.directive('copy', API.vCopy) // v-directives
      xzzapp.provide('xzzmessage', 'hello')  // 直接写入全局可使用的变量  组件内使用inject('xzzmessage')接收
      xzzapp.use(pinia).mount(`#${id}`)
    }
}


// create app instance
createEntry(zhihu, 'platformzhihu')
createEntry(csdn, 'platformcsdn')











//-----------通过inject渠道------注入js到任意页面----且共享浏览器window--------------
API.injectFile()

