<template>
  <div class="left_block_warp">
    <common-block>
      <Title :title="'实时感知'" :subTitle="'/JOINT CONSULTATION'"></Title>
      <div class="video_wrap" @click="switchScreenHandle">
        <div
          v-for="(item, ind) in leftReasource"
          :key="ind"
          :class="leftReasource.length === 4 ? 'fourth-video-content' : 'ninth-video-content'"
        >
          <video
          v-if="item.type === 'mp4'"
            :class="leftReasource.length === 4 ? 'fourth-video' : 'ninth-video'"
            :src="item.url"
            controls="controls"
          >
            your browser does not support the video tag
          </video>
          <img v-else :src="item.url" :class="leftReasource.length === 4 ? 'fourth-img' : 'ninth-img'" alt="">
          <div class="title-source" :class="`title-source-${item.sourceType}`">{{ item.source }}</div>
          <div class="title-info">{{ item.title }}</div>
          <!-- <div class="name-info">{{ item.name }}</div> -->
        </div>
      </div>
    </common-block>
  </div>
</template>
<script>
import Title from '@/components/Title'
export default {
  components: {
    Title
  },
  data() {
    return {
      clickNum: 1,
      leftReasource: [],
      sourceList: [
        {
          name: '医疗应急监控',
          source:'来自监控点',
          sourceType: 0,
          title: '平凉路001 2021年6月13日 星期一  12:23',
          type: 'mp4',
          url: require('@/assets/video/fire.mp4')
        },
        {
          name: '城市管理应急监控',
          source:'来自无人机',
          sourceType: 1,
          title: '民主东路001 2021年6月13日 星期一  12:23',
          type: 'png',
          url: require('@/assets/video/5.png')
        },
        {
          name: '交通应急监控',
          source:'来自和背包',
          sourceType: 2,
          title: '平凉路002 2021年6月13日 星期一  12:23',
          type: 'jpg',
          url: require('@/assets/video/23.jpg')
        },
        {
          name: '自然灾害应急监控',
          source:'来自无人机',
          sourceType: 1,
          title: '平凉路003 2021年6月13日 星期一  12:23',
          type: 'jpg',
          url: require('@/assets/video/natural.jpg')
        },
        {
          name: '公共安全应急监控',
          source:'来自监控点',
          sourceType: 0,
          title: '平凉路004 2021年6月13日 星期一  12:23',
          type: 'mp4',
          url: require('@/assets/video/bridge.mp4')
        },
        {
          name: '消防指挥现场',
          source:'来自无人机',
          sourceType: 1,
          title: '平凉路005 2021年6月13日 星期一  12:23',
          type: 'jpg',
          url: require('@/assets/video/22.jpg')
        },
        {
          name: '社会安全应急监控',
          source:'来自和背包',
          sourceType: 2,
          title: '民主东路002 2021年6月13日 星期一  12:23',
          type: 'jpg',
          url: require('@/assets/video/21.jpg')
        },
        {
          name: '总指挥部监控',
          source:'来自和背包',
          sourceType: 2,
          title: '民主东路003 2021年6月13日 星期一  12:23',
          type: 'jpg',
          url: require('@/assets/video/24.jpg')
        },
        {
          name: '其他监控',
          source:'来自无人机',
          sourceType: 1,
          title: '民主东路004 2021年6月13日 星期一  12:23',
          type: 'jpg',
          url: require('@/assets/video/6.jpg')
        }
      ],
      otherList: [
        {
          name: '医疗应急监控',
          source:'来自监控点',
          sourceType: 0,
          title: '平凉路001 2021年6月13日 星期一  12:23',
          type: 'jpj',
          url: require('@/assets/video/medical_incident.jpg')
        },
        {
          name: '交通应急监控',
          source:'来自无人机',
          sourceType: 1,
          title: '平凉路002 2021年6月13日 星期一  12:23',
          type: 'mp4',
          url: require('@/assets/video/fire.mp4')
        },
        {
          name: '自然灾害应急监控',
          source:'来自无人机',
          sourceType: 1,
          title: '平凉路003 2021年6月13日 星期一  12:23',
          type: 'mp4',
          url: require('@/assets/video/bridge.mp4')
        },{
          name: '公共安全应急监控',
          source:'来自和背包',
          sourceType: 2,
          title: '平凉路004 2021年6月13日 星期一  12:23',
          type: 'png',
          url: require('@/assets/video/3.png')
        }]
    }
  },
  mounted () {
    this.leftReasource = this.sourceList
  },
  methods: {
    switchScreenHandle () {
      this.clickNum++
      if (this.clickNum % 2 === 0) {
        this.changeFourHandle()
      } else {
        this.changeHandle()
      }
    },
    changeFourHandle () {
      const newArray = []
      const _this = this
      _this.leftReasource = _this.otherList
      const newAarryList = [0, 1, 2, 3];
      // 打乱数组拍寻
      newAarryList.sort(function (a, b) {
        return 0.5 - Math.random()
      });
      // console.log(newAarryList)
      // 更新列表顺序
      for (var i = 0; i < newAarryList.length; i++) {
        newArray.push(_this.leftReasource[newAarryList[i]])
      }
      _this.leftReasource = Object.assign([], newArray)
    },
    changeHandle () {
      const newArray = []
      const _this = this
      _this.leftReasource = _this.sourceList
      const newAarryList = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      // 打乱数组拍寻
      newAarryList.sort(function (a, b) {
        return 0.5 - Math.random()
      });
      // console.log(newAarryList)
      // 更新列表顺序
      for (var i = 0; i < newAarryList.length; i++) {
        newArray.push(_this.leftReasource[newAarryList[i]])
      }
      _this.leftReasource = Object.assign([], newArray)
    }
  }
}
</script>
<style lang="less" scoped>
.left_block_warp{
  width:100%;
  height: 100%;
  .video_wrap{
    margin-top:20px;
    display:flex;
    flex-wrap: wrap;
    cursor: default;
  }
}
.fourth-video {
  width: 100%;
   height: 410px;
}

