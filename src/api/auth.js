import http from '../api/axios'

const register = user => {
  return http.post('/users', {user})
}

const login = user => {
  return http.post('/users/login', {user})
}

export default {
  register,
  login
}
