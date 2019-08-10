<template>
  <div>
    <div class="nav_border"></div>
    <!-- Hamburger Menu -->
    <div class="hamburger_menu">
      <svg>
        <defs>
          <filter id="gooeyness">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="2.2"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="gooeyness"
            />
            <feComposite in="SourceGraphic" in2="gooeyness" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div class="plates">
        <div
          :class="['plate', 'plate2', { active: HAMBURGER_STATUS }]"
          @click="openMenu"
        >
          <svg
            class="burger"
            version="1.1"
            height="100"
            width="100"
            viewBox="0 0 100 100"
          >
            <path
              class="line line1"
              d="M 50,65 H 70 C 70,65 75,65.198488 75,70.762712 C 75,73.779026 74.368822,78.389831 66.525424,78.389831 C 22.092231,78.389831 -18.644068,-30.508475 -18.644068,-30.508475"
            />
            <path
              class="line line2"
              d="M 50,35 H 70 C 70,35 81.355932,35.300135 81.355932,25.635593 C 81.355932,20.906215 78.841706,14.830508 72.881356,14.830508 C 35.648232,14.830508 -30.508475,84.322034 -30.508475,84.322034"
            />
            <path
              class="line line3"
              d="M 50,50 H 30 C 30,50 12.288136,47.749959 12.288136,60.169492 C 12.288136,67.738339 16.712974,73.305085 40.677966,73.305085 C 73.791674,73.305085 108.47458,-19.915254 108.47458,-19.915254"
            />
            <path
              class="line line4"
              d="M 50,50 H 70 C 70,50 81.779661,50.277128 81.779661,36.607372 C 81.779661,28.952694 77.941689,25 69.067797,25 C 39.95532,25 -16.949153,119.91525 -16.949153,119.91525"
            />
            <path
              class="line line5"
              d="M 50,65 H 30 C 30,65 17.79661,64.618439 17.79661,74.152543 C 17.79661,80.667556 25.093813,81.355932 38.559322,81.355932 C 89.504001,81.355932 135.59322,-21.186441 135.59322,-21.186441"
            />
            <path
              class="line line6"
              d="M 50,35 H 30 C 30,35 16.525424,35.528154 16.525424,24.152542 C 16.525424,17.535987 22.597755,13.559322 39.40678,13.559322 C 80.617882,13.559322 94.067797,111.01695 94.067797,111.01695"
            />
          </svg>
          <svg
            class="x"
            version="1.1"
            height="100"
            width="100"
            viewBox="0 0 100 100"
          >
            <path class="line" d="M 34,32 L 66,68" />
            <path class="line" d="M 66,32 L 34,68" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Navigation Block -->
    <div id="headerAnchor" class="nav_outer">
      <div class="container">
        <nav class="col-lg-12">
          <router-link :to="{ path: '/' }">
            <div
              class="logo_container nav_items_container_mobile_cor col-md-3 col-lg-3"
            >
              <img :src="require('@/assets/images/logo.svg')" />
            </div>
          </router-link>
          <div class="nav_items_container col-md-6 col-lg-7 col-xl-9">
            <ul class="nav_items_container_mobile_cor">
              <!--<li>-->
              <!--<img-->
              <!--class="small_icon"-->
              <!--:src="require('@/assets/images/customer_icon.svg')"-->
              <!--/>-->
              <!--<p>Компании</p>-->
              <!--</li>-->
              <li>
                <img
                  class="small_icon"
                  :src="require('@/assets/images/performer_icon.svg')"
                />
                <p>Все категории</p>
              </li>
              <li>
                <img
                  class="small_icon"
                  :src="require('@/assets/images/nav_help_color_icon.svg')"
                />
                <p>Помощь</p>
              </li>
              <li v-if="$auth.getUser()" class="account_offer_global_styles">
                <div class="account_offer_count">
                  {{ NOTIFICATIONS.length }}
                </div>
                <p>Объявления</p>
                <div :class="['account_offer_list']">
                  <ul :class="['account_offer_list_ul']">
                    <li
                      v-for="notifGod in NOTIFICATIONS"
                      class="account_offer_list_item"
                      @click="openSubAMenu(notifGod, 'open')"
                    >
                      <img
                        v-if="notifGod.good.good_image.length > 0"
                        :src="notifGod.good.good_image[0].sharp_path"
                      />
                      <p>{{ notifGod.good.title }}</p>
                      <p>{{ notifGod.good.price }} ₸</p>
                      <p>{{ notifGod.good.notifications.length }}</p>
                    </li>
                  </ul>
                  <ul
                    ref="check1"
                    :class="[
                      { account_offer_sublist_open: childrenMenuClass },
                      'account_offer_sublist'
                    ]"
                  >
                    <li
                      v-if="thisGoodNitification"
                      v-for="notif in thisGoodNitification"
                      @click="goTogoodInNotif(notif)"
                      class="notif_id"
                    >
                      <img
                        v-if="notif.notification_good.good_image.length > 0"
                        :src="notif.notification_good.good_image[0].sharp_path"
                      />
                      <p>{{ notif.text }}</p>
                      <p>{{ notif.notification_good.price }} ₸</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <ul class="right_items_group">
              <li>
                <img
                  class="small_icon"
                  :src="require('@/assets/images/search_nav_color.svg')"
                />
                <router-link :to="{ path: '/search-page' }">поиск</router-link>
              </li>
              <li v-if="$auth.getUser()">
                <router-link :to="{ path: '/myaccount/chats' }">
                  <div class="chat_item">
                    <img
                      class="small_icon"
                      :src="require('@/assets/images/color_chat_icon.svg')"
                    />
                    <h5>{{ NEWMESSAGES }}</h5>
                  </div>
                </router-link>
              </li>

              <li v-if="$auth.getUser()" class="login_ava">
                <router-link :to="{ path: '/myaccount' }">
                  <!--<img :src="require('@/assets/images/ava_login_img.jpg')">-->
                  <avatar
                    :src="$auth.getUser().img"
                    :size="40"
                    :username="
                      $auth.getUser().firstname +
                        ' ' +
                        $auth.getUser().lastnamee
                    "
                  ></avatar>

                  <p>
                    {{
                      `${$auth.getUser().firstname} ${$auth.getUser().lastname}`
                    }}
                  </p>
                </router-link>
              </li>
              <li>
                <button
                  v-if="$auth.getUser() && !showLogin"
                  @click="logIn_Out"
                  class="log_out_btn"
                >
                  <img
                    class="small_icon"
                    :src="require('@/assets/images/login_color.svg')"
                  />
                  <p>Выйти</p>
                </button>
                <button
                  v-if="!$auth.getUser() && showLogin"
                  @click="logIn_Out"
                  class="log_out_btn"
                >
                  <img
                    class="small_icon"
                    :src="require('@/assets/images/login_color.svg')"
                  />
                  <p>Войти</p>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <div :class="['mobile_menu', { mobile_menu_open: HAMBURGER_STATUS }]">
      <div class="side_bar col-lg-12">
        <ul>
          <li @click="openMenu()">
            <img
              class="small_icon"
              :src="require('@/assets/images/home.svg')"
            />
            <router-link class="nav_toggle" :to="{ name: 'Main' }"
              >Главная
            </router-link>
          </li>
          <li @click="openMenu()">
            <img
              class="small_icon"
              :src="require('@/assets/images/customer_icon.svg')"
            /><router-link
              :to="{ path: '/groups-all' }"
              class="nav_toggle"
              href="product_page.html"
              >Группы</router-link
            >
          </li>
          <!--<li @click="openMenu()">-->
          <!--<img-->
          <!--class="small_icon"-->
          <!--:src="require('@/assets/images/performer_icon.svg')"-->
          <!--/><a class="nav_toggle" href="product_page.html">Услуги</a>-->
          <!--</li>-->
          <li @click="openMenu()">
            <img
              class="small_icon"
              :src="require('@/assets/images/nav_help_color_icon.svg')"
            /><a class="nav_toggle" href="product_page.html">Помощь</a>
          </li>
          <li v-if="this.$auth.getUser()" @click="openMenu()">
            <img
              class="small_icon"
              :src="require('@/assets/images/settings.svg')"
            />
            <router-link class="nav_toggle" :to="{ path: '/myaccount' }"
              >Аккаунт
            </router-link>
          </li>
          <li v-if="this.$auth.getUser()" @click="openMenu()" class="megaphone">
            <img
              class="small_icon"
              :src="require('@/assets/images/megaphone.svg')"
            />
            <router-link :to="{ path: '/create_advertisement' }"
              >Объявление</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div> </template
