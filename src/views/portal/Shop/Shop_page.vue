<template>
  <section class="product_page_item_block block_style">
    <div class="container">
      <div class="product_page_container_item">

        <div class="product_page_container_label col-lg-12">
          <div class="product_page_container_label_counter">
            <h4 class="col-lg-6 col-sm-12 row">{{shop.title}}</h4>
          </div>
        </div>

        <div class="product_page_container_item_company company_descr">
          <div class="product_page_company_logo">
            <div class="product_page_company_logo_crop">
              <avatar v-if="shop"
                      :size="100"
                      :src="shop.shop_image[0].sharp_path"
                      :username="
                   shop.title
                  "
              ></avatar>
            </div>
            <!--<div class="product_page_company_title">-->
              <!--<h5>Apple — американская корпорация, производитель персональных и планшетных компьютеров, аудиоплееров, телефонов, программного обеспечения.</h5>-->
              <!--<h4></h4>-->
            <!--</div>-->
          </div>
          <div class="product_page_company_description">
            <ul>
              <li>
                <div class="product_page_company_description_img_crop">
                  <img :src="require('@/assets/images/location-pointer.svg')">
                </div>
                <a v-if="shop" href="https://goo.gl/maps/JYWEy7GfNKPWEbRH7">{{shop.shop_country.name}},{{shop.shop_city.name}},{{shop.address}}</a>
              </li>
              <li>
                <div class="product_page_company_description_img_crop">
                  <img :src="require('@/assets/images/phone-receiver.svg')">
                </div>
                <a href="tel:+77086186331">{{shop.phone}}</a>
              </li>
              <li>
                <div class="product_page_company_description_img_crop">
                  <!--<img :src="require('@/assets/images/envelope.svg')">-->
                </div>
                <a href="tel:+77086186331">{{shop.email}}</a>
              </li>
              <li>
                <div class="product_page_company_description_img_crop">
                  <img style="cursor: pointer;" :src="require('@/assets/images/comment.svg')">
                </div>
                <p v-if="COMMENTS_SHOP.comments">{{COMMENTS_SHOP.count}}</p>
              </li>
              <li>
                <div class="product_page_company_description_img_crop">
                  <img v-if="$auth.getUser()" style="cursor: pointer;" :src="require('@/assets/images/like.svg')">
                  <img v-else @click="goToLogin('like')" style="cursor: pointer;" :src="require('@/assets/images/like.svg')">


                </div>
                <p v-if="shop">{{shop.shop__likes_shop.length}}</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="product_page_container_item_product">
          <div class="product_page_container_item_product_descr company_descr_second_container">
            <p>{{shop.description}}</p>
            <p>Отзывов (352)</p>
            <div class="product_page_container_item_buttons">
              <img v-if="$auth.getUser()" @click="sendMessage(shop.id, 'shop')" :src="require('@/assets/images/color_chat_icon.svg')">
              <img v-else @click="goToLogin('chat')" :src="require('@/assets/images/color_chat_icon.svg')">
              <span></span>
              <img v-if="shop && GET_ALL_MY_LIKES_SHOP.indexOf(shop.id) >= 0" @click="deleteLike(shop.id, 'shop')" :src="require('@/assets/images/like.svg')">
              <img v-if="$auth.getUser() && shop && GET_ALL_MY_LIKES_SHOP.indexOf(shop.id) < 0"  @click="addLike(shop.id, 'shop')" :src="require('@/assets/images/like_not_active.svg')">
              <img v-if="!$auth.getUser()" @click="goToLogin('like')" style="cursor: pointer;" :src="require('@/assets/images/like.svg')">
            </div>
          </div>
        </div>
      </div>
      <div class="product_page_other_products">
        <h4>Все предложения</h4>
        <section class="company_descr_items">
          <Good_list  :goodList="allGoods.goods"></Good_list>
          <div class="product_page_breadcrumb">
            <div class="pagination" v-if="allGoods.pages > 1">
              <paginate
                :pageCount="allGoods.pages"
                :click-handler="paginate"
                :initial-page="allGoods.this_page"
                :page-range="3"
                :next-class="'next'"
                :prev-class="'prev'"
                :container-class="'pagination'"
                :page-class="'page-item'"
              ></paginate>
            </div>
          </div>
        </section>
      </div>
      <Comments v-if="shop" :item="shop"
                :type="'shop'"/>
    </div>
  </section>
