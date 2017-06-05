var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  title: { type: String, required: true },
  teaser: { type: String, required: false },
  description: { type: String, required: true},
  installDate: { type: Date, required: false, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
