<template>
<div>
  <body>
    <div class="content_container col-lg-8">
      <div class="content_label">
        <h4>Пользователи</h4>
        <div class="content_counter">
          <p>{{typeAndCount.type}}</p>
          <div>{{typeAndCount.count}}</div>
        </div>
      </div>
      <div class="content_container_filter">
        <div class="content_container_filter_sort">
          <p>Сортировать по дате</p>
          <img @click="getOrder()" :src="require('@/assets/images/small_arrow.svg')">
        </div>
        <div class="content_container_filter_filter">
          <p>Фильтр</p>
          <img :src="require('@/assets/images/filter.svg')">
        </div>
      </div>
      <div class="content_tabs">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-bind:class=" {active : isActive.users}"
              :to="{path: '/administration/userslistmain'}"
            >Пользователи</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-bind:class=" {active : isActive.companies}"
              :to="{path: '/administration/userslistmain/companylist' }"
            >Компании</router-link>
          </li>
        </ul>
        <!-- Tab panes -->
        <router-view v-on:childinit="onChildInit"></router-view>
        <!-- Script For Show -->
      </div>
    </div>
  </body>
</div>
</template>
<script>
export default {
  name: 'AdminUsersList',
  watch: {
    $route() {
      if (this.$route.path === '/administration/userslistmain') {
        this.isActive = {
          users: true,
          companies: false,
        };
      } else if (
        this.$route.path === '/administration/userslistmain/companylist'
      ) {
        this.isActive = {
          users: false,
          companies: true,
        };
      } else {
        this.isActive = {
          users: false,
          companies: false,
        };
      }
    },
  },
  data() {
    return {
      isActive: {
        users: false,
        companies: false,
      },
      typeAndCount: {},
      order: false,
    };
  },
  mounted() {
    this.isActive = {
      users: true,
      companies: false,
    };
    if (this.$route.path === '/administration/userslistmain') {
      this.isActive = {
        users: true,
        companies: false,
      };
    } else if (
      this.$route.path === '/administration/userslistmain/companylist'
    ) {
      this.isActive = {
        users: false,
        companies: true,
      };
    } else {
      this.isActive = {
        users: false,
        companies: false,
      };
    }
  },
  methods: {
    onChildInit(value) {
      this.typeAndCount = value;
    },
    getOrder() {
      console.log(this.order);
      this.order = !this.order;
      let set = {};
      if (this.order === false) {
        set = 'DESC';
      } else {
        set = 'ASC';
      }
      if (this.$route.path === '/administration/userslistmain') {
        this.$store.commit('SET_USERSFILTER', { order: set });
        this.$store.dispatch('GET_USERSLIST');
      }else if (this.$route.path === '/administration/userslistmain/companylist') {
        this.$store.commit('SET_COMPANYFILTER', { order: set });
        this.$store.dispatch('GET_COMPANYSLIST');
      }

    },
  },
};
</script>
<style scoped>
</style>
