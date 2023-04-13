/*
 * @Date: 2023-03-03 11:01:03
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-03 16:41:43
 */

//-------定义全平台的css层级z-index冲突------------
const repairCss = (val) => {
    let classArr = {
        jd:  [ '.jdm-toolbar-wrap','#v-video' ],
        tb: [ '.jdm-toolbar-wrap' ],
        1688: [ '.jdm-toolbar-wrap' ],
        pdd: [ '._3FiigGnU', '._3aQ41Hcr', '.ui-bubble-container', '.common-footer-module','._2_bR-vs3',
        '._3aQ41Hcr', '._1b7ZktxY' , '._3cEsXABE', '._18wA4l4W', '.pdd-go-to-app', '._3ybBK4VB', '._32alqPBh', '._2kr-tBKm' ],
    }

    let selectorStr = classArr[val].join(', ')
    setTimeout(() => {
        $(selectorStr).css("cssText", `z-index:22!important;`)
        setTimeout(() => {
            $(selectorStr).css("cssText", `z-index:22!important;`)
        }, 1000);
    }, 1000);
    
    // setTimeout(() => {
    //     $(selectorStr).css({'z-index': '22'} )
    //     setTimeout(() => {
    //         $(selectorStr).css({'z-index': '22'} )
    //     }, 1000);
    // }, 1000);
}

export default { repairCss }