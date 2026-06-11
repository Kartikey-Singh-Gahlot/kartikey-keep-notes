import mongoose from "mongoose";
import authUserInterface from "../../shared/interfaces/authUserInterface";

const authUserSchema = new mongoose.Schema<authUserInterface>({
   email: {type:String, required:true},
   password: {type:String, default:null, select:false},
   googleId: {type:String, default:null},
   admin: {type:Boolean, default:false},
   isVerified: {type:Boolean, default:false},
   createdAt: {type:Date, default:Date.now}
})

export default mongoose.model("authUsers", authUserSchema); 