<template>
  <div id="container"></div>
</template>
<script>
import { getKeyByCategory } from '@/utils'
import { detailByIndexAndIdApi } from '@/api'
import formItem from './components/mapDetailJson'
export default {
  props: {
    category: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    },
    mapDataType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
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

  methods: {
    newIcon(type) {
      let icon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(16, 16),
        // 图标的取图地址
        image: require('../../assets/IC/' + type + '.png'),
        // 图标所用图片大小
        imageSize: new AMap.Size(16, 16),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-0, -0)
      })
      return icon
    },
    initMap() {
      this.map = new AMap.Map('container', {
        zoom: 7.3, //初始地图级别
        resizeEnable: true,
        center: [108.907295, 35.601474], //初始地图中心点
        mapStyle: 'amap://styles/darkblue',
        viewMode: '3D' //使用3D视图
      })
      var map = this.map
      window.onload = function() {
        map.plugin(['AMap.ToolBar'], function() {
          map.addControl(new AMap.ToolBar({ position: 'RT' })) //地图控件位置
        })
      }
      // 自定义icon
      this.icon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(18, 20),
        // 图标的取图地址
        image: require('../../assets/marker.png'),
        // 图标所用图片大小
        imageSize: new AMap.Size(18, 20),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-0, -0)
      })
      // 创建省份图层
      var disProvince
      function initPro() {
        let code = '610000' // 陕西省610000
        let dep = 1 // 2 县区 1市级
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
              return ''
            },
            'province-stroke': 'rgba(0,150,255,1)', //省边界线颜色
            'city-stroke': 'rgba(0,150,255,1)', // 中国地级市边界线颜色
            'county-stroke': 'rgba(0,150,255,1)' // 中国区县边界线颜色
          }
        })
        disProvince.setMap(map)
      }
      initPro()
    },
    removeMarkers() {
      if (this.mass) {
        this.mass.clear() //清除海量点
        this.infoWindow.close() //关闭所有信息窗体
      }
    },
    toMapItem(item) {
      this.infoWindow.close() //关闭所有信息窗体
      let lon = item.lon || item.end_lon
      let lat = item.lat || item.end_lat
      if(lon && lat && lon !== '0.0' && lat !== '0.0'){
        this.map.setCenter([lon, lat])
        this.map.setZoom(15)
      }else{
        this.$message.info('无位置信息')
      }
    },
    resetMap() {
      this.removeMarkers()
      this.map.setCenter([108.907295, 35.601474])
      this.map.setZoom(7.3)
      let infoWindowContent = document.getElementsByClassName(
        'amap-info-content'
      )[0]
      if (infoWindowContent) {
        infoWindowContent.style.display = 'none'
      }
    },
    newIcon2(type) {
      let icon = {
        url: require('../../assets/IC/' + type + '.png'),
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(16, 16)
      }
      return icon
    },
    async initMark() {
      var map = this.map
      // closeWhenClickMap 点击地图其他区域，关闭窗体信息，默认不关闭
      this.infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(-3, -16),
        closeWhenClickMap: true
      })
      let infoWindow = this.infoWindow
      this.resetMap()
      let list = this.list
      let category = this.mapDataType ? '' : this.category
      let style = []
      let validList = []
      if (list && list.length) {
        list.forEach((item, ind) => {
          let lon = item.lon || item.end_lon || ''
          let lat = item.lat || item.end_lat || ''
          if (lon && lat && lon !== '0.0' && lat !== '0.0') {
            item.lnglat = [lon, lat]
            let iconType =
              item && item.index ? item.index.split('_data')[0] : ''
            let icon = iconType ? this.newIcon2(iconType) : this.icon
            item.style = ind
            style.push(icon)
            validList.push(item)
          }
        })
      }
      var mass = new AMap.MassMarks(validList, {
        opacity: 1,
        zIndex: 111,
        cursor: 'pointer',
        style: style
      })
      var marker = new AMap.Marker({ content: ' ', map: map })

      mass.on('click', function(e) {
        let myRow = ''
        let showItem = []
        let shwoTitlekey = ''
        let data = e.data || e.target.w.data || e.target.Ce.data
        let trueKey = data && data.index ? data.index.split('_data')[0] : ''
        if (data.index) {
          shwoTitlekey = getKeyByCategory(trueKey).nameKey
          detailByIndexAndIdApi({ index: data.index, id: data.id }).then(
            res => {
              data = res.data
              showItem = formItem[trueKey]
              myRow = '<div class="info_title">' + data[shwoTitlekey] + '</div>'
              if (showItem && showItem.length) {
                for (let i = 0; i < showItem.length; i++) {
                  if (showItem[i].type === 'objArray') {
                    let val = ''
                    for (let j = 0; j < showItem[i].name.length; j++) {
                      val +=
                        data[showItem[i].name[j].value] +
                        showItem[i].name[j].label
                    }
                    myRow +=
                      '<div class="info_row"><span class="info_lable">' +
                      showItem[i].label +
                      '：</span>' +
                      val +
                      '</div>'
                  } else if (showItem[i].type === 'array') {
                    let val = ''
                    for (let j = 0; j < showItem[i].name.length; j++) {
                      if (data[showItem[i].name[j]]) {
                        val +=
                          j > 0
                            ? '、' + data[showItem[i].name[j]]
                            : data[showItem[i].name[j]]
                      }
                    }
                    myRow +=
                      '<div class="info_row"><span class="info_lable">' +
                      showItem[i].label +
                      '：</span>' +
                      val +
                      '</div>'
                  } else {
                    let currentVal = data[showItem[i].name]
                      ? data[showItem[i].name]
                      : '无'
                    myRow +=
                      '<div class="info_row"><span class="info_lable">' +
                      showItem[i].label +
                      '：</span>' +
                      currentVal +
                      '</div>'
                  }
                }
              }
              let html = myRow
              infoWindow.setContent(html)
              infoWindow.open(map, e.data.lnglat)
            }
          )
        }
      })
      this.mass = mass
      mass.setMap(map)
    }
  }
}
</script>
<style lang="less" scoped>
::v-deep#container {
  width: 1920px;
  height: calc(1080px - 90px);
  // border: 1px solid red;
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
  .amap-info-sharp {
    border-top: 8px solid rgba(5, 18, 33, 0.85) !important;
  }
  .amap-info-content {
    position: relative;
    background: rgba(5, 18, 33, 0.8);
    padding: 10px 18px 10px 10px;
    line-height: 1.4;
    overflow: auto;
    color: #fff;
    min-width: 460px;
    border-radius: 8px;
    border: 1px solid #143346;
    .info_title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
      background: rgba(20, 51, 70, 0.3);
      margin: -10px -18px 20px;
      padding: 14px 40px 14px 20px;
      border-bottom: 1px solid #143346;
    }
    .info_row {
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      line-height: 22px;
      .info_lable {
        color: rgba(120, 160, 194, 1);
        min-width: fit-content;
      }
    }
  }
}
</style>
