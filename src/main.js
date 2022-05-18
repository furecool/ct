import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Axios from 'axios'
import i18n from './common/plugins/vue-i18n'

Vue.prototype.$ajax = Axios

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
