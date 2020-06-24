<template>
  <div>
    <!-- <router-link to="/add-farmer">
    </router-link> -->
    <el-button
      icon="el-icon-plus"
      plain
      type="primary"
      size="small"
      @click="showAddFarmerModal = true"
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
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        :loading="tableLoading"
        style="width: 100%"
      >
        <el-table-column label="Basic Info" prop="date">
          <template>
            <span style="float:left; margin-right: 10px;">
              <img
                src="../assets/images/charl.png"
                alt=""
                style="width:40px;"
              />
            </span>
            <span>
              <b style="font-weight:bold; font-size: 16px">Bernard Cudjoe</b>
              <br />
              <span style="font-size:12px;">Nkronza, Brong Ahafo</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Rating" prop="name">
          <template>
            <el-button type="text" size="mini">
              <i class="el-icon-star-on" style="color:gold; font-size:18px"></i>
              4.3</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="Crop Information" width="310">
          <template>
            <el-button type="primary" round plain size="mini">Maize</el-button>
            <el-button type="primary" round plain size="mini"
              >30 acres</el-button
            >
            <el-button type="primary" round plain size="mini"
              >GHc 20,000</el-button
            >
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
                <router-link to="/farmer-profile">
                  <el-dropdown-item>
                    <i class="el-icon-user" style="margin-right: 10px"></i>
                    View Profile</el-dropdown-item
                  >
                </router-link>

                <el-dropdown-item>
                  <i class="el-icon-s-flag" style="margin-right: 10px"></i>
                  Input Farmer Support</el-dropdown-item
                >
                <el-dropdown-item @click="deleteFarmer(props.row.id)" divided>
                  <i class="el-icon-delete" style="margin-right: 10px"></i>
                  Delete</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div style="text-align: center;margin-top: 10px; padding-bottom:10px;">
      <el-pagination
        background
        :hide-on-single-page="value"
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
      <AddNewFarmers />
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
import AddNewFarmers from '../components/AddNewFarmers';

export default {
  name: 'farmers',
  components: {
    AddNewFarmers,
  },
  data: () => ({
    tableData: [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'John',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Morgan',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ],
    tableLoading: true,
    showAddFarmerModal: false,
    showInputSupportModal: false,
    value: true,
    currentPage: 1,
    total: 120,
    search: '',
  }),
  methods: {
    deleteFarmer(id) {
      console.log(id);
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
