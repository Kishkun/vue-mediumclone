import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
  const user = JSON.parse(localStorage.getItem('login'))
  if (to.name !== 'Login' && !!isAuthenticated && !user) {
    next({name: 'Login'})
  } else {
    next()
  }
})

export default router
