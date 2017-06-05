var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');//.set('debug', true),
//var passport = require('passport');

var Project = require('./../models/project.js');
mongoose.model('Project');


router.get('/', function(req, res, next) {
  //redirect to listing out current projects for now
  res.redirect('/admin/list');
});

router.get('/list', function(req, res, next) {
  Project.find().
    exec(function (err, entries) {
      if (err) return next(err);
      res.render('listProjects', {"data":entries});
  });
});

router.get('/addProject', function(req, res, next) {
  res.render('addProject');
});


router.post('/addProject' ,function(req, res, next) {
  console.log("Adding Project");
  console.log(req.body);

  var p = new Project({
    title: req.body['title'],
    slug: req.body['slug'],
    subtitle: req.body['subtitle'],
    description: req.body['description'],
    facts:req.body['facts'],
    tags:req.body['tags']
  });

  p.save(function (error) {
    if ( error ) {
      console.log("Error Saving "+ error.message );
      return res.render('addProject', { error_messages: 'Failed to save Project: ' + error.message });
    }
    console.log("SAVED "+p.id);
    res.redirect('/admin/addProject');
  });

});

router.get('/editProject/:id', function(req, res, next) {

  Project.find(req.params.id).
    exec(function (err, entry) {
      if (err){
        console.log("Could not find Projects error: "+ err);
        return next(err);
      }
      project=entry[0];
      res.render('addProject', {"data":project});
  });


});

router.get('/addMedia:id', function(req, res, next) {
    res.render('addMedia');
});

router.post('/addMedia' ,function(req, res, next) {


});

module.exports = router;
