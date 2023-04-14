<template>
  <div class="Container">
    <div class="headerImg">
      <el-carousel :interval="5000" :height="bannerHeight + 'px'" arrow="hover">
        <el-carousel-item v-for="(item, index) in spotList" :key="index">
          <el-image :src="'/dev-api' + item.coverImg" style="width: 100%; height: 640px" />
          <h1 class="spotName">{{ item.spotName }}</h1>
          <h3 class="spotForeignName">{{ item.spotForeignName }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="spotCardContainer">
      <el-card v-for="(item, index) in spotList" :key="index" style="margin: 20px auto; width: 1050px;">
        <div>
          <el-row>
            <el-col :span="6">
              <img :src="'/dev-api' + item.coverImg" style="width: 240px; height: 180px; border-radius: 5px"/>
            </el-col>
            <el-col :span="18">
              <router-link :to="{ path: '/spotDetail/:id', query: { id: item.id } }">
                <h2>{{ item.spotName }}</h2>
              </router-link>
              <p>{{ item.location }}</p>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {listSpot} from "@/api/spot/spot";

export default {
  data() {
    return {
      spotList: [],
      screenWidth: 0,
      bannerHeight: 0,
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
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.Container {

}
.headerImg {
  position: relative;
  width: 1920px;
  height: 640px;
  margin-top: -60px;
  background-color: #1ab394;
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
    position: absolute;
    top: 580px;
    left: 500px;
    z-index: 999;
    font-family: "Microsoft YaHei UI";
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    color: #FFFFFF;
    text-shadow: 2px 2px 2px #000000;
  }
}
.spotCardContainer {

}
</style>
