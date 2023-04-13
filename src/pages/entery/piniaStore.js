/*
 * @Date: 2022-09-15 11:21:04
 * @LastEditors: xzz
 * @LastEditTime: 2023-03-13 14:52:40
 */

import { defineStore } from 'pinia'

//------------此处可放置任意vue实例变量-------------------------
export const piniaStore = defineStore('selfInfo', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        count: 0,
        panelLocation: { lx: 120, ly: 80 },
        userInfo: {
          userid: '',
          userToken: '',
          userPhone: '',
          timeStamp: ''
        },

      }
    },
    getters: {
      userPhone: (state) => {
        if(state.userInfo.userPhone == '') return ''
        let a = state.userInfo.userPhone + ''
        let b = a.substring(3,7)
        return  a.replace(b, '****')
      },
      userid: (state) => {
        return state.userInfo.userid
      }
    },
      actions: {  //支持异步
    },
   
  })



//--------拿到响应式数据
//   const store = useUsersStore();
// const { name, age, sex } = storeToRefs(store);
//------------ 重置state-----------------
// store.$reset();
//-----------批量更改数据---------------
//store.$patch({
//   name: "张三",
//   age: 100,
//   sex: "女",
// });
//-----------------------------------

// export default { piniaStore, userStore}