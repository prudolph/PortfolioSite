var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var mongoose = require('mongoose');//.set('debug', true),
var Bio = require('./../models/bio.js');

router.get('/', function(req, res, next) {
  Bio.findOne({_id:0}).exec(function (err, bio) {
      if (err){
        console.log("Could not find Bio Data: "+ err);
        return next(err);
      }
      res.send(bio);
  });
});


router.post('/' ,function(req, res, next) {
  var bio;
  Bio.findOne({_id:0}).
    exec(function (err, foundBio) {
      if (err){
        bio= new Bio({_id:0});
      }else{
        bio=foundBio;
      }

      bio.description=req.body['description'];
      bio.imageUrl=req.body['mediaUrls'];

      bio.save(function (error) {
        if ( error ) {
          console.log("Error Saving "+ error.message );
          return res.render('/admin/bio/', { error_messages: 'Failed to save Project: ' + error.message });
        }
        res.redirect('/admin/bio/');
      });
    });


});
module.exports = router;