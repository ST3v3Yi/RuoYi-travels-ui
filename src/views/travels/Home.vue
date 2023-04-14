<template>
  <div class="carouselContainer">
    <el-carousel :height="bannerHeight + 'px'" :interval="6000" arrow="hover">
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <img :src="item" class="carousel-img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgList: [
          require("@/assets/banner1.jpeg"),
          require("@/assets/banner2.jpeg"),
          require("@/assets/banner3.jpeg"),
        ],
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
    },
    methods: {

    }
  }
</script>

<style>
.carouselContainer {
  position: relative;
  z-index: 1;
}
.el-carousel {
  position: absolute;
  top: 2px;
  left: 0px;
  width: 100%;
  overflow: hidden;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
