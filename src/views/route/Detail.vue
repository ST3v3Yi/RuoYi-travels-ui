<template>
<!--  <div class="routeDetail">
    <h1>{{ route.title }}</h1>
    <div class="aside">
      <span>日期：{{route.releaseTime}}</span>
      <span>作者：{{route.userName}}</span>
    </div>
    <image-preview :src="route.coverImg" :width="200" :height="180" style="margin-left: 20px;" />
    <div class="routeContent" v-html="route.content"></div>
  </div>-->
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
          <h1 style="margin-left: 15px;font-size: 48px; line-height: 15px;">{{ route.title }}</h1>
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
<!--        <span style="font-size: 22px;">推荐景点</span>
        <el-divider style="width: 2px;margin: 5px 0;"></el-divider>-->
        <div style="display: flex; align-items: center;">
          <div style="margin-right: 20px">
            <i :class="iconClass" @click="toggleFavorite" style="margin-right: 5px;"/>
            <span @click="toggleFavorite" style="cursor: pointer; transform: scale(1.2);">收藏</span>
          </div>
            <el-rate
              v-model="value"
              allow-half
              show-score
              text-color="#ff9900"
              :colors="colors"
              @change="submitRating">
            </el-rate>
        </div>
      </el-col>

    </el-row>
    <el-row>
      <div style="margin: 10px auto; width: 1050px;">
        <span style="font-size: 24px; font-weight: bold; text-align: left;">评论</span>
        <div style="margin: 5px 0;">
        <el-input type="textarea" placeholder="请输入评论~" v-model.lazy="comment.message"></el-input>
        </div>
        <div style="text-align: right; margin: 5px 0;">
          <el-button type="primary" @click="submitComment">提交</el-button>
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
import { MessageBox } from "element-ui";
import { mapGetters } from 'vuex'
import { parseTime } from "../../utils/ruoyi";
import axios from "axios";
export default{
  computed: {
    ...mapGetters([
      'nickName',
      'avatar',
    ]),
    iconClass() {
      return this.isFavorite ? 'el-icon-star-on' : 'el-icon-star-off'
    },
    avatarUrl() {
      const serveUrl = process.env.VUE_APP_BASE_API
      const avatarUrl = this.createUser.avatar
      return serveUrl + avatarUrl
    }
  },
  data( ){
    return{
      route: {},
      user: {},
      createUser: {},
      value: 0,
      isFavorite: false,
      comment: {
        message: ''
      },
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    };
  },
  mounted() {
    this.getRouteDetail();
    this.getUserInfo();
    this.getUser();
  },
  methods: {
    parseTime,
    getRouteDetail() {
      const id = this.$route.query.id;
      getRoute(id).then((res) => {
        this.route = res.data;
      });
    },
    getUserInfo() {
      getUserProfile().then((res) => {
        this.user = res.data;
      })
    },
    getUser() {
      const id = this.$route.query.userId;
      getUser(id).then((res) => {
        this.createUser = res.data;
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
        MessageBox.alert('评分成功', '提示', {
          confirmButtonText: '确定'
        }).then(() => {
          console.log(res);
          location.reload();
        })
      }).catch(error => {
        console.log(error);
      })
    },
    submitComment() {
      axios.post('/api/comment', this.comment).then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
/*.routeDetail {
  height: auto;
  h1 {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 0px;
    margin-left: 20px;
  }
  .aside {
    margin-left: 10px;
    margin-bottom: 20px;
    span {
      font-size: 14px;
      color: #666666;
      margin-left: 5px;
    }
  }
  p {
    font-size: 18px;
    line-height: 1.5;
    margin-left: 20px;
  }
  .routeContent {
    overflow: auto;
    line-height: 1.5;
    margin-left: 20px;
  }
}*/
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
  padding: 15px 0 0 0px;
  position: relative;
  margin-left: 300px;
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
  transform: scale(1.2);
}
.el-rate__item {
  margin: 0 2px;
}
</style>
