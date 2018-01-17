require('dotenv').load();
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var config = require('./config');

var MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server;

  var glob = require("glob")
var passport = require("passport")

var project = require('./controllers/project');
var admin = require('./controllers/admin');
//////////////



var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});


var app = express();

//module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server Started on port ' + config.port);
});


/*
passport.use("admin",new BasicStrategy(
  function(username, password, done) {
    if (username.valueOf() === process.env.UNAME &&
      password.valueOf() === process.env.PASS)
      return done(null, true);
    else
      return done(null, false);
  }
));

passport.use("restricted",new BasicStrategy(
  function(username, password, done) {
    if (username.valueOf() === process.env.GUEST_UNAME &&
      password.valueOf() ===process.env.GUEST_PASS)
      return done(null, true);
    else
      return done(null, false);
  }
));
*/



//app.use(cors({origin: 'http://localhost:3000'}));


/*
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

hbs.registerHelper('ifVideo', function(conditional, options) {
  if(path.extname(conditional)==".mp4") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
*/



//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

//app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use('/projects', project);
app.use('/admin', passport.authenticate('admin', { session: false }) ,admin);
app.use('/', project);

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/
/*

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
module.exports = app;