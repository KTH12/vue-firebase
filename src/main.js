// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vuetify/dist/vuetify.min.css';
import fb from '@/packages/firebaseConfig';

import Vuetify from 'vuetify';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Auth from './packages/Auth';

import './assets/scss/app.scss';


Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(Auth);

/* eslint-disable no-new */
/* eslint no-unused-vars: "error" */
let app;
fb.auth.onAuthStateChanged((user) => {
  console.log('========onAuthStateChanged==========');
  console.log(user);
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
    });
    app.$auth.setUser(user);
  }
});
