import http from '../api/axios'

const getFeed = apiUrl => {
  return http.get(apiUrl)
}

export default {
  getFeed
}
