<template>
    <div class="wrapper" id="details-wrapper">
        <md-toolbar>
            <span class="md-title">Hollywood | О фильме</span>
            <div class="md-toolbar-section-end">
                <router-link to="/"><md-button>На главную</md-button></router-link>
                <md-button v-on:click="loginHook()">{{ loginBtnTitle }}</md-button>
            </div>
        </md-toolbar>

        <md-card class="content-card" v-if="movie !== null">
            <h1 class="md-display-2">{{ movie.title }}
                <md-button class="md-icon-button md-fab md-accent" v-if="userRole !== 0" v-on:click="addToFavs(movie._id)">
                    <md-icon class="md-primary" v-if="!favs.includes(movie._id)">star_outline</md-icon>
                    <md-icon class="md-primary" v-if="favs.includes(movie._id)">star</md-icon>
                    <md-tooltip md-direction="right" v-if="!favs.includes(movie._id)">Добавить в избранное</md-tooltip>
                    <md-tooltip md-direction="right" v-if="favs.includes(movie._id)">Удалить из избранного</md-tooltip>
                </md-button>
            </h1>
            <img class="poster" :src="movie.posterUrl">
            <span class="md-subheading"><b>Режиссер: </b>{{ movie.director }}</span><br>
            <span class="md-subheading"><b>Жанр: </b></span>
            <span class="md-subheading" v-for="genre, index in movie.genre">{{ genre }}<span v-if="index < movie.genre.length - 1">, </span></span><br>
            <span class="md-subheading"><b>Год: </b>{{ movie.year }}</span><br>
            <span class="md-body-1">Рейтинг по версии <b>Кинопоиска</b>:
                <md-icon v-for="n in movie.rating">star</md-icon><b> ({{ movie.rating }})</b>
            </span><br><br>
            <span class="md-title">Сюжет</span>
            <p>{{ movie.plot }}</p>
        </md-card>
        <md-card v-else>
            <h1 class="md-display-2">Фильм не найден</h1>
        </md-card>
    </div>
</template>

<script>
  import store from '../../store/store'
  export default {
    name: 'DetailsComponent',
    data () {
      return {
        loginBtnTitle: '',
        movie: null,
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
    },
    mounted: function () {
      if (store.state.detailsMovieId === null) {
        console.log('No id')
        return
      }
      this.getMovie()
    },
    methods: {
      getMovie: function () {
        let _url = store.state.httpConfig.host + store.state.httpConfig.movies + '/' + store.state.detailsMovieId
        this.$http.get(_url).then(response => {
          this.movie = response.body
          // this.movieData.rating = parseInt(this.movieData.rating)
        })
      },
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
  #details-wrapper
    /*background-image: url('../../assets/images/sharegrid-464364-unsplash.jpg')*/
    background-image: url('https://raw.githubusercontent.com/cellardoor42/int-tech-frontend/master/src/assets/images/sharegrid-464364-unsplash.jpg')

  #edit-dialog
    width: 60vw

  #edit-dialog-content
    width: 40vw
    margin: 0 10vw
</style>
