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
            res.render('projects', {"title":"Sample Title","data":projects});
  });
});


router.get('/add', function(req, res, next) {
    res.render('projectAdd');
});



var uploading = multer({
  dest: __dirname + '../public/uploads/',
})

router.post('/add' ,uploading,function(req, res, next) {
  console.log("Adding Project");
  console.log(req.body);
  console.log("-______________-");

  var p = new Project({

    title: req.body['title'],
    teaser: "Teaser",
    description: req.body['description']
  });

  p.save(function (error) {
    if ( error ) {
      return res.render('upload', { user: req.user, error_messages: 'Failed to save photo: ' + error.message });
    }

    res.redirect('/projects');
  });

});


module.exports = router;
