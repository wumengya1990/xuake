<!--布局-->
<!--这里是一种示例,根据自己实际情况自己设计页面布局,这里只做参考-->
<template>
  <div>
    <!--页面头部-->
    <generalHead></generalHead>
    <!--首页-->
    <router-view  name="indexpage"></router-view>
    <!--首页-->
    <router-view  name="adminSet"></router-view>
    <!--选课设置-->
    <router-view  name="setup"></router-view>
    <!--选课班级-->
    <router-view  name="setupclass"></router-view>
    <!--限制条件-->
    <router-view  name="setuprestrict"></router-view>
    <!--查看选课结果-->
    <router-view  name="lookForResult"></router-view>
    <!-- 学生首页 -->
    <router-view  name="stuIndexPage"></router-view>
    <!-- 学生调整 -->
    <router-view  name="studentAdjust"></router-view>
    <!--统计：按课程查看结果-->
    <router-view  name="courseListStatics"></router-view>
    <!--统计：按课班级查看结果-->
    <router-view  name="classStatics"></router-view>
    <!-- 手机端学生登陆 -->
    <router-view  name="loginPage"></router-view>
    <!-- 版本说明 -->
    <router-view  name="verDes"></router-view>
    <!-- 缺省页面-->
    <router-view  name="noDatePage"></router-view>
    <!-- 无权限页面-->
    <router-view  name="noAuthority"></router-view>
    <!-- 缺省页面-->
    <router-view  name="adminChoWork"></router-view>

  </div>
</template>

<script>

  /*模块全局配置,用于参考*/

  import axios from 'axios';//引入axios

  const axiosConfig = require('../../../../static/conf/axios.conf');
  axios.defaults.baseURL = axiosConfig.getBaseUrl();//axios 全局设置
  window.projectConf = require('../../../../static/conf/project.conf');//全局项目配置

  const EventEmitter = require('events');//全局事件对象
  window.events = new EventEmitter();
  window.events.setMaxListeners(100);//设置最大监听数

  //从utils中导出一些对象
  import {Ajax, Message, Confirm, Parser, Alert, isInTo, timeStringToStamp, isEmpty, uuid} from '../../../utils/utils';

  //导出本模块需要的url对象
  import {DEMO} from '../../../../static/urls/demo';
  import {LOGIN} from '../../../../static/urls/login';

  //将一些常用工具注册到window对象上,方便模块中任何地方随时调用
  Object.assign(window, {
    Ajax: Ajax,//通用Ajax
    Parser: Parser,//解析器
    Message: Message,//通用消息提示
    Confirm: Confirm,//通用询问框
    Alert: Alert,//通用弹出框
    DEMO: DEMO,//请求
    LOGIN: LOGIN,//请求
    Fun: {//通用函数
      isInTo: isInTo,
      timeStringToStamp: timeStringToStamp,
      isEmpty: isEmpty,
      uuid: uuid
    }
  });


  //全局注册一些第三方组件,这里以element-ui举例

  import Vue from 'vue';
  import {Button} from 'element-ui';

  Vue.component(Button.name, Button);

  //注入vuex 状态管理
  import store from '../vuex/store';
  //使用混合
  import User from '../../../mixins/user';
  import generalHead from './generalHead';
  export default {
    components: {
      generalHead
    },
    name: "layout",

    store,

    mixins: [User],

    created() {
      this.findUserInfo();
    }

  }
</script>
