<template>
  <div id="container"></div>
</template>
<script>
import $ from 'jquery'
import _ from 'lodash'
export default {
  props: {
    tomapData: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      colors: {},
      map: null,
      currentTab: '',
      mapMarkers: [],
      cluster: null,
      icon: null,
      infoWindow: null,
      currentDetail: null
    }
  },
  mounted() {},
  watch: {
    tomapData: {
      handler(val) {
        if (val) {
          this.toMapItem(val)
        }
      }
    },
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
    newIcon(type) {
      let icon = new AMap.Icon({
        // 图标尺寸
        // size: new AMap.Size(36, 42),
        // // 图标的取图地址
        // image: require('../../../assets/IC/maker' + type + '.png'),
        // // 图标所用图片大小
        // imageSize: new AMap.Size(36, 42),
        // // 图标取图偏移量
        // imageOffset: new AMap.Pixel(-0, -0)
        size: new AMap.Size(150, 150),
        // 图标的取图地址
        image: require('../../../assets/IC/maker' + type + '_gif.webp'),
        // 图标所用图片大小
        imageSize: new AMap.Size(150, 150),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(0, 0)
      })
      return icon
    },
    newGifIcon(type) {
      let icon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(200, 200),
        // 图标的取图地址
        image: require('../../../assets/IC/maker' + type + '_gif.webp'),
        // 图标所用图片大小
        imageSize: new AMap.Size(200, 200)
        // 图标取图偏移量
        // imageOffset: new AMap.Pixel(-100, -100)

        // imageOffset: new AMap.Pixel(-31, -46)
      })
      return icon
    },
    initMap() {
      var bounds = new AMap.Bounds(
        new AMap.LngLat(62.578172, 17.359318),
        new AMap.LngLat(131.420857, 50.80667)
      )
      this.map = new AMap.Map('container', {
        zooms: [7, 15],
        zoom: 7.8, //初始地图级别
        resizeEnable: true,
        center: [100.531295, 34.091694], //初始地图中心点
        mapStyle: 'amap://styles/1e81a6d65f582741b00749ea06c66586', //
        viewMode: '3D' //使用3D视图
      })
      this.map.setPitch(40)
      var map = this.map
      window.onload = function() {
        map.plugin(['AMap.ToolBar'], function() {
          map.addControl(new AMap.ToolBar({ position: 'RT' })) //地图控件位置
        })
      }

      // 设置光照
      map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5)
      map.DirectionLight = new AMap.Lights.DirectionLight(
        [0, 0, 1],
        [1, 1, 1],
        1
      )
      var object3Dlayer = new AMap.Object3DLayer()
      map.add(object3Dlayer)
      // 设置遮罩，只显示某个省
      new AMap.DistrictSearch({
        extensions: 'all', //返回行政区边界坐标组等具体信息
        level: 'city', //查询行政级别为 市
        subdistrict: 3 //返回下一级行政区
      }).search('甘肃省', function(status, result) {
        var bounds = result.districtList[0].boundaries
        var height = 200000
        var prism = new AMap.Object3D.Prism({
          path: bounds,
          height: height,
          color: 'rgba(1,98,254,.3)'
        })
        prism.transparent = true
        object3Dlayer.add(prism)
      })
      function setLine(city) {
        new AMap.DistrictSearch({
          extensions: 'all', //返回行政区边界坐标组等具体信息
          level: 'city', //查询行政级别为 市
          subdistrict: 3 //返回下一级行政区
        }).search(city, function(status, result) {
          var bounds = result.districtList[0].boundaries
          var color = '#0055ff'
          for (var i = 0; i < bounds.length; i += 1) {
            var line = new AMap.Object3D.ThinLine({
              path: bounds[i],
              color: color
            })
            object3Dlayer.add(line)
          }
        })
      }
      // 根据查询的省市区，勾出相应边线
      // 兰州市 嘉峪关市 金昌市 白银市 天水市 武威市 张掖市 平凉市' 酒泉市 庆阳市 定西市 陇南市 临夏回族自治州' 甘南藏族自治州
      let cityName = [
        '甘肃省',
        '兰州市',
        '嘉峪关市',
        '金昌市',
        '白银市',
        '天水市',
        '武威市',
        '张掖市',
        '平凉市',
        '酒泉市',
        '庆阳市',
        '定西市',
        '陇南市',
        '临夏回族自治州',
        '甘南藏族自治州'
      ]
      for (let i = 0; i < cityName.length; i++) {
        setLine(cityName[i])
      }
    },
    removeMarkers() {
      this.map.clearMap()
      this.map.remove(this.mapMarkers)
      this.mapMarkers = []
    },
    toMapItem(item) {
      if (item && item.lon) {
        this.infoWindow.close() //关闭所有信息窗体
        let lon = item.lon
        let lat = item.lat
        this.map.setCenter([lon, lat])
        this.map.setZoom(14)
      }
    },
    resetMap() {
      this.removeMarkers()
      this.map.setCenter([98.531295, 36.334383])
      this.map.setZoom(7.1)
    },
    // 添加聚合
    addCluster() {
      if (this.cluster) {
        this.cluster.setMap(null)
      }
      this.cluster = new AMap.MarkerClusterer(this.map, this.mapMarkers, {
        gridSize: 30,
        maxZoom: 16
      })
    },
    async initMark() {
      var map = this.map
      this.removeMarkers()
      this.map.setZoom(7.1)
      this.map.setCenter([100.531295, 36.334383])
      this.infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(36, 12),
        autoMove: true,
        closeWhenClickMap: true,
        anchor: 'middle-left' //窗体出现的基准方向
      })
      let infoWindow = this.infoWindow
      let list = this.list
      for (var i = 0; i < list.length; i++) {
        let lon = list[i].lon || list[i].end_lon
        let lat = list[i].lat || list[i].end_lat
        if (lon && lat) {
          let marker = new AMap.Marker({
            position: [lon, lat],
            data: list[i],
            map: map,
            // 横坐标- 一半  纵坐标 -全部
            offset: new AMap.Pixel(-75, -150),
            icon: this.newIcon(list[i].index)
          })
          // 设置弹跳动画
          // marker.setAnimation('AMAP_ANIMATION_BOUNCE')
          let that = this
          // marker.on('mouseover',function(e){
          //   e.target.stopMove()
          // })
          // marker.on('mouseout',function(e){
          //    e.target.resumeMove()
          // })
          // 鼠标悬浮放大当前图标
          // marker.on('mouseover',function(e){
          //   let data = e.data || e.target.data || e.target.w.data || e.target.Ce.data
          //   console.log('data',data)
          //   let ind=that.findMakerByLon(data.lon,data.lat)
          //   console.log('ind=',ind)
          //   that.mapMarkers[ind].setMap(null);
          //   let newMarker = new AMap.Marker({
          //     position: [lon, lat],
          //     data: data,
          //     map: map,
          //     icon: that.newGifIcon(data.index)
          //   })
          //    that.mapMarkers.push(newMarker)
          // })
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
            let data =
              e.data || e.target.data || e.target.w.data || e.target.Ce.data
            myTitle = '<div class="info_title">建东街建材市场火灾</div>'
            let basicInfo = ''
            for (let i = 0; i < showItem.length; i++) {
              basicInfo +=
                '<div class="info_row"><span class="info_lable">' +
                showItem[i].key +
                '：</span>' +
                showItem[i].val +
                '</div>'
            }
            basicInfo = '<div id="map_basicinfo_box">' + basicInfo + '</div>'
            let detailRow = ''
            for (let j = 0; j < showItemDetail.length; j++) {
              detailRow +=
                '<div class="info_row"><span class="info_lable">' +
                showItemDetail[j].key +
                '：</span>' +
                showItemDetail[j].val +
                '</div>'
            }
            detailRow =
              '<div id="map_detail_box" style="display:none;">' +
              detailRow +
              '</div>'
            let videoRow =
              '<img style="display:none;" src="../../../assets/video/2.png" id="map_video_box" />'
            window.currentData = data
            let buttonGroup =
              '<div class="flex-space-between btn_row">' +
              `<input type="button" id="basic_btn" class="tabBtn actived_btn" value="事件概要" onclick="setChartOrTable('basic',basicDom,currentData)"/>` +
              `<input type="button" id="charts_btn" class="tabBtn" value="查看监控" onclick="setChartOrTable('charts',basicDom,currentData)"/>` +
              `<input type="button" id="table_btn" class="tabBtn" value="查看详情" onclick="setChartOrTable('table',basicDom,currentData)"></div>` +
              '</div>'
            window.basicDom =
              '<div class="beauty-scroll">' +
              myTitle +
              basicInfo +
              detailRow +
              videoRow +
              buttonGroup +
              '</div>'
            let myHtml = basicDom
            infoWindow.setContent(myHtml)
            infoWindow.open(map, e.lnglat)
          })
          this.mapMarkers.push(marker)
        }
      }
      this.addCluster()
    },
    findMakerByLon(lon, lat) {
      return _.findIndex(this.mapMarkers, o => {
        let data = o.w.data
        return data.lon === lon && data.lat === lat
      })
    },
    setChartOrTable(type, dom, data) {
      let htmldom = dom
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
        this.infoWindow.open(this.map, [data.lon, data.lat])
      }, 500)
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
    background: rgba(29, 57, 107, 0.95);
    border: 2px solid #4e85c5;
    border-radius: 6px;
    .info_title {
      margin-bottom: 20px;
      margin: -10px -18px 20px;
      padding: 14px 40px 14px 20px;
      // border-bottom: 1px solid #143346;
      display: flex;
      justify-content: space-between;
      // background: linear-gradient(0deg, #4a81d4 0%);
      background: rgba(255, 255, 255, 0.2);
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
      cursor: default;
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
