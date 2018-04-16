<template>
  <div class="wrapper" id="my-wrapper">
    <md-toolbar>
      <span class="md-title">Hollywood | Мои фильмы</span>
      <div class="md-toolbar-section-end">
        <router-link to="/"><md-button>На главную</md-button></router-link>
        <md-button v-on:click="loginHook()">{{ loginBtnTitle }}</md-button>
      </div>
    </md-toolbar>

    <md-card class="content-card">
        <h1 class="md-display-2">Мои фильмы</h1>
        <span class="md-title">Оценки и просмотры</span>

        <!-- movies list here -->
    </md-card>
  </div>
</template>

<script>
  import store from '../../store/store'

  export default {
    name: 'MyFavouritesComponent',
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
          this.loginBtnTitle = 'Выход'
        }
      }
    },
    methods: {
      loginHook: function () {
        if (store.state.userRole === 0) {
          this.$router.push('/login')
        } else {
          this.loginBtnTitle = 'Вход'
          this.logout()
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style lang="sass">
  #my-wrapper
    background-image: url('../../assets/images/matt-alaniz-115598-unsplash.jpg')

  #my-card

</style>
