<template>

  <div id="hwui">
    <!--头部开始-->

    <!--头部结束-->

    <!--左侧开始-->

    <!--左侧结束-->

    <!--右侧开始-->
    <div class="hwui-right hwui-hidden">

      <div class="haveChoiceSubject">
        <select v-model="taskId"  class="hwui-select hwui-h hwui-w-mini hwui-radius2">
          <option v-for ="(v,index) in tasks" :key="index" :value="v.id">{{v.title}}</option>
        </select>

        <ul>


          <li><em>选课时间：</em><div class="rightContent">{{task.startTime}} &nbsp;&nbsp;~&nbsp;&nbsp;{{task.overTime}}
          <!--<span class="state">{{task.status}}</span>-->
          <span  v-show="new Date(task.startTime)>new Date(task.curTime)">(未开始)</span>
          <span  v-show="new Date(task.curTime)>new Date(task.startTime)&&new Date(task.overTime)>new Date(task.curTime)">(进行中)</span>
          <span  v-show="new Date(task.curTime)>new Date(task.overTime)">(已结束)</span>
        </div></li>
          <li>
            <em>限选课程数量：</em>
            <div class="rightContent">
              <p class="Remarks"><span>&nbsp;&nbsp;{{task.limitNums}}</span></p>
              <!-- <p class="Remarks"> <span slot="label"> 全部课程（{{haveClass}}/{{allClass}}）</span><span>2</span></p> -->
            </div>
          </li>
          <!-- <li><em>已选课程：</em><div class="rightContent">{{courseName}}</div></li> -->
        </ul>
        <div class="clear"></div>
      </div>


      <div class="choDataTable">
        <div id="dataTable" class="dataTable studentChouBox" style="position: fixed; left:10px; right:10px; top:200px; bottom:20px; margin:auto;">
          <div class="switchBtn">
							<!-- <el-button type="primary" size="mini" @click="listStyle=!listStyle">列表样式切换</el-button> -->
					</div>
          <div class="xuanzeBox">
            <div class="xuanzeBox_1"><span :class="{on:allshow}" @click="allshow = true">全部课程（{{haveClass}}/{{allClass}}）</span><span :class="{on:!allshow}" @click="allshow = false">已选课程{{haveClass}}</span></div>
            <div v-show="allshow">
              <div v-show="listStyle=='1'">
                  <el-table :data="tableData3" border class="dadadada" height="500px" style="width: 100%">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="courseName" label="课程名称"></el-table-column>
                    <el-table-column prop="teacherName" label="任课老师"></el-table-column>
                    <el-table-column prop="courseTime" label="上课时间"></el-table-column>
                    <el-table-column prop="classroom" label="上课教室"></el-table-column>
                    <el-table-column prop="count" label="选课人数"></el-table-column>
                    <el-table-column prop="limitPers" label="限选人数"></el-table-column>
                    <el-table-column prop="ssex" label="限选性别"></el-table-column>
                    <el-table-column fixed="right" prop="operation" label="操作">
                      <template slot-scope="scope">
                        <el-button v-show="task.taskstart && !task.taskend" :type="anniutype(scope.row.courseFlag)" size="mini" @click="selectCourse(scope.row.id,scope.row.courseFlag,scope.row.taskId
                                  ,scope.row.limitCours,scope.row.classifyId,scope.row.ssex,scope.$index)">
                          {{scope.row.courseFlag}}
                        </el-button>
                        <el-button type="text" @click="layerOpen(scope.row.id);" size="small">查看详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  </div>

                  <div v-show="listStyle=='2'">
									<div class="classList">
										<div class="classBox" v-for="(d,index) in tableData3" :key="index" :class="{classBoxOn:d.courseFlag=='退选'}">
											<h3>{{d.courseName}}</h3>
											<p><i class="hwui hwuifont hwui-renyuan"></i>任课教师：{{d.teacherName}}</p>
											<p><i class="hwui hwuifont hwui-renyuan"></i>选课人数：<font>{{d.count}}</font><span>/</span>{{d.limitPers}}</p>
											<div class="bts">
                        <el-button @click="selectCourse(d.id,d.courseFlag,d.taskId,d.limitCours,d.classifyId,d.ssex,index)" size="small" style="width:40%;">{{d.courseFlag}}</el-button>
												
											</div>
										</div>
									</div>
								</div>

            </div>
            <div v-show="!allshow">
              <div v-show="listStyle=='1'">
                <el-table :data="hacChoClassData" border class="dadadada" height="500px" style="width: 100%">
                     <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="courseName" label="课程名称"></el-table-column>
                    <el-table-column prop="teacherName" label="任课老师"></el-table-column>
                    <el-table-column prop="courseTime" label="上课时间"></el-table-column>
                    <el-table-column prop="classroom" label="上课教室"></el-table-column>
                    <el-table-column prop="count" label="选课人数"></el-table-column>
                    <el-table-column prop="limitPers" label="限选人数"></el-table-column>
                    <el-table-column prop="ssex" label="限选性别"></el-table-column>
                    <el-table-column fixed="right" prop="operation" label="操作">
                      <template slot-scope="scope">
                        <el-button v-show="task.taskstart && !task.taskend" :type="anniutype(scope.row.courseFlag)" size="mini" @click="selectCourse(scope.row.id,scope.row.courseFlag,scope.row.taskId
                                  ,scope.row.limitCours,scope.row.classifyId,scope.row.ssex,scope.$index)">
                          {{scope.row.courseFlag}}
                        </el-button>
                        <el-button type="text" @click="layerOpen(scope.row.id);" size="small">查看详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
              </div>
               <div v-show="listStyle=='2'">
                 <div class="classList">
										<div class="classBox" v-for="(d,index) in hacChoClassData" :key="index" :class="{classBoxOn:d.courseFlag=='退选'}">
											<h3>{{d.courseName}}</h3>
											<p><i class="hwui hwuifont hwui-renyuan"></i>任课教师：{{d.teacherName}}</p>
											<p><i class="hwui hwuifont hwui-renyuan"></i>选课人数：<font>{{d.count}}</font><span>/</span>{{d.limitPers}}</p>
											<div class="bts">
                        <el-button @click="selectCourse(d.id,d.courseFlag,d.taskId,d.limitCours,d.classifyId,d.ssex,index)" size="small" style="width:40%;">{{d.courseFlag}}</el-button>
												
											</div>
										</div>
									</div>
               </div>

            </div>
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

    <!--列表编辑开始-->
    <div id="layerEdit" class="hwui-layer" :style="{right:-layerWidth,width:layerWidth}">
      <div class="ld-title">
        <h3>未选课学生</h3>
        <i class="hwui hwuifont hwui-shanchu ldt-close" onclick="layerClose()"></i>
      </div>

      <!--筛选条件开始-->
      <!--筛选条件结束-->

      <div id="tcTable" class="tcTable">
        <el-table :data="tableData3" border class="dadadada" style="width: 100%">
          <el-table-column prop="studentName" label="姓名"></el-table-column>
          <el-table-column prop="schoolNumber" label="学号"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="grade" label="年级"></el-table-column>
          <el-table-column prop="class" label="班级"></el-table-column>
        </el-table>
      </div>


      <div class="ld-content-btn">
        <input type="button" class="hwui-btn" value="提交" />
        <input type="button" class="hwui-btn hwui-btn-close" onclick="layerClose()" value="取消" />

      </div>
    </div>
    <!--列表编辑结束-->

    <!--列表详情开始-->
    <div id="layerView" class="hwui-layer" style="right:0;width:60%; display: none;">
      <div class="ld-title">
        <h3>课程详情</h3>
        <i class="hwui hwuifont hwui-shanchu ldt-close" @click="layerClose()"></i>
      </div>
      <div class="ld-content hwui-v-scroll">
        <div class="hwui-pa10 hwui-hidden">
          <ul class="hwui-form">
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">课程图片：</em>
              <div class="hf-right hwui-hidden">
                <div class="activityImg">
                  <img :src="taskCourse.courseImg">
                </div>
              </div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">课程名称：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1">{{taskCourse.courseName}}</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">任课教师：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1">{{taskCourse.teacherName}}</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">上课时间：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1">{{taskCourse.courseTime}}</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">上课教室：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1">{{taskCourse.classroom}}</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">限选人数：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1">{{taskCourse.limitPers}}</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">已选人数：</em>
              <div class="hf-right hwui-wordwrap">{{taskCourse.count}}</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">限选性别：</em>
              <div class="hf-right hwui-wordwrap">{{taskCourse.ssex}}</div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">课程简介：</em>
              <div class="hf-right hwui-hidden">{{taskCourse.courseIntro}}</div>
            </li>
          </ul>
        </div>
        <div class="tcBottomFill">
        </div>
      </div>

      <div  v-show="task.taskstart && !task.taskend" class="ld-content-btn">
        <input v-if="taskCourse.courseFlag=='选择'" type="button" class="hwui-btn" :value="taskCourse.courseFlag"
                  @click="xuanze(taskCourse.id,taskCourse.taskId
                    ,taskCourse.limitCours,taskCourse.classifyId,taskCourse.ssex)"/>
        <input v-if="taskCourse.courseFlag=='退选'" type="button" class="hwui-btn" :value="taskCourse.courseFlag"
                  @click="tuixuan(taskCourse.id)"/>
        <input type="button" class="hwui-btn hwui-btn-close" @click="layerClose()" value="取消" />

      </div>
    </div>
    <!--列表详情结束-->

  </div>
