import authApi from '../../api/auth'
import {setItem, removeItem} from '../../helpers/persistantStorage'

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
    state.isLoggedIn = !!user
  },
  SET_ERRORS(state, errors) {
    state.validationErrors = errors
  },
  LOGIN_START(state, isSubmitting) {
    state.isSubmitting = isSubmitting
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
      }
    } catch (error) {
      commit('SET_ERRORS', error.response.data.errors)
    }
    commit('REGISTER_START', false)
  },
  async LOGIN({commit}, formData) {
    commit('LOGIN_START', true)
    try {
      const response = await authApi.login(formData)
      if (response.data) {
        commit('SET_USER', response.data.user)
        setItem('accessToken', response.data.user.token)
      }
    } catch (error) {
      commit('SET_ERRORS', error.response.data.errors)
    }
    commit('LOGIN_START', false)
  },
  async LOGOUT({commit}) {
    try {
      commit('SET_USER', null)
      removeItem('accessToken')
    } catch (error) {
      commit('SET_ERRORS', error.response.data.errors)
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
