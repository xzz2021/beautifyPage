<!--
 * @Date: 2023-04-13 16:23:34
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 16:28:26
-->
<template>
<div>功能设置00000</div>

<div class="demo-collapse">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="平台开关: 当你已有相应平台账号或会员时,可以选择关闭,避免冲突!" name="1">
        <div v-for="(item, index) in platformArr.self" :key="index">
            <el-switch @change="onChange" v-model="item.status"  :active-text="item.platform"  />
        </div>
      </el-collapse-item>
      <el-collapse-item title="其他配置" name="2">
        <div>test
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>

const activeName = ref('1')
let  platformArr = reactive({self: []})


const onChange = async (val) => {
    let newStatus = toRaw(platformArr.self)
    API.Storage.set({platformArr: newStatus})
}

onMounted(async() => {
  platformArr.self = await API.Storage.get('platformArr') || []
})

</script>
<style  lang='scss' scoped>


</style>