import apiService from './api'
import config from '../config'

export default {
  name: "issueService",
  components: {
    apiService
  },
  getIssues() {
    return apiService.get(config.ISSUES_URL)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  addIssues(issue) {
    return apiService.post(config.ISSUES_URL, issue)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  deleteIssue(id) {
    let url = config.ISSUES_URL + '/' + id
    return apiService.delete(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}