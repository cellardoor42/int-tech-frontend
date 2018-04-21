import store from '../store/store'

export default {
  methods: {
    login: function (request) {
      let _url = store.state.httpConfig.host + store.state.httpConfig.login
      this.$http.post(_url, JSON.parse(request)).then(response => {
        let _user = response.body
        if (_user !== '') {
          store.state.user = response.body
          store.state.userRole = parseInt(_user.role)
          this.$cookie.set('token', _user._id)
          this.$router.push(store.state.currentRoute)
        } else {
          console.log('login err')
          alert('ОШИБКА\nНе удалось войти в аккаунт. Проверьте правильность введенных данных и повторите попытку')
        }
      })
    },
    logoutHook: function () {
      store.state.logoutDialog = true
    },
    logout: function () {
      console.log('LOGOUT')
      this.$cookie.delete('token')
      store.state.user = null
      store.state.userRole = 0
      store.state.logoutDialog = false

      location.reload()
    },
    signUp: function () {
      console.log('SIGN UP')
    }
  }
}