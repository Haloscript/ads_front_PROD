<template>
  <div>
    <div class="content_container col-lg-8">
      <div class="content_label">
        <h4 v-if="$route.params.type === 'group'">Редактировать группу</h4>
        <h4 v-if="$route.params.type === 'category'">
          Редактировать категорию
        </h4>
        <h4 v-if="$route.params.type === 'subcategory'">
          Редактировать субкатегорию
        </h4>
      </div>
      <div class="content_tabs category_edit_container">
        <span>{{ errors.first("Заголовок категории") }}</span>
        <ul>
          <li>
            <p>Заголовок категории</p>
            <input
              v-model="name"
              type="text"
              name="Заголовок категории"
              v-validate="'required'"
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
                >{{ parent.name }} > {{ parent.groups[0].name }}</option
              >
            </select>
          </li>
            <button @click="updateCategories()">Сохранить</button>
        </ul>
        <div>
          <h4>Добавить изображение</h4>
          <LightBox
            v-if="thisCategory && thisCategory.img"
            album="mm"
            :src="loadedImage.original_size_path"
          >
            <img
              :src="loadedImage.original_size_path"
              alt
              style="width: 200px; height: 200px; float: left;"
              class="maessage_upload_img"
            />
          </LightBox>
          <span
            v-if="thisCategory && thisCategory.img"
            @click="deleteImage('loadedImage')"
            style="cursor: pointer"
          >Удалить</span
          >
          <FilePond
            v-if="!thisCategory.img"
            ref="pond"
            label-idle="Перетащите изображение сюда ..."
            accepted-file-types="image/jpeg, image/png"
            v-on:init="handleFilePondInit"
            :server="server"
            name="uploadfile"
            :beforeAddFile="handleFilePondInit"
            :onprocessfile="deleteImageOnPopup"
          />
        </div>
        <div>
          <h4>Добавить миниатюру</h4>
          <LightBox
            v-if="thisCategory && thisCategory.miniature_img"
            album="mm"
            :src="loadedMiniature.original_size_path"
          >
            <img
              :src="loadedMiniature.original_size_path"
              alt
              style="width: 200px; height: 200px; float: left;"
              class="maessage_upload_img"
            />
          </LightBox>
          <span
            v-if="thisCategory && thisCategory.miniature_img"
            @click="deleteImage('loadedMiniature')"
            style="cursor: pointer"
          >Удалить</span
          >
          <FilePond
            v-if="!thisCategory.miniature_img"
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
  </div>
</template>
<script>
export default {
  name: 'updateCategories',

  data() {
    return {
      name: '',
      description: '',
      parentCategories: '',
      setParentCategories: '',
      thisCategory: '',
      imagesAdd: {
        img: false,
        mini: false,
      },
      loadedImage: {
        original_size_path: '',
      },
      loadedMiniature: {
        original_size_path: '',
      },
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
    this.getThisCategories();
    if (this.$route.params.type === 'category') {
      this.getAllGroups();
    } else if (this.$route.params.type === 'subcategory') {
      this.getAllCategories();
    }
  },
  methods: {
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
      this.imagesAdd.img = true;
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
      this.imagesAdd.mini = true;

      // this.$axios.delete("/deleteImg/" + this.loadedImage.id).then(response => {
      //   console.log(response);
      // });
    },
    deleteImage(type) {
      let typeCategory = '';
      if (this.$route.params.type === 'group') {
        typeCategory = 'group';
      } else if (this.$route.params.type === 'category') {
        typeCategory = 'category';
      } else {
        typeCategory = 'subcategory';
      }
      if (type === 'loadedImage') {
        this.$axios
          .delete(
            `admin/deleteImageOnCategories/${
              this.thisCategory.img_id}/${typeCategory}/${this.thisCategory.id}/img`,
          )
          .then((response) => {
            this.thisCategory.img = '';
            this.thisCategory.img_id = '';
            this.loadedImage.original_size_path = '';

            this.showAlert({
              title: response.data.mes,
              type: 'success',
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$axios
          .delete(
            `admin/deleteImageOnCategories/${
              this.thisCategory.miniature_img_id}/${typeCategory}/${this.thisCategory.id}/miniature_img`,
          )
          .then((response) => {
            this.thisCategory.miniature_img = '';
            this.thisCategory.miniature_img_id = '';
            this.loadedMiniature.original_size_path = '';
            this.showAlert({
              title: response.data.mes,
              type: 'success',
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
    getThisCategories() {
      if (this.$route.params.type === 'group') {
        this.$axios
          .get(`/admin/getOneGroup/${this.$route.params.id}`)
          .then((group) => {
            this.thisCategory = group.data;
            this.name = group.data.name;
            this.description = group.data.description;
            this.loadedImage.original_size_path = group.data.img;
            this.loadedMiniature.original_size_path = group.data.miniature_img;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.$route.params.type === 'category') {
        this.$axios
          .get(`/admin/getOneCategories/${this.$route.params.id}`)
          .then((category) => {
            this.thisCategory = category.data;
            // console.log(category);
            this.name = category.data.name;
            this.description = category.data.description;
            this.setParentCategories = category.data.groups[0];
            this.loadedImage.original_size_path = category.data.img;
            this.loadedMiniature.original_size_path =
              category.data.miniature_img;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.$route.params.type === 'subcategory') {
        this.$axios
          .get(`/admin/getOneSubcategories/${this.$route.params.id}`)
          .then((subcategories) => {
            this.thisCategory = subcategories.data;
            this.name = subcategories.data.name;
            this.description = subcategories.data.description;
            this.setParentCategories = subcategories.data.categories[0];
            this.loadedImage.original_size_path = subcategories.data.img;
            this.loadedMiniature.original_size_path =
              subcategories.data.miniature_img;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    updateCategories() {
      this.$validator.validate().then((valid) => {
        if (!valid) {
          // console.log('valid', valid);
        } else {
          const body = {};
          if (this.$route.params.type === 'group') {
            body.name = this.name;
            body.description = this.description;
            if (this.imagesAdd.img) {
              body.img = this.loadedImage.original_size_path;
              body.img_id = this.loadedImage.id;
            }
            if (this.imagesAdd.mini) {
              body.miniature_img = this.loadedMiniature.sharp_path;
              body.miniature_img_id = this.loadedMiniature.id;
            }
            this.$axios
              .put(`/admin/updateGroup/${this.$route.params.id}`, body)
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
            if (this.imagesAdd.img) {
              body.img = this.loadedImage.original_size_path;
              body.img_id = this.loadedImage.id;
            }
            if (this.imagesAdd.mini) {
              body.miniature_img = this.loadedMiniature.sharp_path;
              body.miniature_img_id = this.loadedMiniature.id;
            }
            this.$axios
              .put(`/admin/updateCategories/${this.$route.params.id}`, body)
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
            if (this.imagesAdd.img) {
              body.img = this.loadedImage.original_size_path;
              body.img_id = this.loadedImage.id;
            }
            if (this.imagesAdd.mini) {
              body.miniature_img = this.loadedMiniature.sharp_path;
              body.miniature_img_id = this.loadedMiniature.id;
            }
            this.$axios
              .put(`/admin/updateSubcategories/${this.$route.params.id}`, body)
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
