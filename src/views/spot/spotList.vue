<template>
  <div class="spotCardContainer">
    <el-row>
      <el-col :span="24">
        <el-card v-for="(item, index) in spotList" :key="index" style="margin: 20px auto; width: 1050px;">
          <div>
            <h1>{{ item.id }}</h1>
            <h2>{{ item.spotName }}</h2>
            <p>{{ item.location }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {listSpot} from "@/api/spot/spot";

export default {
  data() {
    return {
      spotList: [],
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      listSpot(this.queryParams).then(response => {
        this.spotList = response.rows;
        this.total = response.total;
        this.loading = false;
        console.log(this.spotList);
      });
    },
  }
}
</script>

<style>

</style>
