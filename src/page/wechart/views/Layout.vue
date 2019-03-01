<!--布局-->
<!--这里是一种示例,根据自己实际情况自己设计页面布局,这里只做参考-->
<template>
  <div>
    <!-- 手机端学生登陆 -->
    <wechartHead></wechartHead>
    <router-view  name="default"></router-view>
    <router-view  name="logout"></router-view>
  </div>
</template>

<script>

  /*模块全局配置,用于参考*/

  import axios from 'axios';//引入axios
  import wechartHead from './wechartHead';

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

  //导入一些自定义样式
  import '../../../../static/demo/css/fonts/iconfont.css';
  import '../../../../static/demo/css/projectFont/iconfont.css';
  import '../../../../static/demo/css/common.css';
  import '../../../../static/demo/css/default/default.css';
  import '../../../../static/demo/css/main.css';

  //全局注册一些第三方组件,这里以element-ui举例

  import Vue from 'vue';
  import {Button} from 'element-ui';
  //注入vuex 状态管理
  import store from '../vuex/store';
  import User from '../../../mixins/user';
  Vue.component(Button.name, Button);

  export default {
    name: "layout",
    store,
    data() {
      return {
        
       
      }
    },
    components: {
      wechartHead
    },
    mixins: [User],
    created() {
     
     this.findUserInfo();
    }

  }
</script>
