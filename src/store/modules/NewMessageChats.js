import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex, VueAxios, axios);

const state = {
  newMessages: {},
};

const getters = {
  NEWMESSAGES: state => state.newMessages,
};

const mutations = {
  SET_MY_NEWMESSAGES: (state, payload) => {
    state.newMessages = payload;
  },
};

const actions = {
  GET_MY_NEWMESSAGES: async (context, payload) => {
    const { data } = await axios.get('/getMyNewMessageCount');
    await context.commit('SET_MY_NEWMESSAGES', data.countNewMessages);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
