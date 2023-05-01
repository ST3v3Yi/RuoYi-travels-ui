<template>
<!--  <el-row>
    <el-col :span="24">
      <el-card v-for="(item, index) in hotelList" :key="index" style="margin: 25px;">
        <router-link :to="{ path: '/hotelDetail/:id', query: { id: item.id } }">
        </router-link>
        <div>
          <h1>{{item.hotelName}}</h1>
        </div>
      </el-card>
    </el-col>
  </el-row>-->
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
        <el-button icon="el-icon-search" circle style="width: 36px" type="primary"></el-button>
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
      </div>
    </div>
    <div class="mapContainer">
      <div class="mapWrapper">
        <baidu-map
          class="map"
          :center="center"
          :zoom="14"
          :scroll-wheel-zoom="false">
          <bm-marker
            v-for="item in hotelList"
            :position="item.point"
            :icon="{ url: iconUrl, size: { width: 32, height: 32 } }"
            @mouseover.stop="markerHover"
            @mouseout.stop="markerHoverOut"
            @click="infoWindowOpen(item.id)">
            <bm-info-window :show="isInfoWindow" @close="infoWindowClose" @open="infoWindowOpen">
              <div class="locationInfo">
                <h1>{{ item.hotelName }}</h1>
                <div style="display: flex;">
                  <div class="rating" v-if="item.rating && item.rating.mainRating">
                    <span style="font-size: 14px; font-weight: bold; color: #FFFFFF">{{ item.rating.mainRating | decimal }}</span>
                  </div>
                  <span style="font-size: 14px; color: #1ab394; margin: 10px 0 0 5px;">超棒</span>
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
  </div>
</template>

<script>
import { listHotel } from '@/api/hotel/hotel'
import { getMinPrice } from "@/api/travels/rooms";
import { getHotelRating } from "@/api/hotel/hotelComments";
export default {
  data() {
    return {
      hotelList: [],
      date: new Date(),
      dateRange: [],
      isShowWin: false,
      openWin: null,
      buttonValue: '1间，1位',
      roomNum: 1,
      peopleNum: 1,
      center: {
        lng: 114.347061,
        lat: 34.815321
      },
      iconUrl: require('@/assets/location.png'),
      isInfoWindow: false,
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
            hotel.minPrice = res.data;
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
        })
        console.log(this.hotelList);
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
    markerHover() {
      this.iconUrl = require('@/assets/location1.png');
    },
    markerHoverOut() {
      this.iconUrl = require('@/assets/location.png');
    },
    // 位置Marker点击事件
    infoWindowOpen(id) {
      this.isInfoWindow = true;
      this.openWin = id;
    },
    // 位置Marker关闭事件
    infoWindowClose() {
      this.isInfoWindow = false;
      this.openWin = null;
    }
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
  padding: 10px;
  border-radius: 5px;
  background-color: #666666;
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
}
.mapContainer {
  display: flex;
  justify-content: center;
  width: 100%;
  .mapWrapper {
    display: flex;
    justify-content: center;
    width: 1050px;
    height: 420px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .map {
    width: 1050px;
    height: 420px;
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
