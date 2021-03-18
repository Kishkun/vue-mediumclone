import http from '../api/axios'

const register = user => {
  return http.post('/users', {user})
}

export default {
  register
}
