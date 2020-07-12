<template>
  <div>
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Notifications</el-dropdown-item>
        <el-dropdown-item>Profile</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span
      >{{ user.name }} <el-tag size="mini">{{ capitalize(user.role) }}</el-tag>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
};
</script>
