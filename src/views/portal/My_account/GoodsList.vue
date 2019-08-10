<template>
  <div class="content_tabs_table">
    <router-link :to="{ name: 'createGood' }" href="account_offer.php"
    ><button class="add_cat_button">Добавить</button></router-link
    >
    <div class="goods_label_check_wrapper">
      <label class="goods_label_check goods_label_check1" for="goods_label_radio-1">
        <p>Актуальные</p>
      </label>
      <label class="goods_label_check goods_label_check2" for="goods_label_radio-2">
        <p>В архиве</p>
      </label>
    </div>
    <input type="radio" name="goods_label_radio" id="goods_label_radio-1" checked>
    <label class="goods_label" for="goods_label_radio-1">
      <table v-if="goodList" class="content_tabs_table_row">
        <tr  v-for="(good, index) in goodList.goods">
          <td>
            <img @click="deleteGood(good, index, 'noArchive')" class="small_icon" :src="require('@/assets/images/trash.svg')" />
          </td>
          <td><img v-if="good.good_image != 0 " style="width: 100px" :src="good.good_image[0].sharp_path"></td>
          <td @click="getThisGood(good)"  style="text-align: left;">{{good.title}}</td>
          <td  style="text-align: right; padding-right: 15px;">
            <router-link :to="{path: `/update_advertisement/${good.uniqurl}`}"  type="button">Редактировать</router-link>
          </td>
        </tr>
      </table>
    </label>
    <input type="radio" name="goods_label_radio" id="goods_label_radio-2">
    <label class="goods_label" for="goods_label_radio-2">
      <table v-if="goodListArchive" class="content_tabs_table_row">
        <tr  v-for="(good, index) in goodListArchive.goods">
          <td>
            <img @click="deleteGood(good, index, 'archive')" class="small_icon" :src="require('@/assets/images/trash.svg')" />
          </td>
          <td><img v-if="good.good_image != 0 " style="width: 100px" :src="good.good_image[0].sharp_path"></td>
          <td @click="getThisGood(good)"  style="text-align: left;">{{good.title}}</td>
          <td  style="text-align: right; padding-right: 15px;">
            <router-link :to="{path: `/update_advertisement/${good.uniqurl}`}"  type="button">Редактировать</router-link>
            <button @click="removeArchive(good, index)">Убрать из архива</button>
          </td>

        </tr>
      </table>
    </label>
  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  data() {
    return {
      goodList: '',
      goodListArchive: '',
      page: 1,
    };
  },
  created() {
    this.getAllGoods();
    this.getAllArciveGoods();
  },
  methods: {
    removeArchive(good, index) {
      this.$axios.get(`/user/goodRemoveArchive/${good.id}`).then((res) => {
        this.showAlert({
          title: res.data.mes,
          type: 'success',
        });
        this.goodListArchive.goods.splice(index, 1);
        this.goodList.goods.push(good);
      });
    },
    getAllArciveGoods() {
      if (!this.$auth.getUser().shop) {
        this.$axios.get(`/user/getGetMyGoodsArchive/${this.page}/${5}`).then((response) => {
          this.goodListArchive = response.data;
        }).catch((error) => {
          console.log(error);
          alert(error);
        });
      } else {
        this.$axios.get(`/shop/shopGetGoodsArchive/${this.page}/${5}/${this.$auth.getUser().shop_id}`).then((response) => {
          this.goodListArchive = response.data;
        }).catch((error) => {
          console.log(error);
          alert(error);
        });
      }
    },
    getAllGoods() {
      if (!this.$auth.getUser().shop) {
        this.$axios.get(`/user/getGetMyGoods/${this.page}/${5}`).then((response) => {
          this.goodList = response.data;
        }).catch((error) => {
          console.log(error);
          alert(error);
        });
      } else {
        this.$axios.get(`/shop/shopGetGoods/${this.page}/${5}/${this.$auth.getUser().shop_id}`).then((response) => {
          this.goodList = response.data;
        }).catch((error) => {
          console.log(error);
          alert(error);
        });
      }
    },
    deleteGood(good, index, type) {
      this.$axios.get(`/deleteGood/${good.id}`).then((response) => {
        if (type === 'noArchive') {
          this.goodList.goods.splice(index, 1);
        } else {
          this.goodListArchive.goods.splice(index, 1);
        }
        this.showAlert({
          title: response.data.mes,
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    getThisGood(good) {
      this.$router.push({ path: `/good/${good.uniqurl}` });
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

  .goods_label{
    display: none;
    position: relative;
    border-top: 1px solid #dee2e6;
  }

  #goods_label_radio-1{
    display: none;
  }

  #goods_label_radio-2{
    display: none;
  }

  #goods_label_radio-1:checked + .goods_label{
    display: block;
  }

  #goods_label_radio-2:checked + .goods_label{
    display: block;
  }

  .goods_label_check{
    position: relative;
    top: 1px;
    color: #495057;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-bottom-color: #FFF;
    margin: 0;
    cursor: pointer;
    border-radius: 5px;
    z-index: 2;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .goods_label_check:hover{
    border-color: #FFF;
    color: #999;
  }

  input[type="radio"]:checked .goods_label_check1{
    color: blue;
    border: 1px solid #dee2e6;
    border-bottom-color: #FFF;
  }

  #goods_label_radio-2:checked + .goods_label_check2{
    color: blue;
    border: 1px solid #dee2e6;
    border-bottom-color: #FFF;
  }

  .goods_label_check p{
    margin: 0;
  }

  .goods_label_check_wrapper{

  }

  .goods_label_check_wrapper label{
    padding: 10px;
  }
</style>
