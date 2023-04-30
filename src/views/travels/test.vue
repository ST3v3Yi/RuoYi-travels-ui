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
          end-placeholder="离店日期"
          style="margin: 5px 0 0 5px;">
        </el-date-picker>
        <el-button plain @click="clickSelect">
          <span>{{ buttonValue }}</span>
          <i :class="isShowWin ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" style="margin-left: 150px;"/>
        </el-button>
        <el-button icon="el-icon-search" circle style="width: 36px" type="primary"></el-button>
        <!-- 价格 -->
        <div class="priceSlider">
          <span style="font-size: 17px;">价格范围：</span>
          <span>￥{{priceRange[0]}} - </span>
          <span v-if="priceRange[1] !== 2000">￥{{priceRange[1]}}</span>
          <el-slider
            v-model="priceRange"
            range
            :step="100"
            :max="2000"
            style="width: 800px; margin-left: 20px;">
          </el-slider>
        </div>
        <!-- 房型 -->
        <div class="roomLayout">
          <span style="margin-left: 5px; font-size: 17px;">房型：</span>
          <el-button :type="roomLayout===3 ? 'primary' : 'text'" @click="selectLayout(3)">全部</el-button>
          <el-button :type="roomLayout===0 ? 'primary' : 'text'" @click="selectLayout(0)">双床房</el-button>
          <el-button :type="roomLayout===1 ? 'primary' : 'text'" @click="selectLayout(1)">大床房</el-button>
          <el-button :type="roomLayout===2 ? 'primary' : 'text'" @click="selectLayout(2)">多床房</el-button>
        </div>
        <div class="chooseWindow" v-show="isShowWin">
          <div style="height: 40px">
            <span>房间</span>
            <el-input-number v-model="roomNum" :min="1" style="margin-left: 90px"></el-input-number>
          </div>
          <div style="margin-top: 2px;">
            <span>人数</span>
            <el-input-number v-model="peopleNum" :min="1" style="margin-left: 90px"></el-input-number>
          </div>
          <el-button type="text" style="position: absolute; bottom: 5px; right: -80px;" @click="confirmRoom">确定</el-button>
        </div>
      </div>
      <el-card>
        <div class="roomContainer">
          <div class="roomImg">
            <room-preview :src="require('@/assets/banner1.jpeg')" style="width: 100%; height: 175px; border-radius: 5px;" />
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
<!--              <div class="facilities">
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
              </div>-->
            </div>
            <div>
              <div class="roomPrice">
                <h3>￥1307</h3>
                <el-button class="bookingButton">预订</el-button>
              </div>
              <div class="remainRoom">
                <span style="color: #999999; font-size: 14px;">剩余5间</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 酒店点评容器 -->
    <div class="hotelReviewContainer">
      <!-- 酒店点评 -->
      <div class="hotelReview">
        <!-- 酒店评分 -->
        <div class="hotelRating">
          <!-- 点评标题 -->
          <h1>点评</h1>
          <!-- 总评分 -->
          <div class="mainRating">
            <div style="display: flex; justify-content: center;">
              <span style="font-size: 24px; color: #1ab394; font-weight: bold;">棒</span>
            </div>
            <div style="display: flex; justify-content: center; align-items: flex-end; margin-top: 15px;">
              <span style="font-size: 48px; color: #1ab394; font-weight: bold;">4.8</span>
              <span style="font-size: 32px; color: #999999; font-weight: bold;">/5.0</span>
            </div>
          </div>
          <!-- 各项评分 -->
          <div class="otherRating">
            <!-- 环境评分 -->
            <div style="position: relative;">
              <span>环境</span>
              <v-chart
                ref="environment"
                :option="environment"
                style="width: 120px; height: 120px;">
              </v-chart>
              <span style="position: absolute; top: 70px; left: 48px; font-size: 18px; font-weight: bold">4.8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 页脚 -->
    <Footer style="margin-top: 30px;"/>
  </div>
</template>

<script>
import axios from "axios";
import Footer from "@/layout/components/Footer.vue";
import RoomImagePreview from "@/components/RoomImagePreview/index.vue";

