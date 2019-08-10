<template>
  <div>
  <div class="content_tabs">
    <ul class="nav nav-tabs">
      <li class="nav-item">
          <a class="nav-link active" @click="goContent('home')" data-toggle="tab" href="#home">Изменить информацию о пользователе</a>
      </li>
      <li class="nav-item">
          <a class="nav-link " @click="goContent('menu1')" data-toggle="tab" href="#menu1">Изменить информацию о компании</a>
      </li>
    </ul>

    <div class="tab-content">
      <div  v-show="show === 'home'" id="home" class="container tab-pane active"><br>
        <div class="content_tabs_table row">
          <div class="account_photo col-lg-3">
            <avatar
              :src="userAvatar"
              :size="120"
              :username="
                    $auth.getUser().firstname +
                      ' ' +
                      $auth.getUser().lastname
                  "
            ></avatar>
            <p style="cursor: pointer;"  data-toggle="modal"
               data-target="#myModal">Изменить</p>
            <input type="name"  v-model="firstname" name="login_name" placeholder="Ваше Имя">
            <input type="name" v-model="lastname" name="second_name" placeholder="Ваша Фамилия">
            <the-mask type="tel"  :masked="true"
                      mask="+7 (###) ###-##-##"  v-model="phone" name="phone" placeholder="Номер телефона"/>
            <button @click="updateUser()">Сохранить</button>
            <p style="font-size: 12px;">Смена пароля</p>
            <input type="password" v-model="old_password" name="password" placeholder="Введите предыдущий пароль">
            <span v-if="errors.first('пароль')"  class="alert alert-danger">{{ errors.first("пароль") }}</span>
            <input ref="паролем" type="password"  v-validate="'required|min:8'"
                   name="пароль"  placeholder="Пароль">
            <span v-if="errors.first('password_confirmation')"  class="alert alert-danger">{{ errors.first('password_confirmation') }}</span>
            <input type="password" v-model="password"   v-validate="'required|min:8|confirmed:паролем'"
                   data-vv-as="  "
                   name="password_confirmation"
                   placeholder="Повторите пароль">
            <button @click="updatePassword()">Изменить пароль</button>
      </div>
      </div>
      </div>
      <div v-show="show === 'menu1'" id="menu1" class="container tab-pane active"><br>
        <div class="content_tabs_table row">
          <div class="account_photo col-lg-3">
            <avatar v-if="shopFullInf"
                    :src="shopAvatar"
                    :size="120"
                    :username="shopFullInf.title"
            ></avatar>
            <p style="cursor: pointer;"  data-toggle="modal"
               data-target="#myModal">Изменить</p>
            <input v-if="shopFullInf" type="name"  v-model="companyTitle" name="login_name" placeholder="Название компании">
            <input v-if="shopFullInf" type="name" v-model="companyAddress" name="second_name" placeholder="Адресс компании">
            <input v-if="shopFullInf" type="name" v-model="companyEmail" name="second_name" placeholder="Email вашей компании">
            <the-mask  v-if="shopFullInf" type="tel"  :masked="true"
                       mask="+7 (###) ###-##-##"  v-model="companyPhone" name="phone" placeholder="Номер телефона"/>
            <button @click="updateShop()">Сохранить</button>
            <div class="account_description col-lg-9">
              <textarea v-model="companyDescription"></textarea>
              <button @click="updateShopDescription()">Сохранить описание</button>
            </div>
      </div>
      </div>
      </div>
      </div>
  </div>
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">
              Добавьте изображение или просто перетащите его в назначеную
              область
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <FilePond
              ref="pond"
              label-idle="Перетащите изображение сюда ..."
              accepted-file-types="image/jpeg, image/png"
              :beforeRemoveFile="beforeDelete"
              v-on:init="handleFilePondInit"
              :server="server"
              :onload="deleteImageOnPopup"
              name="uploadfile"
              :onprocessfile="deleteImageOnPopup"
              :beforeAddFile="handleFilePondInit"
            />
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
            class="btn btn-danger"
            data-dismiss="modal"
            @click="readyImg()"
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  </div></div></template>

