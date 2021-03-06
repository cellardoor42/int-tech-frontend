import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  httpConfig: {
    // host: 'http://localhost:8000',
    host: 'https://pure-river-78957.herokuapp.com',
    movies: '/movies',
    users: '/users',
    userRoles: '/user_roles',
    login: '/login'
  },
  user: null,
  userRole: 0,
  currentRoute: '/',
  logoutDialog: false,
  detailsMovieId: null
}

export default new Vuex.Store({ state })
