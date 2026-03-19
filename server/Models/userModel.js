const mongoose = require('mongoose');
const SubjectModel = require('./subjectModel');

const usersSchema = new mongoose.Schema({
   name : {type:String, default:"guest"},
   email : {type:String, required:true},
   password : {type:String, default:null, select:false},
   googleId : {type:String, default:null},
   admin : {type:Boolean, default:false},
   lightTheme : {type:Boolean, default:true},
   otp: {type:String, select:false},
   otpExpiry: {type:Date, select:false},
   isVerified : {type:Boolean, default:false},
   subjects:{type:[mongoose.Schema.Types.ObjectId], ref:'Subjects', default:[]},
})



module.exports = new mongoose.model("Users", usersSchema );