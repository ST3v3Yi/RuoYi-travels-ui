<template>
  <div class="test">
    <Layout>
      <template #left>
        <div class="left">左边区域</div>
      </template>
      <template>
        <div class="main">中间区域</div>
      </template>
      <template #right>
        <div class="right">右边区域</div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./";
export default {
  components: {
    Layout,
  },
};
</script>

<style lang="less" scoped>
.test{
  width: 70%;
  height: 600px;
  margin: 0 auto;
  border: 2px solid;
  .left{
    width: 200px;
    height: 100%;
    background: lightcoral;
  }
  .main{
    width: 100%;
    height: 100%;
    background: lightgreen;
  }
  .right{
    width: 150px;
    height: 100%;
    background: lightblue;
  }
}
</style>
