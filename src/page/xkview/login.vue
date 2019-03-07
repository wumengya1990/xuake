<template>
  <div id="hwui" @keypress="enterLogin">
    <h3 class="loginTitle"><span style="margin-left:80px;">网上选课系统</span></h3>
    <div style="background-color:#01aefa;height:500px;" >
      <div style="width:1100px;margin:0px auto;">
        <!-- 图片开始 -->
        <div class="loginBanner lfloat">
         <img :src="loginImg"/>
        </div>
        <!--图片结束-->
        <!--登录开始-->
        <div class="m_login_div rfloat" :style="{background:'url('+loginBg+')'}">
          <div class="online" :style="{background:'url('+titleIconBg+') 15px no-repeat #008DCA'}"><em>用户登录</em><span>USER LOGIN</span></div>
          <div class="m_login">
            <ul>
              <li>
                <div class="shuruk">
                  <em class="user" :style="{background:'url('+user03Bg+') no-repeat scroll center center'}"></em>
                  <input v-model="loginName" class="shuru yh1" type="text" placeholder="用户名" />
                </div>
              </li>
              <li>
                <div class="shuruk">
                  <em class="password" :style="{background:'url('+passwordBg+') no-repeat scroll center center'}"></em>
                  <input v-model="password" class="shuru mm2" type="password" placeholder="密码"  />
                </div>
              </li>
              <li>
                <a href="javascript:void(0)" >忘记密码?</a>
              </li>
            </ul>
            <input @click="firstLogin"  class="tijiao" type="button" value="登录" />
          </div>
          <div class="errorPrompt ellipsis">{{msg}}</div>
          <div class="loginCopy" style="display: none">
            技术支持：徐州华网科技有限公司<br />
            服务热线：400-0516-885
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">建议使用360浏览器（极速模式）或<a href="http://rj.baidu.com/soft/detail/14744.html?ald" target="_blank">谷歌浏览器</a>访问本站。<br />最低分辨率为：1366*768</div>
  </div>


</template>
<script>
import "./css/loginmini.css"
import login_Img from './images/login/loginImg.jpg';
import login_Bg  from  './images/login/loginBg.png';
import user03_Bg  from  './images/login/user_03.png';
import password_Bg  from  './images/login/mima_03.png';
import titleIcon_Bg  from  './images/login/titleIcon.png';
import './js/jquery-1.11.3.min.js'
const axiosConfig = require('../../../static/conf/axios.conf');
const baseURL = axiosConfig.getBaseUrl();//axios 全局设置
  export default {
    components: {

    },
    name: "Login",
    data() {
      return {
        sys_name:'',
        loginName:'',
        password:'',
        msg:'',
        loginImg:login_Img,
        loginBg:login_Bg,
        user03Bg:user03_Bg,
        passwordBg:password_Bg,
        titleIconBg:titleIcon_Bg,
        uId:"",
        ucId:"",
        serUrl:""
      }
    },
    computed: {
    },
    created(){
      this.loginImg = baseURL + this.loginImg;
      this.loginBg =  baseURL + this.loginBg;
      this.user03Bg = baseURL + this.user03Bg;
      this.passwordBg = baseURL + this.passwordBg;
      this.titleIconBg = baseURL + this.titleIconBg;
    },
    methods: {
      enterLogin(){
            var keyCode = window.event.keyCode;
            if(keyCode == 13){
               this.firstLogin();
            }
      },
      firstLogin(){
        let that = this;
        if(that.loginName == ''){
          that.msg = '请填写登录名';
          return;
        }
        if(that.password == ''){
          that.msg = '请填写密码';
          return;
        }
        that.$ajax.get('firstLogin',{params:{
          loginType:'pc',
          username:that.loginName,
          password:that.password
          }})
          .then((response)=>{
            // console.log(response);
           if(response.data.emsg==""){
           that.serUrl = response.data.serUrl;
           that.ucId = response.data.uId;
           that.centerLogin();

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
        let that = this;
           $.ajax({
                type: "get",
                timeout: 10000, //超时时间设置，单位毫秒
                url: that.serUrl,
                data:{

                },
                dataType: "jsonp",
                jsonp: "callback",
                success:(response)=> {
                  console.log(response);
                if(response.flag){
                   that.uId = that.ucId;
                   that.doLogin();
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
        let that = this;
        that.$ajax.get('login',{params:{
             uId:that.uId,
             loginType:'pc'
          }})
          .then((response)=>{
            // console.log(response);
            var ms = response.data.resultInfo.message;
            if(ms=="success"&&response.status==200){
              var newType = "";
              var newType = response.data.records.userType;
              if(newType!=undefined&&newType!='undefined'){
                if(newType!=""&&newType!=null&&newType=='Student'){
                          layer.msg("登录成功，欢迎使用本系统！");
                          that.$router.push({
                          name:"stuIndexPage"
                          });
                   }else{
                         layer.msg("登录成功，欢迎使用本系统！");
                         that.$router.push({
                          name:"IndexPage1"
                         });
                   }
              }else{
                layer.msg(response.data.records.msg);
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
<style scoped>

</style>
