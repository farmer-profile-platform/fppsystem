// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import fppauth from './modules/authenticate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    fppauth
  },
  plugins: [
    createPersistedState()
  ]
})
