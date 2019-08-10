<template>
  <div>
    <div class="content_container col-lg-8">
      <div class="content_label">
        <h4
          v-if="$route.path === '/administration/updateadmin/' + $route.params.id"
        >Редактировать модератора</h4>
        <h4 v-if="$route.path === '/administration/addadmin/'">Добавить модератора</h4>
      </div>
      <div class="content_tabs category_edit_container user_edit">
        <div>
          <ul>
            <li v-if="$route.path === '/administration/updateadmin/' + $route.params.id">
              <div>
                <avatar :src="user.img" :size="60" :username="user.firstname + ' ' + user.lastname"></avatar>
              </div>
              <button data-toggle="modal" data-target="#myModal">Изменить</button>
            </li>

            <li>
              <p>Фамилия</p>
              <input
                v-model="lastname"
                type="text"
                name="user_name"
                placeholder="Фамилия"
                value="Ермолаев Иван"
              >
            </li>
            <li>
              <p>Имя</p>
              <input
                v-model="firstname"
                type="text"
                name="user_name"
                placeholder="Имя"
                value="Ермолаев Иван"
              >
            </li>
            <hollow-dots-spinner
              v-if="!user && $route.fullpath === '/administration/updateadmin/' + $route.params.id"
              :animation-duration="1000"
              :dot-size="20"
              :dots-num="3"
              :color="'#ff1d5e'"
            />
            <li>
              <p>Номер телефона</p>
              <the-mask v-model="phone" :masked="true" mask="# (###) ###-##-##"/>
            </li>
            <li>
              <p>E-mail</p>
              <input
                v-model="email"
                type="text"
                name="user_mail"
                placeholder="E-mail"
                value="Fingman8@gmail.com"
              >
            </li>
            <li>
              <p>Пароль</p>
              <input v-model="password" type="password" name="user_mail">
            </li>
            <button @click="saveChange()">Сохранить</button>
          </ul>
        </div>
      </div>
    </div>
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4
              class="modal-title"
            >Добавьте изображение или просто перетащите его в назначеную область</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
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
            @click="setAvatarImg()"
          >Применить</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TheMask } from 'vue-the-mask';
import Avatar from 'vue-avatar';

export default {
  components: {
    avatar: Avatar,
    TheMask,
  },
  name: 'updateadmin',
  watch: {},
  data() {
    return {
      user: '',
      lastname: '',
      firstname: '',
      phone: '',
      email: '',
      password: '',
      loadedImage: '',
      server: {
        url: '',
      },
    };
  },
  mounted() {
    if (
      this.$route.path ===
      `/administration/updateadmin/${this.$route.params.id}`
    ) {
      this.getUser();
    }
  },
  methods: {
    setAvatarImg() {
      this.user.img = this.loadedImage.sharp_path;
    },
    getUser() {
      this.$axios(`/admin/getOneUser/${this.$route.params.id}`)
        .then((response) => {
          this.user = response.data;
          this.lastname = this.user.lastname;
          this.firstname = this.user.firstname;
          this.phone = this.user.phone;
          this.email = this.user.email;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveChange() {
      const body = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        phone: this.phone,
        id: this.$route.params.id,
        img: this.loadedImage.sharp_path,
      };
      if (
        this.$route.path ===
        `/administration/updateadmin/${this.$route.params.id}`
      ) {
        this.$axios
          .post('/admin/updateAdmin', body)
          .then((response) => {
            if (
              response.data.updated === true ||
              response.data.message === 'Registered successfully!'
            ) {
              this.showAlert({
                mes: response.data.mes,
                title: '',
                type: 'success',
              });
              this.$router.push({ path: '/administration/adminslist' });
            } else {
              this.showAlert({
                mes: 'Не удалось обновить',
                title: 'Ой..',
                type: 'error',
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        body.password = this.password;
        body.roles = ['manager'];
        this.$axios.post('/auth/signup', body).then((response) => {
          this.showAlert({
            mes: response.data.mes,
            title: '',
            type: 'success',
          });
          this.$router.push({ path: '/administration/adminslist' });
        });
      }
    },
    handleFilePondInit() {
      if (this.user && !this.user.img) {
        const servers =
          `${'http://185.22.64.121:3000/api/' +
          'uploadResizeFile/user/'}${
            this.$route.params.id
          }/xs`;
        this.server = servers;
      } else if (this.user && this.user.img) {
        const servers =
          `${'http://185.22.64.121:3000/api/' +
          'updateResizeFile/user/'}${
            this.$route.params.id
          }/xs`;
        this.server = servers;
      }
    },
    deleteImageOnPopup() {
      // console.log(JSON.parse(this.$refs.pond.getFile().serverId));
      this.loadedImage = JSON.parse(this.$refs.pond.getFile().serverId);
      const servers =
        `${'http://185.22.64.121:3000/api/' + 'deleteImg/'}${this.loadedImage.id}`;
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
        .post(`/uploadResizeFile/chat/${this.selectedChat.id}/xs`, data)
        .then((resize) => {
          this.loadedImage = resize.data;
          // console.log(resize);
        });
    },
    showAlert(mes) {
      // console.log(mes);
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

