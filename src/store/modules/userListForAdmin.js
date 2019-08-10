import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex, VueAxios, axios);

const state = {
  userFilter: {
    order: 'DESC',
  },
  usersList: {
    pageNum: 1,
    data: '',
  },
};

const getters = {
  USERSFILTER: state => state.userFilter,
  USERSLIST: state => state.usersList,
};
const mutations = {
  SET_USERSFILTER: (state, payload) => {
    state.userFilter = payload;
  },
  SET_USERSLIST: (state, payload) => {
    state.usersList.data = payload;
  },
  SET_USERSPAGE: (state, payload) => {
    state.usersList.pageNum = payload;
  },
};
const actions = {
  GET_USERSLIST: async (context, payload) => {
    const { data } = await axios.get(
      `/admin/getAllUsers/${state.usersList.pageNum}/4/${
        state.userFilter.order
      }`,
    );
    await context.commit('SET_USERSLIST', data);
    await context.commit('SET_USERSPAGE', data.this_page);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
