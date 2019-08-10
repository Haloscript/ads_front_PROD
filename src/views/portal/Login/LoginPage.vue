<template>
  <section class="login_body">
    <div class="login_form_container">
      <img
        class="login_form_logo"
        :src="require('@/assets/images/logo_color.png')"
      />
      <h4>С возвращением</h4>
      <span>{{ errors.first("email") }}</span>
      <input v-model="email" type="name" v-validate="'required|email'" name="login_name" placeholder="Ваш Email" />
      <span>{{ errors.first("пароль") }}</span>
      <input v-model="password"
        type="password"
        name="login_mail"
        placeholder="Ваш Пароль"
      />
      <button @click="login">Войти</button>
      <h6><a href="">Забыли пароль?</a></h6>
      <hr />
      <h5>
        Нет учетной записи?
        <router-link :to="{ name: 'Registration' }"
          >Зарегистрируйтесь</router-link
        >
      </h5>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      this.$axios.post('/auth/signin', data).then((response) => {
        const userData = response.data;
        if (userData.auth) {
          this.$auth.saveToken(userData.accessToken);
          this.$auth.saveUser(userData.user);
          this.$axios.defaults.headers.common.Authorization = 'JWT' + ' ' + localStorage.getItem('token')
          this.$router.push({ name: 'Main' });
        } else {
          this.showAlert({
            mes: userData.mes,
            title: 'Ой..',
            type: 'error' });
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
