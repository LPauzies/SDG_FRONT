import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import App from './App.vue';

import 'semantic-ui-css/semantic.min.css';
import './registerServiceWorker';

import router from './router';

Vue.use(SuiVue);
Vue.config.productionTip = false

new Vue({
  router,
  props: {
    countrycode: String
  },
  render: h => h(App)
}).$mount('#app')
