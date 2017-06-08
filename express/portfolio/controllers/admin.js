var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');//.set('debug', true),
//var passport = require('passport');

var Project = require('./../models/project.js');
mongoose.model('Project');


router.get('/', function(req, res, next) {
  //redirect to listing out current projects for now
  res.redirect('/admin/listProjects');
});


router.get('/listProjects', function(req, res, next) {
  Project.find().
    exec(function (err, entries) {
      if (err) return next(err);
      res.render('listProjects', {"data":entries});
  });
});


router.get('/addProject', function(req, res, next) {
  res.render('projectForm',{"postUrl":"/admin/addProject"});
});


router.post('/addProject' ,function(req, res, next) {
  var project = new Project({
    title: req.body['title'],
    slug: req.body['slug'],
    subtitle: req.body['subtitle'],
    description: req.body['description'],
    facts:req.body['facts'],
    tags:req.body['tags']
  });

  project.save(function (error) {
    if ( error ) {
      console.log("Error Saving "+ error.message );
      return res.render('addProject', { error_messages: 'Failed to save Project: ' + error.message });
    }
    res.redirect('/admin/editProject/'+project.id);
  });
});

router.get('/editProject/:id', function(req, res, next) {
  Project.findOne({_id:req.params.id}).
    exec(function (err, project) {
      if (err){
        console.log("Could not find Projects error: "+ err);
        return next(err);
      }

      res.render('projectForm', {"data":project,"postUrl":"/admin/editProject"});
  });
});

router.post('/editProject/:id' ,function(req, res, next) {
  console.log("SAVING  Project EDITS");
  console.log(req.body);

  Project.findOne({_id:req.params.id}).
    exec(function (err, project) {
      if (err){
        console.log("Could not find Projects error: "+ err);
        return next(err);
      }

      project.title= req.body['title'],
      project.slug= req.body['slug'],
      project.subtitle= req.body['subtitle'],
      project.description= req.body['description'],
      project.facts=req.body['facts'],
      project.tags=req.body['tags']

      project.save(function (error) {
        if ( error ) {
          console.log("Error Saving "+ error.message );
          return res.render('/admin/editProject/'+project.id, { error_messages: 'Failed to save Project: ' + error.message });
        }
        res.redirect('/admin/editProject/'+project.id);
      });


      res.render('addProject', {"data":project});
  });



});

router.get('/addMedia:id', function(req, res, next) {
    res.render('addMedia');
});

router.post('/addMedia' ,function(req, res, next) {


});

module.exports = router;
