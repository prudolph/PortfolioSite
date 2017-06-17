var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'portfolio'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/portfolio'
  },

  test: {
    root: rootPath,
    app: {
      name: 'portfolio'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/portfolio'
  },

  production: {
    root: rootPath,
    app: {
      name: 'portfolio'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || 'mongodb://localhost/portfolio'
  }
};

module.exports = config[env];
