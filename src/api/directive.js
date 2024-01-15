import { ElMessage } from 'element-plus'

export const copy = (el, binding) =>{
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