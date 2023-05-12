<template>
  <div :style="menuContainer" class="menuContainer">
    <router-link to="/home">
      <div class="logo">
        <img :src="require('@/assets/logo.svg')" class="logoImg" />
        <img :src="require('@/assets/name.png')" class="nameImg" />
      </div>
    </router-link>
    <el-menu :router="true" :default-active="activeIndex" mode="horizontal" active-text-color="#2a9d8f">
      <el-menu-item index="/" @click="onClick('/')" :class="{ active: activeIndex === '/' }">首页</el-menu-item>
      <el-menu-item index="/spotList" @click="onClick('/spotList')" :class="{ active: activeIndex === '/spotList' }">景点</el-menu-item>
      <el-menu-item index="/routeList" @click="onClick('/routeList')" :class="{ active: activeIndex === '/routeList' }">路线攻略</el-menu-item>
      <el-menu-item index="/hotelList" @click="onClick('/hotelList')" :class="{ active: activeIndex === '/hotelList' }">订酒店</el-menu-item>
      <el-menu-item index="/announcement" @click="onClick('/announcement')" :class="{ active: activeIndex === '/announcement' }">通知公告</el-menu-item>
      <el-menu-item index="/test" @click="onClick('/test')" :class="{ active: activeIndex === '/test' }">测试页面</el-menu-item>
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
        border: "1px solid #eee",
        marginBottom: "2px",
        // scrollSnapAlign: "start"
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
.logo {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 300px;
  z-index: 1000;
  .logoImg {
    height: 60px;
  }
  .nameImg {
    height: 50px;
  }
}
.el-menu {
  height: 60px;
  border-bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #FFFFFF;
}
.el-menu:hover {
  background-color: #FFFFFF;
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
