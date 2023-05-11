<template>
  <div class="Container">
    <div class="rowTop">
      <div class="CrumbContainer">
        <el-breadcrumb separator="/" class="BreadcrumbTop">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/spotList' }">景点</el-breadcrumb-item>
          <el-breadcrumb-item>{{ spot.spotName }}</el-breadcrumb-item>
        </el-breadcrumb>
        <img v-if="weather && weather.icon" :src="require('@/assets/weatherIcons/'+ weather.icon +'.png')" class="weatherIcon"/>
        <span style="font-size: 14px;">{{weather.text}}</span>
        <span style="margin-left: 15px; font-size: 14px;">{{weather.temp}}℃</span>
      </div>
      <div class="spotName">
        <el-row style="width: 1050px;">
          <el-col :span="12">
            <h1 style="line-height: 0.5;">{{ spot.spotName }}</h1>
            <h3 style="display: block; color: #666666">{{ spot.spotForeignName }}</h3>
          </el-col>
          <el-col :span="12">
            <div class="spotFavorite">
              <i :class="iconClass" @click="toggleFavorite" style="margin-right: 5px;"/>
              <span @click="toggleFavorite" style="cursor: pointer; transform: scale(1.1);">{{ isFavorite ? '已收藏' : '收藏' }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="display: flex; justify-content: center">
        <el-divider class="topDivider"></el-divider>
      </div>
      <!-- :class="{ fixed: isTopMenuFixed }" -->
      <div class="topMenu" ref="topMenu">
        <el-menu :default-active="activeIndex" mode="horizontal" active-text-color="#2a9d8f" class="spotMenu">
          <el-menu-item index="1" @click="scrollToSection('#overview')">概况</el-menu-item>
          <el-menu-item index="2" @click="scrollToSection('#spotComments')">景区点评</el-menu-item>
          <el-button class="spotCommentButton" type="primary" icon="el-icon-s-comment" @click="comment">我要点评</el-button>
        </el-menu>
      </div>
    </div>
    <div class="overview" id="overview">
      <div style="display: flex; justify-content: center;">
        <div class="imgShow">
          <div class="mainImg">
            <el-image
              :key="`${spotImg[0]}-${Date.now()}`"
              :src="spotImg[0]"
              style="object-fit: cover; width: 100%; height: 100%; border-radius: 4px;"
              :preview-src-list="spotImg"
              ref="spotImg"
              @error="handleImageError">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <div class="rightImg">
            <div class="img01">
              <img :src="spotImg[1]" style="object-fit: cover; width: 100%; height: 100%; border-radius: 4px;"/>
            </div>
            <div class="img02">
              <img :src="spotImg[2]" style="object-fit: cover; width: 100%; height: 100%; border-radius: 4px;"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="spotDetail">
      <div style="display: flex; justify-content: center;">
        <div class="spotIntroduction">
          <div class="introduction">
            <p v-html=" spot.introduction ? spot.introduction.replace(/\n/g, '<br>') : '' "></p>
          </div>
          <el-divider></el-divider>
          <div class="detail">
            <el-row class="tel_time">
              <el-col :span="6" class="tel">
                <p style="color: #333333">电话</p>
                <p style="color: #666666">{{ spot.telephone }}</p>
              </el-col>
              <el-col :span="1" class="divider"><el-divider direction="vertical"></el-divider></el-col>
              <el-col :span="6" class="time">
                <p style="color: #333333">用时参考</p>
                <p style="color: #666666">{{ spot.playtime }}小时</p>
              </el-col>
            </el-row>
            <el-row class="traffic">
              <p style="color: #333333">交通</p>
              <p style="color: #666666">{{ spot.traffic }}</p>
            </el-row>
            <el-row class="tickets">
              <p style="color: #333333">门票</p>
              <p style="color: #666666" v-html=" spot.tickets ? spot.tickets.replace(/\n/g, '<br>') : '' "></p>
            </el-row>
            <el-row class="openingHours">
              <p style="color: #333333">开放时间</p>
              <p style="color: #666666" v-html=" spot.openingHours ? spot.openingHours.replace(/\n/g, '<br>') : '' "></p>
            </el-row>
            <el-row class="updateTime">
              <span>*信息更新时间：{{ spot.updateTime }}</span>
            </el-row>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="mapWrapper">
        <div class="mapContainer">
          <baidu-map
            class="map"
            :center="center"
            :zoom="17"
            :scroll-wheel-zoom="false">
            <bm-traffic></bm-traffic>
<!--            <bm-marker :position="center" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>-->
            <bm-local-search
              :keyword="'景区'"
              :auto-viewport="true"
              @searchcomplete="handleSearchResult"
              :panel="false"
              :autoViewport="false"/>
          </baidu-map>
        </div>
        <div class="aroundSpot">
          <div class="poiTitle">周边景区</div>
          <ul style="height: 328px; overflow-y: auto; margin: 0; padding: 0; border: 1px solid #eee">
            <template v-for="(item, index) in spotList">
              <li v-if="index !== 0" :key="index" style="list-style:none; background-color: #fafafa; display: flex; align-items: center; position:relative;">
                <img style="width: 80px; height: 80px;" :src="require('@/assets/weatherIcons/100.png')">
                <span @click="changeCenter(item.point.lng, item.point.lat)" class="spotTitle">{{ item.title }}</span>
                <el-button type="text" style="position: absolute; top: 55px; right: 25px;" @click="">路线规划</el-button>
                <el-divider style="position: absolute; margin: 5px 0; top: 80px;"></el-divider>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="spotComments" id="spotComments">
      <div class="commentsWrapper">
        <h3>景区点评</h3>
        <el-divider></el-divider>
        <div style="display: flex; justify-content: center;">
          <div class="commentContainer">
            <div v-if="commentsList.length == 0" style="text-align: left; font-size: 16px; font-weight: bold; margin-left: 20px; margin-top: 20px;">暂无点评，期待您的评论~</div>
            <div v-else v-for="item in commentsList" :key="item.id" class="fullComment">
              <el-row style="border-bottom: 1px solid #ccc;">
                <el-col :span="2">
                  <el-avatar :size="50" :src="'/dev-api' + item.avatar"></el-avatar>
                </el-col>
                <el-col :span="20">
                  <div style="margin-top: 10px; font-size: 14px; display: flex; color: #333">
                    <span>{{ item.nickName }}</span>
                    <el-rate
                      v-model="item.rating"
                      disabled
                      text-color="#ff9900"
                      :colors="colors"
                      style="margin-left: 10px;" />
                  </div>
                  <div>
                    <span style="display: block; font-size: 14px; color: #666666; white-space: pre-wrap; margin-bottom: 10px;">{{ item.content }}</span>
                    <div style="display: flex; margin-bottom: 10px;">
                      <div v-if="item.img" v-for="(image, index) in (item.img ? item.img.split(',') : [])" :key="index">
                        <el-image
                          style="width: 200px; height: 120px; margin-right: 10px; border-radius: 5px;"
                          :src="'/dev-api' + image"
                          :preview-src-list="['/dev-api' + image]"
                          preview
                        />
                      </div>
                    </div>
                    <div class="commentTime">
                      <span>{{ item.createTime }}</span>
                      <el-button type="text" style="margin-left: 690px" @click="showReplyBox(item.id, item.nickName)">评论</el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="replyContainer" v-for="reply in item.replyList" :key="reply.id">
                <div class="reply">
                  <el-avatar :size="30" :src="'/dev-api' + reply.avatar" />
                  <span style="color: #1ab394">{{ reply.userName }}</span>
                  <span>：{{ reply.content }}</span>
                </div>
                <div style="font-size: 12px; color: #999999; margin-left: 10px; margin-bottom: 5px;">
                  <span>{{ reply.createTime }}</span>
                </div>
              </div>
              <!-- 评论 -->
              <div style="width: 834px; margin-left: 83px" v-if="replyInfo.showReplyBox && replyInfo.id === item.id">
                <el-input type="textarea" :placeholder="'评论@' + replyInfo.name" v-model.lazy="replyContent"></el-input>
                <div style="text-align: right; margin: 5px 0;">
                  <el-button @click="shutReplyBox">取消</el-button>
                  <el-button type="primary" @click="submitReply(item.id, item.userId)">提交</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 点评对话框 -->
    <el-dialog
      :title="spot.spotName"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="commentDialog">
      <el-form :form="commentForm" label-width="75px">
        <el-form-item label="评分">
          <el-rate
            v-model="commentForm.rating"
            :colors="colors"
            :texts="texts"
            show-text>
          </el-rate>
        </el-form-item>
        <el-form-item label="评论内容">
          <el-input type="textarea" placeholder="请留下您的点评~" v-model="commentForm.content"></el-input>
        </el-form-item>
        <el-form-item label="图片上传">
          <uploadImg v-model="commentForm.img" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmComment">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 页脚 -->
    <Footer style="margin-top: 30px;"/>
  </div>
</template>

<script>
import axios from "axios";
import 'qweather-icons/font/qweather-icons.css'
import Footer from "@/layout/components/Footer.vue";
import {getSpot} from "@/api/spot/spot";
import {addSpotComments, getSpotCommentsList} from "@/api/spotComments/spotComments";
import uploadImg from "@/components/ImageUpload/spotImgUpload.vue"
import {getUserProfile} from "@/api/system/user";
import {addSpotReply, getReplyList} from "@/api/spotReply/spotReply";
import {getIsFavorite, addSpotFavorite, delFavorite} from "@/api/spotFavorite/spotFavorite";
import { addUserRecords } from "@/api/userRecords/userRecords";

export default {
  components: {
    Footer,
    uploadImg
  },
  data() {
    return {
      API_KEY: 'e09cd1c5806442918d2451381dfc322b',
      cityId: '101180801',
      isFavorite: false,
      activeIndex: '1',
      weather: {},
      spot: {},
      spotImg: [],
      commentsList: [],
      value: 5,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      imgList: [
        { id:1, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { id:2, url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id:3, url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg' },
      ],
      isTopMenuFixed: false,
      texts: ['不值门票', '略有不足', '还可以', '值得一看', '强烈推荐'],
      dialogVisible: false,
      commentForm: {
        userId: null,
        spotId: null,
        content: null,
        rating: null,
        img: null
      },
      user: {},
      center: {
        lng: null,
        lat: null
      },
      spotList: [],
      replyInfo: {
        id: null,
        name: null,
        showReplyBox: false
      },
      replyContent: '',
      favoriteInfo: {
        userId: '',
        spotId: ''
      }
    }
  },
  props: {
    topDistance: {
      type: Number,
      required: true,
      default: 0
    },
    limit: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    iconClass() {
      return this.isFavorite ? 'el-icon-star-on' : 'el-icon-star-off'
    },
  },
  mounted() {
    this.$nextTick(() => {
      const topMenu = this.$refs.topMenu;
      const topDistance = topMenu.getBoundingClientRect().top;
      let _this = this;
      window.addEventListener('scroll', () => {
        if(_this.topDistance < topDistance) {
          _this.isTopMenuFixed = false;
        } else {
          _this.isTopMenuFixed = true;
        }
      }, true)
    });
    this.getWeather();
    this.getSpotDetail();
    this.getSpotComments();
    this.getUserInfo();
    // 添加用户浏览记录
    this.addUserRecord();
  },
  methods: {
    // 获取当前景点信息
    getSpotDetail() {
      const id = this.$route.query.id;
      // GET景区信息
      getSpot(id).then((res) => {
        this.spot = res.data;
        const lng = this.spot.lng;
        const lat = this.spot.lat;
        this.center = { lng, lat }
        const imgArray = this.spot.spotImg.split(",");
        for (let i = 0; i < imgArray.length; i++) {
          this.spotImg.push('/dev-api' + imgArray[i]);
        }
      });
    },
    // 获取当前用户信息
    getUserInfo() {
      getUserProfile().then((res) => {
        this.user = res.data;
        return this.user.userId;
      }).then((userId) => {
        this.favoriteInfo = {
          userId: userId,
          spotId: this.$route.query.id
        };
        getIsFavorite(this.favoriteInfo).then((res) => {
          this.isFavorite = res.data;
        })
      })
    },
    // 获取当地天气信息
    getWeather() {
      let data = this;
      axios.get('https://devapi.qweather.com/v7/weather/now', {
        params: {
          key: this.API_KEY,
          location: this.cityId
        }
      }).then(function (res) {
        data.weather = res.data.now;
      }).catch(function (err) {
        console.log(err);
      })
    },
    addUserRecord() {
      getUserProfile().then((res) => {
        const data = {
          userId: res.data.userId,
          type: 0,
          spotId: this.$route.query.id
        }
        addUserRecords(data);
      })
    },
    handleImageError() {
      this.$refs.spotImg.currentSrc = '';
      this.$forceUpdate();
    },
    // 实现收藏图标变换
    toggleFavorite() {
      if (this.isFavorite) {
        const data = this.favoriteInfo;
        delFavorite(data).then((res) => {
          if(res.code == 200) {
            this.isFavorite = false;
          }
        })
      } else {
        addSpotFavorite(this.favoriteInfo).then((res) => {
          if(res.code == 200) {
            this.isFavorite = true;
          }
        })
      }
    },
    // 获取周边景点信息
    handleSearchResult(result) {
      this.spotList = result.Yr;
    },
    // 改变地图中心点
    changeCenter(lng, lat) {
      this.center = { lng, lat };
    },
    // GET景点评论信息
    getSpotComments() {
      const spotId = this.$route.query.id;
      this.loading = true;
      getSpotCommentsList(spotId).then((res) => {
        this.commentsList = res.data;
        this.total = res.data.length;
        this.loading = false;
        this.commentsList.forEach(comment => {
          getReplyList(comment.id).then(response => {
            comment.replyList = response.data;
            // console.log(response.data);
          })
        })
      })
    },
    // 控制点评窗口开关
    comment() {
      this.dialogVisible = true;
    },
    // 实现窗口滚动到指定位置
    scrollToSection(selector) {
      const targetElement = document.querySelector(selector)
      const offsetTop = targetElement.offsetTop
      this.$nextTick(() => {
        this.$emit('scrollTo', offsetTop);
      })
    },
    // 点评窗口右上角关闭事件
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 重置form表单
    resetForm() {
      this.commentForm = {
        userId: null,
        spotId: null,
        content: null,
        rating: null,
        img: null
      };
    },
    // 提交点评
    confirmComment() {
      this.commentForm.userId = this.user.userId;
      this.commentForm.spotId = this.$route.query.id;
      addSpotComments(this.commentForm).then((res) => {
        this.$notify({
          title: '成功',
          message: '点评提交成功~',
          type: "success",
          duration: 3000
        });
        this.dialogVisible = false;
        this.resetForm();
        this.getSpotComments();
      }).catch(err => {
        this.$notify.error({
          title: '错误',
          message: '点评提交失败~',
          duration: 3000
        });
        console.log(err);
      })
    },
    showReplyBox(id, name, isReply) {
      this.replyInfo.id = id;
      this.replyInfo.name = name;
      this.replyInfo.showReplyBox = true;
      console.log(this.replyInfo);
    },
    shutReplyBox() {
      this.replyInfo.showReplyBox = false;
      this.replyContent = '';
    },
    submitReply(id, toUserId) {
      const data = {
        userId: this.user.userId,
        spotId: this.spot.id,
        commentId: id,
        toUserId: toUserId,
        content: this.replyContent
      }
      addSpotReply(data).then((res) => {
        this.$notify({
          title: '成功',
          message: '回复提交成功~',
          type: "success",
          duration: 3000
        });
        this.replyContent = '';
        this.getSpotComments();
      }).catch(error => {
        this.$notify.error({
          title: '错误',
          message: '回复失败~',
          duration: 3000
        });
        console.log(error);
      })
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
.rowTop {
  position: relative;
  align-items: center;
  width: 1920px;
  background-color: #ffffff;
}
.CrumbContainer {
  position: absolute;
  left: 22.65%;
  display: flex;
  align-items: center;
  width: 1050px;
  height: 50px;
  .BreadcrumbTop {
    .el-breadcrumb-item .el-breadcrumb__inner {
      line-height: 22px;
    }
  }
}
.weatherIcon {
  width: 35px;
  height: 35px;
  margin-left: 700px;
}
.spotName {
  position: absolute;
  left: 22.65%;
  margin-top: 50px;
  display: flex;
  align-items: center;
}
.spotFavorite {
  margin-top: 50px;
  margin-left: 440px;
  .el-icon-star-off {
    font-size: 30px;
  }
  .el-icon-star-off:hover {
    color: #ff9900;
    cursor: pointer;
  }
  .el-icon-star-on {
    color: #ff9900;
    font-size: 32px;
    cursor: pointer;
  }
}
.topDivider {
  width: 1050px;
  margin: 140px 0 5px 0;
}
.topMenu {
  display: flex;
  justify-content: center;
  position: sticky;
  .spotMenu {
    width: 1050px;
    .el-menu-item {
      font-size: 16px;
    }
    .el-menu-item:hover {
      color: #2ec4b6;
    }
    .is-active {
      font-weight: bold;
    }
    .spotCommentButton {
      font-size: 15px;
      margin-top: 10px;
      margin-left: 750px;
    }
  }
}
.topMenu.fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  box-shadow: 0 2px 3px rgba(0,0,0,.1);
  background-color: #ffffff;
}
.overview {
  height: 430px;
  background-color: #fafafa;
  border: 1px solid #eee;
  .imgShow{
    width: 1050px;
    height: 370px;
    margin-top: 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    .mainImg {
      width: 690px;
      height: 370px;
    }
    .rightImg {
      display: flex;
      flex-direction: column;
      width: 355px;
      margin-left: 5px;
      height: 370px;
      .img01 {
        width: 355px;
        height: 182px;
      }
      .img02 {
        width: 355px;
        height: 182px;
        margin-top: 6px;
      }
    }
  }
}
.spotDetail {
  height: 1200px;
  .spotIntroduction {
    width: 1050px;
    margin-top: 35px;
    background-color: #ffffff;
    .introduction {
      margin-left: 20px;
      font-size: 16px;
      color: #333;
      line-height: 24px;
    }
    .el-divider--horizontal {
      margin: 15px 0;
      background-color: #d3d3d3;
    }
    .detail {
      .tel_time {
        line-height: 10px;
        .tel {
          margin-left: 20px;
        }
        .divider {
          .el-divider--vertical {
            display: inline-block;
            width: 1px;
            height: 4em;
            margin: 0 8px;
            vertical-align: middle;
            position: relative;
            background-color: #d3d3d3;
          }
        }
      }
      .traffic {
        line-height: 10px;
        margin: 20px 0 0 20px;
      }
      .tickets {
        line-height: 20px;
        margin: 10px 0 0 20px;
      }
      .openingHours {
        line-height: 20px;
        margin: 10px 0 0 20px;
      }
      .updateTime {
        font-size: 12px;
        color: #999;
        margin-left: 25px;
      }
    }
  }
}
.mapWrapper {
  display: flex;
  width: 1050px;
  height: 400px;
  margin-left: 435px;
  .mapContainer {
    width: 500px;
    height: 360px;
    margin-left: 20px;
    margin-top: 20px;
    .map {
      width: 100%;
      height: 100%;
    }
  }
  .aroundSpot {
    width: 300px;
    height: 360px;
    margin-left: 50px;
    margin-top: 20px;
    .poiTitle {
      display: flex;
      justify-content: center;
      font-size: 20px;
      line-height: 30px;
      border: 1px solid #d3d3d3;
      background-color: #d4d4d4;
    }
    .el-divider--horizontal {
      margin: 5px 0;
      position: absolute;
      top: 75px;
      background-color: #666;
    }
  }
}
.spotComments {
  width: 100%;
  display: flex;
  justify-content: center;
  .commentsWrapper {
    width: 1050px;
    .el-divider--horizontal {
      margin: 5px 0;
      background-color: #DCDFE6;
    }
    .commentContainer {
      width: 1000px;
      .fullComment {
        border-bottom: 1px dashed #ccc;
      }
      .el-avatar {
        margin: 15px;
      }
      .image-preview {
        width: 200px;
        height: 120px;
      }
      .commentTime {
        width: 834px;
        font-size: 12px;
        color: #999999;
      }
      .replyContainer {
        width: 834px;
        margin-top: 5px;
        margin-left: 83px;
        margin-bottom: 10px;
        border-bottom: 1px dotted #ccc;
        .reply {
          display: flex;
          align-items: center;
          position: relative;
          height: 40px;
          margin-top: 5px;
          font-size: 12px;
          color: #666666;
          .el-avatar {
            margin: 0 5px;
          }
          .el-button {
            position: absolute;
            font-size: 12px;
            color: #1ab394;;
            right: 5px;
          }
        }
      }
    }
  }
}
.commentDialog {
  ::v-deep .el-dialog__body {
    padding: 0px 0px;
  }
  .el-rate {
    margin-top: 8px;
  }
  ::v-deep .el-textarea__inner {
    padding: 5px 5px;
    width: 95%;
  }
}
.spotTitle {
  cursor: pointer;
  color: #333333;
}
.spotTitle:hover {
  color: #1ab394;
}
::v-deep .anchorBL {
  display: none !important;
}
::v-deep .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #909399;
  font-size: 30px;
}
::v-deep .el-rate__icon{
  margin-right: 0;
}
</style>
