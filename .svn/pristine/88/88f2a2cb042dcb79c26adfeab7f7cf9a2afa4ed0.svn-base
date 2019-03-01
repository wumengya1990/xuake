
<template>
	<div id="hwui">		
		<!--右侧开始-->
		<div class="hwui-right hwui-hidden">
			<div class="hwui-fold-btn" onclick="foldDo(this)"></div>
			<div class="hwui-crumbs-main">
				<div class="hwui-l-float">
					<a @click="index()">首页</a>
					<span>
						<em class="hwui-plr10">&gt;</em>
						<a @click="toSetUpRestrict()">选课设置(设置限制条件)</a>
					</span>
				</div>
				<div class='hwui-r-float'><a @click="index()">返回</a></div>
			</div>
			
			<div class="stepLinkList">
				<a @click="toSetUp()">设置选课课程</a>
        		<a @click="toSetUpClass()">设置参与班级</a>
				<a class="on" @click="toSetUpRestrict()">设置限制条件</a>
				<div class="hwui-clra"></div>
			</div>
		
			<div id="panel-main" class="hwui-right-content" style="border:none;top:55px;left:20px; right: 20px; bottom:20px;" title="">
				<h3 class="xmBt"><span>选课数量限制</span></h3>
				<div style="margin:0 0 50px;">
					<div class="setBox_1" v-if="showMainClassify">
						<em>限选课程数量：</em>&nbsp;&nbsp;&nbsp;&nbsp;
						<span>{{mainClassify}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
						<el-button size="small" @click="socMainClassify()">修改</el-button>
					</div>
					<div class="setBox_1" v-else>
						<em>限选课程数量：</em>
						<el-input v-model="mainClassify" placeholder="请输入内容" type="number" max="200" min="0" style=" width: 200px; margin: 0 5px 0 0;" size="small"></el-input>
						<el-button size="small" @click="updateMainClassify()">保存</el-button>
					</div>
				</div>



				<h3 class="xmBt"><span>课程分类限制</span></h3>
				<!--筛选条件开始-->
				<div class="hwui-search-bar">
					<div class="hwui-r-float">
						<input type="button" class="hwui-btn hwui-btn-submit" @click="addClassify" value="添加课程分类" />
					</div>
					<div class="clra"></div>
				</div>
				<!--筛选条件结束-->
				<div id="panel-sub" class="easyui-panel" style="border:none;" title="">
					
					
					<div id="dataTable" class="dataTable" style="position: fixed; left:20px; right:20px; top:340px; bottom:20px; margin:auto;">
					    <el-table :data="taskClassifyList" border class="dadadada" style="width: 100%" height="80%">
						    <el-table-column prop="classifyName" label="课程分类名称"></el-table-column>
						    <el-table-column prop="courseNames" label="课程名称"></el-table-column>
						    <el-table-column prop="limitCours" label="限选课程数量"></el-table-column>
						    <el-table-column fixed="right" prop="operation" label="操作">
						    	<template slot-scope="scope">
	       							<el-button type="text" size="small" @click="update(scope.row.id,scope.row.classifyName,scope.row.limitCours)">编辑</el-button>
	       							<el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
       							</template>
						    </el-table-column>
						</el-table>
					</div>

					<div style=" position:absolute; bottom:0; left:0; width:100%; left text-align:center; padding:10px 0;"><el-button type="primary" style="width:200px; margin:0 auto; display:block;" size="medium" round @click="publish" v-show="isPublish=='0'">发布选课任务</el-button></div>
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
				<h3>限制条件</h3>
				<i class="hwui hwuifont hwui-shanchu ldt-close" @click="editClose"></i>
			</div>
							
			<div class="tcForm">
			<el-form ref="form" :model="form" label-width="100px" size="small">
			  <el-form-item label="课程分类名称">
			    <el-input v-model="form.classifyName"></el-input>
			  </el-form-item>
			  <el-form-item label="限选课程数量">
			    <el-input v-model="form.limitCours"  type="number" max="200" min="1" ></el-input>
			  </el-form-item>
			  
			  <el-form-item label="选择课程">
			    <el-checkbox-group v-model="form.chooseList">
			      <el-checkbox v-for="(course,index) in form.courseList" :label="course.id" 
			      :key="course.id">{{course.courseName}}</el-checkbox>
			    </el-checkbox-group>
			  </el-form-item>
			  
			</el-form>
			</div>


			<div class="ld-content-btn">
				<input type="button" class="hwui-btn" value="提交" @click="submit" />
				<input type="button" class="hwui-btn hwui-btn-close" @click="editClose" value="取消" />
				
			</div>
		</div>
		<!--列表编辑结束-->
		
	</div>
</template>

<style>
.xmBt{ margin:0 0 10px; border-bottom: 1px solid #eaeaea; height: 40px; line-height: 40px; }
.xmBt span{ color: #009fff; font-weight:bold; border-bottom: 2px solid #009fff; height:39px; float:left; padding:0 10px;}
</style>		
		
<script type="text/javascript">
  import  "../js/style.js";
  import {mapState} from 'vuex';
  import User from '../../../mixins/user';
  import generalHead from './generalHead';
  export default {
    components: {
      generalHead
    },
    name: "SetUpRestrict",

    mixins: [User],

    data() {
      return {
        
        layerWidth:'50%',
        taskClassifyList:[],
        taskId:this.$route.params.setTaskId,
        isPublish:this.$route.params.setStatus,
        mainClassify:'0',
        tempClassify:'0',
        showMainClassify:true,
        form: {
            id:'',
            classifyName: '',
            limitCours: '1',
            courseList:[],
            chooseList:[],
            maxCount:0
        }

      }
    },

    computed: {
      ...mapState(['userModule'])
    },
    created(){
        this.router_intercep();//前端路由拦截
		this.getClassifyList();
		this.getMainClassify();
		this.getTempClassify();
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
    	//跳转选课设置页面
        toSetUp(){
	       this.$router.push({
	         name:"SetUp",
         	 params: { setTaskId: this.taskId,setStatus:this.isPublish }
	       });
        },
        //跳转参与班级页面
        toSetUpClass(){
	       this.$router.push({
	         name:"SetUpClass",
         	 params: { setTaskId: this.taskId,setStatus:this.isPublish }
	       });
        },
        //跳转限制条件页面
        toSetUpRestrict(){
	       this.$router.push({
	         name:"SetUpRestrict",
         	 params: { setTaskId: this.taskId,setStatus:this.isPublish }
	       });
        },
        //跳转首页
	      index(){
	       this.$router.push({
	         name:"IndexPage1"
	       });
	      },
        getMainClassify(){
        	this.$ajax.get('taskClassify/getMainClassify',{params:{taskId:this.taskId}})
	        .then((response)=>{
	            this.mainClassify = response.data;
	        })
	          .catch(function (error) {
	            console.log(error);
	        });
    	},
    	getTempClassify(){
        	this.$ajax.get('taskClassify/getTempClassify',{params:{taskId:this.taskId}})
	        .then((response)=>{
	            this.tempClassify = response.data;
	        })
	          .catch(function (error) {
	            console.log(error);
	        });
    	},
    	socMainClassify(){
    		this.showMainClassify=false;
    	},
    	updateMainClassify(){
			this.$ajax.get('taskClassify/updateMainClassify',{params:{taskId:this.taskId,num:this.mainClassify}})
	        .then((response)=>{
	            if(response.data.flag){
					layer.msg("修改成功！");
	        	}else{
					layer.msg(response.data.flag);
                    return;
	        	}
	        	this.showMainClassify=true;
	        })
	          .catch(function (error) {
	            console.log(error);
	        });
    	},
        getClassifyList(){
	      	this.$ajax.get('taskClassify/taskClassifyList',{params:{taskId:this.taskId}})
	        .then((response)=>{
	            this.taskClassifyList = response.data;
	        })
	          .catch(function (error) {
	            console.log(error);
	        });
        },
        getCourseList(classifyId){
	      	this.$ajax.get('taskCourse/courseList',{params:{taskId:this.taskId,classifyId:classifyId,listType:'course'}})
	        .then((response)=>{
                if(response.data.length==0){
                    //layer.msg("暂无选课课程！");
                    return;
                }else{
                    this.form.courseList = response.data;
                    this.form.maxCount = this.form.courseList.length;
                }
	        })
	        .catch(function (error) {
	            console.log(error);
	        });
        },
        getChooseList(classifyId){
	      	this.$ajax.get('taskCourse/courseList',{params:{taskId:this.taskId,classifyId:classifyId,listType:'choose'}})
	        .then((response)=>{
                if(response.data.length==0){
                    //layer.msg("暂无选课课程！");
                    return;
                }else{
                	var array = [];
                	for(var i=0;i<response.data.length;i++){
						array.push(response.data[i].id);
                	}
                    this.form.chooseList = array;
                    this.getCourseList(classifyId)
                }
	        })
	        .catch(function (error) {
	            console.log(error);
	        });
        },
        submit(){
        	/*if(this.form.limitCours>this.form.maxCount){
        		layer.msg("限选课程数量不能超过课程总数！");
        		return;
        	}*/

        	if(this.form.chooseList.length<2){
        		layer.msg("课程至少选择两个才能进行分类！");
        		return;
        	}
        	//将选择课程组成字符串
        	var coList = this.form.chooseList;
			var str = '';
        	for(var i=0;i<coList.length;i++){
				str = str+coList[i]+',';
        	}
        	str = str.substring(0,str.length-1);

        	/*if(this.mainClassify!=0){
        		if((Number(this.form.limitCours)+Number(this.tempClassify))>Number(this.mainClassify)){
					layer.msg("限选课程数量不能超过总限选课程数量");
					return;
	        	}
        	}*/

        	//选择url
        	var url='taskClassify/addTaskClassify';
        	if(this.form.id!=''){
				url='taskClassify/updateTaskClassify';
        	}
        	this.$ajax.get(url,{params:{
        		taskId:this.taskId,
        		classifyName:this.form.classifyName,
        		limitCours:this.form.limitCours,
        		chooseList:str,
        		id:this.form.id}})
	        .then((response)=>{
	           if(response.data.flag){
	           		layer.msg("提交成功！");
	           		this.getClassifyList();
	           		this.editClose();
	           }else{
		             layer.msg(response.data.msg);
		             return;
	           }
	        })
	          .catch(function (error) {
	            console.log(error);
	        });
    	},
    	update(id,classifyName,limitCours){
			this.initForm();

			this.form.id=id;
			this.form.classifyName=classifyName;
			this.form.limitCours=limitCours;

        	//this.getCourseList(id);
        	this.getChooseList(id);

        	this.editClassify();
    	},
		//删除
	    del(id){
	        //layer.confirm('确定要删除该条数据？', {icon: 3, title:'删除'}, function(index){
	            this.$ajax.get('taskClassify/del',{params:{id:id,taskId:this.taskId}})
	            .then((response)=>{
	                if(response.data.flag){
	                    layer.msg("删除成功");
	                    this.getClassifyList();
	                }else{
	                    layer.msg(response.data.msg);
	                }
	            })
	            .catch(function (error) {
	                console.log(error);
	            });
	        //});
	    },
	    //发布选课任务
	    publish(){
	    	var courseNum = 0;
	    	this.$ajax.get('taskCourse/courseList',{params:{taskId:this.taskId,listType:'course'}})
	        .then((response)=>{
	        	courseNum = response.data.length;
	        	if(courseNum==0){
		    		layer.msg("课程为空不能发布");
		    		return;
		    	}else{
					//查询发布班级
			    	var classNum = 0;
					this.$ajax.get('taskClass/taskClassList',{params:{taskId:this.taskId}})
			        .then((response)=>{
						classNum = response.data.length;
						if(classNum==0){
				    		layer.msg("班级为空不能发布");
				    		return;
				    	}else{
							var params = new URLSearchParams();
							params.append('taskId', this.taskId);
							params.append('num', this.mainClassify);
				    		this.$ajax.post('task/publish',params)
				            .then((response)=>{
				                if(response.data.flag){
				                    layer.msg("发布成功");
				                    this.isPublish = '1';
				                    //跳至首页
				                    this.index();
				                }else{
				                    layer.msg(response.data.msg);
				                }
				            })
				            .catch(function (error) {
				                console.log(error);
				            });	
				    	}
			        })
			        .catch(function (error) {
			            console.log(error);
			        });
		    	}
	        })
	        .catch(function (error) {
	            console.log(error);
	        });
	    		
		},
        addClassify(){
        	this.initForm();
        	this.getCourseList('novalue');
	        this.layerOpen($('#layerEdit'));
	    },
	    editClassify(){
	        this.layerOpen($('#layerEdit'));
	    },
	    layerOpen(obj){
	        $(".hwui-layer-mask").show();
	        obj.show();
	        obj.stop().animate({"right":"0%"},200);
	    },
	    editClose(){
	        this.layerClose($('#layerEdit'));
	    },
	    layerClose(obj){
	        $(".hwui-layer-mask").hide();
	        obj.hide();
	        obj.css({"right":"-"+this.layerWidth},200);
	    },
	    //初始化表单数据
	    initForm(){
	        this.form.id='';
            this.form.classifyName='';
            this.form.limitCours='1';
            this.form.courseList=[];
            this.form.chooseList=[];
            this.form.maxCount=0;
	    }
    }
  }
</script>

