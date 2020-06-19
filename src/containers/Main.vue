<template>
  <div>
    <el-container style="height: 100vh;">
      <Sidebar />

      <el-container>
        <el-header>
          <h3>{{ pageTitle }}</h3>
          <Header />
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Sidebar from './Sidebar';
import Header from './Header';

export default {
  name: 'Main',
  components: {
    Sidebar,
    Header,
  },
  data: () => ({
    pageTitle: '',
  }),
  watch: {
    $route(to) {
      this.pageTitle = to.name;
    },
  },
  created() {
    this.pageTitle = this.$route.name;
  },
};
</script>
