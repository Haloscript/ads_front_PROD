<template>
  <div>
    <!-- Fifth Block -->
    <section class="fifth_block block_style">
      <div class="container">
<!--         <div class="col-sm-12 col col-lg-6 row fifth_block_content">
          <div class="fifth_block_content_text">
            <h3>
              Создайте свое объявление<br
                class="nav_items_container_mobile_cor"
              />
              прямо сейчас
            </h3>
            <button @click="addGood()">Создать объявление</button>
          </div>
        </div>
        <div class="col-lg-6 row fifth_block_content">
          <div class="parallax">
            <div class="water water-layer11"></div>
            <div class="water water-layer10"></div>
            <div class="water water-layer9"></div>
            <div class="water water-layer8"></div>
            <div class="water water-layer7"></div>
            <div class="water water-layer6"></div>
            <div class="water water-layer5"></div>
            <div class="water water-layer4"></div>
            <div class="water water-layer3"></div>
            <div class="water water-layer2"></div>
            <div class="water water-layer1"></div>
          </div>
        </div> -->

        <div class="accordions_wrapper">
          <div class="accordion1">
            <div class="accordion_title">
              <h2>Клиенту</h2>
              <img :src="require('@/assets/images/accordion_title_img1.png')">
            </div>
            <ul>
              <li>
                <input type="checkbox" name="accordion1_item1" id="accordion1_item1">
                <label for="accordion1_item1">
                  <div class="acordion_arrow_wrapper">
                    <img class="accordion_arrow accordion_arrow1 arrow-animation" :src="require('@/assets/images/acordion_arrow.svg')">
                  </div>
                  <div class="accordion_item_title">
                    <p>Как зарегистрироваться?</p>
                    <span class="accordion_span1">+</span>
                  </div>
                  <div class="accordion_description">
                    <p>Выберите переключатель "клиент" и заполните поля</p>
                    <img :src="require('@/assets/images/acordion_img1.jpg')">
                  </div>
                </label>
              </li>

              <li>
                <input type="checkbox" name="accordion1_item1" id="accordion1_item2">
                <label for="accordion1_item2">
                  <div class="acordion_arrow_wrapper">
                    <img class="accordion_arrow accordion_arrow2 arrow-animation" :src="require('@/assets/images/acordion_arrow.svg')">
                  </div>
                  <div class="accordion_item_title">
                    <p>Как создать объявление?</p>
                    <span class="accordion_span1">+</span>
                  </div>
                  <div class="accordion_description">
                    <p>Перейдите в меню и нажмите на пункт "Объявление"</p>
                    <img :src="require('@/assets/images/acordion_img2.jpg')">
                  </div>
                </label>
              </li>

              <li>
                <input type="checkbox" name="accordion1_item1" id="accordion1_item3">
                <label for="accordion1_item3">
                  <div class="acordion_arrow_wrapper">
                    <img class="accordion_arrow accordion_arrow2 arrow-animation" :src="require('@/assets/images/acordion_arrow.svg')">
                  </div>
                  <div class="accordion_item_title">
                    <p>Как заполнить объявление?</p>
                    <span class="accordion_span1">+</span>
                  </div>
                  <div class="accordion_description">
                    <p>Описание Бла Бла Бла Бла Бла</p>
                    <img :src="require('@/assets/images/acordion_img2.jpg')">
                  </div>
                </label>
              </li>

              <li>
                <input type="checkbox" name="accordion1_item1" id="accordion1_item4">
                <label for="accordion1_item4">
                  <div class="accordion_item_title">
                    <p>Как зарегестрироваться</p>
                    <span class="accordion_span1">+</span>
                  </div>
                  <div class="accordion_description">
                    <h3>Гаголовок</h3>
                    <p>Описание Бла Бла Бла Бла Бла</p>
                  </div>
                </label>
              </li>

              <li>
                <input type="checkbox" name="accordion1_item1" id="accordion1_item5">
                <label for="accordion1_item5">
                  <div class="accordion_item_title">
                    <p>Как зарегестрироваться</p>
                    <span class="accordion_span1">+</span>
                  </div>
                  <div class="accordion_description">
                    <h3>Гаголовок</h3>
                    <p>Описание Бла Бла Бла Бла Бла</p>
                  </div>
                </label>
              </li>
            </ul>
          </div>

          <div class="accordion2">
            <div class="accordion_title">
              <h2>Исполнителю</h2>
              <img :src="require('@/assets/images/accordion_title_img2.png')">
            </div>
            <ul>
              <li>
                <input type="checkbox" name="accordion1_item2" id="accordion2_item1">
                <label for="accordion2_item1">
                  <div class="acordion_arrow_wrapper">
                    <img class="accordion_arrow accordion_arrow1 arrow-animation" :src="require('@/assets/images/acordion_arrow.svg')">
                  </div>
                  <div class="accordion_item_title">
                    <p>Как зарегистрироваться?</p>
                    <span class="accordion_span1">+</span>
                  </div>
                  <div class="accordion_description">
                    <p>Выберите переключатель "клиент" и заполните поля</p>
                    <img :src="require('@/assets/images/acordion_img1.jpg')">
                  </div>
                </label>
              </li>

              <li>
                <input type="checkbox" name="accordion1_item2" id="accordion2_item2">
                <label for="accordion2_item2">
                  <div class="acordion_arrow_wrapper">
                    <img class="accordion_arrow accordion_arrow2 arrow-animation" :src="require('@/assets/images/acordion_arrow.svg')">
                  </div>
                  <div class="accordion_item_title">
                    <p>Как создать объявление?</p>
                    <span class="accordion_span1">+</span>
                  </div>
                  <div class="accordion_description">
                    <p>Перейдите в меню и нажмите на пункт "Объявление"</p>
                    <img :src="require('@/assets/images/acordion_img2.jpg')">
                  </div>
                </label>
              </li>

              <li>
                <input type="checkbox" name="accordion1_item2" id="accordion2_item3">
                <label for="accordion2_item3">
                  <div class="acordion_arrow_wrapper">
                    <img class="accordion_arrow accordion_arrow2 arrow-animation" :src="require('@/assets/images/acordion_arrow.svg')">
                  </div>
                  <div class="accordion_item_title">
                    <p>Как заполнить объявление?</p>
                    <span class="accordion_span1">+</span>
                  </div>
                  <div class="accordion_description">
                    <p>Описание Бла Бла Бла Бла Бла</p>
                    <img :src="require('@/assets/images/acordion_img2.jpg')">
                  </div>
                </label>
              </li>

              <li>
                <input type="checkbox" name="accordion1_item2" id="accordion2_item4">
                <label for="accordion2_item4">
                  <div class="accordion_item_title">
                    <p>Как зарегестрироваться</p>
                    <span class="accordion_span1">+</span>
                  </div>
                  <div class="accordion_description">
                    <h3>Гаголовок</h3>
                    <p>Описание Бла Бла Бла Бла Бла</p>
                  </div>
                </label>
              </li>

              <li>
                <input type="checkbox" name="accordion1_item2" id="accordion2_item5">
                <label for="accordion2_item5">
                  <div class="accordion_item_title">
                    <p>Как зарегестрироваться</p>
                    <span class="accordion_span1">+</span>
                  </div>
                  <div class="accordion_description">
                    <h3>Гаголовок</h3>
                    <p>Описание Бла Бла Бла Бла Бла</p>
                  </div>
                </label>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
    <section class="utility_block">
      <div class="container">
        <div class="utility_block_title">
          <h3>Полезность</h3>
        </div>
        <div class="utility_block_tabs">
          <ul>
            <li>
              <img :src="require('@/assets/images/utility1.svg')">
              <h4>Закон о рекламе РК</h4>
              <a href="">Подробнее</a>
            </li>
            <li>
              <img :src="require('@/assets/images/utility2.svg')">
              <h4>Стоимость налога за рекламу</h4>
              <a href="">Подробнее</a>
            </li>
            <li>
              <img :src="require('@/assets/images/utility3.svg')">
              <h4>Шаблон договоров по рекламе</h4>
              <a href="">Подробнее</a>
            </li>
            <li>
              <img :src="require('@/assets/images/utility4.svg')">
              <h4>Терминология по рекламе</h4>
              <a href="">Подробнее</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <Modal_component
    :activeClass="openModal"
    @closeModal="closedModal"
    ></Modal_component>
  </div>
