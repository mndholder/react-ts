module.exports = (cb) => {
  return function rewireOneOfLoader(config, env) {
    const oneOfRule = Object.assign({}, config.module.rules.find(rule => !!rule.oneOf));
    cb(oneOfRule.oneOf)
    return config;
  }
}
