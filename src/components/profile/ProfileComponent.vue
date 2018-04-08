<template>
  <div class="wrapper" id="profile-wrapper">
    <md-toolbar>
      <span class="md-title">Hollywood | Личный кабинет</span>
      <div class="md-toolbar-section-end">
        <router-link to="/"><md-button>На главную</md-button></router-link>
        <router-link to="/login"><md-button>{{ loginBtnTitile }}</md-button></router-link>
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
  #profile-wrapper
    background-image: url('../../assets/images/mat-weller-86006-unsplash.jpg')
</style>
