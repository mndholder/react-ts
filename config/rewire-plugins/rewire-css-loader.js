const rewireOneOfLoader = require('./rewire-one-of-loader');

module.exports = (options = {}) => {
  return function rewireCssLoader(config, env) {
    return rewireOneOfLoader(oneOf => {
      let index = -1;
      const cssLoaders = oneOf.find((conf, i) => {
        return String(conf.test) === String(/\.css$/) && (index = i) && true;
      });
      if (index !== -1) {
        oneOf[index] = {...cssLoaders, ...options};
      } else {
        oneOf.unshift(options);
      }
    })(config, env);
  }
}
