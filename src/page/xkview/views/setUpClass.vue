
	
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
						<a @click="toSetUpClass()">选课设置(设置参与班级)</a>
					</span>
				</div>
				<div class='hwui-r-float'><a  @click="index()">返回</a></div>
			</div>
			
			<div class="stepLinkList">
				<a @click="toSetUp()">设置选课课程</a>
				<a class="on" @click="toSetUpClass()">设置参与班级</a>
				<a @click="toSetUpRestrict()">设置限制条件</a>
				<div class="hwui-clra"></div>
			</div>
		
			<div id="panel-main" class="hwui-right-content" style="border:none;top:55px;left:20px; right: 20px; bottom:20px;" title="">
				<!--筛选条件开始-->
				<div class="hwui-search-bar">
					<div class="hwui-r-float">
						<input type="button" class="hwui-btn hwui-btn-submit" @click="addClass" value="班级管理" />
					</div>
					<div class="clra"></div>
				</div>
				<!--筛选条件结束-->
				<div id="panel-sub" class="easyui-panel" style="border:none;" title="">
					
					
					<div id="dataTable" class="dataTable" style="position: fixed; left:20px; right:20px; top:155px; bottom:20px; margin:auto;">
					    <el-table :data="taskClassList" border class="dadadada" style="width: 100%" height="80%">
								<el-table-column type="index" width="50"></el-table-column>
						    <el-table-column prop="gradeName" label="年级"></el-table-column>
						    <el-table-column prop="className" label="班级"></el-table-column>
						    <el-table-column prop="sectionName" label="学段"></el-table-column>
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
				<h3>班级管理</h3>
				<i class="hwui hwuifont hwui-shanchu ldt-close" @click="editClose"></i>
			</div>
			<div class="tcForm">
				<div class="classCho">
				<div class="classBox">
					<h4><span>年级</span></h4>
					<ul>
						<li v-for="(grade,index) in gradeList" :class="[gradeFlag==index ? 'on' : '' ]"
						@click="chooseGrade(index,grade.id,grade.orgName)">{{grade.orgName}}</li>
					</ul>
				</div>
				<div class="classBox">
					<h4><span>班级</span></h4>
					<ul>
						<li v-for="(cla,index) in classList" :class="[classFlag.indexOf(cla.id)>-1 ? 'on' : '' ]" 
						@click="gradet(index,cla.id,cla.orgName,cla.section)">{{cla.orgName}}</li>
					</ul>
				</div>
				
				<div class="resultBox">
				<h4><span>已选班级</span><a @click="removeAll()">清空</a></h4>
				<ul>
					<li v-for="ccls in chooseList"><span>{{ccls.gradeName}}</span><span>{{ccls.className}}</span><a class="drop" @click="removeTaskClass(ccls.id,ccls.gradeId)"><i class="icon xgk xgk-shanchu1"></i></a></li>
				</ul>
				</div>
				<div class="hwui-clra"></div>
				</div>
			</div>

			<div class="ld-content-btn">
				<!--<input type="button" class="hwui-btn" value="提交" />-->
				<input type="button" class="hwui-btn hwui-btn-close" @click="editClose" value="关闭" />
				
			</div>
		</div>
		<!--列表编辑结束-->
	</div>
</template>	

