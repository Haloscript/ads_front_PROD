<template>
  <div>
    <hr />
    <section class="bottom_nav block_style">
      <div class="container">
        <div class="row">
          <ul class="footer_links">
            <li style="font-size: 24px; font-weight: 700; margin-bottom: 20px;">
              Группы
            </li>
            <li v-for="group in gruop_list ">
              <router-link v-scroll-to="'#groupAnchor'" :to="{path:`/group_page/${group.uniqurl}`}"
                ><span
                  ><img
                    :src="
                      require('@/assets/images/arrow_list_style.svg')
                    "/></span
                >{{group.name}}</router-link
              >
            </li>
            <li>
              <router-link  v-scroll-to="'#allGroupAnchor'" :to="{path:'/groups-all'}" style="color: #007bff"
                ><span
                  ><img
                    :src="
                      require('@/assets/images/arrow_list_style.svg')
                    "/></span
                >Смотреть все</router-link
              >
            </li>
          </ul>
          <ul class="footer_links">
            <li style="font-size: 24px; font-weight: 700; margin-bottom: 20px;">
              Полезность
            </li>
            <li>
              <a href=""
                ><span
                  ><img
                    :src="
                      require('@/assets/images/arrow_list_style.svg')
                    "/></span
                >Закон о рекламе РК</a
              >
            </li>
            <li>
              <a href=""
                ><span
                  ><img
                    :src="
                      require('@/assets/images/arrow_list_style.svg')
                    "/></span
                >Стоимость налога за рекламу</a
              >
            </li>
            <li>
              <a href=""
                ><span
                  ><img
                    :src="
                      require('@/assets/images/arrow_list_style.svg')
                    "/></span
                >Шаблон договорв по рекламе</a
              >
            </li>
            <li>
              <a href=""
                ><span
                  ><img
                    :src="
                      require('@/assets/images/arrow_list_style.svg')
                    "/></span
                >Терминология по рекламе</a
              >
            </li>
          </ul>
          <ul class="footer_links">
            <li style="font-size: 24px; font-weight: 700; margin-bottom: 20px;">
              Информация
            </li>
            <li>
              <a href=""
                ><span
                  ><img
                    :src="
                      require('@/assets/images/arrow_list_style.svg')
                    "/></span
                >Компаниям</a
              >
            </li>
            <li>
              <a href=""
                ><span
                  ><img
                    :src="
                      require('@/assets/images/arrow_list_style.svg')
                    "/></span
                >Соискателям</a
              >
            </li>
            <li>
              <a href=""
                ><span
                  ><img
                    :src="
                      require('@/assets/images/arrow_list_style.svg')
                    "/></span
                >О нас</a
              >
            </li>
            <li>
              <a href=""
                ><span
                  ><img
                    :src="
                      require('@/assets/images/arrow_list_style.svg')
                    "/></span
                >Партнеры</a
              >
            </li>
            <li>
              <a href=""
                ><span
                  ><img
                    :src="
                      require('@/assets/images/arrow_list_style.svg')
                    "/></span
                >Другие страны</a
              >
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!-- Footer -->
    <footer class="block_style">
      <div class="container">
        <div class="row">
          <!-- 			<div class="col-lg-3 footer_content footer_links row">
                                  <ul>
                                      <li><a href=""><span><img :src="require('@/assets/images/arrow_list_style.svg')"></span>Компаниям</a></li>
                                      <li><a href=""><span><img :src="require('@/assets/images/arrow_list_style.svg')"></span>Соискателям</a></li>
                                      <li><a href=""><span><img :src="require('@/assets/images/arrow_list_style.svg')"></span>О нас</a></li>
                                      <li><a href=""><span><img :src="require('@/assets/images/arrow_list_style.svg')"></span>Партнеры</a></li>
                                      <li><a href=""><span><img :src="require('@/assets/images/arrow_list_style.svg')"></span>Другие страны</a></li>
                                  </ul>
                              </div> -->

          <div class="col-lg-12 footer_content footer_icons">
            <ul>
              <li>
                <img
                  :src="require('@/assets/images/footer_icon_facebook.svg')"
                />
              </li>
              <li>
                <img :src="require('@/assets/images/footer_instagram.svg')" />
              </li>
              <li>
                <img
                  :src="require('@/assets/images/footer_icon_youtube.svg')"
                />
              </li>
            </ul>
            <ul>
              <li>+7 708 618 63 31</li>
            </ul>
          </div>

          <div class="col-lg-3 footer_content"></div>
        </div>
      </div>
    </footer>
    <div
      :class="['site_overlay', { site_overlay_visible: HAMBURGER_STATUS }]"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Footer_component',
  props: {
    gruop_list: Array,
  },
  computed: {
    ...mapGetters(['HAMBURGER_STATUS']),
  },
};
</script>

<style scoped></style>
