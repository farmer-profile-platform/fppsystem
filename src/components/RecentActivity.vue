<template>
  <div>
    <h4 class="mb-2">Recent Activities</h4>
    <el-tag type="info" class="sidebar_activity">
      <span>Bashiru Ahmed</span>
      <span :style="`float:right; color:#2fa512;`">Added</span>
    </el-tag>
    <el-tag type="info" class="sidebar_activity">
      <span>Alison Barker</span>
      <span :style="`float:right; color:#ff4949;`">Deleted</span>
    </el-tag>
    <el-tag type="info" class="sidebar_activity">
      <span>Bernard Kwabena</span>
      <span :style="`float:right; color:#f7ba2a;`">Printed</span>
    </el-tag>

    <div class="align_center">
      <el-button type="text">View all</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentActivity',
  data() {
    return {
      action: true,
    };
  },
};
</script>
