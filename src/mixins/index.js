import is from 'is_js';
import authService from "../api/auth";
import activityService from '../api/activities';
import farmersService from '../api/farmers';
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      token: 'getToken',
      newFarmersOffline: 'getNewFarmersOffline',
      editedFarmersOffline: 'getEditedFarmersOffline'
    })
  },
  methods: {
    syncOfflineFarmersData() {
      if (this.newFarmersOffline.length > 0) {
        // let newData = this.newFarmersOffline.map(function (farmer) {
        //   farmer.photo = ''
        //   farmer.fingerprint = ''
        //   farmer.idCard = ''
        // })
        farmersService
          .addFarmer(this.newFarmersOffline)
          .then(() => {
            this.$store.dispatch('emptyFarmerData', 'new')
          })
          .catch((errors) => {
            this.errorMessage(errors.error);
          });
      }
    },
    syncOfflineEditedData() {
      if (this.editedFarmersOffline.length > 0) {
        this.editedFarmersOffline.map(function (editedData) {
          farmersService
            .updateFarmer(editedData)
            .then(() => { })
            .catch((errors) => {
              this.errorMessage(errors.error);
            });
          return editedData;
        })
        this.$store.dispatch('emptyFarmerData', 'edited')
      }
    },
    checkInternet() {
      if (navigator.onLine) {
        this.$store.dispatch('update_internet_status', navigator.onLine);
      } else {
        alert(
          'Hey! Looks like there is no connection which will retrict you in performing some tasks. Its advisable to not logout from system untill you have connection back.'
        );
        this.$store.dispatch('update_internet_status', navigator.onLine);
      }
      return navigator.onLine;
    },
    ucwords: function (str) {
      if (typeof str !== 'undefined') {
        return str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
          return letter.toUpperCase()
        })
      } else {
        return str
      }
    },
    getDateFormat(currentDate) {
      if (currentDate) {
        const date = new Date(currentDate)
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
        const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date)

        return `${day}-${month}-${year}`
      } else {
        return 'None';
      }

    },
    getActivityColor(action) {
      let color;
      switch (action) {
        case 'Support Added':
          color = "#f7ba2a;"
          break;
        case 'Edited':
          color = "#044b74"
          break;
        case 'Added':
          color = "#2fa512"
          break;
        case 'Deleted':
          color = "#ff4949"
          break;
      }
      return color
    },
    addActivity(farmer, action) {
      let activity = {}
      activity.action = action
      activity.name = farmer.name;
      activity.farmerId = farmer._id;
      activity.user = "";

      activityService.addActivity(activity)
        .then(() => { })
        .catch((errors) => this.errorMessage(errors.error));
    },
    getPercentageData(data, total) {
      let percentage = data / total * 100
      return percentage;
    },
    getHostName() {
      let hn = window.location.hostname
      let uploadUrl = hn == 'localhost' ? "http://127.0.0.1:5000/uploads/" : "https://api.fppghana.com/uploads/"
      return uploadUrl;
    },
    checkEmptyArray(data) {
      return is.empty(data)
    },
    getImageFile(pic) {
      const url = this.getHostName()
      if (pic == "no-photo.jpg") {
        return url + 'photo_default.png'
      } else if (pic.includes('blob:')) {
        return pic
      } else {
        return url + pic
      }
    },
    userProfile(userId, name) {
      this.$router.push({
        name: 'User Profile',
        params: { id: userId, name: name },
      });
    },
    successMessage(message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'success',
        duration: 2000
      });
    },
    successNotification(title, message) {
      this.$notify({
        title: title,
        message: message,
        type: 'success'
      });
    },
    errorMessage(message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'error',
        duration: 3000
      });
    },
    infoMessage(message) {
      this.$message({
        showClose: true,
        message: message,
        duration: 2000
      });
    },
    addDuplicateField(dataArray, type) {
      dataArray.push({});
      this.infoMessage(`Added another ${type}`);
    },
    getuserAge(dob) {
      var diff_ms = Date.now() - new Date(dob).getTime();
      var age_dt = new Date(diff_ms);

      return Math.abs(age_dt.getUTCFullYear() - 1970);
    },
    capitalize(word) {
      if (typeof word !== 'string') return ''
      return word.charAt(0).toUpperCase() + word.slice(1)
    },
    logout() {
      let self = this
      self.$store.dispatch('logout');
      self.$router.push("/login")
      authService.logout()
        .then(() => { this.successMessage('User Logout') }).catch((errors) => {
          this.errorMessage(errors.error)
        })
    }
  }
}