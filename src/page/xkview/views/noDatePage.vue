<template>
<div style="background:#FFFFFF; padding:11% 0 11% 36%;">
  <div style=" background:#FFFFFF;" >
    <img :src='nodataXkBg'/>
  </div>
</div>

</template>


<script>
const axiosConfig = require('../../../../static/conf/axios.conf');
const baseurl = axiosConfig.getBaseUrl();
import nodata_Xk_Bg from '../images/nodataXkBg.jpg'
  export default {
    components: {},
    name: "noDatePage",
    data() {
      return {
        nodataXkBg:nodata_Xk_Bg
      }
    },
    created(){
    this.nodataXkBg = this.nodataXkBg;

    }
  }
</script>
