<template>
  <div class="coverImgContainer">
    <div class="uploadButton" @click="editCropper()">
      <p style="font-size: 20px; display: flex; align-items: center;"><i class="uploadIcon el-icon-upload"/>点击上传封面图</p>
    </div>
    <el-dialog title="背景图" :visible.sync="openDialog" width="1280px" append-to-body @opened="modalOpened"  @close="closeDialog">
      <el-row>
        <el-col :xs="24" :md="12" :style="{height: '600px'}">
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            :outputType="options.outputType"
            @realTime="realTime"
            v-if="visible"
          />
        </el-col>
        <el-col :xs="24" :md="12" :style="{height: '300px'}">
          <div class="uploadPreview">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :lg="2" :sm="3" :xs="3">
          <el-upload action="#" :http-request="requestUpload" :show-file-list="false" :before-upload="beforeUpload">
            <el-button size="small">
              选择
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </el-col>
        <el-col :lg="{span: 1, offset: 2}" :sm="2" :xs="2">
          <el-button icon="el-icon-plus" size="small" @click="changeScale(1)"></el-button>
        </el-col>
        <el-col :lg="{span: 1, offset: 1}" :sm="2" :xs="2">
          <el-button icon="el-icon-minus" size="small" @click="changeScale(-1)"></el-button>
        </el-col>
        <el-col :lg="{span: 2, offset: 6}" :sm="2" :xs="2">
          <el-button type="primary" size="small" @click="uploadImg()">提 交</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <img v-bind:src="options.img" title="点击上传头像" class="coverImg" />
  </div>
</template>

<script>
import store from "@/store";
import { VueCropper } from "vue-cropper";
import {debounce} from "@/utils";
import { uploadCoverImg } from "@/api/route/route"
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      // 是否显示对话框
      openDialog: false,
      // 是否显示Cropper
      visible: false,
      options: {
        img: require('@/assets/images/coverImg-background.jpg'), // 裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 600, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        outputType:"png" // 默认生成截图为PNG格式
      },
      previews: {},
    }
  },
  methods: {
    // 编辑封面图
    editCropper() {
      this.openDialog = true;
    },
    // 打开弹出层结束时的回调
    modalOpened() {
      this.visible = true;
      if (!this.resizeHandler) {
        this.resizeHandler = debounce(() => {
          this.refresh()
        }, 100)
      }
      window.addEventListener("resize", this.resizeHandler)
    },
    // 刷新组件
    refresh() {
      this.$refs.cropper.refresh();
    },
    // 覆盖默认的上传行为
    requestUpload() {
    },
    // 上传预处理
    beforeUpload(file) {
      if (file.type.indexOf("image/") == -1) {
        this.$modal.msgError("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.options.img = reader.result;
        };
      }
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    // 上传图片
    uploadImg() {
      this.$refs.cropper.getCropBlob(data => {
        let formData = new FormData();
        formData.append("coverImg", data);
        uploadCoverImg(formData).then(response => {
          this.open = false;
          this.options.img = process.env.VUE_APP_BASE_API + response.imgUrl;
          // store.commit('SET_AVATAR', this.options.img);
          this.$modal.msgSuccess("修改成功");
          this.visible = false;
        });
      });
    },
    // 实时预览
    realTime(data) {
      this.previews = data;
    },
    // 关闭窗口
    closeDialog() {
      this.options.img = require('@/assets/images/coverImg-background.jpg')
      this.visible = false;
      window.removeEventListener("resize", this.resizeHandler)
    }
  }
}
</script>

<style lang="scss">
.coverImgContainer {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 640px;
}
.uploadButton {
  position: relative;
  cursor: pointer;
  z-index: 2;
  .uploadIcon {
    font-size: 70px;
    margin-right: 10px;
    color: #666666;
  }
  .uploadIcon:hover {
    color: #000000;
  }
}
.coverImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.uploadPreview {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 200px;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}
</style>
