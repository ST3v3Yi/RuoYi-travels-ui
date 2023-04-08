<template>
  <div class="rowTop">
    <div class="CrumbContainer">
      <el-breadcrumb separator="/" class="BreadcrumbTop">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/spotList' }">景点</el-breadcrumb-item>
        <el-breadcrumb-item>景区名字</el-breadcrumb-item>
      </el-breadcrumb>
      <img v-if="weather" :src="require('@/assets/weatherIcons/'+ weather.icon +'.png')" class="weatherIcon"/>
      <span>{{weather.text}}</span>
      <span style="margin-left: 15px;">{{weather.temp}}℃</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import 'qweather-icons/font/qweather-icons.css'
import "@/assets/styles/weather.css"
export default {
  data() {
    return {
      API_KEY: 'e09cd1c5806442918d2451381dfc322b',
      cityId: '101180801',
      weather: {},
    }
  },
  mounted() {
    this.getWeather();
  },
  methods: {
    getWeather() {
      let data = this;
      axios.get('https://devapi.qweather.com/v7/weather/now', {
        params: {
          key: this.API_KEY,
          location: this.cityId
        }
      }).then(function (res) {
        console.log(res.data.now);
        data.weather = res.data.now;
        console.log(data.weather.icon);
      }).catch(function (err) {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rowTop {
  display: flex;
  justify-content: center;
  width: 1920px;
  height: 190px;
  background-color: peachpuff;
}
.CrumbContainer {
  display: flex;
  align-items: center;
  width: 1000px;
  height: 50px;
}
.BreadcrumbTop {
  .el-breadcrumb-item .el-breadcrumb__inner {
    line-height: 22px;
  }
}
.weatherIcon {
  width: 35px;
  height: 35px;
}
</style>
