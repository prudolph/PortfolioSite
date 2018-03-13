require('dotenv').load();
const express = require('express');
const app = express();
const path = require('path');
const config = require('./config');
const glob = require("glob");
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server;

const project = require('./controllers/project');
const bio = require('./controllers/bio');

const publicPath = path.join(__dirname,'..','Server','public');

// serve static assets from the public folder in project root
app.use(express.static(publicPath)) 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(config.port, function () {
  console.log('Express server Started on port ' + config.port);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/projects', project);
app.use('/api/bio' ,bio);

app.get('*',(req,res)=>{
   res.sendFile(path.join(publicPath,'/index.html'));
  })

module.exports = app;

