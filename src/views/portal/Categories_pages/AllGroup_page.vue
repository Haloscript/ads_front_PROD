<template>
  <section id="allGroupAnchor" class="block_1 block_style">
    <div class="container">
      <div class="row">
        <div class="product_page_container">
          <div class="product_page_description_container col-xl-12 col-sm-12">
            <div  class="product_page_description_content_container">
              <h4>Категории</h4>
            </div>
            <div class="product_page_container_label col-lg-12">
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
            </div>
            <div class="product_page_categories all_categories col-xl-12 row">
              <ul>
                <li @click="goThisGroup(group.uniqurl)" v-if="groupList" v-for="group in groupList">
                  <img v-if="group && group.miniature_img" :src="group.miniature_img">
                  <p>{{group.name}}</p>
                  <p class="product_page_categories_counter">({{goodCount(group.group_good)}})</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="product_page_container_products_items">
            <Good_list
            :goodList="goodsList.goods"
            />
            <!--<ul>-->
              <!--<li>-->
                <!--<a href="product_page_item.php">-->
                  <!--<div class="product_page_container_products_item_ava">-->
                    <!--<img src="images/roduct_page_container_products_item1.jpg">-->
                    <!--</div>-->
                    <!--</a>-->
                    <!--<h5>Визитка</h5>-->
                    <!--<h6>ТОО "Дом Табличек"</h6>-->
                    <!--<h4>1200 ₸</h4>-->
                    <!--<div class="product_page_item_info_container">-->
                      <!--<div class="category_like_container">-->
                        <!--<img src="images/like.svg">-->
                        <!--<h5>55k</h5>-->
                        <!--</div>-->
                        <!--<div class="product_page_chat_info_container">-->
                          <!--<img class="small_icon" src="images/color_chat_icon.svg">-->
                          <!--</div>-->
                          <!--</div>-->
                          <!--</li>-->
                          <!--</ul>-->
                        </div>
                        <div class="product_page_breadcrumb">
                          <div class="pagination" v-if="goodsList.pages > 1">
                            <paginate
                            :pageCount="goodsList.pages"
                            :click-handler="paginate"
                            :initial-page="goodsList.this_page"
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

              </template>
<script>
import Good_list from '@/components/portal/Good_list_cascade';
import { mapGetters } from 'vuex';

export default {
  name: 'AllGroup_page',
  components: {
    Good_list,
  },
  data() {
    return {
      groupList: '',
      countryList: '',
      cityList: '',
      selectedCountry: '',
      selectedCity: '',
      limit: 10,
      pageNum: 1,
      goodsList: '',
      selectedGroup: '',
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
    };
  },
  created() {
    this.getAllGroups();
    this.getAllCountries();
    this.getAllFilteredGood(this.pageNum);
    this.$store.dispatch('GET_ALL_MY_LIKES_API', this.$auth.getUser());
  },
  computed: {
    ...mapGetters(['GET_ALL_MY_LIKES_GOOD']),
  },
  watch: {
    filterPrice() {
      this.filter.ordered.order_case = this.filterPrice.order_case;
      this.filter.ordered.order = this.filterPrice.order;
      this.getAllFilteredGood(this.pageNum);
    },
    filterDate() {
      this.filter.ordered.order_case = this.filterDate.order_case;
      this.filter.ordered.order = this.filterDate.order;
      this.getAllFilteredGood(this.pageNum);
    },
    filterType() {
      this.filter.good.type_id = this.filterType.type_id;
      this.getAllFilteredGood(this.pageNum);
    },
    selectedCountry() {
      this.filter.good.country_id = this.selectedCountry.id;
      this.getAllFilteredGood(this.pageNum);
    },
    selectedCity() {
      this.filter.good.city_id = this.selectedCity.id;
      this.getAllFilteredGood(this.pageNum);
    },
  },
  methods: {
    getAllGroups() {
      this.$axios
        .get('/getAllGroupsGoods')
        .then((response) => {
          this.groupList = response.data;
        })
        .catch((err) => {
          console.log(err);
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
    getAllFilteredGood(pageNum) {
      this.$axios.post(`/getAllGoodInAllCategories/${pageNum}/${this.limit}`, { filter: this.filter }).then((response) => {
        this.goodsList = response.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    goThisGroup(uniqurl) {
      this.$router.push({ path: `/group_page/${uniqurl}` });
    },
    paginate(pageNum) {
      this.getAllFilteredGood(pageNum);
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
                .product_page_categories_counter{
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  text-align: center;
                  margin: auto;
                  background: #f8f9fa;
                  width: 100%;
                  color: #000;
                  padding-top: 5px;
                  padding-bottom: 5px;
                }
              </style>
