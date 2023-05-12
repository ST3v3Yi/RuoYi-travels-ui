<template>
  <div style="position: relative;">
    <div class="topImg">
      <img :src="require('@/assets/topImg.jpg')" style="width: 100%; height: 100%" />
    </div>
    <div class="topMenu">
      <el-menu :router="true" :default-active="activeIndex" mode="horizontal" active-text-color="#2a9d8f">
        <el-menu-item index="/personalCenter">个人中心</el-menu-item>
        <el-menu-item index="/personalRoute">我的路线</el-menu-item>
        <el-menu-item index="/personalFavorite">我的收藏</el-menu-item>
        <el-menu-item index="/personalOrder">我的订单</el-menu-item>
      </el-menu>
    </div>
    <div class="InfoContainer">
      <div class="userInfo" v-if="user.avatar">
        <el-avatar :src="'/dev-api' + user.avatar" class="userAvatar" />
        <span class="userName">{{ user.nickName }}</span>
        <div class="routeAndComment">
          <div class="route">
            <p class="number">{{ routeTotal }}</p>
            <p class="intro">路线</p>
          </div>
          <div class="comments">
            <p class="number">{{ favoriteNum }}</p>
            <p class="intro">收藏</p>
          </div>
        </div>
      </div>
      <div class="Info">
        <router-link to="/writeRoute">
          <div class="writeRoute option">
            <svg t="1683812583696" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2847" width="60" height="60">
              <path d="M659.655431 521.588015q23.970037-6.71161 46.022472-13.423221 19.17603-5.752809 39.310861-11.505618t33.558052-10.546816l-13.423221 50.816479q-5.752809 21.093633-10.546816 31.640449-9.588015 25.88764-22.531835 47.940075t-24.449438 38.35206q-13.423221 19.17603-27.805243 35.475655l-117.932584 35.475655 96.838951 17.258427q-19.17603 16.299625-41.228464 33.558052-19.17603 14.382022-43.625468 30.202247t-51.29588 29.243446-59.925094 13.902622-62.801498-4.314607q-34.516854-4.794007-69.033708-16.299625 10.546816-16.299625 23.011236-36.434457 10.546816-17.258427 25.40824-40.749064t31.161049-52.254682q46.022472-77.662921 89.168539-152.449438t77.662921-135.191011q39.310861-69.992509 75.745318-132.314607-45.06367 51.775281-94.921348 116.014981-43.146067 54.651685-95.88015 129.917603t-107.385768 164.434457q-11.505618 18.217228-25.88764 42.187266t-30.202247 50.816479-32.599251 55.131086-33.078652 55.131086q-38.35206 62.322097-78.621723 130.397004 0.958801-20.134831 7.670412-51.775281 5.752809-26.846442 19.17603-67.116105t38.35206-94.921348q16.299625-34.516854 24.928839-53.692884t13.423221-29.722846q4.794007-11.505618 7.670412-15.340824-4.794007-5.752809-1.917603-23.011236 1.917603-15.340824 11.026217-44.58427t31.161049-81.977528q22.052434-53.692884 58.007491-115.535581t81.018727-122.726592 97.797753-117.932584 107.865169-101.153558 110.262172-72.389513 106.906367-32.11985q0.958801 33.558052-6.71161 88.689139t-19.17603 117.932584-25.88764 127.520599-27.805243 117.453184z" p-id="2848" fill="#666" id="write"></path>
            </svg>
            <p>写路线</p>
          </div>
        </router-link>
        <router-link to="/spotList">
          <div class="spotList option">
            <svg t="1683813572690" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4839" width="60" height="60">
              <path d="M20.298018 583.742994a491.651987 419.759008 0 1 0 983.303974 0 491.651987 419.759008 0 1 0-983.303974 0Z" fill="#FFFFFF" p-id="4840"></path>
              <path d="M511.950005 1023.90001c-282.272434 0-511.950005-197.480715-511.950005-440.057026C0 341.066693 229.677571 143.685968 511.950005 143.685968s511.950005 197.480715 511.950005 440.157016c0 242.576311-229.677571 440.057026-511.950005 440.057026z m0-839.418026c-259.974612 0-471.45396 179.182502-471.45396 399.361C40.496045 803.921492 251.975393 983.103994 511.950005 983.103994s471.45396-179.182502 471.453959-399.361S771.924617 184.481984 511.950005 184.481984z" fill="#403F3F" p-id="4841"></path>
              <path d="M349.965824 164.083976h323.968362v105.889659H349.965824z" fill="#666" p-id="4842" id="tick1"></path>
              <path d="M694.132214 290.371643H329.767796V143.685968h364.364418v146.685675z m-323.968363-40.796016h283.572308v-65.093643H370.163851v65.093643z" fill="#403F3F" p-id="4843"></path>
              <path d="M417.659213 20.398008L246.47593 164.083976h530.94815L606.240797 20.398008z" fill="#FFFFFF" p-id="4844"></path>
              <path d="M777.42408 184.481984h-530.94815c-8.49917 0-16.098428-5.399473-18.998145-13.498682-2.899717-8.099209-0.499951-17.09833 6.099405-22.597793L404.760473 4.699541c3.599648-2.999707 8.199199-4.699541 12.89874-4.699541h188.581584c4.699541 0 9.299092 1.699834 12.89874 4.699541l171.183283 143.685968c6.599356 5.499463 8.999121 14.498584 6.099404 22.597793-2.899717 8.099209-10.498975 13.498682-18.998144 13.498682z m-475.053608-40.796016h419.059076L598.94151 40.796016H424.9585L302.370472 143.685968z" fill="#403F3F" p-id="4845"></path>
              <path d="M479.353188 237.376819h-46.195489c-11.198906 0-20.198028-9.099111-20.198027-20.398008 0-11.298897 9.099111-20.398008 20.198027-20.398008h46.195489c11.198906 0 20.198028 9.099111 20.198028 20.398008 0 11.298897-8.999121 20.398008-20.198028 20.398008zM590.74231 237.376819h-46.195488c-11.198906 0-20.198028-9.099111-20.198028-20.398008 0-11.298897 9.099111-20.398008 20.198028-20.398008h46.195488c11.198906 0 20.198028 9.099111 20.198028 20.398008 0 11.298897-9.099111 20.398008-20.198028 20.398008z" fill="#FFFFFF" p-id="4846"></path>
              <path d="M680.433551 269.973635h-336.967093L213.879113 388.862025h596.141783z" fill="#FFFFFF" p-id="4847"></path>
              <path d="M810.020896 409.260033H213.879113c-8.39918 0-15.798457-5.199492-18.898154-12.99873-2.999707-7.899229-0.899912-16.79836 5.299482-22.397813l129.587345-118.88839c3.699639-3.399668 8.59916-5.299482 13.598672-5.299482h336.867103c4.999512 0 9.899033 1.899814 13.598672 5.299482l129.587345 118.88839c6.199395 5.699443 8.29919 14.598574 5.299483 22.397813-2.999707 7.799238-10.498975 12.998731-18.798165 12.99873z m-543.84689-40.796016h491.551997l-85.09169-78.092374H351.265697l-85.091691 78.092374z" fill="#403F3F" p-id="4848"></path>
              <path d="M282.972366 388.862025h457.855288V502.050972H282.972366z" fill="#666" p-id="4849" id="tick2"></path>
              <path d="M761.125671 522.44898H262.774338v-153.984963h498.251343v153.984963z m-457.855287-40.796016h417.459232v-72.392931H303.270384v72.392931z" fill="#403F3F" p-id="4850"></path>
              <path d="M411.159848 465.854506H364.964359c-11.198906 0-20.198028-9.099111-20.198028-20.398008s8.999121-20.398008 20.198028-20.398008h46.195489c11.198906 0 20.198028 9.099111 20.198027 20.398008s-9.099111 20.398008-20.198027 20.398008zM535.047749 465.854506h-46.195488c-11.198906 0-20.198028-9.099111-20.198028-20.398008s9.099111-20.398008 20.198028-20.398008h46.195488c11.198906 0 20.198028 9.099111 20.198028 20.398008s-9.099111 20.398008-20.198028 20.398008zM658.935651 465.854506h-46.195489c-11.198906 0-20.198028-9.099111-20.198027-20.398008s9.099111-20.398008 20.198027-20.398008H658.935651c11.198906 0 20.198028 9.099111 20.198027 20.398008s-8.999121 20.398008-20.198027 20.398008z" fill="#FFFFFF" p-id="4851"></path>
              <path d="M745.227224 502.050972H278.672786L149.085441 626.638805h725.729128z" fill="#FFFFFF" p-id="4852"></path>
              <path d="M874.814569 646.936823H149.085441c-8.29919 0-15.698467-5.099502-18.798164-12.798751s-1.199883-16.598379 4.799531-22.297822l129.587345-124.587833c3.699639-3.599648 8.69915-5.599453 13.898643-5.599453h466.454447c5.199492 0 10.199004 1.999805 13.898643 5.599453l129.587345 124.587833c5.999414 5.799434 7.899229 14.598574 4.799531 22.297822s-10.298994 12.79875-18.498193 12.798751z m-675.234059-40.696026h624.639l-87.191485-83.791817H286.771995l-87.191485 83.791817z" fill="#403F3F" p-id="4853"></path>
              <path d="M228.477688 626.638805h566.944634v169.683429h-566.944634z" fill="#666" p-id="4854" id="tick3"></path>
              <path d="M815.62035 816.720242H208.27966V606.240797h607.34069v210.479445z m-566.944635-40.796016h526.54858v-128.987403H248.675715v128.987403z" fill="#403F3F" p-id="4855"></path>
              <path d="M563.844937 675.234059H460.055073c-2.099795 0-3.699639 1.699834-3.699639 3.699639v160.484328c0 2.099795 1.699834 3.699639 3.699639 3.699638H563.944927c2.099795 0 3.699639-1.699834 3.699639-3.699638V678.933698c0-1.999805-1.699834-3.699639-3.799629-3.699639z" fill="#FFFFFF" p-id="4856"></path>
              <path d="M363.864466 731.828532h-46.195488c-11.198906 0-20.198028-9.099111-20.198028-20.398008 0-11.298897 9.099111-20.398008 20.198028-20.398008h46.195488c11.198906 0 20.198028 9.099111 20.198028 20.398008 0 11.298897-8.999121 20.398008-20.198028 20.398008zM706.231032 731.828532h-46.195489c-11.198906 0-20.198028-9.099111-20.198027-20.398008 0-11.298897 9.099111-20.398008 20.198027-20.398008h46.195489c11.198906 0 20.198028 9.099111 20.198028 20.398008 0 11.298897-9.099111 20.398008-20.198028 20.398008z" fill="#FFFFFF" p-id="4857"></path>
              <path d="M878.914169 794.122449H144.985841c-13.698662 0-26.497412 6.799336-33.99668 17.998242L27.297334 938.408359c-18.598184 28.097256 2.099795 65.093643 36.496436 65.093643h896.51245c34.396641 0 55.09462-36.996387 36.496436-65.093643l-83.791817-126.287668c-7.599258-11.198906-20.398008-17.998242-34.09667-17.998242z" fill="#666" p-id="4858" id="tick4"></path>
              <path d="M960.20623 1023.90001H63.69378c-23.797676 0-45.395567-12.89874-56.394493-33.69671-10.698955-20.298018-9.599063-43.895713 3.199688-63.093838l83.791817-126.287667c11.198906-16.89835 30.197051-26.997364 50.695049-26.997364h733.928328c20.597988 0 39.496143 10.099014 50.795039 27.097354l83.791817 126.287667c12.69876 19.198125 13.898643 42.795821 3.199688 63.093839-11.098916 20.697979-32.696807 33.596719-56.494483 33.596719zM144.985841 814.520457c-6.899326 0-13.498682 3.399668-17.19832 8.899131L43.995704 949.807245c-6.199395 9.299092-2.799727 17.898252-1.099893 21.19793 3.999609 7.599258 11.798848 12.098818 20.797969 12.098819h896.51245c8.999121 0 16.698369-4.499561 20.797969-12.098819 1.699834-3.299678 5.099502-11.898838-1.099893-21.19793l-83.791817-126.287667c-3.699639-5.499463-10.199004-8.899131-17.19832-8.899131H144.985841z" fill="#403F3F" p-id="4859"></path>
              <path d="M811.72073 919.210233H190.581389c-11.198906 0-20.198028-9.099111-20.198028-20.398008 0-11.298897 9.099111-20.398008 20.198028-20.398008h621.139341c11.198906 0 20.198028 9.099111 20.198028 20.398008 0 11.298897-9.099111 20.398008-20.198028 20.398008z" fill="#FFFFFF" p-id="4860"></path>
            </svg>
            <p>观景点</p>
          </div>
        </router-link>
        <router-link to="/hotelList">
          <div class="hotel option">
            <svg t="1683814680386" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9253" width="60" height="60">
              <path d="M277.333333 320v-42.666667h256v42.666667H277.333333z m0 128v-42.666667h256v42.666667H277.333333z m0 128v-42.666667h256v42.666667H277.333333z m0 128v-42.666667h256v42.666667H277.333333z m618.666667 170.666667V384a21.333333 21.333333 0 0 0-21.333333-21.333333h-128a21.333333 21.333333 0 0 0-21.333334 21.333333v490.666667h-42.666666V149.397333A42.730667 42.730667 0 0 0 640.064 106.666667H170.602667A42.666667 42.666667 0 0 0 128 149.397333V874.666667H85.333333v42.666666h853.333334v-42.666666h-42.666667z" fill="#666666" p-id="9254" id="hotelTick"></path>
            </svg>
            <p>订酒店</p>
          </div>
        </router-link>
        <router-link to="/routeList">
          <div class="route option">
            <svg t="1683814457840" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8007" width="60" height="60">
              <path d="M0 0h1024v1024H0z" fill="#FFFFFF" p-id="8008"></path>
              <path d="M149.6 149.6h813.7c22.3 0 40.4 18.1 40.4 40.4v773.3c0 22.3-18.1 40.4-40.4 40.4H149.6" fill="#FFFFFF" p-id="8009"></path>
              <path d="M963.4 1024H149.6c-11.2 0-20.2-9-20.2-20.2s9-20.2 20.2-20.2h813.7c11.1 0 20.2-9.1 20.2-20.2V190.1c0-11.1-9.1-20.2-20.2-20.2H149.6c-11.2 0-20.2-9-20.2-20.2s9-20.2 20.2-20.2h813.7c33.4 0 60.6 27.2 60.6 60.6v773.3c0.1 33.4-27.1 60.6-60.5 60.6z" fill="#403F3F" p-id="8010"></path>
              <path d="M149.6 20.2c-71.2 0-129.4 58.2-129.4 129.4v724.7c0-71.5 57.9-129.4 129.4-129.4S279 802.9 279 874.4V149.6c0-71.1-58.2-129.4-129.4-129.4z" fill="#666" p-id="8011" id="routeTick1"></path>
              <path d="M299.3 874.4h-40.4c0-60.2-49-109.2-109.2-109.2s-109.2 49-109.2 109.2H0V149.6C0 67.1 67.1 0 149.6 0s149.6 67.1 149.6 149.6v724.8z m-149.7-834c-60.2 0-109.2 49-109.2 109.2v622.6c27.3-29.2 66.2-47.4 109.2-47.4s81.9 18.3 109.2 47.4V149.6c0-60.2-49-109.2-109.2-109.2z" fill="#403F3F" p-id="8012"></path>
              <path d="M20.2 874.4c0 71.5 57.9 129.4 129.4 129.4-71.1 0-129.4-58.2-129.4-129.4z" fill="#FFFFFF" p-id="8013"></path>
              <path d="M149.6 1024C67.1 1024 0 956.9 0 874.4h40.4c0 60.2 49 109.2 109.2 109.2v40.4z" fill="#403F3F" p-id="8014"></path>
              <path d="M149.6 1024C67.1 1024 0 956.9 0 874.4s67.1-149.6 149.6-149.6 149.6 67.1 149.6 149.6h-40.4c0-60.2-49-109.2-109.2-109.2s-109.2 49-109.2 109.2 49 109.2 109.2 109.2v40.4z" fill="#403F3F" p-id="8015"></path>
              <path d="M895.8 600c0 47.4-85.9 191.6-85.9 191.6S724 647.4 724 600s38.5-85.9 85.9-85.9 85.9 38.4 85.9 85.9z" fill="#666" p-id="8016" id="routeTick2"></path>
              <path d="M809.9 811.8c-7.1 0-13.7-3.8-17.4-9.9-14.8-24.9-88.8-151.5-88.8-202 0-58.5 47.6-106.1 106.1-106.1S916.1 541.5 916.1 600c0 50.5-73.9 177.1-88.7 202-3.7 6.1-10.3 9.8-17.5 9.8z m0-277.5c-36.2 0-65.7 29.5-65.7 65.7 0 25.4 35.3 96.8 65.7 151.2 30.4-54.3 65.7-125.8 65.7-151.2 0-36.2-29.4-65.7-65.7-65.7z" fill="#403F3F" p-id="8017"></path>
              <path d="M809.9 597.5m-35 0a35 35 0 1 0 70 0 35 35 0 1 0-70 0Z" fill="#FFFFFF" p-id="8018"></path>
              <path d="M605.2 302H382.9c-11.2 0-20.2-9-20.2-20.2s9-20.2 20.2-20.2h222.3c11.2 0 20.2 9 20.2 20.2s-9 20.2-20.2 20.2zM513.6 894.6h-90.3c-33.4 0-60.6-27.2-60.6-60.6v-85.2c0-33.2 27-60.4 60.2-60.6l157.2-1.2c7.7-0.1 14.9-4.6 18.2-11.6 4.7-10.1 16.8-14.4 26.9-9.7 10.1 4.7 14.5 16.8 9.7 26.9-9.9 21-31.2 34.7-54.4 34.9l-157.2 1.2c-11.1 0.1-20.1 9.2-20.1 20.2V834c0 11.1 9.1 20.2 20.2 20.2h90.3c11.2 0 20.2 9 20.2 20.2-0.1 11.1-9.2 20.2-20.3 20.2z m103.9-250.8c-8.1 0-15.7-4.9-18.8-12.8-3.1-7.8-10.4-12.8-18.8-12.8H423.3c-33.4 0-60.6-27.2-60.6-60.6v-88.1c0-33.4 27.2-60.6 60.6-60.6H508c11.2 0 20.2 9 20.2 20.2s-9 20.2-20.2 20.2h-84.7c-11.1 0-20.2 9.1-20.2 20.2v88.1c0 11.1 9.1 20.2 20.2 20.2h156.6c25.1 0 47.3 15.1 56.5 38.5 4.1 10.4-1 22.1-11.4 26.2-2.5 0.8-5 1.3-7.5 1.3z m156.1-194.7H569.2c-11.2 0-20.2-9-20.2-20.2s9-20.2 20.2-20.2h204.4c11.1 0 20.2-9.1 20.2-20.2v-66.2c0-11.1-9.1-20.2-20.2-20.2H666.4c-11.2 0-20.2-9-20.2-20.2s9-20.2 20.2-20.2h107.2c33.4 0 60.6 27.2 60.6 60.6v66.2c0 33.4-27.1 60.6-60.6 60.6zM798 894.6H575.7c-11.2 0-20.2-9-20.2-20.2s9-20.2 20.2-20.2H798c11.2 0 20.2 9 20.2 20.2 0 11.1-9 20.2-20.2 20.2z" fill="#403F3F" p-id="8019"></path></svg>
            <p>看攻略</p>
          </div>
        </router-link>
      </div>
      <div class="personalRoute">
        <div class="title">
          <span>我的收藏</span>
        </div>
        <div class="cardContainer" v-if="routeList">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="收藏路线" name="1">
              <el-card class="card" v-for="(item, index) in routeList" :key="index">
                <router-link :to="{ path: '/routeDetail/:id', query: { id: item.id } }">
                  <div class="cardContent">
                    <img :src="'/dev-api' + item.coverImg" style="width: 250px; height: 130px;"/>
                    <div class="routeInfo">
                      <h1>{{ item.title }}</h1>
                    </div>
                  </div>
                </router-link>
              </el-card>
              <el-pagination
                hide-on-single-page
                @current-change="handleRouteCurrentChange"
                :current-page.sync="routePageNum"
                :page-size="3"
                layout="total, prev, pager, next"
                :total="routeTotal">
              </el-pagination>
            </el-collapse-item>
            <el-collapse-item title="收藏景点" name="2">
              <el-card class="card" v-for="(item, index) in spotList" :key="index">
                <router-link :to="{ path: '/spotDetail/:id', query: { id: item.id } }">
                  <div class="cardContent">
                    <img :src="'/dev-api' + item.coverImg" style="width: 250px; height: 130px;"/>
                    <div class="routeInfo">
                      <h1>{{ item.spotName }}</h1>
                      <h2>{{ item.spotForeignName }}</h2>
                    </div>
                  </div>
                </router-link>
              </el-card>
              <el-pagination
                hide-on-single-page
                @current-change="handleSpotCurrentChange"
                :current-page.sync="spotPageNum"
                :page-size="2"
                layout="total, prev, pager, next"
                :total="spotTotal">
              </el-pagination>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <Footer style="margin-top: 980px;"/>
  </div>
