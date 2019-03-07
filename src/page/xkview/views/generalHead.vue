<template>
<div>
  <!--头部开始-->
  <div class="hwui-header">
    <h3 class="hwui-logo hwui-l-float">
      <div class="l-txt">选课系统</div>
    </h3>
    <div class="hwui-nav hwui-l-float">
      <ul>
        <li class="n-li hwui-ease-in-out on" >选课首页</li>
      </ul>
    </div>
    <div class="hwui-header-tools hwui-r-float">
      <div class="ht-user" style="width:100px;">
        <img :src="logopic" class="ht-face hwui-radius-all">
        <div class="hwui-ellipsis"><span :title="userModule.realName">{{userModule.realName}}</span></div>
        <div class="ht-user-menu border-box">
          <a @click="openNewWin('http://wiki.hwxxkj.com:8089/docs/show/314')">在线帮助</a>
          <a @click="versionDes()">版本说明</a>
          <a href="http://192.168.0.112:7890/UcMain/Index">用户中心</a>
          <a @click="loginOut()">注销</a>
        </div>
      </div>
    </div>
  </div>
  <!--头部结束-->
</div>
</template>
<script>
  import User from '../../../mixins/user';
  import {mapState} from 'vuex';
  import store from '../vuex/store';
  const axiosConfig = require('../../../../static/conf/axios.conf');
  const baseurl = axiosConfig.getBaseUrl();
  import logo_pic from '../../../../static/images/logo.png'
  export default {
    components: {

    },
    name: "generalHead",
    store,
    mixins: [User],
    data() {
      return {
        user:{},
        logopic:logo_pic
      };
    },
    created(){
    this.logopic = baseurl + this.logopic;
     this.findUserInfo();
    },
    computed: {
      ...mapState(['userModule'])
    },
    methods: {

       loginOut(){
         this.deleteCookie();
         this.$ajax.get('view/loginOut',{params:{
          }})
          .then((response)=>{
             this.$store.commit("saveLogin", false); //保存 保存状态
            this.$store.commit("saveUcId", 0);
            this.$router.push({
                name:"Login"
           });
           layer.msg("注销成功");
          })
          .catch(function (error) {
            console.log(error);
          });
       },
       openNewWin(url){
       window.open(url);
       },
       deleteCookie(name){

        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if(keys) {
          for(var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }

      },
      versionDes(){
       this.$router.push({
                name:"versionDes"
         });

      }

    }

  }

</script>
