
module.exports = {
  /**
   * 是否是生产环境,打包时要改为true
   * 开发时使用false
   * 用来控制如axios的代理地址映射
   */
  production_environment: false,

  /**
   * 是否合并客户端和服务端
   * 前后端分离 => false
   * 前后端整合 => true
   */
  mergeClientServer: false,

  /**
   * 是否已经存在根路径
   * 一般用于区分包含base标签的JSP页面和Html页面
   */
  existsBasePath: false,

  /**
   * 入口文件相关配置
   */
  mains: {
    sysconf: {
      title: '系统管理'//暂时无效,后续使用EJS实现
    }
  },

  /**
   * 依赖的第三方js文件
   * 禁止使用vendor,因为会默认把所有入口文件的公共代码打包成vendor文件
   */
  vendors: {
    /*    vendor1: {//组名
          resources: ['static/js/jquery-1.11.3.min.js'],
          owners: ['sysconf']//属于哪个模块入口
        },*/
    /*    vendor2: {
          resources: ['static/easyui/jquery.easyui.min.js'],
          owners: ['sysconf']
        },
        vendor3: {
          resources: ['static/easyui-extension/datagrid-cellediting.js', 'static/easyui-extension/datagrid-filter.js'],
          owners: ['sysconf']
        }*/
  },

  // assetsRoot: '../../xkfront/src/main/resources/static',//webpack输出的目标文件夹路径

  // assetsPublicPath: '../../xkfront/',//webpack编译输出的发布路径

  // assetsSubDirectory: 'xkfront',//打包二级文件夹

  // htmlsSubDirectory: 'view'//html打包二级文件夹,默认在assetsSubDirectory下


  assetsRoot: '../../xkfront/src/main/resources/static',//webpack输出的目标文件夹路径

  assetsPublicPath: '../../xuanke/',//webpack编译输出的发布路径

  assetsSubDirectory: 'xuanke',//打包二级文件夹

  htmlsSubDirectory: 'view'//html打包二级文件夹,默认在assetsSubDirectory下
  
};
