<template>
  <div>
<!--右侧开始-->
<div class="hwui-right hwui-hidden">
  <div class="hwui-fold-btn" onclick="foldDo(this)"></div>
  <div class="hwui-crumbs-main">
    <div class="hwui-l-float">
      <a @click = "toIndexPage()">首页</a>
            <span>
							<em class="hwui-plr10">&gt;</em>
							<a href="#">结果查看（按课程查看）</a>
						</span>
    </div>
    <div class='hwui-r-float'><a @click='goback()'>返回</a></div>
  </div>

  <div class="stepLinkList">
    <a @click = "toCoursePersStatics()">选课人数统计</a>
    <a class="on" >按课程查看</a>
    <a @click = "toCourseClassStatics()">按班级查看</a>
    <div class="hwui-clra"></div>
  </div>

  <div id="panel-main" class="hwui-right-content" style="border:none;top:55px;left:20px; right: 20px; bottom:20px;overflow:auto" title="">
    <!--筛选条件开始-->
    <div class="hwui-search-bar">
      <div class="leftScreen">
        <span v-for = "(v,i) in taskCourses" :class="{ on: isActive==i }" @click="showOn(i,v.id)"  v-model = "v.id">{{v.courseName}}</span>
        <!--:class="on"-->
      </div>

      <div class="hwui-r-float">
        <input type="button" @click="exportCsExecl()" class="hwui-btn hwui-btn-submit" value="导出课程" />
      </div>
      <div class="clra"></div>
    </div>
    <!--筛选条件结束-->
    <div id="panel-sub" class="easyui-panel" style="border:none;" title="">


      <div id="dataTable" class="dataTable">
        <el-table :data="courseStudents" border class="dadadada" height="600px" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="courseName" label="课程名称"></el-table-column>
          <el-table-column prop="realName" label="姓名"></el-table-column>
          <el-table-column prop="loginName" label="学号"></el-table-column>
          <el-table-column prop="SEX" label="性别"></el-table-column>
          <el-table-column prop="gradeName" label="年级"></el-table-column>
          <el-table-column prop="className" label="班级"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</div>
<!--右侧结束-->
    <!--列表批量处理工具条开始-->
    <div class="hwui-list-tools">
      <input type="button" value="删除" class="hwui-btn hwui-btn-mini hwui-btn-delete"/>
    </div>
    <!--列表批量处理工具条结束-->
    <div class="hwui-layer-mask"></div>

    <!--列表详情开始-->
    <div id="layerView" class="hwui-layer" :style="{right:-layerWidth,width:layerWidth}">
      <div class="ld-title">
        <h3>课程详情</h3>
        <i class="hwui hwuifont hwui-shanchu ldt-close" onclick="layerClose($('#layerView'))"></i>
      </div>
      <div class="ld-content hwui-v-scroll">
        <div class="hwui-pa10 hwui-hidden">
          <ul class="hwui-form">
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">课程图片：</em>
              <div class="hf-right hwui-hidden">
                <div class="activityImg">
                  <img src="../images/hdImg.jpg">
                </div>
              </div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">课程名称：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1">足球兴趣小组</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">任课教师：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1">李文强</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">上课时间：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1">星期四第七节课</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">限选人数：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1">50</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">已选人数：</em>
              <div class="hf-right hwui-wordwrap">41</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">课程简介：</em>
              <div class="hf-right hwui-hidden">课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容课程简介内容</div>
            </li>
          </ul>
        </div>
        <div class="tcBottomFill">

        </div>
      </div>
    </div>
    <!--列表详情结束-->


  </div></template>
<script>
  import  "../js/style.js";
  import {mapState} from 'vuex';
  import {GMTToStr} from "../js/common.js";
  import User from '../../../mixins/user';

  export default {
    components: {

    },
    name: "CourseListStatics",
    mixins: [User],
    data() {
      return {
        layerWidth:"60%",
        taskid:"",
        isActive:0,
        taskCourses:[],
        courseStudents:[],
        tableData3: [],
        form: {
          name: '',
          region: '',
          region1: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    computed: {
      ...mapState(['userModule'])
    },
    created(){
     this.router_intercep();//前端路由拦截
     this.task_Course();
    },
    methods: {
       router_intercep(){
       if(window.user_Over_Type=='Student'){
          layer.msg("不符合操作");
           this.$router.push({
                 name:"stuIndexPage"
           }); 
       }
      },
      login() {
        Ajax.post(LOGIN.login, {username: '开发者', password: '1024'})
          .success('登录成功', data => {
            //登录成功,获取用户信息
          });
      },
      goback(){
      this.$router.go(-1);//返回上一层
      },
      toCourseClassStatics(){
        this.$router.push({
          name:"CourseClassStatics",
          params: { clstTaskId: this.taskid }
        });
      },
      toCoursePersStatics(){
        this.$router.push({
          name:"LookResult",
          params: { looktaskId: this.taskid }
        });
      },
      task_Course(){
        if(this.$route.params.myTaskId!=undefined&&this.$route.params.myTaskId!='undefined'){

          this.taskid = this.$route.params.myTaskId;
        }
        this.$ajax.get('task/selectTaskContainsCourse',{params:{
          taskId:this.taskid
          }})
          .then((response)=>{
            if(response.data.length>0){
              this.taskCourses= response.data;
              this.selectFirstCourseList(this.taskCourses[0].id);
            }
          })
          .catch(function (error) {
            console.log(error);
          });


      },
      showOn(i,cid){
       this.courseStudents =[];
        this.isActive = i;
        this.selectFirstCourseList(cid);
      },
      selectFirstCourseList(cid){
        this.$ajax.get('task/selectTaskContainsStudents',{params:{
          cId:cid
        }})
          .then((response)=>{
            if(response.data.length>0){
              this.courseStudents = response.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      toIndexPage(){
         this.$router.push({
                name:"IndexPage1"
         });
      },
      exportCsExecl(){
        var params = new URLSearchParams();
        params.append('courseStudents', JSON.stringify(this.courseStudents));
        this.$ajax.post('task/exportCsExecl',params)
          .then((response)=>{
           if(response.data!=""&&response.data!=null){
            window.location.href = decodeURI(decodeURI(response.data));
           }else{
             layer.msg("抱歉，无数据导出！");
           }
         
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    }

  }
</script>
