<template>
  <div class="swicth_block">
    <div class="city_block" :style="{ 'justify-content': itemStyle }">
      <div
        class="city_item"
        @click="setCity(item)"
        :class="currentName === item ? 'actived' : ''"
        v-for="item in itemArr"
        :key="item"
      >
        {{ item }}
      </div>
    </div>
    <div class="switch_line"></div>
  </div>
</template>
<script>
import { getCity } from '@/utils'
import { getDataByCity } from '@/api/index'
export default {
  props: {
    type: {
      type: String,
      default: 'city'
    },
    itemStyle: {
      type: String,
      default: 'space-between'
    },
    itemArr: {
      type: Array,
      default: () => [
        '陕西省',
        '西安市',
        '铜川市',
        '宝鸡市',
        '咸阳市',
        '渭南市',
        '延安市',
        '汉中市',
        '榆林市',
        '安康市',
        '商洛市'
      ]
    }
  },
  data() {
    return {
      currentName: '',
      globalData: {}
    }
  },
  created() {
    this.currentName = this.itemArr[0]
  },
  watch: {
    currentName: {
      handler(val) {
        if (this.type === 'city') {
          this.getCityData(getCity(val))
        }
      },
      immediate: true
    }
  },
  methods: {
    setCity(item) {
      this.currentName = item
      this.$emit('switch', item)
      if (this.type === 'city') {
        this.getCityData(getCity(this.currentName))
      }
    },
    getCityData(city) {
      if (!city) {
        return
      }
      getDataByCity(city).then(res => {
        if (res.page && res.page.data) {
          this.globalData = JSON.parse(res.page.data)
          this.$emit('cityData', this.globalData)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.swicth_block {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  margin-top: 20px;
}
.city_block {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;

  .city_item {
    font-size: 14px;
    font-weight: 800;
    line-height: 3px;
    cursor: pointer;
    padding: 18px 16px;
    &.actived {
      background-image: linear-gradient(rgba(0, 0, 0, 0.1), #00f0ff);
    }
  }
}
.switch_line {
  width: 100%;
  height: 10px;
  background: url('../assets/overview/switcch_bg.png') no-repeat;
  background-size: 100% 100%;
}
</style>
