<template>
  <div>
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
                :total="4002"
                titleText="Total Amount we've supported farmers with and our % expectations for the year."
                bgColor="amntBg"
                progColor="#52725f"
                :yrExpert="9000"
                :percentage="getPercentageData(4002, 9000)"
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
                  <bar-chart :height="120" :width="280" v-if="loaded" />
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
      <!-- <div class="dashboard-support-card">
          <div>
            <el-progress
              type="circle"
              :percentage="80"
              color="#8e71c7"
              :width="60"
              :stroke-width="5"
            ></el-progress>
          </div>
          <div>
            <h4>Cancelled Visits</h4>
            <p>Last Month - 12 Mar 2020</p>
          </div>
        </div> -->
    </el-row>
  </div>
</template>

<script>
import dashboardService from '../api/dashboard';
import activityService from '../api/activities';
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
      loaded: false,
      activities: [],
      farmersTotal: 0,
      usersTotal: 0,
      supportTotal: 0,
      squareBoxes: [],
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  methods: {
    init() {
      this.getDashboardData();
      this.getActivities();
    },
    getDashboardData() {
      dashboardService
        .getReports()
        .then((response) => {
          this.farmersTotal = response.data.totalFarmers;
          this.usersTotal = response.data.usersTotal;
          this.supportTotal = response.data.totalSupports;
        })
        .catch((errors) => this.errorMessage(errors.error));

      this.loaded = true;
    },
    getActivities() {
      activityService
        .getActivities()
        .then((response) => {
          if (response.data.length > 5) {
            response.data.length = 5;
          }
          this.loadTable(response.data);
        })
        .catch((errors) => this.errorMessage(errors.error));
    },
    loadTable(activity) {
      let self = this;
      let data = activity.map(function(act) {
        act.user.name =
          act.user._id === self.user._id ? 'Yourself' : act.user.name;
        return act;
      });
      this.activities = data;
    },
    deleteActivity(id) {
      activityService
        .deleteActivity(id)
        .then(() => this.getActivities())
        .catch((errors) => this.errorMessage(errors.error));
    },
  },
};
</script>
