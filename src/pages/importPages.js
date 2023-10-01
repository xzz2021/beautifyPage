/*
 * @Date: 2023-04-14 10:21:17
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 14:20:23
 */

//----------------------------------------------------------------
//方案一  手动导入
// import zhihu from './zhihu/index.vue'
// import csdn from './csdn/index.vue'
// import juejin from './juejin/index.vue'
// import google from './entery/app.vue'
// import jianshu from './jianshu/index.vue'
// import bilibili from './bilibili/index.vue'

// const platformObj = { zhihu, csdn, juejin, google, jianshu, bilibili }
// console.log("🚀 ~ file: importPages.js:23 ~ platformObj:", platformObj)
// export default platformObj
//----------------------------------------------------------------


//----------------------------------------------------------------
// 方案二  自动导入
 const importAll = (r) => {
    let cache = {}
    r.keys().forEach(key => cache[key] = r(key))
    return cache;
  }

const platformArr = importAll(require.context('./', true, /\index.vue$/))

// console.log("🚀 ~ file: importPages.js:22 ~ platformArr:", platformArr)

const componentsAll = {};
for (const key in platformArr) {
  const element = platformArr[key].default
  componentsAll[element.__file.match(/(?<=pages\/).*(?=\/)/)[0]] = element;
}

export default componentsAll

//----------------------------------------------------------------