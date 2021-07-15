<template>
<div :class="['flex-space-between','common_title',title==='事故灾难列表'?'natural':'']" >
    <img src="~@/assets/peacetime/title_img.png" alt="">
  <div class="title_left">
    <div class="peace_title">
      <span class="title">{{title}}</span>
      <div class="title-bg"></div>
    </div>
    <div v-if="count" class="title_right">
    <span class="count">{{count}}</span>
    <span class="unit">{{unit}}</span>
  </div>
  </div>
  <!-- <div v-if="count" class="title_right">
    <div class="count">{{count}}</div>
    <span class="unit">{{unit}}</span>
  </div> -->
</div>
</template>
<script>
export default {
  props:{
    title:{
      type:String,
      default:''
    },
    count:{
      type:Number,
      default:0
    },
    unit:{
      type:String,
      default:'件'
    }
  },
  data(){
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.natural {
  margin-top: 20px;
}
.common_title{
  padding:0px 10px;
}
// .peace_title{
  // margin-bottom: 10px;
  // padding:10px 20px 10px 10px;
  img {
    width:50px;
    height: 50px;
    margin-top: 4px;
  }
  .title_left{
    width: 100%;
    // display: flex;
    // align-items: center;
    position: relative;
    
    .title{
      margin-left: 20px;
      font-size:36px;
      font-weight: bold;
      // 发光字体
      text-shadow: .2rem 0rem .5rem #4a81d4,-.2rem 0rem .5rem #4a81d4,0rem .2rem .5rem #4a81d4,0rem -.2rem .5rem #4a81d4;
      // background:url("~@/assets/peacetime/title_bg.png");
      // background-size: cover;
      // background-repeat: no-repeat;
      // 渐变字体
      // background-image:-webkit-linear-gradient(top,rgba(255,255,255,1),#4a81d4);
      // background-clip:text;
      // -webkit-text-fill-color:transparent;
    }
    .title-bg {
      height: 26px;
      background-image:url("~@/assets/peacetime/title_bg.png");
    background-size: contain;
    background-repeat: no-repeat;
    }
  }
  .title_right{
    // display: flex;
    // align-items: center;
    // margin-top: -36px;
    position: absolute;
    top: 0;
    right: 0;
    .count{
      font-size: 32px;
      font-weight: bold;
      text-shadow: .2rem 0rem .5rem #4a81d4,-.2rem 0rem .5rem #4a81d4,0rem .2rem .5rem #4a81d4,0rem -.2rem .5rem #4a81d4;
    }
    .unit{
      font-size:14px;
      // align-items: baseline;
      margin-top: 8px;
    }
  }
// }
</style>