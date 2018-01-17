var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true,index:true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true},
  installDate: { type: Date, required: false, default: Date.now },
  facts: { type: String, required: false},
  tags: { type: String, required: false},
  mediaUrls: [{type: String}],
  heroUrl: { type: String, required: false},
  restricted:{type:Boolean,default:false},
  order:{type:Number,required:false,default:1000}

});

module.exports = mongoose.model('Project', ProjectSchema);