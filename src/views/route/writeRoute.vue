<template>
  <div class="coverImg">
    <div class="uploadContainer">
      <el-upload
        class="uploadCoverImg"
        drag
        action="">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传封面图片</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
      </el-upload>
    </div>
    <el-image
      class="backgroundImg"
      :src="imageUrl"
      :preview-src-list="[imageUrl]"
      ref="image"
      >
    </el-image>
  </div>
</template>

<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
  data() {
    return {
      imageUrl: require('@/assets/images/coverImg-background.jpg')
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style>
.coverImg {
  position: relative;
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
</style>
