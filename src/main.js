import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import routes from './router'
import store from './store'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import scroll from 'vue-seamless-scroll'
import AMap from 'AMap'
import './styles/index.less'
import echarts from 'echarts'
import 'echarts-liquidfill' //在这里引入
import { formatTime } from '@/utils/moment'

import SvgIcon from '@/components/svgIcon/index.vue' // svg组件
Vue.component('svg-icon', SvgIcon)
import '@/components/svgIcon/index.js'
// 全局组件引入
import globalComponents from '@/components/common/index'
Vue.use(globalComponents);
Vue.prototype.formatTime = formatTime
Vue.prototype.$echarts = echarts
Vue.prototype.$AMap = AMap
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(scroll)
Vue.use(ElementUI)
const router = new Router({
    routes,
    mode: 'hash'
})
Vue.config.productionTip = false
console.log(navigator.userAgent.toLowerCase(), '当前浏览器的信息')
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')