/*
 * @Date: 2022-12-01 16:03:50
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-01-11 09:47:18
 */

// ☆☆☆☆☆☆学习用法☆☆☆☆☆☆
// https://www.jb51.net/article/213532.htm


//------------方式一--------canvas---生成base64URL----------
//---------------canvas其实还有toBlob方法可以直接生成流数据--------如果直接调用jszip也能生成下载文件-------------------
const imgToBase64 = async (url) => {
    return new Promise((resolve, reject) => {
            let Img = new Image()
            Img.src = url + '?v=' + Math.random();
            Img.setAttribute('crossOrigin', 'Anonymous');
            Img.onload = function () {
              let canvas = document.createElement('canvas'),
                width = Img.width,
                height = Img.height;
              canvas.width = width;
              canvas.height = height;
              canvas.getContext('2d').drawImage(Img, 0, 0, width, height);
            //   let dataURL = canvas.toDataURL(); // 默认为png格式
              let dataURL = canvas.toDataURL('image/jpeg');
              //需要去掉格式前缀
              let res = dataURL.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, '')
                resolve(res)
            //   resolve(dataURL)
            }
    })
}



//------------方法二------通过fetch获取blob流数据---FileReader生成base64URL--------------
const imgToBase64666 = (url) => {
  return new Promise((res, rej) => {
    fetch(url).then(res => res.blob()).then((response) => {
      var reader = new FileReader()
      reader.readAsDataURL(response)
      reader.onload = function (e) {
        let res = e.target.result.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, '')
        res(res)
      }
    })

  })
}

export default { imgToBase64, imgToBase64666 }


//根据url拿到dataURL,并且传递给回调函数============
//=========这种写法可以在完成第一层逻辑后将返回数据直接给新的回调函数======第二个自定义函数可以直接拿到res=======
//========(url, (res)=> {})====================
// const imgToBas64 = async (url, callback) => {{
//     return new Promise((resolve, reject) => {
//             let Img = new Image()
//             dataURL = '';
//             Img.src = url + '?v=' + Math.random();
//             Img.setAttribute('crossOrigin', 'Anonymous');
//             Img.onload = function () {
//               let canvas = document.createElement('canvas'),
//                 width = Img.width,
//                 height = Img.height;
//               canvas.width = width;
//               canvas.height = height;
//               canvas.getContext('2d').drawImage(Img, 0, 0, width, height);
//               dataURL = canvas.toDataURL('png');
//               return callback ? callback(dataURL) : null;
//             }
//     })
// }}