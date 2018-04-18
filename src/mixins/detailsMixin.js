import store from '../store/store'

export default {
  methods: {
    goToMovieDetails: function (movieId) {
      store.state.detailsMovieId = movieId
      this.$router.push('/details')
    },

    addToFavs: function (movieId) {
      if (store.state.user.favIds.includes(movieId)) {
        store.state.user.favIds.splice(store.state.user.favIds.indexOf(movieId), 1)
      } else {
        store.state.user.favIds.push(movieId)
      }
      console.log(store.state.user.favIds)
      let _favs = {
        userId: store.state.user._id,
        favIds: store.state.user.favIds
      }
      let _url = store.state.httpConfig.host + '/favs'
      this.$http.post(_url, _favs).then(response => {
        console.log(response.body)
      })
    }
  }
}