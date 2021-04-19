import tagApi from '../../api/tag'

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
    if (isLoading) {
      state.data = null
    }
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async GET_TAGS({commit}) {
    commit('SET_LOADING', true)
    try {
      const response = await tagApi.getPopularTags()
      if (response) {
        commit('SET_DATA', response.data.tags)
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
