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
      :preview-src-list="[imageUrl]">
    </el-image>
  </div>
</template>

<script>
export default {
  data() {
    return{
      imageUrl: '',
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
    }
  },
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
