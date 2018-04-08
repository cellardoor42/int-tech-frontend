<template>
  <div class="wrapper" id="index-wrapper">
    <md-toolbar>
      <span class="md-title">Hollywood | Домашняя страница</span>
      <div class="md-toolbar-section-end">
        <router-link to="/login"><md-button>{{ loginBtnTitile }}</md-button></router-link>
      </div>
    </md-toolbar>

    <md-card id="search-card"></md-card>
  </div>
</template>

<script>
  import store from '../../store/store'

  export default {
    name: 'HomeComponent',
    data () {
      return {
        loginBtnTitile: ''
      }
    },
    created: function () {
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
  #index-wrapper
    background-image: url('../../assets/images/mat-weller-86006-unsplash.jpg')

  #search-card
    width: 60vw
</style>
