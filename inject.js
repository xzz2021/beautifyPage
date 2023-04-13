


window.addEventListener('xzz', (params)=> {
    // console.log("🚀 ~ file: inject.js:26 ~ window.addEventListener ~ params:", params)
    try {
         /* 此处也可以直接传函数的执行体,以及形参,通过构造函数进行执行
         let fn = new Function('dd', "return dd")
         let res = fn('kjhibuu') */
         let res =  eval(params.detail.fn)
         // console.log("🚀 ~ file: inject.js:34 ~ window.addEventListener ~ res:", res)
         window.postMessage(res, "*")  //尽可能不使用通配符,明确指定来源窗口
         let targetOrigin = params.detail.currentHref
        window.postMessage(res, "*")

    } catch (error) {
    }
},false)
