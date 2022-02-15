import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      // {
      //   path: '/',
      //   name: 'home',
      //   component: () => import('@/views/home')
      // },
      // {
      //   path: '/mall',
      //   name: 'mall',
      //   component: () => import('@/views/mall')
      // },
      // {
      //   path: '/user',
      //   name: 'user',
      //   component: () => import('@/views/user')
      // },
      // {
      //   path: '/page1',
      //   name: 'page1',
      //   component: () => import('@/views/other/pageOne.vue')
      // },
      // {
      //   path: '/page2',
      //   name: 'page2',
      //   component: () => import('@/views/other/pageTwo.vue')
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
