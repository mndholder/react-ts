const merge = require('webpack-merge');
const { compose } = require('react-app-rewired');

const addSassSupport = require('./config/rewire-sass-support');
const addDefinePluginVariables = require('./config/rewire-define-plugin');

const { version } = require('./package')

module.exports = function override(config, env) {
  return merge(
    // Dynamic config additions (imperative)
    compose(
      addSassSupport,
      addDefinePluginVariables([/^APP_/i], {
        'process.env.VERSION': JSON.stringify(version)
      })
    )(config, env),

    // Static config additions (declarative)
    {
      // Add your webpack config changes here
    }
  );
};
