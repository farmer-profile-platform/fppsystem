const state = {
  farmers: [],
  newFarmersOffline: [],
  editedFarmersOffline: [],
  supportedFarmers: [],
  internetStatus: true,
}

const getters = {
  getFarmers: (state) => state.farmers,
  getNewFarmersOffline: (state) => state.newFarmersOffline,
  getEditedFarmersOffline: (state) => state.editedFarmers,
  internetStatus: (state) => state.internetStatus
}

const actions = {
  getFarmerData({ commit }, farmers) {
    commit('SET_FARMERS', farmers)
  },
  addFarmerOffline({ commit }, farmer) {
    commit('ADD_FARMER', farmer)
  },
  emptyFarmerData({ commit }, type) {
    commit('SET_FARMER_DATA_EMPTY', type)
  },
  update_internet_status({ commit }, status) {
    commit('UPDATE_INTERNET_STATUS', status)
  }
}

const mutations = {
  SET_FARMERS: (state, farmers) => {
    state.farmers = farmers;
  },
  ADD_FARMER: (state, farmer) => {
    state.newFarmersOffline.push(farmer);
    state.farmers.push(farmer);
  },
  SET_FARMER_DATA_EMPTY: (state, type) => {
    switch (type) {
      case 'new':
        state.farmers = []
        state.newFarmersOffline = []
        break;
      case 'edited':
        state.editedFarmersOffline = []
        break;
    }
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