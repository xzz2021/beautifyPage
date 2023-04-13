/*
 * @Date: 2022-11-05 15:12:27
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-07 09:01:24
 */



//字符串里所有单词首字母大写
const lowercaseFirst = (str) => `${str.charAt(0).toLowerCase()}${str.slice(1)}`

//所有字符串转大写
const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

//所有字符串转小写
const decapitalize = (str) => `${str.charAt(0).toLowerCase()}${str.slice(1)}`

//计算字符串长度
const countWords = (str) => str.trim().split(/\s+/).length

// 计算字符串里某个字符出现次数
const countOccurrences = (str, char) => [...str].reduce((a, v) => (v === char ? a + 1 : a), 0)

//字符串移除所有空格
const removeSpaces = (str) => str.replace(/\s/g, '')

//重复N次字符串
const repeat = (str, numberOfTimes) => str.repeat(numberOfTimes)

//裁剪字符串的指定字符
const trim = (str, char) => str.split(char).filter(Boolean).join()

//指定下标处截断字符串,但只保留完整单词(不完整时去除)
const truncate = (str, max, suffix) => (str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`)