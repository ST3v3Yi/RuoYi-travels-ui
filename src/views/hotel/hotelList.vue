<template>
  <div>
    <div class="Container">
      <div class="searchPart">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          style="margin: 5px 0 0 5px;">
        </el-date-picker>
        <el-button plain @click="clickSelect" style="margin-left: 10px; width: 250px;">
          <span>{{ buttonValue }}</span>
          <i :class="isShowWin ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" style="margin-left: 150px;"/>
        </el-button>
        <el-button icon="el-icon-search" circle style="width: 36px" type="primary" @click="searchHotel"></el-button>
        <div class="chooseWindow" v-show="isShowWin">
          <div style="height: 40px">
            <span>房间</span>
            <el-input-number v-model="roomNum" :min="1" style="margin-left: 90px"></el-input-number>
          </div>
          <div style="margin-top: 2px;">
            <span>人数</span>
            <el-input-number v-model="peopleNum" :min="1" style="margin-left: 90px"></el-input-number>
          </div>
          <el-button type="text" style="position: absolute; bottom: 5px; right: 20px;" @click="confirmRoom">确定</el-button>
        </div>
        <div class="hotelFilter">
          <!-- 价格筛选 -->
          <div style="display: flex; width: 100%; height: 90px; border-bottom: 1px solid #eee">
            <div class="aside">
              <span style="font-size: 16px; font-weight: bold; color: #333">酒店价格</span>
            </div>
            <div class="roomPrice">
              <div class="priceButton">
                <el-button :type="roomPrice===0 ? 'primary' : 'text'" @click="selectPrice(0, 150)" style="margin-left: 5px;">150以下</el-button>
                <el-button :type="roomPrice===150 ? 'primary' : 'text'" @click="selectPrice(150, 300)">150-300</el-button>
                <el-button :type="roomPrice===300 ? 'primary' : 'text'" @click="selectPrice(300, 450)">300-450</el-button>
                <el-button :type="roomPrice===450 ? 'primary' : 'text'" @click="selectPrice(450, 600)">450-600</el-button>
                <el-button :type="roomPrice===600 ? 'primary' : 'text'" @click="selectPrice(600, 0)">600以上</el-button>
              </div>
              <div class="priceFilter">
                <div @mouseover="showButtons = true" @mouseleave="showButtons = false" style="margin-left: 5px; position: relative;">
                  <span>￥</span>
                  <el-input v-model="minPrice" style="width: 80px;" placeholder="最低价"></el-input>
                  <span style="white-space: pre;"> -￥</span>
                  <el-input v-model="maxPrice" style="width: 80px;" placeholder="最高价"></el-input>
                  <div v-if="showButtons" class="showButton">
                    <el-button
                      type="primary"
                      style="background-color: #666666; margin-left: 65px"
                      @click="clearInput"
                    >清空</el-button>
                    <el-button
                      type="primary"
                      style="margin-left: 5px"
                      @click="selectByPrice"
                    >确定</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 酒店评分 -->
          <div style="display: flex; width: 100%; height: 50px; border-bottom: 1px solid #eee">
            <div class="aside">
              <span style="font-size: 16px; font-weight: bold; color: #333">酒店评分</span>
            </div>
            <div class="roomRating">
              <el-button :type="roomRating===0 ? 'primary' : 'text'" @click="selectRating(0)" style="margin-left: 5px;">全部</el-button>
              <el-button :type="roomRating===4.5 ? 'primary' : 'text'" @click="selectRating(4.5)">4.5分以上</el-button>
              <el-button :type="roomRating===4 ? 'primary' : 'text'" @click="selectRating(4)">4分以上</el-button>
              <el-button :type="roomRating===3.5 ? 'primary' : 'text'" @click="selectRating(3.5)">3.5分以上</el-button>
            </div>
          </div>
          <!-- 酒店房型 -->
          <div style="display: flex; width: 100%; height: 50px; border-bottom: 1px solid #eee">
            <div class="aside">
              <span style="font-size: 16px; font-weight: bold; color: #333">酒店房型</span>
            </div>
            <div style="display: flex; align-items: center;">
              <el-button :type="roomLayout===3 ? 'primary' : 'text'" @click="selectLayout(3)" style="margin-left: 5px;">全部</el-button>
              <el-button :type="roomLayout===0 ? 'primary' : 'text'" @click="selectLayout(0)">双床房</el-button>
              <el-button :type="roomLayout===1 ? 'primary' : 'text'" @click="selectLayout(1)">大床房</el-button>
              <el-button :type="roomLayout===2 ? 'primary' : 'text'" @click="selectLayout(2)">多床房</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="infoContainer">
      <div class="hotelContainer">
        <!--        <div class="hotelInfoFilter"></div>-->
        <div class="hotelCard">
          <el-card
            v-for="(item, index) in hotelList"
            :key="index"
            style="margin-bottom: 5px;">
            <div class="hotelInfo">
              <div>
                <img :src="'dev-api' + item.coverImg" style="width: 200px; height: 160px;"/>
              </div>
              <router-link :to="{ path: '/hotelDetail/:id', query: { id: item.id } }">
                <div class="hotelName" @mouseover="hoverHotelCard(item)" @mouseout="leaveHotelCard">
                  <h1>{{item.hotelName}}</h1>
                  <h2>{{ item.hotelForeignName }}</h2>
                </div>
              </router-link>
              <div class="hotelReviews">
                <div class="rating" v-if="item.rating && item.rating.mainRating">
                  <span style="font-size: 14px; font-weight: bold; color: #FFFFFF">{{ item.rating.mainRating | decimal }}</span>
                </div>
              </div>
              <div class="price">
                <p>￥{{ item.minPrice }}<strong style="font-size: 14px; font-weight: normal; color: #999999;">起</strong></p>
                <router-link :to="{ path: '/hotelDetail/:id', query: { id: item.id } }">
                  <el-button type="primary">查看详情</el-button>
                </router-link>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="mapWrapper">
        <baidu-map
          class="map"
          :center="center"
          :zoom="mapZoom"
          :scroll-wheel-zoom="false">
          <bm-marker
            v-for="item in hotelList"
            :position="item.point"
            :icon="{
              url: item.isHover ? item.hoverIconUrl : item.iconUrl,
              size: { width: 32, height: 32 } }"
            @mouseover="item.isHover = true"
            @mouseout="item.isHover = false"
            @click="infoWindowOpen(item.id)">
            <bm-info-window :show="isInfoWindow && item.id === openWinId" @close="infoWindowClose(item.id)" @open="infoWindowOpen(item.id)">
              <div class="locationInfo">
                <h1>{{ item.hotelName }}</h1>
                <div style="display: flex;" v-if="item.rating && item.rating.mainRating">
                  <div class="rating">
                    <span style="font-size: 14px; font-weight: bold; color: #FFFFFF">{{ item.rating.mainRating | decimal }}</span>
                  </div>
                  <span style="font-size: 14px; color: #1ab394; margin: 10px 0 0 5px;">{{ ratingText(item.rating.mainRating) }}</span>
                  <span style="font-size: 12px; color: #999999; margin: 12px 0 0 5px;">5条点评</span>
                </div>
              </div>
              <div class="button">
                <p>￥{{ item.minPrice }}<strong style="font-size: 14px; font-weight: normal; color: #999999;">起</strong></p>
                <router-link :to="{ path: '/hotelDetail/:id', query: { id: item.id } }">
                  <el-button type="primary">查看详情</el-button>
                </router-link>
              </div>
            </bm-info-window>
          </bm-marker>
        </baidu-map>
      </div>
    </div>
    <Footer style="margin-top: 30px;"/>
  </div>
