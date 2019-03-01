
import qs from 'qs';

/*工具文件配置*/
const CONF = {
  //工具类型:支持的第三方插件和第三方插件对应的组件
  componentTypes: {
    Loading: {//加载特效
      iview: 'LoadingBar',
      element: 'Loading',
      layer: 'layer'
    },
    Alert: {//警告框
      element: 'MessageBox',
      layer: 'layer'
    },
    Message: {//消息框
      iview: 'Message',
      element: 'Message',
      layer: 'layer'
    },
    Confirm: {//询问框
      element: 'MessageBox',
      layer: 'layer'
    },
    Notification: {//通知框
      iview: 'Notice',
      element: 'Notification'
    },
    Ajax: {//Ajax
      axios: 'axios'
    },
    Parser: {//服务端返回数据解析器
      default: null,
      dataView: 'dataView'
    }
  },
  //配置组件使用的第三方插件,可以在此变更项目使用的第三方插件配置
  UseComponentConf: {
    Loading: 'element',
    Alert: 'layer',
    Message: 'layer',
    Confirm: 'layer',
    Notification: null,
    Ajax: 'axios',
    Parser: 'dataView'
  },
  //正在使用中的组件对象
  UseComponent: {
    Loading: undefined,
    Alert: undefined,
    Message: undefined,
    Confirm: undefined,
    Notification: undefined,
    Ajax: undefined,
    Parser: undefined
  }
};

const CHAR = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const CHARS = CHAR.split('');

/**
 * 获取uuid
 * @param len 长度
 * @param radix 范围[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789]
 */
export function uuid(len, radix) {
  let uuid = [], i;
  radix = radix || CHARS.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = CHARS[0 | Math.random() * radix];
  } else {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = CHARS[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};

/**
 * 获取当前日期字符串YYYY-MM-DD hh:mm:ss
 */
export function getTimeString() {
  var date = new Date(),
    Y = date.getFullYear(),
    M = '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
    D = '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()),
    h = ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()),
    m = ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()),
    s = ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
};

/**
 * 字符串时间转时间戳
 */
export function timeStringToStamp(str) {
  let stamp = Date.parse(new Date(str));
  if(isNaN(stamp)) {
    throw new Error(`日期格式不正确`);
  }
  return stamp;
};

/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return new Date().getTime();
};

/**
 * 判断目标是否为空
 * null => true
 * undefined => true
 * '' => true
 * ' X ' => true
 */
export function isEmpty(tar) {
  return tar === null || tar === undefined || `${tar}`.trim() === '';
}

/**
 * 将字符串中每一个单词首字母大写,其余小写
 */
export function stringCase(str = '') {
  let arr = str.toLowerCase().split(' ');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i][0].toUpperCase() + arr[i].substring(1, arr[i].length);
  }
  return arr.join(' ');
}

/**
 * 表单提交
 * @param url
 * @param params
 * @param target
 */
export function submitPost(jquery, url, params, target) {
  let hiddens = '';
  for (let i in params) {
    hiddens += '<input type="hidden" name="' + i + '" value="' + params[i] + '">';
  }
  let form;
  if (target) {
    form = jquery('<form action="' + url + '" method="post" target="' + target + '">' + hiddens + '</form>');
  } else {
    form = jquery('<form action="' + url + '" method="post">' + hiddens + '</form>');
  }
  form.appendTo('body').submit().remove();
};

/**
 * 获取DOM相对于屏幕左上角坐标
 * @param obj
 */
export function getElemPos(obj) {
  let pos = {"top": 0, "left": 0};
  if (obj.offsetParent) {
    while (obj.offsetParent) {
      pos.top += obj.offsetTop;
      pos.left += obj.offsetLeft;
      obj = obj.offsetParent;
    }
  } else if (obj.x) {
    pos.left += obj.x;
  } else if (obj.x) {
    pos.top += obj.y;
  }
  return [pos.left, pos.top];
};

/**
 * 是否在目标内
 * @param sou
 * @param tar
 */
export function isInTo(sou, tar) {
  if (tar instanceof Array) {
    for (let i in tar) {
      if (tar[i] === 'undefined' && sou === undefined) {
        return true;
      }
      if (tar[i] === 'null' && sou === null) {
        return true;
      }
      if (tar[i] === sou) {
        return true;
      }
    }
  }
  return false;
};

/**
 * 对象属性值转数组
 * @param tar
 * @param fieldName
 */
export function fieldValueToArray(tar, ...fieldName) {
  let res = [];
  fieldName.forEach(fn => {
    if (tar[fn]) {
      res.push(tar[fn]);
    }
  });
  return res;
};

/**
 * 排序工具类
 */
export const SortUtil = {

  /**
   * 冒泡排序
   * @param target 数组
   * @param compare 比较值,接收当前排序left和right的值,返回true表示left>right,此时交换位置
   * @returns {Array}
   */
  bubbleSort(target = [], compare) {
    let next = target.length - 1;
    for (let i = 0; i < next; i++) {
      let maxIndex = next - i;
      for (let j = 0; j < maxIndex; j++) {
        let left = target[j];
        let right = target[j + 1];
        if (compare(target[j], target[j + 1])) {
          target[j] = right;
          target[j + 1] = left;
        }
      }
    }
    return target;
  }
};

export function launchFullScreen() {
  let element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};

export function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};

export function isFullScreen() {
  let isFullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
  return isFullScreen ? true : false;
};

export function isScroll(el) {
  // test targets
  let elems = el ? [el] : [document.documentElement, document.body];
  let scrollX = false, scrollY = false;
  for (let i = 0; i < elems.length; i++) {
    let o = elems[i];
    // test horizontal
    let sl = o.scrollLeft;
    o.scrollLeft += (sl > 0) ? -1 : 1;
    o.scrollLeft !== sl && (scrollX = scrollX || true);
    o.scrollLeft = sl;
    // test vertical
    let st = o.scrollTop;
    o.scrollTop += (st > 0) ? -1 : 1;
    o.scrollTop !== st && (scrollY = scrollY || true);
    o.scrollTop = st;
  }
  // ret
  return [scrollX, scrollY];
};

/**
 * 消息类型
 */
const MessageType = {
  SUCCESS: 1,
  FAIL: 0,
  ERROR: 4,
  INFO: 3,
  WARN: 2,
  NULL: -1,//无类型
  NEED_LOGIN: 5,
  NO_AUTHORITY: 6,
  NOT_FOUND: 404
};

function parseArgs(args = []) {
  if (args.length === 0) {
    return [];
  }
  if (args.length === 1) {
    return args[0];
  }
  return [...args];
}

/**
 * 消息配置
 * 参数在不同的第三方组件中可能会有不同的表现或者无效
 * 参数列表:
 * message:提示的消息
 * title:消息标题
 * time:消息提示时间,设置0代表不自动关闭
 * showClose:是否显示关闭按钮
 * onClose:消息关闭后的回调
 * html:设置为boolean类型时,可以解析提示内容包含的html标签,设置为render函数时可以自定义提示内容,该属性慎用,因为不同组件表现不一致
 * align:对齐方式,提示内容在提示框的位置,如设置center表示居中
 */
class MessageOptions {

  constructor() {
  }

  //参数解析
  __structureA(params) {
    //参数为单个字符串,直接提示该消息
    if (typeof params === 'string') {
      return {
        message: params,
        title: '提示',
        time: 3000,
        showClose: true,
        html: false,
        align: undefined,
        onClose: () => {
        }
      };
    }
    //参数为对象非数组
    let isArray = Array.isArray(params);
    if (typeof params === 'object' && isArray === false) {
      let {
        message,
        title = '提示',
        time = 3000,
        showClose = true,
        html = false,
        align = undefined,
        onClose = () => {
        }
      } = params;
      return {
        message: message,
        title: title,
        time: time,
        showClose: showClose,
        onClose: onClose,
        html: html,
        align: align
      };
    }
    //参数为数组
    if (isArray) {
      let rs = {
        message: undefined,
        title: undefined,
        time: undefined,
        showClose: undefined,
        onClose: undefined,
        html: undefined,
        align: undefined
      };
      for (let param of params) {
        switch (typeof param) {
          case 'string':
            if (rs.message === undefined) {
              rs.message = param;
            } else if (rs.title === undefined) {
              rs.title = param;
            } else if (rs.align === undefined) {
              rs.align = param;
            } else {
              throw new Error(`MessageOptions __structureA 当参数为数组时,数组最多包含3个字符串类型值`);
            }
            break;
          case 'number':
            if (rs.time === undefined) {
              rs.time = param;
            } else {
              throw new Error(`MessageOptions __structureA 当参数为数组时,数组最多包含1个数值类型值`);
            }
            break;
          case 'boolean':
            if (rs.showClose === undefined) {
              rs.showClose = param;
            } else if (rs.html === undefined || typeof rs.html === 'function') {
              rs.html = param;
            } else {
              throw new Error(`MessageOptions __structureA 当参数为数组时,数组最多包含2个布尔类型值`);
            }
            break;
          case 'function':
            if (rs.onClose === undefined) {
              rs.onClose = param;
            } else if (rs.html === undefined || typeof rs.html === 'boolean') {
              rs.html = param;
            } else {
              throw new Error(`MessageOptions __structureA 当参数为数组时,数组最多包含2个函数类型值`);
            }
            break;
          default:
            throw new Error(`MessageOptions __structureA 当参数为数组时,数组元素只能包含字符串、数值、布尔、函数类型`);
        }
      }
      let {
        message,
        title = '提示',
        time = 3000,
        showClose = true,
        html = false,
        align = undefined,
        onClose = () => {
        }
      } = rs;
      return {
        message: message,
        title: title,
        time: time,
        showClose: showClose,
        onClose: onClose,
        html: html,
        align: align
      };
    }
    throw new Error(`MessageOptions __structureA 参数只能为字符串、对象、数组`);
  }

