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
      <el-menu-item index="/personalCenter" @click="onClick('/personalCenter')" :class="{ active: activeIndex === '/personalCenter' }">个人中心</el-menu-item>
      <NavbarAvatar class="navbarAvatar" v-if="isLogin"/>
      <div v-if="!isLogin" class="loginButton">
        <el-button type="text" @click="goToLogin">登录</el-button>
        <span>|</span>
        <el-button type="text" @click="goToRegister">注册</el-button>
      </div>
    </el-menu>
  </div>
</template>

<script>
import NavbarAvatar from "@/layout/components/Navbar-avatar.vue";
import {getInfo} from "@/api/login";
import axios from "axios";
import service from "@/utils/request";
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
      },
      isLogin: false,
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
    this.checkLogin();
  },
  methods: {
    onClick(index) {
      this.activeIndex = index;
    },
    // 判断是否登录
    checkLogin() {
      getInfo().then(res => {
        if (res && res.code === 200) {
          this.isLogin = true;
        } else if (!res) {
          this.isLogin = false;
        }
      })
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    }
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
.loginButton {
  display: flex;
  align-items: end;
  margin-bottom: 5px;
  margin-left: 30px;
  color: #666;
  font-size: 16px;
  font-weight: bold;
  .el-button--text {
    color: #2a9d8f;
    font-size: 16px;
    font-weight: bold;
  }
  .el-button--medium {
    padding: 0;
  }
  .el-button:hover {
    color: #1ab394;
  }
}
</style>
