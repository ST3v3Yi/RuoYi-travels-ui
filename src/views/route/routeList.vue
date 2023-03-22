<template>
<div class="routelist-main">
    <el-container>
      <template>
        <el-row>
          <el-col :span="24">
            <el-card v-for="(item, index) in routeList" :key="index" style="margin: 25px;">
              <div style="display: flex;">
                <router-link :to="{ path: '/routeDetail/:id', query: { id: item.id } }">
                  <image-preview :src="item.coverImg" :width="240" :height="180" style="margin-right: 10px;" />
                </router-link>
                <div style="flex: 1; height: 180px; overflow: hidden; text-overflow: ellipsis; padding: 10px 20px;" align="left">
                  <router-link :to="{ path: '/routeDetail/:id', query: { id: item.id } }">
                    <h2>{{ item.title }}</h2>
                  </router-link>
                  <p>{{ item.introduction }}</p>
                </div>
              </div>
              <div class="bottom clearfix" align="left">
                <time class="time">{{ item.updateTime }}</time>
                <el-tag class="tag">
                  <i class="el-icon-date" />
                  {{item.day}}，￥{{item.cost}}
                </el-tag>
                <el-button type="text" class="button">
                  <router-link :to="{ path: '/routeDetail/:id', query: { id: item.id } }">查看详情</router-link>
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </template>
      <el-footer>到底了</el-footer>
      <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    </el-container>
</div>
</template>

<script>
const axios = require('axios')
const qs = require('qs')
const ele = require('element-ui')
import { listRoute } from "@/api/route/route";

export default {
    data() {
        return {
            routeList: []
        }
    },
    mounted() {
      this.getList()
    },
    methods: {
        getList() {
          this.loading = true;
          listRoute(this.queryParams).then(response => {
            this.routeList = response.rows;
            this.total = response.total;
            this.loading = false;
          });
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
</style>
