var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Project = mongoose.model('Project');
require('dotenv').load();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/quotes', function(req, res, next) {
 console.log(req.body)

 var p = new Project({
      projectName: req.body['projectName'],
      projectDescription: req.body['projectDescription']
    });

    p.save(function (error) {
      if ( error ) {
        return res.render('/', { user: req.user, error_messages: 'Failed to save project: ' + error.message });
      }
      req.flash('success_messages', 'Project uploaded & saved!');
      res.redirect('/');
    });
});

module.exports = router;
