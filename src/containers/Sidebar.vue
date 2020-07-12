<template>
  <el-aside class="sidebar" style="width: 350px;">
    <div class="sidebar_top_logo">
      <img src="../assets/images/fpplogo.png" alt="logo" width="175px" />
      <p>Authorized Personnel</p>
    </div>
    <div class="sidebar_userInfo mb-3">
      <span id="user_photo">
        <img src="../assets/images/charl.png" alt="" style="width:40px;" />
      </span>
      <span id="user_name">
        <b>{{ user.name }}</b> <br />
        <span style="font-size:12px;">{{ user.email }}</span>
      </span>
      <span class="logout" @click="logout">
        <el-tag size="small" type="info">Logout</el-tag>
      </span>
    </div>
    <hr />
    <el-menu :default-openeds="['1', '4']">
      <el-menu-item index="1">
        <router-link to="/dashboard">
          <i class="el-icon-s-home"></i>
          Dashboard
        </router-link>
      </el-menu-item>
      <hr />
      <el-menu-item index="2">
        <router-link to="/farmers">
          <i class="el-icon-user-solid"></i>
          Farmers Profile
        </router-link>
      </el-menu-item>
      <hr />
      <el-menu-item index="3">
        <router-link to="/farmer-input-support">
          <i class="el-icon-s-flag"></i>
          Farmer Input Support
        </router-link>
      </el-menu-item>
      <hr />
      <el-menu-item index="4">
        <router-link to="/users">
          <i class="el-icon-s-custom"></i>
          Users
        </router-link>
      </el-menu-item>
    </el-menu>
    <hr />

    <div class="sidebar_activities">
      <RecentActivity />
    </div>

    <div class="sidebar_footer">
      <el-button size="mini" icon="el-icon-setting" type="text"
        >Settings</el-button
      >
      <el-button type="text"
        ><span style="color: #2fa512;">Get Help</span></el-button
      >
    </div>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex';
import RecentActivity from '@/components/RecentActivity';

export default {
  name: 'Sidebar',
  components: {
    RecentActivity,
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
};
</script>
