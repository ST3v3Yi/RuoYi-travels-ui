<template>
<!--  <div style="margin-left: 20px;">
    <h1>测试页面</h1>
    <h2>接下来的任务：</h2>
    <h3>hotel的详情页面：hotelDetail.vue</h3>
    <h3>参考网址：https://www.mafengwo.cn/hotel/15737778.html?iMddid=11242</h3>
    <h3>猜测难点：其他网站酒店的价格查询，会用到API?</h3>
  </div>-->
  <!-- 容器Div -->
  <div>
    <!-- 酒店简要信息容器【名字、图片、评分等】 -->
    <div class="hotelHeader">
      <div class="infoContainer">
        <!-- 面包屑和天气 -->
        <div class="BreadCrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/hotelList' }">酒店</el-breadcrumb-item>
            <el-breadcrumb-item>开封建业铂尔曼酒店</el-breadcrumb-item>
          </el-breadcrumb>
          <img v-if="weather && weather.icon" :src="require('@/assets/weatherIcons/'+ weather.icon +'.png')" class="weatherIcon"/>
          <span style="font-size: 14px; line-height: 30px;">{{weather.text}}</span>
          <span style="margin-left: 15px; font-size: 14px; line-height: 30px;">{{weather.temp}}℃</span>
        </div>
        <!-- 酒店名称和评分 -->
        <div class="hotelName">
          <h1>开封建业铂尔曼酒店</h1>
          <h3>Pullman Kaifeng Jianye</h3>
          <span>地址：龙亭北路16号</span>
          <!-- 酒店评分 -->
          <div class="hotelRate">
            <span style="color: #ff8a00; font-size: 30px;">{{ hotelRating | decimal }}</span>
            <span style="font-size: 14px; color: #666666;">分</span>
          </div>
        </div>
        <div class="hotelImg">
          <div class="mainImg">
            <img :src="require('@/assets/banner1.jpeg')" style="width: 750px; height: 100%; border-radius: 5px;" />
          </div>
          <div class="otherImg">
            <div class="img01">
              <img :src="require('@/assets/banner1.jpeg')" style="width: 100%; height: 100%; border-radius: 5px;" />
            </div>
            <div class="img02">
              <img :src="require('@/assets/banner2.jpeg')" style="width: 100%; height: 100%; border-radius: 5px;" />
            </div>
            <div class="img03">
              <img :src="require('@/assets/banner3.jpeg')" style="width: 100%; height: 100%; border-radius: 5px;" />
            </div>
            <div class="img04">
              <img :src="require('@/assets/banner4.jpeg')" style="width: 100%; height: 100%; border-radius: 5px;" />
            </div>
            <div class="img05">
              <img :src="require('@/assets/banner5.jpeg')" style="width: 100%; height: 100%; border-radius: 5px;" />
            </div>
            <div class="img06">
              <img :src="require('@/assets/banner6.jpeg')" style="width: 100%; height: 100%; border-radius: 5px;" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 顶部菜单 -->
    <div class="topMenu">
      <el-menu :default-active="activeIndex" mode="horizontal" active-text-color="#2a9d8f" class="hotelMenu">
        <el-menu-item index="1">预订</el-menu-item>
        <el-menu-item index="2">位置</el-menu-item>
        <el-menu-item index="3">信息</el-menu-item>
        <el-menu-item index="4">点评</el-menu-item>
      </el-menu>
    </div>
    <!-- 酒店房间预订 -->
    <div class="roomBooking">
      <div class="roomFilter">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="入住日期"
          end-placeholder="离店日期">
        </el-date-picker>
        <el-select v-model="selectValue" @click="clickSelect" />
        <div class="chooseWindow" v-show="isShowWin">

        </div>
      </div>
      <el-card :class="isShowAll ? 'autoCard' : 'lockCard'">
        <div class="roomContainer">
          <div class="roomImg">
            <img :src="require('@/assets/banner1.jpeg')" style="width: 100%; height: 175px; border-radius: 5px;" />
            <p>豪华大床房[roomType]</p>
            <span style="display: block; font-size: 14px; color: #999999; margin-top: 2px">
              1张2米特大床[bed]
              <el-divider direction="vertical"></el-divider>
              46[size]m²
            </span>
          </div>
          <div class="roomInfo">
            <div class="number">
              <i class="el-icon-user-solid" />
              <i class="el-icon-user-solid" />
            </div>
            <div class="facilitiesContainer">
              <div class="facilities">
                <h1>全部设施</h1>
                <h2>洗浴用品</h2>
                <span style="margin-left: 5px; font-size: 14px; color: #666666" v-for="n in 3">
                  <i class="el-icon-circle-check" />牙刷
                </span>
                <h2>客房布局和家具</h2>
                <h2>网络与通讯</h2>
                <h2>卫浴设施</h2>
                <h2>客房设施</h2>
                <h2>媒体科技</h2>
                <h2>便利设施</h2>
                <h2>食品饮品</h2>
              </div>
              <div class="showAllButton" v-show="!isShowAll">
                <el-button type="text" @click="showAll">>>展开全部<<</el-button>
              </div>
            </div>
            <div>
              <div class="roomPrice">
                <h3>￥1307</h3>
                <el-button class="bookingButton">预订</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 页脚 -->
    <Footer style="margin-top: 30px;"/>
  </div>
</template>

<script>
import axios from "axios";
import Footer from "@/layout/components/Footer.vue";

