import mongoose from "mongoose";
import authUserInterface from "../../shared/interfaces/authUserInterface";

const authUserSchema = new mongoose.Schema<authUserInterface>({
   email: {type:String, required:true, unique:true},
   password: {type:String, default:null, select:false},
   otp: {type:String, select:false},
   otpExpiry: {type:Date, select:false},
   googleId: {type:String, default:null},
   isAdmin: {type:Boolean, default:false},
   isVerified: {type:Boolean, default:false},
   createdAt: {type:Date, default:Date.now}
})

export default mongoose.models.authUsers || mongoose.model("authUsers", authUserSchema);