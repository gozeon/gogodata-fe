import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import 'normalize.css'

import ElementUI from 'element-ui'
import './theme.scss'

Vue.config.productionTip = false

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
