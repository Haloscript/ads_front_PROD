<template>
  <div>
    <div class="content_container col-lg-8">
      <div class="content_label">
        <h4>Создание категории</h4>
      </div>
      <div class="content_tabs category_edit_container">
        <form v-on:submit.prevent="addCategories()">
          <span>{{ errors.first('Заголовок категории') }}</span>
          <ul>
            <li>
              <p>Заголовок категории</p>
              <input
                v-validate="'required'"
                v-model="name"
                type="text"
                name="Заголовок категории"
                placeholder="Заголовок категории"
              >
            </li>
            <!-- <li>
              <p>Заголовок H1</p>
              <input v-model="" type="text" name="category_title_h1" placeholder="Заголовок категории H1">
            </li>-->
            <li>
              <p>Описание</p>
              <textarea v-model="description" rows="5" cols="70"></textarea>
            </li>
            <li v-if="$route.params.type === 'category'">
              <p>Родительская категория(Группа)</p>
              <select v-model="setParentCategories">
                <option
                  v-for="parent in parentCategories"
                  :key="parent.id"
                  :value="parent"
                >{{parent.name}}</option>
              </select>
            </li>
            <li v-if="$route.params.type === 'subcategory'">
              <p>Родительская категория(Категория)</p>
              <select v-model="setParentCategories">
                <option
                  v-for="parent in parentCategories"
                  :key="parent.id"
                  :value="parent"
                >{{parent.name}}</option>
              </select>
            </li>

            <a href="index.html">
              <button>Сохранить</button>
            </a>
          </ul>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'addCategories',

  data() {
    return {
      name: '',
      description: '',
      parentCategories: '',
      setParentCategories: '',
    };
  },
  watch: {},
  created() {},
  mounted() {
    if (this.$route.params.type === 'category') {
      this.getAllGroups();
    } else if (this.$route.params.type === 'subcategory') {
      this.getAllCategories();
    }
  },
  methods: {
    getAllGroups() {
      this.$axios.get('/admin/getAllGroups').then((groups) => {
        this.parentCategories = groups.data.group;
        this.setParentCategories = groups.data.group[0];
      });
    },
    getAllCategories() {
      this.$axios.get('/admin/getAllCategories').then((categories) => {
        this.parentCategories = categories.data.categories;
        this.setParentCategories = categories.data.categories[0];
      });
    },
    addCategories() {
      this.$validator.validate().then((valid) => {
        if (!valid) {
          console.log('valid', valid);
        } else {
          const body = {};
          if (this.$route.params.type === 'group') {
            body.name = this.name;
            body.description = this.description;
            this.$axios
              .post('/admin/addGroup', body)
              .then((response) => {
                this.$router.push({ path: '/administration' });
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (this.$route.params.type === 'category') {
            body.name = this.name;
            body.description = this.description;
            body.group_id = this.setParentCategories.id;
            this.$axios
              .post('/admin/addCategories', body)
              .then((response) => {
                this.$router.push({ path: '/administration/category' });
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (this.$route.params.type === 'subcategory') {
            body.name = this.name;
            body.description = this.description;
            body.categories_id = this.setParentCategories.id;
            this.$axios
              .post('/admin/addSubcategories', body)
              .then((response) => {
                this.$router.push({ path: '/administration/subcategory' });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      });
    },
  },
};
</script>
<style scoped>
</style>