<script>
export default {
  name: 'CompanyOptions',
  data() {
    return {
      firstname: this.$auth.getUser().firstname,
      lastname: this.$auth.getUser().lastname,
      phone: this.$auth.getUser().phone,
      img: this.$auth.getUser().img,
      old_password: '',
      password: '',
      description: this.$auth.getUser().description,
      userAvatar: '',
      loadedImage: '',
      shopFullInf: '',
      shopAvatar: '',
      companyTitle: '',
      companyPhone: '',
      companyEmail: '',
      companyAddress: '',
      companyDescription: '',
      correntImage: '',
      show: 'home',
      server: {
        url: '',
      },
    };
  },
  created() {
    this.getShopInformation();
    if (!this.$auth.getUser().img) {
      this.userAvatar = '';
    } else {
      this.userAvatar = this.$auth.getUser().img;
    }
  },
  methods: {
    goContent(menu) {
      if (menu === 'home') {
        this.show = 'home';
      } else { this.show = 'menu1'; }
    },
    getShopInformation() {
      this.$axios.get(`/getShop/${this.$auth.getUser().shop_id}`).then((response) => {
        this.shopFullInf = response.data;
        this.companyTitle = response.data.title;
        this.companyPhone = response.data.phone;
        this.companyEmail = response.data.email;
        this.companyAddress = response.data.address;
        this.companyDescription = response.data.description;
        if (this.shopFullInf.shop_image.length > 0) {
          this.shopAvatar = this.shopFullInf.shop_image[0].sharp_path;
          this.correntImage = this.shopFullInf.shop_image[0];
        } else {
          this.shopAvatar = '';
          this.correntImage = '';
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    readyImg() {
      if (this.show === 'home') {
        this.userAvatar = this.loadedImage.sharp_path;
      } else if (!this.correntImage) {
        this.shopAvatar = this.loadedImage.sharp_path;
      } else {
        this.$axios.post(`/saveImage/${this.correntImage.id}`).then((response) => {
          console.log(response);
          this.shopAvatar = this.loadedImage.sharp_path;
          this.correntImage = this.loadedImage;
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    handleFilePondInit() {
      let servers = '';
      if (this.show === 'home') {
        servers = // "http://localhost:3000/api/" +
          `${'http://185.22.64.121:3000/api/' + 'uploadResizeFile/user/'}${
            this.$auth.getUser().id
          }/sm`;
      } else {
        servers = // "http://localhost:3000/api/" +
          `${'http://185.22.64.121:3000/api/' + 'uploadResizeFile/shop/'}${
            this.shopFullInf.id
          }/sm`;
      }
      this.server = servers;
    },
    deleteImageOnPopup() {
      this.loadedImage = JSON.parse(this.$refs.pond.getFile().serverId);
      const servers =
          // "http://localhost:3000/api/" + "deleteImg/" + this.loadedImage.id;
          `${'http://185.22.64.121:3000/api/' + 'deleteImg/'}${
            this.loadedImage.id
          }`;
      this.server = servers;

      // this.$axios.delete("/deleteImg/" + this.loadedImage.id).then(response => {
      //   console.log(response);
      // });
    },
    beforeDelete() {
      this.loadedImage = JSON.parse(this.$refs.pond.getFile().serverId);
      this.correntImage = '';
      console.log('beforeDel');
      const servers =
        // "http://localhost:3000/api/" + "deleteImg/" + this.loadedImage.id;
        `${'http://185.22.64.121:3000/api/' + 'deleteImg/'}${
          this.loadedImage.id
        }`;
      this.server = servers;
    },
    addImage() {
      this.loader = true;
      const data = new FormData();
      data.append('uploadfile', this.$refs.pond.getFile().file);
      this.$axios
        .post(`/uploadResizeFile/chat/${this.selectedChat.id}/sm`, data)
        .then((resize) => {
          this.loadedImage = resize.data;
          // console.log(resize);
        });
    },
    updateShop() {
      const data = {
        title: this.companyTitle,
        phone: this.companyPhone,
        address: this.companyAddress,
        email: this.companyEmail,
      };
      this.$axios.post(`updateShop/${this.shopFullInf.id}`, data).then((response) => {
        this.showAlert({
          title: response.data.mes,
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    updateShopDescription() {
      this.$axios.post(`updateShopDescription/${this.shopFullInf.id}`, { description: this.companyDescription }).then((response) => {
        this.showAlert({
          title: response.data.mes,
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    updateUser() {
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        phone: this.phone,
        img: this.userAvatar,
      };
      this.$axios.post('/auth/updateUser', data).then((response) => {
        console.log(response);
        if (response.data.error) {
          this.showAlert({
            title: response.data.mes,
            type: 'error',
          });
        } else {
          this.$auth.saveUser(response.data.user);
          this.showAlert({
            title: response.data.mes,
            type: 'success',
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    updatePassword() {
      const data = {
        old_password: this.old_password,
        password: this.password,
      };
      this.$axios.post('/auth/updatePassword', data).then((response) => {
        console.log(response);
        if (response.data.code === 2) {
          this.showAlert({
            title: response.data.mes,
            type: 'error',
          });
        } else {
          this.$auth.saveUser(response.data.user);
          this.showAlert({
            title: response.data.mes,
            type: 'success',
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    updateDescription() {
      const data = {
        description: this.description,
      };
      this.$axios.post('/auth/updateDescription', data).then((response) => {
        this.$auth.saveUser(response.data.user);
        this.showAlert({
          title: response.data.mes,
          type: 'success',
        });
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

