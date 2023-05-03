<template>
  <div style="display: flex; justify-content: center;">
    <div style="width: 1050px;">
      <h1>测试页面</h1>
      <h2>Current time: <strong style="font-size: 48px; font-weight: bold; color: #1ab394;">{{ currentTime }}</strong></h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: null,
    }
  },
  created() {
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    }, 1000);
  }
}
</script>

<style>

</style>
