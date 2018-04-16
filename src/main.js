import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import store from './store/store'

import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'
import './assets/main.sass'

import detailsMixin from "./mixins/detailsMixin"

Vue.use(VueResource)
Vue.use(VueMaterial)

Vue.mixin(detailsMixin)

Vue.config.productionTip = false

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
