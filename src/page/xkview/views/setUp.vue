<template>
  <div>
    <!--右侧开始-->
    <div class="hwui-right hwui-hidden">
      <div class="hwui-fold-btn" :style="{background:'url('+foldBtnBg+')'}"></div>
      <div class="hwui-crumbs-main">
        <div class="hwui-l-float">
          <a @click="index()">首页</a>
          <span>
							<em class="hwui-plr10">&gt;</em>
							<a @click="toSetUp()">选课设置(设置选课课程)</a>
						</span>
        </div>
        <div class='hwui-r-float'><a  @click="index()">返回</a></div>
      </div>

      <div class="stepLinkList">
        <a class="on" @click="toSetUp()">设置选课课程</a>
        <a @click="toSetUpClass()">设置参与班级</a>
        <a @click="toSetUpRestrict()">设置限制条件</a>
        <div class="hwui-clra"></div>
      </div>

      <div id="panel-main" class="hwui-right-content" style="border:none;top:55px;left:20px; right: 20px; bottom:20px;" title="">
        <!--筛选条件开始-->
        <div class="hwui-search-bar">
          <div class="hwui-r-float">
            <input type="button" class="hwui-btn hwui-btn-submit" value="导出课程" @click="exportCourse()"/>
            <input type="button" class="hwui-btn hwui-btn-submit" @click="ImportCLass()" value="导入课程" />
            <input type="button" class="hwui-btn hwui-btn-submit" @click="addCourse" value="新建课程" />
          </div>
          <div class="clra"></div>
        </div>
        <!--筛选条件结束-->
        <div id="panel-sub" class="easyui-panel" style="border:none;" title="">


          <div id="dataTable" class="dataTable" style="position: fixed; left:20px; right:20px; top:155px; bottom:20px; margin:auto;">
            <el-table :data="courseList" border class="dadadada" style="width: 100%" height="80%">
              <el-table-column prop="courseName" label="课程名称"></el-table-column>
              <el-table-column prop="teacherName"  label="任课老师"></el-table-column>
              <el-table-column prop="courseTime"  label="上课时间"></el-table-column>
              <el-table-column prop="courseSection"  label="上课节次"></el-table-column>
              <el-table-column prop="classroom"  label="上课教室"></el-table-column>
              <el-table-column prop="limitPers"  label="限选人数"></el-table-column>
              <el-table-column fixed="right" prop="operation" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="update(scope.row.id,scope.row.courseName,
                    scope.row.teacherId,scope.row.teacherName,scope.row.limitPers,scope.row.courseTime,
                    scope.row.courseSection,scope.row.classroom,scope.row.sex,scope.row.courseIntro,
                    scope.row.courseImg)">编辑</el-button>
                  <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!--右侧结束-->

    <!--列表编辑开始-->
      <div id="layerEdit" class="hwui-layer" :style="{right:-layerWidth,width:layerWidth}">
        <div class="ld-title">
          <h3>{{form.lab}}</h3>
          <i class="hwui hwuifont hwui-shanchu ldt-close" @click="editClose"></i>
        </div>

        <div class="tcFormS">
        <el-form ref="form"  :model="form" :rules="rules" label-width="80px" size="small">
          <el-form-item label="课程名称" prop="courseName">
            <el-input v-model="form.courseName" maxlength="60"></el-input>
          </el-form-item>
          <el-form-item label="任课教师" prop="teacherName">
            <el-autocomplete class="inline-input" v-model="form.teacherName" placeholder="请输入教师名称"
            :fetch-suggestions="querySearch" @select="handleSelect"  style="width:100%;"></el-autocomplete>
          </el-form-item>
          <el-form-item label="限选人数" prop="limitNumber">
            <el-input v-model="form.limitNumber" type="number" max="200" min="0"></el-input>
          </el-form-item>
          <el-form-item label="上课时间"  prop="classTime">
            <el-select v-model="form.classTime" placeholder="请选择星期" style="width:100%;">
              <el-option label="星期一" value="星期一"></el-option>
              <el-option label="星期二" value="星期二"></el-option>
              <el-option label="星期三" value="星期三"></el-option>
              <el-option label="星期四" value="星期四"></el-option>
              <el-option label="星期五" value="星期五"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上课节次"  prop="section">
            <el-select v-model="section" placeholder="请选择课节" multiple style="width:100%;">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上课教室">
            <el-input v-model="form.classRoom" maxlength="60"></el-input>
          </el-form-item>
          <el-form-item label="适应性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="不限" value="0"></el-radio>
              <el-radio label="男" value="1"></el-radio>
              <el-radio label="女" value="2"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="课程简介">
            <p>(<span style="color:red;">{{form.remarkLength}}</span>/300个字符)</p>
            <el-input type="textarea" v-model="form.desc" :rows="7" maxlength=300></el-input>
          </el-form-item>
          <el-form-item label="课程图片">
            <el-upload
              class="upload-demo"
              :action="uploadPath"
              :format="['jpg', 'png']"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :before-upload="beforeUpload"
              :on-success = 'handleSuccess'
              :file-list="form.fileList"
              :limit="1"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传1张图片（支持jpg/png）</div>
            </el-upload>
          </el-form-item>
        </el-form>
        </div>


        <div class="ld-content-btn">
          <input type="button" class="hwui-btn" value="提交" @click="submit"/>
          <input type="button" class="hwui-btn hwui-btn-close" @click="editClose" value="取消" />

        </div>
      </div>
      <!--列表编辑结束-->

      <!--  导入课程 -->
    <div id="layerEditImportCLass" class="hwui-layer" :style="{right:-layerWidth1,width:layerWidth1}">
      <div class="ld-title">
        <h3>导入课程</h3>
        <i class="hwui hwuifont hwui-shanchu ldt-close" @click="closeImportCLass()"></i>
      </div>
      <div class="ld-content-edit hwui-v-scroll">
        <div class="hwui-pa10 hwui-hidden">
          <div class="downloadBox">
            <el-button type="primary" style="display:block; width:200px; margin:10px auto;" @click="downLoadDocument()">下载模板</el-button>
            <div class="noticeMessage">
              <p>请下载模板，并按照模板格式填写，再导入数据</p>
            </div>
          </div>
          <div class="upLoadBox" style="width:100%;">
              <el-upload
                class="upload-demo"
                :action="uploadPathNew"
                :data="keysss"
                :format="['xls','xlsx']"
                :on-preview="handlePreviewNew"
                :on-remove="handleRemove"
                :on-change="handleChange"
                :before-upload="beforeUP"
                :on-success="handleSuccessNew"
                :file-list="formNew.fileList"
                :limit="1"
                list-type="picture"
                >
                <el-button type="primary" style=" display:block; width:200px; margin:10px auto;">点击上传</el-button>
                <div slot="tip" class="el-upload__tip" style="text-align:center;">请上传xls、xlsx的文件</div>
              </el-upload>
              <dl class="successUpload">
                  <dt><i class="el-icon-circle-check-outline"></i></dt>
                  <dd>课程已导入</dd>
              </dl>
              <dl class="failUpload">
                  <dt><i class="el-icon-circle-close-outline"></i></dt>
                  <dd>课程未导入</dd>
              </dl>
          </div>
        </div>
      </div>
      <div class="ld-content-btn">
        <!-- <input type="button" class="hwui-btn" @click="shangchuan()" value="提交" /> -->
        <input type="button" class="hwui-btn hwui-btn-close" @click="closeImportCLass()" style=" width:100px;" value="取消" />

      </div>
    </div>
 <!--  导入课程结束 --> 

  </div>
