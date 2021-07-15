<template>
  <div>
    <div>
      <div style="display: flex">
        <div style="flex: 1; width: 563px" class="common_box">
          <Title :title="'全省态势'"></Title>
          <!-- <h4 class="title-left">全省24小时事件发生趋势</h4> -->
          <second-title
            :title="'全省24小时事件发生趋势'"
            class="sub_title_block"
          ></second-title>
          <div class="title-left">
            <div id="lineChart" style="width: 100%; height: 417px;"></div>
          </div>
          <!-- <h4 class="title-left">今日发布预警百分比</h4> -->
          <second-title
            :title="'今日发布预警百分比'"
            class="sub_title_block"
          ></second-title>
          <div class="title-left">
            <category-pie :echartData="datas"></category-pie>
          </div>
        </div>
        <div style="flex: 1; width: 563px; margin: 0 20px" class="common_box">
          <Title :title="'各市今日事件分析'"></Title>
          <!-- <h4 class="title-left">各市今日事件数量排行</h4> -->
          <second-title
            :title="'各市今日事件数量排行'"
            class="sub_title_block"
          ></second-title>
          <div class="title-left">
            <el-table :data="tableData" style="width: 100%; height: 417px;">
              <el-table-column label="排序" width="80">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="市区" width="130">
              </el-table-column>
              <el-table-column label="事件数量">
                <template slot-scope="scope">
                  <!-- <el-progress
                    :percentage="scope.row.num"
                    :format="format"
                  ></el-progress> -->
                  <BarProcess
                    :val="Number(scope.row.num)"
                    :sum="maxData"
                  ></BarProcess>
                </template>
              </el-table-column>
              <el-table-column prop="" label="" width="100">
                <template slot-scope="scope">
                  {{ scope.row.num }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- <h4 class="title-left">各市今日发布预警</h4> -->
          <second-title
            :title="'各市今日发布预警'"
            class="sub_title_block"
          ></second-title>
          <div class="title-left">
            <!-- <pictorial-bar :barData="barDataArray"></pictorial-bar> -->
            <div
              id="citiesWarningToday"
              style="width: 100%; height: 400px"
            ></div>
          </div>
        </div>
        <div style="flex: 1; width: 563px" class="common_box">
          <Title :title="'各部门今日事件分析'"></Title>
          <!-- <h4 class="title-left">各部门今日事件数量排行</h4> -->
          <second-title
            :title="'各部门今日事件数量排行'"
            class="sub_title_block"
          ></second-title>
          <div
            class="title-left"
            style="padding: 0 50px; color: #c0c4cc; height: 417px;"
          >
            <el-row
              class="list-item"
              :class="[
                !index
                  ? 'the-first-item'
                  : index === 1
                  ? 'second-item'
                  : index === 2
                  ? 'third-item'
                  : ''
              ]"
              v-for="(item, index) in deptList"
              :key="index"
            >
              <el-col
                :span="4"
                >{{ index &lt; 9 ?'No.0'+Number((index+1)):'No.'+Number((index+1)) }}</el-col
              >
              <el-col :span="16">{{ item.name }}</el-col>
              <el-col :span="4">{{ item.num }}</el-col>
            </el-row>
          </div>
          <!-- <h4 class="title-left">各部门今日事件处置率</h4> -->
          <second-title
            :title="'各部门今日事件处置率'"
            class="sub_title_block"
          ></second-title>
          <div class="title-left">
            <div id="disposalRate" style="width: 100%; height: 400px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Title from './Title'
