process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  configureWebpack: {
    entry: {
      app: './src/index.js'
    }
  },
  productionSourceMap: false
}
