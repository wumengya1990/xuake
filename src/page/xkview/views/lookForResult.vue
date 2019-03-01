<template>
  <div>
    <div class="hwui-crumbs-main">
      <div class="hwui-l-float">
        <a @click = "toIndexPage()">首页</a>
        <span>
							<em class="hwui-plr10">&gt;</em>
							<a href="#">结果查看（选课人数统计）</a>
						</span>
      </div>
      <div class='hwui-r-float'><a @click='goback()'>返回</a></div>
    </div>
    <div class="stepLinkList" style="margin-top:61px;">
      <a class="on" >选课人数统计</a>
      <a  @click = "toCourseStatics()">按课程查看</a>
      <a @click = "toCourseClassStatics()">按班级查看</a>
      <div class="hwui-clra"></div>
    </div>
    <div id="panel-main" class="hwui-right-content" style="border:none;top:120px;left:20px; right: 20px; bottom:20px;" title="">
      <!--筛选条件开始-->
      <div class="hwui-search-bar">
        <div class="leftStatistics">
          <p>限选课程数量：<em>{{limitnums}}</em></p>
          <p>参与人数：<em>{{joinnums}}</em></p>
          <p>已选课学生：<em>{{havejoinnum}}</em></p>
          <p>未选课学生：<a @click="notChooseStu()">{{notjoinnum}}</a></p>
        </div>
        <div class="clra"></div>
      </div>
      <!--筛选条件结束-->
      <div id="panel-sub" class="easyui-panel" style="border:none;" title="">


        <div id="dataTable" class="dataTable" style="position: fixed; left: 20px; right: 20px; top: 155px; bottom: 20px; margin: auto;">
          <el-table :data="tableData3" border class="dadadada" height="100%" style="width: 100%;">
            <el-table-column prop="courseName" label="课程名称"></el-table-column>
            <el-table-column prop="teacherName" label="任课老师"></el-table-column>
            <el-table-column prop="courseTime" label="上课时间"></el-table-column>
             <el-table-column prop="COURSE_SECTION" label="上课节次"></el-table-column>
            <el-table-column prop="CLASSROOM" label="上课教室"></el-table-column>
            <el-table-column prop="cnums" label="选课人数"></el-table-column>
            <el-table-column prop="limitNums" label="限选人数"></el-table-column>
            <el-table-column fixed="right" prop="operation" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="lookDetail(scope.row.id)" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!--列表批量处理工具条开始-->
    <div class="hwui-list-tools">
      <input type="button" value="删除" class="hwui-btn hwui-btn-mini hwui-btn-delete"/>
    </div>
    <!--列表批量处理工具条结束-->

    <div class="hwui-layer-mask"></div>
    <!--列表编辑开始-->
    <div id="layerEdit" class="hwui-layer" :style="{right:-layerWidth,width:layerWidth}">
      <div class="ld-title">
        <h3>未选课学生</h3>
        <i class="hwui hwuifont hwui-shanchu ldt-close" @click="closeNotLayer()"></i>
      </div>

      <!--筛选条件开始-->
      <div class="hwui-search-bar tcSeacherBar">

        <ul class="hwui-search hwui-l-float">
          <li class="pl">年级：</li>
          <li>
            <select v-model ="gradeId" @change="selectTaskClass()" class="hwui-select hwui-h hwui-w-mini hwui-radius2">
              <option value="">全部</option>
              <option v-for="v in gradeList" :value="v.gradeId">{{v.gradeName}}</option>

            </select>
          </li>
          <li class="pl">班级：</li>
          <li>
            <select v-model="classId" @change="changeClassSelectNot()"  class="hwui-select hwui-h hwui-w-mini hwui-radius2">
              <option value="">全部</option>
              <option v-for="v in classList" :value="v.classId">{{v.className}}</option>
            </select>
          </li>
        </ul>

        <div class="hwui-r-float">
          <input type="button" @click="exportStuNotHave()" class="hwui-btn hwui-btn-submit" value="导出" />
        </div>
        <div class="clra"></div>
      </div>
      <!--筛选条件结束-->

      <div id="tcTable" class="tcTable">
        <el-table  :data="taskNotList" border class="dadadada" style="width: 100%">
          <el-table-column prop="realName" label="姓名"></el-table-column>
          <el-table-column prop="loginName" label="学号"></el-table-column>
          <el-table-column prop="SEX" label="性别"></el-table-column>
          <el-table-column prop="grade_name" label="年级"></el-table-column>
          <el-table-column prop="class_name" label="班级"></el-table-column>
        </el-table>
      </div>

    </div>
    <!--列表编辑结束-->
    <!--列表详情开始-->
    <div id="layerView" class="hwui-layer" :style="{right:-layerWidth,width:layerWidth}">
      <div class="ld-title">
        <h3>课程详情</h3>
        <i class="hwui hwuifont hwui-shanchu ldt-close" @click="layerCloseDetail()"></i>
      </div>
      <div class="ld-content hwui-v-scroll">
        <div class="hwui-pa10 hwui-hidden">
          <ul class="hwui-form">
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">课程图片：</em>
              <div class="hf-right hwui-hidden">
                <div class="activityImg">
                  <img :src="courseImg">
                </div>
              </div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">课程名称：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1">{{courseName}}</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">任课教师：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1">{{teacherName}}</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">上课时间：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1">{{courseTime}}&nbsp;&nbsp;{{courseSec}}</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">上课教室：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1">{{couClassRoom}}</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">限选人数：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1">{{limitCourseNums}}</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">已选人数：</em>
              <div class="hf-right hwui-wordwrap">{{HaveCourseNums}}</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">课程简介：</em>
              <div class="hf-right hwui-hidden">{{intro}}</div>
            </li>
          </ul>
        </div>
        <div class="tcBottomFill">

        </div>
      </div>

      <div class="ld-content-btn">
        <input type="button" class="hwui-btn hwui-btn-close" @click="layerCloseDetail()" value="确定" />

      </div>
    </div>
    <!--列表详情结束-->
  </div>
