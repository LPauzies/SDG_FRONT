import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'App',
    component: App,
    props: {
      countryCode: null
    }
  },
  {
    path: '/dashboard/:countrycode',
    name: 'AppCountry',
    component: App,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
