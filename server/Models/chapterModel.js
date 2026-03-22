const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  subjectId:{type:mongoose.Schema.Types.ObjectId, ref:'Subject', required:true},
  number:{type:Number, required:true},
  title:{type:String, required:true},
  order:{type:Number, required:true, unique:true, },
  createdAt:{type:Date, default:Date.now}
})


module.exports = mongoose.model('chapters', chapterSchema);