import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex, VueAxios, axios);

const state = {
  notification: {},
};

const getters = {
  NOTIFICATIONS: state => state.notification,
};

const mutations = {
  SET_MY_NOTIFICATIONS: (state, payload) => {
    state.notification = payload;
  },
};

const actions = {
  GET_MY_NOTIFICATIONS: async (context, payload) => {
    const { data } = await axios.get('/getMyNotifications');
    await context.commit('SET_MY_NOTIFICATIONS', data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
