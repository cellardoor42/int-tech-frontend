<template>
  <div id="app">
    <router-view></router-view>

      <md-dialog-confirm
              :md-active.sync="showLogoutDialog"
              md-title="Выход"
              md-content="Вы действительно хотите выйти?"
              md-confirm-text="Да"
              md-cancel-text="Отмена"
              @md-cancel="cancelLogout()"
              @md-confirm="logout()" />
  </div>
</template>

<script>
  import store from './store/store'
  export default {
    name: 'app',
    data () {
      return {
        showLogoutDialog: false
      }
    },
    computed: {
      logoutDialog: function () {
        return store.state.logoutDialog
      }
    },
    watch: {
      logoutDialog: function (newState, oldState) {
        this.showLogoutDialog = newState
      }
    },
    created: function () {
      this.$material.theming.theme = 'custom'
      let _token = this.$cookie.get('token')
      if (_token !== null) {
        let _url = store.state.httpConfig.host + store.state.httpConfig.login + '/' + _token
        this.$http.post(_url, {}).then(response => {
          console.log(response.body)
          let _request = {
            username: response.body.username,
            password: response.body.password
          }
          this.login(JSON.stringify(_request))
        })
      }
    },
    methods: {
      cancelLogout: function () {
        this.showLogoutDialog = false
        store.state.logoutDialog = false
      }
    }
  }
</script>

<style>

</style>
