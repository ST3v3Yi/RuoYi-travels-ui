<template>
  <div class="Container">
    <Navbar class="Navbar" :activeIndex="'/spotList'"/>
    <div class="headerImg">
      <el-carousel :interval="5000" :height="bannerHeight + 'px'" arrow="hover">
        <el-carousel-item v-for="(item, index) in spotList" :key="index">
          <router-link :to="{ path: '/spotDetail/:id', query: { id: item.id } }">
            <el-image :src="'/dev-api' + item.coverImg" style="width: 100%; height: 640px" />
            <h1 class="spotName">{{ item.spotName }}</h1>
            <h3 class="spotForeignName">{{ item.spotForeignName }}</h3>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div style="display: flex;">
      <div class="spotCardContainer">
        <el-card
          v-for="(item, index) in spotList"
          :key="index"
          style="margin: 10px 0 10px 385px; width: 810px; height: 270px;">
          <router-link :to="{ path: '/spotDetail/:id', query: { id: item.id } }">
            <img :src="'/dev-api' + item.coverImg" style="width: 810px; height: 270px; border-radius: 5px"/>
            <div class="spotInfo">
              <h2>{{ item.spotName }}</h2>
              <h3>{{ item.spotForeignName }}</h3>
            </div>
          </router-link>
        </el-card>
      </div>
      <div class="aside">
        <!-- 今日景点推荐板块 -->
        <div class="SpotRec">
          <div class="spotRec" v-if="spotList && spotList[randomId]">
            <span class="spotRecTitle">今日景点推荐</span>
            <el-divider></el-divider>
            <router-link :to="{ path: '/spotDetail/:id', query: { id: spotList[randomId].id } }">
              <img
                :src="'/dev-api' + spotList[randomId].coverImg"
                style="width: 300px; height: 100px; margin-left: 15px; border-radius: 5px;"/>
              <div style="display: flex;">
                <span class="RecSpotName">{{ spotList[randomId].spotName }}</span>
                <el-rate
                  disabled
                  v-model="RecSpotValue"
                  :colors="colors"
                  class="RecRate"></el-rate>
              </div>
            </router-link>
          </div>
        </div>
        <!-- 路线推荐板块 -->
        <div class="RouteRec">
          <div class="routeRec">
            <span class="routeRecTitle">热门路线推荐</span>
            <el-divider></el-divider>
            <ul style="margin: 0; padding: 0;">
              <li style="list-style:none; position: relative; border-bottom: 1px dashed #ccc;">
                <span
                  style="position: absolute;
                  left: 5px;
                  top: 35px;
                  font-size: 18px;
                  font-weight: bold;
                  font-family: 华文隶书;">Top <strong style="color: #F44336">1</strong></span>
                <img :src="require('@/assets/banner1.jpeg')" style="width: 270px; height: 90px; margin-left: 50px; border-radius: 5px;" />
                <span
                  style="display: block;
                  margin-left: 50px;
                  font-size: 18px;
                  font-weight: bold;
                  color: #333333;
                  text-shadow: 2px 2px 2px #CCCCCC;
                  font-family: 华文行楷;">从百草园到三味书屋最多十五字啊</span>
              </li>
              <li style="list-style:none; position: relative; border-bottom: 1px dashed #ccc; margin-top: 5px;">
                <span
                  style="position: absolute;
                  left: 5px;
                  top: 35px;
                  font-size: 18px;
                  font-weight: bold;
                  font-family: 华文隶书;">Top <strong style="color: #FFC107">2</strong></span>
                <img :src="require('@/assets/banner2.jpeg')" style="width: 270px; height: 90px; margin-left: 50px; border-radius: 5px;" />
                <span
                  style="display: block;
                  margin-left: 50px;
                  font-size: 18px;
                  font-weight: bold;
                  color: #333333;
                  text-shadow: 2px 2px 2px #CCCCCC;
                  font-family: 华文行楷;">从百草园到三味书屋最多十五字啊</span>
              </li>
              <li style="list-style:none; position: relative; border-bottom: 1px dashed #ccc; margin-top: 5px;">
                <span
                  style="position: absolute;
                  left: 5px;
                  top: 35px;
                  font-size: 18px;
                  font-weight: bold;
                  font-family: 华文隶书;">Top <strong style="color: #4CAF50">3</strong></span>
                <img :src="require('@/assets/banner3.jpeg')" style="width: 270px; height: 90px; margin-left: 50px; border-radius: 5px;" />
                <span
                  style="display: block;
                  margin-left: 50px;
                  font-size: 18px;
                  font-weight: bold;
                  color: #333333;
                  text-shadow: 2px 2px 2px #CCCCCC;
                  font-family: 华文行楷;">从百草园到三味书屋最多十五字啊</span>
              </li>
              <li style="list-style:none; position: relative; border-bottom: 1px dashed #ccc; margin-top: 5px;">
                <span
                  style="position: absolute;
                  left: 5px;
                  top: 35px;
                  font-size: 18px;
                  font-weight: bold;
                  font-family: 华文隶书;">Top <strong style="color: #2196F3">4</strong></span>
                <img :src="require('@/assets/banner4.jpeg')" style="width: 270px; height: 90px; margin-left: 50px; border-radius: 5px;" />
                <span
                  style="display: block;
                  margin-left: 50px;
                  font-size: 18px;
                  font-weight: bold;
                  color: #333333;
                  text-shadow: 2px 2px 2px #CCCCCC;
                  font-family: 华文行楷;">从百草园到三味书屋最多十五字啊</span>
              </li>
              <li style="list-style:none; position: relative; border-bottom: 1px dashed #ccc; margin-top: 5px;">
                <span
                  style="position: absolute;
                  left: 5px;
                  top: 35px;
                  font-size: 18px;
                  font-weight: bold;
                  font-family: 华文隶书;">Top <strong style="color: #9C27B0">5</strong></span>
                <img :src="require('@/assets/banner5.jpeg')" style="width: 270px; height: 90px; margin-left: 50px; border-radius: 5px;" />
                <span
                  style="display: block;
                  margin-left: 50px;
                  font-size: 18px;
                  font-weight: bold;
                  color: #333333;
                  text-shadow: 2px 2px 2px #CCCCCC;
                  font-family: 华文行楷;">从百草园到三味书屋最多十五字啊</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 页脚 -->
    <Footer style="margin-top: 30px;"/>
  </div>
