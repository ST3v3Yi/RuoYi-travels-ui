<template>
  <div class="coverImg">
    <div class="uploadContainer">
      <el-upload
        class="uploadCoverImg"
        drag
        :before-upload="beforeUpload"
        :on-success="handleUploadSuccess"
        :show-file-list="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传封面图片</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
      </el-upload>
    </div>
    <el-image
      class="backgroundImg"
      :src="imageUrl"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      :preview-src-list="[imageUrl]"
      ref="image"
      v-show="uploadedImage">
    </el-image>
  </div>
</template>

<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
  data() {
    return{
      imageUrl: require('@/assets/images/coverImg-background.jpg'),
      uploadedImage: false,
      cropper: null
    }
  },
  mounted() {
    this.setElementWidth();
    window.addEventListener('resize', this.setElementWidth);
  },
  methods: {
    setElementWidth() {
      const width = window.innerWidth;
      const height = width / 3;
      const element = document.querySelector('.coverImg');
      element.style.width = `${width}px`;
      element.style.height = `${height}px`;
    },
    beforeUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error('上传封面图片大小不能超过 5MB!');
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
        this.uploadedImage = true;
        this.initCropper();
      };
      reader.readAsDataURL(file);
      return false; // 阻止自动上传
    },
    handleUploadSuccess() {
      // 上传成功后的回调
    },
    initCropper() {
      if (this.cropper) {
        this.cropper.destroy();
      }
      this.$nextTick(() => {
        this.cropper = new Cropper(this.$refs.image.$el, {
          aspectRatio: 1920 / 640,
          viewMode: 1,
          zoomable: false,
          background: false,
          cropBoxResizable: false,
          autoCropArea: 1,
          ready: () => {
            this.cropper.setCropBoxData({
              width: 1920,
              height: 640
            });
          }
        });
      });
    },
    cropImage() {
      if (this.cropper) {
        const croppedCanvas = this.cropper.getCroppedCanvas({
          width: 1920,
          height: 640
        });
        this.imageUrl = croppedCanvas.toDataURL();
      }
    }
  },
  beforeDestroy() {
    if (this.cropper) {
      this.cropper.destroy();
    }
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
  z-index: 0;
}
</style>
