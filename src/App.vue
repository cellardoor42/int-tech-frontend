<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from './store/store'
  export default {
    name: 'app',
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
    }
  }
</script>

<style>

</style>
