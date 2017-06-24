var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/config');
var mongoose = require('mongoose');
var hbs = require('hbs');
var cors = require('cors');

var passport = require('passport')
var BasicStrategy = require('passport-http').BasicStrategy

passport.use(new BasicStrategy(
  function(username, password, done) {
    if (username.valueOf() === 'prudolph' &&
      password.valueOf() === 'Duc887547ie')
      return done(null, true);
    else
      return done(null, false);
  }
));

require('dotenv').load();
var project = require('./controllers/project');
var admin = require('./controllers/admin');

var app = express();


app.use(cors({origin: 'http://localhost:3000'}));
mongoose.Promise = global.Promise;

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});


// view engine setup

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials/forms');

hbs.registerHelper('json', function(context) {
      return JSON.stringify(context);
});
hbs.registerHelper('equals', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/projects', project);
app.use('/admin', passport.authenticate('basic', { session: false }),admin);
app.use('/', project);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
