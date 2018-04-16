<template>
  <div class="wrapper" id="popular-wrapper">
    <md-toolbar>
      <span class="md-title">Hollywood | Популярные фильмы</span>
      <div class="md-toolbar-section-end">
        <router-link to="/"><md-button>На главную</md-button></router-link>
        <router-link to="/login"><md-button>{{ loginBtnTitile }}</md-button></router-link>
      </div>
    </md-toolbar>

    <md-card class="content-card">
        <h1 class="md-display-2">Топ 10</h1>
        <span class="md-title">Рейтинг самых популярных фильмов</span>

        <!-- movies list here -->
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
  </div>
</template>

<script>
  import store from '../../store/store'

  export default {
    name: 'PopularMoviesComponent',
    data () {
      return {
        loginBtnTitle: '',
        movies: []
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
    },
    mounted: function () {
      this.$http.get(store.state.httpConfig.host + store.state.httpConfig.movies + '?rating=10').then(response => {
        this.movies = response.body
      })
    }
  }
</script>

<style lang="sass">
  #popular-wrapper
    background-image: url('../../assets/images/krists-luhaers-543526-unsplash.jpg')
</style>
