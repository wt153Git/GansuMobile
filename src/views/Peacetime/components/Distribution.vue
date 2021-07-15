<template>
  <div class="distribution_wrap">
    <vue-seamless-scroll :data="fbData" class="seamless-warp">
      <div class="water_use_row" v-for="item in fbData" :key="item.name">
        <div class="name">{{ item.name }}</div>
        <BarProcess :val="Number(item.value)" :sum="maxData"></BarProcess>
        <div class="value">{{ item.value }} 处</div>
      </div>
    </vue-seamless-scroll>
  </div>
</template>
<script>
import BarProcess from '@/components/BarProcess'
import _ from 'lodash'
export default {
  components: {
    BarProcess
  },
  props: {
    fbData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    maxData() {
      let arr = []
      this.fbData.forEach(item => {
        arr.push(Number(item.value))
      })
      return _.max(arr)
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.distribution_wrap {
  height: 240px;
  overflow: hidden;
}

.water_use_row {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #3ba3eb;
  border-bottom: 1px solid #3ba3eb;
  padding: 10px 10px;
  margin-top: 6px;
  background: rgba(59, 163, 235, 0.1);
  // cursor: pointer;
  &:first-child {
    margin-top: 0px;
  }
  .name,
  .value {
    min-width: 70px;
    font-size: 12px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    color: #fff;
  }
  .value {
    min-width: 130px;
    text-align: right;
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
