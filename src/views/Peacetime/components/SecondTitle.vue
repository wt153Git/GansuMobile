<template>
<div class="second-title">
    <div class="title-name">
      <div class="title">{{title}}</div>
      <div class="title-bg"></div>
    </div>
  </div>
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
  .title-name{
    width: 100%;
    padding:0 50px;
    .title{
      opacity: 1;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #fefeff;
      line-height: 30px;
    }
    .title-bg {
      height: 4px;
      background-image:url("~@/assets/peacetime/second_title_bg.png");
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
    }
  }
</style>