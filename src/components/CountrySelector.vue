<template>
  <div id="countryselector">
    <sui-dropdown
    fluid
    :options="countries"
    placeholder="Select a country"
    search
    selection
    v-model="currentCountry"
    />
  </div>
</template>

<script>

export default {
  name: 'CountrySelector',
  props: {
    selectedCountry: String,
    countryOptions: Array
  },
  data() {
    return {
      currentCountry: (this.selectedCountry) ? this.selectedCountry.toLowerCase() : null,
      countries: this.countryOptions
    };
  },
  watch: {
    'currentCountry': function() {
      window.location.href = "/dashboard/" + this.currentCountry;
    }
  }
};
</script>

<style scoped lang="scss">

</style>
