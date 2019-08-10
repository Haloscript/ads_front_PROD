import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex, VueAxios, axios);

const state = {
  comments: {
    pageNum: 1,
    data: '',
  },
  shop: {
    id: '',
  },
};
const getters = {
  COMMENTS_SHOP: state => state.comments,
};
const mutations = {
  SET_COMMENTS_SHOP: (state, payload) => {
    state.comments = payload;
  },
  SET_COMMENTSPAGE_SHOP: (state, payload) => {
    state.comments.pageNum = payload;
  },
  SET_COMMENTSID_SHOP: (state, payload) => {
    state.shop.id = payload;
  },
  ADD_COMMENTONETIME_SHOP: (state, payload) => {
    state.comments.comments.push(payload);
  },
};
const actions = {
  GET_COMMENTS_SHOP: async (context, payload) => {
    const { data } = await axios.get(
      `/getAllCommentsByShop/${state.comments.pageNum}/4/${state.shop.id}`,
    );
    await context.commit('SET_COMMENTS_SHOP', data);
    await context.commit('SET_COMMENTSPAGE_SHOP', data.this_page);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
