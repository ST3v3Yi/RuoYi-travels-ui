<template>
  <div class="routelist-main">
    <template>
      <el-row class="bgHead">
        <div style="margin-top: 10px;">
          <span style="font-size: 28px; font-weight: bold; margin-left: 20px;">路线分享</span>
          <div style="display: flex; justify-content: right; margin-top: -31px; margin-right: 20px;">
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
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card v-for="(item, index) in routeList" :key="index" style="margin: 20px auto; width: 1050px;">
            <div style="display: flex;">
              <router-link :to="{ path: '/routeDetail/:id', query: { id: item.id } }">
                <image-preview :src="item.coverImg" :width="240" :height="180" style="margin-right: 10px;" />
              </router-link>
              <div style="flex: 1; height: 180px; overflow: hidden; text-overflow: ellipsis; padding: 10px 20px;" align="left">
                <router-link :to="{ path: '/routeDetail/:id', query: { id: item.id } }">
                  <h2 style="margin-top: -5px;">{{ item.title }}</h2>
                </router-link>
                <p style="margin-left: 10px;">{{ item.introduction }}</p>
              </div>
            </div>
            <div class="bottom clearfix" align="left">
              <time class="time">{{ item.updateTime }}</time>
              <el-tag class="tag">
                <i class="el-icon-date" />
                {{item.day}}
                <i class="el-icon-money" />
                {{item.cost}}
              </el-tag>
              <!--                <el-rate
                                v-model="ratingValue"
                                allow-half
                                disabled
                                show-score
                                text-color="#ff9900"
                                :colors="colors"
                                style="margin-left: 30px;"
                                @change="getRouteRating(item.id)">
                              </el-rate>-->
              <el-button type="text" class="button">
                <router-link :to="{ path: '/routeDetail/:id', query: { id: item.id } }">查看详情</router-link>
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </template>
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
        ratingValue: 0,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      }
    },
    mounted() {
      this.getList();
      // this.getRouteRating();
    },
    methods: {
      getList() {
        this.loading = true;
        getRouteList().then(response => {
          this.routeList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // getRouteRating(id) {
      //   getRouteAVGRating(id).then((res) => {
      //     this.avgRating = res.data;
      //   })
      // },
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
        if (this.minPrice > this.maxPrice) {
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

<style>
.site-card th {
    border: none;
}
.time {
  font-size: 13px;
  color: #999;
  margin-left: 10px;
}

.tag {
  font-size: 13px;
  margin-left: 10px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
  margin-right: 10px;
  margin-bottom: 10px;
}

.el-card__body :scope {
  padding-right: 20px;
  height: 220px;
  margin-bottom: 20px;
}

.grid-cont-right h2 {
    color: #42b983;
}

.el-footer {
  border: none;
  padding: 0;
  background-color: #e8e8e8;
  color: #666666;
  text-align: center;
  line-height: 60px;
}

.bgHead {
  width: 1050px;
  border-radius: 4px;
  background-color: #f9fafc;
  margin: 10px auto;
  height: 200px;
}

.buttonClass {
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 4px;
}

.bgButton {
  border-radius: 5px;
  background-color: #f5f5f5;
  position: absolute;

}
</style>