  open(params) {
    let {message = '成功', title, time, showClose, onClose, html, align} = this.__structureA(params);
    this._show({message, title, time, showClose, onClose, html, align, type: MessageType.NULL});
  }

  success(params) {
    let {message = '成功', title, time, showClose, onClose, html, align} = this.__structureA(params);
    this._show({message, title, time, showClose, onClose, html, align, type: MessageType.SUCCESS});
  }

  fail(params) {
    let {message = '失败', title, time, showClose, onClose, html, align} = this.__structureA(params);
    this._show({message, title, time, showClose, onClose, html, align, type: MessageType.FAIL});
  }

  error(params) {
    let {message = '错误', title, time, showClose, onClose, html, align} = this.__structureA(params);
    this._show({message, title, time, showClose, onClose, html, align, type: MessageType.ERROR});
  }

  warn(params) {
    let {message = '警告', title, time, showClose, onClose, html, align} = this.__structureA(params);
    this._show({message, title, time, showClose, onClose, html, align, type: MessageType.WARN});
  }

  info(params) {
    let {message = '信息', title, time, showClose, onClose, html, align} = this.__structureA(params);
    this._show({message, title, time, showClose, onClose, html, align, type: MessageType.INFO});
  }

  _show({message, title, time, showClose, onClose, html, align, type}) {
    alert(message);
  }

  closeAll() {
    alert(`关闭所有Message`);
  }
}

/**
 * 通知配置
 * 参数在不同的第三方组件中可能会有不同的表现或者无效
 * 参数列表:
 * message:提示的消息
 * title:消息标题
 * time:消息提示时间,设置0代表不自动关闭
 * showClose:是否显示关闭按钮
 * onClose:消息关闭后的回调
 * html:设置为boolean类型时,可以解析提示内容包含的html标签,设置为render函数时可以自定义提示内容,该属性慎用,因为不同组件表现不一致
 * align:对齐方式,提示内容在提示框的位置,如设置center表示居中
 * onClick:点击消息框时的回调
 */
class NotificationOptions {

  constructor() {
  }

  //参数解析
  __structureA(params) {
    //参数为单个字符串,直接提示该消息
    if (typeof params === 'string') {
      return {
        message: params,
        title: '提示',
        time: 3000,
        showClose: true,
        html: false,
        align: undefined,
        onClose: () => {
        },
        onClick: () => {
        }
      };
    }
    //参数为对象非数组
    let isArray = Array.isArray(params);
    if (typeof params === 'object' && isArray === false) {
      let {
        message,
        title = '提示',
        time = 3000,
        showClose = true,
        html = false,
        align = undefined,
        onClose = () => {
        },
        onClick = () => {
        }
      } = params;
      return {
        message: message,
        title: title,
        time: time,
        showClose: showClose,
        onClose: onClose,
        html: html,
        align: align,
        onClick: onClick
      };
    }
    //参数为数组
    if (isArray) {
      let rs = {
        message: undefined,
        title: undefined,
        time: undefined,
        showClose: undefined,
        onClose: undefined,
        html: undefined,
        align: undefined,
        onClick: undefined
      };
      for (let param of params) {
        switch (typeof param) {
          case 'string':
            if (rs.message === undefined) {
              rs.message = param;
            } else if (rs.title === undefined) {
              rs.title = param;
            } else if (rs.align === undefined) {
              rs.align = param;
            } else {
              throw new Error(`NotificationOptions __structureA 当参数为数组时,数组最多包含3个字符串类型值`);
            }
            break;
          case 'number':
            if (rs.time === undefined) {
              rs.time = param;
            } else {
              throw new Error(`NotificationOptions __structureA 当参数为数组时,数组最多包含1个数值类型值`);
            }
            break;
          case 'boolean':
            if (rs.showClose === undefined) {
              rs.showClose = param;
            } else if (rs.html === undefined || typeof rs.html === 'function') {
              rs.html = param;
            } else {
              throw new Error(`NotificationOptions __structureA 当参数为数组时,数组最多包含2个布尔类型值`);
            }
            break;
          case 'function':
            if (rs.onClose === undefined) {
              rs.onClose = param;
            } else if (rs.onClick === undefined) {
              rs.onClick = param;
            } else if (rs.html === undefined || typeof rs.html === 'boolean') {
              rs.html = param;
            } else {
              throw new Error(`NotificationOptions __structureA 当参数为数组时,数组最多包含3个函数类型值`);
            }
            break;
          default:
            throw new Error(`NotificationOptions __structureA 当参数为数组时,数组元素只能包含字符串、数值、布尔、函数类型`);
        }
      }
      let {
        message,
        title = '提示',
        time = 3000,
        showClose = true,
        html = false,
        align = undefined,
        onClose = () => {
        },
        onClick = () => {
        }
      } = rs;
      return {
        message: message,
        title: title,
        time: time,
        showClose: showClose,
        onClose: onClose,
        html: html,
        align: align,
        onClick: onClick
      };
    }
    throw new Error(`NotificationOptions __structureA 参数只能为字符串、对象、数组`);
  }

  success(params) {
    let {message = '成功', title, time, showClose, onClose, html, align, onClick} = this.__structureA(params);
    this._show({message, title, time, showClose, onClose, html, align, onClick, type: MessageType.SUCCESS});
  }

  fail(params) {
    let {message = '失败', title, time, showClose, onClose, html, align, onClick} = this.__structureA(params);
    this._show({message, title, time, showClose, onClose, html, align, onClick, type: MessageType.FAIL});
  }

  error(params) {
    let {message = '错误', title, time, showClose, onClose, html, align, onClick} = this.__structureA(params);
    this._show({message, title, time, showClose, onClose, html, align, onClick, type: MessageType.ERROR});
  }

  warn(params) {
    let {message = '警告', title, time, showClose, onClose, html, align, onClick} = this.__structureA(params);
    this._show({message, title, time, showClose, onClose, html, align, onClick, type: MessageType.WARN});
  }

  info(params) {
    let {message = '信息', title, time, showClose, onClose, html, align, onClick} = this.__structureA(params);
    this._show({message, title, time, showClose, onClose, html, align, onClick, type: MessageType.INFO});
  }

  _show({message, title, time, showClose, onClose, html, align, onClick, type}) {
    alert(message);
  }

  closeAll() {
    alert(`关闭所有Notification`);
  }

}

/**
 * 询问框配置
 * 参数在不同的第三方组件中可能会有不同的表现或者无效
 * 参数列表:
 * message:提示的消息
 * title:消息标题
 * showClose:是否显示关闭按钮
 * html:设置为boolean类型时,可以解析提示内容包含的html标签,设置为render函数时可以自定义提示内容,该属性慎用,因为不同组件表现不一致
 * align:对齐方式,提示内容在提示框的位置,如设置center表示居中
 * lockScroll:询问框出现时是否锁定页面的滚动条
 * showCancelButton:是否显示取消按钮
 * showOkButton:是否显示确定按钮
 * cancelButtonText:取消按钮文字
 * okButtonText:确定按钮文字
 * onOk:点击确定按钮回调函数
 * onCancel:点击取消按钮回调函数
 * closeOnClickModal:点击遮罩层是否关闭询问框
 * closeOnPressEscape:点击ESC是否关闭询问框
 * buttonTests:按钮文字集合,如果设置了该项,则cancelButtonText和okButtonText将无效,如['1','2','3','4','5']表示定义了五个按钮分别为12345
 * onClicks:按钮事件集合,如果设置了该项,则onOk和onCancel将无效,该项为数组,数组每一项需要指定回调函数,分别对应buttonTests中的按钮
 */
class ConfirmOptions {

  constructor() {
  }

