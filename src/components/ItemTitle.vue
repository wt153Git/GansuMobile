<template>
  <div
    class="item_title_block"
    @click="switchItem(tit)"
    :class="currentName === tit ? 'actived' : ''"
  >
    <div v-if="num">
      <span class="num">{{ num }}</span>
      <span class="unit">处</span>
    </div>
    <slot></slot>
    <div class="tit">
      {{ tit }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tit: {
      type: String,
      default: ''
    },
    num: {
      type: String,
      default: ''
    },
    currentName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    switchItem(val) {
      this.$emit('actived', val)
    }
  }
}
</script>
<style lang="less" scoped>
.item_title_block {
  padding: 10px 10px 4px;
  background: rgba(59, 163, 235, 0.1);
  cursor: pointer;
  border: 3px solid rgba(68, 166, 236, 0.1);
  border-left: none;
  border-right: none;
  span {
    display: inline-block;
  }
  &.actived {
    border: 3px solid #3bd5ba;
    background: rgba(118, 224, 210, 0.2);
    cursor: pointer;
    border-left: none;
    border-right: none;
  }
}

.num {
  color: rgba(0, 252, 255, 1);
  font-size: 26px;
  font-weight: bold;
  margin-right: 4px;
}
.unit {
  font-size: 12px;
}
.tit {
  font-size: 16px;
}
</style>
