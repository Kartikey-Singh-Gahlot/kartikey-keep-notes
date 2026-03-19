const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name:{type:String, default:'General', unique:true},
  description:{type:String, required:true, unique:true},
  chapters:{type:[mongoose.Schema.Types.ObjectId], ref:'Chapters', default:[]},
  createdAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model('subjects', subjectSchema);