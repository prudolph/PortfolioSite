var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BioSchema = new Schema({
  _id:Number,
  description: { type: String, required: true},
  imageUrl:{type: String,required:false}
});

module.exports = mongoose.model('Bio', BioSchema);
