<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px; margin-left: 430px; margin-top: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/routeList' }">路线推荐</el-breadcrumb-item>
      <el-breadcrumb-item>{{ route.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col class="bgCol">
        <div class="coverImg-container bg-purple">
          <img :src="'/dev-api' + route.coverImg" style="width: 100%; height: 100%;" />
<!--          <el-image
            style="width: 100%; height: 100%;"
            :src="'/dev-api' + route.coverImg"
            :fit="fit"></el-image>-->
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-title" justify="center">
      <el-col style="width: 550px; height: 105px" class="bg-trans">
        <div style="position: relative">
          <span style="margin-left: 15px;margin-top: 25px;">更新时间：{{ parseTime(route.updateTime, '{y}-{m}-{d}') }}</span>
          <div style="display: flex;">
            <h1 style="margin-left: 15px; font-size: 40px; line-height: 50px;">{{ route.title }}</h1>
            <el-rate
              v-model="avgRating"
              allow-half
              disabled
              show-score
              text-color="#ff9900"
              :colors="colors"
              style="margin-left: 35px; margin-top: 53px; transform: scale(1.2);"
              @change="submitRating">
            </el-rate>
          </div>
        </div>
      </el-col>
      <el-col style="width: 500px; height: 105px" class="bg-trans">
        <div class="headRight">
          <a href="/">
            <img :src="avatarUrl" class="user-avatar">
          </a>
          <a style="margin-left: 10px;">{{ route.userName }}</a>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-title" justify="center" style="margin-top: 0px;">
      <el-col style="width: 800px;" class="bg-purple">
        <div class="routeContent" v-html="route.content"></div>
      </el-col>
      <el-col style="width: 250px;" class="bg-purple">
          <div style="display: flex; align-items: center; margin-right: 20px;">
            <i :class="iconClass" @click="toggleFavorite" style="margin-right: 5px;"/>
            <span @click="toggleFavorite" style="cursor: pointer; transform: scale(1.1);">{{ isFavorite ? '已收藏' : '收藏' }}</span>
            <el-rate
              v-model="value"
              allow-half
              show-score
              text-color="#ff9900"
              :colors="colors"
              style="margin-left: 30px;"
              @change="submitRating">
            </el-rate>
          </div>
        <el-divider style="height: 2px;"></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <div style="margin: 10px auto; width: 1050px;">
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
    <el-row>
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
import GoTopAndBottom from "@/components/GoTopAndBottom/index.vue";

export default{
  components: {
    GoTopAndBottom
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
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
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
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
/*.el-col {
  border-radius: 4px;
}*/
.bgCol {
  width: 1050px;
  height: 450px;
  margin: 0 auto;
}
.coverImg-container {
  border-radius: 4px;
  width: 1050px;
  height: 450px;
  margin-top: 40px;
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
.row-bg {
  padding: 10px 0;
  background-color: #FFFFFF;
}
.row-title {
  margin-top: -85px;
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
  transform: scale(1.1);
}
.el-divider {
  margin: 5px 0;
  background-color: #cccccc;
}
</style>
