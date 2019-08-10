<template>
  <div>
    <div class="content_container col-lg-8">
      <div class="content_label">
        <h4>Дизайн</h4>
        <button data-toggle="modal" data-target="#myModal" class="add_cat_button">Добавить</button>
      </div>
      <div class="content_tabs">
        <div class="content_tabs_table users_table design_table">
          <table class="content_tabs_table_row">
            <tr>
              <!-- <th style="text-align: left;">Название баннера</th> -->
              <th style="text-align: center;">Изображение</th>
              <th style="text-align: center;">Действие</th>
            </tr>
            <hollow-dots-spinner
              v-if="!allImages || loader === true"
              :animation-duration="1000"
              :dot-size="20"
              :dots-num="3"
              :color="'#ff1d5e'"
            />
            <tr v-for="(image, index) in allImages" :key="image.id">
              <!-- <td>{{image.name}}</td> -->
              <td>
                <LightBox v-if="image.path && image.path !=null" album="mm" :src="image.path">
                  <img :src="image.path" alt class="maessage_upload_img">
                </LightBox>
              </td>
              <td style="text-align: center;">
                <button
                  style="    width: auto;"
                  v-if="image.view === false || image.view === null"
                  @click="updateView('true', image.id, index)"
                  class="design_button_add"
                >Активировать</button>
                <button
                  style="    width: auto;"
                  v-if="image.view === true"
                  @click="updateView('false', image.id, index)"
                  class="design_button_add"
                >Деактивировать</button>
              </td>
              <td style="text-align: center;">
                <button @click="deleteImage(image.id, index)" class="design_button_delete">
                  <span aria-hidden="true">&times;</span>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- The Modal -->
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4
              class="modal-title"
            >Добавьте изображение или просто перетащите его в назначеную область</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <FilePond
              ref="pond"
              label-idle="Перетащите изображение сюда ..."
              accepted-file-types="image/jpeg, image/png"
            />
          </div>
          <!-- Modal footer -->
          <!-- <div class="modal-footer">-->
          <button type="button" @click="addImage" class="btn btn-danger" data-dismiss="modal">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminDesign",
  data() {
    return {
      file: "",
      allImages: "",
      loader: ""
    };
  },
  mounted() {
    this.getAllImages();
  },
  methods: {
    getAllImages() {
      this.$axios.get("/admin/getMainPageImges").then(images => {
        this.allImages = images.data;
      });
    },
    addImage() {
      this.loader = true;
      let data = new FormData();
      data.append("uploadfile", this.$refs.pond.getFile().file);
      this.$axios
        .post("/admin/addMainPageImg/" + "header", data)
        .then(response => {
          this.loader = false;
          this.allImages.push(response.data);
          console.log(response);
        });
      // console.log(this.$refs.pond.getFile().filename);
    },
    updateView(status, id, index) {
      let data = {
        view: status
      };
      this.$axios.post("/admin/updateView/" + id, data).then(response => {
        this.allImages.splice(index, 1);
        this.allImages.push(response.data);
        if (status === true) {
          this.showAlert({
            mes: "Изображение активированно",
            title: "Теперь оно будет отоброжатся на главной странице",
            type: "success"
          });
        } else {
          this.showAlert({
            mes: "Изображение деактивированно",
            title: "Теперь оно не будет отоброжатся на главной странице",
            type: "success"
          });
        }
      });
    },
    deleteImage(id, index) {
      this.$swal({
        title: "Вы уверены?",
        text: "Это удалит изображение безвозвратно",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Да удалить!",
        cancelButtonText: "Отмена"
      }).then(result => {
        if (result.value) {
          this.$axios
            .delete("/admin/deleteMainPageImg/" + id)
            .then(response => {
              if (response.data.status != "ok") {
                this.showAlert({
                  mes: response.data.mes,
                  title: "Oй...",
                  type: "error"
                });
              } else {
                this.allImages.splice(index, 1);
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
      this.$swal({
        type: mes.type,
        title: mes.title,
        text: mes.mes
      });
    }
    // deleteImage(id, index){
    //   this.$axios.delete('/admin/deleteMainPageImg/'+ id)
    //   .then(response =>{
    //     console.log(response);

    //   })
    // }
  }
};
</script>
