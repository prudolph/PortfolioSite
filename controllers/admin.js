var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

var mongoose = require('mongoose');//.set('debug', true),
//var passport = require('passport');

require('dotenv').load();
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

      res.render('projectForm', {"data":JSON.stringify(project),"postUrl":"/admin/editProject/"+req.params.id});
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

        res.redirect('/admin/listProjects/');
      });

      res.render('addProject', {"data":project});
  });



});



router.get('/imgUploadTest', (req, res) => {
  console.log("s3 key", process.env.S3_KEY);
  console.log("s3 secret", process.env.S3_SECRET);
  res.render('imgUploadTest', {"postUrl":"/admin/editProject/"});
});

router.get('/sign-s3', (req, res) => {

  console.log('Sign For S3 ');
    var credParams={

      secretAccessKey:process.env.S3_SECRET,
      accessKeyId:process.env.S3_KEY,
      region:process.env.S3_REGION
      }


  var s3 = new AWS.S3(credParams);

  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };
  console.log("params", s3Params);
  s3.getSignedUrl('putObject', s3Params, (err, url) => {
    console.log("GET SIGNED URL    ");
      if(err){
        console.log("ERROR SIGNING KEY ", err);
        return res.end();
      }else{

        console.log('The URL is', url);
        const returnData = {
          signedRequest: url,
          url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };

        console.log("Return Data :", returnData);
        res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.write(JSON.stringify(returnData));
        res.end();

      }
    });
});

module.exports = router;
