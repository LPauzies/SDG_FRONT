<template>
  <div id="app" v-if="!hasError">
    <div v-if="isCountryCodeOK">
      <Header v-if="countries" :country-code="countryCode" :countries="countries"/>
    </div>
    <div v-else>
      <Header v-if="countries" :country-code="null" :countries="countries"/>
    </div>
    <sui-divider />
    <Dashboard v-if="!hasError && isCountryCodeOK" :country-code="countryCode"/>
    <NotFound v-else-if="hasError" :error-type="pageNotFound"/>
    <NotFound v-else :error-type="countryNotFound"/>
    <Footer />
  </div>
  <div id="app" v-else>
    <NotFound :error-type="pageNotFound"/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Dashboard from '@/views/Dashboard.vue';
import NotFound from '@/views/NotFound.vue';
import Footer from '@/components/Footer.vue';

const axios = require('axios');

export default {
  name: 'SDGDashboard',
  components: {
    Header,
    Dashboard,
    NotFound,
    Footer
  },
  data: function() {
    return {
      countryCode: null,
      isCountryCodeOK: true,
      countries: null,
      hasError: false,
      pageNotFound: "Error 500 : Cannot connect get remote data.",
      countryNotFound: "Selected country not found in the API, please retry."
    }
  },
  created: function() {
    this.countryCode = this.$route.params.countrycode;
    const api = process.env.VUE_APP_SDG_API_PROTOCOL + "://" + process.env.VUE_APP_SDG_API_DOMAIN + ":" + process.env.VUE_APP_SDG_API_PORT + process.env.VUE_APP_SDG_API_ROUTE;
    axios.get(api + "/countries")
      .then(response => {
        this.countries = response.data.data.countries.map(country => {
          return {
            key: country["country code"].toLowerCase(),
            value: country["country code"].toLowerCase(),
            flag: country["country code"].toLowerCase(),
            text: country["country"]
          }
        });
        this.isCountryCodeOK = this.countries.find(country => country.value == this.countryCode);
      })
      .catch(() => this.hasError = true);
  }
}
</script>

<style>

  * {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-style: normal;
    font-variant: normal;
  }

  h1 {
    font-size: 18px;
    font-weight: 100;
    line-height: 17.6px;
  }

  h2 {
    font-size: 16px;
    font-weight: 100;
    line-height: 17.6px;
  }

  h3 {
    font-size: 14px;
    font-weight: 100;
    line-height: 15.4px;
  }

  p {
    font-size: 12px;
    font-weight: 100;
    line-height: 13.2px;
  }

  blockquote {
    font-size: 21px;
    font-weight: 400;
    line-height: 30px;
  }

  pre {
    font-size: 13px;
    font-weight: 400;
    line-height: 18.5667px;

  }

  .sdg-text-center {
    text-align: center !important;
  }

  .sdg-header {
    padding: 2.5vh !important;
    min-height: 12vh !important;
  }

  .sdg-footer {
    padding: 2.5vh !important;
    min-height: 8.2vh !important;
  }

  .sdg-view {
    min-height: 76vh !important;
  }

  .sdg-dashboard {
    min-height: 72.2vh !important;
  }
</style>
