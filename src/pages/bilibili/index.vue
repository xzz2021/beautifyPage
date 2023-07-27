<!--
 * @Date: 2023-04-11 14:22:06
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 11:59:48
-->
<template>

<!-- <div class="test">
    <el-button type="primary" @click="test">testtest</el-button>
</div> -->
</template>

<script setup>

const autoHD = async () => {

    // var len = localStorage.length;  // 获取长度
    // console.log(len) // 输出5
    // var arr = new Array(); // 定义数据集
    // for(var i = 0; i < len; i++) {
    //     // 获取key 索引从0开始
    //     var getKey = localStorage.key(i);
    //     // 获取key对应的值
    //     var getVal = localStorage.getItem(getKey);
    //     // 放进数组
    //     arr[i] = {
    //         'key': getKey,
    //         'val': getVal,
    //     }
    // }
    // console.log(arr);

        //只实现了点击
        await API.wait(1)  // 需要等待节点加载后获取
        const ll = $(".bpx-player-ctrl-quality-menu li:first-child")
        ll.click();
    // };
    return
    let  a = JSON.parse(localStorage.getItem("rateRecordTime_h5p_room"))
    console.log("🚀 ~ file: index.vue:17 ~ autoHD ~ a:", a)
    a.v = "v"
    localStorage.setItem("rateRecordTime_h5p_room", JSON.stringify(a))
}

const addStyle = () => {   //  动态注入style标签
    const style = ".login-tip { display: none; }"
    API.appendStyle(style)  
}

onMounted(async () => {
    addStyle()  // 动态添加样式
    // await autoHD()
    console.log("=====================");
})


</script>
<style  lang='scss' scoped>

</style>


