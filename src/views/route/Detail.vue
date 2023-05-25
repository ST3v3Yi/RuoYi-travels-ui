<template>
  <div class="container">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px; margin-left: 430px; padding: 10px 0">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/routeList' }">路线推荐</el-breadcrumb-item>
        <el-breadcrumb-item>{{ route.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col class="bgCol">
        <div class="coverImg-container bg-purple">
          <img :src="'/dev-api' + route.coverImg" style="width: 100%; height: 100%;" />
        </div>
      </el-col>
    </el-row>
    <div class="routeInfoContainer">
      <div class="routeInfo">
        <img :src="avatarUrl" style="width: 120px; height: 120px" class="avatar"/>
        <span class="routeTitle">{{ route.title }}</span>
        <span class="userName">{{ route.userName }}</span>
        <span class="updateTime">更新时间：{{ parseTime(route.updateTime, '{y}-{m}-{d}') }}</span>
        <el-rate
          v-model="avgRating"
          allow-half
          disabled
          show-score
          text-color="#ff9900"
          :colors="colors"
          class="titleRate">
        </el-rate>
      </div>
    </div>
    <div class="routeContentContainer">
      <div class="routeContent">
        <div v-html="route.content"></div>
      </div>
      <div class="RecContent">
        <div>
          <div class="favoritePart">
            <i :class="iconClass" @click="toggleFavorite" style="margin-right: 5px;"/>
            <span @click="toggleFavorite" style="cursor: pointer; transform: scale(1.1);">{{ isFavorite ? '已收藏' : '收藏' }}</span>
          </div>
          <el-rate
            v-model="value"
            allow-half
            show-score
            text-color="#ff9900"
            :colors="colors"
            class="routeRate"
            @change="submitRating">
          </el-rate>
          <el-divider style="height: 1px; background-color: #eeeeee"></el-divider>
        </div>
        <div class="textContent" v-if="tags">
          <span style="font-size: 18px; font-weight: bold; color: #333333;">文中提及</span>
          <div v-for="(item, index) in tags" :key="index" style="position: relative; margin-top: 10px;">
            <img :src="'/dev-api' + item.coverImg" style="width: 100%; height: 100px; border-radius: 5px;" />
            <router-link :to="{ path: '/spotDetail/:id', query: { id: item.id } }">
              <span v-if="item.spotName" class="name">{{ item.spotName }}</span>
            </router-link>
            <router-link :to="{ path: '/hotelDetail/:id', query: { id: item.id } }">
              <span v-if="item.hotelName" class="name">{{ item.hotelName }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <el-row>
      <div style="margin: 10px auto; width: 1050px; background-color: #FFFFFF; padding: 10px; border-radius: 5px; border: 1px solid #eeeeee;">
        <div style="display: flex; align-items: center;">
          <span style="font-size: 24px; font-weight: bold; text-align: left;">评论</span>
        </div>
        <div style="margin: 5px 0;">
        <el-input type="textarea" placeholder="请输入评论~" v-model.lazy="commentContent"></el-input>
        </div>
        <div style="text-align: right; margin: 5px 0;">
          <el-button type="primary" @click="submitComment">提交</el-button>
        </div>
      </div>
    </el-row>
    <el-row style="background-color: #FFFFFF">
      <div style="margin: 5px auto; width: 1050px;">
        <span style="text-align: left; font-size: 20px; font-weight: bold;">评论列表</span>
        <div v-if="commentsList.length == 0" style="text-align: left; font-size: 16px; font-weight: bold; margin-left: 20px; margin-top: 20px;">暂无评论，期待您的评论~</div>
        <div v-else v-for="item in commentsList" :key="item.id">
          <div style="display: flex; margin-top: 20px;">
            <div style="width: 50px">
              <img :src="'/dev-api' + item.avatar" class="commentAvatar">
            </div>
            <div style="flex: 1; margin-left: 10px;">
              <div>{{ item.nickName }}</div>
              <div style="color: #666; margin-top: 5px;">{{ item.content }}</div>
              <div style="color: #999; font-size: 12px; margin-top: 5px;">{{ item.createTime }}</div>
              <!-- 多级回复 -->
              <div style="text-align: right;">
                <el-button type="text" @click="showReplyBox(item.id)">回复</el-button>
              </div>
              <div v-for="reply in item.replyList" :key="reply.id">
                <div style="display: flex;">
                  <div style="width: 50px">
                    <img :src="'/dev-api' + reply.avatar" class="commentAvatar">
                  </div>
                  <div style="flex: 1; margin-left: 10px; margin-bottom: 5px">
                    <div>
<!--                      <span style="cursor: pointer" @click="showReplyBox(reply.id)">{{ reply.userName }} 回复 </span>-->
                      <span>{{ reply.userName }} 回复 </span>
                      <span style="color: cornflowerblue">@{{ reply.toUserName }}</span>
                    </div>
                    <div style="color: #666; margin-top: 5px;">{{ reply.content }}</div>
                    <div style="color: #999; font-size: 12px; margin-top: 5px;">{{ reply.createTime }}</div>
                  </div>
                </div>
              </div>
              <!-- 回复文本域 -->
              <div v-if="replyInfo.showReplyBox && replyInfo.id == item.id">
                <el-input type="textarea" placeholder="请输入回复~" v-model.lazy="replyContent"></el-input>
                <div style="text-align: right; margin: 5px 0;">
                  <el-button type="primary" @click="shutReplyBox">取消</el-button>
                  <el-button type="primary" @click="submitReply(item.id, item.userId)">提交</el-button>
                </div>
              </div>
            </div>
          </div>
          <el-divider style="height: 1px"></el-divider>
        </div>
      </div>
    </el-row>
    <!-- 页脚 -->
    <Footer style="margin-top: 30px;"/>
  </div>
</template>

<script>
import { getRoute } from "@/api/route/route";
import { addRouteRating } from "@/api/routeRating/routeRating";
import { getUserProfile } from "@/api/system/user";
import { getUser } from "@/api/system/user";
import { parseTime } from "../../utils/ruoyi";
import { getRouteAVGRating, getRating } from "@/api/routeRating/routeRating";
import { addRouteComments } from "@/api/routeComments/routeComments";
import { getRouteCommentsList } from "@/api/routeComments/routeComments";
import {addRouteReply, getReplyList} from "@/api/routeReply/routeReply";
import { getIsFavorite, delFavorite, addRouteFavorite } from "@/api/routeFavorite/routeFavorite";
import { addUserRecords } from "@/api/userRecords/userRecords";
import { getTags } from "@/api/route/routeTag";
import Footer from "@/layout/components/Footer.vue";

export default{
  components: {
    Footer,
  },
  data( ){
    return{
      route: {},
      user: {},
      createUser: {},
      avgRating: 0,
      value: 0,
      isFavorite: false,
      commentContent: '',
      replyContent: '',
      isShowReplyBox: false,
      userId: null,
      commentsList: [],
      replyInfo: {
        id: null,
        showReplyBox: false
      },
      favoriteInfo: {
        userId: '',
        routeId: '',
      },
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      tags: null,
    };
  },
  computed: {
    iconClass() {
      return this.isFavorite ? 'el-icon-star-on' : 'el-icon-star-off'
    },
    avatarUrl() {
      const serveUrl = process.env.VUE_APP_BASE_API
      const avatarPath = this.createUser.avatar;
      return serveUrl + avatarPath
    }
  },
  mounted() {
    this.getRouteDetail();
    this.getUserInfo();
    this.getRouteRating();
    this.getRouteComments();
    // 添加用户浏览记录
    this.addUserRecord();
  },
  methods: {
    parseTime,
    getRouteDetail() {
      const id = this.$route.query.id;
      // GET路线route信息和发布用户信息，
      getRoute(id).then((res) => {
        this.route = res.data;
        this.userId = res.data.userId;
        return this.userId; // 返回一个Promise，使得可以在下一个.then()中使用userId
      }).then((userId) => {
        return getUser(userId);
      }).then((response) => {
        if (response && response.data) {
          this.createUser = response.data;
          // console.log(response.data);
          // console.log(this.createUser.userId);
        }
      })
      getTags(id).then((res) => {
        this.tags = res.data;
        console.log(this.tags)
      })
    },
    getRouteRating() {
      const id = this.$route.query.id;
      getRouteAVGRating(id).then((res) => {
        this.avgRating = res.data;
      })
    },
    getUserInfo() {
      getUserProfile().then((res) => {
        this.user = res.data;
        return this.user.userId;
      }).then((userId) => {
        this.favoriteInfo = {
          userId: userId,
          routeId: this.$route.query.id
        }
        return getIsFavorite(this.favoriteInfo);
      }).then((res) => {
        this.isFavorite = res.data;
        return getRating(this.favoriteInfo);
      }).then((res) => {
        this.value = res.data;
      })
    },
    getRouteComments() {
      const routeId = this.$route.query.id;
      this.loading = true;
      getRouteCommentsList(routeId).then(res => {
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
    addUserRecord() {
      getUserProfile().then((res) => {
        const data = {
          userId: res.data.userId,
          type: 1,
          routeId: this.$route.query.id
        }
        addUserRecords(data);
      })
    },
    showReplyBox(id) {
      this.replyInfo.id = id;
      this.replyInfo.showReplyBox = true;
    },
    shutReplyBox() {
      this.replyInfo.showReplyBox = false;
      this.replyContent = '';
    },
    toggleFavorite() {
      if (this.isFavorite) {
        const data = this.favoriteInfo;
        delFavorite(data).then((res) => {
          if(res.code == 200) {
            this.isFavorite = false;
          }
        })
      } else {
        addRouteFavorite(this.favoriteInfo).then((res) => {
          if(res.code == 200) {
            this.isFavorite = true;
          }
        })
      }
    },
    submitRating() {
      const data = {
        routeId: this.route.id,
        userId: this.user.userId,
        rating: this.value
      }
      addRouteRating(data).then(res => {
        this.$notify({
          title: '成功',
          message: '评分成功~',
          type: "success",
          duration: 3000
        });
        this.getRouteRating();
        console.log(res);
      }).catch(error => {
        this.$notify.error({
          title: '错误',
          message: '您已经评过分了~',
          duration: 3000
        });
        console.log(error);
      })
    },
    submitComment() {
      const data = {
        userId: this.user.userId,
        routeId: this.route.id,
        content: this.commentContent
      }
      addRouteComments(data).then((res) => {
        this.$notify({
          title: '成功',
          message: '评论提交成功~',
          type: "success",
          duration: 3000
        });
        this.commentContent = '';
        this.getRouteComments();
      }).catch(error => {
        this.$notify.error({
          title: '错误',
          message: '评论失败~',
          duration: 3000
        });
        console.log(error);
      })
    },
    submitReply(id, toUserId) {
      const data = {
        userId: this.user.userId,
        routeId: this.route.id,
        commentId: id,
        toUserId: toUserId,
        content: this.replyContent
      }
      addRouteReply(data).then((res) => {
        this.$notify({
          title: '成功',
          message: '回复提交成功~',
          type: "success",
          duration: 3000
        });
        this.replyContent = '';
        this.getRouteComments();
      }).catch(error => {
        this.$notify.error({
          title: '错误',
          message: '回复失败~',
          duration: 3000
        });
        console.log(error);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.breadcrumb {
  width: 100%;
  height: auto;
  background-color: #FFFFFF;
}
.el-row {
  margin-bottom: 0px;
  &:last-child {
    margin-bottom: 0;
  }
}
/*.el-col {
  border-radius: 4px;
}*/
.bgCol {
  width: 100%;
  height: 640px;
  margin: 0 auto;
}
.coverImg-container {
  width: 100%;
  height: 100%;
  text-align: center;
}
.bg-purple {
  background: #FFFFFF;
  border-radius: 5px;
}
.bg-trans {
  background: rgba(255,255,255,0.6);
  //background-color: #cccccc;
  //opacity: 60%;
}
.routeInfoContainer {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: #f5f7fa;
  .routeInfo {
    position: relative;
    width: 1050px;
    height: 100%;
    background-color: #FFFFFF;
    border-radius: 5px;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 5px;
    .avatar {
      position: absolute;
      border: 1px solid #eeeeee;
      top: -80px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .routeTitle {
      position: absolute;
      top: -50px;
      left: 150px;
      font-size: 28px;
      font-weight: bold;
      color: #FFFFFF;
      text-shadow: 0 2px 5px #333333;
    }
    .userName {
      position: absolute;
      top: 5px;
      left: 120px;
      font-size: 20px;
      font-weight: bold;
      color: #333333;
    }
    .updateTime {
      position: absolute;
      top: 28px;
      left: 120px;
      font-size: 14px;
      color: #999999;
    }
    .titleRate {
      position: absolute;
      top: -20px;
      right: 20px;
      transform: scale(1.2);
    }
  }
}
.routeContentContainer {
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  margin-top: 10px;
  .routeContent {
    width: 790px;
    height: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #eeeeee;
    background-color: #FFFFFF;
  }
  .RecContent {
    width: 250px;
    height: 100%;
    margin-left: 10px;
    border-radius: 5px;
    border: 1px solid #eeeeee;
    background-color: #FFFFFF;
    .favoritePart {
      margin: 5px 10px;
    }
    .routeRate {
      margin: 5px 28px;
    }
    .el-divider {
      margin-left: 5%;
      width: 90%;
    }
    .textContent {
      width: 100%;
      height: auto;
      padding: 10px;
      .name {
        position: absolute;
        top: 75px;
        right: 5px;
        font-size: 18px;
        font-weight: bold;
        color: #FFFFFF;
        text-shadow: 0 2px 5px #333333;
      }
    }
  }
}
.row-bg {
  background-color: #FFFFFF;
}
.row-title {
  background-color: #f5f7fa;
  margin-top: -80px;
}
.headRight {
  margin-left: 330px;
  margin-top: 40px;
}
.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
.commentAvatar {
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 20px;
}
.el-icon-star-off {
  transform: scale(1.2);
}
.el-icon-star-on {
  color: #ff9900;
  transform: scale(1.2);
}
.el-rate {
  transform: scale(1.2);
}
.el-divider {
  margin: 5px 0;
  background-color: #eeeeee;
}
::v-deep .el-rate__icon{
  margin-right: 0;
}
::v-deep .el-rate__text {
  margin-left: 5px;
  font-size: 16px;
}
</style>
