<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col class="bgCol">
        <div class="coverImg-container bg-purple">
          <image-preview :src="route.coverImg" style="width: 100%; height: 100%;" />
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
            <span @click="toggleFavorite" style="cursor: pointer; transform: scale(1.2);">收藏</span>
            <el-rate
              v-model="value"
              allow-half
              show-score
              text-color="#ff9900"
              :colors="colors"
              style="margin-left: 35px;"
              @change="submitRating">
            </el-rate>
          </div>
        <el-divider></el-divider>
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
      <div style="margin: 10px auto; width: 1050px;">
        <el-collapse>
          <el-collapse-item title="评论列表">
            <div v-for="comment in comments" :key="comment.id">
              <el-card>
                <p>{{ comment.content }}</p>
                <p>{{ comment.username }}</p>
                <p>{{ comment.date }}</p>
              </el-card>
            </div>
          </el-collapse-item>
        </el-collapse>
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
import { getRouteAVGRating } from "@/api/routeRating/routeRating";
import { addRouteComments } from "@/api/routeComments/routeComments";
import { getRouteCommentsList } from "@/api/routeComments/routeComments";

export default{
  data( ){
    return{
      route: {},
      user: {},
      createUser: {},
      avgRating: 0,
      value: 0,
      isFavorite: false,
      commentContent: '',
      userId: null,
      commentsList: [],
      commentUser: {},
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
      })
    },
    getRouteComments() {
      const routeId = this.$route.query.id;
      getRouteCommentsList(routeId).then(res => {

      })
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite
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
          duration: 2000
        });
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
          duration: 2000
        });
        this.commentContent = '';
      }).catch(error => {
        this.$notify.error({
          title: '错误',
          message: '评论失败~',
          duration: 3000
        });
        console.log(error);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
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
  margin-top: -95px;
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
  height: 2px;
  background-color: #cccccc;
}
</style>
