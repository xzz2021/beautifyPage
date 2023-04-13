/*
 * @Date: 2022-10-31 08:40:13
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-10-31 13:51:34
 */

const rest = (time) => {
    return new Promise((resolve, reject) => {
        //console.log(`start rest for ${time} seconds now: `, API.ztime.ymdhms())
        setTimeout(() => {
            resolve()
            //console.log(`end rest for ${time} seconds now: `, API.ztime.ymdhms())
        }, time * 1000);
    });
}


export default {rest}
