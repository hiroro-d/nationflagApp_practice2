import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FlagIcon from 'vue-flag-icon'
import '@/assets/tailwind.css'


Vue.config.productionTip = false
Vue.use(FlagIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
