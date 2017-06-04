var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');//.set('debug', true),
//var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
/*
  var projects;
  Project.find( params ).
    exec(function (err, entries) {
      if (err)
        return next(err);

        projects=entries;
  });
*/

  res.render('projects');
});

module.exports = router;
