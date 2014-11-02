var path = require('path');

module.exports = {
  db: function (overrideEnv) {
    var env = overrideEnv || process.env.NODE_ENV;

    if (env === 'test') {
      return 'mongodb://localhost/eautracker-test';
    }
    if (env === 'production') {
      return 'mongodb://localhost/eautracker';
    }
    else {
      return 'mongodb://localhost/eautracker-dev';
    }
  },
  port: process.env.PORT || 3000,
  rootDir: __dirname
};
