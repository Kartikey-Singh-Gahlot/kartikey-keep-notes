const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name:{type:String, default:'General', unique:true, required:true},
  description:{type:String, default: function get(){return `This is basic ${this.name} subject`}},
  chapters:{type:[mongoose.Schema.Types.ObjectId], ref:'Chapters', default:[]},
  likesCount:{type:Number, default:0},
  createdAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model('subjects', subjectSchema);