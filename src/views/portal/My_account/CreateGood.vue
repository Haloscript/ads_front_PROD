<template>
  <section class="account_page">
    <div class="container">
      <div class="account_page_container account_page_offer">
        <h4>Объявление</h4>
        <div class="app_form_body">
            <div class="app_form_body_descr">
              <!--<div class="app_form_body_descr_ava">-->
              <!--<img src="images/category_container_img1.jpg" />-->
              <!--</div>-->


              <label for="app_form_group_select">Описание</label>
              <textarea

                v-model="description"
                class="app_form_body_descr_content"
              >
              </textarea>
            </div>


            <div class="app_form_body_descr_input_container">
              <label for="app_form_category_selecet">Рубрика</label>
              <select
                v-if="groupList"
                id="app_form_group_select"
                v-model="selectedGroup"
              >
                <option v-for="group in groupList" :value="group">{{
                  group.name
                }}</option>
              </select>
            </div>

            <div
              v-if="categoryList"
              class="app_form_body_descr_input_container"
            >
              <label for="app_form_category_selecet">Группа</label>
              <select
                v-model="selectedCategory"
                name="app_form_category_selecet"
                id="app_form_category_selecet"
              >
                <option v-for="category in categoryList" :value="category">{{
                  category.name
                }}</option>
              </select>
            </div>

            <div
              v-if="subCategoryList"
              class="app_form_body_descr_input_container"
            >
              <label for="app_form_subcategory_select">Категория</label>
              <select
                v-model="selectedSubCategory"
                name="app_form_subcategory_select"
                id="app_form_subcategory_select"
              >
                <option
                  v-for="subcategory in subCategoryList"
                  :value="subcategory"
                  >{{ subcategory.name }}</option
                >
              </select>
            </div>
            <!--<div>-->
              <!--<h3>Я хочу</h3>-->
              <!--<div v-if="$auth.getUser().shop === true" class="custom-control custom-radio">-->
                <!--<input type="radio" class="custom-control-input" id="defaultGroupExample1" value="1" v-model="type" name="groupOfDefaultRadios">-->
                <!--<label class="custom-control-label" for="defaultGroupExample1">Продать</label>-->
              <!--</div>-->
              <!--&lt;!&ndash; Group of default radios - option 2 &ndash;&gt;-->
              <!--<div v-if="$auth.getUser().shop === false" class="custom-control custom-radio">-->
                <!--<input type="radio" class="custom-control-input" id="defaultGroupExample2" value="2" v-model="type" name="groupOfDefaultRadios" checked>-->
                <!--<label class="custom-control-label" for="defaultGroupExample2">Купить</label>-->
              <!--</div>-->
              <!--&lt;!&ndash; Group of default radios - option 3 &ndash;&gt;-->
              <!--<div v-if="$auth.getUser().shop === false" class="custom-control custom-radio">-->
                <!--<input type="radio" class="custom-control-input" id="defaultGroupExample3" value="3" v-model="type" name="groupOfDefaultRadios">-->
                <!--<label class="custom-control-label" for="defaultGroupExample3">Найти</label>-->
              <!--</div>-->
              <!--<div v-if="$auth.getUser().shop === true" class="custom-control custom-radio">-->
                <!--<input type="radio" class="custom-control-input" id="defaultGroupExample3" value="4" v-model="type" name="groupOfDefaultRadios">-->
                <!--<label class="custom-control-label" for="defaultGroupExample3">Сделать</label>-->
              <!--</div>-->
            <!--</div>-->

            <div class="app_form_body_descr_input_container">
              <label for="app_form_name_select">Наименование</label>
              <span>{{ errors.first("Наименование") }}</span>
              <input v-model="title" type="text" name="Наименование" id="app_form_name_select"
                     v-validate="'required'"/>
            </div>

            <div class="app_form_body_descr_input_container">
              <span>{{ errors.first("Время выполнения") }}</span>
              <label>Время выполнения (дней)</label>
              <input v-model="term" type="text" name="Время выполнения" id="app_form_name_select"
                     v-validate="'required'"/>
            </div>
            <div class="app_form_body_descr_input_container">
              <label for="app_form_number_select">Бюджет</label>
              <!--<input type="text" name="" id="app_form_number_select" value="" />-->
              <span>{{ errors.first("Бюджет") }}</span>
              <money v-if="this.selectedCountry" name="Бюджет"  v-validate="'required'" v-model="price" v-bind="money"></money>
            </div>
            <div
              v-if="countryList"
              class="app_form_body_descr_input_container"
            >
              <label for="app_form_subcategory_select">Страна</label>
              <select
                v-model="selectedCountry"
                name="app_form_subcategory_select"
                id="app_form_subcategory_select"
              >
                <option ref="country"
                  v-for="countryes in countryList"
                  :value="countryes"
                  >{{ countryes.name }}</option
                >
              </select>
            </div>
            <div
              v-if="selectedCountry"
              class="app_form_body_descr_input_container"
            >
              <label for="app_form_subcategory_select">Город</label>
              <select
                v-model="selectedCity"
                name="app_form_subcategory_select"
                id="app_form_subcategory_select"
              >
                <option
                  v-for="city in cityList"
                  :value="city"
                  >{{ city.name }}</option
                >
              </select>
            </div>
            <div class="app_form_body_attach_container">
              <p>Прикрепить файлы</p>
              <div style="width: 200px; height: 200px; float: left;">
                <LightBox
                  v-if="imagesOnGood && imagesOnGood[0]"
                  album="mm"
                  :src="imagesOnGood[0].original_size_path"
                >
                  <img :src="imagesOnGood[0].sharp_path" alt  style="width: 200px; height: 200px; float: left;"class="maessage_upload_img" />
                </LightBox>
                  <span   v-if="imagesOnGood && imagesOnGood[0]"  @click="deleteImage(0)">Удалить</span>
                <FilePond
                 v-if="!imagesOnGood[0]"
                  ref="pond_1"
                  label-idle="Перетащите изображение сюда ..."
                  accepted-file-types="image/jpeg, image/png"
                  v-on:init="handleFilePondInit_1"
                  :server="server_1"
                  name="uploadfile"
                  :beforeAddFile="handleFilePondInit_1"
                  :onprocessfile="deleteImageOnPopup_1"
                />
              </div>
              <div
                style="width: 200px; height: 200px; float: left; margin-left: 20px;"
              >
                <LightBox
                  v-if="imagesOnGood && imagesOnGood[1]"
                  album="mm"
                  :src="imagesOnGood[1].original_size_path"
                >
                  <img :src="imagesOnGood[1].sharp_path" alt  style="width: 200px; height: 200px; float: left;"class="maessage_upload_img" />
                </LightBox>
                <span  v-if="imagesOnGood && imagesOnGood[1]" @click="deleteImage(1) ">Удалить</span>
                <FilePond
                  v-if="!imagesOnGood[1]"
                  ref="pond_2"
                  label-idle="Перетащите изображение сюда ..."
                  accepted-file-types="image/jpeg, image/png"
                  v-on:init="handleFilePondInit_2"
                  :server="server_2"
                  name="uploadfile"
                  :beforeAddFile="handleFilePondInit_2"
                  :onprocessfile="deleteImageOnPopup_2"
                />
              </div>
              <div
                style="width: 200px; height: 200px; float: left; margin-left: 20px;"
              >
                <LightBox
                  v-if="imagesOnGood && imagesOnGood[2]"
                  album="mm"
                  :src="imagesOnGood[2].original_size_path"
                >
                  <img :src="imagesOnGood[2].sharp_path" alt  style="width: 200px; height: 200px; float: left;"class="maessage_upload_img" />
                </LightBox>
                <span  v-if="imagesOnGood && imagesOnGood[2]" @click="deleteImage(2)">Удалить</span>
                <FilePond
                  v-if="!imagesOnGood[2]"
                  ref="pond_3"
                  label-idle="Перетащите изображение сюда ..."
                  accepted-file-types="image/jpeg, image/png"
                  v-on:init="handleFilePondInit_3"
                  :server="server_3"
                  name="uploadfile"
                  :beforeAddFile="handleFilePondInit_3"
                  :onprocessfile="deleteImageOnPopup_3"
                  :imagePreviewMaxHeight="180"
                  :imagePreviewMinHeight="180"
                />
              </div>
            </div>
            <hr />
            <div class="app_form_button">
              <button @click="createGood">Опубликовать</button>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Money } from 'v-money';

