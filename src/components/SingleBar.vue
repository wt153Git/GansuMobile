<template>
  <div class="singleBarBox" :class="domClass"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    domClass: {
      type: String,
      default: 'singleBarBox'
    },
    color: {
      type: Array,
      default: () => ['rgba(0,0,0,.1)', 'rgba(38,149,237,1)']
    },
    total: {
      type: Number,
      default: 40000
    },
    chartsData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  mounted() {
    //在这个生命周期中初始化
    this.initCharts()
  },
  watch: {
    chartsData(val) {
      if (val) {
        this.initCharts()
      }
    }
  },
  methods: {
    initCharts() {
      var total = this.total // 数据总数
      var datas = []
      this.chartsData.forEach(value => {
        datas.push(value.value)
      })
      let option = {
        // backgroundColor: '#071347',
        xAxis: {
          max: total,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 0,
          top: 0, // 设置条形图的边距
          right: 0,
          bottom: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function(params) {
            return params[0].data.value
          }
        },
        yAxis: [
          {
            type: 'category',
            inverse: false,
            stack: '1',
            data: this.chartsData,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }
        ],
        series: [
          {
            // 内
            type: 'bar',
            stack: '0',
            barWidth: 17,
            silent: true,
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
                      color: this.color[0]
                    },
                    {
                      offset: 1,
                      color: this.color[1]
                    }
                  ]
                },
                opacity: 0.8
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            data: this.chartsData,
            z: 1,
            animationEasing: 'elasticOut'
          }
        ]
      }
      var mydom = this.$echarts.init(
        document.getElementsByClassName(this.domClass)[0]
      )
      mydom.setOption(option)
    }
  }
}
</script>
<style lang="less" scoped>
.singleBarBox {
  display: flex;
  width: 100%;
  height: 30px;
  margin: 4px auto 6px;
}
</style>
