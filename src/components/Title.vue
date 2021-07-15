<template>
  <div class="title_block">
      <div v-if="title" class="title">{{ title }}</div>
      <div v-if="subTitle" class="sub_title">{{subTitle}}</div>
      <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
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
.title_block {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  background: url('../assets/overview/title_bg.png') no-repeat;
  background-size: 100% 100%;
  padding: 10px;
}

.title {
  font-size: 22px;
  font-family: PingFang SC Bold, PingFang SC Bold-Bold;
  font-weight: 700;
  margin-right:10px;
}

.sub_title {
  width: fit-content;
  font-size: 14px;
  color:rgba(201, 198, 198, 0.77);
}
</style>
