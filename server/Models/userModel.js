const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
   name : {type:String, default:"guest"},
   email : {type:String, required:true},
   password : {type:String, default:null},
   googleId : {type:String, default:null},
   admin : {type:Boolean, default:false},
   lightTheme : {type:Boolean, default:true},
   notes : {type:[{type:mongoose.Schema.Types.ObjectId, ref:"kpNotes"}], default:[]},
   otp: {type:String, select:false},
   otpExpiresAt: {type:Date, select:false},
   isVerified : {type:Boolean, default:false}
})



module.exports = new mongoose.model("kpUsers", usersSchema );