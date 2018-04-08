// The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";

import "./common/css/common.scss";

import i18n from "./common/i18n"; // 文字国际化

import * as utils from "./common/js/blogUtils"; // 公共库
import api from "./common/api"; // 公共请求/接口

import iview from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iview);
// Vue.config.productionTip = false
/* eslint-disable no-new */
window.bus = new Vue(); //非父子传值中间件
Vue.prototype.$utils = utils; // 工具类
Vue.prototype.$api = api; // 公共请求
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
