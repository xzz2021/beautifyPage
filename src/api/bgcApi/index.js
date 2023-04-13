/*
encryption code
original code:https://github.com/xzz2021/myfunction
keyword: auto import function from file
*/


const files = require.context('./', true, /\.js$/)

function importAllModule(_0x20f2a4){const _0x2d389c={};let _0x536206={};for(let _0x5bcc6e of _0x20f2a4['keys']()){_0x2d389c[_0x5bcc6e]=_0x20f2a4(_0x5bcc6e)['default'];}for(let _0x1bcf2e in _0x2d389c){_0x536206={..._0x536206,..._0x2d389c[_0x1bcf2e]};}return _0x536206;}


export let  bgcApi = importAllModule(files)