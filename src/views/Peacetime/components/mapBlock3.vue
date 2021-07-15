<template>
  <div id="container"></div>
</template>
<script>
// import formItem from './components/mapDetailJson'
import $ from 'jquery'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentTab: '',
      markers: [],
      cluster: null,
      map: null,
      mass: null,
      icon: null,
      infoWindow: null
    }
  },
  watch: {
    list: {
      handler(val) {
        if (val.length) {
          this.$nextTick(() => {
            if (this.map) {
              this.initMark()
            } else {
              this.initMap()
              this.initMark()
            }
          })
        } else {
          this.$nextTick(() => {
            if (this.map) {
              // 清空标记点位
              this.resetMap()
            } else {
              this.initMap()
            }
          })
        }
      },
      immediate: true
    }
  },
  created() {
    window.setChartOrTable = this.setChartOrTable
  },
  methods: {
    setChartOrTable(type, dom, data) {
      let htmldom = dom
      // let chartWrap = '<div id="echartBox" class="beauty-scroll">loading...</div>'
      // htmldom += chartWrap
      // this.infoWindow.setContent(htmldom)
      this.currentTab = type
      setTimeout(() => {
        if (type === 'table') {
          $('#map_basicinfo_box').hide()
          $('#map_video_box').hide()
          $('#map_detail_box').show()
          $('#basic_btn').removeClass('actived_btn')
          $('#charts_btn').removeClass('actived_btn')
          $('#table_btn').addClass('actived_btn')
          $('#map_detail_box').css({
            'max-height': '600px',
            'min-height': '250px'
          })
        } else if (type === 'basic') {
          $('#map_basicinfo_box').show()
          $('#map_video_box').hide()
          $('#map_detail_box').hide()
          $('#basic_btn').addClass('actived_btn')
          $('#table_btn').removeClass('actived_btn')
          $('#charts_btn').removeClass('actived_btn')
        } else if (type === 'charts') {
          $('#map_basicinfo_box').hide()
          $('#map_detail_box').hide()
          $('#map_video_box').show()
          $('#charts_btn').addClass(' actived_btn')
          $('#basic_btn').removeClass('actived_btn')
          $('#table_btn').removeClass('actived_btn')
          $('#map_video_box').attr(
            'src',
            require('../../../assets/video/2.png')
          )
        }
      }, 500)
    },
    newIcon(type) {
      let icon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(26, 31),
        // 图标的取图地址
        image: require('../../../assets/IC/maker' + type + '.png'),
        // 图标所用图片大小
        imageSize: new AMap.Size(26, 31),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-26, -30)
      })
      return icon
    },
    initMap() {
      this.map = new AMap.Map('container', {
        zoom: 6.4, //初始地图级别
        resizeEnable: true,
        // center: [108.907295, 35.601474], //初始地图中心点
        center: [100.626621, 37.952195], //103.839374,36.065134
        mapStyle: 'amap://styles/darkblue',
        viewMode: '3D' //使用3D视图
      })
      this.map.setPitch(10)
      var map = this.map
      window.onload = function() {
        map.plugin(['AMap.ToolBar'], function() {
          map.addControl(new AMap.ToolBar({ position: 'RT' })) //地图控件位置
        })
      }
      // 自定义icon
      this.icon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(26, 31),
        // 图标的取图地址
        image: require('../../../assets/IC/maker1.png'),
        // 图标所用图片大小
        imageSize: new AMap.Size(26, 31),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-0, -0)
      })
      // 创建省份图层
      var disProvince
      function initPro() {
        let code = '620000' // 陕西省610000
        let dep = 2 // 2 县区 1市级
        let adCode = code
        let depth = dep
        disProvince && disProvince.setMap(null)
        disProvince = new AMap.DistrictLayer.Province({
          adcode: [code],
          depth: dep,
          styles: {
            fill: function(properties) {
              // properties为可用于做样式映射的字段，包含
              // NAME_CHN:中文名称  adcode_pro adcode_cit  adcode
              var adcode = properties.adcode
              return 'rgba(100,150,255,0.8)'
              // return 'rgb(0 ,25, 174)'
            },
            'province-stroke': 'rgb(0 ,25, 174)', //省边界线颜色
            'city-stroke': 'rgb(0 ,25, 174)', // 中国地级市边界线颜色
            'county-stroke': 'rgb(0 ,25, 174)' // 中国区县边界线颜色
          }
        })
        disProvince.setMap(map)
      }
      initPro()
    },
    removeMarkers() {
      //清除海量点
      // if (this.mass) {
      //   this.mass.clear()
      // }
      // 普通maker清空地图
      // this.map.clearMap()
      // this.map.remove(this.markers)
      // this.markers=[]
      // this.infoWindow.close() //关闭所有信息窗体
    },
    toMapItem(item) {
      this.infoWindow.close() //关闭所有信息窗体
      let lon = item.lon || item.end_lon
      let lat = item.lat || item.end_lat
      if (lon && lat && lon !== '0.0' && lat !== '0.0') {
        this.map.setCenter([lon, lat])
        this.map.setZoom(14)
      } else {
        this.$message.info('无位置信息')
      }
    },
    resetMap() {
      this.removeMarkers()
      this.map.setCenter([100.626621, 37.952195])
      this.map.setZoom(6.4)
      let infoWindowContent = document.getElementsByClassName(
        'amap-info-content'
      )[0]
      if (infoWindowContent) {
        infoWindowContent.style.display = 'none'
      }
    },
    newIcon2(type) {
      let icon = {
        url: require('../../../assets/IC/maker' + type + '.png'),
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(26, 31)
      }
      return icon
    },
    async initMark() {
      var map = this.map
      // closeWhenClickMap 点击地图其他区域，关闭窗体信息，默认不关闭
      this.infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(26, 13),
        anchor: 'middle-left', //窗体出现的基准方向
        autoMove: true,
        closeWhenClickMap: true
      })
      let infoWindow = this.infoWindow
      this.resetMap()
      let list = this.list
      let style = []
      let validList = []
      this.markers = [] //所有点
      if (list && list.length) {
        list.forEach((item, ind) => {
          let lon = item.lon || item.end_lon || ''
          let lat = item.lat || item.end_lat || ''
          if (lon && lat && lon !== '0.0' && lat !== '0.0') {
            item.lnglat = [lon, lat]
            let icon = item.index ? this.newIcon2(item.index) : this.icon
            item.style = ind
            style.push(icon)
            validList.push(item)
            let marker = new AMap.Marker({
              position: [lon, lat],
              // data: item,
              map: map,
              offset: new AMap.Pixel(-11, -11),
              icon: icon
            })
             marker.setMap(map);
            marker.data = item
            this.markers.push(marker)
            // marker.on('click', e => {
            marker.on('click', function(e) {
              let myTitle = ''
              let showItem = [
                { key: '事件编号', val: '01020001' },
                { key: '事件标题', val: '建东街建材市场火灾' },
                { key: '事件类型', val: '事故灾难' },
                {
                  key: '事件级别',
                  val: 'IV级'
                },
                {
                  key: '报送单位',
                  val: '兰州市消防总队'
                },
                {
                  key: '事件简报',
                  val:
                    '火灾发生于建东街建材库房晚上23:56左右，目前暂无人员伤亡，附近救援人员已抵达。'
                }
              ]
              let showItemDetail = [
                { key: '报送时间', val: '2021/6/9 23:56' },
                { key: '报送人员', val: '榆中县消防救援大队一李四' },
                { key: '出警时间', val: '2021/6/9 23:57' },
                {
                  key: '事件详情',
                  val:
                    '火灾发生于建东街建材库房,火灾起因是工作人员烟头随意丢弃,引燃建材木板。' +
                    '由于库房中保存有大量的木质建材、油漆等易燃物品,火势蔓延速度较快,十五分钟内已覆盖整个库房。' +
                    '23点56分榆中县消防救援大队接线员张三接到报警后,立即将事故报送至应急系统,系统随即下发任务,23点57分出警。' +
                    +'0:12分消防官兵到达火灾现场,在现场负责人卡门指挥下进行紧急救援消防任务。' +
                    '0:25分火情得到控制,人员全部疏散完成,无人员伤亡。'
                }
              ]
              let shwoTitlekey = ''
              console.log(88888, e)
              // let data =
              //   e.data || e.target.data || e.target.w.data || e.target.Ce.data
              // myTitle = '<div class="info_title">建东街建材市场火灾</div>'
              // let basicInfo = ''
              // for (let i = 0; i < showItem.length; i++) {
              //   basicInfo +=
              //     '<div class="info_row"><span class="info_lable">' +
              //     showItem[i].key +
              //     '：</span>' +
              //     showItem[i].val +
              //     '</div>'
              // }
              // basicInfo = '<div id="map_basicinfo_box">' + basicInfo + '</div>'
              // let detailRow = ''
              // for (let j = 0; j < showItemDetail.length; j++) {
              //   detailRow +=
              //     '<div class="info_row"><span class="info_lable">' +
              //     showItemDetail[j].key +
              //     '：</span>' +
              //     showItemDetail[j].val +
              //     '</div>'
              // }
              // detailRow =
              //   '<div id="map_detail_box" style="display:none;">' +
              //   detailRow +
              //   '</div>'
              // let videoRow =
              //   '<img style="display:none;" src="../../../assets/video/2.png" id="map_video_box" />'
              // let buttonGroup =
              //   '<div class="flex-space-between btn_row">' +
              //   `<input type="button" id="basic_btn" class="tabBtn actived_btn" value="事件概要" onclick="setChartOrTable('basic',basicDom)"/>` +
              //   `<input type="button" id="charts_btn" class="tabBtn" value="查看监控" onclick="setChartOrTable('charts',basicDom)"/>` +
              //   `<input type="button" id="table_btn" class="tabBtn" value="查看详情" onclick="setChartOrTable('table',basicDom)"></div>` +
              //   '</div>'
              // window.basicDom =
              //   '<div class="beauty-scroll">' +
              //   myTitle +
              //   basicInfo +
              //   detailRow +
              //   videoRow +
              //   buttonGroup +
              //   '</div>'
              // let myHtml = basicDom
              // infoWindow.setContent(myHtml)
              // console.log(999, e)
              // infoWindow.open(map, e.data.lnglat)
            })
          }
        })
      }
      // var mass = new AMap.MassMarks(validList, {
      //   opacity: 1,
      //   zIndex: 111,
      //   cursor: 'pointer',
      //   style: style
      // })

      // this.mass = mass
      // mass.setMap(map)
      // this.addCluster()
    },
    // 点聚合
    addCluster() {
      if (this.cluster) {
        cluster.setMap(null)
      }
      this.cluster = new AMap.MarkerClusterer(this.map, this.markers, {
        gridSize: 80
      })
    }
  }
}
</script>
<style lang="less" scoped>
::v-deep#container {
  // width: 5020px;
  width: 100%;
  height: 100%;
  display: flex;
  // height: calc(1280px);
  z-index: 0;
  .amap-icon img,
  .amap-marker-content img {
    width: 25px;
    height: 34px;
  }
  .amap-info-close {
    top: 20px;
    font-size: 30px;
    color: #fff;
    font-weight: normal;
  }
  .marker {
    position: absolute;
    top: -20px;
    right: -118px;
    color: #fff;
    padding: 4px 10px;
    box-shadow: 1px 1px 1px rgba(10, 10, 10, 0.2);
    white-space: nowrap;
    font-size: 12px;
    font-family: '';
    background-color: #25a5f7;
    border-radius: 3px;
  }
  #map_video_box {
    width: 428px;
    height: 200px;
  }
  .amap-info-sharp {
    border-top: 8px solid rgba(5, 18, 33, 0.85) !important;
  }
  .amap-info-content {
    position: relative;
    padding: 10px 18px 10px 10px;
    line-height: 1.4;
    overflow: auto;
    color: #fff;
    min-width: 460px;
    background: rgba(29, 57, 107, 0.8);
    border: 2px solid #4e85c5;
    border-radius: 6px;
    .info_title {
      margin-bottom: 20px;
      margin: -10px -18px 20px;
      padding: 14px 40px 14px 20px;
      // border-bottom: 1px solid #143346;
      display: flex;
      justify-content: space-between;
      background: linear-gradient(0deg, #4a81d4 0%);
      font-size: 22px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: right;
      color: #fff;
      text-shadow: 0.2rem 0rem 0.5rem #4a81d4, -0.2rem 0rem 0.5rem #4a81d4,
        0rem 0.2rem 0.5rem #4a81d4, 0rem -0.2rem 0.5rem #4a81d4;
      line-height: 30px;
      text-shadow: 0px 2px 3px 0px rgba(5, 28, 54, 0.26);
      .time {
        font-size: 14px;
        font-family: DIN, DIN-Bold;
      }
    }
    .info_row {
      margin-bottom: 6px;
      display: flex;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      line-height: 30px;
      .info_lable {
        color: #7fcbfb;
        min-width: fit-content;
      }
    }
    .btn_row {
      width: 300px;
      margin: 20px auto 40px;
    }
    .tabBtn {
      cursor: pointer;
      width: 118px;
      height: 38px;
      font-size: 14px;
      line-height: 30px;
      color: #fff;
      border-radius: 6px;
      background: #25a5f7;
      // background: linear-gradient(0deg,#3189c1 0%, #1d396b 100%);
      // box-shadow: 0px 3px 7px 0px rgba(11,29,53,0.11);
      outline: none;
    }
    #charts_btn {
      margin: 0px 10px;
    }
    .actived_btn {
      background: rgba(255, 110, 2, 0.5);
    }
  }
}
</style>
