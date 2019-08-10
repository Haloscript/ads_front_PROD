<template>
  <div>
    <section class="block_1 block_style">
      <div class="container">
        <div class="row">
          <div class="product_page_container">
            <div class="product_page_description_container col-xl-12 col-sm-12">
              <div class="col-lg-12 row">
                <div class="search_page_search_container">
                  <input
                    type="text"
                    name=""
                    v-model="title"
                    placeholder="Поиск..."
                  />
                  <button>Найти</button>
                </div>
              </div>
            </div>
            <div class="search_page_navbar">
              <table v-if="groupList.length > 0">
                <th class="search_page_navbar_title">Рубрика</th>
                <tr v-for="group in groupList">
                  <td @click="selectedGroup = group">
                    <a>{{ group.name }}</a>
                  </td>
                  <td v-if="goodsList"><p class="search_page_navbar_count">{{group.group_good.length}}</p></td>
                </tr>
              </table>

              <table v-if="categoryList.length > 0">
                <th class="search_page_navbar_title">Категория</th>
                <tr v-for="category in categoryList">
                  <td @click="selectedCategory = category">
                    <a>{{ category.name }}</a>
                  </td>
                  <td v-if="goodsList"><p class="search_page_navbar_count">{{category.categories_good.length}}</p></td>
                </tr>
              </table>


              <table v-if="subcategoryList.length > 0">
                <th class="search_page_navbar_title">Суб Категория</th>
                <tr v-for="subcategory in subcategoryList">
                  <td  @click="selectedSubCategory = subcategory">
                    <a>{{ subcategory.name }}</a>
                  </td>
                  <td v-if="goodsList"><p class="search_page_navbar_count">{{subcategory.subcategory_good.length}}</p></td>
                </tr>
              </table>

              <table>
                <th class="search_page_navbar_title">Время исполнения</th>
                <tr>
                  <td>
                    <input
                      type="radio"
                      name="search_radio"
                      value="1"
                      v-model="term"
                      id="search_radio1"
                    />
                    <label for="search_radio1" class="radio_label"
                      ><div></div
                    ></label>
                  </td>
                  <td><p class="search_page_navbar_count">24 часа</p></td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="radio"
                      name="search_radio"
                      value="3"
                      v-model="term"
                      id="search_radio2"
                    />
                    <label for="search_radio2" class="radio_label"
                      ><div></div
                    ></label>
                  </td>
                  <td><p class="search_page_navbar_count">3 дня</p></td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="radio"
                      name="search_radio"
                      value="7"
                      v-model="term"
                      id="search_radio3"
                    />
                    <label for="search_radio3" class="radio_label"
                      ><div></div
                    ></label>
                  </td>
                  <td><p class="search_page_navbar_count">7 дней</p></td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="radio"
                      name="search_radio"
                      value="15"
                      v-model="term"
                      id="search_radio4"
                    />
                    <label for="search_radio4" class="radio_label"
                      ><div></div
                    ></label>
                  </td>
                  <td><p class="search_page_navbar_count">15 дней</p></td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="radio"
                      name="search_radio"
                      value="0"
                      v-model="term"
                      id="search_radio5"
                    />
                    <label for="search_radio5" class="radio_label"
                      ><div></div
                    ></label>
                  </td>
                  <td><p class="search_page_navbar_count">Любое время</p></td>
                </tr>
              </table>

              <table class="search_page_price">
                <th class="search_page_navbar_title">Бюджет</th>
                <tr>
                  <td>
                    <p>₸</p>
                    <input
                      type="text"
                      v-model="price_min"
                      name=""
                      placeholder="От"
                    />
                  </td>
                  <td>
                    <p>₸</p>
                    <input
                      type="text"
                      v-model="price_max"
                      name=""
                      placeholder="До"
                    />
                  </td>
                </tr>
              </table>

              <table v-if="countryList.length > 0">
                <th class="search_page_navbar_title">Страна</th>
                <tr v-for="country in countryList">
                  <td>
                    <a>{{ country.name }}</a>
                  </td>
                  <!--<td><p class="search_page_navbar_count">(10)</p></td>-->
                </tr>
              </table>

              <table v-if="cityList.length > 0">
                <th class="search_page_navbar_title">Город</th>
                <tr v-for="city in cityList">
                  <td>
                    <a>{{ city.name }}</a>
                  </td>
                  <!--<td><p class="search_page_navbar_count">(10)</p></td>-->
                </tr>
              </table>
            </div>
            <div
              class="product_page_container_products_items search_page_items"
            >
              <Good_list
                :goodList="goodsList.goods"
              />
              <!--<ul>-->
                <!--<li>-->
                  <!--<a href="product_page_item.php">-->
                    <!--<div class="product_page_container_products_item_ava">-->
                      <!--<img-->
                        <!--src="images/roduct_page_container_products_item1.jpg"-->
                      <!--/>-->
                    <!--</div>-->
                  <!--</a>-->
                  <!--<h5>Визитка</h5>-->
                  <!--<h6>ТОО "Дом Табличек"</h6>-->
                  <!--<h4>1200 ₸</h4>-->
                  <!--<div class="product_page_item_info_container">-->
                    <!--<div class="category_like_container">-->
                      <!--<img src="images/like.svg" />-->
                      <!--<h5>55k</h5>-->
                    <!--</div>-->
                    <!--<div class="product_page_chat_info_container">-->
                      <!--<img-->
                        <!--class="small_icon"-->
                        <!--src="images/color_chat_icon.svg"-->
                      <!--/>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</li>-->
              <!--</ul>-->
            </div>
            <div class="product_page_breadcrumb search_page_breadcrumb">
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

    <!-- Fifth Block -->
    <section class="fifth_block block_style">
      <div class="container">
        <div class="col-lg-6 row fifth_block_content">
          <div class="fifth_block_content_text">
            <h3>
              Создайте свое объявление<br />
              прямо сейчас
            </h3>
            <button>Создать объявление</button>
          </div>
        </div>
        <div class="col-lg-6 row fifth_block_content" style="display: none;">
          <div class="parallax">
            <div class="water water-layer11"></div>
            <div class="water water-layer10"></div>
            <div class="water water-layer9"></div>
            <div class="water water-layer8"></div>
            <div class="water water-layer7"></div>
            <div class="water water-layer6"></div>
            <div class="water water-layer5"></div>
            <div class="water water-layer4"></div>
            <div class="water water-layer3"></div>
            <div class="water water-layer2"></div>
            <div class="water water-layer1"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Good_list from '@/components/portal/Good_list_cascade';

