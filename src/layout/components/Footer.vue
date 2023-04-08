<template>
  <footer class="footer">
    <el-row type="flex" justify="center">
      <el-col :span="4" class="col1">
        <div style="margin-left: 5px; font-size: 12px; color: #c2c2c2">
          <h3 style="font-size: 14px;">XX旅游网</h3>
          <p style="line-height: 12px">这是<strong style="color: #1ab394">我们</strong>的旅游网~</p>
          <p style="line-height: 12px">这是<strong style="color: #1ab394">一座城市</strong>的旅游网~</p>
          <p style="line-height: 12px">这是<strong style="color: #1ab394">家乡</strong>的旅游网~</p>
          <p style="line-height: 12px">是一个小而美的地方~</p>
          <p style="line-height: 12px">期待你的<strong style="color: #1ab394">欣赏</strong>~</p>
        </div>
      </el-col>
      <el-col :span="4" class="col2">
        <div style="margin-left: 5px; font-size: 12px; color: #c2c2c2">
          <h3 style="font-size: 14px;">关于我们</h3>
          <div style="display: flex; flex-wrap: wrap;">
            <div style="flex: 1 0 50%;">
              <router-link to="/">
                <span style="display: inline-block; line-height: 22px;">关于XXX</span>
              </router-link>
            </div>
            <div style="flex: 1 0 50%;">
              <router-link to="/">
                <span style="display: inline-block; line-height: 22px;">联系我们</span>
              </router-link>
            </div>
            <div style="flex: 1 0 50%;">
              <router-link to="/">
                <span style="display: inline-block; line-height: 22px;">隐私政策</span>
              </router-link>
            </div>
            <div style="flex: 1 0 50%;">
              <router-link to="/">
                <span style="display: inline-block; line-height: 22px;">服务协议</span>
              </router-link>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="col3">
        <div style="margin-left: 5px; font-size: 12px; color: #c2c2c2">
          <h3 style="font-size: 14px; text-align: center">旅游服务</h3>
          <div style="display: flex; flex-wrap: wrap;">
            <div style="flex: 1 0 50%;">
              <router-link to="/">
                <span style="display: inline-block; line-height: 22px;">景点展示</span>
              </router-link>
            </div>
            <div style="flex: 1 0 50%;">
              <router-link to="/routeList">
                <span style="display: inline-block; line-height: 22px;">路线攻略</span>
              </router-link>
            </div>
            <div style="flex: 1 0 50%;">
              <router-link to="/">
                <span style="display: inline-block; line-height: 22px;">酒店预订</span>
              </router-link>
            </div>
            <div style="flex: 1 0 50%;">
              <router-link to="/">
                <span style="display: inline-block; line-height: 22px;">城市视觉</span>
              </router-link>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div style="text-align: center;">
        <p style="line-height: 22px; font-size: 16px; color: #c2c2c2">让旅行更简单、更愉快！</p>
        <div style="display: flex; justify-content: center;">
          <el-divider style="background-color: #c2c2c2;"></el-divider>
        </div>
        <p style="color: #c2c2c2;">© 2023 XX旅游网. All rights reserved.</p>
      </div>
    </el-row>
  </footer>
</template>

<script>
export default {
  name: "Footer.vue"
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 300px;
  background-color: #3c3c3c;
  .el-col {
    height: auto;
    margin-top: 30px;
  }
  .col1 {
    width: 200px;
  }
  .col2 {
    width: 200px;
    margin-left: 20px;
  }
  .col3 {
    width: 120px;
    margin-left: 20px;
  }
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 600px;
  margin: 0;
}
</style>
