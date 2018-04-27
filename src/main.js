import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueCookie from 'vue-cookie'
import * as VueGoogleMaps from 'vue2-google-maps'


import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'
import './assets/main.sass'

import detailsMixin from './mixins/detailsMixin'
import authMixin from './mixins/authMixin'

Vue.use(VueResource)
Vue.use(VueMaterial)
Vue.use(VueCookie)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDn0MTdzjLn9-q9Nd_b3VMqZ9hCygPRPew',
    libraries: 'places'
  }
})

Vue.mixin(detailsMixin)
Vue.mixin(authMixin)

Vue.config.productionTip = false

Vue.http.options.emulateJSON = true
Vue.http.options.crossOrigin = true
Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*'

router.afterEach((to, from, next) => {
  document.title = to.meta.title
  if (to.path !== '/login' && to.path !== '/sign_up') {
    store.state.currentRoute = to.path
  }
  console.log(store.state.currentRoute)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
