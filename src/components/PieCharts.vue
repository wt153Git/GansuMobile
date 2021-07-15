<template>
  <div>
    <div
      v-if="pieData && pieData.length"
      class="pie_charts"
      :class="domClass"
    ></div>
    <div class="tip" v-if="pieData.length === 0">
      暂无数据
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {}
  },
  props: {
    colorArr: {
      type: Array,
      default: () => [
        'rgba(2,99,255,1)',
        'rgba(255,119,35,1)',
        'rgba(230,221,145,1)',
        'rgba(106,113,255,1)',
        'rgba(51,191,143,1)'
      ]
    },
    name: {
      type: String,
      default: ''
    },
    domClass: {
      type: String,
      default: 'pie_charts'
    },
    pieData: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    pieData: {
      handler(val) {
        if (val && val.length) {
          this.$nextTick(() => {
            this.initCharts()
          })
        } else {
          console.log(33, val)
        }
      },
      immediate: true
    }
  },
  methods: {
    getRich() {
      let scale = 0.9
      let result = {}
      this.colorArr.forEach((v, i) => {
        ;(result[`value${i}`] = {
          color: '#fff',
          align: 'left',
          fontSize: 10 * scale,
          padding: [2, 2]
        }),
          (result[`normal${i}`] = {
            fontSize: 12 * scale,
            align: 'left',
            padding: [2, 2],
            color: '#fff'
          })
      })
      return result
    },
    initCharts() {
      let aa = ''
      let pieData = this.pieData
      let option = {
        color: this.colorArr,
        tooltip: {
          trigger: 'item',
          position: ['30%', '50%']
        },
        legend: {
          show: false,
          icon: 'none',
          top: '10%',
          left: '1%',
          orient: 'vertical',
          formatter: name => {
            return (
              '{title|' +
              name +
              '}\n{value|' +
              pieData.find(item => {
                return item.name == name
              }).value +
              '}{value|}'
            )
          },
          textStyle: {
            rich: {
              title: {
                fontSize: 10,
                lineHeight: 18,
                color: '#fff'
              },
              value: {
                fontSize: 10,
                lineHeight: 18,
                color: '#fff'
              }
            }
          }
        },
        grid: {
          left: '0%',
          top: '4%',
          right: '0%',
          bottom: '1%'
        },
        series: [
          {
            name: this.name,
            type: 'pie',
            radius: ['30%', '41%'],
            // this.domClass === 'huanghe' ? ['25%', '30%'] : ['30%', '41%'],
            center: ['50%', '50%'],
            selectedMode: 'single',
            selectedOffset: 10,
            // minAangle: 140,
            clockwise: true,
            z: 100,
            label: {
              show: true,
              normal: {
                formatter: function(params, ticket, callback) {
                  aa = params.dataIndex
                  var percent = 0
                  var total = 0
                  for (var i = 0; i < pieData.length; i++) {
                    total += pieData[i].value
                  }
                  percent = ((params.value / total) * 100).toFixed(0) + '%'
                  const index = params.dataIndex
                  // return [`{a${index}|${params.name}：${percent}}`].join('\n')
                  return [
                    `{value${index}|${params.name}} \n {normal${index}|${percent}}`
                  ].join('\n')
                },
                padding: [10, -70],
                rich: this.getRich()
              }
            },
            labelLine: {
              show: false,
              length: 18,
              length2: 45,
              lineStyle: {
                color: '#fff'
              }
            },
            data: this.pieData
          }
        ]
      }
      // 首次初始化option
      var mydom = this.$echarts.init(
        document.getElementsByClassName(this.domClass)[0]
      )
      mydom.setOption(option)
    }
  }
}
</script>
<style lang="less" scoped>
.pie_charts {
  width: 190px;
  height: 200px;
}

.tip {
  display: flex;
  justify-content: center;
  width: 227px;
  height: 194px;
  align-items: center;
}
</style>
