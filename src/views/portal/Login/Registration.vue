<template>
  <section class="login_body">
    <div class="login_form_container">
      <img
        class="login_form_logo"
        :src="require('@/assets/images/logo_color.png')"
      />
      <h4>Регистрация</h4>
      <div class="reg_form_container">
        <span v-if="errors.first('Имя')" class="alert alert-danger">{{ errors.first("Имя") }}</span>
        <input
          v-validate="'required'"
          v-model="firstname"
          type="name"
          name="Имя"
          placeholder="Ваше Имя"
        />
        <span v-if="errors.first('Фамилия')"  class="alert alert-danger">{{ errors.first("Фамилия") }}</span>
        <input
          v-validate="'required'"
          v-model="lastname"
          type="name"
          name="Фамилия"
          placeholder="Ваша Фамилия"
        />
        <span v-if="errors.first('email')"  class="alert alert-danger">{{ errors.first("email") }}</span>
        <input
          ref="email"
          v-validate="'required|email'"
          v-model="email"
          type="mail"
          name="email"
          placeholder="Ваше E-mail"
        />
        <!--<input v-model="phone" type="mail" name="login_mail" >-->
        <the-mask
          v-model="phone"
          :masked="true"
          mask="+7 (###) ###-##-##"
          placeholder="Ваш Номер Телефона"
        />
        <span v-if="errors.first('пароль')"  class="alert alert-danger">{{ errors.first("пароль") }}</span>
        <input
          v-model="password"
          ref="паролем"
          v-validate="'required|min:8'"
          type="password"
          name="пароль"
          placeholder="Пароль"
        />
        <span v-if="errors.first('password_confirmation')"  class="alert alert-danger">{{ errors.first('password_confirmation') }}</span>
        <input v-validate="'required|min:8|confirmed:паролем'"
          type="password"
          data-vv-as="  "
          name="password_confirmation"
          placeholder="Повторите пароль"
        />
        <div class="reg_form_radios">
          <h4>Зарегистрировать как:</h4>
          <div class="reg_form_label_wrapper">
            <p>Исполнитель</p>
            <input  type="radio" name="customer" v-model="isShop"  id="company" :value="true">
            <label for="company">
              <div></div>
            </label>
          </div>
          <div class="reg_form_label_wrapper">
            <p>Клиент</p>
            <input type="radio"  v-model="isShop" name="customer" checked="checked" id="customer" :value="false">
            <label for="customer">
              <div></div>
            </label>
          </div>
        </div>
          <div v-if="isShop">
            <span v-if="errors.first('Название компании')"  class="alert alert-danger" >{{ errors.first("Название компании") }}</span>
            <input
              v-validate="'required'"
              v-model="shopInform.title"
              type="name"
              name="Название компании"
              placeholder="Название компании"
            />
            <span v-if="errors.first('Номер Телефона')"  class="alert alert-danger">{{ errors.first("Номер Телефона") }}</span>
            <the-mask
              v-model="shopInform.phone"
              :masked="true"
              mask="+7 (###) ###-##-##"
              placeholder="Номер Телефона"
              v-validate="'required'"
              name="Номер Телефона"
            />
            <input
              ref="email"
              v-model="shopInform.email"
              type="mail"
              name="email компании"
              placeholder="E-mail вашей компании"
            />
            <input
              v-model="shopInform.address"
              type="name"
              name="Адресс компании"
              placeholder="Адресс компании"
            />
            <div class="md-form">
              <label for="form7">Описание компании</label>
              <textarea placeholder="Краткое описание компании" v-model="shopInform.description" id="form7" class="md-textarea form-control" rows="3"></textarea>
            </div>

            <label for="form7">Расположение</label>
            <div class="md-form">
              <div
                v-if="countryList"
                class="app_form_body_descr_input_container"
              >
                <label for="app_form_subcategory_select">Страна</label>
                <select
                  v-model="shopInform.selectedCountry"
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
              <span v-if="errors.first('city')"  class="alert alert-danger">{{ errors.first('city') }}</span>
              <div
                v-if="shopInform.selectedCountry"
                class="app_form_body_descr_input_container"
              >
                <label for="app_form_subcategory_select">Город</label>
                <select
                  data-vv-as="Город" name="city"  v-validate="'required'"
                  v-model="shopInform.selectedCity"
                  id="app_form_subcategory_select"
                >
                  <option
                    v-for="city in cityList"
                    :value="city"
                  >{{ city.name }}</option
                  >
                </select>
              </div>
              <span v-if="errors.first('minDescr')"  class="alert alert-danger">{{ errors.first('minDescr') }}</span>
              <label for="form7">Род деятельности</label>
              <textarea  name="minDescr" placeholder="Например - фрилансер, торгово-производственная компания, маркетинговое агенство итд ..."  data-vv-as="Род деятельности"  v-validate="'max: 35'" v-model="shopInform.minDescr" id="form7" class="md-textarea form-control" rows="3"></textarea>
            </div>
          </div>

        <button @click="registration">Присоединиться к ADS Help</button>
      </div>
      <h6>
        Регистрируясь, вы подтверждаете, что принимаете
        <a href="">Условия пользования</a> и
        <a href="">Политику конфиденциальности</a>
      </h6>
      <hr />
      <h5>
        Уже зарегистрированы?
        <router-link :to="{ name: 'Login' }">Войти</router-link>
      </h5>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Registration',
  data() {
    return {
      firstname: '',
      img: '',
      lastname: '',
      email: '',
      phone: '',
      password: '',
      isShop: false,
      countryList: '',
      cityList: '',
      shopInform: {
        title: '',
        phone: '',
        description: '',
        address: '',
        email: '',
        minDescr: '',

        selectedCountry: '',
        selectedCity: '',
      },
    };
  },
  created() {
    this.getAllCountries();
  },
  watch: {
  },
  methods: {
    registration() {
      this.$validator.validate().then((valid) => {
        if (!valid) {
          // console.log("valid", valid);
        } else {
          const data = {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            phone: this.phone,
            password: this.password,
            roles: ['user'],
          };
          this.$axios.post('/auth/signup', data).then((response) => {
            console.log(response);
            if (response.data.error) {
              console.log(this.$refs.email);
              this.email = '';
              this.$refs.email.focus();
              this.showAlert({
                mes: response.data.mes,
                title: 'Ой..',
                type: 'error',
              });
            }
            if (this.isShop) {
              const shopData = {
                title: this.shopInform.title,
                phone: this.shopInform.phone,
                description: this.shopInform.description,
                address: this.shopInform.address,
                email: this.shopInform.email,
                user_id: response.data.user.id,
                params: this.shopInform.minDescr,
                country_id: this.shopInform.selectedCountry.id,
                city_id: this.shopInform.selectedCity.id,
              };
              this.$axios.post('/createShop', shopData).then((shopCreate) => {
                if (shopCreate.data.create) {
                  this.showAlert({
                    title: shopCreate.data.mes,
                    type: 'success',
                  });
                  this.$router.push({ name: 'Main' });
                } else {
                  this.showAlert({
                    title: response.data.details,
                    type: 'success',
                  });
                }
              }).catch((err) => {
                console.log(err);
              });
            } else {
              this.showAlert({
                title: response.data.mes,
                type: 'success',
              });
              this.$router.push({ name: 'Main' });
            }
          });
        }
      });
    },
    getAllCountries() {
      this.$axios.get('/getAllCountries').then((response) => {
        this.countryList = response.data;
        if (this.$route.name != 'updateGood') {
          this.shopInform.selectedCountry = response.data[0];
        }
        this.getAllCities(this.shopInform.selectedCountry.id);
      }).catch((err) => {
        console.log(err);
      });
    },
    getAllCities(countryId) {
      this.$axios.get(`/getAllCitys/${countryId}`).then((response) => {
        this.cityList = response.data;
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

<style scoped></style>
<!--"roles":["user"]-->
