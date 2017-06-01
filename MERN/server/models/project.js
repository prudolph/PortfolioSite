
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  projectName: { type: String, required: true },
  posterDescription: { type: String, required: true }
});


mongoose.model('Project', ProjectSchema);
