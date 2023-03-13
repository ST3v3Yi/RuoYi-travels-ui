<template>
<div id="app">
    <navbar/>
    <router-view style="padding-top: 60px" />
</div>
</template>

<style lang="scss">
.nav-bar {
    position: fixed;
    z-index: 10;
    width: 100%;
}

el-menu-item {
    height: 30px;
}

.personal-wrapper {
    text-align: center;
}

.personal-item {
    cursor: pointer;
    line-height: 40px;
}

.personal-item :hover {
    background-color: #aaaaaa;
}

.header-logo {
    height: 50px;
    position: fixed;
    left: 10px;
    top: 5px;
    z-index: 10;
}

.login-icon {
    z-index: 1;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: solid 2px lightgray;
    cursor: pointer;
}

.header-user {
    position: fixed;
    right: 30px;
    top: 10px;
    height: 50px;
    line-height: 50px;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
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

export default {
    name: 'vue_main',
  components: {Navbar},
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
