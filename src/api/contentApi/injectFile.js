/*
 * @Date: 2023-03-04 09:24:54
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-04 09:29:49
 */


//-----------通过inject渠道------注入js到任意页面----且共享浏览器window--------------

const  injectFile = () => {
    //----参考------https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions/9517879#9517879
        const s = document.createElement('script')
        s.src = chrome.runtime.getURL('js/inject.js')
        s.onload = function() {
            this.remove()
        };//--<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------此处分号不可去掉--------应该是立即执行函数必须以分号分隔------
        (document.head || document.documentElement).appendChild(s) // ------document.documentElement----指向html标签

}


export default { injectFile }