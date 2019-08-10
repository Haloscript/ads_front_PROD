<template>
  <div class="container">
    <h4 class="second_category_block_title">
      {{ headerText }}
      <span> <router-link :to="{path: headerPath}">Смотреть все</router-link></span>
    </h4>
    <div :class="['second_category_container', { sectionClass }]">
      <carousel
        :loop="true"
        :margin="15"
        :autoplay="false"
        :responsiveClass="false"
        :autoplaySpeed="false"
        :autoplayHoverPause="true"
        :nav="false"
        :dots="false"
        :responsive="owlWindowSettings"
      >
        <div v-for="item in content" class="item">
          <router-link :to="{path:`/good/${item.uniqurl}`}">
          <div class="second_category_block_img_wrapper">
            <img v-if="item.good_image[0]" :src="item.good_image[0].sharp_path" />
          </div>
          <h5>{{ item.title }}</h5>
          <h6>{{ item.companyTitle }}</h6>
          <h4>{{ nicePrice(item.price) }} ₸</h4>
          </router-link>
        </div>
      </carousel>
    </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel';

export default {
  name: 'Categories_component',
  components: { carousel },
  props: {
    sectionClass: String,
    headerText: String,
    headerPath: String,
    content: Array,
  },
  data() {
    return {
      owlWindowSettings: {
        0: {
          items: 2,
          nav: true,
          width: 100,
        },
        480: {
          items: 2,
          nav: true,
          width: 100,
        },
        768: {
          items: 3,
          nav: true,
          loop: true,
          margin: 0,
        },
        1000: {
          items: 6,
          nav: true,
          loop: true,
          margin: 0,
        },
      },
    };
  },
  methods: {
    nicePrice(price) {
      const nice = String(price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
      return nice;
    },
  },
};
</script>

<style scoped></style>
