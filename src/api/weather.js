import axios from 'axios'

export default {
  name: 'weatherService',

  getWeatherDetails() {
    let url = 'api.openweathermap.org/data/2.5/weather?lat=-1.632996&lon=7.775377&appid=de2e83832b6073dec95a3617645c5e09'

    return axios.get(url)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(this.handleError(error)))
  },

}