/*
 * @Date: 2023-03-11 14:23:13
 * @LastEditors: xzz
 * @LastEditTime: 2023-03-17 15:27:04
 */
//定义单个自定义组件挂载入口

import xzzTest from './index.vue'




// 此处导出是为了vue.use()可以按需单独导入
export default {
    install(app){
        app.component('xzzTest', xzzTest)
    }
}