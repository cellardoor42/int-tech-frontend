<template>
  <div class="wrapper" id="popular-wrapper">
    <md-toolbar>
      <span class="md-title">Hollywood | Популярные фильмы</span>
      <div class="md-toolbar-section-end">
        <router-link to="/"><md-button>На главную</md-button></router-link>
        <router-link to="/login"><md-button>{{ loginBtnTitile }}</md-button></router-link>
      </div>
    </md-toolbar>

    <md-card class="content-card">
        <h1 class="md-display-2">Топ 10</h1>
        <span class="md-title">Рейтинг самых популярных фильмов</span>

        <!-- movies list here -->
    </md-card>
  </div>
</template>

<script>
  import store from '../../store/store'

  export default {
    name: 'PopularMoviesComponent',
    data () {
      return {
        loginBtnTitle: ''
      }
    },
    created: function () {
      this.userRole = store.state.userRole
      switch (store.state.userRole) {
        case 0: {
          this.loginBtnTitile = 'Вход'
          break
        }
        default: {
          this.loginBtnTitile = 'Выход'
        }
      }
    }
  }
</script>

<style lang="sass">
  #popular-wrapper
    background-image: url('../../assets/images/krists-luhaers-543526-unsplash.jpg')
</style>
