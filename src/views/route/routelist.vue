<template>
  <el-row>
    <el-col :span="24">
      <el-card v-for="(item, index) in routeList" :key="index" style="margin: 25px;">
        <div style="display: flex;">
          <image-preview :src="item.coverImg" :width="240" :height="180" style="margin-right: 10px;" />
          <div style="flex: 1; height: 180px; overflow: hidden; text-overflow: ellipsis; padding: 10px 20px;">
            <h2>{{ item.title }}</h2>
            <p>{{ item.introduction }}</p>
          </div>
        </div>
        <div class="bottom clearfix">
          <time class="time">{{ item.releaseTime }}</time>
          <el-button type="text" class="button">
<!--            <router-link :to="{ path: '/newslistdetail/:id', query: { id: item.id } }">查看详情 </router-link>-->
            <router-link :to="{ path: '/'}">查看详情 </router-link>
          </el-button>

        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { listRoute } from "@/api/route/route";

export default {
  data() {
    return {
      routeList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true;
      listRoute(this.queryParams).then(response => {
        this.routeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    }
  }
}
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
  margin-left: 10px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
  margin-right: 10px;
  margin-bottom: 10px;
}

.el-card__body {
  padding-right: 20px;
  height: 220px;
  margin-bottom: 20px;
}
</style>
