import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'
import {getItem} from '../helpers/persistantStorage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main', auth: true},
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'empty'},
    component: () =>
      import(/* webpackChunkName: "register" */ '@/views/Auth/Login')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {layout: 'empty'},
    component: () =>
      import(/* webpackChunkName: "register" */ '@/views/Auth/Register')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = to.matched.some(m => m.meta.auth)
  const user = store.state.auth.user
  const accessToken = getItem('accessToken')
  if (to.name !== 'Register' && !!isAuthenticated && !user && !accessToken) {
    next({name: 'Register'})
  } else if (to.name !== 'Home' && accessToken) {
    next({name: 'Home'})
  } else {
    next()
  }
})

export default router
