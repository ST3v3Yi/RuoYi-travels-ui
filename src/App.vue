<template>
  <div id="app" class="app">
    <GoTopAndBottom target=".app" @topDistanceChange="handleScroll" :offsetTop="offsetTop"/>
    <navbar v-show="!$route.meta.hideHeader"/>
    <router-view style="padding-top: 0px" :topDistance="updatedTopDistance" @scrollTo="handleScrollTo"/>
  </div>
</template>

<style lang="scss" scoped>
html, body, #app {
  overflow: auto;
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  background-color: #f5f7fa;
}
#nav {
  border-bottom: solid 0.5px #42b983;
  background-color: white;
  padding: 20px;
  position: fixed;
  width: 100%;
  top: 0px;
  text-align: center;

  a {
    font-weight: normal;
    color: #2c3e50;
    text-decoration: none;
    margin-left: 80px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import Navbar from "@/layout/components/Navbar.vue";
import GoTopAndBottom from "@/components/GoTopAndBottom/index.vue";

export default {
    name: 'vue_main',
    components: {
      Navbar,
      GoTopAndBottom,
    },
    mounted() {
        this.userName = window.localStorage.getItem('userName');
        this.userType = window.localStorage.getItem('userType');
        this.userProfile = window.localStorage.getItem('userProfile');
        this.login();
    },
    data() {
        return {
            userName: '',
            userType: '',
            userProfile: '',
            topDistance: 0,
            offsetTop: 0,
            hideScroll: false
        }
    },
    computed: {
      updatedTopDistance: function() {
        return this.topDistance; // 传递从GoTopAndBottom组件中接收到的topDistance值
      }
    },
    methods: {
        login() {
            // console.log(this.userType)
            if (this.userType === 'admin') {
                this.$router.push('/manage')
            } else if (this.userType === 'user') {
                this.$router.push('/home')
            } else {
                this.$router.push('/home')
            }
        },
        logout() {
            window.localStorage.setItem('userName', '')
            window.localStorage.setItem('userType', '')
            window.localStorage.setItem('userProfile', '')
            this.$router.push('/login')
            ele.Message.success("退出当前账号")
        },
        handleScroll(topDistance) {
          if (typeof topDistance === 'number') {
            this.topDistance = topDistance;
            // console.log(this.topDistance);
          }
        },
        handleScrollTo(offsetTop) {
          this.offsetTop = offsetTop;
        }
    }
};
</script>
