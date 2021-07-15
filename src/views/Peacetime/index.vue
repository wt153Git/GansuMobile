<template>
  <div class="overview_page">
    <CommonHeader class="peace_header" :title="'usually'"></CommonHeader>
    <div class="overview_page_content">
      <div class="left">
        <Left></Left>
        <questionDesc class="question_desc"></questionDesc>
      </div>
      <mapBlock :tomapData="tomapData" class="map_wrap" :list="mapData"></mapBlock>
      <div class="right">
        <MakerDesc @filterMap="filterMapFun" class="maker_desc"></MakerDesc>
        <Right @tomap="tomap"></Right>
      </div>
    </div>
    <div class="footer">
      <CommonFooter></CommonFooter>
    </div>
  </div>
</template>
<script>
import CommonFooter from '@/components/CommonFooter'
import CommonHeader from '@/components/CommonHeader'
import Right from './components/Right'
import Left from './components/Left.vue'
import mapBlock from './components/mapBlock'
import MakerDesc from './components/MakerDesc'
import questionDesc from './components/questionDesc'
import mapData from './components/mapData'
import _ from 'lodash'
export default {
  name: 'overView',
  components: {
    CommonFooter,
    CommonHeader,
    MakerDesc,
    Right,
    Left,
    questionDesc,
    mapBlock
  },
  data() {
    return {
      tomapData:null,
      mapData: mapData
    }
  },
  methods: {
    tomap(val){
      console.log(8888)
      this.tomapData = {
          lon: '105.505192',
          lat: '34.664643',
          index: 1, //事件类型，显示icon
          id: 70
      }
    },
    transferType(val) {
      switch (val) {
        case 'Ⅰ级':
          return 1
        case 'Ⅱ级':
          return 2
        case 'Ⅲ级':
          return 3
        case 'Ⅳ级':
          return 4
      }
    },
    filterMapFun(obj) {
      let arr = mapData.concat([])
      let type = this.transferType(obj.val)
      let ind = obj.ind
      // 点击同一个类型事件，第一次点击切换，第二次点击显示全部
      if (ind % 2 === 0) {
        this.mapData = _.filter(arr, function(o) {
          return o.index === type
        })
      } else {
        this.mapData = mapData
      }
    }
  }
}
</script>
<style lang="less" scoped>
.screen_btn {
  cursor: default;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  margin-left: 4px;
}

.overview_page {
  background: url('../../assets/peacetime/bg2.png') no-repeat;
  // background: url('../../assets/peacetime/bg.jpg') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;

  .overview_page_content {
    position: relative;
    width: 100%;
    // height: auto;
    height: calc(100%);
    // padding: 100px 50px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
  }
  .peace_header{
    position: absolute;
  }
  .map_wrap {
    width: 100%;
    height: 100%;
  }
  .left {
    z-index: 9;
    display: flex;
    // flex: 0 0 1200px; //不放大 不缩小 固定宽
    // width: 2400px;
    height: 100%;
    padding: 0;
    transition: width 10s;
    -webkit-transition: width 12s; /* Safari */
    position: absolute;
    left: 0px;
    top: 0px;
    padding-left: 100px;
    padding-top: 100px;
    background: url('../../assets/peacetime/bg_left.png') no-repeat;
    background-size: 100% 100%;
    // border:1px solid red;
  }
  .maker_desc {
    width: 360px;
    height: fit-content;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    margin-top: 650px;
    padding-left: 100px;
    // right: 1886px;
  }
  .question_desc {
    width: 365px;
    padding-left: 70px;
    margin-top: 55px;
    display: flex;
    flex-direction: column;
  }
  .center {
    display: flex;
    flex-direction: column;
    width: 100%;
    // height: calc(100% - 90px);
    height: 975px;
    position: relative;
    padding: 0px 40px;
  }

  .right {
    display: flex;
    flex-direction: row;
    // flex: 0 0 1200px; //不放大 不缩小 固定宽度
    // width: 2400px;
    height: 100%;
    z-index: 1;
    // margin-top: 70px;
    justify-content: flex-end;
    // margin-right: 100px;
    // margin-left: 50px;
    // border:1px solid red;
    position: absolute;
    right: 0px;
    top: 0px;
    padding-right: 100px;
    padding-top: 100px;
    background: url('../../assets/peacetime/bg_right.png') no-repeat;
    background-size: 100% 100%;
  }
  .my_tab_row {
    width: 200px;
    margin: 0 auto;
  }
  .footer {
    width: 100%;
    // height: 120px;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }
}
.maker_wrap {
  position: absolute;
  top: 440px;
  right: 2%;
  width: fit-content;
}
</style>