>:

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header_component",
  data() {
    return {
      activeMenu: false,
      showLogin: true,
      subMenu: false,
      myNewMessageCount: "",
      parentClass: false,
      childrenMenuClass: false,
      thisGoodNitification: ""
    };
  },

  computed: {
    ...mapGetters(["HAMBURGER_STATUS", "NOTIFICATIONS", "NEWMESSAGES"])
  },
  mounted() {
    if (this.$auth.getUser()) {
      this.showLogin = false;
    } else {
      this.showLogin = true;
    }
    $(".account_offer_list_item").click(() => {
      $(".account_offer_list").toggleClass("account_offer_list_open");
    });
    $(".account_offer_list_item").click(e => {
      $(".account_offer_sublist", e.target).toggleClass(
        "account_offer_sublist_open"
      );
    });

    $(".account_offer_list_item").click(() => {
      $(".account_offer_list_ul").toggleClass("account_offer_list_ul_not");
    });
  },
  created() {
    if (this.$auth.getUser()) {
      this.$store.dispatch("GET_MY_NOTIFICATIONS");
      this.$store.dispatch("GET_MY_NEWMESSAGES");
    }
  },
  methods: {
    goTogoodInNotif(notif) {
      this.$axios
        .get(`/checkNotification/${notif.id}`)
        .then(response => {
          if (response.data.mes === "Check succesful") {
            this.thisGoodNitification = "";
            this.$store.dispatch("GET_MY_NOTIFICATIONS");
            this.$router.push({
              path: `/good/${notif.notification_good.uniqurl}`
            });
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    openSubAMenu(obj, type) {
      if (type === "open") {
        this.thisGoodNitification = obj.good.notifications;
      } else {
      }
      this.parentClass = !this.parentClass;
      this.childrenMenuClass = !this.childrenMenuClass;
    },
    subMenuShow() {
      this.subMenu = !this.subMenu;
    },
    openMenu() {
      this.$store.commit("SET_HAMBURGER_STATUS", !this.HAMBURGER_STATUS);
    },
    logIn_Out() {
      if (this.$auth.getUser()) {
        this.$auth.logout();
        this.showLogin = !this.showLogin;
        this.$router.replace({ name: "Main" });
      } else {
        this.$auth.logout();
        this.showLogin = !this.showLogin;
        this.$router.replace({ name: "Login" });
      }
    },
    nicePrice(price) {
      const nice = String(price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");
      return nice;
    }
  }
};
</script>

<style scoped>
.login_ava {
  position: relative;
  bottom: 7px;
  width: auto;
}

.login_ava img {
  width: 40px;
  border-radius: 50%;
  float: left;
}

.login_ava p {
  margin-left: 10px;
  margin-top: 7px;
  float: right;
}

.vue-avatar--wrapper {
  float: left;
}
</style>
