<template>
  <div>

    <!--右侧开始-->
    <div class="mainContent">

      <!--筛选条件开始-->
      <div class="hwui-search-bar">
        <ul class="hwui-search hwui-l-float">
          <li class="pl">学期选择：</li>
          <li>
            <select v-model="termId" @change="changeTerms()" class="hwui-select hwui-h hwui-w-mini hwui-radius2">
              <option v-for ="v in terms" :value="v.id">{{v.termname}}</option>
            </select>
          </li>
          <!--<li class="pl"><input type="button" class="hwui-btn hwui-btn-primary" value="查询" /></li>-->
        </ul>
        <div class="hwui-r-float">
          <input type="button" class="hwui-btn hwui-btn-submit" @click="ImportCLass()" value="导入课程" />
          <input type="button" class="hwui-btn hwui-btn-submit" @click="addChooseCourse()" value="新建选课任务" />
        </div>
      </div>
      <!--筛选条件结束-->

      <div class="choClassBox">
        <ul>
          <li v-for = "v in tasks">
            <div class="curriculumBox">
              <h3>{{v.title}}</h3>
              <div class="condition"><p>选课时间：{{v.startTime}}&nbsp;&nbsp;~&nbsp;&nbsp;{{v.overTime}}&nbsp;&nbsp;&nbsp;
                <span>{{v.taskStatus}}</span>
              </p></div>
              <div class="curriculumSet">
                <a style="cursor:pointer;" @click="toSetUp(v.id,v.status)" ><i class="icon xgk xgk-hj3"></i>选课设置</a>
                <a @click="toStuAdujust(v.id)"  v-show="v.status==1"><i class="icon xgk xgk-hj3"></i>学生调整</a>
                <a style="cursor:pointer;" v-show="v.status==1"   @click="toLookResult(v.id)"><i class="icon xgk xgk-hj3"></i>查看结果</a>
              </div>
              <div class="bts">
                <a class="compile" @click = "editeTasks(v.id,v.title,v.startTime,v.overTime)"><i class="icon xgk xgk-bianji"></i></a>
                <a class="compile dropTerm" @click = "delTasks(v.id)"><i class="icon xgk xgk-shanchu"></i></a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-show ="tasks.length==0" style="color: red;margin:11% 0 11% 36%;"><img  :src="noDataPic"/></div>
      <div class="hwui-clra"></div>
    </div>
    <!--右侧结束-->
    <!--列表新建-->
    <div id="layerEdit" class="hwui-layer" :style="{right:-layerWidth,width:layerWidth}">
      <div class="ld-title">
        <h3>新建信息</h3>
        <i class="hwui hwuifont hwui-shanchu ldt-close" @click="editClose()"></i>
      </div>
      <div class="ld-content-edit hwui-v-scroll">
        <div class="hwui-pa10 hwui-hidden">
          <ul class="hwui-form hwui-form-small">
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">选课标题：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1" style="height:42px;">
                <input type="text" v-model="taskTitle" class="hwui-text hwui-h-small hwui-w-all" />
              </div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">开始时间：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1" style="height:42px;">
                <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="sTime" style="width: 100%;"></el-date-picker>
              </div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3" >结束时间：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1" style="height:42px;">
                <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="eTime" style="width: 100%;"></el-date-picker>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="ld-content-btn">
        <input type="button" class="hwui-btn" @click="subTasks()" value="提交" />
        <input type="button" class="hwui-btn hwui-btn-close" @click="editClose()" value="取消" />

      </div>
    </div>
    <!--任务列表编辑-->
    <div id="layerEditDetail" class="hwui-layer" :style="{right:-layerWidth,width:layerWidth}">
      <div class="ld-title">
        <h3>编辑信息</h3>
        <i class="hwui hwuifont hwui-shanchu ldt-close" @click="editCloseDetail()"></i>
        <input type="text" v-model="taskEditId"/>
      </div>
      <div class="ld-content-edit hwui-v-scroll">
        <div class="hwui-pa10 hwui-hidden">
          <ul class="hwui-form hwui-form-small">
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">选课标题：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1" style="height: 42px;">
                <input type="text" v-model="taskTitleDetail" class="hwui-text hwui-h-small hwui-w-all" />
              </div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">开始时间：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1" style="height: 42px;">
                <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="sTimeDetail" style="width: 100%;"></el-date-picker>
              </div>
            </li>
            <li>
              <em class="hf-left hwui-w80 hwui-tar hwui-fc-txt3">结束时间：</em>
              <div class="hf-right hwui-wordwrap hwui-fc-txt1" style="height: 42px;">
                <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="eTimeDetail" style="width: 100%;"></el-date-picker>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="ld-content-btn">
        <input type="button" class="hwui-btn" @click="subTasksEdit()" value="提交" />
        <input type="button" class="hwui-btn hwui-btn-close" @click="editCloseDetail()" value="取消" />

      </div>
    </div>
    <!--任务列表编辑-->
    <!--  导入课程 -->
    <div id="layerEditImportCLass" class="hwui-layer" :style="{right:-layerWidth,width:layerWidth}">
      <div class="ld-title">
        <h3>导入课程</h3>
        <i class="hwui hwuifont hwui-shanchu ldt-close" @click="closeImportCLass()"></i>
      </div>
      <div class="ld-content-edit hwui-v-scroll">
        <div class="hwui-pa10 hwui-hidden">
          <div class="downloadBox">
            <el-button type="primary" style="display:block; width:200px; margin:10px auto;">下载模板</el-button>
            <div class="noticeMessage">
              <p>1、请下载模板，并按照模板格式填写，再导入数据</p>
            </div>
          </div>
          <div class="upLoadBox" style="width:100%;">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary" style="display:block; width:200px; margin:0 auto;">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
          </div>
        </div>
      </div>
      <div class="ld-content-btn">
        <!-- <input type="button" class="hwui-btn" @click="subTasks()" value="提交" /> -->
        <input type="button" class="hwui-btn hwui-btn-close" @click="closeImportCLass()" style=" width:100px;" value="取消" />

      </div>
    </div>
  </div>
