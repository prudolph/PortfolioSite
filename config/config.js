var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'Portfolio'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/portfolio',
    feedWhitelist: [
      "http://localhost:3000",
      "http://localhost:3001"
    ]
  },

  test: {
    root: rootPath,
    app: {
      name: 'Portfolio'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/portfolio-test',
    feedWhitelist: [
      "http://localhost:3000",
      "http://localhost:3001"
    ]
  },

  production: {
    root: rootPath,
    app: {
      name: 'Portfolio'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || 'mongodb://localhost/portfolio',
    feedWhitelist: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://prudolph.com"
    ]
  }
};

module.exports = config[env];
