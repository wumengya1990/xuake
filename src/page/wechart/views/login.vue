<template>
  <div class="loginMain">
  <div class="Logo">
    <img :src="logo02" alt=""/>
    <!--<p>Online Course Selection</p>-->
  </div>

  <div class="LoginBox">
    <ul>
     <li><input v-model="loginName" type="text" placeholder="用户名" /></li>
     <li><input v-model="password" type="password" placeholder="密码" /></li>
   </ul>
  <div class="bts"><input @click="firstLogin" class="bt1" type="button" value="登录"> </div>
  </div>
  </div>
</template>

<script type="text/javascript">
  import "../js/style"
  import "../js/jquery-1.11.3.min";
  const axiosConfig = require('../../../../static/conf/axios.conf');
  const baseurl = axiosConfig.getBaseUrl();
  import logo_02 from '../images/logo_02.png';
  export default {
    data(){
      return {
        loginName:'',
        password:'',
        uId:"",
        ucId:"",
        serUrl:"",
        logo02:logo_02

      }
    },
  name: "login",
  created() {
  this.logo02 = baseurl + this.logo02;
  },
    methods: {
       firstLogin(){
        if(this.loginName == ''){
          layer.msg("请填写登录名")
          return;
        }
        if(this.password == ''){
          layer.msg('请填写密码');
          return;
        }
        this.$ajax.get('firstLogin',{params:{
          loginType:'mobile',
          username:this.loginName,
          password:this.password
          }})
          .then((response)=>{
           if(response.data.emsg==""){
           this.serUrl = response.data.serUrl;
           this.ucId = response.data.uId;
           this.centerLogin();

           }else{
            layer.msg(response.data.emsg);
            return;
           }
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      centerLogin(){ 
           $.ajax({
                type: "get",
                timeout: 10000, //超时时间设置，单位毫秒
                url: this.serUrl,
                data:{

                },
                dataType: "jsonp",
                jsonp: "callback",
                success:(response)=> {
                if(response.flag){
                   this.uId = this.ucId;
                   this.doLogin();
                }else{
                  layer.msg(response.msg);
                  return;
                }
            
                },
                error: (ex)=> {
                    console.log(ex);
                },
                complete: ()=>{
                   
                }
            });
      },
      doLogin(){

        this.$ajax.get('login',{params:{
             uId:this.uId,
             loginType:'mobile'
        }})
          .then((response)=>{
          debugger
            var ms = response.data.resultInfo.message;
            if(ms=="success"&&response.status==200){
              var userType = response.data.records.userType;

              if(userType!=""&&userType!=null&&userType=='Student') {
                layer.msg("登录成功，欢迎使用本系统！");
                this.$router.push({
                  name: "Home"
                });
              }else {
                layer.msg('仅学生可登录');
                return;
              }
            }else{
              layer.msg(ms);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }

}
</script>
