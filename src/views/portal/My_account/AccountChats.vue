<template>
  <div>
    <div class="content_tabs_table users_table chat_table">
        <div class="chat_sidebar">
            <table class="content_tabs_table_row">
                <tr @click="getChat(chat.id, index)"
                    v-for="(chat, index) in allChats"
                    >
                    <td><div class="small_ava">
                      <avatar
                        v-if="$auth.getUser().id === chat.user_id"
                        :src="chat.chat_owner.img"
                        :size="50"
                        :username="
                        chat.chat_owner.firstname +
                          ' ' +
                          chat.chat_owner.lastname
                      "
                      ></avatar>
                      <avatar
                        v-else
                        :src="chat.chat_user.img"
                        :size="50"
                        :username="
                        chat.chat_user.firstname + ' ' + chat.chat_user.lastname
                      "
                      ></avatar>
                    </div>
                    </td>
                  <td style="font-weight: 500;">
                  <span v-if="$auth.getUser().id === chat.user_id"
                  >{{ chat.chat_owner.firstname }}
                    {{ chat.chat_owner.lastname }}</span
                  >
                    <span v-else
                    >{{ chat.chat_user.firstname }}
                    {{ chat.chat_user.lastname }}</span
                    >
            
                    <span class="chat_text">
                    <div
                      v-if="chat.chat_message.length != 0"
                      class="chat_arrows"
                    >
                      {{ chat.chat_message[0].text }}
                    </div>
                  </span>
                    <span v-if="chat.type === 'good'" class="chat_text">{{chat.chat_good.title}}</span>
                    <span v-if="chat.type === 'shop'" class="chat_text">{{chat.chat_shop.title}}</span>
                    <span v-if="chat.type === 'owner'" class="chat_text">{{chat}}</span>
                  </td>
                    <td style="text-align: center; padding-right: 15px; color: #999999;">12:03</td>
                </tr>
            </table>
        </div>
        <div class="chat_message_arrea">
            <div class="other_user">
                <div v-if="selectedChat && selectedChat.type === 'good' " class="small_ava"><img v-if="selectedChat.chat_good.good_image.length > 0" :src="selectedChat.chat_good.good_image[0].sharp_path"></div>
                <div v-if="selectedChat && selectedChat.type === 'shop' " class="small_ava"><img v-if="selectedChat.chat_shop.shop_image && selectedChat.chat_shop.shop_image.length > 0" :src="selectedChat.chat_shop.shop_image[0].sharp_path"></div>
                <div v-if="selectedChat && selectedChat.type === 'owner' " class="small_ava"><img :src="require('@/assets/images/small_ava2.jpg')"></div>

                <h6 v-if="selectedChat && selectedChat.type === 'good' ">{{selectedChat.chat_good.title}}</h6>
                <h6 v-if="selectedChat && selectedChat.type === 'good' ">{{nicePrice(selectedChat.chat_good.price) }} ₸</h6>
                <h6 v-if="selectedChat && selectedChat.type === 'shop' ">{{selectedChat.chat_shop.title}}</h6>
                <h6 v-if="selectedChat && selectedChat.type === 'shop' ">{{selectedChat.chat_shop.address}}</h6>
                <h6 v-if="selectedChat && selectedChat.type === 'owner' ">{{}}</h6>
                <div class="other_user_icons_container">
                    <!--<img class="small_icon_2" :src="require('@/assets/images/search.svg')">-->
                    <img class="small_icon_2" data-toggle="modal"
                         data-target="#myModal"
                         :src="require('@/assets/images/clip.svg')">
                </div>
            </div>
          <div v-chat-scroll class="chat_arrea">
            <div v-for="message in messagesInChat" :key="message.id">
              <div
                v-if="message.user_id != $auth.getUser().id"
                class="user_message message_container"
              >
                <div class="small_ava">
                  <!-- <img :src="require('@/assets/images/small_ava1.jpg')"> -->
                  <avatar
                    :src="message.message_user.img"
                    :size="50"
                    :username="
                        message.message_user.firstname +
                          ' ' +
                          message.message_user.lastname
                      "
                  ></avatar>
                </div>
                <p>
                  {{ message.text }}
                  <LightBox
                    v-if="message.img && message.img != null"
                    album="mm"
                    :src="message.original_size_img"
                  >
                    <img :src="message.img" alt class="maessage_upload_img" />
                  </LightBox>
                </p>
              </div>
              <hollow-dots-spinner
                v-if="!messagesInChat"
                :animation-duration="1000"
                :dot-size="20"
                :dots-num="3"
                :color="'#ff1d5e'"
              />
              <div
                v-if="message.user_id === $auth.getUser().id"
                class="other_user_message message_container"
              >
              <div class="other_user_subcontainer">
                <div class="small_ava">
                  <!-- <img :src="require('@/assets/images/small_ava2.jpg')"> -->
                  <avatar
                    :src="message.message_user.img"
                    :size="50"
                    :username="
                        message.message_user.firstname +
                          ' ' +
                          message.message_user.lastname
                      "
                  ></avatar>
                </div>
                <p>
                  {{ message.text }}
                  <LightBox
                    v-if="message.img && message.img != null"
                    album="mm"
                    :src="message.original_size_img"
                  >
                    <img :src="message.img" alt class="maessage_upload_img" />
                  </LightBox>
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      <div class="send_message_container">
        <input v-model="messageText" type="text" @keypress.enter="sendMessage()" name="send_message" placeholder="Введите сообщение">
        <button :disabled="messageText === ''"  class="send_button"  @click="sendMessage()" >
        <img class="send_message_img" :src="require('@/assets/images/send_message.svg')">
        </button>
      </div>
    </div>
    <!-- The Modal -->
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">
              Добавьте изображение или просто перетащите его в назначеную
              область
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <FilePond
              ref="pond"
              label-idle="Перетащите изображение сюда ..."
              accepted-file-types="image/jpeg, image/png"
              :beforeRemoveFile="deleteImageOnPopup"
              v-on:init="handleFilePondInit"
              :server="server"
              :onload="deleteImageOnPopup"
              name="uploadfile"
              :onprocessfile="deleteImageOnPopup"
              :beforeAddFile="handleFilePondInit"
            />
          </div>
          <!-- Modal footer -->
          <input
            v-model="messageText"
            type="text"
            name="send_message"
            placeholder="Введите коменнтарий к изображению"
          />
          <!-- <div class="modal-footer">-->
          <!-- <button
            type="button"
            @click="sendMessage"
            class="btn btn-danger"
            data-dismiss="modal"
          >Save</button>-->
          <button
            type="button"
            @click="sendMessage"
            class="btn btn-danger"
            data-dismiss="modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'AccountChats',
  data() {
    return {
      allChats: [],
      messagesInChat: [],
      messagesInChat: {},
      selectedChat: '',
      messageText: '',
      messageInput: '',
      messageImg: '',
      loadedImage: '',
      viewDel: false,
      server: {
        url: ""
      }
    };
  },
  sockets: {
    connect() {
      this.isConnected = true;
      // console.log("socket connected");
    },
    customEmit(data) {
      this.isConnected = false;
    },
    messageChannel(data) {
      this.socketMessage = data;
      this.messagesInChat.push(data.message.message);
    },
  },
  created() {
    this.getAllMyChatsFun();
  },
  methods: {
    handleFilePondInit: function() {
      let servers =
        // "http://localhost:3000/api/" +
        "http://185.22.64.121:3000/api/" +
        "uploadResizeFile/chat/" +
        this.selectedChat.id +
        "/xs";
      this.server = servers;
    },
    deleteImageOnPopup() {
      // console.log(JSON.parse(this.$refs.pond.getFile().serverId));
      this.loadedImage = JSON.parse(this.$refs.pond.getFile().serverId);
      let servers =
        // "http://localhost:3000/api/" + "deleteImg/" + this.loadedImage.id;
        "http://185.22.64.121:3000/api/" + "deleteImg/" + this.loadedImage.id;
      this.server = servers;
      // this.$axios.delete("/deleteImg/" + this.loadedImage.id).then(response => {
      //   console.log(response);
      // });
    },
    addImage() {
      this.loader = true;
      let data = new FormData();
      data.append("uploadfile", this.$refs.pond.getFile().file);
      this.$axios
        .post("/uploadResizeFile/chat/" + this.selectedChat.id + "/xs", data)
        .then(resize => {
          this.loadedImage = resize.data;
          // console.log(resize);
        });
    },
    getChat(id, index) {
      this.$axios
        .get(`/getOneChat/${id}`)
        .then((chat) => {
          // console.log(chat);
          this.selectedChat = chat.data;
          this.messagesInChat = chat.data.chat_message;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllMyChatsFun() {
      this.$axios
        .get('/getAllMyChats')
        .then((response) => {
          this.allChats = response.data;
          // console.log(response);
          // console.log("test1");

          if (this.$route.params.data) {
            // console.log("test2");
            const id = this.$route.params.data.chat.id;
            for (let i = 0; i < this.allChats.length; i++) {
              if (this.$route.params.data.chat.id === this.allChats[i].id) {
                this.getChat(id, i);
              }
            }
          } else if (this.allChats.length > 0) {
            // console.log("test3");
            for (let i = 0; i < this.allChats.length; i++) {
              this.getChat(this.allChats[i].id, i);
              break;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendMessage() {
      console.log(this.selectedChat.id, this.messageText );
      const body = {
        chat_id: this.selectedChat.id,
        text: this.messageText,
      };
      if (this.loadedImage) {
        body.img = this.loadedImage.sharp_path;
        body.original_size_img = this.loadedImage.original_size_path;
      }
      this.$axios.post('/sendMessage', body).then((response) => {
        // console.log(response);
        // this.$refs.pond.removeFile();
        this.loadedImage = '';
        this.$socket.emit('sendMessage', response.data);
        this.messageText = '';
      });
    },
    nicePrice(price) {
      const nice = String(price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
      return nice;
    },
  },
};
</script>

<style scoped>
  .send_button{
    display: block;
    float: right;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #1fc9fd;
    background: linear-gradient(45deg, #1fc9fd 1%,#fb0061 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1fc9fd', endColorstr='#fb0061',GradientType=1 );
    margin-top: 20px;
    margin-left: 20px;
    padding: 0;
    background: none;
    border: none;
  }

.other_user_message {
    float: none;
    margin-right: 15px;
    margin-top: 15px;
    width: 100%;
    display: table;
}

.other_user_subcontainer{
  float: right;
}

.user_message{
    float: none;
    width: 100%; 
    display: table;
}

.send_message_img{
  width: 55px;
}

.message_container p{
  word-wrap: break-word;
}

</style>
