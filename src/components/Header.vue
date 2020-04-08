<template>
  <div id="header" class="ui two column centered grid sdg-header">
    <div class="two column centered row">
      <div class="column sdg-text-center">
        <a href="/dashboard">
          <h1>{{ title }}</h1>
        </a>
      </div>
      <div class="column">
        <CountrySelector v-bind:selectedCountry="countryCode" v-bind:countryOptions="countryOptions"/>
      </div>
    </div>
  </div>
</template>

<script>
import CountrySelector from '@/components/CountrySelector.vue';

export default {
  name: 'Header',
  components: {
    CountrySelector
  },
  props: {
    countryCode: String,
    countries: Array
  },
  data: function() {
    return {
      title: process.env.VUE_APP_TITLE,
      country: this.countryCode,
      countryOptions: this.countries
    }
  }
}

</script>

<style scoped lang="scss">

  a {
    color: black;
  }

</style>
