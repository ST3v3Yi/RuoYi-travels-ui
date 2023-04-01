<template>
  <div class="carouselContainer">
    <el-carousel height="640px" :interval="6000" arrow="hover">
      <el-carousel-item>
        <el-image
          :src="require('@/assets/banner1.jpeg')" fit="scale-down">
        </el-image>
      </el-carousel-item>
      <el-carousel-item>
        <el-image
          :src="require('@/assets/banner2.jpeg')" fit="scale-down">
        </el-image>
      </el-carousel-item>
      <el-carousel-item>
        <el-image :src="require('@/assets/banner3.jpeg')" fit="scale-down">
        </el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style>
.carouselContainer {
  position: relative;
  width: 100%;
  height: 500px;
  z-index: 1;
}
.el-carousel {
  position: absolute;
  top: 2px;
  left: 0px;
  width: 100%;
  height: 600px;
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
