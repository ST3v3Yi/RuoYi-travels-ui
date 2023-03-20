<template>
  <div class="routeDetail">
    <h1>{{ route.title }}</h1>
    <div class="aside">
      <span>日期：{{route.releaseTime}}</span>
      <span>作者：{{route.userName}}</span>
    </div>
    <image-preview :src="route.coverImg" :width="200" :height="180" style="margin-right: 10px;" />
    <div class="content" v-html="route.content"></div>
  </div>
</template>

<script>
import { getRoute } from "@/api/route/route";
export default{
  data( ){
    return{
      route: {},
    };
  },
  mounted() {
    this.getRouteDetail();
  },
  methods: {
    getRouteDetail() {
      const id = this.$route.query.id;
      getRoute(id).then((res) => {
        this.route = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.routeDetail {
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
}

</style>
