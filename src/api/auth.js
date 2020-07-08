import apiService from './api'
import config from '../config'

export default {
  name: 'userService',
  components: {
    apiService
  },
  isTokenExpired(expiresAt) {
    let nowDate = new Date()
    nowDate.setSeconds(nowDate.getSeconds() + 5)
    let expiresDate = new Date(expiresAt)
    return (expiresDate.getTime() < nowDate.getTime())
  },
  login(request) {
    return apiService.post(config.LOGIN_URL, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  register(request) {
    return apiService.post(config.REGISTER_URL, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getLoggedInUser() {
    return apiService.get(config.LOGGED_IN_USER_URL)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  logout() {
    return apiService.get(config.LOGOUT_URL)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  validAuth(loggedIn) {
    if (loggedIn == true) {
      return true
    } else {
      return false
    }
  }
}
