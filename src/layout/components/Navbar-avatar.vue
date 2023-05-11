<template>
  <div class="right-menu">
    <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar" class="user-avatar" style="" >
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/user/profile">
          <el-dropdown-item>个人中心</el-dropdown-item>
        </router-link>
        <router-link to="/test">
          <el-dropdown-item>我的收藏</el-dropdown-item>
        </router-link>
        <router-link to="/">
          <el-dropdown-item>我的订单</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click.native="logout">
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    }
  },
  methods: {
    async logout() {
      this.$confirm('确定注销账号并退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/home';
        })
      }).catch(() => {});
    }
  }
}
</script>

<style>
.right-menu-item {
  display: inline-block;
  padding: 0 8px;
  height: 100%;
  font-size: 18px;
  color: #5a5e66;
  vertical-align: text-bottom;
}
.right-menu-item.hover-effect {
  cursor: pointer;
  transition: background .3s;
}
.right-menu-item:hover {
  background: rgba(0, 0, 0, .025)
}
.avatar-container {
  margin-right: 30px;
}
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
}
.user-avatar {
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
}
</style>
