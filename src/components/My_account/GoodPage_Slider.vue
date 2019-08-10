<template>
  <div v-if="content" class="product_page_other_products">
    <h4>{{headerText}}</h4>
      <carousel v-if="options && content"
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
        <div class="second_category_block_img_wrapper">
          <img v-if="item.good_image.length > 0" :src="item.good_image[0].sharp_path" />
        </div>
        <h5>{{ item.title }}</h5>
        <h4>{{ nicePrice(item.price) }}</h4>
      </div>
      </carousel>
    <div>
    </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel';

export default {
  name: 'GoodPage_Slider',
  components: { carousel },
  props: {
    headerText: String,
    content: Array,
    options: Object,
  },
  data() {
    return {
      owlWindowSettings: {
        0: {
          items: this.options.Width0.items,
          nav: false,
          width: 100,
          mouseDrag: this.options.mouseDrag,
          touchDrag: this.options.touchDrag,
        },

        480: {
          items: this.options.Width480.items,
          nav: false,
          width: 100,
          mouseDrag: this.options.mouseDrag,
          touchDrag: this.options.touchDrag,
        },
        768: {
          items: this.options.Width768.items,
          nav: false,
          loop: true,
          margin: 0,
          mouseDrag: this.options.mouseDrag,
          touchDrag: this.options.touchDrag,
        },


        1000: {
          items: this.options.Width1000.items,
          nav: false,
          loop: true,
          margin: 0,
          mouseDrag: this.options.mouseDrag,
          touchDrag: this.options.touchDrag,
        },
      },
    };
  },
  created() {
  },
  methods: {
    nicePrice(price) {
      const nice = String(price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
      return nice;
    },
  },
};
</script>

<style scoped>

</style>

