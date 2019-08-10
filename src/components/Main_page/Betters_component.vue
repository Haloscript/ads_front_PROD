<template>
  <section :class="['block_style', { sectionClass }]">
    <div class="container">
      <h4>{{ headerText }}</h4>
      <div class="category_container">
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
          <div style="cursor: pointer;"   @click="$emit('childinit', item.uniqurl)" v-for="item in content" class="item">
            <div class="category_container_ava_crop">
              <img v-if="item.shop_image[0]" :src="item.shop_image[0].sharp_path" />
            </div>
            <p>{{ item.title }}</p>
            <div class="category_like_container">
              <img :src="require('@/assets/images/like.svg')" />
              <h5>{{ item.shop_like_count }}</h5>
            </div>
          </div>
        </carousel>
      </div>
    </div>
  </section>
</template>

<script>
import carousel from 'vue-owl-carousel';

export default {
  name: 'Carusel_component',
  components: { carousel },
  props: {
    sectionClass: String,
    headerText: String,
    content: Array,
  },
  data() {
    return {
      owlWindowSettings: {
        0: {
          items: 2,
          nav: true,
        },
        480: {
          items: 2,
          nav: true,
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
      methods: {
        // goToThisShop(item) {
        //   this.$router.push({
        //     path: `/company/${item.uniqurl}`,
        //   });
        // },
      },
    };
  },
};
</script>

<style scoped></style>
