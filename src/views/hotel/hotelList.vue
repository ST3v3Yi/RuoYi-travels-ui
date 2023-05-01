<template>
  <el-row>
    <el-col :span="24">
      <el-card v-for="(item, index) in hotelList" :key="index" style="margin: 25px;">
        <router-link :to="{ path: '/hotelDetail/:id', query: { id: item.id } }">
          <div>
            <h1>{{item.hotelName}}</h1>
          </div>
        </router-link>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { listHotel } from '@/api/hotel/hotel'
export default {
  data() {
    return {
      hotelList: [],
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      listHotel(this.queryParams).then(res => {
        this.hotelList = res.rows;
        this.total = res.total;
        this.loading = false;
      })
    }
  }
}
</script>

<style>

</style>
