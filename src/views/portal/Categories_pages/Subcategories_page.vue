<template>
  <div>
  <section id="groupAnchor" class="block_1 block_style">
  <div class="container">
    <div class="row">
      <div class="product_page_container">
        <div class="product_page_description_container col-xl-12 col-sm-12">

          <div v-if="allGoods && allGoods.group && allGoods.group.img" class="product_page_description_img_container">
            <img  v-if="allGoods.group" :src="allGoods.group.img">
          </div>
          <div v-if="allGoods && allGoods.category &&  allGoods.category.img" class="product_page_description_img_container">
            <img  v-if="allGoods.category" :src="allGoods.category.img">
          </div>
          <div v-if="allGoods && allGoods.subcategory && allGoods.subcategory.img" class="product_page_description_img_container">
            <img  v-if="allGoods.subcategory" :src="allGoods.subcategory.img">
          </div>

          <div v-if="allGoods && allGoods.group" class="product_page_description_content_container">
            <h4>{{allGoods.group.name}}</h4>
            <p >{{allGoods.group.description}}</p>
          </div>

          <div v-if="allGoods && allGoods.category" class="product_page_description_content_container">
            <h4 v-if="allGoods.category">{{allGoods.category.name}}</h4>
            <p v-if="allGoods.category">{{allGoods.category.description}}</p>
          </div>

          <div v-if="allGoods && allGoods.subcategory" class="product_page_description_content_container">
            <h4 v-if="allGoods.subcategory">{{allGoods.subcategory.name}}</h4>
            <p v-if="allGoods.subcategory">{{allGoods.subcategory.description}}</p>
          </div>

          <div class="product_page_container_label col-lg-12">
            <div class="product_page_container_label_counter">
              <h4 v-if="allGoods.group" class="col-lg-6 row">{{allGoods.group.name}}</h4>
              <h4 v-if="allGoods.category" class="col-lg-6 row">{{allGoods.category.name}}</h4>
              <h4 v-if="allGoods.subcategory" class="col-lg-6 row">{{allGoods.subcategory.name}}</h4>
              <div class="product_page_counter_icon_container">
                <img class="small_icon" :src="require('@/assets/images/search_nav.svg')">
                <p v-if="allGoods.group">{{allGoods.count}}</p>
                <p v-if="allGoods.category">{{allGoods.count}}</p>
                <p v-if="allGoods.subcategory">{{allGoods.count}}</p>
              </div>
            </div>
              <div class="product_page_sort_container">
                <div class="product_page_sort_outer">
                  <h6>Сортировать по цене</h6>
                  <div class="product_page_sort_input">
                    <input v-model="filterPrice" :value="{order_case: 'price' ,order: 'ASC'}" type="radio" name="price_radio" id="price_plus">
                    <label for="price_plus">Цена ↑</label>
                  </div>
                  <div class="product_page_sort_input">
                    <input  v-model="filterPrice" :value="{order_case: 'price' ,order: 'DESC'}" type="radio" name="price_radio" id="price_minus">
                    <label for="price_minus">Цена ↓</label>
                  </div>
                </div>
                <div class="product_page_sort_outer">
                  <h6>Сортировать по дате</h6>
                  <div class="product_page_sort_input">
                    <input v-model="filterDate" :value="{order_case: 'createdAt' ,order: 'DESC'}" type="radio" name="date_radio" id="date_plus">
                    <label for="date_plus">Новые ↑</label>
                  </div>
                  <div class="product_page_sort_input">
                    <input v-model="filterDate" :value="{order_case: 'createdAt' ,order: 'ASC'}" type="radio" name="date_radio" id="date_minus">
                    <label for="date_minus">Старые ↓</label>
                  </div>
                </div>
                <!--<div class="product_page_sort_outer">-->
                  <!--<h6>Тип объявлений</h6>-->
                  <!--<div class="product_page_sort_input">-->
                    <!--<input v-model="filterType" :value="{type_id : null}" type="radio" name="adt_radio" id="all">-->
                    <!--<label for="all">Все</label>-->
                  <!--</div>-->
                  <!--<div class="product_page_sort_input">-->
                    <!--<input v-model="filterType" :value="{type_id : 1}" type="radio" name="adt_radio" id="find">-->
                    <!--<label for="find">Ищу</label>-->
                  <!--</div>-->
                  <!--<div class="product_page_sort_input">-->
                    <!--<input v-model="filterType" :value="{type_id : 2}" type="radio" name="adt_radio" id="buy">-->
                    <!--<label for="buy">Куплю</label>-->
                  <!--</div>-->
                  <!--<div class="product_page_sort_input">-->
                    <!--<input v-model="filterType" :value="{type_id : 3}" type="radio" name="adt_radio" id="sale">-->
                    <!--<label for="sale">Продам</label>-->
                  <!--</div>-->
                  <!--<div class="product_page_sort_input">-->
                    <!--<input v-model="filterType" :value="{type_id : 4}" type="radio" name="adt_radio" id="make">-->
                    <!--<label for="make">Сделаю</label>-->
                  <!--</div>-->
                <!--</div>-->
                <div v-if="countryList" class="product_page_sort_outer">
                  <h6>Сортировать по стране</h6>
                  <div class="product_page_sort_input">
                    <select v-model="selectedCountry">
                      <option :value="country" v-for="country in countryList">{{country.name}}</option>
                    </select>
                  </div>
                </div>
                <div v-if="cityList" class="product_page_sort_outer">
                  <h6>Сортировать по городу</h6>
                  <div class="product_page_sort_input">
                    <select v-model="selectedCity">
                      <option  :value="city" v-for="city in cityList">{{city.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
            <!--<div class="product_page_sort_container">-->
              <!--<div class="product_page_sort">-->
                <!--<div  class="custom-control custom-radio">-->
                  <!--<input type="radio" class="custom-control-input" id="defaultGroupExample7" value="price" v-model="filter.order_case" name="groupOfDefaultRadios1">-->
                  <!--<label class="custom-control-label" for="defaultGroupExample7">Сортировать по Цене</label>-->
                <!--</div>-->
                <!--<div  class="custom-control custom-radio">-->
                  <!--<input type="radio" class="custom-control-input" id="defaultGroupExample8" :value="'date'" v-model="filter.order_case" name="groupOfDefaultRadios1">-->
                  <!--<label class="custom-control-label" for="defaultGroupExample8">Сортировать по Дате</label>-->
                <!--</div>-->
                <!--&lt;!&ndash;<p></p>&ndash;&gt;-->
                <!--&lt;!&ndash;<p></p>&ndash;&gt;-->
                <!--&lt;!&ndash;<img class="small_icon product_page_sort_img" :src="require('@/assets/images/arrow_list_style.svg')"&ndash;&gt;-->
              <!--</div>-->
            <!--<div class="product_page_sort_container">-->
              <!--<h5>Сортировать по типу объявления</h5>-->
              <!--<div  class="custom-control custom-radio">-->
                <!--<input type="radio" class="custom-control-input" id="defaultGroupExample1" value="0" v-model="filter.type" name="groupOfDefaultRadios">-->
                <!--<label class="custom-control-label" for="defaultGroupExample1">Все</label>-->
              <!--</div>-->

              <!--<div  class="custom-control custom-radio">-->
                <!--<input type="radio" class="custom-control-input" id="defaultGroupExample2" value="1" v-model="filter.type" name="groupOfDefaultRadios">-->
                <!--<label class="custom-control-label" for="defaultGroupExample2">Продать</label>-->
              <!--</div>-->
              <!--&lt;!&ndash; Group of default radios - option 2 &ndash;&gt;-->
              <!--<div  class="custom-control custom-radio">-->
                <!--<input type="radio" class="custom-control-input" id="defaultGroupExample3" value="2" v-model="filter.type" name="groupOfDefaultRadios" checked>-->
                <!--<label class="custom-control-label" for="defaultGroupExample3">Купить</label>-->
              <!--</div>-->
              <!--&lt;!&ndash; Group of default radios - option 3 &ndash;&gt;-->
              <!--<div  class="custom-control custom-radio">-->
                <!--<input type="radio" class="custom-control-input" id="defaultGroupExample4" value="3" v-model="filter.type" name="groupOfDefaultRadios">-->
                <!--<label class="custom-control-label" for="defaultGroupExample4">Найти</label>-->
              <!--</div>-->
              <!--<div  class="custom-control custom-radio">-->
                <!--<input type="radio" class="custom-control-input" id="defaultGroupExample5" value="4" v-model="filter.type" name="groupOfDefaultRadios">-->
                <!--<label class="custom-control-label" for="defaultGroupExample5">Сделать</label>-->
              <!--</div>-->
            <!--</div>-->
            <!--</div>-->
          </div>
          <div v-if="$route.meta.childrenCategories === true && allGoods && allGoods.group" class="product_page_categories col-xl-12 row">
            <ul>
              <li @click="goCategories('category', category.uniqurl)" v-if="category.categories_good.length > 0" v-for="category in allGoods.group.categories">
                <img :src="category.miniature_img">
                <p>{{category.name}}</p>
                <p>({{goodCount(category.categories_good)}})</p>
              </li>
            </ul>
          </div>
          <div v-if="$route.meta.childrenCategories === true && allGoods && allGoods.category" class="product_page_categories col-xl-12 row">
            <ul>
              <li @click="goCategories('subcategory', subcategory.uniqurl)" v-for="subcategory in allGoods.category.subcategories">
                <img :src="subcategory.miniature_img">
                <p>({{subcategory.name}})</p>
                <p>({{goodCount(subcategory.subcategory_good)}})</p>
              </li>
            </ul>
          </div>
        </div>
        <Good_list
        :goodList="allGoods.goods"
        />
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
      </div>
    </div>
  </div>
  </section>
  <Fifth-block />
  </div>
</template>

<script>
import Good_list from '@/components/portal/Good_list_cascade';
import FifthBlock from '@/components/Main_page/Fifth_block';
import { mapGetters } from 'vuex';

export default {
  name: 'Subcategories_page',
  components: {
    Good_list,
    FifthBlock,
  },

  data() {
    return {
      limit: 10,
      pageNum: 1,
      allGoods: '',
      selectedCountry: '',
      selectedCity: '',
      filter: {
        good: {
          type_id: null,
          country_id: null,
          city_id: null,
        },
        ordered: {
          order_case: 'createdAt',
          order: 'ASC',
        },
      },
      filterPrice: {},
      filterDate: {},
      filterType: { type_id: null },
      countryList: '',
      cityList: '',
    };
  },
  watch: {
    // 'filter.type': function (newVal, oldVal) {
    //   this.getAllGoodsOnThisCategory(this.pageNum);
    // },
    filterPrice() {
      this.filter.ordered.order_case = this.filterPrice.order_case;
      this.filter.ordered.order = this.filterPrice.order;
      this.getAllGoodsOnThisCategory(this.pageNum);
    },
    filterDate() {
      this.filter.ordered.order_case = this.filterDate.order_case;
      this.filter.ordered.order = this.filterDate.order;
      this.getAllGoodsOnThisCategory(this.pageNum);
    },
    filterType() {
      this.filter.good.type_id = this.filterType.type_id;
      this.getAllGoodsOnThisCategory(this.pageNum);
    },
    selectedCountry() {
      this.filter.good.country_id = this.selectedCountry.id;
      this.getAllGoodsOnThisCategory(this.pageNum);
    },
    selectedCity() {
      this.filter.good.city_id = this.selectedCity.id;
      this.getAllGoodsOnThisCategory(this.pageNum);
    },
    $route() {
      this.getAllGoodsOnThisCategory(this.pageNum);
    },
  },
  created() {
    this.getAllCountries();
    this.$store.dispatch('GET_ALL_MY_LIKES_API', this.$auth.getUser());
  },
  computed: {
    ...mapGetters(['GET_ALL_MY_LIKES_GOOD']),
  },
  methods: {
    goCategories(type, url) {
      let path = '';
      switch (type) {
        case 'category':
          path = 'categories_page';
          break;
        case 'subcategory':
          path = 'subcategories_page';
          break;
      }
      this.$router.push({ path: `/${path}/${url}` });
    },
    getAllGoodsOnThisCategory(pageNum) {
      let apiPAth = '';
      switch (this.$route.name) {
        case 'subcategories_page':
          apiPAth = '/getSubcategoryAllGood';
          break;
        case 'group_page':
          apiPAth = '/getGroupAllGood';
          break;
        case 'categories_page':
          apiPAth = '/getCategoryAllGood';
          break;
      }
      this.$axios.post(`${apiPAth}/${this.$route.params.uniqurl}/${pageNum}/${this.limit}`, { filter: this.filter }).then((res) => {
        this.allGoods = res.data;
        console.log(res);
      }).catch((err) => {
        console.warn(err);
      });
    },
    getAllCountries() {
      this.$axios
        .get('/getAllCountries')
        .then((response) => {
          this.countryList = response.data;
          this.selectedCountry = response.data[0];
          if (this.selectedCountry) {
            this.getAllCities(this.selectedCountry.id);
          } else if (this.countryList.length > 0) {
            this.getAllCities(this.countryList[0].id);
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllCities(countryId) {
      this.$axios
        .get(`/getAllCitys/${countryId}`)
        .then((response) => {
          this.cityList = response.data;
          this.selectedCity = response.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    paginate(pageNum) {
      this.getAllGoodsOnThisCategory(pageNum);
    },
    goodCount(goods) {
      let count = 0;
      for (const good in goods) {
        if (goods[good].type_id === 1 && goods[good].archive === 0) {
          count += 1;
        }
      }
      return count;
    },
  },
};
</script>

<style scoped>

</style>

