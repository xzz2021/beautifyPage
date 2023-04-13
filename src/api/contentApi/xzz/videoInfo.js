/*
 * @Date: 2022-11-21 08:44:17
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-21 09:50:44
 */
        
        


           

//         const getVideoInfo = function (url) {
//             return new Promise(function (resolve, reject) {
//     if (url) {
//         url.startsWith('http:') ? null : url = url.replace(/.*?\//, 'https:/')
//             const video = document.createElement('video')
//             video.src = url
//             video.oncanplay = function () {
//                 // console.log("本视频时长是:" + video.duration)
//                 // console.log("本视频相关信息:" + JSON.stringify(video) )
//                 resolve(video.duration)
//             }
//             video.onerror = function() {
//                 resolve(0)
//               }
        
//     } else {
//         return 0
//     }
// })}



const getVideoSize = function (url) {
    return new Promise(function (resolve, reject) {
  var xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    if (this.status == 200) {
      // 获取视频文件大小
      let size = this.response.size
	    resolve(size<0? "未知大小": size<1024? size+"B": size<1024*1024?(size/1024).toFixed(1)+"KB" : (size/(1024*1024)).toFixed(2)+"MB")
    }
  };
  xhr.send();
})}

export default {getVideoSize}