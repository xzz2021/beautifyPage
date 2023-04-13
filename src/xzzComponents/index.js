/*
 * @Date: 2023-03-10 16:23:43
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-10 16:15:50
 */
//定义批量全局自定义组件挂载入口
//这样可以达到在  没有自动引入组件插件 的情况下, 也能随处使用已定义的组件,且可以按需导入

import xzzTest from "./xzztest";
import xzzTest2 from "./xzztest2";

const components = [
    xzzTest,
    xzzTest2,
]



export default {
    install(app){
        components.map(item => { app.use(item) })
    }
}



// MyPlugin.install = function (Vue, options) {
//     // 1. 添加全局方法或属性
//     Vue.myGlobalMethod = function () {
//       // 逻辑...
//     }
  
//     // 2. 添加全局资源
//     Vue.directive('my-directive', {
//       bind (el, binding, vnode, oldVnode) {
//         // 逻辑...
//       }
//       ...
//     })
  
//     // 3. 注入组件选项
//     Vue.mixin({
//       created: function () {
//         // 逻辑...
//       }
//       ...
//     })
  
//     // 4. 添加实例方法
//     Vue.prototype.$myMethod = function (methodOptions) {
//       // 逻辑...
//     }
//   }