</template>

<script>
import Footer from "@/layout/components/Footer.vue";
import { getUserProfile } from "@/api/system/user";
import {getUserFavoriteRoute} from "@/api/routeFavorite/routeFavorite";
import {getUserFavoriteSpot} from "@/api/spotFavorite/spotFavorite";

export default {
  components: {
    Footer
  },
  data() {
    return {
      activeIndex: '/personalFavorite',
      user: {},
      routeList: null,
      spotList: null,
      favoriteNum: 0,
      activeNames: 1,
      routeTotal: 0,
      routePageNum: 1,
      spotTotal: 0,
      spotPageNum: 1,
    }
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data;
        getUserFavoriteRoute(this.user.userId).then((res) => {
          this.routeTotal = res.data.length;
          this.routeList = res.data
            .slice(( this.routePageNum - 1 ) * 3, this.routePageNum * 3);
          this.favoriteNum = this.favoriteNum + this.routeTotal;
        })
        getUserFavoriteSpot(this.user.userId).then((res) => {
          this.spotTotal = res.data.length;
          this.spotList = res.data
            .slice(( this.spotPageNum - 1 ) * 2, this.spotPageNum * 2);
          this.favoriteNum = this.favoriteNum + this.spotTotal;
        })
      });
    },
    handleRouteCurrentChange(val) {
      this.routePageNum = val;
      this.getUser();
    },
    handleSpotCurrentChange(val) {
      this.spotPageNum = val;
      this.getUser();
    },
  }
}
</script>

