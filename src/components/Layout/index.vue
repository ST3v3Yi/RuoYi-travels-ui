<template>
  <div class="Layout">
    <div class="left">
      <v-slot name="left"></v-slot>
    </div>
    <div class="main">
      <v-slot></v-slot>
    </div>
    <div class="right">
      <v-slot name="right"></v-slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.Layout{
  width: 100%;
  height: 100%;
  display: flex;
  .left, .right{
    flex: 0 0 auto;
    overflow: auto;
  }
  .main{
    flex: 1 1 auto;
    overflow: auto;
  }
}
</style>
