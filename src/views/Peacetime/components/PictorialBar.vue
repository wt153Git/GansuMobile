<template>
  <div v-if="showDom" :class="domClass"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    domClass: {
      type: String,
      default: 'bar1'
    },
    barData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    xAxisData() {
      let name = []
      if (this.barData && this.barData.length) {
        for (let i = 0; i < this.barData.length; i++) {
          name.push(this.barData[i].name)
        }
      }
      return name
    }
  },
  data() {
    return {
      showDom: true,
      colors: ['#19778c', '#b6987b', '#4c974c', '#365aa5', '#bf6262','#583691','#68550C','#5E5074','#D4734D','#D954DB','#114C90',  '#00BFA5']
    }
  },
  watch: {
    xAxisData: {
      handler(val) {
        this.showDom = false
        if (val && val.length) {
          this.showDom = true
          this.$nextTick(() => {
            this.initCharts()
          })
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    setSeriesBasicData() {
      let seriesData = []
      for (let i = 0; i < this.barData.length; i++) {
        seriesData.push({
          name: this.barData[i].name,
          value: this.barData[i].value,
          symbolPosition: 'end',
          label: {
            normal: {
              show: true,
              position: 'top',
              fontSize: 14,
              color: '#fff'
            }
          },
          itemStyle: {
            normal: {
              color: this.colors[i]
            }
          }
        })
      }
      return seriesData
    },
    setSeries6Data() {
      let seriesData = []
      for (let i = 0; i < this.barData.length; i++) {
        seriesData.push({
          name: this.barData[i].name,
          value: this.barData[i].value,
          itemStyle: {
            normal: {
              opacity: 0.5,
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0,255,245,0.5)'
                  },
                  {
                    offset: 1,
                    color: this.colors[i]
                  }
                ]
              }
            }
          }
        })
      }
      return seriesData
    },
    initCharts() {
      var mydom = this.$echarts.init(
        document.getElementsByClassName(this.domClass)[0]
      )
      let option = {
        grid: {
          top: '-15%',
          left: '5%',
          bottom: '5%',
          right: '0%',
          containLabel: true
        },
        tooltip: {
          show: false
        },
        xAxis: {
          type: 'category',
          data: this.xAxisData,
          show: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            interval: 0,
            rotate: 45,
            textStyle: {
              fontSize: 14,
              color: '#fff'
            },
            margin: 20
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: [
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [30, 15],
            symbolPosition: 'start',
            symbolOffset: [0, 6],
            legendHoverLink: false,
            cursor: 'default',
            z: 10,
            data: [
              {
                value: 50,
                symbol:
                  'image://' + require('../../../assets/overview/base1.png')
              },
              {
                value: 50,
                symbol:
                  'image://' + require('../../../assets/overview/base2.png')
              },
              {
                value: 50,
                symbol:
                  'image://' + require('../../../assets/overview/base3.png')
              },
              {
                value: 50,
                symbol:
                  'image://' + require('../../../assets/overview/base4.png')
              },
              {
                value: 50,
                symbol:
                  'image://' + require('../../../assets/overview/base5.png')
              },
              {
                value: 50,
                symbol:
                  'image://' + require('../../../assets/overview/base6.png')
              },
              {
                value: 50,
                symbol:
                  'image://' + require('../../../assets/overview/base7.png')
              },
              {
                value: 50,
                symbol:
                  'image://' + require('../../../assets/overview/base8.png')
              },
              {
                value: 50,
                symbol:
                  'image://' + require('../../../assets/overview/base9.png')
              },
              {
                value: 50,
                symbol:
                  'image://' + require('../../../assets/overview/base10.png')
              },
              {
                value: 50,
                symbol:
                  'image://' + require('../../../assets/overview/base11.png')
              },
              {
                value: 50,
                symbol:
                  'image://' + require('../../../assets/overview/base12.png')
              }
            ]
          },
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [30, '100%'],
            symbolPosition: 'center',
            legendHoverLink: false,
            cursor: 'default',
            z: 12,
            data: [
              {
                value: this.barData[0].value,
                symbol:
                  'image://' + require('../../../assets/overview/bar1.png')
              },
              {
                value: this.barData[1].value,
                symbol:
                  'image://' + require('../../../assets/overview/bar2.png')
              },
              {
                value: this.barData[2].value,
                symbol:
                  'image://' + require('../../../assets/overview/bar3.png')
              },
              {
                value: this.barData[3].value,
                symbol:
                  'image://' + require('../../../assets/overview/bar4.png')
              },
              {
                value: this.barData[4].value,
                symbol:
                  'image://' + require('../../../assets/overview/bar5.png')
              },
              {
                value: this.barData[5].value,
                symbol:
                  'image://' + require('../../../assets/overview/bar6.png')
              },
              {
                value: this.barData[6].value,
                symbol:
                  'image://' + require('../../../assets/overview/bar7.png')
              },
              {
                value: this.barData[7].value,
                symbol:
                  'image://' + require('../../../assets/overview/bar8.png')
              },
              {
                value: this.barData[8].value,
                symbol:
                  'image://' + require('../../../assets/overview/bar9.png')
              },
              {
                value: this.barData[9].value,
                symbol:
                  'image://' + require('../../../assets/overview/bar10.png')
              },
              {
                value: this.barData[10].value,
                symbol:
                  'image://' + require('../../../assets/overview/bar11.png')
              },
              {
                value: this.barData[11].value,
                symbol:
                  'image://' + require('../../../assets/overview/bar12.png')
              }
            ]
          },
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [30, 10],
            symbolOffset: [0, -6],
            symbol: 'circle',
            symbolPosition: 'end',
            cursor: 'default',
            legendHoverLink: false,
            z: 13,
            data: this.setSeriesBasicData()
          }
        ]
      }
      mydom.setOption(option)
    }
  }
}
</script>
<style lang="less" scoped>
.bar1 {
  display: flex;
  width: 98%;
  height:355px;
  margin: auto;
}
</style>