<script>
  import  "../js/style.js";
  import {mapState} from 'vuex';

  import User from '../../../mixins/user';
  import generalHead from './generalHead';
  export default {
    components: {
      generalHead
    },
    name: "SetUpClass",

    mixins: [User],

    data() {
      return {
        layerWidth:'50%',
        taskClassList:[],
        classList:[],
        gradeList:[],
        chooseList:[],
        gradeFlag:'-1',
        classFlag:[],
        taskId:this.$route.params.setTaskId,
				isPublish:this.$route.params.setStatus,
				listStyleMark:this.$route.params.listStyle,
        currGradeId:'',
        currGradeName:'',
        currClassId:'',
        currClassName:'',
        currSec:'',
        currSecId:''
      }
    },

    computed: {
      ...mapState(['userModule'])
    },
    created(){
       this.router_intercep();//前端路由拦截
       this.getTaskClassList();
       this.getGradeList();
       //this.getchooseList();
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
         	 params: { setTaskId: this.taskId,setStatus:this.isPublish,listStyle:this.listStyleMark}
	       });
	    },
	    //跳转参与班级页面
	    toSetUpClass(){
       		this.$router.push({
         	name:"SetUpClass",
         	params: { setTaskId: this.taskId,setStatus:this.isPublish,listStyle:this.listStyleMark}
           });
        },
      	//跳转限制条件页面
      	toSetUpRestrict(){
	       this.$router.push({
	         name:"SetUpRestrict",
         	 params: { setTaskId: this.taskId,setStatus:this.isPublish,listStyle:this.listStyleMark}
	       });
      	},
      	//跳转首页
	      index(){
	       this.$router.push({
	         name:"IndexPage1"
	       });
	      },
      	getTaskClassList(){
	      	this.$ajax.get('taskClass/taskClassList',{params:{taskId:this.taskId}})
	          .then((response)=>{
	                this.taskClassList = response.data;
	                this.chooseList = response.data;
				    this.chooseClassCss();
	          })
	          .catch(function (error) {
	            console.log(error);
	          });
      	},
      	getchooseList(){
	      	this.$ajax.get('taskClass/taskClassList',{params:{}})
	          .then((response)=>{
	               
					this.chooseList = response.data;
					this.chooseClassCss();
	               
	          })
	          .catch(function (error) {
	            console.log(error);
	          });
      	},
      	addTaskClass(){
	      	this.$ajax.get('taskClass/addTaskClass',{params:{
	      		taskId:this.taskId,
	      		currGradeName:this.currGradeName,
	      		currGradeId:this.currGradeId,
	      		currClassName:this.currClassName,
	      		currClassId:this.currClassId,
	      		currSec:this.currSec,
	      		currSecId:this.currSecId}})
	          .then((response)=>{
	               if(response.data.flag){
	                 //this.getchooseList();
	                 this.getTaskClassList();
	               }else{
	               		layer.msg(response.data.msg);
	               		return;
	               }
	          })
	          .catch(function (error) {
	            console.log(error);
	          });
      	},
      	getClassList(gradeId){
	      	this.$ajax.get('taskClass/classList',{params:{gradeId:gradeId}})
	          .then((response)=>{

	               if(response.data.length==0){
	                 layer.msg("暂无班级！");
	                 return;
	               }else{
	                 this.classList = response.data;
	               }
	          })
	          .catch(function (error) {
	            console.log(error);
	          });
      	},
      	getGradeList(){
	      	this.$ajax.get('taskClass/gradeList')
	          .then((response)=>{
	               if(response.data.length==0){
	                 layer.msg("暂无年级！");
	                 return;
	               }else{
	                 this.gradeList = response.data;
	               }
	          })
	          .catch(function (error) {
	            console.log(error);
	          });
      	},
      	//初始化表单数据
	    initForm(){
	          
	    },
		//选择年级查班级
		chooseGrade: function(index,gradeId,gradeName){
			
			this.gradeFlag = '-1';
			this.classFlag = [];
			this.chooseList = [];

			this.gradeFlag=index;
			this.currGradeId = gradeId;
        	this.currGradeName = gradeName;
			this.classList = [];
			this.getClassList(gradeId);
						
			//this.getchooseList();
	        this.getTaskClassList();

	        
		},
		//选择班级添加到选择列表
		gradet : function(index,classId,className,section){
			//alert(index+'---'+classId+'---'+className);
			this.classFlag.push(classId);
			this.currClassId = classId;
        	this.currClassName = className;
        	this.currSec = section;
        	if(section=='小学'){this.currSecId='1';}
			else if(section=='初中'){this.currSecId='2';}
			else{this.currSecId='3';}
			//判断是否已添加
			this.$ajax.get('taskClass/isTaskClassExit',{params:{classId:classId,taskId:this.taskId}})
	          .then((response)=>{

	               if(response.data>0){
	                 layer.msg("班级已添加！");
	                 return;
	               }else{
	                 this.addTaskClass();
	               }
	          })
	          .catch(function (error) {
	            console.log(error);
	          });
		},
		removeTaskClass(id,gradeId){
			this.$ajax.get('taskClass/removeTaskClass',{params:{id:id}})
	            .then((response)=>{
	                if(response.data.flag){
	                	this.chooseList = [];
		                //this.getchooseList();
	        			this.getTaskClassList();
	                }else{
	                	layer.msg(response.data.msg);
		                return;
	                }
	        })
	          .catch(function (error) {
	            console.log(error);
	        });
		},
		removeAll(){
			var ids = '';
			for(var i=0;i<this.chooseList.length;i++){
				ids = ids + this.chooseList[i].id + ',';
			}
			ids = ids.substring(0,ids.length-1);
			if(ids==''){
				return;
			}
			this.$ajax.get('taskClass/removeAll',{params:{ids:ids}})
	            .then((response)=>{
	                if(response.data.flag){
	                	this.chooseList = [];
		                //this.getchooseList();
	        			this.getTaskClassList();
	                }else{
	                	layer.msg(response.data.msg);
		                return;
	                }
	        })
	          .catch(function (error) {
	            console.log(error);
	        });
		},
		//判断是否选择样式
		chooseClassCss(){
			this.classFlag = [];
			for(var i=0;i<this.classList.length;i++){
				for(var j=0;j<this.chooseList.length;j++){
					if(this.classList[i].id==this.chooseList[j].classId){
						this.classFlag.push(this.classList[i].id);
					}
				}
			}


		},
      	addClass(){
	        this.initForm();
	        this.layerOpen($('#layerEdit'));
	    },
	    editClass(){
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
	    }
      
    }

  }
</script>