const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { cssLoadersChainDev, cssLoadersChainProd} = require('./css-loaders-config');

const scssLoadersConfigDev = {
  test: /\.scss$/,
  use: [
    ...cssLoadersChainDev,
    require.resolve('sass-loader')
  ]
};

const scssLoadersConfigProd = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({
    use: [
      ...cssLoadersChainProd,
      require.resolve('sass-loader')
    ]
  })
};

module.exports = {
  scssLoadersConfigDev,
  scssLoadersConfigProd
}
