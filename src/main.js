import Vue from 'vue';
import App from './App';
import axios from 'axios';

import * as jquery from './assets/js/jquery.min.js';
import * as parralax from './assets/js/mouse_parall.js';
// import Popper from 'vue-popperjs';
import * as popper from './assets/js/popper.min.js';
import bootstrap from 'bootstrap';

import VueAxios from 'vue-axios';
import AuthFunction from './functions/Auth';
import { Service } from 'axios-middleware';
import VeeValidate, { Validator } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru';
import VueSweetalert2 from 'vue-sweetalert2';
import Paginate from 'vuejs-paginate';
import moment from 'moment';
import VueTheMask from 'vue-the-mask';
import { HollowDotsSpinner } from 'epic-spinners';
import Avatar from 'vue-avatar';
import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import VueChatScroll from 'vue-chat-scroll';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
import LightBox from 'vue-lightbox';
import money from 'v-money';
import VueScrollTo from 'vue-scrollto';


import router from './router/router';
import store from './store/store';
import VueRouterMiddleware from 'vue-router-middleware';
import middlewares from './middlewares';
Vue.use(VueRouterMiddleware, {
  router,
  middlewares });

axios.defaults.params = {};
axios.defaults.baseURL = 'http://185.22.64.121/api/';
axios.defaults.headers.common.Authorization = `${'JWT' + ' '}${localStorage.getItem('token')}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$axios = axios;

const service = new Service(axios);
let comp = 0;
service.register({
  onResponse(response) {
    const $res = JSON.parse(response.data);
    if ($res.mes === 'JWT Error') {
      comp += 1;
      if (comp < 2) {
        alert('Ваша защищенная сессия закончена, сейчас вы будете перенаправлены на страницу входа');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push({
          name: 'Login',
        });
      }
    } else {
      comp = 0;
      return response;
    }
  },
});


Vue.use(VueScrollTo)

Vue.use(VueSocketio, io('http://185.22.64.121:4000'));
// Vue.use(VueSocketio, io('http://localhost:4000'));

Vue.use(VueSocketio);
Vue.use(VueChatScroll);

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
);

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};
// import attributesRu from './strings/validator/attributes/ru.js';
Vue.prototype.$auth = new AuthFunction();
Vue.prototype.moment = moment;
Vue.config.productionTip = false;
Vue.component('HollowDotsSpinner', HollowDotsSpinner);
Vue.component('LightBox', LightBox);
Vue.component('paginate', Paginate);
Vue.component('avatar', Avatar);
Vue.use(VueTheMask);
Vue.use(VueSweetalert2, options);
Vue.use(VeeValidate);
Vue.use(VueAxios, axios);
Vue.use(money, { precision: 4 });
Validator.localize('ru', ru);

/* eslint-disable no-new */

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
