
<template>
<div id="hwui">
			<!--头部开始-->
			<!--头部结束-->

			<!--左侧开始-->
			<!--<div class="hwui-left">
				<ul class="hwui-menu-left">
				  	<li>
				    	<div class="ml-lv-two">
				    		<a href="studentAdjust.html" class="hwui-ease-in-out on">
				      			<div class="hwui-ellipsis">学生调整</div>
				    		</a>
				   		</div>
				  	</li>
				</ul>
			</div>-->
			<!--左侧结束-->

			<!--右侧开始-->
			<div class="hwui-right hwui-hidden">
				<div class="hwui-fold-btn" onclick="foldDo(this)"></div>
				<div class="hwui-crumbs-main">
					<div class="hwui-l-float">
						<a @click="index()">首页</a>
						<span>
							<em class="hwui-plr10">&gt;</em>
							<a href="#">学生调整</a>
						</span>
					</div>
					<div class='hwui-r-float'><a onclick='window.history.back(-1)'>返回</a></div>
				</div>

				<div id="panel-main" class="hwui-right-content" style="border:none;top:55px;left:20px; right: 20px; bottom:20px;" title="">
					<!--筛选条件开始-->
					<div class="hwui-search-bar">

						<ul class="hwui-search hwui-l-float">
							<li class="pl">年级：</li>
							<li>
								<select v-model="gradeId" class="hwui-select hwui-h hwui-w-mini hwui-radius2">
									<option v-for="v in gradeList" :value="v.gradeId">{{v.gradeName}}</option>
								</select>
							</li>
							<li class="pl">班级：</li>
							<li>
								<select v-model="classId" class="hwui-select hwui-h hwui-w-mini hwui-radius2">
									<option v-for="v in classList" :value="v.classId">{{v.className}}</option>
								</select>
							</li>
						</ul>

						<!--<div class="hwui-r-float">
							<input type="button" class="hwui-btn hwui-btn-submit" onclick="layerOpen($('#layerEdit'));" value="添加课程分类" />
						</div>-->
						<div class="clra"></div>
					</div>
					<!--筛选条件结束-->
					<div id="panel-sub" class="easyui-panel" style="border:none;" title="">


						<div id="dataTable" class="dataTable" style="position: fixed; left:20px; right:20px; top:155px; bottom:20px; margin:auto;">
						    <el-table :data="tableData3" border class="dadadada" height="95%" style="width: 100%">
                  <el-table-column type="index" width="50"></el-table-column>
							    <el-table-column prop="realName" label="姓名"></el-table-column>
							    <el-table-column prop="code" label="学号"></el-table-column>
							    <el-table-column prop="sex" label="性别"></el-table-column>
							    <el-table-column prop="parentName" label="年级"></el-table-column>
							    <el-table-column prop="orgName" label="班级"></el-table-column>
							    <el-table-column prop="courseName" label="已选课程"></el-table-column>
							    <el-table-column fixed="right" prop="operation" label="操作">
							    	<template slot-scope="scope">
		       							<el-button type="text" @click="layerOpen(scope.row)" size="small">调整</el-button>
	       							</template>
							    </el-table-column>
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
					<h3>学生调整</h3>
					<i class="hwui hwuifont hwui-shanchu ldt-close" @click="layerClose()"></i>
				</div>
        <div class="tcForm">

				<div class="hwui-pa10 hwui-hidden">
					<ul class="hwui-form hwui-form-mini">
						<li>
							<em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">姓名：</em>
							<div class="hf-right hwui-wordwrap hwui-fc-txt1">{{user.realName}}</div>
						</li>
						<li>
							<em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">学号：</em>
							<div class="hf-right hwui-wordwrap hwui-fc-txt1">{{user.ucId}}</div>
						</li>
						<li>
							<em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">性别：</em>
							<div class="hf-right hwui-wordwrap hwui-fc-txt1">{{user.sex}}</div>
						</li>
						<li>
							<em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">年级：</em>
							<div class="hf-right hwui-wordwrap hwui-fc-txt1">{{user.parentName}}</div>
						</li>
						<li>
							<em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">班级：</em>
							<div class="hf-right hwui-wordwrap">{{user.orgName}}</div>
						</li>
					</ul>
				</div>

				<div id="tcTable" class="dataTable">
						    <el-table :data="tableData4" border class="dadadada " :style="{width:100+'%', height:getheight+'px',}" height="100%">
							    <el-table-column prop="courseName" width="80" label="课程名称"></el-table-column>
							    <el-table-column prop="teacherName" width="100" label="老师姓名"></el-table-column>
							    <el-table-column prop="classroom" width="160" label="上课教室"></el-table-column>
							    <el-table-column prop="courseTime" width="80" label="上课时间"></el-table-column>
							    <el-table-column prop="count" width="80" label="已选人数"></el-table-column>
							    <el-table-column prop="limitPers" width="80" label="限选人数"></el-table-column>
							    <el-table-column prop="operation" width="100" label="操作">
							    	<template slot-scope="scope">
                      <el-button v-if="scope.row.courseFlag=='退选'" type="primary" size="mini" @click="selectCourse(scope.row)">
                        {{scope.row.courseFlag}}
                      </el-button>
                      <el-button v-if="scope.row.courseFlag=='选择'" type="primary" size="mini" @click="selectCourse(scope.row)">
                        {{scope.row.courseFlag}}
                      </el-button>
                    </template>
							    </el-table-column>

							</el-table>
				</div>

        </div>

				<div class="ld-content-btn">
					<input type="button" class="hwui-btn" @click="insertCourses()" value="提交" />
					<input type="button" class="hwui-btn hwui-btn-close" @click="layerClose()" value="取消" />

				</div>
			</div>
			<!--列表编辑结束-->
		</div>
