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
    <div class="routeInfoContainer">
      <div class="routeInfo">
        <el-form :inline="true" :model="infoForm" size="mini" label-width="80px" class="infoForm">
          <el-form-item prop="day">
            <template slot="label">
              <i class="el-icon-date" />
              天数
            </template>
            <input type="text" v-model="infoForm.day" oninput="value=value.replace(/[^0-9.]/g,'')" class="dayInput" />
          </el-form-item>
          <el-form-item prop="cost">
            <template slot="label">
              <i class="el-icon-s-finance" />
              花费
            </template>
            <input type="text" v-model="infoForm.cost" oninput="value=value.replace(/[^0-9.]/g,'')" class="costInput" />
          </el-form-item>
        </el-form>
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
            <el-button round @click="cancel">取消</el-button>
            <el-button type="warning" round @click="save">保存</el-button>
            <el-button type="primary" round @click="release">发布</el-button>
          </div>
        </div>
      </div>
    </div>
    <Footer style="margin-top: 180px;" />
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
import {debounce} from "@/utils";
import { uploadCoverImg, addRoute } from "@/api/route/route";
import { getToken } from "@/utils/auth";
import Footer from "@/layout/components/Footer.vue";
import {getUserProfile} from "@/api/system/user";
export default {
  components: {
    VueCropper,
    Footer
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
      containerHeight: null,
      content: '',
      quillContent: '',
      htmlContent: '',
      infoForm: {
        day: '',
        cost: ''
      },
      route: {
        title: null,
        coverImg: null,
        releaseTime: null,
        day: null,
        cost: null,
        userId: null,
        userName: null,
        introduction: null,
        content: null,
        isDeleted: null
      },
      currentTime: ''
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
          ['imageResize', 'imageDrop']
        ],
        imageDrop: true,        //图片拖拽
        imageResize: {          //放大缩小
          displayStyles: {
            backgroundColor: "black",
            border: "none",
            color: "white"
          },
          displaySize: {
            maxWidth: 750,
            maxHeight: null
          },
          modules: ['Resize', 'DisplaySize', 'Toolbar'],
        }
      }
    });

    // 计算并设置容器高度
    this.quill.on('text-change', this.calculateContainerHeight);
    window.addEventListener('resize', this.calculateContainerHeight);
    this.calculateContainerHeight();

    // 得到当前时间
    setInterval(() => {
      const date = new Date();
      const year = date.getFullYear().toString().slice(2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      const seconds = ('0' + date.getSeconds()).slice(-2);
      this.currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }, 1000);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateContainerHeight);
  },
  methods: {
    calculateContainerHeight() {
      const editorWrapper = document.querySelector('.editorWrapper');
      const editorHeight = editorWrapper.clientHeight;
      const contentHeight = this.quill.root.scrollHeight;
      const newHeight = Math.max(editorHeight, contentHeight);
      if (newHeight > editorHeight) {
        editorWrapper.style.height = newHeight + 'px';
      }
    },
    // 编辑封面图
    editCropper() {
      this.openDialog = true;
      getUserProfile().then((res) => {
        this.route.userId = res.data.userId;
        this.route.userName = res.data.nickName;
      })
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
          this.route.coverImg = response.imgUrl;
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
    },
    cancel() {
      this.$confirm('取消不会保存编辑内容, 点击确定前请先确认您已经进行了保存！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //点击确认
        this.$router.push('/routeList')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作~'
        });
      });
    },
    save() {
      this.quillContent = this.quill.getContents();
      this.htmlContent = this.quill.root.innerHTML;
      console.log(this.quill.root.innerHTML);
      console.log(this.quillContent);
    },
    release() {
      // 获取路线标题
      this.route.title = this.title;
      // 获取封面图URL
      // 【在uploadImg()中实现】
      // 获取发布时间
      this.route.releaseTime = this.currentTime;
      // 获取天数和花费
      this.route.day = this.infoForm.day;
      this.route.cost = this.infoForm.cost;
      // 获取当前用户信息
      // 【在editCropper()中实现】
      // 获取简介 —— 内容的前200个字符，多余的使用“...”替代
      const plainText = this.quill.getText();
      const limitedText = plainText.replace(/\n/g, ' ');
      this.route.introduction = limitedText.slice(0, 200) + (limitedText.length > 200 ? '...' : '');
      // 获取内容的HTML格式
      this.route.content = this.quill.root.innerHTML;
      // 发布状态，将is_deleted设置为 0
      this.route.isDeleted = 0;
      if (this.route.title == '') {
        this.$notify.error({
          title: '错误',
          message: '标题不可为空！'
        });
      }
      if (this.route.coverImg == null) {
        this.$notify.error({
          title: '错误',
          message: '封面图不可为空！'
        });
      }
      if (this.route.day == null) {
        this.$notify.error({
          title: '错误',
          message: '天数不可为空！'
        });
      }
      if (this.route.cost == null) {
        this.$notify.error({
          title: '错误',
          message: '花费不可为空！'
        });
      }
      addRoute(this.route).then((res) => {
        this.$notify({
          title: '成功',
          message: '成功发布路线攻略~',
          type: 'success'
        });
      })
      setTimeout(() => {
        this.$router.push(`/routeList`);
      }, 1000);
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
.routeInfoContainer {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  .routeInfo {
    width: 1050px;
    height: 50px;
  }
}
.el-form {
  margin-left: 700px;
}
::v-deep.el-form-item .el-form-item__label {
  font-size: 16px;
}
.el-form-item {
  margin-top: 10px;
  margin-left: 20px;
}
.dayInput {
  width: 60px;
  height: 30px;
  font-size: 14px;
  border-radius: 4px;
  padding: 2px;
  border: 1px solid #DCDFE6;
  color: #606266;;
}
.dayInput:focus {
  outline: none;
}
.costInput {
  width: 60px;
  height: 30px;
  font-size: 14px;
  border-radius: 4px;
  padding: 2px;
  border: 1px solid #DCDFE6;
  color: #606266;;
}
.costInput:focus {
  outline: none;
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
  border-radius: 4px;
  padding: 10px;
}
.editorWrapper {
  display: flex;
  justify-content: center;
  margin-top: -60px;
  height: 350px;
}
.contentEditor {
  width: 1050px;
  height: 100%;
}
.buttonContainer {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  .el-button {
    font-size: 18px;
  }
}
.ql-editor {
  min-height: 100%;
  overflow-y: hidden;
}
</style>
