import request from '@/utils/request'
import yztRequest from '@/utils/yztRequest'
let pre = 'yunpi-epc-svr-v2-SL/sys/theme/findByCode'
// 概览
export function getDataByCity(city) {
  return request({
    url: pre + '?code=gl_qyqh_' + city,
    method: 'get'
  })
}
// 河湖开发治理柱状图接口
export function getHhkfzlApi() {
  return request({
    url: pre + '?code=gl_hhkfzl',
    method: 'get'
  })
}
// 水资源
export function getDataByWaterItem(params) {
  return request({
    url: '/app/queryByCode',
    method: 'get',
    params
  })
}
// 水资源 地图
export function getszyDTData() {
  return request({
    url: pre + '?code=szy_dt',
    method: 'get'
  })
}
// 水质类别构成
export function getSzlbgcDataApi() {
  return request({
    url: pre + '?code=szy_szlbgc',
    method: 'get'
  })
}
// 取水口区域分布
export function getqushuiData() {
  return request({
    url: pre + '?code=szy_qskqyfb',
    method: 'get'
  })
}
// 水源地分布
export function getsydfbDataApi() {
  return request({
    url: pre + '?code=szy_sydfb',
    method: 'get'
  })
}
// 用水情况
export function getysqkDataApi() {
  return request({
    url: pre + '?code=szy_ysqk',
    method: 'get'
  })
}

// 一张图
let yztPre = '/yizhangtu'
// 关键字搜索返回的每一项的data值
export function keywordSearchApi(params) {
  return yztRequest({
    url: yztPre + '/keywordQuery',
    method: 'get',
    params
  })
}
// 根据地图经纬度及index查询当前点详情
export function detailByIndexAndIdApi(params) {
  return yztRequest({
    url: yztPre + '/findByIndexAndId',
    method: 'get',
    params
  })
}

// 查询该分类下所有地图点,不传page和pagesize返回所有的地图点位，
// 传page和size返回的是关键字搜索对应的列表
export function keywordQueryDataApi(params) {
  return yztRequest({
    url: yztPre + '/keywordQueryAll',
    method: 'get',
    params
  })
}

// 关键字搜索列表
export function keywordListApi(params) {
  return yztRequest({
    url: yztPre + '/keywordQueryList',
    method: 'get',
    params
  })
}

export function queryAllMapData(data) {
  return yztRequest({
    url: yztPre + '/queryByParamAll',
    method: 'post',
    data
  })
}
// 根据类别获取总数
export function getCountApi(params) {
  return yztRequest({
    url: yztPre + '/getCount',
    method: 'get',
    params
  })
}
// 一张图 统计
export function staticticApi(params) {
  return yztRequest({
    url: yztPre + '/areaStatistics',
    method: 'get',
    params
  })
}
// 水系查询riverSysQuery
export function riverSysApi(params) {
  return yztRequest({
    url: yztPre + '/riverSysQuery',
    method: 'get',
    params
  })
}
// 根据类别表单查询列表数据
export function queryListApi(data) {
  return yztRequest({
    url: yztPre + '/queryByParam',
    method: 'post',
    data: data
  })
}

// 图层选择
export function layerSelectApi(params) {
  return yztRequest({
    url: yztPre + '/layerSelect',
    method: 'get',
    params
  })
}
// 根据统计-地域 显示响应地图点位
export function getAreaLayerApi(params) {
  return yztRequest({
    url: yztPre + '/areaQuery',
    method: 'get',
    params
  })
}
