<template>
  <div style="display: flex; justify-content: center;">
    <div style="width: 1050px;">
      <h1>测试页面</h1>
      <h2>Current time: <strong style="font-size: 48px; font-weight: bold; color: #1ab394;">{{ currentTime }}</strong></h2>
      <h3>测试Test</h3>
      <h3>Here: {{ testContent }}</h3>
    </div>
  </div>
</template>

<script>
import {getFeasibility} from "@/api/travels/rooms";

export default {
  data() {
    return {
      currentTime: null,
      testContent: null,
      data: {
        roomNumber: 2,
        peopleNumber: 4
      }
    }
  },
  mounted() {
    this.getTest();
  },
  created() {
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    }, 1000);
  },
  methods: {
    getTest() {
      getFeasibility(this.data).then((res) => {
        this.testContent = res.data;
        console.log(res.data);
      })
    }
  }
}
</script>

<style>

</style>
