<template>
  <div class="content_container col-lg-8">
    <div class="content_label">
      <h4>Видео на главной</h4>
    </div>
    <div class="content_tabs">
      <div class="content_container col-lg-8">
      </div>
      <div class="content_tabs category_edit_container">
        <ul>
          <li>
            <h5>Поле для вставки скопированной ссылки</h5>
            <h4 v-if="!showInput"><span class="spanclr">Видео уже загруженно на портал</span><button @click="deleteVideo()">Удалить текущее видео</button></h4>
            <textarea v-if="showInput"
              style="    float: left;"
              v-validate="'required'"
              v-model="videoUrls"
              type="text"
              name="Место для ссылки"
              placeholder="Место для ссылки"
            />
          </li>
          <p>Для того чтобы вставить видео с <span  class="spanclr">YouTube</span>  на главную страницу необходимо сделать несколько шагов:<br>
           <span class="spanclr">1.</span> Откройте YouTube на компьютере и перейдите на страницу нужного видео.<br>
           <span class="spanclr">2.</span> Нажмите кнопку Поделиться Отправить под проигрывателем.<br>
           <span class="spanclr">3.</span> Выберите Встроить.<br>
           <span class="spanclr">4.</span> Скопируйте код и вставьте его в назначиную область.<br>
            </p>
          <a style="color: #007bff" href="https://support.google.com/youtube/answer/171780?hl=ru"><p>Подробная информация...</p></a>

        </ul>
        <button @click="addVideo()">Сохранить</button>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'Video_content',
  data() {
    return {
      videoUrls: '',
      showInput: true,
      video_id: '',
    };
  },
  created() {
    this.chekedVideo();
  },
  methods: {
    addVideo() {
      if (!this.videoUrls){
        this.showAlert({
          title: 'Сначало необходимо добавить видео',
          type: 'error',
        });
      }else {
        const sendVideo = {
          video_code: this.videoUrls,
        };
        this.$axios.post('/admin/addVideo', sendVideo).then((response) => {
          this.showInput = false;
          this.video_id = response.data.video.id
          this.showAlert({
            title: response.data.mes,
            type: 'success',
          });
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    chekedVideo() {
      this.$axios.get('/admin/checkVideo').then((response) => {
        this.video_id = response.data.video_id;
        if (response.data.mes) {
          this.showInput = false;
        } else {
          this.showInput = true;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    deleteVideo() {
      this.$axios.get(`/admin/delVideo/${this.video_id}`).then((response) => {
        this.videoUrls = '';
        this.showInput = true;
        this.showAlert({
          title: response.data.mes,
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
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
 .spanclr{
   color: #ed0d6b;
 }
</style>
