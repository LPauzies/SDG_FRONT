<template>
  <div id="map">
  </div>
</template>

<script>
import L from 'leaflet';

export default {
  name: 'MapDisplay',
  props: {
    country: String,
    latitude: Number,
    longitude: Number
  },
  data: function() {
    return {
      map: null,
      marker: null
    }
  },
  mounted: function() {
    this.map = L.map('map').setView([this.latitude, this.longitude], 3);
    //Add the tile for leaflet
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      minZoom: 2,
      maxZoom: 5
    }).addTo(this.map);
    //Add the marker to the country
    this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map);
    this.marker.bindPopup("<span>" + this.country + "</span>");
  }
}

</script>

<style scoped lang="scss">
  #map {
    height: 100%;
  }
</style>
