import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueCookie from 'vue-cookie'

import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'
import './assets/main.sass'

import detailsMixin from './mixins/detailsMixin'
import authMixin from './mixins/authMixin'

Vue.use(VueResource)
Vue.use(VueMaterial)
Vue.use(VueCookie)

Vue.mixin(detailsMixin)
Vue.mixin(authMixin)

Vue.config.productionTip = false

Vue.http.options.emulateJSON = true
Vue.http.options.crossOrigin = true
Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*'

router.afterEach((to, from, next) => {
  document.title = to.meta.title
  store.state.currentRoute = to.path
  console.log(store.state.currentRoute)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