</template>
<script>
  import  "../js/style.js";
  import {mapState} from 'vuex';
  import {GMTToStr} from "../js/common.js";
  import User from '../../../mixins/user';

  export default {
    components: {

    },
    name: "lookForResult",
    mixins: [User],
    data() {
      return {
        taskid:"",
        limitnums:"",
        joinnums:"",
        havejoinnum:"",
        notjoinnum:"",
        layerWidth:"60%",
        tableData3: [],
        courseImg:"",
        courseName:"",
        teacherName:"",
        teacherId:"",
        courseTime:"",
        courseSec:"",
        couClassRoom:"",
        limitCourseNums:"",
        HaveCourseNums:"",
        intro:"",
        groupIdStr:"",
        couId:"",
        isOrNotShow:"",
        gradeId:"",
        classId:"",
        gradeList:[],
        classList:[],
        taskNotList:[]

      }
    },
    computed: {
      ...mapState(['userModule'])
    },
    created(){
      this.router_intercep();//前端路由拦截
      this.selectTaskPers();
      this.selectTaskCourList();
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
      selectTaskPers(){
        this.taskid = this.$route.params.looktaskId;
        this.$ajax.get('task/selectTaskPers',{params:{
             taskId:this.taskid
          }})
          .then((response)=>{
             this.limitnums = response.data.limitnums;
             this.joinnums = response.data.jpnums;
             this.havejoinnum = response.data.hnums;
             this.notjoinnum = response.data.notnums;
          })
          .catch(function (error) {
            console.log(error);
          });


      },
      selectTaskCourList(){

        this.$ajax.get('task/selectTaskCourList',{params:{
          taskId:this.taskid
         }})
          .then((response)=>{
          if(response.data.length>0){
            this.tableData3 = response.data;
          }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      notChooseStu(){
        var layer_load_idx = layer.load(4);
        //查询任务下的年级
        this.selectTaskGrade();
        this.$ajax.get('task/selectNotChooseStu',{params:{
          taskId:this.taskid
        }})
          .then((response)=>{
            if(response.data.length>0){
              layer.close(layer_load_idx);
              this.taskNotList = response.data;
              
            }else{
             layer.close(layer_load_idx);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
       this.layerOpen($('#layerEdit'));
      },
      //查询任务下的年级
      selectTaskGrade(){
        this.$ajax.get('task/selectTaskGrade',{params:{
          taskId:this.taskid
        }})
          .then((response)=>{
            if(response.data.length>0){
            
              this.gradeList = response.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          });


      },
      //查询任务下的班级
      selectTaskClass(){
        if(this.gradeId==""){
           this.classId = "";
        }
        this.selectNotStudents();
        this.$ajax.get('task/selectTaskClass',{params:{
          taskId:this.taskid,
          gradeId:this.gradeId
        }})
          .then((response)=>{
            if(response.data.length>0){
            this.classList = response.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          });


      },
      selectNotStudents(){
        this.taskNotList =[];
            this.$ajax.get('task/selectNotChooseStu',{params:{
                taskId:this.taskid,
                gradeId:this.gradeId
              }})
                .then((response)=>{
                  if(response.data.length>0){
                    this.taskNotList = response.data;
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
      },
      changeClassSelectNot(){
        this.taskNotList = [];
        this.$ajax.get('task/selectNotChooseStu',{params:{
          taskId:this.taskid,
          gradeId:this.gradeId,
          classId:this.classId
        }})
          .then((response)=>{
            if(response.data.length>0){
              debugger
              this.taskNotList = response.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          });


      },
      closeNotLayer(){
        this.layerClose($('#layerEdit'));
      },
      layerOpen(obj){
        $(".hwui-layer-mask").show();
        obj.show();
        obj.stop().animate({"right":"0%"},200);
      },
      lookDetail(id){
        this.isOrNotCreate(id);
        this.findGroupId(id);
        this.couId = id;
        this.$ajax.get('task/selectTaskCourDetail',{params:{
          courseId:id
        }})
          .then((response)=>{
            if(response.data!=null){
             this.courseImg = response.data.courseImg;
             this.courseName = response.data.courseName;
             this.teacherName = response.data.teacherName;
             this.courseTime = response.data.courseTime;
             this.courseSec = response.data.courseSec;
             this.limitCourseNums = response.data.limitNums;
             this.HaveCourseNums = response.data.cnums;
             this.intro = response.data.intro;
             this.couClassRoom = response.data.CLASSROOM;
             this.teacherId = response.data.teacherId;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        this.layerOpen($('#layerView'));
      },
      isOrNotCreate(id){
        this.$ajax.get('task/selectIsOrNotCreate',{params:{
          courseId:id
        }})
          .then((response)=>{
            this.isOrNotShow = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //查询选择此课程的所有学生的ID
      findGroupId(courseId){
    
      this.groupIdStr = "";
        this.$ajax.get('task/findCourseGroupId',{params:{
               courseId:courseId
          }})
          .then((response)=>{
          if (response.data!=""&&response.data!=null){
    
            this.groupIdStr = response.data;
          }
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      createGroup(courseName,teacherId){
        var params = new URLSearchParams();
        params.append('groupName', courseName);
        params.append('groupManagerId', teacherId);
        params.append('groupIdStr', this.groupIdStr);
        params.append('courseId', this.couId);
        this.$ajax.post('task/createGroup',params)
          .then((response)=>{
            //成功之后修改课程中的是否创建标识
          if(response.data.s>0){
              layer.msg("创建成功,请去校檬查看名称为"+courseName+"的班级群");
              this.isOrNotShow = 1;
          }else{
               if(response.data.mesg!=undefined){
                  layer.msg(response.data.mesg);
               }else{
                  layer.msg("创建失败，请查看校檬配置或链接是否正确");

               }
              
          }
          
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      updateCourseflag(couid){
        this.$ajax.get('task/updateCourseIsCreate',{params:{
          courseId:couid
        }})
          .then((response)=>{
            if(response.data>0){
               layer.msg("创建成功");
            }
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      layerCloseDetail(){
        this.layerClose($('#layerView'));
      },
      //关闭弹层
      layerClose(obj){
        $(".hwui-layer-mask").hide();
        obj.hide();
        obj.css({"right":"-"+window.layerWidth},200);
     },
      toCourseStatics(){
        this.$router.push({
          name:"CourseStatics",
          params: { myTaskId: this.taskid }
        });
      },
      toCourseClassStatics(){
        this.$router.push({
          name:"CourseClassStatics",
          params: { clstTaskId: this.taskid }
        });
      },
      toIndexPage(){
         this.$router.push({
                name:"IndexPage1"
         });
      },
      //导出未选课学生列表
      exportStuNotHave(){
        var params = new URLSearchParams();
        params.append('taskNotList', JSON.stringify(this.taskNotList));
        this.$ajax.post('task/exportStuNotHave',params)
          .then((response)=>{
           if(response.data!=""&&response.data!=null){
             console.log(response.data);
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

<style scoped>

</style>
