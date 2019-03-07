<template>
    <div class="noAuthority">
        <dl>
            <dt><img :src="wuquanxian"></dt>
            <dd>您不是选课管理员，如果您需要进行设置选课任务，请联系学校管理员开通选课设置权限。</dd>
        </dl>
    </div>
</template>

<script>
const axiosConfig = require('../../../../static/conf/axios.conf');
const baseurl = axiosConfig.getBaseUrl();
import noAuthority_img from './../images/noAuthority.png';
export default {
    name:"noAuthority",
    data() {
        return {
            wuquanxian:noAuthority_img
        }
    },
    mounted() {
        this.wuquanxian = baseurl + this.wuquanxian;
    }
}
</script>

<style>
.noAuthority dl{ text-align: center; width: 50%; margin: 100px auto 0;}
.noAuthority dl dt img{ width: 300px;}
.noAuthority dl dd{ background: #f9ebb6; padding: 10px; border-radius: 4px; font-size: 16px; color: #826805;}
</style>
