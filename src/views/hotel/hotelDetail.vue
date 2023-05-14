<template>
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
            <el-breadcrumb-item>{{ hotel.hotelName }}</el-breadcrumb-item>
          </el-breadcrumb>
          <img v-if="weather && weather.icon" :src="require('@/assets/weatherIcons/'+ weather.icon +'.png')" class="weatherIcon"/>
          <span style="font-size: 14px; line-height: 30px;">{{weather.text}}</span>
          <span style="margin-left: 15px; font-size: 14px; line-height: 30px;">{{weather.temp}}℃</span>
        </div>
        <!-- 酒店名称和评分 -->
        <div class="hotelName">
          <h1>{{ hotel.hotelName }}</h1>
          <h3>{{ hotel.hotelForeignName }}</h3>
          <span>地址：{{ hotel.location }}</span>
          <!-- 酒店评分 -->
          <div class="hotelRate">
            <span style="color: #1ab394; font-size: 30px; font-weight: bold;" v-show="ratingList.mainRating">{{ ratingList.mainRating | decimal }}</span>
            <span style="font-size: 14px; color: #666666;">分</span>
          </div>
        </div>
        <div class="hotelImg">
          <div class="mainImg">
            <el-image
              :key="`${hotelImg[0]}-${Date.now()}`"
              :src="hotelImg[0]"
              style="width: 750px; height: 100%; border-radius: 5px;"
              :preview-src-list="hotelImg"
              ref="hotelImg"
              @error="handleImageError">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <div class="otherImg">
            <div class="img01">
              <img :src="hotelImg[1]" style="width: 100%; height: 100%; border-radius: 5px;" />
            </div>
            <div class="img02">
              <img :src="hotelImg[2]" style="width: 100%; height: 100%; border-radius: 5px;" />
            </div>
            <div class="img03">
              <img :src="hotelImg[3]" style="width: 100%; height: 100%; border-radius: 5px;" />
            </div>
            <div class="img04">
              <img :src="hotelImg[4]" style="width: 100%; height: 100%; border-radius: 5px;" />
            </div>
            <div class="img05">
              <img :src="hotelImg[5]" style="width: 100%; height: 100%; border-radius: 5px;" />
            </div>
            <div class="img06">
              <img :src="hotelImg[6]" style="width: 100%; height: 100%; border-radius: 5px;" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 顶部菜单 -->
    <div class="topMenu" ref="topMenu">
      <el-menu :default-active="activeIndex" mode="horizontal" active-text-color="#2a9d8f" class="hotelMenu">
        <el-menu-item index="1" @click="scrollToSection('#roomBooking')">预订</el-menu-item>
        <el-menu-item index="2" @click="scrollToSection('#hotelReview')">点评</el-menu-item>
        <el-menu-item index="3" @click="scrollToSection('#hotelLocation')">位置</el-menu-item>
        <el-menu-item index="4" @click="scrollToSection('#hotelInfo')">信息</el-menu-item>
      </el-menu>
    </div>
    <!-- 酒店房间预订 -->
    <div class="roomBooking" id="roomBooking">
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
      <el-card v-for="(item, index) in hotelRooms" :key="index">
        <div class="roomContainer">
          <div class="roomImg">
            <el-image
              :src="item.imgList[0]"
              :preview-src-list="item.imgList"
              style="width: 80%; height: 150px; border-radius: 5px; margin-left: 5px;" />
            <p style="margin-left: 5px;">{{ item.roomName }}</p>
            <span style="display: block; font-size: 14px; color: #999999; margin-top: 2px; margin-left: 5px">
              {{ item.bed }}
              <el-divider direction="vertical"></el-divider>
              {{ item.size }}m²
            </span>
            <el-button @click="showRoomInfo" type="text" style="margin-left: 5px;">查看客房信息</el-button>
          </div>
          <el-drawer
            :visible.sync="drawer"
            direction="rtl"
            :with-header="false">
            <div class="generalInfo">
              <h1>基本信息</h1>
              <p><i class="hotel-fangzi" />{{ item.size }}平方米</p>
              <p><i class="hotel-Bed" />{{ item.bed }}</p>
            </div>
            <div class="facilities">
              <h1>全部设施</h1>
              <div class="infoDOM">
                <h2>洗浴用品</h2>
                <div class="showInfo">
                  <span style="margin-left: 25px; font-size: 14px; color: #666666; flex-basis: 33%; margin-bottom: 10px" v-for="n in 5">
                    <i class="el-icon-circle-check" style="margin-right: 10px;"/>牙刷
                  </span>
                </div>
              </div>
              <div class="infoDOM">
                <h2>客房布局和家具</h2>
                <div class="showInfo"></div>
              </div>
              <div class="infoDOM">
                <h2>网络与通讯</h2>
                <div class="showInfo"></div>
              </div>
              <div class="infoDOM">
                <h2>卫浴设施</h2>
                <div class="showInfo"></div>
              </div>
              <div class="infoDOM">
                <h2>客房设施</h2>
                <div class="showInfo"></div>
              </div>
              <div class="infoDOM">
                <h2>媒体科技</h2>
                <div class="showInfo"></div>
              </div>
              <div class="infoDOM">
                <h2>便利设施</h2>
                <div class="showInfo"></div>
              </div>
              <div class="infoDOM">
                <h2>食品饮品</h2>
                <div class="showInfo"></div>
              </div>
            </div>
          </el-drawer>
          <div class="roomInfo">
            <div class="number">
              <span v-for="n in item.number">
                <i class="el-icon-user-solid"/>
              </span>
            </div>
            <div>
              <div class="roomPrice">
                <h3>￥{{ item.price }}</h3>
                <router-link :to="{ path: '/order/:roomId', query: { roomId: item.id } }">
                  <el-button class="bookingButton">预订</el-button>
                </router-link>
              </div>
              <div class="remainRoom">
                <span style="color: #999999; font-size: 14px;" v-if="item.counts <= 5">剩余{{ item.counts }}间</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 酒店点评容器 -->
    <div class="hotelReviewContainer" id="hotelReview">
      <!-- 酒店点评 -->
      <div class="hotelReview">
        <!-- 酒店评分 -->
        <div class="hotelRating">
          <!-- 点评标题 -->
          <h1>点评</h1>
          <!-- 总评分 -->
          <div class="mainRating">
            <div style="display: flex; justify-content: center;">
              <span style="font-size: 24px; color: #1ab394; font-weight: bold;">{{ ratingText(ratingList.mainRating) }}</span>
            </div>
            <div style="display: flex; justify-content: center; align-items: flex-end; margin-top: 15px;">
              <span style="font-size: 48px; color: #1ab394; font-weight: bold;" v-show="ratingList.mainRating">{{ ratingList.mainRating | decimal }}</span>
              <span style="font-size: 32px; color: #999999; font-weight: bold;">/5.0</span>
            </div>
          </div>
          <!-- 各项评分 -->
          <div class="otherRating">
            <!-- 环境评分 -->
            <div style="position: relative; flex-basis: 50%;">
              <span style="position: absolute; bottom: 0; left: 35px; font-size: 16px; color: #666666">环境</span>
              <el-progress
                type="dashboard"
                :percentage="getPercentage(ratingList.environmentRating)"
                :color="colors"
                :show-text="true"
                :width="100"
                :stroke-width="10"
                :format="showScore">
              </el-progress>
            </div>
            <!-- 卫生评分 -->
            <div style="position: relative; flex-basis: 50%;">
              <span style="position: absolute; bottom: 0; left: 35px; font-size: 16px; color: #666666">卫生</span>
              <el-progress
                type="dashboard"
                :percentage="getPercentage(ratingList.hygieneRating)"
                :color="colors"
                :show-text="true"
                :width="100"
                :stroke-width="10"
                :format="showScore">
              </el-progress>
            </div>
            <!-- 服务评分 -->
            <div style="position: relative; flex-basis: 50%; margin-top: 20px;">
              <span style="position: absolute; bottom: 0; left: 35px; font-size: 16px; color: #666666">服务</span>
              <el-progress
                type="dashboard"
                :percentage="getPercentage(ratingList.serviceRating)"
                :color="colors"
                :show-text="true"
                :width="100"
                :stroke-width="10"
                :format="showScore">
              </el-progress>
            </div>
            <!-- 设施评分 -->
            <div style="position: relative; flex-basis: 50%; margin-top: 20px;">
              <span style="position: absolute; bottom: 0; left: 35px; font-size: 16px; color: #666666">设施</span>
              <el-progress
                type="dashboard"
                :percentage="getPercentage(ratingList.facilityRating)"
                :color="colors"
                :show-text="true"
                :width="100"
                :stroke-width="10"
                :format="showScore">
              </el-progress>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <!-- 评分 -->
        <div class="commentContainer">
          <div class="hotelComment" v-for="(item, index) in commentsList" :key="index">
            <!-- 左边部分【头像、昵称、入住房间名称、入住时间】 -->
            <div class="leftPart">
              <el-avatar shape="square" :src="'/dev-api' + item.avatar"></el-avatar>
              <span class="username">{{ item.nickName }}</span>
              <span style="display: block; margin-left: 10px; font-size: 14px; margin-top: 5px; color: #999999;"><i class="hotel-Bed" style="margin-right: 5px;"/>{{ item.roomName }}</span>
              <span style="margin-left: 11px; margin-top: 5px; font-size: 14px; color: #999999;"><i class="el-icon-date" style="margin-right: 5px;" />{{ item.checkInDate }}入住</span>
            </div>
            <div class="rightPart">
              <!-- 用户评分 -->
              <div class="hotelRating">
                <span style="font-size: 16px; color: #999999;">
                  <strong style="font-size: 28px; color: #1ab394; font-weight: bold;">{{ item.mainRating }}</strong>
                  /5
                </span>
                <!-- 根据用户评分设置一个text数组存储对应表达 -->
                <span style="font-size: 24px; color: #1ab394; font-weight: bold; margin-left: 15px;">{{ ratingText(item.mainRating) }}</span>
              </div>
              <!-- 用户评论内容 -->
              <div class="commentContent">
                <p class="content">{{ item.content }}</p>
                <p class="commentDate">{{ item.createTime }}</p>
                <!-- 评论图片【循环显示】 -->
                <div>
                  <el-image
                    v-for="(img, index) in item.imgList"
                    :key="index"
                    :src="img"
                    :preview-src-list="item.imgList"
                    style="width: 120px; height: 120px; margin-right: 10px; border-radius: 5px;"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 酒店位置 -->
    <div class="hotelLocation" id="hotelLocation">
      <div class="mapContainer">
        <h1>位置</h1>
        <baidu-map
          class="map"
          :center="center"
          :zoom="20"
          :scroll-wheel-zoom="false">
          <bm-traffic></bm-traffic>
          <!--            <bm-marker :position="center" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>-->
        </baidu-map>
      </div>
    </div>
    <!-- 酒店信息 -->
    <div class="hotelInfo" id="hotelInfo">
      <div class="infoContainer">
        <!-- 基本信息 -->
        <div style="display: flex; border-bottom: 1px solid #ddd; padding: 20px;">
          <div class="asideInfo">
            <span style="font-size: 16px; color: #666666;">基本信息</span>
          </div>
          <div style="margin-left: 0;">
            <span style="margin: 0; font-size: 14px; color: #333333">入住时间: <strong style="font-size: 18px; font-weight: bold;">14:00 - 00:00</strong></span>
            <span style="margin: 0 0 0 30px; font-size: 14px; color: #333333;">离店时间: <strong style="font-size: 18px; font-weight: bold;">12:00之前</strong></span>
          </div>
        </div>
        <!-- 主要设施 -->
        <div style="display: flex; border-bottom: 1px solid #ddd; padding: 20px;">
          <div class="asideInfo">
            <span style="font-size: 16px; color: #666666;">主要设施</span>
          </div>
          <div v-show="!isShowAll" style="position: relative;">
            <ul class="facilitiesList">
              <li><i class="hotel-wifi" /><span>免费WiFi</span></li>
              <li><i class="hotel-tingchechang" /><span>停车场</span></li>
              <li><i class="hotel-dianti" /><span>电梯</span></li>
              <li><i class="hotel-canting" /><span>餐厅</span></li>
              <li><i class="hotel-hanglijicun" /><span>行李寄存</span></li>
              <li><i class="hotel-qiantai" /><span>前台服务</span></li>
              <li><i class="hotel-a-24Hanbao" /><span>24H安保</span></li>
              <li><i class="hotel-jiankong_o" /><span>监控</span></li>
            </ul>
            <el-button type="text" style="position: absolute; bottom: -10px;" @click="showAll"><i class="el-icon-arrow-down" />显示全部</el-button>
          </div>
          <div v-show="isShowAll" style="position: relative;">
            <ul class="allFacilities">
              <li style="width: 100%; font-size: 14px; font-weight: bold; color: #333333;">交通服务</li>
              <li style="width: 33%;"><i class="hotel-mn_jiejifuwu"/><span>接机服务</span></li>
              <li style="width: 33%;"><i class="hotel-jiaochefuwu"/><span>叫车服务</span></li>
              <li style="width: 33%;"><i class="hotel-jiesongzhanfuwu"/><span>接送站服务</span></li>
              <li style="width: 33%;"><i class="hotel-tingchechang"/><span>停车场</span></li>
              <li style="width: 100%; font-size: 14px; font-weight: bold; color: #333333; margin-top: 10px;">餐饮服务</li>
              <li style="width: 33%;"><i class="hotel-kafei"/><span>咖啡厅</span></li>
              <li style="width: 33%;"><i class="hotel-canting"/><span>餐厅</span></li>
              <li style="width: 33%;"><i class="hotel-songcan"/><span>送餐服务</span></li>
              <li style="width: 100%; font-size: 14px; font-weight: bold; color: #333333; margin-top: 10px;">康体设施</li>
              <li style="width: 33%;"><i class="hotel-spa"/><span>SPA</span></li>
              <li style="width: 33%;"><i class="hotel-anmo"/><span>按摩室</span></li>
              <li style="width: 100%; font-size: 14px; font-weight: bold; color: #333333; margin-top: 10px;">前台服务</li>
              <li style="width: 33%;"><i class="hotel-iconyihuifu-"/><span>储物柜</span></li>
              <li style="width: 33%;"><i class="hotel-kuaidi"/><span>快递服务</span></li>
              <li style="width: 33%;"><i class="hotel-ditu_diqiu_o"/><span>多语种服务</span></li>
              <li style="width: 33%;"><i class="hotel-17"/><span>快速入住退房</span></li>
              <li style="width: 33%;"><i class="hotel-zhuanzhihangliyuan"/><span>专职行李员</span></li>
              <li style="width: 33%;"><i class="hotel-naozhong"/><span>叫醒服务</span></li>
              <li style="width: 100%; font-size: 14px; font-weight: bold; color: #333333; margin-top: 10px;">公共区</li>
              <li style="width: 33%;"><i class="hotel-wifi"/><span>公共WiFi</span></li>
              <li style="width: 33%;"><i class="hotel-dianti"/><span>电梯</span></li>
              <li style="width: 33%;"><i class="el-icon-no-smoking"/><span>公共区域禁烟</span></li>
              <li style="width: 33%;"><i class="el-icon-smoking"/><span>吸烟区</span></li>
              <li style="width: 100%; font-size: 14px; font-weight: bold; color: #333333; margin-top: 10px;">无障碍设施服务</li>
              <li style="width: 33%;"><i class="hotel-wuzhangai"/><span>无障碍服务</span></li>
              <li style="width: 100%; font-size: 14px; font-weight: bold; color: #333333; margin-top: 10px;">安全与安保</li>
              <li style="width: 33%;"><i class="hotel-a-24Hanbao"/><span>24H安保</span></li>
              <li style="width: 33%;"><i class="hotel-jiankong_o"/><span>公共区域监控</span></li>
              <li style="width: 33%;"><i class="el-icon-bell"/><span>安全报警器</span></li>
              <li style="width: 100%; font-size: 14px; font-weight: bold; color: #333333; margin-top: 10px;">运动</li>
              <li style="width: 33%;"><i class="hotel-jianshenfang"/><span>健身房</span></li>
              <li style="width: 33%;"><i class="hotel-youyongchi"/><span>泳池</span></li>
            </ul>
            <el-button type="text" style="position: absolute; bottom: -10px;" @click="showAll"><i class="el-icon-arrow-up" />收起</el-button>
          </div>
        </div>
        <!-- 酒店攻略 -->
        <div style="display: flex; border-bottom: 1px solid #ddd; padding: 20px;">
          <div class="asideInfo">
            <span style="font-size: 16px; color: #666666; white-space: nowrap;">酒店攻略</span>
          </div>
          <div style="margin-left: 100px;">
            <span style="font-size: 14px; color: #666666; ">{{ hotel.introduction }}</span>
          </div>
        </div>
        <!-- 品牌信息 -->
        <div style="display: flex; border-bottom: 1px solid #ddd; padding: 20px;">
          <div class="asideInfo">
            <span style="font-size: 16px; color: #666666; white-space: nowrap;">品牌信息</span>
          </div>
          <div style="">
            <span style="font-size: 16px; color: #666666; ">{{ hotel.hotelBrand }}</span>
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
import { getHotel } from "@/api/hotel/hotel";
import { getHotelRooms } from "@/api/travels/rooms"
// 导入 Intl.NumberFormat
import Intl from 'intl'
import 'intl/locale-data/jsonp/en.js'
import { getCommentsList, getHotelRating } from "@/api/hotel/hotelComments"
import { getUserProfile } from "@/api/system/user";
import { addUserRecords } from "@/api/userRecords/userRecords";
import {getOrders} from "@/api/hotel/orders";

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
      hotel: {},
      hotelRooms: [],
      hotelImg: [],
      ratingList: {
        mainRating: null,
        environmentRating: null,
        hygieneRating: null,
        serviceRating: null,
        facilityRating: null
      },
      activeIndex: '1',
      isShowAll: false,
      date: new Date(),
      dateRange: [],
      isShowWin: false,
      roomNum: 1,
      peopleNum: 1,
      buttonValue: '1间，1位',
      /* priceRange是一个数组，[0]是最小值，[1]是最大值 */
      priceRange: [0, 2000],
      roomLayout: 3,
      drawer: false,
      colors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#1ab394', percentage: 100}
      ],
      center: {
        lng: 114.347061,
        lat: 34.815321
      },
      isTopMenuFixed: false,
      commentsList: [],
    }
  },
  props: {
    topDistance: {
      type: Number,
      required: true,
      default: 0
    },
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
  mounted() {
    this.$nextTick(() => {
      const topMenu = this.$refs.topMenu;
      const topDistance = topMenu.getBoundingClientRect().top;
      let _this = this;
      window.addEventListener('scroll', () => {
        if(_this.topDistance < topDistance) {
          _this.isTopMenuFixed = false;
        } else {
          _this.isTopMenuFixed = true;
        }
      }, true)
    });
    // 获取天气信息
    this.getWeather();
    // 获取酒店信息
    this.getHotelDetail();
    // 添加用户浏览记录
    this.addUserRecord();
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
    // 获取酒店信息
    getHotelDetail() {
      const id = this.$route.query.id;
      getHotel(id).then((res) => {
        this.hotel = res.data;
        const lng = this.hotel.lng;
        const lat = this.hotel.lat;
        this.center = { lng, lat };
        const imgArray = this.hotel.hotelImg.split(",");
        this.hotelImg.push('/dev-api' + this.hotel.coverImg);
        for (let i = 0; i < imgArray.length; i++) {
          this.hotelImg.push('/dev-api' + imgArray[i]);
        }
        const today = this.today;
        const tomorrow = this.tomorrow;
        this.dateRange = [today, tomorrow];
      })
      getHotelRooms(id).then((res) => {
        this.hotelRooms = res.data;
        this.hotelRooms.forEach((room) => {
          room.imgList = room.img.split(',').map(img => `/dev-api${img}`);
          room.price = new Intl.NumberFormat('zh-CN', {
            style: 'currency',
            currency: 'CNY',
          }).format(room.price).replace(/^(\D+)/, '').replace(/\.\d{2}$/, '');
        });
      })
      getCommentsList(id).then((res) => {
        this.commentsList = res.data;
        this.commentsList.forEach((comment) => {
          comment.imgList = comment.img.split(',').map(img => `/dev-api${img}`);
          comment.createTime = this.formatDate(comment.createTime);
          if (comment.orderId !== null) {
            getOrders(comment.orderId).then((res) => {
              comment.checkInDate = this.formatDateM(res.data.fromDate);
            })
          }
        })
      })
      getHotelRating(id).then((res) => {
        this.ratingList = res.data;
      })
    },
    addUserRecord() {
      getUserProfile().then((res) => {
        const data = {
          userId: res.data.userId,
          type: 2,
          hotelId: this.$route.query.id
        }
        addUserRecords(data);
      })
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}年${month}月${day}日`;
    },
    formatDateM(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      return `${year}年${month}月`;
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
    getPercentage(score){
      return (score/5)*100;
    },
    handleImageError() {
      this.$refs.hotelImg.currentSrc = '';
      this.$forceUpdate();
    },
    scrollToSection(selector) {
      const targetElement = document.querySelector(selector)
      const offsetTop = targetElement.offsetTop
      this.$nextTick(() => {
        this.$emit('scrollTo', offsetTop);
      })
    },
    showAll() {
      this.isShowAll = !this.isShowAll;
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
    },
    // 展示房间信息
    showRoomInfo() {
      this.drawer = true;
    },
    showScore(percentage) {
      // return score.toFixed(1);
      return (Math.round(percentage * 5) / 100).toFixed(1);
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
.hotelHeader {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 510px;
  background-color: #FFFFFF;
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
  position: sticky;
  background-color: #FFFFFF;
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
.topMenu.fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  box-shadow: 0 2px 3px rgba(0,0,0,.1);
  background-color: #ffffff;
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
    background-color: #FFFFFF;
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
    .el-drawer {
      .generalInfo {
        h1 {
          font-size: 28px;
          font-weight: bold;
          padding: 10px;
          margin: 0;
        }
        p {
          font-size: 18px;
          padding: 5px 0 5px 10px;
          margin: 0;
        }
      }
      .facilities {
        h1 {
          font-size: 28px;
          font-weight: bold;
          padding: 10px;
          margin: 0;
        }
        .infoDOM {
          h2 {
            font-size: 20px;
            padding: 5px 0 5px 20px;
            margin: 0;
          }
          .showInfo {
            display: flex;
            flex-wrap: wrap;
          }
        }
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
  margin-top: 10px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  background-color: #f5f7fa;
  .hotelReview {
    width: 1050px;
    margin-top: 20px;
    margin-bottom: 20px;
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
        display: flex;
        flex-wrap: wrap;
        width: 580px;
        height: 160px;
        top: 20px;
        left: 550px;
      }
    }
    ::v-deep .el-divider--horizontal {
      width: 98%;
      margin-top: 60px;
      margin-left: 1%;
    }
    .commentContainer {
      .hotelComment {
        display: flex;
        width: 1030px;
        margin-left: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #eee;
        padding: 10px;
        border-radius: 5px;
        .leftPart {
          position: relative;
          width: 250px;
          height: auto;
          border-right: 1px solid #eee;
          /* 头像 */
          .el-avatar {
            width: 50px;
            height: 50px;
            margin: 10px 0 0 10px;
          }
          .username {
            position: absolute;
            top: 10px;
            font-size: 16px;
            margin-left: 5px;
            color: #333333;
          }
        }
        .rightPart {
          position: relative;
          width: 780px;
          margin-left: 10px;
          .hotelRating {
            height: 40px;
          }
          .commentContent {
            position: relative;
            .content {
              font-size: 16px;
              color: #455873;
              letter-spacing: 0;
              line-height: 24px;
              word-break: break-word;
              margin: 10px 0 10px 0;
            }
            .commentDate {
              position: absolute;
              right: 0px;
              font-size: 14px;
              color: #999999;
              margin-top: 0;
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
}
.hotelLocation {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f5f7fa;
  .mapContainer {
    width: 1050px;
    padding: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: #FFFFFF;
    h1 {
      font-size: 24px;
      font-weight: bold;
      margin: 0 0 15px 0;
    }
    .map {
      width: 1000px;
      height: 352px;
      border-radius: 5px;
    }
  }
}
.hotelInfo {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f5f7fa;
  .infoContainer {
    width: 1050px;
    padding: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: #FFFFFF;
    .asideInfo {
      width: 162px;
    }
    .facilitiesList {
      display: flex;
      flex-wrap: wrap;
      width: 800px;
      margin-top: 0;
      list-style: none;
      padding: 0;
      span {
        font-size: 14px;
        color: #333333;
      }
      i {
        margin-right: 5px;
      }
      li {
        width: 20%;
        text-align: left;
        margin-bottom: 10px;
      }
    }
    .allFacilities {
      display: flex;
      flex-wrap: wrap;
      width: 800px;
      list-style: none;
      margin-top: 0;
      padding: 0;
      li {
        text-align: left;
        margin-bottom: 10px;
      }
      span {
        font-size: 14px;
        color: #333333;
      }
      i {
        margin-right: 5px;
      }
    }
  }
}
::v-deep .el-progress__text {
  font-size: 20px !important;
  font-weight: bold !important;
  color: #333333 !important;
}
</style>
