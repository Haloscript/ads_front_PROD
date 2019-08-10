<template>
  <div id="menu2" class="container tab-pane "><br>
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
    <div class="account_description col-lg-9">
      <textarea v-model="description"></textarea>
      <button @click="updateDescription()">Сохранить</button>
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
              :beforeRemoveFile="deleteImageOnPopup"
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
</div> </template>

<script>
export default {
  name: 'AccountOptions',
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
      server: {
        url: '',
      },
    };
  },
  created() {
    if (!this.$auth.getUser().img) {
      // console.log('1')
      this.userAvatar = '';
    } else {
      // console.log('2')
      this.userAvatar = this.$auth.getUser().img;
    }
  },
  methods: {
    readyImg() {
      this.userAvatar = this.loadedImage.sharp_path;
    },
    handleFilePondInit() {
      const servers =
        // "http://localhost:3000/api/" +
        `${'http://185.22.64.121:3000/api/' + 'uploadResizeFile/user/'}${
          this.$auth.getUser().id
          }/sm`;
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
        // console.log(response);
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

