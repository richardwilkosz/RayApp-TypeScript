import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import ResumeApp from '../components/resume/ResumeApp.vue'
import RayApp from '../components/ray/RayApp.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'ResumeApp',
    component: ResumeApp
  },
  {
    path: '/ray',
    name: 'RayApp',
    component: RayApp
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
