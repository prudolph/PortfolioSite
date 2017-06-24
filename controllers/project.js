var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');//.set('debug', true),
//var passport = require('passport');


var Project = require('./../models/project.js');
var Bio = require('./../models/bio.js');
mongoose.model('Project');


/* GET home page. */
router.get('/', function(req, res, next) {
  var projects;
  var bio;
  Project.find().
    exec(function (err, entries) {
      if (err){
        console.log("Could not find Projects error: "+ err);
        return next(err);
      }
      projects=entries;

      Bio.findOne({_id:0}).exec(function (err, foundBio) {
          if (err){
            console.log("Could not find bio error: "+ err);
            return next(err);
          }
          bio=foundBio;


          res.render('projects', {"data":projects,"bio":foundBio});
      });
  });
});

router.get('/:id', function(req, res, next) {
  console.log("Getting project with id : ", req.params.id);

  var project;
  var id={_id:req.params.id};

  Project.find(id).
    exec(function (err, entry) {
      if (err){
        console.log("Could not find Projects error: "+ err);
        return next(err);
      }
      project=entry[0];
      res.render('projectDetail', project);
  });
});




module.exports = router;
