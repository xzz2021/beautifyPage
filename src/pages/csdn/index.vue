<!--
 * @Date: 2023-04-11 14:22:06
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-13 10:07:38
-->
<template>

</template>

<script setup>




            const removeAD = () => {
                let removeArr = ['.programmer1Box', '#recommendAdBox', '.box-shadow.mb8' ]
                removeArr.map(item => { $(item).length != 0 && $(item).remove() })
            }


            const allowCopy =()=>{
                $('pre').map(function(){   //  解除复制
                    $(this).attr('style',"user-select: auto;")
                    $('code').attr('style',"user-select: auto;")
                    // $('code').setAttribute("onclick","mdcp.copyCode(event)")
                    // $('.hljs-button').setAttribute("onclick","mdcp.copyCode(event)").setAttribute("data-title","复制");
                    $('.hljs-button').attr("data-title","复制")
                })
 
            }
            const quanwen =() =>{
                var hide = commonFunction.Commonsetinterval([".hide-article-box.text-center"]);
                hide.then(function(hidenode){
                    hidenode.parentNode.removeChild(hidenode);
                    document.getElementById("article_content").style="height: *px; ";
                    commonFunction.Toast("解除阅读全文限制成功",500);
                })
            }

            const allowFulltext = () => {
                // $('.show-more-btn').length != 0 && $('.show-more-btn').click()

            }
            
            const directRedirect =()=>{
                let linknode = document.getElementById("article_content").querySelectorAll("a");
                linknode.forEach(function(item){
                    if(item.origin!= window.location.origin){
                        item.onclick =(event)=> {
                            if (event.stopPropagation) {
                                event.stopPropagation();
                            }
                            item.setAttribute("target", "_blank");
                        };
                        commonFunction.Toast("解除外链重定向限制成功",500);
                    }
                })
            }
            //     // 复制时保留原文格式，参考 https://greasyfork.org/en/scripts/390502-csdnremovecopyright/code
            //     Object.defineProperty(unsafeWindow, "articleType", {
            //         value: 0,
            //         writable: false,
            //         configurable: false
            //     })



onMounted(() => {
    removeAD()   //移除广告
    allowCopy() 
    allowFulltext()   //展开全文
})


</script>
<style  lang='scss' scoped>


</style>