</template>

<script>
  import  "../js/style.js";
  import {GMTToStr} from "../js/common.js";
  import User from '../../../mixins/user';
  import {mapState} from 'vuex';
  import store from '../vuex/store';
  const axiosConfig = require('../../../../static/conf/axios.conf');
  const baseurl = axiosConfig.getBaseUrl();
  import no_Data_Pic  from '../images/nodataXkBg.jpg'
  export default {
    components: {

    },
    store,
    mixins: [User],
    name: "indexPage",
    data() {
      return {
        fullScreen: false,
        layerWidth:'50%',
        terms:[],
        termId:"",
        tasks:[],
        userType:"",
        sTime:"",
        eTime:"",
        taskTitle:"",
        taskTitleDetail:"",
        sTimeDetail:"",
        eTimeDetail:"",
        taskEditId:"",
        noDataPic:no_Data_Pic,
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      }
    },
    mounted(){
  
    },
    computed: {
      ...mapState(['userModule'])
    },
    created(){
    this.router_intercep();//前端路由拦截
    this.findUserInfo();
    this.noDataPic = baseurl + this.noDataPic;
    this.selectTerms();

    },
    methods: {
      router_intercep(){
       if(window.user_Over_Type=='Student'){
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
      changeTerms(){
        this.findTask(this.termId);
      },
      //查询学期
      selectTerms(){

        this.$ajax.get('task/findTerms',{params:{

          }})
          .then((response)=>{
           this.terms = response.data;
           this.termId = this.terms[0].id;
           this.findTask(this.termId);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      findTask(tid){
        this.$ajax.get('task/findTasks',{params:{
          tremId:tid
          }})
          .then((response)=>{
           if(response.data.length==0){
             this.tasks = [];
             layer.msg("暂无选课任务！");
             return;
           }else{
             this.tasks = response.data;
           }

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      delTasks(tid){

        let lookattisFunc = this.lookattis;
        //询问框
        layer.confirm('这将丢失与此任务有关的数据，您确定要删除吗？', {
          btn: ['确定','取消'] //按钮
        }, function(){
          lookattisFunc(tid);
        }, function(){
           layer.closeAll();
        });

      },
      logout() {
        Message.info(`退出`);
      },
      lookattis(tid){
        //删除
        this.$ajax.get('task/delTasksById',{params:{
          taskId:tid
        }})
          .then((response)=>{
            if(response.data>0){
              layer.msg("删除成功！");
              this.findTask(this.termId);
            }else{
              layer.msg("删除失败！");
            }

          })
          .catch(function (error) {
            console.log(error);
          });

      },
      clickHeadItem(id, label) {
        for (let row of this.headMenu.items) {
          if (row.id == id) {
            row.selected = true;
            this.$router.push({name: row.routerName});
          } else {
            row.selected = false;
          }
        }
      },
      addChooseCourse(){                          //新建选课任务
        this.taskTitle ="";
        this.sTime ="";
        this.eTime ="";
        this.layerOpen($('#layerEdit'));
      },
      ImportCLass(){
        this.layerOpen($('#layerEditImportCLass'));
      },
      closeImportCLass(){
        this.layerClose($('#layerEditImportCLass'));
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
      subTasks(){
        if(this.taskTitle.trim()==""){
          layer.msg("标题不能为空");
          return;
        }
        if(this.taskTitle.length>25&&this.taskTitle.trim()!=""){
          layer.msg("标题长度最常25字符");
          return;
        }
        if(this.sTime==""){
          layer.msg("开始日期不能为空");
          return;
        }
        if(this.eTime==""){
          layer.msg("结束日期不能为空");
          return;
        }
        if(new Date(this.sTime)>=new Date(this.eTime)){
          layer.msg("结束日期必须大于开始日期");
          return;
        }
        //保存提交
      this.$ajax.get('task/saveTasks',{params:{
          taskTitle:this.taskTitle,
          sTime:GMTToStr(this.sTime),
          eTime:GMTToStr(this.eTime),
          termId:this.termId
          }})
          .then((response)=>{
           if(response.data.flag){
            layer.msg("新建成功");
            this.editClose();
            this.findTask(this.termId);
           }else{
             layer.msg(response.data.msg);
           }
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      editeTasks(tid,title,stime,etime){
        this.layerOpen($('#layerEditDetail'));
        this.taskTitleDetail =title;
        this.sTimeDetail = stime;
        this.eTimeDetail = etime;
        this.taskEditId = tid;


      },
      editCloseDetail(){
        this.layerClose($('#layerEditDetail'));
      },
      subTasksEdit(){
        if(this.taskTitleDetail.trim()==""){
          layer.msg("标题不能为空");
          return;
        }
        if(this.taskTitleDetail.length>25&&this.taskTitleDetail.trim()!=""){
          layer.msg("标题长度最常25字符");
          return;
        }
        if(this.sTimeDetail==""){
          layer.msg("开始日期不能为空");
          return;
        }
        if(this.eTimeDetail==""){
          layer.msg("结束日期不能为空");
          return;
        }
        if(new Date(this.sTimeDetail)>=new Date(this.eTimeDetail)){
          layer.msg("结束日期必须大于开始日期");
          return;
        }
        //保存编辑提交
        this.$ajax.get('task/editTasks',{params:{
          taskTitle:this.taskTitleDetail,
          sTime:GMTToStr(this.sTimeDetail),
          eTime:GMTToStr(this.eTimeDetail),
          taskEditId:this.taskEditId
        }})
          .then((response)=>{
            if(response.data.flag){
              layer.msg("编辑成功");
              this.editCloseDetail();
              this.findTask(this.termId);
            }else{
              layer.msg(response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error);
          });


      },
      //跳转选课设置页面
      toSetUp(tid,status){
         this.$router.push({
         name:"SetUp",
         params: { setTaskId: tid,
                  setStatus:status
          }
       });
      },
      //跳转选课设置页面
      toStuAdujust(tid){
        this.$router.push({
          name:"studentAdjust",
          params: { taskId: tid }
        });
      },
      //跳转到查看结果页面
      toLookResult(tid){
         this.$router.push({
         name:"LookResult",
         params: { looktaskId: tid }
       });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }

    }
  }
</script>

<style scoped>

</style>

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
