<template>
  <div>
    <div class="mt-2">
      <AdminDashboard v-if="isAdmin" />
      <EditorDashboard v-if="isEditor" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AdminDashboard from '../../components/AdminDashboard';
import EditorDashboard from '../../components/EditorDashboard';

export default {
  components: {
    AdminDashboard,
    EditorDashboard,
  },
  computed: {
    ...mapGetters({
      isAdmin: 'getAdmin',
      isEditor: 'getEditor',
    }),
  },
};
</script>
