<template>
  <div class="login">
    <div class="login-box">
      <div class="login-box-left">
        <div class="login-box-left-top animate__animated animate__fadeIn">
          <p class="title">账号登录</p>
          <el-form :rules="rules" ref="loginForm" :model="form">
            <el-form-item prop="userName">
              <el-input v-model="form.userName" placeholder="您的账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="form.password" placeholder="您的密码"></el-input>
            </el-form-item>
            <p class="forget">
              <router-link to="/forget">忘记密码</router-link>
            </p>
            <el-form-item>
              <el-button type="primary" @click="handleLogin('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="login-box-left-bottom">
          <p>还没有账号?
            <router-link to="/register">马上注册</router-link>
          </p>
        </div>
      </div>

      <div class="login-box-right" @click="redirectToHome">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
