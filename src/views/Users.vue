<template>
  <div>
    <el-button
      icon="el-icon-plus"
      plain
      type="primary"
      size="small"
      @click="showAddUserModal = true"
      >Add New User</el-button
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
    <el-card>
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        v-loading="tableLoading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        style="width: 100%"
      >
        <el-table-column label="User Info">
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
                props.row.name
              }}</b>
              <br />
              <span style="font-size:12px;">{{ props.row.email }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Role">
          <template slot-scope="props">
            <el-button type="text" size="mini">
              <i class="el-icon-user"></i>
              {{ props.row.role }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="props">
            <el-button
              type="info"
              plain
              size="mini"
              icon="el-icon-cancel"
              @click="confirmSuspend(props.row._id)"
              >Suspend</el-button
            >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="confirmDelete(props.row._id)"
              >Delete</el-button
            >
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
import userService from '../api/users';

export default {
  name: 'Users',
  data() {
    return {
      tableData: [],
      tableLoading: false,
      showAddUserModal: false,
      search: '',
      currentPage: 1,
      total: 3,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      let self = this;
      this.tableLoading = true;
      userService
        .getUsers()
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
      this.$confirm(
        'This will permanently delete the user from the system',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          this.deleteUser(id);
        })
        .catch(() => {
          this.errorMessage('Delete cancelled');
        });
    },
    deleteUser(id) {
      userService.deleteUser(id).then(() => {
        this.successNotification('Success', 'User deleted successfully');
        this.getUsers();
      });
    },
    confirmSuspend() {
      this.$confirm('This will temporary suspend user for 30days', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          this.successMusic('Success', 'Suspention completed');
        })
        .catch(() => {
          this.errorMessage('Suspention cancelled');
        });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
  },
};
</script>