  //参数解析
  __structureA(params) {
    //参数为单个字符串,直接提示该消息
    if (typeof params === 'string') {
      return {
        message: params,
        title: '提示',
        showClose: true,
        html: false,
        align: undefined,
        lockScroll: true,
        showCancelButton: true,
        showOkButton: true,
        buttonTests: [],//一组按钮
        onClicks: [],//一组按钮点击对应回调函数
        cancelButtonText: '取消',
        okButtonText: '确定',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        closeOnHashChange: true,
        roundButton: false,
        beforeClose: undefined,
        onOk: () => {
        },
        onCancel: () => {
        }
      };
    }
    //参数为对象非数组
    let isArray = Array.isArray(params);
    if (typeof params === 'object' && isArray === false) {
      let {
        message,
        title = '提示',
        showClose = true,
        html = false,
        align = undefined,
        lockScroll = true,
        showCancelButton = true,
        showOkButton = true,
        buttonTests = [],
        onClicks = [],
        cancelButtonText = '取消',
        okButtonText = '确定',
        closeOnClickModal = false,
        closeOnPressEscape = false,
        closeOnHashChange = true,
        roundButton = false,
        beforeClose = undefined,
        onOk = () => {
        },
        onCancel = () => {
        }
      } = params;
      return {
        message: message,
        title: title,
        showClose: showClose,
        html: html,
        align: align,
        lockScroll: lockScroll,
        showCancelButton: showCancelButton,
        showOkButton: showOkButton,
        buttonTests: buttonTests,
        onClicks: onClicks,
        cancelButtonText: cancelButtonText,
        okButtonText: okButtonText,
        closeOnClickModal: closeOnClickModal,
        closeOnPressEscape: closeOnPressEscape,
        closeOnHashChange: closeOnHashChange,
        roundButton: roundButton,
        onOk: onOk,
        beforeClose: beforeClose,
        onCancel: onCancel
      };
    }
    //参数为数组
    if (isArray) {
      let rs = {
        message: undefined,
        title: undefined,
        showClose: undefined,
        html: undefined,
        align: undefined,
        lockScroll: undefined,
        showCancelButton: undefined,
        showOkButton: undefined,
        buttonTests: undefined,
        onClicks: undefined,
        cancelButtonText: undefined,
        okButtonText: undefined,
        closeOnClickModal: undefined,
        closeOnPressEscape: undefined,
        closeOnHashChange: undefined,
        roundButton: undefined,
        onOk: undefined,
        beforeClose: undefined,
        onCancel: undefined
      };
      for (let param of params) {
        switch (typeof param) {
          case 'string':
            if (rs.message === undefined) {
              rs.message = param;
            } else if (rs.title === undefined) {
              rs.title = param;
            } else if (rs.okButtonText === undefined) {
              rs.okButtonText = param;
            } else if (rs.cancelButtonText === undefined) {
              rs.cancelButtonText = param;
            } else if (rs.align === undefined) {
              rs.align = param;
            } else {
              throw new Error(`ConfirmOptions __structureA 当参数为数组时,数组最多包含5个字符串类型值`);
            }
            break;
          case 'number':
            throw new Error(`ConfirmOptions __structureA 当参数为数组时,数组最多包含0个数值类型值`);
            break;
          case 'boolean':
            if (rs.showClose === undefined) {
              rs.showClose = param;
            } else if (rs.html === undefined || typeof rs.html === 'function') {
              rs.html = param;
            } else {
              throw new Error(`ConfirmOptions __structureA 当参数为数组时,数组最多包含2个布尔类型值`);
            }
            break;
          case 'function':
            if (rs.onOk === undefined) {
              rs.onOk = param;
            } else if (rs.onCancel === undefined) {
              rs.onCancel = param;
            } else if (rs.html === undefined || typeof rs.html === 'boolean') {
              rs.html = param;
            } else {
              throw new Error(`ConfirmOptions __structureA 当参数为数组时,数组最多包含3个函数类型值`);
            }
            break;
          default:
            throw new Error(`ConfirmOptions __structureA 当参数为数组时,数组元素只能包含字符串、数值、布尔、函数类型`);
        }
      }
      let {
        message,
        title = '提示',
        showClose = true,
        html = false,
        align = undefined,
        lockScroll = true,
        showCancelButton = true,
        showOkButton = true,
        buttonTests = [],
        onClicks = [],
        cancelButtonText = '取消',
        okButtonText = '确定',
        closeOnClickModal = false,
        closeOnPressEscape = false,
        closeOnHashChange = true,
        roundButton = false,
        beforeClose = undefined,
        onOk = () => {
        },
        onCancel = () => {
        }
      } = rs;
      return {
        message: message,
        title: title,
        showClose: showClose,
        html: html,
        align: align,
        lockScroll: lockScroll,
        showCancelButton: showCancelButton,
        showOkButton: showOkButton,
        buttonTests: buttonTests,
        onClicks: onClicks,
        cancelButtonText: cancelButtonText,
        okButtonText: okButtonText,
        closeOnClickModal: closeOnClickModal,
        closeOnPressEscape: closeOnPressEscape,
        closeOnHashChange: closeOnHashChange,
        roundButton: roundButton,
        onOk: onOk,
        beforeClose: beforeClose,
        onCancel: onCancel
      };
    }
    throw new Error(`ConfirmOptions __structureA 参数只能为字符串、对象、数组`);
  }

  open(params) {
    let {
      message = '未设置内容',
      title,
      showClose,
      html,
      align,
      lockScroll,
      showCancelButton,
      showOkButton,
      buttonTests,
      onClicks,
      cancelButtonText,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      beforeClose,
      onCancel
    } = this.__structureA(params);
    this._show({
      message,
      title,
      showClose,
      html,
      align,
      lockScroll,
      showCancelButton,
      showOkButton,
      buttonTests,
      onClicks,
      cancelButtonText,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      beforeClose,
      onCancel,
      type: MessageType.NULL
    });
  }

  success(params) {
    let {
      message = '未设置内容',
      title,
      showClose,
      html,
      align,
      lockScroll,
      showCancelButton,
      showOkButton,
      buttonTests,
      onClicks,
      cancelButtonText,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      beforeClose,
      onCancel
    } = this.__structureA(params);
    this._show({
      message,
      title,
      showClose,
      html,
      align,
      lockScroll,
      showCancelButton,
      showOkButton,
      buttonTests,
      onClicks,
      cancelButtonText,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      beforeClose,
      onCancel,
      type: MessageType.SUCCESS
    });
  }

  fail(params) {
    let {
      message = '未设置内容',
      title,
      showClose,
      html,
      align,
      lockScroll,
      showCancelButton,
      showOkButton,
      buttonTests,
      onClicks,
      cancelButtonText,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      beforeClose,
      onCancel
    } = this.__structureA(params);
    this._show({
      message,
      title,
      showClose,
      html,
      align,
      lockScroll,
      showCancelButton,
      showOkButton,
      buttonTests,
      onClicks,
      cancelButtonText,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      beforeClose,
      onCancel,
      type: MessageType.FAIL
    });
  }

  error(params) {
    let {
      message = '未设置内容',
      title,
      showClose,
      html,
      align,
      lockScroll,
      showCancelButton,
      showOkButton,
      buttonTests,
      onClicks,
      cancelButtonText,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      beforeClose,
      onCancel
    } = this.__structureA(params);
    this._show({
      message,
      title,
      showClose,
      html,
      align,
      lockScroll,
      showCancelButton,
      showOkButton,
      buttonTests,
      onClicks,
      cancelButtonText,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      beforeClose,
      onCancel,
      type: MessageType.ERROR
    });
  }

  warn(params) {
    let {
      message = '未设置内容',
      title,
      showClose,
      html,
      align,
      lockScroll,
      showCancelButton,
      showOkButton,
      buttonTests,
      onClicks,
      cancelButtonText,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      beforeClose,
      onCancel
    } = this.__structureA(params);
    this._show({
      message,
      title,
      showClose,
      html,
      align,
      lockScroll,
      showCancelButton,
      showOkButton,
      buttonTests,
      onClicks,
      cancelButtonText,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      beforeClose,
      onCancel,
      type: MessageType.WARN
    });
  }

  info(params) {
    let {
      message = '未设置内容',
      title,
      showClose,
      html,
      align,
      lockScroll,
      showCancelButton,
      showOkButton,
      buttonTests,
      onClicks,
      cancelButtonText,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      beforeClose,
      onCancel
    } = this.__structureA(params);
    this._show({
      message,
      title,
      showClose,
      html,
      align,
      lockScroll,
      showCancelButton,
      showOkButton,
      buttonTests,
      onClicks,
      cancelButtonText,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      beforeClose,
      onCancel,
      type: MessageType.INFO
    });
  }

  _show({
          message,
          title,
          showClose,
          html,
          align,
          lockScroll,
          showCancelButton,
          showOkButton,
          buttonTests,
          onClicks,
          cancelButtonText,
          okButtonText,
          closeOnClickModal,
          closeOnPressEscape,
          closeOnHashChange,
          roundButton,
          onOk,
          beforeClose,
          onCancel,
          type
        }) {
    alert(message);
  }
}

/**
 * 警告框配置
 * 参数在不同的第三方组件中可能会有不同的表现或者无效
 * 参数列表:
 * message:提示的消息
 * title:消息标题
 * showClose:是否显示关闭按钮
 * html:设置为boolean类型时,可以解析提示内容包含的html标签,设置为render函数时可以自定义提示内容,该属性慎用,因为不同组件表现不一致
 * align:对齐方式,提示内容在提示框的位置,如设置center表示居中
 * lockScroll:询问框出现时是否锁定页面的滚动条
 * showOkButton:是否显示确定按钮
 * okButtonText:确定按钮文字
 * onOk:点击确定按钮回调函数
 * closeOnClickModal:点击遮罩层是否关闭询问框
 * closeOnPressEscape:点击ESC是否关闭询问框
 */
class AlertOptions {

  constructor() {
  }

