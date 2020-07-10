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

    <el-card class="mt-3">
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
        <el-table-column>
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
              <span style="font-size:12px;">Bernard.c@cnmanagement.com</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column>
          <template>
            <el-button type="text" size="mini">
              <i class="el-icon-user"></i>
              Admin</el-button
            >
          </template>
        </el-table-column>
        <el-table-column align="right" width="">
          <template slot="header">
            <el-input v-model="search" placeholder="Type to search" />
          </template>
          <template>
            <el-button type="info" plain size="mini" icon="el-icon-cancel"
              >Suspend</el-button
            >
            <el-button type="danger" size="mini" icon="el-icon-delete"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
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
      ],
      tableLoading: false,
      showAddUserModal: false,
      search: '',
    };
  },
};
</script>
