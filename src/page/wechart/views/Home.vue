<template>
<div>
    <div v-show="!sflag" class="mainBack">
      <div class="mainList">
        <div class="mainList_1">
          <div class="xuanke">
            <!--<p>{{taskTitle}}<em class="sj"></em></p>
            <ul>
              <li @click="changeTerms(v.id)" v-for="v in tasks">{{v.title}}</li>
            </ul>-->
            <select v-model="taskId">
              <option v-for="v in tasks" :value="v.id">{{v.title}}</option>
            </select>
          </div>
          <div class="choList">
            <span  v-show="new Date(task.startTime)>new Date()">(未开始)</span>
            <span  v-show="new Date()>new Date(task.startTime)&&new Date(task.overTime)>new Date()">(进行中)</span>
            <span  v-show="new Date()>new Date(task.overTime)">(已结束)</span>
          </div>
          <div class="choList">
            <ul>
              <li>
                <em>开始时间</em>
                <div class="rightContent">
                  <p>{{task.startTime}}</p>
                  <!--<div class="dateBox"><input class="text" type="datetime-local" placeholder="请选择开始时间" /><span class="icon"><i class="icon iconfont icon-riqishijian"></i></span></div>-->
                </div>
              </li>
              <li>
                <em>结束时间</em>
                <div class="rightContent">
                  <p>{{task.overTime}}</p>
                  <!--<div class="dateBox"><input class="text" type="datetime-local" placeholder="请选择开始时间" /><span class="icon"><i class="icon iconfont icon-riqishijian"></i></span></div>-->
                </div>
              </li>
              <li>
                <!--<em>我可以选择的科目</em>-->
                <div class="rightContent">
                  <p>限选课程数量<span>{{task.limitNums}}</span></p>
                <!--  <p>文体类别限选课程数量<span>3</span></p>-->
                  <!--<div class="checkboxBts">
                                <label><input type="checkbox" />语文</label>
                            </div>-->
                </div>
              </li>

            </ul>
          </div>

          <div class="choResult"><h4><span>您已选择</span></h4>
             <div class="resultMessage"><p><span v-for="v in courseNames">{{v.courseName}}</span></p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="bottomBts">
        <input type="button" @click="toClassCho" name="" id="" value="开始选课" />
      </div>
    </div>
     <div v-show="sflag"><img style=" width:80%; position:fixed; left:0; top:0; right:0; bottom:0; margin:auto;" :src="quePic"/></div>
     </div>
</template>

<script type="text/javascript">
  import "../js/style";
  import "../js/jquery-1.11.3.min";
  //使用混合
  import User from '../../../mixins/user';
  import wechartHead from './wechartHead';
  import que_pic from '../images/qsy.png';
  const axiosConfig = require('../../../../static/conf/axios.conf');
  const baseurl = axiosConfig.getBaseUrl();
  export default {
    components: {
      wechartHead
    },
    name: "Home",
    data(){
      return {
        tasks: [],
        taskId:'',
        taskTitle:'',
        task:{},
        courseNames:[],
        sflag:false,
        quePic:que_pic
      }
    },
    mixins: [User],
    created() {
      this.quePic = baseurl + this.quePic;
      this.findUserInfo();
      this.selectask();
    },

    watch:{
      'taskId' : {
        handler : function(n, o) {
          if (n != o) {
            this.changeTerms(n);
          }
        },
        deep : true
      }
    },
    methods:{
      selectask(){
        this.$ajax.get('stu/getSelectXkTask', {
          params: {

          }
        })
          .then((response) => {
            if (response.data.length>0) {
              this.tasks = response.data;
              this.taskTitle= this.tasks[0].title;
              this.taskId = this.tasks[0].id
              this.changeTerms(this.tasks[0].id);
              this.sflag = false;
            } else {
             this.sflag = true;
             return;

            }

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //根据班级查询选课任务
      changeTerms: function (taskId) {
        this.$ajax.get('stu/getXkTaskCourse', {
          params: {
            taskId: taskId,
            key:'APP'
          }
        })
          .then((response) => {
            if (response.data.task == null) {
              this.tasks = new Array();
              layer.msg("暂无选课任务！");
            } else {
              this.task = response.data.task;
              this.courseNames=response.data.courseName;
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //跳转选课设置页面
      toClassCho(){
        if(new Date()>new Date(this.task.overTime)){
          layer.msg('选课已经结束');
          return;
        }
        var taskId=this.taskId;
        var overTime = this.task.overTime;
        var startTime = this.task.startTime;
        this.$router.push({
          name:"classCho",
          params: { 
          taskId:taskId,
          overTime:overTime,
          startTime:startTime

          }
        });
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
              this.taskId= response.data.taskId;
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //跳转到详情
      stuCoursePage(cid){
        this.$router.push({
          name:"sunjectDetails",
          params: { cid:cid}
        });
      }
    }

  }

  $(document).ready(function () {
    $(".xuanke p").click(function(){
      alert(1111);
      $(this).next().slideToggle();
      event.stopPropagation();
    })

    $(".xuanke").click(function () {
      event.stopPropagation();
    })

    $(".xuanke").parents().click(function () {
      $(".xuanke ul").hide();
    })

  })

</script>

