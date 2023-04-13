/*
 * @Date: 2022-10-05 09:17:58
 * @LastEditors: xzz
 * @LastEditTime: 2023-03-14 14:27:21
 */
const Storage = {

    set(obj){
        return new Promise( (resolve, reject) => {
        if(Object.prototype.toString.call(obj) !== '[object Object]' && JSON.stringify(obj) === '{}'){
            resolve('设定失败:参数必须是object且不能为空')
        }else{
            let tip = '77'
            let l = 0
            for(const key in obj) {
                l ++
                if(obj[key] == undefined) return tip = `${key}设定成功失败,值不能为undefined`
                chrome.storage.local.set({[key]: obj[key]}, ()=> {
                    tip = ` ${l}:${key}设定成功,值为${JSON.stringify(obj[key])}`
                    if(key == 'taskData') return 
                    console.log("🚀 chrome.storage.local.set ~ :", tip)
                })
            }
            resolve(tip)
        }
    })
    },

    get(strORarr){
        return new Promise((resolve, reject) => {
        if(strORarr.length < 1 || strORarr == '' || strORarr == ['']){
           resolve('获取失败:参数必须是字符串或者数组,且不能为空')
        }
            if(typeof strORarr == 'string'){
                chrome.storage.local.get([strORarr], (res)=> {
                    let r = res[strORarr] || ''
                        resolve(r)
                  })
            }else {
                let obj = {}
                for(const val of strORarr) {
                    chrome.storage.local.get([val], (res)=> {
                            obj[val] = res[val] || ''
                      })
                }
                resolve(obj)
            }
        })
    },
    remove(strORarr){
        if(strORarr.length > 0){
            chrome.storage.local.remove(strORarr)
        }else{
            console.log('移除失败:参数必须是字符串或者数组,且不能为空')
        }
    },
    clear(){
        chrome.storage.local.clear()
    }



}

export default {Storage}