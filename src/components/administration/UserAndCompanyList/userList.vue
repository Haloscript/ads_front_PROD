<template>
  <div>
    <div class="content_tabs_table users_table">
      <table class="content_tabs_table_row">
        <tr>
          <th>Наименование</th>
          <th style="text-align: center;">Чат</th>
          <th style="text-align: center;">Дата создания</th>
          <th style="text-align: center;">Действие</th>
        </tr>
        <tr v-for="(user, index) in USERSLIST.data.users" :key="user.id">
          <td>{{user.firstname}} {{user.lastname}}</td>
          <td>
            <div>
              <img
                class="small_icon"
                @click="goToChats(user)"
                :src="require('@/assets/images/color_chat_icon.svg')"
              >
            </div>
          </td>
          <hollow-dots-spinner
            v-if="!USERSLIST.data"
            :animation-duration="1000"
            :dot-size="20"
            :dots-num="3"
            :color="'#ff1d5e'"
          />
          <td style="text-align: center;">{{moment(user.createdAt).format('DD.MM.YY')}}</td>
          <td style="text-align: center;">
            <router-link
              :to="{path: '/administration/updateuser/' + user.id }"
              type="button"
            >Редактировать</router-link>
          </td>
        </tr>
        <!-- <tr>
          <td>Компания 1</td>
          <td>
            <a href="chat.html">
              <img class="small_icon" :src="require('@/assets/images/color_chat_icon.svg')">
            </a>
          </td>
          <td style="text-align: center;">02.03.2019</td>
          <td style="text-align: center;">
            <button type="button">Редактировать</button>
          </td>
        </tr>-->
      </table>
      <div class="pagination" v-if="USERSLIST.data.pages > 1">
        <paginate
          :pageCount="USERSLIST.data.pages"
          :click-handler="paginateUsers"
          :initial-page="USERSLIST.data.this_page"
          :page-range="3"
          :next-class="'next'"
          :prev-class="'prev'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        ></paginate>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'usersList',

  data() {
    return {
      allUsers: '',
      pageNum: 1,
      order: 'DESC',
    };
  },
  created() {
    this.$store.dispatch('GET_USERSLIST').then(() => {
      this.$emit('childinit', {
        count: this.USERSLIST.data.count,
        type: 'Пользователи',
      });
    });
  },
  computed: {
    ...mapGetters(['USERSLIST']),
  },
  methods: {
    paginateUsers(pageNum) {
      this.$store.commit('SET_USERSPAGE', pageNum);
      this.$store.dispatch('GET_USERSLIST');
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
<style scoped>
</style>
