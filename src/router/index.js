import Vue from 'vue'
import VueRouter from 'vue-router'
import PrintSums from '../views/PrintSums.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'PrintSums',
    component: PrintSums
  },
  {
    path: '/print-sums',
    name: 'PrintSums',
    component: PrintSums
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router