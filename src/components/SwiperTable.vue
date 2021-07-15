<template>
  <div :style="{ height:listHeight }" class="swiper_table common_box_style">
    <!-- <div class="table_title"></div> -->
    <div class="table_header">
      <div class="col">序号</div>
      <div class="col">应急事件</div>
      <div class="col">区域</div>
      <div class="col">时间</div>
    </div>
    <div class="swiper-container" ref="swiperContainer">
      <div class="swiper-wrapper">
        <template v-for="(item, ind) in swiperData">
          <div class="swiper-slide" :key="ind">
            <div class="value yellow_font">{{ ind+1 }} </div>
            <div class="value">{{ item.name }}</div>
            <div class="value yellow_font">{{ item.area }}</div>
            <div class="value yellow_font">{{ item.time }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import '../static/swiper.min.css'
import Swiper from '../static/swiper.min.js'

export default {
  props: {
    listHeight:{
      type:String,
      default:''
    },
    swiperData: {
      type: Array,
      default: () => []
    }
  },
  computed:{
    swiperOption(){
      return {
        allowTouchMove: false,
        loop: this.swiperData.length >= 11? true:false,
        autoplay: {
          delay: 1000
        },
        height: 240,
        direction: 'vertical',
        slidesPerView: 10,
        spaceBetween: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true // 允许点击小圆点跳转
        }
      }
    }
  },
  data() {
    return {
    }
  },

  mounted() {
    setTimeout(() => {
      new Swiper(this.$refs.swiperContainer, this.swiperOption)
    }, 1000)
  }
}
</script>
<style lang="less" scoped>
::v-deep.swiper_table {
  width: 100%;
  // height: 100%;
  font-size: 18px;
  padding: 0 20px;
  .table_title {
    font-weight: bold;
    font-size: 18px;
  }
  .table_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 58px;
    .col {
      font-size: 14px;
      width: 25%;
      text-align: center;
    }
  }
  .swiper-container {
    width: 100%;
    height: 100%;
    .swiper-wrapper {
      display: flex;
      flex-direction: column;
      .swiper-slide {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .value {
          font-size: 14px;
          width: 25%;
          // padding:10px 0px;
          text-align: center;
          line-height: 40px;
        }
        .value.yellow_font {
          color: #fff;
        }
      }
      .swiper-slide:nth-child(odd) {
        background-color: rgba(59, 163, 235, 0.1);
        border-radius: 4px;
      }
    }
  }
}
</style>
