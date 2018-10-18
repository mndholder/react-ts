const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const cssLoaderConfig = {
  // Use this loader instead of css-loader to generate css module typings
  loader: require.resolve('typings-for-css-modules-loader'),
  options: {
    modules: true,
    importLoaders: 1,
    localIdentName: "[name]--[local]--[hash:base64:8]",
    namedExport: true,
    camelCase: true
  }
};

const postCssLoaderConfig = {
  loader: require.resolve('postcss-loader'),
  options: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-preset-env')({
        stage: 0, // enables all postcss-preset-env features
        features: {
          'custom-properties': {
            preserve: false // returns calculated values instead of variable names
          }
        }
      }),
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        flexbox: 'no-2009',
      }),
    ],
  },
}

const cssLoadersChainDev = [
  require.resolve('style-loader'),
  {
    ...cssLoaderConfig,
    options: {
      ...cssLoaderConfig.options,
      sourceMap: false,
      minimize: false
    }
  },
  postCssLoaderConfig
];

const cssLoadersChainProd = [
  {
    ...cssLoaderConfig,
    options: {
      ...cssLoaderConfig.options,
      sourceMap: process.env.GENERATE_SOURCEMAP !== 'false',
      minimize: true
    }
  },
  postCssLoaderConfig
]

const cssLoadersConfigDev = {
  test: /\.css$/,
  use: cssLoadersChainDev
};

const cssLoadersConfigProd = {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    use: cssLoadersChainProd
  })
}

module.exports = {
  cssLoadersChainDev,
  cssLoadersChainProd,
  cssLoadersConfigDev,
  cssLoadersConfigProd
}
