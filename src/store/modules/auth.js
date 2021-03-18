import authApi from '../../api/auth'
import {setItem} from '../../helpers/persistantStorage'

const state = () => ({
  user: null,
  isSubmitting: false,
  isLoggedIn: null,
  validationErrors: null
})

const mutations = {
  REGISTER_START(state, isSubmitting) {
    state.isSubmitting = isSubmitting
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_IS_LOGGED_IN(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  },
  SET_ERRORS(state, errors) {
    state.validationErrors = errors
  }
}

const actions = {
  async REGISTER({commit}, formData) {
    // return new Promise(() => {
    //   commit('REGISTER_START', true)
    //   authApi
    //     .register(formData)
    //     .then(response => {
    //       if (response.data) {
    //         commit('SET_USER', response.data.user)
    //         commit('SET_IS_LOGGED_IN', true)
    //       } else {
    //         commit('REGISTER_START', false)
    //       }
    //     })
    //     .catch(error => {
    //       commit('REGISTER_START', false)
    //       commit('SET_ERRORS', error.response.data.errors)
    //     })
    // })
    commit('REGISTER_START', true)
    try {
      const response = await authApi.register(formData)
      if (response.data) {
        commit('SET_USER', response.data.user)
        setItem('accessToken', response.data.user.token)
        commit('SET_IS_LOGGED_IN', true)
      }
    } catch (error) {
      commit('SET_ERRORS', error.response.data.errors)
    }
    commit('REGISTER_START', false)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
