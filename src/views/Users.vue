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
                :src="setProfilePic(props.row.profile_pic)"
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
        <el-table-column label="Status">
          <template slot-scope="props">
            <el-tag
              size="mini"
              :type="props.row.suspended ? 'danger' : 'success'"
            >
              {{ props.row.suspended ? 'User Suspended' : 'Active' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="right" width="240px">
          <template slot-scope="props">
            <el-button
              :type="props.row.suspended ? 'success' : 'info'"
              plain
              size="mini"
              icon="el-icon-cancel"
              @click="confirmSuspend(props.row.suspended, props.row._id)"
              >{{ props.row.suspended ? 'Activate' : 'Suspend' }}</el-button
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

    <!-- Add user Dialog -->
    <el-dialog
      :visible.sync="showAddUserModal"
      width="30%"
      title="Add a new system user"
    >
      <el-form :model="addUserForm" :rules="rules" ref="addUserForm">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item prop="name">
              <el-input
                v-model="addUserForm.name"
                placeholder="Enter full name"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="role">
              <el-select
                placeholder="Select user role"
                v-model="addUserForm.role"
                style="width:100%; margin-top:-12px"
              >
                <el-option label="Editor" value="editor"></el-option>
                <el-option label="User" value="user"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="email">
              <el-input
                v-model="addUserForm.email"
                placeholder="@youremail.com"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="password">
              <el-input
                v-model="addUserForm.password"
                type="password"
                placeholder="********"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-button
          class="button_full"
          type="primary"
          icon="el-icon-plus"
          @click="addUser"
          :loading="btnLoading"
          >Add User</el-button
        >
      </el-form>
    </el-dialog>
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
      btnLoading: false,
      addUserForm: {
        role: 'user',
        name: '',
        email: '',
        password: '',
      },
      rules: {
        role: [
          {
            required: true,
            message: 'Select user role',
            trigger: ['blur', 'change'],
          },
        ],
        name: [
          {
            required: true,
            message: 'Select user role',
            trigger: 'blur',
          },
        ],
        email: [
          {
            type: 'email',
            required: true,
            message: 'Email is required',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Please enter password',
            trigger: 'blur',
          },
          {
            min: 6,
            message: 'Length should be 6 or more characters',
            trigger: 'change',
          },
        ],
      },
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
    addUser() {
      this.btnLoading = true;
      this.$refs['addUserForm'].validate((valid) => {
        if (valid) {
          userService
            .addUser(this.addUserForm)
            .then(() => {
              this.btnLoading = false;
              this.showAddUserModal = false;
              this.getUsers();
            })
            .catch(() => {
              this.btnLoading = false;
              this.errorMessage('User error');
            });
        } else {
          this.btnLoading = false;
          return false;
        }
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
      userService
        .deleteUser(id)
        .then(() => {
          this.successNotification('Success', 'User deleted successfully');
          this.getUsers();
        })
        .catch((errors) => this.errorMessage(errors.error));
    },
    confirmSuspend(status, id) {
      let message;
      if (status == true) {
        message = 'Are you sure you want to activate user';
      } else {
        message = 'This will temporary suspend user for 30days';
      }
      this.$confirm(message, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          this.suspendUser(status, id);
        })
        .catch(() => {
          this.errorMessage('Suspention cancelled');
        });
    },
    suspendUser(status, id) {
      let user = {};
      user.id = id;
      user.suspended = status === true ? false : true;
      userService
        .updateUser(user)
        .then(() => {
          this.successNotification(
            'Success',
            'User status changed successfully'
          );
          this.getUsers();
        })
        .catch((errors) => {
          this.errorMessage(errors.error);
        });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
  },
};
</script>
