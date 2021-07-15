<template>
<div class="common_block_wrap">
  <slot></slot>
</div>
</template>
<script>
export default {
  name: 'commonBlock'
}
</script>
<style lang="less" scoped>
.common_block_wrap{
    padding: 20px 24px 16px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  border: 1px solid #4b7199;
}
</style>