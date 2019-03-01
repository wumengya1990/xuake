
<template>
	<div class="mainBack">
	<div class="mainList">
	<div class="mainList_1">

		<div class="subjectDetails">
			<h2><span>{{taskCourse.courseName}}</span><a onclick="window.history.back(-1)" class="backPage"><i class="icon iconfont icon-fanhui"></i></a></h2>
			<div class="courseImg">
				<img :src="taskCourse.courseImg"/>
			</div>
			<div class="courseDescribe">
				<p>{{taskCourse.courseIntro}}</p>
			</div>
			<ul class="clearfloat">
				<li><em>任课教师</em><div class="Rmessage"><p>{{taskCourse.teacherName}}</p></div></li>
				<li><em>上课时间</em><div class="Rmessage"><p>{{taskCourse.courseTime}}</p></div></li>
				<li><em>上课教室</em><div class="Rmessage"><p>{{taskCourse.classroom}}</p></div></li>
				<li><em>限选人数</em><div class="Rmessage"><p>{{taskCourse.limitPers}}</p></div></li>
				<li><em>已选人数</em><div class="Rmessage"><p>{{taskCourse.count}}</p></div></li>
				<li><em>限选性别</em><div class="Rmessage"><p>{{taskCourse.ssex}}</p></div></li>
			</ul>

		</div>

	</div>
	</div>

	<div class="bottomBts">
		<input v-show="new Date()>new Date(startTime)&&new Date(overTime)>new Date()"  @click="selectCourse" type="button" name="" id="" :value="taskCourse.courseFlag" />
	</div>
	</div>
</template>
	<script type="text/javascript">
    import "../js/style"
    import "../js/jquery-1.11.3.min"
    export default {
      name: "Home",
      data(){
        return {
          cid:'',
          taskCourse:{},
          taskId:'',
          startTime:"",
          overTime:""
        }
      },
      created(){
        this.cid = this.$route.params.cid;
        this.startTime = this.$route.params.startTime;
        this.overTime = this.$route.params.overTime;
        this.getCourse(this.cid);
      },
      methods: {
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
        //选择/退选
        selectCourse() {

          var id =this.taskCourse.id;
          var courseFlag =this.taskCourse.courseFlag;
          var taskId=this.taskCourse.taskId;
          var ssex=this.taskCourse.ssex;
          var limitNums=this.taskCourse.limitNums;
          var classifyId=this.taskCourse.classifyId;
          var limitCours=this.taskCourse.limitCours;
          if (courseFlag == '选择') {
            return this.xuanze(id, taskId,ssex,limitNums,classifyId,limitCours);
          } else {
            return this.tuixuan(id);
          }
        },
        //选择
        xuanze(id, taskId,ssex,limitNums,classifyId,limitCours){
          this.$ajax.get('stu/setCourse', {
            params: {
              id: id,
              taskId: taskId,
              ssex:ssex,
              limitNums:limitNums,
              classifyId:classifyId,
              limitCours:limitCours
            }
          })
            .then((response) => {
              if (!response.data.flag) {
                layer.msg(response.data.msg);
              }else {
                layer.msg("选课成功！");
                this.getCourse(this.cid);

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
                    vue.getCourse(vue.cid);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          });
        }
         /* this.$ajax.get('stu/deleteCourse', {
            params: {
              id: id,
            }
          })
            .then((response) => {
              if (response.data != 200) {
                layer.msg("操作失败！");
              } else {
                layer.msg("退选成功！");
                this.getCourse(this.cid);
              }
            })
            .catch(function (error) {
              console.log(error);
            });*/
        }


    }
	</script>
<style scoped>
.clearfloat li:after{display:block;clear:both;content:"";visibility:hidden;height:0}
</style>