
import {mapState} from 'vuex';

export default {

  computed: {
    ...mapState(['userModule'])
  },
  methods: {
    findUserInfo() {
      let that = this;
      that.$ajax.get('/findUserInfo',{params:{}})
          .then((response)=>{
            // console.log(response);
            if (response.data.record!=null) {
              Object.assign(that.userModule, {
              isLogin: true,
              bigHeaderImg:response.data.record.bigHeaderImg,//大头像
              middleHeaderImg:response.data.record.middleHeaderImg,//中头像
              smallHeaderImg:response.data.record.smallHeaderImg,
              phone:response.data.record.phone,//手机号
              userId:response.data.record.id,
              ucId:response.data.record.ucId,
              status:response.data.record.status,//用户状态
              type:response.data.record.type,//用户类型
              isSchoolManager:response.data.record.isSchoolManager, //是否是学校管理员
              loginName:response.data.record.loginName,
              post:response.data.record.post,//职位
              schoolName:response.data.record.schoolName,
              realName:response.data.record.realName,
              sex:response.data.record.sex,
              orgId:response.data.record.orgId,
              demo:response.data.record.demo==null||response.data.record.demo==undefined||response.data.record.demo=='undefined'?"":response.data.record.demo
              });
              //定义全局变量
              if(that.userModule.type!=''&&that.userModule.type!='undefined'&&that.userModule.type!=undefined){
                  window.user_Over_Type = that.userModule.type;
              }
              if(that.userModule.type=='Student'&&that.userModule.demo=='pc'){
                that.$router.push({
                 name:"stuIndexPage"
                  });
              };
              if(that.userModule.type=='Teacher'&&that.userModule.demo=='pc'){
                if(that.userModule.isSchoolManager){
                  that.$router.push({
                    name:"adminSet"
                     });
                }else{
                  that.$router.push({
                    name:"IndexPage1"
                     });

                }
                
              };
             
            }else{

             layer.msg("用户没有登录");
             that.$router.push({
                name:"Login"
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }
}
