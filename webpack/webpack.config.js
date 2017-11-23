const path = require('path');

module.exports = function(env) {
  return require(
    path.resolve(__dirname,`./webpack.${env}.js`)
  );
};