<!--
 * @Date: 2022-12-06 17:13:35
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 10:42:38
-->
<template>
<div class="test">
  
  <div>

   hello world!!!
  </div> 

  <!-- components目录下的子组件  直接使用文件名称 -->
  <!-- 且此目录下的组件会自动import引入   无需main文件以全局组件形式挂载-->
  <testDemo />
  <!-- 带子目录的组件需拼接目录名并驼峰形式拼接-->
  <testdirTestDemo />  
</div>


</template>

<script setup>



//注入函数到inject里,共享浏览器调试面板的顶层window
const test = async() => {
  function ff(){
    return  '98770'
  }
  let res =  await API.injectFn(ff)
  console.log("🚀 ~ file: app.vue:206 ~ test1 ~ res:", res)
}

onMounted(() => {
  console.log("🚀 ~ file:=========google=================")
  
  setTimeout(() => {
    test()
  }, 1000)
})


</script>

<style lang="scss" scoped>
.test{
  position: fixed;
  top: 30px;
  left: 930px;
  width: 200px;
  height: 200px;
  background-color: aqua;
  z-index: 2234454;
}

</style>