<template>
  <div>
    <h2>{{ topicColor.toUpperCase() }}</h2>
    <div id="plot" class="ui segment bordered economic" v-if="topicColor == 'economic'">
      <template v-for="goal in topicData">
        <Plot v-bind:key="goal['goal code']" v-bind:country="topicCountry" v-bind:color="'#1748ff'" v-bind:id="goal['goal code']" v-bind:goal-desc-input="goal['goal description']" v-bind:goal-unit-input="goal.unit" v-bind:goal-data-input="goal.data" />
      </template>
    </div>
    <div id="plot" class="ui segment bordered ecologic" v-else-if="topicColor == 'ecologic'">
      <template v-for="goal in topicData">
        <Plot v-bind:key="goal['goal code']" v-bind:country="topicCountry" v-bind:color="'#00dd2c'" v-bind:id="goal['goal code']" v-bind:goal-desc-input="goal['goal description']" v-bind:goal-unit-input="goal.unit" v-bind:goal-data-input="goal.data" />
      </template>
    </div>
    <div id="plot" class="ui segment bordered social" v-else-if="topicColor == 'social'">
      <template v-for="goal in topicData">
        <Plot v-bind:key="goal['goal code']" v-bind:country="topicCountry" v-bind:color="'#ff0000'" v-bind:id="goal['goal code']" v-bind:goal-desc-input="goal['goal description']" v-bind:goal-unit-input="goal.unit" v-bind:goal-data-input="goal.data" />
      </template>
    </div>
  </div>
</template>

<script>
import Plot from '@/components/dashboard/Plot.vue';

export default {
  name: 'PlotPanel',
  components: {
    Plot
  },
  props: {
    topicSelectionData: Array,
    topicSelectionColor: String,
    topicSelectionCountry: String
  },
  data: function() {
    return {
      topicData: null,
      topicColor: "",
      topicCountry: null
    }
  },
  mounted: function() {
    this.topicData = this.topicSelectionData;
    this.topicColor = this.topicSelectionColor;
    this.topicCountry = this.topicSelectionCountry;
  },
  watch: {
     topicSelectionData: function(newValue) {
       this.topicData = newValue;
     },
     topicSelectionColor: function(newValue) {
       this.topicColor = newValue;
     },
     topicSelectionCountry: function(newValue) {
       this.topicCountry = newValue;
     }
   },
}
</script>

<style scoped lang="scss">
  .bordered {
    border-style: solid;
    border-width: 2px !important;
  }

  .bordered.economic {
    border-color: #1748ff;
  }

  .bordered.ecologic {
    border-color: #00dd2c;
  }

  .bordered.social {
    border-color: #ff0000;
  }
</style>