</template>

<script>
      import  "../js/style.js";

      import User from '../../../mixins/user';
      export default {
        components: {

        },

        name: "studentAdjust",

        mixins: [User],

        data(){
          return {
            gradeList:[],//年级集合
            gradeId:'',
            classList:[],
            classId:'',
            tableData3:[],
            taskId:'',
            layerWidth:"",
            user:{},
            tableData4:[],
            choORnot:false,
            selectCourses:[],
            getheight:''
          }
        },
        computed: {
        },
        created(){
          this.router_intercep();//前端路由拦截
          this.taskId = this.$route.params.taskId;
          this.getSelectXkTask();
        },
        watch:{

          'gradeId' : {
            handler : function(n, o) {
              if (n != o) {
                this.getClass(n);
              }
            },
            deep : true
          },
          'classId' : {
            handler : function(n, o) {
              if (n != o) {
                this.getStudentCourse(n);
              }
            },
            deep : true
          }
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
          //弹层显示
          layerOpen(row) {
            this.setLayerTableHeight();
            this.user=row;
            $(".hwui-layer-mask").show();
            $("#layerEdit").show();
            $("#layerEdit").show().animate({"right":"0%"},200);
            this.getStudentTaskCoun(row);
          },
          //关闭
          layerClose() {
            $(".hwui-layer-mask").hide();
            $("#layerEdit").hide();
            this.selectCourses= new Array();
          },
          //下拉框
          getSelectXkTask() {
            this.$ajax.get('stu/gradeList', {
              params: {
                taskId:this.taskId
              }
            })
              .then((response) => {
                if (response.data == null) {
                  layer.msg("服务器异常!");
                  return;
                } else {
                  this.gradeList = response.data;
                  this.gradeId= this.gradeList[0].gradeId;
                }

              })
              .catch(function (error) {
                console.log(error);
              });
          },
          //班级下拉
          getClass(gradeId){
            this.$ajax.get('stu/classList', {
              params: {
                gradeId:gradeId,
                taskId:this.taskId
              }
            })
              .then((response) => {
                if (response.data == null) {
                  layer.msg("服务器异常!");
                  return;
                } else {
                  this.classList = response.data;
                  this.classId = this.classList[0].classId;
                }

              })
              .catch(function (error) {
                console.log(error);
              });
          },
          //设置弹层的表格高度
          setLayerTableHeight:function(){
            var zHeight = document.documentElement.clientHeight ;
            console.log(zHeight);
            this.getheight = zHeight-320;
          },
          //列表
          getStudentCourse(classId){
          var layer_load_idx = layer.load(4);
            this.$ajax.get('stu/getStudentCourse', {
              params: {
                classId:classId,
                taskId:this.taskId
              }
            })
              .then((response) => {
                if (response.data == null) {
                  layer.msg("服务器异常!");
                  layer.close(layer_load_idx);
                  return;
                } else {
                  layer.close(layer_load_idx);
                  this.tableData3=response.data;
                }

              })
              .catch(function (error) {
                console.log(error);
                layer.close(layer_load_idx);
              });
          },
          //选课列表
          getStudentTaskCoun(row){

            this.$ajax.get('stu/getXkTaskCourseForAdmin', {
              params: {
                taskId:this.taskId,
                userId:row.id
              }
            })
              .then((response) => {
                if (response.data == null) {
                  layer.msg("服务器异常!");
                  return;
                } else {
                  this.tableData4=response.data.xkTaskCourseList;
                  this.selectCourses=this.tableData4;
                }

              })
              .catch(function (error) {
                console.log(error);
              });
          },
          //教师调整
          selectCourse(row){
            if(row.courseFlag=='选择'){
             for(var i in this.selectCourses){
                  if(this.selectCourses[i].id==row.id){
                    if(this.selectCourses[i].webSta=='0'){
                      this.selectCourses[i].webSta=1;
                    }else{
                      this.selectCourses[i].webSta=0;
                    }
                    row.courseFlag='退选';
                    break;
                  }
              }
            }else{
              for(var i in this.selectCourses){
                if(this.selectCourses[i].id==row.id){
                  if(this.selectCourses[i].webSta=='0'){
                    this.selectCourses[i].webSta=2;
                  }else{
                    this.selectCourses[i].webSta=0;
                  }
                  row.courseFlag='选择';
                  break;
                }
              }
            }
          },
          //提交
          insertCourses(){
             var params = new URLSearchParams();
             params.append('selectCourses', JSON.stringify(this.selectCourses));
             params.append('userId', this.user.id);
             params.append('taskId', this.taskId);
            this.$ajax.post('stu/insertDelete', params)
              .then((response) => {
                if (!response.data.flag) {
                  this.layerClose();
                  layer.msg(response.data.msg);
                  return;
                } else {
                  this.getStudentCourse(this.classId);
                  this.layerClose();
                  //location.reload();
                  layer.msg("操作成功!");
                }

              })
              .catch(function (error) {
                console.log(error);
              });
          },
          //跳转首页
          index(){
            this.$router.push({
              name:"IndexPage1"
            });
          },
        }
      }

</script>
