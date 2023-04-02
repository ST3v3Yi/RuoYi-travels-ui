<template>
  <div>
    <div class="coverImg">
      <div class="uploadContainer">
        <imageUpload class="uploadCoverImg" v-model="uploadImg" @upload-success="handleUploadSuccess" v-show="showUpload" />
      </div>
      <el-image
        class="backgroundImg"
        :src="imageUrl"
        >
      </el-image>
    </div>
    <div class="titleContainer">
      <el-input class="titleInput" v-model="title" placeholder="请输入游记名称"></el-input>
    </div>
    <img :src="coverUrl" />
  </div>
</template>

<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import imageUpload from '@/components/ImageUpload/upload.vue'
export default {
  data() {
    return {
      imageUrl: require('@/assets/images/coverImg-background.jpg'),
      title: '',
      uploadImg: '',
      coverUrl: '',
      showUpload: true,
    }
  },
  components: {
    imageUpload,
  },
  mounted() {

  },
  methods: {
    handleUploadSuccess(url) {
      this.imageUrl = '/dev-api' + url;
      this.showUpload = false;
      console.log(this.imageUrl);
    }
  }
}
</script>

<style>
.coverImg {
  position: relative;
  width: 100%;
  height: 640px;
}
.uploadContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.uploadCoverImg {
  position: relative;
  z-index: 1;
}
.backgroundImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.titleContainer {
  display: flex;
  justify-content: center;
  margin-top: -70px;
}
.titleInput {
  width: 980px;
}
.titleInput:focus {
  outline: 10px solid #1ab394;
}
.el-input--medium .el-input__inner {
  height: 62px;
  font-size: 18px;
  border-radius: 0px;
  padding: 10px;
}
</style>
