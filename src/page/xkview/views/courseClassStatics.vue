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
							<a href="#">结果查看（选课人数统计）</a>
						</span>
        </div>
        <div class='hwui-r-float'><a @click='goback()'>返回</a></div>
      </div>

      <div class="stepLinkList">
        <a @click = "toCoursePersStatics()">选课人数统计</a>
        <a @click = "toCourseStatics()">按课程查看</a>
        <a class="on" >按班级查看</a>
        <div class="hwui-clra"></div>
      </div>

      <div id="panel-main" class="hwui-right-content" style="border:none;top:55px;left:20px; right: 20px; bottom:20px;" title="">
        <!--筛选条件开始-->
        <div class="hwui-search-bar">

          <ul class="hwui-search hwui-l-float">
            <li class="pl">班级：</li>
            <li>
              <select v-model="classId" @change="selectClassStatsList()" class="hwui-select hwui-h hwui-w-mini hwui-radius2">
                <option value="0">全部</option>
                <option v-for="v in gcStudentList" :value="v.classId">{{v.gradeName}}{{v.className}}</option>

              </select>
            </li>
            <!--<li class="pl"><input type="button" class="hwui-btn hwui-btn-primary" value="查询" /></li>-->
          </ul>

          <div class="hwui-r-float">
            <input type="button" @click = "exportCoures()" class="hwui-btn hwui-btn-submit" value="导出课程" />
          </div>
          <div class="clra"></div>
        </div>
        <!--筛选条件结束-->
        <div id="panel-sub" class="easyui-panel" style="border:none;" title="">


          <div id="dataTable" class="dataTable" style="position: fixed; left: 20px; right: 20px; top: 155px; bottom: 20px; margin: auto;">
            <el-table :data="classStisList" border class="dadadada" height="100%" style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="realName" label="姓名"></el-table-column>
              <el-table-column prop="loginName" label="学号"></el-table-column>
              <el-table-column prop="SEX" label="性别"></el-table-column>
              <el-table-column prop="gradeName" label="年级"></el-table-column>
              <el-table-column prop="className" label="班级"></el-table-column>
              <el-table-column prop="courseName" label="课程名称"></el-table-column>
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

    <!--列表编辑开始-->
    <div id="layerEdit" class="hwui-layer" :style="{right:-layerWidth,width:layerWidth}">
      <div class="ld-title">
        <h3>未选课学生</h3>
        <i class="hwui hwuifont hwui-shanchu ldt-close" onclick="layerClose($('#layerEdit'))"></i>
      </div>

      <!--筛选条件开始-->
      <div class="hwui-search-bar tcSeacherBar">

        <ul class="hwui-search hwui-l-float">
          <li class="pl">年级：</li>
          <li>
            <select class="hwui-select hwui-h hwui-w-mini hwui-radius2">
              <option value="一年级">一年级</option>
              <option value="二年级">二年级</option>
              <option value="三年级">三年级</option>
              <option value="四年级">四年级</option>
              <option value="五年级">五年级</option>
            </select>
          </li>
          <li class="pl">班级：</li>
          <li>
            <select class="hwui-select hwui-h hwui-w-mini hwui-radius2">
              <option value="(1)班">(1)班</option>
              <option value="(2)班">(2)班</option>
              <option value="(3)班">(3)班</option>
              <option value="(4)班">(4)班</option>
              <option value="(5)班">(5)班</option>
              <option value="(6)班">(6)班</option>
            </select>
          </li>
        </ul>

        <div class="hwui-r-float">
          <input type="button" class="hwui-btn hwui-btn-submit" value="导出" />
        </div>
        <div class="clra"></div>
      </div>
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
        <input type="button" class="hwui-btn hwui-btn-close" onclick="layerClose($('#layerEdit'))" value="取消" />

      </div>
    </div>
    <!--列表编辑结束-->

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

      <div class="ld-content-btn">
        <input type="button" class="hwui-btn" value="提交" />
        <input type="button" class="hwui-btn hwui-btn-close" onclick="layerClose($('#layerEdit'))" value="取消" />

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
    name: "CourseClassStatics",
    mixins: [User],
    data() {
      return {
        taskid:"",
        gcStudentList:"",
        classId:"0",
        layerWidth:"60%",
        classStisList:[],
        tableData3: [{
          course: '诗词欣赏、足球小组',
          studentName: '王帅',
          schoolNumber: '201509120316',
          sex:'男',
          grade:'高三',
          class: '(1)班'
        },{
          course: '奥数小组、艺术欣赏',
          studentName: '王晓明',
          schoolNumber: '201509120316',
          sex:'男',
          grade:'高三',
          class: '(4)班'
        },{
          course: '艺术欣赏，诗词朗诵',
          studentName: '肖雪',
          schoolNumber: '201509120318',
          sex:'女',
          grade:'高三',
          class: '(1)班'
        },{
          course: '音乐欣赏',
          studentName: '张素',
          schoolNumber: '201509120325',
          sex:'男',
          grade:'高三',
          class: '(3)班'
        }],
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
      this.taskid = this.$route.params.clstTaskId;
      this.selectGradeClass(); 
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
      toCoursePersStatics(){
        this.$router.push({
          name:"LookResult",
          params: { looktaskId: this.taskid }
        });
      },
      toCourseStatics(){
        this.$router.push({
          name:"CourseStatics",
          params: { myTaskId: this.taskid }
        });
      },
      //初始化查询任务下的年级和班级
      selectGradeClass(){
        this.$ajax.get('task/selectTaskGradeClass',{params:{
          taskid:this.$route.params.clstTaskId
          }})
          .then((response)=>{
            if(response.data.length>0){
              this.gcStudentList = response.data;
              this.selectClassStatsList();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //列表
      selectClassStatsList(){
        this.classStisList =[];
        this.$ajax.get('task/selectClassStatsList',{params:{
          classId:this.classId,
          taskid:this.$route.params.clstTaskId
          }})
          .then((response)=>{
            if(response.data.length>0){
              this.classStisList = response.data;
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
      //导出课程
      exportCoures(){
        var params = new URLSearchParams();
        params.append('classStisList', JSON.stringify(this.classStisList));
        this.$ajax.post('task/exportCouresExecl',params)
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