  //参数解析
  __structureA(params) {
    //参数为单个字符串,直接提示该消息
    if (typeof params === 'string') {
      return {
        message: params,
        title: '提示',
        showClose: true,
        html: false,
        align: undefined,
        lockScroll: true,
        showOkButton: true,
        okButtonText: '确定',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        closeOnHashChange: true,
        roundButton: false,
        onOk: () => {
        }
      };
    }
    //参数为对象非数组
    let isArray = Array.isArray(params);
    if (typeof params === 'object' && isArray === false) {
      let {
        message,
        title = '提示',
        showClose = true,
        html = false,
        align = undefined,
        lockScroll = true,
        showOkButton = true,
        okButtonText = '确定',
        closeOnClickModal = false,
        closeOnPressEscape = false,
        closeOnHashChange = true,
        roundButton = false,
        onOk = () => {
        }
      } = params;
      return {
        message: message,
        title: title,
        showClose: showClose,
        html: html,
        align: align,
        lockScroll: lockScroll,
        showOkButton: showOkButton,
        okButtonText: okButtonText,
        closeOnClickModal: closeOnClickModal,
        closeOnPressEscape: closeOnPressEscape,
        closeOnHashChange: closeOnHashChange,
        roundButton: roundButton,
        onOk: onOk
      };
    }
    //参数为数组
    if (isArray) {
      let rs = {
        message: undefined,
        title: undefined,
        showClose: undefined,
        html: undefined,
        align: undefined,
        lockScroll: undefined,
        showOkButton: undefined,
        okButtonText: undefined,
        closeOnClickModal: undefined,
        closeOnPressEscape: undefined,
        closeOnHashChange: undefined,
        roundButton: undefined,
        onOk: undefined
      };
      for (let param of params) {
        switch (typeof param) {
          case 'string':
            if (rs.message === undefined) {
              rs.message = param;
            } else if (rs.title === undefined) {
              rs.title = param;
            } else if (rs.okButtonText === undefined) {
              rs.okButtonText = param;
            } else if (rs.align === undefined) {
              rs.align = param;
            } else {
              throw new Error(`ConfirmOptions __structureA 当参数为数组时,数组最多包含4个字符串类型值`);
            }
            break;
          case 'number':
            throw new Error(`ConfirmOptions __structureA 当参数为数组时,数组最多包含0个数值类型值`);
            break;
          case 'boolean':
            if (rs.showClose === undefined) {
              rs.showClose = param;
            } else if (rs.html === undefined || typeof rs.html === 'function') {
              rs.html = param;
            } else {
              throw new Error(`ConfirmOptions __structureA 当参数为数组时,数组最多包含2个布尔类型值`);
            }
            break;
          case 'function':
            if (rs.onOk === undefined) {
              rs.onOk = param;
            } else if (rs.html === undefined || typeof rs.html === 'boolean') {
              rs.html = param;
            } else {
              throw new Error(`ConfirmOptions __structureA 当参数为数组时,数组最多包含2个函数类型值`);
            }
            break;
          default:
            throw new Error(`ConfirmOptions __structureA 当参数为数组时,数组元素只能包含字符串、数值、布尔、函数类型`);
        }
      }
      let {
        message,
        title = '提示',
        showClose = true,
        html = false,
        align = undefined,
        lockScroll = true,
        showOkButton = true,
        okButtonText = '确定',
        closeOnClickModal = false,
        closeOnPressEscape = false,
        closeOnHashChange = true,
        roundButton = false,
        onOk = () => {
        }
      } = rs;
      return {
        message: message,
        title: title,
        showClose: showClose,
        html: html,
        align: align,
        lockScroll: lockScroll,
        showOkButton: showOkButton,
        okButtonText: okButtonText,
        closeOnClickModal: closeOnClickModal,
        closeOnPressEscape: closeOnPressEscape,
        closeOnHashChange: closeOnHashChange,
        roundButton: roundButton,
        onOk: onOk
      };
    }
    throw new Error(`ConfirmOptions __structureA 参数只能为字符串、对象、数组`);
  }

  open(params) {
    let {
      message = '未设置内容',
      title,
      showClose,
      html,
      align,
      lockScroll,
      showOkButton,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk
    } = this.__structureA(params);
    this._show({
      message,
      title,
      showClose,
      html,
      align,
      lockScroll,
      showOkButton,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      type: MessageType.NULL
    });
  }

  success(params) {
    let {
      message = '未设置内容',
      title,
      showClose,
      html,
      align,
      lockScroll,
      showOkButton,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk
    } = this.__structureA(params);
    this._show({
      message,
      title,
      showClose,
      html,
      align,
      lockScroll,
      showOkButton,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      type: MessageType.SUCCESS
    });
  }

  fail(params) {
    let {
      message = '未设置内容',
      title,
      showClose,
      html,
      align,
      lockScroll,
      showOkButton,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk
    } = this.__structureA(params);
    this._show({
      message,
      title,
      showClose,
      html,
      align,
      lockScroll,
      showOkButton,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      type: MessageType.FAIL
    });
  }

  error(params) {
    let {
      message = '未设置内容',
      title,
      showClose,
      html,
      align,
      lockScroll,
      showOkButton,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk
    } = this.__structureA(params);
    this._show({
      message,
      title,
      showClose,
      html,
      align,
      lockScroll,
      showOkButton,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      type: MessageType.ERROR
    });
  }

  warn(params) {
    let {
      message = '未设置内容',
      title,
      showClose,
      html,
      align,
      lockScroll,
      showOkButton,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk
    } = this.__structureA(params);
    this._show({
      message,
      title,
      showClose,
      html,
      align,
      lockScroll,
      showOkButton,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      type: MessageType.WARN
    });
  }

  info(params) {
    let {
      message = '未设置内容',
      title,
      showClose,
      html,
      align,
      lockScroll,
      showOkButton,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk
    } = this.__structureA(params);
    this._show({
      message,
      title,
      showClose,
      html,
      align,
      lockScroll,
      showOkButton,
      okButtonText,
      closeOnClickModal,
      closeOnPressEscape,
      closeOnHashChange,
      roundButton,
      onOk,
      type: MessageType.INFO
    });
  }

  _show({
          message,
          title,
          showClose,
          html,
          align,
          lockScroll,
          showOkButton,
          okButtonText,
          closeOnClickModal,
          closeOnPressEscape,
          closeOnHashChange,
          roundButton,
          onOk,
          type
        }) {
    alert(message);
  }
}

/**
 * 加载特效配置
 * 参数在不同的第三方组件中可能会有不同的表现或者无效
 * 参数列表:
 * target:出现加载特效的区域,可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点
 * text:加载提示
 * background:遮罩层背景颜色
 */
class LoadingOptions {

  constructor() {
  }

  //参数解析
  __structureA(params) {
    //参数为单个字符串,直接提示该消息
    if (typeof params === 'string') {
      return {
        target: undefined,
        text: params,
        background: undefined
      };
    }
    //参数为对象非数组
    let isArray = Array.isArray(params);
    if (typeof params === 'object' && isArray === false) {
      let {
        target = undefined,
        text = '加载中...',
        background = undefined
      } = params;
      return {
        target: target,
        text: text,
        background: background
      };
    }
    //参数为数组
    if (isArray) {
      let rs = {
        target: undefined,
        text: undefined,
        background: undefined
      };
      for (let param of params) {
        switch (typeof param) {
          case 'string':
            if (rs.text === undefined) {
              rs.text = param;
            } else if (rs.target === undefined) {
              rs.target = param;
            } else {
              throw new Error(`LoadingOptions __structureA 当参数为数组时,数组最多包含2个字符串类型值`);
            }
            break;
          case 'number':
            throw new Error(`LoadingOptions __structureA 当参数为数组时,数组最多包含0个数值类型值`);
            break;
          case 'boolean':
            throw new Error(`LoadingOptions __structureA 当参数为数组时,数组最多包含0个布尔类型值`);
            break;
          case 'function':
            throw new Error(`LoadingOptions __structureA 当参数为数组时,数组最多包含0个函数类型值`);
            break;
          default:
            throw new Error(`LoadingOptions __structureA 当参数为数组时,数组元素只能包含字符串类型`);
        }
      }
      let {
        target = undefined,
        text = '加载中...',
        background = undefined
      } = rs;
      return {
        target: target,
        text: text,
        background: background
      };
    }
    throw new Error(`LoadingOptions __structureA 参数只能为字符串、对象、数组`);
  }

  start(params) {
    let {
      target = undefined,
      text = '加载中...',
      background = undefined
    } = this.__structureA(params);
    this._show({
      target,
      text,
      background
    });
  }

  _show({target, text, background}) {
    alert(text);
  }

  stop() {
    alert(`关闭所有Loading`);
  }
}

/**
 * Ajax配置
 * 参数在不同的第三方组件中可能会有不同的表现或者无效
 * 参数列表:
 * url:请求地址
 * params:请求参数
 * headers:头部信息
 * loading:是否显示加载特效
 * loadingText:加载提示
 * target:出现加载特效的区域,可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点
 * race:是否开启内置竞速
 * raceText:竞速提示
 * raceTime:竞速时间
 */
class AjaxOptions {

  constructor() {
  }

  //参数解析
  __structureA(args) {
    if (typeof args === 'string') {
      return {
        url: args,//请求地址
        params: {},//请求参数
        headers: {//请求头信息
          'X-Requested-With': 'XMLHttpRequest'
        },
        loading: true,//是否显示加载特效
        loadingText: '加载中...',//加载提示
        target: undefined,//加载范围
        race: true,//是否内置启动一个竞速计时
        raceText: '您的网速似乎不太给力...',//竞速提示
        raceTime: 30000//竞速时间
      };
    }
    //参数为对象非数组
    let isArray = Array.isArray(args);
    if (typeof args === 'object' && isArray === false) {
      let {
        url,
        params = {},
        headers = {
          'X-Requested-With': 'XMLHttpRequest'
        },
        loading = true,
        loadingText = '加载中...',
        target = undefined,
        race = true,
        raceText = '您的网速似乎不太给力...',
        raceTime = 30000
      } = args;
      return {
        url: url,
        params: params,
        headers: headers,
        loading: loading,
        loadingText: loadingText,
        target: target,
        race: race,
        raceText: raceText,
        raceTime: raceTime
      };
    }
    //参数为数组
    if (isArray === true) {
      let rs = {
        url: undefined,
        params: undefined,
        headers: undefined,
        loading: undefined,
        loadingText: undefined,
        target: undefined,
        race: undefined,
        raceText: undefined,
        raceTime: undefined
      };
      for (let param of args) {
        if(param instanceof HTMLElement && rs.target === undefined) {
          rs.target = param;
          continue;
        }
        switch (typeof param) {
          case 'string':
            if (rs.url === undefined) {
              rs.url = param;
            } else if(rs.target === undefined) {
              rs.target = param;
            } else if (rs.loadingText === undefined) {
              rs.loadingText = param;
            } else if (rs.raceText === undefined) {
              rs.raceText = param;
            } else {
              throw new Error(`AjaxOptions __structureA 当参数为数组时,数组最多包含4个字符串类型值`);
            }
            break;
          case 'number':
            if (rs.raceTime === undefined) {
              rs.raceTime = param;
            } else {
              throw new Error(`AjaxOptions __structureA 当参数为数组时,数组最多包含1个数值类型值`);
            }
            break;
          case 'boolean':
            if (rs.loading === undefined) {
              rs.loading = param;
            } else if (rs.race === undefined) {
              rs.race = param;
            } else {
              throw new Error(`AjaxOptions __structureA 当参数为数组时,数组最多包含2个布尔类型值`);
            }
            break;
          case 'object':
            if (rs.params === undefined) {
              rs.params = param;
            } else if (rs.headers === undefined) {
              rs.headers = param;
            } else {
              throw new Error(`AjaxOptions __structureA 当参数为数组时,数组最多包含2个Object类型值`);
            }
            break;
          case 'function':
            throw new Error(`AjaxOptions __structureA 当参数为数组时,数组最多包含0个函数类型值`);
            break;
          default:
            throw new Error(`AjaxOptions __structureA 当参数为数组时,数组元素只能包含字符串类型`);
        }
      }
      let {
        url,
        params = {},
        headers = {
          'X-Requested-With': 'XMLHttpRequest'
        },
        loading = true,
        loadingText = '加载中...',
        target = undefined,
        race = true,
        raceText = '您的网速似乎不太给力...',
        raceTime = 30000
      } = rs;
      return {
        url: url,
        params: params,
        headers: headers,
        loading: loading,
        loadingText: loadingText,
        target: target,
        race: race,
        raceText: raceText,
        raceTime: raceTime
      };
    }
    throw new Error(`AjaxOptions __structureA 参数只能为字符串、对象、数组`);
  }

