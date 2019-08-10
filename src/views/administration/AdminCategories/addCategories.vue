<template>
  <div>
    <div class="content_container col-lg-8">
      <div class="content_label">
        <h4 v-if="$route.params.type === 'group'">Создание группы</h4>
        <h4 v-if="$route.params.type === 'category'">Создание категории</h4>
        <h4 v-if="$route.params.type === 'subcategory'">Создание субкатегории</h4>
      </div>
      <div class="content_tabs category_edit_container">
          <span>{{ errors.first("Заголовок категории") }}</span>
          <ul>
            <li>
              <p v-if="$route.params.type === 'group'">Заголовок группы</p>
              <p v-if="$route.params.type === 'category'">Заголовок категории</p>
              <p v-if="$route.params.type === 'subcategory'">Заголовок субкатегории</p>
              <input
                v-validate="'required'"
                v-model="name"
                type="text"
                name="Заголовок категории"
                placeholder="Заголовок категории"
              />

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
                  >{{ parent.name }}</option
                >
              </select>
            </li>
            <li v-if="$route.params.type === 'subcategory'">
              <p>Родительская категория(Категория)</p>
              <select v-model="setParentCategories">
                <option
                  v-for="parent in parentCategories"
                  :key="parent.id"
                  :value="parent"
                  >{{ parent.name }}</option
                >
              </select>
            </li>
              <button @click="addCategories()">Сохранить</button>
          </ul>
        <h4>Добавить изображение</h4>
        <FilePond
          ref="pond"
          label-idle="Перетащите изображение сюда ..."
          accepted-file-types="image/jpeg, image/png"
          v-on:init="handleFilePondInit"
          :server="server"
          name="uploadfile"
          :beforeAddFile="handleFilePondInit"
          :onprocessfile="deleteImageOnPopup"
        />
        <h4>Добавить миниатюру</h4>
        <FilePond
          ref="pond_1"
          label-idle="Перетащите изображение сюда ..."
          accepted-file-types="image/jpeg, image/png"
          v-on:init="handleFilePondInit_1"
          :server="server_1"
          name="uploadfile"
          :beforeAddFile="handleFilePondInit_1"
          :onprocessfile="deleteImageOnPopup_1"
        />
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
      loadedImage: '',
      loadedMiniature: '',
      category_img: '',
      server: {
        url: '',
      },
      server_1: {
        url: '',
      },

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
    deleteImage(type, id) {
      this.$axios.delete(`http://185.22.64.121:3000/api/deleteImg/${id}`).then((response) => {
        if (type === 'mini') {
          this.loadedMiniature = 0;
        } else {
          this.loadedImage = 0;
        }
        this.showAlert({
          title: response.data.mes,
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    readyImg() {
      this.category_img = this.loadedImage.sharp_path;
    },
    handleFilePondInit() {
      const servers =
        // "http://localhost:3000/api/" +
        `${'http://185.22.64.121:3000/api/' + 'uploadResizeFile/category/'}${0}/xs`;
      this.server = servers;
    },
    handleFilePondInit_1() {
      const servers =
        // "http://localhost:3000/api/" +
        `${'http://185.22.64.121:3000/api/' + 'uploadResizeFile/category/'}${0}/xs`;
      this.server_1 = servers;
    },
    deleteImageOnPopup() {
      this.loadedImage = JSON.parse(this.$refs.pond.getFile().serverId);
      const servers =
        // "http://localhost:3000/api/" + "deleteImg/" + this.loadedImage.id;
        `${'http://185.22.64.121:3000/api/' + 'deleteImg/'}${
          this.loadedImage.id
        }`;
      this.server = servers;
      // this.$axios.delete("/deleteImg/" + this.loadedImage.id).then(response => {
      //   console.log(response);
      // });
    },
    deleteImageOnPopup_1() {
      this.loadedMiniature = JSON.parse(this.$refs.pond_1.getFile().serverId);
      const servers =
        // "http://localhost:3000/api/" + "deleteImg/" + this.loadedImage.id;
        `${'http://185.22.64.121:3000/api/' + 'deleteImg/'}${
          this.loadedMiniature.id
        }`;
      this.server_1 = servers;
      // this.$axios.delete("/deleteImg/" + this.loadedImage.id).then(response => {
      //   console.log(response);
      // });
    },
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
            body.img = this.loadedImage.original_size_path;
            body.miniature_img = this.loadedMiniature.sharp_path;
            body.img_id = this.loadedImage.id;
            body.miniature_img_id = this.loadedMiniature.id;

            this.$axios
              .post('/admin/addGroup', body)
              .then(() => {
                this.$router.push({ path: '/administration' });
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (this.$route.params.type === 'category') {
            body.name = this.name;
            body.description = this.description;
            body.group_id = this.setParentCategories.id;
            body.img = this.loadedImage.original_size_path;
            body.miniature_img = this.loadedMiniature.sharp_path;
            body.img_id = this.loadedImage.id;
            body.miniature_img_id = this.loadedMiniature.id;
            this.$axios
              .post('/admin/addCategories', body)
              .then(() => {
                this.$router.push({ path: '/administration/category' });
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (this.$route.params.type === 'subcategory') {
            body.name = this.name;
            body.description = this.description;
            body.categories_id = this.setParentCategories.id;
            body.img = this.loadedImage.original_size_path;
            body.miniature_img = this.loadedMiniature.sharp_path;
            body.img_id = this.loadedImage.id;
            body.miniature_img_id = this.loadedMiniature.id;
            this.$axios
              .post('/admin/addSubcategories', body)
              .then(() => {
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
<style scoped></style>
