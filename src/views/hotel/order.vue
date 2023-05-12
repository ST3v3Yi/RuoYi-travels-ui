<template>
  <div>
    <!-- 填写个人信息界面Header -->
    <div class="orderHeader">
      <router-link to="/home">
        <div class="logo">
          <img :src="require('@/assets/logo.svg')" class="logoImg" />
          <img :src="require('@/assets/name.png')" class="nameImg" />
        </div>
      </router-link>
      <div class="orderStep">
        <el-steps :active="activeIndex" simple finish-status="success" process-status="process">
          <el-step title="已选"></el-step>
          <el-step title="个人信息"></el-step>
          <el-step title="支付"></el-step>
        </el-steps>
      </div>
    </div>
    <!-- 信息展示和个人信息填写 -->
    <div class="infoContainer">
      <div class="infoWrapper" v-if="room && hotel && hotelRating">
        <div class="hotelAndRoomInfo">
          <div class="hotelName">
            <h1>{{ hotel.hotelName }}</h1>
            <el-rate
              disabled
              v-model="hotelRating"
              :colors="colors"
              style="margin-top: 8px; margin-left: 10px;">
            </el-rate>
          </div>
          <div class="hotelLocation">
            <span><i class="el-icon-location" style="font-size: 20px; color: #333; margin-right: 10px;"/>中国，开封，{{ hotel.location }}</span>
          </div>
          <div class="roomInfo" v-if="room">
            <h2>{{ room.roomName }}</h2>
            <div style="margin-top: 5px;">
              <span><i class="el-icon-user" style="font-size: 18px; margin-right: 5px;"/>{{ room.number }}人</span>
              <span style="margin-left: 15px;"><i class="hotel-chuang" style="font-size: 20px; margin-right: 5px;"/>{{ room.bed }}</span>
            </div>
          </div>
        </div>
        <!-- 订单须知 -->
        <div class="UShouldKnow" ref="UShouldKnow" :class="{ fixed: isUShouldKnowFixed }" v-if="!isUShouldKnowFixed && room">
          <p style="font-size: 14px; color: #666666; margin: 0; padding: 5px 0;">{{ roomNum }}间 × {{ dateDiff(dateRange) }}晚</p>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #eeeeee">
            <span style="font-size: 24px; font-weight: bold; color: #333333;">应付总额</span>
            <span style="font-size: 28px; font-weight: bold; color: #1ab394; margin-bottom: 10px;">￥{{ totalPrice }}</span>
          </div>
          <div>
            <p style="font-size: 16px; font-weight: bold; color: #1ab394; margin: 0; padding: 5px 0;">限时取消</p>
            <span style="font-size: 16px; color: #888888;">入住当天23:59前可免费取消修改。逾期不可取消/修改，若未入住将收取您全额房费￥{{  }}。订单需要等酒店或供应商确认后生效，若订单不确认将全额退款至您的付款账户。</span>
          </div>
        </div>
        <!-- 入住时间 -->
        <div class="liveTime" v-if="room">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            :range-separator="dateDiff(dateRange) + '晚'"
            @change="calPrice"
            start-placeholder="入住日期"
            end-placeholder="退房日期">
          </el-date-picker>
          <div class="roomNum">
            <span style="margin-right: 10px; color: #666666;">房间数</span>
            <el-input-number v-model="roomNum" :min="1" :max="room.counts" @change="calPrice"></el-input-number>
          </div>
        </div>
        <!-- 住客信息 -->
        <div class="residentInfo">
          <h1>住客信息</h1>
          <p style="font-size: 14px; color: #999999; margin: 0; padding-bottom: 20px;">请按照实际情况填写，姓名与证件保持一致。</p>
          <p style="font-size: 14px; color: #666666; margin: 0; padding-bottom: 5px;">住客姓名</p>
          <el-input v-model="name" placeholder="姓名" style="margin-bottom: 30px;"></el-input>
          <p style="font-size: 14px; color: #666666; margin: 0; padding-bottom: 5px;">电子邮箱（选填）</p>
          <el-input v-model="email" placeholder="电子邮箱" style="margin-bottom: 30px;"></el-input>
          <p style="font-size: 14px; color: #666666; margin: 0; padding-bottom: 5px;">电话号码</p>
          <el-input v-model="tel" placeholder="电话号码" style="margin-bottom: 10px;"></el-input>
        </div>
        <!-- 到店时间 -->
        <div class="arrivalTime">
          <h1>预计到店</h1>
          <p style="font-size: 14px; color: #666666; margin: 0; padding-bottom: 5px;">到达时间</p>
          <el-time-select
            v-model="arrivalTime"
            :picker-options="{
              start: '14:00',
              step: '00:30',
              end: '24:00'
            }"
            placeholder="到店时间">
          </el-time-select>
          <p style="font-size: 14px; color: #666666; margin: 0; padding: 5px 0;">房间整晚保留</p>
        </div>
        <!-- 发票信息 -->
        <div class="aboutReceipt">
          <h1 style="margin-bottom: 10px;">发票信息</h1>
          <span style="color: #666666">如需要发票，可向酒店索取（酒店可开普票，不可开专票）</span>
        </div>
        <!-- 支付价格 -->
        <div class="payment">
          <span style="font-size: 14px; color: #666666;">支付
            <strong style="font-size: 28px; font-weight: bold; color: #1ab394;">￥{{ totalPrice }}</strong>
          </span>
          <el-button type="primary" @click="goToPay">去支付</el-button>
        </div>
        <el-dialog
          class="payDialog"
          title="支付"
          :visible.sync="paymentInterface"
          width="30%"
          :before-close="handleClose">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 20px; font-weight: bold; color: #333333;">支付金额</span>
            <span style="font-size: 24px; font-weight: bold; color: #1ab394;">￥{{ totalPrice }}</span>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="PayToHotel">支 付</el-button>
          </span>
        </el-dialog>
        <el-dialog
          class="payDialog"
          title="支付成功"
          :visible.sync="paySuccess"
          width="30%">
          <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
            <svg width="100" height="100">
              <circle fill="none" stroke="#68E534" stroke-width="5" cx="50" cy="50" r="48" stroke-linecap="round" transform="rotate(-90 50 50)" class="circle"/>
              <polyline fill="none" stroke="#68E534" stroke-width="5" points="22,53.5,43.25,71,76,34.5" stroke-linecap="round" stroke-linejoin="round" class="tick"/>
            </svg>
            <h2>支付成功</h2>
          </div>
          <span slot="footer" class="dialog-footer">
            <router-link :to="{ path: '/hotelDetail/:id', query: { id: hotel.id } }">
            <el-button type="primary" @click="PaymentSuccess">确 定</el-button>
            </router-link>
          </span>
        </el-dialog>
        <router-link :to="{ path: '/hotelDetail/:id', query: { id: hotel.id } }">
        <el-button type="text" style="position: absolute; left: 0px; top: 1120px; font-size: 16px; font-weight: bold; color: #1ab394;">< 更改我的选择</el-button>
        </router-link>
      </div>
    </div>
    <!-- Footer -->
    <footer class="orderFooter">
      <span>© 2023 东京夢華旅游网. All rights reserved.</span>
    </footer>
  </div>
