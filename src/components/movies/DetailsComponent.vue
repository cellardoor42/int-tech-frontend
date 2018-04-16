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
            <h1 class="md-display-2">{{ movie.title }}</h1>
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
        movie: null
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
    },
    mounted: function () {
      if (store.state.detailsMovieId === null) {
        console.log('No id')
        return
      }
      let _url = store.state.httpConfig.host + store.state.httpConfig.movies + '/' + store.state.detailsMovieId
      this.$http.get(_url).then(response => {
        this.movie = response.body
        this.movie.rating = parseInt(this.movie.rating)
      })
    },
    methods: {
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
  #details-wrapper
    background-image: url('../../assets/images/sharegrid-464364-unsplash.jpg')
</style>
