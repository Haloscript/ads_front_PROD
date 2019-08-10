<template>
  <div>
    <div id="menu1" class="container tab-pane">
      <br>
      <div class="content_tabs_table">
        <router-link
          :to="{path: '/administration/addCategories/'+ 'category'} "
          class="add_cat_button"
        >Добавить</router-link>
        <table class="content_tabs_table_row">
          <tr v-for="(category, index) in categories" :key="category.id" :count="category">
            <td>
              <img
                @click="delCategory(category.id, index)"
                class="small_icon"
                :src="require('@/assets/images/trash.svg')"
              >
            </td>
            <td style="text-align: left;">{{category.name}} > {{category.groups[0].name}}</td>
            <td style="text-align: right; padding-right: 15px;">
              <router-link
                :to="{path:'/administration/updateCategories/' + 'category' + '/' + category.id}"
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
  name: "category",
  data() {
    return {
      categories: ""
    };
  },
  mounted() {
    this.getAllCategories();
  },
  watch: {},
  created() {},
  methods: {
    getAllCategories() {
      this.$axios.get("/admin/getAllCategories").then(response => {
        this.categories = response.data.categories;
        this.$emit("childinit", {
          count: response.data.count,
          type: "Категорий"
        });
      });
    },
    delCategory(id, index) {
      this.$swal({
        title: "Вы уверены?",
        text: "Это удалит категорию безвозвратно",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Да удалить!",
          cancelButtonText: "Отмена"
      }).then(result => {
        if (result.value) {
          this.$axios.delete("/admin/delCategories/" + id).then(response => {
            if (response.data.code === 1) {
              this.showAlert({
                mes: response.data.mes,
                title: "Oй...",
                type: "error"
              });
            } else {
              this.groups.splice(index, 1);
              this.showAlert({
                mes: response.data.mes,
                title: "",
                type: "success"
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
        text: mes.mes
      });
    }
  }
};
</script>
<style scoped>
</style>
