<template>
  <div id="app">
    <div class="blured_overlay">
      <Header-component v-if="!$route.meta.admin"></Header-component>
      <router-view />
      <Footer-component v-if="!$route.meta.admin && groupList" :gruop_list="groupList"  />
    </div>
  </div>
</template>
<script>
import HeaderComponent from './components/HeaderFooter/Header_component';
import FooterComponent from './components/HeaderFooter/Footer_component';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      groupList: '',
    };
  },
  mounted() {
    this.getGroupOnFooter();

  },
  methods: {
    getGroupOnFooter() {
      this.$axios.get('/getOnMainGroups/7').then((response) => {
        this.groupList = response.data.group;
      });
    },
  },
};
</script>

<style lang="scss">
@import "./assets/css/bootstrap.min.css";
@import "./assets/css/fonts.css";
@import "./assets/css/style.css";
@import "./assets/css/preloader.scss";
/*@import "./assets/css/AdminStyle.css";*/
@import "./assets/css/hamburger.css";
@import "./assets/css/filepond.min.css";
@import "./assets/css/filepond-plugin-image-preview.min.css";
</style>
