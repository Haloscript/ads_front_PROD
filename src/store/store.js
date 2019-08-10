import Vue from 'vue';
import Vuex from 'vuex';
import userListForAdmin from './modules/userListForAdmin';
import companyListForAdmin from './modules/companyListForAdmin';
import HamburgerToggle from './modules/HamburgerToggle';
import CommentsOnGood from './modules/CommentsOnGood';
import CommentsOnShop from './modules/CommentsOnShop';
import Notification from './modules/Notification';
import NewMessage from './modules/NewMessageChats';
import Likes from './modules/Likes';

Vue.use(Vuex);

// eslint-disable-next-line import/prefer-default-export
export default new Vuex.Store({
  modules: {
    userListForAdmin,
    companyListForAdmin,
    HamburgerToggle,
    CommentsOnGood,
    Likes,
    CommentsOnShop,
    Notification,
    NewMessage
  },
});
