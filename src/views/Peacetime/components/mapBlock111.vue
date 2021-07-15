<template>
  <div class="center_map_wrap">
    <div class="map_title_block">
      <div class="title_value">
        <span class="sum_item">{{ sumDataVal }}</span> 亿 m³
        <div>
          <span class="year_box">{{ currentYear }}</span>
        </div>
      </div>
    </div>
    <div id="szyMapMain" class="shanxi_map"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import axios from 'axios'
import shanxiData from '@/utils/shanxiJson'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ''
    },
    sumData: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      option: {},
      minVal: 0,
      currentYear: 2018
    }
  },
  computed: {
    mapData() {
      let arr = [...this.list]
      arr.forEach(item => {
        if (typeof item.value === 'string') {
          item.value = Number(item.value.split('亿')[0])
        }
      })
      return arr
    },
    maxData() {
      let arr = []
      this.mapData.forEach(item => {
        arr.push(Number(item.value))
      })
      return _.max(arr)
    },
    sumDataVal() {
      return this.sumData.split('亿')[0]
    }
  },
  watch: {
    mapData: {
      handler(val) {
        if (val && val.length) {
          this.$nextTick(() => {
            this.initMap()
          })
        }
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    async initMap() {
      var mydom = this.$echarts.init(document.getElementById('szyMapMain'))
      mydom.showLoading()
      mydom.hideLoading()
      echarts.registerMap('SHANXI', shanxiData)
      let mapName = this.name
      let max = this.maxData
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            let { name, value } = params.data
            let style1 = `<style>
                .tooltip_box{
                  padding:6px 20px 6px 10px;
                  margin:-10px;
                  border-radius:2px;
                  min-width:200px;
                }
                .tooltip_name{
                  color:'#fff';
                  padding-left:5px;
                  padding-top:6px;
                  padding-bottom:6px;
                  background:rgba('4,12,26,1')
                }
                .tooltip_value{
                  background:rgba(20,61,100,0.9);
                  color:'#fff';"
                  height:50px;
                  padding:15px 20px 20px 10px;
                  margin:0px -15px 0px -4px;
                }
                .font-size-18{
                  font-size:18px;
                }
                .bold{
                  font-weight:bold;
                }
                </style>`
            let nameBox =
              `<div class='tooltip_name font-size-18'>` + name + `</div>`
            let valueBox =
              `<div class="tooltip_value"">` +
              mapName +
              `总量：<span class="font-size-18 bold">` +
              value +
              `</span>` +
              ` 亿 m³</div>`
            return (
              style1 +
              `<div class='tooltip_box'>` +
              nameBox +
              valueBox +
              `</div>`
            )
          }
        },
        toolbox: {
          show: false,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: {
              readOnly: false
            },
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          // show: false,
          min: this.minVal,
          max: this.maxData,
          itemWidth: 10,
          align: 'left',
          bottom: 35,
          right: 20,
          formatter: function(value) {
            return value + ' 亿 m³' // 范围标签显示内容。
          },
          // text: [this.maxData + 'm³', this.minVal + 'm³'],
          textGap: 30,
          realtime: true,
          calculable: false,
          inRange: {
            color: ['#001a54', '#35cee5']
          },
          textStyle: {
            color: '#FFF'
          }
        },
        series: [
          {
            name: this.name,
            type: 'map',
            mapType: 'SHANXI', // 自定义扩展图表类型
            layoutCenter: ['40%', '55%'],
            // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
            layoutSize: 710,
            label: {
              show: true,
              color: '#ecf6ff',
              fontSize: '12',
              align: 'right',
              position: 'right',
              verticalAlign: 'middle',
              offset: [90, 80]
            },
            itemStyle: {
              borderWidth: '2',
              borderColor: '#35a2d3'
            },
            select: {
              itemStyle: {
                areaColor: 'rgba(249,206,57,1)',
                borderWidth: '3',
                borderColor: '#35a2d3'
              }
            },
            emphasis: {
              itemStyle: {
                areaColor: 'rgba(249,206,57,1)'
              }
            },
            data: this.mapData
          }
        ]
      }
      mydom.setOption(this.option)
    }
  }
}
</script>
<style lang="less" scoped>
.center_map_wrap {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
}

.shanxi_map {
  width: 100%;
  height: 93%;
  border:1px solid red;
}

.map_title_block {
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  img {
    width: 50px;
    height: 50px;
  }
  .title_value {
    margin-left: 10px;
    .sum_item {
      color: rgba(0, 252, 255, 1);
      font-size: 28px;
      font-weight: bold;
    }
    .title {
      color: #fff;
      font-size: 16px;
    }
    .year_box {
      display: inline-block;
      padding: 0px 10px;
      font-size: 12px;
      border: 1px solid rgba(64, 216, 150, 1);
      color: rgba(64, 216, 150, 1);
      background: rgba(64, 216, 150, 0.2);
      border-radius: 2px;
      line-height: 12px;
    }
  }
}
</style>
