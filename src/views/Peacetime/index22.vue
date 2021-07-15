<template>
  <div class="overview_page">
    <CommonHeader :title="'甘肃省联动指挥领导驾驶舱（平时）'"></CommonHeader>
    <div class="overview_page_content">
      <div class="left">
        <Left></Left>
        <questionDesc class="question_desc"></questionDesc>
      </div>
      <div class="center">
        <mapBlock :list="mapData"></mapBlock>
      </div>
      <div class="right">
        <MakerDesc @filterMap="filterMapFun" class="maker_desc"></MakerDesc>
        <Right></Right>
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
      mapData: mapData
    }
  },
  methods: {
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
  cursor: pointer;
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

  .overview_page_content {
    width: 100%;
    height: auto;
    padding: 30px 0 20px 0;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
  }

  .left {
    z-index: 10;
    display: flex;
    // flex: 0 0 1200px; //不放大 不缩小 固定宽
    width: 2400px;
    height: 975px;
    padding: 0;
    position: relative;
    transition: width 10s;
    -webkit-transition: width 12s; /* Safari */
    // border:1px solid red;
  }
    .maker_desc {
      width: 137px;
      display: flex;
      flex-direction: column;
      margin-top: 41%;
    }
  .question_desc {
    // position: absolute;
    width: 365px;
    padding-left: 70px;
    display: flex;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
    // top: 100px;
    // left: 100px;
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
    width: 2400px;
    height: fit-content;
    z-index: 1;
    // margin-top: 70px;
    justify-content: flex-end;
    // margin-right: 100px;
    // margin-left: 50px;
    // border:1px solid red;
  }
  .my_tab_row {
    width: 200px;
    margin: 0 auto;
  }
  .footer {
    width: 100%;
    height: 100px;
    // position: absolute;
    // bottom: 20px;
    // left: 0px;
  }
}
.maker_wrap {
  position: absolute;
  top: 440px;
  right: 2%;
  width: fit-content;
}
</style>
