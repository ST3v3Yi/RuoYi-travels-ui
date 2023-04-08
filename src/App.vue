<template>
  <div id="app" class="app">
    <GoTopAndBottom target=".app" />
    <navbar/>
    <router-view style="padding-top: 0px" />
  </div>
</template>

<style lang="scss">
html, body, #app {
  overflow: auto;
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow-x: hidden;
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
    },
    data() {
        return {
            userName: '',
            userType: '',
            userProfile: ''
        }
    },
    methods: {
        login() {
            console.log(this.userType)
            if (this.userType === 'admin') {
                this.$router.push('/manage')
            } else if (this.userType === 'user') {
                this.$router.push('/personal')
            } else {
                this.$router.push('/login')
            }
        },
        logout() {
            window.localStorage.setItem('userName', '')
            window.localStorage.setItem('userType', '')
            window.localStorage.setItem('userProfile', '')
            this.$router.push('/login')
            ele.Message.success("退出当前账号")
        }
    }
};
</script>