</template>



<script>
  import  "../js/style.js";
  import User from '../../../mixins/user';
  import {mapState} from 'vuex';
  import store from '../vuex/store';

  export default {
    components: {

    },
    name: "stuIndexPage",
    store,
    mixins: [User],
    data() {
      return {
        allshow:true,
        allClass:0,
        haveClass:0,
        listStyle:'1',
        choList:[],
        terms:[],
        layerWidth:"60%",
        taskId:'',
        task:{},
        tableData3:[],
        tasks:[],//选课任务
        xkrwList:[],
        taskCourse:{},
        butt:'',
        courseName:"",//选择的课程
        buttonType:'primary',
        hacChoClassData:[]
      }
    },

    computed: {
    },
    created(){
      this.router_intercep();//前端路由拦截
      this.findUserInfo();
      this.getSelectXkTask();
      // this.router_intercep();
    },
    mounted() {
      this.setShowNum();
    },
    watch:{
      'taskId':{
        handler:function(n,o){
          if(n != o ){
            // this.getSelectXkTask(n);
            this.changeTerms(n);
          }
        },deep:true
      }
    },
    methods: {
      setShowNum(){
        this.allClass = this.tableData3.length;
        this.haveClass = this.hacChoClassData.length;
      },
      router_intercep(){
       if(window.user_Over_Type=='Teacher'||window.user_Over_Type=='SchoolManager'){
           this.$router.push({
                 name:"IndexPage1"
           }); 
       }
      },
      //弹层显示
      layerOpen(id) {
        this.butt="xq";
        this.getCourse(id);
        $("#layerView").show();
      },
      //guanbi
      layerClose() {
        $("#layerView").hide();
        this.butt='';
      },
      //下拉框
      getSelectXkTask() {
        let that = this;
        that.$ajax.get('stu/getSelectXkTask', {
          params: {
          }
        })
          .then((response) => {
            // console.log(response);
            // if(response.data[0].remark5==null||response.data[0].remark5==1){
            //   that.listStyle = "1"
            // }else{
            //   that.listStyle = response.data[0].remark5
            // }
            // console.log(that.listStyle)
            if (response.data == null||response.data.length==0||response.data==undefined) {
              layer.msg("暂无选课任务！");
              that.toNoDataPage();
              return;
            } else {
              that.tasks = response.data;
              that.taskId = that.tasks[0].id;
              // console.log(that.tasks);
              that.changeTerms(that.taskId);
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //根据班级查询选课任务
      changeTerms: function (taskId) {
        let that = this;
        for(let i=0;i<that.tasks.length;i++){
          if(that.tasks[i].id==taskId){
            if(that.tasks[i].remark5==null||that.tasks[i].remark5 =="1"){
                that.listStyle = 1
            }else{
               that.listStyle = that.tasks[i].remark5;
            }
          }
        }
        that.$ajax.get('stu/getXkTaskCourse', {
          params: {
            taskId: taskId,
            key:'WEB'
          }
        })
          .then((response) => {
            // console.log(response)
            // if(response.data[0].remark5==null||response.data[0].remark5==1){
            //   that.listStyle = "1"
            // }else{
            //   that.listStyle = response.data[0].remark5
            // }
            if (response.data.task == null) {
              that.tasks = new Array();
              layer.msg("暂无选课任务！");
            } else {
              that.task = response.data.task;
              that.tableData3 = response.data.xkTaskCourseList;
              that.hacChoClassData=response.data.xkTaskCourseSelectList;
              that.allClass = that.tableData3.length;
              that.haveClass = that.hacChoClassData.length;
              that.courseName = response.data.courseName;
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      selectCourse(id,courseFlag,taskId,limitCours,classifyId,ssex,suoyin) {
        if (courseFlag == '选择') {
          return this.xuanze(id,taskId,limitCours,classifyId,ssex);
        } else {
          return this.tuixuan(id,suoyin);
        }
      },
      //选择
      xuanze(id, taskId,limitCours,classifyId,ssex) {
        let that = this;
        if(new Date(that.task.curTime)>new Date(that.task.overTime)){
          layer.msg("选课任务已结束");
          return;
        }
        that.$ajax.get('stu/setCourse', {
          params: {
            id: id,
            taskId: taskId,
            limitNums:that.task.limitNums,
            limitCours:limitCours,
            classifyId:classifyId,
            ssex:ssex
          }
        }).then((response) => {
            // console.log(response.data);
            if (!response.data.flag) {
              layer.msg(response.data.msg);
            }else {
              layer.msg("选课成功！");
              if (that.butt = "xq") {
                that.getCourse(id);
              }
                that.changeTerms(that.taskId);

            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //退选
      tuixuan(id,suoyin) {
        // console.log(suoyin);
        // console.log(id);
        let that = this;
        if(new Date(that.task.curTime)>new Date(that.task.overTime)){
          layer.msg("选课任务已结束");
          return;
        }
        // var vue=that;

        layer.open({
          content: '您确定要退选吗'
          , btn: ['退选', '取消']
          , yes: function (index) {
            that.$ajax.get('stu/deleteCourse', {
              params: {
                id: id,
              }
            }).then((response) =>                                                                                                                                                                                                                                                                                   
            {
                if (response.data != 200) {
                  layer.msg("操作失败！");
                } else {
                  for(let i=0;i<that.hacChoClassData.length;i++){
                    if(that.hacChoClassData[i].id == id){
                      // debugger
                         that.hacChoClassData.splice(i,1);
                    }
                  }
                  // console.log(vue.hacChoClassData);
                  layer.msg("退选成功！");
                  if (that.butt = "xq") {
                    that.getCourse(id);
                  }
                  that.changeTerms(that.taskId);

                }

              })
              .catch(function (error) {
                console.log(error);
              });
          }
        })

    },
      getCourse(id) {
        this.$ajax.get('stu/queryXkTask', {
          params: {
            id: id
          }
        })
          .then((response) => {
            if (response.data == null) {
              layer.msg("暂无数据！");
              return;
            } else {
              this.taskCourse = response.data;
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //跳转到缺省页
      toNoDataPage(){
        this.$router.push({
          name:"noDatePage",
          params: {
          }
        });
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      anniutype(anniumark){
        if(anniumark == "退选"){
            return "primary";
        }else{
            return null;
        }
      }
      
      
    }
  }

</script>






