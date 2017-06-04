var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');//.set('debug', true),
//var passport = require('passport');


var Project = require('./../models/project.js');
mongoose.model('Project');


/* GET home page. */
router.get('/', function(req, res, next) {
  var projects;
  Project.find().
    exec(function (err, entries) {
      if (err){
        console.log("Could not find Projects error: "+ err);
        return next(err);
      }
      console.log("found projects:");
      projects=entries;
      console.log(projects);
      res.render('projects', {"data":projects});
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


router.get('/add', function(req, res, next) {
    res.render('add');
});



router.post('/add' ,function(req, res, next) {
  console.log("Adding Project");
  console.log(req.body);

  var p = new Project({
    title: req.body['title'],
    teaser: "Teaser",
    description: req.body['description']
  });

  p.save(function (error) {
    if ( error ) {
      return res.render('projectAdd', { user: req.user, error_messages: 'Failed to save photo: ' + error.message });
    }
    console.log(p.id);
    res.redirect('/addMedia/');
  });

});

router.get('/addMedia:id', function(req, res, next) {
    res.render('addMedia');
});

router.post('/addMedia' ,function(req, res, next) {


});
module.exports = router;