</template>

<script>
  import  "../js/style.js";
  import {mapState} from 'vuex';
  const axiosConfig = require('../../../../static/conf/axios.conf');
  const baseURL = axiosConfig.getBaseUrl();//axios 全局设置
  import axios from 'axios';//引入axios
  import fold_Btn_Bg from '../images/foldBtn.png'
  import User from '../../../mixins/user';
  import generalHead from './generalHead';
import { setTimeout } from 'timers';
  export default {
    components: {
      generalHead
    },
    name: "setUp",

    mixins: [User],

    data() {
      return {
        courseList:[],
        foldBtnBg:fold_Btn_Bg,
        layerWidth:'50%',
        layerWidth1:'30%',
        taskId:this.$route.params.setTaskId,
        keysss:{
          taskId:this.$route.params.setTaskId,
          ucId:this.$store.state.ucId
        },
        isPublish:this.$route.params.setStatus,
        teacherList : [],
        options: [
          {value: '第一节',label: '第一节'},
          {value: '第二节',label: '第二节'},
          {value: '第三节',label: '第三节'},
          {value: '第四节',label: '第四节'},
          {value: '第五节',label: '第五节'},
          {value: '第六节',label: '第六节'},
          {value: '第七节',label: '第七节'},
          {value: '第八节',label: '第八节'},
          {value: '第九节',label: '第九节'},
          {value: '第十节',label: '第十节'}
        ],
        section: ['第一节'],
        form: {
            id:'',
            courseName: '',
            teacherId: '',
            teacherName: '',
            limitNumber: '0',
            classTime: '星期一',
            classRoom:'',
            sex: '不限',
            desc: '',
            remarkLength: '0',
            courseImg:'',
            fileList : [],
            lab:'新建课程',
            isUpload:0
        },
        rules:{
          courseName:[{ required: true, message: '请输入课程名称', trigger: 'blur' }],
          teacherName:[{required: true, message: '请输入老师名称', trigger: 'change'}],
          limitNumber:[{required: true, message: '请输入限选人数', trigger: 'blur'}],
          classTime:[{required: true, message: '请选择上课时间', trigger: 'change'}],
          section:[{required: true, message: '请选择上课节次', trigger: 'blur'}]
        },
        formNew:{
            name:'',
            courseImg:'',
            fileList : [],
            isUpload:0
        },
        

      }
    },
    watch:{
      'form.desc':{
        handler:function(n,o){
          this.form.remarkLength=this.form.desc.length;
          if (n!=o && n!='' && n!=null) {
            this.lenths=this.form.desc.length;
            if (this.lenths>300) {
              layer.msg('不可大于300个字符');
            }
          }
        }
      }
    },
    computed: {
      ...mapState(['userModule']),
      uploadPath() {
        return `${window.projectConf.serverPath}taskCourse/uploadImg`;
      },
      uploadPathNew() {
        return `${window.projectConf.serverPath}load/uploadExcel`;
      }
    },
    created(){
       this.foldBtnBg = baseURL + this.foldBtnBg;
       this.getCourseList();
       this.loadAllTeacher();
       this.router_intercep();//前端路由拦截
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
      //获取选课课程列表
      getCourseList(){
        let that = this;
          that.$ajax.get('taskCourse/courseList',{params:{taskId:that.taskId}})
          .then((response)=>{
            // console.log(that.$store.state.ucId);
               if(response.data.length==0){
                 return;
               }else{
                 that.courseList = response.data;
               }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      submit(){

        if(this.form.courseName == ''){
          layer.msg("课程名称不能为空");
          return;
        }
        if(this.form.teacherName == ''){
          layer.msg("教师名称不能为空");
          return;
        }
        if(this.section.length==0){
          layer.msg("上课节次不能为空");
          return;
        }
        if(this.isUpload==0){
          layer.msg("图片正在上传中，请稍后");
          return;
        }

        //保存提交
        this.$ajax.get('taskCourse/submit',{params:{
            id:this.form.id,
            taskId:this.taskId,
            courseName: this.form.courseName,
            teacherId: this.form.teacherId,
            teacherName: this.form.teacherName,
            limitNumber: this.form.limitNumber,
            classTime: this.form.classTime,
            section: this.section.join(","),
            classRoom:this.form.classRoom,
            sex: this.form.sex,
            desc: this.form.desc,
            courseImg: this.form.courseImg
          }})
          .then((response)=>{
           if(response.data.flag){
            layer.msg("保存成功");
            this.editClose();
            this.getCourseList();
           }else{
             layer.msg(response.data.msg);
           }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //修改
      update(id,courseName,teacherId,teacherName,limitNumber,classTime,section,
            classRoom,sex,desc,courseImg){
            this.initForm();
            this.form.id = id;
            this.form.courseName = courseName;
            this.form.teacherId = teacherId;
            this.form.teacherName = teacherName;
            this.form.limitNumber = limitNumber;
            this.form.classTime = classTime;
            this.form.classRoom = classRoom;
            this.form.desc = desc==null?"":desc;
            this.section = section.toString().split(",");
            this.form.courseImg = courseImg;
            if(courseImg!=null&&courseImg!=''){
              this.form.fileList.push({name:'上传图片',url:courseImg});
            }
            this.form.lab = '编辑课程';

            if(sex=='0'){
              this.form.sex = '不限';
            }else if(sex=='1'){
              this.form.sex = '男';
            }else{
              this.form.sex = '女';
            }

            this.editCourse();
      },
      //删除
      del(id){

            let delCour = this.deleteCourse;
                     //询问框
            layer.confirm('您确定要删除吗？', {
              btn: ['确定','取消'] //按钮
            }, function(){
              delCour(id);
            }, function(){
               layer.closeAll();
            });
      },
      deleteCourse(id){
        this.$ajax.get('taskCourse/del',{params:{id:id}})
          .then((response)=>{
               if(response.data.flag){
                  this.getCourseList();
                  layer.msg("删除成功");
                 
                }else{
                  layer.msg(response.data.msg);
                }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //初始化表单数据
      initForm(){
          this.form.id = '';
          this.form.courseName = '';
          this.form.teacherId = '';
          this.form.teacherName = '';
          this.form.limitNumber = '0';
          this.form.classTime = '星期一';
          this.form.classRoom = '';
          this.form.desc = '';
          this.section = ['第一节'];
          this.form.courseImg = '';
          this.form.fileList = [];
          this.form.lab = '新建课程';
      },
      addCourse(){
        this.initForm();
        this.layerOpen($('#layerEdit'));
      },
      editCourse(){
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
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
          var id = this.form.id;
          if(id!=''){
              this.$ajax.get('taskCourse/delImg',{params:{taskId:this.taskId,id:id}})
              .then((response)=>{
                   if(response.data.flag){
                     layer.msg('删除课程图片成功');
                     this.form.courseImg = '';
                   }else {
                     layer.msg(response.data.msg);
                   }
              })
              .catch(function (error) {
                console.log(error);
              });
          }else{//新建
              this.form.courseImg = '';
          }

      },
      handlePreview(file) {

      },
      handlePreviewNew(file) {
        console.log(file);
      },
      handleChange(file, fileList){
        //alert(2);
        //console.log(file);
      },
      beforeUpload: function (file) {
        //alert(3);
        this.isUpload = 0;
      },
      handleSuccess(res,file,fileList){
        //console.log(file);
        this.formNew.courseImg = file.response;
        console.log(this.formNew);
        this.getCourseList();
        this.isUpload = 1;
      },
      handleSuccessNew(response,file,fileList){
        // console.log(123);
        console.log(response)
        if(response.flag){
            document.getElementsByClassName("successUpload")[0].style.display = "block";
        }else{
            document.getElementsByClassName("failUpload")[0].style.display = "block";
        }
        setTimeout(function(){
            document.getElementsByClassName("successUpload")[0].style.display = "none";
            document.getElementsByClassName("failUpload")[0].style.display = "none";
        },5000)
        this.formNew.courseImg = file.response;
        this.isUpload = 1;
      },
      querySearch(queryString, cb) {
        var teacherList = this.teacherList;
        var results = queryString ? teacherList.filter(this.createFilter(queryString)) : teacherList;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAllTeacher() {
        this.$ajax.get('taskCourse/getTeacherList')
              .then((response)=>{
                   if(response.data.length>0){
                      var tList = response.data;
                      tList.forEach(v=>{
                        v.value = v.realName;
                      });
                      this.teacherList = tList;
                    }
              })
              .catch(function (error) {
                console.log(error);
              });
      },
      handleSelect(item) {
       this.form.teacherName = item.realName;
       this.form.teacherId = item.id;
      },
      //导出
      exportCourse(){
        var params = new URLSearchParams();
        params.append('courseList', JSON.stringify(this.courseList));
        this.$ajax.post('taskCourse/exportCourse',params)
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
      },
      ImportCLass(){
        this.layerOpen($('#layerEditImportCLass'));
      },
      closeImportCLass(){
        this.layerClose($('#layerEditImportCLass'));
      },
      beforeUP(file){
        this.isUpload = 0;
          // console.log(file,'文件');
          let that = this;
          that.files = file;
          const extension = file.name.split('.')[1] === 'xls'
          const extension2 = file.name.split('.')[1] === 'xlsx'
          const isLt2M = file.size / 1024 / 1024 < 10
          if (!extension && !extension2) {
            that.$message.warning('上传模板只能是 xls、xlsx格式!')
          }
          if (!isLt2M) {
             that.$message.warning('上传模板大小不能超过10MB!')
          }
            that.formNew.name = file.name;
          
          let isPass = (extension||extension2) && isLt2M;
          if(isPass){
               that.$message.success('正在上传中')
          }
            return isPass; // 返回false不会自动上传
      },
      downLoadDocument(){
        window.open(baseURL+"/load/downloadExcel");
      },
      shoudongshangchuan(){
        let that = this;


      }
      


    }

  }
</script>

<style scoped>
.hwui-layer >>> .el-upload{ display: block; text-align:center;}
.hwui-layer >>> .el-upload-list{ display: none;}
.successUpload{ text-align: center; position: relative; margin:20px auto; color: #65bb25; display:none;}
.successUpload dt{ padding: 0 0 10px;}
.successUpload dd{ font-size: 16px;}
.successUpload i{ font-size:70px;}
.failUpload{ text-align: center; position: relative; margin:20px auto; color: #F00; display:none;}
.failUpload dt{ padding: 0 0 10px;}
.failUpload dd{ font-size: 16px;}
.failUpload i{ font-size:70px;}
</style>

