<template>
  <header class="navbar">
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <img src="../../assets/logo/logo.png" class="header-logo">
      </div>

      <!-- 菜单栏 -->
      <el-row type="flex" class="nav">
        <router-link to="/">主页</router-link>
        <router-link to="/site">景点信息</router-link>
        <router-link to="/hotel">旅店信息</router-link>
        <router-link to="/routeList">路线推荐</router-link>
        <router-link to="/announcement">通知公告</router-link>
        <router-link to="/about">关于我们</router-link>
        <router-link to="/test">测试页面</router-link>
      </el-row>

      <!-- 用户登录信息 -->
      <div class="right-menu">
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar" class="user-avatar">
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/user/profile">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <router-link to="/">
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
    </el-row>
  </header>
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
    /*setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },*/
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
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

<style lang="scss" scoped>
.navbar {
  height: 60px;
  line-height:60px;
  background:#fff;
  border-bottom: 1px #ddd solid;
  box-shadow:0 3px 0 #f5f5f5;
  box-sizing: border-box;

  .main {
    width:1000px;
    margin:0 auto;
  }

  .logo{
    width: 50px;
    padding-top: 5px;
    img{
      display: block;
      width:100%;
    }
  }

  .nav{
    margin: 0px 40px;
    flex:1;
    a{
      display: block;
      padding: 0 20px;
      height: 60px;
      box-sizing: border-box;
      &:hover,&:focus, &:active {
        border-bottom: 5px #409eff solid;
        color:#409eff;
      }
    }
    .route-link-exact-active{
      background:#409eff;
      color:#fff!important;
    }
  }

  .message{
    height: 36px;
    line-height:1;
    cursor:pointer;
    .el-icon-bell{
      margin-right:2px;
      font-size:18px;
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    padding-top: 5px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
