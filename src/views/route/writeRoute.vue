<template>
  <div>
    <div class="coverImg">
      <div class="uploadContainer">
        <el-upload
          class="uploadCoverImg"
          v-model="uploadImg"
          v-show="showUpload"
          drag
          :action="uploadImgUrl"
          :on-success="handleUploadSuccess"
          :before-upload="handleBeforeUpload"
          :limit="limit"
          :on-error="handleUploadError"
          :on-exceed="handleExceed"
          :on-remove="handleDelete"
          :show-file-list="true"
          :headers="headers"
          :file-list="fileList"
          :class="{hide: this.fileList.length >= this.limit}"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过15MB</div>
        </el-upload>
        <el-dialog
          class="imgCropDialog"
          title="图片裁剪"
          :visible.sync="dialogVisible"
          :show-close="false"
          :close-on-click-modal="false"
          :before-close="beforeClose">
          <img :src="dialogImageUrl">
          <canvas ref="canvas"></canvas>
          <div slot="footer">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="confirmUpload">确定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-image
        class="backgroundImg"
        :src="imageUrl"
        >
      </el-image>
    </div>
    <div class="inputContainer">
      <div>
        <el-button type="danger" icon="el-icon-delete" circle class="imgDel" @click="coverDel" v-show="showDelButton"></el-button>
      </div>
      <div class="titleContainer">
        <el-input class="titleInput" v-model="title" placeholder="请输入游记名称"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { getToken } from "@/utils/auth";
export default {
  props: {
    value: [String, Object, Array],
    // 图片数量限制
    limit: {
      type: Number,
      default: 1,
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 15,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ["png", "jpg", "jpeg"],
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      number: 0,
      uploadList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      hideUpload: false,
      baseUrl: process.env.VUE_APP_BASE_API,
      uploadImgUrl: process.env.VUE_APP_BASE_API + "/common/upload", // 上传的图片服务器地址
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      fileList: [],
      imageUrl: require('@/assets/images/coverImg-background.jpg'),
      title: '',
      uploadImg: '',
      showUpload: true,
      showDelButton: false,
      image: null,
      cropper: null,
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(',');
          // 然后将数组转为对象数组
          this.fileList = list.map(item => {
            if (typeof item === "string") {
              if (item.indexOf(this.baseUrl) === -1) {
                item = { name: this.baseUrl + item, url: this.baseUrl + item };
              } else {
                item = { name: item, url: item };
              }
            }
            return item;
          });
        } else {
          this.fileList = [];
          return [];
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
  },
  methods: {
    // 上传前loading加载
    handleBeforeUpload(file) {
      let isImg = false;
      if (this.fileType.length) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        isImg = this.fileType.some(type => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
      } else {
        isImg = file.type.indexOf("image") > -1;
      }

      if (!isImg) {
        this.$modal.msgError(`文件格式不正确, 请上传${this.fileType.join("/")}图片格式文件!`);
        return false;
      }
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$modal.msgError(`上传图片大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            this.image = new Image()
            this.image.src = reader.result.toString()
            this.dialogImageUrl = this.image.src
            // 未装载到DOM中的原因是应当弹出一个el-dialog来装载相应的图片，进而进行裁剪【4月3日解决】
            // 目前的想法是在img.onload前将其装在到一个el-dialog中，让我们尝试看看
            console.log('Before creating Cropper object, img is in the DOM:', document.body.contains(this.image))
            console.log(this.image.src)
            this.image.onload = () => {
              // 显示裁剪窗口
              this.dialogVisible = true;
            }
          }
        })
      }
      return false;
    },
    // 销毁Cropper对象
    beforeClose(done) {
      this.cropper.destroy()
      this.cropper = null
      done()
    },
    // 关闭dialog
    closeDialog() {
      this.dialogVisible = false;
    },
    // 获取裁剪后的图片数据
    confirmUpload() {
      // 创建 Cropper 对象
      this.cropper = new Cropper(this.image, {
        aspectRatio: 3,
        viewMode: 1,
        crop: () => {
          // 裁剪完的回调函数
          const canvas = this.cropper.getCroppedCanvas({
            width: 1920,  // 裁剪后图片的宽度
            height: 640   // 裁剪后图片的高度
          })
          canvas.toBlob(blob => {
            // 将裁剪后的图片传递给后台进行上传操作
            const formData = new FormData()
            formData.append('file', blob)
            // TODO: 调用上传接口上传formData
            this.dialogVisible = false
          }, 'image/jpeg')
        }
      })
      this.$modal.loading("正在上传图片，请稍候...");
      this.number++;
    },
    // 文件个数超出
    handleExceed() {
      this.$modal.msgError(`上传文件数量不能超过 ${this.limit} 个!`);
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      if (res.code === 200) {
        this.uploadList.push({ name: res.fileName, url: res.fileName });
        this.uploadedSuccessfully();
      } else {
        this.number--;
        this.$modal.closeLoading();
        this.$modal.msgError(res.msg);
        this.$refs.imageUpload.handleRemove(file);
        this.uploadedSuccessfully();
      }
    },
    // 删除图片
    handleDelete(file) {
      const findex = this.fileList.map(f => f.name).indexOf(file.name);
      if(findex > -1) {
        this.fileList.splice(findex, 1);
        this.$emit("input", this.listToString(this.fileList));
      }
    },
    // 上传失败
    handleUploadError() {
      this.$modal.msgError("上传图片失败，请重试");
      this.$modal.closeLoading();
    },
    // 上传结束处理
    uploadedSuccessfully() {
      if (this.number > 0 && this.uploadList.length === this.number) {
        this.fileList = this.fileList.concat(this.uploadList);
        this.uploadList = [];
        this.number = 0;
        this.$emit("input", this.listToString(this.fileList));
        this.$modal.closeLoading();
        this.imageUrl = '/dev-api' + this.fileList[0].url;
        this.showUpload = false;
        this.showDelButton = true;
      }
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = "";
      separator = separator || ",";
      for (let i in list) {
        if (list[i].url) {
          strs += list[i].url.replace(this.baseUrl, "") + separator;
        }
      }
      return strs != '' ? strs.substr(0, strs.length - 1) : '';
    },
    coverDel() {
      this.handleDelete(this.fileList[0]);
      this.imageUrl = require('@/assets/images/coverImg-background.jpg');
      this.showUpload = true;
      this.showDelButton = false;
    }
  }
}
</script>

<style lang="scss">
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
.imgCropDialog {
  width: 1280px;
  height: 800px;
  overflow: auto;
  .img {
    display: block;
    max-width: 1280px;
    max-height: 720px;
  }
}
.inputContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.titleContainer {
  margin-top: -70px;
}
.imgDel {
  position: absolute;
  top: -110px;
  left: 500px;
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
