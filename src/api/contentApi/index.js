/*
 * @Date: 2022-10-29 16:39:29
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-09 13:58:51
 */
/*
encryption code
original code:https://github.com/xzz2021/myfunction
keyword: auto import function from file
*/


const files = require.context('./', true, /\.js$/)


//11111111111111111111111111111111111111
// let cache = {}  //获得所有文件的Module(esmodule) ----文件路径为key,,导出内容为value
// files.keys().forEach(key => cache[key] = files(key)['default'])
// console.log("🚀 ~ file: index.js:16 ~ cache:", cache)

//222222222222222222222222222222222222
// let cache2 = {}  //获得所有文件的对象解构出的函数
// files.keys().forEach(key => cache2 ={ ...cache2, ...files(key)['default']})
// console.log("🚀 ~ file: index.js:17 ~ cache2:", cache2)

//对象引入33333333333333333333333333333333
function importAllModule(_0x20f2a4){const _0x2d389c={};let _0x536206={};for(let _0x5bcc6e of _0x20f2a4['keys']()){_0x2d389c[_0x5bcc6e]=_0x20f2a4(_0x5bcc6e)['default'];}for(let _0x1bcf2e in _0x2d389c){_0x536206={..._0x536206,..._0x2d389c[_0x1bcf2e]};}return _0x536206;}

export let  contentApi = importAllModule(files)
// console.log("🚀 ~ file: index.js:19 ~ contentApi:", contentApi)




// 文件引入
//  const autoImport = req => files.keys().map(req)
//  autoImport(files)