export default {
  components: {
    Footer,
    'room-preview': RoomImagePreview,
  },
  data() {
    return {
      API_KEY: 'e09cd1c5806442918d2451381dfc322b',
      cityId: '101180801',
      weather: {},
      hotelRating: 5.0,
      activeIndex: '1',
      isShowAll: false,
      dateRange: [],
      isShowWin: false,
      roomNum: 1,
      peopleNum: 1,
      buttonValue: '1间，1位',
      /* priceRange是一个数组，[0]是最小值，[1]是最大值 */
      priceRange: [0,2000],
      roomLayout: 3,
      environment: {
        series: [
          {
            name: 'Environment Rating',
            type: 'pie',
            radius: ['55%', '90%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 1,
              borderColor: '#eee',
              borderWidth: 1
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 0,
                itemStyle: {
                  color: '#1ab394',
                },
              },
              {
                value: 0,
                itemStyle: {
                  color: '#f3f3f3',
                },
              },
            ]
          }
        ]
      },
    }
  },
  computed: {
  },
  mounted() {
    // 在获取到后端数据后更新value的值
    this.environment.series[0].data[0].value = 4.8;
    this.environment.series[0].data[1].value = 0.2;
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
    // 显示房间、人数选择窗口
    clickSelect() {
      this.isShowWin = !this.isShowWin;
    },
    // 房间、人数确认按钮
    confirmRoom() {
      this.buttonValue = this.roomNum + "间，" + this.peopleNum + "位";
      this.isShowWin = false;
    },
    // 选择房型
    selectLayout(id) {
      this.roomLayout = id;
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
  flex-wrap: wrap;
  .roomFilter {
    position: relative;
    width: 1050px;
    height: 200px;
    margin-top: 5px;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .el-button {
      width: 250px;
      height: 36px;
      margin-left: 10px;
      padding: 5px 10px 5px 10px;
      span {
        font-size: 14px;
        color: #333333;
      }
    }
    .priceSlider {
      margin: 5px 0 0 5px;
    }
  }
  .roomLayout {
    display: flex;
    align-items: center;
    height: 40px;
    .el-button {
      width: 80px;
      font-size: 16px;
    }
  }
  .chooseWindow {
    position: absolute;
    width: 250px;
    height: 150px;
    border-radius: 3px;
    border-top: 2px solid #1ab394;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    left: 365px;
    top: 40px;
    padding: 10px;
    background-color: #FFFFFF;
    ::v-deep .el-input-number--medium {
      width: 100px;
      height: 20px;
    }
    ::v-deep .el-input-number--medium .el-input-number__increase {
      border: 0;
      color: #333333;
      background-color: #eee;
    }
    ::v-deep .el-input-number--medium .el-input-number__decrease {
      border: 0;
      color: #333333;
      background-color: #eee;
    }
    ::v-deep .el-input--medium .el-input__inner {
      padding: 0;
      border: 0px;
    }
  }
  .el-card {
    position: relative;
    width: 1050px;
    height: 240px;
    margin-top: 10px;
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
        margin-top: 30px;
        margin-left: 20px;
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
        font-size: 28px;
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
    .remainRoom {
      position: absolute;
      display: flex;
      align-items: center;
      right: 12px;
      bottom: 36%;
    }
  }
}
.hotelReviewContainer {
  display: flex;
  justify-content: center;
  height: 500px;
  margin-top: 10px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  background-color: #f5f7fa;
  .hotelReview {
    width: 1050px;
    height: 300px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid #eee;
    background-color: #FFFFFF;
    .hotelRating {
      position: relative;
      height: 200px;
      border-radius: 5px;
      h1 {
        font-size: 24px;
        font-weight: bold;
        margin: 0;
        padding: 10px;
      }
      .mainRating {
        position: absolute;
        width: 400px;
        height: 120px;
        top: 60px;
        left: 20px;
      }
      .otherRating {
        position: absolute;
        width: 580px;
        height: 160px;
        top: 40px;
        left: 400px;
        background-color: #999999;
      }
    }
  }
}
</style>
