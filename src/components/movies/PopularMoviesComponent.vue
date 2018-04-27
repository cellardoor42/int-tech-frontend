<template>
  <div class="wrapper" id="popular-wrapper">
    <md-toolbar>
      <span class="md-title">Hollywood | Популярные фильмы</span>
      <div class="md-toolbar-section-end">
        <router-link to="/"><md-button>На главную</md-button></router-link>
        <md-button v-on:click="loginHook()">{{ loginBtnTitile }}</md-button>
      </div>
    </md-toolbar>

    <md-card class="content-card">
        <h1 class="md-display-2">10 звезд</h1>
        <span class="md-title">Рейтинг самых популярных фильмов</span>

        <!-- movies list here -->
        <md-list class="md-triple-line" v-if="movies.length > 0">
            <md-list-item v-for="movie in movies">
                <md-avatar v-on:click="goToMovieDetails(movie._id)">
                    <img :src="movie.posterUrl" alt="poster">
                </md-avatar>

                <div class="md-list-item-text" v-on:click="goToMovieDetails(movie._id)">
                    <span>{{ movie.title }}</span>
                    <span><b>Режиссер:</b> {{ movie.director }}</span>
                    <p>
                        <b>Жанр: </b>
                        <label v-for="genre, index in movie.genre">{{ genre }}<label v-if="index < movie.genre.length - 1">, </label></label>
                    </p>
                </div>

                <md-button class="md-icon-button md-accent md-list-action" v-if="userRole !== 0" v-on:click="addToFavs(movie._id)">
                    <md-icon class="md-primary" v-if="!favs.includes(movie._id)">star_outline</md-icon>
                    <md-icon class="md-primary" v-if="favs.includes(movie._id)">star</md-icon>
                </md-button>
            </md-list-item>
        </md-list>
    </md-card>
  </div>
</template>

<script>
  import store from '../../store/store'

  export default {
    name: 'PopularMoviesComponent',
    data () {
      return {
        loginBtnTitle: '',
        movies: [],
        favs: []
      }
    },
    computed: {
      user: function () {
        return store.state.user
      },
      userRole: function () {
        return store.state.userRole
      }
    },
    watch: {
      user: function (newstate, oldState) {
        this.favs = newstate.favIds
      },
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
          this.loginBtnTitile = 'Вход'
          break
        }
        default: {
          this.loginBtnTitile = 'Выход'
        }
      }

      if (store.state.user !== null) {
        this.favs = store.state.user.favIds
      }
    },
    mounted: function () {
      this.$http.get(store.state.httpConfig.host + store.state.httpConfig.movies + '?rating=10').then(response => {
        this.movies = response.body
      })
    },
    methods: {
      loginHook: function () {
        if (store.state.userRole === 0) {
          this.$router.push('/login')
        } else {
          this.loginBtnTitile = 'Вход'
          this.logoutHook()
        }
      }
    }
  }
</script>

<style lang="sass">
  #popular-wrapper
    /*background-image: url('../../assets/images/krists-luhaers-543526-unsplash.jpg')*/
    background-image: url('https://github.com/cellardoor42/int-tech-frontend/blob/master/src/assets/images/krists-luhaers-543526-unsplash.jpg?raw=true')
</style>
