import axios from 'axios';
import apiService from './api';
import config from '../config';

export default {
  name: 'farmersService',
  components: {
    apiService
  },
  getFarmers (query) {
    return apiService.get(config.FARMERS_URL, query)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getFarmer (id) {
    let url = config.FARMERS_URL + '/' + id
    return apiService.get(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  addFarmer (farmerData) {
    let url = config.FARMERS_URL
    return apiService.post(url, farmerData)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  updateFarmer (farmerData) {
    let url = config.FARMERS_URL + '/' + farmerData.id
    return apiService.update(url, farmerData)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getFarmersWithSupport () {
    let url = config.FARMERS_URL + "/support"
    return apiService.get(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  uploadFiles (file) {
    let self = this;
    let url = config.UPLOAD_FILE_URL;
    return axios.get(url)
      .then((response) => self.uploadImageUrl(response.data, file))
      .catch((error) => this.errorMessage(error.error))
  },
  async uploadImageUrl (presignedUrl, image) {
    // console.log(presignedUrl.url)
    const result = await fetch(presignedUrl.url, {
      method: 'PUT',
      body: image,
      headers: {
        'Content-Type': image.type,
      }
    })
    console.log('Result: ', result)
  },
  deleteFarmer (id) {
    let url = config.FARMERS_URL + '/' + id
    return apiService.delete(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}