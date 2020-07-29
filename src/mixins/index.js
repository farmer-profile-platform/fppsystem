import is from 'is_js';
import authService from "../api/auth";
import { mapGetters } from "vuex"


export default {
  computed: {
    ...mapGetters({
      token: 'getToken',
    })
  },
  methods: {
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
      if (pic.includes('no-photo')) {
        return url + 'photo_default.png'
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
        .then(() => { this.successMessage('User Logout') }).catch(() => {
          this.errorMessage('Contact System Administrator')
        })
    }
  }
}