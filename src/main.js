import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './scss/app.scss'

import Loading from '@/components/Loading'
import Error from '@/components/Error'
import TopBanner from '@/components/TopBanner'
import FeedToggle from '@/components/smartFeed/FeedToggle'

Vue.component('Loading', Loading)
Vue.component('Error', Error)
Vue.component('TopBanner', TopBanner)
Vue.component('FeedToggle', FeedToggle)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
