<template>
  <div class="content_container col-lg-8">
    <div class="content_label">
      <h4>Управление объявлениями</h4>
    </div>
    <div class="content_tabs">
      <div class="content_container col-lg-8">
      </div>
      <div class="content_tabs category_edit_container">
        <p>В данном окне отоброжается количество дней прибывания на сайте объявлений.</p>
        <p>По истичению данного срока с даты создания объявления, оно поподает в архив</p>
        <ul>
          <li>
            <p>Укажите срок в днях</p>
            <input placeholder="Например: USD" v-model="goodsMaxLifeTime.params" type="text">
          </li>
          <li>
            <button @click="setGoodsMaxLifeTime()">Применить</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Good_settings',
  created() {
    this.getGoodsMaxLifeTime();
  },
  data() {
		  return {
      goodsMaxLifeTime: '',
    };
  },
  methods: {
    getGoodsMaxLifeTime() {
      this.$axios.get('/admin/getMaxDaysGoodLife').then((res) => {
        this.goodsMaxLifeTime = res.data;
      });
    },
    setGoodsMaxLifeTime() {
      this.$axios.post('/admin/setMaxDaysGoodLife', { params: this.goodsMaxLifeTime.params }).then((res) => {
        this.showAlert({
          title: res.data.mes,
          type: 'success',
        });
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

<style scoped>

</style>
'/api/getMaxDaysGoodLife

