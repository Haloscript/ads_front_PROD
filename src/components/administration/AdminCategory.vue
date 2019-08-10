<template>
<div>
  <body>
    <div class="content_container col-lg-8">
      <div class="content_label">
        <h4>Категории</h4>
        <div class="content_counter">
          <p>{{typeAndCount.type}}</p>
          <div>{{typeAndCount.count}}</div>
        </div>
      </div>
      <div class="content_tabs">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-bind:class=" {active : isActive.group}"
              :to="'/administration'"
            >Группы</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-bind:class=" {active : isActive.category}"
              :to="'/administration/category'"
            >Категории</router-link>
          </li>
          <li class="nav-item">
            <router-link
              ref="url1"
              class="nav-link"
              v-bind:class=" {active : isActive.subcategory}"
              :to="'/administration/subcategory'"
            >Субкатегории</router-link>
          </li>
        </ul>
        <!-- Tab panes -->
        <router-view v-on:childinit="onChildInit"></router-view>
        <!-- Script For Show -->
      </div>
    </div>
  </body>
</div>
</template>
<script>
export default {
  name: "AdminCategory",
  watch: {
    $route: function() {
      if (this.$route.path === "/administration") {
        this.isActive = {
          group: true,
          category: false,
          subcategory: false
        };
      } else if (this.$route.path === "/administration/category") {
        this.isActive = {
          group: false,
          category: true,
          subcategory: false
        };
      } else if (this.$route.path === "/administration/subcategory") {
        this.isActive = {
          group: false,
          category: false,
          subcategory: true
        };
      } else {
        this.isActive = {
          group: false,
          category: false,
          subcategory: false
        };
      }
    }
  },
  data() {
    return {
      isActive: {
        group: false,
        category: false,
        subcategory: false
      },
      categories: "",
      typeAndCount: {}
    };
  },
  mounted() {
    this.isActive = {
      group: true,
      category: false,
      subcategory: false
    };
    if (this.$route.path === "/administration") {
      this.isActive = {
        group: true,
        category: false,
        subcategory: false
      };
    } else if (this.$route.path === "/administration/category") {
      this.isActive = {
        group: false,
        category: true,
        subcategory: false
      };
    } else if (this.$route.path === "/administration/subcategory") {
      this.isActive = {
        group: false,
        category: false,
        subcategory: true
      };
    } else {
      this.isActive = {
        group: false,
        category: false,
        subcategory: false
      };
    }
  },
  methods: {
    onChildInit(value) {
      this.typeAndCount = value;
    }
  }
};
</script>