</template>

<script>
import Avatar from 'vue-avatar';
import Comments from '@/components/Main_page/Comments';
import { mapGetters } from 'vuex';
import Good_list from '@/components/portal/Good_list_cascade';
import FifthBlock from '@/components/Main_page/Fifth_block';

export default {
  name: 'Shop_page',
  components: {
    avatar: Avatar,
    Comments,
    Good_list,
    FifthBlock,
  },
  data() {
    return {
      shop: '',
      allGoods: '',
      pageNum: 1,
    };
  },
  created() {
    this.getShopInfo();
    this.$store.dispatch('GET_ALL_MY_LIKES_API', this.$auth.getUser());
    // this.$store.dispatch('GET_ALL_MY_LIKES_API');
  },


  computed: {
    ...mapGetters(['COMMENTS_SHOP', 'GET_ALL_MY_LIKES_SHOP']),
  },
  methods: {
		  getShopInfo() {
		    this.$axios.get(`/getShopFullInform/${this.$route.params.uniq_url}`).then((response) => {
		      this.shop = response.data;
		      this.getAllGoodsThisShop(this.pageNum);
      }).catch((err) => {
        console.log(err);
      });
    },
    goToLogin(type) {
	  let message = '';
		 switch (type) {
        case 'like':
          message = 'Лайки могут остовлять только зарегистрированные пользователи';
          break;
        case 'chat':
          message = 'Сообщение могут остовлять только зарегистрированные пользователи';
          break;
      }
      this.$swal({
        title: '',
        text: message,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Перейти к странице входа',
        cancelButtonText: 'Отмена',
      }).then((result) => {
        if (result.value) {
          this.$router.push({ name: 'Login' });
        } else {

        }
      });
    },
    getAllGoodsThisShop(pageNum) {
		    this.$axios.get(`/shop/shopGetGoods/${pageNum}/10/${this.shop.id}`).then((res) => {
		      this.allGoods = res.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    sendMessage(id, type) {
      const data = {
      };
      switch (type) {
        case 'good':
          data.good_id = id;
          break;
        case 'shop':
          data.shop_id = id;
          break;
        case 'owner_id':
          data.owner_id = id;
          break;
      }
      this.axios.post('/sendMessage', data).then((res) => {
        this.$router.push({ path: '/myaccount/chats' });
      }).catch((err) => {
        console.log(err);
      });
    },
    addLike(id, type) {
      const data = {};
      if (type === 'good') {
        this.goodInfo.good_likes__good.push(this.$auth.getUser().id);
        data.good_id = id;
      }
      if (type === 'owner') {
        this.goodInfo.good_owner.owner_likes_owner.push(this.$auth.getUser().id);
        data.owner_id = id;
      }
      if (type === 'shop') {
        this.shop.shop__likes_shop.push(this.$auth.getUser().id);
        data.shop_id = id;
      }
      this.$store.dispatch('SET_LIKES_API', data);
    },
    deleteLike(id, type) {
      const data = {};
      if (type === 'good') {
        this.goodInfo.good_likes__good.splice(this.goodInfo.good_likes__good.indexOf(this.$auth.getUser().id), 1);
        data.good_id = id;
      }
      if (type === 'owner') {
        this.goodInfo.good_owner.owner_likes_owner.splice(this.goodInfo.good_likes__good.indexOf(this.$auth.getUser().id), 1);
        data.owner_id = id;
      }
      if (type === 'shop') {
        this.shop.shop__likes_shop.splice(this.shop.shop__likes_shop.indexOf(this.$auth.getUser().id), 1);
        data.shop_id = id;
      }
      this.$store.dispatch('DEL_LIKES_API', data);
    },
    paginate(pageNum) {
      this.getAllGoodsThisShop(pageNum);
    },
  },
};
</script>

<style scoped>

</style>
<!--/api/shop/shopGetGoods/:page/:limit/:shop_id-->

