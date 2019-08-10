<template>
  <div>
    <div class="login_form_container">
      <!-- <img class="login_form_logo" :src="require('@/images/logo_color.png')"> -->
      <h4>С возвращением</h4>
      <form @submit.prevent="logining">
        <span>{{ errors.first('email') }}</span>
        <input
          v-validate="'required|email'"
          v-model="email"
          type="email"
          name="login_name"
          placeholder="Ваше Имя"
        >
        <span>{{ errors.first('password') }}</span>
        <input
          v-validate="'required|min:6'"
          v-model="password"
          type="password"
          name="login_mail"
          placeholder="Ваше E-mail"
        >
        <button type="submit">Войти</button>
      </form>
      <h6>
        <a href>Забыли пароль?</a>
      </h6>
      <hr>
      <h5>
        Нет учетной записи?
        <a href="login.html">Зарегистрируйтесь</a>
      </h5>
    </div>

    <!-- 
 
    <h1>ONe</h1>

    <form @submit.prevent="logining">
      <div>
       
        <input v-validate="'required|email'" v-model="email" name="email" type="text">
      </div>
      <div class="form1">
        
        <input v-validate="'required|min:6'" v-model="password" name="password" type="password">
      </div>
      <div class="dflex">
        <div class="form2">
        </div>
      </div>
      <button class="button-blue mb-30" type="submit">Войти</button>
    </form>-->
  </div>
</template>
<script>
export default {
  name: "AdminLogin",
  data() {
    return {
      email: "",
      password: "",
      loader: false
    };
  },
  methods: {
    logining() {
      this.$validator.validate().then(valid => {
        if (!valid) {
          // console.log("valid", valid);
        } else {
          let auth = {
            email: this.email,
            password: this.password
          };
          this.loader = true;
          this.$axios
            .post("auth/signin", auth)
            .then(response => {
              console.log(response);
              if (response.data.code == 1) {
                let errs = {
                  field: "email",
                  id: "1",
                  msg: "Пользователь с таким email не найден",
                  rule: "email",
                  scope: null,
                  vmId: this.$validator.errors.vmId
                };
                this.$validator.errors.items.push(errs);
                this.loader = false;
              } else if (response.data.code == 2) {
                console.log("code 2");
                let errs = {
                  field: "password",
                  id: "2",
                  msg: "Неверный пароль",
                  rule: "min",
                  scope: null,
                  vmId: this.$validator.errors.vmId
                };
                this.$validator.errors.items.push(errs);
                this.loader = false;
              } else {
                this.$auth.saveUser(response.data.user);
                this.$auth.saveToken(response.data.accessToken);
                let step = this.$auth.verifiedUser();
                if (step) {
                  window.location.replace(step);
                } else {
                  window.location.replace("/");
                }
              }
              this.loader = false;
            })
            .catch(err => {
              console.log(err);
              this.loader = false;
            });
        }
      });
    }
  }
};
</script>
