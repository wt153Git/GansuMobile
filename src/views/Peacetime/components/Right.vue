<template>
  <div class="right_block">
    <div class="right_left common_box">
      <Title :title="'公共卫生事件列表'" :count="groupList1.length"></Title>
      <ScroList :listData="groupList1" @tomap="tomap" :listHeight="'350px'"></ScroList>
      <!-- <SwiperTable :swiperData="groupList1" :listHeight="'370px'"></SwiperTable> -->
      <Title :title="'事故灾难列表'" :count="list2.length"></Title>
      <ScroList :listData="groupList2" :listHeight="'350px'" @tomap="tomap"></ScroList>
    </div>
    <div style="margin:0px 20px;" class="common_box">
      <Title :title="'自然灾害列表'" :count="list.length"></Title>
      <ScroList :listData="groupList3" :listHeight="'880px'" @tomap="tomap" ></ScroList>
    </div>
    <div class="common_box">
      <Title :title="'社会安全事件列表'" :count="list4.length"></Title>
      <ScroList :listData="groupList4" :listHeight="'880px'" @tomap="tomap" ></ScroList>
    </div>
  </div>
</template>
<script>
import Title from './Title'
import ScroList from './ScroList'
// import SwiperTable from '@/components/SwiperTable.vue'
import _ from 'lodash'
export default {
  components: {
    Title,
    // SwiperTable,
    ScroList
  },
  data() {
    return {

      list: [
        {
          time: '2021/7/10 8:14:00',
          name: '天水市发生3.6级地震',
          grade: 'Ⅳ级',
          area: '天水'
        },
        {
          time: '2021/7/10 6:40:00',
          name: '强对流冰雹天气农作物受灾严重',
          grade: 'Ⅳ级',
          area: '庆阳'
        },
        {
          time: '2021/7/10 5:06:00',
          name: '庄浪县发生山体垮塌1人死亡',
          grade: 'Ⅳ级',
          area: '平凉'
        },
        {
          time: '2021/7/10 3:32:00',
          name: '特大暴雨致1人失踪',
          grade: 'Ⅳ级',
          area: '平凉'
        },
        {
          time: '2021/7/10 1:58:00',
          name: '宁县发生蝗虫灾害',
          grade: 'Ⅲ级',
          area: '庆阳'
        },
        {
          time: '2021/7/9 23:24:00',
          name: '强对流天气致地质灾害',
          grade: 'Ⅲ级',
          area: '临夏'
        },
        {
          time: '2021/7/9 22:50:00',
          name: '多轮短时强降雨引发洪涝',
          grade: 'Ⅱ级',
          area: '嘉峪关'
        },
        {
          time: '2021/7/9 22:16:00',
          name: '白银市高新区发生火灾',
          grade: 'Ⅰ级',
          area: '白银'
        },
        {
          time: '2021/7/9 21:42:00',
          name: '临洮县发生泥石流滑坡',
          grade: 'Ⅲ级',
          area: '临夏'
        },
        {
          time: '2021/7/9 23:24:00',
          name: '强对流天气致地质灾害',
          grade: 'Ⅳ级',
          area: '武威'
        },
        {
          time: '2021/7/9 20:34:00',
          name: '西峰区玉米地遭受冰雹损毁',
          grade: 'Ⅲ级',
          area: '庆阳'
        },
        {
          time: '2021/7/9 20:00:00',
          name: '卓尼县持续半小时强降雨',
          grade: 'Ⅳ级',
          area: '甘南'
        },
        {
          time: '2021/7/9 19:26:00',
          name: '甘州区房屋被洪水损毁',
          grade: 'Ⅳ级',
          area: '张掖'
        },
        {
          time: '2021/7/9 18:52:00',
          name: '安定区强雷电致牛群受惊事故',
          grade: 'Ⅲ级',
          area: '定西'
        },
        {
          time: '2021/7/9 18:18:00',
          name: '秦州区地震致2人失踪',
          grade: 'Ⅳ级',
          area: '天水'
        },
        {
          time: '2021/7/9 17:44:00',
          name: '24小时内强降雨150毫升',
          grade: 'Ⅳ级',
          area: '张掖'
        },
        {
          time: '2021/7/9 17:10:00',
          name: '金昌连续强降雨致8人失踪',
          grade: 'Ⅳ级',
          area: '金昌'
        },
        {
          time: '2021/7/9 16:36:00',
          name: '恶劣天气导致泥石流滑坡',
          grade: 'Ⅱ级',
          area: '定西'
        },
        {
          time: '2021/7/9 16:02:00',
          name: '古浪多地发生雷电劈人事故',
          grade: 'Ⅲ级',
          area: '武威'
        },
        {
          time: '2021/7/9 15:28:00',
          name: '瓜州冰雹砸破车窗事故',
          grade: 'Ⅳ级',
          area: '酒泉'
        },
        {
          time: '2021/7/9 14:54:00',
          name: '暴雨致房屋坍塌致1人伤亡',
          grade: 'Ⅳ级',
          area: '平凉'
        },
        {
          time: '2021/7/9 14:20:00',
          name: '甘南暴雨致牛羊走失事故',
          grade: 'Ⅲ级',
          area: '甘南'
        },
        {
          time: '2021/7/9 13:46:00',
          name: '暴雨致3个驴友失踪事故',
          grade: 'Ⅳ级',
          area: '定西'
        }
      ],
      list2: [
        {
          time: '2021/7/10 9:00:00',
          name: '民勤航天新能源发生倒塌事',
          grade: 'Ⅳ级',
          area: '武威'
        },
        {
          time: '2021/7/10 8:40:00',
          name: '清水县发生一起交通事故',
          grade: 'Ⅳ级',
          area: '天水'
        },
        {
          time: '2021/7/10 7:10:00',
          name: '平凉市崆峒发生触电事故',
          grade: 'Ⅳ级',
          area: '平凉'
        },
        {
          time: '2021/7/10 6:08:00',
          name: '宁县塑料厂发生机械伤害事故',
          grade: 'Ⅲ级',
          area: '庆阳'
        },
        {
          time: '2021/7/10 4:40:00',
          name: '徽县发生冒顶事故',
          grade: 'Ⅲ级',
          area: '陇南'
        },
        {
          time: '2021/7/10 1:38:00',
          name: '凉州区发生中毒事故1死3伤',
          grade: 'Ⅲ级',
          area: '武威'
        },
        {
          time: '2021/7/9 22:26:00',
          name: '兰州新区秦园1人坠亡',
          grade: 'Ⅲ级',
          area: '兰州'
        },
        {
          time: '2021/7/9 18:29:00',
          name: '宏达铝型车间发生安全事故',
          grade: 'Ⅲ级',
          area: '定西'
        },
        {
          time: '2021/7/9 15:11:00',
          name: '定西境内连霍高速交通事故',
          grade: 'Ⅱ级',
          area: '定西'
        },
        {
          time: '2021/7/9 12:23:00',
          name: '庆红园区发生一物体打击事故',
          grade: 'Ⅰ级',
          area: '白银'
        }
      ],
      list3: [
        {
          time: '2021/7/10 9:22:00',
          name: '武威市凉州区中毒事故',
          grade: 'Ⅳ级',
          area: '武威'
        },
        {
          time: '2021/7/10 9:20:00',
          name: '兰州市红古区中毒窒息事故',
          grade: 'Ⅱ级',
          area: '兰州'
        },
        {
          time: '2021/7/10 7:36:00',
          name: '金川集团一氧化碳中毒事故',
          grade: 'Ⅰ级',
          area: '金昌'
        },
        {
          time: '2021/7/10 4:16:000',
          name: '甘南州突发猪瘟疫情',
          grade: 'Ⅱ级',
          area: '甘南'
        },
        {
          time: '2021/7/10 1:03:00',
          name: '庆阳市儿童流脑感染者剧增',
          grade: 'Ⅲ级',
          area: '庆阳'
        },
        {
          time: '2021/7/9 23:12:00',
          name: '天水市第一幼儿园食物中毒',
          grade: 'Ⅲ级',
          area: '天水'
        },
        {
          time: '2021/7/9  21:35:00',
          name: '定西发生大量不明原因肺炎',
          grade: 'Ⅱ级',
          area: '定西'
        },
        {
          time: '2021/7/9 18:08:00',
          name: '酒泉市牛肉中毒事件',
          grade: 'Ⅳ级',
          area: '酒泉'
        },
        {
          time: '2021/7/9 14:41:00',
          name: '武威市流感事件',
          grade: 'Ⅳ级',
          area: '武威'
        },
        {
          time: '2021/7/9 11:14:00',
          name: '临夏州禽流感疫情',
          grade: 'Ⅳ级',
          area: '临夏'
        },
        {
          time: '2021/7/9 7:47:00',
          name: '电力印刷厂职工集体食物中毒',
          grade: 'Ⅲ级',
          area: '陇南'
        }
      ],
      list4: [
        {
          time: '2021/6/10 9:12:00',
          name: '嘉峪关市工人集体罢工事故',
          grade: 'Ⅳ级',
          area: '嘉峪关'
        },
        {
          time: '2021/6/10 9:10:00',
          name: '秦州区高中聚众斗殴事故',
          grade: 'Ⅲ级',
          area: '天水'
        },
        {
          time: '2021/6/10 9:05:00',
          name: '金昌市网络诈骗事故',
          grade: 'Ⅳ级',
          area: '金昌'
        },
        {
          time: '2021/6/10 8:12:00',
          name: '崆峒区增值税发票造假事故',
          grade: 'Ⅳ级',
          area: '平凉'
        },
        {
          time: '2021/6/10 7:12:00',
          name: '平川区民众抢购粮食事故',
          grade: 'Ⅳ级',
          area: '白银'
        },
        {
          time: '2021/6/10 6:12:00',
          name: '米市村村民自制土枪事故',
          grade: 'Ⅳ级',
          area: '天水'
        },
        {
          time: '2021/6/10 5:12:00',
          name: '武南镇乡镇银行抢劫事故',
          grade: 'Ⅲ级',
          area: '武威'
        },
        {
          time: '2021/6/10 4:12:00',
          name: '肃州区制造毒品事故',
          grade: 'Ⅳ级',
          area: '酒泉'
        },
        {
          time: '2021/6/10 3:12:00',
          name: '庆阳市公交车被袭击事故',
          grade: 'Ⅳ级',
          area: '庆阳'
        },
        {
          time: '2021/6/10 2:12:00',
          name: '兰州市火车站袭击事故',
          grade: 'Ⅱ级',
          area: '兰州'
        },
        {
          time: '2021/6/10 1:12:00',
          name: '安定区街头袭击路人事故',
          grade: 'Ⅰ级',
          area: '定西'
        },
        {
          time: '2021/6/10 0:12:00',
          name: '红古区油罐车爆炸事故',
          grade: 'Ⅳ级',
          area: '兰州'
        },
        {
          time: '2021/6/9 23:12:00',
          name: '武都区多人游行示威事故',
          grade: 'Ⅳ级',
          area: '陇南'
        },
        {
          time: '2021/6/9 22:12:00',
          name: '肃州镇网络诈骗事故',
          grade: 'Ⅳ级',
          area: '敦煌'
        },
        {
          time: '2021/6/9 21:12:00',
          name: '玉门镇向阳路纵火事故',
          grade: 'Ⅱ级',
          area: '玉门'
        },
        {
          time: '2021/6/9 20:12:00',
          name: '清水县聚众斗殴事故',
          grade: 'Ⅳ级',
          area: '天水'
        },
        {
          time: '2021/6/9 19:12:00',
          name: '武威市生产伪劣食品事故',
          grade: 'Ⅳ级',
          area: '武威'
        },
        {
          time: '2021/6/9 18:12:00',
          name: '酒泉市矿山炸药丢失事故',
          grade: 'Ⅳ级',
          area: '酒泉'
        },
        {
          time: '2021/6/9 17:12:00',
          name: '西峰区劣质药品销售事故',
          grade: 'Ⅲ级',
          area: '庆阳'
        },
        {
          time: '2021/6/9 16:12:00',
          name: '柔远镇刘沟村村纵火事故',
          grade: 'Ⅲ级',
          area: '兰州'
        },
        {
          time: '2021/6/9 15:12:00',
          name: '麦积区聚众游行事故',
          grade: 'Ⅳ级',
          area: '天水'
        },
        {
          time: '2021/6/9 14:12:00',
          name: '凉州区劣质药品生产事故',
          grade: 'Ⅲ级',
          area: '武威'
        }
      ]
    }
  },
  computed:{
    groupList1(){
     return _.orderBy(this.list3, ['grade','time'], ['asc', 'desc']);
    },
    groupList2(){
     return _.orderBy(this.list2, ['grade','time'], ['asc', 'desc']);
    },
    groupList3(){
     return _.orderBy(this.list, ['grade','time'], ['asc', 'desc']);
    },
    groupList4(){
     return _.orderBy(this.list4, ['grade','time'], ['asc', 'desc']);
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    tomap(val){
      this.$emit('tomap',val)
    },
    setGrade() {
      let grade = ['Ⅰ级', 'Ⅱ级', 'Ⅲ级', 'Ⅳ级', 'Ⅴ级', 'Ⅵ级', 'Ⅶ级', 'Ⅷ级']
      let random = this.getRandom(0, 7)
      return grade[random]
    },
    setName() {
      let type = [
        '武威市凉州区中毒事故',
        '兰州市红古区中毒窒息事故',
        '金川集团公司热电公司一氧化碳中毒事故',
        '消防安全'
      ]
      let random = this.getRandom(0, 3)
      return type[random]
    },
    setArea() {
      let type = ['武威', '兰州', '兰州', '兰州']
      let random = this.getRandom(0, 3)
      return type[random]
    },
    getRandom(m, n) {
      return parseInt(Math.random() * (m - n) + n)
    },
    getData() {
      // this.list = this.setList(7)
      this.list2 = this.setList(10)
      // this.list3 = this.setList(20)
      // this.list4 = this.setList(20)
    },
    setList(num) {
      let arr = []
      for (let i = 0; i < num; i++) {
        arr.push({
          time: '2019-02-09',
          name: this.setName(),
          grade: this.setGrade(),
          area: this.setArea()
        })
      }
      return arr
    }
  }
}
</script>
<style lang="less" scoped>
.right_block {
  display: flex;
  justify-content: space-between;
}
</style>
