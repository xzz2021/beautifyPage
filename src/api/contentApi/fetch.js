

const qs = require('qs')

    //对Fetch的封装：让其支持params/请求主体的格式化/请求地址的公共前缀 

let baseURL = 'http://demo.yourwebsite.com/',
inital = {
    method: 'POST',  // 如果config不传method默认为POST
    params: null,
    body: null,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    // headers: { 'Content-Type': 'application/json;charset=utf-8'}, //Content-Type 客户端告诉服务器实际发送的数据类型
	credentials: 'include', // include, *same-origin, omit
	// cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    redirect: 'follow',
    // mode: "no-cors",
    // responseType: 'JSON',
    referrerPolicy: 'no-referrer-when-downgrade' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

const isPlainObject = function isPlainObject(obj) {
let proto, Ctor;
if (!obj || typeof obj !== "object") return false;
proto = Object.getPrototypeOf(obj);
if (!proto) return true;
Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
return typeof Ctor === "function" && Ctor === Object;//构造函数是Object
};

// -----------------------------发送数据请求-------------------------------
const myfetch = (url, config) => {
    return  new Promise((resolve, reject) => {
// 合并配置项{不要去更改inital中的内容}
(config == null || typeof config !== "object") ? config = {}: null
if (config.headers && isPlainObject(config.headers)) {
    // 给HEADERS进行深度合并
    config.headers = Object.assign({}, inital.headers, config.headers);
}
let {
    method,
    params,
    body,
    headers,
    credentials,
    responseType,
    // cache,
    redirect,
    mode,
    referrerPolicy
} = Object.assign({}, inital, config);//合并config

// 处理URL{格式校验 & 公共前缀 & 拼接params中的信息到URL的末尾}
if (typeof url !== "string") throw new TypeError( ` ${url} is not an string! ` )
if (!/^http(s?):\/\//i.test(url)) url = baseURL + url //判断是不是以http或者https开头,如果不是,就用baseurl拼起来
if (params != null) {
    if (isPlainObject(params)) {
        params = qs.stringify(params)
    }
    url +=  `${url.includes('?')?'&':'?'}${params}` ;//拼接
}

// 处理请求主体的数据格式{根据headers中的Content-Type处理成为指定的格式}
if (body != null) {
    if (isPlainObject(body)) {
        let contentType = headers['Content-Type'] //默认为application/x-www-form-urlencoded
        if (contentType.includes('urlencoded')) body = qs.stringify(body);
        if (contentType.includes('json')) body = JSON.stringify(body);
    }
}

//配置认证的标准token
// let token = chrome.storage.local.get('token');
// if (token) headers['Authorization'] = "bearer " + token;


// 基于fetch请求数据
method = (method + '').toUpperCase();
responseType = (responseType + '').toUpperCase();
config = {
    method,
    credentials,
    // cache,
    headers,
    redirect,
    responseType,
    referrerPolicy,
    mode
};
  /^(POST|PUT|PATCH)$/i.test(method) ? config.body = body :  null;
//-----------------------配置代理url-------------------manifest.json的match配置对应的接口域名,则不需要代理服务器-----
//  let url2 = `http://xzz2022.top:666/${url}`
 fetch(url, config).then((response) => {
    // console.log('response: ', response);
    let { status, statusText, ok } = response;
    if(!ok){
        return '网络请求异常:1.接口地址错误2.后端接口问题3.请求的地址未在manifest进行允许跨域配置'}
    if (ok) {
        let result;
        switch (responseType) {
            case 'TEXT':
                result = response.text();
                break;
            case 'JSON':
                result = response.json();
                break;
            case 'BLOB':
                result = response.blob();
                break;
            case 'ARRAYBUFFER':
                result = response.arrayBuffer();
                break;
            case 'GBKHTML':
                result = response.arrayBuffer();
                break;
            default: 
                result = response.json(); //当未配置responseType时,,默认为后端返回的是json数据
            break;
        }
        return result;
    }else{
        return `ERROR CODE 异常, ${status},-----异常原因:${statusText}`
        // throw new TypeError('ERROR CODE 异常', status)
    }
}).then(res => {
    if(config.responseType == 'GBKHTML'){
        let decoder = new TextDecoder("gbk");
        let result = decoder.decode(res);
        resolve(result)
    }else{
        resolve(res)
    }

}).catch((reason) => {
    // if (reason && reason.code === 'STATUS ERROR') {
    //     // @1 状态码错误
    //     switch (reason.status) {
    //         case 400:
    //             // ...
    //             break;
    //         case 401:
    //             // ...
    //             break;
    //         case 404:
    //             // ...
    //             break;
    //     }
    // } else if (!navigator.onLine) {
    //     // @2 网络中断
    //     // ...
    // } else {
    //     // @3 请求被终止
    //     // ...
    // }



    reject(('网络接口请求异常-------具体原因是:',reason))
    //--------------走代理url后不存在浏览器安全策略拦截,但是会有请求异常直接报错的可能-------需要优化上面整体的reject的逻辑--------------

})
    })}

export default {myfetch}