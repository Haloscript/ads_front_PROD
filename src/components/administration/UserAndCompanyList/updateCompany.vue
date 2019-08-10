<template>
  <div>
    <div class="content_container col-lg-8">
      <div class="content_label">
        <h4>Редактировать Компанию</h4>
      </div>
      <div class="content_tabs category_edit_container user_edit">
        <div>
          <ul>
            <li>
              <avatar v-if="shop && !shop.img" :size="40" :username="shop.title"></avatar>
            </li>

            <li>
              <p>Наименование</p>
              <input
                v-model="title"
                type="text"
                name="user_name"
                placeholder="Ф.И.О"
                value="Ермолаев Иван"
              >
            </li>
            <li>
              <p>Адресс</p>
              <input
                v-model="address"
                type="text"
                name="user_name"
                placeholder="Ф.И.О"
                value="Ермолаев Иван"
              >
            </li>
            <hollow-dots-spinner
              v-if="!shop"
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
              <p>Описание</p>
              <textarea v-model="description" rows="5" cols="70"></textarea>
            </li>
            <button @click="saveChange()">Сохранить</button>
            <button
              v-if="shop.moderation === false || shop.moderation === null"
              @click="moderation()"
            >Активация</button>
            <button
              v-if="shop.blocked === true"
              @click="blockedUser('unBlock')"
              class="user_delete_button_blocked"
            >Разблокировать</button>
            <button
              v-if="shop.blocked === false || shop.blocked === null"
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
  name: "updateCompany",
  watch: {},
  data() {
    return {
      shop: "",
      title: "",
      phone: "",
      params: "",
      description: "",
      address: "",
      email: ""
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$axios("/admin/getOneShop/" + this.$route.params.id)
        .then(response => {
          this.shop = response.data;
          this.phone = this.shop.phone;
          this.params = this.shop.params;
          this.description = this.shop.description;
          this.address = this.shop.address;
          this.email = this.shop.email;
          this.title = this.shop.title;
        })
        .catch(err => {
          console.log(err);
        });
    },
    blockedUser(params) {
      if (params === "block") {
        this.$axios
          .get("/admin/blockedShop/" + this.$route.params.id)
          .then(response => {
            // console.log(response);
            this.showAlert({
              mes: response.data.mes,
              title: "",
              type: "success"
            });
            this.shop = response.data.shop;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$axios
          .get("/admin/unBlockedShop/" + this.$route.params.id)
          .then(response => {
            // console.log(response);
            this.showAlert({
              mes: response.data.mes,
              title: "",
              type: "success"
            });
            this.shop = response.data.shop;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    saveChange() {
      let body = {
        params: this.params,
        description: this.description,
        email: this.email,
        phone: this.phone,
        id: this.$route.params.id,
        address: this.address,
        title: this.title
      };
      this.$axios
        .post("/admin/updateShop", body)
        .then(response => {
          if (response.data.updated === true) {
            this.showAlert({
              mes: response.data.mes,
              title: "",
              type: "success"
            });
            this.$router.push({
              path: "/administration/userslistmain/companylist"
            });
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
    moderation() {
      this.$axios
        .get("/admin/moderationShop/" + this.$route.params.id)
        .then(response => {
          this.showAlert({
            mes: response.data.mes,
            title: "",
            type: "success"
          });
          this.shop = response.data.shop;
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



