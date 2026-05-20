import mongoose, {type mongo} from "mongoose"
import type sectionSchemaType from "./Interfaces/sectionModelInterface.js";


const sectionSchema = new mongoose.Schema<sectionSchemaType>({
  chapterId:{type:mongoose.Schema.Types.ObjectId, ref:'Chapter', required:true},    
  title:{type:String, required:true},
  content:{type:String, required:true},
  blocks: {type:[{
      type: {
        type: String,
        enum: ["text", "code", "note", "image"],
        required: true,
      },
      content:  { type: String },  
      language: { type: String }, 
      order:    { type: Number },
    }
    ], default:[]},
  images:{type:[String], default:[]},
  subProjects:{type:[mongoose.Schema.Types.ObjectId], ref:'Project', default:[]},
  isSubSection:{type:Boolean, default:false},
  order:{type:Number, required:true, unique:true},
  createdAt:{type:Date, default:Date.now}
});

export default mongoose.model('sections', sectionSchema);