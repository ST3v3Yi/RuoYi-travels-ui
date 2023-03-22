<template>
<!--  <div class="routeDetail">
    <h1>{{ route.title }}</h1>
    <div class="aside">
      <span>日期：{{route.releaseTime}}</span>
      <span>作者：{{route.userName}}</span>
    </div>
    <image-preview :src="route.coverImg" :width="200" :height="180" style="margin-left: 20px;" />
    <div class="routeContent" v-html="route.content"></div>
  </div>-->
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col class="bgCol">
        <div class="coverImg-container bg-purple">
          <image-preview :src="route.coverImg" style="width: 100%; height: 100%;" />
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-title" justify="center">
      <el-col style="width: 550px; height: 105px" class="bg-trans">
        <div style="position: relative">
          <span style="margin-left: 15px;margin-top: 25px;">更新时间：{{ parseTime(route.updateTime, '{y}-{m}-{d}') }}</span>
          <h1 style="margin-left: 15px;font-size: 48px; line-height: 15px;">{{ route.title }}</h1>
        </div>
      </el-col>
      <el-col style="width: 500px; height: 105px" class="bg-trans">
        <div class="headRight">
          <a href="/">
            <img :src="avatar" class="user-avatar">
          </a>
          <a style="margin-left: 10px;">{{ nickName }}</a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getRoute } from "@/api/route/route";
import { mapGetters } from 'vuex'
import {parseTime} from "../../utils/ruoyi";
export default{
  computed: {
    ...mapGetters([
      'nickName',
      'avatar',
    ])
  },
  data( ){
    return{
      route: {},
    };
  },
  mounted() {
    this.getRouteDetail();
  },
  methods: {
    parseTime,
    getRouteDetail() {
      const id = this.$route.query.id;
      getRoute(id).then((res) => {
        this.route = res.data;
      });
    },
  }
};
</script>

<style lang="scss" scoped>
/*.routeDetail {
  height: auto;
  h1 {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 0px;
    margin-left: 20px;
  }
  .aside {
    margin-left: 10px;
    margin-bottom: 20px;
    span {
      font-size: 14px;
      color: #666666;
      margin-left: 5px;
    }
  }
  p {
    font-size: 18px;
    line-height: 1.5;
    margin-left: 20px;
  }
  .routeContent {
    overflow: auto;
    line-height: 1.5;
    margin-left: 20px;
  }
}*/
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
/*.el-col {
  border-radius: 4px;
}*/
.bgCol {
  width: 1050px;
  height: 450px;
}
.coverImg-container {
  border-radius: 4px;
  width: 1050px;
  height: 450px;
  margin-top: 40px;
  text-align: center;
}
.bg-purple {
  background: #d3dce6;
}
.bg-trans {
  background: rgba(255,255,255,0.6);
  //background-color: #cccccc;
  //opacity: 60%;
}
.row-bg {
  padding: 10px 0;
  background-color: #FFFFFF;
}
.row-title {
  margin-top: -95px;
}
.headRight {
  padding: 15px 0 0 0px;
  position: relative;
  margin-left: 300px;
}
.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

</style>
