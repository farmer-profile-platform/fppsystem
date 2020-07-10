import authService from "../api/auth";
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      token: 'getToken',
    })
  },
  methods: {
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
    logout() {
      let self = this
      authService.logout(this.token)
        .then(() => {
          self.$store.dispatch('logout');
          self.$router.push("/login")
        }).catch((errors) => {
          console.log(errors)
        })
    }
  }
}