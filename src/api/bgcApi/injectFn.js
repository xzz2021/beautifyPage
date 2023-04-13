/*
 * @Date: 2023-02-23 11:09:11
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-23 15:46:26
 */

const tabQuery =   (requirement) => {
    return  new Promise((resolve, reject) => {
    chrome.tabs.query(requirement,([tab]) => { 
        resolve(tab.id)
      })
    })
}

const xzzEval = (codeString) => {
  let Fn = Function 
  return new Fn('return ' + codeString )()
}

//---------------传函数失败------------禁止eval--------------

const injectFn = (fn) => {
    // console.log("🚀 ~ file: injectFn.js:16 ~ injectFn ~ fn:", fn)
    // let fn2 = () => fn()
    return new Promise(async (resolve, reject) => {
        let tabId = await tabQuery({active: true})
        chrome.scripting.executeScript({
      target : {tabId},
      func : xzzEval(fn),
    })
    .then(injectionResults => {
    //   resolve(injectionResults);
      resolve(injectionResults[0].result || '没有返回数据');
        // console.log("🚀 ~ file: injectFn.js:14 ~ returnnewPromise ~ injectionResults:", injectionResults)
    })
})
}

export default { injectFn }