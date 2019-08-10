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
  good: {
    id: '',
  },
};
const getters = {
  COMMENTS: state => state.comments,
};
const mutations = {
  SET_COMMENTS: (state, payload) => {
    state.comments = payload;
  },
  SET_COMMENTSPAGE: (state, payload) => {
    state.comments.pageNum = payload;
  },
  SET_COMMENTSID: (state, payload) => {
    state.good.id = payload;
  },
  ADD_COMMENTONETIME: (state, payload) => {
    state.comments.comments.push(payload);
  },
};
const actions = {
  GET_COMMENTS: async (context, payload) => {
    const { data } = await axios.get(
      `/getAllCommentsByGood/${state.comments.pageNum}/4/${state.good.id}`,
    );
    await context.commit('SET_COMMENTS', data);
    await context.commit('SET_COMMENTSPAGE', data.this_page);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