export default {
  components: {
    Footer,
  },
  data() {
    return {
      API_KEY: 'e09cd1c5806442918d2451381dfc322b',
      cityId: '101180801',
      weather: {},
      hotelRating: 5.0,
      activeIndex: '1',
      isShowAll: false,
      dateRange: '',
      isShowWin: false,
      roomNum: 1,
      peopleNum: 1,
      selectValue: null,

    }
  },
  computed: {
  },
  mounted() {
    // 获取天气信息
    this.getWeather();
  },
  methods: {
    // 获取当地天气信息
    getWeather() {
      let data = this;
      axios.get('https://devapi.qweather.com/v7/weather/now', {
        params: {
          key: this.API_KEY,
          location: this.cityId
        }
      }).then(function (res) {
        data.weather = res.data.now;
      }).catch(function (err) {
        console.log(err);
      })
    },
    showAll() {
      this.isShowAll = true;
    },
    clickSelect() {
      this.isShowWin = !this.isShowWin;
      console.log(this.isShowWin);
    }
  },
  filters: {
    decimal(value) {
      if (!isNaN(value)) {
        return value.toFixed(1);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hotelHeader {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 510px;
  .infoContainer {
    width: 1050px;
    height: 100%;
    .BreadCrumb {
      display: flex;
      .el-breadcrumb__item {
        font-size: 14px;
        line-height: 30px;
      }
      .weatherIcon {
        width: 35px;
        height: 35px;
        margin-left: 700px;
      }
    }
    .hotelName {
      position: relative;
      width: 100%;
      h1 {
        font-size: 28px;
        color: #333333;
        margin: 10px 0 2px 0;
      }
      h3 {
        font-size: 16px;
        color: #666666;
        margin: 0 0 5px 0;
      }
      span {
        font-size: 14px;
        color: #666666;
      }
      .hotelRate {
        position: absolute;
        right: 20px;
        bottom: 0;
      }
    }
    .hotelImg {
      display: flex;
      width: 100%;
      height: 380px;
      margin-top: 10px;
      border-radius: 5px;
      .mainImg {
        width: 750px;
        height: 100%;
      }
      .otherImg {
        display: flex;
        flex-wrap: wrap;
        width: 290px;
        height: 100%;
        margin-left: 10px;
        border-radius: 5px;
        .img01 {
          width: 48%;
          height: 120px;
          margin-bottom: 8px;
          border-radius: 5px;
        }
        .img02 {
          width: 48%;
          height: 120px;
          margin-left: 10px;
          margin-bottom: 8px;
          border-radius: 5px;
        }
        .img03 {
          width: 48%;
          height: 120px;
          margin-bottom: 8px;
          border-radius: 5px;
        }
        .img04 {
          width: 48%;
          height: 120px;
          margin-left: 10px;
          margin-bottom: 8px;
          border-radius: 5px;
        }
        .img05 {
          width: 48%;
          height: 120px;
          border-radius: 5px;
        }
        .img06 {
          width: 48%;
          height: 120px;
          margin-left: 10px;
          border-radius: 5px;
        }
      }
    }
  }
}
.topMenu {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px 2px 0 #eee;
  .hotelMenu {
    width: 1050px;
    .el-menu-item {
      font-size: 16px;
    }
    .el-menu-item:hover {
      color: #2ec4b6;
    }
    .is-active {
      font-weight: bold;
    }
  }
}
.roomBooking {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #999999;
  flex-wrap: wrap;
  .roomFilter {
    width: 1050px;
    height: 200px;
    margin-top: 5px;
    background-color: #666666;
    .el-dropdown {
      border-radius: 5px;
      background-color: #FFFFFF;
    }
    .el-dropdown-link {
      color: #1ab394;
    }
  }
  .chooseWindow {
    width: 217px;
    height: 150px;
    border-top: 2px solid #1ab394;
    background-color: #FFFFFF;
  }
  .autoCard {
    position: relative;
    width: 1050px;
    height: auto;
    margin-top: 10px;
  }
  .lockCard {
    position: relative;
    width: 1050px;
    height: 230px;
    margin-top: 10px;
  }
  ::v-deep .el-card__body {
    padding: 0;
  }
  .roomContainer {
    display: flex;
    width: 1050px;
    .roomImg {
      width: 250px;
      margin-top: 5px;
      margin-left: 5px;
      p {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        margin: 0;
      }
    }
    .roomInfo {
      position: relative;
      width: 780px;
      border-left: 1px solid #eee;
      margin: 5px 20px 0 10px;
      .number {
        width: 80%;
        height: 25px;
        margin-left: 10px;
        ::v-deep .el-icon-user-solid::before {
          font-size: 22px;
          margin-right: 5px;
        }
      }
    }
    .facilitiesContainer {
      overflow: hidden;
      width: 600px;
      margin: 10px;
      .facilities {
        overflow: hidden;
        h1 {
          font-size: 24px;
          margin: 0;
        }
        h2 {
          font-size: 16px;
          margin: 5px 0 0 5px;
        }
        ::v-deep .el-icon-circle-check {
          margin-left: 3px;
        }
      }
      .showAllButton {
        position: absolute;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 30px;
        background-color: #FFFFFF;
        opacity: 90%;
        top: 195px;
      }
    }
    .roomPrice {
      position: absolute;
      display: flex;
      align-items: center;
      right: 0;
      bottom: 45%;
      h3 {
        font-size: 24px;
        font-weight: bold;
        color: #1ab394;
        margin: 0;
      }
      .bookingButton {
        color: #FFFFFF;
        font-family: "Microsoft YaHei";
        font-size: 16px;
        background-color: #ff9900;
        margin-left: 10px;
      }
      .bookingButton:hover {
        background-color: #ff8a00;
      }
    }
  }
}
</style>
