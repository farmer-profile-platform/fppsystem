import is from 'is_js';
import authService from "@/api/auth";
import activityService from '@/api/activities';
import farmersService from '../api/farmers';
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      photo: 'no-photo',
      fingerPrint: 'no-photo',
      idCard: 'no-photo'
    }
  },
  computed: {
    ...mapGetters({
      newFarmersOffline: 'getNewFarmersOffline',
      editedFarmersOffline: 'getEditedFarmersOffline'
    })
  },
  methods: {
    getAgeFromYear(year) {
      let date = new Date();
      let yearNow = date.getFullYear();
      let age = yearNow - year
      return age;
    },
    hasInputSupport(inputSupports) {
      let s = inputSupports;
      return Array.isArray(s) && s.length;
    },
    syncOfflineFarmersData() {
      let self = this;
      if (this.newFarmersOffline.length > 0) {
        let newData = this.newFarmersOffline.map(function (farmer) {

          if (farmer.fingerprint !== "no-photo.jpg" && farmer.photo !== "no-photo.jpg") {

            const imageType = farmer.photoFileName.split('.')[1];

            fetch(farmer.photo)
              .then((res) => res.blob())
              .then((blob) => {
                const file = new File([blob], farmer.photoFileName, {
                  type: `image/${imageType}`,
                });

                const formData = new FormData();
                formData.append('file', file);

                farmersService.uploadFarmerFiles(formData)
                  .then((response) => {
                    farmer.photo = response.data;
                    self.successNotification('Uploaded Successfully');
                    self.dataURLtoFile(farmer.fingerprint, farmer.fingerprintFileName, 'fingerPrint')
                  })
                  .catch(() => {
                    self.errorMessage('Image failed to upload');
                  });
              });

            // self.getPhotoFile(farmer.photo, farmer.photoFileName)
            // self.getUserPosts(farmer.fingerprint, farmer.fingerprintFileName, 'fingerPrint')
            // self.getFingerIdCardFile(farmer.idCard, farmer.idCardFileName)
            self.getUserPosts(farmer.fingerprint, farmer.fingerprintFileName, 'fingerPrint')
              .then((response) => {
                console.log(response)
              })
              .catch((error) => {
                console.log(error)
              });
          }
          return farmer;
        })

        console.log(newData)
        // self.addNewData(newData)

      } else {
        this.$store.dispatch('emptyFarmerData', 'new')
      }
    },
    // getPhotoFile(base64Url, fileName) {
    //   this.dataURLtoFile(base64Url, fileName, 'photo')
    // },
    // getFingerPrintFile(base64Url, fileName) {
    //   this.dataURLtoFile(base64Url, fileName, 'fingerPrint')
    // },
    // getFingerIdCardFile(base64Url, fileName) {
    //   this.dataURLtoFile(base64Url, fileName, 'idCard')
    // },
    dataURLtoFile(base64Url, fileName, type) {
      let self = this;
      const imageType = fileName.split('.')[1];

      fetch(base64Url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], fileName, {
            type: `image/${imageType}`,
          });

          const formData = new FormData();
          formData.append('file', file);

          farmersService.uploadFarmerFiles(formData)
            .then((response) => {
              if (type == 'idCard') {
                self.idCard = response.data;
                console.log('card', self.idCard)
              } else if (type == 'fingerPrint') {
                self.fingerPrint = response.data;
                console.log('card', self.fingerPrint)
              }
              self.successNotification(`${type} Uploaded Successfully`);
            })
            .catch(() => {
              self.errorMessage('Image failed to upload');
            });
        });
    },
    addNewData(farmerData) {
      farmersService
        .addFarmer(farmerData)
        .then(() => {
          this.$store.dispatch('emptyFarmerData', 'new')
        })
        .catch(() => {
          this.$store.dispatch('emptyFarmerData', 'new')
          // this.$store.dispatch('emptyFiles')
          this.errorMessage('Failed to save farmer offline, some information may be invalid.');
        });
    },
    getUserPosts(base64Url, fileName, type) {
      const userFiles = null
      let self = this;
      const imageType = fileName.split('.')[1];

      fetch(base64Url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], fileName, {
            type: `image/${imageType}`,
          });

          const formData = new FormData();
          formData.append('file', file);

          farmersService.uploadFarmerFiles(formData)
            .then((response) => {
              if (type == 'idCard') {
                userFiles.idCard = response.data;
              } else if (type == 'fingerPrint') {
                userFiles.fingerPrint = response.data;
              }
              self.successNotification(`${type} Uploaded Successfully`);
            })
            .catch(() => {
              self.errorMessage('Image failed to upload');
            });
        });

      return new Promise(function (resolve, reject) {
        if (userFiles !== null) {
          resolve(userFiles);
        } else {
          reject('User file found');
        }
      });
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
        case 'Support Deleted':
          color = "red"
          break;
        case 'Support Updated':
          color = "blue"
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
      percentage = Math.round(percentage)
      return percentage;
    },
    getHostName() {
      let hn = window.location.hostname
      let uploadUrl = hn == 'localhost' ? "http://127.0.0.1:5000/uploads/" : "https://hopemorganfirm.com/uploads/"
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
      } else if (pic.includes('data:')) {
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