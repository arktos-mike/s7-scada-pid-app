import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'App',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/boiler1',
    name: 'boiler1',
    component: () => import('../views/boiler1.vue')
  },
  {
    path: '/boiler2',
    name: 'boiler2',
    component: () => import('../views/boiler2.vue')
  },
  {
    path: '/boiler3',
    name: 'boiler3',
    component: () => import('../views/boiler3.vue')
  },
  {
    path: '/boiler4',
    name: 'boiler4',
    component: () => import('../views/boiler4.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '*',
    redirect: '/'
  }]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
