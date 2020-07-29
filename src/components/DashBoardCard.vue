<template>
  <el-card>
    <div slot="header" class="clearfix flex_justify_between">
      <span class="dashboard_card_head" :id="bgColor">
        {{ title }}
      </span>
      <i class="el-icon-more fa-rotate-45"></i>
    </div>
    <p>{{ titleText }}</p>
    <div class="flex_justify_between">
      <span class="dashboard_card_total">
        {{ total }}
      </span>
      <span class="dashboard_card_text">
        <span><i class="el-icon-info"></i> Expect(Yearly): <b>1000</b></span>
        <br />
        <span><i class="el-icon-arrow-down"></i> % of what we have. </span>
      </span>
    </div>
    <div>
      <el-progress :percentage="50" :color="progColor"></el-progress>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'DashBoardCard',
  props: ['title', 'total', 'titleText', 'bgColor', 'progColor'],
};
</script>

<style lang="scss" scoped>
.dashboard_card_head {
  border-radius: 5px;
  color: whitesmoke;
  padding: 15px 8px;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

#frmBg {
  background-color: #2cb96b;
}

#suppBg {
  background-color: #4fc2ab;
}

#userBg {
  background-color: #0cd0e1;
}

.dashboard_card_total {
  font-size: 40px;
  font-weight: bold;
  color: grey;
}

.dashboard_card_text span {
  font-size: 12px;

  b {
    font-size: 12px;
  }
}
</style>
