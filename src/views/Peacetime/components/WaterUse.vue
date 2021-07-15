<template>
  <div class="water_use_wrap">
    <UseBlock :tit="tit">
      <div
        class="flex-space-between slot_block"
        v-for="(item, ind) in arrdata"
        :key="ind + item.name"
      >
        <div>{{ item.name }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
    </UseBlock>
  </div>
</template>
<script>
import UseBlock from './UseBlock'
export default {
  components: { UseBlock },
  props: {
    tit: {
      type: String,
      default: ''
    },
    arrdata: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.slot_block {
  padding: 0px 20px 0 40px;
  line-height: 45px;
  font-size: 14px;
  .value {
    color: rgba(0, 252, 255, 1);
    font-family: DIN Bold, DIN Bold-Bold;
    font-weight: 700;
    min-width: 62px;
    text-align: left;
  }
}
</style>
