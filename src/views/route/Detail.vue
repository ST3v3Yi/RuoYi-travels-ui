<template>
  <Layout>
    <div class="routeDetail-container">
      <routeDetail />
    </div>
    <template v-slot="left">
      <div class="routeToc-container">
        <routeTOC />
      </div>
    </template>
  </Layout>
</template>

<script>
import { getRoute } from "@/api/route/route";
import routeDetail from "@/views/components/route/routeDetail.vue";
import routeToc from "@/views/components/route/routeTOC.vue";
import Layout from "@/components/Layout";
export default{
  component: {
    Layout,
    routeDetail,
    routeToc
  },
  data( ){
    return{
      route: {}
    };
  },
  mounted() {
    this.getRouteDetail();
  },
  methods: {
    getRouteDetail() {
      const id = this.$route.query.id;
      getRoute(id).then((res) => {
        this.route = res;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.routeDetail-container {
  height: 100%;
  overflow-y: scroll;
  padding: 20px 15px;
  box-sizing: border-box;
}

.routeToc-container {
  width: 300px;
  height: 100%;
  padding: 20px 15px;
  box-sizing: border-box;
}

</style>
