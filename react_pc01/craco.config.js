//添加自定义对于webpack的配置
const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')
module.exports = {
module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名路径
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    },
    //cdn配置
  }
}
