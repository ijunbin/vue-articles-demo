// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Global from '../static/global'   //引用
import store from './store'

Vue.prototype.Global = Global;

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(iView);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
