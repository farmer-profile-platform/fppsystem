<template>
  <div>
    <el-button icon="el-icon-plus" plain type="primary" size="small"
      >Add New Farmer</el-button
    >

    <el-card class="mt-4">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
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
            <el-dropdown>
              <i class="el-icon-more fa-rotate-45"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <i class="el-icon-user" style="margin-right: 10px"></i>
                  View Profile</el-dropdown-item
                >
                <el-dropdown-item @click="deleteFarmer(props.row.id)">
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
  </div>
</template>

<script>
export default {
  name: 'farmers',
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
