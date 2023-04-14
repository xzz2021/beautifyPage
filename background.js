/*
 * @Date: 2023-03-27 11:36:17
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-14 10:29:56
 */


//---------------引入分文件的所有自定义api-----------
import { bgcApi as API } from './src/api/bgcApi/index'


// autoreload   自动刷新
// import { bgdListenMsg } from 'ws-reload-plugin'
//    bgdListenMsg()




   if(DEBUG){   // 开发模式时为真   //   生产模式为假
      const { bgdListenMsg } = require('ws-reload-plugin')
       bgdListenMsg()
   }