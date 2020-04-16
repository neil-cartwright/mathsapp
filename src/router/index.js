import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PrintSums from '../views/PrintSums.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/printSums',
    name: 'PrintSums',
    component: PrintSums
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router