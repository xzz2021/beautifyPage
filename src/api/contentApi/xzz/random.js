/*
 * @Date: 2022-11-05 15:01:57
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-09 15:16:04
 */

//随机生成布尔值
const randomBoolean = () => Math.random() >= 0.5

//给定范围生成一个随机整数
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

//给定范围生成一个随机浮点数
const randomFloat = (min, max) => Math.random() * (max - min) + min

//随机生成一个颜色值
const randomColor = () => `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;
const randomColor2 = () => `#${(~~(Math.random() * (1 << 24))).toString(16)}`

//给定长度生成一个随机字符串
const generateString = (length) => Array(length).fill('').map((v) => Math.random().toString(36).charAt(2)).join('')

//随机生成一个UUID  // 传入数字
const uuid = (a) => (a ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid))

//  失败    const uuid2 = (length) => Number(Math.random().toString().slice(3,length) + Date.now()).toString()

//随机获取数组的某一项
const getrandomItem = (arr) => arr[(Math.random() * arr.length) | 0]

//随机移除数组的某一项
const randomItem = (arr) => arr.splice((Math.random() * arr.length) | 0, 1)