export default {
  name: 'createGood',
  components: {
    Money,
  },
  data() {
    return {
      disableButton: true,
      type: '2',
      title: '',
      term: '',
      groupList: [],
      categoryList: [],
      subCategoryList: [],
      cityList: '',
      countryList: '',
      selectedCountry: {},
      selectedCity: {},
      selectedGroup: {},
      selectedCategory: {},
      selectedSubCategory: {},
      description: '',
      server_1: {
        url: '',
      },
      server_2: {
        url: '',
      },
      server_3: {
        url: '',
      },
      loadedImage: [],
      imagesOnGood: '',
      price: '',
      money: {
        decimal: ',',
        thousands: ' ',
        precision: 0,
        suffix: ' ',
        masked: false,
      },
      good_id: '',
    };
  },
  created() {
    if (this.$route.name === 'updateGood') {
      this.getThisGood();
    }
    this.getALLGroups();
    this.getAllCountries();
    if (this.$auth.getUser().shop) {
      this.type = '1';
    } else {
      this.type = '0';
    }
  },
  watch: {
    selectedGroup(newVal, oldaVal) {
      if (this.$route.name != 'updateGood') {
        this.selectedCategory = '';
        this.categoryList = '';
      }
      if (newVal != null) { this.getAllCategories(newVal); }
    },
    selectedCategory(newVal, oldaVal) {
      if (this.$route.name != 'updateGood') {
        this.selectedSubCategory = '';
        this.subCategoryList = '';
      }
      if (newVal != null) { this.getAllSubcategories(newVal); }
    },
    selectedCountry(newVal, oldaVal) {
      this.getAllCities(newVal.id);
    },
  },
  methods: {
    getThisGood() {
      this.$axios.get(`/getOneGood/${this.$route.params.uniqurl}`).then((response) => {
        console.log(response.data);
        this.good_id = response.data.id;
        this.type = response.data.type_id;
        this.price = response.data.price;
        this.title = response.data.title;
        this.term = response.data.term;
        this.imagesOnGood = response.data.good_image;
        this.selectedCountry = response.data.good_country;
        this.selectedCity = response.data.good_city;
        this.selectedGroup = response.data.good_group;
        this.selectedCategory = response.data.good_categories;
        this.selectedSubCategory = response.data.good_subcategory;
        this.description = response.data.description;
      }).catch((err) => {
        console.log(err);
      });
    },
    handleFilePondInit_1() {
      const servers =
        // "http://localhost:3000/api/" +
        'http://185.22.64.121:3000/api/uploadResizeFileNoId/md';
      this.server_1 = servers;
    },
    handleFilePondInit_2() {
      const servers =
        // "http://localhost:3000/api/" +
        'http://185.22.64.121:3000/api/uploadResizeFileNoId/md';
      this.server_2 = servers;
    },
    handleFilePondInit_3() {
      const servers =
        // "http://localhost:3000/api/" +
        'http://185.22.64.121:3000/api/uploadResizeFileNoId/md';
      this.server_3 = servers;
    },
    deleteImageOnPopup_1(error, file) {
      this.loadedImage.push(JSON.parse(file.serverId).id);
      const servers =
        // "http://localhost:3000/api/" + "deleteImg/" + this.loadedImage.id;
        `http://185.22.64.121:3000/api/deleteImg/${
          JSON.parse(file.serverId).id
        }`;
      this.server_1 = servers;
    },
    deleteImageOnPopup_2(error, file) {
      this.loadedImage.push(JSON.parse(file.serverId).id);
      const servers =
        // "http://localhost:3000/api/" + "deleteImg/" + this.loadedImage.id;
        `http://185.22.64.121:3000/api/deleteImg/${
          JSON.parse(file.serverId).id
        }`;
      this.server_2 = servers;
    },
    deleteImageOnPopup_3(error, file) {
      this.loadedImage.push(JSON.parse(file.serverId).id);
      const servers =
        // "http://localhost:3000/api/" + "deleteImg/" + this.loadedImage.id;
        `http://185.22.64.121:3000/api/deleteImg/${
          JSON.parse(file.serverId).id
        }`;
      this.server_3 = servers;
    },
    deleteImage(index) {
      this.$axios.delete(`http://185.22.64.121:3000/api/deleteImg/${
        this.imagesOnGood[index].id
      }`).then((response) => {
        this.imagesOnGood.splice(index, 1);
        // this.imagesOnGood[index] = '';
        // delete this.imagesOnGood[index];
        this.showAlert({
          title: response.data.mes,
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    addImage() {
      // console.log('00000');
      this.loader = true;
      const data = new FormData();
      data.append('uploadfile', this.$refs.pond.getFile().file);
      this.$axios
        .post(`/uploadResizeFile/chat/${this.selectedChat.id}/md`, data)
        .then((resize) => {
          this.loadedImage = resize.data;
          // console.log(resize);
        });
    },
    getALLGroups() {
      this.$axios.get('/getAllGroups').then((response) => {
        this.groupList = response.data;
      });
    },
    getAllCategories(group) {
      if (this.selectedGroup !== '') {
        this.$axios.get(`/getAllCategories/${group.id}`).then((response) => {
          this.categoryList = response.data.categoriesOnGroup;
        });
      }
    },
    getAllSubcategories(categories) {
      if (this.selectedCategory !== '') {
        this.$axios
          .get(`/getAllSubcategories/${categories.id}`)
          .then((response) => {
            this.subCategoryList = response.data.subcategoriesOnGroup;
          });
      }
    },
    getAllCountries() {
      this.$axios.get('/getAllCountries').then((response) => {
        this.countryList = response.data;
        if (this.$route.name != 'updateGood') {
          this.selectedCountry = response.data[0];
        }
        this.money.suffix = ` ${this.selectedCountry.currency}`;
      }).catch((err) => {
        console.log(err);
      });
    },
    getAllCities(country_id) {
      this.$axios.get(`/getAllCitys/${country_id}`).then((response) => {
        this.cityList = response.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    createGood() {
      this.$validator.validate().then((valid) => {
        if (!valid) {
          console.log('valid', valid);
        } else if (!this.selectedGroup) {
          this.showAlert({
            mes: 'Выберите рубрику',
            title: 'Ой..',
            type: 'error',
          });
        } else
        if (!this.selectedCategory) {
          this.showAlert({
            mes: 'Выберите группу',
            title: 'Ой..',
            type: 'error',
          });
        } else
        if (!this.selectedSubCategory) {
          this.showAlert({
            mes: 'Выберите категорию',
            title: 'Ой..',
            type: 'error',
          });
        } else
        if (!this.selectedCity) {
          this.showAlert({
            mes: 'Выберите город',
            title: 'Ой..',
            type: 'error',
          });
        } else {
          const data = {
            owner_id: 1,
            // shop_id: 2,
            title: this.title,
            description: this.description,
            images: this.loadedImage,
            // unit: 7,
            // new_price: 8,
            price: this.price,
            city_id: this.selectedCity.id,
            country_id: this.selectedCountry.id,
            type_id: this.type,
            group_id: this.selectedGroup.id,
            category_id: this.selectedCategory.id,
            subcategory_id: this.selectedSubCategory.id,
            term: Number(this.term),
          };
          if (this.$auth.getUser().shop) {
            data.shop_id = this.$auth.getUser().shop_id;
          }
          if (this.$route.name != 'updateGood') {
            this.$axios.post('/createGood', data).then((response) => {
              if (!response) {
                alert(response);
                console.log(response);
              } else {
                console.log(response);
                this.showAlert({
                  title: response.data.mes,
                  type: 'success',
                });
                this.$router.push({ path: '/myaccount' });
              }
            }).catch((error) => {
              console.log(error);
              alert(error);
            });
          } else {
            this.$axios.post(`/updateGood/${this.good_id}`, data).then((response) => {
              if (!response) {
                alert(response);
                console.log(response);
              } else {
                console.log(response);
                this.showAlert({
                  title: response.data.mes,
                  type: 'success',
                });
                this.$router.push({ path: '/myaccount' });
              }
            }).catch((error) => {
              console.log(error);
              alert(error);
            });
          }
        }
      });
    },
    showAlert(mes) {
      this.$swal({
        type: mes.type,
        title: mes.title,
        text: mes.mes,
      });
    },
  },
};
</script>

<style scoped>
svg {
  position: relative;
}
</style>
