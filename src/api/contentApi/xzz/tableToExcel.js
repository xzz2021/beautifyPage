/*
 * @Date: 2022-12-02 17:46:05
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-03 17:39:15
 */
const tableToExcel = async (column, data, excelName) => {
        return new Promise(async (resolve, reject) => {
            //---33333333333333333-----☆☆☆☆☆☆------最重要的是定义好table及其格式-----reduce----☆☆☆☆☆☆---------
            //   <table>
            //     <thead> <tr> <td></td> <td></td> <td></td> </tr> </thead>
            //     <tbody> <tr> <td></td> <td></td> <td></td> </tr> </tbody>
            //   </table>
            //数组数据转换成完整的HTML标签的table数据
            function tableToExceldata  (column, data) {
                const typeMap = {
                    image: getImageHtml,
                    text: getTextHtml
                }
            
                let thead = column.reduce((result, item) => {
                    result += `<th style="height: 30px; background: #f8f8f8;">${item.title}</th>`
                    return result
                }, '')
            
                thead = `<thead><tr>${thead}</tr></thead>`
            
                let tbody = data.reduce((result, row) => {
                    const temp = column.reduce((tds, col) => {
                        tds += typeMap[col.type || 'text'](row[col.key], col)
                        return tds
                    }, '')
                    result += `<tr>${temp}</tr>`
                    return result
                }, '')
                tbody = `<tbody>${tbody}</tbody>`
            
                let  table = thead + tbody
                return table
            
                function getTextHtml(val) {
                    return `<td style="text-align: center">${val}</td>`
                }
            
                function getImageHtml(val, options) {
                    options = Object.assign({width: 160, height: 180}, options)
                    if(Array.isArray(val)){
                        let htmlData = ''
                        for(let i=0; i< val.length; i++){
                            htmlData += `<td style="width: ${options.width}px; height: ${options.height}px; text-align: center; vertical-align: middle"><img src="${val[i]}" width=${options.width} height=${options.height}></td>`
                        }
                        return htmlData
                    }
                    return `<td style="width: ${options.width}px; height: ${options.height}px; text-align: center; vertical-align: middle"><img src="${val}" width=${options.width} height=${options.height}></td>`
                }
            }
            //table 数据转换成base64格式的url
            function exceldataToURL(val){
                let table = val
                //Worksheet名 工作簿名称111111111
                let worksheet = 'Sheet1'
                let uri = 'data:application/vnd.ms-excel;base64,';
           
                //下载的表格模板数据 //-------原理table标签内数据自动转换------把table变量按规定格式传输即可------------
                // const template = `
                //   <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
                //       <head charset="UTF-8">
                //           <!--[if gte mso 9]>
                //           <xml>
                //               <x:ExcelWorkbook><x:ExcelWorksheets>
                //               <x:ExcelWorksheet>
                //                   <x:Name>${worksheet}</x:Name>
                //                   <x:WorksheetOptions>
                //                       <x:DisplayGridlines/></x:WorksheetOptions>
                //                   </x:ExcelWorksheet>
                //               </x:ExcelWorksheets></x:ExcelWorkbook>
                //           </xml>
                //           <![endif]-->
                //       </head>
                //       <body>
                //           <table>
                //               <tr>
                //                   <td>大一</td>    
                //                   <td>大二</td> 
                //                   <td>大三</td> 
                //               </tr>
                //               <tr>
                //                   <td colspan="2">大四</td>     
                //                   <td>大三344</td> 
                //               </tr>
                //           </table>
                //       </body>
                //   </html>`;
                //---------2222222222222----------------
                const template = `
                  <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
                      <head charset="UTF-8">
                          <!--[if gte mso 9]>
                          <xml>
                              <x:ExcelWorkbook><x:ExcelWorksheets>
                              <x:ExcelWorksheet>
                                  <x:Name>${worksheet}</x:Name>
                                  <x:WorksheetOptions>
                                      <x:DisplayGridlines/></x:WorksheetOptions>
                                  </x:ExcelWorksheet>
                              </x:ExcelWorksheets></x:ExcelWorkbook>
                          </xml>
                          <![endif]-->
                      </head>
                      <body>
                          <table>
                              ${table}
                          </table>
                      </body>
                  </html>`;
                //------4444444444--------------------
                //下载模板
                // window.location.href = uri + base64(template)  //此行可以直接激活下载
                let href = uri + base64(template)
                return href
                //输出base64编码
                function base64 (s) { return window.btoa(unescape(encodeURIComponent(s))) }
              }
            //生成a标签元素进行下载
            function urlDownload(url,excelName){
                // let blob = new Blob(['abbbb'], { type: "application/octet-stream" });
                // console.log('blob:size ', blob.size);
                //     let url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = excelName
                    a.click();
                    // setTimeout(() => {
                    //  URL.revokeObjectURL(url);
                    // }, 10000);
            }
            let tabledata = await tableToExceldata(column, data)
            let url2 = await exceldataToURL(tabledata)
            await urlDownload(url2,excelName)
            //返回数据size
            let size = (url2.length * (3/4)) - 2
            resolve(size)
        })

            //---------原理----所有数据都是buffer,通过API转化成blob流数据,流数据有不同编码,与文件后缀没有必要关联,
            //----------后缀只是系统为了方便识别从而使用相应软件打开解析而已
                    // let blob = new Blob(['abbbb'], { type: "application/octet-stream" });
                    // let url = URL.createObjectURL(blob);
                    // const a = document.createElement('a');
                    // a.href = url;
                    // a.download = 'abc.txt';
                    // a.click();
                    // setTimeout(() => {
                    //  URL.revokeObjectURL(url);
                    // }, 10000);
}

export default { tableToExcel }