<template>
  <div class="icon_desc_wrap">
    <div class="icon_desc_row" :key="item.name" v-for="item in imgArr">
      <div class="row_num">
        <div class="count">{{item.num}}</div>
        <div class="unit">件 / </div>
         <div class="count2">{{item.todo}}</div> <div class="unit">件未完成</div>
      </div>
      <div class="icon_name">{{ item.name }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgArr: [
        { num: 620, name: '今日事件数量',todo:200 },
        { num: 70, name: 'Ⅰ级事件' ,todo:50},
        { num: 60, name: 'Ⅱ级事件' ,todo:20},
        { num: 130, name: 'Ⅲ级事件' ,todo:10},
        { num: 360, name: 'Ⅳ级事件' ,todo:120}

      ]
    }
  }
}
</script>
<style lang="less" scoped>
.icon_desc_wrap {
  // background: url('../../../assets/peacetime/bg.jpg');
  .icon_desc_row {
    margin-bottom: 16px;
    .row_num{
      display: flex;
      .count{
        font-size: 40px;
        font-family: DIN, DIN-Bold;
        font-weight: 700;
        text-shadow: 0px 2px 3px 0px rgba(5,28,54,0.26); 
        background-image:-webkit-linear-gradient(bottom,rgba(255,110,2),rgba(255, 255, 0));
        background-clip:text;
        -webkit-text-fill-color:transparent;
      }
      .count2{
        font-size: 20px;
        margin-top:24px;
        margin-left: 2px;
        color:rgba(181 ,181, 181);
      }
      .unit{
        color:rgba(181 ,181, 181);
        line-height: 60px;
        font-size: 18px;
        margin-top: 8px;
        margin-left: 2px;
      }
    }
    .icon_name{
      font-size: 20px;
      color:rgba(181 ,181, 181);
      margin-top: -10px;
    }
    &:nth-child(1){
      .count{
        font-size: 65px;
        background: linear-gradient(0deg,#4a81d4 0%);
        // 0rem .2rem .5rem #4a81d4,0rem -.2rem .5rem #4a81d4
        // text-shadow: .2rem 0rem .5rem #fff,-.2rem 0rem .5rem #4a81d4;
        text-shadow: 2px 2px 3px 0px rgba(191, 203, 216, 0.26); 
         background-image:-webkit-linear-gradient(bottom,rgba(74, 129 ,212), rgba(255, 255, 255));
        background-clip:text;
        -webkit-text-fill-color:transparent;
      }
      .count2{
        font-size: 32px;
        margin-top: 38px;
      }
      .unit{
        line-height: 80px;
        font-size: 18px;
        margin-top: 26px;
      }
    }
    &:nth-child(2){
      .count{
         background-image:-webkit-linear-gradient(bottom,rgba(252, 112 ,42),rgba(158, 7, 7));
        background-clip:text;
        -webkit-text-fill-color:transparent;
      }
    }
      &:nth-child(4){
      .count{
        background-image:-webkit-linear-gradient(bottom,rgb(222 ,255, 0),rgba(239, 255, 132));
        background-clip:text;
        -webkit-text-fill-color:transparent;
      }
    }
      &:nth-child(5){
        .count{
         background-image:-webkit-linear-gradient(top,rgba(2,240,255),rgba(0 ,25, 174));
        background-clip:text;
        -webkit-text-fill-color:transparent;
      }
    }
  }
  .icon_img {
    width: 26px;
    height: 31px;
    margin-right:10px;
  }
}
</style>
