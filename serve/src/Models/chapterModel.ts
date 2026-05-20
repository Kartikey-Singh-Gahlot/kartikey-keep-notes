import mongoose from "mongoose";
import type chapterSchemaType from "./Interfaces/chapterModelInterface.js"

const chapterSchema = new mongoose.Schema<chapterSchemaType>({
  subjectId:{type:mongoose.Schema.Types.ObjectId, ref:'subjects', required:true},
  number:{type:Number, required:true},
  title:{type:String, required:true},
  sections:{type:[mongoose.Schema.Types.ObjectId], ref:'sections',  default:[]},
  order:{type:Number, required:true, unique:true, },
  createdAt:{type:Date, default:Date.now}
})


export default mongoose.model("chapters", chapterSchema);