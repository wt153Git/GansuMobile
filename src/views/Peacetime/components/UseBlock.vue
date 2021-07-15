<template>
  <div class="use_block">
    <div class="tit">{{ tit }}<span class="tran"></span></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    tit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.use_block {
  background: rgba(20, 61, 100, 0.2);
  padding-bottom: 4px;
  margin-top: 22px;
  .tit {
    width: fit-content;
    background: rgba(42, 146, 234, 1);
    color: #fff;
    padding: 5px 30px;
    font-size: 14px;
  }
}
</style>
