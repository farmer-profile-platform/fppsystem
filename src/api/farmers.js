import apiService from './api'
import config from '../config'

export default {
  name: 'farmersService',
  components: {
    apiService
  },
  getFarmers() {
    return apiService.get(config.FARMERS_URL)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getFarmer(id) {
    let url = config.FARMERS_URL + id
    return apiService.get(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}