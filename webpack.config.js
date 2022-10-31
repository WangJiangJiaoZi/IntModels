function buildConfig(env) {
  // console.log(env);
  return require('./config/' + env + '.js')({ env: env });
}

module.exports = buildConfig;
