'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Project = require('./model/project');

var app = express();
var router = express.Router();


//set our port to either a predetermined port number if you have set
//it up, or 3000
var port = process.env.API_PORT || 3001;


mongoose.connect('mongodb://localhost/portfolio');

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
  next();
});



// now we can set the route path & initialize the API
router.get('/', (req, res) => {
    res.json({ message: 'API Initialized!'});
});

// adding the /posts route to our /api router
router.route('/projects')
// retrieve all posts from the database
.get((req, res) => {
   //looks at out Post Scheme
    Project.find(function(err, posts) {
        if (err)
            res.send(err);
        // responds with json object of our database posts.
        res.json(posts)
    });
})


// post new post to the database
.post((req, res) => {
    const project = new Project();
    // bodyParser lets us use the req.body
    project.title = req.body.title;
    project.description = req.body.description;

    project.save((err) => {
        if (err)
            res.send(err);
        res.json({ message: 'project successfully added!' });
    });
});

router.route('/projects/:project_id')
// The put method gives us the chance to update our comment
//  based on the ID passed to the router.
    .put((req, res) => {
    Project.findById(req.params.project_id, (err, project) => {
        if(err)
            res.send(err);
        // setting the new title description to whatever was changed. If nothing
        // was changed we will not alter the field
        ( req.body.title ) ? project.title = req.body.title : null;
        ( req.body.description ) ? project.description = req.body.description : null;
        // save post
        project.save((err) => {
            if(err)
                res.send(err);
            res.json({ message: 'project has been updated' });
        });
    });
})

// delete method for removing a post from our database
.delete((req, res) => {
    // selects the post by its ID, then removes it.
    Project.remove({ _id: req.params.project_id }, (err, project) => {
        if (err)
            res.send(err);
        res.json({ message: 'Project has been deleted' })
    })
});

//Use our router configuration when we call /api
app.use('/api', router);


app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
