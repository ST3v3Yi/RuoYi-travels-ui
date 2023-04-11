<template>
  <!-- 地图容器 -->
  <div id="container" ref="map">

  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'; //引入
export default {
  name: 'GaoDeMap',
  data() {
    return {
      map: null,
      // 父组件传来的景区坐标
      position: {
        type: Array,
        default: () => [116.397455, 39.909187]
      }
    }
  },
  mounted() {
    //挂载阶段调用，DOM初始化完成进行地图初始化
    this.initMap();
  },
  methods: {
    initMap() {
      if (isNaN(this.position[0]) || isNaN(this.position[1])) {
        console.error('Invalid coordinates: ', this.position);
        return;
      }
      AMapLoader.load({
        key: "495c45794a46eeb8266de55951d30f7a", //此处填入我们注册账号后获取的Key
        version: "2.0", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [''], //需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.map = new AMap.Map(this.$refs.map, { //设置地图容器id
          viewMode: "2D", //是否为3D地图模式
          zoom: 14, //初始化地图级别
          center: this.position, //初始化地图中心点位置
        });
        console.log(this.position);
        const traffic = new AMap.TileLayer.Traffic({
          'autoRefresh': true,     //是否自动刷新，默认为false
          'interval': 180,         //刷新间隔，默认180s
        });
        this.map.add(traffic);
        traffic.show();
      }).catch(e => {
        console.log(e);
      })
    }
  },
  beforeDestroy() {
    // 销毁地图
    this.map.destroy();
  }
}
</script>

<style lang="scss" scoped>
#container {
  width: 80%;
  height: 400px;
  margin: 100px auto;
  border: 2px solid #333333;
}
.custom-content-marker {
  position: relative;
  width: 35px;
  height: 40px;
  .el-icon-location:before {

  }
}

</style>
