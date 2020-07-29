import apiService from './api'
import config from '../config'

export default {
  name: 'dashboarsService',

  getReports() {
    return apiService.get(config.DASHBOARD_URL)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}