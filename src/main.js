import Vue from 'vue'
import App from './App.vue'

import 'jquery'
import 'popper.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
