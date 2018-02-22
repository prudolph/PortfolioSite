require('dotenv').load();

const express = require('express');
const app = express();


const path = require('path');
const config = require('./config');


const bodyParser = require('body-parser');
/*
const MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server;
*/
const glob = require("glob");
const passport = require("passport");

const project = require('./controllers/project');
const admin = require('./controllers/admin');


const publicPath = path.join(__dirname,'..','public');


/*
const models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
*/


// serve static assets from the public folder in project root
app.use(express.static(publicPath)) 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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





// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

//app.use(passport.initialize());

app.use('/api/projects', project);
app.use('/api/admin', passport.authenticate('admin', { session: false }) ,admin);
app.get('*',(req,res)=>{
  res.sendFile(path.join(publicPath,'/index.html'));
})

module.exports = app;