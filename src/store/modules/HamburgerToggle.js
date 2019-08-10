import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {
  hamburgerActive: false,
};
const getters = {
  HAMBURGER_STATUS: state => state.hamburgerActive,
};

const mutations = {
  SET_HAMBURGER_STATUS: (state, payload) => {
    state.hamburgerActive = payload;
  },
};
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
