import mongoose from "mongoose";
import chapterInterface from "../../shared/interfaces/chapterInterface";


const chapterModelSchema = new mongoose.Schema<chapterInterface>({
  subjectId:{type:mongoose.Schema.Types.ObjectId, ref:'subjects', required:true},
  number:{type:Number, required:true},
  title:{type:String, required:true},
  sections:{type:[mongoose.Schema.Types.ObjectId], ref:'sections', default:[]},
  order:{type:Number, required:true},
  createdAt:{type:Date, default:Date.now}
});

export default mongoose.models.chapters ||  mongoose.model("chapters", chapterModelSchema);