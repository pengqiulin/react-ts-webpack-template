const path = require('path')
const webpackCommonConfig = require('./webpack.common.js')('development')

module.exports = {
  devServer: {
    host: 'localhost', //指定Host，改为0.0.0.0可以被外部访问
    port: 8888, //指定端口
    //open: true, //服务启动后自动打开默认浏览器
    historyApiFallback: true, //当找不到也面时会默认返回index.html
    hot: true, //启用模块热替换，在修改模块时不会重新加载整个页面，只会更新改变的内容
    compress: true, // 启动GZip压缩
    https: false, // 是否启用https协议
    static: {
      directory: path.join(__dirname, 'public')
    },
    proxy: {
      // 启用请求代理，可以解决前端跨域请求的问题
      '/api': 'www.baidu.com'
    }
  },
  // 资源映射: 会生成sourcemap文件，将打包后的文件与源码进行映射 方便调式开发
  devtool: 'cheap-module-source-map',
  ...webpackCommonConfig
}
