<template>
  <div>
      <div class="ui segment loading-plot" v-if="loading">
        <div class="ui active dimmer">
          <div class="ui text loader">Loading</div>
        </div>
      </div>
      <div v-else>
        <div v-if="hasError">
          Cannot retrieve data from API
        </div>
        <div v-else>
          <div :id="id" v-if="valueType == 'Numeric'" class="plot">
          </div>
          <div :id="id" v-else-if="valueType == 'String'" class="table">
          </div>
          <div :id="id" v-else-if="valueType == 'Coordinates'">
            Coordinates {{ goalDataX }} / {{ goalDataY }} / {{ goalDataExtra }}
          </div>
        </div>
      </div>
  </div>
</template>

<script>
const axios = require('axios');
import Plotly from 'plotly.js/dist/plotly'

export default {
  name: 'Plot',
  props: {
    goalDescInput: String,
    goalUnitInput: String,
    id: String,
    country: String,
    goalDataInput: Array,
    color: String
  },
  data: function() {
    return {
      hasError: false,
      loading: true,
      topicValues: null,
      goalDesc: "", //Desc of the goal
      goalUnit: "", //Unit of the goal
      goalDataX: null, //X coordinates of the plot
      goalDataY: null, //Y coordinates of the plot
      goalDataExtra: null, //Extra data
      valueType: null, //The type of the plot
      colorBox: null
    }
  },
  created: function() {
    const api = process.env.VUE_APP_SDG_API_PROTOCOL + "://" + process.env.VUE_APP_SDG_API_DOMAIN + ":" + process.env.VUE_APP_SDG_API_PORT + process.env.VUE_APP_SDG_API_ROUTE;
    axios.get(api + "/topic/" + this.id)
      .then(response => {
        if (this.checkMajorityFloat(response)) {
          this.valueType = "Numeric";
          this.topicValues = response.data.data.data.map(e => {
            return {
              country: e.country,
              'country code': e['country code'],
              value: parseFloat(e.value)
            }
          });
        } else {
          this.valueType = "String";
          this.topicValues = response.data.data.data;
        }
      })
      .catch(() => this.hasError = true)
      .finally(() => this.loading = false);
  },
  mounted: function() {
    this.goalDesc = this.goalDescInput;
    this.goalUnit = this.goalUnitInput;
    this.goalCountry = this.id
    this.goalDataX = this.goalDataInput.map(data => parseInt(data['time period']));
    this.goalDataY = this.goalDataInput.map(data => (this.valueType == "Numeric") ? parseFloat(data['value']) : data['value']);
    this.goalDataExtra = this.goalDataInput.map(data => data['extra data']);
    this.colorBox = this.color;
  },
  watch: {
    goalDescInput: function(newVal) {
      this.goalDesc = newVal;
    },
    goalUnitInput: function(newVal) {
      this.goalUnit = newVal;
    },
    goalDataInput: function(newVal) {
      this.goalDataX = newVal.map(data => parseInt(data['time period']));
      this.goalDataY = newVal.map(data => (this.valueType == "Numeric") ? parseFloat(data['value']) : data['value']);
      this.goalDataExtra = this.goalDataInput.map(data => data['extra data']);
    }
  },
  updated() {
      switch (this.valueType) {
        case 'Numeric':
          this.buildBoxPlot(this.id, this.country, this.topicValues, this.goalDataY, this.goalDesc, this.goalUnit, this.color);
          break;
        case 'String':
          this.buildTablePlot(this.id, this.country, this.goalDataX, this.goalDataY, this.goalDesc, this.goalUnit, this.color);
          break;
      }
  },
  methods: {
    checkMajorityFloat: function(response) {
      let filtered = response.data.data.data.filter(e => {
        return parseFloat(e.value);
      });
      return filtered.length > response.data.data.data.length * 0.8;
    },
    generateAnnotation: function(value, text, y, ay, labelColor, fontColor) {
      return {
        x: value,
        y: y,
        xref: 'x',
        yref: 'y',
        text: text + ": " + Math.round(value * 100) / 100,
        showarrow: true,
        arrowhead: 2,
        ax: 0,
        ay: ay,
        font: {
          color: fontColor
        },
        align: 'center',
        arrowsize: 1,
        arrowwidth: 2,
        arrowcolor: '#636363',
        bordercolor: '#c7c7c7',
        borderwidth: 1,
        borderpad: 3,
        bgcolor: labelColor,
        opacity: 1
      }
    },
    buildBoxPlot: function(id, country, topicValues, values, name, unit, colorBoxPlot) {
      var annotations = [];
      let lastValue = values[values.length - 1];
      let topicValues_ = topicValues.map(data => data.value);
      let mainAnnot = this.generateAnnotation(lastValue, country, 2, -30, this.color, 'white');
      mainAnnot['font']['size'] = 14;
      mainAnnot['borderpad'] = 4;
      annotations.push(mainAnnot);
      //Statistical values
      let minValue = topicValues_[0];
      let minCountry = topicValues.filter(topic => topic.value == minValue)[0];
      if (minCountry) {
        annotations.push(this.generateAnnotation(minValue, "Min: " + minCountry.country, 0.5, -30, '#00e0ff', 'black'));
      }
      let q1Index = Math.floor(topicValues_.length * 0.25);
      let q1Value = topicValues_[q1Index];
      let q1Country = topicValues.filter(topic => topic.value == q1Value)[0];
      if (q1Country) {
        annotations.push(this.generateAnnotation(q1Value, "Q1: " + q1Country.country, 1, -30, '#009eff', 'black'));
      }
      //
      let medianIndex = Math.floor(topicValues_.length * 0.5);
      let medianValue = topicValues_[medianIndex];
      let medianCountry = topicValues.filter(topic => topic.value == medianValue)[0];
      if (medianCountry) {
        annotations.push(this.generateAnnotation(medianValue, "Median: " + medianCountry.country, 1.5, -30, '#c900ff', 'black'));
      }
      //
      let q3Index = Math.floor(topicValues_.length * 0.75);
      let q3Value = topicValues_[q3Index];
      let q3Country = topicValues.filter(topic => topic.value == q3Value)[0];
      if (q3Country) {
        annotations.push(this.generateAnnotation(q3Value, "Q3: " + q3Country.country, 1, -30, '#ff00c9', 'black'));
      }
      //
      let maxValue = topicValues_[topicValues_.length - 1];
      let maxCountry = topicValues.filter(topic => topic.value == maxValue)[0];
      if (maxCountry) {
        annotations.push(this.generateAnnotation(maxValue, "Max: " + maxCountry.country, 0.5, -30, '#ff0000', 'black'));
      }
      var trace = {
        x:  topicValues_,
        type: 'box',
        name: "",
        marker: {
          color: colorBoxPlot
        }
      };
      var layout = {
        title: name + " - " + unit,
        annotations: annotations,
        xaxis: {
          title: {
            text: ''
          }
        },
        yaxis: {
          title: {
            text: ''
          }
        }
      };
      var config = {
        editable: true
      };
      Plotly.newPlot(id, [trace], layout, config);
    },
    buildPieChartPlot: function(id, values, unit, name) {
      var values_ = [];
      var labels_ = [];
      for (var i = 0; i < values.length; i++) {
        var index = labels_.indexOf(values[i]);
        if (index == -1) {
          labels_.push(values[i]);
          values_.push(1);
        } else {
          values_[index] = values_[index] + 1;
        }

      }
      var data = {
        values: values_,
        labels: labels_,
        jitter: 0.3,
        type: 'pie',
        name: 'Unit : ' + unit
      };
      var layout = {
        title: name
      };
      Plotly.newPlot(id, [data], layout);
    },
    buildTablePlot: function(id, country, goalDataX, goalDataY, name, unit, color) {
      let topicFrance = this.topicValues.filter(topic => topic['country code'].toLowerCase() == 'fr')[0];
      var dates = [];
      var values = [];
      var countries = [];
      dates.push('This year');
      values.push((topicFrance) ? topicFrance.value : "Not known");
      countries.push('FRANCE');
      for (var i = 0; i < goalDataX.length; i++) {
        if (!dates.includes(goalDataX[i])) {
          dates.push(goalDataX[i]);
          values.push(goalDataY[i]);
          countries.push(country);
        }
      }
      var data = {
        type: 'table',
        header: {
          values : ['Date', 'Value', 'Reference country'],
          align: "center",
          line: {width: 1, color: color},
          fill: {color: color},
          font: {color: "white"}
        },
        cells: {
          values: [dates, values, countries],
          align: "center",
          line: {color: "black", width: 1},
          font: {color: ["black"]}
        }
      };
      var layout = {
        title: name + ' - ' + unit
      };
      Plotly.newPlot(id, [data], layout);
    }
  }
}
</script>

<style scoped lang="scss">
  .loading-plot {
    height: 20vh;
    min-width: 20vw;
  }
</style>
