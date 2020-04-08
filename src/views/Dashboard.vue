<template>
  <div>
    <div v-if="!hasError && countryData">
      <div v-if="loading" id="dashboard" class="ui two column grid sdg-dashboard sdg-text-center active loader">
      </div>
      <div v-else id="dashboard" class="ui two column grid sdg-dashboard">
        <div class="column medium-size">
          <MapDisplay :country="countryData" :latitude="latData" :longitude="lonData"/>
        </div>
        <div class="column medium-size">
          <TopicSelector v-on:topicSelectorToParent="onTopicSelection" :goals="goalsData"/>
        </div>
        <div class="two ui column row sdg-text-center">
          <PlotPanel class="full-width" v-bind:topic-selection-country="countryData" v-bind:topic-selection-data="topicSelectionData" v-bind:topic-selection-color="topicColor" />
        </div>
      </div>
      <sui-divider horizontal><h1>{{ countryData }}</h1></sui-divider>
    </div>
    <div v-else>
      <NotFound :error-type="pageNotFound"/>
    </div>
  </div>
</template>

<script>
import NotFound from '@/views/NotFound.vue';
import MapDisplay from '@/components/dashboard/MapDisplay.vue';
import TopicSelector from '@/components/dashboard/TopicSelector.vue';
import PlotPanel from '@/components/dashboard/PlotPanel.vue';

const axios = require('axios');

export default {
  name: 'Dashboard',
  components: {
    NotFound,
    MapDisplay,
    TopicSelector,
    PlotPanel
  },
  props: {
    countryCode: String
  },
  data: function() {
    return {
      loading: true,
      hasError: false,
      country: this.countryCode,
      //Country, lat, lon
      countryData: null,
      latData: null,
      lonData: null,
      //Goals provided to Topic Selector
      goalsData: null,
      //Selected topic provided by Topic Selector
      topicSelection: null,
      //Topic Data provided to Plot component
      topicData: null, //All topic data
      topicSelectionData: null,
      topicColor: null,
      pageNotFound: "Error 500 : Cannot connect to get remote data."
    }
  },
  created: function() {
    const api = process.env.VUE_APP_SDG_API_PROTOCOL + "://" + process.env.VUE_APP_SDG_API_DOMAIN + ":" + process.env.VUE_APP_SDG_API_PORT + process.env.VUE_APP_SDG_API_ROUTE;
    axios.get(api + "/countrycode/" + this.countryCode)
      .then(response => {
        this.countryData = response.data.data.country;
        this.latData = response.data.data.coordinates.latitude;
        this.lonData = response.data.data.coordinates.longitude;
        this.goalsData = response.data.data.goals.map(goal => {
          return {
            goal_code: goal["goal code"],
            goal_description: goal["goal description"]
          }
        });
        //Ignore NaN and remove empty topics
        this.topicData = response.data.data.goals.map(goal => {
          let res = {};
          res['goal code'] = goal['goal code'];
          res['goal description'] = goal['goal description'];
          res['unit'] = goal['unit'];
          res['source'] = goal['source'];
          res['data'] = goal.data.filter(data => data.value != "nan").sort(this.compare).map(data => {
            let res = {};
            res['time period'] = data['time period'];
            res['value'] = data['value'];
            res['extra data'] = data['extra data'].filter(extraData => !extraData.includes(":NULL"));
            return res;
          });
          return res
        }).filter(goal => goal.data.length != 0);
      })
      .catch(() => this.hasError = true)
      .finally(() => this.loading = false);
  },
  methods: {
    onTopicSelection: function(res) {
      if (res) {
        this.topicColor = res.color;
        this.topicSelectionData = this.topicData.filter(goal => res.data.includes(goal["goal code"]));
      }
    },
    compare: function(date1, date2) {
      return date1['time period'] - date2['time period'];
    }
  }

  }
</script>

<style scoped lang="scss">
  #dashboard {
    margin-bottom: 3.1vh;
    margin-left: 1vw;
    margin-right: 1vw;
  }

  .medium-size {
    height: 30vh;
  }

  .full-width {
    width: 100%;
  }
</style>
