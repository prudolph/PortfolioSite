var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'Projects-DEV'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/projects'
  },

  test: {
    root: rootPath,
    app: {
      name: 'Projects-TEST'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/projects'
  },

  production: {
    root: rootPath,
    app: {
      name: 'Projects-PROD'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || 'mongodb://localhost/projects'
  }
};

module.exports = config[env];
