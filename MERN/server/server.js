
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Issue = require('./models/project.js');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/api/projects', (req, res) => {
  db.collection('projects').find().toArray().then(issues => {
    const metadata = { total_count: issues.length };
    res.json({ _metadata: metadata, records: issues })
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.post('/api/projects', (req, res) => {
  console.log(req.body);
  const newProject = req.body;
  console.log( "Creating New Project");

  newProject.projectName = "HELLLO "+  Date().toString();
  newProject.projectDescription = "Description .......";

  db.collection('projects').insertOne(newProject).then(result =>
    db.collection('projects').find({ _id: result.insertedId }).limit(1).next()
  ).then(newProject => {
    res.json(newProject);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

let db;
MongoClient.connect('mongodb://localhost/projects').then(connection => {
  db = connection;
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});
