import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:80'
//console.log('Cookie bearer from main:', this.$cookies.get("bearer"))

store.dispatch('auth/me').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
