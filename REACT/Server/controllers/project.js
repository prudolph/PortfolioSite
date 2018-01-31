require('dotenv').load();
var express = require('express');
var router = express.Router();
var multer = require('multer');
var config = require('../config');
const Project = require('./../models/project.js');
const mongoose = require('mongoose');


//Set up default mongoose connection
mongoose.connect(config.db, { useMongoClient: true });

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//var passport = require('passport');




router.get('/', function(req, res, next) {
  console.log("Getting projects");
  
  Project.find().
    exec(function (err, projects) {
      if (err){
        console.log("Could not find Projects error: "+ err);
        return next(err);
      }else{
        
        res.send(JSON.stringify(projects));
      }
      
      });
  });

router.get('/:slug', function(req, res, next) {
  console.log("Getting project with slug : ", req.params.slug);

  var slug={slug:req.params.slug};

  Project.find(slug).
    exec(function (err, entry) {
      if (err){
        console.log("Could not find Projects error: "+ err);
        return next(err);
      }
      console.log("Found project", entry[0]);
      res.send(JSON.stringify(entry[0]));
  });
});




module.exports = router;
