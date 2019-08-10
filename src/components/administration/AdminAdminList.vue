<template>
  <div>
    <div class="content_container col-lg-8">
      <div class="content_label">
        <h4>Администрация</h4>
        <router-link :to="{path: '/administration/addadmin/'}" class="add_cat_button">Добавить</router-link>
      </div>
      <div class="content_tabs">
        <div class="content_tabs_table users_table">
          <table class="content_tabs_table_row">
            <tr>
              <th>Имя</th>
              <th style="text-align: center;">Фото</th>
              <th style="text-align: center;">Чат</th>
              <th style="text-align: center;">Дата создания</th>
              <th style="text-align: center;">Роль</th>
              <th style="text-align: center;">Действие</th>
            </tr>
            <tr v-for="admin in allAdmins.users" :key="admin.id">
              <td>{{admin.firstname}} {{admin.lastname}}</td>
              <td>
                <div class="small_ava">
                  <avatar
                    :src="admin.img"
                    :size="50"
                    :username="admin.firstname + ' ' + admin.lastname"
                  ></avatar>
                  <!-- <img :src="require('@/assets/images/small_ava1.jpg')"> -->
                </div>
              </td>
              <td>
                <img
                  @click="goToChats(admin)"
                  class="small_icon"
                  :src="require('@/assets/images/color_chat_icon.svg')"
                >
              </td>
              <td style="text-align: center;">{{moment(admin.createdAt).format('DD.MM.YY')}}</td>
              <td v-if="admin.roles[0].name === 'ADMIN'" style="text-align: center;">Админ</td>
              <td v-if="admin.roles[0].name === 'MANAGER'" style="text-align: center;">Менеджер</td>
              <td style="text-align: center;">
                <router-link :to="{path: '/administration/updateadmin/' + admin.id }">Редактировать</router-link>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdminAdminList',
  data() {
    return {
      allAdmins: '',
      pageNum: 1,
    };
  },
  mounted() {
    this.getAllAdministarations(this.pageNum);
  },
  methods: {
    getAllAdministarations(pageNum) {
      this.$axios
        .get(`/admin/getAllAdministaration/${pageNum}/4`)
        .then((response) => {
          this.allAdmins = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goToChats(user) {
      const data = {
        owner_id: user.id,
      };
      this.$axios
        .post('/sendMessage', data)
        .then((response) => {
          console.log(response);
          const data = response.data;
          this.$router.push({
            name: 'adminChats',
            path: '/administration/adminchats',
            params: { data },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
