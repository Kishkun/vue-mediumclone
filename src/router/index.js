import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'
// import {getItem} from '../helpers/persistantStorage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GlobalFeed',
    meta: {layout: 'main', auth: true},
    component: () =>
      import(/* webpackChunkName: "global feed" */ '@/views/feed/GlobalFeed')
  },
  {
    path: '/feed',
    name: 'YourFeed',
    meta: {layout: 'main', auth: true},
    props: true,
    component: () =>
      import(/* webpackChunkName: "your feed" */ '@/views/feed/YourFeed')
  },
  {
    path: '/tags/:slug',
    name: 'TagFeed',
    meta: {layout: 'main', auth: true},
    props: true,
    component: () =>
      import(/* webpackChunkName: "tag feed" */ '@/views/feed/TagFeed')
  },
  {
    path: '/article/new',
    name: 'CreateArticle',
    meta: {layout: 'main', auth: true},
    props: true,
    component: () =>
      import(/* webpackChunkName: "new article" */ '@/views/feed/GlobalFeed')
  },
  {
    path: '/article/:slug',
    name: 'Article',
    meta: {layout: 'main', auth: true},
    props: true,
    component: () =>
      import(/* webpackChunkName: "article" */ '@/views/feed/GlobalFeed')
  },
  {
    path: '/article/:slug/edit',
    name: 'EditArticle',
    meta: {layout: 'main', auth: true},
    props: true,
    component: () =>
      import(/* webpackChunkName: "edit article" */ '@/views/feed/GlobalFeed')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {layout: 'main', auth: true},
    component: () =>
      import(/* webpackChunkName: "settings" */ '@/views/settings/Settings')
  },
  {
    path: '/profiles/:slug',
    name: 'UserProfile',
    meta: {layout: 'main', auth: true},
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "user profile" */ '@/views/profile/UserProfile'
      )
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'UserProfileFavorites',
    meta: {layout: 'main', auth: true},
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "favorites profile" */ '@/views/profile/UserProfile'
      )
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'main'},
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/auth/Login')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {layout: 'main'},
    component: () =>
      import(/* webpackChunkName: "register" */ '@/views/auth/Register')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = to.matched.some(m => m.meta.auth)
//   const user = store.state.auth.currentUser
//   const accessToken = getItem('accessToken')
//   if (to.name !== 'Login' && !!isAuthenticated && !user && !accessToken) {
//     next({name: 'Login'})
//   } else if (isAuthenticated && accessToken) {
//     if (accessToken) {
//       next()
//     } else {
//       next({name: 'GlobalFeed'})
//     }
//   } else if (!to.name && !accessToken) {
//     next({name: 'Login'})
//   } else if (!to.name && !isAuthenticated && accessToken) {
//     next({name: 'GlobalFeed'})
//   } else {
//     next()
//   }
// })

export default router
