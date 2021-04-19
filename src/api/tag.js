import http from '../api/axios'

const getPopularTags = () => {
  return http.get('/tags')
}

export default {
  getPopularTags
}
