import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  userRole: 1,
  currentRoute: '/'
}

export default new Vuex.Store({ state })
