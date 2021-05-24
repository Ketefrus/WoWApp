import 'core-js/stable'
import "regenerator-runtime/runtime";
import Vue from 'vue'
import App from '@/app/App'
import router from '@/app/router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from '@/assets/icons/icons.js'
import store from './store'

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})