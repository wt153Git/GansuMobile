<template>
  <div class="left_block_warp">
    <common-block>
      <Title :title="'联合会商'" :subTitle="'/JOINT CONSULTATION'"> </Title>
      <div class="video_wrap" style="">
        <div class="lxtx" v-if="lxtxIcon">
          <img src="@/assets/lhtx-icon.png" alt="" />
        </div>
        <div class="left_list1">
          <VideoBlock
            @currentLink="setCurrentLink"
            :activedItem="activedItem"
            :resourceList="leftList1"
          ></VideoBlock>
        </div>
        <div class="left_list2">
          <VideoBlock
            class="left_top_block"
            :BlockWidth="1236"
            :resourceList="currentLink"
            :blockHeight="612"
            @currentLink="closeLink"
          ></VideoBlock>
          <div class="left_bottom_block">
            <VideoBlock
              @currentLink="setCurrentLink"
              :activedItem="activedItem"
              :resourceList="leftList3"
            ></VideoBlock>
          </div>
        </div>
        <div
          class="phone-line"
          v-show="showPhoneConnect"
          @click="showPhoneConnect = false"
        >
          <img src="@/assets/warntime/phone_connect.png" alt="" />
        </div>
      </div>
    </common-block>
  </div>
</template>
<script>
import Title from '@/components/Title'
import VideoBlock from './VideoBlock'
export default {
  components: {
    Title,
    VideoBlock
  },
  data() {
    return {
      currentLink: [],
      activedItem: null,
      showPhoneConnect: false,
      lxtxIcon: false,
      leftList1: [
        {
          name: '医疗应急',
          type: 'jpg',
          id: 0,
          url: require('@/assets/video/medical_treatment.jpg')
        },
        {
          name: '消防指挥现场',
          type: 'svg',
          txt: '等待接入',
          id: 1,
          svgName: 'wait_meeting'
        },
        {
          name: '交通应急',
          type: 'png',
          id: 2,
          url: require('@/assets/video/traffic_support.jpg')
        },
        {
          name: '自然灾害应急',
          type: 'png',
          id: 3,
          url: require('@/assets/video/natural_resources_rescue.jpg')
        }
      ],
      // leftList2: [
      //   {
      //     name: '公共安全应急',
      //     type: 'png',
      //     url: require('@/assets/video/medical_treatment.jpg')
      //   }
      // ],
      leftList3: [
        {
          name: '城市管理应急',
          type: 'png',
          id: 4,
          url: require('@/assets/video/c8.jpg')
        },
        {
          name: '社会安全应急',
          type: 'png',
          id: 5,
          url: require('@/assets/video/social_security_Emergency.jpg')
        },
        {
          name: '总指挥部',
          type: 'jpg',
          id: 6,
          url: require('@/assets/video/urban_management_emergency.jpg')
        },
        {
          name: '其他指挥部',
          type: 'jpg',
          id: 7,
          url: require('@/assets/video/other.jpg')
        }
      ],
      changeReasource: [
        {
          name: '公共安全应急',
          type: 'png',
          id: 8,
          url: require('@/assets/video/c6.png')
        },
        {
          name: '消防指挥现场',
          type: 'png',
          id: 9,
          url: require('@/assets/video/headquarters.jpg')
        },
        {
          name: '城市管理应急',
          type: 'png',
          id: 10,
          url: require('@/assets/video/traffic_support.jpg')
        },
        {
          name: '医疗应急',
          type: 'png',
          id: 11,
          url: require('@/assets/video/c7.png')
        },
        {
          name: '交通应急',
          type: 'png',
          id: 12,
          url: require('@/assets/video/c6.png')
        },
        {
          name: '自然灾害应急',
          type: 'png',
          id: 13,
          url: require('@/assets/video/c7.png')
        },
        {
          name: '社会安全应急',
          type: 'png',
          id: 4,
          url: require('@/assets/video/c6.png')
        },
        {
          name: '总指挥部',
          type: 'jpg',
          id: 15,
          url: require('@/assets/video/c8.jpg')
        },
        {
          name: '其他挥部',
          type: 'png',
          id: 16,
          url: require('@/assets/video/c9.jpg')
        }
      ],
      isChoose: false,
      clickNum: 0
    }
  },
  created() {
    this.currentLink = [this.leftList1[0]]
    this.activedItem = this.leftList1[0]
  },
  methods: {
    setCurrentLink(item) {
      this.activedItem = item
      if (item.type != 'svg' && item.type != 'loading') {
        this.currentLink = [item]
      } else if (item.type === 'svg') {
        this.leftList1[1] = {
          id: item.id,
          type: 'loading',
          txt: '正在接入中',
          name: item.name
        }
        let list1Copy = this.leftList1.concat([])
        setTimeout(() => {
          let obj = {
            id: item.id,
            type: 'img',
            url:  require('@/assets/video/headquarters.jpg'),
            name: item.name
          }
          let arr1=  list1Copy.slice(0, 1); 
          arr1.push(obj)
          let arr2 =  list1Copy.slice(2); 
          let arr3 = arr1.concat(arr2)
          this.leftList1 = arr3
          this.currentLink = [obj]
        }, 2000)
      }
    },
    closeLink() {
      this.lxtxIcon = !this.lxtxIcon
    },
    changeHandle(indexNum) {
      const _this = this
      _this.showPhoneConnect = true
      // 关闭正在播放的视频
      var videoList = document.getElementsByTagName('video')
      if (videoList && videoList.length) {
        for (let key = 0; key < videoList.length; key++) {
          videoList[key].pause()
        }
      }
      // 更新列表顺序
      _this.leftReasource.map((item, index) => {
        if (indexNum === index && indexNum < 9) {
          // 生成一个随机数 并判断数值大小
          var randomNumber = Math.ceil(Math.random() * 10)
          var num = randomNumber === 10 ? randomNumber - 2 : randomNumber - 1
          // 替换当前点击内容
          _this.leftReasource[index] = Object.assign(
            {},
            _this.changeReasource[num]
          )
        }
      })
      _this.leftReasource = Object.assign([], _this.leftReasource)
    }
  },
  watch: {
    showPhoneConnect: {
      handler() {
        setTimeout(() => {
          if (this.showPhoneConnect) {
            this.showPhoneConnect = false
          }
        }, 10000)
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.left_block_warp {
  width: 100%;
  height: 100%;
  .video_wrap {
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 100%;

    .lxtx {
      position: absolute;
      top: -101px;
      right: -48px;
      width: 715px;
      height: 124px;
      z-index: 20;
      img {
        width: 715px;
        height: 124px;
      }
    }
    .phone-line {
      cursor: default;
      position: absolute;
      top: 40%;
      left: 30%;
    }
  }
}
/deep/.left_list1 {
  .left_video_block:last-child {
    margin-bottom: 0px;
  }
  .name-info{
    bottom:10px;
  }
}
/deep/.left_list2 {
  width: calc(100% - 294px);
  flex: 1;
  padding-left:20px;
  .left_top_block .left_video_block {
    .left_video {
      border-color: #ffff00;
      border-width: 3px;
    }
  }
}
/deep/.left_bottom_block {
  display: flex;
  .left_video_block {
    margin-bottom: 0px;
    display: flex;
    justify-content: space-between;
      margin-right:20px;
      &:last-child{
        margin-right: 0px;
      }
    // .left_video{
    // }
  }
  .video_block_wrap {
    display: flex;
  }
}
</style>
