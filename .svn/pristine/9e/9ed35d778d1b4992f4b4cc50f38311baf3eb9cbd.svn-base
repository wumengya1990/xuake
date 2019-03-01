<template>

  <div id="hwui">

  <div class="main_div">
    <h2 class="step_title fc_blue1">版本更新说明</h2>
      <div class="pad_a10 overflow_y" style="max-height:500px;">
         <div class="version_title"><font color="red">V1.7_20180920</font></div> 
          <ol class="version_ol">
              <li>对API做了保护，所有涉及到修改、删除、新增的接口，都做了权限上的校验</li>
              <li>对前端传到后端的数据全部做了校验</li>
              <li>修改学生页面选课后选课详情页面看不到退选按钮的问题</li>
              <li>管理端看不到选课任务状态的问题</li>
              <li>创建任务时开始时间不能早于当前时间</li>   
              <li>选课任务的课程删除后，学生选课也要级联删除</li>   
          </ol>
        <div class="version_title"><font color="red">V1.6_20180717</font></div> 
          <ol class="version_ol">
              <li>增加登录页面输入登录名，密码后支持Enter键登录功能</li>
              <li>优化移动端，选课任务未开始不支持学生选课功能</li>
              <li>优化课程简介为空时，前端报错</li>
              <li>添加系统在线帮助，版本说明增加历史版本</li>
              <li>增加用户中心</li>   
          </ol>
          <div class="version_title"><font color="red">V1.5_20180713</font></div> 
          <ol class="version_ol">
              <li>学生调整页面、查看结果-未选课学生添加数据加载提示</li>
              <li>优化学生调整页面，点击调整按钮时优化调整页面样式</li>
              <li>优化课程简介为空时，前端报错</li>
              <li>学生移动端和PC端,老师PC端,无数据,添加暂无选课任务图片</li>
              <li>优化修改从用户中心单点登录，刷新页面，跳到显示admin登录</li>   
          </ol>
        <div class="version_title"><font color="red">V1.4_20180710</font></div>
          <ol class="version_ol">
              <li>优化课程简介限制字数300</li>
              <li>优化课程简介图片编辑，当未添加图片时，去掉默认背景框</li>
              <li>优化课程简介为空时，前端报错</li>
              <li>学生移动端和PC端,老师PC端,无数据,添加暂无选课任务图片</li>
              <li>优化修改从用户中心单点登录，刷新页面，跳到显示admin登录</li>   
          </ol>   
      
     
           <br/><br/>
          <p>若有问题，请联系客服。</p>
          <p>版本在优化过程中，不可避免会有疏忽遗漏，请大家批评、纠正，给出宝贵意见。让系统更好的为您服务；</p>
      </div>
  </div>
  <button class="button" @click="goback()">返回</button>
  </div>
</template>



<script>



  import  "../js/style.js";

  import User from '../../../mixins/user';
  export default {
    components: {

    },
    name: "versionDes",

    mixins: [User],

    data() {
      return {
     
      }
    },

    computed: {
    },
    created(){

    },
    watch:{
      
    },
    methods: {
     goback(){
      this.$router.go(-1);//返回上一层
      }
    }
  }

</script>

<style scoped>
.button {
    background-color: #2199ED; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-left:50%;
    border-radius:5px;
}
</style>




