import axios from 'axios'
import {getItem} from '../helpers/persistantStorage'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

http.interceptors.request.use(
  config => {
    const token = getItem('accessToken')

    if (token) {
      config.headers['Authorization'] = `Token ${token}`
    }

    return config
  },

  error => {
    return Promise.reject(error)
  }
)

export default http
