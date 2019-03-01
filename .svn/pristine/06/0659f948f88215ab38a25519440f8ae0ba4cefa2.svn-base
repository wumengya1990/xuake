<template>
<div>
  <!--头部开始-->
  <div class="userTop">
      <a class="changePeo" @click="loginOut"><i class="icon iconfont icon-zhuxiao"></i></a>
      <div class="userMes">
        <div class="portrait">
          <img :src="touxImg">
        </div>
        <h4>{{userModule.realName}}</h4>
        <!--<p>zhangyang123</p>-->
      </div>

    </div>
  <!--头部结束-->
</div>
</template>
<script>
  import store from '../vuex/store';
  import User from '../../../mixins/user';
  import {mapState} from 'vuex';
  const axiosConfig = require('../../../../static/conf/axios.conf');
  const baseurl = axiosConfig.getBaseUrl();
  import toux_Img from '../images/touxiang.png';
  export default {
    components: {

    },
    name: "wechartHead",
    mixins: [User],
    data() {
      return {
        user:{},
        touxImg:toux_Img
      }
    },
     created() {
     this.touxImg = baseurl+this.touxImg;
     this.findUserInfo();
    },
    computed: {
      ...mapState(['userModule'])
    },
    methods: {

       loginOut(){
         this.deleteCookie("token");
         this.$router.push({
                name:"Login"
         });
         layer.msg("用户已注销");
       },
       deleteCookie(name){
              var date=new Date();
              date.setTime(date.getTime()-10000);
              document.cookie=name+"=; expire="+date.toGMTString();
      },
      versionDes(){
       this.$router.push({
                name:"versionDes"
         });

      }

    }

  }

</script>