</template>

<script>
  import Modal_component from '@/components/Modal_component';

  export default {
    name: 'Fifth_block',
    components: {
      Modal_component,
    },
    data() {
      return {
        openModal: false,
      };
    },
    methods: {
      addGood() {
        this.openModal = !this.openModal;
      },
      closedModal(value) {
        this.openModal = !this.openModal;
      },
    },
  };
</script>

<style scoped>

  .accordion_title{
    position: relative;
  }

  .accordion_title h2{
    color: #FFF;
    font-size: 60px;
    margin-bottom: 70px;
    position: relative;
    z-index: 2;
  }

  .accordion_title img{
    float: right;
    width: 420px;
    position: absolute;
    bottom: -100px;
    right: 100px;
  }

  .accordions_wrapper{
    padding-top: 320px;
  }

  .accordions_wrapper label{
    cursor: pointer;
    height: 10px;
  }

  .accordions_wrapper ul{
    padding: 0;
    margin: 0;
  }

  .accordions_wrapper ul li{
    width: 100%;
    padding: 15px;
    background: #FFF;
    border-bottom: 1px solid #999;
    position: relative;
  }

  .accordion_item_title{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
  }

  .accordion_item_title p{
    float: left;
    font-weight: 700;
  }

  .accordions_wrapper ul li label{
    width: 100%;
    display: block;
    overflow: hidden;
  }

  .accordions_wrapper ul li input{
    display: none;
  }

  .accordions_wrapper ul li input[type="checkbox"]:checked + label{
    height: 100%;
  }

  .accordion1{
    width: 49%;
    float: left;
  }

  .accordion2{
    width: 49%;
    float: right;
  }

  .accordion_span1{
    float: right;
    font-size: 22px;
    position: absolute;
    font-weight: 700;
    right: 10px;
    top: 0;
  }

  .accordion_description{
    width: 100%;
    padding-top: 40px;
  }

  .accordion_description img{
    width: 70%;
    display: block;
    margin: auto;
  }

  .acordion_arrow_wrapper{
    position: relative;
  }

  .accordion_arrow{
    width: 20px;
    position: absolute;
    z-index: 2;
  }

  .accordion_arrow1{
    right: 133px;
    top: 268px;
  }

  .accordion_arrow2{
    right: 263px;
    top: 268px;   
  }

  .arrow-animation{
    animation: arrowanimationFrames linear 2s;
    animation-iteration-count: infinite;
    transform-origin: 50% 50%;
    -webkit-animation: arrowanimationFrames linear 2s;
    -webkit-animation-iteration-count: infinite;
    -webkit-transform-origin: 50% 50%;
    -moz-animation: arrowanimationFrames linear 2s;
    -moz-animation-iteration-count: infinite;
    -moz-transform-origin: 50% 50%;
    -o-animation: arrowanimationFrames linear 2s;
    -o-animation-iteration-count: infinite;
    -o-transform-origin: 50% 50%;
    -ms-animation: arrowanimationFrames linear 2s;
    -ms-animation-iteration-count: infinite;
    -ms-transform-origin: 50% 50%;
  }

  @keyframes arrowanimationFrames{
    0% {
      transform:  scaleX(1.00) scaleY(1.00) ;
    }
    50% {
      transform:  scaleX(1.50) scaleY(1.50) ;
    }
    100% {
      transform:  scaleX(1.00) scaleY(1.00) ;
    }
  }

  @-moz-keyframes arrowanimationFrames{
    0% {
      -moz-transform:  scaleX(1.00) scaleY(1.00) ;
    }
    50% {
      -moz-transform:  scaleX(1.50) scaleY(1.50) ;
    }
    100% {
      -moz-transform:  scaleX(1.00) scaleY(1.00) ;
    }
  }

  @-webkit-keyframes arrowanimationFrames {
    0% {
      -webkit-transform:  scaleX(1.00) scaleY(1.00) ;
    }
    50% {
      -webkit-transform:  scaleX(1.50) scaleY(1.50) ;
    }
    100% {
      -webkit-transform:  scaleX(1.00) scaleY(1.00) ;
    }
  }

  @-o-keyframes arrowanimationFrames {
    0% {
      -o-transform:  scaleX(1.00) scaleY(1.00) ;
    }
    50% {
      -o-transform:  scaleX(1.50) scaleY(1.50) ;
    }
    100% {
      -o-transform:  scaleX(1.00) scaleY(1.00) ;
    }
  }

  @-ms-keyframes arrowanimationFrames {
    0% {
      -ms-transform:  scaleX(1.00) scaleY(1.00) ;
    }
    50% {
      -ms-transform:  scaleX(1.50) scaleY(1.50) ;
    }
    100% {
      -ms-transform:  scaleX(1.00) scaleY(1.00) ;
    }
  }

  .utility_block{
    width: 100%;
    height: 400px;
    display: table;
    padding-bottom: 30px;
    padding-top: 30px;
    background: #FFF;
  }

  .utility_block_tabs{

  }

  .utility_block_tabs li{
    width: 25%;
    float: left;
  }

  .utility_block_tabs li a{
    text-align: center;
    display: block;
  }

  .utility_block_tabs ul{
    padding: 0;
    margin: 0;
  }

  .utility_block_tabs li img{
    width: 100px;
    display: block;
    margin: auto;
  }

  .utility_block_tabs li h4{
    font-size: 18px;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .utility_block_title{
    padding-bottom: 30px;
  }

</style>
