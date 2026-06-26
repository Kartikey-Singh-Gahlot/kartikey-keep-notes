import mongoose from "mongoose";
import sectionInterface from "../../shared/interfaces/sectionInterface";


const sectionModelSchema = new mongoose.Schema<sectionInterface>({
  chapterId:{type:mongoose.Schema.Types.ObjectId, ref:'chapters', required:true},
  title:{type:String, required:true },
  content:{type:String, required:true},
  blocks:{type:Object, required:true},
  images:{type:[String], required:true},    
  isSubSection:{type:Boolean, default:false},
  subSections:{type:[mongoose.Schema.Types.ObjectId], ref:'sections', default:[]},
  order:{type:Number, required:true},
  createdAt:{type:Date, default:Date.now}
});

export default mongoose.models.setions ||  mongoose.model("sections", sectionModelSchema);