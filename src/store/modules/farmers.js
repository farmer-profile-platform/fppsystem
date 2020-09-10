const state = {
  farmers: [],
  newFarmersOffline: [],
  editedFarmersOffline: [],
  supportedFarmers: [],
  internetStatus: true,
  savingsLoans: [
    'ABii National Savings and Loans Ltd',
    'Adehyeman Savings and Loans Company Ltd',
    'Advans Ghana Savings and Loans Ltd',
    'Asa Savings and Loans Company Limited',
    'Assurance Savings and Loans Ltd',
    'Bayport Savings and Loans Plc',
    'Best Point Savings and Loans Ltd',
    'Bond Savings and Loans Ltd',
    'Direct Savings and Loans Limited',
    'Equity Savings and Loans Ltd.',
    'Izwe Savings and Loans Ltd.',
    'UniCredit Ghana',
    'Jins Savings and Loans Ltd.',
    'Multi Credit Savings & Loans Co. Ltd.',
    'SIC Life Savings and Loans Ltd.',
    'Sinapi Aba Savings and Loans Company Ltd',
    'Utrak Savings and Loans Ltd',
  ],
  banks: [
    'Access Bank Ghana Plc',
    'Absa Bank Ghana Limited',
    'Agricultural Development Bank of Ghana',
    'Bank of Africa Ghana Limited',
    'Consolidated Bank Ghana Limited',
    'CalBank Limited',
    'Ecobank Ghana Limited',
    'FBN Bank Ghana Limited',
    'Fidelity Bank Ghana Limited',
    'First Atlantic Bank Limited',
    'First National Bank Ghana',
    'GCB Bank Limited',
    'GHL Bank Limited',
    'Guaranty Trust Bank Ghana Limited',
    'National Investment Bank Limited',
    'OmniBSIC Bank Ghana Limited',
    'Prudential Bank Limited',
    'Republic Bank Ghana Limited',
    'Société Générale Ghana Limited',
    'Stanbic Bank Ghana Limited',
    'Standard Chartered Bank Ghana Limited',
    'United Bank for Africa Ghana Limited',
    'Universal Merchant Bank Limited',
    'Zenith Bank Ghana Limited',
  ],
  ruralBanks: [
    'Adansi Rural Bank',
    'Ahafo Ano Rural Bank',
    'Abokobi Area Rural Bank Limited',
    'Ada Rural Bank Limited',
    'Adonten Community Bank Limited',
    'Afram Rural Bank Limited',
    'Atiwa Rural Bank Limited',
    'Ahantaman Rural Bank Limited',
    'Ahafo Community Bank Limited',
    'Agona Rural Bank Limited',
    'Adonten Community Bank Limited',
    'Atiwa Rural Bank Limited',
  ],
}

const getters = {
  getFarmers: (state) => state.farmers,
  getNewFarmersOffline: (state) => state.newFarmersOffline,
  getEditedFarmersOffline: (state) => state.editedFarmers,
  getBanks: (state) => state.banks,
  getRuralBanks: (state) => state.ruralBanks,
  getSavingsLoans: (state) => state.savingsLoans,
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