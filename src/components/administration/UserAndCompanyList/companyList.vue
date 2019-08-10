<template>
  <div class="content_tabs_table users_table">
    <table class="content_tabs_table_row">
      <tr>
        <th>Наименование</th>
        <th style="text-align: center;">Чат</th>
        <th style="text-align: center;">Дата создания</th>
        <th style="text-align: center;">Действие</th>
      </tr>
      <tr v-for="(company) in COMPANYSLIST.data.shops" :key="COMPANYSLIST.id">
        <td>{{company.title}}</td>
        <td>
          <a href="chat.html">
            <img class="small_icon" :src="require('@/assets/images/color_chat_icon.svg')">
          </a>
        </td>
        <hollow-dots-spinner
          v-if="!COMPANYSLIST"
          :animation-duration="1000"
          :dot-size="20"
          :dots-num="3"
          :color="'#ff1d5e'"
        />
        <td style="text-align: center;">{{moment(COMPANYSLIST.createdAt).format('DD.MM.YY')}}</td>
        <td style="text-align: center;">
          <router-link
            :to="{path: '/administration/updatecompany/'+ COMPANYSLIST.id}"
            type="button"
          >Редактировать</router-link>
        </td>
      </tr>
    </table>
    <div class="pagination" v-if="COMPANYSLIST.pages > 1">
      <paginate
        :pageCount="COMPANYSLIST.pages"
        :click-handler="paginateCompanys"
        :initial-page="COMPANYSLIST.this_page"
        :page-range="3"
        :next-class="'next'"
        :prev-class="'prev'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      ></paginate>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'companiesList',
  watch: {},
  data() {
    return {
      allCompanies: '',
      pageNum: 1,
    };
  },
  mounted() {
    this.$store.dispatch('GET_COMPANYSLIST').then(() => {
      this.$emit('childinit', {
        count: this.COMPANYSLIST.data.count,
        type: 'Компаний',
      });
    });
  },
  computed: {
    ...mapGetters(['COMPANYSLIST']),
  },
  methods: {
    paginateCompanys(pageNum) {
      this.$store.commit('SET_COMPANYPAGE', pageNum);
      this.$store.dispatch('SET_COMPANYSLIST');
    },
  },
};
</script>
<style scoped>
</style>