</template>

<script>
import { listHotel } from '@/api/hotel/hotel'
import {getFeasibility, getHotelId, getMinPrice} from "@/api/travels/rooms";
import { getHotelRating } from "@/api/hotel/hotelComments";
// 导入 Intl.NumberFormat
import Intl from 'intl'
import 'intl/locale-data/jsonp/en.js'
import { getListByPrice } from "@/api/route/route";
import Footer from "@/layout/components/Footer.vue";
export default {
  components: {
    Footer,
  },
  data() {
    return {
      hotelList: [],
      trueHotelList: [],
      date: new Date(),
      dateRange: [],
      markers: {},
      isShowWin: false,
      openWinId: 0,
      buttonValue: '1间，1位',
      roomNum: 1,
      peopleNum: 1,
      center: {
        lng: 114.347061,
        lat: 34.815321
      },
      mapZoom: 12,
      isInfoWindow: false,
      roomPrice: null,
      showButtons: false,
      minPrice: null,
      maxPrice: null,
      roomRating: 0,
      roomLayout: 3,
    }
  },
  mounted() {
    this.getList();
  },
  computed: {
    today() {
      const year = this.date.getFullYear();
      const month = this.date.getMonth() + 1;
      const day = this.date.getDate();
      return `${year}-${month}-${day}`;
    },
    tomorrow() {
      const year = this.date.getFullYear();
      const month = this.date.getMonth() + 1;
      const day = this.date.getDate() + 1;
      return `${year}-${month}-${day}`;
    },
  },
  methods: {
    getList() {
      this.loading = true;
      listHotel(this.queryParams).then(res => {
        this.hotelList = res.rows;
        this.total = res.total;
        this.loading = false;
        this.hotelList.forEach((hotel) => {
          getMinPrice(hotel.id).then((res) => {
            hotel.price = res.data;
            hotel.minPrice = res.data;
            hotel.minPrice = new Intl.NumberFormat('zh-CN', {
              style: 'currency',
              currency: 'CNY',
            }).format(hotel.minPrice).replace(/^(\D+)/, '').replace(/\.\d{2}$/, '');
          })
          getHotelRating(hotel.id).then((res) => {
            hotel.rating = res.data;
          })
          // 将经纬度作为一个对象加入markerCenter数组
          const markerCenter = {
            lng: hotel.lng,
            lat: hotel.lat
          };
          hotel.point = markerCenter;
          hotel.iconUrl = require('@/assets/location.png');
          hotel.hoverIconUrl = require('@/assets/location1.png');
          hotel.isHover = false;
        })
        this.trueHotelList = this.hotelList;
      })
      const today = this.today;
      const tomorrow = this.tomorrow;
      this.dateRange = [today, tomorrow];
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
    // 寻找符合条件的酒店【贪心算法 / 只求可行性 不求最优解】
    searchHotel() {
      const hotelList = this.trueHotelList;
      const hotels = [];
      const data ={
        roomNumber: this.roomNum,
        peopleNumber: this.peopleNum
      };
      getFeasibility(data).then((res) => {
        res.data.forEach((data) => {
          hotelList.forEach((hotel) => {
            if (hotel.id === data) {
              hotels.push(hotel);
            }
          })
        })
      })
      this.hotelList = hotels;
    },
    // 位置Marker点击事件
    infoWindowOpen(id) {
      this.openWinId = id;
      this.isInfoWindow = true;
    },
    // 位置Marker关闭事件
    infoWindowClose() {
      this.isInfoWindow = false;
      this.openWinId = 0;
    },
    // 选择酒店价格
    selectPrice(min, max) {
      const hotelList = this.trueHotelList;
      const hotels = [];
      if (this.roomPrice !== min && max !== 0) {
        this.roomPrice = min;
        hotelList.forEach((hotel) => {
          if (hotel.price >= min && hotel.minPrice <= max) {
            hotels.push(hotel);
          }
        })
        this.hotelList = hotels;
      } else if (this.roomPrice !== min && max === 0) {
        this.roomPrice = min;
        hotelList.forEach((hotel) => {
          if (hotel.price >= min) {
            hotels.push(hotel);
          }
        })
        this.hotelList = hotels;
      } else {
        this.roomPrice = null;
        this.hotelList = hotelList;
      }
    },
    clearInput() {
      this.minPrice = '';
      this.maxPrice = '';
      this.hotelList = this.trueHotelList;
    },
    selectByPrice() {
      if (this.minPrice > this.maxPrice) {
        this.$notify.error({
          title: '错误',
          message: '最低值不得高于最高值！'
        })
      } else {
        const hotelList = this.trueHotelList;
        const hotels = [];
        if (this.minPrice === null && this.maxPrice === null) {
          this.hotelList = hotelList;
        } else if (this.minPrice === null && this.maxPrice !== null) {
          hotelList.forEach((hotel) => {
            if (hotel.minPrice <= this.maxPrice) {
              hotels.push(hotel);
            }
          })
          this.hotelList = hotels;
        } else if (this.minPrice !== null && this.maxPrice === null) {
          hotelList.forEach((hotel) => {
            if (hotel.minPrice >= this.minPrice) {
              hotels.push(hotel);
            }
          })
          this.hotelList = hotels;
        } else {
          hotelList.forEach((hotel) => {
            if (hotel.minPrice >= this.minPrice && hotel.minPrice <= this.maxPrice) {
              hotels.push(hotel);
            }
          })
          this.hotelList = hotels;
        }
      }
    },
    // 选择酒店评分
    selectRating(rating) {
      const hotelList = this.trueHotelList;
      const hotels = [];
      hotelList.forEach((hotel) => {
        if (hotel.rating.mainRating >= rating) {
          hotels.push(hotel);
        }
      })
      this.hotelList = hotels;
      this.roomRating = rating;
    },
    // 选择房型
    selectLayout(id) {
      const hotelList = this.trueHotelList;
      const hotels = [];
      this.roomLayout = id;
      if (id === 3) {
        this.hotelList = hotelList;
      } else {
        getHotelId(id).then((res) => {
          hotelList.forEach((hotel) => {
            if (res.data.includes(hotel.id)) {
              hotels.push(hotel)
            }
          })
          this.hotelList = hotels;
        })
      }
    },
    hoverHotelCard(item) {
      this.center = item.point;
      this.infoWindowOpen(item.id);
    },
    leaveHotelCard() {
      this.center = {
        lng: 114.347061,
        lat: 34.815321
      };
      this.infoWindowClose();
    },
    ratingText(score) {
      if (score >= 5) {
        return '超棒';
      } else if (score >= 4) {
        return '棒';
      } else if (score >= 3.5) {
        return '好';
      } else if (score >= 3) {
        return '一般';
      } else if (score >= 2) {
        return '较差';
      } else {
        return '差';
      }
    },
  },
  filters: {
    decimal(value) {
      if (value != null && !isNaN(value)) {
        return value.toFixed(1);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Container {
  display: flex;
  justify-content: center;
}
.searchPart {
  position: relative;
  width: 1050px;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  .chooseWindow {
    position: absolute;
    width: 250px;
    height: 150px;
    border-radius: 3px;
    border-top: 2px solid #1ab394;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    left: 375px;
    top: 50px;
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
  .hotelFilter {
    width: 100%;
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 #eee;
    border: 1px solid #eee;
    .aside {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      background-color: #f5f7fa;
    }
    .roomPrice {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      height: auto;
      .priceButton {
        display: flex;
        align-items: center;
        flex-basis: 100%;
        margin-top: 5px;
      }
      .priceFilter {
        display: flex;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 20px;
        ::v-deep .el-input--medium .el-input__inner {
          height: 32px;
          line-height: 32px;
        }
        .showButton {
          display: flex;
          margin-left: 33px;
          margin-top: 5px;
          .el-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 30px;
            font-size: 14px;
          }
          ::v-deep .el-button--medium {
            padding: 10px 0px;
          }
        }
      }
    }
    .roomRating {
      display: flex;
      align-items: center;
      .el-button {
        width: 70px;
        font-size: 14px;
      }
      ::v-deep .el-button--medium {
        padding: 10px 0px;
      }
    }
    .el-button {
      width: 60px;
      font-size: 14px;
    }
    ::v-deep .el-button--medium {
      padding: 10px 0px;
    }
  }
}
.infoContainer {
  display: flex;
  justify-content: center;
  width: 100%;
  .hotelContainer {
    width: 640px;
    margin-right: 10px;
    .hotelInfoFilter {
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      border-radius: 5px;
      background-color: #eeeeee;
    }
    .hotelCard {
      width: 100%;
      .hotelInfo {
        position: relative;
        display: flex;
        .hotelName {
          h1 {
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            margin: 0;
            padding: 5px 5px 0 10px;
          }
          h1:hover {
            color: #1ab394;
          }
          h2 {
            font-size: 14px;
            margin: 0 0 0 10px;
            color: #999999;
          }
        }
        .hotelReviews {
          position: absolute;
          top: 0;
          right: 0;
          .rating {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 25px;
            border-radius: 5px;
            background-color: #1ab394;
          }
        }
        .price {
          position: absolute;
          right: 0;
          bottom: 0;
          text-align: right;
          p {
            font-size: 24px;
            font-weight: bold;
            color: #1ab394;
            margin: 0;
          }
          ::v-deep .el-button--medium {
            font-size: 16px;
          }
          ::v-deep .el-button--primary {
            background-color: #1ab394;
          }
        }
      }
      ::v-deep .el-card.is-always-shadow {
        box-shadow: 0 0 0 0 #FFFFFF;
      }
      ::v-deep .el-card:hover {
        box-shadow: 0 2px 5px 0 #999;
      }
      ::v-deep .el-card__body {
        padding: 15px 20px 15px 20px;
      }
    }
  }
  .mapWrapper {
    display: flex;
    justify-content: center;
    width: 400px;
    height: 400px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 #eeeeee;
  }
  .map {
    width: 100%;
    height: 100%;
  }
  .locationInfo {
    position: relative;
    h1 {
      font-size: 16px;
      font-weight: bold;
      margin: 0;
    }
    .rating {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 25px;
      border-radius: 5px;
      margin-top: 5px;
      background-color: #1ab394;
    }
  }
  .button {
    margin-top: 40px;
    p {
      position: absolute;
      right: 5px;
      bottom: 35px;
      margin: 0;
      font-size: 18px;
      font-weight: bold;
      color: #1ab394;
    }
    .el-button {
      position: absolute;
      right: 0;
      bottom: 10px;
      width: 80px;
      height: 25px;
      padding: 0;
    }
  }
}
</style>
