/*
 * @Date: 2023-03-10 16:39:24
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-10 16:48:54
 */
//定义单个自定义组件挂载入口

import xzzTest2 from './index.vue'


// 此处导出是为了vue.use()可以按需单独导入
export default {
    install(app){
        app.component('xzzTest2', xzzTest2)
    }
}