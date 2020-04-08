<template>
  <div>
    <sui-table striped class="ui segment bordered economic" v-if="topicColor == 'economic'">
      <sui-table-header>
        <sui-table-row>
          <sui-table-header-cell align="center">
            <h2 class="sdg-text-center">
              {{ topicColor.toUpperCase() }}
            </h2>
          </sui-table-header-cell>
        </sui-table-row>
      </sui-table-header>
      <sui-table-body>
        <sui-table-row v-for="goal in topicData" :key="goal['goal code']">
          <sui-table-cell>
            <Plot v-bind:key="goal['goal code']" v-bind:country="topicCountry" v-bind:color="'#1748ff'" v-bind:id="goal['goal code']" v-bind:goal-desc-input="goal['goal description']" v-bind:goal-unit-input="goal.unit" v-bind:goal-data-input="goal.data" />
          </sui-table-cell>
        </sui-table-row>
      </sui-table-body>
    </sui-table>
    <sui-table striped class="ui segment bordered ecologic" v-if="topicColor == 'ecologic'">
      <sui-table-header>
        <sui-table-row>
          <sui-table-header-cell>
            <h2 class="sdg-text-center">
              {{ topicColor.toUpperCase() }}
            </h2>
          </sui-table-header-cell>
        </sui-table-row>
      </sui-table-header>
      <sui-table-body>
        <sui-table-row v-for="goal in topicData" :key="goal['goal code']">
          <sui-table-cell>
            <Plot v-bind:key="goal['goal code']" v-bind:country="topicCountry" v-bind:color="'#1748ff'" v-bind:id="goal['goal code']" v-bind:goal-desc-input="goal['goal description']" v-bind:goal-unit-input="goal.unit" v-bind:goal-data-input="goal.data" />
          </sui-table-cell>
        </sui-table-row>
      </sui-table-body>
    </sui-table>
    <sui-table striped class="ui segment bordered social" v-if="topicColor == 'social'">
      <sui-table-header>
        <sui-table-row>
          <sui-table-header-cell>
            <h2 class="sdg-text-center">
              {{ topicColor.toUpperCase() }}
            </h2>
          </sui-table-header-cell>
        </sui-table-row>
      </sui-table-header>
      <sui-table-body>
        <sui-table-row v-for="goal in topicData" :key="goal['goal code']">
          <sui-table-cell>
            <Plot v-bind:key="goal['goal code']" v-bind:country="topicCountry" v-bind:color="'#1748ff'" v-bind:id="goal['goal code']" v-bind:goal-desc-input="goal['goal description']" v-bind:goal-unit-input="goal.unit" v-bind:goal-data-input="goal.data" />
          </sui-table-cell>
        </sui-table-row>
      </sui-table-body>
    </sui-table>
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
