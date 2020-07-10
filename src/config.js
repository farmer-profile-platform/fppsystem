function getApiUrl() {
  let hn = window.location.hostname
  if (hn === 'localhost') {
    return 'http://127.0.0.1:5000/api/v1/'
  } else if (hn === 'apifarmerpro.herokuapp.com') {
    return 'apifarmerpro.herokuapp.com/api/v1/'
  }

  return 'apifarmerpro.herokuapp.com/api/v1/'
}

const API_URL = getApiUrl();

export default {
  LOGIN_URL: API_URL + 'auth/login',
  REGISTER_URL: API_URL + 'aurh/register',
  LOGGED_IN_USER_URL: API_URL + 'auth/current-user',
  LOGOUT_USER_URL: API_URL + 'auth/logout',
  FARMERS_URL: API_URL + 'farmers'
}