</template>

<script>
import {listSpot} from "@/api/spot/spot";
import Navbar from "@/layout/components/Navbar.vue";
import Footer from "@/layout/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      spotList: [],
      screenWidth: 0,
      bannerHeight: 0,
      randomId: null,
      RecSpotValue: 5,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],


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
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      listSpot(this.queryParams).then(response => {
        this.spotList = response.rows;
        this.total = response.total;
        this.loading = false;
        const randomIndex = Math.floor(Math.random() * this.spotList.length);
        this.randomId = randomIndex;
      });
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .Navbar {
  .el-menu {
    background-color: transparent;
  }
  .el-menu:hover {
    background-color: #FFFFFF;
  }
}
.headerImg {
  position: relative;
  width: 1920px;
  height: 641px;
  margin-top: -60px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .spotName {
    position: absolute;
    top: 520px;
    left: 500px;
    z-index: 999;
    font-family: "Microsoft YaHei UI";
    font-size: 48px;
    font-weight: 700;
    line-height: 1.2;
    color: #FFFFFF;
    text-shadow: 2px 2px 2px #000000;
  }
  .spotForeignName {
    position: relative;
    margin-left: 500px;
    margin-top: -35px;
    z-index: 999;
    font-family: "Times New Roman";
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    color: #eeeeee;
    text-shadow: 2px 2px 2px #000000;
  }
}
.spotCardContainer {
  .spotInfo {
    margin-top: -280px;
    margin-left: 540px;
    text-align: right;
    h2 {
      color: #333333;
      font-size: 30px;
      line-height: 2px;
      font-family: 华文行楷;
      font-weight: bold;
      text-shadow: 2px 2px 2px #CCCCCC;
      margin-right: 10px;
    }
    h3 {
      color: #333333;
      opacity: 90%;
      font-family: "Times New Roman";
      line-height: 2px;
      margin-right: 3px;
    }
    p {
      line-height: 2px;
    }
  }
  ::v-deep.el-card__body {
    padding: 0;
  }
}
.SpotRec {
  margin: 10px 0 0 50px;
  width: 330px;
  height: 175px;
  border-radius: 5px;
  background-color: #fffefd;
  box-shadow: 0 0 2px 0 #999999;
  .spotRec {
    width: 100%;
    height: 160px;
    margin-top: 10px;
    .spotRecTitle {
      font-size: 22px;
      font-weight: 500;
      font-family: "Microsoft YaHei UI";
      margin-left: 5px;
    }
    .el-divider--horizontal {
      width: 96%;
      margin: 5px 0 5px 2%;
    }
    .RecSpotName {
      font-size: 18px;
      color: #333333;
      font-weight: bold;
      margin-left: 15px;
    }
    .RecRate {
      margin-top: 5px;
      margin-left: 10px;
    }
  }
  .el-divider--horizontal {
    margin: 10px 0;
  }
  .RecRoute {
    h1 {
      font-size: 22px;
      font-weight: 500;
      font-family: "Microsoft YaHei UI";
      line-height: 10px;
      margin-left: 5px;
    }
    .el-divider--horizontal {
      width: 96%;
      margin: 5px 0 5px 2%;
    }
  }
}
.RouteRec {
  margin: 30px 0 0 50px;
  width: 330px;
  border-radius: 5px;
  background-color: #fffefd;
  box-shadow: 0 0 2px 0 #999999;
  .routeRec {
    width: 100%;
    .routeRecTitle {
      font-size: 22px;
      font-weight: 500;
      font-family: "Microsoft YaHei UI";
      margin-left: 5px;
    }
    .el-divider--horizontal {
      width: 96%;
      margin: 5px 0 5px 2%;
    }
  }
}
::v-deep .el-rate__icon{
  margin-right: 0;
}
</style>
