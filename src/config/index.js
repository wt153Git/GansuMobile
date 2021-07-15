let url_config
let yzt_url_config
let shzh_url_config
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  url_config = window.SITE_CONFIG.baseUrl // 基础接口
  yzt_url_config = window.SITE_CONFIG.yztUrl
  shzh_url_config = window.SITE_CONFIG.shzhUrl

} else {
  // 生产环境
  url_config = window.SITE_CONFIG.baseUrlProd // 基础接口
  yzt_url_config = window.SITE_CONFIG.yztUrlProd
  shzh_url_config = window.SITE_CONFIG.shzhUrl

}

export {
  url_config,
  yzt_url_config,
  shzh_url_config
}
