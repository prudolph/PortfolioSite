
require('dotenv').config()
process.env.S3_REGION

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'Portfolio-Dev'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || `mongodb://${process.env.DBUNAME}:${process.env.DBPASS}@ds135592.mlab.com:35592/heroku_3cmc1jsl`
  },
  test: {
    root: rootPath,
    app: {
      name: 'Portfolio--TEST'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || `mongodb://${process.env.DBUNAME}:${process.env.DBPASS}@ds135592.mlab.com:35592/heroku_3cmc1jsl`
  },

  production: {
    root: rootPath,
    app: {
      name: 'Portfolio-PROD'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || `mongodb://${process.env.DBUNAME}:${process.env.DBPASS}@ds135592.mlab.com:35592/heroku_3cmc1jsl`
  }
};

module.exports = config[env];