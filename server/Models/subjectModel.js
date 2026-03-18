const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name:{type:String, default:'Guest'},
  description:{type:String, required:true, unique:true},
  createdAt:{type:Date, default:Date.now}
})

const SubjectModel = mongoose.model('Subject', subjectSchema);

module.exports = SubjectModel;