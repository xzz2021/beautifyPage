/*
 * @Date: 2022-11-03 08:24:20
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-10 10:25:02
 */

// 本页定义->>DOM操作<<-相关封装方法




//获取选中文本
const getSelectedText = () => window.getSelection().toString();

//隐藏元素
const hide = (ele) => (ele.style.display = 'none');
const hide2 = (ele) => (ele.style.visibility = 'hidden');
const hide3 = (ele) => (ele.hidden = true)


//刷新当前页
const reload = () => location.reload()


//跳转至另一页面
const goTo = (url) => (location.href = url)


//替换DOM节点
const replace = (ele, newEle) => ele.parentNode.replaceChild(newEle, ele)




//用于弹窗背景穿透阻止body滚动方案,务必关联执行
const preventBodyScroll = () => document.body.style.overflow = 'hidden'
const permitBodyScroll = () => document.body.style.removeProperty('overflow')

//用于弹窗背景穿透阻止指定元素滚动方案,务必关联执行
const preventScroll = (dom) => {jq(dom).css({ "overflow-x":"hidden", "overflow-y":"hidden" })}
const permitScroll = (dom) => {jq(dom).css({ "overflow-x":"auto", "overflow-y":"auto" })}


const scroll = {
   goToTop: async () => window.scrollTo(0, 0),
   goToBottom: async () =>  window.scrollTo({top: document.body.scrollHeight}),
   goToBottomEase: async () =>  window.scrollTo({top: document.body.scrollHeight, behavior:'smooth'}),
   stepEase: async (span,time) => {   //步进累加,可重复执行
        for(let i=0; i<time; i++){
            await API.wait(0.3) //必须加延迟,否则极短时间内的连续触发只会执行一次
            window.scrollBy({top: span, behavior:'smooth' })
        }
   },
   directEase: async (span) => {   //平滑直达滚动,每一次都会回滚重载,重复执行会停留在原地
        window.scrollTo({top: span, behavior:'smooth' })
    }
}

// 获取选中文本
const selectedText = window.getSelection().toString()


//添加,移除,切换类名
   /*  ele.classList.add('class-name')
    ele.classList.remove('class-name')
    ele.classList.toggle('class-name') */

// 包裹一个指定元素
// ele.parentNode.insertBefore(wrapper, ele);
// wrapper.appendChild(ele);

// 只移除包裹元素
/* const parent = ele.parentNode
while (ele.firstChild) { parent.insertBefore(ele.firstChild, ele) }
parent.removeChild(ele) */

// https://html.dev/export-a-table-to-csv/
// https://html.dev/create-an-image-comparison-slider/
// 滚动到指定元素
// ele.scrollIntoView({ behavior: 'smooth' })




//限定输入框字符且保留光标位置
// const ele = document.getElementById('input')
// let currentValue = ele.value || ''
// const selection = {}
// ele.addEventListener('keydown', function (e) {
//     const target = e.target
//     selection = {
//         selectionStart: target.selectionStart,
//         selectionEnd: target.selectionEnd,
//     }
// })
// ele.addEventListener('input', function (e) {
//     const target = e.target
//     if (/^[0-9\s]*$/.test(target.value)) {
//         currentValue = target.value
//     } else {
//         // Users enter the not supported characters
//         // Restore the value and selection
//         target.value = currentValue
//         target.setSelectionRange(selection.selectionStart, selection.selectionEnd)
//     }
// })






















export default {scroll}






