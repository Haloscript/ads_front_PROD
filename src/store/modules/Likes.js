import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const state = {
  MyLikes: {
    likes_good: [],
    likes_shop: [],
    likes_owner: [],
  },
};
const getters = {
  GET_ALL_MY_LIKES_GOOD: state => state.MyLikes.likes_good,
  GET_ALL_MY_LIKES_SHOP: state => state.MyLikes.likes_shop,
  GET_ALL_MY_LIKES_OWNER: state => state.MyLikes.likes_owner,
};

const mutations = {
  SET_LIKES_GOOD: (state, { payload, type }) => {
    if (type === 'equal') { state.MyLikes.likes_good = (payload); } else if (type === 'push') { state.MyLikes.likes_good.push(payload); }
  },
  SET_LIKES_SHOP: (state, { payload, type }) => {
    if (type === 'equal') { state.MyLikes.likes_shop = (payload); } else if (type === 'push') { state.MyLikes.likes_shop.push(payload); }
  },
  SET_LIKES_OWNER: (state, { payload, type }) => {
    if (type === 'equal') { state.MyLikes.likes_owner = (payload); } else if (type === 'push') { state.MyLikes.likes_owner.push(payload); }
  },
  DEL_LIKES_GOOD: (state, payload) => {
    state.MyLikes.likes_good.splice(state.MyLikes.likes_good.indexOf(payload), 1);
  },
  DEL_LIKES_SHOP: (state, payload) => {
    state.MyLikes.likes_shop.splice(state.MyLikes.likes_shop.indexOf(payload), 1);
  },
  DEL_LIKES_OWNER: (state, payload) => {
    state.MyLikes.likes_owner.splice(state.MyLikes.likes_owner.indexOf(payload), 1);
  },
};
const actions = {
  SET_LIKES_API: async (context, payload) => {
    const { data } = await axios.post('/setLikes', payload);
    switch (data.type) {
      case 'owner':
        await context.commit('SET_LIKES_OWNER', { payload: data.like.owner_id, type: 'push' });
        break;
      case 'shop':
        await context.commit('SET_LIKES_SHOP', { payload: data.like.shop_id, type: 'push' });
        break;
      case 'good':
        await context.commit('SET_LIKES_GOOD', { payload: data.like.good_id, type: 'push' });
        break;
    }
  },
  GET_ALL_MY_LIKES_API: async (context, payload) => {
    if (payload) {
      const { data } = await axios.get('/getAllMyLikes');
      let clone = Object.assign({}, data),
        resultGood = clone.likes_good.map(a => a.good_id),
        resultShop = clone.likes_shop.map(a => a.shop_id),
        resultOwner = clone.likes_owner.map(a => a.owner_id);
      await context.commit('SET_LIKES_GOOD', { payload: resultGood, type: 'equal' });
      await context.commit('SET_LIKES_SHOP', { payload: resultShop, type: 'equal' });
      await context.commit('SET_LIKES_OWNER', { payload: resultOwner, type: 'equal' });
    }
  },
  DEL_LIKES_API: async (context, payload) => {
    console.log(payload);
    const { data } = await axios.post('/delLike', payload);
    switch (data.type) {
      case 'good':
        await context.commit('DEL_LIKES_GOOD', data.del_id);
        break;
      case 'shop':
        await context.commit('DEL_LIKES_SHOP', data.del_id);
        break;
      case 'owner':
        await context.commit('DEL_LIKES_OWNER', data.del_id);
        break;
    }
  },

};
export default {
  state,
  getters,
  mutations,
  actions,
};
