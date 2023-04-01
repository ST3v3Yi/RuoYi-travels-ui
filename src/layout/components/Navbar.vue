<template>
<!--  <header class="navbar">
    <el-row type="flex" justify="space-between" class="main">
      &lt;!&ndash; logo &ndash;&gt;
      <div class="logo">
        <img src="../../assets/logo/logo.png" class="header-logo">
      </div>

      &lt;!&ndash; 菜单栏 &ndash;&gt;
      <el-row type="flex" class="nav">
        <router-link to="/">主页</router-link>
        <router-link to="/site">景点信息</router-link>
        <router-link to="/hotel">旅店信息</router-link>
        <router-link to="/routeList">路线推荐</router-link>
        <router-link to="/announcement">通知公告</router-link>
        <router-link to="/about">关于我们</router-link>
        <router-link to="/test">测试页面</router-link>
      </el-row>

      &lt;!&ndash; 用户登录信息 &ndash;&gt;
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
  </header>-->
    <div :style="menuContainer">
      <el-menu :router="true" :default-active="activeIndex" mode="horizontal" active-text-color="#2a9d8f">
        <el-menu-item index="/" @click="onClick('/')" :class="{ active: activeIndex === '/' }">首页</el-menu-item>
        <el-menu-item index="/site" @click="onClick('/site')" :class="{ active: activeIndex === '/site' }">景点</el-menu-item>
        <el-menu-item index="/routeList" @click="onClick('/routeList')" :class="{ active: activeIndex === '/routeList' }">路线攻略</el-menu-item>
        <el-menu-item index="/hotel" @click="onClick('/hotel')" :class="{ active: activeIndex === '/hotel' }">订酒店</el-menu-item>
        <el-menu-item index="/announcement" @click="onClick('/announcement')" :class="{ active: activeIndex === '/announcement' }">通知公告</el-menu-item>
        <NavbarAvatar class="navbarAvatar" />
      </el-menu>
    </div>
</template>

<script>
import NavbarAvatar from "@/layout/components/Navbar-avatar.vue";
export default {
  data() {
    return {
      activeIndex: '/',
      menuContainer: {
        width: window.innerWidth + "px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "999",
      }
    }
  },
  components: {
    NavbarAvatar,
  },
  mounted() {
    // 注册resize事件，当浏览器窗口大小变化时，重新设置navbar的宽度
    window.addEventListener('resize', () => {
      const newWidth = window.innerWidth;
      this.menuContainer.width = `${newWidth}px`;
    })
  },
  methods: {
    onClick(index) {
      this.activeIndex = index;
    },
  },
}
</script>

<style lang="scss" scoped>
.menuContainer {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.el-menu {
  height: 60px;
  border-bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
.el-menu:hover {
}
.el-menu-item {
  height: 60px;
  font-size: 16px;
  font-weight: bold;
  color: #2a9d8f;
  background-color: transparent;
  display: inline-block;
}
.active {
  height: 60px;
  font-size: 18px;
  font-weight: bold;
  display: inline-block;
}
.animated.bounce {
  animation-duration: 1s;
  animation-delay: 0s;
  animation-fill-mode: both;
}
.navbarAvatar {
  margin-top: 5px;
  min-width: 100px;
  display: inline-block;
}
</style>
