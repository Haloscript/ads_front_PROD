<template>
  <section class="new_category_block">
    <div class="container">
      <h4>Получите работу или найдите заказчика  в более чем {{groupList.length}} различных категориях</h4>

      <div class="new_category_container">
        <ul>
          <li style="cursor: pointer" @click="goToGruop(group)" v-for="group in groupList">
              <img :src="group.miniature_img">
              <p>{{group.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'All_GroupsList',
  props: {
    groupList: Array,
  },
  data() {
    return {

    };
  },
  methods: {
    goToGruop(groupData) {
      this.$router.push({ path: `/group_page/${groupData.uniqurl}` });
    },
  },
};
</script>

<style scoped>

</style>
