<template>
<div>
  <body>
    <div class="main_container">
      <div class="container">
        <nav class="col-lg-12">
          <div class="nav_options row">
            <img class="small_icon" :src="require('@/assets/images/options.svg')">
            <p>Редактировать профиль</p>
          </div>
          <div class="nav_login row">
            <router-link :to="'adminchats'">
              <div>
                <img class="small_icon" :src="require('@/assets/images/nav_login_icon.svg')">
                <h5>6</h5>
              </div>
            </router-link>
            <!-- <img
              @click="AdminLogout"
              class="small_icon"

            >
            <p>Выйти</p>-->
            <button class="log_out_btn">
              <img
                class="small_icon"
                @click="AdminLogout"
                :src="require('@/assets/images/login.svg')"
              >
              <p>Выйти</p>
            </button>
          </div>
        </nav>
      </div>
      <div class="container">
        <div class="col-lg-4 side_bar_container">
          <div class="profile_container row">
            <div class="avatar_container col-lg-6">
              <avatar
                :size="120"
                :src="$auth.getUser().img"
                :username="$auth.getUser().firstname + ' ' + $auth.getUser().lastname"
              ></avatar>
              <!-- <img v-if="$auth.getUser().img" :src="require('@/assets/images/avatar.jpg')"> -->
            </div>
            <p class="col-lg-6">
              {{$auth.getUser().firstname + ' ' + $auth.getUser().lastname}}
              <span
                v-if="$auth.getUser().roles[0].name === 'ADMIN'"
              >Администратор</span>
              <span v-if="$auth.getUser().roles[0].name === 'MANAGER'">Модератор</span>
            </p>
          </div>
          <div class="side_bar">
            <ul>
              <router-link
                v-bind:class="{ 'router-link-exact-active': activeClass }"
                :to="'/administration'"
              >
                <li>Категории</li>
              </router-link>
              <router-link
                v-bind:class="{ 'router-link-exact-active': activeUsersClass }"
                :to="'/administration/userslistmain'"
              >
                <li>Пользователи</li>
              </router-link>
              <router-link :to="'/administration/design'">
                <li>Дизайн</li>
              </router-link>
              <router-link :to="'/administration/adminslist'">
                <li>Администраторы</li>
              </router-link>
              <router-link :to="'/administration/adminchats'">
                <li>Чат</li>
              </router-link>
            </ul>
          </div>
        </div>
        <router-view/>
      </div>
    </div>
  </body>
</div>
</template>
<script>
import Avatar from 'vue-avatar';

export default {
  name: 'AdminMain',
  components: {
    avatar: Avatar,
  },
  created() {
    // console.log(this.$auth.getUser());
    if (
      this.$route.path === '/administration/subcategory' ||
      this.$route.path === '/administration' ||
      this.$route.path === '/administration/category'
    ) {
      this.activeClass = true;
    } else {
      this.activeClass = false;
    }

    if (
      this.$route.path === '/administration/userslistmain/companylist' ||
      this.$route.path === '/administration/userslistmain'
    ) {
      this.activeUsersClass = true;
    } else {
      this.activeUsersClass = false;
    }
  },
  watch: {
    $route() {
      if (
        this.$route.path === '/administration/subcategory' ||
        this.$route.path === '/administration' ||
        this.$route.path === '/administration/category'
      ) {
        this.activeClass = true;
      } else {
        this.activeClass = false;
      }

      if (
        this.$route.path === '/administration/userslistmain/companylist' ||
        this.$route.path === '/administration/userslistmain'
      ) {
        this.activeUsersClass = true;
      } else {
        this.activeUsersClass = false;
      }
    },
  },
  data() {
    return {
      activeClass: false,
      activeUsersClass: false,
    };
  },
  methods: {
    AdminLogout() {
      localStorage.clear();
      window.location.replace('/signinadmin');
    },
  },
};
</script>
