<template>
    <div class="adminChoWord">
        <div @click="intoChoPeo">
            <dl>
                <dt><img :src="peochoimg"></dt>
                <dd>设置选课管理员</dd>
            </dl>
        </div>
        <div @click="intoClass">
            <dl>
                <dt><img :src="classimg"></dt>
                <dd>设置选课</dd>
            </dl>
        </div>
    </div>
</template>

<script>
const axiosConfig = require('../../../../static/conf/axios.conf');
const baseurl = axiosConfig.getBaseUrl();
import choPeoEnter_img from './../images/choPeoEnter.png';
import classEnter_img from './../images/classEnter.png';
export default {
    name:'adminChoWork',
    data() {
        return {
            peochoimg:choPeoEnter_img,
            classimg:classEnter_img
        }
    },
    mounted() {
        this.peochoimg = baseurl + this.peochoimg;
        this.classimg = baseurl + this.classimg;
    },
    methods: {
        
        intoChoPeo(){
            let that = this;
            that.$router.push({
                name:"adminSet"
            });
        },
        intoClass(){
            let that = this;
            that.$router.push({
                name:"IndexPage1",
                params:{ucId:that.$route.params.setTaskId,haveCho:true}
            });

        }
    },
}
</script>

<style>
.adminChoWord{ text-align:center; margin: 100px 0 0;}
.adminChoWord div{ width: 300px; height: 300px; background: #0883da; text-align: center; display: inline-block; margin: 0 20px; cursor: pointer;}
.adminChoWord div:hover{ background: #2199ed; box-shadow:0 3px 5px #03406b;}
.adminChoWord div dl{ line-height: normal; margin: 50px 0 0;}
.adminChoWord div dl dt img{ width: 150px;}
.adminChoWord div dl dd{ color:#FFF; font-size: 18px; margin: 10px 0 0;}
</style>
