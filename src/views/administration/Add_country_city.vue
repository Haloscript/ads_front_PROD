<template>
  <div class="content_container col-lg-8">
    <div class="content_label">
      <h4>Управление расположением</h4>
    </div>
    <div class="content_tabs">
      <div class="content_container col-lg-8">
      </div>
      <div class="content_tabs category_edit_container">
        <p>Выберите страну или город которые вы хотите отредактировать</p>
        <ul>
          <li>
        <label for="app_form_subcategory_select">Список странн</label>
        <select
          v-model="selectedCountry"
          name="app_form_subcategory_select"
          id="app_form_subcategory_select"
          @change="evtOnCountry()"
        >
          <option ref="country"


                  v-for="countryes in countryList"
                  :value="countryes"
          >Наименование:{{ countryes.name }}, Валюта:{{countryes.currency}}</option
          >
        </select>
          </li>
          <li>
        <label for="app_form_subcategory_select">Список Городов</label>
        <select
          v-model="selectedCity"
          name="app_form_subcategory_select"
          id="app_form_subcategory_select"
          @change="evtOnCity()"
        >
          <option

            v-for="city in cityList"
            :value="city"
          >{{ city.name }}</option
          >
        </select>
          </li>
          <li v-if="selectedCountry">
            <h4>Редактирование Страны {{selectedCountry.name}}</h4>
            <button @click="deleteCountry()" style="float: right">Удалить страну</button>
            <p>Наименование страны</p>
            <input v-model="updateCountryName" type="text">
            <p>Валюта</p>
            <input v-model="updateCountryCurrency" type="text">
          </li>
          <li v-if="selectedCity  ">
            <h4>Редактирование Города {{selectedCity.name}}</h4>
            <button @click="deleteCity()" style="float: right">Удалить город</button>
            <p>Укажите страну в которой находится город</p>
          <select
            v-model="selectedCountryInCityUpdate"
            name="app_form_subcategory_select"
            id="app_form_subcategory_select"
          >
            <option ref="country"
                    v-for="countryes in countryList"
                    :value="countryes"
            >Наименование:{{ countryes.name }}, Валюта:{{countryes.currency}}</option
            >
          </select>
            <p>Наименование города</p>
            <input v-model="updateCityName" type="text">
          </li>
        </ul>

        <li>
          <button @click="updateNew()">Сохранить изминения</button>
        </li>
        <li>
          <button style="float: left" data-toggle="modal"
                  data-target="#countryModal">Добавить страну</button>
        </li>
        <li>
          <button style="float: left" data-toggle="modal"
                  data-target="#cityModal">Добавить город</button>
        </li>

      </div>

    </div>
    <div class="modal" id="countryModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">
              Добавить Странну
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <p>Укажите наименование страны</p>
            <input placeholder="Например:  Костарика" v-model="newCountry.name" type="text">
            <p>Укажите валюту</p>
            <input placeholder="Например: USD" v-model="newCountry.currency" type="text">
          </div>
          <!-- Modal footer -->
          <!-- <div class="modal-footer">-->
          <!-- <button
            type="button"
            @click="sendMessage"
            class="btn btn-danger"
            data-dismiss="modal"
          >Save</button>-->
          <button
            type="button"
            @click="saveNewCountry()"
            class="btn btn-danger"
            data-dismiss="modal"
          >

            Добавить Город
          </button>
        </div>
      </div>
    </div>

    <div class="modal" id="cityModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">
            Добавить Город
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <p>Укажите наименование города</p>
            <input placeholder="Например:  Костанай" v-model="newCity.name" type="text">
            <p>Укажите Страну</p>
            <select
              v-model="newCity.country"
              name="app_form_subcategory_select"
              id="app_form_subcategory_select"
            >
              <option ref="country"
                      v-for="countryes in countryList"
                      :value="countryes"
              >Наименование:{{ countryes.name }}, Валюта:{{countryes.currency}}</option
              >
            </select>
          </div>


          <!-- Modal footer -->
          <!-- <div class="modal-footer">-->
          <!-- <button
            type="button"
            @click="sendMessage"
            class="btn btn-danger"
            data-dismiss="modal"
          >Save</button>-->
          <button
            type="button"
            @click="saveNewCity()"
            class="btn btn-danger"
            data-dismiss="modal"
          >
            Добавить Город
          </button>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'Add_country_city',
  data() {
		  return {
      countryList: '',
      cityList: '',
      selectedCountry: '',
      selectedCity: '',
      updateCountryName: '',
      updateCountryCurrency: '',
      updateCityName: '',
      selectedCountryInCityUpdate: {},
      newCountry: {
        name: '',
        currency: '',
      },
      newCity: {
        country: '',
        name: '',
      },
    };
  },
  watch: {
    selectedCity() {
      this.updateCityName = this.selectedCity.name;
      this.selectedCountryInCityUpdate = this.selectedCity.city_country;
    },
    selectedCountry() {
      this.updateCountryName = this.selectedCountry.name;
      this.updateCountryCurrency = this.selectedCountry.currency;
    },
  },
  created() {
    this.getAllCountries();
    this.getAllCities();
  },
  methods: {
    evtOnCountry() {
      this.selectedCity = '';
    },
    evtOnCity() {
      this.selectedCountry = '';
    },
    getAllCountries() {
      this.$axios.get('/getAllCountries').then((response) => {
        this.countryList = response.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    getAllCities() {
      this.$axios.get('/admin/getAllCitiesNoCountry').then((response) => {
        this.cityList = response.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    saveNewCountry() {
      const data = {
        name: this.newCountry.name,
        currency: this.newCountry.currency,
      };
      this.$axios.post('/admin/addCountry', data).then((res) => {
        this.showAlert({
          title: res.data.mes,
          type: 'success',
        });
        this.newCountry.name = ''
        this.newCountry.currency = ''
        this.countryList.push(res.data.country);
      }).catch((err) => {
        console.log(err);
      });
    },
    saveNewCity() {
      const data = {
        country_id: this.newCity.country.id,
        name: this.newCity.name,
      };
      this.$axios.post('/admin/addCity', data).then((res) => {
        this.showAlert({
          title: res.data.mes,
          type: 'success',
        });
        this.newCity.country = ''
        this.newCity.name = ''
        this.cityList.push(res.data.city);
      }).catch((err) => {
        console.log(err);
      });
    },
    updateNew() {
      const data = {};
      if (this.selectedCity) {
        data.name = this.updateCityName;
        data.country_id = this.selectedCountryInCityUpdate.id;
        this.$axios.post(`/admin/updateCity/${this.selectedCity.id}`, data).then((res) => {
          this.showAlert({
            title: res.data.mes,
            type: 'success',
          });
        }).catch((err) => {
          console.log(err);
        });
      } else {
        data.name = this.updateCountryName;
        data.currency = this.updateCountryCurrency;
        this.$axios.post(`/admin/updateCountry/${this.selectedCountry.id}`, data).then((res) => {
          this.showAlert({
            title: res.data.mes,
            type: 'success',
          });
        }).catch((err) => {
          console.log(err);
        });
      }
    },

    deleteCountry() {
      this.$axios.get(`/admin/deleteCountry/${this.selectedCountry.id}`).then((res) => {
        if (res.data.status !== 'err') {
          this.showAlert({
            title: res.data.mes,
            type: 'success',
          });
          const i = _.findIndex(this.countryList, o => o.id === this.selectedCountry.id);
          this.countryList.splice(i, 1);
          this.selectedCountry = '';
        } else {
          this.showAlert({
            title: res.data.mes,
            type: 'error',
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    deleteCity() {
      this.$axios.get(`/admin/deleteCity/${this.selectedCity.id}`).then((res) => {
        if (res.data.status !== 'err') {
          this.showAlert({
            title: res.data.mes,
            type: 'success',
          });
          const i = _.findIndex(this.cityList, o => o.id === this.selectedCity.id);
          console.log(i, '----');
          this.cityList.splice(i, 1);
          this.selectedCity = '';
        } else {
          this.showAlert({
            title: res.data.mes,
            type: 'error',
          });
        }
      }).catch((err) => {
        console.log(err);
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

</style>
