<template>
  <div>
    <AdminDashboard v-if="isAdmin" />
    <EditorDashboard v-if="isEditor" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AdminDashboard from '../components/AdminDashboard';
import EditorDashboard from '../components/EditorDashboard';

export default {
  name: 'Dashboard',
  components: {
    AdminDashboard,
    EditorDashboard,
  },
  data() {
    return {
      farmersTotal: 0,
      usersTotal: 0,
      supportTotal: 0,
    };
  },
  computed: {
    ...mapGetters({
      isAdmin: 'getAdmin',
      isEditor: 'getEditor',
    }),
  },
};
</script>
