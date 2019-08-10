<template>
  <div class="product_page_container_products_items">
    <ul>
      <li v-for="good in goodList">
        <router-link :to="{path:`/good/${good.uniqurl}`}">
          <div class="product_page_container_products_item_ava">
            <img v-if="good.good_image.length > 0" :src="good.good_image[0].sharp_path">
            <img v-else :src="require('@/assets/images/logo.svg')">
          </div>
        </router-link>
        <div class="product_page_item_info_container">
          <div class="category_like_container">
            <img :src="require('@/assets/images/like.svg')">
            <h5>{{good.good_likes__good.length}}</h5>
          </div>
          <div class="product_page_chat_info_container">
            <img class="small_icon" :src="require('@/assets/images/color_chat_icon.svg')">
            <h5>{{good.good_comments.length}}</h5>
          </div>
        </div>
        <h5 class="category_item_description">{{good.title}}</h5>
        <!--<h6>ТОО "Дом Табличек"</h6>-->
        <h4>{{ nicePrice(good.price)}} ₸</h4>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Good_list_cascade',
    props: {
      goodList: Array,
    },
    methods: {
      nicePrice(price) {
        const nice = String(price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
        return nice;
      },
    },
  };
</script>

<style scoped>
  .category_item_description{
    padding-top: 5px;
    font-size: 14px;
    height: 40px;
    overflow: hidden;
  }
</style>
