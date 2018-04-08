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
          <md-input v-model="login"></md-input>
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
        <router-link to="/"><md-button>Зарегистрироваться</md-button></router-link>
      </md-card-actions>

      <div style="text-align: center; margin-top: 50px;">
        <span>Уже зарегистрированы?</span><br>
        <router-link to="/login"><md-button class="md-raised md-accent">Войти</md-button></router-link>
      </div>
    </md-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SignUpComponent',
    data () {
      return {
        login: '',
        password: '',
        passwordRepeat: ''
      }
    }
  }
</script>

<style lang="sass">
  #signup-wrapper
    background-image: url('../../assets/images/caleb-george-69656-unsplash.jpg')

  #signup-card
    padding: 30px
</style>
