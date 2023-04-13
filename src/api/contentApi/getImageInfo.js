/*
 * @Date: 2022-11-14 08:57:07
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-14 09:02:21
 */
// 计算图片宽高size


const getImageInfo = function (url) {
    return new Promise(function (resolve, reject) {
        const image = document.createElement('img');
        image.addEventListener('load', function (e) {
            resolve({
                width: e.target.width,
                height: e.target.height,
            });
        });

        image.addEventListener('error', function () {
            reject();
        });

        image.src = url;
    });
};




// const calculateSize = function (url) {
//     return new Promise(function (resolve, reject) {
//         const image = document.createElement('img');
//         image.addEventListener('load', function (e) {
//             resolve({
//                 width: e.target.width,
//                 height: e.target.height,
//             });
//         });

//         image.addEventListener('error', function () {
//             reject();
//         });

//         image.src = url;
//     });
// };

// calculateSize('/path/to/image.png').then(function (data) {
//     const width = data.width;
//     const height = data.height;
// });