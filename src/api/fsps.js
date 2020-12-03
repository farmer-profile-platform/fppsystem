import apiService from './api'
import config from '../config'

export default {
  name: "fspService",
  components: {
    apiService
  },
  getFsps(query) {
    return apiService.get(config.FSPS_URL, query)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  addFsp() {
    return apiService.post(config.FSPS_URL)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}