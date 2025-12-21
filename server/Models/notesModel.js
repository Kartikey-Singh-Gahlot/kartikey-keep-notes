const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
   notesTitle : {type:String, default:'untitled'},
   notesContent : {type:String, default:'empty'},
   createdAt : {type:Date, default : Date.now },
   user : {type:mongoose.Schema.Types.ObjectId, ref:"kpUsers", required:true},
})



module.exports = new mongoose.model("kpNotes", notesSchema );