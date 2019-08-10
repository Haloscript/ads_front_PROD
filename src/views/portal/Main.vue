<template>
  <div>
    <section>
          <div>
            <div class="banner1_container">
          <Search_component/>
          <Banners_component v-if="bannersContent.length > 0" :content="bannersContent" />
        </div>
      </div>
    </section>
    <All_GrupsList_component v-if="groupListContent.length >0" :groupList="groupListContent"/>
    <section class="video_block">
      <div class="container">
        <div class="video_block_description_conatiner">
          <h4>Работай быстрее на ADS Help, с уверенностью</h4>
          <ul>

            <li>
              <img :src="require('@/assets/images/tick-inside-circle.svg')">
              <h6>Цены на все без посредников</h6>
              <p>С помощью ADS Help, вы найдете услуги и товары напрямую без третих лиц</p>
            </li>

            <li>
              <img :src="require('@/assets/images/tick-inside-circle.svg')">
              <h6>Знать цену заранее</h6>
              <p>
                Найдите любую услугу в течение нескольких минут и точно знайте, сколько вы заплатите. Нет почасовых ставок, только фиксированная цена.</p>
            </li>

            <li>
              <img :src="require('@/assets/images/tick-inside-circle.svg')">
              <h6>Мы здесь для вас 24/7</h6>
              <p>ADS Help здесь для вас, от ответов на любые вопросы до решения любых проблем в любое время.</p>
            </li>
          </ul>
        </div>
        <div class="video_block_video_container" v-html="videoPromotions">
          <!--<iframe width="100%" height="380" src="https://www.youtube.com/embed/WZRwT2Eiceg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
        </div>
      </div>
    </section>
    <!--<Betters_component-->
      <!--:sectionClass="'fourth_block'"-->
      <!--:headerText="'Лучшие компании'"-->
      <!--:content="companies"-->
    <!--/>-->
    <Betters_component v-if="topTenShops.length > 0"
      :sectionClass="'fourth_block'"
      :headerText="'Лучшие исполнители'"
      :content="topTenShops"
                       v-on:childinit="goToShop"
    />
    <Categories_component
      v-if="clientGoodList.length > 0"
      :sectionClass="'second_category_container2'"
      :headerText="'Новые заказы'"
      :content="clientGoodList"/>
    <Fifth-block />
    <section class="second_category_block">
      <!--<Categories_component-->
        <!--:headerPath="'/'"-->
        <!--:headerText="'Полиграфия'"-->
        <!--:content="oneCategories"-->
      <!--/>-->
      <Categories_component v-if="allPromotionGoods" v-for="promotion in allPromotionGoods"  v-bind:key="promotion.id"
        :sectionClass="'second_category_container2'"
        :headerPath="`/subcategories_page/${promotion.uniqurl}`"
        :headerText="promotion.name"
        :content="promotion.subcategory_good"
      />
      <!--<Categories_component-->
        <!--:sectionClass="'second_category_container2'"-->
        <!--:headerPath="'/'"-->
        <!--:headerText="'Ads Help Рекомендует'"-->
        <!--:content="recommended"-->
      <!--/>-->
    </section>
  </div>
</template>

<script>
import FifthBlock from '@/components/Main_page/Fifth_block';
import Betters_component from '@/components/Main_page/Betters_component';
import Categories_component from '@/components/Main_page/Categories_component';
import Banners_component from '@/components/Main_page/Banners_component';
import All_GrupsList_component from '@/components/Main_page/All_GrupsList_component';
import Search_component from '@/components/Main_page/Search_component';

export default {
  name: 'Main',
  components: {
    FifthBlock,
    Betters_component,
    Categories_component,
    Banners_component,
    All_GrupsList_component,
    Search_component,
  },
  data() {
    return {
      allPromotionGoods: [],
      videoPromotions: '',
      topTenShops: [],
      bannersContent: [],
      groupListContent: [],
      clientGoodList:[],
    };
  },
  created() {
    this.getAllPromotionGoods();
    this.getTopTenShops();
    this.getAllMainImages();
    this.getOnMainGroups();
    this.getVideo();
    this.getAllClientGoodOnMain()
    if (this.$auth.getUser()) {
      this.$store.dispatch('GET_MY_NOTIFICATIONS');
      this.$store.dispatch('GET_MY_NEWMESSAGES');
    }
  },
  methods: {
    getAllMainImages() {
      this.$axios.get('/getMainPageImges').then((resp) => {
        this.bannersContent = resp.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    getOnMainGroups() {
      this.$axios.get('/getOnMainGroups/20').then((resp) => {
        this.groupListContent = resp.data.group;
      }).catch((err) => {
        console.log(err);
      });
    },
    getAllPromotionGoods() {
      this.$axios.get('/getPromotionSubcategoryOnMain').then((response) => {
        this.allPromotionGoods = response.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    getTopTenShops() {
      this.$axios.get('/getTopTenShopsOnMAin').then((response) => {
        this.topTenShops = response.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    getVideo() {
      this.$axios.get('/getVideos').then((res) => {
        this.videoPromotions = res.data[0].video_code;
      }).catch((err) => {
        console.log(err);
      });
    },
    goToShop(uniqurl) {
      this.$router.push({
        path: `/company/${uniqurl}`,
      });
    },
    getAllClientGoodOnMain() {
      this.$axios.get('/getAllClientGoodOnMain').then((res) => {
        this.clientGoodList =res.data
      });
    },
  },
};
</script>

<style scoped></style>
