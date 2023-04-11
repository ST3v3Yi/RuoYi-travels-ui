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
        <h1>{{ spot.spotName }}</h1>
        <div class="spotFavorite">
          <i :class="iconClass" @click="toggleFavorite" style="margin-right: 5px;"/>
          <span @click="toggleFavorite" style="cursor: pointer; transform: scale(1.1);">{{ isFavorite ? '已收藏' : '收藏' }}</span>
        </div>
      </div>
      <div style="display: flex; justify-content: center">
        <el-divider class="topDivider"></el-divider>
      </div>
      <div class="topMenu" ref="topMenu" :class="{ fixed: isTopMenuFixed }">
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
            <el-image :src="spotImg[0]" style="object-fit: cover; width: 100%; height: 100%;" :preview-src-list="spotImg"/>
          </div>
          <div class="rightImg">
            <div class="img01">
              <img :src="spotImg[1]" style="object-fit: cover; width: 100%; height: 100%;"/>
            </div>
            <div class="img02">
              <img :src="spotImg[2]" style="object-fit: cover; width: 100%; height: 100%;"/>
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
          <h1>地图组件位置</h1>
        </div>
        <div class="aroundSpot">
          <div class="poiTitle">周边景区</div>
          <ul style="height: 328px; overflow-y: auto; margin: 0; padding: 0; background-color: #1ab394">
            <li style="list-style:none; background-color: #fafafa; display: flex; align-items: center; position:relative;">
              <img style="width: 80px; height: 80px;" :src="require('@/assets/weatherIcons/100.png')">
              <span style="color: #333">周边景区名字</span>
              <el-button type="text" style="position: absolute; top: 55px; right: 25px;" @click="">路线规划</el-button>
              <el-divider style="position: absolute; margin: 5px 0; top: 80px;"></el-divider>
            </li>
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
            <el-row>
              <el-col :span="2">
                <el-avatar :size="50" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
              </el-col>
              <el-col :span="20">
                <div style="margin-top: 10px; font-size: 14px; display: flex; color: #333">
                  <span>点评人</span>
                  <el-rate
                    v-model="value"
                    disabled
                    text-color="#ff9900"
                    :colors="colors"
                    style="margin-left: 10px;"></el-rate>
                </div>
                <div>
                  <span style="display: block; font-size: 14px; color: #666666; white-space: pre-wrap; margin-bottom: 10px;">{{ this.commentContent }}</span>
                  <div style="display: flex;">
                    <div v-if="imgList.length" v-for="item in imgList" :key="item.id">
                      <image-preview style="width: 200px; height: 120px; margin: 0 10px 10px 0;" :src="item.url" />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <Footer style="margin-top: 30px;"/>
  </div>
</template>

<script>
import axios from "axios";
import 'qweather-icons/font/qweather-icons.css'
import Footer from "@/layout/components/Footer.vue";
import {getSpot} from "@/api/spot/spot";
export default {
  components: {
    Footer,
  },
  data() {
    return {
      API_KEY: 'e09cd1c5806442918d2451381dfc322b',
      cityId: '101180801',
      isFavorite: false,
      activeIndex: '1',
      weather: {},
      spotImg: [],
      spot: {},
      center: [114.341599, 34.80764],
      value: 5,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      commentContent: " 清明上河园，是中国河南省开封市著名的历史文化景区，也是中国十大历史文化名园之一。这座园林座落于漫长而曲折的清明上河图的河畔，是一座以宋代北方城市风貌为特色的园林景区。在这里，游客可以欣赏到古老的城市文化，领略到传统的建筑风格和园林艺术。\n" +
        "清明上河园的布局和建筑设计非常巧妙，巧妙地将北方的城市文化和园林艺术结合起来。园内的建筑、古迹和景观构成了一幅具有浓郁历史气息的图画，使游客仿佛穿越时空，回到了宋代的开封城。\n" +
        "园内最著名的景点是仿宋建筑的北风梗、南风梗、文庙、水陆庵等，以及建于北宋的升仙亭、钓鱼台、歌台等。这些古迹和建筑给游客留下了深刻的印象，并且使他们更好地了解了中国的历史和文化。\n" +
        "此外，园内的园林景观也非常美丽。游客可以欣赏到美丽的湖泊、水榭、廊桥和花园，同时还可以在这里散步、欣赏、拍照或者乘船游览，感受这座古老城市的魅力。\n" +
        "总之，清明上河园是一座富有历史、文化和园林艺术价值的景区。游客在这里不仅可以了解到中国的传统文化和历史，还可以享受美丽的园林景观，感受到中国古老城市的气息。无论是文化爱好者，还是旅游者，都不容错过这个迷人的地方。",
      imgList: [
        { id:1, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { id:2, url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { id:3, url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg' },
      ],
      isTopMenuFixed: false,
    }
  },
  props: {
    topDistance: {
      type: Number,
      required: true,
      default: 0
    },
  },
  computed: {
    iconClass() {
      return this.isFavorite ? 'el-icon-star-on' : 'el-icon-star-off'
    },
  },
  mounted() {
    window.onload = () => {
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
    };
    this.getWeather();
    this.getSpotDetail();
  },
  methods: {
    getSpotDetail() {
      const id = this.$route.query.id;
      // GET景区信息
      getSpot(id).then((res) => {
        this.spot = res.data;
        const imgArray = this.spot.spotImg.split(",");
        for (let i = 0; i < imgArray.length; i++) {
          this.spotImg.push('/dev-api' + imgArray[i]);
        }
      });
    },
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
    toggleFavorite() {
      if (!this.isFavorite) {
        this.isFavorite = true;
      } else {
        this.isFavorite = false;
      }
    },
    comment() {
      this.scrollToSection('#spotComments');
    },
    scrollToSection(selector) {
      const targetElement = document.querySelector(selector)
      const offsetTop = targetElement.offsetTop
      this.$nextTick(() => {
        this.$emit('scrollTo', offsetTop);
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
  height: 190px;
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
  margin-left: 750px;
}
.spotName {
  position: absolute;
  left: 22.65%;
  margin-top: 50px;
  display: flex;
  align-items: center;
}
.spotFavorite {
  margin-left: 800px;
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
  margin: 120px 0 5px 0;
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
    height: 680px;
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
  background-color: #666;
  .mapContainer {
    width: 500px;
    height: 360px;
    margin-left: 20px;
    margin-top: 20px;
    background-color: #ff9900;
  }
  .aroundSpot {
    width: 300px;
    height: 360px;
    margin-left: 100px;
    margin-top: 20px;
    background-color: #ff9900;
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
  background-color: #666;
  .commentsWrapper {
    width: 1050px;
    background-color: #d4d4d4;
    .el-divider--horizontal {
      margin: 5px 0;
      background-color: #DCDFE6;
    }
    .commentContainer {
      width: 1000px;
      background-color: #30B08F;
      .el-avatar {
        margin: 15px;
      }
      .image-preview {
        width: 200px;
        height: 120px;
      }
    }
  }
}
::v-deep .el-rate__icon{
  margin-right: 0;
}
</style>
