<template>
  <div>
    <div class="area_charts" :class="domClass"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { getArrByKey } from '@/utils'
export default {
  props: {
    chartsData: {
      type: Object,
      default: () => {}
    },
    domClass: {
      type: String,
      default: 'area_charts'
    }
  },
  computed: {
    nyData() {
      return this.getArrByKey(this.chartsData.NYQS, 'value') || []
    },
    fnyData() {
      return this.getArrByKey(this.chartsData.FNYQS, 'value') || []
    },
    cityData() {
      let fny = this.chartsData.FNYQS
      console.log(fny)
      return this.getArrByKey(fny, 'name') || []
    }
  },
  watch: {
    fnyData() {
      this.initCharts()
    }
  },
  mounted() {
    //在这个生命周期中初始化
    this.initCharts()
  },
  methods: {
    getArrByKey,
    initCharts() {
      var option_data = {
        item0: {
          unit: '个',
          data: this.nyData,
          name: '农业取水口',
          freq: '年度',
          axis: []
        },
        item1: {
          unit: '个',
          data: this.fnyData,
          name: '非农业取水口',
          freq: '年度',
          axis: []
        },
        legend: ['农业取水口', '非农业取水口'],
        // 西安市 铜川市 宝鸡市 咸阳市 渭南市 延安市  汉中市  榆林市 安康市  商洛市
        dates: this.cityData
      }

      // 初始化option的方法
      function initVisualizer(x_value) {
        return {
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
              var res =
                params.name + '<br/>' + params.seriesName + ' : ' + params.value
              if (params.seriesName == option_data.legend[0]) {
                return res + option_data.item0.unit
              } else if (params.seriesName == option_data.legend[1]) {
                return res + option_data.item1.unit
              }
            }
          },
          grid: {
            left: '16%',
            top: '6%',
            right: '5%',
            bottom: '15%'
          },
          legend: {
            orient: 'horizontal',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 30,
            y: '0%',
            textStyle: {
              // 图例文字的样式
              color: '#fff',
              fontSize: 12,
              padding: [2, 0, 0, 2],
              fontFamily: '微软雅黑',
              fontWeight: 'normal'
            },
            data: option_data['legend'],
            show: true
          },
          xAxis: {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            nameTextStyle: {
              fontSize: 14
            },
            axisLabel: {
              textStyle: {
                color: '#fff',
                fontSize: 14,
                fontFamily: '微软雅黑',
                fontWeight: 'normal'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#194A78'
              }
            }
          },
          yAxis: {
            type: 'category',
            inverse: true, //数据倒序
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            },
            interval: false,
            data: option_data.dates
          },
          series: [
            {
              //指标1
              name: option_data.item0.name,
              type: 'bar',
              z: 1,
              barWidth: 12,
              barGap: '20%',
              barCategoryGap: '2%',
              symbolOffset: [0, -6],
              offset: 0,
              data: option_data.item0.data,
              itemStyle: {
                normal: {
                  color: {
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    type: 'linear',
                    global: false,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(64,216,150,0.1)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(64,216,150,1)'
                      }
                    ]
                  },
                  opacity: 0.8
                }
              }
            },
            {
              //指标2
              type: 'bar',
              z: 2,
              barWidth: 12,
              barGap: '40%',
              symbolOffset: [0, 6],
              offset: 20,
              name: option_data.item1.name,
              data: option_data.item1.data,
              itemStyle: {
                normal: {
                  color: {
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    type: 'linear',
                    global: false,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(42,146,234,0.1)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(42,146,234,1)'
                      }
                    ]
                  },
                  opacity: 0.8
                }
              }
            }
          ]
        }
      }
      // 首次初始化option
      var chart0 = this.$echarts.init(
        document.getElementsByClassName(this.domClass)[0]
      )
      chart0.setOption(initVisualizer([-21.5, 0, 21.5]))
    }
  }
}
</script>
<style lang="less" scoped>
.area_charts {
  display: flex;
  width: 100%;
  height: 610px;
  padding-bottom: 30px;
  margin: auto;
}
</style>
