import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  httpConfig: {
    host: 'http://localhost:8000',
    movies: '/movies',
    users: '/users',
    userRoles: '/user_roles'
  },
  userRole: 1,
  currentRoute: '/'
}

export default new Vuex.Store({ state })
