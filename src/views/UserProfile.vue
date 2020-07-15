<template>
  <div></div>
</template>

<script>
import userService from '../api/users';

export default {
  name: 'UsersProfile',
  data() {
    return {
      loading: false,
      user: {},
    };
  },
  created() {
    this.getUser(this.$route.params.id);
  },
  methods: {
    getUser(id) {
      console.log(id);
      this.loading = true;
      userService
        .getUsers(id)
        .then((response) => {
          this.user = response.data;
          this.loading = false;
        })
        .catch((errors) => this.errorMessage(errors.error));
    },
  },
};
</script>
