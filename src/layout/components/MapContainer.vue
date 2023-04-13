<template>
  <!-- 地图容器 -->
  <div style="display: flex;">
    <div id="mapContainer" ref="map">
    </div>
    <div class="table" style="width: 500px;">
      <div class="poiTitle">
        附近景点
      </div>
      <ul style="height: 200px; overflow-y: auto;">
        <li v-for="item in spotList" :key="item.id" style="list-style:none; vertical-align: middle;">
          <img :src="item.photos[0].url" style="width: 80px; height: 80px;"/>
          <span>{{ item.name }}</span>
          <el-button type="text">路线规划</el-button>
          <!--          @click="driving(item.entr_location.lng, item.entr_location.lat)"-->
          <el-divider></el-divider>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'; //引入
window._AMapSecurityConfig = {
  // 设置安全密钥
  securityJsCode: 'a156135194434c8ebd6e8d40e4f6209b',
}
export default {
  name: 'GaoDeMap',
  data() {
    return {
      map: null,
      center: [114.338707,34.810379],
      placeSearch: null,
      auto: null,
      spotList: [],
    }
  },
  mounted() {
    //挂载阶段调用，DOM初始化完成进行地图初始化
    this.initMap();
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "495c45794a46eeb8266de55951d30f7a", //此处填入我们注册账号后获取的Key
        version: "2.0", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.placeSearch",
          "AMap.ToolBar",
          "AMap.Driving",
          "AMap.Polyline"
        ], //需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        let _this = this;
        AMap.plugin("", function () {
          _this.map = new AMap.Map('mapContainer', { //设置地图容器id
            viewMode: "3D", //是否为3D地图模式
            zoom: 14, //初始化地图级别
            center: _this.center, //初始化地图中心点位置
          });
          const traffic = new AMap.TileLayer.Traffic({
            'autoRefresh': true,     //是否自动刷新，默认为false
            'interval': 180,         //刷新间隔，默认180s
          });
          _this.map.add(traffic);
          traffic.show();
          //在地图上显示工具条方法
          _this.map.addControl(new AMap.ToolBar({ //toolBar
            //这里可以添加自己想要的参数  ，上面有官方文档的链接
            position: 'RT', // 默认位置：LT:左上角;
            autoPosition: false, //是否自动定位  默认为false
            locate: false, //是否显示定位按钮，默认为 true
          }));
        })
      }).catch(e => {
        console.log(e);
      })
    },
    //   driving(lng, lat) {
    //     let data = this;
    //     console.log(name);
    //     this.initMap();
    //     window.onload = function() {
    //       AMap.plugin('AMap.Driving', function (){
    //         const driving = new AMap.Driving({
    //           // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
    //           policy: AMap.DrivingPolicy.LEAST_TIME,
    //           map: data.map
    //         })
    //         // const points = [
    //         //   { keyword: '清明上河园', city: '开封'},
    //         //   { keyword: name, city: '开封'}
    //         // ]
    //         // driving.search(points);
    //         const startLngLat = data.center;
    //         const endLngLat = [lng, lat];
    //         console.log(startLngLat, endLngLat);
    //         driving.search(startLngLat, endLngLat, function (status, result) {
    //           // 未出错时，result即是对应的路线规划方案
    //           console.log(result);
    //         })
    //       })
    //     }
    //   }
  },
  beforeDestroy() {
    // 销毁地图
    this.map.destroy();
  }
}
</script>

<style lang="scss" scoped>
#mapContainer {
  width: 500px;
  height: 400px;
  margin-left: 200px;
  margin-top: 20px;
  border: 2px solid #333333;
}
.custom-content-marker {
  position: relative;
  width: 35px;
  height: 40px;
  .el-icon-location:before {

  }
}
#panel {
  width: 100px;
  height: 200px;
}
</style>
