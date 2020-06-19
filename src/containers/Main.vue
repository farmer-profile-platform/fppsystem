<template>
  <div>
    <el-container>
      <Sidebar />

      <el-container>
        <el-header>
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
};
</script>
