import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Paul from '../views/Paul.vue'
import Jack from '../views/Jack.vue'
import Jason from '../views/Jason.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/paul',
    name: 'paul',
    component: Paul
  },
  {
    path: '/jack',
    name: 'jack',
    component: Jack
  },
  {
    path: '/jason',
    name: 'jason',
    component: Jason
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
