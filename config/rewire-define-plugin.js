const webpack = require('webpack')
const DefinePlugin = webpack.DefinePlugin
const { scriptVersion } = require('../node_modules/react-app-rewired/scripts/utils/paths')
const { raw } = require(`${scriptVersion}/config/env`)()


function stringifyEnv(raw, additional = {}) {
  return {
    ...additional,
    // Builtin react environment vars take precedence
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
}

function filterEnv(env, prefixes = []) {
  return Object.keys(env)
    .filter(name => prefixes.some(prefix => prefix.test(name)))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {})
}

// Creates an overrider function
module.exports = function createRewire(prefixes = [/^APP_/i], env = {}) {
  // Adds more environment variables support by directly changing plugins array
  return function rewireDefinePlugin(config) {
    const plugins = config && config.plugins || []
    const index = plugins.findIndex(plugin => plugin instanceof DefinePlugin)
    if (index !== -1) {
      config.plugins[index] = new DefinePlugin(stringifyEnv({...raw, ...filterEnv(process.env, prefixes)}, env))
    }
    return config;
  }
}
