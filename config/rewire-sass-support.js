const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

// Add SCSS support by directly changing a loader object
module.exports = function addSassSupport(config, env) {
  const isProd = env === 'production';
  const oneOfRule = Object.assign({}, config.module.rules.find(rule => !!rule.oneOf));

  const loadersChain = [
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        minimize: isProd,
        sourceMap: isProd && process.env.GENERATE_SOURCEMAP !== 'false'
      }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
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
    },
    require.resolve('sass-loader')
  ];

  oneOfRule.oneOf.unshift(!isProd
    ? {
      test: /\.scss$/,
      use: [
        require.resolve('style-loader'),
        ...loadersChain
      ]
    }
    : {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        use: [
          ...loadersChain
        ]
      })
    }
  );

  return config;
};
