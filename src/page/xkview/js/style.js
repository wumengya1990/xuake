import "../css/fonts/iconfont.css"
import "../css/tsFont/iconfont.css"
import "../css/hwui/hwui.css"
import "../css/main.css"
import "./jquery-1.11.3.min.js"
import "./easyui/themes/default/easyui.css"
import "./easyui/themes/icon.css"
import "./easyui/jquery.easyui.min.js"
import "./layer/layer.js"
import "../../../utils/utils"
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import axios  from 'axios'
import ElementUI from 'element-ui'
import "../css/sysconfig.css"

Vue.use(ElementUI)

axios.defaults.withCredentials = true

Vue.prototype.$ajax = axios



