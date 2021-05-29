import 'core-js/stable'
import "regenerator-runtime/runtime";
import Vue from 'vue'
import App from '@/app/App'
import router from '@/app/router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from '@/assets/icons/icons.js'
import store from './store'
import TooltipProviderWowhead from '@/app/global/Interface/TooltipProviderWowhead'
import VueLoaders from 'vue-loaders';
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(VueLoaders)
Vue.prototype.$log = console.log.bind(console)
Vue.component('VueLoader', VueLoaders);
new Vue({
  el: '#app',
  router,
  store,
  icons,
  TooltipProviderWowhead,
  template: '<App/>',
  components: {
    App
  },
  created: function () {
    TooltipProviderWowhead.load();
  }
})
