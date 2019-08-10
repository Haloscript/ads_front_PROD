<template>
  <div>
    <div id="menu2" class="container tab-pane">
      <br>
      <div class="content_tabs_table">
        <router-link
          :to="{path: '/administration/addCategories/' + 'subcategory'} "
          class="add_cat_button"
        >Добавить</router-link>
        <table class="content_tabs_table_row">
          <tr v-for="(subcategory, index) in allSubcategories" :key="subcategory.id">
            <td>
              <img
                @click="delSubcategoty(subcategory.id, index)"
                class="small_icon"
                :src="require('@/assets/images/trash.svg')"
              >
            </td>
            <td v-if="subcategory"
              style="text-align: left;"
            >{{subcategory.name}} > {{subcategory.categories[0].name}} > {{subcategory.categories[0].groups[0].name}}</td>
            <td style="text-align: right; padding-right: 15px;">
              <router-link
                :to="{path:'/administration/updateCategories/' + 'subcategory' + '/' + subcategory.id}"
                type="button"
              >Редактировать</router-link>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'subcategory',
  data() {
    return {
      allSubcategories: '',
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.getAllSubcategories();
  },
  methods: {
    getAllSubcategories() {
      this.$axios('/admin/getAllSubcategories')
        .then((subcategories) => {
          this.allSubcategories = subcategories.data.subcategories;
          this.$emit('childinit', {
            count: subcategories.data.count,
            type: 'Субкатегорий',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delSubcategoty(id, index) {
      this.$swal({
        title: 'Вы уверены?',
        text: 'Это удалит категорию безвозвратно',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Да удалить!',
        cancelButtonText: 'Отмена',
      }).then((result) => {
        if (result.value) {
          this.$axios.delete(`/admin/delSubcategories/${id}`).then((response) => {
            if (response.data.code === 1) {
              this.showAlert({
                mes: response.data.mes,
                title: 'Oй...',
                type: 'error',
              });
            } else {
              this.allSubcategories.splice(index, 1);
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