  get(args) {
    alert(`发送get请求(未实现)`);
  }

  post(args) {
    alert(`发送post请求(未实现)`);
  }

}

/**
 * 回调函数配置
 * 参数在不同的第三方组件中可能会有不同的表现或者无效
 * 参数列表:
 * message: 提示消息,设置后覆盖掉后台返回消息
 * close: 是否关闭消息提示
 * time: 消息提示持续时间
 * callback: 回调函数,参数为后台返回数据
 */
class CallbackOptions {

  constructor() {
  }

  //参数解析
  __structureA(params) {
    if (typeof params === 'string') {
      return {
        message: params,
        close: false,
        time: 3000,
        callback: () => {
        }
      };
    }
    if (typeof params === 'function') {
      return {
        message: '操作成功',
        close: false,
        time: 3000,
        callback: params
      };
    }
    //参数为对象非数组
    let isArray = Array.isArray(params);
    if (typeof params === 'object' && isArray === false) {
      let {
        message,
        close = false,
        time = 3000,
        callback = () => {
        }
      } = params;
      return {
        message: message,
        close: close,
        time: time,
        callback: callback
      };
    }
    //参数为数组
    if (isArray) {
      let rs = {
        message: undefined,
        close: undefined,
        time: undefined,
        callback: undefined
      };
      for (let param of params) {
        switch (typeof param) {
          case 'string':
            if (rs.message === undefined) {
              rs.message = param;
            } else {
              throw new Error(`CallbackOptions __structureA 当参数为数组时,数组最多包含1个字符串类型值`);
            }
            break;
          case 'number':
            if (rs.time === undefined) {
              rs.time = param;
            } else {
              throw new Error(`CallbackOptions __structureA 当参数为数组时,数组最多包含1个数值类型值`);
            }
            break;
          case 'boolean':
            if (rs.close === undefined) {
              rs.close = param;
            } else {
              throw new Error(`CallbackOptions __structureA 当参数为数组时,数组最多包含1个布尔类型值`);
            }
            break;
          case 'function':
            if (rs.callback === undefined) {
              rs.callback = param;
            } else {
              throw new Error(`CallbackOptions __structureA 当参数为数组时,数组最多包含1个函数类型值`);
            }
            break;
          default:
            throw new Error(`CallbackOptions __structureA 当参数为数组时,数组元素只能包含字符串类型`);
        }
      }
      let {
        message,
        close = false,
        time = 3000,
        callback = () => {
        }
      } = rs;
      return {
        message: message,
        close: close,
        time: time,
        callback: callback
      };
    }
    throw new Error(`CallbackOptions __structureA 参数只能为字符串、对象、数组`);
  }

  __options = {
    success: {
      close: false,
      time: 3000,
      callback: (data) => {
      }
    },
    notSuccess: {
      callback: (data) => {
      }
    },
    fail: {
      close: false,
      time: 3000,
      callback: (data) => {
      }
    },
    info: {
      close: false,
      time: 3000,
      callback: (data) => {
      }
    },
    warn: {
      close: false,
      time: 3000,
      callback: (data) => {
      }
    },
    error: {
      close: false,
      time: 3000,
      callback: (data) => {
      }
    },
    finally: {
      callback: (data) => {
      }
    }
  };

  success() {
    Object.assign(this.__options.success, this.__structureA(parseArgs(arguments)));
    return this;
  };

  notSuccess() {
    Object.assign(this.__options.notSuccess, this.__structureA(parseArgs(arguments)));
    return this;
  };

  fail() {
    Object.assign(this.__options.fail, this.__structureA(parseArgs(arguments)));
    return this;
  };

  info() {
    Object.assign(this.__options.info, this.__structureA(parseArgs(arguments)));
    return this;
  };

  warn() {
    Object.assign(this.__options.warn, this.__structureA(parseArgs(arguments)));
    return this;
  };

  error() {
    Object.assign(this.__options.error, this.__structureA(parseArgs(arguments)));
    return this;
  };

  finally() {
    Object.assign(this.__options.finally, this.__structureA(parseArgs(arguments)));
  };

}

class ParserOptions extends CallbackOptions {

  constructor() {
    super();
  }

  __parse(data, options) {
    this.__options = options;
    this.parse(data);
  }

  /**
   * 解析
   * @param data 数据
   */
  parse(data) {
    console.info(data);
  }

  /**
   * 实例化
   */
  newInstance() {
    return new ParserOptions();
  }
}

/**
 * element-ui的Message
 */
class ElementMessage extends MessageOptions {

  constructor() {
    super();
  }

  _show({message, title, time, showClose, onClose, html, align, type}) {
    if (CONF.UseComponent.Message === undefined) {
      setTimeout(() => {//等待消息组件装载完毕
        this._show({message, title, time, showClose, onClose, html, align, type});
      }, 100);
      return;
    }
    let t;
    switch (type) {
      case MessageType.SUCCESS:
        t = 'success';
        break;
      case MessageType.WARN:
        t = 'warning';
        break;
      case MessageType.INFO:
        t = 'info';
        break;
      case MessageType.ERROR:
        t = 'error';
        break;
      case MessageType.FAIL:
        t = 'info';
        break;
      default:
        throw new Error(`ElementMessage暂不支持该消息类型:${type}`);
    }
    CONF.UseComponent.Message({
      message: message,
      type: t,
      duration: time,
      dangerouslyUseHTMLString: typeof html === 'boolean' ? html : false,
      center: align === 'center' ? true : false,
      showClose: showClose,
      onClose: onClose
    });
  }

  closeAll() {
    CONF.UseComponent.Message.closeAll();
  }
}

/**
 * iview的Message
 */
class IviewMessage extends MessageOptions {

  constructor() {
    super();
  }

  _show({message, title, time, showClose, onClose, html, align, type}) {
    if (CONF.UseComponent.Message === undefined) {
      setTimeout(() => {//等待消息组件装载完毕
        this._show({message, title, time, showClose, onClose, html, align, type});
      }, 100);
      return;
    }
    switch (type) {
      case MessageType.SUCCESS :
        CONF.UseComponent.Message.success({
          content: message,
          duration: time / 1000,
          closable: showClose,
          onClose: onClose,
          render: typeof html === 'function' ? html : undefined
        });
        break;
      case MessageType.FAIL :
        CONF.UseComponent.Message.info({
          content: message,
          duration: time / 1000,
          closable: showClose,
          onClose: onClose,
          render: typeof html === 'function' ? html : undefined
        });
        break;
      case MessageType.ERROR :
        CONF.UseComponent.Message.error({
          content: message,
          duration: time / 1000,
          closable: showClose,
          onClose: onClose,
          render: typeof html === 'function' ? html : undefined
        });
        break;
      case MessageType.WARN :
        CONF.UseComponent.Message.warning({
          content: message,
          duration: time / 1000,
          closable: showClose,
          onClose: onClose,
          render: typeof html === 'function' ? html : undefined
        });
        break;
      case MessageType.INFO :
        CONF.UseComponent.Message.info({
          content: message,
          duration: time / 1000,
          closable: showClose,
          onClose: onClose,
          render: typeof html === 'function' ? html : undefined
        });
        break;
      default:
        throw new Error(`IviewMessage暂不支持该消息类型:${type}`);
    }
  }

  closeAll() {
    CONF.UseComponent.Message.destroy();
  }
}

/**
 * layer的Message
 */
class LayerMessage extends MessageOptions {

  constructor() {
    super();
  }

