import Vue from 'vue';
import Vuex from 'vuex';
import fb from '@/packages/firebaseConfig';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    comments: [],
  },
  actions: {
    fetchUserProfile({ commit, state }) {
      fb.usersCollection.doc(state.currentUser.uid).get().then((res) => {
        console.log('fetchUserProfile');
        console.log(res);
        commit('setUserProfile', res.data());
      }).catch(() => {
      });
    },
  },
  mutations: {
    setCurrentUser(state, payload) {
      console.log('setCurrentUser');
      state.currentUser = payload;
    },
    setUserProfile(state, payload) {
      state.userProfile = payload;
    },
    pushComments(state, { payload, isAdd }) {
      if (isAdd) {
        state.comments.unshift(payload);
      } else {
        state.comments.push(payload);
      }
    },
    clearComments(state) {
      state.comments = [];
    },
    removeComment(state, { payload, key }) {
      console.log(payload);
      console.log(key);
      state.comments.splice(key, 1);
    },
  },
});
