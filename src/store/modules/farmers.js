import farmersService from '@/api/farmers';

const state = {
  farmers: [],
  newFarmersOffline: [],
  editedFarmersOffline: [],
  supportedFarmers: [],
  internetStatus: true,
  photo: '',
}

const getters = {
  getFarmers: (state) => state.farmers,
  getFarmerFiles: (state) => state.files,
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
  get_files({ commit }, file) {
    commit('CONVERT_BASE64_FILE', file)
  },
  emptyFarmerData({ commit }, type) {
    commit('SET_FARMER_DATA_EMPTY', type)
  },
  emptyFiles({ commit }) {
    commit('EMPTY_FILES')
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
  CONVERT_BASE64_FILE: (state, data) => {
    const imageType = data.fileName.split('.')[1];

    fetch(data.base64Url)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], data.fileName, {
          type: `image/${imageType}`,
        });

        const formData = new FormData();
        formData.append('file', file);

        farmersService.uploadFarmerFiles(formData)
          .then((response) => {
            if (data.type == 'photo') {
              state.files.photo = response.data;
            } else if (data.type == 'idCard') {
              state.files.idCard = response.data;
            } else if (data.type == 'fingerPrint') {
              state.files.fingerPrint = response.data;
            }
          })
          .catch(() => {
            console.log('errrrrrrrrrrrrrrrrrrrrr')
          });
      });
  },
  EMPTY_FILES: (state) => {
    state.files = {};
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