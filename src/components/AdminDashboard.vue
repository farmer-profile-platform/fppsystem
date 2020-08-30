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
    <el-row :gutter="20" class="mt-3">
      <el-col :span="12">
        <h5 class="mb-1">Recent Activities of Users</h5>
        <el-table :data="activities" style="width: 100%" stripe>
          <el-table-column label="Info">
            <template slot-scope="props">
              <span>{{ props.row.name }}</span>
              <br />
              <span style="font-size:11px;">
                By: <el-tag size="mini">{{ props.row.user.name }}</el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="Date" align="center">
            <template slot-scope="props">
              <span>{{ getDateFormat(props.row.createdAt) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Activity" align="center">
            <template slot-scope="props">
              <span :style="`color:${getActivityColor(props.row.action)};`">{{
                props.row.action
              }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="props">
              <el-popconfirm
                confirmButtonText="OK"
                cancelButtonText="No, Thanks"
                icon="el-icon-info"
                iconColor="red"
                title="Are you sure to delete this?"
                @onConfirm="deleteActivity(props.row._id)"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class="align_center">
          <router-link to="/activities">
            <el-button type="text">View all</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dashboardService from '../api/dashboard';
import activityService from '../api/activities';
import DashBoardCard from './DashBoardCard';
import { mapGetters } from 'vuex';

export default {
  name: 'adminDashboard',
  components: {
    DashBoardCard,
  },
  data() {
    return {
      activities: [],
      farmersTotal: 0,
      usersTotal: 0,
      supportTotal: 0,
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
    },
    getActivities() {
      activityService
        .getActivities()
        .then((response) => {
          if (response.data.length > 7) {
            response.data.length = 7;
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
