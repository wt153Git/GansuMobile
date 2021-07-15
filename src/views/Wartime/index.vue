<template>
  <!-- <div class="overview_page"> -->
  <div class="overview_page_warn">
    <CommonHeader :title="'wartime'" @displayImportSystemGrid="displayImportSystemGrid"></CommonHeader>
    <div class="overview_page_content">
      <div class="left">
        <Left></Left>
      </div>
      <div v-if="!systemWrapMin" class="center" @click="changeImg()">
        <img :src="srcUrl" alt="" />
      </div>
      <div v-if="systemWrapMin" class="system-wrap">
        <img v-for="(item, index) in imgList"  :src="item.url" alt="" :key="index" @click="displayImportSystem(index)" />
      </div>
      <div v-if="showMask" class="system-wrap-max-mask" @click="closeMask"></div>
      <div v-if="showMask" class="system-wrap-max">
        <img v-for="(item, imgIndex) in imgList"  :src="item.url" alt="" :key="imgIndex" @click="displayImportSystem(imgIndex)" />
      </div>
      <div class="right">
        <Right></Right>
      </div>
    </div>
    <div class="footer">
      <CommonFooter></CommonFooter>
    </div>
  </div>
</template>
<script>
import CommonFooter from '@/components/CommonFooter'
import CommonHeader from '@/components/CommonHeader'
import Left from './components/Left'
import Right from './components/Right'

export default {
  name: 'overView',
  components: {
    CommonFooter,
    CommonHeader,
    Left,
    Right
  },
  data () {
    return {
      num: 0,
      currClick: 0,
      srcUrl: '',
      showMask: false, // 导入系统框的遮罩层显示状态
      systemWrapMin: false, // 导入系统缩小状态框的显示状态控制
      leftSwitchImg: [
        {
          className: 'security',
          url: require('@/assets/warntime/security.png'),
          urlSel: require('@/assets/warntime/security_sel.png')
        },
        {
          className: 'ecosystem',
          url: require('@/assets/warntime/ecosystem.png'),
          urlSel: require('@/assets/warntime/ecosystem_sel.png')
        }, {
          className: 'water_resources',
          url: require('@/assets/warntime/water_resources.png'),
          urlSel: require('@/assets/warntime/water_resources_sel.png')
        },
        {
          className: 'lands_bureau',
          url: require('@/assets/warntime/lands_bureau.png'),
          urlSel: require('@/assets/warntime/lands_bureau_sel.png')
        }, {
          className: 'emergency_management',
          url: require('@/assets/warntime/emergency_management.png'),
          urlSel: require('@/assets/warntime/emergency_management_sel.png')
        },
        {
          className: 'health',
          url: require('@/assets/warntime/health.png'),
          urlSel: require('@/assets/warntime/health_sel.png')
        }, {
          className: 'meteorology',
          url: require('@/assets/warntime/meteorology.png'),
          urlSel: require('@/assets/warntime/meteorology_sel.png')
        },
        {
          className: 'fire_brigade',
          url: require('@/assets/warntime/fire_brigade.png'),
          urlSel: require('@/assets/warntime/fire_brigade_sel.png')
        }
      ],
      imgList: [
        {
          url: require('@/assets/warntime/security_bg.png')
        },
        {
          url: require('@/assets/warntime/ecosystem_bg.png')
        },
        {
          url: require('@/assets/warntime/water_resources_bg.png')
        },
        {
          url: require('@/assets/warntime/lands_bureau_bg.png')
        },
        {
          url: require('@/assets/warntime/meteorology_bg.png')
        },
        {
          url: require('@/assets/warntime/health_bg.png')
        },
        {
          url: require('@/assets/warntime/meteorology_bg.png')
        },
        {
          url: require('@/assets/warntime/fire_brigade_bg.png')
        }
      ]
    }
  },
  computed: {},
  mounted () {
    this.srcUrl = this.imgList[this.num].url
  },
  watch: {},
  methods: {
    changeImg () {
      this.num++
      if (this.num === this.imgList.length) {
        this.num = 0
        this.srcUrl = this.imgList[this.num].url
      } else {
        this.srcUrl = this.imgList[this.num].url
      }
    },
    /**
     * 功能描述：
     * 根据类型展示导入系统格子框架
     */
    displayImportSystemGrid(type) {
      if (type === "min") {
        // 展示导入系统小格子框架
        this.systemWrapMin = true;
        // 关闭导入系统大格子框架
        this.closeMask()
      } else {
        // 展示导入系统大格子框架
        this.showMask = true;
      }
    },
    /**
     * 功能描述：
     * 1.从导入系统的格子中点击某一个系统；
     * 2.关闭当前的导入系统组成的格子框架；
     * 2.在页面中间部分展示被点击的子系统。
     * 事件：点击每个子系统触发该事件
     */
    displayImportSystem(index) {
      this.srcUrl = this.imgList[index].url;
      this.num = index;
      this.systemWrapMin = false;
      // 点击的是大的导入系统格子框架中某一个子系统需要触发该方法
      this.closeMask();
    },
    /**
     * 功能描述：关闭导入系统的界面及遮罩层
     * 事件：点击遮罩层触发该事件
     */
    closeMask() {
      this.showMask = false;
    }
  }
}
</script>
<style lang="less" scoped>
.overview_page_warn {
  .overview_page_content {
    display: flex;
    padding: 20px 100px 0;
    .left {
      width: 1604px;
    }
    .center {
      background: url('~@/assets/center_border.png') no-repeat;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: 0 40px;
      position: relative;
      height: 958px;
      flex: 1;
      .platform-list {
        position: absolute;
        top: 20%;
        left: 0;
        ul {
          list-style: none;
          margin-left: 10px;
        }
      }
      & > img {
        width: 100%;
        height: 100%;
        padding: 10px;
      }
    }

    .system-wrap {
      position: relative;
      margin: 0 40px;
      padding: 16px 16px;
      height: 958px;
      flex: 1;
      background: url('~@/assets/center_border.png') no-repeat;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      box-sizing: border-box;
      
      .platform-list {
        position: absolute;
        top: 20%;
        left: 0;
        ul {
          list-style: none;
          margin-left: 10px;
        }
      }
      & > img {
        margin: 16px 16px;
        width: calc(25% - 32px);
        height: calc(50% - 32px);
        border: 1px solid #2c5d8f;
      }
    }
    .system-wrap-max-mask {
      position: fixed;
      top: 140px;
      left: 0px;
      width: 100%;
      height: 1000px;
      background: rgba(0, 0, 0, .8);
      z-index: 1;
    }
    .system-wrap-max {
      position: fixed;
      top: 140px;
      left: calc(50% - 2000px);
      width: 4000px;
      height: 1000px;
      z-index: 2;
      background: rgba(0, 0, 0, .8);

      & > img {
        margin: 16px 16px 16px 16px;
        width: calc(25% - 32px);
        height: calc(50% - 32px);
        border: 1px solid #2c5d8f;
      }
    }
    .right {
      width: 1800px;
    }
  }
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.footer {
  position: absolute;
  width: 100%;
  // height: 120px;
  bottom: 0px;
}
.screen_btn {
  vertical-align: middle;
  width: 24px;
  height: 24px;
  margin-left: 4px;
}
.maker_wrap {
  position: absolute;
  top: 440px;
  right: 2%;
  width: fit-content;
}
</style>
