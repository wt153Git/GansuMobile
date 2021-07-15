<template>
  <div class="video_block_wrap">
    <div
      v-for="(item, index) in resourceList"
      :key="index"
      :class="'left_video_block left_video_block_' + index"
      :style="{ width: BlockWidth + 'px',height: blockHeight + 'px' }"
      @click="changeHandle(item, index)"
    >
      <div
        v-if="item.type === 'svg'"
        class="svg_block"
        :class="[
          'left_video left_video_' + index,
          activedItem && item.id === activedItem.id ? 'active' : ''
        ]"
        :style="{ height: blockHeight + 'px' }"
      >
        <svg-icon class="svg_icon" :icon-class="item.svgName"></svg-icon>
        <p>
          {{ item.txt }}
        </p>
      </div>
      <div v-if="item.type === 'loading'" class="map left_video"  :style="{ height: blockHeight + 'px' }">
        <div class="city">
          <div class="dotted"></div>
          <div class="pulse1"></div>
          <div class="pulse2"></div>
          <div class="pulse3"></div>
        </div>
      </div>
      <video
        v-if="item.type === 'mp4'"
        :style="{ height: blockHeight + 'px' }"
        :class="[
          'left_video left_video_' + index,
          activedItem && item.id === activedItem.id ? 'active' : ''
        ]"
        :src="item.url"
        controls="controls"
      >
        your browser does not support the video tag
      </video>
      <img
        v-else-if="item.url"
        :src="item.url"
        :style="{ height: blockHeight + 'px' }"
        :class="[
          'left_video left_video_' + index,
          activedItem && item.id === activedItem.id ? 'active' : ''
        ]"
        alt=""
      />
      <div class="name-info">{{ item.name }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    blockHeight: {
      type: Number,
      default: 188
    },
    BlockWidth: {
      type: Number,
      default: 294
    },
    resourceList: {
      type: Array,
      default: () => []
    },
    activedItem: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isChoose: true
    }
  },
  methods: {
    changeHandle(item) {
      this.$emit('currentLink', item)
    }
  }
}
</script>
<style lang="less" scoped>
.svg_block {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('../../../assets/warntime/wait_bg.png') no-repeat;
  background-size: 100% 100%;
  .svg_icon {
    color: red;
    font-size: 75px;
  }
}
.left_video_block {
  text-align: center;
  position: relative;
  margin-bottom: 24px;
  background: none;
  .left_video {
    width: 100%;
    border: 1px solid #2c5d8f;
    transform: scale(1); /*图片原始大小1倍*/
    transition: all ease 0.5s;
  }
  .left_video.active {
    border: 2px solid #00fcff;
  }
  .name-info {
    position: absolute;
    bottom: 8px;
    padding: 6px 0;
    width: 98%;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    text-align: center;
    margin-left: 1%;
  }
}
.map {
  position: relative;
  width: 100%;
  margin: 0 auto;
   background: url('../../../assets/warntime/wait_bg.png') no-repeat;
  background-size: 100% 100%;
}

.city {
  position: absolute;
    top: 40%;
    right: 49%;
  color: #fff;
}
.loading_txt{
    position: absolute;
    top: 60%;
    right: 40%;
  color: #fff;
}
.tb {
  top: 500px;
  right: 80px;
}

.dotted {
      width: 10px;
    height: 10px;
  background-color: #09f;
  border-radius: 50%;
}

.city div[class^='pulse'] {
  /* 保证我们小波纹在父盒子里面水平垂直居中 放大之后就会中心向四周发散 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  box-shadow: 0 0 12px #009dfd;
  border-radius: 50%;
  animation: pulse 2.6s linear infinite;
}

.city div.pulse2 {
  animation-delay: 1.2s;
}

.city div.pulse3 {
  animation-delay: 1.8s;
}

@keyframes pulse {
  0% {
  }
  70% {
    /* transform: scale(5);  我们不要用scale 因为他会让 阴影变大*/
    width: 60px;
    height: 60px;
    opacity: 1;
  }
  100% {
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
</style>
