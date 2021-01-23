function getApiUrl() {
  let hn = window.location.hostname
  if (hn === 'localhost') {
    return 'http://127.0.0.1:5000/api/v1/'
  } else if (hn == 'fppghana.com') {
    return 'https://fppapi.icu/api/v1/'
  } else {
    return 'https://fppapi.icu/api/v1/'
  }
}

const API_URL = getApiUrl();

export default {
  APP_URL: API_URL,
  LOGIN_URL: '/api/v1/auth/login',
  REGISTER_URL: '/api/v1/auth/register',
  LOGGED_IN_USER_URL: '/api/v1/auth/current-user',
  LOGOUT_USER_URL: '/api/v1/auth/logout',
  FARMERS_URL: '/api/v1/farmers',
  USERS_URL: '/api/v1/users',
  REPORTS_URL: '/api/v1/dashboard-reports',
  ACTIVITIES_URL: '/api/v1/activities',
  SUPPORTS_URL: '/api/v1/supports',
  FSPS_URL: '/api/v1/fsps'
}