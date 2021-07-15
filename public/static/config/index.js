/**
 * 全局配置
 */
;
(function () {
  window.SITE_CONFIG = {}
  window.SITE_CONFIG['shzhUrl'] = 'http://10.168.2.31:8084' // 导航页 防御一张图跳转url
  //公司服务器 防御一张图'http://10.168.2.31:8084',
  window.SITE_CONFIG['yztUrl'] = 'http://10.168.2.133:3777/' // api接口请求地址pzc
  // window.SITE_CONFIG['yztUrl'] = 'http://10.168.2.31:3777/'
  // window.SITE_CONFIG['yztUrl'] = 'http://10.168.2.133:3777/' // api接口请求地址
  // window.SITE_CONFIG['baseUrl'] = 'http://10.168.2.13:29013/' // api接口请求地址
  window.SITE_CONFIG['baseUrl'] = 'http://10.168.2.13:29013/' // api接口请求地址

  window.SITE_CONFIG['yztUrlProd'] = 'http://10.168.2.31:3777/' // api接口请求地址
  window.SITE_CONFIG['baseUrlProd'] = 'http://10.168.2.13:29013/' // api接口请求地址

})()