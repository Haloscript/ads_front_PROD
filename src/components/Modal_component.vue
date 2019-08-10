<template>
  <div>
    <!-- Modal App Form -->
    <div
      ref="modal"
      :class="['app_form_body', { app_form_body_play: activeClass }]"
    >
      <form action="">
        <div class="app_form_body_descr">
          <div class="app_form_body_descr_ava">
            <img src="images/category_container_img1.jpg" />
          </div>
          <textarea class="app_form_body_descr_content">
            Apple — американская корпорация, производитель персональных и
            планшетных компьютеров, аудиоплееров, телефонов, программного
            обеспечения. Один из пионеров в области персональных компьютеров и
            современных многозадачных операционных систем с графическим
            интерфейсом. Штаб-квартира — в Купертино, штат
          </textarea>
        </div>
        <div class="app_form_body_descr_input_container">
          <label for="app_form_category_select">Категория</label>
          <select
            name="app_form_category_selecet"
            id="app_form_category_select"
          >
            <option>Полиграфия</option>
            <option>Изготовление наружной рекламы</option>
            <option>Сувенирная продукция</option>
            <option>Размещение наружной рекламы</option>
            <option>Размещение рекламы в СМИ</option>
            <option>Реклама в Интернете</option>
            <option>Разработка дизайна</option>
            <option>Event-агентства</option>
          </select>
        </div>
        <div class="app_form_body_descr_input_container">
          <label for="app_form_subcategory_select">Субкатегория</label>
          <select
            name="app_form_category_selecet"
            id="app_form_subcategory_select"
          >
            <option>Полиграфия</option>
            <option>Изготовление наружной рекламы</option>
            <option>Сувенирная продукция</option>
            <option>Размещение наружной рекламы</option>
            <option>Размещение рекламы в СМИ</option>
            <option>Реклама в Интернете</option>
            <option>Разработка дизайна</option>
            <option>Event-агентства</option>
          </select>
        </div>
        <div class="app_form_body_descr_input_container">
          <label for="app_form_name_select">Наименование</label>
          <input type="text" name="" id="app_form_name_select" />
        </div>
        <div class="app_form_body_descr_input_container">
          <label for="app_form_date_select">Срок до:</label>
          <input type="date" name="" id="app_form_date_select" />
        </div>
        <div class="app_form_body_descr_input_container">
          <label for="app_form_number_select">Бюджет</label>
          <input type="text" name="" id="app_form_number_select" value=" ₸" />
        </div>
        <div class="app_form_body_attach_container">
          <div class="app_form_body_attach_button">
            <p>Прикрепить файлы</p>
            <label for="app_form_body_attach_input">Прикрепить</label>
            <input type="file" name="" id="app_form_body_attach_input" />
          </div>
        </div>
        <hr />
        <div class="app_form_button">
          <button>Опубликовать</button>
        </div>
      </form>
      <button class="app_form_close_button" @click="closedModal()">
        Закрыть
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal_component",
  props: {
    activeClass: Boolean
  },
  data() {
    return {
      closeModal: true
    };
  },
  methods: {
    closedModal() {
      this.$emit("closeModal", false);
    }
  }
};
</script>

<style scoped></style>
