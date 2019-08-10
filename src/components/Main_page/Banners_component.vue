<template>
  <div id="demos">
    <carousel
      :loop="true"
      :margin="15"
      :autoplay="true"
      :animateOut="'fadeOut'"
      :animateIn="'fadeIn'"
      :mouseDrag="false"
      :touchDrag="false"
      :responsiveClass="false"
      :autoplayHoverPause="true"
      :nav="false"
      :dots="false"
      :autoplaySpeed="true"
      :responsive="owlWindowSettings"
    >
      <div v-for="item in content" class="item">
        <h4>{{ item.text_on_baners }}</h4>
        <img :src="item.path">
      </div>
    </carousel>
  </div>
</template>
<script>
import carousel from "vue-owl-carousel";
export default {
  name: "Banners_component",
  components: { carousel },
  props: {
    content: Array
  },
  data() {
    return {
      owlWindowSettings: {
        0: {
          items: 1,
          nav: false,
          width: 100
        },
        480: {
          items: 1,
          nav: false,
          width: 100
        },
        1000: {
          items: 1,
          nav: false,
          loop: true,
          margin: 0
        }
      }
    };
  }
};
</script>

<style scoped>
  .banner1_container .item img {
    position: absolute;
    bottom: 0;
    width: 420px;
    display: block;
    margin: auto;
    left: 0;
    right: 0;
  }
</style>
