<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <DashBoardCard
          title="FARMERS TOTAL"
          :total="farmersTotal"
          titleText="Total Number of Farmers registered on platform."
          bgColor="frmBg"
          progColor="#2cb96b"
        />
      </el-col>
      <el-col :span="8">
        <DashBoardCard
          title="FARMERS SUPPORT TOTAL"
          :total="supportTotal"
          titleText="Total Number of Farmers we're providing support"
          bgColor="suppBg"
          progColor="#4fc2ab"
        />
      </el-col>
      <el-col :span="8">
        <DashBoardCard
          title="USERS TOTAL"
          :total="usersTotal"
          titleText="Total Number of users working on the platform."
          bgColor="userBg"
          progColor="#0cd0e1"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dashboardService from '../api/dashboard';
import DashBoardCard from '../components/DashBoardCard';

export default {
  name: 'Dashboard',
  components: {
    DashBoardCard,
  },
  data() {
    return {
      farmersTotal: 0,
      usersTotal: 0,
      supportTotal: 0,
    };
  },
  created() {
    dashboardService.getReports().then((response) => {
      this.farmersTotal = response.data.totalFarmers;
      this.usersTotal = response.data.usersTotal;
      this.supportTotal = response.data.totalSupports;
    });
  },
};
</script>
