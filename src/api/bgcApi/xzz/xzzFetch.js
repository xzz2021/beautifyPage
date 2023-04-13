/*
 * @Date: 2022-12-02 15:52:56
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-02 16:42:02
 */
const xzzFetch = async (url,config) => {
    return new Promise(async (resolve, reject) => {
        let res = await chrome.API.myfetch(url, config)
        resolve(res)
    })

}

export default { xzzFetch }