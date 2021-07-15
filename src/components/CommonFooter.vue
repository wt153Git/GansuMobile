<template>
  <div class="footer_wrap">
    <div class="center_img_wrap">
      <div :class="currentRouter === '/peacetime/index'?'war-sel':''">
        <img
          class="cursor-pointer"
          @click="toMenu('')"
          :src="
            currentRouter === '/peacetime/index'
              ? require('@/assets/warntime/actived_peace.png')
              : require('@/assets/warntime/peace.png')
          "
          alt=""
        />
      </div>
      <div :class="currentRouter === '/home'?'war-sel':''">
        <img
          class="cursor-pointer"
          @click="toMenu('/home')"
          :src="
            currentRouter === '/home'
              ? require('@/assets/warntime/actived_warn.png')
              : require('@/assets/warntime/warn.png')
          "
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPeace: true
    }
  },
  computed: {
    currentRouter() {
      return this.$route.path
    }
  },
  methods: {
    toMenu(val) {
      if (val && this.currentRouter != val) {
        this.$router.push({
          path: val
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.footer_wrap {
  width: 100%;
  background-image: url('~@/assets/warntime/bottom_bg.png');
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  // height: 228px;
  img {
    // width: 60%;
    margin: 0 auto;
  }
}
.center_img_wrap {
  z-index: 3;
  width: 800px;
  // height: 228px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: -35px;
  div {
    // width: 50%;
    align-items: center;
    display: flex;
  }
  .war-sel {
    // width: 100%;
    background-image: url('~@/assets/warntime/cockpit_selection.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
</style>
