import "../css/font/iconfont.css"
import "../css/main.css"
import "../css/font/iconfont.js"
import "../layer/layer.js"
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
import axios  from 'axios'
Vue.use(ElementUI)

Vue.prototype.$ajax = axios
