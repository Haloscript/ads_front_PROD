<template>
  <div class="content_container col-lg-8">
    <div class="content_label">
      <h4>Категории для продвижения</h4>
    </div>
    <div class="content_tabs">
      <div class="ads_categories_container">
        <div class="select_container">
          <h5>Выберите категорию</h5>
          <select  v-model="selectedSubCategory">
            <option
              v-if="allSubcategories"
              v-for="subcategory in allSubcategories"
              :key="subcategory.id"
              :value="subcategory"
              >{{ subcategory.name }}</option
            >
          </select>
        </div>
        <div class="content_tabs_table">
          <button
            @click="setPromotion(1, selectedSubCategory.id)"
            class="add_cat_button"
          >
            Добавить
          </button>
          <table class="content_tabs_table_row">
            <tr v-if="allPromoSubcategory.subcategories.length > 0" v-for="(promo, index) in allPromoSubcategory.subcategories">
              <td>
                <img @click="delCategory(0, promo.id, index)"
                  class="small_icon"
                  :src="require('@/assets/images/trash.svg')"
                />
              </td>
              <td v-if="allPromoSubcategory.subcategories.length > 0" style="text-align: left;">{{promo.name}}</td>
              <td style="text-align: right; padding-right: 15px;">
                <p class="ads_categories_prior">Приоритет</p>
                <select v-if="allPromoSubcategory.subcategories.length > 0" v-model="promo.priority" @change="setPriority(promo.priority, promo.id)" >
                  <option :value="1">1</option>
                  <option :value="2">2</option>
                  <option :value="3">3</option>
                  <option :value="4">4</option>
                  <option :value="5">5</option>
                </select>
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
  name: 'Subcategory_promotion',
  data() {
    return {
      allSubcategories: [],
      selectedSubCategory: '',
      allPromoSubcategory: [],
      pageNum: 1,
    };
  },
  created() {
    this.getAllSubcategory();
    this.getAllPromoSubcategory(this.pageNum);
  },
  methods: {
    getAllSubcategory() {
      this.$axios
        .get('/admin/getAllSubcategoriesOnPromo')
        .then((response) => {
          this.allSubcategories = response.data;
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    getAllPromoSubcategory(pageNum) {
      this.$axios
        .get(`/admin/getAllPromotionSubCategories/${pageNum}/10/`)
        .then((res) => {
          this.allPromoSubcategory = res.data;
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    setPromotion(promotion, subcategories_id) {
      this.$axios.get(`/admin/setPromotionSubCategory/${promotion}/${subcategories_id}`)
        .then((res) => {
          this.allPromoSubcategory.subcategories.push(res.data.Updated_subcategories);
          this.showAlert({
            mes: res.data.mes,
            title: '',
            type: 'success',
          });
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    setPriority(priority, subcategories_id) {
      this.$axios
        .post(`/admin/setPrioritySubCategory/${priority}/${subcategories_id}`)
        .then((res) => {
          this.showAlert({
            mes: res.data.mes,
            title: '',
            type: 'success',
          });
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    delCategory(promotion, subcategories_id, index) {
      this.$swal({
        title: 'Вы уверены?',
        text: 'Это удалит категорию c главной страницы',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Да удалить!',
        cancelButtonText: 'Отмена',
      }).then((result) => {
        if (result.value) {
          this.$axios.get(`/admin/setPromotionSubCategory/${promotion}/${subcategories_id}`).then((response) => {
            if (response.data.code === 1) {
              this.showAlert({
                mes: response.data.mes,
                title: 'Oй...',
                type: 'error',
              });
            } else {
              this.allPromoSubcategory.subcategories.splice(index, 1);
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
