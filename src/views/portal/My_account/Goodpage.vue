<template>
  <section class="product_page_item_block block_style">
    <div class="container">
      <div class="product_page_container_item">

        <div class="product_page_container_label col-lg-12">
          <div class="product_page_container_label_counter">
            <h4 v-if="goodInfo" class="col-lg-6 row">{{goodInfo.good_subcategory.name}}</h4>
          </div>
        </div>

        <div class="product_page_container_item_product">
          <div class="product_page_container_item_product_img">
            <LightBox
              v-if="goodInfo && goodInfo.good_image.length > 0"
              album="mm"
              :src="goodInfo.good_image[0].original_size_path"
            >
              <img :src="goodInfo.good_image[0].sharp_path" alt class="maessage_upload_img" />
            </LightBox>
          </div>
          <div class="product_page_container_item_product_descr">
            <h4>{{goodInfo.title}}</h4>
            <p><a href="">Все предложения</a></p>
            <p v-if="goodInfo">{{goodInfo.description}} </p>
            <p v-if="goodInfo">{{nicePrice(goodInfo.price)}} {{goodInfo.good_country.currency}}</p>
            <div v-if="goodInfo" class="product_page_container_item_buttons">
              <img @click="sendMessage(goodInfo.id, 'good')" :src="require('@/assets/images/color_chat_icon.svg')">
              <span></span>
              <img v-if="goodInfo && GET_ALL_MY_LIKES_GOOD.indexOf(goodInfo.id) >= 0" @click="deleteLike(goodInfo.id, 'good')" :src="require('@/assets/images/like.svg')">
              <img v-if="$auth.getUser() && goodInfo && GET_ALL_MY_LIKES_GOOD.indexOf(goodInfo.id) < 0"  @click="addLike(goodInfo.id, 'good')" :src="require('@/assets/images/like_not_active.svg')">
              <img v-if="!$auth.getUser()" @click="goToLogin('like')" :src="require('@/assets/images/like.svg')">
              <p>{{goodInfo.good_likes__good.length}}</p>
            </div>
          </div>
        </div>
        <div class="product_page_container_item_company">
          <div class="product_page_company_logo">
            <div class="product_page_company_logo_crop">
              <avatar v-if="goodInfo && goodInfo.good_owner"
                :size="100"
                :src="goodInfo.img"
                :username="
                   goodInfo.good_owner.firstname + ' ' +goodInfo.good_owner.lastname
                  "
              ></avatar>
              <avatar v-if="goodInfo && goodInfo.good_shop"
                :size="100"
                :src="goodInfo.img"
                :username="
                   goodInfo.good_shop.title
                  "
              ></avatar>
            </div>
            <div class="product_page_company_title">
              <h5 v-if="goodInfo && goodInfo.good_owner">{{goodInfo.good_owner.firstname}}</h5>
              <h5 v-if="goodInfo && goodInfo.good_shop">{{goodInfo.good_shop.title}}</h5>
              <h4></h4>
            </div>
          </div>
          <div class="product_page_company_description">
            <ul>
              <li>
                <div class="product_page_company_description_img_crop">
                  <img :src="require('@/assets/images/location-pointer.svg')">
                </div>
                <a v-if="goodInfo" href="https://goo.gl/maps/JYWEy7GfNKPWEbRH7">{{`${goodInfo.good_country.name},${goodInfo.good_city.name}`}}</a>
              </li>
              <li>
                <div class="product_page_company_description_img_crop">
                  <img :src="require('@/assets/images/phone-receiver.svg')">
                </div>
                <a v-if="goodInfo && goodInfo.good_owner" href="tel:+77086186331">{{goodInfo.good_owner.phone}}</a>
                <a v-if="goodInfo && goodInfo.good_shop" href="tel:+77086186331">{{goodInfo.good_shop.phone}}</a>
              </li>
              <li>
                <div class="product_page_company_description_img_crop">
                  <img style="cursor: pointer;" :src="require('@/assets/images/comment.svg')">
                </div>
                <p v-if="COMMENTS.comments">{{COMMENTS.count}}</p>
              </li>
              <li v-if="goodInfo && goodInfo.good_shop ">
                <div class="product_page_company_description_img_crop">
                  <img v-if="$auth.getUser() && goodInfo && GET_ALL_MY_LIKES_SHOP.indexOf(goodInfo.good_shop.id) >= 0" style="cursor: pointer;" @click="deleteLike(goodInfo.good_shop.id, 'shop')" :src="require('@/assets/images/like.svg')">
                  <img v-if="$auth.getUser() && goodInfo && GET_ALL_MY_LIKES_SHOP.indexOf(goodInfo.good_shop.id) < 0" @click="addLike(goodInfo.good_shop.id, 'shop')" :src="require('@/assets/images/like_not_active.svg')">
                  <img v-if="!$auth.getUser()" @click="goToLogin('like')" :src="require('@/assets/images/like.svg')">

                </div>
                <p v-if="goodInfo && goodInfo.good_shop.shop__likes_shop.length > 0" >{{goodInfo.good_shop.shop__likes_shop.length}}</p>
              </li>
              <li v-else-if="goodInfo && goodInfo.good_owner">
                <div class="product_page_company_description_img_crop">
                  <img v-if="goodInfo && GET_ALL_MY_LIKES_OWNER.indexOf(goodInfo.good_owner.id) >= 0" style="cursor: pointer;" @click="deleteLike(goodInfo.good_owner.id, 'owner')" :src="require('@/assets/images/like.svg')">
                    <img  v-if="$auth.getUser() && goodInfo && GET_ALL_MY_LIKES_OWNER.indexOf(goodInfo.good_owner.id) < 0"  @click="addLike(goodInfo.good_owner.id, 'owner')" :src="require('@/assets/images/like_not_active.svg')">
                    <img  v-if="!$auth.getUser()"  @click="goToLogin('like')" :src="require('@/assets/images/like.svg')">
                </div>
                <p v-if="goodInfo && goodInfo.good_owner.owner_likes_owner.length > 0" >{{goodInfo.good_owner.owner_likes_owner.length}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="product_page_other_products">
        <OtherGoods v-if="otherGoods.length > 0"
          :headerText="'Остальные предложения'"
          :content="otherGoods"
          :options="carouselOptions"
        />
        </div>
      <Comments v-if="goodInfo" :item="goodInfo"
      :type="'good'"/>
      </div>

  </section>
</template>
<script>
import Avatar from 'vue-avatar';
import Comments from '@/components/Main_page/Comments';
import { mapGetters } from 'vuex';
import OtherGoods from '@/components/My_account/GoodPage_Slider';


export default {
  name: 'goodPage',
  components: {
    avatar: Avatar,
    Comments,
    OtherGoods,
  },
  data() {
    return {
      goodInfo: '',
      otherGoods: [],
      carouselOptions: {},
    };
  },
  created() {
    this.$store.dispatch('GET_ALL_MY_LIKES_API', this.$auth.getUser());
    this.getThisGood();
    // if (this.$auth.getUser()) {
    //   this.$store.dispatch('GET_MY_NOTIFICATIONS');
    //   this.$store.dispatch('GET_MY_NEWMESSAGES');
    // }
  },
  computed: {
    ...mapGetters(['COMMENTS', 'GET_ALL_MY_LIKES_GOOD', 'GET_ALL_MY_LIKES_SHOP', 'GET_ALL_MY_LIKES_OWNER']),
  },
  methods: {
    getThisGood() {
      console.log();
      this.$axios.get(`/getOneGood/${this.$route.params.uniq_url}`).then((response) => {
        console.log(response.data);
        this.goodInfo = response.data;
        this.getAllMyGoodsCarousel();
      }).catch((err) => {
        console.log(err);
      });
    },
    getAllMyGoodsCarousel() {
      const reqData = {};
      if (this.goodInfo.good_owner) {
        reqData.id = this.goodInfo.good_owner.id;
        reqData.type = 'owner_id';
      }
      if (this.goodInfo.good_shop) {
        reqData.id = this.goodInfo.good_shop.id;
        reqData.type = 'shop_id';
      }

      this.$axios.get(`/user/getGetGoodsCarousel/${reqData.id}/${reqData.type}/${this.goodInfo.id}`).then((response) => {
        this.otherGoods = response.data;

        this.carouselOptions.Width1000 = {};
        this.carouselOptions.Width768 = {};
        this.carouselOptions.Width480 = {};
        this.carouselOptions.Width0 = {};

        if (this.otherGoods && this.otherGoods.length >= 5) {
          this.carouselOptions.Width1000.items = 5;
          this.carouselOptions.Width768.items = 3;
          this.carouselOptions.Width480.items = 2;
          this.carouselOptions.Width0.items = 2;
          this.carouselOptions.mouseDrag = true;
          this.carouselOptions.touchDrag = true;
        } else
        if (this.otherGoods && this.otherGoods.length >= 3) {
          this.carouselOptions.Width1000.items = this.otherGoods.length;
          this.carouselOptions.Width768.items = 3;
          this.carouselOptions.Width480.items = 2;
          this.carouselOptions.Width0.items = 2;
          this.carouselOptions.mouseDrag = true;
          this.carouselOptions.touchDrag = true;
        } else
        if (this.otherGoods && this.otherGoods.length >= 2) {
          this.carouselOptions.Width1000.items = this.otherGoods.length;
          this.carouselOptions.Width768.items = 2;
          this.carouselOptions.Width480.items = 2;
          this.carouselOptions.Width0.items = 1;
          this.carouselOptions.mouseDrag = false;
          this.carouselOptions.touchDrag = false;
        } else
        if (this.otherGoods && this.otherGoods.length < 2) {
          this.carouselOptions.Width1000.items = this.otherGoods.length;
          this.carouselOptions.Width768.items = this.otherGoods.length;
          this.carouselOptions.Width480.items = this.otherGoods.length;
          this.carouselOptions.Width0.items = this.otherGoods.length;
          this.carouselOptions.mouseDrag = false;
          this.carouselOptions.touchDrag = false;
        }
      }).catch((err) => {
        console.warn(err);
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
        this.goodInfo.good_shop.shop__likes_shop.push(this.$auth.getUser().id);
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
        this.goodInfo.good_shop.shop__likes_shop.splice(this.goodInfo.good_likes__good.indexOf(this.$auth.getUser().id), 1);
        data.shop_id = id;
      }
      this.$store.dispatch('DEL_LIKES_API', data);
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
    nicePrice(price) {
      const nice = String(price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
      return nice;
    },

  },
};
</script>

<style scoped>

</style>
