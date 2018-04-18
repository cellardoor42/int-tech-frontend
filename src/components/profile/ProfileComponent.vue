<template>
  <div class="wrapper" id="profile-wrapper">
    <md-toolbar class="md-primary">
      <span class="md-title">Hollywood | Личный кабинет</span>
      <div class="md-toolbar-section-end">
        <router-link to="/"><md-button>На главную</md-button></router-link>
        <md-button v-on:click="loginHook()">{{ loginBtnTitile }}</md-button>
      </div>
    </md-toolbar>

    <md-card class="content-card">
        <h1 class="md-display-2">Мой профиль</h1>

        <!-- proflie settings here -->
    </md-card>
  </div>
</template>

<script>
  import store from '../../store/store'

  export default {
    name: 'ProfileComponent',
    data () {
      return {
        loginBtnTitle: ''
      }
    },
    computed: {
      userRole: function () {
        return store.state.userRole
      }
    },
    watch: {
      userRole: function (newValue, oldValue) {
        if (newValue === 0) {
          this.loginBtnTitle = 'Вход'
        } else {
          this.loginBtnTitle = 'Выход'
        }
      }
    },
    created: function () {
      switch (store.state.userRole) {
        case 0: {
          this.loginBtnTitle = 'Вход'
          break
        }
        default: {
          this.loginBtnTitile = 'Выход'
        }
      }
    },
    methods: {
      loginHook: function () {
        if (store.state.userRole === 0) {
          this.$router.push('/login')
        } else {
          this.loginBtnTitile = 'Вход'
          this.logout()
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style lang="sass">
  #profile-wrapper
    background-image: url('../../assets/images/mat-weller-86006-unsplash.jpg')
</style>
