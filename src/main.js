import Vue from 'vue'
import ElementUI from 'element-ui'
import './assets/iconfont/ionicons.less'
import './style/element-variables.scss'
import App from './App.vue'
import router from './route/index'
import store from './store/index'
// 引入echarts
import echarts from 'echarts'
import Combox from './components/combox'

import formatDate from './util/time'

Vue.prototype.$echarts = echarts
Vue.prototype.$formatDate = formatDate
Vue.config.productionTip = false
Vue.component('Combox',Combox)

Vue.use(ElementUI)



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
