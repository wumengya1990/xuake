import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from '../views/Layout';
import LoginView from '../views/login';
import SetUp from '../views/setUp';
import indexPage from '../views/indexPage';
import setUpClass from '../views/setUpClass';
import setUpRestrict from '../views/setUpRestrict';
import LookForResult from '../views/lookForResult';
import Login from  '../login';
import CourseListStatics  from  '../views/courseStatics'
import CourseClassStatics  from  '../views/courseClassStatics'
import stuIndexPage from  '../views/stuIndexPage'
import studentAdjust from '../views/studentAdjust'
import versionDes  from  '../views/version'
import noDatePage  from  '../views/noDatePage'
import noAuthority  from  '../views/noAuthority'
import adminSet  from  '../views/adminSet'
import adminChoWork  from  '../views/adminChoWork'

export default new Router({
  routes: [{
    path: '/',
    redirect: {
      name: 'IndexPage1'
    }
  },
    {
      path: '/',
      component: LoginView,
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
    },
    {
      path: '/',
      component: Layout,
      children: [

        //首页
        {
          path: '/indexPage',
          name:'IndexPage1',
          components: {
            indexpage: indexPage
          }
        },
        //管理员设置
        {
          path: '/adminSet',
          name:'adminSet',
          components: {
            adminSet: adminSet
          }
        },
        //设置选课课程
        {
          path: '/setUp/:setTaskId/:setStatus',
          name:'SetUp',
          components: {
            setup: SetUp
          }
        },
        //设置参与班级
        {
          path: '/setUpClass/:setTaskId/:setStatus',
          name:'SetUpClass',
          components: {
            setupclass: setUpClass
          }
        },
        //设置限制条件
        {
          path: '/setUpRestrict/:setTaskId/:setStatus',
          name:'SetUpRestrict',
          components: {
            setuprestrict: setUpRestrict
          }
        },
        //选课任务查看结果
        {
          path: '/lookResult/:looktaskId',
          name:'LookResult',
          components: {
            lookForResult: LookForResult
          }
        },
        //选课任务查看结果
        {
          path: '/coursestatics/:myTaskId',
          name:'CourseStatics',
          components: {
            courseListStatics: CourseListStatics
          }
        },
        //统计：按班级查看
        {
          path: '/courseclassstatics/:clstTaskId',
          name:'CourseClassStatics',
          components: {
            classStatics: CourseClassStatics
          }
        },
        {
          path: '/stuIndexPage',
          name:'stuIndexPage',
          components: {
            stuIndexPage: stuIndexPage
          }
        },
        {
          path: '/studentAdjust/:taskId',
          name:'studentAdjust',
          components: {
            studentAdjust: studentAdjust
          }
        },
        {
          path: '/versiondes',
          name:'versionDes',
          components: {
            verDes: versionDes
          }
        },
        {
          path: '/noDatePage',
          name:'noDatePage',
          components: {
            noDatePage: noDatePage
          }
        },
        {
          path: '/noAuthority',
          name:'noAuthority',
          components: {
            noAuthority: noAuthority
          }
        },
        {
          path: '/adminChoWork',
          name:'adminChoWork',
          components: {
            adminChoWork: adminChoWork
          }
        }

      ]
    }]
});
