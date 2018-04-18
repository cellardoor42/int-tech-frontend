<template>
  <div class="wrapper" id="my-wrapper">
    <md-toolbar>
      <span class="md-title">Hollywood | Мои фильмы</span>
      <div class="md-toolbar-section-end">
        <router-link to="/"><md-button>На главную</md-button></router-link>
        <md-button v-on:click="loginHook()">{{ loginBtnTitle }}</md-button>
      </div>
    </md-toolbar>

    <md-card class="content-card">
        <h1 class="md-display-2">Мои фильмы</h1>
        <span class="md-title">Избранное</span>

        <!-- movies list here -->
        <div v-if="movies.length === 0" style="text-align: center; padding: 50px 0 70px 0">
            <p class="md-headline">Список вашего избранного пуст</p>
            <p class="md-caption">Воспользуйтесь поиском, чтобы найти фильмы, которые могут вам понравиться</p>
            <md-button class="md-raised md-accent" to="/">Вернуться на главную</md-button>
            <!--<span-->
        </div>
        <md-list class="md-triple-line" v-if="movies.length > 0">
            <md-list-item class="list-item" v-for="movie in movies">
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

                <md-button class="md-icon-button md-list-action" v-if="userRole !== 0" v-on:click="addToFavsHook(movie._id)">
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
    name: 'MyFavouritesComponent',
    data () {
      return {
        loginBtnTitle: '',
        movies: [],
        favs: []
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
      }
    },
    created: function () {
      switch (store.state.userRole) {
        case 0: {
          this.loginBtnTitle = 'Вход'
          break
        }
        default: {
          this.loginBtnTitle = 'Выход'
        }
      }

      if (store.state.user !== null) {
        this.favs = store.state.user.favIds
      }

      this.getMovies()
    },
    methods: {
      getMovies: function () {
        this.movies = []
        for (let i = 0; i < store.state.user.favIds.length; i++) {
          let _id = store.state.user.favIds[i]
          let _url = store.state.httpConfig.host + store.state.httpConfig.movies + '/' + _id
          this.$http.get(_url).then(response => {
            this.movies.push(response.body)
            this.movies[i].rating = parseInt(this.movies[i].rating)
          })
        }
      },
      loginHook: function () {
        if (store.state.userRole === 0) {
          this.$router.push('/login')
        } else {
          this.loginBtnTitle = 'Вход'
          this.logout()
          this.$router.push('/')
        }
      },
      addToFavsHook: function (movieId) {
        this.addToFavs(movieId)
        this.getMovies()
      }
    }
  }
</script>

<style lang="sass">
  #my-wrapper
    background-image: url('../../assets/images/matt-alaniz-115598-unsplash.jpg')

  #my-card

</style>