<style lang="scss" scoped>
.topImg {
  width: 100vw;
  height: 640px;
}
.topMenu {
  position: absolute;
  width: 100vw;
  height: 60px;
  top: 580px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #eeeeee;
  z-index: 1;
  ::v-deep .el-menu.el-menu--horizontal {
    width: 500px;
    height: 60px;
    margin-left: 680px;
    border-bottom: 1px solid #eeeeee;
  }
  ::v-deep .el-menu-item {
    font-size: 18px;
  }
  ::v-deep .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 3px solid #2ec4b6;
  }
  ::v-deep .el-menu--horizontal > .el-menu-item.is-active {
    font-weight: bold;
  }
}
.InfoContainer {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 1920px;
  height: auto;
  background-color: #f5f7fa;
  .userInfo {
    position: relative;
    display: flex;
    justify-content: center;
    width: 300px;
    height: 180px;
    background-color: #FFFFFF;
    margin-top: 0px;
    z-index: 2;
    .userAvatar {
      position: absolute;
      top: -50px;
      width: 100px;
      height: 100px;
    }
    .userName {
      position: absolute;
      top: 60px;
      font-size: 18px;
      font-family: "Microsoft YaHei";
      font-weight: bold;
      color: #333333;
    }
    .routeAndComment {
      position: absolute;
      display: flex;
      bottom: 0px;
      width: 100%;
      height: 60px;
      border-top: 1px solid #eeeeee;
      .route {
        display: flex;
        flex-wrap: wrap;
        flex-basis: 50%;
        justify-content: center;
        border-right: 1px solid #eeeeee;
      }
      .comments {
        display: flex;
        flex-wrap: wrap;
        flex-basis: 50%;
        justify-content: center;
      }
      .number {
        cursor: pointer;
        margin: 10px 50% 0 50%;
        flex-basis: 100%;
        font-size: 20px;
        font-weight: bold;
        color: #333333;
      }
      .number:hover {
        color: #1ab394;
      }
      .intro {
        margin: 0;
        font-size: 16px;
        color: #999999;
      }
    }
  }
  .Info {
    position: relative;
    display: flex;
    width: 740px;
    height: 118px;
    background-color: #FFFFFF;
    margin-top: 10px;
    margin-left: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #eeeeee;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    z-index: 2;
    .option {
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 180px;
      border-right: 1px solid #eeeeee;
      svg {
        flex-basis: 100%;
      }
      p {
        font-size: 16px;
        color: #999999;
        margin: 0;
      }
    }
    .route {
      border: 0px;
    }
    .option:hover {
      #write {
        fill: #1ab394;
      }
      #tick1, #tick2, #tick3, #tick4 {
        fill: #1ab394;
      }
      #hotelTick {
        fill: #1ab394;
      }
      #routeTick1, #routeTick2 {
        fill: #1ab394;
      }
      p {
        color: #333333;
      }
    }
  }
  .personalRoute {
    position: absolute;
    top: 140px;
    left: 745px;
    width: 740px;
    height: auto;
    background-color: #FFFFFF;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #eeeeee;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    z-index: 2;
    .title {
      font-size: 18px;
      font-weight: 700;
      color: #333333;
    }
    .cardContainer {
      width: 98%;
      height: auto;
      margin-left: 1%;
      margin-top: 10px;
      .card {
        position: relative;
        width: 100%;
        height: 140px;
        margin-bottom: 10px;
        cursor: pointer;
      }
      .cardContent {
        display: flex;
        img {
          margin: 5px 5px;
          border-radius: 5px;
        }
        .routeInfo {
          h1 {
            font-size: 24px;
            color: #333333;
            margin: 10px 5px 0 5px;
          }
          h2 {
            font-size: 14px;
            color: #999999;
            margin: 0 5px;
          }
          h1:hover {
            color: #1ab394;
          }
        }
      }
      .routeTag {
        position: absolute;
        bottom: 5px;
        left: 265px;
      }
      .updateRoute {
        position: absolute;
        bottom: 0;
        right: 70px;
      }
      .deleteRoute {
        position: absolute;
        bottom: 0;
        right: 5px;
        color: #C03639;
      }
      ::v-deep .el-card.is-always-shadow {
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
      }
      ::v-deep .el-card__body {
        padding: 0;
      }
      ::v-deep .el-card:hover {
        box-shadow: 0 2px 5px 0 #999;
      }
    }
  }
}
::v-deep .el-collapse-item__header {
  font-size: 16px;
  font-weight: bold;
}
</style>
