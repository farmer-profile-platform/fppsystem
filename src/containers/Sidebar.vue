<template>
  <el-aside class="sidebar" style="width: 350px;">
    <div class="sidebar_top_logo">
      <img src="../assets/images/fpplogo.png" alt="logo" width="175px" />
      <p>Authorized Personnel</p>
    </div>
    <div class="sidebar_userInfo mb-3">
      <span @click="userProfile(user._id, user.name)" class="pointer">
        <span id="user_photo">
          <img
            :src="getImageFile(user.profile_pic)"
            alt=""
            style="width:40px;"
          />
        </span>
        <span id="user_name">
          <b>{{ user.name }}</b> <br />
          <span style="font-size:12px;">{{ user.email }}</span>
        </span>
      </span>

      <span class="logout" @click="logout">
        <el-tag size="small" type="info">Logout</el-tag>
      </span>
    </div>
    <hr />
    <el-menu :default-openeds="['1']">
      <router-link to="/dashboard">
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          Dashboard
        </el-menu-item>
      </router-link>
      <hr />
      <router-link to="/farmers">
        <el-menu-item index="2">
          <i class="el-icon-user-solid"></i>
          Farmers Profile
        </el-menu-item>
      </router-link>
      <hr />
      <router-link to="/farmer-input-support">
        <el-menu-item index="3">
          <i class="el-icon-s-flag"></i>
          Farmer Input Support
        </el-menu-item>
      </router-link>
      <hr />
      <router-link to="/users">
        <el-menu-item index="4" v-if="isAdmin">
          <i class="el-icon-s-custom"></i>
          Users
        </el-menu-item>
      </router-link>
      <hr />
      <router-link to="/fsps">
        <el-menu-item index="5">
          <i class="el-icon-office-building"></i>
          FSPs
        </el-menu-item>
      </router-link>
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
      isAdmin: 'getAdmin',
    }),
  },
};
</script>
