import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import {getItem} from '../helpers/persistantStorage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/Home')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {layout: 'main', auth: true},
    component: () =>
      import(/* webpackChunkName: "settings" */ '@/views/settings/Settings')
  },
  {
    path: '/new-article',
    name: 'NewArticle',
    meta: {layout: 'main', auth: true},
    component: () =>
      import(/* webpackChunkName: "new-article" */ '@/views/article/NewArticle')
  },
  {
    path: '/user-profile',
    name: 'UserProfile',
    meta: {layout: 'main', auth: true},
    component: () =>
      import(
        /* webpackChunkName: "user-profile" */ '@/views/profile/UserProfile'
      )
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'empty'},
    component: () =>
      import(/* webpackChunkName: "register" */ '@/views/auth/Login')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {layout: 'empty'},
    component: () =>
      import(/* webpackChunkName: "register" */ '@/views/auth/Register')
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
  if (to.name !== 'Login' && !!isAuthenticated && !user && !accessToken) {
    next({name: 'Login'})
  } else if (isAuthenticated && accessToken) {
    if (accessToken) {
      next()
    } else {
      next({name: 'Home'})
    }
  } else if (!to.name && !accessToken) {
    next({name: 'Login'})
  } else if (!to.name && !isAuthenticated && accessToken) {
    next({name: 'Home'})
  } else {
    next()
  }
})

export default router
