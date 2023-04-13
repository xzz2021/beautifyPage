/*
 * @Date: 2022-11-03 08:47:46
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-14 09:04:43
 */


// 本页定义->>函数方法<<-相关封装方法



//箱子处理器,-------管道过滤函数
const boxHandler = (x) => ({ next: (f) => boxHandler(f(x)), done: (f) => f(x) });

//例如需要转换result
// const getPercentNumber = (str) =>
//     boxHandler(str)
//         .next((str) => str.replace(/\%/, ''))
//         .next((str) => parseFloat(str))
//         .done((res) => res * 0.01);

// getPercentNumber('53%'); // 0.53



//函数组合器,把任意个函数加入管道执行

const compose = (...fns) => (x) => fns.reduceRight((y, f) => f(y), x)

//函数组合器,把任意个函数加入管道且依次从左到右执行
const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);


//无论调用多少次,只会执行一次的一次性函数
const once = (fn) => ( (ran = false) => () => ran ? fn : ((ran = !ran), (fn = fn())) )()

// let n = 0;
// const incOnce = once(() => n++)
// incOnce(); // n = 1
// incOnce(); // n = 1


//将cookie转换成对象
const cookies = document.cookie .split(';') .map((item) => item.split('=')) .reduce((acc, [k, v]) => (acc[k.trim().replace('"', '')] = v) && acc, {});

//获取cookie指定键的值
const cookie = (name) => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();

//投骰子投机得到1-6
const throwdice = () => ~~(Math.random() * 6) + 1;


//将get请求的url携带参数转换成对象

const getUrlParams = (query) => Array.from(new URLSearchParams(query)).reduce((p, [k, v]) => Object.assign({}, p, { [k]: p[k] ? (Array.isArray(p[k]) ? p[k] : [p[k]]).concat(v) : v }), {});

//将JWT的token解密------可能是node环境???????????
const decode = (token) =>
    decodeURIComponent(
        atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
    );

//加密一个url
const encode = (url) => encodeURIComponent(url).replace(/!/g, '%21').replace(/~/g, '%7E').replace(/\*/g, '%2A').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%20/g, '+');


//生成唯一的自增id
const uid = (() => ((id = 0), () => id++))();
// uid(); // 0
// uid(); // 1
// uid(); // 2
// uid(); // 3



//获取任意的变量类型
const getTypeOf = (obj) => Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1];

// getTypeOf({}); // Object
// getTypeOf([]); // Array
// getTypeOf((a, b) => a + b); // Function
// getTypeOf(async () => {}); // AsyncFunction
// getTypeOf(document); // HTMLDocument


//按数组顺序执行promises函数,此处promises为多个promises函数组成的数组
const run = (promisesArr) => promisesArr.reduce((p, c) => p.then((rp) => c.then((rc) => [...rp, rc])), Promise.resolve([]));


//计算阶乘
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));


//任意个数字求和
const sum = (...args) => args.reduce((a, b) => a + b)


//任意个数字求积
const mul = (...args) => args.reduce((a, b) => a * b)

//计算2个数的最大公约数
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))

//字符串转数字
const toNumber = (str) => +str


//十进制数字转二进制
const decToBi = (num) => (num === 0 ? 0 : (num % 2) + 10 * decToBi(~~(num / 2)))

//将小数四舍五入保留指定位数,不传第2个参数则默认保留整数部分
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)

//将小数截取指定位数
const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed)




//未知场景
// const unary = (fn) => (arg) => fn(arg);

//未知场景
// const sum = (x, y) => x + y;
// const inc = partial(sum, 1);
// inc(9); // 10

// const partial =
// (fn, ...a) =>
// (...b) =>
//     fn(...a, ...b);


// 等待document加载好再执行函数
const ready = function (cb) {
    // Check if the `document` is loaded completely
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", function (e) {
          cb()
        })
      : cb()
  }