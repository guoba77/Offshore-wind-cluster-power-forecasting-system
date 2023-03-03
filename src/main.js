// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import '@/styles/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import dataV from '@jiaminghi/data-view'
import * as echarts from 'echarts'

import KProgress from 'k-progress'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.component('k-progress', KProgress)

Vue.use(ElementUI)
Vue.use(dataV)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
