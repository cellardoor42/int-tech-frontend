<template>
  <div class="wrapper" id="not-found-wrapper">
    <div class="center-align">
      <md-card id="not-found-card">
        <div class="center-align">
          <h1 class="md-display-3">404</h1>
          <md-card-content><h2>Запрашиваемая страница не найдена</h2></md-card-content>
          <router-link to="/"><md-button class="md-raised md-primary">На домашнюю страницу</md-button></router-link>
        </div>
      </md-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFoundComponent'
  }
</script>

<style lang="sass">
  #not-found-wrapper
    background-image: url('../../assets/images/timothy-eberly-382663-unsplash.jpg')

  #not-found-card
    width: 40vw
    height: 40vh
    text-align: center
</style>
