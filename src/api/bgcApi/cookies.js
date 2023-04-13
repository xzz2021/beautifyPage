const Cookies = {
    set(name,value,{ maxAge, domain} ={}){
        //传入的值可能是中文,故需要编码
        let CookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
        if(typeof maxAge === 'number'){
            cookieText += `; max-age=${maxAge}`
        }
        if(domain){
            cookieText += `; domain=${domain}`
        }

        document.cookie = cookieText
    },

    get(name){
       name =  `${encodeURIComponent(name)}`
       //将原生cookie拆分转换成数组
       const myCookies = document.cookie.split(';')
       //遍历数组每一项并再次拆分,对比解构后的键值对
       for(const item of myCookies) {
        const [cookieName, cookieValue] = item.split('=')
        if(cookieName === name){
            // 返回解码之后的值
            return decodeURIComponent(cookieValue)
        }
        //没有则返回任意自定义值
        return
       }
    },

    remove(name,{domain} = {}){
        this.set(name,'',{domain,maxAge: -1})
    }



}

export default {Cookies}