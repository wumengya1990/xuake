/*!
 * Title: 状态管理
 * Description:
 * author: 白超
 * date: 2017/12/20
 * version: v1.0
 */
import Vue from 'vue';
import Vuex from 'vuex';

import {MODULE_USER} from '../../../vuex-modules/user-store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userModule: MODULE_USER

  },
  state:{
    ucId:0,
    haslogin:false
    
  },
  mutations:{
    saveUcId(state, data) {
      state.ucId = data;
      window.localStorage.setItem("ucId", data); //就是这里，保存到了 localStorage 中
      // console.log("api写入Store与localStorage中：" + data);
    },
    saveLogin(state, data) {
      state.haslogin = data;
      window.localStorage.setItem("haslogin", data); //就是这里，保存到了 localStorage 中
      // console.log("api写入Store与localStorage中：" + data);
    },
  }
});
