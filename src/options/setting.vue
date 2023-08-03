<!--
 * @Date: 2023-04-13 16:23:34
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 16:28:26
-->
<template>
<h2>功能设置</h2>

<div class="demo-collapse">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="各平台开关:" name="1">
        <div class="switchArea" v-for="(item, index) in platformArr.self" :key="index">
            <el-switch @change="onChange" v-model="item.status"  :active-text="item.platform"  />
        </div>
        <!-- <div> 
          <el-switch style="--el-switch-on-color: #07fb74; --el-switch-off-color: red" @change="onChangeWhole" v-model="mainSwitch"  active-text="总开关"  />
        </div> -->
      </el-collapse-item>
      <el-collapse-item title="其他配置" name="2">
        <div>test</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>

// let mainSwitch = ref(true)

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

.switchArea{
  // max-width: 600px;
}

</style>