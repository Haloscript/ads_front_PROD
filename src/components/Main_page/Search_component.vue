<template>
  <section class="banner1_container_search">
    <h1><span class="search_span1" style="">Ваш личный помощник в сфере рекламы</span> Передайте свои заботы в руки специалистам и профессионалам</h1>
    <div class="banner1_container_search_input_container">
      <div class="banner1_container_icon_container">
        <img :src="require('@/assets/images/search_nav_color.svg')">
        <input v-model="searchIn" type="search" name="" placeholder="Найти">
        <div v-if="searchResult.length > 0" class="banner1_container_search_list">
          <ul>
            <li v-for="good in searchResult">
              <router-link :to="{path: `/good/${good.uniqurl}`}"><p>{{good.title}}</p></router-link>

            </li>
          </ul>
        </div>
        <div v-if="showLoader" class="container webers_preloader">
          <div class="item-1"></div>
          <div class="item-2"></div>
          <div class="item-3"></div>
          <div class="item-4"></div>
          <div class="item-5"></div>
        </div>
        <router-link :to="{path: '/search-page'}">
          <button>Найти</button>
        </router-link>
      </div>
      <p style="padding-top: 5px; color: #FFF;">Например: "разработка дизайна логотипа"</p>
    </div>
  </section>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'Search_component',
  data() {
    return {
      searchIn: '',
      searchResult: [],
      showLoader: false,
    };
  },
  watch: {
    searchIn(newVal, oldVal) {
      this.showLoader = true;
      this.serchibble();
    },
  },
  methods: {
    serchibble: _.debounce(function () {
      this.$axios.post('/user/getGoodsOnSearchMainPage', { search_title: this.searchIn }).then((response) => {
        this.searchResult = response.data;
        this.showLoader = false;
      }).catch((err) => {
        console.log(err);
      });
    }, 1000),
  },
};
</script>

<style scoped>
  .goodImg{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 15px;
    top: 15px;
    z-index: 5;
  }

  .search_span1{
   display: block;
   width: 100%;
   font-size: 50px;
   font-weight: 700;
   text-transform: uppercase;
   padding-bottom: 20px;
 }
  .banner1_container_search_list{
    display: block;
  }

</style>
<!--/user/getGoodsOnSearchMainPage-->
