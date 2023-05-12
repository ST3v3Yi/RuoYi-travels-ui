<template>
  <div class="main">
    <Navbar class="Navbar" />
    <div class="coverImg">
      <h1>百年花鸟春风梦，不是钱塘是汴梁</h1>
      <el-button @click="scrollToMain('#main')">了解更多</el-button>
      <img :src="require('@/assets/coverImg.jpg')" style="width: 100%; height: 100%;"/>
    </div>
    <div class="carouselContainer" id="main">
      <el-carousel :height="bannerHeight + 'px'" :interval="3000" arrow="hover">
        <el-carousel-item v-for="(item, index) in showList" :key="index">
          <router-link :to="{ name: item.type, query: { id: item.id } }" >
            <el-image :src="item.coverImg" style="width: 100%; height: 640px;"/>
          </router-link>
          <div v-if="item.type === 'routeDetail'">
            <div class="releaseDate">
              <span class="day">{{ item.day }}</span>
              <span class="date">{{ item.date }}</span>
            </div>
            <h1 class="title">{{ item.title }}</h1>
          </div>
          <div v-if="item.type === 'spotDetail'">
            <h1 class="spotName">{{ item.spotName }}</h1>
            <h1 class="foreignName">{{ item.foreignName }}</h1>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="navigation">
      <div class="navContainer">
        <router-link to="/spotList">
        <el-card class="spot">
          <span>观景点</span>
          <svg width="60" height="15" viewBox="0 0 209 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="svgTick">
            <path d="M6 35C58.3333 35.8333 145.5 35 203 6.5" stroke="#1ab394" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" id="tick" />
          </svg>
          <img :src="require('@/assets/navImg/spot.png')" style="width: 50px; height: 50px;" />
        </el-card>
        </router-link>
        <router-link to="/routeList">
        <el-card class="route">
          <span>看攻略</span>
          <svg width="60" height="15" viewBox="0 0 209 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="svgTick">
            <path d="M6 35C58.3333 35.8333 145.5 35 203 6.5" stroke="#1ab394" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" id="tick" />
          </svg>
          <img :src="require('@/assets/navImg/route.png')" style="width: 50px; height: 50px; margin-right: 3px;" />
        </el-card>
        </router-link>
        <router-link to="/hotelList">
        <el-card class="hotel">
          <span>订酒店</span>
          <svg width="60" height="15" viewBox="0 0 209 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="svgTick">
            <path d="M6 35C58.3333 35.8333 145.5 35 203 6.5" stroke="#1ab394" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" id="tick" />
          </svg>
          <img :src="require('@/assets/navImg/hotel.png')" style="width: 50px; height: 50px;" />
        </el-card>
        </router-link>
        <router-link to="/writeRoute">
        <el-card class="write">
          <span>做分享</span>
          <svg width="60" height="15" viewBox="0 0 209 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="svgTick">
            <path d="M6 35C58.3333 35.8333 145.5 35 203 6.5" stroke="#1ab394" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" id="tick" />
          </svg>
          <img :src="require('@/assets/navImg/write.png')" style="width: 50px; height: 50px;" />
        </el-card>
        </router-link>
        <el-card class="userInfo">
          <span>我的</span>
          <svg width="50" height="15" viewBox="0 0 209 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="userSvg">
            <path d="M6 35C58.3333 35.8333 145.5 35 203 6.5" stroke="#1ab394" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" id="tick" />
          </svg>
          <img :src="require('@/assets/navImg/userInfo.png')" style="width: 50px; height: 50px; margin-right: 3px" />
        </el-card>
      </div>
    </div>
    <div class="webInfoContainer">
      <div class="cardContainer">
        <div class="rotateCard">
          <div class="spotCover" id="spotCover">
            景点
          </div>
          <router-link :to="{ path: '/spotDetail/:id', query: { id: spotCard.id } }">
          <div class="spotBack" id="spotBack">
            <span class="cardName">{{ spotCard.name }}</span>
          </div>
          </router-link>
        </div>
        <div class="rotateCard">
          <div class="routeCover" id="routeCover">
            路线攻略
          </div>
          <router-link :to="{ path: '/routeDetail/:id', query: { id: routeCard.id } }">
          <div class="routeBack" id="routeBack">
            <span class="cardName" style="font-size: 24px;" >{{ routeCard.name }}</span>
          </div>
          </router-link>
        </div>
        <div class="rotateCard">
          <div class="hotelCover" id="hotelCover">
            订酒店
          </div>
          <router-link :to="{ path: '/hotelDetail/:id', query: { id: hotelCard.id } }">
          <div class="hotelBack" id="hotelBack">
            <span class="cardName" style="font-size: 24px;" >{{ hotelCard.name }}</span>
          </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="spotInfoContainer">
      <h1>梁园花月四时好，日落夷山映芳草</h1>
      <div class="spotContainer">
        <div class="card-row" v-if="spotList">
          <el-card class="card" v-for="(item, index) in spotList" v-if="index < 3">
            <span>{{ item.spotName }}</span>
            <img :src="'/dev-api' + item.coverImg" style=" width: 100%; height: 100%;" />
          </el-card>
        </div>
        <div class="card-row2" v-if="spotList">
          <el-card class="card">
            <span>{{ spotList[3].spotName }}</span>
            <img :src="'/dev-api' + spotList[3].coverImg" style=" width: 100%; height: 100%;" />
          </el-card>
          <el-card class="card">
            <span>{{ spotList[4].spotName }}</span>
            <img :src="'/dev-api' + spotList[4].coverImg" style=" width: 100%; height: 100%;" />
          </el-card>
        </div>
      </div>
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import { getRecRoute } from "@/api/route/route";
import {getRandomSpot, listSpot} from "@/api/spot/spot";
import { getRandomHotel } from "@/api/hotel/hotel";
import Navbar from "@/layout/components/Navbar.vue";
import Footer from "@/layout/components/Footer.vue";
export default {
  components: {
    Footer,
    Navbar,
  },
  data() {
    return {
      showList: [],
      recRouteList: null,
      randomSpotList: null,
      screenWidth: 0,
      bannerHeight: 0,
      spotList: null,
      spotCard: {
        name: '',
        id: null
      },
      routeCard: {
        name: '',
        id: null
      },
      hotelCard: {
        name: '',
        id: null
      },
    }
  },
  props: {
    topDistance: {
      type: Number,
      required: true,
      default: 0
    }
  },
  mounted() {
    // 首次加载时,初始化高度
    this.screenWidth = window.innerWidth
    this.bannerHeight = 640 / 1920 * this.screenWidth
    // 窗口大小发生改变
    window.onresize = () => {
      this.screenWidth = window.innerWidth
      this.bannerHeight = 640 / 1920 * this.screenWidth
    }
    const spotCard = require('@/assets/cardImg/spotCard.jpg');
    const routeCard = require('@/assets/cardImg/routeCard.jpg');
    const hotelCard = require('@/assets/cardImg/hotelCard.jpg');
    const spotCover = document.getElementById('spotCover')
    const routeCover = document.getElementById('routeCover')
    const hotelCover = document.getElementById('hotelCover')
    spotCover.style.backgroundImage = `url(${spotCard})`
    routeCover.style.backgroundImage = `url(${routeCard})`
    hotelCover.style.backgroundImage = `url(${hotelCard})`
    this.getList();
  },
  methods: {
    // 获取封面推荐列表
    getList() {
      getRecRoute().then((res) => {
        const backImg = '/dev-api' + res.data[0].coverImg;
        const routeBack = document.getElementById('routeBack');
        routeBack.style.backgroundImage = `url(${backImg})`;
        this.routeCard.name = res.data[0].title;
        this.routeCard.id = res.data[0].id;
        res.data.forEach((route) => {
          const newDate = new Date(route.releaseTime);
          const day = `${newDate.getDate()}`;
          const date = `/${newDate.toLocaleString('en-US', { month: 'short' })}. ${newDate.getFullYear()}`;
          const routeInfo = {
            id: route.id,
            title: route.title,
            coverImg: '/dev-api' + route.coverImg,
            day: day,
            date: date,
            type: 'routeDetail'
          }
          this.showList.push(routeInfo);
        })
      })
      getRandomSpot().then((res) => {
        res.data.forEach((spot) => {
          const backImg = '/dev-api' + spot.coverImg;
          const spotBack = document.getElementById('spotBack');
          spotBack.style.backgroundImage = `url(${backImg})`;
          this.spotCard.name = spot.spotName;
          this.spotCard.id = spot.id;
          const spotInfo = {
            id: spot.id,
            spotName: spot.spotName,
            foreignName: spot.spotForeignName,
            coverImg: '/dev-api' + spot.coverImg,
            type: 'spotDetail'
          }
          this.showList.push(spotInfo);
        })
      })
      getRandomHotel().then((res) => {
        const backImg = '/dev-api' + res.data.coverImg;
        const hotelBack = document.getElementById('hotelBack');
        hotelBack.style.backgroundImage = `url(${backImg})`;
        this.hotelCard.name = res.data.hotelName;
        this.hotelCard.id = res.data.id;
      })
      listSpot().then((res) => {
        this.spotList = res.rows;
        console.log(this.spotList, this.spotList[0]);
      })
    },
    scrollToMain(selector) {
      const targetElement = document.querySelector(selector)
      const offsetTop = targetElement.offsetTop
      this.$nextTick(() => {
        this.$emit('scrollTo', offsetTop);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .Navbar {
  scroll-snap-align: start;
}
::v-deep .Navbar {
  .el-menu {
    background-color: transparent;
  }
  .el-menu:hover {
    background-color: #FFFFFF;
  }
}
::v-deep .footer {
  margin-top: 10px;
  scroll-snap-align: start;
}
.coverImg {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin-top: -60px;
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    font-size: 56px;
    font-weight: 700;
    font-family: 华文行楷;
    color: #FFFFFF;
    text-shadow: 2px 2px 2px #666666;
    opacity: 0.95;
  }
  .el-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 80%);
    background-color: transparent;
    font-size: 24px;
    color: #FFFFFF;
    text-shadow: 1px 1px 1px #666666;
    border-radius: 20px;
    border: 1px solid #eeeeee;
  }
}
.carouselContainer {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 640px;
  scroll-snap-align: start;
  border-bottom: 1px solid #eeeeee;
  .releaseDate {
    position: absolute;
    top: 30px;
    left: 435px;
    z-index: 10;
    font-family: "Microsoft Yahei";
    line-height: 1.2;
    color: #FFFFFF;
    text-shadow: 1px 1px 1px #333333;
    .day {
      font-size: 42px;
    }
    .date {
      font-size: 28px;
    }
  }
  .title {
    position: absolute;
    top: 60px;
    left: 435px;
    z-index: 10;
    font-family: "Microsoft Yahei";
    font-size: 32px;
    line-height: 1.2;
    color: #FFFFFF;
    text-shadow: 1px 1px 1px #333333;
  }
  .spotName {
    position: absolute;
    top: 550px;
    left: 500px;
    z-index: 10;
    font-family: "Microsoft Yahei";
    font-size: 48px;
    font-weight: bold;
    line-height: 1.2;
    color: #FFFFFF;
    margin: 0;
    text-shadow: 1px 1px 1px #333333;
  }
  .foreignName {
    position: absolute;
    top: 605px;
    left: 500px;
    z-index: 10;
    font-family: "Microsoft Yahei";
    font-size: 26px;
    font-weight: bold;
    line-height: 1.2;
    color: #eeeeee;
    opacity: 0.9;
    margin: 0;
    text-shadow: 1px 1px 1px #333333;
  }
}
.el-carousel {
  position: absolute;
  top: 2px;
  left: 0px;
  width: 100%;
  overflow: hidden;
}
.navigation {
  width: 100vw;
  height: 120px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #eeeeee;
  .navContainer {
    width: 800px;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .el-card {
      position: relative;
      cursor: pointer;
      width: 120px;
      height: 60px;
      span {
        position: absolute;
        top: 5px;
        left: 10px;
        font-size: 16px;
        font-weight: bold;
        color: #333333;
        text-shadow: 1px 1px 1px #999999;
        z-index: 1;
      }
      img {
        position: absolute;
        top: 5px;
        right: 0;
      }
      .svgTick {
        position: absolute;
        top: 15px;
        left: 5px;
      }
      .userSvg {
        position: absolute;
        top: 17px;
        left: 5px;
      }
    }
    #tick {
      stroke-dasharray: 210px;
      stroke-dashoffset: 210px;
    }
    .spot:hover #tick {
      stroke-dasharray: 210px;
      stroke-dashoffset: 210px;
      animation: 2s tick ease-in-out;
      animation-fill-mode: forwards;
    }
    .hotel:hover #tick {
      stroke-dasharray: 210px;
      stroke-dashoffset: 210px;
      animation: 2s tick ease-in-out;
      animation-fill-mode: forwards;
    }
    .route:hover #tick {
      stroke-dasharray: 210px;
      stroke-dashoffset: 210px;
      animation: 2s tick ease-in-out;
      animation-fill-mode: forwards;
    }
    .write:hover #tick {
      stroke-dasharray: 210px;
      stroke-dashoffset: 210px;
      animation: 2s tick ease-in-out;
      animation-fill-mode: forwards;
    }
    .userInfo:hover #tick {
      stroke-dasharray: 210px;
      stroke-dashoffset: 210px;
      animation: 2s tick ease-in-out;
      animation-fill-mode: forwards;
    }
    @keyframes tick {
      0%, 50% {
        stroke-dashoffset: 210px;
      }
      50%, 100% {
        stroke-dashoffset: 0px;
      }
    }
    ::v-deep .el-card__body {
      padding: 0;
    }
  }
}
.webInfoContainer {
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  background-image: linear-gradient( 174.2deg,  rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4% );
  .cardContainer {
    height: 100vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .rotateCard {
      width: 300px;
      height: 400px;
      position: relative;
      perspective: 1000px;
      font-family: "Microsoft YaHei";
      color: #FFFFFF;
      line-height: 1.2;
      font-weight: 700;
      text-shadow: 1px 1px 1px #333333;
    }
    .spotCover, .spotBack, .routeCover, .routeBack, .hotelCover, .hotelBack {
      width: 100%;
      height: 100%;
      position: absolute;
      backface-visibility: hidden;
      transition: transform .25s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 42px;
      border-radius: 5px;
      box-shadow: 0 2px 5px #999999;
    }
    .spotCover {
      transform: rotateY(0deg);
    }
    .rotateCard:hover .spotCover {
      transform: rotateY(180deg);
    }
    .spotBack {
      position: relative;
      background-size: auto 400px;
      background-position: center 50%;
      transform: rotateY(-180deg);
    }
    .rotateCard:hover .spotBack {
      transform: rotateY(0deg);
    }
    .routeCover {
      transform: rotateY(0deg);
    }
    .rotateCard:hover .routeCover {
      transform: rotateY(180deg);
    }
    .routeBack {
      position: relative;
      background-size: auto 400px;
      background-position: center 50%;
      transform: rotateY(-180deg);
    }
    .rotateCard:hover .routeBack {
      transform: rotateY(0deg);
    }
    .hotelCover {
      transform: rotateY(0deg);
    }
    .rotateCard:hover .hotelCover {
      transform: rotateY(180deg);
    }
    .hotelBack {
      position: relative;
      background-size: auto 400px;
      background-position: center 50%;
      transform: rotateY(-180deg);
    }
    .rotateCard:hover .hotelBack {
      transform: rotateY(0deg);
    }
    .cardName {
      position: absolute;
      bottom: 5px;
      right: 10px;
    }
  }
}
.spotInfoContainer {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(176,229,208,1) 42%, rgba(92,202,238,0.41) 93.6% );
  .spotContainer {
    width: 1220px;
    margin-top: 200px;
    .card-row {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 200px;
      margin-bottom: 30px;
    }
    .card-row2 {
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      height: 200px;
      margin-bottom: 20px;
    }
    .card {
      position: relative;
      width: calc(33.3% - 10px);
      height: 200px;
      box-sizing: border-box;
      img {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
      }
      span {
        position: absolute;
        bottom: 5px;
        right: 5px;
        margin: 0;
        line-height: 1.2;
        font-size: 32px;
        font-family: "Microsoft YaHei";
        font-weight: 700;
        color: #FFFFFF;
        text-shadow: 1px 1px 1px #333333;
        z-index: 1;
      }
    }
    ::v-deep .el-card__body {
      padding: 0;
    }
    ::v-deep .el-card {
      border: 0;
    }
  }
  h1 {
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 42px;
    font-weight: 700;
    font-family: 华文行楷;
    color: #eeeeee;
    text-shadow: 2px 2px 2px #666666;
    opacity: 0.95;
  }
}
.childDIV {
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
}
::v-deep .app {
  overflow: hidden !important;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
</style>