import SecondTitle from './SecondTitle.vue'
import CategoryPie from './Category.vue'
// import PictorialBar from './PictorialBar.vue'
import BarProcess from '@/components/BarProcess'
import _ from 'lodash'
import echarts from 'echarts'
export default {
  components: {
    Title,
    SecondTitle,
    CategoryPie,
    BarProcess
    // PictorialBar
  },
  data() {
    return {
      deptList: [
        {
          name: '省政府办公厅',
          num: '63件'
        },
        {
          name: '省安全生产监督管理局',
          num: '46件'
        },
        {
          name: '省公安厅',
          num: '44件'
        },
        {
          name: '省民政厅',
          num: '39件'
        },
        {
          name: '省国土资源厅',
          num: '34件'
        },
        {
          name: '省水利厅',
          num: '31件'
        },
        {
          name: '省农牧厅',
          num: '29件'
        },
        {
          name: '省林业厅',
          num: '26件'
        },
        {
          name: '省防汛抗旱指挥部',
          num: '24件'
        },
        {
          name: '省减灾委员会',
          num: '19件'
        },
        {
          name: '省抗震救灾指挥部',
          num: '16件'
        },
        {
          name: '省森林防火指挥部',
          num: '6件'
        }
      ],
      datas: [
        {
          name: 'Ⅰ级',
          value: 10
        },
        {
          name: 'Ⅱ级',
          value: 30
        },
        {
          name: 'Ⅲ级',
          value: 40
        },
        {
          name: 'Ⅳ级',
          value: 20
        }
      ],
      barDataArray: [
        {
          name: '兰州',
          value: 85,
          percent: '33'
        },
        {
          name: '嘉峪关',
          value: 34,
          percent: '13.2'
        },
        {
          name: '金昌',
          value: 29,
          percent: '11.2'
        },
        {
          name: '白银',
          value: 28,
          percent: '10.9'
        },
        {
          name: '天水',
          value: 23,
          percent: '0.9'
        },
        {
          name: '武威',
          value: 12,
          percent: '0.5'
        },
        {
          name: '张掖',
          value: 10,
          percent: '0.4'
        },
        {
          name: '平凉',
          value: 8,
          percent: '0.3'
        },
        {
          name: '酒泉',
          value: 6,
          percent: '0.2'
        },
        {
          name: '庆阳',
          value: 6,
          percent: '0.2'
        },
        {
          name: '定西',
          value: 6,
          percent: '0.2'
        },
        {
          name: '陇南',
          value: 6,
          percent: '0.2'
        },
        {
          name: '临夏',
          value: 2,
          percent: '0.1'
        },
        {
          name: '甘南',
          value: 2,
          percent: '0.1'
        }
      ],
      tableData: [
        {
          name: '兰州',
          num: 85
        },
        {
          name: '嘉峪关',
          num: 34
        },
        {
          name: '金昌',
          num: 29
        },
        {
          name: '白银',
          num: 28
        },
        {
          name: '天水',
          num: 23
        },
        {
          name: '武威',
          num: 12
        },
        {
          name: '张掖',
          num: 10
        },
        {
          name: '平凉',
          num: 8
        },
        {
          name: '酒泉',
          num: 6
        },
        {
          name: '庆阳',
          num: 6
        },
        {
          name: '定西',
          num: 6
        },
        {
          name: '陇南',
          num: 6
        },
        {
          name: '临夏',
          num: 2
        },
        {
          name: '甘南',
          num: 2
        }
      ]
    }
  },
  computed: {
    maxData() {
      let arr = []
      this.tableData.forEach(item => {
        arr.push(Number(item.value))
      })
      return _.max(arr)
    }
  },
  watch: {},
  mounted() {
    this.extraOptionInit3()
    this.extraOptionInit5()
    this.extraOptionInit6()
  },
  methods: {
    extraOptionInit3() {
      var myChart = this.$echarts.init(document.getElementById('lineChart'))
      const _this = this
      var data = [
        {
          coords: [
            ['00:00', 3],
            ['02:00', 5],
            ['04:00', 11],
            ['06:00', 15],
            ['08:00', 53],
            ['10:00', 24],
            ['12:00', 30],
            ['14:00', 45],
            ['16:00', 28],
            ['18:00', 23],
            ['20:00', 50],
            ['22:00', 15],
            ['23:59', 12]
          ]
        }
      ]
      var img = [
        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC'
      ]
      var option = {
        color: '#0E5FCA',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow', // shadow
            label: {
              backgroundColor: '#6a7985'
            },
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(5,89,189,0)' // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255,255,255,1)' // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(4,174,159,0)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        },
        grid: {
          top: '18%',
          left: '5%',
          right: '5%',
          bottom: '14%'
          // containLabel: true
        },
        legend: {
          icon: 'none', // rect
          itemWidth: 20,
          itemHeight: 10,
          data: ['全省应急事件（件）'],
          left: 30,
          textStyle: {
            // fontSize: 18,//字体大小
            color: '#ffffff' //字体颜色
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: 'color:"#092b5d"'
              }
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              rotate: 45,
              textStyle: {
                color: '#ffffff',
                margin: 15
                // fontSize:14
              },
              formatter: function(data) {
                // return data + "时"
                return data
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              //网格线
              show: false
            },
            data: [
              '00:00',
              '02:00',
              '04:00',
              '06:00',
              '08:00',
              '10:00',
              '12:00',
              '14:00',
              '16:00',
              '18:00',
              '20:00',
              '22:00',
              '23:59'
            ]
          }
        ],
        yAxis: [
          {
            min: 0,
            // max: 100,
            splitLine: {
              show: false,
              lineStyle: {
                color: '#092b5d'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#092b5d'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#ffffff'
              },
              formatter: function(value) {
                if (value === 0) {
                  return value
                }
                return value
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '全省应急事件（件）',
            type: 'line',
            symbol: 'none', // circle默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: false,
            smooth: false,
            symbolSize: 8,
            lineStyle: {
              normal: {
                color: '#04AE9F' // 线条颜色
              },
              borderColor: 'rgba(0,0,0,.4)'
            },
            itemStyle: {
              color: 'rgba(14,30,73,1)',
              borderColor: '#646ace',
              borderWidth: 2
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: [' {a|{c}}'].join(','),
                rich: {
                  a: {
                    color: '#fff',
                    align: 'center'
                  }
                }
              }
            },
            tooltip: {
              show: true
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(25,163,223,1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(25,163,223, 0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
                shadowBlur: 20
                // shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                // shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: [3, 5, 11, 15, 53, 24, 30, 45, 28, 23, 50, 15, 12]
          },
          {
            name: '滑行的光点',
            type: 'lines',
            coordinateSystem: 'cartesian2d',
            symbolSize: 30,
            polyline: true,
            effect: {
              show: true,
              trailLength: 0,
              symbol: 'arrow',
              period: 10, //光点滑动速度
              symbolSize: 150,
              symbol: img[0]
            },
            lineStyle: {
              normal: {
                width: 1,
                opacity: 0.6,
                curveness: 0.2
              }
            },
            data: data
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    /*     extraOptionInit4() {
          var myChart = this.$echarts.init(document.getElementById('warningToday'))
          const chartPieColors = [
            [
              {
                offset: 0,
                color: 'rgba(234,180,165,0.1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(237,64,5,1)' // 100% 处的颜色
              }
            ],
            [
              {
                offset: 0,
                color: 'rgba(36,70,116,0.1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(255,185,1,1)' // 100% 处的颜色
              }
            ],
            [
              {
                offset: 0,
                color: 'rgba(234,255,92,1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(240,247,173,0.1)' // 100% 处的颜色
              }
            ],
            [
              {
                offset: 0,
                color: 'rgba(1,181,233,1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(180,229,245,0.1)' // 100% 处的颜色
              }
            ]
          ]
          let datas = [
            {
              name: 'Ⅰ级',
              value: 10
            },
            {
              name: 'Ⅱ级',
              value: 30
            },
            {
              name: 'Ⅲ级',
              value: 50
            },
            {
              name: 'Ⅳ级',
              value: 20
            }
          ]
          let seriesData = datas.map((item, index) => {
            return {
              value: item.value,
              name: item.name,
              itemStyle: {
                borderWidth: 3,
                borderColor: '#182037',
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops:
                    chartPieColors[
                      index > 8 ? Math.floor(Math.random() * 8 + 1) : index
                    ],
                  global: false // 缺省为 false
                }
              }
            }
          })
          var color = [
            '#0CD2E6',
            '#3751E6',
            '#FFC722',
            '#886EFF',
            '#008DEC',
            '#114C90',
            '#00BFA5'
          ]
    
          var title = '54%'
          var legend = ['Ⅰ级', 'Ⅱ级', 'Ⅲ级', 'Ⅳ级']
    
          // var seriesData = [
          //   { "name": "Ⅰ级", "value": 30 },
          //   { "name": "Ⅱ级", "value": 10 },
          //   { "name": "Ⅲ级", "value": 15 },
          //   { "name": "Ⅳ级", "value": 23 }
          // ]
          var option = {
            // backgroundColor: '#050e31',
            // color: color,
            title: {
              text: '{name|' + title + '}\n{val|' + '四级预警' + '}',
              top: 'center',
              left: '25%',
              textStyle: {
                rich: {
                  name: {
                    fontSize: 26,
                    fontWeight: 'normal',
                    color: '#fff',
                    padding: [0, 0]
                  },
                  val: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#fff'
                  }
                }
              }
            },
            grid: {
              top: '15%',
              left: 0,
              right: '2%',
              bottom: 5,
              containLabel: true
            },
            legend: {
              orient: 'vertical',
              top: 'center',
              // icon:'none',
              right: 30,
              textStyle: {
                align: 'left',
                verticalAlign: 'middle',
                rich: {
                  name: {
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 14
                  },
                  value: {
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 14
                  },
                  rate: {
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: 14
                  }
                }
              },
              data: legend,
              formatter: name => {
                if (seriesData.length) {
                  const item = seriesData.filter(item => item.name === name)[0]
                  // return `{name|${name}：}{value| ${item.value}} {rate| ${item.value}%}`;
                  return `{rate| ${item.value}%}    {name|${name}预警} `
                }
              }
            },
            series: [
              {
                name: '需求类型占比',
                type: 'pie',
                center: ['30%', '50%'],
                radius: ['45%', '65%'],
                label: {
                  normal: {
                    show: true,
                    position: 'outer',
                    // formatter: '{value|{c}}\n{label|{b}}',
                    rich: {
                      value: {
                        padding: 40,
                        align: 'center',
                        verticalAlign: 'middle',
                        fontSize: 32
                      },
                      label: {
                        align: 'center',
                        verticalAlign: 'middle',
                        fontSize: 24
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
                labelLine: {
                  show: false,
                  length: 0,
                  length2: 10
                },
                data: seriesData
              }
            ]
          }
    
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option)
          getDefaultSelected(myChart)
    
          function getDefaultSelected(myChart) {
            let index = 0
            myChart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: 0
            })
            myChart.on('mouseover', e => {
              if (e.dataIndex !== index) {
                myChart.dispatchAction({
                  type: 'downplay',
                  seriesIndex: 0,
                  dataIndex: index
                })
              }
            })
            myChart.on('mouseout', e => {
              index = e.dataIndex
              myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: e.dataIndex
              })
            })
          }
        }, */
    extraOptionInit5() {
      const _this = this
      var myChart = _this.$echarts.init(
        document.getElementById('citiesWarningToday')
      )

      var sum = 0

      var rich = {
        white: {
          color: '#fff',
          align: 'center',
          fontWeight: 'bold',
          padding: [3, 0]
        }
      }
      var placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0
        }
      }
      let angle = 0 //角度，用来做简单的动画效果的
      var data = []
      var data1 = []
      var color1 = [
        '#287CE8',
        '#32B8F0',
        '#32B8F0',
        '#41E4DE',
        '#3F6ADF',
        '#C0C4CC',
        '#9B8FFF',
        '#FB776F',
        '#FF62B1',
        '#F7A859',
        '#60D8FF',
        '#63FD83'
      ]

      for (var i = 0; i < _this.barDataArray.length; i++) {
        sum += _this.barDataArray[i].value

        data.push(
          {
            value: _this.barDataArray[i].value,
            name: _this.barDataArray[i].name,
            itemStyle: {
              normal: {
                borderWidth: 4,
                shadowBlur: 10,
                // borderColor:color1[i],
                shadowColor: color1[i],
                color: color1[i],
                opacity: 0.75
              }
            }
          },
          {
            value: _this.barDataArray[i].value / 50,
            name: '',
            itemStyle: placeHolderStyle
          }
        )

        data1.push(
          {
            value: _this.barDataArray[i].value,
            name: _this.barDataArray[i].name,
            itemStyle: {
              normal: {
                borderWidth: 4,
                // shadowBlur: 10,
                // borderColor:color1[i],
                // shadowColor: color1[i],
                color: color1[i],
                opacity: 0.3
              }
            }
          },
          {
            value: _this.barDataArray[i].value / 50,
            name: '',
            itemStyle: placeHolderStyle
          }
        )
      }
      var seriesObj = [
        {
          name: '',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function(params, api) {
            return {
              type: 'arc',
              shape: {
                // cx: api.getWidth() / 3,
                // cy: api.getHeight() / 3,
                // r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                cx: 150,
                cy: 200,
                r: Math.min(130, 115),
                startAngle: ((45 + -angle) * Math.PI) / 180,
                endAngle: ((180 + -angle) * Math.PI) / 180
              },
              style: {
                stroke: '#0CD3DB',
                fill: 'transparent',
                lineWidth: 1.5
              },
              silent: true
            }
          },
          data: [0]
        },
        {
          name: '', //绿点
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function(params, api) {
            // let x0 = api.getWidth() / 3;
            // let y0 = api.getHeight() / 3;
            // let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
            let x0 = 150
            let y0 = 200
            let r = Math.min(130, 115)
            let point = getCirlPoint(x0, y0, r, 180 + -angle)
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 2
              },
              style: {
                stroke: '#0CD3DB', //绿
                fill: '#0CD3DB'
              },
              silent: true
            }
          },
          data: [0]
        },
        {
          name: '',
          type: 'pie',
          clockWise: true,
          center: ['30%', '50%'],
          // radius: ['45%', '65%'],
          radius: [140, 130],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: false,
                position: 'inner',
                fontWeight: 'bold',
                formatter: function(params) {
                  var percent = 0
                  var total = 0
                  for (var i = 0; i < _this.barDataArray.length; i++) {
                    total += _this.barDataArray[i].value
                  }
                  percent = ((params.value / total) * 100).toFixed(0)
                  if (params.name !== '') {
                    return params.name + '\n{white|' + '占比' + percent + '%}'
                  } else {
                    return ''
                  }
                },
                rich: rich
              },
              labelLine: {
                show: false
              }
            }
          },
          data: data
        },
        {
          name: '',
          type: 'pie',
          clockWise: true,
          center: ['30%', '50%'],
          // radius: ['45%', '65%'],
          radius: [110, 130],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: false,
                position: 'inner',
                fontWeight: 'bold',
                formatter: function(params) {
                  var percent = 0
                  var total = 0
                  for (var i = 0; i < _this.barDataArray.length; i++) {
                    total += _this.barDataArray[i].value
                  }
                  percent = ((params.value / total) * 100).toFixed(0)
                  if (params.name !== '') {
                    // return params.name + '\n{white|' + '占比' + percent + '%}'
                    return params.name + '\n{white|' + '占比' + percent + '%}'
                  } else {
                    return ''
                  }
                },
                rich: rich
              },
              labelLine: {
                show: false
              }
            }
          },
          data: data1
        }
      ]
      var value = '257'
      var option = {
        title: {
          text: '{a|' + value + '}\n{c|' + '  总数(件)' + '}',
          x: '23%',
          y: '40%',
          textStyle: {
            rich: {
              a: {
                fontSize: 36,
                color: '#ffffff'
              },

              c: {
                fontSize: 14,
                color: '#ffffff',
                padding: [5, 0]
              }
            }
          }
        },
        // backgroundColor: '#07142280',
        tooltip: {
          trigger: 'item',
          // formatter: '{b}({d}%)',
          formatter: params => {
            // return `{name|${name}：}{value| ${item.value}} {rate| ${item.value}%}`;
            return `${params.name}:<br/>今日预警数:${params.value}件`
          }
        },
        legend: {
          show: true,
          top: '5%',
          right: 0,
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          // itemGap: 30,
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          formatter: name => {
            if (_this.barDataArray.length - 1) {
              const item = _this.barDataArray.filter(
                item => item.name === name
              )[0]
              // return `{name|${name}：}{value| ${item.value}} {rate| ${item.value}%}`;
              return `${name}    ${item.percent}%`
            }
          }
        },
        toolbox: {
          show: false
        },
        series: seriesObj
      }

      //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
      function getCirlPoint(x0, y0, r, angle) {
        let x1 = x0 + r * Math.cos((angle * Math.PI) / 180)
        let y1 = y0 + r * Math.sin((angle * Math.PI) / 180)
        return {
          x: x1,
          y: y1
        }
      }

      function draw() {
        angle = angle - 5
        myChart.setOption(option, true)
        //window.requestAnimationFrame(draw);
      }

      setInterval(function() {
        //用setInterval做动画感觉有问题
        draw()
      }, 100)

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    extraOptionInit6() {
      var myChart = this.$echarts.init(document.getElementById('disposalRate'))
      var option = {
        title: {
          text: '{name|' + '单位' + '}{val|' + '%' + '}',
          top: 5,
          left: 50,
          textStyle: {
            rich: {
              name: {
                fontSize: 16,
                fontWeight: 'normal',
                color: '#fff',
                padding: [0, 0]
              },
              val: {
                fontSize: 12,
                fontWeight: 'bold',
                color: '#fff'
              }
            }
          }
        },
        color: '#0E5FCA',
        grid: {
          top: '12%',
          // left: 0,
          // right: '2%',
          bottom: 10,
          containLabel: true
        },
        showSymbol: false,
        label: {
          show: false,
          position: 'top',
          textStyle: {
            //数值样式
            color: '#fff',
            fontSize: 18
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: [
            '省政府办公厅',
            '省安全生产监督管理局',
            '省公安厅',
            '省民政厅',
            '省国土资源厅',
            '省水利厅',
            '省农牧厅',
            '省林业厅',
            '省防汛抗旱指挥部',
            '省减灾委员会',
            '省抗震救灾指挥部',
            '省森林防火指挥部'
          ],
          axisLabel: {
            formatter: '{value}',
            rotate: 90,
            textStyle: {
              //改变刻度字体样式
              color: '#fff',
              textAlign: 'center',
              fontSize: 14
            }
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            //y轴刻度线
            show: false
          },
          splitLine: {
            //网格线
            show: false
          },
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              //改变刻度字体样式
              color: '#fff',
              textAlign: 'center'
            }
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: 20,
            data: [30, 50, 70, 80, 70, 36, 68, 70, 68, 46, 37, 29],
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#315e91' // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: '#10274D' // 50% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#061328' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="less" scoped>
.the-first-item {
  color: #f62942;
}
.second-item {
  color: #ff4e00;
}
.third-item {
  color: #ffb71b;
}
.title-left {
  padding: 0 30px;
  font-size: 18px;
  margin-top: 20px;
}
.list-item {
  height: 30px;
  line-height: 30px;
}
/deep/.el-table {
  font-size: 18px;
}
/deep/.el-table th,
/deep/.el-table tr,
/deep/.el-table,
/deep/.el-table__expanded-cell {
  color: #fff;
  background-color: #07142280;
}
/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #07142280;
}
/deep/ .el-table td,
/deep/.el-table th.is-leaf {
  border: none;
}
/deep/.el-table::before {
  height: 0;
}
/deep/.el-table td,
/deep/.el-table th {
  padding: 2px 0;
}
/deep/.el-progress__text {
  color: #fff;
}

// 进度条背景色
/deep/div.el-progress-bar__inner {
  background-color: #4e85c5;
}
.sub_title_block {
  margin-top: 20px;
}
</style>
