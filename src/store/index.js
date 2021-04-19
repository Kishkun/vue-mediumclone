import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './modules/auth'
import feed from './modules/feed'
import tag from './modules/tag'

export default new Vuex.Store({
  state: () => ({}),
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    tag
  }
})
