<template>
  <div>
    <div class="mb-1">
      <el-input placeholder="search" v-model="search" class="full-width">
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
        <el-table-column label="Name" prop="name" />
        <el-table-column label="Type" prop="type" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import fspService from '@/api/fsps';

export default {
  name: 'FspList',
  props: {
    type: String,
  },
  data() {
    return {
      search: '',
      tableData: [],
      tableLoading: false,
      queryParams: {
        type: '',
      },
    };
  },
  created() {
    this.getFsps();
  },
  methods: {
    getFsps() {
      this.tableLoading = true;
      this.queryParams.type = this.type;
      fspService
        .getFsps(this.queryParams)
        .then((response) => {
          this.tableData = response.data;
          this.tableLoading = false;
          this.$emit('loaded', { type: this.type, total: response.total });
        })
        .catch((errors) => {
          this.errorMessage(errors.error);
          this.tableLoading = false;
        });
    },
  },
};
</script>
