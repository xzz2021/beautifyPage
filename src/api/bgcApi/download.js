

//通过传入文件url调用进行下载,并且返回文件体积

const urlDownload = (obj) => {

    return new Promise((resolve, reject) => {
        //download传递的obj参数{body, filename, headers, method, saveAs, url}
        chrome.downloads.download(obj, () => {
            fetch(obj.url).then( (res)=> res.blob()).then((res)=>
                resolve(res.size)
            )
             })
    })
        
}


export default { urlDownload }