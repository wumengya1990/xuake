/*!
 * Title: 系统模块
 * Description:
 * author: 白超
 * date: 2017/12/5
 * version: v1.0
 */

/*该文件不要做任何修改*/
import Vue from 'vue';
import router from './router/router';

import Index from './Index.vue';

new Vue({
  el: '#index',
  router,
  template: '<index/>',
  components: {Index}
});
