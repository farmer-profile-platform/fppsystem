<template>
  <div>
    <div>
      <el-input
        placeholder="Search farmers by thier names"
        v-model="search"
        class="mt-1 mb-1"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-card class="">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.firstName.toLowerCase().includes(search.toLowerCase())
          )
        "
        v-loading="tableLoading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        style="width: 100%"
      >
        <el-table-column label="Basic Info" width="230">
          <template slot-scope="props">
            <span style="float:left; margin-right: 10px;">
              <img
                src="../assets/images/charl.png"
                alt=""
                style="width:40px;"
              />
            </span>
            <span>
              <b style="font-weight:bold; font-size: 16px">{{
                props.row.firstName + ' ' + props.row.lastName
              }}</b>
              <br />
              <span style="font-size:12px;">{{ props.row.hometown }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Rating">
          <template>
            <el-button type="text" size="mini">
              <i class="el-icon-star-on" style="color:gold; font-size:18px"></i>
              4.3</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="Crop Information" width="310">
          <template slot-scope="props">
            <span v-for="(crop, index) in props.row.harvestYield" :key="index">
              <el-button type="primary" round plain size="mini">{{
                crop.crop_name
              }}</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Support Info" width="310">
          <template slot-scope="props">
            <span
              v-for="(support, index) in props.row.inputSupport"
              :key="index"
            >
              <span
                >Year: <span>{{ support.year }}</span></span
              >
              <br />
              <span
                >Grand Total: <span>GH₵ {{ support.grand_total }}</span></span
              ><br />
              <el-button type="text" icon="el-icon-view">View Inputs</el-button>
              <br />
            </span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="props">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-download"
            ></el-button>
            <el-dropdown class="ml-1">
              <i class="el-icon-more fa-rotate-45"></i>
              <el-dropdown-menu slot="dropdown">
                <router-link
                  :to="{
                    name: 'Farmer Profile',
                    params: { id: props.row._id, name: props.row.firstName },
                  }"
                >
                  <el-dropdown-item>
                    <i class="el-icon-user" style="margin-right: 10px"></i>
                    View Profile</el-dropdown-item
                  >
                </router-link>
                <el-dropdown-item divided>
                  <span @click="confirmDelete(props.row._id)">
                    <i class="el-icon-delete" style="margin-right: 10px"></i>
                    Delete Farmer
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div style="text-align: center;margin-top: 10px; padding-bottom:10px;">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[20, 50, 100]"
        :page-size="20"
        layout="prev, pager, next, jumper, sizes, total"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import farmersService from '../api/farmers';

export default {
  name: 'farmers',
  data() {
    return {
      tableData: [],
      tableLoading: false,
      currentPage: 1,
      total: 3,
      search: '',
    };
  },
  created() {
    this.getFarmers();
  },
  methods: {
    getFarmers() {
      let self = this;
      this.tableLoading = true;
      farmersService
        .getFarmersWithSupport()
        .then((response) => {
          this.tableLoading = false;
          this.tableData = response.data;
          this.total = response.total;
        })
        .catch((errors) => {
          self.errorMessage(errors.error);
          self.tableLoading = false;
        });
    },
    confirmDelete(id) {
      this.$confirm('This will permanently delete farmer data', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          this.deleteFarmer(id);
        })
        .catch(() => {
          this.errorMessage('Delete cancelled');
        });
    },
    deleteFarmer(id) {
      farmersService.deleteFarmer(id).then(() => {
        this.successNotification('Success', 'Farmer deleted successfully');
        this.getFarmers();
      });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
  },
};
</script>
