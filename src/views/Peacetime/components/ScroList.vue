<template>
  <div>
    <div class="list_table_title">
      <div class="ind" style="padding-left:10px;">序号</div>
      <div class="name">应急事件</div>
      <div class="area">区域</div>
      <div class="time">时间</div>
    </div>
      <div
          class="water_use_row"
          :class="item.grade === 'Ⅰ级' ? 'warn_grade' : ''"
          style="margin-top:0;z-index:10;"
          v-for="(item, ind) in listData.slice(0,1)"
          :key="ind"
        >
          <div class="grade_img"></div>
          <div class="ind">{{ ind +1 }}</div>
          <div class="name">{{ item.name }}</div>
          <div class="type" v-show="false">{{ item.type }}</div>
          <div class="area">{{ item.area }}</div>
          <div class="time">{{ formatTime(item.time,'MM-DD HH:mm') }}</div>
        </div>
    <div class="scroll_list_wrap" :style="{ height:listHeight }">
      <vue-seamless-scroll :data="listData" class="seamless-warp">
        <div
          class="water_use_row"
          :class="item.grade === 'Ⅰ级' ? 'warn_grade' : ''"
          v-for="(item, ind) in listData.slice(1)"
          :key="ind"
        >
          <div class="grade_img"></div>
          <div class="ind">{{ ind +2 }}</div>
          <div class="name">{{ item.name }}</div>
          <div class="type" v-show="false">{{ item.type }}</div>
          <div class="area">{{ item.area }}</div>
          <div class="time">{{ formatTime(item.time,'MM-DD HH:mm') }}</div>
        </div>
      </vue-seamless-scroll>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  components: {},
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    listHeight: {
      type:String,
      default: '400px'
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
  .list_table_title {
    height: 40px;
    display: flex;
    justify-content: space-around;
    z-index: 1000;
    opacity: 1;
    background: #081430;
    line-height:40px;
    font-size: 16px;
    // margin-top:-16px;
  }
.scroll_list_wrap {
  // height: 300px;
  overflow: hidden;
  font-size: 18px;
}
.water_use_row {
  display: flex;
  justify-content: space-around;
  padding: 10px 10px;
  margin-top: 8px;
  background-color: rgba(59, 163, 235, 0.1);
  font-size: 18px;
  position:relative;
  /* cursor: pointer; */
}
.warn_grade {
  width: fit-content;
  height: fit-content;
  color: #d3465a;
  background: linear-gradient(to right, rgba(225,0,25,0.3) 0%,rgba(220,109,124,0.3) 100%) !important;
  // background: linear-gradient(to right, raba(225,0,25,0.3) 0%,rgba(220,109,124,0.3) 100%) !important;
}
.warn_grade .grade_img{
  width:40px;
  height: 40px;
  position: absolute;
  left: 6px;
  background-image: url('../../../assets/peacetime/grade_1.png') !important;
  background-repeat: no-repeat;
}
.ind{
  width:60px;
  text-align: center;
  margin-left: 10px;
  width:50px;
  text-align: left;
  margin-left: 24px;
}
.name{
  width:230px;
  width:250px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  margin:0px 2px;
  text-align: center;
  text-align: left;
}
.area{
  width: 100px;
  text-align: center;
  width: 90px;
  text-align: left;
}
.time{
  width:120px;
  text-align: center;
  text-align: left;
}
</style>