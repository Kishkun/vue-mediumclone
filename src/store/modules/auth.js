const state = () => ({
  loading: false,
  login: false
})

const getters = {}

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_LOGIN(state, isLogin) {
    state.login = isLogin
  }
}

const actions = {
  LOGIN({commit}, formData) {
    commit('SET_LOADING', true)
    setTimeout(() => {
      try {
        const res = formData
        if (res) {
          localStorage.setItem('login', JSON.stringify(res))
          commit('SET_LOGIN', true)
        }
      } catch (err) {
        console.log(err)
      }
      commit('SET_LOADING', false)
    }, 2000)
  },
  LOGOUT({commit}) {
    commit('SET_LOGIN', false)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
