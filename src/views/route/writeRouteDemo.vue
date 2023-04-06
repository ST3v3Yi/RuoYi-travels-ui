<template>
  <div>
    <div class="coverImgContainer">
      <div class="uploadButton" v-show="uploadShow" @click="editCropper()">
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
              :outputSize="options.outputSize"
              :fixed="options.fixed"
              :fixedNumber="options.fixedNumber"
              :infoTrue="options.infoTrue"
              :full="options.full"
              :centerBox="options.centerBox"
              :enlarge="options.enlarge"
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
      <img :src="image" class="coverImg" />
    </div>
    <div class="inputContainer">
      <div class="changeImgButton">
        <el-button
          type="danger"
          icon="el-icon-refresh"
          class="changeImg"
          @click="changeImg"
          v-show="showButton">
          更换封面图</el-button>
      </div>
      <div class="titleContainer">
        <el-input class="titleInput" v-model="title" placeholder="请输入游记名称"></el-input>
      </div>
    </div>
    <div class="editorContainer">
      <div class="editorWrapper">
        <div class="contentEditor">
          <h2>内容编辑</h2>
          <div ref="editor">
            <div class="ql-editor"></div>
            <div class="ql-blank"></div>
          </div>
          <div class="buttonContainer">
            <el-button>取消</el-button>
            <el-button>保存</el-button>
            <el-button>发布</el-button>
          </div>
          <el-container>
            <el-footer class="footer">
              Footer
            </el-footer>
          </el-container>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
import {debounce} from "@/utils";
import { uploadCoverImg } from "@/api/route/route";
import { getToken } from "@/utils/auth";
import Quill from 'quill';
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
      // 是否显示upload组件
      uploadShow: true,
      options: {
        img: '',
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 600, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        outputType:"png", // 默认生成截图为PNG格式
        outputSize: 1,
        fixed: true,
        fixedNumber: [3, 1],  //截图框宽高比
        infoTrue: true,
        full: false,
        centerBox: true,
        enlarge: 3.2
      },
      previews: {},
      image: require('@/assets/images/coverImg-background.jpg'),
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      title: '',
      showButton: false,
      editor: null,
      content: '',
      containerHeight: null,
    }
  },
  mounted() {
    this.quill = new Quill(this.$refs.editor, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', { 'script': 'sub' }, { 'script': 'super' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'align': [] }, { 'indent': '-1' }, { 'indent': '+1' }, { 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          ['link', 'image'],
        ]
      }
    });

    // 计算并设置容器高度
    this.quill.on('text-change', this.calculateContainerHeight);
    window.addEventListener('resize', this.calculateContainerHeight);
    this.calculateContainerHeight();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateContainerHeight);
  },
  methods: {
    calculateContainerHeight() {
      const editorWrapper = document.querySelector('.editorWrapper');
      const editorHeight = editorWrapper.clientHeight;
      const contentHeight = this.quill.root.scrollHeight;
      console.log('editorHeight:' + editorHeight);
      console.log('contentHeight:' + contentHeight);
      const newHeight = Math.max(editorHeight, contentHeight);
      if (newHeight > editorHeight) {
        editorWrapper.style.height = newHeight + 'px';
      }
    },
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
        console.log(formData);
        uploadCoverImg(formData).then(response => {
          this.open = false;
          this.options.img = process.env.VUE_APP_BASE_API + response.imgUrl;
          this.image = this.options.img
          this.visible = false;
          this.openDialog = false;
          this.uploadShow = false;
          this.showButton = true;
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
    },
    changeImg() {
      this.openDialog = true;
    }
  }
}
</script>

<style lang="scss" scoped>
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
}
.uploadButton:hover{
  font-weight: bold;
  .uploadIcon {
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
.inputContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 3;
}
.titleContainer {
  margin-top: -70px;
}
.changeImg {
  position: absolute;
  top: -110px;
  left: 475px;
}
.titleInput {
  width: 980px;
}
.titleInput:focus {
  outline: 10px solid #1ab394;
}
.el-input--medium ::v-deep .el-input__inner {
  height: 62px;
  font-size: 18px;
  border-radius: 0px;
  padding: 10px;
}
.editorWrapper {
  display: flex;
  justify-content: center;
  height: 350px;
}
.contentEditor {
  width: 1050px;
  height: 100%;
}
.buttonContainer {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.ql-editor {
  min-height: 100%;
  overflow-y: hidden;
}
</style>
