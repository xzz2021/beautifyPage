<!--
 * @Date: 2023-03-20 17:54:08
 * @LastEditors: xzz
 * @LastEditTime: 2023-03-27 11:52:19
-->
<template>
  <!-- <div @click="history.back()">aaa</div> -->
  <div class="container">
    <el-text class="mx-1"  size="large">这是一个优化页面的插件,如果出现bug可以到qq群:<el-link type="success" v-copy>1078510132</el-link>反馈!</el-text>
    <el-text  size="large">如果你不想开启某些平台，可以点
      <!-- <a :href="`chrome-extension://${extensionId}/options.html`">这里</a> -->
      <el-link type="primary" :href="`chrome-extension://${extensionId}/options.html`">这里</el-link>
      进行设置！</el-text>

  </div>
</template>

<script setup>

const  backTo = ()=> {
  
}
//函数节流
const  throttle = (fn,delay) => {
	//初始时间点
	let prev = 0
	//返回一个函数出去  这个函数可以接收参数来执行你的下一步操作
	return function(){
		let _this = this
		let arg = arguments
		let now = new Date().getTime()
		if(now - prev > delay){
			//改变初试时间
			prev = now
			//执行你想要的操作
			fn.apply(_this,arg)
		}else{
			return
		}
	}
}

const extensionId = ref('')
onMounted(() => {
  extensionId.value = chrome.runtime?.id

  $(document).ready(function(){
  $('.hoverArea').hover(function(){
    $('.qrcodeBox').stop().toggle(500)  //  通过stop()节流防止频繁触发动画
  })
})

})

</script>

<style lang="scss" scoped>
.container {
  width:300px; 
  height: 360px;
  // position:relative;
  display: flex;
    justify-content: space-around;
    flex-direction: column;
  // background: rgba(255, 255, 255, 0.042);

  // text-align:center;
  .hoverArea{
    position: relative;
    font-size: 20px;
    // text-align: left;
    &:hover {
      cursor: pointer;
    }
  }
  .qrcodeBox{
    display: none;
    position: absolute;
    top: 35px;
    left: 50px;
    width: 200px;
    height: 200px;
    background-color: #42e629;
    z-index: 2;
    
  }
}
// .container::before{
//     content:'';
//     position:absolute;
//     top:0;
//     left:0;
//     z-index:-1;
//     background-image: (url('../css/bgc.jpg'));
//     filter:blur(3px);
//     background-size:cover;
//     width:300px; 
//   height: 360px;
//   }

</style>