  _show({message, title, time, showClose, onClose, html, align, type}) {
    if (CONF.UseComponent.Message === undefined) {
      setTimeout(() => {//等待消息组件装载完毕
        this._show({message, title, time, showClose, onClose, html, align, type});
      }, 100);
      return;
    }
    let t;//1、成功 2、错误 3、询问 4、锁定 5、哭脸 6、笑脸 7、警告
    switch (type) {
      case MessageType.NULL:
        break;
      case MessageType.SUCCESS:
        t = 1;
        break;
      case MessageType.WARN:
        t = 7;
        break;
      case MessageType.INFO:
        t = 6;
        break;
      case MessageType.ERROR:
        t = 2;
        break;
      case MessageType.FAIL:
        t = 5;
        break;
      default:
        throw new Error(`LayerMessage暂不支持该消息类型:${type}`);
    }
    CONF.UseComponent.Message.msg(message, {
      icon: t,
      time: time
    }, onClose);
  }

  closeAll() {
    CONF.UseComponent.Message.closeAll();
  }

}

/**
 * element-ui的Notification
 */
class ElementNotification extends NotificationOptions {

  constructor() {
    super();
  }

  _show({message, title, time, showClose, onClose, html, align, onClick, type}) {
    if (CONF.UseComponent.Notification === undefined) {
      setTimeout(() => {//等待通知组件装载完毕
        this._show({message, title, time, showClose, onClose, html, align, onClick, type});
      }, 100);
      return;
    }
    let t;
    switch (type) {
      case MessageType.SUCCESS:
        t = 'success';
        break;
      case MessageType.WARN:
        t = 'warning';
        break;
      case MessageType.INFO:
        t = 'info';
        break;
      case MessageType.ERROR:
        t = 'error';
        break;
      case MessageType.FAIL:
        t = 'info';
        break;
      default:
        throw new Error(`ElementMessage暂不支持该消息类型:${type}`);
    }
    CONF.UseComponent.Notification({
      title: title,
      message: message,
      dangerouslyUseHTMLString: typeof html === 'boolean' ? html : false,
      type: t,
      duration: time,
      position: isInTo(align, ['top-right', 'top-left', 'bottom-right', 'bottom-left']) ? align : 'top-right',
      showClose: showClose,
      onClose: onClose,
      onClick: onClick
    });
  }

  closeAll() {
    console.log(`ElementNotification暂不支持closeAll`);
  }
}

/**
 * iview的Notification
 */
class IviewNotification extends NotificationOptions {

  constructor() {
    super();
  }

  open(params) {
    let {message = 'notice', title, time = 3000, showClose = true, onClose} = this.__structureA(params);
    this._show({message, title, time, showClose, onClose, type: MessageType.NOTICE});
  }

  _show({message, title, time, showClose, onClose, html, align, onClick, type}) {
    if (CONF.UseComponent.Notification === undefined) {
      setTimeout(() => {//等待通知组件装载完毕
        this._show({message, title, time, showClose, onClose, html, align, onClick, type});
      }, 100);
      return;
    }
    switch (type) {
      case MessageType.SUCCESS :
        CONF.UseComponent.Notification.success({
          title: title,
          desc: message,
          duration: time / 1000,
          onClose: onClose,
          render: typeof html === 'function' ? html : undefined
        });
        break;
      case MessageType.FAIL :
        CONF.UseComponent.Notification.info({
          title: title,
          desc: message,
          duration: time / 1000,
          onClose: onClose,
          render: typeof html === 'function' ? html : undefined
        });
        break;
      case MessageType.ERROR :
        CONF.UseComponent.Notification.error({
          title: title,
          desc: message,
          duration: time / 1000,
          onClose: onClose,
          render: typeof html === 'function' ? html : undefined
        });
        break;
      case MessageType.WARN :
        CONF.UseComponent.Notification.warning({
          title: title,
          desc: message,
          duration: time / 1000,
          onClose: onClose,
          render: typeof html === 'function' ? html : undefined
        });
        break;
      case MessageType.INFO :
        CONF.UseComponent.Notification.info({
          title: title,
          desc: message,
          duration: time / 1000,
          onClose: onClose,
          render: typeof html === 'function' ? html : undefined
        });
        break;
      default:
        throw new Error(`IviewNotification暂不支持该消息类型:${type}`);
    }
  }

  closeAll() {
    CONF.UseComponent.Notification.destroy();
  }
}

/**
 * element-ui的Confirm
 */
class ElementConfirm extends ConfirmOptions {

  constructor() {
    super();
  }

  _show({
          message,
          title,
          showClose,
          html,
          align,
          lockScroll,
          showCancelButton,
          showOkButton,
          buttonTests,
          onClicks,
          cancelButtonText,
          okButtonText,
          closeOnClickModal,
          closeOnPressEscape,
          closeOnHashChange,
          roundButton,
          onOk,
          beforeClose,
          onCancel,
          type
        }) {
    if (CONF.UseComponent.Confirm === undefined) {
      setTimeout(() => {//等待通知组件装载完毕
        this._show({
          message,
          title,
          showClose,
          html,
          align,
          lockScroll,
          showCancelButton,
          showOkButton,
          buttonTests,
          onClicks,
          cancelButtonText,
          okButtonText,
          closeOnClickModal,
          closeOnPressEscape,
          closeOnHashChange,
          roundButton,
          onOk,
          beforeClose,
          onCancel,
          type
        });
      }, 100);
      return;
    }
    let t;
    switch (type) {
      case MessageType.NULL:
        break;
      case MessageType.SUCCESS:
        t = 'success';
        break;
      case MessageType.WARN:
        t = 'warning';
        break;
      case MessageType.INFO:
        t = 'info';
        break;
      case MessageType.ERROR:
        t = 'error';
        break;
      case MessageType.FAIL:
        t = 'info';
        break;
      default:
        throw new Error(`ElementMessage暂不支持该消息类型:${type}`);
    }
    CONF.UseComponent.Confirm.confirm(message, title, {
      dangerouslyUseHTMLString: typeof html === 'boolean' ? html : false,
      type: t,
      showClose: showClose,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          onOk(done, instance);
        } else {
          done();
        }
      },
      lockScroll: lockScroll,
      showCancelButton: showCancelButton,
      showConfirmButton: showOkButton,
      cancelButtonText: cancelButtonText,
      confirmButtonText: okButtonText,
      closeOnClickModal: closeOnClickModal,
      closeOnPressEscape: closeOnPressEscape,
      closeOnHashChange: closeOnHashChange,
      center: align === 'center' ? true : false,
      roundButton: roundButton,
    }).catch(onCancel);
  }
}

/**
 * layer的Confirm
 */
class LayerConfirm extends ConfirmOptions {

  constructor() {
    super();
  }

  _show({
          message,
          title,
          showClose,
          html,
          align,
          lockScroll,
          showCancelButton,
          showOkButton,
          buttonTests,
          onClicks,
          cancelButtonText,
          okButtonText,
          closeOnClickModal,
          closeOnPressEscape,
          closeOnHashChange,
          roundButton,
          onOk,
          beforeClose,
          onCancel,
          type
        }) {
    if (CONF.UseComponent.Confirm === undefined) {
      setTimeout(() => {//等待通知组件装载完毕
        this._show({
          message,
          title,
          showClose,
          html,
          align,
          lockScroll,
          showCancelButton,
          showOkButton,
          buttonTests,
          onClicks,
          cancelButtonText,
          okButtonText,
          closeOnClickModal,
          closeOnPressEscape,
          closeOnHashChange,
          roundButton,
          onOk,
          beforeClose,
          onCancel,
          type
        });
      }, 100);
      return;
    }
    let t;//1、成功 2、错误 3、询问 4、锁定 5、哭脸 6、笑脸 7、警告
    switch (type) {
      case MessageType.NULL:
        t = 3;
        break;
      case MessageType.SUCCESS:
        t = 1;
        break;
      case MessageType.WARN:
        t = 7;
        break;
      case MessageType.INFO:
        t = 6;
        break;
      case MessageType.ERROR:
        t = 2;
        break;
      case MessageType.FAIL:
        t = 5;
        break;
      default:
        throw new Error(`LayerMessage暂不支持该消息类型:${type}`);
    }
    let btn = [okButtonText, cancelButtonText];
    if (buttonTests.length > 0) {
      btn = buttonTests;
    }
    let click = {
      btn1: (index, jq) => {
        onOk(() => {
          layer.close(index)
        }, layer, jq)
      },
      btn2: onCancel
    };
    if (onClicks.length > 0) {
      click = {};
      for (let i = 0; i < onClicks.length; i++) {
        click[`btn${i + 1}`] = (index, jq) => {
          onClicks[i](() => {
            layer.close(index)
          }, layer, jq)
        };
      }
    }
    CONF.UseComponent.Confirm.open({
      title: title,
      content: message,
      icon: t,
      btn: btn,
      closeBtn: showClose,
      shadeClose: closeOnClickModal,
      ...click
    });
  }
}

/**
 * element-ui的Loading
 */
class ElementLoading extends LoadingOptions {

  constructor() {
    super();
    this.targets = [];
  }

  _show({target, text, background}) {
    if (CONF.UseComponent.Loading === undefined) {
      setTimeout(() => {//等待消息组件装载完毕
        this._show({target, text, background});
      }, 100);
      return;
    }
    this.targets.push(CONF.UseComponent.Loading.service({
      target: target,
      text: text,
      background: background
    }));
  }

  stop() {
    for (let target of this.targets) {
      target.close();
    }
    this.targets = [];
  }
}

/**
 * iview的Loading
 */
class IviewLoading extends LoadingOptions {

  constructor() {
    super();
  }

  _show({target, text, background}) {
    if (CONF.UseComponent.Loading === undefined) {
      setTimeout(() => {//等待消息组件装载完毕
        this._show({target, text, background});
      }, 100);
      return;
    }
    CONF.UseComponent.Loading.start();
  }

  stop() {
    CONF.UseComponent.Loading && CONF.UseComponent.Loading.finish();
  }

}

