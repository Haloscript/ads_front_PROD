<template>
  <div>
    <div class="content_container col-lg-8">
      <div class="content_label">
        <h4>Чат</h4>
      </div>
      <div class="content_tabs">
        <div class="content_tabs_table users_table chat_table">
          <div class="chat_sidebar">
            <div class="chat_user_options">
              <div>
                <avatar
                  :src="$auth.getUser().img"
                  :size="50"
                  :username="
                    $auth.getUser().firstname + ' ' + $auth.getUser().lastname
                  "
                ></avatar>
                <!-- <img :src="require('@/assets/images/small_ava1.jpg')"> -->
              </div>
              <!-- <img class="chat_options_img" :src="require('@/assets/images/chat_options.png')"> -->
            </div>

            <table class="content_tabs_table_row">
              <hollow-dots-spinner
                v-if="!allChats"
                :animation-duration="1000"
                :dot-size="20"
                :dots-num="3"
                :color="'#ff1d5e'"
              />
              <tr
                @click="getChat(chat.id, index)"
                v-for="(chat, index) in allChats"
                :key="chat.id"
              >
                <td>
                  <div class="small_ava">
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
                    <!-- <img :src="require('@/assets/images/small_ava1.jpg')"> -->
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
                  <br />
                  <span class="chat_text">
                    <div
                      v-if="chat.chat_message.length != 0"
                      class="chat_arrows"
                    >
                      {{ chat.chat_message[0].text }}
                    </div>
                  </span>
                  <span class="chat_text"></span>
                </td>
                <td
                  style="text-align: center; padding-right: 15px; color: #999999;"
                >
                  {{ moment(chat.updatedAt).format("h:mm") }}
                </td>
              </tr>
            </table>
          </div>
          <div class="chat_message_arrea">
            <div
              v-if="
                selectedChat && $auth.getUser().id != selectedChat.chat_owner.id
              "
              class="other_user"
            >
              <div class="small_ava">
                <avatar
                  :src="selectedChat.chat_owner.img"
                  :size="50"
                  :username="
                    selectedChat.chat_owner.firstname +
                      ' ' +
                      selectedChat.chat_owner.lastname
                  "
                ></avatar>
                <!-- <img :src="require('@/assets/images/small_ava2.jpg')"> -->
              </div>
              <h6>
                Чат с {{ selectedChat.chat_owner.firstname }}
                {{ selectedChat.chat_owner.lastname }}
              </h6>
              <div class="other_user_icons_container">
                <!-- <img class="small_icon_2" :src="require('@/assets/images/search.svg')"> -->
                <img
                  data-toggle="modal"
                  data-target="#myModal"
                  class="small_icon_2"
                  :src="require('@/assets/images/clip.svg')"
                />
              </div>
            </div>

            <div
              v-if="
                selectedChat &&
                  $auth.getUser().id === selectedChat.chat_owner.id
              "
              class="other_user"
            >
              <div class="small_ava">
                <avatar
                  :src="selectedChat.chat_user.img"
                  :size="50"
                  :username="
                    selectedChat.chat_user.firstname +
                      ' ' +
                      selectedChat.chat_user.lastname
                  "
                ></avatar>
                <!-- <img :src="require('@/assets/images/small_ava2.jpg')"> -->
              </div>
              <h6>
                Чат с {{ selectedChat.chat_user.firstname }}
                {{ selectedChat.chat_user.lastname }}
              </h6>
              <div class="other_user_icons_container">
                <!-- <img class="small_icon_2" :src="require('@/assets/images/search.svg')"> -->
                <img
                  data-toggle="modal"
                  data-target="#myModal"
                  class="small_icon_2"
                  :src="require('@/assets/images/clip.svg')"
                />
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

            <div class="send_message_container">
              <!-- <img class="small_icon_2" :src="require('@/assets/images/smille_icon.svg')"> -->
              <div></div>
              <input
                v-model="messageText"
                type="text"
                name="send_message"
                placeholder="Введите сообщение"
              />
            </div>
            <button @click="sendMessage()">Send</button>
          </div>
        </div>
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
  name: 'AdminChats',
  watch: {},
  data() {
    return {
      allChats: '',
      messagesInChat: {},
      selectedChat: '',
      messageText: '',
      messageInput: '',
      messageImg: '',
      isConnected: '',
      loadedImage: '',
      socketMessage: '',
      viewDel: false,
      server: {
        url: '',
      },
    };
  },
  sockets: {
    connect() {
      this.isConnected = true;
      // console.log('socket connected');
    },
    customEmit(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)',
      );
      this.isConnected = false;
    },
    messageChannel(data) {
      this.socketMessage = data;
      // console.log('sended mes ', data);
      this.messagesInChat.push(data.message.message);
    },
  },
  mounted() {
    this.getAllMyChatsFun();
  },
  methods: {
    handleFilePondInit() {
      const servers =
        // "http://localhost:3000/api/" +
        `${'http://185.22.64.121:3000/api/' + 'uploadResizeFile/chat/'}${
          this.selectedChat.id
        }/xs`;
      this.server = servers;
    },
    deleteImageOnPopup() {
      // console.log(JSON.parse(this.$refs.pond.getFile().serverId));
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
    addImage() {
      this.loader = true;
      const data = new FormData();
      data.append('uploadfile', this.$refs.pond.getFile().file);
      this.$axios
        .post(`/uploadResizeFile/chat/${this.selectedChat.id}/xs`, data)
        .then((resize) => {
          this.loadedImage = resize.data;
          // console.log(resize);
        });
    },
    socketFun() {
      this.$socket.emit('sendMessage', 'PING!');
    },
    getAllMyChatsFun() {
      this.$axios
        .get('/getAllMyChats')
        .then((response) => {
          this.allChats = response.data;
          // console.log(response);
          // console.log('test1');

          if (this.$route.params.data) {
            // console.log('test2');
            const id = this.$route.params.data.chat.id;
            for (let i = 0; i < this.allChats.length; i++) {
              if (this.$route.params.data.chat.id === this.allChats[i].id) {
                this.getChat(id, i);
              }
            }
          } else if (this.allChats.length > 0) {
            console.log('test3');
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
    getChat(id, index) {
      this.$axios
        .get(`/getOneChat/${id}`)
        .then((chat) => {
          console.log(chat);
          this.selectedChat = this.allChats[index];
          this.messagesInChat = chat.data.chat_message;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendMessage() {
      const body = {
        chat_id: this.selectedChat.id,
        text: this.messageText,
      };
      if (this.loadedImage) {
        body.img = this.loadedImage.sharp_path;
        body.original_size_img = this.loadedImage.original_size_path;
      }
      this.$axios.post('/sendMessage', body).then((response) => {
        console.log(response);
        this.$refs.pond.removeFile();
        this.loadedImage = '';
        this.$socket.emit('sendMessage', response.data);
        this.messageText = '';
      });
    },
  },
};
</script>
<style scoped>
.maessage_upload_img {
  width: 120px;
  cursor: pointer;
}
</style>
