<template>
  <div v-loading="pageLoad">
    <el-row :gutter="20">
      <el-col :span="8">
        <DashBoardCard
          title="FARMERS TOTAL"
          :total="farmersTotal"
          titleText="Total Number of Farmers registered on platform."
          bgColor="farmersBg"
          progColor="#2cb96b"
          :yrExpert="1000"
          :percentage="getPercentageData(farmersTotal, 1000)"
        />
      </el-col>
      <el-col :span="8">
        <DashBoardCard
          title="FARMERS SUPPORT TOTAL"
          :total="supportTotal"
          titleText="Total Number of Farmers we're providing support"
          bgColor="suppBg"
          progColor="#4fc2ab"
          :yrExpert="500"
          :percentage="getPercentageData(supportTotal, 500)"
        />
      </el-col>
      <el-col :span="8">
        <DashBoardCard
          title="USERS TOTAL"
          :total="usersTotal"
          titleText="Total Number of users working on the platform."
          bgColor="userBg"
          progColor="#0cd0e1"
          :yrExpert="50"
          :percentage="getPercentageData(usersTotal, 50)"
        />
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg">
      <el-col :span="24">
        <el-card class="box-card mt-2">
          <div slot="header" class="clearfix">
            <span>Input Support Metrics</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >Support Type</el-button
            >
          </div>

          <el-row type="flex" class="row-bg">
            <el-col :span="9">
              <DashBoardCard
                title="TOTAL AMOUNT SUPPORTED (GH₵)"
                :total="amountTotal"
                titleText="Total Amount we've supported farmers with and our % expectations for the year."
                bgColor="amntBg"
                progColor="#52725f"
                :yrExpert="20000"
                :percentage="getPercentageData(amountTotal, 20000)"
              />
              <br /><br />
              <div>
                <el-card
                  shadow="hover"
                  style="background: rgba(255,255,255,.3);"
                >
                  <div slot="header" class="clearfix">
                    <span>Total Amount Support per Year</span>
                  </div>
                  <bar-chart
                    :height="120"
                    :width="280"
                    v-if="loaded"
                    :data="barChartData.data"
                    :labels="barChartData.labels"
                    :title="barChartData.title"
                  />
                </el-card>
              </div>
            </el-col>
            <el-col :span="2"> </el-col>
            <el-col :span="10">
              <div>
                <pie-chart v-if="loaded" />
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dashboardService from '../api/dashboard';
import DashBoardCard from './DashBoardCard';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';
import { mapGetters } from 'vuex';

export default {
  name: 'adminDashboard',
  components: {
    DashBoardCard,
    BarChart,
    PieChart,
  },
  data() {
    return {
      pageLoad: true,
      loaded: false,
      farmersTotal: 0,
      usersTotal: 0,
      supportTotal: 0,
      amountTotal: 0,
      barChartData: {
        data: [1500, 3000, 1200],
        labels: ['2018', '2019', '2020'],
        title: 'Supports this year GH₵',
      },
    };
  },
  created() {
    this.getDashboardData();
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  methods: {
    getDashboardData() {
      dashboardService
        .getReports()
        .then((response) => {
          this.farmersTotal = response.data.totalFarmers;
          this.usersTotal = response.data.usersTotal;
          this.supportTotal = response.data.totalSupports;
          this.amountTotal = response.data.totalAmountSupported;
          this.barChartData.labels = response.data.inputYears;
          this.barChartData.data = response.data.amountsInYears;

          this.loaded = true;
          this.pageLoad = false;
        })
        .catch((errors) => this.errorMessage(errors.error));
    },
  },
};
</script>
