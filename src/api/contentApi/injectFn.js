/*
 * @Date: 2023-02-24 08:44:55
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-02 17:26:36
 */


// 此处函数是用于与inject通信,从而获得浏览器真实window数据
const injectFn = (fn) => {
    return new Promise((resolve, reject) => {
        try {
            //传递的参数必须是以detail为键值的对象
            window.dispatchEvent(new CustomEvent("xzz", {detail: { fn:`(${fn})()`, currentHref: location.href }}));
            window.addEventListener('message', function xzz(e) {
                resolve(e.data)
            },{once: true})  // 这里的once参数等同于 window.removeEventListener('message',xzz)----自执行一次后会自动销毁监听--------
        } catch (error) {
            reject(error)
        }
    })
}


export default { injectFn }