/**
 * layer的Loading
 */
class LayerLoading extends LoadingOptions {

  constructor() {
    super();
    this.targets = [];
  }

  _show({target, text, background}) {
    if (CONF.UseComponent.Loading === undefined) {
      setTimeout(() => {//等待消息组件装载完毕
        this._show({target, text, background});
      }, 100);
      return;
    }
    this.targets.push(CONF.UseComponent.Loading.load(1));
  }

  stop() {
    for (let target of this.targets) {
      layer.close(target);
    }
  }

}

/**
 * element-ui的Alert
 */
class ElementAlert extends AlertOptions {

  constructor() {
    super();
  }

  _show({
          message,
          title,
          showClose,
          html,
          align,
          lockScroll,
          showOkButton,
          okButtonText,
          closeOnClickModal,
          closeOnPressEscape,
          closeOnHashChange,
          roundButton,
          onOk,
          type
        }) {
    if (CONF.UseComponent.Alert === undefined) {
      setTimeout(() => {//等待警告组件装载完毕
        this._show({
          message,
          title,
          showClose,
          html,
          align,
          lockScroll,
          showOkButton,
          okButtonText,
          closeOnClickModal,
          closeOnPressEscape,
          closeOnHashChange,
          roundButton,
          onOk,
          type
        });
      }, 100);
      return;
    }
    let t;
    switch (type) {
      case MessageType.NULL:
        break;
      case MessageType.SUCCESS:
        t = 'success';
        break;
      case MessageType.WARN:
        t = 'warning';
        break;
      case MessageType.INFO:
        t = 'info';
        break;
      case MessageType.ERROR:
        t = 'error';
        break;
      case MessageType.FAIL:
        t = 'info';
        break;
      default:
        throw new Error(`ElementMessage暂不支持该消息类型:${type}`);
    }
    CONF.UseComponent.Alert.alert(message, title, {
      dangerouslyUseHTMLString: typeof html === 'boolean' ? html : false,
      type: t,
      showClose: showClose,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          onOk(instance);
          done();
        } else {
          done();
        }
      },
      lockScroll: lockScroll,
      showConfirmButton: showOkButton,
      confirmButtonText: okButtonText,
      closeOnClickModal: true,
      closeOnPressEscape: true,
      closeOnHashChange: closeOnHashChange,
      center: align === 'center' ? true : false,
      roundButton: roundButton,
    }).catch(() => {
    });
  }

}

/**
 * layer的Alert
 */
class LayerAlert extends AlertOptions {

  constructor() {
    super();
  }

  _show({
          message,
          title,
          showClose,
          html,
          align,
          lockScroll,
          showOkButton,
          okButtonText,
          closeOnClickModal,
          closeOnPressEscape,
          closeOnHashChange,
          roundButton,
          onOk,
          type
        }) {
    if (CONF.UseComponent.Alert === undefined) {
      setTimeout(() => {//等待警告组件装载完毕
        this._show({
          message,
          title,
          showClose,
          html,
          align,
          lockScroll,
          showOkButton,
          okButtonText,
          closeOnClickModal,
          closeOnPressEscape,
          closeOnHashChange,
          roundButton,
          onOk,
          type
        });
      }, 100);
      return;
    }
    let t;//1、成功 2、错误 3、询问 4、锁定 5、哭脸 6、笑脸 7、警告
    switch (type) {
      case MessageType.NULL:
        t = 3;
        break;
      case MessageType.SUCCESS:
        t = 1;
        break;
      case MessageType.WARN:
        t = 7;
        break;
      case MessageType.INFO:
        t = 6;
        break;
      case MessageType.ERROR:
        t = 2;
        break;
      case MessageType.FAIL:
        t = 5;
        break;
      default:
        throw new Error(`LayerAlert暂不支持该消息类型:${type}`);
    }
    CONF.UseComponent.Alert.alert(message, {
      title: title,
      icon: t,
      closeBtn: showClose === false ? false : undefined,
      shadeClose: closeOnClickModal,
    }, (idx) => {
      onOk();
      layer.close(idx);
    });
  }

}

/**
 * axios的Ajax
 */
class AxiosAjax extends AjaxOptions {

  constructor() {
    super();
  }

  post(args, request) {
    if (request === undefined) {
      let {url, params, headers, loading, loadingText, target, race, raceText, raceTime} = this.__structureA(args);
      request = new Request(loading, loadingText, target, race, raceText, raceTime, (resolve, reject) => {
        CONF.UseComponent.Ajax.post(url, qs.stringify(params), {
          headers: headers,
          withCredentials:true
        }).then(resolve).catch(reject);
      });
    }
    if (CONF.UseComponent.Ajax === undefined) {
      setTimeout(() => {//等待Ajax组件装载完毕
        this.post(args, request);
      }, 100);
    } else {
      request.start();
    }
    return request;
  }
}

/**
 * 请求
 */
class Request extends CallbackOptions {

  constructor(loading, loadingText, target, race, raceText, raceTime, start) {
    super();
    Object.assign(this.Ajax, {
      loading: loading,
      loadingText: loadingText,
      target: target,
      race: race,
      raceText: raceText,
      raceTime: raceTime,
      start: start
    });
  }

  showRaceText = true;//是否显示竞速提示

  Ajax = {
    loading: undefined,
    loadingText: undefined,
    target: undefined,
    race: undefined,
    raceText: undefined,
    raceTime: undefined,
    start: undefined
  };

  //竞速函数
  race() {
    setTimeout(() => {
      if (this.showRaceText === true) {
        if (typeof this.Ajax.raceText === 'function') {
          this.Ajax.raceText(Message);
        } else {
          Message.open(this.Ajax.raceText);
        }
      }
    }, this.Ajax.raceTime);
  };

  start() {
    if (this.Ajax.loading === true) {
      Loading.start({
        target: this.Ajax.target,
        text: this.Ajax.loadingText
      });
    }
    if (this.Ajax.race === true) {
      this.race();
    }
    this.Ajax.start((res) => {
      this.showRaceText = false;//关闭竞速提示

      Parser.parse(res, this.__options);

      Loading.stop();
    }, (err) => {
      this.showRaceText = false;//关闭竞速提示
      Loading.stop();
      console.log(err);
      Message.open(`请求失败`);
    });
  }

}

/**
 * 默认解析器
 */
class DefaultParser extends ParserOptions {

  constructor() {
    super();
  }

  /**
   * 解析
   * @param data 数据
   */
  parse(data) {
    this.__options.finally.callback(data);
  }

  newInstance() {
    return new DefaultParser();
  }
}

/**
 * 对应后台DataView,用于解析并给予对应消息提示和执行回调函数
 */
class DataviewParser extends ParserOptions {

  constructor(data, parserOptions) {
    super(data, parserOptions);
  }

  //参数为后端返回的数据和消息
  __success(data, msg) {
    let {
      message = msg,
      close,
      time,
      callback
    } = this.__options.success;
    if(close === false) {
      Message.success({
        message: message,
        time: time
      })
    }
    callback(data);
  }

  __notSuccess(data) {
    let {
      callback
    } = this.__options.notSuccess;
    callback(data);
  }

  __fail(data, msg) {
    let {
      message = (this.__options.notSuccess.message || msg),
      close,
      time,
      callback
    } = this.__options.fail;
    if(close === false) {
      Message.fail({
        message: message,
        time: time
      })
    }
    callback(data);
  }

  __error(data, msg) {
    let {
      message = (this.__options.notSuccess.message || msg),
      close,
      time,
      callback
    } = this.__options.error;
    if(close === false) {
      Message.error({
        message: message,
        time: time
      })
    }
    callback(data);
  }

  __info(data, msg) {
    let {
      message = (this.__options.notSuccess.message || msg),
      close,
      time,
      callback
    } = this.__options.info;
    if(close === false) {
      Message.info({
        message: message,
        time: time
      })
    }
    callback(data);
  }

  __warn(data, msg) {
    let {
      message = (this.__options.notSuccess.message || msg),
      close,
      time,
      callback
    } = this.__options.warn;
    if(close === false) {
      Message.warn({
        message: message,
        time: time
      })
    }
    callback(data);
  }

  __finally(data) {
    let {
      callback
    } = this.__options.finally;
    callback(data);
  }

  __parse(data, options) {
    this.__options = options;
    this.parse(data.data);
  }

  parse(data) {
    let resultInfo = data.resultInfo;
    let msg = resultInfo.message;
    switch (resultInfo.type) {
      case MessageType.SUCCESS:
        this.__success(data, msg);
        this.__finally(data);
        break;
      case MessageType.FAIL:
        this.__fail(resultInfo, msg);
        this.__notSuccess(resultInfo);
        this.__finally(data);
        break;
      case MessageType.ERROR:
        this.__error(resultInfo, msg);
        this.__notSuccess(resultInfo);
        this.__finally(data);
        break;
      case MessageType.INFO:
        this.__info(resultInfo, msg);
        this.__notSuccess(resultInfo);
        this.__finally(data);
        break;
      case MessageType.WARN:
        this.__warn(resultInfo, msg);
        this.__notSuccess(resultInfo);
        this.__finally(data);
        break;
      case MessageType.NEED_LOGIN:
        console.log(msg);
        if(window.events) {
          window.events.emit('needLogin', resultInfo);
        }
        break;
      case MessageType.NO_AUTHORITY:
        console.log(msg);
        if(window.events) {
          window.events.emit('noAuthority', resultInfo);
        }
        break;
      case MessageType.NOT_FOUND:
        console.log(msg);
        if(window.events) {
          window.events.emit('notFound', resultInfo);
        }
        break;
    }
  }

