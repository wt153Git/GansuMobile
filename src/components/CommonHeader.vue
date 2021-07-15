<template>
  <div class="header">
    <div class="title" @click="displayImportSystemGrid('min')">
      <img :src="title === 'usually'?imgList[0].url:imgList[1].url" alt="" >
    </div>
    <div class="current_time"  @click="displayImportSystemGrid('max')">
      <span>
      {{currentTime}}
      </span>
      <img class="whether" src="~@/assets/common/whether.png" alt="">
      <span>{{getTimeTip()}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    actived: {
      type: String,
      default: 'overview'
    },
    title:{
      type: String,
      default: ''
    }
  },
  name: 'commonHeader',
  data(){
    return {
      currentTime:new Date(),
      imgList: [
        {
          url: require('@/assets/usually.png')
        },
        {
          url: require('@/assets/wartime.png')
        }
      ]
    }
  },
  created(){
    this.currentTime = this.formatTime(new Date()) 
    setInterval(()=>{
      this.currentTime = this.formatTime(new Date()) 
    },1000)
  },
  methods: {
    getTimeTip () {
      let date = new Date()
      if (date.getHours() >= 0 && date.getHours() < 12) {
        return 'AM'
      } else if (date.getHours() >= 12 && date.getHours() < 24) {
        return 'PM'
      } 
    },
    displayImportSystemGrid(type) {
      this.$emit('displayImportSystemGrid', type)
    }
  }
}
</script>
<style lang="less" scoped>
.gradient {
  position: absolute;
  top: 38px;
  cursor: default;
}
.current_time{
  position: absolute;
  top: 38px;
  right:100px;
  font-size: 30px;
  vertical-align: middle;
}
.header {
  position: relative;
  width: 100%;
  height: 150px;
  background: url('../assets/overview/head@2x.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  z-index: 10;
  text-align: center;
  // justify-content: center;

  .menu_left_box {
    display: flex;
    position: absolute;
    left: 21%;
    top: 34px;
  }

  .menu_right_box {
    display: flex;
    position: absolute;
    right: 22%;
    top: 34px;
  }

  .left_actived {
    background: url('../assets/overview/select.png') no-repeat;
    background-size: 100% 100%;
  }

  .left_unselect {
    background: url('../assets/overview/un_select.png') no-repeat;
    background-size: 100% 100%;
  }

  .right_actived {
    background: url('../assets/overview/slect_right.png') no-repeat;
    background-size: 100% 100%;
  }

  .right_unselect {
    background: url('../assets/overview/un_select2.png') no-repeat;
    background-size: 100% 100%;
  }

  .menu_left {
    width: 182px;
    height: 61px;
    color: #fff;
    line-height: 54px;
    text-align: center;
    cursor: default;
    font-size: 20px;
    font-weight: 400;
  }

  .menu_right {
    width: 182px;
    height: 61px;
    color: #fff;
    cursor: default;
    line-height: 54px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
  }

  .title {
    width: 100%;
    font-size: 40px;
    font-weight: 400;
    color: #fff;
    text-align: center;
    margin: 15px auto;
    text-shadow: 2px 2px 8px #a5ccfb;
    margin-left: -20px;
    text-shadow: .2rem 0rem .5rem #4a81d4,-.2rem 0rem .5rem #4a81d4,0rem .2rem .5rem #4a81d4,0rem -.2rem .5rem #4a81d4;
  }
}
.whether{
  width: 50px;
  height: 50px;
  margin-left: 10px;
  position: relative;
  top: 6px;
  margin-right: 10px;
}
</style>
