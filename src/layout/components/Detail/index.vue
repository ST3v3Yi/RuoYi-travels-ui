<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="13">
      <div class="coverImg-container">
<!--        <p>封面图位置</p>-->
      </div>
    </el-col>
  </el-row>
</template>

<script>

</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
   margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
/*.grid-content {
  border-radius: 4px;
  height: 400px;
  margin-top: 40px;
  text-align: center;
  p {
    font-size: 28px;
    line-height: 350px;
  }
}*/
.coverImg-container {
  border-radius: 4px;
  height: 400px;
  margin-top: 40px;
  text-align: center;
}
.row-bg {
  padding: 10px 0;
  background-color: #FFFFFF;
}
</style>
