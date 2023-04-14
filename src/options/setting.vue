<!--
 * @Date: 2023-04-13 16:23:34
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-13 16:33:30
-->
<template>
<div>功能设置00000</div>

<div class="demo-collapse">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="平台开关" name="1">
        <div>
            <!-- <el-button type="primary">知乎</el-button> -->
            <el-switch v-model="platformvalue" size="large" active-text="知乎" inactive-text="知乎" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="其他配置" name="1">
        <div>test
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>


const platformvalue = ref(true)
const activeName = ref('1')


</script>
<style  lang='scss' scoped>


</style>