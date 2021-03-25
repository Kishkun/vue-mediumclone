import authApi from '../../api/auth'
import {setItem, removeItem} from '../../helpers/persistantStorage'

const state = () => ({
  currentUser: null,
  isSubmitting: false,
  isLoading: false,
  isLoggedIn: null,
  validationErrors: null
})

const mutations = {
  REGISTER_START(state, isSubmitting) {
    state.isSubmitting = isSubmitting
  },
  SET_USER(state, currentUser) {
    state.currentUser = currentUser
    state.isLoggedIn = !!currentUser
  },
  SET_ERRORS(state, errors) {
    state.validationErrors = errors
  },
  LOGIN_START(state, isSubmitting) {
    state.isSubmitting = isSubmitting
  },
  LOADING_CURRENT_USER(state, payload) {
    state.isLoading = payload
    state.isLoggedIn = payload
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
        console.log(response.data)
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
  async GET_CURRENT_USER({commit}) {
    commit('LOADING_CURRENT_USER', true)
    try {
      const response = await authApi.getUser()
      if (response.data) {
        commit('SET_USER', response.data.user)
      }
    } catch (error) {
      console.log('Error, user not found, contact the administrator')
    }
    commit('LOADING_CURRENT_USER', false)
  },
  async LOGOUT({commit}) {
    try {
      commit('SET_USER', null)
      removeItem('accessToken')
    } catch (error) {
      console.log('Something went wrong, contact the administrator')
    }
  }
}

const getters = {
  currentUser: state => state.currentUser,
  isLoggedIn: state => Boolean(state.isLoggedIn),
  isAnonymous: state => state.isLoggedIn === false
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
