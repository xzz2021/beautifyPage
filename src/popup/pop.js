/*
 * @Date: 2022-12-13 17:59:03
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-04 17:28:09
 */



import { createApp } from 'vue'
import popup from './app.vue'

const copy = (el, binding) =>{
    // el.addEventListener('mouseenter', function(){
    //   el.style.cursor = 'default'
    // })
    el.addEventListener("click", function(){
        if (el.innerText == '') return
        navigator.clipboard.writeText(el.innerText)
        ElMessage({
            message: ` '${el.innerText}' 已复制到剪切板`,
            type: 'success',
          })
        })
      }

createApp(popup).directive('copy', copy).mount('#pop')