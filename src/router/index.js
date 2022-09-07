import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import Layout from '@/views/Layout'
import User from '@/views/User'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
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
        path: 'user',
        component: User
      },
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
