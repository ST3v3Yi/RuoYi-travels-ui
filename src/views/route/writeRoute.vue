<template>
  <div>
    <div class="coverImg">
      <div class="uploadContainer">
        <el-upload
          class="uploadCoverImg"
          drag
          action=""
          @change="handleUploadSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传封面图片</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
        </el-upload>
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
  </div>
</template>

<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
  data() {
    return {
      imageUrl: require('@/assets/images/coverImg-background.jpg'),
      title: '',
    }
  },
  mounted() {

  },
  methods: {
    handleUploadSuccess() {

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
