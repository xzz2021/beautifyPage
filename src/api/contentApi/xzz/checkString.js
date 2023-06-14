


const  hasChineseChar = function(str) {
    const reg = new RegExp("[\\u4E00-\\u9FFF]+", "g"); // 匹配所有中文字符的正则表达式
    return reg.test(str); // 使用正则表达式测试字符串，并返回测试结果
  }



  export default { hasChineseChar }
