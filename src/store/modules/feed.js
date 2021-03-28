import feedApi from '../../api/feed'

const state = () => ({
  data: null,
  isLoading: false,
  error: null
})

const mutations = {
  SET_DATA(state, data) {
    state.data = data
  },
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async GET_FEED({commit}, {apiUrl}) {
    commit('SET_LOADING', true)
    try {
      const response = await feedApi.getFeed(apiUrl)
      if (response.data) {
        commit('SET_DATA', response.data)
      }
    } catch (error) {
      console.log(error)
      commit('SET_ERROR', error.response.data.error)
    }
    commit('SET_LOADING', false)
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
