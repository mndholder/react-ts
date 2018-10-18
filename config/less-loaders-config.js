const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { cssLoadersChainDev, cssLoadersChainProd} = require('./css-loaders-config');

const lessLoadersConfigDev = {
  test: /\.less/,
  use: [
    ...cssLoadersChainDev,
    require.resolve('less-loader')
  ]
};

const lessLoadersConfigProd = {
  test: /\.less/,
  loader: ExtractTextPlugin.extract({
    use: [
      ...cssLoadersChainProd,
      require.resolve('less-loader')
    ]
  })
};

module.exports = {
  lessLoadersConfigDev,
  lessLoadersConfigProd
}
