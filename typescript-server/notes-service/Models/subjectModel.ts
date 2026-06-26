import mongoose from "mongoose";
import subjectInterface from "../../shared/interfaces/subjectinterface";


const subjectModelSchema = new mongoose.Schema<subjectInterface>({
  name:{type:String, default:'General', unique:true, required:true},
  description:{type:String, default: function get():string{return `This is basic ${this.name} subject`}},
  chapters:{type:[mongoose.Schema.Types.ObjectId], ref:'chapters', default:[]},
  imageUrl:{type:String, default:"./mainBgBlackImageOne.png"},
  likesCount:{type:Number, default:0},
  createdAt:{type:Date, default:Date.now}
});

export default mongoose.models.subjects || mongoose.model("subjects", subjectModelSchema);