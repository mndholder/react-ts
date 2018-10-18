const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const { compose, injectBabelPlugin } = require('react-app-rewired');

const rewireOneOfLoader = require('./config/rewire-plugins/rewire-one-of-loader')
const rewireCssLoader = require('./config/rewire-plugins/rewire-css-loader');
const rewireDefinePlugin = require('./config/rewire-plugins/rewire-define-plugin');

const { cssLoadersConfigDev, cssLoadersConfigProd} = require('./config/css-loaders-config')
const { scssLoadersConfigDev, scssLoadersConfigProd} = require('./config/scss-loaders-config')
const { lessLoadersConfigDev, lessLoadersConfigProd} = require('./config/less-loaders-config')

const { version } = require('./package');

module.exports = function override(config, env) {
  const isProd = env === 'production';

  return merge(
    /**
     * Dynamic overrides
     * Add imperative configuration and/or react-app-rewired plugins:
     * https://github.com/timarney/react-app-rewired#community-maintained-rewires
     */
    compose(
      // Adds CSS modules support (see config/css-loaders-config.js)
      rewireCssLoader(isProd ? cssLoadersConfigProd : cssLoadersConfigDev),
      // Adds SCSS support which also will be used as CSS modules (see config/scss-loaders-config.js)
      rewireOneOfLoader(oneOf => oneOf.unshift(isProd ? scssLoadersConfigProd : scssLoadersConfigDev)),
      // Adds LESS support which also will be used as CSS modules (see config/less-loaders-config.js)
      rewireOneOfLoader(oneOf => oneOf.unshift(isProd ? lessLoadersConfigProd : lessLoadersConfigDev)),
      // Excludes some semantic-ui config files from file-loader
      rewireOneOfLoader(oneOf => {
        const index = oneOf.length - 1;
        if (oneOf[index].exclude) {
          oneOf[index].exclude = oneOf[index].exclude.concat([
            /\.config$/,
            /\.variables$/,
            /\.overrides$/
          ])
        }
      }),
      // Adds more environment variables to DefinePlugin
      rewireDefinePlugin(
        // More prefixed variables in addition to REACT_APP_
        [/^APP_/i],
        // More statically defined variables
        {
          'process.env.VERSION': JSON.stringify(version)
        }
      ),
      injectBabelPlugin.bind(this, ['lodash', {'id': ['lodash', 'semantic-ui-react']}])
    )(config, env),

    /**
     * Static overrides
     * Add declarative overrides. This relies on webpack-merge utility which will merge configs together:
     * https://www.npmjs.com/package/webpack-merge
     */
    {
      plugins: [
        // Adds watch ignore for css modules' d.ts files
        new webpack.WatchIgnorePlugin([
          /css\.d\.ts$/,
          /scss\.d\.ts$/,
          /less\.d\.ts$/
        ])
      ],
      resolve: {
        alias: {
          '../../theme.config$': path.join(__dirname, 'src/styles/theme/theme.config')
        }
      }
    }
  );
};
