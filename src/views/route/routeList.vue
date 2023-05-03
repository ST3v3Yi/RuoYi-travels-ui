<template>
  <div>
    <!-- 头图走马灯 -->
    <div style="display: flex; justify-content: center;">
      <div class="carousel">
        <el-carousel height="350px" direction="vertical" :autoplay="true" style="width: 1050px;">
          <el-carousel-item v-for="(item, index) in routeList" :key="index">
            <img :src="'dev-api' + item.coverImg" style="width: 100%; height: 100%"/>
            <!-- 图片下信息 -->
            <div class="imgInfo">
              <div class="date">
                <span class="day">{{ item.day }}</span>
                {{ item.date }}
              </div>
              <h1>{{ item.title }}</h1>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 路线筛选器 -->
    <div style="display: flex; justify-content: center;">
      <div class="filter">
        <div style="margin-top: 10px;">
          <span style="font-size: 28px; font-weight: bold; margin-left: 20px;">路线分享</span>
          <div style="display: flex; justify-content: right; margin-top: -35px; margin-right: 20px;">
            <el-button type="primary" icon="el-icon-edit" round>
              <router-link to="/writeRoute">分享我的路线</router-link>
            </el-button>
          </div>
          <el-row style="margin-left: 20px; margin-top: 30px;">
            <span>行程天数：</span>
            <el-button
              :type="isSelected.lower == '' && isSelected.upper == '' ? 'primary' : 'text'"
              style="font-size: 16px;"
              class="buttonClass"
              @click="changeSelected('','')"
            >全部</el-button>
            <el-button
              :type="isSelected.lower == '1' && isSelected.upper == '2' ? 'primary' : 'text'"
              style="font-size: 16px;"
              class="buttonClass"
              @click="changeSelected('1','2')"
            >1-2天</el-button>
            <el-button
              :type="isSelected.lower == '3' && isSelected.upper == '5' ? 'primary' : 'text'"
              style="font-size: 16px;"
              class="buttonClass"
              @click="changeSelected('3','5')"
            >3-5天</el-button>
            <el-button
              :type="isSelected.lower == '6' && isSelected.upper == '8' ? 'primary' : 'text'"
              style="font-size: 16px;"
              class="buttonClass"
              @click="changeSelected('6','8')"
            >6-8天</el-button>
            <el-button
              :type="isSelected.lower == '9' && isSelected.upper == '14' ? 'primary' : 'text'"
              style="font-size: 16px;"
              class="buttonClass"
              @click="changeSelected('9','14')"
            >9-14天</el-button>
            <el-button
              :type="isSelected.lower == '15' && isSelected.upper == '' ? 'primary' : 'text'"
              style="font-size: 16px;"
              class="buttonClass"
              @click="changeSelected('15','')"
            >15天以上</el-button>
          </el-row>
          <el-row style="margin-left: 20px; margin-top: 10px;">
            <div style="display: flex; align-items: center; position: relative">
              <span style="position: absolute; top: 5px; left: 0px;">旅程花费：</span>
              <div @mouseover="showButtons = true" @mouseleave="showButtons = false" style="margin-left: 75px">
                <span>￥</span>
                <el-input v-model="price.minPrice" style="width: 80px;" placeholder="最低价"></el-input>
                <span style="white-space: pre;"> -￥</span>
                <el-input v-model="price.maxPrice" style="width: 80px;" placeholder="最高价"></el-input>
                <div v-if="showButtons" style="margin-left: 30px; margin-top: 10px;">
                  <el-button
                    type="primary"
                    style="background-color: #666666; margin-left: 65px"
                    class="buttonClass"
                    @click="clearInput"
                  >清空</el-button>
                  <el-button
                    type="primary"
                    style="margin-left: 5px"
                    class="buttonClass"
                    @click="selectByPrice"
                  >确定</el-button>
                </div>
              </div>
            </div>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 路线展示列表和右侧边栏 -->
    <div class="listShow">
      <div class="routeList">
        <el-row>
          <el-col :span="24">
            <el-card v-for="(item, index) in routeList" :key="index">
              <!-- 路线标题和评分显示 -->
              <div class="title">
                <!-- 标题【附带跳转和hover】 -->
                <router-link :to="{ path: '/routeDetail/:id', query: { id: item.id } }">
                  <h1>{{ item.title }}</h1>
                </router-link>
                <!-- 评分显示 absolute布局 -->
                <el-rate
                  v-if="item.avgRating !== 0"
                  v-model=item.avgRating
                  allow-half
                  disabled
                  show-score
                  text-color="#ff9900"
                  :colors="colors">
                </el-rate>
              </div>
              <!-- 图片和路线简介 -->
              <div style="display: flex; margin-bottom: 10px;">
                <!-- 图片 采用预览模式 el-image扩展组件 -->
                <image-preview :src="item.coverImg" :width="220" :height="150" style="margin-right: 10px;" />
                <!-- 路线信息 路线简介 -->
                <div class="routeInfo">
                  <p>{{ item.introduction }}</p>
                </div>
              </div>
              <!-- 底部信息 -->
              <div class="bottomInfo clearfix">
                <div style="display: flex; align-items: center; height: 28px;">
                  <time class="time">{{ item.updateTime }}</time>
                </div>
                <el-tag class="tag" v-if="item.day !== null && item.cost !== null">
                  <i class="el-icon-date" />{{item.day}}天
                  <i class="el-icon-money" />{{item.cost}}￥
                </el-tag>
                <div class="userInfo">
                  <el-avatar size="small" :src="'/dev-api' + item.avatar"></el-avatar>
                  <span style="margin-left: 5px; font-size: 14px; color: #666666;">{{ item.userName }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="RecSpot">

      </div>
    </div>
    <!-- 页脚 -->
    <Footer style="margin-top: 30px;"/>
  </div>
</template>

<script>
const axios = require('axios')
const qs = require('qs')
const ele = require('element-ui')
import {getListByDay, getListByPrice, getRouteList} from "@/api/route/route";
import Footer from "@/layout/components/Footer.vue";
import { getRouteAVGRating } from "@/api/routeRating/routeRating"

export default {
  components: {
    Footer,
  },
  data() {
    return {
      routeList: [],
      isSelected: {
        lower: '',
        upper: ''
      },
      showButtons: false,
      price: {
        minPrice: '',
        maxPrice: ''
      },
      ratingValue: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      rating: null,
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      getRouteList().then(response => {
        const promises = response.rows.map(route => {
          const id = route.id;
          return getRouteAVGRating(id).then((res) => {
            const avgRating = res.data;
            const newDate = new Date(route.updateTime);
            const day = `${newDate.getDate()}`;
            const date = `/${newDate.toLocaleString('en-US', { month: 'short' })}. ${newDate.getFullYear()}`;
            return {
              ...route,
              avgRating,
              day,
              date
            };
          });
        });
        Promise.all(promises).then(results => {
          this.routeList = results;
        });
      });
    },
    changeSelected(lower, upper) {
      this.isSelected.lower = lower;
      this.isSelected.upper = upper;
      this.loading = true;
      const data = this.isSelected;
      if (lower == '' && upper == '') {
        this.getList();
      } else {
        getListByDay(data).then((res) =>{
          this.routeList = res.data;
          this.loading = false;
        })
      }
    },
    clearInput() {
      this.price.minPrice = '';
      this.price.maxPrice = '';
      this.selectByPrice();
    },
    selectByPrice() {
      if (this.price.minPrice > this.price.maxPrice) {
        this.$notify.error({
          title: '错误',
          message: '最低值不得高于最高值！'
        })
      } else {
        this.loading = true;
        const data = this.price;
        getListByPrice(data).then((res) => {
          this.routeList = res.data;
          this.loading = false;
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  width: 1050px;
  height: 350px;
  border-radius: 5px;
  margin-top: 5px;
  background-color: #999999;
  box-shadow: 0 0 2px 0 #999999;
  .imgInfo {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 5px;
    .date {
      font-size: 20px;
      font-family: "Microsoft Yahei";
      line-height: 1.2;
      color: #FFFFFF;
      text-shadow: 1px 1px 1px #000000;
      .day {
        font-size: 30px;
      }
    }
    h1 {
      margin: 5px 0 0 10px;
      font-size: 28px;
      font-family: "Microsoft Yahei";
      line-height: 1.2;
      color: #FFFFFF;
      text-shadow: 1px 1px 1px #000000;
    }
  }
}
.filter {
  width: 1050px;
  height: 200px;
  border-radius: 5px;
  margin: 10px 0;
  background-color: #f9fafc;
  box-shadow: 0 0 2px 0 #999999;
  .buttonClass {
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 5px;
  }
}
.listShow {
  display: flex;
  justify-content: center;
  margin-top: -5px;
  .routeList {
    width: 670px;
    .el-card {
      margin: 10px auto;
      width: 670px;
    }
    ::v-deep .el-card__body {
      padding: 5px 10px 5px 15px;
    }
    .title {
      position: relative;
      h1 {
        font-size: 26px;
        font-weight: bold;
        margin: 15px 0 15px 5px;
        cursor: pointer;
      }
      h1:hover {
        color: #1ab394;
      }
      .el-rate {
        position: absolute;
        top: -15px;
        left: 520px;
      }
    }
    .routeInfo {
      flex: 1;
      height: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0px 5px;
      margin-top: 5px;
      p {
        color: #666666;
        margin: 5px 0;
      }
    }
    .bottomInfo {
      display: flex;
      position: relative;
      .time {
        font-size: 12px;
        color: #999;
        margin-left: 5px;
      }
      .tag {
        margin-left: 20px;
      }
      .userInfo {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 550px;
      }
    }
  }
  .RecSpot {
    width: 330px;
    margin-left: 50px;
    margin-top: 10px;
    height: 200px;
    border-radius: 5px;
    background-color: #1ab394;
  }
}
::v-deep .el-rate__icon{
  margin-right: 0;
}
::v-deep .el-rate__text {
  margin-left: 5px;
}
</style>
