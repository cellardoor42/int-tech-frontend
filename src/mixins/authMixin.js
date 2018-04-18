import store from '../store/store'

export default {
  methods: {
    login: function (request) {
      console.log('LOGIN')
      let _url = store.state.httpConfig.host + store.state.httpConfig.login
      this.$http.post(_url, JSON.parse(request)).then(response => {
        let _user = response.body
        if (_user !== '') {
          store.state.user = response.body
          store.state.userRole = parseInt(_user.userRole)
          this.$cookie.set('token', _user._id)
          this.$router.push('/')
        } else {
          console.log('login err')
        }
      })
    },
    logout: function () {
      console.log('LOGOUT')
      this.$cookie.delete('token')
      store.state.user = null
      store.state.userRole = 0
    },
    signUp: function () {
      console.log('SIGN UP')
    }
  }
}