.ninth-video {
  width: 100%;
 height: 270px;
}
.fourth-img {
  width: 100%;
  height: 410px;
}
.ninth-img {
  width: 100%;
  height: 270px;
}
.fourth-video-content {
  width: 50%;
  position: relative;
  border: 3px solid steelblue;
  background: none;
}
.ninth-video-content {
  width: 33.33%;
  position: relative;
  border: 3px solid steelblue;
  background: none;
}
.title-source {
  // width: 100%;
  
  position: absolute;
  top: 5px;
  left: 10px;
  padding: 0px 8px;
  font-size: 16px;
  text-align: right;
  font-weight: bold;
  border-radius: 12px;
  
}
.title-source-0 {
  border-width: 1px;
  border-color: rgb(255, 255, 255);
  border-style: solid;
  background-color: rgba(255, 255, 255, 0.502);
}
.title-source-1 {
  border-width: 1px;
  border-color: rgb(0, 252, 255);
  border-style: solid;
  background-color: rgba(0, 252, 255, 0.502);
}
.title-source-2 {
  border-width: 1px;
  border-style: solid;
  border-color: rgb(226, 19, 120);
  background-color: rgba(226, 19, 120, 0.502);
}
.title-info {
  width: 100%;
  font-size: 16px;
  text-align: right;
  font-weight: bold;
  position: absolute;
  top: 5px;
  right: 10px;
}
.name-info {
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  bottom: 10px;
}
.left_video_block {
  // margin-bottom: 20px;
  margin: 30px;
  width: 500px;
  text-align: center;
   border: 3px solid steelblue;
  background: none;
  // &:nth-child(3n+2){
    // border:1px solid red;
    // margin-left:20px;
    // margin-right:20px;
  // }
  .left_video {
    width: 100%;
    border: 1px solid #2C5D8F;
     border: 3px solid steelblue;
  background: none;
    // height: 240px;
     // min-width:27%;
    // min-width: 200px;
  }
}
</style>
