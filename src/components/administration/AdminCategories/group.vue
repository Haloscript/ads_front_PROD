<template>
  <!-- <div> -->
  <div id="home" class="container tab-pane">
    <br>
    <div class="content_tabs_table">
      <a href="edit_category.html">
        <router-link
          :to="{path: '/administration/addCategories/'+ 'group'} "
          class="add_cat_button"
        >Добавить</router-link>
      </a>
      <table class="content_tabs_table_row">
        <tr v-for="(group, index) in groups" :key="group.id">
          <td>
            <img
              @click="delGroup(group.id, index)"
              class="small_icon"
              :src="require('@/assets/images/trash.svg')"
            >
          </td>
          <td style="text-align: left;">{{group.name}}</td>
          <td style="text-align: right; padding-right: 15px;">
            <router-link
              :to="{path:'/administration/updateCategories/' + 'group' + '/' + group.id}"
              type="button"
            >Редактировать</router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
  </div>

  <!-- </div> -->
</template>
<script>
export default {
  name: 'group',

  data() {
    return {
      groups: '',
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.getAllGroups();
  },
  methods: {
    getAllGroups() {
      this.$axios
        .get('/admin/getAllGroups')
        .then((response) => {
          // console.log(response);
          this.groups = response.data.group;
          this.$emit('childinit', {
            count: response.data.count,
            type: 'Групп',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delGroup(id, index) {
      this.$swal({
        title: 'Вы уверены?',
        text: 'Это удалит группу безвозвратно',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Да удалить!',
        cancelButtonText: 'Отмена',
      }).then((result) => {
        if (result.value) {
          this.$axios.delete(`/admin/delGroup/${id}`).then((response) => {
            if (response.data.code === 1) {
              this.showAlert({
                mes: response.data.mes,
                title: 'Oй...',
                type: 'error',
              });
            } else {
              this.groups.splice(index, 1);
              this.showAlert({
                mes: response.data.mes,
                title: '',
                type: 'success',
              });
            }
          });
        }
      });
    },
    showAlert(mes) {
      console.log(mes);
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
