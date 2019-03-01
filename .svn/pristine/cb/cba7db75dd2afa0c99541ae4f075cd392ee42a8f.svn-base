import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from '../views/Layout.vue';
import LayoutLog from '../views/LayoutLog.vue';
import Default from '../views/Default.vue';
import Logout from '../views/Logout.vue';
// 首页
import Home from '../views/Home.vue';
//选课
import ClassCho from '../views/classCho.vue';
import SunjectDetails from '../views/sunjectDetails.vue';
import Login from '../views/login.vue';
export default new Router({
  routes: [{
    path: '/',
    redirect: {name: 'Home'}
  }, {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [{
      path: '/home',
      components: {
        default:Default,
        logout:Logout
      },
      children: [{
        path: '/home', // 首页
        name: 'Home',
        component: Home
      },
        {
          path: '/classCho/:taskId/:startTime/:overTime', //选课
          name: 'classCho',
          component: ClassCho
        },
        {
          path: '/sunjectDetails/:cid/:startTime/:overTime',//选课
          name: 'sunjectDetails',
          component: SunjectDetails
        }]
    }]
  },
    {
      path: '/',
      component: LayoutLog,
      children: [
        //登录页
        {
          path: '/login',
          name:'Login',
          components: {
            login: Login
          }
        }
      ]
    }
  ]
});
