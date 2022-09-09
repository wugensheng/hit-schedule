import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
