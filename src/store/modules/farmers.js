const state = {
  farmers: [],
  newFarmers: [],
  internetStatus: true
}

const getters = {
  getFarmers: (state) => state.farmers,
  getNewFarmers: (state) => state.newFarmers,
  internetStatus: (state) => state.internetStatus
}

const actions = {
  getFarmerData({ commit }, farmers) {
    commit('SET_FARMERS', farmers)
  },
  update_internet_status({ commit }, status) {
    commit('UPDATE_INTERNET_STATUS', status)
  }
}

const mutations = {
  SET_FARMERS: (state, farmers) => {
    state.farmers = farmers;
  },
  UPDATE_INTERNET_STATUS: (state, status) => {
    state.internetStatus = status;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}