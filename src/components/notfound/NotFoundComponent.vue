<template>
  <div class="wrapper" id="not-found-wrapper">
    <div class="center-align">
      <md-card id="not-found-card">
        <div class="center-align">
          <h1 class="md-display-3">404</h1>
          <md-card-content><h2>Запрашиваемая страница не найдена</h2></md-card-content>
          <router-link to="/"><md-button class="md-raised md-primary">На домашнюю страницу</md-button></router-link>

            <GmapMap
                    :center="{lat: 34.090698, lng: -118.386002}"
                    :zoom="7"
                    map-type-id="terrain"
                    style="width: 30vw; height: 30vh; margin: 30px 0;"
            >
                <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="false"
                @click="center=m.position"
                />
            </GmapMap>
        </div>

      </md-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFoundComponent',
    data () {
      return {
        center: {lat: 34.090698, lng: -118.386002},
        markers: [{
          position: {lat: 34.090698, lng: -118.386002}
        }]
      }
    }
  }
</script>

<style lang="sass">
  #not-found-wrapper
    background-image: url('../../assets/images/timothy-eberly-382663-unsplash.jpg')

  #not-found-card
    width: 40vw
    height: 70vh
    text-align: center
</style>
