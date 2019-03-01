const buildConf = require('./build.conf');

/**
 * 服务端地址
 */
const server_path = 'http://192.168.0.136:7089/xuanke/';

/**
 * 客户端地址
 */
const client_path = 'http://192.168.0.147:8000/xkfront/';

/**
 * 客户端路径
 */
const clientPath = function () {
  return client_path;
}();

const serverPath = function () {
  return buildConf.mergeClientServer ? buildConf.existsBasePath ? '' : server_path : server_path;
}();

const basePath = function () {
  return buildConf.mergeClientServer ? serverPath : clientPath;
}();

module.exports = {
  /**
   * 客户端地址
   */
  clientPath: clientPath,
  /**
   * 服务端地址
   */
  serverPath: serverPath,
  /**
   * 前后端分离 => clientPath
   * 前后端整合 => serverPath
   */
  basePath: basePath,
  /**
   * 是否合并前后端
   * true => 合并
   * false => 前后端分离
   */
  mergeClientServer: buildConf.mergeClientServer
};
