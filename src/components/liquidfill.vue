<template>
  <div :class="domClass" ref="hygrometer"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'shuiqiutu',
  props: {
    domClass: {
      type: String,
      default: 'liquidFill'
    },
    graphName: {
      type: String,
      default: '净用水量总量'
    },
    graphValue: {
      type: String,
      default: ''
    },
    radius: {
      type: String,
      default: '40%'
    },
    center: {
      type: Array,
      default: () => ['50%', '50%']
    },
    sum: {
      type: Number,
      default: 0
    },
    graphic: {
      type: Object,
      default: () => {
        return { left: '34%', top: '60%' }
      }
    }
  },
  mounted() {
    //在这个生命周期中初始化
    if (this.sum) {
      this.liquidFill()
    }
  },
  watch: {
    sum(val) {
      if (val) {
        this.liquidFill()
      }
    }
  },
  methods: {
    liquidFill() {
      //方法
      var liquid = this.$echarts.init(
        document.getElementsByClassName(this.domClass)[0]
      )

      let sum = this.sum
      let currentVal = Number(this.graphValue.split('(')[0])
      let val = Number((currentVal / sum).toFixed(4))
      let perVal = (val * 100).toFixed(2)
      var data = [val, val, val]
      var option = {
        // 图表主标题
        // 提示框组件
        tooltip: {
          show: false,
          trigger: 'item', // 触发类型, 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          textStyle: {
            color: '#fff' // 文字颜色
          },
          // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
          // 水球图: {a}（系列名称），{b}（无），{c}（数值）
          // 使用函数模板   传入的数据值 -> value: number|Array,
          formatter: function(params) {
            // console.log(222, params.data)
            return params.seriesName + ': ' + perVal + '%'
          }
        },
        graphic: [
          {
            type: 'group',
            left: this.graphic.left,
            top: this.graphic.top,
            children: [
              {
                type: 'text',
                z: 100,
                left: 'center',
                top: '25',
                style: {
                  fill: '#fff',
                  // params.data * 100 + '%'
                  text: this.graphValue + '(' + perVal + '%)',
                  fontWeight: 'bold',
                  font: '14px Microsoft YaHei'
                }
              },
              {
                type: 'text',
                z: 100,
                left: 'center',
                top: '65',
                style: {
                  fill: '#FFF',
                  text: this.graphName,
                  font: '12px Microsoft YaHei'
                }
              }
            ]
          }
        ],
        series: [
          {
            type: 'liquidFill',
            cursor: 'default',
            name: this.graphName, // 系列名称，用于tooltip的显示，legend 的图例筛选
            radius: this.radius, // 水球图的半径
            center: this.center, // 水球图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
            // 水填充图的形状 circle 默认圆形  rect 圆角矩形  triangle 三角形
            // diamond 菱形  pin 水滴状 arrow 箭头状  还可以是svg的path
            shape: 'circle',
            color: ['#3EABFF', '#fff'], // 波浪颜色、、#3EABFF
            phase: 50, // 波的相位弧度 不设置  默认自动
            amplitude: '10', //波的振幅
            direction: 'right', // 波浪移动的速度  两个参数  left 从右往左 right 从左往右
            outline: {
              show: true,
              borderDistance: 0, // 边框线与图表的距离 数字
              itemStyle: {
                opacity: 0.1, // 边框的透明度   默认为 1
                borderWidth: 2, // 边框的宽度
                shadowBlur: 1, // 边框的阴影范围 一旦设置了内外都有阴影
                shadowColor: '#fff', // 边框的阴影颜色,
                borderColor: '#1e5a7e' // 边框颜色
              }
            },
            // 图形样式
            itemStyle: {
              color: '#3EABFF', // 水球显示的背景颜色
              opacity: 0.7, // 波浪的透明度
              cursor: 'default',
              shadowBlur: 10 // 波浪的阴影范围
            },
            backgroundStyle: {
              color: '#3EABFF', // 水球未到的背景颜色
              opacity: 0.1, // 波浪的透明度
              borderWidth: 0,
              borderColor: 'rgba(26,108,177,0.1)'
            },
            // 图形上的文本标签
            label: {
              show: false
            },
            // 图形的高亮样式
            emphasis: {
              itemStyle: {
                cursor: 'default',
                opacity: 0.8 // 鼠标经过波浪颜色的透明度
              }
            },
            data: data
          }
        ]
      }
      liquid.setOption(option)
    }
  }
}
</script>
<style lang="less" scoped>
.liquidFill {
  width: 318px;
  height: 318px;
  background: url('../assets/overview/yuanshadow.png') no-repeat;
  background-size: 100% 100%;
  margin: auto;
}
</style>
