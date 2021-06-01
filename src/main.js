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
import moment from 'moment'
import Toasted  from 'vue-toasted';
import Multiselect from 'vue-multiselect'
import { ModelSelect } from 'vue-search-select'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import 'vue-search-select/dist/VueSearchSelect.css'

Vue.component('model-select', ModelSelect);
Vue.component('multiselect', Multiselect);
moment.locale('es');

Vue.config.performance = true
let Options = {}
Vue.use(Toasted, Options)

Vue.use(CoreuiVue)
Vue.use(VueLoaders)
Vue.prototype.$log = console.log.bind(console)
window.moment = moment;
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
