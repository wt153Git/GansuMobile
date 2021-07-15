<template>
  <div class="category_charts" :class="domClass" ref="hygrometer"></div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    echartData: {
      type: Array,
      default: () => []
    },
    domClass: {
      type: String,
      default: 'category_charts'
    }
  },
  watch: {
    echartData: {
      handler(val) {
        if (val && val.length) {
          this.$nextTick(() => {
            this.initCharts()
          })
        }
      },
      immediate: true
    }
  },
  mounted() {
    //在这个生命周期中初始化
  },
  methods: {
    initCharts() {
      let color = ['#e31404', '#ff6f00', '#ffbb00', '#09aabe', '#86c200']

      // this.echartData.forEach(item => {
      //   item.value = item.value.split('个')[0]
      // })
      let echartData = this.echartData
      let name = echartData.map(item => item.name)
      let value = echartData.map(item => item.value)
      let formatNumber = function(num) {
        let reg = /(?=(\B)(\d{3})+$)/g
        return num.toString().replace(reg, ',')
      }
      let option = {
        grid: {
          top: '15%',
          right: '0'
        },
        tooltip: {
          trigger: 'item',
          formatter: '今日发布预警：{b}，百分比{d}%'
        },
        legend: {
          show: true,
          icon: 'none',
          top: '31%',
          right: '-5px',
          height: '220px',
          data: name,
          orient: 'vertical',
          formatter: name => {
            return (
              '{title|' +
              name +
              '}    {value|' +
              echartData.find(item => {
                return item.name == name
              }).value +
              '}{value|%}'
            )
          },
          textStyle: {
            rich: {
              title: {
                fontSize: 18,
                lineHeight: 30,
                color: ['red', 'blue']
              },
              value: {
                fontSize: 18,
                lineHeight: 30,
                color: '#fff'
              }
            }
          }
        },
        series: [
          // {
          //   type: 'pie',
          //   zlevel: 1,
          //   width: '450px',
          //   left: '-13%',
          //   silent: false, //不影响鼠标事件
          //   radius: ['94%', '95%'],
          //   // radius: ['94%', '95%'],
          //   label: {
          //     show: false
          //   },
          //   color: {
          //     type: 'linear',
          //     x: 0,
          //     y: 0,
          //     x2: 0,
          //     y2: 1,
          //     colorStops: [
          //       {
          //         offset: 0,
          //         color: '#091f39' // 0% 处的颜色
          //       },
          //       {
          //         offset: 1,
          //         color: '#091f39' // 100% 处的颜色
          //       }
          //     ],
          //     global: false // 缺省为 false
          //   },
          //   labelLine: {
          //     show: false
          //   },
          //   data: [1]
          // },
          // {
          //   type: 'pie',
          //   zlevel: 1,
          //   width: '450px',
          //   left: '-13%',
          //   silent: false, //不影响鼠标事件
          //   zlevel: 3,
          //   radius: ['82%', '83%'],
          //   label: {
          //     show: false
          //   },
          //   labelLine: {
          //     show: false
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: '#165a96', //0260F8
          //       borderWidth: 0,
          //       borderColor: 'rgba(0,0,0,0)'
          //     }
          //   },
          //   data: [2]
          // },
          {
            name: '今日发布预警',
            type: 'pie',
            width: '450px',
            left: '-13%',
            radius: ['52%', '73%'],
            zlevel: 4,
            avoidLabelOverlap: false,
            labelLine: {
              show: false
            },
            label: {
              normal: {
                show: false,
                position: 'center',
                formatter: '{text|{c}%}\n{b}预警',
                rich: {
                  text: {
                    align: 'center',
                    verticalAlign: 'middle',
                    padding: 8,
                    fontSize: 30,
                    color: '#fff'
                  },
                  value: {
                    align: 'center',
                    verticalAlign: 'middle',
                    fontSize: 20
                  }
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12'
                }
              }
            },
            color: color,
            data: echartData
          }
        ]
      }

      var mydom = this.$echarts.init(
        document.getElementsByClassName(this.domClass)[0]
      )
      mydom.setOption(option)
      // 饼图默认选中某一项，鼠标移动显示相应项
      // mydom.dispatchAction({ type: 'highlight', dataIndex: 1 }) // dataIndex属性伟data传入的索引值
      // mydom.on('mouseover', e => {
      //   if (e.dataIndex !== 1) {
      //     // 当鼠标移除的时候 使默认的索引值去除默认选中
      //     mydom.dispatchAction({ type: 'downplay', dataIndex: 1 })
      //   }
      // })
      // mydom.on('mouseout', e => {
      //   if (e.dataIndex !== 1) {
      //     // 当鼠标移除的时候 使默认的索引值去除默认选中
      //     mydom.dispatchAction({ type: 'highlight', dataIndex: 1 })
      //   }
      // })
      // start
      var timer = 0
      // let arr = this.echartData
      var dataLen = option.series[0].data.length
      console.log(888, dataLen)
      var currentIndex = -1
      setInterval(() => {
        //  计时器增加
        timer++
        if (timer == 5) {
          mydom.setOption({
            series: [
              {
                data: this.echartData
              }
            ]
          })
          timer = 1
        }
        // 取消之前高亮的图形
        mydom.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: currentIndex
        })
        currentIndex = (currentIndex + 1) % dataLen
        // 高亮当前图形
        mydom.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex
        })
        // 显示 tooltip
        mydom.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        })
      }, 1000)
      //       // end
    }
  }
}
</script>
<!-- category_charts -->
<style lang="less" scoped>
.category_charts {
  width: 470px;
  height: 400px;
  display: flex;
  color: #fff;
}
</style>
