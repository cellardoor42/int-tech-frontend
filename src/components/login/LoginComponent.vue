<template>
  <div class="wrapper" id="login-wrapper">
    <div class="center-align login-wrapper">
      <md-card id="login-card">
      <md-card-header>
        <div class="md-display-2">Вход</div>
      </md-card-header>

      <md-card-content>
        <md-field>
          <label>Логин</label>
          <md-input v-model="username" required></md-input>
        </md-field>
        <md-field>
          <label>Пароль</label>
          <md-input v-model="password" type="password" required></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <!--<router-link to="/"><md-button>Войти</md-button></router-link>-->
          <md-button class="md-raised md-primary" v-on:click="beforeLogin()">Войти</md-button>
      </md-card-actions>

      <div style="text-align: center; margin-top: 50px;">
        <span>Нет учетной записи?</span><br>
        <router-link to="/sign_up"><md-button>Зарегистрироваться</md-button></router-link>
      </div>
    </md-card>
    </div>

      <md-dialog-alert id="errAlert" style="display: none"
              md-title="Ошибка"
              md-content="Не удалось войти в аккаунт. Проверьте корректность введенных данных"
              md-confirm-text="ОК" />

  </div>
</template>

<script>
  export default {
    name: 'LoginComponent',
    data () {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      beforeLogin: function () {
        let _request = {
          username: this.username,
          password: this.password
        }
        this.login(JSON.stringify(_request))
      }
    }
  }
</script>

<style lang="sass">
  #login-wrapper
    background-image: url('../../assets/images/noom-peerapong-30948-unsplash.jpg')

  #login-card
    padding: 30px
</style>
