
const buildConf = require('./build.conf');
const projectConf = require('./project.conf');

/**
 * 配置相对请求根路径
 */
const baseUrl = 'http://192.168.0.136:7089/xuanke/';

/**
 * 配置代理地址
 */
const proxys = {
  '/api': ['http://192.168.0.136:7089/xuanke/']
};

/**
 * 获取代理地址配置
 */
module.exports.getProxys = function () {
  let r = {};
  for (let i in proxys) {
    r[i] = {
      target: proxys[i][0],
      changeOrigin: true,
      pathRewrite: function () {
        let pr = {};
        let v = '';
        for (let j = 1; j < proxys[i].length; j++) {
          v += proxys[i][j];
        }
        pr[`^${i}`] = v;
        return pr;
      }()
    }

  }
  return r;
};

/**
 * 获取相对请求根路径
 */
module.exports.getBaseUrl = function () {
  return buildConf.production_environment ? projectConf.serverPath : baseUrl;
};
