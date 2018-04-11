var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var mongoose = require('mongoose');//.set('debug', true),

require('dotenv').load();

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
  s3.getSignedUrl('putObject', s3Params, (err, url) => {
    console.log("GET SIGNED URL    ");
      if(err){
        console.log("ERROR SIGNING KEY ", err);
        return res.end();
      }else{

        console.log('The URL is', url);
        const returnData = {
          signedRequest: url,
          //https://s3-us-west-2.amazonaws.com/paulportfoliostorage/IMG_2500.JPG

          url: `https://s3-us-west-2.amazonaws.com/${process.env.S3_BUCKET}/${fileName}`

        };

        res.write(JSON.stringify(returnData));
        res.end();

      }
    });
});

module.exports = router;
