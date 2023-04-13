/*
 * @Date: 2022-11-02 08:33:57
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-03 08:53:00
 */


// 本页定义->>布尔值<<-相关封装方法     // 各种数据类型的布尔值判断

// 是否为数组且不为空
const   isArrEmpty = (arr) => Array.isArray(arr) && !arr.length



//校验数据时间戳对比是否过期

const isExpired = (timeStamp,minutes) => {
    return Date.now() - timeStamp > minutes * 60000 ?  false : true
}

//检验页面是否滚动到了底部
const isAtBottom = () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight;

// 检验一个函数是否为异步async函数
const isAsyncFunction = (v) => Object.prototype.toString.call(v) === '[object AsyncFunction]';

//检验一个平面数组是否有重复值
const hasDuplicateValues = (arr) => new Set(arr).size !== arr.length

export default {isExpired}
