<template>
  <div class="wrapper" id="profile-wrapper">
    <md-toolbar>
      <span class="md-title">Hollywood | Личный кабинет</span>
      <div class="md-toolbar-section-end">
        <router-link to="/"><md-button>На главную</md-button></router-link>
        <md-button v-on:click="loginHook()">{{ loginBtnTitle }}</md-button>
      </div>
    </md-toolbar>

    <md-card class="content-card" id="profile-card">
        <h1 class="md-display-2">Мой профиль</h1>

        <!-- proflie settings here -->
        <md-list>
            <md-list-item class="profile-item">
                <md-avatar class="md-avatar-icon md-large md-primary">
                    <md-ripple>{{ letterPlaceholder }}</md-ripple>
                </md-avatar>

                <div class="md-list-item-text">
                    <span class="md-title">{{ userData.username }}</span>
                    <span><b>Статус: </b>{{ role }}</span>
                    <router-link to="/favourites">
                        <span class="md-caption">Любибмых фильмов: {{ userData.favIds.length }}</span>
                    </router-link>
                </div>

                <md-button class="md-icon-button md-list-action" v-on:click="edit = !edit">
                    <md-icon class="md-primary">edit</md-icon>
                </md-button>
                <md-button class="md-icon-button md-list-action" v-if="userRole === 2">
                    <md-icon class="md-primary">settings</md-icon>
                </md-button>
            </md-list-item>
        </md-list>

        <div v-if="edit" style="padding: 30px 10vw;">
            <h1 class="md-headline">Редактировать профиль</h1>
            <md-field>
                <label>Имя</label>
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
            <div style="text-align: right">
                <md-button class="md-raised md-primary" v-on:click="submitHook()">Сохранить изменения</md-button>
            </div>
        </div>
    </md-card>

      <md-dialog-alert
              :md-active.sync="showPasswdDialog"
              md-content="Пароли не совпадают"
              md-confirm-text="Закрыть" />

      <md-dialog-confirm
              :md-active.sync="showConfirmDialog"
              md-title="Редактировать профиль"
              md-content="Сохранить изменения в ваших данных?"
              md-confirm-text="ОК"
              md-cancel-text="Отмена"
              @md-cancel="showConfirmDialog = false"
              @md-confirm="submit()" />
  </div>
</template>

<script>
  import store from '../../store/store'

  export default {
    name: 'ProfileComponent',
    data () {
      return {
        loginBtnTitle: '',
        userData: {},
        username: '',
        password: '',
        passwordRepeat: '',
        role: '',
        letterPlaceholder: null,
        edit: false,
        showPasswdDialog: false,
        showConfirmDialog: false
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
        switch (newValue) {
          case 0: {
            this.role = 'гость'
            break
          }
          case 1: {
            this.role = 'пользователь'
            break
          }
          case 2: {
            this.role = 'администратор'
            break
          }
        }
      }
    },
    created: function () {
      switch (store.state.userRole) {
        case 0: {
          this.loginBtnTitle = 'Вход'
          this.role = 'гость'
          break
        }
        case 1: {
          this.loginBtnTitle = 'Выход'
          this.role = 'пользователь'
          break
        }
        case 2: {
          this.loginBtnTitle = 'Выход'
          this.role = 'администратор'
          break
        }
      }

      if (store.state.user !== null) {
        this.userData = store.state.user
        this.letterPlaceholder = this.userData.username[0]
        this.username = this.userData.username
        this.password = this.passwordRepeat = this.userData.password
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
      },
      submitHook: function () {
        if (this.password !== this.passwordRepeat) {
          this.showPasswdDialog = true
        } else {
          this.showConfirmDialog = true
        }
      },
      submit: function () {
        let _url = store.state.httpConfig.host + '/profile'
        let _data = {
          userId: this.$cookie.get('token'),
          username: this.username,
          password: this.password
        }

        this.$http.post(_url, _data).then(response => {
          console.log(response.data)
          // store.state.user = response.data
          // this.userData = response.data
          // location.reload()
          this.userData.username = _data.username
          this.userData.password = _data.password
        })
      }
    }
  }
</script>

<style lang="sass">
  #profile-wrapper
    background-image: url('../../assets/images/mat-weller-86006-unsplash.jpg')

  .profile-item .md-list-item-content
    cursor: default !important
    &:hover
      background-color: unset !important
</style>
