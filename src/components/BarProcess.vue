<template>
  <div class="process_box">
    <!-- {{ pre }} -->
    <div class="pre_bar" :style="{ width: pre + '%' }"></div>
  </div>
</template>
<script>
export default {
  props: {
    sum: {
      type: Number,
      default: 111
    },
    val: {
      type: Number,
      default: 1
    }
  },
  computed: {
    pre() {
      //运算
      var checkResult = (Number(this.val) / Number(this.sum)) * 100
      //四舍五入 保留两位小数 打印到控制台
      return checkResult.toFixed(2)
    }
  }
}
</script>
<style lang="less" scoped>
.process_box {
  width: 100%;
  height: 12px;
  margin-top: 2px;
  border-radius: 8px;
  background: #152b43;
}

.pre_bar {
  height: 100%;
  background: url('~@/assets/bar_bg.png');
  // background: url('~@/assets/rounded_bar.png');
  // background-repeat: no-repeat;
}
</style>
