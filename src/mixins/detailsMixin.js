import store from '../store/store'

export default {
  methods: {
    goToMovieDetails: function (movieId) {
      console.log(movieId)
      store.state.detailsMovieId = movieId
      this.$router.push('/details')
    }
  }
}