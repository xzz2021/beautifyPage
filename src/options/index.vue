<!--
 * @Date: 2023-03-20 17:54:08
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 15:27:14
-->
<template>
  <div class="container">
    <setting />
    <div class="description">@2023 by xzz 此项目为开源自用，<a href="https://github.com/xzz2021/beautifyPage" target="_blank">源代码</a> </div>
  </div>
</template>


<script setup>
import setting from './setting.vue'
</script>

<style lang="scss" scoped>
.container {
  min-width:300px; 
  min-height: 360px;
  // height: 200px;
  // text-align:center;
  display: flex;
    flex-direction: column;
    min-height: 96vh;
  .title{
    color: aquamarine;
  }
  .description{
    text-align: center;
    background: black;
    color: white;
    padding: 5px 0;
    margin-top: auto;
    // width: 100%;
    // margin: 0 5px;
    // position: fixed;
    // left: 0;
    // bottom: 5px;
    a{
      color: #3ff0ff;
      text-decoration-line: none;
    }
  }
}

</style>
