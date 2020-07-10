function getApiUrl() {
  let hn = window.location.hostname
  if (hn === 'localhost') {
    return 'http://127.0.0.1:5000/api/v1/'
  } else if (hn === 'http://fppghana.com') {
    return 'http://api.fppghana.com'
  }

  return 'http://api.fppghana.com'
}

const API_URL = getApiUrl();

export default {
  LOGIN_URL: API_URL + 'auth/login',
  REGISTER_URL: API_URL + 'aurh/register',
  LOGGED_IN_USER_URL: API_URL + 'auth/current-user',
  LOGOUT_USER_URL: API_URL + 'auth/logout',
  FARMERS_URL: API_URL + 'farmers'
}