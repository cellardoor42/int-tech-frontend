<template>
  <div class="wrapper" id="index-wrapper">
    <md-toolbar>
      <span class="md-title">Hollywood | Домашняя страница</span>
      <div class="md-toolbar-section-end">
        <router-link to="/login"><md-button>{{ loginBtnTitile }}</md-button></router-link>
      </div>
    </md-toolbar>

    <md-card id="search-card">
      <md-field>
        <md-icon>search</md-icon>
        <label>Поиск</label>
        <md-input v-model="search"></md-input>
        <md-button class="md-icon-button md-dense" v-if="search !== ''" v-on:click="search = ''">
          <md-icon>clear</md-icon>
        </md-button>
      </md-field>

      <md-button class="md-raised md-accent" v-on:click="exSearch = !exSearch">Расширенный поиск</md-button>
      <div id="exsearch-wrapper" v-if="exSearch">
        <md-field>
          <label>Режиссер</label>
          <md-input v-model="exQuery.director"></md-input>
        </md-field>
        <md-field>
          <label>Жанр</label>
          <md-input v-model="exQuery.genre"></md-input>
        </md-field>
        <md-field>
          <label>Год</label>
          <md-input v-model="exQuery.year" type="number"></md-input>
        </md-field>

        <md-button>Сбросить</md-button>
        <md-button>Применить</md-button>
      </div>

      <!-- query results displayed here -->
    </md-card>

    <div id="guest-index-cards-wrapper" v-if="userRole === 0">
      <router-link to="/popular">
        <md-card md-with-hover class="index-card">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">Популярные фильмы</div>
            <div class="md-subhead">Топ 10</div>
          </md-card-header-text>

          <md-card-media md-medium>
            <md-icon class="md-size-5x">local_movies</md-icon>
          </md-card-media>
        </md-card-header>
      </md-card>
      </router-link>
    </div>

    <div id="index-cards-wrapper" v-if="userRole > 0">
      <router-link to="/popular">
        <md-card md-with-hover class="index-card">
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">Популярные фильмы</div>
              <div class="md-subhead">Топ 10</div>
            </md-card-header-text>

            <md-card-media md-medium>
              <md-icon class="md-size-5x">local_movies</md-icon>
            </md-card-media>
          </md-card-header>
        </md-card>
      </router-link>

      <router-link to="/favourites">
        <md-card md-with-hover class="index-card">
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">Мои фильмы</div>
              <div class="md-subhead">Оценки и просмотры</div>
            </md-card-header-text>

            <md-card-media md-medium>
              <md-icon class="md-size-5x">stars</md-icon>
            </md-card-media>
          </md-card-header>
        </md-card>
      </router-link>

      <router-link to="/profile">
        <md-card md-with-hover class="index-card">
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">Мой профиль</div>
              <div class="md-subhead">Личный кабинет</div>
            </md-card-header-text>

            <md-card-media md-medium>
              <md-icon class="md-size-5x">person</md-icon>
            </md-card-media>
          </md-card-header>
        </md-card>
      </router-link>
    </div>
  </div>
</template>

<script>
  import store from '../../store/store'

  export default {
    name: 'HomeComponent',
    data () {
      return {
        loginBtnTitile: '',
        search: '',
        userRole: null,
        exSearch: false,
        exQuery: {
          director: '',
          genre: '',
          year: ''
        }
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
  #index-wrapper
    background-image: url('../../assets/images/caleb-george-69656-unsplash.jpg')

  #search-card
    width: 70vw
    padding: 20px
    margin: 20px 15vw 20px 15vw
    text-align: center

  #exsearch-wrapper
    width: 40vw
    margin: 10px 15vw

  #index-cards-wrapper, #guest-index-cards-wrapper
    min-width: calc(75vw + 120px)
    position: fixed
    left: 50%
    transform: translateX(-50%)
    text-align: center
    top: 45vh

  #guest-index-cards-wrapper
    min-width: calc(20vw + 40px)

  .index-card
    width: 25vw
    height: 24.5vh
    padding: 4vh 1vw
    margin: 20px
    float: left

  .md-size-5x
    color: #ff8f00 !important
</style>
