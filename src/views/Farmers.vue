<template>
  <div>
    <!-- <router-link to="/add-farmer">
    </router-link> -->
    <el-button
      icon="el-icon-plus"
      plain
      type="primary"
      size="small"
      @click="addFarmerModal"
      >Add New Farmer</el-button
    >
    <div>
      <el-input
        placeholder="Search farmers by entering keywords"
        v-model="search"
        class="mt-4 mb-1"
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
        <el-table-column label="Basic Info">
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
              <el-button type="primary" round plain size="mini"
                >{{ crop.acres }} acres</el-button
              >
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
                    params: { id: props.row._id },
                  }"
                >
                  <el-dropdown-item>
                    <i class="el-icon-user" style="margin-right: 10px"></i>
                    View Profile</el-dropdown-item
                  >
                </router-link>

                <el-dropdown-item>
                  <i class="el-icon-s-flag" style="margin-right: 10px"></i>
                  Input Farmer Support</el-dropdown-item
                >
                <el-dropdown-item divided>
                  <span @click="confirmDelete(props.row._id)">
                    <i class="el-icon-delete" style="margin-right: 10px"></i>
                    Delete
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

    <!-- add farmers dialog -->
    <el-dialog :visible.sync="showAddFarmerModal" width="55%">
      <template slot="title">
        <h3>Add Farmer</h3>
        <p>Plaese fill all fields for accurate data reports.</p>
      </template>
      <AddNewFarmers
        :showModal="showAddFarmerModal"
        v-on:addedFarmer="farmerAdded"
      />
    </el-dialog>

    <!-- Add farmer Input Support -->
    <el-dialog :visible.sync="showInputSupportModal" width="50%">
      <template slot="title">
        <h3>Add Farmer</h3>
        <p>Plaese fill all fields for accurate data reports.</p>
      </template>
      <AddNewFarmers />
    </el-dialog>
  </div>
</template>

<script>
import farmersService from '../api/farmers';
import AddNewFarmers from '../components/AddNewFarmers';

export default {
  name: 'farmers',
  components: {
    AddNewFarmers,
  },
  data: () => ({
    tableData: [],
    tableLoading: false,
    showAddFarmerModal: false,
    showInputSupportModal: false,
    currentPage: 1,
    total: 3,
    search: '',
  }),
  created() {
    this.getFarmers();
  },
  methods: {
    getFarmers() {
      let self = this;
      this.tableLoading = true;
      farmersService
        .getFarmers()
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
    loadFarmersTable(farmers) {
      console.log(farmers.data);
      let table = farmers.data.map(function(el) {
        el.name = el.firstName + ' ' + el.lastName;
      });
      this.tableData = table;
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
    addFarmerModal() {
      this.showAddFarmerModal = true;
    },
    farmerAdded() {
      this.showAddFarmerModal = false;
      this.getFarmers();
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
  },
};
</script>
