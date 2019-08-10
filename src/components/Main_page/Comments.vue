<template>
  <div style="overflow-y: auto; overflow-x: hidden;" class="product_page_company_feedbacks">
    <h4>Отзывы</h4>
    <ul>
      <li v-if="COMMENTS && type === 'good'" v-for="comment in COMMENTS.comments">
        <div class="product_page_company_feedbacks_title">
          <h5>{{comment.comments_good_user.lastname}}  {{comment.comments_good_user.firstname}}<span>{{ moment(comment.createdAt).format("h:mm, dddd")}}</span></h5>
          <p>
            {{comment.text}}
          </p>
        </div>
      </li>

      <li v-if="COMMENTS_SHOP && type === 'shop'" v-for="comment in COMMENTS_SHOP.comments">
        <div class="product_page_company_feedbacks_title">
          <h5>{{comment.comments_shop_user.lastname}}  {{comment.comments_shop_user.firstname}}<span>{{ moment(comment.createdAt).format("h:mm, dddd")}}</span></h5>
          <p>
            {{comment.text}}
          </p>
        </div>
      </li>


    </ul>
    <div class="pagination" v-if="type === 'good' && COMMENTS.pages > 1">
      <paginate :pageCount="COMMENTS.pages" :click-handler="paginateFunction" :initial-page="COMMENTS.this_page"
                :page-range="3" :next-class="'next'" :prev-class="'prev'" :container-class="'pagination'"
                :page-class="'page-item'">
      </paginate>
    </div>

    <div class="pagination" v-if="type === 'shop' && COMMENTS_SHOP.pages > 1">
      <paginate :pageCount="COMMENTS_SHOP.pages" :click-handler="paginateFunction" :initial-page="COMMENTS_SHOP.this_page"
                :page-range="3" :next-class="'next'" :prev-class="'prev'" :container-class="'pagination'"
                :page-class="'page-item'">
      </paginate>
    </div>

    <div class="send_comment_wrapper">
      <input v-model="inputText" type="text" name="" placeholder="Комментарий" />
      <button v-if="this.$auth.getUser()" @click="addComment">Оставить комментарий</button>
      <button v-else @click="goToLogin()">Оставить комментарий</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Comments',
  props: {
    type: String,
    item: Object,
  },
  created() {
    switch (this.type) {
      case 'good':
        this.$store.commit('SET_COMMENTSID', this.item.id);
        this.$store.dispatch('GET_COMMENTS');
        break;
      case 'shop':
        this.$store.commit('SET_COMMENTSID_SHOP', this.item.id);
        this.$store.dispatch('GET_COMMENTS_SHOP');
        break;
    }
  },
  data() {
    return {
      inputText: '',
      pageNum: 1,
      allComments: '',
    };
  },
  computed: {
    ...mapGetters(['COMMENTS', 'COMMENTS_SHOP']),
  },
  methods: {
    addComment() {
      const data = {};
      switch (this.type) {
        case 'good':
          data.good_id = this.item.id;
          break;
        case 'shop':
          data.shop_id = this.item.id;
          break;
      }
      data.type = this.type;
      data.text = this.inputText;
      this.$axios.post('/addGoodComment', data).then((response) => {
        if (response.data.status === 'Ok') {
          this.showAlert({
            mes: response.data.mes,
            title: '',
            type: 'success',
          });

          const newComment = {
            createdAt: new Date(),
            user_id: this.$auth.getUser().id,
            text: this.inputText,

          };
          console.log(newComment);
          switch (this.type) {
            case 'good':
              newComment.good_id = this.item.id;
              newComment.comments_good_user = {
                firstname: this.$auth.getUser().firstname,
                id: this.$auth.getUser().id,
                lastname: this.$auth.getUser().lastname,
              };
              this.$store.commit('ADD_COMMENTONETIME', newComment);
              break;
            case 'shop':
              newComment.shop_id = this.item.id;
              newComment.comments_shop_user = {
                firstname: this.$auth.getUser().firstname,
                id: this.$auth.getUser().id,
                lastname: this.$auth.getUser().lastname,
              };
              this.$store.commit('ADD_COMMENTONETIME_SHOP', newComment);
              break;
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    goToLogin() {
      this.$swal({
        title: '',
        text: 'Коментарии могут остовлять только зарегистрированные пользователи',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Перейти к странице входа',
        cancelButtonText: 'Отмена',
      }).then((result) => {
        if (result.value) {
          this.$router.push({ name: 'Login' });
        } else {

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
    paginateFunction(pageNum) {
      switch (this.type) {
        case 'good':
          this.$store.commit('SET_COMMENTSPAGE', pageNum);
          this.$store.dispatch('GET_COMMENTS');
          break;
        case 'shop':
          this.$store.commit('SET_COMMENTSPAGE_SHOP', pageNum);
          this.$store.dispatch('GET_COMMENTS_SHOP');
          break;
      }
    },
  },
};
</script>

<style scoped></style>

