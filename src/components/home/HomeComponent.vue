<template>
  <div class="wrapper" id="index-wrapper">
    <md-toolbar>
      <span class="md-title">Hollywood | Домашняя страница</span>
      <div class="md-toolbar-section-end">
        <md-button v-on:click="loginHook()">{{ loginBtnTitile }}</md-button>
      </div>
    </md-toolbar>

    <md-card id="search-card">
      <md-field>
        <md-icon>search</md-icon>
        <label>Поиск</label>
        <md-input v-model="search" v-on:keyup="setContextQuery()"></md-input>
        <md-button class="md-icon-button md-dense" v-if="search !== ''" v-on:click="resetContextQuery()">
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
              <label for="genre">Жанр</label>
              <md-select v-model="exQuery.genre" name="genre" id="genre" multiple>
                  <md-option value="драма">драма</md-option>
                  <md-option value="комедия">комедия</md-option>
                  <md-option value="мелодрама">мелодрама</md-option>
                  <md-option value="фантастика">фантастика</md-option>
                  <md-option value="триллер">триллер</md-option>
                  <md-option value="ужасы">ужасы</md-option>
                  <md-option value="криминал">криминал</md-option>
                  <md-option value="детектив">детектив</md-option>
              </md-select>
          </md-field>
        <md-field>
          <label>Год</label>
          <md-input v-model="exQuery.year"></md-input>
        </md-field>

        <md-button v-on:click="resetExQuery()">Сбросить</md-button>
        <md-button v-on:click="setExQuery()">Применить</md-button>
      </div>

      <!-- query results displayed here -->
      <md-list class="md-triple-line" v-if="movies.length > 0">
        <md-list-item v-for="movie in movies" v-on:click="goToMovieDetails(movie._id)">
          <md-avatar>
            <img :src="movie.posterUrl" alt="poster">
          </md-avatar>

          <div class="md-list-item-text">
            <span>{{ movie.title }}</span>
            <span><b>Режиссер:</b> {{ movie.director }}</span>
            <p>
              <b>Жанр: </b>
              <label v-for="genre, index in movie.genre">{{ genre }}<label v-if="index < movie.genre.length - 1">, </label></label>
            </p>
          </div>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">star</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
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

    <div id="index-cards-wrapper" v-else>
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
        movies: [],
        loginBtnTitile: '',
        search: '',
        userRole: null,
        exSearch: false,
        exQuery: {
          director: '',
          genre: [],
          year: ''
        },
        exQueryString: ''
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
          break
        }
      }
    },
    methods: {
      getMovies: function () {
        if (this.search === '' && this.exQueryString === '') {
          this.movies = []
        } else {
          let _url = store.state.httpConfig.host + store.state.httpConfig.movies + '?title=' + this.search + this.exQueryString
          this.$http.get(_url).then(response => {
            this.movies = response.body
            console.log(this.movies)
          })
        }
      },
      setContextQuery: function () {
        setTimeout(() => {
          this.getMovies()
        }, 500);
      },
      resetContextQuery: function () {
        this.search = ''
        this.movies = []
      },
      setExQuery: function () {
        this.exQueryString = ''
        for (let item in this.exQuery) {
          if (this.exQuery.hasOwnProperty(item)) {
            if (this.exQuery[item].length > 0) {
              this.exQueryString += '&' + item + '=' + this.exQuery[item]
            }
          }
        }
        console.log(this.exQueryString)
        this.getMovies()
      },
      resetExQuery: function () {
        this.exQueryString = ''
        this.exQuery = {
          director: '',
          genre: [],
          year: ''
        }
        this.getMovies()
      },

      loginHook: function () {
        if (store.state.userRole === 0) {
          this.$router.push('/login')
        } else {
          this.loginBtnTitile = 'Вход'
          this.logout()
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
