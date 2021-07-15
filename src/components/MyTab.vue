<template>
  <div
    @click="setTab(tit)"
    class="my_tab_title"
    :class="actived === tit ? 'actived' : ''"
  >
    {{ tit }}
  </div>
</template>
<script>
export default {
  props: {
    actived: {
      type: String,
      default: ''
    },
    tit: {
      type: String,
      default: ''
    }
  },
  methods: {
    setTab(val) {
      this.$emit('setTab', val)
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.my_tab_title {
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 0px 2px 4px;
  font-size: 14px;
  &.actived {
    border-bottom: 2px solid #2a92ea;
    font-size: 16px;
  }
}
</style>
