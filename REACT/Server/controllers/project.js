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

//Get All Projects
router.get('/', function(req, res, next) {

  Project.find().exec(function (err, projects) {
        if (err){
          console.log("Could not find Projects error: "+ err);
          return next(err);
        }else res.send(JSON.stringify(projects));
      });

  });

//Get project by Slug
router.get('/:slug', function(req, res, next) {

  var slug={slug:req.params.slug};

  Project.find(slug).
    exec(function (err, entry) {
      if (err){
        console.log("Could not find Projects error: "+ err);
        return next(err);
      }else res.send(JSON.stringify(entry[0]));
  });

});

router.post('/create',function(req, res, next) {
  var project = new Project({
    title:        req.body['title'],
    slug:         req.body['slug'],
    subtitle:     req.body['subtitle'],
    description:  req.body['description'],
    facts:        req.body['facts'],
    tags:         req.body['tags'],
    mediaUrls:    req.body['mediaUrls']
  });

  project.save(function (error) {
    if ( error ) {
      console.log("Error Saving "+ error.message );
      return res.render('addProject', { error_messages: 'Failed to save Project: ' + error.message });
    }
    res.send(JSON.stringify("OK"));
  });
});


router.post('/editProject/:id' ,function(req, res, next) {

  Project.findOne({_id:req.params.id}).
    exec(function (err, project) {
      if (err){
        console.log("Could not find Projects error: "+ err);
        return next(err);
      }
      console.log("\n\nEDIT PORJECT:: ", req.body);
      console.log(req.body['mediaUrls']);

      var updatedHeroUrl ="";
      var updatedMediaUrls=[];

      for (var i=0;i<req.body['mediaUrls'].length;i++){
        var url = req.body['mediaUrls'][i];
        console.log("url ", url);
        if(url.includes("hero")){
          updatedHeroUrl=url;
        }else{
          updatedMediaUrls.push(url);
        }
      }

      console.log("updatedHeroUrl: ", updatedHeroUrl);
      console.log("updatedMediaUrls",updatedMediaUrls);

      project.title         = req.body['title'];
      project.slug          = req.body['slug'];
      project.subtitle      = req.body['subtitle'];
      project.description   = req.body['description'];
      project.facts         = req.body['facts'];
      project.tags          = req.body['tags'];
      project.heroUrl       = updatedHeroUrl;
      project.mediaUrls     = updatedMediaUrls;

      project.save(function (err) {
        if ( error ) {
          console.log("Error Saving "+ err.message );
          return next(err);
        }else{
          res.send(JSON.stringify("OK"));
        }
      });

      
  });



  router.get('/getProjectMedia/:slug', (req, res) => {
    var credParams={
      secretAccessKey:process.env.S3_SECRET,
      accessKeyId:process.env.S3_KEY,
      region:process.env.S3_REGION
    }
    var s3 = new AWS.S3(credParams);
  
  
    var params = {
      Bucket: process.env.S3_BUCKET,
      Prefix:req.params.slug
    };
  
    s3.listObjectsV2(params, function(err, data) {
      if (err){ console.log(err, err.stack); // an error occurred
          res.end();
      }
      else   {
  
        var keys=[];
         for(var item in data['Contents']){
           var key = data['Contents'][item].Key;
           keys.push(`https://s3-us-west-2.amazonaws.com/${process.env.S3_BUCKET}/`+key);
         }
         console.log(keys);
         res.write(JSON.stringify(keys));
         res.end();
    }
    });
  });


});


module.exports = router;
