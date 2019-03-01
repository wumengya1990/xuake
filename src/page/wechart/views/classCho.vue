<template>
      <div class="mainBack">
      <div class="mainList">
        <div class="backTop">
          <span>课程选择</span>
          <a onclick="window.history.back()"><i class="icon iconfont icon-fanhui"></i></a></div>
      <div class="mainList_1">

          <div class="classContent">

            <div class="subject" v-for="v in textboxs" @click="stuCoursePage(v.id)">
              <h3>{{v.courseName}}</h3>
              <ul>
                <li><em>任课教师</em><div class="Rmessage">{{v.teacherName}}</div></li>
                <li><em>已选人数</em><div class="Rmessage">{{v.count}}</div></li>
                <li><em>限选人数</em><div class="Rmessage">{{v.limitPers}}</div></li>
                <li><em>限选性别</em><div class="Rmessage">{{v.ssex}}</div></li>
              </ul>
              <div class="bts">
                <input v-show="new Date()>new Date(startTime)&&new Date(overTime)>new Date()" @click.stop="selectCourse(v.id,v.courseFlag,v.taskId,v.limitCours,v.classifyId,v.limitNums,v.ssex)"
                       type="button" :value="v.courseFlag" />
              </div>
            </div>
          </div>
        </div>
      </div>
   <!--   <div class="bottomBts">
        <input type="button" @click="logOut" name="" id="" value="退出登录"/>
      </div>-->
      </div>
</template>
	<script type="text/javascript">
    import "../js/style"
    import "../js/jquery-1.11.3.min"
    import wechartHead from './wechartHead';
    export default {
      name: "Home",
      components: {
        wechartHead
      },
      data(){
        return {
          textboxs:[],//选课列表
          taskId:'',
          startTime:"",
          overTime:"",
          task:{}
        }
      },
      created() {
        this.taskId = this.$route.params.taskId;
        this.startTime = this.$route.params.startTime;
        this.overTime = this.$route.params.overTime;
        this.changeTerms();
      },
      methods:{
        //根据班级查询选课任务
        changeTerms: function () {
          this.$ajax.get('stu/getXkTaskCourse', {
            params: {
              taskId: this.taskId,
              key:'APP'
            }
          })
            .then((response) => {
              if (response.data.task == null) {
                this.tasks = new Array();
                layer.msg("暂无选课任务！");
              } else {
                this.textboxs=response.data.xkTaskCourseList;
                console.log(this.textboxs);
              }

            })
            .catch(function (error) {
              console.log(error);
            });
        },
        //选择/退选
        selectCourse(id, courseFlag, taskId,limitCours,classifyId,limitNums,ssex) {
          if(new Date()>new Date(this.task.overTime)){
            layer.msg("选课任务已结束");
            return;
          }
          if (courseFlag == '选择') {
            return this.xuanze(id,taskId,limitCours,classifyId,limitNums,ssex);
          } else {
            return this.tuixuan(id);
          }
        },
        //选择
        xuanze(id,taskId,limitCours,classifyId,limitNums,ssex) {
          this.$ajax.get('stu/setCourse', {
            params: {
              id: id,
              taskId: taskId,
              limitNums:limitNums,
              limitCours:limitCours,
              classifyId:classifyId,
              ssex:ssex
            }
          })
            .then((response) => {
              if (!response.data.flag) {
                 layer.msg(response.data.msg);
              }else {
                layer.msg("选课成功！");
                if (this.butt = "xq") {
                 // this.getCourse(id);
                }
                this.changeTerms(this.taskId);

              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        //退选
        tuixuan(id) {
          var vue = this;
          layer.open({
            content: '您确定要退选吗'
            ,btn: ['退选', '取消']
            ,yes: function(index){
              vue.$ajax.get('stu/deleteCourse', {
                params: {
                  id: id,
                }
              })
                .then((response) => {
                  if (response.data != 200) {
                    layer.msg("操作失败！");
                  } else {
                    layer.msg("退选成功！");
                    vue.changeTerms(vue.taskId);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          });
        },
        //跳转到详情
        stuCoursePage(cid){
          this.$router.push({
            name:"sunjectDetails",
            params: { 
            cid:cid,
            startTime:this.startTime,
            overTime:this.overTime

            }
          });
        },
        logOut(){
          this.$router.push({
            name:"Login",
          });
        }
      }
    }

	</script>
