<template>
    <div class="adminSet">
        <h3><span>选择排课管理员</span></h3>
        <div class="leftBox">
            <!-- <el-checkbox-group 
            v-model="chosed">
            <el-checkbox v-for="n in adminPeoList" :label="n.realName" :key="n.id"></el-checkbox>
        </el-checkbox-group> -->
        <el-checkbox-group v-model="chosed" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="n in adminPeoList" :label="n" :key="n.id">{{n.realName}}</el-checkbox>
        </el-checkbox-group>

        </div>

        <div class="rightBox">
            <h4><span>管理人员列表</span></h4>
            <el-table
            :data="chosed"
            style="width: 100%" height="600px">
            <el-table-column
                prop="realName"
                label="管理员姓名"
                >
            </el-table-column>
            <el-table-column
                prop="schoolName"
                label="学校"
               >
            </el-table-column>
            <el-table-column
                prop="pubtime"
                label="添加时间">
            </el-table-column>
            </el-table>
        </div>
        
    </div>
</template>

<script>

import  "../js/style.js";
import User from '../../../mixins/user';
import {mapState} from 'vuex';
import store from '../vuex/store';

export default {
    name:"adminSet",
    store,
    mixins: [User],
    data() {
        return {
            checkAll: false,
            isIndeterminate: true,
            adminPeoList:[],
            chosed:[],
            administratorList:[]
        }
    },
    mounted() {
        this.getPeoList();
    },
    methods: {
        getPeoList:function(){
            let that = this;
            that.$ajax.get('/taskCourse/getTeacherList',{params:{}}).then((res)=>{
                that.adminPeoList = res.data;
                 console.log(that.adminPeoList);
            })

        },
        handleCheckedCitiesChange(value) {
            let that = this;
            that.$ajax.post('/taskManger/installTaskManger',{params:{value}}).then((res)=>{

            })
            this.administratorList = value;
        }
    },
}
</script>

<style scoped>
.adminSet{ position: absolute; left: 0; top: 60px; right:0; bottom: 0; margin: auto; background: #FFF;}
.adminSet h3{ height: 50px; line-height: 50px; font-size: 18px; padding: 0 20px;}
.adminSet .leftBox{ position: absolute; left: 0; top: 60px; right:auto; bottom: 10px; margin: auto; width:25%; overflow: hidden; overflow-y: auto; padding: 0 10px}
.adminSet .leftBox >>> label{ display: block; height: 40px; line-height: 40px; padding: 0 10px; border-bottom: 1px solid #eaeaee; margin: 0;}
.adminSet .rightBox{ position: absolute; left:auto; top: 60px; right:10px; bottom: 10px; margin: auto; width: 72%;}
.adminSet .rightBox h4{ height: 40px; line-height: 40px; font-size: 16px; color:#2199ed;}
</style>