export default {
  name: 'Search_page',
  components: {
    Good_list,
  },
  data() {
    return {
      groupList: '',
      categoryList: '',
      subcategoryList: '',
      countryList: '',
      goodsList: '',
      cityList: '',
      selectedGroup: '',
      selectedCategory: '',
      selectedSubCategory: '',
      selectedCountry: '',
      selectedCity: '',
      term: '',
      price_min: '',
      price_max: '',
      title: '',
      limit: 12,
      pageNum: 1,
    };
  },
  created() {
    this.getAllGroups();
    this.getAllCountries();
    this.getAllFilteredGood(this.pageNum, false);
  },
  watch: {
    selectedGroup() {
      this.getAllGroups();
      this.getAllFilteredGood(this.pageNum, true);
    },
    selectedCategory() {
      this.getAllSubcategories(this.selectedCategory);
      this.getAllFilteredGood(this.pageNum, true);
    },
    selectedSubCategory() {
      this.getAllFilteredGood(this.pageNum, true);
    },
    selectedCountry() {
      this.getAllFilteredGood(this.pageNum, true);
    },
    selectedCity() {
      this.getAllFilteredGood(this.pageNum, true);
    },
    term() {
      this.getAllFilteredGood(this.pageNum, true);
    },
    price_min() {
      this.getAllFilteredGood(this.pageNum, true);
    },
    price_max() {
      this.getAllFilteredGood(this.pageNum, true);
    },
    title() {
      this.getAllFilteredGood(this.pageNum, true);
    },
  },
  methods: {
    getAllGroups() {
      this.categoryList = '';
      this.subcategoryList = '';
      this.selectedSubCategory = '';
      this.selectedCategory = '';
      this.$axios
        .get('/getAllGroupsGoods')
        .then((response) => {
          this.groupList = response.data;
          if (this.selectedGroup) {
            this.getAllCategories(this.selectedGroup);
          } else if (this.groupList.length > 0) {
            this.getAllCategories(this.groupList[0]);
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllCategories(group) {
      this.selectedSubCategory = '';
      this.subcategoryList = '';
      this.$axios
        .get(`/getAllCategoriesGoods/${group.id}`)
        .then((response) => {
          this.categoryList = response.data.categoriesOnGroup;
          if (this.selectedCategory) {
            this.getAllSubcategories(this.selectedCategory);
          } else if (this.categoryList.length > 0) {
            this.getAllSubcategories(this.categoryList[0]);
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllSubcategories(categories) {
      this.$axios
        .get(`/getAllSubcategoriesGoods/${categories.id}`)
        .then((response) => {
          this.subcategoryList = response.data.subcategoriesOnGroup;
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
          if (this.selectedCountry) {
            this.getAllCities(this.selectedCountry);
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllFilteredGood(pageNum, filtred) {
      let filter = {};
      const filterData = {
        group: this.selectedGroup.id,
        category: this.selectedCategory.id,
        subcategory: this.selectedSubCategory.id,
        country: this.selectedCountry.id,
        city: this.selectedCity.id,
        term: this.term,
        price_min: this.price_min,
        price_max: this.price_max,
        title: this.title,
      };
      if (filtred) {
        filter = filterData;
      }
      this.$axios.post(`/user/getFilteredAllGoods/${pageNum}/${this.limit}`, filter).then((response) => {
        this.goodsList = response.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    countFunc(id, type, goodList) {
      let counter = 0;
      for (let i = 0; i < goodList.length; i++) {
        if (goodList[i][type] === id) {
          counter++;
        }
      }
      return counter;
    },
    paginate(pageNum) {
      this.getAllFilteredGood(pageNum);
    },
  },
};
</script>

<style scoped></style>