  newInstance() {
    return new DataviewParser();
  }

}

/**
 * 消息提示
 */
export const Message = {

  target: undefined,

  open() {
    if (!this.target) {
      throw new Error(`您尚未配置Message工具使用的插件,无法使用Message功能`);
      return;
    }
    this.target.open(parseArgs(arguments));
  },

  success() {
    if (!this.target) {
      throw new Error(`您尚未配置Message工具使用的插件,无法使用Message功能`);
      return;
    }
    this.target.success(parseArgs(arguments));
  },

  fail() {
    if (!this.target) {
      throw new Error(`您尚未配置Message工具使用的插件,无法使用Message功能`);
      return;
    }
    this.target.fail(parseArgs(arguments));
  },

  error() {
    if (!this.target) {
      throw new Error(`您尚未配置Message工具使用的插件,无法使用Message功能`);
      return;
    }
    this.target.error(parseArgs(arguments));
  },

  info() {
    if (!this.target) {
      throw new Error(`您尚未配置Message工具使用的插件,无法使用Message功能`);
      return;
    }
    this.target.info(parseArgs(arguments));
  },

  warn() {
    if (!this.target) {
      throw new Error(`您尚未配置Message工具使用的插件,无法使用Message功能`);
      return;
    }
    this.target.warn(parseArgs(arguments));
  },

  closeAll() {
    if (!this.target) {
      throw new Error(`您尚未配置Message工具使用的插件,无法使用Message功能`);
      return;
    }
    this.target.closeAll();
  }

};

/**
 * 通知
 */
export const Notification = {

  target: undefined,

  success() {
    if (!this.target) {
      throw new Error(`您尚未配置Notification工具使用的插件,无法使用Notification功能`);
      return;
    }
    this.target.success(parseArgs(arguments));
  },

  fail() {
    if (!this.target) {
      throw new Error(`您尚未配置Notification工具使用的插件,无法使用Notification功能`);
      return;
    }
    this.target.fail(parseArgs(arguments));
  },

  error() {
    if (!this.target) {
      throw new Error(`您尚未配置Notification工具使用的插件,无法使用Notification功能`);
      return;
    }
    this.target.error(parseArgs(arguments));
  },

  info() {
    if (!this.target) {
      throw new Error(`您尚未配置Notification工具使用的插件,无法使用Notification功能`);
      return;
    }
    this.target.info(parseArgs(arguments));
  },

  warn() {
    if (!this.target) {
      throw new Error(`您尚未配置Notification工具使用的插件,无法使用Notification功能`);
      return;
    }
    this.target.warn(parseArgs(arguments));
  },

  closeAll() {
    if (!target) {
      throw new Error(`您尚未配置Notification工具使用的插件,无法使用Notification功能`);
      return;
    }
    this.target.closeAll();
  }

};

/**
 * 询问框
 */
export const Confirm = {

  target: undefined,

  open() {
    if (!this.target) {
      throw new Error(`您尚未配置Confirm工具使用的插件,无法使用Confirm功能`);
      return;
    }
    this.target.open(parseArgs(arguments));
  },

  success() {
    if (!this.target) {
      throw new Error(`您尚未配置Confirm工具使用的插件,无法使用Confirm功能`);
      return;
    }
    this.target.success(parseArgs(arguments));
  },

  fail() {
    if (!this.target) {
      throw new Error(`您尚未配置Confirm工具使用的插件,无法使用Confirm功能`);
      return;
    }
    this.target.fail(parseArgs(arguments));
  },

  error() {
    if (!this.target) {
      throw new Error(`您尚未配置Confirm工具使用的插件,无法使用Confirm功能`);
      return;
    }
    this.target.error(parseArgs(arguments));
  },

  info() {
    if (!this.target) {
      throw new Error(`您尚未配置Confirm工具使用的插件,无法使用Confirm功能`);
      return;
    }
    this.target.info(parseArgs(arguments));
  },

  warn() {
    if (!this.target) {
      throw new Error(`您尚未配置Confirm工具使用的插件,无法使用Confirm功能`);
      return;
    }
    this.target.warn(parseArgs(arguments));
  }
};

/**
 * 警告
 */
export const Alert = {
  target: undefined,

  open() {
    if (!this.target) {
      throw new Error(`您尚未配置Alert工具使用的插件,无法使用Alert功能`);
      return;
    }
    this.target.open(parseArgs(arguments));
  },

  success() {
    if (!this.target) {
      throw new Error(`您尚未配置Alert工具使用的插件,无法使用Alert功能`);
      return;
    }
    this.target.success(parseArgs(arguments));
  },

  fail() {
    if (!this.target) {
      throw new Error(`您尚未配置Alert工具使用的插件,无法使用Alert功能`);
      return;
    }
    this.target.fail(parseArgs(arguments));
  },

  error() {
    if (!this.target) {
      throw new Error(`您尚未配置Alert工具使用的插件,无法使用Alert功能`);
      return;
    }
    this.target.error(parseArgs(arguments));
  },

  info() {
    if (!this.target) {
      throw new Error(`您尚未配置Alert工具使用的插件,无法使用Alert功能`);
      return;
    }
    this.target.info(parseArgs(arguments));
  },

  warn() {
    if (!this.target) {
      throw new Error(`您尚未配置Alert工具使用的插件,无法使用Alert功能`);
      return;
    }
    this.target.warn(parseArgs(arguments));
  }
};

/**
 * 加载特效
 */
export const Loading = {

  target: undefined,

  start() {
    if (!this.target) {
      throw new Error(`您尚未配置Loading工具使用的插件,无法使用Loading功能`);
      return;
    }
    this.target.start(parseArgs(arguments));
  },

  stop() {
    if (!this.target) {
      throw new Error(`您尚未配置Loading工具使用的插件,无法使用Loading功能`);
      return;
    }
    setTimeout(() => {
      this.target.stop();
    }, 300);//延迟关闭,防止关闭动作在开始动作之前被执行
  }
};

/**
 * Ajax
 */
export const Ajax = {

  target: undefined,

  /**
   * 发送post请求
   * @param url 请求地址,与params一起使用数组传参
   * @param params 请求参数,与url一起使用数组传参
   * @param loadText loading时显示的文字
   * @param errMsg 连接失败时的消息
   * @param target loading区域,传入DOM对象或者字符串(document.querySelector获取DOM),如id属性传入'#{id}',默认全屏
   */
  post() {
    if (!this.target) {
      throw new Error(`您尚未配置Ajax工具使用的插件,无法使用Ajax功能`);
      return;
    }
    return this.target.post(parseArgs(arguments));
  }

};

/**
 * 解析器
 */
export const Parser = {

  target: undefined,

  parse(data, options) {
    if (!this.target) {
      throw new Error(`您尚未配置Parser工具使用的插件,无法使用Parser功能`);
      return;
    }
    if (options) {
      this.target.__parse(data, options);
    } else {
      let t = this.target.newInstance();
      setTimeout(() => {
        t.parse(data);
      }, 0);
      return t;
    }
  }

};

//根据配置,按需加载依赖组件
(() => {
  let elementUseComponents = [];//使用的element组件集合
  let iviewUseComponents = [];//使用的iview组件集合
  let layerUseComponents = [];//使用的layer组件集合
  let axiosUseComponents = [];//使用的axios组件集合
  //遍历配置的组件名
  let componentValue;
  for (let componentName in CONF.UseComponentConf) {
    componentValue = CONF.UseComponentConf[componentName];
    if (!componentValue) {
      continue;
    }
    //校验该组件是否支持配置的第三方插件
    let options = CONF.componentTypes[componentName];
    if (options === undefined) {
      throw new Error(`不存在工具类型:${componentName}`);
    }
    let option = options[componentValue];
    if (option === undefined) {
      throw new Error(`工具${componentName}暂不支持该第三方插件:${componentValue}`);
    }

    eval(`${componentName}.target = new ${stringCase(componentValue)}${componentName}()`);

    switch (componentValue) {
      case 'iview':
        iviewUseComponents.push(componentName);
        break;
      case 'element':
        elementUseComponents.push(componentName);
        break;
      case 'layer':
        layerUseComponents.push(componentName);
        break;
      case 'axios':
        axiosUseComponents.push(componentName);
        break;
      case 'default':
        break;
      case 'dataView':
        break;
      default:
        throw new Error(`暂不支持该第三方插件:${componentValue}`);
    }
  }

  if (elementUseComponents.length > 0) {
    import('element-ui/lib/theme-chalk/index.css');
    import('element-ui')
      .then((Element) => {
        for (let elementUseComponent of elementUseComponents) {
          CONF.UseComponent[elementUseComponent] = Element[CONF.componentTypes[elementUseComponent].element];
        }
      });
  }
  if (iviewUseComponents.length > 0) {
    import('iview/dist/styles/iview.css');
    import('iview')
      .then((iv) => {
        for (let iviewUseComponent of iviewUseComponents) {
          CONF.UseComponent[iviewUseComponent] = iv[CONF.componentTypes[iviewUseComponent].iview];
        }
      });
  }
  if (layerUseComponents.length > 0) {
    if (!jQuery) {
      throw new Error('欲使用layer,请在html中引入1.8版本以上的jquery');
    }
    if (!layer) {
      throw new Error('欲使用layer,请在html中引入layer.js');
    }
    for (let layerUseComponent of layerUseComponents) {
      CONF.UseComponent[layerUseComponent] = layer;
    }
  }
  if (axiosUseComponents.length > 0) {
    import('axios')
      .then((as) => {
        for (let axiosUseComponent of axiosUseComponents) {
          CONF.UseComponent[axiosUseComponent] = as;
        }
      })
  }
})();
