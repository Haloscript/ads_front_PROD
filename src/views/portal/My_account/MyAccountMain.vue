<template>
  <section class="account_page">
    <div class="container">
      <div class="account_page_container">
        <h4>Мой аккаунт</h4>
        <div class="content_tabs">
          <!-- Nav tabs -->
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <router-link
                class="nav-link active"
                data-toggle="tab"
                :to="{ path: '/myaccount' }"
                >Объявления</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                data-toggle="tab"
                :to="{ path: '/myaccount/chats' }"
                >Сообщения</router-link
              >
            </li>
            <li v-if="!$auth.getUser().shop" class="nav-item">
              <router-link
                class="nav-link"
                data-toggle="tab"
                :to="{ path: '/myaccount/options' }"
              >Настройки</router-link
              >
            </li>
            <li v-else class="nav-item">
              <router-link
                class="nav-link"
                data-toggle="tab"
                :to="{ path: '/myaccount/options_company' }"
              >Настройки</router-link
              >
            </li>
          </ul>
          <!-- Tab panes -->
          <div id="menu1" class="container tab-pane">

            <div class="content_tabs">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MyAccountMain',
  mounted() {
    if (this.$auth.getUser()) {
      this.$store.dispatch('GET_MY_NOTIFICATIONS');
      this.$store.dispatch('GET_MY_NEWMESSAGES');
    }
  },
};
</script>

<style scoped></style>
