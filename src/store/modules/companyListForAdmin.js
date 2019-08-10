import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex, VueAxios, axios);

const state = {
  companyFilter: {
    order: 'DESC',
  },
  companysList: {
    pageNum: 1,
    data: '',
  },
};

const getters = {
  COMPANYFILTER: state => state.companyFilter,
  COMPANYSLIST: state => state.companysList,
};
const mutations = {
  SET_COMPANYFILTER: (state, payload) => {
    state.companyFilter = payload;
  },
  SET_COMPANYSLIST: (state, payload) => {
    state.companysList.data = payload;
  },
  SET_COMPANYPAGE: (state, payload) => {
    state.companysList.pageNum = payload;
  },
};
const actions = {
  GET_COMPANYSLIST: async (context, payload) => {
    const { data } = await axios.get(
      `/admin/getAllShops/${state.companysList.pageNum}/4/${state.companyFilter.order}`,
    );
    context.commit('SET_COMPANYSLIST', data);
    context.commit('SET_COMPANYPAGE', data.this_page);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
