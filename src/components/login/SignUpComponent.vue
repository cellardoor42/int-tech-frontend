<template>
  <div class="wrapper" id="signup-wrapper">
    <div class="center-align signup-wrapper">
      <md-card id="signup-card">
      <md-card-header>
        <div class="md-display-2">Регистрация</div>
      </md-card-header>

      <md-card-content>
        <md-field>
          <label>Логин</label>
          <md-input v-model="username"></md-input>
        </md-field>
        <md-field>
          <label>Пароль</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
        <md-field>
          <label>Повторите пароль</label>
          <md-input v-model="passwordRepeat" type="password"></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button v-on:click="submit()">Зарегистрироваться</md-button>
      </md-card-actions>

      <div style="text-align: center; margin-top: 50px;">
        <span>Уже зарегистрированы?</span><br>
        <router-link to="/login"><md-button class="md-raised md-accent">Войти</md-button></router-link>
      </div>
    </md-card>
    </div>

      <md-dialog-alert
              :md-active.sync="showPasswdDialog"
              md-content="Пароли не совпадают"
              md-confirm-text="Закрыть" />

  </div>
</template>

<script>
  import store from '../../store/store'
  export default {
    name: 'SignUpComponent',
    data () {
      return {
        username: '',
        password: '',
        passwordRepeat: '',
        showPasswdDialog: false
      }
    },
    methods: {
      submit: function () {
        if (this.password !== this.passwordRepeat) {
          this.showPasswdDialog = true
        } else {
          let _url = store.state.httpConfig.host + store.state.httpConfig.users
          let _data = {
            username: this.username,
            password: this.password
          }
          console.log(_data)

          this.$http.post(_url, _data).then(response => {
            console.log(response.data)
          })
        }
      }
    }
  }
</script>

<style lang="sass">
  #signup-wrapper
    background-image: url('../../assets/images/igor-ovsyannykov-440148-unsplash.jpg')

  #signup-card
    padding: 30px
</style>
