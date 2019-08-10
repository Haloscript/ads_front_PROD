<template>
  <div>
    <div class="content_container col-lg-8">
      <div class="content_label">
        <h4>Редактировать пользователя</h4>
      </div>
      <div class="content_tabs category_edit_container user_edit">
        <div>
          <ul>
            <li>
              <avatar
                v-if="user && !user.img"
                :size="40"
                :username="user.firstname + ' ' + user.lastname"
              ></avatar>
            </li>

            <li>
              <p>Фамилия</p>
              <input
                v-model="lastname"
                type="text"
                name="user_name"
                placeholder="Ф.И.О"
                value="Ермолаев Иван"
              >
            </li>
            <li>
              <p>Имя</p>
              <input
                v-model="firstname"
                type="text"
                name="user_name"
                placeholder="Ф.И.О"
                value="Ермолаев Иван"
              >
            </li>
            <hollow-dots-spinner
              v-if="!user"
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
            <button @click="saveChange()">Сохранить</button>
            <button
              v-if="user.blocked === true"
              @click="blockedUser('unBlock')"
              class="user_delete_button_blocked"
            >Разблокировать</button>
            <button
              v-if="user.blocked === false"
              @click="blockedUser('block')"
              class="user_delete_button"
            >Заблокировать</button>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TheMask } from "vue-the-mask";
import Avatar from "vue-avatar";
export default {
  components: {
    avatar: Avatar,
    TheMask
  },
  name: "updateUser",
  watch: {},
  data() {
    return {
      user: "",
      lastname: "",
      firstname: "",
      phone: "",
      email: ""
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$axios("/admin/getOneUser/" + this.$route.params.id)
        .then(response => {
          this.user = response.data;
          this.lastname = this.user.lastname;
          this.firstname = this.user.firstname;
          this.phone = this.user.phone;
          this.email = this.user.email;
        })
        .catch(err => {
          console.log(err);
        });
    },
    blockedUser(params) {
      if (params === "block") {
        this.$axios
          .get("/admin/blockedUser/" + this.$route.params.id)
          .then(response => {
            // console.log(response);
            this.showAlert({
              mes: response.data.mes,
              title: "",
              type: "success"
            });
            this.user = response.data.user;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$axios
          .get("/admin/unblockedUser/" + this.$route.params.id)
          .then(response => {
            // console.log(response);
            this.showAlert({
              mes: response.data.mes,
              title: "",
              type: "success"
            });
            this.user = response.data.user;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    saveChange() {
      let body = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        phone: this.phone,
        id: this.$route.params.id
      };
      this.$axios
        .post("/admin/updateUser", body)
        .then(response => {
          if (response.data.updated === true) {
            this.showAlert({
              mes: response.data.mes,
              title: "",
              type: "success"
            });
            this.$router.push({ path: "/administration/userslistmain" });
          } else {
            this.showAlert({
              mes: "Не удалось обновить",
              title: "Ой..",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showAlert(mes) {
      // console.log(mes);
      this.$swal({
        type: mes.type,
        title: mes.title,
        text: mes.mes
      });
    }
  }
};
</script>
<style scoped>
</style>