</template>

<script>
import { getRooms } from "@/api/travels/rooms";
import { getHotel } from "@/api/hotel/hotel";
import {getHotelRating} from "@/api/hotel/hotelComments";
import Stickybits from 'stickybits'
import {getUserProfile} from "@/api/system/user";
import { addOrders } from "@/api/hotel/orders";

export default {
  data() {
    return {
      hotel: null,
      room: null,
      distance: null,
      activeIndex: 1,
      hotelRating: 5,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      isUShouldKnowFixed: false,
      date: new Date(),
      dateRange: ["2023-05-07", "2023-05-08"],
      roomNum: 1,
      name: '',
      email: '',
      tel: '',
      arrivalTime: '14:00',
      totalPrice: 0,
      paymentInterface: false,
      paySuccess: false,
      user: null,
      order: {
        userId: null,
        userName: null,
        email: null,
        telephone: null,
        hotelId: null,
        ownerId: null,
        roomId: null,
        roomNumber: null,
        fromDate: null,
        toDate: null,
        arrivalTime: null,
        createTime: null,
        status: null,
        price: null
      },

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
    today() {
      const year = this.date.getFullYear();
      const month = this.date.getMonth() + 1;
      const day = this.date.getDate();
      return `${year}-${month}-${day}`;
    },
    tomorrow() {
      const year = this.date.getFullYear();
      const month = this.date.getMonth() + 1;
      const day = this.date.getDate() + 1;
      return `${year}-${month}-${day}`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      const UShouldKnow = this.$refs.UShouldKnow;
      if (UShouldKnow) {
        Stickybits(UShouldKnow);
        this.distance = 70;
        let _this = this;
        window.addEventListener('scroll', () => {
          console.log(_this.topDistance);
          if(_this.topDistance < _this.distance) {
            _this.isTopMenuFixed = false;
          } else {
            _this.isTopMenuFixed = true;
          }
        }, true);
      }
    });
    this.getRoomDetail();
    this.getUser();
  },
  methods: {
    getRoomDetail() {
      const today = this.today;
      const tomorrow = this.tomorrow;
      this.dateRange = [today, tomorrow];
      getRooms(this.$route.query.roomId).then((res) => {
        this.room = res.data;
        this.totalPrice = this.room.price;
        getHotel(this.room.hotelId).then((res) =>{
          this.hotel = res.data;
        })
        getHotelRating(this.room.hotelId).then((res) => {
          this.hotel.rating = res.data;
          this.hotelRating = this.hotel.rating.mainRating;
        })
      })
    },
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data;
        this.email = this.user.email;
        this.tel = this.user.phonenumber;
      })
    },
    // 计算总价格
    calPrice() {
      this.totalPrice = this.roomNum * this.room.price * this.dateDiff(this.dateRange);
    },
    dateDiff() {
      if (this.dateRange[0] && this.dateRange[1]) {
        // 将日期字符串转换为 date 对象
        const start = new Date(this.dateRange[0])
        const end = new Date(this.dateRange[1])

        // 计算日期差值并返回天数
        const diffTime = end.getTime() - start.getTime()
        const diffDays = diffTime / (1000 * 60 * 60 * 24)

        return Math.ceil(diffDays) //向上取整
      }
    },
    goToPay() {
      this.activeIndex = 2;
      this.paymentInterface = true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    PayToHotel() {
      // 用户ID
      this.order.userId = this.user.userId;
      // 用户昵称
      this.order.userName = this.name;
      // 用户e-mail
      this.order.email = this.email;
      // 用户手机号
      this.order.telephone = this.tel;
      // 酒店ID
      this.order.hotelId = this.room.hotelId;
      // 酒店方ID
      this.order.ownerId = null;
      // 房间ID
      this.order.roomId = this.room.id;
      // 房间数量
      this.order.roomNumber = this.roomNum;
      // 入住日期
      this.order.fromDate = this.dateRange[0];
      // 离店日期
      this.order.toDate = this.dateRange[1];
      // 到达时间
      this.order.arrivalTime = this.arrivalTime;
      // 订单状态
      this.order.status = 1;
      // 订单价格
      this.order.price = this.totalPrice;
      addOrders(this.order);
      console.log(this.dateRange);
      this.activeIndex = 3;
      this.paymentInterface = false;
      this.paySuccess = true;
    },
    PaymentSuccess() {
      this.paySuccess = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.orderHeader {
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eee;
  background-color: #FFFFFF;
  .logo {
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    left: 430px;
    z-index: 1000;
    .logoImg {
      height: 60px;
    }
    .nameImg {
      height: 50px;
    }
  }
  .orderStep {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 100%;
    ::v-deep .el-steps--simple {
      width: 500px;
      background-color: #FFFFFF;
    }
    ::v-deep .el-step__head.is-success {
      color: #1ab394;
      border-color: #1ab394;
    }
    ::v-deep .el-step__title.is-success {
      color: #1ab394;
    }
  }
}
.infoContainer {
  position: relative;
  width: 100%;
  height: 1170px;
  background-color: #f5f7fa;
  .infoWrapper {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    left: 435px;
    width: 1050px;
    height: auto;
  }
}
.hotelAndRoomInfo {
  width: 650px;
  margin-top: 10px;
  padding: 24px;
  border-radius: 5px;
  border: 1px solid #eeeeee;
  background-color: #FFFFFF;
  .hotelName {
    position: relative;
    display: flex;
    width: 100%;
    h1 {
      font-size: 24px;
      font-weight: 600;
      color: #333333;
      margin: 0;
    }
  }
  .hotelLocation {
    padding: 10px 0;
    span {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #999999;
    }
  }
  .roomInfo {
    padding-bottom: 10px;
    h2 {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
      line-height: 24px;
    }
    span {
      display: inline-flex;
      align-items: center;
      font-size: 16px;
      color: #333333;
    }
  }
}
.liveTime {
  display: flex;
  width: 650px;
  margin-top: 10px;
  padding: 24px;
  border-radius: 5px;
  border: 1px solid #eeeeee;
  background-color: #FFFFFF;
  .roomNum {
    margin-left: 80px;
    ::v-deep .el-input-number--medium {
      width: 100px;
      height: 20px;
    }
    ::v-deep .el-input-number--medium .el-input-number__increase {
      border: 0;
      color: #333333;
      background-color: #eee;
    }
    ::v-deep .el-input-number--medium .el-input-number__decrease {
      border: 0;
      color: #333333;
      background-color: #eee;
    }
    ::v-deep .el-input--medium .el-input__inner {
      padding: 0;
      border: 0px;
    }
  }
}
.residentInfo {
  width: 650px;
  margin-top: 10px;
  padding: 24px;
  border-radius: 5px;
  border: 1px solid #eeeeee;
  background-color: #FFFFFF;
  h1 {
    font-size: 20px;
    font-weight: bold;
    padding: 5px 0;
    margin: 0;
  }
  ::v-deep .el-input--medium .el-input__inner {
    width: 300px;
    padding: 0 5px;
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    border: 0px;
    border-radius: 0;
    border-bottom: 1px solid #999999;
  }
}
.arrivalTime {
  width: 650px;
  margin-top: 10px;
  padding: 24px;
  border-radius: 5px;
  border: 1px solid #eeeeee;
  background-color: #FFFFFF;
  h1 {
    font-size: 20px;
    font-weight: bold;
    padding: 5px 0;
    margin: 0 0 10px 0;
  }
  ::v-deep .el-input--medium .el-input__inner {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    border: 0px;
    border-radius: 0px;
    border-bottom: 1px solid #999999;
  }
}
.aboutReceipt {
  width: 650px;
  margin-top: 10px;
  padding: 24px;
  border-radius: 5px;
  border: 1px solid #eeeeee;
  background-color: #FFFFFF;
  h1 {
    font-size: 20px;
    font-weight: bold;
    padding: 5px 0;
    margin: 0 0 10px 0;
  }
}
.payment {
  position: relative;
  display: flex;
  align-items: center;
  width: 650px;
  margin-top: 10px;
  padding: 24px;
  border: 1px solid #eeeeee;
  background-color: #FFFFFF;
  .el-button--medium {
    position: absolute;
    right: 24px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 0;
  }
}
.UShouldKnow {
  position: sticky;
  margin-top: 10px;
  margin-left: 20px;
  width: 380px;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #eeeeee;
  background-color: #FFFFFF;
}
.UShouldKnow.fixed {
  position: fixed;
  top: 10px;
  right: 0;
  width: 380px;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #eeeeee;
  background-color: #FFFFFF;
}
.orderFooter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #FFFFFF;
  span {
    font-size: 14px;
    color: #999999;
  }
}
.payDialog {
  .circle {
    stroke-dasharray: 301;
    stroke-dashoffset: 301;
  }
  svg .circle {
    animation: circle 1s ease-in-out;
    animation-fill-mode: forwards;
  }
  .tick {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
  }
  svg .tick {
    animation: tick .8s ease-in-out;
    animation-fill-mode: forwards;
    animation-delay: .95s;
  }
  h2 {
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    margin: 0;
    padding: 5px 0;
    opacity: 0;
  }
  h2 {
    animation: .6s title ease-in-out;
    animation-delay: 1.2s;
    animation-fill-mode: forwards;
  }
  ::v-deep .el-dialog__title {
    font-size: 18px;
    font-weight: bold;
  }
  ::v-deep .el-dialog__body {
    padding: 10px 20px;
  }
  @keyframes circle {
    from {
      stroke-dashoffset: 301;
    }
    to {
      stroke-dashoffset: 602;
    }
  }
  @keyframes tick {
    from {
      stroke-dashoffset: 100;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes title {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
::v-deep .el-rate__icon{
  margin-right: 0;
}
::v-deep .el-range-editor--medium .el-range-separator {
  width: 40px;
  color: #666666;
}
</style>
